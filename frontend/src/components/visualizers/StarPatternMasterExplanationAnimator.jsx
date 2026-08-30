import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Zap, 
  Layers, Cpu, Sparkles, Terminal, Code2, CheckCircle2, ArrowRight
} from 'lucide-react';

/**
 * StarPatternMasterExplanationAnimator
 * Interactive 2D Grid Visual Simulator demonstrating the 3 Loop Engines:
 * 1. Row Driver (i)
 * 2. Leading Spaces (j)
 * 3. Star Generator (k)
 */
export default function StarPatternMasterExplanationAnimator() {
  const [selectedDemoPattern, setSelectedDemoPattern] = useState('pyramid'); // 'triangle', 'mirrored', 'pyramid', 'inverted'
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(800); // ms per step

  const n = 4; // Standard 4x7 demo matrix

  // Generate discrete execution steps for the selected pattern
  const executionFrames = useMemo(() => {
    const frames = [];
    
    if (selectedDemoPattern === 'triangle') {
      // Right-Angled Triangle (i=1..n, k=1..i)
      const grid = Array(n).fill(null).map(() => Array(n).fill('empty'));
      
      frames.push({
        line: 1,
        i: 0, j: 0, k: 0,
        desc: "Initialize pattern simulation: size n = 4",
        grid: JSON.parse(JSON.stringify(grid)),
        stage: "init"
      });

      for (let i = 1; i <= n; i++) {
        frames.push({
          line: 2,
          i, j: 0, k: 0,
          desc: `[Row Engine] Outer loop starts row i = ${i}`,
          grid: JSON.parse(JSON.stringify(grid)),
          stage: "row"
        });

        for (let k = 1; k <= i; k++) {
          grid[i - 1][k - 1] = 'star';
          frames.push({
            line: 3,
            i, j: 0, k,
            desc: `[Star Engine] Row ${i}, Col ${k}: Print star '*' (k <= ${i})`,
            grid: JSON.parse(JSON.stringify(grid)),
            stage: "star"
          });
        }

        frames.push({
          line: 4,
          i, j: 0, k: i,
          desc: `[Newline Engine] Row ${i} complete. System.out.println() moves cursor down`,
          grid: JSON.parse(JSON.stringify(grid)),
          stage: "newline"
        });
      }
    } else if (selectedDemoPattern === 'mirrored') {
      // Mirrored Right Triangle (spaces: n-i, stars: i)
      const grid = Array(n).fill(null).map(() => Array(n).fill('empty'));
      
      frames.push({
        line: 1,
        i: 0, j: 0, k: 0,
        desc: "Initialize pattern simulation: size n = 4",
        grid: JSON.parse(JSON.stringify(grid)),
        stage: "init"
      });

      for (let i = 1; i <= n; i++) {
        frames.push({
          line: 2,
          i, j: 0, k: 0,
          desc: `[Row Engine] Outer loop starts row i = ${i}`,
          grid: JSON.parse(JSON.stringify(grid)),
          stage: "row"
        });

        // Spaces
        for (let j = 1; j <= n - i; j++) {
          grid[i - 1][j - 1] = 'space';
          frames.push({
            line: 3,
            i, j, k: 0,
            desc: `[Space Engine] Row ${i}, Col ${j}: Print space ' ' (${n - i} spaces total)`,
            grid: JSON.parse(JSON.stringify(grid)),
            stage: "space"
          });
        }

        // Stars
        for (let k = 1; k <= i; k++) {
          const colIndex = (n - i) + (k - 1);
          grid[i - 1][colIndex] = 'star';
          frames.push({
            line: 4,
            i, j: n - i, k,
            desc: `[Star Engine] Row ${i}, Col ${colIndex + 1}: Print star '*' (k <= ${i})`,
            grid: JSON.parse(JSON.stringify(grid)),
            stage: "star"
          });
        }

        frames.push({
          line: 5,
          i, j: n - i, k: i,
          desc: `[Newline Engine] Row ${i} finished. Line feed to row ${i + 1}`,
          grid: JSON.parse(JSON.stringify(grid)),
          stage: "newline"
        });
      }
    } else if (selectedDemoPattern === 'pyramid') {
      // Full Pyramid (spaces: n-i, stars: 2*i - 1)
      const totalCols = 2 * n - 1; // 7 cols
      const grid = Array(n).fill(null).map(() => Array(totalCols).fill('empty'));
      
      frames.push({
        line: 1,
        i: 0, j: 0, k: 0,
        desc: "Initialize Pyramid simulation: size n = 4, total width = 7 columns",
        grid: JSON.parse(JSON.stringify(grid)),
        stage: "init"
      });

      for (let i = 1; i <= n; i++) {
        frames.push({
          line: 2,
          i, j: 0, k: 0,
          desc: `[Row Engine] Outer loop selects row i = ${i} of ${n}`,
          grid: JSON.parse(JSON.stringify(grid)),
          stage: "row"
        });

        // Leading spaces
        for (let j = 1; j <= n - i; j++) {
          grid[i - 1][j - 1] = 'space';
          frames.push({
            line: 3,
            i, j, k: 0,
            desc: `[Space Engine] Row ${i}: Stamp space at column ${j} (${n - i} spaces for centering)`,
            grid: JSON.parse(JSON.stringify(grid)),
            stage: "space"
          });
        }

        // Odd stars: 2*i - 1
        const starCount = 2 * i - 1;
        for (let k = 1; k <= starCount; k++) {
          const colIndex = (n - i) + (k - 1);
          grid[i - 1][colIndex] = 'star';
          frames.push({
            line: 4,
            i, j: n - i, k,
            desc: `[Star Engine] Row ${i}: Stamp star ${k} of ${starCount} at column ${colIndex + 1}`,
            grid: JSON.parse(JSON.stringify(grid)),
            stage: "star"
          });
        }

        frames.push({
          line: 5,
          i, j: n - i, k: starCount,
          desc: `[Newline Engine] Row ${i} completed. Advance to next row`,
          grid: JSON.parse(JSON.stringify(grid)),
          stage: "newline"
        });
      }
    } else {
      // Inverted Triangle (i = n down to 1)
      const grid = Array(n).fill(null).map(() => Array(n).fill('empty'));
      
      frames.push({
        line: 1,
        i: 0, j: 0, k: 0,
        desc: "Initialize Inverted Triangle: i counts from 4 down to 1",
        grid: JSON.parse(JSON.stringify(grid)),
        stage: "init"
      });

      for (let i = n; i >= 1; i--) {
        const rowIdx = n - i;
        frames.push({
          line: 2,
          i, j: 0, k: 0,
          desc: `[Row Engine] Inverted countdown: row value i = ${i}`,
          grid: JSON.parse(JSON.stringify(grid)),
          stage: "row"
        });

        for (let k = 1; k <= i; k++) {
          grid[rowIdx][k - 1] = 'star';
          frames.push({
            line: 3,
            i, j: 0, k,
            desc: `[Star Engine] Print star ${k} of ${i}`,
            grid: JSON.parse(JSON.stringify(grid)),
            stage: "star"
          });
        }

        frames.push({
          line: 4,
          i, j: 0, k: i,
          desc: `[Newline Engine] Finished row with ${i} stars`,
          grid: JSON.parse(JSON.stringify(grid)),
          stage: "newline"
        });
      }
    }

    return frames;
  }, [selectedDemoPattern]);

  // Handle auto-play timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= executionFrames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, executionFrames.length, playbackSpeed]);

  const currentFrame = executionFrames[stepIndex] || executionFrames[0];

  // Code templates with line mapping
  const codeTemplates = {
    triangle: [
      { num: 1, text: "int n = 4;" },
      { num: 2, text: "for (int i = 1; i <= n; i++) {" },
      { num: 3, text: "    for (int k = 1; k <= i; k++) System.out.print(\"* \");" },
      { num: 4, text: "    System.out.println();" },
      { num: 5, text: "}" }
    ],
    mirrored: [
      { num: 1, text: "int n = 4;" },
      { num: 2, text: "for (int i = 1; i <= n; i++) {" },
      { num: 3, text: "    for (int j = 1; j <= n - i; j++) System.out.print(\"  \");" },
      { num: 4, text: "    for (int k = 1; k <= i; k++) System.out.print(\"* \");" },
      { num: 5, text: "    System.out.println();" },
      { num: 6, text: "}" }
    ],
    pyramid: [
      { num: 1, text: "int n = 4;" },
      { num: 2, text: "for (int i = 1; i <= n; i++) {" },
      { num: 3, text: "    for (int j = 1; j <= n - i; j++) System.out.print(\"  \");" },
      { num: 4, text: "    for (int k = 1; k <= 2 * i - 1; k++) System.out.print(\"* \");" },
      { num: 5, text: "    System.out.println();" },
      { num: 6, text: "}" }
    ],
    inverted: [
      { num: 1, text: "int n = 4;" },
      { num: 2, text: "for (int i = n; i >= 1; i--) {" },
      { num: 3, text: "    for (int k = 1; k <= i; k++) System.out.print(\"* \");" },
      { num: 4, text: "    System.out.println();" },
      { num: 5, text: "}" }
    ]
  };

  const currentCodeLines = codeTemplates[selectedDemoPattern] || codeTemplates.pyramid;

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#0B1426] via-[#080E1C] to-[#050913] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/80 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive 2D Grid Engine Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            How Nested Loops Construct Any Star Pattern
          </h3>
        </div>

        {/* Pattern Demo Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          {[
            { id: 'pyramid', label: 'Full Pyramid' },
            { id: 'mirrored', label: 'Mirrored Triangle' },
            { id: 'triangle', label: 'Right Triangle' },
            { id: 'inverted', label: 'Inverted Triangle' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedDemoPattern(p.id);
                setStepIndex(0);
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedDemoPattern === p.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage: 3 Columns (Code Walkthrough, 2D Grid Canvas, Loop Registers) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        
        {/* Left: Synchronized Java Code Walkthrough (4 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#060A14] border border-slate-800/90 p-4 font-mono text-xs sm:text-[13px] flex flex-col justify-between shadow-inner">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Code2 className="w-3.5 h-3.5" />
                <span>Execution Trace</span>
              </span>
              <span>Java 21</span>
            </div>

            <div className="space-y-1 pt-2">
              {currentCodeLines.map((l) => {
                const isActive = currentFrame.line === l.num;
                return (
                  <div
                    key={l.num}
                    className={`px-2.5 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-2.5 ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-200 font-bold border border-cyan-500/50 shadow-sm shadow-cyan-500/20 scale-[1.01]'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <span className="text-[10px] text-slate-600 select-none w-3 text-right">
                      {l.num}
                    </span>
                    <span className="whitespace-pre">{l.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Narrative Description Box */}
          <div className="mt-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/50 text-xs font-mono text-cyan-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 animate-spin-slow" />
            <span className="leading-relaxed">{currentFrame.desc}</span>
          </div>
        </div>

        {/* Center/Right: 2D Interactive Grid Matrix (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* 2D Matrix Canvas */}
          <div className="rounded-2xl bg-[#040711] border border-slate-800/90 p-5 flex-1 flex flex-col justify-center items-center shadow-inner relative overflow-hidden min-h-[240px]">
            
            {/* Coordinates Grid Header */}
            <div className="w-full flex justify-between items-center text-[10px] font-mono text-slate-500 pb-3 border-b border-slate-800/60 mb-4 select-none">
              <span>2D Matrix Coordinates (Row i, Col j/k)</span>
              <span>Grid: {currentFrame.grid.length} Rows × {currentFrame.grid[0].length} Cols</span>
            </div>

            {/* Matrix Rows & Cells */}
            <div className="space-y-2 select-none">
              {currentFrame.grid.map((row, rIdx) => {
                const isCurrentRow = (selectedDemoPattern === 'inverted' ? (n - currentFrame.i === rIdx) : (currentFrame.i - 1 === rIdx));
                return (
                  <div 
                    key={rIdx} 
                    className={`flex items-center gap-2 px-3 py-1 rounded-xl transition-all duration-300 ${
                      isCurrentRow ? 'bg-cyan-500/10 border border-cyan-500/30 shadow-md' : 'opacity-80'
                    }`}
                  >
                    {/* Row index indicator */}
                    <span className="w-12 text-[11px] font-mono text-slate-500 font-bold">
                      Row {rIdx + 1}:
                    </span>

                    {/* Columns Cells */}
                    <div className="flex items-center gap-1.5">
                      {row.map((cell, cIdx) => (
                        <div
                          key={cIdx}
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-mono font-extrabold text-sm sm:text-base transition-all duration-300 transform ${
                            cell === 'star'
                              ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/40 scale-100 rotate-0 animate-popIn'
                              : cell === 'space'
                              ? 'bg-slate-900/90 border border-cyan-900/60 text-cyan-500/40'
                              : 'bg-slate-950 border border-slate-800/50 text-slate-800'
                          }`}
                        >
                          {cell === 'star' ? '★' : cell === 'space' ? '·' : ''}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="w-full flex items-center justify-center gap-6 text-[11px] font-mono pt-4 mt-4 border-t border-slate-800/60 text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm" />
                <span>Star Engine (*)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-slate-900 border border-cyan-800 text-cyan-400 text-[10px] flex items-center justify-center">·</span>
                <span>Space Engine ( )</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-slate-950 border border-slate-800" />
                <span>Empty Matrix Cell</span>
              </div>
            </div>
          </div>

          {/* Active Loop Registers Bar */}
          <div className="grid grid-cols-3 gap-3 font-mono">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">1. Outer Row (i)</span>
              <span className="text-lg font-extrabold text-cyan-300">{currentFrame.i || '-'}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">2. Leading Spaces (j)</span>
              <span className="text-lg font-extrabold text-emerald-300">{currentFrame.j || 0}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">3. Star Index (k)</span>
              <span className="text-lg font-extrabold text-amber-300">{currentFrame.k || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Playback Controls & Scrubber Slider */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80 relative z-10">
        
        {/* Play/Pause & Step Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (stepIndex >= executionFrames.length - 1) setStepIndex(0);
              setIsPlaying(!isPlaying);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition shadow-lg shadow-cyan-500/30 active:scale-95"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Play Animation'}</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(0);
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition"
            title="Reset to Beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            disabled={stepIndex === 0}
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(p => Math.max(0, p - 1));
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white border border-slate-700 text-xs transition"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            disabled={stepIndex === executionFrames.length - 1}
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(p => Math.min(executionFrames.length - 1, p + 1));
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white border border-slate-700 text-xs transition"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Slider */}
        <div className="flex-1 max-w-md flex items-center gap-3">
          <input
            type="range"
            min="0"
            max={executionFrames.length - 1}
            value={stepIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setStepIndex(Number(e.target.value));
            }}
            className="flex-1 accent-cyan-400 cursor-pointer"
          />
          <span className="text-xs font-mono text-cyan-300 font-bold shrink-0">
            Step {stepIndex + 1} / {executionFrames.length}
          </span>
        </div>

        {/* Speed Control Toggle */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
          <span>Speed:</span>
          {[
            { label: '1x', val: 800 },
            { label: '2x', val: 400 },
            { label: '3x', val: 200 }
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setPlaybackSpeed(s.val)}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                playbackSpeed === s.val
                  ? 'bg-slate-700 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-900 text-slate-500 hover:text-slate-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
