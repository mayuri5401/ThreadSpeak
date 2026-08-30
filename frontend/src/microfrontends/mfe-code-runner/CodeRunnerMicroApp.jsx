import React from 'react';
import UniversalCodePlayground from '../../components/playground/UniversalCodePlayground';

export default function CodeRunnerMicroApp({ initialCode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
          <div>
            <h2 className="text-lg font-bold text-white">Java 21 Microservice Execution Engine</h2>
            <p className="text-xs text-slate-400">Sandboxed container with Virtual Threads & Concurrent runtime analysis</p>
          </div>
        </div>
      </div>

      <UniversalCodePlayground
        title="Java 21 Virtual Engine"
        initialCode={initialCode}
        showScenarioPicker={true}
        defaultHeight="min-h-[480px]"
      />
    </div>
  );
}
