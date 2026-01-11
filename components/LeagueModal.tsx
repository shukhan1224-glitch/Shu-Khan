
import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { X, Crown, ChevronRight, Lock, Users, BookOpen, Medal } from 'lucide-react';
import { TIER_SYSTEM, MOCK_LEAGUE_USERS } from '../constants';

const motion = m as any;

interface LeagueModalProps {
  currentXP: number;
  onClose: () => void;
  following?: string[];
  onToggleFollow?: (id: string) => void;
}

export const LeagueModal: React.FC<LeagueModalProps> = ({ currentXP, onClose }) => {
  const [activeTab, setActiveTab] = useState<'ranking' | 'tiers'>('ranking');

  // Find current tier index
  const currentTierIndex = TIER_SYSTEM.findIndex(t => currentXP >= t.minXP && currentXP <= t.maxXP);
  const currentTier = TIER_SYSTEM[currentTierIndex] || TIER_SYSTEM[TIER_SYSTEM.length - 1]; 
  const nextTier = TIER_SYSTEM[currentTierIndex + 1];

  // Calculate Progress to next tier
  const progressToNext = nextTier 
      ? Math.min(100, Math.max(0, ((currentXP - currentTier.minXP) / (nextTier.minXP - currentTier.minXP)) * 100))
      : 100;

  // Prepare Friend Leaderboard Data
  // In a real app, we would fetch friends. Here we use MOCK_LEAGUE_USERS + Current User
  const leaderboardData = [
      ...MOCK_LEAGUE_USERS.map(u => ({ ...u, isMe: false })),
      { id: 'current-user', name: '我 (你)', avatar: 'custom-octo', xp: currentXP, tierId: currentTier.id, isMe: true }
  ].sort((a, b) => b.xp - a.xp); // Sort by XP

  const myRank = leaderboardData.findIndex(u => u.isMe) + 1;

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
        <div className="bg-slate-800 p-6 pb-6 relative overflow-hidden shrink-0">
           <div className="absolute top-0 right-0 w-32 h-32 bg-mint/20 rounded-full blur-3xl" />
           
           <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 z-10">
              <X size={20} />
           </button>

           <h2 className="text-2xl font-black text-white flex items-center gap-2 mb-1">
              <Crown className="text-yellow-400" fill="currentColor" />
              荣誉殿堂
           </h2>
           <p className="text-slate-300 text-sm font-medium">积累 XP，攀登化学巅峰！</p>

           {/* Tabs */}
           <div className="flex bg-slate-700/50 p-1 rounded-xl mt-6 relative z-10">
              <button 
                 onClick={() => setActiveTab('ranking')}
                 className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all
                    ${activeTab === 'ranking' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-white'}
                 `}
              >
                 <Users size={14} /> 好友榜
              </button>
              <button 
                 onClick={() => setActiveTab('tiers')}
                 className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all
                    ${activeTab === 'tiers' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-white'}
                 `}
              >
                 <BookOpen size={14} /> 段位说明
              </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-cream z-20 custom-scrollbar">
           
           {/* Ranking Tab */}
           {activeTab === 'ranking' && (
               <>
                   {/* My Rank Summary */}
                   <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="flex flex-col items-center min-w-[3rem]">
                            <span className="text-xs font-bold text-slate-400 uppercase">排名</span>
                            <span className={`text-2xl font-black ${myRank <= 3 ? 'text-yellow-500' : 'text-slate-700'}`}>{myRank}</span>
                        </div>
                        <div className="h-8 w-px bg-slate-100" />
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-slate-500">我的 XP</span>
                                <span className="font-black text-slate-800">{currentXP}</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-mint" style={{ width: `${progressToNext}%` }} />
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1 text-right">
                                {nextTier ? `距离 ${nextTier.name} 差 ${nextTier.minXP - currentXP}` : '已满级'}
                            </p>
                        </div>
                   </div>

                   {/* List */}
                   <div className="space-y-2 pb-6">
                       {leaderboardData.map((user, idx) => {
                           const tier = TIER_SYSTEM.find(t => t.id === user.tierId);
                           const rank = idx + 1;
                           const isTop3 = rank <= 3;

                           return (
                               <motion.div 
                                   key={user.id}
                                   initial={{ opacity: 0, y: 10 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ delay: idx * 0.05 }}
                                   className={`flex items-center gap-3 p-3 rounded-2xl border transition-all
                                       ${user.isMe 
                                           ? 'bg-mint/10 border-mint/50 shadow-md scale-[1.02]' 
                                           : 'bg-white border-slate-100'
                                       }
                                   `}
                               >
                                   <div className={`w-6 text-center font-black text-sm italic ${isTop3 ? 'text-yellow-500 text-lg' : 'text-slate-400'}`}>
                                       {rank}
                                   </div>
                                   
                                   <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-100 shrink-0">
                                       {user.avatar === 'custom-octo' ? (
                                           <div className="bg-magic/20 w-full h-full flex items-center justify-center text-xs">Me</div>
                                       ) : (
                                           <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                       )}
                                   </div>

                                   <div className="flex-1 min-w-0">
                                       <h4 className={`font-bold text-sm truncate ${user.isMe ? 'text-mint-dark' : 'text-slate-700'}`}>
                                           {user.name}
                                       </h4>
                                       {tier && (
                                           <div className={`text-[10px] font-bold flex items-center gap-1 opacity-80 ${tier.color}`}>
                                               {tier.icon} {tier.name}
                                           </div>
                                       )}
                                   </div>

                                   <div className="text-right">
                                       <div className="font-black text-slate-700 text-sm">{user.xp}</div>
                                       <div className="text-[9px] text-slate-400 font-bold">XP</div>
                                   </div>
                               </motion.div>
                           );
                       })}
                   </div>
               </>
           )}

           {/* Tier Guide Tab */}
           {activeTab === 'tiers' && (
               <div className="space-y-3 pb-6">
                   {TIER_SYSTEM.slice().reverse().map((tier) => {
                       const isUnlocked = currentXP >= tier.minXP;
                       const isCurrent = tier.id === currentTier.id;

                       return (
                           <motion.div 
                                key={tier.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex items-center gap-4 p-3 rounded-2xl border-2 transition-all
                                    ${isCurrent 
                                        ? 'bg-white border-mint shadow-md scale-[1.02] ring-2 ring-mint/20' 
                                        : isUnlocked 
                                            ? 'bg-white border-slate-100 opacity-80' 
                                            : 'bg-slate-50 border-slate-100 opacity-50 grayscale'
                                    }
                                `}
                           >
                               <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner shrink-0 bg-gradient-to-br ${tier.bgGradient}`}>
                                   {tier.icon}
                               </div>
                               
                               <div className="flex-1">
                                   <div className="flex justify-between items-center mb-0.5">
                                       <h4 className={`font-bold text-sm ${tier.color}`}>{tier.name}</h4>
                                       {!isUnlocked && <Lock size={12} className="text-slate-300" />}
                                   </div>
                                   <p className="text-[10px] text-slate-400 font-medium line-clamp-1">{tier.description}</p>
                                   <div className="text-[10px] font-black text-slate-300 mt-1">
                                       {tier.minXP >= 20000 ? '20000+ XP' : `${tier.minXP} - ${tier.maxXP} XP`}
                                   </div>
                               </div>

                               {isCurrent && (
                                   <div className="text-mint pr-1">
                                       <ChevronRight size={20} strokeWidth={3} />
                                   </div>
                               )}
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
