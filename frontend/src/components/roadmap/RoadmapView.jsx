import React from 'react';
import { 
  CheckCircle, Circle, ArrowDown, Coffee, Leaf, Layers, 
  Globe, Sparkles, ChevronRight, Lock, Award
} from 'lucide-react';

export default function RoadmapView({ tracks, completedTopicIds = new Set(), onSelectTopic }) {
  const roadmapStages = [
    {
      id: 'core-java-stage',
      title: 'Stage 1: Core Java & JVM Internals',
      trackId: 'core-java',
      icon: Coffee,
      color: 'border-amber-500 text-amber-400 bg-amber-950/20',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      description: 'Understand how the JVM executes bytecode, memory partitions (Stack, Heap, Metaspace), and Generational GC.',
      topics: [
        { id: 'jvm-architecture', title: 'JVM Architecture & JIT Compiler', desc: 'ClassLoader, Stack Frames, Metaspace' },
        { id: 'memory-and-gc', title: 'Heap vs Stack & Generational GC', desc: 'Eden, Survivor S0/S1, G1 & ZGC' },
        { id: 'concurrency-multithreading', title: 'Multithreading & Virtual Threads', desc: 'Locks, CAS, Loom Virtual Threads' },
        { id: 'collections-hashmap', title: 'HashMap & Red-Black Tree Hashing', desc: 'Bitwise hashing, ConcurrentHashMap' },
        { id: 'modern-java-17-21', title: 'Modern Java: Records & Sealed Classes', desc: 'Pattern matching, algebraic types' },
      ]
    },
    {
      id: 'spring-boot-stage',
      title: 'Stage 2: Spring Boot & Enterprise Architecture',
      trackId: 'spring-boot',
      icon: Leaf,
      color: 'border-emerald-500 text-emerald-400 bg-emerald-950/20',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      description: 'Master Inversion of Control, DispatcherServlet HTTP pipeline, JPA Persistence Context, and JWT Security.',
      topics: [
        { id: 'spring-ioc-di', title: 'Inversion of Control & Dependency Injection', desc: 'Constructor injection, Bean scopes' },
        { id: 'spring-bean-lifecycle', title: 'Spring Bean Lifecycle & AOP Proxies', desc: 'BeanPostProcessor, @Transactional' },
        { id: 'spring-request-pipeline', title: 'Spring MVC Request Pipeline', desc: 'Filters, DispatcherServlet, Interceptors' },
        { id: 'spring-data-jpa', title: 'Data JPA & N+1 Query Problem', desc: 'Persistence Context, JOIN FETCH' },
        { id: 'spring-security-jwt', title: 'Spring Security 6 & Stateless JWT', desc: 'SecurityFilterChain, JWT Auth' },
        { id: 'spring-microservices-resilience', title: 'Microservices & Resilience4j', desc: 'Circuit Breaker, Gateway, Tracing' },
      ]
    },
    {
      id: 'system-design-stage',
      title: 'Stage 3: System Design (LLD & HLD)',
      trackId: 'system-design',
      icon: Layers,
      color: 'border-indigo-500 text-indigo-400 bg-indigo-950/20',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      description: 'Master Low-Level Patterns (SOLID, GoF, LRU Cache, Rate Limiter) and High-Level Distributed Systems (CAP Theorem, Caching, Kafka, TinyURL, Uber).',
      topics: [
        { id: 'solid-principles', title: 'SOLID Principles & Refactoring', desc: 'SRP, OCP, LSP, ISP, DIP' },
        { id: 'creational-patterns', title: 'Creational: Singleton & Builder', desc: 'Double-checked locking, Fluent builder' },
        { id: 'lld-lru-cache', title: 'Machine Coding: LRU Cache', desc: 'HashMap + Doubly Linked List' },
        { id: 'lld-rate-limiter', title: 'Machine Coding: Rate Limiter', desc: 'Token Bucket, Sliding Window' },
        { id: 'hld-fundamentals', title: 'Scalability & CAP Theorem', desc: 'Horizontal scaling, Latency vs Throughput' },
        { id: 'hld-caching', title: 'Caching & Cache Stampede Defense', desc: 'Cache-Aside, Redis, Bloom Filter' },
        { id: 'hld-tinyurl', title: 'System Design: TinyURL Service', desc: 'Base62 encoding, KGS, Capacity' },
        { id: 'hld-kafka-event-driven', title: 'Kafka & Event-Driven Architecture', desc: 'Partitions, Consumer groups, Outbox' },
      ]
    },
    {
      id: 'dsa-stage',
      title: 'Stage 4: Data Structures & Algorithms in Java',
      trackId: 'dsa',
      icon: Globe,
      color: 'border-cyan-500 text-cyan-400 bg-cyan-950/20',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      description: 'Ace FAANG coding interviews: Two Pointers, Sliding Window, Linked List reversals, Binary Trees, Dijkstra Graphs, and Dynamic Programming.',
      topics: [
        { id: 'dsa-two-pointers', title: 'Two Pointers & Trapping Rain Water', desc: 'O(N) linear time, O(1) space two pointer scan' },
        { id: 'dsa-linked-lists', title: 'Linked List Reversal & Floyd Cycle', desc: 'Tortoise and Hare, in-place pointer rewiring' },
        { id: 'dsa-trees-traversals', title: 'Binary Trees, BFS Level-Order & LCA', desc: 'Queue-based BFS, recursive divide-and-conquer' },
        { id: 'dsa-graph-algorithms', title: 'Graphs: BFS/DFS, Topo Sort & Dijkstra', desc: 'Min-Heap PriorityQueue shortest path' },
        { id: 'dsa-dynamic-programming', title: 'Dynamic Programming: Knapsack & Coin Change', desc: 'Bottom-up DP tabulation, state transitions' },
        { id: 'dsa-monotonic-stack-queue', title: 'Monotonic Stacks: Next Greater Element', desc: 'O(N) ArrayDeque decreasing stack' },
      ]
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-3 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
          <Sparkles className="w-3.5 h-3.5" /> Complete Engineering Skill Tree
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Java, Spring Boot, LLD &amp; HLD Mastery Roadmap
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Follow this guided pathway from JVM memory and concurrency to Spring Boot microservices, design patterns, and distributed system design.
        </p>
      </div>

      {/* Vertical Stages */}
      <div className="space-y-6">
        {roadmapStages.map((stage, sIdx) => {
          const Icon = stage.icon;
          return (
            <div key={stage.id} className="space-y-4">
              {/* Stage Card */}
              <div className={`p-6 rounded-3xl border ${stage.color} space-y-4 shadow-xl`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-700 text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${stage.badgeColor}`}>
                        Stage {sIdx + 1}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1">{stage.title}</h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {stage.topics.length} Milestones
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {stage.description}
                </p>

                {/* Milestone Node List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {stage.topics.map((top) => {
                    const isDone = completedTopicIds.has(top.id);
                    return (
                      <button
                        key={top.id}
                        onClick={() => onSelectTopic && onSelectTopic(top.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 ${
                          isDone
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200 hover:bg-emerald-950/50'
                            : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {isDone ? (
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                            )}
                            <span className="text-xs font-bold text-white leading-snug">
                              {top.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 pl-6">
                            {top.desc}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 shrink-0 mt-1" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Connecting arrow if not last */}
              {sIdx < roadmapStages.length - 1 && (
                <div className="flex justify-center">
                  <div className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-500">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
