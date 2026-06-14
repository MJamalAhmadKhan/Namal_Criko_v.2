
import React, { useState, useMemo } from 'react';
import { Card, ReviewGrade } from '../types';

interface ReviewSessionProps {
  cards: Card[];
  onFinish: () => void;
  onReviewComplete: (cardId: string, grade: ReviewGrade) => void;
}

const ReviewSession: React.FC<ReviewSessionProps> = ({ cards, onFinish, onReviewComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const currentCard = useMemo(() => cards[currentIndex], [cards, currentIndex]);
  const progress = cards.length > 0 ? ((currentIndex) / cards.length) * 100 : 0;

  const handleGrade = (grade: ReviewGrade) => {
    onReviewComplete(currentCard.id, grade);
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      setSessionCompleted(true);
    }
  };

  if (cards.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          <i className="fas fa-check"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">All Done!</h2>
        <p className="text-gray-500 mt-2 mb-8">You've finished all your reviews for this session.</p>
        <button 
          onClick={onFinish}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (sessionCompleted) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm animate-fadeIn">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          <i className="fas fa-trophy"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Session Complete</h2>
        <p className="text-gray-500 mt-2 mb-8">Great job staying consistent. See you at your next review!</p>
        <button 
          onClick={onFinish}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100"
        >
          Finish Session
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      {/* Progress Header */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-semibold text-gray-400">
          <span>Current Session</span>
          <span>{currentIndex + 1} of {cards.length}</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Card Container */}
      <div className="card-flip h-[400px] w-full">
        <div className={`card-inner h-full ${isFlipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div 
            onClick={() => setIsFlipped(true)}
            className="card-front bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer border border-gray-100 hover:border-indigo-200 transition-colors"
          >
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6">Question</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
              {currentCard.front}
            </h2>
            <div className="mt-auto text-gray-300 text-sm flex items-center">
              <i className="fas fa-sync-alt mr-2"></i> Click to flip
            </div>
          </div>

          {/* Back */}
          <div className="card-back bg-white rounded-3xl shadow-xl p-8 flex flex-col border border-indigo-100 overflow-y-auto">
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Answer</div>
            <div className="text-xl sm:text-2xl font-semibold text-gray-900 mb-8 border-b border-gray-50 pb-8">
              {currentCard.back}
            </div>
            
            {currentCard.explanation && (
              <div className="bg-gray-50 rounded-2xl p-4 text-gray-600 text-sm italic mb-8">
                <i className="fas fa-info-circle mr-2 text-indigo-400"></i>
                {currentCard.explanation}
              </div>
            )}

            <div className="mt-auto">
              <p className="text-center text-gray-400 text-xs font-bold mb-4 uppercase">How difficult was this?</p>
              <div className="grid grid-cols-4 gap-3">
                <button 
                  onClick={() => handleGrade(ReviewGrade.AGAIN)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-bold text-sm transition-colors border border-red-100"
                >
                  Again
                </button>
                <button 
                  onClick={() => handleGrade(ReviewGrade.HARD)}
                  className="bg-orange-50 hover:bg-orange-100 text-orange-600 py-3 rounded-xl font-bold text-sm transition-colors border border-orange-100"
                >
                  Hard
                </button>
                <button 
                  onClick={() => handleGrade(ReviewGrade.GOOD)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-xl font-bold text-sm transition-colors border border-blue-100"
                >
                  Good
                </button>
                <button 
                  onClick={() => handleGrade(ReviewGrade.EASY)}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 py-3 rounded-xl font-bold text-sm transition-colors border border-emerald-100"
                >
                  Easy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onFinish}
          className="text-gray-400 hover:text-red-500 font-semibold text-sm transition-colors"
        >
          End Study Session Early
        </button>
      </div>
    </div>
  );
};

export default ReviewSession;
