import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, Circle, ChevronDown, ChevronRight, List, GitFork, 
  Filter, Play, ArrowRight, Sparkles, BookOpen, Layers, Zap,
  Check, Lock, Search, RotateCcw, Bookmark, Cpu, Network, 
  MessageSquareCode, ExternalLink, Hash, Folder, FolderOpen,
  Code2, CheckCircle, ArrowUpRight
} from 'lucide-react';
import roadmapData from '../../data/system_design_roadmap_data.json';

export default function CourseRoadmapViewer({ 
  topics = [], 
  completedTopicIds = new Set(), 
  bookmarkedTopicIds = new Set(),
  onSelectTopic,
  onToggleBookmark
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'saved' | 'completed' | 'incomplete'
  const [expandedMainSections, setExpandedMainSections] = useState({
    'lld': true,
    'hld': false,
    'hld-interview': false
  });
  const [expandedSubtopics, setExpandedSubtopics] = useState({});

  // Helper to check topic completion
  const isTopicDone = (id, title) => {
    if (!completedTopicIds) return false;
    if (completedTopicIds instanceof Set) {
      return completedTopicIds.has(id) || completedTopicIds.has(title);
    }
    if (Array.isArray(completedTopicIds)) {
      return completedTopicIds.includes(id) || completedTopicIds.includes(title);
    }
    if (typeof completedTopicIds === 'object') {
      return !!completedTopicIds[id] || !!completedTopicIds[title];
    }
    return false;
  };

  // Helper to check topic bookmark
  const isTopicSaved = (id) => {
    if (!bookmarkedTopicIds) return false;
    if (bookmarkedTopicIds instanceof Set) return bookmarkedTopicIds.has(id);
    if (Array.isArray(bookmarkedTopicIds)) return bookmarkedTopicIds.includes(id);
    if (typeof bookmarkedTopicIds === 'object') return !!bookmarkedTopicIds[id];
    return false;
  };

  // Toggle main subsections (01. low level design, 02.High level Design, 03. HLD-Interview)
  const toggleMainSection = (id) => {
    setExpandedMainSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle subtopic categories (e.g. 01_Welcome, 08_Design_Patterns, etc.)
  const toggleSubtopic = (subId) => {
    setExpandedSubtopics(prev => ({
      ...prev,
      [subId]: !prev[subId]
    }));
  };

  // Expand all subtopics in a section
  const expandAllSubtopics = (sectionId) => {
    const sec = roadmapData.find(s => s.id === sectionId);
    if (!sec) return;
    const next = { ...expandedSubtopics };
    sec.subtopics.forEach(sub => { next[sub.id] = true; });
    setExpandedSubtopics(next);
  };

  const collapseAllSubtopics = (sectionId) => {
    const sec = roadmapData.find(s => s.id === sectionId);
    if (!sec) return;
    const next = { ...expandedSubtopics };
    sec.subtopics.forEach(sub => { next[sub.id] = false; });
    setExpandedSubtopics(next);
  };

  // Process and compute stats for all 3 main subsections
  const processedData = useMemo(() => {
    return roadmapData.map(mainSec => {
      let mainCompleted = 0;
      let mainTotal = 0;
      let mainSavedCount = 0;

      const subtopicsProcessed = mainSec.subtopics.map(sub => {
        const subTopicsProcessed = sub.topics.map(top => {
          const done = isTopicDone(top.id, top.title);
          const saved = isTopicSaved(top.id);
          if (done) mainCompleted++;
          if (saved) mainSavedCount++;
          mainTotal++;

          // Match topic ID if existing topic found in database topics list
          const dbMatch = topics.find(t => 
            t.id === top.id || 
            (t.title && t.title.toLowerCase() === top.title.toLowerCase())
          );

          return {
            ...top,
            actualId: dbMatch ? dbMatch.id : top.id,
            isDone: done,
            isSaved: saved
          };
        });

        const subCompleted = subTopicsProcessed.filter(t => t.isDone).length;

        // Apply filters & search to subtopics
        const filteredTopics = subTopicsProcessed.filter(t => {
          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return t.title.toLowerCase().includes(q) || sub.name.toLowerCase().includes(q);
          }
          if (filterMode === 'saved') return t.isSaved;
          if (filterMode === 'completed') return t.isDone;
          if (filterMode === 'incomplete') return !t.isDone;
          return true;
        });

        return {
          ...sub,
          topics: subTopicsProcessed,
          filteredTopics,
          completedCount: subCompleted,
          totalCount: subTopicsProcessed.length
        };
      });

      return {
        ...mainSec,
        completedCount: mainCompleted,
        totalCount: mainTotal,
        savedCount: mainSavedCount,
        subtopics: subtopicsProcessed
      };
    });
  }, [topics, completedTopicIds, bookmarkedTopicIds, searchQuery, filterMode]);

  // Overall aggregate stats
  const totalTopicsCount = useMemo(() => {
    return processedData.reduce((acc, s) => acc + s.totalCount, 0);
  }, [processedData]);

  const totalCompletedCount = useMemo(() => {
    return processedData.reduce((acc, s) => acc + s.completedCount, 0);
  }, [processedData]);

  const totalSavedCount = useMemo(() => {
    return processedData.reduce((acc, s) => acc + s.savedCount, 0);
  }, [processedData]);

  const overallProgressPct = totalTopicsCount > 0 
    ? Math.round((totalCompletedCount / totalTopicsCount) * 100) 
    : 0;

  // Icon selector helper
  const renderMainIcon = (iconName) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Network':
        return <Network className="w-5 h-5 text-blue-400" />;
      case 'MessageSquareCode':
        return <MessageSquareCode className="w-5 h-5 text-purple-400" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner: Overall Progress & Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              System Design &amp; Architecture Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              3 Sub-Sections ({totalTopicsCount} Topics)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterMode(prev => prev === 'saved' ? 'all' : 'saved')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-mono font-bold transition shadow-lg ${
                filterMode === 'saved'
                  ? 'bg-amber-950 text-amber-300 border-amber-500 shadow-amber-950/40'
                  : 'bg-slate-900/90 text-slate-300 border-slate-700/80 hover:border-slate-600 hover:text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${filterMode === 'saved' ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span>Saved ({totalSavedCount})</span>
            </button>
          </div>
        </div>

        {/* Progress Bar & Percent Indicator */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Progress</span>
            <span className="text-cyan-400 font-bold">{overallProgressPct}%</span>
          </div>
          <div className="w-full bg-slate-900/90 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.max(overallProgressPct, 0)}%` }}
            />
          </div>
        </div>

        {/* Search & Quick Filter Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 445 topics &amp; patterns..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 font-sans"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'all', label: 'All Topics' },
              { id: 'completed', label: 'Completed' },
              { id: 'incomplete', label: 'Remaining' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterMode(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                  filterMode === tab.id
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-700 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Main Sub-Sections List */}
      <div className="space-y-4">
        {processedData.map((mainSec) => {
          const isMainExpanded = !!expandedMainSections[mainSec.id];

          return (
            <div
              key={mainSec.id}
              className="rounded-3xl border border-slate-800/90 bg-[#0B1222]/90 overflow-hidden shadow-xl transition-all duration-200"
            >
              {/* Primary Sub-Section Header Card (Exact visual styling as screenshot) */}
              <div
                onClick={() => toggleMainSection(mainSec.id)}
                className={`p-5 sm:p-6 flex items-center justify-between cursor-pointer transition select-none ${
                  isMainExpanded 
                    ? 'bg-gradient-to-r from-[#0F172A] to-[#0B1222] border-b border-slate-800' 
                    : 'hover:bg-slate-900/70'
                }`}
              >
                {/* Left Icon + Title + Stats */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#090E1A] border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-950/50">
                    {renderMainIcon(mainSec.icon)}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                      {mainSec.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-slate-300">
                        {mainSec.completedCount}/{mainSec.totalCount} Done
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-cyan-400 font-bold">
                        {mainSec.subtopicsCount} Subtopics
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Badge + Chevron */}
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-xl bg-slate-900 border border-slate-700/80 text-white font-mono text-xs sm:text-sm font-extrabold shadow-inner">
                    {mainSec.totalTopicsCount}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isMainExpanded ? 'rotate-180 text-cyan-400' : ''}`} />
                  </div>
                </div>
              </div>

              {/* Expanded Subtopics & Topics Tree View */}
              {isMainExpanded && (
                <div className="p-4 sm:p-6 bg-[#070C18] space-y-4">
                  {/* Subtopics Toolbar */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-xs font-mono text-slate-400">
                    <span>{mainSec.subtopics.length} Categorized Learning Modules</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => expandAllSubtopics(mainSec.id)}
                        className="hover:text-cyan-400 transition"
                      >
                        Expand All
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => collapseAllSubtopics(mainSec.id)}
                        className="hover:text-cyan-400 transition"
                      >
                        Collapse All
                      </button>
                    </div>
                  </div>

                  {/* Subtopics Accordion List */}
                  <div className="space-y-3">
                    {mainSec.subtopics.map((sub) => {
                      const isSubExpanded = !!expandedSubtopics[sub.id];
                      const hasFilteredTopics = sub.filteredTopics && sub.filteredTopics.length > 0;

                      return (
                        <div
                          key={sub.id}
                          className="rounded-2xl border border-slate-800/80 bg-[#0A101E] overflow-hidden transition shadow-md"
                        >
                          {/* Subtopic Header */}
                          <div
                            onClick={() => toggleSubtopic(sub.id)}
                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-900/60 transition"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono font-bold text-cyan-400 flex items-center justify-center shrink-0">
                                {sub.number}
                              </span>
                              <div>
                                <h4 className="text-xs sm:text-sm font-bold text-slate-200 hover:text-white transition">
                                  {sub.name}
                                </h4>
                              </div>
                            </div>

                            <div className="flex items-center gap-2.5">
                              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                                {sub.completedCount}/{sub.totalCount}
                              </span>
                              <ChevronRight className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${isSubExpanded ? 'rotate-90 text-cyan-400' : ''}`} />
                            </div>
                          </div>

                          {/* Individual Topics List */}
                          {isSubExpanded && (
                            <div className="border-t border-slate-800/70 bg-[#060914] p-3 sm:p-4 space-y-1.5">
                              {hasFilteredTopics ? (
                                sub.filteredTopics.map((top) => (
                                  <div
                                    key={top.id}
                                    onClick={() => onSelectTopic && onSelectTopic(top.actualId)}
                                    className="p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 hover:border-cyan-500/40 transition cursor-pointer flex items-center justify-between gap-3 group"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      {top.isDone ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                      ) : (
                                        <Circle className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition shrink-0" />
                                      )}
                                      <span className="text-xs font-medium text-slate-300 group-hover:text-white truncate">
                                        {top.title}
                                      </span>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                        top.difficulty === 'Easy'
                                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                                          : top.difficulty === 'Medium'
                                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800'
                                          : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                                      }`}>
                                        {top.difficulty}
                                      </span>

                                      <span className="text-[11px] font-mono text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                                        Open <ArrowUpRight className="w-3 h-3" />
                                      </span>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center py-3 text-xs text-slate-500">
                                  No topics match the current filter in this subtopic.
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
