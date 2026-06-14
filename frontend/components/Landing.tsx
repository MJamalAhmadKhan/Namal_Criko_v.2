
import React from 'react';
import { CrikoLogo } from './Navigation';

interface LandingProps {
  onLogin: () => void;
  onRegister: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-x-hidden">
      <header className="px-4 md:px-6 py-4 md:py-6 flex items-center justify-between max-w-7xl mx-auto w-full z-50 sticky top-0 bg-white/90 backdrop-blur-md">
        <div className="flex items-center space-x-2 md:space-x-4">
          <CrikoLogo className="w-8 h-8 md:w-10 md:h-10" />
          <span className="font-['Kanit'] font-black text-lg md:text-2xl tracking-tight text-emerald-950">NAMAL<span className="text-emerald-700">CRIKO</span></span>
        </div>
        <div className="flex items-center space-x-4 md:space-x-8">
          <button 
            onClick={onLogin} 
            className="text-[10px] md:text-xs font-black uppercase tracking-widest text-emerald-900 hover:text-emerald-700 transition-colors"
          >
            LOGIN
          </button>
          <button 
            onClick={onRegister} 
            className="bg-emerald-800 text-white px-4 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-900/20 hover:bg-emerald-900 transition-all"
          >
            REGISTER
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center bg-emerald-800 text-white relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        </div>

        <div className="z-10 flex flex-col items-center text-center px-6 max-w-4xl animate-fadeIn">
          <div className="mb-8 md:mb-12 scale-[1.5] md:scale-[2.5] transform">
             <CrikoLogo className="w-12 h-12 md:w-16 md:h-16" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-['Cinzel'] font-black mb-4 md:mb-6 leading-[1.1] tracking-tight uppercase">
            PLAY WITH<br />
            <span className="text-yellow-400">PRECISION.</span>
          </h1>

          <p className="max-w-xl text-sm md:text-xl font-medium text-emerald-100/80 leading-relaxed mt-2 md:mt-4">
            Namal University's official digital pitch. Master technical skills with AI-simulated match scenarios designed for the elite athlete.
          </p>

          <div className="mt-8 md:mt-12 w-full sm:w-auto">
             <button 
              onClick={onRegister}
              className="w-full sm:w-auto px-12 py-4 md:py-5 bg-white text-emerald-900 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm shadow-2xl hover:bg-emerald-50 transition-all"
             >
              Start Training Now
             </button>
          </div>
        </div>
      </main>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-2xl md:text-4xl font-['Cinzel'] font-black text-emerald-900 mb-4 uppercase tracking-tight">What is Namal Criko?</h2>
            <div className="w-16 md:w-20 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {[
              { title: 'AI SIMULATIONS', desc: 'Experience frame-by-frame analysis of world-class batting and bowling techniques.', icon: 'fa-microchip' },
              { title: 'STUDENT TRACKING', desc: 'Every session is recorded in your personal athlete profile. Monitor your growth.', icon: 'fa-chart-line' },
              { title: 'OFFICIAL DRILLS', desc: 'Access the official curriculum designed by university coaches and pro athletes.', icon: 'fa-graduation-cap' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[3rem] shadow-sm border border-gray-100">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-50 text-emerald-600 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl mb-6 md:mb-8">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3 className="text-xl md:text-2xl font-['Cinzel'] font-black text-emerald-950 mb-3 md:mb-4 tracking-tight uppercase leading-tight">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-emerald-950 py-12 md:py-16 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <CrikoLogo className="w-10 h-10 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-['Kanit'] font-black mb-4 uppercase tracking-widest">Ready to reach the crease?</h2>
          <p className="text-emerald-400/60 mb-8 md:mb-10 font-medium text-sm">Join 500+ Namal athletes mastering the game today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <button onClick={onRegister} className="w-full sm:w-auto px-10 py-4 bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs">Create Account</button>
            <button onClick={onLogin} className="w-full sm:w-auto px-10 py-4 border border-emerald-800 text-emerald-200 rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-emerald-900">Admin Login</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
