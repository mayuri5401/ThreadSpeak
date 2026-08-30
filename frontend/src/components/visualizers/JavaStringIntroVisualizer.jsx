import React, { useState, useEffect } from 'react';
import { 
  Code2, Play, CheckCircle2, Copy, Check, ArrowRight, ArrowLeft, 
  ExternalLink, Search, Sparkles, Terminal, BookOpen, Layers, 
  ChevronRight, ChevronLeft, Zap, X, RotateCcw, Cpu, ArrowLeftCircle,
  HelpCircle, Lightbulb, CheckSquare, ListOrdered, FileCode, CheckCircle,
  Filter, Grid, Calculator, RefreshCw, Hash, Pause, FastForward,
  Activity, ArrowDown, CornerDownRight, ShieldCheck, Eye, Sliders,
  Shuffle, Split, SearchCheck, Paintbrush, CopyCheck, GitCompare,
  Binary, KeyRound, Type, Boxes, Lock, Unlock
} from 'lucide-react';
import UniversalCodePlayground from '../playground/UniversalCodePlayground';

/**
 * JavaStringIntroVisualizer
 * Interactive Architecture & Animation Theater for:
 * 1. Character Literal (16-bit Unicode unit in Stack)
 * 2. Character Array (Mutable continuous Heap array)
 * 3. String Object (Immutable UTF-16 text object in SCP/Heap)
 * 4. String vs StringBuffer vs StringBuilder Architecture
 */
export default function JavaStringIntroVisualizer({ onOpenPlayground, activeTab = 'notes' }) {
  const [activeConcept, setActiveConcept] = useState('literal'); // 'literal' | 'charArray' | 'string' | 'classes'
  const [activeSectionTab, setActiveSectionTab] = useState('animation'); // 'animation' | 'code' | 'quiz'

  // =========================================================================
  // 1. CHARACTER LITERAL STATE
  // =========================================================================
  const [sampleChar, setSampleChar] = useState('A');

  const getCharMetadata = (c) => {
    if (!c) return { char: 'A', code: 65, hex: '0x0041', binary: '00000000 01000001', type: 'Letter' };
    const code = c.charCodeAt(0);
    const hex = '0x' + code.toString(16).toUpperCase().padStart(4, '0');
    const binary = code.toString(2).padStart(16, '0').replace(/(.{8})/, '$1 ');
    let type = 'Letter';
    if (/[0-9]/.test(c)) type = 'Digit';
    else if (/[^a-zA-Z0-9\s]/.test(c)) type = 'Symbol / Unicode';
    return { char: c, code, hex, binary, type };
  };

  const charMeta = getCharMetadata(sampleChar);

  // =========================================================================
  // 2. CHARACTER ARRAY STATE (MUTABILITY)
  // =========================================================================
  const [charArraySlots, setCharArraySlots] = useState(['d', 'e', 'e', 'p', 'a', 'k']);
  const [editIndex, setEditIndex] = useState(0);
  const [editValue, setEditValue] = useState('D');
  const [mutatedIndex, setMutatedIndex] = useState(null);

  const handleMutateCharArray = () => {
    if (!editValue) return;
    const newArr = [...charArraySlots];
    newArr[editIndex] = editValue.charAt(0);
    setCharArraySlots(newArr);
    setMutatedIndex(editIndex);
    setTimeout(() => setMutatedIndex(null), 1500);
  };

  const handleResetCharArray = () => {
    setCharArraySlots(['d', 'e', 'e', 'p', 'a', 'k']);
    setEditIndex(0);
    setEditValue('D');
    setMutatedIndex(null);
  };

  // =========================================================================
  // 3. STRING IMMUTABILITY STATE
  // =========================================================================
  const [stringOriginal, setStringOriginal] = useState('Deepak');
  const [stringTransformed, setStringTransformed] = useState(null);
  const [stringActionNote, setStringActionNote] = useState('');

  const handleStringAction = (action) => {
    if (action === 'upper') {
      const res = stringOriginal.toUpperCase();
      setStringTransformed(res);
      setStringActionNote(`s.toUpperCase() returned new String "${res}" at new Heap address @0x74a1. Original String remains "${stringOriginal}" at @0x1b6d!`);
    } else if (action === 'concat') {
      const res = stringOriginal.concat(" Panwar");
      setStringTransformed(res);
      setStringActionNote(`s.concat(" Panwar") created brand new String "${res}" in Heap RAM. Original String "${stringOriginal}" is 100% untouched!`);
    } else if (action === 'replace') {
      const res = stringOriginal.replace('D', 'P');
      setStringTransformed(res);
      setStringActionNote(`s.replace('D', 'P') created new String "${res}". Original "${stringOriginal}" is unmodified!`);
    }
  };

  const handleResetString = () => {
    setStringTransformed(null);
    setStringActionNote('');
  };

  // =========================================================================
  // 4. QUIZ STATE
  // =========================================================================
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 'q1',
      question: 'How much memory does a char data type occupy in Java?',
      options: [
        { key: 'A', text: '8 bits (1 byte) using ASCII' },
        { key: 'B', text: '16 bits (2 bytes) using UTF-16 Unicode' },
        { key: 'C', text: '32 bits (4 bytes)' },
        { key: 'D', text: 'Variable size' }
      ],
      correct: 'B',
      explanation: 'In Java, char is a 16-bit Unicode character (UTF-16 code unit), allowing it to represent characters from almost all human languages.'
    },
    {
      id: 'q2',
      question: 'What is the key difference regarding mutability between a char[] and a String?',
      options: [
        { key: 'A', text: 'char[] is immutable, String is mutable.' },
        { key: 'B', text: 'Both char[] and String are immutable.' },
        { key: 'C', text: 'char[] is mutable (in-place modification allowed), String is immutable.' },
        { key: 'D', text: 'Both char[] and String are mutable.' }
      ],
      correct: 'C',
      explanation: 'Character array elements can be updated in-place (arr[0] = "X"), while String contents can never be modified once instantiated.'
    },
    {
      id: 'q3',
      question: 'Which class should you choose for high-performance mutable string manipulation in single-threaded code?',
      options: [
        { key: 'A', text: 'java.lang.String' },
        { key: 'B', text: 'java.lang.StringBuffer' },
        { key: 'C', text: 'java.lang.StringBuilder' },
        { key: 'D', text: 'java.util.StringTokenizer' }
      ],
      correct: 'C',
      explanation: 'StringBuilder is non-synchronized, eliminating lock acquisition overhead and making it 2x to 3x faster than StringBuffer in single-threaded workflows.'
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
                Character Literal ➔ Character Array ➔ String in Java
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore the foundational evolution of text: <b>Character Literals</b> (16-bit Unicode), <b>Character Arrays</b> (mutable contiguous buffers), and <b>String Objects</b> (immutable UTF-16 sequences).
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

        {/* Concept Selector Tabs */}
        <div className="relative z-10 flex items-center gap-2 pt-6 overflow-x-auto custom-scrollbar select-none">
          {[
            { id: 'literal', label: '1. Character Literal', icon: Type, badge: '16-bit Unicode' },
            { id: 'charArray', label: '2. Character Array (char[])', icon: Boxes, badge: 'Mutable Heap Slots' },
            { id: 'string', label: '3. String Object', icon: ShieldCheck, badge: 'Immutable UTF-16' },
            { id: 'classes', label: '4. String vs Buffer vs Builder', icon: GitCompare, badge: 'Class Architecture' }
          ].map((c) => {
            const isSelected = activeConcept === c.id;
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setActiveConcept(c.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-300 shadow-lg shadow-cyan-500/20 scale-105'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{c.label}</span>
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
          {/* CONCEPT 1: CHARACTER LITERAL */}
          {activeConcept === 'literal' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                    <Type className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Character Literal in Java (16-bit Unicode Code Unit)
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Enclosed in single quotes <code>' '</code>. Stores a 16-bit Unicode character (0 to 65,535).
                    </p>
                  </div>
                </div>

                {/* Quick Character Picker */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-bold">Pick Char:</span>
                  {['A', '5', '#', 'क', '€'].map(ch => (
                    <button
                      key={ch}
                      onClick={() => setSampleChar(ch)}
                      className={`w-8 h-8 rounded-xl font-mono font-bold text-xs border transition ${
                        sampleChar === ch
                          ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                          : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              {/* Memory Inspection Card */}
              <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-950 border border-cyan-800/40">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-cyan-500 to-blue-600 text-white flex items-center justify-center font-mono font-black text-3xl border border-cyan-300 shadow-xl shadow-cyan-500/30 animate-pulse">
                      '{charMeta.char}'
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-cyan-400">
                        Syntax: <code>char ch = '{charMeta.char}';</code>
                      </div>
                      <div className="text-xs text-slate-300">
                        Character Type: <b>{charMeta.type}</b>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        Memory Size: <b>16 bits (2 bytes)</b> in Stack/Local Frame
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono shrink-0">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase">Decimal Value</div>
                      <div className="text-emerald-400 font-bold text-sm">{charMeta.code}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase">Hex (UTF-16)</div>
                      <div className="text-purple-400 font-bold text-sm">{charMeta.hex}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="text-cyan-400 font-bold">16-bit Binary Representation (UTF-16 Code Unit):</div>
                  <div className="text-amber-300 font-mono text-sm tracking-widest bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    {charMeta.binary}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONCEPT 2: CHARACTER ARRAY */}
          {activeConcept === 'charArray' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
                    <Boxes className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Character Array in Java (<code>char[]</code>) — Mutable Memory
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Contiguous array of characters on the Heap. Individual elements can be modified in-place!
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleResetCharArray}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Array</span>
                </button>
              </div>

              {/* Mutable Array Slots */}
              <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 font-bold uppercase">Heap Memory Buffer: char[] ch = &#123;'d','e','e','p','a','k'&#125;</span>
                  <span className="text-emerald-400 font-bold">MUTABLE IN-PLACE</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {charArraySlots.map((ch, idx) => {
                    const isMutated = mutatedIndex === idx;
                    return (
                      <div key={idx} className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-black text-lg border transition-all duration-300 ${
                            isMutated
                              ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-xl shadow-emerald-500/50 scale-115 ring-2 ring-emerald-400'
                              : 'bg-slate-900 text-slate-200 border-slate-700'
                          }`}
                        >
                          '{ch}'
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">[{idx}]</span>
                      </div>
                    );
                  })}
                </div>

                {/* Interactive Mutator Controls */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-bold">Mutate Index:</span>
                    <select
                      value={editIndex}
                      onChange={(e) => setEditIndex(Number(e.target.value))}
                      className="bg-slate-900 text-cyan-300 font-mono font-bold px-3 py-1.5 rounded-lg border border-slate-700"
                    >
                      {charArraySlots.map((_, i) => (
                        <option key={i} value={i}>Index [{i}]</option>
                      ))}
                    </select>

                    <span className="text-slate-400 font-bold">New Char:</span>
                    <input
                      type="text"
                      maxLength={1}
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-12 bg-slate-900 text-white font-mono font-bold text-center py-1.5 rounded-lg border border-slate-700"
                    />
                  </div>

                  <button
                    onClick={handleMutateCharArray}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-900/40 transition"
                  >
                    Execute: ch[{editIndex}] = '{editValue || '?'}' ➔
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CONCEPT 3: STRING OBJECT & IMMUTABILITY */}
          {activeConcept === 'string' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-800">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      String in Java (<code>java.lang.String</code>) — Immutable Object
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Stored in String Constant Pool (SCP). Modifying a String never alters the original object!
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleResetString}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Visual Object Flow */}
              <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                  {/* 1. Original String Object */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-800/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cyan-400 uppercase">1. Original String Object</span>
                      <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">Heap @0x1b6d</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-bold text-lg text-white">
                      "{stringOriginal}"
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans">
                      Protected in String Constant Pool (SCP). Permanently locked and immutable.
                    </div>
                  </div>

                  {/* 2. New Transformed String Object */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-purple-800/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-400 uppercase">2. Result of Method Call</span>
                      <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                        {stringTransformed ? 'New Heap @0x74a1' : 'Awaiting Action'}
                      </span>
                    </div>
                    <div className={`p-3 rounded-xl border text-center font-bold text-lg ${
                      stringTransformed
                        ? 'bg-purple-950/80 border-purple-500 text-purple-200 animate-in zoom-in-95'
                        : 'bg-slate-900/50 border-slate-800 text-slate-600'
                    }`}>
                      {stringTransformed ? `"${stringTransformed}"` : '(Click a button below)'}
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans">
                      {stringTransformed ? 'Brand new object allocated in Heap RAM!' : 'Original remains unmodified.'}
                    </div>
                  </div>
                </div>

                {/* String Actions Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <span className="text-xs text-slate-400 font-bold">Trigger Method:</span>
                  <button
                    onClick={() => handleStringAction('upper')}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-md shadow-cyan-900/30"
                  >
                    .toUpperCase()
                  </button>
                  <button
                    onClick={() => handleStringAction('concat')}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-900/30"
                  >
                    .concat(" Panwar")
                  </button>
                  <button
                    onClick={() => handleStringAction('replace')}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-md shadow-purple-900/30"
                  >
                    .replace('D', 'P')
                  </button>
                </div>

                {stringActionNote && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                    💡 <b>Immutability Proof:</b> {stringActionNote}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CONCEPT 4: STRING VS STRINGBUFFER VS STRINGBUILDER */}
          {activeConcept === 'classes' && (
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <span className="p-1.5 rounded-lg bg-pink-950 text-pink-400 border border-pink-800">
                  <GitCompare className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    String vs StringBuffer vs StringBuilder Architecture
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Compare Mutability, Synchronization Locks, and Thread Safety.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                {/* 1. String */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-800/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-400">String</span>
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">Immutable</span>
                  </div>
                  <div className="text-slate-300 font-sans text-[11px] leading-relaxed">
                    Values cannot change. Any modification allocates a new object. 100% thread-safe without locks.
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Use Case: Static strings, Map keys, Security tokens.
                  </div>
                </div>

                {/* 2. StringBuffer */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-purple-800/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-400">StringBuffer</span>
                    <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-800 flex items-center gap-1">
                      <Lock className="w-3 h-3 inline" /> Synchronized
                    </span>
                  </div>
                  <div className="text-slate-300 font-sans text-[11px] leading-relaxed">
                    Mutable in-place buffer. Methods are synchronized for multi-threaded safety with lock overhead.
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Use Case: Multi-threaded shared text buffers.
                  </div>
                </div>

                {/* 3. StringBuilder */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-800/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">StringBuilder</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                      <Unlock className="w-3 h-3 inline" /> Fast Lock-Free
                    </span>
                  </div>
                  <div className="text-slate-300 font-sans text-[11px] leading-relaxed">
                    Mutable in-place buffer. Non-synchronized for maximum speed in single-threaded operations.
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Use Case: 99% of single-threaded string construction.
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
              Live Interactive OpenJDK 21 String Introduction Playground
            </h3>
          </div>

          <UniversalCodePlayground
            key="string-intro-playground"
            title="StringIntroFoundationDemo.java"
            initialCode={`public class StringIntroFoundationDemo {
    public static void main(String[] args) {
        // 1. Character Literal (Single quotes ' ')
        char ch = 'A';
        char digit = '5';
        char symbol = '#';

        // 2. Character Array (Continuous mutable memory)
        char[] nameArr = {'d', 'e', 'e', 'p', 'a', 'k'};
        nameArr[0] = 'D'; // Mutable in-place

        // 3. String (Double quotes " ")
        String name = "Deepak";
        String greeting = "Hello Deepak, how are you ?";
        String hindi = "नमस्ते";
        String emoji = "😊";

        System.out.println("Character Literal: " + ch + " (Unicode: " + (int)ch + ")");
        System.out.println("Character Array:   " + new String(nameArr));
        System.out.println("String Object:     " + name);
        System.out.println("Unicode Hindi:     " + hindi);
        System.out.println("Unicode Emoji:     " + emoji);
    }
}`}
            expectedOutput={`Character Literal: A (Unicode: 65)\nCharacter Array:   Deepak\nString Object:     Deepak\nUnicode Hindi:     नमस्ते\nUnicode Emoji:     😊`}
            scenarioId="string-intro-demo"
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
                  String Foundation Assessment Quiz
                </h3>
                <p className="text-xs text-slate-400">
                  Test your understanding of Character Literals, Character Arrays, and String Immutability.
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
