
import React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Mascot } from './Mascot';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, variant = 'primary', size = 'md', isLoading, icon: Icon, className = '', ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-magic text-white hover:bg-magic-dark shadow-purple-glow",
    secondary: "bg-mint text-slate-700 hover:bg-mint-dark",
    outline: "border-2 border-magic text-magic hover:bg-magic-light/20",
    danger: "bg-coral text-white hover:bg-coral-dark",
    ghost: "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      ) : Icon ? (
        <Icon className="w-5 h-5 mr-2" />
      ) : null}
      {children}
    </motion.button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, className = '', delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className={`bg-white/80 backdrop-blur-md rounded-3xl shadow-soft border border-white/50 p-6 ${className}`}
  >
    {children}
  </motion.div>
);

export const Badge: React.FC<{ label: string; color?: string; icon?: string }> = ({ label, color = 'bg-slate-100', icon }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-700 ${color}`}>
    {icon && <span className="mr-1">{icon}</span>}
    {label}
  </span>
);

export const ChemicalText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  // Simple parser: H2O -> H<sub>2</sub>O
  const parts = text.split(/(\d+)/).map((part, i) => 
    /\d+/.test(part) ? <sub key={i} className="text-[0.7em] align-baseline relative top-[0.3em]">{part}</sub> : part
  );
  return <span className={`font-mono font-bold ${className}`}>{parts}</span>;
};

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title?: string; children: React.ReactNode }> = ({
  isOpen, onClose, title, children
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]">
            {title && (
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-cream-100">
                <h3 className="text-xl font-magic text-magic-vivid">{title}</h3>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              </div>
            )}
            <div className="p-6 overflow-y-auto">
              {children}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-lg z-[100]">
    <div className="relative mb-8">
       {/* Background Glow */}
       <div className="absolute inset-0 bg-magic/30 blur-3xl rounded-full" />
       
       <Mascot size={180} mood="stirring" />
       
       {/* Rising Bubbles Effect */}
       {[...Array(5)].map((_, i) => (
          <motion.div
             key={i}
             className="absolute bottom-10 left-1/2 rounded-full opacity-60"
             style={{ 
                width: Math.random() * 15 + 5, 
                height: Math.random() * 15 + 5, 
                backgroundColor: ['#A8E6CF', '#FFAAA5', '#C0Aede'][i % 3],
                x: (Math.random() - 0.5) * 60 
             }}
             animate={{ 
                y: [-20, -120], 
                opacity: [0.8, 0],
                scale: [1, 1.2]
             }}
             transition={{ 
                duration: 2 + Math.random(), 
                repeat: Infinity, 
                delay: Math.random() * 2,
                ease: "easeOut"
             }}
          />
       ))}
    </div>

    <h2 className="text-3xl font-magic text-white mb-4 tracking-wider animate-pulse">
       调制知识药水...
    </h2>
    
    {/* Cauldron Progress Bar */}
    <div className="w-64 h-4 bg-slate-700 rounded-full overflow-hidden border border-slate-600 p-0.5">
       <motion.div 
          className="h-full bg-gradient-to-r from-mint via-magic to-apricot rounded-full relative overflow-hidden"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, repeat: Infinity }}
       >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
       </motion.div>
    </div>
    <p className="text-slate-400 mt-3 text-sm font-bold">Octo 正在努力搅拌中</p>
  </div>
);
