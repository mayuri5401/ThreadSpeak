import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle, ChevronRight, ChevronLeft, ArrowDown,
  FileText, Shield, AlertOctagon, CornerDownRight, CheckCircle, Info,
  Sliders, Activity, Eye, Layers2, BookOpen, Lightbulb
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaTryCatchVisualizer
 * High-Yield Interactive Theater & Animation for:
 * "try-catch Block in Java"
 */
export default function JavaTryCatchVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'printing-methods' | 'animation-explainer' | 'rules'

  // Tab 1: Simulator States
  const [scenario, setScenario] = useState('with-catch-zero'); // 'without-catch-zero' | 'with-catch-success' | 'with-catch-zero' | 'custom'
  const [customNo1, setCustomNo1] = useState(100);
  const [customNo2, setCustomNo2] = useState(0);
  const [customUseTryCatch, setCustomUseTryCatch] = useState(true);

  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1400);

  // Tab 2: Printing Methods States
  const [selectedPrintMethod, setSelectedPrintMethod] = useState('getMessage'); // 'getMessage' | 'toString' | 'printStackTrace'

  // Build Scenario Data based on current mode
  const getActiveScenarioConfig = () => {
    if (scenario === 'without-catch-zero') {
      return {
        title: '❌ Program Without try-catch (Abnormal Termination)',
        badge: 'Uncaught Exception Crash',
        badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
        no1: 100,
        no2: 0,
        useTryCatch: false,
        steps: [
          {
            stepNum: 0,
            line: 4,
            label: '1. App Started',
            desc: 'Program execution begins in main(). System prints "----- App Started -----".',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0',
            state: { no1: 100, no2: 0, res: null, exceptionThrown: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 11,
            label: '2. Risky Operation: Division by Zero',
            desc: 'JVM executes `int res = no1 / no2;` (100 / 0). Integer division by zero is mathematically impossible!',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0',
            state: { no1: 100, no2: 0, res: null, exceptionThrown: 'ArithmeticException: / by zero', status: 'EXCEPTION_THROWN' }
          },
          {
            stepNum: 2,
            line: 11,
            label: '3. 💥 JVM Crash: Abnormal Termination',
            desc: 'Because there is NO try-catch block to handle the exception, JVM terminates the program immediately. The final line is NEVER executed!',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0\nException in thread "main" java.lang.ArithmeticException: / by zero\n\tat MainApp1.main(MainApp1.java:17)',
            state: { no1: 100, no2: 0, res: null, exceptionThrown: 'ArithmeticException (Uncaught)', status: 'ABNORMAL_CRASH' }
          }
        ],
        code: `import java.util.Scanner;

public class MainApp1 {
    public static void main(String[] args) {
        System.out.println("----- App Started -----");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter no 1");
        int no1 = sc.nextInt();
        System.out.println("Enter no 2");
        int no2 = sc.nextInt();

        // ❌ Risky Line without try-catch:
        int res = no1 / no2; // Throws ArithmeticException if no2 == 0
        System.out.println("Result : " + res);

        // ⚠️ NEVER REACHED if no2 == 0!
        System.out.println("----- App Finished Successfully -----");
    }
}`
      };
    }

    if (scenario === 'with-catch-success') {
      return {
        title: '✅ Program With try-catch (Normal Execution: no2 = 4)',
        badge: 'Normal Flow (Catch Skipped)',
        badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
        no1: 100,
        no2: 4,
        useTryCatch: true,
        steps: [
          {
            stepNum: 0,
            line: 4,
            label: '1. App Started',
            desc: 'Program execution begins in main(). System prints "----- App Started -----".',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n4',
            state: { no1: 100, no2: 4, res: null, exceptionThrown: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 12,
            label: '2. Enters try Block',
            desc: 'Control enters the `try` block. JVM performs valid division `100 / 4 = 25`.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n4',
            state: { no1: 100, no2: 4, res: 25, exceptionThrown: null, status: 'INSIDE_TRY' }
          },
          {
            stepNum: 2,
            line: 13,
            label: '3. Result Printed in try',
            desc: 'Prints `Result : 25`. Since NO exception occurred, the `catch` block is completely SKIPPED.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n4\nResult : 25',
            state: { no1: 100, no2: 4, res: 25, exceptionThrown: null, status: 'CATCH_SKIPPED' }
          },
          {
            stepNum: 3,
            line: 18,
            label: '4. App Finished Successfully',
            desc: 'Executes normal statement following the catch block. Program completes with Exit Code 0.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n4\nResult : 25\n----- App Finished Successfully -----',
            state: { no1: 100, no2: 4, res: 25, exceptionThrown: null, status: 'SUCCESS_COMPLETION' }
          }
        ],
        code: `import java.util.Scanner;

public class MainApp1 {
    public static void main(String[] args) {
        System.out.println("----- App Started -----");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter no 1");
        int no1 = sc.nextInt();
        System.out.println("Enter no 2");
        int no2 = sc.nextInt();

        try {
            int res = no1 / no2;
            System.out.println("Result : " + res);
        } catch(ArithmeticException ae) {
            System.out.println("Exception Occured : " + ae);
        }

        System.out.println("----- App Finished Successfully -----");
    }
}`
      };
    }

    if (scenario === 'with-catch-zero') {
      return {
        title: '🛡️ Program With try-catch (Exception Handled: no2 = 0)',
        badge: 'Graceful Exception Recovery',
        badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
        no1: 100,
        no2: 0,
        useTryCatch: true,
        steps: [
          {
            stepNum: 0,
            line: 4,
            label: '1. App Started',
            desc: 'Program execution begins in main(). User inputs no1 = 100 and no2 = 0.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0',
            state: { no1: 100, no2: 0, res: null, exceptionThrown: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 12,
            label: '2. Enters try & Encounters / by zero',
            desc: 'JVM executes `int res = 100 / 0`. ArithmeticException is thrown on this line! Remaining line inside try (printing res) is SKIPPED.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0',
            state: { no1: 100, no2: 0, res: null, exceptionThrown: 'java.lang.ArithmeticException: / by zero', status: 'INSIDE_TRY_EXCEPTION' }
          },
          {
            stepNum: 2,
            line: 14,
            label: '3. 🦺 Immediate Jump to catch Block',
            desc: 'JVM intercepts the exception, assigns the object to `ae`, and executes the catch block handler.',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0\nException Occured : java.lang.ArithmeticException: / by zero',
            state: { no1: 100, no2: 0, res: null, exceptionThrown: 'Caught in ae', status: 'HANDLED_IN_CATCH' }
          },
          {
            stepNum: 3,
            line: 18,
            label: '4. ✅ App Finished Successfully (Normal Flow Resumes)',
            desc: 'Because the exception was handled, execution smoothly continues after the catch block!',
            terminal: '----- App Started -----\nEnter no 1\n100\nEnter no 2\n0\nException Occured : java.lang.ArithmeticException: / by zero\n----- App Finished Successfully -----',
            state: { no1: 100, no2: 0, res: null, exceptionThrown: 'Handled', status: 'SUCCESS_COMPLETION' }
          }
        ],
        code: `import java.util.Scanner;

public class MainApp1 {
    public static void main(String[] args) {
        System.out.println("----- App Started -----");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter no 1");
        int no1 = sc.nextInt();
        System.out.println("Enter no 2");
        int no2 = sc.nextInt();

        try {
            int res = no1 / no2; // ⚡ Throws ArithmeticException
            System.out.println("Result : " + res); // ⏭️ Skipped!
        } catch(ArithmeticException ae) {
            System.out.println("Exception Occured : " + ae);
        }

        System.out.println("----- App Finished Successfully -----");
    }
}`
      };
    }

    // Custom Scenario
    const isDivByZero = customNo2 === 0;
    if (!customUseTryCatch) {
      return {
        title: `🎮 Custom Run: ${customNo1} / ${customNo2} (Without try-catch)`,
        badge: isDivByZero ? 'Uncaught Crash' : 'Normal Flow',
        badgeColor: isDivByZero ? 'border-rose-500/40 text-rose-300 bg-rose-950/60' : 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
        no1: customNo1,
        no2: customNo2,
        useTryCatch: false,
        steps: isDivByZero ? [
          {
            stepNum: 0,
            line: 4,
            label: '1. App Started',
            desc: `User entered no1 = ${customNo1}, no2 = ${customNo2}.`,
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}`,
            state: { no1: customNo1, no2: customNo2, res: null, exceptionThrown: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 11,
            label: '2. Attempting Division by Zero',
            desc: `Executing ${customNo1} / 0 throws ArithmeticException!`,
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}`,
            state: { no1: customNo1, no2: customNo2, res: null, exceptionThrown: 'ArithmeticException: / by zero', status: 'EXCEPTION_THROWN' }
          },
          {
            stepNum: 2,
            line: 11,
            label: '3. 💥 Crash (No Catch Handler)',
            desc: 'Program terminated abruptly. Final line not printed.',
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}\nException in thread "main" java.lang.ArithmeticException: / by zero\n\tat MainApp1.main(MainApp1.java:17)`,
            state: { no1: customNo1, no2: customNo2, res: null, exceptionThrown: 'ArithmeticException', status: 'ABNORMAL_CRASH' }
          }
        ] : [
          {
            stepNum: 0,
            line: 4,
            label: '1. App Started',
            desc: `User entered no1 = ${customNo1}, no2 = ${customNo2}.`,
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}`,
            state: { no1: customNo1, no2: customNo2, res: null, exceptionThrown: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 11,
            label: '2. Division Executed',
            desc: `Calculates ${customNo1} / ${customNo2} = ${Math.floor(customNo1 / customNo2)}.`,
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}\nResult : ${Math.floor(customNo1 / customNo2)}`,
            state: { no1: customNo1, no2: customNo2, res: Math.floor(customNo1 / customNo2), exceptionThrown: null, status: 'SUCCESS' }
          },
          {
            stepNum: 2,
            line: 14,
            label: '3. App Finished',
            desc: 'Normal flow completed successfully.',
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}\nResult : ${Math.floor(customNo1 / customNo2)}\n----- App Finished Successfully -----`,
            state: { no1: customNo1, no2: customNo2, res: Math.floor(customNo1 / customNo2), exceptionThrown: null, status: 'SUCCESS_COMPLETION' }
          }
        ],
        code: `import java.util.Scanner;

public class MainApp1 {
    public static void main(String[] args) {
        System.out.println("----- App Started -----");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter no 1");
        int no1 = sc.nextInt();
        System.out.println("Enter no 2");
        int no2 = sc.nextInt();

        int res = no1 / no2;
        System.out.println("Result : " + res);

        System.out.println("----- App Finished Successfully -----");
    }
}`
      };
    } else {
      return {
        title: `🎮 Custom Run: ${customNo1} / ${customNo2} (With try-catch)`,
        badge: isDivByZero ? 'Recovered via Catch' : 'Normal Execution',
        badgeColor: isDivByZero ? 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60' : 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
        no1: customNo1,
        no2: customNo2,
        useTryCatch: true,
        steps: isDivByZero ? [
          {
            stepNum: 0,
            line: 4,
            label: '1. App Started',
            desc: `User entered no1 = ${customNo1}, no2 = ${customNo2}.`,
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}`,
            state: { no1: customNo1, no2: customNo2, res: null, exceptionThrown: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 12,
            label: '2. / by zero in try',
            desc: `Executing ${customNo1} / 0 throws ArithmeticException!`,
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}`,
            state: { no1: customNo1, no2: customNo2, res: null, exceptionThrown: 'ArithmeticException: / by zero', status: 'INSIDE_TRY_EXCEPTION' }
          },
          {
            stepNum: 2,
            line: 14,
            label: '3. Caught by catch(ArithmeticException ae)',
            desc: 'Exception intercepted! Printed message gracefully.',
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}\nException Occured : java.lang.ArithmeticException: / by zero`,
            state: { no1: customNo1, no2: customNo2, res: null, exceptionThrown: 'Caught in ae', status: 'HANDLED_IN_CATCH' }
          },
          {
            stepNum: 3,
            line: 18,
            label: '4. App Finished Successfully',
            desc: 'Normal program flow continues after catch block.',
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}\nException Occured : java.lang.ArithmeticException: / by zero\n----- App Finished Successfully -----`,
            state: { no1: customNo1, no2: customNo2, res: null, exceptionThrown: 'Handled', status: 'SUCCESS_COMPLETION' }
          }
        ] : [
          {
            stepNum: 0,
            line: 4,
            label: '1. App Started',
            desc: `User entered no1 = ${customNo1}, no2 = ${customNo2}.`,
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}`,
            state: { no1: customNo1, no2: customNo2, res: null, exceptionThrown: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 12,
            label: '2. Enters try & Computes',
            desc: `Computes ${customNo1} / ${customNo2} = ${Math.floor(customNo1 / customNo2)}.`,
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}`,
            state: { no1: customNo1, no2: customNo2, res: Math.floor(customNo1 / customNo2), exceptionThrown: null, status: 'INSIDE_TRY' }
          },
          {
            stepNum: 2,
            line: 13,
            label: '3. Result Printed (Catch Skipped)',
            desc: `Prints Result : ${Math.floor(customNo1 / customNo2)}.`,
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}\nResult : ${Math.floor(customNo1 / customNo2)}`,
            state: { no1: customNo1, no2: customNo2, res: Math.floor(customNo1 / customNo2), exceptionThrown: null, status: 'CATCH_SKIPPED' }
          },
          {
            stepNum: 3,
            line: 18,
            label: '4. App Finished Successfully',
            desc: 'Normal program flow completes.',
            terminal: `----- App Started -----\nEnter no 1\n${customNo1}\nEnter no 2\n${customNo2}\nResult : ${Math.floor(customNo1 / customNo2)}\n----- App Finished Successfully -----`,
            state: { no1: customNo1, no2: customNo2, res: Math.floor(customNo1 / customNo2), exceptionThrown: null, status: 'SUCCESS_COMPLETION' }
          }
        ],
        code: `import java.util.Scanner;

public class MainApp1 {
    public static void main(String[] args) {
        System.out.println("----- App Started -----");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter no 1");
        int no1 = sc.nextInt();
        System.out.println("Enter no 2");
        int no2 = sc.nextInt();

        try {
            int res = no1 / no2;
            System.out.println("Result : " + res);
        } catch(ArithmeticException ae) {
            System.out.println("Exception Occured : " + ae);
        }

        System.out.println("----- App Finished Successfully -----");
    }
}`
      };
    }
  };

  const currentConfig = getActiveScenarioConfig();
  const currentStepData = currentConfig.steps[Math.min(simStep, currentConfig.steps.length - 1)];

  // Auto-play stepper
  useEffect(() => {
    let timer;
    if (isPlaying) {
      const maxSteps = currentConfig.steps.length - 1;
      timer = setTimeout(() => {
        if (simStep < maxSteps) {
          setSimStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, playbackSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, simStep, currentConfig.steps.length, playbackSpeed]);

  const handleScenarioChange = (newScen) => {
    setScenario(newScen);
    setSimStep(0);
    setIsPlaying(false);
  };

  // 3 Ways to print Exception Object Details
  const printingMethodsData = {
    getMessage: {
      name: '1. getMessage()',
      syntax: 'catch (Exception e) {\n    System.out.println(e.getMessage());\n}',
      output: '/ by zero',
      desc: 'Prints only the specific exception reason/description without the class name or stack hierarchy.',
      bestFor: 'User-facing error notifications, concise alert popups, UI status banners.',
      badge: 'Concise & Clean',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      heapData: {
        className: 'java.lang.ArithmeticException',
        detailMessage: '/ by zero (Only this is returned)',
        stackTraceCount: '15 stack frames',
        suppressed: '[]'
      }
    },
    toString: {
      name: '2. toString()',
      syntax: 'catch (Exception e) {\n    System.out.println(e.toString());\n    // or System.out.println(e);\n}',
      output: 'java.lang.ArithmeticException: / by zero',
      desc: 'Prints both the Fully Qualified Exception Class Name AND the description message.',
      bestFor: 'Structured loggers, application log files, summary error diagnostics.',
      badge: 'Class Name + Message',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      heapData: {
        className: 'java.lang.ArithmeticException (Returned in output)',
        detailMessage: '/ by zero (Returned in output)',
        stackTraceCount: '15 stack frames',
        suppressed: '[]'
      }
    },
    printStackTrace: {
      name: '3. printStackTrace()',
      syntax: 'catch (Exception e) {\n    e.printStackTrace();\n}',
      output: 'java.lang.ArithmeticException: / by zero\n\tat MainApp1.main(MainApp1.java:17)',
      desc: 'Prints the entire method call chain with class names, method names, and exact source code line numbers where the failure occurred.',
      bestFor: 'Developer debugging, staging environments, root-cause investigation.',
      badge: 'Full Diagnostic Trace',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      heapData: {
        className: 'java.lang.ArithmeticException',
        detailMessage: '/ by zero',
        stackTraceCount: 'MainApp1.main() -> Line 17 (Printed in full)',
        suppressed: '[]'
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Hero Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Exception Handling Architecture</span>
              <span>•</span>
              <span className="text-slate-400">Interactive Visualizer</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              🛡️ try-catch Block in Java
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Understand how <span className="text-amber-300 font-mono font-bold">try</span> encapsulates risky code and <span className="text-cyan-300 font-mono font-bold">catch</span> handles exceptions gracefully to prevent abnormal program crashes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenPlayground && (
              <button
                onClick={() => onOpenPlayground(currentConfig.code, 'java')}
                className="px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-cyan-950/40"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Open in Playground</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
          {[
            { id: 'simulator', label: '🎬 Interactive Flow Simulator', icon: Play },
            { id: 'printing-methods', label: '🔍 3 Ways to Print Exception', icon: Terminal },
            { id: 'animation-explainer', label: '📊 Animation Breakdown & Flowchart', icon: Activity },
            { id: 'rules', label: '📌 Rules & Mental Model', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  isActive 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: INTERACTIVE FLOW SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {/* Scenario Selector & Custom Controls */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-slate-900/70 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-cyan-400" />
                Select Simulation Scenario:
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border font-bold ${currentConfig.badgeColor}`}>
                {currentConfig.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleScenarioChange('without-catch-zero')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-1 ${
                  scenario === 'without-catch-zero'
                    ? 'bg-rose-950/50 border-rose-500/60 text-white shadow-lg shadow-rose-950/40'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">1. Without try-catch</span>
                  <Ban className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <p className="text-[11px] text-slate-400">no2 = 0 &rarr; Uncaught ArithmeticException crash!</p>
              </button>

              <button
                onClick={() => handleScenarioChange('with-catch-success')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-1 ${
                  scenario === 'with-catch-success'
                    ? 'bg-emerald-950/50 border-emerald-500/60 text-white shadow-lg shadow-emerald-950/40'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">2. With try-catch (Normal)</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400">no1 = 100, no2 = 4 &rarr; Result: 25, catch skipped</p>
              </button>

              <button
                onClick={() => handleScenarioChange('with-catch-zero')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-1 ${
                  scenario === 'with-catch-zero'
                    ? 'bg-cyan-950/50 border-cyan-500/60 text-white shadow-lg shadow-cyan-950/40'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">3. With try-catch (Zero)</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <p className="text-[11px] text-slate-400">no1 = 100, no2 = 0 &rarr; Jump to catch, graceful end</p>
              </button>

              <button
                onClick={() => handleScenarioChange('custom')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-1 ${
                  scenario === 'custom'
                    ? 'bg-purple-950/50 border-purple-500/60 text-white shadow-lg shadow-purple-950/40'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">4. 🎮 Custom Playground</span>
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <p className="text-[11px] text-slate-400">Set custom numbers and toggle try-catch shield</p>
              </button>
            </div>

            {/* Custom inputs toolbar */}
            {scenario === 'custom' && (
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-purple-300 font-bold">no1 (Numerator):</span>
                  <input
                    type="number"
                    value={customNo1}
                    onChange={(e) => {
                      setCustomNo1(parseInt(e.target.value) || 0);
                      setSimStep(0);
                      setIsPlaying(false);
                    }}
                    className="w-20 px-2 py-1 rounded-lg bg-slate-900 border border-purple-700/60 text-white font-mono text-center font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-purple-300 font-bold">no2 (Denominator):</span>
                  <input
                    type="number"
                    value={customNo2}
                    onChange={(e) => {
                      setCustomNo2(parseInt(e.target.value) || 0);
                      setSimStep(0);
                      setIsPlaying(false);
                    }}
                    className="w-20 px-2 py-1 rounded-lg bg-slate-900 border border-purple-700/60 text-white font-mono text-center font-bold focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={customUseTryCatch}
                      onChange={(e) => {
                        setCustomUseTryCatch(e.target.checked);
                        setSimStep(0);
                        setIsPlaying(false);
                      }}
                      className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                    />
                    <span className="font-bold text-white">Enable try-catch Shield</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step Controls Bar */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    isPlaying 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30' 
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setSimStep(Math.max(0, simStep - 1));
                  }}
                  disabled={simStep === 0}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold transition flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setSimStep(Math.min(currentConfig.steps.length - 1, simStep + 1));
                  }}
                  disabled={simStep >= currentConfig.steps.length - 1}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold transition flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setSimStep(0);
                  }}
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition"
                  title="Reset Simulation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">Step:</span>
                <span className="font-bold text-cyan-300">{simStep + 1} / {currentConfig.steps.length}</span>
                <div className="flex gap-1 ml-2">
                  {currentConfig.steps.map((s, idx) => (
                    <div 
                      key={idx}
                      className={`w-5 h-1.5 rounded-full transition-all ${
                        idx === simStep 
                          ? 'bg-cyan-400 w-8' 
                          : idx < simStep 
                            ? 'bg-cyan-800' 
                            : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dual Column: Source Code with Line Highlighting VS Live Flow & Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: Code & Active Line (5 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="glass-panel p-4 rounded-2xl border border-slate-800 bg-[#070D18] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold">
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    <span>MainApp1.java</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    Active Step: Line {currentStepData.line}
                  </span>
                </div>

                {/* Code Viewer with Glowing Active Line */}
                <div className="relative font-mono text-xs overflow-x-auto rounded-xl bg-black/50 p-3 border border-slate-800/80 space-y-1">
                  {currentConfig.code.split('\n').map((lineText, idx) => {
                    const lineNum = idx + 1;
                    const isCurrentLine = currentStepData.line === lineNum;
                    const isTryHeader = lineText.includes('try {');
                    const isCatchHeader = lineText.includes('catch(');
                    const isRiskyLine = lineText.includes('no1 / no2');

                    let lineBg = '';
                    if (isCurrentLine) {
                      lineBg = 'bg-cyan-500/20 border-l-4 border-cyan-400 text-cyan-100 font-bold px-2 py-0.5 rounded-r shadow-inner';
                    } else if (isTryHeader || isCatchHeader) {
                      lineBg = 'bg-indigo-950/20 text-indigo-200';
                    }

                    return (
                      <div key={idx} className={`flex items-center gap-3 transition-colors ${lineBg}`}>
                        <span className={`w-6 text-right select-none text-[11px] ${isCurrentLine ? 'text-cyan-300 font-bold' : 'text-slate-600'}`}>
                          {lineNum}
                        </span>
                        <pre className="flex-1 overflow-x-visible">
                          <code className={
                            isRiskyLine && currentStepData.state.exceptionThrown
                              ? 'text-rose-400 font-bold'
                              : isCatchHeader
                                ? 'text-amber-300 font-semibold'
                                : isTryHeader
                                  ? 'text-cyan-300 font-semibold'
                                  : 'text-slate-300'
                          }>
                            {lineText}
                          </code>
                        </pre>
                        {isCurrentLine && (
                          <span className="text-[10px] font-sans font-bold px-1.5 py-0.2 rounded bg-cyan-400 text-slate-950 animate-pulse">
                            EXEC
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Step Explanation Callout */}
                <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                  currentStepData.state.status === 'ABNORMAL_CRASH'
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    : currentStepData.state.status === 'HANDLED_IN_CATCH'
                      ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300'
                }`}>
                  <div className="flex items-center gap-2 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentStepData.label}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">
                    {currentStepData.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Col: Animated Visual Pipeline & Live Terminal (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              {/* Dynamic Execution Flow Visualizer */}
              <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 bg-[#0B1222] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-200">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>JVM Control Flow Pipeline</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Live Control Pointer
                  </span>
                </div>

                {/* Visual Pipeline Nodes */}
                <div className="space-y-3">
                  {/* Node 1: Start */}
                  <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    simStep === 0 
                      ? 'bg-cyan-950/60 border-cyan-400 shadow-lg shadow-cyan-950/50 text-white scale-[1.02]' 
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-cyan-400">
                        1
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">main() Thread Started</div>
                        <div className="text-[11px] text-slate-400">Reads no1 = {currentConfig.no1}, no2 = {currentConfig.no2}</div>
                      </div>
                    </div>
                    {simStep === 0 && <span className="text-[10px] bg-cyan-400 text-slate-950 font-bold px-2 py-0.5 rounded-full animate-pulse">ACTIVE</span>}
                  </div>

                  <div className="flex justify-center text-slate-600">
                    <ArrowDown className="w-4 h-4" />
                  </div>

                  {/* Node 2: Try / Risky Division Block */}
                  <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    simStep === 1 
                      ? currentStepData.state.exceptionThrown
                        ? 'bg-rose-950/60 border-rose-400 shadow-lg shadow-rose-950/50 text-white scale-[1.02]'
                        : 'bg-emerald-950/60 border-emerald-400 shadow-lg shadow-emerald-950/50 text-white scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-amber-400">
                        2
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          <span>{currentConfig.useTryCatch ? 'try { int res = no1 / no2; }' : 'int res = no1 / no2;'}</span>
                          {currentConfig.useTryCatch && <span className="text-[9px] bg-amber-950 border border-amber-700 text-amber-300 px-1.5 py-0.2 rounded font-mono">RISKY ZONE</span>}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {currentConfig.no2 === 0 ? '⚠️ Division by Zero triggers ArithmeticException' : `Evaluates: ${currentConfig.no1} / ${currentConfig.no2} = ${Math.floor(currentConfig.no1 / currentConfig.no2)}`}
                        </div>
                      </div>
                    </div>
                    {simStep === 1 && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        currentStepData.state.exceptionThrown ? 'bg-rose-500 text-white animate-bounce' : 'bg-emerald-400 text-slate-950'
                      }`}>
                        {currentStepData.state.exceptionThrown ? 'THROWN 💥' : 'COMPUTED ✅'}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-center text-slate-600">
                    <ArrowDown className="w-4 h-4" />
                  </div>

                  {/* Node 3: Catch Block OR Crash */}
                  {currentConfig.useTryCatch ? (
                    <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      simStep === 2
                        ? currentConfig.no2 === 0 
                          ? 'bg-cyan-950/60 border-cyan-400 shadow-lg shadow-cyan-950/50 text-white scale-[1.02]'
                          : 'bg-slate-900/80 border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-cyan-400">
                          3
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-200">
                            catch(ArithmeticException ae)
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {currentConfig.no2 === 0 
                              ? '🛡️ Intercepted! Prints: Exception Occured : java.lang.ArithmeticException: / by zero'
                              : '⏭️ No exception in try &rarr; catch block is completely SKIPPED!'}
                          </div>
                        </div>
                      </div>
                      {simStep === 2 && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          currentConfig.no2 === 0 ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {currentConfig.no2 === 0 ? 'INTERCEPTED 🦺' : 'SKIPPED ⏭️'}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      simStep === 2
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200 scale-[1.02] shadow-lg shadow-rose-950/60'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-rose-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                          💥
                        </div>
                        <div>
                          <div className="text-xs font-bold text-rose-200">Default Exception Handler (JVM)</div>
                          <div className="text-[11px] text-rose-300/80">
                            {currentConfig.no2 === 0 ? 'Fatal Crash: Prints StackTrace & Aborts JVM immediately!' : 'Normal flow finishes smoothly'}
                          </div>
                        </div>
                      </div>
                      {simStep === 2 && currentConfig.no2 === 0 && (
                        <span className="text-[10px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse">
                          CRASHED
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex justify-center text-slate-600">
                    <ArrowDown className="w-4 h-4" />
                  </div>

                  {/* Node 4: Program Finish */}
                  <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    (currentConfig.useTryCatch && simStep === 3) || (!currentConfig.useTryCatch && currentConfig.no2 !== 0 && simStep === 2)
                      ? 'bg-emerald-950/60 border-emerald-400 shadow-lg shadow-emerald-950/50 text-white scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                        4
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">
                          {currentConfig.useTryCatch || currentConfig.no2 !== 0 ? '----- App Finished Successfully -----' : '❌ Line NEVER Reached (Program Dead)'}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {currentConfig.useTryCatch || currentConfig.no2 !== 0 
                            ? 'Normal statement executed after catch block. Exit Code: 0' 
                            : 'Abnormal termination terminated process before reaching here!'}
                        </div>
                      </div>
                    </div>
                    {((currentConfig.useTryCatch && simStep === 3) || (!currentConfig.useTryCatch && currentConfig.no2 !== 0 && simStep === 2)) && (
                      <span className="text-[10px] bg-emerald-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                        COMPLETED 🚀
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Real-time Interactive Console Terminal */}
              <div className="glass-panel p-4 rounded-2xl border border-slate-800 bg-black/90 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>System Output Console</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    STDOUT / STDERR
                  </span>
                </div>

                <div className="font-mono text-xs text-slate-200 min-h-[90px] p-3 rounded-xl bg-[#030712] border border-slate-800/80 whitespace-pre-wrap leading-relaxed">
                  {currentStepData.terminal}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 3 WAYS TO PRINT EXCEPTION OBJECT */}
      {activeTab === 'printing-methods' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-[#0B1222]/90 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Exception Object Reference Anatomy</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                🔍 Different Ways to Print the Exception Object
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                The reference variable in the catch block (<code className="text-cyan-300 bg-cyan-950/80 px-1 py-0.2 rounded font-mono">ae</code> or <code className="text-cyan-300 bg-cyan-950/80 px-1 py-0.2 rounded font-mono">e</code>) points to an Exception Object created on the Heap containing rich diagnostic data.
              </p>
            </div>

            {/* Method Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {Object.keys(printingMethodsData).map((key) => {
                const item = printingMethodsData[key];
                const isSelected = selectedPrintMethod === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPrintMethod(key)}
                    className={`p-4 rounded-xl border text-left transition space-y-2 ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950/50 scale-[1.02]'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">{item.name}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-2">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deep Dive Card for Selected Printing Method */}
          {(() => {
            const cur = printingMethodsData[selectedPrintMethod];
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Code & Output (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-[#070D18] space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        Catch Block Syntax &amp; Usage
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${cur.badgeColor}`}>
                        {cur.name}
                      </span>
                    </div>

                    <div className="font-mono text-xs rounded-xl bg-black/60 p-4 border border-slate-800 text-slate-200">
                      <pre><code>{cur.syntax}</code></pre>
                    </div>

                    {/* Output Preview */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        Console Output:
                      </span>
                      <div className="font-mono text-xs text-amber-300 p-3 rounded-xl bg-black/80 border border-slate-800 whitespace-pre-wrap">
                        {cur.output}
                      </div>
                    </div>

                    {/* Recommendation Card */}
                    <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-blue-300">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span>Best Practice Recommendation:</span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        {cur.bestFor}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Exception Object Heap Inspector (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="glass-panel p-5 rounded-2xl border border-slate-800 bg-[#0B1222] space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
                        <Database className="w-4 h-4 text-purple-400" />
                        JVM Heap: Exception Object Fields
                      </span>
                      <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
                        Heap Address: @0x4a7e
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] block">1. Class Type:</span>
                        <span className="text-cyan-300 font-bold">{cur.heapData.className}</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] block">2. detailMessage (String):</span>
                        <span className="text-amber-300 font-bold">{cur.heapData.detailMessage}</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                        <span className="text-slate-400 text-[10px] block">3. StackTraceElements[]:</span>
                        <span className="text-emerald-300 font-bold">{cur.heapData.stackTraceCount}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                      <span className="font-bold text-white block">💡 Golden Rule:</span>
                      <p>
                        Use <code className="text-amber-300 font-mono">printStackTrace()</code> during local development &amp; debugging. In user-facing production interfaces, display friendly messages with <code className="text-cyan-300 font-mono">getMessage()</code> so internal server paths are not leaked to end users.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 3: ANIMATION BREAKDOWN & FLOWCHART */}
      {activeTab === 'animation-explainer' && (
        <div className="space-y-6">
          {/* Detailed Step-by-Step Animation Guide */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-[#0B1222]/90 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Runtime Lifecycle</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                📊 Step-by-Step Animation &amp; Flow Control Explanation
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Here is the exact algorithmic path executed by the Java Virtual Machine when running code protected by a try-catch block:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs font-mono">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-600 flex items-center justify-center text-[10px]">1</span>
                  <span>Entering the Risky try Zone</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The thread enters the <code className="text-cyan-300 font-mono">try</code> block and executes statements sequentially. In our example, <code className="text-slate-200 font-mono">no1 = 100</code> and <code className="text-slate-200 font-mono">no2 = 0</code> are passed into the division operation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs font-mono">
                  <span className="w-5 h-5 rounded-full bg-rose-950 border border-rose-600 flex items-center justify-center text-[10px]">2</span>
                  <span>Exception Object Creation &amp; Line Skipping</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When <code className="text-rose-300 font-mono">100 / 0</code> is attempted, the JVM halts normal linear execution and instantiates an <code className="text-rose-300 font-mono">ArithmeticException</code> object on the Heap. The remaining statements inside the try block are <strong>immediately skipped</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs font-mono">
                  <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-600 flex items-center justify-center text-[10px]">3</span>
                  <span>Type Matching &amp; Catch Interception</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The JVM searches for an enclosing <code className="text-amber-300 font-mono">catch</code> block with a compatible parameter type. It matches <code className="text-amber-300 font-mono">catch(ArithmeticException ae)</code>, binds the exception object to <code className="text-amber-300 font-mono">ae</code>, and executes the handling logic.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs font-mono">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-600 flex items-center justify-center text-[10px]">4</span>
                  <span>Normal Program Flow Resumption</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Once the catch block finishes, execution cleanly transitions to the statements following the catch block (<code className="text-emerald-300 font-mono">----- App Finished Successfully -----</code>). The application avoids abnormal crash and finishes with Exit Code 0.
                </p>
              </div>
            </div>

            {/* Invariant Comparison Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wide">
                Runtime Execution Comparison Table:
              </span>
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 px-3">Condition</th>
                    <th className="py-2 px-3">Inside try Block</th>
                    <th className="py-2 px-3">catch Block Action</th>
                    <th className="py-2 px-3">Code After catch</th>
                    <th className="py-2 px-3">Final Program Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-emerald-300">no2 = 4 (Normal)</td>
                    <td className="py-2.5 px-3">Executes all lines fully</td>
                    <td className="py-2.5 px-3 text-slate-400">SKIPPED completely</td>
                    <td className="py-2.5 px-3 text-emerald-300">Executes normally</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-400">✅ Finished Successfully</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-cyan-300">no2 = 0 (With try-catch)</td>
                    <td className="py-2.5 px-3 text-amber-300">Halts at / by zero, skips rest</td>
                    <td className="py-2.5 px-3 font-bold text-cyan-300">EXECUTED (Handles error)</td>
                    <td className="py-2.5 px-3 text-emerald-300">Executes normally</td>
                    <td className="py-2.5 px-3 font-bold text-cyan-400">🛡️ Handled &amp; Finished</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-rose-300">no2 = 0 (Without try-catch)</td>
                    <td className="py-2.5 px-3 text-rose-400">Crashes at / by zero</td>
                    <td className="py-2.5 px-3 text-slate-500">None (Not present)</td>
                    <td className="py-2.5 px-3 text-rose-400 font-bold">NEVER REACHED</td>
                    <td className="py-2.5 px-3 font-bold text-rose-500">💥 Abnormal Crash (Exit Code 1)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RULES & MENTAL MODEL */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Syntax Rules */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-[#0B1222]/90 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider pb-2 border-b border-slate-800">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Points to Remember &amp; Syntax Rules</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>1. try cannot exist alone</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Every <code className="text-cyan-300 font-mono">try</code> block must be accompanied by at least one <code className="text-cyan-300 font-mono">catch</code> block or a <code className="text-cyan-300 font-mono">finally</code> block.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-purple-300">
                    <Layers className="w-3.5 h-3.5" />
                    <span>2. Valid Syntax Combinations</span>
                  </div>
                  <ul className="text-slate-300 text-[11px] space-y-1 font-mono">
                    <li className="text-emerald-300">✅ try &#123; &#125; catch(Exception e) &#123; &#125;</li>
                    <li className="text-emerald-300">✅ try &#123; &#125; finally &#123; &#125;</li>
                    <li className="text-emerald-300">✅ try &#123; &#125; catch(Exception e) &#123; &#125; finally &#123; &#125;</li>
                    <li className="text-rose-400">❌ try &#123; &#125; (Compile Error!)</li>
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                    <CornerDownRight className="w-3.5 h-3.5" />
                    <span>3. Control Never Returns to try</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Once an exception occurs inside a try block, control jumps to catch. Java does NOT resume the remaining lines of the try block.
                  </p>
                </div>
              </div>
            </div>

            {/* Real World Analogy & Mental Model */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-[#0B1222]/90 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider pb-2 border-b border-slate-800">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>The Trapeze Artist &amp; Safety Net Analogy</span>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2">
                  <span className="font-bold text-white text-sm block">🎪 Circus Performance Analogy:</span>
                  <p className="leading-relaxed">
                    Think of the code inside <code className="text-amber-300 font-mono font-bold">try</code> as a high-wire acrobat performing a risky stunt.
                  </p>
                  <p className="leading-relaxed">
                    If the acrobat performs smoothly (no exception), they land gracefully on the platform and bow to the audience (<code className="text-emerald-300 font-mono font-bold">catch is skipped</code>).
                  </p>
                  <p className="leading-relaxed">
                    If the acrobat slips mid-air (an exception is thrown), the <code className="text-cyan-300 font-mono font-bold">catch</code> block acts as the safety net below, safely catching them so they can walk away uninjured (<code className="text-cyan-300 font-mono font-bold">program continues normally</code>) rather than crashing to the floor (<code className="text-rose-400 font-mono font-bold">abnormal crash</code>).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Key Takeaway for Interviews:
                  </span>
                  <p className="text-[11px] text-slate-400">
                    The primary purpose of exception handling is not to eliminate errors, but to convert abrupt, unexpected program terminations into graceful, manageable fallback executions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
