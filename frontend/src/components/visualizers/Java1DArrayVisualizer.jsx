import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Layers, Play, Pause, RotateCcw, ChevronRight, ChevronLeft,
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  Check, Server, Database, Code, Users, HelpCircle, Lock,
  Sliders, RefreshCw, Activity, ArrowDown, AlertTriangle, Cpu,
  Eye, CornerDownRight, Plus, Trash2, Hash, ArrowUpRight, FastForward
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * Java1DArrayVisualizer
 * Interactive Architecture Theater for One-Dimensional (1D) Arrays in Java:
 * 1. 4-Step Lifecycle Animator (Declare ➔ Create Heap Memory ➔ Initialize Slots ➔ Retrieve)
 * 2. Retrieval Methods Laboratory (Index, Normal For Loop, For-Each Loop, Arrays.toString)
 * 3. Step-by-Step Code Walkthrough (MainApp1 vs MainApp2 Shorthand)
 * 4. Interactive Assessment Quiz
 */
export default function Java1DArrayVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('lifecycle'); // 'lifecycle' | 'retrieval' | 'programs' | 'quiz'

  // ==========================================
  // 1. LIFECYCLE SIMULATOR STATE
  // ==========================================
  const [lifecycleStep, setLifecycleStep] = useState(1); // 1: Declare, 2: Create (new int[6]), 3: Initialize, 4: Retrieve
  const [autoPlayLifecycle, setAutoPlayLifecycle] = useState(false);

  // Array values
  const defaultValues = [0, 0, 0, 0, 0, 0];
  const initializedValues = [88, 74, 91, 82, 68, 94];

  // ==========================================
  // 2. RETRIEVAL LAB STATE
  // ==========================================
  const [retrievalMode, setRetrievalMode] = useState('foreach'); // 'index' | 'forloop' | 'foreach' | 'tostring'
  const [retrievalPointer, setRetrievalPointer] = useState(0);
  const [isRetrievalPlaying, setIsRetrievalPlaying] = useState(false);
  const [retrievalOutput, setRetrievalOutput] = useState([]);
  const timerRef = useRef(null);

  // Handle Step-by-Step Loop Animation
  useEffect(() => {
    if (isRetrievalPlaying) {
      timerRef.current = setInterval(() => {
        setRetrievalPointer((prev) => {
          if (prev >= initializedValues.length - 1) {
            setIsRetrievalPlaying(false);
            clearInterval(timerRef.current);
            return prev;
          }
          const next = prev + 1;
          setRetrievalOutput((curr) => [...curr, initializedValues[next]]);
          return next;
        });
      }, 700);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRetrievalPlaying]);

  const startLoopAnimation = () => {
    setRetrievalPointer(0);
    setRetrievalOutput([initializedValues[0]]);
    setIsRetrievalPlaying(true);
  };

  const resetLoopAnimation = () => {
    setIsRetrievalPlaying(false);
    setRetrievalPointer(0);
    setRetrievalOutput([]);
  };

  // ==========================================
  // 3. QUIZ STATE
  // ==========================================
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 'q1',
      question: 'At which stage is physical memory allocated on the JVM Heap for an array?',
      options: [
        { key: 'A', text: 'Step 1: Declaration (int[] marks;)' },
        { key: 'B', text: 'Step 2: Creation using new (marks = new int[6];)' },
        { key: 'C', text: 'Step 3: Initialization (marks[0] = 88;)' },
        { key: 'D', text: 'Step 4: Retrieval' }
      ],
      correct: 'B',
      explanation: 'Memory is allocated on the Heap during Step 2 (Creation) when the new keyword is executed with the specified array size.'
    },
    {
      id: 'q2',
      question: 'What are the values of elements in an int array immediately after executing "int[] marks = new int[6];"?',
      options: [
        { key: 'A', text: 'Garbage values' },
        { key: 'B', text: 'null' },
        { key: 'C', text: '0 for all 6 slots' },
        { key: 'D', text: 'Unallocated slots' }
      ],
      correct: 'C',
      explanation: 'When an integer array is allocated on the Heap, Java automatically initializes every slot to its default zero-value (0).'
    },
    {
      id: 'q3',
      question: 'Why is the enhanced for-each loop (for (int no : marks)) often preferred over the traditional for loop for read operations?',
      options: [
        { key: 'A', text: 'It runs in O(log N) time instead of O(N)' },
        { key: 'B', text: 'It is cleaner, simpler, and eliminates index boundary error risks' },
        { key: 'C', text: 'It allows dynamically expanding the array' },
        { key: 'D', text: 'It allows modifying the original array elements' }
      ],
      correct: 'B',
      explanation: 'The for-each loop provides clean, concise syntax and completely avoids off-by-one index boundary bugs like ArrayIndexOutOfBoundsException.'
    },
    {
      id: 'q4',
      question: 'What is the shorthand syntax for "int[] marks = new int[]{88, 74, 91, 82, 68, 94};"?',
      options: [
        { key: 'A', text: 'int[] marks = (88, 74, 91, 82, 68, 94);' },
        { key: 'B', text: 'int[] marks = {88, 74, 91, 82, 68, 94};' },
        { key: 'C', text: 'int marks = [88, 74, 91, 82, 68, 94];' },
        { key: 'D', text: 'int[] marks = new [88, 74, 91, 82, 68, 94];' }
      ],
      correct: 'B',
      explanation: 'Java supports the array literal shorthand: int[] marks = {88, 74, 91, 82, 68, 94}; which combines declaration, creation, and initialization in one line.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Deck */}
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
                1D Arrays in Java: Lifecycle &amp; Traversal Theater
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Step through the 4-step array lifecycle: <b>Declaration ➔ Heap Allocation ➔ Value Initialization ➔ Loop Retrieval</b>.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {onOpenPlayground && (
              <button
                onClick={() => onOpenPlayground(`public class MainApp1 {\n    public static void main(String[] args) {\n        // 1. Declare & create array of size 6\n        int[] marks = new int[6];\n\n        // 2. Initialize elements\n        marks[0] = 88;\n        marks[1] = 74;\n        marks[2] = 91;\n        marks[3] = 82;\n        marks[4] = 68;\n        marks[5] = 94;\n\n        // 3. Normal for loop (Way 1)\n        System.out.print("Way 1: ");\n        for (int i = 0; i < marks.length; i++) {\n            System.out.print(marks[i] + " ");\n        }\n        System.out.println();\n\n        // 4. For-each loop (Way 2)\n        System.out.print("Way 2: ");\n        for (int no : marks) {\n            System.out.print(no + " ");\n        }\n        System.out.println();\n    }\n}`)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/30 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Run MainApp1 in Playground</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative z-10 flex flex-wrap gap-2 pt-6">
          {[
            { id: 'lifecycle', label: '1. The 4 Lifecycle Steps', icon: Activity, badge: 'Step-by-Step' },
            { id: 'retrieval', label: '2. Retrieval Lab & Loops', icon: Play, badge: 'For vs For-Each' },
            { id: 'programs', label: '3. MainApp1 vs MainApp2', icon: Code2, badge: 'Code Compare' },
            { id: 'quiz', label: '4. 1D Array Quiz', icon: HelpCircle, badge: '4 Questions' }
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
      {/* TAB 1: 4-STEP LIFECYCLE ANIMATOR */}
      {/* ========================================================================= */}
      {activeTab === 'lifecycle' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span>The 4-Step Lifecycle of a 1D Array in JVM Memory</span>
                </h3>
                <p className="text-xs text-slate-400">Click any step below to see the exact transformation in Stack and Heap memory.</p>
              </div>

              {/* Step Navigation Pill Buttons */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                {[
                  { step: 1, label: '1. Declare', code: 'int[] marks;' },
                  { step: 2, label: '2. Create', code: 'new int[6];' },
                  { step: 3, label: '3. Initialize', code: 'marks[i] = val;' },
                  { step: 4, label: '4. Retrieve', code: 'for(int no : marks)' }
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

            {/* Current Step Description Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {lifecycleStep === 1 && 'Step 1: Declare Array Variable'}
                  {lifecycleStep === 2 && 'Step 2: Allocate Memory on Heap with new'}
                  {lifecycleStep === 3 && 'Step 3: Assign Values to Slots'}
                  {lifecycleStep === 4 && 'Step 4: Retrieve Elements from Memory'}
                </div>
                <div className="text-xs text-slate-300">
                  {lifecycleStep === 1 && 'Only the reference variable is declared on the Stack. No Heap memory is allocated yet (reference is null).'}
                  {lifecycleStep === 2 && 'JVM allocates 6 contiguous 4-byte slots on the Heap, initialized to default zeros (0, 0, 0, 0, 0, 0).'}
                  {lifecycleStep === 3 && 'Actual values (88, 74, 91, 82, 68, 94) are written into the corresponding index positions.'}
                  {lifecycleStep === 4 && 'Elements are retrieved using direct indexing, for loops, or enhanced for-each loops.'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 flex-shrink-0">
                {lifecycleStep === 1 && 'int[] marks;'}
                {lifecycleStep === 2 && 'marks = new int[6];'}
                {lifecycleStep === 3 && 'marks[0]=88; marks[1]=74; ...'}
                {lifecycleStep === 4 && 'System.out.println(marks[0]);'}
              </div>
            </div>

            {/* Visual Memory Representation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* 1. Stack Memory Card */}
              <div className="md:col-span-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🥞</span> Stack Memory
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Local Reference</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-cyan-300 font-bold">int[] marks;</div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs flex items-center justify-between">
                    <span className="text-slate-400">Ref Address:</span>
                    <span className={`font-bold ${lifecycleStep === 1 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {lifecycleStep === 1 ? 'null (Unallocated)' : '0x7A00 (Heap Pointer)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="md:col-span-1 flex justify-center py-2 md:py-0">
                <ArrowRight className={`w-6 h-6 hidden md:block transition-all ${
                  lifecycleStep === 1 ? 'text-slate-600' : 'text-cyan-400 animate-pulse'
                }`} />
                <ArrowDown className={`w-6 h-6 md:hidden transition-all ${
                  lifecycleStep === 1 ? 'text-slate-600' : 'text-cyan-400 animate-pulse'
                }`} />
              </div>

              {/* 2. Heap Memory Card */}
              <div className="md:col-span-7 p-5 rounded-2xl bg-slate-950 border border-cyan-900/50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📦</span> Heap Memory (marks Object)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {lifecycleStep === 1 ? 'Not Allocated' : 'Address: 0x7A00'}
                  </span>
                </div>

                {lifecycleStep === 1 ? (
                  <div className="p-8 rounded-2xl border-2 border-dashed border-slate-800 text-center text-xs text-slate-500 font-mono">
                    [ No Heap Memory Allocated Yet. Click Step 2 to Allocate ]
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {(lifecycleStep === 2 ? defaultValues : initializedValues).map((val, idx) => {
                        const isRetrieved = lifecycleStep === 4 && idx === 0;
                        return (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-xl border text-center font-mono transition-all ${
                              isRetrieved
                                ? 'bg-cyan-950 border-cyan-400 ring-2 ring-cyan-500 shadow-lg scale-105'
                                : lifecycleStep === 3
                                ? 'bg-slate-900/90 border-emerald-500/50 text-emerald-300'
                                : 'bg-slate-900/90 border-slate-800 text-slate-400'
                            }`}
                          >
                            <div className="text-[10px] text-cyan-400 font-bold mb-1">[{idx}]</div>
                            <div className={`text-base font-black ${
                              lifecycleStep === 2 ? 'text-slate-500' : 'text-white'
                            }`}>
                              {val}
                            </div>
                            <div className="text-[9px] text-slate-500 mt-1">4B</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono pt-1">
                      <span>Length: 6 elements</span>
                      <span>Default Value: {lifecycleStep === 2 ? '0 (Zero initialized)' : 'Assigned Values'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: RETRIEVAL METHODS LAB */}
      {/* ========================================================================= */}
      {activeTab === 'retrieval' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Play className="w-5 h-5 text-cyan-400" />
                  <span>Retrieval Methods &amp; Loop Pointer Tracer</span>
                </h3>
                <p className="text-xs text-slate-400">Watch the loop pointer sequentially visit memory slots.</p>
              </div>

              {/* Mode Selectors */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'foreach', label: '1. Enhanced For-Each (Preferred)' },
                  { id: 'forloop', label: '2. Traditional For Loop' },
                  { id: 'index', label: '3. Single Index Access' },
                  { id: 'tostring', label: '4. Arrays.toString()' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setRetrievalMode(m.id);
                      resetLoopAnimation();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      retrievalMode === m.id
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Animated Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Contiguous Array Slots in Memory:</span>
                {(retrievalMode === 'foreach' || retrievalMode === 'forloop') && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={startLoopAnimation}
                      disabled={isRetrievalPlaying}
                      className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isRetrievalPlaying ? 'Iterating...' : 'Animate Loop'}</span>
                    </button>
                    <button
                      onClick={resetLoopAnimation}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="Reset"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {initializedValues.map((val, idx) => {
                  const isActive = (retrievalMode === 'foreach' || retrievalMode === 'forloop') && isRetrievalPlaying && retrievalPointer === idx;
                  const isVisited = (retrievalMode === 'foreach' || retrievalMode === 'forloop') && retrievalPointer >= idx && isRetrievalPlaying;

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border transition-all relative overflow-hidden font-mono ${
                        isActive
                          ? 'bg-cyan-950/90 border-cyan-400 ring-2 ring-cyan-500 shadow-xl shadow-cyan-950/80 scale-105'
                          : isVisited
                          ? 'bg-slate-900/90 border-emerald-600/40 text-slate-200'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-cyan-400">[{idx}]</span>
                        {isActive && (
                          <span className="text-[10px] bg-cyan-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full animate-bounce">
                            {retrievalMode === 'foreach' ? 'no' : 'i'}
                          </span>
                        )}
                      </div>
                      <div className="text-xl font-black text-white">{val}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Code & Terminal Output Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Code Snippet Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                <div className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Java Code:</div>
                {retrievalMode === 'foreach' && (
                  <div className="text-slate-300 space-y-1">
                    <div className="text-emerald-400">// Enhanced for-each loop (Way 2)</div>
                    <div><span className="text-cyan-400">for</span> (<span className="text-cyan-400">int</span> no : marks) {'{'}</div>
                    <div className="pl-4">System.out.print(no + <span className="text-amber-300">" "</span>);</div>
                    <div>{'}'}</div>
                  </div>
                )}

                {retrievalMode === 'forloop' && (
                  <div className="text-slate-300 space-y-1">
                    <div className="text-emerald-400">// Normal for loop (Way 1)</div>
                    <div><span className="text-cyan-400">for</span> (<span className="text-cyan-400">int</span> i = 0; i &lt; marks.length; i++) {'{'}</div>
                    <div className="pl-4">System.out.print(marks[i] + <span className="text-amber-300">" "</span>);</div>
                    <div>{'}'}</div>
                  </div>
                )}

                {retrievalMode === 'index' && (
                  <div className="text-slate-300 space-y-1">
                    <div className="text-emerald-400">// Direct Index Retrieval</div>
                    <div>System.out.println(marks[0]); <span className="text-slate-500">// 88</span></div>
                    <div>System.out.println(marks[3]); <span className="text-slate-500">// 82</span></div>
                    <div>System.out.println(marks[marks.length - 1]); <span className="text-slate-500">// 94</span></div>
                  </div>
                )}

                {retrievalMode === 'tostring' && (
                  <div className="text-slate-300 space-y-1">
                    <div className="text-emerald-400">// Arrays.toString() Utility</div>
                    <div><span className="text-cyan-400">import</span> java.util.Arrays;</div>
                    <div className="pt-1">System.out.println(Arrays.toString(marks));</div>
                  </div>
                )}
              </div>

              {/* Console Output Terminal */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                <div className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Standard Console Output:</div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-emerald-300 min-h-[70px] flex items-center">
                  {retrievalMode === 'foreach' && (
                    <span>Marks are: {retrievalOutput.length > 0 ? retrievalOutput.join(' ') : '88 74 91 82 68 94'}</span>
                  )}
                  {retrievalMode === 'forloop' && (
                    <span>Way 1: {retrievalOutput.length > 0 ? retrievalOutput.join(' ') : '88 74 91 82 68 94'}</span>
                  )}
                  {retrievalMode === 'index' && (
                    <div className="space-y-0.5">
                      <div>88</div>
                      <div>82</div>
                      <div>94</div>
                    </div>
                  )}
                  {retrievalMode === 'tostring' && (
                    <span>[88, 74, 91, 82, 68, 94]</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PROGRAM 1 VS PROGRAM 2 COMPARISON */}
      {/* ========================================================================= */}
      {activeTab === 'programs' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Program 1 */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-950 border border-blue-700 text-blue-400 font-mono text-xs">P1</span>
                  <span>Program 1: Step-by-Step Explicit Syntax (MainApp1)</span>
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed overflow-x-auto">
                <div><span className="text-cyan-400">public class</span> <span className="text-amber-300">MainApp1</span> {'{'}</div>
                <div className="pl-3"><span className="text-cyan-400">public static void</span> main(String[] args) {'{'}</div>
                <div className="pl-6 text-slate-500">// 1. Declare and create array of size 6</div>
                <div className="pl-6 text-cyan-300">int[] marks = new int[6];</div>
                <div className="pl-6 text-slate-500 pt-1">// 2. Initialize array elements</div>
                <div className="pl-6 text-slate-300">marks[0] = 88; marks[1] = 74; marks[2] = 91;</div>
                <div className="pl-6 text-slate-300">marks[3] = 82; marks[4] = 68; marks[5] = 94;</div>
                <div className="pl-6 text-slate-500 pt-1">// 3. For-each traversal</div>
                <div className="pl-6 text-emerald-300">for (int no : marks) System.out.print(no + " ");</div>
                <div className="pl-3">{'}'}</div>
                <div>{'}'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-900/50 text-xs text-blue-200 space-y-1">
                <div className="font-bold">Key Characteristics:</div>
                <p className="text-slate-300">Explicit 3-step creation. Useful when elements are calculated dynamically or read from external user input slot by slot.</p>
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
                <div className="pl-6 text-slate-500">// 1. Shorthand inline declaration, creation &amp; init:</div>
                <div className="pl-6 text-emerald-300 font-bold">int[] marks = {'{88, 74, 91, 82, 68, 94}'};</div>
                <div className="pl-6 text-slate-500 pt-1">// 2. Preferred for-each traversal:</div>
                <div className="pl-6 text-cyan-300">System.out.print("Marks are: ");</div>
                <div className="pl-6 text-emerald-300">for (int no : marks) {'{'}</div>
                <div className="pl-9 text-slate-200">System.out.print(no + " ");</div>
                <div className="pl-6">{'}'}</div>
                <div className="pl-3">{'}'}</div>
                <div>{'}'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-900/50 text-xs text-emerald-200 space-y-1">
                <div className="font-bold">Key Characteristics:</div>
                <p className="text-slate-300">Concise, modern, and production-standard shorthand for when known values are ready at initialization time.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: KNOWLEDGE ASSESSMENT QUIZ */}
      {/* ========================================================================= */}
      {activeTab === 'quiz' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">1D Array Mastery Assessment</h3>
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
