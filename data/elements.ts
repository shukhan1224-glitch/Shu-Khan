
import { ElementDetail } from '../types';

// Helper to generate a consistent gradient based on category
const getCategoryStyle = (category: string) => {
  const map: Record<string, { gradient: string, color: string, shape: any }> = {
    'Nonmetal': { gradient: 'from-blue-100 to-blue-200', color: 'text-blue-600', shape: 'cloud' },
    'Noble Gas': { gradient: 'from-purple-100 to-fuchsia-100', color: 'text-purple-600', shape: 'circle' },
    'Alkali Metal': { gradient: 'from-red-100 to-orange-100', color: 'text-red-600', shape: 'crystal' },
    'Alkaline Earth': { gradient: 'from-amber-100 to-yellow-100', color: 'text-amber-600', shape: 'crystal' },
    'Metalloid': { gradient: 'from-teal-100 to-emerald-100', color: 'text-teal-600', shape: 'diamond' },
    'Halogen': { gradient: 'from-cyan-100 to-sky-200', color: 'text-cyan-700', shape: 'cloud' },
    'Transition Metal': { gradient: 'from-slate-200 to-zinc-300', color: 'text-slate-700', shape: 'block' },
    'Post-transition Metal': { gradient: 'from-gray-200 to-gray-300', color: 'text-gray-600', shape: 'block' },
    'Lanthanide': { gradient: 'from-pink-100 to-rose-200', color: 'text-pink-700', shape: 'star' },
    'Actinide': { gradient: 'from-rose-100 to-red-200', color: 'text-rose-800', shape: 'star' },
  };
  return map[category] || { gradient: 'from-slate-100 to-slate-200', color: 'text-slate-500', shape: 'circle' };
};

// Raw list of all 118 elements
const ALL_ELEMENTS_RAW = [
  ["H", "Hydrogen", "Nonmetal", "宇宙中最丰富的元素"],
  ["He", "Helium", "Noble Gas", "吸入后声音变尖"],
  ["Li", "Lithium", "Alkali Metal", "最轻的金属"],
  ["Be", "Beryllium", "Alkaline Earth", "有着甜味但剧毒"],
  ["B", "Boron", "Metalloid", "用于制造绿色火焰"],
  ["C", "Carbon", "Nonmetal", "生命的基石"],
  ["N", "Nitrogen", "Nonmetal", "空气的主要成分"],
  ["O", "Oxygen", "Nonmetal", "呼吸必需品"],
  ["F", "Fluorine", "Halogen", "反应性最强的元素"],
  ["Ne", "Neon", "Noble Gas", "霓虹灯的光源"],
  ["Na", "Sodium", "Alkali Metal", "遇水剧烈反应"],
  ["Mg", "Magnesium", "Alkaline Earth", "叶绿素的核心"],
  ["Al", "Aluminum", "Post-transition Metal", "地壳中最多的金属"],
  ["Si", "Silicon", "Metalloid", "半导体的心脏"],
  ["P", "Phosphorus", "Nonmetal", "最早从尿液中发现"],
  ["S", "Sulfur", "Nonmetal", "火山口的黄色晶体"],
  ["Cl", "Chlorine", "Halogen", "泳池消毒的味道"],
  ["Ar", "Argon", "Noble Gas", "灯泡里的保护气"],
  ["K", "Potassium", "Alkali Metal", "香蕉里富含的元素"],
  ["Ca", "Calcium", "Alkaline Earth", "骨骼的主要成分"],
  ["Sc", "Scandium", "Transition Metal", "用于铝合金棒球棍"],
  ["Ti", "Titanium", "Transition Metal", "轻如铝，强如钢"],
  ["V", "Vanadium", "Transition Metal", "美丽的五彩离子"],
  ["Cr", "Chromium", "Transition Metal", "给红宝石红色的元素"],
  ["Mn", "Manganese", "Transition Metal", "多种化合价"],
  ["Fe", "Iron", "Transition Metal", "工业的骨骼"],
  ["Co", "Cobalt", "Transition Metal", "蓝色的玻璃颜料"],
  ["Ni", "Nickel", "Transition Metal", "硬币的材料"],
  ["Cu", "Copper", "Transition Metal", "人类最早使用的金属"],
  ["Zn", "Zinc", "Transition Metal", "保护钢铁不生锈"],
  ["Ga", "Gallium", "Post-transition Metal", "在手心里融化的金属"],
  ["Ge", "Germanium", "Metalloid", "早期的晶体管材料"],
  ["As", "Arsenic", "Metalloid", "著名的毒药"],
  ["Se", "Selenium", "Nonmetal", "复印机的感光鼓"],
  ["Br", "Bromine", "Halogen", "唯一的液态非金属"],
  ["Kr", "Krypton", "Noble Gas", "超人的克星(玩笑)"],
  ["Rb", "Rubidium", "Alkali Metal", "用于原子钟"],
  ["Sr", "Strontium", "Alkaline Earth", "红色烟火"],
  ["Y", "Yttrium", "Transition Metal", "超导材料"],
  ["Zr", "Zirconium", "Transition Metal", "假钻石(立方氧化锆)"],
  ["Nb", "Niobium", "Transition Metal", "用于超导磁体"],
  ["Mo", "Molybdenum", "Transition Metal", "二战中的重要金属"],
  ["Tc", "Technetium", "Transition Metal", "第一个人造元素"],
  ["Ru", "Ruthenium", "Transition Metal", "钢笔尖的耐磨材料"],
  ["Rh", "Rhodium", "Transition Metal", "比黄金还贵"],
  ["Pd", "Palladium", "Transition Metal", "汽车尾气净化"],
  ["Ag", "Silver", "Transition Metal", "导电性最好的金属"],
  ["Cd", "Cadmium", "Transition Metal", "电池材料，有毒"],
  ["In", "Indium", "Post-transition Metal", "触摸屏里的导电膜"],
  ["Sn", "Tin", "Post-transition Metal", "罐头盒的镀层"],
  ["Sb", "Antimony", "Metalloid", "眼影粉的古老原料"],
  ["Te", "Tellurium", "Metalloid", "有大蒜味"],
  ["I", "Iodine", "Halogen", "升华成紫色气体"],
  ["Xe", "Xenon", "Noble Gas", "离子推进器燃料"],
  ["Cs", "Cesium", "Alkali Metal", "定义秒的长度"],
  ["Ba", "Barium", "Alkaline Earth", "钡餐造影"],
  ["La", "Lanthanum", "Lanthanide", "混合动力汽车电池"],
  ["Ce", "Cerium", "Lanthanide", "打火石材料"],
  ["Pr", "Praseodymium", "Lanthanide", "护目镜着色"],
  ["Nd", "Neodymium", "Lanthanide", "最强永磁体"],
  ["Pm", "Promethium", "Lanthanide", "夜光涂料"],
  ["Sm", "Samarium", "Lanthanide", "电吉他拾音器"],
  ["Eu", "Europium", "Lanthanide", "欧元防伪荧光"],
  ["Gd", "Gadolinium", "Lanthanide", "MRI造影剂"],
  ["Tb", "Terbium", "Lanthanide", "绿色荧光粉"],
  ["Dy", "Dysprosium", "Lanthanide", "硬盘驱动器"],
  ["Ho", "Holmium", "Lanthanide", "最强磁性"],
  ["Er", "Erbium", "Lanthanide", "光纤信号放大"],
  ["Tm", "Thulium", "Lanthanide", "激光手术刀"],
  ["Yb", "Ytterbium", "Lanthanide", "原子钟"],
  ["Lu", "Lutetium", "Lanthanide", "石油裂化催化剂"],
  ["Hf", "Hafnium", "Transition Metal", "核潜艇控制棒"],
  ["Ta", "Tantalum", "Transition Metal", "手机电容器"],
  ["W", "Tungsten", "Transition Metal", "熔点最高的金属"],
  ["Re", "Rhenium", "Transition Metal", "喷气发动机叶片"],
  ["Os", "Osmium", "Transition Metal", "密度最大的金属"],
  ["Ir", "Iridium", "Transition Metal", "恐龙灭绝的证据"],
  ["Pt", "Platinum", "Transition Metal", "催化剂之王"],
  ["Au", "Gold", "Transition Metal", "永不生锈"],
  ["Hg", "Mercury", "Transition Metal", "唯一的液态金属"],
  ["Tl", "Thallium", "Post-transition Metal", "剧毒"],
  ["Pb", "Lead", "Post-transition Metal", "阻挡X射线"],
  ["Bi", "Bismuth", "Post-transition Metal", "美丽的彩虹晶体"],
  ["Po", "Polonium", "Metalloid", "居里夫人发现"],
  ["At", "Astatine", "Halogen", "地球上最稀有"],
  ["Rn", "Radon", "Noble Gas", "放射性气体"],
  ["Fr", "Francium", "Alkali Metal", "极不稳定"],
  ["Ra", "Radium", "Alkaline Earth", "居里夫人发现"],
  ["Ac", "Actinium", "Actinide", "蓝色辉光"],
  ["Th", "Thorium", "Actinide", "未来的核燃料"],
  ["Pa", "Protactinium", "Actinide", "稀有放射性"],
  ["U", "Uranium", "Actinide", "核电站燃料"],
  ["Np", "Neptunium", "Actinide", "人造元素"],
  ["Pu", "Plutonium", "Actinide", "核电池"],
  ["Am", "Americium", "Actinide", "烟雾探测器"],
  ["Cm", "Curium", "Actinide", "火星探测车"],
  ["Bk", "Berkelium", "Actinide", "以伯克利命名"],
  ["Cf", "Californium", "Actinide", "极昂贵"],
  ["Es", "Einsteinium", "Actinide", "以爱因斯坦命名"],
  ["Fm", "Fermium", "Actinide", "以费米命名"],
  ["Md", "Mendelevium", "Actinide", "以门捷列夫命名"],
  ["No", "Nobelium", "Actinide", "以诺贝尔命名"],
  ["Lr", "Lawrencium", "Actinide", "回旋加速器"],
  ["Rf", "Rutherfordium", "Transition Metal", "以卢瑟福命名"],
  ["Db", "Dubnium", "Transition Metal", "以杜布纳命名"],
  ["Sg", "Seaborgium", "Transition Metal", "以西博格命名"],
  ["Bh", "Bohrium", "Transition Metal", "以波尔命名"],
  ["Hs", "Hassium", "Transition Metal", "以黑森州命名"],
  ["Mt", "Meitnerium", "Transition Metal", "以迈特纳命名"],
  ["Ds", "Darmstadtium", "Transition Metal", "以达姆施塔特命名"],
  ["Rg", "Roentgenium", "Transition Metal", "以伦琴命名"],
  ["Cn", "Copernicium", "Transition Metal", "以哥白尼命名"],
  ["Nh", "Nihonium", "Post-transition Metal", "以日本命名"],
  ["Fl", "Flerovium", "Post-transition Metal", "稳定岛"],
  ["Mc", "Moscovium", "Post-transition Metal", "以莫斯科命名"],
  ["Lv", "Livermorium", "Post-transition Metal", "以利弗莫尔命名"],
  ["Ts", "Tennessine", "Halogen", "以田纳西命名"],
  ["Og", "Oganesson", "Noble Gas", "第118号元素"]
];

// Specific images for some cool elements
const ELEMENT_IMAGES: Record<string, string> = {
    'H': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80', // Glassware
    'He': 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=400&q=80', // Balloons
    'C': 'https://images.unsplash.com/photo-1616892523267-27b9c1d096b7?auto=format&fit=crop&w=400&q=80', // Diamond
    'O': 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format&fit=crop&w=400&q=80', // Sky/Cloud
    'Au': 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=400&q=80', // Gold
    'Ag': 'https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?auto=format&fit=crop&w=400&q=80', // Silver
    'Cu': 'https://images.unsplash.com/photo-1605218427306-6354243870f8?auto=format&fit=crop&w=400&q=80', // Copper wires
    'Fe': 'https://images.unsplash.com/photo-1515266591878-5a1487d63930?auto=format&fit=crop&w=400&q=80', // Steel/Iron
    'Ne': 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=400&q=80', // Neon lights
    'S': 'https://images.unsplash.com/photo-1601377344933-72723c347437?auto=format&fit=crop&w=400&q=80', // Yellow powder (approx)
    'Hg': 'https://images.unsplash.com/photo-1620325870002-3929428383ef?auto=format&fit=crop&w=400&q=80', // Liquid metal
    'Si': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80', // Chip
};

// Generate Full Map
export const ELEMENT_DETAILS: Record<string, ElementDetail> = {};
export const ALL_ELEMENT_SYMBOLS: string[] = [];

ALL_ELEMENTS_RAW.forEach((el, index) => {
    const symbol = el[0];
    ALL_ELEMENT_SYMBOLS.push(symbol);
    
    const style = getCategoryStyle(el[2]);
    
    ELEMENT_DETAILS[symbol] = {
        symbol: symbol,
        name: el[1],
        atomicNumber: index + 1,
        category: el[2],
        funFact: el[3],
        description: `化学符号 ${symbol}，原子序数 ${index + 1}。它是 ${el[2]} 家族的一员。`,
        visual: {
            gradient: style.gradient,
            shape: style.shape,
            color: style.color
        },
        image: ELEMENT_IMAGES[symbol] // Optional image
    };
});
