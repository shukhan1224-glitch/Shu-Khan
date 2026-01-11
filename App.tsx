
import React, { useState, useEffect } from 'react';
import { motion as m } from 'framer-motion';
import { View, Level, UserStats, Mistake, Question, AvatarConfig, User, StudyPlan, ElementDetail } from './types';
import { INITIAL_LEVELS, ALL_ELEMENT_SYMBOLS, ELEMENT_DETAILS } from './constants';
import { Navigation } from './components/Navigation';
import { LearningMap } from './components/LearningMap';
import { QuizModal } from './components/QuizModal';
import { Community } from './components/Community';
import { SocialFeed } from './components/SocialFeed';
import { MistakeBook } from './components/MistakeBook';
import { Profile } from './components/Profile';
import { AuthScreen } from './components/AuthScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ElementDropModal } from './components/ElementDropModal'; // New Import
import { authService } from './services/authService';
import { fetchQuestionsForLevel } from './services/questionService';
import { isSupabaseLive } from './services/supabaseClient';
import { Cloud, CloudCheck, CloudOff, Loader2 } from 'lucide-react';
import { Mascot } from './components/Mascot';

const motion = m as any;

const PotionBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-cream-100 to-magic-light/20">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-potion/10"
        style={{
          width: Math.random() * 50 + 20 + 'px',
          height: Math.random() * 50 + 20 + 'px',
          left: Math.random() * 100 + '%',
          animation: `bubble-rise ${Math.random() * 10 + 10}s infinite ease-in`,
          animationDelay: `${Math.random() * 5}s`
        }}
      />
    ))}
  </div>
);

const DEFAULT_STATS: UserStats = {
  xp: 0,
  studyPlan: { days: [1, 3, 5], time: '19:00', xpTarget: 50 },
  weeklyProgress: { weeklyXP: 0, lastLoginDate: '', daysCompleted: [] },
  elementsCollected: ['H', 'He', 'Li', 'C', 'O'], // Give a few starters
  level: 1
};

const DEFAULT_AVATAR: AvatarConfig = {
  skinColor: '#C0Aede',
  hat: 'wizard',
  face: 'happy',
  item: 'wand',
  profession: 'student',
  pattern: 'none',
  bgEffect: 'none'
};

const App: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true); 
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoadingLevel, setIsLoadingLevel] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // New state for element drop
  const [newlyFoundElement, setNewlyFoundElement] = useState<ElementDetail | null>(null);

  const [currentView, setCurrentView] = useState<View>(View.MAP);
  const [levels, setLevels] = useState<Level[]>(INITIAL_LEVELS);
  
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [startPhaseIdx, setStartPhaseIdx] = useState(0);

  const [userStats, setUserStats] = useState<UserStats>(DEFAULT_STATS);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);

  // 初始化
  useEffect(() => {
    const initApp = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          loadUserData(user, true); // True for initial load
        }
      } catch (e) {
        console.error("Initialization error", e);
      } finally {
        setIsInitializing(false);
      }
    };
    initApp();
  }, []);

  const loadUserData = (user: User, isInitial: boolean = false) => {
    setCurrentUser(user);
    setUserStats(user.stats || DEFAULT_STATS);
    setAvatarConfig(user.avatarConfig || DEFAULT_AVATAR);
    
    // --- LEVEL MERGE LOGIC ---
    // Ensure we use the latest code structure (INITIAL_LEVELS) for titles/content,
    // but overlay the user's progress (completed/locked/score/answeredIds) from DB.
    const mergedLevels = INITIAL_LEVELS.map(initialLevel => {
      const userLevel = user.levels?.find(l => l.id === initialLevel.id);
      if (userLevel) {
        return {
          ...initialLevel, // Keep structure from code
          locked: userLevel.locked,
          completed: userLevel.completed,
          score: Math.max(userLevel.score || 0, initialLevel.score || 0),
          answeredQuestionIds: userLevel.answeredQuestionIds || [],
          totalQuestionsCount: userLevel.totalQuestionsCount // Optionally keep saved total
        };
      }
      return initialLevel; // New level or not found in DB
    });
    
    setLevels(mergedLevels);
    setMistakes(user.mistakes || []);
    
    // Show welcome screen on fresh data load
    if (isInitial || !currentUser) {
        setShowWelcome(true);
    }
  };

  // 自动同步
  useEffect(() => {
    if (!isInitializing && currentUser) {
       const sync = async () => {
          setIsSyncing(true);
          const updatedUser: User = {
            ...currentUser,
            stats: userStats,
            avatarConfig: avatarConfig,
            levels: levels,
            mistakes: mistakes
          };
          await authService.saveProgress(updatedUser);
          setTimeout(() => setIsSyncing(false), 800);
       };
       sync();
    }
  }, [userStats, avatarConfig, levels, mistakes]);

  const handleLogin = (user: User) => {
    loadUserData(user, true);
  };

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setUserStats(DEFAULT_STATS);
    setAvatarConfig(DEFAULT_AVATAR);
    setLevels(INITIAL_LEVELS);
    setMistakes([]);
    setShowWelcome(false);
  };

  const handleLevelClick = async (level: Level, phaseIndex: number = 0) => {
     setIsLoadingLevel(true);
     try {
       // Fetch latest questions from Supabase (if any)
       const hydratedLevel = await fetchQuestionsForLevel(level);
       // Ensure answeredQuestionIds persists from local level state to hydrated active level
       const active = {
           ...hydratedLevel,
           answeredQuestionIds: level.answeredQuestionIds || []
       };
       setActiveLevel(active);
       setStartPhaseIdx(phaseIndex);
     } catch (e) {
       console.error("Failed to load level", e);
       // Fallback to local level
       setActiveLevel(level);
       setStartPhaseIdx(phaseIndex);
     } finally {
       setIsLoadingLevel(false);
     }
  };

  const handleLevelComplete = (xpGained: number, newMistakes: { question: Question; userAnswer: string }[], correctQuestionIds: string[]) => {
    if (!activeLevel) return;

    let newElement: string | null = null;

    // --- ELEMENT DROP LOGIC ---
    // 60% chance to find a new element if not all are collected
    const collectedSet = new Set(userStats.elementsCollected);
    const uncollected = ALL_ELEMENT_SYMBOLS.filter(s => !collectedSet.has(s));
    
    if (uncollected.length > 0 && Math.random() < 0.6) {
       const randomIndex = Math.floor(Math.random() * uncollected.length);
       newElement = uncollected[randomIndex];
    }

    setUserStats(prev => ({
       ...prev,
       xp: prev.xp + xpGained,
       weeklyProgress: {
          ...prev.weeklyProgress,
          weeklyXP: (prev.weeklyProgress?.weeklyXP || 0) + xpGained
       },
       // Add new element if found
       elementsCollected: newElement ? [...prev.elementsCollected, newElement] : prev.elementsCollected
    }));

    const currentIdx = levels.findIndex(l => l.id === activeLevel.id);
    const updatedLevels = [...levels];
    if (currentIdx !== -1) {
       const lvl = updatedLevels[currentIdx];
       
       // Update Completion
       lvl.completed = true;
       lvl.score = Math.max(lvl.score, xpGained);
       
       // Unlock Next
       if (currentIdx + 1 < levels.length) updatedLevels[currentIdx + 1].locked = false;
       
       // --- MASTERY UPDATE ---
       // Merge new correct IDs with existing ones
       const existingCorrect = new Set(lvl.answeredQuestionIds || []);
       correctQuestionIds.forEach(id => existingCorrect.add(id));
       lvl.answeredQuestionIds = Array.from(existingCorrect);
       
       // Update total count from active level (which has full DB question list)
       // This ensures the percentage calculation is accurate
       if (activeLevel.totalQuestionsCount) {
           lvl.totalQuestionsCount = activeLevel.totalQuestionsCount;
       }

       setLevels(updatedLevels);
    }

    if (newMistakes.length > 0) {
      const mistakeEntries: Mistake[] = newMistakes.map(m => ({
        id: Date.now() + Math.random().toString(),
        question: m.question,
        userAnswer: m.userAnswer,
        timestamp: Date.now()
      }));
      setMistakes(prev => [...prev, ...mistakeEntries]);
    }

    setActiveLevel(null);

    // Show drop modal if new element found
    if (newElement && ELEMENT_DETAILS[newElement]) {
       setTimeout(() => {
          setNewlyFoundElement(ELEMENT_DETAILS[newElement!]);
       }, 500); // Slight delay for smoother transition
    }
  };

  const getNextPlayableLevel = (): Level => {
      const current = levels.find(l => !l.locked && !l.completed);
      if (current) return current;
      const lastUnlocked = [...levels].reverse().find(l => !l.locked);
      if (lastUnlocked) return lastUnlocked;
      return levels[0];
  };

  if (isInitializing) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-cream">
      <Mascot size={100} mood="thinking" />
      <p className="mt-4 font-magic text-magic-dark animate-pulse">Octo 正在查找档案...</p>
    </div>
  );

  if (!currentUser) return <AuthScreen onLogin={handleLogin} />;

  const isAdmin = currentUser.role === 'admin';

  return (
    <div className="font-cute text-slate-700 h-screen w-full flex relative overflow-hidden">
      <PotionBackground />
      
      {/* Welcome Screen Overlay */}
      {showWelcome && (
         <WelcomeScreen 
            username={currentUser.username} 
            avatarConfig={avatarConfig} 
            nextLevel={getNextPlayableLevel()}
            onContinue={() => setShowWelcome(false)}
         />
      )}

      {/* New Element Drop Modal */}
      {newlyFoundElement && (
         <ElementDropModal 
            element={newlyFoundElement} 
            onClose={() => setNewlyFoundElement(null)} 
         />
      )}

      {!activeLevel && (
        <aside className="shrink-0 z-40 relative">
           <Navigation 
             currentView={currentView} 
             setView={setCurrentView} 
             avatarConfig={avatarConfig} 
             profession={avatarConfig.profession}
           />
           <div className="absolute bottom-4 left-6 z-50 flex items-center gap-1.5 px-3 py-1 bg-white/50 backdrop-blur-md rounded-full border border-white/50 shadow-sm">
              {!isSupabaseLive ? (
                 <>
                    <CloudOff size={12} className="text-slate-400" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Local Mode</span>
                 </>
              ) : isSyncing ? (
                 <>
                    <Cloud size={12} className="text-magic animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Syncing...</span>
                 </>
              ) : (
                 <>
                    <CloudCheck size={12} className="text-mint-dark" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Cloud Saved</span>
                 </>
              )}
           </div>
        </aside>
      )}
      
      <main className="flex-1 h-full overflow-y-auto relative bg-transparent">
        {currentView === View.MAP && <LearningMap levels={levels} onLevelClick={handleLevelClick} isAdmin={isAdmin} />}
        {currentView === View.MISTAKE_BOOK && <MistakeBook mistakes={mistakes} onRemoveMistake={id => setMistakes(m => m.filter(x => x.id !== id))} />}
        {currentView === View.COMMUNITY && <Community onBack={() => setCurrentView(View.MAP)} userAvatarConfig={avatarConfig} />}
        {currentView === View.SOCIAL && <SocialFeed onEarnXP={amt => setUserStats(s => ({...s, xp: s.xp + amt}))} currentUserAvatarConfig={avatarConfig} currentUserName={currentUser.username} isAdmin={isAdmin} />}
        {currentView === View.PROFILE && <Profile stats={userStats} avatarConfig={avatarConfig} onUpdateAvatar={setAvatarConfig} onLogout={handleLogout} onUpdatePlan={p => setUserStats(s => ({...s, studyPlan: p}))} userEmail={currentUser.email} />}
      </main>

      {isLoadingLevel && (
         <div className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm flex items-center justify-center">
             <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <Loader2 size={24} className="animate-spin text-magic" />
                <span className="font-bold text-slate-700">正在加载题目...</span>
             </div>
         </div>
      )}

      {activeLevel && (
        <QuizModal 
          level={activeLevel} 
          initialPhaseIndex={startPhaseIdx}
          onClose={() => setActiveLevel(null)} 
          onComplete={handleLevelComplete}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
};

export default App;
