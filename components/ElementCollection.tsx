
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, List, Grid3X3, RotateCcw, Smartphone, Move } from 'lucide-react';
import { ElementDetail, UserStats } from '../types';
import { ELEMENT_DETAILS, ALL_ELEMENT_SYMBOLS } from '../constants';

interface ElementCollectionProps {
  unlockedElements: string[];
  onClose: () => void;
  onSelectElement: (symbol: string) => void;
}

// Helper to determine grid placement in the Periodic Table (18 columns)
const getGridPosition = (atomicNumber: number) => {
  // Period 1
  if (atomicNumber === 1) return { col: 1, row: 1 };
  if (atomicNumber === 2) return { col: 18, row: 1 };
  
  // Period 2
  if (atomicNumber >= 3 && atomicNumber <= 4) return { col: atomicNumber - 2, row: 2 };
  if (atomicNumber >= 5 && atomicNumber <= 10) return { col: atomicNumber + 8, row: 2 };

  // Period 3
  if (atomicNumber >= 11 && atomicNumber <= 12) return { col: atomicNumber - 10, row: 3 };
  if (atomicNumber >= 13 && atomicNumber <= 18) return { col: atomicNumber, row: 3 };

  // Period 4
  if (atomicNumber >= 19 && atomicNumber <= 36) return { col: atomicNumber - 18, row: 4 };

  // Period 5
  if (atomicNumber >= 37 && atomicNumber <= 54) return { col: atomicNumber - 36, row: 5 };

  // Period 6 (Lanthanides 57-71 are separate)
  if (atomicNumber >= 55 && atomicNumber <= 56) return { col: atomicNumber - 54, row: 6 };
  if (atomicNumber >= 72 && atomicNumber <= 86) return { col: atomicNumber - 68, row: 6 };

  // Period 7 (Actinides 89-103 are separate)
  if (atomicNumber >= 87 && atomicNumber <= 88) return { col: atomicNumber - 86, row: 7 };
  if (atomicNumber >= 104 && atomicNumber <= 118) return { col: atomicNumber - 100, row: 7 };

  // Lanthanides (Row 8 visually)
  if (atomicNumber >= 57 && atomicNumber <= 71) return { col: atomicNumber - 53, row: 9 }; // Gap row 8

  // Actinides (Row 9 visually)
  if (atomicNumber >= 89 && atomicNumber <= 103) return { col: atomicNumber - 85, row: 10 };

  return { col: 1, row: 1 };
};

export const ElementCollection: React.FC<ElementCollectionProps> = ({ unlockedElements, onClose, onSelectElement }) => {
  // Default to LIST view on mobile (< 768px), TABLE view on desktop
  const [viewMode, setViewMode] = useState<'table' | 'list'>(() => window.innerWidth < 768 ? 'list' : 'table');
  const [scale, setScale] = useState(1);
  const totalCollected = unlockedElements.length;
  const progress = Math.round((totalCollected / 118) * 100);

  const handleZoomIn = () => setScale(s => Math.min(s + 0.1, 1.5));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.1, 0.5));
  const handleResetZoom = () => setScale(1);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-cream flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 md:px-6 md:py-4 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between shrink-0 z-20 shadow-sm">
         <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 flex items-center gap-2">
               元素收藏
               <span className="bg-magic/10 text-magic-dark text-[10px] md:text-xs px-2 py-1 rounded-full border border-magic/20 whitespace-nowrap">
                  {totalCollected} / 118
               </span>
            </h2>
            <div className="w-24 md:w-32 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
               <motion.div 
                  className="h-full bg-gradient-to-r from-mint to-magic" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
               />
            </div>
         </div>
         
         <div className="flex gap-2">
            {viewMode === 'table' && (
               <div className="hidden md:flex gap-1 bg-slate-100 p-1 rounded-xl mr-2">
                  <button onClick={handleZoomOut} className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500"><ZoomOut size={18} /></button>
                  <button onClick={handleResetZoom} className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500"><RotateCcw size={14} /></button>
                  <button onClick={handleZoomIn} className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500"><ZoomIn size={18} /></button>
               </div>
            )}
            
            <button 
               onClick={() => setViewMode(viewMode === 'table' ? 'list' : 'table')}
               className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
               {viewMode === 'table' ? <List size={20} /> : <Grid3X3 size={20} />}
               <span className="hidden md:inline text-xs font-bold">{viewMode === 'table' ? '列表模式' : '周期表模式'}</span>
            </button>
            <button onClick={onClose} className="p-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors shadow-lg">
               <X size={20} />
            </button>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative bg-slate-50">
         
         {viewMode === 'table' ? (
            <div className="h-full w-full overflow-auto custom-scrollbar relative bg-slate-50/50">
               {/* Mobile Tip Overlay */}
               <div className="md:hidden absolute top-4 left-0 right-0 flex justify-center z-30 pointer-events-none">
                  <div className="bg-slate-800/80 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 animate-pulse">
                     <Move size={14} /> 任意拖动查看
                  </div>
               </div>

               {/* Mobile Zoom Controls Overlay */}
               <div className="md:hidden absolute top-16 right-4 flex flex-col gap-2 z-30">
                  <button onClick={handleZoomIn} className="p-3 bg-white/90 backdrop-blur shadow-lg rounded-full text-slate-600 border border-slate-200"><ZoomIn size={20} /></button>
                  <button onClick={handleZoomOut} className="p-3 bg-white/90 backdrop-blur shadow-lg rounded-full text-slate-600 border border-slate-200"><ZoomOut size={20} /></button>
               </div>

               {/* Scroll Container */}
               <div className="p-10 min-w-max min-h-max flex justify-center items-start">
                  <motion.div 
                     animate={{ scale: scale }}
                     transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                     className="origin-top-left md:origin-top"
                     style={{ 
                        width: '1100px', // Fixed base width for the periodic table
                     }} 
                  >
                     {/* Grid System - Removed bg-white card style for cleaner look */}
                     <div className="grid grid-cols-18 gap-2 p-4 inline-block w-full relative">
                        {/* Watermark/Decor */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                           <span className="text-[15rem] font-black text-slate-900">Pt</span>
                        </div>

                        {ALL_ELEMENT_SYMBOLS.map((symbol) => {
                           const data = ELEMENT_DETAILS[symbol];
                           const isUnlocked = unlockedElements.includes(symbol);
                           const pos = getGridPosition(data.atomicNumber);
                           
                           return (
                              <motion.button
                                 key={symbol}
                                 layoutId={`element-${symbol}`}
                                 onClick={() => isUnlocked && onSelectElement(symbol)}
                                 whileHover={isUnlocked ? { scale: 1.25, zIndex: 50, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" } : {}}
                                 className={`w-full aspect-[4/5] rounded-xl flex flex-col items-center justify-center relative border transition-all duration-300
                                    ${isUnlocked 
                                       ? `bg-gradient-to-br ${data.visual.gradient} border-white/50 shadow-md cursor-pointer` 
                                       : 'bg-white border-slate-200 cursor-not-allowed opacity-30 grayscale'
                                    }
                                 `}
                                 style={{ 
                                    gridColumnStart: pos.col, 
                                    gridRowStart: pos.row 
                                 }}
                              >
                                 <span className={`text-[10px] absolute top-1 left-1.5 font-bold ${isUnlocked ? 'text-slate-700/60' : 'text-slate-400'}`}>
                                    {data.atomicNumber}
                                 </span>
                                 <span className={`text-lg font-black ${isUnlocked ? 'text-slate-800' : 'text-slate-300'}`}>
                                    {symbol}
                                 </span>
                                 {isUnlocked && (
                                    <div className="h-1 w-4 bg-white/40 rounded-full mt-1" />
                                 )}
                              </motion.button>
                           );
                        })}
                        
                        {/* Labels for Lanthanides/Actinides */}
                        <div className="col-start-3 row-start-6 text-[10px] font-bold text-slate-400 flex items-center justify-center opacity-50 border-2 border-dashed border-slate-300/50 rounded-xl bg-slate-100/30">57-71</div>
                        <div className="col-start-3 row-start-7 text-[10px] font-bold text-slate-400 flex items-center justify-center opacity-50 border-2 border-dashed border-slate-300/50 rounded-xl bg-slate-100/30">89-103</div>
                     </div>
                  </motion.div>
               </div>
            </div>
         ) : (
            // List View (Grid of Cards) - Optimized for Mobile
            <div className="h-full overflow-y-auto p-4 md:p-8 custom-scrollbar">
               {unlockedElements.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 pb-20">
                     <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Grid3X3 size={40} className="text-slate-300" />
                     </div>
                     <p className="font-bold">暂无收集元素</p>
                     <p className="text-xs mt-1">去闯关解锁你的第一个元素吧！</p>
                  </div>
               ) : (
                  <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4 pb-24">
                     {ALL_ELEMENT_SYMBOLS.map((symbol) => {
                        const data = ELEMENT_DETAILS[symbol];
                        const isUnlocked = unlockedElements.includes(symbol);
                        
                        // Show all elements in list view, locked ones are dimmed
                        // This encourages collection
                        
                        return (
                           <motion.button
                              key={symbol}
                              layoutId={`element-list-${symbol}`}
                              onClick={() => isUnlocked && onSelectElement(symbol)}
                              whileTap={isUnlocked ? { scale: 0.95 } : {}}
                              className={`aspect-[3/4] rounded-2xl p-3 flex flex-col justify-between shadow-sm border-2 relative overflow-hidden transition-all
                                 ${isUnlocked 
                                    ? `bg-gradient-to-br ${data.visual.gradient} border-white` 
                                    : 'bg-white border-slate-100 opacity-50'
                                 }
                              `}
                           >  
                              {!isUnlocked && (
                                 <div className="absolute inset-0 flex items-center justify-center bg-slate-50/50 z-10">
                                    <span className="text-2xl opacity-20">🔒</span>
                                 </div>
                              )}

                              <span className={`text-xs font-bold ${isUnlocked ? 'opacity-60' : 'text-slate-300'}`}>{data.atomicNumber}</span>
                              
                              <div className="text-center relative z-0">
                                 <span className={`text-3xl font-black ${isUnlocked ? 'text-slate-800' : 'text-slate-300'}`}>{symbol}</span>
                                 <span className={`text-[10px] block font-bold truncate mt-1 ${isUnlocked ? 'text-slate-600' : 'text-slate-300'}`}>{data.name}</span>
                              </div>
                              
                              <div className="flex justify-end">
                                 <div className={`w-2 h-2 rounded-full ${isUnlocked ? data.visual.color.replace('text', 'bg') : 'bg-slate-100'}`} />
                              </div>
                           </motion.button>
                        );
                     })}
                  </div>
               )}
            </div>
         )}
      </div>
    </motion.div>
  );
};
