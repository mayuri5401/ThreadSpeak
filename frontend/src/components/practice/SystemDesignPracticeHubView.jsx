import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, CheckCircle2, Circle, Code2, Play, 
  Search, Filter, ChevronDown, ChevronRight, BookOpen, 
  Trophy, Flame, Zap, ArrowRight, Layers, HelpCircle, Check, 
  RotateCcw, SlidersHorizontal, ListFilter, Compass, Bookmark,
  TrendingUp, Award, Laptop, Hash, ShieldCheck, Tag, Terminal,
  CheckSquare, Square, Star, Network, Cpu, Database, HardDrive,
  Share2, RefreshCw, Boxes, Grid, Activity, GitPullRequest, Eye, Shield,
  Maximize2, Send, ChevronUp, Shuffle
} from 'lucide-react';

import { 
  SYSTEM_DESIGN_CATEGORIES, 
  SYSTEM_DESIGN_PROBLEMS,
  SYSTEM_DESIGN_TOPICS_LIST 
} from '../../data/systemDesignPracticeData';

// Category Icon Mapping
const CATEGORY_ICONS = {
  'core-concepts': Layers,
  'networking': Network,
  'load-balancing': Cpu,
  'api-fundamentals': Terminal,
  'communication-patterns': Send,
  'caching': Zap,
  'databases': Database,
  'database-scaling': Maximize2,
  'storage-systems': HardDrive,
  'distributed-concepts': Share2,
  'distributed-transactions': RefreshCw,
  'distributed-data-structures': Boxes,
  'microservices': Grid,
  'big-data-processing': Activity,
  'deployment-patterns': GitPullRequest,
  'observability': Eye,
  'security': Shield
};

export default function SystemDesignPracticeHubView({ onOpenProblemInPlayground }) {
  // Solved state stored in localStorage
  const [solvedIds, setSolvedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_system_design_solved');
      return saved ? new Set(JSON.parse(saved)) : new Set(['calculate-system-availability', 'solve-littles-law']);
    } catch {
      return new Set(['calculate-system-availability', 'solve-littles-law']);
    }
  });

  // Bookmarked problems state
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_system_design_bookmarks');
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
  const [selectedTopicTag, setSelectedTopicTag] = useState('ALL');

  // Accordion state (all categories open by default)
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const initial = {};
    SYSTEM_DESIGN_CATEGORIES.forEach(c => { initial[c.id] = true; });
    return initial;
  });

  const toggleAccordion = (id) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const all = {};
    SYSTEM_DESIGN_CATEGORIES.forEach(c => { all[c.id] = true; });
    setExpandedCategories(all);
  };

  const handleCollapseAll = () => {
    const none = {};
    SYSTEM_DESIGN_CATEGORIES.forEach(c => { none[c.id] = false; });
    setExpandedCategories(none);
  };

  // Toggle Solved
  const handleToggleSolved = (problemId, e) => {
    if (e) e.stopPropagation();
    setSolvedIds(prev => {
      const next = new Set(prev);
      if (next.has(problemId)) {
        next.delete(problemId);
      } else {
        next.add(problemId);
      }
      try {
        localStorage.setItem('threadspeak_system_design_solved', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  // Toggle Bookmark
  const handleToggleBookmark = (problemId, e) => {
    if (e) e.stopPropagation();
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(problemId)) {
        next.delete(problemId);
      } else {
        next.add(problemId);
      }
      try {
        localStorage.setItem('threadspeak_system_design_bookmarks', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  // Open Problem in Playground
  const handleSolveProblem = (problem) => {
    if (onOpenProblemInPlayground) {
      onOpenProblemInPlayground(problem);
    }
  };

  // Pick a Random Problem
  const handleRandomProblem = () => {
    const candidateList = filteredProblems.length > 0 ? filteredProblems : SYSTEM_DESIGN_PROBLEMS;
    const unsolvedList = candidateList.filter(p => !solvedIds.has(p.id));
    const targetPool = unsolvedList.length > 0 ? unsolvedList : candidateList;
    const randomIndex = Math.floor(Math.random() * targetPool.length);
    const chosen = targetPool[randomIndex];
    if (chosen) {
      handleSolveProblem(chosen);
    }
  };

  // Filtered Problem Set
  const filteredProblems = useMemo(() => {
    return SYSTEM_DESIGN_PROBLEMS.filter(p => {
      // Category filter
      if (selectedCategory !== 'ALL' && p.category !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'ALL' && p.difficulty !== selectedDifficulty) {
        return false;
      }
      // Topic tag filter
      if (selectedTopicTag !== 'ALL' && !p.topics.includes(selectedTopicTag)) {
        return false;
      }
      // Status filter
      if (selectedStatus === 'SOLVED' && !solvedIds.has(p.id)) return false;
      if (selectedStatus === 'UNSOLVED' && solvedIds.has(p.id)) return false;
      if (selectedStatus === 'BOOKMARKED' && !bookmarkedIds.has(p.id)) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesNum = String(p.number) === query || `#${p.number}` === query;
        const matchesTopic = p.topics.some(t => t.toLowerCase().includes(query));
        const matchesSummary = p.summary.toLowerCase().includes(query);
        if (!matchesTitle && !matchesNum && !matchesTopic && !matchesSummary) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDifficulty, selectedStatus, selectedCategory, selectedTopicTag, solvedIds, bookmarkedIds]);

  // Statistics Computations
  const totalCount = SYSTEM_DESIGN_PROBLEMS.length;
  const solvedCount = SYSTEM_DESIGN_PROBLEMS.filter(p => solvedIds.has(p.id)).length;
  const progressPercent = Math.round((solvedCount / (totalCount || 1)) * 100);

  const easyTotal = SYSTEM_DESIGN_PROBLEMS.filter(p => p.difficulty === 'Easy').length;
  const easySolved = SYSTEM_DESIGN_PROBLEMS.filter(p => p.difficulty === 'Easy' && solvedIds.has(p.id)).length;

  const medTotal = SYSTEM_DESIGN_PROBLEMS.filter(p => p.difficulty === 'Medium').length;
  const medSolved = SYSTEM_DESIGN_PROBLEMS.filter(p => p.difficulty === 'Medium' && solvedIds.has(p.id)).length;

  const hardTotal = SYSTEM_DESIGN_PROBLEMS.filter(p => p.difficulty === 'Hard').length;
  const hardSolved = SYSTEM_DESIGN_PROBLEMS.filter(p => p.difficulty === 'Hard' && solvedIds.has(p.id)).length;

  // Group filtered problems by category
  const problemsByCategory = useMemo(() => {
    const map = {};
    SYSTEM_DESIGN_CATEGORIES.forEach(cat => {
      map[cat.id] = [];
    });
    filteredProblems.forEach(p => {
      if (map[p.category]) {
        map[p.category].push(p);
      }
    });
    return map;
  }, [filteredProblems]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ── Top Hero Card ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B132B]/90 via-[#0F1C3F]/70 to-[#0A0E1A]/95 border border-cyan-500/20 shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>150 Real-World Engineering Scenarios</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              System Design Practice
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Practice implementing fundamental system design concepts in code by solving common interview and real-world distributed architectures.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleRandomProblem}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-extrabold shadow-lg shadow-cyan-500/20 active:scale-95 transition group"
              >
                <Shuffle className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                <span>Random Scenario</span>
              </button>

              <button
                onClick={handleExpandAll}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-xs font-bold transition"
              >
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Expand All</span>
              </button>

              <button
                onClick={handleCollapseAll}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-xs font-bold transition"
              >
                <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                <span>Collapse All</span>
              </button>
            </div>
          </div>

          {/* ── Progress Dial & Stats ── */}
          <div className="w-full lg:w-auto bg-slate-900/80 border border-slate-800/90 rounded-2xl p-5 shrink-0 shadow-inner flex flex-col sm:flex-row items-center gap-6">
            
            {/* Circular Progress Ring */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-cyan-400 transition-all duration-700 ease-out"
                    strokeDasharray={`${progressPercent}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-black font-mono text-white leading-none">
                    {progressPercent}%
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                    SOLVED
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">Overall Progress</div>
                <div className="text-xl font-black text-white font-mono mt-0.5">
                  {solvedCount} <span className="text-xs font-mono text-slate-500 font-normal">/ {totalCount}</span>
                </div>
                <div className="text-[11px] text-cyan-400 font-semibold mt-0.5">
                  {totalCount - solvedCount} remaining
                </div>
              </div>
            </div>

            <div className="w-full sm:w-px h-px sm:h-16 bg-slate-800" />

            {/* Difficulty Breakdown */}
            <div className="grid grid-cols-3 sm:flex sm:flex-col gap-3 w-full sm:w-auto">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Easy
                </span>
                <span className="text-xs font-mono font-bold text-slate-300">{easySolved}/{easyTotal}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" /> Medium
                </span>
                <span className="text-xs font-mono font-bold text-slate-300">{medSolved}/{medTotal}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" /> Hard
                </span>
                <span className="text-xs font-mono font-bold text-slate-300">{hardSolved}/{hardTotal}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls Bar ── */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by problem title, number (#29), topic (e.g. Raft, Token Bucket)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 text-slate-200 placeholder-slate-500 text-xs font-medium outline-none transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-xs font-bold outline-none cursor-pointer focus:border-cyan-500/50"
            >
              <option value="ALL">All Categories (17)</option>
              {SYSTEM_DESIGN_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-xs font-bold outline-none cursor-pointer focus:border-cyan-500/50"
            >
              <option value="ALL">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-xs font-bold outline-none cursor-pointer focus:border-cyan-500/50"
            >
              <option value="ALL">Any Status</option>
              <option value="SOLVED">Solved ({solvedCount})</option>
              <option value="UNSOLVED">Unsolved ({totalCount - solvedCount})</option>
              <option value="BOOKMARKED">Bookmarked ({bookmarkedIds.size})</option>
            </select>

            {/* Topic Filter */}
            <select
              value={selectedTopicTag}
              onChange={(e) => setSelectedTopicTag(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-xs font-bold outline-none cursor-pointer focus:border-cyan-500/50 max-w-[180px] truncate"
            >
              <option value="ALL">All Topics</option>
              {SYSTEM_DESIGN_TOPICS_LIST.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>

            {(selectedCategory !== 'ALL' || selectedDifficulty !== 'ALL' || selectedStatus !== 'ALL' || selectedTopicTag !== 'ALL' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedDifficulty('ALL');
                  setSelectedStatus('ALL');
                  setSelectedTopicTag('ALL');
                  setSearchQuery('');
                }}
                className="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-bold transition flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Summary Results */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/80">
          <span>Showing {filteredProblems.length} of {totalCount} System Design Scenarios</span>
          <span className="text-cyan-400 font-bold">{solvedCount} Solved</span>
        </div>
      </div>

      {/* ── Category Sections & Problem Lists ── */}
      {filteredProblems.length === 0 ? (
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-12 text-center space-y-3">
          <Layers className="w-12 h-12 text-slate-600 mx-auto animate-bounce" />
          <h3 className="text-base font-bold text-slate-200">No System Design Problems Match Your Filters</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search query, difficulty level, topic tags, or status filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedDifficulty('ALL');
              setSelectedStatus('ALL');
              setSelectedTopicTag('ALL');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {SYSTEM_DESIGN_CATEGORIES.map(category => {
            const problemsInCat = problemsByCategory[category.id] || [];
            if (problemsInCat.length === 0) return null;

            const allInCatTotal = SYSTEM_DESIGN_PROBLEMS.filter(p => p.category === category.id).length;
            const solvedInCat = SYSTEM_DESIGN_PROBLEMS.filter(p => p.category === category.id && solvedIds.has(p.id)).length;
            const isExpanded = !!expandedCategories[category.id];
            const Icon = CATEGORY_ICONS[category.id] || Layers;

            return (
              <div 
                key={category.id}
                className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-lg transition"
              >
                {/* Category Accordion Header */}
                <button
                  onClick={() => toggleAccordion(category.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between hover:bg-slate-800/40 transition group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`p-2.5 rounded-xl ${category.bg} ${category.color} border ${category.border} shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-white group-hover:text-cyan-400 transition truncate">
                          {category.title}
                        </h2>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-semibold shrink-0">
                          {solvedInCat}/{allInCatTotal} solved
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {category.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:block w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${(solvedInCat / (allInCatTotal || 1)) * 100}%` }}
                      />
                    </div>
                    <div className="p-1 rounded-lg bg-slate-800/80 text-slate-400 group-hover:text-white transition">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Problems Table inside Accordion */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 divide-y divide-slate-800/60">
                    {problemsInCat.map(problem => {
                      const isSolved = solvedIds.has(problem.id);
                      const isBookmarked = bookmarkedIds.has(problem.id);

                      const diffColor = problem.difficulty === 'Easy' 
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                        : problem.difficulty === 'Medium' 
                          ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' 
                          : 'text-rose-400 bg-rose-500/10 border-rose-500/20';

                      return (
                        <div
                          key={problem.id}
                          className={`p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-800/30 transition group ${
                            isSolved ? 'bg-emerald-950/10' : ''
                          }`}
                        >
                          {/* Left: Checkbox + Number + Title */}
                          <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                            
                            {/* Solved Checkbox */}
                            <button
                              onClick={(e) => handleToggleSolved(problem.id, e)}
                              className={`p-1 rounded-lg transition shrink-0 mt-0.5 sm:mt-0 ${
                                isSolved 
                                  ? 'text-emerald-400 bg-emerald-500/20 hover:bg-emerald-500/30' 
                                  : 'text-slate-600 hover:text-slate-400'
                              }`}
                              title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                            >
                              {isSolved ? (
                                <CheckCircle2 className="w-5 h-5 fill-emerald-500/20" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>

                            {/* Bookmark Star */}
                            <button
                              onClick={(e) => handleToggleBookmark(problem.id, e)}
                              className={`p-1 rounded-lg transition shrink-0 mt-0.5 sm:mt-0 ${
                                isBookmarked 
                                  ? 'text-amber-400 bg-amber-500/20 hover:bg-amber-500/30' 
                                  : 'text-slate-600 hover:text-slate-400'
                              }`}
                              title={isBookmarked ? "Remove bookmark" : "Bookmark this scenario"}
                            >
                              <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                            </button>

                            {/* Problem Number */}
                            <span className="text-xs font-mono font-bold text-slate-500 shrink-0 w-8">
                              #{problem.number}
                            </span>

                            {/* Title & Topic Tags */}
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  onClick={() => handleSolveProblem(problem)}
                                  className="text-left font-bold text-sm text-slate-200 hover:text-cyan-400 transition"
                                >
                                  {problem.title}
                                </button>
                              </div>

                              {/* Topic Badges */}
                              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                {problem.topics.map((t, idx) => (
                                  <span
                                    key={idx}
                                    onClick={() => setSelectedTopicTag(t)}
                                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 cursor-pointer border border-slate-700/60 transition"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right: Difficulty Tag & Action Button */}
                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center pl-11 sm:pl-0">
                            <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border ${diffColor}`}>
                              {problem.difficulty}
                            </span>

                            <button
                              onClick={() => handleSolveProblem(problem)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-300 text-xs font-bold shadow-sm transition group/btn active:scale-95"
                            >
                              <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400 group-hover/btn:scale-110 transition-transform" />
                              <span>Solve</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
