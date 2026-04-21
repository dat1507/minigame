export default function ProgressBar({ currentStep, correctAnswers, targetAnswers = 3 }) {
  const progressPercentage = (correctAnswers / targetAnswers) * 100;

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-card border-b-4 border-slate-200 flex items-center gap-4">
      
      {/* Step Indicator */}
      <div className="flex flex-col items-center justify-center bg-game-teal-light/20 text-game-teal-dark rounded-xl px-4 py-2 min-w-[70px]">
        <span className="text-xs uppercase font-bold uppercase mb-0.5">Bậc</span>
        <span className="text-3xl font-black leading-none drop-shadow-sm">{currentStep}</span>
      </div>

      {/* Progress Bar */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-bold text-slate-500 uppercase">Tiến trình</span>
          <span className="text-sm font-black text-game-yellow-dark">{correctAnswers}/{targetAnswers}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner relative">
          {/* Track background */}
          <div className="absolute inset-0 bg-slate-200/50"></div>
          {/* Fill */}
          <div
            className="bg-game-yellow h-full rounded-full transition-all duration-500 ease-out relative z-10"
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Shimmer effect inside progress bar */}
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-white/30 to-transparent"></div>
          </div>
        </div>
      </div>

    </div>
  );
}
