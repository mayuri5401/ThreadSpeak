import React, { useState } from 'react';
import { 
  Binary, Layers, Database, Sparkles, Check, 
  HelpCircle, ArrowRight, Code2, Cpu, HardDrive, GitFork, ChevronRight
} from 'lucide-react';

export default function JavaDataTypesVisualizer() {
  const [activeTab, setActiveTab] = useState('tree'); // 'tree' | 'primitive' | 'non-primitive' | 'anatomy'
  const [selectedNode, setSelectedNode] = useState('Data Types');
  const [selectedType, setSelectedType] = useState('int');
  const [selectedAnatomyPin, setSelectedAnatomyPin] = useState(1);

  const nodeDetails = {
    'Data Types': 'In Java, every piece of data has a specific type known as a data type. It informs compiler about memory size and valid operations.',
    'Primitive': 'Pre-defined data types built directly into Java. Exactly 8 types with fixed memory footprints across all platforms.',
    'Non-Primitive': 'User-defined or derived data types (String, Arrays, Classes, Interfaces) with dynamic heap memory usage.',
    'Boolean': 'Logical data type holding true or false. Occupies 1 bit in JVM specifications.',
    'Numeric': 'All numbers and character representations in Java. Divided into Character and Integral.',
    'Character': 'char represents 16-bit Unicode characters (\'\\u0000\' to \'\\uffff\'). Occupies 2 bytes.',
    'Integral': 'Numeric data types representing whole numbers (Integer) or fractional numbers (Floating Point).',
    'Integer': 'Whole numbers without decimal points: byte (1B), short (2B), int (4B), long (8B).',
    'Floating Point': 'Real numbers with fractional precision: float (4B - 32-bit single precision), double (8B - 64-bit double precision).',
    'boolean': 'Primitive boolean: 1 bit logical flag (true or false). Example: boolean isPassed = true;',
    'char': 'Primitive char: 2 bytes Unicode (0 to 65,535). Example: char grade = \'A\';',
    'byte': 'Primitive byte: 1 byte (8 bits), range -128 to 127. Example: byte age = 25;',
    'short': 'Primitive short: 2 bytes (16 bits), range -32,768 to 32,767. Example: short year = 2026;',
    'int': 'Primitive int: 4 bytes (32 bits), range -2.14B to +2.14B. Example: int rollno = 101;',
    'long': 'Primitive long: 8 bytes (64 bits), range ±9.22 × 10^18. Example: long phone = 9876543210L;',
    'float': 'Primitive float: 4 bytes (32 bits), 6-7 decimal digits. Example: float marks = 91.4f;',
    'double': 'Primitive double: 8 bytes (64 bits), 15-16 decimal digits. Example: double pi = 3.14159;',
    'String': 'Non-Primitive Class representing immutable sequence of characters. Example: String name = "Deepak";',
    'Arrays': 'Non-Primitive Data Structure holding multiple elements of the same type. Example: int[] arr = {1, 2, 3};',
    'Classes': 'Non-Primitive user-defined blueprints that define object state and behavior. Example: class Student {}',
    'Interfaces': 'Non-Primitive abstract contracts specifying method blueprints. Example: interface List<E> {}',
  };

  const primitives = [
    { name: 'byte', size: '1 Byte (8 bits)', range: '-128 to 127', defaultVal: '0', example: 'byte b = 100;', color: 'text-amber-400 border-amber-500/60 bg-amber-950/40', barWidth: '12.5%' },
    { name: 'short', size: '2 Bytes (16 bits)', range: '-32,768 to 32,767', defaultVal: '0', example: 'short s = 5000;', color: 'text-amber-300 border-amber-500/60 bg-amber-950/40', barWidth: '25%' },
    { name: 'int', size: '4 Bytes (32 bits)', range: '-2,147,483,648 to 2,147,483,647', defaultVal: '0', example: 'int rollno = 101;', color: 'text-cyan-400 border-cyan-500/60 bg-cyan-950/40', barWidth: '50%' },
    { name: 'long', size: '8 Bytes (64 bits)', range: '-9.22 × 10^18 to 9.22 × 10^18', defaultVal: '0L', example: 'long l = 10000000000L;', color: 'text-blue-400 border-blue-500/60 bg-blue-950/40', barWidth: '100%' },
    { name: 'float', size: '4 Bytes (32 bits)', range: '6 to 7 decimal digits precision', defaultVal: '0.0f', example: 'float marks = 91.4f;', color: 'text-emerald-400 border-emerald-500/60 bg-emerald-950/40', barWidth: '50%' },
    { name: 'double', size: '8 Bytes (64 bits)', range: '15 to 16 decimal digits precision', defaultVal: '0.0d', example: 'double pi = 3.14159265359;', color: 'text-teal-400 border-teal-500/60 bg-teal-950/40', barWidth: '100%' },
    { name: 'char', size: '2 Bytes (16 bits)', range: "0 to 65,535 ('\\u0000' to '\\uffff')", defaultVal: "'\\u0000'", example: "char grade = 'A';", color: 'text-purple-400 border-purple-500/60 bg-purple-950/40', barWidth: '25%' },
    { name: 'boolean', size: '1 bit (logical)', range: 'true or false', defaultVal: 'false', example: 'boolean isPassed = true;', color: 'text-rose-400 border-rose-500/60 bg-rose-950/40', barWidth: '6%' },
  ];

  const nonPrimitives = [
    { name: 'String', category: 'Class / Object', memory: 'Dynamic (Length dependent)', desc: 'Represents immutable sequence of characters.', example: 'String name = "Deepak";', color: 'text-cyan-400 border-cyan-500/60 bg-cyan-950/40' },
    { name: 'Arrays', category: 'Data Structure', memory: 'Dynamic (Length × element size)', desc: 'Fixed-length container holding elements of a single type.', example: 'int[] numbers = {10, 20, 30};', color: 'text-indigo-400 border-indigo-500/60 bg-indigo-950/40' },
    { name: 'Classes', category: 'User-defined blueprint', memory: 'Dynamic (Sum of instance fields on Heap)', desc: 'User-defined blueprints creating real-world state objects.', example: 'Student s1 = new Student();', color: 'text-purple-400 border-purple-500/60 bg-purple-950/40' },
    { name: 'Interfaces', category: 'Abstract Contract', memory: 'Dynamic reference pointer (4B/8B)', desc: 'Abstract specifications implemented by custom classes.', example: 'List<String> list = new ArrayList<>();', color: 'text-emerald-400 border-emerald-500/60 bg-emerald-950/40' },
  ];

  const activePrimitive = primitives.find(p => p.name === selectedType) || primitives[2];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0F172A] via-[#0B1222] to-[#070B14] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 shadow-md">
            <Database className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              Java Data Types Classification Tree
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                Interactive Diagram
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any node in the hierarchy tree below to inspect its definition and memory size.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('tree')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'tree'
                ? 'bg-cyan-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🌳 Tree Hierarchy
          </button>
          <button
            onClick={() => setActiveTab('primitive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'primitive'
                ? 'bg-cyan-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Primitive (8 Types)
          </button>
          <button
            onClick={() => setActiveTab('non-primitive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'non-primitive'
                ? 'bg-cyan-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Non-Primitive
          </button>
          <button
            onClick={() => setActiveTab('anatomy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'anatomy'
                ? 'bg-cyan-600 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Syntax Anatomy
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE HIERARCHY TREE VIEW */}
      {activeTab === 'tree' && (
        <div className="space-y-6">
          
          {/* Visual Interactive Diagram Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#090E1A] border border-cyan-500/30 overflow-x-auto shadow-inner">
            <div className="min-w-[700px] flex flex-col items-center space-y-5">
              
              {/* Level 0: Root */}
              <div>
                <button
                  onClick={() => setSelectedNode('Data Types')}
                  className={`px-6 py-2.5 rounded-2xl font-bold font-mono text-sm border-2 transition shadow-lg ${
                    selectedNode === 'Data Types'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-300 ring-4 ring-cyan-500/30'
                      : 'bg-slate-900 text-white border-slate-700 hover:border-cyan-500/60'
                  }`}
                >
                  Data Types
                </button>
              </div>

              {/* Trunk lines */}
              <div className="w-1/2 h-4 border-t-2 border-l-2 border-r-2 border-slate-700" />

              {/* Level 1: Primitive vs Non-Primitive */}
              <div className="grid grid-cols-2 gap-16 w-full max-w-2xl text-center">
                {/* Left: Primitive */}
                <div className="flex flex-col items-center space-y-4">
                  <button
                    onClick={() => setSelectedNode('Primitive')}
                    className={`px-5 py-2 rounded-xl font-bold font-mono text-xs border transition ${
                      selectedNode === 'Primitive'
                        ? 'bg-cyan-600 text-slate-950 border-cyan-400 ring-2 ring-cyan-400/40'
                        : 'bg-slate-900/90 text-cyan-300 border-slate-800 hover:border-cyan-700'
                    }`}
                  >
                    Primitive
                  </button>

                  {/* Level 2: Boolean & Numeric */}
                  <div className="w-full flex justify-around pt-2 border-t border-slate-800 relative">
                    {/* Boolean Sub-tree */}
                    <div className="flex flex-col items-center space-y-2">
                      <button
                        onClick={() => setSelectedNode('Boolean')}
                        className={`px-3 py-1 rounded-lg text-xs font-mono border transition ${
                          selectedNode === 'Boolean' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-950 text-indigo-300 border-slate-800'
                        }`}
                      >
                        Boolean
                      </button>
                      <button
                        onClick={() => setSelectedNode('boolean')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition ${
                          selectedNode === 'boolean' ? 'bg-rose-500 text-slate-950 font-bold border-rose-300' : 'bg-slate-900 text-rose-300 border-slate-800'
                        }`}
                      >
                        boolean
                      </button>
                    </div>

                    {/* Numeric Sub-tree */}
                    <div className="flex flex-col items-center space-y-3">
                      <button
                        onClick={() => setSelectedNode('Numeric')}
                        className={`px-3 py-1 rounded-lg text-xs font-mono border transition ${
                          selectedNode === 'Numeric' ? 'bg-cyan-600 text-white border-cyan-400' : 'bg-slate-950 text-cyan-300 border-slate-800'
                        }`}
                      >
                        Numeric
                      </button>

                      {/* Character & Integral Split */}
                      <div className="flex gap-4 pt-2 border-t border-slate-800">
                        {/* Character */}
                        <div className="flex flex-col items-center space-y-2">
                          <button
                            onClick={() => setSelectedNode('Character')}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                              selectedNode === 'Character' ? 'bg-purple-600 text-white' : 'bg-slate-950 text-purple-300 border-slate-800'
                            }`}
                          >
                            Character
                          </button>
                          <button
                            onClick={() => setSelectedNode('char')}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                              selectedNode === 'char' ? 'bg-purple-500 text-slate-950 font-bold' : 'bg-slate-900 text-purple-300 border-slate-800'
                            }`}
                          >
                            char
                          </button>
                        </div>

                        {/* Integral */}
                        <div className="flex flex-col items-center space-y-2">
                          <button
                            onClick={() => setSelectedNode('Integral')}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                              selectedNode === 'Integral' ? 'bg-blue-600 text-white' : 'bg-slate-950 text-blue-300 border-slate-800'
                            }`}
                          >
                            Integral
                          </button>

                          <div className="flex gap-3 pt-1 border-t border-slate-800">
                            {/* Integer */}
                            <div className="flex flex-col items-center space-y-1">
                              <span className="text-[9px] font-mono text-slate-400">Integer</span>
                              <div className="grid grid-cols-2 gap-1">
                                {['byte', 'short', 'int', 'long'].map(t => (
                                  <button
                                    key={t}
                                    onClick={() => setSelectedNode(t)}
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono border ${
                                      selectedNode === t ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-900 text-amber-300 border-slate-800'
                                    }`}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Floating Point */}
                            <div className="flex flex-col items-center space-y-1">
                              <span className="text-[9px] font-mono text-slate-400">Floating Point</span>
                              <div className="flex flex-col gap-1">
                                {['float', 'double'].map(t => (
                                  <button
                                    key={t}
                                    onClick={() => setSelectedNode(t)}
                                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono border ${
                                      selectedNode === t ? 'bg-emerald-400 text-slate-950 font-bold' : 'bg-slate-900 text-emerald-300 border-slate-800'
                                    }`}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Right: Non-Primitive */}
                <div className="flex flex-col items-center space-y-4">
                  <button
                    onClick={() => setSelectedNode('Non-Primitive')}
                    className={`px-5 py-2 rounded-xl font-bold font-mono text-xs border transition ${
                      selectedNode === 'Non-Primitive'
                        ? 'bg-purple-600 text-white border-purple-400 ring-2 ring-purple-400/40'
                        : 'bg-slate-900/90 text-purple-300 border-slate-800 hover:border-purple-700'
                    }`}
                  >
                    Non-Primitive
                  </button>

                  <div className="w-full flex justify-around gap-1 pt-6 border-t border-slate-800">
                    {['String', 'Arrays', 'Classes', 'Interfaces'].map(np => (
                      <button
                        key={np}
                        onClick={() => setSelectedNode(np)}
                        className={`px-2 py-1.5 rounded-lg text-[10px] font-mono border transition ${
                          selectedNode === np ? 'bg-purple-500 text-slate-950 font-bold border-purple-300' : 'bg-slate-900 text-purple-300 border-slate-800'
                        }`}
                      >
                        {np}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Selected Node Details Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Selected Node: <span className="text-white uppercase">{selectedNode}</span></span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              {nodeDetails[selectedNode] || nodeDetails['Data Types']}
            </p>
          </div>

        </div>
      )}

      {/* TAB 2: PRIMITIVE DATA TYPES (8 TYPES) */}
      {activeTab === 'primitive' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {primitives.map((p) => {
              const isSelected = selectedType === p.name;
              return (
                <button
                  key={p.name}
                  onClick={() => setSelectedType(p.name)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-cyan-950/90 border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-white">{p.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                      {p.size.split(' ')[0]} {p.size.split(' ')[1]}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-1.5 truncate">
                    {p.example}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-white font-bold text-sm">
                  Type Inspector: <span className="text-cyan-400">{activePrimitive.name}</span>
                </span>
                <span className="text-[10px] text-slate-400">Primitive Type</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Memory Footprint</span>
                  <span className="text-xs font-bold text-cyan-300">{activePrimitive.size}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Default Value</span>
                  <span className="text-xs font-bold text-amber-300">{activePrimitive.defaultVal}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Value Range</span>
                <span className="text-xs text-slate-200">{activePrimitive.range}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#060A14] border border-cyan-500/30">
                <span className="text-[10px] text-cyan-400 uppercase tracking-wider block mb-1">Code Example</span>
                <pre className="text-emerald-300 text-xs">{activePrimitive.example}</pre>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-[#080D18] border border-slate-800 p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white">
                    Memory Scale (Stack Allocation)
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-slate-400">
                      <span>{activePrimitive.name}</span>
                      <span className="text-cyan-300 font-bold">{activePrimitive.size}</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                        style={{ width: activePrimitive.barWidth }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                    💡 <strong className="text-slate-200">Fixed Size Rule:</strong> Primitive types have fixed byte sizes across all OS platforms (Windows, Mac, Linux), guaranteeing Write Once, Run Anywhere.
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-500 text-center">
                Stored directly in Thread Stack Frames
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NON-PRIMITIVE DATA TYPES */}
      {activeTab === 'non-primitive' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nonPrimitives.map((np) => (
            <div key={np.name} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 shadow-lg">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold font-mono text-cyan-400">{np.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                    {np.category}
                  </span>
                </div>
                <span className="text-[10px] text-amber-400 font-mono">Dynamic Size</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {np.desc}
              </p>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-emerald-300">
                {np.example}
              </div>

              <div className="text-[10px] font-mono text-slate-500">
                Memory: {np.memory} • Heap Object Reference
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: DECLARATION ANATOMY PINPOINT */}
      {activeTab === 'anatomy' && (
        <div className="space-y-5">
          <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/40 text-center space-y-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Click Any Element to Inspect Its Purpose:
            </span>

            <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-[#080D18] border border-slate-800 font-mono text-base sm:text-xl font-bold shadow-inner">
              <button
                onClick={() => setSelectedAnatomyPin(1)}
                className={`px-3 py-1.5 rounded-xl border transition ${
                  selectedAnatomyPin === 1
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-400 ring-2 ring-cyan-400/50 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                int
              </button>

              <button
                onClick={() => setSelectedAnatomyPin(2)}
                className={`px-3 py-1.5 rounded-xl border transition ${
                  selectedAnatomyPin === 2
                    ? 'bg-purple-950 text-purple-300 border-purple-400 ring-2 ring-purple-400/50 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                rollno
              </button>

              <span className="text-slate-500">=</span>

              <button
                onClick={() => setSelectedAnatomyPin(3)}
                className={`px-3 py-1.5 rounded-xl border transition ${
                  selectedAnatomyPin === 3
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-400 ring-2 ring-emerald-400/50 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                101
              </button>

              <span className="text-slate-500">;</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#060A14] border border-slate-800 space-y-2">
            {selectedAnatomyPin === 1 && (
              <div className="space-y-1">
                <div className="text-xs font-bold text-cyan-400 font-mono">1. int ➔ Data Type (4 Bytes)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Informs the compiler to allocate <strong>4 bytes of memory</strong> for storing integer numbers ranging from -2.14 billion to +2.14 billion.
                </p>
              </div>
            )}
            {selectedAnatomyPin === 2 && (
              <div className="space-y-1">
                <div className="text-xs font-bold text-purple-400 font-mono">2. rollno ➔ Variable Name (Identifier)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The named storage location in computer memory. You use this identifier name to read, update, or pass the stored value throughout your code.
                </p>
              </div>
            )}
            {selectedAnatomyPin === 3 && (
              <div className="space-y-1">
                <div className="text-xs font-bold text-emerald-400 font-mono">3. 101 ➔ Literal / Data (Assigned Value)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The constant data value assigned to the variable. In this case, <code className="text-emerald-300 font-mono">101</code> is an integer literal.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
