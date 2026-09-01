import React, { useState, useRef, useEffect } from 'react';
import { 
  Coffee, Leaf, Layers, Code, Terminal, 
  Sparkles, CheckCircle2, Menu, X, BarChart3,
  Moon, Sun, Flame, Award, Zap, Calendar, TrendingUp,
  ChevronDown, BookOpen, Cpu, Database, Server, Star,
  Bot, FileText, Map, Video, Briefcase, Github, Shield, Trophy
} from 'lucide-react';
import InterviewModal from '../modals/InterviewModal';
import ResourcesModal from '../modals/ResourcesModal';
import { getUserProfile } from '../../shared/services/avatarService';

export default function Navbar({ 
  currentTrack = 'core-java', 
  onSelectTrack, 
  currentView, 
  onSelectView, 
  completedCount = 0, 
  totalTopics = 540,
  onToggleSidebar,
  onOpenPlayground,
  currentSubSection,
  onSelectSubSection
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'learn' | 'practice' | 'interview' | 'resources' | null
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);

  const [userAvatarUrl, setUserAvatarUrl] = useState(() => getUserProfile().avatarUrl);
  const [userProfileName, setUserProfileName] = useState(() => getUserProfile().userName);

  const navRef = useRef(null);

  // Auto-dismiss dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // THEME STATE
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

  // Streak state
  const [streakCount] = useState(() => {
    try {
      return Number(localStorage.getItem('threadspeak_streak')) || 7;
    } catch {
      return 7;
    }
  });

  const isLight = currentThemeId === 'light';

  const handleSelectMenuCourse = (trackId, subSection = null) => {
    onSelectTrack?.(trackId);
    if (subSection && onSelectSubSection) {
      onSelectSubSection(subSection);
    }
    onSelectView?.('topics');
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleSelectPracticeScenario = (type) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    if (type === 'dsa') {
      onSelectTrack?.('dsa');
      onSelectView?.('playground');
    } else if (type === 'system-design') {
      onSelectTrack?.('system-design');
      onSelectView?.('topics');
    } else if (type === 'concurrency') {
      onOpenPlayground?.(`// Java 21 Concurrency & Virtual Threads Benchmark\nimport java.util.concurrent.*;\n\npublic class ConcurrencyBenchmark {\n    public static void main(String[] args) throws Exception {\n        System.out.println("Running High-Throughput Virtual Thread Benchmark...");\n        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n            for (int i = 0; i < 500; i++) {\n                final int id = i;\n                executor.submit(() -> {\n                    Thread.sleep(10);\n                    return id;\n                });\n            }\n        }\n        System.out.println("✓ 500 Virtual Threads completed with zero OS thread overhead!");\n    }\n}`);
      onSelectView?.('playground');
    } else if (type === 'lld') {
      onSelectTrack?.('system-design');
      onSelectView?.('topics');
    } else if (type === 'company-wise') {
      onSelectView?.('quiz');
    }
  };

  // Sliding Bubble Pill Indicator for the 4 Top Menus
  const navContainerRef = useRef(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [menuBubble, setMenuBubble] = useState({ left: 0, width: 0, opacity: 0, colorClass: 'border-emerald-500/50 bg-emerald-500/20' });

  const activeTarget = hoveredMenu || activeDropdown || (currentView === 'playground' ? 'practice' : currentView === 'topics' ? 'learn' : null);

  const updateBubblePosition = () => {
    if (!navContainerRef.current) return;
    if (!activeTarget) {
      setMenuBubble(prev => ({ ...prev, opacity: 0 }));
      return;
    }

    const menuIds = ['learn', 'practice', 'interview', 'resources'];
    const activeIndex = menuIds.indexOf(activeTarget);
    const buttons = navContainerRef.current.querySelectorAll('.nav-menu-btn');
    
    if (buttons && buttons[activeIndex]) {
      const el = buttons[activeIndex];
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      const colorMap = {
        learn: 'border-emerald-500/50 bg-emerald-500/20 shadow-emerald-500/20',
        practice: 'border-cyan-500/50 bg-cyan-500/20 shadow-cyan-500/20',
        interview: 'border-purple-500/50 bg-purple-500/20 shadow-purple-500/20',
        resources: 'border-amber-500/50 bg-amber-500/20 shadow-amber-500/20',
      };

      setMenuBubble({
        left: elRect.left - containerRect.left,
        width: elRect.width,
        opacity: 1,
        colorClass: colorMap[activeTarget] || 'border-emerald-500/50 bg-emerald-500/20'
      });
    }
  };

  useEffect(() => {
    updateBubblePosition();
    window.addEventListener('resize', updateBubblePosition);
    return () => window.removeEventListener('resize', updateBubblePosition);
  }, [activeTarget, activeDropdown, currentView]);

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-[#070B14]/95 light:bg-white/95 backdrop-blur-xl border-b border-slate-800/80 light:border-slate-200 shadow-lg shadow-black/20 light:shadow-sm transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-700 hover:text-white"
              aria-label="Toggle Topic Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => { onSelectView?.('topics'); onSelectTrack?.('core-java'); }}
              className="flex items-center gap-2.5 text-left group shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#070B14] light:bg-white rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-white light:text-slate-900 flex items-center gap-0.5">
                  Thread<span className="text-emerald-400">Speak</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 light:text-slate-500 block -mt-1 font-medium">
                  Academy &amp; System Design
                </span>
              </div>
            </button>
          </div>

          {/* ── 4 Main Top-Level Navigation Dropdowns with Animated Sliding Bubble ── */}
          <nav 
            ref={navContainerRef}
            onMouseLeave={() => setHoveredMenu(null)}
            className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-slate-900/80 light:bg-slate-100/90 border border-slate-800/90 light:border-slate-200/90 relative shadow-inner"
          >
            {/* Sliding Bubble Background Indicator */}
            <div 
              className={`absolute top-1 bottom-1 rounded-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none border shadow-md ${
                isLight
                  ? 'bg-white border-slate-300 shadow-slate-300/40'
                  : menuBubble.colorClass
              }`}
              style={{
                left: `${menuBubble.left}px`,
                width: `${menuBubble.width}px`,
                opacity: menuBubble.opacity
              }}
            />
            
            {/* 1. 🎓 Learn ⌵ (Mega Dropdown) */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'learn' ? null : 'learn')}
                onMouseEnter={() => setHoveredMenu('learn')}
                className={`nav-menu-btn relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeDropdown === 'learn' || currentView === 'topics'
                    ? (isLight ? 'text-slate-900 font-extrabold' : 'text-emerald-300 font-extrabold')
                    : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white')
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Learn</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'learn' ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`} />
              </button>

              {/* Mega Menu Dropdown Box */}
              {activeDropdown === 'learn' && (
                <div className="absolute left-0 top-full mt-2 w-[580px] rounded-2xl bg-[#090E1A] light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Left Column: Core Tracks */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 light:text-slate-400 block px-2 mb-1">
                        Core Tracks
                      </span>

                      {[
                        { id: 'core-java', title: 'Core Java', tag: '21 LTS', desc: 'JVM, OOP & Virtual Threads', icon: Coffee, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                        { id: 'spring-boot', title: 'Spring Boot 3', tag: 'Cloud', desc: 'Microservices, REST & Security', icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                        { id: 'dsa', title: 'DSA Patterns', tag: '75+ Code', desc: 'Graphs, DP, Trees & Arrays', icon: Code, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectMenuCourse(item.id)}
                            className="w-full text-left p-2 rounded-xl hover:bg-slate-800/60 light:hover:bg-slate-100 flex items-center justify-between transition group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`p-2 rounded-lg ${item.bg} ${item.color} shrink-0 group-hover:scale-110 transition-transform`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-slate-200 light:text-slate-800 group-hover:text-emerald-400 transition truncate">
                                  {item.title}
                                </div>
                                <div className="text-[10.5px] text-slate-400 truncate">{item.desc}</div>
                              </div>
                            </div>
                            <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-600 shrink-0">
                              {item.tag}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Column: System Design */}
                    <div className="space-y-1 border-l border-slate-800/80 light:border-slate-200 pl-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 block px-2 mb-1">
                        System Design
                      </span>

                      {[
                        { id: 'system-design', sub: 'lld', title: 'Low-Level Design (LLD)', tag: '18 Topics', desc: 'SOLID, UML & 23 GoF Patterns', icon: Cpu, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                        { id: 'system-design', sub: 'hld', title: 'High-Level Design (HLD)', tag: '20 Topics', desc: 'Distributed Systems & Scaling', icon: Server, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                        { id: 'system-design', sub: 'hld-interview', title: 'Interview Case Studies', tag: '19 Systems', desc: 'Netflix, Uber, WhatsApp, Stripe', icon: Zap, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectMenuCourse(item.id, item.sub)}
                            className="w-full text-left p-2 rounded-xl hover:bg-slate-800/60 light:hover:bg-slate-100 flex items-center justify-between transition group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`p-2 rounded-lg ${item.bg} ${item.color} shrink-0 group-hover:scale-110 transition-transform`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-slate-200 light:text-slate-800 group-hover:text-cyan-400 transition truncate">
                                  {item.title}
                                </div>
                                <div className="text-[10.5px] text-slate-400 truncate">{item.desc}</div>
                              </div>
                            </div>
                            <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-800/80 light:bg-slate-200 text-slate-300 light:text-slate-600 shrink-0">
                              {item.tag}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                  </div>

                  {/* Bottom Footer CTA */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800 light:border-slate-200 flex items-center justify-between px-1">
                    <span className="text-[11px] text-slate-400 font-mono">540+ Interactive curriculum chapters</span>
                    <button
                      onClick={() => handleSelectMenuCourse('core-java')}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group"
                    >
                      <span>Explore all courses</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. 🎯 Practice ⌵ */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'practice' ? null : 'practice')}
                onMouseEnter={() => setHoveredMenu('practice')}
                className={`nav-menu-btn relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeDropdown === 'practice' || currentView === 'playground'
                    ? (isLight ? 'text-slate-900 font-extrabold' : 'text-cyan-300 font-extrabold')
                    : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white')
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Practice</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'practice' ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'practice' && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl bg-[#090E1A] light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                  {[
                    { type: 'dsa', title: 'DSA Patterns', desc: '75+ Code templates', icon: Code, color: 'text-cyan-400' },
                    { type: 'system-design', title: 'System Design', desc: 'Traffic & cache simulator', icon: Layers, color: 'text-indigo-400', isNew: true },
                    { type: 'concurrency', title: 'Concurrency', desc: 'Virtual threads & deadlocks', icon: Zap, color: 'text-amber-400', isNew: true },
                    { type: 'lld', title: 'Low-Level Design', desc: 'OOP pattern simulators', icon: Cpu, color: 'text-emerald-400', isNew: true },
                    { type: 'company-wise', title: 'Company-Wise Problems', desc: 'Google, Meta, Amazon tests', icon: Briefcase, color: 'text-purple-400' },
                  ].map((p, i) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectPracticeScenario(p.type)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/60 light:hover:bg-slate-100 flex items-center justify-between transition group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${p.color}`} />
                          <div>
                            <div className="text-xs font-bold text-slate-200 light:text-slate-800 group-hover:text-cyan-400 transition">{p.title}</div>
                            <div className="text-[10px] text-slate-400">{p.desc}</div>
                          </div>
                        </div>
                        {p.isNew && (
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                            New
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. 💬 Interview ⌵ */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'interview' ? null : 'interview')}
                onMouseEnter={() => setHoveredMenu('interview')}
                className={`nav-menu-btn relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeDropdown === 'interview'
                    ? (isLight ? 'text-slate-900 font-extrabold' : 'text-purple-300 font-extrabold')
                    : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white')
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-purple-400" />
                <span>Interview</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'interview' ? 'rotate-180 text-purple-400' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'interview' && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl bg-[#090E1A] light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                  {[
                    { title: 'Coding Interview', desc: 'AI mock with complexity grading', icon: Code, color: 'text-emerald-400' },
                    { title: 'System Design Interview', desc: 'Distributed whiteboard simulation', icon: Layers, color: 'text-indigo-400' },
                    { title: 'Low-Level Design Interview', desc: 'OOP & class diagram challenges', icon: Cpu, color: 'text-cyan-400' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setIsInterviewModalOpen(true);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/60 light:hover:bg-slate-100 flex items-center gap-2.5 transition group"
                      >
                        <Icon className={`w-4 h-4 ${item.color}`} />
                        <div>
                          <div className="text-xs font-bold text-slate-200 light:text-slate-800 group-hover:text-purple-400 transition">{item.title}</div>
                          <div className="text-[10px] text-slate-400">{item.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. 📁 Resources ⌵ */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                onMouseEnter={() => setHoveredMenu('resources')}
                className={`nav-menu-btn relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeDropdown === 'resources'
                    ? (isLight ? 'text-slate-900 font-extrabold' : 'text-amber-300 font-extrabold')
                    : (isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white')
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Resources</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180 text-amber-400' : 'text-slate-400'}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl bg-[#090E1A] light:bg-white border border-slate-800 light:border-slate-200 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                  {[
                    { title: 'Animations & Visualizers', desc: '600+ 3D interactive models', icon: Video, color: 'text-cyan-400' },
                    { title: 'ATS Resume Builder', desc: 'FAANG developer templates', icon: FileText, color: 'text-emerald-400' },
                    { title: 'Engineering Roadmaps', desc: '0 to Staff Architect tracks', icon: Map, color: 'text-indigo-400' },
                    { title: 'Learn Low-Level Design', desc: 'UML and design patterns', icon: Cpu, color: 'text-purple-400' },
                    { title: 'Curated Engineering Blogs', desc: 'Netflix, Uber, Discord studies', icon: BookOpen, color: 'text-amber-400' },
                    { title: 'Upcoming Courses', desc: 'AI Agents & Kafka Streaming', icon: Sparkles, color: 'text-pink-400' },
                  ].map((res, i) => {
                    const Icon = res.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setIsResourcesModalOpen(true);
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/60 light:hover:bg-slate-100 flex items-center gap-2.5 transition group"
                      >
                        <Icon className={`w-4 h-4 ${res.color}`} />
                        <div>
                          <div className="text-xs font-bold text-slate-200 light:text-slate-800 group-hover:text-amber-400 transition">{res.title}</div>
                          <div className="text-[10px] text-slate-400">{res.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </nav>

          {/* Right: Theme toggle + Profile */}
          <div className="flex items-center gap-2.5">
            
            {/* 🌙 / ☀️ Theme Toggle */}
            <button
              type="button"
              onClick={handleQuickToggleTheme}
              className={`p-2 rounded-xl border transition-all duration-200 active:scale-95 shadow-sm ${
                isLight
                  ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-600'
                  : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white'
              }`}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle theme"
            >
              {isLight
                ? <Sun className="w-4 h-4 text-amber-500" />
                : <Moon className="w-4 h-4" />
              }
            </button>

            {/* Profile Avatar Button */}
            <button
              onClick={() => onSelectView?.('profile')}
              className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm ${
                currentView === 'profile'
                  ? (isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold' : 'bg-emerald-950/80 border-emerald-500/60 text-emerald-200 shadow-md')
                  : (isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700')
              }`}
              title="Open Student Profile"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-[11px] font-extrabold shadow-sm flex-shrink-0">
                {userAvatarUrl ? (
                  <img src={userAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{userProfileName.charAt(0).toUpperCase() || 'M'}</span>
                )}
              </div>
              <span className="hidden sm:inline font-medium">{userProfileName || 'My Profile'}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-700"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#070B14] p-4 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-slate-400">Curriculum Tracks</span>
            {[
              { id: 'core-java', label: 'Core Java', icon: Coffee, color: 'text-amber-400' },
              { id: 'spring-boot', label: 'Spring Boot', icon: Leaf, color: 'text-emerald-400' },
              { id: 'system-design', label: 'System Design', icon: Layers, color: 'text-indigo-400' },
              { id: 'dsa', label: 'DSA & Algorithms', icon: Code, color: 'text-cyan-400' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => {
                  onSelectTrack(t.id);
                  onSelectView('topics');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold flex items-center gap-2"
              >
                <t.icon className={`w-4 h-4 ${t.color}`} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-800">
            <span className="text-xs font-mono uppercase text-slate-400">Interview &amp; Practice</span>
            <button
              onClick={() => {
                setIsInterviewModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>AI Mock Interview</span>
            </button>
            <button
              onClick={() => {
                setIsResourcesModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>600+ Visualizers &amp; Roadmaps</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <InterviewModal
        isOpen={isInterviewModalOpen}
        onClose={() => setIsInterviewModalOpen(false)}
        onOpenPlayground={(code) => {
          onOpenPlayground?.(code);
          onSelectView?.('playground');
        }}
      />

      <ResourcesModal
        isOpen={isResourcesModalOpen}
        onClose={() => setIsResourcesModalOpen(false)}
        onSelectTrack={onSelectTrack}
        onSelectView={onSelectView}
        onOpenPlayground={onOpenPlayground}
      />
    </header>
  );
}
