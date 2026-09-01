import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Lightbulb, ShieldAlert, Cpu, Briefcase, 
  Volume2, VolumeX, Play, Pause, RotateCcw, Copy, Check, ChevronDown, ChevronUp, Bot, X
} from 'lucide-react';

export default function TopicAiTutorBar({ 
  topicTitle = '', 
  topicContent = '', 
  trackId = 'core-java',
  onAskGemini
}) {
  const [activeInsight, setActiveInsight] = useState(null); // 'eli5' | 'faang' | 'underTheHood' | 'bugTraps' | null
  const [copied, setCopied] = useState(false);

  // Text-To-Speech Audio Narration State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const synthRef = useRef(window.speechSynthesis || null);
  const utteranceRef = useRef(null);

  // Stop audio on unmount or topic change
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [topicTitle]);

  const handleToggleAudio = () => {
    if (!synthRef.current) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    if (isPlayingAudio) {
      synthRef.current.cancel();
      setIsPlayingAudio(false);
    } else {
      synthRef.current.cancel();
      
      // Clean markdown tags for clear speech
      const cleanText = `${topicTitle}. ${topicContent.replace(/[#*`_\[\]()]/g, '').slice(0, 3000)}`;
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = playbackSpeed;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      
      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (isPlayingAudio && utteranceRef.current && synthRef.current) {
      synthRef.current.cancel();
      const cleanText = `${topicTitle}. ${topicContent.replace(/[#*`_\[\]()]/g, '').slice(0, 3000)}`;
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = speed;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      utteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    }
  };

  // Generate intelligent contextual explanations based on topic title & content
  const getInsightData = (type) => {
    const title = topicTitle || 'This Topic';

    if (type === 'eli5') {
      return {
        badge: 'Explain Like I\'m 5',
        icon: Lightbulb,
        color: 'text-amber-400',
        bg: 'from-amber-950/40 via-amber-900/20 to-slate-900',
        border: 'border-amber-500/40',
        title: `Visual Analogy for ${title}`,
        content: `Imagine you run a bustling pizza restaurant with 10 chefs:
• Instead of every chef building their own custom oven (which wastes memory and space), they share a single high-efficiency conveyor oven.
• When learning **${title}**, think of it as establishing strict kitchen blueprints. It guarantees that no matter which chef is on duty, every order is processed identically with zero collisions or wasted ingredients.
• The golden takeaway: You separate the *what needs to be done* from *how the machine actually executes it*.`
      };
    }

    if (type === 'faang') {
      return {
        badge: 'FAANG Interviewer Gotchas',
        icon: Briefcase,
        color: 'text-emerald-400',
        bg: 'from-emerald-950/40 via-emerald-900/20 to-slate-900',
        border: 'border-emerald-500/40',
        title: `How Google, Meta & Amazon Test ${title}`,
        content: `Interviewer Trick Questions & Edge Cases:
1. **Time & Space Trade-off**: Interviewers will ask: *"What happens if this scales from 1,000 to 10,000,000 QPS?"* Always mention memory overhead per object and cache locality.
2. **Thread-Safety & Race Conditions**: Expect questions on whether this component is safe across multiple concurrent threads. Point out immutability, volatile variables, or mutex synchronization.
3. **Failure Modes**: State clearly what happens when an OutOfMemoryError, NullPointer, or Timeout occurs, and how you design graceful degradation.`
      };
    }

    if (type === 'underTheHood') {
      return {
        badge: 'Under The Hood (Memory & Bytecode)',
        icon: Cpu,
        color: 'text-cyan-400',
        bg: 'from-cyan-950/40 via-cyan-900/20 to-slate-900',
        border: 'border-cyan-500/40',
        title: `Hardware & JVM Execution Engine`,
        content: `Low-Level Architecture Breakdown:
• **Stack vs. Heap**: References reside on the calling thread's Stack Frame (L1/L2 CPU Cache friendly), while the underlying object payload lives inside the Eden/Tenured Space of the JVM Heap.
• **Bytecode Opcode Execution**: The JIT (Just-In-Time) compiler monitors hot execution loops and compiles bytecode directly into native machine code (x86-64 / ARM assembly instructions).
• **Memory Barrier & CPU Reordering**: Modern CPU architectures reorder instructions for pipelining. Understanding this concept prevents memory visibility bugs.`
      };
    }

    if (type === 'bugTraps') {
      return {
        badge: 'Top Junior Bug Traps',
        icon: ShieldAlert,
        color: 'text-rose-400',
        bg: 'from-rose-950/40 via-rose-900/20 to-slate-900',
        border: 'border-rose-500/40',
        title: `Top 3 Pitfalls Candidates Make in Production`,
        content: `Avoid these 3 common mistakes:
1. ❌ **Unclosed Resources / Memory Leaks**: Holding references inside static collections or forgetting to close streams/sockets prevents garbage collection.
2. ❌ **Assuming Reference Equality (== vs .equals())**: Comparing object pointers instead of semantic values is the #1 bug in coding interviews.
3. ❌ **Swallowing Exceptions**: Empty catch blocks like \`catch (Exception e) {}\` hide production failures and make root-cause analysis impossible.`
      };
    }

    return null;
  };

  const currentInsightData = activeInsight ? getInsightData(activeInsight) : null;

  const handleCopyInsight = () => {
    if (!currentInsightData) return;
    navigator.clipboard.writeText(`${currentInsightData.title}\n\n${currentInsightData.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-6 rounded-3xl bg-[#090E1A]/90 light:bg-slate-50/90 border border-slate-800 light:border-slate-200 shadow-xl overflow-hidden backdrop-blur-md transition-all">
      
      {/* Action Bar Header */}
      <div className="p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 light:border-slate-200">
        
        {/* Left: AI Super-Tutor Badge */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-white light:text-slate-900 flex items-center gap-1.5">
              <span>AI Super-Tutor</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-950 light:bg-emerald-100 text-emerald-300 light:text-emerald-800 text-[9px] font-mono font-bold border border-emerald-800/60 light:border-emerald-300">
                1-Click Insights
              </span>
            </div>
          </div>
        </div>

        {/* Center: 4 Instant Insight Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'eli5', label: 'ELI5 Analogy', icon: Lightbulb, color: 'hover:text-amber-300 hover:border-amber-500/40 text-amber-400' },
            { id: 'faang', label: 'FAANG Gotchas', icon: Briefcase, color: 'hover:text-emerald-300 hover:border-emerald-500/40 text-emerald-400' },
            { id: 'underTheHood', label: 'Under The Hood', icon: Cpu, color: 'hover:text-cyan-300 hover:border-cyan-500/40 text-cyan-400' },
            { id: 'bugTraps', label: 'Bug Traps', icon: ShieldAlert, color: 'hover:text-rose-300 hover:border-rose-500/40 text-rose-400' },
          ].map(btn => {
            const Icon = btn.icon;
            const isActive = activeInsight === btn.id;
            return (
              <button
                key={btn.id}
                onClick={() => setActiveInsight(isActive ? null : btn.id)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border shadow-sm ${
                  isActive
                    ? 'bg-slate-800 light:bg-slate-200 border-emerald-500 text-white light:text-slate-900 ring-1 ring-emerald-500/40'
                    : `bg-slate-900/60 light:bg-white border-slate-800/80 light:border-slate-200 text-slate-300 light:text-slate-700 ${btn.color}`
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Audio Narration Player */}
        <div className="flex items-center gap-2 bg-slate-900/90 light:bg-white px-2.5 py-1 rounded-xl border border-slate-800 light:border-slate-200">
          <button
            onClick={handleToggleAudio}
            className={`flex items-center gap-1.5 text-xs font-bold transition ${
              isPlayingAudio ? 'text-emerald-400 animate-pulse' : 'text-slate-300 light:text-slate-700 hover:text-white'
            }`}
            title={isPlayingAudio ? 'Stop Narration' : 'Listen with AI Audio'}
          >
            {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span className="text-[11px] font-mono">{isPlayingAudio ? 'Playing' : 'Listen'}</span>
          </button>

          <div className="flex items-center gap-1 pl-1.5 border-l border-slate-800 light:border-slate-200">
            {[1, 1.25, 1.5].map(s => (
              <button
                key={s}
                onClick={() => handleSpeedChange(s)}
                className={`text-[10px] font-mono px-1 py-0.5 rounded ${
                  playbackSpeed === s
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Expanded Insight Drawer */}
      {currentInsightData && (
        <div className={`p-4 sm:p-5 bg-gradient-to-r ${currentInsightData.bg} border-b border-slate-800 animate-in fade-in zoom-in-95 duration-150`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${currentInsightData.color} px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-1.5`}>
                <currentInsightData.icon className="w-3.5 h-3.5" />
                {currentInsightData.badge}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyInsight}
                className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition"
                title="Copy Insight"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setActiveInsight(null)}
                className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <h4 className="text-sm sm:text-base font-bold text-white mt-3">
            {currentInsightData.title}
          </h4>

          <div className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            {currentInsightData.content}
          </div>
        </div>
      )}

    </div>
  );
}
