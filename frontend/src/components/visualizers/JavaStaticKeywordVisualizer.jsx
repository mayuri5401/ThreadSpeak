import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, Database,
  Plus, Users, Share2, Layers2, ShieldCheck, Check
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaStaticKeywordVisualizer
 * High-Yield Interactive Theater for the 'static' keyword in Java:
 * 1. 4 Applications Explorer (Variables, Methods, Static Block, Static Nested Class)
 * 2. Metaspace vs Heap Memory Allocation Simulator (Shared schoolName / Counter)
 * 3. Static vs Instance Members Comparison Matrix
 */
export default function JavaStaticKeywordVisualizer() {
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'metaspace' | 'compare'
  const [selectedApp, setSelectedApp] = useState('1'); // '1' | '2' | '3' | '4'
  const [studentList, setStudentList] = useState([
    { name: 'Amit', rollNo: 101 },
    { name: 'Deepak', rollNo: 102 }
  ]);

  const handleAddStudent = () => {
    if (studentList.length < 5) {
      const nextRoll = 101 + studentList.length;
      const names = ['Rahul', 'Priya', 'Sneha'];
      const nextName = names[studentList.length - 2] || `Student_${nextRoll}`;
      setStudentList([...studentList, { name: nextName, rollNo: nextRoll }]);
    }
  };

  const handleResetStudents = () => {
    setStudentList([
      { name: 'Amit', rollNo: 101 },
      { name: 'Deepak', rollNo: 102 }
    ]);
  };

  // 4 Applications Data
  const appsData = [
    {
      id: '1',
      title: '1. Static Variable (Class Variable)',
      badge: 'Single Shared Memory',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      description: "Allocated memory only once in Metaspace/Method Area when the class loads. Shared across all instances of the class.",
      code: `class Student {
    String name;
    int rollNo;
    static String schoolName = "ABC Public School"; // Shared static variable

    Student(String name, int rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }

    void displayDetails() {
        System.out.println("Name     : " + name);
        System.out.println("Roll No  : " + rollNo);
        System.out.println("School   : " + schoolName);
        System.out.println("--------------------------");
    }
}

public class StaticDemo {
    public static void main(String[] args) {
        Student s1 = new Student("Amit", 101);
        Student s2 = new Student("Deepak", 102);
        Student s3 = new Student("Rahul", 103);

        s1.displayDetails();
        s2.displayDetails();
        s3.displayDetails();
    }
}`,
      output: `Name     : Amit\nRoll No  : 101\nSchool   : ABC Public School\n--------------------------\nName     : Deepak\nRoll No  : 102\nSchool   : ABC Public School\n--------------------------\nName     : Rahul\nRoll No  : 103\nSchool   : ABC Public School\n--------------------------`,
      diagram: "Metaspace [static schoolName = 'ABC Public School'] ◄─── Shared by s1, s2, s3"
    },
    {
      id: '2',
      title: '2. Static Method',
      badge: 'Direct Class Invocation',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: "Belongs to the class and can be invoked directly using 'ClassName.methodName()' without creating any object in Heap.",
      code: `public class StaticDemo {
    // Static method
    static void greet() {
        System.out.println("Hello! This is a static method.");
    }

    // Non-static instance method
    void showMessage() {
        System.out.println("This is a non-static method.");
    }

    public static void main(String[] args) {
        // Calling static method directly without creating an object
        greet();

        // Calling non-static method requires an object instance
        StaticDemo obj = new StaticDemo();
        obj.showMessage();
    }
}`,
      output: `Hello! This is a static method.\nThis is a non-static method.`,
      diagram: "StaticDemo.greet() ──── Direct Metaspace Call (No Heap Object Required)"
    },
    {
      id: '3',
      title: '3. Static Block (Static Initializer)',
      badge: 'Class Loading Initialization',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: "Executed exactly once by the JVM when the class is first loaded into memory, even before main() or constructors execute.",
      code: `public class StaticDemo {
    static int maxLimit;

    static {
        maxLimit = 100; // Complex static initialization
        System.out.println("Static block executed.");
    }

    public static void main(String[] args) {
        System.out.println("Max Limit : " + maxLimit);
        System.out.println("Main method executed");
    }
}`,
      output: `Static block executed.\nMax Limit : 100\nMain method executed`,
      diagram: "ClassLoader Loads Class ────► Static Block Runs ONCE ────► main() Executes"
    },
    {
      id: '4',
      title: '4. Static Nested Class',
      badge: 'Independent Nested Class',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      description: "A nested class declared as static does not require an instance of the outer enclosing class to be instantiated.",
      code: `public class Outer {
    // Static nested class
    static class Inner {
        void show() {
            System.out.println("Static nested class method.");
        }
    }

    public static void main(String[] args) {
        // Creating an object of the static nested class directly
        Outer.Inner obj = new Outer.Inner();
        obj.show();
    }
}`,
      output: `Static nested class method.`,
      diagram: "Outer.Inner obj = new Outer.Inner(); ──── Instantiated without Outer instance"
    }
  ];

  const currentApp = appsData.find(a => a.id === selectedApp) || appsData[0];

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Class-Level Memory Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            "static" Keyword in Java
          </h3>
        </div>

        {/* Master Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'applications'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4 Static Applications</span>
          </button>

          <button
            onClick={() => setActiveTab('metaspace')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'metaspace'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Metaspace vs Heap Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers2 className="w-3.5 h-3.5" />
            <span>Static vs Instance</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: 4 STATIC APPLICATIONS                                          */}
      {/* ===================================================================== */}
      {activeTab === 'applications' && (
        <div className="space-y-6 relative z-10">
          
          {/* 4 Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {appsData.map(item => {
              const isSelected = selectedApp === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedApp(item.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 space-y-1 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold text-white block line-clamp-1">{item.title}</span>
                  <span className={`text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded border inline-block ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Application Content */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Code Viewer (7 cols) */}
            <div className="xl:col-span-7 space-y-2 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{currentApp.title}</span>
                </span>
                <span>Java 21</span>
              </div>
              <UltraModernCodeViewer code={currentApp.code} />
            </div>

            {/* Right: Theory & Console Output (5 cols) */}
            <div className="xl:col-span-5 space-y-4 min-w-0">
              
              <div className="p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-3 shadow-inner">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${currentApp.badgeColor}`}>
                  {currentApp.badge}
                </span>

                <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {currentApp.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentApp.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300">
                  <strong className="text-slate-400 block mb-0.5">Architecture Flow:</strong>
                  <span>{currentApp.diagram}</span>
                </div>
              </div>

              {/* Console Output */}
              <div className="p-4 rounded-2xl bg-[#040711] border border-slate-800 font-mono text-xs shadow-inner space-y-2">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1 text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Standard Output</span>
                  </span>
                  <span>Exit 0</span>
                </div>
                <pre className="text-emerald-300 leading-relaxed whitespace-pre-line">
                  {currentApp.output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: METASPACE VS HEAP MEMORY SIMULATOR                             */}
      {/* ===================================================================== */}
      {activeTab === 'metaspace' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Metaspace (Shared Static) vs Heap (Instance Objects) Simulator</span>
              </h4>
              <p className="text-xs text-slate-300">
                Notice how adding new student objects allocates distinct Heap memories for <code>name</code> & <code>rollNo</code>, while referencing the <strong>same single copy of <code>schoolName</code> in Metaspace</strong>!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddStudent}
                disabled={studentList.length >= 5}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-md shadow-cyan-500/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Student Object ({studentList.length}/5)</span>
              </button>

              <button
                onClick={handleResetStudents}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 font-mono text-xs">
            
            {/* Metaspace (5 cols) */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-[#060D1A] border border-cyan-500/50 space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-cyan-900/60">
                <span className="text-cyan-400 font-bold flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>METASPACE (Class Level)</span>
                </span>
                <span className="text-[10px] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  Allocated ONCE
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="text-slate-400 text-[11px] font-bold">Class: Student.class</div>
                <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500 text-cyan-200">
                  <span className="text-[10px] text-cyan-400 block uppercase">Shared Static Variable:</span>
                  <strong className="text-sm">static schoolName = "ABC Public School"</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500 text-emerald-200">
                  <span className="text-[10px] text-emerald-400 block uppercase">Shared Object Counter:</span>
                  <strong className="text-sm">static count = {studentList.length}</strong>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                All {studentList.length} Heap objects share this exact memory address.
              </p>
            </div>

            {/* Heap Memory (7 cols) */}
            <div className="md:col-span-7 p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-emerald-400 font-bold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>HEAP MEMORY ({studentList.length} Objects)</span>
                </span>
                <span className="text-[10px] text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Per-Object Instances
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {studentList.map((stu, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 hover:border-slate-700 transition">
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Student Object #{idx + 1}</span>
                      <span className="text-cyan-400">0x{1000 + idx * 8}</span>
                    </div>
                    <div className="text-white font-bold">{stu.name} (Roll: {stu.rollNo})</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1 pt-0.5">
                      <span>schoolName ──►</span>
                      <span className="text-cyan-400 font-mono">Metaspace</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: STATIC VS INSTANCE COMPARISON                                  */}
      {/* ===================================================================== */}
      {activeTab === 'compare' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Layers2 className="w-4 h-4 text-cyan-400" />
              <span>Master Comparison: Static vs Instance Members</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Key differences between class-level and instance-level members:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#060B16]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-300 uppercase text-[11px]">
                <tr>
                  <th className="p-3.5">Feature</th>
                  <th className="p-3.5">Static Member (Class-Level)</th>
                  <th className="p-3.5">Instance Member (Object-Level)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-cyan-300">Memory Location</td>
                  <td className="p-3.5"><strong>Metaspace / Method Area</strong></td>
                  <td className="p-3.5"><strong>Heap Memory</strong> (inside each object)</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-cyan-300">Creation Timing</td>
                  <td className="p-3.5">Allocated <strong>only once</strong> when class loads</td>
                  <td className="p-3.5">Allocated <strong>every time</strong> `new` is called</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-cyan-300">Access Syntax</td>
                  <td className="p-3.5"><code>ClassName.member</code></td>
                  <td className="p-3.5"><code>objectReference.member</code></td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-cyan-300">Access to Instance Fields</td>
                  <td className="p-3.5 text-rose-400 font-bold">❌ Cannot access instance fields directly</td>
                  <td className="p-3.5 text-emerald-400 font-bold">✅ Can access both instance & static</td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-bold text-cyan-300">`this` & `super` Usage</td>
                  <td className="p-3.5 text-rose-400 font-bold">❌ Forbidden in static context</td>
                  <td className="p-3.5 text-emerald-400 font-bold">✅ Fully supported</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
