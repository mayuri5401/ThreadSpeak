import React, { useState } from 'react';
import { Plus, Search, RotateCcw, Database, ArrowLeftRight, Check, AlertCircle, Trash2 } from 'lucide-react';

export default function LruCacheVisualizer() {
  const capacity = 4;
  const [nodes, setNodes] = useState([
    { key: 'user:1', value: 'Alice', hits: 3 },
    { key: 'user:2', value: 'Bob', hits: 1 },
    { key: 'user:3', value: 'Charlie', hits: 2 },
  ]);
  const [inputKey, setInputKey] = useState('user:4');
  const [inputValue, setInputValue] = useState('David');
  const [searchKey, setSearchKey] = useState('user:2');
  const [lastAction, setLastAction] = useState({ type: 'init', msg: 'LRU Cache initialized with capacity 4.' });
  const [highlightKey, setHighlightKey] = useState(null);

  const handlePut = (k = inputKey, v = inputValue) => {
    if (!k) return;
    const existingIndex = nodes.findIndex(n => n.key === k);

    if (existingIndex !== -1) {
      // Update existing & move to Head
      const existing = nodes[existingIndex];
      const updated = { ...existing, value: v, hits: existing.hits + 1 };
      const filtered = nodes.filter((_, idx) => idx !== existingIndex);
      setNodes([updated, ...filtered]);
      setHighlightKey(k);
      setLastAction({
        type: 'hit',
        msg: `Key '${k}' exists! Updated value to '${v}' and moved to HEAD (Most Recently Used).`
      });
    } else {
      // Insert new
      let currentNodes = [...nodes];
      let evicted = null;

      if (currentNodes.length >= capacity) {
        evicted = currentNodes[currentNodes.length - 1];
        currentNodes.pop(); // Evict LRU (tail.prev)
      }

      const newNode = { key: k, value: v, hits: 1 };
      setNodes([newNode, ...currentNodes]);
      setHighlightKey(k);

      if (evicted) {
        setLastAction({
          type: 'evict',
          msg: `Capacity exceeded! Evicted '${evicted.key}' from TAIL (Least Recently Used) and added '${k}' to HEAD.`
        });
      } else {
        setLastAction({
          type: 'put',
          msg: `Added new key '${k}' to HEAD (MRU). Current size: ${currentNodes.length + 1}/${capacity}.`
        });
      }
    }
  };

  const handleGet = (k = searchKey) => {
    if (!k) return;
    const existingIndex = nodes.findIndex(n => n.key === k);

    if (existingIndex !== -1) {
      const target = nodes[existingIndex];
      const updated = { ...target, hits: target.hits + 1 };
      const filtered = nodes.filter((_, idx) => idx !== existingIndex);
      setNodes([updated, ...filtered]);
      setHighlightKey(k);
      setLastAction({
        type: 'hit',
        msg: `[CACHE HIT] Found '${k}' -> '${target.value}'. Detached and moved to HEAD (MRU).`
      });
    } else {
      setHighlightKey(null);
      setLastAction({
        type: 'miss',
        msg: `[CACHE MISS] Key '${k}' not found in Hash Map! Requires DB lookup.`
      });
    }
  };

  const handleReset = () => {
    setNodes([
      { key: 'user:1', value: 'Alice', hits: 1 },
      { key: 'user:2', value: 'Bob', hits: 1 }
    ]);
    setLastAction({ type: 'init', msg: 'Cache reset to initial state.' });
    setHighlightKey(null);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-indigo-500/20 bg-[#0B1222]/80 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-400 animate-pulse"></div>
            <h3 className="text-xl font-bold text-white tracking-wide">LRU Cache &amp; HashMap Bucketing Animator</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/60">
              O(1) Data Structure
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Visualizing the synergy of Hash Map (O(1) index lookup) and Doubly Linked List (O(1) Head insertion &amp; Tail eviction).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            Capacity: <strong className="text-cyan-400">{nodes.length}</strong> / {capacity}
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
            title="Reset Cache"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Put Operation Form */}
        <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> put(key, value) [O(1)]
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputKey}
              onChange={e => setInputKey(e.target.value)}
              placeholder="Key (e.g. user:4)"
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            />
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Value"
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={() => handlePut()}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-md shadow-cyan-600/20 transition"
            >
              Put
            </button>
          </div>
        </div>

        {/* Get Operation Form */}
        <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5" /> get(key) [O(1)]
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)}
              placeholder="Key to lookup..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => handleGet()}
              className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs shadow-md shadow-purple-600/20 transition"
            >
              Get
            </button>
          </div>
        </div>
      </div>

      {/* Doubly Linked List Visual Sequence */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Doubly Linked List (Head = MRU, Tail = LRU)</span>
          <span className="text-cyan-400">O(1) Detach &amp; Attach</span>
        </div>

        <div className="p-4 rounded-xl bg-[#080D18] border border-slate-800 overflow-x-auto">
          <div className="flex items-center min-w-[650px] gap-2">
            {/* Dummy HEAD */}
            <div className="px-3 py-4 rounded-xl bg-cyan-950/70 border border-cyan-500/50 text-center shrink-0">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">Dummy</span>
              <span className="text-xs font-bold text-white">HEAD (MRU)</span>
            </div>

            <ArrowLeftRight className="w-4 h-4 text-cyan-500 shrink-0" />

            {/* Dynamic Nodes */}
            {nodes.map((node, index) => {
              const isHighlight = node.key === highlightKey;
              return (
                <React.Fragment key={node.key}>
                  <div
                    className={`p-3.5 rounded-xl border transition-all shrink-0 w-36 ${
                      isHighlight
                        ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400 scale-105'
                        : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="font-bold text-cyan-300 truncate">{node.key}</span>
                      <span className="text-[10px] text-slate-500">#{index + 1}</span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate mt-1">
                      {node.value}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-2 pt-1 border-t border-slate-800">
                      <span>Accesses:</span>
                      <span className="text-purple-300 font-bold">{node.hits}</span>
                    </div>
                  </div>

                  {index < nodes.length - 1 && (
                    <ArrowLeftRight className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}

            {nodes.length > 0 && <ArrowLeftRight className="w-4 h-4 text-rose-500 shrink-0" />}

            {/* Dummy TAIL */}
            <div className="px-3 py-4 rounded-xl bg-rose-950/70 border border-rose-500/50 text-center shrink-0">
              <span className="text-[10px] font-mono text-rose-400 uppercase font-bold block">Dummy</span>
              <span className="text-xs font-bold text-white">TAIL (LRU)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operation Log Feedback Alert */}
      <div className={`p-3.5 rounded-xl border font-mono text-xs flex items-start gap-2.5 ${
        lastAction.type === 'hit' 
          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
          : lastAction.type === 'miss'
          ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
          : lastAction.type === 'evict'
          ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
          : 'bg-slate-900 border-slate-800 text-slate-300'
      }`}>
        {lastAction.type === 'hit' && <Check className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />}
        {lastAction.type === 'miss' && <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />}
        {lastAction.type === 'evict' && <Trash2 className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />}
        {lastAction.type === 'init' && <Database className="w-4 h-4 shrink-0 text-cyan-400 mt-0.5" />}
        <div>
          <strong className="uppercase font-bold tracking-wider mr-2">[{lastAction.type}]:</strong>
          <span>{lastAction.msg}</span>
        </div>
      </div>
    </div>
  );
}
