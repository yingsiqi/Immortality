# game/ — 团结引擎客户端

基于团结引擎 1.7.3+ 的游戏客户端，使用 C# 开发。

## 技术栈

- **引擎**: 团结引擎 (Tuanjie Engine) — Unity 中国版
- **语言**: C#
- **UI**: UGUI + UI Toolkit (USS 样式)
- **状态管理**: ScriptableObject + Singleton Manager 模式
- **资源管理**: Addressable Assets
- **网络**: Unity Transport / Mirror Networking (实时) + UnityWebRequest (HTTP)
- **动画**: DOTween + Lottie + Particle System

## 目录结构

```
Assets/
├── Scripts/                    # C# 源代码
│   ├── Core/                   # 核心框架
│   │   ├── Managers/           # 全局管理器 (GameManager, AuthManager, UIManager...)
│   │   ├── Systems/            # 系统基类 (GameSystem)
│   │   └── Utilities/          # 工具类 (EventHub, GameUtility)
│   ├── Features/               # 功能模块（按游戏系统划分）
│   │   ├── Auth/               # 认证
│   │   ├── Character/          # 角色系统
│   │   ├── Cultivation/        # 修炼系统（核心）
│   │   ├── Combat/             # 战斗系统
│   │   ├── Equipment/          # 装备系统
│   │   ├── Inventory/          # 背包系统
│   │   ├── Economy/            # 经济系统
│   │   ├── Social/             # 社交系统
│   │   ├── Quest/              # 任务系统
│   │   ├── PvP/                # PVP系统
│   │   ├── Dungeon/            # 副本系统
│   │   └── World/              # 世界系统
│   ├── Network/                # 网络层
│   │   ├── Api/                # HTTP API 客户端
│   │   └── Transport/          # 实时通信层
│   ├── Data/                   # 数据层
│   │   ├── ScriptableObjects/  # 数据资产
│   │   ├── Models/             # 数据模型
│   │   └── Constants/          # 常量定义
│   └── UI/                     # UI层
│       ├── Components/         # 通用UI组件
│       └── Views/              # 功能界面
├── Prefabs/                    # 预制体 (UI, Effects, Characters)
├── Art/                        # 美术资源 (Sprites, Icons, Animations)
├── Scenes/                     # 场景 (Home, Cultivation, Combat, World)
└── AddressableAssetsData/      # 可寻址资源配置
```

## Singleton Manager 架构

```
GameManager (根管理器)
├── AuthManager         — 认证与Token管理
├── UIManager           — 界面切换与弹窗
├── NetworkManager      — HTTP与实时通信
├── PlayerDataManager   — 玩家数据加载与同步
└── CultivationManager  — 修炼计时与突破判定
```

## 开发指南

1. 将 `game/` 作为团结引擎客户端工程根目录
2. C# 脚本放在 `Assets/Scripts/` 下，按功能模块组织
3. 使用 Assembly Definition (`.asmdef`) 划分模块边界
4. 遵循 C# 编码规范：PascalCase 类型/方法，`_camelCase` 私有字段
5. 启用 Nullable Reference Types 和 `TreatWarningsAsErrors`
6. 测试使用 Unity Test Framework + NUnit

## 相关文档

- [前端架构设计](../doc/guides/technical/frontend-architecture.md)
- [核心系统设计](../doc/core-systems/)
- [游戏设计规范](../doc/specs/)
