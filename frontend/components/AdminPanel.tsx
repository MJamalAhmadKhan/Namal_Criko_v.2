
import React, { useState } from 'react';
import { HelpTicket, UserStatus, CricketEvent, AppState, UserAccount, ActivityLog, TeamInfo, Technique, SimulationFrame } from '../types';
import Reports from './Reports';

interface AdminPanelProps {
  state: AppState;
  onUpdateStatus: (userId: string, status: UserStatus) => void;
  onDeleteUser: (userId: string) => void;
  onUpdateTicket: (id: string, status: HelpTicket['status'], response?: string) => void;
  onManageEvent: (e: Partial<CricketEvent>) => void;
  onDeleteEvent: (id: string) => void;
  onUpdateTeam: (data: Partial<TeamInfo>) => void;
  onManageTechnique: (tech: Partial<Technique>) => void;
  onDeleteTechnique: (id: string) => void;
  onUpdateInstitutes: (institutes: string[]) => void;
  onUpdateQuotes: (quotes: any[]) => void;
  onUpdateTopPlayers: (players: any[]) => void;
  simulationLogs: any[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  state, onUpdateStatus, onDeleteUser, onUpdateTicket, onManageEvent, onDeleteEvent, onUpdateTeam, onManageTechnique, onDeleteTechnique, onUpdateInstitutes, onUpdateQuotes, onUpdateTopPlayers, simulationLogs 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'simulations' | 'events' | 'tickets' | 'team' | 'reports' | 'institutes' | 'quotes' | 'players' | 'simlogs'>('overview');
  
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventForm, setEventForm] = useState<Partial<CricketEvent>>({
    title: '', type: 'Announcement', date: '', venue: 'Namal Campus', description: '', registrationLink: ''
  });

  const [showTechForm, setShowTechForm] = useState(false);
  const [techForm, setTechForm] = useState<Partial<Technique>>({
    name: '', category: 'Batting', subCategory: 'Attacking', difficulty: 'Beginner', description: '', frames: [], commonMistakes: []
  });

  const [teamForm, setTeamForm] = useState<TeamInfo>(state.teamInfo);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [ticketReply, setTicketReply] = useState('');

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onManageEvent(eventForm);
    setShowEventForm(false);
    setEventForm({ title: '', type: 'Announcement', date: '', venue: 'Namal Campus', description: '', registrationLink: '' });
  };

  const handleTechSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onManageTechnique(techForm);
    setShowTechForm(false);
    setTechForm({ name: '', category: 'Batting', subCategory: 'Attacking', difficulty: 'Beginner', description: '', frames: [], commonMistakes: [], videoUrl: '' });
  };

  const addFrame = () => {
    const newFrame: SimulationFrame = { id: 'f-' + Date.now(), description: '', keyPoints: [''] };
    setTechForm(prev => ({ ...prev, frames: [...(prev.frames || []), newFrame] }));
  };

  const updateFrame = (index: number, updates: Partial<SimulationFrame>) => {
    const frames = [...(techForm.frames || [])];
    frames[index] = { ...frames[index], ...updates };
    setTechForm(prev => ({ ...prev, frames }));
  };

  const removeFrame = (index: number) => {
    const frames = [...(techForm.frames || [])].filter((_, i) => i !== index);
    setTechForm(prev => ({ ...prev, frames }));
  };

  const addMistake = () => {
    const newMistake = { desc: '', correction: '' };
    setTechForm(prev => ({ ...prev, commonMistakes: [...(prev.commonMistakes || []), newMistake] }));
  };

  const updateMistake = (index: number, updates: { desc?: string; correction?: string; }) => {
    const commonMistakes = [...(techForm.commonMistakes || [])];
    commonMistakes[index] = { ...commonMistakes[index], ...updates };
    setTechForm(prev => ({ ...prev, commonMistakes }));
  };

  const removeMistake = (index: number) => {
    const commonMistakes = [...(techForm.commonMistakes || [])].filter((_, i) => i !== index);
    setTechForm(prev => ({ ...prev, commonMistakes }));
  };

  const handleTicketReply = (ticketId: string) => {
    onUpdateTicket(ticketId, 'Resolved', ticketReply);
    setReplyingTo(null);
    setTicketReply('');
  };

  const handleTeamUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTeam(teamForm);
    alert("Team information updated.");
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn pb-20">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-emerald-900 tracking-tight">Admin Control</h1>
          <p className="text-emerald-600/70 font-bold uppercase tracking-widest text-[8px] md:text-[10px] mt-1">Namal University Management</p>
        </div>
        
        <div className="flex bg-white p-1 md:p-1.5 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Dashboard', icon: 'fa-table-columns' },
            { id: 'approvals', label: 'Students', icon: 'fa-user-graduate' },
            { id: 'simulations', label: 'Drills', icon: 'fa-cricket-bat-ball' },
            { id: 'events', label: 'Board', icon: 'fa-bullhorn' },
            { id: 'tickets', label: 'Queries', icon: 'fa-headset' },
            { id: 'reports', label: 'Reports', icon: 'fa-file-invoice' },
            { id: 'team', label: 'Team', icon: 'fa-users' },
            { id: 'institutes', label: 'Institutes', icon: 'fa-university' },
            { id: 'quotes', label: 'Quotes', icon: 'fa-quote-left' },
            { id: 'players', label: 'Top Players', icon: 'fa-trophy' },
            { id: 'simlogs', label: 'Sim Logs', icon: 'fa-list-check' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-900'}`}>
              <i className={`fas ${tab.icon} mr-2`}></i> {tab.label}
            </button>
          ))}
        </div>
      </header>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Students', val: state.users.filter(u => u.role === 'Player').length, color: 'text-emerald-900' },
            { label: 'Simulations', val: state.techniques.length, color: 'text-emerald-600' },
            { label: 'Open Queries', val: state.tickets.filter(t => t.status !== 'Resolved').length, color: 'text-purple-600' },
            { label: 'Notice Board', val: state.events.length, color: 'text-blue-600' },
          ].map((s, idx) => (
            <div key={idx} className="bg-white p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-gray-100 shadow-sm">
               <div className={`text-xl md:text-3xl font-black ${s.color}`}>{s.val}</div>
               <div className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-black text-emerald-950 px-2">Student Directory</h2>
          <div className="hidden md:block bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-[10px] font-black text-emerald-900/40 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-6 text-left">Student Info</th>
                  <th className="px-6 py-6 text-left">Type / Institute</th>
                  <th className="px-6 py-6 text-left">Reg. No.</th>
                  <th className="px-8 py-6 text-left">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.users.filter(u => u.role === 'Player').map(u => (
                  <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/20 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center text-emerald-800 font-black">
                          {u.avatar ? <img src={u.avatar} className="w-full h-full object-cover" /> : u.name[0]}
                        </div>
                        <div>
                          <div className="font-black text-emerald-950">{u.name}</div>
                          <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">{(u as any).userType || 'Student'}</div>
                      <div className="text-[10px] text-gray-400 font-medium mt-0.5">{(u as any).instituteName || '—'}</div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-xs font-bold text-gray-600">{u.rollNo || '—'}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[8px] font-black px-2.5 py-1 rounded uppercase ${u.status === 'Active' ? 'bg-green-50 text-green-600' : u.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>{u.status}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end space-x-4">
                        {u.status === 'Pending' && <button onClick={() => onUpdateStatus(u.id, 'Active')} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Approve</button>}
                        {u.status === 'Active' && <button onClick={() => onUpdateStatus(u.id, 'Suspended')} className="text-[10px] font-black text-amber-600 uppercase tracking-widest hover:underline">Suspend</button>}
                        {u.status === 'Suspended' && <button onClick={() => onUpdateStatus(u.id, 'Active')} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Restore</button>}
                        <button onClick={() => onDeleteUser(u.id)} className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'simulations' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl md:text-2xl font-black text-emerald-950">Simulation Management</h2>
            <button onClick={() => { setTechForm({ name: '', category: 'Batting', subCategory: 'Attacking', difficulty: 'Beginner', description: '', frames: [], commonMistakes: [], videoUrl: '' }); setShowTechForm(!showTechForm); }} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">{showTechForm ? 'Cancel' : 'Add New Simulation'}</button>
          </div>
          {showTechForm && (
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-emerald-100 shadow-xl animate-scaleIn">
              <h3 className="text-xl font-black text-emerald-950 mb-8">{techForm.id ? 'Edit Simulation' : 'Create New Simulation'}</h3>
              <form onSubmit={handleTechSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Technique Name</label><input type="text" required className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl outline-none font-bold" value={techForm.name} onChange={e => setTechForm({...techForm, name: e.target.value})} /></div>
                  <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Duration (seconds)</label><input type="number" required min="1" className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl outline-none font-bold" value={techForm.duration || 120} onChange={e => setTechForm({...techForm, duration: Number(e.target.value)})} /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Category</label><select className="w-full bg-gray-50 border border-gray-100 px-4 py-4 rounded-2xl outline-none font-bold text-xs" value={techForm.category} onChange={e => setTechForm({...techForm, category: e.target.value as any})}><option value="Batting">Batting</option><option value="Bowling">Bowling</option></select></div>
                  <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Sub-Category</label><select className="w-full bg-gray-50 border border-gray-100 px-4 py-4 rounded-2xl outline-none font-bold text-xs" value={techForm.subCategory} onChange={e => setTechForm({...techForm, subCategory: e.target.value as any})}><option value="Attacking">Attacking</option><option value="Defensive">Defensive</option><option value="Fast">Fast</option><option value="Spin">Spin</option><option value="Medium-Pace">Medium-Pace</option></select></div>
                  <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Difficulty</label><select className="w-full bg-gray-50 border border-gray-100 px-4 py-4 rounded-2xl outline-none font-bold text-xs" value={techForm.difficulty} onChange={e => setTechForm({...techForm, difficulty: e.target.value as any})}><option value="Beginner">Beginner</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option></select></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Asset Type</label>
                    <select className="w-full bg-gray-50 border border-gray-100 px-4 py-4 rounded-2xl outline-none font-bold text-xs" value={techForm.assetType || 'Video'} onChange={e => setTechForm({...techForm, assetType: e.target.value as any})}>
                      <option value="Video">Video (YouTube/Embedded Link)</option>
                      <option value="Image">Image (Local Store/URL Address)</option>
                      <option value="Text">Text Description</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Asset URL or Address</label>
                    <input type="text" placeholder="e.g. https://www.youtube.com/embed/5_mco2rI6xI or /assets/drill1.png" className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl outline-none font-bold" value={techForm.assetUrl || techForm.videoUrl || ''} onChange={e => setTechForm({...techForm, assetUrl: e.target.value, videoUrl: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Full Description</label><textarea required className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl outline-none font-bold h-24 resize-none" value={techForm.description} onChange={e => setTechForm({...techForm, description: e.target.value})} /></div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center px-2"><h4 className="text-xs font-black text-emerald-950 uppercase tracking-widest">Frame Sequence</h4><button type="button" onClick={addFrame} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">+ Add Frame</button></div>
                  <div className="space-y-4">
                    {techForm.frames?.map((frame, idx) => (
                      <div key={frame.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6 relative"><button type="button" onClick={() => removeFrame(idx)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500"><i className="fas fa-times-circle"></i></button><div className="flex-1 space-y-2"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-2">Frame {idx + 1} Description</label><input type="text" className="w-full bg-white border border-gray-100 px-4 py-3 rounded-xl font-bold text-sm" value={frame.description} onChange={e => updateFrame(idx, { description: e.target.value })} /></div><div className="flex-1 space-y-2"><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-2">Key Focus Points</label><input type="text" className="w-full bg-white border border-gray-100 px-4 py-3 rounded-xl font-bold text-sm" value={frame.keyPoints.join(', ')} onChange={e => updateFrame(idx, { keyPoints: e.target.value.split(',').map(s => s.trim()) })} /></div></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center px-2"><h4 className="text-xs font-black text-emerald-950 uppercase tracking-widest">Common Mistakes & Corrections</h4><button type="button" onClick={addMistake} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">+ Add Mistake</button></div>
                  <div className="space-y-4">
                    {techForm.commonMistakes?.map((mistake, idx) => (
                      <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6 relative">
                        <button type="button" onClick={() => removeMistake(idx)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500">
                          <i className="fas fa-times-circle"></i>
                        </button>
                        <div className="flex-1 space-y-2">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-2">Mistake {idx + 1} Description</label>
                          <input type="text" required placeholder="e.g. Hard hands at impact" className="w-full bg-white border border-gray-100 px-4 py-3 rounded-xl font-bold text-sm" value={mistake.desc || ''} onChange={e => updateMistake(idx, { desc: e.target.value })} />
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-2">Correction Description</label>
                          <input type="text" required placeholder="e.g. Keep your hands soft and let the ball hit the bat" className="w-full bg-white border border-gray-100 px-4 py-3 rounded-xl font-bold text-sm" value={mistake.correction || ''} onChange={e => updateMistake(idx, { correction: e.target.value })} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button type="submit" className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">{techForm.id ? 'Save Changes' : 'Publish Simulation'}</button>
              </form>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.techniques.map(tech => (
              <div key={tech.id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm group hover:shadow-xl transition-all"><div className="flex justify-between items-start mb-6"><div className="flex gap-2"><span className="text-[9px] font-black bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg uppercase">{tech.category}</span><span className="text-[9px] font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-lg uppercase">{tech.difficulty}</span></div><div className="flex gap-3"><button onClick={() => { setTechForm(tech); setShowTechForm(true); }} className="text-emerald-300 hover:text-emerald-600"><i className="fas fa-edit"></i></button><button onClick={() => onDeleteTechnique(tech.id)} className="text-gray-200 hover:text-red-500"><i className="fas fa-trash"></i></button></div></div><h3 className="font-black text-emerald-950 text-lg mb-2">{tech.name}</h3><p className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest">{tech.frames.length} Sequence Frames</p><p className="text-[11px] text-gray-500 font-medium line-clamp-2 leading-relaxed">{tech.description}</p></div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center px-2"><h2 className="text-xl md:text-2xl font-black text-emerald-950">Notice Board</h2><button onClick={() => setShowEventForm(!showEventForm)} className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">{showEventForm ? 'Cancel' : 'Add New Entry'}</button></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{state.events.map(event => (<div key={event.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col"><div className="flex justify-between items-start mb-4"><span className="text-[9px] font-black bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg uppercase">{event.type}</span><button onClick={() => onDeleteEvent(event.id)} className="text-gray-300 hover:text-red-500"><i className="fas fa-trash"></i></button></div><h3 className="font-black text-emerald-950 text-base mb-1">{event.title}</h3><p className="text-xs text-gray-500 line-clamp-2">{event.description}</p></div>))}</div>
        </div>
      )}
      
      {activeTab === 'tickets' && (<div className="space-y-4">{state.tickets.map(ticket => (<div key={ticket.id} className="bg-white p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm"><div className="flex justify-between items-start mb-2"><span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">QUERY #{ticket.id}</span><span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${ticket.status === 'Resolved' ? 'bg-green-50 text-green-600' : 'bg-purple-50 text-purple-600'}`}>{ticket.status}</span></div><h3 className="font-black text-emerald-950 text-sm md:text-base">{ticket.subject}</h3><p className="text-[11px] md:text-xs text-gray-500 font-medium mt-2 mb-4">{ticket.description}</p></div>))}</div>)}

      {activeTab === 'reports' && (
        <div className="animate-fadeIn bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm">
          <Reports state={state} onBack={() => setActiveTab('overview')} />
        </div>
      )}

      {activeTab === 'team' && (
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h2 className="text-xl font-black text-emerald-950 mb-8">University Team Information</h2>
          <form onSubmit={handleTeamUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Lead Coach Name</label><input type="text" className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl outline-none font-bold" value={teamForm.leadCoach} onChange={e => setTeamForm({...teamForm, leadCoach: e.target.value})} /></div>
            <div className="space-y-2"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Support Desk Lead</label><input type="text" className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl outline-none font-bold" value={teamForm.supportLead} onChange={e => setTeamForm({...teamForm, supportLead: e.target.value})} /></div>
            <button type="submit" className="md:col-span-2 py-5 bg-emerald-950 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">Update Official Info</button>
          </form>
        </div>
      )}
      {activeTab === 'institutes' && (
        <InstituteManager institutes={state.institutes} onUpdate={onUpdateInstitutes} />
      )}
      {activeTab === 'quotes' && (
        <QuoteManager quotes={(state as any).quotes || []} onUpdate={onUpdateQuotes} />
      )}
      {activeTab === 'players' && (
        <TopPlayerManager players={(state as any).topPlayers || []} onUpdate={onUpdateTopPlayers} />
      )}
      {activeTab === 'simlogs' && (
        <SimLogsViewer logs={simulationLogs} />
      )}
    </div>
  );
};

// -- Institute Manager Sub-Component
const InstituteManager: React.FC<{ institutes: string[]; onUpdate: (list: string[]) => void }> = ({ institutes, onUpdate }) => {
  const [newName, setNewName] = React.useState('');
  const [editing, setEditing] = React.useState<{ idx: number; val: string } | null>(null);

  const add = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    if (institutes.includes(trimmed)) { alert('Institute already exists'); return; }
    onUpdate([...institutes, trimmed]);
    setNewName('');
  };

  const remove = (idx: number) => {
    if (!window.confirm('Remove this institute from the registration list?')) return;
    onUpdate(institutes.filter((_, i) => i !== idx));
  };

  const saveEdit = () => {
    if (!editing || !editing.val.trim()) return;
    const updated = [...institutes];
    updated[editing.idx] = editing.val.trim();
    onUpdate(updated);
    setEditing(null);
  };

  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-emerald-950">Institute List</h2>
          <p className="text-xs text-gray-400 font-medium mt-1">These appear in the student registration dropdown</p>
        </div>
        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">{institutes.length} Institutes</span>
      </div>
      <div className="flex gap-3">
        <input type="text" value={newName} onChange={e => setNewName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Type institute name and press Enter or Add"
          className="flex-1 bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950 text-sm" />
        <button onClick={add} className="px-6 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all">
          <i className="fas fa-plus mr-2"></i>Add
        </button>
      </div>
      <div className="space-y-3">
        {institutes.map((inst, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            {editing?.idx === idx ? (
              <>
                <input autoFocus value={editing.val} onChange={e => setEditing({ idx, val: e.target.value })}
                  onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') setEditing(null); }}
                  className="flex-1 bg-white border border-emerald-200 px-4 py-2 rounded-xl outline-none font-bold text-emerald-950 text-sm" />
                <button onClick={saveEdit} className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase">Save</button>
                <button onClick={() => setEditing(null)} className="px-4 py-2 bg-gray-200 text-gray-600 rounded-xl font-black text-[10px] uppercase">Cancel</button>
              </>
            ) : (
              <>
                <i className="fas fa-university text-emerald-500 w-5"></i>
                <span className="flex-1 font-bold text-emerald-950 text-sm">{inst}</span>
                <button onClick={() => setEditing({ idx, val: inst })} className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-emerald-600 transition-colors">
                  <i className="fas fa-pencil text-xs"></i>
                </button>
                <button onClick={() => remove(idx)} className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors">
                  <i className="fas fa-trash text-xs"></i>
                </button>
              </>
            )}
          </div>
        ))}
        {institutes.length === 0 && (
          <div className="text-center py-10 text-gray-300">
            <i className="fas fa-university text-4xl mb-3 block"></i>
            <p className="font-bold text-sm">No institutes added yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Quote Manager ─────────────────────────────────────────────────────────
const QuoteManager: React.FC<{ quotes: any[]; onUpdate: (q: any[]) => void }> = ({ quotes, onUpdate }) => {
  const [form, setForm] = React.useState({ text: '', author: '', category: 'GENERAL' as any });
  const add = () => {
    if (!form.text.trim() || !form.author.trim()) return;
    onUpdate([...quotes, { id: 'q-'+Date.now(), ...form, isActive: true }]);
    setForm({ text: '', author: '', category: 'GENERAL' });
  };
  const toggle = (id: string) => onUpdate(quotes.map(q => q.id === id ? { ...q, isActive: !q.isActive } : q));
  const remove = (id: string) => { if (window.confirm('Delete this quote?')) onUpdate(quotes.filter(q => q.id !== id)); };
  const catColors: Record<string,string> = { BATTING:'bg-blue-50 text-blue-700', BOWLING:'bg-red-50 text-red-700', GENERAL:'bg-emerald-50 text-emerald-700', MINDSET:'bg-purple-50 text-purple-700' };
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-black text-emerald-950">Quote of the Day</h2><p className="text-xs text-gray-400 mt-1">Shown to players on login — one per day, rotating</p></div>
        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">{quotes.filter(q=>q.isActive).length} Active</span>
      </div>
      <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Add New Quote</p>
        <textarea rows={2} placeholder="Quote text..." value={form.text} onChange={e => setForm(p=>({...p,text:e.target.value}))}
          className="w-full bg-white border border-gray-100 px-4 py-3 rounded-xl outline-none font-bold text-sm resize-none" />
        <div className="flex gap-3">
          <input type="text" placeholder="Author" value={form.author} onChange={e => setForm(p=>({...p,author:e.target.value}))}
            className="flex-1 bg-white border border-gray-100 px-4 py-3 rounded-xl outline-none font-bold text-sm" />
          <select value={form.category} onChange={e => setForm(p=>({...p,category:e.target.value as any}))}
            className="bg-white border border-gray-100 px-4 py-3 rounded-xl outline-none font-bold text-sm">
            {['BATTING','BOWLING','GENERAL','MINDSET'].map(c=><option key={c}>{c}</option>)}
          </select>
          <button onClick={add} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700">Add</button>
        </div>
      </div>
      <div className="space-y-3">
        {quotes.map(q => (
          <div key={q.id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${q.isActive ? 'bg-white border-gray-100' : 'bg-gray-50 border-gray-50 opacity-50'}`}>
            <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest whitespace-nowrap ${catColors[q.category]}`}>{q.category}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-emerald-950 text-sm leading-snug">"{q.text}"</p>
              <p className="text-[10px] text-gray-400 font-bold mt-1">— {q.author}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => toggle(q.id)} className={`w-8 h-8 flex items-center justify-center rounded-xl text-xs transition-colors ${q.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                <i className={`fas ${q.isActive ? 'fa-eye' : 'fa-eye-slash'}`}></i>
              </button>
              <button onClick={() => remove(q.id)} className="w-8 h-8 flex items-center justify-center rounded-xl text-xs text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        {quotes.length === 0 && <div className="text-center py-10 text-gray-300"><i className="fas fa-quote-left text-3xl mb-2 block"></i><p className="font-bold text-sm">No quotes yet</p></div>}
      </div>
    </div>
  );
};

// ── Top Player Manager ─────────────────────────────────────────────────────
const TopPlayerManager: React.FC<{ players: any[]; onUpdate: (p: any[]) => void }> = ({ players, onUpdate }) => {
  const [form, setForm] = React.useState({
    name: '',
    nationality: '',
    role: 'Batsman' as 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper',
    style: 'Right_Hand' as 'Left_Hand' | 'Right_Hand' | 'Spin' | 'Fast',
    biography: '',
    matches: 0,
    runs: 0,
    fifties: 0,
    centuries: 0,
    wickets: 0,
    bowlingAverage: 0.0
  });

  const set = (f: string, v: any) => setForm(p => ({ ...p, [f]: v }));
  
  const add = () => {
    if (!form.name.trim() || !form.nationality.trim()) return;
    
    onUpdate([...players, {
      id: 'pl-' + Date.now(),
      name: form.name,
      nationality: form.nationality,
      role: form.role,
      style: form.style,
      biography: form.biography,
      matches: Number(form.matches),
      stats: {
        matches: Number(form.matches),
        runs: Number(form.runs),
        centuries: Number(form.centuries),
        fifties: Number(form.fifties),
        wickets: Number(form.wickets),
        economy: Number(form.bowlingAverage),
        average: Number(form.matches) > 0 ? Number(form.runs) / Number(form.matches) : 0
      }
    }]);

    setForm({
      name: '',
      nationality: '',
      role: 'Batsman',
      style: 'Right_Hand',
      biography: '',
      matches: 0,
      runs: 0,
      fifties: 0,
      centuries: 0,
      wickets: 0,
      bowlingAverage: 0.0
    });
  };

  const remove = (id: string) => { 
    if (window.confirm('Remove this player?')) onUpdate(players.filter(p => p.id !== id)); 
  };

  const isBatsman = form.role === 'Batsman' || form.role === 'All-Rounder' || form.role === 'Wicket-Keeper';
  const isBowler = form.role === 'Bowler' || form.role === 'All-Rounder';

  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-emerald-950">Top Players</h2>
          <p className="text-xs text-gray-400 mt-1">Professional player profiles shown in the leaderboard</p>
        </div>
        <span className="bg-yellow-50 text-yellow-700 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">{players.length} Players</span>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Add New Player</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase pl-1">Name</label>
            <input type="text" value={form.name} onChange={e => set('name', e.target.value)} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl outline-none font-bold text-sm mt-1" />
          </div>
          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase pl-1">Nationality</label>
            <input type="text" value={form.nationality} onChange={e => set('nationality', e.target.value)} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl outline-none font-bold text-sm mt-1" />
          </div>
          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase pl-1">Role</label>
            <select value={form.role} onChange={e => set('role', e.target.value)} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl outline-none font-bold text-sm mt-1">
              {['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase pl-1">Style</label>
            <select value={form.style} onChange={e => set('style', e.target.value)} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl outline-none font-bold text-sm mt-1">
              <option value="Right_Hand">Right Hand</option>
              <option value="Left_Hand">Left Hand</option>
              <option value="Spin">Spin</option>
              <option value="Fast">Fast</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase pl-1">Matches Played</label>
            <input type="number" value={form.matches} onChange={e => set('matches', Number(e.target.value))} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl outline-none font-bold text-sm mt-1" />
          </div>
        </div>

        <div>
          <label className="text-[9px] font-black text-gray-400 uppercase pl-1">Biography</label>
          <textarea rows={2} value={form.biography} onChange={e => set('biography', e.target.value)} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl outline-none font-bold text-sm mt-1 resize-none" placeholder="Player biography details..." />
        </div>

        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest pt-2">Career Stats</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase pl-1">Runs Scored</label>
            <input type="number" disabled={!isBatsman} value={form.runs} onChange={e => set('runs', Number(e.target.value))} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl outline-none font-bold text-sm mt-1 disabled:bg-gray-100 disabled:text-gray-400" />
          </div>
          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase pl-1">Fifties</label>
            <input type="number" disabled={!isBatsman} value={form.fifties} onChange={e => set('fifties', Number(e.target.value))} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl outline-none font-bold text-sm mt-1 disabled:bg-gray-100 disabled:text-gray-400" />
          </div>
          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase pl-1">Centuries</label>
            <input type="number" disabled={!isBatsman} value={form.centuries} onChange={e => set('centuries', Number(e.target.value))} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl outline-none font-bold text-sm mt-1 disabled:bg-gray-100 disabled:text-gray-400" />
          </div>
          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase pl-1">Wickets Taken</label>
            <input type="number" disabled={!isBowler} value={form.wickets} onChange={e => set('wickets', Number(e.target.value))} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl outline-none font-bold text-sm mt-1 disabled:bg-gray-100 disabled:text-gray-400" />
          </div>
          <div>
            <label className="text-[9px] font-black text-gray-400 uppercase pl-1">Bowling Average</label>
            <input type="number" step="0.01" disabled={!isBowler} value={form.bowlingAverage} onChange={e => set('bowlingAverage', Number(e.target.value))} className="w-full bg-white border border-gray-100 px-3 py-2 rounded-xl outline-none font-bold text-sm mt-1 disabled:bg-gray-100 disabled:text-gray-400" />
          </div>
        </div>

        <button onClick={add} className="w-full py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700">Add Player</button>
      </div>

      <div className="space-y-3">
        {players.map(p => (
          <div key={p.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center text-yellow-400 font-black text-lg flex-shrink-0">{p.name[0]}</div>
            <div className="flex-1">
              <div className="font-black text-emerald-950">{p.name}</div>
              <div className="text-[10px] text-gray-400 font-bold">{p.nationality} · {p.role} · {p.style ? p.style.replace('_', ' ') : ''}</div>
            </div>
            <div className="text-xs text-gray-400 font-bold hidden md:block">
              {p.stats.runs || 0} runs · {p.stats.wickets || 0} wkts
            </div>
            <button onClick={() => remove(p.id)} className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
              <i className="fas fa-trash text-xs"></i>
            </button>
          </div>
        ))}
        {players.length === 0 && <div className="text-center py-10 text-gray-300"><i className="fas fa-trophy text-3xl mb-2 block"></i><p className="font-bold text-sm">No players added yet</p></div>}
      </div>
    </div>
  );
};

// ── Simulation Logs Viewer ────────────────────────────────────────────────
const SimLogsViewer: React.FC<{ logs: any[] }> = ({ logs }) => (
  <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
    <div className="flex items-center justify-between">
      <div><h2 className="text-xl font-black text-emerald-950">Simulation Access Logs</h2><p className="text-xs text-gray-400 mt-1">Every technique viewed by players</p></div>
      <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">{logs.length} Entries</span>
    </div>
    {logs.length === 0 ? (
      <div className="text-center py-20 text-gray-300"><i className="fas fa-list-check text-4xl mb-3 block"></i><p className="font-bold">No logs yet — players need to view techniques</p></div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <tr>
              <th className="px-4 py-3 rounded-tl-xl">Technique</th>
              <th className="px-4 py-3">User ID</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Completed</th>
              <th className="px-4 py-3 rounded-tr-xl">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l=>(
              <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="px-4 py-3 font-bold text-emerald-950 text-sm">{l.techniqueName}</td>
                <td className="px-4 py-3 text-xs text-gray-400 font-mono">{l.userId.slice(0,12)}...</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-600">{l.durationSeconds}s</td>
                <td className="px-4 py-3">
                  <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase ${l.completed?'bg-green-50 text-green-600':'bg-gray-100 text-gray-400'}`}>
                    {l.completed?'Yes':'No'}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{new Date(l.startedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default AdminPanel;
