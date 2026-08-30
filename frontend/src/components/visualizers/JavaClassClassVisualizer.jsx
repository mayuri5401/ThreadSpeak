import React, { useState } from 'react';
import { 
  Sparkles, RotateCcw, Layers, Search, Code2, 
  Terminal, CheckCircle2, ArrowRight, HelpCircle,
  Database, ShieldCheck, Box, FileCode, Check
} from 'lucide-react';

/**
 * JavaClassClassVisualizer
 * Interactive Deep-Dive for java.lang.Class<T> in Java Reflection API:
 * 1. 3 Ways to Obtain Class Object (Class.forName, .getClass(), .class)
 * 2. Employee.class Runtime Metaspace X-Ray Inspector
 * 3. 13 Essential Methods Interactive Testbench
 * 4. Interactive Quiz
 */
export default function JavaClassClassVisualizer() {
  const [activeTab, setActiveTab] = useState('three-ways'); // 'three-ways' | 'inspector' | 'methods' | 'quiz'

  // TAB 1: THREE WAYS TO GET CLASS OBJECT STATE
  const [selectedWay, setSelectedWay] = useState('forname'); // 'forname' | 'getclass' | 'classliteral'
  const [isResolving, setIsResolving] = useState(false);
  const [resolvedToken, setResolvedToken] = useState(null);

  // TAB 2: EMPLOYEE INSPECTOR STATE
  const [selectedMemberType, setSelectedMemberType] = useState('all'); // 'all' | 'fields' | 'methods' | 'constructors'

  // TAB 3: 13 ESSENTIAL METHODS STATE
  const [selectedMethodIndex, setSelectedMethodIndex] = useState(0);

  // TAB 4: QUIZ STATE
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // 13 Methods Definition (Exact match to user table)
  const classMethodsList = [
    { name: 'getName()', returnType: 'String', desc: 'Returns the fully qualified name of the class (e.g. java.lang.String or com.app.Employee).', example: 'Employee.class.getName() -> "com.app.Employee"' },
    { name: 'getSimpleName()', returnType: 'String', desc: 'Returns the simple name of the class without the package prefix.', example: 'Employee.class.getSimpleName() -> "Employee"' },
    { name: 'getSuperclass()', returnType: 'Class<? super T>', desc: 'Returns the Class representing the direct superclass.', example: 'Employee.class.getSuperclass() -> class java.lang.Object' },
    { name: 'getInterfaces()', returnType: 'Class<?>[]', desc: 'Returns an array of all direct interfaces implemented by the class.', example: 'ArrayList.class.getInterfaces() -> [List, RandomAccess, Cloneable, Serializable]' },
    { name: 'getDeclaredFields()', returnType: 'Field[]', desc: 'Returns all fields (public, protected, default, and private) declared directly in the class.', example: 'Employee.class.getDeclaredFields() -> [name, salary]' },
    { name: 'getDeclaredMethods()', returnType: 'Method[]', desc: 'Returns all methods (including private) declared directly in the class.', example: 'Employee.class.getDeclaredMethods() -> [work, secret]' },
    { name: 'getDeclaredConstructors()', returnType: 'Constructor<?>[]', desc: 'Returns all constructors (including private) declared in the class.', example: 'Employee.class.getDeclaredConstructors() -> [Employee(), Employee(String, int)]' },
    { name: 'getModifiers()', returnType: 'int', desc: 'Returns the Java language modifiers (public, abstract, final) encoded as an integer bitmask.', example: 'Modifier.toString(Employee.class.getModifiers()) -> "public"' },
    { name: 'isInterface()', returnType: 'boolean', desc: 'Checks if this Class object represents an interface type.', example: 'Runnable.class.isInterface() -> true' },
    { name: 'isArray()', returnType: 'boolean', desc: 'Checks if this Class object represents an array type.', example: 'int[].class.isArray() -> true' },
    { name: 'newInstance()', returnType: 'T (Deprecated Java 9+)', desc: 'Creates a new instance using the default no-arg constructor (use getDeclaredConstructor().newInstance() instead).', example: 'Employee.class.getDeclaredConstructor().newInstance()' },
    { name: 'getPackage()', returnType: 'Package', desc: 'Returns the package of this class or interface.', example: 'String.class.getPackage().getName() -> "java.lang"' },
    { name: 'getDeclaredAnnotations()', returnType: 'Annotation[]', desc: 'Returns all annotations directly present on this class.', example: 'Entity.class.getDeclaredAnnotations() -> [@Table, @Entity]' },
  ];

  const quizQuestions = [
    {
      id: 1,
      q: 'Which of the following is true regarding java.lang.Class objects in Java?',
      options: [
        'A new Class object is instantiated every time you do new MyClass()',
        'There is only ONE singleton Class object per loaded class in the ClassLoader (in Metaspace)',
        'Class objects are stored in the CPU registers',
        'You can manually construct a Class object using new Class()'
      ],
      correct: 1,
      explanation: 'The JVM automatically creates a singleton java.lang.Class<T> object in Metaspace when loading the class bytecode. You cannot call new Class() directly.'
    },
    {
      id: 2,
      q: 'Which approach to get a Class<?> object works for primitive types like int and void?',
      options: [
        'int.getClass()',
        'Class.forName("int")',
        'int.class',
        'None of the above'
      ],
      correct: 2,
      explanation: 'Primitive types do not have object instances to call .getClass() on, but int.class and void.class are valid class literals representing primitive type tokens.'
    },
    {
      id: 3,
      q: 'What is the key difference between getFields() and getDeclaredFields()?',
      options: [
        'getFields() returns only public fields (including inherited), while getDeclaredFields() returns all fields (including private) of only this class',
        'getFields() returns private fields only',
        'getDeclaredFields() includes all inherited superclass fields',
        'There is no difference between them'
      ],
      correct: 0,
      explanation: 'getFields() retrieves only public fields including those inherited from superclasses. getDeclaredFields() retrieves all fields of any visibility declared directly in that class.'
    }
  ];

  // RESET HANDLERS
  const handleResetAll = () => {
    setSelectedWay('forname');
    setIsResolving(false);
    setResolvedToken(null);
    setSelectedMemberType('all');
    setSelectedMethodIndex(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleResolveWay = (way) => {
    setSelectedWay(way);
    setIsResolving(true);
    setResolvedToken(null);
    setTimeout(() => {
      setIsResolving(false);
      setResolvedToken({
        name: 'com.app.Employee',
        simpleName: 'Employee',
        metaspaceAddress: '0x7F4A8801C200',
        singletonVerified: true
      });
    }, 600);
  };

  const handleSelectQuizOption = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  return (
    <div className="w-full rounded-2xl bg-[#080D1A] border border-cyan-500/30 p-4 sm:p-6 text-white shadow-2xl shadow-cyan-950/20 font-sans">
      {/* HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10">
            <Layers className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>The <code className="text-cyan-300 font-mono">java.lang.Class</code> Interactive Visualizer</span>
              </h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
                Reflection API
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore the 3 ways to acquire Class tokens, inspect Metaspace metadata, and audit fields & methods dynamically
            </p>
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

      {/* TABS NAVIGATION */}
      <div className="flex flex-wrap gap-2 mt-5 p-1 bg-slate-950/70 rounded-xl border border-slate-800/80">
        <button
          type="button"
          onClick={() => setActiveTab('three-ways')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'three-ways'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>1. 3 Ways to Obtain Class</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('inspector')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'inspector'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>2. Employee.class X-Ray</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('methods')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'methods'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>3. 13 Essential Methods</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>4. Interactive Quiz</span>
        </button>
      </div>

      {/* TAB 1: 3 WAYS TO OBTAIN CLASS OBJECT */}
      {activeTab === 'three-ways' && (
        <div className="mt-5 space-y-5 animate-in fade-in duration-300">
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Metaspace Singleton Rule:</span> Regardless of whether you use <code className="text-cyan-300">Class.forName()</code>, <code className="text-cyan-300">object.getClass()</code>, or <code className="text-cyan-300">ClassName.class</code>, all 3 ways point to the <b>exact same singleton instance</b> in JVM Metaspace (<code className="text-emerald-400">c1 == c2 == c3 is true</code>).
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* WAY 1: Class.forName() */}
            <button
              type="button"
              onClick={() => handleResolveWay('forname')}
              className={`p-4 rounded-xl text-left border transition cursor-pointer ${
                selectedWay === 'forname'
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Approach 1</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">Dynamic String</span>
              </div>
              <div className="font-mono text-xs text-white font-bold mb-1.5">Class.forName(...)</div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Loads and resolves the class dynamically at runtime using its fully qualified name string.
              </div>
            </button>

            {/* WAY 2: object.getClass() */}
            <button
              type="button"
              onClick={() => handleResolveWay('getclass')}
              className={`p-4 rounded-xl text-left border transition cursor-pointer ${
                selectedWay === 'getclass'
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Approach 2</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">Live Instance</span>
              </div>
              <div className="font-mono text-xs text-white font-bold mb-1.5">obj.getClass()</div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Inherited from <code className="text-cyan-300">java.lang.Object</code>. Inspects the actual runtime type of an active object.
              </div>
            </button>

            {/* WAY 3: ClassName.class */}
            <button
              type="button"
              onClick={() => handleResolveWay('classliteral')}
              className={`p-4 rounded-xl text-left border transition cursor-pointer ${
                selectedWay === 'classliteral'
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Approach 3</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Compile-Time</span>
              </div>
              <div className="font-mono text-xs text-white font-bold mb-1.5">ClassName.class</div>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                Direct class literal syntax. Fastest and safest. Also works for primitives (<code className="text-amber-300">int.class</code>).
              </div>
            </button>
          </div>

          {/* CODE SIMULATION PANEL */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Terminal className="w-3.5 h-3.5" />
                <span>Interactive Execution Simulation</span>
              </span>
              <button
                type="button"
                onClick={() => handleResolveWay(selectedWay)}
                disabled={isResolving}
                className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-sans text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
              >
                {isResolving ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Resolving in Metaspace...</span>
                  </>
                ) : (
                  <>
                    <span>Execute Code</span>
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>

            <div className="font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 bg-slate-900/80 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {selectedWay === 'forname' && (
                <>
                  <span className="text-slate-500">// 1. Dynamic lookup by fully qualified string name</span>
                  <br />
                  <span className="text-purple-400">Class</span>&lt;?&gt; c1 = <span className="text-purple-400">Class</span>.<span className="text-cyan-300">forName</span>(<span className="text-amber-300">"com.app.Employee"</span>);
                  <br />
                  <span className="text-slate-400">System.out.println(</span><span className="text-amber-300">"Class Name : "</span> + c1.<span className="text-cyan-300">getName()</span><span className="text-slate-400">);</span>
                  <br />
                  <span className="text-slate-400">System.out.println(</span><span className="text-amber-300">"Superclass : "</span> + c1.<span className="text-cyan-300">getSuperclass()</span><span className="text-slate-400">);</span>
                </>
              )}

              {selectedWay === 'getclass' && (
                <>
                  <span className="text-slate-500">// 2. Querying runtime instance reference</span>
                  <br />
                  <span className="text-purple-400">Employee</span> emp = <span className="text-blue-400">new</span> <span className="text-purple-400">Employee</span>(<span className="text-amber-300">"Alice"</span>, <span className="text-amber-300">95000</span>);
                  <br />
                  <span className="text-purple-400">Class</span>&lt;?&gt; c2 = emp.<span className="text-cyan-300">getClass()</span>;
                  <br />
                  <span className="text-slate-400">System.out.println(</span><span className="text-amber-300">"Class from getClass(): "</span> + c2.<span className="text-cyan-300">getName()</span><span className="text-slate-400">);</span>
                </>
              )}

              {selectedWay === 'classliteral' && (
                <>
                  <span className="text-slate-500">// 3. Direct compile-time class literal</span>
                  <br />
                  <span className="text-purple-400">Class</span>&lt;<span className="text-purple-400">Employee</span>&gt; c3 = <span className="text-purple-400">Employee</span>.<span className="text-cyan-300">class</span>;
                  <br />
                  <span className="text-slate-400">System.out.println(</span><span className="text-amber-300">"Class from .class: "</span> + c3.<span className="text-cyan-300">getName()</span><span className="text-slate-400">);</span>
                </>
              )}
            </div>

            {/* LIVE METASPACE RESOLUTION CARD */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#0C152B] via-slate-900 to-[#0C152B] border border-cyan-500/40">
              <div className="flex items-center justify-between text-xs font-bold text-cyan-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>JVM Metaspace Memory Token</span>
                </span>
                <span className="font-mono text-[11px] text-slate-400">Address: 0x7F4A8801C200</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono mt-2">
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Type Name</div>
                  <div className="text-white font-bold">com.app.Employee</div>
                </div>
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Superclass</div>
                  <div className="text-amber-300">java.lang.Object</div>
                </div>
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Is Interface?</div>
                  <div className="text-red-400 font-bold">false</div>
                </div>
                <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Singleton Token?</div>
                  <div className="text-emerald-400 font-bold">✅ Yes (c1==c2==c3)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EMPLOYEE.CLASS X-RAY INSPECTOR */}
      {activeTab === 'inspector' && (
        <div className="mt-5 space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-xs text-slate-300 font-medium">
              Filter reflected members of <code className="text-cyan-300 font-mono">Employee.class</code>:
            </div>
            <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setSelectedMemberType('all')}
                className={`px-2.5 py-1 rounded transition cursor-pointer ${
                  selectedMemberType === 'all' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Members
              </button>
              <button
                type="button"
                onClick={() => setSelectedMemberType('fields')}
                className={`px-2.5 py-1 rounded transition cursor-pointer ${
                  selectedMemberType === 'fields' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Declared Fields (2)
              </button>
              <button
                type="button"
                onClick={() => setSelectedMemberType('methods')}
                className={`px-2.5 py-1 rounded transition cursor-pointer ${
                  selectedMemberType === 'methods' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Declared Methods (2)
              </button>
              <button
                type="button"
                onClick={() => setSelectedMemberType('constructors')}
                className={`px-2.5 py-1 rounded transition cursor-pointer ${
                  selectedMemberType === 'constructors' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Constructors (2)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* DECLARED FIELDS */}
            {(selectedMemberType === 'all' || selectedMemberType === 'fields') && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-cyan-300 pb-2 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5 text-cyan-400" />
                    <span>getDeclaredFields()</span>
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300">2 Fields</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-white">public String name</div>
                      <div className="text-[10px] text-slate-400">Type: String | Access: public</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Public</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-white">private int salary</div>
                      <div className="text-[10px] text-slate-400">Type: int | Access: private</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">Private</span>
                  </div>
                </div>
              </div>
            )}

            {/* DECLARED METHODS */}
            {(selectedMemberType === 'all' || selectedMemberType === 'methods') && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-cyan-300 pb-2 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>getDeclaredMethods()</span>
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300">2 Methods</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-white">public void work()</div>
                      <div className="text-[10px] text-slate-400">Returns: void | Params: none</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Public</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-white">private void secret()</div>
                      <div className="text-[10px] text-slate-400">Returns: void | Params: none</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">Private</span>
                  </div>
                </div>
              </div>
            )}

            {/* DECLARED CONSTRUCTORS */}
            {(selectedMemberType === 'all' || selectedMemberType === 'constructors') && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-cyan-300 pb-2 border-b border-slate-800">
                  <span className="flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                    <span>getDeclaredConstructors()</span>
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300">2 Ctors</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="text-xs font-mono font-bold text-white">public Employee()</div>
                    <div className="text-[10px] text-slate-400">No-arg default constructor</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="text-xs font-mono font-bold text-white">public Employee(String, int)</div>
                    <div className="text-[10px] text-slate-400">Parameterized constructor (name, salary)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: 13 ESSENTIAL METHODS */}
      {activeTab === 'methods' && (
        <div className="mt-5 space-y-5 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* METHOD LIST SELECTION */}
            <div className="lg:col-span-1 p-3 rounded-xl bg-slate-950 border border-slate-800 max-h-[380px] overflow-y-auto space-y-1.5">
              <div className="text-xs font-bold text-cyan-300 px-2 py-1 mb-1 border-b border-slate-800">
                13 Essential Class Methods:
              </div>
              {classMethodsList.map((m, idx) => (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => setSelectedMethodIndex(idx)}
                  className={`w-full p-2 rounded-lg text-left text-xs font-mono transition cursor-pointer flex items-center justify-between ${
                    selectedMethodIndex === idx
                      ? 'bg-cyan-950 border border-cyan-400 text-cyan-200 font-bold'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <span>{idx + 1}. {m.name}</span>
                  <span className="text-[10px] text-slate-500">{m.returnType.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* METHOD DETAILS & CODE SNIPPET */}
            <div className="lg:col-span-2 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold font-mono text-cyan-300">
                    {classMethodsList[selectedMethodIndex].name}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Return Type: <span className="text-purple-300 font-bold">{classMethodsList[selectedMethodIndex].returnType}</span>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                  Method #{selectedMethodIndex + 1}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Description:</h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {classMethodsList[selectedMethodIndex].desc}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-[11px] font-bold text-cyan-300 mb-1 font-mono">Usage Example & Output:</div>
                <div className="font-mono text-xs text-amber-300 bg-slate-950 p-2.5 rounded border border-slate-800">
                  {classMethodsList[selectedMethodIndex].example}
                </div>
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
              <span>Test Your java.lang.Class Knowledge</span>
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
