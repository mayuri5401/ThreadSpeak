import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle, ChevronRight, ChevronLeft, ArrowDown,
  FileText, Shield, AlertOctagon, CornerDownRight, CheckCircle, Info,
  Sliders, Activity, Eye, BookOpen, Lightbulb, Power
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaFinallyBlockVisualizer
 * High-Yield Interactive Theater & Animation for:
 * "finally Block in Java Exception Handling"
 */
export default function JavaFinallyBlockVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'animation-explainer' | 'rules'
  const [scenario, setScenario] = useState('normal'); // 'normal' | 'handled-exception' | 'unhandled-exception' | 'return-statement' | 'system-exit'

  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1400);

  // Scenario Data Configurations
  const getActiveScenarioConfig = () => {
    if (scenario === 'normal') {
      return {
        title: '🟢 Scenario 1: Normal Execution (No Exception: 10 / 2)',
        badge: 'Try -> Catch Skipped -> Finally Runs -> Rest of Code',
        badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
        code: `public class FinallyDemo1 {
    public static void main(String[] args) {
        try {
            System.out.println("Inside try block");
            int data = 10 / 2; // ✅ 10 / 2 = 5 (No exception)
            System.out.println("Result: " + data);
        } catch (ArithmeticException e) {
            // ⏭️ SKIPPED: No exception occurred
            System.out.println("Exception caught: " + e);
        } finally {
            // 🧹 ALWAYS EXECUTES: Guaranteed cleanup
            System.out.println("Finally block always executes");
        }
        System.out.println("Rest of the code...");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 4,
            label: '1. Enter try Block',
            desc: 'Program execution enters try block. Prints "Inside try block".',
            terminal: 'Inside try block',
            activeBlock: 'try',
            state: { data: null, exception: null, finallyStatus: 'Pending', status: 'IN_TRY' }
          },
          {
            stepNum: 1,
            line: 5,
            label: '2. Calculation Completed',
            desc: 'JVM executes `int data = 10 / 2;`. Operation succeeds cleanly. `data = 5`.',
            terminal: 'Inside try block\nResult: 5',
            activeBlock: 'try',
            state: { data: 5, exception: null, finallyStatus: 'Pending', status: 'TRY_SUCCESS' }
          },
          {
            stepNum: 2,
            line: 7,
            label: '3. ⏭️ catch Block Skipped',
            desc: 'Because no exception occurred, the JVM completely bypasses the catch block.',
            terminal: 'Inside try block\nResult: 5',
            activeBlock: 'catch-skipped',
            state: { data: 5, exception: null, finallyStatus: 'Ready to Run', status: 'CATCH_SKIPPED' }
          },
          {
            stepNum: 3,
            line: 11,
            label: '4. 🧹 finally Block Executes',
            desc: 'The JVM enters the finally block and runs the guaranteed cleanup code.',
            terminal: 'Inside try block\nResult: 5\nFinally block always executes',
            activeBlock: 'finally',
            state: { data: 5, exception: null, finallyStatus: 'Executed Successfully', status: 'FINALLY_EXECUTED' }
          },
          {
            stepNum: 4,
            line: 14,
            label: '5. ✅ Rest of the Program',
            desc: 'Execution exits the try-catch-finally structure and continues normally.',
            terminal: 'Inside try block\nResult: 5\nFinally block always executes\nRest of the code...',
            activeBlock: 'rest',
            state: { data: 5, exception: null, finallyStatus: 'Completed', status: 'NORMAL_TERMINATION' }
          }
        ]
      };
    }

    if (scenario === 'handled-exception') {
      return {
        title: '🟡 Scenario 2: Exception Occurs & Handled (10 / 0)',
        badge: 'Try Throws -> Catch Handles -> Finally Runs -> Rest of Code',
        badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
        code: `public class FinallyDemo2 {
    public static void main(String[] args) {
        try {
            System.out.println("Inside try block");
            int data = 10 / 0; // 💥 Division by zero -> Throws ArithmeticException!
            System.out.println("Result: " + data);
        } catch (ArithmeticException e) {
            // ✅ HANDLED: Catch block handles exception
            System.out.println("Exception caught: " + e);
        } finally {
            // 🧹 ALWAYS EXECUTES: Runs immediately after catch
            System.out.println("Finally block always executes");
        }
        System.out.println("Rest of the code...");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 4,
            label: '1. Enter try Block',
            desc: 'Program begins execution in main() and enters try block.',
            terminal: 'Inside try block',
            activeBlock: 'try',
            state: { data: null, exception: null, finallyStatus: 'Pending', status: 'IN_TRY' }
          },
          {
            stepNum: 1,
            line: 5,
            label: '2. 💥 ArithmeticException Thrown',
            desc: 'JVM encounters `10 / 0`. Integer division by zero throws ArithmeticException. Try block halts immediately.',
            terminal: 'Inside try block',
            activeBlock: 'try-exception',
            state: { data: null, exception: 'ArithmeticException: / by zero', finallyStatus: 'Pending', status: 'EXCEPTION_THROWN' }
          },
          {
            stepNum: 2,
            line: 8,
            label: '3. 🦺 catch Block Handles Error',
            desc: 'JVM catches the ArithmeticException and executes error handling logic.',
            terminal: 'Inside try block\nException caught: java.lang.ArithmeticException: / by zero',
            activeBlock: 'catch',
            state: { data: null, exception: 'ArithmeticException (Caught)', finallyStatus: 'Pending', status: 'CATCH_HANDLED' }
          },
          {
            stepNum: 3,
            line: 11,
            label: '4. 🧹 finally Block Executes',
            desc: 'As soon as the catch block finishes, JVM enters finally block.',
            terminal: 'Inside try block\nException caught: java.lang.ArithmeticException: / by zero\nFinally block always executes',
            activeBlock: 'finally',
            state: { data: null, exception: 'Handled', finallyStatus: 'Executed Successfully', status: 'FINALLY_EXECUTED' }
          },
          {
            stepNum: 4,
            line: 14,
            label: '5. ✅ Program Resumes Normally',
            desc: 'Because the exception was caught and finally ran, the program continues without crashing.',
            terminal: 'Inside try block\nException caught: java.lang.ArithmeticException: / by zero\nFinally block always executes\nRest of the code...',
            activeBlock: 'rest',
            state: { data: null, exception: 'Handled', finallyStatus: 'Completed', status: 'NORMAL_TERMINATION' }
          }
        ]
      };
    }

    if (scenario === 'unhandled-exception') {
      return {
        title: '🔴 Scenario 3: Exception Uncaught (Catch Mismatch)',
        badge: 'Try Throws -> Catch Mismatched -> Finally STILL Executes -> JVM Crash',
        badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
        code: `public class FinallyDemoUnhandled {
    public static void main(String[] args) {
        try {
            System.out.println("Inside try block");
            int data = 10 / 0; // 💥 Throws ArithmeticException
        } catch (NullPointerException e) {
            // ❌ MISMATCH: Catch block only handles NullPointerException!
            System.out.println("Caught NullPointerException");
        } finally {
            // 🧹 STILL GUARANTEED: Runs before JVM terminates abnormally!
            System.out.println("Finally block STILL executes before crash!");
        }
        System.out.println("This line will NEVER run.");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 4,
            label: '1. Enter try Block',
            desc: 'Enters try block and prints "Inside try block".',
            terminal: 'Inside try block',
            activeBlock: 'try',
            state: { data: null, exception: null, finallyStatus: 'Pending', status: 'IN_TRY' }
          },
          {
            stepNum: 1,
            line: 5,
            label: '2. 💥 ArithmeticException Thrown',
            desc: '`10 / 0` throws `ArithmeticException`. JVM checks catch block.',
            terminal: 'Inside try block',
            activeBlock: 'try-exception',
            state: { data: null, exception: 'ArithmeticException: / by zero', finallyStatus: 'Pending', status: 'EXCEPTION_THROWN' }
          },
          {
            stepNum: 2,
            line: 6,
            label: '3. ❌ Catch Block Mismatch',
            desc: 'Catch block only listens for `NullPointerException`. Mismatch! Exception remains unhandled.',
            terminal: 'Inside try block',
            activeBlock: 'catch-mismatch',
            state: { data: null, exception: 'ArithmeticException (Unhandled)', finallyStatus: 'Guaranteed Next', status: 'UNHANDLED_EXCEPTION' }
          },
          {
            stepNum: 3,
            line: 9,
            label: '4. 🧹 finally Block STILL Executes!',
            desc: 'Even though the program is about to crash, JVM executes finally block first to prevent resource leaks!',
            terminal: 'Inside try block\nFinally block STILL executes before crash!',
            activeBlock: 'finally',
            state: { data: null, exception: 'ArithmeticException', finallyStatus: 'Executed Before Crash', status: 'FINALLY_BEFORE_CRASH' }
          },
          {
            stepNum: 4,
            line: 12,
            label: '5. 💥 Abnormal Termination',
            desc: 'JVM prints stack trace and terminates. Post-finally statements are never reached.',
            terminal: 'Inside try block\nFinally block STILL executes before crash!\nException in thread "main" java.lang.ArithmeticException: / by zero\n\tat FinallyDemoUnhandled.main(FinallyDemoUnhandled.java:5)',
            activeBlock: 'crash',
            state: { data: null, exception: 'Fatal Uncaught', finallyStatus: 'Completed', status: 'ABNORMAL_CRASH' }
          }
        ]
      };
    }

    if (scenario === 'return-statement') {
      return {
        title: '↩️ Scenario 4: return Statement inside try',
        badge: 'Try returns -> JVM Pauses -> Finally Runs -> Return Completed',
        badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
        code: `public class FinallyDemo3 {
    public static void main(String[] args) {
        System.out.println(m1());
    }

    static String m1() {
        try {
            System.out.println("Inside try");
            // ↩️ return statement encountered:
            return "Returning from try";
        } catch (Exception e) {
            return "Returning from catch";
        } finally {
            // 🧹 finally executes BEFORE method returns!
            System.out.println("Finally block executed before return");
        }
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 3,
            label: '1. Invoke method m1()',
            desc: 'main() calls helper method `m1()`. Execution enters try block.',
            terminal: 'Inside try',
            activeBlock: 'try',
            state: { pendingReturn: null, finallyStatus: 'Pending', status: 'ENTER_METHOD' }
          },
          {
            stepNum: 1,
            line: 9,
            label: '2. ↩️ return Statement Evaluated',
            desc: 'Expression "Returning from try" is evaluated and stored in stack frame. Method return is paused!',
            terminal: 'Inside try',
            activeBlock: 'return-pause',
            state: { pendingReturn: '"Returning from try"', finallyStatus: 'Pending', status: 'RETURN_PAUSED' }
          },
          {
            stepNum: 2,
            line: 13,
            label: '3. 🧹 finally Block Intercepts & Executes',
            desc: 'Before the method can return, JVM executes the finally block.',
            terminal: 'Inside try\nFinally block executed before return',
            activeBlock: 'finally',
            state: { pendingReturn: '"Returning from try"', finallyStatus: 'Executed Before Return', status: 'FINALLY_EXECUTED' }
          },
          {
            stepNum: 3,
            line: 3,
            label: '4. ✅ Return Complete to Caller',
            desc: 'JVM pops original return value from register and returns to main().',
            terminal: 'Inside try\nFinally block executed before return\nReturning from try',
            activeBlock: 'return-done',
            state: { pendingReturn: null, finallyStatus: 'Completed', status: 'RETURNED_SUCCESS' }
          }
        ]
      };
    }

    // system-exit scenario
    return {
      title: '🛑 Scenario 5: System.exit(0) (The Rare Bypass)',
      badge: 'System.exit(0) kills JVM process -> finally is BYPASSED',
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
      code: `public class FinallySystemExitDemo {
    public static void main(String[] args) {
        try {
            System.out.println("Inside try block");
            // 🛑 Hard kill JVM Process:
            System.exit(0);
        } catch (Exception e) {
            System.out.println("Catch block");
        } finally {
            // ⚠️ NEVER REACHED: JVM process killed!
            System.out.println("Finally block will NEVER execute!");
        }
    }
}`,
      steps: [
        {
          stepNum: 0,
          line: 4,
          label: '1. Enter try Block',
          desc: 'Program begins execution in main() and enters try block.',
          terminal: 'Inside try block',
          activeBlock: 'try',
          state: { jvmStatus: 'Running', finallyStatus: 'Pending', status: 'IN_TRY' }
        },
        {
          stepNum: 1,
          line: 6,
          label: '2. 🛑 System.exit(0) Invoked',
          desc: 'Calling `System.exit(0)` instructs the OS to terminate the entire JVM process immediately.',
          terminal: 'Inside try block\n[Process terminated with exit code 0]',
          activeBlock: 'exit',
          state: { jvmStatus: 'Terminated by OS', finallyStatus: 'BYPASSED / NEVER REACHED', status: 'PROCESS_KILLED' }
        },
        {
          stepNum: 2,
          line: 10,
          label: '3. ⚠️ finally Block Bypassed',
          desc: 'Because the JVM process no longer exists in OS memory, finally block cannot execute.',
          terminal: 'Inside try block\n[Process terminated with exit code 0]',
          activeBlock: 'finally-bypassed',
          state: { jvmStatus: 'Dead', finallyStatus: 'BYPASSED', status: 'SHUTDOWN' }
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
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  finally Block Interactive Visualizer & Simulator
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  GUARANTEED CLEANUP
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Visualize guaranteed execution flow, return-statement interception, and System.exit() edge cases.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
            {[
              { id: 'simulator', label: 'Interactive Simulator', icon: Play },
              { id: 'animation-explainer', label: 'Animation Explainer', icon: BookOpen },
              { id: 'rules', label: 'System.exit & Return Rules', icon: ShieldCheck },
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
                  id: 'normal', 
                  title: '1. Normal Execution', 
                  desc: 'No exception -> finally executes', 
                  color: 'border-emerald-500/40 text-emerald-300' 
                },
                { 
                  id: 'handled-exception', 
                  title: '2. Exception Handled', 
                  desc: '10/0 -> catch runs -> finally executes', 
                  color: 'border-amber-500/40 text-amber-300' 
                },
                { 
                  id: 'unhandled-exception', 
                  title: '3. Unhandled Exception', 
                  desc: 'Catch mismatch -> finally STILL runs', 
                  color: 'border-rose-500/40 text-rose-300' 
                },
                { 
                  id: 'return-statement', 
                  title: '4. return in try', 
                  desc: 'finally runs BEFORE method returns', 
                  color: 'border-purple-500/40 text-purple-300' 
                },
                { 
                  id: 'system-exit', 
                  title: '5. System.exit(0)', 
                  desc: 'JVM killed -> finally is BYPASSED', 
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
                      <span className="text-xs font-mono font-bold text-slate-200">FinallyDemo.java</span>
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

              {/* Right Column: Guaranteed Pipeline, State & Terminal (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Visual Execution Pipeline Status */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      Execution Lifecycle Pipeline
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">JVM Handshake</span>
                  </div>

                  {/* try block status */}
                  <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                    currentStepData.activeBlock === 'try' || currentStepData.activeBlock === 'try-exception'
                      ? 'bg-cyan-950/60 border-cyan-500 text-white font-bold ring-1 ring-cyan-500/30'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}>
                    <span>1. try Block (Risky Operations)</span>
                    <span className="font-mono text-[10px]">
                      {currentStepData.activeBlock === 'try-exception' ? '💥 THREW EXCEPTION' : 'RUNNING'}
                    </span>
                  </div>

                  {/* catch block status */}
                  <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                    currentStepData.activeBlock === 'catch'
                      ? 'bg-amber-950/60 border-amber-500 text-white font-bold ring-1 ring-amber-500/30'
                      : currentStepData.activeBlock === 'catch-skipped'
                      ? 'bg-slate-950/40 border-slate-800/40 text-slate-500'
                      : currentStepData.activeBlock === 'catch-mismatch'
                      ? 'bg-rose-950/40 border-rose-800 text-rose-300 font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}>
                    <span>2. catch Block (Error Handling)</span>
                    <span className="font-mono text-[10px]">
                      {currentStepData.activeBlock === 'catch' ? '✅ HANDLED' : currentStepData.activeBlock === 'catch-mismatch' ? '❌ MISMATCH' : currentStepData.activeBlock === 'catch-skipped' ? '⏭️ SKIPPED' : 'STANDBY'}
                    </span>
                  </div>

                  {/* finally block status */}
                  <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                    currentStepData.activeBlock === 'finally'
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/40 animate-pulse shadow-md shadow-emerald-500/20'
                      : currentStepData.activeBlock === 'finally-bypassed'
                      ? 'bg-rose-950/50 border-rose-800 text-rose-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400'
                  }`}>
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      3. finally Block (Guaranteed Cleanup)
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">
                      {currentStepData.activeBlock === 'finally' ? '🧹 EXECUTING' : currentStepData.activeBlock === 'finally-bypassed' ? '🛑 BYPASSED' : 'GUARANTEED'}
                    </span>
                  </div>
                </div>

                {/* State Inspector Box */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    JVM Call Stack & Lifecycle State
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">Exception State:</span>
                      <span className="text-rose-300 font-bold truncate block">{String(currentStepData.state.exception ?? 'None')}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">finally Guarantee:</span>
                      <span className="text-emerald-400 font-bold truncate block">{String(currentStepData.state.finallyStatus ?? 'Pending')}</span>
                    </div>
                  </div>
                </div>

                {/* Terminal Console */}
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
                How the finally Block Animation Works in JVM
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The Java compiler generates an **"any" Exception Table handler** for every `try-finally` block. No matter which branch is taken, the JVM guarantees control will pass through `finally`:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono">
                  1
                </div>
                <h4 className="text-xs font-extrabold text-white">Normal Path (`try` completes)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When all statements inside `try` finish without an error, the JVM jumps to the `finally` block before exiting the method or proceeding to subsequent lines.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono">
                  2
                </div>
                <h4 className="text-xs font-extrabold text-white">Exception Path (`catch` handled or unhandled)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  If an exception occurs, whether it is caught by `catch` or completely unhandled, the JVM executes `finally` before unwinding the call stack or printing the crash log.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold font-mono">
                  3
                </div>
                <h4 className="text-xs font-extrabold text-white">Return Statement Path</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When a `return` statement is encountered inside `try` or `catch`, the return value is saved, execution transfers to `finally`, and only then does the method return!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: System.exit & Return Rules */}
        {activeTab === 'rules' && (
          <div className="mt-5 space-y-5 animate-in fade-in">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                The 4 Edge Cases Where finally Does NOT Run
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-1">
                  <span className="font-bold text-rose-300 flex items-center gap-1.5">
                    <Power className="w-3.5 h-3.5" />
                    1. System.exit(0) Invocation
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    Calling `System.exit(0)` kills the entire JVM process immediately. No remaining bytecode instructions can run.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-1">
                  <span className="font-bold text-rose-300 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    2. Fatal JVM Crash / Power Outage
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    Catastrophic OS memory crash or sudden power failure stops CPU execution before instructions reach `finally`.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-1">
                  <span className="font-bold text-rose-300 flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                    3. Infinite Loop in try
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    If code gets stuck in `while(true)` or a thread deadlock inside `try`, control never exits the `try` block.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-1">
                  <span className="font-bold text-rose-300 flex items-center gap-1.5">
                    <Ban className="w-3.5 h-3.5" />
                    4. OS Kill Signal (kill -9)
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    External operating system process termination via Task Manager or `SIGKILL`.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
