
import { Tier, SocialPost } from '../types';

// --- LEAGUE TIERS ---
export const TIER_SYSTEM: Tier[] = [
  { id: 't1', name: '初心原子', minXP: 0, maxXP: 199, color: 'text-slate-500', bgGradient: 'from-slate-100 to-slate-200', icon: '🥚', description: '万物之始，潜力无限。' },
  { id: 't2', name: '活跃分子', minXP: 200, maxXP: 599, color: 'text-blue-500', bgGradient: 'from-blue-50 to-blue-100', icon: '💧', description: '开始与其他元素发生反应。' },
  { id: 't3', name: '游离离子', minXP: 600, maxXP: 1199, color: 'text-green-500', bgGradient: 'from-green-50 to-green-100', icon: '⚡', description: '充满了能量，极其活跃！' },
  { id: 't4', name: '稳定晶体', minXP: 1200, maxXP: 2499, color: 'text-teal-500', bgGradient: 'from-teal-50 to-teal-100', icon: '💎', description: '结构坚固，知识牢不可破。' },
  { id: 't5', name: '核心催化', minXP: 2500, maxXP: 4999, color: 'text-orange-500', bgGradient: 'from-orange-50 to-orange-100', icon: '🔥', description: '你是团队反应的核心动力。' },
  { id: 't6', name: '炼金术士', minXP: 5000, maxXP: 9999, color: 'text-purple-500', bgGradient: 'from-purple-50 to-purple-100', icon: '⚗️', description: '掌握了物质转化的奥秘。' },
  { id: 't7', name: '量子学者', minXP: 10000, maxXP: 19999, color: 'text-indigo-500', bgGradient: 'from-indigo-50 to-indigo-100', icon: '⚛️', description: '洞悉微观世界的真理。' },
  { id: 't8', name: '元素之神', minXP: 20000, maxXP: 999999, color: 'text-yellow-600', bgGradient: 'from-yellow-100 to-yellow-200', icon: '👑', description: '化学界的传说。' },
];

export const MOCK_LEAGUE_USERS = [
  { id: 'official-001', name: 'ChemStep Official', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=OctoMascot&backgroundColor=b6e3f4', xp: 99999, tierId: 't8' },
  { id: 'u101', name: 'Alice', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Alice', xp: 7250, tierId: 't6' },
  { id: 'u102', name: 'Dr. Zinc', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Zinc', xp: 3890, tierId: 't5' },
  { id: 'u103', name: 'Felix', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Felix', xp: 1540, tierId: 't4' },
  { id: 'u104', name: 'Bob', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Bob', xp: 920, tierId: 't3' },
  { id: 'u105', name: 'Annie', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Annie', xp: 450, tierId: 't2' },
  { id: 'u106', name: 'Tom', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Tom', xp: 120, tierId: 't1' },
  { id: 'u107', name: 'Marie Curie Fan', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Marie', xp: 18500, tierId: 't7' },
  { id: 'u108', name: 'Nobel Pro', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Nobel', xp: 2200, tierId: 't4' },
];

// Re-export MOCK_LEAGUE_USERS as MOCK_FRIENDS for legacy compatibility if needed
export const MOCK_FRIENDS = MOCK_LEAGUE_USERS.filter(u => u.id !== 'official-001');

export const MOCK_POSTS: SocialPost[] = [
  {
    id: 'admin-001',
    author: 'ChemStep Official',
    authorId: 'official-001', 
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=OctoMascot&backgroundColor=b6e3f4',
    type: 'share',
    status: 'approved',
    content: '🎉 欢迎来到 ChemStep 化学圈子！\n\n在这里，你可以：\n📝 分享你的学习笔记\n🤔 提出遇到的化学难题\n✨ 展示你的元素收藏\n\n🎁 **新人福利**：\n只要 **点赞 + 留言** 本条动态，Octo 就会为你送上一份神秘的 **【限定头像特效】**！(系统将自动发放)\n\n快来试试吧！👇',
    image: undefined,
    likes: 1208,
    isLiked: false,
    timestamp: '置顶',
    comments: [],
    xpReward: 0,
    solved: false
  }
];
