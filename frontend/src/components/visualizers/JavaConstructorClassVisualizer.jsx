import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Cpu, Layers, Play, Pause, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  FileCode, Check, Server, Database, Code, Users, HelpCircle, Lock, Unlock,
  Sliders, RefreshCw, Activity, ArrowDown, AlertTriangle
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaConstructorClassVisualizer
 * High-Yield Interactive Constructor Class Architecture Theater:
 * 1. 4 Core Pillars of Constructor Class (Metadata, Dynamic Instantiation, Private Access, Modern Best Practices)
 * 2. Step-by-Step Animated Constructor.newInstance() Simulation
 * 3. Singleton Attack & Defense Laboratory
 * 4. Interactive Assessment Quiz
 */
export default function JavaConstructorClassVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('pillars'); // 'pillars' | 'animation' | 'singleton' | 'quiz'
  const [selectedPillar, setSelectedPillar] = useState('1'); // '1' | '2' | '3' | '4'

  // ANIMATED INSTANTIATION STATE
  const [selectedCtorType, setSelectedCtorType] = useState('param'); // 'param' | 'default'
  const [inputName, setInputName] = useState('John');
  const [inputAge, setInputAge] = useState(25);
  const [isAccessibleEnabled, setIsAccessibleEnabled] = useState(true);

  const [animStep, setAnimStep] = useState(1); // 1: Lookup, 2: Access Gate, 3: Heap Allocate, 4: <init> Exec, 5: Live Object
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1500); // ms per step

  const timerRef = useRef(null);

  // Auto-play animation timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setAnimStep(prev => {
          if (prev >= 5) {
            setIsPlaying(false);
            return 5;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, playbackSpeed]);

  const handlePlayPause = () => {
    if (animStep >= 5) {
      setAnimStep(1);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleResetAnim = () => {
    setIsPlaying(false);
    setAnimStep(1);
  };

  // 4 Core Pillars Data (Matching User's Student Program)
  const constructorPillarsData = [
    {
      id: '1',
      num: '1',
      title: '1. Constructor Metadata Inspection',
      badge: 'getName, getParameterTypes & getModifiers',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      description: 'The Constructor class allows inspecting all constructor declarations, parameter signature types, and access modifiers dynamically at runtime.',
      code: `import java.lang.reflect.*;

class Student {
    public Student(String name, int age) {}
    private Student() {}
}

public class Main {
    public static void main(String[] args) {
        Class<?> c = Student.class;

        for (Constructor<?> constructor : c.getDeclaredConstructors()) {
            System.out.println("Constructor Name: " + constructor.getName());
            System.out.println("Modifiers: " + Modifier.toString(constructor.getModifiers()));

            Class<?>[] params = constructor.getParameterTypes();
            System.out.print("Parameter Types: ");
            for (Class<?> p : params) System.out.print(p.getSimpleName() + " ");
            System.out.println("\\n");
        }
    }
}`,
      output: `Constructor Name: Student\nModifiers: private\nParameter Types: \n\nConstructor Name: Student\nModifiers: public\nParameter Types: String int `,
      diagram: "Student.class ──► getDeclaredConstructors() ──► [private Student(), public Student(String, int)]"
    },
    {
      id: '2',
      num: '2',
      title: '2. Dynamic Object Instantiation via newInstance()',
      badge: 'constructor.newInstance(initargs...)',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'Dynamically creates a brand new instance on the JVM Heap by executing constructor bytecode with the provided initialization arguments.',
      code: `import java.lang.reflect.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Class<Student> c = Student.class;
        Constructor<Student> ctor = c.getConstructor(String.class, int.class);

        // Dynamically instantiate Student with "John", 25
        Student s = ctor.newInstance("John", 25);
        s.display();
    }
}`,
      output: `Name: John, Age: 25`,
      diagram: "ctor.newInstance('John', 25) ──► Allocates Heap Slot @0x7B12 ──► Returns Student Instance"
    },
    {
      id: '3',
      num: '3',
      title: '3. Private Constructor Bypass: setAccessible(true)',
      badge: 'Bypassing private Encapsulation',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      description: 'Private constructors throw IllegalAccessException if instantiated reflectively. Calling constructor.setAccessible(true) bypasses access checks, enabling frameworks to construct instances.',
      code: `import java.lang.reflect.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Class<?> c = Student.class;
        Constructor<?> defaultCtor = c.getDeclaredConstructor();

        // Suppress private access check
        defaultCtor.setAccessible(true);

        // Create object using private constructor
        Object obj = defaultCtor.newInstance();
        Method displayMethod = c.getMethod("display");
        displayMethod.invoke(obj);
    }
}`,
      output: `Name: Default, Age: 0`,
      diagram: "defaultCtor.setAccessible(true) ──► Unlocks Private Door ──► Instantiates Default Object"
    },
    {
      id: '4',
      num: '4',
      title: '4. Constructor.newInstance() vs Class.newInstance()',
      badge: 'Modern Java 9+ Standard',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: 'Class.newInstance() was deprecated in Java 9 because it only works for no-arg constructors and silently bypasses checked exceptions. Constructor.newInstance() is the modern official standard.',
      code: `// ❌ DEPRECATED (Java 9+):
// Student s1 = Student.class.newInstance(); 

// ✅ RECOMMENDED & MODERN:
Constructor<Student> ctor = Student.class.getDeclaredConstructor(String.class, int.class);
Student s2 = ctor.newInstance("John", 25);`,
      output: `// Constructor.newInstance() supports any parameter list and wraps checked errors into InvocationTargetException`,
      diagram: "Class.newInstance() [Deprecated] ──► Upgrade to ──► Constructor.newInstance(args...)"
    }
  ];

  const currentPillar = constructorPillarsData.find(p => p.id === selectedPillar) || constructorPillarsData[0];

  // SINGLETON LAB STATE
  const [singletonInstanceCount, setSingletonInstanceCount] = useState(1);
  const [isDefenseActive, setIsDefenseActive] = useState(false);
  const [singletonLogs, setSingletonLogs] = useState([
    'Singleton.getInstance() -> Returned canonical instance @0x100A'
  ]);

  const handleSingletonAttack = () => {
    if (isDefenseActive) {
      setSingletonLogs(prev => [
        ...prev,
        '⚠️ [SECURITY SHIELD ACTIVATED] Constructor threw IllegalStateException: Singleton instance already exists!',
        'Reflection instantiation attack blocked successfully! Instance count remains: ' + singletonInstanceCount
      ]);
      return;
    }

    const nextId = singletonInstanceCount + 1;
    const fakeAddr = '0x' + (0x100A + nextId * 0x33).toString(16).toUpperCase();
    setSingletonInstanceCount(nextId);
    setSingletonLogs(prev => [
      ...prev,
      `🚨 [SINGLETON BREACHED] ctor.setAccessible(true) invoked!`,
      `Created duplicate instance #${nextId} @${fakeAddr} on the JVM Heap!`
    ]);
  };

  // Quiz Questions Data
  const quizData = [
    {
      id: 1,
      question: "Why was Class.newInstance() deprecated in Java 9 in favor of Constructor.newInstance()?",
      options: [
        { id: 'a', text: 'Class.newInstance() was too fast for JVM JIT compiler' },
        { id: 'b', text: 'Class.newInstance() only supports zero-arg constructors and bypasses checked exception handling', isCorrect: true },
        { id: 'c', text: 'Constructor.newInstance() uses less memory on the Heap' },
        { id: 'd', text: 'Class.newInstance() cannot create public objects' }
      ],
      explanation: "Class.newInstance() was deprecated in Java 9 because it cannot handle parameterized constructors and propagates checked exceptions without declaring them."
    },
    {
      id: 2,
      question: "How can you defend a Singleton class against reflection-based multiple instantiation attacks?",
      options: [
        { id: 'a', text: 'Throw an IllegalStateException inside the private constructor if an instance already exists (or use an Enum Singleton)', isCorrect: true },
        { id: 'b', text: 'Mark the Singleton class as abstract' },
        { id: 'c', text: 'Make the constructor public' },
        { id: 'd', text: 'Reflection attacks on Singletons cannot be defended' }
      ],
      explanation: "Throwing an exception inside the private constructor when instance != null blocks reflection attacks. Enum singletons are also natively immune because the JVM prohibits reflective enum creation."
    },
    {
      id: 3,
      question: "Which method is used to discover all constructors (both public and private) declared directly in a class?",
      options: [
        { id: 'a', text: 'clazz.getConstructors()' },
        { id: 'b', text: 'clazz.getDeclaredConstructors()', isCorrect: true },
        { id: 'c', text: 'clazz.getAllConstructors()' },
        { id: 'd', text: 'clazz.getPublicConstructors()' }
      ],
      explanation: "clazz.getDeclaredConstructors() returns all constructors declared in the class (public, private, protected, default). clazz.getConstructors() returns ONLY public constructors."
    }
  ];

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  return (
    <div className="space-y-6">
      {/* 1. Header Theater Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B1222] via-[#080D1A] to-[#050811] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 flex items-center gap-1.5 shadow-sm">
              <Code className="w-3.5 h-3.5" />
              <span>java.lang.reflect.Constructor&lt;T&gt;</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-950/80 border border-purple-500/40 text-purple-300">
              Java 21 LTS Engine
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
              Executable &amp; Member
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Dynamic Object Instantiation &amp; Constructor Theater</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            The <code className="text-cyan-300 font-mono">Constructor</code> class enables dynamic inspection of constructor parameters, modifiers, and runtime allocation and initialization of live objects via <code className="text-cyan-300 font-mono">constructor.newInstance(initargs...)</code>.
          </p>
        </div>
      </div>

      {/* 2. Main Visualizer Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#090E1A] border border-slate-800/90 shadow-inner">
        <button
          onClick={() => setActiveTab('pillars')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'pillars'
              ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. The 4 Core Pillars</span>
        </button>

        <button
          onClick={() => setActiveTab('animation')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'animation'
              ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>2. Live Instantiation Animation</span>
        </button>

        <button
          onClick={() => setActiveTab('singleton')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'singleton'
              ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>3. Singleton Attack &amp; Defense Lab</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>4. Knowledge Quiz</span>
        </button>
      </div>

      {/* TAB 1: 4 CORE PILLARS */}
      {activeTab === 'pillars' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* 4 Clickable Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {constructorPillarsData.map(pillar => {
              const isSelected = selectedPillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setSelectedPillar(pillar.id)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-br from-cyan-950/80 to-indigo-950/60 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-[#090E1A]/90 border-slate-800/80 hover:border-slate-700 hover:bg-[#0D1424]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center">
                      {pillar.num}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">{pillar.title}</h4>
                </button>
              );
            })}
          </div>

          {/* Selected Pillar Architecture Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#090E1A]/95 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  Pillar {currentPillar.num} Architecture Deep Dive
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">{currentPillar.title}</h3>
              </div>
              <span className={`text-xs font-mono px-3 py-1 rounded-full border ${currentPillar.badgeColor}`}>
                {currentPillar.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {currentPillar.description}
            </p>

            {/* Architecture Pipeline Mini Diagram */}
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-xs text-cyan-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{currentPillar.diagram}</span>
            </div>

            {/* Code Viewer with Java 21 LTS Badge */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Code2 className="w-4 h-4" />
                  <span>Production Java Implementation</span>
                </span>
                <span>Java 21 LTS</span>
              </div>
              <UltraModernCodeViewer
                code={currentPillar.code}
                language="java"
                title={`${currentPillar.title}.java`}
                expectedOutput={currentPillar.output}
                onOpenPlayground={onOpenPlayground}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE STEP-BY-STEP INSTANTIATION ANIMATION */}
      {activeTab === 'animation' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#090E1A]/95 shadow-2xl space-y-6 animate-in fade-in duration-300">
          
          {/* Header & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                  <Activity className="w-5 h-5 animate-pulse" />
                </span>
                <h3 className="text-lg font-bold text-white">Live Constructor.newInstance() Instantiation Theater</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Watch the JVM dynamically resolve, allocate Heap memory, execute &lt;init&gt; bytecode, and return a live object!
              </p>
            </div>

            {/* Animation Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePlayPause}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : (animStep >= 5 ? 'Replay' : 'Play Animation')}</span>
              </button>

              <button
                type="button"
                onClick={handleResetAnim}
                className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                title="Reset Animation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 text-[11px] font-mono text-slate-300">
                <span>Speed:</span>
                <button
                  type="button"
                  onClick={() => setPlaybackSpeed(2000)}
                  className={`px-1.5 py-0.5 rounded ${playbackSpeed === 2000 ? 'bg-cyan-950 text-cyan-300 font-bold' : 'text-slate-400'}`}
                >
                  1x
                </button>
                <button
                  type="button"
                  onClick={() => setPlaybackSpeed(1000)}
                  className={`px-1.5 py-0.5 rounded ${playbackSpeed === 1000 ? 'bg-cyan-950 text-cyan-300 font-bold' : 'text-slate-400'}`}
                >
                  2x
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Constructor Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            {/* Constructor Select */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Target Constructor:
              </label>
              <select
                value={selectedCtorType}
                onChange={(e) => { setSelectedCtorType(e.target.value); setAnimStep(1); }}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none cursor-pointer"
              >
                <option value="param">public Student(String, int)</option>
                <option value="default">private Student() [Default]</option>
              </select>
            </div>

            {/* Inputs Config */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Constructor Arguments:
              </label>
              {selectedCtorType === 'param' ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                    placeholder="name"
                  />
                  <input
                    type="number"
                    value={inputAge}
                    onChange={(e) => setInputAge(Number(e.target.value))}
                    className="w-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                    placeholder="age"
                  />
                </div>
              ) : (
                <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono">
                  No arguments (0 params)
                </div>
              )}
            </div>

            {/* Accessibility Toggle */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                setAccessible(true):
              </label>
              <button
                type="button"
                onClick={() => setIsAccessibleEnabled(!isAccessibleEnabled)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-between border transition cursor-pointer ${
                  isAccessibleEnabled
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                    : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {isAccessibleEnabled ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{isAccessibleEnabled ? 'Enabled' : 'Disabled'}</span>
                </span>
                <span className="text-[10px] uppercase font-sans font-normal opacity-80">Toggle</span>
              </button>
            </div>
          </div>

          {/* 5-Step Animated Visual Pipeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>Instantiating Pipeline (Step {animStep} of 5)</span>
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map(step => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => { setAnimStep(step); setIsPlaying(false); }}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition cursor-pointer flex items-center justify-center ${
                      animStep === step
                        ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/40 scale-110'
                        : animStep > step
                        ? 'bg-cyan-950 border border-cyan-500/40 text-cyan-400'
                        : 'bg-slate-900 border border-slate-800 text-slate-500'
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>

            {/* Pipeline Stage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* STAGE 1: METASPACE LOOKUP */}
              <div className={`p-4 rounded-2xl border transition-all ${
                animStep === 1
                  ? 'bg-cyan-950/80 border-cyan-400 shadow-xl shadow-cyan-500/30 scale-105 ring-2 ring-cyan-400/50'
                  : animStep > 1
                  ? 'bg-slate-900/90 border-cyan-500/30 text-slate-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-cyan-400">1. Metaspace</span>
                  {animStep > 1 && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </div>
                <div className="text-xs font-bold text-white font-mono truncate">
                  Student({selectedCtorType === 'param' ? 'String, int' : ''})
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Resolve Constructor in Metaspace.
                </p>
              </div>

              {/* STAGE 2: ACCESS CONTROL GATE */}
              <div className={`p-4 rounded-2xl border transition-all ${
                animStep === 2
                  ? selectedCtorType === 'default' && !isAccessibleEnabled
                    ? 'bg-rose-950/90 border-rose-500 shadow-xl shadow-rose-500/40 scale-105 ring-2 ring-rose-500/50'
                    : 'bg-purple-950/80 border-purple-400 shadow-xl shadow-purple-500/30 scale-105 ring-2 ring-purple-400/50'
                  : animStep > 2
                  ? 'bg-slate-900/90 border-purple-500/30 text-slate-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-purple-400">2. Security Gate</span>
                  {animStep > 2 && <Check className="w-3.5 h-3.5 text-purple-400" />}
                </div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  {selectedCtorType === 'default' ? (
                    isAccessibleEnabled ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span>{selectedCtorType === 'default' ? (isAccessibleEnabled ? 'Bypassed' : 'BLOCKED') : 'Public OK'}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Verify private access modifiers.
                </p>
              </div>

              {/* STAGE 3: HEAP MEMORY ALLOCATION */}
              <div className={`p-4 rounded-2xl border transition-all ${
                animStep === 3
                  ? 'bg-indigo-950/80 border-indigo-400 shadow-xl shadow-indigo-500/30 scale-105 ring-2 ring-indigo-400/50'
                  : animStep > 3
                  ? 'bg-slate-900/90 border-indigo-500/30 text-slate-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-indigo-400">3. Heap Alloc</span>
                  {animStep > 3 && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
                <div className="text-xs font-bold text-white font-mono truncate">
                  Eden Space @0x7B12
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Allocate raw memory slot on Heap.
                </p>
              </div>

              {/* STAGE 4: <INIT> BYTECODE EXECUTION */}
              <div className={`p-4 rounded-2xl border transition-all ${
                animStep === 4
                  ? 'bg-emerald-950/80 border-emerald-400 shadow-xl shadow-emerald-500/30 scale-105 ring-2 ring-emerald-400/50'
                  : animStep > 4
                  ? 'bg-slate-900/90 border-emerald-500/30 text-slate-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-emerald-400">4. &lt;init&gt; Exec</span>
                  {animStep > 4 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-xs font-bold text-white font-mono truncate">
                  {selectedCtorType === 'param' ? `name="${inputName}", age=${inputAge}` : `name="Default", age=0`}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Initialize instance fields.
                </p>
              </div>

              {/* STAGE 5: LIVE OBJECT REFERENCE */}
              <div className={`p-4 rounded-2xl border transition-all ${
                animStep === 5
                  ? 'bg-amber-950/80 border-amber-400 shadow-xl shadow-amber-500/30 scale-105 ring-2 ring-amber-400/50'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-amber-400">5. Live Object</span>
                </div>
                <div className="text-xs font-bold text-amber-300 font-mono truncate">
                  {selectedCtorType === 'default' && !isAccessibleEnabled ? (
                    'IllegalAccessException'
                  ) : (
                    'Student @ 0x7B12'
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Return initialized instance.
                </p>
              </div>
            </div>
          </div>

          {/* Live Stage Explanation Banner */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Step {animStep} Detailed Explanation:</span>
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {animStep === 1 && `The JVM searches the Metaspace symbol table of Student.class for the constructor matching parameter signature (${selectedCtorType === 'param' ? 'String.class, int.class' : 'no-arg'}).`}
              {animStep === 2 && (selectedCtorType === 'default' && !isAccessibleEnabled ? `Security Check Failed: The constructor is private and setAccessible(true) was not invoked. The JVM throws IllegalAccessException and aborts object instantiation.` : `Security Check Passed: The constructor is accessible (either declared public or setAccessible(true) bypassed access checks).`)}
              {animStep === 3 && `The JVM Memory Allocator reserves a raw memory block in Eden Space (@0x7B12) sized specifically for Student fields (String reference + 32-bit int age).`}
              {animStep === 4 && `The constructor bytecode <init> executes: assigns this.name = "${selectedCtorType === 'param' ? inputName : 'Default'}" and this.age = ${selectedCtorType === 'param' ? inputAge : 0}.`}
              {animStep === 5 && `Object construction complete! The live reference to Student@0x7B12 is returned to the caller, ready to invoke display() -> Name: ${selectedCtorType === 'param' ? inputName : 'Default'}, Age: ${selectedCtorType === 'param' ? inputAge : 0}.`}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: SINGLETON LAB */}
      {activeTab === 'singleton' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#090E1A]/95 shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Singleton Breaker &amp; Defense Laboratory</h3>
                <p className="text-xs text-slate-400">See how Reflection bypasses private constructors to break Singletons, and how to defend your architecture!</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Control Panel */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live Singleton Instances</span>
                <span className={`text-sm font-mono font-bold px-3 py-1 rounded-full border ${
                  singletonInstanceCount > 1 
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300' 
                    : 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                }`}>
                  {singletonInstanceCount} {singletonInstanceCount === 1 ? 'Instance (Valid)' : 'Instances (VIOLATED)'}
                </span>
              </div>

              {/* Defense Toggle */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Singleton Defense Shield</div>
                  <div className="text-[10px] text-slate-400">Throws IllegalStateException in private constructor</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDefenseActive(!isDefenseActive)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                    isDefenseActive
                      ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                      : 'bg-slate-800 border border-slate-700 text-slate-400'
                  }`}
                >
                  {isDefenseActive ? 'Active' : 'Inactive'}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSingletonAttack}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/25 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Launch Reflection Attack</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setSingletonInstanceCount(1); setSingletonLogs(['Reset to canonical instance @0x100A']); }}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition cursor-pointer"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Live Attack Stream Log */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold block flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>Security Audit Log</span>
              </span>
              <div className="p-3.5 rounded-2xl bg-[#040810] border border-slate-800 font-mono text-xs max-h-48 overflow-y-auto space-y-1.5">
                {singletonLogs.map((log, idx) => (
                  <div key={idx} className={`leading-relaxed ${
                    log.includes('VIOLATED') || log.includes('BREACHED') ? 'text-rose-400 font-bold' :
                    log.includes('SHIELD') || log.includes('blocked') ? 'text-emerald-300 font-bold' :
                    'text-slate-300'
                  }`}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE KNOWLEDGE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#090E1A]/95 shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Reflection Constructor Class Assessment</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">3 Questions</span>
          </div>

          <div className="space-y-6">
            {quizData.map(q => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="text-xs sm:text-sm font-bold text-white">
                  {q.id}. {q.question}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map(opt => {
                    const isSelected = quizAnswers[q.id] === opt.id;
                    const showCorrect = quizSubmitted && opt.isCorrect;
                    const showWrong = quizSubmitted && isSelected && !opt.isCorrect;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                        className={`p-3 rounded-xl text-left text-xs font-mono border transition cursor-pointer flex items-center justify-between ${
                          showCorrect
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold'
                            : showWrong
                            ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                            : isSelected
                            ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {showCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 leading-relaxed font-mono">
                    <span className="text-cyan-400 font-bold">Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setQuizSubmitted(true)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition cursor-pointer active:scale-98"
              >
                Submit Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
