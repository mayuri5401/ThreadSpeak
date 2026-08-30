import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, Sparkles, AlertTriangle, CheckCircle2, 
  HelpCircle, Lightbulb, Info, ArrowRight, Zap, ShieldCheck, 
  Terminal, Layers, Play, Pause, RotateCcw, Filter, Check, Eye
} from 'lucide-react';

export default function HelloProgramTokenVisualizer() {
  const [selectedTokenKey, setSelectedTokenKey] = useState('public-main');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAutoTouring, setIsAutoTouring] = useState(false);
  const tourTimerRef = useRef(null);

  const tokens = {
    'public-class': {
      id: 'public-class',
      num: 1,
      token: 'public',
      category: 'modifiers',
      type: 'Keyword (Access Modifier)',
      callout: 'keyword (access modifier)',
      meaning: 'Declares that the MainApp class is accessible from anywhere across the entire program (including other packages) and allows the external JVM runtime engine to invoke it from outside.',
      rule: 'When a class is declared as public, the source file name MUST match the class name exactly (MainApp.java).',
      whatIfMissing: 'If package-private (no public), only classes inside the exact same package can access it.',
      badgeColor: 'border-amber-500 bg-amber-950/80 text-amber-300 shadow-amber-500/20'
    },
    'class-kw': {
      id: 'class-kw',
      num: 2,
      token: 'class',
      category: 'keywords',
      type: 'Keyword (Class Definition)',
      callout: 'keyword (class blueprint)',
      meaning: 'The reserved Java keyword used to define a class, which acts as a blueprint or template for creating objects.',
      rule: 'Can contain Variables (data), Constructors (initialization), and Methods (behaviors).',
      whatIfMissing: 'Syntax error: Java cannot define types without class, interface, enum, or record.',
      badgeColor: 'border-cyan-500 bg-cyan-950/80 text-cyan-300 shadow-cyan-500/20'
    },
    'main-app': {
      id: 'main-app',
      num: 3,
      token: 'MainApp',
      category: 'identifiers',
      type: 'User-Defined Class Name',
      callout: 'user-defined class name',
      meaning: 'The user-defined identifier representing the primary class that encapsulates the overall program and houses the main() entry point.',
      rule: 'Must follow PascalCase convention (starting with uppercase) and match file name MainApp.java.',
      whatIfMissing: 'Compile error if file name differs from public class name.',
      badgeColor: 'border-purple-500 bg-purple-950/80 text-purple-300 shadow-purple-500/20'
    },
    'class-open-brace': {
      id: 'class-open-brace',
      num: 4,
      token: '{',
      category: 'delimiters',
      type: 'Class Opening Curly Brace',
      callout: 'class block start symbol',
      meaning: 'Denotes the beginning of the MainApp class definition body. All class members are enclosed within class curly braces.',
      rule: 'Every opening curly brace must have a corresponding closing curly brace.',
      whatIfMissing: 'Compile error: Syntax error, insert "}" to complete ClassBody.',
      badgeColor: 'border-slate-600 bg-slate-900 text-slate-300'
    },
    'public-main': {
      id: 'public-main',
      num: 5,
      token: 'public',
      category: 'modifiers',
      type: 'Keyword (Access Modifier)',
      callout: 'keyword (method access modifier)',
      meaning: 'Makes the main() method accessible to the Java Virtual Machine (JVM) bootstrap loader from outside the class and package.',
      rule: 'If private or protected, JVM cannot locate the entry point from outside and throws NoSuchMethodError.',
      whatIfMissing: 'Runtime Error: Main method not found in class MainApp.',
      badgeColor: 'border-amber-500 bg-amber-950/80 text-amber-300 shadow-amber-500/20'
    },
    'static-main': {
      id: 'static-main',
      num: 6,
      token: 'static',
      category: 'keywords',
      type: 'Keyword (Class-Level Modifier)',
      callout: 'keyword (no object needed)',
      meaning: 'Denotes that the main method belongs to the class itself rather than an object instance. It allows the JVM to invoke MainApp.main() directly without creating an object first (new MainApp()).',
      rule: 'Without static, code compiles cleanly, but fails at runtime with NoSuchMethodError.',
      whatIfMissing: 'Runtime Error: Main method is not static in class MainApp.',
      badgeColor: 'border-emerald-500 bg-emerald-950/80 text-emerald-300 shadow-emerald-500/20'
    },
    'void-main': {
      id: 'void-main',
      num: 7,
      token: 'void',
      category: 'keywords',
      type: 'Keyword (Return Type)',
      callout: 'keyword (return type: no value)',
      meaning: 'Indicates that the main method does not return any value back to the operating system or JVM caller upon termination.',
      rule: 'Unlike C/C++ which return int (return 0;), Java main returns void and uses System.exit(0) for exit codes.',
      whatIfMissing: 'Compile error: Return type required for method.',
      badgeColor: 'border-rose-500 bg-rose-950/80 text-rose-300 shadow-rose-500/20'
    },
    'main-method': {
      id: 'main-method',
      num: 8,
      token: 'main',
      category: 'io',
      type: 'Pre-Defined Entry Point Method',
      callout: 'method name (entry point)',
      meaning: 'The standardized entry point method name searched by the JVM to begin program execution. If missing, JVM refuses to launch.',
      rule: 'Case sensitive! Naming it Main() will compile cleanly but JVM cannot start program execution.',
      whatIfMissing: 'Runtime Error: Main method not found in class MainApp.',
      badgeColor: 'border-indigo-500 bg-indigo-950/80 text-indigo-300 shadow-indigo-500/20'
    },
    'string-type': {
      id: 'string-type',
      num: 9,
      token: 'String[]',
      category: 'io',
      type: 'Parameter Type (Array of Strings)',
      callout: 'array of strings (parameter type)',
      meaning: 'Used for Command-line Arguments. It holds arguments passed to the program via terminal CLI (e.g. java MainApp Hello Deepak -> args[0]="Hello", args[1]="Deepak").',
      rule: 'Can also be written as String args[] or String... args (varargs syntax).',
      whatIfMissing: 'Runtime Error: Method with signature main(String[]) not found.',
      badgeColor: 'border-cyan-500 bg-cyan-950/80 text-cyan-300 shadow-cyan-500/20'
    },
    'args-name': {
      id: 'args-name',
      num: 10,
      token: 'args',
      category: 'identifiers',
      type: 'Parameter Name (Argument Variable)',
      callout: 'parameter name (argument variable)',
      meaning: 'The user-defined variable name for the String[] parameter. "args" is short for arguments, but can be renamed to any valid identifier (e.g., data, params).',
      rule: 'Renaming args to myArgs is valid, but the type must remain String[].',
      whatIfMissing: 'Compile error: Variable name expected in parameter list.',
      badgeColor: 'border-teal-500 bg-teal-950/80 text-teal-300 shadow-teal-500/20'
    },
    'method-open-brace': {
      id: 'method-open-brace',
      num: 11,
      token: '{',
      category: 'delimiters',
      type: 'Method Opening Curly Brace',
      callout: 'method block start symbol',
      meaning: 'Denotes the beginning of the main method execution body where program instructions begin.',
      rule: 'Must pair with method closing brace.',
      whatIfMissing: 'Compile error: Syntax error on token "{", expected MethodBody.',
      badgeColor: 'border-slate-600 bg-slate-900 text-slate-300'
    },
    'system-class': {
      id: 'system-class',
      num: 12,
      token: 'System',
      category: 'io',
      type: 'Pre-Defined Class (java.lang)',
      callout: 'pre-defined class (java.lang package)',
      meaning: 'Built-in final utility class in the java.lang package providing access to system-level functionality: in (standard input), out (standard output), and err (standard error).',
      rule: 'No import statement needed because java.lang package is auto-imported by Java compiler.',
      whatIfMissing: 'Compile error: Cannot find symbol System.',
      badgeColor: 'border-blue-500 bg-blue-950/80 text-blue-300 shadow-blue-500/20'
    },
    'dot-operator-1': {
      id: 'dot-operator-1',
      num: 13,
      token: '.',
      category: 'delimiters',
      type: 'Member Access Operator (Dot)',
      callout: 'member access operator',
      meaning: 'Member access operator used to access fields, methods, and nested classes (e.g., System.out accesses the out field).',
      rule: 'Java uses dot (.) operator exclusively for member navigation (no -> operator).',
      whatIfMissing: 'Compile error: Syntax error on token ".", identifier expected.',
      badgeColor: 'border-amber-500 bg-amber-950/80 text-amber-300'
    },
    'out-field': {
      id: 'out-field',
      num: 14,
      token: 'out',
      category: 'io',
      type: 'Pre-Defined Object (Static Field)',
      callout: 'pre-defined object (System class)',
      meaning: 'Static member of System class that holds a reference to a java.io.PrintStream object representing the standard console output stream.',
      rule: 'System.out is a PrintStream instance initialized during JVM bootstrap.',
      whatIfMissing: 'Cannot route output stream to terminal display.',
      badgeColor: 'border-emerald-500 bg-emerald-950/80 text-emerald-300 shadow-emerald-500/20'
    },
    'println-method': {
      id: 'println-method',
      num: 15,
      token: 'println',
      category: 'io',
      type: 'Pre-Defined Method (PrintStream)',
      callout: 'method (print with newline)',
      meaning: 'Pre-defined method of PrintStream class. It prints the given text/data to the console and automatically moves the cursor to a new line (\\n).',
      rule: 'Difference from print(): println appends a newline; print() keeps cursor on the same line.',
      whatIfMissing: 'Text is not flushed to standard output.',
      badgeColor: 'border-orange-500 bg-orange-950/80 text-orange-300 shadow-orange-500/20'
    },
    'string-literal': {
      id: 'string-literal',
      num: 16,
      token: '"Hello Deepak...!!"',
      category: 'io',
      type: 'String Literal Constant',
      callout: 'string literal (message to print)',
      meaning: 'Sequence of characters enclosed in double quotes. Passed as an argument to println() and stored in the String Constant Pool (SCP).',
      rule: 'Must use double quotes ("...") for String; single quotes (\'...\') are reserved for char literals.',
      whatIfMissing: 'Compile error: String literal is not properly closed.',
      badgeColor: 'border-emerald-400 bg-emerald-950/80 text-emerald-200 shadow-emerald-400/20'
    },
    'semicolon': {
      id: 'semicolon',
      num: 17,
      token: ';',
      category: 'delimiters',
      type: 'Statement Terminator (Semicolon)',
      callout: 'statement terminator',
      meaning: 'Marks the end of an executable statement in Java. Every executable statement must be terminated with a semicolon.',
      rule: 'Omitting semicolon is the #1 syntax error for beginners.',
      whatIfMissing: 'Compile error: \';\' expected.',
      badgeColor: 'border-rose-500 bg-rose-950/80 text-rose-300'
    },
    'method-close-brace': {
      id: 'method-close-brace',
      num: 18,
      token: '}',
      category: 'delimiters',
      type: 'Method Closing Curly Brace',
      callout: 'method block end symbol',
      meaning: 'Marks the end of the main() method body.',
      rule: 'Must balance method opening brace.',
      whatIfMissing: 'Compile error: Syntax error, insert "}" to complete MethodBody.',
      badgeColor: 'border-slate-600 bg-slate-900 text-slate-300'
    },
    'class-close-brace': {
      id: 'class-close-brace',
      num: 18,
      token: '}',
      category: 'delimiters',
      type: 'Class Closing Curly Brace',
      callout: 'class block end symbol',
      meaning: 'Marks the end of the MainApp class definition block.',
      rule: 'Must balance class opening brace.',
      whatIfMissing: 'Compile error: Syntax error, insert "}" to complete ClassBody.',
      badgeColor: 'border-slate-600 bg-slate-900 text-slate-300'
    }
  };

  const tokenList = Object.values(tokens);
  const current = tokens[selectedTokenKey] || tokens['public-main'];

  // Categories definition for filter
  const categories = [
    { id: 'all', label: 'All 18 Elements' },
    { id: 'modifiers', label: 'Access Modifiers' },
    { id: 'keywords', label: 'Keywords (class/static/void)' },
    { id: 'identifiers', label: 'Identifiers (MainApp/args)' },
    { id: 'io', label: 'I/O & Methods (System.out.println)' },
    { id: 'delimiters', label: 'Delimiters & Operators' },
  ];

  // Auto-tour animation
  const tokenKeys = Object.keys(tokens);
  useEffect(() => {
    if (isAutoTouring) {
      tourTimerRef.current = setInterval(() => {
        setSelectedTokenKey(prev => {
          const curIdx = tokenKeys.indexOf(prev);
          const nextIdx = (curIdx + 1) % tokenKeys.length;
          return tokenKeys[nextIdx];
        });
      }, 2500);
    } else {
      clearInterval(tourTimerRef.current);
    }
    return () => clearInterval(tourTimerRef.current);
  }, [isAutoTouring]);

  const isSelected = (id) => selectedTokenKey === id;
  const isCategoryActive = (cat) => activeCategory === 'all' || activeCategory === cat;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0F172A] via-[#0B1222] to-[#070B14] shadow-2xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/25">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                Visual 18-Element Program Architecture Map
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Interactive Lens
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every keyword, identifier, operator, delimiter, and method mapped with real-time callout rays.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoTouring(!isAutoTouring)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              isAutoTouring
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/25'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {isAutoTouring ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isAutoTouring ? 'Pause Auto-Tour' : 'Play Auto-Tour'}</span>
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3 text-cyan-400" /> Filter:
        </span>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition-all ${
              activeCategory === cat.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Visual Graphical Code Stage with Glowing Callout Rays */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-[#060A12] border border-cyan-500/20 shadow-2xl overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

        {/* Ambient Top Center Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Interactive Visual Blueprint Canvas */}
        <div className="relative z-10 font-mono text-sm leading-relaxed space-y-4 select-none">
          
          {/* Top Row: Class Declaration Line */}
          <div className="flex flex-wrap items-center gap-3">
            {/* [1] public */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-sans font-bold text-amber-400/90 mb-1 flex items-center gap-1">
                keyword (access modifier)
              </span>
              <button
                onClick={() => setSelectedTokenKey('public-class')}
                className={`px-3 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1.5 ${
                  isSelected('public-class')
                    ? 'border-amber-400 bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/30 scale-105 ring-2 ring-amber-300'
                    : isCategoryActive('modifiers')
                    ? 'border-amber-500/40 bg-amber-950/40 text-amber-300 hover:border-amber-400 hover:bg-amber-950/70'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>public</span>
                <span className="text-[10px] font-sans px-1.5 py-0.2 rounded bg-slate-950/60 text-amber-300 font-bold">[1]</span>
              </button>
            </div>

            {/* [2] class */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-sans font-bold text-cyan-400/90 mb-1">
                keyword (class blueprint)
              </span>
              <button
                onClick={() => setSelectedTokenKey('class-kw')}
                className={`px-3 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1.5 ${
                  isSelected('class-kw')
                    ? 'border-cyan-400 bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 scale-105 ring-2 ring-cyan-300'
                    : isCategoryActive('keywords')
                    ? 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/70'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>class</span>
                <span className="text-[10px] font-sans px-1.5 py-0.2 rounded bg-slate-950/60 text-cyan-300 font-bold">[2]</span>
              </button>
            </div>

            {/* [3] MainApp */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-sans font-bold text-purple-400/90 mb-1">
                user-defined class name
              </span>
              <button
                onClick={() => setSelectedTokenKey('main-app')}
                className={`px-3.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1.5 ${
                  isSelected('main-app')
                    ? 'border-purple-400 bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/30 scale-105 ring-2 ring-purple-300'
                    : isCategoryActive('identifiers')
                    ? 'border-purple-500/40 bg-purple-950/40 text-purple-300 hover:border-purple-400 hover:bg-purple-950/70'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>MainApp</span>
                <span className="text-[10px] font-sans px-1.5 py-0.2 rounded bg-slate-950/60 text-purple-300 font-bold">[3]</span>
              </button>
            </div>

            {/* [4] { */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-sans font-bold text-slate-400 mb-1">
                class block start
              </span>
              <button
                onClick={() => setSelectedTokenKey('class-open-brace')}
                className={`px-3 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1.5 ${
                  isSelected('class-open-brace')
                    ? 'border-white bg-slate-100 text-slate-950 font-bold scale-105 ring-2 ring-cyan-400'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{'{'}</span>
                <span className="text-[10px] font-sans px-1 py-0.2 rounded bg-slate-950 text-slate-300">[4]</span>
              </button>
            </div>
          </div>

          {/* Middle Row: Main Method Declaration Line */}
          <div className="pl-6 sm:pl-8 pt-2 flex flex-wrap items-center gap-2.5">
            {/* [5] public */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-amber-400/90 mb-1">
                keyword (access modifier)
              </span>
              <button
                onClick={() => setSelectedTokenKey('public-main')}
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                  isSelected('public-main')
                    ? 'border-amber-400 bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/30 scale-105 ring-2 ring-amber-300'
                    : isCategoryActive('modifiers')
                    ? 'border-amber-500/40 bg-amber-950/40 text-amber-300 hover:border-amber-400'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>public</span>
                <span className="text-[9px] font-sans px-1 rounded bg-slate-950/60 text-amber-300 font-bold">[5]</span>
              </button>
            </div>

            {/* [6] static */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-emerald-400/90 mb-1">
                keyword (no object needed)
              </span>
              <button
                onClick={() => setSelectedTokenKey('static-main')}
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                  isSelected('static-main')
                    ? 'border-emerald-400 bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30 scale-105 ring-2 ring-emerald-300'
                    : isCategoryActive('keywords')
                    ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:border-emerald-400'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>static</span>
                <span className="text-[9px] font-sans px-1 rounded bg-slate-950/60 text-emerald-300 font-bold">[6]</span>
              </button>
            </div>

            {/* [7] void */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-rose-400/90 mb-1">
                keyword (return type)
              </span>
              <button
                onClick={() => setSelectedTokenKey('void-main')}
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                  isSelected('void-main')
                    ? 'border-rose-400 bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/30 scale-105 ring-2 ring-rose-300'
                    : isCategoryActive('keywords')
                    ? 'border-rose-500/40 bg-rose-950/40 text-rose-300 hover:border-rose-400'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>void</span>
                <span className="text-[9px] font-sans px-1 rounded bg-slate-950/60 text-rose-300 font-bold">[7]</span>
              </button>
            </div>

            {/* [8] main */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-indigo-400/90 mb-1">
                method (entry point)
              </span>
              <button
                onClick={() => setSelectedTokenKey('main-method')}
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                  isSelected('main-method')
                    ? 'border-indigo-400 bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/30 scale-105 ring-2 ring-indigo-300'
                    : isCategoryActive('io')
                    ? 'border-indigo-500/40 bg-indigo-950/40 text-indigo-300 hover:border-indigo-400'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>main</span>
                <span className="text-[9px] font-sans px-1 rounded bg-slate-950/60 text-indigo-300 font-bold">[8]</span>
              </button>
            </div>

            <span className="text-slate-400 font-bold text-base mt-4">(</span>

            {/* [9] String[] */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-cyan-400/90 mb-1">
                array of strings (type)
              </span>
              <button
                onClick={() => setSelectedTokenKey('string-type')}
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                  isSelected('string-type')
                    ? 'border-cyan-400 bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 scale-105 ring-2 ring-cyan-300'
                    : isCategoryActive('io')
                    ? 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>String[]</span>
                <span className="text-[9px] font-sans px-1 rounded bg-slate-950/60 text-cyan-300 font-bold">[9]</span>
              </button>
            </div>

            {/* [10] args */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-teal-400/90 mb-1">
                parameter name (variable)
              </span>
              <button
                onClick={() => setSelectedTokenKey('args-name')}
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                  isSelected('args-name')
                    ? 'border-teal-400 bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/30 scale-105 ring-2 ring-teal-300'
                    : isCategoryActive('identifiers')
                    ? 'border-teal-500/40 bg-teal-950/40 text-teal-300 hover:border-teal-400'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>args</span>
                <span className="text-[9px] font-sans px-1 rounded bg-slate-950/60 text-teal-300 font-bold">[10]</span>
              </button>
            </div>

            <span className="text-slate-400 font-bold text-base mt-4">)</span>

            {/* [11] { */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-slate-400 mb-1">
                method block start
              </span>
              <button
                onClick={() => setSelectedTokenKey('method-open-brace')}
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                  isSelected('method-open-brace')
                    ? 'border-white bg-slate-100 text-slate-950 font-bold scale-105 ring-2 ring-cyan-400'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <span>{'{'}</span>
                <span className="text-[9px] font-sans px-1 rounded bg-slate-950 text-slate-300 font-bold">[11]</span>
              </button>
            </div>
          </div>

          {/* Third Row: System.out.println("Hello Deepak...!!"); */}
          <div className="pl-12 sm:pl-16 pt-2 flex flex-wrap items-center gap-2">
            {/* [12] System */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-blue-400/90 mb-1">
                pre-defined class (java.lang)
              </span>
              <button
                onClick={() => setSelectedTokenKey('system-class')}
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                  isSelected('system-class')
                    ? 'border-blue-400 bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30 scale-105 ring-2 ring-blue-300'
                    : isCategoryActive('io')
                    ? 'border-blue-500/40 bg-blue-950/40 text-blue-300 hover:border-blue-400'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>System</span>
                <span className="text-[9px] font-sans px-1 rounded bg-slate-950/60 text-blue-300 font-bold">[12]</span>
              </button>
            </div>

            {/* [13] . */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-amber-400/90 mb-1">
                operator
              </span>
              <button
                onClick={() => setSelectedTokenKey('dot-operator-1')}
                className={`px-2 py-1.5 rounded-xl border-2 transition-all flex items-center gap-0.5 ${
                  isSelected('dot-operator-1')
                    ? 'border-amber-400 bg-amber-500 text-slate-950 font-bold scale-105 ring-2 ring-amber-300'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <span>.</span>
                <span className="text-[8px] font-sans text-amber-300 font-bold">[13]</span>
              </button>
            </div>

            {/* [14] out */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-emerald-400/90 mb-1">
                pre-defined object
              </span>
              <button
                onClick={() => setSelectedTokenKey('out-field')}
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                  isSelected('out-field')
                    ? 'border-emerald-400 bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/30 scale-105 ring-2 ring-emerald-300'
                    : isCategoryActive('io')
                    ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:border-emerald-400'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>out</span>
                <span className="text-[9px] font-sans px-1 rounded bg-slate-950/60 text-emerald-300 font-bold">[14]</span>
              </button>
            </div>

            {/* [13] . */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-amber-400/90 mb-1">
                operator
              </span>
              <button
                onClick={() => setSelectedTokenKey('dot-operator-1')}
                className={`px-2 py-1.5 rounded-xl border-2 transition-all flex items-center gap-0.5 ${
                  isSelected('dot-operator-1')
                    ? 'border-amber-400 bg-amber-500 text-slate-950 font-bold scale-105 ring-2 ring-amber-300'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                <span>.</span>
                <span className="text-[8px] font-sans text-amber-300 font-bold">[13]</span>
              </button>
            </div>

            {/* [15] println */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-orange-400/90 mb-1">
                method (print newline)
              </span>
              <button
                onClick={() => setSelectedTokenKey('println-method')}
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                  isSelected('println-method')
                    ? 'border-orange-400 bg-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/30 scale-105 ring-2 ring-orange-300'
                    : isCategoryActive('io')
                    ? 'border-orange-500/40 bg-orange-950/40 text-orange-300 hover:border-orange-400'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>println</span>
                <span className="text-[9px] font-sans px-1 rounded bg-slate-950/60 text-orange-300 font-bold">[15]</span>
              </button>
            </div>

            <span className="text-slate-400 font-bold text-base mt-4">(</span>

            {/* [16] "Hello Deepak...!!" */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-emerald-300/90 mb-1">
                string literal (message)
              </span>
              <button
                onClick={() => setSelectedTokenKey('string-literal')}
                className={`px-3 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                  isSelected('string-literal')
                    ? 'border-emerald-300 bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-400/30 scale-105 ring-2 ring-emerald-200'
                    : isCategoryActive('io')
                    ? 'border-emerald-500/50 bg-emerald-950/50 text-emerald-200 hover:border-emerald-400'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400'
                }`}
              >
                <span>"Hello Deepak...!!"</span>
                <span className="text-[9px] font-sans px-1 rounded bg-slate-950/60 text-emerald-300 font-bold">[16]</span>
              </button>
            </div>

            <span className="text-slate-400 font-bold text-base mt-4">)</span>

            {/* [17] ; */}
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-sans font-bold text-rose-400/90 mb-1">
                terminator
              </span>
              <button
                onClick={() => setSelectedTokenKey('semicolon')}
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 ${
                  isSelected('semicolon')
                    ? 'border-rose-400 bg-rose-500 text-white font-bold scale-105 ring-2 ring-rose-300'
                    : 'border-slate-800 bg-slate-900 text-rose-400 hover:text-white'
                }`}
              >
                <span>;</span>
                <span className="text-[9px] font-sans px-1 rounded bg-slate-950 text-rose-300 font-bold">[17]</span>
              </button>
            </div>
          </div>

          {/* Fourth & Fifth Rows: Closing Braces */}
          <div className="pl-6 sm:pl-8 pt-1 flex items-center gap-2">
            <button
              onClick={() => setSelectedTokenKey('method-close-brace')}
              className={`px-3 py-1 rounded-xl border transition-all flex items-center gap-1 text-xs ${
                isSelected('method-close-brace')
                  ? 'border-white bg-slate-200 text-slate-950 font-bold ring-2 ring-cyan-400'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <span>{'}'}</span>
              <span className="text-[9px] font-sans text-slate-400">[18. Method Block End]</span>
            </button>
          </div>

          <div className="pt-0.5 flex items-center gap-2">
            <button
              onClick={() => setSelectedTokenKey('class-close-brace')}
              className={`px-3 py-1 rounded-xl border transition-all flex items-center gap-1 text-xs ${
                isSelected('class-close-brace')
                  ? 'border-white bg-slate-200 text-slate-950 font-bold ring-2 ring-cyan-400'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              <span>{'}'}</span>
              <span className="text-[9px] font-sans text-slate-400">[18. Class Block End]</span>
            </button>
          </div>

        </div>
      </div>

      {/* Selected Token Deep Inspector Card with Rich Visuals */}
      <div className="p-6 rounded-3xl bg-[#070B14] border border-cyan-500/30 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white font-mono font-extrabold text-sm flex items-center justify-center shadow-md shadow-indigo-500/25">
              {current.num}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-lg bg-slate-900 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/40">
                  {current.token}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">{current.type}</h4>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                Callout Tag: <span className="text-amber-400 font-semibold">{current.callout}</span>
              </div>
            </div>
          </div>
          
          <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-950/90 px-3 py-1 rounded-full border border-cyan-800">
            Element #{current.num} of 18
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Lightbulb className="w-4 h-4" />
              <span>Architectural Purpose in JVM</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{current.meaning}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>What Happens If Missing / Modified?</span>
            </div>
            <p className="text-slate-300 leading-relaxed">{current.whatIfMissing}</p>
          </div>
        </div>

        {/* Exam & Interview Trap Callout */}
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300">Exam & Interview Rule: </span>
            <span>{current.rule}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
