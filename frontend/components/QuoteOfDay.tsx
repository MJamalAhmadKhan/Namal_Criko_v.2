import React, { useState } from 'react';
import { Quote } from '../types';

interface QuoteOfDayProps {
  quote: Quote | null;
  onDismiss: () => void;
}

const categoryColors: Record<string, string> = {
  BATTING:  'from-blue-900 to-emerald-950',
  BOWLING:  'from-red-900 to-emerald-950',
  GENERAL:  'from-emerald-900 to-emerald-950',
  MINDSET:  'from-purple-900 to-emerald-950',
};

const categoryIcons: Record<string, string> = {
  BATTING:  'fa-cricket-bat-ball',
  BOWLING:  'fa-baseball',
  GENERAL:  'fa-star',
  MINDSET:  'fa-brain',
};

const QuoteOfDay: React.FC<QuoteOfDayProps> = ({ quote, onDismiss }) => {
  const [visible, setVisible] = useState(true);

  if (!quote || !visible) return null;

  const gradient = categoryColors[quote.category] || categoryColors.GENERAL;
  const icon = categoryIcons[quote.category] || 'fa-quote-left';

  const handleDismiss = () => {
    setVisible(false);
    onDismiss();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl animate-scaleIn bg-gradient-to-br ${gradient}`}>
        {/* Top decoration */}
        <div className="relative p-8 pb-4">
          <div className="absolute top-0 right-0 text-[8rem] text-white/5 font-black leading-none pr-4">"</div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
              <i className={`fas ${icon} text-emerald-950`}></i>
            </div>
            <div>
              <div className="text-[9px] font-black text-yellow-400 uppercase tracking-widest">Quote of the Day</div>
              <div className="text-[9px] font-black text-white/40 uppercase tracking-widest">{quote.category}</div>
            </div>
          </div>

          <blockquote className="text-white text-xl font-black leading-relaxed mb-6">
            "{quote.text}"
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/60 font-bold text-sm">{quote.author}</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>
        </div>

        <div className="p-8 pt-4">
          <button onClick={handleDismiss}
            className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-white/20">
            Start Training <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteOfDay;
