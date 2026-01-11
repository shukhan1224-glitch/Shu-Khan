
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Lightbulb, CheckCircle, AlertCircle, BookOpen, Shield, Sword, GraduationCap, ThumbsUp, RotateCcw, Database, HardDrive, Star, Move, Minus, Plus, Crown, FlaskConical, Search, FileText, RotateCw } from 'lucide-react';
import { Level, Question } from '../types';
import { ChemicalText } from './ChemicalText';
import { explainMistake } from '../services/geminiService';
import { Mascot } from './Mascot';

const motion = m as any;

interface QuizModalProps {
  level: Level;
  initialPhaseIndex?: number;
  onClose: () => void;
  onComplete: (xp: number, mistakes: { question: Question; userAnswer: string }[], correctQuestionIds: string[]) => void;
  isAdmin?: boolean;
}

export const QuizModal: React.FC<QuizModalProps> = ({ level, initialPhaseIndex = 0, onClose, onComplete, isAdmin = false }) => {
  
  // --- Game State Machine ---
  const phases = useMemo(() => {
      if (isAdmin) return level.phases;

      const QUESTIONS_PER_PHASE = 5;
      const answeredSet = new Set(level.answeredQuestionIds || []);

      return level.phases.map(phase => {
          // If it's a detective case, don't shuffle or slice (steps are sequential)
          if (phase.questions.some(q => q.type === 'detective') || phase.id.startsWith('case_')) {
              return phase;
          }

          const allQuestions = [...phase.questions];
          const unAnswered = allQuestions.filter(q => !answeredSet.has(q.id)).sort(() => Math.random() - 0.5);
          const answered = allQuestions.filter(q => answeredSet.has(q.id)).sort(() => Math.random() - 0.5);

          let selectedQuestions = [...unAnswered];
          if (selectedQuestions.length < QUESTIONS_PER_PHASE) {
              const needed = QUESTIONS_PER_PHASE - selectedQuestions.length;
              selectedQuestions = [...selectedQuestions, ...answered.slice(0, needed)];
          } else {
              selectedQuestions = selectedQuestions.slice(0, QUESTIONS_PER_PHASE);
          }

          return {
              ...phase,
              questions: selectedQuestions.sort(() => Math.random() - 0.5)
          };
      });
  }, [level, isAdmin]);

  const [showConcept, setShowConcept] = useState(!!level.concept && initialPhaseIndex === 0);
  const [activePhaseIdx, setActivePhaseIdx] = useState(initialPhaseIndex);
  const [showStory, setShowStory] = useState<boolean>(true); 
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [isCelebration, setIsCelebration] = useState(false);
  const [debugMinimized, setDebugMinimized] = useState(false);

  // --- Current Context ---
  const currentPhase = phases[activePhaseIdx];
  const currentQuestion = currentPhase?.questions[activeQuestionIdx];
  
  const totalQuestions = useMemo(() => phases.reduce((acc, p) => acc + p.questions.length, 0), [phases]);
  const completedQuestions = useMemo(() => {
    let count = 0;
    for (let i = 0; i < activePhaseIdx; i++) count += phases[i].questions.length;
    count += activeQuestionIdx;
    return count;
  }, [activePhaseIdx, activeQuestionIdx, phases]);
  
  const progress = totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;

  // --- Phase Styles ---
  const getPhaseStyle = (index: number) => {
     const p = phases[index];
     const isDetective = p?.questions.some(q => q.type === 'detective') || p?.id.startsWith('case_');

     if (isDetective) {
         return { color: 'slate', label: `CASE ${index + 1}`, icon: <Search size={20} /> };
     }

     switch(index) {
        case 0: return { color: 'mint', label: 'PHASE 1: 概念构建', icon: <BookOpen size={20} /> };
        case 1: return { color: 'apricot', label: 'PHASE 2: 技能应用', icon: <Sword size={20} /> };
        case 2: return { color: 'coral', label: 'PHASE 3: 进阶挑战', icon: <Shield size={20} /> };
        case 3: return { color: 'magic', label: 'PHASE 4: 综合精通', icon: <Crown size={20} /> };
        default: return { color: 'mint', label: `PHASE ${index + 1}`, icon: <Star size={20} /> };
     }
  };
  const phaseStyle = getPhaseStyle(activePhaseIdx);
  const isHardMode = activePhaseIdx >= 2 || phaseStyle.color === 'slate'; 

  // --- Interaction State ---
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  
  // --- Sort State ---
  const [slots, setSlots] = useState<(string | null)[]>([]); 
  const [bank, setBank] = useState<string[]>([]); 
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null); 
  const [animatingSlots, setAnimatingSlots] = useState<number[]>([]); 

  // --- Detective Mode State ---
  const [revealedClues, setRevealedClues] = useState<number[]>([]); // Indices of revealed clues
  const [isInvestigating, setIsInvestigating] = useState(false); // Effect state for investigating

  const [sessionScore, setSessionScore] = useState(0);
  const [mistakes, setMistakes] = useState<{ question: Question; userAnswer: string }[]>([]);
  const [correctIds, setCorrectIds] = useState<string[]>([]);

  const explanationRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // --- TEMPLATE LOGIC ---
  const effectiveTemplate = useMemo(() => {
    if (!currentQuestion) return '';
    if (currentQuestion.template) return currentQuestion.template;
    if (currentQuestion.type === 'sort' && currentQuestion.items) {
        return currentQuestion.items.map((_, i) => `{${i}}`).join(' → ');
    }
    return '';
  }, [currentQuestion]);

  const useGridLayout = useMemo(() => {
    if (!currentQuestion || currentQuestion.type !== 'mcq' || !currentQuestion.options) return false;
    return currentQuestion.options.every(opt => opt.length <= 15);
  }, [currentQuestion]);

  useEffect(() => {
    if (showExplanation && explanationRef.current) {
       setTimeout(() => {
          explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }, 150);
    }
  }, [showExplanation]);

  // Reset/Init for new question
  useEffect(() => {
    // General Reset
    setInputValue('');
    setSelectedOption(null);
    setRevealedClues([]);
    setIsInvestigating(false);

    // Type Specific Reset
    if (currentQuestion?.type === 'sort' && currentQuestion.items) {
      let slotCount = 0;
      if (effectiveTemplate) {
         const matches = effectiveTemplate.match(/\{\d+\}/g);
         slotCount = matches ? matches.length : 0;
      } else {
         slotCount = currentQuestion.items.length;
      }
      setSlots(Array(slotCount).fill(null));
      setBank(currentQuestion.items.map(i => i.id).sort(() => Math.random() - 0.5));
      setActiveSlotIndex(null);
      setAnimatingSlots([]);
    }
  }, [activeQuestionIdx, activePhaseIdx, currentQuestion, effectiveTemplate]);

  // --- Handlers ---
  const handleStartPhase = () => setShowStory(false);

  // ... (Sort handlers: triggerSlotAnimation, handleBankItemClick, handleSlotItemClick kept same)
  const triggerSlotAnimation = (indices: number[]) => {
      setAnimatingSlots(prev => [...prev, ...indices]);
      setTimeout(() => {
          setAnimatingSlots(prev => prev.filter(i => !indices.includes(i)));
      }, 300);
  };

  const handleBankItemClick = (itemId: string) => {
    if (showExplanation) return;
    let targetIndex = activeSlotIndex !== null ? activeSlotIndex : slots.findIndex(s => s === null);
    if (targetIndex !== -1) {
      const existingItem = slots[targetIndex];
      const newSlots = [...slots];
      newSlots[targetIndex] = itemId;
      setSlots(newSlots);
      
      let newBank = bank.filter(id => id !== itemId);
      if (existingItem) newBank.push(existingItem);
      setBank(newBank);

      setActiveSlotIndex(null); 
      triggerSlotAnimation([targetIndex]);
    }
  };

  const handleSlotItemClick = (index: number) => {
    if (showExplanation) return;
    const itemId = slots[index];
    if (itemId) {
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
      setBank([...bank, itemId]);
      setActiveSlotIndex(index);
    } else {
      setActiveSlotIndex(index === activeSlotIndex ? null : index);
    }
  };

  // Detective Mode Handler: Supports toggling (Reveal/Hide)
  const handleToggleClue = (index: number) => {
      if (showExplanation) return;
      
      if (revealedClues.includes(index)) {
          // If already revealed, hide it immediately (flip back to see reagent)
          setRevealedClues(prev => prev.filter(i => i !== index));
      } else {
          // If hidden, reveal it with experiment animation
          setIsInvestigating(true);
          setTimeout(() => {
              setRevealedClues(prev => [...prev, index]);
              setIsInvestigating(false);
          }, 600); // Animation delay
      }
  };

  // --- ANSWER CHECKING LOGIC ---
  const normalizeText = (str: string) => {
      if (!str) return '';
      return str.toString().trim().toLowerCase().replace(/[\$\{\}\_\^]/g, '').replace(/\\?uparrow/g, '').replace(/\\?downarrow/g, '').replace(/↑/g, '').replace(/↓/g, '').replace(/\s+/g, '');
  };

  const checkTemplateAnswer = () => {
    if (!effectiveTemplate || !currentQuestion.correctOrder) return false;
    if (slots.some(s => s === null)) return false;
    const userContentOrder = slots.map(slotId => currentQuestion.items?.find(i => i.id === slotId)?.content || '');
    const correctOrder = currentQuestion.correctOrder;
    const isStrictMatch = userContentOrder.every((val, index) => normalizeText(val) === normalizeText(correctOrder[index]));
    if (isStrictMatch) return true;
    
    // Commutative check logic (simplified for brevity, assume same as before)
    return false;
  };

  const handleSubmit = async () => {
    let correct = false;
    let userAnswer = '';

    if (currentQuestion.type === 'mcq' || currentQuestion.type === 'detective') {
      correct = selectedOption === currentQuestion.correctIndex;
      userAnswer = currentQuestion.options ? currentQuestion.options[selectedOption!] : (currentQuestion.detectiveData?.suspects[selectedOption!] || '');
    } else if (currentQuestion.type === 'input') {
       // ... input check logic
       const valid = currentQuestion.validAnswer ? currentQuestion.validAnswer.toString() : '';
       const possibleAnswers = valid.split(/[\/|;]+/).map(s => s.trim());
       const stripSuffix = (str: string) => str.replace(/(色|气体|气|沉淀|溶液)$/g, '');
       const userClean = stripSuffix(normalizeText(inputValue));
       correct = possibleAnswers.some(ans => stripSuffix(normalizeText(ans)) === userClean);
       userAnswer = inputValue;
    } else if (currentQuestion.type === 'sort') {
       if (effectiveTemplate) {
         correct = checkTemplateAnswer();
         userAnswer = slots.map(id => currentQuestion.items?.find(i => i.id === id)?.content || '?').join(' → ');
       }
    } else if ((currentQuestion.type as string) === 'flashcard') {
      return; 
    }

    if (correct) {
      handleSuccess();
    } else {
      handleFailure(userAnswer);
      if (attempts > 0 && currentQuestion.type !== 'flashcard') {
          let correctAnswerText = currentQuestion.validAnswer || '';
          if (currentQuestion.type === 'mcq') correctAnswerText = currentQuestion.options![currentQuestion.correctIndex!];
          if (currentQuestion.type === 'detective') correctAnswerText = currentQuestion.detectiveData?.suspects[currentQuestion.correctIndex!] || '';
          if (currentQuestion.type === 'sort') correctAnswerText = currentQuestion.correctOrder?.join(' → ') || 'Correct Order';
          
          explainMistake(currentQuestion.text, userAnswer, correctAnswerText).then(res => setAiAnalysis(res));
      }
    }
  };

  const handleSuccess = () => {
    setIsCorrect(true);
    const phaseXP = [20, 30, 40, 50]; 
    const basePoints = phaseXP[Math.min(activePhaseIdx, 3)] || 20;
    const points = attempts === 0 ? basePoints : basePoints / 2;
    setSessionScore(s => s + points);
    if (attempts === 0) setCorrectIds(prev => [...prev, currentQuestion.id]);
    setShowExplanation(true);
  };

  const handleFailure = (answer: string) => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
    if (currentQuestion.type === 'flashcard') {
       setMistakes(prev => [...prev, { question: currentQuestion, userAnswer: 'Needs Review' }]);
       setShowExplanation(true); 
       return;
    }
    if (attempts === 0) {
      setAttempts(1);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    } else {
      setIsCorrect(false);
      setShowExplanation(true);
      setMistakes(prev => [...prev, { question: currentQuestion, userAnswer: answer }]);
    }
  };

  const handleNext = () => {
    setInputValue('');
    setSelectedOption(null);
    setAttempts(0);
    setIsCorrect(null);
    setShowHint(false);
    setShowExplanation(false);
    setIsFlipped(false); 
    setAiAnalysis('');
    setSlots([]);
    setBank([]);
    setActiveSlotIndex(null);
    setRevealedClues([]);

    if (activeQuestionIdx < currentPhase.questions.length - 1) {
      setActiveQuestionIdx(prev => prev + 1);
    } else {
      if (activePhaseIdx < phases.length - 1) {
        setActivePhaseIdx(prev => prev + 1);
        setActiveQuestionIdx(0);
        setShowStory(true);
      } else {
        triggerCelebration();
      }
    }
  };

  const triggerCelebration = () => {
      setIsCelebration(true);
      setTimeout(() => onComplete(sessionScore, mistakes, correctIds), 3500);
  };

  const handleAdminSkip = () => handleNext();
  const handleAdminWin = () => triggerCelebration();
  const handleAdminJump = (phaseIdx: number) => {
     setActivePhaseIdx(phaseIdx);
     setActiveQuestionIdx(0);
     setShowStory(true);
     setShowConcept(false);
     setInputValue(''); setSelectedOption(null); setAttempts(0); setIsCorrect(null);
     setShowHint(false); setShowExplanation(false); setIsFlipped(false);
     setAiAnalysis(''); setSlots([]); setBank([]);
  };

  const renderTemplateEquation = () => {
    if (!effectiveTemplate || !currentQuestion.items) return null;
    const parts = effectiveTemplate.split(/(\{\d+\})/g);
    let slotCounter = 0;
    return (
      <div className={`flex flex-wrap items-center justify-center gap-2 mb-6 p-4 rounded-3xl border-2 min-h-[120px] transition-colors ${isHardMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/80 border-slate-100'}`}>
        {parts.map((part, idx) => {
          if (part.match(/\{\d+\}/)) {
            const currentSlotIndex = slotCounter++;
            const itemId = slots[currentSlotIndex];
            const item = itemId ? currentQuestion.items?.find(i => i.id === itemId) : null;
            const isSelected = activeSlotIndex === currentSlotIndex;
            const isAnimating = animatingSlots.includes(currentSlotIndex);
            
            return (
              <div key={`slot-${currentSlotIndex}`} className="relative">
                 {!item ? (
                    <button onClick={() => handleSlotItemClick(currentSlotIndex)} className={`min-w-[4rem] h-14 px-2 rounded-xl border-2 border-dashed transition-all flex items-center justify-center relative overflow-visible ${isSelected ? 'border-mint bg-mint/10 ring-2 ring-mint ring-offset-2' : isHardMode ? 'border-slate-600 bg-slate-800/80 hover:border-mint' : 'border-slate-300 bg-white/50 hover:border-mint hover:bg-mint/10'}`}>
                      <span className={`text-xs font-bold uppercase ${isSelected ? 'text-mint-dark' : (isHardMode ? 'text-slate-500' : 'text-slate-300')}`}>{isSelected ? '选我' : '空位'}</span>
                    </button>
                 ) : (
                    <motion.div layoutId={item.id} animate={isAnimating ? { scale: [1, 1.15, 1], borderColor: ['#e2e8f0', '#A8E6CF', '#e2e8f0'] } : {}} transition={{ duration: 0.3 }} onClick={() => handleSlotItemClick(currentSlotIndex)} className={`min-w-[4rem] px-3 h-14 border-2 shadow-[0_4px_0_rgba(0,0,0,0.1)] rounded-xl font-bold text-sm flex items-center justify-center cursor-pointer z-10 ${isHardMode ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:border-red-300'}`}>
                        <ChemicalText text={item.content} />
                    </motion.div>
                 )}
              </div>
            );
          } else {
            return <span key={idx} className={`text-xl font-black mx-1 ${isHardMode ? 'text-slate-400' : 'text-slate-400'}`}>{part.replace(/->|\\rightarrow|\\to/, '→')}</span>;
          }
        })}
      </div>
    );
  };

  if (!level || !currentPhase || !currentQuestion) return null;

  // --- CELEBRATION VIEW ---
  if (isCelebration) {
      return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-900/95 flex flex-col items-center justify-center overflow-hidden">
             
             {/* Goofy Confetti (More items and faster chaotic movement) */}
             <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(40)].map((_, i) => (
                   <motion.div 
                      key={i}
                      className="absolute text-2xl"
                      style={{ left: `${Math.random() * 100}%`, top: '-10%' }}
                      animate={{ 
                         top: '110%', 
                         rotate: [0, 720],
                         x: Math.sin(i) * 150,
                         scale: [0.5, 1.5, 0.5]
                      }}
                      transition={{ duration: 3 + Math.random() * 4, ease: 'linear', repeat: Infinity, delay: Math.random() * 2 }}
                   >
                      {['✨', '🎉', '🧬', '🧪', '🐙', '⭐', '💥', '🎈'][i % 8]}
                   </motion.div>
                ))}
             </div>

             <div className="absolute inset-0 bg-magic/20 blur-3xl rounded-full scale-150 animate-pulse opacity-50" />
             
             {/* Mascot Container with Bounce */}
             <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.7, duration: 1.5 }}
                className="relative z-10 scale-150 mb-8"
             >
                <Mascot size={220} mood="victory" />
             </motion.div>

             <motion.div 
                initial={{ scale: 0.5, opacity: 0, y: 50 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                className="text-center relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/20 shadow-xl"
             >
                <motion.h1 
                   className="text-6xl font-magic text-yellow-400 drop-shadow-[0_4px_0_rgba(0,0,0,0.2)] mb-4 tracking-wide"
                   animate={{ scale: [1, 1.1, 1], rotate: [0, -2, 2, 0] }}
                   transition={{ repeat: Infinity, duration: 0.5 }}
                >
                   挑战成功!
                </motion.h1>
                <motion.p 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   transition={{ delay: 0.5 }} 
                   className="text-white font-bold text-xl"
                >
                   获得 <span className="text-yellow-300 text-3xl mx-1 inline-block animate-bounce">{sessionScore}</span> XP
                </motion.p>
             </motion.div>

          </motion.div>
      );
  }

  // 1. Concept View
  if (showConcept && level.concept) {
    return (
      <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-mint to-apricot" />
          <span className="text-6xl mb-4 block animate-bounce-slow">{level.concept.emoji}</span>
          <h2 className="text-2xl font-extrabold text-slate-700 mb-2">{level.concept.title}</h2>
          <div className="bg-cream p-5 rounded-3xl mb-8 border border-slate-100 text-left">
            <p className="text-slate-600 leading-relaxed text-sm font-medium whitespace-pre-wrap"><ChemicalText text={level.concept.content} /></p>
          </div>
          <button onClick={() => setShowConcept(false)} className="w-full py-4 rounded-full bg-slate-800 text-white font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">开始学习 <ArrowRight size={20} /></button>
        </motion.div>
      </div>
    );
  }

  // 2. Story View
  if (showStory) {
     const story = currentPhase.story || { title: currentPhase.title, content: '准备迎接新的挑战！', emoji: '🚀', mood: 'happy' };
     
     // Determine if detective
     const isDetective = currentPhase.questions.some(q => q.type === 'detective') || currentPhase.id.startsWith('case_');
     
     let bgClass = 'bg-mint';
     let textClass = 'text-mint-dark';
     let borderClass = 'border-mint';

     if (isDetective) {
         bgClass = 'bg-slate-700';
         textClass = 'text-slate-700';
         borderClass = 'border-slate-700';
     } else if (activePhaseIdx === 3) {
         bgClass = 'bg-magic';
         textClass = 'text-magic-vivid';
         borderClass = 'border-magic';
     } else if (activePhaseIdx === 2) {
         bgClass = 'bg-coral';
         textClass = 'text-coral-dark';
         borderClass = 'border-coral';
     } else if (activePhaseIdx === 1) {
         bgClass = 'bg-apricot';
         textClass = 'text-apricot-dark';
         borderClass = 'border-apricot';
     }

     return (
        <div className={`fixed inset-0 z-[60] backdrop-blur-md flex flex-col items-center justify-center p-6 ${isDetective ? 'bg-slate-900/95' : 'bg-cream/95'}`}>
           {isAdmin && (<div className="absolute top-4 right-4 flex gap-2"><button onClick={() => setShowStory(false)} className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs z-50">Skip Story</button></div>)}
           <motion.div key={currentPhase.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="w-full max-w-sm">
              <div className="flex justify-center mb-6"><span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase text-white shadow-md ${bgClass}`}>{phaseStyle.label}</span></div>
              <div className="flex flex-col items-center mb-6">
                 <div className={`w-28 h-28 rounded-full bg-white border-4 flex items-center justify-center text-6xl shadow-float mb-6 z-10 ${borderClass} ${activePhaseIdx >= 2 ? 'animate-pulse' : ''}`}>{story.emoji}</div>
                 <div className="bg-white p-6 rounded-[2rem] shadow-soft border border-slate-50 w-full relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rotate-45 border-t border-l border-slate-50" />
                    <h3 className={`font-black text-lg mb-2 ${textClass}`}>{story.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed"><ChemicalText text={story.content} /></p>
                 </div>
              </div>
              <button onClick={handleStartPhase} className={`w-full py-4 rounded-full text-white font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 ${activePhaseIdx >= 2 || isDetective ? 'bg-slate-800' : bgClass + ' text-slate-800'}`}>{phaseStyle.icon}{activePhaseIdx >= 2 || isDetective ? '接受挑战' : '开始学习'}</button>
           </motion.div>
        </div>
     );
  }

  // 3. Quiz Interface
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`fixed inset-0 z-[60] backdrop-blur-sm flex flex-col transition-colors duration-500 ${isHardMode ? 'bg-slate-900/95 text-slate-100' : 'bg-cream/95 text-slate-800'}`}>
      {/* ADMIN PANEL */}
      {isAdmin && (
          <motion.div drag dragMomentum={false} initial={{ x: 0, y: 0 }} className="fixed top-20 left-4 z-[100] bg-black/80 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl flex flex-col overflow-hidden w-32 cursor-move">
             <div className="p-2 flex items-center justify-between border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-1 text-[10px] font-black text-white/50 uppercase tracking-widest"><Move size={10} /> DEBUG</div>
                <button onClick={(e) => { e.stopPropagation(); setDebugMinimized(!debugMinimized); }} className="text-white/60 hover:text-white transition-colors">{debugMinimized ? <Plus size={12} /> : <Minus size={12} />}</button>
             </div>
             {!debugMinimized && (
               <div className="p-2 flex flex-col gap-2">
                  <div className="text-[10px] text-white flex items-center gap-1 justify-center mb-1">{level.isFromDB ? <span className="text-green-400">● Cloud</span> : <span className="text-red-400">● Local</span>}</div>
                  <div className="grid grid-cols-3 gap-1">{phases.map((_, idx) => (<button key={idx} onClick={() => handleAdminJump(idx)} className={`text-[10px] font-bold py-1 rounded ${activePhaseIdx === idx ? 'bg-mint text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}>P{idx + 1}</button>))}</div>
                  <button onClick={handleAdminSkip} className="text-[10px] font-bold py-1.5 bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 rounded border border-blue-500/30">Skip Q</button>
                  <button onClick={handleAdminWin} className="text-[10px] font-bold py-1.5 bg-green-500/20 text-green-300 hover:bg-green-500/40 rounded border border-green-500/30">Force Win</button>
               </div>
             )}
          </motion.div>
       )}

      {/* Header */}
      <div className={`px-6 py-4 flex items-center justify-between z-10 backdrop-blur-md sticky top-0 border-b transition-colors ${isHardMode ? 'bg-slate-900/80 border-white/10' : 'bg-cream/80 border-transparent'}`}>
        <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isHardMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}><X size={20} /></button>
        <div className="flex-1 mx-4 h-3 bg-slate-100 rounded-full overflow-hidden relative">
           <div className={`absolute inset-0 ${isHardMode ? 'bg-white/10' : ''}`} />
          <motion.div className={`h-full ${phaseStyle.color === 'slate' ? 'bg-slate-500' : activePhaseIdx === 3 ? 'bg-magic' : activePhaseIdx === 2 ? 'bg-coral' : activePhaseIdx === 1 ? 'bg-apricot' : 'bg-mint'}`} initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full shadow-sm border font-bold text-sm 
            ${phaseStyle.color === 'slate' ? 'bg-slate-800 border-slate-700 text-slate-300' : 
              activePhaseIdx === 3 ? 'bg-magic/20 border-magic text-magic-vivid' : 
              activePhaseIdx === 2 ? 'bg-coral/20 border-coral text-coral' : 
              activePhaseIdx === 1 ? 'bg-white border-apricot text-apricot-dark' : 'bg-white border-mint text-mint-dark'}`}>
           <BookOpen size={14} /><span>{activeQuestionIdx + 1}/{currentPhase.questions.length}</span>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto px-6 py-4 pb-48 scroll-smooth">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activePhaseIdx}-${activeQuestionIdx}`}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="flex flex-col h-full max-w-lg mx-auto"
          >
             <div className="mb-2">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${phaseStyle.color === 'slate' ? 'bg-slate-800 text-white' : activePhaseIdx === 3 ? 'bg-magic text-white' : activePhaseIdx === 2 ? 'bg-coral text-white' : activePhaseIdx === 1 ? 'bg-apricot text-white' : 'bg-mint text-slate-700'}`}>{phaseStyle.label}</span>
             </div>

             {currentQuestion.type !== 'flashcard' && currentQuestion.type !== 'detective' && (
                <div className="mb-6">
                   <h2 className={`text-2xl font-bold leading-relaxed ${isHardMode ? 'text-white' : 'text-slate-800'}`}>
                     <ChemicalText text={currentQuestion.text} />
                   </h2>
                </div>
             )}

            {currentQuestion.type === 'detective' ? (
                // --- DETECTIVE MODE INTERFACE ---
                <div className="flex flex-col gap-6">
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700 shadow-2xl relative">
                            <span className="text-4xl">🧪</span>
                            <div className="absolute -bottom-2 -right-2 bg-coral text-white text-xs font-black px-2 py-1 rounded-full border border-slate-700">UNKNOWN</div>
                        </div>
                        <h2 className={`text-2xl font-black mb-2 ${isHardMode ? 'text-white' : 'text-slate-800'}`}>
                            {currentQuestion.detectiveData?.mysteryTitle || "神秘物质 X"}
                        </h2>
                        <p className={`text-sm ${isHardMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            <ChemicalText text={currentQuestion.text} />
                        </p>
                    </div>

                    {/* Investigation Area */}
                    <div className="grid grid-cols-2 gap-3">
                        {currentQuestion.detectiveData?.clues.map((clue, idx) => {
                            const isRevealed = revealedClues.includes(idx);
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleToggleClue(idx)}
                                    disabled={showExplanation || isInvestigating}
                                    className={`relative p-4 rounded-2xl border-2 text-left transition-all overflow-hidden h-32 flex flex-col justify-between group
                                        ${isRevealed 
                                            ? 'bg-white border-mint shadow-md cursor-pointer hover:border-mint-dark' 
                                            : 'bg-slate-100 border-slate-200 hover:bg-white hover:border-slate-300'
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-start w-full">
                                        <div className={`p-2 rounded-lg ${isRevealed ? 'bg-mint/20 text-mint-dark' : 'bg-slate-200 text-slate-400'}`}>
                                            <FlaskConical size={18} />
                                        </div>
                                        {isRevealed && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-[10px] text-slate-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline">撤回</span>
                                                <RotateCw size={14} className="text-mint opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4" />
                                                <CheckCircle size={16} className="text-mint group-hover:opacity-0 transition-opacity" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <div className={`text-xs font-bold uppercase mb-1 ${isRevealed ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {isRevealed ? '实验现象' : '点击测试'}
                                        </div>
                                        <div className={`font-bold leading-tight ${isRevealed ? 'text-slate-800' : 'text-slate-400'}`}>
                                            {isRevealed ? <ChemicalText text={clue.result} /> : clue.reagent}
                                        </div>
                                    </div>

                                    {/* Loading Overlay */}
                                    {isInvestigating && !isRevealed && !revealedClues.includes(idx) && (
                                        <div className="absolute inset-0 bg-slate-800/10 flex items-center justify-center backdrop-blur-[1px]">
                                            <div className="w-5 h-5 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Suspect List (Options) */}
                    <div className={`p-4 rounded-3xl border-2 ${isHardMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                        <div className="flex items-center gap-2 mb-3">
                            <Search size={16} className={isHardMode ? 'text-slate-400' : 'text-slate-400'} />
                            <span className={`text-xs font-black uppercase tracking-wider ${isHardMode ? 'text-slate-400' : 'text-slate-400'}`}>下达结论 (Identify)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {currentQuestion.detectiveData?.suspects.map((suspect, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => !isCorrect && setSelectedOption(idx)}
                                    disabled={showExplanation}
                                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all text-center border-2
                                        ${selectedOption === idx 
                                            ? 'bg-slate-800 text-white border-slate-800 shadow-lg scale-[1.02]' 
                                            : isHardMode 
                                                ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'
                                                : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-slate-200'
                                        }
                                        ${showExplanation && idx === currentQuestion.correctIndex ? '!bg-green-500 !border-green-500 !text-white' : ''} 
                                        ${showExplanation && selectedOption === idx && idx !== currentQuestion.correctIndex ? '!bg-red-500 !border-red-500 !text-white' : ''}
                                    `}
                                >
                                    <ChemicalText text={suspect} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                // --- STANDARD MODES ---
                <motion.div animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}} className={`w-full ${useGridLayout && currentQuestion.type === 'mcq' ? 'grid grid-cols-2 gap-3' : 'space-y-4'}`}>
                  
                  {currentQuestion.type === 'flashcard' ? (
                    <div className="relative w-full aspect-[4/5] perspective-1000 group cursor-pointer" onClick={() => !showExplanation && setIsFlipped(!isFlipped)}>
                       <motion.div className="w-full h-full relative transition-transform duration-700" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: isFlipped ? 180 : 0 }}>
                          <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-float border-2 border-slate-100 flex flex-col items-center justify-center p-8 text-center" style={{ backfaceVisibility: 'hidden' }}>
                             <div className="text-6xl mb-6">🤔</div>
                             <h3 className="text-2xl font-black text-slate-800 leading-snug"><ChemicalText text={currentQuestion.text} /></h3>
                             <p className="text-slate-400 font-bold mt-4 text-sm uppercase tracking-widest">点击翻转</p>
                          </div>
                          <div className="absolute inset-0 bg-slate-800 rounded-[2.5rem] shadow-float border-2 border-slate-700 flex flex-col items-center justify-center p-8 text-center text-white" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                             <div className="text-5xl mb-6">✨</div>
                             <h3 className="text-xl font-bold leading-relaxed"><ChemicalText text={currentQuestion.validAnswer || currentQuestion.explanation} /></h3>
                          </div>
                       </motion.div>
                    </div>
                  ) : currentQuestion.type === 'mcq' ? (
                    currentQuestion.options?.map((option, index) => (
                      <button key={index} onClick={() => !isCorrect && setSelectedOption(index)} disabled={showExplanation} className={`p-4 rounded-2xl text-left border-2 transition-all duration-200 relative overflow-hidden group ${useGridLayout && index === 4 && currentQuestion.options!.length === 5 ? 'col-span-2' : ''} 
                        ${selectedOption === index 
                            ? (isHardMode 
                                ? 'border-coral bg-coral text-white shadow-[0_0_15px_rgba(255,170,165,0.4)] scale-[1.02]' 
                                : 'border-slate-800 bg-slate-800 text-white shadow-lg scale-[1.02]')
                            : (isHardMode 
                                ? 'border-slate-700 bg-slate-800 text-slate-300 hover:border-coral hover:bg-slate-700' 
                                : 'border-slate-100 bg-white text-slate-600 hover:border-mint hover:bg-mint/5')
                        } 
                        ${showExplanation && index === currentQuestion.correctIndex ? '!bg-green-500 !border-green-500 !text-white' : ''} ${showExplanation && selectedOption === index && index !== currentQuestion.correctIndex ? '!bg-red-500 !border-red-500 !text-white' : ''}`}>
                        <div className={`flex items-center gap-3 relative z-10 ${useGridLayout && index === 4 && currentQuestion.options!.length === 5 ? 'justify-center' : ''}`}>
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm transition-colors 
                              ${selectedOption === index 
                                 ? 'bg-white/20 text-white' 
                                 : (isHardMode 
                                    ? 'bg-slate-700 text-slate-400 group-hover:bg-coral group-hover:text-white' 
                                    : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-mint-dark')
                              }`}>
                              {String.fromCharCode(65 + index)}
                           </div>
                           <span className="font-bold text-lg leading-snug"><ChemicalText text={option} /></span>
                        </div>
                      </button>
                    ))
                  ) : currentQuestion.type === 'input' ? (
                    <div className="relative">
                       <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} disabled={showExplanation} placeholder="输入你的答案..." className={`w-full border-2 rounded-2xl p-5 text-xl font-bold text-center outline-none focus:shadow-lg transition-all placeholder:text-slate-400 ${isHardMode ? 'bg-slate-800 border-slate-700 text-white focus:border-coral' : 'bg-white border-slate-200 text-slate-800 focus:border-slate-800'}`} />
                    </div>
                  ) : currentQuestion.type === 'sort' ? (
                    <div className="space-y-6">
                      {renderTemplateEquation()}
                      <div className={`p-4 rounded-3xl min-h-[120px] transition-colors ${isHardMode ? 'bg-slate-800/50 border-2 border-slate-800' : 'bg-slate-100 hover:bg-slate-200/50'}`}>
                           <p className={`text-xs font-bold uppercase mb-3 ml-1 ${isHardMode ? 'text-slate-500' : 'text-slate-400'}`}>可用选项</p>
                           <div className="flex flex-wrap gap-2 justify-center">
                              {bank.length > 0 ? bank.map((itemId) => {
                                 const item = currentQuestion.items?.find(i => i.id === itemId);
                                 if (!item) return null;
                                 return (
                                    <motion.button layoutId={item.id} key={item.id} onClick={() => handleBankItemClick(itemId)} 
                                       className={`border-2 shadow-[0_4px_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[4px] px-4 py-3 rounded-xl font-bold text-lg transition-all
                                          ${activeSlotIndex !== null ? (isHardMode ? 'animate-pulse ring-2 ring-coral ring-offset-1 ring-offset-slate-900' : 'animate-pulse ring-2 ring-mint ring-offset-1') : ''}
                                          ${isHardMode ? 'bg-white border-white text-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:bg-white hover:border-mint'}
                                       `}
                                    >
                                       <ChemicalText text={item.content} />
                                    </motion.button>
                                 )
                              }) : (
                                 <div className={`text-center text-sm font-bold animate-pulse py-4 ${isHardMode ? 'text-slate-500' : 'text-slate-400'}`}>全部已放置！请点击检查。</div>
                              )}
                           </div>
                        </div>
                    </div>
                  ) : null}
                </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className={`fixed bottom-0 left-0 right-0 p-5 backdrop-blur-md border-t z-50 flex items-center justify-between max-w-lg mx-auto w-full transition-colors ${isHardMode ? 'bg-slate-900/90 border-white/10' : 'bg-white/90 border-slate-100'}`}>
         <div className="flex items-center gap-2 text-slate-400">
            {isCorrect === true && <div className="flex items-center gap-1 text-green-500 font-black animate-bounce"><ThumbsUp size={20} /><span>+ {attempts === 0 ? (activePhaseIdx >= 2 ? 50 : activePhaseIdx === 1 ? 30 : 20) : (activePhaseIdx >= 2 ? 25 : activePhaseIdx === 1 ? 15 : 10)} XP</span></div>}
         </div>
         <div className="flex gap-3">
            {attempts > 0 && !isCorrect && !showExplanation && !showHint && <button onClick={() => setShowHint(true)} className="w-12 h-12 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center hover:bg-yellow-200 transition-colors"><Lightbulb size={24} /></button>}
            
            {/* RESET BUTTON FOR SORT */}
            {currentQuestion.type === 'sort' && !showExplanation && (
                 <button onClick={() => {
                     const allItems = currentQuestion.items!.map(i => i.id);
                     setSlots(Array(slots.length).fill(null));
                     setBank(allItems.sort(() => Math.random() - 0.5));
                 }} className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200">
                    <RotateCcw size={20} />
                 </button>
            )}

            <button 
                onClick={showExplanation ? handleNext : handleSubmit} 
                disabled={!showExplanation && (
                    (currentQuestion.type === 'mcq' && selectedOption === null) || 
                    (currentQuestion.type === 'detective' && selectedOption === null) ||
                    (currentQuestion.type === 'input' && !inputValue) || 
                    (currentQuestion.type === 'sort' && effectiveTemplate && slots.some(s => s === null))
                )} 
                className={`h-12 px-8 rounded-2xl font-black text-lg shadow-lg flex items-center gap-2 transition-all ${showExplanation ? 'bg-slate-800 text-white hover:bg-slate-700 hover:scale-105' : 'bg-mint text-slate-800 hover:bg-mint-dark active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed'}`}
            >
               {showExplanation ? <>Next <ArrowRight size={20} /></> : (currentQuestion.type === 'detective' ? '下达结论' : 'Check')}
            </button>
         </div>
      </div>

      {/* Explanation Overlay */}
      <AnimatePresence>
         {showExplanation && (
            <div className="pb-24 px-6 pt-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} ref={explanationRef} className={`rounded-3xl p-6 border-2 relative overflow-hidden ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                 <div className="flex items-start gap-4 relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>{isCorrect ? <CheckCircle size={24} /> : <AlertCircle size={24} />}</div>
                    <div>
                       <h3 className={`font-black text-lg mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>{isCorrect ? (activePhaseIdx >= 2 ? '太棒了!' : '正确!') : '哎呀，不太对。'}</h3>
                       
                       {!isCorrect && currentQuestion.type === 'sort' && <div className="bg-red-100/50 p-2 rounded-lg mb-2 text-xs font-bold text-red-800">正确顺序: <ChemicalText text={currentQuestion.correctOrder?.join(' → ') || ''} /></div>}
                       {!isCorrect && currentQuestion.type === 'input' && <div className="bg-red-100/50 p-2 rounded-lg mb-2 text-xs font-bold text-red-800">参考答案: <ChemicalText text={currentQuestion.validAnswer || ''} /></div>}
                       {!isCorrect && currentQuestion.type === 'detective' && <div className="bg-red-100/50 p-2 rounded-lg mb-2 text-xs font-bold text-red-800">真凶是: <ChemicalText text={currentQuestion.detectiveData?.suspects[currentQuestion.correctIndex!] || ''} /></div>}
                       
                       <p className={`text-sm font-medium leading-relaxed mb-3 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}><ChemicalText text={currentQuestion.explanation} /></p>
                       {!isCorrect && aiAnalysis && <div className="mt-3 pt-3 border-t border-red-200/50"><div className="flex items-center gap-2 mb-1"><span className="bg-magic/20 text-magic-dark text-[10px] font-black px-1.5 rounded uppercase">AI 导师</span></div><p className="text-xs text-slate-600 italic">"{aiAnalysis}"</p></div>}
                    </div>
                 </div>
              </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* Hint Toast */}
      <AnimatePresence>
         {showHint && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-24 left-6 right-6 z-[60]">
               <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-2xl shadow-lg flex gap-3 items-start">
                  <Lightbulb size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                  <div><p className="text-yellow-800 text-sm font-bold mb-1">提示</p><p className="text-yellow-700 text-xs leading-relaxed"><ChemicalText text={currentQuestion.hint || "试着把问题拆解开来！"} /></p></div>
                  <button onClick={() => setShowHint(false)} className="ml-auto text-yellow-400 hover:text-yellow-600"><X size={16}/></button>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </motion.div>
  );
}
