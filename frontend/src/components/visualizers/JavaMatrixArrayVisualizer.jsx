import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Layers, Play, Pause, RotateCcw, ChevronRight, ChevronLeft,
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  Check, Server, Database, Code, Users, HelpCircle, Lock,
  Sliders, RefreshCw, Activity, ArrowDown, AlertTriangle, Cpu,
  Eye, CornerDownRight, Plus, Trash2, Hash, ArrowUpRight, Grid, Calculator
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaMatrixArrayVisualizer
 * Interactive Architecture Theater for Matrix Arrays in Java:
 * 1. Matrix Addition Laboratory (A + B = C) with Live Synchronized Highlight
 * 2. Matrix Multiplication Laboratory (A x B) with Dot Product Animator
 * 3. Matrix Transpose & Diagonals Explorer (Main vs Anti-Diagonal)
 * 4. Complete Code Programs (MainApp1 vs MatrixAddition)
 * 5. Interactive Assessment Quiz
 */
export default function JavaMatrixArrayVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('addition'); // 'addition' | 'multiplication' | 'transpose' | 'programs' | 'quiz'

  // ==========================================
  // 1. MATRIX ADDITION LAB STATE
  // ==========================================
  const matA = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  const matB = [
    [7, 8, 9],
    [10, 11, 12]
  ];
  const matSum = [
    [8, 10, 12],
    [14, 16, 18]
  ];

  const [addPos, setAddPos] = useState({ r: 0, c: 0 });
  const [isAddPlaying, setIsAddPlaying] = useState(false);
  const addTimerRef = useRef(null);

  useEffect(() => {
    if (isAddPlaying) {
      addTimerRef.current = setInterval(() => {
        setAddPos((prev) => {
          let nextC = prev.c + 1;
          let nextR = prev.r;
          if (nextC >= matA[0].length) {
            nextC = 0;
            nextR = prev.r + 1;
          }
          if (nextR >= matA.length) {
            setIsAddPlaying(false);
            clearInterval(addTimerRef.current);
            return prev;
          }
          return { r: nextR, c: nextC };
        });
      }, 900);
    } else {
      clearInterval(addTimerRef.current);
    }
    return () => clearInterval(addTimerRef.current);
  }, [isAddPlaying]);

  // ==========================================
  // 2. MATRIX MULTIPLICATION STATE
  // ==========================================
  const multA = [
    [1, 2],
    [3, 4]
  ];
  const multB = [
    [5, 6],
    [7, 8]
  ];
  const multRes = [
    [19, 22],
    [43, 50]
  ];
  const [multCell, setMultCell] = useState({ r: 0, c: 0 });

  // ==========================================
  // 3. TRANSPOSE STATE
  // ==========================================
  const origMat = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  const transMat = [
    [1, 4],
    [2, 5],
    [3, 6]
  ];
  const [selectedDiagMode, setSelectedDiagMode] = useState('all'); // 'all' | 'primary' | 'secondary'

  // ==========================================
  // 4. QUIZ STATE
  // ==========================================
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the mandatory condition for adding two Matrix Arrays A and B?',
      options: [
        { key: 'A', text: 'Both matrices must be square (N x N)' },
        { key: 'B', text: 'Both matrices must have identical row and column dimensions (R1 = R2 and C1 = C2)' },
        { key: 'C', text: 'Columns of A must equal Rows of B' },
        { key: 'D', text: 'Both matrices must have determinant > 0' }
      ],
      correct: 'B',
      explanation: 'Matrix addition is an element-wise operation (sum[i][j] = A[i][j] + B[i][j]), so both matrices must have the exact same number of rows and columns.'
    },
    {
      id: 'q2',
      question: 'Why do Matrix Arrays store only numeric types (int, double, float) instead of Strings or Objects?',
      options: [
        { key: 'A', text: 'Java syntax prevents String 2D arrays' },
        { key: 'B', text: 'Matrix mathematical operations (+, -, *, determinants) only make mathematical sense on numbers' },
        { key: 'C', text: 'Strings cannot be indexed with two brackets' },
        { key: 'D', text: 'To save JVM bytecode size' }
      ],
      correct: 'B',
      explanation: 'Matrix arrays represent mathematical matrices where algebraic operations (sum, product, transpose, eigenvalues) are only valid on numeric values.'
    },
    {
      id: 'q3',
      question: 'What is the required condition to multiply Matrix A (size R1 x C1) with Matrix B (size R2 x C2)?',
      options: [
        { key: 'A', text: 'R1 == R2' },
        { key: 'B', text: 'C1 == R2' },
        { key: 'C', text: 'C1 == C2' },
        { key: 'D', text: 'R1 == C2' }
      ],
      correct: 'B',
      explanation: 'Matrix multiplication A x B is valid if and only if the number of columns in A equals the number of rows in B (C1 == R2). The resulting matrix size is (R1 x C2).'
    },
    {
      id: 'q4',
      question: 'In a square matrix (N x N), which condition identifies elements on the Primary Diagonal?',
      options: [
        { key: 'A', text: 'i + j == N - 1' },
        { key: 'B', text: 'i == j' },
        { key: 'C', text: 'i > j' },
        { key: 'D', text: 'i < j' }
      ],
      correct: 'B',
      explanation: 'The primary diagonal consists of cells where the row index equals the column index: matrix[0][0], matrix[1][1], ..., matrix[N-1][N-1] (i == j).'
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
                <Calculator className="w-6 h-6 animate-pulse" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Matrix Arrays in Java: Mathematical Operations Theater
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Interactive laboratory for <b>Matrix Addition, Multiplication ($A \times B$), Transpose ($A^T$), and Diagonal Analysis</b>.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {onOpenPlayground && (
              <button
                onClick={() => onOpenPlayground(`public class MatrixAddition {\n    public static void main(String[] args) {\n        // 1. Declare and initialize two 2x3 matrices\n        int[][] matrix1 = {\n            {1, 2, 3},\n            {4, 5, 6}\n        };\n        int[][] matrix2 = {\n            {7, 8, 9},\n            {10, 11, 12}\n        };\n\n        // 2. Result matrix of size 2x3\n        int[][] sum = new int[2][3];\n\n        // 3. Matrix addition\n        for (int i = 0; i < matrix1.length; i++) {\n            for (int j = 0; j < matrix1[i].length; j++) {\n                sum[i][j] = matrix1[i][j] + matrix2[i][j];\n            }\n        }\n\n        // 4. Print result\n        System.out.println("Result of Matrix Addition:");\n        for (int[] row : sum) {\n            for (int val : row) System.out.print(val + " ");\n            System.out.println();\n        }\n    }\n}`)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/30 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Run MatrixAddition in Playground</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative z-10 flex flex-wrap gap-2 pt-6">
          {[
            { id: 'addition', label: '1. Matrix Addition (A + B)', icon: Plus, badge: 'Live Lab' },
            { id: 'multiplication', label: '2. Multiplication (A × B)', icon: Calculator, badge: 'Dot Product' },
            { id: 'transpose', label: '3. Transpose & Diagonals', icon: Grid, badge: 'Grid Flip' },
            { id: 'programs', label: '4. Code Walkthrough', icon: Code2, badge: 'Programs 1 & 2' },
            { id: 'quiz', label: '5. Matrix Mastery Quiz', icon: HelpCircle, badge: '4 Questions' }
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
      {/* TAB 1: MATRIX ADDITION LABORATORY */}
      {/* ========================================================================= */}
      {activeTab === 'addition' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-cyan-400" />
                  <span>Matrix Addition Simulator: matrix1 + matrix2 = sum</span>
                </h3>
                <p className="text-xs text-slate-400">Element-wise addition: sum[i][j] = matrix1[i][j] + matrix2[i][j].</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAddPos({ r: 0, c: 0 });
                    setIsAddPlaying(true);
                  }}
                  disabled={isAddPlaying}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isAddPlaying ? 'Adding Cells...' : 'Animate Addition'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsAddPlaying(false);
                    setAddPos({ r: 0, c: 0 });
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Current Calculation Step Note */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono">Active Cell [{addPos.r}][{addPos.c}]:</span>
                <span className="font-mono font-bold text-cyan-300">
                  {matA[addPos.r][addPos.c]} + {matB[addPos.r][addPos.c]} = {matSum[addPos.r][addPos.c]}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-amber-300">
                sum[{addPos.r}][{addPos.c}] = matrix1[{addPos.r}][{addPos.c}] + matrix2[{addPos.r}][{addPos.c}]
              </div>
            </div>

            {/* Visual 3-Matrix Arithmetic Equation Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-11 gap-3 items-center">
              {/* Matrix 1 */}
              <div className="lg:col-span-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-cyan-400 text-center font-mono">matrix1 (2x3)</div>
                <div className="grid grid-cols-3 gap-2 font-mono">
                  {matA.map((row, r) =>
                    row.map((val, c) => {
                      const isActive = addPos.r === r && addPos.c === c;
                      return (
                        <button
                          key={`${r}-${c}`}
                          onClick={() => setAddPos({ r, c })}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isActive
                              ? 'bg-cyan-950 border-cyan-400 ring-2 ring-cyan-500 shadow-lg scale-105'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-[9px] text-cyan-400 font-bold">[{r}][{c}]</div>
                          <div className="text-base font-black text-white">{val}</div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Plus Sign */}
              <div className="lg:col-span-1 flex justify-center text-cyan-400 font-black text-2xl">
                +
              </div>

              {/* Matrix 2 */}
              <div className="lg:col-span-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-cyan-400 text-center font-mono">matrix2 (2x3)</div>
                <div className="grid grid-cols-3 gap-2 font-mono">
                  {matB.map((row, r) =>
                    row.map((val, c) => {
                      const isActive = addPos.r === r && addPos.c === c;
                      return (
                        <button
                          key={`${r}-${c}`}
                          onClick={() => setAddPos({ r, c })}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isActive
                              ? 'bg-blue-950 border-blue-400 ring-2 ring-blue-500 shadow-lg scale-105'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-[9px] text-blue-400 font-bold">[{r}][{c}]</div>
                          <div className="text-base font-black text-white">{val}</div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Equals Sign */}
              <div className="lg:col-span-1 flex justify-center text-emerald-400 font-black text-2xl">
                =
              </div>

              {/* Result Sum Matrix */}
              <div className="lg:col-span-3 p-4 rounded-2xl bg-slate-950 border border-emerald-900/50 space-y-3">
                <div className="text-xs font-bold text-emerald-400 text-center font-mono">sum Matrix (2x3)</div>
                <div className="grid grid-cols-3 gap-2 font-mono">
                  {matSum.map((row, r) =>
                    row.map((val, c) => {
                      const isActive = addPos.r === r && addPos.c === c;
                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isActive
                              ? 'bg-emerald-950 border-emerald-400 ring-2 ring-emerald-500 shadow-lg scale-105'
                              : 'bg-slate-900 border-slate-800'
                          }`}
                        >
                          <div className="text-[9px] text-emerald-400 font-bold">[{r}][{c}]</div>
                          <div className="text-base font-black text-emerald-300">{val}</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MATRIX MULTIPLICATION LABORATORY */}
      {/* ========================================================================= */}
      {activeTab === 'multiplication' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  <span>Matrix Multiplication: Dot Product of Row A × Col B</span>
                </h3>
                <p className="text-xs text-slate-400">Click any cell in the result matrix to see its row-column dot product breakdown.</p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
                (2x2) × (2x2) ➔ (2x2)
              </span>
            </div>

            {/* Formula Breakdown Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-900/40 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-400">Formula for Cell [{multCell.r}][{multCell.c}]:</span>
                <span className="font-mono text-amber-300 font-bold text-sm">
                  Result = {multRes[multCell.r][multCell.c]}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-slate-300">
                result[{multCell.r}][{multCell.c}] = ({multA[multCell.r][0]} × {multB[0][multCell.c]}) + ({multA[multCell.r][1]} × {multB[1][multCell.c]}) = {multA[multCell.r][0] * multB[0][multCell.c]} + {multA[multCell.r][1] * multB[1][multCell.c]} = {multRes[multCell.r][multCell.c]}
              </div>
            </div>

            {/* 3 Matrix Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-11 gap-3 items-center">
              {/* Matrix A */}
              <div className="lg:col-span-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-cyan-400 text-center font-mono">Matrix A (Row {multCell.r} active)</div>
                <div className="grid grid-cols-2 gap-2 font-mono">
                  {multA.map((row, r) =>
                    row.map((val, c) => {
                      const isRowActive = multCell.r === r;
                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isRowActive
                              ? 'bg-cyan-950 border-cyan-400 ring-2 ring-cyan-500 shadow-lg'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          <div className="text-[9px] text-cyan-400 font-bold">[{r}][{c}]</div>
                          <div className="text-lg font-black text-white">{val}</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Multiply Sign */}
              <div className="lg:col-span-1 flex justify-center text-cyan-400 font-black text-2xl">
                ×
              </div>

              {/* Matrix B */}
              <div className="lg:col-span-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-blue-400 text-center font-mono">Matrix B (Col {multCell.c} active)</div>
                <div className="grid grid-cols-2 gap-2 font-mono">
                  {multB.map((row, r) =>
                    row.map((val, c) => {
                      const isColActive = multCell.c === c;
                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isColActive
                              ? 'bg-blue-950 border-blue-400 ring-2 ring-blue-500 shadow-lg'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          <div className="text-[9px] text-blue-400 font-bold">[{r}][{c}]</div>
                          <div className="text-lg font-black text-white">{val}</div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Equals Sign */}
              <div className="lg:col-span-1 flex justify-center text-emerald-400 font-black text-2xl">
                =
              </div>

              {/* Result Matrix */}
              <div className="lg:col-span-3 p-4 rounded-2xl bg-slate-950 border border-emerald-900/50 space-y-3">
                <div className="text-xs font-bold text-emerald-400 text-center font-mono">Result C (Click cell)</div>
                <div className="grid grid-cols-2 gap-2 font-mono">
                  {multRes.map((row, r) =>
                    row.map((val, c) => {
                      const isSelected = multCell.r === r && multCell.c === c;
                      return (
                        <button
                          key={`${r}-${c}`}
                          onClick={() => setMultCell({ r, c })}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isSelected
                              ? 'bg-emerald-950 border-emerald-400 ring-2 ring-emerald-500 shadow-lg scale-105'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="text-[9px] text-emerald-400 font-bold">[{r}][{c}]</div>
                          <div className="text-lg font-black text-emerald-300">{val}</div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TRANSPOSE & DIAGONALS EXPLORER */}
      {/* ========================================================================= */}
      {activeTab === 'transpose' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Matrix Transpose */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Grid className="w-5 h-5 text-cyan-400" />
                  <span>Matrix Transpose: (2x3) ➔ (3x2)</span>
                </h4>
              </div>

              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                  <div className="text-slate-400">Original Matrix A (2 rows, 3 cols):</div>
                  <div className="grid grid-cols-3 gap-2">
                    {origMat.map((row, r) =>
                      row.map((val, c) => (
                        <div key={`${r}-${c}`} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-bold text-cyan-300">
                          {val}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="p-2 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800 text-xs font-mono">
                    transposed[j][i] = matrix[i][j]
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                  <div className="text-emerald-400 font-bold">Transposed Matrix A^T (3 rows, 2 cols):</div>
                  <div className="grid grid-cols-2 gap-2">
                    {transMat.map((row, r) =>
                      row.map((val, c) => (
                        <div key={`${r}-${c}`} className="p-2.5 rounded-lg bg-slate-900 border border-emerald-500/40 text-center font-bold text-emerald-300">
                          {val}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Primary & Secondary Diagonals (3x3) */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <span>Square Matrix Diagonals (3x3)</span>
                </h4>

                <div className="flex gap-1">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'primary', label: 'Primary (i==j)' },
                    { id: 'secondary', label: 'Secondary (i+j==N-1)' }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setSelectedDiagMode(btn.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        selectedDiagMode === btn.id
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3x3 Grid with Highlighted Diagonals */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="grid grid-cols-3 gap-2.5 font-mono text-center">
                  {[
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                  ].map((row, r) =>
                    row.map((val, c) => {
                      const isPrimary = r === c;
                      const isSecondary = r + c === 2;
                      const isCenter = r === 1 && c === 1;

                      let style = 'bg-slate-900 border-slate-800 text-slate-400';
                      if (selectedDiagMode === 'primary' && isPrimary) {
                        style = 'bg-cyan-950 border-cyan-400 text-cyan-300 font-bold scale-105 shadow-md';
                      } else if (selectedDiagMode === 'secondary' && isSecondary) {
                        style = 'bg-amber-950 border-amber-400 text-amber-300 font-bold scale-105 shadow-md';
                      } else if (selectedDiagMode === 'all') {
                        if (isCenter) {
                          style = 'bg-purple-950 border-purple-400 text-purple-200 font-bold';
                        } else if (isPrimary) {
                          style = 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold';
                        } else if (isSecondary) {
                          style = 'bg-amber-950 border-amber-500 text-amber-300 font-bold';
                        }
                      }

                      return (
                        <div key={`${r}-${c}`} className={`p-4 rounded-xl border transition-all ${style}`}>
                          <div className="text-[9px] font-bold text-slate-500">[{r}][{c}]</div>
                          <div className="text-xl font-black">{val}</div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="flex items-center justify-around pt-2 text-[11px] font-mono text-slate-300">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                    <span>Primary (1, 5, 9)</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>Secondary (3, 5, 7)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PROGRAMS 1 & 2 CODE WALKTHROUGH */}
      {/* ========================================================================= */}
      {activeTab === 'programs' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Program 1 */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-950 border border-blue-700 text-blue-400 font-mono text-xs">P1</span>
                  <span>Program 1: Basic Matrix Display (MainApp1)</span>
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed overflow-x-auto">
                <div><span className="text-cyan-400">public class</span> <span className="text-amber-300">MainApp1</span> {'{'}</div>
                <div className="pl-3"><span className="text-cyan-400">public static void</span> main(String[] args) {'{'}</div>
                <div className="pl-6 text-slate-500">// 1. Shorthand matrix literal</div>
                <div className="pl-6 text-cyan-300">int[][] numbers = {'{'} {'{10, 20, 30}'}, {'{40, 50, 60}'} {'}'};</div>
                <div className="pl-6 text-slate-500 pt-1">// 2. Nested for-each display</div>
                <div className="pl-6 text-emerald-300">for (int[] row : numbers) {'{'}</div>
                <div className="pl-9 text-emerald-300">for (int num : row) System.out.print(num + " ");</div>
                <div className="pl-9 text-slate-400">System.out.println();</div>
                <div className="pl-6 text-emerald-300">{'}'}</div>
                <div className="pl-3">{'}'}</div>
                <div>{'}'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-900/50 text-xs text-blue-200">
                <b>Summary:</b> Demonstrates compact matrix declaration and clean nested for-each row-by-row traversal.
              </div>
            </div>

            {/* Program 2 */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-400 font-mono text-xs">P2</span>
                  <span>Program 2: Matrix Addition (MatrixAddition)</span>
                </h4>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed overflow-x-auto">
                <div><span className="text-cyan-400">public class</span> <span className="text-amber-300">MatrixAddition</span> {'{'}</div>
                <div className="pl-3"><span className="text-cyan-400">public static void</span> main(String[] args) {'{'}</div>
                <div className="pl-6 text-cyan-300">int[][] matrix1 = {'{'} {'{1, 2, 3}'}, {'{4, 5, 6}'} {'}'};</div>
                <div className="pl-6 text-cyan-300">int[][] matrix2 = {'{'} {'{7, 8, 9}'}, {'{10, 11, 12}'} {'}'};</div>
                <div className="pl-6 text-emerald-300">int[][] sum = new int[2][3];</div>
                <div className="pl-6 text-slate-500 pt-1">// Nested addition loop:</div>
                <div className="pl-6 text-amber-300">for (int i = 0; i &lt; matrix1.length; i++) {'{'}</div>
                <div className="pl-9 text-amber-300">for (int j = 0; j &lt; matrix1[i].length; j++) {'{'}</div>
                <div className="pl-12 text-slate-200">sum[i][j] = matrix1[i][j] + matrix2[i][j];</div>
                <div className="pl-9 text-amber-300">{'}'}</div>
                <div className="pl-6 text-amber-300">{'}'}</div>
                <div className="pl-3">{'}'}</div>
                <div>{'}'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-900/50 text-xs text-emerald-200">
                <b>Summary:</b> Iterates row-by-row and column-by-column to perform element-wise addition into the pre-allocated result matrix.
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
                <h3 className="text-base font-bold text-white">Matrix Array Mastery Assessment</h3>
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
