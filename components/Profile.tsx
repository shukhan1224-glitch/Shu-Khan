
import React, { useState, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { UserStats, ElementDetail, AvatarConfig, StudyPlan } from '../types';
import { ELEMENT_DETAILS, TIER_SYSTEM, ALL_ELEMENT_SYMBOLS } from '../constants';
import { Hexagon, Zap, ChevronRight, LogOut, Clock, Target, Sparkles, Share2, Pencil, FlaskConical, Microscope, Atom, Dna, Shield, Trophy, X, Grid, Lock, Key, Mail, Link, Loader2, Paintbrush } from 'lucide-react';
import { AvatarEditor } from './AvatarEditor';
import { LeagueModal } from './LeagueModal';
import { OctoAvatar } from './OctoAvatar';
import { ElementCollection } from './ElementCollection';
import { authService } from '../services/authService';
import { ElementVisual } from './ElementVisual';
import { generateElementImage } from '../services/geminiService';

const motion = m as any;

interface ProfileProps {
  stats: UserStats;
  avatarConfig: AvatarConfig;
  onUpdateAvatar: (config: AvatarConfig) => void;
  onLogout: () => void;
  onUpdatePlan?: (plan: StudyPlan) => void;
  userEmail?: string;
}

const ProfessionIcons: Record<string, React.ReactNode> = {
  scientist: <FlaskConical size={18} />,
  researcher: <Microscope size={18} />,
  nuclear: <Atom size={18} />,
  biochemist: <Dna size={18} />,
  safety: <Shield size={18} />
};

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export const Profile: React.FC<ProfileProps> = ({ stats, avatarConfig, onUpdateAvatar, onLogout, onUpdatePlan, userEmail }) => {
  const currentTier = TIER_SYSTEM.find(t => stats.xp >= t.minXP && stats.xp <= t.maxXP) || TIER_SYSTEM[TIER_SYSTEM.length - 1];
  
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [showLeague, setShowLeague] = useState(false);
  const [isEditingPlan, setIsEditingPlan] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLinkEmail, setShowLinkEmail] = useState(false);

  const professionIcon = avatarConfig.profession && avatarConfig.profession !== 'student' 
      ? ProfessionIcons[avatarConfig.profession] 
      : null;

  // Determine if the user is using a "Virtual" email (Username login)
  const isVirtualEmail = userEmail && userEmail.endsWith('@chemstep.app');

  const getElementData = (symbol: string) => {
    return ELEMENT_DETAILS[symbol] || {
      symbol,
      name: 'Unknown',
      atomicNumber: 0,
      category: 'Unknown',
      funFact: '???',
      description: '数据缺失',
      visual: { gradient: 'from-slate-100 to-slate-200', shape: 'circle', color: 'text-slate-500' }
    };
  };

  const collectionPercent = Math.round((stats.elementsCollected.length / 118) * 100);

  return (
    <div className="min-h-screen pt-10 pb-10 px-4 relative">
      
      <div className="absolute top-6 right-6 z-30 flex gap-2">
        <button 
           onClick={() => setShowLinkEmail(true)}
           className={`p-2 backdrop-blur-md rounded-xl shadow-sm border transition-all relative
              ${isVirtualEmail 
                 ? 'bg-magic text-white border-magic hover:bg-magic-dark animate-pulse' 
                 : 'bg-white/80 border-white/50 text-slate-400 hover:text-slate-700 hover:bg-white'
              }`}
           title={isVirtualEmail ? "绑定邮箱 (未绑定)" : "更换邮箱"}
        >
           {isVirtualEmail ? <Link size={20} /> : <Mail size={20} />}
           {isVirtualEmail && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>}
        </button>
        <button 
           onClick={() => setShowChangePassword(true)}
           className="p-2 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white/50 text-slate-400 hover:text-slate-700 hover:bg-white transition-all"
           title="修改密码"
        >
           <Lock size={20} />
        </button>
        <button 
           onClick={onLogout}
           className="p-2 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white/50 text-slate-400 hover:text-coral hover:bg-coral/10 hover:border-coral transition-all"
           title="退出登录"
        >
           <LogOut size={20} />
        </button>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="relative group">
           {professionIcon && (
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-float z-20 border-2 border-magic animate-bounce-slow">
                 {professionIcon}
              </div>
           )}

          <div className={`w-32 h-32 rounded-full p-1.5 bg-gradient-to-br from-magic-light via-white to-potion-light shadow-purple-glow animate-float relative`}>
             <div className="absolute inset-0 rounded-full border-2 border-dashed border-magic/40 animate-spin-slow pointer-events-none" />
             <div className="w-full h-full rounded-full border-4 border-white bg-white overflow-hidden flex items-center justify-center relative z-10">
                 <OctoAvatar config={avatarConfig} size={110} />
             </div>
          </div>
          
          <button 
             onClick={() => setIsEditingAvatar(true)}
             className="absolute bottom-1 right-0 p-2 rounded-full bg-slate-800 text-white shadow-lg hover:scale-110 transition-transform z-30 border-2 border-white"
          >
             <Pencil size={14} />
          </button>

          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-slate-800 text-xs font-black px-4 py-1.5 rounded-full shadow-lg border border-slate-50 whitespace-nowrap z-20 flex items-center gap-1">
             <span className="text-magic-vivid">Lv.</span> {stats.level}
          </div>
        </div>
        
        {/* Tier Card */}
        <motion.button 
           onClick={() => setShowLeague(true)}
           whileTap={{ scale: 0.95 }}
           className="mt-8 bg-white/80 backdrop-blur-md p-2 pr-4 rounded-2xl shadow-soft border border-white/50 flex items-center gap-3 w-full max-w-[240px]"
        >
           <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${currentTier.bgGradient}`}>
              {currentTier.icon}
           </div>
           <div className="flex-1 text-left">
              <h2 className={`font-black text-sm ${currentTier.color}`}>{currentTier.name}</h2>
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                  <div className={`h-full bg-slate-300 ${currentTier.color.replace('text', 'bg')}`} style={{ width: `${(stats.xp % 1000) / 10}%` }} />
              </div>
           </div>
           <ChevronRight size={16} className="text-slate-300" />
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
        <div className="bg-white/70 backdrop-blur-md p-5 rounded-3xl shadow-soft flex flex-col items-center gap-2 border border-white/60">
          <div className="p-3 bg-apricot/20 text-apricot-dark rounded-2xl">
             <Zap size={24} fill="currentColor" strokeWidth={1.5} />
          </div>
          <span className="text-2xl font-black text-slate-700">{stats.weeklyProgress?.weeklyXP || 0}</span>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">本周 XP</span>
        </div>
        <div className="bg-white/70 backdrop-blur-md p-5 rounded-3xl shadow-soft flex flex-col items-center gap-2 border border-white/60">
          <div className="p-3 bg-mint/20 text-mint-dark rounded-2xl">
            <Trophy size={24} fill="#A8E6CF" strokeWidth={1.5} />
          </div>
          <span className="text-2xl font-black text-slate-700">{stats.elementsCollected.length} / 118</span>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">元素收集</span>
        </div>
      </div>

      {/* Study Plan Widget */}
      <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl shadow-soft border border-white/60 mb-6 relative overflow-hidden z-10">
         <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
               <h3 className="font-extrabold text-slate-700 text-lg flex items-center gap-2">
                  <Target size={20} className="text-apricot" />
                  学习计划
               </h3>
            </div>
            <button 
               onClick={() => setIsEditingPlan(true)}
               className="px-3 py-1.5 bg-white/50 rounded-lg text-xs font-bold text-slate-500 hover:bg-white transition-colors border border-white/50"
            >
               调整
            </button>
         </div>

         <div className="flex items-center gap-4 mb-3">
             <div className="flex-1 bg-slate-50/50 rounded-2xl p-3 border border-slate-100/50">
                <div className="flex items-center gap-2 mb-1">
                   <Clock size={14} className="text-mint-dark" />
                   <span className="text-xs font-bold text-slate-500">
                      {stats.studyPlan?.time || "未设定"}
                   </span>
                </div>
                <div className="flex gap-1">
                   {stats.studyPlan?.days.sort().map(d => (
                      <span key={d} className="text-[10px] font-black bg-white px-1.5 py-0.5 rounded border border-slate-100 text-slate-600">
                         {WEEKDAYS[d].replace('周', '')}
                      </span>
                   ))}
                </div>
             </div>
             <div className="bg-slate-50/50 rounded-2xl p-3 border border-slate-100/50 min-w-[80px] text-center">
                <div className="text-xs font-bold text-slate-400 mb-1">每日目标</div>
                <div className="text-xl font-black text-slate-700">{stats.studyPlan?.xpTarget || 300}</div>
                <div className="text-[9px] text-slate-400">XP</div>
             </div>
         </div>
      </div>

      {/* NEW: Element Collection Entry Card */}
      <motion.div 
         whileHover={{ scale: 1.02 }}
         whileTap={{ scale: 0.98 }}
         onClick={() => setShowCollection(true)}
         className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden z-10 cursor-pointer group"
      >
         {/* Decorative Background */}
         <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 rounded-full blur-3xl" />
         <div className="absolute bottom-0 left-0 w-32 h-32 bg-magic/20 rounded-full blur-3xl" />
         
         <div className="flex items-center justify-between relative z-10">
            <div>
               <h3 className="text-white font-extrabold text-xl mb-1 flex items-center gap-2">
                  <Hexagon size={20} className="text-mint" />
                  元素收藏馆
               </h3>
               <p className="text-slate-400 text-sm mb-4">点亮周期表，解锁成就！</p>
               
               <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-mint to-magic" style={{ width: `${collectionPercent}%` }} />
                  </div>
                  <span className="text-white font-black text-xs">{collectionPercent}%</span>
               </div>
            </div>

            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner group-hover:bg-white/20 transition-colors">
               <Grid size={32} className="text-white opacity-80" />
            </div>
         </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showCollection && (
           <ElementCollection 
              unlockedElements={stats.elementsCollected}
              onClose={() => setShowCollection(false)}
              onSelectElement={(symbol) => setSelectedElement(symbol)}
           />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedElement && (
           <ElementDetailModal 
              symbol={selectedElement} 
              data={getElementData(selectedElement)}
              onClose={() => setSelectedElement(null)} 
           />
        )}
      </AnimatePresence>

      <AnimatePresence>
         {isEditingAvatar && (
            <AvatarEditor 
               initialConfig={avatarConfig}
               currentXP={stats.xp} 
               onSave={(newConfig) => {
                  onUpdateAvatar(newConfig);
                  setIsEditingAvatar(false);
               }}
               onClose={() => setIsEditingAvatar(false)}
            />
         )}
      </AnimatePresence>

      <AnimatePresence>
         {isEditingPlan && onUpdatePlan && (
            <PlanEditorModal 
               initialPlan={stats.studyPlan}
               onSave={(plan) => {
                  onUpdatePlan(plan);
                  setIsEditingPlan(false);
               }}
               onClose={() => setIsEditingPlan(false)}
            />
         )}
      </AnimatePresence>

      <AnimatePresence>
         {showChangePassword && (
            <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
         )}
      </AnimatePresence>

      <AnimatePresence>
         {showLinkEmail && (
            <LinkEmailModal 
               onClose={() => setShowLinkEmail(false)} 
               isVirtual={isVirtualEmail || false} 
            />
         )}
      </AnimatePresence>

      <AnimatePresence>
         {showLeague && (
            <LeagueModal 
               currentXP={stats.xp} 
               onClose={() => setShowLeague(false)} 
            />
         )}
      </AnimatePresence>
    </div>
  );
};

const LinkEmailModal: React.FC<{ onClose: () => void, isVirtual: boolean }> = ({ onClose, isVirtual }) => {
    // ... (rest of the component remains same)
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email.includes('@')) {
            setMessage("请输入有效的邮箱地址");
            setIsSuccess(false);
            return;
        }

        setLoading(true);
        setMessage('');
        const res = await authService.updateEmail(email);
        setLoading(false);
        setMessage(res.message || (res.success ? "发送成功" : "发送失败"));
        setIsSuccess(res.success);

        if (res.success) {
            setTimeout(() => {
                onClose();
            }, 3000);
        }
    };

    return (
      <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
         <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl"
         >
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-extrabold text-slate-700 flex items-center gap-2">
                   {isVirtual ? <Link size={20} className="text-magic" /> : <Mail size={20} className="text-magic" />}
                   {isVirtual ? '绑定邮箱' : '更换邮箱'}
               </h2>
               <button onClick={onClose}><X size={20} className="text-slate-400" /></button>
            </div>

            <div className="space-y-4">
               {isVirtual ? (
                   <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-2xl text-xs text-yellow-700 font-bold mb-2">
                       ⚠️ 您当前使用用户名登录。绑定真实邮箱后，您可以使用邮箱登录并找回密码。
                   </div>
               ) : (
                   <p className="text-xs text-slate-500 font-medium mb-2">
                       更换邮箱后，您需要使用新邮箱进行登录。
                   </p>
               )}

               <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">新邮箱地址</label>
                  <input 
                     type="email" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-magic transition-all font-bold text-slate-700"
                     placeholder="name@example.com"
                  />
               </div>

               {message && (
                   <div className={`text-xs font-bold p-3 rounded-xl text-center ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                       {message}
                   </div>
               )}

               <button 
                  onClick={handleSubmit}
                  disabled={loading || !email}
                  className="w-full bg-slate-800 text-white py-3.5 rounded-2xl font-bold shadow-lg mt-2 active:scale-95 transition-transform flex items-center justify-center gap-2"
               >
                  {loading ? '发送中...' : '发送确认邮件'}
               </button>
            </div>
         </motion.div>
      </div>
    );
};

const ChangePasswordModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    // ... (rest of the component remains same)
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (password.length < 6) {
            setMessage("密码长度至少为 6 位");
            setIsSuccess(false);
            return;
        }
        if (password !== confirm) {
            setMessage("两次输入的密码不一致");
            setIsSuccess(false);
            return;
        }

        setLoading(true);
        setMessage('');
        const res = await authService.updatePassword(password);
        setLoading(false);
        setMessage(res.message || (res.success ? "修改成功" : "修改失败"));
        setIsSuccess(res.success);

        if (res.success) {
            setTimeout(() => {
                onClose();
            }, 1500);
        }
    };

    return (
      <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
         <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl"
         >
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-extrabold text-slate-700 flex items-center gap-2">
                   <Key size={20} className="text-magic" />
                   修改密码
               </h2>
               <button onClick={onClose}><X size={20} className="text-slate-400" /></button>
            </div>

            <div className="space-y-4">
               <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">新密码</label>
                  <input 
                     type="password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-magic transition-all font-bold text-slate-700"
                     placeholder="至少 6 位"
                  />
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">确认新密码</label>
                  <input 
                     type="password" 
                     value={confirm}
                     onChange={(e) => setConfirm(e.target.value)}
                     className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 outline-none focus:border-magic transition-all font-bold text-slate-700"
                     placeholder="再次输入"
                  />
               </div>

               {message && (
                   <div className={`text-xs font-bold p-3 rounded-xl text-center ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-50 text-red-500'}`}>
                       {message}
                   </div>
               )}

               <button 
                  onClick={handleSubmit}
                  disabled={loading || !password || !confirm}
                  className="w-full bg-slate-800 text-white py-3.5 rounded-2xl font-bold shadow-lg mt-2 active:scale-95 transition-transform flex items-center justify-center gap-2"
               >
                  {loading ? '提交中...' : '确认修改'}
               </button>
            </div>
         </motion.div>
      </div>
    );
};

const PlanEditorModal: React.FC<{ initialPlan: StudyPlan, onSave: (p: StudyPlan) => void, onClose: () => void }> = ({ initialPlan, onSave, onClose }) => {
   // ... (rest of the component remains same)
   const [plan, setPlan] = useState<StudyPlan>({ ...(initialPlan || { days: [1,3,5], time: '20:00' }), xpTarget: 300 });

   const toggleDay = (dayIdx: number) => {
      if (plan.days.includes(dayIdx)) {
         setPlan({ ...plan, days: plan.days.filter(d => d !== dayIdx) });
      } else {
         setPlan({ ...plan, days: [...plan.days, dayIdx] });
      }
   };

   return (
      <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
         <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl"
         >
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-extrabold text-slate-700">学习计划设定</h2>
               <button onClick={onClose}><X size={20} className="text-slate-400" /></button>
            </div>

            <div className="space-y-6">
               <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">打卡日</label>
                  <div className="flex justify-between gap-1">
                     {WEEKDAYS.map((day, idx) => (
                        <button
                           key={idx}
                           onClick={() => toggleDay(idx)}
                           className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border-2
                              ${plan.days.includes(idx) ? 'bg-mint border-mint text-slate-800 shadow-md' : 'bg-white border-slate-100 text-slate-300'}
                           `}
                        >
                           {day.replace('周','')}
                        </button>
                     ))}
                  </div>
               </div>

               <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">提醒时间</label>
                  <input 
                     type="time" 
                     value={plan.time}
                     onChange={(e) => setPlan({...plan, time: e.target.value})}
                     className="w-full bg-white border-2 border-slate-100 rounded-2xl px-4 py-3 text-lg font-bold text-slate-700 outline-none focus:border-mint"
                  />
               </div>

               <div>
                  <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">每日目标 (系统推荐)</label>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                     <div className="w-12 h-12 bg-mint/20 rounded-xl flex items-center justify-center text-mint-dark shrink-0">
                        <Target size={24} />
                     </div>
                     <div>
                        <div className="text-xl font-black text-slate-700">300 XP</div>
                        <div className="text-xs text-slate-400 font-bold">约等于完成 1 个完整关卡</div>
                     </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                     * 根据当前的地图难度，系统建议每日完成至少一个关卡以保持最佳学习进度。
                  </p>
               </div>

               <button 
                  onClick={() => onSave(plan)}
                  className="w-full bg-slate-800 text-white py-3.5 rounded-2xl font-bold shadow-lg mt-4 active:scale-95 transition-transform"
               >
                  保存计划
               </button>
            </div>
         </motion.div>
      </div>
   );
};

const ElementDetailModal: React.FC<{ symbol: string; data: ElementDetail; onClose: () => void }> = ({ symbol, data, onClose }) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load cached image on mount
  useEffect(() => {
     const cached = localStorage.getItem(`element_img_${symbol}`);
     if (cached) {
        setGeneratedImage(cached);
     } else {
        setGeneratedImage(null);
     }
  }, [symbol]);

  const handleGenerate = async () => {
     if (isGenerating) return;
     setIsGenerating(true);
     
     try {
        const base64 = await generateElementImage(data.symbol, data.name, data.category, data.funFact);
        if (base64) {
           setGeneratedImage(base64);
           try {
              localStorage.setItem(`element_img_${symbol}`, base64);
           } catch (e) {
              console.warn("Local storage full, cannot cache image");
           }
        } else {
           alert("生成失败，请稍后再试");
        }
     } catch (e) {
        console.error(e);
     } finally {
        setIsGenerating(false);
     }
  };

  const activeImage = data.image || generatedImage;

  return (
    <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       className="fixed inset-0 z-[120] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-6"
       onClick={onClose}
    >
       <motion.div 
         initial={{ scale: 0.8, y: 50, rotateX: 10 }}
         animate={{ scale: 1, y: 0, rotateX: 0 }}
         exit={{ scale: 0.8, y: 50, opacity: 0 }}
         onClick={(e) => e.stopPropagation()}
         className="w-full max-w-sm bg-cream rounded-[2.5rem] overflow-hidden shadow-2xl relative"
       >
         <button 
           onClick={onClose}
           className="absolute top-4 right-4 w-10 h-10 bg-black/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white z-20 hover:bg-black/20"
         >
            <X size={20} />
         </button>

         <div className={`h-72 relative w-full bg-gradient-to-br ${data.visual.gradient} flex items-center justify-center overflow-hidden`}>
            {/* Show Image if available, or Generated one */}
            {generatedImage ? (
               <>
                  <img src={generatedImage} alt={data.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
               </>
            ) : data.image ? (
               <>
                  <img src={data.image} alt={data.name} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-90 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
               </>
            ) : (
               <ElementVisual element={data} className="absolute inset-0 w-full h-full" />
            )}

            {/* AI Generate Button (Always available if no generated image, allowing override of stock image) */}
            {!generatedImage && (
               <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => { e.stopPropagation(); handleGenerate(); }}
                  disabled={isGenerating}
                  className="absolute top-4 left-4 z-20 bg-white/20 backdrop-blur-md border border-white/40 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-white/30 transition-all shadow-sm"
               >
                  {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Paintbrush size={12} />}
                  {isGenerating ? 'Octo 绘制中...' : '魔法绘制'}
               </motion.button>
            )}

            <div className="absolute bottom-4 left-6 text-white/90 z-10 drop-shadow-md">
               <p className="text-xs font-bold uppercase tracking-widest opacity-80">Atomic No.</p>
               <p className="text-4xl font-black leading-none">{data.atomicNumber}</p>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               {!activeImage && <span className="text-[120px] font-black text-white opacity-20">{data.symbol}</span>}
            </div>
         </div>

         <div className="p-6 relative bg-white">
            <div className="flex justify-between items-center mb-4">
               <div>
                  <h2 className="text-3xl font-extrabold text-slate-800">{data.name}</h2>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-full">
                     {data.category}
                  </span>
               </div>
               <button className="p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors">
                  <Share2 size={20} />
               </button>
            </div>

            <div className="space-y-4">
               <div className="bg-apricot/20 p-4 rounded-2xl border border-apricot/50">
                  <h3 className="flex items-center gap-2 font-bold text-apricot-dark text-sm mb-1">
                     <Sparkles size={14} fill="currentColor" /> Fun Fact
                  </h3>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed">
                     {data.funFact}
                  </p>
               </div>

               <p className="text-slate-500 text-sm leading-relaxed">
                  {data.description}
               </p>
            </div>
         </div>
         
       </motion.div>
    </motion.div>
  );
};
