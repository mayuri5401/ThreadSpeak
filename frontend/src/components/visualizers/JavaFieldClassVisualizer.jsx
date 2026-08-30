import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  FileCode, Check, Server, Database, Code, Users, HelpCircle, Lock, Unlock,
  Sliders, RefreshCw
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaFieldClassVisualizer
 * High-Yield Interactive Field Class Architecture Theater:
 * 1. 4 Core Pillars of Field Class (Metadata, Private Access Bypass, Dynamic Get/Set, Static Resolution)
 * 2. Live Interactive Field Mutator Sandbox (Live Heap Memory Mutator)
 * 3. getField() vs getDeclaredField() Architecture Matrix
 * 4. Interactive Knowledge Quiz
 */
export default function JavaFieldClassVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('pillars'); // 'pillars' | 'mutator' | 'comparison' | 'quiz'
  const [selectedPillar, setSelectedPillar] = useState('1'); // '1' | '2' | '3' | '4'

  // LIVE MUTATOR SANDBOX STATE
  const [inputName, setInputName] = useState('John');
  const [inputAge, setInputAge] = useState(25);
  const [heapState, setHeapState] = useState({ name: 'John', age: 25 });
  const [isAccessibleEnabled, setIsAccessibleEnabled] = useState(true);
  const [mutatorLog, setMutatorLog] = useState([
    'Student s = new Student(); // Allocated in Heap @0x7FFE',
    'field.setAccessible(true); // Suppressed private modifier check',
    'field.set(s, "John"); // String name updated in Heap slot',
    'field.set(s, 25); // int age updated in Heap slot'
  ]);

  // QUIZ STATE
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // 4 Core Pillars Data (Matching User's Student Program)
  const fieldPillarsData = [
    {
      id: '1',
      num: '1',
      title: '1. Field Metadata Inspection',
      badge: 'Name, Type & Modifiers',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      description: 'The Field class lets you extract the field name (getName), its declared data type (getType), and access modifiers (getModifiers) dynamically at runtime.',
      code: `import java.lang.reflect.*;

class Student {
    public String name;
    private int age;
}

public class Main {
    public static void main(String[] args) {
        Class<?> c = Student.class;

        for (Field field : c.getDeclaredFields()) {
            System.out.println("Field Name: " + field.getName());
            System.out.println("Type: " + field.getType().getSimpleName());
            System.out.println("Modifiers: " + Modifier.toString(field.getModifiers()));
            System.out.println("Is Synthetic: " + field.isSynthetic() + "\\n");
        }
    }
}`,
      output: `Field Name: name\nType: String\nModifiers: public\nIs Synthetic: false\n\nField Name: age\nType: int\nModifiers: private\nIs Synthetic: false`,
      diagram: "Student.class ──► getDeclaredFields() ──► [Field: name (String, public), Field: age (int, private)]"
    },
    {
      id: '2',
      num: '2',
      title: '2. Private Field Access & Mutation',
      badge: 'setAccessible(true) & set()',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'Even if a field is declared private, calling field.setAccessible(true) suppresses Java language access checks, enabling frameworks like Spring & Hibernate to inject values.',
      code: `import java.lang.reflect.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Student s = new Student();
        Field ageField = Student.class.getDeclaredField("age");

        // Suppress private access check
        ageField.setAccessible(true);

        // Dynamically set value into object instance
        ageField.set(s, 25);

        System.out.println("Updated Private Age: " + ageField.get(s));
    }
}`,
      output: `Updated Private Age: 25`,
      diagram: "ageField.setAccessible(true) ──► Bypasses 'private' ──► ageField.set(s, 25)"
    },
    {
      id: '3',
      num: '3',
      title: '3. Dynamic Field Value Getter',
      badge: 'field.get(instance)',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: 'field.get(Object instance) extracts the runtime value of that field from the specific object in Heap memory. Specialized getters like getInt() avoid autoboxing.',
      code: `import java.lang.reflect.*;

public class Main {
    public static void main(String[] args) throws Exception {
        Student s = new Student();
        s.name = "John";

        Field nameField = Student.class.getDeclaredField("name");
        
        // Read value from object instance
        Object val = nameField.get(s);
        System.out.println("Value of name: " + val);
    }
}`,
      output: `Value of name: John`,
      diagram: "nameField.get(s) ──► Reads Heap memory slot of Student instance @0x7FFE"
    },
    {
      id: '4',
      num: '4',
      title: '4. Static vs Instance Field Resolution',
      badge: 'Static: get(null)',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      description: 'For instance fields, you must pass the target object instance: field.get(s). For static fields shared across all instances, you pass null: field.get(null).',
      code: `import java.lang.reflect.*;

class University {
    public static String UNI_NAME = "Stanford University";
}

public class Main {
    public static void main(String[] args) throws Exception {
        Field staticField = University.class.getField("UNI_NAME");

        // Pass null because static fields belong to the Class, not an instance!
        System.out.println("Static Value: " + staticField.get(null));
    }
}`,
      output: `Static Value: Stanford University`,
      diagram: "Static Field (Class Metaspace) ──► field.get(null) [No instance required!]"
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      q: 'Which method must be called to access or modify a private field via Reflection?',
      options: [
        'field.unlock()',
        'field.setAccessible(true)',
        'field.overrideModifiers(Modifier.PUBLIC)',
        'field.makePublic()'
      ],
      correct: 1,
      explanation: 'field.setAccessible(true) (inherited from AccessibleObject) suppresses Java language access control checks.'
    },
    {
      id: 2,
      q: 'What object argument should you pass to field.get(obj) when reading a static field?',
      options: [
        'null',
        'new Object()',
        'Class.forName()',
        'this'
      ],
      correct: 0,
      explanation: 'Because static fields belong to the Class metadata in Metaspace and not to any specific Heap instance, you pass null.'
    },
    {
      id: 3,
      q: 'What is the difference between getField("x") and getDeclaredField("x")?',
      options: [
        'getField gets only private fields; getDeclaredField gets public fields',
        'getField returns only public fields (including inherited); getDeclaredField returns all fields declared in that class (including private)',
        'They are completely identical in modern Java',
        'getDeclaredField works only on interface constants'
      ],
      correct: 1,
      explanation: 'getField() searches public fields in class and superclasses. getDeclaredField() returns any field declared directly in that class regardless of access level.'
    }
  ];

  // RESET ALL HANDLER
  const handleResetAll = () => {
    setSelectedPillar('1');
    setInputName('John');
    setInputAge(25);
    setHeapState({ name: 'John', age: 25 });
    setIsAccessibleEnabled(true);
    setMutatorLog([
      'Student s = new Student(); // Allocated in Heap @0x7FFE',
      'field.setAccessible(true); // Suppressed private modifier check',
      'field.set(s, "John"); // String name updated in Heap slot',
      'field.set(s, 25); // int age updated in Heap slot'
    ]);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleApplyMutation = () => {
    if (!isAccessibleEnabled) {
      setMutatorLog(prev => [
        `❌ IllegalAccessException: Cannot access private member 'int age' without field.setAccessible(true)!`,
        ...prev
      ]);
      return;
    }
    setHeapState({ name: inputName, age: Number(inputAge) });
    setMutatorLog(prev => [
      `✅ Reflection Success: nameField.set(s, "${inputName}") & ageField.set(s, ${inputAge})`,
      `[Heap Slot @0x7FFE] name = "${inputName}" | age = ${inputAge}`,
      ...prev
    ]);
  };

  const handleSelectQuizOption = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const currentPillar = fieldPillarsData.find(p => p.id === selectedPillar) || fieldPillarsData[0];

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
                <span>Interactive Field Class Architecture Theater</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-0.5">
              Field Class in Java Reflection
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
          <Box className="w-3.5 h-3.5" />
          <span>📦 4 Pillars of Field Class</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mutator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
            activeTab === 'mutator'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>⚡ Live Field Mutator Sandbox</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('comparison')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
            activeTab === 'comparison'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>🔍 getField() vs getDeclaredField()</span>
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
            {fieldPillarsData.map(p => {
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
                  <span className="text-slate-400 block text-[10px] mb-0.5 uppercase tracking-wider">Field Pipeline Link:</span>
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

      {/* TAB 2: LIVE FIELD MUTATOR SANDBOX */}
      {activeTab === 'mutator' && (
        <div className="mt-5 space-y-5 animate-in fade-in duration-300">
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Live Reflection Mutator:</span> Adjust the fields below and click <b>"Mutate via Reflection"</b>. Watch how <code className="text-cyan-300 font-mono">field.set(s, value)</code> writes directly to the Heap memory slot of the <code className="text-cyan-300 font-mono">Student</code> instance!
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* MUTATION CONTROLS (6 cols) */}
            <div className="lg:col-span-6 space-y-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>Reflection Input Controls</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsAccessibleEnabled(!isAccessibleEnabled)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition cursor-pointer ${
                    isAccessibleEnabled 
                      ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300' 
                      : 'bg-red-950 border-red-500/50 text-red-300'
                  }`}
                >
                  {isAccessibleEnabled ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                  <span>setAccessible({isAccessibleEnabled.toString()})</span>
                </button>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">
                    Field 1: <code className="text-cyan-300">public String name</code>
                  </label>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="Enter student name..."
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">
                    Field 2: <code className="text-red-300">private int age</code>
                  </label>
                  <input
                    type="number"
                    value={inputAge}
                    onChange={(e) => setInputAge(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    placeholder="Enter student age..."
                  />
                </div>

                <button
                  type="button"
                  onClick={handleApplyMutation}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition cursor-pointer shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute field.set(s, value)</span>
                </button>
              </div>
            </div>

            {/* LIVE HEAP VISUALIZER (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0C152B] via-slate-900 to-[#0C152B] border border-cyan-500/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
                  <span className="flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <span>JVM Heap Memory @0x7FFE</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    Live Object Instance
                  </span>
                </div>

                {/* HEAP OBJECT CARD */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="text-amber-300 font-bold text-xs pb-2 border-b border-slate-800 flex items-center justify-between">
                    <span>Student instance</span>
                    <span className="text-slate-500 text-[10px]">Class: Student.class</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-700/80 space-y-1">
                      <span className="text-[10px] text-slate-400 block">name (String)</span>
                      <span className="text-emerald-300 font-bold text-sm">"{heapState.name}"</span>
                      <span className="text-[9px] text-emerald-400 block">public</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-700/80 space-y-1">
                      <span className="text-[10px] text-slate-400 block">age (int)</span>
                      <span className="text-amber-300 font-bold text-sm">{heapState.age}</span>
                      <span className="text-[9px] text-red-400 block">private (bypassed)</span>
                    </div>
                  </div>
                </div>

                {/* ACTIVITY LOG */}
                <div className="space-y-1 text-[11px] font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 max-h-32 overflow-y-auto">
                  <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">Reflection Activity Log:</div>
                  {mutatorLog.map((log, i) => (
                    <div key={i} className="leading-snug">{log}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GETFIELD VS GETDECLAREDFIELD COMPARISON */}
      {activeTab === 'comparison' && (
        <div className="mt-5 space-y-5 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {/* GETFIELD */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-cyan-300 font-bold text-sm">c.getField(name)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Public Only</span>
              </div>
              <ul className="space-y-2 text-slate-300 text-xs font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Returns <b>public</b> fields only.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span><b>Includes inherited public fields</b> from superclasses and superinterfaces.</span>
                </li>
                <li className="flex items-start gap-2 text-red-300">
                  <span className="text-red-400 font-bold">❌</span>
                  <span>Throws <code className="text-red-300 font-mono">NoSuchFieldException</code> if the field is private or protected.</span>
                </li>
              </ul>
            </div>

            {/* GETDECLAREDFIELD */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-purple-300 font-bold text-sm">c.getDeclaredField(name)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">All Visibility</span>
              </div>
              <ul className="space-y-2 text-slate-300 text-xs font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Returns <b>all fields</b> (public, protected, default, private).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>Restricted strictly to the <b>current declaring class</b>.</span>
                </li>
                <li className="flex items-start gap-2 text-red-300">
                  <span className="text-red-400 font-bold">❌</span>
                  <span>Does <b>NOT</b> include inherited fields from superclasses.</span>
                </li>
              </ul>
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
              <span>Test Your Field Class Mastery</span>
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
