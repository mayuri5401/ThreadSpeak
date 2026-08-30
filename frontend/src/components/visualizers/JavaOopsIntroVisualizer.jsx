import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Sparkles, Shield, GitFork, 
  EyeOff, Terminal, Zap, CheckCircle2, AlertCircle, 
  ArrowRight, Play, RotateCcw, Code2, Database, HelpCircle
} from 'lucide-react';

/**
 * JavaOopsIntroVisualizer
 * Interactive visualizer explaining:
 * 1. What is Programming Paradigm (Procedural vs OOP vs Functional vs Declarative)
 * 2. 6 Pillars of OOP (Class, Object, Inheritance, Polymorphism, Abstraction, Encapsulation)
 * 3. Why Java is Strongly OOP but Not Purely OOP (Primitives & Static)
 */
export default function JavaOopsIntroVisualizer() {
  const [activeTab, setActiveTab] = useState('pillars'); // 'pillars' | 'paradigms' | 'pure-oop'
  const [selectedPillar, setSelectedPillar] = useState('class-object');
  const [selectedParadigm, setSelectedParadigm] = useState('oop');
  const [animStep, setAnimStep] = useState(0);

  // 6 Pillars data
  const pillars = [
    {
      id: 'class',
      name: '1. Class',
      subtitle: 'Blueprint / Template',
      icon: Box,
      color: 'from-blue-500 to-cyan-500',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
      description: 'A Class is a user-defined blueprint or prototype from which objects are created. It defines the state (fields) and behavior (methods) that its objects will possess.',
      analogy: 'Architectural Blueprint of a Car specifying 4 wheels, engine capacity, and steering logic.',
      code: `// Blueprint: Class definition
public class Car {
    String brand;
    int speed;

    void accelerate() {
        speed += 10;
    }
}`
    },
    {
      id: 'object',
      name: '2. Object',
      subtitle: 'Instance of a Class',
      icon: Cpu,
      color: 'from-emerald-500 to-teal-500',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'An Object is a real-world physical runtime entity created from a Class blueprint. It occupies physical memory on the JVM Heap.',
      analogy: 'The actual physical Car on the road built from the blueprint with registration "DL 01 AA 1234".',
      code: `// Object instantiation on Heap
Car myCar = new Car();
myCar.brand = "Tesla";
myCar.accelerate();`
    },
    {
      id: 'inheritance',
      name: '3. Inheritance',
      subtitle: 'IS-A Relationship & Reusability',
      icon: GitFork,
      color: 'from-purple-500 to-indigo-500',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      description: 'Inheritance allows a child class (subclass) to inherit all non-private fields and methods from a parent class (superclass) using the "extends" keyword.',
      analogy: 'An ElectricCar IS-A Car: it inherits steering and wheels, and adds battery management.',
      code: `class ElectricCar extends Car {
    int batteryLevel = 100;

    void chargeBattery() {
        System.out.println("Charging... ⚡");
    }
}`
    },
    {
      id: 'polymorphism',
      name: '4. Polymorphism',
      subtitle: 'Many Forms (Overload / Override)',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      badgeColor: 'border-pink-500/40 text-pink-300 bg-pink-950/60',
      description: 'Polymorphism (Poly = Many, Morph = Forms) enables the same method name to execute different behaviors through Compile-Time Overloading and Runtime Overriding.',
      analogy: 'The "speak()" action: A human speaks English, a dog barks ("Woof"), and a cat meows ("Meow").',
      code: `// Method Overriding (Runtime Polymorphism)
class Dog extends Animal {
    @Override
    void speak() { System.out.println("Woof Woof! 🐶"); }
}`
    },
    {
      id: 'abstraction',
      name: '5. Abstraction',
      subtitle: 'Hiding Complexity, Showing Essentials',
      icon: EyeOff,
      color: 'from-amber-500 to-orange-500',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: 'Abstraction hides internal background complexity and exposes only essential features via Abstract Classes and Interfaces.',
      analogy: 'An ATM Screen: You press "Withdraw $100" without knowing the backend banking SQL queries or mechanical cash dispenser gears.',
      code: `abstract class BankATM {
    // Abstract method (Contract: WHAT to do)
    abstract void withdrawMoney(double amount);
}`
    },
    {
      id: 'encapsulation',
      name: '6. Encapsulation',
      subtitle: 'Data Hiding with Private & Getters/Setters',
      icon: Shield,
      color: 'from-blue-600 to-indigo-600',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      description: 'Encapsulation binds data and methods into a single capsule and protects fields with "private" access modifiers, allowing access only via validated public getters and setters.',
      analogy: 'A Medical Capsule: The active medication powders are safely sealed inside a protective gelatin shell.',
      code: `public class BankAccount {
    private double balance; // Hidden data

    public double getBalance() { return balance; }
    public void deposit(double amt) {
        if (amt > 0) balance += amt; // Guarded validation
    }
}`
    }
  ];

  // Programming Paradigms data
  const paradigms = [
    {
      id: 'procedural',
      name: '1. Procedural',
      focus: 'Step-by-step execution using functions & procedures',
      languages: 'C, Pascal, Fortran, BASIC',
      flow: 'Data moves freely across functions; top-down procedural routines',
      pros: 'Simple for small calculation scripts and direct hardware operations',
      code: `// C Language Procedural Style
void main() {
    int balance = 500;
    deposit(&balance, 200);
}`
    },
    {
      id: 'oop',
      name: '2. Object-Oriented (OOP)',
      focus: 'Uses objects & classes to structure code for reusability & security',
      languages: 'Java, C++, Python, C#, Kotlin',
      flow: 'Data & behavior packaged together inside autonomous object capsules',
      pros: 'Modular, maintainable, secure, and scalable for enterprise systems',
      code: `// Java OOP Style
BankAccount acc = new BankAccount("Alice", 500);
acc.deposit(200);`
    },
    {
      id: 'functional',
      name: '3. Functional',
      focus: 'Focuses on pure functions, immutability, & avoiding state changes',
      languages: 'Haskell, Lisp, Scala, JavaScript (ES6+)',
      flow: 'Functions as first-class citizens; zero side-effects & state mutation',
      pros: 'Predictable, highly parallelizable, and mathematical correctness',
      code: `// Functional Style (Java Streams / Lambdas)
List<Integer> doubled = numbers.stream()
    .map(n -> n * 2)
    .toList();`
    },
    {
      id: 'declarative',
      name: '4. Declarative',
      focus: 'Describes WHAT to do rather than HOW to do it step-by-step',
      languages: 'SQL, Prolog, HTML, CSS',
      flow: 'Specify desired output criteria; underlying engine figures out execution',
      pros: 'High abstraction level; query optimizers handle performance',
      code: `-- SQL Declarative Query
SELECT name, balance 
FROM accounts 
WHERE balance > 1000;`
    }
  ];

  const currentPillarData = pillars.find(p => p.id === selectedPillar) || pillars[0];
  const currentParadigmData = paradigms.find(p => p.id === selectedParadigm) || paradigms[1];

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Visual Architecture Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Object-Oriented Programming (OOP) in Java
          </h3>
        </div>

        {/* Master Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('pillars')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'pillars'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>6 Pillars of OOP</span>
          </button>

          <button
            onClick={() => setActiveTab('paradigms')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'paradigms'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Programming Paradigms</span>
          </button>

          <button
            onClick={() => setActiveTab('pure-oop')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'pure-oop'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Is Java 100% Pure OOP?</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SECTION 1: 6 PILLARS OF OOP INTERACTIVE EXPLORER                       */}
      {/* ===================================================================== */}
      {activeTab === 'pillars' && (
        <div className="space-y-6 relative z-10">
          
          {/* 6 Pillars Quick Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {pillars.map(p => {
              const Icon = p.icon;
              const isSelected = selectedPillar === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPillar(p.id)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${p.color} p-0.5 shadow-sm`}>
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-tight line-clamp-1">{p.name}</h4>
                    <span className="text-[10px] text-slate-400 block line-clamp-1">{p.subtitle}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Deep-Dive Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Left: Interactive Diagram & Analogy (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl bg-[#060B16] border border-slate-800 p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-inner">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${currentPillarData.badgeColor}`}>
                    {currentPillarData.name}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Core Pillar of OOP</span>
                </div>

                <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  {currentPillarData.subtitle}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentPillarData.description}
                </p>

                {/* Real-World Analogy Callout Box */}
                <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs font-sans text-cyan-200 flex items-start gap-2.5">
                  <span className="text-base shrink-0">💡</span>
                  <div>
                    <strong className="font-bold text-cyan-300 block mb-0.5">Real-World Analogy:</strong>
                    <span className="leading-relaxed">{currentPillarData.analogy}</span>
                  </div>
                </div>
              </div>

              {/* Visual Pillar Architecture Flow Diagram */}
              <div className="p-4 rounded-xl bg-[#040711] border border-slate-800/80 font-mono text-xs text-center space-y-2">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  Conceptual Architecture
                </span>
                
                {selectedPillar === 'class' && (
                  <div className="p-3 rounded-lg bg-slate-900 border border-cyan-500/40 text-cyan-300">
                    [Class Blueprint: Car.java] ─── defines ───► Fields (brand, speed) + Methods (accelerate())
                  </div>
                )}

                {selectedPillar === 'object' && (
                  <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/40 text-emerald-300">
                    new Car() ───► Allocates [Car Instance @0x7FFF] in JVM Heap ───► State: brand="Tesla"
                  </div>
                )}

                {selectedPillar === 'inheritance' && (
                  <div className="p-3 rounded-lg bg-slate-900 border border-purple-500/40 text-purple-300">
                    [Parent: Car] ◀─── extends ─── [Child: ElectricCar] (Inherits all non-private members)
                  </div>
                )}

                {selectedPillar === 'polymorphism' && (
                  <div className="p-3 rounded-lg bg-slate-900 border border-pink-500/40 text-pink-300">
                    Animal a = new Dog(); ─── a.speak() ───► Dynamic Dispatch calls Dog's "Woof Woof!"
                  </div>
                )}

                {selectedPillar === 'abstraction' && (
                  <div className="p-3 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-300">
                    [User UI / Contract] ─── shows essentials ───► [Internal Complex Engine Hidden]
                  </div>
                )}

                {selectedPillar === 'encapsulation' && (
                  <div className="p-3 rounded-lg bg-slate-900 border border-blue-500/40 text-blue-300">
                    [private double balance] 🔒 ─── guarded by ───► public getBalance() / deposit()
                  </div>
                )}
              </div>
            </div>

            {/* Right: Code Implementation (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-[#040711] border border-slate-800 p-4 font-mono text-xs flex flex-col justify-between shadow-inner">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Java 21 Syntax</span>
                  </span>
                  <span>OOP Structure</span>
                </div>
                <pre className="p-3 rounded-xl bg-[#060913] border border-slate-800/80 text-cyan-200 overflow-x-auto whitespace-pre leading-relaxed text-[12px]">
                  <code>{currentPillarData.code}</code>
                </pre>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Verified Clean OOP</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Production Ready</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 2: PROGRAMMING PARADIGMS COMPARATOR                           */}
      {/* ===================================================================== */}
      {activeTab === 'paradigms' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>What is a Programming Paradigm?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A <strong>Programming Paradigm</strong> is a fundamental style and approach to programming based on specific principles and techniques. It defines how code is written, organized, and executed by the machine.
            </p>
          </div>

          {/* 4 Paradigms Tab Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {paradigms.map(p => {
              const isSelected = selectedParadigm === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedParadigm(p.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 space-y-2 ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{p.name}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm" />}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{p.focus}</p>
                </button>
              );
            })}
          </div>

          {/* Active Paradigm Detail Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-7 rounded-2xl bg-[#060B16] border border-slate-800 p-5 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase">Paradigm Analysis</span>
                <h4 className="text-lg font-bold text-white">{currentParadigmData.name} Paradigm</h4>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <strong className="text-cyan-300 block mb-1">Core Description:</strong>
                  <span>{currentParadigmData.focus}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <strong className="text-amber-300 block mb-1">Languages Utilizing This:</strong>
                  <span className="font-mono text-slate-200">{currentParadigmData.languages}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <strong className="text-emerald-300 block mb-1">Architectural Advantage:</strong>
                  <span>{currentParadigmData.pros}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-[#040711] border border-slate-800 p-4 font-mono text-xs flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] text-slate-400 font-bold block pb-1 border-b border-slate-800">
                  Code Execution Style
                </span>
                <pre className="p-3 rounded-xl bg-[#060913] border border-slate-800 text-cyan-200 overflow-x-auto whitespace-pre leading-relaxed">
                  <code>{currentParadigmData.code}</code>
                </pre>
              </div>
              <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-[10px] text-cyan-300 mt-3">
                {currentParadigmData.flow}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION 3: IS JAVA 100% PURE OOP?                                      */}
      {/* ===================================================================== */}
      {activeTab === 'pure-oop' && (
        <div className="space-y-5 relative z-10">
          
          {/* Main Verdict Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 border border-amber-500/40 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertCircle className="w-5 h-5" />
              <span>Crucial Interview Fact: Is Java a Pure Object-Oriented Language?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              <strong>No.</strong> Java is a <strong>Strongly Object-Oriented</strong> language, but it is <strong>NOT a 100% Pure Object-Oriented</strong> language.
            </p>
          </div>

          {/* 2 Primary Reasons Java is Not Pure OOP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Reason 1: Primitive Data Types */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase">
                <Box className="w-4 h-4 text-rose-400" />
                <span>1. Primitive Data Types (8 Primitives)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                In a pure OOP language (like Smalltalk or Ruby), <em>literally everything</em> is an Object derived from a root class. In Java, primitive types (<code className="text-cyan-300">int</code>, <code className="text-cyan-300">char</code>, <code className="text-cyan-300">boolean</code>, etc.) are raw binary values stored directly on the Stack for high performance, without object wrappers.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400">
                <span className="text-rose-400">int x = 10;</span> (Raw 4-byte scalar value, NOT an object!)
              </div>
            </div>

            {/* Reason 2: static keyword */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>2. The 'static' Keyword</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Static methods and static variables belong to the <strong>Class metadata in Metaspace</strong>, not to any specific Heap Object instance. They can be executed directly (<code className="text-cyan-300">Math.sqrt(25)</code>) without creating an object instance.
              </p>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400">
                <span className="text-amber-400">Math.max(10, 20);</span> (Called with zero object instances created!)
              </div>
            </div>
          </div>

          {/* Comparison Table with Pure Languages */}
          <div className="rounded-2xl border border-slate-800 overflow-hidden bg-[#040711]">
            <div className="p-3 bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-300">
              Pure OOP vs Strongly OOP Languages
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 text-xs p-4 gap-4">
              <div className="space-y-1.5">
                <span className="font-bold text-emerald-400 font-mono">Pure Object-Oriented Languages:</span>
                <p className="text-slate-300">Smalltalk, Ruby, Scala, Eiffel</p>
                <span className="text-[11px] text-slate-500 block">Every single literal (even 5 and true) is a full object instance with methods.</span>
              </div>
              <div className="space-y-1.5 sm:pl-4">
                <span className="font-bold text-cyan-400 font-mono">Strongly Object-Oriented Languages:</span>
                <p className="text-slate-300">Java, C++, C#, Python</p>
                <span className="text-[11px] text-slate-500 block">Combines OOP modularity with fast primitive data types and static helpers for optimal execution speed.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
