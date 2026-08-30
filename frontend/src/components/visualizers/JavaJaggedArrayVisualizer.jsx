import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Layers, Play, Pause, RotateCcw, ChevronRight, ChevronLeft,
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  Check, Server, Database, Code, Users, HelpCircle, Lock,
  Sliders, RefreshCw, Activity, ArrowDown, AlertTriangle, Cpu,
  Eye, CornerDownRight, Plus, Trash2, Hash, ArrowUpRight, Grid, Triangle
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaJaggedArrayVisualizer
 * Interactive Architecture Theater for Jagged Arrays in Java:
 * 1. "Array of Arrays" Staircase Heap Memory Map (3 cols, 2 cols, 4 cols)
 * 2. 2-Stage Creation Simulator (Master new int[3][] ➔ Child Allocations)
 * 3. Memory Efficiency Comparator (Matrix 12 slots vs Jagged 9 slots)
 * 4. Pascal's Triangle Jagged Generator
 * 5. Complete Code Walkthrough (JaggedArray1 vs MainJaggedArray2)
 * 6. Interactive Assessment Quiz
 */
export default function JavaJaggedArrayVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('staircase'); // 'staircase' | 'creation' | 'efficiency' | 'pascal' | 'programs' | 'quiz'

  // ==========================================
  // 1. JAGGED ARRAY DATA & MEMORY MAP
  // ==========================================
  const jaggedData = [
    [10, 20, 30],       // Row 0 (3 cols)
    [40, 50],           // Row 1 (2 cols)
    [60, 70, 80, 90]    // Row 2 (4 cols)
  ];
  const [selectedCell, setSelectedCell] = useState({ r: 0, c: 0 });

  // ==========================================
  // 2. CREATION SIMULATOR STATE
  // ==========================================
  const [creationStep, setCreationStep] = useState(1); // 1: Declare, 2: Master int[3][], 3: Child rows int[3], int[2], int[4], 4: Values, 5: Traversal

  // ==========================================
  // 3. PASCAL'S TRIANGLE STATE
  // ==========================================
  const [pascalRows, setPascalRows] = useState(5);
  const generatePascal = (n) => {
    const triangle = [];
    for (let i = 0; i < n; i++) {
      const row = new Array(i + 1);
      row[0] = 1;
      row[i] = 1;
      for (let j = 1; j < i; j++) {
        row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
      triangle.push(row);
    }
    return triangle;
  };
  const pascalData = generatePascal(pascalRows);

  // ==========================================
  // 4. QUIZ STATE
  // ==========================================
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What happens if you attempt to create a Jagged Array with "int[][] arr = new int[][3];" in Java?',
      options: [
        { key: 'A', text: 'Compiles successfully and creates 3 columns per row' },
        { key: 'B', text: 'Compile-time error: The first (row) dimension is mandatory at creation' },
        { key: 'C', text: 'Allocates an infinite number of rows' },
        { key: 'D', text: 'Throws a NullPointerException at runtime' }
      ],
      correct: 'B',
      explanation: 'In Java, the first dimension (row count) is mandatory during array creation (new int[3][]). The second dimension can be left empty for jagged allocation.'
    },
    {
      id: 'q2',
      question: 'What exception is thrown if you execute "jaggedArr[0][0] = 10;" immediately after "int[][] jaggedArr = new int[3][];"?',
      options: [
        { key: 'A', text: 'ArrayIndexOutOfBoundsException' },
        { key: 'B', text: 'NullPointerException' },
        { key: 'C', text: 'IllegalArgumentException' },
        { key: 'D', text: 'No exception, it initializes the first slot' }
      ],
      correct: 'B',
      explanation: 'After "new int[3][]", the master array holds null pointers. Accessing jaggedArr[0][0] dereferences null, triggering a NullPointerException.'
    },
    {
      id: 'q3',
      question: 'Why is a Jagged Array more memory efficient than a fixed rectangular Matrix for irregular datasets?',
      options: [
        { key: 'A', text: 'It compresses integers into 2 bytes' },
        { key: 'B', text: 'It allocates only the exact number of slots needed for each row without wasted empty padding' },
        { key: 'C', text: 'It stores elements in the CPU cache' },
        { key: 'D', text: 'It prevents garbage collection' }
      ],
      correct: 'B',
      explanation: 'Jagged arrays eliminate memory waste by tailoring each row\'s capacity to the exact data count, avoiding unneeded padding slots.'
    },
    {
      id: 'q4',
      question: 'What is the correct inner loop termination condition when traversing a Jagged Array named "arr"?',
      options: [
        { key: 'A', text: 'j < arr.length' },
        { key: 'B', text: 'j < arr[0].length' },
        { key: 'C', text: 'j < arr[i].length' },
        { key: 'D', text: 'j < 10' }
      ],
      correct: 'C',
      explanation: 'Because each row in a jagged array can have a different column count, the inner loop must always use "j < arr[i].length" to avoid ArrayIndexOutOfBoundsException.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Deck */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-900/40 bg-[#0B1222]/90 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
                <Layers className="w-6 h-6 animate-pulse" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Jagged Arrays (Ragged Arrays): Architecture &amp; Staircase Visualizer
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore <b>variable-length rows</b>, the 2-stage creation lifecycle, memory optimization vs matrices, and <b>Pascal's Triangle</b>.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {onOpenPlayground && (
              <button
                onClick={() => onOpenPlayground(`public class JaggedArray1 {\n    public static void main(String[] args) {\n        // 1. Declare and create a jagged array with 3 rows\n        int[][] jaggedArr = new int[3][];\n        jaggedArr[0] = new int[3]; // row 0 has 3 cols\n        jaggedArr[1] = new int[2]; // row 1 has 2 cols\n        jaggedArr[2] = new int[4]; // row 2 has 4 cols\n\n        // 2. Initialize elements\n        jaggedArr[0][0] = 10; jaggedArr[0][1] = 20; jaggedArr[0][2] = 30;\n        jaggedArr[1][0] = 40; jaggedArr[1][1] = 50;\n        jaggedArr[2][0] = 60; jaggedArr[2][1] = 70; jaggedArr[2][2] = 80; jaggedArr[2][3] = 90;\n\n        // 3. For-each traversal\n        System.out.println("Jagged Array Output:");\n        for (int[] row : jaggedArr) {\n            for (int num : row) System.out.print(num + " ");\n            System.out.println();\n        }\n    }\n}`)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/30 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Run JaggedArray1 in Playground</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative z-10 flex flex-wrap gap-2 pt-6">
          {[
            { id: 'staircase', label: '1. Staircase Memory Map', icon: Cpu, badge: 'Variable Rows' },
            { id: 'creation', label: '2. 2-Stage Creation', icon: Activity, badge: 'Avoid NPE' },
            { id: 'efficiency', label: '3. Memory Savings Tool', icon: Zap, badge: 'Matrix vs Jagged' },
            { id: 'pascal', label: "4. Pascal's Triangle", icon: Triangle, badge: 'Algorithm' },
            { id: 'programs', label: '5. Programs Walkthrough', icon: Code2, badge: 'Code Compare' },
            { id: 'quiz', label: '6. Jagged Mastery Quiz', icon: HelpCircle, badge: '4 Questions' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/90 border-cyan-500/80 text-cyan-300 shadow-md shadow-cyan-950/50'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border ${
                  isActive 
                    ? 'bg-cyan-900/60 border-cyan-600 text-cyan-200' 
                    : 'bg-slate-800/80 border-slate-700 text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: STAIRCASE HEAP MEMORY MAP */}
      {/* ========================================================================= */}
      {activeTab === 'staircase' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Staircase Memory Map */}
            <div className="lg:col-span-8 glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <span>Jagged "Staircase" Memory Pointer Architecture</span>
                  </h3>
                  <p className="text-xs text-slate-400">Master Array points to 3 independent Child Arrays of lengths 3, 2, and 4.</p>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
                  Total: 9 Elements
                </span>
              </div>

              <div className="space-y-6">
                {/* 1. Stack & Master */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>🥞</span> Stack Reference
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 font-mono text-xs text-slate-300 space-y-1">
                      <div><span className="text-cyan-400">int[][]</span> jaggedArr;</div>
                      <div className="text-amber-300 text-[11px] flex items-center gap-1 bg-amber-950/40 p-1.5 rounded">
                        <ArrowUpRight className="w-3 h-3" />
                        <span>Ref ➔ 0x1000 (Heap)</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-1 flex justify-center">
                    <ArrowRight className="w-6 h-6 text-cyan-400 animate-pulse hidden md:block" />
                    <ArrowDown className="w-6 h-6 text-cyan-400 animate-pulse md:hidden" />
                  </div>

                  {/* Master Row Array */}
                  <div className="md:col-span-7 p-4 rounded-2xl bg-slate-950 border border-cyan-800/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        📦 Master Array (Length: 3 rows)
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Address: 0x1000</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 space-y-0.5">
                        <div className="text-[9px] text-slate-400 font-bold">[0] Pointer:</div>
                        <div className="font-bold text-[11px]">0x2000 (3 cols)</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 space-y-0.5">
                        <div className="text-[9px] text-slate-400 font-bold">[1] Pointer:</div>
                        <div className="font-bold text-[11px]">0x3000 (2 cols)</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 space-y-0.5">
                        <div className="text-[9px] text-slate-400 font-bold">[2] Pointer:</div>
                        <div className="font-bold text-[11px]">0x4000 (4 cols)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Staircase Child Rows */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Child 1D Array Objects in Heap (Staircase Layout):
                  </div>

                  {/* Row 0: 3 columns */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-mono text-cyan-400 flex items-center justify-between">
                      <span>Row 0 (3 cols at 0x2000)</span>
                      <span className="text-[10px] text-slate-400">length: 3</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 font-mono">
                      {jaggedData[0].map((val, c) => {
                        const isSelected = selectedCell.r === 0 && selectedCell.c === c;
                        return (
                          <button
                            key={c}
                            onClick={() => setSelectedCell({ r: 0, c })}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-cyan-950 border-cyan-400 ring-2 ring-cyan-500 shadow-lg scale-105'
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="text-[9px] text-cyan-400 font-bold mb-1">[0][{c}]</div>
                            <div className="text-lg font-black text-white">{val}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 1: 2 columns */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-xs font-mono text-cyan-400 flex items-center justify-between">
                      <span>Row 1 (2 cols at 0x3000)</span>
                      <span className="text-[10px] text-slate-400">length: 2</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 font-mono">
                      {jaggedData[1].map((val, c) => {
                        const isSelected = selectedCell.r === 1 && selectedCell.c === c;
                        return (
                          <button
                            key={c}
                            onClick={() => setSelectedCell({ r: 1, c })}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-cyan-950 border-cyan-400 ring-2 ring-cyan-500 shadow-lg scale-105'
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="text-[9px] text-cyan-400 font-bold mb-1">[1][{c}]</div>
                            <div className="text-lg font-black text-white">{val}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 2: 4 columns */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-xs font-mono text-cyan-400 flex items-center justify-between">
                      <span>Row 2 (4 cols at 0x4000)</span>
                      <span className="text-[10px] text-slate-400">length: 4</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 font-mono">
                      {jaggedData[2].map((val, c) => {
                        const isSelected = selectedCell.r === 2 && selectedCell.c === c;
                        return (
                          <button
                            key={c}
                            onClick={() => setSelectedCell({ r: 2, c })}
                            className={`p-3 rounded-xl border text-center transition-all ${
                              isSelected
                                ? 'bg-cyan-950 border-cyan-400 ring-2 ring-cyan-500 shadow-lg scale-105'
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="text-[9px] text-cyan-400 font-bold mb-1">[2][{c}]</div>
                            <div className="text-lg font-black text-white">{val}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Selected Cell Inspector */}
            <div className="lg:col-span-4 glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <Hash className="w-5 h-5 text-cyan-400" />
                <h4 className="text-base font-bold text-white">Cell &amp; Row Inspector</h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="text-slate-400">Target Cell:</span>
                  <span className="text-cyan-300 font-bold">jaggedArr[{selectedCell.r}][{selectedCell.c}]</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-400">Row {selectedCell.r} Length:</span>
                  <span className="text-amber-400 font-bold">jaggedArr[{selectedCell.r}].length = {jaggedData[selectedCell.r].length}</span>
                </div>
                <div className="flex justify-between font-mono pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Stored Value:</span>
                  <span className="text-emerald-300 font-bold text-base">{jaggedData[selectedCell.r][selectedCell.c]}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-white">Jagged Dimension Properties:</div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span>jaggedArr.length (Rows):</span>
                    <span className="text-cyan-300 font-bold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Row 0 Columns:</span>
                    <span className="text-cyan-300 font-bold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Row 1 Columns:</span>
                    <span className="text-cyan-300 font-bold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Row 2 Columns:</span>
                    <span className="text-cyan-300 font-bold">4</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-900/40 text-[11px] text-amber-200 leading-relaxed">
                ⚠️ <b>Boundary Safety:</b> Always use <code>j &lt; jaggedArr[i].length</code> in inner loops. Hardcoding <code>j &lt; 4</code> on Row 1 throws <code>ArrayIndexOutOfBoundsException</code>!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 2-STAGE CREATION SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'creation' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span>2-Stage Creation Lifecycle (Preventing NullPointerException)</span>
                </h3>
                <p className="text-xs text-slate-400">Step through Stage 1 (Master Row Array) ➔ Stage 2 (Child Row Allocations) ➔ Stage 3 (Init).</p>
              </div>

              {/* Step Pills */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                {[
                  { step: 1, label: '1. Declare', code: 'int[][] arr;' },
                  { step: 2, label: '2. Master new int[3][]', code: 'arr = new int[3][];' },
                  { step: 3, label: '3. Allocate Rows', code: 'arr[0]=new int[3]...' },
                  { step: 4, label: '4. Populate Values', code: 'arr[r][c] = val;' }
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setCreationStep(s.step)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      creationStep === s.step
                        ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/50'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-cyan-400 uppercase tracking-wider">
                  {creationStep === 1 && 'Step 1: Declaration (Reference Only)'}
                  {creationStep === 2 && 'Step 2: Master Array Allocation (Holding nulls)'}
                  {creationStep === 3 && 'Step 3: Individual Row Allocations (Default 0s)'}
                  {creationStep === 4 && 'Step 4: Assigning Actual Data Values'}
                </div>
                <div className="text-slate-300">
                  {creationStep === 1 && 'Only stack variable declared. No Heap memory allocated.'}
                  {creationStep === 2 && 'Master array of 3 slots allocated. Each slot is initialized to null. Accessing arr[0][0] here throws NullPointerException!'}
                  {creationStep === 3 && 'Each child array (size 3, 2, 4) is allocated on Heap with default zero values (0).'}
                  {creationStep === 4 && 'Values 10, 20, ..., 90 are written into the allocated slots.'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 flex-shrink-0">
                {creationStep === 1 && 'int[][] jaggedArr;'}
                {creationStep === 2 && 'jaggedArr = new int[3][];'}
                {creationStep === 3 && 'jaggedArr[0] = new int[3]; ...'}
                {creationStep === 4 && 'jaggedArr[0][0] = 10; ...'}
              </div>
            </div>

            {/* Visual State Box */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              {creationStep === 1 && (
                <div className="p-8 border-2 border-dashed border-slate-800 rounded-2xl text-xs font-mono text-slate-500 text-center">
                  [ Stack Reference `jaggedArr = null` | No Heap Memory Allocated ]
                </div>
              )}

              {creationStep === 2 && (
                <div className="space-y-3 max-w-md mx-auto">
                  <div className="text-xs font-bold text-amber-400 font-mono text-center">
                    Master Array Allocated (All 3 row pointers are null):
                  </div>
                  <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                    {['[0]: null', '[1]: null', '[2]: null'].map((txt, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-red-500/40 text-red-300 text-center font-bold">
                        {txt}
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-red-400 font-mono text-center bg-red-950/30 p-2 rounded-xl border border-red-900/50">
                    ⚠️ Attempting `jaggedArr[0][0] = 10` right now throws NullPointerException!
                  </div>
                </div>
              )}

              {(creationStep === 3 || creationStep === 4) && (
                <div className="space-y-3 max-w-lg mx-auto font-mono">
                  <div className="text-xs font-bold text-cyan-400 text-center">
                    {creationStep === 3 ? 'Child Rows Allocated (Default 0s)' : 'Fully Populated Jagged Staircase'}
                  </div>

                  <div className="space-y-2">
                    {jaggedData.map((row, r) => (
                      <div key={r} className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 w-16">Row {r} ({row.length}c):</span>
                        <div className="flex gap-2">
                          {row.map((val, c) => (
                            <div
                              key={c}
                              className={`p-3 rounded-xl border text-center transition-all ${
                                creationStep === 4
                                  ? 'bg-slate-900 border-emerald-500/50 text-emerald-300 font-bold'
                                  : 'bg-slate-900 border-slate-800 text-slate-500 font-bold'
                              }`}
                            >
                              <div className="text-[9px] text-cyan-400">[{r}][{c}]</div>
                              <div className="text-base">{creationStep === 4 ? val : 0}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MEMORY EFFICIENCY TOOL */}
      {/* ========================================================================= */}
      {activeTab === 'efficiency' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rectangular Matrix with Wasted Slots */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Rectangular Matrix (3x4 = 12 Slots)</span>
                </h4>
                <span className="text-xs font-mono text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
                  25% Memory Wasted
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="text-slate-400">Allocated Grid: 3 rows × 4 cols = 12 slots (48 bytes)</div>
                <div className="space-y-1.5">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-center font-bold">10</div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-center font-bold">20</div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-center font-bold">30</div>
                    <div className="p-2.5 rounded bg-red-950/40 border border-red-500/40 text-red-400 text-center line-through">Unused</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-center font-bold">40</div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-center font-bold">50</div>
                    <div className="p-2.5 rounded bg-red-950/40 border border-red-500/40 text-red-400 text-center line-through">Unused</div>
                    <div className="p-2.5 rounded bg-red-950/40 border border-red-500/40 text-red-400 text-center line-through">Unused</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-center font-bold">60</div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-center font-bold">70</div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-center font-bold">80</div>
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-center font-bold">90</div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                In a fixed matrix, 3 slots (12 bytes) sit permanently empty with dummy padding values.
              </p>
            </div>

            {/* Jagged Array 0% Waste */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Jagged Array (3+2+4 = 9 Slots)</span>
                </h4>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  0% Waste (100% Efficient)
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="text-slate-400">Allocated Grid: Exact match (36 bytes)</div>
                <div className="space-y-1.5">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-center font-bold">10</div>
                    <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-center font-bold">20</div>
                    <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-center font-bold">30</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-center font-bold">40</div>
                    <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-center font-bold">50</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-center font-bold">60</div>
                    <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-center font-bold">70</div>
                    <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-center font-bold">80</div>
                    <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-center font-bold">90</div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Every allocated slot is actively utilized. Ideal for large-scale enterprise datasets with varying row lengths!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PASCAL'S TRIANGLE GENERATOR */}
      {/* ========================================================================= */}
      {activeTab === 'pascal' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Triangle className="w-5 h-5 text-cyan-400" />
                  <span>Pascal's Triangle Jagged Array Generator</span>
                </h3>
                <p className="text-xs text-slate-400">Row i has exactly (i + 1) columns: triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j].</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Rows:</span>
                {[3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setPascalRows(num)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                      pascalRows === num
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Triangle Render */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-3 font-mono">
              {pascalData.map((row, r) => (
                <div key={r} className="flex items-center justify-center gap-2">
                  <span className="text-[10px] text-slate-500 w-16 text-right">Row {r}:</span>
                  <div className="flex gap-2">
                    {row.map((val, c) => (
                      <div
                        key={c}
                        className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-bold flex items-center justify-center text-sm shadow-md"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PROGRAMS WALKTHROUGH */}
      {/* ========================================================================= */}
      {activeTab === 'programs' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Program 1 */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-950 border border-blue-700 text-blue-400 font-mono text-xs">P1</span>
                  <span>Program 1: Explicit 2-Stage Allocation (JaggedArray1)</span>
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed overflow-x-auto">
                <div><span className="text-cyan-400">public class</span> <span className="text-amber-300">JaggedArray1</span> {'{'}</div>
                <div className="pl-3"><span className="text-cyan-400">public static void</span> main(String[] args) {'{'}</div>
                <div className="pl-6 text-slate-500">// 1. Master row allocation</div>
                <div className="pl-6 text-cyan-300">int[][] jaggedArr = new int[3][];</div>
                <div className="pl-6 text-slate-500 pt-1">// 2. Individual row allocations</div>
                <div className="pl-6 text-cyan-300">jaggedArr[0] = new int[3];</div>
                <div className="pl-6 text-cyan-300">jaggedArr[1] = new int[2];</div>
                <div className="pl-6 text-cyan-300">jaggedArr[2] = new int[4];</div>
                <div className="pl-6 text-slate-500 pt-1">// 3. For-each traversal</div>
                <div className="pl-6 text-emerald-300">for (int[] row : jaggedArr) {'{'}</div>
                <div className="pl-9 text-emerald-300">for (int num : row) System.out.print(num + " ");</div>
                <div className="pl-9 text-slate-400">System.out.println();</div>
                <div className="pl-6 text-emerald-300">{'}'}</div>
                <div className="pl-3">{'}'}</div>
                <div>{'}'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-900/50 text-xs text-blue-200">
                <b>Summary:</b> Explicit allocation is essential when row capacities are decided at runtime or read from user input.
              </div>
            </div>

            {/* Program 2 */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-400 font-mono text-xs">P2</span>
                  <span>Program 2: Shorthand Array Literal (MainJaggedArray2)</span>
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed overflow-x-auto">
                <div><span className="text-cyan-400">public class</span> <span className="text-amber-300">MainJaggedArray2</span> {'{'}</div>
                <div className="pl-3"><span className="text-cyan-400">public static void</span> main(String[] args) {'{'}</div>
                <div className="pl-6 text-slate-500">// 1. Shorthand literal with variable lengths</div>
                <div className="pl-6 text-emerald-300 font-bold">int[][] jaggedArr = {'{'}</div>
                <div className="pl-9 text-emerald-300">{'{10, 20}'},</div>
                <div className="pl-9 text-emerald-300">{'{30, 40, 50, 60}'},</div>
                <div className="pl-9 text-emerald-300">{'{70, 80, 90}'}</div>
                <div className="pl-6 text-emerald-300 font-bold">{'}'};</div>
                <div className="pl-6 text-slate-500 pt-1">// 2. Traversal</div>
                <div className="pl-6 text-cyan-300">for (int[] row : jaggedArr) {'{'}</div>
                <div className="pl-9 text-cyan-300">for (int num : row) System.out.print(num + " ");</div>
                <div className="pl-9 text-slate-400">System.out.println();</div>
                <div className="pl-6 text-cyan-300">{'}'}</div>
                <div className="pl-3">{'}'}</div>
                <div>{'}'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-900/50 text-xs text-emerald-200">
                <b>Summary:</b> Concise production syntax when known ragged values are available upfront.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: KNOWLEDGE ASSESSMENT QUIZ */}
      {/* ========================================================================= */}
      {activeTab === 'quiz' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Jagged Array Mastery Assessment</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">4 High-Yield Questions</span>
            </div>

            <div className="space-y-6">
              {quizQuestions.map((q, qIndex) => {
                const selectedOpt = quizAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;
                const isCorrect = isAnswered && selectedOpt === q.correct;

                return (
                  <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                    <div className="text-sm font-bold text-white flex items-start gap-2">
                      <span className="text-cyan-400 font-mono">Q{qIndex + 1}.</span>
                      <span>{q.question}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {q.options.map((opt) => {
                        const isSelected = selectedOpt === opt.key;
                        let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700';

                        if (quizSubmitted) {
                          if (opt.key === q.correct) {
                            btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isSelected) {
                            btnStyle = 'bg-red-950/80 border-red-500 text-red-200 line-through';
                          }
                        } else if (isSelected) {
                          btnStyle = 'bg-cyan-950 border-cyan-500 text-cyan-200 font-bold';
                        }

                        return (
                          <button
                            key={opt.key}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: opt.key }))}
                            className={`p-3 rounded-xl text-left text-xs transition-all border flex items-center gap-2.5 ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-mono font-bold text-[10px]">
                              {opt.key}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                        isCorrect ? 'bg-emerald-950/40 border border-emerald-800/50 text-emerald-300' : 'bg-red-950/40 border border-red-800/50 text-red-300'
                      }`}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />}
                        <div>
                          <p className="font-bold">{isCorrect ? 'Correct!' : `Incorrect (Correct is Option ${q.correct})`}</p>
                          <p className="text-slate-300 mt-0.5">{q.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                {quizSubmitted ? (
                  <span className="text-cyan-400 font-bold">
                    Score: {Object.keys(quizAnswers).filter(id => quizAnswers[id] === quizQuestions.find(q => q.id === id)?.correct).length} / {quizQuestions.length} Correct
                  </span>
                ) : (
                  <span>Select an option for each question and submit.</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {quizSubmitted ? (
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
                  >
                    Retake Quiz
                  </button>
                ) : (
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-lg shadow-cyan-900/40"
                  >
                    Submit Answers
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
