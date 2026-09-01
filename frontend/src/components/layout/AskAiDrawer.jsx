import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Sparkles, Send, Bot, User, Code2, 
  HelpCircle, Zap, RefreshCw, MessageSquare,
  Check, Trash2, Cpu, ArrowUp, Plus, History, FileImage, Layers
} from 'lucide-react';
import { marked } from 'marked';

/**
 * AskAiDrawer / ThreadSpeak AI Assistant
 * - 100% built-in, zero-setup AI tutor (no API keys required)
 * - Ultra-simple, beginner-friendly explanations (ELI10)
 * - Dynamically grounded in whatever topic is active (What is Java, Arrays, Strings, OOP, Exceptions, System Design)
 * - 3 clean bullet points, 1 memorable analogy, and quick 2-line code snippets
 */
export default function AskAiDrawer({
  isOpen,
  onClose,
  currentTopic,
  initialPayload
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello! I'm **ThreadSpeak AI**.\n\nAsk me anything about **${currentTopic?.title || 'this topic'}** or click **✨ Explain with AI** on any diagram for a quick breakdown!`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Sync conversation / welcome message when topic changes
  const lastTopicIdRef = useRef(currentTopic?.id);
  useEffect(() => {
    if (currentTopic?.id && currentTopic.id !== lastTopicIdRef.current) {
      lastTopicIdRef.current = currentTopic.id;
      setMessages([
        {
          id: Date.now(),
          sender: 'ai',
          text: `Hello! I'm **ThreadSpeak AI**.\n\nAsk me anything about **${currentTopic.title}** or click **✨ Explain with AI** on any diagram for a quick breakdown!`
        }
      ]);
    }
  }, [currentTopic?.id, currentTopic?.title]);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isTyping, isOpen]);

  // Simple suggested prompt chips
  const suggestedPrompts = [
    `Explain ${currentTopic?.title || 'this'} in simple words`,
    'Give a real-world analogy',
    'Show a simple code example',
    'What is the #1 interview tip?'
  ];

  // Handle incoming initialPayload (e.g. from clicking "Explain with AI" on any image/visualizer)
  const lastProcessedPayloadIdRef = useRef(null);

  useEffect(() => {
    if (isOpen && initialPayload) {
      const payloadKey = initialPayload.topicTitle || initialPayload.prompt || JSON.stringify(initialPayload.visualPreview || {});
      if (payloadKey === lastProcessedPayloadIdRef.current) return;
      lastProcessedPayloadIdRef.current = payloadKey;

      const { prompt, visualPreview, topicTitle, topic: payloadTopic } = initialPayload;
      const targetTopic = payloadTopic || currentTopic;
      const effectiveTitle = topicTitle || visualPreview?.title?.replace(/ Visualization/i, '') || targetTopic?.title || 'This Concept';

      const userMsg = {
        id: Date.now(),
        sender: 'user',
        text: prompt || `Explain ${effectiveTitle}:`,
        visualPreview
      };

      const aiReply = generateSimpleTopicResponse(
        prompt || `Explain ${effectiveTitle}`,
        visualPreview,
        targetTopic
      );

      setMessages(prev => [
        ...prev,
        userMsg,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiReply
        }
      ]);
      setIsTyping(false);
    }
  }, [isOpen, initialPayload, currentTopic]);

  /**
   * Ultra-Simple, Topic-Specific AI Response Generator
   * Precisely customized for whatever topic is open:
   * What is Java, Program Structure, Arrays, Strings, OOP, Exceptions, System Design, DSA
   */
  const generateSimpleTopicResponse = (promptText, visualContext = null, topicOverride = null) => {
    const activeTopic = topicOverride || currentTopic;
    const rawTitle = visualContext?.title?.replace(/ Visualization/i, '') || activeTopic?.title || 'Java Concept';
    const title = rawTitle.trim();
    const t = title.toLowerCase();
    const p = (promptText + ' ' + title).toLowerCase();

    // 1. WHAT IS JAVA / JAVA INTRODUCTION / FEATURES
    if (t.includes('what is java') || (t.includes('java') && t.includes('intro')) || t.includes('features of java')) {
      return `### ☕ **${title} (Made Simple)**

**Java** is a popular, high-level programming language known for its **"Write Once, Run Anywhere" (WORA)** superpower.

#### 🔑 3 Key Points to Know:
1. **Platform Independent**: Java code compiles into **Bytecode** (\`.class\`), which can run on any device with a JVM installed (Windows, Mac, Linux).
2. **Object-Oriented (OOP)**: Everything in Java revolves around **Classes** (blueprints) and **Objects** (real entities).
3. **Automatic Memory Management**: You don't need to manually free memory — Java's **Garbage Collector** cleans up unused memory automatically!

---

> 📱 **Real-World Analogy**:
> Think of Java Bytecode like **English as a universal language** — no matter what country you visit, as long as there is an interpreter (JVM), everyone understands the same instructions!

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\``;
    }

    // 2. ARRAY TOPICS (1D, 2D, Matrix, Jagged, Intro)
    if (t.includes('array') || p.includes('array')) {
      return `### 💡 **${title} Made Simple**

An **Array** is a fixed-size container that stores multiple items of the same data type in continuous (side-by-side) memory slots.

#### 🔑 3 Key Points to Remember:
1. **0-Indexed**: The first item starts at index \`0\`, not \`1\`.
2. **Instant Lookup $O(1)$**: Access any item instantly using its index number (e.g., \`arr[2]\`).
3. **Fixed Size**: Once created in memory, its size cannot be changed.

---

> 🥚 **Real-World Analogy**:
> Think of an egg carton with 6 numbered slots side-by-side (\`0\` to \`5\`). Every slot holds one egg, and you can grab the 3rd egg directly without checking the others!

\`\`\`java
// Quick Example
int[] scores = {90, 85, 95};
int firstScore = scores[0]; // 90
\`\`\``;
    }

    // 3. STRING TOPICS (String Class, Immutability, SCP)
    if (t.includes('string') || p.includes('string')) {
      return `### 💡 **${title} Made Simple**

A **String** in Java is an object that stores a sequence of text characters (like \`"Hello"\`).

#### 🔑 3 Key Points to Remember:
1. **Immutable**: Once created, a String's text can never be altered.
2. **String Constant Pool (SCP)**: Identical strings share memory in the pool to save RAM.
3. **Comparing Strings**: Always use \`.equals()\` to compare text, never \`==\`.

---

> 📝 **Real-World Analogy**:
> A String is like writing in **permanent marker** on paper. If you want to change a word, you don't erase it — you write on a brand new sheet of paper!

\`\`\`java
// Quick Example
String name = "Alice";
String greeting = "Hello, " + name; // Creates a new String object
\`\`\``;
    }

    // 4. STRUCTURE OF JAVA PROGRAM / MAIN METHOD / TOKENS
    if (t.includes('structure') || t.includes('hello') || t.includes('main method') || t.includes('tokens') || t.includes('execution')) {
      return `### 💡 **${title} Made Simple**

Every Java program follows a clean, organized structure so the computer knows where to start.

#### 🔑 3 Key Parts:
1. **Class Envelope**: In Java, all code must live inside a \`class\`.
2. **Main Method**: \`public static void main(String[] args)\` is the entry door where execution begins.
3. **Two-Step Run**: The compiler (\`javac\`) translates code to bytecode, and the JVM executes it.

---

> 📖 **Real-World Analogy**:
> Think of a Java program like a **recipe in a cookbook**:
> - The **Class** is the recipe title.
> - The **Main method** is step #1 shouting *"Start cooking now!"*.

\`\`\`java
public class MyFirstProgram {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
\`\`\``;
    }

    // 5. VARIABLES, DATA TYPES, LITERALS, OPERATORS, KEYWORDS
    if (t.includes('variable') || t.includes('data type') || t.includes('literal') || t.includes('operator') || t.includes('keyword') || t.includes('identifier')) {
      return `### 💡 **${title} Made Simple**

**${title}** defines how data is stored, labeled, and manipulated in memory.

#### 🔑 3 Core Ideas:
1. **Strongly Typed**: Every variable must declare its type (e.g., \`int\`, \`double\`, \`boolean\`).
2. **Memory Allocation**: Primitive types store direct values in Stack memory; Object references point to Heap memory.
3. **Naming Rules**: Identifiers cannot start with digits or use reserved keywords.

---

> 📦 **Real-World Analogy**:
> Think of variables like **labeled storage boxes** in a pantry — you only put sugar in the box labeled *"Sugar"*, and flour in the box labeled *"Flour"*!

\`\`\`java
int age = 25;
double price = 19.99;
boolean isJavaFun = true;
\`\`\``;
    }

    // 6. OOP CONCEPTS (Classes, Objects, Inheritance, Polymorphism, Abstraction, Encapsulation, Interfaces)
    if (t.includes('class') || t.includes('object') || t.includes('oops') || t.includes('inherit') || t.includes('poly') || t.includes('encapsulat') || t.includes('abstract') || t.includes('interface')) {
      return `### 💡 **${title} Made Simple**

**${title}** is an Object-Oriented concept that makes code organized, reusable, and easy to maintain.

#### 🔑 3 Core Ideas:
1. **Blueprint & Instance**: A **Class** is the blueprint; an **Object** is the real thing built from it.
2. **Data Protection**: Variables are kept \`private\` and accessed through getter/setter methods.
3. **Reusability**: Shared code is inherited so you don't write the same logic twice.

---

> 🚗 **Real-World Analogy**:
> A Class is the **architect's blueprint** of a car. An Object is the **actual physical car** you drive on the road!

\`\`\`java
class Car {
    String model;
    void drive() { System.out.println("Driving..."); }
}
\`\`\``;
    }

    // 7. EXCEPTION HANDLING
    if (t.includes('exception') || t.includes('catch') || t.includes('throw') || t.includes('error')) {
      return `### 💡 **${title} Made Simple**

An **Exception** is an unexpected error that happens while your program is running (e.g. dividing by zero).

#### 🔑 The 3 Safety Blocks:
1. **\`try\`**: Put the risky code here that might fail.
2. **\`catch\`**: Catches the error and handles it smoothly so your app doesn't crash.
3. **\`finally\`**: Always executes (perfect for closing files or connections).

---

> 🛡️ **Real-World Analogy**:
> Like an **acrobat's safety net** — if the performer slips (\`try\`), the net catches them (\`catch\`) and they walk away safely!

\`\`\`java
try {
    int result = 10 / 0; // Risky!
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");
}
\`\`\``;
    }

    // 8. SYSTEM DESIGN / HLD / LLD
    if (t.includes('load') || t.includes('system') || t.includes('cache') || t.includes('distributed') || t.includes('database') || t.includes('scale') || t.includes('hld') || t.includes('lld')) {
      return `### 💡 **${title} Made Simple**

**${title}** is an architectural technique for building systems that can handle millions of users reliably.

#### 🔑 3 Big Ideas:
1. **Divide Traffic**: Distribute user requests evenly across multiple servers with a Load Balancer.
2. **Keep Servers Stateless**: Any server can answer any request, making scaling effortless.
3. **Cache Heavy Data**: Store frequent database results in Redis cache for instant speed.

---

> ✈️ **Real-World Analogy**:
> Like an **airport check-in line manager** who directs travelers to the next open counter so no single queue gets overloaded!`;
    }

    // 9. DEFAULT CLEAN TOPIC SUMMARY
    return `### 💡 **${title} Made Simple**

${activeTopic?.eli10 || activeTopic?.summary || `Understanding **${title}** gives you the foundational knowledge to write clean, reliable code.`}

#### 🔑 3 Quick Takeaways:
1. Master the basic syntax and core purpose.
2. Understand where and why it is used in real applications.
3. Practice with small code examples to build muscle memory.

---

> 💡 *Ask me any specific question about **${title}** below!*`;
  };

  const handleSendPrompt = (promptText) => {
    if (!promptText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: promptText.trim()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateSimpleTopicResponse(promptText.trim());
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: reply
        }
      ]);
      setIsTyping(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Responsive Drawer Panel */}
      <div className="relative w-full sm:w-[460px] md:w-[500px] max-w-full bg-[#0A0F1D] light:bg-white border-l border-slate-800 light:border-slate-200 shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-300 font-sans">
        
        {/* Header (ThreadSpeak AI) */}
        <div className="px-4 py-3.5 border-b border-slate-800/90 light:border-slate-200 flex items-center justify-between gap-3 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-cyan-950/40 light:bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* ThreadSpeak AI Glowing Icon */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-sm shrink-0">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-extrabold text-white light:text-slate-900 tracking-tight flex items-center gap-2 truncate">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent truncate">
                  ThreadSpeak AI
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 shrink-0">
                  AI Tutor
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 light:text-slate-500 truncate">
                {currentTopic?.title || 'Interactive Tutor'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* New Chat Button */}
            <button
              onClick={() => setMessages([{
                id: Date.now(),
                sender: 'ai',
                text: `New chat session! Ask me any question about **${currentTopic?.title || 'this topic'}**.`
              }])}
              className="p-1.5 rounded-lg bg-slate-900/80 light:bg-slate-200/80 hover:bg-slate-800 text-slate-300 light:text-slate-700 border border-slate-800 transition"
              title="New Chat"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900/80 light:bg-slate-200/80 hover:bg-slate-800 text-slate-300 light:text-slate-700 border border-slate-800 transition"
              title="Close Drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="p-2.5 bg-[#080C18] light:bg-slate-100 border-b border-slate-800/80 light:border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(prompt)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 light:bg-white hover:bg-slate-800 text-slate-300 light:text-slate-700 hover:text-cyan-300 border border-slate-800 light:border-slate-200 text-[11px] whitespace-nowrap transition flex items-center gap-1 shrink-0"
            >
              <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 sm:p-4 space-y-3.5 font-sans bg-transparent min-w-0">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-2.5 items-start min-w-0 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* AI Avatar */}
              {msg.sender === 'ai' && (
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                </div>
              )}

              <div className={`max-w-[92%] sm:max-w-[90%] space-y-2 min-w-0 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Visual Preview Card if included in message */}
                {msg.visualPreview && (
                  <div className="rounded-xl overflow-hidden border border-cyan-500/30 bg-[#070A12] p-2 shadow-lg max-w-full">
                    <div className="text-[10.5px] font-mono font-bold text-cyan-300 mb-1 flex items-center gap-1 px-1 truncate">
                      <FileImage className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{msg.visualPreview.title || 'Visualization'}</span>
                    </div>

                    {msg.visualPreview.src ? (
                      <img 
                        src={msg.visualPreview.src} 
                        alt={msg.visualPreview.title || 'Visualization'} 
                        className="w-full h-auto max-h-36 object-contain rounded-lg bg-[#0B0F1A]"
                      />
                    ) : (
                      <div className="p-2.5 rounded-lg bg-[#0B0F1A] border border-slate-800 text-center space-y-0.5">
                        <Layers className="w-5 h-5 text-cyan-400 mx-auto" />
                        <div className="text-[11px] font-bold text-slate-200 truncate">{msg.visualPreview.title}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Message Bubble with Markdown */}
                <div
                  className={`p-3 sm:p-3.5 rounded-xl text-xs sm:text-[12.5px] leading-relaxed break-words [overflow-wrap:anywhere] min-w-0 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-none shadow-sm font-medium'
                      : 'bg-[#111726] light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-200 light:text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(msg.text || '')
                  }}
                />
              </div>

              {/* User Avatar */}
              {msg.sender === 'user' && (
                <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                  <User className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 items-center">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
              </div>
              <div className="p-2.5 rounded-xl bg-[#111726] light:bg-slate-100 border border-slate-800 light:border-slate-200 text-slate-300 text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                <span className="text-[10.5px] text-cyan-300 font-mono">ThreadSpeak AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-3 bg-[#080C18] light:bg-white border-t border-slate-800 light:border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputText.trim()) handleSendPrompt(inputText.trim());
            }}
            className="relative"
          >
            <div className="p-2 rounded-xl bg-[#0F1524] light:bg-slate-50 border border-slate-700/80 light:border-slate-300 focus-within:border-cyan-500 transition shadow-inner space-y-1.5">
              <textarea
                rows={2}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (inputText.trim()) handleSendPrompt(inputText.trim());
                  }
                }}
                placeholder={`Ask ThreadSpeak AI about ${currentTopic?.title || 'this topic'}...`}
                className="w-full px-1.5 pt-0.5 bg-transparent text-xs sm:text-sm text-slate-100 light:text-slate-900 placeholder-slate-500 light:placeholder-slate-400 focus:outline-none resize-none"
              />

              <div className="flex items-center justify-between pt-1 border-t border-slate-800 light:border-slate-200 text-[10px] text-slate-500 font-mono">
                <span>Press <kbd className="px-1 py-0.2 rounded bg-slate-800 text-slate-300 font-bold">Enter</kbd> to send</span>
                
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-30 disabled:pointer-events-none text-white font-bold transition shadow-sm"
                >
                  <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
