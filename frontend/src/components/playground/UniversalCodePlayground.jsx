import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, RotateCcw, Copy, Check, Terminal, Sparkles, CheckCircle2, 
  AlertTriangle, Code2, Folder, FolderOpen, FileCode, ChevronRight, 
  ChevronDown, Maximize2, Minimize2, Clock, Trash2, Layers, Cpu,
  CheckCircle, XCircle, Info, ExternalLink, Bookmark, Palette,
  Keyboard, Edit3, AlignLeft, ZoomIn, ZoomOut, Zap, ShieldCheck,
  CheckCheck, Sun, Moon
} from 'lucide-react';
import { runCodeApi, fetchCodeScenarios } from '../../microfrontends/mfe-code-runner/services/codeRunnerApiClient';

/**
 * Universal Unified Java Coding Playground
 * 
 * Developer Power Features:
 * 1. Dark & Light Mode Theme Toggle (Sun / Moon)
 * 2. Ultra-clean macOS Chrome Titlebar with Breadcrumbs & Java 21 LTS Badge
 * 3. Hotkey Support: Ctrl+Enter (Cmd+Enter) to Compile & Run instantly
 * 4. Auto-Format / Prettify Code Formatter (4-space Java convention)
 * 5. Interactive Font Size Controls (11px - 18px) & Fullscreen Modal Mode
 * 6. Interactive Standard Input (stdin) Console with Scanner Presets
 * 7. Bottom Status Bar with Cursor Coordinates (Ln/Col), UTF-8, and JVM Runtime Metrics
 * 8. Expected vs Actual Output Match Verification Banner
 */
export default function UniversalCodePlayground({
  // Single-file props
  title = "Main.java",
  initialCode = "",
  expectedOutput = "",
  scenarioId = "custom",
  explanation = "",

  // Multi-file props
  files = null, // { "Board.java": "...", "Game.java": "..." }
  initialActiveFile = null,

  // Scenario picker props
  showScenarioPicker = false,
  initialScenarioId = "deadlock-simulation",

  // Layout props
  defaultHeight = "min-h-[420px]",
  showHeader = true
}) {
  // Scenario state (if showScenarioPicker is enabled)
  const [scenarios, setScenarios] = useState({});
  const [selectedScenarioKey, setSelectedScenarioKey] = useState(initialScenarioId);

  // Theme state: Dark (default) vs Light
  const [isLightMode, setIsLightMode] = useState(false);

  // Multi-file vs Single-file state
  const isMultiFile = files && typeof files === 'object' && Object.keys(files).length > 0;
  const [fileContents, setFileContents] = useState(() => {
    if (isMultiFile) return { ...files };
    return { [title]: initialCode || "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Java 21!\");\n    }\n}" };
  });

  const fileKeys = Object.keys(fileContents);
  const [activeFileName, setActiveFileName] = useState(() => {
    if (initialActiveFile && fileContents[initialActiveFile]) return initialActiveFile;
    return fileKeys[0] || title;
  });

  const [openTabs, setOpenTabs] = useState(() => {
    if (isMultiFile) return fileKeys.slice(0, 4);
    return [title];
  });

  // Editor Settings
  const [fontSize, setFontSize] = useState(13); // 11 to 18
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  // Standard Input (stdin) state for interactive user input
  const getSmartDefaultStdin = (code) => {
    if (!code) return '';
    if (code.includes('Enter your name:')) return 'Deepak\n30\n21.1';
    if (code.includes('CheckEvenOddNo') || code.includes('Enter a number:')) return '26';
    if (code.includes('CheckLeapYear') || code.includes('Enter a year:')) return '2024';
    if (code.includes('MultiplicationTable') || code.includes('print its multiplication table')) return '10';
    if (code.includes('FactorialProgram') || code.includes('find its factorial')) return '6';
    if (code.includes('SwapNumbers2')) return '555\n888';
    if (code.includes('SwapNumbers') || code.includes('first number (no1)')) return '100\n200';
    if (code.includes('ReverseNumber') || code.includes('number to reverse')) return '135897';
    if (code.includes('PalindromeNumber') || code.includes('check for palindrome')) return '121';
    if (code.includes('CheckPrimeNumber') || code.includes('check whether a number is prime')) return '31';
    if (code.includes('PrimeRangeFinder') || code.includes('upper limit for prime numbers')) return '50';
    if (code.includes('FibonacciSeries') || code.includes('number of terms')) return '10';
    if (code.includes('GcdOfTwoNumbers') || code.includes('Enter no1:')) return '56\n72';
    if (code.includes('LargestOfThreeNumbers') || code.includes('Enter number 3:')) return '100\n200\n300';
    if (code.includes('CheckArmstrongNumber') || code.includes('ArmstrongNumber')) return '1634';
    if (code.includes('SumOfDigits') || code.includes('sum of digits')) return '12345';
    if (code.includes('Scanner') || code.includes('System.in')) return '45\n89';
    return '';
  };

  const [stdin, setStdin] = useState(() => getSmartDefaultStdin(initialCode));

  // Editor and Execution state
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [executionTime, setExecutionTime] = useState(null);
  const [insight, setInsight] = useState(explanation || '');
  const [status, setStatus] = useState('idle'); // 'idle', 'compiling', 'success', 'error', 'timeout'
  const [activeConsoleTab, setActiveConsoleTab] = useState('output'); // 'output', 'stdin', 'expected', 'insight'
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isOutputCopied, setIsOutputCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSavedToProfile, setIsSavedToProfile] = useState(false);
  const [isFormatted, setIsFormatted] = useState(false);

  const editorRef = useRef(null);
  const preMirrorRef = useRef(null);

  const currentCode = fileContents[activeFileName] || '';
  const requiresInput = currentCode.includes('Scanner') || currentCode.includes('System.in') || currentCode.includes('BufferedReader');

  // Track cursor position
  const handleSelectOrChange = (e) => {
    const text = e.target.value;
    const selStart = e.target.selectionStart;
    const lines = text.substring(0, selStart).split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    setCursorPos({ line, col });
  };

  const handleSaveToProfile = () => {
    try {
      const saved = localStorage.getItem('threadspeak_saved_solutions');
      const list = saved ? JSON.parse(saved) : [];
      
      const currentScenario = scenarios[selectedScenarioKey];
      const solTitle = currentScenario?.title || title || 'Custom Java Solution';
      
      const newSol = {
        id: `sol-${Date.now()}`,
        title: solTitle,
        scenarioId: selectedScenarioKey || scenarioId || 'custom',
        category: currentScenario?.category || (isMultiFile ? 'System Design LLD' : 'Java 21'),
        code: fileContents[activeFileName] || Object.values(fileContents)[0] || initialCode,
        output: output || 'Program compiled and verified.',
        status: status === 'error' ? 'Draft' : 'Solved ✓',
        savedAt: new Date().toISOString()
      };

      const updated = [newSol, ...list.filter(item => item.title !== newSol.title)];
      localStorage.setItem('threadspeak_saved_solutions', JSON.stringify(updated));
      setIsSavedToProfile(true);
      setTimeout(() => setIsSavedToProfile(false), 2500);
    } catch (e) {
      console.warn("Failed to save solution to profile:", e);
    }
  };

  // Format Code Helper (Java standard indentation)
  const handleFormatCode = () => {
    const lines = currentCode.split('\n');
    let indentLevel = 0;
    const formatted = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      const indented = '    '.repeat(indentLevel) + trimmed;
      if (trimmed.endsWith('{') || trimmed.endsWith('[') || (trimmed.endsWith('(') && !trimmed.startsWith('for'))) {
        indentLevel++;
      }
      return indented;
    }).join('\n');

    handleCodeChange(formatted);
    setIsFormatted(true);
    setTimeout(() => setIsFormatted(false), 1500);
  };

  // Load scenarios if scenario picker is enabled
  useEffect(() => {
    if (showScenarioPicker) {
      async function loadScenarios() {
        try {
          const data = await fetchCodeScenarios();
          if (data && Object.keys(data).length > 0) {
            setScenarios(data);
            const defaultKey = data[initialScenarioId] ? initialScenarioId : Object.keys(data)[0];
            setSelectedScenarioKey(defaultKey);
            const initialScenarioCode = data[defaultKey]?.initialCode || initialCode;
            setFileContents({ "Main.java": initialScenarioCode });
            setActiveFileName("Main.java");
            setOpenTabs(["Main.java"]);
          }
        } catch (e) {
          console.warn("Failed to load code scenarios:", e);
        }
      }
      loadScenarios();
    }
  }, [showScenarioPicker, initialScenarioId]);

  // Sync props when initialCode or files change
  useEffect(() => {
    if (isMultiFile) {
      setFileContents({ ...files });
      const keys = Object.keys(files);
      if (initialActiveFile && files[initialActiveFile]) {
        setActiveFileName(initialActiveFile);
      } else if (keys.length > 0) {
        setActiveFileName(keys[0]);
      }
      setOpenTabs(keys.slice(0, 4));
    } else if (initialCode) {
      setFileContents({ [title]: initialCode });
      setActiveFileName(title);
      setOpenTabs([title]);
      setStdin(getSmartDefaultStdin(initialCode));
    }
  }, [files, initialCode, title]);

  // Switch active tab/file
  const handleSelectFile = (fileName) => {
    setActiveFileName(fileName);
    if (!openTabs.includes(fileName)) {
      setOpenTabs([...openTabs, fileName]);
    }
  };

  // Close tab
  const handleCloseTab = (fileName, e) => {
    e.stopPropagation();
    const updated = openTabs.filter(f => f !== fileName);
    setOpenTabs(updated);
    if (activeFileName === fileName && updated.length > 0) {
      setActiveFileName(updated[updated.length - 1]);
    }
  };

  // Code edit handler
  const handleCodeChange = (newText) => {
    setFileContents(prev => ({
      ...prev,
      [activeFileName]: newText
    }));
  };

  // Sync scroll between textarea and syntax highlight pre layer
  const handleScroll = (e) => {
    if (preMirrorRef.current) {
      preMirrorRef.current.scrollTop = e.target.scrollTop;
      preMirrorRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  // Run / Execute code via Microfrontend API client with stdin
  const handleRun = async () => {
    setIsRunning(true);
    setStatus('compiling');
    setOutput('Compiling and executing Java 21 bytecodes...');
    setError(null);
    setActiveConsoleTab('output');

    const startTime = performance.now();

    try {
      const activeCode = fileContents[activeFileName] || Object.values(fileContents)[0];
      const payloadFiles = isMultiFile ? fileContents : null;
      const currentStdin = stdin || getSmartDefaultStdin(activeCode);

      const res = await runCodeApi(
        selectedScenarioKey || scenarioId, 
        activeCode, 
        payloadFiles, 
        currentStdin
      );

      const elapsed = Math.round(performance.now() - startTime);
      setExecutionTime(res.executionTimeMs || elapsed);

      if (res.success || res.status === 'SUCCESS') {
        setStatus('success');
        setOutput(res.output || 'Program executed cleanly with exit code 0.');
      } else {
        setStatus(res.status === 'TIMEOUT' ? 'timeout' : 'error');
        setOutput(res.output || res.error || 'Execution failed.');
        setError(res.error || 'Runtime error');
      }
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      setExecutionTime(elapsed);
      setStatus('error');
      setOutput(`Error: ${err.message || 'Failed to connect to Java execution runner'}`);
      setError(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  // Reset code to initial state
  const handleReset = () => {
    if (isMultiFile) {
      setFileContents({ ...files });
    } else if (showScenarioPicker && scenarios[selectedScenarioKey]) {
      setFileContents({ "Main.java": scenarios[selectedScenarioKey].initialCode });
    } else {
      setFileContents({ [title]: initialCode });
    }
    setStdin(getSmartDefaultStdin(initialCode));
    setOutput('');
    setStatus('idle');
    setError(null);
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    const activeCode = fileContents[activeFileName] || '';
    navigator.clipboard.writeText(activeCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Copy output
  const handleCopyOutput = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setIsOutputCopied(true);
      setTimeout(() => setIsOutputCopied(false), 2000);
    }
  };

  // Clear output console
  const handleClearOutput = () => {
    setOutput('');
    setStatus('idle');
  };

  // Keyboard shortcut: Tab support + Ctrl+Enter / Cmd+Enter to Run
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRun();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const val = e.target.value;
      const newVal = val.substring(0, start) + '    ' + val.substring(end);
      handleCodeChange(newVal);
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const lineCount = Math.max(currentCode.split('\n').length, 12);
  const highlightedCode = highlightJavaCode(currentCode, isLightMode);

  // Check if output matches expected output
  const isOutputMatching = expectedOutput && output && output.trim().includes(expectedOutput.trim());

  return (
    <div className={`rounded-3xl border shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
      isLightMode 
        ? 'border-slate-300 bg-white shadow-slate-300/60' 
        : 'border-slate-800/90 bg-[#080D18]'
    } ${
      isFullscreen 
        ? 'fixed inset-4 z-50 backdrop-blur-xl border-cyan-500/50 shadow-2xl shadow-cyan-950/80' 
        : 'my-6'
    }`}>
      
      {/* Top Header Bar */}
      {showHeader && (
        <div className={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 select-none transition-colors duration-200 ${
          isLightMode ? 'bg-[#F8FAFC] border-slate-200 text-slate-800' : 'bg-[#0A101F] border-slate-800 text-white'
        }`}>
          {/* Left: Window Controls, Breadcrumbs, & Language Tag */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-sm" />
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className={isLightMode ? 'text-slate-400 hidden sm:inline' : 'text-slate-500 hidden sm:inline'}>src &gt;</span>
              <span className={`p-1 rounded-lg border text-[11px] ${
                isLightMode ? 'bg-orange-100 text-orange-600 border-orange-300' : 'bg-orange-950/80 text-orange-400 border-orange-800'
              }`}>☕</span>
              <span className={`font-bold tracking-tight ${isLightMode ? 'text-slate-900' : 'text-slate-100'}`}>
                {title}
              </span>
              <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${
                isLightMode ? 'bg-cyan-100 text-cyan-800 border-cyan-300' : 'bg-cyan-950/90 text-cyan-300 border-cyan-800'
              }`}>
                Java 21 JVM
              </span>
              {requiresInput && (
                <span className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-semibold ${
                  isLightMode ? 'bg-purple-100 text-purple-800 border-purple-300' : 'bg-purple-950/80 text-purple-300 border-purple-800'
                }`}>
                  <Keyboard className="w-3 h-3 text-purple-500" />
                  <span>Scanner Stdin</span>
                </span>
              )}
            </div>
          </div>

          {/* Right Action Toolbar: Dark/Light Mode, Font Controls, Format, Save, Copy, Reset, Run */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Theme Toggle Icon (Sun / Moon) */}
            <button
              onClick={() => setIsLightMode(!isLightMode)}
              className={`p-2 rounded-xl border text-xs transition flex items-center gap-1.5 ${
                isLightMode
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-800 border-amber-300 shadow-sm'
                  : 'bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 border-slate-800'
              }`}
              title={isLightMode ? "Switch to Dark Theme 🌙" : "Switch to Light Theme ☀️"}
            >
              {isLightMode ? <Sun className="w-3.5 h-3.5 text-amber-600 fill-amber-500" /> : <Moon className="w-3.5 h-3.5 text-cyan-400" />}
              <span className="hidden xl:inline text-[11px] font-semibold">{isLightMode ? 'Light' : 'Dark'}</span>
            </button>

            {/* Font Zoom */}
            <div className={`hidden sm:flex items-center border rounded-xl px-1.5 py-0.5 text-xs ${
              isLightMode ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}>
              <button 
                onClick={() => setFontSize(prev => Math.max(11, prev - 1))}
                className="p-1 hover:text-slate-900 dark:hover:text-white transition"
                title="Decrease Font Size"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <span className={`px-1.5 text-[10px] font-mono ${isLightMode ? 'text-slate-700 font-bold' : 'text-slate-300'}`}>{fontSize}px</span>
              <button 
                onClick={() => setFontSize(prev => Math.min(18, prev + 1))}
                className="p-1 hover:text-slate-900 dark:hover:text-white transition"
                title="Increase Font Size"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
            </div>

            {/* Auto Format Code */}
            <button
              onClick={handleFormatCode}
              className={`p-2 rounded-xl border text-xs transition flex items-center gap-1 ${
                isLightMode 
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border-slate-800'
              }`}
              title="Auto Format / Prettify Java Code"
            >
              <AlignLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px] font-medium">{isFormatted ? 'Formatted!' : 'Format'}</span>
            </button>

            {/* Save to Profile */}
            <button
              onClick={handleSaveToProfile}
              className={`p-2 rounded-xl border text-xs transition flex items-center gap-1.5 ${
                isSavedToProfile
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : isLightMode
                  ? 'bg-slate-100 hover:bg-slate-200 text-amber-700 border-slate-300'
                  : 'bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-amber-200 border-slate-800'
              }`}
              title="Save Solution to Profile"
            >
              {isSavedToProfile ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5 text-amber-400" />}
              <span className="hidden sm:inline text-[11px] font-semibold">{isSavedToProfile ? 'Saved!' : 'Save'}</span>
            </button>

            {/* Copy Code */}
            <button
              onClick={handleCopyCode}
              className={`p-2 rounded-xl border text-xs transition flex items-center gap-1.5 ${
                isLightMode 
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
              }`}
              title="Copy Code"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px]">{isCopied ? 'Copied!' : 'Copy'}</span>
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className={`p-2 rounded-xl border text-xs transition ${
                isLightMode 
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
              }`}
              title="Reset to Initial Code"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`p-2 rounded-xl border text-xs transition ${
                isLightMode 
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
              }`}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Workspace"}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* High-Impact Compile & Run Button */}
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition shadow-lg ${
                isRunning
                  ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/30 hover:scale-[1.02] active:scale-[0.98]'
              }`}
              title="Compile and Execute Java Code (Ctrl + Enter)"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Running...' : 'Compile & Run'}</span>
              <span className="hidden lg:inline text-[10px] opacity-75 font-mono px-1 py-0.2 rounded bg-black/30">
                Ctrl+↵
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Editor & Terminal Grid */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 ${isFullscreen ? 'flex-1 min-h-0' : ''}`}>
        
        {/* Left: Code Editor (7 cols) */}
        <div className={`lg:col-span-7 border-b lg:border-b-0 lg:border-r flex flex-col transition-colors duration-200 ${
          isLightMode ? 'border-slate-200 bg-[#FAFAFA]' : 'border-slate-800 bg-[#050811]'
        }`}>
          
          {/* File Tabs Bar (Only shown for multi-file projects) */}
          {isMultiFile && openTabs.length > 0 && (
            <div className={`flex items-center gap-1 px-3 pt-2 border-b overflow-x-auto select-none custom-scrollbar ${
              isLightMode ? 'bg-[#F1F5F9] border-slate-200' : 'bg-[#080D18] border-slate-800'
            }`}>
              {openTabs.map((fName) => {
                const isActive = activeFileName === fName;
                return (
                  <div
                    key={fName}
                    onClick={() => handleSelectFile(fName)}
                    className={`group px-3 py-1.5 rounded-t-xl text-xs font-mono font-medium flex items-center gap-2 cursor-pointer transition border-t border-x ${
                      isActive
                        ? isLightMode ? 'bg-[#FAFAFA] text-blue-600 border-slate-300 font-bold shadow-sm' : 'bg-[#050811] text-cyan-300 border-slate-700/80 font-bold shadow-sm'
                        : isLightMode ? 'bg-slate-200/70 text-slate-600 hover:bg-slate-200' : 'bg-slate-900/60 text-slate-400 border-transparent hover:bg-slate-800/80 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[11px]">☕</span>
                    <span>{fName}</span>
                    {openTabs.length > 1 && (
                      <button
                        onClick={(e) => handleCloseTab(fName, e)}
                        className="text-slate-400 hover:text-rose-500 rounded p-0.5 opacity-0 group-hover:opacity-100 transition"
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Code Editor Body */}
          <div className={`relative flex flex-1 overflow-hidden transition-colors duration-200 ${
            isLightMode ? 'bg-[#FFFFFF]' : 'bg-[#070B16]'
          } ${defaultHeight}`}>
            {/* Gutter Line Numbers with Active Line Highlight */}
            <div className={`w-12 py-4 select-none border-r text-right pr-3 font-mono text-xs leading-6 shrink-0 z-20 font-bold transition-colors duration-200 ${
              isLightMode 
                ? 'bg-[#F8FAFC] border-slate-200 text-slate-400' 
                : 'bg-[#090F1E] border-slate-800/90 text-slate-500'
            }`}>
              {Array.from({ length: lineCount }, (_, i) => {
                const lineNum = i + 1;
                const isCurrentLine = cursorPos.line === lineNum;
                return (
                  <div 
                    key={lineNum} 
                    className={
                      isCurrentLine 
                        ? (isLightMode ? 'text-blue-600 font-black' : 'text-cyan-400 font-black') 
                        : ''
                    }
                  >
                    {lineNum}
                  </div>
                );
              })}
            </div>

            {/* Synced Syntax Mirror & Editable Textarea */}
            <div className={`relative flex-1 overflow-auto transition-colors duration-200 ${
              isLightMode ? 'bg-[#FFFFFF]' : 'bg-[#070B16]'
            }`}>
              
              {/* Syntax Highlighted Mirror Pre Underneath */}
              <pre
                ref={preMirrorRef}
                aria-hidden="true"
                style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
                  fontSize: `${fontSize}px`,
                  lineHeight: '24px',
                  tabSize: 4
                }}
                className="absolute inset-0 p-4 font-mono leading-6 pointer-events-none whitespace-pre overflow-hidden"
                dangerouslySetInnerHTML={{ __html: highlightedCode + '\n' }}
              />

              {/* Editable Textarea on Top */}
              <textarea
                ref={editorRef}
                value={currentCode}
                onChange={(e) => {
                  handleCodeChange(e.target.value);
                  handleSelectOrChange(e);
                }}
                onClick={handleSelectOrChange}
                onKeyUp={handleSelectOrChange}
                onScroll={handleScroll}
                onKeyDown={handleKeyDown}
                spellCheck="false"
                style={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
                  fontSize: `${fontSize}px`,
                  lineHeight: '24px',
                  tabSize: 4
                }}
                className={`relative z-10 w-full h-full p-4 bg-transparent text-transparent font-mono leading-6 resize-none focus:outline-none whitespace-pre overflow-auto ${
                  isLightMode 
                    ? 'caret-blue-600 selection:bg-blue-200 selection:text-slate-900' 
                    : 'caret-cyan-400 selection:bg-cyan-500/30 selection:text-white'
                }`}
                placeholder="// Write or edit Java code here..."
              />
            </div>
          </div>

          {/* Bottom Editor Status Bar */}
          <div className={`px-4 py-1.5 border-t text-[11px] font-mono flex items-center justify-between select-none transition-colors duration-200 ${
            isLightMode ? 'bg-[#F8FAFC] border-slate-200 text-slate-500' : 'bg-[#090F1E] border-slate-800 text-slate-500'
          }`}>
            <div className="flex items-center gap-3">
              <span className={isLightMode ? 'text-slate-600' : 'text-slate-400'}>
                Ln <b className={isLightMode ? 'text-slate-900' : 'text-slate-200'}>{cursorPos.line}</b>, Col <b className={isLightMode ? 'text-slate-900' : 'text-slate-200'}>{cursorPos.col}</b>
              </span>
              <span>UTF-8</span>
              <span>Spaces: 4</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={isLightMode ? 'text-emerald-600 font-bold' : 'text-emerald-400 font-bold'}>● Ready</span>
            </div>
          </div>
        </div>

        {/* Right: JVM Terminal Console (5 cols) */}
        <div className={`lg:col-span-5 flex flex-col transition-colors duration-200 ${
          isLightMode ? 'bg-[#F8FAFC]' : 'bg-[#080D18]'
        }`}>
          
          {/* Terminal Tabs */}
          <div className={`px-4 py-2.5 border-b flex items-center justify-between gap-2 select-none overflow-x-auto custom-scrollbar transition-colors duration-200 ${
            isLightMode ? 'bg-[#F1F5F9] border-slate-200' : 'bg-[#0A101E] border-slate-800'
          }`}>
            <div className="flex items-center gap-1.5 shrink-0">
              <Terminal className={`w-4 h-4 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} />
              <div className={`flex items-center gap-1 text-xs font-mono font-bold ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                <button
                  onClick={() => setActiveConsoleTab('output')}
                  className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1.5 ${
                    activeConsoleTab === 'output'
                      ? isLightMode ? 'bg-white text-slate-900 font-bold shadow-sm border border-slate-200' : 'bg-slate-800 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>Output Console</span>
                </button>

                <button
                  onClick={() => setActiveConsoleTab('stdin')}
                  className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1.5 ${
                    activeConsoleTab === 'stdin'
                      ? isLightMode ? 'bg-purple-100 text-purple-900 border border-purple-300 font-bold' : 'bg-purple-900/90 text-purple-200 border border-purple-700 font-bold'
                      : requiresInput
                      ? isLightMode ? 'text-purple-700 hover:text-purple-900' : 'text-purple-400 hover:text-purple-300'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Keyboard className="w-3 h-3" />
                  <span>Input (stdin)</span>
                  {stdin && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                </button>

                {expectedOutput && (
                  <button
                    onClick={() => setActiveConsoleTab('expected')}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      activeConsoleTab === 'expected'
                        ? isLightMode ? 'bg-white text-slate-900 font-bold shadow-sm border border-slate-200' : 'bg-slate-800 text-white font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Expected
                  </button>
                )}
              </div>
            </div>

            {/* Metrics & Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {executionTime !== null && (
                <span className={`flex items-center gap-1 text-[11px] font-mono ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  <Clock className={`w-3 h-3 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} /> {executionTime}ms
                </span>
              )}

              {output && (
                <>
                  <button
                    onClick={handleCopyOutput}
                    className={`p-1 rounded-lg transition ${isLightMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}
                    title="Copy Console Output"
                  >
                    {isOutputCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={handleClearOutput}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition"
                    title="Clear Terminal Output"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Verification Banner if output matches expected */}
          {isOutputMatching && (
            <div className={`px-4 py-1.5 border-b flex items-center justify-between text-xs font-mono animate-in fade-in ${
              isLightMode 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-emerald-950/70 border-emerald-800/80 text-emerald-300'
            }`}>
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Output matches expected specification!</span>
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                isLightMode ? 'bg-emerald-100 border-emerald-300 font-bold' : 'bg-emerald-900/80 border-emerald-700'
              }`}>
                100% Correct
              </span>
            </div>
          )}

          {/* Console Content Area */}
          <div className={`p-4 flex-1 font-mono text-xs sm:text-[13px] leading-relaxed overflow-auto select-text ${defaultHeight}`}>
            
            {/* Tab 1: Output Console */}
            {activeConsoleTab === 'output' && (
              output ? (
                <pre className={`whitespace-pre-wrap font-mono ${
                  status === 'error'
                    ? (isLightMode ? 'text-rose-700 font-semibold' : 'text-rose-300 font-medium')
                    : status === 'timeout'
                    ? (isLightMode ? 'text-amber-700' : 'text-amber-300')
                    : (isLightMode ? 'text-emerald-800 font-medium' : 'text-emerald-300')
                }`}>
                  {output}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
                  <Terminal className={`w-8 h-8 ${isLightMode ? 'text-slate-300' : 'text-slate-700'} animate-pulse`} />
                  <p className="text-xs">Click <span className="text-emerald-600 font-bold">Compile &amp; Run</span> (or press <kbd className={`px-1.5 py-0.5 rounded border ${isLightMode ? 'bg-slate-200 border-slate-300 text-slate-800' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>Ctrl+Enter</kbd>) to execute.</p>
                  <p className={`text-[11px] ${isLightMode ? 'text-slate-500' : 'text-slate-600'}`}>
                    {requiresInput 
                      ? '💡 Standard input (stdin) supported! Switch to "Input (stdin)" tab to customize values.' 
                      : 'Accurate in-browser Java 21 execution engine.'}
                  </p>
                </div>
              )
            )}

            {/* Tab 2: Custom Standard Input (stdin) Tab */}
            {activeConsoleTab === 'stdin' && (
              <div className="h-full flex flex-col space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className={`text-xs font-bold font-mono flex items-center gap-1.5 ${isLightMode ? 'text-purple-800' : 'text-purple-300'}`}>
                    <Keyboard className="w-3.5 h-3.5" />
                    <span>Standard Input (stdin)</span>
                  </span>
                  <button
                    onClick={() => setStdin(getSmartDefaultStdin(currentCode))}
                    className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    Reset to Default Inputs
                  </button>
                </div>
                <p className={`text-[11px] font-sans ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Enter custom values for Scanner to read (one input per line or separated by spaces):
                </p>
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  className={`flex-1 w-full p-3 rounded-xl border font-mono text-xs focus:outline-none resize-none ${
                    isLightMode 
                      ? 'bg-white border-purple-300 text-purple-900 focus:border-purple-500' 
                      : 'bg-slate-950 border-purple-900/60 text-purple-200 focus:border-purple-500'
                  }`}
                  placeholder="Enter inputs here (e.g.&#10;45&#10;89)"
                  rows={6}
                />
                <div className={`flex items-center justify-between pt-1 text-[11px] font-mono ${isLightMode ? 'text-slate-500' : 'text-slate-500'}`}>
                  <span>Input lines: {stdin.split('\n').filter(Boolean).length}</span>
                  <button
                    onClick={handleRun}
                    className="px-3 py-1 rounded-lg bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs flex items-center gap-1 transition"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run with this Input</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Expected Output Tab */}
            {activeConsoleTab === 'expected' && (
              <div className="space-y-2">
                <div className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isLightMode ? 'text-slate-600' : 'text-slate-500'}`}>
                  Target Expected Output Specification:
                </div>
                <pre className={`whitespace-pre-wrap font-mono p-3 rounded-xl border ${
                  isLightMode 
                    ? 'bg-white border-slate-200 text-emerald-800' 
                    : 'bg-slate-950 border-slate-800 text-emerald-300'
                }`}>
                  {expectedOutput}
                </pre>
              </div>
            )}
          </div>

          {/* Bottom Terminal Status Bar */}
          <div className={`px-4 py-1.5 border-t text-[11px] font-mono flex items-center justify-between select-none transition-colors duration-200 ${
            isLightMode ? 'bg-[#F1F5F9] border-slate-200 text-slate-600' : 'bg-[#0A101E] border-slate-800 text-slate-500'
          }`}>
            <span className="flex items-center gap-2">
              <Cpu className={`w-3 h-3 ${isLightMode ? 'text-blue-600' : 'text-cyan-400'}`} />
              <span>OpenJDK 21.0.2 LTS</span>
            </span>
            <span className={isLightMode ? 'text-slate-700' : 'text-slate-400'}>
              Exit Code: <b className={status === 'error' ? 'text-rose-500' : 'text-emerald-500'}>{status === 'error' ? 1 : 0}</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * High-Performance Syntax Highlighter with Distinct Vibrant Colors for Java 21 (Dark & Light Mode)
 */
function highlightJavaCode(code, isLightMode = false) {
  if (!code) return '';

  const keywords = new Set([
    'abstract', 'assert', 'break', 'case', 'catch', 'class', 'const', 
    'continue', 'default', 'do', 'else', 'enum', 'extends', 'final', 
    'finally', 'for', 'goto', 'if', 'implements', 'import', 'instanceof', 
    'interface', 'native', 'new', 'package', 'private', 'protected', 
    'public', 'return', 'static', 'strictfp', 'super', 'switch', 
    'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 
    'volatile', 'while', 'record', 'sealed', 'permits', 'yield', 'non-sealed'
  ]);

  const primitiveTypes = new Set([
    'int', 'boolean', 'char', 'double', 'float', 'long', 'byte', 'short', 'void', 'var'
  ]);

  const classTypes = new Set([
    'String', 'Scanner', 'System', 'Math', 'Arrays', 'Integer', 'Double', 
    'Boolean', 'Character', 'Float', 'Long', 'Byte', 'Short', 'Object', 
    'Class', 'Thread', 'Runnable', 'List', 'ArrayList', 'Map', 'HashMap', 
    'Set', 'HashSet', 'Optional', 'BufferedReader', 'InputStreamReader', 
    'StringBuilder', 'StringBuffer', 'Exception', 'RuntimeException'
  ]);

  const builtInMethods = new Set([
    'out', 'err', 'in', 'println', 'print', 'printf', 'nextInt', 'next', 
    'nextLine', 'nextDouble', 'nextFloat', 'nextLong', 'close', 'main', 
    'pow', 'sqrt', 'abs', 'min', 'max', 'length', 'charAt', 'substring', 
    'equals', 'toString', 'deepToString', 'indexOf', 'sort', 'binarySearch',
    'fill', 'copyOf', 'mismatch', 'parallelSort'
  ]);

  const escapeHtml = (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  // Safe Tokenizer regex using non-capturing groups for internal alternation
  const tokenRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(@[a-zA-Z0-9_]+)|\b(0x[0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFdDlL]?)\b|\b([a-zA-Z_][a-zA-Z0-9_]*)\b|([{}()[\];,=+\-*/%<>!&|^~]+)/g;

  return code.replace(
    tokenRegex,
    (match, comment, str, annotation, num, ident, op) => {
      // 1. Comments (Muted Slate Grey Italic)
      if (comment) {
        return `<span style="color: ${isLightMode ? '#64748b' : '#64748b'}; font-style: italic;">${escapeHtml(comment)}</span>`;
      }
      
      // 2. String & Character Literals (Bright Emerald / Jade Green)
      if (str) {
        return `<span style="color: ${isLightMode ? '#059669' : '#4ade80'}; font-weight: 600;">${escapeHtml(str)}</span>`;
      }
      
      // 3. Annotations (Golden Yellow)
      if (annotation) {
        return `<span style="color: ${isLightMode ? '#b45309' : '#facc15'}; font-weight: 700;">${escapeHtml(annotation)}</span>`;
      }
      
      // 4. Numbers (Vibrant Pink / Coral)
      if (num) {
        return `<span style="color: ${isLightMode ? '#e11d48' : '#f43f5e'}; font-weight: 700;">${escapeHtml(num)}</span>`;
      }
      
      // 5. Identifiers (Keywords, Types, Classes, Builtins, Variables)
      if (ident) {
        const safeIdent = escapeHtml(ident);
        // Control flow & Java reserved keywords (Vibrant Electric Orange)
        if (keywords.has(ident)) {
          return `<span style="color: ${isLightMode ? '#ea580c' : '#fb923c'}; font-weight: 800;">${safeIdent}</span>`;
        }
        // Primitive Types (Vibrant Electric Cyan)
        if (primitiveTypes.has(ident)) {
          return `<span style="color: ${isLightMode ? '#0284c7' : '#38bdf8'}; font-weight: 800;">${safeIdent}</span>`;
        }
        // Reference Class Types & Interfaces (Vibrant Purple / Indigo)
        if (classTypes.has(ident)) {
          return `<span style="color: ${isLightMode ? '#7c3aed' : '#c084fc'}; font-weight: 800;">${safeIdent}</span>`;
        }
        // Standard Methods & Stream Properties (Vibrant Amber Gold)
        if (builtInMethods.has(ident)) {
          return `<span style="color: ${isLightMode ? '#d97706' : '#facc15'}; font-weight: 700;">${safeIdent}</span>`;
        }
        // Standard variable / identifier names (Dark slate in light mode, crisp white in dark mode)
        return `<span style="color: ${isLightMode ? '#0f172a' : '#f8fafc'}; font-weight: 500;">${safeIdent}</span>`;
      }
      
      // 6. Operators & Punctuation (Vibrant Rose / Orchid)
      if (op) {
        return `<span style="color: ${isLightMode ? '#db2777' : '#ec4899'}; font-weight: 600;">${escapeHtml(op)}</span>`;
      }
      
      return escapeHtml(match);
    }
  );
}
