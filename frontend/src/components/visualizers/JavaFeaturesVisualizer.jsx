import React, { useState } from 'react';
import { 
  Globe, ShieldCheck, Zap, Layers, Cpu, Users, 
  Terminal, Sparkles, CheckCircle2, Lock, Flame, RefreshCw 
} from 'lucide-react';

export default function JavaFeaturesVisualizer() {
  const [selectedFeature, setSelectedFeature] = useState('wora');

  const features = [
    {
      id: 'wora',
      name: '1. Platform Independent (WORA)',
      icon: Globe,
      color: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/20',
      summary: 'Write Once, Run Anywhere. Bytecode (.class) executes on any operating system equipped with a JVM.',
      comparison: 'In C/C++, code must be recompiled for each target CPU architecture. In Java, 1 single .class file runs identically on Windows, Linux, and macOS.'
    },
    {
      id: 'simple',
      name: '2. Simple (No Pointers)',
      icon: CheckCircle2,
      color: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/20',
      summary: 'Eliminates explicit pointers and operator overloading to prevent dangerous memory corruption and crashes.',
      comparison: 'C/C++ allows pointer arithmetic (int *p = 0x7fff) causing buffer overflows. Java abstracts memory behind safe references.'
    },
    {
      id: 'secure',
      name: '3. Secure Sandbox',
      icon: ShieldCheck,
      color: 'text-purple-400 border-purple-500/50 bg-purple-950/20',
      summary: 'Executes inside a JVM sandbox with Bytecode Verifier and Security Manager.',
      comparison: 'Prevents unauthorized file system or network access before instructions reach the CPU.'
    },
    {
      id: 'robust',
      name: '4. Robust & Reliable',
      icon: Lock,
      color: 'text-amber-400 border-amber-500/50 bg-amber-950/20',
      summary: 'Strong type checking, automatic Garbage Collection (GC), and structured Exception Handling.',
      comparison: 'No manual free() calls means zero dangling pointer leaks or use-after-free exploits.'
    },
    {
      id: 'multithreaded',
      name: '5. Multithreaded & Loom',
      icon: Flame,
      color: 'text-rose-400 border-rose-500/50 bg-rose-950/20',
      summary: 'Built-in language support for concurrent execution, enhanced with Java 21 Virtual Threads (Project Loom).',
      comparison: 'Execute 1,000,000 lightweight virtual threads simultaneously without running out of OS thread stack memory.'
    },
    {
      id: 'jit',
      name: '6. High Performance (JIT)',
      icon: Zap,
      color: 'text-yellow-400 border-yellow-500/50 bg-yellow-950/20',
      summary: 'Tiered Just-In-Time Compiler (C1 + C2) converts frequent bytecode hotspots into native CPU assembly at runtime.',
      comparison: 'Combines the rapid startup of an interpreter with the blistering speed of native compiled C++ code.'
    }
  ];

  const current = features.find(f => f.id === selectedFeature) || features[0];

  return (
    <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">
              Interactive Java Features &amp; Buzzwords Explorer
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Click each architectural pillar to see how Java solves real-world engineering challenges.
          </p>
        </div>
      </div>

      {/* Feature Selector Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {features.map(f => {
          const Icon = f.icon;
          const isSelected = selectedFeature === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setSelectedFeature(f.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? `${f.color} shadow-lg ring-1 ring-white/20 scale-[1.02]`
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4" />
                <span className="text-xs font-bold text-white truncate">{f.name.split('. ')[1]}</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">{f.summary}</p>
            </button>
          );
        })}
      </div>

      {/* Feature Deep Comparison Showcase Card */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <current.icon className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">{current.name}</h4>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
            Pillar Analysis
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {current.summary}
        </p>

        {/* Comparison Callout */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 space-y-1.5 text-xs">
          <span className="font-bold text-cyan-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Why This Makes Java Superior:
          </span>
          <p className="text-slate-300 leading-relaxed">
            {current.comparison}
          </p>
        </div>
      </div>
    </div>
  );
}
