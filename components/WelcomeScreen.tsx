
import React from 'react';
import { motion as m } from 'framer-motion';
import { AvatarConfig, Level } from '../types';
import { Mascot } from './Mascot';
import { OctoAvatar } from './OctoAvatar';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

const motion = m as any;

interface WelcomeScreenProps {
  username: string;
  avatarConfig: AvatarConfig;
  nextLevel: Level;
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ username, avatarConfig, nextLevel, onContinue }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-cream/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-mint/20 rounded-full blur-3xl"
         />
         <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-apricot/20 rounded-full blur-3xl"
         />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -50 }}
        className="relative z-10 w-full max-w-md flex flex-col items-center"
      >
        <div className="mb-2 flex items-center justify-center gap-2">
           <span className="text-4xl animate-bounce">✨</span>
        </div>
        
        <h1 className="text-3xl font-magic font-black text-slate-800 mb-2 text-center">
           欢迎回来, <span className="text-magic-vivid">{username}</span>!
        </h1>
        <p className="text-slate-500 font-bold mb-10 text-center">
           魔力充能完毕，准备好继续探索了吗？
        </p>

        {/* Duo Avatars Interaction */}
        <div className="flex items-end justify-center gap-4 mb-12 relative">
           {/* Magic Bridge between them */}
           <motion.div 
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-16 border-t-4 border-dashed border-yellow-300 rounded-full opacity-50"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
           />

           <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="relative z-10"
           >
              <div className="bg-white p-2 rounded-full shadow-float border-4 border-white">
                 <Mascot size={120} mood="welcome" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap">
                 Octo 导师
              </div>
           </motion.div>

           <div className="mb-10 text-yellow-400 text-2xl font-black animate-pulse">⚡</div>

           <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.4 }}
              className="relative z-10"
           >
              <div className="bg-white p-2 rounded-full shadow-float border-4 border-white overflow-hidden w-[140px] h-[140px] flex items-center justify-center">
                 <OctoAvatar config={avatarConfig} size={120} />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-mint-dark text-white text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap">
                 {username}
              </div>
           </motion.div>
        </div>

        {/* Continue Card */}
        <motion.div 
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.8 }}
           className="w-full bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border border-white/60"
        >
           <div className="flex items-center gap-2 mb-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <MapPin size={14} />
              上次进度
           </div>
           
           <div className="flex items-center justify-between mb-6">
              <div>
                 <span className="bg-magic/20 text-magic-dark px-2 py-1 rounded-lg text-xs font-black mb-2 inline-block">
                    {nextLevel.grade}
                 </span>
                 <h3 className="text-xl font-extrabold text-slate-800 leading-tight">
                    {nextLevel.title}
                 </h3>
                 <p className="text-slate-500 text-sm mt-1 line-clamp-1">
                    {nextLevel.description}
                 </p>
              </div>
              <div className="text-4xl filter drop-shadow-md grayscale opacity-50">
                 {/* Try to extract emoji from description or default */}
                 🚀
              </div>
           </div>

           <button 
              onClick={onContinue}
              className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
           >
              继续冒险 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </motion.div>

      </motion.div>
    </div>
  );
};
