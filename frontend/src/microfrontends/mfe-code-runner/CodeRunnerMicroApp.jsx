import React from 'react';
import UniversalCodePlayground from '../../components/playground/UniversalCodePlayground';
import { ArrowLeft, Sparkles, Terminal, Flame } from 'lucide-react';

export default function CodeRunnerMicroApp({ initialCode, activeProblem, onBackToSheet, onBackToTopics }) {
  const isLld = activeProblem && [
    'oop-fundamentals', 'class-relationships', 'design-principles',
    'solid-principles', 'creational-patterns', 'structural-patterns', 'behavioral-patterns'
  ].includes(activeProblem.category);

  const isConcurrency = activeProblem && [
    'synchronization-primitives', 'locking-strategies', 'lock-free-programming',
    'concurrency-challenges', 'concurrency-patterns', 'classic-problems',
    'thread-safe-data-structures', 'multithreading-algorithms', 'concurrency-design-questions'
  ].includes(activeProblem.category);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-rose-400 animate-pulse"></span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">
                {activeProblem ? activeProblem.title : "Java 21 Microservice Execution Engine"}
              </h2>
              {activeProblem && (
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  activeProblem.difficulty === 'Easy'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : activeProblem.difficulty === 'Medium'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800'
                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  {activeProblem.difficulty}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {activeProblem 
                ? (isLld
                    ? `Low-Level Design Practice • ${activeProblem.categoryTitle} • #${activeProblem.number}`
                    : (isConcurrency
                        ? `Concurrency Practice • ${activeProblem.categoryTitle} • #${activeProblem.number}`
                        : (activeProblem.categoryTitle
                            ? `System Design Practice • ${activeProblem.categoryTitle} • #${activeProblem.number}`
                            : (activeProblem.category 
                                ? `Blind 75 • ${activeProblem.category} • #${activeProblem.leetcodeNumber || ''}`
                                : `DSA Roadmap • Step ${activeProblem.stepNumber || 1} • ${activeProblem.subTopic || 'DSA'}`))))
                : "Sandboxed container with Virtual Threads & Concurrent runtime analysis"
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onBackToTopics && (
            <button
              type="button"
              onClick={onBackToTopics}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-white text-xs font-bold transition border border-emerald-700/60 shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Learning Topic</span>
            </button>
          )}

          {onBackToSheet && (
            <button
              type="button"
              onClick={onBackToSheet}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition border border-slate-700 shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isLld ? "Back to LLD Practice" : isConcurrency ? "Back to Concurrency" : activeProblem?.categoryTitle ? "Back to System Design" : "Back to DSA Practice"}</span>
            </button>
          )}
        </div>
      </div>

      <UniversalCodePlayground
        title={activeProblem ? `${activeProblem.id}.java` : "Main.java"}
        initialCode={activeProblem ? (activeProblem.starterCode?.java || activeProblem.starterCode) : initialCode}
        problem={activeProblem}
        showScenarioPicker={!activeProblem}
        defaultHeight="min-h-[560px]"
      />
    </div>
  );
}
