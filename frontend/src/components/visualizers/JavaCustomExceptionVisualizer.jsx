import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle, ChevronRight, ChevronLeft, ArrowDown,
  FileText, Shield, AlertOctagon, CornerDownRight, CheckCircle, Info,
  Sliders, Activity, Eye, BookOpen, Lightbulb, Lock, Unlock,
  Send, UserCheck, AlertCircle, ArrowUpCircle, Radio, Network,
  Layers2, GitFork, GitPullRequest, Laptop, FileSearch, Scale,
  Crosshair, Award, Swords, Landmark, CreditCard, DollarSign,
  PackageCheck, Wrench
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaCustomExceptionVisualizer
 * High-Yield Interactive Theater & Architecture Lab for:
 * "User-Defined Custom Exceptions in Java"
 */
export default function JavaCustomExceptionVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'blueprint' | 'checked-vs-unchecked' | 'builder-sandbox' | 'quiz'
  const [scenario, setScenario] = useState('user-bank-demo'); // 'user-bank-demo' | 'rich-metadata-demo' | 'unchecked-custom-demo' | 'exception-chaining'

  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1400);

  // Custom Exception Builder State
  const [builderExName, setBuilderExName] = useState('InsufficientFundsException');
  const [builderBaseClass, setBuilderBaseClass] = useState('Exception'); // 'Exception' | 'RuntimeException'
  const [includeErrorCode, setIncludeErrorCode] = useState(true);
  const [includeTimestamp, setIncludeTimestamp] = useState(true);
  const [includeShortfall, setIncludeShortfall] = useState(true);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});

  // Scenario Configurations
  const getActiveScenarioConfig = () => {
    switch (scenario) {
      case 'user-bank-demo':
        return {
          title: '🏦 Scenario 1: InsufficientBalanceException (User Banking Demo)',
          badge: 'Step 1: Create Custom Checked Exception -> Step 2: Throw if amount > balance -> Step 3: Handle in main()',
          badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
          code: `// Step 1: Create a user-defined exception
class InsufficientBalanceException extends Exception {
    // Constructor with custom message
    public InsufficientBalanceException(String message) {
        super(message);
    }
}

// Step 2: Use the custom exception in application
class BankAccount {
    private double balance;

    public BankAccount(double balance) {
        this.balance = balance;
    }

    // Withdraw method which may throw the user-defined exception
    public void withdraw(double amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException("Withdrawal failed: Insufficient balance!");
        } else {
            balance -= amount;
            System.out.println("Withdrawal successful. Remaining balance: " + balance);
        }
    }
}

public class MainApp {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(5000);

        try {
            account.withdraw(6000); // Trying to withdraw more than balance
        } catch (InsufficientBalanceException e) {
            System.out.println("Exception caught: " + e.getMessage());
        }

        try {
            account.withdraw(3000); // Valid withdrawal
        } catch (InsufficientBalanceException e) {
            System.out.println("Exception caught: " + e.getMessage());
        }
    }
}`,
          steps: [
            {
              stepNum: 0,
              line: 30,
              label: '1. 🚀 Initializing Bank Account ($5,000)',
              desc: '`MainApp.main()` instantiates `BankAccount account = new BankAccount(5000)`. Account balance is initialized to $5,000.00.',
              terminal: '',
              accountBalance: 5000,
              activePhase: 'INIT',
              exceptionObject: null,
              stack: ['MainApp.main()']
            },
            {
              stepNum: 1,
              line: 33,
              label: '2. 📞 Calling account.withdraw(6000)',
              desc: '`main()` enters the first try block and calls `account.withdraw(6000)`. Execution jumps into `BankAccount.withdraw()`.',
              terminal: '',
              accountBalance: 5000,
              activePhase: 'WITHDRAW_1_ENTER',
              exceptionObject: null,
              stack: ['MainApp.main() [Try Block 1]', 'BankAccount.withdraw(6000)']
            },
            {
              stepNum: 2,
              line: 20,
              label: '3. 💥 Condition amount > balance (6000 > 5000)',
              desc: 'Requested $6000 exceeds $5000 balance! `throw new InsufficientBalanceException("Withdrawal failed: Insufficient balance!")` instantiates our custom exception.',
              terminal: '',
              accountBalance: 5000,
              activePhase: 'THROW_CUSTOM',
              exceptionObject: {
                type: 'InsufficientBalanceException',
                base: 'java.lang.Exception (Checked)',
                message: 'Withdrawal failed: Insufficient balance!'
              },
              stack: ['MainApp.main() [Try Block 1]', 'BankAccount.withdraw(6000) [💥 THROW]']
            },
            {
              stepNum: 3,
              line: 34,
              label: '4. 🦺 Caller Catches InsufficientBalanceException',
              desc: '`main()` catch block intercepts our custom exception object and prints `e.getMessage()`. Account balance remains safely unchanged at $5000.',
              terminal: 'Exception caught: Withdrawal failed: Insufficient balance!',
              accountBalance: 5000,
              activePhase: 'CATCH_1',
              exceptionObject: {
                type: 'InsufficientBalanceException (Caught)',
                base: 'java.lang.Exception',
                message: 'Withdrawal failed: Insufficient balance!'
              },
              stack: ['MainApp.main() [🛡️ Catch Block 1]']
            },
            {
              stepNum: 4,
              line: 39,
              label: '5. 📞 Calling account.withdraw(3000)',
              desc: '`main()` enters the second try block and calls `account.withdraw(3000)`.',
              terminal: 'Exception caught: Withdrawal failed: Insufficient balance!',
              accountBalance: 5000,
              activePhase: 'WITHDRAW_2_ENTER',
              exceptionObject: null,
              stack: ['MainApp.main() [Try Block 2]', 'BankAccount.withdraw(3000)']
            },
            {
              stepNum: 5,
              line: 23,
              label: '6. ✅ Valid Withdrawal: Balance Reduced ($5000 - $3000 = $2000)',
              desc: 'Since $3000 <= $5000, no exception is thrown! Balance is updated: `balance -= 3000` ($2000.0) and success message printed.',
              terminal: 'Exception caught: Withdrawal failed: Insufficient balance!\nWithdrawal successful. Remaining balance: 2000.0',
              accountBalance: 2000,
              activePhase: 'SUCCESS_WITHDRAW',
              exceptionObject: null,
              stack: ['MainApp.main() [Terminating Cleanly]']
            }
          ]
        };

      case 'rich-metadata-demo':
        return {
          title: '💼 Scenario 2: Custom Exception with Domain Payload (Shortfall, AccountId, ErrorCode)',
          badge: 'Encapsulates typed domain attributes: getShortfall(), getErrorCode()',
          badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
          code: `class InsufficientFundsException extends RuntimeException {
    private final String accountId;
    private final double shortfall;
    private final String errorCode;

    public InsufficientFundsException(String accountId, double shortfall, String errorCode) {
        super(String.format("Account %s deficient by $%.2f", accountId, shortfall));
        this.accountId = accountId;
        this.shortfall = shortfall;
        this.errorCode = errorCode;
    }

    public double getShortfall() { return shortfall; }
    public String getErrorCode() { return errorCode; }
}

public class RichPayloadDemo {
    public static void main(String[] args) {
        try {
            double balance = 200.0, req = 500.0;
            if (req > balance) {
                throw new InsufficientFundsException("ACC-901", req - balance, "ERR_INSUFFICIENT_FUNDS");
            }
        } catch (InsufficientFundsException e) {
            System.out.println("Error Code: " + e.getErrorCode());
            System.out.println("Missing Amount: $" + e.getShortfall());
        }
    }
}`,
          steps: [
            {
              stepNum: 0,
              line: 18,
              label: '1. 🚀 Checking Balance vs Requested ($200 vs $500)',
              desc: 'Requested $500.00 exceeds $200.00 balance. Shortfall is calculated ($300.00).',
              terminal: '',
              accountBalance: 200,
              activePhase: 'CHECK',
              exceptionObject: null,
              stack: ['RichPayloadDemo.main()']
            },
            {
              stepNum: 1,
              line: 20,
              label: '2. 📦 Instantiating Custom Exception with Typed Payload',
              desc: 'Custom exception is created with `accountId: ACC-901`, `shortfall: 300.0`, and `errorCode: ERR_INSUFFICIENT_FUNDS`.',
              terminal: '',
              accountBalance: 200,
              activePhase: 'THROW_RICH',
              exceptionObject: {
                type: 'InsufficientFundsException',
                base: 'RuntimeException (Unchecked)',
                accountId: 'ACC-901',
                shortfall: '$300.00',
                errorCode: 'ERR_INSUFFICIENT_FUNDS'
              },
              stack: ['RichPayloadDemo.main() [💥 Throwing]']
            },
            {
              stepNum: 2,
              line: 23,
              label: '3. 🦺 Caller Extracts Strongly-Typed Attributes',
              desc: 'Caller intercepts exception and accesses typed getter methods `e.getErrorCode()` and `e.getShortfall()` without messy string parsing!',
              terminal: 'Error Code: ERR_INSUFFICIENT_FUNDS\nMissing Amount: $300.0',
              accountBalance: 200,
              activePhase: 'CATCH_RICH',
              exceptionObject: {
                type: 'InsufficientFundsException',
                base: 'RuntimeException',
                accountId: 'ACC-901',
                shortfall: '$300.00',
                errorCode: 'ERR_INSUFFICIENT_FUNDS'
              },
              stack: ['RichPayloadDemo.main() [🛡️ Handled Cleanly]']
            }
          ]
        };

      case 'unchecked-custom-demo':
        return {
          title: '⚡ Scenario 3: Unchecked Custom Exception (extends RuntimeException)',
          badge: 'Modern Spring Boot / Clean Architecture Standard (No method signature pollution)',
          badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
          code: `// Unchecked custom exception
class InvalidAgeException extends RuntimeException {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class VoterApp {
    // Notice: NO 'throws' keyword required in method signature!
    static void validateVoter(int age) {
        if (age < 18) {
            throw new InvalidAgeException("Voting eligibility rejected: Age " + age + " is below 18.");
        }
        System.out.println("Voter registered successfully.");
    }

    public static void main(String[] args) {
        try {
            validateVoter(15);
        } catch (InvalidAgeException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}`,
          steps: [
            {
              stepNum: 0,
              line: 16,
              label: '1. 🚀 Calling validateVoter(15)',
              desc: '`main()` invokes `validateVoter(15)`. Since `InvalidAgeException` extends `RuntimeException`, method signature has no `throws` clutter.',
              terminal: '',
              accountBalance: null,
              activePhase: 'INVOKE',
              exceptionObject: null,
              stack: ['VoterApp.main()']
            },
            {
              stepNum: 1,
              line: 10,
              label: '2. 💥 InvalidAgeException Fired',
              desc: '`age < 18` is true. `throw new InvalidAgeException(...)` triggers immediately.',
              terminal: '',
              accountBalance: null,
              activePhase: 'THROW_UNCHECKED',
              exceptionObject: {
                type: 'InvalidAgeException',
                base: 'java.lang.RuntimeException',
                message: 'Voting eligibility rejected: Age 15 is below 18.'
              },
              stack: ['VoterApp.main()', 'validateVoter(15) [💥 Throwing]']
            },
            {
              stepNum: 2,
              line: 18,
              label: '3. 🦺 Intercepted by Catch Block',
              desc: 'Caller catches `InvalidAgeException` and prints the descriptive business error.',
              terminal: 'Caught: Voting eligibility rejected: Age 15 is below 18.',
              accountBalance: null,
              activePhase: 'CATCH_UNCHECKED',
              exceptionObject: {
                type: 'InvalidAgeException (Handled)',
                base: 'RuntimeException',
                message: 'Voting eligibility rejected: Age 15 is below 18.'
              },
              stack: ['VoterApp.main() [🛡️ Handled]']
            }
          ]
        };

      default:
        return null;
    }
  };

  const currentConfig = getActiveScenarioConfig();
  const currentStep = currentConfig.steps[simStep] || currentConfig.steps[0];

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setSimStep((prev) => {
          if (prev < currentConfig.steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, currentConfig.steps.length]);

  const handleScenarioChange = (newScen) => {
    setScenario(newScen);
    setSimStep(0);
    setIsPlaying(false);
  };

  // Generate Custom Exception Code
  const generateCustomExceptionCode = () => {
    const isChecked = builderBaseClass === 'Exception';
    return `// ==========================================
// 🛠️ Generated Production Custom Exception
// ==========================================
public class ${builderExName} extends ${builderBaseClass} {
    private static final long serialVersionUID = 1L;
${includeErrorCode ? '    private final String errorCode;\n' : ''}${includeTimestamp ? '    private final long timestamp;\n' : ''}${includeShortfall ? '    private final double shortfall;\n' : ''}
    // 1. Standard Message Constructor
    public ${builderExName}(String message) {
        super(message);
${includeErrorCode ? '        this.errorCode = "ERR_BUSINESS_RULE";\n' : ''}${includeTimestamp ? '        this.timestamp = System.currentTimeMillis();\n' : ''}${includeShortfall ? '        this.shortfall = 0.0;\n' : ''}    }

    // 2. Full Parameterized Domain Constructor
    public ${builderExName}(String message${includeErrorCode ? ', String errorCode' : ''}${includeShortfall ? ', double shortfall' : ''}) {
        super(message);
${includeErrorCode ? '        this.errorCode = errorCode;\n' : ''}${includeTimestamp ? '        this.timestamp = System.currentTimeMillis();\n' : ''}${includeShortfall ? '        this.shortfall = shortfall;\n' : ''}    }

    // 3. Exception Chaining Constructor (Preserves Root Cause)
    public ${builderExName}(String message, Throwable cause) {
        super(message, cause);
${includeErrorCode ? '        this.errorCode = "ERR_INTERNAL_CAUSE";\n' : ''}${includeTimestamp ? '        this.timestamp = System.currentTimeMillis();\n' : ''}${includeShortfall ? '        this.shortfall = 0.0;\n' : ''}    }
${includeErrorCode ? '\n    public String getErrorCode() { return errorCode; }' : ''}${includeTimestamp ? '\n    public long getTimestamp() { return timestamp; }' : ''}${includeShortfall ? '\n    public double getShortfall() { return shortfall; }' : ''}
}`;
  };

  // Quiz Questions
  const quizData = [
    {
      id: 'q1',
      question: 'Which class should a user-defined custom exception extend to create a CHECKED exception vs an UNCHECKED exception?',
      options: [
        'Checked extends Exception; Unchecked extends RuntimeException.',
        'Checked extends Throwable; Unchecked extends Error.',
        'Checked extends RuntimeException; Unchecked extends Exception.',
        'Custom exceptions cannot be unchecked.'
      ],
      correctIndex: 0,
      explanation: 'Extending `java.lang.Exception` creates a Checked exception (enforced by compiler). Extending `java.lang.RuntimeException` creates an Unchecked exception.'
    },
    {
      id: 'q2',
      question: 'Why should a custom exception invoke super(message) in its constructor?',
      options: [
        'To prevent memory leaks in the JVM garbage collector.',
        'To pass the error message to the parent Throwable class so getMessage() and printStackTrace() work seamlessly.',
        'Because Java requires all constructors to call super(message) or it will not compile.',
        'To automatically print the message to the console.'
      ],
      correctIndex: 1,
      explanation: 'Calling `super(message)` initializes the message field in `java.lang.Throwable`, making `e.getMessage()` and stack traces meaningful.'
    },
    {
      id: 'q3',
      question: 'What is the main architectural benefit of creating custom exceptions over reusing generic built-in ones?',
      options: [
        'Custom exceptions run 10x faster than built-in exceptions.',
        'They represent domain-specific business errors clearly, carry strongly-typed metadata (like shortfall/accountId), and enable dedicated catch blocks.',
        'They do not require any memory allocation in the heap.',
        'They automatically fix corrupted database records.'
      ],
      correctIndex: 1,
      explanation: 'Custom exceptions provide explicit domain semantic clarity, carry rich typed attributes (like `shortfall`, `errorCode`), and allow specific catch handling.'
    },
    {
      id: 'q4',
      question: 'What is the purpose of defining `private static final long serialVersionUID` in a custom exception class?',
      options: [
        'It defines the number of times an exception can be thrown.',
        'It ensures version compatibility during object serialization (e.g. over network RPC or message queues).',
        'It specifies the HTTP status code for Spring Boot controllers.',
        'It forces the JVM to execute in 64-bit mode.'
      ],
      correctIndex: 1,
      explanation: 'Since `Throwable` implements `Serializable`, defining `serialVersionUID` prevents `InvalidClassException` during network serialization/deserialization.'
    }
  ];

  return (
    <div className="w-full bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden my-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 p-5 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Landmark className="w-3.5 h-3.5 text-emerald-400" /> Domain-Driven Design
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              User-Defined Exceptions
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-200 via-white to-cyan-200 bg-clip-text text-transparent flex items-center gap-2">
            🛠️ User-Defined Custom Exceptions Visualizer & Banking Lab
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Explore why built-in exceptions are not enough, how to build custom domain exceptions, and inspect real-time execution states.
          </p>
        </div>

        {onOpenPlayground && (
          <button
            onClick={() => onOpenPlayground(`class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String message) {
        super(message);
    }
}

class BankAccount {
    private double balance;

    public BankAccount(double balance) {
        this.balance = balance;
    }

    public void withdraw(double amount) throws InsufficientBalanceException {
        if (amount > balance) {
            throw new InsufficientBalanceException("Withdrawal failed: Insufficient balance!");
        } else {
            balance -= amount;
            System.out.println("Withdrawal successful. Remaining balance: " + balance);
        }
    }
}

public class MainApp {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(5000);

        try {
            account.withdraw(6000);
        } catch (InsufficientBalanceException e) {
            System.out.println("Exception caught: " + e.getMessage());
        }

        try {
            account.withdraw(3000);
        } catch (InsufficientBalanceException e) {
            System.out.println("Exception caught: " + e.getMessage());
        }
    }
}`)}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-medium rounded-xl text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" /> Open in Universal Playground
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 overflow-x-auto px-4 pt-2">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'simulator'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" /> 1. Banking Simulation Theater
        </button>

        <button
          onClick={() => setActiveTab('blueprint')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'blueprint'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers2 className="w-4 h-4" /> 2. 4-Constructor Pattern & Blueprint
        </button>

        <button
          onClick={() => setActiveTab('checked-vs-unchecked')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'checked-vs-unchecked'
              ? 'border-amber-400 text-amber-300 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" /> 3. Checked vs Unchecked Custom Ex
        </button>

        <button
          onClick={() => setActiveTab('builder-sandbox')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'builder-sandbox'
              ? 'border-purple-400 text-purple-300 bg-purple-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wrench className="w-4 h-4" /> 4. Custom Exception Code Generator
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'quiz'
              ? 'border-pink-400 text-pink-300 bg-pink-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> 5. Interview Mastery Quiz
        </button>
      </div>

      {/* TAB 1: BANKING SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="p-4 md:p-6 space-y-6">
          {/* Scenario Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Select Custom Exception Scenario:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'user-bank-demo', label: '1. User Banking Demo ($6000 vs $3000)', icon: Landmark, color: 'text-emerald-400' },
                { id: 'rich-metadata-demo', label: '2. Typed Domain Metadata', icon: PackageCheck, color: 'text-cyan-400' },
                { id: 'unchecked-custom-demo', label: '3. Unchecked (RuntimeException)', icon: Zap, color: 'text-purple-400' }
              ].map((item) => {
                const IconComp = item.icon;
                const isSelected = scenario === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScenarioChange(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <IconComp className={`w-4 h-4 ${isSelected ? item.color : 'text-slate-500'}`} />
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                {currentConfig.title}
              </h3>
              <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${currentConfig.badgeColor}`}>
                {currentConfig.badge}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSimStep(Math.max(0, simStep - 1))}
                disabled={simStep === 0}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                {isPlaying ? 'Pause' : 'Auto Play'}
              </button>

              <button
                onClick={() => setSimStep(Math.min(currentConfig.steps.length - 1, simStep + 1))}
                disabled={simStep === currentConfig.steps.length - 1}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1 cursor-pointer"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setSimStep(0);
                  setIsPlaying(false);
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 cursor-pointer"
                title="Reset Simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                <span>Speed:</span>
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-transparent text-emerald-400 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value={2000} className="bg-slate-900">0.7x (Slow)</option>
                  <option value={1400} className="bg-slate-900">1x (Normal)</option>
                  <option value={800} className="bg-slate-900">1.8x (Fast)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid Layout: Code (Left) vs State & Bank Balance (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Code Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono font-bold text-slate-300">Java Source Execution</span>
                  </div>
                  <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    <Activity className="w-3 h-3 animate-pulse" /> Line {currentStep.line}
                  </div>
                </div>

                <div className="p-2 bg-slate-950/90 font-mono text-xs overflow-x-auto">
                  <pre className="text-slate-300 leading-relaxed">
                    {currentConfig.code.split('\n').map((lineText, idx) => {
                      const lineNum = idx + 1;
                      const isHighlighted = lineNum === currentStep.line;
                      return (
                        <div
                          key={idx}
                          className={`flex items-center px-3 py-0.5 rounded transition-all ${
                            isHighlighted
                              ? 'bg-emerald-500/20 text-emerald-200 border-l-4 border-emerald-400 font-bold'
                              : 'hover:bg-slate-900/50'
                          }`}
                        >
                          <span className="w-8 text-slate-600 select-none text-right pr-3">{lineNum}</span>
                          <span className="whitespace-pre">{lineText}</span>
                        </div>
                      );
                    })}
                  </pre>
                </div>
              </div>

              {/* Step Explanatory Card */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded border border-emerald-500/30">
                    Step {currentStep.stepNum + 1} of {currentConfig.steps.length}
                  </span>
                  <h4 className="text-sm font-bold text-white">{currentStep.label}</h4>
                </div>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {currentStep.desc}
                </p>
              </div>
            </div>

            {/* Right Column: Account Balance, Custom Exception Inspector & Console (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Bank Account Live State Card */}
              {currentStep.accountBalance !== null && (
                <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 p-4 rounded-xl border border-emerald-500/30 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-emerald-400" /> Bank Account Instance
                    </span>
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      account (BankAccount@0x4f)
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-xs text-slate-400">Current Balance:</span>
                    <span className="text-2xl font-bold font-mono text-emerald-300">
                      ${currentStep.accountBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              )}

              {/* Custom Exception Object Inspector */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-lg">
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Bug className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Custom Exception Heap Object
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                    {currentStep.exceptionObject ? 'Active in Heap' : 'No Exception'}
                  </span>
                </div>

                {currentStep.exceptionObject ? (
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 space-y-1">
                      <div className="text-rose-300 font-bold font-mono text-xs flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-rose-400" /> {currentStep.exceptionObject.type}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Extends: <span className="text-amber-300">{currentStep.exceptionObject.base}</span>
                      </div>
                      {currentStep.exceptionObject.message && (
                        <div className="text-xs text-rose-200 mt-1 bg-black/40 p-1.5 rounded font-mono">
                          "{currentStep.exceptionObject.message}"
                        </div>
                      )}
                      {currentStep.exceptionObject.shortfall && (
                        <div className="text-xs text-amber-300 mt-1">
                          Shortfall: <b>{currentStep.exceptionObject.shortfall}</b>
                        </div>
                      )}
                      {currentStep.exceptionObject.errorCode && (
                        <div className="text-xs text-cyan-300">
                          Error Code: <b>{currentStep.exceptionObject.errorCode}</b>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-center text-xs text-slate-500 italic">
                    No custom exception instantiated at this step.
                  </div>
                )}
              </div>

              {/* Console Output */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-mono text-slate-300">Console Standard Output</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                </div>
                <div className="p-3 font-mono text-xs min-h-[90px] bg-black/40 text-emerald-400 space-y-1">
                  {currentStep.terminal ? (
                    currentStep.terminal.split('\n').map((tLine, tIdx) => (
                      <div
                        key={tIdx}
                        className={tLine.includes('Exception') ? 'text-amber-300 font-bold' : ''}
                      >
                        {tLine}
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-600 italic">// Waiting for output...</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 4-CONSTRUCTOR PATTERN & BLUEPRINT */}
      {activeTab === 'blueprint' && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/40 p-5 rounded-xl border border-cyan-500/30">
            <h3 className="text-base md:text-lg font-bold text-cyan-200 flex items-center gap-2 mb-2">
              <Layers2 className="w-5 h-5 text-cyan-400" />
              The Industry-Standard 4-Constructor Pattern
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When creating production-grade custom exceptions, standard Java libraries and frameworks (like Spring, Hibernate, Jackson) expect the 4 standard constructors for seamless message passing, logging, and root-cause chaining:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                1
              </div>
              <h4 className="text-sm font-bold text-white">Default No-Arg Constructor</h4>
              <p className="text-xs text-slate-400">
                Provides a sensible default error message if caller provides none.
              </p>
              <div className="p-2 bg-slate-950 rounded font-mono text-[11px] text-emerald-300">
                public InsufficientFundsException() &#123; super("Funds unavailable"); &#125;
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center border border-cyan-500/30">
                2
              </div>
              <h4 className="text-sm font-bold text-white">Custom Message Constructor</h4>
              <p className="text-xs text-slate-400">
                Accepts specific contextual runtime description and passes to <code>super(message)</code>.
              </p>
              <div className="p-2 bg-slate-950 rounded font-mono text-[11px] text-cyan-300">
                public InsufficientFundsException(String msg) &#123; super(msg); &#125;
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                3
              </div>
              <h4 className="text-sm font-bold text-white">Root-Cause Chaining Constructor</h4>
              <p className="text-xs text-slate-400">
                Wraps low-level exceptions (like <code>SQLException</code>) inside clean domain exceptions.
              </p>
              <div className="p-2 bg-slate-950 rounded font-mono text-[11px] text-amber-300">
                public InsufficientFundsException(Throwable cause) &#123; super(cause); &#125;
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
                4
              </div>
              <h4 className="text-sm font-bold text-white">Message + Root-Cause Constructor</h4>
              <p className="text-xs text-slate-400">
                Combines high-level domain explanation with complete low-level underlying stack trace.
              </p>
              <div className="p-2 bg-slate-950 rounded font-mono text-[11px] text-purple-300">
                public InsufficientFundsException(String msg, Throwable c) &#123; super(msg, c); &#125;
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHECKED VS UNCHECKED CUSTOM EXCEPTIONS */}
      {activeTab === 'checked-vs-unchecked' && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 p-5 rounded-xl border border-amber-500/30">
            <h3 className="text-base md:text-lg font-bold text-amber-200 flex items-center gap-2 mb-2">
              <Scale className="w-5 h-5 text-amber-400" />
              Checked vs Unchecked Custom Exceptions Guide
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              One of the most important architectural decisions in Java: Should your custom exception extend <code>Exception</code> or <code>RuntimeException</code>?
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              <thead className="bg-slate-900 text-slate-200 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3.5 w-1/4">Feature</th>
                  <th className="p-3.5 w-3/8 text-amber-300 bg-amber-950/20 border-r border-slate-800">Checked Custom Exception (extends Exception)</th>
                  <th className="p-3.5 w-3/8 text-emerald-300 bg-emerald-950/20">Unchecked Custom Exception (extends RuntimeException)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-sans">
                <tr className="bg-slate-950/60 hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-slate-300">Compiler Enforcement</td>
                  <td className="p-3.5 text-slate-300 border-r border-slate-800">
                    <b>Mandatory:</b> Callers MUST either catch via <code>try-catch</code> or declare in method header via <code>throws</code>.
                  </td>
                  <td className="p-3.5 text-slate-300">
                    <b>Optional:</b> Compiler does not force try-catch or throws clauses.
                  </td>
                </tr>

                <tr className="bg-slate-950/30 hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-slate-300">When to Choose</td>
                  <td className="p-3.5 text-slate-300 border-r border-slate-800">
                    When the client caller <b>can realistically recover programmatically</b> (e.g. re-prompt user for missing credentials).
                  </td>
                  <td className="p-3.5 text-slate-300">
                    <b>Recommended for 90%+ of modern enterprise business rules</b> (invalid arguments, state violations, fraud detection).
                  </td>
                </tr>

                <tr className="bg-slate-950/60 hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-slate-300">Impact on Codebase</td>
                  <td className="p-3.5 text-slate-300 border-r border-slate-800">
                    Can cause <b>signature pollution</b> across service layers.
                  </td>
                  <td className="p-3.5 text-slate-300">
                    Keeps interface signatures clean and decouples service logic.
                  </td>
                </tr>

                <tr className="bg-slate-950/30 hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-slate-300">Framework Integration</td>
                  <td className="p-3.5 text-slate-300 border-r border-slate-800">
                    Often requires manual boilerplate translation in controllers.
                  </td>
                  <td className="p-3.5 text-slate-300">
                    Pairs seamlessly with Spring Boot <code>@RestControllerAdvice</code> / <code>@ExceptionHandler</code>.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CODE GENERATOR SANDBOX */}
      {activeTab === 'builder-sandbox' && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 p-5 rounded-xl border border-purple-500/30">
            <h3 className="text-base md:text-lg font-bold text-purple-200 flex items-center gap-2 mb-2">
              <Wrench className="w-5 h-5 text-purple-400" />
              Interactive Custom Exception Generator
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Configure and instantly generate a production-grade custom exception class with serialVersionUID, constructor chaining, and domain metadata:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Controls (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  1. Exception Class Name:
                </label>
                <input
                  type="text"
                  value={builderExName}
                  onChange={(e) => setBuilderExName(e.target.value.trim() || 'CustomException')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs font-mono text-amber-300 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  2. Base Class Type:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBuilderBaseClass('Exception')}
                    className={`p-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      builderBaseClass === 'Exception'
                        ? 'border-amber-500 bg-amber-950/50 text-amber-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    Exception (Checked)
                  </button>
                  <button
                    onClick={() => setBuilderBaseClass('RuntimeException')}
                    className={`p-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      builderBaseClass === 'RuntimeException'
                        ? 'border-emerald-500 bg-emerald-950/50 text-emerald-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    RuntimeException (Unchecked)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  3. Include Domain Metadata Fields:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeErrorCode}
                      onChange={(e) => setIncludeErrorCode(e.target.checked)}
                      className="rounded accent-purple-500"
                    />
                    <span>String errorCode (e.g. "ERR_INSUFFICIENT_FUNDS")</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeShortfall}
                      onChange={(e) => setIncludeShortfall(e.target.checked)}
                      className="rounded accent-purple-500"
                    />
                    <span>double shortfall (missing monetary deficit)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-slate-950 rounded border border-slate-800 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeTimestamp}
                      onChange={(e) => setIncludeTimestamp(e.target.checked)}
                      className="rounded accent-purple-500"
                    />
                    <span>long timestamp (epoch event time)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Generated Code (7 cols) */}
            <div className="lg:col-span-7 space-y-2">
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-purple-300">
                    {builderExName}.java
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded">
                    Production Ready
                  </span>
                </div>
                <div className="p-3 bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto">
                  <pre>{generateCustomExceptionCode()}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: QUIZ */}
      {activeTab === 'quiz' && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-gradient-to-r from-pink-950/40 via-slate-900 to-emerald-950/40 p-5 rounded-xl border border-pink-500/30">
            <h3 className="text-base md:text-lg font-bold text-pink-200 flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-pink-400" />
              Custom Exceptions Interview Mastery Quiz
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Test your knowledge on domain exceptions, constructor chaining, and inheritance:
            </p>
          </div>

          <div className="space-y-4">
            {quizData.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-0.5 bg-pink-500/20 text-pink-300 text-xs font-bold rounded border border-pink-500/30">
                      Q{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white">{q.question}</h4>
                  </div>

                  <div className="space-y-2 pt-2">
                    {q.options.map((opt, oIdx) => {
                      const isThisSelected = selectedOpt === oIdx;
                      let btnClass = 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700';

                      if (isAnswered) {
                        if (oIdx === q.correctIndex) {
                          btnClass = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold';
                        } else if (isThisSelected) {
                          btnClass = 'border-rose-500 bg-rose-950/60 text-rose-200 line-through';
                        } else {
                          btnClass = 'border-slate-800 bg-slate-950/40 text-slate-600 opacity-50';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswered}
                          onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: oIdx })}
                          className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && oIdx === q.correctIndex && (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {isAnswered && isThisSelected && oIdx !== q.correctIndex && (
                            <X className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`p-3 rounded-lg text-xs leading-relaxed mt-2 ${
                      isCorrect ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-200' : 'bg-amber-950/40 border border-amber-500/40 text-amber-200'
                    }`}>
                      <b>{isCorrect ? '🎉 Correct!' : '💡 Explanation:'}</b> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
