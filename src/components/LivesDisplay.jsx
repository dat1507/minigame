import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LivesDisplay({ lives, maxLives = 3 }) {
  return (
    <div className="flex items-center gap-1.5 md:gap-2">
      {[...Array(maxLives)].map((_, i) => {
        const isAlive = i < lives;
        return (
          <motion.div
            key={i}
            animate={isAlive ? { scale: [1, 1.1, 1] } : { scale: 0.9, opacity: 0.4 }}
            transition={isAlive ? { repeat: Infinity, duration: 2, delay: i * 0.2 } : { duration: 0.3 }}
            className={`flex items-center justify-center drop-shadow-md`}
          >
            <Heart
              className={`w-6 h-6 md:w-8 md:h-8 ${
                isAlive
                  ? 'fill-game-danger text-game-danger'
                  : 'fill-slate-300 text-slate-300'
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
