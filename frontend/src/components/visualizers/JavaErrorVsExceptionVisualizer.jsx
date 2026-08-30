import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle, ChevronRight, ChevronLeft, ArrowDown,
  FileText, Shield, AlertOctagon, Scale, BookOpen, Compass
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaErrorVsExceptionVisualizer
 * High-Yield Interactive Theater & Comparison Engine for "Error vs Exception in Java":
 * 1. Dual-Track Execution Animation (Exception Graceful Recovery vs Fatal Error System Crash)
 * 2. Interactive 7-Aspect Comparison Matrix (Definition, Origin, Recoverability, Types, Examples, Timing, Predictability)
 * 3. Simple Language Walkthrough & Real-World Intuitive Explanations
 * 4. Throwable Architecture Blueprint
 */
export default function JavaErrorVsExceptionVisualizer() {
  const [activeTab, setActiveTab] = useState('sim'); // 'sim' | 'matrix' | 'hierarchy' | 'simple-guide'

  // Tab 1: Execution Animation States
  const [battleMode, setBattleMode] = useState('exception'); // 'exception' | 'error'
  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1300);

  // Tab 2: 7-Aspect Matrix State
  const [selectedAspectIndex, setSelectedAspectIndex] = useState(0);

  // Auto-play stepper for animation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      const maxSteps = battleMode === 'exception' ? 3 : 2;
      timer = setTimeout(() => {
        if (simStep < maxSteps) {
          setSimStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, simStep, battleMode, speed]);

  const handleModeChange = (mode) => {
    setBattleMode(mode);
    setSimStep(0);
    setIsPlaying(false);
  };

  // Dual Scenario Animation Data
  const battleScenarios = {
    exception: {
      title: '🛡️ Scenario A: Exception Handling (Recoverable Flow)',
      badge: 'Recoverable Anomaly',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'An application anomaly occurs (dividing by zero). Because it is enclosed in a try-catch block, the catch handler intercepts it, recovers smoothly, and allows the remaining program code to finish.',
      steps: [
        {
          step: 0,
          label: 'Step 1: Application Starts',
          desc: 'main() thread begins execution normally and enters protected try block.',
          activeLine: 3,
          terminal: 'Step 1: Program starts.'
        },
        {
          step: 1,
          label: 'Step 2: Anomaly Occurs in try (10 / 0)',
          desc: 'JVM detects arithmetic division by zero. Instantiates ArithmeticException object.',
          activeLine: 7,
          terminal: 'Step 1: Program starts.\n[JVM] ArithmeticException thrown -> Looking for catch block...'
        },
        {
          step: 2,
          label: 'Step 3: catch Block Intercepts & Recovers',
          desc: 'catch (ArithmeticException e) captures exception. Prevents crash and logs friendly message.',
          activeLine: 9,
          terminal: 'Step 1: Program starts.\n⚠️ Caught Exception: Cannot divide by zero (/ by zero)'
        },
        {
          step: 3,
          label: 'Step 4: Normal Flow Continues (Success!)',
          desc: 'Program execution continues past catch block. Completes with Exit Code 0.',
          activeLine: 13,
          terminal: 'Step 1: Program starts.\n⚠️ Caught Exception: Cannot divide by zero (/ by zero)\nStep 3: Program completes successfully!'
        }
      ],
      code: `public class ExceptionRecoveryDemo {
    public static void main(String[] args) {
        System.out.println("Step 1: Program starts.");

        try {
            int a = 10;
            int b = 0;
            int result = a / b; // Throws ArithmeticException
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("⚠️ Caught Exception: Cannot divide by zero (" + e.getMessage() + ")");
        }

        // ✅ Program continues running smoothly!
        System.out.println("Step 3: Program completes successfully!");
    }
}`
    },
    error: {
      title: '⚠️ Scenario B: JVM Fatal Error (Unrecoverable Crash)',
      badge: 'Unrecoverable System Breakdown',
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
      description: 'A serious system/JVM failure occurs (infinite recursion exhausts the thread call stack). Application logic cannot fix system resource depletion, causing JVM termination.',
      steps: [
        {
          step: 0,
          label: 'Step 1: Application Starts',
          desc: 'main() thread begins execution and calls recursiveMethod().',
          activeLine: 8,
          terminal: 'Step 1: Program starts.'
        },
        {
          step: 1,
          label: 'Step 2: Stack Memory Rapidly Exhausted',
          desc: 'Infinite recursive calls continuously push new stack frames without a base condition.',
          activeLine: 4,
          terminal: 'Step 1: Program starts.\n[JVM] Thread Stack (-Xss) memory utilization reaches 100%...'
        },
        {
          step: 2,
          label: '💥 Step 3: JVM Fatal Crash (StackOverflowError)',
          desc: 'JVM throws java.lang.StackOverflowError. Application cannot recover. Thread is terminated!',
          activeLine: 4,
          terminal: 'Step 1: Program starts.\nException in thread "main" java.lang.StackOverflowError\n\tat FatalErrorDemo.recursiveMethod(FatalErrorDemo.java:4)\n\tat FatalErrorDemo.recursiveMethod(FatalErrorDemo.java:4)\n\t... [JVM Process Terminated]'
        }
      ],
      code: `public class FatalErrorDemo {
    // Infinite recursive method pushes endless stack frames
    public static void recursiveMethod() {
        recursiveMethod(); // Exhausts thread stack memory
    }

    public static void main(String[] args) {
        System.out.println("Step 1: Program starts.");

        // 💥 Fatal system failure occurs here:
        recursiveMethod();

        // ❌ The statement below will NEVER execute!
        System.out.println("Step 2: Program finished.");
    }
}`
    }
  };

  const currentBattle = battleScenarios[battleMode];
  const activeStepInfo = currentBattle.steps[Math.min(simStep, currentBattle.steps.length - 1)];

  // 7 Aspects Comparison Data
  const sevenAspects = [
    {
      aspect: '1. Definition',
      error: 'A serious runtime issue that the application typically cannot recover from (e.g., memory exhaustion or JVM crash).',
      exception: 'An abnormal, often recoverable event that disrupts program flow, caused by logic or environmental issues.',
      highlight: 'Errors indicate fatal system breakdowns; Exceptions indicate recoverable logic conditions.'
    },
    {
      aspect: '2. Cause / Origin',
      error: 'Caused by system-level or JVM issues (e.g., memory exhaustion, VM crash, hardware faults).',
      exception: 'Caused by Application-level problems such as invalid input, faulty logic, or resource access errors.',
      highlight: 'Errors originate from environment/JVM resources; Exceptions originate from code logic or user input.'
    },
    {
      aspect: '3. Recoverability',
      error: 'We cannot recover the error; the program should log it and terminate.',
      exception: 'We can recover the exception using try-catch blocks or throwing exceptions back to the caller.',
      highlight: 'Exceptions are 100% recoverable in code; Errors are unrecoverable.'
    },
    {
      aspect: '4. Types / Categories',
      error: 'System-related only; not divided further in the Exception hierarchy (always Unchecked).',
      exception: 'Two categories: 1) Checked Exceptions (must be handled or declared), 2) Unchecked Exceptions (runtime exceptions).',
      highlight: 'Exceptions have Checked and Unchecked branches; Errors are purely unchecked system anomalies.'
    },
    {
      aspect: '5. Examples',
      error: 'OutOfMemoryError, StackOverflowError, VirtualMachineError, NoClassDefFoundError.',
      exception: 'Checked: IOException, SQLException | Unchecked: NullPointerException, ArithmeticException, ArrayIndexOutOfBoundsException.',
      highlight: 'Errors: Stack/Heap exhaustion. Exceptions: Division by zero, null pointer, file not found.'
    },
    {
      aspect: '6. When They Occur',
      error: 'Can occur both at compile time (e.g. fatal tool/system bugs) and runtime.',
      exception: 'Primarily occur at runtime, though checked exceptions are detected & enforced at compile time.',
      highlight: 'Checked exceptions are caught at compile time; runtime exceptions & errors occur during execution.'
    },
    {
      aspect: '7. Predictability',
      error: 'Unpredictable and often outside the control of the application.',
      exception: 'Can be expected and handled through proper coding practices and defensive checks.',
      highlight: 'Exceptions are foreseeable and manageable; Errors are external and unpreventable in code.'
    }
  ];

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Scale className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Comparison &amp; Execution Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Difference Between Error and Exception in Java
          </h3>
        </div>

        {/* Master Tab Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          {[
            { id: 'sim', label: '1. Live Battle Animation', icon: Play },
            { id: 'matrix', label: '2. 7-Aspect Comparison', icon: Scale },
            { id: 'simple-guide', label: '3. Simple Language Guide', icon: Compass },
            { id: 'hierarchy', label: '4. Throwable Tree', icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: DUAL-TRACK EXECUTION BATTLE ANIMATION                          */}
      {/* ===================================================================== */}
      {activeTab === 'sim' && (
        <div className="space-y-6 relative z-10">
          
          {/* Track Selector & Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            
            {/* Mode Switchers */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleModeChange('exception')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                  battleMode === 'exception'
                    ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-900/30 scale-[1.02]'
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>🛡️ Exception: Recoverable Flow</span>
              </button>

              <button
                onClick={() => handleModeChange('error')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                  battleMode === 'error'
                    ? 'bg-rose-950/90 border-rose-500 text-rose-300 shadow-md shadow-rose-900/30 scale-[1.02]'
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                }`}
              >
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>⚠️ Error: Fatal System Crash</span>
              </button>
            </div>

            {/* Animation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSimStep(prev => Math.max(0, prev - 1))}
                disabled={simStep === 0 || isPlaying}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs border border-slate-700 transition"
                title="Step Backward"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-lg transition flex items-center gap-1.5 ${
                  battleMode === 'exception'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
                    : 'bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-rose-500/30'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Animate Flow'}</span>
              </button>

              <button
                onClick={() => setSimStep(prev => Math.min(currentBattle.steps.length - 1, prev + 1))}
                disabled={simStep >= currentBattle.steps.length - 1 || isPlaying}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs border border-slate-700 transition"
                title="Step Forward"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { setSimStep(0); setIsPlaying(false); }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition"
                title="Reset Simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scenario Banner */}
          <div className="p-4 rounded-2xl bg-[#060B16] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{currentBattle.title}</span>
              </span>
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${currentBattle.badgeColor}`}>
                {currentBattle.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentBattle.description}
            </p>
          </div>

          {/* Live Instruction Pipeline */}
          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/30 font-mono text-xs space-y-6 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 animate-pulse" />
                <span>Execution Timeline &amp; State Transition</span>
              </span>
              <span className="text-[11px] text-slate-400">
                Step {simStep + 1} of {currentBattle.steps.length}
              </span>
            </div>

            {/* Visual Steps Pipeline */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {battleMode === 'exception' ? (
                <>
                  <FlowCard 
                    stepIndex={0} 
                    currentStep={simStep} 
                    title="1. Start Program" 
                    desc='Enters main() & try' 
                    status={simStep >= 0 ? 'success' : 'pending'} 
                  />
                  <FlowCard 
                    stepIndex={1} 
                    currentStep={simStep} 
                    title="2. Anomaly (10 / 0)" 
                    desc="Throws ArithmeticException" 
                    status={simStep >= 1 ? 'warning' : 'pending'} 
                  />
                  <FlowCard 
                    stepIndex={2} 
                    currentStep={simStep} 
                    title="3. catch Intercept" 
                    desc="Handles exception safely" 
                    status={simStep >= 2 ? 'success' : 'pending'} 
                  />
                  <FlowCard 
                    stepIndex={3} 
                    currentStep={simStep} 
                    title="4. Exit Code 0" 
                    desc="Program completes safely!" 
                    status={simStep >= 3 ? 'success' : 'pending'} 
                  />
                </>
              ) : (
                <>
                  <FlowCard 
                    stepIndex={0} 
                    currentStep={simStep} 
                    title="1. Start Program" 
                    desc="main() calls recursive()" 
                    status={simStep >= 0 ? 'success' : 'pending'} 
                  />
                  <FlowCard 
                    stepIndex={1} 
                    currentStep={simStep} 
                    title="2. Infinite Stack Push" 
                    desc="Stack Memory Hits 100%" 
                    status={simStep >= 1 ? 'error' : 'pending'} 
                  />
                  <FlowCard 
                    stepIndex={2} 
                    currentStep={simStep} 
                    title="3. StackOverflowError" 
                    desc="💥 JVM crashes process" 
                    status={simStep >= 2 ? 'error' : 'pending'} 
                  />
                  <FlowCard 
                    stepIndex={2} 
                    currentStep={simStep} 
                    title="4. BLOCKED FOREVER" 
                    desc="❌ Never reached" 
                    status={simStep >= 2 ? 'blocked' : 'pending'} 
                  />
                </>
              )}
            </div>

            {/* Active Step Diagnostic Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <div className={`p-2 rounded-lg border shrink-0 mt-0.5 ${
                battleMode === 'exception' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-rose-950 text-rose-400 border-rose-800'
              }`}>
                {battleMode === 'exception' ? <CheckCircle2 className="w-4 h-4" /> : <AlertOctagon className="w-4 h-4" />}
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white text-xs block">
                  {activeStepInfo.label}
                </span>
                <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans">
                  {activeStepInfo.desc}
                </p>
              </div>
            </div>

            {/* Code Panel & Terminal Output */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              <div className="xl:col-span-7 space-y-2 min-w-0">
                <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                  <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{battleMode === 'exception' ? 'ExceptionRecoveryDemo.java' : 'FatalErrorDemo.java'}</span>
                  </span>
                  <span>Java 21</span>
                </div>
                <UltraModernCodeViewer code={currentBattle.code} title={battleMode === 'exception' ? 'ExceptionDemo.java' : 'ErrorDemo.java'} />
              </div>

              <div className="xl:col-span-5 space-y-2 min-w-0">
                <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Console / JVM Terminal</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Output</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 min-h-[200px] whitespace-pre-wrap leading-relaxed shadow-inner">
                  {activeStepInfo.terminal}
                </div>
              </div>
            </div>
          </div>

          {/* Simple Explanation of the Animation */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Explanation of this Animation in Simple Words:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed font-sans">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1.5">
                <strong className="text-emerald-300 font-mono block">🛡️ Why Exception can be Recovered:</strong>
                <p>
                  When code tries to do something illegal like dividing by zero (<code>10 / 0</code>), it is a <strong>software logic mistake</strong>. The JVM creates an <code>ArithmeticException</code> object. Because we placed a <code>try-catch</code> shield around it, the catch block intercepts it, prints a friendly message, and <strong>the program continues running to the end without crashing</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/30 space-y-1.5">
                <strong className="text-rose-300 font-mono block">⚠️ Why Error Crashes the Program:</strong>
                <p>
                  When a method calls itself infinitely without stopping, it fills up the entire <strong>Stack Memory</strong> allocated to that thread. This is a <strong>system-level physical resource failure</strong>. Java code cannot add more RAM to the CPU while running, so the JVM has no choice but to <strong>terminate the entire program immediately</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: INTERACTIVE 7-ASPECT COMPARISON MATRIX                         */}
      {/* ===================================================================== */}
      {activeTab === 'matrix' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>7 Key Architectural Aspects: Error vs Exception</span>
            </h4>
            <p className="text-xs text-slate-300">
              Click through the 7 dimensions below to inspect the contrast between Error and Exception.
            </p>
          </div>

          {/* Aspect Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {sevenAspects.map((asp, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAspectIndex(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                  selectedAspectIndex === idx
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {asp.aspect}
              </button>
            ))}
          </div>

          {/* Focused Aspect Comparison Card */}
          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/30 space-y-4 shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-base font-extrabold text-white font-mono">
                Focus Dimension: {sevenAspects[selectedAspectIndex].aspect}
              </span>
              <span className="text-[11px] font-mono text-cyan-300 px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                Aspect {selectedAspectIndex + 1} of 7
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Error Box */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5 uppercase">
                  <AlertOctagon className="w-4 h-4 text-rose-400" />
                  <span>⚠️ Error View</span>
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {sevenAspects[selectedAspectIndex].error}
                </p>
              </div>

              {/* Exception Box */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>🛡️ Exception View</span>
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {sevenAspects[selectedAspectIndex].exception}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-xs text-cyan-300 font-mono">
              💡 <strong>Key Takeaway:</strong> {sevenAspects[selectedAspectIndex].highlight}
            </div>
          </div>

          {/* Full Table Overview */}
          <div className="p-6 rounded-2xl bg-[#060B16] border border-slate-800 overflow-x-auto shadow-inner">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 pr-4 font-bold">Aspect</th>
                  <th className="pb-3 pr-4 font-bold text-rose-400">⚠️ Error</th>
                  <th className="pb-3 font-bold text-cyan-400">🛡️ Exception</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                {sevenAspects.map((asp, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition">
                    <td className="py-3 font-bold text-white pr-4">{asp.aspect}</td>
                    <td className="py-3 text-rose-200/90 pr-4 leading-relaxed">{asp.error}</td>
                    <td className="py-3 text-cyan-200/90 leading-relaxed">{asp.exception}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: SIMPLE LANGUAGE GUIDE & REAL-WORLD ANALOGIES                   */}
      {/* ===================================================================== */}
      {activeTab === 'simple-guide' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Explaining Error vs Exception in Super Simple Language</span>
            </h4>
            <p className="text-xs text-slate-300">
              Clear mental models and analogies to remember forever for interviews and everyday coding.
            </p>
          </div>

          {/* Real-World Analogies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Analogy 1: Car Road Trip */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-cyan-500/30 space-y-3 shadow-inner">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Analogy 1: The Road Trip</span>
              </span>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30">
                  <strong className="text-emerald-300 block mb-1">🛡️ Exception = A Flat Tire:</strong>
                  <span>Your car gets a flat tire (unexpected event disrupting travel). But you have a spare tire and a jack in the trunk (<code>try-catch</code>). You replace the tire, start the car again, and safely reach your destination!</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/30">
                  <strong className="text-rose-300 block mb-1">⚠️ Error = A Bridge Collapse Ahead:</strong>
                  <span>The bridge over the river has collapsed into the water. No matter what tools you have in your trunk, you cannot rebuild a concrete bridge on the spot while driving. You must stop the trip immediately.</span>
                </div>
              </div>
            </div>

            {/* Analogy 2: Restaurant Kitchen */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-cyan-500/30 space-y-3 shadow-inner">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Analogy 2: The Restaurant Kitchen</span>
              </span>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30">
                  <strong className="text-emerald-300 block mb-1">🛡️ Exception = Running Out of Tomatoes:</strong>
                  <span>The chef is out of tomatoes for a pizza order. The waiter asks the customer if they would like white sauce instead (recovery). The restaurant keeps serving food!</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/30">
                  <strong className="text-rose-300 block mb-1">⚠️ Error = Power Grid Outage / Fire:</strong>
                  <span>The city power grid fails and the kitchen catches fire. Cooking cannot continue. The restaurant must shut down and evacuate all guests.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Memory Cheat Sheet */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <strong className="text-white block font-mono text-xs">📝 Quick Memory Summary:</strong>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-400 font-mono block">Can I catch it?</span>
                <strong className="text-emerald-400 block mt-1">Exception: YES (try-catch)</strong>
                <strong className="text-rose-400 block mt-0.5">Error: NO (Do not catch)</strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-400 font-mono block">Whose fault is it?</span>
                <strong className="text-emerald-400 block mt-1">Exception: Program Logic</strong>
                <strong className="text-rose-400 block mt-0.5">Error: System / JVM Resources</strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-400 font-mono block">Root Parent?</span>
                <strong className="text-cyan-300 block mt-1">java.lang.Throwable</strong>
                <span className="text-slate-400 text-[11px] block mt-0.5">Both inherit Throwable!</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: THROWABLE HIERARCHY BLUEPRINT                                  */}
      {/* ===================================================================== */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/30 font-mono text-xs space-y-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Throwable Architecture Tree</span>
              </span>
              <span className="text-[10px] text-slate-400">java.lang</span>
            </div>

            <pre className="text-slate-300 text-[11px] sm:text-xs leading-relaxed overflow-x-auto">
{`                                 java.lang.Object
                                        │
                               java.lang.Throwable
                                        │
                        ┌───────────────┴───────────────┐
                        ▼                               ▼
                java.lang.Error                 java.lang.Exception
            (Fatal: System-Level)             (Recoverable Application)
            * CANNOT BE HANDLED *               * CAN BE HANDLED *
                        │                               │
            ┌───────────┴───────────┐       ┌───────────┴───────────┐
            ▼                       ▼       ▼                       ▼
     StackOverflowError    OutOfMemoryError  Checked Exceptions   RuntimeException (Unchecked)
     (Stack Memory Full)   (Heap Space Full) (IOException, SQL)   (NullPointer, Arithmetic)`}
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
            <strong className="text-white block font-mono">🔑 Key Architectural Rules:</strong>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li><strong className="text-slate-200">java.lang.Object</strong> is the root parent of all Java classes.</li>
              <li><strong className="text-slate-200">java.lang.Throwable</strong> is the direct superclass of both <code className="text-rose-400">Error</code> and <code className="text-emerald-400">Exception</code>.</li>
              <li>Errors are <strong className="text-rose-400">always unchecked</strong> and signify JVM/system failure.</li>
              <li>Exceptions are divided into <strong className="text-blue-300">Checked</strong> (compile-time) and <strong className="text-amber-300">Unchecked</strong> (runtime) exceptions.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function FlowCard({ stepIndex, currentStep, title, desc, status }) {
  const isCurrent = currentStep === stepIndex;

  let bg = 'bg-slate-900/60 border-slate-800 text-slate-400';
  let badgeColor = 'bg-slate-800 text-slate-400';

  if (status === 'success') {
    bg = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200';
    badgeColor = 'bg-emerald-900 text-emerald-300';
  } else if (status === 'warning') {
    bg = 'bg-amber-950/40 border-amber-500/50 text-amber-200';
    badgeColor = 'bg-amber-900 text-amber-300';
  } else if (status === 'error') {
    bg = 'bg-rose-950/60 border-rose-500 text-rose-200';
    badgeColor = 'bg-rose-900 text-rose-300';
  } else if (status === 'blocked') {
    bg = 'bg-slate-950 border-slate-850 text-slate-600';
    badgeColor = 'bg-slate-900 text-slate-600';
  }

  return (
    <div className={`p-3.5 rounded-2xl border transition-all duration-300 ${bg} ${
      isCurrent ? 'ring-2 ring-cyan-400 scale-[1.03] shadow-lg shadow-cyan-500/20' : ''
    }`}>
      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${badgeColor}`}>
        Step {stepIndex + 1}
      </span>
      <strong className="text-xs font-bold block text-white mt-1.5">{title}</strong>
      <p className="text-[10.5px] mt-0.5 opacity-80">{desc}</p>
    </div>
  );
}
