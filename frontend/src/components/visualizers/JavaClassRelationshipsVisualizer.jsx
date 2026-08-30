import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, GitFork, ArrowRight, ArrowDown, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, Shield,
  Share2, RefreshCw, Layers2, FileText, Check, HelpCircle
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaClassRelationshipsVisualizer
 * High-Yield Interactive Class Relationships Theater:
 * 1. Association (HAS-A) vs Dependency (USES-A) vs Inheritance (IS-A)
 * 2. Visual Architecture & Memory Object Lifetime Diagrams
 * 3. Live Synchronized Code & Terminal Execution
 */
export default function JavaClassRelationshipsVisualizer() {
  const [activeRel, setActiveRel] = useState('has-a'); // 'has-a' | 'uses-a' | 'is-a' | 'matrix'

  const relationships = [
    {
      id: 'has-a',
      name: '1. Association (HAS-A)',
      subtitle: 'Instance Variable Reference',
      badge: 'HAS-A Relationship',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      definition: 'Association is a relationship where one class holds an object reference to another class as an instance variable (field).',
      exampleReal: 'Student HAS-A Address | Car HAS-A Engine | Bank HAS-A Account',
      howToAchieve: 'Achieved by declaring object references as instance variables inside a class.',
      coupling: 'Long-lived binding (Child lives as part of Parent instance on Heap)',
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

    // HAS-A: Direct reference declared as instance variable
    Address address = new Address();

    void displayInfo() {
        System.out.println("Name: " + name + ", Roll No: " + rollno);
        address.displayAddress(); // Delegating to associated object
    }
}

public class MainApp {
    public static void main(String[] args) {
        Student student = new Student();
        student.displayInfo();
    }
}`,
      output: `Name: Deepak, Roll No: 101\nCity: Delhi, Country: India`,
      diagram: {
        from: "Student Object",
        relType: "HAS-A (Field Reference)",
        to: "Address Object",
        arrowColor: "border-blue-500 text-blue-400 bg-blue-950/40"
      }
    },
    {
      id: 'uses-a',
      name: '2. Dependency (USES-A)',
      subtitle: 'Temporary Method-Level Usage',
      badge: 'USES-A Relationship',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      definition: 'Dependency exists when one class uses another class temporarily to perform a specific task, typically within a method scope.',
      exampleReal: 'OfficeWorker USES-A Printer | Driver USES-A GPS | Calculator USES-A MathLib',
      howToAchieve: 'Achieved via local variables inside methods or method parameter arguments.',
      coupling: 'Short-lived / Transient (Lives only for the duration of the method call stack frame)',
      code: `class Printer {
    void printDocument(String doc) {
        System.out.println("Printing document: " + doc);
    }
}

class OfficeWorker {
    void doWork() {
        // USES-A: Dependency via local variable inside method
        Printer printer = new Printer();
        printer.printDocument("ProjectReport.pdf");
        System.out.println("Work completed.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        OfficeWorker worker = new OfficeWorker();
        worker.doWork(); // OfficeWorker temporarily uses Printer
    }
}`,
      output: `Printing document: ProjectReport.pdf\nWork completed.`,
      diagram: {
        from: "OfficeWorker (Caller)",
        relType: "USES-A (Method Scope)",
        to: "Printer (Service)",
        arrowColor: "border-amber-500 text-amber-400 bg-amber-950/40"
      }
    },
    {
      id: 'is-a',
      name: '3. Inheritance (IS-A)',
      subtitle: 'Type Hierarchy & Reusability',
      badge: 'IS-A Relationship',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      definition: 'Inheritance is a relationship where a child class (subclass) inherits all non-private fields and methods from a parent class (superclass).',
      exampleReal: 'Car IS-A Vehicle | Dog IS-A Animal | SavingsAccount IS-A BankAccount',
      howToAchieve: 'Achieved using the "extends" keyword (classes) or "implements" keyword (interfaces).',
      coupling: 'Compile-time Tight Coupling (Subclass inherits state and behavior contracts directly)',
      code: `class Vehicle {
    void start() {
        System.out.println("Vehicle starts.");
    }
}

// IS-A: Car inherits all capabilities from Vehicle
class Car extends Vehicle {
    void drive() {
        System.out.println("Car drives.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.start(); // Inherited method from parent Vehicle
        myCar.drive(); // Specific method of child Car
    }
}`,
      output: `Vehicle starts.\nCar drives.`,
      diagram: {
        from: "Car (Child Class)",
        relType: "IS-A (extends)",
        to: "Vehicle (Parent Class)",
        arrowColor: "border-emerald-500 text-emerald-400 bg-emerald-950/40"
      }
    }
  ];

  const currentRel = relationships.find(r => r.id === activeRel) || relationships[0];

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Class Relationship Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Relationship Between Classes in Java
          </h3>
        </div>

        {/* Master Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveRel('has-a')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeRel === 'has-a'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>HAS-A (Association)</span>
          </button>

          <button
            onClick={() => setActiveRel('uses-a')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeRel === 'uses-a'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>USES-A (Dependency)</span>
          </button>

          <button
            onClick={() => setActiveRel('is-a')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeRel === 'is-a'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>IS-A (Inheritance)</span>
          </button>

          <button
            onClick={() => setActiveRel('matrix')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeRel === 'matrix'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers2 className="w-3.5 h-3.5" />
            <span>Master Matrix</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* RELATIONSHIP STAGE VIEW (HAS-A, USES-A, IS-A)                         */}
      {/* ===================================================================== */}
      {activeRel !== 'matrix' && (
        <div className="space-y-6 relative z-10">
          
          {/* Top Overview Banner */}
          <div className="p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${currentRel.badgeColor}`}>
                {currentRel.badge}
              </span>
              <span className="text-xs font-mono text-slate-500">Architectural Model</span>
            </div>

            <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              {currentRel.name}: {currentRel.subtitle}
            </h4>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentRel.definition}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <strong className="text-cyan-300 block mb-0.5">Real-World Analogy:</strong>
                <span className="text-slate-300 font-mono">{currentRel.exampleReal}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <strong className="text-amber-300 block mb-0.5">How to Achieve:</strong>
                <span className="text-slate-300">{currentRel.howToAchieve}</span>
              </div>
            </div>
          </div>

          {/* Visual Architecture Flow Diagram */}
          <div className="p-4 rounded-2xl bg-[#040711] border border-slate-800 text-center space-y-3 shadow-inner">
            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider block">
              Live Architecture Relationship Flow
            </span>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/50 text-cyan-200 font-bold shadow-md">
                {currentRel.diagram.from}
              </div>

              <div className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-2 ${currentRel.diagram.arrowColor}`}>
                <span>──────►</span>
                <span>{currentRel.diagram.relType}</span>
                <span>──────►</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/50 text-emerald-200 font-bold shadow-md">
                {currentRel.diagram.to}
              </div>
            </div>

            <span className="text-[11px] font-mono text-slate-400 block pt-1">
              Coupling Lifecycle: <strong className="text-white">{currentRel.coupling}</strong>
            </span>
          </div>

          {/* Code & Standard Output Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Code Viewer (7 cols) */}
            <div className="xl:col-span-7 space-y-2 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Java Implementation</span>
                </span>
                <span>Java 21</span>
              </div>
              <UltraModernCodeViewer code={currentRel.code} />
            </div>

            {/* Right: Output Console (5 cols) */}
            <div className="xl:col-span-5 rounded-2xl bg-[#040711] border border-slate-800 p-5 flex flex-col justify-between shadow-inner min-w-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                    <Terminal className="w-4 h-4" />
                    <span>Standard Output</span>
                  </span>
                  <span className="text-[10px] font-mono">JVM 21</span>
                </div>

                <div className="p-4 rounded-xl bg-[#060913] border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre-line leading-relaxed shadow-inner">
                  {currentRel.output}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold">Execution Successful</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW: MASTER RELATIONSHIP COMPARISON MATRIX                           */}
      {/* ===================================================================== */}
      {activeRel === 'matrix' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Comparing the 3 fundamental relationships between classes in Java across keyword syntax, memory lifespan, coupling strength, and real-world design choices:
          </div>

          <div className="rounded-2xl border border-slate-800 overflow-hidden bg-[#040711] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Relationship</th>
                    <th className="p-3.5">Syntax / Mechanism</th>
                    <th className="p-3.5">Lifetime & Scope</th>
                    <th className="p-3.5">Coupling Strength</th>
                    <th className="p-3.5">Canonical Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300 text-[11.5px]">
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-blue-400">1. Association (HAS-A)</td>
                    <td className="p-3.5">Instance variable declaration (<code>Address addr = new Address();</code>)</td>
                    <td className="p-3.5 text-cyan-300">Long-lived (Lives with Parent on Heap)</td>
                    <td className="p-3.5 text-amber-300">Medium / Strong (Composition / Aggregation)</td>
                    <td className="p-3.5 text-slate-400">Student HAS-A Address</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-amber-400">2. Dependency (USES-A)</td>
                    <td className="p-3.5">Method local variable or method parameter</td>
                    <td className="p-3.5 text-emerald-300">Short-lived (Destroyed when method returns)</td>
                    <td className="p-3.5 text-emerald-400">Loose Coupling (Temporary usage)</td>
                    <td className="p-3.5 text-slate-400">OfficeWorker USES-A Printer</td>
                  </tr>
                  <tr className="hover:bg-slate-900/40 transition">
                    <td className="p-3.5 font-bold text-emerald-400">3. Inheritance (IS-A)</td>
                    <td className="p-3.5"><code>extends</code> (class) or <code>implements</code> (interface)</td>
                    <td className="p-3.5 text-purple-300">Permanent type hierarchy</td>
                    <td className="p-3.5 text-rose-400">Tight Coupling (Compile-time contract)</td>
                    <td className="p-3.5 text-slate-400">Car IS-A Vehicle</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
