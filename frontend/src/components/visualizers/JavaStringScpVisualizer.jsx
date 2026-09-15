import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, Play, CheckCircle2, Copy, Check, ArrowRight, ArrowLeft, 
  Sparkles, Terminal, BookOpen, Layers, 
  ChevronRight, ChevronLeft, Zap, RotateCcw, Cpu,
  HelpCircle, Lightbulb, CheckSquare, ListOrdered, FileCode, CheckCircle,
  Pause, Sliders, ShieldCheck, Box, RefreshCw, Trash2, Database
} from 'lucide-react';
import UniversalCodePlayground from '../playground/UniversalCodePlayground';

/**
 * JavaStringScpVisualizer
 * High-End Interactive Architecture Simulation & Animation Theater for:
 * 1. String Constant Pool (SCP) in JVM Heap
 * 2. String Literals vs 'new' Keyword allocation (Deepak / Amit scenario)
 * 3. Dynamic pointer redirection and intern() method mechanics
 * 4. Garbage Collection behavior differences between Heap and SCP
 * 5. Interactive String Sandbox & Quiz
 */
export default function JavaStringScpVisualizer({ onOpenPlayground, activeTab = 'notes' }) {
  const [activeSectionTab, setActiveSectionTab] = useState('animation'); // 'animation' | 'sandbox' | 'intern' | 'gc' | 'code' | 'quiz'

  // =========================================================================
  // 1. STEP-BY-STEP SIMULATION STATE
  // =========================================================================
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(2500); // ms per step

  const simulationSteps = [
    {
      step: 0,
      title: "Initial State (Empty Stack & Heap)",
      codeLine: "// Ready to execute String declarations",
      codeSnippet: `String name1 = "Deepak";\nString name2 = "Deepak";\nString name3 = new String("Amit");\nString name4 = new String("Amit");\nString name5 = name3.intern();`,
      activeLineIndex: -1,
      explanation: "JVM starts execution of the main() method. Stack frame is initialized. Heap and String Constant Pool (SCP) are ready for allocations.",
      stackVars: [],
      heapObjects: [],
      scpObjects: [],
      pointers: [],
      comparisons: [],
      stats: { heapCount: 0, scpCount: 0, memorySaved: "0%" }
    },
    {
      step: 1,
      title: "Step 1: String name1 = \"Deepak\";",
      codeLine: 'String name1 = "Deepak";',
      codeSnippet: `String name1 = "Deepak"; // -> Stored in SCP\nString name2 = "Deepak";\nString name3 = new String("Amit");\nString name4 = new String("Amit");\nString name5 = name3.intern();`,
      activeLineIndex: 0,
      explanation: "1. JVM checks the SCP for \"Deepak\".\n2. Since \"Deepak\" does not exist, a new String object \"Deepak\" (0xSCP_101) is created in the SCP.\n3. Variable name1 in the Stack points directly to 0xSCP_101 in SCP.",
      stackVars: [
        { name: "name1", ref: "0xSCP_101", target: "scp-deepak", targetType: "scp", label: "0xSCP_101" }
      ],
      heapObjects: [],
      scpObjects: [
        { id: "scp-deepak", value: "Deepak", address: "0xSCP_101", refs: ["name1"] }
      ],
      pointers: [
        { from: "name1", to: "scp-deepak", color: "#38bdf8", dashed: false }
      ],
      comparisons: [
        { expr: 'name1 != null', result: 'true', reason: 'name1 points to "Deepak" in SCP (0xSCP_101)' }
      ],
      stats: { heapCount: 0, scpCount: 1, memorySaved: "0%" }
    },
    {
      step: 2,
      title: "Step 2: String name2 = \"Deepak\"; (SCP Reusability)",
      codeLine: 'String name2 = "Deepak";',
      codeSnippet: `String name1 = "Deepak";\nString name2 = "Deepak"; // -> Reuses 0xSCP_101 from SCP\nString name3 = new String("Amit");\nString name4 = new String("Amit");\nString name5 = name3.intern();`,
      activeLineIndex: 1,
      explanation: "1. JVM checks the SCP for \"Deepak\".\n2. \"Deepak\" already exists at address 0xSCP_101!\n3. JVM avoids duplicate creation. Variable name2 points to the existing object 0xSCP_101.\n4. Result: name1 == name2 evaluates to TRUE.",
      stackVars: [
        { name: "name1", ref: "0xSCP_101", target: "scp-deepak", targetType: "scp", label: "0xSCP_101" },
        { name: "name2", ref: "0xSCP_101", target: "scp-deepak", targetType: "scp", label: "0xSCP_101" }
      ],
      heapObjects: [],
      scpObjects: [
        { id: "scp-deepak", value: "Deepak", address: "0xSCP_101", refs: ["name1", "name2"] }
      ],
      pointers: [
        { from: "name1", to: "scp-deepak", color: "#38bdf8", dashed: false },
        { from: "name2", to: "scp-deepak", color: "#38bdf8", dashed: false }
      ],
      comparisons: [
        { expr: 'name1 == name2', result: 'true', reason: 'Both references point to the exact same 0xSCP_101 object in SCP' },
        { expr: 'name1.equals(name2)', result: 'true', reason: 'Exact identical character content' }
      ],
      stats: { heapCount: 0, scpCount: 1, memorySaved: "50% (1 duplicate avoided)" }
    },
    {
      step: 3,
      title: "Step 3: String name3 = new String(\"Amit\"); (Heap Allocation)",
      codeLine: 'String name3 = new String("Amit");',
      codeSnippet: `String name1 = "Deepak";\nString name2 = "Deepak";\nString name3 = new String("Amit"); // -> 2 Objects: Heap + SCP\nString name4 = new String("Amit");\nString name5 = name3.intern();`,
      activeLineIndex: 2,
      explanation: "1. The 'new' keyword creates a brand new String object in the Heap outside SCP (0xHeap_501).\n2. The literal \"Amit\" is placed into the SCP (0xSCP_202) because it was not already present.\n3. The reference variable name3 points to the HEAP object (0xHeap_501), NOT the SCP object.\n4. Total objects created in this step: 2.",
      stackVars: [
        { name: "name1", ref: "0xSCP_101", target: "scp-deepak", targetType: "scp", label: "0xSCP_101" },
        { name: "name2", ref: "0xSCP_101", target: "scp-deepak", targetType: "scp", label: "0xSCP_101" },
        { name: "name3", ref: "0xHeap_501", target: "heap-amit1", targetType: "heap", label: "0xHeap_501" }
      ],
      heapObjects: [
        { id: "heap-amit1", value: "Amit", address: "0xHeap_501", refs: ["name3"] }
      ],
      scpObjects: [
        { id: "scp-deepak", value: "Deepak", address: "0xSCP_101", refs: ["name1", "name2"] },
        { id: "scp-amit", value: "Amit", address: "0xSCP_202", refs: [] }
      ],
      pointers: [
        { from: "name1", to: "scp-deepak", color: "#38bdf8", dashed: false },
        { from: "name2", to: "scp-deepak", color: "#38bdf8", dashed: false },
        { from: "name3", to: "heap-amit1", color: "#f59e0b", dashed: false }
      ],
      comparisons: [
        { expr: 'name1 == name2', result: 'true', reason: 'Both share 0xSCP_101 in SCP' },
        { expr: 'name3 == "Amit"', result: 'false', reason: 'name3 is Heap (0xHeap_501) vs "Amit" is SCP (0xSCP_202)' }
      ],
      stats: { heapCount: 1, scpCount: 2, memorySaved: "33%" }
    },
    {
      step: 4,
      title: "Step 4: String name4 = new String(\"Amit\"); (Second Heap Object)",
      codeLine: 'String name4 = new String("Amit");',
      codeSnippet: `String name1 = "Deepak";\nString name2 = "Deepak";\nString name3 = new String("Amit");\nString name4 = new String("Amit"); // -> 1 Object in Heap (SCP reused)\nString name5 = name3.intern();`,
      activeLineIndex: 3,
      explanation: "1. The 'new' keyword creates ANOTHER new String object in the Heap (0xHeap_502).\n2. Literal \"Amit\" already exists in SCP (0xSCP_202), so NO new object is added to SCP.\n3. The reference variable name4 points to the new Heap object (0xHeap_502).\n4. name3 == name4 evaluates to FALSE (distinct Heap addresses), but name3.equals(name4) is TRUE.",
      stackVars: [
        { name: "name1", ref: "0xSCP_101", target: "scp-deepak", targetType: "scp", label: "0xSCP_101" },
        { name: "name2", ref: "0xSCP_101", target: "scp-deepak", targetType: "scp", label: "0xSCP_101" },
        { name: "name3", ref: "0xHeap_501", target: "heap-amit1", targetType: "heap", label: "0xHeap_501" },
        { name: "name4", ref: "0xHeap_502", target: "heap-amit2", targetType: "heap", label: "0xHeap_502" }
      ],
      heapObjects: [
        { id: "heap-amit1", value: "Amit", address: "0xHeap_501", refs: ["name3"] },
        { id: "heap-amit2", value: "Amit", address: "0xHeap_502", refs: ["name4"] }
      ],
      scpObjects: [
        { id: "scp-deepak", value: "Deepak", address: "0xSCP_101", refs: ["name1", "name2"] },
        { id: "scp-amit", value: "Amit", address: "0xSCP_202", refs: [] }
      ],
      pointers: [
        { from: "name1", to: "scp-deepak", color: "#38bdf8", dashed: false },
        { from: "name2", to: "scp-deepak", color: "#38bdf8", dashed: false },
        { from: "name3", to: "heap-amit1", color: "#f59e0b", dashed: false },
        { from: "name4", to: "heap-amit2", color: "#f59e0b", dashed: false }
      ],
      comparisons: [
        { expr: 'name3 == name4', result: 'false', reason: 'Distinct Heap memory addresses (0xHeap_501 != 0xHeap_502)' },
        { expr: 'name3.equals(name4)', result: 'true', reason: 'Both contain the same character sequence "Amit"' }
      ],
      stats: { heapCount: 2, scpCount: 2, memorySaved: "20%" }
    },
    {
      step: 5,
      title: "Step 5: String name5 = name3.intern(); (String Interning)",
      codeLine: 'String name5 = name3.intern();',
      codeSnippet: `String name1 = "Deepak";\nString name2 = "Deepak";\nString name3 = new String("Amit");\nString name4 = new String("Amit");\nString name5 = name3.intern(); // -> Fetches canonical SCP reference`,
      activeLineIndex: 4,
      explanation: "1. The intern() method checks the SCP for a string matching name3 (\"Amit\").\n2. It finds 0xSCP_202 already in the SCP and returns its reference.\n3. Variable name5 in the Stack points directly to 0xSCP_202 in the SCP.\n4. Result: name5 == \"Amit\" is TRUE! name3 == name5 is FALSE (Heap vs SCP).",
      stackVars: [
        { name: "name1", ref: "0xSCP_101", target: "scp-deepak", targetType: "scp", label: "0xSCP_101" },
        { name: "name2", ref: "0xSCP_101", target: "scp-deepak", targetType: "scp", label: "0xSCP_101" },
        { name: "name3", ref: "0xHeap_501", target: "heap-amit1", targetType: "heap", label: "0xHeap_501" },
        { name: "name4", ref: "0xHeap_502", target: "heap-amit2", targetType: "heap", label: "0xHeap_502" },
        { name: "name5", ref: "0xSCP_202", target: "scp-amit", targetType: "scp", label: "0xSCP_202" }
      ],
      heapObjects: [
        { id: "heap-amit1", value: "Amit", address: "0xHeap_501", refs: ["name3"] },
        { id: "heap-amit2", value: "Amit", address: "0xHeap_502", refs: ["name4"] }
      ],
      scpObjects: [
        { id: "scp-deepak", value: "Deepak", address: "0xSCP_101", refs: ["name1", "name2"] },
        { id: "scp-amit", value: "Amit", address: "0xSCP_202", refs: ["name5"] }
      ],
      pointers: [
        { from: "name1", to: "scp-deepak", color: "#38bdf8", dashed: false },
        { from: "name2", to: "scp-deepak", color: "#38bdf8", dashed: false },
        { from: "name3", to: "heap-amit1", color: "#f59e0b", dashed: false },
        { from: "name4", to: "heap-amit2", color: "#f59e0b", dashed: false },
        { from: "name5", to: "scp-amit", color: "#10b981", dashed: false }
      ],
      comparisons: [
        { expr: 'name3 == name5', result: 'false', reason: 'name3 is 0xHeap_501 while name5 is 0xSCP_202' },
        { expr: 'name5 == "Amit"', result: 'true', reason: 'Both reference the same 0xSCP_202 object in SCP' },
        { expr: 'name4.intern() == name5', result: 'true', reason: 'Both intern() calls return canonical SCP reference 0xSCP_202' }
      ],
      stats: { heapCount: 2, scpCount: 2, memorySaved: "38% canonical reuse" }
    }
  ];

  // Auto-play interval
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= simulationSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, simulationSteps.length]);

  const currentSimulation = simulationSteps[currentStep];

  // =========================================================================
  // 2. INTERACTIVE SANDBOX STATE
  // =========================================================================
  const [sandboxVarName, setSandboxVarName] = useState('s1');
  const [sandboxValue, setSandboxValue] = useState('Java');
  const [sandboxMode, setSandboxMode] = useState('literal'); // 'literal' | 'new'
  const [sandboxStack, setSandboxStack] = useState([
    { varName: 's1', value: 'Java', type: 'literal', address: '0xSCP_100', targetId: 'scp-java' }
  ]);
  const [sandboxHeap, setSandboxHeap] = useState([]);
  const [sandboxScp, setSandboxScp] = useState([
    { id: 'scp-java', value: 'Java', address: '0xSCP_100' }
  ]);

  const handleSandboxAllocate = () => {
    if (!sandboxVarName.trim() || !sandboxValue.trim()) return;

    const trimmedVal = sandboxValue.trim();
    const trimmedVar = sandboxVarName.trim();

    // Check if literal already exists in SCP
    let scpObj = sandboxScp.find(item => item.value === trimmedVal);
    let newScpList = [...sandboxScp];

    if (!scpObj) {
      const newScpAddr = `0xSCP_${100 + newScpList.length * 10}`;
      scpObj = { id: `scp-${trimmedVal.toLowerCase()}-${Date.now()}`, value: trimmedVal, address: newScpAddr };
      newScpList.push(scpObj);
      setSandboxScp(newScpList);
    }

    if (sandboxMode === 'literal') {
      const newStackEntry = {
        varName: trimmedVar,
        value: trimmedVal,
        type: 'literal',
        address: scpObj.address,
        targetId: scpObj.id
      };
      setSandboxStack(prev => [...prev.filter(v => v.varName !== trimmedVar), newStackEntry]);
    } else {
      // 'new' keyword
      const newHeapAddr = `0xHeap_${500 + sandboxHeap.length * 10}`;
      const newHeapObj = {
        id: `heap-${trimmedVal.toLowerCase()}-${Date.now()}`,
        value: trimmedVal,
        address: newHeapAddr
      };
      setSandboxHeap(prev => [...prev, newHeapObj]);

      const newStackEntry = {
        varName: trimmedVar,
        value: trimmedVal,
        type: 'new',
        address: newHeapAddr,
        targetId: newHeapObj.id
      };
      setSandboxStack(prev => [...prev.filter(v => v.varName !== trimmedVar), newStackEntry]);
    }

    // Auto increment variable name helper
    const match = trimmedVar.match(/\d+$/);
    if (match) {
      const num = parseInt(match[0], 10);
      setSandboxVarName(trimmedVar.replace(/\d+$/, String(num + 1)));
    } else {
      setSandboxVarName(trimmedVar + '2');
    }
  };

  const handleSandboxReset = () => {
    setSandboxStack([{ varName: 's1', value: 'Java', type: 'literal', address: '0xSCP_100', targetId: 'scp-java' }]);
    setSandboxHeap([]);
    setSandboxScp([{ id: 'scp-java', value: 'Java', address: '0xSCP_100' }]);
    setSandboxVarName('s2');
    setSandboxValue('Java');
  };

  // =========================================================================
  // 3. INTERN() DEMO STATE
  // =========================================================================
  const [internStep, setInternStep] = useState(0);

  // =========================================================================
  // 4. GARBAGE COLLECTION SIMULATOR STATE
  // =========================================================================
  const [gcState, setGcState] = useState({
    heapReferenced: true,
    scpHoldsData: true,
    gcRan: false
  });

  const handleTriggerGc = () => {
    setGcState(prev => ({
      ...prev,
      gcRan: true,
      heapReferenced: false // Heap object without reference is collected
    }));
  };

  const handleResetGc = () => {
    setGcState({
      heapReferenced: true,
      scpHoldsData: true,
      gcRan: false
    });
  };

  // =========================================================================
  // 5. QUIZ STATE
  // =========================================================================
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    {
      id: 'q1',
      question: 'How many total objects are created by: String s = new String("Deepak"); when "Deepak" does not already exist in SCP?',
      options: [
        { key: 'A', text: '1 object (only in Heap)' },
        { key: 'B', text: '1 object (only in SCP)' },
        { key: 'C', text: '2 objects (1 in Heap due to new, 1 in SCP for the literal)' },
        { key: 'D', text: '0 objects' }
      ],
      correct: 'C',
      explanation: 'The new keyword creates one object in the Heap area, and the literal "Deepak" creates another object in the String Constant Pool (SCP) if not already present.'
    },
    {
      id: 'q2',
      question: 'Where does the String Constant Pool (SCP) reside in modern JVM (Java 7+)?',
      options: [
        { key: 'A', text: 'Method Area / PermGen' },
        { key: 'B', text: 'Inside the JVM Heap memory' },
        { key: 'C', text: 'Directly in the CPU Cache registers' },
        { key: 'D', text: 'In Thread Call Stack' }
      ],
      correct: 'B',
      explanation: 'Starting with Java 7, the String Constant Pool was moved directly into the main Garbage-Collected Heap memory to prevent PermGen OutOfMemoryErrors.'
    },
    {
      id: 'q3',
      question: 'Given: String s1 = new String("Java"); String s2 = s1.intern(); String s3 = "Java"; What does (s2 == s3) evaluate to?',
      options: [
        { key: 'A', text: 'false' },
        { key: 'B', text: 'true' },
        { key: 'C', text: 'Compilation Error' },
        { key: 'D', text: 'NullPointerException' }
      ],
      correct: 'B',
      explanation: 's1.intern() returns the canonical reference from the SCP (0xSCP), and s3 is a literal pointing to the exact same SCP object. Hence s2 == s3 is true.'
    },
    {
      id: 'q4',
      question: 'Why does Java allow multiple String reference variables to safely share the same object in SCP?',
      options: [
        { key: 'A', text: 'Because Strings are synchronized by default' },
        { key: 'B', text: 'Because String objects are immutable and cannot be changed after creation' },
        { key: 'C', text: 'Because Strings use 128-bit pointers' },
        { key: 'D', text: 'Because SCP automatically clones the object on modification' }
      ],
      correct: 'B',
      explanation: 'String immutability guarantees that sharing references is 100% thread-safe; one reference cannot mutate the shared object and corrupt another reference.'
    }
  ];

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner Deck */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-900/40 bg-[#0B1222]/90 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
                <Database className="w-6 h-6 animate-pulse" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                String Constant Pool (SCP) Architecture Theater
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Interactive JVM memory visualization of String literals, <code>new String()</code> Heap allocation, duplicate prevention in SCP, and the <code>intern()</code> method.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenPlayground?.({
                language: 'java',
                title: 'String Constant Pool Demo',
                code: `public class StringScpDemo {
    public static void main(String[] args) {
        // 1. String Literals (SCP Reuse)
        String name1 = "Deepak";
        String name2 = "Deepak";
        System.out.println("name1 == name2 (Both SCP): " + (name1 == name2)); // true

        // 2. New Keyword (Heap Objects)
        String name3 = new String("Amit");
        String name4 = new String("Amit");
        System.out.println("name3 == name4 (Heap vs Heap): " + (name3 == name4)); // false
        System.out.println("name3.equals(name4): " + name3.equals(name4)); // true

        // 3. String Interning (SCP Reference)
        String name5 = name3.intern();
        System.out.println("name3 == name5 (Heap vs SCP): " + (name3 == name5)); // false
        System.out.println("name5 == \\"Amit\\" (SCP vs SCP): " + (name5 == "Amit")); // true
    }
}`
              })}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <Code2 className="w-4 h-4" />
              <span>Open in Java Playground</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[
            { key: 'animation', label: '1. Step-by-Step Architecture Animation', icon: Zap },
            { key: 'sandbox', label: '2. Live String Allocator Sandbox', icon: Sliders },
            { key: 'intern', label: '3. intern() Method Deep-Dive', icon: RefreshCw },
            { key: 'gc', label: '4. Garbage Collection in SCP', icon: Trash2 },
            { key: 'code', label: '5. Full Java Source Code', icon: FileCode },
            { key: 'quiz', label: '6. Concept Verification Quiz', icon: HelpCircle },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSectionTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveSectionTab(tab.key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          TAB 1: STEP-BY-STEP ARCHITECTURE ANIMATION
          ===================================================================== */}
      {activeSectionTab === 'animation' && (
        <div className="space-y-6">
          {/* Stepper Controls Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1222] border border-cyan-900/40 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 text-xs font-bold transition"
                title="Previous Step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isPlaying 
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20' 
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause Simulation' : 'Auto Play Simulation'}</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.min(simulationSteps.length - 1, prev + 1))}
                disabled={currentStep === simulationSteps.length - 1}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 text-xs font-bold transition"
                title="Next Step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(0);
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs transition"
                title="Reset to Beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Step Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {simulationSteps.map((s, idx) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStep(idx);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                    currentStep === idx
                      ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-400/50'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  Step {s.step}
                </button>
              ))}
            </div>

            {/* Speed selection */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Speed:</span>
              <button
                type="button"
                onClick={() => setPlaybackSpeed(3500)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${playbackSpeed === 3500 ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' : 'bg-slate-900 text-slate-400'}`}
              >
                1x
              </button>
              <button
                type="button"
                onClick={() => setPlaybackSpeed(2000)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${playbackSpeed === 2000 ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' : 'bg-slate-900 text-slate-400'}`}
              >
                1.5x
              </button>
              <button
                type="button"
                onClick={() => setPlaybackSpeed(1200)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${playbackSpeed === 1200 ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' : 'bg-slate-900 text-slate-400'}`}
              >
                2x
              </button>
            </div>
          </div>

          {/* Active Step Description Card */}
          <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2 shadow-inner">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>{currentSimulation.title}</span>
              </h3>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700/60">
                Line Executing: <code className="text-cyan-200">{currentSimulation.codeLine}</code>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
              {currentSimulation.explanation}
            </p>
          </div>

          {/* Main Visual Dual-Pane Architecture Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Code Window & Stack Variables (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Java Execution Code Box */}
              <div className="rounded-2xl bg-[#070D1A] border border-slate-800 p-4 shadow-xl space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                    <span>StringMemoryDemo.java</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                    Live Pointer Tracker
                  </span>
                </div>

                <div className="font-mono text-xs space-y-1 py-1">
                  {[
                    { code: 'String name1 = "Deepak";', comment: '// Step 1: New literal in SCP' },
                    { code: 'String name2 = "Deepak";', comment: '// Step 2: Reuses SCP object' },
                    { code: 'String name3 = new String("Amit");', comment: '// Step 3: Heap object + SCP literal' },
                    { code: 'String name4 = new String("Amit");', comment: '// Step 4: 2nd Heap object, SCP reused' },
                    { code: 'String name5 = name3.intern();', comment: '// Step 5: Canonical SCP reference' }
                  ].map((line, idx) => {
                    const isCurrentLine = currentSimulation.activeLineIndex === idx;
                    const isPastLine = currentSimulation.activeLineIndex > idx;
                    return (
                      <div
                        key={idx}
                        className={`p-2 rounded-xl transition flex flex-col gap-0.5 ${
                          isCurrentLine
                            ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-200 font-bold shadow-lg shadow-cyan-950/50'
                            : isPastLine
                            ? 'bg-slate-900/40 text-slate-400 opacity-80'
                            : 'text-slate-500 opacity-40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{line.code}</span>
                          {isCurrentLine && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950 font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 italic">{line.comment}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stack Memory Frame */}
              <div className="rounded-2xl bg-[#091122] border border-blue-900/40 p-4 space-y-3 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold text-blue-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Thread Call Stack Frame (main)</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                    Local References
                  </span>
                </div>

                {currentSimulation.stackVars.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 italic border border-dashed border-slate-800 rounded-xl">
                    No active reference variables yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentSimulation.stackVars.map((v, idx) => (
                      <div
                        key={v.name}
                        className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between animate-in slide-in-from-left-2 duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-blue-950 text-blue-400 font-mono text-xs font-bold flex items-center justify-center border border-blue-800">
                            {idx + 1}
                          </span>
                          <div>
                            <span className="text-xs font-mono font-bold text-white">{v.name}</span>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              Type: <code>java.lang.String</code>
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                            v.targetType === 'scp' 
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' 
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            Points to: {v.ref}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                            {v.targetType === 'scp' ? '-> SCP Pool' : '-> Heap Object'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: JVM Heap & String Constant Pool Architecture (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Giant Outer Container: JVM HEAP AREA */}
              <div className="rounded-3xl bg-gradient-to-b from-[#081226] via-[#050C1B] to-[#030710] border-2 border-cyan-500/40 p-5 sm:p-6 shadow-2xl relative space-y-6">
                
                {/* Header for Heap Area */}
                <div className="flex items-center justify-between pb-3 border-b border-cyan-900/60">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                      <Cpu className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-white tracking-wide">
                        JVM HEAP MEMORY AREA
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Manages dynamic memory allocations, standard Heap objects, and the specialized String Constant Pool.
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                    Heap Base: 0xHeap_000
                  </span>
                </div>

                {/* Section A: Regular Heap Objects (Created via 'new' Keyword) */}
                <div className="p-4 rounded-2xl bg-amber-950/10 border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                      <Box className="w-3.5 h-3.5" />
                      <span>Heap Objects (Outside SCP — Created via 'new')</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-300/80">
                      Count: {currentSimulation.heapObjects.length}
                    </span>
                  </div>

                  {currentSimulation.heapObjects.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500 italic border border-dashed border-amber-900/40 rounded-xl">
                      No standalone Heap objects allocated yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentSimulation.heapObjects.map(obj => (
                        <div
                          key={obj.id}
                          className="p-3.5 rounded-xl bg-amber-950/30 border-2 border-amber-500/60 shadow-lg shadow-amber-950/40 space-y-2 animate-in zoom-in-95 duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-amber-300">{obj.address}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-200 font-bold">
                              Heap String
                            </span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-[#070D1A] text-center border border-amber-500/30">
                            <span className="text-sm font-extrabold text-white font-mono">
                              "{obj.value}"
                            </span>
                          </div>

                          <div className="text-[10.5px] font-mono text-amber-300/90 flex items-center justify-between">
                            <span>Referenced by:</span>
                            <span className="font-bold text-amber-200">{obj.refs.join(', ')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section B: The Inner String Constant Pool (SCP) Container */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#061B33] via-[#041324] to-[#020A14] border-2 border-cyan-400 shadow-2xl space-y-4 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center justify-between relative z-10 pb-2 border-b border-cyan-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      <h5 className="text-sm font-extrabold text-cyan-200 tracking-wide">
                        String Constant Pool (SCP / StringTable)
                      </h5>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-900 text-cyan-300 border border-cyan-700 font-bold">
                      Unique Literals Only
                    </span>
                  </div>

                  {currentSimulation.scpObjects.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 italic border border-dashed border-cyan-800/60 rounded-xl">
                      SCP is currently empty.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                      {currentSimulation.scpObjects.map(obj => (
                        <div
                          key={obj.id}
                          className="p-3.5 rounded-xl bg-[#09223D]/90 border-2 border-cyan-400 shadow-lg shadow-cyan-950/60 space-y-2 animate-in zoom-in-95 duration-200"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-cyan-300">{obj.address}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-900 text-cyan-200 font-bold">
                              Pooled Literal
                            </span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-[#030B14] text-center border border-cyan-500/40">
                            <span className="text-sm font-black text-cyan-100 font-mono tracking-wider">
                              "{obj.value}"
                            </span>
                          </div>

                          <div className="text-[10.5px] font-mono text-cyan-300 flex items-center justify-between">
                            <span>Points from:</span>
                            <span className="font-bold text-white">
                              {obj.refs.length > 0 ? obj.refs.join(', ') : '(No direct Stack ref)'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Live Expression Truth Evaluator */}
                {currentSimulation.comparisons.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-slate-300 block border-b border-slate-800 pb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Live Expression Truth Evaluations:</span>
                    </span>
                    <div className="space-y-1.5">
                      {currentSimulation.comparisons.map((c, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-mono p-2 rounded-lg bg-slate-950 border border-slate-850">
                          <code className="text-cyan-300 font-bold">{c.expr}</code>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                              c.result === 'true' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                            }`}>
                              ==&gt; {c.result}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#0B1222] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Heap Objects Allocated</span>
                <span className="text-lg font-black text-amber-400 font-mono">{currentSimulation.stats.heapCount}</span>
              </div>
              <Box className="w-6 h-6 text-amber-400" />
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1222] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Unique SCP Literals</span>
                <span className="text-lg font-black text-cyan-400 font-mono">{currentSimulation.stats.scpCount}</span>
              </div>
              <Database className="w-6 h-6 text-cyan-400" />
            </div>

            <div className="p-4 rounded-2xl bg-[#0B1222] border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Deduplication Savings</span>
                <span className="text-lg font-black text-emerald-400 font-mono">{currentSimulation.stats.memorySaved}</span>
              </div>
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: LIVE STRING ALLOCATOR SANDBOX
          ===================================================================== */}
      {activeSectionTab === 'sandbox' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0B1222] border border-cyan-900/40 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <span>Interactive String Memory Allocator</span>
              </h3>
              <p className="text-xs text-slate-400">
                Define your own String variables using literals or the <code>new</code> keyword, and observe where the JVM places them in real-time.
              </p>
            </div>

            {/* Controls Form */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Variable Name</label>
                <input
                  type="text"
                  value={sandboxVarName}
                  onChange={e => setSandboxVarName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
                  placeholder="e.g. str1"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">String Value</label>
                <input
                  type="text"
                  value={sandboxValue}
                  onChange={e => setSandboxValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:border-cyan-500 focus:outline-none"
                  placeholder="e.g. Java"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Allocation Syntax</label>
                <select
                  value={sandboxMode}
                  onChange={e => setSandboxMode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs focus:border-cyan-500 focus:outline-none"
                >
                  <option value="literal">Literal ("value") -&gt; SCP</option>
                  <option value="new">new String("value") -&gt; Heap</option>
                </select>
              </div>

              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={handleSandboxAllocate}
                  className="flex-1 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Allocate</span>
                </button>
                <button
                  type="button"
                  onClick={handleSandboxReset}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                  title="Reset Sandbox"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Sandbox Visual Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Stack Variables */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-[#091122] border border-blue-900/40 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Stack Frame ({sandboxStack.length} variables)</span>
              </span>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {sandboxStack.map(item => (
                  <div key={item.varName} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-white font-bold">{item.varName}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        "{item.value}" ({item.type})
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.type === 'literal' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {item.address}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Heap & SCP Layout */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-[#060C18] border border-cyan-900/50 space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>JVM Heap Space</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Total Objects: {sandboxHeap.length + sandboxScp.length}
                </span>
              </div>

              {/* Standalone Heap Objects */}
              <div className="p-4 rounded-2xl bg-amber-950/10 border border-amber-500/30 space-y-2">
                <span className="text-xs font-mono font-bold text-amber-400 block">
                  Heap Instances ({sandboxHeap.length})
                </span>
                {sandboxHeap.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No Heap objects created with 'new'.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {sandboxHeap.map(obj => (
                      <div key={obj.id} className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/60 font-mono text-xs">
                        <span className="text-[10px] text-amber-400 block">{obj.address}</span>
                        <span className="text-white font-bold">"{obj.value}"</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SCP Inner Pool */}
              <div className="p-5 rounded-2xl bg-[#061A30] border-2 border-cyan-400 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    String Constant Pool ({sandboxScp.length} unique literals)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-900 text-cyan-200">
                    Deduplicated
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {sandboxScp.map(obj => (
                    <div key={obj.id} className="p-3 rounded-xl bg-[#0A2645] border border-cyan-400/80 font-mono text-xs shadow-md">
                      <span className="text-[10px] text-cyan-300 block">{obj.address}</span>
                      <span className="text-cyan-100 font-bold text-sm">"{obj.value}"</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 3: INTERN() METHOD DEEP-DIVE
          ===================================================================== */}
      {activeSectionTab === 'intern' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0B1222] border border-cyan-900/40 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
                <RefreshCw className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">
                  The <code className="text-cyan-400 font-mono">intern()</code> Method in Java
                </h3>
                <p className="text-xs text-slate-300">
                  Retrieves the canonical representative string from the String Constant Pool (SCP).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#070D1A] border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-300 font-mono block">Rule 1: String Exists in SCP</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If the string literal is already in the pool, <code>intern()</code> returns the direct reference to that existing pool object, creating 0 new objects.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#070D1A] border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-300 font-mono block">Rule 2: String Does Not Exist in SCP</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If the string is not present in the SCP, it is automatically added to the SCP pool, and a reference to that new pooled object is returned.
                </p>
              </div>
            </div>

            {/* Interactive intern demo step */}
            <div className="p-5 rounded-2xl bg-[#061224] border border-cyan-500/30 space-y-4">
              <h4 className="text-sm font-bold text-white font-mono flex items-center justify-between">
                <span>Interactive Interning Walkthrough</span>
                <span className="text-xs text-cyan-400">Step {internStep + 1} of 3</span>
              </h4>

              <div className="font-mono text-xs p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
                <div className={internStep === 0 ? 'text-cyan-300 font-bold bg-cyan-950/40 p-1.5 rounded' : 'text-slate-400'}>
                  1. String s1 = new String("Hello"); // Created in Heap (0xHeap_100)
                </div>
                <div className={internStep === 1 ? 'text-cyan-300 font-bold bg-cyan-950/40 p-1.5 rounded' : 'text-slate-400'}>
                  2. String s2 = s1.intern();          // Returns canonical SCP reference (0xSCP_999)
                </div>
                <div className={internStep === 2 ? 'text-cyan-300 font-bold bg-cyan-950/40 p-1.5 rounded' : 'text-slate-400'}>
                  3. String s3 = "Hello";              // Points directly to 0xSCP_999 in SCP
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setInternStep(prev => (prev + 1) % 3)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Next Intern Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Output evaluation */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                <div className="text-slate-400">Evaluation Console:</div>
                <div className="text-rose-300">System.out.println(s1 == s2); // false (Heap vs SCP)</div>
                <div className="text-emerald-300 font-bold">System.out.println(s2 == s3); // true (Both in SCP!)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 4: GARBAGE COLLECTION IN SCP
          ===================================================================== */}
      {activeSectionTab === 'gc' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0B1222] border border-cyan-900/40 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-rose-950 text-rose-400 border border-rose-800">
                  <Trash2 className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">Garbage Collection: Heap vs SCP</h3>
                  <p className="text-xs text-slate-300">
                    Observe how standard Heap objects get garbage collected when dereferenced, while SCP literals remain cached.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTriggerGc}
                  disabled={gcState.gcRan}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Run Garbage Collector (GC)</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetGc}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 text-xs transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Standalone Heap GC Behavior */}
              <div className="p-5 rounded-2xl bg-[#070D1A] border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400">Regular Heap Object</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300">
                    new String("Temp")
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-center font-mono">
                  {gcState.heapReferenced ? (
                    <div className="space-y-1">
                      <span className="text-xs text-emerald-400 font-bold">ALIVE IN HEAP</span>
                      <p className="text-[11px] text-slate-400">Reference: <code>tempRef != null</code></p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <span className="text-xs text-rose-400 font-bold">GARBAGE COLLECTED</span>
                      <p className="text-[11px] text-slate-400">Memory reclaimed by JVM GC</p>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  When <code>tempRef = null</code>, the standalone Heap object becomes unreachable and is promptly reclaimed during the next GC cycle.
                </p>
              </div>

              {/* SCP GC Behavior */}
              <div className="p-5 rounded-2xl bg-[#070D1A] border border-cyan-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">String Constant Pool (SCP)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300">
                    "Deepak"
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-center font-mono">
                  <div className="space-y-1">
                    <span className="text-xs text-cyan-300 font-bold">RETAINED IN POOL</span>
                    <p className="text-[11px] text-slate-400">Managed separately by JVM StringTable</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Even if reference variables become null, literals in SCP persist across application execution so future requests for <code>"Deepak"</code> can instantly reuse the cached instance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 5: FULL JAVA SOURCE CODE
          ===================================================================== */}
      {activeSectionTab === 'code' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-[#070D1A] border border-slate-800 p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                <FileCode className="w-4 h-4" />
                <span>StringConstantPoolDemo.java</span>
              </span>
              <button
                type="button"
                onClick={() => onOpenPlayground?.({
                  language: 'java',
                  title: 'String Constant Pool Complete Demo',
                  code: `public class StringConstantPoolDemo {
    public static void main(String[] args) {
        System.out.println("=== 1. STRING LITERALS (SCP) ===");
        String name1 = "Deepak";
        String name2 = "Deepak";
        System.out.println("name1 == name2: " + (name1 == name2)); // true (Same SCP object)
        System.out.println("name1.equals(name2): " + name1.equals(name2)); // true

        System.out.println("\\n=== 2. NEW KEYWORD (HEAP OBJECTS) ===");
        String name3 = new String("Amit");
        String name4 = new String("Amit");
        System.out.println("name3 == name4: " + (name3 == name4)); // false (Different Heap objects)
        System.out.println("name3.equals(name4): " + name3.equals(name4)); // true (Same content)

        System.out.println("\\n=== 3. INTERN() METHOD ===");
        String s1 = new String("Hello");
        String s2 = s1.intern();
        String s3 = "Hello";
        System.out.println("s1 == s2: " + (s1 == s2)); // false (Heap vs SCP)
        System.out.println("s2 == s3: " + (s2 == s3)); // true (Both in SCP)
    }
}`
                })}
                className="px-3 py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Play className="w-3 h-3" />
                <span>Run in Code Playground</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed">
{`public class StringConstantPoolDemo {
    public static void main(String[] args) {
        // Case 1: Using String Literals
        String name1 = "Deepak";
        String name2 = "Deepak";
        System.out.println("name1 == name2: " + (name1 == name2)); // true (Both in SCP)

        // Case 2: Using the new Keyword
        String name3 = new String("Amit");
        String name4 = new String("Amit");
        System.out.println("name3 == name4: " + (name3 == name4)); // false (Distinct Heap objects)
        System.out.println("name3.equals(name4): " + name3.equals(name4)); // true (Same characters)

        // Case 3: Using the intern() Method
        String s1 = new String("Hello"); // Created in Heap
        String s2 = s1.intern();          // Returns reference from String Pool (SCP)
        String s3 = "Hello";              // Literal in String Pool (SCP)

        System.out.println("s1 == s2: " + (s1 == s2)); // false (Heap vs SCP)
        System.out.println("s2 == s3: " + (s2 == s3)); // true (Both in SCP)
    }
}`}
            </pre>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 6: CONCEPT VERIFICATION QUIZ
          ===================================================================== */}
      {activeSectionTab === 'quiz' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#0B1222] border border-cyan-900/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-800">
                  <HelpCircle className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">String Constant Pool Mastery Quiz</h3>
                  <p className="text-xs text-slate-400">Test your understanding of literals, new keyword, SCP and intern().</p>
                </div>
              </div>

              {quizSubmitted && (
                <div className="px-3.5 py-1.5 rounded-xl bg-purple-950 text-purple-300 border border-purple-800 text-xs font-mono font-bold">
                  Score: {calculateScore()} / {quizQuestions.length}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {quizQuestions.map((q, qIndex) => {
                const selected = quizAnswers[q.id];
                const isCorrect = selected === q.correct;
                return (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-white block">
                      {qIndex + 1}. {q.question}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map(opt => {
                        const isChosen = selected === opt.key;
                        let btnStyle = 'bg-slate-950 hover:bg-slate-850 text-slate-300 border-slate-800';
                        if (quizSubmitted) {
                          if (opt.key === q.correct) btnStyle = 'bg-emerald-950 text-emerald-300 border-emerald-600 font-bold';
                          else if (isChosen) btnStyle = 'bg-rose-950 text-rose-300 border-rose-600';
                        } else if (isChosen) {
                          btnStyle = 'bg-cyan-500 text-slate-950 font-bold border-cyan-400';
                        }
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [q.id]: opt.key }))}
                            className={`p-3 rounded-xl border text-left text-xs font-mono transition flex items-start gap-2 ${btnStyle}`}
                          >
                            <span className="font-bold">{opt.key}.</span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className={`p-3 rounded-xl text-xs ${isCorrect ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800' : 'bg-rose-950/40 text-rose-300 border border-rose-800'}`}>
                        <div className="font-bold flex items-center gap-1.5 mb-1">
                          {isCorrect ? <CheckCircle className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                          <span>{isCorrect ? 'Correct!' : `Incorrect (Correct answer: ${q.correct})`}</span>
                        </div>
                        <p className="text-[11px] text-slate-300">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length === 0}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition cursor-pointer"
              >
                Submit Answers
              </button>

              {quizSubmitted && (
                <button
                  type="button"
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
                >
                  Retake Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
