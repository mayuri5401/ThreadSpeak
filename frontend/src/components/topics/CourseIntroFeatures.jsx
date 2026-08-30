import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, XCircle, RotateCcw, Play, Pause, Maximize2, 
  HelpCircle, Car, ArrowRight, Video, Sparkles, Award, User, MessageSquare, ThumbsUp, Send, Clock, BookOpen, Check,
  Database, RefreshCw
} from 'lucide-react';
import { fetchQuizzes } from '../../microfrontends/mfe-quiz/services/quizApiClient';

const DEFAULT_COURSE_INTRO_QUIZZES = [
  {
    id: "q-lld-intro-1",
    question: "Which concept means combining data and behavior into a single unit with restricted access?",
    options: [
      { key: 'A', text: 'Polymorphism' },
      { key: 'B', text: 'Abstraction' },
      { key: 'C', text: 'Inheritance' },
      { key: 'D', text: 'Encapsulation' },
    ],
    correct: 'D',
    explanation: "Encapsulation is the bundling of data and the methods that operate on that data into a single unit (class), while restricting direct access to internal state using access modifiers (private/protected)."
  },
  {
    id: "q-lld-intro-2",
    question: "Which SOLID principle states that 'High-level modules should not depend on low-level modules; both should depend on abstractions'?",
    options: [
      { key: 'A', text: 'Single Responsibility Principle' },
      { key: 'B', text: 'Open/Closed Principle' },
      { key: 'C', text: 'Dependency Inversion Principle' },
      { key: 'D', text: 'Interface Segregation Principle' },
    ],
    correct: 'C',
    explanation: "The Dependency Inversion Principle (DIP) states that we must decouple software modules by depending on abstractions/interfaces rather than concrete low-level implementations."
  },
  {
    id: "q-lld-intro-3",
    question: "Which relationship type represents a strong 'part-of' lifecycle ownership where child objects cannot exist without the parent?",
    options: [
      { key: 'A', text: 'Composition' },
      { key: 'B', text: 'Aggregation' },
      { key: 'C', text: 'Association' },
      { key: 'D', text: 'Dependency' },
    ],
    correct: 'A',
    explanation: "Composition is a strict 'death-relationship' (e.g. House and Rooms). When the House is destroyed, its Rooms cease to exist."
  },
  {
    id: "q-lld-intro-4",
    question: "What is the primary difference between Low-Level Design (LLD) and High-Level Design (HLD)?",
    options: [
      { key: 'A', text: 'LLD focuses on class modeling, SOLID principles, and design patterns; HLD focuses on distributed scaling and databases' },
      { key: 'B', text: 'LLD is only for frontend development; HLD is for backend databases' },
      { key: 'C', text: 'LLD only uses Python; HLD only uses Java' },
      { key: 'D', text: 'There is no difference between LLD and HLD' }
    ],
    correct: 'A',
    explanation: "HLD addresses macro system topology (load balancers, message queues, databases, caching), whereas LLD addresses micro component architecture (classes, interfaces, design patterns, clean code, concurrency)."
  }
];

function normalizeRawQuiz(q) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  let opts = [];
  let correctKey = 'A';

  if (Array.isArray(q.options)) {
    if (typeof q.options[0] === 'string') {
      opts = q.options.map((text, idx) => ({
        key: letters[idx] || String(idx),
        text
      }));
      const cIdx = typeof q.correctOptionIndex === 'number' ? q.correctOptionIndex : 0;
      correctKey = letters[cIdx] || 'A';
    } else if (q.options[0] && typeof q.options[0] === 'object' && q.options[0].key) {
      opts = q.options;
      correctKey = q.correct || 'A';
    }
  }

  return {
    id: q.id || Math.random().toString(),
    question: q.question,
    options: opts,
    correct: correctKey,
    explanation: q.explanation || 'Review the core architectural concepts covered in this module.'
  };
}

// 5. Dynamic Interactive Quiz Component (Reads from PostgreSQL / Backend Database API)
export function CourseIntroQuiz({ topicId = 'lld-welcome-course-introduction', trackId = 'system-design' }) {
  const [questions, setQuestions] = useState(DEFAULT_COURSE_INTRO_QUIZZES);
  const [loading, setLoading] = useState(false);
  const [isFromDb, setIsFromDb] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Load quizzes dynamically from backend database
  useEffect(() => {
    let isMounted = true;
    async function loadQuizData() {
      setLoading(true);
      try {
        const data = await fetchQuizzes(trackId, topicId);
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          const normalized = data.map(normalizeRawQuiz).filter(q => q.options.length > 0);
          if (normalized.length > 0) {
            setQuestions(normalized);
            setIsFromDb(true);
          }
        }
      } catch (e) {
        console.warn("Using fallback quizzes due to:", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadQuizData();
    return () => { isMounted = false; };
  }, [topicId, trackId]);

  const currentQ = questions[currentQuestionIndex];

  const handleSelect = (key) => {
    setSelectedOption(key);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-5 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">5</span>
          <h4 className="text-lg font-bold text-white">Quizzes</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-800 text-xs font-mono">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
            Multiple Choice
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-300">
        Concept chapters and sections include quizzes designed to test whether you truly understand the material and receive immediate feedback.
      </p>

      {/* Question Card */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h5 className="text-sm sm:text-base font-bold text-white leading-snug">
          {currentQ.question}
        </h5>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {currentQ.options.map(opt => {
            const isSelected = selectedOption === opt.key;
            const isCorrect = opt.key === currentQ.correct;
            let btnStyle = 'bg-[#080D1A] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white';

            if (showFeedback) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200';
              }
            } else if (isSelected) {
              btnStyle = 'bg-cyan-950 border-cyan-500 text-white';
            }

            return (
              <button
                key={opt.key}
                onClick={() => handleSelect(opt.key)}
                disabled={showFeedback}
                className={`p-3 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-slate-800/80 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                    {opt.key}
                  </span>
                  <span>{opt.text}</span>
                </div>

                {showFeedback && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Explanation */}
        {showFeedback && (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 font-bold font-mono">
              {selectedOption === currentQ.correct ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Correct Answer!
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> Incorrect
                </span>
              )}
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold disabled:opacity-30 transition"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold disabled:opacity-30 transition"
        >
          Next Question
        </button>
      </div>
    </div>
  );
}

// 6. Problem Simulation: Fully Moveable & Animated Parking Lot Simulator
export function ParkingLotSimulationCard() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [step, setStep] = useState(0);

  // 6 Continuous Animation Steps with precise X/Y/Rotation Coordinates for the Moveable Car (JVD-6014)
  const trajectorySteps = [
    {
      label: "JVD-6014 arriving at Entry Gate • Ticket Issued",
      x: 75,
      y: 248,
      rotation: 0,
      gateInOpen: true,
      gateOutOpen: false,
      freeSpots: 5,
      revenue: 620,
      spotB3Filled: false
    },
    {
      label: "JVD-6014 driving through Entry ramp & turning into aisle",
      x: 140,
      y: 135,
      rotation: -90,
      gateInOpen: false,
      gateOutOpen: false,
      freeSpots: 5,
      revenue: 620,
      spotB3Filled: false
    },
    {
      label: "JVD-6014 driving across main aisle to Spot B3",
      x: 290,
      y: 135,
      rotation: 0,
      gateInOpen: false,
      gateOutOpen: false,
      freeSpots: 5,
      revenue: 620,
      spotB3Filled: false
    },
    {
      label: "JVD-6014 parked in spot B3 (Timer Active)",
      x: 290,
      y: 195,
      rotation: 90,
      gateInOpen: false,
      gateOutOpen: false,
      freeSpots: 4,
      revenue: 620,
      spotB3Filled: true
    },
    {
      label: "JVD-6014 leaving spot B3 • Driving to Exit ramp",
      x: 480,
      y: 135,
      rotation: 0,
      gateInOpen: false,
      gateOutOpen: false,
      freeSpots: 5,
      revenue: 620,
      spotB3Filled: false
    },
    {
      label: "JVD-6014 paying $20 at Exit Booth • Gate opened",
      x: 585,
      y: 248,
      rotation: 0,
      gateInOpen: false,
      gateOutOpen: true,
      freeSpots: 5,
      revenue: 640,
      spotB3Filled: false
    }
  ];

  const currentStep = trajectorySteps[step];

  // Moving car loop timer
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep(prev => (prev + 1) % trajectorySteps.length);
      }, 2000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const handleRestart = () => {
    setStep(0);
    setIsPlaying(true);
  };

  const toggleSpeed = () => {
    setSpeed(prev => (prev === 1 ? 2 : 1));
  };

  return (
    <div className="space-y-4 my-6">
      {/* Title & Description */}
      <div className="space-y-1">
        <h4 className="text-lg font-bold text-white tracking-wide">Parking Lot, Entry to Exit Flow</h4>
        <p className="text-xs text-slate-300">
          Vehicles take a ticket, drive to a matching spot, then pay at the booth and exit.
        </p>
      </div>

      {/* Top HUD Controls Bar */}
      <div className="flex items-center gap-2 text-xs font-mono select-none">
        <span className="px-3 py-1.5 rounded-xl bg-[#141822] text-slate-300 border border-slate-800 shadow-sm">
          01:23 AM
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#141822] text-emerald-400 border border-slate-800 shadow-sm font-semibold">
          {currentStep.freeSpots} free
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#141822] text-slate-200 border border-slate-800 shadow-sm font-semibold">
          ${currentStep.revenue}
        </span>
        <button
          onClick={handleRestart}
          className="p-1.5 rounded-xl bg-[#141822] hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
          title="Restart Simulation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Moveable Parking Lot Canvas */}
      <div className="rounded-3xl border border-slate-800/80 bg-[#151922] p-5 sm:p-7 shadow-2xl space-y-5 overflow-x-auto select-none relative">
        
        {/* Main Canvas with Relative Coordinates (700px width x 300px height) */}
        <div className="min-w-[680px] h-[300px] relative">
          
          {/* Top Section: LED Board + Top Parking Row A + Garden */}
          <div className="flex items-start justify-between gap-4 absolute top-0 left-0 right-0">
            
            {/* LED Status Board */}
            <div className="w-28 h-20 rounded-2xl bg-[#090C12] border border-slate-800 p-2.5 flex items-center gap-3 shadow-inner shrink-0">
              <div className="text-2xl font-black font-mono text-white pl-1">P</div>
              <div>
                <div className="text-xl font-bold font-mono text-[#00E599] leading-none">{currentStep.freeSpots}</div>
                <div className="text-[9px] font-mono text-[#00E599] tracking-wider uppercase mt-0.5">OPEN</div>
              </div>
            </div>

            {/* Parking Spots Row A (6 spots: A1 to A6) */}
            <div className="flex items-center gap-1.5 flex-1 justify-center">
              {/* A1 (C with purple car) */}
              <div className="w-14 h-24 rounded-t-lg border-t-2 border-x-2 border-slate-700/80 bg-[#121620] flex flex-col items-center justify-between p-1.5">
                <span className="text-[10px] font-mono text-slate-400">C</span>
                <div className="w-5 h-10 rounded-md bg-[#D946EF] shadow-sm border border-purple-300/40 relative flex items-center justify-center">
                  <div className="w-3 h-2 rounded-sm bg-slate-900/60 mb-3"></div>
                  <div className="absolute top-1 left-0.5 right-0.5 h-0.5 bg-yellow-300/80 rounded-full"></div>
                </div>
                <span className="text-[9px] font-mono text-slate-500">A1</span>
              </div>

              {/* A2 (C with yellow car) */}
              <div className="w-14 h-24 rounded-t-lg border-t-2 border-x-2 border-slate-700/80 bg-[#121620] flex flex-col items-center justify-between p-1.5">
                <span className="text-[10px] font-mono text-slate-400">C</span>
                <div className="w-5 h-10 rounded-md bg-[#EAB308] shadow-sm border border-yellow-200/40 relative flex items-center justify-center">
                  <div className="w-3 h-2 rounded-sm bg-slate-900/60 mb-3"></div>
                  <div className="absolute top-1 left-0.5 right-0.5 h-0.5 bg-white/80 rounded-full"></div>
                </div>
                <span className="text-[9px] font-mono text-slate-500">A2</span>
              </div>

              {/* A3 (R with pink sedan) */}
              <div className="w-16 h-24 rounded-t-lg border-t-2 border-x-2 border-slate-700/80 bg-[#121620] flex flex-col items-center justify-between p-1.5">
                <span className="text-[10px] font-mono text-slate-400">R</span>
                <div className="w-7 h-12 rounded-lg bg-[#F43F5E] shadow-sm border border-rose-300/40 relative flex items-center justify-center">
                  <div className="w-4 h-3 rounded bg-slate-900/70 mb-3"></div>
                  <div className="absolute top-1 left-1 right-1 h-0.5 bg-yellow-200 rounded-full"></div>
                </div>
                <span className="text-[9px] font-mono text-slate-500">A3</span>
              </div>

              {/* A4 (R, Empty) */}
              <div className="w-16 h-24 rounded-t-lg border-t-2 border-x-2 border-slate-700/80 bg-[#121620] flex flex-col items-center justify-between p-1.5">
                <span className="text-[10px] font-mono text-slate-400">R</span>
                <span className="text-[9px] font-mono text-slate-500">A4</span>
              </div>

              {/* A5 (R with yellow sedan) */}
              <div className="w-16 h-24 rounded-t-lg border-t-2 border-x-2 border-slate-700/80 bg-[#121620] flex flex-col items-center justify-between p-1.5">
                <span className="text-[10px] font-mono text-slate-400">R</span>
                <div className="w-7 h-12 rounded-lg bg-[#FACC15] shadow-sm border border-yellow-200/40 relative flex items-center justify-center">
                  <div className="w-4 h-3 rounded bg-slate-900/70 mb-3"></div>
                  <div className="absolute top-1 left-1 right-1 h-0.5 bg-white rounded-full"></div>
                </div>
                <span className="text-[9px] font-mono text-slate-500">A5</span>
              </div>

              {/* A6 (L with teal SUV) */}
              <div className="w-18 h-24 rounded-t-lg border-t-2 border-x-2 border-slate-700/80 bg-[#121620] flex flex-col items-center justify-between p-1.5">
                <span className="text-[10px] font-mono text-slate-400">L</span>
                <div className="w-8 h-13 rounded-lg bg-[#14B8A6] shadow-sm border border-teal-200/40 relative flex items-center justify-center">
                  <div className="w-5 h-4 rounded bg-slate-900/70 mb-3"></div>
                  <div className="absolute top-1 left-1 right-1 h-0.5 bg-yellow-200 rounded-full"></div>
                </div>
                <span className="text-[9px] font-mono text-slate-500">A6</span>
              </div>
            </div>

            {/* Right Garden Lawn Patch */}
            <div className="w-28 h-20 rounded-2xl bg-[#0F2318] border border-emerald-950 p-3 relative shrink-0 overflow-hidden shadow-inner">
              <div className="w-3 h-3 rounded-full bg-[#1F5438] absolute top-2.5 left-4"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#1F5438] absolute top-2 right-4"></div>
              <div className="w-4 h-4 rounded-full bg-[#1F5438] absolute bottom-3 left-10"></div>
            </div>
          </div>

          {/* Middle Driving Aisle Lane */}
          <div className="h-14 bg-[#10141D] rounded-xl border-y border-slate-800/80 flex items-center justify-between px-8 absolute top-[105px] left-0 right-0 overflow-hidden">
            <div className="flex items-center justify-around w-full text-slate-600 text-xs font-bold font-mono">
              <span className="text-slate-500 font-mono">^</span>
              
              {/* Driving Orange Car in aisle */}
              <div className="w-12 h-6 rounded-md bg-[#FB923C] border border-orange-200/40 flex items-center justify-end pr-1 shadow-md animate-pulse">
                <div className="w-4 h-3 rounded-sm bg-slate-900/60 mr-1.5"></div>
                <div className="w-1 h-3 bg-yellow-200 rounded-r-sm"></div>
              </div>

              <span className="text-slate-500">&gt;</span>

              {/* Driving Teal Car in aisle */}
              <div className="w-12 h-6 rounded-md bg-[#2DD4BF] border border-teal-200/40 flex items-center justify-end pr-1 shadow-md">
                <div className="w-4 h-3 rounded-sm bg-slate-900/60 mr-1.5"></div>
                <div className="w-1 h-3 bg-yellow-200 rounded-r-sm"></div>
              </div>

              <span className="text-slate-500">&gt;</span>
              <span className="text-slate-500 font-mono">v</span>
            </div>
          </div>

          {/* Parking Spots Row B (6 spots: B1 to B6) */}
          <div className="flex items-center gap-1.5 justify-center absolute top-[162px] left-0 right-0">
            {/* B1 (C with purple car) */}
            <div className="w-14 h-24 rounded-b-lg border-b-2 border-x-2 border-slate-700/80 bg-[#121620] flex flex-col items-center justify-between p-1.5">
              <span className="text-[9px] font-mono text-slate-500">B1</span>
              <div className="w-5 h-10 rounded-md bg-[#C084FC] shadow-sm border border-purple-200/40 relative flex items-center justify-center">
                <div className="w-3 h-2 rounded-sm bg-slate-900/60 mt-3"></div>
                <div className="absolute bottom-1 left-0.5 right-0.5 h-0.5 bg-rose-400 rounded-full"></div>
              </div>
              <span className="text-[10px] font-mono text-slate-400">C</span>
            </div>

            {/* B2 (C, Empty) */}
            <div className="w-14 h-24 rounded-b-lg border-b-2 border-x-2 border-slate-700/80 bg-[#121620] flex flex-col items-center justify-between p-1.5">
              <span className="text-[9px] font-mono text-slate-500">B2</span>
              <span className="text-[10px] font-mono text-slate-400">C</span>
            </div>

            {/* B3 (R, Empty / Active Spot) */}
            <div className="w-16 h-24 rounded-b-lg border-b-2 border-x-2 border-slate-700/80 bg-[#121620] flex flex-col items-center justify-between p-1.5 relative">
              <span className="text-[9px] font-mono text-slate-500">B3</span>
              <span className="text-[10px] font-mono text-slate-400">R</span>
            </div>

            {/* B4 (R, Empty) */}
            <div className="w-16 h-24 rounded-b-lg border-b-2 border-x-2 border-slate-700/80 bg-[#121620] flex flex-col items-center justify-between p-1.5">
              <span className="text-[9px] font-mono text-slate-500">B4</span>
              <span className="text-[10px] font-mono text-slate-400">R</span>
            </div>

            {/* B5 (R, Empty) */}
            <div className="w-16 h-24 rounded-b-lg border-b-2 border-x-2 border-slate-700/80 bg-[#121620] flex flex-col items-center justify-between p-1.5">
              <span className="text-[9px] font-mono text-slate-500">B5</span>
              <span className="text-[10px] font-mono text-slate-400">R</span>
            </div>

            {/* B6 (L, Empty) */}
            <div className="w-18 h-24 rounded-b-lg border-b-2 border-x-2 border-slate-700/80 bg-[#121620] flex flex-col items-center justify-between p-1.5">
              <span className="text-[9px] font-mono text-slate-500">B6</span>
              <span className="text-[10px] font-mono text-slate-400">L</span>
            </div>
          </div>

          {/* Median Divider Strip */}
          <div className="h-4 rounded-md bg-[#0F2318] border border-emerald-950/80 flex items-center justify-around px-12 absolute top-[215px] left-8 right-8">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1F5438]"></div>
            <div className="w-3 h-3 rounded-full bg-[#1F5438]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#1F5438]"></div>
            <div className="w-3 h-3 rounded-full bg-[#1F5438]"></div>
          </div>

          {/* Bottom Entrance & Exit Street Road */}
          <div className="h-16 bg-[#10141D] rounded-xl border border-slate-800 flex items-center justify-between px-4 absolute bottom-0 left-0 right-0">
            {/* IN Gate (Left) */}
            <div className="flex items-center gap-3">
              <div className="text-center">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">TICKET</span>
                <div className="w-7 h-5 rounded bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <div className="w-3 h-2 rounded-xs bg-cyan-400"></div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400 font-bold">IN</span>
                {/* Striped Barrier Gate Arm */}
                <div
                  className="w-1.5 h-10 rounded bg-gradient-to-b from-white via-rose-500 to-white border border-slate-600 transition-transform duration-500 origin-bottom"
                  style={{ transform: currentStep.gateInOpen ? 'rotate(-60deg)' : 'rotate(0deg)' }}
                ></div>
              </div>
            </div>

            {/* Road Arrows */}
            <div className="flex items-center gap-16 text-slate-600 text-xs font-bold font-mono">
              <span>&gt;</span>
              <span>&gt;</span>
              <span>&gt;</span>
              <span>&gt;</span>
            </div>

            {/* OUT Gate (Right) */}
            <div className="flex items-center gap-3">
              {/* Striped Barrier Gate Arm */}
              <div
                className="w-1.5 h-10 rounded bg-gradient-to-b from-white via-rose-500 to-white border border-slate-600 transition-transform duration-500 origin-bottom"
                style={{ transform: currentStep.gateOutOpen ? 'rotate(60deg)' : 'rotate(0deg)' }}
              ></div>

              <div className="text-center">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">PAY</span>
                <div className="w-8 h-5 rounded bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <div className="w-3.5 h-2 rounded-xs bg-emerald-400"></div>
                </div>
              </div>

              <span className="text-[10px] font-mono text-slate-400 font-bold">OUT</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* THE REAL MOVEABLE CAR: Pink Sedan (JVD-6014) WITH SMOOTH REAL-TIME PATH   */}
          {/* ========================================================================= */}
          <div
            className="w-12 h-6 rounded-md bg-[#F43F5E] shadow-xl border border-rose-200 flex items-center justify-end pr-1 z-30 absolute cursor-pointer transition-all ease-in-out"
            style={{
              left: `${currentStep.x}px`,
              top: `${currentStep.y}px`,
              transform: `rotate(${currentStep.rotation}deg)`,
              transitionDuration: `${1200 / speed}ms`
            }}
            title="Car JVD-6014 (Moveable Vehicle)"
          >
            <div className="w-4 h-3 rounded-sm bg-slate-900/80 mr-1"></div>
            <div className="w-1 h-3 bg-yellow-200 rounded-r-sm"></div>
            {/* Underglow Neon */}
            <div className="absolute inset-0 rounded-md bg-rose-500/20 filter blur-xs -z-10"></div>
          </div>

        </div>
      </div>

      {/* Bottom Live Action Status HUD */}
      <div className="p-4 rounded-2xl bg-[#0F131C] border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl select-none">
        {/* Status Message */}
        <div className="text-sm font-mono text-slate-200 text-center sm:text-left flex items-center gap-2">
          <Car className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" />
          <span>{currentStep.label}</span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 transition"
            title={isPlaying ? "Pause Simulation" : "Play Simulation"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          <button
            onClick={toggleSpeed}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-bold transition"
            title="Toggle Speed"
          >
            {speed}x
          </button>

          <button
            onClick={() => setStep(prev => (prev + 1) % trajectorySteps.length)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 text-xs font-mono font-bold transition"
            title="Step Forward"
          >
            Step ➔
          </button>

          <button
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition"
            title="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
