import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Play, Pause, RotateCcw, 
  Terminal, Sparkles, Code2, CheckCircle2, Zap, ArrowRight, 
  Layers, Check, X, Ban, FileCode, RefreshCw, Cpu, Database,
  Flame, Bug, HelpCircle, ChevronRight, ChevronLeft, ArrowDown,
  FileText, Shield, AlertOctagon, CornerDownRight, CheckCircle, Info,
  Sliders, Activity, Eye, BookOpen, Lightbulb, Lock, Unlock,
  Archive, Trash2, Key, Server, Cable
} from 'lucide-react';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';

/**
 * JavaTryWithResourcesVisualizer
 * High-Yield Interactive Theater & Animation for:
 * "Try-With-Resources in Java Exception Handling (Java 7+ & Java 9+)"
 */
export default function JavaTryWithResourcesVisualizer({ onOpenPlayground }) {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'animation-explainer' | 'rules'
  const [scenario, setScenario] = useState('single-resource'); // 'single-resource' | 'multi-resource' | 'exception-in-try' | 'suppressed-exception' | 'java9-var'

  const [simStep, setSimStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1400);

  // Scenario Data Configurations
  const getActiveScenarioConfig = () => {
    if (scenario === 'single-resource') {
      return {
        title: '🟢 Scenario 1: Single Resource (BufferedReader) - Normal Execution',
        badge: 'Java 7 Auto-Close: Try -> Use -> Auto-Close BufferedReader -> Finish',
        badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-950/60',
        code: `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class TryWithResourcesDemo {
    public static void main(String[] args) {
        System.out.println("----- App Started -----");
        
        // try-with-resources automatically closes BufferedReader
        try (BufferedReader br = new BufferedReader(new FileReader("test.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("IOException occurred: " + e);
        }
        
        System.out.println("----- App Finished Successfully -----");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 7,
            label: '1. 🚀 App Start & Initialization',
            desc: 'Application begins execution in main(). Prints "----- App Started -----".',
            terminal: '----- App Started -----',
            activePhase: 'START',
            resources: [
              { name: 'br (BufferedReader)', status: 'Pending Allocation', stateColor: 'text-slate-400 border-slate-700 bg-slate-900/50' }
            ],
            state: { line: null, exception: null, status: 'APP_INITIALIZED' }
          },
          {
            stepNum: 1,
            line: 10,
            label: '2. 📦 Resource Instantiated in try(...)',
            desc: 'BufferedReader is allocated within the try(...) header. The JVM registers `br` as an AutoCloseable resource handle.',
            terminal: '----- App Started -----',
            activePhase: 'RESOURCE_OPENED',
            resources: [
              { name: 'br (BufferedReader)', status: '🟢 OPEN & ACTIVE', stateColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' }
            ],
            state: { line: null, exception: null, status: 'RESOURCE_OPENED' }
          },
          {
            stepNum: 2,
            line: 12,
            label: '3. ⚡ Reading Data inside try Block',
            desc: 'Execution enters the try block. `br.readLine()` reads file contents line by line until EOF is reached.',
            terminal: '----- App Started -----\nLine 1 from test.txt\nLine 2 from test.txt',
            activePhase: 'TRY_RUNNING',
            resources: [
              { name: 'br (BufferedReader)', status: '🟢 STREAMING DATA', stateColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' }
            ],
            state: { line: 'Line 2 from test.txt', exception: null, status: 'READING_COMPLETE' }
          },
          {
            stepNum: 3,
            line: 14,
            label: '4. 🔒 AUTOMATIC CLOSE TRIGGERED (ARM)',
            desc: 'Control reaches the end of the try block. Without any explicit finally block, the JVM automatically invokes `br.close()`. Resource is safely deallocated!',
            terminal: '----- App Started -----\nLine 1 from test.txt\nLine 2 from test.txt',
            activePhase: 'AUTO_CLOSED',
            resources: [
              { name: 'br (BufferedReader)', status: '🔒 CLOSED (AutoCloseable)', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { line: 'null', exception: null, status: 'CLOSED_SUCCESS' }
          },
          {
            stepNum: 4,
            line: 15,
            label: '5. ⏭️ catch Block Skipped',
            desc: 'Because no IOException was thrown, the catch block is bypassed completely.',
            terminal: '----- App Started -----\nLine 1 from test.txt\nLine 2 from test.txt',
            activePhase: 'CATCH_SKIPPED',
            resources: [
              { name: 'br (BufferedReader)', status: '🔒 CLOSED', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { line: 'null', exception: null, status: 'CATCH_SKIPPED' }
          },
          {
            stepNum: 5,
            line: 19,
            label: '6. ✅ Application Finished Cleanly',
            desc: 'Normal program flow continues. Prints "----- App Finished Successfully -----". Zero memory or file descriptor leaks!',
            terminal: '----- App Started -----\nLine 1 from test.txt\nLine 2 from test.txt\n----- App Finished Successfully -----',
            activePhase: 'COMPLETED',
            resources: [
              { name: 'br (BufferedReader)', status: '🔒 CLOSED & FREED', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { line: 'null', exception: null, status: 'DONE' }
          }
        ]
      };
    }

    if (scenario === 'multi-resource') {
      return {
        title: '🔄 Scenario 2: Multiple Resources (Reverse Closing Order)',
        badge: 'LIFO Auto-Close: Open A -> Open B -> Auto-Close B -> Auto-Close A',
        badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-950/60',
        code: `import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class MultiResourceCopyDemo {
    public static void main(String[] args) {
        System.out.println("----- File Transfer Started -----");

        // Multiple resources separated by semicolon ';'
        try (
            FileInputStream fis = new FileInputStream("source.dat");   // Resource 1
            FileOutputStream fos = new FileOutputStream("dest.dat")     // Resource 2
        ) {
            System.out.println("Copying byte data from source to dest...");
            fos.write(fis.read());
        } catch (IOException e) {
            System.out.println("I/O Error: " + e.getMessage());
        }

        System.out.println("----- Both Streams Closed Safely (LIFO) -----");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 7,
            label: '1. Program Start',
            desc: 'Program initiates file transfer pipeline.',
            terminal: '----- File Transfer Started -----',
            activePhase: 'START',
            resources: [
              { name: '1. fis (FileInputStream)', status: 'Pending', stateColor: 'text-slate-400 border-slate-700 bg-slate-900/50' },
              { name: '2. fos (FileOutputStream)', status: 'Pending', stateColor: 'text-slate-400 border-slate-700 bg-slate-900/50' }
            ],
            state: { status: 'INITIALIZING' }
          },
          {
            stepNum: 1,
            line: 11,
            label: '2. 📦 Open Resource 1: fis',
            desc: 'JVM opens `FileInputStream("source.dat")`. Left-to-right creation order.',
            terminal: '----- File Transfer Started -----',
            activePhase: 'RES1_OPEN',
            resources: [
              { name: '1. fis (FileInputStream)', status: '🟢 OPEN (#1 Created)', stateColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
              { name: '2. fos (FileOutputStream)', status: 'Pending', stateColor: 'text-slate-400 border-slate-700 bg-slate-900/50' }
            ],
            state: { status: 'RES1_ACTIVE' }
          },
          {
            stepNum: 2,
            line: 12,
            label: '3. 📦 Open Resource 2: fos',
            desc: 'JVM opens `FileOutputStream("dest.dat")`. Both streams are now active.',
            terminal: '----- File Transfer Started -----',
            activePhase: 'RES2_OPEN',
            resources: [
              { name: '1. fis (FileInputStream)', status: '🟢 OPEN (#1 Created)', stateColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
              { name: '2. fos (FileOutputStream)', status: '🟢 OPEN (#2 Created)', stateColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' }
            ],
            state: { status: 'BOTH_ACTIVE' }
          },
          {
            stepNum: 3,
            line: 15,
            label: '4. ⚡ Copying Data in try Block',
            desc: 'Data bytes read from source and written into destination stream.',
            terminal: '----- File Transfer Started -----\nCopying byte data from source to dest...',
            activePhase: 'TRY_RUNNING',
            resources: [
              { name: '1. fis (FileInputStream)', status: '🟢 ACTIVE', stateColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
              { name: '2. fos (FileOutputStream)', status: '🟢 ACTIVE', stateColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' }
            ],
            state: { status: 'DATA_WRITTEN' }
          },
          {
            stepNum: 4,
            line: 16,
            label: '5. 🔒 STEP 1: Auto-Close fos (Reverse Order - LIFO)',
            desc: 'Try block finishes. JVM closes `fos` FIRST because it was declared SECOND (LIFO deallocation). Ensures buffers flush before source stream closes!',
            terminal: '----- File Transfer Started -----\nCopying byte data from source to dest...',
            activePhase: 'CLOSING_RES2',
            resources: [
              { name: '1. fis (FileInputStream)', status: '🟢 OPEN (Waiting Turn)', stateColor: 'text-amber-400 border-amber-500/40 bg-amber-950/60' },
              { name: '2. fos (FileOutputStream)', status: '🔒 CLOSED 1ST (fos.close())', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { status: 'FOS_CLOSED' }
          },
          {
            stepNum: 5,
            line: 16,
            label: '6. 🔒 STEP 2: Auto-Close fis (Reverse Order - LIFO)',
            desc: 'JVM closes `fis` SECOND. All resources are now fully closed in strict reverse sequence.',
            terminal: '----- File Transfer Started -----\nCopying byte data from source to dest...',
            activePhase: 'CLOSING_RES1',
            resources: [
              { name: '1. fis (FileInputStream)', status: '🔒 CLOSED 2ND (fis.close())', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' },
              { name: '2. fos (FileOutputStream)', status: '🔒 CLOSED 1ST', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { status: 'ALL_CLOSED' }
          },
          {
            stepNum: 6,
            line: 21,
            label: '7. 🏁 Completed Successfully',
            desc: 'No catch block needed to execute; program completes without any manual finally blocks.',
            terminal: '----- File Transfer Started -----\nCopying byte data from source to dest...\n----- Both Streams Closed Safely (LIFO) -----',
            activePhase: 'COMPLETED',
            resources: [
              { name: '1. fis (FileInputStream)', status: '🔒 CLOSED', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' },
              { name: '2. fos (FileOutputStream)', status: '🔒 CLOSED', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { status: 'DONE' }
          }
        ]
      };
    }

    if (scenario === 'exception-in-try') {
      return {
        title: '🟡 Scenario 3: Exception Thrown in try (Auto-Close Happens BEFORE Catch)',
        badge: 'Exception Safety: Open Resource -> Throw Error -> Auto-Close -> Catch Handles Error',
        badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-950/60',
        code: `import java.io.FileReader;
import java.io.IOException;

public class ExceptionInTryDemo {
    public static void main(String[] args) {
        System.out.println("----- Process Started -----");

        try (FileReader reader = new FileReader("corrupt.txt")) {
            System.out.println("Reading character data...");
            int data = reader.read();
            
            // 💥 Simulate an unexpected runtime exception
            if (data != -1) {
                throw new RuntimeException("Data format corrupted at byte 0!");
            }
        } catch (RuntimeException e) {
            // 🎯 NOTE: reader is ALREADY CLOSED by the time we enter here!
            System.out.println("❌ Caught in catch block: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("I/O Error: " + e.getMessage());
        }

        System.out.println("----- Program Resumed Gracefully -----");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 6,
            label: '1. App Starts',
            desc: 'Initiating operation in main().',
            terminal: '----- Process Started -----',
            activePhase: 'START',
            resources: [
              { name: 'reader (FileReader)', status: 'Pending', stateColor: 'text-slate-400 border-slate-700 bg-slate-900/50' }
            ],
            state: { exception: null, status: 'START' }
          },
          {
            stepNum: 1,
            line: 8,
            label: '2. 📦 FileReader Allocated & Opened',
            desc: 'JVM opens "corrupt.txt" and assigns the handle to `reader`.',
            terminal: '----- Process Started -----',
            activePhase: 'OPENED',
            resources: [
              { name: 'reader (FileReader)', status: '🟢 OPEN & ACTIVE', stateColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' }
            ],
            state: { exception: null, status: 'RESOURCE_OPENED' }
          },
          {
            stepNum: 2,
            line: 14,
            label: '3. 💥 RuntimeException Thrown Inside try',
            desc: 'Data validation fails: `throw new RuntimeException("Data format corrupted...")`.',
            terminal: '----- Process Started -----\nReading character data...',
            activePhase: 'EXCEPTION_THROWN',
            resources: [
              { name: 'reader (FileReader)', status: '⚡ ACTIVE (Pending Auto-Close)', stateColor: 'text-amber-400 border-amber-500/40 bg-amber-950/60' }
            ],
            state: { exception: 'RuntimeException: Data format corrupted', status: 'ERROR_OCCURRED' }
          },
          {
            stepNum: 3,
            line: 15,
            label: '4. 🔒 GUARANTEED AUTO-CLOSE (Before Catch)',
            desc: 'CRITICAL GOLDEN RULE: Before the catch block is entered, the JVM automatically executes `reader.close()`. The resource is 100% closed before error handling begins!',
            terminal: '----- Process Started -----\nReading character data...',
            activePhase: 'AUTO_CLOSED_EARLY',
            resources: [
              { name: 'reader (FileReader)', status: '🔒 CLOSED (Auto-Closed BEFORE catch!)', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { exception: 'RuntimeException: Data format corrupted', status: 'RESOURCE_AUTO_CLOSED' }
          },
          {
            stepNum: 4,
            line: 17,
            label: '5. 🎯 catch (RuntimeException e) Handles Error',
            desc: 'Control jumps to catch block. Prints error message. No resource leak occurred.',
            terminal: '----- Process Started -----\nReading character data...\n❌ Caught in catch block: Data format corrupted at byte 0!',
            activePhase: 'CATCH_HANDLED',
            resources: [
              { name: 'reader (FileReader)', status: '🔒 CLOSED', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { exception: 'Handled', status: 'HANDLED' }
          },
          {
            stepNum: 5,
            line: 22,
            label: '6. ✅ Normal Execution Resumes',
            desc: 'Program completes successfully after the try-with-resources block.',
            terminal: '----- Process Started -----\nReading character data...\n❌ Caught in catch block: Data format corrupted at byte 0!\n----- Program Resumed Gracefully -----',
            activePhase: 'COMPLETED',
            resources: [
              { name: 'reader (FileReader)', status: '🔒 CLOSED', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { exception: null, status: 'DONE' }
          }
        ]
      };
    }

    if (scenario === 'suppressed-exception') {
      return {
        title: '🔥 Scenario 4: Suppressed Exceptions (Throwable.getSuppressed())',
        badge: 'Root Cause Preserved: Primary Error in try + Secondary Error in close() attached as Suppressed!',
        badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-950/60',
        code: `class BrokenResource implements AutoCloseable {
    public void doWork() throws Exception {
        throw new Exception("💥 Primary Error inside try body!");
    }
    @Override
    public void close() throws Exception {
        throw new Exception("⚠️ Secondary Error during close()!");
    }
}

public class SuppressedExceptionDemo {
    public static void main(String[] args) {
        try (BrokenResource res = new BrokenResource()) {
            res.doWork();
        } catch (Exception e) {
            System.out.println("Primary Exception: " + e.getMessage());
            
            // Retrieve suppressed exceptions
            for (Throwable suppressed : e.getSuppressed()) {
                System.out.println("  ↳ Suppressed: " + suppressed.getMessage());
            }
        }
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 13,
            label: '1. Instantiate BrokenResource',
            desc: 'Resource allocated inside try(...) header.',
            terminal: '',
            activePhase: 'INIT',
            resources: [
              { name: 'res (BrokenResource)', status: '🟢 ACTIVE', stateColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' }
            ],
            state: { primary: null, suppressed: null, status: 'INIT' }
          },
          {
            stepNum: 1,
            line: 14,
            label: '2. 💥 Primary Exception Thrown in try Body',
            desc: '`res.doWork()` throws "💥 Primary Error inside try body!". JVM captures this as the PRIMARY exception.',
            terminal: '',
            activePhase: 'PRIMARY_THROWN',
            resources: [
              { name: 'res (BrokenResource)', status: '⚡ ACTIVE (Triggering close())', stateColor: 'text-amber-400 border-amber-500/40 bg-amber-950/60' }
            ],
            state: { primary: '💥 Primary Error inside try body!', suppressed: null, status: 'PRIMARY_THROWN' }
          },
          {
            stepNum: 2,
            line: 7,
            label: '3. ⚠️ Secondary Exception Thrown in close()',
            desc: 'JVM automatically invokes `res.close()`. `close()` throws "⚠️ Secondary Error during close()!". In Java 6, this would have DESTROYED the primary exception.',
            terminal: '',
            activePhase: 'CLOSE_THROWN',
            resources: [
              { name: 'res (BrokenResource)', status: '🔥 CLOSE ERROR SUPPRESSED', stateColor: 'text-rose-400 border-rose-500/40 bg-rose-950/60' }
            ],
            state: { primary: '💥 Primary Error inside try body!', suppressed: '⚠️ Secondary Error during close()!', status: 'ATTACHING_SUPPRESSED' }
          },
          {
            stepNum: 3,
            line: 15,
            label: '4. 🔗 JVM Attaches Suppressed Exception (e.addSuppressed())',
            desc: 'Instead of masking the primary error, Java 7 attaches the close() error as a Suppressed Exception on the primary exception object!',
            terminal: 'Primary Exception: 💥 Primary Error inside try body!',
            activePhase: 'ATTACHED',
            resources: [
              { name: 'res (BrokenResource)', status: '🔒 CLOSED (Suppressed Error Attached)', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { primary: '💥 Primary Error inside try body!', suppressed: 'Attached to Primary', status: 'ATTACHED' }
          },
          {
            stepNum: 4,
            line: 19,
            label: '5. 🔍 Inspected via Throwable.getSuppressed()',
            desc: 'Catch block calls `e.getSuppressed()`. Both the root cause and the cleanup failure are fully visible for debugging!',
            terminal: 'Primary Exception: 💥 Primary Error inside try body!\n  ↳ Suppressed: ⚠️ Secondary Error during close()!',
            activePhase: 'COMPLETED',
            resources: [
              { name: 'res (BrokenResource)', status: '🔒 CLOSED & REPORTED', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { primary: 'Logged', suppressed: 'Logged', status: 'DONE' }
          }
        ]
      };
    }

    if (scenario === 'java9-var') {
      return {
        title: '💎 Scenario 5: Java 9+ Effectively Final Resource Reference',
        badge: 'Java 9 Feature: try (reader) without re-declaring new local variable',
        badgeColor: 'border-indigo-500/40 text-indigo-300 bg-indigo-950/60',
        code: `import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

public class Java9TryWithResources {
    public static void main(String[] args) throws IOException {
        // Resource initialized BEFORE the try statement
        final BufferedReader reader1 = new BufferedReader(new StringReader("Header 1"));
        BufferedReader reader2 = new BufferedReader(new StringReader("Header 2")); // Effectively final

        // ✅ Java 9+: Pass existing effectively-final references directly!
        try (reader1; reader2) {
            System.out.println("Reading 1: " + reader1.readLine());
            System.out.println("Reading 2: " + reader2.readLine());
        } // Both reader1 and reader2 are automatically closed here in reverse order!

        System.out.println("----- Both Pre-declared Resources Auto-Closed -----");
    }
}`,
        steps: [
          {
            stepNum: 0,
            line: 8,
            label: '1. Pre-Declaration of Resources',
            desc: '`reader1` and `reader2` are instantiated outside the try block. In Java 7, this was not allowed inside `try(...)`.',
            terminal: '',
            activePhase: 'PRE_DECLARE',
            resources: [
              { name: 'reader1 (final)', status: '🟢 ALLOCATED OUTSIDE', stateColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
              { name: 'reader2 (effectively-final)', status: '🟢 ALLOCATED OUTSIDE', stateColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' }
            ],
            state: { status: 'VARIABLES_READY' }
          },
          {
            stepNum: 1,
            line: 12,
            label: '2. 💎 Java 9+ try (reader1; reader2) Header',
            desc: 'The try-with-resources statement takes the existing variable references directly without re-declaration.',
            terminal: '',
            activePhase: 'TRY_ENTERED',
            resources: [
              { name: 'reader1', status: '🟢 MANAGED BY TRY', stateColor: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/60' },
              { name: 'reader2', status: '🟢 MANAGED BY TRY', stateColor: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/60' }
            ],
            state: { status: 'TRY_ENTERED' }
          },
          {
            stepNum: 2,
            line: 14,
            label: '3. ⚡ Reading from Streams',
            desc: 'Body executes: reads data from both strings.',
            terminal: 'Reading 1: Header 1\nReading 2: Header 2',
            activePhase: 'READING',
            resources: [
              { name: 'reader1', status: '🟢 STREAMING', stateColor: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/60' },
              { name: 'reader2', status: '🟢 STREAMING', stateColor: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/60' }
            ],
            state: { status: 'READ_COMPLETE' }
          },
          {
            stepNum: 3,
            line: 15,
            label: '4. 🔒 Automatic Reverse Closing (reader2 -> reader1)',
            desc: 'Exiting the try block automatically triggers `reader2.close()` followed by `reader1.close()`.',
            terminal: 'Reading 1: Header 1\nReading 2: Header 2',
            activePhase: 'AUTO_CLOSING',
            resources: [
              { name: 'reader1', status: '🔒 CLOSED 2ND', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' },
              { name: 'reader2', status: '🔒 CLOSED 1ST', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { status: 'BOTH_CLOSED' }
          },
          {
            stepNum: 4,
            line: 17,
            label: '5. ✅ Program Finishes',
            desc: 'Application finishes cleanly without any resource leaks.',
            terminal: 'Reading 1: Header 1\nReading 2: Header 2\n----- Both Pre-declared Resources Auto-Closed -----',
            activePhase: 'COMPLETED',
            resources: [
              { name: 'reader1', status: '🔒 CLOSED', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' },
              { name: 'reader2', status: '🔒 CLOSED', stateColor: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' }
            ],
            state: { status: 'DONE' }
          }
        ]
      };
    }

    return null;
  };

  const currentConfig = getActiveScenarioConfig();
  const maxSteps = currentConfig.steps.length;
  const activeStep = currentConfig.steps[simStep] || currentConfig.steps[0];

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setSimStep((prev) => {
          if (prev >= maxSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, maxSteps, playbackSpeed]);

  const handleScenarioChange = (newScen) => {
    setIsPlaying(false);
    setScenario(newScen);
    setSimStep(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setSimStep(0);
  };

  const handleNext = () => {
    if (simStep < maxSteps - 1) setSimStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (simStep > 0) setSimStep((prev) => prev - 1);
  };

  return (
    <div className="w-full space-y-6 rounded-3xl bg-[#080D1A] border border-slate-800/80 p-4 sm:p-6 shadow-2xl text-slate-100 relative overflow-hidden">
      {/* Top Header & Title */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 shadow-inner shrink-0">
            <Archive className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                Try-With-Resources Interactive Engine (ARM)
              </h2>
              <span className="text-[10px] sm:text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 whitespace-nowrap shadow-sm">
                Java 7+ & Java 9+
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automatic Resource Management (ARM) • AutoCloseable • LIFO Deallocation • Suppressed Exceptions
            </p>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'simulator'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5 shrink-0" />
            <span>Live Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('animation-explainer')}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'animation-explainer'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Animation Explainer</span>
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'rules'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>Architecture & Rules</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Scenario Selector Pills */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              Select Try-With-Resources Scenario:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              <button
                onClick={() => handleScenarioChange('single-resource')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                  scenario === 'single-resource'
                    ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300 shadow-md shadow-emerald-950/40'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">1. Single Resource</span>
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">
                  BufferedReader auto-close upon try exit
                </span>
              </button>

              <button
                onClick={() => handleScenarioChange('multi-resource')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                  scenario === 'multi-resource'
                    ? 'border-cyan-500/60 bg-cyan-950/40 text-cyan-300 shadow-md shadow-cyan-950/40'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">2. Multiple Resources</span>
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">
                  Strict reverse (LIFO) order deconstruction
                </span>
              </button>

              <button
                onClick={() => handleScenarioChange('exception-in-try')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                  scenario === 'exception-in-try'
                    ? 'border-amber-500/60 bg-amber-950/40 text-amber-300 shadow-md shadow-amber-950/40'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">3. Exception in Try</span>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">
                  Closed BEFORE entering catch block
                </span>
              </button>

              <button
                onClick={() => handleScenarioChange('suppressed-exception')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                  scenario === 'suppressed-exception'
                    ? 'border-rose-500/60 bg-rose-950/40 text-rose-300 shadow-md shadow-rose-950/40'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">4. Suppressed Exceptions</span>
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">
                  Throwable.getSuppressed() in action
                </span>
              </button>

              <button
                onClick={() => handleScenarioChange('java9-var')}
                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between gap-1.5 ${
                  scenario === 'java9-var'
                    ? 'border-indigo-500/60 bg-indigo-950/40 text-indigo-300 shadow-md shadow-indigo-950/40'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">5. Java 9+ Variables</span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span className="text-[11px] text-slate-400 leading-tight">
                  Effectively-final resource passing
                </span>
              </button>
            </div>
          </div>

          {/* Active Scenario Title Banner */}
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
            <div className="space-y-0.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                {currentConfig.title}
              </h3>
              <span className={`inline-block text-[11px] font-mono px-2 py-0.5 rounded-md border ${currentConfig.badgeColor}`}>
                {currentConfig.badge}
              </span>
            </div>
            {onOpenPlayground && (
              <button
                onClick={() => onOpenPlayground(currentConfig.code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-emerald-400 transition shrink-0 group"
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-400 group-hover:text-slate-950 transition" />
                Open in Live Playground
              </button>
            )}
          </div>

          {/* Main Dual-Column Theater: Left Code, Right Narrative & State */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Code Viewer with Highlighted Line */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                  Java Source Execution
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/50">
                  Active Line: {activeStep.line}
                </span>
              </div>
              <div className="rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl bg-[#030712]">
                <UltraModernCodeViewer
                  code={currentConfig.code}
                  language="java"
                  highlightLines={[activeStep.line]}
                />
              </div>
            </div>

            {/* Right: Interactive Narrative, Resource Lifecycle Pool & Console */}
            <div className="lg:col-span-5 space-y-4 flex flex-col">
              {/* Step Narrative Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0B132B] border border-slate-800/90 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-extrabold text-slate-950">
                      {activeStep.stepNum + 1}
                    </span>
                    <h4 className="text-xs font-bold text-white tracking-wide">
                      {activeStep.label}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Step {simStep + 1} of {maxSteps}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
                  {activeStep.desc}
                </p>
              </div>

              {/* Resource Pool / AutoCloseable Lifecycle Tracker */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/70 pb-2">
                  <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                    <Archive className="w-3.5 h-3.5 text-cyan-400" />
                    AutoCloseable Resource Pool
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    JVM ARM Monitor
                  </span>
                </div>

                <div className="space-y-2">
                  {activeStep.resources && activeStep.resources.map((res, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${res.stateColor}`}
                    >
                      <div className="flex items-center gap-2">
                        {res.status.includes('CLOSED') ? (
                          <Lock className="w-4 h-4 text-cyan-400 shrink-0" />
                        ) : res.status.includes('OPEN') ? (
                          <Unlock className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                        ) : res.status.includes('SUPPRESSED') ? (
                          <Flame className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : (
                          <Activity className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span className="text-xs font-mono font-bold text-white">
                          {res.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono font-bold tracking-tight">
                        {res.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Virtual Terminal Output */}
              <div className="p-4 rounded-2xl bg-[#040711] border border-slate-800/90 shadow-2xl space-y-2 flex-1 flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    System.out Console
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] font-mono text-slate-400">Live</span>
                  </div>
                </div>
                <div className="font-mono text-xs text-emerald-300/90 bg-black/50 p-3 rounded-xl border border-slate-900 whitespace-pre-wrap flex-1 min-h-[90px] overflow-y-auto">
                  {activeStep.terminal || <span className="text-slate-600 italic">// No output yet</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Playback & Speed Controls */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            {/* Step Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={simStep === 0 || isPlaying}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 transition"
                title="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg ${
                  isPlaying
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause Animation
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Auto-Play Flow
                  </>
                )}
              </button>

              <button
                onClick={handleNext}
                disabled={simStep >= maxSteps - 1 || isPlaying}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 transition"
                title="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Step Progress Tracker */}
            <div className="flex items-center gap-1.5">
              {currentConfig.steps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsPlaying(false);
                    setSimStep(idx);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === simStep
                      ? 'w-7 bg-emerald-400 shadow-md shadow-emerald-500/50'
                      : idx < simStep
                      ? 'w-2.5 bg-emerald-800'
                      : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                  }`}
                  title={`Jump to step ${idx + 1}`}
                />
              ))}
            </div>

            {/* Playback Speed Controller */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Speed:</span>
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value={2200}>Slow (2.2s)</option>
                <option value={1400}>Normal (1.4s)</option>
                <option value={800}>Fast (0.8s)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANIMATION EXPLAINER */}
      {activeTab === 'animation-explainer' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-indigo-950/40 border border-emerald-800/40">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Visual Architecture: How Try-With-Resources Operates Step-by-Step
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Follow the animated lifecycle of resources from allocation to strict reverse deconstruction, suppressed exceptions chaining, and exception-safe execution.
            </p>
          </div>

          {/* Step 1 to 4 Pipeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Phase 1 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/40 space-y-3 relative overflow-hidden group hover:border-emerald-400 transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-[10px] font-bold">
                  PHASE 1
                </span>
                <Unlock className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-xs font-bold text-white">1. Resource Instantiation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Resources inside <code className="text-emerald-300 font-mono">try(Res1 r1 = ...; Res2 r2 = ...)</code> are initialized left-to-right. Each must implement <code className="text-cyan-300 font-mono">AutoCloseable</code>.
              </p>
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-emerald-300">
                r1 opened &rarr; r2 opened
              </div>
            </div>

            {/* Phase 2 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/40 space-y-3 relative overflow-hidden group hover:border-cyan-400 transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono text-[10px] font-bold">
                  PHASE 2
                </span>
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="text-xs font-bold text-white">2. Try Block Execution</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The business code inside the <code className="text-cyan-300 font-mono">{'{ ... }'}</code> executes. Resources are actively read, written, or queried.
              </p>
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-cyan-300">
                fos.write(fis.read());
              </div>
            </div>

            {/* Phase 3 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/40 space-y-3 relative overflow-hidden group hover:border-amber-400 transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-amber-950 text-amber-400 border border-amber-800 font-mono text-[10px] font-bold">
                  PHASE 3
                </span>
                <Lock className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="text-xs font-bold text-white">3. Auto-Close in Reverse Order</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                As soon as execution leaves try (normally OR via exception), JVM automatically calls <code className="text-amber-300 font-mono">.close()</code> in <strong>strict LIFO (Reverse) order</strong>!
              </p>
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-amber-300">
                1st: r2.close() &rarr; 2nd: r1.close()
              </div>
            </div>

            {/* Phase 4 */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/40 space-y-3 relative overflow-hidden group hover:border-indigo-400 transition">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono text-[10px] font-bold">
                  PHASE 4
                </span>
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
              </div>
              <h4 className="text-xs font-bold text-white">4. Catch & Suppressed Chain</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Any exception thrown in try is handed to <code className="text-indigo-300 font-mono">catch</code>. Any secondary error thrown by <code className="text-rose-300 font-mono">.close()</code> is attached as <strong>Suppressed</strong>.
              </p>
              <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-indigo-300">
                e.getSuppressed() preserves all
              </div>
            </div>
          </div>

          {/* Under The Hood: Java 6 Boilerplate vs Java 7+ Try-With-Resources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-rose-300 flex items-center gap-2">
                  <X className="w-4 h-4 text-rose-400" />
                  ❌ Legacy Java 6 try-finally (20+ Lines & Error Prone)
                </h4>
                <span className="text-[10px] font-mono text-rose-400">Java 6 & Prior</span>
              </div>
              <div className="bg-black/60 p-3 rounded-xl border border-rose-950/60 font-mono text-[11px] text-slate-300 space-y-1 overflow-x-auto">
                <p className="text-slate-500">// Must declare variable outside</p>
                <p>BufferedReader br = null;</p>
                <p>try &#123;</p>
                <p>&nbsp;&nbsp;br = new BufferedReader(new FileReader("file.txt"));</p>
                <p>&nbsp;&nbsp;br.readLine();</p>
                <p>&#125; catch (IOException e) &#123; ... &#125;</p>
                <p><span className="text-rose-400 font-bold">finally &#123;</span></p>
                <p>&nbsp;&nbsp;if (br != null) &#123;</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;try &#123; <span className="text-rose-400">br.close();</span> &#125;</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;catch (IOException ex) &#123; <span className="text-rose-300">// Masks try exception!</span> &#125;</p>
                <p>&nbsp;&nbsp;&#125;</p>
                <p><span className="text-rose-400 font-bold">&#125;</span></p>
              </div>
              <p className="text-[11px] text-slate-400">
                ⚠️ Issues: High boilerplate, manual null checks required, risk of losing/masking the real error if close() throws another exception.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  ✅ Modern Java 7+ Try-With-Resources (Clean & Safe)
                </h4>
                <span className="text-[10px] font-mono text-emerald-400">Java 7+ & Java 9+</span>
              </div>
              <div className="bg-black/60 p-3 rounded-xl border border-emerald-950/60 font-mono text-[11px] text-slate-300 space-y-1 overflow-x-auto">
                <p className="text-slate-500">// Automatic Resource Management (ARM)</p>
                <p><span className="text-emerald-400 font-bold">try (</span>BufferedReader br = new BufferedReader(new FileReader("file.txt"))<span className="text-emerald-400 font-bold">) &#123;</span></p>
                <p>&nbsp;&nbsp;br.readLine();</p>
                <p><span className="text-emerald-400 font-bold">&#125;</span> catch (IOException e) &#123;</p>
                <p>&nbsp;&nbsp;System.out.println("Handled: " + e);</p>
                <p>&#125;</p>
                <p className="text-emerald-400/80 font-bold">// 🔒 br is 100% guaranteed auto-closed by JVM</p>
                <p className="text-cyan-400/80 font-bold">// 🔒 Suppressed exceptions preserved</p>
              </div>
              <p className="text-[11px] text-slate-400">
                ✨ Benefits: Zero boilerplate, no null check needed, automatic reverse-order deallocation, exception safety with suppressed exceptions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ARCHITECTURE & RULES */}
      {activeTab === 'rules' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Interface Contract Section: AutoCloseable vs Closeable */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              The Interface Contract: AutoCloseable vs Closeable
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Any object declared in the <code className="text-emerald-300 font-mono">try(...)</code> header <strong>MUST implement <code className="text-cyan-300 font-mono">java.lang.AutoCloseable</code></strong> (or its subtype <code className="text-indigo-300 font-mono">java.io.Closeable</code>).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">java.lang.AutoCloseable</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">Java 7+</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/60 border border-slate-900 font-mono text-xs text-slate-300">
                  <p className="text-indigo-400">public interface AutoCloseable &#123;</p>
                  <p>&nbsp;&nbsp;<span className="text-amber-400">void close() throws Exception;</span></p>
                  <p className="text-indigo-400">&#125;</p>
                </div>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  <li>Generic root interface for <strong>any</strong> closable resource (DB, Sockets, Threads).</li>
                  <li>Throws broader <code className="text-amber-300 font-mono">Exception</code>.</li>
                  <li>Best practice: Recommended to make <code className="text-cyan-300 font-mono">close()</code> <em>idempotent</em> (safe to call multiple times).</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400">java.io.Closeable</span>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded">Java 5+</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/60 border border-slate-900 font-mono text-xs text-slate-300">
                  <p className="text-indigo-400">public interface Closeable extends AutoCloseable &#123;</p>
                  <p>&nbsp;&nbsp;<span className="text-amber-400">void close() throws IOException;</span></p>
                  <p className="text-indigo-400">&#125;</p>
                </div>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  <li>Specialized for I/O streams and file channels.</li>
                  <li>Throws narrower <code className="text-amber-300 font-mono">IOException</code>.</li>
                  <li>Strict contract: <strong>MUST be idempotent</strong> (closing an already closed stream has no effect).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5 Golden Rules Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              The 5 Golden Rules of Try-With-Resources
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  1. Implicitly Final Variables
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Resource variables declared in <code className="text-emerald-300 font-mono">try(Res r = new Res())</code> are implicitly <code className="text-cyan-300 font-mono">final</code>. Reassigning <code className="text-rose-400 font-mono">r = other;</code> causes a compile error.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  2. Strict LIFO Reverse Order
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Multiple resources declared inside <code className="text-cyan-300 font-mono">try(A a = ...; B b = ...)</code> are closed in reverse: <code className="text-emerald-300 font-mono">b.close()</code> runs first, then <code className="text-emerald-300 font-mono">a.close()</code>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  3. Closed BEFORE catch / finally
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The automatic <code className="text-amber-300 font-mono">.close()</code> call happens <strong>immediately when exiting try</strong>, BEFORE any catch or explicit finally block on that statement executes!
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                  <CheckCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  4. Suppressed Exceptions Kept
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  If try throws an error and close() also throws an error, the close() error is attached to the primary error via <code className="text-rose-300 font-mono">Throwable.addSuppressed()</code>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                  <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                  5. Java 9 Effectively-Final
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  In Java 9+, you don't need to re-instantiate resources in try. Pre-existing final or effectively final variables can be passed directly as <code className="text-indigo-300 font-mono">try (res1; res2)</code>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  6. Catch / Finally Are Optional
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Unlike traditional try which requires either catch or finally, a <code className="text-teal-300 font-mono">try(...)</code> block can stand completely alone without explicit catch or finally blocks!
                </p>
              </div>
            </div>
          </div>

          {/* Real-World JDBC Enterprise Pattern */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              Enterprise Real-World Pattern: Triple JDBC Resource Management
            </h3>
            <p className="text-xs text-slate-400">
              In enterprise backend development, JDBC Connection, PreparedStatement, and ResultSet are all AutoCloseable and must be deallocated in reverse order:
            </p>
            <div className="bg-[#030712] p-3.5 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto space-y-1">
              <p className="text-slate-500">// All 3 resources automatically closed in reverse order: rs -&gt; ps -&gt; con</p>
              <p><span className="text-emerald-400 font-bold">try (</span></p>
              <p>&nbsp;&nbsp;Connection con = dataSource.getConnection();</p>
              <p>&nbsp;&nbsp;PreparedStatement ps = con.prepareStatement("SELECT * FROM users WHERE active = ?");</p>
              <p>&nbsp;&nbsp;ResultSet rs = ps.executeQuery()<span className="text-emerald-400 font-bold">) &#123;</span></p>
              <p>&nbsp;&nbsp;while (rs.next()) &#123;</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;processUser(rs.getString("username"));</p>
              <p>&nbsp;&nbsp;&#125;</p>
              <p><span className="text-emerald-400 font-bold">&#125;</span> catch (SQLException e) &#123;</p>
              <p>&nbsp;&nbsp;logger.error("Database query failed", e);</p>
              <p>&#125;</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
