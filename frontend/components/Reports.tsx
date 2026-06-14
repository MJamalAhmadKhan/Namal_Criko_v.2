import React, { useState } from 'react';
import { AppState } from '../types';

interface ReportsProps {
  state: AppState;
  onBack: () => void;
}

type ReportType = 'User Growth' | 'Simulation Usage' | 'Category Popularity' | 'Help Desk Metrics' | null;

// ── PDF Generator (pure browser, no library needed) ───────────────────────
const generatePDF = (reportType: ReportType, timePeriod: string, state: AppState) => {
  if (!reportType) return;

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-PK');

  // Build report data based on type
  let tableRows = '';
  let summaryStats: { label: string; value: string }[] = [];

  if (reportType === 'User Growth') {
    const total = state.users.length;
    const active = state.users.filter(u => u.status === 'Active').length;
    const pending = state.users.filter(u => u.status === 'Pending').length;
    const suspended = state.users.filter(u => u.status === 'Suspended').length;
    const students = state.users.filter(u => u.role === 'Player').length;
    summaryStats = [
      { label: 'Total Users', value: String(total) },
      { label: 'Active', value: String(active) },
      { label: 'Pending Approval', value: String(pending) },
      { label: 'Suspended', value: String(suspended) },
      { label: 'Students', value: String(students) },
    ];
    tableRows = state.users.map(u => `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>${u.status}</td>
        <td>${u.instituteName || '—'}</td>
        <td>${new Date(u.createdAt).toLocaleDateString()}</td>
      </tr>`).join('');
  }

  if (reportType === 'Simulation Usage') {
    const total = state.techniques.length;
    const batting = state.techniques.filter(t => t.category === 'Batting').length;
    const bowling = state.techniques.filter(t => t.category === 'Bowling').length;
    summaryStats = [
      { label: 'Total Techniques', value: String(total) },
      { label: 'Batting', value: String(batting) },
      { label: 'Bowling', value: String(bowling) },
      { label: 'Beginner', value: String(state.techniques.filter(t => t.difficulty === 'Beginner').length) },
      { label: 'Advanced', value: String(state.techniques.filter(t => t.difficulty === 'Advanced').length) },
    ];
    tableRows = state.techniques.map(t => `
      <tr>
        <td>${t.name}</td>
        <td>${t.category}</td>
        <td>${t.subCategory}</td>
        <td>${t.difficulty}</td>
        <td>${t.frames.length} frames</td>
      </tr>`).join('');
  }

  if (reportType === 'Category Popularity') {
    const cats: Record<string, number> = {};
    state.techniques.forEach(t => { cats[t.subCategory] = (cats[t.subCategory] || 0) + 1; });
    summaryStats = Object.entries(cats).map(([k, v]) => ({ label: k, value: String(v) + ' techniques' }));
    tableRows = Object.entries(cats).map(([cat, count]) => `
      <tr>
        <td>${cat}</td>
        <td>${count}</td>
        <td>${Math.round((count / state.techniques.length) * 100)}%</td>
      </tr>`).join('');
  }

  if (reportType === 'Help Desk Metrics') {
    const total = state.tickets.length;
    const open = state.tickets.filter(t => t.status === 'Open').length;
    const resolved = state.tickets.filter(t => t.status === 'Resolved').length;
    const inProgress = state.tickets.filter(t => t.status === 'In Progress').length;
    summaryStats = [
      { label: 'Total Tickets', value: String(total) },
      { label: 'Open', value: String(open) },
      { label: 'In Progress', value: String(inProgress) },
      { label: 'Resolved', value: String(resolved) },
      { label: 'Resolution Rate', value: total > 0 ? Math.round((resolved / total) * 100) + '%' : '0%' },
    ];
    tableRows = state.tickets.map(t => `
      <tr>
        <td>${t.id}</td>
        <td>${t.userName}</td>
        <td>${t.subject}</td>
        <td>${t.category}</td>
        <td>${t.status}</td>
        <td>${new Date(t.createdAt).toLocaleDateString()}</td>
      </tr>`).join('');
  }

  const summaryHTML = summaryStats.map(s => `
    <div class="stat-card">
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');

  const colHeaders: Record<string, string> = {
    'User Growth': '<th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Institute</th><th>Joined</th>',
    'Simulation Usage': '<th>Technique</th><th>Category</th><th>Sub-Category</th><th>Difficulty</th><th>Frames</th>',
    'Category Popularity': '<th>Sub-Category</th><th>Count</th><th>Share</th>',
    'Help Desk Metrics': '<th>Ticket ID</th><th>User</th><th>Subject</th><th>Category</th><th>Status</th><th>Date</th>',
  };

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Namal Criko Report - ${reportType}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #0f172a; background: #fff; padding: 40px; }
  .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #065f46; padding-bottom: 20px; margin-bottom: 30px; }
  .logo { display: flex; align-items: center; gap: 12px; }
  .logo-icon { width: 50px; height: 50px; background: #065f46; border-radius: 14px; display: flex; align-items: center; justify-content: center; color: white; font-size: 22px; font-weight: 900; }
  .logo-text h1 { font-size: 22px; font-weight: 900; color: #065f46; letter-spacing: -0.5px; }
  .logo-text p { font-size: 10px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
  .report-meta { text-align: right; }
  .report-meta h2 { font-size: 18px; font-weight: 900; color: #0f172a; }
  .report-meta p { font-size: 11px; color: #6b7280; margin-top: 4px; }
  .badge { display: inline-block; background: #d1fae5; color: #065f46; font-size: 10px; font-weight: 800; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; }
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px; margin-bottom: 30px; }
  .stat-card { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 16px; padding: 20px; text-align: center; }
  .stat-value { font-size: 28px; font-weight: 900; color: #065f46; }
  .stat-label { font-size: 10px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; }
  .section-title { font-size: 12px; font-weight: 800; color: #6b7280; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 14px; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th { background: #064e3b; color: white; padding: 12px 14px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; }
  td { padding: 10px 14px; border-bottom: 1px solid #f0f0f0; }
  tr:nth-child(even) td { background: #f8fafc; }
  .footer { margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 16px; display: flex; justify-content: space-between; font-size: 10px; color: #9ca3af; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
<div class="header">
  <div class="logo">
    <div class="logo-icon">C</div>
    <div class="logo-text">
      <h1>NAMALCRIKO</h1>
      <p>Cricket Simulation Trainer</p>
    </div>
  </div>
  <div class="report-meta">
    <h2>${reportType} Report</h2>
    <p>Generated: ${dateStr} at ${timeStr}</p>
    <span class="badge">Period: ${timePeriod === '7d' ? 'Last 7 Days' : timePeriod === '30d' ? 'Last 30 Days' : 'Last 90 Days'}</span>
  </div>
</div>

<p class="section-title">Summary Statistics</p>
<div class="stats-grid">${summaryHTML}</div>

<p class="section-title">Detailed Data</p>
<table>
  <thead><tr>${colHeaders[reportType!]}</tr></thead>
  <tbody>${tableRows}</tbody>
</table>

<div class="footer">
  <span>Namal Criko — Confidential Admin Report</span>
  <span>sports@namal.edu.pk</span>
</div>
</body>
</html>`;

  // Open in new window and trigger print (saves as PDF)
  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 500);
  }
};

// ── CSV Generator ─────────────────────────────────────────────────────────
const generateCSV = (reportType: ReportType, state: AppState) => {
  if (!reportType) return;
  let csv = '';

  if (reportType === 'User Growth') {
    csv = 'Name,Email,Role,Status,User Type,Institute,Roll No,Contact,Joined\n';
    csv += state.users.map(u =>
      `"${u.name}","${u.email}","${u.role}","${u.status}","${u.userType || 'Student'}","${u.instituteName || ''}","${u.rollNo || ''}","${u.contact || ''}","${new Date(u.createdAt).toLocaleDateString()}"`
    ).join('\n');
  }
  if (reportType === 'Simulation Usage') {
    csv = 'Name,Category,Sub-Category,Difficulty,Frames\n';
    csv += state.techniques.map(t =>
      `"${t.name}","${t.category}","${t.subCategory}","${t.difficulty}","${t.frames.length}"`
    ).join('\n');
  }
  if (reportType === 'Category Popularity') {
    const cats: Record<string, number> = {};
    state.techniques.forEach(t => { cats[t.subCategory] = (cats[t.subCategory] || 0) + 1; });
    csv = 'Sub-Category,Count,Percentage\n';
    csv += Object.entries(cats).map(([k, v]) =>
      `"${k}","${v}","${Math.round((v / state.techniques.length) * 100)}%"`
    ).join('\n');
  }
  if (reportType === 'Help Desk Metrics') {
    csv = 'Ticket ID,User,Subject,Category,Status,Date\n';
    csv += state.tickets.map(t =>
      `"${t.id}","${t.userName}","${t.subject}","${t.category}","${t.status}","${new Date(t.createdAt).toLocaleDateString()}"`
    ).join('\n');
  }

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `criko-${reportType?.replace(/\s+/g, '-').toLowerCase()}-report.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// ── Component ─────────────────────────────────────────────────────────────
const Reports: React.FC<ReportsProps> = ({ state, onBack }) => {
  const [selectedReport, setSelectedReport] = useState<ReportType>(null);
  const [timePeriod, setTimePeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [isReady, setIsReady] = useState(false);

  const handleSelect = (type: ReportType) => {
    setSelectedReport(type);
    setIsProcessing(true);
    setIsReady(false);
    const steps = ['Querying data...', 'Calculating metrics...', 'Building charts...', 'Finalising report...'];
    let i = 0;
    const iv = setInterval(() => {
      if (i < steps.length) { setProcessingStep(steps[i]); i++; }
      else { clearInterval(iv); setIsProcessing(false); setIsReady(true); }
    }, 500);
  };

  // Quick stat cards for preview
  const getPreviewStats = () => {
    if (!selectedReport) return [];
    if (selectedReport === 'User Growth') return [
      { label: 'Total Users', value: state.users.length },
      { label: 'Active', value: state.users.filter(u => u.status === 'Active').length },
      { label: 'Pending', value: state.users.filter(u => u.status === 'Pending').length },
    ];
    if (selectedReport === 'Simulation Usage') return [
      { label: 'Techniques', value: state.techniques.length },
      { label: 'Batting', value: state.techniques.filter(t => t.category === 'Batting').length },
      { label: 'Bowling', value: state.techniques.filter(t => t.category === 'Bowling').length },
    ];
    if (selectedReport === 'Help Desk Metrics') return [
      { label: 'Total Tickets', value: state.tickets.length },
      { label: 'Open', value: state.tickets.filter(t => t.status === 'Open').length },
      { label: 'Resolved', value: state.tickets.filter(t => t.status === 'Resolved').length },
    ];
    if (selectedReport === 'Category Popularity') {
      const cats = new Set(state.techniques.map(t => t.subCategory));
      return [{ label: 'Categories', value: cats.size }, { label: 'Techniques', value: state.techniques.length }];
    }
    return [];
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      <header className="border-b border-gray-50 pb-6">
        <h2 className="text-2xl font-black text-emerald-950 tracking-tight">System Performance Reports</h2>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Live data from your app — export as PDF or CSV</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Config panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 space-y-6">
            <h3 className="text-[10px] font-black text-emerald-900/40 uppercase tracking-widest">Configuration</h3>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-emerald-950/40 uppercase tracking-widest pl-2">Time Period</label>
              <select value={timePeriod} onChange={e => setTimePeriod(e.target.value as any)}
                className="w-full bg-white border border-gray-100 px-4 py-3 rounded-xl outline-none font-bold text-xs">
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[9px] font-black text-emerald-950/40 uppercase tracking-widest pl-2">Report Type</label>
              {(['User Growth', 'Simulation Usage', 'Category Popularity', 'Help Desk Metrics'] as ReportType[]).map(type => (
                <button key={type} onClick={() => handleSelect(type)} disabled={isProcessing}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all font-black text-[10px] uppercase tracking-widest ${selectedReport === type ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-emerald-900 border-gray-200 hover:border-emerald-200'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview + export panel */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50/50 p-8 rounded-[2.5rem] border border-gray-100 min-h-[450px] flex flex-col items-center justify-center text-center">
            {isProcessing ? (
              <div className="space-y-4 animate-pulse">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-xl mx-auto">
                  <i className="fas fa-sync-alt fa-spin"></i>
                </div>
                <h3 className="text-lg font-black text-emerald-950">Synthesizing...</h3>
                <p className="text-emerald-600 font-bold text-[9px] uppercase tracking-[0.2em]">{processingStep}</p>
              </div>
            ) : isReady ? (
              <div className="w-full space-y-6 animate-fadeIn">
                {/* Preview stats */}
                <div className="grid grid-cols-3 gap-4">
                  {getPreviewStats().map(s => (
                    <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                      <div className="text-3xl font-black text-emerald-600">{s.value}</div>
                      <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-emerald-950 mb-1">{selectedReport}</h2>
                  <p className="text-xs text-gray-400 font-medium">Ready to export</p>
                </div>
                {/* Export buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => generatePDF(selectedReport, timePeriod, state)}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-md">
                    <i className="fas fa-file-pdf text-red-400"></i> Download PDF
                  </button>
                  <button
                    onClick={() => generateCSV(selectedReport, state)}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-950 border border-emerald-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all">
                    <i className="fas fa-file-csv text-emerald-600"></i> Download CSV
                  </button>
                </div>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                  <i className="fas fa-info-circle mr-1"></i> PDF opens print dialog — choose "Save as PDF" in your browser
                </p>
              </div>
            ) : (
              <div className="space-y-4 opacity-30">
                <i className="fas fa-chart-bar text-6xl text-emerald-900"></i>
                <h3 className="text-base font-black text-emerald-950">Select a Report</h3>
                <p className="max-w-xs mx-auto text-[10px] font-medium text-gray-500 leading-relaxed uppercase tracking-widest">Choose a report type to generate and export</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
