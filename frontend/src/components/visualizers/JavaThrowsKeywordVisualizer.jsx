import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle, ChevronRight, ChevronLeft, ArrowDown,
  FileText, Shield, AlertOctagon, CornerDownRight, CheckCircle, Info,
  Sliders, Activity, Eye, BookOpen, Lightbulb, Lock, Unlock,
  Send, UserCheck, AlertCircle, ArrowUpCircle, Radio, Network,
  Layers2, GitFork, GitPullRequest, Laptop, FileSearch
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaThrowsKeywordVisualizer
 * High-Yield Interactive Theater & Visualizer for:
 * ""throws" Keyword in Java Exception Handling"
 */
export default function JavaThrowsKeywordVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'animation-explainer' | 'overriding-lab' | 'throw-vs-throws' | 'quiz'
  const [scenario, setScenario] = useState('user-demo-missing-file'); // 'user-demo-missing-file' | 'user-demo-file-found' | 'multi-tier-propagation' | 'multi-exceptions' | 'main-throws-crash'

  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1400);

  // Method Overriding Lab State
  const [parentThrows, setParentThrows] = useState('IOException');
  const [childThrows, setChildThrows] = useState('IOException');

  // Interactive Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState({});

  // Scenario Data Configurations
  const getActiveScenarioConfig = () => {
    switch (scenario) {
      case 'user-demo-missing-file':
        return {
          title: '🟡 Scenario 1: ThrowsDemo - Missing File (FileNotFoundException Propagated to Caller)',
          badge: 'readFile() throws IOException -> Handled by try-catch in main()',
          badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
          code: `import java.io.FileInputStream;
import java.io.IOException;

public class ThrowsDemo {
    // Method declares that it may throw IOException
    void readFile() throws IOException {
        // Using try-with-resources ensures FileInputStream is closed automatically
        try (FileInputStream fis = new FileInputStream("test.txt")) {
            // Read first byte from the file
            int data = fis.read();
            System.out.println("First byte of the file: " + data);
        }
    }

    public static void main(String[] args) {
        try {
            ThrowsDemo obj = new ThrowsDemo();

            // Caller method handles the IOException thrown by readFile()
            obj.readFile();
        } catch (IOException e) {
            // Exception is caught and handled here
            System.out.println("Exception handled: " + e);
        }
    }
}`,
          steps: [
            {
              stepNum: 0,
              line: 16,
              label: '1. 🚀 Program Entry in main()',
              desc: 'JVM starts execution in `main()`. Execution enters the `try` block and instantiates `ThrowsDemo obj = new ThrowsDemo()`.',
              terminal: '',
              activeBlock: 'MAIN_ENTRY',
              stack: [
                { name: 'main()', status: 'ACTIVE', color: 'border-blue-500 bg-blue-950/50 text-blue-300' }
              ],
              fileState: { name: 'test.txt', exists: false, status: 'Not Found on Disk' },
              state: { obj: 'ThrowsDemo@0x1a', exception: null, callLevel: 'main()' }
            },
            {
              stepNum: 1,
              line: 20,
              label: '2. 📞 main() calls obj.readFile()',
              desc: 'The caller `main()` executes `obj.readFile()`. A new stack frame for `readFile()` is pushed onto the call stack.',
              terminal: '',
              activeBlock: 'CALL_READ_FILE',
              stack: [
                { name: 'main()', status: 'WAITING (Try Block)', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'ThrowsDemo.readFile() [throws IOException]', status: 'EXECUTING', color: 'border-cyan-500 bg-cyan-950/60 text-cyan-300' }
              ],
              fileState: { name: 'test.txt', exists: false, status: 'Checking Disk Storage' },
              state: { obj: 'ThrowsDemo@0x1a', exception: null, callLevel: 'readFile()' }
            },
            {
              stepNum: 2,
              line: 8,
              label: '3. 📦 Attempting to open FileInputStream',
              desc: 'Inside `readFile()`, `try (FileInputStream fis = new FileInputStream("test.txt"))` attempts to open `test.txt`. The file does not exist on disk!',
              terminal: '',
              activeBlock: 'FILE_STREAM_INIT',
              stack: [
                { name: 'main()', status: 'WAITING (Try Block)', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'ThrowsDemo.readFile() [throws IOException]', status: 'ATTEMPTING I/O', color: 'border-amber-500 bg-amber-950/60 text-amber-300' }
              ],
              fileState: { name: 'test.txt', exists: false, status: '❌ File Not Found Error' },
              state: { obj: 'ThrowsDemo@0x1a', exception: 'Instantiating FileNotFoundException', callLevel: 'readFile()' }
            },
            {
              stepNum: 3,
              line: 6,
              label: '4. 💥 FileNotFoundException Instantiated & Ducked',
              desc: '`FileInputStream` throws `FileNotFoundException`. Because `readFile()` has NO catch block for `IOException`, but has `throws IOException` in its signature, it ducks the exception and pops off the stack!',
              terminal: '',
              activeBlock: 'THROWS_PROPAGATION',
              stack: [
                { name: 'main()', status: 'RECEIVING EXCEPTION', color: 'border-amber-500 bg-amber-950/60 text-amber-300' },
                { name: 'ThrowsDemo.readFile() [💥 DUCKING & POPPING]', status: 'PROPAGATING UP', color: 'border-red-500 bg-red-950/60 text-red-300 animate-pulse' }
              ],
              fileState: { name: 'test.txt', exists: false, status: 'I/O Failure' },
              state: { obj: 'ThrowsDemo@0x1a', exception: 'java.io.FileNotFoundException: test.txt', callLevel: 'Stack Unwinding' }
            },
            {
              stepNum: 4,
              line: 21,
              label: '5. 🦺 Exception Caught by Caller catch (IOException e)',
              desc: 'Control unrolls back to `main()`. The `catch (IOException e)` matches `FileNotFoundException` (polymorphism: `FileNotFoundException extends IOException`).',
              terminal: 'Exception handled: java.io.FileNotFoundException: test.txt (The system cannot find the file specified)',
              activeBlock: 'MAIN_CATCH',
              stack: [
                { name: 'main() [🛡️ CATCH HANDLER]', status: 'HANDLED SAFELY', color: 'border-emerald-500 bg-emerald-950/60 text-emerald-300' }
              ],
              fileState: { name: 'test.txt', exists: false, status: 'Handled by main()' },
              state: { obj: 'ThrowsDemo@0x1a', exception: 'Caught & Handled Gracefully', callLevel: 'main()' }
            },
            {
              stepNum: 5,
              line: 25,
              label: '6. ✅ Program Finishes Gracefully',
              desc: 'Because the caller handled the propagated checked exception, the JVM does NOT crash and the program terminates successfully with exit code 0.',
              terminal: 'Exception handled: java.io.FileNotFoundException: test.txt (The system cannot find the file specified)',
              activeBlock: 'PROGRAM_FINISH',
              stack: [
                { name: 'main()', status: 'EXIT CODE 0 (SUCCESS)', color: 'border-emerald-500 bg-emerald-950/60 text-emerald-300' }
              ],
              fileState: { name: 'test.txt', exists: false, status: 'Completed' },
              state: { obj: 'ThrowsDemo@0x1a', exception: null, callLevel: 'Terminated Cleanly' }
            }
          ]
        };

      case 'user-demo-file-found':
        return {
          title: '🟢 Scenario 2: ThrowsDemo - File Exists (Normal Execution Flow)',
          badge: 'readFile() declares throws IOException -> File found -> Reads byte 72 -> No exception thrown',
          badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
          code: `import java.io.FileInputStream;
import java.io.IOException;

public class ThrowsDemo {
    // Method declares that it may throw IOException
    void readFile() throws IOException {
        // Using try-with-resources ensures FileInputStream is closed automatically
        try (FileInputStream fis = new FileInputStream("test.txt")) {
            // Read first byte from the file
            int data = fis.read();
            System.out.println("First byte of the file: " + data);
        }
    }

    public static void main(String[] args) {
        try {
            ThrowsDemo obj = new ThrowsDemo();

            // Caller method handles the IOException thrown by readFile()
            obj.readFile();
        } catch (IOException e) {
            // Exception is caught and handled here
            System.out.println("Exception handled: " + e);
        }
    }
}`,
          steps: [
            {
              stepNum: 0,
              line: 16,
              label: '1. 🚀 Program Entry in main()',
              desc: '`main()` enters try block and instantiates `ThrowsDemo obj = new ThrowsDemo()`.',
              terminal: '',
              activeBlock: 'MAIN_ENTRY',
              stack: [
                { name: 'main()', status: 'ACTIVE', color: 'border-blue-500 bg-blue-950/50 text-blue-300' }
              ],
              fileState: { name: 'test.txt', exists: true, status: 'File exists: "Hello World"' },
              state: { obj: 'ThrowsDemo@0x1a', data: null }
            },
            {
              stepNum: 1,
              line: 20,
              label: '2. 📞 Calling readFile()',
              desc: '`main()` invokes `obj.readFile()`. Method frame pushed onto the stack.',
              terminal: '',
              activeBlock: 'CALL_READ_FILE',
              stack: [
                { name: 'main()', status: 'WAITING', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'ThrowsDemo.readFile() [throws IOException]', status: 'RUNNING', color: 'border-cyan-500 bg-cyan-950/60 text-cyan-300' }
              ],
              fileState: { name: 'test.txt', exists: true, status: 'Opening Stream' },
              state: { obj: 'ThrowsDemo@0x1a', data: null }
            },
            {
              stepNum: 2,
              line: 8,
              label: '3. 📂 FileInputStream Opened Successfully',
              desc: '`test.txt` exists on disk! `FileInputStream fis` handle is established and registered in try-with-resources.',
              terminal: '',
              activeBlock: 'FILE_STREAM_INIT',
              stack: [
                { name: 'main()', status: 'WAITING', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'ThrowsDemo.readFile()', status: 'STREAM OPEN', color: 'border-emerald-500 bg-emerald-950/60 text-emerald-300' }
              ],
              fileState: { name: 'test.txt', exists: true, status: 'Stream Open (Byte 0: 72 "H")' },
              state: { obj: 'ThrowsDemo@0x1a', data: null }
            },
            {
              stepNum: 3,
              line: 11,
              label: '4. 📖 Reading First Byte & Printing',
              desc: '`fis.read()` reads the first byte (ASCII 72 for "H"). Prints "First byte of the file: 72".',
              terminal: 'First byte of the file: 72',
              activeBlock: 'READ_BYTE',
              stack: [
                { name: 'main()', status: 'WAITING', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'ThrowsDemo.readFile()', status: 'READ COMPLETED', color: 'border-emerald-500 bg-emerald-950/60 text-emerald-300' }
              ],
              fileState: { name: 'test.txt', exists: true, status: 'Read 1 byte successfully' },
              state: { obj: 'ThrowsDemo@0x1a', data: 72 }
            },
            {
              stepNum: 4,
              line: 13,
              label: '5. 🔒 Auto-Closing FileInputStream',
              desc: 'try-with-resources automatically invokes `fis.close()`. `readFile()` returns normally to `main()`.',
              terminal: 'First byte of the file: 72',
              activeBlock: 'STREAM_CLOSE',
              stack: [
                { name: 'main()', status: 'ACTIVE', color: 'border-blue-500 bg-blue-950/50 text-blue-300' }
              ],
              fileState: { name: 'test.txt', exists: true, status: 'Stream Closed Automatically' },
              state: { obj: 'ThrowsDemo@0x1a', data: 72 }
            },
            {
              stepNum: 5,
              line: 25,
              label: '6. 🎉 Clean Exit (Catch Block Skipped)',
              desc: 'Since no `IOException` occurred, the `catch` block in `main()` is skipped entirely. Program terminates successfully!',
              terminal: 'First byte of the file: 72',
              activeBlock: 'PROGRAM_FINISH',
              stack: [
                { name: 'main()', status: 'TERMINATED CLEANLY', color: 'border-emerald-500 bg-emerald-950/60 text-emerald-300' }
              ],
              fileState: { name: 'test.txt', exists: true, status: 'Done' },
              state: { obj: 'ThrowsDemo@0x1a', data: 72 }
            }
          ]
        };

      case 'multi-tier-propagation':
        return {
          title: '🔷 Scenario 3: 3-Tier Enterprise Propagation (DAO -> Service -> Controller)',
          badge: 'Unrolling 3 Stack Frames via throws SQLException',
          badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
          code: `import java.sql.SQLException;

class AccountDAO {
    void executeQuery() throws SQLException {
        System.out.println("  [DAO] Connecting to DB...");
        throw new SQLException("DB Connection Refused (Port 5432)");
    }
}

class AccountService {
    AccountDAO dao = new AccountDAO();
    void processTransfer() throws SQLException {
        System.out.println(" [Service] Initiating transfer...");
        dao.executeQuery(); // Ducks exception to Controller
    }
}

public class AccountController {
    public static void main(String[] args) {
        AccountService service = new AccountService();
        try {
            System.out.println("[Controller] Handling request...");
            service.processTransfer();
        } catch (SQLException e) {
            System.out.println("🛡️ [Controller] Caught DB error: " + e.getMessage());
            System.out.println("📱 [HTTP 503] Returning Service Unavailable JSON");
        }
    }
}`,
          steps: [
            {
              stepNum: 0,
              line: 18,
              label: '1. 🌐 Controller Initiates Request',
              desc: '`AccountController.main()` enters try block and invokes `service.processTransfer()`.',
              terminal: '[Controller] Handling request...',
              activeBlock: 'TIER_CONTROLLER',
              stack: [
                { name: 'AccountController.main()', status: 'WAITING (Try Block)', color: 'border-blue-500 bg-blue-950/50 text-blue-300' }
              ],
              state: { tier: 'Controller', exception: null }
            },
            {
              stepNum: 1,
              line: 13,
              label: '2. ⚙️ Service Delegates to DAO',
              desc: '`AccountService.processTransfer()` executes. It calls `dao.executeQuery()`. Service declares `throws SQLException` to pass responsibility.',
              terminal: '[Controller] Handling request...\n [Service] Initiating transfer...',
              activeBlock: 'TIER_SERVICE',
              stack: [
                { name: 'AccountController.main()', status: 'WAITING (Try Block)', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'AccountService.processTransfer() [throws SQLException]', status: 'WAITING', color: 'border-cyan-500 bg-cyan-950/60 text-cyan-300' }
              ],
              state: { tier: 'Service Layer', exception: null }
            },
            {
              stepNum: 2,
              line: 6,
              label: '3. 🔌 DAO Throws SQLException',
              desc: '`AccountDAO.executeQuery()` fails to connect to database and executes `throw new SQLException(...)`.',
              terminal: '[Controller] Handling request...\n [Service] Initiating transfer...\n  [DAO] Connecting to DB...',
              activeBlock: 'TIER_DAO_THROW',
              stack: [
                { name: 'AccountController.main()', status: 'WAITING (Try Block)', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'AccountService.processTransfer() [throws SQLException]', status: 'WAITING', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'AccountDAO.executeQuery() [💥 THROWS]', status: 'THROWING SQLException', color: 'border-red-500 bg-red-950/60 text-red-300 animate-pulse' }
              ],
              state: { tier: 'DAO Layer', exception: 'SQLException: DB Connection Refused' }
            },
            {
              stepNum: 3,
              line: 14,
              label: '4. 🔄 Ducking through Service Layer',
              desc: 'DAO stack frame is popped. `AccountService` does NOT catch `SQLException`; its `throws` clause passes the exception further up to Controller.',
              terminal: '[Controller] Handling request...\n [Service] Initiating transfer...\n  [DAO] Connecting to DB...',
              activeBlock: 'TIER_SERVICE_DUCK',
              stack: [
                { name: 'AccountController.main()', status: 'RECEIVING EXCEPTION', color: 'border-amber-500 bg-amber-950/60 text-amber-300' },
                { name: 'AccountService.processTransfer() [💥 DUCKING]', status: 'PROPAGATING UP', color: 'border-amber-500 bg-amber-950/60 text-amber-300' }
              ],
              state: { tier: 'Propagating Stack', exception: 'SQLException: DB Connection Refused' }
            },
            {
              stepNum: 4,
              line: 23,
              label: '5. 🛡️ Controller Catches & Recovers',
              desc: '`AccountController` catch block catches `SQLException e`, logs the issue, and returns HTTP 503 response without crashing.',
              terminal: '[Controller] Handling request...\n [Service] Initiating transfer...\n  [DAO] Connecting to DB...\n🛡️ [Controller] Caught DB error: DB Connection Refused (Port 5432)\n📱 [HTTP 503] Returning Service Unavailable JSON',
              activeBlock: 'TIER_CONTROLLER_CATCH',
              stack: [
                { name: 'AccountController.main() [🛡️ CATCH HANDLER]', status: 'HANDLED SAFELY', color: 'border-emerald-500 bg-emerald-950/60 text-emerald-300' }
              ],
              state: { tier: 'Controller Layer', exception: 'Handled & Formatted to JSON' }
            }
          ]
        };

      case 'multi-exceptions':
        return {
          title: '🟣 Scenario 4: Multiple Checked Exceptions (throws IOException, SQLException)',
          badge: 'Declaring Multiple Exceptions Separated by Commas',
          badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-950/60',
          code: `import java.io.IOException;
import java.sql.SQLException;

public class MultiThrowsDemo {
    // Declares 2 distinct checked exceptions
    static void processPayload(int mode) throws IOException, SQLException {
        if (mode == 1) {
            throw new IOException("Payload file corrupted on disk");
        } else if (mode == 2) {
            throw new SQLException("SQL Syntax Error in INSERT statement");
        }
        System.out.println("Payload processed successfully.");
    }

    public static void main(String[] args) {
        try {
            processPayload(2); // Triggers SQLException
        } catch (IOException e) {
            System.out.println("I/O Handled: " + e.getMessage());
        } catch (SQLException e) {
            System.out.println("SQL Handled: " + e.getMessage());
        }
    }
}`,
          steps: [
            {
              stepNum: 0,
              line: 16,
              label: '1. 🚀 Calling processPayload(2)',
              desc: '`main()` enters try block and calls `processPayload(2)`.',
              terminal: '',
              activeBlock: 'MULTI_MAIN',
              stack: [
                { name: 'main()', status: 'WAITING (Try Block)', color: 'border-blue-500 bg-blue-950/50 text-blue-300' },
                { name: 'processPayload(2) [throws IOException, SQLException]', status: 'RUNNING', color: 'border-purple-500 bg-purple-950/60 text-purple-300' }
              ],
              state: { mode: 2, exception: null }
            },
            {
              stepNum: 1,
              line: 9,
              label: '2. 💥 Mode 2 Triggers SQLException',
              desc: '`mode == 2` branches to `throw new SQLException(...)`. The method declares this exception in its throws clause.',
              terminal: '',
              activeBlock: 'MULTI_THROW_SQL',
              stack: [
                { name: 'main()', status: 'WAITING', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'processPayload(2) [💥 THROWS SQLException]', status: 'PROPAGATING', color: 'border-red-500 bg-red-950/60 text-red-300 animate-pulse' }
              ],
              state: { mode: 2, exception: 'SQLException: SQL Syntax Error' }
            },
            {
              stepNum: 2,
              line: 20,
              label: '3. 🦺 Target Catch Block Activated',
              desc: 'Caller checks `catch (IOException e)` -> NO MATCH. Next checks `catch (SQLException e)` -> MATCH FOUND!',
              terminal: 'SQL Handled: SQL Syntax Error in INSERT statement',
              activeBlock: 'MULTI_CATCH_SQL',
              stack: [
                { name: 'main() [catch (SQLException e)]', status: 'HANDLED SAFELY', color: 'border-emerald-500 bg-emerald-950/60 text-emerald-300' }
              ],
              state: { mode: 2, exception: 'Handled by SQL catch handler' }
            }
          ]
        };

      case 'main-throws-crash':
        return {
          title: '🔴 Scenario 5: Unhandled throws in main() -> JVM Crash with Stack Trace',
          badge: 'Passing throws all the way to JVM -> Uncaught Exception Crash',
          badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
          code: `import java.io.FileInputStream;
import java.io.IOException;

public class UnhandledThrowsCrash {
    static void loadData() throws IOException {
        throw new IOException("Hard disk read error!");
    }

    // main ducks exception to JVM!
    public static void main(String[] args) throws IOException {
        System.out.println("App starting...");
        loadData(); // No try-catch around caller!
        System.out.println("App finished."); // Unreachable
    }
}`,
          steps: [
            {
              stepNum: 0,
              line: 11,
              label: '1. 🚀 main() starts with throws IOException',
              desc: '`main()` declares `throws IOException`. It prints "App starting...".',
              terminal: 'App starting...',
              activeBlock: 'CRASH_START',
              stack: [
                { name: 'JVM Runtime Engine', status: 'SUPERVISOR', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'main() [throws IOException]', status: 'RUNNING', color: 'border-rose-500 bg-rose-950/60 text-rose-300' }
              ],
              state: { stage: 'Starting', exception: null }
            },
            {
              stepNum: 1,
              line: 12,
              label: '2. 📞 main() calls loadData()',
              desc: '`main()` invokes `loadData()`. Method frame pushed.',
              terminal: 'App starting...',
              activeBlock: 'CRASH_CALL',
              stack: [
                { name: 'JVM Runtime Engine', status: 'SUPERVISOR', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'main() [throws IOException]', status: 'WAITING', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'loadData() [throws IOException]', status: 'RUNNING', color: 'border-rose-500 bg-rose-950/60 text-rose-300' }
              ],
              state: { stage: 'Calling loadData', exception: null }
            },
            {
              stepNum: 2,
              line: 6,
              label: '3. 💥 loadData() throws IOException',
              desc: '`loadData()` throws `IOException`. Frame is popped, exception propagated to `main()`.',
              terminal: 'App starting...',
              activeBlock: 'CRASH_THROW',
              stack: [
                { name: 'JVM Runtime Engine', status: 'SUPERVISOR', color: 'border-slate-600 bg-slate-900/60 text-slate-400' },
                { name: 'main() [throws IOException]', status: 'RECEIVING UNHANDLED ERROR', color: 'border-red-500 bg-red-950/60 text-red-300 animate-pulse' }
              ],
              state: { stage: 'Unwinding', exception: 'IOException: Hard disk read error!' }
            },
            {
              stepNum: 3,
              line: 10,
              label: '4. ☠️ main() Propagates to JVM -> Default Handler Crash',
              desc: '`main()` has NO try-catch and declared `throws IOException`. The exception reaches JVM Default Exception Handler! Program terminates abnormally (Exit Code 1).',
              terminal: 'App starting...\nException in thread "main" java.io.IOException: Hard disk read error!\n\tat UnhandledThrowsCrash.loadData(UnhandledThrowsCrash.java:6)\n\tat UnhandledThrowsCrash.main(UnhandledThrowsCrash.java:12)\nProcess finished with exit code 1',
              activeBlock: 'CRASH_JVM',
              stack: [
                { name: 'JVM Default Exception Handler [☠️ CRASH]', status: 'ABNORMAL TERMINATION', color: 'border-red-600 bg-red-950 text-red-200' }
              ],
              state: { stage: 'Crashed', exception: 'Fatal Uncaught Exception' }
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

  // Method Overriding Lab Evaluation
  const evaluateOverridingRule = () => {
    // Parent: IOException
    // Valid child: IOException, FileNotFoundException, None, RuntimeException (NullPointerException, ArithmeticException)
    // Invalid child: Exception, Throwable, SQLException, ClassNotFoundException
    if (parentThrows === 'IOException') {
      if (childThrows === 'IOException') {
        return {
          valid: true,
          status: '✅ VALID (Rule 2: Same Exception)',
          desc: 'Subclass method declares the exact same checked exception as parent.',
          color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
        };
      }
      if (childThrows === 'FileNotFoundException') {
        return {
          valid: true,
          status: '✅ VALID (Rule 2: Narrower Subclass)',
          desc: 'FileNotFoundException is a direct subclass of IOException. This obeys the Liskov Substitution Principle.',
          color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
        };
      }
      if (childThrows === 'None') {
        return {
          valid: true,
          status: '✅ VALID (Rule 2: No Exception Declared)',
          desc: 'A subclass can choose to handle all exceptions internally and declare NO checked exceptions.',
          color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
        };
      }
      if (childThrows === 'NullPointerException' || childThrows === 'ArithmeticException') {
        return {
          valid: true,
          status: '✅ VALID (Rule 3: Unchecked Exception)',
          desc: 'Unchecked exceptions (subclasses of RuntimeException) can be declared freely in overriding methods without restriction.',
          color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
        };
      }
      if (childThrows === 'Exception' || childThrows === 'Throwable') {
        return {
          valid: false,
          status: '❌ COMPILE ERROR! (Broader Superclass Exception)',
          desc: `overridden method does not throw java.lang.${childThrows}. Subclass cannot broaden checked exceptions (violates polymorphic caller contracts).`,
          color: 'border-rose-500/50 bg-rose-950/40 text-rose-300'
        };
      }
      if (childThrows === 'SQLException') {
        return {
          valid: false,
          status: '❌ COMPILE ERROR! (New / Unrelated Checked Exception)',
          desc: 'overridden method does not throw java.sql.SQLException. Subclass cannot declare new checked exceptions that parent callers do not anticipate.',
          color: 'border-rose-500/50 bg-rose-950/40 text-rose-300'
        };
      }
    } else if (parentThrows === 'None') {
      // Parent declares NO checked exception
      if (childThrows === 'None') {
        return {
          valid: true,
          status: '✅ VALID (Same - No Exception)',
          desc: 'Both parent and child declare no checked exceptions.',
          color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
        };
      }
      if (childThrows === 'NullPointerException' || childThrows === 'ArithmeticException') {
        return {
          valid: true,
          status: '✅ VALID (Unchecked Exception)',
          desc: 'Overriding method can declare unchecked exceptions even if parent declares none.',
          color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
        };
      }
      return {
        valid: false,
        status: `❌ COMPILE ERROR! (Rule 1: New Checked Exception "${childThrows}")`,
        desc: `When parent method declares NO checked exceptions, child method CANNOT declare any checked exception (${childThrows}).`,
        color: 'border-rose-500/50 bg-rose-950/40 text-rose-300'
      };
    }
    return { valid: true, status: '✅ VALID', desc: 'Valid declaration.', color: 'text-emerald-300' };
  };

  const overrideResult = evaluateOverridingRule();

  // Quiz Questions
  const quizData = [
    {
      id: 'q1',
      question: 'What is the primary purpose of the "throws" keyword in Java?',
      options: [
        'To explicitly throw an exception object right at the current line of code.',
        'To declare the checked exceptions that a method might throw, delegating the handling responsibility to the caller.',
        'To catch and suppress exceptions so the program never crashes.',
        'To automatically close I/O streams like FileInputStream.'
      ],
      correctIndex: 1,
      explanation: 'The `throws` keyword is used in a method signature to declare potential checked exceptions, informing caller methods that they must either catch or propagate them.'
    },
    {
      id: 'q2',
      question: 'Can a method declare multiple exceptions in its `throws` clause?',
      options: [
        'No, Java only allows exactly one exception per method.',
        'Yes, separated by commas (e.g. `throws IOException, SQLException`).',
        'Yes, but only using the pipe operator `|`.',
        'No, you must wrap them into a single CustomException first.'
      ],
      correctIndex: 1,
      explanation: 'Multiple exceptions can be declared in `throws` separated by commas: `void calculate() throws IOException, SQLException, ParseException`.'
    },
    {
      id: 'q3',
      question: 'If a parent class method declares `void readFile() throws IOException`, which child class overriding method will cause a COMPILE ERROR?',
      options: [
        'void readFile() throws FileNotFoundException { }',
        'void readFile() { }',
        'void readFile() throws Exception { }',
        'void readFile() throws IOException { }'
      ],
      correctIndex: 2,
      explanation: 'An overriding method cannot declare a broader checked superclass exception (`Exception` is a superclass of `IOException`). It can only declare the same exception, a narrower subclass (like `FileNotFoundException`), or none.'
    },
    {
      id: 'q4',
      question: 'What happens if `main()` declares `throws IOException` and an IOException actually occurs during execution?',
      options: [
        'The JVM suppresses the exception and prints exit code 0.',
        'The exception is propagated to the JVM Default Exception Handler, which prints the stack trace and terminates the program abnormally.',
        'The program re-executes main() automatically in a loop.',
        'A compile-time error occurs because main cannot have a throws clause.'
      ],
      correctIndex: 1,
      explanation: 'If `main()` ducks the exception with `throws`, the exception reaches the JVM Default Exception Handler, causing the thread to terminate and print the stack trace to System.err.'
    }
  ];

  return (
    <div className="w-full bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden my-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-cyan-950/80 p-5 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Java Exception Architecture
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Method Signature Contract
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-200 via-white to-cyan-200 bg-clip-text text-transparent flex items-center gap-2">
            📢 "throws" Keyword Visualizer & Propagation Theater
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Explore checked exception declarations, stack unrolling (ducking), caller contracts, and method overriding rules.
          </p>
        </div>

        {onOpenPlayground && (
          <button
            onClick={() => onOpenPlayground(`import java.io.FileInputStream;
import java.io.IOException;

public class ThrowsDemo {
    void readFile() throws IOException {
        try (FileInputStream fis = new FileInputStream("test.txt")) {
            int data = fis.read();
            System.out.println("First byte of the file: " + data);
        }
    }

    public static void main(String[] args) {
        try {
            ThrowsDemo obj = new ThrowsDemo();
            obj.readFile();
        } catch (IOException e) {
            System.out.println("Exception handled: " + e);
        }
    }
}`)}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-medium rounded-xl text-xs md:text-sm flex items-center gap-2 shadow-lg shadow-amber-600/20 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" /> Open in Universal Playground
          </button>
        )}
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 overflow-x-auto px-4 pt-2">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'simulator'
              ? 'border-amber-400 text-amber-300 bg-amber-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" /> 1. Interactive Propagation Theater
        </button>

        <button
          onClick={() => setActiveTab('animation-explainer')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'animation-explainer'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers2 className="w-4 h-4" /> 2. Animation & Flow Explainer
        </button>

        <button
          onClick={() => setActiveTab('overriding-lab')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'overriding-lab'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <GitFork className="w-4 h-4" /> 3. Method Overriding Lab
        </button>

        <button
          onClick={() => setActiveTab('throw-vs-throws')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'throw-vs-throws'
              ? 'border-purple-400 text-purple-300 bg-purple-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" /> 4. "throw" vs "throws" Arena
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2.5 text-xs md:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'quiz'
              ? 'border-pink-400 text-pink-300 bg-pink-950/30'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> 5. High-Yield Interview Quiz
        </button>
      </div>

      {/* TAB 1: INTERACTIVE SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="p-4 md:p-6 space-y-6">
          {/* Scenario Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Select Architecture & Execution Scenario:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
              {[
                { id: 'user-demo-missing-file', label: '1. ThrowsDemo (Missing File)', icon: FileSearch, color: 'text-amber-400' },
                { id: 'user-demo-file-found', label: '2. ThrowsDemo (File Exists)', icon: CheckCircle2, color: 'text-emerald-400' },
                { id: 'multi-tier-propagation', label: '3. 3-Tier Enterprise Stack', icon: Network, color: 'text-cyan-400' },
                { id: 'multi-exceptions', label: '4. Multiple Checked Ex', icon: Layers, color: 'text-purple-400' },
                { id: 'main-throws-crash', label: '5. Uncaught main() Crash', icon: Flame, color: 'text-rose-400' }
              ].map((item) => {
                const IconComp = item.icon;
                const isSelected = scenario === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScenarioChange(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-amber-500 shadow-md shadow-amber-500/10'
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

          {/* Scenario Headline & Playback Controls */}
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
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5 shadow-md shadow-amber-600/20 cursor-pointer"
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

              {/* Speed dropdown */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                <span>Speed:</span>
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-transparent text-amber-400 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value={2000} className="bg-slate-900">0.7x (Slow)</option>
                  <option value={1400} className="bg-slate-900">1x (Normal)</option>
                  <option value={800} className="bg-slate-900">1.8x (Fast)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Theater Grid: Left Code, Right Stack & Propagation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Code Viewer with Highlighted Line (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-slate-300">Java Source Code</span>
                  </div>
                  <div className="text-xs text-amber-400 font-mono flex items-center gap-1.5 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/30">
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
                              ? 'bg-amber-500/20 text-amber-200 border-l-4 border-amber-400 font-bold'
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
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs font-bold rounded border border-amber-500/30">
                    Step {currentStep.stepNum + 1} of {currentConfig.steps.length}
                  </span>
                  <h4 className="text-sm font-bold text-white">{currentStep.label}</h4>
                </div>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {currentStep.desc}
                </p>
              </div>
            </div>

            {/* Right Column: Dynamic Call Stack, File State & Console (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Dynamic Call Stack Visualizer */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 shadow-lg">
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      JVM Call Stack (Propagation Flow)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {currentStep.stack.length} Frame(s)
                  </span>
                </div>

                <div className="space-y-2">
                  {currentStep.stack.slice().reverse().map((frame, fIdx) => (
                    <div
                      key={fIdx}
                      className={`p-3 rounded-xl border transition-all ${frame.color} shadow-sm flex items-center justify-between`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-900/80 text-[10px] font-mono font-bold flex items-center justify-center border border-slate-700">
                          {currentStep.stack.length - fIdx}
                        </span>
                        <div>
                          <div className="text-xs font-bold font-mono">{frame.name}</div>
                          <div className="text-[10px] opacity-80">{frame.status}</div>
                        </div>
                      </div>
                      {fIdx === 0 && (
                        <span className="px-2 py-0.5 text-[10px] uppercase font-bold rounded bg-slate-900/90 border border-slate-700 text-amber-300">
                          Top of Stack
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {currentStep.activeBlock === 'THROWS_PROPAGATION' && (
                  <div className="mt-3 p-2.5 rounded-lg bg-amber-950/50 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2 animate-bounce">
                    <ArrowUpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><b>"throws" in action:</b> Exception ducked up the call stack to caller!</span>
                  </div>
                )}
              </div>

              {/* Disk / Resource / State Inspector */}
              {currentStep.fileState && (
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-800 text-xs font-bold text-slate-300">
                    <Database className="w-4 h-4 text-amber-400" />
                    <span>File System & Resource Status:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">Target File:</span>
                      <span className="font-mono text-slate-200 font-semibold">{currentStep.fileState.name}</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">Disk Status:</span>
                      <span className={`font-semibold ${currentStep.fileState.exists ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {currentStep.fileState.status}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Console Output Terminal */}
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
                        className={tLine.includes('Exception') || tLine.includes('at Unhandled') ? 'text-amber-300' : ''}
                      >
                        {tLine.startsWith('Exception in thread') ? (
                          <span className="text-rose-400">{tLine}</span>
                        ) : (
                          tLine
                        )}
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-600 italic">// No output yet. Running...</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANIMATION & FLOW EXPLAINER */}
      {activeTab === 'animation-explainer' && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-amber-950/40 p-5 rounded-xl border border-cyan-500/30">
            <h3 className="text-base md:text-lg font-bold text-cyan-200 flex items-center gap-2 mb-2">
              <Layers2 className="w-5 h-5 text-cyan-400" />
              How the "throws" Keyword Works Under the Hood
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              The <code>throws</code> keyword is fundamentally an <b>API contract</b> and a <b>compiler safety mechanism</b>. When a method writes <code>throws IOException</code>, it signals to Java: <i>"I might encounter an I/O error during execution, but I do not know how the UI or caller wants to handle it. So, I will duck and forward it to whoever called me."</i>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold">
                1
              </div>
              <h4 className="text-sm font-bold text-white">Declaration (Method Signature)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Placed after the parameter list. It tells the Java compiler that this method may produce the specified checked exceptions without catching them inside its own body.
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-amber-300">
                void readFile() throws IOException
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold">
                2
              </div>
              <h4 className="text-sm font-bold text-white">Stack Unrolling (Ducking)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                When an exception occurs, the JVM pops the current method frame off the Call Stack immediately and looks for a matching <code>catch</code> block in the caller method.
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-cyan-300">
                Stack: [main] &lt;-- [readFile (popped!)]
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold">
                3
              </div>
              <h4 className="text-sm font-bold text-white">Caller's Two Choices</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The caller method cannot ignore a declared checked exception. It must either:
                <br /><b>Option A:</b> Wrap call in <code>try-catch</code> (Handle).
                <br /><b>Option B:</b> Declare <code>throws</code> too (Pass the buck).
              </p>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-emerald-300">
                try &#123; obj.readFile(); &#125; catch (IOException e)
              </div>
            </div>
          </div>

          {/* Visual Step-by-Step Flow Chart */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Network className="w-4 h-4 text-amber-400" />
              Complete Lifecycle of a Propagated Exception
            </h4>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">Step 1</span>
                <div>
                  <b className="text-white">Caller Invocation:</b> <code>main()</code> invokes <code>readFile()</code>.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">Step 2</span>
                <div>
                  <b className="text-white">Error Incident:</b> <code>FileInputStream("test.txt")</code> fails because the file is missing on disk. JVM instantiates <code>FileNotFoundException</code>.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">Step 3</span>
                <div>
                  <b className="text-white">Ducking Execution:</b> <code>readFile()</code> has <code>throws IOException</code>. JVM halts execution of <code>readFile()</code> without running subsequent lines, popping its frame off the stack.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">Step 4</span>
                <div>
                  <b className="text-white">Caller Interception:</b> JVM looks into <code>main()</code>. Finds <code>catch (IOException e)</code>. Since <code>FileNotFoundException IS-A IOException</code>, the catch block catches it and prints the message.
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">Step 5</span>
                <div>
                  <b className="text-white">Normal Continuation:</b> The program continues executing lines after the catch block smoothly, avoiding any abnormal JVM crash!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: METHOD OVERRIDING LAB */}
      {activeTab === 'overriding-lab' && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 p-5 rounded-xl border border-emerald-500/30">
            <h3 className="text-base md:text-lg font-bold text-emerald-200 flex items-center gap-2 mb-2">
              <GitFork className="w-5 h-5 text-emerald-400" />
              Method Overriding Rules Lab for "throws"
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When a subclass overrides a parent method, Java enforces strict compiler rules regarding what checked exceptions can be declared. Use the interactive selectors below to test any combination!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Selectors */}
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  1. Select Parent Method Declaration:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'IOException', label: 'void read() throws IOException' },
                    { id: 'None', label: 'void read() [No throws]' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setParentThrows(p.id)}
                      className={`p-3 rounded-lg border text-left font-mono text-xs transition-all cursor-pointer ${
                        parentThrows === p.id
                          ? 'border-emerald-500 bg-emerald-950/50 text-emerald-200 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  2. Select Child (Overriding) Method Declaration:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'IOException', label: 'throws IOException', type: 'Same' },
                    { id: 'FileNotFoundException', label: 'throws FileNotFoundException', type: 'Subclass (Narrower)' },
                    { id: 'None', label: 'No throws', type: 'No Exception' },
                    { id: 'Exception', label: 'throws Exception', type: 'Broader Superclass' },
                    { id: 'SQLException', label: 'throws SQLException', type: 'New Checked' },
                    { id: 'NullPointerException', label: 'throws NullPointerException', type: 'Unchecked (Runtime)' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setChildThrows(c.id)}
                      className={`p-2.5 rounded-lg border text-left font-mono text-xs transition-all cursor-pointer flex flex-col justify-between ${
                        childThrows === c.id
                          ? 'border-cyan-500 bg-cyan-950/50 text-cyan-200 font-bold'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span>{c.label}</span>
                      <span className="text-[10px] text-slate-500 mt-1 font-sans">{c.type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Preview */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                <div className="text-slate-400">
                  <span className="text-purple-400">class</span> <span className="text-yellow-300">Parent</span> &#123;<br />
                  &nbsp;&nbsp;<span className="text-blue-400">void</span> <span className="text-amber-300">read</span>() {parentThrows !== 'None' && <span className="text-pink-400 font-bold">throws {parentThrows}</span>} &#123; &#125;<br />
                  &#125;
                </div>
                <div className="text-slate-400 pt-2 border-t border-slate-800">
                  <span className="text-purple-400">class</span> <span className="text-yellow-300">Child</span> <span className="text-purple-400">extends</span> <span className="text-yellow-300">Parent</span> &#123;<br />
                  &nbsp;&nbsp;<span className="text-blue-400">@Override</span><br />
                  &nbsp;&nbsp;<span className="text-blue-400">void</span> <span className="text-amber-300">read</span>() {childThrows !== 'None' && <span className="text-pink-400 font-bold">throws {childThrows}</span>} &#123; &#125;<br />
                  &#125;
                </div>
              </div>
            </div>

            {/* Diagnostics Output */}
            <div className="space-y-4">
              <div className={`p-5 rounded-xl border ${overrideResult.color} shadow-lg space-y-3`}>
                <div className="flex items-center gap-2">
                  {overrideResult.valid ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <AlertOctagon className="w-6 h-6 text-rose-400" />
                  )}
                  <h4 className="text-base font-bold">{overrideResult.status}</h4>
                </div>
                <p className="text-xs md:text-sm leading-relaxed opacity-90">
                  {overrideResult.desc}
                </p>
              </div>

              {/* Rules Summary Box */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  The 3 Golden Rules of Overriding with "throws":
                </h5>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">1.</span>
                    <span>If parent declares <b>NO checked exception</b>, child <b>CANNOT declare any checked exception</b> (only unchecked exceptions allowed).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">2.</span>
                    <span>If parent declares a <b>checked exception</b>, child can declare: the <b>same exception</b>, a <b>narrower subclass</b>, or <b>none at all</b>. Child CANNOT declare broader superclasses or new checked exceptions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">3.</span>
                    <span><b>Unchecked Exceptions (RuntimeException)</b> have no restrictions and can be declared freely anywhere.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: THROW VS THROWS ARENA */}
      {activeTab === 'throw-vs-throws' && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-amber-950/40 p-5 rounded-xl border border-purple-500/30">
            <h3 className="text-base md:text-lg font-bold text-purple-200 flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-purple-400" />
              "throw" vs "throws" - Head-to-Head Comparison Matrix
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              One of the top 3 most frequently asked Java interview questions. Master the structural and functional differences:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-slate-200 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Feature</th>
                  <th className="p-3 text-pink-300">throw Keyword</th>
                  <th className="p-3 text-amber-300">throws Keyword</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                <tr className="bg-slate-950/40 hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-slate-300">Purpose</td>
                  <td className="p-3 text-slate-300">Used to <b>explicitly instantiate and throw</b> an exception object right now.</td>
                  <td className="p-3 text-slate-300">Used to <b>declare</b> the checked exceptions that a method might throw.</td>
                </tr>
                <tr className="bg-slate-950/70 hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-slate-300">Location in Code</td>
                  <td className="p-3 text-slate-300">Used <b>inside method bodies</b> or blocks of code.</td>
                  <td className="p-3 text-slate-300">Used in <b>method or constructor signatures</b> only.</td>
                </tr>
                <tr className="bg-slate-950/40 hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-slate-300">Syntax Followed By</td>
                  <td className="p-3 font-mono text-pink-300">Followed by an <b>instance / object</b>: <code>throw new IOException("error");</code></td>
                  <td className="p-3 font-mono text-amber-300">Followed by <b>class name(s)</b>: <code>throws IOException, SQLException</code></td>
                </tr>
                <tr className="bg-slate-950/70 hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-slate-300">Multiple Declarations</td>
                  <td className="p-3 text-slate-300">Can throw only <b>one exception object</b> at a time per statement.</td>
                  <td className="p-3 text-slate-300">Can declare <b>multiple exception classes</b> separated by commas.</td>
                </tr>
                <tr className="bg-slate-950/40 hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-slate-300">Compiler Verification</td>
                  <td className="p-3 text-slate-300">If throwing a checked exception, compiler forces enclosing try-catch OR throws in signature.</td>
                  <td className="p-3 text-slate-300">Informs callers that they must handle or propagate declared checked exceptions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: INTERVIEW QUIZ */}
      {activeTab === 'quiz' && (
        <div className="p-4 md:p-6 space-y-6">
          <div className="bg-gradient-to-r from-pink-950/40 via-slate-900 to-amber-950/40 p-5 rounded-xl border border-pink-500/30">
            <h3 className="text-base md:text-lg font-bold text-pink-200 flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-pink-400" />
              FAANG / Enterprise Interview Self-Assessment
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Test your understanding of method exception propagation, caller duties, and compiler rules.
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
