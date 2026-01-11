
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage, AvatarConfig } from '../types';
import { Button } from './Common';
import { OctoAvatar } from './OctoAvatar';
import { streamChemistryHelp } from '../services/geminiService';
import { Send, Sparkles } from 'lucide-react';

interface AITutorProps {
  avatarConfig: AvatarConfig;
}

export const AITutor: React.FC<AITutorProps> = ({ avatarConfig }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: '你好！我是 Octo，你的炼金术导师。有什么化学难题想问我吗？🌊' }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsStreaming(true);

    const modelMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMsgId, role: 'model', text: '', isLoading: true }]);

    let fullResponse = '';
    
    try {
      const stream = streamChemistryHelp(userMsg.text, messages);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => 
          prev.map(msg => 
            msg.id === modelMsgId ? { ...msg, text: fullResponse, isLoading: false } : msg
          )
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-white shadow-soft">
      {/* Header */}
      <div className="bg-magic-light/30 p-4 flex items-center border-b border-white">
        <OctoAvatar config={avatarConfig} size={40} className="mr-3" />
        <div>
          <h3 className="font-magic font-bold text-magic-dark">Octo Tutor</h3>
          <p className="text-xs text-slate-500">Online • Gemini 3 Flash</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="mr-2 mt-1">
                 <OctoAvatar config={{...avatarConfig, hat: 'wizard'}} size={30} />
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-magic text-white rounded-br-none' 
                  : 'bg-white shadow-sm border border-slate-100 rounded-bl-none text-slate-700'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {msg.text}
                {msg.isLoading && <span className="animate-pulse inline-block ml-1">▋</span>}
              </div>
            </motion.div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="问问 Octo 关于化学的问题..."
            className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-magic/50 outline-none"
            disabled={isStreaming}
          />
          <Button onClick={handleSend} disabled={!input.trim() || isStreaming} size="md" className="!rounded-xl px-4">
            {isStreaming ? <Sparkles className="animate-spin w-5 h-5" /> : <Send className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
