import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { 
  X, Sparkles, BookOpen, Code, Layers, Zap, 
  Boxes, Video, ArrowRight, ShieldCheck, Compass
} from 'lucide-react';

export default function PlatformOverviewModal({ 
  isOpen, 
  onClose, 
  onSelectTrack, 
  onSelectView 
}) {
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavigate = (view, trackId = null) => {
    onClose();
    if (trackId && onSelectTrack) {
      onSelectTrack(trackId);
    }
    if (view && onSelectView) {
      onSelectView(view);
    }
  };

  const featureCards = [
    {
      category: 'Curriculum & Theory',
      title: '540+ Full Curriculum Chapters',
      badge: 'Core & Advanced',
      desc: 'Complete mastery tracks from Core Java 21 LTS, Spring Boot 3 Microservices, to Low-Level Design (LLD) and High-Level Distributed Systems (HLD).',
      icon: BookOpen,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30 hover:border-emerald-400/60',
      bg: 'from-emerald-950/30 via-slate-900/60 to-[#090e1a]',
      stats: '540 Topics • 21 LTS • Zero Fluff',
      action: () => handleNavigate('topics', 'core-java')
    },
    {
      category: 'Coding Practice',
      title: '525+ DSA Patterns & Solutions',
      badge: 'Blind 75 + A2Z Sheet',
      desc: 'Full Blind 75 and Complete 450+ step A-to-Z DSA roadmap with interactive in-browser Java sandbox, complexity breakdowns, and test verification.',
      icon: Code,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30 hover:border-cyan-400/60',
      bg: 'from-cyan-950/30 via-slate-900/60 to-[#090e1a]',
      stats: '525 Problems • Instant Execution',
      action: () => handleNavigate('dsa-practice')
    },
    {
      category: 'Architectural Coding',
      title: '150 System Design Scenarios',
      badge: 'AlgoMaster Standard',
      desc: 'Hands-on system design coding challenges: Availability calculators, Little\'s Law, Consistent Hashing, Rate Limiters, and Distributed Caches.',
      icon: Layers,
      color: 'text-indigo-400',
      border: 'border-indigo-500/30 hover:border-indigo-400/60',
      bg: 'from-indigo-950/30 via-slate-900/60 to-[#090e1a]',
      stats: '150 Scenarios • Real-World Math',
      action: () => handleNavigate('system-design-practice')
    },
    {
      category: 'Multi-Threaded Coding',
      title: '50 Concurrency Challenges',
      badge: 'Race-Condition Free',
      desc: 'Practice multi-threaded programming: Mutex locks, Semaphores, Condition Variables, Read-Write Locks, and Lock-Free Ring Buffers.',
      icon: Zap,
      color: 'text-amber-400',
      border: 'border-amber-500/30 hover:border-amber-400/60',
      bg: 'from-amber-950/30 via-slate-900/60 to-[#090e1a]',
      stats: '50 Challenges • 9 Sync Types',
      action: () => handleNavigate('concurrency-practice')
    },
    {
      category: 'Object-Oriented Design',
      title: '107 Low-Level Design Problems',
      badge: 'OOP & 23 GoF Patterns',
      desc: 'Implement real classes, enums, interfaces, and state machines with automated AI rubric grading for SOLID principles and UML diagramming.',
      icon: Boxes,
      color: 'text-purple-400',
      border: 'border-purple-500/30 hover:border-purple-400/60',
      bg: 'from-purple-950/30 via-slate-900/60 to-[#090e1a]',
      stats: '107 Problems • 7 Categories',
      action: () => handleNavigate('lld-practice')
    },
    {
      category: 'Visual & Interactive',
      title: '600+ 3D/2D Visualizers',
      badge: 'Interactive Theater',
      desc: 'Explore real-time interactive models for JVM Memory (Stack vs Heap), JIT compiler pipeline, Spring Request lifecycle, and 2-Pointer array steps.',
      icon: Video,
      color: 'text-pink-400',
      border: 'border-pink-500/30 hover:border-pink-400/60',
      bg: 'from-pink-950/30 via-slate-900/60 to-[#090e1a]',
      stats: '600+ Animations • Interactive',
      action: () => handleNavigate('topics', 'core-java')
    },
  ];

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl bg-[#080d1a] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden animate-in zoom-in-95 duration-200 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-32 bg-gradient-to-r from-emerald-500/15 via-cyan-500/15 to-purple-500/15 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-5 sm:p-7 border-b border-white/10 flex items-start justify-between shrink-0 relative z-10">
          <div className="space-y-1.5 min-w-0 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>PLATFORM DIRECTORY</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono font-semibold">
                Java 21 LTS Standard
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              What is in ThreadSpeak Academy?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Interactive learning and engineering practice platform designed for modern software developers, computer science students, and staff architects.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition cursor-pointer shrink-0"
            title="Close Overview (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 6 Core Feature Suites Grid - Scrollable */}
        <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 overflow-y-auto flex-1 relative z-10 custom-scrollbar">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-b ${feat.bg} border ${feat.border} shadow-lg transition-all duration-200 flex flex-col justify-between group space-y-3.5 hover:scale-[1.01]`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      {feat.category}
                    </span>
                    <span className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900/90 border border-white/10 ${feat.color}`}>
                      {feat.badge}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl bg-white/[0.06] border border-white/10 ${feat.color} shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                        {feat.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300/90 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    {feat.stats}
                  </span>
                  <button
                    onClick={feat.action}
                    className={`text-xs font-bold ${feat.color} hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer`}
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Bottom Callout Bar */}
        <div className="p-4 sm:p-5 bg-[#060a14] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] sm:text-xs">540+ Lessons • 832+ Runnable Sandboxes • Free &amp; Open Access</span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleNavigate('dsa-practice')}
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 text-xs font-semibold border border-white/10 transition cursor-pointer"
            >
              DSA Practice
            </button>
            <button
              onClick={() => handleNavigate('topics', 'core-java')}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              Start Learning →
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
