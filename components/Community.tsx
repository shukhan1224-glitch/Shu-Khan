
import React, { useState, useRef, useEffect } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Send, User as UserIcon, Camera, ChevronRight, Sparkles, ArrowLeft, Mic } from 'lucide-react';
import { ChatMessage, AvatarConfig } from '../types';
import { streamChemistryHelp } from '../services/geminiService';
import { Mascot } from './Mascot';
import { OctoAvatar } from './OctoAvatar';

const motion = m as any;

const formatMessage = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-slate-900 font-extrabold">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

interface CommunityProps {
  onBack: () => void;
  userAvatarConfig: AvatarConfig;
}

const CHAPTERS = [
    { grade: 'S1', title: '第2章 水和氢' },
    { grade: 'S1', title: '第6章 元素周期表' },
    { grade: 'S1', title: '第8章 氧化还原' },
    { grade: 'S2', title: '第17章 气体' },
    { grade: 'S2', title: '第21章 化学平衡' },
    { grade: 'S2', title: '第24章 电化学' },
    { grade: 'S3', title: '第27章 烷烃' },
    { grade: 'S3', title: '第30章 芳香烃' },
    { grade: 'S3', title: '第33章 醛和酮' },
    { grade: 'S3', title: '第36章 高分子' }
];

export const Community: React.FC<CommunityProps> = ({ onBack, userAvatarConfig }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: '👋 嗨！我是 **Octo (奥克托)**，你的魔法化学导师！🐙\n\n不管是**拍照解题**，还是**概念讲解**，我的8只手都能搞定！' }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const [showPhotoSolver, setShowPhotoSolver] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('您的浏览器不支持语音输入');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'zh-CN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + transcript);
    };

    recognition.start();
  };

  const handleSend = async (textOverride?: string) => {
    const userText = textOverride || input;
    if (!userText.trim() || isStreaming) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: userText };
    
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setShowChapters(false);
    
    const botMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '' }]);
    setIsStreaming(true);

    try {
      const stream = streamChemistryHelp(userText, messages);
      let fullResponse = '';

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId ? { ...msg, text: fullResponse } : msg
        ));
      }
    } catch (e) {
      console.error("Streaming failed", e);
    } finally {
      setIsStreaming(false);
    }
  };

  const handlePhotoUpload = () => {
     setShowPhotoSolver(true);
     setTimeout(() => {
        setMessages(prev => [...prev, {
           id: Date.now().toString(),
           role: 'model',
           text: '📸 **图片分析完成**\n\n**思路分析**：\n这道题考察的是**苯酚的弱酸性**。我们需要利用强酸制弱酸的原理。\n\n**第一步**：\n请写出苯酚钠溶液与二氧化碳反应的化学方程式。\n\n(或者如果你知道答案，可以直接发给我验证哦！)'
        }]);
        setShowPhotoSolver(false);
     }, 1500);
  };

  return (
    <div className="h-full flex flex-col pt-6 pb-6 px-4 relative">
      <div className="mb-4 flex items-center justify-between z-20">
         <div className="flex items-center gap-3">
           <button 
             onClick={onBack}
             className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-white/50 text-slate-600 active:scale-95 transition-transform"
           >
             <ArrowLeft size={20} />
           </button>
           <h1 className="text-2xl font-extrabold text-slate-700 flex items-center gap-2">
              <span className="font-magic text-magic-dark">Octo</span> 导师
           </h1>
         </div>
         <span className="bg-magic/20 backdrop-blur-md text-magic-vivid text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider border border-magic/40 flex items-center gap-1 font-bold">
            <Sparkles size={10} /> Magic Mode
         </span>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-5 pr-2 pb-4 scroll-smooth z-10"
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.role === 'model' ? (
                <div className="shrink-0 -mt-2">
                   <Mascot size={48} mood="happy" />
                </div>
            ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm overflow-hidden border-2 border-white bg-white">
                    <div className="scale-[0.5] mt-2">
                       <OctoAvatar config={userAvatarConfig} size={40} />
                    </div>
                </div>
            )}
            
            <div className={`p-5 rounded-3xl text-sm leading-relaxed max-w-[85%] shadow-sm
              ${msg.role === 'user' 
                ? 'bg-potion text-slate-800 rounded-tr-none border border-potion-dark/10' 
                : 'bg-white/90 backdrop-blur-sm text-slate-700 rounded-tl-none border border-white/60'
              }`}
            >
              <div className="whitespace-pre-wrap">{formatMessage(msg.text)}</div>
              {msg.role === 'model' && msg.text === '' && (
                 <span className="inline-block w-2 h-4 bg-magic animate-pulse rounded-full align-middle ml-1"/>
              )}
            </div>
          </motion.div>
        ))}
        <div className="h-4" />
      </div>

      <div className="mt-4 relative z-30">
        <div className="flex gap-3">
           <button 
              onClick={handlePhotoUpload}
              className="bg-white/80 backdrop-blur-md border-2 border-white w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:border-potion hover:text-potion-dark transition-all shrink-0 shadow-sm active:scale-95"
           >
              <Camera size={22} />
           </button>
           
           <div className="relative">
              <button 
                 onClick={() => setShowChapters(!showChapters)}
                 className={`bg-white/80 backdrop-blur-md border-2 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shrink-0 shadow-sm active:scale-95
                    ${showChapters ? 'border-magic text-magic-dark' : 'border-white text-slate-400 hover:border-magic hover:text-magic-dark'}
                 `}
              >
                 <Sparkles size={22} />
              </button>
              
              <AnimatePresence>
                 {showChapters && (
                    <motion.div 
                       initial={{ opacity: 0, y: 10, scale: 0.9 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: 10, scale: 0.9 }}
                       className="absolute bottom-14 left-0 w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-purple-glow border border-magic/20 p-2 z-50 origin-bottom-left"
                    >
                       <div className="max-h-60 overflow-y-auto space-y-1 custom-scrollbar">
                          {CHAPTERS.map((ch, idx) => (
                             <button 
                                key={idx}
                                onClick={() => handleSend(`请用简单有趣的方式讲解一下：${ch.title}`)}
                                className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-magic/10 text-xs font-bold text-slate-600 truncate transition-colors"
                             >
                                <span className="bg-magic/10 text-magic-dark px-1.5 rounded mr-2 border border-magic/20">{ch.grade}</span>
                                {ch.title}
                             </button>
                          ))}
                       </div>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
           
           <div className="relative flex-1">
             <input
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               placeholder={isListening ? "正在听..." : "问问 Octo..."}
               disabled={isStreaming}
               className={`w-full pl-5 pr-20 py-3.5 rounded-2xl bg-white/90 backdrop-blur-md border-2 focus:outline-none shadow-sm text-slate-600 placeholder:text-slate-400 transition-colors h-12 font-medium disabled:bg-slate-50/50 disabled:text-slate-400
                 ${isListening ? 'border-magic animate-pulse' : 'border-white focus:border-magic focus:shadow-magic-glow'}
               `}
             />
             
             <button
               onClick={handleVoiceInput}
               className={`absolute right-12 top-1 bottom-1 w-8 flex items-center justify-center rounded-xl transition-colors
                 ${isListening ? 'text-coral' : 'text-slate-400 hover:text-slate-600'}
               `}
             >
               <Mic size={20} />
             </button>

             <button
               onClick={() => handleSend()}
               disabled={isStreaming || !input.trim()}
               className="absolute right-1 top-1 bottom-1 w-10 bg-magic rounded-xl flex items-center justify-center text-slate-700 hover:bg-magic-dark disabled:bg-slate-100 disabled:text-slate-300 transition-colors active:scale-90"
             >
               <ChevronRight size={20} strokeWidth={3} />
             </button>
           </div>
        </div>
      </div>

      <AnimatePresence>
         {showPhotoSolver && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[3rem] border border-white/20"
            >
               <div className="relative mb-6">
                 <div className="absolute inset-0 bg-magic/50 blur-xl rounded-full" />
                 <Mascot size={100} mood="thinking" />
               </div>
               
               <h3 className="text-white font-bold text-xl mb-2">Octo 正在观察...</h3>
               <p className="text-white/70 text-sm">正在施展化学分析魔法 ✨</p>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
};
