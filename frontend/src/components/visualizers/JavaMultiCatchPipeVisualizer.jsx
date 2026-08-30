import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle, ChevronRight, ChevronLeft, ArrowDown,
  FileText, Shield, AlertOctagon, CornerDownRight, CheckCircle, Info,
  Sliders, Activity, Eye, BookOpen, Lightbulb, GitMerge, Lock
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaMultiCatchPipeVisualizer
 * High-Yield Interactive Theater & Animation for:
 * "Multi-Catch Block in Java 7 (Pipe | Operator)"
 */
export default function JavaMultiCatchPipeVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'animation-explainer' | 'rules'
  const [scenario, setScenario] = useState('input-mismatch'); // 'input-mismatch' | 'divide-by-zero' | 'normal' | 'disjoint-error' | 'final-error'

  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1400);

  // Scenario Data Configurations
  const getActiveScenarioConfig = () => {
    if (scenario === 'input-mismatch') {
      return {
        title: '🟡 Scenario 1: Input Mismatch Error ("abc" Entered)',
        badge: 'Triggers Branch 1: InputMismatchException',
        badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
        code: `import java.util.Scanner;
import java.util.InputMismatchException;

public class MainApp {
    public static void main(String[] args) {
        System.out.println("----- App Started -----");
        Scanner sc = new Scanner(System.in);
        try {
            System.out.println("Enter no 1");
            int no1 = sc.nextInt(); // 💥 "abc" entered -> Throws InputMismatchException!

            System.out.println("Enter no 2");
            int no2 = sc.nextInt();

            int res = no1 / no2;
            System.out.println("Result : " + res);
        } catch (InputMismatchException | ArithmeticException ex) {
            // ✅ MATCHES Branch 1: InputMismatchException
            System.out.println("Exception Occurred : " + ex);
        }
        System.out.println("----- App Finished Successfully -----");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 6,
            label: '1. App Initialization',
            desc: 'Program starts in main(). Prints "----- App Started -----".',
            terminal: '----- App Started -----\nEnter no 1\nabc',
            activeBranch: null,
            state: { no1: 'abc (Invalid)', no2: null, res: null, caughtBy: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 10,
            label: '2. 💥 InputMismatchException Thrown',
            desc: 'Scanner attempts `sc.nextInt()` on non-numeric input "abc". JVM throws `java.util.InputMismatchException`.',
            terminal: '----- App Started -----\nEnter no 1\nabc',
            activeBranch: null,
            state: { no1: 'abc', no2: null, res: null, caughtBy: null, status: 'EXCEPTION_THROWN' }
          },
          {
            stepNum: 2,
            line: 17,
            label: '3. 🎯 Multi-Catch Pipe Evaluates Branch 1',
            desc: 'JVM tests `InputMismatchException` in `catch (InputMismatchException | ArithmeticException ex)` -> MATCH on Branch 1!',
            terminal: '----- App Started -----\nEnter no 1\nabc\nException Occurred : java.util.InputMismatchException',
            activeBranch: 'branch1',
            state: { no1: 'abc', no2: null, res: null, caughtBy: 'Branch 1 (InputMismatchException)', status: 'HANDLED_BRANCH_1' }
          },
          {
            stepNum: 3,
            line: 21,
            label: '4. ✅ Normal Termination',
            desc: 'Program resumes after multi-catch block and finishes cleanly.',
            terminal: '----- App Started -----\nEnter no 1\nabc\nException Occurred : java.util.InputMismatchException\n----- App Finished Successfully -----',
            activeBranch: null,
            state: { no1: 'abc', no2: null, res: null, caughtBy: 'Multi-Catch', status: 'COMPLETED_SUCCESS' }
          }
        ]
      };
    }

    if (scenario === 'divide-by-zero') {
      return {
        title: '🔴 Scenario 2: Division by Zero Error (100 / 0)',
        badge: 'Triggers Branch 2: ArithmeticException',
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

            int res = no1 / no2; // 💥 Throws ArithmeticException: / by zero
            System.out.println("Result : " + res);
        } catch (InputMismatchException | ArithmeticException ex) {
            // ✅ MATCHES Branch 2: ArithmeticException
            System.out.println("Exception Occurred : " + ex);
        }
        System.out.println("----- App Finished Successfully -----");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 6,
            label: '1. Inputs Received',
            desc: 'User enters `no1 = 100` and `no2 = 0`.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0',
            activeBranch: null,
            state: { no1: 100, no2: 0, res: null, caughtBy: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 14,
            label: '2. 💥 ArithmeticException Thrown',
            desc: 'JVM executes `100 / 0`. Integer division by zero throws `ArithmeticException`.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0',
            activeBranch: null,
            state: { no1: 100, no2: 0, res: null, caughtBy: null, status: 'EXCEPTION_THROWN' }
          },
          {
            stepNum: 2,
            line: 17,
            label: '3. 🎯 Multi-Catch Pipe Evaluates Branch 2',
            desc: 'JVM tests `ArithmeticException` against the multi-catch signature -> MATCH on Branch 2! Handler executes.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0\nException Occurred : java.lang.ArithmeticException: / by zero',
            activeBranch: 'branch2',
            state: { no1: 100, no2: 0, res: null, caughtBy: 'Branch 2 (ArithmeticException)', status: 'HANDLED_BRANCH_2' }
          },
          {
            stepNum: 3,
            line: 21,
            label: '4. ✅ Normal Termination',
            desc: 'Application continues uninterrupted.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0\nException Occurred : java.lang.ArithmeticException: / by zero\n----- App Finished Successfully -----',
            activeBranch: null,
            state: { no1: 100, no2: 0, res: null, caughtBy: 'Multi-Catch', status: 'COMPLETED_SUCCESS' }
          }
        ]
      };
    }

    if (scenario === 'normal') {
      return {
        title: '🟢 Scenario 3: Valid Input (100 / 5 = 20)',
        badge: 'No Exception -> Multi-Catch Block Skipped',
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
            int no2 = sc.nextInt(); // 5

            int res = no1 / no2; // 20
            System.out.println("Result : " + res);
        } catch (InputMismatchException | ArithmeticException ex) {
            // ⏭️ SKIPPED (No exception)
            System.out.println("Exception Occurred : " + ex);
        }
        System.out.println("----- App Finished Successfully -----");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 6,
            label: '1. App Started',
            desc: 'User inputs valid numbers: 100 and 5.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n5',
            activeBranch: null,
            state: { no1: 100, no2: 5, res: null, caughtBy: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 14,
            label: '2. Calculation Success',
            desc: 'Calculation `100 / 5` produces `25`. Result printed successfully.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n5\nResult : 20',
            activeBranch: null,
            state: { no1: 100, no2: 5, res: 20, caughtBy: 'None (Skipped)', status: 'SUCCESS' }
          },
          {
            stepNum: 2,
            line: 17,
            label: '3. ⏭️ Multi-Catch Bypassed',
            desc: 'Because no error occurred in try, the multi-catch block is bypassed completely.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n5\nResult : 20',
            activeBranch: 'skipped',
            state: { no1: 100, no2: 5, res: 20, caughtBy: 'None', status: 'SKIPPED' }
          },
          {
            stepNum: 3,
            line: 21,
            label: '4. ✅ Finished Successfully',
            desc: 'Program terminates normally.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n5\nResult : 20\n----- App Finished Successfully -----',
            activeBranch: null,
            state: { no1: 100, no2: 5, res: 20, caughtBy: 'None', status: 'COMPLETED_SUCCESS' }
          }
        ]
      };
    }

    if (scenario === 'disjoint-error') {
      return {
        title: '🚨 Scenario 4: Disjoint Rule Violation (Compile Error)',
        badge: 'Exception | IOException (Parent and Child cannot be in same multi-catch)',
        badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
        code: `import java.io.IOException;

public class DisjointRuleDemo {
    public static void main(String[] args) {
        try {
            // Risky IO operation
        } 
        // ❌ COMPILE-TIME ERROR:
        // IOException is already a subclass of Exception!
        catch (Exception | IOException ex) {
            System.out.println(ex);
        }
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 4,
            label: '1. javac Compiler Inspection',
            desc: 'Java Compiler (javac) parses multi-catch types: `Exception` and `IOException`.',
            terminal: 'javac DisjointRuleDemo.java\nAnalyzing multi-catch alternatives...',
            activeBranch: null,
            state: { status: 'COMPILING' }
          },
          {
            stepNum: 1,
            line: 9,
            label: '2. 🛑 Subclass Inheritance Detected',
            desc: 'Compiler detects that `IOException` is a child of `Exception`. Combining them is redundant and invalid in Java 7!',
            terminal: 'DisjointRuleDemo.java:9: error: Types in multi-catch must be disjoint: IOException is a subclass of Exception\n        catch (Exception | IOException ex) {\n                         ^\n1 error',
            activeBranch: 'error',
            state: { status: 'COMPILE_ERROR_DISJOINT' }
          }
        ]
      };
    }

    // final-error scenario
    return {
      title: '🔒 Scenario 5: Implicitly Final Variable Reassignment (Compile Error)',
      badge: 'ex is implicitly final -> cannot reassign ex = new ...',
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
      code: `import java.io.IOException;
import java.sql.SQLException;

public class FinalVariableDemo {
    public static void main(String[] args) {
        try {
            // ...
        } catch (IOException | SQLException ex) {
            // ❌ COMPILE-TIME ERROR:
            // 'ex' in multi-catch is implicitly final!
            ex = new IOException("New Error"); 
        }
    }
}`,
      steps: [
        {
          stepNum: 0,
          line: 7,
          label: '1. javac Multi-Catch Scope Analysis',
          desc: 'Compiler registers parameter `ex` as an implicitly `final` union reference.',
          terminal: 'javac FinalVariableDemo.java',
          activeBranch: null,
          state: { status: 'COMPILING' }
        },
        {
          stepNum: 1,
          line: 10,
          label: '2. 🛑 Reassignment Attempt Detected',
          desc: 'Line 10 attempts `ex = new IOException()`. Because `ex` is final, reassignment is strictly prohibited!',
          terminal: 'FinalVariableDemo.java:10: error: cannot assign a value to final variable ex\n            ex = new IOException("New Error");\n            ^\n1 error',
          activeBranch: 'error',
          state: { status: 'COMPILE_ERROR_FINAL' }
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
              <GitMerge className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  Multi-Catch Block (Java 7+ Pipe | Operator) Visualizer
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  JAVA 7 COIN
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Interactive animation of the pipe (|) multi-catch operator, disjoint rule verification, and implicitly final mechanics.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
            {[
              { id: 'simulator', label: 'Interactive Simulator', icon: Play },
              { id: 'animation-explainer', label: 'Pipe Animation Explainer', icon: BookOpen },
              { id: 'rules', label: 'Disjoint & Final Rules', icon: ShieldCheck },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {[
                { 
                  id: 'input-mismatch', 
                  title: '1. Input Mismatch', 
                  desc: 'Input "abc" -> Matches Branch 1 (InputMismatchException)', 
                  color: 'border-amber-500/40 text-amber-300' 
                },
                { 
                  id: 'divide-by-zero', 
                  title: '2. Divide by Zero (100/0)', 
                  desc: '100/0 -> Matches Branch 2 (ArithmeticException)', 
                  color: 'border-cyan-500/40 text-cyan-300' 
                },
                { 
                  id: 'normal', 
                  title: '3. Valid Input (100/5)', 
                  desc: 'Result = 20 -> Multi-catch block skipped', 
                  color: 'border-emerald-500/40 text-emerald-300' 
                },
                { 
                  id: 'disjoint-error', 
                  title: '4. Disjoint Rule Error', 
                  desc: 'Exception | IOException -> Compile Error', 
                  color: 'border-rose-500/40 text-rose-300' 
                },
                { 
                  id: 'final-error', 
                  title: '5. Implicitly Final Error', 
                  desc: 'ex = new ... -> Compile Error (cannot reassign)', 
                  color: 'border-rose-500/40 text-rose-300' 
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

            {/* Active Scenario Title & Player Controls */}
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
              {/* Left Column: Code View (7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="rounded-2xl border border-slate-800 overflow-hidden bg-[#070C18] shadow-xl">
                  <div className="px-4 py-2.5 bg-[#0A101E] border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono font-bold text-slate-200">MainApp.java (Java 7 Multi-Catch)</span>
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

              {/* Right Column: Visual Pipe Dispatcher & Terminal (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Visual Pipe Dispatch Card */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <GitMerge className="w-3.5 h-3.5 text-cyan-400" />
                      Pipe (|) Multi-Catch Architecture
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Java 7 Union</span>
                  </div>

                  {/* Branch 1 Indicator */}
                  <div className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    currentStepData.activeBranch === 'branch1'
                      ? 'bg-amber-950/70 border-amber-500/90 ring-2 ring-amber-500/40 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}>
                    <div>
                      <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                        <span className="text-slate-500">Branch 1:</span>
                        <span>InputMismatchException</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Non-numeric string inputs</span>
                    </div>

                    {currentStepData.activeBranch === 'branch1' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 animate-pulse">
                        MATCHED ✅
                      </span>
                    )}
                  </div>

                  {/* Visual Pipe Divider */}
                  <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-cyan-400 py-0.5">
                    <span className="h-[1px] bg-slate-800 flex-1" />
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800">PIPE: | (OR)</span>
                    <span className="h-[1px] bg-slate-800 flex-1" />
                  </div>

                  {/* Branch 2 Indicator */}
                  <div className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    currentStepData.activeBranch === 'branch2'
                      ? 'bg-cyan-950/70 border-cyan-500/90 ring-2 ring-cyan-500/40 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}>
                    <div>
                      <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                        <span className="text-slate-500">Branch 2:</span>
                        <span>ArithmeticException</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Division by zero math error</span>
                    </div>

                    {currentStepData.activeBranch === 'branch2' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500 text-slate-950 animate-pulse">
                        MATCHED ✅
                      </span>
                    )}
                  </div>

                  {/* Unified Handler */}
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                    <div className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3 text-amber-400" />
                      <span>Variable: <b className="text-white">ex</b> (Implicitly final)</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 block font-sans">
                      Single unified handler executes with zero code duplication!
                    </span>
                  </div>
                </div>

                {/* Live Console Output */}
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

        {/* Tab 2: Pipe Animation Explainer */}
        {activeTab === 'animation-explainer' && (
          <div className="mt-5 space-y-5 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
              <h3 className="text-sm font-bold text-cyan-200 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-cyan-400" />
                How the Java 7 Multi-Catch Pipe Works in Bytecode
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When compiling `catch (InputMismatchException | ArithmeticException ex)`, the Java compiler generates multiple rows in the bytecode Exception Table pointing to the **exact same handler bytecode offset**:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono">
                  1
                </div>
                <h4 className="text-xs font-extrabold text-white">Bytecode Mapping</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The bytecode table maps both `InputMismatchException` and `ArithmeticException` to a single jump target, reducing compiled class file size.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold font-mono">
                  2
                </div>
                <h4 className="text-xs font-extrabold text-white">Unified Type (LUB)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Inside the handler, variable `ex` has the compile-time type of their common ancestor (Least Upper Bound, e.g. `RuntimeException` or `Exception`).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono">
                  3
                </div>
                <h4 className="text-xs font-extrabold text-white">Zero Duplication</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Logging, telemetry, and error recovery logic are written only once, complying with the DRY (Don't Repeat Yourself) principle.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Disjoint & Final Rules */}
        {activeTab === 'rules' && (
          <div className="mt-5 space-y-5 animate-in fade-in">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                The Two Golden Rules of Java 7 Multi-Catch
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Disjoint Rule */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Rule 1: The Disjoint Rule (No Subclassing)</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Types in a multi-catch cannot have an inheritance relationship (no parent-child).
                  </p>
                  <pre className="p-2.5 rounded-xl bg-[#080D1A] text-slate-200 font-mono text-[11px] overflow-x-auto">
{`// ✅ VALID (Siblings):
catch (IOException | SQLException ex) { }

// ❌ INVALID (Parent & Child):
// error: Types in multi-catch must be disjoint
catch (Exception | IOException ex) { }`}
                  </pre>
                </div>

                {/* Implicitly Final Rule */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Rule 2: Variable is Implicitly Final</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    The catch variable `ex` cannot be reassigned inside the multi-catch block.
                  </p>
                  <pre className="p-2.5 rounded-xl bg-[#080D1A] text-slate-200 font-mono text-[11px] overflow-x-auto">
{`catch (IOException | SQLException ex) {
    // ❌ COMPILE ERROR:
    // cannot assign a value to final variable ex
    ex = new IOException(); 
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
