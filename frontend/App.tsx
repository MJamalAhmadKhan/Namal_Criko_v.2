
import React, { useState, useEffect } from 'react';
import { Technique, AppState, HelpTicket, UserAccount, UserStatus, CricketEvent, ActivityLog, TeamInfo, FAQ } from './types';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import SimulationBrowser from './components/SimulationBrowser';
import SimulationViewer from './components/SimulationViewer';
import HelpDesk from './components/HelpDesk';
import AdminPanel from './components/AdminPanel';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import TeamPage from './components/TeamPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Landing from './components/Landing';
import TopPlayers from './components/TopPlayers';
import QuoteOfDay from './components/QuoteOfDay';
import { TopPlayer, Quote, SimulationLog } from './types';
import { registerPlayer, logout } from './services/authApi';
import { playerApi } from './services/playerApi';
import { adminApi } from './services/adminApi';

const STORAGE_KEY = 'namal_criko_final_srs_release_v4';

const INITIAL_QUOTES: Quote[] = [
  { id: 'q1', text: "Cricket is a game of glorious uncertainties.", author: "Neville Cardus", category: 'GENERAL', isActive: true },
  { id: 'q2', text: "To be a great batsman, you need courage, technique and a willingness to learn.", author: "Sachin Tendulkar", category: 'BATTING', isActive: true },
  { id: 'q3', text: "Fast bowling is an art. You have to bowl with your head as much as your body.", author: "Wasim Akram", category: 'BOWLING', isActive: true },
  { id: 'q4', text: "The mind is the strongest tool a cricketer has.", author: "Imran Khan", category: 'MINDSET', isActive: true },
  { id: 'q5', text: "Winning is a habit. Watch your thoughts, they become your actions.", author: "MS Dhoni", category: 'MINDSET', isActive: true },
  { id: 'q6', text: "Batting is 80 percent mental and 20 percent technical.", author: "Don Bradman", category: 'BATTING', isActive: true },
  { id: 'q7', text: "A good spinner can take wickets on any pitch.", author: "Shane Warne", category: 'BOWLING', isActive: true },
];

const INITIAL_TOP_PLAYERS: TopPlayer[] = [
  { id: 'p1', name: 'Babar Azam', nationality: 'Pakistan', role: 'Batsman', battingStyle: 'Right-hand bat', bowlingStyle: 'Right-arm medium', debutYear: 2015, stats: { matches: 130, runs: 6033, average: 57.45, wickets: 0, economy: 0, centuries: 20, fifties: 30 } },
  { id: 'p2', name: 'Shaheen Afridi', nationality: 'Pakistan', role: 'Bowler', battingStyle: 'Left-hand bat', bowlingStyle: 'Left-arm fast', debutYear: 2018, stats: { matches: 60, runs: 320, average: 9.1, wickets: 120, economy: 4.4, centuries: 0, fifties: 0 } },
  { id: 'p3', name: 'Virat Kohli', nationality: 'India', role: 'Batsman', battingStyle: 'Right-hand bat', bowlingStyle: 'Right-arm medium', debutYear: 2008, stats: { matches: 295, runs: 13906, average: 57.88, wickets: 4, economy: 6.3, centuries: 50, fifties: 72 } },
  { id: 'p4', name: 'Rashid Khan', nationality: 'Afghanistan', role: 'Bowler', battingStyle: 'Right-hand bat', bowlingStyle: 'Right-arm leg-spin', debutYear: 2015, stats: { matches: 90, runs: 820, average: 14.5, wickets: 182, economy: 6.21, centuries: 0, fifties: 1 } },
  { id: 'p5', name: 'Ben Stokes', nationality: 'England', role: 'All-Rounder', battingStyle: 'Left-hand bat', bowlingStyle: 'Right-arm fast-medium', debutYear: 2011, stats: { matches: 105, runs: 6196, average: 37.56, wickets: 195, economy: 5.88, centuries: 13, fifties: 36 } },
  { id: 'p6', name: 'Mohammad Rizwan', nationality: 'Pakistan', role: 'Wicket-Keeper', battingStyle: 'Right-hand bat', bowlingStyle: 'N/A', debutYear: 2015, stats: { matches: 98, runs: 3780, average: 48.46, wickets: 0, economy: 0, centuries: 7, fifties: 28 } },
  { id: 'p7', name: 'Joe Root', nationality: 'England', role: 'Batsman', battingStyle: 'Right-hand bat', bowlingStyle: 'Right-arm off-spin', debutYear: 2012, stats: { matches: 165, runs: 11808, average: 50.46, wickets: 64, economy: 4.2, centuries: 35, fifties: 63 } },
  { id: 'p8', name: 'Jasprit Bumrah', nationality: 'India', role: 'Bowler', battingStyle: 'Right-hand bat', bowlingStyle: 'Right-arm fast', debutYear: 2016, stats: { matches: 78, runs: 142, average: 5.9, wickets: 167, economy: 4.52, centuries: 0, fifties: 0 } },
];

const INITIAL_FAQS: FAQ[] = [
  { id: '1', question: "How do I mark a simulation as mastered?", answer: "To master a technique, you must view every frame in the Simulation Viewer and click the 'Mark as Mastered' button." },
  { id: '2', question: "Why is my account status 'Pending'?", answer: "All student registrations must be verified by the Admin Department. This usually takes 24-48 business hours." }
];

const INITIAL_TECHNIQUES: Technique[] = [
  {
    id: 'fwd-def', name: 'Forward Defense', category: 'Batting', subCategory: 'Defensive', difficulty: 'Beginner',
    description: 'Perfecting the stance, bat angle, and weight transfer mechanics.',
    frames: [
      { id: 'f1', description: 'Stance & Grip', keyPoints: ['V-shape grip', 'Eyes level with bowler'] },
      { id: 'f2', description: 'Impact Point', keyPoints: ['Bat close to pad', 'Soft hands for control'] }
    ],
    commonMistakes: [{ desc: 'Hard hands at impact' }, { desc: 'Moving head away from line' }]
  },
  {
    id: 'cov-drive', name: 'Cover Drive', category: 'Batting', subCategory: 'Attacking', difficulty: 'Intermediate',
    description: 'The signature stroke focusing on footwork and high elbow position.',
    frames: [
      { id: 'f1', description: 'The Step', keyPoints: ['Toe to ball pitch', 'Knee flexed'] },
      { id: 'f2', description: 'Follow Through', keyPoints: ['Full swing arc', 'Balance held'] }
    ],
    commonMistakes: [{ desc: 'Reaching for the ball' }, { desc: 'Closed bat face' }]
  },
  {
    id: 'fast-york', name: 'Fast: Yorker', category: 'Bowling', subCategory: 'Fast', difficulty: 'Advanced',
    description: 'High-speed delivery targeting the base of the stumps.',
    frames: [
      { id: 'f1', description: 'The Load-up', keyPoints: ['Strong front arm', 'Focus on toes'] },
      { id: 'f2', description: 'Release', keyPoints: ['Late flick of wrist', 'High arm path'] }
    ],
    commonMistakes: [{ desc: 'Dropping arm speed' }, { desc: 'Over-stretching' }]
  }
];

const INITIAL_EVENTS: CricketEvent[] = [
  {
    id: 'e1', title: 'NPL Trials 2025', date: 'Dec 15, 2025', venue: 'Namal Oval',
    description: 'Selection trials for the Namal Premier League. All students registered on Criko are eligible.',
    type: 'Trial', registrationLink: '#', isArchived: false
  },
  {
    id: 'e2', title: 'New CA Batting Gear', date: 'Available Now', venue: 'Sports Store',
    description: 'Authentic CA equipment now available at discounted rates for Criko members.',
    type: 'Advertisement', isArchived: false
  }
];

const INITIAL_TEAM: TeamInfo = {
  officeEmail: 'sports@namal.edu.pk',
  officePhone: '+92 (0) 459 236173',
  officeLocation: 'Namal Knowledge City, Block B, Sports Wing',
  leadCoach: 'Prof. Ahmed Khan',
  supportLead: 'Admin Office - Sports Wing'
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const defaultState: AppState = {
      currentUser: null,
      users: [],
      techniques: [],
      events: [],
      faqs: [],
      stats: { techniquesMastered: [], timeSpentMinutes: 0, streakDays: 0, lastActive: Date.now() },
      tickets: [],
      activityLogs: [],
      teamInfo: INITIAL_TEAM,
      activeTechniqueId: null,
      institutes: ['Namal University', 'COMSATS University', 'UET Lahore', 'LUMS', 'NUST', 'Punjab University', 'Bahria University', 'Air University'],
      topPlayers: [],
      quotes: [],
      todayQuote: null,
      simulationLogs: [],
      view: 'landing' 
    };

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // We only restore currentUser and view to persist active session,
        // but load all other entity lists fresh from the database.
        return {
          ...defaultState,
          currentUser: parsed.currentUser || null,
          view: parsed.view || 'landing'
        };
      } catch (e) {
        return defaultState;
      }
    }
    return defaultState;
  });

  // Session Restore on Mount
  useEffect(() => {
    const token = localStorage.getItem('criko_token');
    const u = localStorage.getItem('criko_user');
    if (token && u) {
      const parsed = JSON.parse(u);
      if (parsed.role === 'Admin') {
        const adminUser: UserAccount = {
          id: String(parsed.userId),
          name: 'System Admin',
          email: 'admin',
          role: 'Admin',
          status: 'Active',
          createdAt: Date.now()
        };
        setState(s => ({ ...s, currentUser: adminUser, view: 'admin' }));
      } else {
        playerApi.getProfile().then(profile => {
          const playerUser: UserAccount = {
            id: String(profile.user_id),
            name: profile.full_name,
            email: profile.email,
            contact: profile.phone_number,
            role: 'Player',
            status: profile.status,
            rollNo: profile.registration_number,
            createdAt: new Date(profile.Created_at).getTime(),
            userType: profile.Is_Student ? 'Student' : 'Other',
            instituteName: profile.institute_name || profile.org_name
          };
          setState(s => ({ ...s, currentUser: playerUser, view: 'dashboard' }));
        }).catch(() => {
          localStorage.removeItem('criko_token');
          localStorage.removeItem('criko_user');
          setState(s => ({ ...s, currentUser: null, view: 'landing' }));
        });
      }
    }
  }, []);

  // Sync state metadata with LocalStorage as backup
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Load backend data automatically when current user or view changes
  useEffect(() => {
    const user = state.currentUser;
    if (!user) return;

    if (user.role === 'Admin') {
      Promise.all([
        adminApi.getOverview(),
        adminApi.getAllPlayers(),
        adminApi.getPendingPlayers(),
        adminApi.getActionLog(),
        adminApi.getAllTickets(),
        adminApi.getAllQuotes(),
        playerApi.getSimulations(),
        adminApi.getOrganizations(),
        adminApi.getCategories(),
        adminApi.getProPlayers(),
        adminApi.getSimulationLogs()
      ]).then(([overview, players, pending, actionLogs, tickets, quotes, simulations, organizations, categories, proPlayers, simLogs]) => {
        setState(s => ({
          ...s,
          activityLogs: actionLogs.map((l: any) => ({
            id: 'log-' + l.log_id,
            userId: String(l.player_id || ''),
            userName: l.player_name || 'Admin',
            type: l.action_type as any,
            detail: l.description,
            timestamp: new Date(l.performed_at).getTime()
          })),
          users: players.map((p: any) => ({
            id: String(p.user_id),
            name: p.full_name,
            email: p.email,
            contact: p.phone_number,
            role: 'Player' as any,
            status: p.status as any,
            rollNo: p.registration_number,
            createdAt: new Date(p.Created_at).getTime(),
            userType: p.Is_Student ? 'Student' : 'Other'
          })),
          tickets: tickets.map((t: any) => ({
            id: 'TK-' + t.ticket_id,
            userId: String(t.player_name || ''),
            userName: t.player_name || 'Player',
            subject: t.subject,
            category: t.category_name as any,
            description: t.description,
            status: t.status === 'In_Progress' ? 'In Progress' : t.status,
            createdAt: new Date(t.Submission_Date).getTime()
          })),
          quotes: quotes.map((q: any) => ({
            id: String(q.quote_id),
            text: q.quote_text,
            author: q.Author,
            category: q.category.toUpperCase() as any,
            isActive: Boolean(q.active_flag)
          })),
          techniques: simulations.map((sim: any) => ({
            id: String(sim.simulation_id),
            name: sim.simulation_name,
            category: sim.category_name as any,
            subCategory: 'Medium-Pace' as any,
            difficulty: sim.Difficulty_Level === 1 ? 'Beginner' : sim.Difficulty_Level === 2 ? 'Intermediate' : 'Advanced',
            description: sim.description || '',
            frames: sim.frames || [],
            commonMistakes: sim.commonMistakes || [],
            videoUrl: sim.videoUrl || '',
            duration: sim.duration || 120,
            assetType: sim.assetType || 'Video',
            assetUrl: sim.assetUrl || ''
          })),
          topPlayers: proPlayers.map((p: any) => ({
            id: String(p.player_id),
            name: p.Name,
            nationality: p.Nationality,
            role: p.role,
            battingStyle: p.style,
            bowlingStyle: '',
            debutYear: 2020,
            stats: {
              matches: p.Matches_Played,
              runs: p.runs_scored || 0,
              average: p.runs_scored ? Number((p.runs_scored / p.Matches_Played).toFixed(2)) : 0,
              wickets: p.wickets_taken || 0,
              economy: p.average_Wicket_Taken || 0,
              centuries: p.Centuries || 0,
              fifties: p.fifties || 0
            }
          })),
          simulationLogs: simLogs,
          institutes: organizations.map((o: any) => o.Name)
        }));
      }).catch(err => console.error("Error loading admin data:", err));
    } else {
      Promise.all([
        playerApi.getDashboard(),
        playerApi.getAnalytics(),
        playerApi.getDailyQuote(),
        playerApi.getSimulations(),
        playerApi.getEvents(),
        playerApi.getFaqs(),
        playerApi.getTopPlayers(),
        playerApi.getMyTickets(),
        playerApi.getMySimulationLogs()
      ]).then(([dashboard, analytics, quote, simulations, events, faqs, topPlayers, tickets, simLogs]) => {
        setState(s => ({
          ...s,
          todayQuote: quote ? {
            id: String(quote.quote_id),
            text: quote.quote_text,
            author: quote.Author,
            category: quote.category.toUpperCase() as any,
            isActive: Boolean(quote.active_flag)
          } : null,
          techniques: simulations.map((sim: any) => ({
            id: String(sim.simulation_id),
            name: sim.simulation_name,
            category: sim.category_name as any,
            subCategory: 'Medium-Pace' as any,
            difficulty: sim.Difficulty_Level === 1 ? 'Beginner' : sim.Difficulty_Level === 2 ? 'Intermediate' : 'Advanced',
            description: sim.description || '',
            frames: sim.frames || [],
            commonMistakes: sim.commonMistakes || [],
            videoUrl: sim.videoUrl || '',
            duration: sim.duration || 120,
            assetType: sim.assetType || 'Video',
            assetUrl: sim.assetUrl || ''
          })),
          events: events.map((e: any) => ({
            id: String(e.event_id),
            title: e.event_name,
            date: new Date(e.event_date).toLocaleDateString(),
            venue: e.venue,
            description: e.Description,
            type: 'Announcement',
            isArchived: Boolean(e.archived_flag)
          })),
          faqs: faqs.map((f: any) => ({
            id: String(f.faq_id),
            question: f.question,
            answer: f.answer
          })),
          topPlayers: topPlayers.map((p: any) => ({
            id: String(p.player_id),
            name: p.Name,
            nationality: p.Nationality,
            role: p.role,
            battingStyle: p.style,
            bowlingStyle: '',
            debutYear: 2020,
            stats: {
              matches: p.Matches_Played,
              runs: p.runs_scored || 0,
              average: p.runs_scored ? Number((p.runs_scored / p.Matches_Played).toFixed(2)) : 0,
              wickets: p.wickets_taken || 0,
              economy: p.average_Wicket_Taken || 0,
              centuries: p.Centuries || 0,
              fifties: p.fifties || 0
            }
          })),
          tickets: tickets.map((t: any) => ({
            id: 'TK-' + t.ticket_id,
            userId: String(user.id),
            userName: user.name,
            subject: t.subject,
            category: t.category_name as any,
            description: t.description,
            status: t.status === 'In_Progress' ? 'In Progress' : t.status,
            adminResponse: t.admin_response || undefined,
            createdAt: new Date(t.Submission_Date).getTime()
          }))
        }));
      }).catch(err => console.error("Error loading player data:", err));
    }
  }, [state.currentUser, state.view]);

  const addActivity = (type: ActivityLog['type'], detail: string, user: UserAccount | null = state.currentUser) => {
    if (!user) return;
    const newLog: ActivityLog = {
      id: 'log-' + Date.now() + Math.random().toString(36).substr(2, 5),
      userId: user.id,
      userName: user.name,
      type,
      detail,
      timestamp: Date.now()
    };
    setState(s => ({ ...s, activityLogs: [newLog, ...s.activityLogs].slice(0, 100) }));
  };

  const handleLogin = async (parsedUser: any) => {
    if (parsedUser.role === 'Admin') {
      const adminUser: UserAccount = {
        id: String(parsedUser.userId),
        name: 'System Admin',
        email: 'admin',
        role: 'Admin',
        status: 'Active',
        createdAt: Date.now()
      };
      setState(s => ({ ...s, currentUser: adminUser, view: 'admin' }));
      addActivity('Login', `Authenticated successfully via Admin portal.`, adminUser);
    } else {
      try {
        const profile = await playerApi.getProfile();
        const playerUser: UserAccount = {
          id: String(profile.user_id),
          name: profile.full_name,
          email: profile.email,
          contact: profile.phone_number,
          role: 'Player',
          status: profile.status,
          rollNo: profile.registration_number,
          createdAt: new Date(profile.Created_at).getTime(),
          userType: profile.Is_Student ? 'Student' : 'Other',
          instituteName: profile.institute_name || profile.org_name
        };
        setState(s => ({ ...s, currentUser: playerUser, view: 'dashboard' }));
        addActivity('Login', `Authenticated successfully via Player portal.`, playerUser);
      } catch (err: any) {
        alert(err.message || 'Failed to fetch player profile');
      }
    }
  };

  const handleLogout = () => {
    logout();
    setState(s => ({ ...s, currentUser: null, view: 'landing' }));
  };

  const handleUpdatePlayerStatus = async (id: string, status: UserStatus) => {
    const numericId = Number(id);
    try {
      if (status === 'Active') {
        await adminApi.approvePlayer(numericId);
      } else if (status === 'Rejected') {
        await adminApi.rejectPlayer(numericId);
      } else if (status === 'Suspended') {
        await adminApi.suspendPlayer(numericId);
      }
      const players = await adminApi.getAllPlayers();
      setState(s => ({
        ...s,
        users: players.map((p: any) => ({
          id: String(p.user_id),
          name: p.full_name,
          email: p.email,
          contact: p.phone_number,
          role: 'Player' as any,
          status: p.status as any,
          rollNo: p.registration_number,
          createdAt: new Date(p.Created_at).getTime(),
          userType: p.Is_Student ? 'Student' : 'Other'
        }))
      }));
      alert(`Player status updated to ${status}!`);
    } catch (err: any) {
      alert(err.message || 'Failed to update player status');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        await adminApi.deleteUser(Number(id));
        const players = await adminApi.getAllPlayers();
        setState(s => ({
          ...s,
          users: players.map((p: any) => ({
            id: String(p.user_id),
            name: p.full_name,
            email: p.email,
            contact: p.phone_number,
            role: 'Player' as any,
            status: p.status as any,
            rollNo: p.registration_number,
            createdAt: new Date(p.Created_at).getTime(),
            userType: p.Is_Student ? 'Student' : 'Other'
          }))
        }));
        alert('User soft-deleted successfully!');
      } catch (err: any) {
        alert(err.message || 'Failed to delete user');
      }
    }
  };

  const updateProfile = async (data: Partial<UserAccount>) => {
    try {
      await playerApi.updateProfile({
        firstName: data.name ? data.name.split(' ')[0] : undefined,
        lastName: data.name ? data.name.split(' ').slice(1).join(' ') : undefined,
        phone: data.contact,
        password: data.password
      });
      const profile = await playerApi.getProfile();
      const playerUser: UserAccount = {
        id: String(profile.user_id),
        name: profile.full_name,
        email: profile.email,
        contact: profile.phone_number,
        role: 'Player',
        status: profile.status,
        rollNo: profile.registration_number,
        createdAt: new Date(profile.Created_at).getTime(),
        userType: profile.Is_Student ? 'Student' : 'Other',
        instituteName: profile.institute_name || profile.org_name
      };
      setState(s => ({
        ...s,
        currentUser: playerUser,
        users: s.users.map(u => u.id === playerUser.id ? playerUser : u)
      }));
      addActivity('Profile Update', 'Modified personal identification or security credentials.');
      alert('Profile updated successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to update profile');
    }
  };

  const updateTeamInfo = (data: Partial<TeamInfo>) => {
    setState(s => ({ ...s, teamInfo: { ...s.teamInfo, ...data } }));
  };

  const handleDeleteRequest = async () => {
    if (state.currentUser) {
      const user = state.currentUser;
      try {
        await playerApi.requestDeletion();
        addActivity('Account Deletion Request', 'Triggered permanent account removal workflow.', user);
        handleLogout();
        alert('Account deletion request submitted. Your account has been suspended pending final Admin review.');
      } catch (err: any) {
        alert(err.message || 'Failed to submit deletion request');
      }
    }
  };

  const handleTechniqueComplete = async (techId: string) => {
    const tech = state.techniques.find(t => t.id === techId);
    try {
      await playerApi.logSimulation(Number(techId), 120, true);
      setState(s => ({
        ...s,
        stats: {
          ...s.stats,
          techniquesMastered: s.stats.techniquesMastered.includes(techId) ? s.stats.techniquesMastered : [...s.stats.techniquesMastered, techId]
        }
      }));
      if (tech) addActivity('Technique Mastered', `Successfully completed and mastered: ${tech.name}`);
      alert("Simulation marked as mastered!");
    } catch (err: any) {
      console.error("Failed to mark simulation as completed:", err);
    }
  };

  const handleTicketSubmit = async (t: Omit<HelpTicket, 'id' | 'userId' | 'userName' | 'status' | 'createdAt'>) => {
    try {
      const categories = await playerApi.getTicketCategories();
      const match = categories.find((c: any) => c.Name.toLowerCase() === t.category.toLowerCase()) || categories[0];
      const categoryId = match ? match.Cat_id : 1;

      await playerApi.submitTicket(t.subject, t.description, categoryId);
      
      const tickets = await playerApi.getMyTickets();
      setState(s => ({
        ...s,
        tickets: tickets.map((tk: any) => ({
          id: 'TK-' + tk.ticket_id,
          userId: String(state.currentUser!.id),
          userName: state.currentUser!.name,
          subject: tk.subject,
          category: tk.category_name as any,
          description: tk.description,
          status: tk.status === 'In_Progress' ? 'In Progress' : tk.status,
          adminResponse: tk.admin_response || undefined,
          createdAt: new Date(tk.Submission_Date).getTime()
        }))
      }));
      addActivity('Ticket Created', `Opened a ${t.category} support request: "${t.subject}"`);
      alert('Ticket submitted successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to submit ticket');
    }
  };

  const handleTicketUpdate = async (id: string, status: HelpTicket['status'], response?: string) => {
    const numericId = Number(id.replace('TK-', ''));
    const statusMap: Record<string, string> = {
      'Open': 'Open',
      'In Progress': 'In_Progress',
      'Resolved': 'Resolved',
      'Closed': 'Closed'
    };
    try {
      await adminApi.respondTicket(numericId, response || 'Ticket status updated by Admin', statusMap[status] || 'Open');
      const tickets = await adminApi.getAllTickets();
      setState(s => ({
        ...s,
        tickets: tickets.map((t: any) => ({
          id: 'TK-' + t.ticket_id,
          userId: String(t.player_name || ''),
          userName: t.player_name || 'Player',
          subject: t.subject,
          category: t.category_name as any,
          description: t.description,
          status: t.status === 'In_Progress' ? 'In Progress' : t.status,
          createdAt: new Date(t.Submission_Date).getTime()
        }))
      }));
      alert('Ticket updated successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to update ticket');
    }
  };

  const handleManageFAQ = async (faq: Partial<FAQ>) => {
    try {
      if (faq.id) {
        await adminApi.updateFaq(Number(faq.id.replace('faq-', '')), faq.question || '', faq.answer || '');
      } else {
        await adminApi.createFaq(faq.question || '', faq.answer || '');
      }
      const faqs = await playerApi.getFaqs();
      setState(s => ({
        ...s,
        faqs: faqs.map((f: any) => ({
          id: String(f.faq_id),
          question: f.question,
          answer: f.answer
        }))
      }));
      alert('FAQ saved successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to save FAQ');
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    try {
      await adminApi.deleteFaq(id.replace('faq-', ''));
      const faqs = await playerApi.getFaqs();
      setState(s => ({
        ...s,
        faqs: faqs.map((f: any) => ({
          id: String(f.faq_id),
          question: f.question,
          answer: f.answer
        }))
      }));
      alert('FAQ deleted successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to delete FAQ');
    }
  };

  const handleManageTechnique = async (tech: Partial<Technique>) => {
    try {
      const categories = await adminApi.getCategories();
      const match = categories.find((c: any) => c.Name.toLowerCase() === (tech.category || 'Batting').toLowerCase()) || categories[0];
      const categoryId = match ? match.Category_id : 1;

      if (tech.id && !tech.id.startsWith('tech-')) {
        await adminApi.updateSimulation({
          simId: Number(tech.id),
          name: tech.name,
          duration: tech.duration || 120,
          categoryId,
          description: tech.description || '',
          frames: tech.frames || [],
          videoUrl: tech.assetUrl || tech.videoUrl || '',
          assetUrl: tech.assetUrl || tech.videoUrl || '',
          assetType: tech.assetType || 'Video',
          mistakes: tech.commonMistakes || []
        });
      } else {
        await adminApi.createSimulation({
          name: tech.name,
          duration: tech.duration || 120,
          categoryId,
          description: tech.description || '',
          frames: tech.frames || [],
          videoUrl: tech.assetUrl || tech.videoUrl || '',
          assetUrl: tech.assetUrl || tech.videoUrl || '',
          assetType: tech.assetType || 'Video',
          mistakes: tech.commonMistakes || []
        });
      }
      const simulations = await playerApi.getSimulations();
      setState(s => ({
        ...s,
        techniques: simulations.map((sim: any) => ({
          id: String(sim.simulation_id),
          name: sim.simulation_name,
          category: sim.category_name as any,
          subCategory: 'Medium-Pace' as any,
          difficulty: sim.Difficulty_Level === 1 ? 'Beginner' : sim.Difficulty_Level === 2 ? 'Intermediate' : 'Advanced',
          description: sim.description || '',
          frames: sim.frames || [],
          commonMistakes: sim.commonMistakes || [],
          videoUrl: sim.videoUrl || '',
          duration: sim.duration || 120,
          assetType: sim.assetType || 'Video',
          assetUrl: sim.assetUrl || ''
        }))
      }));
      alert('Simulation saved successfully!');
    } catch (err: any) {
      alert(err.message || 'Failed to save simulation');
    }
  };

  const handleDeleteTechnique = async (techId: string) => {
    if (window.confirm("Permanently delete this simulation?")) {
      try {
        await adminApi.deleteSimulation(techId);
        const simulations = await playerApi.getSimulations();
        setState(s => ({
          ...s,
          techniques: simulations.map((sim: any) => ({
            id: String(sim.simulation_id),
            name: sim.simulation_name,
            category: sim.category_name as any,
            subCategory: 'Medium-Pace' as any,
            difficulty: sim.Difficulty_Level === 1 ? 'Beginner' : sim.Difficulty_Level === 2 ? 'Intermediate' : 'Advanced',
            description: sim.description || '',
            frames: sim.frames || [],
            commonMistakes: sim.commonMistakes || [],
            videoUrl: sim.videoUrl || '',
            duration: sim.duration || 120,
            assetType: sim.assetType || 'Video',
            assetUrl: sim.assetUrl || ''
          }))
        }));
        alert('Simulation deleted successfully!');
      } catch (err: any) {
        alert(err.message || 'Failed to delete simulation');
      }
    }
  };

  if (!state.currentUser) {
    switch (state.view) {
      case 'signup':
        return <Signup onSignup={async (d) => {
          try {
            await registerPlayer(d);
            alert("Registration submitted successfully. Awaiting Admin approval.");
            setState(s => ({ ...s, view: 'login' }));
          } catch (err: any) {
            alert(err.message || "Registration failed");
          }
        }} onBackToLogin={() => setState(s => ({ ...s, view: 'login' }))} institutes={[]} />;
      case 'login':
        return <Login onLogin={handleLogin} users={[]} onGoToSignup={() => setState(s => ({ ...s, view: 'signup' }))} onBackToLanding={() => setState(s => ({ ...s, view: 'landing' }))} />;
      default:
        return <Landing onLogin={() => setState(s => ({ ...s, view: 'login' }))} onRegister={() => setState(s => ({ ...s, view: 'signup' }))} />;
    }
  }

  const handleUpdateInstitutes = async (newNames: string[]) => {
    try {
      const oldOrgs = await adminApi.getOrganizations();
      const oldNames = oldOrgs.map((o: any) => o.Name);

      // 1. Find if name was added
      const added = newNames.filter(n => !oldNames.includes(n));
      if (added.length > 0) {
        for (const name of added) {
          await adminApi.createOrganization({
            Name: name,
            Province: 'Punjab',
            City: 'Mianwali',
            Country: 'Pakistan'
          });
        }
      } else {
        // 2. Find if name was deleted
        const deleted = oldOrgs.filter((o: any) => !newNames.includes(o.Name));
        if (deleted.length > 0) {
          for (const org of deleted) {
            await adminApi.deleteOrganization(String(org.ORGID));
          }
        } else {
          // 3. Find if name was edited
          const oldNamesList = state.institutes;
          for (let i = 0; i < newNames.length; i++) {
            if (newNames[i] !== oldNamesList[i]) {
              const org = oldOrgs.find((o: any) => o.Name === oldNamesList[i]);
              if (org) {
                await adminApi.updateOrganization({
                  ORGID: org.ORGID,
                  Name: newNames[i]
                });
              }
            }
          }
        }
      }

      // Reload
      const orgs = await adminApi.getOrganizations();
      setState(s => ({ ...s, institutes: orgs.map((o: any) => o.Name) }));
    } catch (err: any) {
      alert(err.message || 'Failed to update organizations');
    }
  };

  const handleManageEvent = async (e: Partial<CricketEvent>) => {
    try {
      if (e.id && !e.id.startsWith('e-')) {
        await adminApi.updateEvent({
          eventId: Number(e.id),
          event_name: e.title,
          event_date: e.date,
          venue: e.venue,
          Description: e.description,
          Image_Url: undefined,
          Regestraion_Link: e.registrationLink
        });
        alert('Event updated successfully!');
      } else {
        await adminApi.createEvent({
          event_name: e.title,
          event_date: e.date,
          venue: e.venue,
          Description: e.description,
          Image_Url: undefined,
          Regestraion_Link: e.registrationLink
        });
        alert('Event created successfully!');
      }
      const events = await playerApi.getEvents();
      setState(s => ({
        ...s,
        events: events.map((ev: any) => ({
          id: String(ev.event_id),
          title: ev.event_name,
          date: new Date(ev.event_date).toLocaleDateString(),
          venue: ev.venue,
          description: ev.Description,
          type: 'Announcement',
          isArchived: Boolean(ev.archived_flag)
        }))
      }));
    } catch (err: any) {
      alert(err.message || 'Failed to manage event');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm("Are you sure you want to archive/delete this event?")) {
      try {
        await adminApi.archiveEvent(id);
        alert('Event archived successfully!');
        const events = await playerApi.getEvents();
        setState(s => ({
          ...s,
          events: events.map((ev: any) => ({
            id: String(ev.event_id),
            title: ev.event_name,
            date: new Date(ev.event_date).toLocaleDateString(),
            venue: ev.venue,
            description: ev.Description,
            type: 'Announcement',
            isArchived: Boolean(ev.archived_flag)
          }))
        }));
      } catch (err: any) {
        alert(err.message || 'Failed to archive event');
      }
    }
  };

  const handleUpdateQuotes = async (newQuotes: any[]) => {
    const formatCategory = (cat: string) => {
      const c = (cat || '').toUpperCase();
      if (c === 'BATTING') return 'Batting';
      if (c === 'BOWLING') return 'Bowling';
      if (c === 'MINDSET') return 'Mindset';
      return 'General';
    };

    try {
      const oldQuotes = state.quotes;
      const deleted = oldQuotes.filter(oq => !newQuotes.some(nq => nq.id === oq.id));
      
      if (deleted.length > 0) {
        for (const dq of deleted) {
          if (!dq.id.startsWith('q-')) {
            await adminApi.deleteQuote(dq.id);
          }
        }
      } else {
        const added = newQuotes.filter(nq => nq.id.startsWith('q-'));
        if (added.length > 0) {
          for (const aq of added) {
            await adminApi.createQuote({
              quote_text: aq.text,
              Author: aq.author,
              category: formatCategory(aq.category),
              active_flag: aq.isActive
            });
          }
        } else {
          for (const nq of newQuotes) {
            const oq = oldQuotes.find(o => o.id === nq.id);
            if (oq && (oq.isActive !== nq.isActive || oq.text !== nq.text || oq.author !== nq.author || oq.category !== nq.category)) {
              await adminApi.updateQuote({
                quoteId: Number(nq.id),
                quote_text: nq.text,
                Author: nq.author,
                category: formatCategory(nq.category),
                active_flag: nq.isActive
              });
            }
          }
        }
      }

      const quotesList = await adminApi.getAllQuotes();
      setState(s => ({
        ...s,
        quotes: quotesList.map((q: any) => ({
          id: String(q.quote_id),
          text: q.quote_text,
          author: q.Author,
          category: q.category.toUpperCase() as any,
          isActive: Boolean(q.active_flag)
        }))
      }));
    } catch (err: any) {
      alert(err.message || 'Failed to update quotes');
    }
  };

  const handleUpdateTopPlayers = async (newPlayers: any[]) => {
    try {
      const oldPlayers = state.topPlayers;
      const deleted = oldPlayers.filter(op => !newPlayers.some(np => np.id === op.id));
      
      if (deleted.length > 0) {
        for (const dp of deleted) {
          if (!dp.id.startsWith('pl-')) {
            await adminApi.deleteProPlayer(dp.id);
          }
        }
      } else {
        const added = newPlayers.filter(np => np.id.startsWith('pl-'));
        if (added.length > 0) {
          for (const ap of added) {
            await adminApi.createProPlayer({
              name: ap.name,
              nationality: ap.nationality,
              role: ap.role,
              style: ap.style,
              biography: ap.biography || '-'
            });

            const playersList = await adminApi.getProPlayers();
            const created = playersList.find((p: any) => p.Name === ap.name);
            if (created && ap.stats) {
              await adminApi.upsertPlayerStats({
                playerId: created.player_id,
                format: 'ODI',
                matchesPlayed: ap.stats.matches || 0,
                runsScored: ap.stats.runs || 0,
                fifties: ap.stats.fifties || 0,
                centuries: ap.stats.centuries || 0,
                wicketsTaken: ap.stats.wickets || 0,
                averageWicketTaken: ap.stats.economy || 0
              });
            }
          }
        }
      }

      const list = await adminApi.getProPlayers();
      setState(s => ({
        ...s,
        topPlayers: list.map((p: any) => ({
          id: String(p.player_id),
          name: p.Name,
          nationality: p.Nationality,
          role: p.role,
          battingStyle: p.style,
          bowlingStyle: '',
          debutYear: 2020,
          stats: {
            matches: p.Matches_Played,
            runs: p.runs_scored || 0,
            average: p.runs_scored ? Number((p.runs_scored / p.Matches_Played).toFixed(2)) : 0,
            wickets: p.wickets_taken || 0,
            economy: p.average_Wicket_Taken || 0,
            centuries: p.Centuries || 0,
            fifties: p.fifties || 0
          }
        }))
      }));
    } catch (err: any) {
      alert(err.message || 'Failed to update top players');
    }
  };

  const handleLogSimulation = async (techniqueId: string, techniqueName: string, durationSeconds: number, completed: boolean) => {
    if (!state.currentUser || state.currentUser.role === 'Admin') return;
    try {
      await playerApi.logSimulation(Number(techniqueId), durationSeconds, completed);
      const simLogs = await playerApi.getMySimulationLogs();
      setState(s => ({
        ...s,
        simulationLogs: simLogs.map((log: any) => ({
          id: 'log-' + log.log_id,
          userId: String(state.currentUser!.id),
          techniqueId: String(log.Simulation_id),
          techniqueName: log.simulation_name,
          startedAt: new Date(log.view_time).getTime() - log.Time_Spend_sec * 1000,
          durationSeconds: log.Time_Spend_sec,
          completed: Boolean(log.is_completed)
        }))
      }));
    } catch (err: any) {
      console.error("Failed to log simulation session:", err);
    }
  };

  const goHome = () => setState(s => ({ ...s, view: s.currentUser?.role === 'Admin' ? 'admin' : 'dashboard' }));

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col antialiased">
      <Navigation 
        user={state.currentUser} 
        currentView={state.view} 
        onNavigate={(v) => setState(s => ({ ...s, view: v }))} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10">
        {state.view === 'dashboard' && (
          <Dashboard 
            user={state.currentUser}
            stats={state.stats} 
            events={state.events.filter(e => !e.isArchived)}
            recentTechniques={state.techniques.slice(0, 3)} 
            onOpenTechnique={(id) => setState(s => ({ ...s, activeTechniqueId: id, view: 'viewer' }))}
            onBrowse={() => setState(s => ({ ...s, view: 'browser' }))}
            onNavigateHelp={() => setState(s => ({ ...s, view: 'help' }))}
            onNavigateProfile={() => setState(s => ({ ...s, view: 'profile' }))}
            todayQuote={state.todayQuote}
          />
        )}
        {state.view === 'browser' && <SimulationBrowser techniques={state.techniques} onSelect={(id) => setState(s => ({ ...s, activeTechniqueId: id, view: 'viewer' }))} />}
        {state.view === 'leaderboard' && (
          <TopPlayers players={state.topPlayers} onBack={goHome} />
        )}
        {state.view === 'viewer' && state.activeTechniqueId && (
          <SimulationViewer 
            technique={state.techniques.find(t => t.id === state.activeTechniqueId)!} 
            onBack={() => setState(s => ({ ...s, view: 'browser' }))}
            onComplete={() => handleTechniqueComplete(state.activeTechniqueId!)}
          />
        )}
        {state.view === 'admin' && (
          <AdminPanel 
            state={state}
            onUpdateStatus={handleUpdatePlayerStatus}
            onDeleteUser={handleDeleteUser}
            onUpdateTicket={handleTicketUpdate}
            onManageEvent={handleManageEvent}
            onDeleteEvent={handleDeleteEvent}
            onUpdateTeam={updateTeamInfo}
            onManageTechnique={handleManageTechnique}
            onDeleteTechnique={handleDeleteTechnique}
            onUpdateInstitutes={handleUpdateInstitutes}
            onUpdateQuotes={handleUpdateQuotes}
            onUpdateTopPlayers={handleUpdateTopPlayers}
            simulationLogs={state.simulationLogs}
          />
        )}
        {state.view === 'help' && (
          <HelpDesk 
            user={state.currentUser}
            tickets={state.currentUser.role === 'Admin' ? state.tickets : state.tickets.filter(t => t.userId === state.currentUser!.id)} 
            faqs={state.faqs}
            onSubmit={handleTicketSubmit} 
            onUpdateTicket={handleTicketUpdate}
            onManageFAQ={handleManageFAQ}
            onDeleteFAQ={handleDeleteFAQ}
            onBack={goHome}
          />
        )}
        {state.view === 'team' && (
          <TeamPage team={state.teamInfo} onBack={goHome} />
        )}
        {state.view === 'analytics' && <Analytics stats={state.stats} techniques={state.techniques} />}
        {state.view === 'profile' && (
          <Profile 
            user={state.currentUser} 
            onUpdate={updateProfile} 
            onDeleteRequest={handleDeleteRequest}
            onBack={goHome} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
