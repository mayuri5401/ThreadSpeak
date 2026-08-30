import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  CreditCard, FileText, Image as ImageIcon, GitFork, RefreshCw, Layers2,
  Plug, Check, Server, Database, Code
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaInterfacesVisualizer
 * High-Yield Interactive Interfaces Theater:
 * 1. 5 Core Uses of Interfaces (100% Abstraction, Unrelated Classes, Multiple Inheritance, Loose Coupling, Frameworks)
 * 2. Interactive Loose-Coupled Payment Gateway Simulator (UPI vs NetBanking)
 * 3. Java Version Evolution Timeline (Java 7 -> 8 -> 9)
 */
export default function JavaInterfacesVisualizer() {
  const [activeTab, setActiveTab] = useState('use-cases'); // 'use-cases' | 'loose-coupling' | 'evolution'
  const [selectedUseCase, setSelectedUseCase] = useState('1'); // '1' | '2' | '3' | '4' | '5'
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('upi'); // 'upi' | 'netbanking'

  // 5 Uses Data
  const useCasesData = [
    {
      id: '1',
      num: '1',
      title: '1. 100% Pure Abstraction',
      badge: 'Pure Abstract Contract',
      badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-950/60',
      description: 'Interfaces define the complete functional contract without dictating any implementation details, providing 100% pure abstraction.',
      code: `// Interface with 100% abstraction
interface Vehicle {
    void start();
    void stop();
}

// Car class implements the interface
class Car implements Vehicle {
    public void start() {
        System.out.println("Car is starting...");
    }

    public void stop() {
        System.out.println("Car is stopping...");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle v = new Car(); // Interface reference (Polymorphism)
        v.start();
        v.stop();
    }
}`,
      output: `Car is starting...\nCar is stopping...`,
      diagram: "Vehicle Interface ──► Car Class (Implements start & stop)"
    },
    {
      id: '2',
      num: '2',
      title: '2. Common Behavior Across Unrelated Classes',
      badge: 'Decoupled Standardization',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'Completely unrelated classes like Document and Image can share a standardized print() method via the Printable interface.',
      code: `// Interface with a common method
interface Printable {
    void print();
}

// Unrelated class 1
class Document implements Printable {
    public void print() {
        System.out.println("Printing document...");
    }
}

// Unrelated class 2
class Image implements Printable {
    public void print() {
        System.out.println("Printing image...");
    }
}

public class Main {
    public static void main(String[] args) {
        Printable p1 = new Document();
        Printable p2 = new Image();

        p1.print();
        p2.print();
    }
}`,
      output: `Printing document...\nPrinting image...`,
      diagram: "Printable Interface ◄─── Document Class & Image Class (Unrelated)"
    },
    {
      id: '3',
      num: '3',
      title: '3. Achieving Multiple Inheritance',
      badge: 'Multiple Interface Contracts',
      badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
      description: 'Java classes cannot extend multiple classes, but can implement multiple interfaces simultaneously with zero ambiguity.',
      code: `interface I1 {
    void m1();
}

interface I2 {
    void m2();
}

// Multiple Inheritance using interfaces
class A implements I1, I2 {
    public void m1() {
        System.out.println("Method m1 from interface I1");
    }

    public void m2() {
        System.out.println("Method m2 from interface I2");
    }
}

public class Main {
    public static void main(String[] args) {
        A obj = new A();
        obj.m1();
        obj.m2();
    }
}`,
      output: `Method m1 from interface I1\nMethod m2 from interface I2`,
      diagram: "Interface I1 + Interface I2 ──► Class A (implements I1, I2)"
    },
    {
      id: '4',
      num: '4',
      title: '4. Achieving Loose Coupling',
      badge: 'Dependency Inversion',
      badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
      description: 'The PaymentCheckout service depends on the Payment interface, allowing swapping between UPI and NetBanking without altering checkout logic.',
      code: `interface Payment {
    void pay();
}

class UpiPayment implements Payment {
    public void pay() {
        System.out.println("Payment done using UPI.");
    }
}

class NetBankingPayment implements Payment {
    public void pay() {
        System.out.println("Payment done using Net Banking.");
    }
}

class PaymentCheckout {
    void payment(Payment payment) {
        payment.pay(); // Works with ANY class implementing Payment!
    }
}

public class MainApp {
    public static void main(String[] args) {
        PaymentCheckout checkout = new PaymentCheckout();
        checkout.payment(new UpiPayment());
        checkout.payment(new NetBankingPayment());
    }
}`,
      output: `Payment done using UPI.\nPayment done using Net Banking.`,
      diagram: "PaymentCheckout ──► Payment Interface ◄─── UpiPayment / NetBankingPayment"
    },
    {
      id: '5',
      num: '5',
      title: '5. Frameworks, APIs & Design Patterns',
      badge: 'Enterprise Standard',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
      description: 'Industry frameworks (Spring, Hibernate), Java standard APIs (Collections, JDBC), and Design Patterns (DAO, Service Layer) are built on Interfaces.',
      code: `// Real-world Enterprise DAO Pattern using Interfaces
interface UserDao {
    void saveUser(String username);
    String findUserById(int id);
}

class UserDaoImpl implements UserDao {
    @Override
    public void saveUser(String username) {
        System.out.println("User '" + username + "' saved to PostgreSQL Database.");
    }

    @Override
    public String findUserById(int id) {
        return "User_" + id;
    }
}

public class MainApp {
    public static void main(String[] args) {
        UserDao dao = new UserDaoImpl();
        dao.saveUser("Mayuri");
    }
}`,
      output: `User 'Mayuri' saved to PostgreSQL Database.`,
      diagram: "Spring / Collections / JDBC / DAO ──► Standard Interface Contracts"
    }
  ];

  const currentCase = useCasesData.find(u => u.id === selectedUseCase) || useCasesData[0];

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
            <span>Interactive Interface Architecture Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Interfaces in Java
          </h3>
        </div>

        {/* Master Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('use-cases')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'use-cases'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plug className="w-3.5 h-3.5" />
            <span>5 Uses of Interfaces</span>
          </button>

          <button
            onClick={() => setActiveTab('loose-coupling')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'loose-coupling'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Loose Coupling Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('evolution')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'evolution'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers2 className="w-3.5 h-3.5" />
            <span>Java 7 ➔ 8 ➔ 9 Evolution</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: 5 USES OF INTERFACES                                           */}
      {/* ===================================================================== */}
      {activeTab === 'use-cases' && (
        <div className="space-y-6 relative z-10">
          
          {/* 5 Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {useCasesData.map(item => {
              const isSelected = selectedUseCase === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedUseCase(item.id)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 space-y-1 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
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

          {/* Active Use Case View */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Code Viewer (7 cols) */}
            <div className="xl:col-span-7 space-y-2 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{currentCase.title}</span>
                </span>
                <span>Java 21</span>
              </div>
              <UltraModernCodeViewer code={currentCase.code} />
            </div>

            {/* Right: Description & Console Output (5 cols) */}
            <div className="xl:col-span-5 space-y-4 min-w-0">
              
              {/* Theory Card */}
              <div className="p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-3 shadow-inner">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${currentCase.badgeColor}`}>
                  {currentCase.badge}
                </span>

                <h4 className="text-base font-bold text-white leading-snug">
                  {currentCase.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentCase.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300">
                  <strong className="text-slate-400 block mb-0.5">Architecture Flow:</strong>
                  <span>{currentCase.diagram}</span>
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
                  {currentCase.output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: INTERACTIVE LOOSE-COUPLING PAYMENT SIMULATOR                   */}
      {/* ===================================================================== */}
      {activeTab === 'loose-coupling' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-cyan-400" />
              <span>Interactive Loose Coupling Simulator</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In loosely-coupled architecture, the <code>PaymentCheckout</code> class only communicates with the <code>Payment</code> interface. You can swap between UPI, Net Banking, or Credit Card without rewriting the checkout engine!
            </p>
          </div>

          {/* Interactive Mode Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedPaymentMode('upi')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedPaymentMode === 'upi'
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.01]'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">1. UPI Payment Mode</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  UpiPayment
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block pt-1">Triggers payment via UPI (GooglePay / PhonePe / Paytm)</span>
            </button>

            <button
              onClick={() => setSelectedPaymentMode('netbanking')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedPaymentMode === 'netbanking'
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.01]'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">2. Net Banking Payment Mode</span>
                <span className="text-[10px] font-mono text-purple-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  NetBankingPayment
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block pt-1">Triggers payment via Net Banking Gateway</span>
            </button>
          </div>

          {/* Architecture Flow Visualization */}
          <div className="p-5 rounded-2xl bg-[#060B16] border border-slate-800 font-mono text-xs space-y-4">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Live Decoupled Execution Pipeline</span>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold">
                PaymentCheckout (Client)
              </div>

              <div className="text-cyan-400 font-bold text-xs">
                ──── calls payment.pay() ────►
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500 text-cyan-300 font-bold shadow-md">
                interface Payment
              </div>

              <div className="text-emerald-400 font-bold text-xs">
                ──── dynamic dispatch ────►
              </div>

              <div className={`p-3.5 rounded-xl border font-bold ${
                selectedPaymentMode === 'upi'
                  ? 'bg-blue-950 border-blue-500 text-blue-300'
                  : 'bg-purple-950 border-purple-500 text-purple-300'
              }`}>
                {selectedPaymentMode === 'upi' ? 'new UpiPayment()' : 'new NetBankingPayment()'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 flex items-center justify-between">
              <span>Terminal Execution Result:</span>
              <strong className="text-white">
                {selectedPaymentMode === 'upi' ? 'Payment done using UPI.' : 'Payment done using Net Banking.'}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: JAVA 7 -> 8 -> 9 INTERFACE EVOLUTION                          */}
      {/* ===================================================================== */}
      {activeTab === 'evolution' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Interfaces in Java have evolved across major releases to support Lambda expressions and code reuse while preserving backward compatibility:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Java 7 */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-blue-500/40 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase block pb-1 border-b border-slate-800">
                1. Java 7 & Prior
              </span>
              <h4 className="text-sm font-bold text-white">Pure Abstract Contract</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• Only <code>public abstract</code> methods</li>
                <li>• Only <code>public static final</code> constants</li>
                <li>• Zero concrete code permitted</li>
              </ul>
            </div>

            {/* Java 8 */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-emerald-500/40 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase block pb-1 border-b border-slate-800">
                2. Java 8
              </span>
              <h4 className="text-sm font-bold text-white">Default & Static Methods</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• <code>default</code> methods with bodies for backward compatibility</li>
                <li>• <code>static</code> utility methods in interfaces</li>
                <li>• Enables Lambdas & Streams</li>
              </ul>
            </div>

            {/* Java 9 */}
            <div className="p-5 rounded-2xl bg-[#060B16] border border-purple-500/40 space-y-3">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase block pb-1 border-b border-slate-800">
                3. Java 9+
              </span>
              <h4 className="text-sm font-bold text-white">Private Helper Methods</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>• <code>private</code> methods for code deduplication inside interfaces</li>
                <li>• <code>private static</code> helper methods</li>
                <li>• Encapsulated interface internals</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
