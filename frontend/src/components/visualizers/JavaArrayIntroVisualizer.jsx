import React, { useState, useEffect } from 'react';
import { 
  Box, Layers, Play, Pause, RotateCcw, ChevronRight, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  Check, Server, Database, Code, Users, HelpCircle, Lock,
  Sliders, RefreshCw, Activity, ArrowDown, AlertTriangle, Cpu,
  Eye, CornerDownRight, Plus, Trash2, Hash, ArrowUpRight
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaArrayIntroVisualizer
 * Interactive Architecture & Memory Theater for Java Arrays Introduction:
 * 1. Live Contiguous Heap Memory & Address Calculator Simulator (Stack -> Heap, 0xBase + i*4)
 * 2. "Why We Need Arrays" Comparison Lab (Variable Explosion vs Single Contiguous Container)
 * 3. Operations & Shifting Theater (O(1) Random Access vs O(N) Middle Deletion/Insertion)
 * 4. Types of Arrays Explorer (1D, 2D Grid, Matrix M x N, Jagged Non-Uniform)
 * 5. Interactive Knowledge Assessment Quiz
 */
export default function JavaArrayIntroVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('memory'); // 'memory' | 'why' | 'operations' | 'types' | 'quiz'

  // ==========================================
  // 1. MEMORY SIMULATOR STATE
  // ==========================================
  const [arrayElements, setArrayElements] = useState([88, 74, 91, 82, 68, 94]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
  const [activeTestIndex, setActiveTestIndex] = useState(0);
  const [boundsError, setBoundsError] = useState(false);
  const baseAddress = 0x7A00;

  // ==========================================
  // 2. WHY ARRAYS STATE
  // ==========================================
  const [studentScale, setStudentScale] = useState(6); // 6 | 20 | 100 | 1000
  const [whyMode, setWhyMode] = useState('with'); // 'without' | 'with'

  // ==========================================
  // 3. OPERATIONS & SHIFTING LAB STATE
  // ==========================================
  const [shiftElements, setShiftElements] = useState([10, 20, 30, 40, 50]);
  const [shiftStep, setShiftStep] = useState(0); // 0: initial, 1: remove 20, 2: shift 30 left, 3: shift 40 left, 4: completed
  const [isShiftAnimating, setIsShiftAnimating] = useState(false);
  const [shiftLogs, setShiftLogs] = useState(['Initial array: [10, 20, 30, 40, 50]. Goal: Delete element at index 1 (value 20).']);

  // ==========================================
  // 4. TYPES EXPLORER STATE
  // ==========================================
  const [selectedArrayType, setSelectedArrayType] = useState('1d'); // '1d' | '2d' | 'matrix' | 'jagged'

  // ==========================================
  // 5. QUIZ STATE
  // ==========================================
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Trigger memory slot access
  const handleAccessSlot = (index) => {
    if (index < 0 || index >= arrayElements.length) {
      setBoundsError(true);
      setActiveTestIndex(index);
    } else {
      setBoundsError(false);
      setSelectedSlotIndex(index);
      setActiveTestIndex(index);
    }
  };

  // Run Step-by-Step Deletion Animation
  const startDeleteShiftAnimation = () => {
    if (isShiftAnimating) return;
    setIsShiftAnimating(true);
    setShiftStep(1);
    setShiftLogs(['Step 1: Removed value 20 at index [1]. Notice the gap created!']);

    setTimeout(() => {
      setShiftStep(2);
      setShiftLogs(prev => [...prev, 'Step 2: Shifting element at index [2] (value 30) left ➔ index [1].']);
      
      setTimeout(() => {
        setShiftStep(3);
        setShiftLogs(prev => [...prev, 'Step 3: Shifting element at index [3] (value 40) left ➔ index [2].']);

        setTimeout(() => {
          setShiftStep(4);
          setShiftElements([10, 30, 40, 50]);
          setShiftLogs(prev => [...prev, 'Step 4: Shifting complete! Final Array: [10, 30, 40, 50]. Cost: O(N) operations.']);
          setIsShiftAnimating(false);
        }, 900);
      }, 900);
    }, 900);
  };

  const resetShiftLab = () => {
    setShiftElements([10, 20, 30, 40, 50]);
    setShiftStep(0);
    setIsShiftAnimating(false);
    setShiftLogs(['Initial array: [10, 20, 30, 40, 50]. Goal: Delete element at index 1 (value 20).']);
  };

  // Quiz questions
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the index of the first and last elements in an array of length N in Java?',
      options: [
        { key: 'A', text: '1 and N' },
        { key: 'B', text: '0 and N - 1' },
        { key: 'C', text: '0 and N' },
        { key: 'D', text: '1 and N - 1' }
      ],
      correct: 'B',
      explanation: 'Java arrays are 0-indexed. The first element is always at index 0, and the last element is at index array.length - 1.'
    },
    {
      id: 'q2',
      question: 'Why does accessing any array element by index take O(1) constant time?',
      options: [
        { key: 'A', text: 'Because JVM searches all elements sequentially' },
        { key: 'B', text: 'Because elements are stored contiguously in memory, enabling instant address formula computation: Base + (i * element_size)' },
        { key: 'C', text: 'Because arrays are stored on the CPU registers' },
        { key: 'D', text: 'Because Java compiles all arrays into HashMap buckets' }
      ],
      correct: 'B',
      explanation: 'Contiguous memory layout allows the CPU to calculate the physical memory address in a single multiplication and addition operation: Address = Base + (i * size).'
    },
    {
      id: 'q3',
      question: 'What happens if you attempt to access an index greater than or equal to array.length?',
      options: [
        { key: 'A', text: 'It returns null' },
        { key: 'B', text: 'It automatically resizes the array' },
        { key: 'C', text: 'The JVM throws an ArrayIndexOutOfBoundsException at runtime' },
        { key: 'D', text: 'It returns 0 by default' }
      ],
      correct: 'C',
      explanation: 'The JVM performs strict boundary checks on every access. Any index < 0 or >= length immediately results in an ArrayIndexOutOfBoundsException.'
    },
    {
      id: 'q4',
      question: 'Which of the following statements about Java arrays is FALSE?',
      options: [
        { key: 'A', text: 'Arrays are first-class objects created on the Heap' },
        { key: 'B', text: 'An array can dynamically grow its size after creation' },
        { key: 'C', text: 'array.length is a property and not a method call' },
        { key: 'D', text: 'Arrays can store both primitives and custom object references' }
      ],
      correct: 'B',
      explanation: 'Statement B is false because Java arrays have fixed sizes upon creation. To grow dynamically, one must use data structures like ArrayList.'
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
                <Box className="w-6 h-6 animate-pulse" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Java Arrays: Core Architecture &amp; Memory Visualizer
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore the internal JVM Heap memory layout, 0-indexing address arithmetic, why we need arrays, element shifting costs, and multidimensional variations.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {onOpenPlayground && (
              <button
                onClick={() => onOpenPlayground(`public class ArrayPlayground {\n    public static void main(String[] args) {\n        // 1. Array declaration & initialization\n        int[] marks = {88, 74, 91, 82, 68, 94};\n        \n        System.out.println("Total Students: " + marks.length);\n        System.out.println("First Student Mark: " + marks[0]);\n        System.out.println("Last Student Mark: " + marks[marks.length - 1]);\n        \n        // 2. Iterate and compute total\n        int total = 0;\n        for (int m : marks) total += m;\n        System.out.println("Class Average: " + ((double) total / marks.length));\n    }\n}`)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/30 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Test in Playground</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative z-10 flex flex-wrap gap-2 pt-6">
          {[
            { id: 'memory', label: '1. Contiguous Memory & Address Math', icon: Cpu, badge: 'Live Heap Simulator' },
            { id: 'why', label: '2. Why We Need Arrays', icon: Users, badge: 'Variable Problem' },
            { id: 'operations', label: '3. Operations & Shifting Lab', icon: Activity, badge: 'O(1) vs O(N)' },
            { id: 'types', label: '4. Types of Arrays', icon: Layers, badge: '1D / 2D / Jagged' },
            { id: 'quiz', label: '5. Mastery Assessment', icon: HelpCircle, badge: '4 Questions' }
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
      {/* TAB 1: CONTIGUOUS HEAP MEMORY & ADDRESS CALCULATOR SIMULATOR */}
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
                    <span>JVM Memory Architecture: Stack Pointer ➔ Heap Block</span>
                  </h3>
                  <p className="text-xs text-slate-400">Click any array slot to inspect physical address, byte offset, and HotSpot header info.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
                    int[] marks = new int[{arrayElements.length}]
                  </span>
                </div>
              </div>

              {/* Visual Stack & Heap Memory Connection */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* 1. Stack Memory */}
                <div className="md:col-span-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>🥞</span> Stack Frame
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Local Scope</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-1.5 shadow-inner">
                    <div className="text-xs font-mono text-slate-300">
                      <span className="text-cyan-400">int[]</span> marks;
                    </div>
                    <div className="text-[11px] font-mono text-amber-300 flex items-center gap-1.5 bg-amber-950/40 p-1.5 rounded border border-amber-800/40">
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ref ➔ 0x{baseAddress.toString(16).toUpperCase()}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Holds 64-bit reference address pointing into JVM Heap.</p>
                  </div>
                </div>

                {/* Arrow Pointer Bridge */}
                <div className="md:col-span-1 flex justify-center py-2 md:py-0">
                  <ArrowRight className="w-6 h-6 text-cyan-400 animate-pulse hidden md:block" />
                  <ArrowDown className="w-6 h-6 text-cyan-400 animate-pulse md:hidden" />
                </div>

                {/* 2. Heap Memory Block Header */}
                <div className="md:col-span-7 p-4 rounded-2xl bg-slate-950 border border-cyan-900/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>📦</span> Contiguous Heap Block
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Base: 0x{baseAddress.toString(16).toUpperCase()}</span>
                  </div>

                  {/* HotSpot Object Header Box */}
                  <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-800/50 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="text-slate-400">Mark Word:</span>
                      <span className="text-cyan-300 font-bold">8B</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="text-slate-400">Klass:</span>
                      <span className="text-emerald-300 font-bold">[I (4B)</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-700/50">
                      <span>length:</span>
                      <span className="font-bold">{arrayElements.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Contiguous Slots Grid */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Physical Contiguous Slots (4 Bytes per Slot):</span>
                  <span className="font-mono text-cyan-400">Total Array Payload: {arrayElements.length * 4} Bytes</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {arrayElements.map((val, idx) => {
                    const isSelected = selectedSlotIndex === idx && !boundsError;
                    const slotAddress = baseAddress + 16 + (idx * 4);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAccessSlot(idx)}
                        className={`p-3 rounded-2xl text-left transition-all border relative overflow-hidden group ${
                          isSelected
                            ? 'bg-gradient-to-b from-cyan-950/90 to-blue-950/90 border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-950/60 scale-[1.03]'
                            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                        }`}
                      >
                        {/* Index Badge */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400'
                          }`}>
                            [{idx}]
                          </span>
                          <span className="text-[9px] font-mono text-slate-400">4B</span>
                        </div>

                        {/* Slot Value */}
                        <div className="text-xl font-black text-white group-hover:text-cyan-200 transition-colors">
                          {val}
                        </div>

                        {/* Memory Address Offset */}
                        <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                          <span>0x{slotAddress.toString(16).toUpperCase()}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Boundary Test Buttons */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-300">Test Array Bounds Access:</span>
                  <div className="flex items-center gap-1.5">
                    {[0, 2, 5, 6, -1].map((testIdx) => (
                      <button
                        key={testIdx}
                        onClick={() => handleAccessSlot(testIdx)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all border ${
                          activeTestIndex === testIdx
                            ? testIdx < 0 || testIdx >= arrayElements.length
                              ? 'bg-red-950/90 border-red-500 text-red-300'
                              : 'bg-cyan-950/90 border-cyan-500 text-cyan-300'
                            : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        marks[{testIdx}]
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleAccessSlot(arrayElements.length)}
                  className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-800/60 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Trigger Out Of Bounds (marks[{arrayElements.length}])</span>
                </button>
              </div>

              {/* Error Alert Box if bounds error */}
              {boundsError && (
                <div className="p-4 rounded-2xl bg-red-950/70 border border-red-500/60 text-red-200 text-xs space-y-2 animate-in slide-in-from-top-2 duration-300 shadow-xl">
                  <div className="flex items-center gap-2 font-bold text-sm text-red-300">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span>Runtime Exception: java.lang.ArrayIndexOutOfBoundsException: Index {activeTestIndex} out of bounds for length {arrayElements.length}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    The JVM checks boundaries before every single index access. Valid indices for this array are strictly from <code className="text-amber-300 font-bold bg-slate-900 px-1 py-0.5 rounded">0</code> to <code className="text-amber-300 font-bold bg-slate-900 px-1 py-0.5 rounded">{arrayElements.length - 1}</code>.
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Physical Address Computation Formula */}
            <div className="lg:col-span-4 glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <Hash className="w-5 h-5 text-cyan-400" />
                <h4 className="text-base font-bold text-white">O(1) Address Computation Math</h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="text-slate-400 uppercase text-[10px] tracking-wider font-bold">Physical Formula:</div>
                <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 font-bold text-center">
                  Address(A[i]) = Base + (i × Element_Size)
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px] pt-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Base Address:</span>
                    <span className="text-white font-bold">0x{baseAddress.toString(16).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Header Offset:</span>
                    <span className="text-white font-bold">16 Bytes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Element Type:</span>
                    <span className="text-cyan-400 font-bold">int (4 Bytes)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Selected Index (i):</span>
                    <span className="text-amber-400 font-bold">{selectedSlotIndex}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800 text-cyan-300 font-bold">
                    <span>Target Memory Address:</span>
                    <span>0x{(baseAddress + 16 + selectedSlotIndex * 4).toString(16).toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Slot Details Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Inspected Slot Details</span>
                </h5>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Java Code:</span>
                    <span className="font-mono text-cyan-300 font-bold">marks[{selectedSlotIndex}]</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stored Value:</span>
                    <span className="font-mono text-emerald-300 font-bold">{arrayElements[selectedSlotIndex]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time Complexity:</span>
                    <span className="font-mono text-amber-300 font-bold">O(1) Instant</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-900/40 text-[11px] text-slate-300 leading-relaxed">
                💡 <b>Why it matters:</b> Because every array element has the exact same byte size and slots are strictly contiguous, the CPU can jump straight to any index without scanning preceding elements!
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: WHY WE NEED ARRAYS COMPARISON THEATRE */}
      {/* ========================================================================= */}
      {activeTab === 'why' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Toggle Controls */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span>The Real-World Student Marks Dilemma</span>
                </h3>
                <p className="text-xs text-slate-400">Compare individual loose variables vs an organized single Array container.</p>
              </div>

              {/* Mode Toggle */}
              <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setWhyMode('without')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    whyMode === 'without'
                      ? 'bg-red-950 border border-red-700 text-red-300 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ❌ Without Arrays
                </button>
                <button
                  onClick={() => setWhyMode('with')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    whyMode === 'with'
                      ? 'bg-emerald-950 border border-emerald-700 text-emerald-300 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ✅ With Array (int[] marks)
                </button>
              </div>
            </div>
          </div>

          {/* Side by Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Approach Without Arrays */}
            <div className={`glass-panel p-6 rounded-3xl border transition-all ${
              whyMode === 'without' ? 'border-red-500/80 bg-red-950/20 ring-1 ring-red-500/40' : 'border-slate-800 bg-[#0B1120]/80 opacity-60'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-sm font-bold text-red-400 flex items-center gap-2">
                  <span>❌</span> Approach 1: Individual Loose Variables
                </span>
                <span className="text-xs font-mono text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
                  Variable Explosion
                </span>
              </div>

              <div className="space-y-4 pt-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1 leading-relaxed">
                  <div className="text-slate-500">// Storing 6 students requires 6 variable declarations:</div>
                  <div className="text-red-300">int marks1 = 88;</div>
                  <div className="text-red-300">int marks2 = 74;</div>
                  <div className="text-red-300">int marks3 = 91;</div>
                  <div className="text-red-300">int marks4 = 82;</div>
                  <div className="text-red-300">int marks5 = 68;</div>
                  <div className="text-red-300">int marks6 = 94;</div>
                  <div className="pt-2 text-slate-500">// Calculating total requires manual addition:</div>
                  <div className="text-amber-300">int total = marks1 + marks2 + marks3 + marks4 + marks5 + marks6;</div>
                </div>

                <div className="p-4 rounded-2xl bg-red-950/40 border border-red-900/60 text-xs text-red-200 space-y-2">
                  <div className="font-bold text-red-300">Why this fails in practice:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>What if there are <b>1,000 students</b>? You must write 1,000 variable lines!</li>
                    <li>You <b>cannot use loops</b> to traverse separate variable names.</li>
                    <li>Passing scores to methods requires 1,000 method parameters!</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Approach With Arrays */}
            <div className={`glass-panel p-6 rounded-3xl border transition-all ${
              whyMode === 'with' ? 'border-emerald-500/80 bg-emerald-950/20 ring-1 ring-emerald-500/40' : 'border-slate-800 bg-[#0B1120]/80 opacity-60'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <span>✅</span> Approach 2: Single Array Container
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  Clean &amp; Scalable
                </span>
              </div>

              <div className="space-y-4 pt-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1 leading-relaxed">
                  <div className="text-slate-500">// 1 single array variable holds 6 (or 10,000) scores:</div>
                  <div className="text-emerald-300 font-bold">int[] marks = {'{88, 74, 91, 82, 68, 94}'};</div>
                  <div className="pt-2 text-slate-500">// Loop effortlessly calculates total for any size:</div>
                  <div className="text-cyan-300">int total = 0;</div>
                  <div className="text-cyan-300">for (int mark : marks) {'{'} total += mark; {'}'}</div>
                  <div className="text-amber-300">double avg = (double) total / marks.length;</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-900/60 text-xs text-emerald-200 space-y-2">
                  <div className="font-bold text-emerald-300">Key Advantages in Action:</div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    <li>One single clean variable name: <code className="text-cyan-300">marks</code>.</li>
                    <li>Instant random access: <code className="text-emerald-300">marks[0]</code>, <code className="text-emerald-300">marks[2]</code> in O(1) time.</li>
                    <li>Scales seamlessly from 6 students to 1,000,000 students without changing code structure!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: OPERATIONS & SHIFTING LAB */}
      {/* ========================================================================= */}
      {activeTab === 'operations' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span>Array Deletion &amp; Insertion Shifting Cost Lab</span>
                </h3>
                <p className="text-xs text-slate-400">See step-by-step why middle deletion/insertion requires O(N) element shifting in contiguous memory.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={startDeleteShiftAnimation}
                  disabled={isShiftAnimating || shiftStep === 4}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isShiftAnimating ? 'Shifting...' : 'Animate Deletion of [1]'}</span>
                </button>
                <button
                  onClick={resetShiftLab}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                  title="Reset Lab"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Contiguous Array Slot Progression */}
            <div className="space-y-4">
              <div className="text-xs text-slate-400">Array Elements During Deletion:</div>

              <div className="flex flex-wrap items-center gap-3">
                {shiftStep === 0 && [10, 20, 30, 40, 50].map((num, i) => (
                  <div key={i} className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center font-mono">
                    <span className="text-[10px] text-cyan-400 font-bold">[{i}]</span>
                    <span className="text-base font-black text-white">{num}</span>
                  </div>
                ))}

                {shiftStep === 1 && [
                  { idx: 0, val: 10 },
                  { idx: 1, val: 'EMPTY', highlight: true },
                  { idx: 2, val: 30 },
                  { idx: 3, val: 40 },
                  { idx: 4, val: 50 }
                ].map((item, i) => (
                  <div key={i} className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono transition-all ${
                    item.highlight 
                      ? 'bg-red-950/80 border-2 border-dashed border-red-500 animate-pulse text-red-300' 
                      : 'bg-slate-900 border border-slate-800 text-white'
                  }`}>
                    <span className="text-[10px] text-cyan-400 font-bold">[{item.idx}]</span>
                    <span className="text-xs font-black">{item.val}</span>
                  </div>
                ))}

                {shiftStep === 2 && [
                  { idx: 0, val: 10 },
                  { idx: 1, val: 30, shifted: true },
                  { idx: 2, val: 'GAP', highlight: true },
                  { idx: 3, val: 40 },
                  { idx: 4, val: 50 }
                ].map((item, i) => (
                  <div key={i} className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono transition-all ${
                    item.shifted
                      ? 'bg-amber-950/80 border border-amber-500 text-amber-200 scale-105'
                      : item.highlight
                      ? 'bg-red-950/80 border-2 border-dashed border-red-500 text-red-300'
                      : 'bg-slate-900 border border-slate-800 text-white'
                  }`}>
                    <span className="text-[10px] text-cyan-400 font-bold">[{item.idx}]</span>
                    <span className="text-xs font-black">{item.val}</span>
                  </div>
                ))}

                {shiftStep === 3 && [
                  { idx: 0, val: 10 },
                  { idx: 1, val: 30 },
                  { idx: 2, val: 40, shifted: true },
                  { idx: 3, val: 50, shifted: true },
                  { idx: 4, val: 0, cleared: true }
                ].map((item, i) => (
                  <div key={i} className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-mono transition-all ${
                    item.shifted
                      ? 'bg-amber-950/80 border border-amber-500 text-amber-200'
                      : item.cleared
                      ? 'bg-slate-950 border border-slate-800 text-slate-500'
                      : 'bg-slate-900 border border-slate-800 text-white'
                  }`}>
                    <span className="text-[10px] text-cyan-400 font-bold">[{item.idx}]</span>
                    <span className="text-xs font-black">{item.val}</span>
                  </div>
                ))}

                {shiftStep === 4 && [10, 30, 40, 50].map((num, i) => (
                  <div key={i} className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500 flex flex-col items-center justify-center font-mono text-emerald-200">
                    <span className="text-[10px] text-cyan-400 font-bold">[{i}]</span>
                    <span className="text-base font-black">{num}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Log Terminal */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">Operation Log:</div>
              {shiftLogs.map((log, idx) => (
                <div key={idx} className="text-slate-300 flex items-center gap-2">
                  <CornerDownRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: TYPES OF ARRAYS EXPLORER */}
      {/* ========================================================================= */}
      {activeTab === 'types' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Types of Arrays in Java</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: '1d', label: '1D Array (Linear)' },
                  { id: '2d', label: '2D Array (Table)' },
                  { id: 'matrix', label: 'Matrix Array (M × N)' },
                  { id: 'jagged', label: 'Jagged (Ragged)' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedArrayType(type.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      selectedArrayType === type.id
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Presentation Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-6 space-y-4">
                {selectedArrayType === '1d' && (
                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-white">Single-Dimensional Array (1D)</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Stores elements in a single sequential linear row. Direct $O(1)$ random access through single integer index.
                    </p>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                      int[] numbers = {'{10, 20, 30}'};
                    </div>
                  </div>
                )}

                {selectedArrayType === '2d' && (
                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-white">Two-Dimensional Array (2D)</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Represents tabular data with rows and columns. In Java, it is implemented as an <b>Array of Arrays</b> where row pointers point to child 1D array objects.
                    </p>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                      int[][] table = new int[3][3];
                    </div>
                  </div>
                )}

                {selectedArrayType === 'matrix' && (
                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-white">Matrix Array (Mathematical Grid)</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      A specialized rectangular 2D array where every row has identical column length ($M \times N$), used for matrix addition, multiplication, transpose, and game boards.
                    </p>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                      int[][] matrix = {'{{1, 2}, {3, 4}}'};
                    </div>
                  </div>
                )}

                {selectedArrayType === 'jagged' && (
                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-white">Jagged (Ragged) Array</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      A 2D array where <b>each row has a different number of columns</b>. Enables memory optimization for non-uniform data structures (like Pascal's Triangle).
                    </p>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                      int[][] jagged = {'{{1, 2, 3}, {4, 5}, {6}}'};
                    </div>
                  </div>
                )}
              </div>

              {/* Visual Model Render */}
              <div className="md:col-span-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-3">
                {selectedArrayType === '1d' && (
                  <div className="flex gap-2">
                    {[10, 20, 30].map((v, i) => (
                      <div key={i} className="w-14 h-14 rounded-xl bg-cyan-950 border border-cyan-500 flex flex-col items-center justify-center text-cyan-300 font-mono">
                        <span className="text-[10px] text-slate-400">[{i}]</span>
                        <span className="font-bold">{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedArrayType === '2d' && (
                  <div className="grid grid-cols-2 gap-2">
                    {[[1, 2], [3, 4]].map((row, r) =>
                      row.map((val, c) => (
                        <div key={`${r}-${c}`} className="w-14 h-14 rounded-xl bg-blue-950 border border-blue-500 flex flex-col items-center justify-center text-blue-300 font-mono">
                          <span className="text-[9px] text-slate-400">[{r}][{c}]</span>
                          <span className="font-bold">{val}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {selectedArrayType === 'matrix' && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-cyan-800 text-center font-mono text-cyan-300 text-sm space-y-1">
                    <div>[ 1 &nbsp; 2 ]</div>
                    <div>[ 3 &nbsp; 4 ]</div>
                    <div className="text-[10px] text-slate-400 pt-2">2 × 2 Square Matrix</div>
                  </div>
                )}

                {selectedArrayType === 'jagged' && (
                  <div className="space-y-2">
                    <div className="flex gap-1.5 justify-center">
                      {[1, 2, 3].map((v, i) => <div key={i} className="w-10 h-10 rounded-lg bg-purple-950 border border-purple-500 text-purple-200 text-xs font-bold flex items-center justify-center">{v}</div>)}
                    </div>
                    <div className="flex gap-1.5 justify-center">
                      {[4, 5].map((v, i) => <div key={i} className="w-10 h-10 rounded-lg bg-purple-950 border border-purple-500 text-purple-200 text-xs font-bold flex items-center justify-center">{v}</div>)}
                    </div>
                    <div className="flex gap-1.5 justify-center">
                      {[6].map((v, i) => <div key={i} className="w-10 h-10 rounded-lg bg-purple-950 border border-purple-500 text-purple-200 text-xs font-bold flex items-center justify-center">{v}</div>)}
                    </div>
                  </div>
                )}
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
                <h3 className="text-base font-bold text-white">Array Fundamentals Assessment Quiz</h3>
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
