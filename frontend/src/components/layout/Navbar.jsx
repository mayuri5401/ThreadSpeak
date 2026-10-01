import React, { useState, useRef, useEffect } from 'react';
import { 
  Coffee, Leaf, Layers, Code, Terminal, 
  Sparkles, Menu, X, Sun, Moon, 
  ChevronDown, BookOpen, Cpu, Server, 
  FileText, Map, Video, Zap, Boxes,
  LogIn, LogOut, ChevronRight, Compass, Crown, Award
} from 'lucide-react';
import ResourcesModal from '../modals/ResourcesModal';
import PlatformOverviewModal from '../modals/PlatformOverviewModal';
import PricingModal from '../modals/PricingModal';
import CertificateModal from '../profile/CertificateModal';
import UserMenuDropdown from '../auth/UserMenuDropdown';
import { getUserProfile } from '../../shared/services/avatarService';
import { getCurrentUser, logout } from '../../shared/services/authService';
import { mfeEventBus, MfeEvents } from '../../shared/events/MfeEventBus';

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
  onSelectSubSection,
  onOpenAuth
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'learn' | 'practice' | 'resources' | null
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);
  const [isPlatformOverviewOpen, setIsPlatformOverviewOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Auth User State
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [userAvatarUrl, setUserAvatarUrl] = useState(() => currentUser?.avatarUrl || getUserProfile().avatarUrl);
  const [userProfileName, setUserProfileName] = useState(() => currentUser?.name || getUserProfile().userName);

  const navRef = useRef(null);

  // Sync with Auth Event Bus
  useEffect(() => {
    const unsubLogin = mfeEventBus.on(MfeEvents.AUTH_LOGIN, ({ user }) => {
      setCurrentUser(user);
      if (user?.avatarUrl) setUserAvatarUrl(user.avatarUrl);
      if (user?.name) setUserProfileName(user.name);
    });
    const unsubLogout = mfeEventBus.on(MfeEvents.AUTH_LOGOUT, () => {
      setCurrentUser(null);
    });
    const unsubUpdate = mfeEventBus.on(MfeEvents.AUTH_USER_UPDATED, ({ user }) => {
      setCurrentUser(user);
      if (user?.avatarUrl) setUserAvatarUrl(user.avatarUrl);
      if (user?.name) setUserProfileName(user.name);
    });

    const unsubPricing = mfeEventBus.on('OPEN_PRICING_MODAL', () => {
      setIsPricingModalOpen(true);
    });
    const unsubCert = mfeEventBus.on('OPEN_CERTIFICATE_MODAL', () => {
      setIsCertificateModalOpen(true);
    });

    return () => {
      unsubLogin();
      unsubLogout();
      unsubUpdate();
      unsubPricing();
      unsubCert();
    };
  }, []);

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

  const isLight = currentThemeId === 'light';

  const handleSelectMenuCourse = (trackId, subSection = null) => {
    if (trackId === 'dsa') {
      onSelectView?.('dsa-practice');
    } else {
      onSelectTrack?.(trackId);
      if (subSection && onSelectSubSection) {
        onSelectSubSection(subSection);
      }
      onSelectView?.('topics');
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleSelectPracticeScenario = (type) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    if (type === 'dsa-practice' || type === 'dsa' || type === 'a2z-sheet' || type === 'strivers-sheet') {
      onSelectView?.('dsa-practice');
    } else if (type === 'system-design' || type === 'system-design-practice') {
      onSelectView?.('system-design-practice');
    } else if (type === 'concurrency' || type === 'concurrency-practice') {
      onSelectView?.('concurrency-practice');
    } else if (type === 'lld' || type === 'lld-practice') {
      onSelectView?.('lld-practice');
    } else if (type === 'mock-interview') {
      onSelectView?.('mock-interview');
    }
  };

  const learnTracks = [
    { 
      id: 'core-java', 
      sub: null, 
      title: 'Core Java & Fundamentals', 
      desc: 'JVM Internals, OOP, Concurrency & Virtual Threads', 
      icon: Coffee, 
      color: 'text-amber-400', 
      bg: 'bg-amber-400/10' 
    },
    { 
      id: 'spring-boot', 
      sub: null, 
      title: 'Spring Boot & Cloud', 
      desc: 'REST APIs, Spring Security, JPA & Microservices', 
      icon: Leaf, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-400/10' 
    },
    { 
      id: 'system-design', 
      sub: 'lld', 
      title: 'Low-Level Design (LLD)', 
      desc: 'SOLID Principles, UML & 23 GoF Design Patterns', 
      icon: Cpu, 
      color: 'text-purple-400', 
      bg: 'bg-purple-400/10' 
    },
    { 
      id: 'system-design', 
      sub: 'hld', 
      title: 'System Design Fundamentals (HLD)', 
      desc: 'Distributed Caching, Sharding, Replication & Scalability', 
      icon: Server, 
      color: 'text-indigo-400', 
      bg: 'bg-indigo-400/10' 
    },
  ];

  const practiceHubs = [
    { 
      type: 'mock-interview', 
      title: 'AI FAANG Mock Interview', 
      desc: 'Real 45-min technical round with automated rubric scoring', 
      icon: Video, 
      color: 'text-rose-400', 
      bg: 'bg-rose-400/10' 
    },
    { 
      type: 'dsa-practice', 
      title: 'DSA Patterns & Practice', 
      desc: '450+ step roadmap with visual execution & test cases', 
      icon: Code, 
      color: 'text-cyan-400', 
      bg: 'bg-cyan-400/10' 
    },
    { 
      type: 'system-design', 
      title: 'System Design Practice', 
      desc: 'Design rate limiters, distributed caching & load balancers', 
      icon: Layers, 
      color: 'text-indigo-400', 
      bg: 'bg-indigo-400/10' 
    },
    { 
      type: 'concurrency', 
      title: 'Java Concurrency Lab', 
      desc: 'Mutex, semaphores, race conditions & virtual threads', 
      icon: Zap, 
      color: 'text-amber-400', 
      bg: 'bg-amber-400/10' 
    },
    { 
      type: 'lld', 
      title: 'Low-Level Design Practice', 
      desc: 'Object-oriented classes, design patterns & UML models', 
      icon: Boxes, 
      color: 'text-purple-400', 
      bg: 'bg-purple-400/10' 
    },
  ];

  const resourceItems = [
    { 
      title: 'Interactive 3D Visualizers', 
      desc: 'JVM memory, Garbage Collection & thread visual models', 
      icon: Video, 
      color: 'text-cyan-400', 
      bg: 'bg-cyan-400/10' 
    },
    { 
      title: 'ATS Resume Builder & Templates', 
      desc: 'High-impact developer resumes with FAANG-ready bullets', 
      icon: FileText, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-400/10' 
    },
    { 
      title: 'Engineering Career Roadmaps', 
      desc: 'Step-by-step career path from Junior to Staff Architect', 
      icon: Map, 
      color: 'text-indigo-400', 
      bg: 'bg-indigo-400/10' 
    },
    { 
      title: 'Interactive Low-Level Design', 
      desc: 'Design patterns, class diagrams & system blueprints', 
      icon: Cpu, 
      color: 'text-purple-400', 
      bg: 'bg-purple-400/10' 
    },
    { 
      title: 'Architecture Case Studies', 
      desc: 'Deep dives on Netflix, Uber, Discord & Stripe systems', 
      icon: BookOpen, 
      color: 'text-amber-400', 
      bg: 'bg-amber-400/10' 
    },
  ];

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-[#070b14]/92 light:bg-white/95 backdrop-blur-xl border-b border-white/[0.08] light:border-slate-200 transition-colors duration-300">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand Logo & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] light:bg-slate-100 border border-white/10 light:border-slate-200 text-slate-300 light:text-slate-700 hover:text-white cursor-pointer transition"
              aria-label="Toggle Topic Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => { onSelectView?.('topics'); onSelectTrack?.('core-java'); }}
              className="flex items-center gap-2.5 text-left group shrink-0 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[#070b14] light:bg-white rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div>
                <span className="text-base font-extrabold tracking-tight text-white light:text-slate-900 flex items-center gap-0.5">
                  Thread<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Speak</span>
                </span>
                <span className="text-[10px] text-slate-400 light:text-slate-500 block -mt-0.5 font-medium tracking-wide">
                  Academy &amp; System Design
                </span>
              </div>
            </button>
          </div>

          {/* ── Center: Horizontally Extended Length-Wise Navigation Bar ── */}
          <nav className="hidden lg:flex items-center justify-center gap-2.5 xl:gap-3.5 p-1 rounded-2xl bg-white/[0.04] light:bg-slate-100/90 border border-white/[0.08] light:border-slate-200/90 backdrop-blur-md shadow-sm">
            
            {/* 1. 🎓 Learn Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'learn' ? null : 'learn')}
                className={`flex items-center justify-center gap-2.5 min-w-[130px] xl:min-w-[150px] px-6 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeDropdown === 'learn' || currentView === 'topics'
                    ? (isLight ? 'bg-white text-slate-900 shadow-sm' : 'bg-white/[0.1] text-white shadow-sm ring-1 ring-white/10')
                    : (isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-white/70' : 'text-slate-300 hover:text-white hover:bg-white/[0.06]')
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Learn</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeDropdown === 'learn' ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>

              {activeDropdown === 'learn' && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3.5 w-[390px] sm:w-[420px] rounded-2xl bg-[#090e1a]/95 light:bg-white/98 backdrop-blur-2xl border border-white/10 light:border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset] light:shadow-[0_20px_45px_rgba(0,0,0,0.1)] p-2.5 z-[100] animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 pt-2 pb-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
                      Curriculum Tracks
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 light:text-emerald-600 bg-emerald-500/10 light:bg-emerald-50 border border-emerald-500/20 light:border-emerald-200 px-2.5 py-0.5 rounded-full">
                      540+ Lessons
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    {learnTracks.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectMenuCourse(item.id, item.sub)}
                          className="w-full text-left p-2.5 rounded-xl transition-all duration-150 hover:bg-white/[0.06] light:hover:bg-slate-100 flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-9 h-9 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 border border-white/5`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-100 light:text-slate-900 group-hover:text-emerald-400 light:group-hover:text-emerald-600 transition truncate block">
                                {item.title}
                              </span>
                              <p className="text-[11px] text-slate-400 light:text-slate-500 leading-snug mt-0.5 truncate font-normal">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500 light:text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0 ml-1.5" />
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-1.5 pt-1.5 border-t border-white/[0.06] light:border-slate-100 px-1">
                    <button
                      onClick={() => {
                        setIsPlatformOverviewOpen(true);
                        setActiveDropdown(null);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-emerald-400 light:text-slate-500 light:hover:text-emerald-600 flex items-center justify-between transition group cursor-pointer hover:bg-white/[0.03] light:hover:bg-slate-50"
                    >
                      <span>Explore full curriculum roadmap</span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. 🎯 Practice Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'practice' ? null : 'practice')}
                className={`flex items-center justify-center gap-2.5 min-w-[130px] xl:min-w-[150px] px-6 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeDropdown === 'practice' || currentView === 'playground' || currentView === 'dsa-practice' || currentView === 'system-design-practice' || currentView === 'concurrency-practice' || currentView === 'lld-practice' || currentView === 'mock-interview'
                    ? (isLight ? 'bg-white text-slate-900 shadow-sm' : 'bg-white/[0.1] text-white shadow-sm ring-1 ring-white/10')
                    : (isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-white/70' : 'text-slate-300 hover:text-white hover:bg-white/[0.06]')
                }`}
              >
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Practice</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeDropdown === 'practice' ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              {activeDropdown === 'practice' && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3.5 w-[390px] sm:w-[420px] rounded-2xl bg-[#090e1a]/95 light:bg-white/98 backdrop-blur-2xl border border-white/10 light:border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset] light:shadow-[0_20px_45px_rgba(0,0,0,0.1)] p-2.5 z-[100] animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 pt-2 pb-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
                      Practice Hubs &amp; Labs
                    </span>
                    <span className="text-[11px] font-semibold text-cyan-400 light:text-cyan-600 bg-cyan-500/10 light:bg-cyan-50 border border-cyan-500/20 light:border-cyan-200 px-2.5 py-0.5 rounded-full">
                      Live Compiler
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    {practiceHubs.map((p, i) => {
                      const Icon = p.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectPracticeScenario(p.type)}
                          className="w-full text-left p-2.5 rounded-xl transition-all duration-150 hover:bg-white/[0.06] light:hover:bg-slate-100 flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-9 h-9 rounded-xl ${p.bg} ${p.color} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 border border-white/5`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-100 light:text-slate-900 group-hover:text-cyan-400 light:group-hover:text-cyan-600 transition truncate block">
                                {p.title}
                              </span>
                              <p className="text-[11px] text-slate-400 light:text-slate-500 leading-snug mt-0.5 truncate font-normal">
                                {p.desc}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500 light:text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0 ml-1.5" />
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-1.5 pt-1.5 border-t border-white/[0.06] light:border-slate-100 px-1">
                    <button
                      onClick={() => {
                        onOpenPlayground?.();
                        setActiveDropdown(null);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-cyan-400 light:text-slate-500 light:hover:text-cyan-600 flex items-center justify-between transition group cursor-pointer hover:bg-white/[0.03] light:hover:bg-slate-50"
                    >
                      <span>Open Java Code Sandbox</span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. ✨ Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                className={`flex items-center justify-center gap-2.5 min-w-[130px] xl:min-w-[150px] px-6 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeDropdown === 'resources'
                    ? (isLight ? 'bg-white text-slate-900 shadow-sm' : 'bg-white/[0.1] text-white shadow-sm ring-1 ring-white/10')
                    : (isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-white/70' : 'text-slate-300 hover:text-white hover:bg-white/[0.06]')
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {activeDropdown === 'resources' && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3.5 w-[390px] sm:w-[420px] rounded-2xl bg-[#090e1a]/95 light:bg-white/98 backdrop-blur-2xl border border-white/10 light:border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset] light:shadow-[0_20px_45px_rgba(0,0,0,0.1)] p-2.5 z-[100] animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 pt-2 pb-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
                      Developer Toolkits &amp; Reference
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    {resourceItems.map((res, i) => {
                      const Icon = res.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setIsResourcesModalOpen(true);
                            setActiveDropdown(null);
                          }}
                          className="w-full text-left p-2.5 rounded-xl transition-all duration-150 hover:bg-white/[0.06] light:hover:bg-slate-100 flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`w-9 h-9 rounded-xl ${res.bg} ${res.color} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 border border-white/5`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-xs sm:text-[13px] font-bold text-slate-100 light:text-slate-900 group-hover:text-amber-400 light:group-hover:text-amber-600 transition truncate block">
                                {res.title}
                              </span>
                              <p className="text-[11px] text-slate-400 light:text-slate-500 leading-snug mt-0.5 truncate font-normal">
                                {res.desc}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500 light:text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0 ml-1.5" />
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-1.5 pt-1.5 border-t border-white/[0.06] light:border-slate-100 px-1">
                    <button
                      onClick={() => {
                        setIsResourcesModalOpen(true);
                        setActiveDropdown(null);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-amber-400 light:text-slate-500 light:hover:text-amber-600 flex items-center justify-between transition group cursor-pointer hover:bg-white/[0.03] light:hover:bg-slate-50"
                    >
                      <span>Browse all 600+ resources &amp; tools</span>
                      <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </nav>

          {/* ── Right Controls: Explore, PRO Pass, Theme, Auth / User Profile ── */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* 👑 PRO Upgrade Action Button */}
            <button
              type="button"
              onClick={() => setIsPricingModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 hover:from-amber-500/30 hover:to-teal-500/30 text-amber-300 light:text-amber-700 border border-amber-500/40 light:border-amber-300 shadow-md shadow-amber-500/10 text-xs font-bold transition hover:scale-105 active:scale-95 cursor-pointer"
              title="Upgrade to ThreadSpeak PRO"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Get PRO</span>
            </button>

            {/* Explore / Platform Directory Button */}
            <button
              type="button"
              onClick={() => setIsPlatformOverviewOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] light:bg-slate-100 light:hover:bg-slate-200 border border-white/10 light:border-slate-200 text-xs font-semibold text-slate-300 hover:text-white light:text-slate-700 light:hover:text-slate-900 transition-all duration-200 cursor-pointer shadow-sm"
              title="Explore all features and roadmap"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Explore</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={handleQuickToggleTheme}
              className={`p-2 rounded-xl border transition-all duration-200 active:scale-95 shadow-sm cursor-pointer ${
                isLight
                  ? 'bg-amber-50 hover:bg-amber-100/80 border-amber-200/80 text-amber-600'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-slate-400 hover:text-white'
              }`}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label="Toggle theme"
            >
              {isLight ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* User Profile or Auth Action Buttons */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(prev => !prev)}
                  className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm cursor-pointer ${
                    isUserMenuOpen || currentView === 'profile'
                      ? (isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-bold' : 'bg-white/[0.08] border-emerald-500/50 text-emerald-300 font-bold')
                      : (isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08]')
                  }`}
                  title="Account Settings"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 text-[11px] font-extrabold shadow-sm shrink-0">
                    {currentUser.avatarUrl ? (
                      <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{currentUser.name?.charAt(0).toUpperCase() || 'U'}</span>
                    )}
                  </div>
                  <span className="hidden sm:inline font-semibold truncate max-w-[110px]">{currentUser.name || 'Student'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>

                <UserMenuDropdown
                  user={currentUser}
                  isOpen={isUserMenuOpen}
                  onClose={() => setIsUserMenuOpen(false)}
                  onSelectView={onSelectView}
                  onOpenPricing={() => setIsPricingModalOpen(true)}
                  onOpenCertificate={() => setIsCertificateModalOpen(true)}
                  onLogout={() => {
                    setCurrentUser(null);
                    setIsUserMenuOpen(false);
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onOpenAuth?.('login')}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.05] light:text-slate-600 light:hover:text-slate-900 transition duration-150 cursor-pointer"
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => onOpenAuth?.('register')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold transition duration-200 shadow-sm hover:shadow-emerald-500/20 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get Started</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.04] light:bg-slate-100 border border-white/10 light:border-slate-200 text-slate-300 light:text-slate-700 cursor-pointer transition"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#070b14]/98 backdrop-blur-2xl p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* PRO Upgrade Action in Mobile */}
          <button
            onClick={() => {
              setIsPricingModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <Crown className="w-4 h-4" />
            <span>Upgrade to ThreadSpeak PRO</span>
          </button>

          {/* User Auth Card in Mobile Drawer */}
          {currentUser ? (
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 font-black text-xs shrink-0">
                  {currentUser.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{currentUser.name?.charAt(0) || 'U'}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{currentUser.name}</h4>
                  <span className="text-[10px] text-slate-400 block truncate">{currentUser.role || currentUser.email}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  setCurrentUser(null);
                  setIsMobileMenuOpen(false);
                }}
                className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white text-xs font-bold transition cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onOpenAuth?.('login');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => {
                  onOpenAuth?.('register');
                  setIsMobileMenuOpen(false);
                }}
                className="py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </button>
            </div>
          )}

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Curriculum Tracks</span>
            {learnTracks.map(t => (
              <button
                key={t.title}
                onClick={() => {
                  handleSelectMenuCourse(t.id, t.sub);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-white text-xs font-semibold flex items-center gap-3 transition cursor-pointer"
              >
                <t.icon className={`w-4 h-4 ${t.color}`} />
                <span>{t.title}</span>
              </button>
            ))}
          </div>

          <div className="space-y-1 pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Explore &amp; Reference</span>
            <button
              onClick={() => {
                onSelectView?.('mock-interview');
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-white text-xs font-semibold flex items-center gap-3 transition cursor-pointer"
            >
              <Video className="w-4 h-4 text-rose-400" />
              <span>AI FAANG Mock Interviewer</span>
            </button>
            <button
              onClick={() => {
                setIsCertificateModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-white text-xs font-semibold flex items-center gap-3 transition cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Verified Certificates</span>
            </button>
            <button
              onClick={() => {
                setIsPlatformOverviewOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-white text-xs font-semibold flex items-center gap-3 transition cursor-pointer"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Full Curriculum Overview</span>
            </button>
            <button
              onClick={() => {
                setIsResourcesModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 text-white text-xs font-semibold flex items-center gap-3 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>600+ Visualizers &amp; Handbooks</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <PlatformOverviewModal
        isOpen={isPlatformOverviewOpen}
        onClose={() => setIsPlatformOverviewOpen(false)}
        onSelectTrack={onSelectTrack}
        onSelectView={onSelectView}
      />

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onSelectView={onSelectView}
      />

      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        user={currentUser}
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
