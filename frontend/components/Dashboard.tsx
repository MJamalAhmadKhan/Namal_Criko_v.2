
import React, { useState, useEffect } from 'react';
import { UserStats, Technique, CricketEvent, UserAccount, Quote } from '../types';

interface DashboardProps {
  user: UserAccount;
  stats: UserStats;
  events: CricketEvent[];
  recentTechniques: Technique[];
  onOpenTechnique: (id: string) => void;
  onBrowse: () => void;
  onNavigateHelp: () => void;
  onNavigateProfile: () => void;
  todayQuote?: Quote | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user, stats, events, recentTechniques, onOpenTechnique, onBrowse, onNavigateHelp, onNavigateProfile, todayQuote }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [activePopup, setActivePopup] = useState<CricketEvent | null>(null);

  const isAdmin = user.role === 'Admin';

  useEffect(() => {
    const importantEvent = events.find(e => e.type === 'Announcement' || e.type === 'Advertisement' || e.type === 'Trial');
    if (importantEvent) {
      setActivePopup(importantEvent);
      const timer = setTimeout(() => setShowPopup(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [events]);

  return (
    <div className="space-y-6 md:space-y-10 animate-fadeIn">
      {todayQuote && (
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6 border border-emerald-700/50">
          <div className="absolute top-0 right-0 text-[10rem] text-white/5 font-black leading-none pointer-events-none transform translate-y-[-2rem] translate-x-[2rem] select-none">"</div>
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-lg">
            <i className="fas fa-quote-left text-yellow-400 text-xl"></i>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-black bg-yellow-400 text-emerald-950 px-2 py-0.5 rounded-md uppercase tracking-wider">Quote of the Day</span>
              <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">{todayQuote.category}</span>
            </div>
            <p className="text-sm md:text-base font-bold italic leading-relaxed text-emerald-50">
              "{todayQuote.text}"
            </p>
            <p className="text-[10px] md:text-xs text-emerald-300 font-medium">— {todayQuote.author}</p>
          </div>
        </div>
      )}
      {showPopup && activePopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl md:rounded-[3rem] shadow-2xl overflow-hidden border border-emerald-100 animate-scaleIn">
            <div className="relative h-32 md:h-48 bg-emerald-900 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <i className="fas fa-cricket-bat-ball text-[10rem] md:text-[15rem] -rotate-12 transform -translate-x-10"></i>
              </div>
              <div className="relative text-center p-4 md:p-8">
                 <span className="bg-yellow-400 text-emerald-950 text-[8px] md:text-[10px] font-black px-3 md:px-4 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">University Highlight</span>
                 <h2 className="text-xl md:text-3xl font-black text-white leading-tight">{activePopup.title}</h2>
              </div>
              <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
            <div className="p-6 md:p-10 text-center">
              <p className="text-sm md:text-base text-gray-600 font-medium mb-6 md:mb-8 leading-relaxed">{activePopup.description}</p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                 <button onClick={() => setShowPopup(false)} className="flex-1 py-3 md:py-4 bg-gray-100 text-gray-600 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs">Dismiss</button>
                 {activePopup.registrationLink && (
                   <a href={activePopup.registrationLink} className="flex-1 py-3 md:py-4 bg-emerald-600 text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs shadow-lg shadow-emerald-200 text-center">Details</a>
                 )}
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-emerald-950 tracking-tight">University Feed</h1>
          <p className="text-gray-500 font-medium mt-1 uppercase tracking-widest text-[9px] md:text-[10px] opacity-70">Namal University Cricket Portal</p>
        </div>
        {!isAdmin && (
          <div className="flex gap-2 md:gap-4">
            <div className="flex-1 md:flex-none bg-white px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-3xl border border-emerald-50 shadow-sm text-center">
              <div className="text-xl md:text-3xl font-black text-emerald-600">{stats.streakDays}</div>
              <div className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Practice Streak</div>
            </div>
            <div className="flex-1 md:flex-none bg-white px-4 md:px-8 py-3 md:py-4 rounded-2xl md:rounded-3xl border border-emerald-50 shadow-sm text-center">
              <div className="text-xl md:text-3xl font-black text-blue-600">{stats.techniquesMastered.length}</div>
              <div className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Mastered</div>
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        <div className="lg:col-span-2 space-y-6 md:space-y-10">
          {!isAdmin && (
            <div className="bg-emerald-950 rounded-3xl md:rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 max-w-md">
                <span className="bg-emerald-600 text-white text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full uppercase tracking-wider mb-4 md:mb-6 inline-block border border-emerald-400/30">Training Engine Active</span>
                <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">Elevate Your Game.</h2>
                <p className="text-emerald-100/70 mb-6 md:mb-10 font-medium text-sm md:text-lg">Interactive simulations and frame-by-frame body mechanics analysis.</p>
                <button onClick={onBrowse} className="w-full sm:w-auto bg-yellow-400 text-emerald-950 px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-black shadow-xl hover:scale-105 transition-all text-[11px] md:text-sm uppercase tracking-widest">Begin Drill Session</button>
              </div>
              <div className="absolute -right-10 md:-right-20 -bottom-10 md:-bottom-20 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                 <i className="fas fa-cricket-bat-ball text-[15rem] md:text-[30rem] rotate-12"></i>
              </div>
            </div>
          )}

          <section>
            <h2 className="text-xl md:text-2xl font-black text-emerald-950 flex items-center mb-4 md:mb-6">
              <i className="fas fa-th-large mr-3 md:mr-4 text-emerald-500"></i> Student Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div 
                onClick={onNavigateHelp}
                className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-emerald-50 shadow-sm hover:shadow-lg transition-all cursor-pointer flex items-center space-x-4 md:space-x-6 border-l-4 border-l-emerald-600"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-50 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-600 text-xl md:text-2xl">
                  <i className="fas fa-headset"></i>
                </div>
                <div>
                  <h3 className="font-black text-emerald-950 text-base md:text-lg leading-tight">Support Desk</h3>
                  <p className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">Get Help</p>
                </div>
              </div>

              <div 
                onClick={onNavigateProfile}
                className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-emerald-50 shadow-sm hover:shadow-lg transition-all cursor-pointer flex items-center space-x-4 md:space-x-6 border-l-4 border-l-blue-600"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 text-xl md:text-2xl">
                  <i className="fas fa-user-cog"></i>
                </div>
                <div>
                  <h3 className="font-black text-emerald-950 text-base md:text-lg leading-tight">Settings</h3>
                  <p className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">Profile Info</p>
                </div>
              </div>
            </div>
          </section>

          {!isAdmin && (
            <section>
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-black text-emerald-950 flex items-center">
                  <i className="fas fa-history mr-3 md:mr-4 text-emerald-500"></i> Recent Activity
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {recentTechniques.map(tech => (
                  <div key={tech.id} onClick={() => onOpenTechnique(tech.id)} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-emerald-50 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex items-start space-x-4 md:space-x-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-50 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-600 text-xl md:text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
                      <i className="fas fa-play-circle"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-emerald-950 text-base md:text-lg mb-0.5">{tech.name}</h3>
                      <p className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">{tech.category}</p>
                      <span className="text-[9px] md:text-[11px] text-emerald-600 font-black uppercase tracking-widest">Resume →</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6 md:space-y-10">
          <h2 className="text-xl md:text-2xl font-black text-emerald-950 flex items-center">
            <i className="fas fa-bullhorn mr-3 md:mr-4 text-emerald-500"></i> Board
          </h2>
          <div className="bg-white border border-emerald-50 rounded-2xl md:rounded-[3rem] p-6 md:p-10 shadow-sm space-y-6 md:space-y-8 max-h-[400px] md:max-h-[700px] overflow-y-auto custom-scrollbar">
            {events.length > 0 ? events.map(event => (
              <div key={event.id} className="pb-6 md:pb-8 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <span className="text-[8px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest bg-emerald-50 text-emerald-700">
                    {event.type}
                  </span>
                  <span className="text-[9px] font-bold text-gray-300">{event.date}</span>
                </div>
                <h4 className="font-black text-emerald-950 text-sm md:text-base mb-1 md:mb-2 leading-tight">{event.title}</h4>
                <p className="text-[11px] md:text-xs text-gray-500 font-medium mb-3 md:mb-4 leading-relaxed line-clamp-2">{event.description}</p>
                <div className="text-[8px] md:text-[10px] font-black text-emerald-600/50 flex items-center uppercase tracking-widest">
                  <i className="fas fa-location-dot mr-1.5 md:mr-2"></i> {event.venue}
                </div>
              </div>
            )) : (
              <div className="text-center py-12 md:py-24 text-gray-300 italic font-medium text-sm">Notice board is currently empty.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
