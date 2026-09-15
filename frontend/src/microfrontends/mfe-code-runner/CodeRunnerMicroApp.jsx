import React from 'react';
import UniversalCodePlayground from '../../components/playground/UniversalCodePlayground';
import { ArrowLeft, Sparkles, Terminal, Flame } from 'lucide-react';

export default function CodeRunnerMicroApp({ initialCode, activeProblem, onBackToSheet }) {
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
                ? `Striver's A2Z Sheet • Step ${activeProblem.stepNumber} • ${activeProblem.subTopic || 'DSA'}`
                : "Sandboxed container with Virtual Threads & Concurrent runtime analysis"
              }
            </p>
          </div>
        </div>

        {onBackToSheet && (
          <button
            type="button"
            onClick={onBackToSheet}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition border border-slate-700 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Striver's Sheet</span>
          </button>
        )}
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
