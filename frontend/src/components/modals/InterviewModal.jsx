import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { 
  Code2, Layers, Cpu, MessageSquare, Terminal, 
  Sparkles, CheckCircle2, Play, Bot, ArrowRight, X, Clock, ShieldCheck
} from 'lucide-react';

export default function InterviewModal({ isOpen, onClose, onOpenPlayground }) {
  const [selectedType, setSelectedType] = useState('coding'); // 'coding' | 'system-design' | 'lld' | 'behavioral'
  const [activeStep, setActiveStep] = useState('select'); // 'select' | 'in-progress'
  const [currentScenario, setCurrentScenario] = useState(null);

  if (!isOpen) return null;

  const interviewTypes = [
    {
      id: 'coding',
      label: 'AI Coding Mock Interview',
      icon: Code2,
      color: 'text-emerald-400',
      bg: 'from-emerald-950/60 to-slate-900',
      border: 'border-emerald-500/30 hover:border-emerald-500/60',
      desc: 'Live 45-minute technical problem solving with real-time AI feedback on time complexity, edge cases, and code cleanliness.',
      scenarios: [
        { id: 'c-1', title: 'Two Sum & 3-Sum Optimal Pointers', company: 'Google', difficulty: 'Medium', timeLimit: '45 mins' },
        { id: 'c-2', title: 'LRU Cache Design with O(1) Operations', company: 'Meta', difficulty: 'Hard', timeLimit: '45 mins' },
        { id: 'c-3', title: 'Longest Substring Without Repeating Characters', company: 'Amazon', difficulty: 'Medium', timeLimit: '35 mins' },
        { id: 'c-4', title: 'Course Schedule (Graph Topological Sort)', company: 'Netflix', difficulty: 'Medium', timeLimit: '45 mins' },
      ]
    },
    {
      id: 'system-design',
      label: 'System Design Interview (HLD)',
      icon: Layers,
      color: 'text-indigo-400',
      bg: 'from-indigo-950/60 to-slate-900',
      border: 'border-indigo-500/30 hover:border-indigo-500/60',
      desc: 'Design distributed architectures with realistic QPS, storage estimation, load balancing, caching, and database sharding.',
      scenarios: [
        { id: 'sd-1', title: 'Design a Scalable URL Shortener (TinyURL)', company: 'Microsoft', difficulty: 'Medium', timeLimit: '45 mins' },
        { id: 'sd-2', title: 'Design WhatsApp / Discord Real-Time Chat', company: 'Meta', difficulty: 'Hard', timeLimit: '45 mins' },
        { id: 'sd-3', title: 'Design Rate Limiter with Redis Token Bucket', company: 'Stripe', difficulty: 'Medium', timeLimit: '40 mins' },
        { id: 'sd-4', title: 'Design YouTube Video Streaming & CDN Architecture', company: 'Google', difficulty: 'Hard', timeLimit: '50 mins' },
      ]
    },
    {
      id: 'lld',
      label: 'Low-Level Design (LLD & OOP)',
      icon: Cpu,
      color: 'text-cyan-400',
      bg: 'from-cyan-950/60 to-slate-900',
      border: 'border-cyan-500/30 hover:border-cyan-500/60',
      desc: 'Design robust object-oriented software applying SOLID principles, GoF design patterns, and concurrency thread safety.',
      scenarios: [
        { id: 'lld-1', title: 'Design Multi-Floor Automated Parking Lot System', company: 'Amazon', difficulty: 'Medium', timeLimit: '45 mins' },
        { id: 'lld-2', title: 'Design Elevator Management System with Concurrency', company: 'Google', difficulty: 'Hard', timeLimit: '45 mins' },
        { id: 'lld-3', title: 'Design Splitwise Expense Sharing Engine', company: 'Uber', difficulty: 'Medium', timeLimit: '45 mins' },
        { id: 'lld-4', title: 'Design Thread-Safe In-Memory Pub/Sub Message Broker', company: 'Apple', difficulty: 'Hard', timeLimit: '50 mins' },
      ]
    },
    {
      id: 'behavioral',
      label: 'Behavioral & Leadership (STAR)',
      icon: MessageSquare,
      color: 'text-amber-400',
      bg: 'from-amber-950/60 to-slate-900',
      border: 'border-amber-500/30 hover:border-amber-500/60',
      desc: 'Master Amazon Leadership Principles, conflict resolution, production incident handling, and staff-level engineering communication.',
      scenarios: [
        { id: 'b-1', title: 'Tell me about a critical production outage you resolved', company: 'Amazon', difficulty: 'Staff Level', timeLimit: '30 mins' },
        { id: 'b-2', title: 'How did you handle technical disagreement with team leads?', company: 'Meta', difficulty: 'Senior Level', timeLimit: '30 mins' },
        { id: 'b-3', title: 'Explain a time you made an architectural trade-off', company: 'Google', difficulty: 'Senior Level', timeLimit: '30 mins' },
      ]
    }
  ];

  const activeCategory = interviewTypes.find(t => t.id === selectedType) || interviewTypes[0];

  const handleStartInterview = (scenario) => {
    setCurrentScenario(scenario);
    if (selectedType === 'coding' || selectedType === 'lld') {
      onOpenPlayground?.(`// ${scenario.title}\n// Company: ${scenario.company} | Time Limit: ${scenario.timeLimit}\n\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("Starting Mock Interview: ${scenario.title}");\n        // Write your optimal solution here\n    }\n}`);
      onClose();
    } else {
      setActiveStep('in-progress');
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-4xl max-h-[88vh] sm:max-h-[90vh] p-4 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1222] shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>AI Technical Interview Studio</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono">
                  FAANG Simulation
                </span>
              </h3>
              <p className="text-xs text-slate-400 hidden sm:block">Select an interview format to test your algorithmic, architectural, or object-oriented design skills.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-mono text-xl p-1.5 hover:bg-slate-800 rounded-xl transition">✕</button>
        </div>

        {/* Modal Body */}
        {activeStep === 'select' ? (
          <div className="flex-1 overflow-y-auto py-4 sm:py-5 space-y-5 custom-scrollbar pr-1">
            
            {/* 4 Format Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {interviewTypes.map(type => {
                const Icon = type.icon;
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col gap-1.5 ${
                      isSelected
                        ? 'border-emerald-500/80 bg-slate-900/90 shadow-lg ring-1 ring-emerald-500/50'
                        : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center ${type.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-white truncate">{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Category Description Banner */}
            <div className={`p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r ${activeCategory.bg} border ${activeCategory.border}`}>
              <h4 className={`text-xs sm:text-sm font-bold ${activeCategory.color} flex items-center gap-2`}>
                <Sparkles className="w-4 h-4" />
                <span>{activeCategory.label}</span>
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeCategory.desc}</p>
            </div>

            {/* List of Curated Practice Scenarios */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Available Interview Scenarios ({activeCategory.scenarios.length})
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                {activeCategory.scenarios.map(sc => (
                  <div
                    key={sc.id}
                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold border border-slate-700">
                          {sc.company}
                        </span>
                        <span className="text-amber-400 flex items-center gap-1 text-[10px] sm:text-xs">
                          <Clock className="w-3 h-3" />
                          {sc.timeLimit}
                        </span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition">
                        {sc.title}
                      </h5>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        sc.difficulty === 'Hard' ? 'bg-rose-950/80 text-rose-300 border border-rose-800' : 'bg-amber-950/80 text-amber-300 border border-amber-800'
                      }`}>
                        {sc.difficulty}
                      </span>
                      <button
                        onClick={() => handleStartInterview(sc)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md shadow-emerald-500/20 transition active:scale-95"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Start Mock</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4 sm:py-5 space-y-4 custom-scrollbar pr-1">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">{currentScenario?.company} Interview</span>
                <span className="text-xs font-mono text-slate-400">Time Remaining: 45:00</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">{currentScenario?.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Please structure your response into: 1. Requirements, 2. Capacity Estimations (QPS, Storage), 3. High-Level Architecture, 4. Bottlenecks &amp; Fault Tolerance.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold font-mono text-slate-300 uppercase">Architecture &amp; Design Notes</label>
              <textarea
                rows={6}
                placeholder="Type your design decisions, API signatures, and data models here..."
                className="w-full p-3.5 rounded-2xl bg-[#070B14] border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setActiveStep('select')}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs font-bold"
              >
                Back to Scenarios
              </button>
              <button
                onClick={() => {
                  alert('Mock Interview submitted! AI report is being generated.');
                  setActiveStep('select');
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25"
              >
                Submit for AI Evaluation
              </button>
            </div>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}
