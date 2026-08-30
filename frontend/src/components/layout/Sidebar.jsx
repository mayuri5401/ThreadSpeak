import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, Search, Filter, Lock, RotateCcw, 
  FileText, CheckCircle2, Circle, ChevronDown, ChevronRight, 
  ChevronLeft, Sparkles, GripVertical, Bookmark,
  Check, BookOpen, Layers, Trophy, X, Star, Database, Server, Cpu, HardDrive, Scale, Shield, Zap
} from 'lucide-react';

/**
 * Sidebar
 * Authentic AlgoMaster-Style Curriculum Navigation Drawer:
 * - Docked flush to the left viewport edge with border-r
 * - Circular floating collapse button (‹) on the right border
 * - Header: Back to Home, Course Title, Progress % with Certificate badge and count
 * - Search bar with filter funnel
 * - Category accordions with completion status (○ 0/12 ⌵)
 * - Active subtopic highlight with emerald accent and difficulty badge (Beginner, Intermediate, Advanced)
 * - Complete smooth end-to-end scrolling
 */
export default function Sidebar({ 
  track, 
  topics = [], 
  selectedTopicId, 
  onSelectTopic, 
  completedTopicIds = new Set(), 
  bookmarkedTopicIds = new Set(),
  isOpen = false,
  onClose,
  isCollapsed = false,
  onToggleCollapse
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'incomplete' | 'bookmarked' | 'completed'
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Accordion category expand/collapse states
  const [expandedCategories, setExpandedCategories] = useState({});

  // Auto-expand category containing the active topic on load/change
  useEffect(() => {
    if (selectedTopicId && topics.length > 0) {
      const activeTopic = topics.find(t => t.id === selectedTopicId);
      if (activeTopic && activeTopic.category) {
        setExpandedCategories(prev => ({
          ...prev,
          [activeTopic.category]: true
        }));
      }
    }
  }, [selectedTopicId, topics]);

  // Group topics by category (order preserved)
  const categoryGroups = useMemo(() => {
    const map = new Map();
    
    topics.forEach((topic) => {
      const cat = topic.category || 'Core Concepts';
      if (!map.has(cat)) {
        map.set(cat, []);
      }
      map.get(cat).push(topic);
    });

    const groups = [];
    map.forEach((catTopics, category) => {
      // Apply search & filter
      const filtered = catTopics.filter(t => {
        const matchesSearch = !searchQuery || 
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.summary?.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (!matchesSearch) return false;

        if (activeFilter === 'completed') return completedTopicIds.has(t.id);
        if (activeFilter === 'incomplete') return !completedTopicIds.has(t.id);
        if (activeFilter === 'bookmarked') return bookmarkedTopicIds.has(t.id);
        return true;
      });

      if (filtered.length > 0 || !searchQuery) {
        const completedCount = catTopics.filter(t => completedTopicIds.has(t.id)).length;
        groups.push({
          category,
          topics: filtered,
          totalCount: catTopics.length,
          completedCount,
          isAllCompleted: completedCount === catTopics.length && catTopics.length > 0
        });
      }
    });

    // If track has an explicit categories list, sort groups by that exact order
    if (track?.categories && Array.isArray(track.categories)) {
      const orderMap = new Map(track.categories.map((c, i) => [c.toLowerCase().trim(), i]));
      groups.sort((a, b) => {
        const keyA = a.category.toLowerCase().trim();
        const keyB = b.category.toLowerCase().trim();
        const orderA = orderMap.has(keyA) ? orderMap.get(keyA) : 999;
        const orderB = orderMap.has(keyB) ? orderMap.get(keyB) : 999;
        return orderA - orderB;
      });
    }

    return groups;
  }, [topics, searchQuery, activeFilter, completedTopicIds, bookmarkedTopicIds, track]);

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Overall track progress calculation
  const totalCount = topics.length || 1;
  const completedCount = topics.filter(t => completedTopicIds.has(t.id)).length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalCount) * 100));
  const isCertificateUnlocked = progressPercent === 100;

  // Icon mapping for categories (matching AlgoMaster visual style)
  const getCategoryIcon = (category) => {
    const c = category.toLowerCase();
    if (c.includes('caching')) return '🥞';
    if (c.includes('database scaling')) return '🔄';
    if (c.includes('database') || c.includes('db')) return '🗄️';
    if (c.includes('storage')) return '🗃️';
    if (c.includes('tradeoff')) return '⚖️';
    if (c.includes('architect') || c.includes('pattern')) return '🏛️';
    if (c.includes('welcome') || c.includes('intro')) return '👋';
    if (c.includes('oop') || c.includes('object')) return '🧱';
    if (c.includes('exception') || c.includes('error')) return '⚡';
    if (c.includes('thread') || c.includes('concurrency')) return '⚙️';
    if (c.includes('collection') || c.includes('data')) return '📦';
    if (c.includes('hld') || c.includes('system')) return '🌐';
    if (c.includes('interview')) return '🎯';
    return '📁';
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#070B14] border-r border-slate-800/80 select-none relative">
      
      {/* Desktop Floating Circular Collapse Trigger (‹) on the right border */}
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center absolute -right-3.5 top-8 w-7 h-7 rounded-full bg-[#0B1120] border border-slate-700/80 text-slate-300 hover:text-white shadow-xl hover:scale-110 transition z-30 group"
          title="Collapse sidebar for wide reading"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* =================================================================== */}
      {/* 1. SIDEBAR HEADER: BACK TO HOME, TITLE, PROGRESS, SEARCH            */}
      {/* =================================================================== */}
      <div className="p-4 border-b border-slate-800/80 space-y-3 bg-[#070B14] shrink-0">
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition font-medium group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Home</span>
          </button>

          {/* Mobile Close Button (✕) */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Course Track Title */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
            {track?.title || 'System Design Fundamentals'}
          </h2>
        </div>

        {/* Progress Numbers Row */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-black text-white">{progressPercent}</span>
              <span className="text-xs font-bold text-slate-400">%</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <div className="flex items-center gap-1 font-semibold">
                {isCertificateUnlocked ? (
                  <Trophy className="w-3 h-3 text-amber-400" />
                ) : (
                  <Lock className="w-3 h-3 text-slate-500" />
                )}
                <span>Certificate</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-slate-400">{completedCount}/{totalCount}</span>
            </div>
          </div>

          {/* Progress Bar Line */}
          <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(progressPercent, 1)}%` }}
            />
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex items-center gap-1.5 pt-1">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters..."
              className="w-full bg-[#0B101D] border border-slate-800 rounded-xl pl-8 pr-7 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Funnel Button */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`p-2 rounded-xl border transition ${
                activeFilter !== 'all'
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-400 shadow-sm shadow-emerald-950'
                  : 'bg-[#0B101D] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
              title="Filter chapters"
            >
              <Filter className="w-3.5 h-3.5" />
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 top-full mt-2 w-44 p-1.5 rounded-xl bg-[#0C1222] border border-slate-800 shadow-2xl z-30 space-y-0.5 animate-in fade-in zoom-in-95">
                <span className="text-[9.5px] text-slate-400 font-mono block px-2 py-0.5">Filter Topics</span>
                {[
                  { id: 'all', label: 'All Chapters' },
                  { id: 'incomplete', label: 'Incomplete' },
                  { id: 'completed', label: 'Completed' },
                  { id: 'bookmarked', label: 'Bookmarked' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setActiveFilter(opt.id);
                      setShowFilterMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                      activeFilter === opt.id
                        ? 'bg-emerald-950 text-emerald-300 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {activeFilter === opt.id && <Check className="w-3 h-3 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* =================================================================== */}
      {/* 2. ACCORDION CATEGORIES & SUBTOPICS LIST (END-TO-END SCROLLING)     */}
      {/* =================================================================== */}
      <div className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-1.5 font-sans scrollbar-thin scrollbar-thumb-slate-800 hover:scrollbar-thumb-slate-700 pb-16">
        {categoryGroups.length === 0 ? (
          <div className="text-center py-12 px-4 space-y-2">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400 font-medium">No chapters match your query.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
              className="text-xs text-emerald-400 hover:underline font-semibold"
            >
              Reset search & filter
            </button>
          </div>
        ) : (
          categoryGroups.map((group) => {
            const isExpanded = expandedCategories[group.category] ?? false;
            const categoryIcon = getCategoryIcon(group.category);

            return (
              <div 
                key={group.category}
                className="rounded-xl overflow-hidden transition-colors duration-200"
              >
                {/* Category Accordion Header */}
                <button
                  onClick={() => toggleCategory(group.category)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-900/80 transition text-left group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="text-base shrink-0 select-none">{categoryIcon}</span>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-slate-100 truncate">
                      {group.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <span className={`w-2 h-2 rounded-full ${group.isAllCompleted ? 'bg-emerald-400' : 'border border-slate-600'}`} />
                      <span>{group.completedCount}/{group.totalCount}</span>
                    </div>

                    <ChevronDown 
                      className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-slate-300' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Subtopic Lessons List */}
                {isExpanded && (
                  <div className="pt-1 pb-1 space-y-0.5 pl-3 pr-1">
                    {group.topics.map((topic) => {
                      const isSelected = selectedTopicId === topic.id;
                      const isDone = completedTopicIds.has(topic.id);
                      const isSaved = bookmarkedTopicIds.has(topic.id);
                      const difficulty = topic.difficulty || 'Beginner';

                      return (
                        <button
                          key={topic.id}
                          onClick={() => {
                            onSelectTopic(topic.id);
                            if (onClose) onClose();
                          }}
                          className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-left transition-all duration-150 relative group ${
                            isSelected
                              ? 'bg-[#0B1728] text-white border-l-2 border-emerald-400 shadow-sm'
                              : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <FileText className={`w-3.5 h-3.5 shrink-0 ${
                              isSelected ? 'text-emerald-400' : isDone ? 'text-emerald-500' : 'text-slate-500 group-hover:text-slate-400'
                            }`} />
                            <span className={`text-xs truncate ${
                              isSelected ? 'font-bold text-white' : 'font-normal text-slate-300 group-hover:text-white'
                            }`}>
                              {topic.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Difficulty Badge */}
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-slate-400">
                              {difficulty}
                            </span>

                            {isDone && (
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            )}
                            {isSaved && (
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Full-Height Sticky Sidebar Docked Flush on Left */}
      <aside className="hidden lg:block w-80 shrink-0 h-[calc(100vh-64px-52px)] sticky top-16 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer with Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden overflow-hidden flex">
          <div 
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in"
          />
          <div className="relative w-80 max-w-[85vw] h-full z-10 animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
