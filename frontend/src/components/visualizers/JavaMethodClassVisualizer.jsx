import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Cpu, Layers, Play, Pause, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  FileCode, Check, Server, Database, Code, Users, HelpCircle, Lock, Unlock,
  Sliders, RefreshCw, Activity, ArrowDown
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaMethodClassVisualizer
 * High-Yield Interactive Method Class Architecture Theater:
 * 1. 4 Core Pillars of Method Class (Metadata, Dynamic Invocation, Access Control Bypass, Exception Unboxing)
 * 2. Step-by-Step Animated Dynamic Dispatch Simulation (Metaspace -> Security Gate -> Argument Push -> Heap Dispatch -> Result)
 * 3. getMethod() vs getDeclaredMethod() Comparison Matrix
 * 4. Interactive Assessment Quiz
 */
export default function JavaMethodClassVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('pillars'); // 'pillars' | 'animation' | 'comparison' | 'quiz'
  const [selectedPillar, setSelectedPillar] = useState('1'); // '1' | '2' | '3' | '4'

  // ANIMATED DISPATCH SIMULATION STATE
  const [selectedMethodId, setSelectedMethodId] = useState('add');
  const [inputArg1, setInputArg1] = useState(10);
  const [inputArg2, setInputArg2] = useState(20);
  const [inputMsg, setInputMsg] = useState('Hello Reflection!');
  const [isAccessibleEnabled, setIsAccessibleEnabled] = useState(true);

  const [animStep, setAnimStep] = useState(1); // 1: Lookup, 2: Access Gate, 3: Arg Marshaling, 4: Heap Execution, 5: Result
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1500); // ms per step

  const timerRef = useRef(null);

  const methodsList = [
    {
      id: 'add',
      name: 'add',
      isPrivate: false,
      isStatic: false,
      returnType: 'int',
      params: 'int a, int b',
      signature: 'public int add(int a, int b)',
      desc: 'Public instance method calculating the sum of two integers.'
    },
    {
      id: 'display',
      name: 'display',
      isPrivate: true,
      isStatic: false,
      returnType: 'void',
      params: 'String msg',
      signature: 'private void display(String msg)',
      desc: 'Private instance method logging a message to the console.'
    },
    {
      id: 'computeTax',
      name: 'computeTax',
      isPrivate: false,
      isStatic: true,
      returnType: 'double',
      params: 'double amount, double rate',
      signature: 'public static double computeTax(double amount, double rate)',
      desc: 'Public static utility method computing tax percentage (target is null).'
    },
    {
      id: 'secretMultiply',
      name: 'secretMultiply',
      isPrivate: true,
      isStatic: false,
      returnType: 'int',
      params: 'int factor',
      signature: 'private int secretMultiply(int factor)',
      desc: 'Private instance method multiplying factor by secret key 42.'
    }
  ];

  const currentMethod = methodsList.find(m => m.id === selectedMethodId) || methodsList[0];

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

  // 4 Core Pillars Data
  const methodPillarsData = [
    {
      id: '1',
      num: '1',
      title: '1. Method Metadata & Signature Introspection',
      badge: 'getName, getReturnType & getParameterTypes',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      description: 'The Method class enables querying the method name, return type (Class object), array of parameter types, and language modifiers dynamically at runtime.',
      code: `import java.lang.reflect.*;

class Calculator {
    public int add(int a, int b) { return a + b; }
    private void display(String msg) { System.out.println("Message: " + msg); }
}

public class Main {
    public static void main(String[] args) {
        Class<?> c = Calculator.class;

        for (Method method : c.getDeclaredMethods()) {
            System.out.println("Method Name: " + method.getName());
            System.out.println("Return Type: " + method.getReturnType().getSimpleName());
            System.out.println("Modifiers: " + Modifier.toString(method.getModifiers()));

            Class<?>[] params = method.getParameterTypes();
            System.out.print("Parameters: ");
            for (Class<?> p : params) System.out.print(p.getSimpleName() + " ");
            System.out.println("\\n");
        }
    }
}`,
      output: `Method Name: add\nReturn Type: int\nModifiers: public\nParameters: int int \n\nMethod Name: display\nReturn Type: void\nModifiers: private\nParameters: String `,
      diagram: "Calculator.class ──► getDeclaredMethods() ──► [Method: add(int, int), Method: display(String)]"
    },
    {
      id: '2',
      num: '2',
      title: '2. Dynamic Invocation via method.invoke()',
      badge: 'invoke(Object target, Object... args)',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'Dynamic dispatch calls the bytecode entry point on the target heap instance. For static methods, pass null as the target object argument.',
      code: `import java.lang.reflect.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Calculator calc = new Calculator();
        Method addMethod = Calculator.class.getMethod("add", int.class, int.class);

        // Dynamically invoke on calc instance with args (10, 20)
        Object result = addMethod.invoke(calc, 10, 20);
        System.out.println("Invoked Result: " + result); // Returns 30
    }
}`,
      output: `Invoked Result: 30`,
      diagram: "Method.invoke(calc, 10, 20) ──► Target Calculator @0x4B21 ──► Returns 30 (Integer)"
    },
    {
      id: '3',
      num: '3',
      title: '3. Encapsulation Bypass: setAccessible(true)',
      badge: 'Bypassing private Modifiers',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      description: 'Private methods throw IllegalAccessException if called directly. Calling method.setAccessible(true) instructs the JVM security manager to bypass language access checks.',
      code: `import java.lang.reflect.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Calculator calc = new Calculator();
        Method displayMethod = Calculator.class.getDeclaredMethod("display", String.class);

        // Suppress private access check
        displayMethod.setAccessible(true);

        // Invoke private method
        displayMethod.invoke(calc, "Hello Reflection!");
    }
}`,
      output: `Message: Hello Reflection!`,
      diagram: "displayMethod.setAccessible(true) ──► Suppresses Access Check ──► Executes Private Method"
    },
    {
      id: '4',
      num: '4',
      title: '4. Exception Unboxing: InvocationTargetException',
      badge: 'e.getCause() Unwrapping',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: 'When the invoked target method throws a checked or runtime exception during execution, Reflection wraps it inside InvocationTargetException. Call e.getCause() to extract the real error.',
      code: `import java.lang.reflect.*;

class BankService {
    public void transfer(int amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive!");
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            BankService service = new BankService();
            Method m = BankService.class.getMethod("transfer", int.class);
            m.invoke(service, -500);
        } catch (InvocationTargetException e) {
            Throwable rootCause = e.getCause();
            System.out.println("Underlying Error: " + rootCause.getClass().getSimpleName() + " - " + rootCause.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`,
      output: `Underlying Error: IllegalArgumentException - Amount must be positive!`,
      diagram: "Target Throws Exception ──► Wrapped in InvocationTargetException ──► e.getCause() Extracts Root Error"
    }
  ];

  const currentPillar = methodPillarsData.find(p => p.id === selectedPillar) || methodPillarsData[0];

  // Quiz Questions Data
  const quizData = [
    {
      id: 1,
      question: "Which method is used to dynamically execute a Method object in Java Reflection?",
      options: [
        { id: 'a', text: 'method.execute(target, args)' },
        { id: 'b', text: 'method.invoke(target, args)', isCorrect: true },
        { id: 'c', text: 'method.call(target, args)' },
        { id: 'd', text: 'method.dispatch(target, args)' }
      ],
      explanation: "method.invoke(Object obj, Object... args) is the official Reflection API method to dynamically execute the underlying method on an object instance."
    },
    {
      id: 2,
      question: "How do you invoke a 'public static' method using the Method class?",
      options: [
        { id: 'a', text: 'Pass null as the first argument: method.invoke(null, args)', isCorrect: true },
        { id: 'b', text: 'Pass Class<?> as the first argument: method.invoke(Calculator.class, args)' },
        { id: 'c', text: 'Call method.invokeStatic(args)' },
        { id: 'd', text: 'Static methods cannot be invoked via Reflection' }
      ],
      explanation: "Because static methods belong to the class rather than an object instance, you pass 'null' as the target object in method.invoke(null, args...)."
    },
    {
      id: 3,
      question: "What exception is thrown when the target method itself encounters an unhandled exception during reflective execution?",
      options: [
        { id: 'a', text: 'NoSuchMethodException' },
        { id: 'b', text: 'InvocationTargetException', isCorrect: true },
        { id: 'c', text: 'IllegalAccessException' },
        { id: 'd', text: 'ClassNotFoundException' }
      ],
      explanation: "The JVM wraps any exception thrown by the invoked method inside a java.lang.reflect.InvocationTargetException, which can be inspected via e.getCause()."
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
              <span>java.lang.reflect.Method</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-950/80 border border-purple-500/40 text-purple-300">
              Java 21 LTS Engine
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
              Executable &amp; Member
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Dynamic Method Dispatch &amp; Invocation Theater</span>
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            The <code className="text-cyan-300 font-mono">Method</code> class enables dynamic introspection of method signatures, parameter types, modifiers, and runtime bytecode execution on any target object instance via <code className="text-cyan-300 font-mono">method.invoke(target, args...)</code>.
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
          <span>2. Interactive Dispatch Animation</span>
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'comparison'
              ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>3. getMethod vs getDeclaredMethod</span>
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
            {methodPillarsData.map(pillar => {
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

      {/* TAB 2: INTERACTIVE STEP-BY-STEP DISPATCH ANIMATION */}
      {activeTab === 'animation' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#090E1A]/95 shadow-2xl space-y-6 animate-in fade-in duration-300">
          
          {/* Header & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                  <Activity className="w-5 h-5 animate-pulse" />
                </span>
                <h3 className="text-lg font-bold text-white">Live Method.invoke() Step-by-Step Dispatch Animation</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Watch the JVM dynamically resolve, verify, bind arguments, and execute bytecode on the Heap instance!
              </p>
            </div>

            {/* Animation Player Controls */}
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

          {/* Interactive Method Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            {/* Method Select */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Target Method:
              </label>
              <select
                value={selectedMethodId}
                onChange={(e) => { setSelectedMethodId(e.target.value); setAnimStep(1); }}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none cursor-pointer"
              >
                {methodsList.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name}() [{m.isPrivate ? 'private' : 'public'}]
                  </option>
                ))}
              </select>
            </div>

            {/* Inputs Config */}
            <div>
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Input Arguments:
              </label>
              {currentMethod.id === 'add' && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputArg1}
                    onChange={(e) => setInputArg1(Number(e.target.value))}
                    className="w-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                    placeholder="a"
                  />
                  <input
                    type="number"
                    value={inputArg2}
                    onChange={(e) => setInputArg2(Number(e.target.value))}
                    className="w-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                    placeholder="b"
                  />
                </div>
              )}
              {currentMethod.id === 'display' && (
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                />
              )}
              {currentMethod.id === 'computeTax' && (
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputArg1}
                    onChange={(e) => setInputArg1(Number(e.target.value))}
                    className="w-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                    placeholder="amount"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={inputArg2}
                    onChange={(e) => setInputArg2(Number(e.target.value))}
                    className="w-1/2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                    placeholder="rate"
                  />
                </div>
              )}
              {currentMethod.id === 'secretMultiply' && (
                <input
                  type="number"
                  value={inputArg1}
                  onChange={(e) => setInputArg1(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                />
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
                <span>Execution Stages (Step {animStep} of 5)</span>
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
                <div className="text-xs font-bold text-white truncate">{currentMethod.name}()</div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Lookup Method metadata in <code className="text-cyan-300 font-mono">Calculator.class</code>.
                </p>
              </div>

              {/* STAGE 2: ACCESS CONTROL GATE */}
              <div className={`p-4 rounded-2xl border transition-all ${
                animStep === 2
                  ? currentMethod.isPrivate && !isAccessibleEnabled
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
                  {currentMethod.isPrivate ? (
                    isAccessibleEnabled ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                  <span>{currentMethod.isPrivate ? (isAccessibleEnabled ? 'Bypassed' : 'BLOCKED') : 'Public OK'}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Verify modifier permissions and accessibility state.
                </p>
              </div>

              {/* STAGE 3: ARGUMENT MARSHALING */}
              <div className={`p-4 rounded-2xl border transition-all ${
                animStep === 3
                  ? 'bg-indigo-950/80 border-indigo-400 shadow-xl shadow-indigo-500/30 scale-105 ring-2 ring-indigo-400/50'
                  : animStep > 3
                  ? 'bg-slate-900/90 border-indigo-500/30 text-slate-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-indigo-400">3. Marshaling</span>
                  {animStep > 3 && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
                <div className="text-xs font-bold text-white font-mono truncate">
                  {currentMethod.id === 'add' ? `(${inputArg1}, ${inputArg2})` : (currentMethod.id === 'display' ? `("${inputMsg}")` : `(${inputArg1}, ${inputArg2})`)}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Box arguments into <code className="text-indigo-300 font-mono">Object[]</code> array.
                </p>
              </div>

              {/* STAGE 4: HEAP INSTANCE DISPATCH */}
              <div className={`p-4 rounded-2xl border transition-all ${
                animStep === 4
                  ? 'bg-emerald-950/80 border-emerald-400 shadow-xl shadow-emerald-500/30 scale-105 ring-2 ring-emerald-400/50'
                  : animStep > 4
                  ? 'bg-slate-900/90 border-emerald-500/30 text-slate-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-emerald-400">4. Heap Dispatch</span>
                  {animStep > 4 && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-xs font-bold text-white font-mono truncate">
                  {currentMethod.isStatic ? 'null (static)' : 'calc @ 0x4B21'}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Execute bytecode on target instance on the Heap.
                </p>
              </div>

              {/* STAGE 5: RESULT UNBOXING */}
              <div className={`p-4 rounded-2xl border transition-all ${
                animStep === 5
                  ? 'bg-amber-950/80 border-amber-400 shadow-xl shadow-amber-500/30 scale-105 ring-2 ring-amber-400/50'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold text-amber-400">5. Return Value</span>
                </div>
                <div className="text-xs font-bold text-amber-300 font-mono truncate">
                  {currentMethod.isPrivate && !isAccessibleEnabled ? (
                    'IllegalAccessException'
                  ) : currentMethod.id === 'add' ? (
                    `Result: ${inputArg1 + inputArg2}`
                  ) : currentMethod.id === 'display' ? (
                    'void (Printed)'
                  ) : currentMethod.id === 'computeTax' ? (
                    `Result: ${(inputArg1 * inputArg2).toFixed(2)}`
                  ) : (
                    `Result: ${inputArg1 * 42}`
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Wrap primitive into Object wrapper.
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
              {animStep === 1 && `The JVM searches the Metaspace symbol table of Calculator.class for a method matching name "${currentMethod.name}" and parameter types (${currentMethod.params}). It loads the java.lang.reflect.Method instance.`}
              {animStep === 2 && (currentMethod.isPrivate && !isAccessibleEnabled ? `Access Check Failed: The method is private and setAccessible(true) was not invoked. The JVM throws IllegalAccessException and aborts execution.` : `Access Check Passed: The method is accessible (either declared public or setAccessible(true) suppressed modifier checks).`)}
              {animStep === 3 && `The JVM caller pushes the argument array Object[]{...} onto the execution frame, automatically auto-boxing primitive arguments into wrapper classes (e.g. int -> Integer).`}
              {animStep === 4 && (currentMethod.isStatic ? `Static Dispatch: Because the method is declared static, no instance is required. The JVM passes null and executes the class-level bytecode instructions directly.` : `Instance Dispatch: The JVM binds the execution to the target Heap object Calculator@0x4B21 and invokes the MethodAccessor stub.`)}
              {animStep === 5 && `The method returns its value. For primitive return types, the JVM boxes the result into an Object wrapper and hands it back to the caller.`}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: GETMETHOD VS GETDECLAREDMETHOD COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#090E1A]/95 shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">getMethod() vs getDeclaredMethod() Architecture Matrix</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="p-3">Feature</th>
                  <th className="p-3 text-cyan-300">Class.getMethod(name, params...)</th>
                  <th className="p-3 text-purple-300">Class.getDeclaredMethod(name, params...)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-sans">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-white">Access Scope</td>
                  <td className="p-3 text-slate-300 font-mono">ONLY public methods</td>
                  <td className="p-3 text-slate-300 font-mono">ALL access modifiers (public, private, protected, default)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-white">Inheritance</td>
                  <td className="p-3 text-slate-300 font-mono">Includes public inherited methods (from parent classes/interfaces)</td>
                  <td className="p-3 text-slate-300 font-mono">EXCLUDES inherited methods (only methods declared directly in this class)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-white">Security Check</td>
                  <td className="p-3 text-slate-300 font-mono">Standard language access rules</td>
                  <td className="p-3 text-slate-300 font-mono">Requires setAccessible(true) to invoke private methods</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-white">Method Plural Array</td>
                  <td className="p-3 text-cyan-400 font-mono">c.getMethods()</td>
                  <td className="p-3 text-purple-400 font-mono">c.getDeclaredMethods()</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE KNOWLEDGE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#090E1A]/95 shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Reflection Method Class Assessment</h3>
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
