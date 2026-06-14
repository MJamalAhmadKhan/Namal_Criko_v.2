import React, { useState } from 'react';
import { TopPlayer } from '../types';

interface TopPlayersProps {
  players: TopPlayer[];
  onBack: () => void;
}

type FilterRole = 'All' | 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';

const roleColors: Record<string, string> = {
  'Batsman':       'bg-blue-50 text-blue-700 border-blue-100',
  'Bowler':        'bg-red-50 text-red-700 border-red-100',
  'All-Rounder':   'bg-purple-50 text-purple-700 border-purple-100',
  'Wicket-Keeper': 'bg-amber-50 text-amber-700 border-amber-100',
};

const StatBadge = ({ label, value }: { label: string; value: number | string }) => (
  <div className="text-center">
    <div className="text-lg font-black text-emerald-950">{value}</div>
    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</div>
  </div>
);

const TopPlayers: React.FC<TopPlayersProps> = ({ players, onBack }) => {
  const [filter, setFilter] = useState<FilterRole>('All');
  const [selected, setSelected] = useState<TopPlayer | null>(null);
  const [search, setSearch] = useState('');

  const filtered = players.filter(p => {
    const roleMatch = filter === 'All' || p.role === filter;
    const searchMatch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.nationality.toLowerCase().includes(search.toLowerCase());
    return roleMatch && searchMatch;
  });

  // Sort by runs desc for batsmen, wickets for bowlers, else matches
  const sorted = [...filtered].sort((a, b) => {
    if (filter === 'Bowler') return b.stats.wickets - a.stats.wickets;
    if (filter === 'Batsman') return b.stats.runs - a.stats.runs;
    return b.stats.matches - a.stats.matches;
  });

  return (
    <div className="max-w-5xl mx-auto animate-fadeIn pb-20">
      <header className="mb-8">
        <button onClick={onBack} className="text-emerald-600 font-bold text-xs mb-3 flex items-center uppercase tracking-widest hover:text-emerald-700">
          <i className="fas fa-chevron-left mr-2"></i> Back
        </button>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center">
            <i className="fas fa-trophy text-emerald-950 text-xl"></i>
          </div>
          <div>
            <h1 className="text-4xl font-black text-emerald-950 tracking-tight">Top Players</h1>
            <p className="text-gray-500 font-medium">Professional cricket player profiles & statistics</p>
          </div>
        </div>
      </header>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"></i>
          <input type="text" placeholder="Search by name or nationality..."
            className="w-full pl-10 pr-4 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-sm"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['All', 'Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'] as FilterRole[]).map(r => (
            <button key={r} onClick={() => setFilter(r)}
              className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border ${filter === r ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-400 border-gray-100 hover:border-emerald-200'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Player count */}
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
        {sorted.length} player{sorted.length !== 1 ? 's' : ''} found
      </p>

      {/* Player Grid */}
      {sorted.length === 0 ? (
        <div className="text-center py-20 text-gray-300">
          <i className="fas fa-cricket-bat-ball text-5xl mb-4 block"></i>
          <p className="font-black text-lg">No players found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((player, idx) => (
            <div key={player.id}
              onClick={() => setSelected(player)}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer overflow-hidden group">
              {/* Card Header */}
              <div className="bg-emerald-950 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 text-[5rem] font-black text-white/5 leading-none pr-4 pt-2">
                  {idx + 1}
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-800 flex items-center justify-center text-2xl font-black text-yellow-400 border-2 border-emerald-700 flex-shrink-0">
                    {player.imageUrl
                      ? <img src={player.imageUrl} className="w-full h-full object-cover rounded-2xl" />
                      : player.name[0]}
                  </div>
                  <div>
                    <div className="font-black text-white text-lg leading-tight">{player.name}</div>
                    <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mt-0.5 flex items-center gap-1">
                      <i className="fas fa-flag text-[8px]"></i> {player.nationality}
                    </div>
                  </div>
                </div>
                <span className={`mt-3 inline-block text-[9px] font-black px-3 py-1 rounded-full border uppercase tracking-widest ${roleColors[player.role]}`}>
                  {player.role}
                </span>
              </div>
              {/* Stats */}
              <div className="p-6 grid grid-cols-3 gap-4 border-t border-gray-50">
                <StatBadge label="Matches" value={player.stats.matches} />
                <StatBadge label="Runs" value={player.stats.runs.toLocaleString()} />
                <StatBadge label="Wickets" value={player.stats.wickets} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Player Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] bg-emerald-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelected(null)}>
          <div className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl animate-scaleIn"
            onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-emerald-950 p-8 relative">
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white">
                <i className="fas fa-times text-lg"></i>
              </button>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-[1.5rem] bg-emerald-800 flex items-center justify-center text-3xl font-black text-yellow-400 border-2 border-emerald-700 flex-shrink-0">
                  {selected.imageUrl
                    ? <img src={selected.imageUrl} className="w-full h-full object-cover rounded-[1.5rem]" />
                    : selected.name[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">{selected.name}</h2>
                  <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mt-1">{selected.nationality} • Debut {selected.debutYear}</div>
                  <span className={`mt-2 inline-block text-[9px] font-black px-3 py-1 rounded-full border uppercase tracking-widest ${roleColors[selected.role]}`}>
                    {selected.role}
                  </span>
                </div>
              </div>
            </div>
            {/* Details */}
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Batting Style</div>
                  <div className="font-black text-emerald-950 mt-1">{selected.battingStyle}</div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Bowling Style</div>
                  <div className="font-black text-emerald-950 mt-1">{selected.bowlingStyle || '—'}</div>
                </div>
              </div>
              {/* Full Stats */}
              <div>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Career Statistics</h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { l: 'Matches',   v: selected.stats.matches },
                    { l: 'Runs',      v: selected.stats.runs.toLocaleString() },
                    { l: 'Average',   v: selected.stats.average },
                    { l: 'Centuries', v: selected.stats.centuries },
                    { l: 'Fifties',   v: selected.stats.fifties },
                    { l: 'Wickets',   v: selected.stats.wickets },
                    { l: 'Economy',   v: selected.stats.economy },
                  ].map(s => (
                    <div key={s.l} className="bg-emerald-50 rounded-2xl p-3 text-center border border-emerald-100">
                      <div className="text-xl font-black text-emerald-700">{s.v}</div>
                      <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPlayers;
