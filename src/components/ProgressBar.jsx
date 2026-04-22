import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '../assets/character.png';

export default function ProgressBar({ currentStep, correctAnswers, targetAnswers = 3 }) {
  // Absolute position from 0 to 9. 
  // If currentStep is 3, they won, pos is 9.
  const absolutePos = Math.min(9, currentStep * 3 + correctAnswers);

  // Map 0-8 to grid coordinates. 
  // Grid is 3 columns (0, 1, 2), 3 rows (0, 1, 2).
  // Row 0 (bottom): 0, 1, 2
  // Row 1 (middle): 2, 1, 0 (snake pattern)
  // Row 2 (top): 0, 1, 2
  const getGridCoords = (pos) => {
    if (pos >= 9) return { x: 2, y: 2 }; // Thắng, đứng ở đỉnh
    const row = Math.floor(pos / 3);
    const col = row % 2 === 0 ? (pos % 3) : (2 - (pos % 3));
    return { x: col, y: row };
  };

  const avatarCoords = getGridCoords(absolutePos);

  const blocks = [
    { id: 0, label: 'Bắt đầu', isMilestone: false },
    { id: 1, label: '', isMilestone: false },
    { id: 2, label: 'Bậc 1', isMilestone: true },
    { id: 3, label: '', isMilestone: false },
    { id: 4, label: '', isMilestone: false },
    { id: 5, label: 'Bậc 2', isMilestone: true },
    { id: 6, label: '', isMilestone: false },
    { id: 7, label: '', isMilestone: false },
    { id: 8, label: 'Đích', isMilestone: true },
  ];

  return (
    <div className="w-full bg-white/40 rounded-3xl p-4 md:p-6 shadow-card border-[3px] border-white/40 flex flex-col items-center">
      
      {/* 2D Map Container */}
      <div className="relative w-full max-w-[320px] h-[240px] mx-auto select-none">
        
        {/* Ladders */}
        {/* Ladder 1: Row 0 to Row 1 (Right side) */}
        <div 
          className="absolute pixel-ladder w-6 z-0"
          style={{ bottom: '15%', left: '87.5%', height: '35%', transform: 'translateX(-50%)' }}
        ></div>
        
        {/* Ladder 2: Row 1 to Row 2 (Left side) */}
        <div 
          className="absolute pixel-ladder w-6 z-0"
          style={{ bottom: '50%', left: '17.5%', height: '35%', transform: 'translateX(-50%)' }}
        ></div>

        {/* Blocks */}
        {blocks.map((b) => {
          const { x, y } = getGridCoords(b.id);
          const isActive = absolutePos >= b.id;
          const isCurrent = absolutePos === b.id;
          
          let bgClass = "bg-slate-300"; 
          if (isActive) {
            bgClass = b.isMilestone ? "bg-game-yellow pixel-glow" : "bg-game-teal-light";
          }
          
          return (
            <div 
              key={b.id}
              className={`absolute w-[25%] h-12 rounded flex items-center justify-center pixel-block ${bgClass}`}
              style={{ 
                left: `${x * 35 + 5}%`, 
                bottom: `${y * 35}%`,
                zIndex: isCurrent ? 10 : 5
              }}
            >
              {b.label && (
                <span className={`text-[11px] sm:text-xs font-black uppercase ${isActive ? 'text-slate-800' : 'text-slate-500 text-stroke'}`}>
                  {b.label}
                </span>
              )}
            </div>
          );
        })}

        {/* Player Avatar */}
        <motion.div
           className="absolute text-5xl z-20 pointer-events-none drop-shadow-md"
           initial={false}
           animate={{
             left: `calc(${avatarCoords.x * 35 + 17.5}% - 32px)`,
             bottom: `calc(${avatarCoords.y * 35}% + 35px)`
           }}
           transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <motion.div
            animate={{ 
              y: [0, -6, 0], 
              scaleX: avatarCoords.y % 2 === 0 ? -1 : 1 
            }}
            transition={{ 
              y: { repeat: Infinity, duration: 0.8, ease: "easeInOut" },
              scaleX: { duration: 0.3 }
            }}
          >
            <img 
              src={heroImg} 
              alt="Player" 
              className="w-16 h-16 object-contain drop-shadow-md scale-125 origin-bottom" 
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
