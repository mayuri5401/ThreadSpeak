import React, { useState } from 'react';
import { Play, Globe, ShieldCheck, Server, Database, Zap, AlertTriangle, RefreshCw, Cpu, Activity } from 'lucide-react';
import { simulateHldApi } from '../../microfrontends/mfe-code-runner/services/codeRunnerApiClient';

export default function HldTrafficSimulator() {
  const [pattern, setPattern] = useState('normal'); // 'normal', 'spike', 'cache_down', 'db_failover'
  const [metrics, setMetrics] = useState({
    qps: 4500,
    latencyMs: 8,
    cacheHitRate: 91.0,
    dbCpuPct: 18,
    errorRatePct: 0.0
  });
  const [logs, setLogs] = useState([
    '[Steady State] Global traffic routing through Anycast CDN and API Gateway. All 3 microservice pods operating with <10ms response.'
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const applyPattern = async (newPattern) => {
    setPattern(newPattern);
    setIsLoading(true);
    const res = await simulateHldApi(newPattern);
    setIsLoading(false);

    if (res.metrics) {
      setMetrics(res.metrics);
    }
    if (res.logs) {
      setLogs(res.logs);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 bg-[#0B1222]/80 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
            <h3 className="text-xl font-bold text-white tracking-wide">High-Level System Design Traffic Simulator</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-950 text-purple-300 border border-purple-800/60">
              Distributed Architecture
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Simulate live traffic bursts, cache stampedes, and database failovers across a multi-tier distributed microservice architecture.
          </p>
        </div>

        {/* Traffic Pattern Selector Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => applyPattern('normal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              pattern === 'normal'
                ? 'bg-emerald-600 border-emerald-500 text-white font-bold shadow-md shadow-emerald-600/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Normal (5k QPS)
          </button>
          <button
            onClick={() => applyPattern('spike')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              pattern === 'spike'
                ? 'bg-cyan-600 border-cyan-500 text-white font-bold shadow-md shadow-cyan-600/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Flash Sale (85k QPS)
          </button>
          <button
            onClick={() => applyPattern('cache_down')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              pattern === 'cache_down'
                ? 'bg-amber-600 border-amber-500 text-white font-bold shadow-md shadow-amber-600/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            Cache Outage
          </button>
          <button
            onClick={() => applyPattern('db_failover')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              pattern === 'db_failover'
                ? 'bg-rose-600 border-rose-500 text-white font-bold shadow-md shadow-rose-600/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            DB Failover
          </button>
        </div>
      </div>

      {/* Real-time System Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3 rounded-xl bg-[#0F172A] border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">Total Ingress QPS</span>
          <span className="text-lg font-bold font-mono text-cyan-400">{metrics.qps.toLocaleString()} /s</span>
        </div>
        <div className="p-3 rounded-xl bg-[#0F172A] border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">P99 Latency</span>
          <span className={`text-lg font-bold font-mono ${metrics.latencyMs > 100 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {metrics.latencyMs} ms
          </span>
        </div>
        <div className="p-3 rounded-xl bg-[#0F172A] border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">Redis Hit Rate</span>
          <span className={`text-lg font-bold font-mono ${metrics.cacheHitRate < 50 ? 'text-amber-400' : 'text-purple-400'}`}>
            {metrics.cacheHitRate}%
          </span>
        </div>
        <div className="p-3 rounded-xl bg-[#0F172A] border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">DB CPU Load</span>
          <span className={`text-lg font-bold font-mono ${metrics.dbCpuPct > 80 ? 'text-rose-400' : 'text-cyan-300'}`}>
            {metrics.dbCpuPct}%
          </span>
        </div>
        <div className="p-3 rounded-xl bg-[#0F172A] border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block">Error Rate</span>
          <span className={`text-lg font-bold font-mono ${metrics.errorRatePct > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {metrics.errorRatePct}%
          </span>
        </div>
      </div>

      {/* Architectural Node Topology Map */}
      <div className="p-5 rounded-2xl bg-[#080D18] border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Layer 1: Client & CDN */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-center space-y-1">
              <Globe className="w-5 h-5 text-cyan-400 mx-auto" />
              <span className="text-xs font-bold text-white block">Global Clients</span>
              <span className="text-[10px] font-mono text-cyan-300">Web, iOS, Android</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-center space-y-1">
              <Zap className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="text-xs font-bold text-white block">Cloudflare CDN Edge</span>
              <span className="text-[10px] font-mono text-emerald-300">60% Static Cache Hit</span>
            </div>
          </div>

          {/* Layer 2: API Gateway / Load Balancer */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/50 text-center space-y-2">
            <ShieldCheck className="w-6 h-6 text-purple-400 mx-auto" />
            <span className="text-xs font-bold text-white block">API Gateway &amp; NGINX</span>
            <div className="text-[10px] font-mono text-slate-300 space-y-0.5">
              <div>JWT Auth Verification</div>
              <div>Rate Limiting (Token Bucket)</div>
              <div>L7 Path Routing</div>
            </div>
            <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
              Round Robin Active
            </span>
          </div>

          {/* Layer 3: Microservice Pods */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-400 text-center block">Spring Boot App Pods</span>
            {[1, 2, 3].map(pod => (
              <div key={pod} className="p-2.5 rounded-lg bg-slate-900/90 border border-blue-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono text-slate-200">Pod-0{pod}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  HEALTHY
                </span>
              </div>
            ))}
          </div>

          {/* Layer 4: Redis Cache & PostgreSQL DB */}
          <div className="space-y-3">
            <div className={`p-3.5 rounded-xl border text-center space-y-1 transition-colors ${
              pattern === 'cache_down'
                ? 'bg-rose-950/60 border-rose-500 animate-pulse'
                : 'bg-slate-900/90 border-amber-500/40'
            }`}>
              <Zap className={`w-5 h-5 mx-auto ${pattern === 'cache_down' ? 'text-rose-400' : 'text-amber-400'}`} />
              <span className="text-xs font-bold text-white block">Redis In-Memory Cache</span>
              <span className="text-[10px] font-mono text-amber-300">
                {pattern === 'cache_down' ? 'OFFLINE (STAMPEDE)' : 'Cluster Master/Replica'}
              </span>
            </div>

            <div className={`p-3.5 rounded-xl border text-center space-y-1 transition-colors ${
              pattern === 'db_failover'
                ? 'bg-amber-950/60 border-amber-500'
                : 'bg-slate-900/90 border-indigo-500/40'
            }`}>
              <Database className="w-5 h-5 text-indigo-400 mx-auto" />
              <span className="text-xs font-bold text-white block">PostgreSQL Primary + Replicas</span>
              <span className="text-[10px] font-mono text-indigo-300">
                {pattern === 'db_failover' ? 'Replica-02 Promoted' : 'Master-Slave Replication'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Telemetry Logs */}
      <div className="bg-[#080D18] p-3.5 rounded-xl border border-slate-800 space-y-1.5 font-mono text-xs">
        <div className="flex items-center justify-between text-slate-400 text-[11px] pb-1 border-b border-slate-800">
          <span>Distributed Traffic Telemetry</span>
          <span className="text-purple-400">Live Traffic Trace</span>
        </div>
        <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
          {logs.map((log, index) => (
            <div key={index} className={`flex items-start gap-2 ${index === 0 ? 'text-purple-300 font-semibold' : 'text-slate-400'}`}>
              <span className="text-slate-600 select-none">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
