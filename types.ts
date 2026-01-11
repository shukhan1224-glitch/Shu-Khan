
export interface Question {
  id: string;
  type?: 'mcq' | 'input' | 'flashcard' | 'sort' | 'detective'; 
  text: string;
  options?: string[];
  correctIndex?: number; 
  validAnswer?: string; 
  explanation: string;
  hint?: string;
  // For 'sort' type
  items?: { id: string; content: string }[];
  correctOrder?: string[];
  template?: string; 
  
  // For 'detective' type
  detectiveData?: {
    caseId?: string;    // NEW: Unique ID for the case (e.g., "case_16_0_iron")
    step?: number;      // NEW: Step number in the case (1, 2, 3)
    mysteryTitle: string; 
    clues: {
      reagent: string; 
      result: string; 
      icon?: string;   
    }[];
    suspects: string[]; 
  };

  // New field for difficulty grouping
  difficulty?: number; 
}

export interface Concept {
  title: string;
  content: string;
  emoji?: string;
}

export interface Story {
  title: string;
  content: string;
  emoji: string; 
  // Added 'surprised', 'welcome', 'calm' and 'history' to the allowed mood union to match level definitions
  mood: 'happy' | 'nervous' | 'challenge' | 'victory' | 'curious' | 'determined' | 'surprised' | 'welcome' | 'thinking' | 'smart' | 'magic' | 'playful' | 'dreamy' | 'excited' | 'fast' | 'hungry' | 'calm' | 'dizzy' | 'history';
}

export interface LevelPhase {
  id: string;
  title: string;
  difficulty: 'normal' | 'hard';
  story?: Story; 
  questions: Question[];
}

export interface Level {
  id: string;
  chapterId: string; 
  grade: 'S1' | 'S2' | 'S3'; 
  title: string;
  description: string;
  locked: boolean;
  completed: boolean;
  score: number;
  position: { x: number; y: number }; 
  concept?: Concept; 
  phases: LevelPhase[]; 
  isFromDB?: boolean; // Added to track data source
  
  // --- New fields for Mastery System ---
  answeredQuestionIds?: string[]; // IDs of unique questions answered correctly
  totalQuestionsCount?: number;   // Cached total count of questions available in this level (DB or Local)
}

export interface StudyPlan {
  days: number[]; 
  time: string; 
  xpTarget: number; 
}

export interface WeeklyProgress {
  weeklyXP: number;
  lastLoginDate: string; 
  daysCompleted: string[]; 
}

export interface UserStats {
  xp: number;
  studyPlan: StudyPlan;
  weeklyProgress: WeeklyProgress;
  elementsCollected: string[]; 
  level: number;
}

export type Profession = 'student' | 'scientist' | 'researcher' | 'nuclear' | 'biochemist' | 'safety';

export interface AvatarConfig {
  skinColor: string;
  hat: 'wizard' | 'goggles' | 'crown' | 'cap' | 'astronaut' | 'none';
  face: 'happy' | 'smart' | 'surprised' | 'determined' | 'dizzy';
  item: 'wand' | 'flask' | 'book' | 'atom' | 'dna' | 'none';
  profession?: Profession; 
  pattern?: 'none' | 'spots' | 'stripes' | 'sparkles';
  bgEffect?: 'none' | 'aura' | 'bubbles' | 'stars';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export enum View {
  MAP = 'MAP',
  MISTAKE_BOOK = 'MISTAKE_BOOK',
  COMMUNITY = 'COMMUNITY', 
  SOCIAL = 'SOCIAL',       
  PROFILE = 'PROFILE',
  AUTH = 'AUTH'
}

export interface Mistake {
  id: string;
  question: Question;
  userAnswer: string;
  timestamp: number;
}

export interface ElementDetail {
  symbol: string;
  name: string;
  atomicNumber: number;
  category: string;
  funFact: string;
  description: string;
  visual: {
    gradient: string;
    shape: 'circle' | 'crystal' | 'cloud' | 'glow'; // Shapes used for decoration
    color: string;
  };
  image?: string; // Optional real image URL
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  isCorrectAnswer?: boolean; 
  timestamp: string;
}

export interface SocialPost {
  id: string;
  author: string;
  avatar: string; 
  type: 'share' | 'question'; 
  status: 'pending' | 'approved' | 'rejected'; 
  content: string;
  image?: string; 
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  timestamp: string;
  xpReward?: number; 
  solved?: boolean;
  authorId?: string; // NEW: To link to follow system
}

export interface Tier {
  id: string;
  name: string;
  minXP: number;
  maxXP: number; 
  color: string; 
  bgGradient: string; 
  icon: string; 
  description: string;
}

export interface User {
  id: string;
  username: string;
  role: 'student' | 'admin'; 
  email?: string;
  password?: string; 
  stats: UserStats;
  avatarConfig: AvatarConfig;
  levels: Level[]; 
  mistakes: Mistake[];
  following: string[]; // NEW: List of User IDs this user follows
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}
