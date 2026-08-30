import React, { useState } from 'react';
import { 
  Key, Sparkles, Search, Filter, ShieldAlert, 
  Check, X, BookOpen, Layers, HelpCircle, Code2
} from 'lucide-react';

export default function JavaKeywordsVisualizer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [identifierInput, setIdentifierInput] = useState('class');

  const keywordsList = [
    // Data Types (8)
    { name: 'boolean', cat: 'Data Types', desc: '1-bit logical true/false type' },
    { name: 'char', cat: 'Data Types', desc: '16-bit Unicode character type' },
    { name: 'byte', cat: 'Data Types', desc: '8-bit signed integer type' },
    { name: 'short', cat: 'Data Types', desc: '16-bit signed integer type' },
    { name: 'int', cat: 'Data Types', desc: '32-bit signed integer type' },
    { name: 'long', cat: 'Data Types', desc: '64-bit signed integer type' },
    { name: 'float', cat: 'Data Types', desc: '32-bit floating point type' },
    { name: 'double', cat: 'Data Types', desc: '64-bit double precision type' },

    // Control Statements (10)
    { name: 'if', cat: 'Control Flow', desc: 'Conditional branch statement' },
    { name: 'else', cat: 'Control Flow', desc: 'Alternative branch for if' },
    { name: 'switch', cat: 'Control Flow', desc: 'Multi-branch selection statement' },
    { name: 'case', cat: 'Control Flow', desc: 'Labels a branch in switch statement' },
    { name: 'default', cat: 'Control Flow', desc: 'Default fallback branch in switch' },
    { name: 'for', cat: 'Control Flow', desc: 'Iterative loop statement' },
    { name: 'while', cat: 'Control Flow', desc: 'Pre-condition loop statement' },
    { name: 'do', cat: 'Control Flow', desc: 'Post-condition loop statement' },
    { name: 'break', cat: 'Control Flow', desc: 'Exits loop or switch statement' },
    { name: 'continue', cat: 'Control Flow', desc: 'Skips to next loop iteration' },

    // Class & Interface (5)
    { name: 'class', cat: 'OOP & Types', desc: 'Defines a class blueprint' },
    { name: 'interface', cat: 'OOP & Types', desc: 'Defines an abstract interface contract' },
    { name: 'enum', cat: 'OOP & Types', desc: 'Defines a fixed set of constants' },
    { name: 'extends', cat: 'OOP & Types', desc: 'Inherits from a class or interface' },
    { name: 'implements', cat: 'OOP & Types', desc: 'Implements interface methods' },

    // Modifiers (6)
    { name: 'abstract', cat: 'Modifiers', desc: 'Declares uninstantiable class or method' },
    { name: 'final', cat: 'Modifiers', desc: 'Constants, prevents overriding/inheritance' },
    { name: 'static', cat: 'Modifiers', desc: 'Class-level single shared memory variable/method' },
    { name: 'synchronized', cat: 'Modifiers', desc: 'Thread-safe lock on critical sections' },
    { name: 'transient', cat: 'Modifiers', desc: 'Prevents field from being serialized' },
    { name: 'volatile', cat: 'Modifiers', desc: 'Guarantees direct main memory visibility in threads' },

    // Access Modifiers (3)
    { name: 'public', cat: 'Access', desc: 'Accessible from anywhere across packages' },
    { name: 'private', cat: 'Access', desc: 'Accessible only within declaring class' },
    { name: 'protected', cat: 'Access', desc: 'Accessible within package and subclasses' },

    // Exceptions (6)
    { name: 'try', cat: 'Exceptions', desc: 'Encloses block with potential exceptions' },
    { name: 'catch', cat: 'Exceptions', desc: 'Handles thrown exceptions' },
    { name: 'finally', cat: 'Exceptions', desc: 'Always executes regardless of exceptions' },
    { name: 'throw', cat: 'Exceptions', desc: 'Explicitly throws an exception object' },
    { name: 'throws', cat: 'Exceptions', desc: 'Declares exceptions in method signature' },
    { name: 'assert', cat: 'Exceptions', desc: 'Tests boolean condition assertions' },

    // Object & Flow (6)
    { name: 'new', cat: 'Object Management', desc: 'Allocates memory for new object on Heap' },
    { name: 'this', cat: 'Object Management', desc: 'Refers to current object instance' },
    { name: 'super', cat: 'Object Management', desc: 'Refers to direct parent class instance' },
    { name: 'void', cat: 'Flow', desc: 'Indicates method returns no value' },
    { name: 'return', cat: 'Flow', desc: 'Exits method and returns value' },
    { name: 'package', cat: 'Package', desc: 'Declares a package namespace' },
    { name: 'import', cat: 'Package', desc: 'Imports external classes or packages' },

    // Others (3)
    { name: 'native', cat: 'Others', desc: 'Implemented in native platform code (C/C++)' },
    { name: 'strictfp', cat: 'Others', desc: 'Restricts floating-point math to strict IEEE-754' },
    { name: 'instanceof', cat: 'Others', desc: 'Tests runtime class type of an object' },

    // Unused Keywords (2)
    { name: 'goto', cat: 'Not Used', desc: 'Reserved word from C/C++; not used in Java' },
    { name: 'const', cat: 'Not Used', desc: 'Reserved word from C/C++; use "final" instead' },

    // Contextual Keywords (5)
    { name: 'var', cat: 'Contextual', desc: 'Local variable type inference (Java 10+)' },
    { name: 'yield', cat: 'Contextual', desc: 'Returns value from switch expression (Java 14+)' },
    { name: 'record', cat: 'Contextual', desc: 'Immutable data carrier class (Java 16+)' },
    { name: 'sealed', cat: 'Contextual', desc: 'Restricts permitted subclasses (Java 17+)' },
    { name: 'non-sealed', cat: 'Contextual', desc: 'Opens sealed class hierarchy (Java 17+)' },
  ];

  const allReservedTokens = [
    ...keywordsList.map(k => k.name.toLowerCase()),
    'true', 'false', 'null'
  ];

  const filteredKeywords = keywordsList.filter(k => {
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'unused' ? k.cat === 'Not Used' :
       selectedFilter === 'contextual' ? k.cat === 'Contextual' :
       selectedFilter === 'datatypes' ? k.cat === 'Data Types' :
       selectedFilter === 'control' ? k.cat === 'Control Flow' :
       selectedFilter === 'modifiers' ? (k.cat === 'Modifiers' || k.cat === 'Access') :
       selectedFilter === 'exceptions' ? k.cat === 'Exceptions' : true);
    
    const matchesSearch = k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.cat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const isIdentifierInvalid = allReservedTokens.includes(identifierInput.trim().toLowerCase());

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0F172A] via-[#0B1222] to-[#070B14] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 shadow-md">
            <Key className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Java Keywords &amp; Reserved Words Explorer
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                50 Keywords + 5 Contextual
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Search, filter categories, and test if custom names are legal identifiers.
            </p>
          </div>
        </div>
      </div>

      {/* VOCABULARY COUNT ARCHITECTURE CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#090E1A] border border-cyan-500/40 text-center space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Reserved Words</span>
          <div className="text-xl font-extrabold text-cyan-300">53 Words</div>
          <span className="text-[9px] text-slate-500 block">50 Keywords + 3 Literals</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#090E1A] border border-emerald-500/40 text-center space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Actively Used Keywords</span>
          <div className="text-xl font-extrabold text-emerald-300">48 Keywords</div>
          <span className="text-[9px] text-slate-500 block">public, class, static...</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#090E1A] border border-rose-500/40 text-center space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Unused Reserved</span>
          <div className="text-xl font-extrabold text-rose-300">2 Keywords</div>
          <span className="text-[9px] text-slate-500 block">goto, const</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#090E1A] border border-purple-500/40 text-center space-y-1 font-mono">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Contextual (Modern)</span>
          <div className="text-xl font-extrabold text-purple-300">5 Keywords</div>
          <span className="text-[9px] text-slate-500 block">var, record, sealed...</span>
        </div>
      </div>

      {/* IDENTIFIER VALIDITY CHECKER SANDBOX */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            Identifier Validity Test: Can I use this word as a variable or class name?
          </span>
          <span className="text-[10px] text-slate-500">Test any word</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={identifierInput}
            onChange={(e) => setIdentifierInput(e.target.value)}
            placeholder="Type a word (e.g. class, age, goto)..."
            className="flex-1 min-w-[200px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-bold ${
            isIdentifierInvalid
              ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-md'
              : 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md'
          }`}>
            {isIdentifierInvalid ? (
              <>
                <X className="w-4 h-4 text-rose-400" />
                <span>❌ ILLEGAL IDENTIFIER (Reserved Keyword!)</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>✅ VALID IDENTIFIER NAME</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH & CATEGORY FILTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords (e.g. static, goto, record)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'datatypes', label: 'Data Types' },
            { id: 'control', label: 'Control Flow' },
            { id: 'modifiers', label: 'Modifiers' },
            { id: 'exceptions', label: 'Exceptions' },
            { id: 'unused', label: 'Not Used (goto, const)' },
            { id: 'contextual', label: 'Contextual' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition ${
                selectedFilter === f.id
                  ? 'bg-cyan-600 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* KEYWORDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
        {filteredKeywords.map(k => (
          <div
            key={k.name}
            className={`p-3 rounded-xl border text-left font-mono space-y-1 shadow-sm transition hover:scale-[1.02] ${
              k.cat === 'Not Used'
                ? 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                : k.cat === 'Contextual'
                ? 'bg-purple-950/40 border-purple-500/60 text-purple-300'
                : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-cyan-500/60'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300">{k.name}</span>
              <span className="text-[9px] px-1 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                {k.cat.split(' ')[0]}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
              {k.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
