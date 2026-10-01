import React, { useState } from 'react';
import { 
  Cpu, Zap, Database, Server, ShieldCheck, Terminal, 
  Layers, Flame, Award, ChevronRight, Copy, Check, Sparkles,
  TrendingUp, BarChart3, AlertTriangle, Code2
} from 'lucide-react';

export default function SeniorJvmDeepDiveCard({ topic, onOpenPlayground }) {
  const [copiedSection, setCopiedSection] = useState(null);
  const [activeTab, setActiveTab] = useState('bytecode'); // 'bytecode' | 'memory' | 'jit' | 'concurrency' | 'modern'

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const title = topic?.title || 'Java Internals';

  // Dynamic Opcode / Bytecode snippet customized for topic
  const bytecodeSnippet = `// Disassembled Bytecode via 'javap -c -v -p Solution.class'
// Target: Java 21 LTS HotSpot 64-Bit Server VM
Compiled from "Solution.java"
public class Solution {
  public Solution();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0              // Push 'this' reference to Operand Stack
         1: invokespecial #1     // Method java/lang/Object."<init>":()V
         4: return               // Return void

  public static void executeHotLoop(int iterations);
    descriptor: (I)V
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=2, args_size=1
         0: iconst_0             // Load constant 0 into register
         1: istore_1             // Store into local variable 1 (i)
         2: iload_1              // Push loop counter
         3: iload_0              // Push limit bound
         4: if_icmpge     14     // Branch if counter >= limit (C2 Loop Unrolling candidate)
         7: invokestatic  #7     // Runtime static dispatch (Inline cache target)
        10: iinc          1, 1   // In-place increment local variable 1 by 1
        13: goto          2      // Backward branch (Tier 3 C1 profiling back-edge counter)
        14: return
}`;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner: Senior / Staff Engineer Level Context */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#091122] via-[#0D182E] to-[#080E1C] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>HOTSPOT JVM INTERNALS</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
                Java 21 LTS Virtual Machine
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                C2 JIT &amp; ZGC Ready
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Low-Level Architecture &amp; Production Internals
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Designed for Senior Engineers, Tech Leads, and Staff Architects. Inspect bytecode instructions, memory layouts, HotSpot C1/C2 JIT optimizations, and low-latency concurrency trade-offs for <strong>{title}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenPlayground?.(bytecodeSnippet)}
              className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/30 hover:scale-105 active:scale-95 transition"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch JVM Sandbox</span>
            </button>
          </div>
        </div>
      </div>

      {/* Senior Sub-Navigation Pills */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 light:bg-slate-100 border border-slate-800 light:border-slate-200 overflow-x-auto">
        {[
          { id: 'bytecode', label: 'Bytecode & javap', icon: Terminal },
          { id: 'memory', label: 'Memory & GC Layout', icon: Database },
          { id: 'jit', label: 'JIT C1/C2 Compiler', icon: Zap },
          { id: 'concurrency', label: 'JMM & Concurrency', icon: ShieldCheck },
          { id: 'modern', label: 'Java 21 Standards', icon: Sparkles },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-extrabold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Bytecode & javap Disassembly */}
      {activeTab === 'bytecode' && (
        <div className="space-y-4">
          <div className="p-5 sm:p-7 rounded-3xl bg-[#090E1A] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white">Opcode Instruction Stream (`javap -c -v`)</span>
              </div>
              <button
                onClick={() => handleCopy(bytecodeSnippet, 'bytecode')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition"
              >
                {copiedSection === 'bytecode' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'bytecode' ? 'Copied' : 'Copy Bytecode'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#050811] border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
              <pre>{bytecodeSnippet}</pre>
            </div>

            {/* Architectural Bytecode Annotations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase">1. Operand Stack Framing</span>
                <p className="text-[11.5px] text-slate-300">
                  Zero-register stack machine architecture. Expressions push onto L1-cached frames with minimal memory pointer indirection.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono font-bold text-purple-400 uppercase">2. Virtual Dispatch (vtable)</span>
                <p className="text-[11.5px] text-slate-300">
                  Virtual method invocations dispatch via <code className="text-purple-300">invokevirtual</code>, monomorphic call-sites inline directly into C2 assembly.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase">3. Escape Analysis</span>
                <p className="text-[11.5px] text-slate-300">
                  If an instantiated object does not escape the current stack frame, C2 optimizes Heap allocation into native CPU registers.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Memory & GC Layout */}
      {activeTab === 'memory' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Object Header Overhead Breakdown */}
            <div className="p-6 rounded-3xl bg-[#090E1A] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Database className="w-4 h-4" />
                <span>64-Bit Object Header Layout (Compressed OOPs)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every standard Java object allocated on the Heap incurs a 12-byte header footprint (or 16-byte with 8-byte boundary alignment padding):
              </p>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300">Mark Word (Lock state, GC Age, Identity HashCode)</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">8 Bytes (64 bits)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300">Klass Word Pointer (+UseCompressedClassPointers)</span>
                  <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">4 Bytes (32 bits)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300">Payload Fields + 8-Byte Memory Alignment Padding</span>
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Variable (Pad to 8x)</span>
                </div>
              </div>
            </div>

            {/* Garbage Collector Invariants (ZGC vs G1) */}
            <div className="p-6 rounded-3xl bg-[#090E1A] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Zap className="w-4 h-4" />
                <span>Generational ZGC &amp; G1GC Invariants</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Production considerations for high-throughput, sub-millisecond maximum pause time SLAs:
              </p>
              <ul className="text-xs text-slate-300 space-y-2 pl-4 list-disc marker:text-emerald-400">
                <li><strong>Colored Pointers &amp; Load Barriers (ZGC):</strong> References store GC metadata in high bits of 64-bit pointers, enabling concurrent phase compaction without Stop-The-World freezes.</li>
                <li><strong>Short-Lived Object Evacuation:</strong> Generational Eden allocations die in Young Gen and never promote to Tenured space, preventing costly old-gen fragmentation.</li>
                <li><strong>Metaspace Tuning:</strong> Class definitions, method tables, and constant pools reside in native off-heap RAM (<code className="text-cyan-300">-XX:MaxMetaspaceSize</code>).</li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* Tab 3: JIT C1/C2 Compiler */}
      {activeTab === 'jit' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#090E1A] border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <Flame className="w-5 h-5" />
            <span>HotSpot Tiered Compilation Engine (Tier 0 to Tier 4)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { tier: 'Tier 0', name: 'Interpreter', desc: 'Direct execution of bytecode without compilation. Minimal startup latency.', color: 'border-slate-700 bg-slate-900/60' },
              { tier: 'Tier 1-3', name: 'C1 (Client) Compiler', desc: 'Fast compilation with basic profiling and invocation count thresholds.', color: 'border-blue-500/40 bg-blue-950/30' },
              { tier: 'Tier 4', name: 'C2 (Server) Compiler', desc: 'Aggressive SSA optimization, loop vectorization (AVX-512), and inlining.', color: 'border-amber-500/40 bg-amber-950/30' },
              { tier: 'Deopt', name: 'Deoptimization', desc: 'Guard condition invalidation triggers safe rollbacks to Tier 0 interpreter.', color: 'border-rose-500/40 bg-rose-950/30' },
            ].map((t, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border ${t.color} space-y-1.5`}>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">{t.tier}</span>
                <h4 className="text-xs font-bold text-white">{t.name}</h4>
                <p className="text-[11px] text-slate-300 leading-snug">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
            <span className="font-bold text-white flex items-center gap-1.5 font-mono text-[11px] text-cyan-400 uppercase">
              ⚡ Staff Pro-Tip: Inline Caching &amp; Megamorphic Calls
            </span>
            <p>
              When a call site invokes a method with only 1 concrete class implementation, C2 compiles it into direct monomorphic inline instructions with zero virtual lookup overhead. When more than 2 distinct classes are invoked at runtime, the call degrades to megamorphic dispatch table lookups.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: JMM & Concurrency Invariants */}
      {activeTab === 'concurrency' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#090E1A] border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
            <ShieldCheck className="w-5 h-5" />
            <span>Java Memory Model (JSR-133) &amp; Hardware Memory Barriers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Volatile &amp; Happens-Before Ordering</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Writing to a <code className="text-cyan-300">volatile</code> variable forces a hardware <code className="text-amber-300">StoreStore</code> &amp; <code className="text-amber-300">StoreLoad</code> memory fence, flushing CPU store buffers to Main RAM and preventing out-of-order instruction pipelining.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">False Sharing &amp; Cache-Line Alignment</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Two independent variables sitting on the same 64-byte L1/L2 CPU cache line cause invalidation ping-pong across CPU cores. Use <code className="text-purple-300">@jdk.internal.vm.annotation.Contended</code> to introduce 128-byte cache line padding.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Modern Java 21 LTS Standard */}
      {activeTab === 'modern' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#090E1A] border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
            <Sparkles className="w-5 h-5" />
            <span>Modern Java 21 Enterprise Architecture Patterns</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: 'Virtual Threads (Loom)', tag: 'JEP 444', desc: 'M:N lightweight fiber scheduler mounted on carrier ForkJoinPool threads for 1,000,000+ concurrent requests.' },
              { title: 'Pattern Matching & Sealed Types', tag: 'JEP 440/441', desc: 'Exhaustive pattern switch expressions and deconstructed record patterns with compile-time hierarchy safety.' },
              { title: 'Sequenced Collections', tag: 'JEP 431', desc: 'Uniform first/last element access and reverse order views across LinkedHashSet, ArrayList, and Deques.' },
              { title: 'Foreign Function & Memory API', tag: 'JEP 454', desc: 'Zero-overhead off-heap memory allocation and native C library interoperability safely replacing Unsafe.' },
              { title: 'String Templates & Scoped Values', tag: 'JEP 430/446', desc: 'Safe SQL/JSON interpolation and immutable thread-local context sharing across virtual fibers.' },
              { title: 'Record Patterns & Immutability', tag: 'JEP 405', desc: 'Transparent data carriers with canonical constructors, deconstructors, and value-based equals/hashCode.' }
            ].map((f, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{f.title}</h4>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">{f.tag}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
