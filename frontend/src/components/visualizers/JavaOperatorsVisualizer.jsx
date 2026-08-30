import React, { useState } from 'react';
import { 
  Calculator, Sparkles, Cpu, Binary, Check, 
  HelpCircle, ArrowRight, Layers, Sliders
} from 'lucide-react';

export default function JavaOperatorsVisualizer() {
  const [valA, setValA] = useState(10);
  const [valB, setValB] = useState(3);
  const [operator, setOperator] = useState('+');
  const [activeCategory, setActiveCategory] = useState('arithmetic');

  const a = parseInt(valA, 10) || 0;
  const b = parseInt(valB, 10) || 1;

  const calculateResult = () => {
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? Math.floor(a / b) : 'Division by zero!';
      case '%': return b !== 0 ? a % b : 'Error';
      case '<': return (a < b).toString();
      case '>': return (a > b).toString();
      case '==': return (a === b).toString();
      case '!=': return (a !== b).toString();
      case '&': return a & b;
      case '|': return a | b;
      case '^': return a ^ b;
      case '<<': return a << b;
      case '>>': return a >> b;
      default: return a + b;
    }
  };

  const isBitwise = ['&', '|', '^', '<<', '>>'].includes(operator);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0F172A] via-[#0B1222] to-[#070B14] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-md">
            <Calculator className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Java Operators Interactive Sandbox
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                Live Evaluator
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select an operator, adjust operands, and see live results and binary bit operations.
            </p>
          </div>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
          {[
            { id: 'arithmetic', label: 'Arithmetic' },
            { id: 'relational', label: 'Relational' },
            { id: 'bitwise', label: 'Bitwise / Shift' },
            { id: 'ternary', label: 'Ternary & Unary' }
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

      {/* INTERACTIVE EXPRESSION EVALUATION SANDBOX */}
      <div className="p-6 rounded-3xl bg-[#090E1A] border border-cyan-500/40 space-y-5 shadow-inner">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-cyan-300 font-bold flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Live Expression Sandbox:
          </span>
          <span className="text-[11px] font-mono text-slate-400">Change operands or click operator</span>
        </div>

        {/* Expression Inputs & Operator Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-md">
          {/* Operand A Input */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono text-slate-500 mb-1">Operand A</span>
            <input
              type="number"
              value={valA}
              onChange={(e) => setValA(e.target.value)}
              className="w-20 sm:w-24 px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/60 font-mono text-center text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Operator Selector Dropdown / Buttons */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono text-slate-500 mb-1">Operator</span>
            <div className="flex flex-wrap gap-1 max-w-[200px] justify-center">
              {(activeCategory === 'arithmetic' ? ['+', '-', '*', '/', '%'] :
                activeCategory === 'relational' ? ['<', '>', '==', '!='] :
                activeCategory === 'bitwise' ? ['&', '|', '^', '<<', '>>'] :
                ['+', '<', '==', '&']
              ).map(op => (
                <button
                  key={op}
                  onClick={() => setOperator(op)}
                  className={`w-9 h-9 rounded-xl font-mono text-xs font-bold border transition ${
                    operator === op
                      ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/50 shadow-md'
                      : 'bg-slate-900 text-cyan-300 border-slate-700 hover:border-cyan-500'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>

          {/* Operand B Input */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono text-slate-500 mb-1">Operand B</span>
            <input
              type="number"
              value={valB}
              onChange={(e) => setValB(e.target.value)}
              className="w-20 sm:w-24 px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/60 font-mono text-center text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Result Box */}
          <div className="flex flex-col items-center pl-3 sm:border-l border-slate-800">
            <span className="text-[10px] font-mono text-emerald-400 mb-1">Computed Result</span>
            <div className="px-5 py-2 rounded-xl bg-emerald-950/80 border-2 border-emerald-500/80 font-mono text-base sm:text-lg font-extrabold text-emerald-300 shadow-md">
              {calculateResult()}
            </div>
          </div>
        </div>

        {/* Binary Breakdown for Bitwise / Shift */}
        {isBitwise && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
            <div className="text-xs font-bold text-cyan-400 flex items-center gap-2">
              <Binary className="w-4 h-4" />
              <span>Binary Bit-Level Trace:</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-1 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                A ({a}): <code className="text-cyan-300">{(a >>> 0).toString(2).padStart(8, '0')}</code>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                B ({b}): <code className="text-amber-300">{(b >>> 0).toString(2).padStart(8, '0')}</code>
              </div>
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold">
                Result ({calculateResult()}): <code>{(parseInt(calculateResult(), 10) >>> 0).toString(2).padStart(8, '0')}</code>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 9 Categories Quick Reference Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-amber-400 font-bold block">1. Arithmetic</span>
          <p className="text-slate-400 text-[11px]"><code>+ - * / %</code> for mathematical calculations.</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-cyan-400 font-bold block">2. Relational</span>
          <p className="text-slate-400 text-[11px]"><code>== != &lt; &gt; &lt;= &gt;=</code> returning boolean.</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-purple-400 font-bold block">3. Logical</span>
          <p className="text-slate-400 text-[11px]"><code>&& || !</code> for compound conditions.</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-emerald-400 font-bold block">4. Assignment</span>
          <p className="text-slate-400 text-[11px]"><code>= += -= *= /= %=</code> for variable updates.</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-rose-400 font-bold block">5. Ternary</span>
          <p className="text-slate-400 text-[11px]"><code>condition ? v1 : v2</code> inline if-else.</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <span className="text-indigo-400 font-bold block">6. Unary &amp; Shift</span>
          <p className="text-slate-400 text-[11px]"><code>++ -- &lt;&lt; &gt;&gt; &gt;&gt;&gt;</code> and <code>instanceof</code>.</p>
        </div>
      </div>

    </div>
  );
}
