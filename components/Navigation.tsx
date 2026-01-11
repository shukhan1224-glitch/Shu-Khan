import React from 'react';
import { motion as m } from 'framer-motion';
import { Map, BookX, Bot, User, Users, FlaskConical, Microscope, Atom, Dna, Shield } from 'lucide-react';
import { View, Profession, AvatarConfig } from '../types';
import { Mascot } from './Mascot';
import { OctoAvatar } from './OctoAvatar';

const motion = m as any;

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
  avatarConfig?: AvatarConfig; 
  profession?: Profession;
}

const navItems = [
  { id: View.MAP, icon: Map, label: '地图' },
  { id: View.MISTAKE_BOOK, icon: BookX, label: '错题' },
  { id: View.COMMUNITY, icon: Bot, label: 'Octo' },
  { id: View.SOCIAL, icon: Users, label: '圈子' }, 
  { id: View.PROFILE, icon: User, label: '我的' },
];

const ProfessionIcons: Record<string, React.ReactNode> = {
  scientist: <FlaskConical size={10} />,
  researcher: <Microscope size={10} />,
  nuclear: <Atom size={10} />,
  biochemist: <Dna size={10} />,
  safety: <Shield size={10} />
};

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView, avatarConfig, profession }) => {
  const badge = profession && profession !== 'student' ? ProfessionIcons[profession] : null;

  return (
    <div className="h-full flex flex-col justify-center py-6 pl-4 pr-2">
      <div className="bg-white/40 backdrop-blur-xl shadow-purple-glow rounded-[2rem] px-3 py-6 flex flex-col gap-6 border-2 border-white/60 items-center h-full max-h-[600px] justify-between relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

        <div className="mb-2 relative z-10">
           <Mascot size={45} mood="magic" />
        </div>

        <div className="flex flex-col gap-6 w-full items-center flex-1 justify-center z-10">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex flex-col items-center gap-1 relative group w-full ${
                  isActive ? 'text-slate-800' : 'text-slate-500 hover:text-magic-dark'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {item.id === View.PROFILE && avatarConfig ? (
                   <div className="relative">
                      <div className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all duration-300 bg-white overflow-hidden flex items-center justify-center ${isActive ? 'border-magic' : 'border-transparent'}`}>
                         <div className="scale-[0.5] mt-1">
                           <OctoAvatar config={avatarConfig} size={40} />
                         </div>
                      </div>
                      {badge && (
                         <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm border border-slate-200">
                            {badge}
                         </div>
                      )}
                   </div>
                ) : (
                  <div
                    className={`p-3 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-magic/20 text-magic-vivid shadow-inner border border-magic/30'
                        : 'bg-transparent group-hover:bg-white/50'
                    }`}
                  >
                    <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                )}
                
                {item.id !== View.PROFILE && (
                  <span className={`text-[10px] font-bold ${isActive ? 'text-magic-dark' : 'text-slate-400'}`}>{item.label}</span>
                )}
                
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-magic-vivid rounded-full shadow-[0_0_8px_rgba(192,174,222,0.8)]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};