import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, HelpCircle, Eye, 
  RotateCw, Award, ArrowRight, ThumbsUp, Flame, Zap
} from 'lucide-react';

export default function ActiveRecallQuiz({ 
  topicTitle = '', 
  onMarkComplete,
  isCompleted = false
}) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [ratedCards, setRatedCards] = useState({}); // { [index]: 'learning' | 'good' | 'mastered' }

  // Generate 3 high-impact active recall cards based on the topic
  const cards = [
    {
      q: `What is the core architectural purpose of "${topicTitle}"?`,
      a: `It establishes strict abstraction, memory predictability, and deterministic execution flow to ensure enterprise scalability with zero memory leaks or concurrency race conditions.`,
      keyTakeaway: `Key Rule: Encapsulate internal complexity and expose high-cohesion, low-coupling interfaces.`
    },
    {
      q: `How does the runtime / JVM manage memory and execution for this concept?`,
      a: `Execution metadata and stack frames are loaded by the classloader into Metaspace/Stack, while dynamically instantiated objects live in the JVM Heap and are managed by the Generational Garbage Collector (ZGC / G1GC).`,
      keyTakeaway: `Key Rule: Avoid unnecessary reference retention in static or long-lived structures.`
    },
    {
      q: `What is the #1 trick question FAANG interviewers ask regarding "${topicTitle}"?`,
      a: `They will test your understanding of failure modes: time/space tradeoffs at 10M QPS, thread-safety pitfalls, and reference equality vs value semantics.`,
      keyTakeaway: `Key Rule: Always state the Big-O Time & Space complexity and concurrency safety before writing code.`
    }
  ];

  const handleRate = (rating) => {
    setRatedCards(prev => ({ ...prev, [activeCardIndex]: rating }));
    setIsRevealed(false);
    if (activeCardIndex < cards.length - 1) {
      setActiveCardIndex(prev => prev + 1);
    }
  };

  const completedCount = Object.keys(ratedCards).length;
  const isAllAnswered = completedCount === cards.length;

  return (
    <div className="mt-12 mb-8 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#090E1A] via-[#0B1222] to-[#070B14] border border-slate-800 shadow-2xl overflow-hidden relative">
      
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              <span>Active Recall &amp; Memory Test</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                Spaced Repetition
              </span>
            </h4>
            <p className="text-xs text-slate-400">Test your mental retention of this chapter before moving to the next topic.</p>
          </div>
        </div>

        {/* Card Progress */}
        <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
          <span>Card {activeCardIndex + 1} of {cards.length}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="py-6">
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner space-y-4">
          
          {/* Question */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 tracking-wider">
              Question {activeCardIndex + 1}
            </span>
            <p className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
              {cards[activeCardIndex].q}
            </p>
          </div>

          {/* Reveal Button / Answer Section */}
          {!isRevealed ? (
            <div className="pt-2">
              <button
                onClick={() => setIsRevealed(true)}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition active:scale-98 shadow-md"
              >
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>Click to Reveal Optimal Answer</span>
              </button>
            </div>
          ) : (
            <div className="pt-3 space-y-3 border-t border-slate-800 animate-in fade-in zoom-in-95 duration-150">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 tracking-wider">
                  Optimal Answer
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {cards[activeCardIndex].a}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-[11px] text-emerald-300 font-mono">
                💡 {cards[activeCardIndex].keyTakeaway}
              </div>

              {/* Confidence Rating Buttons */}
              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 block text-center">How well did you recall this?</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleRate('learning')}
                    className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-rose-300 text-xs font-bold transition"
                  >
                    Still Learning 🧐
                  </button>
                  <button
                    onClick={() => handleRate('good')}
                    className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 text-xs font-bold transition"
                  >
                    Good Recall 👍
                  </button>
                  <button
                    onClick={() => handleRate('mastered')}
                    className="py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-md shadow-emerald-500/20 transition"
                  >
                    Mastered 🔥
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom Footer / Next Action */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
        <div className="flex items-center gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveCardIndex(i);
                setIsRevealed(false);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                ratedCards[i]
                  ? 'bg-emerald-400'
                  : activeCardIndex === i
                  ? 'bg-cyan-400 ring-2 ring-cyan-500/50'
                  : 'bg-slate-800'
              }`}
            />
          ))}
          <span className="text-xs font-mono text-slate-400 ml-2">
            {completedCount}/{cards.length} Completed
          </span>
        </div>

        {isAllAnswered && !isCompleted && (
          <button
            onClick={onMarkComplete}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 animate-bounce"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark Topic Complete &amp; Claim 50 XP</span>
          </button>
        )}
      </div>

    </div>
  );
}
