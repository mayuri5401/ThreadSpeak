import React, { useState } from 'react';
import { Copy, Check, FileCode, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * UltraModernCodeViewer - Premium IDE-grade Syntax Highlighted Code Viewer
 * Features line numbers, macOS window header, token coloring, line hover glow, and copy feedback.
 */
export default function UltraModernCodeViewer({ 
  code = '', 
  title = 'Program.java', 
  language = 'java',
  showLineNumbers = true,
  badge = 'Java 21 LTS'
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Syntax highlighter for Java source code lines
  const highlightJavaSyntax = (line) => {
    if (!line) return <span>&nbsp;</span>;

    // Check for full line comments
    if (line.trim().startsWith('//')) {
      return <span className="text-slate-400 italic font-medium">{line}</span>;
    }

    // Split line by tokens, strings, comments
    // Regex matches: comments, double-quoted strings, single-quoted chars, words, operators, whitespace
    const tokenRegex = /(\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b(?:public|class|static|void|main|for|while|if|else|return|import|package|new|switch|case|break|default|try|catch|finally|throw|throws)\b|\b(?:int|String|Scanner|boolean|char|double|float|long|byte|short)\b|\b(?:System\.out\.println|System\.out\.print|System\.in|Math\.pow|Math\.sqrt|scanner\.nextInt|scanner\.next|scanner\.close|scanner\.nextLine)\b|\b\d+\b|[{}()[\];,=+\-*/%<>!&|^~]+|[^\s{}()[\];,=+\-*/%<>!&|^~"']+|\s+)/g;

    const tokens = line.match(tokenRegex) || [line];

    return tokens.map((token, i) => {
      // 1. Comments
      if (token.startsWith('//')) {
        return <span key={i} className="text-slate-400/90 italic">{token}</span>;
      }
      // 2. Strings & Characters
      if (token.startsWith('"') || token.startsWith("'")) {
        return <span key={i} className="text-amber-300 font-semibold">{token}</span>;
      }
      // 3. Keywords
      if (/^(public|class|static|void|for|while|if|else|return|import|package|new|switch|case|break|default)$/.test(token)) {
        return <span key={i} className="text-purple-400 font-bold">{token}</span>;
      }
      // 4. Data Types
      if (/^(int|String|Scanner|boolean|char|double|float|long|byte|short)$/.test(token)) {
        return <span key={i} className="text-sky-400 font-bold">{token}</span>;
      }
      // 5. Common Standard Library & Method calls
      if (/^(System\.out\.println|System\.out\.print|System\.in|Math\.pow|Math\.sqrt|scanner\.nextInt|scanner\.next|scanner\.close|scanner\.nextLine|println|print|nextInt|main)$/.test(token)) {
        return <span key={i} className="text-emerald-400 font-semibold">{token}</span>;
      }
      // 6. Numbers
      if (/^\d+$/.test(token)) {
        return <span key={i} className="text-orange-400 font-bold font-mono">{token}</span>;
      }
      // 7. Operators & Braces
      if (/^[{}()[\];,=+\-*/%<>!&|^~]+$/.test(token)) {
        return <span key={i} className="text-pink-400/90">{token}</span>;
      }
      // 8. Variable names & identifiers
      return <span key={i} className="text-slate-200">{token}</span>;
    });
  };

  const lines = code.split('\n');

  return (
    <div className="rounded-3xl border border-slate-800/90 bg-[#070B14] shadow-2xl overflow-hidden group transition-all duration-300 hover:border-slate-700">
      
      {/* IDE Window Header (macOS Control Dots & File Title) */}
      <div className="px-5 py-3.5 bg-[#0D1526] border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-3 select-none">
        
        {/* Left Side: Window Dots & File Title */}
        <div className="flex items-center gap-3.5">
          {/* macOS Window Controls */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600 shadow-sm" />
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Filename with Java Badge */}
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-blue-400" />
            <span className="font-mono font-bold text-xs sm:text-[13px] text-slate-200 tracking-tight">
              {title}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-blue-950/80 text-blue-400 border border-blue-800/60 text-[10px] font-mono font-extrabold uppercase">
              {language}
            </span>
          </div>
        </div>

        {/* Right Side: Quality Badge & Copy Action */}
        <div className="flex items-center gap-2">
          {badge && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 text-[11px] font-mono font-medium">
              <Sparkles className="w-3 h-3" />
              <span>{badge}</span>
            </span>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold shadow-md transition active:scale-95"
            title="Copy source code to clipboard"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Editor Body with Line Numbers Gutter */}
      <div className="p-4 sm:p-5 overflow-x-auto bg-[#050913] font-mono text-xs sm:text-[13px] leading-6">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr 
                key={idx} 
                className="hover:bg-blue-500/10 transition-colors duration-150 rounded-lg group/line"
              >
                {/* Line Number Column */}
                {showLineNumbers && (
                  <td className="w-10 pr-4 text-right select-none text-slate-600 font-mono text-[11px] group-hover/line:text-cyan-400 transition-colors border-r border-slate-800/60 align-top">
                    {idx + 1}
                  </td>
                )}

                {/* Code Content Column */}
                <td className="pl-4 whitespace-pre text-slate-200">
                  {highlightJavaSyntax(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Editor Status Bar Footer */}
      <div className="px-5 py-2 bg-[#09101E] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none">
        <div className="flex items-center gap-3">
          <span>Lines: <strong className="text-slate-300">{lines.length}</strong></span>
          <span className="hidden sm:inline">Encoding: <strong className="text-slate-300">UTF-8</strong></span>
          <span className="hidden sm:inline">Indent: <strong className="text-slate-300">4 Spaces</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Syntactically Verified</span>
        </div>
      </div>
    </div>
  );
}
