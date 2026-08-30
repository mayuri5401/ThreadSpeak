import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  User, Droplets, Volume2, GitMerge, FileCode, Check, RefreshCw, Layers2
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaPolymorphismVisualizer
 * High-Yield Interactive Polymorphism Simulator:
 * 1. Compile-Time Polymorphism (Static Binding / Method Overloading)
 * 2. Runtime Polymorphism (Dynamic Binding / Upcasting & Method Overriding)
 * 3. Real-World "Many Forms" Morphing Entity Simulator
 * 4. Master Comparison Matrix (Compile-Time vs Runtime)
 */
export default function JavaPolymorphismVisualizer() {
  const [activeTab, setActiveTab] = useState('types'); // 'types' | 'morph' | 'dynamic-dispatch' | 'matrix'
  const [selectedPolyType, setSelectedPolyType] = useState('runtime');
  const [personRole, setPersonRole] = useState('teacher'); // 'teacher' | 'father' | 'son'
  const [dispatchStep, setDispatchStep] = useState(0);

  // Polymorphism Types Data
  const polyTypes = [
    {
      id: 'compile-time',
      name: '1. Compile-Time Polymorphism',
      aliases: 'Static Binding / Early Binding',
      mechanism: 'Method Overloading',
      badge: 'Resolved by javac (Compile-Time)',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      definition: 'The Java Compiler binds the method call to the specific method body at compile-time based on the method signature (name + parameter types).',
      code: `class Calculator {
    // Overloaded Method 1: (int, int)
    void add(int a, int b) {
        System.out.println("Sum (int): " + (a + b));
    }

    // Overloaded Method 2: (double, double)
    void add(double a, double b) {
        System.out.println("Sum (double): " + (a + b));
    }
}

public class MainApp {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        // Compiler checks signature at compile-time:
        calc.add(5, 10);     // Binds to add(int, int)
        calc.add(5.5, 4.5);  // Binds to add(double, double)
    }
}`,
      output: `Sum (int): 15\nSum (double): 10.0`,
      explanation: 'No runtime lookup is required! The compiled bytecode already contains the exact method signature (INVOKEVIRTUAL Calculator.add(II)V vs add(DD)V).'
    },
    {
      id: 'runtime',
      name: '2. Runtime Polymorphism',
      aliases: 'Dynamic Binding / Late Binding / Virtual Dispatch',
      mechanism: 'Method Overriding & Upcasting',
      badge: 'Resolved by JVM (Runtime)',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      definition: 'The JVM determines which overridden method to execute at runtime based on the actual object created in the Heap, regardless of the reference type.',
      code: `class Animal {
    void makeSound() {
        System.out.println("Some generic animal sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks: Woof! Woof!");
    }
}

public class MainApp {
    public static void main(String[] args) {
        // Upcasting: Parent reference holding Child object
        Animal obj = new Dog();

        // JVM resolves method dynamically at runtime:
        obj.makeSound(); // Calls Dog's overridden method!
    }
}`,
      output: `Dog barks: Woof! Woof!`,
      explanation: 'At compile-time, javac only checks that Animal has a makeSound() method. At runtime, the JVM inspects the heap object (@0x7F2A of type Dog) and invokes Dog.makeSound()!'
    }
  ];

  // Dynamic Dispatch Stepper Frames
  const dispatchFrames = [
    {
      step: 1,
      title: "Step 1: Upcasting (Animal obj = new Dog())",
      badge: "Reference & Heap Allocation",
      stack: "obj (Type: Animal Reference)",
      heap: "Dog Object allocated at @0x7F2A",
      desc: "Reference variable 'obj' is created of type Animal on the Stack, pointing to a concrete Dog instance in the Heap.",
      callout: "Upcasting allows writing generic, extensible code that operates on the parent abstraction while supporting any subclass implementation."
    },
    {
      step: 2,
      title: "Step 2: Invoking obj.makeSound()",
      badge: "Virtual Method Invocation",
      stack: "obj.makeSound() triggered",
      heap: "JVM looks at object header at @0x7F2A",
      desc: "Client code calls obj.makeSound(). The JVM does NOT simply invoke Animal's method; it checks the actual runtime object class.",
      callout: "The JVM uses the INVOKEVIRTUAL bytecode instruction to query the virtual method table (vtable)."
    },
    {
      step: 3,
      title: "Step 3: vtable Method Resolution & Execution",
      badge: "Dynamic Binding Complete",
      stack: "Dog.makeSound() executed",
      heap: "Output: 'Dog barks: Woof! Woof!'",
      desc: "The JVM discovers Dog overrides makeSound(). It dispatches execution directly to Dog.makeSound().",
      callout: "This fulfills the Open/Closed Principle: you can add Cat or Bird subclasses without altering the caller code!"
    }
  ];

  // Person "Many Forms" Data
  const personRolesData = {
    teacher: {
      role: "Teacher (At Work / School)",
      behavior: "Delivering Java lectures & grading coding assignments",
      color: "border-blue-500 text-blue-300 bg-blue-950/60",
      quote: `"Today we will learn Polymorphism and Virtual Method Tables!"`
    },
    father: {
      role: "Father (At Home / Family)",
      behavior: "Cooking dinner and helping children with homework",
      color: "border-emerald-500 text-emerald-300 bg-emerald-950/60",
      quote: `"Let's play soccer in the garden after dinner!"`
    },
    son: {
      role: "Son (With Parents / Grandparents)",
      behavior: "Listening respectfully and helping parents with chores",
      color: "border-amber-500 text-amber-300 bg-amber-950/60",
      quote: `"I have brought the groceries you asked for!"`
    }
  };

  const currentType = polyTypes.find(t => t.id === selectedPolyType) || polyTypes[0];
  const currentDispatchFrame = dispatchFrames[dispatchStep];
  const currentRole = personRolesData[personRole];

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Polymorphism & Dynamic Dispatch Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Polymorphism in Java (Many Forms)
          </h3>
        </div>

        {/* Master Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('types')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'types'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5" />
            <span>Compile-Time vs Runtime</span>
          </button>

          <button
            onClick={() => setActiveTab('dynamic-dispatch')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'dynamic-dispatch'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Dynamic Dispatch (Upcasting)</span>
          </button>

          <button
            onClick={() => setActiveTab('morph')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'morph'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>"Many Forms" Analogy</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'matrix'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers2 className="w-3.5 h-3.5" />
            <span>Master Matrix</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: COMPILE-TIME vs RUNTIME POLYMORPHISM                           */}
      {/* ===================================================================== */}
      {activeTab === 'types' && (
        <div className="space-y-6 relative z-10">
          
          {/* 2 Type Switcher Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {polyTypes.map(t => {
              const isSelected = selectedPolyType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedPolyType(t.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 space-y-1.5 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white tracking-tight">{t.name}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${t.badgeColor}`}>
                      {t.mechanism}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block line-clamp-1">{t.aliases}</span>
                </button>
              );
            })}
          </div>

          {/* Active Polymorphism Code & Details */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Code Viewer (7 cols) */}
            <div className="xl:col-span-7 space-y-2 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{currentType.name} Program</span>
                </span>
                <span>Java 21</span>
              </div>
              <UltraModernCodeViewer code={currentType.code} />
            </div>

            {/* Right: Theory Breakdown & Console (5 cols) */}
            <div className="xl:col-span-5 space-y-4 min-w-0">
              
              {/* Theory Card */}
              <div className="p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-3 shadow-inner">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${currentType.badgeColor}`}>
                  {currentType.badge}
                </span>

                <h4 className="text-base font-bold text-white leading-snug">
                  {currentType.name}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentType.definition}
                </p>

                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200">
                  <strong className="text-cyan-300 block mb-0.5">JVM Execution Insight:</strong>
                  <span className="text-slate-300">{currentType.explanation}</span>
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
                  {currentType.output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: DYNAMIC DISPATCH & UPCASTING STEPPER                           */}
      {/* ===================================================================== */}
      {activeTab === 'dynamic-dispatch' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>How Runtime Polymorphism Works (Virtual Method Table)</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When you write <code>Animal obj = new Dog(); obj.makeSound();</code>, Java dynamically resolves the method at runtime using dynamic dispatch. Step through the 3-phase flow below:
            </p>
          </div>

          {/* Stepper Header Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
                {currentDispatchFrame.badge}
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {currentDispatchFrame.title}
              </h4>
              <p className="text-xs text-slate-300 max-w-xl">
                {currentDispatchFrame.desc}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDispatchStep(Math.max(0, dispatchStep - 1))}
                disabled={dispatchStep === 0}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-cyan-300 font-bold px-2">
                Step {dispatchStep + 1} of {dispatchFrames.length}
              </span>

              <button
                onClick={() => setDispatchStep(Math.min(dispatchFrames.length - 1, dispatchStep + 1))}
                disabled={dispatchStep === dispatchFrames.length - 1}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setDispatchStep(0)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stepper Architecture Split: Stack Reference -> JVM Dispatch -> Heap Object */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
            
            {/* Stack Frame */}
            <div className="p-5 rounded-2xl bg-[#060D1A] border border-cyan-500/40 space-y-3 shadow-inner">
              <span className="text-cyan-400 font-bold block pb-2 border-b border-slate-800">
                1. Thread Stack (Reference Variable)
              </span>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-1">
                <span className="text-slate-500 text-[11px] block">Reference Type: Animal</span>
                <strong className="text-cyan-300">{currentDispatchFrame.stack}</strong>
              </div>
            </div>

            {/* Heap Object & vtable */}
            <div className="p-5 rounded-2xl bg-[#061413] border border-emerald-500/40 space-y-3 shadow-inner">
              <span className="text-emerald-400 font-bold block pb-2 border-b border-emerald-900/60">
                2. JVM Heap Object & Virtual Dispatch Table
              </span>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-1">
                <span className="text-slate-500 text-[11px] block">Actual Object Instance: Dog</span>
                <strong className="text-emerald-300">{currentDispatchFrame.heap}</strong>
              </div>
            </div>
          </div>

          {/* Why Callout */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
            <strong className="text-cyan-300 font-bold block">💡 Architectural Value:</strong>
            <p className="leading-relaxed">{currentDispatchFrame.callout}</p>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: REAL-WORLD "MANY FORMS" MORPHING ENTITY SIMULATOR              */}
      {/* ===================================================================== */}
      {activeTab === 'morph' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>Polymorphism</strong> comes from Greek: <em>Poly</em> (Many) + <em>Morph</em> (Forms). A single entity adopts different behaviors depending on the context!
          </div>

          {/* 3 Role Switchers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.keys(personRolesData).map(roleKey => {
              const r = personRolesData[roleKey];
              const isSelected = personRole === roleKey;
              return (
                <button
                  key={roleKey}
                  onClick={() => setPersonRole(roleKey)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 space-y-1 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold text-white block">{r.role}</span>
                  <span className="text-[11px] text-slate-400 block line-clamp-1">{r.behavior}</span>
                </button>
              );
            })}
          </div>

          {/* Morphing Entity Card */}
          <div className="p-6 rounded-3xl bg-[#060B16] border border-cyan-500/40 space-y-4 text-center shadow-inner">
            <div className="inline-flex p-4 rounded-2xl bg-slate-950 border border-slate-800 text-cyan-400 shadow-inner">
              <User className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-1">
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${currentRole.color}`}>
                Active Form: {currentRole.role}
              </span>
              <h4 className="text-base sm:text-lg font-extrabold text-white pt-2">
                Behavior: {currentRole.behavior}
              </h4>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-xl mx-auto italic text-cyan-300 text-xs sm:text-sm">
              {currentRole.quote}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: MASTER MATRIX (COMPILE-TIME VS RUNTIME)                         */}
      {/* ===================================================================== */}
      {activeTab === 'matrix' && (
        <div className="space-y-6 relative z-10">
          
          <div className="rounded-2xl border border-slate-800 overflow-hidden bg-[#040711] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Feature</th>
                    <th className="p-3.5 text-blue-400">Compile-Time Polymorphism</th>
                    <th className="p-3.5 text-emerald-400">Runtime Polymorphism</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300 text-[11.5px]">
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-slate-400">Also Known As</td>
                    <td className="p-3.5 text-cyan-300">Static Binding / Early Binding</td>
                    <td className="p-3.5 text-emerald-300">Dynamic Binding / Late Binding</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-slate-400">Achieved Via</td>
                    <td className="p-3.5 font-bold text-white">Method Overloading</td>
                    <td className="p-3.5 font-bold text-white">Method Overriding & Upcasting</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-slate-400">Decision Maker</td>
                    <td className="p-3.5 text-blue-300">Java Compiler (javac)</td>
                    <td className="p-3.5 text-emerald-300">Java Virtual Machine (JVM)</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-slate-400">Resolution Basis</td>
                    <td className="p-3.5">Method signature + Reference type</td>
                    <td className="p-3.5">Actual runtime object in Heap</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-slate-400">Execution Speed</td>
                    <td className="p-3.5 text-emerald-400">Faster (Resolved at compile time)</td>
                    <td className="p-3.5 text-amber-300">Slight vtable lookup overhead</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-slate-400">OOP Principle</td>
                    <td className="p-3.5">Convenience & Readability</td>
                    <td className="p-3.5 text-cyan-300">Open/Closed Principle (Extensibility)</td>
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
