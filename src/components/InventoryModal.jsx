import { X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InventoryModal({ isOpen, onClose, inventory }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="bg-white w-full max-w-md rounded-[32px] flex flex-col max-h-[80vh] md:max-h-[70vh] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-b-[8px] border-slate-200 overflow-hidden relative"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-6 bg-game-teal text-white shadow-sm relative z-10">
              <div className="flex items-center gap-3 text-2xl font-black tracking-wide drop-shadow-sm">
                <Gift className="w-7 h-7 text-game-yellow" strokeWidth={3} />
                <span>VÍ VOUCHER CỦA BẠN</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" strokeWidth={2.5} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 custom-scrollbar bg-slate-50 relative">
              {inventory.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 py-10 opacity-80">
                  <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                    <Gift className="w-12 h-12 text-slate-300" />
                  </div>
                  <p className="text-xl font-bold text-slate-500 mb-1">Ví voucher rỗng!</p>
                  <p className="font-medium text-center">Hãy leo lên các bậc thang để<br/>nhận thật nhiều quà nhé!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {inventory.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white p-4 rounded-2xl shadow-card border-2 border-slate-100 flex flex-col items-center text-center space-y-3 hover:-translate-y-1 transition-transform"
                    >
                      <div className="w-16 h-16 bg-game-teal-light/20 rounded-full flex items-center justify-center text-4xl shadow-inner">
                        {item.icon}
                      </div>
                      <span className="font-bold text-slate-700 leading-tight">{item.name}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
