---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: acf5f01197289133e867ecab2f78b94b_7bffe776811311f1a4c4525400bff409
    ReservedCode1: 3wTcY6VytREuvJZr4LCeNI7pou4Ye05Viu6CkNG2KllEUZonC2OaHMk0QZXy8GOmG50djRNDGBgO6mGyNzr7R+nId15HOE3nNyItOhn5UH89jcW6KPA7s3CRhAbMQ7lJ+M+U67wKwi/TBgznT9+n8WxWlj/BMArkmC48i19cqvF+m72Nz5IGA1OmqZ4=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: acf5f01197289133e867ecab2f78b94b_7bffe776811311f1a4c4525400bff409
    ReservedCode2: 3wTcY6VytREuvJZr4LCeNI7pou4Ye05Viu6CkNG2KllEUZonC2OaHMk0QZXy8GOmG50djRNDGBgO6mGyNzr7R+nId15HOE3nNyItOhn5UH89jcW6KPA7s3CRhAbMQ7lJ+M+U67wKwi/TBgznT9+n8WxWlj/BMArkmC48i19cqvF+m72Nz5IGA1OmqZ4=
---

# 游戏数据库

基于 7 层规则书的游戏数据资产，定义"玩什么"——技能、物品、怪物、地图等的具体数值与配置。

## 数据表总览

| 序号 | 数据表 | 内容 | 依赖规则层 | 状态 |
|------|--------|------|-----------|------|
| 1 | 技能表 | 功法（39本）+ 术法（108节点，6流派4层技能树），含分类设计、原著归类分析 | L2 行动原子 / L4 功法体系 | ✅ 已完成 |
| 2 | 采集物/材料表 | 灵草（450行）、矿石（528行）、灵兽材料（481行）、天地灵物（567行），共4个子表 | 相对独立 | ✅ 已完成 |
| 3 | 丹药/配方 | 65种丹药 + 65条配方，6大功能分类 | L4 生活技能 / L5 经济系统 | ✅ 已完成 |
| 4 | 装备/法宝表 | 武器/防具/法宝/飞行法器/傀儡/空间法器/符箓 8大类 70条 | L4 装备成长 | ✅ 已完成 |
| 5 | 灵宠表 | 战斗/骑乘/辅助/特殊 4大类 30种灵宠 | L4 灵宠养成 | ✅ 已完成 |
| 6 | 怪物/NPC表 | 43种怪物 + 25条NPC，覆盖全等级段 | L3 战斗 / L5 经济 | ✅ 已完成 |
| 7 | 地图/副本表 | 2大陆 + 30区域 + 20副本 | L7 世界系统 | ✅ 已完成 |
| 8 | 奇遇/事件表 | 5大类 38条事件（随机奇遇/天道/任务链/连锁/赛季） | L5 经济 / L7 世界 | ✅ 已完成 |

## 编写原则

- **先技能后物品**：技能直接定义战斗体验，是最高频的交互内容，必须优先确定
- **从上往下写**：上游表没定下来之前，不急于写下表（例如先定材料再写配方）
- **与规则书对齐**：每张数据表的字段、公式、数值必须与对应规则层的定义一致
- **可拆分维护**：每张表独立一个 .md 文件，文件以表格为主体，辅以分类说明

## 与 rules 目录的关系

```
specs/   → 规则书：定义公式、机制、系统间交互
data/    → 数据库：填充具体数值、列表、配置项
```

`data/` 目录下的表是 `specs/` 规则书的实例化产物，开发时两者同时引用：
- 开发读 `specs/` 了解"系统怎么运作"
- 开发读 `data/` 获取"具体有什么东西"
*（内容由AI生成，仅供参考）*
