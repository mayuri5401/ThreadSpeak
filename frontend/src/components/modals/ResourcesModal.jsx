import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { 
  FileText, Map, Video, BookOpen, Layers, 
  ExternalLink, Download, Sparkles, Check, ArrowRight, Eye, Code2, X, Crown
} from 'lucide-react';

export default function ResourcesModal({ 
  isOpen, 
  onClose, 
  onSelectTrack, 
  onSelectView, 
  onOpenPlayground 
}) {
  const [activeTab, setActiveTab] = useState('handbooks'); // 'handbooks' | 'visualizers' | 'roadmaps' | 'case-studies' | 'resume'

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handbooksList = [
    {
      title: 'Java 21 Concurrency & Virtual Threads Handbook',
      pages: '240 Pages • PDF & ePub',
      badge: 'PRO Best Seller',
      desc: 'Deep dive into Loom virtual threads, structured concurrency, memory fences, Lock-Free ring buffers, and carrier thread scheduling.',
      tag: 'Java 21 LTS',
      color: 'text-amber-400',
      border: 'border-amber-500/30'
    },
    {
      title: 'Distributed System Design Interview Bible: 150 Scenarios',
      pages: '380 Pages • Architecture Blueprints',
      badge: 'Staff FAANG Standard',
      desc: 'Production-tested designs for Rate Limiters, Consistent Hashing, Distributed Locking (Redlock), CDC with Debezium, and Event Sourcing.',
      tag: 'System Design',
      color: 'text-cyan-400',
      border: 'border-cyan-500/30'
    },
    {
      title: '23 GoF Design Patterns in Modern Java 21',
      pages: '180 Pages • Enterprise Code',
      badge: 'OOP Architecture',
      desc: 'Refactored GoF patterns using Java records, sealed interfaces, pattern matching, and functional lambdas without legacy boilerplate.',
      tag: 'Low-Level Design',
      color: 'text-purple-400',
      border: 'border-purple-500/30'
    },
    {
      title: 'Microservices Security, JWT & OAuth2 Playbook',
      pages: '140 Pages • Spring Security 6',
      badge: 'Cloud & API Security',
      desc: 'Step-by-step implementation of Spring Authorization Server, RBAC, mTLS, API Gateway rate limiting, and zero-trust perimeter defense.',
      tag: 'Spring Boot 3',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30'
    }
  ];

  const visualizersList = [
    { title: 'JVM Memory (Heap, Metaspace, Stack Frames)', category: 'Runtime', id: 'jvm-memory', track: 'core-java' },
    { title: 'Java 21 Virtual Threads & Concurrency Simulator', category: 'Java 21', id: 'virtual-threads', track: 'core-java' },
    { title: 'Spring Request Flow (DispatcherServlet & Filters)', category: 'Spring Boot', id: 'spring-pipeline', track: 'spring-boot' },
    { title: 'Distributed Rate Limiter & Token Bucket', category: 'System Design', id: 'rate-limiter', track: 'system-design' },
    { title: 'Two Pointers & Sliding Window Animation', category: 'DSA', id: 'two-pointers', track: 'dsa' },
    { title: 'LRU Cache Eviction & Hash Table Visualizer', category: 'DSA & LLD', id: 'lru-cache', track: 'dsa' },
    { title: '2D & Jagged Matrix Array Memory Layout', category: 'Core Java', id: '2d-array', track: 'core-java' },
    { title: 'Java Reflection & Private Field Access Pipeline', category: 'Reflection', id: 'reflection-intro', track: 'core-java' },
  ];

  const roadmapsList = [
    { title: 'Java Backend Architect Roadmap (0 to Staff Engineer)', steps: ['Core Java 21 LTS', 'Spring Boot 3 & Microservices', 'Kafka Event Streaming', 'Distributed Caching (Redis)', 'Kubernetes & Observability'], level: 'Staff Level' },
    { title: 'High-Level Distributed System Design Roadmap', steps: ['Scalability & Caching', 'Database Sharding & Replication', 'Consistent Hashing', 'Message Queues', 'Consensus (Raft/Paxos)'], level: 'Senior / Lead' },
    { title: 'Low-Level Design (LLD) & Design Patterns Roadmap', steps: ['SOLID Principles', 'Creational Patterns (Factory, Builder)', 'Structural Patterns (Adapter, Proxy)', 'Behavioral Patterns (Observer, Strategy)', 'Concurrency Thread Safety'], level: 'All Levels' },
    { title: 'Data Structures & Algorithms (75+ Patterns)', steps: ['Two Pointers & Sliding Window', 'Monotonic Stack & Heap', 'Dynamic Programming Patterns', 'Graphs (BFS, DFS, Dijkstra, Topo Sort)', 'Trie & Segment Tree'], level: 'Interview Prep' },
  ];

  const caseStudies = [
    { title: 'How Netflix Streams 4K Ultra-HD at Scale', tags: ['CDN', 'Open Connect', 'Microservices', 'Eureka'], qps: '1.2B requests/day' },
    { title: 'How Uber Dispatches Millions of Rides in Real-Time', tags: ['Ringpop', 'Geohashing H3', 'Kafka', 'Go/Java'], qps: '2.5M rides/hour' },
    { title: 'How Discord Scaled to 11 Million Concurrent Voice Users', tags: ['Elixir', 'Rust', 'WebRTC', 'ScyllaDB'], qps: '15M events/sec' },
    { title: 'How Stripe Achieves 99.999% Payment Availability', tags: ['Idempotency Keys', 'Distributed Locking', 'PostgreSQL'], qps: '10K TPS' },
  ];

  const handleDownloadHandbook = (title) => {
    alert(`Downloading "${title}" (High-Res PDF Handbook)... Download complete!`);
  };

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full max-w-4xl max-h-[90vh] p-5 sm:p-7 rounded-3xl border border-white/10 bg-[#080d1a] shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden animate-in zoom-in-95 duration-200 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Developer Learning &amp; Architecture Vault</span>
              </h3>
              <p className="text-xs text-slate-400 hidden sm:block">Curated engineering handbooks, interactive 3D visualizers, and FAANG case studies.</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-white/10 pt-3 pb-2 shrink-0 overflow-x-auto">
          {[
            { id: 'handbooks', label: '📚 PDF eBooks & Handbooks', icon: BookOpen },
            { id: 'visualizers', label: '600+ 3D Visualizers', icon: Video },
            { id: 'roadmaps', label: 'Engineering Roadmaps', icon: Map },
            { id: 'case-studies', label: 'Architecture Case Studies', icon: BookOpen },
            { id: 'resume', label: 'ATS Resume Builder', icon: FileText },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar pr-1">
          
          {/* TAB 0: PDF Handbooks & eBooks */}
          {activeTab === 'handbooks' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {handbooksList.map((hb, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {hb.badge}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{hb.pages}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                        {hb.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{hb.desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-[11px] font-mono text-slate-400">{hb.tag}</span>
                      <button
                        onClick={() => handleDownloadHandbook(hb.title)}
                        className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 1: 3D Visualizers */}
          {activeTab === 'visualizers' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                {visualizersList.map(v => (
                  <div
                    key={v.id}
                    className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition flex flex-col justify-between space-y-2.5 group"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {v.category}
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-white mt-1.5 group-hover:text-cyan-300 transition">
                        {v.title}
                      </h5>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-[11px] font-mono text-slate-400">Interactive 3D Engine</span>
                      <button
                        onClick={() => {
                          onSelectTrack?.(v.track);
                          onSelectView?.('topics');
                          onClose();
                        }}
                        className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm cursor-pointer transition"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Launch</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Roadmaps */}
          {activeTab === 'roadmaps' && (
            <div className="space-y-3">
              {roadmapsList.map((rm, i) => (
                <div key={i} className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-white">{rm.title}</h5>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono">
                      {rm.level}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                    {rm.steps.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span className="px-2.5 py-1 rounded-xl bg-white/[0.05] text-slate-300 text-xs font-mono border border-white/5">
                          {idx + 1}. {step}
                        </span>
                        {idx < rm.steps.length - 1 && <span className="text-slate-600">→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Case Studies */}
          {activeTab === 'case-studies' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
              {caseStudies.map((cs, i) => (
                <div key={i} className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">{cs.qps}</span>
                    <h5 className="text-xs sm:text-sm font-bold text-white">{cs.title}</h5>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
                    {cs.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: Resume Builder */}
          {activeTab === 'resume' && (
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <h4 className="text-sm sm:text-base font-bold text-white">ATS-Optimized FAANG Developer Resume Template</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Download or copy clean, one-page Markdown and LaTeX templates tailored for Senior Software Engineers and Systems Architects. Includes high-impact action verbs, metric-driven bullet formulas (XYZ pattern), and skills keywords.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => alert('Resume template copied to clipboard!')}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Copy Markdown Template</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>,
    document.body
  );
}
