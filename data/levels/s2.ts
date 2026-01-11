
import { Level } from '../../types';

const pos = { x: 50, y: 50 };

export const S2_META = {
  's2_ch17': { title: '第17章 气体', description: '理想气体与状态方程', emoji: '🎈' },
  's2_ch18': { title: '第18章 溶液性质', description: '溶解度与依数性', emoji: '🧪' },
  's2_ch19': { title: '第19章 反应与能量', description: '热化学与盖斯定律', emoji: '🔥' },
  's2_ch20': { title: '第20章 反应速率', description: '动力学与催化', emoji: '⏱️' },
  's2_ch21': { title: '第21章 化学平衡', description: '动态平衡与移动', emoji: '⚖️' },
  's2_ch22': { title: '第22章 溶解平衡', description: '难溶电解质与 Ksp', emoji: '🌫️' },
  's2_ch23': { title: '第23章 酸碱盐', description: 'pH、缓冲液与水解', emoji: '🍋' },
  's2_ch24': { title: '第24章 电化学', description: '电池与电解', emoji: '🔋' },
  's2_ch25': { title: '第25章 核化学', description: '衰变与核能', emoji: '☢️' },
};

export const S2_LEVELS: Level[] = [
  // --- 第17章: 气体 ---
  { 
    id: 's2_ch17_1', chapterId: 's2_ch17', grade: 'S2', title: '17.1 物质的状态', description: '固液气', locked: false, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '三态', difficulty: 'normal', 
        story: { title: '自由的灵魂', content: 'Octo 变成气体分子后感觉自由极了！在这个状态下，分子间的距离最大，想飞去哪就去哪。', emoji: '🕊️', mood: 'happy' },
        questions: [{ id: 'q1', type: 'mcq', text: '分子间距离最大的是？', options: ['固态', '液态', '气态'], correctIndex: 2, explanation: '气态分子间距大。' }] 
      },
      { 
        id: 'p2', title: '相变', difficulty: 'normal', 
        story: { title: '能量的舞蹈', content: '当 Octo 给冰块加热，水分子开始剧烈跳舞，挣脱了束缚变成液态水。再加热，它们就飞上天变成了水蒸气！', emoji: '💃', mood: 'magic' },
        questions: [{ id: 'q2', type: 'mcq', text: '固体直接变为气体叫？', options: ['熔化', '升华'], correctIndex: 1, explanation: '升华。' }] 
      }
    ] 
  },
  { 
    id: 's2_ch17_2', chapterId: 's2_ch17', grade: 'S2', title: '17.2 气体的性质', description: '扩散与压缩', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '性质', difficulty: 'normal', 
        story: { title: '挤压气球', content: 'Octo 试图把一个大气球塞进小箱子。气体很容易被压缩，因为它们分子之间空荡荡的！', emoji: '🎈', mood: 'playful' },
        questions: [{ id: 'q1', type: 'mcq', text: '气体容易被压缩是因为？', options: ['分子间隙大', '分子在运动'], correctIndex: 0, explanation: '间隙大。' }] 
      },
      { 
        id: 'p2', title: '扩散', difficulty: 'normal', 
        story: { title: '香水分子赛跑', content: 'Octo 在房间角落打开了一瓶香水，不一会儿满屋子都是香味。气体分子总是在不停地无规则运动。', emoji: '🌸', mood: 'happy' },
        questions: [{ id: 'q2', type: 'mcq', text: '气体分子从高浓度向低浓度运动称为？', options: ['扩散', '沉淀'], correctIndex: 0, explanation: '扩散现象。' }] 
      }
    ] 
  },
  { 
    id: 's2_ch17_3', chapterId: 's2_ch17', grade: 'S2', title: '17.3 气体基本定律', description: '波义耳/查理等', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { id: 'p1', title: '17.3.1 波义耳定律', difficulty: 'normal', story: { title: '深海压力', content: 'Octo 潜得越深，压力越大，他的气泡就缩得越小。这就是波义耳定律：压力大，体积小。', emoji: '🐡', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: '恒温下 PV = ?', options: ['k', '0'], correctIndex: 0, explanation: '常数' }] },
      { id: 'p2', title: '17.3.2 查理定律', difficulty: 'normal', story: { title: '热气球', content: '加热气球里的空气，它就膨胀飞起来了。温度越高，体积越大！', emoji: '🌤️', mood: 'happy' }, questions: [{ id: 'q2', type: 'mcq', text: '恒容下 P 与 T 成？', options: ['正比', '反比'], correctIndex: 0, explanation: '正比' }] },
      { id: 'p3', title: '17.3.3 格雷姆定律', difficulty: 'hard', story: { title: '赛跑比赛', content: '轻的气体分子跑得快，重的跑得慢。Octo 正在给氢气和氧气计时！', emoji: '⏱️', mood: 'challenge' }, questions: [{ id: 'q3', type: 'mcq', text: '扩散速率与密度平方根成？', options: ['正比', '反比'], correctIndex: 1, explanation: '反比' }] }
    ] 
  },
  { 
    id: 's2_ch17_4', chapterId: 's2_ch17', grade: 'S2', title: '17.4 摩尔体积', description: 'Vm', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { id: 'p1', title: '17.4.1 摩尔体积', difficulty: 'normal', story: { title: '标准盒子', content: '在标准状况下，任何 1 mol 的气体都能装进一个 22.4L 的大盒子里。', emoji: '📦', mood: 'smart' }, questions: [{ id: 'q1', type: 'input', text: 'STP 下 Vm = __ L/mol', validAnswer: '22.4', explanation: '标准状况' }] },
      { id: 'p2', title: '17.4.2 阿伏加德罗定律', difficulty: 'normal', story: { title: '公平原则', content: '体积相同，温度压力相同，里面的分子数量就一定相同。这就是气体的公平原则。', emoji: '🤝', mood: 'happy' }, questions: [{ id: 'q2', type: 'mcq', text: '同温同压同体积，分子数？', options: ['相同', '不同'], correctIndex: 0, explanation: '相同' }] }
  ] },
  { 
    id: 's2_ch17_5', chapterId: 's2_ch17', grade: 'S2', title: '17.5 理想气体', description: 'PV=nRT', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { id: 'p1', title: '17.5.1 理想气体', difficulty: 'normal', story: { title: '完美模型', content: '现实世界太复杂，物理学家想象出一种“完美”的气体：分子没有体积，也没有引力。', emoji: '✨', mood: 'dreamy' }, questions: [{ id: 'q1', type: 'mcq', text: '分子间无引力及分子本身无体积的气体是？', options: ['理想气体', '真实气体'], correctIndex: 0, explanation: '理想模型' }] },
      { id: 'p2', title: '17.5.2 状态方程', difficulty: 'hard', story: { title: '万能公式', content: 'PV=nRT！这是描述气体行为的最强咒语。只要掌握了它，你就能预测气体的变化。', emoji: '📜', mood: 'magic' }, questions: [{ id: 'q2', type: 'input', text: 'PV=nRT中R是__常数？', validAnswer: '气体', explanation: '通用气体常数' }] }
  ] },
  {
    id: 's2_ch17_6', chapterId: 's2_ch17', grade: 'S2', title: '17.6 道尔顿分压定律', description: '混合气体的压力', locked: true, completed: false, score: 0, position: pos,
    phases: [
      { id: 'p1', title: '分压', difficulty: 'normal', story: { title: '团结力量大', content: '空气里有氮气、氧气等。它们各自产生的压力（分压）加起来，就是我们感受到的总大气压。', emoji: '🎈', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '混合气体的总压等于？', options: ['各组分分压之和', '各组分分压之积'], correctIndex: 0, explanation: 'P总 = P1 + P2 + ...' }] }
    ]
  },
  {
    id: 's2_ch17_7', chapterId: 's2_ch17', grade: 'S2', title: '17.7 气体分子运动论', description: '微观解释宏观', locked: true, completed: false, score: 0, position: pos,
    phases: [
      { id: 'p1', title: '动能', difficulty: 'normal', story: { title: '疯狂碰碰车', content: '温度越高，分子跑得越快，撞击越猛烈。温度其实就是分子平均动能的体现！', emoji: '🏎️', mood: 'fast' }, questions: [{ id: 'q1', type: 'mcq', text: '温度是气体分子平均__的量度？', options: ['动能', '势能'], correctIndex: 0, explanation: 'Ek = 3/2 kT' }] }
    ]
  },
  {
    id: 's2_ch17_8', chapterId: 's2_ch17', grade: 'S2', title: '17.8 真实气体', description: '范德华方程', locked: true, completed: false, score: 0, position: pos,
    phases: [
      { id: 'p1', title: '偏差', difficulty: 'hard', story: { title: '不再完美', content: '当压力太大（太挤）或温度太低（太冷）时，分子间的引力和体积就不能忽略了，理想气体变成了“真实气体”。', emoji: '🥶', mood: 'nervous' }, questions: [{ id: 'q1', type: 'mcq', text: '真实气体最接近理想气体的条件？', options: ['高温低压', '低温高压'], correctIndex: 0, explanation: '分子间距大，引力忽略。' }] }
    ]
  },
  {
    id: 's2_ch17_9', chapterId: 's2_ch17', grade: 'S2', title: '17.9 相的变化', description: '蒸气压与沸点', locked: true, completed: false, score: 0, position: pos,
    phases: [
      { id: 'p1', title: '沸腾', difficulty: 'normal', story: { title: '冲破束缚', content: '水想变成气飞走（蒸气压），大气压压着不让。当蒸气压大到能顶开大气压时，水就沸腾了！', emoji: '🍲', mood: 'excited' }, questions: [{ id: 'q1', type: 'mcq', text: '液体沸腾时，其饱和蒸气压__外界压力？', options: ['等于', '小于'], correctIndex: 0, explanation: '沸腾条件。' }] }
    ]
  },
  
  // --- 第18章: 溶液性质 ---
  { 
    id: 's2_ch18_1', chapterId: 's2_ch18', grade: 'S2', title: '18.1 溶液组成', description: '溶质溶剂', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '定义', difficulty: 'normal', 
        story: { title: '隐身术', content: 'Octo 把糖放进水里，糖不见了！它被“溶解”了，变成了均匀的糖水。', emoji: '🥛', mood: 'magic' },
        questions: [{ id: 'q1', type: 'mcq', text: '被溶解的物质叫？', options: ['溶质', '溶剂'], correctIndex: 0, explanation: '溶质' }] 
      },
      {
        id: 'p2', title: '乳浊液', difficulty: 'normal',
        story: { title: '油水不容', content: 'Octo 试图把油和水混在一起，但它们总是分层。只有加入洗洁精（乳化剂），它们才会手拉手变成乳白色的混合液。', emoji: '🧴', mood: 'thinking' },
        questions: [{ id: 'q2', type: 'mcq', text: '牛奶属于？', options: ['溶液', '乳浊液'], correctIndex: 1, explanation: '小液滴分散在液体中。' }]
      }
    ] 
  },
  { 
    id: 's2_ch18_2', chapterId: 's2_ch18', grade: 'S2', title: '18.2 溶解过程', description: '热效应', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '热量', difficulty: 'normal', story: { title: '冷热交替', content: '有些东西溶解时会让水变冷（如硝酸铵），有些则会让水滚烫（如氢氧化钠）。溶解也伴随着能量变化！', emoji: '🌡️', mood: 'surprised' }, questions: [{ id: 'q1', type: 'mcq', text: '溶解过程可能伴随？', options: ['吸热或放热', '无热量变化'], correctIndex: 0, explanation: '如NaOH放热' }] }] 
  },
  { 
    id: 's2_ch18_3', chapterId: 's2_ch18', grade: 'S2', title: '18.3 饱和溶液', description: '饱和状态', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '定义', difficulty: 'normal', story: { title: '吃饱了', content: '水也是有胃口的。当它再也吃不下（溶解不了）更多溶质时，就变成了“饱和溶液”。', emoji: '😋', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '不能再溶解溶质的溶液是？', options: ['饱和溶液', '不饱和溶液'], correctIndex: 0, explanation: '达到平衡' }] }] 
  },
  { 
    id: 's2_ch18_4', chapterId: 's2_ch18', grade: 'S2', title: '18.4 溶解度曲线', description: '温度影响', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '曲线', difficulty: 'normal', story: { title: '加热开胃', content: '对于大多数固体，水越热，胃口越好（溶解度越大）。但对于气体，水越热，它们跑得越快！', emoji: '📈', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: 'KNO3 溶解度随温度升高而？', options: ['显著增大', '减小'], correctIndex: 0, explanation: '吸热溶解' }] }] 
  },
  { 
    id: 's2_ch18_5', chapterId: 's2_ch18', grade: 'S2', title: '18.5 溶解度计算', description: 'S = m/M * 100', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '计算', difficulty: 'hard', story: { title: '精准配比', content: '要想配置完美的药水，必须精确计算溶解度。每100克水到底能溶解多少克？', emoji: '🧮', mood: 'determined' }, questions: [{ id: 'q1', type: 'input', text: '100g水中溶解36g达到饱和，溶解度是？', validAnswer: '36', explanation: '36g' }] }] 
  },
  { 
    id: 's2_ch18_6', chapterId: 's2_ch18', grade: 'S2', title: '18.6 分配定律', description: '萃取', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '萃取', difficulty: 'normal', story: { title: '搬家公司', content: 'Octo 用一种更好的溶剂（萃取剂）把溶质从水里“抢”过来。这就是萃取，就像搬家一样。', emoji: '🚚', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '萃取利用物质在不同溶剂中__不同？', options: ['溶解度', '密度'], correctIndex: 0, explanation: '分配比' }] }] 
  },
  { 
    id: 's2_ch18_7', chapterId: 's2_ch18', grade: 'S2', title: '18.7 溶液浓度', description: '%, M, m', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { id: 'p1', title: '18.7.2 物质的量浓度', difficulty: 'normal', story: { title: '摩尔浓度', content: '这是化学家最常用的浓度单位。Octo 正在数每升溶液里有多少摩尔的溶质。', emoji: '⚗️', mood: 'smart' }, questions: [{ id: 'q1', type: 'input', text: '1mol NaCl 溶于水配成 1L 溶液，浓度是__M？', validAnswer: '1', explanation: '1 mol/L' }] },
      { id: 'p2', title: '18.7.3 质量摩尔浓度', difficulty: 'normal', story: { title: '不论冷热', content: '有些浓度单位不受温度影响，比如质量摩尔浓度，它看的是溶剂的重量。', emoji: '⚖️', mood: 'thinking' }, questions: [{ id: 'q2', type: 'mcq', text: 'm 的分母是？', options: ['溶剂质量', '溶液体积'], correctIndex: 0, explanation: 'kg溶剂' }] }
  ] },
  { 
    id: 's2_ch18_8', chapterId: 's2_ch18', grade: 'S2', title: '18.8 理想溶液', description: '混合', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '特征', difficulty: 'normal', story: { title: '完美混合', content: '理想的两种液体混合在一起，既不吸热也不放热，体积也不变，就像它们本来就是一家人。', emoji: '🤝', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '理想溶液混合时？', options: ['无热效应', '吸热'], correctIndex: 0, explanation: '性质相似' }] }] 
  },
  { 
    id: 's2_ch18_9', chapterId: 's2_ch18', grade: 'S2', title: '18.9 依数性', description: '沸点/凝固点', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '拉乌尔定律', difficulty: 'hard', story: { title: '撒盐化雪', content: '为什么冬天下雪要撒盐？因为盐水比纯水更难结冰（凝固点降低）！这就是依数性的魔法。', emoji: '❄️', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '溶液蒸气压比纯溶剂？', options: ['低', '高'], correctIndex: 0, explanation: '下降' }] }] 
  },

  // --- 第19章: 反应与能量 ---
  { 
    id: 's2_ch19_1', chapterId: 's2_ch19', grade: 'S2', title: '19.1 热量变化', description: '吸热放热', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '变化', difficulty: 'normal', story: { title: '能量流动', content: '化学反应总是伴随着能量进出。有的反应像暖手宝（放热），有的像冰袋（吸热）。', emoji: '🔥', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '反应容器变热说明是？', options: ['放热反应', '吸热反应'], correctIndex: 0, explanation: '放出热量' }] }] 
  },
  { 
    id: 's2_ch19_2', chapterId: 's2_ch19', grade: 'S2', title: '19.2 反应热与焓', description: 'ΔH', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '焓变', difficulty: 'normal', story: { title: '焓的概念', content: '科学家发明了“焓”（H）这个词来追踪热量。如果 ΔH 是负的，那就是在放热哦！', emoji: '📉', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '吸热反应 ΔH 为？', options: ['正值', '负值'], correctIndex: 0, explanation: '>0' }] }] 
  },
  { 
    id: 's2_ch19_3', chapterId: 's2_ch19', grade: 'S2', title: '19.3 反应热种类', description: '盖斯定律', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { id: 'p1', title: '19.3.2 燃烧热', difficulty: 'normal', story: { title: '燃烧吧', content: '1 mol 物质完全燃烧释放的热量叫燃烧热。这可是评估燃料好坏的关键！', emoji: '⛽', mood: 'determined' }, questions: [{ id: 'q1', type: 'mcq', text: '燃烧热对应生成物状态？', options: ['稳定氧化物', '气态'], correctIndex: 0, explanation: '如CO2, H2O(l)' }] },
      { id: 'p2', title: '19.3.4 黑斯定律', difficulty: 'hard', story: { title: '登山路径', content: '盖斯定律告诉我们：无论你走直线还是绕弯路，只要起点和终点一样，总能量变化就是一样的。', emoji: '🏔️', mood: 'magic' }, questions: [{ id: 'q2', type: 'mcq', text: '反应热取决于？', options: ['始态和终态', '途径'], correctIndex: 0, explanation: '状态函数' }] }
  ] },
  { 
    id: 's2_ch19_4', chapterId: 's2_ch19', grade: 'S2', title: '19.4 能量利用', description: '效率', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '利用', difficulty: 'normal', story: { title: '节能减排', content: '燃料如果不完全燃烧，不仅浪费能量，还会产生污染。Octo 正在设计更高效的炉子。', emoji: '🌿', mood: 'determined' }, questions: [{ id: 'q1', type: 'mcq', text: '提高燃料燃烧效率需？', options: ['足量空气', '隔绝空气'], correctIndex: 0, explanation: '充分燃烧' }] }] 
  },

  // --- 第20章: 反应速率 ---
  { 
    id: 's2_ch20_1', chapterId: 's2_ch20', grade: 'S2', title: '20.1 反应速率', description: '定义', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '定义', difficulty: 'normal', 
        story: { title: '赛跑计时', content: '有的反应快如闪电（爆炸），有的慢如蜗牛（生锈）。我们用“速率”来衡量它们快慢。', emoji: '🏎️', mood: 'fast' },
        questions: [{ id: 'q1', type: 'mcq', text: '速率通常用__变化表示？', options: ['浓度', '体积'], correctIndex: 0, explanation: '单位时间浓度变化' }] 
      },
      {
        id: 'p2', title: '测量', difficulty: 'normal',
        story: { title: '收集气泡', content: 'Octo 拿着秒表，看着镁条在酸里冒泡泡。通过测量每秒钟冒出多少氢气，就能知道反应有多快！', emoji: '⏱️', mood: 'curious' },
        questions: [{ id: 'q2', type: 'sort', text: '测量反应速率的步骤？', items: [{id:'1', content:'记录开始时间'}, {id:'2', content:'收集气体'}, {id:'3', content:'记录结束体积'}], correctOrder: ['记录开始时间', '收集气体', '记录结束体积'], explanation: '通过单位时间产物量计算。' }]
      }
    ] 
  },
  { 
    id: 's2_ch20_2', chapterId: 's2_ch20', grade: 'S2', title: '20.2 影响因素', description: 'T, C, Cat', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { id: 'p1', title: '20.2.1 表面积', difficulty: 'normal', story: { title: '切碎它！', content: '整块木头很难烧，但锯末一点就着。Octo 发现把反应物切得越碎（表面积越大），反应越快！', emoji: '🪚', mood: 'excited' }, questions: [{ id: 'q1', type: 'mcq', text: '粉末状固体反应速率比块状？', options: ['快', '慢'], correctIndex: 0, explanation: '接触面积大' }] },
      { id: 'p2', title: '20.2.2 浓度', difficulty: 'normal', story: { title: '拥挤的舞池', content: '反应物浓度越高，分子越拥挤，碰撞的机会就越多，反应自然就快了！', emoji: '💃', mood: 'happy' }, questions: [{ id: 'q2', type: 'mcq', text: '增大反应物浓度，速率？', options: ['加快', '减慢'], correctIndex: 0, explanation: '碰撞频率增加' }] },
      { id: 'p3', title: '20.2.3 温度', difficulty: 'normal', story: { title: '加热加速', content: '加热会让分子跑得更快，撞击更猛烈。温度每升高10度，速率通常会翻倍哦！', emoji: '🌡️', mood: 'excited' }, questions: [{ id: 'q3', type: 'mcq', text: '升高温度，速率？', options: ['加快', '减慢'], correctIndex: 0, explanation: '活化分子增多' }] },
      { id: 'p4', title: '20.2.4 催化剂', difficulty: 'normal', story: { title: '魔法加速器', content: '催化剂是化学反应的加速挂！它降低了门槛（活化能），让反应更容易发生，但自己却不消耗。', emoji: '🚀', mood: 'magic' }, questions: [{ id: 'q4', type: 'mcq', text: '催化剂改变的是？', options: ['活化能', '焓变'], correctIndex: 0, explanation: '降低活化能' }] }
  ] },

  // --- 第21章: 化学平衡 ---
  { 
    id: 's2_ch21_1', chapterId: 's2_ch21', grade: 'S2', title: '21.1 动态平衡', description: '特征', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '动态', difficulty: 'normal', 
        story: { title: '进水与排水', content: '想象一个水池，一边进水一边排水，如果速度一样，水位就不变。这就是“动态平衡”。反应并没有停止哦！', emoji: '🔄', mood: 'thinking' },
        questions: [{ id: 'q1', type: 'mcq', text: '化学平衡时，正逆反应速率？', options: ['相等且不为零', '均为零'], correctIndex: 0, explanation: 'v正=v逆' }] 
      },
      {
        id: 'p2', title: '特征', difficulty: 'normal',
        story: { title: '不再改变', content: '虽然分子们还在忙碌地变来变去，但宏观上看，颜色不再变深，气泡不再增多。一切看起来都静止了。', emoji: '🛑', mood: 'calm' },
        questions: [{ id: 'q2', type: 'mcq', text: '平衡时各组分浓度？', options: ['保持不变', '相等'], correctIndex: 0, explanation: '浓度恒定。' }]
      }
    ] 
  },
  { 
    id: 's2_ch21_2', chapterId: 's2_ch21', grade: 'S2', title: '21.2 定量研究', description: '平衡常数Kc', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: 'Kc', difficulty: 'normal', story: { title: '平衡常数', content: '无论怎么折腾，只要温度不变，平衡时的某种比例（Kc）永远是个定值。这是大自然的固执。', emoji: '📏', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: 'Kc 只受什么影响？', options: ['温度', '压强', '浓度'], correctIndex: 0, explanation: '温度' }] }] 
  },
  { 
    id: 's2_ch21_3', chapterId: 's2_ch21', grade: 'S2', title: '21.3 影响因素', description: '移动', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '压强', difficulty: 'normal', story: { title: '施加压力', content: '如果你挤压气体，平衡会向“占地面积小”（气体体积小）的方向移动，试图抵抗你的挤压。', emoji: '🏋️', mood: 'challenge' }, questions: [{ id: 'q1', type: 'mcq', text: '加压平衡向气体体积__方向移动？', options: ['减小', '增大'], correctIndex: 0, explanation: '减小' }] }] 
  },
  { 
    id: 's2_ch21_4', chapterId: 's2_ch21', grade: 'S2', title: '21.4 勒沙特列原理', description: '原理应用', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '应用', difficulty: 'hard', story: { title: '唱反调原理', content: '勒沙特列原理：如果你试图改变平衡，平衡就会向着“减弱这种改变”的方向移动。它总是跟你唱反调！', emoji: '😈', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '改变条件，平衡向__改变的方向移动？', options: ['减弱', '增强'], correctIndex: 0, explanation: '减弱这种改变' }] }] 
  },

  // --- 第22章: 溶解平衡 ---
  { 
    id: 's2_ch22_1', chapterId: 's2_ch22', grade: 'S2', title: '22.1 溶解平衡', description: 'Ksp', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: 'Ksp', difficulty: 'normal', story: { title: '难溶物', content: '即使是难溶的沉淀，其实也有极少量的离子溶解在水里。我们用 Ksp 来衡量这种能力。', emoji: '🌫️', mood: 'thinking' }, questions: [{ id: 'q1', type: 'input', text: 'BaSO4 ⇌ Ba2+ + __?', validAnswer: 'SO4 2-', explanation: '硫酸根' }] }] 
  },
  { 
    id: 's2_ch22_2', chapterId: 's2_ch22', grade: 'S2', title: '22.2 影响因素', description: '同离子', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '同离子', difficulty: 'normal', story: { title: '排斥效应', content: '如果溶液里已经有了某种离子，新的同种离子就很难再溶解进去了。这叫同离子效应。', emoji: '🚫', mood: 'nervous' }, questions: [{ id: 'q1', type: 'mcq', text: '加入含有相同离子的强电解质，溶解度？', options: ['减小', '增大'], correctIndex: 0, explanation: '抑制溶解' }] }] 
  },
  { 
    id: 's2_ch22_3', chapterId: 's2_ch22', grade: 'S2', title: '22.3 沉淀预测', description: 'Q与Ksp', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '预测', difficulty: 'hard', story: { title: '会不会沉淀？', content: 'Octo 通过计算 Q 和 Ksp 的大小，就能像预言家一样判断沉淀会不会生成！', emoji: '🔮', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: 'Q > Ksp 时？', options: ['沉淀析出', '无沉淀'], correctIndex: 0, explanation: '过饱和' }] }] 
  },
  { 
    id: 's2_ch22_4', chapterId: 's2_ch22', grade: 'S2', title: '22.4 沉淀转化', description: '转化', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '转化', difficulty: 'normal', story: { title: '更难溶的胜出', content: '沉淀并不是永恒的。如果遇到更难溶的物质，它就会发生转化。就像更强者取代了弱者。', emoji: '⚔️', mood: 'determined' }, questions: [{ id: 'q1', type: 'mcq', text: '沉淀向溶解度__的方向转化？', options: ['更小', '更大'], correctIndex: 0, explanation: '更难溶' }] }] 
  },

  // --- 第23章: 酸碱盐 ---
  { 
    id: 's2_ch23_1', chapterId: 's2_ch23', grade: 'S2', title: '23.1 酸碱理论', description: '三大理论', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { id: 'p1', title: '23.1.2 质子理论', difficulty: 'normal', story: { title: '质子传递', content: 'Bronsted 认为，酸就是给别人质子（H+）的大方鬼，碱就是接受质子的吝啬鬼。', emoji: '🎁', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '质子给予体是？', options: ['酸', '碱'], correctIndex: 0, explanation: '酸' }] },
      { id: 'p2', title: '23.1.3 电子理论', difficulty: 'normal', story: { title: '电子对', content: 'Lewis 的眼光更独特：他看谁接受了电子对，谁就是酸。这解释了许多没有氢的酸！', emoji: '👀', mood: 'smart' }, questions: [{ id: 'q2', type: 'mcq', text: '接受电子对的是？', options: ['路易斯酸', '路易斯碱'], correctIndex: 0, explanation: '酸' }] }
  ] },
  { 
    id: 's2_ch23_2', chapterId: 's2_ch23', grade: 'S2', title: '23.2 电离度与常数', description: 'Ka', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '强弱', difficulty: 'normal', story: { title: '酸的强度', content: '不是所有酸都一样强。醋酸就很弱，因为它不愿意完全拆开（电离）。Ka 越小，酸性越弱。', emoji: '💪', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: 'Ka 越小，酸性越？', options: ['弱', '强'], correctIndex: 0, explanation: '电离程度小' }] }] 
  },
  { 
    id: 's2_ch23_3', chapterId: 's2_ch23', grade: 'S2', title: '23.3 水的电离与pH', description: 'pH计算', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: 'pH', difficulty: 'normal', 
        story: { title: 'pH 标尺', content: 'Octo 有一把神奇的尺子叫 pH。数字越小，酸性越强。中性是 7 哦！', emoji: '📏', mood: 'happy' },
        questions: [{ id: 'q1', type: 'input', text: '[H+]=0.01M, pH=?', validAnswer: '2', explanation: '-lg(0.01)' }] 
      },
      {
        id: 'p2', title: '稀释', difficulty: 'normal',
        story: { title: '加水变淡', content: '如果你往酸里加水，酸性会变弱，pH值会慢慢变大（接近7）。但无论怎么加水，酸永远不会变成碱！', emoji: '💧', mood: 'smart' },
        questions: [{ id: 'q2', type: 'mcq', text: '酸溶液无限稀释，pH接近？', options: ['7', '14'], correctIndex: 0, explanation: '接近中性。' }]
      }
    ] 
  },
  { 
    id: 's2_ch23_4', chapterId: 's2_ch23', grade: 'S2', title: '23.4 酸碱滴定', description: '中和', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '指示剂', difficulty: 'normal', story: { title: '变色龙', content: '滴定实验需要“变色龙”指示剂。当酸碱正好中和时，它会瞬间变色提醒我们！', emoji: '🦎', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '强碱滴定弱酸选用？', options: ['酚酞', '甲基橙'], correctIndex: 0, explanation: '终点显碱性' }] }] 
  },
  { 
    id: 's2_ch23_5', chapterId: 's2_ch23', grade: 'S2', title: '23.5 盐类水解', description: '水解规律', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '酸碱性', difficulty: 'normal', story: { title: '谁强显谁性', content: '盐不一定是中性的！强酸弱碱盐会显酸性，因为弱者（弱碱离子）会抢水里的 OH-，剩下 H+。', emoji: '⚔️', mood: 'challenge' }, questions: [{ id: 'q1', type: 'mcq', text: 'NH4Cl 溶液显？', options: ['酸性', '碱性'], correctIndex: 0, explanation: '强酸弱碱盐' }] }] 
  },
  { 
    id: 's2_ch23_6', chapterId: 's2_ch23', grade: 'S2', title: '23.6 缓冲溶液', description: '抗酸碱', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '定义', difficulty: 'normal', story: { title: '稳如泰山', content: '我们的血液里有缓冲系统，即使吃了酸柠檬，血液的 pH 值也不会剧烈波动。太神奇了！', emoji: '🛡️', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '缓冲溶液能抵抗少量酸碱干扰保持__稳定？', options: ['pH', '体积'], correctIndex: 0, explanation: 'pH值' }] }] 
  },

  // --- 第24章: 电化学 ---
  { 
    id: 's2_ch24_1', chapterId: 's2_ch24', grade: 'S2', title: '24.1 原电池', description: '原理', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '正负极', difficulty: 'normal', story: { title: '柠檬电池', content: 'Octo 用柠檬和两种金属片做了一个电池，点亮了小灯泡！化学能变成了电能。', emoji: '🍋', mood: 'surprised' }, questions: [{ id: 'q1', type: 'mcq', text: '电子流出的电极是？', options: ['负极', '正极'], correctIndex: 0, explanation: '负极氧化失电子' }] }] 
  },
  { 
    id: 's2_ch24_2', chapterId: 's2_ch24', grade: 'S2', title: '24.2 电极电势', description: 'E0', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '比较', difficulty: 'hard', story: { title: '电位排序', content: '每种金属都有自己的“脾气”（电极电势）。电势越高的，越喜欢抢电子。', emoji: '⚡', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: 'E0 越正，氧化性越？', options: ['强', '弱'], correctIndex: 0, explanation: '易得电子' }] }] 
  },
  { 
    id: 's2_ch24_3', chapterId: 's2_ch24', grade: 'S2', title: '24.3 电解', description: '原理', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '阴极', difficulty: 'normal', story: { title: '强制反应', content: '电解就像是强迫化学反应发生。Octo 通上电，把水拆成了氢气和氧气。', emoji: '🔌', mood: 'determined' }, questions: [{ id: 'q1', type: 'mcq', text: '电解池阴极发生？', options: ['还原反应', '氧化反应'], correctIndex: 0, explanation: '得电子还原' }] }] 
  },
  { 
    id: 's2_ch24_4', chapterId: 's2_ch24', grade: 'S2', title: '24.4 腐蚀与防护', description: '防腐', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '防护', difficulty: 'normal', story: { title: '牺牲保镖', content: '为了保护船底不被腐蚀，我们在上面贴了锌块。锌就像保镖一样，牺牲自己保护了钢铁船身。', emoji: '🚢', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: '牺牲阳极保护法利用了？', options: ['原电池原理', '电解原理'], correctIndex: 0, explanation: '活泼金属作负极被腐蚀' }] }] 
  },

  // --- 第25章: 核化学 ---
  { 
    id: 's2_ch25_1', chapterId: 's2_ch25', grade: 'S2', title: '25.1 放射性', description: '射线', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '射线', difficulty: 'normal', story: { title: '隐形子弹', content: '有些原子核很不稳定，会发射出看不见的射线（α、β、γ）。小心，它们能量巨大！', emoji: '☢️', mood: 'nervous' }, questions: [{ id: 'q1', type: 'mcq', text: '带正电的射线是？', options: ['α射线', 'β射线'], correctIndex: 0, explanation: '氦核' }] }] 
  },
  { 
    id: 's2_ch25_2', chapterId: 's2_ch25', grade: 'S2', title: '25.2 衰变', description: '半衰期', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '半衰期', difficulty: 'normal', story: { title: '时间沙漏', content: '放射性元素衰变是有规律的。半衰期就是它们减少一半所需的时间，就像一个精确的原子钟。', emoji: '⏳', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '半衰期越长，衰变越？', options: ['慢', '快'], correctIndex: 0, explanation: '慢' }] }] 
  },
  { 
    id: 's2_ch25_3', chapterId: 's2_ch25', grade: 'S2', title: '25.3 同位素应用', description: '示踪', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '应用', difficulty: 'normal', story: { title: '历史时钟', content: '考古学家利用碳-14来测定古化石的年代。化学是连接过去和现在的钥匙！', emoji: '🦕', mood: 'curious' }, questions: [{ id: 'q1', type: 'mcq', text: 'C-14 用于？', options: ['考古断代', '核电站'], correctIndex: 0, explanation: '测定年代' }] }] 
  },
  { 
    id: 's2_ch25_4', chapterId: 's2_ch25', grade: 'S2', title: '25.4 核能', description: '裂变聚变', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '能量', difficulty: 'normal', story: { title: '终极能量', content: '太阳的光热来自核聚变，而核电站利用核裂变。这是宇宙中最强大的能量形式。', emoji: '☀️', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '核电站主要利用？', options: ['核裂变', '核聚变'], correctIndex: 0, explanation: '铀裂变' }] }] 
  },
];
