import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle, ChevronRight, ChevronLeft, ArrowDown,
  FileText, Shield, AlertOctagon, CornerDownRight, CheckCircle, Info,
  Sliders, Activity, Eye, BookOpen, Lightbulb, Lock, Unlock,
  Send, UserCheck, AlertCircle, ArrowUpCircle, Radio
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaThrowKeywordVisualizer
 * High-Yield Interactive Theater & Animation for:
 * ""throw" Keyword in Java Exception Handling"
 */
export default function JavaThrowKeywordVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'animation-explainer' | 'rules'
  const [scenario, setScenario] = useState('division-demo'); // 'division-demo' | 'explicit-throw' | 'throw-var' | 'stack-propagation' | 'custom-ex'

  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1400);

  // Scenario Data Configurations
  const getActiveScenarioConfig = () => {
    if (scenario === 'division-demo') {
      return {
        title: '🟡 Scenario 1: ThrowDemo with User Input (100 / 0 Handled)',
        badge: 'm1() takes inputs 100 & 0 -> Catches ArithmeticException inside m1()',
        badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
        code: `import java.util.Scanner;

public class ThrowDemo {
    void m1() {
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter no1");
        int no1 = sc.nextInt(); // 100

        System.out.println("Enter no2");
        int no2 = sc.nextInt(); // 0

        try {
            int res = no1 / no2; // 💥 JVM throws ArithmeticException: / by zero
            System.out.println("Result : " + res);
        } catch (Exception e) {
            // ✅ Catches and prints the exception message
            System.out.println("Exception caught: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        ThrowDemo td = new ThrowDemo();
        td.m1();
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 23,
            label: '1. 🚀 main() Entry & Instantiation',
            desc: 'Program starts in main(). `ThrowDemo td = new ThrowDemo();` creates instance, then calls `td.m1()`.',
            terminal: '',
            activeBlock: 'MAIN_CALL',
            stack: ['main()', 'ThrowDemo.m1()'],
            state: { no1: null, no2: null, res: null, exception: null, status: 'M1_CALLED' }
          },
          {
            stepNum: 1,
            line: 7,
            label: '2. 📥 User Input no1 = 100',
            desc: 'Scanner prompts for no1. User enters 100.',
            terminal: 'Enter no1\n100',
            activeBlock: 'INPUT_1',
            stack: ['main()', 'ThrowDemo.m1()'],
            state: { no1: 100, no2: null, res: null, exception: null, status: 'NO1_READ' }
          },
          {
            stepNum: 2,
            line: 10,
            label: '3. 📥 User Input no2 = 0',
            desc: 'Scanner prompts for no2. User enters 0.',
            terminal: 'Enter no1\n100\nEnter no2\n0',
            activeBlock: 'INPUT_2',
            stack: ['main()', 'ThrowDemo.m1()'],
            state: { no1: 100, no2: 0, res: null, exception: null, status: 'NO2_READ' }
          },
          {
            stepNum: 3,
            line: 14,
            label: '4. 💥 Division by Zero Exception Thrown',
            desc: 'JVM executes `no1 / no2` (100 / 0). Divisor is zero! Java creates and throws an `ArithmeticException: / by zero`.',
            terminal: 'Enter no1\n100\nEnter no2\n0',
            activeBlock: 'TRY_THROW',
            stack: ['main()', 'ThrowDemo.m1() [💥 EXCEPTION]'],
            state: { no1: 100, no2: 0, res: null, exception: 'ArithmeticException: / by zero', status: 'EXCEPTION_THROWN' }
          },
          {
            stepNum: 4,
            line: 16,
            label: '5. 🦺 catch (Exception e) Intercepts Error',
            desc: 'The catch block inside m1() catches the exception object and prints "Exception caught: / by zero".',
            terminal: 'Enter no1\n100\nEnter no2\n0\nException caught: / by zero',
            activeBlock: 'CATCH_HANDLED',
            stack: ['main()', 'ThrowDemo.m1() [🛡️ HANDLED]'],
            state: { no1: 100, no2: 0, res: null, exception: 'Handled via catch block', status: 'HANDLED' }
          },
          {
            stepNum: 5,
            line: 25,
            label: '6. ✅ Method Finishes Cleanly',
            desc: 'm1() returns control to main(). Program completes normally without crashing.',
            terminal: 'Enter no1\n100\nEnter no2\n0\nException caught: / by zero',
            activeBlock: 'COMPLETED',
            stack: ['main() [COMPLETED]'],
            state: { no1: 100, no2: 0, res: null, exception: null, status: 'CLEAN_EXIT' }
          }
        ]
      };
    }

    if (scenario === 'explicit-throw') {
      return {
        title: '🎯 Scenario 2: Explicit throw Statement (Direct Instant Creation)',
        badge: 'throw new ArithmeticException("You cannot divide by zero")',
        badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
        code: `public class ExplicitThrowDemo {
    static void checkDivisor(int b) {
        if (b == 0) {
            // 💥 Explicitly create and throw exception object in one line
            throw new ArithmeticException("You cannot divide by zero");
        }
        System.out.println("Valid divisor: " + b);
    }

    public static void main(String[] args) {
        try {
            System.out.println("Calling checkDivisor(0)...");
            checkDivisor(0);
        } catch (ArithmeticException e) {
            System.out.println("Caught explicit throw: " + e.getMessage());
        }
        System.out.println("Program continues safely.");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 11,
            label: '1. Program Start in main()',
            desc: 'Execution enters try block and invokes `checkDivisor(0)`.',
            terminal: 'Calling checkDivisor(0)...',
            activeBlock: 'START',
            stack: ['main()', 'checkDivisor(b=0)'],
            state: { b: 0, exception: null, status: 'CALLING_METHOD' }
          },
          {
            stepNum: 1,
            line: 3,
            label: '2. 🔍 Condition Check (b == 0)',
            desc: '`if (b == 0)` evaluates to `true`. Execution enters the failure branch.',
            terminal: 'Calling checkDivisor(0)...',
            activeBlock: 'IF_CHECK',
            stack: ['main()', 'checkDivisor(b=0)'],
            state: { b: 0, exception: null, status: 'CONDITION_MET' }
          },
          {
            stepNum: 2,
            line: 5,
            label: '3. 💥 Explicit throw Statement Executed',
            desc: '`throw new ArithmeticException("You cannot divide by zero");` instantiates an exception on the heap and halts method execution immediately.',
            terminal: 'Calling checkDivisor(0)...',
            activeBlock: 'THROW_EXEC',
            stack: ['main()', 'checkDivisor() [💥 THROW]'],
            state: { b: 0, exception: 'ArithmeticException("You cannot divide by zero")', status: 'OBJECT_THROWN' }
          },
          {
            stepNum: 3,
            line: 13,
            label: '4. 🦺 Caller catch Block Catches Error',
            desc: 'JVM pops `checkDivisor` stack frame and finds matching `catch (ArithmeticException e)` in main().',
            terminal: 'Calling checkDivisor(0)...\nCaught explicit throw: You cannot divide by zero',
            activeBlock: 'CATCH_EXEC',
            stack: ['main() [🛡️ CATCH HANDLER]'],
            state: { b: 0, exception: 'Caught & handled', status: 'HANDLED' }
          },
          {
            stepNum: 4,
            line: 16,
            label: '5. ✅ Normal Resumption',
            desc: 'Program prints "Program continues safely." and completes execution.',
            terminal: 'Calling checkDivisor(0)...\nCaught explicit throw: You cannot divide by zero\nProgram continues safely.',
            activeBlock: 'DONE',
            stack: ['main() [DONE]'],
            state: { b: 0, exception: null, status: 'DONE' }
          }
        ]
      };
    }

    if (scenario === 'throw-var') {
      return {
        title: '📦 Scenario 3: Creating Variable First, Then Throwing',
        badge: 'ArithmeticException ae = new ...; throw ae;',
        badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
        code: `public class ThrowVariableDemo {
    public static void validateScore(int score) {
        if (score < 0 || score > 100) {
            // Step 1: Instantiate exception object and store in reference variable
            ArithmeticException ae = new ArithmeticException("Invalid score: " + score);
            
            // Step 2: Explicitly throw the referenced object
            throw ae;
        }
        System.out.println("Valid score: " + score);
    }

    public static void main(String[] args) {
        try {
            validateScore(150);
        } catch (ArithmeticException e) {
            System.out.println("Handled: " + e.getMessage());
        }
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 13,
            label: '1. Invoking validateScore(150)',
            desc: 'main() calls `validateScore(150)` with an out-of-range value.',
            terminal: '',
            activeBlock: 'START',
            stack: ['main()', 'validateScore(score=150)'],
            state: { score: 150, ae: null, status: 'ENTERED' }
          },
          {
            stepNum: 1,
            line: 5,
            label: '2. 📦 Step 1: Allocate Exception in Heap',
            desc: '`ArithmeticException ae = new ArithmeticException("Invalid score: 150");` allocates the object on the JVM Heap and stores reference in `ae`.',
            terminal: '',
            activeBlock: 'ALLOCATE',
            stack: ['main()', 'validateScore() [ae allocated]'],
            state: { score: 150, ae: 'Object Ref (0x7F2A)', status: 'OBJECT_CREATED' }
          },
          {
            stepNum: 2,
            line: 8,
            label: '3. 💥 Step 2: throw ae Executed',
            desc: 'The `throw ae;` statement transfers the referenced exception to the JVM runtime.',
            terminal: '',
            activeBlock: 'THROW_VAR',
            stack: ['main()', 'validateScore() [💥 throw ae]'],
            state: { score: 150, ae: 'Object Ref (0x7F2A)', status: 'THROWN' }
          },
          {
            stepNum: 3,
            line: 15,
            label: '4. 🦺 catch Block Catches ae',
            desc: 'The catch block in main() receives the exact same exception object instance and prints its message.',
            terminal: 'Handled: Invalid score: 150',
            activeBlock: 'CATCH',
            stack: ['main() [CATCH HANDLER]'],
            state: { score: 150, ae: 'Handled', status: 'DONE' }
          }
        ]
      };
    }

    if (scenario === 'stack-propagation') {
      return {
        title: '🛑 Scenario 4: Propagation without try-catch in m1() (JVM Crash)',
        badge: 'm1() Unhandled -> main() Unhandled -> JVM Abrupt Crash',
        badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
        code: `public class UnhandledPropagationDemo {
    void m1() {
        int no1 = 100;
        int no2 = 0;
        
        // 💥 No try-catch block inside m1()!
        int res = no1 / no2; // Throws ArithmeticException
        System.out.println("Result: " + res); // Unreachable
    }

    public static void main(String[] args) {
        UnhandledPropagationDemo td = new UnhandledPropagationDemo();
        // 💥 main() ALSO does not use try-catch!
        td.m1();
        System.out.println("This line will NEVER execute.");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 14,
            label: '1. main() Calls m1()',
            desc: 'main() pushes `m1()` onto the call stack.',
            terminal: '',
            activeBlock: 'START',
            stack: ['main()', 'UnhandledPropagationDemo.m1()'],
            state: { no1: 100, no2: 0, res: null, status: 'IN_M1' }
          },
          {
            stepNum: 1,
            line: 7,
            label: '2. 💥 Exception Thrown in m1()',
            desc: '`no1 / no2` throws `ArithmeticException`. Since no try-catch exists in m1(), the JVM unrolls m1() frame and passes error to caller `main()`.',
            terminal: '',
            activeBlock: 'UNHANDLED_M1',
            stack: ['main() [Receives Error from m1()]'],
            state: { no1: 100, no2: 0, res: null, status: 'UNHANDLED_IN_M1' }
          },
          {
            stepNum: 2,
            line: 14,
            label: '3. ⚠️ main() Also Has No Catch Block',
            desc: 'main() does not catch the exception either. JVM unrolls the entire call stack to the top-level thread.',
            terminal: '',
            activeBlock: 'UNHANDLED_MAIN',
            stack: ['[Call Stack Empty - Handed to JVM]'],
            state: { no1: 100, no2: 0, res: null, status: 'PROPAGATED_TO_JVM' }
          },
          {
            stepNum: 3,
            line: 14,
            label: '4. ☠️ JVM Prints Stack Trace & Terminates',
            desc: 'Default UncaughtExceptionHandler prints stack trace to standard error and abnormally kills the process.',
            terminal: 'Exception in thread "main" java.lang.ArithmeticException: / by zero\n\tat UnhandledPropagationDemo.m1(UnhandledPropagationDemo.java:7)\n\tat UnhandledPropagationDemo.main(UnhandledPropagationDemo.java:14)',
            activeBlock: 'JVM_CRASH',
            stack: ['[PROCESS TERMINATED WITH EXIT CODE 1]'],
            state: { no1: 100, no2: 0, res: null, status: 'JVM_CRASHED' }
          }
        ]
      };
    }

    if (scenario === 'custom-ex') {
      return {
        title: '💎 Scenario 5: Custom User-Defined Exception with throw',
        badge: 'class InvalidAgeException extends Exception -> throw new InvalidAgeException(...)',
        badgeColor: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/60',
        code: `// Custom user-defined exception
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class CustomThrowDemo {
    static void checkEligibility(int age) throws InvalidAgeException {
        if (age < 18) {
            // 🎯 Throwing custom exception for business rule violation
            throw new InvalidAgeException("Voting Denied: Age (" + age + ") is under 18!");
        }
        System.out.println("Eligible to vote! Age: " + age);
    }

    public static void main(String[] args) {
        try {
            checkEligibility(16);
        } catch (InvalidAgeException e) {
            System.out.println("Custom Exception Handled: " + e.getMessage());
        }
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 18,
            label: '1. Checking Age 16',
            desc: 'main() invokes `checkEligibility(16)`.',
            terminal: '',
            activeBlock: 'START',
            stack: ['main()', 'checkEligibility(age=16)'],
            state: { age: 16, exception: null, status: 'RUNNING' }
          },
          {
            stepNum: 1,
            line: 11,
            label: '2. 💥 throw new InvalidAgeException(...)',
            desc: 'Age 16 is below 18. Business rule is violated -> Custom exception instantiated & thrown.',
            terminal: '',
            activeBlock: 'CUSTOM_THROW',
            stack: ['main()', 'checkEligibility() [💥 THROW CUSTOM]'],
            state: { age: 16, exception: 'InvalidAgeException("Voting Denied")', status: 'THROWN' }
          },
          {
            stepNum: 2,
            line: 20,
            label: '3. 🦺 catch (InvalidAgeException e) Intercepts',
            desc: 'Matching catch block in main() captures custom exception and logs domain error.',
            terminal: 'Custom Exception Handled: Voting Denied: Age (16) is under 18!',
            activeBlock: 'CATCH_CUSTOM',
            stack: ['main() [CATCH HANDLER]'],
            state: { age: 16, exception: 'Handled cleanly', status: 'HANDLED' }
          }
        ]
      };
    }

    return null;
  };

  const currentConfig = getActiveScenarioConfig();
  const maxSteps = currentConfig.steps.length;
  const activeStep = currentConfig.steps[simStep] || currentConfig.steps[0];

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setSimStep((prev) => {
          if (prev >= maxSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, maxSteps, playbackSpeed]);

  const handleScenarioChange = (newScen) => {
    setIsPlaying(false);
    setScenario(newScen);
    setSimStep(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setSimStep(0);
  };

  const handleNext = () => {
    if (simStep < maxSteps - 1) setSimStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (simStep > 0) setSimStep((prev) => prev - 1);
  };

  return (
    <div className="w-full space-y-6 rounded-3xl bg-[#080D1A] border border-slate-800/80 p-4 sm:p-6 shadow-2xl text-slate-100 relative overflow-hidden">
      {/* Top Header & Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-rose-500/30 text-rose-400 shadow-inner shrink-0">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                "throw" Keyword Interactive Engine & Simulator
              </h2>
              <span className="text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-950/90 text-rose-300 border border-rose-700/60 whitespace-nowrap shadow-sm">
                Explicit Exception Dispatch
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Explicit Instantiation • Call Stack Unwinding • Checked vs Unchecked • Custom Exception Triggering
            </p>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'simulator'
                ? 'bg-rose-500 text-slate-950 font-bold shadow-lg shadow-rose-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5 shrink-0" />
            <span>Live Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('animation-explainer')}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'animation-explainer'
                ? 'bg-rose-500 text-slate-950 font-bold shadow-lg shadow-rose-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Animation Explainer</span>
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'rules'
                ? 'bg-rose-500 text-slate-950 font-bold shadow-lg shadow-rose-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>Architecture & Rules</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Scenario Selector Pills */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-rose-400" />
              Select "throw" Scenario:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              <button
                onClick={() => handleScenarioChange('division-demo')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                  scenario === 'division-demo'
                    ? 'border-amber-500/60 bg-amber-950/40 text-amber-300 shadow-md shadow-amber-950/40'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">1. User Input & Catch</span>
                  <Radio className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">
                  ThrowDemo with Scanner (100 / 0) Handled
                </span>
              </button>

              <button
                onClick={() => handleScenarioChange('explicit-throw')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                  scenario === 'explicit-throw'
                    ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300 shadow-md shadow-emerald-950/40'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">2. Direct throw</span>
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">
                  throw new ArithmeticException(...)
                </span>
              </button>

              <button
                onClick={() => handleScenarioChange('throw-var')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                  scenario === 'throw-var'
                    ? 'border-cyan-500/60 bg-cyan-950/40 text-cyan-300 shadow-md shadow-cyan-950/40'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">3. Object Variable</span>
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">
                  ae = new ...; throw ae;
                </span>
              </button>

              <button
                onClick={() => handleScenarioChange('stack-propagation')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                  scenario === 'stack-propagation'
                    ? 'border-rose-500/60 bg-rose-950/40 text-rose-300 shadow-md shadow-rose-950/40'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">4. No Catch / Crash</span>
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">
                  m1() unhandled &rarr; JVM crash
                </span>
              </button>

              <button
                onClick={() => handleScenarioChange('custom-ex')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                  scenario === 'custom-ex'
                    ? 'border-indigo-500/60 bg-indigo-950/40 text-indigo-300 shadow-md shadow-indigo-950/40'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">5. Custom Exception</span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">
                  throw new InvalidAgeException(...)
                </span>
              </button>
            </div>
          </div>

          {/* Active Scenario Title Banner */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                {currentConfig.title}
              </h3>
              <span className={`inline-block text-[11px] font-mono px-2 py-0.5 rounded-md border ${currentConfig.badgeColor}`}>
                {currentConfig.badge}
              </span>
            </div>
            {onOpenPlayground && (
              <button
                onClick={() => onOpenPlayground(currentConfig.code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-500 hover:text-slate-950 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-rose-400 transition shrink-0 group"
              >
                <Code2 className="w-3.5 h-3.5 text-rose-400 group-hover:text-slate-950 transition" />
                Open in Live Playground
              </button>
            )}
          </div>

          {/* Main Dual-Column Theater: Left Code, Right Narrative & State */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Code Viewer with Highlighted Line */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-rose-400" />
                  Java Source Execution
                </span>
                <span className="text-[11px] font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-800/50">
                  Active Line: {activeStep.line}
                </span>
              </div>
              <div className="rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl bg-[#030712]">
                <UltraModernCodeViewer
                  code={currentConfig.code}
                  language="java"
                  highlightLines={[activeStep.line]}
                />
              </div>
            </div>

            {/* Right: Interactive Narrative, Call Stack Frame & Console */}
            <div className="lg:col-span-5 space-y-4 flex flex-col">
              {/* Step Narrative Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#120B1A] border border-slate-800/90 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-[11px] font-extrabold text-slate-950">
                      {activeStep.stepNum + 1}
                    </span>
                    <h4 className="text-xs font-bold text-white tracking-wide">
                      {activeStep.label}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Step {simStep + 1} of {maxSteps}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
                  {activeStep.desc}
                </p>
              </div>

              {/* Call Stack Frame Tracker */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/70 pb-2">
                  <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    JVM Call Stack & Unwinding
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Stack Frames
                  </span>
                </div>

                <div className="space-y-1.5">
                  {activeStep.stack && activeStep.stack.map((frame, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border font-mono text-xs flex items-center justify-between transition-all duration-300 ${
                        frame.includes('EXCEPTION') || frame.includes('TERMINATED')
                          ? 'border-rose-500/60 bg-rose-950/50 text-rose-300'
                          : frame.includes('HANDLED') || frame.includes('COMPLETED')
                          ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                          : 'border-slate-800 bg-slate-950 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 font-bold">#{idx + 1}</span>
                        <span>{frame}</span>
                      </div>
                      {idx === activeStep.stack.length - 1 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          TOP
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Virtual Terminal Output */}
              <div className="p-4 rounded-2xl bg-[#040711] border border-slate-800/90 shadow-2xl space-y-2 flex-1 flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-rose-400" />
                    System.out Console
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-[10px] font-mono text-slate-400">Live</span>
                  </div>
                </div>
                <div className="font-mono text-xs text-emerald-300/90 bg-black/50 p-3 rounded-xl border border-slate-900 whitespace-pre-wrap flex-1 min-h-[85px] overflow-y-auto">
                  {activeStep.terminal || <span className="text-slate-600 italic">// No output yet</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Playback & Speed Controls */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            {/* Step Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={simStep === 0 || isPlaying}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 transition"
                title="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                    : 'bg-rose-500 hover:bg-rose-400 text-slate-950 shadow-rose-500/20'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause Flow
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Auto-Play Flow
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                disabled={simStep >= maxSteps - 1 || isPlaying}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 transition"
                title="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Step Progress Tracker */}
            <div className="flex items-center gap-1.5">
              {currentConfig.steps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsPlaying(false);
                    setSimStep(idx);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === simStep
                      ? 'w-7 bg-rose-400 shadow-md shadow-rose-500/50'
                      : idx < simStep
                      ? 'w-2.5 bg-rose-800'
                      : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                  }`}
                  title={`Jump to step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Playback Speed Controller */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Speed:</span>
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-rose-500"
              >
                <option value={2200}>Slow (2.2s)</option>
                <option value={1400}>Normal (1.4s)</option>
                <option value={800}>Fast (0.8s)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANIMATION EXPLAINER */}
      {activeTab === 'animation-explainer' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-amber-950/30 to-indigo-950/40 border border-rose-800/40">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              Visual Architecture: How the "throw" Statement Operates Under the Hood
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Follow the life-cycle of explicit exception generation from heap object creation to stack frame unwinding and caller recovery.
            </p>
          </div>

          {/* 4-Step Animated Pipeline Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Phase 1 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/40 space-y-3 relative overflow-hidden group hover:border-amber-400 transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-amber-950 text-amber-400 border border-amber-800 font-mono text-[10px] font-bold">
                  PHASE 1
                </span>
                <Radio className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="text-xs font-bold text-white">1. Condition & Invariant Check</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The program evaluates business data (e.g. <code className="text-amber-300 font-mono">if (no2 == 0)</code> or <code className="text-amber-300 font-mono">if (age &lt; 18)</code>).
              </p>
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-amber-300">
                b == 0 &rarr; Invalid state detected!
              </div>
            </div>

            {/* Phase 2 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-rose-500/40 space-y-3 relative overflow-hidden group hover:border-rose-400 transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-rose-950 text-rose-400 border border-rose-800 font-mono text-[10px] font-bold">
                  PHASE 2
                </span>
                <Send className="w-4 h-4 text-rose-400" />
              </div>
              <h4 className="text-xs font-bold text-white">2. Heap Object Instantiation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                <code className="text-rose-300 font-mono">new ArithmeticException(...)</code> constructs an exception object in the Heap containing error description and current stack snapshot.
              </p>
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-rose-300">
                Throwable instance created
              </div>
            </div>

            {/* Phase 3 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/40 space-y-3 relative overflow-hidden group hover:border-cyan-400 transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono text-[10px] font-bold">
                  PHASE 3
                </span>
                <Layers className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="text-xs font-bold text-white">3. Halting & Stack Unwinding</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The <code className="text-cyan-300 font-mono">throw</code> statement immediately halts execution of following lines. JVM searches current block and caller frames for a matching <code className="text-emerald-300 font-mono">catch</code>.
              </p>
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-cyan-300">
                m1() frame popped &rarr; main() searched
              </div>
            </div>

            {/* Phase 4 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/40 space-y-3 relative overflow-hidden group hover:border-emerald-400 transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px] font-bold">
                  PHASE 4
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-xs font-bold text-white">4. Catch Intercept or JVM Crash</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                If caught by <code className="text-emerald-300 font-mono">catch (Exception e)</code>, program recovers. If unhandled all the way up, JVM prints stack trace and exits.
              </p>
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-emerald-300">
                Clean recovery vs Abrupt exit
              </div>
            </div>
          </div>

          {/* Direct throw vs Two-Step Instantiation Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Pattern A: Direct Inline throw (Most Common)
                </h4>
                <span className="text-[10px] font-mono text-emerald-400">1 Line</span>
              </div>
              <div className="bg-black/60 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <p className="text-slate-500">// Directly creates and throws in a single statement</p>
                <p><span className="text-rose-400 font-bold">throw new</span> <span className="text-amber-300 font-bold">ArithmeticException</span>("You cannot divide by zero");</p>
              </div>
              <p className="text-[11px] text-slate-400">
                ✨ Succinct, standard, and preferred in 95%+ of production codebases.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Pattern B: Storing in Variable First, Then Throwing
                </h4>
                <span className="text-[10px] font-mono text-cyan-400">2 Steps</span>
              </div>
              <div className="bg-black/60 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <p className="text-slate-500">// Step 1: Create object reference</p>
                <p>ArithmeticException ae = <span className="text-emerald-400 font-bold">new</span> ArithmeticException("You cannot divide by zero");</p>
                <p className="text-slate-500">// Step 2: Throw the stored object</p>
                <p><span className="text-rose-400 font-bold">throw</span> ae;</p>
              </div>
              <p className="text-[11px] text-slate-400">
                💡 Useful when you need to inspect, enrich, or configure the exception before throwing it.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ARCHITECTURE & RULES */}
      {activeTab === 'rules' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Comparison Matrix: throw vs throws vs Throwable */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-rose-400" />
              Mastering the Difference: throw vs throws vs Throwable
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="p-2.5">Feature</th>
                    <th className="p-2.5 text-rose-400">throw</th>
                    <th className="p-2.5 text-cyan-400">throws</th>
                    <th className="p-2.5 text-amber-400">Throwable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-mono">Nature</td>
                    <td className="p-2.5">Java <strong>Keyword</strong> (Action)</td>
                    <td className="p-2.5">Java <strong>Keyword</strong> (Declaration)</td>
                    <td className="p-2.5">Root <strong>Class</strong> in <code className="text-amber-300 font-mono">java.lang</code></td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-mono">Location</td>
                    <td className="p-2.5">Inside method/block body</td>
                    <td className="p-2.5">In method declaration signature</td>
                    <td className="p-2.5">Used as type or extended by custom exceptions</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-mono">Target Argument</td>
                    <td className="p-2.5">Single <strong>exception object</strong></td>
                    <td className="p-2.5">Comma-separated <strong>exception class names</strong></td>
                    <td className="p-2.5">N/A (Superclass of Exception & Error)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-mono">Primary Purpose</td>
                    <td className="p-2.5">Explicitly creates and triggers an error</td>
                    <td className="p-2.5">Warns caller that method might throw checked exceptions</td>
                    <td className="p-2.5">Enables objects to be thrown via JVM stack unwinding</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5 Golden Rules Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-400" />
              The 5 Golden Rules for "throw" Keyword
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                  <CheckCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  1. Single Object at a Time
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The <code className="text-rose-300 font-mono">throw</code> keyword creates/throws only a <strong>single exception object</strong> at a time, never multiple.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  2. Inside Method or Block Only
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  It must be used inside a method, constructor, or static/instance initializer block. It cannot be used at class level.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  3. Unreachable Code Constraint
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Statements written directly after <code className="text-cyan-300 font-mono">throw</code> without conditional branching cause a <strong>Compile-Time Error: Unreachable statement</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  4. Must Be a Throwable Object
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  You can only throw objects that inherit from <code className="text-emerald-300 font-mono">java.lang.Throwable</code>. Throwing primitives or strings (<code className="text-rose-400 font-mono">throw "error";</code>) fails at compile time.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                  <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                  5. Checked vs Unchecked Rules
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  If throwing a checked exception, the method <strong>must declare it with <code className="text-indigo-300 font-mono">throws</code> or catch it with <code className="text-indigo-300 font-mono">try-catch</code></strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
                  6. Throwing null Gives NPE
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  If you execute <code className="text-purple-300 font-mono">throw null;</code>, the JVM throws a <code className="text-rose-400 font-mono">NullPointerException</code> at runtime instead.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
