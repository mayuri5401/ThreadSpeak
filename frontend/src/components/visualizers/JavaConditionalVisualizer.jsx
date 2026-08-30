import React, { useState } from 'react';
import { 
  GitBranch, Play, CheckCircle, XCircle, Sparkles, 
  HelpCircle, Code2, Layers, AlertCircle, ArrowRight, Sun, CloudRain
} from 'lucide-react';

export default function JavaConditionalVisualizer() {
  const [activeTab, setActiveTab] = useState('analogy'); // 'analogy' | 'if-else' | 'ladder' | 'switch'
  
  // Analogy state
  const [isRaining, setIsRaining] = useState(false);

  // If-else state
  const [numberInput, setNumberInput] = useState(10);
  const [useBraces, setUseBraces] = useState(true);

  // Ladder state
  const [marks, setMarks] = useState(75);

  // Switch state
  const [dayNumber, setDayNumber] = useState(3);
  const [includeBreak, setIncludeBreak] = useState(true);

  // Calculate grade
  const getGradeResult = (m) => {
    if (m >= 90) return { grade: 'Grade: A', step: 1, condition: 'marks >= 90 (True)' };
    if (m >= 75) return { grade: 'Grade: B', step: 2, condition: 'marks >= 75 (True)' };
    if (m >= 50) return { grade: 'Grade: C', step: 3, condition: 'marks >= 50 (True)' };
    return { grade: 'Grade: F', step: 4, condition: 'All false ➔ else (Fallback)' };
  };

  const gradeInfo = getGradeResult(marks);

  const daysMap = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday'
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-7 border border-slate-800/80 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Conditional Statements Simulator
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                Interactive
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Visualize branching logic, if-else ladders, switch cases, and optional curly braces.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('analogy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'analogy'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🌧️ Decision Analogy</span>
          </button>

          <button
            onClick={() => setActiveTab('if-else')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'if-else'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>if & if-else</span>
          </button>

          <button
            onClick={() => setActiveTab('ladder')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'ladder'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>if-else if Ladder</span>
          </button>

          <button
            onClick={() => setActiveTab('switch')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'switch'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>switch Statement</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DECISION ANALOGY */}
      {activeTab === 'analogy' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0C1222] via-[#0E172C] to-[#090D1A] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
            <div className="text-center max-w-lg mx-auto mb-6">
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                Decision Making in Real Life vs Code
              </span>
              <h4 className="text-xl font-extrabold text-white mt-2">
                "Is it raining?"
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Toggle the condition below to observe how conditional branching changes program flow:
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={() => setIsRaining(false)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border ${
                  !isRaining
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-lg shadow-emerald-950/50 scale-105'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span>No (False)</span>
              </button>

              <button
                onClick={() => setIsRaining(true)}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border ${
                  isRaining
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 shadow-lg shadow-rose-950/50 scale-105'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <CloudRain className="w-4 h-4 text-cyan-400" />
                <span>Yes (True)</span>
              </button>
            </div>

            {/* Visual Outcome Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <div
                className={`p-4 rounded-xl border transition-all ${
                  !isRaining
                    ? 'bg-emerald-950/60 border-emerald-500/60 shadow-lg ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/40 border-slate-800 opacity-40'
                }`}
              >
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase mb-1">
                  when isRaining == false
                </div>
                <div className="text-base font-bold text-white mb-2">
                  🏏 "Then let's play cricket!"
                </div>
                <div className="font-mono text-xs text-emerald-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <code>if (!isRaining) &#123; playCricket(); &#125;</code>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border transition-all ${
                  isRaining
                    ? 'bg-rose-950/60 border-rose-500/60 shadow-lg ring-1 ring-rose-500/30'
                    : 'bg-slate-900/40 border-slate-800 opacity-40'
                }`}
              >
                <div className="text-xs font-mono font-bold text-rose-400 uppercase mb-1">
                  when isRaining == true
                </div>
                <div className="text-base font-bold text-white mb-2">
                  🏠 "Ohh, we can't play cricket."
                </div>
                <div className="font-mono text-xs text-rose-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <code>else &#123; stayIndoors(); &#125;</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IF & IF-ELSE */}
      {activeTab === 'if-else' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                  Enter integer value for 'number':
                </label>
                <div className="flex gap-2">
                  {[10, -5, 0, 42, -100].map((val) => (
                    <button
                      key={val}
                      onClick={() => setNumberInput(val)}
                      className={`px-3 py-1 rounded-lg font-mono text-xs border transition ${
                        numberInput === val
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                  <input
                    type="number"
                    value={numberInput}
                    onChange={(e) => setNumberInput(parseInt(e.target.value) || 0)}
                    className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-xs text-center"
                  />
                </div>
              </div>

              {/* Braces toggle */}
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-slate-300">Single-Statement Braces:</span>
                <button
                  onClick={() => setUseBraces(!useBraces)}
                  className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold transition ${
                    useBraces
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                      : 'bg-amber-950 text-amber-300 border border-amber-500/50'
                  }`}
                >
                  {useBraces ? 'With { }' : 'Optional (No Braces)'}
                </button>
              </div>
            </div>

            {/* Live Code Rendering */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Simple if */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>1. Simple if statement</span>
                  <span className="text-slate-400">Condition: number &gt; 0 ({numberInput > 0 ? 'TRUE' : 'FALSE'})</span>
                </div>
                <pre className="font-mono text-xs text-slate-200 bg-[#060A14] p-3 rounded-lg border border-slate-800/80 overflow-x-auto">
{useBraces ? `if (number > 0) {
    System.out.println("The number is positive.");
}` : `if (number > 0)
    System.out.println("The number is positive.");`}
                </pre>
                <div className="text-xs font-mono text-slate-400 pt-1">
                  <strong>Output: </strong>
                  {numberInput > 0 ? (
                    <span className="text-emerald-400">The number is positive.</span>
                  ) : (
                    <span className="text-slate-500">[No output printed]</span>
                  )}
                </div>
              </div>

              {/* if-else */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-purple-400">
                  <span>2. if-else statement</span>
                  <span className="text-slate-400">Branch: {numberInput > 0 ? 'if block' : 'else block'}</span>
                </div>
                <pre className="font-mono text-xs text-slate-200 bg-[#060A14] p-3 rounded-lg border border-slate-800/80 overflow-x-auto">
{useBraces ? `if (number > 0) {
    System.out.println("The number is positive.");
} else {
    System.out.println("The number is negative.");
}` : `if (number > 0)
    System.out.println("The number is positive.");
else
    System.out.println("The number is negative.");`}
                </pre>
                <div className="text-xs font-mono text-slate-400 pt-1">
                  <strong>Output: </strong>
                  <span className={numberInput > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                    {numberInput > 0 ? 'The number is positive.' : 'The number is negative.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: IF-ELSE IF LADDER */}
      {activeTab === 'ladder' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-300">
                  Test Student Marks (0 - 100):
                </label>
                <span className="text-sm font-mono font-bold text-cyan-300 bg-slate-950 px-3 py-0.5 rounded border border-slate-800">
                  marks = {marks}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={marks}
                onChange={(e) => setMarks(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>0 (Fail)</span>
                <span>50 (Grade C)</span>
                <span>75 (Grade B)</span>
                <span>90 (Grade A)</span>
                <span>100</span>
              </div>
            </div>

            {/* Ladder Steps Execution Viewer */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400">Sequential Ladder Evaluation:</span>
              
              {/* Step 1: >= 90 */}
              <div className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between transition ${
                marks >= 90
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                <span>1. if (marks &gt;= 90) ➔ System.out.println("Grade: A");</span>
                <span className="font-bold">{marks >= 90 ? '✅ MATCHED & EXECUTED' : '❌ FALSE (skipped)'}</span>
              </div>

              {/* Step 2: >= 75 */}
              <div className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between transition ${
                marks < 90 && marks >= 75
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                <span>2. else if (marks &gt;= 75) ➔ System.out.println("Grade: B");</span>
                <span className="font-bold">
                  {marks >= 90 ? '⏭️ SKIPPED' : marks >= 75 ? '✅ MATCHED & EXECUTED' : '❌ FALSE (skipped)'}
                </span>
              </div>

              {/* Step 3: >= 50 */}
              <div className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between transition ${
                marks < 75 && marks >= 50
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                <span>3. else if (marks &gt;= 50) ➔ System.out.println("Grade: C");</span>
                <span className="font-bold">
                  {marks >= 75 ? '⏭️ SKIPPED' : marks >= 50 ? '✅ MATCHED & EXECUTED' : '❌ FALSE (skipped)'}
                </span>
              </div>

              {/* Step 4: else fallback */}
              <div className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between transition ${
                marks < 50
                  ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                <span>4. else ➔ System.out.println("Grade: F");</span>
                <span className="font-bold">{marks < 50 ? '✅ FALLBACK EXECUTED' : '⏭️ SKIPPED'}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Final Console Output:</span>
              <span className="text-sm font-mono font-bold text-cyan-300 bg-slate-900 px-3 py-1 rounded border border-cyan-500/30">
                {gradeInfo.grade}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SWITCH STATEMENT */}
      {activeTab === 'switch' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-2">
                Select Day Number (1 - 7 or Invalid):
              </label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 9].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDayNumber(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition border ${
                      dayNumber === d
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    day = {d} {d <= 7 ? `(${daysMap[d]})` : '(Invalid)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Switch Code Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>switch(day) Execution Trace</span>
                <span className="text-slate-400">Jump to case {dayNumber}</span>
              </div>

              <div className="font-mono text-xs bg-[#060A14] p-3 rounded-lg border border-slate-800/80 space-y-1">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <div
                    key={num}
                    className={`px-2 py-1 rounded transition ${
                      dayNumber === num
                        ? 'bg-emerald-950/80 text-emerald-300 font-bold border-l-2 border-emerald-400'
                        : 'text-slate-500'
                    }`}
                  >
                    case {num}: System.out.println("{daysMap[num]}"); break;
                  </div>
                ))}
                <div
                  className={`px-2 py-1 rounded transition ${
                    dayNumber > 7
                      ? 'bg-emerald-950/80 text-emerald-300 font-bold border-l-2 border-emerald-400'
                      : 'text-slate-500'
                  }`}
                >
                  default: System.out.println("Invalid day");
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Console Output:</span>
                <span className="text-sm font-mono font-bold text-emerald-400">
                  {daysMap[dayNumber] || 'Invalid day'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
