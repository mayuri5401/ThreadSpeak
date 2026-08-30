import React, { useState } from 'react';
import { Play, RotateCcw, ShieldCheck, ShieldAlert, Cpu, Lock, Unlock, Zap, Activity } from 'lucide-react';
import { simulateThreadsApi } from '../../microfrontends/mfe-code-runner/services/codeRunnerApiClient';

export default function ThreadConcurrencyVisualizer() {
  const [lockType, setLockType] = useState('synchronized'); // 'unsafe', 'synchronized', 'atomic', 'reentrant'
  const [threadCount, setThreadCount] = useState(3);
  const [isRunning, setIsRunning] = useState(false);
  const [targetCount, setTargetCount] = useState(3000);
  const [actualCounter, setActualCounter] = useState(3000);
  const [conflicts, setConflicts] = useState(0);
  const [logs, setLogs] = useState([
    'Concurrency Sandbox ready. Select a synchronization strategy and click "Run Simulation".'
  ]);
  const [threadStates, setThreadStates] = useState([
    { id: 1, name: 'Thread-1 (Cyan)', state: 'RUNNABLE', color: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40', count: 1000 },
    { id: 2, name: 'Thread-2 (Emerald)', state: 'BLOCKED', color: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40', count: 1000 },
    { id: 3, name: 'Thread-3 (Violet)', state: 'WAITING', color: 'text-purple-400 border-purple-500/50 bg-purple-950/40', count: 1000 }
  ]);

  const runSimulation = async () => {
    setIsRunning(true);
    setActualCounter(0);
    setConflicts(0);

    const res = await simulateThreadsApi(lockType, threadCount);

    // Simulate animated counting up
    const expected = res.state.expectedValue;
    const finalActual = res.state.actualValue;
    const isRace = res.state.isRaceConditionPresent;

    setTargetCount(expected);

    let current = 0;
    const step = Math.ceil(finalActual / 20);
    const interval = setInterval(() => {
      current += step;
      if (current >= finalActual) {
        current = finalActual;
        clearInterval(interval);
        setIsRunning(false);
      }
      setActualCounter(current);
    }, 40);

    setConflicts(res.metrics.conflicts || 0);
    if (res.logs) {
      setLogs(res.logs);
    }

    if (res.stepFrames) {
      const colors = [
        'text-cyan-400 border-cyan-500/50 bg-cyan-950/40',
        'text-emerald-400 border-emerald-500/50 bg-emerald-950/40',
        'text-purple-400 border-purple-500/50 bg-purple-950/40',
        'text-amber-400 border-amber-500/50 bg-amber-950/40'
      ];
      setThreadStates(res.stepFrames.map((f, idx) => ({
        id: idx + 1,
        name: f.threadId,
        state: f.state,
        color: colors[idx % colors.length],
        count: f.incrementsDone
      })));
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-indigo-500/20 bg-[#0B1222]/80 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-400 animate-pulse"></div>
            <h3 className="text-xl font-bold text-white tracking-wide">Multithreading & Concurrency Race Sandbox</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/60">
              Interactive Concurrency
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Compare non-synchronized race conditions vs Java Monitor Locks, AtomicInteger CAS, and ReentrantLock.
          </p>
        </div>

        {/* Action Controls */}
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 transition disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-current" /> {isRunning ? 'Executing Threads...' : 'Run Simulation'}
        </button>
      </div>

      {/* Synchronization Mode Switcher */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { id: 'unsafe', label: 'Unsafe (No Sync)', desc: 'count++ (Race condition)', icon: ShieldAlert, color: 'hover:border-rose-500 text-rose-400' },
          { id: 'synchronized', label: 'synchronized', desc: 'Java Monitor Lock', icon: Lock, color: 'hover:border-cyan-500 text-cyan-400' },
          { id: 'atomic', label: 'AtomicInteger', desc: 'Lock-free Hardware CAS', icon: Zap, color: 'hover:border-emerald-500 text-emerald-400' },
          { id: 'reentrant', label: 'ReentrantLock', desc: 'Explicit Lock & Fairness', icon: ShieldCheck, color: 'hover:border-purple-500 text-purple-400' },
        ].map(item => {
          const Icon = item.icon;
          const isSelected = lockType === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setLockType(item.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500/80 shadow-md shadow-cyan-500/15 ring-1 ring-cyan-500/50'
                  : 'bg-[#0F172A]/70 border-slate-800 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{item.label}</span>
              </div>
              <p className="text-[11px] text-slate-400">{item.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Real-Time Shared Memory Counter Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
          <span className="text-xs text-slate-400 font-mono">Expected Counter Value</span>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {targetCount.toLocaleString()} <span className="text-xs text-slate-500 font-normal">(1,000 * {threadCount} threads)</span>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex flex-col justify-center transition-colors ${
          conflicts > 0 
            ? 'bg-rose-950/40 border-rose-500/40' 
            : 'bg-[#0F172A] border-emerald-500/30'
        }`}>
          <span className="text-xs text-slate-400 font-mono">Actual Shared Memory Value</span>
          <div className={`text-2xl font-bold font-mono mt-1 ${conflicts > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {actualCounter.toLocaleString()}
          </div>
          {conflicts > 0 && (
            <span className="text-[11px] text-rose-300 font-semibold mt-0.5">
              Lost Updates: -{conflicts.toLocaleString()} (Race condition!)
            </span>
          )}
        </div>

        <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
          <span className="text-xs text-slate-400 font-mono">Concurrency Safety Verdict</span>
          <div className="flex items-center gap-2 mt-1">
            {conflicts === 0 ? (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400">Thread-Safe (Atomic)</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <span className="text-sm font-bold text-rose-400">Data Corruption Detected</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Concurrent Worker Threads Live State Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Active Worker Threads &amp; Lock State Machine</span>
          <span className="text-indigo-400">{threadStates.length} Active Threads</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {threadStates.map((th) => (
            <div key={th.id} className={`p-3.5 rounded-xl border ${th.color} space-y-2`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono">{th.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                  {th.state}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span>Increments:</span>
                <span className="font-bold">{th.count}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (th.count / 1000) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Telemetry Output Log */}
      <div className="bg-[#080D18] p-3.5 rounded-xl border border-slate-800 space-y-1.5 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800">
          <span>Thread Execution Diagnostics</span>
          <span className="text-indigo-400">JVM Thread Dumps</span>
        </div>
        <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
          {logs.map((log, index) => (
            <div key={index} className={`flex items-start gap-2 ${index === 0 ? 'text-indigo-300 font-semibold' : 'text-slate-400'}`}>
              <span className="text-slate-600 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
