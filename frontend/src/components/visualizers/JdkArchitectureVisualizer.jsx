import React, { useState, useEffect } from 'react';
import { 
  Wrench, Cpu, Package, Layers, Sparkles, Play, RotateCcw, 
  Terminal, ShieldCheck, CheckCircle2, ArrowRight, Info, Zap,
  FolderOpen, BookOpen, Database, Code, RefreshCw
} from 'lucide-react';

export default function JdkArchitectureVisualizer() {
  const [activeElement, setActiveElement] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // 0: Idle, 1: javac, 2: bytecode, 3: classloader, 4: memory, 5: runtime libs, 6: execution

  const simulationSteps = [
    { step: 1, label: '1. Developer compiles source code using javac compiler', target: 'javac' },
    { step: 2, label: '2. Bytecode (.class) created and transferred to JRE', target: 'jre' },
    { step: 3, label: '3. JVM ClassLoader loads & verifies bytecode security', target: 'classloader' },
    { step: 4, label: '4. Memory Areas allocate Stack frames & Heap objects', target: 'memory' },
    { step: 5, label: '5. JRE links standard Package Classes & Runtime Libraries', target: 'libs' },
    { step: 6, label: '6. Execution Engine (JIT) executes native machine code on CPU!', target: 'engine' }
  ];

  const startSimulation = () => {
    setIsSimulating(true);
    setActiveStep(1);
  };

  useEffect(() => {
    if (!isSimulating) return;

    if (activeStep < 6) {
      const timer = setTimeout(() => {
        setActiveStep(prev => prev + 1);
      }, 1400);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        setIsSimulating(false);
      }, 2500);
      return () => clearTimeout(finishTimer);
    }
  }, [isSimulating, activeStep]);

  const resetSimulation = () => {
    setIsSimulating(false);
    setActiveStep(0);
    setActiveElement(null);
  };

  const devToolsList = [
    { name: 'java', label: 'java', desc: 'Java Application Launcher - Launches and executes JVM applications.' },
    { name: 'javac', label: 'javac', desc: 'Java Compiler - Compiles .java source code into .class bytecode.' },
    { name: 'jar', label: 'jar', desc: 'Java Archiver - Bundles multiple class files and resources into a single JAR file.' },
    { name: 'javadoc', label: 'javadoc', desc: 'Documentation Generator - Parses doc comments (/** */) into HTML API documentation.' },
    { name: 'jdb', label: 'jdb', desc: 'Java Debugger - Command-line interactive debugging and breakpoint analysis tool.' },
    { name: 'etc...', label: 'etc...', desc: 'Diagnostic & profiling utilities including javap, jstat, jstack, and jconsole.' }
  ];

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0B132B] via-[#070D1F] to-[#040711] shadow-2xl space-y-6">
      {/* Visualizer Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-md shadow-cyan-900/30">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Interactive JDK Architecture Diagram</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                  JDK ⊃ JRE ⊃ JVM
                </span>
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Click any component to inspect details, or click <strong>Simulate Lifecycle</strong> to watch animated program execution.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={startSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 transition disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? `Step ${activeStep}/6 Executing...` : 'Simulate Lifecycle'}</span>
          </button>
          <button
            onClick={resetSimulation}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
            title="Reset Architecture Diagram"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Live Simulation Banner */}
      {isSimulating && (
        <div className="p-3 rounded-2xl bg-cyan-950/50 border border-cyan-500/50 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>{simulationSteps[activeStep - 1]?.label}</span>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-900 text-cyan-200">
            {activeStep} / 6
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EXACT AUTHENTIC DIAGRAM: (JDK) Java Development Kit */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-7 rounded-3xl border-2 border-cyan-500/50 bg-[#070F22]/90 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Glow ambient header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-900/60 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
              (JDK) Java Development kit
            </h2>
          </div>
          <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/80">
            JDK = JRE + Development Tools
          </span>
        </div>

        {/* Two Main Columns: JRE on Left, Development Tools on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ================================================================= */}
          {/* LEFT: JRE (Java Runtime Environment) - 8 Cols */}
          {/* ================================================================= */}
          <div 
            onClick={() => setActiveElement({ title: 'JRE (Java Runtime Environment)', desc: 'Provides the minimum runtime environment required for executing a Java application. Contains JVM + Java Package Classes + Runtime Libraries.' })}
            className={`lg:col-span-8 p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer ${
              activeStep === 2 || activeStep === 5
                ? 'border-cyan-400 bg-cyan-950/40 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/40'
                : 'border-cyan-700/60 bg-[#0A1835]/90 hover:border-cyan-500'
            }`}
          >
            <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-extrabold text-white">
                  JRE (Java Runtime Environment)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-300 px-2 py-0.5 rounded-lg bg-cyan-950 border border-cyan-800">
                JRE = JVM + Libraries
              </span>
            </div>

            {/* JRE Internal Split: JVM (Left) + Java Package Classes & Runtime Libraries (Right) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              
              {/* JVM (Java Virtual Machine) */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveElement({ title: 'JVM (Java Virtual Machine)', desc: 'Abstract computing machine that loads, verifies, allocates memory, and executes bytecode via Interpreter and Just-In-Time (JIT) Compiler.' });
                }}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col justify-between space-y-3 ${
                  activeStep === 3 || activeStep === 4 || activeStep === 6
                    ? 'border-purple-400 bg-purple-950/50 shadow-lg shadow-purple-500/30 ring-1 ring-purple-400'
                    : 'border-purple-600/50 bg-[#12112C]/90 hover:border-purple-400'
                }`}
              >
                <div className="flex items-center justify-between border-b border-purple-900/50 pb-2">
                  <div className="flex items-center gap-1.5 font-extrabold text-sm text-purple-300">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span>JVM</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-300">Virtual Machine</span>
                </div>

                <div className="space-y-2.5">
                  {/* Class Loader */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveElement({ title: 'Class Loader', desc: 'Loads .class files into memory, links (verifies bytecode for security), and initializes static data.' });
                    }}
                    className={`p-2.5 rounded-xl border transition flex items-center gap-2.5 ${
                      activeStep === 3 
                        ? 'bg-purple-600 text-white border-purple-300 animate-pulse font-bold shadow-md' 
                        : 'bg-purple-950/40 border-purple-900/60 text-purple-200 hover:bg-purple-900/50'
                    }`}
                  >
                    <FolderOpen className="w-3.5 h-3.5 text-purple-300" />
                    <span className="text-xs font-semibold">Class loader</span>
                  </div>

                  {/* Memory Areas */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveElement({ title: 'Memory Areas (JVM Runtime Data)', desc: 'Method Area (Metaspace), Heap (objects), JVM Stacks (frames & local vars), PC Registers, and Native Stacks.' });
                    }}
                    className={`p-2.5 rounded-xl border transition flex items-center gap-2.5 ${
                      activeStep === 4 
                        ? 'bg-purple-600 text-white border-purple-300 animate-pulse font-bold shadow-md' 
                        : 'bg-purple-950/40 border-purple-900/60 text-purple-200 hover:bg-purple-900/50'
                    }`}
                  >
                    <Database className="w-3.5 h-3.5 text-purple-300" />
                    <span className="text-xs font-semibold">Memory areas</span>
                  </div>

                  {/* Execution Engine */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveElement({ title: 'Execution Engine', desc: 'Contains Interpreter (line-by-line), Tiered JIT Compiler (native assembly conversion), and Garbage Collector (automatic heap memory reclamation).' });
                    }}
                    className={`p-2.5 rounded-xl border transition flex items-center gap-2.5 ${
                      activeStep === 6 
                        ? 'bg-purple-600 text-white border-purple-300 animate-bounce font-bold shadow-md' 
                        : 'bg-purple-950/40 border-purple-900/60 text-purple-200 hover:bg-purple-900/50'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-purple-300" />
                    <span className="text-xs font-semibold">Execution Engine</span>
                  </div>
                </div>
              </div>

              {/* JRE Right Sub-Column: Package Classes & Runtime Libraries */}
              <div className="flex flex-col justify-between gap-3">
                {/* Java Package Classes */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveElement({ title: 'Java Package Classes', desc: 'Pre-compiled standard classes organized into packages: java.lang (automatic), java.util (Collections), java.io (Streams), java.net (Sockets), java.sql (JDBC).' });
                  }}
                  className={`p-4 rounded-xl border-2 transition-all flex-1 flex flex-col justify-center ${
                    activeStep === 5
                      ? 'border-cyan-300 bg-cyan-900/60 text-white shadow-md shadow-cyan-500/20'
                      : 'border-cyan-800/60 bg-[#0B2144]/90 text-cyan-200 hover:border-cyan-400'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                    <BookOpen className="w-4 h-4 text-cyan-300" />
                    <span>Java Package Classes</span>
                  </div>
                  <p className="text-[11px] text-cyan-200/80 font-mono">
                    java.lang, java.util, java.io, java.net
                  </p>
                </div>

                {/* Runtime Libraries */}
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveElement({ title: 'Runtime Libraries', desc: 'Core binary support libraries and archive files (e.g. rt.jar, security modules, charset converters) required at execution time.' });
                  }}
                  className={`p-4 rounded-xl border-2 transition-all flex-1 flex flex-col justify-center ${
                    activeStep === 5
                      ? 'border-cyan-300 bg-cyan-900/60 text-white shadow-md shadow-cyan-500/20'
                      : 'border-cyan-800/60 bg-[#0B2144]/90 text-cyan-200 hover:border-cyan-400'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                    <Layers className="w-4 h-4 text-cyan-300" />
                    <span>Runtime Libraries</span>
                  </div>
                  <p className="text-[11px] text-cyan-200/80 font-mono">
                    rt.jar, JDBC, Security, Charsets
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT: Development Tools - 4 Cols */}
          {/* ================================================================= */}
          <div 
            onClick={() => setActiveElement({ title: 'Development Tools', desc: 'Core command-line utilities included in the JDK used by developers for writing, compiling, debugging, archiving, and monitoring Java applications.' })}
            className={`lg:col-span-4 p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
              activeStep === 1
                ? 'border-amber-400 bg-amber-950/40 shadow-xl shadow-amber-500/20 ring-2 ring-amber-400/40'
                : 'border-cyan-800/60 bg-[#0A1A38]/90 hover:border-cyan-500'
            }`}
          >
            <div className="border-b border-cyan-900/60 pb-3 mb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>Development Tools</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">JDK CLI Utilities</span>
            </div>

            {/* List of Tools Matching the Exact Reference Diagram */}
            <div className="space-y-2">
              {devToolsList.map(tool => {
                const isTarget = activeStep === 1 && tool.name === 'javac';
                return (
                  <div
                    key={tool.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveElement({ title: `Tool: ${tool.name}`, desc: tool.desc });
                    }}
                    className={`p-2 sm:p-2.5 rounded-xl border transition flex items-center justify-between ${
                      isTarget
                        ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold shadow-lg shadow-amber-500/30 scale-105 animate-pulse'
                        : 'bg-slate-900/80 border-cyan-900/60 text-slate-200 hover:border-amber-500/60 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span className="font-mono text-xs font-bold">• {tool.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-sans">Click to inspect</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Element Detail Drawer / Inspector */}
      {activeElement && (
        <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 flex items-start gap-3.5 shadow-xl animate-in fade-in duration-200">
          <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>{activeElement.title}</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{activeElement.desc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
