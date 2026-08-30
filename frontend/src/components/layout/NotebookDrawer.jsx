import React, { useState, useEffect } from 'react';
import { 
  X, BookOpen, Sparkles, Plus, Trash2, Edit3, 
  Highlighter, FileText, Check, Star, CornerDownRight 
} from 'lucide-react';

/**
 * NotebookDrawer
 * Slide-Over Notebook Drawer matching AlgoMaster UX:
 * - Tabs: Highlights (N) | Notes (N)
 * - Add, view, edit, and delete notes per topic
 * - Save & load from localStorage
 */
export default function NotebookDrawer({
  isOpen,
  onClose,
  currentTopic,
  trackTitle = 'Core & Advanced Java'
}) {
  const [activeTab, setActiveTab] = useState('notes'); // 'highlights' | 'notes'
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState([]);
  const [highlights, setHighlights] = useState([]);

  const topicId = currentTopic?.id || 'general';

  // Load saved notes and highlights from localStorage
  useEffect(() => {
    try {
      const savedNotes = JSON.parse(localStorage.getItem('threadspeak_notebook_notes') || '{}');
      setNotes(savedNotes[topicId] || []);

      const savedHighlights = JSON.parse(localStorage.getItem('threadspeak_notebook_highlights') || '{}');
      setHighlights(savedHighlights[topicId] || []);
    } catch {
      setNotes([]);
      setHighlights([]);
    }
  }, [topicId]);

  // Save notes
  const handleAddNote = () => {
    if (!noteText.trim()) return;
    const newNote = {
      id: Date.now(),
      text: noteText.trim(),
      timestamp: new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      topicTitle: currentTopic?.title || 'General'
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    setNoteText('');

    try {
      const savedNotes = JSON.parse(localStorage.getItem('threadspeak_notebook_notes') || '{}');
      savedNotes[topicId] = updated;
      localStorage.setItem('threadspeak_notebook_notes', JSON.stringify(savedNotes));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteNote = (noteId) => {
    const updated = notes.filter(n => n.id !== noteId);
    setNotes(updated);
    try {
      const savedNotes = JSON.parse(localStorage.getItem('threadspeak_notebook_notes') || '{}');
      savedNotes[topicId] = updated;
      localStorage.setItem('threadspeak_notebook_notes', JSON.stringify(savedNotes));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveTakeawayAsHighlight = () => {
    if (!currentTopic?.mentalModel && !currentTopic?.eli10) return;
    const text = currentTopic?.mentalModel || currentTopic?.eli10;
    const newHl = {
      id: Date.now(),
      text,
      topicTitle: currentTopic.title,
      timestamp: new Date().toLocaleString([], { month: 'short', day: 'numeric' })
    };
    const updated = [newHl, ...highlights];
    setHighlights(updated);
    try {
      const savedHighlights = JSON.parse(localStorage.getItem('threadspeak_notebook_highlights') || '{}');
      savedHighlights[topicId] = updated;
      localStorage.setItem('threadspeak_notebook_highlights', JSON.stringify(savedHighlights));
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#090D17] border-l border-slate-800 shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>Notebook</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Your notes and highlights in <span className="text-slate-200 font-semibold">{trackTitle}</span>.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Topic Indicator */}
        {currentTopic && (
          <div className="px-5 py-2.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 truncate">
              Topic: <strong className="text-cyan-300">{currentTopic.title}</strong>
            </span>
          </div>
        )}

        {/* Subheader Tabs */}
        <div className="p-3 bg-slate-950 border-b border-slate-800 flex gap-2">
          <button
            onClick={() => setActiveTab('highlights')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'highlights'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span>Highlights ({highlights.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'notes'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Notes ({notes.length})</span>
          </button>
        </div>

        {/* Drawer Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* TAB 1: NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              
              {/* Note Creator Input */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 shadow-inner">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder={`Write your thoughts or key takeaway for ${currentTopic?.title || 'this topic'}...`}
                  rows={3}
                  className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none resize-none"
                />
                <div className="flex items-center justify-between pt-2 border-t border-slate-850">
                  <span className="text-[10px] text-slate-500 font-mono">Markdown supported</span>
                  <button
                    onClick={handleAddNote}
                    disabled={!noteText.trim()}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 disabled:pointer-events-none text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Note</span>
                  </button>
                </div>
              </div>

              {/* Notes List */}
              {notes.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400 font-medium">
                    No notes yet for this topic.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Write your personal study summary or revision points above!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {notes.map(n => (
                    <div key={n.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 group hover:border-slate-700 transition">
                      <div className="flex items-center justify-between text-[10.5px] text-slate-400 font-mono">
                        <span>{n.timestamp}</span>
                        <button
                          onClick={() => handleDeleteNote(n.id)}
                          className="text-slate-500 hover:text-rose-400 transition"
                          title="Delete Note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {n.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: HIGHLIGHTS */}
          {activeTab === 'highlights' && (
            <div className="space-y-4">
              
              {/* Quick Save Card */}
              {(currentTopic?.mentalModel || currentTopic?.eli10) && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-cyan-950/50 to-indigo-950/50 border border-cyan-500/30 space-y-2">
                  <span className="text-[11px] text-cyan-300 font-mono font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Quick Highlight from Lesson:</span>
                  </span>
                  <p className="text-xs text-slate-300 italic line-clamp-3">
                    "{currentTopic?.mentalModel || currentTopic?.eli10}"
                  </p>
                  <button
                    onClick={handleSaveTakeawayAsHighlight}
                    className="w-full py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-cyan-300 border border-cyan-800 transition flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Save Takeaway to Highlights</span>
                  </button>
                </div>
              )}

              {highlights.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <Highlighter className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400 font-medium">
                    No highlights yet.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Save key takeaways and mental models here for rapid revision!
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {highlights.map(h => (
                    <div key={h.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between text-[10.5px] text-slate-400 font-mono">
                        <span className="text-cyan-400 font-bold">{h.topicTitle}</span>
                        <span>{h.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-200 italic leading-relaxed border-l-2 border-cyan-400 pl-2.5">
                        "{h.text}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
