import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  Share2, RefreshCw, Layers2, FileText, Check, HelpCircle, HeartHandshake,
  Trash2, AlertTriangle, Link2
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaAssociationVisualizer
 * High-Yield Interactive Association & Composition Simulator:
 * 1. 3 Injection Techniques (Direct Field vs Constructor Injection vs Setter Injection)
 * 2. Aggregation (Weak HAS-A) vs Composition (Strong HAS-A) Lifetime Simulator
 * 3. Cardinality Explorer (1:1, 1:N, N:1, M:N)
 */
export default function JavaAssociationVisualizer() {
  const [activeTab, setActiveTab] = useState('injection'); // 'injection' | 'agg-comp' | 'cardinality'
  const [selectedInjection, setSelectedInjection] = useState('direct');
  const [isCarDestroyed, setIsCarDestroyed] = useState(false);
  const [selectedCardinality, setSelectedCardinality] = useState('1-1');

  // 3 Injection Techniques Data
  const injectionModes = [
    {
      id: 'direct',
      name: '1. Direct Reference',
      subtitle: 'Instantiated Directly in Field',
      badge: 'Direct Field Instantiation',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      description: 'The dependent object is instantiated directly at the time of field declaration inside the class.',
      pros: 'Simple and requires no constructor or setter configuration.',
      cons: 'Tight coupling; cannot easily swap or mock the dependent object for testing.',
      code: `class Address {
    String city = "Delhi";
    String country = "India";

    void displayAddress() {
        System.out.println("City: " + city + ", Country: " + country);
    }
}

class Student {
    String name = "Deepak";
    int rollno = 101;

    // Direct reference: object created directly inside class
    Address address = new Address();

    void displayInfo() {
        System.out.println("Name: " + name + ", Roll No: " + rollno);
        address.displayAddress();
    }
}

public class MainApp {
    public static void main(String[] args) {
        Student student = new Student(); // No need to pass Address manually
        student.displayInfo();           // Displays student info along with address
    }
}`,
      output: `Name: Deepak, Roll No: 101\nCity: Delhi, Country: India`
    },
    {
      id: 'constructor',
      name: '2. Constructor Injection',
      subtitle: 'Injected through Constructor',
      badge: 'Best Practice / Mandatory',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'The dependent object is passed from the outside caller through the constructor at the moment of instantiation.',
      pros: 'Ensures mandatory dependency; object cannot be created in an incomplete state; facilitates immutability.',
      cons: 'Requires client caller to manage and pass dependencies explicitly.',
      code: `class Engine {
    void startEngine() {
        System.out.println("Engine starts.");
    }
}

class Car {
    // HAS-A relationship: Car has an Engine
    private Engine engine;

    // Constructor Injection: Engine is provided from outside
    Car(Engine engine) {
        this.engine = engine;
    }

    void startCar() {
        engine.startEngine(); // Car uses Engine to start
        System.out.println("Car starts.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        // 1. Create the dependency
        Engine engine = new Engine();
        // 2. Inject it into Car via constructor
        Car myCar = new Car(engine);
        myCar.startCar();
    }
}`,
      output: `Engine starts.\nCar starts.`
    },
    {
      id: 'setter',
      name: '3. Setter Injection',
      subtitle: 'Injected through Public Setter',
      badge: 'Optional / Dynamic',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: 'The dependency is provided or swapped dynamically after object creation using a public setter method.',
      pros: 'Flexibility to reassign or change dependencies at runtime; ideal for optional dependencies.',
      cons: 'Object can temporarily exist in an uninitialized state before setter is called (NullPointerException risk).',
      code: `class Processor {
    void startProcessor() {
        System.out.println("Processor starts processing.");
    }
}

class Laptop {
    // HAS-A relationship: Laptop has a Processor
    private Processor processor;

    // Setter Injection: Injecting dependency through setter method
    public void setProcessor(Processor processor) {
        this.processor = processor;
    }

    void startLaptop() {
        if (processor != null) {
            processor.startProcessor();
            System.out.println("Laptop starts.");
        }
    }
}

public class MainApp {
    public static void main(String[] args) {
        // 1. Create the dependency
        Processor processor = new Processor();

        // 2. Create the dependent object
        Laptop myLaptop = new Laptop();

        // 3. Inject dependency using setter
        myLaptop.setProcessor(processor);

        // 4. Use the dependent object
        myLaptop.startLaptop();
    }
}`,
      output: `Processor starts processing.\nLaptop starts.`
    }
  ];

  // Cardinality Modes Data
  const cardinalities = [
    {
      id: '1-1',
      title: 'One-to-One (1:1)',
      analogy: 'One Person HAS-A One Passport (and vice-versa).',
      code: `class Person { Passport passport; }\nclass Passport { Person person; }`
    },
    {
      id: '1-N',
      title: 'One-to-Many (1:N)',
      analogy: 'One Department HAS-A List of Many Employees.',
      code: `class Department { List<Employee> employees; }`
    },
    {
      id: 'N-1',
      title: 'Many-to-One (N:1)',
      analogy: 'Many Students belong to One University.',
      code: `class Student { University university; }`
    },
    {
      id: 'M-N',
      title: 'Many-to-Many (M:N)',
      analogy: 'Many Students enroll in Many Courses.',
      code: `class Student { List<Course> courses; }\nclass Course { List<Student> students; }`
    }
  ];

  const currentInjectionData = injectionModes.find(m => m.id === selectedInjection) || injectionModes[0];
  const currentCardData = cardinalities.find(c => c.id === selectedCardinality) || cardinalities[0];

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
            <span>Interactive Association & Composition Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Association (HAS-A Relationship) in Java
          </h3>
        </div>

        {/* Master Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('injection')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'injection'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>3 Injection Methods</span>
          </button>

          <button
            onClick={() => setActiveTab('agg-comp')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'agg-comp'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Aggregation vs Composition</span>
          </button>

          <button
            onClick={() => setActiveTab('cardinality')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'cardinality'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Cardinality (1:1, 1:N)</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: 3 INJECTION METHODS (Direct, Constructor, Setter)              */}
      {/* ===================================================================== */}
      {activeTab === 'injection' && (
        <div className="space-y-6 relative z-10">
          
          {/* 3 Injection Type Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {injectionModes.map(mode => {
              const isSelected = selectedInjection === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setSelectedInjection(mode.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 space-y-1.5 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white tracking-tight">{mode.name}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${mode.badgeColor}`}>
                      {mode.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block line-clamp-1">{mode.subtitle}</span>
                </button>
              );
            })}
          </div>

          {/* Active Injection View */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Code Viewer (7 cols) */}
            <div className="xl:col-span-7 space-y-3 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{currentInjectionData.name} Code</span>
                </span>
                <span>Java 21</span>
              </div>
              <UltraModernCodeViewer code={currentInjectionData.code} />
            </div>

            {/* Right: Technical Explanation & Console Output (5 cols) */}
            <div className="xl:col-span-5 space-y-4 min-w-0">
              
              {/* Explanation Card */}
              <div className="p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-3 shadow-inner">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${currentInjectionData.badgeColor}`}>
                  {currentInjectionData.badge}
                </span>

                <h4 className="text-base font-bold text-white leading-snug">
                  {currentInjectionData.subtitle}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentInjectionData.description}
                </p>

                <div className="space-y-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
                    <strong className="text-emerald-400 block mb-0.5">Advantage:</strong>
                    <span>{currentInjectionData.pros}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-200">
                    <strong className="text-amber-400 block mb-0.5">Trade-off:</strong>
                    <span>{currentInjectionData.cons}</span>
                  </div>
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
                  {currentInjectionData.output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: AGGREGATION (Weak) vs COMPOSITION (Strong) LIFETIME SIMULATOR */}
      {/* ===================================================================== */}
      {activeTab === 'agg-comp' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            While both <strong>Aggregation</strong> and <strong>Composition</strong> are achieved via instance variables (HAS-A), their <strong>Memory Lifecycle & Ownership Semantics</strong> are critically different!
          </div>

          {/* Interactive Destruction Simulation Controller */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#060D1A] border border-cyan-500/40 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase block">Interactive Object Lifecycle Test</span>
              <h4 className="text-base font-bold text-white">
                Status: {isCarDestroyed ? <span className="text-rose-400">Car Object Destroyed (Garbage Collected)</span> : <span className="text-emerald-400">Car Object Alive on Heap</span>}
              </h4>
            </div>

            <button
              onClick={() => setIsCarDestroyed(!isCarDestroyed)}
              className={`px-4 py-2 rounded-xl font-bold text-xs font-mono flex items-center gap-2 transition shadow-lg ${
                isCarDestroyed
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
                  : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/30'
              }`}
            >
              {isCarDestroyed ? <RefreshCw className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
              <span>{isCarDestroyed ? 'Reinstantiate Car (new Car())' : 'Destroy Car Object (car = null)'}</span>
            </button>
          </div>

          {/* Side-by-Side Comparison: Aggregation vs Composition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* 1. Aggregation (Weak HAS-A) */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-blue-500/40 space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                  1. Aggregation (Weak HAS-A)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Independent Lifetimes</span>
              </div>

              <div className="space-y-1 text-xs">
                <strong className="text-white block text-sm">Car HAS-A Music Player 📻</strong>
                <p className="text-slate-300 leading-relaxed">
                  The Music Player can exist independently. If the Car is sold or crushed, the Music Player can be uninstalled and reused elsewhere!
                </p>
              </div>

              {/* Lifecycle State Box */}
              <div className={`p-4 rounded-xl border font-mono text-xs space-y-1.5 transition-all duration-300 ${
                isCarDestroyed
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}>
                <div className="flex justify-between">
                  <span>Music Player State:</span>
                  <strong className="text-emerald-400">SURVIVES INDEPENDENTLY ✓</strong>
                </div>
                <span className="text-[11px] text-slate-400 block">
                  {isCarDestroyed ? 'Car is null, but musicPlayer reference remains alive in memory!' : 'Music player is plugged into car.'}
                </span>
              </div>
            </div>

            {/* 2. Composition (Strong HAS-A) */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-rose-500/40 space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase">
                  2. Composition (Strong HAS-A)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Death-Bound Lifetime</span>
              </div>

              <div className="space-y-1 text-xs">
                <strong className="text-white block text-sm">Car HAS-A Engine ⚙️</strong>
                <p className="text-slate-300 leading-relaxed">
                  The Engine is an inseparable part of the car's identity. If the Car is destroyed, its composite sub-components are destroyed along with it.
                </p>
              </div>

              {/* Lifecycle State Box */}
              <div className={`p-4 rounded-xl border font-mono text-xs space-y-1.5 transition-all duration-300 ${
                isCarDestroyed
                  ? 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}>
                <div className="flex justify-between">
                  <span>Engine State:</span>
                  <strong className={isCarDestroyed ? 'text-rose-400' : 'text-slate-300'}>
                    {isCarDestroyed ? 'DESTROYED WITH CAR ❌' : 'BOUND TO CAR LIFETIME'}
                  </strong>
                </div>
                <span className="text-[11px] text-slate-400 block">
                  {isCarDestroyed ? 'Car destroyed -> Engine has no standalone existence and is collected by GC.' : 'Engine powers the car.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: CARDINALITY EXPLORER (1:1, 1:N, N:1, M:N)                      */}
      {/* ===================================================================== */}
      {activeTab === 'cardinality' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong>Cardinality</strong> defines the numerical count of connections between associating classes:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {cardinalities.map(card => {
              const isSelected = selectedCardinality === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => setSelectedCardinality(card.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 space-y-2 ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold text-white block">{card.title}</span>
                  <span className="text-[11px] text-slate-400 block line-clamp-2">{card.analogy}</span>
                </button>
              );
            })}
          </div>

          {/* Active Cardinality Details */}
          <div className="p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-cyan-400 font-bold text-sm">{currentCardData.title}</span>
              <span className="text-slate-500 text-[11px]">Domain Modeling</span>
            </div>
            <p className="text-slate-300 text-xs">{currentCardData.analogy}</p>
            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-200 overflow-x-auto whitespace-pre leading-relaxed">
              <code>{currentCardData.code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
