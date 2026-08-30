import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, CornerDownRight,
  RefreshCw, Check, Repeat, GitBranch, ArrowUpRight, Share2, Layers2
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaThisKeywordVisualizer
 * High-Yield Interactive Theater for the 'this' keyword in Java:
 * 1. 6 Core Usages Explorer (Shadowing, Methods, Constructors, Parameter in Method/Ctor, Method Chaining)
 * 2. Interactive Stack vs Heap Memory Shadowing Inspector
 * 3. Fluent Method Chaining Pipeline
 */
export default function JavaThisKeywordVisualizer() {
  const [activeTab, setActiveTab] = useState('usages'); // 'usages' | 'shadowing' | 'chaining'
  const [selectedUsage, setSelectedUsage] = useState('1'); // '1' | '2' | '3' | '4' | '5' | '6'
  const [methodChainStep, setMethodChainStep] = useState(0);

  // 6 Usages Data
  const usagesData = [
    {
      id: '1',
      title: '1. Refer to Instance Variable (Variable Shadowing)',
      badge: 'Shadowing Disambiguation',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      description: "When a parameter has the same name as an instance field, 'this.variable' targets the Heap object field while 'variable' refers to the Stack parameter.",
      code: `public class ThisDemo {
    int no = 10;

    void m1(int no) {
        System.out.println("1. no : " + no);       // Local parameter (Stack)
        System.out.println("2. no : " + this.no);  // Instance variable (Heap)
    }

    public static void main(String[] args) {
        ThisDemo obj = new ThisDemo();
        obj.m1(20);
    }
}`,
      output: `1. no : 20\n2. no : 10`,
      diagram: "Stack (param no = 20)  vs  Heap (this.no = 10)"
    },
    {
      id: '2',
      title: '2. Refer to Current Class Method',
      badge: 'Implicit / Explicit Invocation',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: "You can invoke another method of the current object explicitly using 'this.methodName()'. If omitted, Java adds it implicitly.",
      code: `public class ThisDemo {
    void showMessage() {
        System.out.println("Hello from showMessage() method");
    }

    void display() {
        this.showMessage(); // Calling sibling method via this
        System.out.println("Inside display() method");
    }

    public static void main(String[] args) {
        ThisDemo obj = new ThisDemo();
        obj.display();
    }
}`,
      output: `Hello from showMessage() method\nInside display() method`,
      diagram: "display() ──── calls this.showMessage() ────► showMessage()"
    },
    {
      id: '3',
      title: '3. Refer to Current Class Constructor (this())',
      badge: 'Constructor Chaining',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: "Used to call another constructor in the same class. Must be the very first line inside the constructor body.",
      code: `public class ThisDemo {
    ThisDemo() {
        System.out.println("Default constructor called");
    }

    ThisDemo(String name) {
        this(); // Must be the FIRST statement in constructor!
        System.out.println("Hello, " + name);
    }

    public static void main(String[] args) {
        ThisDemo obj = new ThisDemo("Deepak");
    }
}`,
      output: `Default constructor called\nHello, Deepak`,
      diagram: "ThisDemo(String) ──── invokes this() ────► ThisDemo() Default Constructor"
    },
    {
      id: '4',
      title: '4. Pass this as a Parameter to a Method',
      badge: 'Event / Helper Delegation',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      description: "Passes the current object instance reference to an external or helper method.",
      code: `public class ThisDemo {
    void display(ThisDemo obj) {
        System.out.println("display() method is called");
    }

    void call() {
        display(this); // Passing current object instance as argument
    }

    public static void main(String[] args) {
        ThisDemo obj = new ThisDemo();
        obj.call();
    }
}`,
      output: `display() method is called`,
      diagram: "call() ──── passes (this) ────► display(ThisDemo obj)"
    },
    {
      id: '5',
      title: '5. Pass this as a Parameter to a Constructor',
      badge: 'Back-Reference Injection',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
      description: "Allows a helper or child object to store a back-reference to its enclosing parent instance.",
      code: `class A {
    int value = 10;

    A() {
        B b = new B(this); // Passing current instance of A to B's constructor
    }
}

class B {
    B(A obj) {
        System.out.println("Constructor of B is called");
        System.out.println("Value from class A: " + obj.value);
    }
}

public class ThisDemo {
    public static void main(String[] args) {
        A a = new A();
    }
}`,
      output: `Constructor of B is called\nValue from class A: 10`,
      diagram: "new A() ──── passes (this) ────► new B(A obj) stores parent reference"
    },
    {
      id: '6',
      title: '6. Return this from Method (Method Chaining)',
      badge: 'Fluent Builder API',
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
      description: "Returning 'this' allows fluent method chaining by continuously invoking operations on the same object instance.",
      code: `public class ThisDemo {
    int no;

    ThisDemo setValue(int no) {
        this.no = no;
        return this; // Returning current instance
    }

    void display() {
        System.out.println("Number: " + no);
    }

    public static void main(String[] args) {
        ThisDemo obj = new ThisDemo();
        obj.setValue(100).display(); // Fluent Method Chaining!
    }
}`,
      output: `Number: 100`,
      diagram: "obj.setValue(100) ──── returns this ────► .display()"
    }
  ];

  const currentUsage = usagesData.find(u => u.id === selectedUsage) || usagesData[0];

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
            <span>Interactive Object Reference Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            "this" Keyword in Java
          </h3>
        </div>

        {/* Master Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('usages')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'usages'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>6 Core Usages</span>
          </button>

          <button
            onClick={() => setActiveTab('shadowing')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'shadowing'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Stack vs Heap Shadowing</span>
          </button>

          <button
            onClick={() => setActiveTab('chaining')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'chaining'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Method Chaining</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: 6 CORE USAGES OF THIS                                          */}
      {/* ===================================================================== */}
      {activeTab === 'usages' && (
        <div className="space-y-6 relative z-10">
          
          {/* 6 Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {usagesData.map(item => {
              const isSelected = selectedUsage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedUsage(item.id)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 space-y-1 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[11px] font-bold text-white block line-clamp-1">{item.title}</span>
                  <span className={`text-[9px] font-mono font-bold px-1 py-0.5 rounded border inline-block ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Usage Content */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Code Viewer (7 cols) */}
            <div className="xl:col-span-7 space-y-2 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{currentUsage.title}</span>
                </span>
                <span>Java 21</span>
              </div>
              <UltraModernCodeViewer code={currentUsage.code} />
            </div>

            {/* Right: Theory & Console Output (5 cols) */}
            <div className="xl:col-span-5 space-y-4 min-w-0">
              
              <div className="p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-3 shadow-inner">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${currentUsage.badgeColor}`}>
                  {currentUsage.badge}
                </span>

                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {currentUsage.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentUsage.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300">
                  <strong className="text-slate-400 block mb-0.5">Reference Flow:</strong>
                  <span>{currentUsage.diagram}</span>
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
                  {currentUsage.output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: STACK VS HEAP SHADOWING                                       */}
      {/* ===================================================================== */}
      {activeTab === 'shadowing' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Stack Frame vs Heap Memory Shadowing Inspector</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When <code>m1(int no)</code> is invoked with parameter <code>20</code>, the stack frame stores local <code>no = 20</code>, while the Heap object retains instance variable <code>this.no = 10</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
            
            {/* Stack Frame */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-blue-500/40 space-y-3 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-blue-400 font-bold">
                <span>Call Stack (m1 Stack Frame)</span>
                <span className="text-[10px] text-blue-300 bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                  Local Variables
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Parameter no (local):</span>
                  <strong className="text-cyan-300 text-sm">20</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Implicit 'this' pointer:</span>
                  <strong className="text-emerald-400">0x7FFE001 (Heap Reference)</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Evaluating <code>no</code> returns the local parameter <strong>20</strong>.
              </p>
            </div>

            {/* Heap Memory */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-emerald-500/40 space-y-3 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-emerald-400 font-bold">
                <span>Heap Memory (ThisDemo Object @ 0x7FFE001)</span>
                <span className="text-[10px] text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Object Instance
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Instance field (this.no):</span>
                  <strong className="text-emerald-300 text-sm">10</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Class Metadata:</span>
                  <strong className="text-white">ThisDemo.class</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Evaluating <code>this.no</code> follows the 'this' pointer to the Heap and returns <strong>10</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: METHOD CHAINING PIPELINE                                       */}
      {/* ===================================================================== */}
      {activeTab === 'chaining' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Repeat className="w-4 h-4 text-cyan-400" />
              <span>Fluent Method Chaining Execution Pipeline</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When a method returns <code>this</code>, the caller receives the same object back, allowing chained method calls like <code>obj.setValue(100).display()</code>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/40 font-mono text-xs space-y-4">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block text-center">
              Execution Flow: obj.setValue(100).display();
            </span>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold">
                1. obj.setValue(100)
              </div>

              <div className="text-cyan-400 font-bold text-xs">
                ──── returns this (obj) ────►
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500 text-cyan-300 font-bold shadow-md">
                2. .display()
              </div>

              <div className="text-emerald-400 font-bold text-xs">
                ──── prints ────►
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 font-bold">
                "Number: 100"
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
