import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, CheckCircle2, Circle, Code2, Play, ExternalLink, 
  Search, Filter, ChevronDown, ChevronRight, BookOpen, 
  Trophy, Flame, Zap, ArrowRight, Layers, HelpCircle, Check, 
  RotateCcw, SlidersHorizontal, ListFilter, Compass, Bookmark,
  TrendingUp, Award, Laptop, Hash, ShieldCheck, Tag, Terminal,
  CheckSquare, Square, Star
} from 'lucide-react';

import { BLIND75_CATEGORIES, BLIND75_PROBLEMS } from '../../data/blind75SheetData';
import { A2Z_STEPS, A2Z_PROBLEMS } from '../../data/a2zDsaSheetData';

/**
 * DsaPracticeHubView
 * Unified High-Performance Practice Portal combining:
 * 1. Blind 75 LeetCode Problem Set
 * 2. Comprehensive A-to-Z DSA Sheet (18 Step-by-Step Roadmap)
 * 
 * Features:
 * - Live Solved Tracking & localStorage Persistence
 * - Multi-criteria Filters (Difficulty, Status, Categories, Company tags)
 * - Direct One-Click Redirection to our LeetCode-Style Playground
 * - LeetCode links & multi-language test runners
 */
export default function DsaPracticeHubView({ onOpenProblemInPlayground, defaultSheet = 'blind-75' }) {
  // Active Sheet Tab: 'blind-75' | 'a2z-sheet' (supports legacy 'strivers-a2z')
  const [activeSheet, setActiveSheet] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_active_dsa_sheet');
      const initial = saved || defaultSheet;
      return (initial === 'strivers-a2z' || initial === 'strivers-sheet') ? 'a2z-sheet' : initial;
    } catch {
      return (defaultSheet === 'strivers-a2z' || defaultSheet === 'strivers-sheet') ? 'a2z-sheet' : defaultSheet;
    }
  });

  const handleSelectSheet = (sheetId) => {
    setActiveSheet(sheetId);
    try {
      localStorage.setItem('threadspeak_active_dsa_sheet', sheetId);
    } catch {}
  };

  // Solved problems state stored in localStorage
  const [solvedBlind75, setSolvedBlind75] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_blind75_solved');
      return saved ? new Set(JSON.parse(saved)) : new Set(['two-sum', 'best-time-to-buy-and-sell-stock']);
    } catch {
      return new Set(['two-sum', 'best-time-to-buy-and-sell-stock']);
    }
  });

  const [solvedA2Z, setSolvedA2Z] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_a2z_solved') || localStorage.getItem('threadspeak_strivers_solved');
      return saved ? new Set(JSON.parse(saved)) : new Set(['count-digits', 'two-sum']);
    } catch {
      return new Set(['count-digits', 'two-sum']);
    }
  });

  // Bookmarked problems state
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_dsa_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL'); // 'ALL' | 'Easy' | 'Medium' | 'Hard'
  const [selectedStatus, setSelectedStatus] = useState('ALL'); // 'ALL' | 'SOLVED' | 'UNSOLVED' | 'BOOKMARKED'
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Accordion state
  const [expandedCategories, setExpandedCategories] = useState({});

  // Initialize all accordions to expanded
  useEffect(() => {
    const initial = {};
    if (activeSheet === 'blind-75') {
      BLIND75_CATEGORIES.forEach(c => { initial[c.id] = true; });
    } else {
      A2Z_STEPS.forEach(s => { initial[s.stepNumber] = true; });
    }
    setExpandedCategories(initial);
  }, [activeSheet]);

  const toggleAccordion = (id) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleToggleSolved = (problemId, e) => {
    e?.stopPropagation();
    if (activeSheet === 'blind-75') {
      setSolvedBlind75(prev => {
        const next = new Set(prev);
        if (next.has(problemId)) next.delete(problemId);
        else next.add(problemId);
        localStorage.setItem('threadspeak_blind75_solved', JSON.stringify(Array.from(next)));
        return next;
      });
    } else {
      setSolvedA2Z(prev => {
        const next = new Set(prev);
        if (next.has(problemId)) next.delete(problemId);
        else next.add(problemId);
        localStorage.setItem('threadspeak_a2z_solved', JSON.stringify(Array.from(next)));
        localStorage.setItem('threadspeak_strivers_solved', JSON.stringify(Array.from(next)));
        return next;
      });
    }
  };

  const handleToggleBookmark = (problemId, e) => {
    e?.stopPropagation();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(problemId)) next.delete(problemId);
      else next.add(problemId);
      localStorage.setItem('threadspeak_dsa_bookmarks', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  // Current problem list and solved set based on active sheet
  const currentProblems = activeSheet === 'blind-75' ? BLIND75_PROBLEMS : A2Z_PROBLEMS;
  const currentSolvedSet = activeSheet === 'blind-75' ? solvedBlind75 : solvedA2Z;

  // Filtered problems computation
  const filteredProblems = useMemo(() => {
    return currentProblems.filter(p => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title?.toLowerCase().includes(q);
        const matchesCategory = (p.category || p.subTopic || '')?.toLowerCase().includes(q);
        const matchesCompanies = p.companies?.some(c => c.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCategory && !matchesCompanies) return false;
      }

      // 2. Difficulty
      if (selectedDifficulty !== 'ALL' && p.difficulty !== selectedDifficulty) {
        return false;
      }

      // 3. Status
      if (selectedStatus === 'SOLVED' && !currentSolvedSet.has(p.id)) return false;
      if (selectedStatus === 'UNSOLVED' && currentSolvedSet.has(p.id)) return false;
      if (selectedStatus === 'BOOKMARKED' && !bookmarkedIds.has(p.id)) return false;

      // 4. Category Filter
      if (selectedCategory !== 'ALL') {
        if (activeSheet === 'blind-75' && p.categoryId !== selectedCategory) return false;
        if ((activeSheet === 'a2z-sheet' || activeSheet === 'strivers-a2z') && p.stepNumber !== Number(selectedCategory)) return false;
      }

      return true;
    });
  }, [currentProblems, searchQuery, selectedDifficulty, selectedStatus, selectedCategory, currentSolvedSet, bookmarkedIds, activeSheet]);

  // Statistics calculation
  const totalCount = currentProblems.length;
  const solvedCount = currentProblems.filter(p => currentSolvedSet.has(p.id)).length;
  const progressPercent = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  const easyTotal = currentProblems.filter(p => p.difficulty === 'Easy').length;
  const easySolved = currentProblems.filter(p => p.difficulty === 'Easy' && currentSolvedSet.has(p.id)).length;

  const medTotal = currentProblems.filter(p => p.difficulty === 'Medium').length;
  const medSolved = currentProblems.filter(p => p.difficulty === 'Medium' && currentSolvedSet.has(p.id)).length;

  const hardTotal = currentProblems.filter(p => p.difficulty === 'Hard').length;
  const hardSolved = currentProblems.filter(p => p.difficulty === 'Hard' && currentSolvedSet.has(p.id)).length;

  const isA2ZActive = activeSheet === 'a2z-sheet' || activeSheet === 'strivers-a2z';

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-20">
      
      {/* ── TOP SWITCHER TABS: BLIND 75 vs A-TO-Z DSA SHEET ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleSelectSheet('blind-75')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeSheet === 'blind-75'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>Blind 75 LeetCode</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${activeSheet === 'blind-75' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
              Top 75
            </span>
          </button>

          <button
            onClick={() => handleSelectSheet('a2z-sheet')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
              isA2ZActive
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/25 ring-1 ring-rose-400/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Flame className="w-4 h-4 text-rose-200" />
            <span>Complete DSA Sheet (A-Z)</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isA2ZActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
              450+ Steps
            </span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-3 pr-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Multi-Language Sandbox Ready (Java, C++, Python, JS)
          </span>
        </div>
      </div>

      {/* ── HERO BANNER & STATS ── */}
      <div className={`glass-panel p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${
        activeSheet === 'blind-75' 
          ? 'border-cyan-500/30 bg-gradient-to-r from-[#071322] via-[#09152b] to-[#0d1026]'
          : 'border-rose-500/30 bg-gradient-to-r from-[#170918] via-[#140b22] to-[#0a1024]'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className={`p-2.5 rounded-2xl border shadow-lg ${
                activeSheet === 'blind-75' 
                  ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-400 shadow-cyan-950/50'
                  : 'bg-rose-950/80 border-rose-600/50 text-rose-400 shadow-rose-950/50'
              }`}>
                {activeSheet === 'blind-75' ? <Sparkles className="w-6 h-6 animate-pulse" /> : <Flame className="w-6 h-6 animate-pulse" />}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    activeSheet === 'blind-75'
                      ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                      : 'bg-rose-950 text-rose-300 border-rose-800'
                  }`}>
                    {activeSheet === 'blind-75' ? 'Blind 75 Curated Sheet' : 'Comprehensive DSA Sheet'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {activeSheet === 'blind-75' ? 'Blind 75 Essential LeetCode' : 'A-to-Z DSA Roadmap'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {activeSheet === 'blind-75' ? 'Blind 75 LeetCode Problems' : 'Complete DSA Sheet (A-to-Z)'}
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {activeSheet === 'blind 75' || activeSheet === 'blind-75'
                ? "The most frequently asked 75 LeetCode problems covering essential algorithmic patterns. Click any problem to open it directly in our built-in LeetCode-style Coding Playground."
                : "Master Data Structures & Algorithms step-by-step from beginner to advanced. Click any problem to open it in our built-in LeetCode-style Coding Playground."}
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
                    className={`${activeSheet === 'blind-75' ? 'text-cyan-400' : 'text-rose-400'} transition-all duration-1000 ease-out`}
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
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Progress</span>
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

        {/* Action Bar / Quick Guide */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-1.5 border border-slate-700/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Language Sandboxes (Java, C++, Python, JS)</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-slate-800/80 text-cyan-300 font-mono text-[11px] font-bold flex items-center gap-1.5 border border-slate-700/60">
              <Code2 className="w-3.5 h-3.5" />
              <span>Interactive LeetCode Playground</span>
            </span>
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            Click any problem to launch Coding Playground
          </div>
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ── */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-lg">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search problems by name, topic, or company (e.g. 'Two Sum', 'Google', 'Graph')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-xs sm:text-sm text-white placeholder:text-slate-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {['ALL', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  selectedDifficulty === diff
                    ? diff === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : diff === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : diff === 'Hard' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {[
              { id: 'ALL', label: 'All' },
              { id: 'SOLVED', label: 'Solved' },
              { id: 'UNSOLVED', label: 'Unsolved' },
              { id: 'BOOKMARKED', label: 'Starred' }
            ].map(status => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`px-2.5 py-1 rounded-lg font-bold transition ${
                  selectedStatus === status.id
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACCORDION PROBLEM GROUPS ── */}
      <div className="space-y-4">
        {activeSheet === 'blind-75' ? (
          // Blind 75 Categories
          BLIND75_CATEGORIES.map(category => {
            const categoryProblems = filteredProblems.filter(p => p.categoryId === category.id);
            if (categoryProblems.length === 0 && (searchQuery || selectedDifficulty !== 'ALL' || selectedStatus !== 'ALL')) {
              return null; // hide empty categories during search
            }

            const totalInCat = BLIND75_PROBLEMS.filter(p => p.categoryId === category.id).length;
            const solvedInCat = BLIND75_PROBLEMS.filter(p => p.categoryId === category.id && solvedBlind75.has(p.id)).length;
            const isExpanded = expandedCategories[category.id] ?? true;

            return (
              <div 
                key={category.id}
                className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-lg transition duration-200"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(category.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-800/40 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/50 shrink-0">
                      <Hash className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-white truncate">{category.title}</h2>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                          {categoryProblems.length} Problems
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {solvedInCat} / {totalInCat} completed
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Mini progress bar */}
                    <div className="hidden sm:block w-28 bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${totalInCat > 0 ? (solvedInCat / totalInCat) * 100 : 0}%` }}
                      />
                    </div>
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {/* Problems Table / List */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 divide-y divide-slate-800/50">
                    {categoryProblems.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500 font-mono">
                        No problems match your search filters in this category.
                      </div>
                    ) : (
                      categoryProblems.map(problem => {
                        const isSolved = solvedBlind75.has(problem.id);
                        const isBookmarked = bookmarkedIds.has(problem.id);

                        return (
                          <div
                            key={problem.id}
                            className={`p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-800/30 transition group ${
                              isSolved ? 'bg-emerald-950/10' : ''
                            }`}
                          >
                            {/* Left: Checkbox + Title + Meta */}
                            <div className="flex items-start gap-3 min-w-0 flex-1">
                              {/* Solved Checkbox */}
                              <button
                                onClick={(e) => handleToggleSolved(problem.id, e)}
                                className="mt-0.5 p-1 rounded hover:bg-slate-800 text-slate-400 transition"
                                title={isSolved ? 'Mark Unsolved' : 'Mark Solved'}
                              >
                                {isSolved ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
                                )}
                              </button>

                              {/* Star / Bookmark */}
                              <button
                                onClick={(e) => handleToggleBookmark(problem.id, e)}
                                className={`mt-0.5 p-1 rounded hover:bg-slate-800 transition ${isBookmarked ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
                                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Problem'}
                              >
                                <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                              </button>

                              {/* Title & Tags */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-xs font-mono text-slate-500">
                                    #{problem.leetcodeNumber}
                                  </span>
                                  <button
                                    onClick={() => onOpenProblemInPlayground?.(problem)}
                                    className={`text-sm font-bold text-left hover:text-cyan-400 transition truncate ${
                                      isSolved ? 'text-slate-300 line-through decoration-slate-600' : 'text-white'
                                    }`}
                                  >
                                    {problem.title}
                                  </button>
                                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                    problem.difficulty === 'Easy'
                                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                                      : problem.difficulty === 'Medium'
                                      ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                                      : 'bg-rose-950/80 text-rose-300 border-rose-800'
                                  }`}>
                                    {problem.difficulty}
                                  </span>
                                </div>

                                {/* Company Tags */}
                                {problem.companies && problem.companies.length > 0 && (
                                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                                    {problem.companies.slice(0, 4).map((company, cIdx) => (
                                      <span key={cIdx} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800/80 text-slate-400">
                                        {company}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Right Actions: Links + Solve in Playground */}
                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                              {problem.leetcodeUrl && (
                                <a
                                  href={problem.leetcodeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-xl bg-slate-800/60 hover:bg-amber-950/60 text-slate-400 hover:text-amber-400 border border-slate-700/50 transition"
                                  title="Open on LeetCode"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}

                              <button
                                onClick={() => onOpenProblemInPlayground?.(problem)}
                                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-950 transition"
                              >
                                <Terminal className="w-3.5 h-3.5" />
                                <span>Solve in Playground</span>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          // Complete A-to-Z DSA Steps
          A2Z_STEPS.map(step => {
            const stepProblems = filteredProblems.filter(p => p.stepNumber === step.stepNumber);
            if (stepProblems.length === 0 && (searchQuery || selectedDifficulty !== 'ALL' || selectedStatus !== 'ALL')) {
              return null;
            }

            const totalInStep = A2Z_PROBLEMS.filter(p => p.stepNumber === step.stepNumber).length;
            const solvedInStep = A2Z_PROBLEMS.filter(p => p.stepNumber === step.stepNumber && solvedA2Z.has(p.id)).length;
            const isExpanded = expandedCategories[step.stepNumber] ?? true;

            return (
              <div 
                key={step.stepNumber}
                className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-lg transition duration-200"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(step.stepNumber)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-800/40 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="p-2 rounded-xl bg-rose-950 text-rose-400 border border-rose-800/50 shrink-0 font-mono font-bold text-xs">
                      Step {step.stepNumber}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-white truncate">{step.title}</h2>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                          {stepProblems.length} Problems
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 truncate block max-w-xl">
                        {step.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:block w-28 bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-rose-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${totalInStep > 0 ? (solvedInStep / totalInStep) * 100 : 0}%` }}
                      />
                    </div>
                    {isExpanded ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                  </div>
                </button>

                {/* Problems Table / List */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 divide-y divide-slate-800/50">
                    {stepProblems.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500 font-mono">
                        No problems match your search filters in this step.
                      </div>
                    ) : (
                      stepProblems.map(problem => {
                        const isSolved = solvedA2Z.has(problem.id);
                        const isBookmarked = bookmarkedIds.has(problem.id);

                        return (
                          <div
                            key={problem.id}
                            className={`p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-800/30 transition group ${
                              isSolved ? 'bg-emerald-950/10' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3 min-w-0 flex-1">
                              <button
                                onClick={(e) => handleToggleSolved(problem.id, e)}
                                className="mt-0.5 p-1 rounded hover:bg-slate-800 text-slate-400 transition"
                                title={isSolved ? 'Mark Unsolved' : 'Mark Solved'}
                              >
                                {isSolved ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
                                )}
                              </button>

                              <button
                                onClick={(e) => handleToggleBookmark(problem.id, e)}
                                className={`mt-0.5 p-1 rounded hover:bg-slate-800 transition ${isBookmarked ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
                                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Problem'}
                              >
                                <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                              </button>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-900">
                                    {problem.subTopic || `Step ${problem.stepNumber}`}
                                  </span>
                                  <button
                                    onClick={() => onOpenProblemInPlayground?.(problem)}
                                    className={`text-sm font-bold text-left hover:text-rose-400 transition truncate ${
                                      isSolved ? 'text-slate-300 line-through decoration-slate-600' : 'text-white'
                                    }`}
                                  >
                                    {problem.title}
                                  </button>
                                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                    problem.difficulty === 'Easy'
                                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                                      : problem.difficulty === 'Medium'
                                      ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                                      : 'bg-rose-950/80 text-rose-300 border-rose-800'
                                  }`}>
                                    {problem.difficulty}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                              {problem.leetcodeUrl && (
                                <a
                                  href={problem.leetcodeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 rounded-xl bg-slate-800/60 hover:bg-amber-950/60 text-slate-400 hover:text-amber-400 border border-slate-700/50 transition"
                                  title="Open on LeetCode"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}

                              <button
                                onClick={() => onOpenProblemInPlayground?.(problem)}
                                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-950 transition"
                              >
                                <Terminal className="w-3.5 h-3.5" />
                                <span>Solve in Playground</span>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
