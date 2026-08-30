import React from 'react';
import { HardDrive, User, Tag, Sparkles } from 'lucide-react';

export default function VariableBusDiagramCard() {
  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#0B132B] via-[#080D1A] to-[#040711] overflow-hidden shadow-2xl space-y-6 p-6 sm:p-8 my-4">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-600/50 shadow-md">
            🚌
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Real-World Analogy &amp; Memory Allocation
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                Visual Blueprint
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Understanding Java variables through the Bus Analogy and physical RAM memory cells.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Bus Analogy (Top) & RAM Cells (Bottom) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* ======================================================== */}
        {/* 1. REAL-WORLD BUS ANALOGY CARD */}
        {/* ======================================================== */}
        <div className="rounded-2xl bg-[#090E1A] border border-slate-800 p-6 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              1. Real-World Analogy:
            </span>
            <span className="text-[10px] font-mono text-slate-500">Conceptual Model</span>
          </div>

          {/* SVG Illustrated Yellow Bus */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="relative w-full max-w-[320px]">
              
              {/* The Yellow Bus Body */}
              <div className="bg-gradient-to-b from-[#FFD13B] to-[#F59E0B] rounded-t-[40px] rounded-b-[20px] border-4 border-slate-900 p-4 shadow-2xl relative">
                
                {/* Destination Sign */}
                <div className="w-28 h-6 bg-slate-900 rounded-md mx-auto mb-3 flex items-center justify-center border border-amber-300/40 shadow-inner">
                  <span className="text-[10px] font-mono font-extrabold tracking-widest text-amber-300">
                    BUS
                  </span>
                </div>

                {/* Windshield with 2 Passengers */}
                <div className="bg-gradient-to-b from-[#BAE6FD] to-[#7DD3FC] rounded-2xl border-4 border-slate-900 p-3 flex justify-around items-center shadow-inner h-24 relative overflow-hidden">
                  <div className="w-1/2 h-full border-r-2 border-slate-900/60 flex items-center justify-center">
                    <div className="p-2 rounded-full bg-indigo-950 text-indigo-200 border border-indigo-700 shadow-md flex flex-col items-center">
                      <User className="w-5 h-5 text-indigo-300" />
                      <span className="text-[9px] font-bold font-mono">101</span>
                    </div>
                  </div>
                  <div className="w-1/2 h-full flex items-center justify-center">
                    <div className="p-2 rounded-full bg-indigo-950 text-indigo-200 border border-indigo-700 shadow-md flex flex-col items-center">
                      <User className="w-5 h-5 text-indigo-300" />
                      <span className="text-[9px] font-bold font-mono">101</span>
                    </div>
                  </div>
                </div>

                {/* Red Stripe */}
                <div className="h-2.5 bg-rose-600 rounded-full my-2.5 border border-slate-900" />

                {/* Number Plate */}
                <div className="w-28 h-7 bg-white rounded-md mx-auto border-2 border-slate-900 flex items-center justify-center shadow-md">
                  <span className="text-xs font-mono font-extrabold tracking-widest text-slate-900">
                    AA 123
                  </span>
                </div>

                {/* Headlights */}
                <div className="flex justify-between px-2 pt-2">
                  <span className="w-4 h-4 rounded-full bg-yellow-100 border-2 border-slate-900 shadow-lg" />
                  <span className="w-4 h-4 rounded-full bg-yellow-100 border-2 border-slate-900 shadow-lg" />
                </div>
              </div>

              {/* Tires */}
              <div className="flex justify-between px-6 -mt-2">
                <span className="w-7 h-5 bg-slate-950 rounded-b-md border-2 border-slate-900" />
                <span className="w-7 h-5 bg-slate-950 rounded-b-md border-2 border-slate-900" />
              </div>
            </div>
          </div>

          {/* Pointer Labels */}
          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
              <span><strong>Memory Location (bus)</strong> ➔ Reserved RAM memory space</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shrink-0" />
              <span><strong>Data (passenger)</strong> ➔ The literal value (101) inside</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
              <span><strong>Variable Name (AA 123)</strong> ➔ Identifier (<code>rollno</code>)</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. JAVA EXAMPLE & RAM MEMORY ALLOCATION */}
        {/* ======================================================== */}
        <div className="rounded-2xl bg-[#090E1A] border border-slate-800 p-6 flex flex-col justify-between space-y-6 shadow-xl relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              2. Java Code &amp; Physical RAM Allocation:
            </span>
            <code className="px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-amber-300 text-xs font-mono font-bold">
              int rollno = 101;
            </code>
          </div>

          {/* RAM Stick Illustration + Memory Cell Matrix */}
          <div className="space-y-4 py-1">
            {/* Green RAM Module Banner */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 border border-emerald-500/60 shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-emerald-200">
                  DDR4 RAM Module (Memory Space)
                </span>
              </div>
              <div className="flex gap-1">
                <span className="w-3 h-3 bg-slate-900 rounded-sm border border-slate-700" />
                <span className="w-3 h-3 bg-slate-900 rounded-sm border border-slate-700" />
                <span className="w-3 h-3 bg-slate-900 rounded-sm border border-slate-700" />
              </div>
            </div>

            {/* RAM 4x8 Memory Grid */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-1 border-b border-slate-800/80">
                <span>RAM Address: 0x1004</span>
                <span className="text-rose-400 font-bold">rollno (allocates 4 bytes)</span>
              </div>

              {/* 4 Block Memory Matrix */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {/* Block 1: Highlighted red with 101 */}
                <div className="p-2 rounded-xl bg-rose-950/70 border-2 border-rose-500/90 shadow-md text-center space-y-1 ring-2 ring-rose-500/30">
                  <div className="text-[10px] font-mono text-rose-300 font-bold">Byte 1</div>
                  <div className="w-full py-1.5 rounded-lg bg-rose-900/90 text-white font-mono text-xs font-extrabold shadow-inner">
                    101
                  </div>
                  <div className="grid grid-cols-3 gap-0.5 pt-1">
                    {[...Array(6)].map((_, i) => (
                      <span key={i} className="h-1.5 rounded-sm bg-rose-400/40" />
                    ))}
                  </div>
                </div>

                {/* Blocks 2, 3, 4: Standard gray RAM slots */}
                {[2, 3, 4].map((blockNum) => (
                  <div key={blockNum} className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
                    <div className="text-[10px] font-mono text-slate-500">Byte {blockNum}</div>
                    <div className="w-full py-1.5 rounded-lg bg-slate-950 text-slate-500 font-mono text-xs">
                      0x00
                    </div>
                    <div className="grid grid-cols-3 gap-0.5 pt-1">
                      {[...Array(6)].map((_, i) => (
                        <span key={i} className="h-1.5 rounded-sm bg-slate-800" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Explanation Footer */}
          <div className="p-3 rounded-xl bg-[#060A14] border border-cyan-500/30 text-xs font-mono text-slate-300 leading-relaxed">
            💡 <strong className="text-cyan-300">Takeaway:</strong> Data <code>101</code> is stored in RAM, variable <code>rollno</code> points to that memory address, and <code>int</code> reserves <strong>4 bytes</strong> of storage.
          </div>
        </div>

      </div>

    </div>
  );
}
