
import React, { useState } from 'react';
import { UserAccount } from '../../types';
import { CrikoLogo } from '../Navigation';
import { loginPlayer, loginAdmin, forgotPassword } from '../../services/authApi';

interface LoginProps {
  onLogin: (user: any) => void;
  users: UserAccount[];
  onGoToSignup: () => void;
  onBackToLanding: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGoToSignup, onBackToLanding }) => {
  const [role, setRole] = useState<'Player' | 'Admin'>('Player');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let user;
      if (role === 'Admin') {
        user = await loginAdmin(email, password);
      } else {
        user = await loginPlayer(email, password);
      }
      onLogin(user);
    } catch (err: any) {
      alert(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await forgotPassword(resetEmail);
      alert(`If this email exists, a secure reset token has been sent to ${resetEmail}. Check your inbox.`);
      setIsResetMode(false);
    } catch (err: any) {
      alert(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (isResetMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 relative overflow-hidden">
        <div className="bg-white w-full max-w-md p-12 rounded-[3.5rem] shadow-2xl border border-gray-100 animate-scaleIn relative z-10">
          <button onClick={() => setIsResetMode(false)} className="text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-8 flex items-center">
            <i className="fas fa-chevron-left mr-2"></i> Back to login
          </button>
          <h1 className="text-3xl font-black text-emerald-950 mb-2">Reset Password</h1>
          <p className="text-gray-400 text-sm font-medium mb-10">Verification required as per University policy.</p>
          <form onSubmit={handleReset} className="space-y-6">
            <input 
              type="email" 
              required 
              placeholder="University Email" 
              className="w-full bg-gray-50 border border-gray-100 px-8 py-5 rounded-3xl outline-none font-bold text-emerald-950" 
              value={resetEmail} 
              onChange={e => setResetEmail(e.target.value)} 
            />
            <button type="submit" className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-100 transition-all hover:bg-emerald-700">Send Reset Link</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 relative overflow-hidden">
      <div className="bg-white/80 backdrop-blur-xl w-full max-w-md p-12 rounded-[3.5rem] shadow-2xl border border-white/60 animate-scaleIn relative z-10">
        <div className="flex flex-col items-center mb-12 text-center">
          <CrikoLogo className="w-16 h-16 mb-6 scale-[1.5]" />
          <h1 className="text-3xl font-black text-emerald-950 leading-none tracking-tight">NAMAL<span className="text-emerald-700">CRIKO</span></h1>
          <p className="text-emerald-600/70 font-black tracking-[0.3em] text-[9px] uppercase mt-4">Simulation Trainer</p>
        </div>

        <div className="flex bg-gray-100/50 p-1.5 rounded-3xl mb-10 border border-gray-200/20">
          <button 
            onClick={() => { setRole('Player'); setEmail(''); }}
            className={`flex-1 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${role === 'Player' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400'}`}
          >
            Student
          </button>
          <button 
            onClick={() => { setRole('Admin'); setEmail(''); }}
            className={`flex-1 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${role === 'Admin' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400'}`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-emerald-950/30 uppercase tracking-widest pl-4">
              {role === 'Admin' ? 'Admin Credential' : 'University Email'}
            </label>
            <input 
              type={role === 'Admin' ? 'text' : 'email'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950 transition-all shadow-sm"
              placeholder={role === 'Admin' ? 'Admin ID' : 'student@namal.edu.pk'}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center px-4">
               <label className="block text-[10px] font-black text-emerald-950/30 uppercase tracking-widest">Password</label>
               {role === 'Player' && (
                 <button type="button" onClick={() => setIsResetMode(true)} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Forgot?</button>
               )}
            </div>
            <input 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950 transition-all shadow-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-6 bg-emerald-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-200 hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Authenticate'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={onBackToLanding}
            className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-emerald-600 transition-colors"
          >
            <i className="fas fa-home mr-2"></i> Return to Home
          </button>
        </div>

        {role === 'Player' && (
          <div className="mt-12 text-center border-t border-gray-50 pt-8">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">New to Criko?</p>
            <button 
              onClick={onGoToSignup}
              className="px-8 py-3 bg-emerald-50 text-emerald-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-100 transition-all"
            >
              Register now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
