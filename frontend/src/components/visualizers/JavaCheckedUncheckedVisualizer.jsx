import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle, ChevronRight, ChevronLeft, ArrowDown,
  FileText, Shield, AlertOctagon, Scale, BookOpen, Train, Car
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaCheckedUncheckedVisualizer
 * High-Yield Interactive Visualizer & Animation Theater for:
 * "Checked & Unchecked Exception in Java"
 * 1. Dual-Track Execution Animation (Train Delay Notice vs Sudden Tire Burst)
 * 2. Interactive 8-Aspect Comparison Matrix
 * 3. Real-World Analogy Showcase (Scheduled Delay vs Tire Blowout)
 * 4. Simple Language Walkthrough & Explanations
 */
export default function JavaCheckedUncheckedVisualizer() {
  const [activeTab, setActiveTab] = useState('animation'); // 'animation' | 'matrix' | 'analogies' | 'hierarchy'

  // Tab 1: Animation Pipeline States
  const [exceptionType, setExceptionType] = useState('checked'); // 'checked' | 'unchecked'
  const [hasHandler, setHasHandler] = useState(false);
  const [hasThrows, setHasThrows] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1300);

  // Tab 2: 8-Aspect Matrix State
  const [selectedAspectIndex, setSelectedAspectIndex] = useState(0);

  // Auto-play stepper for animation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      const maxSteps = exceptionType === 'checked' ? (hasHandler || hasThrows ? 3 : 2) : (hasHandler ? 3 : 2);
      timer = setTimeout(() => {
        if (simStep < maxSteps) {
          setSimStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, simStep, exceptionType, hasHandler, hasThrows, speed]);

  const handleTypeChange = (type) => {
    setExceptionType(type);
    setSimStep(0);
    setIsPlaying(false);
  };

  // Checked Scenario Pipelines
  const checkedScenario = {
    title: '🚄 Checked Exception: The Train Delay Notice (Compile-Time Enforcement)',
    badge: 'Compile-Time Verified',
    badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
    description: 'The compiler acts as an advance station inspector. If a method attempts an I/O or DB operation that might fail, javac FORCES you to handle it with try-catch or declare it with throws BEFORE code can compile.',
    stepsWithoutHandler: [
      {
        step: 0,
        label: 'Step 1: Programmer Writes Code',
        desc: 'FileReader fr = new FileReader("abc.txt") is written without try-catch or throws.',
        activeLine: 5,
        terminal: '$ javac CheckedDemo.java\nCompiling source code...'
      },
      {
        step: 1,
        label: 'Step 2: Compiler Inspector Scans Code',
        desc: 'javac detects that FileReader constructor throws checked IOException.',
        activeLine: 5,
        terminal: '$ javac CheckedDemo.java\n[javac] Scanning AST...\n⚠️ Detected unhandled Checked Exception: java.io.IOException'
      },
      {
        step: 2,
        label: '🛑 Step 3: Build Failed (Compile-Time Blocker)',
        desc: 'javac refuses to generate bytecode! Code will NOT run until you handle or declare it.',
        activeLine: 5,
        terminal: '$ javac CheckedDemo.java\nCheckedDemo.java:5: error: unreported exception IOException; must be caught or declared to be thrown\n        FileReader fr = new FileReader("abc.txt");\n                        ^\n1 error\n[BUILD FAILED]'
      }
    ],
    stepsWithHandler: [
      {
        step: 0,
        label: 'Step 1: Code Wrapped with Handling',
        desc: 'The potentially failing FileReader operation is enclosed in a try-catch block.',
        activeLine: 6,
        terminal: '$ javac CheckedDemo.java\nCompiling source code...'
      },
      {
        step: 1,
        label: 'Step 2: Compiler Approves (Safe!)',
        desc: 'javac sees the try-catch shield! Generates CheckedDemo.class bytecode smoothly.',
        activeLine: 8,
        terminal: '$ javac CheckedDemo.java\n[javac] Checked Exception handled properly.\n[BUILD SUCCESSFUL] Generated CheckedDemo.class'
      },
      {
        step: 2,
        label: 'Step 3: Program Runs on JVM',
        desc: 'JVM executes main(). Missing file throws exception inside try block.',
        activeLine: 8,
        terminal: '$ java CheckedDemo\nStep 1: Program starts.\nAttempting to open file...'
      },
      {
        step: 3,
        label: 'Step 4: catch Block Handles Gracefully',
        desc: 'catch(IOException e) catches the missing file and prints a friendly message without crashing.',
        activeLine: 9,
        terminal: '$ java CheckedDemo\nStep 1: Program starts.\nAttempting to open file...\n⚠️ Checked Exception caught: File cannot be read -> abc.txt (Not Found)\nProgram finished safely!'
      }
    ],
    codeWithout: `import java.io.FileReader;

public class CheckedDemo {
    public static void main(String[] args) {
        // ❌ COMPILE ERROR: Unreported exception IOException
        FileReader fr = new FileReader("abc.txt");
        System.out.println("File opened successfully.");
    }
}`,
    codeWithCatch: `import java.io.FileReader;
import java.io.IOException;

public class CheckedDemo {
    public static void main(String[] args) {
        try {
            FileReader fr = new FileReader("abc.txt");
            System.out.println("File opened successfully.");
        } catch (IOException e) {
            System.out.println("⚠️ Checked Exception caught: " + e.getMessage());
        }
        System.out.println("Program finished safely!");
    }
}`,
    codeWithThrows: `import java.io.FileReader;
import java.io.IOException;

public class CheckedDemo {
    // Declares throws IOException to delegate to caller
    public static void main(String[] args) throws IOException {
        FileReader fr = new FileReader("abc.txt");
        System.out.println("File opened successfully.");
    }
}`
  };

  // Unchecked Scenario Pipelines
  const uncheckedScenario = {
    title: '🚗 Unchecked Exception: The Sudden Tire Burst (Runtime Anomaly)',
    badge: 'Runtime Execution Surprise',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
    description: 'The compiler completely ignores unchecked exceptions. The program compiles with 0 errors, but when running at runtime, a logic flaw (divide by zero, null pointer) suddenly bursts and crashes the thread if unhandled.',
    stepsWithoutHandler: [
      {
        step: 0,
        label: 'Step 1: Programmer Writes Code',
        desc: 'int result = 10 / 0 is written without try-catch.',
        activeLine: 5,
        terminal: '$ javac UncheckedDemo.java\nCompiling source code...'
      },
      {
        step: 1,
        label: 'Step 2: Compiler Ignores It (Build Success!)',
        desc: 'javac does not check for runtime arithmetic/null errors. Generates .class file cleanly.',
        activeLine: 5,
        terminal: '$ javac UncheckedDemo.java\n[javac] No compile-time checks for Unchecked Exceptions.\n[BUILD SUCCESSFUL] Generated UncheckedDemo.class'
      },
      {
        step: 2,
        label: '💥 Step 3: Sudden Runtime Crash (Tire Burst)',
        desc: 'During execution, JVM hits 10 / 0. Throws ArithmeticException and halts immediately!',
        activeLine: 5,
        terminal: '$ java UncheckedDemo\nStep 1: Program starts.\nException in thread "main" java.lang.ArithmeticException: / by zero\n\tat UncheckedDemo.main(UncheckedDemo.java:5)\n[PROCESS CRASHED]'
      }
    ],
    stepsWithHandler: [
      {
        step: 0,
        label: 'Step 1: Code Protected with try-catch',
        desc: 'Division is guarded with a try-catch block.',
        activeLine: 6,
        terminal: '$ javac UncheckedDemo.java\n[BUILD SUCCESSFUL] Generated UncheckedDemo.class'
      },
      {
        step: 1,
        label: 'Step 2: Execution Starts on JVM',
        desc: 'Program runs. Division by zero occurs inside guarded try block.',
        activeLine: 7,
        terminal: '$ java UncheckedDemo\nStep 1: Program starts.\nEvaluating division 10 / 0...'
      },
      {
        step: 2,
        label: 'Step 3: catch Block Intercepts Tire Burst',
        desc: 'catch(ArithmeticException e) safely catches division by zero.',
        activeLine: 9,
        terminal: '$ java UncheckedDemo\nStep 1: Program starts.\nEvaluating division 10 / 0...\n⚠️ Handled Unchecked Exception: Cannot divide by zero (/ by zero)'
      },
      {
        step: 3,
        label: 'Step 4: Normal Execution Resumes',
        desc: 'Program completes successfully with Exit Code 0.',
        activeLine: 12,
        terminal: '$ java UncheckedDemo\nStep 1: Program starts.\nEvaluating division 10 / 0...\n⚠️ Handled Unchecked Exception: Cannot divide by zero (/ by zero)\nStep 3: Program finished safely!'
      }
    ],
    codeWithout: `public class UncheckedDemo {
    public static void main(String[] args) {
        System.out.println("Step 1: Program starts.");
        
        // 💥 Compiles fine, but crashes at RUNTIME!
        int result = 10 / 0; 

        System.out.println("Step 2: Result: " + result);
    }
}`,
    codeWithCatch: `public class UncheckedDemo {
    public static void main(String[] args) {
        System.out.println("Step 1: Program starts.");

        try {
            int result = 10 / 0;
            System.out.println("Step 2: Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("⚠️ Handled Unchecked Exception: Cannot divide by zero (" + e.getMessage() + ")");
        }

        System.out.println("Step 3: Program finished safely!");
    }
}`
  };

  const isChecked = exceptionType === 'checked';
  const currentScenario = isChecked ? checkedScenario : uncheckedScenario;
  const currentSteps = isChecked 
    ? (hasHandler || hasThrows ? checkedScenario.stepsWithHandler : checkedScenario.stepsWithoutHandler)
    : (hasHandler ? uncheckedScenario.stepsWithHandler : uncheckedScenario.stepsWithoutHandler);
  
  const currentCode = isChecked 
    ? (hasHandler ? checkedScenario.codeWithCatch : hasThrows ? checkedScenario.codeWithThrows : checkedScenario.codeWithout)
    : (hasHandler ? uncheckedScenario.codeWithCatch : uncheckedScenario.codeWithout);

  const activeStepData = currentSteps[Math.min(simStep, currentSteps.length - 1)];

  // 8 Aspects Comparison Data
  const eightAspects = [
    {
      aspect: '1. Also Called',
      checked: 'Compile-Time Exceptions',
      unchecked: 'Runtime Exceptions',
      badgeC: 'Compile-Time',
      badgeU: 'Runtime',
      detail: 'Checked exceptions are known as Compile-Time Exceptions because javac verifies them during compilation. Unchecked exceptions are known as Runtime Exceptions because they occur during program execution.'
    },
    {
      aspect: '2. Definition',
      checked: 'Checked Exceptions are those which are checked at compile-time by compiler.',
      unchecked: 'Unchecked Exceptions are those which are ignored by compiler and checked at runtime by JVM.',
      badgeC: 'Compiler Enforced',
      badgeU: 'JVM Checked',
      detail: 'If checked exceptions are not handled with try-catch or declared using throws, the code will NOT compile. Unchecked exceptions are ignored by the compiler.'
    },
    {
      aspect: '3. Hierarchy',
      checked: 'Comes under the Exception class, (excluding RuntimeException).',
      unchecked: 'Comes under the RuntimeException class (and all Error classes).',
      badgeC: 'Direct Subclass of Exception',
      badgeU: 'Subclass of RuntimeException',
      detail: 'Checked exceptions inherit directly from java.lang.Exception. Unchecked exceptions inherit from java.lang.RuntimeException.'
    },
    {
      aspect: '4. Examples',
      checked: 'IOException, SQLException, ClassNotFoundException, InterruptedException.',
      unchecked: 'NullPointerException, ArithmeticException, ArrayIndexOutOfBoundsException, IllegalArgumentException.',
      badgeC: 'I/O & Database',
      badgeU: 'Logic & State Bugs',
      detail: 'Checked: FileReader fr = new FileReader("file.txt"). Unchecked: int res = 10 / 0 or str.length() on null.'
    },
    {
      aspect: '5. Handling',
      checked: 'Must be handled by try-catch or declared using throws keyword.',
      unchecked: 'Optional to handle (but recommended as best practice).',
      badgeC: 'Mandatory',
      badgeU: 'Optional',
      detail: 'Compiler throws a compilation error if checked exceptions are neglected. For unchecked exceptions, handling is optional to javac, but recommended to avoid crashes.'
    },
    {
      aspect: '6. When Occur',
      checked: 'External factors (e.g. I/O failure, DB connection lost, missing file).',
      unchecked: 'Code mistakes (e.g. null reference, invalid array index, division by zero).',
      badgeC: 'Environmental',
      badgeU: 'Programming Flaw',
      detail: 'Checked exceptions arise from things outside the program\'s immediate control (file system, network). Unchecked arise from bad code logic.'
    },
    {
      aspect: '7. Impact',
      checked: 'Safe but lengthy (Requires boilerplate try-catch or throws).',
      unchecked: 'Flexible but risky (Clean code, but potential sudden crashes).',
      badgeC: 'Defensive & Safe',
      badgeU: 'Clean & Risky',
      detail: 'Checked exceptions guarantee safety at the cost of verbose code. Unchecked exceptions keep code clean but risk uncaught crashes.'
    },
    {
      aspect: '8. Analogy & Best Practice',
      checked: 'Analogy: Train delay notice | Best Practice: Always handle or declare checked exceptions properly.',
      unchecked: 'Analogy: Sudden tire burst | Best Practice: Avoid mistakes in code or check data before use (defensive programming).',
      badgeC: 'Advance Notice',
      badgeU: 'Sudden Blowout',
      detail: 'Checked is like planning around an advance train delay alert. Unchecked is like checking your tires before driving to prevent a blowout.'
    }
  ];

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background glowing effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Compiler &amp; Runtime Simulation Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Checked vs Unchecked Exceptions in Java
          </h3>
        </div>

        {/* Master Tab Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          {[
            { id: 'animation', label: '1. Compiler vs Runtime Animation', icon: Play },
            { id: 'matrix', label: '2. 8-Aspect Comparison Matrix', icon: Scale },
            { id: 'analogies', label: '3. Real-World Analogies', icon: Train },
            { id: 'hierarchy', label: '4. Class Hierarchy', icon: Layers }
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
      {/* TAB 1: DUAL-TRACK COMPILER & RUNTIME ANIMATION                        */}
      {/* ===================================================================== */}
      {activeTab === 'animation' && (
        <div className="space-y-6 relative z-10">
          
          {/* Track Switchers & Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            
            {/* Category Selectors */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleTypeChange('checked')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                  isChecked
                    ? 'bg-blue-950/90 border-blue-500 text-blue-300 shadow-md shadow-blue-900/30 scale-[1.02]'
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                }`}
              >
                <Train className="w-4 h-4 text-blue-400" />
                <span>🚄 Checked Exception (Compile-Time)</span>
              </button>

              <button
                onClick={() => handleTypeChange('unchecked')}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                  !isChecked
                    ? 'bg-amber-950/90 border-amber-500 text-amber-300 shadow-md shadow-amber-900/30 scale-[1.02]'
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                }`}
              >
                <Car className="w-4 h-4 text-amber-400" />
                <span>🚗 Unchecked Exception (Runtime)</span>
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
                  isChecked
                    ? 'bg-blue-500 hover:bg-blue-400 text-slate-950 shadow-blue-500/30'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
                }`}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Animate Pipeline'}</span>
              </button>

              <button
                onClick={() => setSimStep(prev => Math.min(currentSteps.length - 1, prev + 1))}
                disabled={simStep >= currentSteps.length - 1 || isPlaying}
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

          {/* Interactive Code Modifier Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#060B16] border border-cyan-500/30">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-mono font-bold">Try Code Variations:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => { setHasHandler(!hasHandler); if (!hasHandler) setHasThrows(false); setSimStep(0); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  hasHandler
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-900/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {hasHandler ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-slate-500" />}
                <span>Add try-catch Block</span>
              </button>

              {isChecked && (
                <button
                  onClick={() => { setHasThrows(!hasThrows); if (!hasThrows) setHasHandler(false); setSimStep(0); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                    hasThrows
                      ? 'bg-purple-950/80 border-purple-500 text-purple-300 shadow-md shadow-purple-900/30'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {hasThrows ? <Check className="w-3.5 h-3.5 text-purple-400" /> : <X className="w-3.5 h-3.5 text-slate-500" />}
                  <span>Declare throws in Signature</span>
                </button>
              )}
            </div>
          </div>

          {/* Scenario Banner */}
          <div className="p-4 rounded-2xl bg-[#060B16] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{currentScenario.title}</span>
              </span>
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${currentScenario.badgeColor}`}>
                {currentScenario.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentScenario.description}
            </p>
          </div>

          {/* Live Pipeline Visualizer */}
          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/30 font-mono text-xs space-y-6 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 animate-pulse" />
                <span>Execution Timeline: Compiler Inspection &amp; JVM Execution</span>
              </span>
              <span className="text-[11px] text-slate-400">
                Step {simStep + 1} of {currentSteps.length}
              </span>
            </div>

            {/* Pipeline Step Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {currentSteps.map((st, idx) => {
                const isCurrent = simStep === idx;
                const isPassed = simStep >= idx;
                const isFailed = isChecked && !hasHandler && !hasThrows && idx === 2;
                const isRuntimeCrash = !isChecked && !hasHandler && idx === 2;

                let cardBg = 'bg-slate-900/60 border-slate-800 text-slate-400';
                let badgeBg = 'bg-slate-800 text-slate-400';

                if (isFailed || isRuntimeCrash) {
                  cardBg = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  badgeBg = 'bg-rose-900 text-rose-300';
                } else if (isPassed) {
                  cardBg = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200';
                  badgeBg = 'bg-emerald-900 text-emerald-300';
                }

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border transition-all duration-300 ${cardBg} ${
                      isCurrent ? 'ring-2 ring-cyan-400 scale-[1.03] shadow-lg shadow-cyan-500/20' : ''
                    }`}
                  >
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${badgeBg}`}>
                      Step {idx + 1}
                    </span>
                    <strong className="text-xs font-bold block text-white mt-1.5">{st.label}</strong>
                    <p className="text-[10.5px] mt-0.5 opacity-80">{st.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Active Step Diagnostic Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <div className={`p-2 rounded-lg border shrink-0 mt-0.5 ${
                isChecked ? 'bg-blue-950 text-blue-400 border-blue-800' : 'bg-amber-950 text-amber-400 border-amber-800'
              }`}>
                {isChecked ? <Train className="w-4 h-4" /> : <Car className="w-4 h-4" />}
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white text-xs block">
                  {activeStepData.label}
                </span>
                <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans">
                  {activeStepData.desc}
                </p>
              </div>
            </div>

            {/* Code Panel & Terminal Output */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              <div className="xl:col-span-7 space-y-2 min-w-0">
                <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                  <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{isChecked ? 'CheckedDemo.java' : 'UncheckedDemo.java'}</span>
                  </span>
                  <span>Java 21</span>
                </div>
                <UltraModernCodeViewer code={currentCode} title={isChecked ? 'CheckedDemo.java' : 'UncheckedDemo.java'} />
              </div>

              <div className="xl:col-span-5 space-y-2 min-w-0">
                <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Compiler &amp; Runtime Output</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">javac / java</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 min-h-[200px] whitespace-pre-wrap leading-relaxed shadow-inner">
                  {activeStepData.terminal}
                </div>
              </div>
            </div>
          </div>

          {/* Simple Explanation of the Animation */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Explanation of this Animation in Simple Words:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed font-sans">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-blue-500/30 space-y-1.5">
                <strong className="text-blue-300 font-mono block">🚄 What the Checked Exception Animation Shows:</strong>
                <p>
                  The Java compiler (<code>javac</code>) acts like a <strong>ticket collector before boarding</strong>. When you write code to read a file (<code>FileReader</code>), the compiler checks in advance: <em>"Did you write a try-catch block or declare throws?"</em>. If NO, the compiler blocks you from even building the program. It forces you to plan in advance!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1.5">
                <strong className="text-amber-300 font-mono block">🚗 What the Unchecked Exception Animation Shows:</strong>
                <p>
                  The compiler <strong>completely ignores unchecked exceptions</strong>. It happily builds your program with 0 errors. But when your program runs at 100 km/h, a logic flaw like <code>10 / 0</code> or <code>null.length()</code> causes a <strong>sudden tire burst</strong>. If you didn't guard it with try-catch, your application crashes abruptly at runtime!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: 8-ASPECT MASTER COMPARISON MATRIX                              */}
      {/* ===================================================================== */}
      {activeTab === 'matrix' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>8 Comprehensive Differences: Checked vs Unchecked Exception</span>
            </h4>
            <p className="text-xs text-slate-300">
              Click any aspect below to inspect the detailed architectural breakdown.
            </p>
          </div>

          {/* Aspect Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {eightAspects.map((asp, idx) => (
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

          {/* Focused Aspect Card */}
          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/30 space-y-4 shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-base font-extrabold text-white font-mono">
                Focus Dimension: {eightAspects[selectedAspectIndex].aspect}
              </span>
              <span className="text-[11px] font-mono text-cyan-300 px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                Aspect {selectedAspectIndex + 1} of 8
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Checked Box */}
              <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-blue-300 flex items-center gap-1.5 uppercase">
                  <Train className="w-4 h-4 text-blue-400" />
                  <span>🚄 Checked Exception</span>
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {eightAspects[selectedAspectIndex].checked}
                </p>
              </div>

              {/* Unchecked Box */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 uppercase">
                  <Car className="w-4 h-4 text-amber-400" />
                  <span>🚗 Unchecked Exception</span>
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {eightAspects[selectedAspectIndex].unchecked}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-xs text-cyan-300 font-mono">
              💡 <strong>Deep Insight:</strong> {eightAspects[selectedAspectIndex].detail}
            </div>
          </div>

          {/* Full Table */}
          <div className="p-6 rounded-2xl bg-[#060B16] border border-slate-800 overflow-x-auto shadow-inner">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 pr-4 font-bold">Aspect</th>
                  <th className="pb-3 pr-4 font-bold text-blue-400">🚄 Checked Exception</th>
                  <th className="pb-3 font-bold text-amber-400">🚗 Unchecked Exception</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                {eightAspects.map((asp, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition">
                    <td className="py-3 font-bold text-white pr-4">{asp.aspect}</td>
                    <td className="py-3 text-blue-200/90 pr-4 leading-relaxed">{asp.checked}</td>
                    <td className="py-3 text-amber-200/90 leading-relaxed">{asp.unchecked}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: REAL-WORLD ANALOGIES SHOWCASE                                 */}
      {/* ===================================================================== */}
      {activeTab === 'analogies' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Train className="w-4 h-4 text-cyan-400" />
              <span>Real-World Analogies: Train Delay Notice vs Tire Burst</span>
            </h4>
            <p className="text-xs text-slate-300">
              Intuitive mental models that make the difference unforgettable for interviews and everyday software architecture.
            </p>
          </div>

          {/* Side-by-side Analogy Theater */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Checked Analogy Card */}
            <div className="p-6 rounded-2xl bg-[#060B16] border border-blue-500/40 space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-blue-500/20">
                <span className="text-blue-300 font-bold font-mono text-sm flex items-center gap-2">
                  <Train className="w-5 h-5 text-blue-400" />
                  <span>🚄 Scheduled Train Delay Notice</span>
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  Checked Exception
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                <strong className="text-white block text-sm">The Story:</strong>
                <p>
                  You are traveling by train. The railway station puts up an official board announcing: <em>"Train #104 is delayed by 2 hours due to track maintenance."</em>
                </p>
                <p>
                  Because you are <strong>informed in advance (at compile-time)</strong>, you MUST plan accordingly — you read a book at the station or take a cup of coffee (<code>try-catch</code>). You cannot board without preparing!
                </p>
              </div>

              <div className="space-y-1 text-xs font-mono">
                <span className="text-blue-300 font-bold block">Key Characteristics:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11.5px]">
                  <li>Known risk communicated beforehand.</li>
                  <li>Mandatory preparation required.</li>
                  <li>Caused by external environment (track, weather, network, disk).</li>
                </ul>
              </div>
            </div>

            {/* Unchecked Analogy Card */}
            <div className="p-6 rounded-2xl bg-[#060B16] border border-amber-500/40 space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
                <span className="text-amber-300 font-bold font-mono text-sm flex items-center gap-2">
                  <Car className="w-5 h-5 text-amber-400" />
                  <span>🚗 Sudden Tire Burst While Driving</span>
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                  Unchecked Exception
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                <strong className="text-white block text-sm">The Story:</strong>
                <p>
                  You are cruising down the highway at 100 km/h. Everything is fine until you hit a sharp nail left on the road (a coding mistake like null pointer or bad index).
                </p>
                <p>
                  <strong>BANG!</strong> The tire suddenly bursts with zero prior warning. It happens dynamically in the middle of driving (at runtime).
                </p>
              </div>

              <div className="space-y-1 text-xs font-mono">
                <span className="text-amber-300 font-bold block">Key Characteristics:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11.5px]">
                  <li>Zero advance compiler warning.</li>
                  <li>Happens dynamically at runtime.</li>
                  <li>Caused by programming logic mistakes (driving over nails / null access).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: CLASS HIERARCHY TREE                                           */}
      {/* ===================================================================== */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/30 font-mono text-xs space-y-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Throwable Hierarchy: Checked vs Unchecked Subclasses</span>
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
            (Unchecked System-Level)          (Application Anomalies)
                                                        │
                        ┌───────────────────────────────┴───────────────────────────────┐
                        ▼                                                               ▼
        ┌───────────────────────────────┐                               ┌───────────────────────────────┐
        │      CHECKED EXCEPTIONS       │                               │     UNCHECKED EXCEPTIONS      │
        │ (Subclasses of Exception      │                               │ (Subclasses of                │
        │  excluding RuntimeException)  │                               │  java.lang.RuntimeException)  │
        ├───────────────────────────────┤                               ├───────────────────────────────┤
        │ • IOException                 │                               │ • ArithmeticException         │
        │ • SQLException                │                               │ • NullPointerException        │
        │ • ClassNotFoundException      │                               │ • ArrayIndexOutOfBoundsEx.    │
        └───────────────────────────────┘                               └───────────────────────────────┘`}
            </pre>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-2">
            <strong className="text-white block font-mono">🔑 Hierarchy Points to Remember:</strong>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li><strong>Checked Exceptions:</strong> Subclasses of <code>Exception</code> class <strong>excluding</strong> <code>RuntimeException</code>.</li>
              <li><strong>Unchecked Exceptions:</strong> Subclasses of <code>RuntimeException</code> and all <code>Error</code> classes.</li>
              <li><strong>Exception class itself:</strong> Is a <strong>checked exception</strong> because it directly inherits from <code>Throwable</code> and is not a child of <code>RuntimeException</code>.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
