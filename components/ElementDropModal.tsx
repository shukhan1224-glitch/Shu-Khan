
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ElementDetail } from '../types';
import { X, Sparkles, Share2, Paintbrush, Loader2 } from 'lucide-react';
import { ElementVisual } from './ElementVisual';
import { generateElementImage } from '../services/geminiService';

interface ElementDropModalProps {
  element: ElementDetail;
  onClose: () => void;
}

export const ElementDropModal: React.FC<ElementDropModalProps> = ({ element, onClose }) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Check cache on mount
  useEffect(() => {
     const cached = localStorage.getItem(`element_img_${element.symbol}`);
     if (cached) setGeneratedImage(cached);
  }, [element.symbol]);

  const handleGenerate = async () => {
     if (isGenerating) return;
     setIsGenerating(true);
     
     try {
        const base64 = await generateElementImage(element.symbol, element.name, element.category, element.funFact);
        if (base64) {
           setGeneratedImage(base64);
           try {
              localStorage.setItem(`element_img_${element.symbol}`, base64);
           } catch (e) {
              console.warn("Local storage full");
           }
        }
     } catch (e) {
        console.error(e);
     } finally {
        setIsGenerating(false);
     }
  };

  const activeImage = generatedImage || element.image;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={onClose} />
      
      {/* Background Rays Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
         {[...Array(12)].map((_, i) => (
            <motion.div 
               key={i}
               className="absolute w-[200vw] h-[100px] bg-gradient-to-r from-transparent via-white/5 to-transparent"
               style={{ rotate: i * 30 }}
               animate={{ rotate: i * 30 + 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
         ))}
      </div>

      <motion.div 
        initial={{ scale: 0.5, opacity: 0, rotateX: 20 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="relative w-full max-w-sm bg-gradient-to-b from-white to-slate-50 rounded-[3rem] p-2 shadow-[0_0_50px_rgba(255,215,0,0.5)] overflow-hidden"
      >
         {/* Confetti */}
         <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(20)].map((_, i) => (
               <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ 
                     top: '50%', left: '50%', 
                     backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#C7F464'][i % 4] 
                  }}
                  animate={{ 
                     x: (Math.random() - 0.5) * 400,
                     y: (Math.random() - 0.5) * 400,
                     opacity: [1, 0],
                     scale: [0, 1.5, 0]
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
               />
            ))}
         </div>

         <div className="bg-white rounded-[2.5rem] p-6 border-4 border-yellow-200 relative overflow-hidden">
            <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400">
               <X size={20} />
            </button>

            <div className="text-center mb-6">
               <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-2 shadow-sm border border-yellow-200"
               >
                  <Sparkles size={12} /> New Discovery!
               </motion.div>
               <h2 className="text-3xl font-extrabold text-slate-800">发现新元素!</h2>
            </div>

            {/* Element Card */}
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.4 }}
               className={`relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-4 border-white mb-6 bg-gradient-to-br ${element.visual.gradient}`}
            >
               {activeImage ? (
                  <>
                     {/* FIX: Removed mix-blend-overlay here too for generated images */}
                     {generatedImage ? (
                        <img src={activeImage} alt={element.name} className="absolute inset-0 w-full h-full object-cover transition-opacity" />
                     ) : (
                        <img src={activeImage} alt={element.name} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90 transition-opacity" />
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </>
               ) : (
                  // Use the new procedural generator
                  <ElementVisual element={element} className="absolute inset-0 w-full h-full" />
               )}

               {/* AI Generate Button (Allows overriding) */}
               {!generatedImage && (
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={handleGenerate}
                     disabled={isGenerating}
                     className="absolute top-4 left-4 z-20 bg-white/20 backdrop-blur-md border border-white/40 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-white/30 transition-all shadow-sm"
                  >
                     {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Paintbrush size={12} />}
                     {isGenerating ? '生成中...' : '生成美图'}
                  </motion.button>
               )}

               <div className="absolute top-4 right-4 text-white z-10 opacity-80 font-mono text-xs drop-shadow-md">
                  {element.atomicNumber}
               </div>

               <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <span className="text-7xl font-black text-white drop-shadow-lg">{element.symbol}</span>
               </div>

               <div className="absolute bottom-6 left-0 right-0 text-center text-white px-4 z-10 drop-shadow-md">
                  <h3 className="text-2xl font-bold mb-1">{element.name}</h3>
                  <p className="text-xs font-medium opacity-90 line-clamp-2 bg-black/20 rounded-lg p-2 backdrop-blur-sm border border-white/10">
                     {element.funFact}
                  </p>
               </div>
            </motion.div>

            <button 
               onClick={onClose}
               className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-700 active:scale-95 transition-all"
            >
               收入囊中
            </button>
         </div>
      </motion.div>
    </div>
  );
};
