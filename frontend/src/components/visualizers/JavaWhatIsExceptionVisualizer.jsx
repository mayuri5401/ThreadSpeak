import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle, ChevronRight, ChevronLeft, ArrowDown,
  FileText, Shield, AlertOctagon, CornerDownRight, CheckCircle, Info
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaWhatIsExceptionVisualizer
 * High-Yield Interactive Theater & Animation for "Exception in Java":
 * 1. Flow Disruption & Recovery Engine (Normal Flow vs Unhandled Crash vs Handled Graceful Flow)
 * 2. Checked vs Unchecked Exceptions Compiler & Runtime Simulator
 * 3. Throwable & Exception Class Hierarchy Interactive Blueprint
 * 4. 5 Exception Keywords Interactive Lab (try, catch, finally, throw, throws)
 * 5. Error vs Exception Deep Comparison & Architectural Breakdown
 */
export default function JavaWhatIsExceptionVisualizer() {
  const [activeTab, setActiveTab] = useState('flow-sim'); // 'flow-sim' | 'checked-unchecked' | 'hierarchy' | 'keywords' | 'error-vs-exception'

  // Tab 1: Flow Simulation States
  const [flowMode, setFlowMode] = useState('handled'); // 'normal' | 'unhandled' | 'handled'
  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1200);

  // Tab 2: Checked vs Unchecked States
  const [selectedExType, setSelectedExType] = useState('checked-io'); // 'checked-io' | 'checked-sql' | 'unchecked-arithmetic' | 'unchecked-null' | 'unchecked-array'
  const [hasHandler, setHasHandler] = useState(false);
  const [hasThrows, setHasThrows] = useState(false);

  // Tab 3: Hierarchy States
  const [selectedNode, setSelectedNode] = useState('Exception');

  // Tab 4: Keywords States
  const [selectedKeyword, setSelectedKeyword] = useState('try');

  // Auto-step flow animation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      const maxSteps = flowMode === 'normal' ? 3 : flowMode === 'unhandled' ? 2 : 4;
      timer = setTimeout(() => {
        if (simStep < maxSteps) {
          setSimStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, playbackSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, simStep, flowMode, playbackSpeed]);

  const handleModeChange = (mode) => {
    setFlowMode(mode);
    setSimStep(0);
    setIsPlaying(false);
  };

  // Flow scenario data
  const flowScenarios = {
    normal: {
      title: 'Scenario 1: Normal Execution (No Exception)',
      badge: 'Normal Flow',
      badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
      description: 'Instructions execute sequentially from top to bottom without interruption. The normal flow finishes with Exit Code 0.',
      steps: [
        { 
          num: 0, 
          label: 'Step 1: Program Start', 
          desc: 'main() thread begins execution. Prints "1. Program Started."',
          activeLine: 3,
          terminal: '1. Program Started.'
        },
        { 
          num: 1, 
          label: 'Step 2: Valid Operation', 
          desc: 'Computes int result = 10 / 2 (Valid math, result = 5). No anomaly occurs.',
          activeLine: 6,
          terminal: '1. Program Started.\n2. Result: 5'
        },
        { 
          num: 2, 
          label: 'Step 3: Program Finished', 
          desc: 'Reaches the final statement. Program completes with success!',
          activeLine: 8,
          terminal: '1. Program Started.\n2. Result: 5\n3. Program Finished Successfully.'
        }
      ],
      code: `public class NormalFlowDemo {
    public static void main(String[] args) {
        System.out.println("1. Program Started.");

        int a = 10;
        int b = 2;
        int result = a / b; // Valid division (result = 5)
        System.out.println("2. Result: " + result);

        System.out.println("3. Program Finished Successfully.");
    }
}`
    },
    unhandled: {
      title: 'Scenario 2: Unhandled Exception (Abrupt Flow Disruption)',
      badge: 'Abrupt Crash',
      badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
      description: 'An exception occurs at runtime (10 / 0). Since no catch block exists, the JVM halts execution immediately and prints a stack trace. Subsequent lines NEVER run!',
      steps: [
        { 
          num: 0, 
          label: 'Step 1: Program Start', 
          desc: 'main() thread begins execution normally.',
          activeLine: 3,
          terminal: '1. Program Started.'
        },
        { 
          num: 1, 
          label: 'Step 2: Anomaly Occurs (10 / 0)', 
          desc: 'JVM detects division by zero! Creates an ArithmeticException object and throws it.',
          activeLine: 6,
          terminal: '1. Program Started.\n⚠️ JVM Anomaly: Dividing integer by zero is mathematically illegal!'
        },
        { 
          num: 2, 
          label: '💥 Flow Terminated (Crash)', 
          desc: 'No catch block found in main(). Default JVM handler terminates thread. Step 3 & 4 are BLOCKED forever.',
          activeLine: 6,
          terminal: '1. Program Started.\nException in thread "main" java.lang.ArithmeticException: / by zero\n\tat UnhandledFlowDemo.main(UnhandledFlowDemo.java:6)'
        }
      ],
      code: `public class UnhandledFlowDemo {
    public static void main(String[] args) {
        System.out.println("1. Program Started.");

        int a = 10;
        int b = 0;
        int result = a / b; // 💥 ArithmeticException thrown!

        // ❌ The lines below are NEVER REACHED due to abrupt termination:
        System.out.println("2. Result: " + result);
        System.out.println("3. Program Finished.");
    }
}`
    },
    handled: {
      title: 'Scenario 3: Handled Exception (Graceful Recovery & Normal Flow)',
      badge: 'Graceful Recovery',
      badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
      description: 'When the exception occurs inside a try block, the corresponding catch block intercepts it. The finally block executes cleanup, and normal execution resumes smoothly to completion!',
      steps: [
        { 
          num: 0, 
          label: 'Step 1: Program Start', 
          desc: 'main() thread starts. Enters protected try block.',
          activeLine: 3,
          terminal: '1. Program Started.'
        },
        { 
          num: 1, 
          label: 'Step 2: Exception Thrown in try', 
          desc: 'int result = 10 / 0 throws ArithmeticException. JVM jumps immediately to matching catch block.',
          activeLine: 8,
          terminal: '1. Program Started.\n[JVM] ArithmeticException thrown inside try block -> looking for catch handler...'
        },
        { 
          num: 2, 
          label: 'Step 3: catch Block Handles Anomaly', 
          desc: 'catch(ArithmeticException e) captures exception object. Prints friendly diagnostic message instead of crashing.',
          activeLine: 10,
          terminal: '1. Program Started.\n⚠️ Handled Exception Safely: / by zero'
        },
        { 
          num: 3, 
          label: 'Step 4: finally Block Cleanup', 
          desc: 'finally block executes guaranteed cleanup code (closing files, releasing locks).',
          activeLine: 12,
          terminal: '1. Program Started.\n⚠️ Handled Exception Safely: / by zero\n🧹 Cleanup: finally block executed.'
        },
        { 
          num: 4, 
          label: 'Step 5: Normal Flow Resumed!', 
          desc: 'Normal instructions continue executing smoothly. Application stays alive and healthy!',
          activeLine: 15,
          terminal: '1. Program Started.\n⚠️ Handled Exception Safely: / by zero\n🧹 Cleanup: finally block executed.\n2. Normal flow continues...\n3. Program Finished Successfully.'
        }
      ],
      code: `public class HandledFlowDemo {
    public static void main(String[] args) {
        System.out.println("1. Program Started.");

        try {
            int a = 10;
            int b = 0;
            int result = a / b; // Throws ArithmeticException
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("⚠️ Handled Exception Safely: " + e.getMessage());
        } finally {
            System.out.println("🧹 Cleanup: finally block executed.");
        }

        // ✅ Normal flow is restored!
        System.out.println("2. Normal flow continues...");
        System.out.println("3. Program Finished Successfully.");
    }
}`
    }
  };

  const currentFlow = flowScenarios[flowMode];
  const activeStepData = currentFlow.steps[Math.min(simStep, currentFlow.steps.length - 1)];

  // Checked vs Unchecked Exception Catalog
  const exceptionCatalog = {
    'checked-io': {
      name: 'IOException',
      category: 'Checked Exception',
      checked: true,
      cause: 'Input/output operation fails (e.g., trying to read a missing or inaccessible file on disk).',
      syntax: 'FileReader fr = new FileReader("file.txt"); // May throw IOException',
      compilerCheck: 'Checked at compile time by javac.',
      mustHandle: 'Mandatory: Program won\'t compile without try-catch or throws.',
      sampleCodeWithout: `import java.io.FileReader;

public class IoDemo {
    public static void main(String[] args) {
        // ❌ COMPILE ERROR: Unreported exception IOException; must be caught or declared
        FileReader fr = new FileReader("abc.txt");
    }
}`,
      sampleCodeWithCatch: `import java.io.FileReader;
import java.io.IOException;

public class IoDemo {
    public static void main(String[] args) {
        try {
            FileReader fr = new FileReader("abc.txt");
            System.out.println("File opened successfully.");
        } catch (IOException e) {
            System.out.println("⚠️ File not found or read error: " + e.getMessage());
        }
    }
}`,
      sampleCodeWithThrows: `import java.io.FileReader;
import java.io.IOException;

public class IoDemo {
    // Declaring throws IOException delegates handling to the caller
    public static void main(String[] args) throws IOException {
        FileReader fr = new FileReader("abc.txt");
        System.out.println("File opened successfully.");
    }
}`
    },
    'checked-sql': {
      name: 'SQLException',
      category: 'Checked Exception',
      checked: true,
      cause: 'Database access failure, bad connection URL, or invalid SQL query syntax.',
      syntax: 'Connection con = DriverManager.getConnection(url, user, pass); // May throw SQLException',
      compilerCheck: 'Checked at compile time by javac.',
      mustHandle: 'Mandatory: Must be wrapped in try-catch or declared with throws.',
      sampleCodeWithout: `import java.sql.DriverManager;
import java.sql.Connection;

public class SqlDemo {
    public static void main(String[] args) {
        // ❌ COMPILE ERROR: Unreported exception SQLException
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost/db", "root", "pass");
    }
}`,
      sampleCodeWithCatch: `import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.SQLException;

public class SqlDemo {
    public static void main(String[] args) {
        try {
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost/db", "root", "pass");
            System.out.println("Database connected.");
        } catch (SQLException e) {
            System.out.println("⚠️ Database connection error: " + e.getMessage());
        }
    }
}`,
      sampleCodeWithThrows: `import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.SQLException;

public class SqlDemo {
    public static void main(String[] args) throws SQLException {
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost/db", "root", "pass");
        System.out.println("Database connected.");
    }
}`
    },
    'unchecked-arithmetic': {
      name: 'ArithmeticException',
      category: 'Unchecked Exception (RuntimeException)',
      checked: false,
      cause: 'Arithmetic errors such as dividing an integer by zero (e.g. 10 / 0).',
      syntax: 'int result = 10 / 0; // Throws ArithmeticException',
      compilerCheck: 'NOT checked at compile time. javac compiles cleanly.',
      mustHandle: 'Optional to compiler, but best practice to handle in code to prevent crashes.',
      sampleCodeWithout: `public class ArithmeticDemo {
    public static void main(String[] args) {
        // ✅ Compiles cleanly, but crashes at RUNTIME!
        int result = 10 / 0;
        System.out.println("Result: " + result);
    }
}`,
      sampleCodeWithCatch: `public class ArithmeticDemo {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("⚠️ Caught ArithmeticException: Cannot divide by zero!");
        }
    }
}`,
      sampleCodeWithThrows: `public class ArithmeticDemo {
    // throws ArithmeticException is optional for unchecked exceptions
    public static void main(String[] args) throws ArithmeticException {
        int result = 10 / 0;
        System.out.println("Result: " + result);
    }
}`
    },
    'unchecked-null': {
      name: 'NullPointerException',
      category: 'Unchecked Exception (RuntimeException)',
      checked: false,
      cause: 'Calling a method, accessing a field, or getting length on a null object reference.',
      syntax: 'String str = null; System.out.println(str.length()); // Throws NullPointerException',
      compilerCheck: 'NOT checked at compile time. Occurs dynamically at runtime.',
      mustHandle: 'Optional to compiler; prevented via null checks or try-catch.',
      sampleCodeWithout: `public class NullPointerDemo {
    public static void main(String[] args) {
        String str = null;
        // 💥 Throws java.lang.NullPointerException at runtime
        System.out.println(str.length());
    }
}`,
      sampleCodeWithCatch: `public class NullPointerDemo {
    public static void main(String[] args) {
        String str = null;
        try {
            System.out.println(str.length());
        } catch (NullPointerException e) {
            System.out.println("⚠️ Caught NullPointerException: Object reference is null!");
        }
    }
}`,
      sampleCodeWithThrows: `public class NullPointerDemo {
    public static void main(String[] args) throws NullPointerException {
        String str = null;
        System.out.println(str.length());
    }
}`
    },
    'unchecked-array': {
      name: 'ArrayIndexOutOfBoundsException',
      category: 'Unchecked Exception (RuntimeException)',
      checked: false,
      cause: 'Accessing an array element with an index less than 0 or greater than/equal to array.length.',
      syntax: 'int[] arr = {10, 20, 30}; System.out.println(arr[5]); // Throws ArrayIndexOutOfBoundsException',
      compilerCheck: 'NOT checked at compile time.',
      mustHandle: 'Optional to compiler; handle with bounds checking or try-catch.',
      sampleCodeWithout: `public class ArrayBoundsDemo {
    public static void main(String[] args) {
        int[] arr = { 10, 20, 30 };
        // 💥 Throws ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 3
        System.out.println(arr[5]);
    }
}`,
      sampleCodeWithCatch: `public class ArrayBoundsDemo {
    public static void main(String[] args) {
        int[] arr = { 10, 20, 30 };
        try {
            System.out.println(arr[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("⚠️ Caught Exception: Array index outside valid range [0.." + (arr.length - 1) + "]");
        }
    }
}`,
      sampleCodeWithThrows: `public class ArrayBoundsDemo {
    public static void main(String[] args) throws ArrayIndexOutOfBoundsException {
        int[] arr = { 10, 20, 30 };
        System.out.println(arr[5]);
    }
}`
    }
  };

  const currentEx = exceptionCatalog[selectedExType];
  const activeExCode = hasHandler 
    ? currentEx.sampleCodeWithCatch 
    : hasThrows 
    ? currentEx.sampleCodeWithThrows 
    : currentEx.sampleCodeWithout;

  // Keywords Lab Data
  const keywordsData = {
    try: {
      keyword: 'try',
      title: 'try block',
      subtitle: 'Encloses code that might throw an exception',
      color: 'border-blue-500 text-blue-400 bg-blue-950/60',
      badge: 'Anomaly Detector',
      purpose: 'The try block wraps statements that have the potential to produce runtime exceptions. When an exception occurs inside try, execution immediately jumps to a matching catch block.',
      syntax: `try {
    // Code that may throw an exception
    int result = 10 / 0;
}`,
      keyRule: 'A try block MUST be followed by at least one catch block or a finally block (or try-with-resources).'
    },
    catch: {
      keyword: 'catch',
      title: 'catch block',
      subtitle: 'The ONLY block that actually HANDLES the exception',
      color: 'border-emerald-500 text-emerald-400 bg-emerald-950/60',
      badge: 'Actual Exception Handler',
      purpose: 'The catch block intercepts and handles the exception thrown by its preceding try block. It receives the Exception object parameter (e.g., ArithmeticException e) and provides recovery logic.',
      syntax: `catch (ArithmeticException e) {
    // Handling logic: logger, fallback value, user alert
    System.out.println("Cannot divide by zero: " + e.getMessage());
}`,
      keyRule: 'Technically, ONLY the catch keyword is used to handle exceptions in Java. Other keywords (try, finally, throw, throws) provide complementary infrastructure.'
    },
    finally: {
      keyword: 'finally',
      title: 'finally block',
      subtitle: 'Guaranteed execution block for cleanup code',
      color: 'border-purple-500 text-purple-400 bg-purple-950/60',
      badge: 'Guaranteed Cleanup',
      purpose: 'The finally block ALWAYS executes whether an exception occurs or not, and whether it was caught or uncaught. Used to close critical resources (DB connections, files, network sockets).',
      syntax: `finally {
    // Cleanup code (always runs!)
    if (fileReader != null) {
        fileReader.close();
    }
}`,
      keyRule: 'Even if the try or catch block contains a return statement, the finally block still executes before the method returns!'
    },
    throw: {
      keyword: 'throw',
      title: 'throw keyword',
      subtitle: 'Used to explicitly throw an exception object in code',
      color: 'border-amber-500 text-amber-400 bg-amber-950/60',
      badge: 'Explicit Exception Trigger',
      purpose: 'The throw keyword is used by the programmer to explicitly throw an instance of Throwable (typically Exception or RuntimeException) when a business rule or validation fails.',
      syntax: `if (age < 18) {
    throw new IllegalArgumentException("User must be 18+ to register");
}`,
      keyRule: 'throw takes an exception INSTANCE (throw new Exception()), whereas throws takes class NAMES (throws IOException).'
    },
    throws: {
      keyword: 'throws',
      title: 'throws keyword',
      subtitle: 'Declares exceptions that a method signature might propagate',
      color: 'border-rose-500 text-rose-400 bg-rose-950/60',
      badge: 'Method Signature Declaration',
      purpose: 'The throws keyword is appended to a method signature to declare that the method may propagate one or more checked exceptions up the call stack to the calling method.',
      syntax: `public void loadConfig(String path) throws IOException, SQLException {
    FileReader fr = new FileReader(path);
    // Caller is now responsible for handling or declaring IOException
}`,
      keyRule: 'Mandatory for methods containing unhandled Checked Exceptions so callers are alerted at compile-time.'
    }
  };

  const currentKeyword = keywordsData[selectedKeyword];

  // Hierarchy Node Data
  const hierarchyNodes = {
    Object: {
      name: 'java.lang.Object',
      role: 'Root Superclass of the entire Java Class Hierarchy',
      type: 'Base Class',
      desc: 'The ultimate parent of every single class in Java. Provides basic methods like toString(), equals(), hashCode(), and getClass().',
      rule: 'Point to Remember: Object class is the parent class of all classes in Java.'
    },
    Throwable: {
      name: 'java.lang.Throwable',
      role: 'Direct Parent of all Errors and Exceptions',
      type: 'Checked Exception Base',
      desc: 'The superclass of all errors and exceptions in Java. Only instances of Throwable (or its subclasses) can be thrown by the JVM or via the throw keyword.',
      rule: 'Point to Remember: Throwable class is the parent class of Exception class in Java.'
    },
    Error: {
      name: 'java.lang.Error',
      role: 'Fatal JVM System-Level Failures',
      type: 'Unchecked System Failure',
      desc: 'Represents serious, catastrophic problems in the JVM environment that applications cannot handle or recover from (e.g. StackOverflowError, OutOfMemoryError).',
      rule: 'Errors are beyond the control of the programmer and cannot be handled in code.'
    },
    Exception: {
      name: 'java.lang.Exception',
      role: 'Recoverable Application-Level Anomalies',
      type: 'Checked Base Class',
      desc: 'The base class for conditions that reasonable applications might want to catch. Represents anomalies caused by program logic or external factors.',
      rule: 'Point to Remember: Exception class itself is a Checked Exception, because it is not a subclass of RuntimeException.'
    },
    CheckedExceptions: {
      name: 'Checked Exceptions (IOException, SQLException)',
      role: 'Compile-Time Verified Exceptions',
      type: 'Compile-Time Enforced',
      desc: 'Direct subclasses of Exception (excluding RuntimeException). The compiler enforces that these MUST be caught or declared using throws.',
      rule: 'Mandatory to handle with try-catch or declare with throws.'
    },
    RuntimeException: {
      name: 'java.lang.RuntimeException (Unchecked)',
      role: 'Runtime Programming Mistakes & Logic Flaws',
      type: 'Unchecked Exception Base',
      desc: 'Subclasses of Exception that occur during execution. Compiler does not verify them. Usually caused by programming bugs like null pointer, bad index, or divide by zero.',
      rule: 'Not compulsory to handle at compile-time, but best practice to handle or prevent in code.'
    },
    ArithmeticException: {
      name: 'java.lang.ArithmeticException',
      role: 'Unchecked Runtime Exception',
      type: 'RuntimeException subclass',
      desc: 'Thrown when an exceptional arithmetic condition has occurred (e.g., an integer divide by zero: 10 / 0).',
      rule: 'Syntax: int result = 10 / 0; // Throws ArithmeticException'
    },
    NullPointerException: {
      name: 'java.lang.NullPointerException',
      role: 'Unchecked Runtime Exception',
      type: 'RuntimeException subclass',
      desc: 'Thrown when an application attempts to use null in a case where an object is required (e.g., calling a method on null or getting length).',
      rule: 'Syntax: String str = null; str.length(); // Throws NullPointerException'
    },
    ArrayIndexOutOfBoundsException: {
      name: 'java.lang.ArrayIndexOutOfBoundsException',
      role: 'Unchecked Runtime Exception',
      type: 'RuntimeException subclass',
      desc: 'Thrown to indicate that an array has been accessed with an illegal index (negative or >= array.length).',
      rule: 'Syntax: int[] arr = {10, 20}; System.out.println(arr[5]); // Throws ArrayIndexOutOfBoundsException'
    }
  };

  const activeNodeInfo = hierarchyNodes[selectedNode] || hierarchyNodes['Exception'];

  return (
    <div className="rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Interactive Exception Architecture &amp; Animation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Exception in Java: Concepts, Types &amp; Flow Simulator
          </h3>
        </div>

        {/* Master Tab Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
          {[
            { id: 'flow-sim', label: '1. Flow & Disruption Simulator', icon: Play },
            { id: 'checked-unchecked', label: '2. Checked vs Unchecked Lab', icon: Zap },
            { id: 'hierarchy', label: '3. Throwable Hierarchy', icon: Layers },
            { id: 'keywords', label: '4. 5 Keywords Engine', icon: KeyIcon },
            { id: 'error-vs-exception', label: '5. Error vs Exception', icon: Shield }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: FLOW DISRUPTION & RECOVERY SIMULATOR (MAIN ANIMATION)          */}
      {/* ===================================================================== */}
      {activeTab === 'flow-sim' && (
        <div className="space-y-6 relative z-10">
          
          {/* Scenario Selector & Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
            
            {/* Scenario Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleModeChange('normal')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  flowMode === 'normal'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-900/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>1. Normal Sequential Flow</span>
              </button>

              <button
                onClick={() => handleModeChange('unhandled')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  flowMode === 'unhandled'
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-md shadow-rose-900/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                <span>2. Unhandled Crash (Disrupted Flow)</span>
              </button>

              <button
                onClick={() => handleModeChange('handled')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  flowMode === 'handled'
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-900/30'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>3. Handled with try-catch-finally</span>
              </button>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSimStep(prev => Math.max(0, prev - 1))}
                disabled={simStep === 0 || isPlaying}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs border border-slate-700 transition"
                title="Step Backward"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/30 transition flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Animate Flow'}</span>
              </button>

              <button
                onClick={() => setSimStep(prev => Math.min(currentFlow.steps.length - 1, prev + 1))}
                disabled={simStep >= currentFlow.steps.length - 1 || isPlaying}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs border border-slate-700 transition"
                title="Step Forward"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { setSimStep(0); setIsPlaying(false); }}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition"
                title="Reset Simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Flow Title & Description Banner */}
          <div className="p-4 rounded-2xl bg-[#060B16] border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{currentFlow.title}</span>
              </span>
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${currentFlow.badgeColor}`}>
                {currentFlow.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentFlow.description}
            </p>
          </div>

          {/* Visual Instruction Pipeline Animation Theater */}
          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/30 font-mono text-xs space-y-6 shadow-inner relative">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Zap className="w-4 h-4 animate-pulse" />
                <span>Live JVM Execution Pipeline &amp; Instruction Traversal</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Step {simStep + 1} of {currentFlow.steps.length}
              </span>
            </div>

            {/* Animated Flow Nodes Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
              {flowMode === 'normal' && (
                <>
                  <FlowNode 
                    index={0} 
                    currentStep={simStep} 
                    title="1. Start Program" 
                    subtitle='println("1. Started")' 
                    status={simStep >= 0 ? 'complete' : 'pending'} 
                  />
                  <FlowNode 
                    index={1} 
                    currentStep={simStep} 
                    title="2. Division (10 / 2)" 
                    subtitle="int result = 5 (Valid)" 
                    status={simStep >= 1 ? 'complete' : 'pending'} 
                  />
                  <FlowNode 
                    index={2} 
                    currentStep={simStep} 
                    title="3. Output Result" 
                    subtitle='println("Result: 5")' 
                    status={simStep >= 2 ? 'complete' : 'pending'} 
                  />
                  <FlowNode 
                    index={2} 
                    currentStep={simStep} 
                    title="4. Program End" 
                    subtitle="Exit Code 0 (Success)" 
                    status={simStep >= 2 ? 'complete' : 'pending'} 
                  />
                </>
              )}

              {flowMode === 'unhandled' && (
                <>
                  <FlowNode 
                    index={0} 
                    currentStep={simStep} 
                    title="1. Start Program" 
                    subtitle='println("1. Started")' 
                    status={simStep >= 0 ? 'complete' : 'pending'} 
                  />
                  <FlowNode 
                    index={1} 
                    currentStep={simStep} 
                    title="2. Division (10 / 0)" 
                    subtitle="💥 ArithmeticException!" 
                    status={simStep >= 1 ? 'error' : 'pending'} 
                    errorGlow={simStep >= 1}
                  />
                  <FlowNode 
                    index={2} 
                    currentStep={simStep} 
                    title="3. Normal Code [BLOCKED]" 
                    subtitle="❌ NEVER REACHED" 
                    status={simStep >= 2 ? 'blocked' : 'pending'} 
                  />
                  <FlowNode 
                    index={2} 
                    currentStep={simStep} 
                    title="4. JVM Crash [HALTED]" 
                    subtitle="Exit Code 1 (Abrupt Exit)" 
                    status={simStep >= 2 ? 'error' : 'pending'} 
                  />
                </>
              )}

              {flowMode === 'handled' && (
                <>
                  <FlowNode 
                    index={0} 
                    currentStep={simStep} 
                    title="1. try Block" 
                    subtitle="Enters protected zone" 
                    status={simStep >= 0 ? 'complete' : 'pending'} 
                  />
                  <FlowNode 
                    index={1} 
                    currentStep={simStep} 
                    title="2. Exception Thrown" 
                    subtitle="10 / 0 -> Exception object" 
                    status={simStep >= 1 ? 'warning' : 'pending'} 
                  />
                  <FlowNode 
                    index={2} 
                    currentStep={simStep} 
                    title="3. catch Intercept" 
                    subtitle="catch(ArithmeticException e)" 
                    status={simStep >= 2 ? 'complete' : 'pending'} 
                  />
                  <FlowNode 
                    index={3} 
                    currentStep={simStep} 
                    title="4. finally + Resume" 
                    subtitle="Cleanup & Normal finish" 
                    status={simStep >= 3 ? 'complete' : 'pending'} 
                  />
                </>
              )}
            </div>

            {/* Active Step Diagnostic Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800 shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-white text-xs block">
                  {activeStepData.label}
                </span>
                <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans">
                  {activeStepData.desc}
                </p>
              </div>
            </div>

            {/* Side-by-side Code and Live Terminal Output */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              
              {/* Code Panel */}
              <div className="xl:col-span-7 space-y-2 min-w-0">
                <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                  <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Java Program Execution</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Highlighted Line Active</span>
                </div>
                <UltraModernCodeViewer code={currentFlow.code} title={`${flowMode.toUpperCase()}_FLOW.java`} />
              </div>

              {/* Live Terminal Output */}
              <div className="xl:col-span-5 space-y-2 min-w-0">
                <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Console / JVM Terminal Output</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">stdout / stderr</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 min-h-[190px] whitespace-pre-wrap leading-relaxed shadow-inner">
                  {activeStepData.terminal}
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* COMPREHENSIVE EXPLANATION BELOW ANIMATION                         */}
          {/* ================================================================= */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <h4 className="text-base font-extrabold text-white flex items-center gap-2">
              <BookOpenIcon className="w-4 h-4 text-cyan-400" />
              <span>Deep Technical Explanation: What is an Exception &amp; Exception Handling</span>
            </h4>

            {/* 4 Pillars of Exception Handling Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl bg-[#060B16] border border-cyan-500/30 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block border-b border-slate-800 pb-1">
                  1. What is an Exception?
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  An <strong>Exception</strong> is an <strong>unwanted event that occurs during the execution of a program</strong> and disrupts the normal flow of instructions. Exceptions usually happen due to problems in the <strong>program logic</strong> (e.g., dividing by zero, missing file, null access).
                </p>
                <p className="text-[11.5px] text-slate-400">
                  Unlike Errors, exceptions are <strong>within the control of the programmer</strong> and can be handled in code.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#060B16] border border-emerald-500/30 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider block border-b border-slate-800 pb-1">
                  2. What is Exception Handling?
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Exception Handling</strong> is the mechanism to handle exceptions (or runtime errors) so that the <strong>normal flow of the program is not disrupted</strong>.
                </p>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-400">
                  <li><strong>Prevents program crashes</strong> and abrupt thread exits.</li>
                  <li><strong>Provides meaningful error messages</strong> to users.</li>
                  <li><strong>Separates normal logic</strong> from error-handling routines.</li>
                  <li><strong>Makes applications robust</strong>, resilient, and enterprise-grade.</li>
                </ul>
              </div>
            </div>

            {/* 3 Core Examples Reference Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <strong className="text-xs text-cyan-300 font-mono block">💻 Key Examples of Exceptions in Java:</strong>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                  <strong className="text-xs text-amber-300 font-mono block">1. IOException</strong>
                  <p className="text-[11px] text-slate-300">Occurs when an input/output operation fails.</p>
                  <code className="text-[10px] text-cyan-300 font-mono block bg-slate-900 p-1.5 rounded mt-1">
                    FileReader fr = new FileReader("file.txt");
                  </code>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                  <strong className="text-xs text-rose-300 font-mono block">2. ArithmeticException</strong>
                  <p className="text-[11px] text-slate-300">Occurs when dividing a number by zero.</p>
                  <code className="text-[10px] text-cyan-300 font-mono block bg-slate-900 p-1.5 rounded mt-1">
                    int result = 10 / 0;
                  </code>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                  <strong className="text-xs text-purple-300 font-mono block">3. NullPointerException</strong>
                  <p className="text-[11px] text-slate-300">Occurs when calling a method on a null object.</p>
                  <code className="text-[10px] text-cyan-300 font-mono block bg-slate-900 p-1.5 rounded mt-1">
                    String str = null; str.length();
                  </code>
                </div>
              </div>
            </div>

            {/* Points to Remember Box */}
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Points to Remember:</span>
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-amber-200/90 leading-relaxed">
                <li><strong>Technically, the <code>catch</code> keyword is used to handle exceptions in Java.</strong> Other keywords (<code>try</code>, <code>finally</code>, <code>throw</code>, <code>throws</code>) have different functionalities and do not directly handle exceptions.</li>
                <li><strong>It is compulsory to handle Checked Exceptions</strong> in Java (via <code>try-catch</code> or <code>throws</code>).</li>
                <li><strong>It is not compulsory to handle Unchecked Exceptions</strong>, but it is a <strong>best practice</strong> to handle both (Checked and Unchecked) for making applications more stable and user-friendly.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: CHECKED VS UNCHECKED EXCEPTIONS SIMULATOR                      */}
      {/* ===================================================================== */}
      {activeTab === 'checked-unchecked' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Two Types of Exceptions: Checked vs Unchecked Exceptions</span>
            </h4>
            <p className="text-xs text-slate-300">
              Interactive testbed: See how the <strong>Java Compiler (javac)</strong> enforces checked exceptions at compile time, while unchecked exceptions slip through to runtime.
            </p>
          </div>

          {/* Exception Selector Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'checked-io', name: 'IOException (Checked)', type: 'checked', color: 'border-blue-500/40 text-blue-300' },
              { id: 'checked-sql', name: 'SQLException (Checked)', type: 'checked', color: 'border-blue-500/40 text-blue-300' },
              { id: 'unchecked-arithmetic', name: 'ArithmeticException (Unchecked)', type: 'unchecked', color: 'border-amber-500/40 text-amber-300' },
              { id: 'unchecked-null', name: 'NullPointerException (Unchecked)', type: 'unchecked', color: 'border-purple-500/40 text-purple-300' },
              { id: 'unchecked-array', name: 'ArrayIndexOutOfBoundsException (Unchecked)', type: 'unchecked', color: 'border-rose-500/40 text-rose-300' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedExType(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                  selectedExType === item.id
                    ? 'bg-slate-800 border-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                }`}
              >
                <span className={item.color}>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Interactive Code Modifier Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#060B16] border border-cyan-500/30">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-mono font-bold">Apply Exception Handling:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => { setHasHandler(!hasHandler); if (!hasHandler) setHasThrows(false); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  hasHandler
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-900/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {hasHandler ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <X className="w-3.5 h-3.5 text-slate-500" />}
                <span>Wrap in try-catch</span>
              </button>

              <button
                onClick={() => { setHasThrows(!hasThrows); if (!hasThrows) setHasHandler(false); }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                  hasThrows
                    ? 'bg-purple-950/80 border-purple-500 text-purple-300 shadow-md shadow-purple-900/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {hasThrows ? <Check className="w-3.5 h-3.5 text-purple-400" /> : <X className="w-3.5 h-3.5 text-slate-500" />}
                <span>Declare throws in Signature</span>
              </button>
            </div>
          </div>

          {/* Code vs Compilation Status Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Code */}
            <div className="xl:col-span-7 space-y-2 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{currentEx.name} Demonstration</span>
                </span>
                <span>Java 21</span>
              </div>
              <UltraModernCodeViewer code={activeExCode} title={`${currentEx.name}.java`} />
            </div>

            {/* Compilation & Runtime Diagnostic Panel */}
            <div className="xl:col-span-5 p-6 rounded-2xl bg-[#060B16] border border-slate-800 space-y-4 shadow-inner">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                  currentEx.checked 
                    ? 'border-blue-500/40 text-blue-300 bg-blue-950/60' 
                    : 'border-amber-500/40 text-amber-300 bg-amber-950/60'
                }`}>
                  {currentEx.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {currentEx.checked ? 'Checked at Compile-Time' : 'Occurs at Runtime'}
                </span>
              </div>

              <h4 className="text-base font-bold text-white">
                {currentEx.name}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentEx.cause}
              </p>

              {/* Status Box */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Compiler (javac):</span>
                  {currentEx.checked ? (
                    hasHandler || hasThrows ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> COMPILES OK
                      </span>
                    ) : (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <X className="w-3.5 h-3.5" /> COMPILE ERROR
                      </span>
                    )
                  ) : (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> COMPILES OK (Unchecked)
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  {currentEx.checked ? (
                    hasHandler || hasThrows ? (
                      <span className="text-emerald-300">✅ Handled properly! javac compiler is satisfied.</span>
                    ) : (
                      <span className="text-rose-300">❌ javac error: unreported exception {currentEx.name}; must be caught or declared to be thrown.</span>
                    )
                  ) : (
                    <span className="text-amber-300">⚠️ Unchecked exception: Compiler does NOT verify at compile time. Triggers at runtime if logic fails!</span>
                  )}
                </div>
              </div>

              {/* Syntax callout */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-cyan-300 font-bold">Standard Syntax:</span>
                <code className="text-[11px] text-slate-300 font-mono block bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  {currentEx.syntax}
                </code>
              </div>
            </div>
          </div>

          {/* Detailed Theory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 space-y-2">
              <strong className="text-xs text-blue-300 font-mono block uppercase">1. Checked Exceptions (Compile-Time)</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Checked exceptions are those which are <strong>checked at compile time</strong>. The program <strong>won't compile</strong> unless they are handled with <code>try-catch</code> or declared using <code>throws</code>.
              </p>
              <p className="text-[11px] text-slate-400">
                <strong>Examples:</strong> <code>IOException</code>, <code>SQLException</code>, <code>ClassNotFoundException</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
              <strong className="text-xs text-amber-300 font-mono block uppercase">2. Unchecked Exceptions (Runtime)</strong>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unchecked exceptions are those which <strong>occur during runtime</strong> and are <strong>not checked by compiler</strong>. Usually caused by programming mistakes like invalid index, null access, or divide by zero.
              </p>
              <p className="text-[11px] text-slate-400">
                <strong>Examples:</strong> <code>ArithmeticException</code>, <code>NullPointerException</code>, <code>ArrayIndexOutOfBoundsException</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: THROWABLE & EXCEPTION CLASS HIERARCHY                          */}
      {/* ===================================================================== */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Exception Class Hierarchy Interactive Tree</span>
            </h4>
            <p className="text-xs text-slate-300">
              Click any node in the hierarchy to inspect its architectural purpose, parent class, and whether it is Checked or Unchecked.
            </p>
          </div>

          {/* Interactive Hierarchy Blueprint View */}
          <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/30 font-mono text-xs space-y-6 shadow-inner">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Throwable Inheritance Blueprint (Click Nodes to Inspect)</span>
              </span>
              <span className="text-[10px] text-slate-400">java.lang package</span>
            </div>

            {/* Clickable ASCII / Flow Visual Diagram */}
            <div className="space-y-4">
              
              {/* Level 0: Object */}
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedNode('Object')}
                  className={`px-5 py-2.5 rounded-2xl border font-bold text-xs transition shadow-lg ${
                    selectedNode === 'Object'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 scale-105 shadow-cyan-500/40'
                      : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-cyan-500'
                  }`}
                >
                  java.lang.Object (Parent of All Classes in Java)
                </button>
              </div>

              <div className="text-center text-slate-600">│</div>

              {/* Level 1: Throwable */}
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedNode('Throwable')}
                  className={`px-6 py-2.5 rounded-2xl border font-bold text-xs transition shadow-lg ${
                    selectedNode === 'Throwable'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 scale-105 shadow-cyan-500/40'
                      : 'bg-slate-900 border-slate-700 text-cyan-300 hover:border-cyan-500'
                  }`}
                >
                  java.lang.Throwable (Direct Parent of Exception &amp; Error)
                </button>
              </div>

              <div className="text-center text-slate-600">┌────────────────────────┴────────────────────────┐</div>

              {/* Level 2: Error vs Exception */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Branch: Error */}
                <div className="space-y-3 p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-center">
                  <button
                    onClick={() => setSelectedNode('Error')}
                    className={`w-full py-2.5 rounded-xl border font-bold text-xs transition ${
                      selectedNode === 'Error'
                        ? 'bg-rose-500 text-slate-950 border-rose-400 shadow-lg shadow-rose-500/30'
                        : 'bg-rose-950/60 border-rose-800 text-rose-300 hover:bg-rose-900/60'
                    }`}
                  >
                    java.lang.Error (Fatal System / JVM Level)
                  </button>
                  <p className="text-[11px] text-slate-400">Unrecoverable / System-Level</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center pt-1">
                    <span className="text-[10.5px] px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-rose-400 font-mono">
                      StackOverflowError
                    </span>
                    <span className="text-[10.5px] px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-rose-400 font-mono">
                      OutOfMemoryError
                    </span>
                  </div>
                </div>

                {/* Right Branch: Exception */}
                <div className="space-y-3 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center">
                  <button
                    onClick={() => setSelectedNode('Exception')}
                    className={`w-full py-2.5 rounded-xl border font-bold text-xs transition ${
                      selectedNode === 'Exception'
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/30'
                        : 'bg-emerald-950/60 border-emerald-800 text-emerald-300 hover:bg-emerald-900/60'
                    }`}
                  >
                    java.lang.Exception (Recoverable Application Anomalies)
                  </button>
                  <p className="text-[11px] text-slate-400">Inherits Throwable • Checked by Default</p>

                  <div className="grid grid-cols-2 gap-2 text-left pt-1">
                    
                    {/* Checked */}
                    <button
                      onClick={() => setSelectedNode('CheckedExceptions')}
                      className={`p-2.5 rounded-xl border text-xs transition ${
                        selectedNode === 'CheckedExceptions'
                          ? 'bg-blue-950 border-blue-400 text-blue-200'
                          : 'bg-slate-900 border-slate-800 text-blue-300 hover:bg-slate-850'
                      }`}
                    >
                      <strong className="block text-[11px]">Checked Exceptions</strong>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">IOException, SQLException</span>
                    </button>

                    {/* Unchecked */}
                    <button
                      onClick={() => setSelectedNode('RuntimeException')}
                      className={`p-2.5 rounded-xl border text-xs transition ${
                        selectedNode === 'RuntimeException'
                          ? 'bg-amber-950 border-amber-400 text-amber-200'
                          : 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-850'
                      }`}
                    >
                      <strong className="block text-[11px]">RuntimeException</strong>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Unchecked Exceptions</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* RuntimeException Subclasses */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <span className="text-[11px] font-mono text-slate-400 block">Subclasses of RuntimeException (Unchecked):</span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['ArithmeticException', 'NullPointerException', 'ArrayIndexOutOfBoundsException'].map(nodeKey => (
                    <button
                      key={nodeKey}
                      onClick={() => setSelectedNode(nodeKey)}
                      className={`px-3 py-1 rounded-xl text-xs font-mono border transition ${
                        selectedNode === nodeKey
                          ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                          : 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800'
                      }`}
                    >
                      {nodeKey}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Node Detail Drawer */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs font-mono">
                  Active Node: {activeNodeInfo.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {activeNodeInfo.type}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {activeNodeInfo.desc}
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11.5px] text-cyan-300 font-mono">
                {activeNodeInfo.rule}
              </div>
            </div>
          </div>

          {/* Points to Remember Banner */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <strong className="text-white block font-mono text-xs">🔑 Points to Remember (Exception Hierarchy):</strong>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 leading-relaxed">
              <li><strong className="text-cyan-300">Object class</strong> is the parent class of all classes in Java.</li>
              <li><strong className="text-cyan-300">Throwable class</strong> is the parent class of <code className="text-emerald-400">Exception</code> and <code className="text-rose-400">Error</code> class in Java.</li>
              <li><strong className="text-cyan-300">Exception class itself is a checked exception</strong>, because it is not a subclass of <code>RuntimeException</code>.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 4: 5 EXCEPTION KEYWORDS ENGINE                                    */}
      {/* ===================================================================== */}
      {activeTab === 'keywords' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <KeyIcon className="w-4 h-4 text-cyan-400" />
              <span>The 5 Keywords Used in Exception Handling</span>
            </h4>
            <p className="text-xs text-slate-300">
              Java provides 5 keywords: <strong>try</strong>, <strong>catch</strong>, <strong>finally</strong>, <strong>throw</strong>, and <strong>throws</strong>.
            </p>
          </div>

          {/* Keyword Selection Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {Object.keys(keywordsData).map(kKey => {
              const k = keywordsData[kKey];
              const isSel = selectedKeyword === kKey;
              return (
                <button
                  key={kKey}
                  onClick={() => setSelectedKeyword(kKey)}
                  className={`p-3 rounded-2xl border text-center transition ${
                    isSel
                      ? 'bg-slate-800 border-cyan-500 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  <strong className="font-mono text-sm block text-cyan-300">{k.keyword}</strong>
                  <span className="text-[10.5px] text-slate-400 block mt-0.5">{k.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Detailed Keyword View */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* Left: Purpose & Rules */}
            <div className="xl:col-span-6 p-6 rounded-2xl bg-[#060B16] border border-slate-800 space-y-4 shadow-inner">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${currentKeyword.color}`}>
                  {currentKeyword.badge}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Keyword Reference</span>
              </div>

              <h4 className="text-lg font-bold text-white">
                <code>{currentKeyword.keyword}</code> Keyword
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {currentKeyword.purpose}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                <span className="text-xs text-amber-300 font-mono font-bold block">Important Rule:</span>
                <p className="text-[11.5px] text-slate-300 leading-relaxed font-sans">
                  {currentKeyword.keyRule}
                </p>
              </div>
            </div>

            {/* Right: Code Syntax */}
            <div className="xl:col-span-6 space-y-2 min-w-0">
              <div className="flex items-center justify-between pb-1 text-xs text-slate-400 font-mono">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Syntax Pattern</span>
                </span>
                <span>Java</span>
              </div>
              <UltraModernCodeViewer code={currentKeyword.syntax} title={`${currentKeyword.keyword}_Syntax.java`} />
            </div>
          </div>

          {/* Points to remember for keywords */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <strong className="text-white block font-mono text-xs">🔑 Points to Remember:</strong>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 leading-relaxed">
              <li><strong className="text-emerald-400">Technically, the <code>catch</code> keyword is used to handle exceptions in Java.</strong> Other keywords (<code>try</code>, <code>finally</code>, <code>throw</code>, <code>throws</code>) have different functionalities and do not directly handle exceptions.</li>
              <li><code>try</code> is used to declare a guarded block where exceptions may arise.</li>
              <li><code>finally</code> always executes for cleanup code.</li>
              <li><code>throw</code> is used to explicitly throw an exception object.</li>
              <li><code>throws</code> is used in a method declaration to indicate that the method might throw exceptions.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 5: ERROR VS EXCEPTION COMPARISON MATRIX                           */}
      {/* ===================================================================== */}
      {activeTab === 'error-vs-exception' && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Difference between Error and Exception in Java</span>
            </h4>
            <p className="text-xs text-slate-300">
              Both inherit from <code>java.lang.Throwable</code>, but serve fundamentally different architectural roles.
            </p>
          </div>

          {/* Side by Side Battle Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Error Card */}
            <div className="p-6 rounded-2xl bg-[#060B16] border border-rose-500/40 space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-rose-500/20">
                <span className="text-rose-400 font-bold font-mono text-sm flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4 text-rose-400" />
                  <span>⚠️ Error in Java</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                  Unchecked System Failure
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Represents <strong>serious problems in the JVM</strong> that cannot be handled by the program. Caused by resource depletion or hardware faults.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                  <strong className="text-white block mb-0.5">Origin:</strong>
                  <span className="text-slate-400 text-[11.5px]">Environment / JVM resource exhaustion (Stack full, Heap full).</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                  <strong className="text-white block mb-0.5">Handling:</strong>
                  <span className="text-rose-300 text-[11.5px]">Cannot be caught or handled in program code.</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                  <strong className="text-white block mb-0.5">Key Examples:</strong>
                  <span className="text-slate-400 text-[11.5px] font-mono">StackOverflowError, OutOfMemoryError, VirtualMachineError</span>
                </div>
              </div>
            </div>

            {/* Exception Card */}
            <div className="p-6 rounded-2xl bg-[#060B16] border border-cyan-500/40 space-y-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
                <span className="text-cyan-400 font-bold font-mono text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>🛡️ Exception in Java</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Recoverable Application Anomaly
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Represents <strong>conditions that can be caught and handled</strong> by the program. Caused by flaws in application logic or bad inputs.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                  <strong className="text-white block mb-0.5">Origin:</strong>
                  <span className="text-slate-400 text-[11.5px]">Program logic errors, invalid input, missing resources, network glitches.</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                  <strong className="text-white block mb-0.5">Handling:</strong>
                  <span className="text-emerald-300 text-[11.5px]">Can be caught and gracefully recovered from via try-catch.</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                  <strong className="text-white block mb-0.5">Key Examples:</strong>
                  <span className="text-slate-400 text-[11.5px] font-mono">IOException, SQLException, ArithmeticException, NullPointerException</span>
                </div>
              </div>
            </div>
          </div>

          {/* Master Comparison Table */}
          <div className="p-6 rounded-2xl bg-[#060B16] border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 pr-4 font-bold">Feature</th>
                  <th className="pb-3 pr-4 font-bold text-rose-400">⚠️ Error</th>
                  <th className="pb-3 font-bold text-cyan-400">🛡️ Exception</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-slate-300">
                <tr>
                  <td className="py-2.5 font-bold text-white">Meaning</td>
                  <td className="py-2.5 text-rose-300">Represents serious problems in the JVM that cannot be handled.</td>
                  <td className="py-2.5 text-cyan-300">Represents conditions that can be caught and handled.</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">Control</td>
                  <td className="py-2.5">Beyond the control of the programmer.</td>
                  <td className="py-2.5">Within the control of the programmer.</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">Classification</td>
                  <td className="py-2.5">Always Unchecked.</td>
                  <td className="py-2.5">Checked (compile-time) and Unchecked (runtime).</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-white">Handling</td>
                  <td className="py-2.5 text-rose-400">Not possible to recover with try-catch.</td>
                  <td className="py-2.5 text-emerald-400">Handled gracefully using try-catch blocks.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Flow Node Component for Animation Pipeline
function FlowNode({ index, currentStep, title, subtitle, status, errorGlow }) {
  const isCurrent = currentStep === index;
  
  let bg = 'bg-slate-900/60 border-slate-800 text-slate-400';
  let badgeColor = 'bg-slate-800 text-slate-400';

  if (status === 'complete') {
    bg = 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200';
    badgeColor = 'bg-emerald-900 text-emerald-300';
  } else if (status === 'warning') {
    bg = 'bg-amber-950/40 border-amber-500/50 text-amber-200';
    badgeColor = 'bg-amber-900 text-amber-300';
  } else if (status === 'error') {
    bg = 'bg-rose-950/60 border-rose-500 text-rose-200';
    badgeColor = 'bg-rose-900 text-rose-300';
  } else if (status === 'blocked') {
    bg = 'bg-slate-950 border-slate-850 text-slate-600';
    badgeColor = 'bg-slate-900 text-slate-600';
  }

  return (
    <div 
      className={`p-3.5 rounded-2xl border transition-all duration-300 relative ${bg} ${
        isCurrent ? 'ring-2 ring-cyan-400 scale-[1.03] shadow-lg shadow-cyan-500/20' : ''
      } ${errorGlow ? 'animate-pulse' : ''}`}
    >
      <div className="flex items-center justify-between pb-1">
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${badgeColor}`}>
          Node {index + 1}
        </span>
        {isCurrent && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
      </div>
      <strong className="text-xs font-bold block text-white mt-1">{title}</strong>
      <p className="text-[10.5px] mt-0.5 opacity-80">{subtitle}</p>
    </div>
  );
}

function KeyIcon(props) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m21 2-2 2m-1.5 1.5L14 9l-2-2-4 4 2 2-6 6a2 2 0 0 0 2.83 2.83l6-6 2 2 4-4-2-2 3.5-3.5a2.12 2.12 0 0 0 0-3Z"/>
    </svg>
  );
}

function BookOpenIcon(props) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
}
