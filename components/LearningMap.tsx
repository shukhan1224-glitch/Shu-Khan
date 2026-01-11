
import React, { useState, useMemo } from 'react';
import { motion as m } from 'framer-motion';
import { Check, Gem, Zap, Dna, Hexagon, Cloud, Mountain, ArrowLeft, Star, Crown, Search, Construction, Lock } from 'lucide-react';
import { Level } from '../types';
import { CHAPTER_METADATA } from '../constants';

const motion = m as any;

interface LearningMapProps {
  levels: Level[];
  onLevelClick: (level: Level, startPhase?: number) => void;
  isAdmin?: boolean;
}

type Grade = 'S1' | 'S2' | 'S3';

// --- THEME CONFIGURATION ---
const gradeThemes: Record<Grade, { 
  title: string; 
  subtitle: string;
  icon: React.ReactNode;
  primaryColor: string;
  secondaryColor: string;
  bgGradient: string;
  cardTexture: string;
  particle: string;
}> = {
  S1: { 
    title: '水晶洞窟', 
    subtitle: '挖掘晶体与矿物的奥秘 (无机)',
    icon: <Gem size={24} />,
    primaryColor: 'text-mint',
    secondaryColor: 'bg-mint',
    bgGradient: 'from-slate-900 via-slate-800 to-mint-900',
    cardTexture: "bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]",
    particle: '💎'
  },
  S2: { 
    title: '风暴尖塔', 
    subtitle: '驾驭能量、雷电与气体 (物化)',
    icon: <Zap size={24} />,
    primaryColor: 'text-apricot',
    secondaryColor: 'bg-apricot',
    bgGradient: 'from-blue-900 via-indigo-900 to-apricot-900',
    cardTexture: "bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]", 
    particle: '⚡'
  },
  S3: { 
    title: '生命之森', 
    subtitle: '培育无限生长的碳链 (有机)',
    icon: <Dna size={24} />,
    primaryColor: 'text-coral',
    secondaryColor: 'bg-coral',
    bgGradient: 'from-teal-900 via-emerald-900 to-coral-900',
    cardTexture: "bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')]", 
    particle: '🌿'
  },
};

export const LearningMap: React.FC<LearningMapProps> = ({ levels, onLevelClick, isAdmin }) => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>('S1');
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  
  // Dev state to allow admin to bypass the S3 lock
  const [bypassS3Lock, setBypassS3Lock] = useState(false);

  const theme = gradeThemes[selectedGrade];

  const gradeLevels = useMemo(() => {
    return levels.filter(l => l.grade === selectedGrade);
  }, [levels, selectedGrade]);

  const chapterGroups = useMemo(() => {
     const groups: Record<string, Level[]> = {};
     gradeLevels.forEach(level => {
        if (!groups[level.chapterId]) {
           groups[level.chapterId] = [];
        }
        groups[level.chapterId].push(level);
     });
     return groups;
  }, [gradeLevels]);

  const uniqueChapterIds = Object.keys(chapterGroups);

  const currentViewLevels = useMemo(() => {
     if (selectedChapterId) {
        return gradeLevels.filter(l => l.chapterId === selectedChapterId);
     }
     return [];
  }, [gradeLevels, selectedChapterId]);

  // Check if we should show the "Coming Soon" screen
  const isLockedS3 = selectedGrade === 'S3' && !bypassS3Lock && !isAdmin;

  return (
    <div className={`relative w-full min-h-full pb-20 pt-6 transition-colors duration-700 bg-gradient-to-b ${theme.bgGradient} rounded-3xl overflow-hidden shadow-2xl`}>
      
      {/* --- DYNAMIC BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {selectedGrade === 'S1' && (
            <>
               <div className="absolute top-20 left-10 text-mint/20 opacity-50"><Mountain size={200} /></div>
               <div className="absolute bottom-40 right-10 text-mint/10 opacity-50"><Gem size={150} /></div>
               {[...Array(8)].map((_, i) => (
                  <motion.div 
                     key={i}
                     initial={{ y: 0, opacity: 0.2 }}
                     animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
                     transition={{ duration: 4 + i, repeat: Infinity }}
                     className="absolute text-mint/30 text-4xl"
                     style={{ left: `${Math.random()*80 + 10}%`, top: `${Math.random()*80 + 10}%` }}
                  >❖</motion.div>
               ))}
            </>
         )}
         {selectedGrade === 'S2' && (
            <>
               <div className="absolute top-10 right-20 text-apricot/20 opacity-40"><Cloud size={180} /></div>
               <div className="absolute bottom-20 left-20 text-blue-300/10 opacity-40"><Cloud size={240} /></div>
               {[...Array(6)].map((_, i) => (
                  <motion.div 
                     key={i}
                     className="absolute h-0.5 bg-apricot/40 blur-sm"
                     style={{ width: Math.random()*100+50, left: Math.random()*80+'%', top: Math.random()*90+'%' }}
                     animate={{ x: [0, 100, 0], opacity: [0, 1, 0] }}
                     transition={{ duration: 5 + i, repeat: Infinity }}
                  />
               ))}
            </>
         )}
         {selectedGrade === 'S3' && (
            <>
               <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')]"></div>
               {/* Floating Hexagons for S3 */}
               {[...Array(15)].map((_, i) => (
                  <motion.div 
                     key={i}
                     className="absolute text-coral/10"
                     style={{ left: Math.random()*100+'%', top: Math.random()*100+'%' }}
                     animate={{ 
                        y: [0, -50, 0], 
                        rotate: [0, 360],
                        opacity: [0.1, 0.3, 0.1] 
                     }}
                     transition={{ duration: 10 + Math.random()*10, repeat: Infinity, ease: 'linear' }}
                  >
                     <Hexagon size={20 + Math.random()*100} strokeWidth={1} />
                  </motion.div>
               ))}
            </>
         )}
      </div>

      {/* --- GRADE SELECTOR --- */}
      <div className="sticky top-4 z-40 px-6 mb-8">
        <div className="bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl flex justify-between shadow-purple-glow border border-white/10 max-w-sm mx-auto relative overflow-hidden">
          {(Object.keys(gradeThemes) as Grade[]).map((grade) => (
            <button
              key={grade}
              onClick={() => { setSelectedGrade(grade); setSelectedChapterId(null); }}
              className={`relative flex-1 py-3 rounded-xl text-xs font-black transition-all duration-500 z-10 flex flex-col items-center gap-1
                ${selectedGrade === grade ? 'text-white' : 'text-slate-400 hover:text-white/80'}`}
            >
              <span className={`text-lg transition-transform duration-300 ${selectedGrade === grade ? 'scale-110 -translate-y-1' : ''}`}>
                 {grade === 'S1' ? '💎' : grade === 'S2' ? '⚡' : '🌿'}
              </span>
              <span className="uppercase tracking-wider">{grade}</span>
              
              {selectedGrade === grade && (
                <motion.div
                  layoutId="activeGrade"
                  className={`absolute inset-0 rounded-xl bg-white/10 border border-white/20 shadow-inner`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* --- REALM HEADER --- */}
      <div className="px-6 mb-8 text-center relative z-10">
        <motion.div
           key={selectedGrade}
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="inline-block"
        >
           <h1 className={`text-3xl font-magic font-black tracking-tight drop-shadow-md flex items-center justify-center gap-3 mb-1 ${theme.primaryColor} bg-clip-text`}>
             {theme.icon}
             {theme.title}
           </h1>
           <p className="text-white/60 text-xs font-bold tracking-widest uppercase border-t border-white/10 pt-2 inline-block px-4">
              {theme.subtitle}
           </p>
           {isAdmin && (
              <div className="mt-2 text-[10px] font-black text-magic-light bg-magic/20 px-2 py-0.5 rounded-full inline-block border border-magic/30">
                 ADMIN DEBUG MODE
              </div>
           )}
        </motion.div>
      </div>

      {/* --- BACK BUTTON --- */}
      {selectedChapterId && !isLockedS3 && (
         <div className="px-6 mb-4 max-w-3xl mx-auto relative z-20">
            <button 
               onClick={() => setSelectedChapterId(null)}
               className="flex items-center gap-2 text-white/80 hover:text-white font-bold bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm transition-colors"
            >
               <ArrowLeft size={18} />
               返回章节列表
            </button>
         </div>
      )}

      {/* --- CONTENT GRID OR LOCKED SCREEN --- */}
      {isLockedS3 ? (
         // --- S3 COMING SOON OVERLAY ---
         <div className="px-6 flex flex-col items-center justify-center min-h-[300px] relative z-20 text-center">
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
               className="relative mb-8"
            >
               <div className="absolute inset-0 bg-coral/20 blur-3xl rounded-full animate-pulse" />
               <div className="w-32 h-32 bg-slate-900/50 backdrop-blur-md rounded-3xl border-2 border-white/10 flex items-center justify-center relative shadow-2xl">
                  <Dna size={64} className="text-coral opacity-80" />
                  <div className="absolute -bottom-4 -right-4 bg-white text-slate-900 p-2 rounded-xl shadow-lg">
                     <Lock size={20} />
                  </div>
               </div>
            </motion.div>

            <h2 className="text-2xl font-magic text-white mb-3">迷雾重重...</h2>
            <p className="text-slate-300 text-sm max-w-xs leading-relaxed mb-8">
               Octo 正在这片森林里调制最复杂的有机药水。
               <br/>新的挑战即将解锁，敬请期待！
            </p>

            <div className="flex gap-2 mb-8">
               <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-white/40 border border-white/10">COMING SOON</span>
               <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-white/40 border border-white/10">2026 UPDATE</span>
            </div>

            {isAdmin && (
               <button 
                  onClick={() => setBypassS3Lock(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 rounded-xl text-xs font-bold hover:bg-yellow-500/30 transition-colors animate-pulse"
               >
                  <Construction size={14} />
                  管理员通道：进入施工现场
               </button>
            )}
         </div>
      ) : (
         // --- STANDARD GRID ---
         <div className="px-4 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
            
            {!selectedChapterId && uniqueChapterIds.map((chapterId, index) => {
               const levelsInChapter = chapterGroups[chapterId];
               const meta = (CHAPTER_METADATA as any)[chapterId] || { title: '未知章节', description: '...', emoji: '❓' };
               const completedCount = levelsInChapter.filter(l => l.completed).length;
               const isComplete = completedCount === levelsInChapter.length && levelsInChapter.length > 0;
               
               return (
               <motion.div
                  key={chapterId}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedChapterId(chapterId)}
                  className="group relative h-40 rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 border-2 border-white/10 hover:border-white/30 bg-slate-800/80 backdrop-blur-md shadow-lg"
               >
                  <div className={`absolute left-0 top-0 bottom-0 w-4 ${theme.secondaryColor} opacity-80`} />
                  <div className="p-6 pl-8 flex flex-col justify-between h-full">
                     <div className="flex justify-between items-start">
                        <div>
                           <span className="text-4xl mb-2 block filter drop-shadow-md">{meta.emoji}</span>
                           <h3 className="font-bold text-white text-lg leading-tight">{meta.title}</h3>
                        </div>
                        {isComplete && (
                           <div className={`w-8 h-8 rounded-full ${theme.secondaryColor} flex items-center justify-center text-slate-800`}>
                              <Check size={16} strokeWidth={4} />
                           </div>
                        )}
                     </div>
                     <div className="flex items-end justify-between">
                        <p className="text-xs text-slate-400 font-medium line-clamp-1 flex-1 mr-2">
                           {meta.description}
                        </p>
                        <div className="text-[10px] font-black text-white/50 bg-black/30 px-2 py-1 rounded-lg">
                           {completedCount} / {levelsInChapter.length} 小节
                        </div>
                     </div>
                  </div>
               </motion.div>
               );
            })}

            {selectedChapterId && currentViewLevels.map((level, index) => {
               // --- PROGRESS & MASTERY LOGIC ---
               const totalQ = level.totalQuestionsCount || level.phases.reduce((sum, p) => sum + p.questions.length, 0);
               const answeredCount = level.answeredQuestionIds?.length || 0;
               const masteryPercent = totalQ > 0 ? Math.round((answeredCount / totalQ) * 100) : 0;
               const isMastered = masteryPercent === 100;

               const showBarPercent = level.completed ? 100 : (level.score > 0 ? 30 : 0);
               
               const hasDetectiveMode = level.phases.some(p => p.questions.some(q => q.type === 'detective'));

               return (
                  <motion.div
                  key={level.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onLevelClick(level)}
                  className={`group relative h-44 rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 border-2 border-transparent hover:border-white/30
                     ${selectedGrade === 'S1' ? 'shadow-[0_10px_30px_-10px_rgba(168,230,207,0.2)]' : 
                        selectedGrade === 'S2' ? 'shadow-[0_10px_30px_-10px_rgba(255,211,182,0.2)]' : 
                        'shadow-[0_10px_30px_-10px_rgba(255,170,165,0.2)]'}
                     ${isMastered ? 'ring-2 ring-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.4)]' : ''}
                  `}
                  >
                  <div className={`absolute inset-0 bg-slate-900 ${theme.cardTexture} opacity-20 mix-blend-overlay transition-opacity group-hover:opacity-40`} />
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity
                     ${selectedGrade === 'S1' ? 'from-slate-800 to-mint-900/80 group-hover:to-mint-800' :
                        selectedGrade === 'S2' ? 'from-slate-800 to-apricot-900/80 group-hover:to-apricot-800' :
                        'from-slate-800 to-coral-900/80 group-hover:to-coral-800'}
                  `} />

                  <div className={`absolute -right-6 -bottom-6 opacity-10 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 group-hover:opacity-20 ${theme.primaryColor}`}>
                     {selectedGrade === 'S1' ? <Gem size={140} strokeWidth={1} /> :
                        selectedGrade === 'S2' ? <Cloud size={140} strokeWidth={1} /> :
                        <Hexagon size={140} strokeWidth={1} />}
                  </div>

                  {/* 100% Mastery Glow Effect */}
                  {isMastered && (
                        <div className="absolute inset-0 z-0 bg-yellow-400/5 animate-pulse" />
                  )}

                  <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                     <div className="flex justify-between items-start">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-inner border border-white/10 relative overflow-hidden
                           ${level.completed ? theme.secondaryColor + ' text-slate-900' : 'bg-white/5 text-white/80'}
                        `}>
                           <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50" />
                           {isMastered ? <Crown size={24} strokeWidth={2} fill="white" className="text-white" /> : 
                           level.completed ? <Check size={24} strokeWidth={4} /> : (index + 1)}
                        </div>

                        <div className="flex gap-1">
                           {/* Detective Badge */}
                           {hasDetectiveMode && (
                                 <div className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase backdrop-blur-sm border bg-slate-900/50 text-white border-white/20 shadow-md animate-pulse">
                                    <Search size={10} /> DETECTIVE
                                 </div>
                           )}

                           {/* Mastery Badge */}
                           {level.completed && (
                                 <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase backdrop-blur-sm border
                                    ${isMastered ? 'bg-yellow-400 text-yellow-900 border-yellow-200 shadow-md' : 'bg-black/30 text-white/70 border-white/10'}
                                 `}>
                                    {isMastered ? <Star size={10} fill="currentColor"/> : <Star size={10} />}
                                    {masteryPercent}% 探索
                                 </div>
                           )}
                           
                           {/* Phase Jumps (Admin/Debug) */}
                           <div className="flex gap-1 bg-black/30 p-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                              {level.phases.map((p, pIdx) => (
                                    <button
                                       key={p.id}
                                       onClick={(e) => {
                                          if (isAdmin) {
                                             e.stopPropagation();
                                             onLevelClick(level, pIdx);
                                          }
                                       }}
                                       title={isAdmin ? `Jump to Phase ${pIdx + 1}` : undefined}
                                       className={`w-2.5 h-2.5 rounded-full transition-all duration-300 relative group/p
                                          ${level.completed ? theme.secondaryColor : 'bg-white/20'}
                                          ${isAdmin ? 'hover:scale-150 hover:shadow-[0_0_8px_white]' : ''}
                                       `}
                                    >
                                       {isAdmin && (
                                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/p:opacity-100 bg-white text-slate-800 text-[8px] px-1 rounded font-black whitespace-nowrap pointer-events-none transition-opacity">
                                             P{pIdx+1}
                                          </div>
                                       )}
                                    </button>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div>
                        <h3 className="font-bold text-white text-lg leading-tight mb-1 drop-shadow-md tracking-tight">{level.title}</h3>
                        <div className="w-10 h-1 rounded-full bg-white/20 mb-2 group-hover:w-20 transition-all duration-500" />
                        <p className="text-xs text-slate-300 font-medium line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity">
                           {level.description}
                        </p>
                     </div>
                  </div>

                  <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-black/20 border-l border-white/5">
                     <div 
                        className={`absolute bottom-0 w-full transition-all duration-1000 ${theme.secondaryColor} shadow-[0_0_8px_currentColor]`}
                        style={{ height: `${showBarPercent}%` }} 
                     />
                  </div>
                  </motion.div>
               );
            })}
         </div>
      )}
    </div>
  );
};
