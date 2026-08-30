import React from 'react';
import { 
  CheckCircle2, Circle, Trophy, ArrowRight, BookOpen, 
  RotateCcw, Sparkles, Coffee, Leaf, Layers, Code, CheckCircle 
} from 'lucide-react';

export default function ProgressView({ 
  tracks = [], 
  allTopics = [], 
  completedTopicIds = new Set(), 
  onSelectTopic, 
  onToggleComplete 
}) {
  const totalTopics = allTopics.length || 58;
  const completedCount = completedTopicIds.size;
  const percentage = Math.min(100, Math.round((completedCount / totalTopics) * 100));

  const trackIcons = {
    'core-java': Coffee,
    'spring-boot': Leaf,
    'system-design': Layers,
    'dsa': Code
  };

  const trackColors = {
    'core-java': 'text-amber-400 border-amber-500/40 bg-amber-500/10',
    'spring-boot': 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    'system-design': 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10',
    'dsa': 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10'
  };

  const trackGradients = {
    'core-java': 'from-amber-500 to-orange-600',
    'spring-boot': 'from-emerald-500 to-teal-600',
    'system-design': 'from-indigo-500 to-purple-600',
    'dsa': 'from-cyan-500 to-blue-600'
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Main Overall Progress Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/90 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Sparkles className="w-3.5 h-3.5" /> Learning Progress Tracker
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Your Course Completion
            </h2>
            <p className="text-sm text-slate-400 max-w-md">
              Whenever you click <span className="text-emerald-400 font-semibold">"Mark Complete"</span> on any lesson, your progress updates here in real-time.
            </p>
          </div>

          {/* Big Circular / Percentage Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-center shrink-0 min-w-[180px]">
            <div className="text-4xl font-extrabold text-white tracking-tight">
              {percentage}%
            </div>
            <div className="text-xs font-mono text-cyan-400 mt-1 font-semibold">
              {completedCount} / {totalTopics} Completed
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Breakdown by Track */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Track-by-Track Completion</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tracks.map(t => {
            const Icon = trackIcons[t.id] || BookOpen;
            const trackTopics = allTopics.filter(top => top.trackId === t.id);
            const trackTotal = trackTopics.length || t.totalTopics || 1;
            const trackCompleted = trackTopics.filter(top => completedTopicIds.has(top.id)).length;
            const trackPct = Math.min(100, Math.round((trackCompleted / trackTotal) * 100));

            return (
              <div 
                key={t.id}
                className="glass-panel p-5 rounded-2xl border border-slate-800 bg-[#0B1222]/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl border ${trackColors[t.id] || 'text-cyan-400 border-cyan-800'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{t.shortTitle || t.title}</h4>
                      <span className="text-[11px] font-mono text-slate-400">
                        {trackCompleted} of {trackTotal} lessons done
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-white font-mono">
                    {trackPct}%
                  </span>
                </div>

                {/* Track Progress Bar */}
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className={`bg-gradient-to-r ${trackGradients[t.id] || 'from-cyan-500 to-blue-500'} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${trackPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Topics List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Completed Topics ({completedCount})</span>
          </h3>
        </div>

        {completedCount === 0 ? (
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-2 text-slate-400 text-xs">
            <Circle className="w-8 h-8 mx-auto text-slate-600" />
            <p className="font-semibold text-slate-300">No topics marked as completed yet.</p>
            <p>Go to any topic, study the notes, and click "Mark Complete" to track your journey.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {allTopics
              .filter(top => completedTopicIds.has(top.id))
              .map(top => (
                <div 
                  key={top.id}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-950/60 flex items-center justify-between gap-3 hover:border-emerald-500/40 transition group"
                >
                  <button
                    onClick={() => onSelectTopic && onSelectTopic(top.id)}
                    className="flex items-center gap-2.5 text-left min-w-0"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="truncate">
                      <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition truncate block">
                        {top.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {top.category}
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => onToggleComplete && onToggleComplete(top.id)}
                    className="text-[10px] font-mono text-slate-500 hover:text-rose-400 px-2 py-1 rounded bg-slate-950 border border-slate-800 shrink-0"
                    title="Unmark as complete"
                  >
                    Unmark
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
