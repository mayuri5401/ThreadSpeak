import React, { useState, useRef, useEffect } from 'react';
import { 
  Coffee, Leaf, Layers, Code, Terminal, 
  Sparkles, CheckCircle2, Menu, X, BarChart3,
  Moon, Sun, Flame, Award, Zap, Calendar, TrendingUp
} from 'lucide-react';

export default function Navbar({ 
  currentTrack, 
  onSelectTrack, 
  currentView, 
  onSelectView, 
  completedCount = 0,
  totalTopics = 509,
  onToggleSidebar
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // THEME STATE (Dark Mode vs Clean White Shade Light Mode)
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    try {
      return localStorage.getItem('threadspeak_theme_id') || 'midnight';
    } catch {
      return 'midnight';
    }
  });

  const applyTheme = (themeId) => {
    setCurrentThemeId(themeId);
    try {
      localStorage.setItem('threadspeak_theme_id', themeId);
      document.documentElement.setAttribute('data-theme', themeId);
      if (themeId === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      }
    } catch (e) {
      console.warn('Failed to set theme', e);
    }
  };

  // Direct 1-Click Dark/White Shade Toggle
  const handleQuickToggleTheme = () => {
    if (currentThemeId === 'light') {
      applyTheme('midnight');
    } else {
      applyTheme('light');
    }
  };

  useEffect(() => {
    applyTheme(currentThemeId);
  }, []);

  // STREAK STATE
  const [showStreakModal, setShowStreakModal] = useState(false);
  const streakRef = useRef(null);
  const [streakCount, setStreakCount] = useState(() => {
    try {
      return Number(localStorage.getItem('threadspeak_streak')) || 5;
    } catch {
      return 5;
    }
  });

  const tracks = [
    { id: 'core-java', label: 'Core Java', icon: Coffee, color: 'text-amber-400', glow: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/50' },
    { id: 'spring-boot', label: 'Spring Boot', icon: Leaf, color: 'text-emerald-400', glow: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/50' },
    { id: 'system-design', label: 'System Design', icon: Layers, color: 'text-indigo-400', glow: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500/50' },
    { id: 'dsa', label: 'DSA', icon: Code, color: 'text-cyan-400', glow: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-500/50' },
  ];

  const views = [
    { id: 'playground', label: 'Playground', icon: Terminal, color: 'text-cyan-400', activeClass: 'text-cyan-300' },
    { id: 'progress', label: 'Progress', icon: BarChart3, color: 'text-emerald-400', activeClass: 'text-emerald-300', extra: true },
    { id: 'quiz', label: 'Quiz', icon: Sparkles, color: 'text-purple-400', activeClass: 'text-purple-300' },
    { id: 'profile', label: 'Profile', icon: null, color: 'text-indigo-400', activeClass: 'text-indigo-300', isProfile: true },
  ];

  const percentage = Math.min(100, Math.round((completedCount / (totalTopics || 1)) * 100));

  // Close streak modal on Click Outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (streakRef.current && !streakRef.current.contains(e.target)) {
        setShowStreakModal(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sliding Bubble Pill Indicator for Tracks
  const trackContainerRef = useRef(null);
  const [trackBubble, setTrackBubble] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    if (!trackContainerRef.current) return;
    const isTopicsView = currentView === 'topics';
    if (!isTopicsView) {
      setTrackBubble(prev => ({ ...prev, opacity: 0 }));
      return;
    }

    const activeIndex = tracks.findIndex(t => t.id === currentTrack);
    const buttons = trackContainerRef.current.querySelectorAll('.track-tab-btn');
    if (buttons && buttons[activeIndex]) {
      const el = buttons[activeIndex];
      setTrackBubble({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1
      });
    }
  }, [currentTrack, currentView]);

  // Sliding Bubble Pill Indicator for Views
  const viewContainerRef = useRef(null);
  const [viewBubble, setViewBubble] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    if (!viewContainerRef.current) return;
    const isTopicTrackView = currentView === 'topics';
    if (isTopicTrackView) {
      setViewBubble(prev => ({ ...prev, opacity: 0 }));
      return;
    }

    const activeIndex = views.findIndex(v => v.id === currentView);
    const buttons = viewContainerRef.current.querySelectorAll('.view-tab-btn');
    if (buttons && buttons[activeIndex]) {
      const el = buttons[activeIndex];
      setViewBubble({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1
      });
    }
  }, [currentView]);

  const isLight = currentThemeId === 'light';

  return (
    <header className="sticky top-0 z-40 bg-[#070B14]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/50 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Logo & Sidebar Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Topic Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => { onSelectView('topics'); onSelectTrack('core-java'); }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1">
                  Thread<span className="text-cyan-400">Speak</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 block -mt-1">
                  Java &amp; System Design Academy
                </span>
              </div>
            </button>
          </div>

          {/* Center: The 4 Core Tracks with Animated Sliding Bubble Pill */}
          <nav 
            ref={trackContainerRef}
            className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-[#090E1A] border border-slate-800/90 relative shadow-inner"
          >
            {/* Sliding Bubble Background Indicator */}
            <div 
              className="absolute top-1 bottom-1 rounded-xl bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-800 border border-cyan-500/40 shadow-lg shadow-cyan-950/40 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
              style={{
                left: `${trackBubble.left}px`,
                width: `${trackBubble.width}px`,
                opacity: trackBubble.opacity
              }}
            />

            {tracks.map(t => {
              const Icon = t.icon;
              const isSelected = currentTrack === t.id && currentView === 'topics';

              return (
                <button
                  key={t.id}
                  onClick={() => { onSelectTrack(t.id); onSelectView('topics'); }}
                  className={`track-tab-btn relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors duration-200 ${
                    isSelected
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${t.color}`} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Views + 1-Click Dark/White Toggle + Palette Button + Flame Streak Button */}
          <div className="flex items-center gap-2">
            
            {/* Main Views Tabs */}
            <div 
              ref={viewContainerRef}
              className="hidden sm:flex items-center gap-1 p-1 rounded-2xl bg-[#090E1A] border border-slate-800/90 relative shadow-inner"
            >
              {/* Sliding Bubble Background Indicator for Views */}
              <div 
                className="absolute top-1 bottom-1 rounded-xl bg-gradient-to-r from-cyan-950/80 via-slate-800/90 to-indigo-950/80 border border-cyan-400/40 shadow-lg shadow-cyan-950/50 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
                style={{
                  left: `${viewBubble.left}px`,
                  width: `${viewBubble.width}px`,
                  opacity: viewBubble.opacity
                }}
              />

              {/* 1. Playground */}
              <button
                onClick={() => onSelectView('playground')}
                className={`view-tab-btn relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors duration-200 ${
                  currentView === 'playground' ? 'text-cyan-300' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Open Java 21 Virtual Engine Playground"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Playground</span>
              </button>

              {/* 2. Progress */}
              <button
                onClick={() => onSelectView('progress')}
                className={`view-tab-btn relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors duration-200 ${
                  currentView === 'progress' ? 'text-emerald-300' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="View your learning progress"
              >
                <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Progress</span>
                <span className="px-1.5 py-0.2 rounded-md bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-[10px] font-mono">
                  {percentage}%
                </span>
              </button>

              {/* 3. Quiz */}
              <button
                onClick={() => onSelectView('quiz')}
                className={`view-tab-btn relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors duration-200 ${
                  currentView === 'quiz' ? 'text-purple-300' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Interactive Assessments & Quizzes"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Quiz</span>
              </button>

              {/* 4. Profile */}
              <button
                onClick={() => onSelectView('profile')}
                className={`view-tab-btn relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors duration-200 ${
                  currentView === 'profile' ? 'text-indigo-300' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="View your profile, solved challenges, and saved solutions"
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] text-white">
                  👤
                </div>
                <span>Profile</span>
              </button>
            </div>

            {/* 🌙 / ☀️ DIRECT 1-CLICK DARK / WHITE SHADE TOGGLE BUTTON */}
            <button
              type="button"
              onClick={handleQuickToggleTheme}
              className={`p-2 rounded-xl border transition shadow-sm cursor-pointer active:scale-95 flex items-center justify-center ${
                isLight 
                  ? 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-600' 
                  : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={isLight ? "Switch to Dark Mode" : "Switch to White Shade (Light Mode)"}
              aria-label="Toggle Dark / Light Mode"
            >
              {isLight ? (
                <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-slate-200" />
              )}
            </button>

            {/* 🔥 FLAME / LEARNING STREAK BUTTON */}
            <div className="relative" ref={streakRef}>
              <button
                type="button"
                onClick={() => setShowStreakModal(!showStreakModal)}
                className="p-2 rounded-xl bg-amber-950/40 hover:bg-amber-950/60 border border-amber-500/50 hover:border-amber-400 text-amber-400 hover:text-amber-300 transition shadow-md shadow-amber-500/10 flex items-center gap-1.5 cursor-pointer active:scale-95 group"
                title="Daily Learning Streak"
                aria-label="Daily Streak"
              >
                <Flame className="w-4 h-4 text-amber-400 fill-amber-500/20 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xs font-mono font-bold text-amber-300 hidden md:inline">
                  {streakCount}
                </span>
              </button>

              {/* STREAK POPOVER MODAL */}
              {showStreakModal && (
                <div className="absolute right-0 mt-3 w-72 p-4 rounded-2xl bg-[#090E1A] border border-amber-500/40 shadow-2xl shadow-amber-950/40 z-50 animate-in fade-in zoom-in-95 duration-200 text-white font-sans">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                        <Flame className="w-4 h-4 fill-amber-500/30" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Daily Streak Active</div>
                        <div className="text-[10px] text-amber-400/90 font-mono font-semibold">
                          {streakCount} Days in a row 🔥
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300">
                      Level 3
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs text-slate-300">
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      You have practiced Java &amp; Reflection for <b className="text-amber-300">{streakCount} consecutive days</b>. Complete today's topic to maintain your multiplier!
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Today's Target</span>
                      </span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-3">
            {/* Mobile Tracks */}
            <div className="grid grid-cols-2 gap-2">
              {tracks.map(t => (
                <button
                  key={t.id}
                  onClick={() => { onSelectTrack(t.id); onSelectView('topics'); setIsMobileMenuOpen(false); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center gap-2 ${
                    currentTrack === t.id && currentView === 'topics'
                      ? 'bg-slate-800 border-cyan-500 text-white'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}
                >
                  <t.icon className={`w-4 h-4 ${t.color}`} />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Views */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60">
              {views.map(v => {
                const Icon = v.icon;
                const isSelected = currentView === v.id;

                return (
                  <button
                    key={v.id}
                    onClick={() => { onSelectView(v.id); setIsMobileMenuOpen(false); }}
                    className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-800 border-cyan-500 text-cyan-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {Icon ? (
                        <Icon className={`w-4 h-4 ${v.color}`} />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-[9px] text-white">
                          👤
                        </div>
                      )}
                      <span>{v.label}</span>
                    </div>
                    {v.extra && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400">
                        {percentage}%
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
