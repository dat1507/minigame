import { RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GameOverScreen({ onRestart, currentStep }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white w-full max-w-md rounded-[40px] p-8 border-b-[10px] border-slate-200 shadow-2xl text-center flex flex-col items-center justify-center relative overflow-hidden"
      >
        
        <div className="absolute top-[-50px] w-40 h-40 bg-game-danger/10 rounded-full blur-2xl"></div>

        <motion.div 
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-[80px] leading-none mb-2"
        >
          😵
        </motion.div>
        
        <h2 className="text-5xl font-black text-game-danger mb-2 drop-shadow-sm uppercase tracking-wide">
          Rất Tiếc!
        </h2>
        <p className="text-slate-500 font-bold text-lg mb-8">Bạn đã hết số mạng cho phép.</p>
        
        <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 mb-8 flex flex-col justify-center items-center shadow-inner relative">
          <p className="text-slate-400 font-bold uppercase mb-1 tracking-wider text-sm">Bậc cao nhất bạn đạt được</p>
          <div className="flex items-baseline gap-2 text-game-teal-dark">
            <span className="text-6xl font-black drop-shadow-sm">{currentStep}</span>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="btn-yellow w-full py-5 px-6 text-xl rounded-2xl flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-6 h-6" strokeWidth={3} />
          Chơi Lại Từ Đầu
        </button>
      </motion.div>
    </div>
  );
}
