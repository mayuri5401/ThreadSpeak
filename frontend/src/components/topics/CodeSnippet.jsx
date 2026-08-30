import React, { useState } from 'react';
import { Copy, Check, Terminal, Play } from 'lucide-react';

export default function CodeSnippet({ code, language = 'java', title, onRunInPlayground, keyHighlights }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0A0F1D] overflow-hidden shadow-xl space-y-0">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0F172A] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-semibold text-slate-200">
            {title || `${language.toUpperCase()} Implementation`}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-400 border border-slate-700">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onRunInPlayground && (
            <button
              onClick={onRunInPlayground}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-600/90 hover:bg-cyan-500 text-white text-xs font-medium transition shadow-sm shadow-cyan-500/20"
            >
              <Play className="w-3 h-3 fill-current" /> Run in Playground
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition border border-slate-700"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-xs text-slate-200 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>

      {/* Key Highlights Pill Row */}
      {keyHighlights && Object.keys(keyHighlights).length > 0 && (
        <div className="px-4 py-2.5 bg-[#0D1426] border-t border-slate-800 flex flex-wrap gap-2 text-xs font-mono">
          <span className="text-slate-500 text-[11px] uppercase mr-1 flex items-center">Key Highlights:</span>
          {Object.entries(keyHighlights).map(([k, v]) => (
            <span key={k} className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
              <strong className="text-cyan-400">{k}:</strong> {v}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
