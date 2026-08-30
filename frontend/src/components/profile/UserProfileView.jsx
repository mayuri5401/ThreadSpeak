import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Award, Flame, CheckCircle2, Bookmark, Terminal, 
  Code2, ExternalLink, Trash2, Copy, Check, Eye, Edit3, Shield, 
  Sparkles, Layers, Coffee, Leaf, BarChart3, Clock, Play, ArrowRight,
  TrendingUp, Star, Lock, LogIn
} from 'lucide-react';

const AVATAR_OPTIONS = [
  { id: 'avatar-1', label: 'Tech Lead', bg: 'from-cyan-500 to-blue-600', emoji: '👨‍💻' },
  { id: 'avatar-2', label: 'Architect', bg: 'from-indigo-500 to-purple-600', emoji: '👩‍💻' },
  { id: 'avatar-3', label: 'Java Guru', bg: 'from-amber-500 to-orange-600', emoji: '☕' },
  { id: 'avatar-4', label: 'Cloud Master', bg: 'from-emerald-500 to-teal-600', emoji: '🚀' },
  { id: 'avatar-5', label: 'Code Wizard', bg: 'from-fuchsia-500 to-pink-600', emoji: '🧙‍♂️' },
  { id: 'avatar-6', label: 'Cyber Sentinel', bg: 'from-blue-600 to-cyan-400', emoji: '🤖' },
];

export default function UserProfileView({
  tracks = [],
  allTopics = [],
  completedTopicIds = new Set(),
  bookmarkedTopicIds = new Set(),
  onSelectTopic,
  onOpenPlayground
}) {
  // User profile state stored in localStorage
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      name: 'Mayuri',
      email: 'mayuri@threadspeak.dev',
      title: 'Senior Software Engineer / System Architect',
      targetCompany: 'FAANG / Tier-1 Enterprise',
      bio: 'Mastering Java 21, Spring Boot 3, and Distributed System Design for Staff Level Engineering.',
      avatarId: 'avatar-1',
      joinedDate: 'August 2026',
      streakDays: 7
    };
  });

  // Saved playground solutions from localStorage
  const [savedSolutions, setSavedSolutions] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_saved_solutions');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [
      {
        id: 'sol-default-1',
        title: 'Thread Deadlock & Strict Lock Ordering',
        scenarioId: 'deadlock-simulation',
        category: 'Concurrency',
        code: `public class DeadlockFixDemo {
    private static final Object LockA = new Object();
    private static final Object LockB = new Object();

    public static void main(String[] args) {
        // Global Lock Hierarchy: Always acquire LockA before LockB
        Thread t1 = new Thread(() -> {
            synchronized (LockA) {
                System.out.println("Thread-1: Acquired LockA");
                synchronized (LockB) {
                    System.out.println("Thread-1: Acquired LockB - Work complete!");
                }
            }
        });

        Thread t2 = new Thread(() -> {
            synchronized (LockA) {
                System.out.println("Thread-2: Acquired LockA (Ordered)");
                synchronized (LockB) {
                    System.out.println("Thread-2: Acquired LockB - Safe execution!");
                }
            }
        });

        t1.start();
        t2.start();
    }
}`,
        output: `Thread-1: Acquired LockA\nThread-1: Acquired LockB - Work complete!\nThread-2: Acquired LockA (Ordered)\nThread-2: Acquired LockB - Safe execution!`,
        status: 'Solved ✓',
        savedAt: new Date().toISOString()
      },
      {
        id: 'sol-default-2',
        title: 'Virtual Threads High-Throughput I/O',
        scenarioId: 'virtual-threads-bench',
        category: 'Java 21',
        code: `import java.util.concurrent.*;

public class VirtualThreadsDemo {
    public static void main(String[] args) throws Exception {
        System.out.println("Spawning 1,000 Virtual Threads...");
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 1_000; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    Thread.sleep(10);
                    return taskId;
                });
            }
        }
        System.out.println("✓ 1,000 Virtual Threads completed with zero OS thread overhead!");
    }
}`,
        output: `Spawning 1,000 Virtual Threads...\n✓ 1,000 Virtual Threads completed with zero OS thread overhead!`,
        status: 'Solved ✓',
        savedAt: new Date().toISOString()
      }
    ];
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });
  const [selectedSolutionForModal, setSelectedSolutionForModal] = useState(null);
  const [copiedSolId, setCopiedSolId] = useState(null);
  const [activeTab, setActiveTab] = useState('solutions'); // 'solutions', 'progress', 'bookmarks'
  const [solutionFilter, setSolutionFilter] = useState('all');

  // Save profile to localStorage
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(editForm);
    localStorage.setItem('threadspeak_user_profile', JSON.stringify(editForm));
    setIsEditModalOpen(false);
  };

  // Delete saved solution
  const handleDeleteSolution = (id) => {
    const updated = savedSolutions.filter(s => s.id !== id);
    setSavedSolutions(updated);
    localStorage.setItem('threadspeak_saved_solutions', JSON.stringify(updated));
    if (selectedSolutionForModal?.id === id) {
      setSelectedSolutionForModal(null);
    }
  };

  // Copy code to clipboard
  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedSolId(id);
    setTimeout(() => setCopiedSolId(null), 2000);
  };

  // Metrics calculation
  const totalTopics = allTopics.length || 509;
  const completedCount = completedTopicIds.size;
  const progressPct = Math.min(100, Math.round((completedCount / (totalTopics || 1)) * 100));
  const solvedChallengesCount = savedSolutions.filter(s => s.status?.includes('Solved')).length;
  const calculatedXp = (completedCount * 50) + (savedSolutions.length * 100);
  const currentLevel = Math.max(1, Math.floor(calculatedXp / 500) + 1);

  const selectedAvatar = AVATAR_OPTIONS.find(a => a.id === profile.avatarId) || AVATAR_OPTIONS[0];

  // Filtered saved solutions
  const filteredSolutions = savedSolutions.filter(sol => {
    if (solutionFilter === 'all') return true;
    return (sol.category || '').toLowerCase() === solutionFilter.toLowerCase();
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* 1. Profile Header Hero Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0B1222]/90 via-[#0d1629]/90 to-[#0B1222]/90 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar & User Details */}
          <div className="flex items-center gap-5">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${selectedAvatar.bg} p-1 shadow-2xl shadow-indigo-500/20 shrink-0 relative group`}>
              <div className="w-full h-full bg-[#080D18] rounded-[22px] flex items-center justify-center text-3xl sm:text-4xl">
                {selectedAvatar.emoji}
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-cyan-500 text-slate-950 shadow-md hover:scale-110 transition"
                title="Edit Avatar & Details"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {profile.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/80 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Level {currentLevel}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-xs font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  {profile.streakDays}d Streak
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {profile.title}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  {profile.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-indigo-400 font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  Target: {profile.targetCompany}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Edit Profile / Login</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-8 pt-6 border-t border-slate-800/80 relative z-10">
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Total XP</div>
              <div className="text-lg font-extrabold text-white font-mono">{calculatedXp.toLocaleString()}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Topics Mastered</div>
              <div className="text-lg font-extrabold text-white font-mono">{completedCount} / {totalTopics}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-950/80 border border-indigo-800 text-indigo-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Solved Challenges</div>
              <div className="text-lg font-extrabold text-white font-mono">{savedSolutions.length}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-800 text-amber-400">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Bookmarks</div>
              <div className="text-lg font-extrabold text-white font-mono">{bookmarkedTopicIds.size}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'solutions', label: `Playground Solved Questions (${savedSolutions.length})`, icon: Terminal, color: 'text-cyan-400' },
          { id: 'progress', label: `Curriculum Progress (${progressPct}%)`, icon: BarChart3, color: 'text-emerald-400' },
          { id: 'bookmarks', label: `Saved Bookmarks (${bookmarkedTopicIds.size})`, icon: Bookmark, color: 'text-amber-400' }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition border ${
                isActive
                  ? 'bg-slate-800 text-white border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <Icon className={`w-4 h-4 ${tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Content */}

      {/* TAB A: Playground Solved Coding Questions */}
      {activeTab === 'solutions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                Playground Coding Challenges &amp; Solved Solutions
              </h3>
              <p className="text-xs text-slate-400">
                All coding exercises, custom programs, and concurrency scenarios saved from the Java 21 Playground.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenPlayground && onOpenPlayground()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-600/20"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>New Playground Code</span>
              </button>
            </div>
          </div>

          {savedSolutions.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl border border-dashed border-slate-800 space-y-3">
              <Terminal className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-300">No Saved Playground Solutions Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Write or execute Java 21 code in the Playground and click "Save Solution" to track your solved questions here.
              </p>
              <button
                onClick={() => onOpenPlayground && onOpenPlayground()}
                className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-400 hover:text-white border border-slate-700 text-xs font-bold"
              >
                Launch Java Playground
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSolutions.map((sol, index) => (
                <div
                  key={sol.id}
                  className="glass-panel p-5 rounded-2xl border border-slate-800 bg-[#0B1222]/80 hover:border-slate-700 transition flex flex-col justify-between space-y-4 shadow-xl group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center">
                          #{index + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition line-clamp-1">
                          {sol.title}
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[10px] font-mono font-bold shrink-0">
                        {sol.status || 'Solved ✓'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <span className="px-1.5 py-0.2 rounded bg-slate-800/80 border border-slate-700/60 text-slate-300">
                        {sol.category || 'Java 21'}
                      </span>
                      <span>•</span>
                      <span>{new Date(sol.savedAt).toLocaleDateString()}</span>
                    </div>

                    {/* Code Preview Box */}
                    <div className="p-2.5 rounded-xl bg-[#070B14] border border-slate-900 font-mono text-[11px] text-cyan-300/90 overflow-hidden line-clamp-3">
                      {sol.code}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 gap-2">
                    <button
                      onClick={() => setSelectedSolutionForModal(sol)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>View Code</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenPlayground && onOpenPlayground(sol.code)}
                        className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition"
                        title="Re-open in Playground"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Run</span>
                      </button>

                      <button
                        onClick={() => handleCopyCode(sol.id, sol.code)}
                        className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                        title="Copy Code"
                      >
                        {copiedSolId === sol.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleDeleteSolution(sol.id)}
                        className="p-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/80 text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-800 transition"
                        title="Delete Solution"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB B: Curriculum Progress */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Curriculum Mastery Breakdown
            </h3>
            <p className="text-xs text-slate-400">
              Track your course completion across all four specialized curriculum tracks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tracks.map(track => {
              const trackTopics = allTopics.filter(t => t.trackId === track.id || (track.id === 'system-design' && (t.trackId === 'lld' || t.trackId === 'hld')));
              const completedInTrack = trackTopics.filter(t => completedTopicIds.has(t.id)).length;
              const pct = trackTopics.length > 0 ? Math.round((completedInTrack / trackTopics.length) * 100) : 0;

              return (
                <div key={track.id} className="glass-panel p-5 rounded-2xl border border-slate-800 bg-[#0B1222]/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 font-bold`}>
                        {track.title.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{track.title}</h4>
                        <span className="text-[11px] font-mono text-slate-400">{completedInTrack} of {trackTopics.length} Completed</span>
                      </div>
                    </div>
                    <span className="text-base font-extrabold font-mono text-cyan-400">{pct}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB C: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-400" />
              Saved Bookmarked Lessons
            </h3>
            <p className="text-xs text-slate-400">
              Quickly jump back to lessons you bookmarked for interview revision.
            </p>
          </div>

          {bookmarkedTopicIds.size === 0 ? (
            <div className="glass-panel p-12 text-center rounded-3xl border border-dashed border-slate-800 space-y-2">
              <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-300">No Bookmarks Saved Yet</h4>
              <p className="text-xs text-slate-500">Click the bookmark icon on any topic page to save it for revision.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {allTopics
                .filter(t => bookmarkedTopicIds.has(t.id))
                .map(topic => (
                  <div
                    key={topic.id}
                    onClick={() => onSelectTopic && onSelectTopic(topic.id)}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition cursor-pointer group flex flex-col justify-between space-y-2"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                        {topic.category}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition line-clamp-2">
                        {topic.title}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
                      <span>{topic.estimatedMinutes || 10} mins</span>
                      <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition">
                        Open <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* 4. Edit Profile / Login Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222] shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" />
                Profile &amp; Login Settings
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-mono font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Select Avatar */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 font-mono uppercase">Choose Avatar</label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_OPTIONS.map(av => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setEditForm(prev => ({ ...prev, avatarId: av.id }))}
                      className={`p-2.5 rounded-2xl border text-xl flex items-center justify-center transition ${
                        editForm.avatarId === av.id
                          ? 'border-cyan-400 bg-cyan-950/80 ring-2 ring-cyan-400/50 scale-105'
                          : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      {av.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 font-mono uppercase">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-medium"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 font-mono uppercase">Email Address</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-medium"
                  required
                />
              </div>

              {/* Title / Role */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 font-mono uppercase">Current Title / Role</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-medium"
                />
              </div>

              {/* Target Company */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 font-mono uppercase">Target Company / Level</label>
                <input
                  type="text"
                  value={editForm.targetCompany}
                  onChange={(e) => setEditForm({ ...editForm, targetCompany: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-600/30"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. View Solution Modal */}
      {selectedSolutionForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-2xl max-h-[85vh] p-6 rounded-3xl border border-slate-800 bg-[#0B1222] shadow-2xl flex flex-col justify-between space-y-4 overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  {selectedSolutionForModal.title}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  Saved on {new Date(selectedSolutionForModal.savedAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedSolutionForModal(null)}
                className="text-slate-400 hover:text-white text-lg font-mono font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-300 font-mono uppercase">Java 21 Source Code</span>
                <pre className="p-4 rounded-2xl bg-[#070B14] border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                  {selectedSolutionForModal.code}
                </pre>
              </div>

              {selectedSolutionForModal.output && (
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-300 font-mono uppercase">Execution Console Output</span>
                  <pre className="p-3.5 rounded-2xl bg-[#04070F] border border-slate-900 font-mono text-xs text-emerald-400 overflow-x-auto">
                    {selectedSolutionForModal.output}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                onClick={() => handleCopyCode(selectedSolutionForModal.id, selectedSolutionForModal.code)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold flex items-center gap-1.5"
              >
                {copiedSolId === selectedSolutionForModal.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSolId === selectedSolutionForModal.id ? 'Copied' : 'Copy Code'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onOpenPlayground) {
                      onOpenPlayground(selectedSolutionForModal.code);
                    }
                    setSelectedSolutionForModal(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-600/20"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Open in Playground</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
