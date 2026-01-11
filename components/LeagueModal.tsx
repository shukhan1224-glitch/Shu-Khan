
import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, ChevronUp, ChevronDown, Lock, Crown, Timer, Users, User, Medal } from 'lucide-react';
import { TIER_SYSTEM } from '../constants';

const motion = m as any;

interface LeagueModalProps {
  currentXP: number;
  onClose: () => void;
}

type Tab = 'ladder' | 'friends';

export const LeagueModal: React.FC<LeagueModalProps> = ({ currentXP, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('ladder');

  // Find current tier index
  const currentTierIndex = TIER_SYSTEM.findIndex(t => currentXP >= t.minXP && currentXP <= t.maxXP);
  const currentTier = TIER_SYSTEM[currentTierIndex] || TIER_SYSTEM[TIER_SYSTEM.length - 1]; // Fallback to max tier if over
  const nextTier = TIER_SYSTEM[currentTierIndex + 1];

  // Calculate Progress to next tier
  const progressToNext = nextTier 
      ? Math.min(100, Math.max(0, ((currentXP - currentTier.minXP) / (nextTier.minXP - currentTier.minXP)) * 100))
      : 100;

  // Build Leaderboard Data with Total XP - Only Current User for now (No Mock Data)
  const leaderboardData = [
     { id: 'me', name: '我 (你)', avatar: '', xp: currentXP, tierId: currentTier.id, isMe: true }
  ].sort((a, b) => (b.xp || 0) - (a.xp || 0));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-cream rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="bg-slate-800 p-6 pb-14 relative overflow-hidden shrink-0">
           <div className="absolute top-0 right-0 w-32 h-32 bg-mint/20 rounded-full blur-3xl" />
           
           <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 z-10">
              <X size={20} />
           </button>

           <h2 className="text-2xl font-black text-white flex items-center gap-2 mb-1">
              <Crown className="text-yellow-400" fill="currentColor" />
              段位里程碑
           </h2>
           <p className="text-slate-300 text-sm font-medium">累计 XP 提升段位</p>

           {/* Tabs */}
           <div className="flex gap-2 mt-6 p-1 bg-slate-900/50 rounded-xl relative z-10">
              <button 
                 onClick={() => setActiveTab('ladder')}
                 className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2
                    ${activeTab === 'ladder' ? 'bg-mint text-slate-800 shadow-md' : 'text-slate-400 hover:text-white'}
                 `}
              >
                 <Crown size={14} /> 段位
              </button>
              <button 
                 onClick={() => setActiveTab('friends')}
                 className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2
                    ${activeTab === 'friends' ? 'bg-mint text-slate-800 shadow-md' : 'text-slate-400 hover:text-white'}
                 `}
              >
                 <Users size={14} /> 好友榜
              </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3 -mt-4 bg-cream rounded-t-[2rem] z-20">
           
           {activeTab === 'ladder' ? (
              // --- LADDER VIEW ---
              <>
                 {/* Current User Stats */}
                 <div className="bg-white p-4 rounded-3xl shadow-float border-2 border-slate-50 flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm bg-gradient-to-br ${currentTier.bgGradient}`}>
                       {currentTier.icon}
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-center mb-1">
                          <h3 className={`font-black text-lg ${currentTier.color}`}>{currentTier.name}</h3>
                          <span className="text-xs font-bold text-slate-400">{currentXP} XP</span>
                       </div>
                       <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-mint to-blue-400" style={{ width: `${progressToNext}%` }} />
                       </div>
                       <p className="text-[10px] text-slate-400 font-bold mt-1 text-right">
                          {nextTier ? `距离升级还差 ${nextTier.minXP - currentXP} XP` : '已达巅峰!'}
                       </p>
                    </div>
                 </div>

                 {/* Tiers List */}
                 <div className="space-y-3">
                    {[...TIER_SYSTEM].reverse().map((tier) => {
                       const isCurrent = tier.id === currentTier.id;
                       const isLocked = currentXP < tier.minXP;
                       return (
                          <div 
                             key={tier.id} 
                             className={`relative p-4 rounded-3xl border-2 transition-all flex items-center gap-4
                                ${isCurrent 
                                   ? `bg-white border-mint shadow-md ring-2 ring-mint/20` 
                                   : isLocked 
                                      ? 'bg-slate-50 border-slate-100 opacity-60' 
                                      : 'bg-white border-slate-50'
                                }
                             `}
                          >
                             <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm bg-gradient-to-br ${tier.bgGradient}`}>
                                {tier.icon}
                             </div>
                             
                             <div className="flex-1">
                                <h4 className={`font-bold text-sm ${tier.color}`}>{tier.name}</h4>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                   {tier.minXP} - {tier.maxXP > 100000 ? '∞' : tier.maxXP} XP
                                </p>
                             </div>

                             {isLocked && <Lock size={16} className="text-slate-300" />}
                             {isCurrent && (
                                <div className="bg-mint text-slate-800 text-[10px] font-black px-2 py-1 rounded-full absolute -top-2 right-4 shadow-sm">
                                   CURRENT
                                </div>
                             )}
                          </div>
                       );
                    })}
                 </div>
              </>
           ) : (
              // --- FRIENDS LEADERBOARD VIEW ---
              <div className="space-y-3 pt-2">
                 {leaderboardData.length === 1 ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                            <Users size={24} />
                        </div>
                        <p className="text-slate-400 text-sm font-bold">暂无好友</p>
                        <p className="text-xs text-slate-300 mt-1">去社区结识新伙伴吧！</p>
                    </div>
                 ) : null}

                 {leaderboardData.map((user, idx) => {
                    const tier = TIER_SYSTEM.find(t => t.id === user.tierId) || TIER_SYSTEM[0];
                    const isTop3 = idx < 3;
                    
                    return (
                       <motion.div 
                          key={user.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`flex items-center gap-4 p-4 rounded-3xl border-2 shadow-sm relative
                             ${(user as any).isMe ? 'bg-mint/10 border-mint z-10' : 'bg-white border-white'}
                          `}
                       >
                          {/* Rank Number / Medal */}
                          <div className="w-8 flex justify-center font-black text-slate-400 italic">
                             {idx === 0 ? <span className="text-2xl">🥇</span> : 
                              idx === 1 ? <span className="text-2xl">🥈</span> :
                              idx === 2 ? <span className="text-2xl">🥉</span> :
                              `#${idx + 1}`}
                          </div>

                          {/* Avatar */}
                          <div className="relative">
                             <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden border-2 border-slate-50">
                                {(user as any).isMe ? (
                                   <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500">
                                      <User size={24} />
                                   </div>
                                ) : (
                                   <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                )}
                             </div>
                             {/* Small Tier Icon Badge */}
                             <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs shadow-sm border border-slate-100">
                                {tier.icon}
                             </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1">
                             <h4 className={`font-bold text-sm ${(user as any).isMe ? 'text-mint-dark' : 'text-slate-700'}`}>
                                {user.name} {(user as any).isMe && '(我)'}
                             </h4>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                {tier.name}
                             </p>
                          </div>

                          {/* Total XP */}
                          <div className="text-right">
                             <span className="block font-black text-slate-700">{user.xp || 0}</span>
                             <span className="text-[9px] text-slate-400 font-bold uppercase">Total XP</span>
                          </div>
                       </motion.div>
                    );
                 })}
              </div>
           )}
        </div>

      </motion.div>
    </motion.div>
  );
};
