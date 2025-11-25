import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatRole, Lesson } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { Send, Bot, User, X, Loader2, Sparkles } from 'lucide-react';
import { MathRenderer } from './MathRenderer';

interface ChatWidgetProps {
  currentLesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void; // Used for mobile closing
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ currentLesson, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: ChatRole.MODEL, text: 'Xin chào! Mình là trợ lý AI. Mình có thể giúp gì cho bạn về bài học này?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: ChatRole.USER, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const newHistory = [...messages, userMsg];
    const responseText = await sendMessageToGemini(newHistory, currentLesson);

    setMessages(prev => [...prev, { role: ChatRole.MODEL, text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className={`
      flex flex-col h-full bg-white border-l border-slate-200 shadow-xl
      ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 lg:shadow-none
      transition-transform duration-300 ease-in-out
    `}>
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white z-10">
        <div className="flex items-center gap-2">
          <div className="bg-teal-100 p-2 rounded-full">
            <Sparkles className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Trợ lý học tập</h3>
            <p className="text-xs text-slate-500">Sử dụng Gemini AI</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-600">
          <X size={24} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === ChatRole.USER ? 'flex-row-reverse' : ''}`}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center shrink-0
              ${msg.role === ChatRole.USER ? 'bg-indigo-100 text-indigo-600' : 'bg-teal-100 text-teal-600'}
            `}>
              {msg.role === ChatRole.USER ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`
              max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed overflow-x-hidden
              ${msg.role === ChatRole.USER 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'}
            `}>
              <MathRenderer content={msg.text} className="whitespace-pre-wrap break-words" />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi về bài học này..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};
