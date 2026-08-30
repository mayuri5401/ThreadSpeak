import React, { useState } from 'react';
import { 
  Sparkles, Layers, ArrowRight, CheckCircle2, 
  HelpCircle, Lightbulb, Code2, ZoomIn, ZoomOut
} from 'lucide-react';

export default function HelloProgramDiagramCard() {
  const [activePin, setActivePin] = useState(null);

  const pins = [
    { id: 1, token: 'public', label: 'keyword (access modifier)', color: 'text-amber-300 bg-amber-950/90 border-amber-500/70', desc: 'Allows JVM & external packages to access the class from outside.' },
    { id: 2, token: 'class', label: 'keyword', color: 'text-cyan-300 bg-cyan-950/90 border-cyan-500/70', desc: 'Blueprint declaration keyword for creating objects.' },
    { id: 3, token: 'MainApp', label: 'user-defined class name', color: 'text-purple-300 bg-purple-950/90 border-purple-500/70', desc: 'Identifier of the primary class containing the program entry point.' },
    { id: 4, token: '{', label: 'class block start symbol', color: 'text-slate-300 bg-slate-900 border-slate-700', desc: 'Marks the start of the class definition body.' },
    { id: 5, token: 'public', label: 'keyword (access modifier)', color: 'text-amber-300 bg-amber-950/90 border-amber-500/70', desc: 'Makes main() callable by the external JVM runtime.' },
    { id: 6, token: 'static', label: 'keyword (no object needed)', color: 'text-emerald-300 bg-emerald-950/90 border-emerald-500/70', desc: 'Binds method to class level so JVM calls it without creating an object.' },
    { id: 7, token: 'void', label: 'keyword (return type)', color: 'text-rose-300 bg-rose-950/90 border-rose-500/70', desc: 'Declares main() returns no value upon completion.' },
    { id: 8, token: 'main', label: 'method name (entry point)', color: 'text-indigo-300 bg-indigo-950/90 border-indigo-500/70', desc: 'Standardized entry point identifier searched by JVM.' },
    { id: 9, token: 'String[]', label: 'array of strings (parameter type)', color: 'text-cyan-300 bg-cyan-950/90 border-cyan-500/70', desc: 'Parameter type holding command-line terminal arguments.' },
    { id: 10, token: 'args', label: 'parameter name (argument variable)', color: 'text-teal-300 bg-teal-950/90 border-teal-500/70', desc: 'Identifier variable name holding the String[] array.' },
    { id: 11, token: '{', label: 'method block start symbol', color: 'text-slate-300 bg-slate-900 border-slate-700', desc: 'Marks the beginning of the main method execution body.' },
    { id: 12, token: 'System', label: 'pre-defined class (java.lang package)', color: 'text-blue-300 bg-blue-950/90 border-blue-500/70', desc: 'Built-in utility class providing access to system facilities.' },
    { id: 13, token: '.', label: 'member access operator', color: 'text-amber-300 bg-amber-950/80 border-amber-500/60', desc: 'Dot operator used to access fields and methods.' },
    { id: 14, token: 'out', label: 'pre-defined object (System class)', color: 'text-emerald-300 bg-emerald-950/90 border-emerald-500/70', desc: 'Static PrintStream object representing the console output stream.' },
    { id: 15, token: 'println', label: 'method (print with newline)', color: 'text-orange-300 bg-orange-950/90 border-orange-500/70', desc: 'PrintStream method that outputs text and advances to a new line.' },
    { id: 16, token: '"Hello Deepak...!!"', label: 'string literal (message to print)', color: 'text-emerald-200 bg-emerald-950/90 border-emerald-400/80', desc: 'The text message stored in the String Constant Pool to display.' },
    { id: 17, token: ';', label: 'statement terminator', color: 'text-rose-300 bg-rose-950/90 border-rose-500/70', desc: 'Semicolon terminating the executable statement.' },
    { id: 18, token: '}', label: 'method block end symbol', color: 'text-slate-300 bg-slate-900 border-slate-700', desc: 'Closes the main() method body.' },
    { id: 19, token: '}', label: 'class block end symbol', color: 'text-slate-300 bg-slate-900 border-slate-700', desc: 'Closes the MainApp class definition body.' },
  ];

  const activeInfo = pins.find(p => p.id === activePin);

  return (
    <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0B1222] via-[#070B14] to-[#050811] overflow-hidden shadow-2xl space-y-0 my-4">
      {/* Top Diagram Header Toolbar */}
      <div className="px-5 py-3.5 bg-[#0D1629] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
            <Layers className="w-4 h-4" />
          </span>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              Visual Architecture Blueprint: Java Hello World
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                18 Pinpoints
              </span>
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="hidden sm:inline">Hover/click any tag for instant explanation</span>
        </div>
      </div>

      {/* Graphical Architectural Canvas */}
      <div className="p-6 sm:p-8 relative select-none overflow-x-auto">
        {/* Background glow & grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="min-w-[680px] max-w-4xl mx-auto space-y-6 relative z-10 font-mono">
          
          {/* ========================================================= */}
          {/* LINE 1: public class MainApp { */}
          {/* ========================================================= */}
          <div className="space-y-1">
            {/* Top Pointer Tags */}
            <div className="grid grid-cols-12 gap-2 text-[10px] text-center font-sans font-semibold">
              <div className="col-span-3 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(1)}
                  onClick={() => setActivePin(1)}
                  className="px-2.5 py-1 rounded-lg bg-amber-950/90 text-amber-300 border border-amber-500/60 hover:bg-amber-900 cursor-pointer transition shadow-md"
                >
                  keyword (access modifier)
                </span>
                <span className="text-amber-500/80 font-mono text-xs">│</span>
                <span className="text-amber-500/80 font-mono text-[10px] -mt-1.5">▼</span>
              </div>

              <div className="col-span-3 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(2)}
                  onClick={() => setActivePin(2)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-950/90 text-cyan-300 border border-cyan-500/60 hover:bg-cyan-900 cursor-pointer transition shadow-md"
                >
                  keyword (class)
                </span>
                <span className="text-cyan-500/80 font-mono text-xs">│</span>
                <span className="text-cyan-500/80 font-mono text-[10px] -mt-1.5">▼</span>
              </div>

              <div className="col-span-4 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(3)}
                  onClick={() => setActivePin(3)}
                  className="px-2.5 py-1 rounded-lg bg-purple-950/90 text-purple-300 border border-purple-500/60 hover:bg-purple-900 cursor-pointer transition shadow-md"
                >
                  user-defined class name
                </span>
                <span className="text-purple-500/80 font-mono text-xs">│</span>
                <span className="text-purple-500/80 font-mono text-[10px] -mt-1.5">▼</span>
              </div>

              <div className="col-span-2 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(4)}
                  onClick={() => setActivePin(4)}
                  className="px-2 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-700 hover:bg-slate-800 cursor-pointer transition"
                >
                  class start
                </span>
                <span className="text-slate-500 font-mono text-xs">│</span>
                <span className="text-slate-500 font-mono text-[10px] -mt-1.5">▼</span>
              </div>
            </div>

            {/* Code Line 1 */}
            <div className="grid grid-cols-12 gap-2 text-base font-bold items-center py-1 bg-slate-900/60 rounded-2xl px-4 border border-slate-800">
              <div className="col-span-3 text-center text-amber-400">public</div>
              <div className="col-span-3 text-center text-cyan-400">class</div>
              <div className="col-span-4 text-center text-purple-300">MainApp</div>
              <div className="col-span-2 text-center text-slate-400">{'{'}</div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* LINE 2: public static void main(String[] args) { */}
          {/* ========================================================= */}
          <div className="pl-6 space-y-1">
            {/* Top Pointer Tags */}
            <div className="grid grid-cols-12 gap-1.5 text-[9px] text-center font-sans font-semibold">
              <div className="col-span-2 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(5)}
                  onClick={() => setActivePin(5)}
                  className="px-1.5 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-500/60 hover:bg-amber-900 cursor-pointer transition"
                >
                  access modifier
                </span>
                <span className="text-amber-500/80 text-xs">│</span>
              </div>

              <div className="col-span-2 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(6)}
                  onClick={() => setActivePin(6)}
                  className="px-1.5 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/60 hover:bg-emerald-900 cursor-pointer transition"
                >
                  no object needed
                </span>
                <span className="text-emerald-500/80 text-xs">│</span>
              </div>

              <div className="col-span-2 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(7)}
                  onClick={() => setActivePin(7)}
                  className="px-1.5 py-0.5 rounded bg-rose-950/90 text-rose-300 border border-rose-500/60 hover:bg-rose-900 cursor-pointer transition"
                >
                  return type
                </span>
                <span className="text-rose-500/80 text-xs">│</span>
              </div>

              <div className="col-span-2 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(8)}
                  onClick={() => setActivePin(8)}
                  className="px-1.5 py-0.5 rounded bg-indigo-950/90 text-indigo-300 border border-indigo-500/60 hover:bg-indigo-900 cursor-pointer transition"
                >
                  entry point
                </span>
                <span className="text-indigo-500/80 text-xs">│</span>
              </div>

              <div className="col-span-2 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(9)}
                  onClick={() => setActivePin(9)}
                  className="px-1.5 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-500/60 hover:bg-cyan-900 cursor-pointer transition"
                >
                  string array type
                </span>
                <span className="text-cyan-500/80 text-xs">│</span>
              </div>

              <div className="col-span-1 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(10)}
                  onClick={() => setActivePin(10)}
                  className="px-1 py-0.5 rounded bg-teal-950/90 text-teal-300 border border-teal-500/60 hover:bg-teal-900 cursor-pointer transition"
                >
                  arg name
                </span>
                <span className="text-teal-500/80 text-xs">│</span>
              </div>

              <div className="col-span-1 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(11)}
                  onClick={() => setActivePin(11)}
                  className="px-1 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 hover:bg-slate-800 cursor-pointer transition"
                >
                  block
                </span>
                <span className="text-slate-500 text-xs">│</span>
              </div>
            </div>

            {/* Code Line 2 */}
            <div className="grid grid-cols-12 gap-1.5 text-sm font-bold items-center py-1.5 bg-slate-900/70 rounded-2xl px-4 border border-slate-800">
              <div className="col-span-2 text-center text-amber-400">public</div>
              <div className="col-span-2 text-center text-emerald-400">static</div>
              <div className="col-span-2 text-center text-rose-400">void</div>
              <div className="col-span-2 text-center text-indigo-300">main</div>
              <div className="col-span-2 text-center text-cyan-300">(String[]</div>
              <div className="col-span-1 text-center text-teal-300">args)</div>
              <div className="col-span-1 text-center text-slate-400">{'{'}</div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* LINE 3: System.out.println("Hello Deepak...!!"); */}
          {/* ========================================================= */}
          <div className="pl-12 space-y-1">
            {/* Top Pointer Tags */}
            <div className="grid grid-cols-12 gap-1.5 text-[9px] text-center font-sans font-semibold">
              <div className="col-span-2 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(12)}
                  onClick={() => setActivePin(12)}
                  className="px-1.5 py-0.5 rounded bg-blue-950/90 text-blue-300 border border-blue-500/60 hover:bg-blue-900 cursor-pointer transition"
                >
                  java.lang class
                </span>
                <span className="text-blue-500/80 text-xs">│</span>
              </div>

              <div className="col-span-1 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(13)}
                  onClick={() => setActivePin(13)}
                  className="px-1 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/50 hover:bg-amber-900 cursor-pointer transition"
                >
                  dot
                </span>
                <span className="text-amber-500/80 text-xs">│</span>
              </div>

              <div className="col-span-2 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(14)}
                  onClick={() => setActivePin(14)}
                  className="px-1.5 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/60 hover:bg-emerald-900 cursor-pointer transition"
                >
                  static object
                </span>
                <span className="text-emerald-500/80 text-xs">│</span>
              </div>

              <div className="col-span-1 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(13)}
                  onClick={() => setActivePin(13)}
                  className="px-1 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/50 hover:bg-amber-900 cursor-pointer transition"
                >
                  dot
                </span>
                <span className="text-amber-500/80 text-xs">│</span>
              </div>

              <div className="col-span-2 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(15)}
                  onClick={() => setActivePin(15)}
                  className="px-1.5 py-0.5 rounded bg-orange-950/90 text-orange-300 border border-orange-500/60 hover:bg-orange-900 cursor-pointer transition"
                >
                  print method
                </span>
                <span className="text-orange-500/80 text-xs">│</span>
              </div>

              <div className="col-span-3 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(16)}
                  onClick={() => setActivePin(16)}
                  className="px-1.5 py-0.5 rounded bg-emerald-950/90 text-emerald-200 border border-emerald-400/70 hover:bg-emerald-900 cursor-pointer transition"
                >
                  string literal message
                </span>
                <span className="text-emerald-400/80 text-xs">│</span>
              </div>

              <div className="col-span-1 flex flex-col items-center">
                <span 
                  onMouseEnter={() => setActivePin(17)}
                  onClick={() => setActivePin(17)}
                  className="px-1 py-0.5 rounded bg-rose-950/90 text-rose-300 border border-rose-500/60 hover:bg-rose-900 cursor-pointer transition"
                >
                  terminator
                </span>
                <span className="text-rose-500/80 text-xs">│</span>
              </div>
            </div>

            {/* Code Line 3 */}
            <div className="grid grid-cols-12 gap-1.5 text-sm font-bold items-center py-1.5 bg-slate-900/80 rounded-2xl px-4 border border-slate-800">
              <div className="col-span-2 text-center text-blue-400">System</div>
              <div className="col-span-1 text-center text-amber-300">.</div>
              <div className="col-span-2 text-center text-emerald-400">out</div>
              <div className="col-span-1 text-center text-amber-300">.</div>
              <div className="col-span-2 text-center text-orange-400">println</div>
              <div className="col-span-3 text-center text-emerald-300">("Hello Deepak...!!")</div>
              <div className="col-span-1 text-center text-rose-400">;</div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* LINES 4 & 5: Closing Braces */}
          {/* ========================================================= */}
          <div className="pl-6 flex items-center gap-3 pt-1">
            <span className="text-sm font-bold text-slate-400 px-3 py-1 bg-slate-900 rounded-xl border border-slate-800">{'}'}</span>
            <span 
              onMouseEnter={() => setActivePin(18)}
              onClick={() => setActivePin(18)}
              className="text-[10px] font-sans px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 cursor-pointer hover:bg-slate-800"
            >
              [18] method block end symbol
            </span>
          </div>

          <div className="flex items-center gap-3 pt-0.5">
            <span className="text-sm font-bold text-slate-400 px-3 py-1 bg-slate-900 rounded-xl border border-slate-800">{'}'}</span>
            <span 
              onMouseEnter={() => setActivePin(19)}
              onClick={() => setActivePin(19)}
              className="text-[10px] font-sans px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 cursor-pointer hover:bg-slate-800"
            >
              [18] class block end symbol
            </span>
          </div>

        </div>
      </div>

      {/* Floating Info Spotlight Card below diagram */}
      {activeInfo && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#060A14] border border-cyan-500/40 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-cyan-600/30 border border-cyan-500 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">
              {activeInfo.id}
            </span>
            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
              {activeInfo.token}
            </span>
            <span className="text-xs font-bold text-white">{activeInfo.label}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pl-8">
            {activeInfo.desc}
          </p>
        </div>
      )}
    </div>
  );
}
