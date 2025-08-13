// 《凡人修仙传》次要角色数据库
// 包含200个次要角色的详细信息

export const characters = [
  { id: 1, name: "韩铁", description: "韩立的大哥，打铁匠。", faction: "韩家", realm: "凡人", status: "存活" },
  { id: 2, name: "韩铸", description: "韩立的二哥。", faction: "韩家", realm: "凡人", status: "存活" },
  { id: 3, name: "韩天生", description: "韩立之父。", faction: "韩家", realm: "凡人", status: "存活" },
  { id: 4, name: "韩小妹", description: "韩立的妹妹，韩立最牵挂的亲人，韩立回乡时目睹了小妹出嫁。", faction: "韩家", realm: "凡人", status: "存活" },
  { id: 5, name: "韩胖子", description: "韩立亲三叔，把韩立领出五里沟，引进七玄门，改变了韩立的命运。", faction: "韩家", realm: "凡人", status: "存活" },
  { id: 6, name: "韩天啸", description: "韩家后人，官拜侍郎，回乡祭祖时，遇到韩立，得到韩立赠送的灵剑和灵药。", faction: "韩家", realm: "凡人", status: "存活" },
  { id: 7, name: "老张叔", description: "韩立村子里唯一识字的人，由他帮韩立取的名字。", faction: "村民", realm: "凡人", status: "存活" },
  { id: 8, name: "张二", description: "青牛客栈的门丁。", faction: "其他", realm: "凡人", status: "存活" },
  { id: 9, name: "舞岩", description: "开武馆的富家子弟，和韩立一同进七玄门的伙伴，因为马副门主的裙带关系，破格送入七绝堂习武。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 10, name: "张均", description: "七玄门弟子，对舞岩被选入七绝堂颇有微词。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 11, name: "吴铭瑞", description: "七玄门弟子，为人小心谨慎。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 12, name: "小算盘", description: "本名金冬宝，自称七玄门万事通，给韩立介绍了很多七玄门的情况。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 13, name: "张长贵", description: "七玄门内门弟子，抢了王样的未婚妻，致使王样自尽，被逼和王大胖决斗。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 14, name: "王样", description: "七玄门外门弟子，王大胖的堂弟，为争风吃醋投河自尽。", faction: "七玄门", realm: "凡人", status: "死亡" },
  { id: 15, name: "王大胖", description: "七玄门弟子，韩立的好友，为了堂弟和人决斗，邀厉飞雨助拳。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 16, name: "赵子灵", description: "七玄门五长老的弟子，给张长贵助拳，被厉飞雨打败。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 17, name: "张大鲁", description: "七玄门弟子。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 18, name: "马云", description: "七玄门弟子。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 19, name: "孙立松", description: "七玄门弟子。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 20, name: "刘铁头", description: "七玄门弟子。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 21, name: "王护法", description: "七玄门护法，接引韩立进七玄门考核的人，收取韩胖子的贿赂。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 22, name: "岳堂主", description: "七玄门管事，负责考核录取弟子。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 23, name: "马荣", description: "七玄门弟子，李长老的徒弟，李长老中毒后积极奔走，请韩立救治，颇尽孝道，对七玄门的危难也有责任感。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 24, name: "马副门主", description: "七玄门副门主，修炼武功玄阴指，韩立在七玄门出名后，为拉拢韩立，许诺给韩立与墨大夫同样的待遇，热衷于在门内搞派系斗争，争夺权势。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 25, name: "李长老", description: "七玄门长老，张袖儿的姨父，中了野狼帮剧毒，命在旦夕，被韩立救活。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 26, name: "李长老夫人", description: "七玄门长老夫人，张袖儿的姨母。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 27, name: "张袖儿", description: "厉飞雨的女伴，七绝堂的核心弟子之一，和厉飞雨参加了死契血斗，后来嫁给了厉飞雨。", faction: "七玄门", realm: "凡人", status: "存活" },
  { id: 28, name: "厉风", description: "厉飞羽第十一代后人，力毙黑巾盗三首领，保护韩天啸回乡，遇到韩立，得到韩立赠送的灵药。", faction: "其他", realm: "凡人", status: "存活" },
  { id: 29, name: "刀疤客", description: "野狼帮小头目，被韩立杀死。", faction: "野狼帮", realm: "凡人", status: "死亡" },
  { id: 30, name: "贾天龙", description: "野狼帮帮主，和七玄门在镜州争夺地盘，从其堂兄处得到大量军用连珠弩，出其不意杀得七玄门大败，一鼓作气攻上了彩霞山，打算将七玄门灭掉，不料落入机关，被迫和七玄门血斗，在血斗中，韩立插手火并，贾天龙和其部署全被韩立烧死，导致了野狼帮覆灭。", faction: "野狼帮", realm: "凡人", status: "死亡" },
  { id: 31, name: "金光上人", description: "秦叶岭秦家散修，四十几岁的干瘦侏儒，受贾天龙的聘请，跟随野狼帮攻击七玄门，用符宝击杀七玄门两位长老，被法力比他深厚的韩立杀人夺宝，韩立从其身上得到升仙令等物。", faction: "散修", realm: "炼气期", status: "死亡" },
  { id: 32, name: "燕柱", description: "燕翎堡炼气期弟子，救了严氏和墨彩环，把他们接入燕翎堡，后来娶了严氏，两年后死于意外。", faction: "燕翎堡", realm: "炼气期", status: "死亡" },
  { id: 33, name: "严氏", description: "墨大夫四夫人，墨彩环之母，颇有野心，墨大夫离家后惊蛟会的当家人，和韩立达成交易，用暖阳宝玉换取欧阳飞天的人头，想把三个女儿嫁给韩立，让韩立帮忙兴复帮会，被拒绝，后来五色门独大，惊蛟会被打击得四分五裂，带着墨彩环逃亡，被燕柱救回燕翎堡，改嫁给燕柱，燕柱身亡后得重病，后来被韩立治愈。", faction: "惊蛟会", realm: "凡人", status: "存活" },
  { id: 34, name: "金氏", description: "墨大夫大夫人，墨玉珠之母，遇害身亡。", faction: "惊蛟会", realm: "凡人", status: "死亡" },
  { id: 35, name: "李氏", description: "墨大夫二夫人，知书达理，某大户人家之女。", faction: "惊蛟会", realm: "凡人", status: "存活" },
  { id: 36, name: "刘氏", description: "墨大夫三夫人，泼辣，擅媚术，颇有野心。", faction: "惊蛟会", realm: "凡人", status: "存活" },
  { id: 37, name: "王氏", description: "墨大夫五夫人，墨大夫的心腹，操控惊蛟会暗舵，实权派。", faction: "惊蛟会", realm: "凡人", status: "存活" },
  { id: 38, name: "墨玉珠", description: "墨大夫大女儿，好习武，为墨家和吴剑鸣虚与委蛇，后来嫁给了五色门门主之子，生女李缨宁。", faction: "惊蛟会", realm: "凡人", status: "存活" },
  { id: 39, name: "墨凤舞", description: "墨大夫二女儿，义女，擅医术，曾向韩立讨教医术，后来流落到李化元的师侄秦言府内，成了表小姐。", faction: "惊蛟会", realm: "凡人", status: "存活" },
  { id: 40, name: "墨彩环", description: "墨大夫三女儿，天真烂漫，初次见面就向韩立讨礼物，后来流落到燕翎堡，韩立帮她杀死一个骚扰者。钟情韩立，落花有意，流水无情。", faction: "惊蛟会", realm: "凡人", status: "存活" },
  { id: 41, name: "燕歌", description: "墨大夫大弟子，痴恋墨玉珠，被拒绝。", faction: "惊蛟会", realm: "凡人", status: "存活" },
  { id: 42, name: "赵坤", description: "墨大夫二弟子，欧阳飞天策反其叛变，被严氏杀死。", faction: "惊蛟会", realm: "凡人", status: "死亡" },
  { id: 43, name: "马空天", description: "墨大夫义弟，欧阳飞天策反其叛变，被严氏杀死。", faction: "惊蛟会", realm: "凡人", status: "死亡" },
  { id: 44, name: "苟天破", description: "四平帮前任帮主，被沈重山杀死篡位。", faction: "四平帮", realm: "凡人", status: "死亡" },
  { id: 45, name: "沈重山", description: "四平帮帮主，被韩立毒死，扶植孙二狗篡夺帮主之位。", faction: "四平帮", realm: "凡人", status: "死亡" },
  { id: 46, name: "小金芝", description: "潇.湘院头牌，沈重山的姘头，被毒死。", faction: "其他", realm: "凡人", status: "死亡" },
  { id: 47, name: "狂拳钱进", description: "四平帮三大护法之一，被韩立毒死。", faction: "四平帮", realm: "凡人", status: "死亡" },
  { id: 48, name: "毒秀才范沮", description: "四平帮三大护法之一，被韩立毒死。", faction: "四平帮", realm: "凡人", status: "死亡" },
  { id: 49, name: "飞刀沈三", description: "四平帮三大护法之一，被韩立毒死。", faction: "四平帮", realm: "凡人", status: "死亡" },
  { id: 50, name: "席铁牛", description: "四平帮小头目，向韩立报告了升仙大会消息，被韩立扶植为副帮主。", faction: "四平帮", realm: "凡人", status: "存活" },
  { id: 51, name: "黑熊", description: "铁拳会小头目，孙二狗的对头，和孙二狗一起打劫韩立时被韩立杀死。", faction: "铁拳会", realm: "凡人", status: "死亡" },
  { id: 52, name: "欧阳飞天", description: "独霸山庄主，修炼硬功霸王甲，被韩立剑符所杀。", faction: "独霸山", realm: "凡人", status: "死亡" },
  { id: 53, name: "吴剑鸣", description: "欧阳飞天七弟子，自称墨大夫将墨玉珠许配给其为妻，混入墨家做奸细。", faction: "独霸山", realm: "凡人", status: "存活" },
  { id: 54, name: "万小山", description: "枯崖山万家子弟，独自参加太南小会，路遇韩立，给韩立讲解了很多修仙者常识。", faction: "万家", realm: "炼气期", status: "存活" },
  { id: 55, name: "叶豹", description: "参加太南小会的秦叶岭低阶弟子，交易中和人发生争执。", faction: "秦叶岭", realm: "炼气期", status: "存活" },
  { id: 56, name: "青颜真人", description: "主办太南小会的修仙者之一，枯崖山万家的世交。", faction: "万家", realm: "筑基期", status: "存活" },
  { id: 57, name: "青溪真人", description: "越国某位喜欢游历的修士，将自己的见闻记录在《青溪笔录》中。", faction: "散修", realm: "筑基期", status: "存活" },
  { id: 58, name: "青纹", description: "卧牛山青牛观散修，小团体发起人，表面对人和蔼公正，道貌岸然地维护小团体利益，背后却密谋杀人夺宝，后来投靠越皇，成为四大血侍之一，四处抓取低阶修士血祭，后来被刘靖的真宝所杀。", faction: "散修", realm: "炼气期", status: "死亡" },
  { id: 59, name: "吴九指", description: "云门涧的散修，喜欢偷东西，后来跟随青纹参加黑煞教。", faction: "散修", realm: "炼气期", status: "死亡" },
  { id: 60, name: "黄孝天", description: "石拓谷的散修，胖子，嗜睡。", faction: "散修", realm: "炼气期", status: "存活" },
  { id: 61, name: "红莲散人", description: "飞莲洞的散修，少女。", faction: "散修", realm: "炼气期", status: "存活" },
  { id: 62, name: "苦桑大师", description: "菩露山的散修，比女人还婆婆妈妈的和尚，给韩立指点过炼符之道。", faction: "散修", realm: "炼气期", status: "存活" },
  { id: 63, name: "黑木", description: "苍狼岭的双胞胎散修之一。", faction: "散修", realm: "炼气期", status: "存活" },
  { id: 64, name: "黑金", description: "苍狼岭的双胞胎散修之一。", faction: "散修", realm: "炼气期", status: "存活" },
  { id: 65, name: "胡萍姑", description: "天水寨散修伴侣之一。", faction: "散修", realm: "炼气期", status: "存活" },
  { id: 66, name: "熊大力", description: "天水寨散修伴侣之一。", faction: "散修", realm: "炼气期", status: "存活" },
  { id: 67, name: "钟灵道", description: "黄枫谷掌门，接待韩立入门，韩立筑基后安排韩立开设洞府。", faction: "黄枫谷", realm: "结丹期", status: "存活" },
  { id: 68, name: "吴风", description: "黄枫谷传功阁传功弟子，法术造诣在炼气期弟子中名列前茅，韩立向他请教了很多修炼问题。", faction: "黄枫谷", realm: "炼气期", status: "存活" },
  { id: 69, name: "马师兄", description: "黄枫谷百药园园主，筑基期修士，痴迷炼丹，对韩立管理药园很满意，给韩立介绍了青元剑诀的来历等，后来韩立介绍萧翠儿入黄枫谷，拜入其门下。", faction: "黄枫谷", realm: "筑基期", status: "存活" },
  { id: 70, name: "许老", description: "黄枫谷岳麓殿管事，贪财，卖给韩立丹方、丹炉等。", faction: "黄枫谷", realm: "筑基期", status: "存活" },
  { id: 71, name: "陆师兄", description: "黄枫谷炼气期弟子，风灵根，外表狂傲，内心阴沉，为了和董萱儿双修，暗算女伴陈巧倩，奸杀未遂，被路过的韩立灭杀，韩立夺得其二颗筑基丹。", faction: "黄枫谷", realm: "炼气期", status: "死亡" },
  { id: 72, name: "叶姓老者", description: "黄枫谷管事，筑基期修士，向韩立买了筑基丹，给韩立提供百药园的杂务工作。", faction: "黄枫谷", realm: "筑基期", status: "存活" },
  { id: 73, name: "慕容大哥", description: "黄枫谷雷灵根同胞兄弟之一，和韩立同期入谷，是黄枫谷核心弟子，魔道入侵时随宗门迁往九国盟，多年后结丹成功，被派往黄龙山守阵，寡不敌众，但成功逃脱。", faction: "黄枫谷", realm: "结丹期", status: "存活" },
  { id: 74, name: "慕容二哥", description: "黄枫谷雷灵根同胞兄弟之一，和韩立同期入谷，是黄枫谷核心弟子，魔道入侵时随宗门迁往九国盟，多年后结丹成功，被派往黄龙山守阵，寡不敌众，但成功逃脱。", faction: "黄枫谷", realm: "结丹期", status: "存活" },
  { id: 75, name: "田卜离", description: "黄枫谷万宝楼的掌柜，韩立从其处购得天雷子等物。", faction: "黄枫谷", realm: "筑基期", status: "存活" },
  { id: 76, name: "丁老", description: "黄枫谷万宝楼的管事，田掌柜请其鉴定韩立的灵草。", faction: "黄枫谷", realm: "筑基期", status: "存活" },
  { id: 77, name: "穹老怪", description: "掩月宗结丹后期修士，喜欢捉弄人，自创无形遁术闻名于越国等地，和李化元、浮云子打赌，因为南宫婉混入禁地而获胜。", faction: "掩月宗", realm: "结丹期", status: "存活" },
  { id: 78, name: "浮云子", description: "清虚门结丹修士，法宝青钧剑，带队参加血色试炼，以血线蛟内丹和李化元、穹老怪打赌，输于穹老怪。", faction: "清虚门", realm: "结丹期", status: "存活" },
  { id: 79, name: "马云龙", description: "天阙堡极有希望进入结丹期的筑基后期修士。", faction: "天阙堡", realm: "筑基期", status: "存活" },
  { id: 80, name: "霓裳仙子", description: "血色试炼掩月宗领队少妇。", faction: "掩月宗", realm: "筑基期", status: "存活" },
  { id: 81, name: "多宝女", description: "掩月双娇之一，掩月宗某结丹长老的后人，死于封岳的偷袭。", faction: "掩月宗", realm: "筑基期", status: "死亡" },
  { id: 82, name: "赵师妹", description: "掩月双娇之一，误用小五行符，将南宫婉和韩立困在青石殿中。", faction: "掩月宗", realm: "筑基期", status: "存活" },
  { id: 83, name: "寒天涯", description: "参加血色试炼的化刀坞的人妖，对掩月宗的女修嗤之以鼻。", faction: "化刀坞", realm: "筑基期", status: "存活" },
  { id: 84, name: "萧二", description: "参加血色试炼的化刀坞弟子，被人杀人夺宝。", faction: "化刀坞", realm: "筑基期", status: "死亡" },
  { id: 85, name: "封岳", description: "参加血色试炼的天阙堡弟子，偷袭杀死多宝女，被韩立所杀，韩立夺得其踏云靴。", faction: "天阙堡", realm: "筑基期", status: "死亡" },
  { id: 86, name: "武痴", description: "参加血色试炼的巨剑门弟子，姓言，赤脚汉，被韩立杀死灭口。", faction: "巨剑门", realm: "筑基期", status: "死亡" },
  { id: 87, name: "钟吾", description: "参加血色试炼的灵兽山弟子，丑汉，企图杀韩立，未遂，后来奉命支援边界营地，遇到韩立，在地道中被血玉蜘蛛杀死。", faction: "灵兽山", realm: "筑基期", status: "死亡" },
  { id: 88, name: "辉明", description: "陈巧倩的师傅。", faction: "黄枫谷", realm: "筑基期", status: "存活" },
  { id: 89, name: "陈胖子", description: "陈巧倩的五伯，金鼓原营地内某坊市的掌柜，卖给韩立两张丹方。", faction: "黄枫谷", realm: "筑基期", status: "存活" },
  { id: 90, name: "陈大哥", description: "黄枫谷弟子，陈巧倩的大哥，为筑基丹参加血色试炼，安然回归，可惜在服用筑基丹后还是不能筑基，后来灰心之下去打理家族世俗事务。", faction: "黄枫谷", realm: "炼气期", status: "存活" },
  { id: 91, name: "王子陵", description: "天星宗秘市拉客的风行子。", faction: "天星宗", realm: "炼气期", status: "存活" },
  { id: 92, name: "徐老头", description: "天星宗坊市炼器高手，韩立请其炼制了乌龙夺、神风舟。", faction: "天星宗", realm: "筑基期", status: "存活" },
  { id: 93, name: "金南天", description: "千竹教教主。", faction: "千竹教", realm: "结丹期", status: "存活" },
  { id: 94, name: "黄龙", description: "千竹教护教法王，用蛊毒暗算林少主，一直追杀其到韩立洞府外，攻击韩立洞府时被雷万鹤杀死。", faction: "千竹教", realm: "筑基期", status: "死亡" },
  { id: 95, name: "林少主", description: "千竹教前任教主之子，为逃避追杀躲进黄枫谷，后来联系旧部图谋大衍决后期功法被发现，千竹教派出黄龙等追杀他，被黄龙暗算，逃到韩立洞府，向韩立夺舍，失败被杀，韩立从其身上得到大衍决四层功法和傀儡真经。", faction: "千竹教", realm: "筑基期", status: "死亡" },
  { id: 96, name: "于坤", description: "李化元大弟子，自幼跟随李化元夫妇，很啰嗦，令李化元都感到头痛。", faction: "黄枫谷", realm: "筑基期", status: "存活" },
  { id: 97, name: "李化元二弟子", description: "李化元门下修为仅此于韩立的弟子。", faction: "黄枫谷", realm: "筑基期", status: "存活" },
  { id: 98, name: "刘靖", description: "李化元三弟子，嫉恶如仇，力主消灭黑煞教，以真宝杀死青纹，被越皇所杀。", faction: "黄枫谷", realm: "筑基期", status: "死亡" },
  { id: 99, name: "宋蒙", description: "李化元四弟子，精通法术，喜欢和人斗法，常逼着韩立与其切磋，后来和韩立一起灭掉黑煞教。", faction: "黄枫谷", realm: "筑基期", status: "存活" },
  { id: 100, name: "武炫", description: "李化元六弟子，为董萱儿吃韩立的醋，未参加消灭黑煞教的行动，但还是被黑煞教血祭，吸尽精血而亡。", faction: "黄枫谷", realm: "筑基期", status: "死亡" },
  { id: 101, name: "钟卫娘", description: "李化元七弟子，十六岁筑基，和陈巧倩交好，喜欢刘靖，支持刘靖灭黑煞教，和韩立一起灭掉黑煞教。", faction: "黄枫谷", realm: "筑基期", status: "存活" },
  { id: 102, name: "雷万鹤", description: "李化元的师兄，帮韩立解围，灭杀黄龙等人，以聚灵丹、炼气散的丹方换取韩立的两棵灵药，多年后参加对抗法士大战，和覃大上师恶斗时被韩立所救，此时韩立的元婴修为让其震惊万分。", faction: "黄枫谷", realm: "结丹期", status: "存活" },
  { id: 103, name: "红拂", description: "黄枫谷结丹女修，李化元的师姐，董萱儿的师傅，厌恶美男子，替董萱儿物色了韩立这个相貌普通的弟子双修，请李化元从中撮合，不太顺利，后来派二人去燕家夺宝大会，时值魔道入侵，此事无疾而终。", faction: "黄枫谷", realm: "结丹期", status: "存活" },
  { id: 104, name: "燕铃", description: "坐骑双首鹜，参加过南山小会、升仙大会，迎接韩立等参加燕家举办的夺宝大会。", faction: "燕翎堡", realm: "筑基期", status: "存活" },
  { id: 105, name: "燕雨", description: "燕铃的哥哥，参加过南山小会、升仙大会，在燕翎堡为董萱儿争风吃醋。", faction: "燕翎堡", realm: "筑基期", status: "存活" },
  { id: 106, name: "玄夜", description: "燕家成员。", faction: "燕翎堡", realm: "筑基期", status: "存活" },
  { id: 107, name: "燕文", description: "燕翎堡燕家子弟。", faction: "燕翎堡", realm: "炼气期", status: "存活" },
  { id: 108, name: "燕奇", description: "燕翎堡燕家子弟。", faction: "燕翎堡", realm: "炼气期", status: "存活" },
  { id: 109, name: "燕家老祖", description: "燕家家主，魔道入侵时将燕如嫣嫁给王蝉，率领全族背叛越国七派，投靠鬼灵门。", faction: "燕翎堡", realm: "结丹期", status: "存活" },
  { id: 110, name: "丰师兄", description: "黄枫谷弟子，董萱儿暧昧对象之一，和燕雨争风吃醋，被鬼灵门血祭。", faction: "黄枫谷", realm: "筑基期", status: "死亡" },
  { id: 111, name: "无子", description: "参加燕家夺宝大会的七派弟子，被鬼灵门血祭。", faction: "七派", realm: "筑基期", status: "死亡" },
  { id: 112, name: "无游子", description: "参加燕家夺宝大会的七派弟子，被鬼灵门血祭。", faction: "七派", realm: "筑基期", status: "死亡" },
  { id: 113, name: "巴师兄", description: "参加燕家夺宝大会的七派弟子，被鬼灵门血祭。", faction: "七派", realm: "筑基期", status: "死亡" },
  { id: 114, name: "武师弟", description: "参加燕家夺宝大会的七派弟子，被鬼灵门血祭。", faction: "七派", realm: "筑基期", status: "死亡" },
  { id: 115, name: "方师妹", description: "参加燕家夺宝大会的七派弟子，被鬼灵门血祭。", faction: "七派", realm: "筑基期", status: "死亡" },
  { id: 116, name: "田不缺", description: "合欢宗宗主第二子，艳丽男子，修炼玄月吸阴功，参加燕翎堡夺宝大会，对董萱儿施展迷魂术被韩立识破，王蝉血祭七派弟子时掳走董萱儿，魔道入侵时和董萱儿、王蝉一起追杀南宫婉，被韩立破坏好事。", faction: "合欢宗", realm: "筑基期", status: "存活" },
  { id: 117, name: "余兴", description: "天阙堡筑基修士，奉命驻守灵矿的小头目，魔道大举进攻时，提供了隧道逃生。", faction: "天阙堡", realm: "筑基期", status: "存活" },
  { id: 118, name: "宣乐", description: "掩月宗对外管事之一，征调韩立参加对抗魔道入侵战争，不敌魔道势大，和韩立等人从隧道逃跑，在隧道中为抢夺大挪移令等物灭掉吕天蒙等，后来被韩立灭杀。", faction: "掩月宗", realm: "筑基期", status: "死亡" },
  { id: 119, name: "吕天蒙", description: "灵兽山筑基后期弟子，奉命驻守边界，不敌魔道势大，和韩立等人从隧道逃跑，在隧道内争夺血玉蜘蛛，古传输阵和大挪移令的火拼中，被宣乐灭杀。", faction: "灵兽山", realm: "筑基期", status: "死亡" },
  { id: 120, name: "怜飞花", description: "魔焰门门主的独女，奉命攻击七派灵矿驻地，追杀韩立、宣乐、吕天蒙、钟吾等。", faction: "魔焰门", realm: "筑基期", status: "存活" },
  { id: 121, name: "齐云霄", description: "元武国齐家外系子弟，身材矮粗，精通炼器，为了给辛如音治病，四处寻找灵药，在竞卖会结识韩立，用颠倒五行阵和韩立交换灵草，帮助韩立修复传送阵，后来被付家所杀。", faction: "齐家", realm: "筑基期", status: "死亡" },
  { id: 122, name: "辛如音", description: "齐云霄女伴，龙吟之质，精通阵法之道，帮助韩立修复过古传送阵，赠送韩立《云霄心得》等物，韩立为此承诺帮齐云霄报仇，重回天南后兑现诺言，灭了付家满门，得到小梅后人保管的辛如音遗物：玄牡化婴大法功法和上古大阵典籍。", faction: "齐家", realm: "筑基期", status: "死亡" },
  { id: 123, name: "小梅", description: "辛如音的丫鬟，和其后人一直保管着辛如音遗物，直到韩立兑现了诺言。", faction: "其他", realm: "凡人", status: "存活" },
  { id: 124, name: "秦言", description: "越国大商巨富，李化元的师侄，秦府家主，韩立受李化元之托混入其府监视魔道入侵举动。", faction: "其他", realm: "凡人", status: "存活" },
  { id: 125, name: "秦知", description: "秦言的大儿子。", faction: "其他", realm: "凡人", status: "存活" },
  { id: 126, name: "秦贵", description: "秦府门房。", faction: "其他", realm: "凡人", status: "存活" },
  { id: 127, name: "秦平", description: "秦府下人。", faction: "其他", realm: "凡人", status: "存活" },
  { id: 128, name: "馨王", description: "越国皇室宗亲，越王的兄弟之一，为庆祝爱妃病愈、小王爷可以修仙举办宴会。", faction: "越国皇室", realm: "凡人", status: "存活" },
  { id: 129, name: "青儿", description: "馨王妃，馨王为其康复举办宴会。", faction: "越国皇室", realm: "凡人", status: "存活" },
  { id: 130, name: "童景", description: "越京馨王府上被吴仙师检查出身具灵根的胖青年。", faction: "越国皇室", realm: "炼气期", status: "存活" },
  { id: 131, name: "华神医", description: "越京两大神医之一，听说馨王妃被人治愈，好奇之下去馨王府赴宴。", faction: "其他", realm: "凡人", status: "存活" },
  { id: 132, name: "华南", description: "华神医的孙子。", faction: "其他", realm: "凡人", status: "存活" },
  { id: 133, name: "华芳", description: "华神医的孙女。", faction: "其他", realm: "凡人", status: "存活" },
  { id: 134, name: "蒙山五友老大", description: "黑煞教外围人员，被迫为黑煞教做事，曾和韩立一起对抗血侍。", faction: "散修", realm: "炼气期", status: "存活" },
  { id: 135, name: "蒙山五友老二", description: "黑煞教外围人员，被迫为黑煞教做事，曾和韩立一起对抗血侍。", faction: "散修", realm: "炼气期", status: "存活" },
  { id: 136, name: "蒙山五友老三", description: "黑煞教外围人员，被迫为黑煞教做事，曾和韩立一起对抗血侍。", faction: "散修", realm: "炼气期", status: "存活" },
  { id: 137, name: "蒙山五友老四", description: "黑煞教外围人员，被迫为黑煞教做事，曾和韩立一起对抗血侍。", faction: "散修", realm: "炼气期", status: "存活" },
  { id: 138, name: "蒙山五友五妹", description: "黑煞教外围人员，其中五妹是黑煞教奸细。", faction: "黑煞教", realm: "炼气期", status: "死亡" },
  { id: 139, name: "吴仙师", description: "馨王府的供奉，小王爷的师傅，韩立以丹药换取其自创弄焰决，并让其监视小王爷的举动，被小王爷血祭。", faction: "越国皇室", realm: "炼气期", status: "死亡" },
  { id: 140, name: "萧振", description: "允州封河涧萧家没落散修，闲云酒楼的东主，韩立从其手中换取兽皮书。", faction: "萧家", realm: "炼气期", status: "存活" },
  { id: 141, name: "萧翠儿", description: "萧振的孙女，双灵根。用无名兽皮书向韩立换取进入黄枫谷的机会，韩立将其引荐给马师兄，拜马师兄为师，后来结丹成功，再遇韩立，希望韩立重回黄枫谷，被拒绝。", faction: "黄枫谷", realm: "结丹期", status: "存活" },
  { id: 142, name: "雪虹", description: "陈巧倩的师姐，钟卫娘邀请来消灭黑煞教的帮手之一，被冰妖所杀。", faction: "黄枫谷", realm: "筑基期", status: "死亡" },
  { id: 143, name: "王师兄", description: "钟卫娘邀请来消灭黑煞教的帮手之一，私藏青纹的血凝丹，被黑煞教主所杀。", faction: "黄枫谷", realm: "筑基期", status: "死亡" },
  { id: 144, name: "王总管", description: "黑煞教护法，教主堂兄，被韩立杀死。", faction: "黑煞教", realm: "筑基期", status: "死亡" },
  { id: 145, name: "小王爷", description: "黑煞教教主记名弟子，小名铭儿，修炼黑煞修罗功，将吴仙师血祭，被韩立杀死。", faction: "黑煞教", realm: "炼气期", status: "死亡" },
  { id: 146, name: "越皇", description: "不知如何从极炫骨骸处得到玄阴经残本和虚天残图，修炼血炼神光，利用身外化身创立黑煞教，培养四大血侍，打算用他们的血凝丹结成煞丹，被韩立困在大阵中杀死。虚天残图被韩立所得。", faction: "黑煞教", realm: "结丹期", status: "死亡" },
  { id: 147, name: "黑煞教主", description: "本名李破云，太监，越皇的身外化身，死在韩立天雷子之下。", faction: "黑煞教", realm: "结丹期", status: "死亡" },
  { id: 148, name: "铁罗", description: "四大血侍之一，修炼煞妖决，四处抓取低阶修士血祭，越皇培养他们其实是为了得到他们的血凝五行丹，用来结成煞丹，被韩立及其同门所杀。", faction: "黑煞教", realm: "筑基期", status: "死亡" },
  { id: 149, name: "冰妖", description: "四大血侍之一，修炼煞妖决，四处抓取低阶修士血祭，越皇培养他们其实是为了得到他们的血凝五行丹，用来结成煞丹，被韩立及其同门所杀。", faction: "黑煞教", realm: "筑基期", status: "死亡" },
  { id: 150, name: "叶蛇", description: "四大血侍之一，修炼煞妖决，四处抓取低阶修士血祭，越皇培养他们其实是为了得到他们的血凝五行丹，用来结成煞丹，被韩立及其同门所杀。", faction: "黑煞教", realm: "筑基期", status: "死亡" },
  // 151-180
  {
    id: 151,
    name: "欧阳道友",
    faction: "六连殿",
    realm: "筑基期",
    status: "未知",
    chapter: "第二卷",
    description: "六连殿玉环居掌柜，用降尘丹作报酬邀请韩立主持阵法击杀婴鲤兽。"
  },
  {
    id: 152,
    name: "古长老",
    faction: "六连殿",
    realm: "结丹期",
    status: "死亡",
    chapter: "第二卷",
    description: "六连殿长老，魔道奸细，乌丑强抢婴鲤兽，被迫暴露身份，追杀韩立反被杀死，韩立夺得其混元钵和降尘丹。"
  },
  {
    id: 153,
    name: "苗长老",
    faction: "六连殿",
    realm: "结丹期",
    status: "未知",
    chapter: "第二卷",
    description: "六连殿长老，魔道奸细，和乌丑接头暴露身份，杀了一干捕杀妖兽的筑基修士，后来去虚天殿探宝。"
  },
  {
    id: 154,
    name: "冯三娘",
    faction: "六连殿",
    realm: "筑基期",
    status: "死亡",
    chapter: "第二卷",
    description: "六连殿阵法师，精通阵法，负责组织韩立等人主持六旬水波阵法，无意中撞破苗、古长老的身份，被苗长老和乌丑灭口。"
  },
  {
    id: 155,
    name: "鲁二",
    faction: "其他",
    realm: "凡人",
    status: "存活",
    chapter: "第二卷",
    description: "天星城向导，给韩立介绍了天星城的情况。"
  },
  {
    id: 156,
    name: "莲儿",
    faction: "妙音门",
    realm: "凡人",
    status: "存活",
    chapter: "第二卷",
    description: "范夫人的婢女。"
  },
  {
    id: 157,
    name: "卓如婷",
    faction: "妙音门",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "妙音门右使，曾和范夫人争夺妙音门门主之位，落入极阴圈套和隐煞门火并，侥幸逃脱。"
  },
  {
    id: 158,
    name: "韵琴",
    faction: "妙音门",
    realm: "筑基期",
    status: "未知",
    chapter: "第二卷",
    description: "妙音门女修，云天啸的亲信，负责监视范夫人举动。"
  },
  {
    id: 159,
    name: "赵长老",
    faction: "妙音门",
    realm: "结丹期",
    status: "死亡",
    chapter: "第二卷",
    description: "妙音门结丹长老，受极阴胁迫背叛妙音门，倒戈对付紫灵等。"
  },
  {
    id: 160,
    name: "孟长老",
    faction: "妙音门",
    realm: "结丹期",
    status: "死亡",
    chapter: "第二卷",
    description: "妙音门结丹长老，受极阴胁迫背叛妙音门，倒戈对付紫灵等。"
  },
  {
    id: 161,
    name: "云天啸",
    faction: "妙音门",
    realm: "结丹期",
    status: "死亡",
    chapter: "第二卷",
    description: "魔道结丹修士，妙音门长老，架空了范夫人的权力，范夫人和韩立达成交易，她传送韩立回内星海，韩立则将云天啸及其党羽杀死。"
  },
  {
    id: 162,
    name: "金青",
    faction: "散修",
    realm: "筑基期",
    status: "死亡",
    chapter: "第二卷",
    description: "荒岛探宝组织者之一，韩立在天星城的好友，约韩立去荒岛破阵探宝，被玄骨所杀。"
  },
  {
    id: 163,
    name: "胡月",
    faction: "散修",
    realm: "筑基期",
    status: "死亡",
    chapter: "第二卷",
    description: "荒岛探宝组织者之一，使飞刀法宝，被玄骨所杀。"
  },
  {
    id: 164,
    name: "石蝶仙子",
    faction: "红月岛",
    realm: "筑基期",
    status: "死亡",
    chapter: "第二卷",
    description: "荒岛探宝成员之一，红月岛岛主之女，精通阵法理论，和韩立合作共同破阵，后被玄骨所杀。"
  },
  {
    id: 165,
    name: "简姓修士",
    faction: "散修",
    realm: "筑基期",
    status: "死亡",
    chapter: "第二卷",
    description: "荒岛探宝成员之一，采摘妖冠蛇伪装的假七霞莲被毒死。"
  },
  {
    id: 166,
    name: "荒岛怪人",
    faction: "极阴岛",
    realm: "筑基期",
    status: "死亡",
    chapter: "第二卷",
    description: "极阴祖师手下，负责看守玄骨，私自外出寻得花篮古宝，回岛发现韩立等人破阵，以古宝为依仗，狂妄挑衅，结果被韩立所杀，韩立得其花篮古宝。"
  },
  {
    id: 167,
    name: "孙门主",
    faction: "隐煞门",
    realm: "结丹期",
    status: "死亡",
    chapter: "第二卷",
    description: "极阴祖师弟子，对极阴不满，窃取虚天残图叛逃极阴岛，自任通天雾海隐煞门门主，后落入极阴和赤火所设圈套，被擒。"
  },
  {
    id: 168,
    name: "赤火老怪",
    faction: "元龟岛",
    realm: "元婴期",
    status: "未知",
    chapter: "第二卷",
    description: "元龟岛岛主，修炼葵水魔功，紫灵邀请其为母报仇，不料其和极阴祖师勾结，设计使妙音门和隐煞门火并，假意和孙门主联手对付极阴，关键时刻突然倒戈，最后协助极阴捕获孙门主。"
  },
  {
    id: 169,
    name: "葛笠",
    faction: "天台岛",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "天台岛修士，半途而废的探宝者，鬼冤之地走了一半就放弃了探宝。"
  },
  {
    id: 170,
    name: "卜绪",
    faction: "散修",
    realm: "结丹期",
    status: "死亡",
    chapter: "第二卷",
    description: "结丹散修，修炼泰阳决，在熔岩路中触动禁制，被银色闪电劈死。"
  },
  {
    id: 171,
    name: "玉真人",
    faction: "散修",
    realm: "结丹期",
    status: "死亡",
    chapter: "第二卷",
    description: "冰灵根结丹期修士，身穿百年冰蚕丝炼制的辟火宝衣，在鬼冤之地被众鬼吞噬。"
  },
  {
    id: 172,
    name: "鬼冤鬼修",
    faction: "鬼修",
    realm: "结丹期",
    status: "死亡",
    chapter: "第二卷",
    description: "玄骨旧识，当年葬身鬼雾中，改修鬼道，和玄骨密谋夺取韩立肉身，被韩立识破灭杀。"
  },
  {
    id: 173,
    name: "天缘子",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "乱星海正道元婴修士，天悟子同门师兄。"
  },
  {
    id: 174,
    name: "天悟子",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "乱星海正道元婴修士，鹤发童颜，面目红润的老道，参与争夺虚天鼎、补天丹，发现虚天鼎被人卷跑和众元婴达成协议。"
  },
  {
    id: 175,
    name: "温夫人",
    faction: "六道极圣",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "六道极圣夫人，元婴修士，在白壁山修炼，主修鸾凤剑诀，对众元婴修士很冷漠，在外殿采药，未进内殿。"
  },
  {
    id: 176,
    name: "青易居士",
    faction: "南鹤岛",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "南鹤岛元婴散修，黄袍白眉，脸庞清瘦的老年儒生，法宝青冥针，在虚天殿尾随极阴祖师，撞破韩立拥有血玉蜘蛛一事，和极阴达成协议，共同取鼎，将青冥针符宝送给韩立防身，后来星宫长老捣乱，取鼎无望，加入混战争夺补天丹，发现虚天鼎被人卷跑和众元婴达成协议。"
  },
  {
    id: 177,
    name: "黑瘦老者",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "乱星海正道元婴修士，老农打扮，满脸苦色，修炼玉丹功，参与争夺虚天鼎、补天丹，发现虚天鼎被人卷跑和众元婴达成协议。"
  },
  {
    id: 178,
    name: "雪笛仙子",
    faction: "三仙宗",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "三仙宗女修，紫灵好友。"
  },
  {
    id: 179,
    name: "辛明",
    faction: "开天门",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "开天门弟子，佩戴白水剑。"
  },
  {
    id: 180,
    name: "苍云龙",
    faction: "逆星盟",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "逆星盟护法，修炼七煞决，六道极圣手下，领队盘查南明岛上修士，发现韩立身上煞气惊人，令其羡慕万分。为讨好六道传人，投其所好逼迫紫灵。"
  },
  // 181-210
  {
    id: 181,
    name: "凌玉灵",
    faction: "星宫",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "天星双圣之女，星宫圣女，结丹期修士，容貌绝美，性格高傲，修炼星辰诀，和韩立在虚天殿相遇，对韩立颇有好感。"
  },
  {
    id: 182,
    name: "赵护法",
    faction: "星宫",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "星宫结丹修士，负责虚天殿事务。"
  },
  {
    id: 183,
    name: "于护法",
    faction: "星宫",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "星宫结丹修士，负责虚天殿事务。"
  },
  {
    id: 184,
    name: "乾姓修士",
    faction: "星宫",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "星宫传送阵管事，负责传送阵运行。"
  },
  {
    id: 185,
    name: "顾姓修士",
    faction: "星宫",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "星宫传送阵管事，负责传送阵运行。"
  },
  {
    id: 186,
    name: "刘夫人",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "偷渡团队成员，和韩立一起偷渡到外星海。"
  },
  {
    id: 187,
    name: "易敬",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "偷渡团队成员，和韩立一起偷渡到外星海。"
  },
  {
    id: 188,
    name: "张道友",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "偷渡团队成员，和韩立一起偷渡到外星海。"
  },
  {
    id: 189,
    name: "明夫人",
    faction: "明珠轩",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "黑石城明珠轩管事，负责店铺经营。"
  },
  {
    id: 190,
    name: "郝远天",
    faction: "散修",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "黑石城结丹散修，在明珠轩购买物品。"
  },
  {
    id: 191,
    name: "许云",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "疤脸修士，在黑石城活动。"
  },
  {
    id: 192,
    name: "古玉",
    faction: "寸金阁",
    realm: "练气期",
    status: "存活",
    chapter: "第二卷",
    description: "黑石城寸金阁执事弟子，负责接待客人。"
  },
  {
    id: 193,
    name: "离寻",
    faction: "寸金阁",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "黑石城寸金阁管事，负责店铺管理。"
  },
  {
    id: 194,
    name: "金霞",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "外星海修士，在黑石城活动。"
  },
  {
    id: 195,
    name: "霍氏兄弟",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "外星海修士兄弟，在黑石城活动。"
  },
  {
    id: 196,
    name: "四法上人",
    faction: "散修",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "外星海结丹修士，在黑石城活动。"
  },
  {
    id: 197,
    name: "秋姓修士",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "外星海修士，在黑石城活动。"
  },
  {
    id: 198,
    name: "闵姓修士",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "外星海修士，在黑石城活动。"
  },
  {
    id: 199,
    name: "宣姓修士",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "外星海修士，在黑石城活动。"
  },
  {
    id: 200,
    name: "孙师叔",
    faction: "青灵门",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "青灵门结丹修士，公孙杏的师叔。"
  },
  {
    id: 201,
    name: "公孙杏",
    faction: "青灵门",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "青灵门女修，容貌秀丽，和韩立在外星海相遇。"
  },
  {
    id: 202,
    name: "青夫人",
    faction: "散修",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "外星海结丹女修，在拍卖会上竞拍物品。"
  },
  {
    id: 203,
    name: "黄明礼",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "外星海修士，在拍卖会上活动。"
  },
  {
    id: 204,
    name: "孙姓修士",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "外星海修士，在拍卖会上活动。"
  },
  {
    id: 205,
    name: "璇玑",
    faction: "万法门",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "万法门长老，元婴修士，在外星海活动。"
  },
  {
    id: 206,
    name: "妙鹤真人",
    faction: "碧云门",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "奇渊岛碧云门门主，结丹修士。"
  },
  {
    id: 207,
    name: "武姓妖修",
    faction: "妖修",
    realm: "八级妖兽",
    status: "存活",
    chapter: "第二卷",
    description: "八级毒蛟，化形妖修，在外星海活动。"
  },
  {
    id: 208,
    name: "归姓妖修",
    faction: "妖修",
    realm: "八级妖兽",
    status: "存活",
    chapter: "第二卷",
    description: "八级巨龟，化形妖修，在外星海活动。"
  },
  {
    id: 209,
    name: "恶汉",
    faction: "散修",
    realm: "筑基期",
    status: "死亡",
    chapter: "第二卷",
    description: "追捕元瑶的恶汉，被韩立所杀。"
  },
  {
    id: 210,
    name: "柯宇",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "外星海修士，在某次事件中出现。"
  },
  // 211-240
  {
    id: 211,
    name: "骷髅头",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "外星海修士，在某次事件中出现。"
  },
  {
    id: 212,
    name: "丁姓老者",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "外星海修士，在某次事件中出现。"
  },
  {
    id: 213,
    name: "三阳上人",
    faction: "散修",
    realm: "元婴中期",
    status: "存活",
    chapter: "第二卷",
    description: "乱星海元婴中期修士，实力强大。"
  },
  {
    id: 214,
    name: "步颠空",
    faction: "泰阳宗",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "泰阳宗宗主，元婴修士。"
  },
  {
    id: 215,
    name: "符道友",
    faction: "散修",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "追求梅凝的修士，结丹期。"
  },
  {
    id: 216,
    name: "慧灵",
    faction: "泰阳宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "泰阳宗女修，容貌秀丽。"
  },
  {
    id: 217,
    name: "昭樵",
    faction: "泰阳宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "泰阳宗修士，在宗门内活动。"
  },
  {
    id: 218,
    name: "梅凝的哥哥",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "梅凝的兄长，筑基期修士。"
  },
  {
    id: 219,
    name: "万三姑",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "乱星海女修，在某次事件中出现。"
  },
  {
    id: 220,
    name: "六道极圣",
    faction: "逆星盟",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "逆星盟盟主，元婴修士，实力强大，魔道巨擘。"
  },
  {
    id: 221,
    name: "凌啸风",
    faction: "星宫",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "天星双圣之一，星宫太上长老，凌玉灵之父。"
  },
  {
    id: 222,
    name: "温青",
    faction: "星宫",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "天星双圣之一，星宫太上长老，凌玉灵之母。"
  },
  {
    id: 223,
    name: "天镜散人",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "乱星海元婴散修，实力强大。"
  },
  {
    id: 224,
    name: "阿虎",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "阴冥之地修士，在地下活动。"
  },
  {
    id: 225,
    name: "范力",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "阴冥之地修士，在地下活动。"
  },
  {
    id: 226,
    name: "辛石",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "阴冥之地修士，在地下活动。"
  },
  {
    id: 227,
    name: "封天极",
    faction: "散修",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "阴冥之地结丹修士，实力不俗。"
  },
  {
    id: 228,
    name: "大长老",
    faction: "落云宗",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗大长老，元婴修士。"
  },
  {
    id: 229,
    name: "抱还子",
    faction: "散修",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "阴冥之地结丹修士，道号抱还子。"
  },
  {
    id: 230,
    name: "金道友",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "阴冥之地修士，在地下活动。"
  },
  {
    id: 231,
    name: "云掌门",
    faction: "落云宗",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗掌门，元婴修士。"
  },
  {
    id: 232,
    name: "魏一鸣",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 233,
    name: "俞君",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 234,
    name: "秋师兄",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 235,
    name: "言师兄",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 236,
    name: "苗师兄",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 237,
    name: "奎焕",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 238,
    name: "王师兄",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 239,
    name: "马师兄",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 240,
    name: "袭师兄",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  // 241-270
  {
    id: 241,
    name: "辛姓修士",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 242,
    name: "宇山安",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 243,
    name: "段姓修士",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 244,
    name: "黎姓修士",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 245,
    name: "询通",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 246,
    name: "冯姓修士",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 247,
    name: "卫姓修士",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 248,
    name: "孙火",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗弟子，筑基期修士。"
  },
  {
    id: 249,
    name: "柳眉",
    faction: "落云宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "落云宗女弟子，筑基期修士。"
  },
  {
    id: 250,
    name: "烈火",
    faction: "百巧院",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "百巧院弟子，筑基期修士。"
  },
  {
    id: 251,
    name: "冯姓修士",
    faction: "百巧院",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "百巧院弟子，筑基期修士。"
  },
  {
    id: 252,
    name: "丁姓修士",
    faction: "百巧院",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "百巧院弟子，筑基期修士。"
  },
  {
    id: 253,
    name: "付姓老者",
    faction: "百巧院",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "百巧院长老，结丹期修士。"
  },
  {
    id: 254,
    name: "昌正",
    faction: "百巧院",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "百巧院弟子，筑基期修士。"
  },
  {
    id: 255,
    name: "杜晦",
    faction: "百巧院",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "百巧院弟子，筑基期修士。"
  },
  {
    id: 256,
    name: "钺姓修士",
    faction: "百巧院",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "百巧院弟子，筑基期修士。"
  },
  {
    id: 257,
    name: "金武环",
    faction: "古剑门",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "古剑门长老，结丹期修士，擅长剑术。"
  },
  {
    id: 258,
    name: "明馨",
    faction: "古剑门",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "古剑门女弟子，筑基期修士。"
  },
  {
    id: 259,
    name: "火龙童子",
    faction: "古剑门",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "古剑门弟子，筑基期修士，擅长火系法术。"
  },
  {
    id: 260,
    name: "白璧双剑",
    faction: "古剑门",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "古剑门弟子，筑基期修士，使用双剑。"
  },
  {
    id: 261,
    name: "孟笛",
    faction: "古剑门",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "古剑门弟子，筑基期修士。"
  },
  {
    id: 262,
    name: "姚锋",
    faction: "古剑门",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "古剑门弟子，筑基期修士。"
  },
  {
    id: 263,
    name: "姜云",
    faction: "古剑门",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "古剑门弟子，筑基期修士。"
  },
  {
    id: 264,
    name: "尤姓修士",
    faction: "溪国",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "溪国修士，筑基期。"
  },
  {
    id: 265,
    name: "陈姓修士",
    faction: "溪国",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "溪国修士，筑基期。"
  },
  {
    id: 266,
    name: "尸魈",
    faction: "魔道",
    realm: "结丹期",
    status: "死亡",
    chapter: "第二卷",
    description: "炼尸，实力相当于结丹期修士，被韩立等人击杀。"
  },
  {
    id: 267,
    name: "天绝魔尸",
    faction: "魔道",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "强大的魔尸，实力相当于元婴期修士。"
  },
  {
    id: 268,
    name: "焚老怪",
    faction: "千幻宗",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "千幻宗长老，元婴期修士，擅长幻术。"
  },
  {
    id: 269,
    name: "金镜书生",
    faction: "浩然阁",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "浩然阁修士，结丹期，儒雅书生形象。"
  },
  {
    id: 270,
    name: "天煞真君",
    faction: "天煞宗",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "天煞宗宗主，元婴期修士，魔道强者。"
  },
  // 271-300
  {
    id: 271,
    name: "杜东",
    faction: "千幻宗",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "魔道千幻宗修士，结丹期。"
  },
  {
    id: 272,
    name: "阿二",
    faction: "其他",
    realm: "凡人",
    status: "存活",
    chapter: "第二卷",
    description: "泰和城永曲客栈的店小二。"
  },
  {
    id: 273,
    name: "彭易双凶",
    faction: "散修",
    realm: "筑基期",
    status: "死亡",
    chapter: "第二卷",
    description: "元武国筑基期散修，作恶多端，被韩立所杀。"
  },
  {
    id: 274,
    name: "付天化",
    faction: "付家",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "元武国付家老祖，元婴期修士。"
  },
  {
    id: 275,
    name: "孙护法",
    faction: "付家",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "付家护法，结丹期修士。"
  },
  {
    id: 276,
    name: "莫护法",
    faction: "付家",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "付家护法，结丹期修士。"
  },
  {
    id: 277,
    name: "付家双艳",
    faction: "付家",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "付家两位美貌女修，筑基期。"
  },
  {
    id: 278,
    name: "付天云",
    faction: "付家",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "付家子弟，筑基期修士。"
  },
  {
    id: 279,
    name: "东门图",
    faction: "御灵宗",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "御灵宗修士，结丹期，擅长御灵之术。"
  },
  {
    id: 280,
    name: "五行灵婴",
    faction: "御灵宗",
    realm: "灵婴",
    status: "存活",
    chapter: "第二卷",
    description: "御灵宗培养的五行灵婴，具有特殊能力。"
  },
  {
    id: 281,
    name: "邝姓修士",
    faction: "御灵宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "御灵宗弟子，筑基期修士。"
  },
  {
    id: 282,
    name: "碎魂真人",
    faction: "鬼灵门",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "鬼灵门门主，元婴期修士，擅长鬼道法术。"
  },
  {
    id: 283,
    name: "钟长老",
    faction: "鬼灵门",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "鬼灵门长老，结丹期修士。"
  },
  {
    id: 284,
    name: "询姓修士",
    faction: "鬼灵门",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "碎魂真人门人，筑基期修士。"
  },
  {
    id: 285,
    name: "阙姓修士",
    faction: "鬼灵门",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "碎魂真人门人，筑基期修士。"
  },
  {
    id: 286,
    name: "五弟子",
    faction: "鬼灵门",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "碎魂真人五弟子，筑基期修士。"
  },
  {
    id: 287,
    name: "于洪",
    faction: "鬼灵门",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "碎魂真人六弟子，筑基期修士。"
  },
  {
    id: 288,
    name: "云姓老者",
    faction: "鬼灵门",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "鬼灵门长老，结丹期修士。"
  },
  {
    id: 289,
    name: "邰夫人",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "参加南陇侯组织的探宝团成员，筑基期修士。"
  },
  {
    id: 290,
    name: "尤姓修士",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "参加南陇侯组织的探宝团成员，筑基期修士。"
  },
  {
    id: 291,
    name: "黑脸汉子",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "参加南陇侯组织的探宝团成员，筑基期修士。"
  },
  {
    id: 292,
    name: "玄黄老人",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "元婴期散修，实力强大。"
  },
  {
    id: 293,
    name: "苍坤上人",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "元婴期散修，实力强大。"
  },
  {
    id: 294,
    name: "木离上人",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第二卷",
    description: "元婴期散修，实力强大。"
  },
  {
    id: 295,
    name: "石齐云",
    faction: "巨剑门",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "巨剑门修士，结丹期，擅长剑术。"
  },
  {
    id: 296,
    name: "唐明骅",
    faction: "掩月宗",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "掩月宗修士，结丹期。"
  },
  {
    id: 297,
    name: "袁坤",
    faction: "掩月宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "掩月宗弟子，筑基期修士。"
  },
  {
    id: 298,
    name: "玉儿",
    faction: "掩月宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "掩月宗女弟子，筑基期修士。"
  },
  {
    id: 299,
    name: "蓝姓修士",
    faction: "掩月宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "掩月宗弟子，筑基期修士。"
  },
  {
    id: 300,
    name: "钱环",
    faction: "天阙堡",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "天阙堡修士，筑基期。"
  },
  // 301-330
  {
    id: 301,
    name: "肥姹双魔",
    faction: "合欢宗",
    realm: "结丹期",
    status: "存活",
    chapter: "第二卷",
    description: "合欢宗双修魔头，结丹期修士。"
  },
  {
    id: 302,
    name: "武斐",
    faction: "阗天城",
    realm: "筑基期",
    status: "存活",
    chapter: "第二卷",
    description: "阗天城执法使，筑基期修士。"
  },
  {
    id: 303,
    name: "吾鹏",
    faction: "贝叶宗",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "贝叶宗宗主，元婴期修士。"
  },
  {
    id: 304,
    name: "戚夫人",
    faction: "化意门",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "化意门元婴长老，元婴期修士。"
  },
  {
    id: 305,
    name: "魏离辰",
    faction: "化意门",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "化意门元婴长老，元婴期修士。"
  },
  {
    id: 306,
    name: "李缨宁",
    faction: "黄龙山",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "黄龙山驻守修士，结丹期。"
  },
  {
    id: 307,
    name: "谷双蒲",
    faction: "黄龙山",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "黄龙山驻守修士，结丹期。"
  },
  {
    id: 308,
    name: "陆姓大汉",
    faction: "九国盟",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "九国盟元婴修士，实力强大。"
  },
  {
    id: 309,
    name: "马姓老者",
    faction: "浩然阁",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "正道盟浩然阁元婴长老，元婴期修士。"
  },
  {
    id: 310,
    name: "徐长景",
    faction: "水影宗",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "天道盟水影宗长老，元婴期修士。"
  },
  {
    id: 311,
    name: "云露真人",
    faction: "合欢宗",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "合欢宗长老，元婴期修士。"
  },
  {
    id: 312,
    name: "白姓女修",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "散修，元婴期修士。"
  },
  {
    id: 313,
    name: "天恨老怪",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "散修，元婴期修士，性格古怪。"
  },
  {
    id: 314,
    name: "太真七修",
    faction: "太真门",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "正道太真门七位元婴修士。"
  },
  {
    id: 315,
    name: "阴阳双魔",
    faction: "合欢宗",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "合欢宗双修魔头，元婴期修士。"
  },
  {
    id: 316,
    name: "陈巧天",
    faction: "黄枫谷",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "黄枫谷结丹修士，结丹期。"
  },
  {
    id: 317,
    name: "云氏兄弟",
    faction: "御灵宗",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "御灵宗结丹修士兄弟，结丹期。"
  },
  {
    id: 318,
    name: "白书君",
    faction: "天极门",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "正道盟天极门修士，结丹期。"
  },
  {
    id: 319,
    name: "鲁师妹",
    faction: "天极门",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "正道盟天极门女修，筑基期。"
  },
  {
    id: 320,
    name: "黄天冥",
    faction: "小宗门",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "正道盟小宗门修士，筑基期。"
  },
  {
    id: 321,
    name: "黄元明",
    faction: "灵磷山",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "东裕国宁州灵磷山修士，筑基期。"
  },
  {
    id: 322,
    name: "天晶真人",
    faction: "九国盟",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "九国盟元婴修士，实力强大。"
  },
  {
    id: 323,
    name: "狮鼻老者",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "散修，元婴期修士。"
  },
  {
    id: 324,
    name: "欧姓修士",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "散修，筑基期修士。"
  },
  {
    id: 325,
    name: "穆上师",
    faction: "慕兰族",
    realm: "大上师",
    status: "存活",
    chapter: "第三卷",
    description: "慕兰大上师，实力强大。"
  },
  {
    id: 326,
    name: "覃上师",
    faction: "慕兰族",
    realm: "上师",
    status: "存活",
    chapter: "第三卷",
    description: "慕兰上师，修炼慕兰族法术。"
  },
  {
    id: 327,
    name: "温上师",
    faction: "慕兰族",
    realm: "上师",
    status: "存活",
    chapter: "第三卷",
    description: "慕兰上师，修炼慕兰族法术。"
  },
  {
    id: 328,
    name: "窟耀",
    faction: "慕兰族",
    realm: "上师",
    status: "存活",
    chapter: "第三卷",
    description: "慕兰上师，修炼慕兰族法术。"
  },
  {
    id: 329,
    name: "奉托",
    faction: "慕兰族",
    realm: "法士",
    status: "存活",
    chapter: "第三卷",
    description: "慕兰法士，修炼慕兰族法术。"
  },
  {
    id: 330,
    name: "田锺",
    faction: "慕兰族",
    realm: "神师",
    status: "存活",
    chapter: "第三卷",
    description: "慕兰四大神师之一，实力强大。"
  },
  // 331-360
  {
    id: 331,
    name: "祝神师",
    faction: "慕兰族",
    realm: "神师",
    status: "存活",
    chapter: "第三卷",
    description: "慕兰四大神师之一，实力强大。"
  },
  {
    id: 332,
    name: "毕神师",
    faction: "慕兰族",
    realm: "神师",
    status: "存活",
    chapter: "第三卷",
    description: "慕兰四大神师之一，实力强大。"
  },
  {
    id: 333,
    name: "仲神师",
    faction: "慕兰族",
    realm: "神师",
    status: "存活",
    chapter: "第三卷",
    description: "慕兰四大神师之一，实力强大。"
  },
  {
    id: 334,
    name: "英鹭",
    faction: "突兀人",
    realm: "族长",
    status: "存活",
    chapter: "第三卷",
    description: "突兀苍鹭部族长，实力强大。"
  },
  {
    id: 335,
    name: "英珊",
    faction: "突兀人",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "突兀少女，英鹭之女，筑基期修士。"
  },
  {
    id: 336,
    name: "土猛",
    faction: "突兀人",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "突兀青年，筑基期修士。"
  },
  {
    id: 337,
    name: "跋姓大汉",
    faction: "突兀人",
    realm: "族长",
    status: "存活",
    chapter: "第三卷",
    description: "红狼部族长，实力强大。"
  },
  {
    id: 338,
    name: "秀仙师",
    faction: "突兀人",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "突兀结丹女修，结丹期修士。"
  },
  {
    id: 339,
    name: "黎仙师",
    faction: "突兀人",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "突兀结丹修士，结丹期。"
  },
  {
    id: 340,
    name: "桂仙师",
    faction: "突兀人",
    realm: "元婴中期",
    status: "存活",
    chapter: "第三卷",
    description: "突兀元婴中期修士，实力强大。"
  },
  {
    id: 341,
    name: "珲姓修士",
    faction: "突兀人",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "桂仙师的师兄，元婴期修士。"
  },
  {
    id: 342,
    name: "孙仙师",
    faction: "突兀人",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "突兀四大仙师之一，元婴期修士。"
  },
  {
    id: 343,
    name: "呼仙师",
    faction: "突兀人",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "突兀四大仙师之一，元婴期修士。"
  },
  {
    id: 344,
    name: "曹梦容",
    faction: "曹家",
    realm: "凡人",
    status: "存活",
    chapter: "第三卷",
    description: "曹家二小姐，凡人。"
  },
  {
    id: 345,
    name: "高大峰",
    faction: "其他",
    realm: "凡人",
    status: "存活",
    chapter: "第三卷",
    description: "镖师，凡人。"
  },
  {
    id: 346,
    name: "王管家",
    faction: "曹家",
    realm: "凡人",
    status: "存活",
    chapter: "第三卷",
    description: "曹家管家，凡人。"
  },
  {
    id: 347,
    name: "周师爷",
    faction: "曹家",
    realm: "凡人",
    status: "存活",
    chapter: "第三卷",
    description: "曹家师爷，凡人。"
  },
  {
    id: 348,
    name: "何文",
    faction: "曹家",
    realm: "凡人",
    status: "存活",
    chapter: "第三卷",
    description: "曹家西席，凡人。"
  },
  {
    id: 349,
    name: "吴晓雨",
    faction: "犀灵宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "犀灵宗女修，筑基期修士。"
  },
  {
    id: 350,
    name: "马玉林",
    faction: "犀灵宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "犀灵宗修士，筑基期。"
  },
  {
    id: 351,
    name: "王师姐",
    faction: "犀灵宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "犀灵宗女修，筑基期修士。"
  },
  {
    id: 352,
    name: "柱南大将军",
    faction: "大晋",
    realm: "凡人",
    status: "存活",
    chapter: "第三卷",
    description: "大晋柱南大将军，凡人武将。"
  },
  {
    id: 353,
    name: "冯枕",
    faction: "冯家",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "辽州冯家修士，筑基期。"
  },
  {
    id: 354,
    name: "枫岳",
    faction: "冯家",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "辽州冯家修士，筑基期。"
  },
  {
    id: 355,
    name: "冯诠",
    faction: "冯家",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "辽州冯家修士，筑基期。"
  },
  {
    id: 356,
    name: "孔斗",
    faction: "孔家",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "孔家修士，筑基期。"
  },
  {
    id: 357,
    name: "吴老",
    faction: "孔家",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "孔家长老，结丹期修士。"
  },
  {
    id: 358,
    name: "孔家老祖",
    faction: "孔家",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "孔家老祖，元婴期修士。"
  },
  {
    id: 359,
    name: "炫烨王",
    faction: "大晋",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "大晋炫烨王，元婴期修士。"
  },
  {
    id: 360,
    name: "金元",
    faction: "大晋",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "炫烨王手下，筑基期修士。"
  },
  // 361-390
  {
    id: 361,
    name: "戈将军",
    faction: "大晋",
    realm: "凡人",
    status: "存活",
    chapter: "第三卷",
    description: "炫烨王手下将军，凡人武将。"
  },
  {
    id: 362,
    name: "玉华夫人",
    faction: "大晋",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "炫烨王夫人，筑基期修士。"
  },
  {
    id: 363,
    name: "炫烨王化身",
    faction: "大晋",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "炫烨王的化身，元婴期修士。"
  },
  {
    id: 364,
    name: "炫烨王独子",
    faction: "大晋",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "炫烨王的独子，筑基期修士。"
  },
  {
    id: 365,
    name: "殷道友",
    faction: "魔道",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "无洞山魔修，结丹期修士。"
  },
  {
    id: 366,
    name: "天风真君",
    faction: "魔道",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "方尖山二魔之一，元婴期修士。"
  },
  {
    id: 367,
    name: "狂沙上人",
    faction: "魔道",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "方尖山二魔之一，元婴期修士。"
  },
  {
    id: 368,
    name: "魔风七子",
    faction: "魔道",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "魔道七人组合，结丹期修士。"
  },
  {
    id: 369,
    name: "黄尘三煞",
    faction: "魔道",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "魔道三人组合，结丹期修士。"
  },
  {
    id: 370,
    name: "宋大先生",
    faction: "泰阳门",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "泰阳门修士，元婴期。"
  },
  {
    id: 371,
    name: "天石姥姥",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "散修，元婴期修士。"
  },
  {
    id: 372,
    name: "江剑英",
    faction: "九仙宫",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "九仙宫修士，结丹期。"
  },
  {
    id: 373,
    name: "顾统领",
    faction: "九仙宫",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "九仙宫统领，筑基期修士。"
  },
  {
    id: 374,
    name: "北玄老人",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "散修，元婴期修士。"
  },
  {
    id: 375,
    name: "甘池",
    faction: "甘家",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "甘家修士，筑基期。"
  },
  {
    id: 376,
    name: "甘裕",
    faction: "甘家",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "甘家修士，筑基期。"
  },
  {
    id: 377,
    name: "牛天德",
    faction: "黑阳宗",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "黑阳宗修士，结丹期。"
  },
  {
    id: 378,
    name: "严尧",
    faction: "雍华书院",
    realm: "凡人",
    status: "存活",
    chapter: "第三卷",
    description: "雍华书院学者，凡人。"
  },
  {
    id: 379,
    name: "鲁大先生",
    faction: "白露书院",
    realm: "凡人",
    status: "存活",
    chapter: "第三卷",
    description: "白露书院学者，凡人。"
  },
  {
    id: 380,
    name: "孙道友",
    faction: "岳阳宫",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "岳阳宫修士，结丹期。"
  },
  {
    id: 381,
    name: "方杵",
    faction: "岳阳宫",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "岳阳宫修士，筑基期。"
  },
  {
    id: 382,
    name: "马道友",
    faction: "魔木宗",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "魔木宗修士，结丹期。"
  },
  {
    id: 383,
    name: "穆师兄",
    faction: "魔木宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "魔木宗修士，筑基期。"
  },
  {
    id: 384,
    name: "华韵子",
    faction: "天机阁",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "天机阁修士，结丹期。"
  },
  {
    id: 385,
    name: "赵掌柜",
    faction: "天机阁",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "天机阁掌柜，筑基期修士。"
  },
  {
    id: 386,
    name: "王姓修士",
    faction: "天机阁",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "天机阁修士，筑基期。"
  },
  {
    id: 387,
    name: "乌辟",
    faction: "真极门",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "真极门修士，结丹期。"
  },
  {
    id: 388,
    name: "丑陋僧人",
    faction: "佛门",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "佛门僧人，结丹期修士。"
  },
  {
    id: 389,
    name: "肖老儿",
    faction: "散修",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "散修，结丹期修士。"
  },
  {
    id: 390,
    name: "叶老二",
    faction: "其他",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "地下交易会成员，筑基期修士。"
  },
  // 391-420
  {
    id: 391,
    name: "坤无极",
    faction: "其他",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "地下交易会成员，结丹期修士。"
  },
  {
    id: 392,
    name: "恶火头陀",
    faction: "魔道",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "魔道修士，结丹期。"
  },
  {
    id: 393,
    name: "天哭",
    faction: "阴罗宗",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "阴罗宗修士，元婴期。"
  },
  {
    id: 394,
    name: "房宗主",
    faction: "阴罗宗",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "阴罗宗宗主，元婴期修士。"
  },
  {
    id: 395,
    name: "陆夫人",
    faction: "阴罗宗",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "阴罗宗女修，结丹期修士。"
  },
  {
    id: 396,
    name: "黑袍青年",
    faction: "阴罗宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "阴罗宗青年修士，筑基期。"
  },
  {
    id: 397,
    name: "胡师弟",
    faction: "阴罗宗",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "阴罗宗修士，筑基期。"
  },
  {
    id: 398,
    name: "易洗天",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "大晋四大散修之一，元婴期修士。"
  },
  {
    id: 399,
    name: "碧月禅师",
    faction: "佛门",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "大晋四大散修之一，元婴期修士。"
  },
  {
    id: 400,
    name: "绿秀郡主",
    faction: "大晋",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "大晋郡主，筑基期修士。"
  },
  {
    id: 401,
    name: "西炳山鬼王",
    faction: "鬼道",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "鬼王，元婴期实力。"
  },
  {
    id: 402,
    name: "岳真",
    faction: "天符门",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "天符门掌门，元婴期修士。"
  },
  {
    id: 403,
    name: "八级赤火蛟",
    faction: "妖兽",
    realm: "八级妖兽",
    status: "存活",
    chapter: "第三卷",
    description: "八级妖兽，实力强大。"
  },
  {
    id: 404,
    name: "苦竹老人",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "散修，元婴期修士。"
  },
  {
    id: 405,
    name: "风天行",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "散修，元婴期修士。"
  },
  {
    id: 406,
    name: "常芷芳",
    faction: "九幽宗",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "九幽宗内堂长老，元婴期修士。"
  },
  {
    id: 407,
    name: "元姓修士",
    faction: "毒圣门",
    realm: "元婴中期",
    status: "存活",
    chapter: "第三卷",
    description: "毒圣门长老，元婴中期修士。"
  },
  {
    id: 408,
    name: "白老鬼",
    faction: "太一门",
    realm: "化神期",
    status: "存活",
    chapter: "第三卷",
    description: "太一门冰魂谷化神修士，化神期。"
  },
  {
    id: 409,
    name: "呼化神",
    faction: "天魔宗",
    realm: "化神期",
    status: "存活",
    chapter: "第三卷",
    description: "天魔宗魔陀山化神修士，化神期。"
  },
  {
    id: 410,
    name: "方脸修士",
    faction: "叶家",
    realm: "元婴中期",
    status: "存活",
    chapter: "第三卷",
    description: "叶家元中长老，元婴中期修士。"
  },
  {
    id: 411,
    name: "年轻儒生",
    faction: "叶家",
    realm: "元婴后期",
    status: "存活",
    chapter: "第三卷",
    description: "叶家元后大长老，元婴后期修士。"
  },
  {
    id: 412,
    name: "叶云逸",
    faction: "叶家",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "叶家元婴长老，元婴期修士。"
  },
  {
    id: 413,
    name: "叶月圣",
    faction: "叶家",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "叶家七叔，元婴期修士。"
  },
  {
    id: 414,
    name: "叶灵隆",
    faction: "叶家",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "叶家阵法师，结丹期修士。"
  },
  {
    id: 415,
    name: "韦老",
    faction: "三皇观",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "三皇观炼器师，结丹期修士。"
  },
  {
    id: 416,
    name: "华莲仙姑",
    faction: "皇清观",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "皇清观女修，元婴期修士。"
  },
  {
    id: 417,
    name: "花天奇",
    faction: "毒圣门",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "毒圣门大长老，元婴期修士。"
  },
  {
    id: 418,
    name: "木夫人",
    faction: "化仙宗",
    realm: "元婴中期",
    status: "存活",
    chapter: "第三卷",
    description: "化仙宗女修，元婴中期修士。"
  },
  {
    id: 419,
    name: "何家家主",
    faction: "何家",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "何家家主，元婴期修士。"
  },
  {
    id: 420,
    name: "四散真人",
    faction: "散修",
    realm: "元婴初期",
    status: "存活",
    chapter: "第三卷",
    description: "大晋散修，元婴初期修士。"
  },
  // 421-450
  {
    id: 421,
    name: "羽道友",
    faction: "散修",
    realm: "元婴中期",
    status: "存活",
    chapter: "第三卷",
    description: "碧磷涯散修，元婴中期修士。"
  },
  {
    id: 422,
    name: "昆吾三老",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "三位散修，元婴期修士。"
  },
  {
    id: 423,
    name: "空玄丹士",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "炼丹师，元婴期修士。"
  },
  {
    id: 424,
    name: "冰魄仙子",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "女修，元婴期修士。"
  },
  {
    id: 425,
    name: "敖啸老祖",
    faction: "散修",
    realm: "化神期",
    status: "存活",
    chapter: "第三卷",
    description: "散修老祖，化神期修士。"
  },
  {
    id: 426,
    name: "七大妖王",
    faction: "妖族",
    realm: "化神期",
    status: "存活",
    chapter: "第三卷",
    description: "七位妖王，化神期实力。"
  },
  {
    id: 427,
    name: "灵界三皇",
    faction: "灵界",
    realm: "炼虚期",
    status: "存活",
    chapter: "第三卷",
    description: "灵界三位皇者，炼虚期修士。"
  },
  {
    id: 428,
    name: "天澜圣兽",
    faction: "灵界",
    realm: "圣兽",
    status: "存活",
    chapter: "第三卷",
    description: "灵界圣兽，实力强大。"
  },
  {
    id: 429,
    name: "大力真魔",
    faction: "魔界",
    realm: "真魔",
    status: "存活",
    chapter: "第三卷",
    description: "魔界真魔，实力强大。"
  },
  {
    id: 430,
    name: "天刹真魔",
    faction: "魔界",
    realm: "真魔",
    status: "存活",
    chapter: "第三卷",
    description: "魔界真魔，实力强大。"
  },
  {
    id: 431,
    name: "元刹圣祖",
    faction: "魔界",
    realm: "圣祖",
    status: "存活",
    chapter: "第三卷",
    description: "魔界圣祖，实力强大。"
  },
  {
    id: 432,
    name: "铁翅魔",
    faction: "魔界",
    realm: "真魔",
    status: "存活",
    chapter: "第三卷",
    description: "魔界真魔，实力强大。"
  },
  {
    id: 433,
    name: "李忠",
    faction: "李家",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "雪连峰李家家主，元婴期修士。"
  },
  {
    id: 434,
    name: "隆前辈",
    faction: "散修",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "霜郡散修，元婴期修士。"
  },
  {
    id: 435,
    name: "谷天启",
    faction: "小极宫",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "小极宫试炼者，筑基期修士。"
  },
  {
    id: 436,
    name: "石云",
    faction: "小极宫",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "小极宫外宫执事，结丹期修士。"
  },
  {
    id: 437,
    name: "任碧",
    faction: "小极宫",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "小极宫修士，筑基期。"
  },
  {
    id: 438,
    name: "华姓侍女",
    faction: "小极宫",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "小极宫侍女，筑基期修士。"
  },
  {
    id: 439,
    name: "姚蔓",
    faction: "小极宫",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "小极宫女修，筑基期修士。"
  },
  {
    id: 440,
    name: "叶师弟",
    faction: "小极宫",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "小极宫修士，筑基期。"
  },
  {
    id: 441,
    name: "小极宫宫主",
    faction: "小极宫",
    realm: "化神期",
    status: "存活",
    chapter: "第三卷",
    description: "小极宫宫主，化神期修士。"
  },
  {
    id: 442,
    name: "白梦馨",
    faction: "小极宫",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "小极宫女修，元婴期修士。"
  },
  {
    id: 443,
    name: "欧阳师弟",
    faction: "小极宫",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "小极宫修士，筑基期。"
  },
  {
    id: 444,
    name: "龙夫人",
    faction: "小极宫",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "小极宫女修，元婴期修士。"
  },
  {
    id: 445,
    name: "摩鸠大师",
    faction: "佛门",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "佛宗散修，元婴期修士。"
  },
  {
    id: 446,
    name: "青背苍狼",
    faction: "万妖谷",
    realm: "七级妖兽",
    status: "存活",
    chapter: "第三卷",
    description: "万妖谷妖兽，七级实力。"
  },
  {
    id: 447,
    name: "化形蛇妖",
    faction: "万妖谷",
    realm: "化形期",
    status: "存活",
    chapter: "第三卷",
    description: "万妖谷蛇妖，化形期。"
  },
  {
    id: 448,
    name: "长耳妖兽",
    faction: "万妖谷",
    realm: "六级妖兽",
    status: "存活",
    chapter: "第三卷",
    description: "万妖谷妖兽，六级实力。"
  },
  {
    id: 449,
    name: "三目妖兽",
    faction: "万妖谷",
    realm: "六级妖兽",
    status: "存活",
    chapter: "第三卷",
    description: "万妖谷妖兽，六级实力。"
  },
  {
    id: 450,
    name: "凤仙子",
    faction: "散修",
    realm: "化神期",
    status: "存活",
    chapter: "第三卷",
    description: "冰海之主，化神期修士。"
  },
  // 451-488
  {
    id: 451,
    name: "黄泉鬼母",
    faction: "鬼道",
    realm: "化神期",
    status: "存活",
    chapter: "第三卷",
    description: "鬼道修士，化神期。"
  },
  {
    id: 452,
    name: "白鹿老怪",
    faction: "散修",
    realm: "化神期",
    status: "存活",
    chapter: "第三卷",
    description: "散修，化神期修士。"
  },
  {
    id: 453,
    name: "明师兄",
    faction: "黄沙门",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "黄沙门修士，筑基期。"
  },
  {
    id: 454,
    name: "石宣",
    faction: "黄沙门",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "黄沙门修士，筑基期。"
  },
  {
    id: 455,
    name: "甘霖",
    faction: "黄沙门",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "黄沙门修士，筑基期。"
  },
  {
    id: 456,
    name: "混老魔",
    faction: "散修",
    realm: "元婴初期",
    status: "存活",
    chapter: "第三卷",
    description: "乱星海散修，元婴初期修士。"
  },
  {
    id: 457,
    name: "田琴儿",
    faction: "散修",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "女修，结丹期修士。"
  },
  {
    id: 458,
    name: "田姓修士",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "散修，筑基期修士。"
  },
  {
    id: 459,
    name: "辰京",
    faction: "青阳门",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "青阳门修士，结丹期。"
  },
  {
    id: 460,
    name: "言师侄",
    faction: "青阳门",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "青阳门修士，筑基期。"
  },
  {
    id: 461,
    name: "黄昆",
    faction: "离龙岛",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "离龙岛修士，结丹期。"
  },
  {
    id: 462,
    name: "唐长老",
    faction: "逆星盟",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "逆星盟长老，元婴期修士。"
  },
  {
    id: 463,
    name: "白发男子",
    faction: "逆星盟",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "逆星盟修士，元婴期。"
  },
  {
    id: 464,
    name: "金蛟王",
    faction: "外星海",
    realm: "化形期",
    status: "存活",
    chapter: "第三卷",
    description: "外星海妖王，化形期。"
  },
  {
    id: 465,
    name: "蓝姓妖修",
    faction: "外星海",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "外星海妖修，结丹期。"
  },
  {
    id: 466,
    name: "聂姓妖修",
    faction: "外星海",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "外星海妖修，结丹期。"
  },
  {
    id: 467,
    name: "狻道友",
    faction: "外星海",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "外星海妖修，结丹期。"
  },
  {
    id: 468,
    name: "碧道友",
    faction: "外星海",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "外星海妖修，结丹期。"
  },
  {
    id: 469,
    name: "赵长老",
    faction: "星宫",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "星宫长老，元婴期修士。"
  },
  {
    id: 470,
    name: "雷师弟",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "蛮胡子弟子，筑基期修士。"
  },
  {
    id: 471,
    name: "吴师兄",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "蛮胡子弟子，筑基期修士。"
  },
  {
    id: 472,
    name: "蔡师姐",
    faction: "散修",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "散修，筑基期修士。"
  },
  {
    id: 473,
    name: "金花老祖",
    faction: "散修",
    realm: "元婴初期",
    status: "存活",
    chapter: "第三卷",
    description: "乱星海散修，元婴初期修士。"
  },
  {
    id: 474,
    name: "天澜兽",
    faction: "灵界",
    realm: "化神期",
    status: "存活",
    chapter: "第三卷",
    description: "灵界妖修，化神期实力。"
  },
  {
    id: 475,
    name: "欧阳道友",
    faction: "六连殿",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "六连殿修士，结丹期。"
  },
  {
    id: 476,
    name: "古长老",
    faction: "六连殿",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "六连殿长老，元婴期修士。"
  },
  {
    id: 477,
    name: "苗长老",
    faction: "六连殿",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "六连殿长老，元婴期修士。"
  },
  {
    id: 478,
    name: "冯三娘",
    faction: "六连殿",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "六连殿女修，结丹期修士。"
  },
  {
    id: 479,
    name: "鲁二",
    faction: "其他",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "天星城向导，筑基期修士。"
  },
  {
    id: 480,
    name: "莲儿",
    faction: "妙音门",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "妙音门女修，筑基期修士。"
  },
  {
    id: 481,
    name: "卓如婷",
    faction: "妙音门",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "妙音门女修，结丹期修士。"
  },
  {
    id: 482,
    name: "韵琴",
    faction: "妙音门",
    realm: "筑基期",
    status: "存活",
    chapter: "第三卷",
    description: "妙音门女修，筑基期修士。"
  },
  {
    id: 483,
    name: "赵长老",
    faction: "妙音门",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "妙音门长老，元婴期修士。"
  },
  {
    id: 484,
    name: "孟长老",
    faction: "妙音门",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "妙音门长老，元婴期修士。"
  },
  {
    id: 485,
    name: "云天啸",
    faction: "妙音门",
    realm: "元婴期",
    status: "存活",
    chapter: "第三卷",
    description: "妙音门修士，元婴期。"
  },
  {
    id: 486,
    name: "金青",
    faction: "散修",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "荒岛探宝组织者，结丹期修士。"
  },
  {
    id: 487,
    name: "胡月",
    faction: "散修",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "荒岛探宝组织者，结丹期修士。"
  },
  {
    id: 488,
    name: "石蝶仙子",
    faction: "散修",
    realm: "结丹期",
    status: "存活",
    chapter: "第三卷",
    description: "荒岛探宝组织者，结丹期修士。"
  }
     ];

// 势力分类映射
export const factionMap = {
  "韩家": "韩立家族",
  "七玄门": "江湖门派",
  "黄枫谷": "修仙宗门",
  "掩月宗": "修仙宗门",
  "清虚门": "修仙宗门",
  "天阙堡": "修仙宗门",
  "灵兽山": "修仙宗门",
  "巨剑门": "修仙宗门",
  "化刀坞": "修仙宗门",
  "天星宗": "修仙宗门",
  "合欢宗": "魔道宗门",
  "魔焰门": "魔道宗门",
  "鬼灵门": "魔道宗门",
  "黑煞教": "魔道宗门",
  "千竹教": "江湖门派",
  "惊蛟会": "江湖门派",
  "四平帮": "江湖门派",
  "野狼帮": "江湖门派",
  "铁拳会": "江湖门派",
  "独霸山": "江湖门派",
  "燕翎堡": "修仙家族",
  "万家": "修仙家族",
  "秦叶岭": "修仙家族",
  "齐家": "修仙家族",
  "萧家": "修仙家族",
  "七派": "修仙宗门",
  "村民": "其他",
  "越国皇室": "其他",
  "散修": "散修",
  "其他": "其他"
}

// 境界分类映射
export const realmMap = {
  "凡人": "凡人",
  "炼气期": "炼气期",
  "筑基期": "筑基期",
  "结丹期": "结丹期",
  "元婴期": "元婴期",
  "化神期": "化神期",
  "炼虚期": "炼虚期",
  "合体期": "合体期",
  "大乘期": "大乘期",
  "渡劫期": "渡劫期",
  "真仙": "真仙",
  "金仙": "金仙",
  "太乙": "太乙",
  "大罗": "大罗",
  "道祖": "道祖",
  "未知": "未知"
}

// 状态分类映射
export const statusMap = {
  "存活": "存活",
  "死亡": "死亡",
  "失踪": "失踪",
  "未知": "未知"
}

// 章节分类映射
export const chapterMap = {
  "第一卷": "第一卷",
  "第二卷": "第二卷",
  "第三卷": "第三卷",
  "第四卷": "第四卷",
  "第五卷": "第五卷",
  "第六卷": "第六卷",
  "第七卷": "第七卷",
  "第八卷": "第八卷",
  "第九卷": "第九卷",
  "第十卷": "第十卷",
  "其他": "其他"
}