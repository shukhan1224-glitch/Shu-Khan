
import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { X, Check, RefreshCw, Dice5, FlaskConical, Microscope, Atom, Dna, Shield, Lock, Palette, Briefcase, Sparkles, Smile, Trophy, ArrowUpCircle } from 'lucide-react';
import { AvatarConfig, Profession } from '../types';
import { OctoAvatar } from './OctoAvatar';

const motion = m as any;

interface AvatarEditorProps {
  initialConfig: AvatarConfig;
  currentXP: number;
  onSave: (config: AvatarConfig) => void;
  onClose: () => void;
}

const SKIN_COLORS = ['#C0Aede', '#A8E6CF', '#FFD3B6', '#FFAAA5', '#4ECDC4', '#D4AF37']; 
const HATS = ['none', 'cap', 'goggles', 'wizard', 'astronaut', 'crown']; // Reordered for difficulty
const FACES = ['happy', 'smart', 'surprised', 'determined', 'dizzy'];
const ITEMS = ['none', 'book', 'flask', 'dna', 'atom', 'wand']; // Reordered for difficulty
const PATTERNS = ['none', 'spots', 'stripes', 'sparkles'];
const BG_EFFECTS = ['none', 'aura', 'bubbles', 'stars'];

const HAT_LABELS: Record<string, string> = { none: '无', wizard: '巫师帽', cap: '鸭舌帽', crown: '皇冠', goggles: '护目镜', astronaut: '宇航盔' };
const ITEM_LABELS: Record<string, string> = { none: '无', wand: '魔杖', flask: '烧瓶', book: '课本', atom: '原子', dna: 'DNA' };
const FACE_LABELS: Record<string, string> = { happy: '开心', smart: '睿智', surprised: '惊讶', determined: '决然', dizzy: '晕头' };
const PATTERN_LABELS: Record<string, string> = { none: '无', spots: '斑点', stripes: '条纹', sparkles: '闪光' };
const BG_LABELS: Record<string, string> = { none: '无', aura: '光环', bubbles: '气泡', stars: '星空' };

const PROFESSIONS: { id: Profession; label: string; icon: React.ReactNode; unlockXP: number; desc: string }[] = [
    { id: 'student', label: '练习生', icon: <Smile size={14} />, unlockXP: 0, desc: '化学之路的起点' },
    { id: 'scientist', label: '实验员', icon: <FlaskConical size={14} />, unlockXP: 100, desc: '开始接触试管和烧杯' },
    { id: 'researcher', label: '观察者', icon: <Microscope size={14} />, unlockXP: 300, desc: '洞察微观世界的奥秘' },
    { id: 'biochemist', label: '生化师', icon: <Dna size={14} />, unlockXP: 600, desc: '探索生命的化学本质' },
    { id: 'nuclear', label: '原子专家', icon: <Atom size={14} />, unlockXP: 1000, desc: '掌控原子核的能量' },
    { id: 'safety', label: '安全官', icon: <Shield size={14} />, unlockXP: 1500, desc: '实验室的守护神' },
];

// Define Unlock Requirements
const ACCESSORY_REQUIREMENTS: Record<string, { profId: Profession, label: string }> = {
  // Hats
  'goggles': { profId: 'scientist', label: '实验员' },
  'wizard': { profId: 'researcher', label: '观察者' },
  'astronaut': { profId: 'nuclear', label: '原子专家' },
  'crown': { profId: 'safety', label: '安全官' },
  
  // Items
  'flask': { profId: 'scientist', label: '实验员' },
  'dna': { profId: 'biochemist', label: '生化师' },
  'atom': { profId: 'nuclear', label: '原子专家' },
  'wand': { profId: 'safety', label: '安全官' },
};

type Tab = 'appearance' | 'accessories' | 'style';

export const AvatarEditor: React.FC<AvatarEditorProps> = ({ initialConfig, currentXP, onSave, onClose }) => {
  const [config, setConfig] = useState<AvatarConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<Tab>('appearance');

  // Helper to check if user has unlocked a specific item
  const isUnlocked = (itemId: string) => {
      const req = ACCESSORY_REQUIREMENTS[itemId];
      if (!req) return true; // No requirement = unlocked
      
      const reqProf = PROFESSIONS.find(p => p.id === req.profId);
      if (!reqProf) return true;
      
      return currentXP >= reqProf.unlockXP;
  };

  const randomize = () => {
    // Filter options to only include unlocked ones
    const unlockedHats = HATS.filter(isUnlocked);
    const unlockedItems = ITEMS.filter(isUnlocked);
    
    setConfig({
      ...config,
      skinColor: SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)],
      hat: unlockedHats[Math.floor(Math.random() * unlockedHats.length)] as any,
      face: FACES[Math.floor(Math.random() * FACES.length)] as any,
      item: unlockedItems[Math.floor(Math.random() * unlockedItems.length)] as any,
      pattern: PATTERNS[Math.floor(Math.random() * PATTERNS.length)] as any,
      bgEffect: BG_EFFECTS[Math.floor(Math.random() * BG_EFFECTS.length)] as any,
    });
  };

  const currentProfessionIcon = PROFESSIONS.find(p => p.id === config.profession)?.icon;
  
  // Logic to find next unlock
  const nextProfessionIndex = PROFESSIONS.findIndex(p => p.unlockXP > currentXP);
  const nextProfession = nextProfessionIndex !== -1 ? PROFESSIONS[nextProfessionIndex] : null;
  const currentProfessionObj = PROFESSIONS.slice().reverse().find(p => p.unlockXP <= currentXP) || PROFESSIONS[0];
  
  // Calculate progress to next profession
  let progressPercent = 100;
  let progressText = "已达巅峰！";
  
  if (nextProfession) {
      const prevXP = PROFESSIONS[nextProfessionIndex - 1]?.unlockXP || 0;
      const totalNeeded = nextProfession.unlockXP - prevXP;
      const currentProgress = currentXP - prevXP;
      progressPercent = Math.min(100, Math.max(0, (currentProgress / totalNeeded) * 100));
      progressText = `距离晋升 ${nextProfession.label} 还需 ${nextProfession.unlockXP - currentXP} XP`;
  }

  return (
    <div className="fixed inset-0 z-[80] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-cream w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl relative flex flex-col max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-4">
           <h2 className="text-xl font-extrabold text-slate-700 flex items-center gap-2">
              <span className="text-magic-vivid">Octo</span> 形象设计
           </h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center gap-4 overflow-y-auto pb-24 px-1 custom-scrollbar">
          
          {/* Avatar Preview */}
          <div className="relative shrink-0 group mt-2">
             {/* Profession Badge */}
             {config.profession && config.profession !== 'student' && (
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-float z-20 border-2 border-mint animate-bounce-slow">
                   {currentProfessionIcon}
                </div>
             )}
             
             <div className={`w-40 h-40 rounded-[2rem] bg-white shadow-float border-4 overflow-hidden relative flex items-center justify-center
                 ${config.profession !== 'student' ? 'border-mint' : 'border-white'}
             `}>
                <div className="bg-gradient-to-b from-slate-50 to-white absolute inset-0 -z-10" />
                <OctoAvatar config={config} size={140} />
                
                {/* Visual effect for profession */}
                {config.profession !== 'student' && (
                   <div className="absolute inset-0 border-4 border-dashed border-mint/50 rounded-[1.8rem] pointer-events-none" />
                )}
             </div>
             
             <button 
                onClick={randomize}
                className="absolute -bottom-2 right-0 bg-slate-800 text-white p-2.5 rounded-xl shadow-lg hover:scale-110 transition-transform font-bold flex items-center gap-1 z-30"
                title="随机生成 (只含已解锁物品)"
             >
                <Dice5 size={20} />
             </button>
          </div>

          {/* --- PROFESSION & CAREER PATH (Gamified) --- */}
          <div className="w-full bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Trophy size={12} /> 职业晋升之路
                </label>
                <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    当前: {currentProfessionObj.label}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative">
                    <motion.div 
                        className="h-full bg-gradient-to-r from-mint to-blue-400" 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                    />
                </div>
                <p className="text-[9px] text-right mt-1 font-bold text-slate-400 flex items-center justify-end gap-1">
                    {nextProfession ? (
                        <>
                            <ArrowUpCircle size={10} className="text-mint" /> 
                            {progressText}
                        </>
                    ) : (
                        <span className="text-yellow-500">已达最高职级!</span>
                    )}
                </p>
            </div>

            {/* Profession Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                {PROFESSIONS.map(p => {
                    const isLocked = currentXP < p.unlockXP;
                    const isSelected = config.profession === p.id;
                    
                    return (
                        <button 
                            key={p.id}
                            disabled={isLocked}
                            onClick={() => setConfig({...config, profession: p.id})}
                            className={`snap-start min-w-[90px] p-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 relative overflow-hidden group
                                ${isSelected 
                                    ? 'bg-mint/10 border-mint text-slate-800 ring-2 ring-mint/30' 
                                    : isLocked 
                                    ? 'bg-slate-50 border-slate-100 text-slate-400 opacity-80'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-mint/50'}
                            `}
                        >
                            <div className={`p-1.5 rounded-full mb-0.5 ${isSelected ? 'bg-white text-mint-dark shadow-sm' : isLocked ? 'bg-slate-200 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                                {isLocked ? <Lock size={12} /> : p.icon}
                            </div>
                            
                            <span className="text-[10px] font-bold">{p.label}</span>
                            
                            {isLocked && (
                                <div className="absolute inset-0 bg-slate-100/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                                    <span className="text-[9px] font-black text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm whitespace-nowrap">
                                        需 {p.unlockXP} XP
                                    </span>
                                </div>
                            )}
                            
                            {/* Unlock Requirement Label (Always visible for locked if not hovering on mobile) */}
                            {isLocked && (
                                <div className="text-[8px] font-bold text-slate-400 mt-0.5 bg-slate-100 px-1.5 py-0.5 rounded-full group-hover:opacity-0 transition-opacity">
                                    {p.unlockXP} XP
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
          </div>

          {/* Tabs for other customization */}
          <div className="w-full flex gap-1 p-1 bg-white border border-slate-100 rounded-xl mb-2 shrink-0">
             <TabButton active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')} icon={<Palette size={14}/>} label="外观" />
             <TabButton active={activeTab === 'accessories'} onClick={() => setActiveTab('accessories')} icon={<Briefcase size={14}/>} label="饰品" />
             <TabButton active={activeTab === 'style'} onClick={() => setActiveTab('style')} icon={<Sparkles size={14}/>} label="风格" />
          </div>

          {/* Controls Container */}
          <div className="w-full space-y-4">
             {activeTab === 'appearance' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                   <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">皮肤颜色</label>
                      <div className="flex gap-2 justify-center flex-wrap">
                         {SKIN_COLORS.map(c => (
                            <button 
                               key={c}
                               onClick={() => setConfig({...config, skinColor: c})}
                               className={`w-9 h-9 rounded-full border-2 shadow-sm transition-transform ${config.skinColor === c ? 'border-slate-700 scale-110 ring-2 ring-white' : 'border-white'}`}
                               style={{ backgroundColor: c }}
                            />
                         ))}
                      </div>
                   </div>
                   <ControlSection 
                      label="身体花纹" 
                      options={PATTERNS} 
                      labels={PATTERN_LABELS} 
                      current={config.pattern || 'none'} 
                      onChange={(v: string) => setConfig({...config, pattern: v as any})}
                      isUnlocked={isUnlocked} // Pass unlock check logic
                   />
                </motion.div>
             )}

             {activeTab === 'accessories' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                   <ControlSection 
                      label="帽子" 
                      options={HATS} 
                      labels={HAT_LABELS} 
                      current={config.hat} 
                      onChange={(v: string) => setConfig({...config, hat: v as any})}
                      isUnlocked={isUnlocked}
                   />
                   <ControlSection 
                      label="手持物品" 
                      options={ITEMS} 
                      labels={ITEM_LABELS} 
                      current={config.item} 
                      onChange={(v: string) => setConfig({...config, item: v as any})}
                      isUnlocked={isUnlocked}
                   />
                </motion.div>
             )}

             {activeTab === 'style' && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                   <ControlSection 
                      label="表情" 
                      options={FACES} 
                      labels={FACE_LABELS} 
                      current={config.face} 
                      onChange={(v: string) => setConfig({...config, face: v as any})}
                      isUnlocked={isUnlocked}
                   />
                   <ControlSection 
                      label="背景特效" 
                      options={BG_EFFECTS} 
                      labels={BG_LABELS} 
                      current={config.bgEffect || 'none'} 
                      onChange={(v: string) => setConfig({...config, bgEffect: v as any})}
                      isUnlocked={isUnlocked}
                   />
                </motion.div>
             )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/90 backdrop-blur-md rounded-b-[2.5rem] border-t border-slate-100 flex gap-3 z-20">
           <button 
             onClick={randomize}
             className="p-3.5 rounded-2xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-colors border-2 border-transparent hover:border-slate-200"
             title="随机"
           >
              <RefreshCw size={20} />
           </button>
           <button 
             onClick={() => onSave(config)}
             className="flex-1 py-3.5 rounded-2xl bg-slate-800 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors active:scale-95"
           >
              <Check size={20} /> 保存形象
           </button>
        </div>

      </motion.div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
   <button 
      onClick={onClick}
      className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold transition-all
         ${active ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}
      `}
   >
      {icon} {label}
   </button>
);

const ControlSection = ({ label, options, labels, current, onChange, isUnlocked = () => true }: any) => (
   <div className="bg-white p-3 rounded-2xl border border-slate-50 col-span-2">
      <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">{label}</label>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
         {options.map((opt: string) => {
            const unlocked = isUnlocked(opt);
            const req = ACCESSORY_REQUIREMENTS[opt];
            
            return (
               <button
                  key={opt}
                  onClick={() => unlocked && onChange(opt)}
                  disabled={!unlocked}
                  className={`px-3 py-2 rounded-xl shrink-0 border-2 transition-all flex flex-col items-center justify-center text-xs font-bold whitespace-nowrap relative min-w-[70px]
                     ${current === opt 
                        ? 'bg-slate-800 text-white border-slate-800 shadow-md scale-105 z-10' 
                        : !unlocked
                           ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-80 cursor-not-allowed'
                           : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-white hover:border-slate-200'
                     }
                  `}
               >
                  {/* Item Label or Lock Icon */}
                  <div className="flex items-center gap-1">
                     {!unlocked && <Lock size={10} />}
                     <span>{labels[opt] || opt}</span>
                  </div>

                  {/* Requirement Label for Locked Items */}
                  {!unlocked && req && (
                     <span className="text-[8px] mt-0.5 bg-slate-200/50 px-1.5 rounded text-slate-500">
                        需 {req.label}
                     </span>
                  )}
               </button>
            )
         })}
      </div>
   </div>
);
