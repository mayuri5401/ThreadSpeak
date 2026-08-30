import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  RefreshCw, FileText, Check, HelpCircle, Layers2, Trash2, ArrowDown
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaDependencyVisualizer
 * High-Yield Interactive Dependency (USES-A) Simulator:
 * 1. Stack Frame Transient Lifecycle Stepper (Creation -> Execution -> Popping)
 * 2. 2 Dependency Approaches (Local Variable vs Method Parameter)
 * 3. Dependency (USES-A) vs Association (HAS-A) Comparison
 */
export default function JavaDependencyVisualizer() {
  const [activeTab, setActiveTab] = useState('lifecycle'); // 'lifecycle' | 'approaches' | 'comparison'
  const [lifecycleStep, setLifecycleStep] = useState(0);
  const [selectedApproach, setSelectedApproach] = useState('local');

  // 4-Stage Transient Lifecycle Frames
  const lifecycleFrames = [
    {
      step: 1,
      title: "Step 1: Method Invocation (teachLesson())",
      badge: "Method Stack Push",
      desc: "main() calls teacher.teachLesson(). The JVM pushes a new Stack Frame for teachLesson(). No Whiteboard object exists yet.",
      stackState: [
        { name: "teachLesson() Frame", status: "Active Frame", localVars: "none" },
        { name: "main() Frame", status: "Caller Frame", localVars: "teacher = @0x10A" }
      ],
      heapObject: null,
      explanation: "A new call frame is allocated on the JVM Thread Stack. The dependency is about to be born."
    },
    {
      step: 2,
      title: "Step 2: Temporary Object Instantiation (new Whiteboard())",
      badge: "Local Scope Allocation",
      desc: "Inside teachLesson(), 'Whiteboard board = new Whiteboard();' instantiates a temporary Whiteboard on the Heap.",
      stackState: [
        { name: "teachLesson() Frame", status: "Active Frame", localVars: "board = @0x9F2B" },
        { name: "main() Frame", status: "Caller Frame", localVars: "teacher = @0x10A" }
      ],
      heapObject: { addr: "@0x9F2B", type: "Whiteboard", state: "Live in Heap" },
      explanation: "The reference 'board' exists ONLY inside teachLesson()'s local variable table. Teacher does NOT store it as an instance field."
    },
    {
      step: 3,
      title: "Step 3: Task Execution (board.writeOnBoard())",
      badge: "Method Execution",
      desc: "The teacher uses the whiteboard to perform the task: board.writeOnBoard(). Output: 'Writing on the whiteboard...'",
      stackState: [
        { name: "teachLesson() Frame", status: "Executing Task", localVars: "board = @0x9F2B" },
        { name: "main() Frame", status: "Caller Frame", localVars: "teacher = @0x10A" }
      ],
      heapObject: { addr: "@0x9F2B", type: "Whiteboard", state: "Task Performed" },
      explanation: "The dependent object fulfills its single specialized responsibility."
    },
    {
      step: 4,
      title: "Step 4: Stack Frame Popped & Dependency Destroyed",
      badge: "Automatic Out-of-Scope Destruction",
      desc: "teachLesson() finishes. Its Stack Frame is popped off! The 'board' reference is destroyed, and the Whiteboard object becomes eligible for Garbage Collection.",
      stackState: [
        { name: "main() Frame", status: "Active Frame", localVars: "teacher = @0x10A" }
      ],
      heapObject: { addr: "@0x9F2B", type: "Whiteboard", state: "Eligible for Garbage Collection (GC) ♻️" },
      explanation: "This proves why USES-A is transient: once the method finishes, the dependency vanishes completely from the caller!"
    }
  ];

  // 2 Dependency Approaches Data
  const approaches = [
    {
      id: 'local',
      name: '1. Local Variable inside Method',
      badge: 'Internal Instantiation',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      description: 'The dependent object is created directly inside the method body where it is needed.',
      pros: 'Simple and self-contained; caller does not need to provide anything.',
      cons: 'Hardcoded dependency; cannot easily swap or mock for testing.',
      code: `// Dependent class
class Whiteboard {
    void writeOnBoard() {
        System.out.println("Writing on the whiteboard...");
    }
}

// Main class that uses Whiteboard
class Teacher {
    void teachLesson() {
        // Local variable: Dependency created inside method
        Whiteboard board = new Whiteboard();
        board.writeOnBoard(); // Temporary usage
        System.out.println("Teacher is explaining the topic.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        Teacher teacher = new Teacher();
        teacher.teachLesson(); // Triggers method with dependency
    }
}`,
      output: `Writing on the whiteboard...\nTeacher is explaining the topic.`
    },
    {
      id: 'param',
      name: '2. Method Parameter Injection',
      badge: 'Flexible & Testable',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'The dependent object is passed from the outside caller as an argument to the method.',
      pros: 'Loose coupling; highly testable (allows passing mock objects); reusable dependency.',
      cons: 'Caller must create and pass the dependency explicitly.',
      code: `// Dependent class
class Printer {
    void printDocument() {
        System.out.println("Printing document...");
    }
}

// Main class that depends on Printer
class OfficeWorker {
    // Dependency injected via method parameter
    void performTask(Printer printer) {
        printer.printDocument(); // Temporary usage
        System.out.println("OfficeWorker has completed printing task.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        Printer printer = new Printer();          // Create dependency
        OfficeWorker worker = new OfficeWorker(); // Create dependent

        // Inject dependency via method parameter
        worker.performTask(printer);
    }
}`,
      output: `Printing document...\nOfficeWorker has completed printing task.`
    }
  ];

  const currentFrame = lifecycleFrames[lifecycleStep];
  const currentApproach = approaches.find(a => a.id === selectedApproach) || approaches[0];

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Dependency (USES-A) Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Dependency (USES-A Relationship) in Java
          </h3>
        </div>

        {/* Master Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('lifecycle')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'lifecycle'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Transient Lifecycle Stepper</span>
          </button>

          <button
            onClick={() => setActiveTab('approaches')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'approaches'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>2 Implementation Approaches</span>
          </button>

          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'comparison'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers2 className="w-3.5 h-3.5" />
            <span>USES-A vs HAS-A</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: TRANSIENT LIFECYCLE STEPPER                                    */}
      {/* ===================================================================== */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-6 relative z-10">
          
          {/* Top Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Core Characteristic:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-[11px] font-mono font-bold">
                Transient (Short-Lived)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In a <strong>USES-A (Dependency)</strong> relationship, the dependency object is created or used strictly inside a method call stack frame. Once the method completes, the dependency disappears!
            </p>
          </div>

          {/* Stepper Header Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
                {currentFrame.badge}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {currentFrame.title}
              </h4>
              <p className="text-xs text-slate-300 max-w-xl">
                {currentFrame.desc}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLifecycleStep(Math.max(0, lifecycleStep - 1))}
                disabled={lifecycleStep === 0}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-cyan-300 font-bold px-2">
                Step {lifecycleStep + 1} of {lifecycleFrames.length}
              </span>

              <button
                onClick={() => setLifecycleStep(Math.min(lifecycleFrames.length - 1, lifecycleStep + 1))}
                disabled={lifecycleStep === lifecycleFrames.length - 1}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setLifecycleStep(0)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stepper Architecture Split: Left Thread Call Stack + Right JVM Heap State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
            
            {/* Left: Call Stack Frame */}
            <div className="p-5 rounded-2xl bg-[#060D1A] border border-cyan-500/40 space-y-3 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-cyan-400 font-bold">1. JVM Thread Call Stack</span>
                <span className="text-[10px] text-slate-500">Method Scopes</span>
              </div>

              <div className="space-y-2">
                {currentFrame.stackState.map((st, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border space-y-1 ${
                      idx === 0
                        ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-200 shadow-md'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex justify-between font-bold">
                      <span>{st.name}</span>
                      <span className="text-[10px] text-cyan-400">{st.status}</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Local Variables: <strong className="text-emerald-300">{st.localVars}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Heap Object State */}
            <div className="p-5 rounded-2xl bg-[#061413] border border-emerald-500/40 space-y-3 shadow-inner flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-900/60">
                  <span className="text-emerald-400 font-bold">2. JVM Heap Memory</span>
                  <span className="text-[10px] text-slate-500">Dependency Object</span>
                </div>

                {currentFrame.heapObject ? (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Object Type:</span>
                      <strong className="text-cyan-300">{currentFrame.heapObject.type}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Memory Address:</span>
                      <strong className="text-amber-300">{currentFrame.heapObject.addr}</strong>
                    </div>
                    <div className="flex justify-between border-t border-slate-800 pt-1.5">
                      <span className="text-slate-400">Status:</span>
                      <strong className="text-emerald-400">{currentFrame.heapObject.state}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-600 italic">
                    No dependency object allocated in Heap yet
                  </div>
                )}
              </div>

              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
                {currentFrame.explanation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: 2 IMPLEMENTATION APPROACHES                                    */}
      {/* ===================================================================== */}
      {activeTab === 'approaches' && (
        <div className="space-y-6 relative z-10">
          
          {/* 2 Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {approaches.map(app => {
              const isSelected = selectedApproach === app.id;
              return (
                <button
                  key={app.id}
                  onClick={() => setSelectedApproach(app.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 space-y-1.5 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white tracking-tight">{app.name}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${app.badgeColor}`}>
                      {app.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block line-clamp-1">{app.description}</span>
                </button>
              );
            })}
          </div>

          {/* Active Approach View */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Code Viewer (7 cols) */}
            <div className="xl:col-span-7 space-y-2 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{currentApproach.name}</span>
                </span>
                <span>Java 21</span>
              </div>
              <UltraModernCodeViewer code={currentApproach.code} />
            </div>

            {/* Right: Technical Explanation & Console Output (5 cols) */}
            <div className="xl:col-span-5 space-y-4 min-w-0">
              
              {/* Explanation Card */}
              <div className="p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-3 shadow-inner">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${currentApproach.badgeColor}`}>
                  {currentApproach.badge}
                </span>

                <h4 className="text-base font-bold text-white leading-snug">
                  {currentApproach.name}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentApproach.description}
                </p>

                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
                    <strong className="text-emerald-400 block mb-0.5">Key Benefit:</strong>
                    <span>{currentApproach.pros}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-200">
                    <strong className="text-amber-400 block mb-0.5">Design Note:</strong>
                    <span>{currentApproach.cons}</span>
                  </div>
                </div>
              </div>

              {/* Console Output */}
              <div className="p-4 rounded-2xl bg-[#040711] border border-slate-800 font-mono text-xs shadow-inner space-y-2">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Standard Output</span>
                  </span>
                  <span>Exit 0</span>
                </div>
                <pre className="text-emerald-300 leading-relaxed whitespace-pre-line">
                  {currentApproach.output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: DEPENDENCY (USES-A) vs ASSOCIATION (HAS-A) COMPARISON          */}
      {/* ===================================================================== */}
      {activeTab === 'comparison' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Understanding the exact architectural distinctions between <strong>Dependency (USES-A)</strong> and <strong>Association (HAS-A)</strong>:
          </div>

          <div className="rounded-2xl border border-slate-800 overflow-hidden bg-[#040711] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Feature</th>
                    <th className="p-3.5 text-blue-400">Association (HAS-A)</th>
                    <th className="p-3.5 text-amber-400">Dependency (USES-A)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300 text-[11.5px]">
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-slate-400">Duration / Lifetime</td>
                    <td className="p-3.5 text-cyan-300 font-bold">Long-term (Object reference stored in field)</td>
                    <td className="p-3.5 text-amber-300 font-bold">Temporary (Used strictly in a method)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-slate-400">Object Location</td>
                    <td className="p-3.5">Instance variable inside class</td>
                    <td className="p-3.5">Local variable or method parameter</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-slate-400">Canonical Example</td>
                    <td className="p-3.5 text-emerald-300">Car HAS-A Engine</td>
                    <td className="p-3.5 text-emerald-300">OfficeWorker USES-A Printer</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-slate-400">Method Reusability</td>
                    <td className="p-3.5">Reused across multiple class methods</td>
                    <td className="p-3.5">Used only within that specific method</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
