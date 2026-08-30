import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Zap, Layers, Cpu, Database, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function JvmMemoryVisualizer() {
  const [eden, setEden] = useState(25); // MB (Max 100)
  const [s0, setS0] = useState(10); // MB (Max 30)
  const [s1, setS1] = useState(0); // MB (Max 30)
  const [oldGen, setOldGen] = useState(35); // MB (Max 200)
  const [stackFrames, setStackFrames] = useState([
    { name: 'main(String[] args)', vars: 'args, configRef' },
    { name: 'orderService.placeOrder()', vars: 'orderId="ORD-901", userRef' }
  ]);
  const [logs, setLogs] = useState([
    'JVM Initialized with HotSpot VM (Java 21 LTS). Tiered compilation active.'
  ]);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [lastAction, setLastAction] = useState('Initialized');

  const edenCap = 100;
  const s0Cap = 30;
  const s1Cap = 30;
  const oldGenCap = 200;

  const handleAllocate = async (size = 25) => {
    setLastAction(`Allocating ${size}MB in Eden`);
    const res = await simulateJvmApi('allocate', {
      currentEden: eden,
      currentS0: s0,
      currentS1: s1,
      currentOldGen: oldGen,
      allocSize: size,
      stackFrames: stackFrames.length
    });

    if (res.state) {
      setEden(res.state.eden);
      setS0(res.state.s0);
      setS1(res.state.s1);
      setOldGen(res.state.oldGen);
    }
    if (res.logs && res.logs.length > 0) {
      setLogs(prev => [res.logs[0], ...prev.slice(0, 9)]);
    }
  };

  const handlePushStack = () => {
    const methods = [
      { name: 'paymentClient.processCard()', vars: 'cardToken="tok_98a", amount=149.99' },
      { name: 'inventoryService.reserveItem()', vars: 'sku="SKU-JAVA-21", qty=1' },
      { name: 'notificationSender.sendReceipt()', vars: 'email="dev@threadspeak.io"' },
      { name: 'hashCalculator.computeSha256()', vars: 'rawBytes=[...], rounds=1000' }
    ];
    const nextMethod = methods[stackFrames.length % methods.length];
    setStackFrames(prev => [nextMethod, ...prev]);
    setLogs(prev => [`[Stack Push] Invoked ${nextMethod.name}. Stack frame allocated with local variables.`, ...prev.slice(0, 9)]);
  };

  const handlePopStack = () => {
    if (stackFrames.length <= 1) {
      setLogs(prev => ['[Stack Info] Cannot pop base main() stack frame.', ...prev.slice(0, 9)]);
      return;
    }
    const popped = stackFrames[0];
    setStackFrames(prev => prev.slice(1));
    setLogs(prev => [`[Stack Pop] Method ${popped.name} returned. Stack frame deallocated instantly.`, ...prev.slice(0, 9)]);
  };

  const handleGc = async () => {
    setLastAction('Manual GC Triggered');
    const res = await simulateJvmApi('gc', {
      currentEden: eden,
      currentS0: s0,
      currentS1: s1,
      currentOldGen: oldGen
    });
    if (res.state) {
      setEden(res.state.eden);
      setS0(res.state.s0);
      setS1(res.state.s1);
      setOldGen(res.state.oldGen);
    }
    if (res.logs) {
      setLogs(prev => [...res.logs, ...prev.slice(0, 8)]);
    }
  };

  const handleReset = () => {
    setEden(20);
    setS0(10);
    setS1(0);
    setOldGen(30);
    setStackFrames([
      { name: 'main(String[] args)', vars: 'args, configRef' },
      { name: 'orderService.placeOrder()', vars: 'orderId="ORD-901", userRef' }
    ]);
    setLogs(['Memory state reset to clean baseline.']);
  };

  useEffect(() => {
    let timer;
    if (isAutoRunning) {
      timer = setInterval(() => {
        handleAllocate(20);
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isAutoRunning, eden, s0, s1, oldGen, stackFrames]);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-[#0B1222]/80 space-y-6">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
            <h3 className="text-xl font-bold text-white tracking-wide">Interactive JVM Memory & GC Visualizer</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/60">
              Live Sandbox
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Observe object allocation, Stack Frames, Eden fill-up, Minor GC survivor space flipping, and Old Gen promotion.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => handleAllocate(25)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-lg shadow-cyan-600/20 transition"
          >
            <Zap className="w-3.5 h-3.5" /> Allocate 25MB (Eden)
          </button>
          <button
            onClick={handlePushStack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/20 transition"
          >
            <Layers className="w-3.5 h-3.5" /> Push Stack Frame
          </button>
          <button
            onClick={handlePopStack}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition"
          >
            Pop Stack
          </button>
          <button
            onClick={handleGc}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs shadow-lg shadow-rose-600/20 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Trigger GC
          </button>
          <button
            onClick={() => setIsAutoRunning(!isAutoRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition ${
              isAutoRunning 
                ? 'bg-amber-500 text-slate-950 font-bold animate-pulse' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
            }`}
          >
            <Play className="w-3.5 h-3.5" /> {isAutoRunning ? 'Pause Cycle' : 'Auto Allocation'}
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
            title="Reset Memory"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Diagram Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: JVM Stack (Thread-Private) */}
        <div className="lg:col-span-4 bg-[#0F172A]/90 p-4 rounded-xl border border-indigo-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">JVM Stack (Thread-1)</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/50">
              {stackFrames.length} Frames Active
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Stores primitives & object reference pointers. Pushed on method call, popped on return.</p>

          <div className="space-y-2 max-h-[310px] overflow-y-auto pr-1">
            {stackFrames.map((frame, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border transition-all ${
                  idx === 0 
                    ? 'bg-indigo-950/70 border-indigo-500/50 shadow-md shadow-indigo-900/30' 
                    : 'bg-slate-900/70 border-slate-800 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-indigo-200">{frame.name}</span>
                  {idx === 0 && (
                    <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800">
                      Active Frame
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1 truncate">
                  <span className="text-slate-500">Locals:</span> {frame.vars}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: JVM Heap Memory (Shared across all threads) */}
        <div className="lg:col-span-8 bg-[#0F172A]/90 p-4 rounded-xl border border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">JVM Heap Memory (Shared Objects)</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span>Total Heap: <strong className="text-white">{(eden + s0 + s1 + oldGen)} MB</strong> / 360 MB</span>
            </div>
          </div>

          {/* Young Generation Partition */}
          <div className="p-3.5 rounded-xl bg-[#0B1120] border border-cyan-900/50 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Young Generation (Eden + S0 + S1)
              </span>
              <span className="text-slate-400 font-mono text-[11px]">Minor GC Target</span>
            </div>

            {/* Eden Space */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Eden Space (Newborn Objects)</span>
                <span className="text-emerald-400 font-bold">{eden} MB / {edenCap} MB ({Math.round((eden/edenCap)*100)}%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (eden / edenCap) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Survivor Spaces (S0 & S1) */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Survivor 0 (From)</span>
                  <span className={s0 > 0 ? "text-cyan-300 font-bold" : "text-slate-600"}>{s0} / {s0Cap} MB</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full transition-all duration-500" style={{ width: `${(s0/s0Cap)*100}%` }}></div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Survivor 1 (To)</span>
                  <span className={s1 > 0 ? "text-purple-300 font-bold" : "text-slate-600"}>{s1} / {s1Cap} MB</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full transition-all duration-500" style={{ width: `${(s1/s1Cap)*100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Old / Tenured Generation Partition */}
          <div className="p-3.5 rounded-xl bg-[#0B1120] border border-amber-900/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Old / Tenured Generation (Long-Lived Singletons & Caches)
              </span>
              <span className="text-slate-400 font-mono text-[11px]">Major / Full GC Target</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">Tenured Pool (Age &gt; 15 Promoted)</span>
              <span className="text-amber-400 font-bold">{oldGen} MB / {oldGenCap} MB ({Math.round((oldGen/oldGenCap)*100)}%)</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (oldGen / oldGenCap) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Metaspace (Native RAM) */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-slate-400" />
              <span><strong>Metaspace (Native OS Memory):</strong> 48 MB class metadata allocated.</span>
            </div>
            <span className="text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Expanding
            </span>
          </div>
        </div>
      </div>

      {/* Real-Time JVM Execution Log Feed */}
      <div className="bg-[#080D18] p-3.5 rounded-xl border border-slate-800 space-y-1.5 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800">
          <span>JVM Runtime Event Stream</span>
          <span className="text-cyan-400">Live Telemetry</span>
        </div>
        <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
          {logs.map((log, index) => (
            <div key={index} className={`flex items-start gap-2 ${index === 0 ? 'text-cyan-300 font-semibold' : 'text-slate-400'}`}>
              <span className="text-slate-600 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
