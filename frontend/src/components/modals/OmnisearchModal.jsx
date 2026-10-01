import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, X, ArrowRight, Code, BookOpen, Layers, Zap, 
  Boxes, Cpu, Video, Sparkles, Flame, Check
} from 'lucide-react';
import { fetchTopics } from '../../microfrontends/mfe-content/services/contentApiClient';

export default function OmnisearchModal({ 
  isOpen, 
  onClose, 
  onSelectTrack, 
  onSelectView, 
  onSelectTopic 
}) {
  const [query, setQuery] = useState('');
  const [allTopics, setAllTopics] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      async function loadAll() {
        if (allTopics.length === 0) {
          const list = await fetchTopics(null);
          setAllTopics(list || []);
        }
      }
      loadAll();
    } else {
      setQuery('');
      setSelectedIdx(0);
    }
  }, [isOpen]);

  // Static curated searchable index of key practice tracks & problems
  const curatedPracticeItems = useMemo(() => [
    { title: 'Two Sum', category: 'DSA - Blind 75', type: 'dsa', view: 'dsa-practice', icon: Code, color: 'text-cyan-400' },
    { title: 'Best Time to Buy and Sell Stock', category: 'DSA - Blind 75', type: 'dsa', view: 'dsa-practice', icon: Code, color: 'text-cyan-400' },
    { title: 'Contains Duplicate', category: 'DSA - Blind 75', type: 'dsa', view: 'dsa-practice', icon: Code, color: 'text-cyan-400' },
    { title: 'Product of Array Except Self', category: 'DSA - Blind 75', type: 'dsa', view: 'dsa-practice', icon: Code, color: 'text-cyan-400' },
    { title: 'Kadane\'s Algorithm (Max Subarray Sum)', category: 'DSA - Blind 75', type: 'dsa', view: 'dsa-practice', icon: Code, color: 'text-cyan-400' },
    { title: 'Calculate System Availability', category: 'System Design Coding', type: 'system-design', view: 'system-design-practice', icon: Layers, color: 'text-indigo-400' },
    { title: 'Solve Little\'s Law (Throughput & Latency)', category: 'System Design Coding', type: 'system-design', view: 'system-design-practice', icon: Layers, color: 'text-indigo-400' },
    { title: 'Design a Thread-Safe Bank Account', category: 'Concurrency Practice', type: 'concurrency', view: 'concurrency-practice', icon: Zap, color: 'text-amber-400' },
    { title: 'Design a Concurrency Limiter With Semaphore', category: 'Concurrency Practice', type: 'concurrency', view: 'concurrency-practice', icon: Zap, color: 'text-amber-400' },
    { title: 'Design Car Class & Inheritance', category: 'Low-Level Design (LLD)', type: 'lld', view: 'lld-practice', icon: Boxes, color: 'text-purple-400' },
    { title: 'Design Parking Lot System', category: 'Low-Level Design (LLD)', type: 'lld', view: 'lld-practice', icon: Boxes, color: 'text-purple-400' },
    { title: 'Design Tic-Tac-Toe Game Engine', category: 'Low-Level Design (LLD)', type: 'lld', view: 'lld-practice', icon: Boxes, color: 'text-purple-400' },
  ], []);

  // Filter combined catalog
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return curatedPracticeItems.slice(0, 8);
    }
    const q = query.toLowerCase().trim();

    const topicMatches = allTopics.filter(t => 
      t.title?.toLowerCase().includes(q) || 
      t.category?.toLowerCase().includes(q) ||
      t.summary?.toLowerCase().includes(q)
    ).slice(0, 10).map(t => ({
      title: t.title,
      category: t.category || 'Curriculum Chapter',
      type: 'topic',
      topicId: t.id,
      trackId: t.trackId || 'core-java',
      icon: BookOpen,
      color: 'text-emerald-400'
    }));

    const practiceMatches = curatedPracticeItems.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );

    return [...practiceMatches, ...topicMatches].slice(0, 12);
  }, [query, allTopics, curatedPracticeItems]);

  const handleSelect = (item) => {
    onClose();
    if (item.type === 'topic') {
      if (onSelectTrack) onSelectTrack(item.trackId);
      if (onSelectTopic) onSelectTopic(item.topicId);
      if (onSelectView) onSelectView('topics');
    } else if (item.view) {
      if (onSelectView) onSelectView(item.view);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(prev => (prev + 1) % Math.max(1, filteredResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(prev => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIdx]) {
        handleSelect(filteredResults[selectedIdx]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090E1D] border border-slate-700/80 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center gap-3 bg-[#060A14]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIdx(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Search 540+ chapters, Blind 75, System Design, Concurrency, LLD..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-mono"
          >
            ESC
          </button>
        </div>

        {/* Search Results List */}
        <div className="p-3 max-h-[55vh] overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">
            {query ? `Search Results (${filteredResults.length})` : 'Popular Quick Jumps'}
          </div>

          {filteredResults.length === 0 ? (
            <div className="p-8 text-center space-y-2 text-slate-400">
              <Sparkles className="w-8 h-8 mx-auto text-slate-600 animate-pulse" />
              <p className="text-xs">No matching topics or practice problems found.</p>
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const Icon = item.icon;
              const isFocused = selectedIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  className={`w-full p-3 rounded-2xl text-left flex items-center justify-between gap-3 transition cursor-pointer ${
                    isFocused 
                      ? 'bg-slate-800/90 text-white border border-cyan-500/40 shadow-md' 
                      : 'text-slate-300 hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${item.color} shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold text-white truncate">
                        {item.title}
                      </div>
                      <div className="text-[10.5px] text-slate-400 truncate">
                        {item.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                      Jump
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="p-3 bg-[#050811] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 px-4">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300">↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300">↵</kbd> Select</span>
          </div>
          <span>ThreadSpeak Directory</span>
        </div>

      </div>
    </div>
  );
}
