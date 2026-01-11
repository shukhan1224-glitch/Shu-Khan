
import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import { ArrowRight, Sparkles, Info, User as UserIcon, Lock, Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { authService } from '../services/authService';
import { User } from '../types';
import { Mascot } from './Mascot';

const motion = m as any;

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  
  // Separate states for clarity
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      let result;
      if (isResetting) {
         // --- RESET PASSWORD FLOW ---
         result = await authService.resetPassword(email);
         if (result.success) {
             setSuccessMsg(result.message || '重置邮件已发送');
             // Don't clear loading state immediately so user sees success
         } else {
             setError(result.message || '发送失败');
         }
      } else if (isLogin) {
        // --- LOGIN FLOW ---
        // For login, 'email' state acts as the identifier (can be email or username)
        result = await authService.login(email, password);
        if (result.success && result.user) {
            onLogin(result.user);
        } else if (result.success && result.message) {
            setSuccessMsg(result.message);
        } else {
            setError(result.message || '登录失败');
        }
      } else {
        // --- REGISTER FLOW ---
        result = await authService.register(email, username, password);
        if (result.success) {
            if (result.user) {
                onLogin(result.user);
            } else if (result.message) {
                setSuccessMsg(result.message);
                setIsLogin(true); // Switch to login view
            }
        } else {
            setError(result.message || '注册失败');
        }
      }
    } catch (err: any) {
      setError('网络或服务器错误');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
      setIsLogin(!isLogin); 
      setIsResetting(false);
      setError(''); 
      setSuccessMsg('');
      if (!isLogin) {
          // If switching TO login, maybe keep email if typed
      } else {
          // Switching TO register
          setUsername('');
      }
  };

  const switchToReset = () => {
      setIsResetting(true);
      setError('');
      setSuccessMsg('');
  };

  const backToLogin = () => {
      setIsResetting(false);
      setIsLogin(true);
      setError('');
      setSuccessMsg('');
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
         className="absolute -top-20 -right-20 w-64 h-64 bg-magic/20 rounded-full blur-3xl"
      />
      <motion.div 
         animate={{ rotate: -360 }}
         transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
         className="absolute -bottom-20 -left-20 w-64 h-64 bg-apricot/20 rounded-full blur-3xl"
      />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl p-8 relative border border-white/50"
      >
        {isResetting && (
            <button onClick={backToLogin} className="absolute top-6 left-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                <ArrowLeft size={20} />
            </button>
        )}

        <div className="text-center mb-8 flex flex-col items-center">
           {/* OCTO MASCOT */}
           <div className="mb-4 relative">
             <div className="absolute inset-0 bg-magic/20 blur-xl rounded-full scale-110" />
             <Mascot size={120} mood={isResetting ? "thinking" : "welcome"} className="relative z-10" />
           </div>
           
           <h1 className="text-3xl font-magic font-black text-slate-800 tracking-tight">
               {isResetting ? "找回密码" : "ChemStep"}
           </h1>
           <p className="text-slate-400 font-bold mt-1 text-sm">
               {isResetting ? "我们会发送一个魔法链接到你的邮箱" : "与魔法章鱼 Octo 一起探索化学! 🐙✨"}
           </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email / Identifier Field */}
          <div>
             <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-2 flex items-center gap-1">
                {isResetting || !isLogin ? <Mail size={12} /> : <UserIcon size={12} />} 
                {isResetting ? '注册邮箱' : (isLogin ? '邮箱 / 用户名' : '邮箱地址')}
             </label>
             <input 
                type={isLogin && !isResetting ? "text" : "email"}
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={isResetting ? "请输入您的注册邮箱" : (isLogin ? "请输入邮箱或用户名" : "name@example.com")}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 outline-none focus:border-magic focus:bg-white transition-all font-bold text-slate-700 placeholder:font-normal placeholder:text-slate-400"
             />
          </div>

          {/* Username Field (Register Only) */}
          <m.div 
             initial={false}
             animate={{ height: !isResetting && !isLogin ? 'auto' : 0, opacity: !isResetting && !isLogin ? 1 : 0 }}
             className="overflow-hidden"
          >
             <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-2 flex items-center gap-1">
                <UserIcon size={12} /> 设置昵称
             </label>
             <input 
                type="text" 
                required={!isLogin && !isResetting}
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="大家怎么称呼你?"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 outline-none focus:border-magic focus:bg-white transition-all font-bold text-slate-700 placeholder:font-normal placeholder:text-slate-400"
             />
          </m.div>
          
          {/* Password Field (Not in Reset Mode) */}
          <m.div 
             initial={false}
             animate={{ height: isResetting ? 0 : 'auto', opacity: isResetting ? 0 : 1 }}
             className="overflow-hidden"
          >
             <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-2 flex items-center gap-1">
                <Lock size={12} /> 密码
             </label>
             <input 
                type="password" 
                required={!isResetting}
                placeholder={isLogin ? "请输入密码" : "设置密码 (至少6位)"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 outline-none focus:border-magic focus:bg-white transition-all font-bold text-slate-700 placeholder:font-normal placeholder:text-slate-400"
             />
             
             {/* Forgot Password Link (Only in Login) */}
             {isLogin && !isResetting && (
                 <div className="flex justify-end mt-2">
                     <button 
                        type="button"
                        onClick={switchToReset}
                        className="text-xs font-bold text-slate-400 hover:text-magic transition-colors flex items-center gap-1"
                     >
                        <KeyRound size={10} /> 忘记密码?
                     </button>
                 </div>
             )}
          </m.div>

          {/* Messages */}
          {error && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-coral text-xs font-bold text-center bg-coral/10 py-2 rounded-xl border border-coral/20 px-2">
                {error}
             </motion.div>
          )}
          {successMsg && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 text-xs font-bold text-center bg-green-100 py-2 rounded-xl border border-green-200 px-2">
                {successMsg}
             </motion.div>
          )}

          <button 
             type="submit"
             disabled={isLoading}
             className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
          >
             {isLoading ? (
                <Sparkles size={20} className="animate-spin" />
             ) : (
                <>
                   {isResetting ? '发送重置链接' : (isLogin ? '开始学习' : '创建账号')} 
                   {!isResetting && <ArrowRight size={20} />}
                </>
             )}
          </button>
        </form>

        {!isResetting && (
            <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm font-bold">
                {isLogin ? '还没有账号?' : '已有账号?'}
                <button 
                    onClick={toggleMode}
                    className="ml-2 text-magic-dark underline decoration-2 underline-offset-2 hover:text-magic transition-colors"
                >
                    {isLogin ? '邮箱注册' : '直接登录'}
                </button>
            </p>
            </div>
        )}
      </motion.div>
    </div>
  );
};
