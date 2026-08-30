import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Layers, Play, Pause, RotateCcw, ChevronRight, ChevronLeft,
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  Check, Server, Database, Code, Users, HelpCircle, Lock,
  Sliders, RefreshCw, Activity, ArrowDown, AlertTriangle, Cpu,
  Eye, CornerDownRight, Plus, Trash2, Hash, ArrowUpRight, Grid
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * Java2DArrayVisualizer
 * Interactive Architecture Theater for Multi-Dimensional (2D) Arrays in Java:
 * 1. "Array of Arrays" Heap Memory & Pointer Architecture Visualizer
 * 2. 4-Step 2D Lifecycle Animator (Declare ➔ Heap Allocation ➔ Slot Init ➔ Retrieve)
 * 3. Nested Loop Cell-by-Cell Pointer Tracer (Outer loop i, Inner loop j)
 * 4. Code Comparison (MainApp1 vs MainApp2)
 * 5. Interactive Assessment Quiz
 */
export default function Java2DArrayVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('memory'); // 'memory' | 'lifecycle' | 'loop' | 'programs' | 'quiz'

  // ==========================================
  // 1. 2D ARRAY DATA & MEMORY MAP
  // ==========================================
  const gridData = [
    [10, 20, 30],
    [40, 50, 60]
  ];
  const [selectedCell, setSelectedCell] = useState({ r: 0, c: 0 });

  // ==========================================
  // 2. LIFECYCLE SIMULATOR STATE
  // ==========================================
  const [lifecycleStep, setLifecycleStep] = useState(1); // 1: Declare, 2: Create (new int[2][3]), 3: Initialize, 4: Retrieve

  // ==========================================
  // 3. NESTED LOOP TRACER STATE
  // ==========================================
  const [loopPos, setLoopPos] = useState({ r: 0, c: 0 });
  const [isLoopPlaying, setIsLoopPlaying] = useState(false);
  const [terminalRows, setTerminalRows] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isLoopPlaying) {
      timerRef.current = setInterval(() => {
        setLoopPos((prev) => {
          let nextR = prev.r;
          let nextC = prev.c + 1;

          if (nextC >= gridData[0].length) {
            nextC = 0;
            nextR = prev.r + 1;
          }

          if (nextR >= gridData.length) {
            setIsLoopPlaying(false);
            clearInterval(timerRef.current);
            return prev;
          }

          setTerminalRows((curr) => {
            const val = gridData[nextR][nextC];
            const updated = [...curr];
            if (!updated[nextR]) updated[nextR] = [];
            updated[nextR].push(val);
            return updated;
          });

          return { r: nextR, c: nextC };
        });
      }, 700);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isLoopPlaying]);

  const startLoopAnimation = () => {
    setLoopPos({ r: 0, c: 0 });
    setTerminalRows([[gridData[0][0]]]);
    setIsLoopPlaying(true);
  };

  const resetLoopAnimation = () => {
    setIsLoopPlaying(false);
    setLoopPos({ r: 0, c: 0 });
    setTerminalRows([]);
  };

  // ==========================================
  // 4. QUIZ STATE
  // ==========================================
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What does "numbers.length" return for a 2D array declared as "int[][] numbers = new int[2][3];"?',
      options: [
        { key: 'A', text: '6 (Total elements)' },
        { key: 'B', text: '2 (Number of rows)' },
        { key: 'C', text: '3 (Number of columns)' },
        { key: 'D', text: 'null' }
      ],
      correct: 'B',
      explanation: 'In Java, numbers.length gives the length of the master 1D array of row references, which represents the number of rows (2).'
    },
    {
      id: 'q2',
      question: 'How is a 2D array represented internally in JVM memory?',
      options: [
        { key: 'A', text: 'A single contiguous flat block of rows and columns' },
        { key: 'B', text: 'An array of object references, where each reference points to an independent child 1D array object on the Heap' },
        { key: 'C', text: 'A binary search tree structure' },
        { key: 'D', text: 'Stored on the CPU cache exclusively' }
      ],
      correct: 'B',
      explanation: 'Java does not use contiguous 2D matrices. A 2D array is an "Array of Arrays", where master row slots hold pointers to independent 1D child arrays.'
    },
    {
      id: 'q3',
      question: 'Which index accesses the last element of "int[][] numbers = new int[2][3];"?',
      options: [
        { key: 'A', text: 'numbers[2][3]' },
        { key: 'B', text: 'numbers[1][2]' },
        { key: 'C', text: 'numbers[2][2]' },
        { key: 'D', text: 'numbers[1][3]' }
      ],
      correct: 'B',
      explanation: 'With 2 rows and 3 columns, valid row indices are 0 to 1 and column indices are 0 to 2. The last element is at numbers[1][2].'
    },
    {
      id: 'q4',
      question: 'What utility method from java.util.Arrays correctly formats and prints a 2D array to a string?',
      options: [
        { key: 'A', text: 'Arrays.toString(numbers)' },
        { key: 'B', text: 'Arrays.deepToString(numbers)' },
        { key: 'C', text: 'Arrays.printGrid(numbers)' },
        { key: 'D', text: 'numbers.toString()' }
      ],
      correct: 'B',
      explanation: 'Arrays.deepToString() recursively traverses multidimensional arrays to print nested values, whereas Arrays.toString() only prints row hashcodes.'
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
                <Grid className="w-6 h-6 animate-pulse" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                2D Arrays (Multi-Dimensional): Architecture &amp; Nested Loop Visualizer
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore the <b>"Array of Arrays"</b> pointer architecture in Heap memory, the 4-step lifecycle, nested loop cell traversal, and shorthand declarations.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {onOpenPlayground && (
              <button
                onClick={() => onOpenPlayground(`public class MainApp2 {\n    public static void main(String[] args) {\n        // 1. Declare, create, and initialize 2x3 array\n        int[][] numbers = {\n            {10, 20, 30},\n            {40, 50, 60}\n        };\n\n        // 2. Access using nested for-each loop\n        System.out.println("Numbers are:");\n        for (int[] row : numbers) {\n            for (int num : row) {\n                System.out.print(num + " ");\n            }\n            System.out.println();\n        }\n    }\n}`)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/30 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Run MainApp2 in Playground</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative z-10 flex flex-wrap gap-2 pt-6">
          {[
            { id: 'memory', label: '1. "Array of Arrays" Memory Map', icon: Cpu, badge: 'Heap Pointers' },
            { id: 'lifecycle', label: '2. 4-Step 2D Lifecycle', icon: Activity, badge: 'Declare ➔ Retrieve' },
            { id: 'loop', label: '3. Nested Loop Cell Tracer', icon: Play, badge: 'Row × Col Loop' },
            { id: 'programs', label: '4. MainApp1 vs MainApp2', icon: Code2, badge: 'Code Compare' },
            { id: 'quiz', label: '5. 2D Mastery Quiz', icon: HelpCircle, badge: '4 Questions' }
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
      {/* TAB 1: "ARRAY OF ARRAYS" HEAP POINTER MEMORY MAP */}
      {/* ========================================================================= */}
      {activeTab === 'memory' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Interactive JVM Memory Map */}
            <div className="lg:col-span-8 glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                    <span>JVM "Array of Arrays" Pointer Hierarchy</span>
                  </h3>
                  <p className="text-xs text-slate-400">Stack Reference ➔ Master Row Array ➔ Independent Child 1D Array Objects.</p>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
                  int[2][3] Grid
                </span>
              </div>

              {/* Visual Memory Flow */}
              <div className="space-y-6">
                {/* 1. Stack Reference & Master Row Array */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>🥞</span> Stack Frame
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/30 font-mono text-xs text-slate-300 space-y-1">
                      <div><span className="text-cyan-400">int[][]</span> numbers;</div>
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
                        📦 Master Array (Length: 2 rows)
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Address: 0x1000</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 space-y-1">
                        <div className="text-[10px] text-slate-400 font-bold">Row [0] Slot:</div>
                        <div className="font-bold flex items-center gap-1">
                          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                          <span>0x2000 (Child Row 0)</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 space-y-1">
                        <div className="text-[10px] text-slate-400 font-bold">Row [1] Slot:</div>
                        <div className="font-bold flex items-center gap-1">
                          <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                          <span>0x3000 (Child Row 1)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Child 1D Array Objects in Heap */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Child 1D Array Objects (Rows):
                  </div>

                  {/* Row 0 */}
                  <div className="space-y-1.5">
                    <div className="text-xs font-mono text-cyan-400 flex items-center justify-between">
                      <span>Row 0 (numbers[0]) ➔ Heap Address: 0x2000</span>
                      <span className="text-[10px] text-slate-400">length: 3</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 font-mono">
                      {gridData[0].map((val, c) => {
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
                            <div className="text-[10px] text-cyan-400 font-bold mb-1">[0][{c}]</div>
                            <div className="text-lg font-black text-white">{val}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 1 */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-xs font-mono text-cyan-400 flex items-center justify-between">
                      <span>Row 1 (numbers[1]) ➔ Heap Address: 0x3000</span>
                      <span className="text-[10px] text-slate-400">length: 3</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 font-mono">
                      {gridData[1].map((val, c) => {
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
                            <div className="text-[10px] text-cyan-400 font-bold mb-1">[1][{c}]</div>
                            <div className="text-lg font-black text-white">{val}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Selected Cell Inspector */}
            <div className="lg:col-span-4 glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <Hash className="w-5 h-5 text-cyan-400" />
                <h4 className="text-base font-bold text-white">Selected Cell Inspector</h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="text-slate-400">Target Expression:</span>
                  <span className="text-cyan-300 font-bold">numbers[{selectedCell.r}][{selectedCell.c}]</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-400">Row Index (i):</span>
                  <span className="text-amber-400 font-bold">{selectedCell.r}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="text-slate-400">Column Index (j):</span>
                  <span className="text-amber-400 font-bold">{selectedCell.c}</span>
                </div>
                <div className="flex justify-between font-mono pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Stored Value:</span>
                  <span className="text-emerald-300 font-bold text-base">{gridData[selectedCell.r][selectedCell.c]}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-white">2D Dimension Properties:</div>
                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  <div className="flex justify-between">
                    <span>numbers.length (Rows):</span>
                    <span className="text-cyan-300 font-bold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>numbers[0].length (Cols):</span>
                    <span className="text-cyan-300 font-bold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Elements:</span>
                    <span className="text-amber-300 font-bold">6</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-900/40 text-[11px] text-slate-300 leading-relaxed">
                💡 <b>Key Architecture Note:</b> Notice that Row 0 and Row 1 are independent objects on the Heap. This is what allows Java to support <b>Jagged Arrays</b> where rows have different column lengths!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 4-STEP 2D LIFECYCLE ANIMATOR */}
      {/* ========================================================================= */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span>The 4-Step Lifecycle of a 2D Array</span>
                </h3>
                <p className="text-xs text-slate-400">Step through declaration, creation, slot initialization, and grid retrieval.</p>
              </div>

              {/* Step Navigation Pill Buttons */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                {[
                  { step: 1, label: '1. Declare', code: 'int[][] numbers;' },
                  { step: 2, label: '2. Create', code: 'new int[2][3];' },
                  { step: 3, label: '3. Initialize', code: 'numbers[r][c] = val;' },
                  { step: 4, label: '4. Retrieve', code: 'numbers[0][1]' }
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setLifecycleStep(s.step)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      lifecycleStep === s.step
                        ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/50'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Banner */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {lifecycleStep === 1 && 'Step 1: Declare 2D Array Reference'}
                  {lifecycleStep === 2 && 'Step 2: Allocate 2x3 Grid on Heap with new'}
                  {lifecycleStep === 3 && 'Step 3: Assign Cell Values'}
                  {lifecycleStep === 4 && 'Step 4: Retrieve Elements via Row/Col Indices'}
                </div>
                <div className="text-xs text-slate-300">
                  {lifecycleStep === 1 && 'Only the reference variable is declared on the Stack (null pointer). No Heap memory allocated.'}
                  {lifecycleStep === 2 && 'JVM allocates the Master row array and two Child row arrays filled with default zeros (0, 0, 0).'}
                  {lifecycleStep === 3 && 'Values (10, 20, 30, 40, 50, 60) are assigned into the respective [r][c] slots.'}
                  {lifecycleStep === 4 && 'Access elements with numbers[0][1] (20), nested for loops, or enhanced for-each loops.'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 flex-shrink-0">
                {lifecycleStep === 1 && 'int[][] numbers;'}
                {lifecycleStep === 2 && 'numbers = new int[2][3];'}
                {lifecycleStep === 3 && 'numbers[0][0] = 10; ...'}
                {lifecycleStep === 4 && 'System.out.println(numbers[0][1]);'}
              </div>
            </div>

            {/* Visual Lifecycle Render */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-4">
              {lifecycleStep === 1 ? (
                <div className="p-8 border-2 border-dashed border-slate-800 rounded-2xl text-xs font-mono text-slate-500 text-center">
                  [ Stack Reference `numbers = null` | No Heap Memory Allocated ]
                </div>
              ) : (
                <div className="space-y-3 w-full max-w-md">
                  <div className="text-xs font-mono text-cyan-400 text-center">
                    {lifecycleStep === 2 ? '2x3 Array Initialized with Default 0s' : 'Populated 2x3 Matrix'}
                  </div>
                  <div className="grid grid-cols-3 gap-2.5 font-mono">
                    {(lifecycleStep === 2 ? [[0, 0, 0], [0, 0, 0]] : gridData).map((row, r) =>
                      row.map((val, c) => {
                        const isRetrieved = lifecycleStep === 4 && r === 0 && c === 1;
                        return (
                          <div
                            key={`${r}-${c}`}
                            className={`p-3.5 rounded-xl border text-center transition-all ${
                              isRetrieved
                                ? 'bg-cyan-950 border-cyan-400 ring-2 ring-cyan-500 shadow-xl scale-105'
                                : lifecycleStep === 3
                                ? 'bg-slate-900 border-emerald-500/50 text-emerald-300'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                            }`}
                          >
                            <div className="text-[10px] text-cyan-400 font-bold mb-1">[{r}][{c}]</div>
                            <div className="text-lg font-black">{val}</div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: NESTED LOOP CELL TRACER */}
      {/* ========================================================================= */}
      {activeTab === 'loop' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-cyan-400" />
                  <span>Nested Loop Cell-by-Cell Pointer Tracer</span>
                </h3>
                <p className="text-xs text-slate-400">Watch outer loop pointer (i) and inner loop pointer (j) traverse the 2D grid.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={startLoopAnimation}
                  disabled={isLoopPlaying}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isLoopPlaying ? 'Traversing...' : 'Animate Nested Loop'}</span>
                </button>
                <button
                  onClick={resetLoopAnimation}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                  title="Reset Tracer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Grid with Active Pointer */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Outer Loop (i): Row {loopPos.r}</span>
                  <span>Inner Loop (j): Col {loopPos.c}</span>
                </div>

                <div className="grid grid-cols-3 gap-3 font-mono">
                  {gridData.map((row, r) =>
                    row.map((val, c) => {
                      const isActive = isLoopPlaying && loopPos.r === r && loopPos.c === c;
                      const isPast = isLoopPlaying && (r < loopPos.r || (r === loopPos.r && c <= loopPos.c));

                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`p-4 rounded-2xl border text-center transition-all relative overflow-hidden ${
                            isActive
                              ? 'bg-cyan-950 border-cyan-400 ring-2 ring-cyan-500 shadow-xl shadow-cyan-950/80 scale-105'
                              : isPast
                              ? 'bg-slate-900 border-emerald-600/40 text-slate-200'
                              : 'bg-slate-900/80 border-slate-800 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-cyan-400 font-bold">[{r}][{c}]</span>
                            {isActive && (
                              <span className="text-[9px] bg-cyan-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full animate-bounce">
                                i={r}, j={c}
                              </span>
                            )}
                          </div>
                          <div className="text-2xl font-black text-white">{val}</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Console Output Terminal */}
              <div className="md:col-span-5 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Live Terminal Stream:</div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 min-h-[100px] space-y-1">
                  <div>Way 1 (or Way 2):</div>
                  {terminalRows.map((rowArr, idx) => (
                    <div key={idx} className="tracking-widest">
                      {rowArr.join(' ')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: MAINAPP1 VS MAINAPP2 COMPARISON */}
      {/* ========================================================================= */}
      {activeTab === 'programs' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Program 1 */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-950 border border-blue-700 text-blue-400 font-mono text-xs">P1</span>
                  <span>Program 1: Explicit 2x3 Creation (MainApp1)</span>
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed overflow-x-auto">
                <div><span className="text-cyan-400">public class</span> <span className="text-amber-300">MainApp1</span> {'{'}</div>
                <div className="pl-3"><span className="text-cyan-400">public static void</span> main(String[] args) {'{'}</div>
                <div className="pl-6 text-slate-500">// 1. Declare and create 2x3 array</div>
                <div className="pl-6 text-cyan-300">int[][] numbers = new int[2][3];</div>
                <div className="pl-6 text-slate-500 pt-1">// 2. Initialize slots</div>
                <div className="pl-6 text-slate-300">numbers[0][0] = 10; numbers[0][1] = 20; numbers[0][2] = 30;</div>
                <div className="pl-6 text-slate-300">numbers[1][0] = 40; numbers[1][1] = 50; numbers[1][2] = 60;</div>
                <div className="pl-6 text-slate-500 pt-1">// 3. Nested for loop</div>
                <div className="pl-6 text-emerald-300">for (int i = 0; i &lt; numbers.length; i++) {'{'}</div>
                <div className="pl-9 text-emerald-300">for (int j = 0; j &lt; numbers[i].length; j++) {'{'}</div>
                <div className="pl-12 text-slate-200">System.out.print(numbers[i][j] + " ");</div>
                <div className="pl-9 text-emerald-300">{'}'}</div>
                <div className="pl-9 text-slate-400">System.out.println();</div>
                <div className="pl-6 text-emerald-300">{'}'}</div>
                <div className="pl-3">{'}'}</div>
                <div>{'}'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-900/50 text-xs text-blue-200">
                <b>Usage:</b> Ideal when grid dimensions are known in advance but cell data is populated dynamically or from user input.
              </div>
            </div>

            {/* Program 2 */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-400 font-mono text-xs">P2</span>
                  <span>Program 2: Shorthand Array Literal (MainApp2)</span>
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed overflow-x-auto">
                <div><span className="text-cyan-400">public class</span> <span className="text-amber-300">MainApp2</span> {'{'}</div>
                <div className="pl-3"><span className="text-cyan-400">public static void</span> main(String[] args) {'{'}</div>
                <div className="pl-6 text-slate-500">// 1. Shorthand inline declaration &amp; init</div>
                <div className="pl-6 text-emerald-300 font-bold">int[][] numbers = {'{'}</div>
                <div className="pl-9 text-emerald-300">{'{10, 20, 30}'},</div>
                <div className="pl-9 text-emerald-300">{'{40, 50, 60}'}</div>
                <div className="pl-6 text-emerald-300 font-bold">{'}'};</div>
                <div className="pl-6 text-slate-500 pt-1">// 2. Preferred nested for-each loop</div>
                <div className="pl-6 text-cyan-300">for (int[] row : numbers) {'{'}</div>
                <div className="pl-9 text-cyan-300">for (int num : row) {'{'}</div>
                <div className="pl-12 text-slate-200">System.out.print(num + " ");</div>
                <div className="pl-9 text-cyan-300">{'}'}</div>
                <div className="pl-9 text-slate-400">System.out.println();</div>
                <div className="pl-6 text-cyan-300">{'}'}</div>
                <div className="pl-3">{'}'}</div>
                <div>{'}'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-900/50 text-xs text-emerald-200">
                <b>Usage:</b> Cleanest production shorthand for known matrix grids. Nested for-each avoids off-by-one index bugs!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: KNOWLEDGE ASSESSMENT QUIZ */}
      {/* ========================================================================= */}
      {activeTab === 'quiz' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">2D Array Mastery Assessment</h3>
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
