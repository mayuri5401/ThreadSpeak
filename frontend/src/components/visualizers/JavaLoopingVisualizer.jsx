import React, { useState } from 'react';
import { 
  Repeat, Play, RotateCcw, CheckCircle, ArrowRight, 
  Sparkles, Layers, List, PlayCircle
} from 'lucide-react';

export default function JavaLoopingVisualizer() {
  const [activeTab, setActiveTab] = useState('for'); // 'for' | 'while' | 'do-while' | 'for-each'

  // For Loop state
  const [forStep, setForStep] = useState(1);
  const [isForAutoPlaying, setIsForAutoPlaying] = useState(false);

  // While Loop state
  const [whileNum, setWhileNum] = useState(2);
  const [whileOutputs, setWhileOutputs] = useState([2]);

  // Do-While Loop state
  const [inputVal, setInputVal] = useState(-5);
  const [doWhileHistory, setDoWhileHistory] = useState([
    { input: -20, result: 'Loop continues (number <= 0)' },
    { input: 0, result: 'Loop continues (number <= 0)' },
    { input: 5, result: 'Terminates loop! Valid positive number.' }
  ]);

  // For-Each state
  const fruits = ['Apple', 'Banana', 'Cherry'];
  const [activeFruitIndex, setActiveFruitIndex] = useState(0);

  const forMax = 5;

  const handleNextForStep = () => {
    if (forStep < forMax) {
      setForStep(forStep + 1);
    } else {
      setForStep(1);
    }
  };

  const handleNextWhileStep = () => {
    if (whileNum + 2 <= 17) {
      const next = whileNum + 2;
      setWhileNum(next);
      setWhileOutputs([...whileOutputs, next]);
    } else {
      setWhileNum(2);
      setWhileOutputs([2]);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-7 border border-slate-800/80 shadow-2xl space-y-6">
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Repeat className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Looping Statements Execution Engine
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                Interactive
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Step through for, while, do-while, and enhanced for-each loop iterations.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('for')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'for'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>for Loop</span>
          </button>

          <button
            onClick={() => setActiveTab('while')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'while'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>while Loop</span>
          </button>

          <button
            onClick={() => setActiveTab('do-while')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'do-while'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>do-while Loop</span>
          </button>

          <button
            onClick={() => setActiveTab('for-each')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'for-each'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Enhanced for-each</span>
          </button>
        </div>
      </div>

      {/* TAB 1: FOR LOOP */}
      {activeTab === 'for' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-slate-300">
                  Loop Iteration Control (i = 1 to 5):
                </span>
                <p className="text-xs text-slate-400">Step through loop lifecycle stages.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleNextForStep}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Next Iteration ({forStep}/5)</span>
                </button>
                <button
                  onClick={() => setForStep(1)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-mono transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Loop Phases */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className={`p-3 rounded-xl border text-center ${forStep === 1 ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 ring-1 ring-cyan-500/40' : 'bg-slate-950/60 border-slate-800 text-slate-500'}`}>
                <span className="block font-bold text-[10px] uppercase">1. Init (Once)</span>
                <code>int i = 1;</code>
              </div>

              <div className="p-3 rounded-xl border text-center bg-emerald-950/80 border-emerald-400 text-emerald-300 ring-1 ring-emerald-500/40">
                <span className="block font-bold text-[10px] uppercase">2. Condition</span>
                <code>i &lt;= 5 ({forStep} &lt;= 5 ➔ TRUE)</code>
              </div>

              <div className="p-3 rounded-xl border text-center bg-purple-950/80 border-purple-400 text-purple-300 ring-1 ring-purple-500/40">
                <span className="block font-bold text-[10px] uppercase">3. Execute Body</span>
                <code>println("Number: " + {forStep})</code>
              </div>

              <div className="p-3 rounded-xl border text-center bg-amber-950/80 border-amber-400 text-amber-300 ring-1 ring-amber-500/40">
                <span className="block font-bold text-[10px] uppercase">4. Increment</span>
                <code>i++ (Next: {forStep + 1})</code>
              </div>
            </div>

            {/* Console Output Screen */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Console Output Stream:</span>
                <span className="text-emerald-400">Total printed: {forStep}</span>
              </div>
              <div className="font-mono text-xs text-emerald-300 bg-[#060A14] p-3 rounded-lg border border-slate-800/80 space-y-0.5">
                {Array.from({ length: forStep }, (_, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-slate-600">&gt;</span>
                    <span>Number: {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WHILE LOOP */}
      {activeTab === 'while' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-slate-300">
                  Task: Print even numbers between 1 and 17 (while loop)
                </span>
                <p className="text-xs text-slate-400">Condition: <code>while (no &lt;= 17)</code></p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleNextWhileStep}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Next Step (no = {whileNum})</span>
                </button>
                <button
                  onClick={() => { setWhileNum(2); setWhileOutputs([2]); }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-mono transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Live State Tracker */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Current Variable: <strong className="text-cyan-300">no = {whileNum}</strong></span>
                <span>Evaluation: <strong className="text-emerald-400">{whileNum} &lt;= 17 (TRUE)</strong></span>
              </div>

              <div className="p-3 bg-[#060A14] rounded-lg border border-slate-800/80 flex flex-wrap gap-2">
                {whileOutputs.map((item, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    Even Number: {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DO-WHILE LOOP */}
      {activeTab === 'do-while' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 font-mono text-xs">
            <div>
              <span className="font-bold uppercase text-slate-300 block mb-1">
                do-while Loop: Guaranteed "At Least Once" Execution
              </span>
              <p className="text-slate-400 m-0">Prompting user for a positive number until valid.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-slate-400 block mb-1">Simulated User Input Trace:</span>
              <div className="space-y-2">
                {doWhileHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border flex items-center justify-between ${
                      item.input > 0
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    }`}
                  >
                    <span>
                      do &#123; input = <strong>{item.input}</strong>; &#125; while ({item.input} &lt;= 0);
                    </span>
                    <span className="font-bold text-[11px]">{item.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ENHANCED FOR-EACH */}
      {activeTab === 'for-each' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-slate-300">
                  Enhanced for-each Array Traversal:
                </span>
                <p className="text-xs text-slate-400">Iterating <code>String[] fruits</code> without index variables.</p>
              </div>
              <button
                onClick={() => setActiveFruitIndex((activeFruitIndex + 1) % fruits.length)}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition"
              >
                <span>Next Element ➔</span>
              </button>
            </div>

            {/* Fruit Array Badges */}
            <div className="flex gap-3 justify-center py-4">
              {fruits.map((fruit, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveFruitIndex(idx)}
                  className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                    activeFruitIndex === idx
                      ? 'bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-950/60 scale-105 ring-2 ring-emerald-500/40'
                      : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span className="text-2xl block mb-1">
                    {fruit === 'Apple' ? '🍎' : fruit === 'Banana' ? '🍌' : '🍒'}
                  </span>
                  <span className="font-mono text-xs font-bold text-white block">{fruit}</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {activeFruitIndex === idx ? '● Current Element' : 'Item ' + idx}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex justify-between items-center text-slate-300">
              <span>Code: <code>for (String fruit : fruits)</code></span>
              <span>Active fruit value: <strong className="text-emerald-400">"{fruits[activeFruitIndex]}"</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
