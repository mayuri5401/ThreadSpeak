import React, { useState } from 'react';
import { 
  Binary, Sparkles, Code2, Hash, Type, 
  ToggleLeft, ShieldAlert, Cpu, ArrowRight, Check
} from 'lucide-react';

export default function JavaLiteralsVisualizer() {
  const [activeCategory, setActiveCategory] = useState('integer');
  const [inputNumber, setInputNumber] = useState(42);

  const numVal = parseInt(inputNumber, 10) || 0;
  const binVal = numVal.toString(2);
  const octVal = numVal.toString(8);
  const hexVal = numVal.toString(16).toUpperCase();

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0F172A] via-[#0B1222] to-[#070B14] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 shadow-md">
            <Hash className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Java Literals &amp; Number Systems Visualizer
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                Interactive Simulator
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore 6 literal types, escape sequences, and real-time base conversions.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
          {[
            { id: 'integer', label: '1. Integer Bases' },
            { id: 'floating', label: '2. Floating Point' },
            { id: 'char', label: '3. Char & Escape' },
            { id: 'string', label: '4. String' },
            { id: 'boolean', label: '5. Boolean & Null' },
            { id: 'underscore', label: '6. Underscores (_)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeCategory === tab.id
                  ? 'bg-cyan-600 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: INTEGER BASES CONVERTER */}
      {activeCategory === 'integer' && (
        <div className="space-y-6">
          {/* Live Base Converter Sandbox */}
          <div className="p-5 rounded-2xl bg-[#090E1A] border border-cyan-500/40 space-y-4 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-cyan-300 font-bold flex items-center gap-2">
                <Binary className="w-4 h-4 text-cyan-400" />
                Live Number Base Converter Sandbox:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">Try typing a number:</span>
                <input
                  type="number"
                  value={inputNumber}
                  onChange={(e) => setInputNumber(e.target.value)}
                  className="w-24 px-3 py-1 rounded-lg bg-slate-950 border border-cyan-500/60 font-mono text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 text-center font-bold"
                />
              </div>
            </div>

            {/* 4 Base Result Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Decimal (Base 10)</div>
                <div className="text-sm font-bold text-amber-300">int num = {numVal};</div>
                <div className="text-[10px] text-slate-400">Regular numbers</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/50 space-y-1 font-mono shadow-md">
                <div className="text-[10px] text-cyan-400 uppercase tracking-wider">Binary (Base 2) - 0b</div>
                <div className="text-sm font-bold text-cyan-300">0b{binVal}</div>
                <div className="text-[10px] text-slate-400">Starts with <code className="text-cyan-400">0b</code></div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/50 space-y-1 font-mono shadow-md">
                <div className="text-[10px] text-purple-400 uppercase tracking-wider">Octal (Base 8) - 0</div>
                <div className="text-sm font-bold text-purple-300">0{octVal}</div>
                <div className="text-[10px] text-slate-400">Starts with <code className="text-purple-400">0</code></div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/50 space-y-1 font-mono shadow-md">
                <div className="text-[10px] text-emerald-400 uppercase tracking-wider">Hexadecimal (Base 16) - 0x</div>
                <div className="text-sm font-bold text-emerald-300">0x{hexVal}</div>
                <div className="text-[10px] text-slate-400">Starts with <code className="text-emerald-400">0x</code></div>
              </div>
            </div>
          </div>

          {/* Deepak Sir Tutorial Example Code Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
            <div className="text-xs font-bold text-amber-400 pb-1 border-b border-slate-800">
              Calculation Example: Sum of all bases in Java:
            </div>
            <pre className="text-slate-300 text-xs leading-relaxed">
{`int decimal = 42;      // 42
int binary = 0b1010;   // 10
int octal = 010;       // 8
int hex = 0x1F;        // 31

int sum = decimal + binary + octal + hex; // 42 + 10 + 8 + 31 = 91
System.out.println("Sum of all literals: " + sum); // Output: 91`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: FLOATING POINT & SCIENTIFIC */}
      {activeCategory === 'floating' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3 font-mono">
            <div className="text-xs font-bold text-emerald-400 uppercase">Float Literal (f / F)</div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-emerald-300">
              float pi = 3.14F;
            </div>
            <p className="text-xs text-slate-300">
              Mandatory <code className="text-emerald-400 font-bold">F</code> suffix. 32-bit single precision.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3 font-mono">
            <div className="text-xs font-bold text-cyan-400 uppercase">Double Literal (Default)</div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-cyan-300">
              double e = 2.718;
            </div>
            <p className="text-xs text-slate-300">
              Default type for fractional numbers. 64-bit double precision (15-16 digits).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-3 font-mono">
            <div className="text-xs font-bold text-purple-400 uppercase">Scientific Notation (e)</div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-purple-300">
              double sci = 1.23e4; // 12300.0
            </div>
            <p className="text-xs text-slate-300">
              Represents <code className="text-purple-300">1.23 × 10⁴</code> or small numbers like <code className="text-purple-300">4.56e-3 = 0.00456</code>.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: CHAR & ESCAPE SEQUENCES */}
      {activeCategory === 'char' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            {[
              { seq: '\\n', name: 'Newline', effect: 'Moves cursor to next line' },
              { seq: '\\t', name: 'Tab Space', effect: 'Inserts horizontal tab indent' },
              { seq: "\\'", name: 'Single Quote', effect: "Inserts ' character safely" },
              { seq: '\\\\', name: 'Backslash', effect: 'Inserts \\ character safely' }
            ].map(item => (
              <div key={item.seq} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-sm font-bold text-cyan-400">{item.seq}</span>
                <div className="text-xs text-white">{item.name}</div>
                <div className="text-[10px] text-slate-400">{item.effect}</div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-2xl bg-[#090E1A] border border-cyan-500/30 font-mono text-xs text-slate-300">
            <code>char letter = 'A'; char newline = '\n'; char tab = '\t';</code>
          </div>
        </div>
      )}

      {/* TAB 4: STRING */}
      {activeCategory === 'string' && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
          <div className="text-xs font-bold text-cyan-400">String Literal Examples:</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">Regular String</span>
              <code className="text-emerald-300">"Hello, World!"</code>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">Empty String</span>
              <code className="text-amber-300">""</code>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">Embedded Quotes</span>
              <code className="text-purple-300">"He said, \"Hello!\""</code>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BOOLEAN & NULL */}
      {activeCategory === 'boolean' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-slate-950 border border-rose-500/40 space-y-3">
            <div className="text-xs font-bold text-rose-400 uppercase">Boolean Literals</div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-rose-300">boolean isJavaFun = true;</div>
              <div className="text-slate-400">boolean isHot = false;</div>
            </div>
            <p className="text-xs text-slate-300">Only two legal values in Java: <code>true</code> and <code>false</code>.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-700 space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase">Null Literal</div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-amber-300">String str = null;</div>
            </div>
            <p className="text-xs text-slate-400">
              Represents absence of an object reference. Cannot be assigned to primitives (e.g. <code>int x = null;</code> ❌).
            </p>
          </div>
        </div>
      )}

      {/* TAB 6: UNDERSCORES IN NUMERIC LITERALS */}
      {activeCategory === 'underscore' && (
        <div className="p-5 rounded-2xl bg-[#090E1A] border border-cyan-500/40 space-y-4 font-mono text-xs">
          <div className="text-xs font-bold text-cyan-300">Underscores in Numeric Literals (Java 7+):</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">Separating Thousands:</span>
              <code className="text-emerald-300 text-sm font-bold">int million = 1_000_000;</code>
              <span className="text-[10px] text-slate-500 block">Compiler sees: 1000000</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block">Floating-point Precision:</span>
              <code className="text-cyan-300 text-sm font-bold">double pi = 3.141_592_653;</code>
              <span className="text-[10px] text-slate-500 block">Compiler sees: 3.141592653</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-300 text-xs">
            ⚠️ <strong>Rule:</strong> Underscores cannot be placed at the beginning (<code>_100</code> ❌), end (<code>100_</code> ❌), or adjacent to decimal points (<code>3._14</code> ❌).
          </div>
        </div>
      )}

    </div>
  );
}
