import React, { useState, useMemo } from 'react';
import { 
  Sparkles, CheckCircle2, Circle, Code2, Play, 
  Search, Filter, ChevronDown, ChevronRight, BookOpen, 
  Trophy, Flame, Zap, ArrowRight, Layers, HelpCircle, Check, 
  RotateCcw, SlidersHorizontal, ListFilter, Compass, Bookmark,
  TrendingUp, Award, Laptop, Hash, ShieldCheck, Tag, Terminal,
  CheckSquare, Square, Star, Lock, Key, Cpu, Database,
  Maximize2, Send, ChevronUp, Shuffle, AlertTriangle, RefreshCw
} from 'lucide-react';

import { 
  CONCURRENCY_CATEGORIES, 
  CONCURRENCY_PROBLEMS,
  CONCURRENCY_TOPICS_LIST 
} from '../../data/concurrencyPracticeData';

// Category Icon Mapping
const CATEGORY_ICONS = {
  'synchronization-primitives': Lock,
  'locking-strategies': Key,
  'lock-free-programming': Zap,
  'concurrency-challenges': AlertTriangle,
  'concurrency-patterns': Layers,
  'classic-problems': Award,
  'thread-safe-data-structures': Database,
  'multithreading-algorithms': Cpu,
  'concurrency-design-questions': Maximize2
};

export default function ConcurrencyPracticeHubView({ onOpenProblemInPlayground }) {
  // Solved state stored in localStorage
  const [solvedIds, setSolvedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_concurrency_solved');
      return saved ? new Set(JSON.parse(saved)) : new Set(['design-thread-safe-bank-account']);
    } catch {
      return new Set(['design-thread-safe-bank-account']);
    }
  });

  // Bookmarked problems state
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_concurrency_bookmarks');
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
    CONCURRENCY_CATEGORIES.forEach(c => { initial[c.id] = true; });
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
    CONCURRENCY_CATEGORIES.forEach(c => { all[c.id] = true; });
    setExpandedCategories(all);
  };

  const handleCollapseAll = () => {
    const none = {};
    CONCURRENCY_CATEGORIES.forEach(c => { none[c.id] = false; });
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
        localStorage.setItem('threadspeak_concurrency_solved', JSON.stringify(Array.from(next)));
      } catch (err) {
        console.warn("Failed to persist solved state:", err);
      }
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
        localStorage.setItem('threadspeak_concurrency_bookmarks', JSON.stringify(Array.from(next)));
      } catch (err) {
        console.warn("Failed to persist bookmark state:", err);
      }
      return next;
    });
  };

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return CONCURRENCY_PROBLEMS.filter(p => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchTopic = p.topics.some(t => t.toLowerCase().includes(q));
        const matchCategory = p.categoryTitle.toLowerCase().includes(q);
        const matchNum = String(p.number) === q || `#${p.number}` === q;
        if (!matchTitle && !matchTopic && !matchCategory && !matchNum) return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'ALL' && p.difficulty !== selectedDifficulty) {
        return false;
      }

      // Category
      if (selectedCategory !== 'ALL' && p.category !== selectedCategory) {
        return false;
      }

      // Topic Tag
      if (selectedTopicTag !== 'ALL' && !p.topics.includes(selectedTopicTag)) {
        return false;
      }

      // Status
      if (selectedStatus === 'SOLVED' && !solvedIds.has(p.id)) return false;
      if (selectedStatus === 'UNSOLVED' && solvedIds.has(p.id)) return false;
      if (selectedStatus === 'BOOKMARKED' && !bookmarkedIds.has(p.id)) return false;

      return true;
    });
  }, [searchQuery, selectedDifficulty, selectedCategory, selectedTopicTag, selectedStatus, solvedIds, bookmarkedIds]);

  // Group filtered problems by category
  const problemsByCategory = useMemo(() => {
    const map = {};
    CONCURRENCY_CATEGORIES.forEach(c => { map[c.id] = []; });
    filteredProblems.forEach(p => {
      if (map[p.category]) {
        map[p.category].push(p);
      }
    });
    return map;
  }, [filteredProblems]);

  // Overall Statistics
  const totalCount = CONCURRENCY_PROBLEMS.length;
  const solvedCount = solvedIds.size;
  const progressPercent = Math.round((solvedCount / totalCount) * 100) || 0;

  // Random problem handler
  const handleRandomProblem = () => {
    const unsolved = CONCURRENCY_PROBLEMS.filter(p => !solvedIds.has(p.id));
    const pool = unsolved.length > 0 ? unsolved : CONCURRENCY_PROBLEMS;
    const random = pool[Math.floor(Math.random() * pool.length)];
    if (random && onOpenProblemInPlayground) {
      onOpenProblemInPlayground(random);
    }
  };

  const handleSolveProblem = (problem) => {
    if (onOpenProblemInPlayground) {
      onOpenProblemInPlayground(problem);
    }
  };

  const isAllExpanded = Object.values(expandedCategories).every(Boolean);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* TOP HERO BANNER: Title, Progress Ring, Stats & Actions                     */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Left Title & Description */}
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-bold tracking-wide">
              <Zap className="w-3.5 h-3.5" />
              <span>Multi-Threaded Concurrency Arena</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Concurrency Practice
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Practice writing actual multi-threaded code for common concurrency challenges in interviews and real-world scenarios.
            </p>

            {/* Quick Link Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-slate-400 font-mono">
                <b>50</b> Problems • <b>9</b> Categories • <b>Java 21</b> Virtual Threads Ready
              </span>
            </div>
          </div>

          {/* Right Progress Summary Card with Circular Ring */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-md shrink-0 w-full sm:w-auto">
            {/* SVG Progress Circle */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-400 transition-all duration-700 ease-out"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xs font-mono font-black text-white">{progressPercent}%</span>
              </div>
            </div>

            {/* Progress Text & Quick Action Buttons */}
            <div className="space-y-1.5">
              <div className="text-xs text-slate-400 font-medium">Your progress</div>
              <div className="text-base font-black text-white font-mono">
                <span className="text-amber-400">{solvedCount}</span> of {totalCount} solved
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleRandomProblem}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition active:scale-95 cursor-pointer"
                >
                  <Shuffle className="w-3 h-3" />
                  <span>Random problem</span>
                </button>
                <button
                  onClick={isAllExpanded ? handleCollapseAll : handleExpandAll}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition cursor-pointer"
                >
                  <span>{isAllExpanded ? "Hide groups" : "Expand groups"}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* FILTER & SEARCH TOOLBAR                                                  */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Bar (Left 5 Cols) */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concurrency problem, topic, or #num..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-amber-500 focus:outline-none text-xs sm:text-sm text-slate-200 placeholder-slate-500 font-mono transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Difficulty Dropdown (2 Cols) */}
          <div className="md:col-span-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono font-bold text-slate-300 focus:border-amber-500 focus:outline-none transition cursor-pointer"
            >
              <option value="ALL">All difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Category Dropdown (3 Cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono font-bold text-slate-300 focus:border-amber-500 focus:outline-none transition cursor-pointer"
            >
              <option value="ALL">All categories (9)</option>
              {CONCURRENCY_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          {/* Status Dropdown (2 Cols) */}
          <div className="md:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono font-bold text-slate-300 focus:border-amber-500 focus:outline-none transition cursor-pointer"
            >
              <option value="ALL">Any status</option>
              <option value="SOLVED">Solved ({solvedCount})</option>
              <option value="UNSOLVED">Unsolved ({totalCount - solvedCount})</option>
              <option value="BOOKMARKED">Bookmarked ({bookmarkedIds.size})</option>
            </select>
          </div>

        </div>

        {/* Quick Topic Badges Scroll Area */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pt-1 pb-1">
          <span className="text-[11px] font-mono text-slate-500 font-bold shrink-0 flex items-center gap-1">
            <Tag className="w-3 h-3" /> Topics:
          </span>
          <button
            onClick={() => setSelectedTopicTag('ALL')}
            className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-semibold transition shrink-0 ${
              selectedTopicTag === 'ALL'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All ({CONCURRENCY_TOPICS_LIST.length})
          </button>
          {CONCURRENCY_TOPICS_LIST.map((topic, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTopicTag(selectedTopicTag === topic ? 'ALL' : topic)}
              className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-semibold transition shrink-0 ${
                selectedTopicTag === topic
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PROBLEMS ACCORDION LIST: 9 Categories with Problems Grid / Table          */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        {CONCURRENCY_CATEGORIES.map((category) => {
          const problemsInCat = problemsByCategory[category.id] || [];
          if (problemsInCat.length === 0 && (searchQuery || selectedDifficulty !== 'ALL' || selectedCategory !== 'ALL' || selectedTopicTag !== 'ALL' || selectedStatus !== 'ALL')) {
            return null; // Skip empty categories when filtering
          }

          const isExpanded = !!expandedCategories[category.id];
          const solvedInCat = problemsInCat.filter(p => solvedIds.has(p.id)).length;
          const totalInCat = CONCURRENCY_PROBLEMS.filter(p => p.category === category.id).length;
          const Icon = CATEGORY_ICONS[category.id] || Lock;

          return (
            <div 
              key={category.id} 
              className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden backdrop-blur-md transition shadow-lg"
            >
              {/* Category Accordion Header */}
              <button
                onClick={() => toggleAccordion(category.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-slate-800/40 transition group cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`p-2.5 rounded-xl ${category.bg} ${category.color} ${category.border} border shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-amber-300 transition">
                        {category.title}
                      </h3>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/80">
                        {solvedInCat}/{totalInCat} solved
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5 max-w-xl">
                      {category.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Category Progress mini-bar */}
                  <div className="hidden sm:flex items-center w-24 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 transition-all duration-500 rounded-full"
                      style={{ width: `${totalInCat > 0 ? (solvedInCat / totalInCat) * 100 : 0}%` }}
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
                        {/* Left: Checkbox + Bookmark + Number + Title */}
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
                                className="text-left font-bold text-sm text-slate-200 hover:text-amber-300 transition"
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
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/60 text-amber-300 text-xs font-bold shadow-sm transition group/btn active:scale-95"
                          >
                            <span>Solve Challenge</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
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

      {/* Empty Filter State */}
      {filteredProblems.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
          <h4 className="font-bold text-white">No concurrency challenges match your filters</h4>
          <p className="text-xs text-slate-400">Try changing your search query, difficulty, category, or status selection.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDifficulty('ALL');
              setSelectedCategory('ALL');
              setSelectedTopicTag('ALL');
              setSelectedStatus('ALL');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
          >
            Reset all filters
          </button>
        </div>
      )}

    </div>
  );
}
