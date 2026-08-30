import React, { useState, useEffect } from 'react';
import { 
  Code2, Play, CheckCircle2, Copy, Check, ArrowRight, ArrowLeft, 
  ExternalLink, Search, Sparkles, Terminal, BookOpen, Layers, 
  ChevronRight, ChevronLeft, Zap, X, RotateCcw, Cpu, ArrowLeftCircle,
  HelpCircle, Lightbulb, CheckSquare, ListOrdered, FileCode, CheckCircle,
  Filter, Grid, Calculator, RefreshCw, Hash, Pause, FastForward,
  Activity, ArrowDown, CornerDownRight, ShieldCheck, Eye, Sliders,
  Shuffle, Split, SearchCheck, Paintbrush, CopyCheck, GitCompare,
  Binary, KeyRound, Type, Scissors, ArrowLeftRight
} from 'lucide-react';
import UniversalCodePlayground from '../playground/UniversalCodePlayground';

/**
 * JavaStringClassVisualizer
 * High-End Architecture & Animation Theater for java.lang.String:
 * 1. length(), charAt(index), substring(begin, end) — Visual Slicer
 * 2. equals() vs equalsIgnoreCase() vs compareTo() — Lexicographical Comparer
 * 3. trim(), toUpperCase(), toLowerCase(), replace() — String Transformer
 * 4. intern() & String Constant Pool (SCP) — Memory Pointer Redirection
 * 5. CharSequence Interface Polymorphism
 */
export default function JavaStringClassVisualizer({ onOpenPlayground, activeTab = 'notes' }) {
  const [activeMethodKey, setActiveMethodKey] = useState('slicing'); // 'slicing' | 'comparison' | 'transform' | 'intern' | 'charSequence'
  const [activeSectionTab, setActiveSectionTab] = useState('animation'); // 'animation' | 'code' | 'quiz'

  // =========================================================================
  // 1. SLICING STATE: length(), charAt(), substring()
  // =========================================================================
  const sampleString = "Programming";
  const [charAtIndex, setCharAtIndex] = useState(2);
  const [subBegin, setSubBegin] = useState(0);
  const [subEnd, setSubEnd] = useState(6);

  // =========================================================================
  // 2. COMPARISON STATE: equals, equalsIgnoreCase, compareTo
  // =========================================================================
  const [compStr1, setCompStr1] = useState('Apple');
  const [compStr2, setCompStr2] = useState('Banana');

  const getCompareDetails = (s1, s2) => {
    const isEquals = s1 === s2;
    const isEqualsIgnore = s1.toLowerCase() === s2.toLowerCase();
    const compVal = s1.localeCompare(s2);
    let asciiMath = '';
    if (s1.length > 0 && s2.length > 0) {
      const c1 = s1.charCodeAt(0);
      const c2 = s2.charCodeAt(0);
      asciiMath = `'${s1[0]}' (${c1}) - '${s2[0]}' (${c2}) = ${c1 - c2}`;
    }
    return { isEquals, isEqualsIgnore, compVal, asciiMath };
  };

  const compDetails = getCompareDetails(compStr1, compStr2);

  // =========================================================================
  // 3. TRANSFORM STATE: trim(), toUpperCase(), replace()
  // =========================================================================
  const [transformInput, setTransformInput] = useState("  Hello Java  ");
  const [transformType, setTransformType] = useState('trim');

  const getTransformedResult = (str, type) => {
    switch (type) {
      case 'trim': return { res: str.trim(), syntax: 's.trim()' };
      case 'upper': return { res: str.toUpperCase(), syntax: 's.toUpperCase()' };
      case 'lower': return { res: str.toLowerCase(), syntax: 's.toLowerCase()' };
      case 'replace': return { res: str.replace(/a/g, 'o'), syntax: "s.replace('a', 'o')" };
      default: return { res: str, syntax: 's' };
    }
  };

  const transformResult = getTransformedResult(transformInput, transformType);

  // =========================================================================
  // 4. INTERN() STATE
  // =========================================================================
  const [internExecuted, setInternExecuted] = useState(false);

  // =========================================================================
  // 5. QUIZ STATE
  // =========================================================================
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the return value of "Programming".substring(0, 6)?',
      options: [
        { key: 'A', text: '"Program"' },
        { key: 'B', text: '"Progra"' },
        { key: 'C', text: '"Programmi"' },
        { key: 'D', text: 'Throws StringIndexOutOfBoundsException' }
      ],
      correct: 'B',
      explanation: 'substring(begin, end) is exclusive of end index (6). It extracts indices 0, 1, 2, 3, 4, 5 which is "Progra" (6 characters).'
    },
    {
      id: 'q2',
      question: 'What does "Apple".compareTo("Banana") return in Java?',
      options: [
        { key: 'A', text: '0 (equal)' },
        { key: 'B', text: 'Positive number' },
        { key: 'C', text: 'Negative number (-1) because "Apple" comes before "Banana"' },
        { key: 'D', text: 'false' }
      ],
      correct: 'C',
      explanation: 'compareTo compares first differing characters: "A" (ASCII 65) - "B" (ASCII 66) = -1 (negative value).'
    },
    {
      id: 'q3',
      question: 'Why does s.intern() return a reference from the String Constant Pool?',
      options: [
        { key: 'A', text: 'To delete unused Strings from memory' },
        { key: 'B', text: 'To reuse existing pooled literals and save Heap memory' },
        { key: 'C', text: 'To make the String mutable' },
        { key: 'D', text: 'To convert String into char[]' }
      ],
      correct: 'B',
      explanation: 'The intern() method returns the canonical pooled object from the SCP, allowing reference equality (==) and avoiding duplicate Heap instances.'
    }
  ];

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
                String Class in Java (<code className="text-cyan-400 font-mono">java.lang.String</code>)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore essential <code>java.lang.String</code> methods: Slicing (<code>length</code>, <code>charAt</code>, <code>substring</code>), Comparison (<code>equals</code>, <code>compareTo</code>), Transformation (<code>trim</code>, <code>replace</code>), and Memory Interning (<code>intern</code>).
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
            { id: 'slicing', label: '1. charAt() & substring()', icon: Scissors, badge: 'Slicing & Indexing' },
            { id: 'comparison', label: '2. equals() & compareTo()', icon: ArrowLeftRight, badge: 'Lexicographical' },
            { id: 'transform', label: '3. trim(), replace() & case', icon: Paintbrush, badge: 'Transformations' },
            { id: 'intern', label: '4. intern() & SCP Pooling', icon: KeyRound, badge: 'Memory Optimization' },
            { id: 'charSequence', label: '5. CharSequence Interface', icon: Layers, badge: 'Polymorphism' }
          ].map((m) => {
            const isSelected = activeMethodKey === m.id;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMethodKey(m.id)}
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
          {/* METHOD 1: SLICING (charAt, substring, length) */}
          {activeMethodKey === 'slicing' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                    <Scissors className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      String Slicing: <code>length()</code>, <code>charAt(i)</code>, <code>substring(begin, end)</code>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      String: <code>String s = "{sampleString}";</code> (Length: {sampleString.length})
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Character Slots */}
              <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {sampleString.split('').map((ch, idx) => {
                    const isCharAt = charAtIndex === idx;
                    const inSubstring = idx >= subBegin && idx < subEnd;

                    return (
                      <div key={idx} className="flex flex-col items-center gap-1.5 relative">
                        {isCharAt && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950 animate-bounce">
                            charAt
                          </span>
                        )}
                        <div
                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-mono font-black text-lg border transition-all duration-300 ${
                            isCharAt
                              ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-xl scale-110'
                              : inSubstring
                              ? 'bg-gradient-to-b from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-lg scale-105'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          '{ch}'
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">[{idx}]</span>
                      </div>
                    );
                  })}
                </div>

                {/* Interactive Slicing Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  {/* charAt Control */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400">1. charAt(index)</span>
                      <span className="text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        Result: '{sampleString.charAt(charAtIndex)}'
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">Index:</span>
                      <input
                        type="range"
                        min={0}
                        max={sampleString.length - 1}
                        value={charAtIndex}
                        onChange={(e) => setCharAtIndex(Number(e.target.value))}
                        className="w-full accent-amber-400"
                      />
                      <span className="text-amber-400 font-bold w-4">{charAtIndex}</span>
                    </div>
                    <code className="text-[11px] text-slate-400 block">
                      s.charAt({charAtIndex}) ➔ '{sampleString.charAt(charAtIndex)}'
                    </code>
                  </div>

                  {/* substring Control */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-400">2. substring(begin, end)</span>
                      <span className="text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        Result: "{sampleString.substring(subBegin, subEnd)}"
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">Begin:</span>
                        <input
                          type="range"
                          min={0}
                          max={subEnd}
                          value={subBegin}
                          onChange={(e) => setSubBegin(Number(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                        <span className="text-cyan-400 font-bold">{subBegin}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">End:</span>
                        <input
                          type="range"
                          min={subBegin}
                          max={sampleString.length}
                          value={subEnd}
                          onChange={(e) => setSubEnd(Number(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                        <span className="text-cyan-400 font-bold">{subEnd}</span>
                      </div>
                    </div>
                    <code className="text-[11px] text-slate-400 block">
                      s.substring({subBegin}, {subEnd}) ➔ "{sampleString.substring(subBegin, subEnd)}"
                    </code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* METHOD 2: COMPARISONS */}
          {activeMethodKey === 'comparison' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-800">
                    <ArrowLeftRight className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      String Comparison: <code>equals()</code>, <code>equalsIgnoreCase()</code> &amp; <code>compareTo()</code>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Case-sensitive value matching and lexicographical ASCII sorting.
                    </p>
                  </div>
                </div>

                {/* Presets */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400">Presets:</span>
                  {[
                    { s1: 'Apple', s2: 'Banana' },
                    { s1: 'Java', s2: 'java' },
                    { s1: 'Code', s2: 'Code' }
                  ].map((p, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCompStr1(p.s1);
                        setCompStr2(p.s2);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-mono"
                    >
                      "{p.s1}" vs "{p.s2}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Input Comparison */}
              <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="text-slate-400 font-bold">String 1 (s1):</span>
                    <input
                      type="text"
                      value={compStr1}
                      onChange={(e) => setCompStr1(e.target.value)}
                      className="w-full bg-slate-900 text-cyan-300 font-bold p-2.5 rounded-lg border border-slate-700"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="text-slate-400 font-bold">String 2 (s2):</span>
                    <input
                      type="text"
                      value={compStr2}
                      onChange={(e) => setCompStr2(e.target.value)}
                      className="w-full bg-slate-900 text-purple-300 font-bold p-2.5 rounded-lg border border-slate-700"
                    />
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                  <div className={`p-4 rounded-xl border ${compDetails.isEquals ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>
                    <div className="text-[10px] text-slate-500 uppercase">s1.equals(s2)</div>
                    <div className="font-bold text-base mt-1">{compDetails.isEquals.toString()}</div>
                    <div className="text-[11px] text-slate-400 mt-1 font-sans">Case-sensitive exact character match.</div>
                  </div>

                  <div className={`p-4 rounded-xl border ${compDetails.isEqualsIgnore ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>
                    <div className="text-[10px] text-slate-500 uppercase">s1.equalsIgnoreCase(s2)</div>
                    <div className="font-bold text-base mt-1">{compDetails.isEqualsIgnore.toString()}</div>
                    <div className="text-[11px] text-slate-400 mt-1 font-sans">Case-insensitive comparison.</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300">
                    <div className="text-[10px] text-slate-500 uppercase">s1.compareTo(s2)</div>
                    <div className="font-bold text-base mt-1">{compDetails.compVal}</div>
                    <div className="text-[11px] text-slate-400 mt-1 font-sans">{compDetails.asciiMath}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* METHOD 3: TRANSFORMATIONS */}
          {activeMethodKey === 'transform' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-pink-950 text-pink-400 border border-pink-800">
                    <Paintbrush className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      String Transformations: <code>trim()</code>, <code>toUpperCase()</code>, <code>replace()</code>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Returns newly created transformed String instances.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {['trim', 'upper', 'lower', 'replace'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTransformType(t)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
                        transformType === t
                          ? 'bg-pink-500 text-slate-950 border-pink-400'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {t}()
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-slate-400 font-bold">Input String:</span>
                    <input
                      type="text"
                      value={transformInput}
                      onChange={(e) => setTransformInput(e.target.value)}
                      className="w-full bg-slate-900 text-white p-2.5 rounded-lg border border-slate-700 font-bold"
                    />
                    <span className="text-[11px] text-slate-500">Length: {transformInput.length} chars</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-pink-900/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-pink-400 font-bold">Transformed Result:</span>
                      <span className="text-[10px] text-pink-300 bg-pink-950 px-2 py-0.5 rounded">New Heap Object</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-pink-200 font-bold text-sm">
                      "{transformResult.res}"
                    </div>
                    <span className="text-[11px] text-slate-500">Length: {transformResult.res.length} chars</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                  Execution Syntax: <code className="text-pink-400 font-bold">{transformResult.syntax}</code>
                </div>
              </div>
            </div>
          )}

          {/* METHOD 4: INTERN() & SCP */}
          {activeMethodKey === 'intern' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-800">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      The <code>intern()</code> Method &amp; String Constant Pool (SCP)
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Returns canonical pooled reference from SCP to save memory and allow <code>==</code> reference matching.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setInternExecuted(!internExecuted)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg ${
                    internExecuted
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                  }`}
                >
                  {internExecuted ? 'Reset SCP Pointer' : 'Execute s1.intern() ➔'}
                </button>
              </div>

              {/* Visual Memory Pointer Flow */}
              <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  {/* Heap Memory */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="text-slate-400 font-bold uppercase">1. Non-Pool Heap Memory:</div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-cyan-400 font-bold">String s1 = new String("Hello");</div>
                      <div className="text-[11px] text-slate-500">Allocated at Heap address @0x8888</div>
                    </div>
                  </div>

                  {/* SCP Pool */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-amber-800/60 space-y-3">
                    <div className="text-amber-400 font-bold uppercase">2. String Constant Pool (SCP):</div>
                    <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-700/60 space-y-1">
                      <div className="text-amber-300 font-bold">"Hello" (Pooled Object)</div>
                      <div className="text-[11px] text-slate-400">Canonical SCP address @0x1111</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                  <div className="text-slate-300">
                    String s2 = "Hello"; // Points to SCP @0x1111<br />
                    String s3 = s1.intern(); // {internExecuted ? 'Points to SCP @0x1111' : 'Awaiting invocation'}
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs">
                    <span className="text-slate-400">s1 == s2: <b className="text-rose-400">false</b> (Heap @0x8888 != SCP @0x1111)</span>
                    <span className="text-slate-400">
                      s2 == s3 (After intern): <b className={internExecuted ? 'text-emerald-400' : 'text-slate-500'}>{internExecuted ? 'true ✅ (Same SCP address @0x1111)' : 'Pending'}</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* METHOD 5: CHARSEQUENCE INTERFACE */}
          {activeMethodKey === 'charSequence' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                  <Layers className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    The <code>CharSequence</code> Interface Polymorphism
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Unified readable character sequence interface implemented by String, StringBuilder, StringBuffer, and CharBuffer.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-800/60 space-y-2">
                  <div className="font-bold text-cyan-400">String</div>
                  <div className="text-slate-300 text-[11px] font-sans">
                    Immutable sequence of UTF-16 characters. Implements CharSequence.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-purple-800/60 space-y-2">
                  <div className="font-bold text-purple-400">StringBuffer</div>
                  <div className="text-slate-300 text-[11px] font-sans">
                    Mutable and synchronized sequence. Implements CharSequence.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-800/60 space-y-2">
                  <div className="font-bold text-emerald-400">StringBuilder</div>
                  <div className="text-slate-300 text-[11px] font-sans">
                    Mutable and high-performance sequence. Implements CharSequence.
                  </div>
                </div>
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
              Live OpenJDK 21 String Class Master Playground
            </h3>
          </div>

          <UniversalCodePlayground
            key="string-class-playground"
            title="StringClassMasterDemo.java"
            initialCode={`public class StringClassMasterDemo {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Programming";
        String s3 = " Java ";

        // 1. Length & Character Access
        System.out.println("Length: " + s1.length());       // 4
        System.out.println("Char at 2: " + s1.charAt(2));   // 'v'

        // 2. Substring & Trimming
        System.out.println("Substring [0, 6): " + s2.substring(0, 6)); // "Progra"
        System.out.println("Trimmed: '" + s3.trim() + "'");            // "Java"

        // 3. Comparison & Interning
        String heapStr = new String("Java");
        String pooled = heapStr.intern();
        System.out.println("heapStr == s1: " + (heapStr == s1)); // false
        System.out.println("pooled == s1:  " + (pooled == s1));  // true

        // 4. Case & Replacement
        System.out.println("Upper: " + s1.toUpperCase());              // "JAVA"
        System.out.println("Replaced: " + s1.replace('a', 'o'));       // "Jovo"
    }
}`}
            expectedOutput={`Length: 4\nChar at 2: v\nSubstring [0, 6): Progra\nTrimmed: 'Java'\nheapStr == s1: false\npooled == s1:  true\nUpper: JAVA\nReplaced: Jovo`}
            scenarioId="string-class-demo"
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
                <HelpCircle className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  String Class Assessment Quiz
                </h3>
                <p className="text-xs text-slate-400">
                  Test your understanding of String methods, substring boundaries, compareTo(), and interning.
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
                          onClick={() => {
                            if (!quizSubmitted) setQuizAnswers(prev => ({ ...prev, [q.id]: opt.key }));
                          }}
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
