"use client";
import React, { useState } from 'react';
import { Send, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ChatWindow = ({ studentName, onClose }: { studentName: string, onClose: () => void }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: 'student', text: "Hello! I saw you were interested in my profile. How can I help?" },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChatHistory([...chatHistory, { role: 'startup', text: message }]);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white shadow-2xl rounded-[32px] border border-slate-100 overflow-hidden z-60 flex flex-col h-125">
      {/* Header */}
      <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center font-black">
            {studentName.charAt(0)}
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-tight">{studentName}</h4>
            <p className="text-[10px] text-sky-400 font-bold uppercase">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-lg transition-all">
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'startup' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium shadow-sm ${
              msg.role === 'startup' 
              ? 'bg-sky-600 text-white rounded-tr-none' 
              : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-sky-500 outline-none"
        />
        <Button onClick={handleSend} className="bg-sky-600 hover:bg-slate-900 rounded-xl w-12 h-12 flex items-center justify-center p-0">
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};