import React, { useState } from 'react';
import { 
  FastForward, Play, RotateCcw, Octagon, CornerDownRight, 
  Sparkles, CheckCircle, AlertTriangle, ArrowRight
} from 'lucide-react';

export default function JavaJumpVisualizer() {
  const [activeTab, setActiveTab] = useState('break'); // 'break' | 'continue' | 'return' | 'switch-break'

  // Break state
  const [breakStep, setBreakStep] = useState(1);
  const [breakOutputs, setBreakOutputs] = useState(['Number: 1']);

  // Continue state
  const [continueStep, setContinueStep] = useState(1);
  const [continueOutputs, setContinueOutputs] = useState(['Number: 1']);

  // Return state
  const [ageInput, setAgeInput] = useState(16);
  const [numA, setNumA] = useState(5);
  const [numB, setNumB] = useState(3);

  // Switch break state
  const [switchDay, setSwitchDay] = useState(3);

  const daysMap = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday'
  };

  const handleNextBreakStep = () => {
    if (breakStep < 5) {
      const next = breakStep + 1;
      setBreakStep(next);
      if (next === 5) {
        setBreakOutputs([...breakOutputs, 'Loop stopped at: 5', '🛑 [Loop Terminated by break]']);
      } else {
        setBreakOutputs([...breakOutputs, 'Number: ' + next]);
      }
    } else {
      setBreakStep(1);
      setBreakOutputs(['Number: 1']);
    }
  };

  const handleNextContinueStep = () => {
    if (continueStep < 5) {
      const next = continueStep + 1;
      setContinueStep(next);
      if (next === 3) {
        setContinueOutputs([...continueOutputs, 'Skipping number: 3 (continue ➔ next step)']);
      } else {
        setContinueOutputs([...continueOutputs, 'Number: ' + next]);
      }
    } else {
      setContinueStep(1);
      setContinueOutputs(['Number: 1']);
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-7 border border-slate-800/80 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
            <FastForward className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Jump Statements Control Engine
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300">
                Interactive
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Simulate break termination, continue iteration skipping, and return method calls.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('break')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'break'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>break (Loop)</span>
          </button>

          <button
            onClick={() => setActiveTab('continue')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'continue'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>continue (Skip)</span>
          </button>

          <button
            onClick={() => setActiveTab('return')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'return'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>return (Method)</span>
          </button>

          <button
            onClick={() => setActiveTab('switch-break')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'switch-break'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>break (switch)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: BREAK IN LOOP */}
      {activeTab === 'break' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="font-bold uppercase text-slate-300 block mb-1">
                  Loop Execution (i = 1 to 10) with break at i == 5:
                </span>
                <p className="text-slate-400 m-0">Watch the loop terminate immediately when i reaches 5.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleNextBreakStep}
                  disabled={breakStep >= 5}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition border ${
                    breakStep < 5
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 hover:bg-purple-500/30'
                      : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{breakStep < 5 ? `Step (i = ${breakStep})` : 'Terminated at 5'}</span>
                </button>
                <button
                  onClick={() => { setBreakStep(1); setBreakOutputs(['Number: 1']); }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-mono transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Loop Steps Grid */}
            <div className="grid grid-cols-5 gap-2 text-center">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={`p-3 rounded-xl border transition ${
                    breakStep === num
                      ? num === 5
                        ? 'bg-rose-950/80 border-rose-500 text-rose-300 ring-1 ring-rose-500/50'
                        : 'bg-purple-950/80 border-purple-500 text-purple-300 ring-1 ring-purple-500/50'
                      : breakStep > num
                      ? 'bg-slate-950/80 border-slate-800 text-slate-400'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600'
                  }`}
                >
                  <span className="block font-bold">i = {num}</span>
                  <span className="text-[10px]">
                    {num === 5 ? '🛑 break!' : 'prints Number'}
                  </span>
                </div>
              ))}
            </div>

            {/* Output Stream */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-slate-400 block">Console Output:</span>
              <div className="font-mono text-xs text-emerald-300 bg-[#060A14] p-3 rounded-lg border border-slate-800 space-y-1">
                {breakOutputs.map((item, idx) => (
                  <div key={idx} className={item.includes('🛑') ? 'text-rose-400 font-bold' : ''}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTINUE IN LOOP */}
      {activeTab === 'continue' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="font-bold uppercase text-slate-300 block mb-1">
                  Loop Iteration Skipping with continue at i == 3:
                </span>
                <p className="text-slate-400 m-0">Iteration 3 skips the rest of the body and jumps directly to 4.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleNextContinueStep}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/50 hover:bg-purple-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Next Step ({continueStep}/5)</span>
                </button>
                <button
                  onClick={() => { setContinueStep(1); setContinueOutputs(['Number: 1']); }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-mono transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Loop Steps Grid */}
            <div className="grid grid-cols-5 gap-2 text-center">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={`p-3 rounded-xl border transition ${
                    continueStep === num
                      ? num === 3
                        ? 'bg-amber-950/80 border-amber-500 text-amber-300 ring-1 ring-amber-500/50'
                        : 'bg-purple-950/80 border-purple-500 text-purple-300 ring-1 ring-purple-500/50'
                      : continueStep > num
                      ? 'bg-slate-950/80 border-slate-800 text-slate-400'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600'
                  }`}
                >
                  <span className="block font-bold">i = {num}</span>
                  <span className="text-[10px]">
                    {num === 3 ? '⏭️ continue' : 'prints Number'}
                  </span>
                </div>
              ))}
            </div>

            {/* Output Stream */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-slate-400 block">Console Output:</span>
              <div className="font-mono text-xs text-emerald-300 bg-[#060A14] p-3 rounded-lg border border-slate-800 space-y-1">
                {continueOutputs.map((item, idx) => (
                  <div key={idx} className={item.includes('Skipping') ? 'text-amber-300 font-bold' : ''}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RETURN IN METHODS */}
      {activeTab === 'return' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
            {/* 1. Value Returning Method */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono text-cyan-400">
                <span>1. Method Returning a Value: int addNumbers(a, b)</span>
                <span className="text-slate-400">return sum;</span>
              </div>

              <div className="flex gap-3 items-center">
                <label className="text-xs font-mono text-slate-300">Inputs:</label>
                <input
                  type="number"
                  value={numA}
                  onChange={(e) => setNumA(parseInt(e.target.value) || 0)}
                  className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono text-xs text-center"
                />
                <span className="text-slate-400 font-mono">+</span>
                <input
                  type="number"
                  value={numB}
                  onChange={(e) => setNumB(parseInt(e.target.value) || 0)}
                  className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-mono text-xs text-center"
                />
                <span className="text-slate-400 font-mono">➔ Result:</span>
                <span className="font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded border border-emerald-500/40 text-sm">
                  {numA + numB}
                </span>
              </div>
            </div>

            {/* 2. Void Method Early Return */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono text-purple-400">
                <span>2. Void Method Early Exit: checkAge(age)</span>
                <span className="text-slate-400">if (age &lt; 18) return;</span>
              </div>

              <div className="flex gap-3 items-center">
                <label className="text-xs font-mono text-slate-300">Test Age:</label>
                {[16, 18, 21].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAgeInput(val)}
                    className={`px-3 py-1 rounded font-mono text-xs border transition ${
                      ageInput === val
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    age = {val}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-[#060A14] rounded-lg border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400">
                  Execution Trace (age = {ageInput}):
                </div>
                {ageInput < 18 ? (
                  <div className="text-rose-400">
                    ➔ age &lt; 18 is TRUE ➔ <strong className="bg-rose-950 px-1.5 py-0.5 rounded">return;</strong> exits method early!
                    <br />
                    <span className="text-slate-300">Console Output: Voting Ended.</span>
                  </div>
                ) : (
                  <div className="text-emerald-400">
                    ➔ age &lt; 18 is FALSE ➔ skips return ➔ executes println("You can vote")
                    <br />
                    <span className="text-slate-300">Console Output: You can vote \n Voting Ended.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SWITCH BREAK */}
      {activeTab === 'switch-break' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 font-mono text-xs">
            <div>
              <span className="font-bold uppercase text-slate-300 block mb-1">
                Using break in switch Statement:
              </span>
              <p className="text-slate-400 m-0">Exits the switch block immediately after matching the case.</p>
            </div>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((d) => (
                <button
                  key={d}
                  onClick={() => setSwitchDay(d)}
                  className={`px-3 py-1.5 rounded-lg border transition ${
                    switchDay === d
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  day = {d} ({daysMap[d]})
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-slate-400 block">Active Case Execution:</span>
              <div className="bg-[#060A14] p-3 rounded-lg border border-slate-800 text-emerald-300">
                case {switchDay}: System.out.println("{daysMap[switchDay]}"); <strong className="text-rose-400">break;</strong> ➔ Exits switch!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
