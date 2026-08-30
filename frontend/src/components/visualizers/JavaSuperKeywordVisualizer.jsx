import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ArrowUp,
  GitBranch, Check, ShieldCheck, Layers2, ArrowUpRight, Database
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaSuperKeywordVisualizer
 * High-Yield Interactive Theater for the 'super' keyword in Java:
 * 1. 3 Core Usages Explorer (Parent Variable Shadowing, Parent Method Call, Parent Constructor Call)
 * 2. Interactive Superclass Pointer & Object Hierarchy Animator
 * 3. Master 'this' vs 'super' Comparison
 */
export default function JavaSuperKeywordVisualizer() {
  const [activeTab, setActiveTab] = useState('usages'); // 'usages' | 'hierarchy' | 'compare'
  const [selectedUsage, setSelectedUsage] = useState('1'); // '1' | '2' | '3'

  const usagesData = [
    {
      id: '1',
      title: '1. Refer to Parent Class Instance Variable',
      badge: 'Parent Field Access',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      description: "When a child class shadows a parent variable name, 'super.variable' directly retrieves the parent field value.",
      code: `class Parent {
    int num = 100;
}

class Child extends Parent {
    int num = 200;

    void display() {
        System.out.println("Child num: " + num);
        System.out.println("Parent num: " + super.num); // Referring to parent class variable
    }
}

public class SuperDemo {
    public static void main(String[] args) {
        Child c = new Child();
        c.display();
    }
}`,
      output: `Child num: 200\nParent num: 100`,
      diagram: "Child.display() ──── reads super.num ────► Parent.num = 100"
    },
    {
      id: '2',
      title: '2. Refer to Parent Class Method',
      badge: 'Parent Method Invocation',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: "When a child class overrides or augments behavior, 'super.methodName()' invokes the parent class implementation.",
      code: `class Parent {
    void showMessage() {
        System.out.println("Hello from Parent class showMessage() method");
    }
}

class Child extends Parent {
    void display() {
        super.showMessage(); // Calling parent class method using 'super'
        System.out.println("Inside Child class display() method");
    }
}

public class SuperDemo {
    public static void main(String[] args) {
        Child obj = new Child();
        obj.display();
    }
}`,
      output: `Hello from Parent class showMessage() method\nInside Child class display() method`,
      diagram: "Child.display() ──── invokes super.showMessage() ────► Parent.showMessage()"
    },
    {
      id: '3',
      title: '3. Refer to Parent Class Constructor (super())',
      badge: 'Constructor Chaining',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: "Calls the parent class constructor. MUST be the very first statement inside the child constructor body.",
      code: `class Parent {
    Parent() {
        System.out.println("Parent constructor called");
    }
}

class Child extends Parent {
    Child() {
        super(); // Calls Parent's constructor (Must be 1st statement)
        System.out.println("Child constructor called");
    }
}

public class SuperDemo {
    public static void main(String[] args) {
        Child c = new Child();
    }
}`,
      output: `Parent constructor called\nChild constructor called`,
      diagram: "Child() Constructor ──── triggers super() ────► Parent() Constructor"
    }
  ];

  const currentUsage = usagesData.find(u => u.id === selectedUsage) || usagesData[0];

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Superclass Reference Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            "super" Keyword in Java
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
            <span>3 Core Usages</span>
          </button>

          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'hierarchy'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Inheritance Object Memory</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>this vs super Matrix</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: 3 CORE USAGES OF SUPER                                         */}
      {/* ===================================================================== */}
      {activeTab === 'usages' && (
        <div className="space-y-6 relative z-10">
          
          {/* 3 Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {usagesData.map(item => {
              const isSelected = selectedUsage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedUsage(item.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 space-y-1 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold text-white block line-clamp-1">{item.title}</span>
                  <span className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded border inline-block ${item.badgeColor}`}>
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
      {/* TAB 2: INHERITANCE OBJECT MEMORY HIERARCHY                            */}
      {/* ===================================================================== */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <ArrowUp className="w-4 h-4 text-cyan-400" />
              <span>Heap Object Sub-Namespace Hierarchy</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When <code>Child c = new Child()</code> is created, the single Heap object encapsulates both <strong>Parent fields</strong> and <strong>Child fields</strong>. The <code>super</code> pointer directs lookups to the superclass portion.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/40 font-mono text-xs space-y-5">
            
            <div className="max-w-md mx-auto space-y-3">
              
              {/* Parent Sub-Object */}
              <div className="p-4 rounded-2xl bg-blue-950/60 border border-blue-500 text-blue-200 space-y-2 shadow-lg shadow-blue-500/10">
                <div className="flex items-center justify-between border-b border-blue-800/80 pb-1 text-xs">
                  <span className="font-bold">Superclass Space: Parent</span>
                  <span className="text-[10px] bg-blue-900 px-2 py-0.5 rounded text-blue-300">Target of super.</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Parent variable (num):</span>
                  <strong className="text-white">100</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Parent method:</span>
                  <strong className="text-white">showMessage()</strong>
                </div>
              </div>

              {/* Upward Pointer */}
              <div className="flex flex-col items-center justify-center gap-0.5 text-cyan-400 font-bold text-xs py-1">
                <span className="animate-pulse">▲</span>
                <span className="text-[10px] bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800 text-cyan-300">
                  super keyword pointer
                </span>
                <span className="animate-pulse">│</span>
              </div>

              {/* Child Sub-Object */}
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 space-y-2 shadow-lg shadow-emerald-500/10">
                <div className="flex items-center justify-between border-b border-emerald-800/80 pb-1 text-xs">
                  <span className="font-bold">Subclass Space: Child</span>
                  <span className="text-[10px] bg-emerald-900 px-2 py-0.5 rounded text-emerald-300">Target of this.</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Child variable (num):</span>
                  <strong className="text-white">200</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Child method:</span>
                  <strong className="text-white">display()</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: THIS VS SUPER MASTER MATRIX                                    */}
      {/* ===================================================================== */}
      {activeTab === 'compare' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>Master Comparison: this vs super</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Comparison between Java's two core implicit object reference keywords:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#060B16]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-300 uppercase text-[11px]">
                <tr>
                  <th className="p-3.5">Feature</th>
                  <th className="p-3.5">this Keyword</th>
                  <th className="p-3.5">super Keyword</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-cyan-300">Target Reference</td>
                  <td className="p-3.5">Refers to the <strong>current class instance</strong>.</td>
                  <td className="p-3.5">Refers to the <strong>immediate parent class instance</strong>.</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-cyan-300">Constructor Chaining</td>
                  <td className="p-3.5"><code>this()</code> invokes an overloaded constructor in <strong>same class</strong>.</td>
                  <td className="p-3.5"><code>super()</code> invokes a constructor in the <strong>parent class</strong>.</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-cyan-300">Placement Rule</td>
                  <td className="p-3.5">Must be the <strong>1st statement</strong> in constructor body.</td>
                  <td className="p-3.5">Must be the <strong>1st statement</strong> in constructor body.</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-cyan-300">Coexistence Rule</td>
                  <td className="p-3.5" colSpan="2">
                    <span className="text-amber-400 font-bold">⚠️ Cannot use both this() and super() in the same constructor!</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-cyan-300">Static Context</td>
                  <td className="p-3.5 text-rose-400 font-bold">❌ Forbidden in static methods</td>
                  <td className="p-3.5 text-rose-400 font-bold">❌ Forbidden in static methods</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
