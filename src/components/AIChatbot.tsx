import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Copy, 
  Check, 
  Calendar, 
  BookOpen, 
  Users, 
  GraduationCap, 
  HelpCircle, 
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import Markdown from 'react-markdown';
import { NavigationTab, ChatMessage } from '../types';
import { COLLEGE_INFO } from '../data/collegeData';

interface AIChatbotProps {
  setActiveTab: (tab: NavigationTab) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    sender: 'assistant',
    text: `Hello! 👋 I am your **RLS College Of BCA AI Assistant**.\n\nI can help you with course syllabi, class timetables, attendance guidelines, faculty contacts, campus events, and general student queries.\n\nHow can I help you today?`,
    timestamp: 'Just now',
    suggestedActions: [
      { label: '📅 View Timetable', actionTab: 'timetable' },
      { label: '📊 75% Attendance Rule', query: 'What is the attendance policy and minimum percentage requirement?' },
      { label: '📚 BCA Courses & Syllabus', actionTab: 'courses' },
      { label: '👨‍🏫 Faculty Office Hours', actionTab: 'faculty' },
      { label: '🚀 Upcoming Events', actionTab: 'events' },
    ]
  }
];

const SUGGESTED_CHIPS = [
  { label: 'Timetable details', query: 'What is the daily class timetable and lecture timings?' },
  { label: 'Attendance criteria', query: 'How does the 75% attendance rule work?' },
  { label: 'BCA Course details', query: 'What specializations and courses are offered in BCA?' },
  { label: 'Faculty directory', query: 'Who are the key professors and department HoD?' },
  { label: 'Upcoming fests', query: 'Tell me about BYTE-FEST and HackRLS hackathon.' },
  { label: 'Emergency helpline', query: 'What are the college helpline numbers and student support emails?' }
];

export const AIChatbot: React.FC<AIChatbotProps> = ({ setActiveTab, isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('rls_bca_chat_history');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_MESSAGES;
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages, isLoading]);

  // Persist chat history
  useEffect(() => {
    try {
      localStorage.setItem('rls_bca_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) {
      setInputPrompt('');
    }
    setIsLoading(true);

    try {
      // Build history for backend
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const botReply = data.reply || "I'm sorry, I couldn't process that response. Please feel free to ask again!";

      // Generate suggested actions based on context
      const suggestedActions: { label: string; actionTab?: NavigationTab; query?: string }[] = [];
      const lowerReply = botReply.toLowerCase();

      if (lowerReply.includes('timetable') || query.toLowerCase().includes('timetable')) {
        suggestedActions.push({ label: 'Open Timetable Tab', actionTab: 'timetable' });
      }
      if (lowerReply.includes('course') || lowerReply.includes('syllabus') || query.toLowerCase().includes('course')) {
        suggestedActions.push({ label: 'Browse Courses', actionTab: 'courses' });
      }
      if (lowerReply.includes('faculty') || lowerReply.includes('cabin') || query.toLowerCase().includes('faculty')) {
        suggestedActions.push({ label: 'Book Faculty Slot', actionTab: 'faculty' });
      }
      if (lowerReply.includes('event') || lowerReply.includes('fest') || query.toLowerCase().includes('event')) {
        suggestedActions.push({ label: 'Explore Events & Passes', actionTab: 'events' });
      }
      if (lowerReply.includes('dashboard') || lowerReply.includes('attendance')) {
        suggestedActions.push({ label: 'View Student Dashboard', actionTab: 'dashboard' });
      }

      const assistantMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: suggestedActions.length > 0 ? suggestedActions : undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      // Fallback safe client response if server unreachable
      const fallbackMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `### 🎓 RLS College Of BCA Assistance\n\nThank you for reaching out! You can explore details about our courses, timetable, attendance calculator, and faculty directory through the portal navigation.\n\n* **Academic Timetable**: View lecture timings and classrooms in the **Timetable** tab.\n* **75% Attendance Requirement**: Check your attendance forecaster in the **Dashboard**.\n* **Faculty Mentors**: Connect with professors in the **Faculty** directory.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: '📅 Go to Timetable', actionTab: 'timetable' },
          { label: '📊 View Dashboard', actionTab: 'dashboard' },
          { label: '📚 View Courses', actionTab: 'courses' }
        ]
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem('rls_bca_chat_history');
    } catch {
      // ignore
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleActionClick = (action: { label: string; actionTab?: NavigationTab; query?: string }) => {
    if (action.actionTab) {
      setActiveTab(action.actionTab);
      // On mobile screen, close chatbot or minimize so user sees the page
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    } else if (action.query) {
      handleSendMessage(action.query);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
          {/* Quick Callout Bubble */}
          <div className="hidden sm:flex items-center gap-2 mb-2 px-3.5 py-1.5 bg-white text-slate-800 text-xs font-semibold rounded-full shadow-lg border border-blue-100 animate-bounce">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span>Ask College AI Assistant</span>
          </div>

          <button
            id="ai-chatbot-open-button"
            onClick={() => setIsOpen(true)}
            aria-label="Open College AI Assistant"
            className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <Bot className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-200" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
            </span>
          </button>
        </div>
      )}

      {/* Chatbot Window Modal / Drawer */}
      {isOpen && (
        <div 
          id="ai-chatbot-window"
          className="fixed bottom-0 sm:bottom-6 right-0 sm:right-6 z-50 w-full sm:w-[420px] max-w-full h-[92vh] sm:h-[620px] sm:max-h-[85vh] bg-white sm:rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white px-4 py-3.5 flex items-center justify-between border-b border-blue-800/40">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-blue-600 to-indigo-800 border border-blue-400/40 shadow-sm shrink-0">
                <img 
                  src={COLLEGE_INFO.logoUrl} 
                  alt="RLS College Of BCA Bot" 
                  className="w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-tight text-white">RLS College AI Assistant</h3>
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-blue-500/30 text-blue-200 rounded border border-blue-400/30">
                    BCA BOT
                  </span>
                </div>
                <p className="text-[11px] text-blue-200/80 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Official Student Academic Guide
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                id="ai-chatbot-clear-button"
                onClick={handleClearHistory}
                title="Reset Conversation"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                id="ai-chatbot-close-button"
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Category Chips Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            <span className="text-[10px] font-semibold text-slate-700 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-600" />
              Topics:
            </span>
            {SUGGESTED_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                id={`chat-chip-${idx}`}
                onClick={() => handleSendMessage(chip.query)}
                disabled={isLoading}
                className="text-[11px] font-medium text-slate-700 hover:text-blue-700 bg-white hover:bg-blue-50 px-2.5 py-1 rounded-full border border-slate-200 shadow-xs shrink-0 transition-colors disabled:opacity-50"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'} group`}
                >
                  <div className="flex items-start gap-2 max-w-[92%] sm:max-w-[88%]">
                    {isAssistant && (
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`relative rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                        isAssistant
                          ? 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                          : 'bg-blue-600 text-white font-medium rounded-tr-xs shadow-blue-100'
                      }`}
                    >
                      {/* Message Content */}
                      {isAssistant ? (
                        <div className="prose prose-xs max-w-none text-slate-800 prose-headings:font-bold prose-headings:text-slate-900 prose-headings:my-1 prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-slate-900">
                          <Markdown>{msg.text}</Markdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      )}

                      {/* Action buttons inside bot response */}
                      {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                          {msg.suggestedActions.map((action, actionIdx) => (
                            <button
                              key={actionIdx}
                              onClick={() => handleActionClick(action)}
                              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-lg border border-blue-200 transition-colors"
                            >
                              <span>{action.label}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Bot Message Footer */}
                      {isAssistant && (
                        <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-600 pt-1">
                          <span>{msg.timestamp}</span>
                          <button
                            onClick={() => handleCopyText(msg.id, msg.text)}
                            title="Copy message"
                            className="p-1 hover:text-slate-800 rounded transition-colors"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {!isAssistant && (
                    <span className="text-[10px] text-slate-600 mt-1 mr-1">
                      {msg.timestamp}
                    </span>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2 max-w-[85%]">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
                  <span className="text-[11px] text-slate-600 ml-1.5 font-medium">Assistant thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Academic Navigation shortcuts */}
          <div className="px-3 py-1.5 bg-slate-100/70 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-blue-600" /> Quick Hub:
            </span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => { setActiveTab('dashboard'); setIsOpen(false); }}
                className="hover:text-blue-700 hover:underline flex items-center gap-0.5"
              >
                <GraduationCap className="w-3 h-3" /> Dashboard
              </button>
              <span>•</span>
              <button 
                onClick={() => { setActiveTab('timetable'); setIsOpen(false); }}
                className="hover:text-blue-700 hover:underline flex items-center gap-0.5"
              >
                <Calendar className="w-3 h-3" /> Timetable
              </button>
              <span>•</span>
              <button 
                onClick={() => { setActiveTab('faculty'); setIsOpen(false); }}
                className="hover:text-blue-700 hover:underline flex items-center gap-0.5"
              >
                <Users className="w-3 h-3" /> Faculty
              </button>
            </div>
          </div>

          {/* Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                id="ai-chatbot-input"
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask about courses, timetable, attendance, faculty..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-600 disabled:opacity-60 transition-all"
              />
              <button
                id="ai-chatbot-send-button"
                type="submit"
                disabled={!inputPrompt.trim() || isLoading}
                aria-label="Send query"
                className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:hover:bg-blue-600 disabled:cursor-not-allowed transition-all shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-600 px-1">
              <span>RLS College Of BCA • Verified AI Model</span>
              <span>Autonomous Accredited A++</span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
