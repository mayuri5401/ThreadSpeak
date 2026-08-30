import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, CheckCircle2, XCircle, Award, Flame, RotateCcw, 
  Sparkles, Layers, BookOpen, ChevronRight, Check
} from 'lucide-react';
import { fetchQuizzes, submitQuizAnswers } from '../../microfrontends/mfe-quiz/services/quizApiClient';
import FlashcardDeck from './FlashcardDeck';

export default function QuizHub({ onGainXp }) {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [mode, setMode] = useState('quiz'); // 'quiz', 'flashcard'
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [resultSummary, setResultSummary] = useState(null);
  const [streak, setStreak] = useState(3);

  useEffect(() => {
    async function loadData() {
      const data = await fetchQuizzes(selectedTrack === 'all' ? null : selectedTrack);
      setQuizzes(data);
      setSelectedAnswers({});
      setSubmitted(false);
      setResultSummary(null);
    }
    loadData();
  }, [selectedTrack]);

  const handleSelectOption = (questionId, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length === 0) return;
    const summary = await submitQuizAnswers(selectedAnswers);
    setResultSummary(summary);
    setSubmitted(true);
    if (summary.xpGained && onGainXp) {
      onGainXp(summary.xpGained);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setResultSummary(null);
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="space-y-6">
      {/* Quiz Hub Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-extrabold text-white">Interview Mastery &amp; Quiz Hub</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800/60">
                100+ High-Yield Questions
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Test your deep understanding of Java concurrency, Spring Bean lifecycle, LLD patterns, and distributed HLD systems.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setMode('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                mode === 'quiz' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Challenge Quiz
            </button>
            <button
              onClick={() => setMode('flashcard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                mode === 'flashcard' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Flashcards Mode
            </button>
          </div>
        </div>

        {/* Track Filters & Stats */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Tracks' },
              { id: 'core-java', label: 'Core Java' },
              { id: 'spring-boot', label: 'Spring Boot' },
              { id: 'system-design', label: 'System Design' },
              { id: 'dsa', label: 'DSA' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTrack(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                  selectedTrack === t.id
                    ? 'bg-slate-800 border-cyan-500 text-white ring-1 ring-cyan-500'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-900/50">
              <Flame className="w-3.5 h-3.5 fill-current" /> {streak} Day Streak
            </span>
            <span className="text-slate-400">
              {quizzes.length} Questions Loaded
            </span>
          </div>
        </div>
      </div>

      {/* Mode Render */}
      {mode === 'flashcard' ? (
        <FlashcardDeck questions={quizzes} />
      ) : (
        <div className="space-y-6">
          {/* Result Banner if submitted */}
          {submitted && resultSummary && (
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/30 to-cyan-950/30 space-y-3 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xl">
                    {resultSummary.scorePercentage}%
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Quiz Evaluation Completed!</h3>
                    <p className="text-xs text-slate-300">
                      You answered {resultSummary.correctAnswers} of {resultSummary.totalQuestions} questions correctly.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold">
                    +{resultSummary.xpGained} XP Awarded
                  </span>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition border border-slate-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Question List */}
          <div className="space-y-5">
            {quizzes.map((q, qIndex) => {
              const selected = selectedAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = isAnswered && selected === q.correctOptionIndex;

              return (
                <div
                  key={q.id}
                  className="glass-panel p-6 rounded-3xl border border-slate-800 bg-[#0B1222]/80 space-y-4 shadow-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs flex items-center justify-center font-bold">
                        {qIndex + 1}
                      </span>
                      <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                        {q.category}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {q.difficulty || 'Medium'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {q.question}
                  </h3>

                  {q.codeSnippet && (
                    <pre className="p-3 rounded-xl bg-[#080D18] border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                      <code>{q.codeSnippet}</code>
                    </pre>
                  )}

                  {/* Options */}
                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selected === optIdx;
                      const isOptionCorrect = q.correctOptionIndex === optIdx;

                      let btnStyle = 'bg-slate-900/70 border-slate-800 hover:bg-slate-800 text-slate-300';
                      if (submitted) {
                        if (isOptionCorrect) {
                          btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500';
                        } else if (isOptionSelected && !isOptionCorrect) {
                          btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                        } else {
                          btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                        }
                      } else if (isOptionSelected) {
                        btnStyle = 'bg-cyan-950/80 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between gap-3 ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-mono flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {submitted && isOptionCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {submitted && isOptionSelected && !isOptionCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Box on submit */}
                  {submitted && (
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-xs animate-in fade-in">
                      <span className="font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                        Detailed Explanation:
                      </span>
                      <p className="text-slate-300 leading-relaxed font-sans">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Actions Bar */}
          {!submitted && (
            <div className="sticky bottom-4 glass-panel p-4 rounded-2xl border border-cyan-500/30 bg-[#0F172A]/90 flex items-center justify-between gap-4 shadow-2xl backdrop-blur-xl">
              <span className="text-xs font-mono text-slate-300">
                Answered: <strong className="text-cyan-400">{answeredCount}</strong> of {quizzes.length}
              </span>

              <button
                onClick={handleSubmit}
                disabled={answeredCount === 0}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition disabled:opacity-50"
              >
                Submit Answers ({answeredCount})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
