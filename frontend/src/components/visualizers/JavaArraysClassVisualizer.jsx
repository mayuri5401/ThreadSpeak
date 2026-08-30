import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, Play, CheckCircle2, Copy, Check, ArrowRight, ArrowLeft, 
  ExternalLink, Search, Sparkles, Terminal, BookOpen, Layers, 
  ChevronRight, ChevronLeft, Zap, X, RotateCcw, Cpu, ArrowLeftCircle,
  HelpCircle, Lightbulb, CheckSquare, ListOrdered, FileCode, CheckCircle,
  Filter, Grid, Calculator, RefreshCw, Hash, Pause, FastForward,
  Activity, ArrowDown, CornerDownRight, ShieldCheck, Eye, Sliders,
  Shuffle, Split, SearchCheck, Paintbrush, CopyCheck, GitCompare,
  Binary, KeyRound, MoveRight, HelpCircle as QuizIcon
} from 'lucide-react';
import UniversalCodePlayground from '../playground/UniversalCodePlayground';

/**
 * JavaArraysClassVisualizer
 * High-End Architecture & Animation Theater for java.util.Arrays:
 * 1. Arrays.sort() — Interactive Dual-Pivot Quicksort Live Stepper
 * 2. Arrays.binarySearch() — Low / Mid / High Pointer Stepper with Missing Key insertion point
 * 3. Arrays.fill() & Range Fill — Memory Paint Sweep Animation
 * 4. Arrays.copyOf() & copyOfRange() — Dynamic Heap Buffer Allocation & Slicing
 * 5. Arrays.equals() vs deepEquals() — 1D vs 2D Deep Equality
 * 6. Arrays.mismatch() — Difference Index Scanning
 * 7. Interactive Assessment Quiz with instant scoring
 */
export default function JavaArraysClassVisualizer({ onOpenPlayground, activeTab = 'notes' }) {
  const [selectedMethod, setSelectedMethod] = useState('sort'); // 'sort' | 'binarySearch' | 'fill' | 'copyOf' | 'equals' | 'mismatch'
  const [activeSectionTab, setActiveSectionTab] = useState('animation'); // 'animation' | 'code' | 'quiz'

  // =========================================================================
  // 1. SORT ANIMATION STATE
  // =========================================================================
  const [sortArray, setSortArray] = useState([45, 12, 85, 32, 89, 21, 60]);
  const [sortStep, setSortStep] = useState(0);
  const [isSortPlaying, setIsSortPlaying] = useState(false);

  const sortFrames = [
    {
      title: 'Initial Unsorted Array in Heap Memory',
      arr: [45, 12, 85, 32, 89, 21, 60],
      active: [],
      pivots: [0, 6], // P1 = 45, P2 = 60
      desc: 'Dual-Pivot Quicksort selects Pivot 1 (P1 = 45 at index 0) and Pivot 2 (P2 = 60 at index 6). The array will be partitioned into 3 regions: < P1, P1..P2, and > P2.'
    },
    {
      title: 'Partition 1: Elements Smaller than Pivot 1 (45)',
      arr: [12, 21, 32, 45, 85, 89, 60],
      active: [0, 1, 2],
      pivots: [3, 6],
      desc: 'Elements [12, 21, 32] are smaller than 45 and are grouped into the left sub-array before index 3.'
    },
    {
      title: 'Partition 2: Elements Greater than Pivot 2 (60)',
      arr: [12, 21, 32, 45, 60, 89, 85],
      active: [5, 6],
      pivots: [3, 4],
      desc: 'Elements [89, 85] are greater than 60 and grouped into the right partition.'
    },
    {
      title: 'Recursive Sorting of Sub-partitions',
      arr: [12, 21, 32, 45, 60, 85, 89],
      active: [0, 1, 2, 5, 6],
      pivots: [],
      desc: 'Sub-partitions [12, 21, 32] and [85, 89] are recursively sorted in-place in O(N log N) time.'
    },
    {
      title: 'Sorting Complete (Ascending Numerical Order)',
      arr: [12, 21, 32, 45, 60, 85, 89],
      active: [0, 1, 2, 3, 4, 5, 6],
      pivots: [],
      desc: 'All elements sorted in ascending numerical order! Ready for high-performance binary search.'
    }
  ];

  useEffect(() => {
    let timer;
    if (isSortPlaying) {
      timer = setInterval(() => {
        setSortStep((prev) => {
          if (prev < sortFrames.length - 1) return prev + 1;
          setIsSortPlaying(false);
          return prev;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isSortPlaying]);

  const handleShuffleSortArray = () => {
    setIsSortPlaying(false);
    setSortStep(0);
    const shuffled = [...sortArray].sort(() => Math.random() - 0.5);
    setSortArray(shuffled);
  };

  // =========================================================================
  // 2. BINARY SEARCH ANIMATION STATE
  // =========================================================================
  const bsSortedArray = [10, 20, 30, 40, 50, 60, 70, 80];
  const [bsTarget, setBsTarget] = useState(50);
  const [bsStep, setBsStep] = useState(0);

  const getBsFrames = (target) => {
    let low = 0;
    let high = bsSortedArray.length - 1;
    const frames = [];

    while (low <= high) {
      const mid = Math.floor(low + (high - low) / 2);
      const midVal = bsSortedArray[mid];

      if (midVal === target) {
        frames.push({
          low, mid, high,
          found: true,
          foundIdx: mid,
          desc: `arr[mid] (${midVal}) == target (${target})! Target matched at index ${mid}. Arrays.binarySearch() returns ${mid}.`
        });
        break;
      } else if (target < midVal) {
        frames.push({
          low, mid, high,
          found: false,
          desc: `Target (${target}) < arr[mid] (${midVal}). Search left half: high moves from ${high} to ${mid - 1}.`
        });
        high = mid - 1;
      } else {
        frames.push({
          low, mid, high,
          found: false,
          desc: `Target (${target}) > arr[mid] (${midVal}). Search right half: low moves from ${low} to ${mid + 1}.`
        });
        low = mid + 1;
      }
    }

    if (low > high) {
      const insertionPoint = low;
      const returnValue = -(insertionPoint + 1);
      frames.push({
        low, mid: -1, high,
        found: false,
        missing: true,
        insertionPoint,
        returnValue,
        desc: `Target (${target}) is NOT present in array! Insertion point is index ${insertionPoint}. Arrays.binarySearch() returns -(insertion_point + 1) = -(${insertionPoint} + 1) = ${returnValue}.`
      });
    }

    return frames;
  };

  const bsFrames = getBsFrames(bsTarget);
  const currentBsFrame = bsFrames[Math.min(bsStep, bsFrames.length - 1)] || bsFrames[0];

  // =========================================================================
  // 3. FILL ANIMATION STATE
  // =========================================================================
  const [fillValue, setFillValue] = useState(99);
  const [fillRangeMode, setFillRangeMode] = useState(false);
  const [fillArray, setFillArray] = useState([0, 0, 0, 0, 0, 0]);
  const [fillAnimatedSlots, setFillAnimatedSlots] = useState([]);

  const handleApplyFill = () => {
    setFillAnimatedSlots([]);
    const newArr = [...fillArray];
    const slotsToAnimate = [];

    if (fillRangeMode) {
      // fill index 1 to 4
      for (let i = 1; i < 4; i++) {
        newArr[i] = fillValue;
        slotsToAnimate.push(i);
      }
    } else {
      for (let i = 0; i < newArr.length; i++) {
        newArr[i] = fillValue;
        slotsToAnimate.push(i);
      }
    }

    setFillArray(newArr);
    setFillAnimatedSlots(slotsToAnimate);
  };

  const handleResetFill = () => {
    setFillArray([0, 0, 0, 0, 0, 0]);
    setFillAnimatedSlots([]);
  };

  // =========================================================================
  // 4. COPYOF & COPYOFRANGE ANIMATION STATE
  // =========================================================================
  const copySourceArray = [10, 20, 30, 40, 50];
  const [copyCapacity, setCopyCapacity] = useState(7);
  const [rangeFrom, setRangeFrom] = useState(1);
  const [rangeTo, setRangeTo] = useState(4);

  // =========================================================================
  // 5. EQUALS VS DEEPEQUALS STATE
  // =========================================================================
  const [equalsMode, setEqualsMode] = useState('2d'); // '1d' | '2d'

  // =========================================================================
  // 6. QUIZ STATE
  // =========================================================================
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 'q1',
      question: 'Which package contains the predefined Arrays utility class in Java?',
      options: [
        { key: 'A', text: 'java.lang' },
        { key: 'B', text: 'java.util' },
        { key: 'C', text: 'java.io' },
        { key: 'D', text: 'java.array' }
      ],
      correct: 'B',
      explanation: 'java.util.Arrays is a standard utility class part of the Java Collections Framework in the java.util package.'
    },
    {
      id: 'q2',
      question: 'Can you instantiate the Arrays class using "new Arrays()"?',
      options: [
        { key: 'A', text: 'Yes, it is a normal public class.' },
        { key: 'B', text: 'No, it has a private constructor and all methods are static.' },
        { key: 'C', text: 'Yes, if you pass array capacity to constructor.' },
        { key: 'D', text: 'No, because Arrays is an interface.' }
      ],
      correct: 'B',
      explanation: 'Arrays is declared as "public final class Arrays" with a private constructor to prevent instantiation. All methods are invoked statically.'
    },
    {
      id: 'q3',
      question: 'What is the required precondition before calling Arrays.binarySearch(arr, key)?',
      options: [
        { key: 'A', text: 'Array must contain only positive numbers.' },
        { key: 'B', text: 'Array must be sorted in ascending order.' },
        { key: 'C', text: 'Array length must be an even number.' },
        { key: 'D', text: 'Array must be converted to List first.' }
      ],
      correct: 'B',
      explanation: 'Binary search requires the array to be sorted in ascending order. Calling binarySearch on an unsorted array returns undefined or negative results.'
    },
    {
      id: 'q4',
      question: 'What does Arrays.binarySearch() return if the target element is NOT present in the sorted array?',
      options: [
        { key: 'A', text: '-1' },
        { key: 'B', text: '0' },
        { key: 'C', text: '-(insertion_point + 1)' },
        { key: 'D', text: 'Throws ElementNotFoundException' }
      ],
      correct: 'C',
      explanation: 'Java returns -(insertion_point + 1), where insertion_point is the index where the key would be inserted to maintain sorted order.'
    },
    {
      id: 'q5',
      question: 'Why does Arrays.equals(matrix1, matrix2) return false for two identical 2D arrays?',
      options: [
        { key: 'A', text: '2D arrays are unsupported by the JVM.' },
        { key: 'B', text: 'Arrays.equals only compares 1D element values; for 2D it compares row reference addresses.' },
        { key: 'C', text: 'It requires Arrays.parallelEquals() instead.' },
        { key: 'D', text: 'Because 2D arrays cannot be equal in Java.' }
      ],
      correct: 'B',
      explanation: 'Arrays.equals on 2D arrays compares the row array reference pointers in Heap RAM. To compare nested values recursively, you MUST use Arrays.deepEquals().'
    }
  ];

  const handleSelectQuizOption = (qId, optionKey) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionKey }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner Deck */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-900/40 bg-[#0B1222]/90 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
                <Code2 className="w-6 h-6 animate-pulse" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Arrays Class in Java (<code className="text-cyan-400 font-mono">java.util.Arrays</code>)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Interactive architectural simulation of <code>java.util.Arrays</code> static algorithms: Dual-Pivot Quicksort, Binary Search pointer calculations, memory paint filling, heap buffer resizing, and deep equality comparisons.
            </p>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveSectionTab('animation')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeSectionTab === 'animation'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Interactive Animation</span>
            </button>

            <button
              onClick={() => setActiveSectionTab('code')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeSectionTab === 'code'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Live Code Runner</span>
            </button>

            <button
              onClick={() => setActiveSectionTab('quiz')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeSectionTab === 'quiz'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Knowledge Quiz</span>
            </button>
          </div>
        </div>

        {/* Method Picker Pills */}
        <div className="relative z-10 flex items-center gap-2 pt-6 overflow-x-auto custom-scrollbar select-none">
          {[
            { id: 'sort', label: '1. Arrays.sort()', icon: Shuffle, badge: 'Dual-Pivot Quicksort' },
            { id: 'binarySearch', label: '2. Arrays.binarySearch()', icon: SearchCheck, badge: 'O(log N) Pointers' },
            { id: 'fill', label: '3. Arrays.fill()', icon: Paintbrush, badge: 'Paint Sweep' },
            { id: 'copyOf', label: '4. Arrays.copyOf() & Range', icon: CopyCheck, badge: 'Heap Resizing' },
            { id: 'equals', label: '5. equals() vs deepEquals()', icon: GitCompare, badge: '1D vs 2D Values' }
          ].map((m) => {
            const isSelected = selectedMethod === m.id;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMethod(m.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-300 shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: INTERACTIVE ANIMATION THEATER                                  */}
      {/* ===================================================================== */}
      {activeSectionTab === 'animation' && (
        <div className="space-y-6">
          {/* METHOD 1: ARRAYS.SORT() THEATER */}
          {selectedMethod === 'sort' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-800">
                    <Shuffle className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Arrays.sort(arr) — Dual-Pivot Quicksort Visualizer
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-400">
                      Step {sortStep + 1} of {sortFrames.length}: {sortFrames[sortStep].title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsSortPlaying(false);
                      setSortStep(prev => Math.max(0, prev - 1));
                    }}
                    disabled={sortStep === 0}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold disabled:opacity-40 transition"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 inline mr-0.5" /> Prev
                  </button>

                  <button
                    onClick={() => setIsSortPlaying(!isSortPlaying)}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/40 flex items-center gap-1.5 transition"
                  >
                    {isSortPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isSortPlaying ? 'Pause' : 'Auto Step'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsSortPlaying(false);
                      setSortStep(prev => Math.min(sortFrames.length - 1, prev + 1));
                    }}
                    disabled={sortStep === sortFrames.length - 1}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 disabled:opacity-40 transition"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5 inline ml-0.5" />
                  </button>

                  <button
                    onClick={handleShuffleSortArray}
                    className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition"
                    title="Reset & Shuffle"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Visual Heap Slots */}
              <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">
                    Contiguous Heap Memory Array:
                  </span>
                  <span className="text-cyan-400">
                    Dual-Pivot Partitions: O(N log N)
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {sortFrames[sortStep].arr.map((val, idx) => {
                    const isPivot = sortFrames[sortStep].pivots.includes(idx);
                    const isActive = sortFrames[sortStep].active.includes(idx);

                    return (
                      <div key={idx} className="flex flex-col items-center gap-1.5">
                        {isPivot && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 animate-bounce">
                            Pivot
                          </span>
                        )}
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-black text-lg border transition-all duration-300 ${
                            isPivot
                              ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-xl shadow-amber-500/40 scale-110 ring-2 ring-amber-400'
                              : isActive
                              ? 'bg-gradient-to-b from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-lg shadow-cyan-500/40 scale-105'
                              : 'bg-slate-900 text-slate-300 border-slate-800'
                          }`}
                        >
                          {val}
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">[{idx}]</span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono space-y-1">
                  <div className="text-cyan-400 font-bold">JVM Internal Algorithm Walkthrough:</div>
                  <p className="text-slate-300 leading-relaxed font-sans">{sortFrames[sortStep].desc}</p>
                </div>
              </div>
            </div>
          )}

          {/* METHOD 2: ARRAYS.BINARYSEARCH() THEATER */}
          {selectedMethod === 'binarySearch' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
                    <SearchCheck className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Arrays.binarySearch(sortedArr, target)
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-400">
                      Step {bsStep + 1} of {bsFrames.length}
                    </span>
                  </div>
                </div>

                {/* Target Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">Search Target:</span>
                  <div className="flex items-center gap-1">
                    {[20, 50, 80, 25, 65].map((val) => (
                      <button
                        key={val}
                        onClick={() => {
                          setBsTarget(val);
                          setBsStep(0);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition border ${
                          bsTarget === val
                            ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                            : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 pl-2">
                    <button
                      onClick={() => setBsStep(prev => Math.max(0, prev - 1))}
                      disabled={bsStep === 0}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setBsStep(prev => Math.min(bsFrames.length - 1, prev + 1))}
                      disabled={bsStep === bsFrames.length - 1}
                      className="p-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Visual Binary Search Slots with Low, Mid, High Pointers */}
              <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  {bsSortedArray.map((val, idx) => {
                    const isLow = currentBsFrame.low === idx;
                    const isMid = currentBsFrame.mid === idx;
                    const isHigh = currentBsFrame.high === idx;
                    const inRange = idx >= currentBsFrame.low && idx <= currentBsFrame.high;
                    const isMatch = isMid && currentBsFrame.found;

                    return (
                      <div key={idx} className="flex flex-col items-center gap-1.5 relative">
                        <div className="h-5 flex items-center gap-1">
                          {isMid && (
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 shadow-md">
                              Mid
                            </span>
                          )}
                          {isLow && !isMid && (
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-400 text-slate-950">
                              Low
                            </span>
                          )}
                          {isHigh && !isMid && (
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-400 text-white">
                              High
                            </span>
                          )}
                        </div>

                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-black text-lg border transition-all duration-300 ${
                            isMatch
                              ? 'bg-emerald-500 text-white border-emerald-300 shadow-xl shadow-emerald-500/50 scale-115 ring-2 ring-emerald-300 animate-pulse'
                              : isMid
                              ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg scale-110'
                              : inRange
                              ? 'bg-slate-800 text-white border-cyan-500/60'
                              : 'bg-slate-950 text-slate-600 border-slate-900 opacity-40'
                          }`}
                        >
                          {val}
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">[{idx}]</span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Pointer Calculation: low = {currentBsFrame.low}, high = {currentBsFrame.high}, mid = {currentBsFrame.mid}</span>
                  </div>
                  <p className="text-slate-300 font-sans leading-relaxed">{currentBsFrame.desc}</p>
                </div>
              </div>
            </div>
          )}

          {/* METHOD 3: ARRAYS.FILL() THEATER */}
          {selectedMethod === 'fill' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-pink-950 text-pink-400 border border-pink-800">
                    <Paintbrush className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Arrays.fill(array, value) &amp; Range Fill
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Instantly assigns a constant value to all element slots or a sub-range in O(N) time.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFillRangeMode(!fillRangeMode)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                      fillRangeMode
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {fillRangeMode ? 'Mode: Range Fill [1..4)' : 'Mode: Fill All'}
                  </button>

                  <button
                    onClick={handleApplyFill}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-bold shadow-lg shadow-pink-900/40 transition"
                  >
                    Apply Paint Value ({fillValue})
                  </button>

                  <button
                    onClick={handleResetFill}
                    className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                    title="Reset to 0s"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Value Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-bold">Pick Fill Value:</span>
                {[99, 7, -1, 42, 0].map(v => (
                  <button
                    key={v}
                    onClick={() => setFillValue(v)}
                    className={`px-3 py-1 rounded-lg font-mono font-bold transition border ${
                      fillValue === v
                        ? 'bg-pink-500 text-slate-950 border-pink-400'
                        : 'bg-slate-900 text-slate-300 border-slate-800'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              {/* Slots Visual */}
              <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  {fillArray.map((val, idx) => {
                    const isPainted = fillAnimatedSlots.includes(idx);
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-black text-lg border transition-all duration-500 ${
                            isPainted
                              ? 'bg-gradient-to-b from-pink-500 to-rose-600 text-white border-pink-300 shadow-xl shadow-pink-500/40 scale-110'
                              : 'bg-slate-900 text-slate-300 border-slate-800'
                          }`}
                        >
                          {val}
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">[{idx}]</span>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                  Java Syntax:{' '}
                  <code className="text-pink-400 font-bold">
                    {fillRangeMode
                      ? `Arrays.fill(arr, 1, 4, ${fillValue}); // Modifies indices 1, 2, 3`
                      : `Arrays.fill(arr, ${fillValue}); // Modifies all 6 indices`}
                  </code>
                </div>
              </div>
            </div>
          )}

          {/* METHOD 4: ARRAYS.COPYOF() THEATER */}
          {selectedMethod === 'copyOf' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                    <CopyCheck className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Arrays.copyOf(original, newCapacity) &amp; copyOfRange()
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Creates a newly allocated independent array on the Heap, copying values with padding or truncation.
                    </p>
                  </div>
                </div>

                {/* Capacity Slider */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400">Target Length:</span>
                  {[3, 5, 8].map(cap => (
                    <button
                      key={cap}
                      onClick={() => setCopyCapacity(cap)}
                      className={`px-3 py-1 rounded-lg font-bold border transition ${
                        copyCapacity === cap
                          ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                          : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      {cap} slots
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Buffer Allocation */}
              <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-6">
                {/* 1. Original Source Array */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
                    1. Original Source Array (Heap Address @1b6d):
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {copySourceArray.map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-slate-200">
                          {val}
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Destination New Array */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                    2. Arrays.copyOf(original, {copyCapacity}) (Newly Allocated Heap Array @74a1):
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {Array.from({ length: copyCapacity }).map((_, idx) => {
                      const val = idx < copySourceArray.length ? copySourceArray[idx] : 0;
                      const isPadded = idx >= copySourceArray.length;

                      return (
                        <div key={idx} className="flex flex-col items-center gap-1">
                          <div
                            className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono font-bold ${
                              isPadded
                                ? 'bg-amber-950/80 border-amber-700 text-amber-300 animate-pulse'
                                : 'bg-cyan-950/80 border-cyan-600 text-cyan-300'
                            }`}
                          >
                            {val}
                          </div>
                          <span className="text-[10px] font-mono text-slate-500">
                            {isPadded ? 'Pad' : `[${idx}]`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* METHOD 5: EQUALS VS DEEPEQUALS THEATER */}
          {selectedMethod === 'equals' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-800">
                    <GitCompare className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Arrays.equals() vs Arrays.deepEquals()
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Understand why flat equality fails on 2D arrays and how deep recursive equality solves it.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEqualsMode('1d')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                      equalsMode === '1d' ? 'bg-cyan-500 text-slate-950 border-cyan-300' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    1D Flat Arrays
                  </button>
                  <button
                    onClick={() => setEqualsMode('2d')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                      equalsMode === '2d' ? 'bg-cyan-500 text-slate-950 border-cyan-300' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    2D Nested Matrices
                  </button>
                </div>
              </div>

              {/* Comparison Visualizer */}
              <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-4">
                {equalsMode === '1d' ? (
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200">
                      int[] a = &#123;1, 2, 3&#125;;<br />
                      int[] b = &#123;1, 2, 3&#125;;<br />
                      <span className="text-emerald-400 font-bold">
                        Arrays.equals(a, b) ➔ true (Values in index 0..2 are identical)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                      <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/60 space-y-2">
                        <div className="font-bold text-rose-400">Arrays.equals(m1, m2) ➔ false ❌</div>
                        <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                          Compares row array reference addresses: <code>m1[0] (@1b6d) == m2[0] (@74a1)</code>. Because they are separate objects in Heap RAM, it returns <b>false</b>!
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/60 space-y-2">
                        <div className="font-bold text-emerald-400">Arrays.deepEquals(m1, m2) ➔ true ✅</div>
                        <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                          Recursively traverses inside each row and checks every primitive cell value <code>m1[r][c] == m2[r][c]</code>, correctly returning <b>true</b>!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: LIVE CODE RUNNER & PLAYGROUND                                  */}
      {/* ===================================================================== */}
      {activeSectionTab === 'code' && (
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">
              Live Interactive OpenJDK 21 Arrays Class Playground
            </h3>
          </div>

          <UniversalCodePlayground
            key="arrays-class-playground"
            title="CompleteArraysClassDemo.java"
            initialCode={`import java.util.Arrays;

public class CompleteArraysClassDemo {
    public static void main(String[] args) {
        int[] scores = {95, 82, 67, 88, 74, 91, 55};
        System.out.println("1. Initial Array: " + Arrays.toString(scores));

        // 2. Sort array
        Arrays.sort(scores);
        System.out.println("2. After Sort:    " + Arrays.toString(scores));

        // 3. Binary Search
        int target = 88;
        int idx = Arrays.binarySearch(scores, target);
        System.out.println("3. Element " + target + " found at index: " + idx);

        // 4. Slicing Top 3
        int[] topThree = Arrays.copyOfRange(scores, scores.length - 3, scores.length);
        System.out.println("4. Top 3 Scores:  " + Arrays.toString(topThree));

        // 5. Fill array
        int[] flags = new int[4];
        Arrays.fill(flags, 1);
        System.out.println("5. Flags Array:   " + Arrays.toString(flags));
    }
}`}
            expectedOutput={`1. Initial Array: [95, 82, 67, 88, 74, 91, 55]\n2. After Sort:    [55, 67, 74, 82, 88, 91, 95]\n3. Element 88 found at index: 4\n4. Top 3 Scores:  [88, 91, 95]\n5. Flags Array:   [1, 1, 1, 1]`}
            scenarioId="arrays-class-master"
            defaultHeight="min-h-[450px]"
          />
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: KNOWLEDGE QUIZ ASSESSMENT                                      */}
      {/* ===================================================================== */}
      {activeSectionTab === 'quiz' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-800">
                <QuizIcon className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Arrays Class Interactive Assessment
                </h3>
                <p className="text-xs text-slate-400">
                  Test your understanding of static methods, binary search preconditions, and deep equality.
                </p>
              </div>
            </div>

            {quizSubmitted && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-mono font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Score: {calculateScore()} / {quizQuestions.length}</span>
              </div>
            )}
          </div>

          <div className="space-y-5">
            {quizQuestions.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];
              const isCorrect = selectedOpt === q.correct;

              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-200">
                      {q.question}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-8">
                    {q.options.map((opt) => {
                      const isOptionSelected = selectedOpt === opt.key;
                      let btnClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (quizSubmitted) {
                        if (opt.key === q.correct) {
                          btnClass = 'bg-emerald-950/80 border-emerald-600 text-emerald-300 font-bold';
                        } else if (isOptionSelected) {
                          btnClass = 'bg-rose-950/80 border-rose-600 text-rose-300';
                        }
                      } else if (isOptionSelected) {
                        btnClass = 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-bold';
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectQuizOption(q.id, opt.key)}
                          className={`p-3 rounded-xl text-left text-xs font-sans border transition flex items-center gap-2.5 ${btnClass}`}
                        >
                          <span className="w-5 h-5 rounded-md bg-slate-800 font-mono text-[11px] flex items-center justify-center shrink-0">
                            {opt.key}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className={`p-3 rounded-xl text-xs font-sans pl-8 ${isCorrect ? 'text-emerald-400 bg-emerald-950/40' : 'text-amber-400 bg-amber-950/40'}`}>
                      <b>Explanation:</b> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-semibold border border-slate-800"
            >
              Reset Quiz
            </button>

            {!quizSubmitted ? (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/30 disabled:opacity-40 transition"
              >
                Submit Answers
              </button>
            ) : (
              <span className="text-xs font-mono text-cyan-400 font-bold">
                Great job completing the assessment! 🎉
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
