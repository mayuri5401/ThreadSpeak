import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  Eye, EyeOff, ShieldAlert, Check, X, Car, Gauge, Sliders, AlertTriangle, Layers2
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaAbstractionVisualizer
 * High-Yield Interactive Abstraction Simulator:
 * 1. Real-World Car Dashboard vs Internal Engine Black-Box
 * 2. Before vs After Abstraction Architecture Comparator
 * 3. Abstract Method Contract Enforcement Engine
 * 4. Abstract Class Rules & Modifiers Compliance Matrix
 */
export default function JavaAbstractionVisualizer() {
  const [activeTab, setActiveTab] = useState('before-after'); // 'before-after' | 'car-analogy' | 'contract' | 'rules'
  const [activeCodeMode, setActiveCodeMode] = useState('with'); // 'without' | 'with'
  const [carAction, setCarAction] = useState('idle'); // 'idle' | 'accelerate' | 'steer' | 'brake'

  // Code for Without Abstraction vs With Abstraction
  const codeWithoutAbstraction = `// ❌ WITHOUT ABSTRACTION: Code duplication & no common contract
class Car {
    int no_of_tyres = 4;

    void displayTyres() {
        System.out.println("Car has " + no_of_tyres + " tyres.");
    }

    void start() {
        System.out.println("Car starts with a key ignition.");
    }
}

class Scooter {
    int no_of_tyres = 2;

    void displayTyres() {
        System.out.println("Scooter has " + no_of_tyres + " tyres.");
    }

    void start() {
        System.out.println("Scooter starts with a kick or self-start.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.displayTyres();
        myCar.start();

        System.out.println();

        Scooter myScooter = new Scooter();
        myScooter.displayTyres();
        myScooter.start();
    }
}`;

  const codeWithAbstraction = `// ✅ WITH ABSTRACTION: Clean inheritance, unified contract, polymorphism
abstract class Vehicle {
    int no_of_tyres;

    // Concrete method: Reusable logic across all vehicles
    void displayTyres() {
        System.out.println("This vehicle has " + no_of_tyres + " tyres.");
    }

    // Abstract method: Enforces customized implementation in all subclasses
    abstract void start();
}

class Car extends Vehicle {
    Car() { no_of_tyres = 4; }

    @Override
    void start() {
        System.out.println("Car starts with key ignition.");
    }
}

class Scooter extends Vehicle {
    Scooter() { no_of_tyres = 2; }

    @Override
    void start() {
        System.out.println("Scooter starts with kick or self-start.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        // Polymorphism enabled: Single parent reference type!
        Vehicle v1 = new Car();
        v1.displayTyres();
        v1.start();

        System.out.println();

        Vehicle v2 = new Scooter();
        v2.displayTyres();
        v2.start();
    }
}`;

  const rulesList = [
    {
      rule: "1. Declared with 'abstract' Keyword",
      valid: true,
      desc: "Both abstract classes and abstract methods must use the 'abstract' keyword.",
      example: "abstract class Vehicle { abstract void start(); }"
    },
    {
      rule: "2. Cannot Be Instantiated Directly",
      valid: false,
      desc: "You cannot create an object of an abstract class using 'new'.",
      example: "Vehicle v = new Vehicle(); ❌ Compiler Error: Vehicle is abstract; cannot be instantiated"
    },
    {
      rule: "3. Can Have Constructors & Concrete Methods",
      valid: true,
      desc: "Abstract classes can contain instance variables, concrete methods with bodies, and constructors for subclass chaining via super().",
      example: "abstract class Vehicle { Vehicle() { ... } void display() { ... } }"
    },
    {
      rule: "4. Abstract Methods Cannot Be private, static, or final",
      valid: false,
      desc: "Abstract methods MUST be overridden by child classes. Thus, private, static, or final modifiers are illegal!",
      example: "abstract static void start(); ❌ Compiler Error: illegal combination of modifiers: abstract and static"
    },
    {
      rule: "5. Mandatory Subclass Implementation",
      valid: true,
      desc: "Any concrete subclass extending an abstract class MUST override all abstract methods or be declared abstract itself.",
      example: "class Car extends Vehicle { @Override void start() { ... } }"
    }
  ];

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Abstraction & Architecture Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Abstraction in Java
          </h3>
        </div>

        {/* Master Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('before-after')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'before-after'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Before vs After Abstraction</span>
          </button>

          <button
            onClick={() => setActiveTab('car-analogy')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'car-analogy'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Car Driving Analogy</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'rules'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Rules & Modifiers</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: BEFORE VS AFTER ABSTRACTION COMPARATOR                         */}
      {/* ===================================================================== */}
      {activeTab === 'before-after' && (
        <div className="space-y-6 relative z-10">
          
          {/* Switcher Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
                Architecture Evolution
              </span>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {activeCodeMode === 'with' ? '✅ With Abstraction (Clean, Scalable, Polymorphic)' : '❌ Without Abstraction (Duplicated & Fragmented)'}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveCodeMode('without')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition ${
                  activeCodeMode === 'without'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                1. Without Abstraction
              </button>

              <button
                onClick={() => setActiveCodeMode('with')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition ${
                  activeCodeMode === 'with'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                2. With Abstraction (abstract class)
              </button>
            </div>
          </div>

          {/* Active Code & Technical Evaluation */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Code Viewer (7 cols) */}
            <div className="xl:col-span-7 space-y-2 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{activeCodeMode === 'with' ? 'Vehicle Abstraction System' : 'Individual Vehicle Classes'}</span>
                </span>
                <span>Java 21</span>
              </div>
              <UltraModernCodeViewer code={activeCodeMode === 'with' ? codeWithAbstraction : codeWithoutAbstraction} />
            </div>

            {/* Right: Disadvantages / Advantages Callout & Console (5 cols) */}
            <div className="xl:col-span-5 space-y-4 min-w-0">
              
              {activeCodeMode === 'without' ? (
                <div className="p-5 rounded-2xl bg-[#060B16] border border-rose-500/40 space-y-3 shadow-inner text-xs">
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Disadvantages of Not Using Abstraction:</span>
                  </span>

                  <ul className="space-y-2 text-slate-300">
                    <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                      <strong className="text-rose-400 block font-bold">1. No Polymorphism:</strong>
                      <span>Cannot use <code>Vehicle v = new Car();</code> since there is no unified parent type.</span>
                    </li>
                    <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                      <strong className="text-rose-400 block font-bold">2. Code Duplication:</strong>
                      <span>Common logic like <code>displayTyres()</code> is copy-pasted across every class.</span>
                    </li>
                    <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                      <strong className="text-rose-400 block font-bold">3. No Method Enforcement:</strong>
                      <span>A developer might forget to write a critical method like <code>start()</code> in new vehicles.</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-[#060B16] border border-emerald-500/40 space-y-3 shadow-inner text-xs">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Problems Solved by Abstraction:</span>
                  </span>

                  <ul className="space-y-2 text-slate-300">
                    <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                      <strong className="text-emerald-400 block font-bold">1. Polymorphic Flexibility:</strong>
                      <span>Operate on any vehicle uniformly: <code>Vehicle v = new Car(); v.start();</code></span>
                    </li>
                    <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                      <strong className="text-emerald-400 block font-bold">2. Zero Code Duplication:</strong>
                      <span>Shared logic is written once inside <code>abstract class Vehicle</code> and inherited.</span>
                    </li>
                    <li className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                      <strong className="text-emerald-400 block font-bold">3. Guaranteed Method Contracts:</strong>
                      <span>The compiler blocks any subclass that forgets to implement <code>abstract void start();</code>!</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Console Output */}
              <div className="p-4 rounded-2xl bg-[#040711] border border-slate-800 font-mono text-xs shadow-inner space-y-2">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Terminal Output</span>
                  </span>
                  <span>Exit 0</span>
                </div>
                <pre className="text-emerald-300 leading-relaxed whitespace-pre-line">
                  {activeCodeMode === 'with'
                    ? `This vehicle has 4 tyres.\nCar starts with key ignition.\n\nThis vehicle has 2 tyres.\nScooter starts with kick or self-start.`
                    : `Car has 4 tyres.\nCar starts with a key ignition.\n\nScooter has 2 tyres.\nScooter starts with a kick or self-start.`
                  }
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: CAR DRIVING REAL-WORLD ANALOGY                                */}
      {/* ===================================================================== */}
      {activeTab === 'car-analogy' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <em>"When you drive a car, you only need to know how to operate the steering wheel, accelerator pedal, and gear shift. You don't need to understand internal combustion or brake hydraulic lines."</em> — <strong>James Gosling</strong>
          </div>

          {/* Real-World Split View: Dashboard (Public Interface) vs Internal Engine (Hidden Complexity) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* 1. Public Interface (Visible Essentials) */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-cyan-500/40 space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>Public Interface (Visible to User)</span>
                </span>
                <span className="text-[10px] text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono">
                  Essential Controls
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setCarAction('accelerate')}
                  className={`w-full p-3 rounded-xl border text-left font-mono text-xs transition flex items-center justify-between ${
                    carAction === 'accelerate'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 font-bold shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span>1. Press Accelerator Pedal (start() / accelerate())</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>

                <button
                  onClick={() => setCarAction('steer')}
                  className={`w-full p-3 rounded-xl border text-left font-mono text-xs transition flex items-center justify-between ${
                    carAction === 'steer'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 font-bold shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span>2. Turn Steering Wheel (turnLeft() / turnRight())</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>

                <button
                  onClick={() => setCarAction('brake')}
                  className={`w-full p-3 rounded-xl border text-left font-mono text-xs transition flex items-center justify-between ${
                    carAction === 'brake'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 font-bold shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <span>3. Press Brake Pedal (stop())</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
            </div>

            {/* 2. Hidden Implementation (Internal Mechanics) */}
            <div className="p-5 rounded-2xl bg-[#061413] border border-emerald-500/40 space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-900/60">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <EyeOff className="w-4 h-4" />
                  <span>Hidden Implementation (Abstracted Away)</span>
                </span>
                <span className="text-[10px] text-amber-300 font-mono">Engine Complexity</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                <div className="text-slate-400">Current Action: <strong className="text-white uppercase">{carAction}</strong></div>
                <div className="text-[11px] text-emerald-300 leading-relaxed">
                  {carAction === 'accelerate' && "→ Fuel injected into combustion chamber → Spark plug ignites gas → Pistons drive crankshaft at 3,000 RPM → Torque delivered to front axle."}
                  {carAction === 'steer' && "→ Rack and pinion mechanical gear rotates → Hydraulic power-steering pump transfers fluid pressure → Tie rods adjust wheel camber angle."}
                  {carAction === 'brake' && "→ Master cylinder pressurizes DOT4 brake fluid → Calipers squeeze ceramic brake pads against ventilated steel brake rotors."}
                  {carAction === 'idle' && "→ Engine idling at 800 RPM. Click any control on the left to trigger the abstracted internal mechanisms!"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: RULES & MODIFIERS COMPLIANCE MATRIX                            */}
      {/* ===================================================================== */}
      {activeTab === 'rules' && (
        <div className="space-y-5 relative z-10">
          
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Rules governing <strong>Abstract Classes</strong> and <strong>Abstract Methods</strong> in Java:
          </div>

          <div className="space-y-3">
            {rulesList.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#060B16] border border-slate-800 hover:border-slate-700 transition space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    {item.valid ? (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span>{item.rule}</span>
                  </h4>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    item.valid ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    {item.valid ? 'Permitted' : 'Strictly Disallowed'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11.5px] text-cyan-300">
                  {item.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
