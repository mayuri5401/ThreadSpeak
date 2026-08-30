import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle, ChevronRight, ChevronLeft, ArrowDown,
  FileText, Shield, AlertOctagon, CornerDownRight, CheckCircle, Info,
  Sliders, Activity, Eye, BookOpen, Lightbulb
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaMultipleCatchVisualizer
 * High-Yield Interactive Theater & Animation for:
 * "Multiple catch Block in Java"
 */
export default function JavaMultipleCatchVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'animation-explainer' | 'rules'

  // Simulator Scenario States
  const [scenario, setScenario] = useState('input-mismatch'); // 'input-mismatch' | 'divide-by-zero' | 'normal' | 'compile-error'

  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1400);

  // Scenario Configurations
  const getActiveScenarioConfig = () => {
    if (scenario === 'input-mismatch') {
      return {
        title: '⚠️ Scenario 1: Input Mismatch Error (Non-Integer Entered)',
        badge: 'Triggers Catch 1 (InputMismatchException)',
        badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
        code: `import java.util.Scanner;
import java.util.InputMismatchException;

public class MainApp {
    public static void main(String[] args) {
        System.out.println("----- App Started -----");
        Scanner sc = new Scanner(System.in);
        try {
            System.out.println("Enter no 1");
            int no1 = sc.nextInt(); // 💥 User enters "abc" -> Throws InputMismatchException!

            System.out.println("Enter no 2");
            int no2 = sc.nextInt();

            int res = no1 / no2;
            System.out.println("Result : " + res);
        } catch (InputMismatchException ime) {
            // ✅ MATCH: First catch block catches InputMismatchException
            System.out.println("Input Mismatch Exception Occured : " + ime);
        } catch (ArithmeticException ae) {
            // ⏭️ SKIPPED: Already handled by previous catch block
            System.out.println("Arithmetic Exception Occured : " + ae);
        }
        System.out.println("----- App Finished Successfully -----");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 6,
            label: '1. App Initialization',
            desc: 'Program begins execution in main(). Prints "----- App Started -----".',
            terminal: '----- App Started -----\nEnter no 1\nabc',
            evaluatingCatch: null,
            state: { no1: 'abc (Invalid)', no2: null, res: null, caughtBy: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 10,
            label: '2. 💥 Exception Thrown in try block',
            desc: 'Scanner attempts `sc.nextInt()` on input "abc". JVM throws `java.util.InputMismatchException`!',
            terminal: '----- App Started -----\nEnter no 1\nabc',
            evaluatingCatch: null,
            state: { no1: 'abc (Invalid)', no2: null, res: null, caughtBy: null, status: 'EXCEPTION_THROWN: InputMismatchException' }
          },
          {
            stepNum: 2,
            line: 18,
            label: '3. 🎯 Evaluate Catch Block 1: InputMismatchException',
            desc: 'JVM checks 1st catch block: `catch (InputMismatchException ime)`. Exception matches type! Enters handler.',
            terminal: '----- App Started -----\nEnter no 1\nabc\nInput Mismatch Exception Occured : java.util.InputMismatchException',
            evaluatingCatch: 1,
            state: { no1: 'abc', no2: null, res: null, caughtBy: 'Catch 1 (InputMismatchException)', status: 'HANDLED' }
          },
          {
            stepNum: 3,
            line: 21,
            label: '4. ⏭️ Skip Remaining Catch Blocks',
            desc: 'Because Catch 1 handled the exception, Catch 2 (`ArithmeticException`) is completely bypassed.',
            terminal: '----- App Started -----\nEnter no 1\nabc\nInput Mismatch Exception Occured : java.util.InputMismatchException',
            evaluatingCatch: 2,
            skippedCatch: 2,
            state: { no1: 'abc', no2: null, res: null, caughtBy: 'Catch 1 (InputMismatchException)', status: 'CATCH_2_SKIPPED' }
          },
          {
            stepNum: 4,
            line: 25,
            label: '5. ✅ Normal Termination',
            desc: 'Program safely exits the try-catch structure and executes final line: "----- App Finished Successfully -----".',
            terminal: '----- App Started -----\nEnter no 1\nabc\nInput Mismatch Exception Occured : java.util.InputMismatchException\n----- App Finished Successfully -----',
            evaluatingCatch: null,
            state: { no1: 'abc', no2: null, res: null, caughtBy: 'Catch 1 (InputMismatchException)', status: 'COMPLETED_SUCCESS' }
          }
        ]
      };
    }

    if (scenario === 'divide-by-zero') {
      return {
        title: '💥 Scenario 2: Arithmetic Division by Zero (100 / 0)',
        badge: 'Evaluates Catch 1 (No Match) -> Triggers Catch 2 (Match)',
        badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
        code: `import java.util.Scanner;
import java.util.InputMismatchException;

public class MainApp {
    public static void main(String[] args) {
        System.out.println("----- App Started -----");
        Scanner sc = new Scanner(System.in);
        try {
            System.out.println("Enter no 1");
            int no1 = sc.nextInt(); // 100

            System.out.println("Enter no 2");
            int no2 = sc.nextInt(); // 0

            int res = no1 / no2; // 💥 Division by Zero -> Throws ArithmeticException!
            System.out.println("Result : " + res);
        } catch (InputMismatchException ime) {
            // ❌ NO MATCH: ArithmeticException is not an InputMismatchException
            System.out.println("Input Mismatch Exception Occured : " + ime);
        } catch (ArithmeticException ae) {
            // ✅ MATCH: Second catch block catches ArithmeticException!
            System.out.println("Arithmetic Exception Occured : " + ae);
        }
        System.out.println("----- App Finished Successfully -----");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 6,
            label: '1. App Started & Input Read',
            desc: 'User successfully enters integers: `no1 = 100` and `no2 = 0`.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0',
            evaluatingCatch: null,
            state: { no1: 100, no2: 0, res: null, caughtBy: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 14,
            label: '2. 💥 ArithmeticException Thrown',
            desc: 'JVM executes `int res = no1 / no2;` (100 / 0). Division by zero throws `ArithmeticException: / by zero`.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0',
            evaluatingCatch: null,
            state: { no1: 100, no2: 0, res: null, caughtBy: null, status: 'EXCEPTION_THROWN: ArithmeticException' }
          },
          {
            stepNum: 2,
            line: 17,
            label: '3. 🔍 Check Catch 1: InputMismatchException (NO MATCH)',
            desc: 'JVM tests Catch 1: `ArithmeticException instanceof InputMismatchException` is FALSE. JVM continues searching down.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0',
            evaluatingCatch: 1,
            mismatchCatch: 1,
            state: { no1: 100, no2: 0, res: null, caughtBy: null, status: 'CATCH_1_MISMATCH' }
          },
          {
            stepNum: 3,
            line: 20,
            label: '4. 🎯 Check Catch 2: ArithmeticException (MATCH!)',
            desc: 'JVM tests Catch 2: `ArithmeticException instanceof ArithmeticException` is TRUE! Enters handler and prints error.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0\nArithmetic Exception Occured : java.lang.ArithmeticException: / by zero',
            evaluatingCatch: 2,
            state: { no1: 100, no2: 0, res: null, caughtBy: 'Catch 2 (ArithmeticException)', status: 'HANDLED' }
          },
          {
            stepNum: 4,
            line: 24,
            label: '5. ✅ Normal Termination',
            desc: 'Execution proceeds past catch blocks. System prints "----- App Finished Successfully -----".',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0\nArithmetic Exception Occured : java.lang.ArithmeticException: / by zero\n----- App Finished Successfully -----',
            evaluatingCatch: null,
            state: { no1: 100, no2: 0, res: null, caughtBy: 'Catch 2 (ArithmeticException)', status: 'COMPLETED_SUCCESS' }
          }
        ]
      };
    }

    if (scenario === 'normal') {
      return {
        title: '✅ Scenario 3: Normal Execution (Valid Inputs 100 / 4)',
        badge: 'No Exception -> All Catch Blocks Skipped',
        badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
        code: `import java.util.Scanner;
import java.util.InputMismatchException;

public class MainApp {
    public static void main(String[] args) {
        System.out.println("----- App Started -----");
        Scanner sc = new Scanner(System.in);
        try {
            System.out.println("Enter no 1");
            int no1 = sc.nextInt(); // 100

            System.out.println("Enter no 2");
            int no2 = sc.nextInt(); // 4

            int res = no1 / no2; // 25
            System.out.println("Result : " + res);
        } catch (InputMismatchException ime) {
            // ⏭️ SKIPPED (No exception)
            System.out.println("Input Mismatch Exception Occured : " + ime);
        } catch (ArithmeticException ae) {
            // ⏭️ SKIPPED (No exception)
            System.out.println("Arithmetic Exception Occured : " + ae);
        }
        System.out.println("----- App Finished Successfully -----");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 6,
            label: '1. App Started',
            desc: 'Program begins execution in main(). Prompts user for numbers.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n4',
            evaluatingCatch: null,
            state: { no1: 100, no2: 4, res: null, caughtBy: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 14,
            label: '2. Calculation Success',
            desc: 'Calculation `100 / 4` completes cleanly without errors. Result = 25.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n4\nResult : 25',
            evaluatingCatch: null,
            state: { no1: 100, no2: 4, res: 25, caughtBy: 'None (Skipped All)', status: 'SUCCESS' }
          },
          {
            stepNum: 2,
            line: 17,
            label: '3. ⏭️ All Catch Blocks Bypassed',
            desc: 'Because no exception occurred inside the try block, the JVM skips all catch blocks completely.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n4\nResult : 25',
            evaluatingCatch: null,
            skippedCatch: 'all',
            state: { no1: 100, no2: 4, res: 25, caughtBy: 'None (Skipped All)', status: 'ALL_CATCH_SKIPPED' }
          },
          {
            stepNum: 3,
            line: 24,
            label: '4. ✅ App Finished Successfully',
            desc: 'Final statement executes cleanly.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n4\nResult : 25\n----- App Finished Successfully -----',
            evaluatingCatch: null,
            state: { no1: 100, no2: 4, res: 25, caughtBy: 'None', status: 'COMPLETED_SUCCESS' }
          }
        ]
      };
    }

    // compile-error scenario
    return {
      title: '🚨 Scenario 4: Incorrect Ordering (Compile-Time Error)',
      badge: 'Unreachable Catch Block (Subclass after Superclass)',
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
      code: `public class CompileErrorDemo {
    public static void main(String[] args) {
        try {
            int num = 10 / 0;
        } 
        // 🛑 Parent Class Catch placed FIRST:
        catch (Exception e) {
            System.out.println("Exception caught: " + e);
        } 
        // ❌ COMPILE ERROR: Child Class Catch placed SECOND:
        catch (ArithmeticException ae) { 
            // 🚨 UNREACHABLE CODE: 'Exception' already caught everything!
            System.out.println("Arithmetic Exception caught");
        }
    }
}`,
      steps: [
        {
          stepNum: 0,
          line: 4,
          label: '1. Source Code Inspection',
          desc: 'Java Compiler (javac) parses the try-catch structure and inspects the catch hierarchy.',
          terminal: 'javac CompileErrorDemo.java',
          evaluatingCatch: null,
          state: { no1: 10, no2: 0, res: null, caughtBy: null, status: 'COMPILING' }
        },
        {
          stepNum: 1,
          line: 7,
          label: '2. Parent Catch Block (`Exception e`) Examined',
          desc: 'Compiler recognizes `catch (Exception e)` as the root ancestor of all checked & unchecked exceptions.',
          terminal: 'javac CompileErrorDemo.java\nAnalyzing catch hierarchy...',
          evaluatingCatch: 1,
          state: { no1: 10, no2: 0, res: null, caughtBy: null, status: 'PARENT_CATCH_FOUND' }
        },
        {
          stepNum: 2,
          line: 11,
          label: '3. 🛑 Subclass Catch Block (`ArithmeticException ae`) Rejection',
          desc: 'Compiler detects that `ArithmeticException` is a subclass of `Exception`. Because `Exception` traps everything, this block can NEVER execute under any circumstance!',
          terminal: 'CompileErrorDemo.java:11: error: exception ArithmeticException has already been caught\n        catch (ArithmeticException ae) {\n        ^\n1 error',
          evaluatingCatch: 2,
          state: { no1: 10, no2: 0, res: null, caughtBy: null, status: 'COMPILE_ERROR' }
        }
      ]
    };
  };

  const activeConfig = getActiveScenarioConfig();
  const currentStepData = activeConfig.steps[Math.min(simStep, activeConfig.steps.length - 1)];

  // Autoplay handler
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setSimStep(prev => {
          if (prev < activeConfig.steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, activeConfig.steps.length]);

  const handleScenarioChange = (newScenario) => {
    setScenario(newScenario);
    setSimStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Tab Navigation */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 bg-[#0A101E]/95 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 ring-2 ring-cyan-400/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Multiple catch Block Simulator & Visualizer
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  JVM DISPATCH
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Interactive animation of sequential catch evaluation, type matching, and the Subclass-to-Parent rule.
              </p>
            </div>
          </div>

          {/* Navigation Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
            {[
              { id: 'simulator', label: 'Interactive Simulator', icon: Play },
              { id: 'animation-explainer', label: 'Animation Explainer', icon: BookOpen },
              { id: 'rules', label: 'Ordering Rules Matrix', icon: ShieldCheck },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Simulator View */}
        {activeTab === 'simulator' && (
          <div className="mt-5 space-y-5">
            {/* Scenario Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                { 
                  id: 'input-mismatch', 
                  title: '1. Input Mismatch', 
                  desc: 'Input "abc" -> Triggers Catch 1 (InputMismatchException)', 
                  color: 'border-amber-500/40 text-amber-300 hover:border-amber-400' 
                },
                { 
                  id: 'divide-by-zero', 
                  title: '2. Divide by Zero (100/0)', 
                  desc: 'Throws ArithmeticException -> Triggers Catch 2', 
                  color: 'border-cyan-500/40 text-cyan-300 hover:border-cyan-400' 
                },
                { 
                  id: 'normal', 
                  title: '3. Valid Input (100/4)', 
                  desc: 'Clean calculation -> All catch blocks skipped', 
                  color: 'border-emerald-500/40 text-emerald-300 hover:border-emerald-400' 
                },
                { 
                  id: 'compile-error', 
                  title: '4. Subclass Ordering Error', 
                  desc: 'Exception before ArithmeticException -> Compile Error', 
                  color: 'border-rose-500/40 text-rose-300 hover:border-rose-400' 
                },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleScenarioChange(item.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    scenario === item.id 
                      ? 'bg-slate-800/90 border-cyan-500 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/40' 
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>{item.title}</span>
                    {scenario === item.id && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Active Scenario Title Bar & Transport Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-white">
                  {activeConfig.title}
                </span>
                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold border ${activeConfig.badgeColor}`}>
                  {activeConfig.badge}
                </span>
              </div>

              {/* Player Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSimStep(Math.max(0, simStep - 1))}
                  disabled={simStep === 0}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 border border-slate-700 transition"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs shadow-md transition ${
                    isPlaying 
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' 
                      : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlaying ? 'Pause' : 'Play Animation'}</span>
                </button>

                <button
                  onClick={() => setSimStep(Math.min(activeConfig.steps.length - 1, simStep + 1))}
                  disabled={simStep >= activeConfig.steps.length - 1}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30 border border-slate-700 transition"
                  title="Next Step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => { setSimStep(0); setIsPlaying(false); }}
                  className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="text-[11px] font-mono text-cyan-300 px-2 py-1 rounded bg-slate-950 border border-slate-800">
                  Step {simStep + 1}/{activeConfig.steps.length}
                </div>
              </div>
            </div>

            {/* Main 2-Column Theater Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Column: Code View with Active Execution Highlight (7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="rounded-2xl border border-slate-800 overflow-hidden bg-[#070C18] shadow-xl">
                  <div className="px-4 py-2.5 bg-[#0A101E] border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono font-bold text-slate-200">MainApp.java</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-mono text-emerald-400">Executing Line {currentStepData.line}</span>
                    </div>
                  </div>

                  <div className="p-4 text-xs font-mono leading-relaxed overflow-x-auto">
                    <UltraModernCodeViewer 
                      code={activeConfig.code} 
                      language="java" 
                      activeLine={currentStepData.line} 
                    />
                  </div>
                </div>

                {/* Step Action Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-slate-900 border border-cyan-500/30 shadow-inner space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>{currentStepData.label}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {currentStepData.desc}
                  </p>
                </div>
              </div>

              {/* Right Column: Execution Dispatcher, Variables & Terminal (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Visual Catch Dispatch Matrix */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      Catch Evaluation Pipeline
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Sequential Order</span>
                  </div>

                  {/* Catch Block 1 Status */}
                  <div className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    currentStepData.evaluatingCatch === 1
                      ? 'bg-cyan-950/60 border-cyan-500/80 ring-1 ring-cyan-500/40'
                      : currentStepData.mismatchCatch === 1
                      ? 'bg-rose-950/30 border-rose-800/60 text-slate-400'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                  }`}>
                    <div>
                      <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                        <span className="text-slate-500">1.</span>
                        <span>catch (InputMismatchException ime)</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Handles non-integer string input</span>
                    </div>

                    <div>
                      {currentStepData.evaluatingCatch === 1 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500 text-slate-950 animate-pulse">
                          EVALUATING / MATCH
                        </span>
                      )}
                      {currentStepData.mismatchCatch === 1 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                          NO MATCH ⏭️
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Catch Block 2 Status */}
                  <div className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    currentStepData.evaluatingCatch === 2
                      ? 'bg-cyan-950/60 border-cyan-500/80 ring-1 ring-cyan-500/40'
                      : currentStepData.skippedCatch === 2 || currentStepData.skippedCatch === 'all'
                      ? 'bg-slate-950/40 border-slate-800/40 opacity-50'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                  }`}>
                    <div>
                      <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                        <span className="text-slate-500">2.</span>
                        <span>catch (ArithmeticException ae)</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Handles division by zero</span>
                    </div>

                    <div>
                      {currentStepData.evaluatingCatch === 2 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500 text-slate-950 animate-pulse">
                          EVALUATING / MATCH
                        </span>
                      )}
                      {(currentStepData.skippedCatch === 2 || currentStepData.skippedCatch === 'all') && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 text-slate-500 border border-slate-800">
                          SKIPPED
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* State Inspector Box */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    Stack & Variable State
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">no1 (Integer):</span>
                      <span className="text-white font-bold">{String(currentStepData.state.no1 ?? '--')}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">no2 (Integer):</span>
                      <span className="text-white font-bold">{String(currentStepData.state.no2 ?? '--')}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">res (Result):</span>
                      <span className="text-emerald-400 font-bold">{String(currentStepData.state.res ?? '--')}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">Handled By:</span>
                      <span className="text-cyan-300 font-bold truncate block">{String(currentStepData.state.caughtBy ?? 'None')}</span>
                    </div>
                  </div>
                </div>

                {/* Terminal Console Output */}
                <div className="rounded-2xl border border-slate-800 overflow-hidden bg-[#050811] shadow-xl">
                  <div className="px-3.5 py-2 bg-[#090E1A] border-b border-slate-800 flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-mono font-bold text-slate-300">Live Console Output</span>
                  </div>
                  <pre className="p-3.5 text-[11px] sm:text-xs font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed min-h-[90px] max-h-[140px] overflow-y-auto">
                    {currentStepData.terminal}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Animation Explainer */}
        {activeTab === 'animation-explainer' && (
          <div className="mt-5 space-y-5 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
              <h3 className="text-sm font-bold text-cyan-200 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-cyan-400" />
                How the Animation Works (Step-by-Step Breakdown)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When an exception occurs inside a `try` block, the JVM consults the compiled bytecode Exception Table. The animation visually traces the 3 fundamental phases of multiple catch execution:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono">
                  1
                </div>
                <h4 className="text-xs font-extrabold text-white">Exception Generation</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  As soon as a risky statement fails (such as entering "abc" or dividing by zero), the current line immediately halts and a Throwable object is instantiated on the heap.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono">
                  2
                </div>
                <h4 className="text-xs font-extrabold text-white">Sequential Type Matching</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The JVM tests each catch parameter using `instanceof` from top to bottom. If Catch 1 fails to match, control transfers to Catch 2 without crashing.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono">
                  3
                </div>
                <h4 className="text-xs font-extrabold text-white">Single Execution & Skip</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Once a match is found, its handler code executes and all remaining catch blocks are skipped completely. The program proceeds normally!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Ordering Rules Matrix */}
        {activeTab === 'rules' && (
          <div className="mt-5 space-y-5 animate-in fade-in">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                The Golden Rule: Subclass (Specific) First, Superclass (General) Later
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>✅ Correct Ordering (Compiles Cleanly)</span>
                  </div>
                  <pre className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto">
{`try {
    int num = 10 / 0;
} 
catch (ArithmeticException ae) { 
    // 1. Child Class (Specific)
    System.out.println("Handled division error");
} 
catch (Exception e) { 
    // 2. Parent Class (General Fallback)
    System.out.println("Handled general error");
}`}
                  </pre>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-rose-300 font-bold">
                    <AlertOctagon className="w-4 h-4 text-rose-400" />
                    <span>❌ Incorrect Ordering (Causes Compile Error)</span>
                  </div>
                  <pre className="p-3 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto">
{`try {
    int num = 10 / 0;
} 
catch (Exception e) { 
    // 1. Parent Class catches EVERYTHING!
    System.out.println("Caught by parent");
} 
catch (ArithmeticException ae) { 
    // 2. 🛑 UNREACHABLE CODE -> COMPILE ERROR!
    // error: exception ArithmeticException has already been caught
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
