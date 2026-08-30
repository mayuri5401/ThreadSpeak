import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Zap, ShieldAlert, CheckCircle2, Shield, Activity, Plus } from 'lucide-react';

export default function RateLimiterVisualizer() {
  const capacity = 8;
  const refillRatePerSec = 1; // 1 token per second
  const [tokens, setTokens] = useState(8);
  const [allowedRequests, setAllowedRequests] = useState(0);
  const [throttledRequests, setThrottledRequests] = useState(0);
  const [logs, setLogs] = useState([
    'Token Bucket Rate Limiter active. Capacity: 8 tokens | Refill: 1 token/sec.'
  ]);
  const [lastOutcome, setLastOutcome] = useState(null); // 'allowed', 'throttled'

  // Automatic token refill timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTokens(prev => {
        if (prev < capacity) {
          return Math.min(capacity, prev + 1);
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [capacity]);

  const handleSendRequest = () => {
    if (tokens >= 1) {
      setTokens(prev => prev - 1);
      setAllowedRequests(prev => prev + 1);
      setLastOutcome('allowed');
      setLogs(prev => [
        `[HTTP 200 OK] Request allowed! Token consumed. Remaining: ${tokens - 1}/${capacity}`,
        ...prev.slice(0, 8)
      ]);
    } else {
      setThrottledRequests(prev => prev + 1);
      setLastOutcome('throttled');
      setLogs(prev => [
        `[HTTP 429 TOO MANY REQUESTS] Rate limited! Bucket empty (0/${capacity}). Request dropped.`,
        ...prev.slice(0, 8)
      ]);
    }
  };

  const handleBurst = () => {
    let success = 0;
    let failed = 0;
    setTokens(prev => {
      let current = prev;
      for (let i = 0; i < 5; i++) {
        if (current >= 1) {
          current -= 1;
          success++;
        } else {
          failed++;
        }
      }
      return current;
    });

    setAllowedRequests(prev => prev + success);
    setThrottledRequests(prev => prev + failed);
    setLastOutcome(failed > 0 ? 'throttled' : 'allowed');
    setLogs(prev => [
      `[Traffic Burst 5 Requests] Allowed: ${success} | Throttled (429): ${failed}`,
      ...prev.slice(0, 8)
    ]);
  };

  const handleReset = () => {
    setTokens(8);
    setAllowedRequests(0);
    setThrottledRequests(0);
    setLastOutcome(null);
    setLogs(['Rate limiter reset to full capacity.']);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 bg-[#0B1222]/80 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></div>
            <h3 className="text-xl font-bold text-white tracking-wide">Interactive Token Bucket Rate Limiter</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800/60">
              Traffic Shaping
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Observe real-time lazy token regeneration, traffic bursts, and HTTP 429 throttle limits.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSendRequest}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/20 transition"
          >
            <Zap className="w-4 h-4" /> Send Request
          </button>
          <button
            onClick={handleBurst}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition"
          >
            <Plus className="w-4 h-4" /> Burst 5 Requests
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
            title="Reset Rate Limiter"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Visual Token Bucket Chamber */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Bucket Visualization Chamber */}
        <div className="md:col-span-6 bg-[#080D18] p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Bucket Capacity ({capacity} Max)</span>
            <span className="text-emerald-400">Refill: +1 Token / sec</span>
          </div>

          {/* Tokens Grid Container */}
          <div className="min-h-[140px] p-4 rounded-2xl bg-[#0F172A] border-2 border-dashed border-amber-500/40 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: capacity }).map((_, idx) => {
              const hasToken = idx < tokens;
              return (
                <div
                  key={idx}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                    hasToken
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/30 scale-100'
                      : 'bg-slate-900 border-slate-800 text-slate-700 scale-90'
                  }`}
                >
                  <Zap className={`w-5 h-5 ${hasToken ? 'fill-current' : 'text-slate-700'}`} />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Available Balance:</span>
            <span className="text-lg font-bold text-amber-400">{tokens} Tokens</span>
          </div>
        </div>

        {/* Real-time Telemetry & Traffic Counters */}
        <div className="md:col-span-6 space-y-3">
          <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 space-y-2">
            <span className="text-xs font-mono text-slate-400">Traffic Ingress Status</span>
            <div className="flex items-center gap-3">
              {lastOutcome === 'allowed' && (
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" /> HTTP 200 Allowed
                </div>
              )}
              {lastOutcome === 'throttled' && (
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <ShieldAlert className="w-5 h-5" /> HTTP 429 Throttled (Drop)
                </div>
              )}
              {!lastOutcome && (
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Activity className="w-4 h-4" /> Ready for incoming traffic
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
              <span className="text-[11px] font-mono text-slate-400 block">Allowed Total</span>
              <span className="text-xl font-bold font-mono text-emerald-400">{allowedRequests}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30">
              <span className="text-[11px] font-mono text-slate-400 block">Throttled Total</span>
              <span className="text-xl font-bold font-mono text-rose-400">{throttledRequests}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Feed */}
      <div className="bg-[#080D18] p-3.5 rounded-xl border border-slate-800 space-y-1.5 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800">
          <span>Rate Limiting Gateway Logs</span>
          <span className="text-amber-400">Token Bucket Filter</span>
        </div>
        <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
          {logs.map((log, index) => (
            <div key={index} className={`flex items-start gap-2 ${index === 0 ? 'text-amber-300 font-semibold' : 'text-slate-400'}`}>
              <span className="text-slate-600 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
