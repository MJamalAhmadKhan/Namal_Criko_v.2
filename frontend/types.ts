
export type Category = 'Batting' | 'Bowling';
export type SubCategory = 'Defensive' | 'Attacking' | 'Fast' | 'Spin' | 'Medium-Pace';
export type UserRole = 'Player' | 'Admin';
export type UserStatus = 'Pending' | 'Active' | 'Rejected' | 'Suspended';

export type UserType = 'Student' | 'Other';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  rollNo?: string;
  contact?: string;
  avatar?: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: number;
  userType?: UserType;
  instituteName?: string;
  designation?: string;
}

export interface SimulationFrame {
  id: string;
  description: string;
  imageUrl?: string;
  keyPoints: string[];
}

export interface Technique {
  id: string;
  name: string;
  category: Category;
  subCategory: SubCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  frames: SimulationFrame[];
  commonMistakes: { desc: string; correction?: string; }[];
  duration?: number;
  assetType?: 'Video' | 'Image' | 'Text';
  assetUrl?: string;
  videoUrl?: string;
}

export interface CricketEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
  type: 'Match' | 'Trial' | 'Advertisement' | 'Announcement';
  registrationLink?: string;
  isArchived: boolean;
}

export interface UserStats {
  techniquesMastered: string[]; 
  timeSpentMinutes: number;
  streakDays: number;
  lastActive: number;
}

export interface HelpTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  category: 'Technical' | 'Content' | 'Account';
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  adminResponse?: string;
  createdAt: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  type: 'Login' | 'Profile Update' | 'Technique Mastered' | 'Ticket Created' | 'Account Deletion Request';
  detail: string;
  timestamp: number;
}

export interface TeamInfo {
  officeEmail: string;
  officePhone: string;
  officeLocation: string;
  leadCoach: string;
  supportLead: string;
}

// Added missing SRS types to resolve build errors in DeckView and ReviewSession components
export enum ReviewGrade {
  AGAIN = 'AGAIN',
  HARD = 'HARD',
  GOOD = 'GOOD',
  EASY = 'EASY'
}

export interface Card {
  id: string;
  front: string;
  back: string;
  explanation?: string;
  nextReviewAt: number;
  deckId: string;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  color?: string;
}

export interface AppState {
  currentUser: UserAccount | null;
  users: UserAccount[];
  techniques: Technique[];
  events: CricketEvent[];
  stats: UserStats;
  tickets: HelpTicket[];
  faqs: FAQ[];
  activityLogs: ActivityLog[];
  teamInfo: TeamInfo;
  activeTechniqueId: string | null;
  institutes: string[];
  // Added 'reports' to the view union to resolve type errors in the navigation system
  topPlayers: TopPlayer[];
  quotes: Quote[];
  todayQuote: Quote | null;
  simulationLogs: SimulationLog[];
  view: 'landing' | 'login' | 'signup' | 'dashboard' | 'browser' | 'viewer' | 'help' | 'admin' | 'analytics' | 'profile' | 'team' | 'reports' | 'leaderboard';
}

// Institutes list managed by admin
export type InstituteList = string[];

// ── Top Players ────────────────────────────────────────────────
export interface PlayerStats {
  matches: number;
  runs: number;
  average: number;
  wickets: number;
  economy: number;
  centuries: number;
  fifties: number;
}

export interface TopPlayer {
  id: string;
  name: string;
  nationality: string;
  role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  battingStyle: string;
  bowlingStyle: string;
  debutYear: number;
  imageUrl?: string;
  stats: PlayerStats;
}

// ── Quote of the Day ───────────────────────────────────────────
export type QuoteCategory = 'BATTING' | 'BOWLING' | 'GENERAL' | 'MINDSET';

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: QuoteCategory;
  isActive: boolean;
}

// ── Simulation Access Log ──────────────────────────────────────
export interface SimulationLog {
  id: string;
  userId: string;
  techniqueId: string;
  techniqueName: string;
  startedAt: number;
  durationSeconds: number;
  completed: boolean;
}
