import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaExceptionHandlingVisualizer
 * High-Yield Interactive Theater for Exception Handling & Error Architecture in Java:
 * 1. 3 Categories of Errors Explorer (Compile-Time, Runtime, Logical Errors)
 * 2. JVM Memory Depletion & Fatal Error Simulator (StackOverflow vs OutOfMemory)
 * 3. Throwable Class Hierarchy & try-catch-finally Execution Engine
 */
export default function JavaExceptionHandlingVisualizer() {
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' | 'memerror' | 'hierarchy' | 'simulator'
  const [selectedCategory, setSelectedCategory] = useState('compile'); // 'compile' | 'runtime' | 'logical'
  const [errorSimType, setErrorSimType] = useState('stack'); // 'stack' | 'heap'
  const [errorSimStep, setErrorSimStep] = useState(0); // 0: Idle, 1: Allocating, 2: Threshold reached, 3: Fatal Error Thrown
  const [tryCatchSimStep, setTryCatchSimStep] = useState(0);

  const categoriesData = {
    compile: {
      title: '1. Compile-Time Errors (Detected by javac)',
      badge: 'Build-Time Blocker',
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
      description: 'Errors detected by the Java compiler before execution. The program CANNOT run until these errors are resolved.',
      types: [
        { name: 'Lexical Errors', detail: 'Mistakes in keywords or identifier spellings (e.g., "statc" instead of "static", "viod" instead of "void").' },
        { name: 'Syntax Errors', detail: 'Grammar rule violations (missing semicolons ";", unmatched braces "{}", bad method signatures).' },
        { name: 'Semantic Errors', detail: 'Syntactically valid structure, but meaningless (e.g., int x = "hello";).' },
        { name: 'Type Checking Errors', detail: 'Type mismatch (e.g., assigning a String literal to an int primitive).' }
      ],
      code: `public class CompileErrorDemo {
    public static void main(String[] args) {
        // ❌ Lexical/Syntax Error: Missing semicolon
        // int x = 10

        // ❌ Semantic / Type Checking Error:
        // int y = "hello"; 
    }
}`
    },
    runtime: {
      title: '2. Runtime Errors (Occur During Execution)',
      badge: 'Execution-Time Failures',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: 'Problems occurring after successful compilation during execution. Subdivided into fatal Errors vs recoverable Exceptions.',
      types: [
        { name: 'JVM Errors (Fatal & Unchecked)', detail: 'System-level failures thrown by JVM (StackOverflowError, OutOfMemoryError, VirtualMachineError). Not recoverable.' },
        { name: 'Recoverable Exceptions', detail: 'Application-level anomalies handled with try-catch (ArithmeticException, NullPointerException, ArrayIndexOutOfBoundsException).' }
      ],
      code: `public class RuntimeErrorDemo {
    public static void main(String[] args) {
        // 1. Exception (Recoverable)
        try {
            int a = 10 / 0; // ArithmeticException
        } catch (ArithmeticException e) {
            System.out.println("Handled Exception: " + e.getMessage());
        }

        // 2. Fatal Error (Unchecked System Breakdown)
        // main(null); // StackOverflowError!
    }
}`
    },
    logical: {
      title: '3. Logical Errors (Hardest to Detect)',
      badge: 'Zero Crash, Wrong Output',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      description: 'Program compiles and runs to completion with Exit Code 0, but produces incorrect results due to flawed algorithms or formulas. Neither compiler nor JVM can detect this.',
      types: [
        { name: 'Formula Mistakes', detail: 'Calculating Area of Square using (4 * side) instead of (side * side).' },
        { name: 'Off-By-One Loops', detail: 'Using "<" instead of "<=" or incorrect loop incrementing step.' },
        { name: 'Operator Precedence', detail: 'Missing parentheses: a + b / 2 instead of (a + b) / 2.' }
      ],
      code: `public class LogicalErrorExample {
    public static void main(String[] args) {
        int side = 5;
        // ❌ Wrong formula! Calculates perimeter instead of area
        int area = 4 * side; 

        System.out.println("Area = " + area); // Prints 20 instead of expected 25!
    }
}`
    }
  };

  const currentCat = categoriesData[selectedCategory];

  const runErrorSim = () => {
    setErrorSimStep(1);
    setTimeout(() => setErrorSimStep(2), 800);
    setTimeout(() => setErrorSimStep(3), 1600);
  };

  const resetErrorSim = () => {
    setErrorSimStep(0);
  };

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Architecture &amp; System Failure Breakdown</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Java Errors &amp; Exception Architecture
          </h3>
        </div>

        {/* Master Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'categories'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bug className="w-3.5 h-3.5" />
            <span>3 Error Categories</span>
          </button>

          <button
            onClick={() => setActiveTab('memerror')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'memerror'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>JVM Memory Failure Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'hierarchy'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Throwable Hierarchy</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: 3 ERROR CATEGORIES (COMPILE-TIME, RUNTIME, LOGICAL)            */}
      {/* ===================================================================== */}
      {activeTab === 'categories' && (
        <div className="space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'compile', title: '1. Compile-Time Errors', subtitle: 'Lexical, Syntax, Semantic', badge: 'javac Blocker', color: 'border-rose-500/40 text-rose-300' },
              { id: 'runtime', title: '2. Runtime Errors', subtitle: 'Fatal Errors vs Exceptions', badge: 'JVM Execution', color: 'border-amber-500/40 text-amber-300' },
              { id: 'logical', title: '3. Logical Errors', subtitle: 'Incorrect Result / Formula', badge: 'Silent Bug', color: 'border-purple-500/40 text-purple-300' }
            ].map(item => {
              const isSelected = selectedCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedCategory(item.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <span className={`text-xs font-bold font-mono block ${item.color}`}>{item.title}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* Detailed Category View */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Code Box */}
            <div className="xl:col-span-6 space-y-2 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Code Manifestation</span>
                </span>
                <span>Java 21</span>
              </div>
              <UltraModernCodeViewer code={currentCat.code} />
            </div>

            {/* Right: Technical Explanation */}
            <div className="xl:col-span-6 p-6 rounded-2xl bg-[#060B16] border border-slate-800 space-y-4 shadow-inner">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${currentCat.badgeColor}`}>
                  {currentCat.badge}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Category Deep Dive</span>
              </div>

              <h4 className="text-base font-bold text-white">
                {currentCat.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentCat.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <strong className="text-xs text-cyan-300 font-mono block">Sub-types &amp; Causes:</strong>
                {currentCat.types.map((t, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-850 text-xs">
                    <span className="font-bold text-white block mb-0.5">{t.name}:</span>
                    <span className="text-slate-400 leading-snug text-[11.5px]">{t.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: JVM MEMORY FAILURE SIMULATOR (STACK VS HEAP EXHAUSTION)        */}
      {/* ===================================================================== */}
      {activeTab === 'memerror' && (
        <div className="space-y-6 relative z-10">
          
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>JVM Memory Resource Depletion Simulator</span>
              </h4>
              <p className="text-xs text-slate-300">
                Simulate how infinite recursion or uncontrolled memory allocation exhausts physical JVM memory zones.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={runErrorSim}
                disabled={errorSimStep > 0 && errorSimStep < 3}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs shadow-lg shadow-rose-500/30 transition flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Trigger Resource Depletion</span>
              </button>
              <button
                onClick={resetErrorSim}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => { setErrorSimType('stack'); setErrorSimStep(0); }}
              className={`p-3.5 rounded-2xl border text-left transition ${
                errorSimType === 'stack'
                  ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <strong className="block text-xs">Scenario 1: Infinite Recursion (Thread Stack)</strong>
              <span className="text-[10px] text-slate-400">main(null) exhausts -Xss Stack Memory -&gt; StackOverflowError</span>
            </button>

            <button
              onClick={() => { setErrorSimType('heap'); setErrorSimStep(0); }}
              className={`p-3.5 rounded-2xl border text-left transition ${
                errorSimType === 'heap'
                  ? 'bg-purple-950/60 border-purple-500 text-purple-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <strong className="block text-xs">Scenario 2: Unbounded Object Creation (Heap Space)</strong>
              <span className="text-[10px] text-slate-400">while(true) list.add(new int[1M]) exhausts -Xmx -&gt; OutOfMemoryError</span>
            </button>
          </div>

          {/* Animated Memory Progress Bar */}
          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/30 font-mono text-xs space-y-4 shadow-inner">
            <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
              <span className="text-cyan-400 font-bold">
                Target JVM Memory Zone: {errorSimType === 'stack' ? 'Thread Call Stack (-Xss)' : 'Java Heap Space (-Xmx)'}
              </span>
              <span className="text-slate-400">
                Status: {errorSimStep === 3 ? '💥 FATAL SYSTEM ERROR' : errorSimStep > 0 ? 'Allocating...' : 'Normal'}
              </span>
            </div>

            {/* Memory Meter Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Memory Utilization</span>
                <span>{errorSimStep === 0 ? '15%' : errorSimStep === 1 ? '55%' : errorSimStep === 2 ? '95%' : '100% (CRITICAL DEPLETION)'}</span>
              </div>
              <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    errorSimStep === 3 
                      ? 'w-full bg-rose-500 shadow-lg shadow-rose-500/50 animate-pulse' 
                      : errorSimStep === 2 
                      ? 'w-[95%] bg-amber-500' 
                      : errorSimStep === 1 
                      ? 'w-[55%] bg-cyan-500' 
                      : 'w-[15%] bg-emerald-500'
                  }`}
                />
              </div>
            </div>

            {/* Terminal Log */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] leading-relaxed">
              {errorSimStep === 0 && <span className="text-slate-500 italic">Click "Trigger Resource Depletion" to launch execution simulation.</span>}
              {errorSimStep >= 1 && <p className="text-cyan-300">▶ Step 1: Pushing rapid recursive stack frames / allocating heavy arrays...</p>}
              {errorSimStep >= 2 && <p className="text-amber-400">⚠️ Step 2: JVM Garbage Collector fails to reclaim required memory threshold.</p>}
              {errorSimStep >= 3 && (
                <p className="text-rose-400 font-bold mt-1">
                  💥 Step 3: Exception in thread "main" {errorSimType === 'stack' ? 'java.lang.StackOverflowError' : 'java.lang.OutOfMemoryError: Java heap space'} (JVM halted).
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: THROWABLE HIERARCHY TREE                                       */}
      {/* ===================================================================== */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/30 font-mono text-xs space-y-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Throwable Class Inheritance Blueprint</span>
              </span>
              <span className="text-[10px] text-slate-400">java.lang.Object &gt; java.lang.Throwable</span>
            </div>

            <pre className="text-slate-300 text-[11px] sm:text-xs leading-relaxed overflow-x-auto">
{`                             java.lang.Object
                                    │
                          java.lang.Throwable
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
            java.lang.Error                 java.lang.Exception
        (Fatal: System-Level)             (Recoverable Application)
                    │                               │
        ┌───────────┴───────────┐       ┌───────────┴───────────┐
        ▼                       ▼       ▼                       ▼
 StackOverflowError    OutOfMemoryError  Checked Exceptions   Unchecked (RuntimeException)
 (Stack Memory Full)    (Heap Space Full) (IOException, SQL)   (NullPointer, Arithmetic)`}
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
            <strong className="text-white block font-mono">🔑 Key Architectural Rules to Remember:</strong>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li><strong className="text-slate-200">Object</strong> is the root parent of all classes in Java.</li>
              <li><strong className="text-slate-200">Throwable</strong> is the direct parent of <code className="text-rose-400">Error</code> and <code className="text-emerald-400">Exception</code>.</li>
              <li>All Error subclasses are <strong className="text-amber-300">Unchecked</strong> — the compiler does not force handling.</li>
              <li>Errors indicate <strong className="text-rose-400">JVM/Environment resource exhaustion</strong>, whereas Exceptions represent <strong className="text-emerald-400">recoverable code logic anomalies</strong>.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
