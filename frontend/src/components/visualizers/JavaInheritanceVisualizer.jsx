import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ArrowDown,
  ShieldCheck, GitFork, AlertTriangle, Check, X, ShieldAlert, GitMerge,
  Layers2, Plus
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaInheritanceVisualizer
 * High-Yield Interactive Inheritance (IS-A) Simulator:
 * 1. 5 Types of Inheritance Tree Visualizer (Single, Multilevel, Hierarchical, Multiple via Interfaces, Hybrid)
 * 2. Diamond Problem Interactive Resolver
 * 3. extends (Class) vs implements (Interface) Code Runner
 * 4. Advantages & Disadvantages Matrix
 */
export default function JavaInheritanceVisualizer() {
  const [activeTab, setActiveTab] = useState('types'); // 'types' | 'diamond' | 'programs' | 'pros-cons'
  const [selectedType, setSelectedType] = useState('single');
  const [selectedProgram, setSelectedProgram] = useState('extends');

  // 5 Types of Inheritance Data
  const inheritanceTypes = [
    {
      id: 'single',
      name: '1. Single Inheritance',
      badge: 'Supported in Java (Classes & Interfaces)',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'One subclass inherits the state and behavior of exactly one superclass.',
      diagram: [
        { label: 'Parent Class (Vehicle)', color: 'bg-blue-950/60 border-blue-500 text-blue-300' },
        { label: '▲ extends', color: 'text-slate-400' },
        { label: 'Child Class (Car)', color: 'bg-emerald-950/60 border-emerald-500 text-emerald-300' }
      ],
      code: `class Vehicle {
    void start() { System.out.println("Vehicle starts."); }
}

// Single Inheritance
class Car extends Vehicle {
    void drive() { System.out.println("Car drives."); }
}`
    },
    {
      id: 'multilevel',
      name: '2. Multilevel Inheritance',
      badge: 'Supported in Java (Classes & Interfaces)',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'A class inherits from a parent class, which in turn inherits from its own parent class forming a chain (Grandparent -> Parent -> Child).',
      diagram: [
        { label: 'Grandparent (Animal)', color: 'bg-purple-950/60 border-purple-500 text-purple-300' },
        { label: '▲ extends', color: 'text-slate-400' },
        { label: 'Parent (Dog)', color: 'bg-blue-950/60 border-blue-500 text-blue-300' },
        { label: '▲ extends', color: 'text-slate-400' },
        { label: 'Child (BabyDog / Puppy)', color: 'bg-emerald-950/60 border-emerald-500 text-emerald-300' }
      ],
      code: `class Animal { void eat() { System.out.println("Eating..."); } }
class Dog extends Animal { void bark() { System.out.println("Barking..."); } }

// Multilevel Inheritance
class BabyDog extends Dog { void weep() { System.out.println("Weeping..."); } }`
    },
    {
      id: 'hierarchical',
      name: '3. Hierarchical Inheritance',
      badge: 'Supported in Java (Classes & Interfaces)',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'Multiple child classes inherit from a single common parent superclass.',
      diagram: [
        { label: 'Parent Class (Animal)', color: 'bg-blue-950/60 border-blue-500 text-blue-300' },
        { label: '▲ extends               ▲ extends', color: 'text-slate-400' },
        { label: 'Child A (Dog)  |  Child B (Cat)', color: 'bg-emerald-950/60 border-emerald-500 text-emerald-300' }
      ],
      code: `class Animal { void eat() { System.out.println("Eating..."); } }

// Hierarchical: Multiple classes inherit from same parent
class Dog extends Animal { void bark() { System.out.println("Barking..."); } }
class Cat extends Animal { void meow() { System.out.println("Meowing..."); } }`
    },
    {
      id: 'multiple',
      name: '4. Multiple Inheritance',
      badge: 'NOT for Classes | Supported via Interfaces',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: 'One class inherits from multiple parent entities. In Java, multiple class inheritance is blocked to prevent the Diamond Problem, but is 100% supported through Interfaces!',
      diagram: [
        { label: 'Interface A (Flyable)   |   Interface B (Swimmable)', color: 'bg-amber-950/60 border-amber-500 text-amber-300' },
        { label: '▲ implements', color: 'text-slate-400' },
        { label: 'Class (Duck)', color: 'bg-emerald-950/60 border-emerald-500 text-emerald-300' }
      ],
      code: `interface Flyable { void fly(); }
interface Swimmable { void swim(); }

// Multiple Inheritance achieved via Interfaces
class Duck implements Flyable, Swimmable {
    public void fly() { System.out.println("Duck flies in sky 🦆"); }
    public void swim() { System.out.println("Duck swims in water 🌊"); }
}`
    },
    {
      id: 'hybrid',
      name: '5. Hybrid Inheritance',
      badge: 'NOT for Classes | Supported via Interfaces',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: 'A combination of two or more types of inheritance (e.g. Hierarchical + Multiple). Achieved cleanly using interfaces.',
      diagram: [
        { label: 'Class GrandParent', color: 'bg-purple-950/60 border-purple-500 text-purple-300' },
        { label: '▲ extends (Parent A)   |   ▲ extends (Parent B)', color: 'text-slate-400' },
        { label: 'Child Class (Combination of both trees via Interfaces)', color: 'bg-emerald-950/60 border-emerald-500 text-emerald-300' }
      ],
      code: `// Combination of Single + Multiple via Interfaces
class GrandParent {}
interface InterfaceA {}
interface InterfaceB {}

class Child extends GrandParent implements InterfaceA, InterfaceB {}`
    }
  ];

  // 2 Practical Programs
  const programsData = {
    extends: {
      title: "Program 1: Class Inheritance using 'extends'",
      lead: "Car inherits start() from Vehicle and defines its own drive() method.",
      code: `class Vehicle {
    void start() {
        System.out.println("Vehicle starts.");
    }
}

// Car IS-A Vehicle (inherits from Vehicle)
class Car extends Vehicle {
    void drive() {
        System.out.println("Car drives.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.start(); // Inherited method from parent Vehicle
        myCar.drive(); // Specific method of child Car
    }
}`,
      output: `Vehicle starts.\nCar drives.`
    },
    implements: {
      title: "Program 2: Interface Inheritance using 'implements'",
      lead: "Dog implements the contract of Animal interface.",
      code: `interface Animal {
    void eat(); // Abstract method contract
}

// Dog IS-A Animal by implementing interface contract
class Dog implements Animal {
    public void eat() {
        System.out.println("Dog eats.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.eat(); // Invoking implemented method

        // Animal myAnimal = new Animal(); 
        // ❌ Error: Cannot instantiate an interface directly!
    }
}`,
      output: `Dog eats.`
    }
  };

  const currentTypeData = inheritanceTypes.find(t => t.id === selectedType) || inheritanceTypes[0];
  const currentProg = programsData[selectedProgram];

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Inheritance & Type Hierarchy Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Inheritance (IS-A Relationship) in Java
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
            <GitFork className="w-3.5 h-3.5" />
            <span>5 Types of Inheritance</span>
          </button>

          <button
            onClick={() => setActiveTab('diamond')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'diamond'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>The Diamond Problem</span>
          </button>

          <button
            onClick={() => setActiveTab('programs')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'programs'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>extends vs implements</span>
          </button>

          <button
            onClick={() => setActiveTab('pros-cons')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'pros-cons'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers2 className="w-3.5 h-3.5" />
            <span>Pros & Cons</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: 5 TYPES OF INHERITANCE TREE VISUALIZER                         */}
      {/* ===================================================================== */}
      {activeTab === 'types' && (
        <div className="space-y-6 relative z-10">
          
          {/* 5 Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {inheritanceTypes.map(type => {
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 space-y-1 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold text-white block line-clamp-1">{type.name}</span>
                  <span className="text-[10px] text-slate-400 block line-clamp-1">{type.id}</span>
                </button>
              );
            })}
          </div>

          {/* Active Inheritance Hierarchy Details */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Interactive Tree Diagram (5 cols) */}
            <div className="xl:col-span-5 p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-4 shadow-inner">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${currentTypeData.badgeColor}`}>
                  {currentTypeData.badge}
                </span>
                <span className="text-xs font-mono text-slate-500">Tree Architecture</span>
              </div>

              <h4 className="text-base font-bold text-white leading-snug">
                {currentTypeData.name}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentTypeData.description}
              </p>

              {/* Visual Tree Node Stack */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-center space-y-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2 font-bold">Class Hierarchy Flow</span>
                {currentTypeData.diagram.map((node, idx) => (
                  <div
                    key={idx}
                    className={node.label.includes('▲') ? 'text-[11px] text-cyan-400 font-bold py-0.5' : `p-2.5 rounded-xl border font-bold ${node.color}`}
                  >
                    {node.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Code Syntax View (7 cols) */}
            <div className="xl:col-span-7 space-y-2 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Java Implementation</span>
                </span>
                <span>Java 21</span>
              </div>
              <UltraModernCodeViewer code={currentTypeData.code} />
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: THE DIAMOND PROBLEM INTERACTIVE RESOLVER                      */}
      {/* ===================================================================== */}
      {activeTab === 'diamond' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Why Does Java NOT Support Multiple Inheritance with Classes?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              In multiple inheritance with classes, if <strong>Class C</strong> extends both <strong>Class A</strong> and <strong>Class B</strong>, and both parents define a method <code>display()</code>, the compiler cannot know which <code>display()</code> method Class C should inherit. This ambiguity is known as the <strong>Diamond Problem</strong>.
            </p>
          </div>

          {/* Diamond Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Left: The Class Ambiguity (Illegal in Java) */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-rose-500/40 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-rose-400 font-bold">❌ Multiple Class Inheritance (Forbidden)</span>
                <span className="text-[10px] text-rose-500">Diamond Ambiguity</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <div className="p-2 rounded bg-purple-950/60 border border-purple-800 text-purple-300 font-bold">Class GrandParent (display())</div>
                <div className="text-[10px] text-slate-500">▲ extends                ▲ extends</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-blue-950/60 border border-blue-800 text-blue-300">Class A (display())</div>
                  <div className="p-2 rounded bg-amber-950/60 border border-amber-800 text-amber-300">Class B (display())</div>
                </div>
                <div className="text-[10px] text-rose-400 font-bold">❌ Ambiguity: Which display() to call?</div>
                <div className="p-2 rounded bg-rose-950/60 border border-rose-800 text-rose-300 font-bold">
                  class C extends A, B ❌ (Compiler Error)
                </div>
              </div>
            </div>

            {/* Right: The Interface Solution (Legal in Java) */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-emerald-500/40 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-emerald-400 font-bold">✓ Interface Implementation (Allowed)</span>
                <span className="text-[10px] text-emerald-500">Pure Contracts</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <div className="p-2 rounded bg-purple-950/60 border border-purple-800 text-purple-300 font-bold">interface SuperInterface</div>
                <div className="text-[10px] text-slate-500">▲ contract              ▲ contract</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-blue-950/60 border border-blue-800 text-blue-300">interface A (void show())</div>
                  <div className="p-2 rounded bg-amber-950/60 border border-amber-800 text-amber-300">interface B (void show())</div>
                </div>
                <div className="text-[10px] text-emerald-400 font-bold">✓ Child C provides single override body!</div>
                <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-bold">
                  class C implements A, B ✓ (Zero Ambiguity)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: EXTENDS VS IMPLEMENTS PROGRAMS                                 */}
      {/* ===================================================================== */}
      {activeTab === 'programs' && (
        <div className="space-y-6 relative z-10">
          
          {/* 2 Program Switchers */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedProgram('extends')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedProgram === 'extends'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Program 1: extends (Class)
            </button>

            <button
              onClick={() => setSelectedProgram('implements')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedProgram === 'implements'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Program 2: implements (Interface)
            </button>
          </div>

          {/* Active Program View */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Code Viewer (7 cols) */}
            <div className="xl:col-span-7 space-y-2 min-w-0">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <strong className="text-cyan-300 block mb-0.5">{currentProg.title}</strong>
                <span className="text-slate-400 text-[11px]">{currentProg.lead}</span>
              </div>
              <UltraModernCodeViewer code={currentProg.code} />
            </div>

            {/* Right: Output Console (5 cols) */}
            <div className="xl:col-span-5 rounded-2xl bg-[#040711] border border-slate-800 p-5 flex flex-col justify-between shadow-inner min-w-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                    <Terminal className="w-4 h-4" />
                    <span>Standard Output</span>
                  </span>
                  <span className="text-[10px] font-mono">JVM 21</span>
                </div>

                <div className="p-4 rounded-xl bg-[#060913] border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre-line leading-relaxed shadow-inner">
                  {currentProg.output}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold">Execution Finished (Exit 0)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: ADVANTAGES & DISADVANTAGES MATRIX                              */}
      {/* ===================================================================== */}
      {activeTab === 'pros-cons' && (
        <div className="space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Advantages */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-emerald-500/40 space-y-4 shadow-inner">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <Check className="w-4 h-4" />
                <span>Advantages of Inheritance</span>
              </span>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
                  <strong className="text-emerald-300 block">1. Code Reusability</strong>
                  <span>Child classes inherit common fields and methods from the superclass without duplicating code.</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
                  <strong className="text-emerald-300 block">2. Easy Maintenance</strong>
                  <span>Fixing or modifying a method in the parent class automatically updates all subclasses.</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
                  <strong className="text-emerald-300 block">3. Method Overriding</strong>
                  <span>Enables subclasses to customize behavior while honoring the parent contract.</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
                  <strong className="text-emerald-300 block">4. Runtime Polymorphism</strong>
                  <span>Allows writing generic code (e.g. <code>Vehicle v = new Car(); v.start();</code>) for dynamic dispatch.</span>
                </li>
              </ul>
            </div>

            {/* Disadvantages */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-rose-500/40 space-y-4 shadow-inner">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <X className="w-4 h-4" />
                <span>Disadvantages & Gotchas</span>
              </span>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
                  <strong className="text-rose-300 block">1. Tight Coupling</strong>
                  <span>Subclasses become heavily dependent on superclass implementation details (Fragile Base Class problem).</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
                  <strong className="text-rose-300 block">2. Increased Hierarchy Complexity</strong>
                  <span>Deep class inheritance trees become notoriously difficult to navigate, debug, and refactor.</span>
                </li>
                <li className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-0.5">
                  <strong className="text-amber-300 block">3. Best Practice (Composition over Inheritance)</strong>
                  <span>Prefer HAS-A over IS-A when you only need code reuse without a genuine polymorphic type relationship!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
