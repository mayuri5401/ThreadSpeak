import React, { useState } from 'react';
import { 
  Play, RotateCcw, ArrowRight, ArrowLeft, 
  Sparkles, Waves, CheckCircle2 
} from 'lucide-react';

export default function TwoPointersVisualizer() {
  const height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Pre-calculate simulation step frames
  const calculateSteps = () => {
    const frames = [];
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, totalWater = 0;
    const trapped = new Array(height.length).fill(0);

    frames.push({
      left, right, leftMax, rightMax, totalWater,
      trapped: [...trapped],
      msg: 'Initial state: Pointers at index 0 and index ' + right
    });

    while (left < right) {
      if (height[left] <= height[right]) {
        if (height[left] >= leftMax) {
          leftMax = height[left];
          frames.push({
            left, right, leftMax, rightMax, totalWater,
            trapped: [...trapped],
            msg: `height[${left}] (${height[left]}) >= leftMax -> Updated leftMax = ${leftMax}`
          });
        } else {
          const w = leftMax - height[left];
          trapped[left] = w;
          totalWater += w;
          frames.push({
            left, right, leftMax, rightMax, totalWater,
            trapped: [...trapped],
            msg: `Trapped ${w} water unit(s) at index ${left} (leftMax ${leftMax} - height ${height[left]})`
          });
        }
        left++;
      } else {
        if (height[right] >= rightMax) {
          rightMax = height[right];
          frames.push({
            left, right, leftMax, rightMax, totalWater,
            trapped: [...trapped],
            msg: `height[${right}] (${height[right]}) >= rightMax -> Updated rightMax = ${rightMax}`
          });
        } else {
          const w = rightMax - height[right];
          trapped[right] = w;
          totalWater += w;
          frames.push({
            left, right, leftMax, rightMax, totalWater,
            trapped: [...trapped],
            msg: `Trapped ${w} water unit(s) at index ${right} (rightMax ${rightMax} - height ${height[right]})`
          });
        }
        right--;
      }
    }

    frames.push({
      left, right, leftMax, rightMax, totalWater,
      trapped: [...trapped],
      msg: `Finished! Total trapped water = ${totalWater} units.`
    });

    return frames;
  };

  const frames = calculateSteps();
  const current = frames[stepIdx] || frames[0];

  const handleNext = () => {
    if (stepIdx < frames.length - 1) setStepIdx(s => s + 1);
  };

  const handlePrev = () => {
    if (stepIdx > 0) setStepIdx(s => s - 1);
  };

  const reset = () => {
    setStepIdx(0);
    setIsPlaying(false);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-800">
              <Waves className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">
              Interactive Trapping Rain Water Simulator (Two Pointers O(N))
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
              O(1) Space
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Step through the two pointers algorithm to visualize how water is trapped dynamically between elevation bars.
          </p>
        </div>

        {/* Step Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={stepIdx === 0}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold disabled:opacity-40"
          >
            <ArrowLeft className="w-3.5 h-3.5 inline mr-1" /> Prev
          </button>
          <button
            onClick={handleNext}
            disabled={stepIdx === frames.length - 1}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 text-xs font-bold shadow-lg shadow-blue-500/20 disabled:opacity-40"
          >
            Next Step <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
          </button>
          <button
            onClick={reset}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Trapped Water Elevation Chart with Pointer Markers */}
      <div className="p-6 rounded-2xl bg-black border border-slate-800 space-y-4">
        {/* Pointers Row */}
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-amber-400 font-bold">Left Pointer: [{current.left}]</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400">leftMax: {current.leftMax}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-purple-400 font-bold">Right Pointer: [{current.right}]</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400">rightMax: {current.rightMax}</span>
          </div>
        </div>

        {/* Bar Visualizer */}
        <div className="flex items-end justify-center gap-1.5 sm:gap-2 h-44 pt-4 border-b border-slate-800">
          {height.map((h, idx) => {
            const isLeft = idx === current.left;
            const isRight = idx === current.right;
            const water = current.trapped[idx] || 0;
            const barHeightPct = (h / 3) * 100;
            const waterHeightPct = (water / 3) * 100;

            return (
              <div key={idx} className="flex flex-col items-center gap-1 flex-1 max-w-[40px] h-full justify-end relative">
                {/* Pointer Labels */}
                {isLeft && (
                  <div className="absolute -top-7 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 animate-bounce">
                    L
                  </div>
                )}
                {isRight && (
                  <div className="absolute -top-7 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-500 text-white animate-bounce">
                    R
                  </div>
                )}

                {/* Trapped Water Column */}
                {water > 0 && (
                  <div 
                    className="w-full bg-cyan-500/60 border border-cyan-400/80 rounded-t-sm animate-pulse transition-all duration-300"
                    style={{ height: `${waterHeightPct}%` }}
                    title={`Trapped Water: ${water}`}
                  />
                )}

                {/* Black/Gray Solid Elevation Block */}
                {h > 0 ? (
                  <div 
                    className={`w-full rounded-t-sm transition-all duration-200 ${
                      isLeft
                        ? 'bg-amber-500 border border-amber-300'
                        : isRight
                        ? 'bg-purple-600 border border-purple-400'
                        : 'bg-slate-600 border border-slate-500'
                    }`}
                    style={{ height: `${barHeightPct}%` }}
                  />
                ) : (
                  <div className="w-full h-1 bg-slate-800" />
                )}

                {/* Index & Height Label */}
                <div className="text-[9px] font-mono text-slate-500 mt-1">
                  {h}
                </div>
              </div>
            );
          })}
        </div>

        {/* State Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          <div className="font-mono text-slate-300 flex items-center gap-2">
            <span className="text-cyan-400 font-bold">Step {stepIdx + 1}/{frames.length}:</span>
            <span>{current.msg}</span>
          </div>
          <div className="font-mono text-xs px-3 py-1 rounded-xl bg-blue-950 text-blue-300 border border-blue-800 font-bold">
            Total Water: {current.totalWater} Units
          </div>
        </div>
      </div>
    </div>
  );
}
