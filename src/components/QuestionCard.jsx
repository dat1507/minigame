import { useState, useEffect } from 'react';

export default function QuestionCard({ questionData, onAnswer }) {
  const { question, options } = questionData;
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [questionData]);

  const handleSelect = (option) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(option);
    
    setTimeout(() => {
      onAnswer(option);
    }, 600);
  };

  return (
    <div className="w-full flex flex-col gap-4 md:gap-6">
      <div className="bg-white p-6 md:p-10 rounded-[32px] shadow-card border-b-[6px] border-slate-200 relative">
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 text-4xl transform -rotate-12">⭐</div>
        <div className="absolute -bottom-3 -right-2 text-3xl transform rotate-12">✨</div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center leading-snug">
          {question}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          
          let buttonClass = "w-full text-left p-4 md:p-5 rounded-2xl font-bold text-lg border-b-4 transition-all ";
          
          if (!selectedAnswer) {
            buttonClass += "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:translate-y-1 active:border-b-0";
          } else {
            if (isSelected) {
              buttonClass += "bg-game-yellow text-slate-900 border-game-yellow-dark transform scale-[0.98]";
            } else {
              buttonClass += "bg-slate-100 text-slate-400 border-slate-200 opacity-50";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              disabled={!!selectedAnswer}
              className={buttonClass}
            >
              <div className="flex items-center">
                <span className="inline-flex w-8 h-8 rounded-full bg-slate-100 text-slate-500 items-center justify-center mr-3 text-sm flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
