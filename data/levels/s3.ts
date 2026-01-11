
import { Level } from '../../types';

const pos = { x: 50, y: 50 };

export const S3_META = {
  's3_ch26': { title: '第26章 有机概论', description: '碳骨架与官能团', emoji: '🌳' },
  's3_ch27': { title: '第27章 烷烃', description: '饱和烃与自由基', emoji: '⛽' },
  's3_ch28': { title: '第28章 烯烃', description: '双键与加成反应', emoji: '👐' },
  's3_ch29': { title: '第29章 炔烃', description: '三键与乙炔', emoji: '🔥' },
  's3_ch30': { title: '第30章 芳香烃', description: '苯环与定位规则', emoji: '🛡️' },
  's3_ch31': { title: '第31章 卤代烃', description: '水解与消去', emoji: '🧯' },
  's3_ch32': { title: '第32章 醇酚醚', description: '羟基的多样性', emoji: '🍷' },
  's3_ch33': { title: '第33章 醛和酮', description: '羰基的加成与氧化', emoji: '🪞' },
  's3_ch34': { title: '第34章 羧酸衍生物', description: '酸性与酯化', emoji: '🐜' },
  's3_ch35': { title: '第35章 含氮化合物', description: '胺与酰胺', emoji: '🧬' },
  's3_ch36': { title: '第36章 高分子', description: '聚合与合成材料', emoji: '👕' },
};

export const S3_LEVELS: Level[] = [
  // --- 第26章: 有机概论 ---
  { 
    id: 's3_ch26_1', chapterId: 's3_ch26', grade: 'S3', title: '26.1 有机化合物', description: '定义', locked: false, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '定义', difficulty: 'normal', 
        story: { title: '碳的森林', content: '欢迎来到有机世界！这里是碳的王国，几乎所有的生命物质——从你的皮肤到吃的糖——都是有机物。', emoji: '🌿', mood: 'welcome' },
        questions: [{ id: 'q1', type: 'mcq', text: '有机物主要指含__的化合物？', options: ['碳', '氧'], correctIndex: 0, explanation: '除CO, CO2, 碳酸盐等。' }] 
      },
      {
        id: 'p2', title: '来源', difficulty: 'normal',
        story: { title: '黑色黄金', content: '大多数有机物都来自石油和煤。石油被称为“工业的血液”，Octo 正在从里面提炼各种宝贝！', emoji: '🛢️', mood: 'curious' },
        questions: [{ id: 'q2', type: 'mcq', text: '有机物的主要天然来源？', options: ['石油和煤', '矿石'], correctIndex: 0, explanation: '化石燃料。' }]
      }
    ] 
  },
  // ... (Ch26_2 to Ch26_5 largely same, skipping for brevity but implied presence) ...
  { 
    id: 's3_ch26_2', chapterId: 's3_ch26', grade: 'S3', title: '26.2 有机物特性', description: '熔沸点/溶解性', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '熔点', difficulty: 'normal', story: { title: '怕热的家伙', content: '大多数有机物都比较娇气，怕热，容易燃烧。不像石头（无机物）那么耐高温。', emoji: '🕯️', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: '有机物熔点通常较？', options: ['低', '高'], correctIndex: 0, explanation: '分子晶体。' }] }] 
  },
  { 
    id: 's3_ch26_3', chapterId: 's3_ch26', grade: 'S3', title: '26.3 分子结构', description: '共价键', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '四价', difficulty: 'normal', story: { title: '四只手', content: '碳原子有四只手（四个价键），这让它能抓住各种原子，甚至抓住另一个碳原子，形成长长的链条！', emoji: '👐', mood: 'happy' }, questions: [{ id: 'q1', type: 'input', text: '碳原子形成__个键？', validAnswer: '4', explanation: '四价。' }] }] 
  },
  { 
    id: 's3_ch26_4', chapterId: 's3_ch26', grade: 'S3', title: '26.4 分类', description: '骨架与官能团', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '官能团', difficulty: 'normal', story: { title: '特殊的印记', content: '不同的有机物有不同的性格，这是因为它们带着不同的“徽章”——官能团。比如 -OH 代表醇。', emoji: '🎖️', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '决定有机物化学性质的原子团叫？', options: ['官能团', '基团'], correctIndex: 0, explanation: 'Functional group。' }] }] 
  },
  { 
    id: 's3_ch26_5', chapterId: 's3_ch26', grade: 'S3', title: '26.5 命名', description: 'IUPAC', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '主链', difficulty: 'normal', story: { title: '起名字', content: '有机物太多了，Octo 必须学会 IUPAC 命名法，给每个分子起一个独一无二的名字，否则会乱套的！', emoji: '🏷️', mood: 'determined' }, questions: [{ id: 'q1', type: 'mcq', text: '选择__的碳链为主链？', options: ['最长', '最短'], correctIndex: 0, explanation: '含官能团最长碳链。' }] }] 
  },

  // --- 第27章: 烷烃 (Expanded) ---
  { 
    id: 's3_ch27_5', chapterId: 's3_ch27', grade: 'S3', title: '27.5 化学性质', description: '取代/氧化', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '取代', difficulty: 'normal', 
        story: { title: '光照下的交换', content: '虽然烷烃很懒，但在强光照射下，氯原子会暴力地把氢原子踢走，取而代之！这就是取代反应。', emoji: '☀️', mood: 'nervous' },
        questions: [{ id: 'q1', type: 'mcq', text: '烷烃卤代反应条件？', options: ['光照', '黑暗'], correctIndex: 0, explanation: '自由基机理。' }] 
      },
      {
        id: 'p2', title: '氧化', difficulty: 'normal',
        story: { title: '蓝色的火焰', content: '甲烷是天然气的主要成分。点燃它，会产生美丽的蓝色火焰，释放出大量的热，帮 Octo 煮熟晚餐！', emoji: '🍳', mood: 'hungry' },
        questions: [{ id: 'q2', type: 'mcq', text: '烷烃燃烧生成？', options: ['CO2和H2O', 'CO和H2'], correctIndex: 0, explanation: '完全燃烧。' }]
      }
    ] 
  },
  // ... (Other Ch27 levels remain, updating 27.6) ...
  { 
    id: 's3_ch27_1', chapterId: 's3_ch27', grade: 'S3', title: '27.1 通式', description: 'CnH2n+2', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '饱和', difficulty: 'normal', story: { title: '吃饱了的碳', content: '烷烃里的碳原子都吃得饱饱的（饱和），不想再接纳新原子了，所以它们化学性质很稳定。', emoji: '😌', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '烷烃属于？', options: ['饱和烃', '不饱和烃'], correctIndex: 0, explanation: '只有单键。' }] }] 
  },
  { 
    id: 's3_ch27_2', chapterId: 's3_ch27', grade: 'S3', title: '27.2 同分异构', description: '碳链异构', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '丁烷', difficulty: 'normal', story: { title: '变形记', content: '同样的碳和氢原子，既可以排成直线，也可以排成T字形。它们成分一样，但其实是不同的物质哦！', emoji: '🧩', mood: 'surprised' }, questions: [{ id: 'q1', type: 'mcq', text: '丁烷有几种异构体？', options: ['2', '3'], correctIndex: 0, explanation: '正丁烷和异丁烷。' }] }] 
  },
  { 
    id: 's3_ch27_3', chapterId: 's3_ch27', grade: 'S3', title: '27.3 命名', description: '系统命名', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '编号', difficulty: 'normal', story: { title: '寻找门牌号', content: '给碳链编号时，我们要照顾那些“小树枝”（支链），让它们的门牌号越小越好。', emoji: '🔢', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: '编号从离支链__的一端开始？', options: ['近', '远'], correctIndex: 0, explanation: '位次和最小。' }] }] 
  },
  { 
    id: 's3_ch27_4', chapterId: 's3_ch27', grade: 'S3', title: '27.4 物理性质', description: '递变', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '状态', difficulty: 'normal', story: { title: '越来越重', content: '随着碳链变长，分子越来越重，它们也从气体变成液体，最后变成固体（像蜡烛一样）。', emoji: '🕯️', mood: 'curious' }, questions: [{ id: 'q1', type: 'mcq', text: '常温下C1-C4的烷烃是？', options: ['气态', '液态'], correctIndex: 0, explanation: '碳数少沸点低。' }] }] 
  },
  { 
    id: 's3_ch27_6', chapterId: 's3_ch27', grade: 'S3', title: '27.6 甲烷', description: 'CH4', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ 
      id: 'p1', title: '结构', difficulty: 'normal', 
      story: { title: '最简单的有机物', content: '甲烷（天然气）是最简单的有机物。它的形状像一个金字塔（正四面体），非常稳固。', emoji: '🔺', mood: 'smart' },
      questions: [{ id: 'q1', type: 'mcq', text: '甲烷空间构型？', options: ['正四面体', '平面正方形'], correctIndex: 0, explanation: '键角109.5度。' }] 
    }] 
  },

  // --- 第28章: 烯烃 (Expanded) ---
  { 
    id: 's3_ch28_5', chapterId: 's3_ch28', grade: 'S3', title: '28.5 化学性质', description: '加成/氧化/聚合', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '加成', difficulty: 'normal', 
        story: { title: '敞开怀抱', content: '双键中有一根键很脆弱，很容易断开，然后把外来的原子（如溴）拥抱进来。这就是加成反应！', emoji: '🤗', mood: 'magic' },
        questions: [{ id: 'q1', type: 'mcq', text: '鉴别烷烃和烯烃用？', options: ['溴水', '水'], correctIndex: 0, explanation: '烯烃使溴水褪色。' }] 
      },
      {
        id: 'p2', title: '氧化', difficulty: 'normal',
        story: { title: '褪色魔法', content: 'Octo 往紫色的高锰酸钾溶液里通入乙烯，紫色竟然消失了！这是因为乙烯被氧化了。', emoji: '🟣', mood: 'surprised' },
        questions: [{ id: 'q2', type: 'mcq', text: '乙烯通入酸性KMnO4溶液，颜色？', options: ['褪去', '变红'], correctIndex: 0, explanation: '被氧化。' }]
      },
      {
        id: 'p3', title: '聚合', difficulty: 'hard',
        story: { title: '手拉手', content: '无数个乙烯分子打开双键，手拉手连成一条超长的链子，就变成了聚乙烯塑料（PE）！', emoji: '🔗', mood: 'happy' },
        questions: [{ id: 'q3', type: 'mcq', text: '乙烯生成聚乙烯是？', options: ['加聚反应', '缩聚反应'], correctIndex: 0, explanation: '加成聚合。' }]
      }
    ] 
  },
  // ... (Other Ch28 levels remain, keeping original short ones for context) ...
  { 
    id: 's3_ch28_1', chapterId: 's3_ch28', grade: 'S3', title: '28.1 结构', description: 'C=C', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '杂化', difficulty: 'normal', story: { title: '双重握手', content: '烯烃里的两个碳原子非常要好，它们伸出两只手紧紧握在一起（双键），所有原子都躺在一个平面上。', emoji: '👐', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '烯烃碳原子杂化方式？', options: ['sp2', 'sp3'], correctIndex: 0, explanation: '平面三角。' }] }] 
  },
  { 
    id: 's3_ch28_2', chapterId: 's3_ch28', grade: 'S3', title: '28.2 同分异构', description: '顺反/位置', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '顺反', difficulty: 'normal', story: { title: '无法旋转', content: '双键就像被锁住了，不能旋转。所以基团在同侧（顺式）还是异侧（反式）就是两种不同的分子了。', emoji: '🔒', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: '2-丁烯存在？', options: ['顺反异构', '手性异构'], correctIndex: 0, explanation: '双键两端连接不同基团。' }] }] 
  },
  { 
    id: 's3_ch28_3', chapterId: 's3_ch28', grade: 'S3', title: '28.3 命名', description: '烯烃', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '双键', difficulty: 'normal', story: { title: '官能团优先', content: '在烯烃世界里，双键是老大。编号时要优先照顾它，让它的号码越小越好。', emoji: '🥇', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '编号使双键位次？', options: ['最小', '最大'], correctIndex: 0, explanation: '官能团优先。' }] }] 
  },
  { 
    id: 's3_ch28_4', chapterId: 's3_ch28', grade: 'S3', title: '28.4 物理性质', description: '溶解性', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '溶解', difficulty: 'normal', story: { title: '油状液体', content: '“烯烃”在拉丁文里的意思是“成油气体”。它们不喜欢水，但是喜欢溶于有机溶剂。', emoji: '🛢️', mood: 'curious' }, questions: [{ id: 'q1', type: 'mcq', text: '烯烃难溶于？', options: ['水', '有机溶剂'], correctIndex: 0, explanation: '非极性。' }] }] 
  },
  { 
    id: 's3_ch28_6', chapterId: 's3_ch28', grade: 'S3', title: '28.6 乙烯', description: 'C2H4', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '催熟', difficulty: 'normal', story: { title: '水果催熟剂', content: '香蕉还是绿的怎么办？放一个熟苹果进去，它释放的乙烯能唤醒香蕉，让它快点变黄。', emoji: '🍌', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '乙烯可用作？', options: ['果实催熟剂', '防腐剂'], correctIndex: 0, explanation: '植物激素。' }] }] 
  },
  { 
    id: 's3_ch28_7', chapterId: 's3_ch28', grade: 'S3', title: '28.7 二烯烃', description: '1,3-丁二烯', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '1,4加成', difficulty: 'hard', story: { title: '共轭效应', content: '当两个双键中间隔着一个单键时，它们会产生神奇的共轭效应。反应时，头尾两端竟然接上了新原子！', emoji: '🔗', mood: 'challenge' }, questions: [{ id: 'q1', type: 'mcq', text: '高温下共轭二烯烃主要发生？', options: ['1,4-加成', '1,2-加成'], correctIndex: 0, explanation: '热力学控制产物。' }] }] 
  },

  // --- 第30章: 芳香烃 (Expanded) ---
  { 
    id: 's3_ch30_1', chapterId: 's3_ch30', grade: 'S3', title: '30.1 苯结构', description: '凯库勒', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '大π键', difficulty: 'normal', 
        story: { title: '咬尾蛇', content: '苯环的结构像一条咬尾蛇。它不是单键也不是双键，而是一种完美的、平均的大π键。像一个甜甜圈！', emoji: '🐍', mood: 'magic' },
        questions: [{ id: 'q1', type: 'mcq', text: '苯环碳碳键长？', options: ['介于单双键之间', '等于双键'], correctIndex: 0, explanation: '大π键。' }] 
      },
      {
        id: 'p2', title: '平面', difficulty: 'normal',
        story: { title: '完美的六边形', content: '苯分子是平的，所有12个原子都躺在同一个平面上，非常对称，这让它非常稳定。', emoji: '❄️', mood: 'calm' },
        questions: [{ id: 'q2', type: 'mcq', text: '苯分子中所有原子？', options: ['共面', '不共面'], correctIndex: 0, explanation: '平面正六边形结构。' }]
      }
    ] 
  },
  // ... (Other Ch30 levels) ...
  { 
    id: 's3_ch30_2', chapterId: 's3_ch30', grade: 'S3', title: '30.2 命名', description: '邻间对', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '位置', difficulty: 'normal', story: { title: '座位安排', content: '苯环上有两个邻居时，如果面对面坐，我们叫它“对位”；如果紧挨着坐，叫“邻位”。', emoji: '🪑', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '1,4-二甲苯又称？', options: ['对二甲苯', '间二甲苯'], correctIndex: 0, explanation: 'Para-xylene。' }] }] 
  },
  { 
    id: 's3_ch30_3', chapterId: 's3_ch30', grade: 'S3', title: '30.3 物理性质', description: '毒性', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '溶解', difficulty: 'normal', story: { title: '有毒的溶剂', content: '苯有一种特殊的香味，但不要被迷惑了！它是致癌物。它比水轻，会浮在水面上。', emoji: '☠️', mood: 'nervous' }, questions: [{ id: 'q1', type: 'mcq', text: '苯密度比水？', options: ['小', '大'], correctIndex: 0, explanation: '浮在水面。' }] }] 
  },
  { 
    id: 's3_ch30_4', chapterId: 's3_ch30', grade: 'S3', title: '30.4 化学性质', description: '取代', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '溴代', difficulty: 'normal', 
        story: { title: '铁的催化', content: '苯环很稳定，不想反应。但在铁屑（FeBr3）的催促下，它勉强同意用一个溴原子换掉一个氢原子。', emoji: '🔄', mood: 'challenge' },
        questions: [{ id: 'q1', type: 'mcq', text: '苯与液溴在FeBr3催化下发生？', options: ['取代反应', '加成反应'], correctIndex: 0, explanation: '生成溴苯。' }] 
      },
      {
        id: 'p2', title: '硝化', difficulty: 'hard',
        story: { title: '制造炸药原料', content: 'Octo 把苯扔进浓硝酸和浓硫酸的混合液里加热，生成了苦杏仁味的硝基苯。这可是炸药（TNT）的亲戚！', emoji: '🧨', mood: 'nervous' },
        questions: [{ id: 'q2', type: 'mcq', text: '硝化反应属于？', options: ['取代反应', '加成反应'], correctIndex: 0, explanation: 'NO2 取代 H。' }]
      }
    ] 
  },
  { 
    id: 's3_ch30_5', chapterId: 's3_ch30', grade: 'S3', title: '30.5 同系物', description: '定位规则', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '活化', difficulty: 'hard', story: { title: '指挥官', content: '苯环上如果已经有了一个甲基，它就像指挥官一样，命令新来的原子去它的邻位或对位。', emoji: '👮', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '甲基是？', options: ['致活基团', '致钝基团'], correctIndex: 0, explanation: '给电子基团，邻对位定位。' }] }] 
  },
  { 
    id: 's3_ch30_6', chapterId: 's3_ch30', grade: 'S3', title: '30.6 稠环', description: '萘/蒽', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '萘', difficulty: 'normal', story: { title: '樟脑丸', content: '老式衣柜里的味道来自萘（樟脑丸）。它由两个苯环并肩站在一起组成。', emoji: '👘', mood: 'curious' }, questions: [{ id: 'q1', type: 'input', text: '萘分子由__个苯环稠合？', validAnswer: '2', explanation: 'C10H8。' }] }] 
  },

  // --- 第32章: 醇酚醚 (Expanded) ---
  { 
    id: 's3_ch32_1', chapterId: 's3_ch32', grade: 'S3', title: '32.1 醇', description: 'ROH', locked: true, completed: false, score: 0, position: pos, 
    phases: [
      { 
        id: 'p1', title: '氧化', difficulty: 'normal', 
        story: { title: '变质的酒', content: '酒（乙醇）放久了会变酸，或者在铜催化下变成乙醛。这是醇的氧化反应。', emoji: '🍷', mood: 'magic' },
        questions: [{ id: 'q1', type: 'mcq', text: '伯醇氧化生成？', options: ['醛', '酮'], correctIndex: 0, explanation: '仲醇氧化生成酮。' }] 
      },
      {
        id: 'p2', title: '溶解性', difficulty: 'normal',
        story: { title: '和水交朋友', content: '为什么酒精能和水无限混溶？因为它们之间有“氢键”连接，关系好得像亲兄弟！', emoji: '🤝', mood: 'happy' },
        questions: [{ id: 'q2', type: 'mcq', text: '乙醇易溶于水是因为形成了？', options: ['氢键', '离子键'], correctIndex: 0, explanation: '分子间氢键。' }]
      },
      {
        id: 'p3', title: '钠反应', difficulty: 'normal',
        story: { title: '温和的冒泡', content: '把钠扔进酒精里，它会沉下去慢慢冒泡（产生氢气），比扔进水里温柔多了。', emoji: '🛁', mood: 'calm' },
        questions: [{ id: 'q3', type: 'mcq', text: '乙醇与钠反应生成？', options: ['氢气', '氧气'], correctIndex: 0, explanation: '置换羟基氢。' }]
      }
    ] 
  },
  // ... (Keeping Ch29, Ch31, Ch32_2/3, Ch33, Ch34, Ch35, Ch36) ...
  // [Full content for other chapters is implied to be retained for file integrity]
  
  { 
    id: 's3_ch29_1', chapterId: 's3_ch29', grade: 'S3', title: '29.1 结构', description: 'C≡C', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '直线', difficulty: 'normal', story: { title: '三重握手', content: '炔烃的碳原子更加亲密，它们有三根键连在一起！这让乙炔分子变得像棍子一样笔直。', emoji: '🥖', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '乙炔分子构型？', options: ['直线型', 'V型'], correctIndex: 0, explanation: 'sp杂化。' }] }] 
  },
  { 
    id: 's3_ch29_2', chapterId: 's3_ch29', grade: 'S3', title: '29.2 命名', description: '炔', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '后缀', difficulty: 'normal', story: { title: '改名换姓', content: '规则和烯烃差不多，但我们要把后缀改成“炔”（yne），代表它有三键。', emoji: '📛', mood: 'happy' }, questions: [{ id: 'q1', type: 'input', text: '炔烃后缀是？', validAnswer: '炔', explanation: '-yne' }] }] 
  },
  { 
    id: 's3_ch29_3', chapterId: 's3_ch29', grade: 'S3', title: '29.3 物理性质', description: '沸点', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '比较', difficulty: 'normal', story: { title: '沸点规律', content: '虽然它们也是非极性的，但因为分子杆子更直，靠得更近，沸点比同碳数的烷烃稍微高一点点。', emoji: '🌡️', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: '同碳数炔烃沸点比烷烃？', options: ['稍高', '低'], correctIndex: 0, explanation: '极性略大。' }] }] 
  },
  { 
    id: 's3_ch29_4', chapterId: 's3_ch29', grade: 'S3', title: '29.4 化学性质', description: '炔化物', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '酸性', difficulty: 'hard', story: { title: '活跃的氢', content: '三键末端的氢原子很松动，有点像酸一样。遇到银氨溶液，它会变成白色的乙炔银沉淀！', emoji: '⚪', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '端炔氢具有弱？', options: ['酸性', '碱性'], correctIndex: 0, explanation: '能与金属钠反应。' }] }] 
  },
  { 
    id: 's3_ch29_5', chapterId: 's3_ch29', grade: 'S3', title: '29.5 乙炔', description: '电石气', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '制备', difficulty: 'normal', story: { title: '电石灯', content: '以前矿工用“电石”加水来产生乙炔点灯照明。反应非常剧烈，要小心哦！', emoji: '🔦', mood: 'nervous' }, questions: [{ id: 'q1', type: 'mcq', text: 'CaC2 + H2O 生成？', options: ['C2H2', 'CH4'], correctIndex: 0, explanation: '电石制乙炔。' }] }] 
  },
  { 
    id: 's3_ch31_1', chapterId: 's3_ch31', grade: 'S3', title: '31.1 分类命名', description: 'RX', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '分类', difficulty: 'normal', story: { title: '麻醉剂', content: '早期的医生用氯仿（三氯甲烷）做麻醉剂。卤代烃经常被用作溶剂。', emoji: '🏥', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: '氯仿是？', options: ['三氯甲烷', '四氯化碳'], correctIndex: 0, explanation: 'CHCl3。' }] }] 
  },
  { 
    id: 's3_ch31_2', chapterId: 's3_ch31', grade: 'S3', title: '31.2 物理性质', description: '沸点', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '密度', difficulty: 'normal', story: { title: '沉底还是浮起？', content: '普通的卤代烃比水重，所以会沉到水底，形成油珠。这和普通油类（浮在水面）不一样哦！', emoji: '💧', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '一氯代烷密度比水？', options: ['小', '大'], correctIndex: 0, explanation: '大多比水小（除特例），但多卤代物比水大。' }] }] 
  },
  { 
    id: 's3_ch31_3', chapterId: 's3_ch31', grade: 'S3', title: '31.3 化学性质', description: '水解/消去', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '条件', difficulty: 'normal', story: { title: '两种命运', content: '卤代烃遇到氢氧化钠，如果是水溶液，它就变成醇；如果是醇溶液加热，它就变成烯烃。命运取决于溶剂！', emoji: '🔀', mood: 'challenge' }, questions: [{ id: 'q1', type: 'mcq', text: '消去反应需用？', options: ['NaOH醇溶液', 'NaOH水溶液'], correctIndex: 0, explanation: '醇溶液加热。' }] }] 
  },
  { 
    id: 's3_ch31_4', chapterId: 's3_ch31', grade: 'S3', title: '31.4 重要卤代烃', description: 'CFC', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '环境', difficulty: 'normal', story: { title: '臭氧杀手', content: '氟利昂曾经是冰箱的好伙伴，但它会飞到高空破坏臭氧层。现在我们正在淘汰它。', emoji: '🌍', mood: 'determined' }, questions: [{ id: 'q1', type: 'mcq', text: '氟利昂破坏？', options: ['臭氧层', '酸雨'], correctIndex: 0, explanation: '产生Cl自由基。' }] }] 
  },
  { 
    id: 's3_ch32_2', chapterId: 's3_ch32', grade: 'S3', title: '32.2 酚', description: 'PhOH', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '鉴别', difficulty: 'normal', story: { title: '紫色魔法', content: '想知道溶液里有没有苯酚？滴一滴氯化铁，如果出现紫色，那就是它！', emoji: '🟣', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '苯酚遇FeCl3显？', options: ['紫色', '红色'], correctIndex: 0, explanation: '络合反应。' }] }] 
  },
  { 
    id: 's3_ch32_3', chapterId: 's3_ch32', grade: 'S3', title: '32.3 醚', description: 'ROR', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '稳定性', difficulty: 'normal', story: { title: '惰性溶剂', content: '醚像个隐士，不爱和别人反应。这让它成为了很好的溶剂，适合用来提取东西。', emoji: '🧪', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: '醚化学性质？', options: ['稳定', '活泼'], correctIndex: 0, explanation: '常用作溶剂。' }] }] 
  },
  { 
    id: 's3_ch33_1', chapterId: 's3_ch33', grade: 'S3', title: '33.1 结构', description: 'C=O', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '极性', difficulty: 'normal', story: { title: '极性碳', content: '羰基（C=O）里的氧太霸道了，把电子都抢了过去，让碳带上了正电性。', emoji: '🧲', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '羰基碳显？', options: ['正电性', '负电性'], correctIndex: 0, explanation: '氧电负性大。' }] }] 
  },
  { 
    id: 's3_ch33_2', chapterId: 's3_ch33', grade: 'S3', title: '33.2 物理性质', description: '气味', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '状态', difficulty: 'normal', story: { title: '刺鼻的甲醛', content: '装修新房时的刺鼻气味往往来自甲醛。它常温下是气体，对人体有害哦。', emoji: '😷', mood: 'nervous' }, questions: [{ id: 'q1', type: 'mcq', text: '甲醛常温下是？', options: ['气体', '液体'], correctIndex: 0, explanation: '刺激性气体。' }] }] 
  },
  { 
    id: 's3_ch33_3', chapterId: 's3_ch33', grade: 'S3', title: '33.3 化学性质', description: '加成/氧化', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '银镜', difficulty: 'normal', story: { title: '制作镜子', content: '醛具有还原性。Octo 把它和银氨溶液共热，试管壁上竟然镀上了一层光亮的银镜！', emoji: '🪞', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '能发生银镜反应的是？', options: ['醛', '酮'], correctIndex: 0, explanation: '醛有还原性。' }] }] 
  },
  { 
    id: 's3_ch33_4', chapterId: 's3_ch33', grade: 'S3', title: '33.4 重要醛酮', description: '甲醛/丙酮', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '福尔马林', difficulty: 'normal', story: { title: '标本保存', content: '生物实验室里保存标本的液体叫福尔马林，其实它就是甲醛的水溶液。', emoji: '🦎', mood: 'curious' }, questions: [{ id: 'q1', type: 'mcq', text: '福尔马林是__的水溶液？', options: ['甲醛', '乙醛'], correctIndex: 0, explanation: '防腐保存标本。' }] }] 
  },
  { 
    id: 's3_ch34_1', chapterId: 's3_ch34', grade: 'S3', title: '34.1 羧酸', description: 'COOH', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '酸性', difficulty: 'normal', story: { title: '除水垢', content: '水壶里有水垢（碳酸钙）？Octo 倒点醋（乙酸）进去，气泡冒出来，水垢就没了！乙酸比碳酸强。', emoji: '🏺', mood: 'happy' }, questions: [{ id: 'q1', type: 'mcq', text: '乙酸酸性比苯酚？', options: ['强', '弱'], correctIndex: 0, explanation: '羧酸>碳酸>苯酚。' }] }] 
  },
  { 
    id: 's3_ch34_2', chapterId: 's3_ch34', grade: 'S3', title: '34.2 酯', description: '酯化', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '水解', difficulty: 'normal', story: { title: '香水的秘密', content: '花果香很多来自酯类。但如果加碱加热，它们就会分解变回酸和醇，香味就没了。', emoji: '🌸', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '酯碱性水解不可逆，称为？', options: ['皂化', '中和'], correctIndex: 0, explanation: '皂化反应。' }] }] 
  },
  { 
    id: 's3_ch34_3', chapterId: 's3_ch34', grade: 'S3', title: '34.3 油脂', description: '甘油酯', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '组成', difficulty: 'normal', story: { title: '能量炸弹', content: '油脂也是一种酯。它由高级脂肪酸和甘油组成，是我们身体储存能量的重要仓库。', emoji: '🍟', mood: 'hungry' }, questions: [{ id: 'q1', type: 'mcq', text: '油脂是高级脂肪酸与__形成的酯？', options: ['甘油', '乙醇'], correctIndex: 0, explanation: '丙三醇。' }] }] 
  },
  { 
    id: 's3_ch34_4', chapterId: 's3_ch34', grade: 'S3', title: '34.4 洗涤剂', description: '肥皂', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '硬水', difficulty: 'normal', story: { title: '肥皂失效', content: 'Octo 在硬水里用肥皂洗澡，结果全是渣渣（钙镁皂）。肥皂在硬水里效果可不好。', emoji: '🧼', mood: 'nervous' }, questions: [{ id: 'q1', type: 'mcq', text: '肥皂在硬水中效果？', options: ['差', '好'], correctIndex: 0, explanation: '生成钙镁皂沉淀。' }] }] 
  },
  { 
    id: 's3_ch35_1', chapterId: 's3_ch35', grade: 'S3', title: '35.1 硝基化合物', description: 'NO2', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '还原', difficulty: 'normal', story: { title: '变身', content: '硝基苯有苦杏仁味，有毒。Octo 用铁粉和酸把它还原成了重要的化工原料——苯胺。', emoji: '🏭', mood: 'magic' }, questions: [{ id: 'q1', type: 'mcq', text: '硝基苯还原生成？', options: ['苯胺', '苯酚'], correctIndex: 0, explanation: 'Fe/HCl还原。' }] }] 
  },
  { 
    id: 's3_ch35_2', chapterId: 's3_ch35', grade: 'S3', title: '35.2 胺', description: 'NH2', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '碱性', difficulty: 'normal', story: { title: '有机碱', content: '胺就像氨气的亲戚，它们也有孤对电子，所以显碱性，能和酸反应生成盐。', emoji: '🔋', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '胺具有？', options: ['碱性', '酸性'], correctIndex: 0, explanation: '氮上有孤对电子。' }] }] 
  },
  { 
    id: 's3_ch35_3', chapterId: 's3_ch35', grade: 'S3', title: '35.3 酰胺', description: 'CONH2', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '水解', difficulty: 'normal', story: { title: '蛋白质的纽扣', content: '酰胺键（肽键）就像连接氨基酸的纽扣。水解就是把这些纽扣解开，把蛋白质拆回氨基酸。', emoji: '🧬', mood: 'thinking' }, questions: [{ id: 'q1', type: 'mcq', text: '酰胺水解生成？', options: ['酸和胺', '醛和氨'], correctIndex: 0, explanation: '肽键断裂。' }] }] 
  },
  { 
    id: 's3_ch36_1', chapterId: 's3_ch36', grade: 'S3', title: '36.1 概述', description: '单体/链节', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '聚合度', difficulty: 'normal', story: { title: '巨人的诞生', content: '无数个小分子（单体）手拉手，变成了巨大的高分子长链。n 就代表有多少个小家伙连在了一起。', emoji: '🔗', mood: 'happy' }, questions: [{ id: 'q1', type: 'input', text: '聚合度通常用字母__表示？', validAnswer: 'n', explanation: '重复单元数。' }] }] 
  },
  { 
    id: 's3_ch36_2', chapterId: 's3_ch36', grade: 'S3', title: '36.2 合成材料', description: '塑料/橡胶/纤维', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '热塑性', difficulty: 'normal', story: { title: '可回收塑料', content: '有些塑料加热后会变软流动（热塑性），可以反复加工。另一些一加热就硬化定型（热固性）。', emoji: '♻️', mood: 'smart' }, questions: [{ id: 'q1', type: 'mcq', text: '聚乙烯塑料属于？', options: ['热塑性', '热固性'], correctIndex: 0, explanation: '加热软化。' }] }] 
  },
  { 
    id: 's3_ch36_3', chapterId: 's3_ch36', grade: 'S3', title: '36.3 新型材料', description: '导电/降解', locked: true, completed: false, score: 0, position: pos, 
    phases: [{ id: 'p1', title: '导电', difficulty: 'normal', story: { title: '会导电的塑料', content: '谁说塑料绝缘？科学家发现了导电高分子（如聚乙炔），不仅能导电，还能用来做柔性屏幕！', emoji: '📱', mood: 'surprised' }, questions: [{ id: 'q1', type: 'mcq', text: '聚乙炔掺杂后可以？', options: ['导电', '发光'], correctIndex: 0, explanation: '导电高分子。' }] }] 
  },
];
