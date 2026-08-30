import React, { useState, useMemo, useEffect } from 'react';
import { 
  Code2, Play, CheckCircle2, Copy, Check, ArrowRight, ArrowLeft, 
  Search, Sparkles, Terminal, BookOpen, Layers, 
  ChevronRight, ChevronLeft, Zap, X, RotateCcw, Cpu,
  HelpCircle, Lightbulb, CheckSquare, ListOrdered, FileCode, CheckCircle, Sliders, Hash
} from 'lucide-react';
import UniversalCodePlayground from '../playground/UniversalCodePlayground';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';
import { parseUrlState, updateBrowserUrl } from '../../shared/utils/urlRouter';

export default function JavaNumberPatternsVisualizer({ onOpenPlayground }) {
  // Navigation state: selectedPatternId synced with browser URL & history
  const [selectedPatternId, setSelectedPatternId] = useState(() => {
    try {
      const state = parseUrlState();
      const progNum = parseInt(state.program, 10);
      return progNum >= 1 && progNum <= 8 ? progNum : null;
    } catch {
      return null;
    }
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [interactiveN, setInteractiveN] = useState(5);

  // Sync state with browser URL & history popstate
  useEffect(() => {
    const handlePopState = (e) => {
      const state = e.state || parseUrlState();
      if (state.program) {
        const prog = parseInt(state.program, 10);
        if (prog >= 1 && prog <= 8) {
          setSelectedPatternId(prog);
          return;
        }
      }
      setSelectedPatternId(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectPattern = (id) => {
    setSelectedPatternId(id);
    setInteractiveN(5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateBrowserUrl({ program: id }, false);
  };

  const handleBackToList = () => {
    setSelectedPatternId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateBrowserUrl({ program: null }, false);
  };

  // Complete List of All 8 Number Patterns
  const patterns = [
    {
      id: 1,
      number: 1,
      category: 'triangles',
      categoryLabel: 'Triangular Sequences',
      title: 'Pattern 1: Row Repeated Number Triangle',
      summary: 'Right-angled number triangle where each row repeats its row index i.',
      difficulty: 'Beginner',
      preview: `1
2 2
3 3 3
4 4 4 4
5 5 5 5 5`,
      formula: 'Value = i, Columns per row = i',
      rowLogic: 'for (int i = 1; i <= n; i++)',
      colLogic: 'for (int j = 1; j <= i; j++) System.out.print(i + " ");',
      explanationNotes: [
        {
          heading: '1. Row Index Propagation:',
          detail: 'Outer loop variable i acts as both the row driver and the printed value. Inner loop runs i times to repeat the number i across all columns of row i.'
        },
        {
          heading: '2. Dry Run Trace (n = 5):',
          detail: 'Row 1 (i=1): prints "1"\nRow 2 (i=2): prints "2 2"\nRow 3 (i=3): prints "3 3 3"\nRow 4 (i=4): prints "4 4 4 4"\nRow 5 (i=5): prints "5 5 5 5 5"'
        },
        {
          heading: '3. Time & Space Complexity:',
          detail: 'Time: O(n²) because total printed values = n(n+1)/2.\nSpace: O(1) auxiliary space (no extra memory allocated).'
        }
      ],
      codeTitle: 'NumberPattern1.java',
      code: `public class NumberPattern1
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                System.out.print(i + " ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          out += `${i} `.repeat(i).trimEnd() + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 2,
      number: 2,
      category: 'triangles',
      categoryLabel: 'Triangular Sequences',
      title: 'Pattern 2: Column Increasing Number Triangle',
      summary: 'Right-angled number triangle counting up from 1 to i on every row.',
      difficulty: 'Beginner',
      preview: `1
1 2
1 2 3
1 2 3 4
1 2 3 4 5`,
      formula: 'Value = j, Columns per row = i',
      rowLogic: 'for (int i = 1; i <= n; i++)',
      colLogic: 'for (int j = 1; j <= i; j++) System.out.print(j + " ");',
      explanationNotes: [
        {
          heading: '1. Column Index Invariant:',
          detail: 'Unlike Pattern 1, the inner loop variable j is printed instead of i. Thus, each row starts fresh at 1 and increments up to i.'
        },
        {
          heading: '2. Difference Between Pattern 1 & 2:',
          detail: 'Pattern 1 prints constant values across a row (horizontal constant: i). Pattern 2 prints varying values across a row (horizontal increment: j).'
        },
        {
          heading: '3. Dry Run Trace (n = 5):',
          detail: 'i=1: j=1 -> "1"\ni=2: j=1,2 -> "1 2"\ni=3: j=1,2,3 -> "1 2 3"\ni=4: j=1,2,3,4 -> "1 2 3 4"\ni=5: j=1,2,3,4,5 -> "1 2 3 4 5"'
        }
      ],
      codeTitle: 'NumberPattern2.java',
      code: `public class NumberPattern2
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          const row = [];
          for (let j = 1; j <= i; j++) row.push(j);
          out += row.join(' ') + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 3,
      number: 3,
      category: 'counters',
      categoryLabel: 'Continuous Counters',
      title: "Pattern 3: Floyd's Triangle",
      summary: 'Sequential global counter incrementing continuously across row breaks.',
      difficulty: 'Intermediate',
      preview: `1
2 3
4 5 6
7 8 9 10`,
      formula: 'Continuous counter: count++ on every print',
      rowLogic: 'for (int i = 1; i <= n; i++) with external int count = 1;',
      colLogic: 'for (int j = 1; j <= i; j++) System.out.print(count++ + " ");',
      explanationNotes: [
        {
          heading: "1. What is Floyd's Triangle?",
          detail: "Floyd's triangle is a right-angled triangular array of natural numbers, named after Robert Floyd. It fills successive rows with consecutive natural numbers starting from 1."
        },
        {
          heading: '2. Global Accumulator Pattern:',
          detail: 'Maintain an integer accumulator count initialized to 1 before all loops. Increment post-print (count++) so the sequence never resets on newline.'
        },
        {
          heading: '3. Math Invariant:',
          detail: 'The last number on row i is the i-th triangular number: T(i) = i*(i + 1)/2. For n=4, the last element is 4*5/2 = 10.'
        }
      ],
      codeTitle: 'NumberPattern3.java',
      code: `public class NumberPattern3
{
    public static void main(String[] args)
    {
        int n = 4;
        int count = 1;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                System.out.print(count + " ");
                count++;
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        let count = 1;
        for (let i = 1; i <= n; i++) {
          const row = [];
          for (let j = 1; j <= i; j++) row.push(count++);
          out += row.join(' ') + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 4,
      number: 4,
      category: 'triangles',
      categoryLabel: 'Triangular Sequences',
      title: 'Pattern 4: Reverse Countdown Number Triangle',
      summary: 'Right-angled triangle counting down from row index i down to 1.',
      difficulty: 'Beginner',
      preview: `1
2 1
3 2 1
4 3 2 1
5 4 3 2 1`,
      formula: 'for (int j = i; j >= 1; j--) print(j)',
      rowLogic: 'for (int i = 1; i <= n; i++)',
      colLogic: 'Inner loop decrements from i down to 1',
      explanationNotes: [
        {
          heading: '1. Countdown Invariant:',
          detail: 'The inner loop initializes j to the current row value i (j = i) and decrements (j--) until reaching 1.'
        },
        {
          heading: '2. Dry Run Trace:',
          detail: 'i=1: j=1 -> "1"\ni=2: j=2,1 -> "2 1"\ni=3: j=3,2,1 -> "3 2 1"\ni=4: j=4,3,2,1 -> "4 3 2 1"\ni=5: j=5,4,3,2,1 -> "5 4 3 2 1"'
        }
      ],
      codeTitle: 'NumberPattern4.java',
      code: `public class NumberPattern4
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            for (int j = i; j >= 1; j--)
            {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          const row = [];
          for (let j = i; j >= 1; j--) row.push(j);
          out += row.join(' ') + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 5,
      number: 5,
      category: 'palindromes',
      categoryLabel: 'Palindromic Sequences',
      title: 'Pattern 5: Palindromic Number Triangle',
      summary: 'Symmetric palindrome sequence increasing from 1 to i and mirroring back to 1.',
      difficulty: 'Intermediate',
      preview: `1
1 2 1
1 2 3 2 1
1 2 3 4 3 2 1`,
      formula: 'Ascending (1..i) + Descending ((i-1)..1)',
      rowLogic: 'for (int i = 1; i <= n; i++)',
      colLogic: 'Ascending loop (1 to i) followed by Descending loop (i-1 down to 1)',
      explanationNotes: [
        {
          heading: '1. Two-Phase Row Breakdown:',
          detail: 'Each row consists of an ascending half (1, 2, ... i) and a descending tail (i-1, i-2, ... 1). Total numbers in row i = 2*i - 1.'
        },
        {
          heading: '2. Palindrome Property:',
          detail: 'Every row reads the exact same forward and backward (e.g. "1 2 3 2 1").'
        },
        {
          heading: '3. Trace Table (i = 4):',
          detail: 'Ascending Phase (1..4): "1 2 3 4"\nDescending Phase (3..1): "3 2 1"\nCombined Row: "1 2 3 4 3 2 1"'
        }
      ],
      codeTitle: 'NumberPattern5.java',
      code: `public class NumberPattern5
{
    public static void main(String[] args)
    {
        int n = 4;

        for (int i = 1; i <= n; i++)
        {
            // Ascending Part: 1 to i
            for (int j = 1; j <= i; j++)
            {
                System.out.print(j + " ");
            }

            // Descending Part: i - 1 down to 1
            for (int j = i - 1; j >= 1; j--)
            {
                System.out.print(j + " ");
            }

            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          const row = [];
          for (let j = 1; j <= i; j++) row.push(j);
          for (let j = i - 1; j >= 1; j--) row.push(j);
          out += row.join(' ') + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 6,
      number: 6,
      category: 'triangles',
      categoryLabel: 'Triangular Sequences',
      title: 'Pattern 6: Inverted Reverse Number Triangle',
      summary: 'Inverted triangle starting each row at top number n and counting down to i.',
      difficulty: 'Intermediate',
      preview: `5 4 3 2 1
5 4 3 2
5 4 3
5 4
5`,
      formula: 'for (int j = n; j >= i; j--) print(j)',
      rowLogic: 'for (int i = 1; i <= n; i++)',
      colLogic: 'Count down from fixed n to current row index i',
      explanationNotes: [
        {
          heading: '1. Fixed Start, Dynamic Termination:',
          detail: 'Each row starts at the upper boundary n (e.g. 5) and stops when j reaches the row threshold i. As i increases from 1 to 5, the row shrinks.'
        },
        {
          heading: '2. Row Walkthrough (n = 5):',
          detail: 'Row 1 (i=1): 5 down to 1 -> "5 4 3 2 1"\nRow 2 (i=2): 5 down to 2 -> "5 4 3 2"\nRow 3 (i=3): 5 down to 3 -> "5 4 3"\nRow 4 (i=4): 5 down to 4 -> "5 4"\nRow 5 (i=5): 5 down to 5 -> "5"'
        }
      ],
      codeTitle: 'NumberPattern6.java',
      code: `public class NumberPattern6
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            for (int j = n; j >= i; j--)
            {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          const row = [];
          for (let j = n; j >= i; j--) row.push(j);
          out += row.join(' ') + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 7,
      number: 7,
      category: 'advanced',
      categoryLabel: 'Mathematical & Matrix Grids',
      title: 'Pattern 7: Column-Wise Difference Increment Triangle',
      summary: 'Row starts at i, and subsequent elements increase by decreasing stride (n - j).',
      difficulty: 'Hard',
      preview: `1
2 6
3 7 10
4 8 11 13
5 9 12 14 15`,
      formula: 'val = i; next val = val + (n - j)',
      rowLogic: 'for (int i = 1; i <= n; i++)',
      colLogic: 'val starts at i, jumps by (n - j) for each column j',
      explanationNotes: [
        {
          heading: '1. Column Stride Formula:',
          detail: 'In row i, element 1 is always i. Next element is calculated by adding (n - j) where j is the 1-based column index.'
        },
        {
          heading: '2. Step-by-Step Derivation (n = 5):',
          detail: 'Row 1: 1\nRow 2: 2, (+4) -> 6\nRow 3: 3, (+4) -> 7, (+3) -> 10\nRow 4: 4, (+4) -> 8, (+3) -> 11, (+2) -> 13\nRow 5: 5, (+4) -> 9, (+3) -> 12, (+2) -> 14, (+1) -> 15'
        },
        {
          heading: '3. Column Invariant Insight:',
          detail: 'Notice column 1 contains 1, 2, 3, 4, 5. Column 2 contains 6, 7, 8, 9. Column 3 contains 10, 11, 12. Column 4 contains 13, 14. Column 5 contains 15! This is a column-major filled triangle.'
        }
      ],
      codeTitle: 'NumberPattern7.java',
      code: `public class NumberPattern7
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            int val = i;
            for (int j = 1; j <= i; j++)
            {
                System.out.print(val + " ");
                val += (n - j);
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          const row = [];
          let val = i;
          for (let j = 1; j <= i; j++) {
            row.push(val);
            val += (n - j);
          }
          out += row.join(' ') + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 8,
      number: 8,
      category: 'advanced',
      categoryLabel: 'Mathematical & Matrix Grids',
      title: 'Pattern 8: Snake / Alternating Matrix Pattern',
      summary: 'Continuous sequential numbers printed in alternating left-to-right and right-to-left directions.',
      difficulty: 'Hard',
      preview: `1  2  3
6  5  4
7  8  9
12 11 10
13 14 15`,
      formula: 'Odd rows: (i-1)*cols + 1 to i*cols | Even rows: i*cols down to (i-1)*cols + 1',
      rowLogic: 'for (int i = 1; i <= n; i++) (where n = 5 rows, cols = 3)',
      colLogic: 'Direction toggles based on (i % 2 != 0)',
      explanationNotes: [
        {
          heading: '1. Snake / Boustrophedon Traversal:',
          detail: 'Odd rows print forward (left-to-right). Even rows print in reverse (right-to-left), creating a winding serpentine snake path.'
        },
        {
          heading: '2. Arithmetic Start and End Formulas:',
          detail: 'Row i spans the range: start = (i - 1) * cols + 1, end = i * cols.\nIf i % 2 != 0: for (int j = start; j <= end; j++)\nIf i % 2 == 0: for (int j = end; j >= start; j--)'
        },
        {
          heading: '3. Matrix Padding:',
          detail: 'Double spacing ensures uniform vertical column alignment for multi-digit numbers.'
        }
      ],
      codeTitle: 'NumberPattern8.java',
      code: `public class NumberPattern8
{
    public static void main(String[] args)
    {
        int n = 5;       // Number of rows
        int cols = 3;    // Columns per row

        for (int i = 1; i <= n; i++)
        {
            if (i % 2 != 0)
            {
                // Odd Row: Left-to-Right
                for (int j = (i - 1) * cols + 1; j <= i * cols; j++)
                {
                    System.out.print(j + (j < 10 ? "  " : " "));
                }
            }
            else
            {
                // Even Row: Right-to-Left (Reversed)
                for (int j = i * cols; j >= (i - 1) * cols + 1; j--)
                {
                    System.out.print(j + (j < 10 ? "  " : " "));
                }
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        const cols = 3;
        for (let i = 1; i <= n; i++) {
          const row = [];
          if (i % 2 !== 0) {
            for (let j = (i - 1) * cols + 1; j <= i * cols; j++) {
              row.push(j < 10 ? `${j} ` : `${j}`);
            }
          } else {
            for (let j = i * cols; j >= (i - 1) * cols + 1; j--) {
              row.push(j < 10 ? `${j} ` : `${j}`);
            }
          }
          out += row.join(' ') + '\n';
        }
        return out.trimEnd();
      }
    }
  ];

  const filteredPatterns = patterns.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.number.toString() === searchQuery.trim();
    return matchesCat && matchesSearch;
  });

  const selectedPattern = patterns.find(p => p.id === selectedPatternId);

  // ==========================================
  // SINGLE PATTERN DEEP-DIVE VIEW
  // ==========================================
  if (selectedPattern) {
    return (
      <div className="space-y-8 animate-fadeIn select-text pb-12">
        {/* Top Navigation Bar with Back Button */}
        <div className="glass-panel p-5 rounded-3xl border border-slate-800/80 bg-[#0A101D] shadow-xl flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-800/40 text-xs sm:text-sm font-semibold transition group shadow-md"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All 8 Number Patterns</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              disabled={selectedPattern.id === 1}
              onClick={() => handleSelectPattern(selectedPattern.id - 1)}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white border border-slate-800 transition"
              title="Previous Pattern"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-slate-400 font-bold px-2">
              Pattern {selectedPattern.number} of 8
            </span>
            <button
              disabled={selectedPattern.id === 8}
              onClick={() => handleSelectPattern(selectedPattern.id + 1)}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white border border-slate-800 transition"
              title="Next Pattern"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Header Hero Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-[#0C1527] via-[#0A1120] to-[#070D19] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-[11px]">
                {selectedPattern.categoryLabel}
              </span>
              <span>•</span>
              <span className="text-amber-400 font-semibold">{selectedPattern.difficulty}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {selectedPattern.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-3xl">
              {selectedPattern.summary}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span><strong>Formula:</strong> {selectedPattern.formula}</span>
            </div>
          </div>
        </div>

        {/* Interactive Live Size Simulator */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-[#070C18] shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Live Pattern Simulator (Change Grid Size n)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyan-300 font-bold">
                Size n = <span className="text-white text-sm">{interactiveN}</span>
              </span>
              <input
                type="range"
                min="2"
                max="8"
                value={interactiveN}
                onChange={(e) => setInteractiveN(Number(e.target.value))}
                className="w-32 accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#050811] border border-slate-800/90 font-mono text-sm sm:text-base text-amber-300 whitespace-pre leading-relaxed shadow-inner overflow-x-auto">
            {selectedPattern.renderPattern(interactiveN)}
          </div>
        </div>

        {/* Step-by-Step Interactive Loop Animator */}
        <NumberPatternVisualStepper pattern={selectedPattern} />

        {/* Full Java Solution Code with IDE-Grade Syntax Highlighting */}
        <div className="space-y-3">
          <UltraModernCodeViewer 
            code={selectedPattern.code} 
            title={selectedPattern.codeTitle} 
            language="java" 
            badge="Java 21 Clean Code"
          />
        </div>

        {/* Detailed Theory & Loop Invariant Notes */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#0B1222] to-[#070B14] shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-white">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span>Step-by-Step Logic Breakdown</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400">Row Driver Loop:</span>
              <p className="text-xs text-slate-300 font-mono">{selectedPattern.rowLogic}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <span className="text-xs font-mono font-bold text-cyan-400">Column Printing Rule:</span>
              <p className="text-xs text-slate-300 font-mono">{selectedPattern.colLogic}</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {selectedPattern.explanationNotes.map((note, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <div className="text-xs font-mono font-bold text-amber-300">
                  {note.heading}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                  {note.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Runnable Java 21 Code Playground Sandbox */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-[#080D1A] space-y-4 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 font-mono uppercase tracking-wide">
              <Terminal className="w-4 h-4" />
              <span>Interactive Java 21 Execution Console:</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Live JVM Server Sandbox
            </span>
          </div>

          <UniversalCodePlayground
            key={`num-pat-${selectedPattern.id}`}
            title={selectedPattern.codeTitle}
            initialCode={selectedPattern.code}
            expectedOutput={selectedPattern.renderPattern(selectedPattern.id === 8 ? 5 : (selectedPattern.id === 3 || selectedPattern.id === 5 ? 4 : 5))}
            scenarioId={`number-pattern-${selectedPattern.id}`}
            defaultHeight="min-h-[380px]"
          />
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN GRID VIEW: ALL 8 NUMBER PATTERNS
  // ==========================================
  return (
    <div className="space-y-8 select-text pb-12">
      {/* Hero Header */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0C1527] via-[#0A1120] to-[#070D19] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80">
              Core Java Curriculum
            </span>
            <span>•</span>
            <span>Control Statements</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Number Pattern Programs (8)
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-3xl">
            Explore 8 classic Java number pattern algorithms. Master row indices, sequential counter accumulators, palindromic pyramids, and snake matrices with live simulators and step-by-step memory tracers.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Patterns (8)' },
              { id: 'triangles', label: 'Triangles' },
              { id: 'counters', label: "Floyd's Counter" },
              { id: 'palindromes', label: 'Palindromes' },
              { id: 'advanced', label: 'Matrix & Strides' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pattern (1-8, name)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>
        </div>
      </div>

      {/* 3-Column Responsive Card Grid matching Screenshots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatterns.map((pat) => (
          <div
            key={pat.id}
            className="rounded-3xl border border-slate-800/90 bg-[#080D1A] overflow-hidden shadow-xl hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/30 transition-all duration-300 flex flex-col group"
          >
            {/* Slate Header with Pattern Number */}
            <div className="px-5 py-3.5 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between select-none">
              <span className="font-mono text-xs font-bold text-slate-300 tracking-wide uppercase">
                Pattern {pat.number}
              </span>
              <span className="text-[11px] font-mono text-cyan-400 font-medium">
                {pat.categoryLabel}
              </span>
            </div>

            {/* Clean White/Light ASCII Preview Box matching screenshots */}
            <div className="p-6 bg-slate-100 dark:bg-[#F8FAFC] flex items-center justify-center min-h-[190px] border-b border-slate-800 select-none">
              <pre className="font-mono text-slate-900 font-bold text-sm sm:text-base leading-relaxed whitespace-pre text-left">
                {pat.preview}
              </pre>
            </div>

            {/* Card Content & Action Button */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#080D1A]">
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                  {pat.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1 line-clamp-2 leading-relaxed">
                  {pat.summary}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleSelectPattern(pat.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition"
                >
                  <span>View Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Interactive Number Pattern Loop & Grid Memory Stepper
 */
function NumberPatternVisualStepper({ pattern }) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Generate discrete stepper frames based on the pattern
  const frames = useMemo(() => {
    const n = 4;
    const fList = [];

    if (pattern.id === 1) { // Row Repeated Number Triangle
      let currentOutput = '';
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
          currentOutput += `${i} `;
          fList.push({
            i, j,
            val: i,
            output: currentOutput.trimEnd(),
            desc: `Row i=${i}, Col j=${j}: print row index (${i})`
          });
        }
        currentOutput += '\n';
      }
    } else if (pattern.id === 2) { // Column Increasing Triangle
      let currentOutput = '';
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
          currentOutput += `${j} `;
          fList.push({
            i, j,
            val: j,
            output: currentOutput.trimEnd(),
            desc: `Row i=${i}, Col j=${j}: print column index (${j})`
          });
        }
        currentOutput += '\n';
      }
    } else if (pattern.id === 3) { // Floyd's Triangle
      let currentOutput = '';
      let count = 1;
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
          currentOutput += `${count} `;
          fList.push({
            i, j,
            val: count,
            output: currentOutput.trimEnd(),
            desc: `Row i=${i}, Col j=${j}: print counter (${count}) and increment to ${count + 1}`
          });
          count++;
        }
        currentOutput += '\n';
      }
    } else if (pattern.id === 4) { // Reverse Number Triangle
      let currentOutput = '';
      for (let i = 1; i <= n; i++) {
        for (let j = i; j >= 1; j--) {
          currentOutput += `${j} `;
          fList.push({
            i, j,
            val: j,
            output: currentOutput.trimEnd(),
            desc: `Row i=${i}, Countdown j=${j}: print (${j})`
          });
        }
        currentOutput += '\n';
      }
    } else if (pattern.id === 5) { // Palindromic Number Triangle
      let currentOutput = '';
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
          currentOutput += `${j} `;
          fList.push({
            i, j,
            val: j,
            output: currentOutput.trimEnd(),
            desc: `Row i=${i}, Ascending j=${j}: print (${j})`
          });
        }
        for (let j = i - 1; j >= 1; j--) {
          currentOutput += `${j} `;
          fList.push({
            i, j,
            val: j,
            output: currentOutput.trimEnd(),
            desc: `Row i=${i}, Descending j=${j}: print (${j})`
          });
        }
        currentOutput += '\n';
      }
    } else if (pattern.id === 6) { // Inverted Reverse Triangle
      let currentOutput = '';
      for (let i = 1; i <= n; i++) {
        for (let j = n; j >= i; j--) {
          currentOutput += `${j} `;
          fList.push({
            i, j,
            val: j,
            output: currentOutput.trimEnd(),
            desc: `Row i=${i}, Countdown j=${j}: print (${j})`
          });
        }
        currentOutput += '\n';
      }
    } else if (pattern.id === 7) { // Column Difference Increment
      let currentOutput = '';
      for (let i = 1; i <= n; i++) {
        let val = i;
        for (let j = 1; j <= i; j++) {
          currentOutput += `${val} `;
          fList.push({
            i, j,
            val: val,
            output: currentOutput.trimEnd(),
            desc: `Row i=${i}, Col j=${j}: print value (${val}), next stride += (${n - j})`
          });
          val += (n - j);
        }
        currentOutput += '\n';
      }
    } else { // Pattern 8: Snake Matrix
      let currentOutput = '';
      const cols = 3;
      for (let i = 1; i <= 4; i++) {
        if (i % 2 !== 0) {
          for (let j = (i - 1) * cols + 1; j <= i * cols; j++) {
            currentOutput += `${j} `;
            fList.push({
              i, j,
              val: j,
              output: currentOutput.trimEnd(),
              desc: `Row i=${i} (Odd): Left-to-Right print (${j})`
            });
          }
        } else {
          for (let j = i * cols; j >= (i - 1) * cols + 1; j--) {
            currentOutput += `${j} `;
            fList.push({
              i, j,
              val: j,
              output: currentOutput.trimEnd(),
              desc: `Row i=${i} (Even): Right-to-Left print (${j})`
            });
          }
        }
        currentOutput += '\n';
      }
    }

    return fList;
  }, [pattern]);

  // Auto-play timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= frames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isPlaying, frames.length]);

  const currentFrame = frames[step] || frames[0] || { i: 1, j: 1, val: 1, output: '1', desc: 'Initialize' };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-[#090F1E] shadow-2xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
          <h3 className="text-base font-bold text-white">Interactive Loop &amp; Grid Animator</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (step >= frames.length - 1) setStep(0);
              setIsPlaying(!isPlaying);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-md shadow-blue-600/30"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isPlaying ? 'Pause' : 'Play Simulation'}</span>
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setStep(0);
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            title="Reset Animator"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid: Left Registers + Right Live ASCII Matrix Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left Registers (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Active Loop Registers:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Row i</span>
                <span className="text-base font-extrabold text-cyan-300">{currentFrame.i}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Col j</span>
                <span className="text-base font-extrabold text-purple-300">{currentFrame.j}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Value</span>
                <span className="text-base font-extrabold text-amber-300">{currentFrame.val}</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 font-mono text-xs text-cyan-200">
            {currentFrame.desc}
          </div>
        </div>

        {/* Right Output Window (7 cols) */}
        <div className="md:col-span-7 p-5 rounded-2xl bg-[#040711] border border-slate-800 min-h-[170px] flex items-center justify-center font-mono text-sm sm:text-base text-amber-300 whitespace-pre leading-relaxed shadow-inner">
          {currentFrame.output}
        </div>
      </div>

      {/* Stepper Progress Control Slider */}
      <div className="flex items-center gap-4 pt-2 border-t border-slate-800/80">
        <button
          disabled={step === 0}
          onClick={() => {
            setIsPlaying(false);
            setStep((p) => Math.max(0, p - 1));
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition"
        >
          Prev Step
        </button>

        <div className="flex-1 flex items-center gap-3">
          <input
            type="range"
            min="0"
            max={frames.length - 1}
            value={step}
            onChange={(e) => {
              setIsPlaying(false);
              setStep(Number(e.target.value));
            }}
            className="flex-1 accent-cyan-400 cursor-pointer"
          />
          <span className="text-xs font-mono text-slate-400 shrink-0">
            {step + 1} / {frames.length}
          </span>
        </div>

        <button
          disabled={step === frames.length - 1}
          onClick={() => {
            setIsPlaying(false);
            setStep((p) => Math.min(frames.length - 1, p + 1));
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
