import { RotateCcw, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GameOverScreen({ onRestart, highestStep, isGameWon, inventory = [] }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white w-full max-w-md rounded-[40px] p-8 border-b-[10px] border-slate-200 shadow-2xl text-center flex flex-col items-center justify-center relative overflow-hidden"
      >
        
        <div className={`absolute top-[-50px] w-40 h-40 ${isGameWon ? 'bg-game-teal-light' : 'bg-game-danger/10'} rounded-full blur-2xl`}></div>

        <motion.div 
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-[80px] leading-none mb-2"
        >
          {isGameWon ? "🏆" : "😵"}
        </motion.div>
        
        <h2 className={`text-5xl font-black ${isGameWon ? 'text-game-teal' : 'text-game-danger'} mb-2 drop-shadow-sm uppercase tracking-wide`}>
          {isGameWon ? "Tuyệt Vời!" : "Tiếc quá à!"}
        </h2>
        <p className="text-slate-500 font-bold text-lg mb-8">
          {isGameWon ? "Bạn đã thắng tuyệt đối 3 bậc!" : "Bạn đã hết số mạng cho phép."}
        </p>
        
        <div className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl p-4 md:p-5 mb-6 flex flex-col justify-center shadow-inner relative gap-3">
          
          {/* Stats Bar */}
          <div className="flex justify-center items-center w-full bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="text-center">
              <p className="text-slate-400 font-bold uppercase text-[10px] md:text-xs tracking-wider">Bậc cao nhất đạt được</p>
              <div className="text-3xl font-black text-game-teal-dark flex items-center justify-center gap-2 mt-1 drop-shadow-sm">
                <Trophy className="w-6 h-6 text-game-teal-dark" />
                {highestStep}/3
              </div>
            </div>
          </div>
          
          {/* Inventory Summary */}
          <div className="w-full text-left mt-1">
            <p className="text-slate-400 font-bold uppercase text-[10px] md:text-xs mb-2 tracking-wider">
              Ví voucher thu thập ({inventory.length})
            </p>
            {inventory.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 max-h-[120px] overflow-y-auto pr-1">
                {inventory.map((item, idx) => (
                  <div key={idx} className="bg-white border-2 border-slate-100 p-2 rounded-xl flex items-center gap-2">
                    <span className="text-lg md:text-xl drop-shadow-sm">{item.icon}</span>
                    <span className="text-[10px] md:text-xs font-bold text-slate-700 truncate" title={item.name}>{item.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs font-bold text-slate-400 bg-white p-3 rounded-xl border border-slate-100 text-center">
                Trống rỗng...
              </div>
            )}
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
