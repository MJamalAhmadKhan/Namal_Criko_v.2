
import React, { useState } from 'react';
import { Technique, Category, SubCategory } from '../types';

interface SimulationBrowserProps {
  techniques: Technique[];
  onSelect: (id: string) => void;
}

const SimulationBrowser: React.FC<SimulationBrowserProps> = ({ techniques, onSelect }) => {
  const [level1, setLevel1] = useState<Category | 'All'>('All');
  const [level2, setLevel2] = useState<string | 'All'>('All');
  const [search, setSearch] = useState('');

  const filtered = techniques.filter(t => 
    (level1 === 'All' || t.category === level1) &&
    (level2 === 'All' || t.subCategory === level2) &&
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const subCategories = Array.from(new Set(techniques.filter(t => level1 === 'All' || t.category === level1).map(t => t.subCategory)));

  return (
    <div className="space-y-10 animate-fadeIn">
      <header className="space-y-6">
        <div>
          <h1 className="text-3xl font-black text-emerald-900 tracking-tight">Professional Training Catalog</h1>
          <p className="text-gray-500 font-medium">SRS Hierarchical Navigation System (FR-009)</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="bg-white p-1 rounded-2xl border border-gray-100 shadow-sm flex">
            {['All', 'Batting', 'Bowling'].map((cat) => (
              <button key={cat} onClick={() => { setLevel1(cat as any); setLevel2('All'); }} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${level1 === cat ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-900'}`}>
                {cat}
              </button>
            ))}
          </div>
          
          <select value={level2} onChange={(e) => setLevel2(e.target.value)} className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-emerald-900 focus:ring-2 focus:ring-emerald-500 outline-none">
            <option value="All">All Sub-Categories</option>
            {subCategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
          </select>

          <div className="flex-1 w-full relative">
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"></i>
            <input type="text" placeholder="Search drills (e.g. 'Cover Drive')..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white border border-gray-100 pl-14 pr-6 py-4 rounded-2xl shadow-sm focus:ring-4 focus:ring-emerald-50 outline-none font-bold text-sm" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(tech => (
          <div 
            key={tech.id} 
            onClick={() => onSelect(tech.id)} 
            className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group flex flex-col relative overflow-hidden"
          >
            <div className="flex items-center space-x-2 mb-6">
              <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">{tech.category}</span>
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">{tech.subCategory}</span>
            </div>
            
            <h3 className="text-2xl font-black text-emerald-900 mb-2 group-hover:text-emerald-600 transition-colors leading-tight">{tech.name}</h3>
            <p className="text-xs text-gray-500 font-medium line-clamp-2 mb-8 flex-1 leading-relaxed">{tech.description}</p>
            
            <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
              <div className="flex items-center space-x-3">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                  tech.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  tech.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>
                  {tech.difficulty}
                </span>
              </div>
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all">
                <i className="fas fa-chevron-right text-xs"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimulationBrowser;
