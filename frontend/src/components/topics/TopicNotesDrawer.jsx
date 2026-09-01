import React, { useState, useEffect } from 'react';
import { FileText, Save, Download, Trash2, Check, X, Edit3, Sparkles } from 'lucide-react';

export default function TopicNotesDrawer({ 
  isOpen, 
  onClose, 
  topicId = '', 
  topicTitle = '' 
}) {
  const storageKey = `threadspeak_notes_${topicId}`;
  
  const [noteContent, setNoteContent] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (topicId) {
      const saved = localStorage.getItem(storageKey) || '';
      setNoteContent(saved);
    }
  }, [topicId, storageKey]);

  const handleSave = () => {
    localStorage.setItem(storageKey, noteContent);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleExport = () => {
    const element = document.createElement('a');
    const file = new Blob([`# Personal Notes: ${topicTitle}\n\n${noteContent}`], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${topicId}-study-notes.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your notes for this chapter?')) {
      setNoteContent('');
      localStorage.removeItem(storageKey);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-[9999] w-full max-w-md bg-[#0B1222]/98 backdrop-blur-2xl border-l border-slate-800 shadow-2xl p-5 flex flex-col justify-between animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Edit3 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Chapter Notes</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                Auto-saved
              </span>
            </h4>
            <p className="text-[11px] text-slate-400 truncate max-w-[220px]">{topicTitle}</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Notepad Editor */}
      <div className="flex-1 py-4 flex flex-col space-y-2">
        <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span>Personal Markdown Notepad</span>
          {noteContent.length > 0 && <span>{noteContent.length} chars</span>}
        </label>
        <textarea
          value={noteContent}
          onChange={(e) => {
            setNoteContent(e.target.value);
            localStorage.setItem(storageKey, e.target.value);
          }}
          placeholder="Jot down key formulas, edge cases to remember, or interview questions here... (Markdown supported)"
          className="flex-1 w-full p-4 rounded-2xl bg-[#070B14] border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
        />
      </div>

      {/* Footer Controls */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between shrink-0">
        <button
          onClick={handleClear}
          disabled={!noteContent}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition disabled:opacity-30"
          title="Clear notes"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            disabled={!noteContent}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .md</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-600/20 transition active:scale-95"
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'Saved!' : 'Save'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
