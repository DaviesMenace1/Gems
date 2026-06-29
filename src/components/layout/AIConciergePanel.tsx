import React, { useState, useRef, useEffect } from 'react';

interface AIConciergePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'concierge';
  text: string;
}

export const AIConciergePanel: React.FC<AIConciergePanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'concierge', text: 'Welcome to the inner circle of Refined Living. I can assist with material specifications, secure blueprint retrievals, or scheduling bespoke site inspections. How may I serve your design timeline today?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    // Mock response architecture - targeted for integration with your AI Concierge Knowledge Engine
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'concierge', 
        text: `Understood. I am parsing your request regarding "${userText}". Our architectural databases are locating the precise material specification variants.` 
      }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop Backdrop Overlay shadow */}
      <div className="absolute inset-0 bg-obsidian/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel Body */}
      <div className="relative w-full max-w-md bg-obsidian border-l border-taupe/20 h-full flex flex-col justify-between shadow-2xl z-10">
        
        {/* Panel Header */}
        <div className="p-6 border-b border-taupe/10 flex items-center justify-between">
          <div>
            <h3 className="font-cinzel text-sm text-ivory tracking-editorial uppercase">AI Concierge Matrix</h3>
            <span className="font-montserrat text-[9px] text-gold uppercase tracking-widest">Autonomous Fine Living Guide</span>
          </div>
          <button onClick={onClose} className="text-taupe hover:text-ivory transition-colors text-sm font-montserrat uppercase tracking-widest">
            ✕ Close
          </button>
        </div>

        {/* Message Pipeline Thread */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <span className="font-montserrat text-[9px] tracking-widest uppercase text-taupe mb-1">
                {msg.sender === 'user' ? 'Your Statement' : 'The Concierge'}
              </span>
              <div className={`p-4 font-montserrat text-xs max-w-[85%] leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-gold/10 border border-gold/20 text-ivory' 
                  : 'bg-taupe/5 border border-taupe/10 text-ivory/90'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        {/* Form Interactive Prompt Input Layer */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-taupe/10 bg-obsidian">
          <div className="flex items-center border border-taupe/30 bg-taupe/5 focus-within:border-gold transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire about architectural specs or project updates..."
              className="flex-1 bg-transparent border-none text-xs font-montserrat text-ivory p-3 focus:outline-none placeholder-taupe/50"
            />
            <button type="submit" className="px-4 text-gold hover:text-ivory transition-colors font-montserrat text-xs uppercase tracking-wider">
              Send
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
