
import React from 'react';
import { TeamInfo } from '../types';

interface TeamPageProps {
  team: TeamInfo;
  onBack: () => void;
}

const TeamPage: React.FC<TeamPageProps> = ({ team, onBack }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-fadeIn pb-24">
      <header className="text-center space-y-4">
        <button onClick={onBack} className="text-emerald-600 font-black text-xs uppercase tracking-[0.2em] mb-4 hover:scale-110 transition-transform">
          <i className="fas fa-chevron-left mr-2"></i> Dashboard
        </button>
        <h1 className="text-5xl md:text-6xl font-black text-emerald-950 tracking-tighter">About Our Team</h1>
        <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">Namal Criko is powered by the expertise of Namal University's elite coaching department and technical staff.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-xl space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-emerald-50 text-8xl transition-transform group-hover:scale-110">
            <i className="fas fa-user-tie"></i>
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-4 block">Leadership</span>
            <h3 className="text-3xl font-black text-emerald-950 mb-2">Lead Coach</h3>
            <p className="text-xl font-bold text-gray-700">{team.leadCoach}</p>
            <div className="w-16 h-1.5 bg-emerald-600 rounded-full mt-6"></div>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-xl space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-blue-50 text-8xl transition-transform group-hover:scale-110">
            <i className="fas fa-headset"></i>
          </div>
          <div className="relative z-10">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4 block">Operations</span>
            <h3 className="text-3xl font-black text-emerald-950 mb-2">Support Lead</h3>
            <p className="text-xl font-bold text-gray-700">{team.supportLead}</p>
            <div className="w-16 h-1.5 bg-blue-600 rounded-full mt-6"></div>
          </div>
        </div>
      </div>

      <section className="bg-emerald-950 rounded-[4rem] p-16 text-white shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          <div>
            <h3 className="text-2xl font-black mb-8 text-yellow-400 uppercase tracking-widest text-sm">Contact Details</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <div className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest">Email Us</div>
                  <div className="font-bold">{team.officeEmail}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <div className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest">Phone Extension</div>
                  <div className="font-bold">{team.officePhone}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-2xl font-black mb-8 text-yellow-400 uppercase tracking-widest text-sm">Visit the Sports Wing</h3>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400 flex-shrink-0">
                <i className="fas fa-location-dot"></i>
              </div>
              <div>
                <div className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest">Location</div>
                <div className="text-xl font-bold leading-relaxed">{team.officeLocation}</div>
              </div>
            </div>
            <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10 text-emerald-100/60 italic text-sm font-medium">
              "Dedicated to bringing the latest sports science and simulation technologies to the student-athletes of Namal University."
            </div>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 text-[20rem] text-white opacity-[0.03] rotate-12 pointer-events-none">
          <i className="fas fa-cricket-bat-ball"></i>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
