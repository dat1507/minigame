import { motion } from 'framer-motion';

export default function RewardPopup({ reward, onClose }) {
  if (!reward) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        className="bg-white w-full max-w-sm rounded-[32px] p-6 pb-8 border-[6px] border-game-yellow shadow-2xl relative text-center"
      >
        
        {/* Glow behind icon */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-game-yellow/30 rounded-full blur-xl"></div>

        <motion.div 
          initial={{ rotate: -10, scale: 0.5 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
          className="mx-auto w-24 h-24 bg-game-yellow-light rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg relative z-10"
        >
          <span className="text-5xl">{reward.icon}</span>
        </motion.div>
        
        <h3 className="text-3xl font-black text-game-teal-dark mb-1 relative z-10">Tuyệt Vời!</h3>
        <p className="text-slate-500 font-medium mb-3 relative z-10">Bạn vừa nhận được:</p>
        
        <div className="bg-game-yellow/20 border-2 border-game-yellow/50 py-3 rounded-2xl mb-6 relative z-10 max-w-[85%] mx-auto">
          <p className="text-xl font-black text-game-yellow-dark">
            {reward.name}
          </p>
        </div>

        <button
          onClick={onClose}
          className="btn-yellow w-full py-4 px-6 rounded-2xl text-lg relative z-10"
        >
          Cất Vào Ví Voucher
        </button>
      </motion.div>
    </div>
  );
}
