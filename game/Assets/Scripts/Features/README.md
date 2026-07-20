# Features — 功能模块

按游戏系统划分的功能模块，每个模块对应文档中的一个核心系统设计。

## 模块对应关系

| 目录 | 对应文档 | 说明 |
|------|----------|------|
| `Auth/` | — | 登录/注册/认证流程 |
| `Character/` | `core-systems/character/` | 角色属性、状态、创建、Build |
| `Cultivation/` | `core-systems/cultivation/` | 修炼境界、灵根、突破（核心系统） |
| `Combat/` | `core-systems/combat/` | 技能、连招、AI、战斗公式 |
| `Equipment/` | `core-systems/equipment/` | 装备分类、强化、进阶、附魔 |
| `Inventory/` | — | 背包与物品管理 |
| `Economy/` | `core-systems/economy/` | 货币、交易、灵力分配 |
| `Social/` | `core-systems/social/` | 师徒、门派、业力、组队 |
| `Quest/` | `core-systems/quest/` | 任务分类、触发、奖励、任务链 |
| `PvP/` | `core-systems/pvp/` | 竞技场、门派战、排行榜 |
| `Dungeon/` | `core-systems/dungeon/` | 副本分类、BOSS机制、匹配 |
| `World/` | `specs/layer-07-world-system.md` | 地图、灵脉、天道法则 |

## 开发规范

每个功能模块建议采用以下结构：
```
FeatureName/
├── FeatureNameController.cs   # 控制器 — 接收输入，协调 Service
├── FeatureNameService.cs      # 服务层 — 业务逻辑
├── FeatureNameModels.cs       # 数据模型
└── FeatureNameView.cs         # 视图 — UI 绑定（如需要）
```
