import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Send, Sparkles, CheckCircle2, 
  AlertTriangle, Shield, Trophy, Clock, Cpu, Server, 
  Layers, Code2, Zap, ArrowRight, BookOpen, User, 
  Terminal, ThumbsUp, HelpCircle, Check, Crown
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MockInterviewSimulator({ onOpenPricing, onSelectView }) {
  const [selectedTrack, setSelectedTrack] = useState('hld'); // 'hld' | 'lld' | 'concurrency'
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [interviewerPersona, setInterviewerPersona] = useState('staff'); // 'friendly' | 'staff' | 'strict'
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 mins
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // User input states
  const [activeTab, setActiveTab] = useState('architecture'); // 'architecture' | 'code' | 'tradeoffs'
  const [architectureInput, setArchitectureInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [tradeoffsInput, setTradeoffsInput] = useState('');

  // AI Evaluation State
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const timerRef = useRef(null);

  const interviewScenarios = {
    hld: [
      {
        company: 'Netflix / Meta',
        title: 'Design a Distributed Rate Limiter & Abuse Prevention Engine',
        scale: '100 Million Active Users • 50,000 QPS • Sub-5ms Latency',
        difficulty: 'Hard (Senior / Staff)',
        description: 'Design a globally distributed rate limiting and bot protection service capable of enforcing token bucket and sliding window algorithms across multi-region datacenters with eventual consistency and sub-5ms latency overhead.',
        requirements: [
          'Support per-IP, per-User-ID, and per-API-Key quota policies',
          'Handle burst traffic without starving legitimate users',
          'Multi-datacenter replication with Redis Cluster & Local In-Memory Cache',
          'Graceful degradation when Redis cluster is partitioned (Fallback allow-list)'
        ],
        sampleSolution: '### Architecture Blueprint\n1. **Edge Gateway Filter (Envoy / Zuul)**: Local sliding window in-memory filter for 90% fast-path rejection.\n2. **Redis Cluster (Token Bucket)**: Atomic Lua scripts for decrementing tokens across distributed nodes.\n3. **Kafka Event Log**: Async audit stream for abuse pattern detection by ML workers.\n4. **Fallback Circuit Breaker**: If Redis latency > 10ms, fail-open to ensure service availability.'
      },
      {
        company: 'Uber / Grab',
        title: 'Design a Real-Time Driver-Rider Matching & Dispatch Engine',
        scale: '10 Million Drivers • 2 Million Concurrent Requests/sec • Geohash H3',
        difficulty: 'Hard (Staff)',
        description: 'Design the real-time location tracking and dispatching infrastructure to match riders with the closest available drivers within 2-second SLA using Uber H3 hexagonal spatial indexing.',
        requirements: [
          'Process continuous GPS telemetry pings every 4 seconds from 10M drivers',
          'Spatial range queries (find K-nearest drivers within 3km radius)',
          'Distributed lock during match negotiation to prevent double-booking',
          'Dynamic surge pricing recalculation every 30 seconds per hex cell'
        ],
        sampleSolution: '### Architecture Blueprint\n1. **WebSockets Gateway**: Statefully maintains persistent bidirectional connections with active drivers.\n2. **Spatial Index (Uber H3 + Redis GEO)**: In-memory geospatial cluster mapped by Resolution 8 Hexagons.\n3. **Dispatch Worker Ring (Ringpop / Consistent Hashing)**: Coordinates ride lock via Redis Redlock.\n4. **Event Pipeline**: Kafka topic partitioned by city ID for supply/demand surge aggregation.'
      },
      {
        company: 'Amazon / Stripe',
        title: 'Design an Idempotent Distributed Payment Processing Gateway',
        scale: '99.999% SLA • Zero Double-Charges • Exactly-Once Semantics',
        difficulty: 'Staff Level',
        description: 'Architect a highly resilient payment processing system that guarantees zero duplicate charges even in the presence of client retries, network partitions, and third-party banking timeout spikes.',
        requirements: [
          'Strict idempotency key deduplication with atomic PostgreSQL/Redis locking',
          'Two-phase commit / Saga pattern for distributed ledger balance updates',
          'Dead Letter Queue (DLQ) automated reconciliation engine',
          'PCI-DSS compliant tokenization vault for card data isolation'
        ],
        sampleSolution: '### Architecture Blueprint\n1. **Idempotency Filter**: Hash SHA-256 of request payload + Idempotency-Key in Redis with 24h TTL.\n2. **Outbox Pattern**: Transactional DB write before publishing event to message broker.\n3. **Payment State Machine**: (INITIATED -> AUTHORIZED -> CAPTURED -> SETTLED).\n4. **Reconciliation Cron**: Continuous drift detector matching bank settlement reports against internal ledger.'
      }
    ],
    lld: [
      {
        company: 'Google / Amazon',
        title: 'Design a Thread-Safe In-Memory Cache with LRU & TTL Eviction',
        scale: 'Concurrent Read/Write • O(1) Get & Put • Automatic Expiration',
        difficulty: 'Medium-Hard',
        description: 'Implement a thread-safe in-memory key-value cache in Java supporting O(1) retrieval, O(1) insertion, Least Recently Used (LRU) doubly linked list eviction, and background TTL timer eviction.',
        requirements: [
          'Use ConcurrentHashMap and customized Doubly Linked Node structure',
          'Fine-grained ReadWriteLock or StampedLock for maximum concurrent throughput',
          'ScheduledExecutorService for periodic expired node pruning',
          'Provide clean unit tests demonstrating concurrency race prevention'
        ],
        sampleSolution: '```java\npublic class LruCacheWithTtl<K, V> {\n  private final int capacity;\n  private final ConcurrentHashMap<K, Node<K, V>> map;\n  private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();\n  // Doubly linked list pointers and background timer purge\n}\n```'
      },
      {
        company: 'Microsoft / Adobe',
        title: 'Design a Multi-Floor Smart Elevator Dispatcher System',
        scale: '20 Floors • 4 Elevators • SCAN Algorithm & State Pattern',
        difficulty: 'Medium',
        description: 'Model an object-oriented elevator control system for a high-rise office building applying the State Pattern, Strategy Pattern (LOOK/SCAN elevator scheduling), and Dispatcher thread coordinator.',
        requirements: [
          'Clean OOP class models: Elevator, Floor, Request, Direction, ElevatorState',
          'Design patterns: State Pattern (Idle, MovingUp, MovingDown, Maintenance)',
          'Optimal dispatching algorithm to minimize average passenger wait time'
        ],
        sampleSolution: '```java\npublic interface ElevatorState {\n  void handleHallCall(Elevator elevator, int floor, Direction dir);\n}\npublic class IdleState implements ElevatorState { ... }\n```'
      }
    ],
    concurrency: [
      {
        company: 'Jane Street / Citadel',
        title: 'Implement a High-Throughput Lock-Free Circular Ring Buffer',
        scale: '10 Million ops/sec • Zero Lock Contention • Atomic Long Pointers',
        difficulty: 'Staff Hard',
        description: 'Implement an ultra low-latency Single Producer Single Consumer (SPSC) and Multiple Producer Multiple Consumer (MPMC) circular ring buffer using Java AtomicLong, Unsafe memory fences, and cache line padding to prevent false sharing.',
        requirements: [
          'Avoid `synchronized` and `ReentrantLock` — use lock-free CAS operations',
          'Apply cache line padding (@Contended / 64-byte boundary padding)',
          'Handle ring wraparound and buffer full/empty wait strategies (Busy-spin / Yield / Park)'
        ],
        sampleSolution: '```java\npublic class LockFreeRingBuffer<T> {\n  private final Object[] buffer;\n  private final AtomicLong head = new AtomicLong(0);\n  private final AtomicLong tail = new AtomicLong(0);\n  // CAS operations with memory fence barriers\n}\n```'
      }
    ]
  };

  const currentScenario = interviewScenarios[selectedTrack]?.[selectedScenarioIndex] || interviewScenarios.hld[0];

  // Timer Tick
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, timeLeft]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEvaluateSolution = () => {
    if (!architectureInput && !codeInput) {
      alert('Please write your architecture or code before submitting for evaluation.');
      return;
    }

    setIsEvaluating(true);
    setIsTimerRunning(false);

    setTimeout(() => {
      setIsEvaluating(false);

      // Simulated Intelligent AI Rubric Grading
      const lengthBonus = Math.min(20, Math.floor((architectureInput.length + codeInput.length) / 50));
      const architectureScore = Math.min(25, 18 + Math.floor(lengthBonus * 0.35));
      const scalabilityScore = Math.min(25, 17 + Math.floor(lengthBonus * 0.35));
      const tradeoffsScore = Math.min(25, 16 + Math.floor(lengthBonus * 0.20));
      const resilienceScore = Math.min(25, 18 + Math.floor(lengthBonus * 0.10));
      const totalScore = architectureScore + scalabilityScore + tradeoffsScore + resilienceScore;

      const grade = totalScore >= 88 ? 'Strong Hire (L6/Staff)' : totalScore >= 75 ? 'Hire (L5/Senior)' : totalScore >= 60 ? 'Leaning Hire (L4/Mid)' : 'No Hire';

      if (totalScore >= 75) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      setEvaluationResult({
        totalScore,
        grade,
        rubrics: [
          { name: 'Architecture & Correctness', score: architectureScore, max: 25, feedback: 'Strong component partitioning. Clear separation between ingress gateway and backing state stores.' },
          { name: 'Scalability & Bottlenecks', score: scalabilityScore, max: 25, feedback: 'Identified distributed cache bottlenecks well. Recommended sharding by key hash.' },
          { name: 'Trade-off Justification', score: tradeoffsScore, max: 25, feedback: 'Good justification of consistency vs latency trade-offs under network partition.' },
          { name: 'Edge Cases & Failover', score: resilienceScore, max: 25, feedback: 'Solid circuit breaker and fallback policies noted for upstream outages.' }
        ],
        strengths: [
          'Clear high-level architectural component diagramming',
          'Good awareness of sub-5ms low latency constraints',
          'Thoughtful data model and replication strategy'
        ],
        improvements: [
          'Could elaborate more on automated recovery during split-brain state',
          'Consider detailing rate limiter memory capacity calculations in bytes'
        ]
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] text-slate-100 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900/80 to-cyan-950/40 border border-white/10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI FAANG MOCK INTERVIEW ENGINE</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-bold">
              Senior &amp; Staff Level
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Live Technical &amp; System Design Round
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Simulate real 45-minute technical interviews at Google, Amazon, Netflix, and Uber. Receive automated grading against FAANG rubric standards.
          </p>
        </div>

        {/* Live Timer Widget */}
        <div className="flex items-center gap-4 bg-[#080D1A]/90 p-3.5 sm:p-4 rounded-2xl border border-white/15 shrink-0 shadow-lg relative z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Interview Timer</span>
            <div className={`text-2xl sm:text-3xl font-mono font-black ${timeLeft < 300 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`}>
              {formatTimer(timeLeft)}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 border-l border-white/10 pl-3">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isTimerRunning
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500 text-slate-950 font-black'
              }`}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
            </button>
            <button
              onClick={() => { setTimeLeft(45 * 60); setIsTimerRunning(false); }}
              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white text-[10px] font-mono flex items-center justify-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Track & Persona Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-mono text-slate-400 font-bold mr-2 uppercase">Track:</span>
          {[
            { id: 'hld', label: 'System Design (HLD)', icon: Server },
            { id: 'lld', label: 'Low-Level Design (LLD)', icon: Cpu },
            { id: 'concurrency', label: 'Java Concurrency', icon: Zap },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = selectedTrack === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTrack(t.id);
                  setSelectedScenarioIndex(0);
                  setEvaluationResult(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scenario Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase">Problem:</span>
          <select
            value={selectedScenarioIndex}
            onChange={(e) => {
              setSelectedScenarioIndex(Number(e.target.value));
              setEvaluationResult(null);
            }}
            className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/15 text-xs font-bold text-white focus:outline-none cursor-pointer"
          >
            {interviewScenarios[selectedTrack]?.map((s, idx) => (
              <option key={idx} value={idx} className="bg-slate-900 text-white">
                {idx + 1}. {s.title.substring(0, 35)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Interview Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interview Prompt & Requirements (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-[#090F1E] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {currentScenario.company}
              </span>
              <span className="text-[11px] font-mono text-amber-400 font-bold">
                {currentScenario.difficulty}
              </span>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                {currentScenario.title}
              </h2>
              <p className="text-xs font-mono text-emerald-400 mt-1 font-semibold">
                Target Scale: {currentScenario.scale}
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentScenario.description}
            </p>

            {/* Requirements Checklist */}
            <div className="space-y-2 pt-3 border-t border-white/10">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                Required Deliverables:
              </span>
              <ul className="space-y-2">
                {currentScenario.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Model Architecture Snippet (Collapsible) */}
            <details className="pt-3 border-t border-white/10 text-xs text-slate-400 group">
              <summary className="font-mono font-bold text-cyan-400 cursor-pointer hover:underline flex items-center justify-between">
                <span>View Staff Engineer Model Solution Blueprint</span>
                <span className="text-[10px] bg-white/[0.05] px-2 py-0.5 rounded">Reference</span>
              </summary>
              <div className="mt-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                {currentScenario.sampleSolution}
              </div>
            </details>
          </div>
        </div>

        {/* Right Column: Candidate Solution Workspace & AI Evaluator (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Solution Editor Container */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#090F1E] border border-white/10 shadow-xl space-y-4">
            
            {/* Tab Selector */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                {[
                  { id: 'architecture', label: '1. Architecture & Blueprint', icon: Server },
                  { id: 'code', label: '2. Code & Schema Design', icon: Code2 },
                  { id: 'tradeoffs', label: '3. Scale & Bottlenecks', icon: Layers },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-white/[0.1] text-white shadow-sm border border-white/10'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">Markdown &amp; Java supported</span>
            </div>

            {/* Input Editors */}
            {activeTab === 'architecture' && (
              <textarea
                value={architectureInput}
                onChange={(e) => setArchitectureInput(e.target.value)}
                placeholder="Describe your end-to-end system architecture:&#10;1. Ingress & Gateway layer&#10;2. Service components & caching strategy (Redis / Memcached)&#10;3. Data storage, partitioning & replication&#10;4. Async worker queues & failover circuit breakers..."
                className="w-full h-64 p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-400 resize-none leading-relaxed"
              />
            )}

            {activeTab === 'code' && (
              <textarea
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="// Write your core class interfaces, concurrency locks, or database schema:&#10;public class DistributedRateLimiter {&#10;  private final RedisClusterClient redis;&#10;  public boolean allowRequest(String userId, int quota) {&#10;    // Implement sliding window atomic script&#10;  }&#10;}"
                className="w-full h-64 p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-emerald-300 placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-400 resize-none leading-relaxed"
              />
            )}

            {activeTab === 'tradeoffs' && (
              <textarea
                value={tradeoffsInput}
                onChange={(e) => setTradeoffsInput(e.target.value)}
                placeholder="Discuss key engineering trade-offs:&#10;- Latency vs Strong Consistency (CAP Theorem considerations)&#10;- In-memory vs Redis network round-trip overhead&#10;- Failure modes: What happens if network partition splits data centers?"
                className="w-full h-64 p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-amber-200 placeholder-slate-500 font-mono focus:outline-none focus:border-amber-400 resize-none leading-relaxed"
              />
            )}

            {/* Evaluation Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-[11px] font-mono text-slate-400">
                Word count: {architectureInput.length + codeInput.length + tradeoffsInput.length} chars
              </div>

              <button
                disabled={isEvaluating}
                onClick={handleEvaluateSolution}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition duration-200 shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isEvaluating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>AI Interviewer is Grading...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit for AI Rubric Evaluation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Feedback & Score Card */}
          {evaluationResult && (
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#081525] to-[#090F1E] border-2 border-cyan-500/40 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">Interview Result</span>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <span>Recommendation:</span>
                    <span className="text-emerald-400">{evaluationResult.grade}</span>
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Overall Score</span>
                  <span className="text-3xl font-black text-white font-mono">
                    {evaluationResult.totalScore}
                    <span className="text-xs text-slate-400 font-normal">/100</span>
                  </span>
                </div>
              </div>

              {/* Rubric Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {evaluationResult.rubrics.map((r, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>{r.name}</span>
                      <span className="text-emerald-400 font-mono">{r.score}/{r.max}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">{r.feedback}</p>
                  </div>
                ))}
              </div>

              {/* Strengths & Improvements */}
              <div className="space-y-3 pt-2">
                <div>
                  <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Candidate Strengths:</span>
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {evaluationResult.strengths.map((s, idx) => (
                      <li key={idx}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Areas for Improvement:</span>
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {evaluationResult.improvements.map((imp, idx) => (
                      <li key={idx}>• {imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
