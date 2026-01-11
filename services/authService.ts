
import { supabase } from './supabaseClient';
import { User, AuthResponse } from '../types';
import { INITIAL_LEVELS } from '../constants';

const EMAIL_DOMAIN = 'chemstep.app'; // Virtual domain for username mapping (Legacy support)

// Helper to construct a default user structure
const createDefaultUser = (id: string, displayName: string, role: 'student' | 'admin' = 'student', email?: string): User => {
  return {
    id,
    username: displayName,
    email: email || `${displayName}@${EMAIL_DOMAIN}`,
    role,
    stats: {
      xp: role === 'admin' ? 9999 : 0,
      studyPlan: { days: [1, 2, 3, 4, 5], time: '19:00', xpTarget: 300 }, // Updated to 300 default
      weeklyProgress: { weeklyXP: 0, lastLoginDate: new Date().toISOString().split('T')[0], daysCompleted: [] },
      elementsCollected: role === 'admin' ? ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne'] : [],
      level: role === 'admin' ? 50 : 1
    },
    avatarConfig: { 
      skinColor: '#C0Aede', 
      hat: role === 'admin' ? 'crown' : 'wizard', 
      face: 'happy', 
      item: role === 'admin' ? 'wand' : 'book', 
      profession: role === 'admin' ? 'scientist' : 'student', 
      pattern: 'none', 
      bgEffect: 'none' 
    },
    levels: INITIAL_LEVELS.map(l => role === 'admin' ? { ...l, locked: false } : l),
    mistakes: []
  };
};

// Helper: Map frontend User object to DB columns based on your screenshot
// This ensures 'username' and 'email' are never null during upsert/insert
const formatProfileForDB = (user: User) => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        stats: user.stats,
        avatar_config: user.avatarConfig,      // Snake_case column match
        levels_progress: user.levels,          // Snake_case column match
        mistakes: user.mistakes,
        game_data: user,                       // Keep full JSON as backup
        // created_at is handled by DB default
    };
};

export const authService = {
  // --- Email Management ---
  updateEmail: async (newEmail: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.updateUser({ email: newEmail });
      
      if (error) throw error;
      
      // Update local profile immediately as well to reflect pending state if needed
      if (data.user) {
          const { error: dbError } = await supabase
            .from('profiles')
            .update({ email: newEmail })
            .eq('id', data.user.id);
            
          if (dbError) console.error("Profile email update warning:", dbError);
      }

      return { success: true, message: "确认邮件已发送至新邮箱！请点击邮件中的链接以完成绑定。" };
    } catch (error: any) {
      console.error("Update Email Error:", error.message);
      return { success: false, message: error.message || "邮箱更新失败，请重试" };
    }
  },

  // --- Password Recovery ---
  resetPassword: async (email: string): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin, // User will be redirected back to the app, logged in
      });
      
      if (error) throw error;
      return { success: true, message: "重置链接已发送，请检查邮箱（包括垃圾箱）。点击链接后您将自动登录，请随后在“我的”页面修改密码。" };
    } catch (error: any) {
      console.error("Reset Password Error:", error.message);
      return { success: false, message: error.message || '发送失败，请检查邮箱是否正确' };
    }
  },

  updatePassword: async (newPassword: string): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      return { success: true, message: "密码修改成功！" };
    } catch (error: any) {
      return { success: false, message: error.message || "密码修改失败" };
    }
  },

  // --- Pure Supabase Registration (With Real Email) ---
  register: async (email: string, username: string, password: string): Promise<AuthResponse> => {
    const cleanUsername = username.trim();
    const cleanEmail = email.trim();
    
    // 1. Input Validation
    if (cleanUsername.length < 2) return { success: false, message: '用户名太短' };
    if (!cleanEmail.includes('@')) return { success: false, message: '请输入有效的邮箱地址' };
    if (password.length < 6) return { success: false, message: '密码至少6位' };
    
    // Username character check (Optional, can be relaxed)
    if (!/^[a-zA-Z0-9_\u4e00-\u9fa5\s]+$/.test(cleanUsername)) {
        return { success: false, message: '用户名只能包含字母、数字或中文' };
    }

    try {
      // 2. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password: password,
        options: { data: { username: cleanUsername } }
      });

      if (authError) {
          if (authError.message.includes('already registered')) {
              return { success: false, message: '该邮箱已被注册，请直接登录' };
          }
          if (authError.message.includes('rate limit')) {
              return { success: false, message: '注册太频繁，请稍后再试' };
          }
          throw authError;
      }

      if (authData.user) {
        // 3. Manual Profile Creation
        const newUser = createDefaultUser(authData.user.id, cleanUsername, 'student', cleanEmail);
        
        // Only attempt to insert profile if we have a session (RLS requires it)
        // NOTE: If "Confirm Email" is enabled in Supabase, session will be null here.
        if (authData.session) {
            const { error: dbError } = await supabase
              .from('profiles')
              .insert([formatProfileForDB(newUser)]);

            if (dbError) {
                console.error("Profile creation failed DB Error:", dbError.message || dbError);
                // If specific constraint fails, might be duplicate username in profiles table
                if (dbError.message.includes('duplicate key') || dbError.code === '23505') {
                   // This is rare if auth email was unique, but possible if username column is unique
                   // We proceed anyway as auth is successful
                }
            }
            return { success: true, user: newUser };
        } else {
            console.log("Registration successful but no session returned. Email confirmation might be required.");
            return { success: true, message: "注册成功！请前往邮箱查收验证邮件以完成登录。" };
        }
      }
      
      return { success: false, message: '注册无响应，请重试' };

    } catch (error: any) {
      console.error("Register Error:", error.message);
      return { success: false, message: error.message || '注册失败，请检查网络' };
    }
  },

  // --- Pure Supabase Login ---
  login: async (identifier: string, password: string): Promise<AuthResponse> => {
    const cleanIdentifier = identifier.trim();

    try {
      // 1. Sign In
      // Support both pure Email and Legacy Username (virtual email)
      const email = cleanIdentifier.includes('@') ? cleanIdentifier : `${cleanIdentifier}@${EMAIL_DOMAIN}`;
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (authError) {
         if (authError.message.includes('Invalid login')) {
             return { success: false, message: '账号或密码错误' };
         }
         if (authError.message.includes('Email not confirmed')) {
             return { success: false, message: '请先前往邮箱确认验证链接' };
         }
         throw authError;
      }

      if (authData.user) {
        // 2. Fetch Profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*') 
          .eq('id', authData.user.id)
          .maybeSingle(); 
          
        let user: User | null = null;
        
        if (profileData) {
            // Prioritize game_data if it exists, otherwise reconstruct from columns
            if (profileData.game_data) {
                user = profileData.game_data as User;
                user.id = authData.user.id;
                user.email = profileData.email; 
            } else {
                // Fallback reconstruction
                user = createDefaultUser(authData.user.id, profileData.username, profileData.role || 'student', profileData.email);
                if (profileData.stats) user.stats = profileData.stats;
                if (profileData.avatar_config) user.avatarConfig = profileData.avatar_config;
                if (profileData.levels_progress) user.levels = profileData.levels_progress;
                if (profileData.mistakes) user.mistakes = profileData.mistakes;
            }
        }
        
        // 3. Auto-Repair Profile (if missing)
        if (!user) {
            console.log("Profile not found, initializing new profile...");
            // Use metadata username if available, else split email
            const fallbackName = authData.user.user_metadata?.username || cleanIdentifier.split('@')[0];
            
            user = createDefaultUser(authData.user.id, fallbackName, 'student', email);
            
            const { error: repairError } = await supabase.from('profiles').upsert(formatProfileForDB(user));
            
            if (repairError) {
                console.error("Profile repair failed:", repairError.message);
            }
        }
        
        return { success: true, user };
      }
      
      return { success: false, message: '登录失败' };

    } catch (error: any) {
       console.error("Login Error:", error.message);
       return { success: false, message: error.message || "登录服务不可用" };
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            // Check if profile exists
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle(); 
                
            if (data) {
                if (data.game_data) return { ...data.game_data, id: session.user.id };
                const u = createDefaultUser(session.user.id, data.username, data.role, data.email);
                if (data.stats) u.stats = data.stats;
                if (data.avatar_config) u.avatarConfig = data.avatar_config;
                if (data.levels_progress) u.levels = data.levels_progress;
                if (data.mistakes) u.mistakes = data.mistakes;
                return u;
            } else {
                // If we have a session (e.g. from previously logged in Google/Email) but NO profile in DB, create one now.
                // This handles cases where auth exists but profile was deleted or failed to create.
                console.log("Session detected but no profile found: Creating new profile...");
                
                const emailName = session.user.email?.split('@')[0];
                const displayName = emailName || 'Student';
                
                const newUser = createDefaultUser(
                    session.user.id, 
                    displayName, 
                    'student', 
                    session.user.email
                );

                // Insert into DB
                const { error } = await supabase.from('profiles').insert([formatProfileForDB(newUser)]);
                if (error) {
                    console.error("Failed to recover profile:", error);
                }
                
                return newUser;
            }
        }
    } catch (e) { 
        console.error("Get Current User Error:", e);
    }
    return null;
  },

  saveProgress: async (user: User) => {
    if (user.id.startsWith('demo-')) return;
    const { error } = await supabase.from('profiles').upsert(formatProfileForDB(user));
    if (error) {
        console.error("Save Progress Error:", error.message);
    }
  }
};
