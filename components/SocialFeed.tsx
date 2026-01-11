import React, { useState, useRef, useMemo } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, Plus, HelpCircle, User, Zap, Image as ImageIcon, X, ShieldCheck, Check, Ban, Clock, AlertCircle } from 'lucide-react';
import { SocialPost, Comment, AvatarConfig } from '../types';
import { MOCK_POSTS } from '../constants';
import { OctoAvatar } from './OctoAvatar';

const motion = m as any;

interface SocialFeedProps {
  onEarnXP: (amount: number) => void;
  currentUserAvatarConfig: AvatarConfig;
  currentUserName: string;
  isAdmin?: boolean;
}

type Tab = 'explore' | 'moderation';

export const SocialFeed: React.FC<SocialFeedProps> = ({ onEarnXP, currentUserAvatarConfig, currentUserName, isAdmin }) => {
  const [activeTab, setActiveTab] = useState<Tab>('explore');
  const [posts, setPosts] = useState<SocialPost[]>(MOCK_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [commentInput, setCommentInput] = useState<{ [postId: string]: string }>({});
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const displayedPosts = useMemo(() => {
    if (isAdmin && activeTab === 'moderation') {
       return posts.filter(p => p.status === 'pending');
    }
    return posts.filter(p => 
      p.status === 'approved' || 
      (p.status === 'pending' && p.author === currentUserName)
    );
  }, [posts, activeTab, isAdmin, currentUserName]);

  const pendingCount = useMemo(() => posts.filter(p => p.status === 'pending').length, [posts]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!newPostContent.trim() && !selectedImage) return;

    const newPost: SocialPost = {
      id: Date.now().toString(),
      author: currentUserName,
      avatar: 'custom-octo', // Special flag to render dynamic avatar
      type: isAskingQuestion ? 'question' : 'share',
      status: 'pending',
      content: newPostContent,
      image: selectedImage || undefined,
      likes: 0,
      isLiked: false,
      timestamp: '刚刚',
      comments: [],
      xpReward: isAskingQuestion ? 20 : 0,
      solved: false
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setSelectedImage(null);
    setIsAskingQuestion(false);
    
    if (!isAdmin) {
      alert('帖子已提交！管理员审核通过后将对所有人可见。');
    } else {
      alert('帖子已创建');
    }
  };

  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: string) => {
    const text = commentInput[postId];
    if (!text?.trim()) return;

    const post = posts.find(p => p.id === postId);
    
    if (post?.type === 'question' && !post.solved) {
       onEarnXP(10);
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      author: currentUserName,
      avatar: 'custom-octo',
      content: text,
      timestamp: '刚刚'
    };

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));

    setCommentInput({ ...commentInput, [postId]: '' });
    setActiveCommentId(null);
  };

  const handleModeration = (postId: string, action: 'approve' | 'reject') => {
     if (action === 'approve') {
        setPosts(posts.map(p => p.id === postId ? { ...p, status: 'approved' } : p));
     } else {
        setPosts(posts.filter(p => p.id !== postId)); 
     }
  };

  const renderAvatar = (src: string) => {
      if (src === 'custom-octo') {
          return (
             <div className="w-10 h-10 rounded-full bg-white border border-slate-100 overflow-hidden flex items-center justify-center">
                <div className="scale-[0.5] mt-1">
                   <OctoAvatar config={currentUserAvatarConfig} size={40} />
                </div>
             </div>
          )
      }
      return <img src={src} alt="Avatar" className="w-10 h-10 rounded-full bg-slate-100" />
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="pt-8 pb-4 px-6 flex items-center justify-between bg-white/60 backdrop-blur-md sticky top-0 z-20">
        <h1 className="text-2xl font-extrabold text-slate-700">化学圈子</h1>
        
        {isAdmin ? (
           <div className="flex bg-white/50 backdrop-blur-md border border-white/60 rounded-xl p-1 shadow-sm">
              <button 
                 onClick={() => setActiveTab('explore')}
                 className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'explore' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}
              >
                 发现
              </button>
              <button 
                 onClick={() => setActiveTab('moderation')}
                 className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${activeTab === 'moderation' ? 'bg-coral text-white shadow-sm' : 'text-slate-500'}`}
              >
                 <ShieldCheck size={12} />
                 审核 {pendingCount > 0 && <span className="bg-white text-coral px-1 rounded-full text-[9px]">{pendingCount}</span>}
              </button>
           </div>
        ) : (
            <button 
               className="w-10 h-10 rounded-full bg-mint text-slate-800 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
               onClick={() => document.getElementById('post-input')?.focus()}
            >
               <Plus size={24} strokeWidth={3} />
            </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-6 z-10">
        
        {activeTab === 'explore' && (
           <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-soft border border-white/60">
              <div className="flex gap-3 mb-3">
                 <div className="w-10 h-10 rounded-full bg-white border border-slate-100 overflow-hidden flex items-center justify-center">
                    <div className="scale-[0.5] mt-1">
                       <OctoAvatar config={currentUserAvatarConfig} size={40} />
                    </div>
                 </div>
                 <div className="flex-1">
                    <textarea 
                       id="post-input"
                       value={newPostContent}
                       onChange={(e) => setNewPostContent(e.target.value)}
                       placeholder={isAdmin ? "发布官方公告..." : "分享你的化学发现，或者提问..."}
                       className="w-full bg-slate-50/50 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-mint/50 resize-none h-20 mb-2 border border-slate-100"
                    />
                    
                    <AnimatePresence>
                       {selectedImage && (
                          <motion.div 
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             exit={{ opacity: 0, scale: 0.9 }}
                             className="relative w-fit mb-2 group"
                          >
                             <img src={selectedImage} alt="Preview" className="h-24 rounded-xl object-cover border border-slate-200 shadow-sm" />
                             <button 
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-2 -right-2 bg-slate-800 text-white p-1 rounded-full shadow-md hover:scale-110 transition-transform"
                             >
                                <X size={12} />
                             </button>
                          </motion.div>
                       )}
                    </AnimatePresence>
                 </div>
              </div>

              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <button 
                       onClick={() => setIsAskingQuestion(!isAskingQuestion)}
                       className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors border
                          ${isAskingQuestion ? 'bg-apricot/20 text-apricot-dark border-apricot/50' : 'bg-slate-50 text-slate-400 border-transparent'}
                       `}
                    >
                       <HelpCircle size={14} />
                       {isAskingQuestion ? '提问模式' : '普通动态'}
                    </button>
                    
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageSelect} />
                    <button 
                       onClick={() => fileInputRef.current?.click()}
                       className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                       <ImageIcon size={14} />
                       图片
                    </button>
                 </div>

                 <button 
                    onClick={handlePost}
                    disabled={!newPostContent.trim() && !selectedImage}
                    className="bg-slate-800 text-white px-5 py-2 rounded-full text-xs font-bold shadow-md hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    发布
                 </button>
              </div>
           </div>
        )}

        <AnimatePresence>
          {displayedPosts.length === 0 && (
             <div className="text-center py-10 opacity-50">
                <p className="font-bold text-slate-400">暂无内容</p>
                {isAdmin && activeTab === 'moderation' && <p className="text-xs text-slate-300 mt-1">没有待审核的帖子</p>}
             </div>
          )}
          
          {displayedPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              layout
              className={`bg-white/90 backdrop-blur-md rounded-[2rem] p-5 shadow-soft border 
                 ${post.status === 'pending' ? 'border-orange-300 border-dashed bg-orange-50/50' : 'border-white/60 hover:border-magic/30 transition-colors'}
              `}
            >
              <div className="flex items-center gap-3 mb-4">
                {renderAvatar(post.avatar)}
                <div className="flex-1">
                   <h3 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                      {post.author}
                      {post.status === 'pending' && (
                         <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Clock size={10} /> 审核中
                         </span>
                      )}
                   </h3>
                   <span className="text-xs text-slate-400">{post.timestamp}</span>
                </div>
                
                {post.type === 'question' && (
                   <span className="bg-apricot/20 text-apricot-dark text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1">
                      <HelpCircle size={12} /> 悬赏 {post.xpReward} XP
                   </span>
                )}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                 {post.content}
              </p>
              
              {post.image && (
                 <div className="mb-4 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                    <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-64" />
                 </div>
              )}

              {activeTab === 'moderation' && isAdmin ? (
                 <div className="flex gap-2 pt-3 border-t border-slate-100/50">
                    <button 
                       onClick={() => handleModeration(post.id, 'reject')}
                       className="flex-1 py-2 rounded-xl bg-coral/10 text-coral font-bold text-xs flex items-center justify-center gap-2 hover:bg-coral/20 transition-colors"
                    >
                       <Ban size={16} /> 拒绝
                    </button>
                    <button 
                       onClick={() => handleModeration(post.id, 'approve')}
                       className="flex-1 py-2 rounded-xl bg-mint text-slate-800 font-bold text-xs flex items-center justify-center gap-2 hover:bg-mint-dark transition-colors"
                    >
                       <Check size={16} /> 批准发布
                    </button>
                 </div>
              ) : (
                 <>
                    <div className={`flex items-center gap-6 border-t border-slate-100/50 pt-3 ${post.status === 'pending' ? 'opacity-50 pointer-events-none' : ''}`}>
                       <button 
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${post.isLiked ? 'text-coral' : 'text-slate-400'}`}
                       >
                          <Heart size={18} fill={post.isLiked ? "currentColor" : "none"} />
                          {post.likes}
                       </button>
                       <button 
                          onClick={() => setActiveCommentId(activeCommentId === post.id ? null : post.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                       >
                          <MessageCircle size={18} />
                          {post.comments.length}
                       </button>
                    </div>

                    {post.status !== 'pending' && (
                       <div className="mt-4 bg-slate-50/50 rounded-2xl p-3 space-y-3">
                          {post.comments.map(comment => (
                             <div key={comment.id} className="flex gap-2.5 items-start text-sm">
                                {renderAvatar(comment.avatar)}
                                <div className="flex-1">
                                   <div className="flex justify-between">
                                      <span className="font-bold text-slate-700">{comment.author}:</span>
                                      {comment.isCorrectAnswer && (
                                         <span className="inline-flex items-center gap-0.5 bg-mint text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                            <Zap size={8} fill="currentColor" /> 最佳答案
                                         </span>
                                      )}
                                   </div>
                                   <span className="text-slate-600 block mt-0.5">{comment.content}</span>
                                </div>
                             </div>
                          ))}
                          
                          {activeCommentId === post.id && (
                             <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex gap-2 mt-2 pt-2 border-t border-slate-100"
                             >
                                <input 
                                   type="text"
                                   value={commentInput[post.id] || ''}
                                   onChange={(e) => setCommentInput({...commentInput, [post.id]: e.target.value})}
                                   placeholder={post.type === 'question' ? "输入答案赚取XP..." : "写下评论..."}
                                   className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-mint focus:outline-none"
                                />
                                <button 
                                   onClick={() => handleComment(post.id)}
                                   className="bg-mint text-slate-800 rounded-xl w-8 flex items-center justify-center hover:bg-mint-dark transition-colors"
                                >
                                   <Send size={14} />
                                </button>
                             </motion.div>
                          )}
                       </div>
                    )}
                 </>
              )}

            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};