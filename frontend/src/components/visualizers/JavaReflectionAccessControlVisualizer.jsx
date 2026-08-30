import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Cpu, Layers, Play, Pause, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  FileCode, Check, Server, Database, Code, Users, HelpCircle, Lock, Unlock,
  Sliders, RefreshCw, Activity, ArrowDown, AlertTriangle, ShieldAlert, Key,
  Eye, EyeOff, Shield
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaReflectionAccessControlVisualizer
 * High-Yield Interactive Access Control in Java Reflection Theater:
 * 1. 4 Core Pillars of Access Control (Default Checks, setAccessible(true), trySetAccessible/canAccess, JPMS Modules)
 * 2. Live Security Gate & Bypass Simulator (Animated JVM Security Barrier & Heap Access)
 * 3. AccessibleObject Hierarchy & Version Matrix (Java 8 vs 9+ vs 17+ JPMS)
 * 4. Interactive Assessment Quiz
 */
export default function JavaReflectionAccessControlVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('pillars'); // 'pillars' | 'simulator' | 'matrix' | 'quiz'
  const [selectedPillar, setSelectedPillar] = useState('1'); // '1' | '2' | '3' | '4'

  // SIMULATOR STATE
  const [targetMember, setTargetMember] = useState('field'); // 'field' | 'method' | 'constructor'
  const [isAccessibleEnabled, setIsAccessibleEnabled] = useState(false);
  const [isJpmsSealed, setIsJpmsSealed] = useState(false);
  const [simStep, setSimStep] = useState(1); // 1: Target Ready, 2: Access Check Barrier, 3: Outcome/Heap Memory
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLog, setSimLog] = useState([]);

  // QUIZ STATE
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // 4 Core Pillars Data (Matching User's Programs)
  const accessControlPillars = [
    {
      id: '1',
      num: '1',
      title: '1. Default Access Control & IllegalAccessException',
      badge: 'Default: Access Denied ❌',
      badgeColor: 'border-red-500/40 text-red-300 bg-red-950/60',
      description: 'By default, Java protects private fields, methods, and constructors from external access. If reflection attempts to read, write, or invoke a private member without special permission, the JVM immediately halts execution by throwing an IllegalAccessException.',
      code: `import java.lang.reflect.*;

class Demo {
    private String secret = "This is private";

    private void showSecret() {
        System.out.println("Secret: " + secret);
    }
}

public class MainApp {
    public static void main(String[] args) throws Exception {
        Demo obj = new Demo();
        Class<?> c = obj.getClass();

        // Try to access private field without setAccessible()
        Field f = c.getDeclaredField("secret");

        try {
            System.out.println(f.get(obj)); // ❌ Throws IllegalAccessException
        } catch (IllegalAccessException e) {
            System.out.println("Cannot access private field without setAccessible(true)");
        }
    }
}`,
      output: `Cannot access private field without setAccessible(true)`,
      diagram: 'Caller ──► Field.get(obj) ──► 🛑 JVM Access Check (private) ──► 💥 IllegalAccessException'
    },
    {
      id: '2',
      num: '2',
      title: '2. Bypassing Checks with setAccessible(true)',
      badge: 'setAccessible(true) 🔓',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'Java Reflection provides the setAccessible(true) method (inherited from AccessibleObject). Calling setAccessible(true) on a Field, Method, or Constructor flags the object to suppress standard language access checks, granting full read, write, and invocation privileges.',
      code: `import java.lang.reflect.*;

class Student {
    private String name = "Deepak";

    private void showMessage() {
        System.out.println("Hello from private method!");
    }
}

public class MainApp {
    public static void main(String[] args) throws Exception {
        Student s = new Student();
        Class<?> c = Student.class;

        // 1. Access private field
        Field field = c.getDeclaredField("name");
        field.setAccessible(true); // ✅ bypass access control
        System.out.println("Private Field Value: " + field.get(s));

        // 2. Access private method
        Method method = c.getDeclaredMethod("showMessage");
        method.setAccessible(true); // ✅ allow invocation
        method.invoke(s);
    }
}`,
      output: `Private Field Value: Deepak\nHello from private method!`,
      diagram: 'field.setAccessible(true) ──► 🔓 Access Check Suppressed ──► field.get(s) / method.invoke(s) ✅'
    },
    {
      id: '3',
      num: '3',
      title: '3. Modern Java 9+ trySetAccessible() & canAccess()',
      badge: 'Java 9+ Non-Throwing API 🛡️',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
      description: 'In Java 9+, calling setAccessible(true) on restricted modules throws InaccessibleObjectException. To avoid exceptions, Java introduced trySetAccessible() (which returns a boolean without throwing) and canAccess(Object obj) for safe runtime probing.',
      code: `import java.lang.reflect.*;

class Vault {
    private String passcode = "SECURE_9988";
}

public class SafeAccessDemo {
    public static void main(String[] args) throws Exception {
        Vault vault = new Vault();
        Field passcodeField = Vault.class.getDeclaredField("passcode");

        // Non-throwing access request (Java 9+)
        boolean allowed = passcodeField.trySetAccessible();
        System.out.println("Access control bypassed safely? " + allowed);

        if (allowed && passcodeField.canAccess(vault)) {
            System.out.println("Passcode extracted: " + passcodeField.get(vault));
        }
    }
}`,
      output: `Access control bypassed safely? true\nPasscode extracted: SECURE_9988`,
      diagram: 'passcodeField.trySetAccessible() ──► Returns true/false gracefully (No exceptions thrown)'
    },
    {
      id: '4',
      num: '4',
      title: '4. JPMS Strong Encapsulation (Java 9 to Java 21+)',
      badge: 'JPMS & --add-opens 🌐',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      description: 'Starting with Java 9 and strictly enforced in Java 17+, the Java Platform Module System prevents reflection across module boundaries unless the package is explicitly opened using "opens <pkg> to <module>;" or JVM flag "--add-opens".',
      code: `// module-info.java
module com.mycompany.app {
    // Open models package specifically for Spring and Hibernate reflection
    opens com.mycompany.app.models to spring.core, org.hibernate.orm.core;
}

// Or run with CLI argument:
// java --add-opens java.base/java.lang=ALL-UNNAMED -jar myapp.jar`,
      output: `// Without --add-opens on JDK internals:
java.lang.reflect.InaccessibleObjectException: Unable to make field 
private final byte[] java.lang.String.value accessible: 
module java.base does not "opens java.lang" to unnamed module`,
      diagram: 'JPMS Boundary ──► Checks module-info "opens" ──► If Closed: InaccessibleObjectException ⛔'
    }
  ];

  // SIMULATOR RUNNER
  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);

    const logs = [];
    if (targetMember === 'field') {
      logs.push('1. Instantiated Demo obj = new Demo();');
      logs.push('2. Obtained Field f = Demo.class.getDeclaredField("secret");');
    } else if (targetMember === 'method') {
      logs.push('1. Instantiated Student s = new Student();');
      logs.push('2. Obtained Method m = Student.class.getDeclaredMethod("showMessage");');
    } else {
      logs.push('1. Obtained Constructor ctor = Singleton.class.getDeclaredConstructor();');
    }

    setTimeout(() => {
      setSimStep(2); // At Barrier
      if (isJpmsSealed) {
        logs.push('3. JPMS Module Guard: Checking module boundaries...');
        logs.push('4. ⛔ InaccessibleObjectException: Target package is sealed in module java.base!');
      } else if (!isAccessibleEnabled) {
        logs.push('3. JVM Access Check: Inspecting "private" modifier flag (0x0002)...');
        logs.push('4. ❌ IllegalAccessException: Cannot access a private member of class without setAccessible(true)!');
      } else {
        logs.push('3. AccessibleObject.override flag = true: Access checks bypassed!');
        if (targetMember === 'field') {
          logs.push('4. ✅ Memory read allowed! f.get(obj) returned "This is private"');
        } else if (targetMember === 'method') {
          logs.push('4. ✅ Invocation allowed! m.invoke(s) printed "Hello from private method!"');
        } else {
          logs.push('4. ✅ Private Constructor instantiated! newInstance() returned new object @0x3FA9');
        }
      }
      setSimLog(logs);
      setSimStep(3);
      setIsSimulating(false);
    }, 900);
  };

  const quizQuestions = [
    {
      id: 1,
      q: 'What exception is thrown if you try to read a private field via Field.get(obj) without calling setAccessible(true)?',
      options: [
        'NullPointerException',
        'IllegalAccessException',
        'NoSuchFieldException',
        'SecurityViolationException'
      ],
      correct: 1,
      explanation: 'Java throws java.lang.IllegalAccessException whenever code attempts to reflectively access a private, protected, or package-private member without bypassing access checks.'
    },
    {
      id: 2,
      q: 'Which common superclass provides the setAccessible() and trySetAccessible() methods for Field, Method, and Constructor?',
      options: [
        'java.lang.reflect.Member',
        'java.lang.reflect.AccessibleObject',
        'java.lang.reflect.Executable',
        'java.lang.Object'
      ],
      correct: 1,
      explanation: 'java.lang.reflect.AccessibleObject is the base class for Field, Method, and Constructor, providing the setAccessible(boolean) flag.'
    },
    {
      id: 3,
      q: 'Why was trySetAccessible() introduced in Java 9 as an alternative to setAccessible(true)?',
      options: [
        'It runs multi-threaded access checks faster',
        'It returns boolean false instead of throwing InaccessibleObjectException when access cannot be granted',
        'It permanently removes the private keyword from bytecode',
        'It only works for public methods'
      ],
      correct: 1,
      explanation: 'trySetAccessible() returns false gracefully on module or security failure rather than crashing with an InaccessibleObjectException.'
    },
    {
      id: 4,
      q: 'In modern Java (17+), how can an external library access private members of a sealed module package at runtime?',
      options: [
        'By using the deprecated SecurityManager',
        'By declaring "opens <package> to <module>;" in module-info.java or using the JVM flag --add-opens',
        'By casting the object to Object',
        'Private members can never be accessed in Java 17+'
      ],
      correct: 1,
      explanation: 'Modern JPMS requires the target module to explicitly "open" the package in module-info.java or via the JVM launch argument --add-opens <module>/<package>=ALL-UNNAMED.'
    }
  ];

  const handleSelectQuizOption = (questionId, optionIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="space-y-6">
      {/* Visualizer Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Reflection API Architecture
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono text-[11px] font-bold">
                AccessibleObject Core
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              Access Control in Java Reflection
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Explore how Java guards private members, how <code className="text-cyan-300">setAccessible(true)</code> unlocks encapsulation, and how modern JPMS enforces strong module boundaries.
            </p>
          </div>

          {onOpenPlayground && (
            <button
              onClick={() => onOpenPlayground('// Access Control Demo\nimport java.lang.reflect.*;\n\nclass Demo {\n    private String secret = "This is private";\n}\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        Demo d = new Demo();\n        Field f = Demo.class.getDeclaredField("secret");\n        f.setAccessible(true);\n        System.out.println("Extracted: " + f.get(d));\n    }\n}')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20 transition shrink-0"
            >
              <Code2 className="w-4 h-4" />
              <span>Open in Playground</span>
            </button>
          )}
        </div>

        {/* 4 Interactive Sub-Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          {[
            { id: 'pillars', label: '4 Core Pillars', icon: Layers },
            { id: 'simulator', label: 'Security Gate Simulator', icon: ShieldAlert },
            { id: 'matrix', label: 'Hierarchy & JPMS Matrix', icon: Server },
            { id: 'quiz', label: 'Knowledge Quiz', icon: HelpCircle },
          ].map(tab => {
            const Icon = tab.icon;
            const isCur = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition ${
                  isCur
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-600/20'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: 4 CORE PILLARS */}
      {activeTab === 'pillars' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Pillar Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {accessControlPillars.map(pillar => {
              const isSelected = selectedPillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar.id)}
                  className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-[#0F172A] border-cyan-500 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">
                      {pillar.num}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{pillar.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{pillar.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Deep Dive Card */}
          {(() => {
            const pillar = accessControlPillars.find(p => p.id === selectedPillar);
            return (
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${pillar.badgeColor}`}>
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Conceptual Flow Diagram */}
                <div className="p-3.5 rounded-2xl bg-[#070D18] border border-cyan-900/40 font-mono text-xs text-cyan-300 flex items-center gap-3">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold text-white">Execution Flow:</span>
                  <span className="text-slate-300 overflow-x-auto whitespace-nowrap">{pillar.diagram}</span>
                </div>

                {/* Side-by-Side Code & Output Viewer */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-800">
                    <UltraModernCodeViewer
                      code={pillar.code}
                      language="java"
                      filename={selectedPillar === '1' ? 'DemoApp.java' : selectedPillar === '2' ? 'StudentAccessApp.java' : 'ModernAccessApp.java'}
                    />
                  </div>

                  <div className="lg:col-span-4 flex flex-col space-y-3">
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wide font-mono flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span>Console Execution Output</span>
                    </div>
                    <div className="flex-1 p-4 rounded-2xl bg-[#050914] border border-slate-800/90 font-mono text-xs text-emerald-300 whitespace-pre-wrap flex flex-col justify-between shadow-inner">
                      <code>{pillar.output}</code>
                      <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Verified with OpenJDK 21 LTS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 2: LIVE SECURITY GATE SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-6 shadow-xl animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Interactive Security Barrier Simulator
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                Visualizing Java's Access Control Guard in Metaspace & Heap
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Select a member type, toggle <code className="text-cyan-300">setAccessible(true)</code>, and watch the JVM Security Gate allow or reject access.
              </p>
            </div>

            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/25 transition shrink-0 disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              <span>{isSimulating ? 'Evaluating Access Checks...' : 'Execute Reflection Access'}</span>
            </button>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            {/* Target Member Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 font-mono">1. Select Target Member:</label>
              <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                {[
                  { id: 'field', label: 'Field (secret)' },
                  { id: 'method', label: 'Method (showMessage)' },
                  { id: 'constructor', label: 'Constructor ()' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setTargetMember(item.id); setSimStep(1); }}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                      targetMember === item.id ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* setAccessible Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 font-mono">2. setAccessible(true) Master Key:</label>
              <button
                onClick={() => { setIsAccessibleEnabled(!isAccessibleEnabled); setSimStep(1); }}
                className={`w-full py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
                  isAccessibleEnabled 
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/50' 
                    : 'bg-red-950/80 border-red-500 text-red-300'
                }`}
              >
                {isAccessibleEnabled ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-red-400" />}
                <span>{isAccessibleEnabled ? 'setAccessible(true) [BYPASS ENABLED]' : 'Default [ACCESS CHECK ENFORCED]'}</span>
              </button>
            </div>

            {/* JPMS Strictness Toggle */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 font-mono">3. JPMS Module Boundary:</label>
              <button
                onClick={() => { setIsJpmsSealed(!isJpmsSealed); setSimStep(1); }}
                className={`w-full py-2 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition ${
                  isJpmsSealed 
                    ? 'bg-purple-950/80 border-purple-500 text-purple-300 shadow-md shadow-purple-950/50' 
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Shield className="w-4 h-4 text-purple-400" />
                <span>{isJpmsSealed ? 'JDK Module (java.base Sealed)' : 'App Classpath (Open)'}</span>
              </button>
            </div>
          </div>

          {/* Visual Interactive Animation Stage */}
          <div className="p-6 rounded-3xl bg-[#060A14] border border-slate-800 space-y-6 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Stage 1: Caller Application */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-center shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500 text-indigo-300 mx-auto flex items-center justify-center font-bold">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Caller Application</h4>
                  <p className="text-[11px] font-mono text-cyan-300 mt-0.5">MainApp.main()</p>
                </div>
                <div className="text-[11px] font-mono p-2 rounded-lg bg-slate-950 text-slate-300 border border-slate-800">
                  {targetMember === 'field' && 'f.get(obj)'}
                  {targetMember === 'method' && 'm.invoke(s)'}
                  {targetMember === 'constructor' && 'ctor.newInstance()'}
                </div>
              </div>

              {/* Stage 2: JVM Security & Access Barrier */}
              <div className={`p-5 rounded-2xl border text-center space-y-3 transition-all duration-300 shadow-xl ${
                isJpmsSealed
                  ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/50'
                  : isAccessibleEnabled
                  ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/50'
                  : 'bg-red-950/40 border-red-500 ring-2 ring-red-500/50'
              }`}>
                <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center font-bold shadow-lg transition-transform">
                  {isJpmsSealed ? (
                    <Shield className="w-7 h-7 text-purple-400 animate-pulse" />
                  ) : isAccessibleEnabled ? (
                    <Key className="w-7 h-7 text-emerald-400 animate-bounce" />
                  ) : (
                    <Lock className="w-7 h-7 text-red-400 animate-pulse" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {isJpmsSealed ? 'JPMS Module Gate' : 'JVM Access Control Barrier'}
                  </h4>
                  <p className={`text-[11px] font-mono font-bold mt-1 ${
                    isJpmsSealed ? 'text-purple-300' : isAccessibleEnabled ? 'text-emerald-300' : 'text-red-300'
                  }`}>
                    {isJpmsSealed 
                      ? 'Package Sealed in Module' 
                      : isAccessibleEnabled 
                      ? 'setAccessible(true) 🔓 BYPASS ACTIVE' 
                      : '🔒 PRIVATE MODIFIER LOCKED'}
                  </p>
                </div>
                <div className="text-[10px] text-slate-400">
                  {isJpmsSealed 
                    ? 'Requires --add-opens or module-info export'
                    : isAccessibleEnabled 
                    ? 'AccessibleObject.override = true' 
                    : 'Access check throws IllegalAccessException'}
                </div>
              </div>

              {/* Stage 3: Target Class & Memory Slot */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-center shadow-lg">
                <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500 text-amber-300 mx-auto flex items-center justify-center font-bold">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Target Class in Heap</h4>
                  <p className="text-[11px] font-mono text-amber-300 mt-0.5">
                    {targetMember === 'field' ? 'Demo @0x7FFE' : targetMember === 'method' ? 'Student @0x82AB' : 'Singleton Class'}
                  </p>
                </div>
                <div className="text-[11px] font-mono p-2 rounded-lg bg-slate-950 text-slate-300 border border-slate-800">
                  {targetMember === 'field' && 'private String secret = "This is private"'}
                  {targetMember === 'method' && 'private void showMessage()'}
                  {targetMember === 'constructor' && 'private Singleton() {}'}
                </div>
              </div>
            </div>

            {/* Live Result Callout */}
            <div className={`p-4 rounded-2xl border font-mono text-xs flex items-start gap-3 ${
              isJpmsSealed
                ? 'bg-purple-950/60 border-purple-800 text-purple-200'
                : isAccessibleEnabled
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                : 'bg-red-950/60 border-red-800 text-red-200'
            }`}>
              <div className="mt-0.5 shrink-0">
                {isJpmsSealed ? (
                  <AlertTriangle className="w-5 h-5 text-purple-400" />
                ) : isAccessibleEnabled ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm">
                  {isJpmsSealed
                    ? '🚫 InaccessibleObjectException (JPMS Encapsulation Block)'
                    : isAccessibleEnabled
                    ? '🎉 Access Granted! Private Member Accessed Successfully'
                    : '❌ java.lang.IllegalAccessException (Access Control Block)'}
                </div>
                <div className="text-xs opacity-90">
                  {isJpmsSealed
                    ? 'java.lang.reflect.InaccessibleObjectException: module java.base does not "opens java.lang" to unnamed module'
                    : isAccessibleEnabled
                    ? targetMember === 'field'
                      ? 'Read value: "This is private" from Heap object'
                      : targetMember === 'method'
                      ? 'Executed private method: "Hello from private method!"'
                      : 'Instantiated new instance of class with private constructor'
                    : 'java.lang.IllegalAccessException: class MainApp cannot access a member of class with modifiers "private"'}
                </div>
              </div>
            </div>

            {/* Live Step Logs */}
            {simLog.length > 0 && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 space-y-1.5">
                <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Real-time JVM Event Trace</span>
                </div>
                {simLog.map((log, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: HIERARCHY & JPMS MATRIX */}
      {activeTab === 'matrix' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-8 shadow-xl animate-in fade-in duration-300">
          <div>
            <h3 className="text-lg font-bold text-white">AccessibleObject Class Hierarchy</h3>
            <p className="text-xs text-slate-300 mt-1">
              Field, Method, and Constructor all inherit the capability to suppress access checks from <code className="text-cyan-300">AccessibleObject</code>.
            </p>
          </div>

          {/* Tree Diagram */}
          <div className="p-6 rounded-3xl bg-[#060A14] border border-slate-800 space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-950/80 border border-indigo-500 text-center text-xs font-mono text-indigo-200 shadow-lg">
                <div className="font-bold text-white">java.lang.reflect.AccessibleObject</div>
                <div className="text-[10px] text-indigo-300 mt-0.5">+setAccessible(boolean), +trySetAccessible(), +canAccess(Object)</div>
              </div>
              <ArrowDown className="w-5 h-5 text-indigo-400 animate-bounce" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <div className="p-4 rounded-2xl bg-cyan-950/70 border border-cyan-600 text-center text-xs font-mono text-cyan-200 shadow-md">
                  <div className="font-bold text-white">Field</div>
                  <div className="text-[10px] text-cyan-300 mt-0.5">get(obj), set(obj, val)</div>
                </div>
                <div className="p-4 rounded-2xl bg-purple-950/70 border border-purple-600 text-center text-xs font-mono text-purple-200 shadow-md">
                  <div className="font-bold text-white">Executable (Abstract)</div>
                  <div className="text-[10px] text-purple-300 mt-0.5">Method.invoke() &amp; Constructor.newInstance()</div>
                </div>
              </div>
            </div>
          </div>

          {/* Method Comparison Matrix */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wide font-mono">
              Access Control Methods Comparison
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-slate-900 text-slate-200 border-b border-slate-800">
                    <th className="p-3.5">Method</th>
                    <th className="p-3.5">Added In</th>
                    <th className="p-3.5">Behavior on Restricted Module / Security Failure</th>
                    <th className="p-3.5">Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3.5 font-bold text-cyan-300">setAccessible(true)</td>
                    <td className="p-3.5">Java 1.2</td>
                    <td className="p-3.5 text-red-300">Throws InaccessibleObjectException or SecurityException</td>
                    <td className="p-3.5 text-slate-400">Classic Java reflection when permissions are guaranteed</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3.5 font-bold text-emerald-300">trySetAccessible()</td>
                    <td className="p-3.5">Java 9+</td>
                    <td className="p-3.5 text-emerald-300 font-bold">Returns false gracefully (No crash)</td>
                    <td className="p-3.5 text-slate-400">Modern frameworks safely testing if reflection is allowed</td>
                  </tr>
                  <tr className="hover:bg-slate-900/50">
                    <td className="p-3.5 font-bold text-purple-300">canAccess(Object obj)</td>
                    <td className="p-3.5">Java 9+</td>
                    <td className="p-3.5 text-purple-300">Returns boolean without changing internal state</td>
                    <td className="p-3.5 text-slate-400">Pre-checking access permissions before attempting get/set</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Real-World Framework Applications */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wide font-mono">
              Enterprise Framework Use-Cases
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: '🌱 Spring Framework', tag: 'Dependency Injection', desc: 'Injects private fields annotated with @Autowired and @Value without requiring public setters.' },
                { name: '🗄️ Hibernate / JPA', tag: 'Entity Hydration', desc: 'Populates private database entity fields directly from SQL ResultSet rows.' },
                { name: '📦 Jackson / Gson', tag: 'JSON Deserializer', desc: 'Instantiates private no-arg constructors and deserializes JSON properties into private variables.' },
                { name: '🧪 Mockito / JUnit', tag: 'Unit Testing & Mocks', desc: 'Injects mock dependencies into private service fields to isolate tests cleanly.' }
              ].map((fw, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="font-bold text-white text-xs">{fw.name}</div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                    {fw.tag}
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{fw.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTERACTIVE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-6 shadow-xl animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">Access Control Mastery Assessment</h3>
              <p className="text-xs text-slate-300 mt-0.5">Test your understanding of AccessibleObject, exceptions, and JPMS boundaries.</p>
            </div>
            {quizSubmitted && (
              <span className="px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-600 text-cyan-300 font-mono text-xs font-bold">
                Score: {calculateScore()} / {quizQuestions.length}
              </span>
            )}
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];
              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {idx + 1}. {q.q}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (selectedOpt === optIdx) {
                        btnStyle = 'bg-cyan-950/90 border-cyan-500 text-cyan-200 font-bold shadow-md';
                      }
                      if (quizSubmitted) {
                        if (optIdx === q.correct) {
                          btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                        } else if (selectedOpt === optIdx) {
                          btnStyle = 'bg-red-950 border-red-500 text-red-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizOption(q.id, optIdx)}
                          className={`text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && optIdx === q.correct && (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 rounded-xl bg-slate-950 text-slate-300 text-xs border border-slate-800/80 font-mono">
                      <span className="font-bold text-cyan-400">Explanation: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            {quizSubmitted ? (
              <button
                onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            ) : (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/25 transition disabled:opacity-50"
              >
                Submit Answers
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
