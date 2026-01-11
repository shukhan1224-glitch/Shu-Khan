
import React from 'react';
import { motion as m } from 'framer-motion';

const motion = m as any;

interface MascotProps {
  size?: number;
  mood?: 'happy' | 'thinking' | 'magic' | 'welcome' | 'stirring' | 'victory';
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({ size = 100, mood = 'happy', className = '' }) => {
  // Colors
  const normalBodyColor = "#C0Aede"; // Magic Purple
  const goldBodyColor = "#FFD700";   // Victory Gold
  const hatColor = "#4A4E69";        // Dark Wizard Grey
  const hatBand = "#FFD3B6";         // Apricot Band
  const cauldronColor = "#334155";   // Slate Cauldron

  const isVictory = mood === 'victory';
  const isStirring = mood === 'stirring';
  const bodyColor = isVictory ? goldBodyColor : normalBodyColor;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      
      {/* --- VICTORY PARTICLES (Gentler) --- */}
      {isVictory && (
        <>
           <motion.div className="absolute top-0 right-2 text-2xl" animate={{ y: [-10, -20, -10], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>✨</motion.div>
           <motion.div className="absolute bottom-2 left-2 text-xl" animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}>🎉</motion.div>
        </>
      )}

      <motion.svg 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
        animate={mood === 'magic' ? { y: [0, -10, 0] } : isVictory ? { 
            y: [0, -20, 0], // Happy Bounce
            scaleY: [1, 1.05, 0.95, 1], // Jelly bounce effect
            rotate: [0, -5, 5, 0] // Slight wiggle
        } : {}}
        transition={isVictory ? { repeat: Infinity, duration: 0.8, ease: "easeInOut" } : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        {/* --- LEGS --- */}
        {/* Victory: Legs waving happily */}
        <motion.path 
          d="M60 160C60 160 40 180 50 190C60 200 70 180 70 170" 
          stroke={bodyColor} strokeWidth="12" strokeLinecap="round"
          animate={isVictory ? { d: ["M60 160C60 160 30 140 40 130C50 120 70 150 70 160", "M60 160C60 160 40 180 50 190C60 200 70 180 70 170"] } : {}}
          transition={{ repeat: Infinity, duration: 0.4, repeatType: "reverse" }}
        />
        <path d="M90 170C90 170 80 195 90 198C100 201 105 180 100 170" stroke={bodyColor} strokeWidth="12" strokeLinecap="round" />
        <path d="M120 170C120 170 120 195 130 198C140 201 135 180 130 170" stroke={bodyColor} strokeWidth="12" strokeLinecap="round" />
        
        {/* Right Leg / Arm */}
        <motion.path 
           d="M150 160C150 160 170 180 160 190C150 200 140 180 140 170" 
           stroke={bodyColor} strokeWidth="12" strokeLinecap="round"
           animate={isVictory ? { d: ["M150 160C150 160 180 140 170 130C160 120 140 150 140 160", "M150 160C150 160 170 180 160 190C150 200 140 180 140 170"] } : {}}
           transition={{ repeat: Infinity, duration: 0.4, delay: 0.1, repeatType: "reverse" }}
        />
        
        {/* Stirring Arm (Only visible when stirring) */}
        {isStirring && (
           <motion.path
             d="M160 130 Q 180 140 170 160"
             stroke={bodyColor} strokeWidth="12" strokeLinecap="round"
             animate={{ d: ["M160 130 Q 180 140 170 160", "M160 130 Q 190 130 180 150", "M160 130 Q 180 140 170 160"] }}
             transition={{ duration: 1, repeat: Infinity }}
           />
        )}

        {/* --- BODY (Head) --- */}
        <ellipse cx="100" cy="120" rx="60" ry="50" fill={bodyColor} />
        
        {/* --- FACE --- */}
        {/* Eyes */}
        {isVictory ? (
           // Happy Squint Eyes > < style
           <g stroke="#334155" strokeWidth="4" strokeLinecap="round" fill="none">
              <path d="M70 118 Q 80 110 90 118" /> {/* Left Eye ^ */}
              <path d="M110 118 Q 120 110 130 118" /> {/* Right Eye ^ */}
           </g>
        ) : (
           <>
            <circle cx="80" cy="120" r="8" fill="#334155" />
            <circle cx="120" cy="120" r="8" fill="#334155" />
           </>
        )}
        
        {/* Blush */}
        {isVictory ? (
           <>
            <circle cx="65" cy="135" r="7" fill="#F472B6" opacity="0.6" />
            <circle cx="135" cy="135" r="7" fill="#F472B6" opacity="0.6" />
           </>
        ) : (
           <>
            <circle cx="70" cy="135" r="5" fill="#FFAAA5" opacity="0.6" />
            <circle cx="130" cy="135" r="5" fill="#FFAAA5" opacity="0.6" />
           </>
        )}
        
        {/* Mouth */}
        {mood === 'happy' && <path d="M90 135 Q 100 145 110 135" stroke="#334155" strokeWidth="3" strokeLinecap="round" />}
        {(mood === 'thinking' || isStirring) && <path d="M95 140 Q 100 135 105 140" stroke="#334155" strokeWidth="3" strokeLinecap="round" />}
        {mood === 'welcome' && <path d="M90 130 Q 100 150 110 130" stroke="#334155" strokeWidth="3" strokeLinecap="round" />}
        
        {/* Victory Mouth: Open happy mouth */}
        {isVictory && (
           <path d="M85 135 Q 100 155 115 135 Z" fill="#334155" />
        )}

        {/* --- WIZARD HAT --- */}
        <motion.g
           initial={{ rotate: -5, y: 0, opacity: 1 }}
           animate={isVictory 
              ? { y: [-5, -15, -5], rotate: [-5, 5, -5] } // Hat bounces independently
              : { rotate: 5 }
           }
           transition={isVictory 
              ? { repeat: Infinity, duration: 0.8 } 
              : { repeat: Infinity, duration: 4, repeatType: 'reverse', ease: "easeInOut" }
           }
           style={{ transformOrigin: '100px 90px' }}
        >
           <ellipse cx="100" cy="85" rx="70" ry="15" fill={hatColor} />
           <path d="M60 85 Q 90 -20 150 0 L 140 85 Z" fill={hatColor} />
           <path d="M65 80 Q 100 90 135 80" stroke={hatBand} strokeWidth="8" strokeLinecap="round" fill="none" />
           <path d="M130 30 L 132 35 L 137 35 L 133 38 L 135 43 L 130 40 L 125 43 L 127 38 L 123 35 L 128 35 Z" fill="#FFD700" />
        </motion.g>

        {/* --- CAULDRON & SPOON (Stirring Mode) --- */}
        {isStirring && (
           <g>
              <motion.line 
                 x1="170" y1="160" x2="130" y2="180" 
                 stroke="#8B4513" strokeWidth="6" strokeLinecap="round"
                 animate={{ x2: [130, 150, 130], y2: [180, 190, 180] }}
                 transition={{ duration: 1, repeat: Infinity }}
              />
              <path d="M40 180 Q 40 220 100 220 Q 160 220 160 180" fill={cauldronColor} />
              <ellipse cx="100" cy="180" rx="60" ry="10" fill="#475569" stroke={cauldronColor} strokeWidth="2"/>
              <motion.circle cx="80" cy="175" r="5" fill="#A8E6CF" animate={{ y: -20, opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5 }} />
              <path d="M40 180 Q 40 220 100 220 Q 160 220 160 180 L 160 200 Q 160 240 100 240 Q 40 240 40 200 Z" fill={cauldronColor} />
           </g>
        )}
      </motion.svg>
      
      {/* Magic Sparkles */}
      {(mood === 'magic') && (
         <>
           <motion.div className="absolute top-0 right-0 text-yellow-400 text-2xl" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], rotate: [0, 180] }} transition={{ duration: 2, repeat: Infinity }}>✨</motion.div>
         </>
      )}
    </div>
  );
};
