import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User as UserIcon } from 'lucide-react';
import { generateAiResponse, ChatMessage } from '../services/alienAi';

interface AlienAICopilotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlienAICopilot: React.FC<AlienAICopilotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Greetings! I am AlienAI, your dedicated Human Capital and Workforce Intelligence Copilot. Ask me about your remaining leave quotas, Sri Lankan EPF/ETF statutory calculations, or today\'s attendance geofence telemetry.',
      timestamp: 'Just now'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = generateAiResponse(query);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 500);
  };

  const samplePrompts = [
    'How many casual leaves do I have left?',
    'Explain EPF & ETF calculations for Sri Lanka',
    'How does GPS geofence clock-in prevent spoofing?',
    'What are the upcoming company holidays?'
  ];

  return (
    <div className="fixed inset-0 sm:inset-auto sm:right-6 sm:bottom-6 sm:w-96 sm:h-[580px] bg-white border border-slate-200 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-700 flex items-center justify-center text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <span>AlienAI Copilot</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono">
                ONLINE
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Human Capital Intelligence</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs custom-scrollbar">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                m.sender === 'user'
                  ? 'bg-purple-700 text-white'
                  : 'bg-purple-100 text-purple-700'
              }`}
            >
              {m.sender === 'user' ? <UserIcon className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-purple-700 text-white rounded-tr-none'
                  : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-purple-700 text-xs italic font-mono">
            <Bot className="w-3.5 h-3.5 animate-spin" />
            <span>AlienAI is reasoning...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[10px] custom-scrollbar">
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-purple-50 border border-slate-200 text-slate-700 hover:text-purple-700 whitespace-nowrap shrink-0 transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about leaves, EPF, attendance..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-purple-600 placeholder-slate-400"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white transition-all shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
