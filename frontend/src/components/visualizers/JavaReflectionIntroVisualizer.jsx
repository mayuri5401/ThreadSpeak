import React, { useState } from 'react';
import { 
  Search, ShieldAlert, Sparkles, Play, RotateCcw, 
  Layers, Lock, Unlock, Eye, Cpu, Database, 
  Terminal, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, HelpCircle
} from 'lucide-react';

/**
 * JavaReflectionIntroVisualizer
 * Interactive X-Ray & Dynamic Runtime Inspector for Java Reflection API:
 * 1. Live Runtime X-Ray Inspector (Inspect Class, Fields, Methods, Constructors)
 * 2. Private Field Bypass Lab (setAccessible(true) in action)
 * 3. Spring Boot @Autowired Dependency Injection Simulation
 * 4. Performance Arena (Direct Invocation vs Method.invoke vs MethodHandle)
 * 5. Interactive Interview Quiz
 */
export default function JavaReflectionIntroVisualizer() {
  const [activeTab, setActiveTab] = useState('xray'); // 'xray' | 'private' | 'spring' | 'perf' | 'quiz'

  // TAB 1: X-RAY SCANNER STATE
  const [selectedClass, setSelectedClass] = useState('ArrayList');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const sampleClasses = {
    ArrayList: {
      name: 'java.util.ArrayList<E>',
      package: 'java.util',
      superclass: 'java.util.AbstractList<E>',
      interfaces: ['List', 'RandomAccess', 'Cloneable', 'Serializable'],
      modifiers: 'public',
      fields: [
        { name: 'elementData', type: 'Object[]', access: 'transient Object[]', isPrivate: true },
        { name: 'size', type: 'int', access: 'private int', isPrivate: true },
        { name: 'DEFAULT_CAPACITY', type: 'int', access: 'private static final int (10)', isPrivate: true }
      ],
      methods: [
        { name: 'add(E e)', returnType: 'boolean', access: 'public' },
        { name: 'get(int index)', returnType: 'E', access: 'public' },
        { name: 'grow(int minCapacity)', returnType: 'Object[]', access: 'private' },
        { name: 'size()', returnType: 'int', access: 'public' }
      ],
      constructors: [
        { sig: 'ArrayList()', access: 'public' },
        { sig: 'ArrayList(int initialCapacity)', access: 'public' }
      ]
    },
    UserAccount: {
      name: 'com.myapp.model.UserAccount',
      package: 'com.myapp.model',
      superclass: 'java.lang.Object',
      interfaces: ['Serializable'],
      modifiers: 'public',
      fields: [
        { name: 'accountNumber', type: 'String', access: 'private String ("ACC-9812")', isPrivate: true },
        { name: 'balance', type: 'double', access: 'private double ($4500.0)', isPrivate: true },
        { name: 'userSecretKey', type: 'String', access: 'private transient String ("TOP_SECRET")', isPrivate: true }
      ],
      methods: [
        { name: 'deposit(double amt)', returnType: 'void', access: 'public' },
        { name: 'withdraw(double amt)', returnType: 'boolean', access: 'public' },
        { name: 'calculateInternalScore()', returnType: 'int', access: 'private' }
      ],
      constructors: [
        { sig: 'UserAccount()', access: 'public' },
        { sig: 'UserAccount(String accNo, double bal)', access: 'public' }
      ]
    }
  };

  const handleRunScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  // TAB 2: PRIVATE BYPASS LAB STATE
  const [accountBalance, setAccountBalance] = useState(5000);
  const [accessOverridden, setAccessOverridden] = useState(false);
  const [mutationLog, setMutationLog] = useState([]);
  const [newBalanceInput, setNewBalanceInput] = useState('12500');

  const handleBypassAccess = () => {
    setAccessOverridden(true);
    setMutationLog(prev => [
      ...prev,
      `[JVM Check]: Field "balance" requested -> Found private double balance = $${accountBalance}`,
      `[Reflection]: field.setAccessible(true) executed -> Suppressed access check!`,
    ]);
  };

  const handleMutateValue = () => {
    const val = parseFloat(newBalanceInput);
    if (!isNaN(val)) {
      setAccountBalance(val);
      setMutationLog(prev => [
        ...prev,
        `[Mutation]: field.set(account, ${val}) -> Heap Memory directly modified to $${val}!`
      ]);
    }
  };

  const handleResetBypass = () => {
    setAccountBalance(5000);
    setAccessOverridden(false);
    setMutationLog([]);
  };

  // TAB 3: SPRING BOOT DI SIMULATION
  const [springStep, setSpringStep] = useState(0);
  const springSteps = [
    {
      title: "1. Component Scanning",
      desc: "Spring scans packages for classes marked with @Component or @Service using Class.forName().",
      code: `Class<?> serviceClass = Class.forName("com.app.OrderService");\nboolean isComponent = serviceClass.isAnnotationPresent(Component.class); // true`
    },
    {
      title: "2. Dynamic Instantiation via Constructor",
      desc: "Spring calls Constructor.newInstance() on OrderService's default constructor.",
      code: `Constructor<?> ctor = serviceClass.getDeclaredConstructor();\nctor.setAccessible(true);\nObject orderService = ctor.newInstance();`
    },
    {
      title: "3. Inspecting Private @Autowired Fields",
      desc: "Spring iterates over getDeclaredFields() looking for @Autowired annotations on private fields.",
      code: `for (Field field : serviceClass.getDeclaredFields()) {\n    if (field.isAnnotationPresent(Autowired.class)) {\n        field.setAccessible(true);\n        field.set(orderService, paymentRepositoryBean); // Injected!\n    }\n}`
    },
    {
      title: "4. Bean Ready in ApplicationContext",
      desc: "OrderService is fully wired and cached in Spring's Singleton Bean Registry without writing explicit constructor boilerplate!",
      code: `OrderService bean = (OrderService) applicationContext.getBean("orderService");\nbean.processOrder(99); // Executes successfully with injected repository!`
    }
  ];

  // TAB 4: PERFORMANCE BENCHMARK
  const [benchmarkRunning, setBenchmarkRunning] = useState(false);
  const [benchmarkResults, setBenchmarkResults] = useState(null);

  const runBenchmark = () => {
    setBenchmarkRunning(true);
    setTimeout(() => {
      setBenchmarkResults({
        direct: { time: "2.1 ms", ops: "10,000,000 calls", desc: "JIT inlines direct calls to native CPU registers (Zero overhead)." },
        reflection: { time: "84.6 ms", ops: "10,000,000 calls", desc: "~40x slower due to boxing, array allocations, and dynamic security checks." },
        methodHandle: { time: "3.8 ms", ops: "10,000,000 calls", desc: "Java 7+ MethodHandle optimizes with JIT invokeDynamic bytecode." }
      });
      setBenchmarkRunning(false);
    }, 600);
  };

  // TAB 5: QUIZ STATE
  const quizQuestions = [
    {
      q: "Which package contains the core Java Reflection API classes (Field, Method, Constructor)?",
      options: ["java.lang.reflect", "java.util.reflect", "java.lang.annotation", "java.io.reflect"],
      correct: 0,
      expl: "java.lang.reflect contains Field, Method, Constructor, Modifier, and Array classes."
    },
    {
      q: "What is the difference between getFields() and getDeclaredFields()?",
      options: [
        "getFields() returns public fields only (including inherited); getDeclaredFields() returns all declared fields in the class (including private).",
        "getFields() returns private fields; getDeclaredFields() returns public fields.",
        "They are exact synonyms.",
        "getDeclaredFields() only works on interfaces."
      ],
      correct: 0,
      expl: "getFields() returns all public fields (inherited included). getDeclaredFields() returns all fields declared in that exact class, including private and protected."
    },
    {
      q: "Which method is used on Field or Method to bypass Java's private access modifier checks?",
      options: ["setAccessible(true)", "unlockAccess()", "bypassSecurity()", "makePublic()"],
      correct: 0,
      expl: "setAccessible(true) (from AccessibleObject) suppresses Java language access control checks."
    },
    {
      q: "Why is Reflection generally slower than direct Java code execution?",
      options: [
        "Because the JVM cannot easily inline reflective calls and must perform dynamic type resolution & security checks on every call.",
        "Because Reflection always writes to disk.",
        "Because Reflection requires multi-threading.",
        "Because Reflection only runs in interpreter mode without memory."
      ],
      correct: 0,
      expl: "Reflection requires dynamic method lookup, argument boxing, parameter array allocations, and prevents JIT from inlining."
    }
  ];

  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizScore, setShowQuizScore] = useState(false);

  const handleSelectAnswer = (qIndex, oIndex) => {
    setQuizAnswers(prev => ({ ...prev, [qIndex]: oIndex }));
  };

  const calculatedScore = Object.keys(quizAnswers).reduce((acc, qIdx) => {
    return acc + (quizAnswers[qIdx] === quizQuestions[qIdx].correct ? 1 : 0);
  }, 0);

  const currentClassData = sampleClasses[selectedClass];

  const handleResetScan = () => {
    setIsScanning(false);
    setScanProgress(0);
    setSelectedClass('ArrayList');
  };

  const handleResetSpring = () => {
    setSpringStep(0);
  };

  const handleResetBenchmark = () => {
    setBenchmarkRunning(false);
    setBenchmarkResults(null);
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setShowQuizScore(false);
  };

  const handleResetAll = () => {
    handleResetScan();
    handleResetBypass();
    handleResetSpring();
    handleResetBenchmark();
    handleResetQuiz();
  };

  return (
    <div className="w-full bg-[#0B0F1A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl text-slate-200 font-sans">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-purple-950/80 p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-400 shadow-lg shadow-blue-500/10">
            <Eye className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              Java Reflection API
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/80">
                java.lang.reflect
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Interactive Runtime X-Ray, Dynamic Member Inspection, Encapsulation Bypass & Spring DI
            </p>
          </div>
        </div>

        {/* TABS & GLOBAL RESET */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 text-xs">
            {[
              { id: 'xray', label: '🔍 X-Ray Scanner', icon: Eye },
              { id: 'private', label: '🕵️ Private Bypass', icon: Lock },
              { id: 'spring', label: '🌱 Spring Boot DI', icon: Sparkles },
              { id: 'perf', label: '⚡ Performance', icon: Cpu },
              { id: 'quiz', label: '❓ Quiz', icon: HelpCircle }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleResetAll}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
            title="Reset All Tabs & Simulations"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Reset All</span>
          </button>
        </div>
      </div>

      {/* CONTENT BODY */}
      <div className="p-6 space-y-6">

        {/* TAB 1: X-RAY SCANNER */}
        {activeTab === 'xray' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">Target Class Token:</span>
                <div className="flex gap-2">
                  {Object.keys(sampleClasses).map(cName => (
                    <button
                      key={cName}
                      onClick={() => { setSelectedClass(cName); setScanProgress(0); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition border ${
                        selectedClass === cName 
                          ? 'bg-blue-950 text-blue-300 border-blue-500 shadow-md' 
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {cName}.class
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {scanProgress > 0 && (
                  <button
                    onClick={handleResetScan}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Scan
                  </button>
                )}
                <button
                  onClick={handleRunScan}
                  disabled={isScanning}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 transition"
                >
                  <Play className="w-4 h-4" />
                  {isScanning ? `Inspecting Metaspace (${scanProgress}%)...` : 'Run Dynamic Reflection Scan'}
                </button>
              </div>
            </div>

            {/* CLASS BLUEPRINT INSPECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* METADATA SUMMARY */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-4 h-4" /> java.lang.Class&lt;T&gt; Metadata
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px]">Canonical Name:</span>
                    <span className="text-white font-bold">{currentClassData.name}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px]">Superclass:</span>
                    <span className="text-purple-300">{currentClassData.superclass}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80">
                    <span className="text-slate-500 block text-[10px]">Implemented Interfaces:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {currentClassData.interfaces.map(i => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/60 text-[10px]">
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* FIELDS & CONSTRUCTORS */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Declared Fields ({currentClassData.fields.length})
                </h3>
                <div className="space-y-1.5 text-xs font-mono max-h-48 overflow-y-auto">
                  {currentClassData.fields.map(f => (
                    <div key={f.name} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-amber-300 font-bold">{f.name}</span>
                        <span className="text-slate-500 text-[10px] block">{f.access}</span>
                      </div>
                      {f.isPrivate && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60">
                          private
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider pt-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Constructors ({currentClassData.constructors.length})
                </h3>
                <div className="space-y-1.5 text-xs font-mono">
                  {currentClassData.constructors.map((c, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-emerald-300">
                      {c.access} {c.sig}
                    </div>
                  ))}
                </div>
              </div>

              {/* METHODS */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Declared Methods ({currentClassData.methods.length})
                </h3>
                <div className="space-y-1.5 text-xs font-mono max-h-64 overflow-y-auto">
                  {currentClassData.methods.map(m => (
                    <div key={m.name} className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-blue-300 font-bold">{m.name}</span>
                        <span className="text-slate-500 text-[10px] block">returns {m.returnType}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        m.access === 'public' 
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                          : 'bg-red-950 text-red-300 border-red-800'
                      }`}>
                        {m.access}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PRIVATE ENCAPSULATION BYPASS LAB */}
        {activeTab === 'private' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Private Encapsulation Bypass with setAccessible(true)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Java normally forbids direct access to <code>private double balance</code>. Reflection lets you inspect and modify it in Heap memory.
                  </p>
                </div>
                <button
                  onClick={handleResetBypass}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Object
                </button>
              </div>

              {/* INTERACTIVE CONTROLS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                
                {/* STATE BOX */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Target Object in Heap:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold font-mono border ${
                      accessOverridden ? 'bg-red-950 text-red-300 border-red-800' : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    }`}>
                      {accessOverridden ? '🔓 Access Suppressed (Vulnerable)' : '🔒 Private Encapsulation Active'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                    <span className="text-xs text-slate-400 font-mono">private double balance</span>
                    <div className="text-3xl font-extrabold text-amber-400 font-mono">
                      ${accountBalance.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!accessOverridden ? (
                      <button
                        onClick={handleBypassAccess}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
                      >
                        <Unlock className="w-4 h-4" /> Run field.setAccessible(true)
                      </button>
                    ) : (
                      <div className="flex gap-2 w-full">
                        <input
                          type="number"
                          value={newBalanceInput}
                          onChange={(e) => setNewBalanceInput(e.target.value)}
                          className="w-1/2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                          placeholder="New Balance"
                        />
                        <button
                          onClick={handleMutateValue}
                          className="w-1/2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
                        >
                          field.set(account, val)
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* CONSOLE OUTPUT LOG */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col">
                  <span className="text-xs font-mono text-cyan-400 font-bold mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" /> JVM Reflection Execution Trace
                  </span>
                  <div className="flex-1 bg-black/60 p-3 rounded-lg border border-slate-800/80 font-mono text-[11px] space-y-1.5 text-slate-300 overflow-y-auto max-h-44">
                    {mutationLog.length === 0 ? (
                      <span className="text-slate-600 italic">// Click 'Run field.setAccessible(true)' to trigger execution...</span>
                    ) : (
                      mutationLog.map((log, idx) => (
                        <div key={idx} className={log.includes('directly modified') ? 'text-emerald-400 font-bold' : log.includes('Suppressed') ? 'text-amber-300' : 'text-slate-300'}>
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SPRING BOOT DI SIMULATION */}
        {activeTab === 'spring' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    How Spring Boot uses Reflection for Dependency Injection (@Autowired)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Step through the 4 phases of how Spring container discovers, instantiates, and wires beans at startup.
                  </p>
                </div>
                <div className="flex gap-2">
                  {springStep > 0 && (
                    <button
                      onClick={handleResetSpring}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset Flow
                    </button>
                  )}
                  <button
                    onClick={() => setSpringStep(prev => Math.max(0, prev - 1))}
                    disabled={springStep === 0}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold disabled:opacity-30"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setSpringStep(prev => Math.min(springSteps.length - 1, prev + 1))}
                    disabled={springStep === springSteps.length - 1}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-600/20 disabled:opacity-30"
                  >
                    Next Step ({springStep + 1}/4)
                  </button>
                </div>
              </div>

              {/* STEP PROGRESS BAR */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                {springSteps.map((s, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSpringStep(idx)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                      springStep === idx 
                        ? 'bg-emerald-950/80 border-emerald-500 text-white' 
                        : springStep > idx 
                          ? 'bg-slate-950 border-emerald-800/60 text-slate-300' 
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <span className="font-bold block truncate">{s.title}</span>
                  </div>
                ))}
              </div>

              {/* CURRENT STEP CARD */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" /> {springSteps[springStep].title}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {springSteps[springStep].desc}
                </p>
                <div className="p-3 bg-black/60 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 whitespace-pre-wrap">
                  {springSteps[springStep].code}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PERFORMANCE BENCHMARK */}
        {activeTab === 'perf' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    Invocation Performance Arena (10,000,000 Invocations)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Compare execution latency between Direct Method Calls, <code>Method.invoke()</code>, and Java 7+ <code>MethodHandle</code>.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {benchmarkResults && (
                    <button
                      onClick={handleResetBenchmark}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset Benchmark
                    </button>
                  )}
                  <button
                    onClick={runBenchmark}
                    disabled={benchmarkRunning}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" /> {benchmarkRunning ? 'Benchmarking CPU Registers...' : 'Run 10M Invocations Test'}
                  </button>
                </div>
              </div>

              {benchmarkResults && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 animate-in fade-in">
                  
                  {/* DIRECT CALL */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/40 space-y-2">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase">1. Direct Java Call</span>
                    <div className="text-2xl font-black text-emerald-300 font-mono">{benchmarkResults.direct.time}</div>
                    <p className="text-[11.5px] text-slate-400 leading-relaxed">{benchmarkResults.direct.desc}</p>
                  </div>

                  {/* METHOD HANDLE */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/40 space-y-2">
                    <span className="text-[11px] font-mono text-blue-400 font-bold uppercase">2. Java 7 MethodHandle</span>
                    <div className="text-2xl font-black text-blue-300 font-mono">{benchmarkResults.methodHandle.time}</div>
                    <p className="text-[11.5px] text-slate-400 leading-relaxed">{benchmarkResults.methodHandle.desc}</p>
                  </div>

                  {/* REFLECTION INVOKE */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-red-500/40 space-y-2">
                    <span className="text-[11px] font-mono text-red-400 font-bold uppercase">3. Method.invoke()</span>
                    <div className="text-2xl font-black text-red-400 font-mono">{benchmarkResults.reflection.time}</div>
                    <p className="text-[11.5px] text-slate-400 leading-relaxed">{benchmarkResults.reflection.desc}</p>
                  </div>

                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    Reflection API Knowledge Check
                  </h3>
                  <p className="text-xs text-slate-400">
                    Test your understanding of runtime class inspection, member interfaces, and performance implications.
                  </p>
                </div>
                {showQuizScore && (
                  <span className="px-3 py-1 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 text-xs font-mono font-bold">
                    Score: {calculatedScore} / {quizQuestions.length}
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {quizQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
                    <p className="text-xs font-bold text-white flex items-start gap-2">
                      <span className="text-cyan-400">Q{qIdx + 1}:</span> {q.q}
                    </p>
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = quizAnswers[qIdx] === oIdx;
                        const isCorrect = q.correct === oIdx;
                        let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700";
                        if (showQuizScore) {
                          if (isCorrect) btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                          else if (isSelected) btnStyle = "bg-red-950/80 border-red-500 text-red-200";
                        } else if (isSelected) {
                          btnStyle = "bg-blue-950 border-blue-500 text-blue-200 font-bold";
                        }
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectAnswer(qIdx, oIdx)}
                            className={`p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {showQuizScore && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                    {showQuizScore && (
                      <p className="text-[11px] text-cyan-300/90 italic pt-1">
                        💡 {q.expl}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Quiz
                </button>
                <button
                  onClick={() => setShowQuizScore(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20"
                >
                  Grade My Quiz
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
