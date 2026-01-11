
import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { X, Check, RefreshCw, Dice5, FlaskConical, Microscope, Atom, Dna, Shield, Lock, Palette, Briefcase, Sparkles, Smile } from 'lucide-react';
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
const HATS = ['none', 'wizard', 'cap', 'crown', 'goggles', 'astronaut'];
const FACES = ['happy', 'smart', 'surprised', 'determined', 'dizzy'];
const ITEMS = ['none', 'wand', 'flask', 'book', 'atom', 'dna'];
const PATTERNS = ['none', 'spots', 'stripes', 'sparkles'];
const BG_EFFECTS = ['none', 'aura', 'bubbles', 'stars'];

const HAT_LABELS: Record<string, string> = { none: '无', wizard: '巫师帽', cap: '鸭舌帽', crown: '皇冠', goggles: '护目镜', astronaut: '宇航盔' };
const ITEM_LABELS: Record<string, string> = { none: '无', wand: '魔杖', flask: '烧瓶', book: '课本', atom: '原子', dna: 'DNA' };
const FACE_LABELS: Record<string, string> = { happy: '开心', smart: '睿智', surprised: '惊讶', determined: '决然', dizzy: '晕头' };
const PATTERN_LABELS: Record<string, string> = { none: '无', spots: '斑点', stripes: '条纹', sparkles: '闪光' };
const BG_LABELS: Record<string, string> = { none: '无', aura: '光环', bubbles: '气泡', stars: '星空' };

const PROFESSIONS: { id: Profession; label: string; icon: React.ReactNode; unlockXP: number }[] = [
    { id: 'student', label: '练习生', icon: null, unlockXP: 0 },
    { id: 'scientist', label: '实验员', icon: <FlaskConical size={14} />, unlockXP: 100 },
    { id: 'researcher', label: '观察者', icon: <Microscope size={14} />, unlockXP: 300 },
    { id: 'biochemist', label: '生化师', icon: <Dna size={14} />, unlockXP: 600 },
    { id: 'nuclear', label: '原子专家', icon: <Atom size={14} />, unlockXP: 1000 },
    { id: 'safety', label: '安全官', icon: <Shield size={14} />, unlockXP: 1500 },
];

type Tab = 'appearance' | 'accessories' | 'style';

export const AvatarEditor: React.FC<AvatarEditorProps> = ({ initialConfig, currentXP, onSave, onClose }) => {
  const [config, setConfig] = useState<AvatarConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<Tab>('appearance');

  const randomize = () => {
    setConfig({
      ...config,
      skinColor: SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)],
      hat: HATS[Math.floor(Math.random() * HATS.length)] as any,
      face: FACES[Math.floor(Math.random() * FACES.length)] as any,
      item: ITEMS[Math.floor(Math.random() * ITEMS.length)] as any,
      pattern: PATTERNS[Math.floor(Math.random() * PATTERNS.length)] as any,
      bgEffect: BG_EFFECTS[Math.floor(Math.random() * BG_EFFECTS.length)] as any,
    });
  };

  const currentProfessionIcon = PROFESSIONS.find(p => p.id === config.profession)?.icon;

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

        {/* Preview Area */}
        <div className="flex-1 flex flex-col items-center gap-4 overflow-y-auto pb-24 px-1 custom-scrollbar">
          <div className="relative shrink-0 group">
             {/* Badge Overlay */}
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
                
                {/* Chemistry Bond Effect Border */}
                {config.profession !== 'student' && (
                   <div className="absolute inset-0 border-4 border-dashed border-mint/50 rounded-[1.8rem] pointer-events-none" />
                )}
             </div>
             
             <button 
                onClick={randomize}
                className="absolute -bottom-2 right-0 bg-slate-800 text-white p-2.5 rounded-xl shadow-lg hover:scale-110 transition-transform font-bold flex items-center gap-1 z-30"
                title="随机生成"
             >
                <Dice5 size={20} />
             </button>
          </div>

          {/* Profession (XP Unlock) */}
          <div className="w-full">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex justify-between">
                <span>身份 (XP解锁)</span>
                <span className="text-mint-dark">{currentXP} XP</span>
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {PROFESSIONS.map(p => {
                    const isLocked = currentXP < p.unlockXP;
                    return (
                        <button 
                            key={p.id}
                            disabled={isLocked}
                            onClick={() => setConfig({...config, profession: p.id})}
                            className={`px-3 py-2 rounded-xl border-2 transition-all flex items-center gap-1.5 shrink-0 relative overflow-hidden
                                ${config.profession === p.id 
                                    ? 'bg-mint/20 border-mint text-mint-dark' 
                                    : isLocked 
                                    ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                                    : 'bg-white border-slate-100 text-slate-500'}
                            `}
                        >
                            {isLocked ? <Lock size={14} /> : p.icon}
                            <span className="text-xs font-bold">{p.label}</span>
                        </button>
                    );
                })}
            </div>
          </div>

          {/* Tabs */}
          <div className="w-full flex gap-1 p-1 bg-white border border-slate-100 rounded-xl mb-2">
             <TabButton active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')} icon={<Palette size={14}/>} label="外观" />
             <TabButton active={activeTab === 'accessories'} onClick={() => setActiveTab('accessories')} icon={<Briefcase size={14}/>} label="饰品" />
             <TabButton active={activeTab === 'style'} onClick={() => setActiveTab('style')} icon={<Sparkles size={14}/>} label="风格" />
          </div>

          {/* Controls Container */}
          <div className="w-full space-y-4">
             {activeTab === 'appearance' && (
                <>
                   <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">皮肤颜色</label>
                      <div className="flex gap-2 justify-center">
                         {SKIN_COLORS.map(c => (
                            <button 
                               key={c}
                               onClick={() => setConfig({...config, skinColor: c})}
                               className={`w-8 h-8 rounded-full border-2 shadow-sm transition-transform ${config.skinColor === c ? 'border-slate-700 scale-110' : 'border-white'}`}
                               style={{ backgroundColor: c }}
                            />
                         ))}
                      </div>
                   </div>
                   <ControlSection label="身体花纹" options={PATTERNS} labels={PATTERN_LABELS} current={config.pattern || 'none'} onChange={(v: string) => setConfig({...config, pattern: v as any})} />
                </>
             )}

             {activeTab === 'accessories' && (
                <>
                   <ControlSection label="帽子" options={HATS} labels={HAT_LABELS} current={config.hat} onChange={(v: string) => setConfig({...config, hat: v as any})} />
                   <ControlSection label="手持物品" options={ITEMS} labels={ITEM_LABELS} current={config.item} onChange={(v: string) => setConfig({...config, item: v as any})} />
                </>
             )}

             {activeTab === 'style' && (
                <>
                   <ControlSection label="表情" options={FACES} labels={FACE_LABELS} current={config.face} onChange={(v: string) => setConfig({...config, face: v as any})} />
                   <ControlSection label="背景特效" options={BG_EFFECTS} labels={BG_LABELS} current={config.bgEffect || 'none'} onChange={(v: string) => setConfig({...config, bgEffect: v as any})} />
                </>
             )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/90 backdrop-blur-md rounded-b-[2.5rem] border-t border-slate-100 flex gap-3">
           <button 
             onClick={randomize}
             className="p-3.5 rounded-2xl bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 transition-colors"
           >
              <RefreshCw size={20} />
           </button>
           <button 
             onClick={() => onSave(config)}
             className="flex-1 py-3.5 rounded-2xl bg-slate-800 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors"
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

const ControlSection = ({ label, options, labels, current, onChange }: any) => (
   <div className="bg-white p-2.5 rounded-2xl border border-slate-50 col-span-2">
      <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">{label}</label>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
         {options.map((opt: string) => (
            <button
               key={opt}
               onClick={() => onChange(opt)}
               className={`px-3 py-1.5 rounded-lg shrink-0 border transition-colors flex items-center justify-center text-xs font-bold
                  ${current === opt ? 'bg-slate-800 text-white border-slate-800' : 'bg-slate-50 border-slate-100 text-slate-500'}
               `}
            >
               {labels[opt] || opt}
            </button>
         ))}
      </div>
   </div>
);
