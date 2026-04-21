import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import LivesDisplay from './LivesDisplay';
import { Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GameBoard({ 
  currentStep, 
  correctAnswers, 
  lives, 
  questionData, 
  onAnswer,
  onOpenInventory 
}) {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      
      {/* Top HUD */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 md:p-4 shadow-card border-b-4 border-slate-200">
        <LivesDisplay lives={lives} maxLives={3} />
        
        <button 
          onClick={onOpenInventory}
          className="btn-yellow px-4 py-2 rounded-xl text-sm md:text-base flex items-center gap-2 font-bold"
        >
          <Gift className="w-5 h-5" />
          <span className="hidden sm:inline">Túi Đồ</span>
        </button>
      </div>

      {/* Step & Progress */}
      <ProgressBar currentStep={currentStep} correctAnswers={correctAnswers} targetAnswers={3} />

      {/* Question Area */}
      <div className="flex-1 flex flex-col justify-center py-2 md:py-4">
        <AnimatePresence mode="wait">
          {questionData ? (
            <motion.div
              key={questionData.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionCard questionData={questionData} onAnswer={onAnswer} />
            </motion.div>
          ) : (
            <div className="text-center text-white/80 font-bold text-xl">Đang tải câu hỏi...</div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
