import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, Send, Bot, User, Code2, 
  HelpCircle, Zap, ShieldCheck, RefreshCw, MessageSquare,
  Key, Settings, Check, ExternalLink, Trash2, Cpu
} from 'lucide-react';
import { marked } from 'marked';

/**
 * AskAiDrawer
 * Powered by Google Gemini AI:
 * - Direct integration with Google Gemini 1.5 / 2.0 Flash API
 * - Context-aware topic prompt grounding with ThreadSpeak curriculum
 * - API Key management with localStorage persistence & free Google AI Studio link
 * - High-yield preset prompt chips & markdown-formatted responses
 */
export default function AskAiDrawer({
  isOpen,
  onClose,
  currentTopic
}) {
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem('threadspeak_gemini_api_key') || '';
    } catch {
      return '';
    }
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello! I'm **Google Gemini AI**, your personal study companion for **${currentTopic?.title || 'Java & System Design'}**.\n\nAsk me anything: concept explanations, real-world analogies, code debugging, or interview questions!`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Suggested prompt chips based on current topic
  const suggestedPrompts = [
    'Explain this in simple words with an analogy',
    'What are the top interview questions on this topic?',
    'What is the difference between Checked and Unchecked Exceptions?',
    'Give me a production Java code example with best practices'
  ];

  // Save API key
  const handleSaveApiKey = (keyToSave) => {
    const cleanKey = (keyToSave || inputKey).trim();
    setApiKey(cleanKey);
    try {
      localStorage.setItem('threadspeak_gemini_api_key', cleanKey);
    } catch (e) {
      console.error(e);
    }
    setShowKeyModal(false);
  };

  // Call Google Gemini REST API or Fallback Grounded Engine
  const callGeminiApi = async (userPrompt) => {
    // 1. If API Key is present, call Google Gemini 1.5/2.0 API directly
    if (apiKey) {
      try {
        const systemInstruction = `You are Google Gemini AI, the expert pair-programming tutor and computer science professor on ThreadSpeak Academy.
You are currently helping a student master the topic: "${currentTopic?.title || 'Java Curriculum'}" (Category: ${currentTopic?.category || 'Core Java'}).
Topic Summary: ${currentTopic?.summary || ''}
Key Mental Model: ${currentTopic?.mentalModel || currentTopic?.eli10 || ''}

Guidelines:
1. Explain with crystal clarity, high accuracy, and engaging modern developer tone.
2. When answering, provide intuitive real-world analogies first.
3. Highlight common interview traps and edge cases.
4. Provide clean, production-grade Java code examples with syntax formatting when relevant.
5. Keep responses structured, concise, and formatted in beautiful GitHub-flavored Markdown.`;

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;

        const payload = {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${systemInstruction}\n\nUser Question:\n${userPrompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024
          }
        };

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData?.error?.message || `Gemini API Error (${res.status})`);
        }

        const data = await res.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText) {
          return candidateText;
        }
      } catch (err) {
        console.warn('[Gemini API Call Failed, switching to curriculum fallback]:', err);
        return `⚠️ **Gemini API Notice**: ${err.message}\n\n*Falling back to ThreadSpeak local AI knowledge engine:*\n\n${generateFallbackResponse(userPrompt)}`;
      }
    }

    // 2. Fallback curriculum engine if no custom key provided
    return generateFallbackResponse(userPrompt);
  };

  const generateFallbackResponse = (promptText) => {
    const p = promptText.toLowerCase();

    if (p.includes('analogy') || p.includes('simple') || p.includes('explain')) {
      return `💡 **Google Gemini Real-World Analogy for ${currentTopic?.title || 'this topic'}**:\n\n${
        currentTopic?.eli10 || 
        "Think of Checked Exceptions like a scheduled train delay notice (informed in advance by the station board so you MUST plan before boarding), whereas Unchecked Exceptions are like a sudden tire burst while driving at 100 km/h (happens unexpectedly at runtime without compiler warning)!"
      }\n\n> 🎯 **Core Concept**: Checked exceptions force handling at compile-time with \`try-catch\` or \`throws\`. Unchecked exceptions (\`RuntimeException\`) occur at runtime due to code logic flaws.`;
    } 
    
    if (p.includes('interview') || p.includes('trap') || p.includes('question')) {
      return `🎯 **Top 3 FAANG Interview Traps on ${currentTopic?.title || 'this topic'}**:\n\n1. **Is the \`Exception\` class in Java checked or unchecked?**\n   - *Answer:* **Checked!** It inherits directly from \`Throwable\` and is not a subclass of \`RuntimeException\`.\n\n2. **Which keyword actually handles exceptions?**\n   - *Answer:* Technically ONLY \`catch\` handles exceptions! Other keywords (\`try\`, \`finally\`, \`throw\`, \`throws\`) provide structure or delegation.\n\n3. **Can you catch and recover from a JVM Error?**\n   - *Answer:* **No.** Errors represent fatal system/environment failures (e.g. \`StackOverflowError\`, \`OutOfMemoryError\`) that applications cannot recover from.`;
    } 
    
    if (p.includes('code') || p.includes('snippet') || p.includes('example')) {
      return `💻 **Production Java Code Pattern for ${currentTopic?.title || 'Exception Handling'}**:\n\n\`\`\`java\nimport java.io.FileReader;\nimport java.io.IOException;\n\npublic class ProductionPatternDemo {\n    public static void main(String[] args) {\n        // 1. Guarded execution with try-catch\n        try (FileReader reader = new FileReader("config.json")) {\n            System.out.println("Config loaded successfully.");\n        } catch (IOException e) {\n            // 2. Meaningful logging & graceful fallback\n            System.err.println("⚠️ Fallback to default configuration: " + e.getMessage());\n        }\n    }\n}\n\`\`\`\n\n> 💡 *Tip: Use Try-With-Resources for automatic resource closure!*`;
    }

    return `✨ **Gemini AI Master Overview for ${currentTopic?.title || 'this topic'}**:\n\n${
      currentTopic?.mentalModel || 
      "In Java, Exceptions are recoverable application anomalies within the programmer's control, whereas Errors are fatal system-level failures beyond application recovery."
    }\n\n*Pro-tip: Connect your free Google Gemini API Key via the key icon above for unlimited interactive questions!*`;
  };

  const handleSendPrompt = async (promptText) => {
    if (!promptText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: promptText.trim()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const reply = await callGeminiApi(promptText.trim());

    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'ai',
        text: reply
      }
    ]);
    setIsTyping(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-[#080C16] border-l border-slate-800 shadow-2xl h-full flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header with Gemini Branding */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-start justify-between gap-3 bg-gradient-to-r from-blue-950/40 via-purple-950/20 to-cyan-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-cyan-400/40 text-cyan-300 shadow-lg shadow-cyan-500/20">
              <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                    Google Gemini AI
                  </span>
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800">
                  {selectedModel === 'gemini-2.0-flash' ? '2.0 Flash' : '1.5 Flash'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Topic Tutor: <strong className="text-slate-200">{currentTopic?.title || 'Java Curriculum'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* API Key Config Button */}
            <button
              onClick={() => { setInputKey(apiKey); setShowKeyModal(true); }}
              className={`p-2 rounded-xl border transition ${
                apiKey
                  ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title={apiKey ? "Gemini API Key Connected ✓" : "Configure Gemini API Key"}
            >
              <Key className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMessages([{
                id: Date.now(),
                sender: 'ai',
                text: `Conversation cleared! Ask me any question about **${currentTopic?.title || 'this topic'}**.`
              }])}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
              title="Clear Chat History"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* API Key Info Banner (if not added yet) */}
        {!apiKey && (
          <div className="px-4 py-2 bg-gradient-to-r from-blue-950/60 to-purple-950/60 border-b border-blue-800/40 flex items-center justify-between text-[11.5px] text-blue-200">
            <span className="flex items-center gap-1.5 truncate">
              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Running on Grounded Engine. Add Gemini API Key for live AI.</span>
            </span>
            <button
              onClick={() => { setInputKey(apiKey); setShowKeyModal(true); }}
              className="font-bold underline text-cyan-300 hover:text-white shrink-0 ml-2"
            >
              Add Key
            </button>
          </div>
        )}

        {/* Suggested Quick Prompt Chips */}
        <div className="p-3 bg-slate-950/90 border-b border-slate-800/80 overflow-x-auto flex gap-2 no-scrollbar">
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(prompt)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 text-[11px] whitespace-nowrap transition flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 items-start ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5 shadow-md shadow-cyan-500/10">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[88%] whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-inner'
                }`}
                dangerouslySetInnerHTML={{
                  __html: marked.parse(msg.text || '')
                }}
              />

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-[11px] text-cyan-300 font-mono">Gemini is reasoning...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputText.trim()) handleSendPrompt(inputText.trim());
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask Gemini about ${currentTopic?.title || 'Java, code, or interview tips'}...`}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 disabled:opacity-30 disabled:pointer-events-none text-slate-950 font-bold transition shadow-md shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Gemini API Key Configuration Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-[#0A0F1D] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Google Gemini API Settings</span>
              </div>
              <button
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Connect your Google Gemini API key to get unlimited, ultra-fast responses directly from Google's frontier AI models.
            </p>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-mono block">Gemini API Key</label>
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-mono block">Model Selection</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', badge: 'Fast & High Limit' },
                  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', badge: 'Next-Gen Frontier' }
                ].map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition ${
                      selectedModel === m.id
                        ? 'bg-blue-950 border-blue-400 text-blue-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <strong className="block text-[11.5px]">{m.name}</strong>
                    <span className="text-[10px] text-slate-500 block">{m.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                <span>Get free API key on Google AI Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveApiKey('')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
                >
                  Clear
                </button>
                <button
                  onClick={() => handleSaveApiKey(inputKey)}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20"
                >
                  Save Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
