import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, RotateCcw, Briefcase, UserCheck } from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AIChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate?: (page: string) => void;
}

const QUICK_PROMPTS = [
  { label: 'Summarize core projects & metrics', prompt: 'Summarize Md. Monirul Islam’s key projects and measurable engineering results.' },
  { label: 'মনিরুলের প্রজেক্ট ও দক্ষতা', prompt: 'মোঃ মনিরুল ইসলামের প্রধান প্রজেক্ট, টেকনিক্যাল স্কিল এবং শিক্ষাগত যোগ্যতা সম্পর্কে সংক্ষেপে বলো।' },
  { label: 'Why hire Monirul for Full-Stack?', prompt: 'Why is Md. Monirul Islam a strong candidate for a Full-Stack or Backend Software Engineer role?' },
  { label: 'CP & Algorithms (200+ Solved)', prompt: 'Tell me about Monirul’s Competitive Programming background, Codeforces rating, and C++ expertise.' },
];

function buildClientStaticReply(message: string): string {
  const lower = message.toLowerCase();
  const isBangla = /[\u0980-\u09FF]/.test(message) || lower.includes('monirul ke') || lower.includes('kemon');

  if (isBangla) {
    if (lower.includes('প্রজেক্ট') || lower.includes('project')) {
      return `**মোঃ মনিরুল ইসলামের প্রধান প্রজেক্টসমূহ:**\n\n1. **AI-Powered Habit & Accountability Tracker:** React, Node.js, Express এবং MongoDB দিয়ে তৈরি ফুল-স্ট্যাক অ্যাপ, যা PUST-এর ১০০+ শিক্ষার্থী ব্যবহার করছে এবং এতে API Latency ৩৫% কমানো হয়েছে।\n2. **Interactive DSA & Memory Pointer Visualizer:** JavaScript ES6+ ও HTML5 Canvas দিয়ে তৈরি মেমোরি পয়েন্টার (Front, Rear, Head) ভিজ্যুয়ালাইজার, যা আপনি এই ওয়েবসাইটের **Projects & Lab** পেজে সরাসরি চালিয়ে দেখতে পারেন।\n3. **IoT Smart Environmental Telemetry Node:** ESP32 ও C++ দিয়ে তৈরি রিয়েল-টাইম MQTT সেন্সর নোড, যা PUST ICE Academic Exhibition-এ প্রদর্শিত হয়েছে।`;
    }
    if (lower.includes('স্কিল') || lower.includes('skill') || lower.includes('দক্ষতা')) {
      return `**মোঃ মনিরুল ইসলামের টেকনিক্যাল স্কিলসমূহ:**\n\n- **Languages:** C, C++ (200+ CP Solved), JavaScript (ES6+), TypeScript, Python, SQL\n- **Web & Backend:** React.js, Node.js, Express.js, Tailwind CSS, REST APIs\n- **Databases:** MongoDB, PostgreSQL, MySQL\n- **Core CS & ICE:** Data Structures & Algorithms, OOP, Computer Networks, Operating Systems, Signals & Systems\n- **DevOps & Tools:** Docker, Git & GitHub, Linux/Bash, Postman`;
    }
    return `হ্যালো! আমি **মোঃ মনিরুল ইসলামের** এআই পোর্টফোলিও অ্যাসিস্ট্যান্ট। তিনি **পাবনা বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়ের (PUST)** ইনফরমেশন অ্যান্ড কমিউনিকেশন ইঞ্জিনিয়ারিং (**ICE**) বিভাগের একজন আন্ডারগ্র্যাজুয়েট শিক্ষার্থী এবং **Software Engineer**।\n\n- **কম্পিটিটিভ প্রোগ্রামিং:** ২০০+ প্রবলেম সলভড (Codeforces Max Rating: 1350+)\n- **প্রধান স্ট্যাক:** C++, JavaScript, React, Node.js, Express, MongoDB, PostgreSQL ও Docker\n- **যোগাযোগ:** contact@monirul.dev.cv\n\nআপনি তার প্রজেক্ট, সিভি (CV), স্কিল বা জব-ফিট সম্পর্কে যেকোনো প্রশ্ন করতে পারেন!`;
  }

  if (lower.includes('project') || lower.includes('habit') || lower.includes('visualizer') || lower.includes('iot')) {
    return `**Md. Monirul Islam's Key Engineering Projects:**\n\n1. **AI-Powered Habit & Accountability Tracker (Full-Stack):** Built with React, Node.js, Express, and MongoDB. Adopted by **100+ PUST student peers** with a **35% reduction in API response latency** via compound indexing.\n2. **Interactive DSA & Memory Pointer Visualizer:** Built with ES6+ and HTML5 Canvas to visualize low-level memory pointers (\`HEAD\`, \`TAIL\`, \`FRONT\`, \`REAR\`). Reduced peer mentoring setup time by **50%**. *(Try it live on the Projects & Lab tab!)*\n3. **IoT Smart Environmental Telemetry Node:** C++ firmware on ESP32 streaming MQTT/REST sensor telemetry, showcased at the **PUST ICE Academic Exhibition**.`;
  }

  if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech') || lower.includes('hire') || lower.includes('candidate')) {
    return `**Why Md. Monirul Islam is a Strong Engineering Match:**\n\n- **Full-Stack & Backend Architecture:** Hands-on experience building production React.js frontends, Node.js/Express REST microservices, and optimizing MongoDB/PostgreSQL queries (achieved **35% lower API latency** for **100+ active users**).\n- **Algorithmic Rigor:** Solved **200+ Competitive Programming problems** in C++20 (Codeforces Max Rating: **1350+**), ensuring clean, memory-efficient data structures and O(N log N) algorithmic thinking.\n- **Systems & Hardware Foundation:** B.Sc. in ICE at **PUST**, combining computer networks, operating systems, and embedded C++ telemetry with modern Docker & Git workflows.`;
  }

  if (lower.includes('cp') || lower.includes('codeforces') || lower.includes('algorithm') || lower.includes('c++')) {
    return `**Competitive Programming & Algorithmic Profile:**\n\n- **Total Solved:** 200+ problems across Codeforces, LeetCode, and Beecrowd.\n- **Codeforces Max Rating:** 1350+ (strong command of Graph Theory, Dijkstra, Disjoint Set Union, Segment Trees, and Dynamic Programming).\n- **Primary Language:** C++20 STL. You can inspect and copy his C++20 algorithm templates on the **Research & CP** page!`;
  }

  return `Hello! I'm **Md. Monirul Islam's AI Portfolio Assistant**. Here is a quick snapshot of his profile:\n\n- **Role:** Software Engineer & B.Sc. in ICE Undergraduate at **PUST**\n- **Core Stack:** C++, JavaScript/TypeScript, React.js, Node.js, Express, MongoDB, PostgreSQL, Docker\n- **Track Record:** **200+ CP problems solved** (1350+ Codeforces rating), **100+ active student users** on his Full-Stack Habit Tracker, and **35% API latency reduction**.\n- **Contact:** contact@monirul.dev.cv\n\nAsk me about his **projects, C++ & algorithmic background, full-stack architecture, education at PUST**, or paste a **Job Description** to evaluate his fit!`;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ isOpen, onToggle, onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Assalamu Alaikum & Hello! I am **Md. Monirul Islam's AI Portfolio Assistant**.\n\nAsk me anything in **English or বাংলা** about his Full-Stack architecture, C++ Competitive Programming (200+ solved), ICE degree at **PUST**, or paste a **Job Description** to check role alignment.",
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({ role: m.role, text: m.text }));
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      if (!response.ok) {
        throw new Error('Static host mode');
      }

      const data = await response.json();
      const replyText = data?.reply || buildClientStaticReply(query);

      setMessages((prev) => [
        ...prev,
        {
          id: `m_${Date.now()}`,
          role: 'model',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'model',
          text: buildClientStaticReply(query),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: "Conversation reset. Ask me in **English or বাংলা** about Md. Monirul Islam's projects, skills, PUST ICE coursework, or paste a job description for an instant fit analysis!",
        timestamp: 'Just now',
      },
    ]);
  };

  const renderFormattedText = (raw: string) => {
    return raw.split('\n').map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className={line.trim() === '' ? 'h-2' : 'leading-relaxed'}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-slate-900 dark:text-white">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="no-print">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={onToggle}
          aria-label="Open AI Portfolio Assistant"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-xl transition-transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask Monirul AI</span>
        </button>
      )}

      {/* Chat Drawer / Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[82vh] flex flex-col rounded-2xl bg-white dark:bg-[#0e1525] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-xs">
                AI
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-tight text-white">
                  Monirul Islam · Portfolio Assistant
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  Gemini AI · English & বাংলা Supported
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={resetChat}
                title="Reset Conversation"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onToggle}
                title="Close Assistant"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[380px] bg-slate-50/70 dark:bg-[#090d16]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs space-y-1 ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {msg.role === 'user' ? <p>{msg.text}</p> : renderFormattedText(msg.text)}
                </div>
                <span className="text-[10px] font-mono text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start">
                <div className="rounded-xl px-3.5 py-2.5 text-xs bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 font-mono">
                  Synthesizing response from CV & engineering specs...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starters */}
          <div className="px-3 py-2 bg-slate-100/80 dark:bg-slate-900/70 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto">
            {QUICK_PROMPTS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendMessage(q.prompt)}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[11px] font-medium whitespace-nowrap shrink-0 transition-colors"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Helpful Action Bar */}
          {onNavigate && (
            <div className="px-3 py-1.5 bg-slate-50 dark:bg-[#0e1525] border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <button
                type="button"
                onClick={() => {
                  onNavigate('cv');
                }}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-medium"
              >
                <Briefcase className="w-3 h-3" /> Open Printable CV
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate('contact');
                }}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-medium"
              >
                <UserCheck className="w-3 h-3" /> Direct Contact Form
              </button>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 bg-white dark:bg-[#0e1525] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask in English or বাংলা about Monirul..."
              className="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
