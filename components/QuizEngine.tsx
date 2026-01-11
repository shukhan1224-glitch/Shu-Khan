import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Level, LevelPhase, Question } from '../types';
import { Button, Card, ChemicalText } from './Common';
import { explainMistake } from '../services/geminiService';
import { Check, X, ArrowRight, HelpCircle } from 'lucide-react';

interface QuizEngineProps {
  level: Level;
  onComplete: (score: number, passed: boolean) => void;
  onExit: () => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({ level, onComplete, onExit }) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [inputAnswer, setInputAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  const phase = level.phases[currentPhaseIndex];
  const question = phase.questions[currentQIndex];

  const handleCheck = async () => {
    let isCorrect = false;
    let correctAnswerText = '';

    if (question.type === 'mcq') {
      isCorrect = selectedOption === question.correctIndex;
      correctAnswerText = question.options ? question.options[question.correctIndex!] : '';
    } else if (question.type === 'input') {
      isCorrect = inputAnswer.trim().toLowerCase() === question.validAnswer?.toLowerCase();
      correctAnswerText = question.validAnswer || '';
    }

    setFeedback({
      isCorrect,
      text: isCorrect ? '正确！✨' : 'Oops, 不太对哦。'
    });

    if (isCorrect) {
      setScore(s => s + (phase.difficulty === 'hard' ? 20 : 10));
    } else {
      setLoadingAi(true);
      const explanation = await explainMistake(
        question.text, 
        question.type === 'mcq' && question.options ? question.options[selectedOption!] : inputAnswer,
        correctAnswerText
      );
      setAiExplanation(explanation);
      setLoadingAi(false);
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setSelectedOption(null);
    setInputAnswer('');
    setAiExplanation('');

    if (currentQIndex < phase.questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else if (currentPhaseIndex < level.phases.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
      setCurrentQIndex(0);
    } else {
      // Finished
      const passed = score > (level.phases.length * 5); // Simple pass logic
      onComplete(score, passed);
    }
  };

  const isLastQuestion = currentPhaseIndex === level.phases.length - 1 && currentQIndex === phase.questions.length - 1;

  // Render Concept Phase special view if it's the very first question of phase 1 and level has concept
  if (currentPhaseIndex === 0 && currentQIndex === 0 && level.concept && !feedback) {
     // We can show concept card before the question
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={onExit} size="sm">退出</Button>
        <div className="flex flex-col items-center">
          <h2 className="font-magic text-xl text-slate-700">{level.title}</h2>
          <div className="flex space-x-1 mt-1">
            {level.phases.map((_, i) => (
              <div key={i} className={`h-2 w-8 rounded-full ${i <= currentPhaseIndex ? 'bg-magic' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>
        <div className="text-magic font-bold">{score} XP</div>
      </div>

      {/* Story / Concept Card (if start of phase) */}
      {currentQIndex === 0 && phase.story && (
        <Card className="mb-6 bg-gradient-to-br from-cream to-white border-l-4 border-magic">
          <div className="flex items-start">
            <span className="text-4xl mr-4">{phase.story.emoji}</span>
            <div>
              <h3 className="font-bold text-lg mb-1">{phase.story.title}</h3>
              <p className="text-slate-600">{phase.story.content}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Question Card */}
      <Card className="relative overflow-hidden">
        <div className="mb-6">
           <div className="flex justify-between text-sm text-slate-400 mb-2 uppercase tracking-wide">
             <span>Phase {currentPhaseIndex + 1}: {phase.title}</span>
             <span>Q {currentQIndex + 1}/{phase.questions.length}</span>
           </div>
           <h3 className="text-xl font-bold text-slate-800 leading-relaxed">
             <ChemicalText text={question.text} />
           </h3>
        </div>

        <div className="space-y-3">
          {question.type === 'mcq' && question.options?.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => !feedback && setSelectedOption(idx)}
              className={`w-full p-4 rounded-xl text-left border-2 transition-all ${
                selectedOption === idx 
                  ? 'border-magic bg-magic-light/30 text-magic-dark font-bold' 
                  : 'border-slate-100 hover:border-magic/50'
              } ${feedback && idx === question.correctIndex ? 'bg-green-100 border-green-500' : ''}
                ${feedback && !feedback.isCorrect && selectedOption === idx ? 'bg-red-50 border-red-200' : ''}
              `}
              disabled={!!feedback}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border mr-3 flex items-center justify-center text-xs ${selectedOption === idx ? 'bg-magic text-white border-magic' : 'border-slate-300'}`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <ChemicalText text={opt} />
              </div>
            </button>
          ))}

          {question.type === 'input' && (
            <input 
              type="text" 
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              disabled={!!feedback}
              placeholder="输入答案..."
              className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-magic outline-none text-lg font-mono"
            />
          )}
        </div>

        {/* Feedback Area */}
        {feedback && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            className={`mt-6 p-4 rounded-xl ${feedback.isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
          >
            <div className="flex items-start">
              {feedback.isCorrect ? <Check className="w-6 h-6 mr-2" /> : <X className="w-6 h-6 mr-2" />}
              <div className="flex-1">
                <p className="font-bold text-lg">{feedback.text}</p>
                {!feedback.isCorrect && (
                  <div className="mt-2 text-sm text-slate-600 bg-white/50 p-3 rounded-lg">
                    {loadingAi ? (
                      <div className="flex items-center text-magic"><span className="animate-spin mr-2">⏳</span> Octo 正在分析你的错误...</div>
                    ) : (
                      <>
                        <p className="font-bold mb-1 text-magic-dark">Octo 小贴士:</p>
                        <p>{aiExplanation || question.explanation}</p>
                      </>
                    )}
                  </div>
                )}
                {feedback.isCorrect && (
                  <p className="mt-1 opacity-80">{question.explanation}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        <div className="mt-8 flex justify-end">
          {!feedback ? (
            <Button 
              onClick={handleCheck} 
              disabled={(question.type === 'mcq' && selectedOption === null) || (question.type === 'input' && !inputAnswer)}
            >
              提交答案
            </Button>
          ) : (
            <Button onClick={handleNext} variant={isLastQuestion ? 'primary' : 'secondary'} icon={ArrowRight}>
              {isLastQuestion ? '完成挑战' : '下一题'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};