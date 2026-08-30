import React, { useState, useEffect } from 'react';
import QuizHub from '../../components/quiz/QuizHub';
import FlashcardDeck from '../../components/quiz/FlashcardDeck';
import { fetchQuizzes, evaluateQuizAnswers } from './services/quizApiClient';
import { mfeEventBus, MfeEvents } from '../../shared/events/MfeEventBus';

export default function QuizMicroApp({
  currentTrackId = 'core-java',
  selectedTopicId = null,
  onClose,
  onAwardXp
}) {
  const [questions, setQuestions] = useState([]);
  const [activeMode, setActiveMode] = useState('quiz'); // 'quiz' | 'flashcards'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadQuizData() {
      setIsLoading(true);
      const data = await fetchQuizzes(currentTrackId, selectedTopicId);
      setQuestions(data || []);
      setIsLoading(false);
    }
    loadQuizData();
  }, [currentTrackId, selectedTopicId]);

  const handleQuizComplete = async (results) => {
    const { topicOrTrackId, answers, score, xpEarned } = results;
    
    // Evaluate with backend Quiz microservice
    try {
      await evaluateQuizAnswers(topicOrTrackId || currentTrackId, answers);
    } catch (e) {
      console.warn('[MFE-Quiz] Backend eval warning:', e);
    }

    // Broadcast across microfrontends
    mfeEventBus.emit(MfeEvents.QUIZ_COMPLETED, {
      topicOrTrackId: topicOrTrackId || currentTrackId,
      score,
      xp: xpEarned
    });

    mfeEventBus.emit(MfeEvents.XP_EARNED, {
      xp: xpEarned,
      reason: `Completed ${currentTrackId} Quiz Assessment`
    });

    onAwardXp?.(xpEarned);
  };

  return (
    <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <h2 className="text-xl font-bold text-white tracking-wide">
            Interactive Assessment & Knowledge Engine
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveMode('quiz')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeMode === 'quiz'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Multiple Choice Quiz
          </button>
          <button
            onClick={() => setActiveMode('flashcards')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeMode === 'flashcards'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Concept Flashcards
          </button>
        </div>
      </div>

      {/* Main Mode View */}
      {activeMode === 'quiz' ? (
        <QuizHub
          questions={questions}
          trackId={currentTrackId}
          topicId={selectedTopicId}
          onComplete={handleQuizComplete}
          isLoading={isLoading}
        />
      ) : (
        <FlashcardDeck
          questions={questions}
          trackId={currentTrackId}
        />
      )}
    </div>
  );
}
