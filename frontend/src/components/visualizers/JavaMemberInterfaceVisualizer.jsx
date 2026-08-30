import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  FileCode, Check, Server, Database, Code, Users, HelpCircle
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaMemberInterfaceVisualizer
 * High-Yield Interactive Member Interface Architecture Theater:
 * 1. 4 Core Pillars of Member Interface (Field, Method, Constructor, Modifier Bitmask)
 * 2. Interactive Modifier Bitmask Decoder Lab
 * 3. Compiler Synthetic Members Studio (isSynthetic() Deep-Dive)
 * 4. Interactive Knowledge Quiz
 */
export default function JavaMemberInterfaceVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('pillars'); // 'pillars' | 'bitmask' | 'synthetic' | 'quiz'
  const [selectedPillar, setSelectedPillar] = useState('1'); // '1' | '2' | '3' | '4'

  // MODIFIER BITMASK STATE
  const [selectedModifiers, setSelectedModifiers] = useState({
    public: true,
    static: false,
    final: false,
    synchronized: false,
    transient: false,
    volatile: false
  });

  // QUIZ STATE
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // 4 Core Pillars Data (Exact match to user's Student program)
  const memberPillarsData = [
    {
      id: '1',
      num: '1',
      title: '1. Polymorphic Field Inspection',
      badge: 'Field Member Contract',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      description: 'Field implements Member interface. You can extract its name, declaring class, and access modifiers polymorphically without casting.',
      code: `import java.lang.reflect.*;

class Student {
    public String name;
    private int age;

    public Student() {}
    public void study() {}
}

public class Main {
    public static void main(String[] args) {
        Class<?> clazz = Student.class;

        // Iterate declared fields as Member instances
        for (Field field : clazz.getDeclaredFields()) {
            System.out.println("Member Name: " + field.getName());
            System.out.println("Declaring Class: " + field.getDeclaringClass().getSimpleName());
            System.out.println("Modifiers: " + Modifier.toString(field.getModifiers()));
            System.out.println("Is Synthetic: " + field.isSynthetic() + "\\n");
        }
    }
}`,
      output: `Member Name: name\nDeclaring Class: Student\nModifiers: public\nIs Synthetic: false\n\nMember Name: age\nDeclaring Class: Student\nModifiers: private\nIs Synthetic: false`,
      diagram: "Student.class ──► getDeclaredFields() ──► [Field: name, Field: age] (implements Member)"
    },
    {
      id: '2',
      num: '2',
      title: '2. Polymorphic Method Inspection',
      badge: 'Method Member Contract',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'Method implements Member interface. Frameworks can inspect method names, return types, parameter counts, and visibility across classes uniformly.',
      code: `import java.lang.reflect.*;

public class Main {
    public static void main(String[] args) {
        Class<?> clazz = Student.class;

        // Iterate declared methods as Member instances
        for (Method method : clazz.getDeclaredMethods()) {
            System.out.println("Member Name: " + method.getName());
            System.out.println("Declaring Class: " + method.getDeclaringClass().getSimpleName());
            System.out.println("Modifiers: " + Modifier.toString(method.getModifiers()));
            System.out.println("Is Synthetic: " + method.isSynthetic() + "\\n");
        }
    }
}`,
      output: `Member Name: study\nDeclaring Class: Student\nModifiers: public\nIs Synthetic: false`,
      diagram: "Student.class ──► getDeclaredMethods() ──► [Method: study()] (implements Member)"
    },
    {
      id: '3',
      num: '3',
      title: '3. Polymorphic Constructor Inspection',
      badge: 'Constructor Member Contract',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: 'Constructor implements Member interface. Allows discovering object creation contracts, parameters, and access permissions at runtime.',
      code: `import java.lang.reflect.*;

public class Main {
    public static void main(String[] args) {
        Class<?> clazz = Student.class;

        // Iterate declared constructors as Member instances
        for (Constructor<?> constructor : clazz.getDeclaredConstructors()) {
            System.out.println("Member Name: " + constructor.getName());
            System.out.println("Declaring Class: " + constructor.getDeclaringClass().getSimpleName());
            System.out.println("Modifiers: " + Modifier.toString(constructor.getModifiers()));
            System.out.println("Is Synthetic: " + constructor.isSynthetic() + "\\n");
        }
    }
}`,
      output: `Member Name: Student\nDeclaring Class: Student\nModifiers: public\nIs Synthetic: false`,
      diagram: "Student.class ──► getDeclaredConstructors() ──► [Constructor: Student()] (implements Member)"
    },
    {
      id: '4',
      num: '4',
      title: '4. Modifier Bitmask & Synthetic Discovery',
      badge: 'Bytecode Bitflags',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      description: 'Member.getModifiers() returns an int bitmask decoded via Modifier.toString(), while isSynthetic() reveals compiler-generated code.',
      code: `import java.lang.reflect.*;

public class Main {
    public static void auditMember(Member m) {
        int mod = m.getModifiers();
        System.out.printf("[%s] %s | Bitmask: 0x%04X | Modifiers: %s | Synthetic: %b%n",
            m.getClass().getSimpleName(),
            m.getName(),
            mod,
            Modifier.toString(mod),
            m.isSynthetic()
        );
    }

    public static void main(String[] args) {
        for (Field f : Student.class.getDeclaredFields()) auditMember(f);
        for (Method m : Student.class.getDeclaredMethods()) auditMember(m);
    }
}`,
      output: `[Field] name  | Bitmask: 0x0001 | Modifiers: public  | Synthetic: false\n[Field] age   | Bitmask: 0x0002 | Modifiers: private | Synthetic: false\n[Method] study | Bitmask: 0x0001 | Modifiers: public  | Synthetic: false`,
      diagram: "Modifier.toString(0x0001) ──► 'public' | Modifier.toString(0x0002) ──► 'private'"
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      q: 'Which of the following reflection classes DO NOT implement the Member interface?',
      options: [
        'java.lang.reflect.Field',
        'java.lang.reflect.Method',
        'java.lang.Class',
        'java.lang.reflect.Constructor'
      ],
      correct: 2,
      explanation: 'Class represents the class container itself, not an individual member declared inside it. Field, Method, and Constructor implement Member.'
    },
    {
      id: 2,
      q: 'What does member.isSynthetic() return true for?',
      options: [
        'Private fields written by the developer',
        'Compiler-generated members (not present in original source code)',
        'Inherited methods from java.lang.Object',
        'Static synchronized methods'
      ],
      correct: 1,
      explanation: 'isSynthetic() returns true if the member was introduced by the Java compiler (such as enum value arrays or inner-class access bridges).'
    },
    {
      id: 3,
      q: 'How are modifiers returned by member.getModifiers() represented in memory?',
      options: [
        'As a comma-separated String',
        'As an integer bitmask decoded via Modifier.toString(int)',
        'As an EnumSet<Modifier>',
        'As a boolean array'
      ],
      correct: 1,
      explanation: 'getModifiers() returns an int bitmask where specific bits represent public (0x0001), private (0x0002), static (0x0008), final (0x0010), etc.'
    }
  ];

  // RESET ALL
  const handleResetAll = () => {
    setSelectedPillar('1');
    setSelectedModifiers({
      public: true,
      static: false,
      final: false,
      synchronized: false,
      transient: false,
      volatile: false
    });
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const calculateBitmask = () => {
    let mask = 0;
    if (selectedModifiers.public) mask |= 0x0001;
    if (selectedModifiers.static) mask |= 0x0008;
    if (selectedModifiers.final) mask |= 0x0010;
    if (selectedModifiers.synchronized) mask |= 0x0020;
    if (selectedModifiers.volatile) mask |= 0x0040;
    if (selectedModifiers.transient) mask |= 0x0080;
    return mask;
  };

  const getDecodedString = () => {
    const list = [];
    if (selectedModifiers.public) list.push('public');
    if (selectedModifiers.static) list.push('static');
    if (selectedModifiers.final) list.push('final');
    if (selectedModifiers.synchronized) list.push('synchronized');
    if (selectedModifiers.volatile) list.push('volatile');
    if (selectedModifiers.transient) list.push('transient');
    return list.length > 0 ? list.join(' ') : 'default (package-private)';
  };

  const handleSelectQuizOption = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const currentPillar = memberPillarsData.find(p => p.id === selectedPillar) || memberPillarsData[0];

  return (
    <div className="w-full rounded-2xl bg-[#080D1A] border border-cyan-500/30 p-4 sm:p-6 text-white shadow-2xl shadow-cyan-950/20 font-sans">
      {/* THEATER HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Member Interface Architecture Theater</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
              Member Interface in Java Reflection
            </h2>
          </div>
        </div>

        {/* RESET ALL BUTTON */}
        <button
          type="button"
          onClick={handleResetAll}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-cyan-500/50 text-xs font-medium transition cursor-pointer shadow-sm active:scale-95"
          title="Reset visualizer to default initial state"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset All</span>
        </button>
      </div>

      {/* TOP TABS NAVIGATION */}
      <div className="flex flex-wrap gap-2 mt-5 p-1 bg-slate-950/70 rounded-xl border border-slate-800/80">
        <button
          type="button"
          onClick={() => setActiveTab('pillars')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
            activeTab === 'pillars'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>🏷️ 4 Pillars of Member Interface</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bitmask')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
            activeTab === 'bitmask'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>⚙️ Modifier Bitmask Decoder</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('synthetic')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
            activeTab === 'synthetic'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>🛡️ Synthetic Members Studio</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>🧠 Interactive Quiz</span>
        </button>
      </div>

      {/* TAB 1: 4 PILLARS THEATER */}
      {activeTab === 'pillars' && (
        <div className="mt-5 space-y-5 animate-in fade-in duration-300">
          {/* 4 PILLAR CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {memberPillarsData.map(p => {
              const isSelected = selectedPillar === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPillar(p.id)}
                  className={`p-3.5 rounded-xl text-left border transition cursor-pointer flex flex-col justify-between min-h-[90px] ${
                    isSelected
                      ? 'bg-gradient-to-b from-cyan-950/70 via-slate-900 to-cyan-950/70 border-cyan-400 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs text-white leading-tight mb-2">
                    {p.title}
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border inline-block w-fit ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* DUAL SPLIT PANE: CODE VIEWER (LEFT) + EXPLANATION & OUTPUT (RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* LEFT: ULTRA MODERN CODE VIEWER (7 cols) */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 px-1">
                <span>&lt;/&gt; {currentPillar.title}</span>
                <span className="text-slate-400">Java 21</span>
              </div>
              <UltraModernCodeViewer
                code={currentPillar.code}
                title="Main.java"
                badge="Java 21 LTS"
              />
            </div>

            {/* RIGHT: EXPLANATION CARD & TERMINAL OUTPUT (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* EXPLANATION CARD */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-xl space-y-3">
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border inline-block ${currentPillar.badgeColor}`}>
                  {currentPillar.badge}
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {currentPillar.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                  {currentPillar.description}
                </p>

                {/* ARCHITECTURE DIAGRAM PILL */}
                <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[11px] font-mono text-cyan-200">
                  <span className="text-slate-400 block text-[10px] mb-0.5 uppercase tracking-wider">Member Architecture Link:</span>
                  {currentPillar.diagram}
                </div>
              </div>

              {/* TERMINAL CONSOLE OUTPUT */}
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-black/90 shadow-xl font-mono text-xs">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-2 text-[11px] text-slate-400">Execution Output</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">SUCCESS</span>
                </div>
                <div className="p-4 text-emerald-300 text-[11px] leading-relaxed whitespace-pre-wrap">
                  {currentPillar.output}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MODIFIER BITMASK DECODER */}
      {activeTab === 'bitmask' && (
        <div className="mt-5 space-y-5 animate-in fade-in duration-300">
          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200 flex items-start gap-2.5">
            <Cpu className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Bitmask Storage:</span> In the JVM bytecode, access modifiers are packed into a single <code className="text-cyan-300 font-mono">int</code> value using binary bitflags. <code className="text-cyan-300 font-mono">Modifier.toString(member.getModifiers())</code> decodes this bitmask into human-readable keywords.
            </div>
          </div>

          {/* INTERACTIVE BITMASK TOGGLES */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {[
              { key: 'public', label: 'public', bit: '0x0001 (bit 0)' },
              { key: 'static', label: 'static', bit: '0x0008 (bit 3)' },
              { key: 'final', label: 'final', bit: '0x0010 (bit 4)' },
              { key: 'synchronized', label: 'synchronized', bit: '0x0020 (bit 5)' },
              { key: 'volatile', label: 'volatile', bit: '0x0040 (bit 6)' },
              { key: 'transient', label: 'transient', bit: '0x0080 (bit 7)' },
            ].map(m => (
              <button
                key={m.key}
                type="button"
                onClick={() => setSelectedModifiers(prev => ({ ...prev, [m.key]: !prev[m.key] }))}
                className={`p-3 rounded-xl text-left border transition cursor-pointer flex items-center justify-between ${
                  selectedModifiers[m.key]
                    ? 'bg-cyan-950/70 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-mono text-xs font-bold text-white">{m.label}</div>
                  <div className="text-[10px] text-slate-500">{m.bit}</div>
                </div>
                <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                  selectedModifiers[m.key] ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-slate-700'
                }`}>
                  {selectedModifiers[m.key] && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            ))}
          </div>

          {/* DECODER CARD */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#0C152B] via-slate-900 to-[#0C152B] border border-cyan-500/40 font-mono text-xs">
            <div className="text-xs font-bold text-cyan-300 mb-2">Live Modifier Bitmask Decoder:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Integer Value</div>
                <div className="text-amber-300 font-bold text-sm">{calculateBitmask()}</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Hexadecimal Bitmask</div>
                <div className="text-purple-300 font-bold text-sm">0x{calculateBitmask().toString(16).toUpperCase().padStart(4, '0')}</div>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Modifier.toString(...)</div>
                <div className="text-emerald-400 font-bold text-sm">"{getDecodedString()}"</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SYNTHETIC MEMBERS STUDIO */}
      {activeTab === 'synthetic' && (
        <div className="mt-5 space-y-5 animate-in fade-in duration-300">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">What is a Synthetic Member?</span> A member is <b>synthetic</b> (<code className="text-cyan-300">isSynthetic() == true</code>) if it was generated by the Java compiler and does not appear in your original source code!
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {/* SOURCE CODE */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-cyan-300 font-bold pb-2 border-b border-slate-800">Source Code (You Wrote):</div>
              <pre className="text-slate-300 text-[12px] leading-relaxed">
{`public enum Status {
    ACTIVE, INACTIVE;
}`}
              </pre>
              <div className="text-[11px] text-slate-500 mt-2 font-sans">
                You only declared 2 enum constants.
              </div>
            </div>

            {/* COMPILER GENERATED */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-purple-300 font-bold pb-2 border-b border-slate-800">Bytecode (Compiler Generated):</div>
              <pre className="text-slate-300 text-[12px] leading-relaxed">
{`private static final Status[] $VALUES;
// Synthetic helper array!
isSynthetic() -> true`}
              </pre>
              <div className="text-[11px] text-slate-500 mt-2 font-sans">
                The compiler generates <code className="text-purple-300">$VALUES</code> array to power <code className="text-cyan-300">values()</code>.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="mt-5 space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Test Your Member Interface Mastery</span>
            </h3>
            {quizSubmitted && (
              <button
                type="button"
                onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retry Quiz</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {quizQuestions.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];
              const isCorrect = selectedOpt === q.correct;

              return (
                <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs sm:text-sm font-bold text-white flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{q.q}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {q.options.map((opt, oIdx) => {
                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (selectedOpt === oIdx) {
                        btnStyle = 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold';
                      }
                      if (quizSubmitted) {
                        if (oIdx === q.correct) {
                          btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                        } else if (selectedOpt === oIdx && !isCorrect) {
                          btnStyle = 'bg-red-950 border-red-500 text-red-200';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => handleSelectQuizOption(q.id, oIdx)}
                          className={`p-3 rounded-lg text-left text-xs border transition cursor-pointer flex items-start gap-2 ${btnStyle}`}
                        >
                          <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className={`p-3 rounded-lg text-xs leading-relaxed ${isCorrect ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-200' : 'bg-red-950/40 border border-red-500/30 text-red-200'}`}>
                      <span className="font-bold">{isCorrect ? '✅ Correct!' : '❌ Incorrect.'} </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {!quizSubmitted && (
            <button
              type="button"
              onClick={() => setQuizSubmitted(true)}
              disabled={Object.keys(quizAnswers).length < quizQuestions.length}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit & Check Answers
            </button>
          )}
        </div>
      )}
    </div>
  );
}
