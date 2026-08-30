import React, { useState } from 'react';
import { 
  Tag, Sparkles, CheckCircle, XCircle, AlertTriangle, 
  HelpCircle, MessageSquare, BookOpen, Layers, ShieldCheck, ArrowRight, RefreshCw
} from 'lucide-react';

const RESERVED_KEYWORDS = new Set([
  'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const',
  'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final', 'finally', 'float',
  'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'int', 'interface', 'long', 'native',
  'new', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'strictfp', 'super',
  'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while',
  'true', 'false', 'null', 'var', 'record', 'yield', 'sealed', 'non-sealed'
]);

const BUILT_IN_METHODS = new Set([
  'println', 'print', 'printf', 'main', 'toString', 'equals', 'hashCode', 'getClass', 'notify', 'wait'
]);

export default function JavaIdentifiersVisualizer() {
  const [activeTab, setActiveTab] = useState('analogy'); // 'analogy' | 'validator' | 'conventions'
  const [inputIdentifier, setInputIdentifier] = useState('studentName');
  const [selectedConvention, setSelectedConvention] = useState('classes');
  const [wordCount, setWordCount] = useState(2); // 1 | 2 | 3

  // Validate the current input identifier
  const validateIdentifier = (name) => {
    if (!name || name.length === 0) {
      return { isValid: false, reason: 'Identifier cannot be empty.', type: 'empty' };
    }

    if (/\s/.test(name)) {
      return { 
        isValid: false, 
        rule: 'Rule 1: No Whitespace', 
        reason: 'Spaces/whitespace are strictly not allowed in identifiers.',
        type: 'space'
      };
    }

    if (/^[0-9]/.test(name)) {
      return { 
        isValid: false, 
        rule: 'Rule 3: Cannot Begin with Digit', 
        reason: 'Identifiers cannot start with a digit (0-9). Numbers are only allowed after the first character.',
        type: 'digit-start'
      };
    }

    if (RESERVED_KEYWORDS.has(name)) {
      return { 
        isValid: false, 
        rule: 'Rule 4: No Reserved Keywords', 
        reason: `'${name}' is a reserved Java keyword or literal value and cannot be used as an identifier.`,
        type: 'keyword'
      };
    }

    if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) {
      const invalidChars = name.match(/[^a-zA-Z0-9_$]/g);
      const uniqueInvalid = [...new Set(invalidChars)].join(' ');
      return { 
        isValid: false, 
        rule: 'Rule 2: Only _ and $ Allowed', 
        reason: `Illegal character(s) detected [${uniqueInvalid}]. Identifiers can only contain letters, digits, '_' and '$'.`,
        type: 'invalid-chars'
      };
    }

    if (BUILT_IN_METHODS.has(name)) {
      return { 
        isValid: true, 
        warning: true,
        rule: 'Rule 5: Built-in Method Conflict', 
        reason: `'${name}' is syntactically valid in Java, but conflicts with a common built-in method (like System.out.println). Use with caution!`,
        type: 'builtin-warning'
      };
    }

    return { 
      isValid: true, 
      rule: 'All Lexical Rules Passed', 
      reason: `'${name}' is a valid Java identifier!`,
      type: 'valid'
    };
  };

  const validationResult = validateIdentifier(inputIdentifier);

  const presets = [
    { label: 'studentName', valid: true },
    { label: '_totalCount', valid: true },
    { label: '$salary', valid: true },
    { label: 'rollno1', valid: true },
    { label: '123score', valid: false },
    { label: 'roll no', valid: false },
    { label: 'roll-no', valid: false },
    { label: '@price', valid: false },
    { label: 'class', valid: false },
    { label: 'println', valid: true, warning: true },
  ];

  const conventionsData = {
    classes: {
      title: 'Classes & Interfaces',
      caseStyle: 'PascalCase (UpperCamelCase)',
      rule: 'Capitalize the first letter of every word. Usually nouns for classes and adjectives for interfaces.',
      examples: {
        1: { code: 'class Example { }', name: 'Example' },
        2: { code: 'class MyExample { }', name: 'MyExample' },
        3: { code: 'class MyExampleDemo { }', name: 'MyExampleDemo' }
      },
      tagColor: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/40 text-cyan-300'
    },
    methods: {
      title: 'Methods',
      caseStyle: 'camelCase (lowercase start)',
      rule: 'First word lowercase, subsequent words capitalized. Always name as verbs or actions.',
      examples: {
        1: { code: 'void example() { }', name: 'example()' },
        2: { code: 'void myExample() { }', name: 'myExample()' },
        3: { code: 'void myExampleDemo() { }', name: 'myExampleDemo()' }
      },
      tagColor: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300'
    },
    variables: {
      title: 'Variables',
      caseStyle: 'camelCase / snake_case',
      rule: 'First word lowercase, subsequent words capitalized. Meaningful and descriptive nouns.',
      examples: {
        1: { code: 'int example = 10;', name: 'example' },
        2: { code: 'int my_example = 20; // or myExample', name: 'my_example / myExample' },
        3: { code: 'int my_example_demo = 30; // or myExampleDemo', name: 'my_example_demo / myExampleDemo' }
      },
      tagColor: 'from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-300'
    },
    constants: {
      title: 'Constants',
      caseStyle: 'UPPER_SNAKE_CASE',
      rule: 'All letters in uppercase, separate multiple words with underscores (_). Declared with static final.',
      examples: {
        1: { code: 'public static final int EXAMPLE = 1;', name: 'EXAMPLE' },
        2: { code: 'public static final int MY_EXAMPLE = 2;', name: 'MY_EXAMPLE' },
        3: { code: 'public static final int MY_EXAMPLE_DEMO = 3;', name: 'MY_EXAMPLE_DEMO' }
      },
      tagColor: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300'
    },
    packages: {
      title: 'Packages',
      caseStyle: 'all lowercase (dot separated)',
      rule: 'All lowercase letters, using dots (.) to separate hierarchy levels. Reflects reverse domain names.',
      examples: {
        1: { code: 'package example;', name: 'example' },
        2: { code: 'package my.example;', name: 'my.example' },
        3: { code: 'package my.example.demo;', name: 'my.example.demo' }
      },
      tagColor: 'from-rose-500/20 to-pink-500/20 border-rose-500/40 text-rose-300'
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-7 border border-slate-800/80 shadow-2xl space-y-6">
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Java Identifiers & Naming Visualizer
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                Interactive
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Explore lexical rules, real-world analogies, and official naming conventions.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('analogy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'analogy'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Dialogue Analogy</span>
          </button>

          <button
            onClick={() => setActiveTab('validator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'validator'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Live Rule Validator</span>
          </button>

          <button
            onClick={() => setActiveTab('conventions')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'conventions'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Naming Conventions</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DIALOGUE ANALOGY */}
      {activeTab === 'analogy' && (
        <div className="space-y-6">
          <div className="relative rounded-2xl bg-gradient-to-b from-[#0C1222] via-[#0E172C] to-[#090D1A] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="text-center max-w-lg mx-auto mb-6">
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                🗣️ Real-World Concept Analogy
              </span>
              <h4 className="text-xl font-extrabold text-white mt-2">
                Why do we need Identifiers?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Just like humans use names to identify each other in conversation, Java uses identifiers to recognize elements in code.
              </p>
            </div>

            {/* Conversation Bubbles */}
            <div className="space-y-5 max-w-xl mx-auto">
              {/* Boy */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-2xl shadow-lg border border-cyan-400/40 shrink-0">
                  👦
                </div>
                <div className="flex-1 bg-slate-800/90 border border-slate-700/80 rounded-2xl rounded-tl-none p-4 shadow-md">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Boy</span>
                    <span className="text-[10px] text-slate-400 font-mono">Question</span>
                  </div>
                  <p className="text-slate-100 text-sm sm:text-base font-semibold m-0 leading-relaxed">
                    "How can I identify you?"
                  </p>
                </div>
              </div>

              {/* Girl */}
              <div className="flex items-start justify-end gap-4">
                <div className="flex-1 bg-gradient-to-br from-purple-950/80 via-slate-900 to-pink-950/70 border border-pink-500/40 rounded-2xl rounded-tr-none p-4 shadow-lg max-w-md">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-pink-300 font-mono">Answer</span>
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Girl (Priya)</span>
                  </div>
                  <p className="text-slate-100 text-sm sm:text-base font-semibold m-0 leading-relaxed text-right">
                    "My name is <strong className="text-pink-300 bg-pink-950/90 px-2 py-0.5 rounded border border-pink-500/50 shadow-sm">"Priya"</strong>, you can identify me by my name."
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-2xl shadow-lg border border-pink-400/40 shrink-0">
                  👧
                </div>
              </div>
            </div>

            {/* Architecture Mapping Cards */}
            <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-xs font-mono text-cyan-400 font-bold mb-1">Variable Identifier</div>
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded text-emerald-300 border border-slate-800 block mb-1">
                  String name = "Deepak";
                </code>
                <span className="text-[11px] text-slate-400">Identifies memory location</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-xs font-mono text-pink-400 font-bold mb-1">Class Identifier</div>
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded text-pink-300 border border-slate-800 block mb-1">
                  class StudentProfile { }
                </code>
                <span className="text-[11px] text-slate-400">Identifies blueprint type</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-xs font-mono text-purple-400 font-bold mb-1">Method Identifier</div>
                <code className="text-xs bg-slate-950 px-2 py-0.5 rounded text-purple-300 border border-slate-800 block mb-1">
                  void displayInfo() { }
                </code>
                <span className="text-[11px] text-slate-400">Identifies callable action</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE RULE VALIDATOR */}
      {activeTab === 'validator' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div>
              <label className="block text-xs font-bold font-mono uppercase tracking-wider text-slate-300 mb-2">
                Type Any Identifier to Test Java Lexical Rules:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputIdentifier}
                    onChange={(e) => setInputIdentifier(e.target.value)}
                    placeholder="e.g. rollno, $salary, 123score, class..."
                    className="w-full bg-[#080D1A] border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-sm sm:text-base focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                  />
                  {inputIdentifier && (
                    <button
                      onClick={() => setInputIdentifier('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono px-2 py-1 bg-slate-800 rounded"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 block mb-2">Or test standard test cases:</span>
              <div className="flex flex-wrap gap-2">
                {presets.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputIdentifier(item.label)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition border ${
                      inputIdentifier === item.label
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : item.valid
                        ? 'bg-slate-800/80 text-emerald-400 border-emerald-500/30 hover:bg-slate-800'
                        : 'bg-slate-800/80 text-rose-400 border-rose-500/30 hover:bg-slate-800'
                    }`}
                  >
                    {item.label} {item.valid ? '✅' : '❌'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Validation Result Box */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              validationResult.isValid
                ? validationResult.warning
                  ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                  : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="flex items-start gap-3.5">
              {validationResult.isValid ? (
                validationResult.warning ? (
                  <AlertTriangle className="w-7 h-7 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5" />
                )
              ) : (
                <XCircle className="w-7 h-7 text-rose-400 shrink-0 mt-0.5" />
              )}

              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm uppercase tracking-wider">
                    {validationResult.isValid
                      ? validationResult.warning
                        ? '⚠️ Syntactically Valid (Method Name Conflict)'
                        : '✅ Valid Java Identifier'
                      : '❌ Invalid Java Identifier'}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700">
                    {validationResult.rule || 'Compiler Syntax Rule'}
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-100 m-0">
                  {validationResult.reason}
                </p>

                {validationResult.isValid && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-300">
                    <span>Usage Example: </span>
                    <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      int {inputIdentifier} = 100;
                    </code>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 5 Rules Reference Quick Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 font-mono">1. No Whitespace</span>
              <p className="text-slate-400 m-0">Spaces are strictly not allowed.</p>
              <div className="text-[11px] font-mono text-rose-400">❌ int roll no;</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 font-mono">2. Only _ and $ Allowed</span>
              <p className="text-slate-400 m-0">Special characters like @, #, - are banned.</p>
              <div className="text-[11px] font-mono text-rose-400">❌ int roll-no;</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 font-mono">3. No Leading Digits</span>
              <p className="text-slate-400 m-0">Cannot begin with 0-9.</p>
              <div className="text-[11px] font-mono text-rose-400">❌ int 1rollno;</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-400 font-mono">4. No Keywords</span>
              <p className="text-slate-400 m-0">Cannot use reserved words like class, if.</p>
              <div className="text-[11px] font-mono text-rose-400">❌ int class;</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 sm:col-span-2">
              <span className="font-bold text-cyan-400 font-mono">5. Case Sensitive</span>
              <p className="text-slate-400 m-0">MyVariable and myVariable are two distinct identifiers.</p>
              <div className="text-[11px] font-mono text-emerald-400">✅ int MyVariable = 10; int myVariable = 20;</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NAMING CONVENTIONS */}
      {activeTab === 'conventions' && (
        <div className="space-y-6">
          {/* Category Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {Object.keys(conventionsData).map((catKey) => {
              const cat = conventionsData[catKey];
              const isSelected = selectedConvention === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedConvention(catKey)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-b from-cyan-950/80 to-slate-900 border-cyan-500/60 shadow-md shadow-cyan-950/50 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {cat.title}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate font-mono">
                    {cat.caseStyle.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Convention Box */}
          {conventionsData[selectedConvention] && (
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0A0F1D] border border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    {conventionsData[selectedConvention].title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {conventionsData[selectedConvention].rule}
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                  {conventionsData[selectedConvention].caseStyle}
                </span>
              </div>

              {/* Word Length Selector */}
              <div>
                <span className="text-xs font-mono font-bold text-slate-300 block mb-2">
                  Select Word Count:
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3].map((count) => (
                    <button
                      key={count}
                      onClick={() => setWordCount(count)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition border ${
                        wordCount === count
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                          : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {count === 1 ? 'Single Word' : count === 2 ? 'Two Words' : 'Three Words'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Code Preview */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Standard Java Declaration ({wordCount} Word{wordCount > 1 ? 's' : ''}):</span>
                  <span className="text-cyan-400">
                    Identifier: {conventionsData[selectedConvention].examples[wordCount].name}
                  </span>
                </div>
                <div className="font-mono text-sm sm:text-base text-emerald-300 bg-[#060A14] p-3 rounded-lg border border-slate-800">
                  <code>{conventionsData[selectedConvention].examples[wordCount].code}</code>
                </div>
              </div>
            </div>
          )}

          {/* Master Conventions Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/90 text-cyan-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Category</th>
                  <th className="p-3">Single Word</th>
                  <th className="p-3">Two Words</th>
                  <th className="p-3">Three Words</th>
                  <th className="p-3">Case Pattern</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950/60 text-slate-300">
                <tr>
                  <td className="p-3 font-bold text-white">Classes & Interfaces</td>
                  <td className="p-3 text-cyan-300">Example</td>
                  <td className="p-3 text-cyan-300">MyExample</td>
                  <td className="p-3 text-cyan-300">MyExampleDemo</td>
                  <td className="p-3 text-slate-400">PascalCase</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Methods</td>
                  <td className="p-3 text-emerald-300">example()</td>
                  <td className="p-3 text-emerald-300">myExample()</td>
                  <td className="p-3 text-emerald-300">myExampleDemo()</td>
                  <td className="p-3 text-slate-400">camelCase (verb)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Variables</td>
                  <td className="p-3 text-purple-300">example</td>
                  <td className="p-3 text-purple-300">my_example</td>
                  <td className="p-3 text-purple-300">my_example_demo</td>
                  <td className="p-3 text-slate-400">camelCase / snake_case</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Constants</td>
                  <td className="p-3 text-amber-300">EXAMPLE</td>
                  <td className="p-3 text-amber-300">MY_EXAMPLE</td>
                  <td className="p-3 text-amber-300">MY_EXAMPLE_DEMO</td>
                  <td className="p-3 text-slate-400">UPPER_SNAKE_CASE</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Packages</td>
                  <td className="p-3 text-rose-300">example</td>
                  <td className="p-3 text-rose-300">my.example</td>
                  <td className="p-3 text-rose-300">my.example.demo</td>
                  <td className="p-3 text-slate-400">lowercase.dot</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
