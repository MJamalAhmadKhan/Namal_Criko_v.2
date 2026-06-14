import React, { useState, useRef } from 'react';
import { UserAccount } from '../types';

interface ProfileProps {
  user: UserAccount;
  onUpdate: (data: Partial<UserAccount>) => void;
  onDeleteRequest: () => void;
  onBack: () => void;
}

// ── Admin Profile ────────────────────────────────────────────────────────────
const AdminProfile: React.FC<ProfileProps> = ({ user, onUpdate, onBack }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    contact: user.contact || '',
    avatar: user.avatar || '',
    password: '',
    confirmPassword: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) { alert('Image must be under 1MB'); return; }
    const reader = new FileReader();
    reader.onloadend = () => setFormData(p => ({ ...p, avatar: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!'); return;
    }
    onUpdate({
      name: formData.name,
      contact: formData.contact,
      avatar: formData.avatar,
      ...(formData.password ? { password: formData.password } : {}),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn pb-20">
      <header className="mb-10">
        <button onClick={onBack} className="text-emerald-600 font-bold text-xs mb-3 flex items-center uppercase tracking-widest hover:text-emerald-700">
          <i className="fas fa-chevron-left mr-2"></i> Dashboard
        </button>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-900 rounded-2xl flex items-center justify-center">
            <i className="fas fa-user-shield text-white text-lg"></i>
          </div>
          <div>
            <h1 className="text-4xl font-black text-emerald-950 tracking-tight">Admin Profile</h1>
            <p className="text-gray-500 font-medium">System administrator settings and credentials.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-emerald-950 p-10 rounded-[3rem] text-center space-y-6 sticky top-28">
            <div className="relative inline-block">
              <div className="w-36 h-36 rounded-[2.5rem] bg-emerald-800 overflow-hidden border-4 border-emerald-700 shadow-xl mx-auto flex items-center justify-center">
                {formData.avatar
                  ? <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                  : <i className="fas fa-user-shield text-5xl text-emerald-400"></i>}
              </div>
              <button onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 text-white rounded-xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                <i className="fas fa-camera text-sm"></i>
              </button>
              <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{formData.name}</h2>
              <span className="inline-block mt-2 bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/30">
                System Admin
              </span>
            </div>
            <div className="pt-4 border-t border-emerald-800 text-left space-y-3">
              <div className="flex items-center gap-3 text-emerald-400">
                <i className="fas fa-envelope w-4 text-xs"></i>
                <span className="text-xs font-medium text-emerald-300">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-400">
                <i className="fas fa-phone w-4 text-xs"></i>
                <span className="text-xs font-medium text-emerald-300">{formData.contact || 'Not set'}</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-circle text-emerald-500 text-[8px] w-4"></i>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
              </div>
            </div>
            {/* Quick Stats */}
            <div className="pt-4 border-t border-emerald-800 grid grid-cols-1 gap-3">
              <div className="bg-emerald-900 rounded-2xl p-4 text-center">
                <i className="fas fa-shield-alt text-emerald-400 mb-2 block"></i>
                <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Full System Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="space-y-6">
                <h3 className="text-xs font-black text-emerald-950/30 uppercase tracking-[0.2em]">Administrator Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">Display Name</label>
                    <input type="text" required
                      className="w-full bg-gray-50/50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                      value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">Contact</label>
                    <input type="tel"
                      className="w-full bg-gray-50/50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                      value={formData.contact} onChange={e => setFormData(p => ({ ...p, contact: e.target.value }))} placeholder="+92 XXX XXXXXXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">Email (Read Only)</label>
                  <div className="w-full bg-gray-100 border border-gray-100 px-8 py-5 rounded-[2rem] font-bold text-gray-400 text-sm">{user.email}</div>
                </div>
              </section>

              <div className="border-t border-gray-50 pt-8 space-y-6">
                <h3 className="text-xs font-black text-emerald-950/30 uppercase tracking-[0.2em]">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">New Password</label>
                    <input type="password" placeholder="Leave blank to keep"
                      className="w-full bg-gray-50/50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                      value={formData.password} onChange={e => setFormData(p => ({ ...p, password: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">Confirm Password</label>
                    <input type="password" placeholder="••••••••"
                      className="w-full bg-gray-50/50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                      value={formData.confirmPassword} onChange={e => setFormData(p => ({ ...p, confirmPassword: e.target.value }))} />
                  </div>
                </div>
              </div>

              <button type="submit"
                className="w-full py-6 bg-emerald-950 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-100 hover:bg-black hover:scale-[1.02] active:scale-95 transition-all">
                {saved ? <span><i className="fas fa-check mr-2"></i>Saved!</span> : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* System Info Card */}
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-xs font-black text-emerald-950/30 uppercase tracking-[0.2em] mb-6">System Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: 'Role', value: 'System Admin', icon: 'fa-user-shield' },
                { label: 'Status', value: 'Active', icon: 'fa-circle-check' },
                { label: 'Account ID', value: user.id.slice(0, 12) + '...', icon: 'fa-fingerprint' },
              ].map(item => (
                <div key={item.label} className="bg-gray-50 rounded-2xl p-4">
                  <i className={`fas ${item.icon} text-emerald-600 mb-2 block text-sm`}></i>
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.label}</div>
                  <div className="text-sm font-black text-emerald-950 mt-1">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Student Profile ──────────────────────────────────────────────────────────
const StudentProfile: React.FC<ProfileProps> = ({ user, onUpdate, onDeleteRequest, onBack }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    rollNo: user.rollNo || '',
    contact: user.contact || '',
    avatar: user.avatar || '',
    password: '',
    confirmPassword: '',
    instituteName: user.instituteName || '',
    designation: user.designation || '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) { alert('Image must be under 1MB'); return; }
    const reader = new FileReader();
    reader.onloadend = () => setFormData(p => ({ ...p, avatar: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!'); return;
    }
    onUpdate({
      name: formData.name, rollNo: formData.rollNo, contact: formData.contact,
      avatar: formData.avatar, instituteName: formData.instituteName, designation: formData.designation,
      ...(formData.password ? { password: formData.password } : {}),
    });
    alert('Profile Updated Successfully!');
  };

  const isStudent = user.userType === 'Student' || user.userType === undefined;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn pb-20">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <button onClick={onBack} className="text-emerald-600 font-bold text-xs mb-3 flex items-center uppercase tracking-widest hover:text-emerald-700">
            <i className="fas fa-chevron-left mr-2"></i> Dashboard
          </button>
          <h1 className="text-4xl font-black text-emerald-950 tracking-tight">My Profile</h1>
          <p className="text-gray-500 font-medium">Manage your personal and university credentials.</p>
        </div>
        <div className="bg-emerald-50 px-6 py-2 rounded-2xl border border-emerald-100 hidden md:block">
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
            {user.userType || 'Student'} Account
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl text-center space-y-6 sticky top-28">
            <div className="relative inline-block group">
              <div className="w-40 h-40 rounded-[2.5rem] bg-emerald-50 overflow-hidden border-4 border-white shadow-xl mx-auto flex items-center justify-center">
                {formData.avatar
                  ? <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                  : <span className="text-6xl font-black text-emerald-200">{formData.name[0]}</span>}
              </div>
              <button onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-600 text-white rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95">
                <i className="fas fa-camera"></i>
              </button>
              <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-emerald-950 leading-tight">{formData.name}</h2>
              <p className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] mt-1">{user.role} • {user.status}</p>
            </div>
            <div className="pt-4 border-t border-gray-50 text-left space-y-3">
              <div className="flex items-center space-x-3 text-gray-500">
                <i className="fas fa-envelope w-5 text-sm"></i>
                <span className="text-xs font-medium">{user.email}</span>
              </div>
              {isStudent && (
                <div className="flex items-center space-x-3 text-gray-500">
                  <i className="fas fa-id-card w-5 text-sm"></i>
                  <span className="text-xs font-medium">{formData.rollNo || 'Roll No. not set'}</span>
                </div>
              )}
              {formData.instituteName && (
                <div className="flex items-center space-x-3 text-gray-500">
                  <i className="fas fa-university w-5 text-sm"></i>
                  <span className="text-xs font-medium">{formData.instituteName}</span>
                </div>
              )}
              {formData.contact && (
                <div className="flex items-center space-x-3 text-gray-500">
                  <i className="fas fa-phone w-5 text-sm"></i>
                  <span className="text-xs font-medium">{formData.contact}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="space-y-6">
                <h3 className="text-xs font-black text-emerald-950/30 uppercase tracking-[0.2em]">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">Full Name</label>
                    <input type="text" required
                      className="w-full bg-gray-50/50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                      value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">Contact Number</label>
                    <input type="tel"
                      className="w-full bg-gray-50/50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                      value={formData.contact} onChange={e => setFormData(p => ({ ...p, contact: e.target.value }))} placeholder="+92 XXX XXXXXXX" />
                  </div>
                </div>
              </section>

              {/* Student or Other Fields */}
              {isStudent ? (
                <section className="space-y-6 border-t border-gray-50 pt-8">
                  <h3 className="text-xs font-black text-emerald-950/30 uppercase tracking-[0.2em]">Academic Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">Institute</label>
                      <input type="text"
                        className="w-full bg-gray-100 border border-gray-100 px-8 py-5 rounded-[2rem] font-bold text-gray-400 text-sm"
                        value={formData.instituteName} readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">Registration / Roll No.</label>
                      <input type="text"
                        className="w-full bg-gray-50/50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                        value={formData.rollNo} onChange={e => setFormData(p => ({ ...p, rollNo: e.target.value }))} placeholder="NUM-BSCS-2024-XX" />
                    </div>
                  </div>
                </section>
              ) : (
                <section className="space-y-6 border-t border-gray-50 pt-8">
                  <h3 className="text-xs font-black text-emerald-950/30 uppercase tracking-[0.2em]">Professional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">Organization</label>
                      <input type="text"
                        className="w-full bg-gray-50/50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                        value={formData.instituteName} onChange={e => setFormData(p => ({ ...p, instituteName: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">Designation</label>
                      <input type="text"
                        className="w-full bg-gray-50/50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                        value={formData.designation} onChange={e => setFormData(p => ({ ...p, designation: e.target.value }))} />
                    </div>
                  </div>
                </section>
              )}

              <div className="border-t border-gray-50 pt-8 space-y-6">
                <h3 className="text-xs font-black text-emerald-950/30 uppercase tracking-[0.2em]">Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">New Password</label>
                    <input type="password" placeholder="Leave blank to keep"
                      className="w-full bg-gray-50/50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                      value={formData.password} onChange={e => setFormData(p => ({ ...p, password: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-emerald-950/40 uppercase tracking-widest pl-4">Confirm Password</label>
                    <input type="password" placeholder="••••••••"
                      className="w-full bg-gray-50/50 border border-gray-100 px-8 py-5 rounded-[2rem] outline-none focus:ring-4 focus:ring-emerald-500/10 font-bold text-emerald-950"
                      value={formData.confirmPassword} onChange={e => setFormData(p => ({ ...p, confirmPassword: e.target.value }))} />
                  </div>
                </div>
              </div>

              <button type="submit"
                className="w-full py-6 bg-emerald-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-100 hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all">
                Save Changes
              </button>
            </form>

            {/* Danger Zone */}
            <div className="mt-16 border-t border-red-50 pt-10">
              <div className="bg-red-50/50 p-8 rounded-[2.5rem] border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-black text-red-950">Request Account Deletion</h3>
                  <p className="text-red-600/60 text-xs font-bold uppercase tracking-widest mt-1">Permanent — requires Admin review.</p>
                </div>
                <button onClick={() => setShowDeleteModal(true)}
                  className="whitespace-nowrap px-8 py-4 bg-white text-red-600 border border-red-100 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">
                  Request Removal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] bg-red-950/40 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 shadow-2xl animate-scaleIn border border-red-50 text-center">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-[2rem] flex items-center justify-center text-3xl mx-auto mb-6">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2 className="text-2xl font-black text-red-950 mb-3">Permanent Deletion?</h2>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed text-sm">Your account will be suspended and reviewed for deletion. You will be logged out immediately.</p>
            <div className="flex flex-col space-y-3">
              <button onClick={onDeleteRequest}
                className="w-full py-5 bg-red-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 hover:bg-red-700 transition-all">
                Confirm Request
              </button>
              <button onClick={() => setShowDeleteModal(false)}
                className="w-full py-5 bg-gray-100 text-gray-500 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main Export — Routes to correct profile ──────────────────────────────────
const Profile: React.FC<ProfileProps> = (props) => {
  if (props.user.role === 'Admin') return <AdminProfile {...props} />;
  return <StudentProfile {...props} />;
};

export default Profile;
