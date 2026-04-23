import { useState, useReducer, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameBoard from './components/GameBoard';
import RewardPopup from './components/RewardPopup';
import InventoryModal from './components/InventoryModal';
import GameOverScreen from './components/GameOverScreen';
import { questions, rewards } from './data/questions';

const initialState = {
  currentStep: 0,
  correctAnswers: 0,
  lives: 1,
  inventory: [],
  currentQuestionIndex: 0,
  usedQuestions: [],
  highestStep: 0,
  isGameOver: false,
  isGameWon: false,
  showRewardPopup: false,
  currentReward: null,
  isInventoryOpen: false,
};

const ACTION_ANSWER_CORRECT = 'ANSWER_CORRECT';
const ACTION_ANSWER_WRONG = 'ANSWER_WRONG';
const ACTION_CLOSE_REWARD = 'CLOSE_REWARD';
const ACTION_TOGGLE_INVENTORY = 'TOGGLE_INVENTORY';
const ACTION_RESTART = 'RESTART';
const ACTION_NEXT_QUESTION = 'NEXT_QUESTION';

function gameReducer(state, action) {
  switch (action.type) {
    case ACTION_ANSWER_CORRECT: {
      const nextCorrect = state.correctAnswers + 1;
      let nextStep = state.currentStep;
      let nextCorrectAnswers = nextCorrect;
      let showReward = false;
      let currentReward = null;
      let isGameWon = state.isGameWon;

      if (nextCorrect === 3) {
        nextStep += 1;
        nextCorrectAnswers = 0;
        showReward = true;
        currentReward = action.payload.reward;
      }
      
      if (nextStep >= 3) {
        isGameWon = true; 
      }

      return {
        ...state,
        currentStep: nextStep,
        highestStep: Math.max(state.highestStep || 0, nextStep),
        correctAnswers: nextCorrectAnswers,
        showRewardPopup: showReward,
        currentReward: currentReward,
        isGameWon: isGameWon,
        usedQuestions: [...state.usedQuestions, state.currentQuestionIndex],
      };
    }
    case ACTION_ANSWER_WRONG: {
      const newLives = state.lives - 1;
      return {
        ...state,
        lives: newLives,
        correctAnswers: 0,
        currentStep: Math.max(0, state.currentStep - 1),
        isGameOver: newLives === 0,
        usedQuestions: [...state.usedQuestions, state.currentQuestionIndex],
      };
    }
    case ACTION_CLOSE_REWARD: {
      return {
        ...state,
        showRewardPopup: false,
        inventory: [...state.inventory, state.currentReward],
        currentReward: null,
        isGameOver: state.isGameWon ? true : state.isGameOver,
      };
    }
    case ACTION_TOGGLE_INVENTORY: {
      return { ...state, isInventoryOpen: action.payload };
    }
    case ACTION_RESTART: {
      return { 
        ...initialState, 
        currentQuestionIndex: Math.floor(Math.random() * questions.length),
        usedQuestions: []
      };
    }
    case ACTION_NEXT_QUESTION: {
      return { ...state, currentQuestionIndex: action.payload };
    }
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [showCorrectPopup, setShowCorrectPopup] = useState(false);
  const popupTimeoutRef = useRef(null);

  useEffect(() => {
    dispatch({ type: ACTION_NEXT_QUESTION, payload: Math.floor(Math.random() * questions.length) });
  }, []);

  const handleAnswer = (selectedAnswer) => {
    const currentQ = questions[state.currentQuestionIndex];
    
    if (selectedAnswer === currentQ.correctAnswer) {
      setShowCorrectPopup(true);
      if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = setTimeout(() => setShowCorrectPopup(false), 1000);

      let assignedReward = null;
      if (state.correctAnswers === 2) {
        const completedLevel = state.currentStep + 1;
        assignedReward = rewards.find(r => r.id === completedLevel) || rewards[0];
      }
      dispatch({ type: ACTION_ANSWER_CORRECT, payload: { reward: assignedReward } });
    } else {
      dispatch({ type: ACTION_ANSWER_WRONG });
    }

    let availableQuestions = [];
    for (let i = 0; i < questions.length; i++) {
      if (!state.usedQuestions.includes(i) && i !== state.currentQuestionIndex) {
        availableQuestions.push(i);
      }
    }
    
    // Fallback if all questions are used up somehow
    if (availableQuestions.length === 0) {
      availableQuestions = questions.map((_, index) => index).filter(i => i !== state.currentQuestionIndex);
    }
    
    const nextQIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

    dispatch({ type: ACTION_NEXT_QUESTION, payload: nextQIndex });
  };

  const handleCloseReward = () => {
    dispatch({ type: ACTION_CLOSE_REWARD });
  };

  const handleRestart = () => {
    dispatch({ type: ACTION_RESTART });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col pt-8 md:pt-12 px-4 pb-4">
      {/* Decorative Blob Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full opacity-10 blur-3xl mix-blend-overlay pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-game-teal-dark rounded-full opacity-20 blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-3xl mx-auto z-10 flex flex-col flex-1">
        {/* Header Title */}
        <div className="text-center mb-10 md:mb-12 relative mt-2">
          {/* Intense Background Glow to highlight the title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[90%] h-[160%] bg-gradient-to-r from-white/0 via-white/80 to-white/0 blur-[35px] pointer-events-none z-0 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Playful Floating Icon */}
            <div className="inline-block text-5xl md:text-6xl mb-2 animate-bounce drop-shadow-lg" style={{ animationDuration: '1.5s' }}>
              🌟
            </div>
            
            <h1 className="flex flex-col items-center justify-center font-black uppercase w-full">
              {/* MỞ VỊ - Yellow with white stroke */}
              <span className="text-[3.5rem] md:text-[5rem] leading-none text-game-yellow tracking-widest transform -rotate-2 mb-1 md:mb-2 z-20"
                    style={{
                      WebkitTextStroke: '2px white',
                      textShadow: '0 6px 12px rgba(0,0,0,0.15), 0 0 20px rgba(255,255,255,0.6)'
                    }}>
                MỞ VỊ
              </span>
              
              {/* XANH NGON - Teal with thick white stroke & deep glow */}
              <div className="relative z-30 mt-1 md:mt-2">
                <span className="absolute inset-0 text-[4rem] md:text-[6.5rem] leading-[0.9] tracking-tighter text-game-teal-dark blur-[15px] opacity-70">
                  XANH NGON
                </span>
                <span className="relative text-[4rem] md:text-[6.5rem] leading-[0.9] tracking-tighter text-[#1EB5B0] transform rotate-1 inline-block" 
                      style={{
                        WebkitTextStroke: '3px white',
                        textShadow: '0 10px 20px rgba(0,0,0,0.2), 0 0 10px rgba(255,255,255,0.9)'
                      }}>
                  XANH NGON
                </span>
              </div>
            </h1>
          </div>
        </div>

        {/* Main Game Interface */}
        <div className="flex-1 w-full bg-white/20 p-2 md:p-4 rounded-3xl backdrop-blur-sm border-[3px] border-white/40 shadow-2xl flex flex-col">
          <GameBoard 
            currentStep={state.currentStep}
            correctAnswers={state.correctAnswers}
            lives={state.lives}
            questionData={questions[state.currentQuestionIndex]}
            onAnswer={handleAnswer}
            onOpenInventory={() => dispatch({ type: ACTION_TOGGLE_INVENTORY, payload: true })}
          />
        </div>
      </div>

      {/* Screen Modals */}
      {state.showRewardPopup && (
        <RewardPopup reward={state.currentReward} onClose={handleCloseReward} />
      )}

      {state.isGameOver && !state.showRewardPopup && (
        <GameOverScreen 
          onRestart={handleRestart} 
          highestStep={state.highestStep} 
          isGameWon={state.isGameWon}
          inventory={state.inventory}
        />
      )}

      <InventoryModal 
        isOpen={state.isInventoryOpen} 
        onClose={() => dispatch({ type: ACTION_TOGGLE_INVENTORY, payload: false })} 
        inventory={state.inventory} 
      />

      {/* Correct Answer Popup */}
      <AnimatePresence>
        {showCorrectPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none"
          >
            <div 
              className="text-5xl md:text-7xl font-black text-[#FFD700] drop-shadow-2xl text-center px-4"
              style={{ 
                WebkitTextStroke: '2px #ff6b6b', 
                textShadow: '0 8px 16px rgba(0,0,0,0.4), 0 0 20px rgba(255, 215, 0, 0.8)' 
              }}
            >
              Đúng rồi giỏi hỉ!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
