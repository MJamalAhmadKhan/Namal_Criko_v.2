import React, { useState, useEffect } from 'react';
import { UserAccount } from '../../types';
import { getOrganizations } from '../../services/authApi';

interface SignupProps {
  onSignup: (user: Partial<UserAccount> & { orgId?: number }) => void;
  onBackToLogin: () => void;
  institutes: string[];
}

const Signup: React.FC<SignupProps> = ({ onSignup, onBackToLogin }) => {
  const [userType, setUserType] = useState<'Student' | 'Other'>('Student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirm: '',
    rollNo: '',
    instituteName: '',
    designation: '',
    orgId: undefined as number | undefined
  });
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getOrganizations()
      .then(setOrganizations)
      .catch(err => console.error('Error fetching organizations:', err));
  }, []);

  const set = (field: string, val: string) => setFormData(p => ({ ...p, [field]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.contact) {
      alert('Please fill in all required fields.');
      return;
    }
    if (formData.password !== formData.confirm) {
      alert('Passwords do not match!');
      return;
    }
    if (formData.password.length < 5) {
      alert('Password must be at least 5 characters.');
      return;
    }
    if (userType === 'Student' && !formData.rollNo) {
      alert('Registration number is required for students.');
      return;
    }
    if (userType === 'Student' && !formData.instituteName) {
      alert('Please select your institute.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      onSignup({ ...formData, userType });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4 relative overflow-hidden">
      <div className="bg-white/80 backdrop-blur-xl w-full max-w-2xl p-10 rounded-[3rem] shadow-2xl border border-white/40 animate-scaleIn relative z-10 my-8">
        <header className="mb-8">
          <button type="button" onClick={onBackToLogin} className="text-emerald-600 hover:text-emerald-700 font-black text-xs uppercase flex items-center mb-6">
            <i className="fas fa-arrow-left mr-2"></i> Back to login
          </button>
          <h1 className="text-3xl font-black text-emerald-900 leading-tight">Registration</h1>
          <p className="text-gray-500 font-medium mt-2">Create your profile and start training.</p>
        </header>

        {/* User Type Toggle */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8">
          <button
            type="button"
            onClick={() => setUserType('Student')}
            className={`flex-1 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${userType === 'Student' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400'}`}
          >
            <i className="fas fa-graduation-cap"></i> Student
          </button>
          <button
            type="button"
            onClick={() => setUserType('Other')}
            className={`flex-1 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${userType === 'Other' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400'}`}
          >
            <i className="fas fa-user"></i> Other
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Row 1: Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-black text-emerald-900/40 uppercase tracking-widest mb-2 pl-2">Full Name <span className="text-red-400">*</span></label>
              <input type="text" required
                className="w-full bg-emerald-50/50 border border-emerald-100 px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold"
                value={formData.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-emerald-900/40 uppercase tracking-widest mb-2 pl-2">Email <span className="text-red-400">*</span></label>
              <input type="email" required
                className="w-full bg-emerald-50/50 border border-emerald-100 px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold"
                value={formData.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" />
            </div>
          </div>

          {/* Row 2: Phone */}
          <div>
            <label className="block text-[10px] font-black text-emerald-900/40 uppercase tracking-widest mb-2 pl-2">Phone Number <span className="text-red-400">*</span></label>
            <input type="tel" required
              className="w-full bg-emerald-50/50 border border-emerald-100 px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold"
              value={formData.contact} onChange={e => set('contact', e.target.value)} placeholder="+92 300 1234567" />
          </div>

          {/* Student-specific fields */}
          {userType === 'Student' ? (
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-3xl p-6 space-y-5">
              <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-graduation-cap"></i> Student Details
              </p>

              {/* Institute Selection */}
              <div>
                <label className="block text-[10px] font-black text-emerald-900/40 uppercase tracking-widest mb-2 pl-2">Institute <span className="text-red-400">*</span></label>
                <select required
                  className="w-full bg-white border border-emerald-100 px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                  value={formData.instituteName} onChange={e => {
                    const selectedName = e.target.value;
                    const org = organizations.find(o => o.Name === selectedName);
                    setFormData(p => ({ ...p, instituteName: selectedName, orgId: org ? org.ORGID : undefined }));
                  }}>
                  <option value="">-- Select your institute --</option>
                  {organizations.map(org => (
                    <option key={org.ORGID} value={org.Name}>{org.Name}</option>
                  ))}
                </select>
              </div>

              {/* Registration Number */}
              <div>
                <label className="block text-[10px] font-black text-emerald-900/40 uppercase tracking-widest mb-2 pl-2">Registration / Roll Number <span className="text-red-400">*</span></label>
                <input type="text" required
                  className="w-full bg-white border border-emerald-100 px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold"
                  value={formData.rollNo} onChange={e => set('rollNo', e.target.value)} placeholder="e.g. NUM-BSCS-2024-01" />
              </div>
            </div>
          ) : (
            /* Other type - optional fields */
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 space-y-5">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <i className="fas fa-user-tie"></i> Optional Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-emerald-900/40 uppercase tracking-widest mb-2 pl-2">Organization (Optional)</label>
                  <select
                    className="w-full bg-white border border-gray-100 px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                    value={formData.instituteName} onChange={e => {
                      const selectedName = e.target.value;
                      const org = organizations.find(o => o.Name === selectedName);
                      setFormData(p => ({ ...p, instituteName: selectedName, orgId: org ? org.ORGID : undefined }));
                    }}>
                    <option value="">-- Select organization --</option>
                    {organizations.map(org => (
                      <option key={org.ORGID} value={org.Name}>{org.Name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-emerald-900/40 uppercase tracking-widest mb-2 pl-2">Designation (Optional)</label>
                  <input type="text"
                    className="w-full bg-white border border-gray-100 px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold"
                    value={formData.designation} onChange={e => set('designation', e.target.value)} placeholder="e.g. Coach, Scout" />
                </div>
              </div>
            </div>
          )}

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-black text-emerald-900/40 uppercase tracking-widest mb-2 pl-2">Password <span className="text-red-400">*</span></label>
              <input type="password" required
                className="w-full bg-emerald-50/50 border border-emerald-100 px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold"
                value={formData.password} onChange={e => set('password', e.target.value)} placeholder="Min 5 characters" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-emerald-900/40 uppercase tracking-widest mb-2 pl-2">Confirm Password <span className="text-red-400">*</span></label>
              <input type="password" required
                className="w-full bg-emerald-50/50 border border-emerald-100 px-6 py-4 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold"
                value={formData.confirm} onChange={e => set('confirm', e.target.value)} placeholder="Confirm password" />
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" disabled={isSubmitting}
              className={`w-full py-5 bg-emerald-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isSubmitting
                ? <span className="flex items-center justify-center"><i className="fas fa-circle-notch fa-spin mr-2"></i> Processing...</span>
                : 'Submit Registration'}
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest flex items-center justify-center">
              <i className="fas fa-shield-alt mr-1"></i> Requires Admin Verification
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
