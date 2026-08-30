import React, { useState } from 'react';
import { 
  Play, RotateCcw, FileCode, Binary, Cpu, Terminal, 
  CheckCircle2, Sparkles, ArrowRight, Zap, ShieldCheck, Laptop
} from 'lucide-react';

export default function JavaExecutionPipelineVisualizer() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = idle, 1 = source, 2 = compile, 3 = bytecode, 4 = jvm, 5 = output
  const [isPlaying, setIsPlaying] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);

  const runFullPipeline = () => {
    setIsPlaying(true);
    setCurrentStep(1);
    setTerminalLogs(["[Step 1/5] Writing & saving Java Program: MainApp.java in Notepad"]);

    setTimeout(() => {
      setCurrentStep(2);
      setTerminalLogs(prev => [...prev, "[Step 2/5] Java Compiler (javac MainApp.java) checking syntax & compiling"]);
    }, 1200);

    setTimeout(() => {
      setCurrentStep(3);
      setTerminalLogs(prev => [...prev, "[Step 3/5] Bytecode generated: MainApp.class (Platform-independent byte code)"]);
    }, 2400);

    setTimeout(() => {
      setCurrentStep(4);
      setTerminalLogs(prev => [...prev, "[Step 4/5] JVM (Java Virtual Machine) converting bytecode into machine code"]);
    }, 3600);

    setTimeout(() => {
      setCurrentStep(5);
      setTerminalLogs(prev => [...prev, "[Step 5/5] Output displayed in Command Prompt: Hello Deepak", ">>> Process finished with exit code 0"]);
      setIsPlaying(false);
    }, 4800);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setTerminalLogs([]);
  };

  const steps = [
    { num: 1, label: 'Step 1: Java Program', sub: 'MainApp.java (Notepad)', icon: Laptop, color: 'text-amber-400 border-amber-500' },
    { num: 2, label: 'Step 2: Compilation', sub: 'Java Compiler (javac)', icon: Zap, color: 'text-cyan-400 border-cyan-500' },
    { num: 3, label: 'Step 3: Bytecode', sub: '.class file (byte code)', icon: Binary, color: 'text-purple-400 border-purple-500' },
    { num: 4, label: 'Step 4: Execution', sub: 'JVM (Virtual Machine)', icon: Cpu, color: 'text-indigo-400 border-indigo-500' },
    { num: 5, label: 'Step 5: Output', sub: 'Hello Deepak (CMD)', icon: Terminal, color: 'text-emerald-400 border-emerald-500' },
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0F172A] via-[#0B1222] to-[#070B14] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-md">
              <Zap className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Deep Explanation of How Java Works: 5-Step Pipeline
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Interactive Simulator
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Trace how source code transforms from Notepad into bytecode (.class) and runs on the JVM.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={runFullPipeline}
            disabled={isPlaying}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:opacity-90 transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isPlaying ? 'Running Pipeline...' : 'Run 5-Step Pipeline'}</span>
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition"
            title="Reset Pipeline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5-Step Horizontal Flow Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
        {steps.map((st) => {
          const Icon = st.icon;
          const isActive = currentStep === st.num;
          const isPassed = currentStep > st.num;

          return (
            <div
              key={st.num}
              onClick={() => setCurrentStep(st.num)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-center relative ${
                isActive
                  ? `${st.color} bg-slate-900 shadow-xl shadow-cyan-500/20 scale-105 ring-2 ring-cyan-400/40`
                  : isPassed
                  ? 'border-emerald-500/60 bg-emerald-950/20 text-emerald-300'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 mx-auto flex items-center justify-center mb-2">
                <Icon className={`w-4 h-4 ${isActive ? 'animate-bounce text-cyan-400' : ''}`} />
              </div>
              <div className="text-xs font-bold text-white truncate">{st.label}</div>
              <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">{st.sub}</div>

              {isActive && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.2 rounded-full text-[9px] font-mono font-bold bg-cyan-500 text-slate-950 animate-pulse">
                  ACTIVE
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Stage Display Screen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Stage Content Card */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
            <span className="font-bold text-white">Stage Inspector</span>
            <span>Step {currentStep || 1} of 5</span>
          </div>

          {currentStep <= 1 && (
            <div className="space-y-2 text-slate-300">
              <div className="text-amber-400 font-bold">// Step 1: Writing Java Program (MainApp.java in Notepad)</div>
              <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 overflow-x-auto text-[11px]">
{`public class MainApp {
    public static void main(String[] args) {
        System.out.println("Hello Deepak");
    }
}`}
              </pre>
              <p className="text-[11px] text-slate-400">
                Human-readable source code stored in <code className="text-amber-300">MainApp.java</code>.
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-2 text-slate-300">
              <div className="text-cyan-400 font-bold">// Step 2: Java Compiler (javac MainApp.java)</div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                <div className="text-emerald-400">✓ Lexical and Syntax Analysis: Passed</div>
                <div className="text-emerald-400">✓ Semantic Type Checking: Passed</div>
                <div className="text-cyan-300">⚙️ Compiling into intermediate bytecode...</div>
              </div>
              <p className="text-[11px] text-slate-400">
                Compiler checks for errors and transforms source code into bytecode.
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-2 text-slate-300">
              <div className="text-purple-400 font-bold">// Step 3: Bytecode (.class file - MainApp.class)</div>
              <pre className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-purple-300 overflow-x-auto text-[11px]">
{`CA FE BA BE 00 00 00 3D 00 1D 0A 00 02 00 03 07
00 04 0C 00 05 00 06 01 00 10 6A 61 76 61 2F 6C
01 00 06 3C 69 6E 69 74 3E 01 00 03 28 29 56 09
00 08 00 09 07 00 0A 0C 00 0B 00 0C 01 00 10 6A`}
              </pre>
              <p className="text-[11px] text-slate-400">
                Platform-independent bytecode executable on any OS with a JVM (WORA).
              </p>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-2 text-slate-300">
              <div className="text-indigo-400 font-bold">// Step 4: JVM Execution Engine (java MainApp)</div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-[11px]">
                <div className="text-indigo-300">1. ClassLoader: Loading MainApp.class into memory</div>
                <div className="text-indigo-300">2. Bytecode Verifier: Memory safety verified ✓</div>
                <div className="text-emerald-400">3. Execution Engine: Converting bytecode to machine code</div>
              </div>
              <p className="text-[11px] text-slate-400">
                JVM executes machine instructions line by line, starting from <code className="text-indigo-300">main()</code>.
              </p>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-2 text-slate-300">
              <div className="text-emerald-400 font-bold">// Step 5: Screen Output (Command Prompt)</div>
              <pre className="p-3 rounded-xl bg-black border border-emerald-500/40 text-emerald-400 font-bold text-sm">
{`Hello Deepak`}
              </pre>
              <p className="text-[11px] text-slate-400">
                Native machine instructions executed directly on the CPU hardware.
              </p>
            </div>
          )}
        </div>

        {/* Live Terminal Output Console */}
        <div className="p-5 rounded-2xl bg-black border border-slate-800 space-y-3 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-slate-400">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">Execution Console Logs</span>
            </div>
            <div className="space-y-1.5 pt-3">
              {terminalLogs.length > 0 ? (
                terminalLogs.map((log, i) => (
                  <div key={i} className="text-slate-300 leading-relaxed">
                    <span className="text-cyan-400 font-bold">&gt;</span> {log}
                  </div>
                ))
              ) : (
                <div className="text-slate-600 text-center py-8">
                  Click "Run 5-Step Pipeline" above to see real-time execution logs.
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <span>Runtime: Java 21 OpenJDK HotSpot VM</span>
            <span>Exit Code: 0</span>
          </div>
        </div>
      </div>

    </div>
  );
}
