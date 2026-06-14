
import React, { useState } from 'react';
import { UserAccount, AppState } from '../types';

interface NavigationProps {
  user: UserAccount;
  currentView: AppState['view'];
  onNavigate: (v: AppState['view']) => void;
  onLogout: () => void;
}

export const CrikoLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className} group`}>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-1 h-full bg-[#e5e7eb] rounded-sm rotate-[35deg] transform translate-x-0.5 border border-emerald-900/10"></div>
      <div className="w-1 h-full bg-[#e5e7eb] rounded-sm -rotate-[35deg] transform -translate-x-0.5 border border-emerald-900/10"></div>
    </div>
    <div className="absolute -top-1 w-3 h-3 bg-red-600 rounded-full border border-white shadow-sm z-20 flex items-center justify-center">
      <div className="w-full h-[1px] bg-white opacity-40"></div>
    </div>
    <div className="relative w-8 h-10 bg-emerald-800 rounded-b-lg rounded-t-sm flex flex-col items-center justify-center shadow-lg border border-yellow-500 overflow-hidden z-10">
      <span className="text-sm font-black text-yellow-400 tracking-tighter leading-none select-none">N</span>
    </div>
  </div>
);

const Navigation: React.FC<NavigationProps> = ({ user, currentView, onNavigate, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { label: string; view: AppState['view']; roles?: string[] }[] = [
    { label: user.role === 'Admin' ? 'Management' : 'Academy Home', view: user.role === 'Admin' ? 'admin' : 'dashboard' },
    { label: 'Drills', view: 'browser', roles: ['Player'] },
    { label: 'Top Players', view: 'leaderboard', roles: ['Player'] },
    { label: 'Progress', view: 'analytics', roles: ['Player'] },
    { label: 'About Us', view: 'team', roles: ['Player'] },
    { label: 'Help Desk', view: 'help' },
    { label: user.role === 'Admin' ? 'Settings' : 'Profile', view: 'profile' },
  ];

  const handleNav = (view: AppState['view']) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-[60] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-10">
          <button 
            onClick={() => handleNav(user.role === 'Admin' ? 'admin' : 'dashboard')}
            className="flex items-center space-x-2 md:space-x-4 group"
          >
            <CrikoLogo className="w-8 h-8 md:w-10 md:h-10" />
            <div className="text-left">
              <span className="block font-black text-emerald-950 leading-none tracking-tight text-lg md:text-xl">NAMAL<span className="text-emerald-700">CRIKO</span></span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.filter(item => !item.roles || item.roles.includes(user.role)).map(item => (
              <button 
                key={item.view}
                onClick={() => handleNav(item.view)} 
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentView === item.view ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-900 hover:bg-emerald-50'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-6">
          <div className="hidden md:flex items-center space-x-4 pr-6 border-r border-gray-100">
             <div className="text-right">
                <div className="text-xs font-black text-emerald-950 leading-none mb-1">{user.name}</div>
                <div className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest">{user.role}</div>
             </div>
             <div className="w-10 h-10 rounded-xl bg-emerald-950 text-yellow-400 flex items-center justify-center text-lg font-black shadow-inner overflow-hidden">
               {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name[0]}
             </div>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden p-2 text-emerald-900"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>

          <button onClick={onLogout} className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-xl hover:bg-red-50" title="Logout">
            <i className="fas fa-power-off text-lg md:text-xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-[55] animate-fadeIn flex flex-col p-6 space-y-4">
          {navItems.filter(item => !item.roles || item.roles.includes(user.role)).map(item => (
            <button 
              key={item.view}
              onClick={() => handleNav(item.view)} 
              className={`w-full text-left p-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-between ${currentView === item.view ? 'bg-emerald-600 text-white shadow-xl' : 'bg-gray-50 text-emerald-950'}`}
            >
              {item.label}
              <i className="fas fa-chevron-right opacity-50 text-xs"></i>
            </button>
          ))}
          <div className="mt-auto p-6 bg-emerald-50 rounded-3xl flex items-center space-x-4">
             <div className="w-12 h-12 rounded-xl bg-emerald-950 text-yellow-400 flex items-center justify-center text-xl font-black">
               {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover rounded-xl" /> : user.name[0]}
             </div>
             <div>
                <div className="font-black text-emerald-950">{user.name}</div>
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{user.role} Portal</div>
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
