import React, { useState, useEffect, useRef } from 'react';
import { 
  Layers, Play, Pause, RotateCcw, FastForward, CheckCircle2, 
  Sparkles, Code2, Terminal, HelpCircle, Lightbulb, Box, 
  ArrowRight, ShieldCheck, ChevronRight, Zap, Eye, Cpu
} from 'lucide-react';

export default function JavaStructureVisualizer() {
  const [activeTab, setActiveTab] = useState('anatomy'); // 'anatomy', 'animation', 'sandbox'
  const [selectedLayer, setSelectedLayer] = useState('main-method');
  
  // Animation state
  const [animStep, setAnimStep] = useState(0); // 0 = idle, 1..6 = steps
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [logs, setLogs] = useState([]);
  
  // Sandbox state
  const [carModel, setCarModel] = useState('Tata Nexon');
  const [carYear, setCarYear] = useState('2020');
  const [greetingName, setGreetingName] = useState('Deepak');
  const [sandboxOutput, setSandboxOutput] = useState('');
  const [isSandboxRunning, setIsSandboxRunning] = useState(false);

  const animationTimerRef = useRef(null);

  const layers = {
    'package': {
      id: 'package',
      section: '1. Package Declaration',
      isOptional: true,
      tag: 'Optional Statement',
      tagColor: 'bg-amber-950/80 text-amber-300 border-amber-800',
      syntax: 'package packageName;',
      example: 'package com.example.myapp;',
      purpose: 'Groups related classes into namespaces and prevents naming collisions in large projects.',
      rule: 'If present, it MUST be the very first non-comment line in the source file.',
      lineNumbers: [1, 2],
      color: 'amber'
    },
    'imports': {
      id: 'imports',
      section: '2. Import Statements',
      isOptional: true,
      tag: 'If Necessary',
      tagColor: 'bg-blue-950/80 text-blue-300 border-blue-800',
      syntax: 'import packageName.ClassName;  // or import packageName.*;',
      example: 'import java.util.Scanner;\nimport java.util.*;',
      purpose: 'Imports built-in or external classes so you can reuse them without typing fully qualified names.',
      rule: 'Placed after package and before class. java.lang.* is imported automatically by default.',
      lineNumbers: [4, 5],
      color: 'blue'
    },
    'class-def': {
      id: 'class-def',
      section: '3. Class Definition Statements',
      isOptional: false,
      tag: 'Mandatory',
      tagColor: 'bg-purple-950/80 text-purple-300 border-purple-800',
      syntax: 'class ClassName { // members }',
      example: 'public class Car {\n    // Class members\n}',
      purpose: 'The fundamental blueprint for all Java objects and logic. Every Java program requires at least one class.',
      rule: 'If public, the filename must match the class name (Car.java). At least one class must contain main().',
      lineNumbers: [7, 43],
      color: 'purple'
    },
    'variables': {
      id: 'variables',
      section: '3.1 Variables Declaration Statements',
      isOptional: true,
      tag: 'Class Member (Optional)',
      tagColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800',
      syntax: 'dataType variableName = value;',
      example: 'String model = "Tata Nexon";  // Field\nint year = 2020;              // Field',
      purpose: 'Stores data and state for object instances (fields) or methods (local variables).',
      rule: 'Instance variables get default values (null, 0, false) if not explicitly initialized.',
      lineNumbers: [9, 10],
      color: 'emerald'
    },
    'constructor': {
      id: 'constructor',
      section: '3.2 Constructors Declaration Statements',
      isOptional: true,
      tag: 'Class Member (Optional)',
      tagColor: 'bg-rose-950/80 text-rose-300 border-rose-800',
      syntax: 'ClassName(parameters) { // body }',
      example: 'public Car() {\n    System.out.println("Constructor called!");\n}',
      purpose: 'Special block used to initialize newly created objects when "new Car()" is invoked.',
      rule: 'Same name as class. NO return type. If omitted, Java provides a default no-argument constructor.',
      lineNumbers: [13, 14, 15],
      color: 'rose'
    },
    'methods': {
      id: 'methods',
      section: '3.3 Methods Declaration Statements',
      isOptional: true,
      tag: 'Class Member (Behaviors)',
      tagColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-800',
      syntax: 'accessModifier returnType methodName(params) { // body }',
      example: 'public void start() {\n    System.out.println("Car Started");\n}',
      purpose: 'Defines the actions, operations, and behaviors that objects can perform.',
      rule: 'Can be overloaded. Returns void if no value is produced, or a specific type (int, String).',
      lineNumbers: [18, 19, 20],
      color: 'cyan'
    },
    'main-method': {
      id: 'main-method',
      section: '3.4 Main Method',
      isOptional: false,
      tag: 'JVM Entry Point',
      tagColor: 'bg-amber-500 text-slate-950 font-bold',
      syntax: 'public static void main(String[] args) { // code }',
      example: 'public static void main(String[] args) {\n    System.out.println("Hello Deepak...!!");\n}',
      purpose: 'The starting execution launchpad searched by the JVM when the application runs.',
      rule: 'Must be public, static, and return void. Accepts String[] CLI arguments.',
      lineNumbers: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
      color: 'amber'
    }
  };

  const currentLayer = layers[selectedLayer] || layers['main-method'];

  // Animation Steps Definition
  const animSteps = [
    {
      step: 1,
      title: "1. Package Namespace Discovery",
      badge: "JVM Classpath Search",
      desc: "JVM checks package 'com.example.myapp' and maps it to directory 'com/example/myapp/' on disk.",
      highlight: 'package',
      log: "[JVM] Resolving package declaration: com.example.myapp"
    },
    {
      step: 2,
      title: "2. Import Linking & Bytecode Verification",
      badge: "Dependency Resolution",
      desc: "ClassLoader loads standard Java utilities (java.util.Scanner) and links system references.",
      highlight: 'imports',
      log: "[ClassLoader] Loaded dependencies: java.util.Scanner, java.lang.* (auto-imported)"
    },
    {
      step: 3,
      title: "3. Class Metadata Loading into Metaspace",
      badge: "Metaspace Allocation",
      desc: "JVM reads Car.class, verifies bytecode format (Magic 0xCAFEBABE), and creates Class<Car> object in Metaspace.",
      highlight: 'class-def',
      log: "[Metaspace] Verified class definition: public class Car loaded successfully"
    },
    {
      step: 4,
      title: "4. JVM Main Method Invocation",
      badge: "Execution Launchpad",
      desc: "JVM locates 'public static void main(String[] args)' and pushes the main stack frame onto the Main Thread Stack.",
      highlight: 'main-method',
      log: "[Main-Thread] Pushing stack frame: Car.main(String[] args)\n[Console Output] Hello Deepak...!!"
    },
    {
      step: 5,
      title: "5. Object Instantiation & Constructor Execution",
      badge: "Heap Allocation",
      desc: "Statement 'new Car()' allocates Heap memory, sets fields (model='Tata Nexon', year=2020), and executes Car() constructor.",
      highlight: 'constructor',
      log: "[Heap] Allocated instance at 0x7f4a2 (model='Tata Nexon', year=2020)\n[Console Output] Constructor called!"
    },
    {
      step: 6,
      title: "6. Method Dispatch & Program Completion",
      badge: "Dynamic Dispatch",
      desc: "Invokes 'myCar.start()' on the object instance, printing 'Car Started' to the terminal output console.",
      highlight: 'methods',
      log: "[Dynamic-Dispatch] Invoking myCar.start()\n[Console Output] Car Started\n[Process] Program finished with exit code 0"
    }
  ];

  // Animation controller
  useEffect(() => {
    if (isPlaying) {
      const stepDuration = 2200 / playbackSpeed;
      animationTimerRef.current = setTimeout(() => {
        if (animStep < animSteps.length) {
          const nextStep = animStep + 1;
          setAnimStep(nextStep);
          const currentStepObj = animSteps[nextStep - 1];
          setSelectedLayer(currentStepObj.highlight);
          setLogs(prev => [...prev, currentStepObj.log]);
        } else {
          setIsPlaying(false);
        }
      }, stepDuration);
    }
    return () => clearTimeout(animationTimerRef.current);
  }, [isPlaying, animStep, playbackSpeed]);

  const handleStartAnimation = () => {
    setAnimStep(1);
    setIsPlaying(true);
    setSelectedLayer(animSteps[0].highlight);
    setLogs([animSteps[0].log]);
  };

  const handlePauseAnimation = () => {
    setIsPlaying(false);
  };

  const handleResumeAnimation = () => {
    if (animStep >= animSteps.length) {
      handleStartAnimation();
    } else {
      setIsPlaying(true);
    }
  };

  const handleResetAnimation = () => {
    setIsPlaying(false);
    setAnimStep(0);
    setLogs([]);
    setSelectedLayer('main-method');
  };

  const handleStepForward = () => {
    if (animStep < animSteps.length) {
      const nextStep = animStep + 1;
      setAnimStep(nextStep);
      const currentStepObj = animSteps[nextStep - 1];
      setSelectedLayer(currentStepObj.highlight);
      setLogs(prev => [...prev, currentStepObj.log]);
    }
  };

  const handleStepBackward = () => {
    if (animStep > 1) {
      const prevStep = animStep - 1;
      setAnimStep(prevStep);
      const currentStepObj = animSteps[prevStep - 1];
      setSelectedLayer(currentStepObj.highlight);
      setLogs(prev => prev.slice(0, prevStep));
    } else if (animStep === 1) {
      handleResetAnimation();
    }
  };

  const runSandbox = () => {
    setIsSandboxRunning(true);
    setSandboxOutput('Compiling Car.java and executing main()...');
    setTimeout(() => {
      setSandboxOutput(
        `Hello ${greetingName}...!!\n` +
        `----------------------------------------\n` +
        `Constructor called!\n` +
        `Car Started\n` +
        `Car Specifications -> Model: ${carModel} | Year: ${carYear}\n` +
        `\n[Process completed in 18ms with exit code 0]`
      );
      setIsSandboxRunning(false);
    }, 450);
  };

  const isHighlighted = (lineNo) => {
    return currentLayer.lineNumbers.includes(lineNo);
  };

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0F172A] via-[#0B1222] to-[#070B14] shadow-2xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-gradient-to-br from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-500/25">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                Structure of Java Program — Interactive Studio
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Java 21 Architecture
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Explore the standardized 4-part anatomy, watch the animated JVM execution flow, and run custom code.
              </p>
            </div>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          {[
            { id: 'anatomy', label: '1. Visual Anatomy Lens', icon: Eye },
            { id: 'animation', label: '2. Mini Animation Flow', icon: Play },
            { id: 'sandbox', label: '3. Quick Playground', icon: Code2 },
          ].map(t => {
            const Icon = t.icon;
            const isCur = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isCur 
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-600/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODE 1: VISUAL ANATOMY LENS */}
      {activeTab === 'anatomy' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Interactive Hierarchical Structure Diagram */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Structural Blueprint</span>
                <span className="text-[10px] text-cyan-400 font-normal">Click any block to inspect</span>
              </div>

              {/* 1. Package Box */}
              <button
                onClick={() => setSelectedLayer('package')}
                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                  selectedLayer === 'package'
                    ? 'border-amber-400 bg-amber-950/40 text-amber-200 shadow-lg shadow-amber-950/50 ring-2 ring-amber-400/30'
                    : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-amber-950 border border-amber-600 text-amber-400 font-mono text-xs flex items-center justify-center font-bold">1</span>
                  <div>
                    <div className="text-xs font-bold text-white">Package Declaration</div>
                    <div className="text-[10px] font-mono text-amber-400">package com.example.myapp;</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">Optional</span>
              </button>

              {/* 2. Imports Box */}
              <button
                onClick={() => setSelectedLayer('imports')}
                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                  selectedLayer === 'imports'
                    ? 'border-blue-400 bg-blue-950/40 text-blue-200 shadow-lg shadow-blue-950/50 ring-2 ring-blue-400/30'
                    : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-blue-950 border border-blue-600 text-blue-400 font-mono text-xs flex items-center justify-center font-bold">2</span>
                  <div>
                    <div className="text-xs font-bold text-white">Import Statements</div>
                    <div className="text-[10px] font-mono text-blue-400">import java.util.Scanner;</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-800">If Needed</span>
              </button>

              {/* 3. Class Definition Container (Wrapper) */}
              <div className="p-4 rounded-3xl border-2 border-purple-500/40 bg-purple-950/10 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedLayer('class-def')}
                    className="flex items-center gap-2 text-left group"
                  >
                    <span className="w-6 h-6 rounded-lg bg-purple-950 border border-purple-500 text-purple-300 font-mono text-xs flex items-center justify-center font-bold">3</span>
                    <span className="text-xs font-extrabold text-white group-hover:text-purple-300 transition">
                      Class Definition: <code className="text-purple-300 font-mono">public class Car</code>
                    </span>
                  </button>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">Mandatory</span>
                </div>

                <div className="text-[11px] font-mono text-slate-400 px-1">
                  // Class Members (Inside Class Body):
                </div>

                {/* 3.1 Variables */}
                <button
                  onClick={() => setSelectedLayer('variables')}
                  className={`w-full text-left p-2.5 pl-3 rounded-xl border transition-all flex items-center justify-between ${
                    selectedLayer === 'variables'
                      ? 'border-emerald-400 bg-emerald-950/60 text-emerald-200 shadow-md ring-1 ring-emerald-400'
                      : 'border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] flex items-center justify-center font-bold">3.1</span>
                    <div>
                      <div className="text-[11px] font-bold text-white">Variables (Fields / State)</div>
                      <div className="text-[9px] font-mono text-emerald-400">String model = "Tata Nexon"; int year = 2020;</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">Fields</span>
                </button>

                {/* 3.2 Constructors */}
                <button
                  onClick={() => setSelectedLayer('constructor')}
                  className={`w-full text-left p-2.5 pl-3 rounded-xl border transition-all flex items-center justify-between ${
                    selectedLayer === 'constructor'
                      ? 'border-rose-400 bg-rose-950/60 text-rose-200 shadow-md ring-1 ring-rose-400'
                      : 'border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-rose-950 text-rose-300 font-mono text-[10px] flex items-center justify-center font-bold">3.2</span>
                    <div>
                      <div className="text-[11px] font-bold text-white">Constructors (Initialization)</div>
                      <div className="text-[9px] font-mono text-rose-400">public Car() &#123; System.out.println("..."); &#125;</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">No Return Type</span>
                </button>

                {/* 3.3 Methods */}
                <button
                  onClick={() => setSelectedLayer('methods')}
                  className={`w-full text-left p-2.5 pl-3 rounded-xl border transition-all flex items-center justify-between ${
                    selectedLayer === 'methods'
                      ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200 shadow-md ring-1 ring-cyan-400'
                      : 'border-slate-800 bg-slate-900/90 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px] flex items-center justify-center font-bold">3.3</span>
                    <div>
                      <div className="text-[11px] font-bold text-white">Methods (Behaviors / Actions)</div>
                      <div className="text-[9px] font-mono text-cyan-400">public void start() &#123; ... &#125;</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">Behaviors</span>
                </button>

                {/* 3.4 Main Method */}
                <button
                  onClick={() => setSelectedLayer('main-method')}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all flex items-center justify-between ${
                    selectedLayer === 'main-method'
                      ? 'border-amber-400 bg-amber-950/80 text-amber-200 shadow-lg shadow-amber-950/60 ring-2 ring-amber-400'
                      : 'border-amber-600/50 bg-amber-950/30 text-amber-100 hover:border-amber-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-amber-500 text-slate-950 font-mono text-[10px] flex items-center justify-center font-bold">3.4</span>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Main Method</span>
                        <span className="px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 text-[8px] font-bold uppercase font-mono">Entry Point</span>
                      </div>
                      <div className="text-[9px] font-mono text-amber-300">public static void main(String[] args)</div>
                    </div>
                  </div>
                  <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                </button>
              </div>
            </div>

            {/* Right: Code Lens & Component Deep Breakdown */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Selected Layer Info Card */}
              <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{currentLayer.section}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${currentLayer.tagColor}`}>
                      {currentLayer.tag}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Lines: {currentLayer.lineNumbers[0]} - {currentLayer.lineNumbers[currentLayer.lineNumbers.length - 1]}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-300">Purpose: </span>
                    <span className="text-slate-300">{currentLayer.purpose}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400 font-sans font-bold">Syntax</div>
                    <div className="whitespace-pre-wrap">{currentLayer.syntax}</div>
                  </div>

                  <div className="text-[11px] text-slate-300 flex items-start gap-1.5 pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-emerald-300">Important Rule:</strong> {currentLayer.rule}</span>
                  </div>
                </div>
              </div>

              {/* Code Preview with Live Highlighting */}
              <div className="rounded-2xl bg-black border border-slate-800 overflow-hidden font-mono text-xs shadow-inner">
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Car.java (Standard Structure)</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Synced with Lens</span>
                </div>

                <div className="p-4 max-h-[340px] overflow-y-auto space-y-0.5 leading-relaxed select-text">
                  {[
                    { n: 1, text: '// 1. Package Declaration Statement (Optional)' },
                    { n: 2, text: 'package com.example.myapp;' },
                    { n: 3, text: '' },
                    { n: 4, text: '// 2. Import Statements (If Necessary)' },
                    { n: 5, text: 'import java.util.Scanner;' },
                    { n: 6, text: '' },
                    { n: 7, text: '// 3. Class Definition Statements' },
                    { n: 8, text: 'public class Car {' },
                    { n: 9, text: '    // 3.1 Variables Declaration Statements (Optional)' },
                    { n: 10, text: '    String model = "Tata Nexon";         // Field' },
                    { n: 11, text: '    int year = 2020;                     // Field' },
                    { n: 12, text: '' },
                    { n: 13, text: '    // 3.2 Constructors Declaration Statements (Optional)' },
                    { n: 14, text: '    public Car() {' },
                    { n: 15, text: '        System.out.println("Constructor called!");' },
                    { n: 16, text: '    }' },
                    { n: 17, text: '' },
                    { n: 18, text: '    // 3.3 Methods Declaration Statements [Class Members]' },
                    { n: 19, text: '    public void start() {' },
                    { n: 20, text: '        System.out.println("Car Started");' },
                    { n: 21, text: '    }' },
                    { n: 22, text: '' },
                    { n: 23, text: '    // 3.4 Main Method [Class Members] - Program Entry Point' },
                    { n: 24, text: '    public static void main(String[] args) {' },
                    { n: 25, text: '        System.out.println("Hello Deepak...!!");' },
                    { n: 26, text: '        ' },
                    { n: 27, text: '        // Create an object using Constructor' },
                    { n: 28, text: '        Car myCar = new Car();' },
                    { n: 29, text: '        ' },
                    { n: 30, text: '        // Invoke Method on Object' },
                    { n: 31, text: '        myCar.start();' },
                    { n: 32, text: '        ' },
                    { n: 33, text: '        System.out.println("Model: " + myCar.model);' },
                    { n: 34, text: '    }' },
                    { n: 35, text: '}' },
                  ].map(line => {
                    const active = isHighlighted(line.n);
                    return (
                      <div
                        key={line.n}
                        className={`flex items-center px-2 py-0.5 rounded font-mono transition-colors ${
                          active 
                            ? 'bg-cyan-500/20 text-cyan-200 border-l-2 border-cyan-400 font-semibold' 
                            : 'text-slate-400 hover:bg-slate-900/60'
                        }`}
                      >
                        <span className="w-6 text-[10px] text-slate-400 select-none text-right mr-3 shrink-0">
                          {line.n}
                        </span>
                        <span className="whitespace-pre">{line.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODE 2: MINI ANIMATION (JVM EXECUTION FLOW) */}
      {activeTab === 'animation' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Animation Playback Controls Bar */}
          <div className="p-4 rounded-2xl bg-[#070B14] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {!isPlaying ? (
                <button
                  onClick={animStep === 0 || animStep >= animSteps.length ? handleStartAnimation : handleResumeAnimation}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:opacity-90 transition flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{animStep === 0 ? 'Start Mini Animation' : 'Resume Flow'}</span>
                </button>
              ) : (
                <button
                  onClick={handlePauseAnimation}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/25 hover:opacity-90 transition flex items-center gap-2"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Animation</span>
                </button>
              )}

              <button
                onClick={handleStepBackward}
                disabled={animStep <= 0}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition"
                title="Step Backward"
              >
                <FastForward className="w-4 h-4 rotate-180" />
              </button>

              <button
                onClick={handleStepForward}
                disabled={animStep >= animSteps.length}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition"
                title="Step Forward"
              >
                <FastForward className="w-4 h-4" />
              </button>

              <button
                onClick={handleResetAnimation}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                title="Reset Animation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Speed & Progress Indicator */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1">
                <span className="text-slate-400">Speed:</span>
                {[1, 1.5, 2].map(spd => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      playbackSpeed === spd 
                        ? 'bg-cyan-500 text-slate-950' 
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
              <span className="text-cyan-400 font-bold">
                Step {animStep} of {animSteps.length}
              </span>
            </div>
          </div>

          {/* 6-Step Visual Pipeline Timeline */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {animSteps.map((st) => {
              const isActive = animStep === st.step;
              const isPassed = animStep > st.step;

              return (
                <div
                  key={st.step}
                  onClick={() => {
                    setAnimStep(st.step);
                    setSelectedLayer(st.highlight);
                    setLogs(prev => [...prev.slice(0, st.step - 1), st.log]);
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-center relative ${
                    isActive
                      ? 'border-cyan-400 bg-cyan-950/50 shadow-xl shadow-cyan-500/20 scale-105 ring-2 ring-cyan-400/40'
                      : isPassed
                      ? 'border-emerald-500/60 bg-emerald-950/30 text-emerald-300'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="w-7 h-7 rounded-xl bg-slate-950 border border-slate-800 mx-auto flex items-center justify-center mb-1.5 text-xs font-mono font-bold">
                    {isPassed ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : st.step}
                  </div>
                  <div className="text-[11px] font-bold text-white truncate">{st.title.split('. ')[1]}</div>
                  <div className="text-[9px] font-mono text-cyan-300/80 truncate mt-0.5">{st.badge}</div>

                  {isActive && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.2 rounded-full text-[8px] font-mono font-bold bg-cyan-400 text-slate-950 animate-pulse">
                      EXECUTING
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Step Details & Live Terminal Output */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Step Explanation Card */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-[#070B14] border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
                  Active Execution Stage
                </span>
                {animStep > 0 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {animSteps[animStep - 1]?.badge}
                  </span>
                )}
              </div>

              {animStep > 0 ? (
                <div className="space-y-2">
                  <h4 className="text-base font-extrabold text-white">
                    {animSteps[animStep - 1]?.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {animSteps[animStep - 1]?.desc}
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                    <span className="text-slate-400">Target Element: </span>
                    <strong className="text-amber-400">{layers[animSteps[animStep - 1]?.highlight]?.section}</strong>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 space-y-2">
                  <Zap className="w-8 h-8 text-cyan-400 mx-auto animate-pulse" />
                  <p className="text-xs">Click <strong>Start Mini Animation</strong> above to watch how the JVM discovers, loads, and executes each part of the Java program structure.</p>
                </div>
              )}
            </div>

            {/* Synchronized Terminal Output */}
            <div className="lg:col-span-6 rounded-2xl bg-black border border-slate-800 p-4 font-mono text-xs space-y-2 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>JVM Console Output Stream</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">LIVE STDOUT</span>
              </div>

              <div className="min-h-[140px] max-h-[180px] overflow-y-auto space-y-1.5 pt-1 text-[11px]">
                {logs.length > 0 ? (
                  logs.map((lg, i) => (
                    <div key={i} className="text-emerald-300/90 whitespace-pre-wrap flex items-start gap-1.5">
                      <span className="text-slate-400 select-none">&gt;</span>
                      <span>{lg}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-400 italic pt-6 text-center">
                    Awaiting JVM execution start...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: QUICK SANDBOX & RUNNER */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Customizable Parameters */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-[#070B14] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Modify Java Program Values
                </span>
                <span className="text-[10px] font-mono text-cyan-400">Live Test</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">3.4 main() Greeting Name:</label>
                  <input
                    type="text"
                    value={greetingName}
                    onChange={(e) => setGreetingName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 outline-none"
                    placeholder="e.g. Deepak"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">3.1 Variable Field (model):</label>
                  <input
                    type="text"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 outline-none"
                    placeholder="e.g. Tata Nexon"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">3.1 Variable Field (year):</label>
                  <input
                    type="text"
                    value={carYear}
                    onChange={(e) => setCarYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 outline-none"
                    placeholder="e.g. 2020"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={runSandbox}
                    disabled={isSandboxRunning}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isSandboxRunning ? 'Running on JVM...' : 'Execute Java Program'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Generated Output */}
            <div className="lg:col-span-7 rounded-2xl bg-black border border-slate-800 p-5 font-mono text-xs space-y-3 shadow-inner flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>Execution Output Console</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Exit Code: 0</span>
                </div>

                <div className="pt-3 min-h-[140px] text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {sandboxOutput || (
                    <span className="text-slate-400 italic">
                      Click "Execute Java Program" to compile and run with your custom values.
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 font-sans">
                💡 Notice how the Constructor <code className="text-rose-300 font-mono">Car()</code> executes first when <code className="text-cyan-300 font-mono">new Car()</code> is invoked, followed by method <code className="text-cyan-300 font-mono">start()</code>!
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
