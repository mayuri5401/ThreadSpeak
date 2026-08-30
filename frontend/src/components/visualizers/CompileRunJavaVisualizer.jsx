import React, { useState } from 'react';
import { 
  Terminal, Play, RotateCcw, CheckCircle2, 
  Folder, FileCode, ArrowRight, Sparkles, AlertTriangle, 
  Layers, HardDrive, Check, Info
} from 'lucide-react';

export default function CompileRunJavaVisualizer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showErrorDemo, setShowErrorDemo] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Step 1: Set Up & Verify Java",
      cmdText: "C:\\Users\\User> java -version\njava version \"21.0.2\" 2024-01-16 LTS\nJava(TM) SE Runtime Environment (build 21.0.2+13-LTS-58)\n\nC:\\Users\\User> javac -version\njavac 21.0.2",
      folderState: ["(System Environment configured)"],
      desc: "Open Command Prompt and verify that both Java runtime (java) and Java compiler (javac) are recognized in the system PATH.",
      tip: "If 'javac' is not recognized, add the JDK bin directory to your Environment Variables PATH."
    },
    {
      id: 2,
      title: "Step 2: Write MainApp.java in Notepad",
      cmdText: "C:\\Users\\User> notepad D:\\JavaPrograms\\MainApp.java\n\n[Notepad File Saved: D:\\JavaPrograms\\MainApp.java]",
      codeSnippet: `public class MainApp {
    public static void main(String[] args) {
        System.out.println("Hello Deepak");
    }
}`,
      folderState: ["MainApp.java (Source Code - 120 bytes)"],
      desc: "Open Notepad, write the Java code, and save as MainApp.java inside D:\\JavaPrograms folder.",
      tip: "Select 'All Files (*.*)' when saving so Notepad does not append .txt to the filename."
    },
    {
      id: 3,
      title: "Step 3: Navigate & Compile with javac",
      cmdText: showErrorDemo 
        ? "C:\\Users\\User> cd /d D:\\JavaPrograms\nD:\\JavaPrograms> javac MainApp.java\nMainApp.java:3: error: ';' expected\n        System.out.println(\"Hello Deepak\")\n                                         ^\n1 error"
        : "C:\\Users\\User> cd /d D:\\JavaPrograms\nD:\\JavaPrograms> javac MainApp.java\n\n[Compilation Successful - MainApp.class generated]",
      folderState: showErrorDemo 
        ? ["MainApp.java"] 
        : ["MainApp.java", "MainApp.class (Bytecode - 415 bytes) ✨"],
      desc: "Use 'cd /d D:\\JavaPrograms' to switch drives, then compile using 'javac MainApp.java'. This produces the binary bytecode 'MainApp.class'.",
      tip: "The '/d' switch tells CMD to change both the drive letter (C: to D:) and the folder path simultaneously."
    },
    {
      id: 4,
      title: "Step 4: Run Program with java",
      cmdText: showErrorDemo
        ? "D:\\JavaPrograms> java MainApp.class\nError: Could not find or load main class MainApp.class\nCaused by: java.lang.ClassNotFoundException: MainApp/class"
        : "D:\\JavaPrograms> java MainApp\nHello Deepak\n\nProcess finished with exit code 0",
      folderState: ["MainApp.java", "MainApp.class ✨"],
      desc: "Run the program with 'java MainApp'. The JVM loads MainApp.class, locates the main() method, and executes the program.",
      tip: "Do NOT write '.class' when executing with java! Always use 'java MainApp'."
    }
  ];

  const active = steps[currentStep - 1];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0F172A] via-[#0B1222] to-[#070B14] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-md">
            <Terminal className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Interactive CMD &amp; Notepad Java Simulator
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                4-Step Flow
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate compiling and running Java programs using Windows Command Prompt.
            </p>
          </div>
        </div>

        {/* Demo Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowErrorDemo(!showErrorDemo)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border flex items-center gap-1.5 ${
              showErrorDemo
                ? 'bg-rose-950 text-rose-300 border-rose-700 font-bold'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{showErrorDemo ? 'Showing Common CMD Errors' : 'Show Common Errors'}</span>
          </button>
        </div>
      </div>

      {/* 4 Step Progress Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {steps.map((s) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(s.id)}
            className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
              currentStep === s.id
                ? 'bg-cyan-950/80 border-cyan-400 shadow-lg shadow-cyan-950/50 ring-2 ring-cyan-400/40'
                : currentStep > s.id
                ? 'bg-slate-900/90 border-slate-700 text-slate-300 hover:border-slate-600'
                : 'bg-slate-950/60 border-slate-800/80 text-slate-500 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                Step 0{s.id}
              </span>
              {currentStep > s.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <span className="text-xs font-bold text-white line-clamp-1">
              {s.title.replace(/Step \d: /, '')}
            </span>
          </button>
        ))}
      </div>

      {/* Split Workspace: CMD Terminal (Left) & Directory State (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Windows Command Prompt Window (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0C1017] border border-slate-800 overflow-hidden shadow-xl flex flex-col">
          {/* CMD Title Bar */}
          <div className="px-4 py-2.5 bg-[#161B22] border-b border-slate-800 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-mono text-slate-300 font-semibold">
                Command Prompt - Administrator
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[220px] overflow-auto select-text text-slate-200">
            <pre className={`whitespace-pre-wrap ${showErrorDemo && (currentStep === 3 || currentStep === 4) ? 'text-rose-300 font-semibold' : 'text-emerald-300'}`}>
              {active.cmdText}
            </pre>
          </div>
        </div>

        {/* Directory & File Inspector (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#080D18] border border-slate-800 p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Folder className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white font-mono">
                Directory: D:\JavaPrograms\
              </span>
            </div>

            <div className="space-y-2 pt-3">
              <span className="text-[11px] font-mono text-slate-400">Files Present:</span>
              <div className="space-y-1.5">
                {active.folderState.map((f, i) => (
                  <div key={i} className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-xs font-mono text-slate-300">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notepad Code Preview if in Step 2 */}
            {currentStep === 2 && active.codeSnippet && (
              <div className="pt-3 space-y-1.5">
                <span className="text-[11px] font-mono text-slate-400">Notepad Code Content:</span>
                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                  {active.codeSnippet}
                </pre>
              </div>
            )}
          </div>

          {/* Next / Previous Step Controller */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-40"
            >
              Previous Step
            </button>

            <span className="text-xs font-mono text-slate-400">
              Step {currentStep} of 4
            </span>

            <button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              disabled={currentStep === 4}
              className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-950/50 disabled:opacity-40 flex items-center gap-1"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Educational Explanation Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#060A14] border border-cyan-500/30 space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
          <Info className="w-4 h-4" />
          <span>{active.title}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed pl-6">
          {active.desc}
        </p>
        <div className="mt-2 pl-6 text-xs text-amber-300/90 font-medium">
          💡 <span className="font-bold">Pro Tip: </span>{active.tip}
        </div>
      </div>

    </div>
  );
}
