import React, { useState } from 'react';
import { 
  Box, Cpu, Layers, Play, RotateCcw, ChevronRight, ChevronLeft, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, ShieldCheck,
  ShieldAlert, Lock, Unlock, AlertTriangle, Check, X, Pill, DollarSign,
  HelpCircle, Eye, EyeOff
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaEncapsulationVisualizer
 * High-Yield Interactive Encapsulation & Data Hiding Simulator:
 * 1. Bank Account Vault & Security Checkpoint (Valid vs Malicious access)
 * 2. Simple Encapsulation vs Proper Encapsulation (Data Hiding)
 * 3. Real-World Capsule & Automotive Protective Shell
 * 4. Interview Questions & Deep Concepts
 */
export default function JavaEncapsulationVisualizer() {
  const [activeTab, setActiveTab] = useState('vault'); // 'vault' | 'compare' | 'capsule' | 'interview'
  const [balance, setBalance] = useState(5000);
  const [lastAction, setLastAction] = useState({ text: 'Initial balance: ₹5000', status: 'normal' });
  const [directHackAttempted, setDirectHackAttempted] = useState(false);

  // Bank actions
  const handleDeposit = (amt) => {
    setDirectHackAttempted(false);
    if (amt > 0) {
      const newBal = balance + amt;
      setBalance(newBal);
      setLastAction({ text: `✅ Deposited ₹${amt}. New balance: ₹${newBal}`, status: 'success' });
    } else {
      setLastAction({ text: `❌ Invalid deposit amount (₹${amt})! Blocked by setter validation.`, status: 'error' });
    }
  };

  const handleWithdraw = (amt) => {
    setDirectHackAttempted(false);
    if (amt > 0 && amt <= balance) {
      const newBal = balance - amt;
      setBalance(newBal);
      setLastAction({ text: `✅ Withdrawn ₹${amt}. Remaining balance: ₹${newBal}`, status: 'success' });
    } else {
      setLastAction({ text: `❌ Withdrawal rejected (₹${amt})! Insufficient funds or invalid amount.`, status: 'error' });
    }
  };

  const handleDirectHack = () => {
    setDirectHackAttempted(true);
    setLastAction({ text: `🚫 BLOCKED: 'account.balance = -99999;' is illegal! 'balance' has private access.`, status: 'hack-blocked' });
  };

  const codeSimple = `// ❌ Simple Encapsulation: Bundled in class, but NO Data Hiding
class Car {
    String brand; // Default/Package-Private (Vulnerable)
    int speed;

    void setDetails(String b, int s) {
        brand = b;
        speed = s;
    }

    void printDetails() {
        System.out.println("Brand : " + brand);
        System.out.println("Speed : " + speed);
    }
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car();
        c.setDetails("Tata", 100);
        c.printDetails();

        // ⚠️ Vulnerability: Direct unauthorized access
        c.speed = -500; // Corrupts state directly without validation!
    }
}`;

  const codeProper = `// ✅ Proper Encapsulation: Private Fields + Public Getters/Setters + Validation
class Car {
    // 1. Private data members (Data Hiding)
    private String brand;
    private int speed;

    // 2. Public Getters and Setters with Validation
    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getBrand() {
        return brand;
    }

    public void setSpeed(int speed) {
        if (speed >= 0) { // Validation prevents invalid negative speed
            this.speed = speed;
        }
    }

    public int getSpeed() {
        return speed;
    }

    public void printDetails() {
        System.out.println("Brand : " + brand);
        System.out.println("Speed : " + speed);
    }
}

public class MainApp {
    public static void main(String[] args) {
        Car c = new Car();
        c.setBrand("Tata");
        c.setSpeed(100);
        c.printDetails();

        // c.speed = -500; // ❌ Compile-time error: speed has private access in Car
    }
}`;

  const interviewQuestions = [
    {
      q: "1. What is Encapsulation and its use in Java?",
      a: "Encapsulation is the mechanism of binding data (variables) and methods into a single class while restricting direct external access using private fields. Its primary uses are Data Hiding, Controlled Access via Getters/Setters, Validation, and Code Maintainability."
    },
    {
      q: "2. What is Data Hiding?",
      a: "Data Hiding is the practice of declaring internal fields as 'private' so that outside classes cannot view or alter them directly. It prevents accidental state corruption and guarantees that access occurs strictly through authorized method checkpoints."
    },
    {
      q: "3. What is the difference between Abstraction and Encapsulation?",
      a: "Abstraction focuses on 'WHAT' a class does by hiding implementation details (using abstract classes and interfaces). Encapsulation focuses on 'HOW' data is protected and bundled together (using private variables and public getters/setters)."
    },
    {
      q: "4. What is a Tightly Encapsulated Class in Java?",
      a: "A class is called tightly encapsulated if every single instance variable inside it is explicitly declared as 'private', regardless of whether getters and setters are provided."
    }
  ];

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Data Hiding & Security Theater</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Encapsulation in Java
          </h3>
        </div>

        {/* Master Tab Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'vault'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Bank Vault Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Simple vs Proper Encapsulation</span>
          </button>

          <button
            onClick={() => setActiveTab('capsule')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'capsule'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Capsule & Car Analogy</span>
          </button>

          <button
            onClick={() => setActiveTab('interview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'interview'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interview QA</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: BANK VAULT & SECURITY SIMULATOR                                */}
      {/* ===================================================================== */}
      {activeTab === 'vault' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Interactive Bank Account Encapsulation Vault</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Test how <strong>Data Hiding (private fields)</strong> and <strong>Public Method Validation</strong> safeguard internal state. Try legitimate operations through public methods or attempt an illegal direct field hack!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left: Interactive Controls (6 cols) */}
            <div className="md:col-span-6 space-y-3 font-mono text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Caller Operations:
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleDeposit(2000)}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500 text-emerald-300 font-bold transition text-left space-y-0.5"
                >
                  <span className="block text-[11px]">deposit(2000)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Valid Deposit</span>
                </button>

                <button
                  onClick={() => handleDeposit(-500)}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500 text-rose-300 font-bold transition text-left space-y-0.5"
                >
                  <span className="block text-[11px]">deposit(-500)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Invalid Negative</span>
                </button>

                <button
                  onClick={() => handleWithdraw(1500)}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500 text-emerald-300 font-bold transition text-left space-y-0.5"
                >
                  <span className="block text-[11px]">withdraw(1500)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Valid Withdrawal</span>
                </button>

                <button
                  onClick={() => handleWithdraw(100000)}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500 text-rose-300 font-bold transition text-left space-y-0.5"
                >
                  <span className="block text-[11px]">withdraw(100000)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Exceeds Balance</span>
                </button>
              </div>

              {/* Direct Field Access Hack Button */}
              <button
                onClick={handleDirectHack}
                className="w-full p-3.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/60 text-rose-200 font-bold transition flex items-center justify-between shadow-lg shadow-rose-950/30"
              >
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Try Direct Field Hack: account.balance = -99999;</span>
                </span>
                <span className="text-[10px] bg-rose-900 px-2 py-0.5 rounded border border-rose-700">
                  Direct Field Access
                </span>
              </button>
            </div>

            {/* Right: Encapsulated Object Vault State (6 cols) */}
            <div className="md:col-span-6 p-5 rounded-2xl bg-[#060D1A] border border-cyan-500/40 space-y-4 shadow-inner font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  <span>Encapsulated BankAccount Object</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Protected in Heap
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>private String accountHolder:</span>
                  <strong className="text-white">"Deepak"</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>private double balance:</span>
                  <strong className="text-emerald-400 text-sm">₹{balance.toFixed(2)}</strong>
                </div>
              </div>

              {/* Security Shield Banner */}
              <div className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${
                lastAction.status === 'hack-blocked'
                  ? 'bg-rose-950/60 border-rose-500 text-rose-200 animate-pulse'
                  : lastAction.status === 'error'
                  ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                  : 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
              }`}>
                <strong className="block text-[11px] uppercase tracking-wider font-bold">
                  {lastAction.status === 'hack-blocked' ? '🛡️ Security Barrier Triggered' : 'Transaction Log'}
                </strong>
                <p className="leading-relaxed">{lastAction.text}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: SIMPLE VS PROPER ENCAPSULATION                                 */}
      {/* ===================================================================== */}
      {activeTab === 'compare' && (
        <div className="space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            
            {/* Simple Encapsulation */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs">
                <strong className="text-rose-400 block font-bold mb-0.5">1. Simple Encapsulation (Vulnerable)</strong>
                <span className="text-slate-300 text-[11px]">Data and methods are in one class, but variables are NOT private. Anyone can corrupt state directly!</span>
              </div>
              <UltraModernCodeViewer code={codeSimple} />
            </div>

            {/* Proper Encapsulation */}
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs">
                <strong className="text-emerald-400 block font-bold mb-0.5">2. Proper Encapsulation (Data Hiding)</strong>
                <span className="text-slate-300 text-[11px]">Variables are <code>private</code> and guarded by public getters/setters with validation logic.</span>
              </div>
              <UltraModernCodeViewer code={codeProper} />
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: CAPSULE & CAR ANALOGY                                         */}
      {/* ===================================================================== */}
      {activeTab === 'capsule' && (
        <div className="space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Medical Capsule */}
            <div className="p-6 rounded-2xl bg-[#060B16] border border-blue-500/40 space-y-3 shadow-inner">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Pill className="w-5 h-5" />
                <span>1. The Medical Capsule Analogy</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                In medicine, active therapeutic compounds (powder ingredients) are sealed inside a soluble gelatin capsule shell. The patient consumes the single unified capsule without spilling or contaminating the internal powders.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-blue-300">
                Gelatin Shell (Class) ──── encapsulates ────► Medicine Powders (Private Variables + Logic)
              </div>
            </div>

            {/* Automotive Vehicle */}
            <div className="p-6 rounded-2xl bg-[#060B16] border border-emerald-500/40 space-y-3 shadow-inner">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>2. The Automotive Protective Shell</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A car encases its engine block, transmission gearbox, wiring harnesses, and ECU inside a sealed chassis. The driver interacts only through safe pedals and steering controls, preventing accidental engine tampering while driving.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300">
                Car Chassis (Class) ──── encapsulates ────► Engine & Electronics (Private Internal State)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: INTERVIEW QUESTIONS                                            */}
      {/* ===================================================================== */}
      {activeTab === 'interview' && (
        <div className="space-y-4 relative z-10">
          
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Essential interview questions and answers on <strong>Encapsulation & Data Hiding</strong>:
          </div>

          <div className="space-y-3">
            {interviewQuestions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#060B16] border border-slate-800 space-y-2 hover:border-slate-700 transition"
              >
                <h4 className="text-xs sm:text-sm font-bold text-cyan-300">
                  {item.q}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
