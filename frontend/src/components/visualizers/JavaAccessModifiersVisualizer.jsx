import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  ShieldAlert, Lock, Unlock, AlertTriangle, Check, X, Shield, Globe,
  Home, Users, GitFork
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaAccessModifiersVisualizer
 * High-Yield Interactive 4-Tier Access Control Theater:
 * 1. Interactive 4-Zone Caller Scope Simulator (Same Class, Same Pkg, Subclass Diff Pkg, World)
 * 2. Modifier Reach Spotlight (private, default, protected, public)
 * 3. Access Control Table Matrix
 * 4. Method Overriding Visibility Rule Checker
 */
export default function JavaAccessModifiersVisualizer() {
  const [activeTab, setActiveTab] = useState('zones'); // 'zones' | 'spotlight' | 'matrix' | 'overriding'
  const [selectedZone, setSelectedZone] = useState('same-class'); // 'same-class' | 'same-pkg' | 'subclass-diff' | 'other-pkg'
  const [selectedModifier, setSelectedModifier] = useState('protected'); // 'private' | 'default' | 'protected' | 'public'

  // Zone Data
  const zones = [
    {
      id: 'same-class',
      title: 'Zone 1: Same Class (Car)',
      icon: Lock,
      badge: 'Internal Scope',
      desc: 'Code executing inside the exact same class where members are declared.',
      access: {
        private: { allowed: true, reason: 'Accessible: Inside same class' },
        default: { allowed: true, reason: 'Accessible: Inside same class' },
        protected: { allowed: true, reason: 'Accessible: Inside same class' },
        public: { allowed: true, reason: 'Accessible: Everywhere' }
      }
    },
    {
      id: 'same-pkg',
      title: 'Zone 2: Same Package (pkg1.Driver)',
      icon: Home,
      badge: 'Package-Private Scope',
      desc: 'Another class inside the same package (pkg1), without inheritance.',
      access: {
        private: { allowed: false, reason: 'BLOCKED: private is restricted to declaring class' },
        default: { allowed: true, reason: 'Accessible: Inside same package' },
        protected: { allowed: true, reason: 'Accessible: Inside same package' },
        public: { allowed: true, reason: 'Accessible: Everywhere' }
      }
    },
    {
      id: 'subclass-diff',
      title: 'Zone 3: Subclass in Different Package (pkg2.SportsCar extends Car)',
      icon: GitFork,
      badge: 'Inheritance Scope',
      desc: 'A child subclass residing in a different package (pkg2) inheriting from Car.',
      access: {
        private: { allowed: false, reason: 'BLOCKED: private is never inherited' },
        default: { allowed: false, reason: 'BLOCKED: default cannot cross package boundaries' },
        protected: { allowed: true, reason: 'Accessible: via inheritance across packages' },
        public: { allowed: true, reason: 'Accessible: Everywhere' }
      }
    },
    {
      id: 'other-pkg',
      title: 'Zone 4: Non-Subclass in Other Package (pkg2.Stranger)',
      icon: Globe,
      badge: 'Global World Scope',
      desc: 'An unrelated class in an external package (pkg2) attempting access.',
      access: {
        private: { allowed: false, reason: 'BLOCKED: private is hidden' },
        default: { allowed: false, reason: 'BLOCKED: default is package-private' },
        protected: { allowed: false, reason: 'BLOCKED: not a subclass' },
        public: { allowed: true, reason: 'Accessible: Everywhere' }
      }
    }
  ];

  const currentZone = zones.find(z => z.id === selectedZone) || zones[0];

  const codeCar = `package pkg1;

public class Car {
    // 1. private: Only accessible in Car
    private String model = "Safari";

    // 2. default: Accessible in pkg1
    int year = 2026;

    // 3. protected: Accessible in pkg1 + Subclasses anywhere
    protected int speed = 120;

    // 4. public: Accessible everywhere
    public void startEngine() {
        System.out.println("Engine started");
    }

    public void displayInternal() {
        // All 4 are accessible inside same class
        System.out.println(model + " " + year + " " + speed);
    }
}`;

  const codeCrossPkg = `package pkg2;

import pkg1.Car;

// Subclass in different package
class SportsCar extends Car {
    void testAccess() {
        // System.out.println(model); // ❌ Error: model is private in Car
        // System.out.println(year);  // ❌ Error: year is default (package-private)
        System.out.println(speed);    // ✅ ALLOWED: speed is protected
        startEngine();                // ✅ ALLOWED: startEngine() is public
    }
}

// Unrelated class in different package
class Stranger {
    void testAccess() {
        Car c = new Car();
        // System.out.println(c.speed); // ❌ Error: speed is protected
        c.startEngine();                // ✅ ALLOWED: public only
    }
}`;

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
            <span>Interactive Access Control & Visibility Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Access Modifiers in Java
          </h3>
        </div>

        {/* Master Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('zones')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'zones'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>4 Caller Zones Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'matrix'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Master Access Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Multi-Package Code</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: 4 CALLER ZONES SIMULATOR                                       */}
      {/* ===================================================================== */}
      {activeTab === 'zones' && (
        <div className="space-y-6 relative z-10">
          
          {/* Zone Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {zones.map(z => {
              const Icon = z.icon;
              const isSelected = selectedZone === z.id;
              return (
                <button
                  key={z.id}
                  onClick={() => setSelectedZone(z.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all space-y-1.5 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {z.badge}
                    </span>
                  </div>
                  <strong className="text-xs font-bold text-white block line-clamp-1">{z.title}</strong>
                </button>
              );
            })}
          </div>

          {/* Active Zone Visualization Grid */}
          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/40 space-y-5 shadow-inner">
            
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="space-y-0.5">
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Evaluating: {currentZone.title}</span>
                </h4>
                <p className="text-xs text-slate-300">
                  {currentZone.desc}
                </p>
              </div>
              <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-2.5 py-1 rounded-full">
                Caller Context
              </span>
            </div>

            {/* 4 Modifiers Access Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono text-xs">
              
              {/* private */}
              <div className={`p-4 rounded-xl border space-y-2 transition-all ${
                currentZone.access.private.allowed
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
              }`}>
                <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
                  <span className="font-bold text-white">private</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    currentZone.access.private.allowed ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-900 text-rose-300'
                  }`}>
                    {currentZone.access.private.allowed ? 'GRANTED' : 'DENIED'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">{currentZone.access.private.reason}</p>
              </div>

              {/* default */}
              <div className={`p-4 rounded-xl border space-y-2 transition-all ${
                currentZone.access.default.allowed
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
              }`}>
                <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
                  <span className="font-bold text-white">default</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    currentZone.access.default.allowed ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-900 text-rose-300'
                  }`}>
                    {currentZone.access.default.allowed ? 'GRANTED' : 'DENIED'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">{currentZone.access.default.reason}</p>
              </div>

              {/* protected */}
              <div className={`p-4 rounded-xl border space-y-2 transition-all ${
                currentZone.access.protected.allowed
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
              }`}>
                <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
                  <span className="font-bold text-white">protected</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    currentZone.access.protected.allowed ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-900 text-rose-300'
                  }`}>
                    {currentZone.access.protected.allowed ? 'GRANTED' : 'DENIED'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">{currentZone.access.protected.reason}</p>
              </div>

              {/* public */}
              <div className={`p-4 rounded-xl border space-y-2 transition-all ${
                currentZone.access.public.allowed
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
              }`}>
                <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
                  <span className="font-bold text-white">public</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    currentZone.access.public.allowed ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-900 text-rose-300'
                  }`}>
                    {currentZone.access.public.allowed ? 'GRANTED' : 'DENIED'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">{currentZone.access.public.reason}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: MASTER ACCESS MATRIX                                           */}
      {/* ===================================================================== */}
      {activeTab === 'matrix' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Official Java Access Control Table</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Standard accessibility matrix across all four visibility boundaries:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#060B16]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-300 uppercase text-[11px]">
                <tr>
                  <th className="p-3.5">Access Modifier</th>
                  <th className="p-3.5 text-center">Same Class</th>
                  <th className="p-3.5 text-center">Same Package</th>
                  <th className="p-3.5 text-center">Subclass (Other Package)</th>
                  <th className="p-3.5 text-center">Other Package (World)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-cyan-300">public</td>
                  <td className="p-3.5 text-center text-emerald-400 font-bold">✅ YES</td>
                  <td className="p-3.5 text-center text-emerald-400 font-bold">✅ YES</td>
                  <td className="p-3.5 text-center text-emerald-400 font-bold">✅ YES</td>
                  <td className="p-3.5 text-center text-emerald-400 font-bold">✅ YES</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-indigo-300">protected</td>
                  <td className="p-3.5 text-center text-emerald-400 font-bold">✅ YES</td>
                  <td className="p-3.5 text-center text-emerald-400 font-bold">✅ YES</td>
                  <td className="p-3.5 text-center text-emerald-400 font-bold">✅ YES</td>
                  <td className="p-3.5 text-center text-rose-400 font-bold">❌ NO</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-amber-300">default (no modifier)</td>
                  <td className="p-3.5 text-center text-emerald-400 font-bold">✅ YES</td>
                  <td className="p-3.5 text-center text-emerald-400 font-bold">✅ YES</td>
                  <td className="p-3.5 text-center text-rose-400 font-bold">❌ NO</td>
                  <td className="p-3.5 text-center text-rose-400 font-bold">❌ NO</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-rose-300">private</td>
                  <td className="p-3.5 text-center text-emerald-400 font-bold">✅ YES</td>
                  <td className="p-3.5 text-center text-rose-400 font-bold">❌ NO</td>
                  <td className="p-3.5 text-center text-rose-400 font-bold">❌ NO</td>
                  <td className="p-3.5 text-center text-rose-400 font-bold">❌ NO</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: MULTI-PACKAGE CODE VIEWER                                     */}
      {/* ===================================================================== */}
      {activeTab === 'code' && (
        <div className="space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            
            {/* File 1: pkg1/Car.java */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/40 text-xs">
                <strong className="text-blue-300 block font-bold mb-0.5">Declaring Class (pkg1/Car.java)</strong>
                <span className="text-slate-300 text-[11px]">Defines members with <code>private</code>, <code>default</code>, <code>protected</code>, and <code>public</code>.</span>
              </div>
              <UltraModernCodeViewer code={codeCar} />
            </div>

            {/* File 2: pkg2/Consumers.java */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs">
                <strong className="text-emerald-300 block font-bold mb-0.5">External Consumers (pkg2/Consumers.java)</strong>
                <span className="text-slate-300 text-[11px]">Shows how subclasses inherit <code>protected</code> while non-subclasses are blocked!</span>
              </div>
              <UltraModernCodeViewer code={codeCrossPkg} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
