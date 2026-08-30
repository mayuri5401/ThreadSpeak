import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import mermaid from 'mermaid';

// Initialize mermaid with rich dark theme and suppressed error rendering
mermaid.initialize({
  startOnLoad: false,
  suppressErrorRendering: true,
  theme: 'dark',
  themeVariables: {
    darkMode: true,
    background: '#0B101D',
    primaryColor: '#1E293B',
    primaryTextColor: '#F8FAFC',
    primaryBorderColor: '#38BDF8',
    lineColor: '#00CEFF',
    secondaryColor: '#0F172A',
    tertiaryColor: '#1E1B4B',
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px'
  },
  securityLevel: 'loose'
});

let mermaidCounter = 0;

// Configure marked with custom elements
marked.use({
  gfm: true,
  breaks: true,
  renderer: {
    // 1. HEADINGS: Large, bold, visual accents with balanced compact spacing
    heading(token) {
      const depth = token.depth || 1;
      const text = token.tokens && this.parser ? this.parser.parseInline(token.tokens) : (token.text || '');

      if (depth === 1) {
        return `
          <div class="topic-header-banner mt-1 mb-5 pb-3 border-b border-slate-800/80">
            <h1 class="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-300 tracking-tight flex items-center gap-3">
              ${text}
            </h1>
          </div>
        `;
      }
      if (depth === 2) {
        return `
          <div class="section-heading-wrapper mt-6 mb-3">
            <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span class="w-2.5 h-5 rounded-full bg-gradient-to-b from-cyan-400 to-blue-600 inline-block shadow-md shadow-cyan-500/30"></span>
              <span>${text}</span>
            </h2>
          </div>
        `;
      }
      if (depth === 3) {
        return `
          <h3 class="text-base sm:text-lg font-bold text-cyan-300 mt-4 mb-2 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span>${text}</span>
          </h3>
        `;
      }
      if (depth === 4) {
        return `
          <h4 class="text-sm font-bold text-slate-200 uppercase tracking-wider mt-3 mb-1.5">
            ${text}
          </h4>
        `;
      }
      return `<h${depth} class="font-bold text-white mt-3 mb-1.5">${text}</h${depth}>`;
    },

    // 2. TABLES: High-contrast glassmorphic card tables for Marked v18+
    table(token) {
      let headerHtml = '';
      let bodyHtml = '';

      if (token && Array.isArray(token.header)) {
        // Marked v14+ / v18+ token structure
        const headerCells = token.header.map(cell => {
          const content = cell.tokens && this.parser ? this.parser.parseInline(cell.tokens) : (cell.text || '');
          return `<th class="px-4 py-3 bg-gradient-to-r from-[#0C1427] via-slate-900 to-[#0C1427] text-cyan-300 font-bold uppercase tracking-wider text-xs border-b border-slate-700/80">${content}</th>`;
        }).join('');
        headerHtml = `<tr class="border-b border-slate-700/80">${headerCells}</tr>`;

        if (Array.isArray(token.rows)) {
          bodyHtml = token.rows.map(row => {
            const rowCells = row.map(cell => {
              const content = cell.tokens && this.parser ? this.parser.parseInline(cell.tokens) : (cell.text || '');
              return `<td class="px-4 py-3 text-xs sm:text-sm text-slate-200 hover:bg-cyan-950/20 transition">${content}</td>`;
            }).join('');
            return `<tr class="hover:bg-slate-900/40">${rowCells}</tr>`;
          }).join('');
        }
      } else if (typeof token === 'object' && token.header && typeof token.header === 'string') {
        headerHtml = token.header;
        bodyHtml = token.body || '';
      }

      return `
        <div class="my-4 rounded-2xl overflow-hidden border border-slate-700/80 bg-[#0B101D] shadow-xl shadow-cyan-950/20">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>${headerHtml}</thead>
              <tbody class="divide-y divide-slate-800/80">${bodyHtml}</tbody>
            </table>
          </div>
        </div>
      `;
    },

    // 3. BLOCKQUOTES & ALERTS: Glowing Illuminated Cards
    blockquote(token) {
      const text = token.tokens && this.parser ? this.parser.parse(token.tokens) : (token.text || '');
      return `
        <div class="my-4 p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-cyan-950/30 border border-cyan-500/40 shadow-lg shadow-cyan-950/20 relative overflow-hidden">
          <div class="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div class="flex items-start gap-3 relative z-10">
            <div class="p-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shrink-0 mt-0.5 shadow-sm">
              💡
            </div>
            <div class="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium space-y-1.5">
              ${text}
            </div>
          </div>
        </div>
      `;
    },

    // 4. HORIZONTAL RULE: Glowing divider
    hr() {
      return `
        <div class="my-6 flex items-center justify-center">
          <div class="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        </div>
      `;
    },

    // 5. PARAGRAPHS: Generous letter-spacing (character spacing) & line height
    paragraph(token) {
      const text = token.tokens && this.parser ? this.parser.parseInline(token.tokens) : (token.text || '');
      return `<p class="text-slate-200 text-[14.5px] sm:text-[15px] leading-[1.85] tracking-[0.025em] my-3.5">${text}</p>`;
    },

    // 6. LIST ITEMS: Comfortable vertical breathing room & character spacing
    listitem(token) {
      const text = token.tokens && this.parser ? this.parser.parse(token.tokens) : (token.text || '');
      return `<li class="text-slate-200 text-[14px] sm:text-[14.5px] leading-[1.8] tracking-[0.025em] my-2">${text}</li>`;
    },

    // 5. MERMAID & CODE BLOCKS
    code(token) {
      const text = token.text || '';
      const lang = token.lang || '';

      if (lang === 'mermaid' || lang === 'mermaid-diagram') {
        const id = `mermaid-svg-${Date.now()}-${++mermaidCounter}`;
        return `
          <div class="mermaid-diagram-card my-6 rounded-2xl overflow-hidden border border-cyan-500/40 bg-[#0B101D] shadow-2xl shadow-cyan-950/20">
            <div class="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-[#080D1A] via-slate-900 to-[#080D1A] border-b border-slate-800">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block shadow-sm"></span>
                <span class="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block shadow-sm"></span>
                <span class="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block shadow-sm"></span>
                <span class="ml-2 text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center gap-1">
                  <span>📐</span> ARCHITECTURE DIAGRAM
                </span>
              </div>
              <button 
                type="button" 
                class="copy-code-btn text-[11px] font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition flex items-center gap-1.5 cursor-pointer"
                data-code="${encodeURIComponent(text)}"
              >
                <span>📋 Copy Diagram</span>
              </button>
            </div>
            <div class="mermaid-target p-6 flex items-center justify-center overflow-x-auto min-h-[120px] bg-gradient-to-b from-[#0B101D] to-[#070B14]" id="${id}" data-mermaid-code="${encodeURIComponent(text)}">
              <div class="text-xs text-slate-400 flex items-center gap-2 font-mono py-4 animate-pulse">
                <span class="w-3 h-3 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></span>
                <span>Rendering Architecture Diagram...</span>
              </div>
            </div>
          </div>
        `;
      }

      // Standard Code Blocks with Highlight.js
      const validLang = lang && hljs.getLanguage(lang) ? lang : '';
      const highlighted = validLang 
        ? hljs.highlight(text, { language: validLang, ignoreIllegals: true }).value
        : hljs.highlightAuto(text).value;

      const displayLang = (lang || 'code').toUpperCase();

      return `
        <div class="code-block-wrapper my-4 rounded-2xl overflow-hidden border border-slate-700/70 bg-[#0B101D] shadow-xl">
          <div class="flex items-center justify-between px-4 py-2.5 bg-[#080D1A] border-b border-slate-800">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block shadow-sm"></span>
              <span class="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block shadow-sm"></span>
              <span class="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block shadow-sm"></span>
              <span class="ml-2 text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300">
                ${displayLang}
              </span>
            </div>
            <button 
              type="button" 
              class="copy-code-btn text-[11px] font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition flex items-center gap-1.5 cursor-pointer"
              data-code="${encodeURIComponent(text)}"
            >
              <span>📋 Copy</span>
            </button>
          </div>
          <div class="p-4 sm:p-5 overflow-x-auto text-[13px] sm:text-[14px] leading-relaxed font-mono">
            <pre class="!bg-transparent !p-0 !m-0 !border-0"><code class="hljs ${validLang ? `language-${validLang}` : ''}">${highlighted}</code></pre>
          </div>
        </div>
      `;
    }
  }
});

export default function MarkdownRenderer({ content, activeSpokenText = '', className = '' }) {
  const containerRef = useRef(null);

  if (!content) return null;

  const html = marked.parse(content);

  // Render dynamic Mermaid SVGs with clean error recovery
  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up any stray mermaid error elements in document body
    document.querySelectorAll('[id^="dmermaid"], [id^="mermaid-error"]').forEach(el => el.remove());

    const mermaidTargets = containerRef.current.querySelectorAll('.mermaid-target');

    mermaidTargets.forEach(async (target) => {
      const rawCode = decodeURIComponent(target.getAttribute('data-mermaid-code') || '');
      if (rawCode && target.id) {
        try {
          const renderId = `svg-${target.id}-${Math.floor(Math.random() * 10000)}`;
          const { svg } = await mermaid.render(renderId, rawCode);
          target.innerHTML = `<div class="w-full flex justify-center py-2 animate-in fade-in zoom-in-95 duration-300">${svg}</div>`;
        } catch (err) {
          console.warn('[MermaidRenderer] Render fallback for:', rawCode, err);
          // Remove any global error divs created by mermaid during render failure
          document.querySelectorAll('[id^="dmermaid"], [id^="mermaid-error"]').forEach(el => el.remove());
          target.innerHTML = `
            <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 w-full overflow-x-auto">
              <pre class="text-cyan-400 text-[11px] mb-2">// Architecture Schema</pre>
              <pre>${rawCode}</pre>
            </div>
          `;
        }
      }
    });
  }, [html]);

  // Setup click listeners for dynamic copy buttons
  useEffect(() => {
    if (!containerRef.current) return;
    const copyBtns = containerRef.current.querySelectorAll('.copy-code-btn');
    
    copyBtns.forEach(btn => {
      const handleCopy = () => {
        const rawCode = decodeURIComponent(btn.getAttribute('data-code') || '');
        if (rawCode) {
          navigator.clipboard.writeText(rawCode);
          btn.innerHTML = '<span>✅ Copied!</span>';
          btn.classList.add('text-emerald-400', 'border-emerald-500/50');
          setTimeout(() => {
            btn.innerHTML = '<span>📋 Copy</span>';
            btn.classList.remove('text-emerald-400', 'border-emerald-500/50');
          }, 2000);
        }
      };

      btn.addEventListener('click', handleCopy);
      return () => btn.removeEventListener('click', handleCopy);
    });
  }, [html]);

  // Real-time dynamic speech line/sentence highlighting
  useEffect(() => {
    if (!containerRef.current) return;

    // Remove any previous active voice highlights
    const prevHighlighted = containerRef.current.querySelectorAll('.voice-reading-highlight');
    prevHighlighted.forEach(el => el.classList.remove('voice-reading-highlight'));

    if (!activeSpokenText || typeof activeSpokenText !== 'string' || activeSpokenText.trim().length < 3) {
      return;
    }

    const cleanSpoken = activeSpokenText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const spokenKeywords = cleanSpoken.split(' ').filter(w => w.length > 2);
    if (spokenKeywords.length === 0) return;

    // Search direct reading elements (paragraphs, list items, headings, table cells, callouts)
    const candidates = Array.from(containerRef.current.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, tr, td, th, dt, dd, summary, blockquote > *'));
    let bestEl = null;
    let maxScore = 0;

    for (const el of candidates) {
      const elText = (el.textContent || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
      if (!elText || elText.length < 3) continue;

      // Exact or containment match
      if (elText.includes(cleanSpoken) || cleanSpoken.includes(elText)) {
        bestEl = el;
        maxScore = 1000;
        break;
      }

      // Prefix match (first 20 chars)
      const testPrefix = cleanSpoken.slice(0, Math.min(20, cleanSpoken.length));
      if (elText.includes(testPrefix) || cleanSpoken.includes(elText.slice(0, Math.min(20, elText.length)))) {
        bestEl = el;
        maxScore = 900;
        break;
      }

      // Keyword match score
      let matches = 0;
      for (const word of spokenKeywords) {
        if (elText.includes(word)) {
          matches++;
        }
      }

      const score = matches / Math.max(1, spokenKeywords.length);
      if (score > maxScore && matches >= 2) {
        maxScore = score;
        bestEl = el;
      }
    }

    if (bestEl) {
      bestEl.classList.add('voice-reading-highlight');
      bestEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeSpokenText]);

  return (
    <div 
      ref={containerRef} 
      className={`prose prose-invert max-w-none prose-p:text-slate-200 prose-p:text-[14.5px] sm:prose-p:text-[15px] prose-p:leading-[1.85] prose-p:tracking-[0.025em] prose-p:my-3.5 prose-li:text-slate-200 prose-li:text-[14px] sm:prose-li:text-[14.5px] prose-li:leading-[1.8] prose-li:tracking-[0.025em] prose-li:my-2 prose-ul:my-3.5 prose-ol:my-3.5 prose-ul:space-y-2 prose-ol:space-y-2 prose-strong:text-cyan-200 prose-strong:font-bold prose-strong:tracking-[0.025em] prose-code:text-amber-300 prose-code:bg-slate-900/90 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:border prose-code:border-slate-800 prose-code:before:content-none prose-code:after:content-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
