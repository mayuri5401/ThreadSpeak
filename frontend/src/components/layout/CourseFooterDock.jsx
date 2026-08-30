import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Star, CheckCircle2, Sparkles, 
  BookOpen, Maximize2, Minimize2, Check, X,
  Plus, Trash2, Highlighter, FileText, Send, MessageSquareCode,
  Users
} from 'lucide-react';

/**
 * CourseFooterDock
 * Full-Width End-to-End Bottom Action Dock:
 * - Stretches edge-to-edge (left-0 right-0 w-full) fixed at the bottom
 * - Left: Community / Discord link
 * - Center: Previous (<), Star (Gold), Complete (Emerald), Gemini AI (Gradient), Next (>)
 * - Right: Notebook (📓), Typography Aa, Fullscreen focus mode (⛶)
 */
export default function CourseFooterDock({
  currentTopic,
  topics = [],
  onSelectTopic,
  isCompleted,
  onToggleComplete,
  isBookmarked,
  onToggleBookmark,
  onOpenAskAi,
  onOpenNotebook,
  fontSize,
  onChangeFontSize,
  isFocusMode,
  onToggleFocusMode
}) {
  const [showFontMenu, setShowFontMenu] = useState(false);

  // Compute previous and next topics in syllabus order
  const currentIndex = topics.findIndex(t => t.id === currentTopic?.id);
  const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic = currentIndex >= 0 && currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 w-full bg-[#070B14]/96 backdrop-blur-xl border-t border-slate-800/90 px-4 sm:px-8 py-2.5 shadow-2xl">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* =================================================================== */}
        {/* LEFT: THREADSPEAK COMMUNITY                                         */}
        {/* =================================================================== */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 hover:border-cyan-400 transition shadow-sm group"
          >
            <Users className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Join Community</span>
          </a>
        </div>

        {/* =================================================================== */}
        {/* CENTER: TOPIC CONTROLS & GEMINI AI                                 */}
        {/* =================================================================== */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* Previous Topic Button (<) */}
          <button
            onClick={() => prevTopic && onSelectTopic(prevTopic.id)}
            disabled={!prevTopic}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 disabled:opacity-20 disabled:pointer-events-none text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition"
            title={prevTopic ? `Previous: ${prevTopic.title}` : 'No previous topic'}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Star / Bookmark Button */}
          <button
            onClick={() => currentTopic && onToggleBookmark && onToggleBookmark(currentTopic.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition shadow-sm ${
              isBookmarked
                ? 'bg-amber-950/80 border-amber-500/80 text-amber-300 shadow-amber-950/50 ring-1 ring-amber-500/50'
                : 'bg-slate-900/90 border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
            title={isBookmarked ? 'Starred for revision' : 'Star / Bookmark'}
          >
            <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
            <span className="hidden md:inline">{isBookmarked ? 'Starred' : 'Star'}</span>
          </button>

          {/* Mark as Complete Button */}
          <button
            onClick={() => currentTopic && onToggleComplete && onToggleComplete(currentTopic.id)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition shadow-sm ${
              isCompleted
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-emerald-950/50 ring-1 ring-emerald-500/60'
                : 'bg-slate-900/90 border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
            title={isCompleted ? 'Topic Completed' : 'Mark as Complete'}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">{isCompleted ? 'Completed' : 'Mark Complete'}</span>
          </button>

          {/* Google Gemini AI Button */}
          <button
            onClick={onOpenAskAi}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border border-cyan-400/50 shadow-lg shadow-cyan-950/80 hover:shadow-cyan-500/30 transition group"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Ask Gemini AI</span>
          </button>

          {/* Next Topic Button (>) */}
          <button
            onClick={() => nextTopic && onSelectTopic(nextTopic.id)}
            disabled={!nextTopic}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 disabled:opacity-20 disabled:pointer-events-none text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition"
            title={nextTopic ? `Next: ${nextTopic.title}` : 'No next topic'}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* =================================================================== */}
        {/* RIGHT: READING TOOLS (NOTEBOOK, TYPOGRAPHY, FOCUS MODE)             */}
        {/* =================================================================== */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 relative">
          
          {/* Notebook / Notes Icon */}
          <button
            onClick={onOpenNotebook}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition"
            title="ThreadSpeak Notebook & Key Takeaways"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Typography Scale (Aa) */}
          <div className="relative">
            <button
              onClick={() => setShowFontMenu(!showFontMenu)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold font-serif transition border ${
                showFontMenu
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-600'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
              }`}
              title="Typography & Text Scale"
            >
              Aa
            </button>

            {showFontMenu && (
              <div className="absolute bottom-full right-0 mb-3 p-2 rounded-2xl bg-[#090E1D] border border-cyan-500/30 shadow-2xl min-w-[150px] space-y-1 z-50 animate-in fade-in zoom-in-95 backdrop-blur-xl">
                <span className="text-[10px] text-cyan-400 font-mono block px-2 py-0.5">Reading Size</span>
                {[
                  { id: 'normal', label: 'Default (100%)', scale: '100%' },
                  { id: 'medium', label: 'Medium (110%)', scale: '110%' },
                  { id: 'large', label: 'Large (125%)', scale: '125%' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onChangeFontSize(opt.id);
                      setShowFontMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition ${
                      fontSize === opt.id
                        ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-700/50'
                        : 'text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {fontSize === opt.id && <Check className="w-3 h-3 text-cyan-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen / Focus Mode Toggle (⛶) */}
          <button
            onClick={onToggleFocusMode}
            className={`p-2 rounded-xl transition border ${
              isFocusMode
                ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-md shadow-cyan-950'
                : 'bg-slate-900/90 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
            }`}
            title={isFocusMode ? 'Exit Wide Focus Mode' : 'Focus Mode (Maximize Reading Width)'}
          >
            {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </footer>
  );
}
