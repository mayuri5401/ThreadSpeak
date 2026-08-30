import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, Lock,
  Unlock, ShieldCheck, ShieldAlert, AlertTriangle, Check, X, Ban,
  FileCode, Layers2
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaFinalKeywordVisualizer
 * High-Yield Interactive Immutability & Security Theater for 'final':
 * 1. 3 Applications Explorer (Variables, Methods, Classes)
 * 2. Interactive Compiler Lock & Modification Interceptor
 * 3. Master 'final' vs 'finally' vs 'finalize()' Comparison Matrix
 */
export default function JavaFinalKeywordVisualizer() {
  const [activeTab, setActiveTab] = useState('pillars'); // 'pillars' | 'simulator' | 'compare'
  const [selectedPillar, setSelectedPillar] = useState('1'); // '1' | '2' | '3'
  const [simScenario, setSimScenario] = useState('variable'); // 'variable' | 'method' | 'class'
  const [violationTriggered, setViolationTriggered] = useState(false);

  const pillarsData = [
    {
      id: '1',
      title: '1. "final" Variable (Constants)',
      badge: 'Immutable Value',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      description: "A final variable's value cannot be changed once assigned. Commonly used to define constant application values.",
      code: `public class FinalDemo {
    public static void main(String[] args) {
        final int MAX_MARKS = 100; // final variable (constant)
        System.out.println("Maximum marks allowed: " + MAX_MARKS);

        // MAX_MARKS = MAX_MARKS + 50; // ❌ Compile Error: cannot assign a value to final variable
    }
}`,
      output: `Maximum marks allowed: 100`,
      diagram: "final int MAX_MARKS = 100 ──── Value Locked Permanently in Memory"
    },
    {
      id: '2',
      title: '2. "final" Method (Prevent Overriding)',
      badge: 'Algorithm Locking',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: "A final method cannot be overridden by subclasses. Useful when you want to prevent sub-classes from tampering with core logic.",
      code: `class Parent {
    final void showMessage() {
        System.out.println("This is a final method from the Parent class.");
    }
}

class Child extends Parent {
    // ❌ Trying to override a final method causes a compile-time error:
    /*
    void showMessage() {
        System.out.println("Trying to override.");
    }
    */
}

public class FinalDemo {
    public static void main(String[] args) {
        Child obj = new Child();
        obj.showMessage();
    }
}`,
      output: `This is a final method from the Parent class.`,
      diagram: "Parent.showMessage() [final] ──── Overriding Prohibited in Child Class"
    },
    {
      id: '3',
      title: '3. "final" Class (Prevent Inheritance)',
      badge: 'Subclassing Disabled',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      description: "A final class cannot be extended by any other class. Enforces class immutability and security (e.g. java.lang.String).",
      code: `// Final class - cannot be extended
final class A {
    void mA() {
        System.out.println("This is class A.");
    }
}

// ❌ Trying to extend a final class causes a compile-time error:
/*
class B extends A {

}
*/

public class FinalDemo {
    public static void main(String[] args) {
        A obj = new A();
        obj.mA();
    }
}`,
      output: `This is class A.`,
      diagram: "final class A ──── Inheritance Blocked (Cannot be subclassed)"
    }
  ];

  const currentPillar = pillarsData.find(p => p.id === selectedPillar) || pillarsData[0];

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
            <span>Interactive Immutability & Restriction Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            "final" Keyword in Java
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
            <Lock className="w-3.5 h-3.5" />
            <span>3 Final Pillars</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Compiler Restriction Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers2 className="w-3.5 h-3.5" />
            <span>final vs finally vs finalize</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: 3 FINAL PILLARS                                                */}
      {/* ===================================================================== */}
      {activeTab === 'pillars' && (
        <div className="space-y-6 relative z-10">
          
          {/* 3 Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pillarsData.map(item => {
              const isSelected = selectedPillar === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedPillar(item.id)}
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

          {/* Active Pillar Content */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Code Viewer (7 cols) */}
            <div className="xl:col-span-7 space-y-2 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{currentPillar.title}</span>
                </span>
                <span>Java 21</span>
              </div>
              <UltraModernCodeViewer code={currentPillar.code} />
            </div>

            {/* Right: Theory & Console Output (5 cols) */}
            <div className="xl:col-span-5 space-y-4 min-w-0">
              
              <div className="p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-3 shadow-inner">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${currentPillar.badgeColor}`}>
                  {currentPillar.badge}
                </span>

                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {currentPillar.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentPillar.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300">
                  <strong className="text-slate-400 block mb-0.5">Restriction Flow:</strong>
                  <span>{currentPillar.diagram}</span>
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
                  {currentPillar.output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: COMPILER RESTRICTION SIMULATOR                                 */}
      {/* ===================================================================== */}
      {activeTab === 'simulator' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>Interactive Compiler Restriction Simulator</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Test what happens when code tries to violate <code>final</code> restrictions on variables, methods, or classes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => { setSimScenario('variable'); setViolationTriggered(false); }}
              className={`p-3.5 rounded-2xl border text-left transition ${
                simScenario === 'variable'
                  ? 'bg-blue-950/60 border-blue-500 text-blue-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <strong className="block text-xs">Scenario A: Reassign final Variable</strong>
              <span className="text-[10px] text-slate-400">MAX_MARKS = 150;</span>
            </button>

            <button
              onClick={() => { setSimScenario('method'); setViolationTriggered(false); }}
              className={`p-3.5 rounded-2xl border text-left transition ${
                simScenario === 'method'
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <strong className="block text-xs">Scenario B: Override final Method</strong>
              <span className="text-[10px] text-slate-400">class Child overrides showMessage()</span>
            </button>

            <button
              onClick={() => { setSimScenario('class'); setViolationTriggered(false); }}
              className={`p-3.5 rounded-2xl border text-left transition ${
                simScenario === 'class'
                  ? 'bg-purple-950/60 border-purple-500 text-purple-200'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <strong className="block text-xs">Scenario C: Extend final Class</strong>
              <span className="text-[10px] text-slate-400">class B extends final A</span>
            </button>
          </div>

          {/* Interactive Simulation Action Box */}
          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/40 font-mono text-xs space-y-4 shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-cyan-400 font-bold">
                Simulation: {simScenario === 'variable' ? 'Variable Reassignment' : simScenario === 'method' ? 'Method Overriding' : 'Class Extension'}
              </span>

              <button
                onClick={() => setViolationTriggered(!violationTriggered)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                  violationTriggered
                    ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-500/30'
                    : 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                }`}
              >
                <Ban className="w-3.5 h-3.5" />
                <span>{violationTriggered ? 'Reset Simulation' : 'Trigger Violation Attempt'}</span>
              </button>
            </div>

            {violationTriggered ? (
              <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500 text-rose-200 space-y-2 animate-pulse">
                <strong className="block text-xs uppercase tracking-wider text-rose-400">
                  🚫 COMPILE-TIME ERROR INTERCEPTED BY JAVAC:
                </strong>
                {simScenario === 'variable' && (
                  <p>FinalDemo.java:6: error: cannot assign a value to final variable MAX_MARKS</p>
                )}
                {simScenario === 'method' && (
                  <p>FinalDemo.java:12: error: showMessage() in Child cannot override showMessage() in Parent; overridden method is final</p>
                )}
                {simScenario === 'class' && (
                  <p>FinalDemo.java:15: error: cannot inherit from final class A</p>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500 text-emerald-200 space-y-1">
                <strong className="block text-xs uppercase tracking-wider text-emerald-400">
                  ✅ Code Complies Successfully:
                </strong>
                <p>No illegal modifications attempted. <code>final</code> invariants are fully preserved.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: FINAL VS FINALLY VS FINALIZE                                   */}
      {/* ===================================================================== */}
      {activeTab === 'compare' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Layers2 className="w-4 h-4 text-cyan-400" />
              <span>Master Comparison: final vs finally vs finalize()</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Frequently asked interview comparison between three similarly named Java keywords:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#060B16]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-300 uppercase text-[11px]">
                <tr>
                  <th className="p-3.5">Identifier</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Purpose & Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-cyan-300">final</td>
                  <td className="p-3.5 text-blue-400">Non-Access Modifier</td>
                  <td className="p-3.5">Restricts modification: creates constants on variables, prevents method overriding, and prevents class inheritance.</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-emerald-300">finally</td>
                  <td className="p-3.5 text-emerald-400">Exception Handling Block</td>
                  <td className="p-3.5">Executes cleanup code (closing files/connections) guaranteed, regardless of whether exceptions were thrown or caught.</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-amber-300">finalize()</td>
                  <td className="p-3.5 text-amber-400">Object Method</td>
                  <td className="p-3.5">Called by the Garbage Collector before reclaiming object memory (Deprecated since Java 9).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
