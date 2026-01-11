
import { Level } from '../../types';

const pos = { x: 50, y: 50 };

export const S1_META = {
  's1_ch1': { title: '第1章 绪论', description: '化学的实用性与物质属性', emoji: '📜' },
  's1_ch2': { title: '第2章 水和氢', description: '生命之源与最轻气体', emoji: '💧' },
  's1_ch3': { title: '第3章 原子与分子', description: '微观世界的基石', emoji: '⚛️' },
  's1_ch4': { title: '第4章 化学方程式', description: '化学反应的语言', emoji: '⚖️' },
  's1_ch5': { title: '第5章 原子结构', description: '揭开原子的面纱', emoji: '🧅' },
  's1_ch6': { title: '第6章 元素周期表', description: '元素的规律之家', emoji: '📊' },
  's1_ch7': { title: '第7章 键与作用力', description: '微粒间的强弱引力', emoji: '🔗' },
  's1_ch8': { title: '第8章 氧化还原', description: '电子转移的艺术', emoji: '⚔️' },
  's1_ch9': { title: '第9章 I A 族', description: '钠和钾', emoji: '🧈' },
  's1_ch10': { title: '第10章 II A 族', description: '镁和钙', emoji: '🦴' },
  's1_ch11': { title: '第11章 III A 族', description: '铝', emoji: '✈️' },
  's1_ch12': { title: '第12章 IV A 族', description: '碳和硅', emoji: '💎' },
  's1_ch13': { title: '第13章 V A 族', description: '氮和磷', emoji: '🧨' },
  's1_ch14': { title: '第14章 VI A 族', description: '氧和硫', emoji: '🌋' },
  's1_ch15': { title: '第15章 VII A 族', description: '卤素', emoji: '🧂' },
  's1_ch16': { title: '第16章 过渡元素', description: '多彩的d区金属', emoji: '🐉' },
};

export const S1_LEVELS: Level[] = [
  // --- 第1章: 绪论 (整合 1.1 - 1.4) ---
  { 
    id: 's1_ch1_1', chapterId: 's1_ch1', grade: 'S1', title: '1.1-1.4 绪论综合', description: '化学定义、中心地位与研究对象', locked: false, completed: false, score: 0, position: pos, 
    phases: [
      { id: 'p1', title: '创造', difficulty: 'normal', story: { title: '无中生有', content: '化学家就像魔法师，能创造出自然界原本不存在的物质，比如塑料、药物和合金。', emoji: '🧙‍♂️', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '化学是一门__的科学？', options: ['实用且创造性', '纯理论'], correctIndex: 0, explanation: '创造新物质。' }] },
      { id: 'p2', title: '桥梁', difficulty: 'normal', story: { title: '十字路口', content: '物理、生物、地质...所有科学都在化学这里交汇。想要理解生命（生物）或物质（物理），都得懂化学！', emoji: '🌉', mood: 'smart' }, questions: [{ id: 'q2', type: 'mcq', text: '化学常被称为什么科学？', options: ['中心科学', '边缘科学'], correctIndex: 0, explanation: 'Central Science。' }] },
      { id: 'p3', title: '贡献', difficulty: 'normal', story: { title: '改变世界', content: '从合成氨（化肥）养活几十亿人，到锂电池驱动手机，化学彻底改变了人类社会。', emoji: '🌍', mood: 'happy' }, questions: [{ id: 'q3', type: 'mcq', text: '合成氨技术主要解决了什么问题？', options: ['粮食问题', '能源问题'], correctIndex: 0, explanation: '制造化肥。' }] },
      { id: 'p4', title: '物质', difficulty: 'normal', story: { title: '万物皆化学', content: 'Octo 的储藏室里有纯净的魔法元素（纯净物），也有混合的汤药（混合物）。化学研究物质的组成、结构和性质。', emoji: '🧹', mood: 'curious' }, questions: [{ id: 'q4', type: 'mcq', text: '空气属于？', options: ['混合物', '纯净物'], correctIndex: 0, explanation: '由氮气氧气等组成。' }] }
    ] 
  },

  // --- 第2章: 水和氢 ---
  {
    id: 's1_ch2_1', chapterId: 's1_ch2', grade: 'S1', title: '2.1 水的性质', description: '物理性质与电解', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '电解', difficulty: 'normal', story: { title: '拆解水分子', content: '通电后，水分子被撕裂了！正极冒出了助燃的氧气，负极冒出了能燃烧的氢气。', emoji: '⚡', mood: 'surprised' }, questions: [{ id: 'q1', type: 'mcq', text: '电解水产生氢气和氧气的体积比？', options: ['2:1', '1:2'], correctIndex: 0, explanation: '负氢二（父亲儿）。' }] }]
  },
  {
    id: 's1_ch2_2', chapterId: 's1_ch2', grade: 'S1', title: '2.2 氢元素', description: '成水元素', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '最轻', difficulty: 'normal', story: { title: '飞屋环游', content: '氢是宇宙中最丰富的元素，也是最轻的气体。如果用它填充气球，我们可以飞得很高，但要小心火花！', emoji: '🎈', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '氢气验纯听到尖锐爆鸣声说明？', options: ['不纯', '纯净'], correctIndex: 0, explanation: '不纯，易爆炸。' }] }]
  },

  // --- 第3章: 原子与分子 ---
  {
    id: 's1_ch3_1', chapterId: 's1_ch3', grade: 'S1', title: '3.1-3.2 原子分子与定律', description: '微观学说与守恒', locked: true, completed: false, score: 0, position: pos,
    phases: [
      { id: 'p1', title: '学说', difficulty: 'normal', story: { title: '微观世界', content: '道尔顿认为原子是实心球，阿伏加德罗提出了分子。他们帮我们打开了微观世界的大门。', emoji: '🚪', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '化学变化中的最小微粒是？', options: ['原子', '分子'], correctIndex: 0, explanation: '原子在化学变化中不可分。' }] },
      { id: 'p2', title: '守恒', difficulty: 'normal', story: { title: '魔法天平', content: '反应前后的总质量总是相等的。无论怎么变，物质不会凭空消失。', emoji: '⚖️', mood: 'determined' }, questions: [{ id: 'q2', type: 'mcq', text: '化学反应前后__不变？', options: ['原子总数', '分子总数'], correctIndex: 0, explanation: '原子守恒。' }] }
    ]
  },
  {
    id: 's1_ch3_3', chapterId: 's1_ch3', grade: 'S1', title: '3.3 原子与相对原子质量', description: 'Ar', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '称重', difficulty: 'normal', story: { title: 'C-12标准', content: '原子太轻了！我们用碳-12原子质量的1/12作为砝码，来称量其他原子的相对质量。', emoji: '⚖️', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: '相对原子质量的单位是？', options: ['1', 'g'], correctIndex: 0, explanation: '相对值，单位为1（省略）。' }] }]
  },
  {
    id: 's1_ch3_4', chapterId: 's1_ch3', grade: 'S1', title: '3.4 化学式与式量', description: '符号语言', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '计算', difficulty: 'normal', story: { title: '分子体重', content: '把化学式里所有原子的相对原子质量加起来，就是它的式量（相对分子质量）。', emoji: '➕', mood: 'smart' }, questions: [{ id: 'q1', type: 'input', text: 'H2O 的式量是？(H=1, O=16)', validAnswer: '18', explanation: '1*2 + 16 = 18。' }] }]
  },
  {
    id: 's1_ch3_5', chapterId: 's1_ch3', grade: 'S1', title: '3.5 确定化学式的方法', description: '实验测定', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '推导', difficulty: 'hard', story: { title: '侦探推理', content: '通过分析物质中各元素的质量分数，我们可以像侦探一样推导出它的化学式！', emoji: '🕵️', mood: 'challenge' }, questions: [{ id: 'q1', type: 'mcq', text: '最简式又称为？', options: ['实验式', '分子式'], correctIndex: 0, explanation: '原子个数的最简整数比。' }] }]
  },
  {
    id: 's1_ch3_6', chapterId: 's1_ch3', grade: 'S1', title: '3.6 物质的量', description: '摩尔', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '摩尔', difficulty: 'normal', story: { title: '巨大的集合', content: '原子太小了，我们不按个买，按“堆”买。一“摩尔”就是 6.02×10²³ 个微粒，就像“一打”是12个一样。', emoji: '📦', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '1 mol 任何粒子的数目约为？', options: ['6.02×10²³', '10000'], correctIndex: 0, explanation: '阿伏加德罗常数。' }] }]
  },

  // --- 第4章: 化学方程式与化学计算 ---
  {
    id: 's1_ch4_1', chapterId: 's1_ch4', grade: 'S1', title: '4.1 化学反应与化学方程式', description: '书写与配平', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '配平', difficulty: 'normal', story: { title: '左右平衡', content: '方程式左边有多少个原子，右边也得有多少个。Octo 正在努力让天平平衡！', emoji: '⚖️', mood: 'determined' }, questions: [{ id: 'q1', type: 'input', text: 'H2 + O2 → H2O，配平后O2系数是？', validAnswer: '1', explanation: '2H2 + 1O2 = 2H2O。' }] }]
  },
  {
    id: 's1_ch4_2', chapterId: 's1_ch4', grade: 'S1', title: '4.2 根据化学方程式的计算', description: '量比关系', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '计算', difficulty: 'hard', story: { title: '配方师', content: '这就像做蛋糕的配方：2份氢气 + 1份氧气 = 2份水。根据配方，我们可以精确计算原料用量。', emoji: '🍰', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '计算依据是方程式中物质的？', options: ['质量比/摩尔比', '体积比(任意条件)'], correctIndex: 0, explanation: '系数比等于摩尔比。' }] }]
  },

  // --- 第5章: 原子结构 ---
  {
    id: 's1_ch5_1', chapterId: 's1_ch5', grade: 'S1', title: '5.1-5.2 原子模型与核素', description: '原子进化史与同位素', locked: true, completed: false, score: 0, position: pos,
    phases: [
      { id: 'p1', title: '进化', difficulty: 'normal', story: { title: '西瓜与行星', content: '从实心球，到西瓜模型，再到行星模型。人类对原子的认识一步步深入。', emoji: '🍉', mood: 'history' }, questions: [{ id: 'q1', type: 'mcq', text: '卢瑟福提出了？', options: ['核式结构模型', '葡萄干布丁模型'], correctIndex: 0, explanation: '发现原子核。' }] },
      { id: 'p2', title: '同位素', difficulty: 'normal', story: { title: '胖瘦双胞胎', content: '质子数相同（是同一种元素），但中子数不同（体重不一样），它们互称同位素。', emoji: '👯', mood: 'happy' }, questions: [{ id: 'q2', type: 'mcq', text: 'C-12 和 C-14 互为？', options: ['同位素', '同素异形体'], correctIndex: 0, explanation: '质子同，中子异。' }] }
    ]
  },
  {
    id: 's1_ch5_3', chapterId: 's1_ch5', grade: 'S1', title: '5.3-5.4 核外电子排布', description: '能层与排布规律', locked: true, completed: false, score: 0, position: pos,
    phases: [
      { id: 'p1', title: '楼层', difficulty: 'normal', story: { title: '电子公寓', content: '电子住在原子核外的公寓里，分层居住。能量越低，住得越低（离核越近）。', emoji: '🏢', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '能量最低的电子层是？', options: ['K层', 'L层'], correctIndex: 0, explanation: '第一层K层。' }] },
      { id: 'p2', title: '排布', difficulty: 'hard', story: { title: '排座次', content: '每层楼的房间数有限，第一层只能住2个，第二层住8个... Octo 正在帮电子安排座位。', emoji: '🪑', mood: 'thinking' }, questions: [{ id: 'q2', type: 'input', text: '钠原子(11号)的最外层电子数是？', validAnswer: '1', explanation: '2, 8, 1' }] }
    ]
  },

  // --- 第6章: 元素周期表 ---
  {
    id: 's1_ch6_1', chapterId: 's1_ch6', grade: 'S1', title: '6.1-6.2 周期表发展与结构', description: '门捷列夫与周期族', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { id: 'p1', title: '预言', difficulty: 'normal', story: { title: '天才的拼图', content: '门捷列夫按原子量排列元素，还大胆地给未发现的元素留了空位，并预言了它们的性质！', emoji: '🧩', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '现代周期表按什么排列？', options: ['原子序数', '相对原子质量'], correctIndex: 0, explanation: '质子数（原子序数）。' }] },
      { id: 'p2', title: '坐标', difficulty: 'normal', story: { title: '横七竖十八', content: '周期表有7个横行（周期）和18个纵行（族）。主族后面带个 A，副族带个 B。', emoji: '🗺️', mood: 'smart' }, questions: [{ id: 'q2', type: 'mcq', text: '周期数等于？', options: ['电子层数', '最外层电子数'], correctIndex: 0, explanation: '层数决定周期。' }] }
    ] 
  },
  {
    id: 's1_ch6_3', chapterId: 's1_ch6', grade: 'S1', title: '6.3 解读元素周期表', description: '性质递变', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '规律', difficulty: 'hard', story: { title: '性格趋势', content: '从左到右，金属性减弱；从上到下，金属性增强。左下角是金属之王，右上角（除去稀有气体）是非金属之王！', emoji: '👑', mood: 'challenge' }, questions: [{ id: 'q1', type: 'mcq', text: '同周期从左到右原子半径？', options: ['减小', '增大'], correctIndex: 0, explanation: '核电荷增加，吸引力增大。' }] }] 
  },

  // --- 第7章: 化学键与分子间作用力 ---
  {
    id: 's1_ch7_1', chapterId: 's1_ch7', grade: 'S1', title: '7.1 化学键', description: '离子/共价/金属键', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '结合', difficulty: 'normal', story: { title: '握手方式', content: '钠和氯是交换礼物（离子键），氢和氧是共享玩具（共价键），金属原子则是共享电子海（金属键）。', emoji: '🤝', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: 'H2O 分子中存在？', options: ['共价键', '离子键'], correctIndex: 0, explanation: '非金属之间共享电子。' }] }] 
  },
  {
    id: 's1_ch7_2', chapterId: 's1_ch7', grade: 'S1', title: '7.2 分子间作用力', description: '范德华力/氢键', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '微力', difficulty: 'normal', story: { title: '若即若离', content: '分子之间还有一种微弱的吸引力（范德华力）。冰之所以浮在水面，是因为特殊的“氢键”！', emoji: '❄️', mood: 'curious' }, questions: [{ id: 'q1', type: 'mcq', text: '水的沸点异常高是因为？', options: ['氢键', '共价键强'], correctIndex: 0, explanation: '分子间氢键。' }] }] 
  },
  {
    id: 's1_ch7_3', chapterId: 's1_ch7', grade: 'S1', title: '7.3 晶体及其特性', description: '四种晶体', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '堆积', difficulty: 'normal', story: { title: '积木城堡', content: '食盐是离子晶体（硬而脆），干冰是分子晶体（软而低熔点），金刚石是原子晶体（超硬）。', emoji: '🧱', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '金刚石属于？', options: ['原子晶体', '离子晶体'], correctIndex: 0, explanation: '共价键连接的网状结构。' }] }] 
  },

  // --- 第8章: 氧化还原反应 ---
  {
    id: 's1_ch8_1', chapterId: 's1_ch8', grade: 'S1', title: '8.1 氧化还原反应', description: '定义', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '得失', difficulty: 'normal', story: { title: '电子争夺战', content: '氧化还原的本质是电子的转移。失去电子被氧化，得到电子被还原。', emoji: '⚔️', mood: 'challenge' }, questions: [{ id: 'q1', type: 'mcq', text: '氧化反应是指？', options: ['失去电子', '得到电子'], correctIndex: 0, explanation: '升失氧。' }] }] 
  },
  {
    id: 's1_ch8_2', chapterId: 's1_ch8', grade: 'S1', title: '8.2 氧化数', description: '化合价', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '记账', difficulty: 'normal', story: { title: '电子账本', content: '氧化数是帮我们追踪电子去向的记账工具。单质的氧化数永远是 0。', emoji: '📒', mood: 'thinking' }, questions: [{ id: 'q1', type: 'input', text: 'KMnO4 中 Mn 的氧化数是？', validAnswer: '+7', explanation: '1 + x + (-2)*4 = 0。' }] }] 
  },
  {
    id: 's1_ch8_3', chapterId: 's1_ch8', grade: 'S1', title: '8.3 氧化剂与还原剂', description: '角色', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '角色', difficulty: 'normal', story: { title: '给予与索取', content: '氧化剂是抢电子的强盗（自己被还原），还原剂是送电子的慈善家（自己被氧化）。', emoji: '🎁', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '还原剂在反应中？', options: ['氧化数升高', '氧化数降低'], correctIndex: 0, explanation: '失电子，价态升高。' }] }] 
  },
  {
    id: 's1_ch8_4', chapterId: 's1_ch8', grade: 'S1', title: '8.4 方程式的配平', description: '守恒', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '平衡', difficulty: 'hard', story: { title: '得失相等', content: '配平氧化还原反应的关键：还原剂失去的电子总数 = 氧化剂得到的电子总数。', emoji: '⚖️', mood: 'determined' }, questions: [{ id: 'q1', type: 'mcq', text: '配平原则是？', options: ['电子得失守恒', '体积守恒'], correctIndex: 0, explanation: '电子守恒。' }] }] 
  },

  // --- 第9章: IA族 ---
  {
    id: 's1_ch9_1', chapterId: 's1_ch9', grade: 'S1', title: '9.1 钠和钾的性质', description: '活泼金属', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '切金属', difficulty: 'normal', story: { title: '软软的金属', content: '钠软得像奶酪，可以用刀切开。切面银白色，但很快变暗。', emoji: '🔪', mood: 'surprised' }, questions: [{ id: 'q1', type: 'mcq', text: '钠保存在？', options: ['煤油', '水'], correctIndex: 0, explanation: '隔绝空气和水。' }] }] 
  },
  {
    id: 's1_ch9_2', chapterId: 's1_ch9', grade: 'S1', title: '9.2 焰色试验', description: '颜色辨识', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '烟花', difficulty: 'normal', story: { title: '绚丽火焰', content: 'Octo 把钠盐撒在火上，火焰变成了黄色；撒上钾盐（透过蓝色钴玻璃），看到了紫色！', emoji: '🎆', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '钠的焰色反应颜色？', options: ['黄色', '紫色'], correctIndex: 0, explanation: '钠黄钾紫。' }] }] 
  },
  {
    id: 's1_ch9_3', chapterId: 's1_ch9', grade: 'S1', title: '9.3 钠和钾的重要化合物', description: '苏打/小苏打', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '发酵', difficulty: 'normal', story: { title: '面包膨胀', content: '做面包要放小苏打（NaHCO3），它受热分解产生二氧化碳，让面包变得松软。', emoji: '🍞', mood: 'hungry' }, questions: [{ id: 'q1', type: 'mcq', text: '小苏打的化学式？', options: ['NaHCO3', 'Na2CO3'], correctIndex: 0, explanation: '碳酸氢钠。' }] }] 
  },

  // --- 第10章: IIA族 ---
  {
    id: 's1_ch10_1', chapterId: 's1_ch10', grade: 'S1', title: '10.1 镁和钙的性质', description: '燃烧与反应', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '闪光', difficulty: 'normal', story: { title: '耀眼白光', content: '镁条燃烧发出耀眼的白光，这可是制作闪光弹的材料！', emoji: '✨', mood: 'excited' }, questions: [{ id: 'q1', type: 'mcq', text: '镁燃烧生成？', options: ['MgO', 'MgOH'], correctIndex: 0, explanation: '氧化镁。' }] }] 
  },
  {
    id: 's1_ch10_2', chapterId: 's1_ch10', grade: 'S1', title: '10.2 镁的重要化合物', description: 'MgO/MgCl2', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '耐火', difficulty: 'normal', story: { title: '耐火砖', content: '氧化镁熔点非常高，Octo 用它做成了耐火砖，铺在魔法熔炉的内壁。', emoji: '🧱', mood: 'determined' }, questions: [{ id: 'q1', type: 'mcq', text: 'MgO 常用作？', options: ['耐火材料', '食品添加剂'], correctIndex: 0, explanation: '熔点高。' }] }] 
  },
  {
    id: 's1_ch10_3', chapterId: 's1_ch10', grade: 'S1', title: '10.3 钙的重要化合物', description: '石灰家族', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '石灰', difficulty: 'normal', story: { title: '变身三部曲', content: '石灰石(CaCO3)烧成生石灰(CaO)，加水变成熟石灰(Ca(OH)2)，最后吸收CO2变回石头。', emoji: '🏰', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: '生石灰是？', options: ['CaO', 'Ca(OH)2'], correctIndex: 0, explanation: '氧化钙。' }] }] 
  },
  {
    id: 's1_ch10_4', chapterId: 's1_ch10', grade: 'S1', title: '10.4 离子检验', description: 'Mg/Ca鉴别', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '沉淀', difficulty: 'normal', story: { title: '白色沉淀', content: '钙离子遇到碳酸根会生成白色的碳酸钙沉淀，这也是水垢的主要成分。', emoji: '🛁', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '检验 Ca2+ 可用？', options: ['碳酸钠溶液', '硝酸银'], correctIndex: 0, explanation: '生成CaCO3沉淀。' }] }] 
  },

  // --- 第11章: IIIA族 ---
  {
    id: 's1_ch11_1', chapterId: 's1_ch11', grade: 'S1', title: '11.1 铝的性质', description: '两性与钝化', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '氧化膜', difficulty: 'normal', story: { title: '致密的盔甲', content: '铝非常活泼，但它表面有一层致密的氧化膜，保护内部不被腐蚀。', emoji: '🛡️', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '铝在浓硝酸中发生？', options: ['钝化', '剧烈反应'], correctIndex: 0, explanation: '生成致密氧化膜。' }] }] 
  },
  {
    id: 's1_ch11_2', chapterId: 's1_ch11', grade: 'S1', title: '11.2 铝的重要化合物', description: 'Al2O3/Al(OH)3', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '两性', difficulty: 'normal', story: { title: '墙头草', content: '氧化铝和氢氧化铝都是“墙头草”（两性），遇到强酸它就装碱，遇到强碱它就装酸。', emoji: '🎭', mood: 'playful' }, questions: [{ id: 'q1', type: 'mcq', text: 'Al(OH)3 溶于？', options: ['NaOH溶液', '氨水'], correctIndex: 0, explanation: '溶于强碱。' }] }] 
  },
  {
    id: 's1_ch11_3', chapterId: 's1_ch11', grade: 'S1', title: '11.3 铝的冶炼', description: '电解与铝热', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '铝热', difficulty: 'hard', story: { title: '修补铁轨', content: '铝粉和氧化铁混合点燃，剧烈反应放出高热，生成液态铁水，可以用来焊接铁轨！', emoji: '🛤️', mood: 'determined' }, questions: [{ id: 'q1', type: 'mcq', text: '铝热反应中铝体现？', options: ['还原性', '氧化性'], correctIndex: 0, explanation: '铝夺取氧。' }] }] 
  },
  {
    id: 's1_ch11_extra', chapterId: 's1_ch11', grade: 'S1', title: '11.Extra 双面怪客', description: '两性物质侦探', locked: true, completed: false, score: 0, position: pos,
    phases: [{
      id: 'p1', title: '身份鉴定', difficulty: 'hard',
      story: { title: '奇怪的粉末', content: '实验室发现了一瓶失去标签的白色粉末。它既怕强酸也怕强碱，Octo 觉得它是个“墙头草”。', emoji: '🕵️', mood: 'thinking' },
      questions: [
        {
          id: 'q_al_mystery',
          type: 'detective',
          text: '根据实验线索，找出白色粉末中的金属离子。',
          detectiveData: {
            caseId: 'al_mystery',
            step: 1,
            mysteryTitle: '白色粉末',
            clues: [
              { reagent: '滴加 NaOH', result: '先生成白色沉淀，过量溶解', icon: '🧪' },
              { reagent: '滴加 HCl', result: '先生成白色沉淀，过量溶解', icon: '🧪' },
              { reagent: '焰色反应', result: '无明显特征颜色', icon: '🔥' }
            ],
            suspects: ['Al³⁺ (铝)', 'Mg²⁺ (镁)', 'Na⁺ (钠)', 'Fe³⁺ (铁)']
          },
          correctIndex: 0,
          explanation: '铝离子及其氢氧化物具有两性，既溶于强酸也溶于强碱。镁沉淀不溶于过量碱。'
        }
      ]
    }]
  },

  // --- 第12章: IVA族 (Updated) ---
  {
    id: 's1_ch12_1', chapterId: 's1_ch12', grade: 'S1', title: '12.1 碳', description: '同素异形体', locked: true, completed: false, score: 0, position: pos,
    phases: [{ 
      id: 'p1', title: '金刚石', difficulty: 'normal', 
      story: { title: '软与硬', content: '金刚石最硬，石墨却很软。它们都是碳原子组成的，只是排列方式不同！C60 长得像足球。', emoji: '💎', mood: 'curious' }, 
      questions: [{ id: 'q1', type: 'mcq', text: '金刚石和石墨互为？', options: ['同素异形体', '同位素'], correctIndex: 0, explanation: '同一元素不同单质。' }] 
    }] 
  },
  {
    id: 's1_ch12_2', chapterId: 's1_ch12', grade: 'S1', title: '12.2 碳的重要化合物', description: 'CO/CO2/碳酸盐', locked: true, completed: false, score: 0, position: pos,
    phases: [{ 
      id: 'p1', title: '一氧化碳', difficulty: 'normal', 
      story: { title: '无形杀手', content: 'CO 无色无味但有剧毒，因为它比氧气更喜欢结合血红蛋白。冬天烧炭取暖要小心！', emoji: '☠️', mood: 'nervous' }, 
      questions: [{ id: 'q1', type: 'mcq', text: '除去 CO2 中的 CO 可用？', options: ['灼热的氧化铜', '石灰水'], correctIndex: 0, explanation: 'CO还原CuO。' }] 
    }] 
  },
  {
    id: 's1_ch12_3', chapterId: 's1_ch12', grade: 'S1', title: '12.3 硅及其化合物', description: '半导体与玻璃', locked: true, completed: false, score: 0, position: pos,
    phases: [{ 
      id: 'p1', title: '芯片', difficulty: 'normal', 
      story: { title: '硅谷基石', content: '高纯度的硅是半导体材料，是电脑芯片的心脏。而二氧化硅（沙子）是制作玻璃的原料。', emoji: '💻', mood: 'smart' }, 
      questions: [{ id: 'q1', type: 'mcq', text: '光导纤维的主要成分？', options: ['二氧化硅', '单质硅'], correctIndex: 0, explanation: 'SiO2。' }] 
    }] 
  },

  // --- 第13章: VA族 (Updated) ---
  {
    id: 's1_ch13_1', chapterId: 's1_ch13', grade: 'S1', title: '13.1 氮气', description: '惰性保护气', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '三键', difficulty: 'normal', story: { title: '最懒的气体', content: '氮气分子里有两个氮原子手拉手（三键），非常牢固，平时懒得理任何人。常做保护气。', emoji: '🛡️', mood: 'calm' }, questions: [{ id: 'q1', type: 'mcq', text: '氮气化学性质稳定是因为？', options: ['键能大', '非金属'], correctIndex: 0, explanation: '氮氮三键牢固。' }] }] 
  },
  {
    id: 's1_ch13_2', chapterId: 's1_ch13', grade: 'S1', title: '13.2 氮的氧化物', description: 'NO/NO2', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '变色', difficulty: 'normal', story: { title: '雷雨发庄稼', content: '无色的 NO 遇到空气瞬间变成红棕色的 NO2。这是光化学烟雾的罪魁祸首之一。', emoji: '🌫️', mood: 'surprised' }, questions: [{ id: 'q1', type: 'mcq', text: '红棕色气体是？', options: ['NO2', 'NO'], correctIndex: 0, explanation: '二氧化氮。' }] }] 
  },
  {
    id: 's1_ch13_3', chapterId: 's1_ch13', grade: 'S1', title: '13.3 硝酸', description: '强氧化性', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '溶铜', difficulty: 'hard', story: { title: '不仅是酸', content: '浓硝酸不仅是酸，还是强氧化剂。它能溶解铜，产生红棕色的二氧化氮气体。', emoji: '💨', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '铜与浓硝酸反应生成？', options: ['NO2', 'H2'], correctIndex: 0, explanation: '不产生氢气。' }] }] 
  },
  {
    id: 's1_ch13_4', chapterId: 's1_ch13', grade: 'S1', title: '13.4 硝酸盐', description: '分解与应用', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '易爆', difficulty: 'normal', story: { title: '火药原料', content: '硝酸钾是黑火药的成分之一。硝酸盐受热容易分解，放出氧气，助燃！', emoji: '🧨', mood: 'excited' }, questions: [{ id: 'q1', type: 'mcq', text: '硝酸钾受热分解生成？', options: ['亚硝酸钾和氧气', '氮气'], correctIndex: 0, explanation: 'KNO2 + O2。' }] }] 
  },
  {
    id: 's1_ch13_5', chapterId: 's1_ch13', grade: 'S1', title: '13.5 氨', description: '喷泉实验', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '极易溶', difficulty: 'normal', story: { title: '红色喷泉', content: '氨气极易溶于水，会让酚酞变红。Octo 做了一个美丽的喷泉实验！', emoji: '⛲', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '氨气溶于水显？', options: ['弱碱性', '酸性'], correctIndex: 0, explanation: '生成一水合氨。' }] }] 
  },
  {
    id: 's1_ch13_6', chapterId: 's1_ch13', grade: 'S1', title: '13.6 铵盐', description: '受热分解', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '受热', difficulty: 'normal', story: { title: '白烟', content: '氯化铵受热分解成气体，冷却后又变回固体。这就是“白烟”的秘密。', emoji: '🌫️', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '检验铵根离子用？', options: ['NaOH加热', 'AgNO3'], correctIndex: 0, explanation: '产生刺激性气味气体。' }] }] 
  },
  {
    id: 's1_ch13_7', chapterId: 's1_ch13', grade: 'S1', title: '13.7 磷及其化合物', description: '白磷红磷', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '自燃', difficulty: 'normal', story: { title: '鬼火', content: '白磷有剧毒，着火点很低，在空气中会自燃，这就是传说中的“鬼火”。红磷则安全得多。', emoji: '🔥', mood: 'nervous' }, questions: [{ id: 'q1', type: 'mcq', text: '白磷应保存在？', options: ['水中', '煤油中'], correctIndex: 0, explanation: '隔绝空气，不溶于水。' }] }] 
  },
  {
    id: 's1_ch13_extra', chapterId: 's1_ch13', grade: 'S1', title: '13.Extra 刺鼻的迷雾', description: '气体泄漏侦探', locked: true, completed: false, score: 0, position: pos,
    phases: [{
      id: 'p1', title: '气体追踪', difficulty: 'hard',
      story: { title: '刺鼻的气味', content: '化肥厂泄漏了一种刺激性气体，试纸变蓝了！这是什么气体？', emoji: '👃', mood: 'nervous' },
      questions: [
        {
          id: 'q_nh3_mystery',
          type: 'detective',
          text: '分析线索，确定气体身份。',
          detectiveData: {
            caseId: 'nh3_mystery',
            step: 1,
            mysteryTitle: '工厂怪味',
            clues: [
              { reagent: '闻气味', result: '强烈的刺激性气味', icon: '👃' },
              { reagent: '湿润红色石蕊试纸', result: '变蓝 (碱性)', icon: '📜' },
              { reagent: '蘸浓盐酸玻璃棒', result: '产生白烟', icon: '🌫️' }
            ],
            suspects: ['NH₃ (氨气)', 'Cl₂ (氯气)', 'HCl (氯化氢)', 'O₂ (氧气)']
          },
          correctIndex: 0,
          explanation: '氨气是唯一常见的碱性气体，遇浓盐酸生成白烟 (NH4Cl)。'
        }
      ]
    }]
  },

  // --- 第14章: VIA族 (Updated) ---
  {
    id: 's1_ch14_1', chapterId: 's1_ch14', grade: 'S1', title: '14.1 氧', description: '助燃性', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '助燃', difficulty: 'normal', story: { title: '生命之气', content: '氧气能支持燃烧和呼吸。铁丝在纯氧中剧烈燃烧，火星四射！', emoji: '🔥', mood: 'excited' }, questions: [{ id: 'q1', type: 'mcq', text: '实验室制氧气原料？', options: ['KMnO4', 'CaCO3'], correctIndex: 0, explanation: '加热高锰酸钾。' }] }] 
  },
  {
    id: 's1_ch14_2', chapterId: 's1_ch14', grade: 'S1', title: '14.2 臭氧', description: '保护伞', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: 'O3', difficulty: 'normal', story: { title: '地球卫士', content: '臭氧层在平流层阻挡了有害的紫外线。它有鱼腥味，能使淀粉碘化钾试纸变蓝。', emoji: '⛱️', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '臭氧化学式？', options: ['O3', 'O2'], correctIndex: 0, explanation: '氧的同素异形体。' }] }] 
  },
  {
    id: 's1_ch14_3', chapterId: 's1_ch14', grade: 'S1', title: '14.3 氧化物', description: '酸性/碱性', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '分类', difficulty: 'normal', story: { title: '性质各异', content: 'Na2O 是碱性氧化物，CO2 是酸性氧化物，Al2O3 是两性氧化物。', emoji: '🎭', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: 'SO2 属于？', options: ['酸性氧化物', '碱性氧化物'], correctIndex: 0, explanation: '与碱反应生成盐和水。' }] }] 
  },
  {
    id: 's1_ch14_4', chapterId: 's1_ch14', grade: 'S1', title: '14.4 硫', description: '淡黄色固体', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '除汞', difficulty: 'normal', story: { title: '清理水银', content: '温度计打碎了，水银洒了一地！Octo 赶紧撒上硫磺粉，生成无毒的 HgS。', emoji: '🧹', mood: 'determined' }, questions: [{ id: 'q1', type: 'mcq', text: '硫单质颜色？', options: ['淡黄色', '黑色'], correctIndex: 0, explanation: '俗称硫磺。' }] }] 
  },
  {
    id: 's1_ch14_5', chapterId: 's1_ch14', grade: 'S1', title: '14.5 硫化氢', description: '臭鸡蛋气味', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '剧毒', difficulty: 'normal', story: { title: '恶臭警告', content: '这股味道像坏掉的鸡蛋... 剧毒的 H2S 来了！它具有强还原性。', emoji: '🥚', mood: 'dizzy' }, questions: [{ id: 'q1', type: 'mcq', text: 'H2S 气味特征？', options: ['臭鸡蛋味', '无味'], correctIndex: 0, explanation: '腐败蛋味。' }] }] 
  },
  {
    id: 's1_ch14_6', chapterId: 's1_ch14', grade: 'S1', title: '14.6 二氧化硫', description: '漂白与酸雨', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '漂白', difficulty: 'normal', story: { title: '草帽变白', content: 'SO2 可以让黄草帽变白，但这种白色不稳定，时间久了又会变黄。它还是酸雨的元凶。', emoji: '👒', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: 'SO2 使品红溶液？', options: ['褪色', '变红'], correctIndex: 0, explanation: '生成不稳定无色物质。' }] }] 
  },
  {
    id: 's1_ch14_7', chapterId: 's1_ch14', grade: 'S1', title: '14.7 硫酸', description: '吸水/脱水', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '黑面包', difficulty: 'hard', story: { title: '恐怖的脱水性', content: '浓硫酸倒在蔗糖上，瞬间变成黑乎乎的碳，体积膨胀像个黑面包！', emoji: '🍞', mood: 'nervous' }, questions: [{ id: 'q1', type: 'mcq', text: '浓硫酸使蔗糖炭化表现了？', options: ['脱水性', '吸水性'], correctIndex: 0, explanation: '按水比例夺取氢氧。' }] }] 
  },
  {
    id: 's1_ch14_8', chapterId: 's1_ch14', grade: 'S1', title: '14.8 硫酸盐', description: '沉淀与检验', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '钡餐', difficulty: 'normal', story: { title: '胃部摄影', content: '硫酸钡不溶于水也不溶于酸，无毒，被用作“钡餐”来检查肠胃。', emoji: '🏥', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '检验硫酸根离子用？', options: ['BaCl2 + 稀HCl', 'AgNO3'], correctIndex: 0, explanation: '生成不溶于酸的BaSO4沉淀。' }] }] 
  },
  {
    id: 's1_ch14_extra', chapterId: 's1_ch14', grade: 'S1', title: '14.Extra 酸雨侦探', description: '空气污染源', locked: true, completed: false, score: 0, position: pos,
    phases: [{
      id: 'p1', title: '污染源', difficulty: 'hard',
      story: { title: '酸雨危机', content: '城市里降下了酸雨，建筑被腐蚀。找出罪魁祸首！', emoji: '🌧️', mood: 'determined' },
      questions: [
        {
          id: 'q_so2_mystery',
          type: 'detective',
          text: '分析废气样本，找出导致酸雨的气体。',
          detectiveData: {
            caseId: 'so2_mystery',
            step: 1,
            mysteryTitle: '排放废气',
            clues: [
              { reagent: '闻气味', result: '刺激性气味 (燃硫味)', icon: '👃' },
              { reagent: '品红溶液', result: '褪色 (加热后恢复)', icon: '🧪' },
              { reagent: '酸性 KMnO₄', result: '褪色 (还原性)', icon: '🟣' }
            ],
            suspects: ['SO₂ (二氧化硫)', 'CO₂ (二氧化碳)', 'NO₂ (二氧化氮)', 'N₂ (氮气)']
          },
          correctIndex: 0,
          explanation: 'SO2 具有漂白性(品红褪色)和还原性，且有刺激性气味，是酸雨主要成因。'
        }
      ]
    }]
  },

  // --- 第15章: VIIA族 ---
  {
    id: 's1_ch15_1', chapterId: 's1_ch15', grade: 'S1', title: '15.1 卤素的性质与用途', description: '性质递变', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '置换', difficulty: 'normal', story: { title: '强者生存', content: '卤素家族里，活泼的（如氯）可以把不活泼的（如溴、碘）从它们的盐溶液里踢出来。', emoji: '🥊', mood: 'challenge' }, questions: [{ id: 'q1', type: 'mcq', text: 'Cl2 通入 KBr 溶液，溶液变？', options: ['橙色', '紫色'], correctIndex: 0, explanation: '置换出Br2。' }] }] 
  },
  {
    id: 's1_ch15_2', chapterId: 's1_ch15', grade: 'S1', title: '15.2 氯气的制取', description: '实验室制备', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '制备', difficulty: 'normal', story: { title: '舍勒的发现', content: '舍勒用软锰矿（MnO2）和浓盐酸加热，发现了一种黄绿色的刺激性气体。', emoji: '🧪', mood: 'curious' }, questions: [{ id: 'q1', type: 'mcq', text: '实验室制氯气的原料？', options: ['MnO2 + 浓HCl', 'KMnO4 + 稀HCl'], correctIndex: 0, explanation: '需加热。' }] }]
  },
  {
    id: 's1_ch15_3', chapterId: 's1_ch15', grade: 'S1', title: '15.3 氯化氢', description: '盐酸', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '喷泉', difficulty: 'normal', story: { title: '极易溶', content: 'HCl 极易溶于水，1体积水能溶解500体积气体！可以做红色的喷泉实验。', emoji: '⛲', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '盐酸是__的水溶液？', options: ['氯化氢', '氯气'], correctIndex: 0, explanation: 'HCl气体溶于水。' }] }]
  },
  {
    id: 's1_ch15_4', chapterId: 's1_ch15', grade: 'S1', title: '15.4 卤化物溶解性', description: 'AgNO3沉淀', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '沉淀色', difficulty: 'normal', story: { title: '沉淀的颜色', content: '氯化银是白色，溴化银是浅黄，碘化银是黄色。好像调色盘！', emoji: '🎨', mood: 'surprised' }, questions: [{ id: 'q1', type: 'mcq', text: 'AgBr 沉淀颜色？', options: ['浅黄色', '白色'], correctIndex: 0, explanation: 'AgCl白, AgBr浅黄, AgI黄。' }] }]
  },
  {
    id: 's1_ch15_5', chapterId: 's1_ch15', grade: 'S1', title: '15.5 卤氧酸', description: '次氯酸等', locked: true, completed: false, score: 0, position: pos,
    phases: [{ id: 'p1', title: '漂白', difficulty: 'normal', story: { title: '漂白粉', content: '氯气溶于水生成的次氯酸（HClO）有强氧化性，能杀菌漂白。但它很不稳定，见光就分解。', emoji: '👕', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '酸性最强的是？', options: ['HClO4', 'HClO'], correctIndex: 0, explanation: '高氯酸是最强无机酸。' }] }]
  },
  {
    id: 's1_ch15_extra', chapterId: 's1_ch15', grade: 'S1', title: '15.Extra 泳池侦探', description: '气体泄漏推理', locked: true, completed: false, score: 0, position: pos,
    phases: [{
      id: 'p1', title: '气体泄漏', difficulty: 'hard',
      story: { title: '泳池危机', content: 'Octo 接到报警，游泳馆发生了气体泄漏。我们需要通过现象找出罪魁祸首！', emoji: '🏊', mood: 'thinking' },
      questions: [
        {
          id: 'q_pool_mystery',
          type: 'detective',
          text: 'Octo 在现场收集了以下线索，请分析并找出泄漏的气体。',
          detectiveData: {
            caseId: 'pool_leak',
            step: 1,
            mysteryTitle: '泳池怪味',
            clues: [
              { reagent: '闻气味', result: '强烈的刺激性', icon: '👃' },
              { reagent: '湿润的石蕊试纸', result: '先变红后褪色', icon: '📜' },
              { reagent: '湿润的淀粉KI试纸', result: '变蓝', icon: '🔵' },
              { reagent: '观察颜色', result: '黄绿色气体', icon: '👀' }
            ],
            suspects: ['Cl2 (氯气)', 'HCl (氯化氢)', 'NH3 (氨气)', 'O2 (氧气)']
          },
          correctIndex: 0,
          explanation: '黄绿色、刺激性、漂白性（先红后褪）及氧化性（淀粉KI变蓝）均为 Cl2 的特征。'
        }
      ]
    }]
  },

  // --- 第16章: 过渡元素 (Updated) ---
  { 
    id: 's1_ch16_1', chapterId: 's1_ch16', grade: 'S1', title: '16.1 过渡元素的概论', description: 'd区元素', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ 
      id: 'p1', title: '定义', difficulty: 'normal', 
      story: { title: '多彩世界', content: '过渡元素位于周期表中部，它们的电子正在填充 d 轨道。这让它们拥有了多变的化合价和绚丽的颜色。', emoji: '🎨', mood: 'happy' },
      questions: [{ id: 'q1', type: 'mcq', text: '过渡元素位于周期表的？', options: ['d区和ds区', 's区'], correctIndex: 0, explanation: '副族元素。' }] 
    }] 
  },
  { 
    id: 's1_ch16_2', chapterId: 's1_ch16', grade: 'S1', title: '16.2 过渡元素的通性', description: '颜色/催化/磁性', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ 
      id: 'p1', title: '性质', difficulty: 'normal', 
      story: { title: '工业催化剂', content: '许多过渡金属（如铁、铂）都是优秀的催化剂。而且它们大多有磁性，能被磁铁吸引！', emoji: '🧲', mood: 'smart' },
      questions: [{ id: 'q1', type: 'mcq', text: '过渡金属离子通常？', options: ['有颜色', '无色'], correctIndex: 0, explanation: 'd电子跃迁。' }] 
    }] 
  },
  { 
    id: 's1_ch16_3', chapterId: 's1_ch16', grade: 'S1', title: '16.3 铁', description: 'Fe', locked: false, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '变价', difficulty: 'normal', 
        story: { title: '变价侠', content: '铁有两个化身：绿色的亚铁侠（Fe2+）和黄色的钢铁侠（Fe3+）。它们之间可以互相转化。', emoji: '🦸', mood: 'magic' },
        questions: [{ id: 'q1', type: 'mcq', text: 'FeCl3 溶液颜色？', options: ['黄色', '浅绿色'], correctIndex: 0, explanation: 'Fe3+为黄色。' }] 
      },
      {
        id: 'p2', title: '鉴别', difficulty: 'normal',
        story: { title: '血色试剂', content: 'Octo 滴入一滴 KSCN 溶液，黄色的铁盐溶液瞬间变成了血红色！这是检验 Fe3+ 的独门绝技。', emoji: '🩸', mood: 'surprised' },
        questions: [
          { 
            id: 'q_fe_ident', 
            type: 'mcq', 
            text: '检验 Fe3+ 的特征试剂是？',
            options: ['KSCN', 'NaOH'],
            correctIndex: 0,
            explanation: '生成血红色络合物。' 
          }
        ]
      }
    ] 
  },
  { 
    id: 's1_ch16_4', chapterId: 's1_ch16', grade: 'S1', title: '16.4 铜', description: 'Cu', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '颜色', difficulty: 'normal', 
        story: { title: '蓝色魔法', content: '铜离子在水里是蓝色的。Octo 向硫酸铜里加氨水，生成了深蓝色的铜氨络离子。', emoji: '🔷', mood: 'happy' },
        questions: [{ id: 'q1', type: 'mcq', text: 'Cu2+ 溶液呈？', options: ['蓝色', '绿色'], correctIndex: 0, explanation: '水合铜离子。' }] 
      },
      {
        id: 'p2', title: '炼铜', difficulty: 'hard',
        story: { title: '湿法炼铜', content: '古代人就知道用铁放入胆矾（硫酸铜）溶液中置换出红色的铜。这是最早的湿法冶金！', emoji: '⛏️', mood: 'history' },
        questions: [{ id: 'q2', type: 'mcq', text: 'Fe + CuSO4 -> ?', options: ['Cu + FeSO4', '无反应'], correctIndex: 0, explanation: '铁比铜活泼。' }]
      }
    ] 
  },
  // --- BOSS LEVEL: 全章综合 ---
  { 
    id: 's1_ch16_extra', chapterId: 's1_ch16', grade: 'S1', title: '16.Extra 皇家侦探试炼', description: '全章综合推理', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ 
      id: 'p1', title: '终极挑战', difficulty: 'hard', 
      story: { title: '皇家悬赏', content: '恭喜你完成了所有小节！现在，Octo 导师为你准备了一场终极试炼。这里混合了铁、铜、银等各种过渡元素的悬案。', emoji: '🏆', mood: 'victory' },
      questions: [
        {
          id: 'q_royal_mystery_1',
          type: 'detective',
          text: '皇宫的圣水被污染了，它看起来无色透明，但滴入盐水会产生白色沉淀。',
          detectiveData: {
            caseId: 'case_royal_1',
            step: 1,
            mysteryTitle: '案件 1: 消失的圣水',
            clues: [
              { reagent: '观察外观', result: '无色透明溶液', icon: '👀' },
              { reagent: '滴加稀盐酸', result: '产生白色沉淀', icon: '🧪' },
              { reagent: '滴加氨水', result: '沉淀溶解', icon: '💧' }
            ],
            suspects: ['$Ag^+$ (银离子)', '$Cu^{2+}$ (铜离子)', '$Fe^{3+}$ (铁离子)', '$MnO_4^-$ (高锰酸根)']
          },
          correctIndex: 0,
          explanation: '$Ag^+$ 溶液无色，遇 $Cl^-$ 生成白色 $AgCl$ 沉淀，沉淀溶于氨水生成银氨络离子。其他离子均有颜色。'
        },
        { 
          id: 'q_royal_mystery_2', 
          type: 'detective', 
          text: '炼金术士的铁锅里盛放着黄色药水，过了一晚药水变绿了，铁锅变薄了。', 
          detectiveData: {
            caseId: 'case_royal_2',
            step: 1,
            mysteryTitle: '案件 2: 腐蚀之谜',
            clues: [
              { reagent: '初始药水', result: '黄色溶液 ($Fe^{3+}$)', icon: '🟡' },
              { reagent: '容器材质', result: '铁锅 ($Fe$)', icon: '🍳' },
              { reagent: '最终现象', result: '溶液变浅绿色 ($Fe^{2+}$)', icon: '🟢' }
            ],
            suspects: ['归中反应', '氧化反应', '中和反应', '水解反应']
          },
          correctIndex: 0, 
          explanation: '铁与铁离子发生归中反应：$Fe + 2Fe^{3+} = 3Fe^{2+}$。' 
        },
        {
          id: 'q3', type: 'mcq',
          text: '氨水的化学式通常写作？',
          options: ['$NH_3 \\cdot H_2O$', '$NH_3$'],
          correctIndex: 0,
          explanation: '一水合氨。'
        }
      ] 
    }] 
  },
];
