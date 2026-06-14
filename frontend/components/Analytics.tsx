
import React from 'react';
import { UserStats, Technique } from '../types';

interface AnalyticsProps {
  stats: UserStats;
  techniques: Technique[];
}

const Analytics: React.FC<AnalyticsProps> = ({ stats, techniques }) => {
  const masteryPercentage = Math.round((stats.techniquesMastered.length / techniques.length) * 100) || 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-black text-gray-900">My Performance</h1>
        <p className="text-gray-500 font-medium">Detailed tracking of your cricket simulation progress.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
          <h2 className="text-xl font-bold flex items-center">
            <i className="fas fa-award mr-2 text-yellow-500"></i> Skill Mastery
          </h2>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-gray-100"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={502.4}
                  strokeDashoffset={502.4 - (502.4 * masteryPercentage) / 100}
                  className="text-emerald-500 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-gray-900">{masteryPercentage}%</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Completed</span>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8 w-full">
              <div className="text-center">
                <div className="text-2xl font-black text-gray-900">{stats.techniquesMastered.length}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">Techniques Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-gray-900">{techniques.length}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase">Total Catalog</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold flex items-center mb-6">
            <i className="fas fa-calendar-alt mr-2 text-blue-500"></i> Consistency Metrics
          </h2>
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-gray-600">Learning Streak</span>
                <span className="text-xl font-black text-emerald-600">{stats.streakDays} Days</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map(day => (
                  <div key={day} className={`flex-1 h-2 rounded-full ${day <= (stats.streakDays % 7 || 7) ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-600">Total Practice Time</span>
                <span className="text-xl font-black text-blue-600">{stats.timeSpentMinutes} Minutes</span>
              </div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                  <i className="fas fa-fire-alt text-xl"></i>
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-700 uppercase">Coach's Verdict</div>
                  <div className="text-sm font-bold text-emerald-900">Your form is improving! Focus on Attacking shots next.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
