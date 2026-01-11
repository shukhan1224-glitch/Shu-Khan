import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Trash2, BrainCircuit, ChevronDown, ChevronUp, RefreshCcw, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Mistake } from '../types';
import { explainMistake } from '../services/geminiService';
import { ChemicalText } from './ChemicalText';

const motion = m as any;

interface MistakeBookProps {
  mistakes: Mistake[];
  onRemoveMistake: (id: string) => void;
}

export const MistakeBook: React.FC<MistakeBookProps> = ({ mistakes, onRemoveMistake }) => {
  const [retryId, setRetryId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  // Retry State - General
  const [inputVal, setInputVal] = useState('');
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [shake, setShake] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  // Retry State - Sort/Order Questions
  const [sortSlots, setSortSlots] = useState<(string | null)[]>([]); // Array of Item IDs
  const [sortBank, setSortBank] = useState<string[]>([]); // Array of Item IDs

  const handleAnalyze = async (mistake: Mistake) => {
    if (aiAnalysis[mistake.id]) return;
    
    setAnalyzingId(mistake.id);
    let correctAnswer = '';
    if (mistake.question.type === 'sort') {
       correctAnswer = mistake.question.correctOrder?.join(' -> ') || 'Sequence';
    } else if ((mistake.question.type || 'mcq') === 'mcq' && mistake.question.options) {
       correctAnswer = mistake.question.options[mistake.question.correctIndex!];
    } else {
       correctAnswer = mistake.question.validAnswer!;
    }

    const analysis = await explainMistake(mistake.question.text, mistake.userAnswer, correctAnswer);
    setAiAnalysis(prev => ({ ...prev, [mistake.id]: analysis }));
    setAnalyzingId(null);
  };

  const startRetry = (id: string) => {
    setRetryId(id);
    setInputVal('');
    setSelectedOpt(null);
    setSuccessId(null);
    
    // Initialize Sort State if needed
    const m = mistakes.find(x => x.id === id);
    if (m && m.question.type === 'sort' && m.question.items) {
        const q = m.question;
        // Determine slot count based on template or item count
        let slotCount = q.items.length;
        if (q.template) {
            const matches = q.template.match(/\{\d+\}/g);
            if (matches) slotCount = matches.length;
        }
        setSortSlots(Array(slotCount).fill(null));
        // Shuffle items for the bank
        setSortBank(q.items.map(i => i.id).sort(() => Math.random() - 0.5));
    } else {
        setSortSlots([]);
        setSortBank([]);
    }
  };

  const cancelRetry = () => {
    setRetryId(null);
  };

  // Sort Handlers
  const handleSortBankClick = (itemId: string) => {
      const emptyIndex = sortSlots.indexOf(null);
      if (emptyIndex !== -1) {
          const newSlots = [...sortSlots];
          newSlots[emptyIndex] = itemId;
          setSortSlots(newSlots);
          setSortBank(prev => prev.filter(id => id !== itemId));
      }
  };

  const handleSortSlotClick = (index: number) => {
      const itemId = sortSlots[index];
      if (itemId) {
          const newSlots = [...sortSlots];
          newSlots[index] = null;
          setSortSlots(newSlots);
          setSortBank(prev => [...prev, itemId]);
      }
  };

  // --- Robust Text Normalization (Matches QuizModal logic) ---
  const normalizeText = (str: string) => {
      if (!str) return '';
      return str.toString()
          .trim()
          .toLowerCase()
          .replace(/[\$\{\}\_\^]/g, '') // Remove LaTeX chars
          .replace(/\\?uparrow/g, '')   // Remove uparrow description
          .replace(/\\?downarrow/g, '') // Remove downarrow description
          .replace(/↑/g, '')
          .replace(/↓/g, '')
          .replace(/\s+/g, '');         // Remove all spaces
  };

  const submitRetry = (mistake: Mistake) => {
    const q = mistake.question;
    let isCorrect = false;

    if (q.type === 'sort') {
        if (sortSlots.every(s => s !== null) && q.correctOrder && q.items) {
            // Reconstruct user answer content array
            const userContentOrder = sortSlots.map(sid => q.items!.find(i => i.id === sid)?.content || '');
            const correctOrder = q.correctOrder;

            // 1. Strict Linear Check (Fast Path)
            const isStrictMatch = userContentOrder.every((val, index) => {
                return normalizeText(val) === normalizeText(correctOrder[index]);
            });
            
            if (isStrictMatch) {
                isCorrect = true;
            } else {
                // 2. Smart Equation Check (Commutative Property)
                // Determine effective template if not explicit
                const effectiveTemplate = q.template || q.items.map((_, i) => `{${i}}`).join(' -> ');
                const arrowRegex = /->|→|\\rightarrow|\\to/;
                
                if (effectiveTemplate.match(arrowRegex)) {
                    const parts = effectiveTemplate.split(arrowRegex);
                    if (parts.length === 2) {
                        const leftTemplate = parts[0];
                        // Count placeholders {n} on LEFT side
                        const leftSlotCount = (leftTemplate.match(/\{\d+\}/g) || []).length;
                        
                        // Partition User Answer
                        const userLeft = userContentOrder.slice(0, leftSlotCount).map(normalizeText).sort();
                        const userRight = userContentOrder.slice(leftSlotCount).map(normalizeText).sort();

                        // Partition Correct Answer
                        const correctLeft = correctOrder.slice(0, leftSlotCount).map(s => normalizeText(s || '')).sort();
                        const correctRight = correctOrder.slice(leftSlotCount).map(s => normalizeText(s || '')).sort();

                        // Compare Sorted Arrays (Order independent within sides)
                        const leftValid = JSON.stringify(userLeft) === JSON.stringify(correctLeft);
                        const rightValid = JSON.stringify(userRight) === JSON.stringify(correctRight);

                        if (leftValid && rightValid) isCorrect = true;
                    }
                }
            }
        }
    } else if (q.type === 'input') {
       const stripSuffix = (str: string) => str.replace(/(色|气体|气|沉淀|溶液)$/g, '');
       if (stripSuffix(normalizeText(inputVal)) === stripSuffix(normalizeText(q.validAnswer || ''))) isCorrect = true;
    } else {
       // MCQ
       if (selectedOpt === q.correctIndex) isCorrect = true;
    }

    if (isCorrect) {
       setSuccessId(mistake.id);
       setTimeout(() => {
          onRemoveMistake(mistake.id);
          setRetryId(null);
          setSuccessId(null);
       }, 1500);
    } else {
       setShake(true);
       setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-10 pb-10 px-4">
      <h1 className="text-3xl font-extrabold text-slate-700 mb-2">错题本</h1>
      <p className="text-slate-500 mb-8 text-sm">消灭错题来巩固知识！只有答对才能消除哦。👊</p>

      {mistakes.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 opacity-50">
          <BrainCircuit size={64} className="text-mint mb-4" />
          <p className="text-slate-400 font-bold">太棒了！目前没有错题。</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {mistakes.map((mistake) => {
               const isRetrying = retryId === mistake.id;
               const isSuccess = successId === mistake.id;

               return (
                <motion.div
                  key={mistake.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0 }}
                  layout
                  className={`rounded-3xl p-5 shadow-soft border transition-all duration-300 relative overflow-hidden
                    ${isSuccess ? 'bg-mint border-mint' : 'bg-white border-slate-50'}
                  `}
                >
                  {isSuccess && (
                     <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-mint z-20"
                     >
                        <div className="text-white text-center">
                           <CheckCircle size={48} className="mx-auto mb-2 animate-bounce" />
                           <h3 className="text-xl font-black">错题消除!</h3>
                        </div>
                     </motion.div>
                  )}

                  {!isRetrying ? (
                    // --- Normal View ---
                    <>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-700 mb-3 text-lg leading-tight">
                             <ChemicalText text={mistake.question.text} />
                          </h3>
                          <div className="bg-coral/10 p-3 rounded-2xl inline-block">
                             <p className="text-coral text-xs font-bold">你的错误答案: <span className="line-through opacity-70"><ChemicalText text={mistake.userAnswer} /></span></p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                         <button
                           onClick={() => handleAnalyze(mistake)}
                           disabled={analyzingId === mistake.id || !!aiAnalysis[mistake.id]}
                           className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all
                             ${aiAnalysis[mistake.id] 
                               ? 'bg-mint/20 text-mint-dark cursor-default'
                               : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                             }
                           `}
                         >
                           <BrainCircuit size={14} />
                           {analyzingId === mistake.id ? '分析中...' : aiAnalysis[mistake.id] ? '已生成诊断' : 'AI 诊断'}
                         </button>

                         <button
                           onClick={() => startRetry(mistake.id)}
                           className="bg-slate-800 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
                         >
                            <RefreshCcw size={14} /> 重做消除
                         </button>
                      </div>

                      {/* AI Analysis Result */}
                      <AnimatePresence>
                        {aiAnalysis[mistake.id] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 bg-gradient-to-br from-mint/10 to-transparent border border-mint/20 rounded-2xl p-4"
                          >
                            <h4 className="text-xs font-bold text-mint-dark mb-1 flex items-center gap-1">
                              <BrainCircuit size={12} /> AI 导师点评
                            </h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              <ChemicalText text={aiAnalysis[mistake.id]} />
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    // --- Retry View ---
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative"
                    >
                       <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">重做模式</h3>
                          <button onClick={cancelRetry} className="p-1 rounded-full bg-slate-100 text-slate-400">
                             <XCircle size={20} />
                          </button>
                       </div>
                       
                       <p className="font-bold text-slate-800 text-lg mb-6">
                          <ChemicalText text={mistake.question.text} />
                       </p>
                       
                       <motion.div 
                          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                          className="space-y-3 mb-6"
                       >
                          {mistake.question.type === 'sort' ? (
                              // --- Sort Interface ---
                              <div className="space-y-4">
                                  {/* Slots */}
                                  <div className="flex flex-wrap gap-2 items-center justify-center p-3 bg-slate-50 rounded-2xl border-2 border-slate-100 min-h-[80px]">
                                      {sortSlots.map((itemId, idx) => {
                                          const item = mistake.question.items?.find(i => i.id === itemId);
                                          return (
                                              <React.Fragment key={idx}>
                                                  <button
                                                      onClick={() => handleSortSlotClick(idx)}
                                                      className={`px-3 py-2 rounded-xl font-bold text-sm border-2 transition-all
                                                          ${item 
                                                              ? 'bg-white border-slate-200 text-slate-700 shadow-sm' 
                                                              : 'bg-slate-100 border-dashed border-slate-300 text-slate-400 w-16 h-10 flex items-center justify-center'
                                                          }
                                                      `}
                                                  >
                                                      {item ? <ChemicalText text={item.content} /> : <span className="text-[10px]">位置 {idx+1}</span>}
                                                  </button>
                                                  {idx < sortSlots.length - 1 && <ArrowRight size={14} className="text-slate-300" />}
                                              </React.Fragment>
                                          );
                                      })}
                                  </div>
                                  
                                  {/* Bank */}
                                  <div>
                                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1">点击选择:</p>
                                      <div className="flex flex-wrap gap-2">
                                          {sortBank.map((itemId) => {
                                              const item = mistake.question.items?.find(i => i.id === itemId);
                                              if(!item) return null;
                                              return (
                                                  <button
                                                      key={itemId}
                                                      onClick={() => handleSortBankClick(itemId)}
                                                      className="px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-bold text-sm text-slate-600 shadow-[0_2px_0_rgba(0,0,0,0.05)] active:translate-y-[2px] active:shadow-none transition-all"
                                                  >
                                                      <ChemicalText text={item.content} />
                                                  </button>
                                              )
                                          })}
                                      </div>
                                  </div>
                              </div>
                          ) : mistake.question.type === 'input' ? (
                             <input 
                                autoFocus
                                type="text"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                placeholder="输入正确答案..."
                                className="w-full text-center text-xl font-bold p-4 rounded-2xl border-2 border-slate-200 focus:border-mint outline-none bg-slate-50"
                             />
                          ) : (
                             mistake.question.options?.map((opt, idx) => (
                                <button
                                   key={idx}
                                   onClick={() => setSelectedOpt(idx)}
                                   className={`w-full p-3 rounded-xl text-left font-bold text-sm border-2 transition-all
                                      ${selectedOpt === idx ? 'border-mint bg-mint/10 text-slate-800' : 'border-slate-100 bg-white text-slate-500'}
                                   `}
                                >
                                   {String.fromCharCode(65 + idx)}. <ChemicalText text={opt} />
                                </button>
                             ))
                          )}
                       </motion.div>

                       <button
                          onClick={() => submitRetry(mistake)}
                          disabled={
                              mistake.question.type === 'input' ? !inputVal : 
                              mistake.question.type === 'sort' ? sortSlots.some(s => s === null) :
                              selectedOpt === null
                          }
                          className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold shadow-md hover:bg-slate-700 disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
                       >
                          提交验证
                       </button>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};