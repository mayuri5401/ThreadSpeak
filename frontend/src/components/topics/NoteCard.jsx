import React, { useState } from 'react';
import { 
  Lightbulb, AlertTriangle, ShieldCheck, HelpCircle, 
  Code, ChevronDown, ChevronUp, Sparkles, CheckCircle2, Eye, EyeOff, Flame 
} from 'lucide-react';

export function NoteCard({ type = 'eli10', title, content, icon }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const styles = {
    eli10: {
      border: 'border-amber-500/30 hover:border-amber-500/60',
      bg: 'bg-gradient-to-br from-amber-950/30 via-[#0B1222]/90 to-[#070B14]',
      badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-700/80 shadow-md shadow-amber-500/10',
      titleColor: 'text-amber-300',
      glow: 'from-amber-500/10 to-transparent',
      icon: Lightbulb,
      defaultTitle: "Explain Like I'm 10 (Real-World Analogy)"
    },
    takeaway: {
      border: 'border-emerald-500/30 hover:border-emerald-500/60',
      bg: 'bg-gradient-to-br from-emerald-950/30 via-[#0B1222]/90 to-[#070B14]',
      badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80 shadow-md shadow-emerald-500/10',
      titleColor: 'text-emerald-300',
      glow: 'from-emerald-500/10 to-transparent',
      icon: ShieldCheck,
      defaultTitle: 'Mental Model & Invariant'
    },
    gotcha: {
      border: 'border-rose-500/30 hover:border-rose-500/60',
      bg: 'bg-gradient-to-br from-rose-950/30 via-[#0B1222]/90 to-[#070B14]',
      badgeBg: 'bg-rose-950/80 text-rose-300 border-rose-700/80 shadow-md shadow-rose-500/10',
      titleColor: 'text-rose-300',
      glow: 'from-rose-500/10 to-transparent',
      icon: AlertTriangle,
      defaultTitle: 'Common Pitfall'
    }
  };

  const style = styles[type] || styles.eli10;
  const IconComponent = icon || style.icon;

  return (
    <div className={`p-5 rounded-2xl border ${style.border} ${style.bg} space-y-3 shadow-xl transition-all duration-300 hover:shadow-2xl relative overflow-hidden group`}>
      {/* Top subtle glow line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${style.glow}`} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl ${style.badgeBg} border transition-transform group-hover:scale-110`}>
            <IconComponent className="w-4 h-4" />
          </div>
          <h4 className={`text-sm font-bold ${style.titleColor}`}>
            {title || style.defaultTitle}
          </h4>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400">
          Intuition
        </span>
      </div>

      <p className="text-sm text-slate-200 leading-relaxed pt-1">
        {content}
      </p>
    </div>
  );
}

export function InterviewTrapCard({ question, trap, solution, codeFix }) {
  // Interactive curiosity reveal state!
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#140C1A]/90 to-[#0B0F1A] space-y-4 shadow-xl hover:border-rose-500/60 transition-all duration-300 relative overflow-hidden">
      {/* Top animated badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-rose-950/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-950/90 border border-rose-700/80 text-rose-400 shadow-md shadow-rose-500/20 animate-pulse">
            <Flame className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold text-rose-400 tracking-wide uppercase">
            High-Yield Interview Trap &amp; Intuition Check
          </span>
        </div>

        {/* Reveal Answer Action Button */}
        <button
          onClick={() => setIsRevealed(!isRevealed)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border transition shadow-sm ${
            isRevealed
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              : 'bg-gradient-to-r from-rose-600 to-pink-600 border-rose-500 text-white shadow-rose-600/20 hover:opacity-95 animate-bounce'
          }`}
        >
          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{isRevealed ? 'Hide Solution' : 'Test Intuition / Reveal Fix'}</span>
        </button>
      </div>

      {/* Question */}
      <div>
        <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
          {question}
        </h4>
      </div>

      {/* Interactive Collapsible / Revealed Section */}
      {isRevealed ? (
        <div className="space-y-3 pt-1 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* The Trap */}
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/60 space-y-1.5 shadow-md">
              <span className="font-bold text-rose-400 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-rose-900 text-rose-200 flex items-center justify-center text-[10px]">✕</span>
                The Common Pitfall:
              </span>
              <p className="text-slate-200 leading-relaxed pl-5">{trap}</p>
            </div>

            {/* The Expert Fix */}
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/60 space-y-1.5 shadow-md">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-900 text-emerald-200 flex items-center justify-center text-[10px]">✓</span>
                The Expert Solution:
              </span>
              <p className="text-slate-200 leading-relaxed pl-5">{solution}</p>
            </div>
          </div>

          {/* Code Fix */}
          {codeFix && (
            <div className="p-3.5 rounded-xl bg-[#060A14] border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-cyan-400" /> Correct Production Fix:
              </span>
              <pre className="font-mono text-xs text-cyan-300 overflow-x-auto pt-1 leading-relaxed">
                <code>{codeFix}</code>
              </pre>
            </div>
          )}
        </div>
      ) : (
        <div 
          onClick={() => setIsRevealed(true)}
          className="p-4 rounded-xl bg-slate-900/60 border border-dashed border-slate-700/80 text-center cursor-pointer hover:bg-slate-900 hover:border-cyan-500/50 transition group"
        >
          <span className="text-xs text-slate-400 group-hover:text-cyan-300 transition flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>How would you answer this in a senior interview? Click to reveal the trap &amp; fix.</span>
          </span>
        </div>
      )}
    </div>
  );
}
