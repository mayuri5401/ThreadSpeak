import React, { useState } from 'react';
import { RotateCw, ChevronLeft, ChevronRight, Sparkles, Check, X, HelpCircle, Layers } from 'lucide-react';

export default function FlashcardDeck({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-2xl text-center text-slate-400">
        No flashcards available for this selection.
      </div>
    );
  }

  const current = questions[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev < questions.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : questions.length - 1));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Controls & Counter */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Card {currentIndex + 1} of {questions.length}</span>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
          {current.category}
        </span>
      </div>

      {/* Interactive 3D Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative min-h-[300px] w-full rounded-3xl p-8 cursor-pointer transition-all duration-500 glass-panel border border-cyan-500/30 hover:border-cyan-400 shadow-2xl flex flex-col justify-between bg-gradient-to-b from-[#0F172A] to-[#0B1222] select-none"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            {isFlipped ? 'Answer & Architectural Rationale' : 'Interview Question'}
          </span>
          <div className="flex items-center gap-1 text-xs text-cyan-400 font-mono">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Click to flip</span>
          </div>
        </div>

        {/* Content Front vs Back */}
        <div className="my-auto py-6">
          {!isFlipped ? (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white leading-snug">
                {current.question}
              </h3>
              {current.codeSnippet && (
                <pre className="font-mono text-xs text-cyan-300 p-3 rounded-xl bg-[#080D18] border border-slate-800 overflow-x-auto">
                  <code>{current.codeSnippet}</code>
                </pre>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
                <span className="text-xs font-bold font-mono block uppercase mb-1">Correct Answer:</span>
                <p className="text-sm font-semibold">
                  {current.options[current.correctOptionIndex]}
                </p>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {current.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-800/80">
          <span>Difficulty: <strong className="text-purple-300">{current.difficulty || 'Medium'}</strong></span>
          <span className="text-slate-400">Track: {current.trackId}</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Card
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition"
        >
          {isFlipped ? 'Show Question' : 'Reveal Answer'}
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition"
        >
          Next Card <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
