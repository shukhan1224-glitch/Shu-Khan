
import React, { useState, useEffect, useRef } from 'react';
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
import { Cloud, CloudCheck, CloudOff, Loader2, LogOut } from 'lucide-react';
import { Mascot } from './components/Mascot';

const motion = m as any;

// --- CONFIGURATION ---
// Auto-logout time in milliseconds (e.g., 30 minutes = 30 * 60 * 1000)
const INACTIVITY_LIMIT = 30 * 60 * 1000; 

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
  const [showAutoLogoutMsg, setShowAutoLogoutMsg] = useState(false);

  // New state for element drop
  const [newlyFoundElement, setNewlyFoundElement] = useState<ElementDetail | null>(null);

  const [currentView, setCurrentView] = useState<View>(View.MAP);
  const [levels, setLevels] = useState<Level[]>(INITIAL_LEVELS);
  
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [startPhaseIdx, setStartPhaseIdx] = useState(0);

  const [userStats, setUserStats] = useState<UserStats>(DEFAULT_STATS);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [following, setFollowing] = useState<string[]>([]); // New State

  // Timer Ref for Inactivity
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    setFollowing(user.following || []); // Load following
    
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
            mistakes: mistakes,
            following: following
          };
          await authService.saveProgress(updatedUser);
          setTimeout(() => setIsSyncing(false), 800);
       };
       sync();
    }
  }, [userStats, avatarConfig, levels, mistakes, following]);

  // --- AUTO LOGOUT LOGIC ---
  const handleLogout = async (isAuto: boolean = false) => {
    await authService.logout();
    
    // Clear timer
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

    setCurrentUser(null);
    setUserStats(DEFAULT_STATS);
    setAvatarConfig(DEFAULT_AVATAR);
    setLevels(INITIAL_LEVELS);
    setMistakes([]);
    setFollowing([]);
    setShowWelcome(false);
    
    if (isAuto) {
        setShowAutoLogoutMsg(true);
        setTimeout(() => setShowAutoLogoutMsg(false), 4000);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    const resetTimer = () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        console.log("User inactive for too long, logging out...");
        handleLogout(true);
      }, INACTIVITY_LIMIT);
    };

    // Events to track activity
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    
    // Add listeners
    events.forEach(event => window.addEventListener(event, resetTimer));
    
    // Initialize timer
    resetTimer();

    // Cleanup
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [currentUser]);


  const handleLogin = (user: User) => {
    loadUserData(user, true);
  };

  const handleToggleFollow = (targetId: string) => {
      if (following.includes(targetId)) {
          setFollowing(prev => prev.filter(id => id !== targetId));
      } else {
          setFollowing(prev => [...prev, targetId]);
      }
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

  // Auto Logout Toast Notification
  if (!currentUser && showAutoLogoutMsg) {
      return (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-xs animate-bounce-slow">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                      <LogOut size={32} />
                  </div>
                  <h3 className="font-black text-xl text-slate-800 mb-2">已安全登出</h3>
                  <p className="text-slate-500 text-sm mb-4">由于长时间未操作，Octo 帮您暂时关闭了实验室以确保安全。</p>
                  <button 
                    onClick={() => setShowAutoLogoutMsg(false)}
                    className="bg-magic text-white px-6 py-2 rounded-xl font-bold hover:bg-magic-dark transition-colors"
                  >
                    重新登录
                  </button>
              </div>
          </div>
      );
  }

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
        {currentView === View.SOCIAL && (
            <SocialFeed 
               onEarnXP={amt => setUserStats(s => ({...s, xp: s.xp + amt}))} 
               currentUserAvatarConfig={avatarConfig} 
               currentUserName={currentUser.username} 
               isAdmin={isAdmin} 
               onUnlockAvatar={(newConfig) => {
                  setAvatarConfig(prev => ({ ...prev, ...newConfig }));
               }}
               following={following}
               onToggleFollow={handleToggleFollow}
            />
        )}
        {currentView === View.PROFILE && (
            <Profile 
                stats={userStats} 
                avatarConfig={avatarConfig} 
                onUpdateAvatar={setAvatarConfig} 
                onLogout={() => handleLogout(false)} 
                onUpdatePlan={p => setUserStats(s => ({...s, studyPlan: p}))} 
                userEmail={currentUser.email}
                following={following}
                onToggleFollow={handleToggleFollow}
            />
        )}
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
