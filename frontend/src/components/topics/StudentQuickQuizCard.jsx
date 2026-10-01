import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, XCircle, HelpCircle, ArrowRight, 
  RotateCcw, Award, Lightbulb, Check
} from 'lucide-react';
import { triggerConfettiCelebration } from '../../shared/utils/confettiCelebration';

export default function StudentQuickQuizCard({ topicTitle = 'Java Concept', onMarkComplete }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Dynamic 2 Questions based on topic
  const questions = [
    {
      id: 1,
      question: `What is the primary operational benefit of "${topicTitle}" in software architecture?`,
      options: [
        { label: 'A', text: 'Encapsulates implementation details and provides clean, modular APIs', isCorrect: true, exp: 'Encapsulation and modular interfaces ensure clean separation of concerns and prevent unintended side-effects.' },
        { label: 'B', text: 'Disables garbage collection to run directly in GPU registers', isCorrect: false, exp: 'Java objects are managed by the JVM Garbage Collector on the Heap, not GPU registers.' },
        { label: 'C', text: 'Converts all dynamic memory allocations into static global variables', isCorrect: false, exp: 'Static global variables introduce tight coupling and concurrency hazards.' },
        { label: 'D', text: 'Prevents the Java Compiler from generating bytecode classes', isCorrect: false, exp: 'The compiler always compiles source code into .class bytecode files.' },
      ]
    },
    {
      id: 2,
      question: `Which memory region in the JVM manages local execution frames and reference pointers during method calls?`,
      options: [
        { label: 'A', text: 'Metaspace (Native RAM)', isCorrect: false, exp: 'Metaspace stores class definitions, runtime constant pools, and method metadata.' },
        { label: 'B', text: 'Thread Call Stack', isCorrect: true, exp: 'Local variable arrays and operand stack frames reside in the calling thread stack.' },
        { label: 'C', text: 'Old Generation Heap Space', isCorrect: false, exp: 'The Heap holds live object payloads, not execution frames.' },
        { label: 'D', text: 'Direct Buffer Pool', isCorrect: false, exp: 'Direct buffers are used for off-heap NIO operations.' },
      ]
    }
  ];

  const handleSelect = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      const chosenIdx = selectedAnswers[q.id];
      if (chosenIdx !== undefined && q.options[chosenIdx].isCorrect) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score === questions.length) {
      triggerConfettiCelebration();
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const score = submitted ? calculateScore() : 0;

  return (
    <div className="my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#090E1A] via-[#0D1527] to-[#070B14] border border-cyan-500/30 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-500/60 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
              <span>Quick Knowledge Check: {topicTitle}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                2 Questions
              </span>
            </h3>
            <p className="text-xs text-slate-400">Validate your understanding of this chapter with instant feedback.</p>
          </div>
        </div>

        {submitted && (
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border flex items-center gap-1.5 ${
              score === questions.length 
                ? 'bg-emerald-950 text-emerald-300 border-emerald-600 shadow-lg shadow-emerald-950/50' 
                : 'bg-amber-950 text-amber-300 border-amber-600'
            }`}>
              <Award className="w-4 h-4" />
              <span>Score: {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)</span>
            </span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-3">
            <div className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700 font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                {qIndex + 1}
              </span>
              <p className="text-sm font-bold text-slate-100 leading-snug">
                {q.question}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              {q.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[q.id] === optIdx;
                let btnStyle = 'bg-slate-900/60 border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white';
                
                if (isSelected && !submitted) {
                  btnStyle = 'bg-cyan-950/80 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500/50';
                }

                if (submitted) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/60 font-semibold';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200 ring-1 ring-rose-500/60';
                  } else {
                    btnStyle = 'opacity-40 bg-slate-900/40 border-slate-800 text-slate-400';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={submitted}
                    onClick={() => handleSelect(q.id, optIdx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 h-5 rounded-md bg-slate-800/80 text-slate-300 font-mono text-[11px] flex items-center justify-center font-bold shrink-0">
                        {opt.label}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </div>

                    {submitted && opt.isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {submitted && isSelected && !opt.isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 font-sans leading-relaxed flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300">Explanation: </span>
                  <span>{q.options.find(o => o.isCorrect)?.exp}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="text-xs text-slate-400 font-mono">
          {answeredCount}/{questions.length} answered
        </div>

        <div className="flex items-center gap-2">
          {submitted ? (
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={answeredCount < questions.length}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition hover:scale-105 active:scale-95"
            >
              <span>Submit &amp; Check Answers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
