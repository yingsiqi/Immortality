# Data — 数据层

客户端数据定义与模型。

## 目录

| 目录 | 用途 |
|------|------|
| `ScriptableObjects/` | Unity ScriptableObject 数据资产 — 配置驱动的静态数据 |
| `Models/` | 数据模型 — 对应服务端实体的客户端镜像 |
| `Constants/` | 游戏常量 — 境界、灵根、品质、货币等枚举值 |

## ScriptableObject 用途

将游戏配置数据（境界参数、技能数据、物品信息等）序列化为 `.asset` 文件，
实现数据与逻辑分离，支持策划独立编辑。

## 关键常量

- `GameConstants.CultivationRealms` — 15个修炼境界
- `GameConstants.SpiritualRootTypes` — 5种灵根类型
- `GameConstants.CoreAttributes` — 6大核心属性
- `GameConstants.KarmaDimensions` — 5维业力
- `GameConstants.CurrencyTypes` — 4级货币体系
