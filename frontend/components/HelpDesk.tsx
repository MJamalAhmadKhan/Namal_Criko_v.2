
import React, { useState } from 'react';
import { HelpTicket, UserAccount, FAQ } from '../types';

interface HelpDeskProps {
  user: UserAccount;
  tickets: HelpTicket[];
  faqs: FAQ[];
  onSubmit: (t: Omit<HelpTicket, 'id' | 'userId' | 'userName' | 'status' | 'createdAt'>) => void;
  onUpdateTicket: (id: string, status: HelpTicket['status'], response?: string) => void;
  onManageFAQ: (faq: Partial<FAQ>) => void;
  onDeleteFAQ: (id: string) => void;
  onBack: () => void;
}

const HelpDesk: React.FC<HelpDeskProps> = ({ user, tickets, faqs, onSubmit, onUpdateTicket, onManageFAQ, onDeleteFAQ, onBack }) => {
  const isAdmin = user.role === 'Admin';
  const [activeTab, setActiveTab] = useState<'tickets' | 'faqs' | 'submit'>(isAdmin ? 'tickets' : 'tickets');
  const [ticketFilter, setTicketFilter] = useState({ category: 'All', status: 'All' });
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [faqForm, setFaqForm] = useState<Partial<FAQ>>({ question: '', answer: '' });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [ticketReply, setTicketReply] = useState('');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [form, setForm] = useState({ subject: '', category: 'Technical' as HelpTicket['category'], description: '' });

  const filteredTickets = tickets.filter(t => 
    (ticketFilter.category === 'All' || t.category === ticketFilter.category) &&
    (ticketFilter.status === 'All' || t.status === ticketFilter.status)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject || !form.description) return;
    onSubmit(form);
    setForm({ subject: '', category: 'Technical', description: '' });
    setActiveTab('tickets');
  };

  const handleFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onManageFAQ(faqForm);
    setFaqForm({ question: '', answer: '' });
    setShowFaqForm(false);
  };

  const handleTicketResolve = (id: string) => {
    onUpdateTicket(id, 'Resolved', ticketReply);
    setReplyingTo(null);
    setTicketReply('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 animate-fadeIn pb-20">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <button onClick={onBack} className="text-emerald-600 font-bold text-xs mb-3 flex items-center uppercase tracking-widest hover:text-emerald-700">
            <i className="fas fa-chevron-left mr-2"></i> Dashboard
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-emerald-950 tracking-tight">
            {isAdmin ? 'University Help Desk Management' : 'Help & Support Portal'}
          </h1>
          <p className="text-gray-500 font-medium">{isAdmin ? 'Monitor user requests and manage support content.' : 'Get technical assistance and platform guidance.'}</p>
        </div>

        <div className="flex bg-white p-1.5 rounded-[2rem] border border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
          <button onClick={() => setActiveTab('tickets')} className={`px-6 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'tickets' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-900'}`}>
            <i className="fas fa-ticket-alt mr-2"></i> {isAdmin ? 'User Tickets' : 'My Requests'}
          </button>
          <button onClick={() => setActiveTab('faqs')} className={`px-6 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'faqs' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-900'}`}>
            <i className="fas fa-lightbulb mr-2"></i> {isAdmin ? 'FAQ Manager' : 'Quick Guides'}
          </button>
          {!isAdmin && (
            <button onClick={() => setActiveTab('submit')} className={`px-6 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'submit' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-emerald-900'}`}>
              <i className="fas fa-plus-circle mr-2"></i> New Ticket
            </button>
          )}
        </div>
      </header>

      {activeTab === 'tickets' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <div className="flex items-center space-x-6">
               <div className="text-center border-r border-gray-50 pr-6">
                 <div className="text-2xl font-black text-emerald-950">{filteredTickets.length}</div>
                 <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Showing</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-black text-amber-600">{filteredTickets.filter(t => t.status !== 'Resolved').length}</div>
                 <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Active</div>
               </div>
             </div>
             
             <div className="flex flex-wrap gap-3 w-full md:w-auto">
               <select className="flex-1 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none" value={ticketFilter.category} onChange={e => setTicketFilter({...ticketFilter, category: e.target.value})}>
                 <option value="All">All Categories</option>
                 <option value="Technical">Technical</option>
                 <option value="Content">Content</option>
                 <option value="Account">Account</option>
               </select>
               <select className="flex-1 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none" value={ticketFilter.status} onChange={e => setTicketFilter({...ticketFilter, status: e.target.value})}>
                 <option value="All">All Status</option>
                 <option value="Open">Open</option>
                 <option value="In Progress">In Progress</option>
                 <option value="Resolved">Resolved</option>
               </select>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTickets.map(ticket => (
              <div key={ticket.id} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
                <div className={`absolute left-0 top-0 bottom-0 w-2.5 ${
                  ticket.status === 'Resolved' ? 'bg-green-500' :
                  ticket.status === 'In Progress' ? 'bg-blue-500' : 'bg-amber-500'
                }`}></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">ID: {ticket.id}</span>
                    <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                      ticket.status === 'Resolved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                    }`}>{ticket.status}</span>
                  </div>
                  <span className="text-[9px] font-bold text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                </div>

                <h4 className="text-lg font-black text-emerald-950 mb-1">{ticket.subject}</h4>
                <div className="flex items-center space-x-2 text-[9px] font-black text-emerald-600/50 uppercase tracking-widest mb-4">
                  <span>{ticket.userName}</span>
                  <span>•</span>
                  <span>{ticket.category}</span>
                </div>
                <p className="text-xs text-gray-500 font-medium mb-8 leading-relaxed line-clamp-3">{ticket.description}</p>
                
                {isAdmin && ticket.status !== 'Resolved' && (
                  <div className="pt-4 border-t border-gray-50">
                    {replyingTo === ticket.id ? (
                      <div className="space-y-3 animate-fadeIn">
                        <textarea className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-xs font-bold h-20 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Type resolution details..." value={ticketReply} onChange={e => setTicketReply(e.target.value)} />
                        <div className="flex space-x-2">
                          <button onClick={() => handleTicketResolve(ticket.id)} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg">Confirm Resolution</button>
                          <button onClick={() => setReplyingTo(null)} className="px-4 py-3 bg-gray-100 text-gray-400 rounded-xl font-black text-[9px] uppercase tracking-widest">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setReplyingTo(ticket.id)} className="w-full py-3 bg-gray-50 text-emerald-600 rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">Resolve Request</button>
                    )}
                  </div>
                )}

                {ticket.adminResponse && (
                  <div className="mt-4 p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100/30">
                    <h5 className="text-[9px] font-black text-emerald-800 uppercase tracking-widest mb-1 flex items-center">
                      <i className="fas fa-shield-alt mr-2"></i> Resolution Statement
                    </h5>
                    <p className="text-xs text-emerald-950 font-bold italic">"{ticket.adminResponse}"</p>
                  </div>
                )}
              </div>
            ))}
            {filteredTickets.length === 0 && (
              <div className="md:col-span-2 text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-100">
                <i className="fas fa-inbox text-4xl text-gray-200 mb-4"></i>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No queries found in this category.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'faqs' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center px-4 mb-4">
              <h3 className="text-xl font-black text-emerald-950 uppercase tracking-tight">Active Knowledge Base</h3>
              {isAdmin && (
                <button onClick={() => { setFaqForm({ question: '', answer: '' }); setShowFaqForm(true); }} className="text-emerald-600 font-black text-[10px] uppercase tracking-widest hover:underline">+ New FAQ</button>
              )}
            </div>
            
            <div className="space-y-4">
              {faqs.map(faq => (
                <div key={faq.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden transition-all group">
                  <div className="flex items-center justify-between p-6 md:p-8">
                    <button onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)} className="flex items-center space-x-6 flex-1 text-left">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm transition-all ${activeFaq === faq.id ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                        <i className="fas fa-question"></i>
                      </div>
                      <span className="font-black text-emerald-950 text-sm md:text-base pr-4">{faq.question}</span>
                    </button>
                    {isAdmin && (
                      <div className="flex items-center space-x-3">
                        <button onClick={() => { setFaqForm(faq); setShowFaqForm(true); }} className="text-gray-300 hover:text-emerald-600"><i className="fas fa-edit"></i></button>
                        <button onClick={() => onDeleteFAQ(faq.id)} className="text-gray-300 hover:text-red-500"><i className="fas fa-trash"></i></button>
                      </div>
                    )}
                  </div>
                  {activeFaq === faq.id && (
                    <div className="px-24 pb-10 animate-fadeIn">
                       <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed border-l-2 border-emerald-100 pl-6 italic">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-950 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
               <h3 className="text-xl font-black mb-4">Support Guidelines</h3>
               <p className="text-emerald-100/50 text-xs font-medium mb-8 leading-relaxed">Please check the FAQs before opening a new ticket. Most technical queries are resolved within 24 hours.</p>
               <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-emerald-400">
                     <i className="fas fa-phone-alt"></i>
                     <span className="text-[10px] font-black uppercase tracking-widest">Ext: 8821 (9AM - 5PM)</span>
                  </div>
                  <div className="flex items-center space-x-3 text-emerald-400">
                     <i className="fas fa-at"></i>
                     <span className="text-[10px] font-black uppercase tracking-widest">helpdesk@namal.edu.pk</span>
                  </div>
               </div>
               <i className="fas fa-graduation-cap absolute -bottom-10 -right-10 text-[10rem] opacity-5 rotate-12"></i>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'submit' && !isAdmin && (
        <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-gray-100 shadow-sm max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center text-2xl mx-auto mb-6">
              <i className="fas fa-paper-plane"></i>
            </div>
            <h2 className="text-3xl font-black text-emerald-950">New Request</h2>
            <p className="text-gray-400 font-medium mt-1">Fill the details to notify the sports department.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Category</label>
                <select className="w-full bg-gray-50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none font-bold text-emerald-950" value={form.category} onChange={e => setForm({...form, category: e.target.value as any})}>
                  <option value="Technical">Technical Issue</option>
                  <option value="Content">Content/Curriculum Query</option>
                  <option value="Account">Account/Profile Support</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Subject</label>
                <input type="text" required placeholder="Briefly describe the topic" className="w-full bg-gray-50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none font-bold text-emerald-950" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Detailed Description</label>
                <textarea required placeholder="Explain your concern in detail..." className="w-full bg-gray-50 border border-gray-100 px-8 py-6 rounded-[2.5rem] outline-none font-bold text-emerald-950 h-32 resize-none" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
            </div>
            <button type="submit" className="w-full py-6 bg-emerald-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-200 transition-all active:scale-95">Dispatch Request</button>
          </form>
        </div>
      )}

      {showFaqForm && isAdmin && (
        <div className="fixed inset-0 z-[100] bg-emerald-950/40 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-[3.5rem] p-12 shadow-2xl animate-scaleIn border border-emerald-50">
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">{faqForm.id ? 'Modify FAQ Entry' : 'Create Knowledge Item'}</h2>
               <button onClick={() => setShowFaqForm(false)} className="text-gray-300 hover:text-red-500 transition-colors"><i className="fas fa-times-circle text-2xl"></i></button>
             </div>
             <form onSubmit={handleFaqSubmit} className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Question/Topic</label>
                   <input type="text" required className="w-full bg-gray-50 border border-gray-100 px-8 py-4 rounded-[2rem] outline-none font-bold text-emerald-950" value={faqForm.question} onChange={e => setFaqForm({...faqForm, question: e.target.value})} />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Official Answer</label>
                   <textarea required className="w-full bg-gray-50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none font-bold text-emerald-950 h-32 resize-none" value={faqForm.answer} onChange={e => setFaqForm({...faqForm, answer: e.target.value})} />
                </div>
                <button type="submit" className="w-full py-6 bg-emerald-600 text-white rounded-[2.5rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-200">Commit to Database</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpDesk;
