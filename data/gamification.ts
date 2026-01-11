
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

export const MOCK_FRIENDS = [
  { id: 'f1', name: 'Alice', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Alice', weeklyXP: 3250, xp: 7250, tierId: 't6' },
  { id: 'f2', name: 'Dr. Zinc', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Zinc', weeklyXP: 2890, xp: 3890, tierId: 't5' },
  { id: 'f3', name: 'Felix', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Felix', weeklyXP: 1540, xp: 1540, tierId: 't4' },
  { id: 'f4', name: 'Bob', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Bob', weeklyXP: 920, xp: 920, tierId: 't3' },
  { id: 'f5', name: 'Annie', avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Annie', weeklyXP: 450, xp: 450, tierId: 't2' },
];

export const MOCK_POSTS: SocialPost[] = [
  {
    id: 'p1',
    author: '化学小达人',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    type: 'question',
    status: 'approved',
    content: '求助！为什么浓硫酸稀释的时候不能把水倒进酸里？🧪',
    likes: 12,
    isLiked: false,
    timestamp: '10分钟前',
    xpReward: 50,
    solved: false,
    comments: [
       { id: 'c1', author: 'Dr. Zinc', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zinc', content: '因为浓硫酸溶解会放出大量的热！如果水倒进酸里，水会沸腾飞溅伤人。', timestamp: '5分钟前', isCorrectAnswer: true }
    ]
  },
  {
    id: 'p2',
    author: '没头脑',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Annie',
    type: 'share',
    status: 'approved',
    content: '今天终于把元素周期表背下来了！开心！🎉',
    image: 'https://picsum.photos/id/20/400/300',
    likes: 45,
    isLiked: true,
    timestamp: '1小时前',
    comments: []
  },
  {
    id: 'p3',
    author: '不高兴',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    type: 'question',
    status: 'approved',
    content: '这道有机题好难啊，乙醇氧化到底生成乙醛还是乙酸？🤔',
    likes: 5,
    isLiked: false,
    timestamp: '2小时前',
    xpReward: 30,
    solved: false,
    comments: []
  }
];
