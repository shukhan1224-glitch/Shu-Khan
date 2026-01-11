
import React from 'react';
import { motion as m } from 'framer-motion';
import { AvatarConfig } from '../types';

const motion = m as any;

interface OctoAvatarProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
}

export const OctoAvatar: React.FC<OctoAvatarProps> = ({ config, size = 100, className = '' }) => {
  const { skinColor, hat, face, item, pattern = 'none', bgEffect = 'none' } = config;

  return (
    <div 
      className={`relative inline-block ${className}`} 
      style={{ width: size, height: size }}
    >
      <motion.svg 
         viewBox="0 0 200 200" 
         fill="none" 
         xmlns="http://www.w3.org/2000/svg"
         className="w-full h-full"
         animate={{ y: [0, -2, 0] }}
         transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        {/* --- BACKGROUND EFFECTS --- */}
        {bgEffect === 'aura' && (
           <circle cx="100" cy="120" r="80" fill={skinColor} fillOpacity="0.2" filter="url(#glow)" />
        )}
        {bgEffect === 'bubbles' && (
           <g>
              <circle cx="50" cy="150" r="5" fill="#A8E6CF" fillOpacity="0.6" />
              <circle cx="150" cy="50" r="8" fill="#A8E6CF" fillOpacity="0.6" />
              <circle cx="170" cy="180" r="4" fill="#A8E6CF" fillOpacity="0.6" />
           </g>
        )}
        {bgEffect === 'stars' && (
           <g>
              {/* Deep Night Sky Circle Backdrop */}
              <circle cx="100" cy="120" r="85" fill="#1e1b4b" /> {/* Dark Indigo */}
              
              {/* Scattered Stars */}
              <circle cx="40" cy="60" r="2" fill="white" opacity="0.8" />
              <circle cx="160" cy="70" r="2" fill="white" opacity="0.6" />
              <circle cx="30" cy="130" r="1.5" fill="white" opacity="0.7" />
              <circle cx="175" cy="120" r="2" fill="white" opacity="0.8" />
              <circle cx="100" cy="45" r="1.5" fill="white" opacity="0.5" />
              <circle cx="80" cy="180" r="1" fill="white" opacity="0.6" />
              <circle cx="130" cy="190" r="1.5" fill="white" opacity="0.7" />

              {/* Larger Gold Stars */}
              <path d="M40 80 L42 85 L47 85 L43 88 L45 93 L40 90 L35 93 L37 88 L33 85 L38 85 Z" fill="#FFD700" />
              <path d="M160 100 L162 105 L167 105 L163 108 L165 113 L160 110 L155 113 L157 108 L153 105 L158 105 Z" fill="#FFD700" />
              <path d="M120 170 L121 173 L124 173 L122 175 L123 178 L120 176 L117 178 L118 175 L116 173 L119 173 Z" fill="#FFD700" />
           </g>
        )}

        {/* --- LEGS --- */}
        <path d="M60 160C60 160 40 180 50 190C60 200 70 180 70 170" stroke={skinColor} strokeWidth="12" strokeLinecap="round" />
        <path d="M90 170C90 170 80 195 90 198C100 201 105 180 100 170" stroke={skinColor} strokeWidth="12" strokeLinecap="round" />
        <path d="M120 170C120 170 120 195 130 198C140 201 135 180 130 170" stroke={skinColor} strokeWidth="12" strokeLinecap="round" />
        <path d="M150 160C150 160 170 180 160 190C150 200 140 180 140 170" stroke={skinColor} strokeWidth="12" strokeLinecap="round" />
        
        {/* Held Item Leg (Right Side) */}
        {item !== 'none' && (
           <path d="M160 140 C 180 140, 190 120, 180 110" stroke={skinColor} strokeWidth="12" strokeLinecap="round" />
        )}

        {/* --- BODY --- */}
        <ellipse cx="100" cy="120" rx="60" ry="50" fill={skinColor} />
        
        {/* --- PATTERNS --- */}
        <mask id="bodyMask">
           <ellipse cx="100" cy="120" rx="60" ry="50" fill="white" />
        </mask>
        
        {/* Subtle Patterns (Spots/Stripes) */}
        <g mask="url(#bodyMask)" opacity="0.3" fill="white">
           {pattern === 'spots' && (
              <>
                 <circle cx="80" cy="150" r="8" />
                 <circle cx="120" cy="150" r="6" />
                 <circle cx="60" cy="120" r="5" />
                 <circle cx="140" cy="120" r="7" />
                 <circle cx="100" cy="100" r="4" />
              </>
           )}
           {pattern === 'stripes' && (
              <>
                 <path d="M40 120 Q 100 140 160 120" stroke="white" strokeWidth="8" fill="none" />
                 <path d="M40 140 Q 100 160 160 140" stroke="white" strokeWidth="8" fill="none" />
              </>
           )}
        </g>

        {/* Vivid Patterns (Sparkles) - Outside of opacity group for brightness */}
        <g mask="url(#bodyMask)">
           {pattern === 'sparkles' && (
              <>
                 <path d="M70 150 L72 155 L77 155 L73 158 L75 163 L70 160 L65 163 L67 158 L63 155 L68 155 Z" fill="#FDE047" stroke="#F59E0B" strokeWidth="1" />
                 <path d="M130 140 L132 145 L137 145 L133 148 L135 153 L130 150 L125 153 L127 148 L123 145 L128 145 Z" fill="#FDE047" stroke="#F59E0B" strokeWidth="1" />
                 <path d="M100 90 L102 95 L107 95 L103 98 L105 103 L100 100 L95 103 L97 98 L93 95 L98 95 Z" fill="#FDE047" stroke="#F59E0B" strokeWidth="1" />
                 <circle cx="90" cy="130" r="2" fill="white" />
                 <circle cx="110" cy="150" r="2" fill="white" />
                 <circle cx="60" cy="130" r="1.5" fill="#FDE047" />
                 <circle cx="140" cy="130" r="1.5" fill="#FDE047" />
              </>
           )}
        </g>

        {/* --- FACE EXPRESSIONS --- */}
        <g id="face">
            {/* Eyes */}
            {face !== 'dizzy' && (
               <>
                  <circle cx="80" cy="120" r="8" fill="#334155" />
                  <circle cx="120" cy="120" r="8" fill="#334155" />
               </>
            )}
            
            {/* Expression */}
            {face === 'happy' && (
               <>
                 <path d="M90 135 Q 100 145 110 135" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                 <circle cx="70" cy="135" r="5" fill="#FFAAA5" opacity="0.6" />
                 <circle cx="130" cy="135" r="5" fill="#FFAAA5" opacity="0.6" />
               </>
            )}
            {face === 'smart' && (
               <>
                 <path d="M95 138 L 105 138" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                 {/* Glasses Frame */}
                 <circle cx="80" cy="120" r="14" stroke="#334155" strokeWidth="2" fill="white" fillOpacity="0.3" />
                 <circle cx="120" cy="120" r="14" stroke="#334155" strokeWidth="2" fill="white" fillOpacity="0.3" />
                 <path d="M94 120 L 106 120" stroke="#334155" strokeWidth="2" />
               </>
            )}
            {face === 'surprised' && (
               <>
                 <circle cx="100" cy="140" r="6" stroke="#334155" strokeWidth="3" />
                 <path d="M75 110 Q 80 105 85 110" stroke="#334155" strokeWidth="2" />
                 <path d="M115 110 Q 120 105 125 110" stroke="#334155" strokeWidth="2" />
               </>
            )}
            {face === 'determined' && (
               <>
                  <path d="M75 112 L 90 118" stroke="#334155" strokeWidth="2" />
                  <path d="M125 112 L 110 118" stroke="#334155" strokeWidth="2" />
                  <path d="M92 140 Q 100 135 108 140" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
               </>
            )}
            {face === 'dizzy' && (
               <>
                  {/* Swirl Eyes */}
                  <g transform="translate(80, 120)">
                     <path d="M-5 0 Q 0 -5 5 0 Q 0 5 -5 0" stroke="#334155" strokeWidth="2" fill="none" />
                     <path d="M-8 -3 Q 0 -8 8 0 Q 0 8 -8 0" stroke="#334155" strokeWidth="2" fill="none" opacity="0.6" />
                  </g>
                  <g transform="translate(120, 120)">
                     <path d="M-5 0 Q 0 -5 5 0 Q 0 5 -5 0" stroke="#334155" strokeWidth="2" fill="none" />
                     <path d="M-8 -3 Q 0 -8 8 0 Q 0 8 -8 0" stroke="#334155" strokeWidth="2" fill="none" opacity="0.6" />
                  </g>
                  {/* Wavy Mouth */}
                  <path d="M85 140 Q 92 135 100 140 Q 108 145 115 140" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  {/* Dizzy Stars */}
                  <path d="M70 100 L72 105 L77 105 L73 108 L75 113 L70 110 L65 113 L67 108 L63 105 L68 105 Z" fill="#FCD34D" />
                  <path d="M130 100 L132 105 L137 105 L133 108 L135 113 L130 110 L125 113 L127 108 L123 105 L128 105 Z" fill="#FCD34D" />
               </>
            )}
        </g>

        {/* --- HATS --- */}
        {hat === 'wizard' && (
            <g transform="translate(100, 90) rotate(-5)">
               <ellipse cx="0" cy="0" rx="70" ry="15" fill="#4A4E69" />
               <path d="M-40 0 Q 0 -110 60 -80 L 40 0 Z" fill="#4A4E69" />
               <path d="M-35 -5 Q 0 5 35 -5" stroke="#FFD3B6" strokeWidth="8" strokeLinecap="round" fill="none" />
               <path d="M20 -50 L 22 -45 L 27 -45 L 23 -42 L 25 -37 L 20 -40 L 15 -37 L 17 -42 L 13 -45 L 18 -45 Z" fill="#FFD700" />
            </g>
        )}
        {hat === 'cap' && (
            <g transform="translate(100, 85)">
               <path d="M-60 10 C -60 -40, 60 -40, 60 10 Z" fill="#334155" />
               <path d="M-70 10 L 70 10 L 70 15 C 70 25, -70 25, -70 15 Z" fill="#334155" />
            </g>
        )}
        {hat === 'crown' && (
            <g transform="translate(100, 75)">
               <path d="M-40 20 L -40 -20 L -20 0 L 0 -30 L 20 0 L 40 -20 L 40 20 Z" fill="#FFD700" stroke="#D4AF37" strokeWidth="3" />
            </g>
        )}
        {hat === 'goggles' && (
            <g transform="translate(100, 80)">
               <rect x="-50" y="-10" width="100" height="20" rx="5" fill="#334155" />
               <circle cx="-25" cy="0" r="18" fill="#4ECDC4" stroke="#CBD5E1" strokeWidth="4" opacity="0.8" />
               <circle cx="25" cy="0" r="18" fill="#4ECDC4" stroke="#CBD5E1" strokeWidth="4" opacity="0.8" />
            </g>
        )}
        {hat === 'astronaut' && (
            <g transform="translate(100, 110)">
               {/* Helmet Dome */}
               <path d="M-65 -20 C -65 -70, 65 -70, 65 -20 L 65 30 C 65 50, -65 50, -65 30 Z" fill="white" stroke="#94A3B8" strokeWidth="2" fillOpacity="0.4" />
               <path d="M-65 -20 C -65 -70, 65 -70, 65 -20" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" fill="none" />
               {/* Reflection Glint */}
               <path d="M30 -40 Q 50 -40 50 -20" stroke="white" strokeWidth="4" opacity="0.6" strokeLinecap="round" />
               {/* Neck Ring */}
               <path d="M-60 30 Q 0 50 60 30" stroke="#334155" strokeWidth="4" fill="none" />
            </g>
        )}

        {/* --- ITEMS --- */}
        {item === 'flask' && (
            <g transform="translate(180, 100) rotate(10)">
               <path d="M-10 -20 L 10 -20 L 20 20 L -20 20 Z" fill="#4ECDC4" opacity="0.8" stroke="#334155" strokeWidth="2" />
               <rect x="-8" y="-30" width="16" height="10" fill="white" opacity="0.5" stroke="#334155" strokeWidth="2" />
               {/* Bubbles */}
               <circle cx="0" cy="10" r="3" fill="white" opacity="0.6" />
               <circle cx="5" cy="0" r="2" fill="white" opacity="0.6" />
            </g>
        )}
        {item === 'wand' && (
            <g transform="translate(180, 100) rotate(-10)">
               <rect x="-3" y="-30" width="6" height="60" rx="2" fill="#8B5CF6" />
               <circle cx="0" cy="-30" r="8" fill="#FFD700" />
               <path d="M-5 -45 L 5 -35 M 5 -45 L -5 -35" stroke="white" strokeWidth="2" />
            </g>
        )}
        {item === 'book' && (
            <g transform="translate(180, 110)">
               <rect x="-20" y="-25" width="40" height="50" rx="3" fill="#A8E6CF" stroke="#334155" strokeWidth="2" />
               <path d="M-10 -15 L 10 -15 M -10 0 L 10 0 M -10 15 L 10 15" stroke="#334155" strokeWidth="2" opacity="0.5" />
            </g>
        )}
        {item === 'atom' && (
            <g transform="translate(180, 100)">
               <circle cx="0" cy="0" r="5" fill="#334155" />
               <ellipse cx="0" cy="0" rx="20" ry="8" stroke="#64748B" strokeWidth="1" transform="rotate(0)" />
               <ellipse cx="0" cy="0" rx="20" ry="8" stroke="#64748B" strokeWidth="1" transform="rotate(60)" />
               <ellipse cx="0" cy="0" rx="20" ry="8" stroke="#64748B" strokeWidth="1" transform="rotate(-60)" />
            </g>
        )}
        {item === 'dna' && (
            <g transform="translate(180, 100)">
               <path d="M-10 -25 Q 10 -10 -10 5 Q -25 20 -10 35" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" fill="none" />
               <path d="M10 -25 Q -10 -10 10 5 Q 25 20 10 35" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" fill="none" />
               <line x1="-5" y1="-18" x2="5" y2="-18" stroke="#334155" strokeWidth="2" />
               <line x1="-8" y1="-5" x2="8" y2="-5" stroke="#334155" strokeWidth="2" />
               <line x1="-5" y1="8" x2="5" y2="8" stroke="#334155" strokeWidth="2" />
               <line x1="-8" y1="20" x2="8" y2="20" stroke="#334155" strokeWidth="2" />
            </g>
        )}
        
        {/* Filters */}
        <defs>
           <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                 <feMergeNode in="coloredBlur"/>
                 <feMergeNode in="SourceGraphic"/>
              </feMerge>
           </filter>
        </defs>

      </motion.svg>
    </div>
  );
};
