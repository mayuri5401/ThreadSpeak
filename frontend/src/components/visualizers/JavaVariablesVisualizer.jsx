import React, { useState } from 'react';
import { 
  Cpu, Layers, Play, RotateCcw, Check, 
  Sparkles, HardDrive, HelpCircle, ArrowRight, Binary, Info
} from 'lucide-react';

export default function JavaVariablesVisualizer() {
  const [activeTab, setActiveTab] = useState('scopes'); // 'scopes' | 'analogy' | 'ram'
  const [activeMethod, setActiveMethod] = useState('all'); // 'all' | 'm1' | 'm2' | 'm3'

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0F172A] via-[#0B1222] to-[#070B14] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-md">
            <Cpu className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Java Variables &amp; Memory Scope Simulator
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                Interactive Visualizer
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore the 3 variable scopes (Local, Instance, Static) and the real-world Bus Analogy.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('scopes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'scopes'
                ? 'bg-cyan-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Scopes &amp; Memory (Stack / Heap / Metaspace)
          </button>
          <button
            onClick={() => setActiveTab('analogy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'analogy'
                ? 'bg-cyan-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Bus Analogy
          </button>
          <button
            onClick={() => setActiveTab('ram')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'ram'
                ? 'bg-cyan-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. RAM 4-Byte Grid
          </button>
        </div>
      </div>

      {/* TAB 1: 3 SCOPES SIMULATOR */}
      {activeTab === 'scopes' && (
        <div className="space-y-6">
          {/* Method Execution Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-xs font-mono text-slate-300 font-semibold">
              Simulate Method Execution:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveMethod('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono border transition ${
                  activeMethod === 'all' ? 'bg-cyan-600 text-slate-950 font-bold border-cyan-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                }`}
              >
                Execute All
              </button>
              <button
                onClick={() => setActiveMethod('m1')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono border transition ${
                  activeMethod === 'm1' ? 'bg-amber-500 text-slate-950 font-bold border-amber-300' : 'bg-slate-950 text-amber-300 border-slate-800'
                }`}
              >
                obj.m1()
              </button>
              <button
                onClick={() => setActiveMethod('m2')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono border transition ${
                  activeMethod === 'm2' ? 'bg-purple-500 text-slate-950 font-bold border-purple-300' : 'bg-slate-950 text-purple-300 border-slate-800'
                }`}
              >
                obj.m2()
              </button>
              <button
                onClick={() => setActiveMethod('m3')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono border transition ${
                  activeMethod === 'm3' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-300' : 'bg-slate-950 text-emerald-300 border-slate-800'
                }`}
              >
                MainApp.m3()
              </button>
            </div>
          </div>

          {/* 3 Distinct Memory Area Panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. STACK MEMORY (Local Variables) */}
            <div className="rounded-2xl bg-slate-950 border border-amber-500/40 p-4 space-y-3 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400 font-mono">
                  1. Stack Memory (Local)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                  Method Scoped
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Created on method call, destroyed when method returns.
              </p>
              <div className="space-y-2 font-mono text-xs">
                {(activeMethod === 'all' || activeMethod === 'm1') && (
                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/50 text-amber-300">
                    <span className="text-[10px] text-slate-400 block">Inside m1() Frame:</span>
                    <strong>int no1 = 10;</strong>
                  </div>
                )}
                {(activeMethod === 'all' || activeMethod === 'm2') && (
                  <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/50 text-purple-300">
                    <span className="text-[10px] text-slate-400 block">Inside m2() Frame:</span>
                    <strong>int no2 = 20;</strong>
                  </div>
                )}
                {(activeMethod === 'all' || activeMethod === 'm3') && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300">
                    <span className="text-[10px] text-slate-400 block">Inside m3() Frame:</span>
                    <strong>int no3 = 30;</strong>
                  </div>
                )}
              </div>
            </div>

            {/* 2. HEAP MEMORY (Instance Variables) */}
            <div className="rounded-2xl bg-slate-950 border border-cyan-500/40 p-4 space-y-3 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-cyan-400 font-mono">
                  2. Heap Memory (Instance)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                  Object Scoped
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Created with <code>new MainApp()</code>. Unique copy per object.
              </p>
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/50 space-y-1 font-mono text-xs text-cyan-300">
                <span className="text-[10px] text-slate-400 block">Object Payload @0x48FA:</span>
                <strong>int no = 100;</strong>
                <span className="text-[10px] text-slate-400 block mt-1">Accessible via <code>obj.no</code></span>
              </div>
            </div>

            {/* 3. METASPACE / METHOD AREA (Static Variables) */}
            <div className="rounded-2xl bg-slate-950 border border-indigo-500/40 p-4 space-y-3 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-indigo-400 font-mono">
                  3. Metaspace (Static)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800">
                  Class Scoped
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Single shared copy created when class loads.
              </p>
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/50 space-y-1 font-mono text-xs text-indigo-300">
                <span className="text-[10px] text-slate-400 block">Class Area: MainApp.class:</span>
                <strong>static int sno = 200;</strong>
                <span className="text-[10px] text-slate-400 block mt-1">Shared by all instances</span>
              </div>
            </div>

          </div>

          {/* Real-time Calculation Console */}
          <div className="p-5 rounded-2xl bg-[#060A14] border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold pb-2 border-b border-slate-800">
              <Sparkles className="w-4 h-4" />
              <span>Console Output Logs:</span>
            </div>
            <div className="space-y-1 text-slate-200 text-xs">
              {(activeMethod === 'all' || activeMethod === 'm1') && (
                <>
                  <div className="text-emerald-300">Result 1 : 110 <span className="text-slate-500">(no1: 10 + no: 100)</span></div>
                  <div className="text-emerald-300">Result 2 : 310 <span className="text-slate-500">(no1: 10 + no: 100 + sno: 200)</span></div>
                </>
              )}
              {(activeMethod === 'all' || activeMethod === 'm2') && (
                <>
                  <div className="text-emerald-300">Result 4 : 120 <span className="text-slate-500">(no2: 20 + no: 100)</span></div>
                  <div className="text-emerald-300">Result 5 : 320 <span className="text-slate-500">(no2: 20 + no: 100 + sno: 200)</span></div>
                </>
              )}
              {(activeMethod === 'all' || activeMethod === 'm3') && (
                <div className="text-emerald-300">Result 8 : 230 <span className="text-slate-500">(no3: 30 + sno: 200)</span></div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REAL-WORLD BUS ANALOGY */}
      {activeTab === 'analogy' && (
        <div className="space-y-5">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#090E1A] border border-cyan-500/30 text-center space-y-6 shadow-inner">
            <h4 className="text-sm font-bold text-white font-mono">
              Real-World Concept: The Bus Memory Model
            </h4>

            {/* Bus Graphic Box */}
            <div className="max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 font-bold border-4 border-slate-900 shadow-2xl relative space-y-4">
              <div className="flex justify-between items-center px-4 pt-1">
                <span className="text-xs bg-slate-950 text-amber-400 px-3 py-0.5 rounded-full font-mono">
                  🚌 BUS = Memory Location (RAM)
                </span>
                <span className="text-xs text-slate-900">4-Wheels Reserved</span>
              </div>

              {/* Passengers Container */}
              <div className="p-4 rounded-2xl bg-sky-100 border-2 border-slate-900 flex justify-around items-center">
                <div className="text-center">
                  <div className="text-2xl">👤</div>
                  <span className="text-[11px] font-mono text-slate-800 block">Passenger = 101</span>
                </div>
                <div className="text-center">
                  <div className="text-2xl">👤</div>
                  <span className="text-[11px] font-mono text-slate-800 block">Data (Value)</span>
                </div>
              </div>

              {/* Number Plate */}
              <div className="inline-block px-5 py-1.5 rounded-lg bg-white border-2 border-slate-900 text-slate-950 font-mono text-xs tracking-widest shadow-md">
                AA 123 ➔ Variable Name (<code className="text-cyan-800 font-bold">rollno</code>)
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-cyan-400 font-bold block">1. Memory Location</span>
                The Bus represents reserved space in computer memory.
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-amber-400 font-bold block">2. Data (Value)</span>
                Passengers sitting inside represent the literal data (e.g. 101).
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-purple-400 font-bold block">3. Variable Name</span>
                The number plate is the label pointing to the memory space.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RAM 4-BYTE GRID */}
      {activeTab === 'ram' && (
        <div className="space-y-5">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#090E1A] border border-cyan-500/30 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-white">
                  Physical RAM Memory Allocation for <code className="text-cyan-400">int rollno = 101;</code>
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">4 Contiguous Bytes (32 bits)</span>
            </div>

            {/* 4 Byte Grid Display */}
            <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto pt-3">
              {[
                { label: 'Byte 1', hex: '0x00', bits: '00000000', color: 'border-cyan-500 bg-cyan-950/60 text-cyan-300' },
                { label: 'Byte 2', hex: '0x00', bits: '00000000', color: 'border-cyan-500 bg-cyan-950/60 text-cyan-300' },
                { label: 'Byte 3', hex: '0x00', bits: '00000000', color: 'border-cyan-500 bg-cyan-950/60 text-cyan-300' },
                { label: 'Byte 4', hex: '0x65', bits: '01100101 (101)', color: 'border-emerald-500 bg-emerald-950/90 text-emerald-300 ring-2 ring-emerald-400/50' }
              ].map((b, i) => (
                <div key={i} className={`p-4 rounded-2xl border ${b.color} text-center space-y-1 font-mono shadow-md`}>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{b.label}</span>
                  <div className="text-xs font-bold">{b.hex}</div>
                  <div className="text-[9px] text-slate-400 mt-1">{b.bits}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-300 text-center font-mono max-w-md mx-auto leading-relaxed pt-2">
              <code>int rollno</code> reserves 4 contiguous bytes in RAM starting at base address <code>0x1004</code> and stores binary <code>01100101</code> (decimal 101).
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
