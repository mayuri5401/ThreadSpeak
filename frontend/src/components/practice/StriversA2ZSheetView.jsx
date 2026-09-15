import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, CheckCircle2, Circle, Code2, Play, ExternalLink, 
  Youtube, Search, Filter, ChevronDown, ChevronRight, BookOpen, 
  Trophy, Flame, Zap, ArrowRight, Layers, HelpCircle, Check, 
  RotateCcw, SlidersHorizontal, ListFilter, Compass, Bookmark,
  TrendingUp, Award, Laptop, Hash, ShieldCheck
} from 'lucide-react';
import { STRIVERS_STEPS, STRIVERS_PROBLEMS } from '../../data/striversA2ZSheetData';

/**
 * StriversA2ZSheetView
 * High-End Interactive Practice Portal for Striver's A2Z DSA Sheet
 * Features:
 * - 18 Step Roadmap with Subtopic Groupings
 * - Live Solved Tracking & localStorage Persistence
 * - Search & Multi-criteria Filtering (Difficulty, Status, Step)
 * - Direct One-Click Redirection to our LeetCode-Style Playground
 * - TakeUForward, LeetCode, and YouTube Solution links
 */
export default function StriversA2ZSheetView({ onOpenProblemInPlayground }) {
  // Solved problems state stored in localStorage
  const [solvedProblemIds, setSolvedProblemIds] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_strivers_solved');
      return saved ? new Set(JSON.parse(saved)) : new Set(['count-digits', 'two-sum']);
    } catch {
      return new Set(['count-digits', 'two-sum']);
    }
  });

  // Bookmarked problems
  const [bookmarkedProblemIds, setBookmarkedProblemIds] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_strivers_bookmarked');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL'); // 'ALL' | 'Easy' | 'Medium' | 'Hard'
  const [selectedStatus, setSelectedStatus] = useState('ALL'); // 'ALL' | 'SOLVED' | 'UNSOLVED'
  const [selectedStepFilter, setSelectedStepFilter] = useState('ALL'); // 'ALL' | number

  // Expanded accordion steps
  const [expandedSteps, setExpandedSteps] = useState(() => {
    const initial = {};
    STRIVERS_STEPS.forEach(s => {
      initial[s.stepNumber] = true; // all expanded by default
    });
    return initial;
  });

  const toggleStepAccordion = (stepNumber) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const handleToggleSolved = (problemId, e) => {
    e?.stopPropagation();
    setSolvedProblemIds(prev => {
      const next = new Set(prev);
      if (next.has(problemId)) {
        next.delete(problemId);
      } else {
        next.add(problemId);
      }
      localStorage.setItem('threadspeak_strivers_solved', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const handleToggleBookmark = (problemId, e) => {
    e?.stopPropagation();
    setBookmarkedProblemIds(prev => {
      const next = new Set(prev);
      if (next.has(problemId)) {
        next.delete(problemId);
      } else {
        next.add(problemId);
      }
      localStorage.setItem('threadspeak_strivers_bookmarked', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  // Filtered problems computation
  const filteredProblems = useMemo(() => {
    return STRIVERS_PROBLEMS.filter(p => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesSubTopic = p.subTopic?.toLowerCase().includes(q);
        const matchesCompanies = p.companies?.some(c => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubTopic && !matchesCompanies) return false;
      }

      // 2. Difficulty
      if (selectedDifficulty !== 'ALL' && p.difficulty !== selectedDifficulty) {
        return false;
      }

      // 3. Status
      if (selectedStatus === 'SOLVED' && !solvedProblemIds.has(p.id)) return false;
      if (selectedStatus === 'UNSOLVED' && solvedProblemIds.has(p.id)) return false;

      // 4. Step
      if (selectedStepFilter !== 'ALL' && p.stepNumber !== Number(selectedStepFilter)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedDifficulty, selectedStatus, selectedStepFilter, solvedProblemIds]);

  // Group filtered problems by Step
  const problemsByStep = useMemo(() => {
    const grouped = {};
    STRIVERS_STEPS.forEach(s => {
      grouped[s.stepNumber] = [];
    });
    filteredProblems.forEach(p => {
      if (grouped[p.stepNumber]) {
        grouped[p.stepNumber].push(p);
      }
    });
    return grouped;
  }, [filteredProblems]);

  // Statistics calculation
  const totalCount = STRIVERS_PROBLEMS.length;
  const solvedCount = STRIVERS_PROBLEMS.filter(p => solvedProblemIds.has(p.id)).length;
  const progressPercent = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  const easyTotal = STRIVERS_PROBLEMS.filter(p => p.difficulty === 'Easy').length;
  const easySolved = STRIVERS_PROBLEMS.filter(p => p.difficulty === 'Easy' && solvedProblemIds.has(p.id)).length;

  const medTotal = STRIVERS_PROBLEMS.filter(p => p.difficulty === 'Medium').length;
  const medSolved = STRIVERS_PROBLEMS.filter(p => p.difficulty === 'Medium' && solvedProblemIds.has(p.id)).length;

  const hardTotal = STRIVERS_PROBLEMS.filter(p => p.difficulty === 'Hard').length;
  const hardSolved = STRIVERS_PROBLEMS.filter(p => p.difficulty === 'Hard' && solvedProblemIds.has(p.id)).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-20">
      
      {/* ── TOP HERO BANNER & STATS ── */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-500/30 bg-gradient-to-r from-[#0C1222] via-[#091122] to-[#150D24] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-rose-950/80 border border-rose-600/50 text-rose-400 shadow-lg shadow-rose-950/50">
                <Flame className="w-6 h-6 animate-pulse" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                    TakeUForward Official
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    A-to-Z DSA Roadmap
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Striver's A2Z DSA Sheet
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Master Data Structures &amp; Algorithms step-by-step from beginner to advanced. Click any problem to open it directly in our built-in <strong>LeetCode-Style Coding Playground</strong> with instant multi-language compilation.
            </p>
          </div>

          {/* Progress Dial & Metrics */}
          <div className="w-full lg:w-auto p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center gap-6 shadow-xl shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-rose-400 transition-all duration-1000 ease-out"
                    strokeDasharray={`${progressPercent}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-black font-mono text-white">
                  {progressPercent}%
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Overall Progress</span>
                <span className="text-lg font-black text-white font-mono">
                  {solvedCount} <span className="text-xs text-slate-500 font-normal">/ {totalCount}</span>
                </span>
                <span className="text-[11px] text-emerald-400 block font-medium">Problems Solved</span>
              </div>
            </div>

            {/* Difficulty Split Bars */}
            <div className="border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-6 space-y-2 w-full sm:w-44">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Easy
                </span>
                <span className="font-mono text-slate-300 font-bold">{easySolved}/{easyTotal}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Med.
                </span>
                <span className="font-mono text-slate-300 font-bold">{medSolved}/{medTotal}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-rose-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" /> Hard
                </span>
                <span className="font-mono text-slate-300 font-bold">{hardSolved}/{hardTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar / Quick Links */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">External resources:</span>
            <a
              href="https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 hover:underline font-bold"
            >
              <span>TakeUForward Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="https://www.youtube.com/@takeUforward"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 hover:underline font-bold"
            >
              <span>Striver's YouTube Channel</span>
              <Youtube className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span>18 Steps</span>
            <span>•</span>
            <span>455+ Handcrafted Problems</span>
            <span>•</span>
            <span>100% LeetCode Synced</span>
          </div>
        </div>
      </div>

      {/* ── SEARCH & MULTI-CRITERIA FILTERS ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#090E1A] border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        {/* Search Box */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search problem name, company, or subtopic..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:border-rose-500 focus:outline-none transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Controls Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Difficulty Filter */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            {['ALL', 'Easy', 'Medium', 'Hard'].map(d => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedDifficulty === d
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {d === 'ALL' ? 'All' : d}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            {[
              { key: 'ALL', label: 'All Status' },
              { key: 'SOLVED', label: 'Solved' },
              { key: 'UNSOLVED', label: 'Unsolved' }
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setSelectedStatus(s.key)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedStatus === s.key
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Step Selector Dropdown */}
          <select
            value={selectedStepFilter}
            onChange={e => setSelectedStepFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold focus:border-rose-500 focus:outline-none"
          >
            <option value="ALL">All 18 Steps</option>
            {STRIVERS_STEPS.map(s => (
              <option key={s.stepNumber} value={s.stepNumber}>
                Step {s.stepNumber}: {s.title}
              </option>
            ))}
          </select>

          {/* Reset Filters */}
          {(searchQuery || selectedDifficulty !== 'ALL' || selectedStatus !== 'ALL' || selectedStepFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('ALL');
                setSelectedStatus('ALL');
                setSelectedStepFilter('ALL');
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── 18 STEP ACCORDIONS ── */}
      <div className="space-y-6">
        {STRIVERS_STEPS.map(step => {
          const stepProblems = problemsByStep[step.stepNumber] || [];
          if (stepProblems.length === 0 && (searchQuery || selectedDifficulty !== 'ALL' || selectedStatus !== 'ALL' || selectedStepFilter !== 'ALL')) {
            // Hide step if filtered out
            return null;
          }

          const isExpanded = expandedSteps[step.stepNumber];
          const totalInStep = STRIVERS_PROBLEMS.filter(p => p.stepNumber === step.stepNumber).length;
          const solvedInStep = STRIVERS_PROBLEMS.filter(p => p.stepNumber === step.stepNumber && solvedProblemIds.has(p.id)).length;
          const stepPercent = totalInStep > 0 ? Math.round((solvedInStep / totalInStep) * 100) : 0;

          // Group by subtopics inside step
          const subTopicMap = {};
          stepProblems.forEach(p => {
            const st = p.subTopic || 'General';
            if (!subTopicMap[st]) subTopicMap[st] = [];
            subTopicMap[st].push(p);
          });

          return (
            <div
              key={step.stepNumber}
              className={`rounded-3xl border transition-all duration-200 overflow-hidden shadow-xl ${
                step.borderColor
              } bg-[#0A0F1E]`}
            >
              {/* Step Header Accordion Toggle */}
              <div
                onClick={() => toggleStepAccordion(step.stepNumber)}
                className="p-5 sm:p-6 cursor-pointer hover:bg-slate-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 transition"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-rose-400 font-mono font-black text-sm shrink-0 shadow-inner">
                    {step.stepNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-rose-400">
                        Step {step.stepNumber}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        ({totalInStep} problems)
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-2xl mt-0.5 line-clamp-1">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                  {/* Step Completion Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="w-12 bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-rose-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${stepPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {solvedInStep}/{totalInStep}
                    </span>
                  </div>

                  <span className="p-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </span>
                </div>
              </div>

              {/* Accordion Body: Problems Grouped by Subtopics */}
              {isExpanded && (
                <div className="p-4 sm:p-6 space-y-6">
                  {Object.entries(subTopicMap).map(([subTopic, problems]) => (
                    <div key={subTopic} className="space-y-3">
                      <div className="flex items-center gap-2 pb-1 border-b border-slate-850">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                          {subTopic}
                        </h4>
                        <span className="text-[10px] text-slate-500 font-mono">
                          ({problems.length})
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {problems.map((p, idx) => {
                          const isSolved = solvedProblemIds.has(p.id);
                          const isBookmarked = bookmarkedProblemIds.has(p.id);

                          return (
                            <div
                              key={p.id}
                              className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group ${
                                isSolved
                                  ? 'bg-emerald-950/10 border-emerald-900/40 hover:border-emerald-700/60'
                                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                              }`}
                            >
                              {/* Left: Checkbox + Title + Tags */}
                              <div className="flex items-start sm:items-center gap-3 min-w-0">
                                <button
                                  type="button"
                                  onClick={(e) => handleToggleSolved(p.id, e)}
                                  className={`p-1 rounded-lg transition shrink-0 mt-0.5 sm:mt-0 ${
                                    isSolved
                                      ? 'text-emerald-400 hover:text-emerald-300 bg-emerald-500/10'
                                      : 'text-slate-600 hover:text-slate-400 bg-slate-800/40'
                                  }`}
                                  title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                                >
                                  {isSolved ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                                  ) : (
                                    <Circle className="w-5 h-5" />
                                  )}
                                </button>

                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => onOpenProblemInPlayground?.(p)}
                                      className="text-sm font-bold text-white group-hover:text-rose-400 transition text-left truncate hover:underline"
                                    >
                                      {p.title}
                                    </button>

                                    {/* Difficulty Badge */}
                                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                      p.difficulty === 'Easy'
                                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                        : p.difficulty === 'Medium'
                                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                                    }`}>
                                      {p.difficulty}
                                    </span>

                                    {/* Company tags */}
                                    {p.companies?.slice(0, 2).map((c, i) => (
                                      <span
                                        key={i}
                                        className="text-[9.5px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700 hidden md:inline-block"
                                      >
                                        {c}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="text-[11px] text-slate-400 truncate max-w-lg mt-0.5">
                                    {p.description}
                                  </div>
                                </div>
                              </div>

                              {/* Right: Actions (Playground CTA, LeetCode link, YouTube link) */}
                              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                {/* YouTube Solution */}
                                {p.youtubeUrl && (
                                  <a
                                    href={p.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-red-950/80 text-slate-400 hover:text-red-400 border border-slate-700 transition"
                                    title="Watch Striver's Video Solution"
                                  >
                                    <Youtube className="w-4 h-4" />
                                  </a>
                                )}

                                {/* LeetCode Problem Link */}
                                {p.leetcodeUrl && (
                                  <a
                                    href={p.leetcodeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-amber-950/80 text-slate-400 hover:text-amber-400 border border-slate-700 transition"
                                    title="Open on LeetCode"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}

                                {/* Bookmark button */}
                                <button
                                  type="button"
                                  onClick={(e) => handleToggleBookmark(p.id, e)}
                                  className={`p-2 rounded-xl border transition ${
                                    isBookmarked
                                      ? 'bg-amber-950/80 text-amber-400 border-amber-700'
                                      : 'bg-slate-800/80 text-slate-400 hover:text-white border-slate-700'
                                  }`}
                                  title="Bookmark problem"
                                >
                                  <Bookmark className="w-4 h-4" />
                                </button>

                                {/* SOLVE IN PLAYGROUND BUTTON */}
                                <button
                                  type="button"
                                  onClick={() => onOpenProblemInPlayground?.(p)}
                                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-bold transition shadow-md shadow-rose-500/20 cursor-pointer"
                                >
                                  <Code2 className="w-3.5 h-3.5" />
                                  <span>Solve</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
