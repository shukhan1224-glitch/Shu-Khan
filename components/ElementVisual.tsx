
import React, { useMemo } from 'react';
import { motion as m } from 'framer-motion';
import { ElementDetail } from '../types';

const motion = m as any;

interface ElementVisualProps {
  element: ElementDetail;
  className?: string;
}

export const ElementVisual: React.FC<ElementVisualProps> = ({ element, className = '' }) => {
  // Deterministic random based on atomic number to ensure same element always looks the same
  const seed = element.atomicNumber;
  
  // Fix: Ensure random value is always between 0 and 1 (positive)
  const rand = (index: number) => {
      const x = Math.sin(seed + index) * 10000;
      return x - Math.floor(x);
  };

  // Generate shapes based on category
  const shapes = useMemo(() => {
    const count = 5 + Math.floor(rand(1) * 5); // 5 to 10 shapes
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: rand(i * 2) * 100,
      y: rand(i * 3) * 100,
      size: 20 + rand(i * 4) * 60,
      rotation: rand(i * 5) * 360,
      opacity: 0.1 + rand(i * 6) * 0.3,
      duration: 3 + rand(i * 7) * 5,
    }));
  }, [seed]);

  const isGas = element.category.includes('Gas') || element.category.includes('Nonmetal');
  const isMetal = element.category.includes('Metal') || element.category.includes('Lanthanide') || element.category.includes('Actinide');
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
        {/* Base Gradient is handled by parent, this adds texture */}
        
        {/* Dynamic Shapes */}
        {shapes.map((s) => (
            <motion.div
                key={s.id}
                className="absolute bg-white mix-blend-overlay"
                style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: `${s.size}%`,
                    height: `${s.size}%`,
                    borderRadius: isGas ? '50%' : isMetal ? '10%' : '0%', // Circle for gas, Soft square for metal, Square for others
                    transform: `rotate(${s.rotation}deg)`,
                }}
                animate={{
                    y: [0, -20, 0],
                    rotate: [s.rotation, s.rotation + 10, s.rotation],
                    scale: [1, 1.1, 1],
                    opacity: [s.opacity, s.opacity + 0.1, s.opacity]
                }}
                transition={{
                    duration: s.duration,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        ))}

        {/* Central Symbol Backdrop */}
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                className="text-[10rem] font-black text-white select-none pointer-events-none"
            >
                {element.symbol}
            </motion.div>
        </div>

        {/* Particle Effects for Radioactive/Special */}
        {(element.category === 'Actinide' || element.category === 'Noble Gas') && (
             <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`p-${i}`}
                        className="absolute w-1 h-1 bg-white rounded-full box-shadow-glow"
                        style={{ left: `${rand(i + 10) * 100}%`, top: '100%' }}
                        animate={{ y: -300, opacity: [0, 1, 0] }}
                        transition={{ duration: 2 + rand(i) * 2, repeat: Infinity, delay: rand(i) * 2 }}
                    />
                ))}
             </div>
        )}
    </div>
  );
};
