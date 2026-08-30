import React, { useState, useEffect } from 'react';
import { 
  Box, Cpu, Layers, Play, Pause, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ArrowDown,
  Info, Database, HelpCircle, Plus
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaClassesObjectsVisualizer
 * High-Yield Interactive Object & Memory Simulator:
 * 1. Synchronized Code Trace with Animated Pointer from Stack -> Heap
 * 2. Real-time Object Factory Sandbox (Create objects dynamically)
 * 3. 8 Interactive Program Demonstrations with Outputs
 * 4. Real-world Categorization Explorer
 */
export default function JavaClassesObjectsVisualizer() {
  const [activeTab, setActiveTab] = useState('memory'); // 'memory' | 'sandbox' | 'programs' | 'real-world'
  const [memoryStep, setMemoryStep] = useState(0);
  const [isMemoryPlaying, setIsMemoryPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1500);

  // Custom Object Factory Sandbox state
  const [sandboxObjects, setSandboxObjects] = useState([
    { id: 'buzo', name: 'Buzo', type: 'Dog', color: 'Black', eyes: 2, addr: '0x7F2A' },
    { id: 'jumbo', name: 'Jumbo', type: 'Elephant', color: 'Brown', eyes: 2, addr: '0x8E1C' }
  ]);
  const [customName, setCustomName] = useState('');
  const [customColor, setCustomColor] = useState('Golden');
  const [customType, setCustomType] = useState('Animal');
  const [sandboxLogs, setSandboxLogs] = useState([
    "JVM Initialized.",
    "Animal buzo = new Animal(); -> Created at Heap @0x7F2A",
    "Animal jumbo = new Animal(); -> Created at Heap @0x8E1C"
  ]);

  const [selectedProgId, setSelectedProgId] = useState(1);

  // 6 Memory Execution Frames with Synchronized Code Line Highlighting
  const memoryFrames = [
    {
      step: 1,
      title: "Step 1: Class Loading (Method Area / Metaspace)",
      codeLine: 1,
      badge: "Method Area (Metaspace)",
      desc: "When the JVM starts, the ClassLoader loads Animal.class bytecode into the Method Area. It stores class structure, field definitions, and method bytecode. No physical Heap object exists yet.",
      methodAreaActive: true,
      stackVar: null,
      stackVal: null,
      heapObj: null,
      pointerActive: false,
      consoleOut: null
    },
    {
      step: 2,
      title: "Step 2: Reference Variable Declaration (Stack Frame)",
      codeLine: 8,
      badge: "Stack Allocation",
      desc: "Declares a 64-bit reference variable 'buzo' in main() method's Stack frame. At this moment, 'buzo' contains 'null' because no object has been created.",
      methodAreaActive: true,
      stackVar: "buzo",
      stackVal: "null",
      heapObj: null,
      pointerActive: false,
      consoleOut: null
    },
    {
      step: 3,
      title: "Step 3: Heap Object Instantiation (new Animal())",
      codeLine: 8,
      badge: "Heap Allocation",
      desc: "The 'new' operator allocates a physical block of RAM on the JVM Heap. The default constructor initializes fields to default values (color = null, eyes = 0). It assigns unique identity address '@0x7F2A'.",
      methodAreaActive: true,
      stackVar: "buzo",
      stackVal: "null",
      heapObj: {
        address: "@0x7F2A",
        classType: "Animal",
        color: "null (default)",
        eyes: 0,
        highlight: "new"
      },
      pointerActive: false,
      consoleOut: null
    },
    {
      step: 4,
      title: "Step 4: Memory Address Binding (= Operator)",
      codeLine: 8,
      badge: "Stack -> Heap Pointer",
      desc: "The assignment operator (=) stores the Heap address '@0x7F2A' into the Stack variable 'buzo'. 'buzo' now holds a reference pointer linking Stack directly to Heap.",
      methodAreaActive: true,
      stackVar: "buzo",
      stackVal: "@0x7F2A",
      heapObj: {
        address: "@0x7F2A",
        classType: "Animal",
        color: "null",
        eyes: 0,
        highlight: "linked"
      },
      pointerActive: true,
      consoleOut: null
    },
    {
      step: 5,
      title: "Step 5: Updating State via Dot Operator (buzo.color)",
      codeLine: 9,
      badge: "Heap Mutation",
      desc: "Using the dot (.) operator, the JVM dereferences the address @0x7F2A in Heap and modifies the instance variable 'color' to 'Black' and 'eyes' to 2.",
      methodAreaActive: true,
      stackVar: "buzo",
      stackVal: "@0x7F2A",
      heapObj: {
        address: "@0x7F2A",
        classType: "Animal",
        color: "\"Black\"",
        eyes: 2,
        highlight: "updated"
      },
      pointerActive: true,
      consoleOut: null
    },
    {
      step: 6,
      title: "Step 6: Method Invocation (buzo.run())",
      codeLine: 10,
      badge: "Behavior Execution",
      desc: "Invokes the run() method on buzo. The JVM looks up the method bytecode in Method Area and executes the instructions, printing 'I\\'m running' to standard output.",
      methodAreaActive: true,
      stackVar: "buzo",
      stackVal: "@0x7F2A",
      heapObj: {
        address: "@0x7F2A",
        classType: "Animal",
        color: "\"Black\"",
        eyes: 2,
        highlight: "executing"
      },
      pointerActive: true,
      consoleOut: "I'm running\nBuzo color is Black (Eyes: 2)"
    }
  ];

  // Auto-play timer for memory stepper
  useEffect(() => {
    let interval = null;
    if (isMemoryPlaying) {
      interval = setInterval(() => {
        setMemoryStep((prev) => {
          if (prev >= memoryFrames.length - 1) {
            setIsMemoryPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isMemoryPlaying, playbackSpeed, memoryFrames.length]);

  const currentMemFrame = memoryFrames[memoryStep];

  // Code snippet lines for synchronized view
  const demoCodeLines = [
    { num: 1, text: "class Animal {" },
    { num: 2, text: "    String color;" },
    { num: 3, text: "    int eyes;" },
    { num: 4, text: "    void run() { System.out.println(\"I'm running\"); }" },
    { num: 5, text: "}" },
    { num: 6, text: "public class MainApp {" },
    { num: 7, text: "    public static void main(String[] args) {" },
    { num: 8, text: "        Animal buzo = new Animal(); // 1. Decl + 2. new + 3. =" },
    { num: 9, text: "        buzo.color = \"Black\"; buzo.eyes = 2; // Set State" },
    { num: 10, text: "        buzo.run(); // Invoke Behavior" },
    { num: 11, text: "        System.out.println(\"Buzo color is \" + buzo.color);" },
    { num: 12, text: "    }" },
    { num: 13, text: "}" }
  ];

  // 8 Programs Data
  const programsList = [
    {
      id: 1,
      title: "Program 1: Basic Class, Object & Method",
      lead: "Simple Animal1 class, run() method, and jumbo object.",
      code: `public class Animal1 {
    // Method to display a running message
    public void run() {
        System.out.println("I'm running");
    }

    public static void main(String[] args) {
        // Create an instance (object) of Animal1
        Animal1 jumbo = new Animal1();
        // Call the run method using object 'jumbo'
        jumbo.run();
    }
}`,
      output: `I'm running`
    },
    {
      id: 2,
      title: "Program 2: Multiple Methods (run & eat)",
      lead: "Animal2 class with run() and eat() methods called by jumbo object.",
      code: `public class Animal2 {
    public void run() {
        System.out.println("I'm running");
    }

    public void eat() {
        System.out.println("I'm eating...!!");
    }

    public static void main(String[] args) {
        Animal2 jumbo = new Animal2();
        jumbo.run();
        jumbo.eat();
    }
}`,
      output: `I'm running\nI'm eating...!!`
    },
    {
      id: 3,
      title: "Program 3: Multiple Objects (jumbo & buzo)",
      lead: "Animal3 class with two objects (jumbo and buzo) accessing both methods.",
      code: `public class Animal3 {
    public void run() {
        System.out.println("I'm running");
    }

    public void eat() {
        System.out.println("I'm eating...!!");
    }

    public static void main(String[] args) {
        Animal3 jumbo = new Animal3();
        jumbo.run();
        jumbo.eat();

        Animal3 buzo = new Animal3();
        buzo.eat();
        buzo.run();
    }
}`,
      output: `I'm running\nI'm eating...!!\nI'm eating...!!\nI'm running`
    },
    {
      id: 4,
      title: "Program 4: Method Parameters",
      lead: "Passing String parameter to run(name) and eat(name) methods.",
      code: `public class Animal4 {
    public void run(String name) {
        System.out.println(name + " is running");
    }

    public void eat(String name) {
        System.out.println(name + " is eating...!!");
    }

    public static void main(String[] args) {
        Animal4 jumbo = new Animal4();
        jumbo.run("Jumbo");
        jumbo.eat("Jumbo");

        Animal4 buzo = new Animal4();
        buzo.eat("Buzo");
        buzo.run("Buzo");
    }
}`,
      output: `Jumbo is running\nJumbo is eating...!!\nBuzo is eating...!!\nBuzo is running`
    },
    {
      id: 5,
      title: "Program 5: Multiple Parameters in Methods",
      lead: "Methods accepting multiple arguments (name, distance_km) and (name, dish).",
      code: `public class Animal5 {
    public void run(String name, int distance_km) {
        System.out.println(name + " has run " + distance_km + " km");
    }

    public void eat(String name, String dish) {
        System.out.println(name + " is eating " + dish);
    }

    public static void main(String[] args) {
        Animal5 jumbo = new Animal5();
        jumbo.run("Jumbo", 5);
        jumbo.eat("Jumbo", "grass");

        Animal5 buzo = new Animal5();
        buzo.eat("Buzo", "meat");
        buzo.run("Buzo", 12);
    }
}`,
      output: `Jumbo has run 5 km\nJumbo is eating grass\nBuzo is eating meat\nBuzo has run 12 km`
    },
    {
      id: 6,
      title: "Program 6: Instance Variables & State",
      lead: "Animal6 class with instance variables (no_of_eyes, color) and details(name) method.",
      code: `public class Animal6 {
    // Instance variables (State)
    int no_of_eyes;
    String color;

    public void details(String name) {
        System.out.println("-------Details of " + name + "-------");
        System.out.println("Eyes : " + no_of_eyes);
        System.out.println("Color : " + color);
    }

    public static void main(String[] args) {
        Animal6 jumbo = new Animal6();
        jumbo.no_of_eyes = 2;
        jumbo.color = "Brown";
        jumbo.details("Jumbo");

        Animal6 buzo = new Animal6();
        buzo.no_of_eyes = 2;
        buzo.color = "Black";
        buzo.details("Buzo");
    }
}`,
      output: `-------Details of Jumbo-------\nEyes : 2\nColor : Brown\n-------Details of Buzo-------\nEyes : 2\nColor : Black`
    },
    {
      id: 7,
      title: "Program 7: Best Practice (Separate Main Class)",
      lead: "Best practice: separating Animal7 class and MainApp7 containing main().",
      code: `class Animal7 {
    void run() {
        System.out.println("I'm running");
    }
}

public class MainApp7 {
    public static void main(String[] args) {
        Animal7 buzo = new Animal7();
        buzo.run();
    }
}`,
      output: `I'm running`
    },
    {
      id: 8,
      title: "Program 8: Best Practice (Multiple Classes)",
      lead: "Animal8 and Birds8 classes organized with a dedicated MainApp8 driver class.",
      code: `class Animal8 {
    void run() {
        System.out.println("I'm running");
    }
}

class Birds8 {
    void fly() {
        System.out.println("I'm flying");
    }
}

public class MainApp8 {
    public static void main(String[] args) {
        Animal8 buzo = new Animal8();
        buzo.run();

        Birds8 sparrow = new Birds8();
        sparrow.fly();
    }
}`,
      output: `I'm running\nI'm flying`
    }
  ];

  const selectedProgram = programsList.find(p => p.id === selectedProgId) || programsList[0];

  // Handler to create a custom object in the interactive sandbox
  const handleCreateCustomObject = () => {
    if (!customName.trim()) return;
    const randAddr = '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    const newObj = {
      id: customName.toLowerCase(),
      name: customName,
      type: customType,
      color: customColor,
      eyes: 2,
      addr: randAddr
    };
    setSandboxObjects(prev => [...prev, newObj]);
    setSandboxLogs(prev => [
      ...prev,
      `${customType} ${customName.toLowerCase()} = new ${customType}(); -> Instantiated in Heap at ${randAddr} (color="${customColor}")`
    ]);
    setCustomName('');
  };

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Object & Memory Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Class, Objects & Methods in Java
          </h3>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('memory')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'memory'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>JVM Memory Stepper</span>
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'sandbox'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Live Object Factory</span>
          </button>

          <button
            onClick={() => setActiveTab('programs')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'programs'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>8 Practical Programs</span>
          </button>

          <button
            onClick={() => setActiveTab('real-world')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'real-world'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Real-World Model</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* VIEW 1: JVM MEMORY STEPPER WITH LIVE CODE TRACE & ANIMATED POINTERS    */}
      {/* ===================================================================== */}
      {activeTab === 'memory' && (
        <div className="space-y-6 relative z-10">
          
          {/* Stepper Description Header with Controls */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-[11px] font-mono font-bold">
                  {currentMemFrame.badge}
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {currentMemFrame.title}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentMemFrame.desc}
              </p>
            </div>

            {/* Stepper Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (memoryStep >= memoryFrames.length - 1) setMemoryStep(0);
                  setIsMemoryPlaying(!isMemoryPlaying);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-cyan-500/30"
              >
                {isMemoryPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isMemoryPlaying ? 'Pause' : 'Auto Play'}</span>
              </button>

              <button
                onClick={() => { setIsMemoryPlaying(false); setMemoryStep(Math.max(0, memoryStep - 1)); }}
                disabled={memoryStep === 0}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition"
                title="Previous Step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-cyan-300 font-bold px-1.5">
                {memoryStep + 1} / {memoryFrames.length}
              </span>

              <button
                onClick={() => { setIsMemoryPlaying(false); setMemoryStep(Math.min(memoryFrames.length - 1, memoryStep + 1)); }}
                disabled={memoryStep === memoryFrames.length - 1}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 transition"
                title="Next Step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { setIsMemoryPlaying(false); setMemoryStep(0); }}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 transition"
                title="Reset Stepper"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Layout: Left Code Line Tracker + Right 3-Stage Memory Architecture */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Synchronized Java Code Viewer (5 cols on xl, full width below) */}
            <div className="xl:col-span-5 rounded-2xl bg-[#040711] border border-slate-800 p-4 font-mono text-xs flex flex-col justify-between shadow-inner min-w-0 overflow-hidden">
              <div className="space-y-2 min-w-0">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <Code2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Executing Java Code</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Live JVM Step</span>
                </div>

                <div className="space-y-1 pt-1 overflow-x-auto scrollbar-thin pb-1">
                  {demoCodeLines.map(line => {
                    const isExecuting = (memoryStep === 0 && line.num <= 5) || 
                                        (memoryStep === 1 && line.num === 8) || 
                                        (memoryStep === 2 && line.num === 8) || 
                                        (memoryStep === 3 && line.num === 8) || 
                                        (memoryStep === 4 && line.num === 9) || 
                                        (memoryStep === 5 && line.num === 10);
                    return (
                      <div
                        key={line.num}
                        className={`px-2.5 py-1 rounded-lg text-[11.5px] transition-all duration-200 flex items-center gap-2 min-w-max ${
                          isExecuting
                            ? 'bg-cyan-500/20 text-cyan-200 font-bold border border-cyan-500/60 shadow-md shadow-cyan-500/10'
                            : 'text-slate-400 hover:text-slate-300'
                        }`}
                      >
                        <span className="text-[10px] text-slate-600 select-none w-4 text-right shrink-0">{line.num}</span>
                        <span className="font-mono">{line.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Console Output in Stepper */}
              {currentMemFrame.consoleOut && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 font-mono text-[11px] text-emerald-300 animate-fadeIn">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase pb-1 border-b border-emerald-900/60 mb-1">
                    <Terminal className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Standard Output Console:</span>
                  </div>
                  <pre className="whitespace-pre-line leading-relaxed text-emerald-300">{currentMemFrame.consoleOut}</pre>
                </div>
              )}
            </div>

            {/* Right: 3 Visual Memory Containers with Pointer Connectors (7 cols on xl, full width below) */}
            <div className="xl:col-span-7 flex flex-col gap-4 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 min-w-0">
                
                {/* 1. Method Area (Metaspace) */}
                <div className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-w-0 ${
                  currentMemFrame.methodAreaActive
                    ? 'bg-[#060D1D] border-blue-500/50 shadow-lg shadow-blue-500/10'
                    : 'bg-[#040711] border-slate-800'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-mono font-bold text-blue-400 truncate">1. Method Area</span>
                      <span className="text-[9px] font-mono text-slate-500 shrink-0">Metaspace</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs space-y-1.5 min-w-0">
                      <strong className="text-cyan-300 block border-b border-slate-800 pb-1 truncate">class Animal</strong>
                      <div className="text-[11px] text-slate-400 space-y-0.5">
                        <div>• String color</div>
                        <div>• int eyes</div>
                        <div>• void run()</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] font-mono text-slate-500 text-center">
                    Class metadata
                  </div>
                </div>

                {/* 2. Stack Memory (Thread Call Frame) */}
                <div className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative min-w-0 ${
                  currentMemFrame.stackVar
                    ? 'bg-[#06111D] border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                    : 'bg-[#040711] border-slate-800'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-mono font-bold text-cyan-400 truncate">2. Stack Frame</span>
                      <span className="text-[9px] font-mono text-slate-500 shrink-0">[main()]</span>
                    </div>

                    {currentMemFrame.stackVar ? (
                      <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/50 font-mono text-xs space-y-1.5 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-slate-400 text-[10px]">Var:</span>
                          <strong className="text-cyan-300 font-bold truncate">{currentMemFrame.stackVar}</strong>
                        </div>
                        <div className="flex items-center justify-between gap-1 text-[11px] pt-1 border-t border-cyan-900/60">
                          <span className="text-slate-400 text-[10px]">Holds:</span>
                          <span className={`font-bold truncate ${currentMemFrame.stackVal === 'null' ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {currentMemFrame.stackVal}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-600 font-mono italic">
                        Empty stack
                      </div>
                    )}
                  </div>

                  <div className="pt-2 text-[10px] font-mono text-slate-500 text-center">
                    Reference variable
                  </div>
                </div>

                {/* 3. Heap Memory (Physical Object Instance) */}
                <div className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-w-0 ${
                  currentMemFrame.heapObj
                    ? 'bg-[#061413] border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'bg-[#040711] border-slate-800'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-mono font-bold text-emerald-400 truncate">3. Heap Memory</span>
                      <span className="text-[9px] font-mono text-slate-500 shrink-0">Object</span>
                    </div>

                    {currentMemFrame.heapObj ? (
                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 font-mono text-xs space-y-1.5 min-w-0">
                        <div className="flex items-center justify-between pb-1 border-b border-emerald-900/60 gap-1">
                          <span className="text-slate-400 text-[10px]">Addr:</span>
                          <strong className="text-amber-300 font-bold truncate">{currentMemFrame.heapObj.address}</strong>
                        </div>
                        <div className="text-[11px] space-y-0.5 pt-0.5">
                          <div className="flex justify-between gap-1">
                            <span className="text-slate-400">color:</span>
                            <span className="text-cyan-300 font-bold truncate">{currentMemFrame.heapObj.color}</span>
                          </div>
                          <div className="flex justify-between gap-1">
                            <span className="text-slate-400">eyes:</span>
                            <span className="text-cyan-300 font-bold">{currentMemFrame.heapObj.eyes}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-600 font-mono italic">
                        No heap object
                      </div>
                    )}
                  </div>

                  <div className="pt-2 text-[10px] font-mono text-slate-500 text-center">
                    Allocated on RAM
                  </div>
                </div>
              </div>

              {/* Dynamic Animated Pointer Status Bar */}
              {currentMemFrame.pointerActive && (
                <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs font-mono text-cyan-200 flex flex-wrap items-center justify-between gap-2 animate-fadeIn">
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                    <span className="truncate">Stack <strong>buzo</strong> ──► Points to <strong>Heap Object @0x7F2A</strong></span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold shrink-0">Pointer Bound</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 2: LIVE OBJECT FACTORY (Instantiate custom objects dynamically)  */}
      {/* ===================================================================== */}
      {activeTab === 'sandbox' && (
        <div className="space-y-6 relative z-10">
          
          {/* Top Form: Create New Object */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Instantiate New Object in Heap</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">Interactive Object Factory</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Class Type:</label>
                <select
                  value={customType}
                  onChange={e => setCustomType(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                >
                  <option value="Animal">Animal</option>
                  <option value="Birds">Birds</option>
                  <option value="Vehicles">Vehicles</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Object Name (Ref Var):</label>
                <input
                  type="text"
                  placeholder="e.g. tommy, tiger"
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Color (Instance State):</label>
                <input
                  type="text"
                  value={customColor}
                  onChange={e => setCustomColor(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleCreateCustomObject}
                  className="w-full py-2 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/30 transition active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>new {customType}()</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Objects in Heap Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Objects Currently Allocated on JVM Heap ({sandboxObjects.length})</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sandboxObjects.map((obj) => (
                <div 
                  key={obj.addr} 
                  className="p-4 rounded-2xl bg-[#060D1A] border border-cyan-500/40 space-y-3 shadow-lg hover:border-cyan-400 transition"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                    <span className="font-mono font-bold text-cyan-300">{obj.type} {obj.name}</span>
                    <span className="font-mono text-amber-300 text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      @{obj.addr}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs font-mono text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">State (color):</span>
                      <span className="text-emerald-300 font-bold">{obj.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">State (eyes):</span>
                      <span className="text-cyan-300">{obj.eyes}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSandboxLogs(prev => [
                          ...prev,
                          `Invoked ${obj.name}.run() -> [Output: ${obj.name} is running!]`
                        ]);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono transition"
                    >
                      {obj.name}.run()
                    </button>
                    <span className="text-[10px] text-slate-500 font-mono">Alive in Heap</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time Sandbox Terminal Log */}
          <div className="rounded-2xl bg-[#040711] border border-slate-800 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-bold">
                <Terminal className="w-3.5 h-3.5" />
                <span>JVM Memory Activity Stream</span>
              </span>
              <button 
                onClick={() => setSandboxLogs(["Logs cleared."])}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            </div>
            <div className="font-mono text-xs text-emerald-300 space-y-1 max-h-32 overflow-y-auto">
              {sandboxLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">&gt; {log}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 3: 8 PRACTICAL PROGRAMS RUNNER                                   */}
      {/* ===================================================================== */}
      {activeTab === 'programs' && (
        <div className="space-y-5 relative z-10">
          
          {/* Programs Horizontal Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {programsList.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProgId(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                  selectedProgId === p.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                Program {p.id}
              </button>
            ))}
          </div>

          {/* Active Program View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Left: Code Viewer (7 cols) */}
            <div className="lg:col-span-7 space-y-2">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <strong className="text-cyan-300 block mb-0.5">{selectedProgram.title}</strong>
                <span className="text-slate-400 text-[11px]">{selectedProgram.lead}</span>
              </div>
              <UltraModernCodeViewer code={selectedProgram.code} />
            </div>

            {/* Right: Output Console (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-[#040711] border border-slate-800 p-5 flex flex-col justify-between shadow-inner">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                    <Terminal className="w-4 h-4" />
                    <span>Standard Output Console</span>
                  </span>
                  <span className="text-[10px] font-mono">Java 21 JVM</span>
                </div>

                <div className="p-4 rounded-xl bg-[#060913] border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed shadow-inner">
                  {selectedProgram.output}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Execution Status:</span>
                <span className="text-emerald-400 font-bold">Process finished with exit code 0</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 4: REAL-WORLD CATEGORIES & OBJECT MODELING                      */}
      {/* ===================================================================== */}
      {activeTab === 'real-world' && (
        <div className="space-y-5 relative z-10">
          
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            A <strong>Class</strong> is a template used to categorize objects (e.g. Animal, Birds, Vehicles). Each class can have multiple <strong>Objects</strong> (elephant, sparrow, car) that perform actions using <strong>Methods</strong>.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Animal Category */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase">
                <span className="text-lg">🐾</span>
                <span>Class: Animal</span>
              </div>
              <div className="text-xs space-y-1 text-slate-300">
                <div><strong>Objects:</strong> Elephant, Tiger, Dog (Buzo, Jumbo)</div>
                <div><strong>Methods:</strong> <code>eat()</code>, <code>run()</code>, <code>sleep()</code></div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300">
                Animal buzo = new Animal();<br />
                buzo.run(); // "I'm running"
              </div>
            </div>

            {/* Birds Category */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
                <span className="text-lg">🦅</span>
                <span>Class: Birds</span>
              </div>
              <div className="text-xs space-y-1 text-slate-300">
                <div><strong>Objects:</strong> Sparrow, Peacock, Parrot</div>
                <div><strong>Methods:</strong> <code>fly()</code>, <code>eat()</code>, <code>chirp()</code></div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300">
                Birds sparrow = new Birds();<br />
                sparrow.fly(); // "I'm flying"
              </div>
            </div>

            {/* Vehicles Category */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                <span className="text-lg">🚗</span>
                <span>Class: Vehicles</span>
              </div>
              <div className="text-xs space-y-1 text-slate-300">
                <div><strong>Objects:</strong> Car, Bike, Truck</div>
                <div><strong>Methods:</strong> <code>start()</code>, <code>accelerate()</code>, <code>brake()</code></div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300">
                Vehicles car = new Vehicles();<br />
                car.start(); // "Engine started"
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
