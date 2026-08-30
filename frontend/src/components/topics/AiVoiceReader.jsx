import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Square, RotateCcw, Volume2, VolumeX, 
  Sparkles, Bot, Headphones, FastForward, Rewind, 
  ChevronDown, ChevronUp, Settings2, Sliders, Radio,
  Activity, CheckCircle2, ListFilter, Volume1, X
} from 'lucide-react';

/**
 * Strips all emojis, pictographs, dingbats, and special decorative symbols
 * so the browser speech synthesis reads only natural, fluent human speech.
 */
function cleanTextForVoice(text = '') {
  if (!text) return '';
  return String(text)
    // Convert keycap number emojis like 1️⃣, 2️⃣, 3️⃣ into plain numbered list "1.", "2."
    .replace(/(\d)[\uFE0F\u20E3\uFE0E]+/gu, '$1. ')
    .replace(/(\d)\u20E3/gu, '$1. ')
    // Remove all standard Unicode emoji and pictograph ranges
    .replace(/[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}\u{2B50}\u{2300}-\u{23FF}\u{2934}-\u{2935}\u{25A0}-\u{25FF}\u{2190}-\u{21FF}\u{FE0F}\u{FE0E}\u{200D}]/gu, '')
    // Remove extended pictographics
    .replace(/\p{Extended_Pictographic}/gu, '')
    // Remove decorative fences and repeat symbols (===, ---, ***, ___, >>>)
    .replace(/[=\-_~*]{3,}/g, ' ')
    // Remove arrow strings (->, -->, =>, ==>, <=)
    .replace(/[-=]>{1,2}|<[-=]{1,2}|<->/g, ' ')
    // Remove decorative bullets and checkboxes (•, ◆, ◇, ■, □, ★, ☆, ✓, ✔, ✕, ✖)
    .replace(/[•◆◇■□★☆✓✔✕✖]/g, ' ')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts natural spoken sentences directly and verbatim from markdown text
 * without emojis or markdown formatting tags.
 */
function extractSentencesFromMarkdown(markdownText = '') {
  if (!markdownText) return [];

  const lines = String(markdownText).split(/\r?\n+/);
  const sentences = [];

  let inCodeBlock = false;

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    // Skip code block lines
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    if (line.startsWith('---') || line.startsWith('***') || line.startsWith('___')) continue;

    // Strip markdown decorations while preserving the human text
    let clean = line
      .replace(/^#{1,6}\s+/, '')            // remove header marks (#, ##)
      .replace(/^>\s*\[![A-Z]+\]\s*/i, '')   // remove callout tags (> [!NOTE])
      .replace(/^>\s+/, '')                  // remove blockquotes (>)
      .replace(/^[\s*-+]\s+/, '')            // remove bullet points
      .replace(/^\d+\.\s+/, '')              // remove numbered list
      .replace(/`([^`]+)`/g, '$1')           // remove code backticks
      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '')// remove images
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')// remove links, keep text
      .replace(/(\*\*|__)(.*?)\1/g, '$2')    // remove bold
      .replace(/(\*|_)(.*?)\1/g, '$2')       // remove italic
      .replace(/<[^>]*>/g, '')               // remove html tags
      .replace(/\|/g, ' ')                   // replace table dividers
      .trim();

    // Strip all emojis and non-speech symbols
    clean = cleanTextForVoice(clean);

    if (clean.length > 3) {
      // Split on sentence boundaries (. ! ?) while keeping meaningful chunks
      const chunks = clean.split(/(?<=[.?!])\s+/).filter(c => cleanTextForVoice(c).length > 3);
      if (chunks.length > 0) {
        for (const chunk of chunks) {
          const finalClean = cleanTextForVoice(chunk);
          if (finalClean.length > 2) {
            sentences.push(finalClean);
          }
        }
      } else {
        sentences.push(clean);
      }
    }
  }

  return sentences;
}

export default function AiVoiceReader({ 
  title = '', 
  summary = '', 
  deepDive = '',
  eli10 = '',
  mentalModel = '',
  interviewTraps = [],
  customText = null,
  onSpeechStatusChange = null
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [sentences, setSentences] = useState([]);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [activeSubtitle, setActiveSubtitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const isSpeakingRef = useRef(false);
  const currentSentenceIndexRef = useRef(0);
  const rateRef = useRef(1.0);
  const pitchRef = useRef(1.0);
  const volumeRef = useRef(1.0);
  const isMutedRef = useRef(false);
  const selectedVoiceRef = useRef(null);
  const activeUtteranceRef = useRef(null);
  const speakTimeoutRef = useRef(null);

  useEffect(() => {
    rateRef.current = rate;
    pitchRef.current = pitch;
    volumeRef.current = volume;
    isMutedRef.current = isMuted;
    selectedVoiceRef.current = selectedVoice;
    currentSentenceIndexRef.current = currentSentenceIndex;
  }, [rate, pitch, volume, isMuted, selectedVoice, currentSentenceIndex]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      if (available && available.length > 0) {
        setVoices(available);
        const naturalVoice = available.find(v => 
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Neural') || v.name.includes('Online')) &&
          (v.lang.startsWith('en'))
        ) || available.find(v => v.lang.startsWith('en')) || available[0];
        
        setSelectedVoice(naturalVoice);
        selectedVoiceRef.current = naturalVoice;
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    const rawContent = customText || deepDive || '';
    const parsedSentences = extractSentencesFromMarkdown(rawContent);

    setSentences(parsedSentences);
    setCurrentSentenceIndex(0);
    currentSentenceIndexRef.current = 0;
    setActiveSubtitle(parsedSentences[0] || '');
  }, [title, summary, deepDive, customText]);

  const speakSentence = (index, restartCurrent = false) => {
    if (!('speechSynthesis' in window)) return;
    if (index >= sentences.length) {
      handleStop();
      return;
    }

    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current);
      speakTimeoutRef.current = null;
    }

    window.speechSynthesis.cancel();

    const sentenceText = sentences[index];
    if (!sentenceText) return;

    setActiveSubtitle(sentenceText);
    setCurrentSentenceIndex(index);
    currentSentenceIndexRef.current = index;

    // Trigger parent callback to highlight corresponding text in Markdown
    onSpeechStatusChange?.({ text: sentenceText, index, isPlaying: true });

    const utterance = new SpeechSynthesisUtterance(sentenceText);
    activeUtteranceRef.current = utterance;

    if (selectedVoiceRef.current) {
      utterance.voice = selectedVoiceRef.current;
      utterance.lang = selectedVoiceRef.current.lang || 'en-US';
    }

    utterance.rate = rateRef.current;
    utterance.pitch = pitchRef.current;
    utterance.volume = isMutedRef.current ? 0.0 : volumeRef.current;

    utterance.onend = () => {
      if (isSpeakingRef.current) {
        speakTimeoutRef.current = setTimeout(() => {
          speakSentence(currentSentenceIndexRef.current + 1);
        }, 150);
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        if (isSpeakingRef.current) {
          speakTimeoutRef.current = setTimeout(() => {
            speakSentence(currentSentenceIndexRef.current + 1);
          }, 200);
        }
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setIsExpanded(true);
    isSpeakingRef.current = true;
    speakSentence(currentSentenceIndex);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setIsPaused(true);
    isSpeakingRef.current = false;
    onSpeechStatusChange?.({ text: sentences[currentSentenceIndex] || '', index: currentSentenceIndex, isPlaying: false });
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    setIsPaused(false);
    isSpeakingRef.current = false;
    setCurrentSentenceIndex(0);
    currentSentenceIndexRef.current = 0;
    setActiveSubtitle(sentences[0] || '');
    onSpeechStatusChange?.({ text: '', index: 0, isPlaying: false });
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleSkipNext = () => {
    const nextIdx = Math.min(sentences.length - 1, currentSentenceIndex + 1);
    if (isPlaying) {
      speakSentence(nextIdx);
    } else {
      setCurrentSentenceIndex(nextIdx);
      setActiveSubtitle(sentences[nextIdx] || '');
    }
  };

  const handleSkipPrev = () => {
    const prevIdx = Math.max(0, currentSentenceIndex - 1);
    if (isPlaying) {
      speakSentence(prevIdx);
    } else {
      setCurrentSentenceIndex(prevIdx);
      setActiveSubtitle(sentences[prevIdx] || '');
    }
  };

  const handleJumpToSentence = (index) => {
    if (isPlaying) {
      speakSentence(index);
    } else {
      setCurrentSentenceIndex(index);
      setActiveSubtitle(sentences[index] || '');
    }
  };

  const handleRateChange = (newRate) => {
    setRate(newRate);
    rateRef.current = newRate;
    if (isPlaying) {
      speakSentence(currentSentenceIndex);
    }
  };

  const totalWords = sentences.join(' ').split(' ').length;
  const estimatedMinutes = Math.max(1, Math.ceil(totalWords / (140 * rate)));
  const progressPercent = sentences.length > 0 
    ? Math.round(((currentSentenceIndex + 1) / sentences.length) * 100) 
    : 0;

  if (!isSupported) return null;

  return (
    <div className="w-full">
      {/* Sleek, Space-Optimized Audio Bar */}
      <div className={`transition-all duration-300 rounded-xl border ${
        isPlaying
          ? 'bg-[#0B1528] border-cyan-500/40 shadow-lg shadow-cyan-950/40 p-2 sm:p-2.5'
          : 'bg-[#080E1C]/80 hover:bg-[#0A1224] border-slate-800/80 p-1.5 sm:p-2'
      }`}>
        <div className="flex items-center justify-between gap-2.5">
          {/* Left: Play/Pause trigger & Status */}
          <div className="flex items-center gap-2 min-w-0">
            {isPlaying ? (
              <button
                onClick={handlePause}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition shrink-0"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </button>
            ) : (
              <button
                onClick={handlePlay}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 transition hover:scale-[1.02] shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPaused ? 'Resume Voice' : 'Listen with AI'}</span>
              </button>
            )}

            {/* Equalizer animation when playing */}
            {isPlaying ? (
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-end gap-0.5 h-4 px-1.5 py-0.5 bg-cyan-950/80 rounded border border-cyan-800/60 shrink-0">
                  <span className="w-0.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0ms] h-2" />
                  <span className="w-0.5 bg-cyan-300 rounded-full animate-bounce [animation-delay:150ms] h-3.5" />
                  <span className="w-0.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:300ms] h-2.5" />
                  <span className="w-0.5 bg-purple-400 rounded-full animate-bounce [animation-delay:75ms] h-4" />
                </div>
                <span className="text-[11px] text-cyan-300 font-mono truncate hidden sm:inline">
                  Part {currentSentenceIndex + 1}/{sentences.length} ({progressPercent}%)
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 truncate">
                <Headphones className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>~{estimatedMinutes}m audio narration</span>
              </span>
            )}
          </div>

          {/* Right: Controls & Speed */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Speed Pills */}
            <div className="flex items-center gap-0.5 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
              {[1.0, 1.25, 1.5, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => handleRateChange(s)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold transition ${
                    rate === s
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Prev / Next (visible when active) */}
            {(isPlaying || isPaused) && (
              <>
                <button
                  onClick={handleSkipPrev}
                  disabled={currentSentenceIndex === 0}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 disabled:opacity-30 transition"
                  title="Previous Section"
                >
                  <Rewind className="w-3 h-3" />
                </button>
                <button
                  onClick={handleSkipNext}
                  disabled={currentSentenceIndex >= sentences.length - 1}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800 disabled:opacity-30 transition"
                  title="Next Section"
                >
                  <FastForward className="w-3 h-3" />
                </button>
                <button
                  onClick={handleStop}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-800 transition"
                  title="Stop"
                >
                  <Square className="w-3 h-3" />
                </button>
              </>
            )}

            {/* Mute Toggle */}
            <button
              onClick={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                isMutedRef.current = nextMuted;
                if (isPlaying) speakSentence(currentSentenceIndex, true);
              }}
              className={`p-1.5 rounded-lg border transition ${
                isMuted 
                  ? 'bg-rose-950/80 border-rose-800 text-rose-400' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-800'
              }`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Toggle Full Details */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-1.5 rounded-lg border transition ${
                isExpanded 
                  ? 'bg-cyan-950 border-cyan-700 text-cyan-300' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-800'
              }`}
              title={isExpanded ? "Collapse Details" : "Expand Script & Progress"}
            >
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Live Active Subtitle Line */}
        {isPlaying && activeSubtitle && (
          <div className="mt-1.5 pt-1.5 border-t border-cyan-500/20 text-xs text-cyan-100 flex items-center gap-1.5 animate-in fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
            <span className="truncate font-sans font-medium">{activeSubtitle}</span>
          </div>
        )}

        {/* Expanded Drawer (Progress bar & Transcript) */}
        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-slate-800 space-y-2 animate-in fade-in duration-200">
            {/* Progress Bar */}
            <div 
              className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                const targetIdx = Math.min(sentences.length - 1, Math.max(0, Math.floor(clickPos * sentences.length)));
                handleJumpToSentence(targetIdx);
              }}
              title="Click to seek along timeline"
            >
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Quick Transcript List */}
            {showTranscript && (
              <div className="max-h-40 overflow-y-auto custom-scrollbar space-y-1 p-1 bg-slate-950 rounded-lg border border-slate-800/80 text-xs">
                {sentences.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleJumpToSentence(idx)}
                    className={`w-full text-left px-2 py-1 rounded text-[11px] truncate flex items-center gap-2 ${
                      idx === currentSentenceIndex 
                        ? 'bg-cyan-950 text-cyan-200 font-semibold' 
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-[9px] text-slate-500">{idx + 1}.</span>
                    <span className="truncate">{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
