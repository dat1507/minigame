import { useState, useReducer, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import RewardPopup from './components/RewardPopup';
import InventoryModal from './components/InventoryModal';
import GameOverScreen from './components/GameOverScreen';
import { questions, rewards } from './data/questions';

const initialState = {
  currentStep: 0,
  correctAnswers: 0,
  lives: 3,
  inventory: [],
  currentQuestionIndex: 0,
  isGameOver: false,
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

      if (nextCorrect === 3) {
        nextStep += 1;
        nextCorrectAnswers = 0;
        showReward = true;
        currentReward = action.payload.reward;
      }

      return {
        ...state,
        currentStep: nextStep,
        correctAnswers: nextCorrectAnswers,
        showRewardPopup: showReward,
        currentReward: currentReward,
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
      };
    }
    case ACTION_CLOSE_REWARD: {
      return {
        ...state,
        showRewardPopup: false,
        inventory: [...state.inventory, state.currentReward],
        currentReward: null,
      };
    }
    case ACTION_TOGGLE_INVENTORY: {
      return { ...state, isInventoryOpen: action.payload };
    }
    case ACTION_RESTART: {
      return { ...initialState, currentQuestionIndex: Math.floor(Math.random() * questions.length) };
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

  useEffect(() => {
    dispatch({ type: ACTION_NEXT_QUESTION, payload: Math.floor(Math.random() * questions.length) });
  }, []);

  const handleAnswer = (selectedAnswer) => {
    const currentQ = questions[state.currentQuestionIndex];
    
    if (selectedAnswer === currentQ.correctAnswer) {
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      dispatch({ type: ACTION_ANSWER_CORRECT, payload: { reward: randomReward } });
    } else {
      dispatch({ type: ACTION_ANSWER_WRONG });
    }

    const nextQIndex = Math.floor(Math.random() * questions.length);
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
        <div className="text-center mb-8 relative">
          {/* Game controller emoji - header icon */}
          <div className="inline-block text-5xl mb-3 animate-bounce" style={{ animationDuration: '2s' }}>
            🕹️
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-game-yellow drop-shadow-title text-stroke uppercase tracking-wide">
            Bậc Thang
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-title uppercase tracking-wider mt-1">
            Câu Hỏi
          </h2>
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

      {state.isGameOver && (
        <GameOverScreen onRestart={handleRestart} currentStep={state.currentStep} />
      )}

      <InventoryModal 
        isOpen={state.isInventoryOpen} 
        onClose={() => dispatch({ type: ACTION_TOGGLE_INVENTORY, payload: false })} 
        inventory={state.inventory} 
      />
    </div>
  );
}
