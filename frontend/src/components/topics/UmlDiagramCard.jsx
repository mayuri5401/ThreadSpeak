import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Edit3, Maximize2, RotateCcw, 
  ChevronLeft, ChevronRight, Play, Pause, ArrowRight, ArrowDown 
} from 'lucide-react';

// 1. Adapter Pattern UML Card
export function AdapterPatternUmlCard() {
  return (
    <div className="rounded-3xl border border-slate-800/90 bg-[#080D1A] overflow-hidden shadow-2xl space-y-0 my-6">
      {/* Top Diagram Toolbar */}
      <div className="px-5 py-3 bg-[#0B1222] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span className="text-xs font-bold text-slate-200 font-mono">UML: Adapter Pattern</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <Sparkles className="w-4 h-4 text-purple-400 hover:text-purple-300 cursor-pointer" />
          <Edit3 className="w-4 h-4 hover:text-slate-200 cursor-pointer" />
          <Maximize2 className="w-4 h-4 hover:text-slate-200 cursor-pointer" />
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="p-6 sm:p-8 bg-[#050811] flex flex-col md:flex-row items-center justify-center gap-5 overflow-x-auto">
        {/* Client Box */}
        <div className="w-40 rounded-xl border border-sky-500/40 bg-sky-950/40 p-4 shadow-lg text-center space-y-1">
          <div className="px-3 py-1.5 rounded-lg bg-[#00A3FF] text-slate-950 font-extrabold text-xs">
            Client
          </div>
          <p className="text-[11px] font-mono text-slate-400 pt-1">calls request()</p>
        </div>

        {/* Arrow to Target */}
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-[10px] font-mono text-cyan-400 font-semibold mb-0.5">request()</span>
          <div className="hidden md:flex items-center">
            <div className="w-10 h-[2px] border-t-2 border-dashed border-cyan-500/80"></div>
            <span className="text-cyan-400 font-bold -ml-1">▸</span>
          </div>
          <ArrowDown className="w-5 h-5 text-cyan-400 md:hidden" />
        </div>

        {/* Target Interface Box */}
        <div className="w-56 rounded-xl border border-amber-500/50 bg-[#090E1D] shadow-xl overflow-hidden">
          <div className="bg-[#FFD026] px-3 py-2 text-center text-slate-950 font-extrabold text-xs">
            <span className="block text-[10px] font-normal tracking-wide opacity-80">&lt;&lt;interface&gt;&gt;</span>
            Target
          </div>
          <div className="p-3 font-mono text-xs text-slate-200 border-t border-slate-800">
            <span className="text-emerald-400 font-bold">+</span> request()
          </div>
        </div>

        {/* Arrow to Adapter */}
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-[10px] font-mono text-emerald-400 font-semibold mb-0.5">implements</span>
          <div className="hidden md:flex items-center">
            <div className="w-10 h-[2px] border-t-2 border-dashed border-emerald-500/80"></div>
            <span className="text-emerald-400 font-bold -ml-1">▸</span>
          </div>
          <ArrowDown className="w-5 h-5 text-emerald-400 md:hidden" />
        </div>

        {/* Adapter Class Box */}
        <div className="w-60 rounded-xl border border-emerald-500/50 bg-[#090E1D] shadow-xl overflow-hidden">
          <div className="bg-[#00E599] px-3 py-2 text-center text-slate-950 font-extrabold text-xs">
            Adapter
          </div>
          <div className="p-3 font-mono text-xs space-y-1.5 border-t border-slate-800">
            <div className="text-slate-300"><span className="text-rose-400 font-bold">-</span> adaptee: Adaptee</div>
            <div className="border-t border-slate-800 pt-1 text-slate-300">
              <span className="text-emerald-400 font-bold">+</span> request()
            </div>
          </div>
        </div>

        {/* Arrow to Adaptee */}
        <div className="flex flex-col items-center text-slate-400">
          <span className="text-[10px] font-mono text-orange-400 font-semibold mb-0.5">adaptee</span>
          <div className="hidden md:flex items-center">
            <div className="w-8 h-[2px] bg-orange-500/80"></div>
            <span className="text-orange-400 font-bold -ml-1">▸</span>
          </div>
          <ArrowDown className="w-5 h-5 text-orange-400 md:hidden" />
        </div>

        {/* Adaptee Box */}
        <div className="w-56 rounded-xl border border-orange-500/50 bg-[#090E1D] shadow-xl overflow-hidden">
          <div className="bg-[#FF8A00] px-3 py-2 text-center text-white font-extrabold text-xs">
            Adaptee
          </div>
          <div className="p-3 font-mono text-xs text-slate-200 border-t border-slate-800">
            <span className="text-emerald-400 font-bold">+</span> specificRequest()
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Class Diagrams: Media Player Architecture
export function MediaPlayerUmlCard() {
  return (
    <div className="space-y-3 my-6">
      <div className="space-y-1">
        <h4 className="text-base font-bold text-white tracking-wide">Class Diagrams</h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          Class diagrams help you understand the static structure of a system.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800/90 bg-[#080D1A] overflow-hidden shadow-2xl space-y-0">
        {/* Top Diagram Toolbar */}
        <div className="px-5 py-3 bg-[#0B1222] border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            Static Class Structure: MediaPlayer
          </span>
          <div className="flex items-center gap-3 text-slate-400">
            <Sparkles className="w-4 h-4 text-purple-400 hover:text-purple-300 cursor-pointer" />
            <Edit3 className="w-4 h-4 hover:text-slate-200 cursor-pointer" />
            <Maximize2 className="w-4 h-4 hover:text-slate-200 cursor-pointer" />
          </div>
        </div>

        {/* SVG & Diagram Body Canvas */}
        <div className="p-6 sm:p-8 bg-[#050811] space-y-8 overflow-x-auto">
          {/* Top Row: PlayerController and MediaPlayer */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* PlayerController Box */}
            <div className="w-80 rounded-2xl border border-sky-500/50 bg-[#090E1D] shadow-xl overflow-hidden">
              <div className="bg-[#00A3FF] px-4 py-2.5 text-center text-slate-950 font-extrabold text-xs tracking-wide">
                PlayerController
              </div>
              <div className="p-3.5 font-mono text-xs space-y-1.5 border-t border-slate-800/80 bg-[#060A14]">
                <div className="text-slate-300"><span className="text-rose-400 font-bold">-</span> player: MediaPlayer</div>
                <div className="border-t border-slate-800/80 pt-1.5 space-y-1 text-slate-300">
                  <div><span className="text-emerald-400 font-bold">+</span> PlayerController(player: MediaPlayer)</div>
                  <div><span className="text-emerald-400 font-bold">+</span> startPlayback()</div>
                  <div><span className="text-emerald-400 font-bold">+</span> pausePlayback()</div>
                  <div><span className="text-emerald-400 font-bold">+</span> stopPlayback()</div>
                </div>
              </div>
            </div>

            {/* uses connector */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                uses
              </span>
              <div className="hidden md:flex items-center">
                <div className="w-12 h-[2px] bg-slate-400"></div>
                <span className="text-slate-400 font-bold -ml-1">▸</span>
              </div>
              <ArrowDown className="w-5 h-5 text-slate-400 md:hidden" />
            </div>

            {/* Abstract MediaPlayer Box */}
            <div className="w-80 rounded-2xl border border-emerald-500/60 bg-[#090E1D] shadow-xl overflow-hidden ring-1 ring-emerald-500/20">
              <div className="bg-[#00E599] px-4 py-2.5 text-center text-slate-950 font-extrabold text-xs tracking-wide">
                <span className="block text-[10px] font-normal tracking-wider opacity-90">&lt;&lt;abstract&gt;&gt;</span>
                MediaPlayer
              </div>
              <div className="p-3.5 font-mono text-xs space-y-1.5 border-t border-slate-800/80 bg-[#060A14]">
                <div className="text-amber-300"><span className="text-amber-400 font-bold">#</span> playerName: String</div>
                <div className="border-t border-slate-800/80 pt-1.5 space-y-1 text-slate-300">
                  <div><span className="text-emerald-400 font-bold">+</span> play()</div>
                  <div><span className="text-emerald-400 font-bold">+</span> pause()</div>
                  <div><span className="text-emerald-400 font-bold">+</span> stop()</div>
                  <div><span className="text-emerald-400 font-bold">+</span> displayStatus()</div>
                  <div><span className="text-emerald-400 font-bold">+</span> logAction(action: String)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Subclasses Connection Hierarchy */}
          <div className="relative pt-2">
            {/* Center Inheritance Triangle */}
            <div className="flex justify-center -mb-2">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[14px] border-b-slate-400"></div>
            </div>

            {/* Subclasses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3">
              {/* AudioPlayer */}
              <div className="rounded-2xl border border-emerald-500/40 bg-[#090E1D] shadow-lg overflow-hidden">
                <div className="bg-[#00E599] px-3 py-2 text-center text-slate-950 font-bold text-xs">
                  AudioPlayer
                </div>
                <div className="p-3 font-mono text-xs space-y-1 border-t border-slate-800 bg-[#060A14]">
                  <div className="text-slate-300"><span className="text-rose-400 font-bold">-</span> audioFile: String</div>
                  <div className="border-t border-slate-800 pt-1 space-y-0.5 text-slate-300">
                    <div><span className="text-emerald-400 font-bold">+</span> play()</div>
                    <div><span className="text-emerald-400 font-bold">+</span> pause()</div>
                    <div><span className="text-emerald-400 font-bold">+</span> stop()</div>
                  </div>
                </div>
              </div>

              {/* VideoPlayer */}
              <div className="rounded-2xl border border-emerald-500/40 bg-[#090E1D] shadow-lg overflow-hidden">
                <div className="bg-[#00E599] px-3 py-2 text-center text-slate-950 font-bold text-xs">
                  VideoPlayer
                </div>
                <div className="p-3 font-mono text-xs space-y-1 border-t border-slate-800 bg-[#060A14]">
                  <div className="text-slate-300"><span className="text-rose-400 font-bold">-</span> videoFile: String</div>
                  <div className="text-slate-300"><span className="text-rose-400 font-bold">-</span> resolution: String</div>
                  <div className="border-t border-slate-800 pt-1 space-y-0.5 text-slate-300">
                    <div><span className="text-emerald-400 font-bold">+</span> play()</div>
                    <div><span className="text-emerald-400 font-bold">+</span> pause()</div>
                    <div><span className="text-emerald-400 font-bold">+</span> stop()</div>
                  </div>
                </div>
              </div>

              {/* StreamingPlayer */}
              <div className="rounded-2xl border border-emerald-500/40 bg-[#090E1D] shadow-lg overflow-hidden">
                <div className="bg-[#00E599] px-3 py-2 text-center text-slate-950 font-bold text-xs">
                  StreamingPlayer
                </div>
                <div className="p-3 font-mono text-xs space-y-1 border-t border-slate-800 bg-[#060A14]">
                  <div className="text-slate-300"><span className="text-rose-400 font-bold">-</span> streamUrl: String</div>
                  <div className="text-slate-300"><span className="text-rose-400 font-bold">-</span> bufferSize: int</div>
                  <div className="border-t border-slate-800 pt-1 space-y-0.5 text-slate-300">
                    <div><span className="text-emerald-400 font-bold">+</span> play()</div>
                    <div><span className="text-emerald-400 font-bold">+</span> pause()</div>
                    <div><span className="text-emerald-400 font-bold">+</span> stop()</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed pt-1">
        The diagrams evolve alongside the explanation, so you can understand why each class exists, what responsibility it owns, and how it relates to the rest of the system.
      </p>
    </div>
  );
}

// 3. Animated Sequence Diagrams: Singleton Runtime Simulator
export function SingletonSequenceDiagramCard() {
  const [currentStep, setCurrentStep] = useState(8);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalSteps = 8;

  // Auto-play timer
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= totalSteps) return 1;
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(1);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStep(prev => Math.min(totalSteps, prev + 1));
  };

  return (
    <div className="space-y-3 my-6">
      <div className="space-y-1">
        <h4 className="text-base font-bold text-white tracking-wide">Animated Sequence Diagrams</h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          Class diagrams show how a system is structured. Sequence diagrams show how it behaves at runtime.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800/90 bg-[#080D1A] overflow-hidden shadow-2xl space-y-0">
        {/* Top Diagram Toolbar */}
        <div className="px-5 py-3 bg-[#0B1222] border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Runtime Sequence: Singleton Pattern
          </span>
          <div className="flex items-center gap-3 text-slate-400">
            <Sparkles className="w-4 h-4 text-purple-400 hover:text-purple-300 cursor-pointer" />
            <Edit3 className="w-4 h-4 hover:text-slate-200 cursor-pointer" />
            <Maximize2 className="w-4 h-4 hover:text-slate-200 cursor-pointer" />
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="p-6 sm:p-10 bg-[#050811] relative select-none">
          {/* Top Participants */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center font-mono font-bold text-xs">
            <div className="px-4 py-2.5 rounded-xl bg-[#00E599] text-slate-950 shadow-md">
              Client 1
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-[#00E599] text-slate-950 shadow-md">
              Client 2
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-[#00E599] text-slate-950 shadow-md">
              Singleton
            </div>
          </div>

          {/* Lifelines and Messages Container */}
          <div className="max-w-2xl mx-auto relative my-6 min-h-[320px]">
            {/* 3 Dashed Vertical Lifelines */}
            <div className="absolute inset-0 grid grid-cols-3 pointer-events-none">
              <div className="flex justify-center">
                <div className="w-[2px] h-full border-l-2 border-dashed border-slate-700"></div>
              </div>
              <div className="flex justify-center">
                <div className="w-[2px] h-full border-l-2 border-dashed border-slate-700"></div>
              </div>
              <div className="flex justify-center">
                <div className="w-[2px] h-full border-l-2 border-dashed border-slate-700"></div>
              </div>
            </div>

            {/* Sequence Steps Overlay */}
            <div className="space-y-6 pt-4 relative z-10 font-mono text-xs">
              
              {/* Step 1 & 2: Client 1 calls getInstance() */}
              {currentStep >= 2 && (
                <div className="relative flex items-center justify-between px-6 animate-in fade-in slide-in-from-left duration-300">
                  <span className="text-[11px] font-semibold text-slate-200 bg-[#050811] px-2 py-0.5 rounded border border-slate-800 z-10">
                    getInstance()
                  </span>
                  <div className="absolute left-[16.66%] right-[16.66%] h-[2px] bg-white flex items-center justify-end">
                    <span className="text-white font-bold -mr-1">▸</span>
                  </div>
                </div>
              )}

              {/* Step 3: instance == null */}
              {currentStep >= 3 && (
                <div className="flex justify-end pr-4 animate-in fade-in duration-300">
                  <div className="px-3 py-1.5 rounded-xl bg-[#FFD026] text-slate-950 font-bold text-xs shadow-md border border-amber-300/60">
                    instance == null
                  </div>
                </div>
              )}

              {/* Step 4: new Singleton() loopback */}
              {currentStep >= 4 && (
                <div className="flex justify-end pr-6 items-center gap-2 animate-in fade-in duration-300">
                  <span className="text-[11px] text-slate-300">new Singleton()</span>
                  <span className="text-slate-400 text-lg">↺</span>
                </div>
              )}

              {/* Step 5: returns instance to Client 1 */}
              {currentStep >= 5 && (
                <div className="relative flex items-center justify-between px-6 pt-2 animate-in fade-in slide-in-from-right duration-300">
                  <span className="text-[11px] text-slate-300 bg-[#050811] px-2 py-0.5 rounded border border-slate-800 z-10">
                    instance
                  </span>
                  <div className="absolute left-[16.66%] right-[16.66%] h-[2px] border-t-2 border-dashed border-slate-400 flex items-center justify-start">
                    <span className="text-slate-400 font-bold -ml-1">◂</span>
                  </div>
                </div>
              )}

              {/* Step 6: Client 2 calls getInstance() */}
              {currentStep >= 6 && (
                <div className="relative flex items-center justify-between px-16 pt-3 animate-in fade-in slide-in-from-left duration-300">
                  <span className="text-[11px] font-semibold text-slate-200 bg-[#050811] px-2 py-0.5 rounded border border-slate-800 z-10 ml-auto mr-12">
                    getInstance()
                  </span>
                  <div className="absolute left-[50%] right-[16.66%] h-[2px] bg-white flex items-center justify-end">
                    <span className="text-white font-bold -mr-1">▸</span>
                  </div>
                </div>
              )}

              {/* Step 7: instance != null & returns same instance */}
              {currentStep >= 7 && (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div className="flex justify-end pr-4">
                    <div className="px-3 py-1.5 rounded-xl bg-[#FFD026] text-slate-950 font-bold text-xs shadow-md border border-amber-300/60">
                      instance != null
                    </div>
                  </div>

                  <div className="relative flex items-center justify-between px-16">
                    <span className="text-[11px] text-slate-300 bg-[#050811] px-2 py-0.5 rounded border border-slate-800 z-10 ml-auto mr-12">
                      same instance
                    </span>
                    <div className="absolute left-[50%] right-[16.66%] h-[2px] border-t-2 border-dashed border-slate-400 flex items-center justify-start">
                      <span className="text-slate-400 font-bold -ml-1">◂</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 8: Both clients share the same instance */}
              {currentStep >= 8 && (
                <div className="pt-4 flex justify-center animate-in zoom-in-95 duration-300">
                  <div className="px-4 py-2 rounded-xl bg-[#FFD026] text-slate-950 font-bold text-xs shadow-xl border border-amber-300/80 flex items-center gap-2">
                    <span>Both clients share the same instance</span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Bottom Participants */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center font-mono font-bold text-xs pt-2">
            <div className="px-4 py-2.5 rounded-xl bg-[#00E599] text-slate-950 shadow-md">
              Client 1
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-[#00E599] text-slate-950 shadow-md">
              Client 2
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-[#00E599] text-slate-950 shadow-md">
              Singleton
            </div>
          </div>

          {/* Playback Control Bar at Bottom */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-4 border-t border-slate-900 max-w-md mx-auto">
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handlePrev}
              disabled={currentStep <= 1}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition disabled:opacity-30"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs transition shadow-md shadow-emerald-950"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStep >= totalSteps}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition disabled:opacity-30"
              title="Next Step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-slate-400 ml-2">
              <span className="text-emerald-400 font-bold">{currentStep}</span> / {totalSteps}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed pt-1">
        Animated sequence diagrams walk through object interactions one step at a time, helping you understand which object initiates an operation, which methods are called, and how information flows through the system.
      </p>
    </div>
  );
}
