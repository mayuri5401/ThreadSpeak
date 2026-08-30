import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle, ChevronRight, ChevronLeft, ArrowDown,
  FileText, Shield, AlertOctagon, CornerDownRight, CheckCircle, Info,
  Sliders, Activity, Eye, BookOpen, Lightbulb, Lock, Unlock,
  Send, UserCheck, AlertCircle, ArrowUpCircle, Radio, Network,
  Layers2, GitFork, GitPullRequest, Laptop, FileSearch, Scale,
  Crosshair, Award, Swords
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaThrowVsThrowsVisualizer
 * High-Yield Interactive Theater & Comparison Arena for:
 * ""throw" vs "throws" in Java Exception Handling"
 */
export default function JavaThrowVsThrowsVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'explainer' | 'battle-arena' | 'rule-tester' | 'quiz'
  const [scenario, setScenario] = useState('synergy-checked'); // 'synergy-checked' | 'unchecked-throw' | 'multiple-throws' | 'unreachable-trap'

  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1400);

  // Rule Tester State
  const [selectedExType, setSelectedExType] = useState('checked'); // 'checked' | 'unchecked'
  const [hasThrowsClause, setHasThrowsClause] = useState(true);
  const [hasTryCatchCaller, setHasTryCatchCaller] = useState(true);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});

  // Scenario Configurations
  const getActiveScenarioConfig = () => {
    switch (scenario) {
      case 'synergy-checked':
        return {
          title: '🔥 Scenario 1: "throw" & "throws" Working Together (Checked IOException)',
          badge: 'throws declares in signature -> throw triggers inside body -> caller handles',
          badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
          code: `import java.io.IOException;

public class SynergyDemo {
    // 📢 'throws' declares the checked exception in method signature
    static void checkFile(boolean fileExists) throws IOException {
        System.out.println("1. Executing checkFile()...");
        
        if (!fileExists) {
            // 💥 'throw' creates and throws the exception object
            throw new IOException("File not found on disk: data.txt");
        }
        
        System.out.println("2. File exists and ready for processing.");
    }

    public static void main(String[] args) {
        try {
            System.out.println("0. Calling checkFile(false)...");
            checkFile(false);
        } catch (IOException e) {
            // 🦺 Caller catches the propagated exception
            System.out.println("3. Caught in caller: " + e.getMessage());
        }
    }
}`,
          steps: [
            {
              stepNum: 0,
              line: 17,
              label: '1. 🚀 Program Starts in main()',
              desc: '`main()` enters the try block and calls `checkFile(false)`.',
              terminal: '0. Calling checkFile(false)...',
              activeRole: 'CALLER_INVOKE',
              throwStatus: { status: 'Idle (Not triggered)', color: 'text-slate-400' },
              throwsStatus: { status: 'Declared in checkFile() signature', color: 'text-amber-400 font-bold' },
              stack: ['main() [Waiting]']
            },
            {
              stepNum: 1,
              line: 6,
              label: '2. 🔍 checkFile() Begins Execution',
              desc: 'Method stack frame pushed. Prints "1. Executing checkFile()...". Condition `!fileExists` evaluates to `true`.',
              terminal: '0. Calling checkFile(false)...\n1. Executing checkFile()...',
              activeRole: 'METHOD_BODY',
              throwStatus: { status: 'Evaluating if (!fileExists)', color: 'text-cyan-400' },
              throwsStatus: { status: 'Enforces compile-time caller contract', color: 'text-amber-400 font-bold' },
              stack: ['main() [Waiting]', 'checkFile(false) [Running]']
            },
            {
              stepNum: 2,
              line: 10,
              label: '3. 💥 "throw" Statement Fires!',
              desc: '`throw new IOException(...)` instantiates the exception object and fires it immediately. Normal execution in `checkFile()` stops instantly.',
              terminal: '0. Calling checkFile(false)...\n1. Executing checkFile()...',
              activeRole: 'THROW_TRIGGERED',
              throwStatus: { status: '💥 ACTIVE: throw new IOException(...)', color: 'text-rose-400 font-bold animate-pulse' },
              throwsStatus: { status: 'Ducking & Propagating up to caller', color: 'text-amber-400 font-bold' },
              stack: ['main() [Receiving Error]', 'checkFile(false) [💥 Exception Fired]']
            },
            {
              stepNum: 3,
              line: 20,
              label: '4. 🦺 "throws" Passes Error to Caller Catch',
              desc: 'Because `checkFile()` declared `throws IOException`, the JVM unrolls the stack back to `main()`, where `catch (IOException e)` intercepts it.',
              terminal: '0. Calling checkFile(false)...\n1. Executing checkFile()...\n3. Caught in caller: File not found on disk: data.txt',
              activeRole: 'CATCH_HANDLED',
              throwStatus: { status: 'Exception object caught and consumed', color: 'text-emerald-400' },
              throwsStatus: { status: 'Contract fulfilled by try-catch handler', color: 'text-emerald-400 font-bold' },
              stack: ['main() [🛡️ Catch Handler Executing]']
            },
            {
              stepNum: 4,
              line: 23,
              label: '5. ✅ Program Finishes Gracefully',
              desc: 'Control resumes after catch block. System avoids any crash and terminates with exit code 0.',
              terminal: '0. Calling checkFile(false)...\n1. Executing checkFile()...\n3. Caught in caller: File not found on disk: data.txt',
              activeRole: 'FINISH',
              throwStatus: { status: 'Complete', color: 'text-slate-400' },
              throwsStatus: { status: 'Complete', color: 'text-slate-400' },
              stack: ['main() [Completed]']
            }
          ]
        };

      case 'unchecked-throw':
        return {
          title: '⚡ Scenario 2: "throw" with Unchecked Exception (No "throws" Needed)',
          badge: 'Unchecked RuntimeException does NOT require throws in method header',
          badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
          code: `public class UncheckedThrowDemo {
    // ℹ️ No 'throws' clause required for IllegalArgumentException!
    static void setAge(int age) {
        if (age < 0) {
            // 💥 'throw' fires unchecked RuntimeException
            throw new IllegalArgumentException("Age cannot be negative: " + age);
        }
        System.out.println("Valid age: " + age);
    }

    public static void main(String[] args) {
        try {
            setAge(-10);
        } catch (IllegalArgumentException e) {
            System.out.println("Caught unchecked: " + e.getMessage());
        }
    }
}`,
          steps: [
            {
              stepNum: 0,
              line: 12,
              label: '1. 🚀 Calling setAge(-10)',
              desc: '`main()` invokes `setAge(-10)`. Notice the method signature has NO `throws` keyword.',
              terminal: '',
              activeRole: 'CALLER_INVOKE',
              throwStatus: { status: 'Idle', color: 'text-slate-400' },
              throwsStatus: { status: 'Not needed (Unchecked Exception)', color: 'text-slate-500' },
              stack: ['main() [Waiting]']
            },
            {
              stepNum: 1,
              line: 6,
              label: '2. 💥 "throw" Fires IllegalArgumentException',
              desc: '`age < 0` is true. `throw new IllegalArgumentException(...)` triggers immediately.',
              terminal: '',
              activeRole: 'THROW_TRIGGERED',
              throwStatus: { status: '💥 throw new IllegalArgumentException(...)', color: 'text-rose-400 font-bold' },
              throwsStatus: { status: 'Implicit unchecked propagation', color: 'text-cyan-400' },
              stack: ['main() [Waiting]', 'setAge(-10) [💥 Throwing]']
            },
            {
              stepNum: 2,
              line: 14,
              label: '3. 🦺 Caller Catches IllegalArgumentException',
              desc: 'Caller intercepts the unchecked exception and prints message.',
              terminal: 'Caught unchecked: Age cannot be negative: -10',
              activeRole: 'CATCH_HANDLED',
              throwStatus: { status: 'Caught by caller catch block', color: 'text-emerald-400 font-bold' },
              throwsStatus: { status: 'No throws contract was required', color: 'text-slate-400' },
              stack: ['main() [🛡️ Caught Safely]']
            }
          ]
        };

      case 'multiple-throws':
        return {
          title: '🟣 Scenario 3: Single "throw" vs Multiple "throws" Declarations',
          badge: 'throw fires 1 exception object | throws declares comma-separated list',
          badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
          code: `import java.io.IOException;
import java.sql.SQLException;

public class MultiDemo {
    // 📢 'throws' can declare MULTIPLE exceptions separated by commas
    static void process(int code) throws IOException, SQLException {
        if (code == 1) {
            // 💥 'throw' can only throw ONE exception instance at a time
            throw new IOException("I/O Stream failure");
        } else if (code == 2) {
            throw new SQLException("Database Connection lost");
        }
        System.out.println("Processed cleanly.");
    }

    public static void main(String[] args) {
        try {
            process(1);
        } catch (IOException | SQLException e) {
            System.out.println("Handled: " + e.getMessage());
        }
    }
}`,
          steps: [
            {
              stepNum: 0,
              line: 16,
              label: '1. 🚀 Calling process(1)',
              desc: '`main()` invokes `process(1)`. `process` declares `throws IOException, SQLException`.',
              terminal: '',
              activeRole: 'CALLER_INVOKE',
              throwStatus: { status: 'Pending branch evaluation', color: 'text-slate-400' },
              throwsStatus: { status: 'Declares [IOException, SQLException]', color: 'text-purple-400 font-bold' },
              stack: ['main() [Waiting]']
            },
            {
              stepNum: 1,
              line: 9,
              label: '2. 💥 "throw" Fires Exactly 1 Object: IOException',
              desc: 'Even though signature declared 2 exceptions, `throw` fires only ONE concrete object instance (`new IOException(...)`).',
              terminal: '',
              activeRole: 'THROW_TRIGGERED',
              throwStatus: { status: '💥 Fires 1 instance: new IOException()', color: 'text-rose-400 font-bold' },
              throwsStatus: { status: 'Satisfies 1 of the 2 declared types', color: 'text-purple-400' },
              stack: ['main() [Waiting]', 'process(1) [💥 Throwing]']
            },
            {
              stepNum: 2,
              line: 18,
              label: '3. 🦺 Multi-Catch Handles the Fired Exception',
              desc: '`catch (IOException | SQLException e)` intercepts the single fired `IOException` object.',
              terminal: 'Handled: I/O Stream failure',
              activeRole: 'CATCH_HANDLED',
              throwStatus: { status: 'Handled', color: 'text-emerald-400' },
              throwsStatus: { status: 'Both possibilities accounted for', color: 'text-emerald-400 font-bold' },
              stack: ['main() [🛡️ Handled]']
            }
          ]
        };

      case 'unreachable-trap':
        return {
          title: '🔴 Scenario 4: Compiler Trap - Unreachable Code After "throw"',
          badge: 'Statements placed immediately after unconditional throw cause COMPILE ERROR',
          badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
          code: `public class UnreachableTrap {
    static void testMethod() {
        System.out.println("Line 1: Running...");
        
        throw new RuntimeException("Crash!");
        
        // ❌ COMPILE ERROR: unreachable statement!
        // System.out.println("Line 2: This will NEVER execute!");
    }

    public static void main(String[] args) {
        testMethod();
    }
}`,
          steps: [
            {
              stepNum: 0,
              line: 3,
              label: '1. 🚀 First Statement Executes',
              desc: '`System.out.println("Line 1: Running...")` executes normally.',
              terminal: 'Line 1: Running...',
              activeRole: 'METHOD_BODY',
              throwStatus: { status: 'Next line will throw unconditionally', color: 'text-amber-400' },
              throwsStatus: { status: 'N/A', color: 'text-slate-500' },
              stack: ['main()', 'testMethod()']
            },
            {
              stepNum: 1,
              line: 5,
              label: '2. 💥 Unconditional "throw" Halts Control Flow',
              desc: 'Because `throw` transfers control immediately, the compiler detects that any statements placed directly below it without a condition are dead/unreachable code.',
              terminal: 'Line 1: Running...',
              activeRole: 'THROW_TRIGGERED',
              throwStatus: { status: '💥 Halts execution pipeline immediately', color: 'text-rose-400 font-bold' },
              throwsStatus: { status: 'N/A', color: 'text-slate-500' },
              stack: ['main()', 'testMethod() [💥 Throw]']
            },
            {
              stepNum: 2,
              line: 8,
              label: '3. 🚫 Compiler Rule: Unreachable Statement',
              desc: 'If line 8 were uncommented, Java compiler (`javac`) would reject compilation with error: `unreachable statement`.',
              terminal: 'Line 1: Running...\n// If line 8 uncommented: Compile Error: unreachable statement',
              activeRole: 'FINISH',
              throwStatus: { status: 'Unreachable code prevented by javac', color: 'text-rose-300 font-bold' },
              throwsStatus: { status: 'N/A', color: 'text-slate-500' },
              stack: ['main()', 'testMethod()']
            }
          ]
        };

      default:
        return null;
    }
  };

  const currentConfig = getActiveScenarioConfig();
  const currentStep = currentConfig.steps[simStep] || currentConfig.steps[0];

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setSimStep((prev) => {
          if (prev < currentConfig.steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, currentConfig.steps.length]);

  const handleScenarioChange = (newScen) => {
    setScenario(newScen);
    setSimStep(0);
    setIsPlaying(false);
  };

  // Rule Tester Evaluation
  const evaluateRuleTester = () => {
    if (selectedExType === 'checked') {
      if (!hasThrowsClause) {
        return {
          valid: false,
          status: '❌ COMPILE ERROR: unreported exception java.io.IOException',
          desc: 'When throwing a Checked Exception inside a method body without a local try-catch, the method header MUST declare "throws IOException".',
          color: 'border-rose-500/50 bg-rose-950/40 text-rose-300'
        };
      }
      if (!hasTryCatchCaller) {
        return {
          valid: false,
          status: '❌ COMPILE ERROR in Caller: unhandled exception java.io.IOException',
          desc: 'The caller method calls a method declaring "throws IOException" but neither caught it in try-catch nor declared "throws IOException" in its own header.',
          color: 'border-rose-500/50 bg-rose-950/40 text-rose-300'
        };
      }
      return {
        valid: true,
        status: '✅ PERFECT (Fully Valid Java Code)',
        desc: 'Checked exception is thrown with "throw", declared with "throws IOException" in method header, and handled cleanly by caller via try-catch.',
        color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
      };
    } else {
      // Unchecked
      if (!hasTryCatchCaller) {
        return {
          valid: true,
          status: '⚠️ COMPILES OK (Runtime Crash Risk)',
          desc: 'Unchecked exceptions (like ArithmeticException) compile cleanly even without throws or try-catch, but will crash at runtime if not handled.',
          color: 'border-amber-500/50 bg-amber-950/40 text-amber-300'
        };
      }
      return {
        valid: true,
        status: '✅ PERFECT (Handled Unchecked Exception)',
        desc: 'Unchecked exception thrown and caught cleanly by caller. "throws" clause is optional.',
        color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
      };
    }
  };

  const ruleResult = evaluateRuleTester();

  // Quiz Questions
  const quizData = [
    {
      id: 'q1',
      question: 'Which keyword is followed by an INSTANTIATED OBJECT, and which is followed by CLASS NAME(S)?',
      options: [
        'throws is followed by an object; throw is followed by class names.',
        'throw is followed by an object (e.g. throw new Exception()); throws is followed by class names (e.g. throws IOException).',
        'Both are followed by objects.',
        'Both are followed by class names.'
      ],
      correctIndex: 1,
      explanation: '`throw` takes an object instance (`throw new MyException()`), while `throws` takes one or more exception class names in the method signature (`throws IOException, SQLException`).'
    },
    {
      id: 'q2',
      question: 'How many exceptions can be declared in a single "throw" statement vs a "throws" clause?',
      options: [
        'throw can throw multiple; throws can declare only one.',
        'Both can specify multiple exceptions separated by commas.',
        'throw can throw only ONE exception object at a time; throws can declare MULTIPLE exception classes separated by commas.',
        'Both are limited to strictly one exception.'
      ],
      correctIndex: 2,
      explanation: 'A `throw` statement can only throw a single exception object instance at a time, whereas a `throws` clause can declare multiple exception classes: `void m() throws IOException, SQLException, ParseException`.'
    },
    {
      id: 'q3',
      question: 'Where can the "throw" and "throws" keywords appear in Java code?',
      options: [
        'throw is inside method/block bodies; throws is in method/constructor declarations only.',
        'throws is inside method bodies; throw is in class declarations.',
        'Both can be used anywhere interchangeably.',
        'throw can only be used in catch blocks.'
      ],
      correctIndex: 0,
      explanation: '`throw` is an executable statement inside code blocks; `throws` is a declarative keyword in method or constructor headers.'
    },
    {
      id: 'q4',
      question: 'What happens if code is placed immediately after an unconditional "throw new Exception()"?',
      options: [
        'It executes normally after the exception is thrown.',
        'It causes a COMPILE ERROR: "unreachable statement".',
        'It executes in the background asynchronously.',
        'It only executes if an exception is caught.'
      ],
      correctIndex: 1,
      explanation: 'Statements placed directly after an unconditional `throw` statement are considered dead/unreachable code and produce a compile-time error.'
    }
  ];

  return (
    <div className="w-full bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden my-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-amber-950/80 p-5 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
              <Swords className="w-3.5 h-3.5 text-purple-400" /> Java Keyword Battle Arena
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Action vs Declaration
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-200 via-white to-amber-200 bg-clip-text text-transparent flex items-center gap-2">
            ⚖️ "throw" vs "throws" Visualizer & Comparison Theater
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Understand the decisive architectural and syntactic differences between throwing an exception object and declaring method contracts.
          </p>
        </div>

        {onOpenPlayground && (
          <button
            onClick={() => onOpenPlayground(`import java.io.IOException;

public class ThrowVsThrowsDemo {
    // 'throws' is used in method signature (Contract for caller)
    static void readFile(String path) throws IOException {
        if (path == null || path.isEmpty()) {
            // 'throw' is used inside method body (Action statement)
            throw new IOException("File path cannot be null or empty");
        }
        System.out.println("Reading file from: " + path);
    }

    public static void main(String[] args) {
        try {
            readFile("");
        } catch (IOException e) {
            System.out.println("Caught handled exception: " + e.getMessage());
        }
    }
}`)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white font-medium rounded-xl text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/20 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" /> Open in Universal Playground
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 overflow-x-auto px-4 pt-2">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'simulator'
              ? 'border-purple-400 text-purple-300 bg-purple-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" /> 1. Dual Action Simulator
        </button>

        <button
          onClick={() => setActiveTab('battle-arena')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'battle-arena'
              ? 'border-amber-400 text-amber-300 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" /> 2. Head-to-Head Comparison Matrix
        </button>

        <button
          onClick={() => setActiveTab('explainer')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'explainer'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers2 className="w-4 h-4" /> 3. Animation & Architecture Explainer
        </button>

        <button
          onClick={() => setActiveTab('rule-tester')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'rule-tester'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Crosshair className="w-4 h-4" /> 4. Compiler Rule Sandbox
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'quiz'
              ? 'border-pink-400 text-pink-300 bg-pink-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> 5. Interview Traps & Quiz
        </button>
      </div>

      {/* TAB 1: DUAL SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="p-4 md:p-6 space-y-6">
          {/* Scenario Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Select Comparison Scenario:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                { id: 'synergy-checked', label: '1. Synergy (throw + throws)', icon: Sparkles, color: 'text-amber-400' },
                { id: 'unchecked-throw', label: '2. Unchecked (throw only)', icon: Zap, color: 'text-cyan-400' },
                { id: 'multiple-throws', label: '3. 1 throw vs Multi throws', icon: Layers, color: 'text-purple-400' },
                { id: 'unreachable-trap', label: '4. Unreachable Code Trap', icon: Flame, color: 'text-rose-400' }
              ].map((item) => {
                const IconComp = item.icon;
                const isSelected = scenario === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScenarioChange(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-purple-500 shadow-md shadow-purple-500/10'
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <IconComp className={`w-4 h-4 ${isSelected ? item.color : 'text-slate-500'}`} />
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                {currentConfig.title}
              </h3>
              <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${currentConfig.badgeColor}`}>
                {currentConfig.badge}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSimStep(Math.max(0, simStep - 1))}
                disabled={simStep === 0}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-md shadow-purple-600/20 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                {isPlaying ? 'Pause' : 'Auto Play'}
              </button>

              <button
                onClick={() => setSimStep(Math.min(currentConfig.steps.length - 1, simStep + 1))}
                disabled={simStep === currentConfig.steps.length - 1}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setSimStep(0);
                  setIsPlaying(false);
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 cursor-pointer"
                title="Reset Simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                <span>Speed:</span>
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-transparent text-purple-400 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value={2000} className="bg-slate-900">0.7x (Slow)</option>
                  <option value={1400} className="bg-slate-900">1x (Normal)</option>
                  <option value={800} className="bg-slate-900">1.8x (Fast)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid Layout: Code (Left) vs Dual State Dashboard (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Code Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono font-bold text-slate-300">Java Code Execution</span>
                  </div>
                  <div className="text-xs text-purple-400 font-mono flex items-center gap-1.5 bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                    <Activity className="w-3 h-3 animate-pulse" /> Line {currentStep.line}
                  </div>
                </div>

                <div className="p-2 bg-slate-950/90 font-mono text-xs overflow-x-auto">
                  <pre className="text-slate-300 leading-relaxed">
                    {currentConfig.code.split('\n').map((lineText, idx) => {
                      const lineNum = idx + 1;
                      const isHighlighted = lineNum === currentStep.line;
                      return (
                        <div
                          key={idx}
                          className={`flex items-center px-3 py-0.5 rounded transition-all ${
                            isHighlighted
                              ? 'bg-purple-500/20 text-purple-200 border-l-4 border-purple-400 font-bold'
                              : 'hover:bg-slate-900/50'
                          }`}
                        >
                          <span className="w-8 text-slate-600 select-none text-right pr-3">{lineNum}</span>
                          <span className="whitespace-pre">{lineText}</span>
                        </div>
                      );
                    })}
                  </pre>
                </div>
              </div>

              {/* Step Explanatory Card */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs font-bold rounded border border-purple-500/30">
                    Step {currentStep.stepNum + 1} of {currentConfig.steps.length}
                  </span>
                  <h4 className="text-sm font-bold text-white">{currentStep.label}</h4>
                </div>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {currentStep.desc}
                </p>
              </div>
            </div>

            {/* Right Column: Dual State Dashboard (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Dual Role Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* throw card */}
                <div className="bg-slate-900 p-3.5 rounded-xl border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-rose-400" /> "throw" (Action)
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-rose-950/60 rounded text-rose-300 border border-rose-500/30">
                      Statement
                    </span>
                  </div>
                  <p className={`text-xs ${currentStep.throwStatus.color}`}>
                    {currentStep.throwStatus.status}
                  </p>
                </div>

                {/* throws card */}
                <div className="bg-slate-900 p-3.5 rounded-xl border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-amber-400" /> "throws" (Contract)
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-amber-950/60 rounded text-amber-300 border border-amber-500/30">
                      Signature
                    </span>
                  </div>
                  <p className={`text-xs ${currentStep.throwsStatus.color}`}>
                    {currentStep.throwsStatus.status}
                  </p>
                </div>
              </div>

              {/* Call Stack Frame Visualizer */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Call Stack Status
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {currentStep.stack.length} Level(s)
                  </span>
                </div>

                <div className="space-y-1.5">
                  {currentStep.stack.slice().reverse().map((frameName, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono flex items-center justify-between"
                    >
                      <span className={frameName.includes('Throw') || frameName.includes('Exception') ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                        {frameName}
                      </span>
                      {fIdx === 0 && (
                        <span className="text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Console Output */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-mono text-slate-300">Console Standard Output</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                </div>
                <div className="p-3 font-mono text-xs min-h-[85px] bg-black/40 text-emerald-400 space-y-1">
                  {currentStep.terminal ? (
                    currentStep.terminal.split('\n').map((tLine, tIdx) => (
                      <div
                        key={tIdx}
                        className={tLine.includes('Caught') || tLine.includes('Error') ? 'text-amber-300 font-bold' : ''}
                      >
                        {tLine}
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-600 italic">// No output yet...</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HEAD-TO-HEAD COMPARISON MATRIX */}
      {activeTab === 'battle-arena' && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-purple-950/40 p-5 rounded-xl border border-amber-500/30">
            <h3 className="text-base md:text-lg font-bold text-amber-200 flex items-center gap-2 mb-2">
              <Scale className="w-5 h-5 text-amber-400" />
              Complete Comparison Matrix: "throw" vs "throws"
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Every critical dimension software engineers and interviewers evaluate:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-slate-900 text-slate-200 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3.5 w-1/5">Aspect</th>
                  <th className="p-3.5 w-2/5 text-rose-300 bg-rose-950/20 border-r border-slate-800">💥 throw Keyword</th>
                  <th className="p-3.5 w-2/5 text-amber-300 bg-amber-950/20">📢 throws Keyword</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                <tr className="bg-slate-950/60 hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-slate-300">Definition</td>
                  <td className="p-3.5 text-slate-300 border-r border-slate-800">
                    Used to <b>actually throw an exception object</b> from a method or block of code.
                  </td>
                  <td className="p-3.5 text-slate-300">
                    Used in <b>method declaration</b> to declare the exceptions that a method might throw.
                  </td>
                </tr>

                <tr className="bg-slate-950/30 hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-slate-300">Usage Location</td>
                  <td className="p-3.5 text-slate-300 border-r border-slate-800">
                    <b>Inside a method or a block of code</b> (executable statement).
                  </td>
                  <td className="p-3.5 text-slate-300">
                    In <b>method or constructor declaration only</b> (method signature).
                  </td>
                </tr>

                <tr className="bg-slate-950/60 hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-slate-300">Number of Exceptions</td>
                  <td className="p-3.5 text-slate-300 border-r border-slate-800">
                    Can throw <b>only one exception object</b> at a time per statement.
                  </td>
                  <td className="p-3.5 text-slate-300">
                    Can declare <b>multiple exceptions separated by commas</b>.
                  </td>
                </tr>

                <tr className="bg-slate-950/30 hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-slate-300">Checked / Unchecked</td>
                  <td className="p-3.5 text-slate-300 border-r border-slate-800">
                    Can throw <b>both checked and unchecked</b> exceptions.
                  </td>
                  <td className="p-3.5 text-slate-300">
                    Mainly for <b>checked exceptions</b>; can declare unchecked exceptions (but not necessary).
                  </td>
                </tr>

                <tr className="bg-slate-950/60 hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-slate-300">Effect on Caller</td>
                  <td className="p-3.5 text-slate-300 border-r border-slate-800">
                    <b>Immediately transfers</b> the exception to the caller or enclosing catch block.
                  </td>
                  <td className="p-3.5 text-slate-300">
                    <b>Informs the caller</b> that it should handle the declared exceptions.
                  </td>
                </tr>

                <tr className="bg-slate-950/30 hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-slate-300">Syntax Example</td>
                  <td className="p-3.5 font-mono text-rose-300 border-r border-slate-800">
                    <code>throw new IOException("File not found");</code>
                  </td>
                  <td className="p-3.5 font-mono text-amber-300">
                    <code>void readFile() throws IOException, SQLException &#123; &#125;</code>
                  </td>
                </tr>

                <tr className="bg-slate-950/60 hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-slate-300">Requirement</td>
                  <td className="p-3.5 text-slate-300 border-r border-slate-800">
                    Checked exceptions thrown must be handled using <code>try-catch</code> or declared with <code>throws</code>.
                  </td>
                  <td className="p-3.5 text-slate-300">
                    Caller must handle checked exceptions declared with <code>throws</code> (or declare them too).
                  </td>
                </tr>

                <tr className="bg-slate-950/30 hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-slate-300">Target Operand</td>
                  <td className="p-3.5 text-slate-300 border-r border-slate-800">
                    Followed by an <b>instance / object</b>: <code>throw new MyEx();</code>
                  </td>
                  <td className="p-3.5 text-slate-300">
                    Followed by <b>class name(s)</b>: <code>throws MyEx, OtherEx</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ANIMATION & ARCHITECTURE EXPLAINER */}
      {activeTab === 'explainer' && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 p-5 rounded-xl border border-cyan-500/30">
            <h3 className="text-base md:text-lg font-bold text-cyan-200 flex items-center gap-2 mb-2">
              <Layers2 className="w-5 h-5 text-cyan-400" />
              How "throw" and "throws" Cooperate Synergistically
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Think of <b>throws</b> as a building warning sign: <i>"Caution: High Voltage"</i>. Think of <b>throw</b> as an electrical spark that actually occurs. The warning sign (<code>throws</code>) warns visitors (callers) to wear protective gear (<code>try-catch</code>) in case a spark (<code>throw</code>) happens!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <Flame className="w-4 h-4" /> 1. The Role of "throw" (The Trigger)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When business invariants or system operations fail:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>• An exception object is created: <code>new IOException(...)</code>.</li>
                <li>• <code>throw</code> transfers runtime control immediately out of the normal pipeline.</li>
                <li>• Any lines below an unconditional <code>throw</code> are never executed.</li>
              </ul>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Shield className="w-4 h-4" /> 2. The Role of "throws" (The Contract)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                When a method chooses not to catch a checked exception locally:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>• <code>throws</code> adds a warning badge to the method signature.</li>
                <li>• Java compiler inspects all calling methods and forces them to handle or propagate.</li>
                <li>• Enables clean multi-tier architectural propagation (DAO $\rightarrow$ Service $\rightarrow$ Controller).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMPILER RULE SANDBOX */}
      {activeTab === 'rule-tester' && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 p-5 rounded-xl border border-emerald-500/30">
            <h3 className="text-base md:text-lg font-bold text-emerald-200 flex items-center gap-2 mb-2">
              <Crosshair className="w-5 h-5 text-emerald-400" />
              Interactive Compiler Rule Sandbox
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Test how the Java compiler evaluates different combinations of <code>throw</code>, <code>throws</code>, and caller handling:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Toggles */}
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  1. Exception Type Being Thrown:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedExType('checked')}
                    className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      selectedExType === 'checked'
                        ? 'border-amber-500 bg-amber-950/50 text-amber-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Checked (IOException)
                  </button>
                  <button
                    onClick={() => setSelectedExType('unchecked')}
                    className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      selectedExType === 'unchecked'
                        ? 'border-cyan-500 bg-cyan-950/50 text-cyan-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Unchecked (ArithmeticException)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  2. Method Header "throws" Clause:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setHasThrowsClause(true)}
                    className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      hasThrowsClause
                        ? 'border-emerald-500 bg-emerald-950/50 text-emerald-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Has "throws {selectedExType === 'checked' ? 'IOException' : 'ArithmeticException'}"
                  </button>
                  <button
                    onClick={() => setHasThrowsClause(false)}
                    className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      !hasThrowsClause
                        ? 'border-rose-500 bg-rose-950/50 text-rose-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    NO throws clause
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  3. Caller Handling:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setHasTryCatchCaller(true)}
                    className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      hasTryCatchCaller
                        ? 'border-emerald-500 bg-emerald-950/50 text-emerald-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Caller wraps in try-catch
                  </button>
                  <button
                    onClick={() => setHasTryCatchCaller(false)}
                    className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      !hasTryCatchCaller
                        ? 'border-rose-500 bg-rose-950/50 text-rose-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Caller calls directly (No try-catch)
                  </button>
                </div>
              </div>
            </div>

            {/* Diagnostic Output */}
            <div className="space-y-4">
              <div className={`p-5 rounded-xl border ${ruleResult.color} shadow-lg space-y-3`}>
                <div className="flex items-center gap-2">
                  {ruleResult.valid ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <AlertOctagon className="w-6 h-6 text-rose-400" />
                  )}
                  <h4 className="text-base font-bold">{ruleResult.status}</h4>
                </div>
                <p className="text-xs md:text-sm leading-relaxed opacity-95">
                  {ruleResult.desc}
                </p>
              </div>

              {/* Dynamic Code Preview */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <div className="text-slate-400">
                  <span className="text-purple-400">void</span> <span className="text-amber-300">doWork</span>() {hasThrowsClause && <span className="text-pink-400 font-bold">throws {selectedExType === 'checked' ? 'IOException' : 'ArithmeticException'}</span>} &#123;<br />
                  &nbsp;&nbsp;<span className="text-rose-400 font-bold">throw</span> <span className="text-purple-400">new</span> <span className="text-yellow-300">{selectedExType === 'checked' ? 'IOException' : 'ArithmeticException'}</span>(<span className="text-emerald-300">"Error"</span>);<br />
                  &#125;
                </div>
                <div className="text-slate-400 pt-2 border-t border-slate-800">
                  <span className="text-purple-400">void</span> <span className="text-amber-300">caller</span>() &#123;<br />
                  {hasTryCatchCaller ? (
                    <>
                      &nbsp;&nbsp;<span className="text-purple-400">try</span> &#123; <span className="text-cyan-300">doWork</span>(); &#125; <span className="text-purple-400">catch</span> (Exception e) &#123; &#125;<br />
                    </>
                  ) : (
                    <>
                      &nbsp;&nbsp;<span className="text-cyan-300">doWork</span>();<br />
                    </>
                  )}
                  &#125;
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: QUIZ */}
      {activeTab === 'quiz' && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-gradient-to-r from-pink-950/40 via-slate-900 to-purple-950/40 p-5 rounded-xl border border-pink-500/30">
            <h3 className="text-base md:text-lg font-bold text-pink-200 flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-pink-400" />
              Interview Mastery Quiz: "throw" vs "throws"
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Sharpen your core knowledge against top software engineering interview questions:
            </p>
          </div>

          <div className="space-y-4">
            {quizData.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-0.5 bg-pink-500/20 text-pink-300 text-xs font-bold rounded border border-pink-500/30">
                      Q{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white">{q.question}</h4>
                  </div>

                  <div className="space-y-2 pt-2">
                    {q.options.map((opt, oIdx) => {
                      const isThisSelected = selectedOpt === oIdx;
                      let btnClass = 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700';

                      if (isAnswered) {
                        if (oIdx === q.correctIndex) {
                          btnClass = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold';
                        } else if (isThisSelected) {
                          btnClass = 'border-rose-500 bg-rose-950/60 text-rose-200 line-through';
                        } else {
                          btnClass = 'border-slate-800 bg-slate-950/40 text-slate-600 opacity-50';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswered}
                          onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: oIdx })}
                          className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && oIdx === q.correctIndex && (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {isAnswered && isThisSelected && oIdx !== q.correctIndex && (
                            <X className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`p-3 rounded-lg text-xs leading-relaxed mt-2 ${
                      isCorrect ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-200' : 'bg-amber-950/40 border border-amber-500/40 text-amber-200'
                    }`}>
                      <b>{isCorrect ? '🎉 Correct!' : '💡 Explanation:'}</b> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
