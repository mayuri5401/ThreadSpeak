import React from 'react';
import { Sparkles, Terminal, Code2, Heart, ShieldCheck, Cpu } from 'lucide-react';

export default function Footer({ onSelectTrack, onSelectView }) {
  return (
    <footer className="border-t border-slate-800/80 bg-[#060A14] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand Column */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-0.5 shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Thread<span className="text-cyan-400">Speak</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The modern interactive academy for mastering Java Core, Spring Boot Microservices, Low-Level Design (LLD), and High-Level System Design (HLD).
          </p>
        </div>

        {/* Tracks Column */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Curriculum Tracks</h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button onClick={() => { onSelectTrack('core-java'); onSelectView('topics'); }} className="hover:text-amber-400 transition">
                Core &amp; Advanced Java
              </button>
            </li>
            <li>
              <button onClick={() => { onSelectTrack('spring-boot'); onSelectView('topics'); }} className="hover:text-emerald-400 transition">
                Spring Boot &amp; Microservices
              </button>
            </li>
            <li>
              <button onClick={() => { onSelectTrack('system-design'); onSelectView('topics'); }} className="hover:text-indigo-400 transition">
                System Design (LLD &amp; HLD)
              </button>
            </li>
            <li>
              <button onClick={() => { onSelectTrack('dsa'); onSelectView('topics'); }} className="hover:text-cyan-400 transition">
                Data Structures &amp; Algorithms (DSA)
              </button>
            </li>
          </ul>
        </div>

        {/* Interactive Features */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Features</h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button onClick={() => onSelectView('topics')} className="hover:text-cyan-400 transition">
                Comprehensive Study Lessons
              </button>
            </li>
            <li>
              <button onClick={() => onSelectView('progress')} className="hover:text-emerald-400 transition">
                Learning Progress Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => onSelectView('playground')} className="hover:text-cyan-400 transition">
                Java 21 Code Playground
              </button>
            </li>
          </ul>
        </div>

        {/* Tech Stack Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Production Architecture</h4>
          <div className="space-y-1.5 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Backend: Spring Boot 3.3 / Java 21 LTS</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Frontend: React 18 + Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Security: Stateless JWT + CORS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} ThreadSpeak. Built for high-yield Java &amp; System Design interviews.
        </div>
        <div className="flex items-center gap-1">
          <span>Engineered with clean code &amp; mental models</span>
        </div>
      </div>
    </footer>
  );
}
