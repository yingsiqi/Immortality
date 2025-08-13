<template>
  <div class="character-navigation">
    <h3>人物快速导航</h3>
    
    <!-- 核心人物 -->
    <div class="nav-section">
      <h4>核心人物 (4人)</h4>
      <div class="character-tags">
        <a href="#韩立-小名二愣子" class="character-tag core">韩立</a>
        <a href="#南宫婉" class="character-tag core">南宫婉</a>
        <a href="#银月-雪玲" class="character-tag core">银月</a>
        <a href="#珑梦" class="character-tag core">珑梦</a>
      </div>
    </div>

    <!-- 主要人物 -->
    <div class="nav-section">
      <h4>主要人物 (6人)</h4>
      <div class="character-tags">
        <a href="#紫灵仙子-汪凝" class="character-tag important">紫灵</a>
        <a href="#李化元" class="character-tag important">李化元</a>
        <a href="#玄骨上人-萧诧" class="character-tag important">玄骨</a>
        <a href="#极阴祖师" class="character-tag important">极阴</a>
        <a href="#墨大夫-墨居仁" class="character-tag important">墨大夫</a>
        <a href="#风希" class="character-tag important">风希</a>
      </div>
    </div>

    <!-- 重要配角 -->
    <div class="nav-section">
      <h4>重要配角 (10人)</h4>
      <div class="character-tags">
        <a href="#陈巧倩" class="character-tag important">陈巧倩</a>
        <a href="#菡云芝" class="character-tag important">菡云芝</a>
        <a href="#董萱儿" class="character-tag important">董萱儿</a>
        <a href="#文思月" class="character-tag important">文思月</a>
        <a href="#梅凝" class="character-tag important">梅凝</a>
        <a href="#慕沛灵" class="character-tag important">慕沛灵</a>
        <a href="#墨彩环" class="character-tag important">墨彩环</a>
        <a href="#元瑶" class="character-tag important">元瑶</a>
        <a href="#厉飞雨" class="character-tag important">厉飞雨</a>
        <a href="#燕如嫣" class="character-tag important">燕如嫣</a>
      </div>
    </div>

    <!-- 传奇人物与上古存在 -->
    <div class="nav-section">
      <h4>传奇人物 (7人)</h4>
      <div class="character-tags">
        <a href="#大衍神君" class="character-tag legend">大衍神君</a>
        <a href="#血焰主魂-南陇魔" class="character-tag legend">血焰主魂</a>
        <a href="#血焰分魂-苍坤魔" class="character-tag legend">血焰分魂</a>
        <a href="#元刹分身" class="character-tag legend">元刹分身</a>
        <a href="#向之礼" class="character-tag legend">向之礼</a>
        <a href="#车老妖" class="character-tag legend">车老妖</a>
        <a href="#炫烨王" class="character-tag legend">炫烨王</a>
      </div>
    </div>

    <!-- 次要人物 -->
    <div class="nav-section">
      <h4>次要人物 (20人)</h4>
      <div class="character-tags">
        <a href="#张铁-曲魂" class="character-tag secondary">张铁</a>
        <a href="#程天坤" class="character-tag secondary">程天坤</a>
        <a href="#吕洛" class="character-tag secondary">吕洛</a>
        <a href="#南陇侯" class="character-tag secondary">南陇侯</a>
        <a href="#璇玑子-鲁卫英" class="character-tag secondary">璇玑子</a>
        <a href="#至阳上人" class="character-tag secondary">至阳上人</a>
        <a href="#魏无涯" class="character-tag secondary">魏无涯</a>
        <a href="#合欢老魔" class="character-tag secondary">合欢老魔</a>
        <a href="#龙晗-凤冰" class="character-tag secondary">龙晗凤冰</a>
        <a href="#林银屏" class="character-tag secondary">林银屏</a>
        <a href="#王蝉" class="character-tag secondary">王蝉</a>
        <a href="#温天仁" class="character-tag secondary">温天仁</a>
        <a href="#徐仙师" class="character-tag secondary">徐仙师</a>
        <a href="#富成" class="character-tag secondary">富成</a>
        <a href="#乾老魔" class="character-tag secondary">乾老魔</a>
        <a href="#五子同心魔" class="character-tag secondary">五子同心魔</a>
        <a href="#木魁" class="character-tag secondary">木魁</a>
        <a href="#圭灵" class="character-tag secondary">圭灵</a>
        <a href="#狮禽兽" class="character-tag secondary">狮禽兽</a>
        <a href="#银翅夜叉" class="character-tag secondary">银翅夜叉</a>
      </div>
    </div>

    <!-- 其他角色 -->
    <div class="nav-section">
      <h4>其他角色 (21人)</h4>
      <div class="character-tags">
        <a href="#熊师" class="character-tag other">熊师</a>
        <a href="#王绝楚" class="character-tag other">王绝楚</a>
        <a href="#余子童" class="character-tag other">余子童</a>
        <a href="#孙二狗" class="character-tag other">孙二狗</a>
        <a href="#王天古" class="character-tag other">王天古</a>
        <a href="#王天胜" class="character-tag other">王天胜</a>
        <a href="#令狐老祖" class="character-tag other">令狐老祖</a>
        <a href="#南宫婉的师姐" class="character-tag other">南宫婉师姐</a>
        <a href="#妍丽" class="character-tag other">妍丽</a>
        <a href="#极炫" class="character-tag other">极炫</a>
        <a href="#乌丑" class="character-tag other">乌丑</a>
        <a href="#蛮胡子" class="character-tag other">蛮胡子</a>
        <a href="#万天明" class="character-tag other">万天明</a>
        <a href="#星宫执法双使" class="character-tag other">星宫双使</a>
        <a href="#范夫人-范静梅" class="character-tag other">范夫人</a>
        <a href="#宋姓女子" class="character-tag other">宋姓女子</a>
        <a href="#乐姓女子" class="character-tag other">乐姓女子</a>
        <a href="#聂盈" class="character-tag other">聂盈</a>
        <a href="#葛天豪" class="character-tag other">葛天豪</a>
        <a href="#玄青子" class="character-tag other">玄青子</a>
        <a href="#七妙真人" class="character-tag other">七妙真人</a>
        <a href="#寒骊上人-师相" class="character-tag other">寒骊上人</a>
        <a href="#白瑶怡" class="character-tag other">白瑶怡</a>
        <a href="#车老妖化身" class="character-tag other">车老妖化身</a>
      </div>
    </div>
  </div>
</template>

<script setup>
// 这个组件是纯静态的导航组件，不需要响应式数据
</script>

<style scoped>
.character-navigation {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 16px;
  margin: 20px 0;
}

.character-navigation h3 {
  margin: 0 0 16px 0;
  color: var(--vp-c-text-1);
  font-size: 18px;
  font-weight: 600;
}

.nav-section {
  margin-bottom: 16px;
}

.nav-section h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  font-weight: 500;
}

.character-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.character-tag {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.character-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 核心人物 - 金色 */
.character-tag.core {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #8b4513;
  border-color: #ffd700;
}

.character-tag.core:hover {
  background: linear-gradient(135deg, #ffed4e, #ffd700);
}

/* 主要人物 - 蓝色 */
.character-tag.important {
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  color: white;
  border-color: #3b82f6;
}

.character-tag.important:hover {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
}



/* 次要人物 - 绿色 */
.character-tag.secondary {
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  border-color: #10b981;
}

.character-tag.secondary:hover {
  background: linear-gradient(135deg, #34d399, #10b981);
}

/* 传奇人物 - 紫色 */
.character-tag.legend {
  background: linear-gradient(135deg, #8b5cf6, #a78bfa);
  color: white;
  border-color: #8b5cf6;
}

.character-tag.legend:hover {
  background: linear-gradient(135deg, #a78bfa, #8b5cf6);
}

/* 魔道角色 - 红色 */
.character-tag.evil {
  background: linear-gradient(135deg, #ef4444, #f87171);
  color: white;
  border-color: #ef4444;
}

.character-tag.evil:hover {
  background: linear-gradient(135deg, #f87171, #ef4444);
}

/* 其他角色 - 橙色 */
.character-tag.other {
  background: linear-gradient(135deg, #f97316, #fb923c);
  color: white;
  border-color: #f97316;
}

.character-tag.other:hover {
  background: linear-gradient(135deg, #fb923c, #f97316);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .character-navigation {
    padding: 12px;
  }
  
  .character-tag {
    font-size: 11px;
    padding: 3px 6px;
  }
}
</style>