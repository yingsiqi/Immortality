# Immortality — 项目目录结构

> 基于项目文档（技术架构设计、游戏系统设计、开发计划）生成的完整目录结构。
> 最后更新: 2026-07-20

## 完整目录树

```
Immortality/
├── game/                                # 🎮 游戏客户端 (团结引擎 / C#)
│   ├── Assets/
│   │   ├── Scripts/                     # C# 源代码
│   │   │   ├── Core/                    # 核心框架
│   │   │   │   ├── Managers/            # 全局管理器 (GameManager, AuthManager...)
│   │   │   │   ├── Systems/             # 系统基类 (GameSystem)
│   │   │   │   └── Utilities/           # 工具类 (EventHub, GameUtility)
│   │   │   ├── Features/                # 功能模块 (按游戏系统划分)
│   │   │   │   ├── Auth/                # 认证
│   │   │   │   ├── Character/           # 角色系统
│   │   │   │   ├── Cultivation/         # 修炼系统 (核心)
│   │   │   │   ├── Combat/              # 战斗系统
│   │   │   │   ├── Equipment/           # 装备系统
│   │   │   │   ├── Inventory/           # 背包系统
│   │   │   │   ├── Economy/             # 经济系统
│   │   │   │   ├── Social/              # 社交系统
│   │   │   │   ├── Quest/               # 任务系统
│   │   │   │   ├── PvP/                 # PVP系统
│   │   │   │   ├── Dungeon/             # 副本系统
│   │   │   │   └── World/               # 世界系统
│   │   │   ├── Network/                 # 网络层
│   │   │   │   ├── Api/                 # HTTP API 客户端
│   │   │   │   └── Transport/           # 实时通信层
│   │   │   ├── Data/                    # 数据层
│   │   │   │   ├── ScriptableObjects/   # 数据资产
│   │   │   │   ├── Models/              # 数据模型
│   │   │   │   └── Constants/           # 常量定义
│   │   │   └── UI/                      # UI层
│   │   │       ├── Components/          # 通用UI组件
│   │   │       └── Views/               # 功能界面
│   │   ├── Prefabs/                     # 预制体
│   │   ├── Art/                         # 美术资源
│   │   ├── Scenes/                      # 场景
│   │   └── AddressableAssetsData/       # 可寻址资源
│   ├── Packages/
│   ├── ProjectSettings/
│   └── README.md
│
├── server/                              # 🖥️ 游戏服务端 (ASP.NET Core / C#)
│   ├── Immortality.sln                  # 解决方案文件
│   ├── global.json                      # .NET SDK 版本
│   ├── .editorconfig                    # 编码规范
│   ├── src/
│   │   ├── Immortality.Gateway/         # API 网关 (反向代理/路由/认证)
│   │   ├── Immortality.AuthService/     # 认证服务 (JWT + BCrypt)
│   │   ├── Immortality.GameService/     # 游戏逻辑服务 (核心)
│   │   ├── Immortality.RealtimeService/ # 实时通信服务 (SignalR)
│   │   ├── Immortality.EventSourcing/   # 事件溯源库 (EventStoreDB)
│   │   ├── Immortality.Shared/          # 共享库 (DTOs, Models, Constants)
│   │   └── Immortality.Infrastructure/  # 基础设施库 (DB, Cache, Storage)
│   ├── tests/
│   │   ├── Immortality.UnitTests/       # 单元测试
│   │   └── Immortality.IntegrationTests/# 集成测试
│   └── README.md
│
├── deploy/                              # 🚀 部署配置
│   ├── docker/                          # Docker (Compose + Dockerfiles)
│   ├── k8s/                             # Kubernetes 部署清单
│   ├── nginx/                           # Nginx 反向代理
│   ├── monitoring/                      # Prometheus + Grafana
│   └── README.md
│
├── doc/                                 # 📚 VitePress 文档系统
│   ├── core-systems/                    # 核心系统设计
│   ├── design/                          # 游戏设计 (世界观/玩法/UI-UX)
│   ├── guides/                          # 开发和运营指南
│   ├── reference/                       # API参考
│   ├── specs/                           # 7层规则规范
│   ├── data/                            # 数据表
│   ├── art-audio/                       # 美术音频
│   └── .vitepress/                      # VitePress 配置
│
├── admin-panel/                         # 🔧 项目管理面板 (Node.js)
│   ├── src/
│   ├── public/
│   ├── server.js
│   └── package.json
│
├── .github/workflows/                   # CI/CD 流水线
├── .vscode/                             # VS Code 配置
│
├── package.json                         # 项目依赖
├── setup.js                             # 项目初始化脚本
├── start.js                             # 项目启动脚本
├── README.md
└── LICENSE
```

## 模块说明

### 🎮 game/ — 游戏客户端
| 技术栈 | 团结引擎 (Tuanjie Engine) 1.7.3+ / C# / UGUI + UI Toolkit |
|--------|------|
| 架构模式 | ScriptableObject 数据驱动 + Singleton Manager |
| 核心管理器 | GameManager → AuthManager / UIManager / NetworkManager / PlayerDataManager / CultivationManager |
| 功能模块 | 按游戏系统划分为 12 个 Feature 目录 |
| 详见 | [game/README.md](game/README.md) |

### 🖥️ server/ — 游戏服务端
| 技术栈 | .NET 8 / ASP.NET Core / EF Core / EventStoreDB / Redis |
|--------|------|
| 架构模式 | 微服务 + 事件溯源 (Event Sourcing) + CQRS |
| 微服务 | Gateway / AuthService / GameService / RealtimeService |
| 共享库 | Shared (DTOs/Models/Constants) / EventSourcing / Infrastructure |
| 服务端口 | Gateway:3001 / Auth:5001 / Game:5002 / Realtime:5003 |
| 详见 | [server/README.md](server/README.md) |

### 🚀 deploy/ — 部署配置
| 组件 | 说明 |
|------|------|
| Docker | docker-compose.yml 一键启动全部服务 |
| Kubernetes | 生产环境 K8s 部署清单 |
| Nginx | 反向代理 + WebSocket 支持 |
| Monitoring | Prometheus 采集 + Grafana 仪表盘 |
| 详见 | [deploy/README.md](deploy/README.md) |

### 📚 doc/ — 文档系统
| 目录 | 内容 |
|------|------|
| core-systems/ | 角色/战斗/修炼/装备/经济/社交/任务/PVP/副本/事件系统设计 |
| design/ | 世界观 (人物/地理/门派) / 玩法机制 / UI-UX / 数值设计 |
| guides/ | 技术指南 (架构/部署/开发规范) / 项目管理 / 运营指南 |
| specs/ | 7层规则规范 (属性/动作/战斗/成长/经济/社交/世界) |
| data/ | 数据表 (炼丹/生物/装备/事件/材料/灵宠/技能/世界) |

### 🔧 admin-panel/ — 项目管理面板
Node.js 管理面板，用于管理文档服务、构建任务等。

## 技术架构总览

```
                        ┌──────────────────────────────────────┐
                        │          客户端 (团结引擎/C#)          │
                        │  GameManager → Managers → Features   │
                        └──────────────┬───────────────────────┘
                                       │ HTTP + WebSocket
                        ┌──────────────▼───────────────────────┐
                        │          Nginx 反向代理 (:80)         │
                        └──────────────┬───────────────────────┘
                                       │
                        ┌──────────────▼───────────────────────┐
                        │        API Gateway (:3001)           │
                        │     (YARP 反向代理 + JWT 认证)        │
                        └──┬────────┬────────┬────────────────┘
                           │        │        │
              ┌────────────▼┐ ┌─────▼──────┐ ┌────────────────▼┐
              │ AuthService │ │ GameService│ │ RealtimeService │
              │   (:5001)   │ │   (:5002)  │ │    (:5003)      │
              │ JWT+BCrypt  │ │ 游戏逻辑   │ │   SignalR Hub   │
              └──────┬──────┘ └─────┬──────┘ └────────┬────────┘
                     │              │                  │
              ┌──────┴──────────────┴──────────────────┴──────┐
              │                基础设施层                       │
              ├──────────┬──────────┬──────────┬──────────────┤
              │PostgreSQL│  Redis   │EventStore│    MinIO     │
              │ (读模型) │(缓存/背板)│(事件流)  │ (对象存储)   │
              └──────────┴──────────┴──────────┴──────────────┘
```

## 数据流 (CQRS + Event Sourcing)

```
命令 → GameService → 追加事件 → EventStoreDB (写侧)
                                  │
                          事件投影 (Projection)
                                  │
                          PostgreSQL (读侧/物化视图)
                                  │
                          Redis 缓存 (热数据)
                                  │
                          客户端查询 ← PlayerDataManager
```

## 开发路线对齐

本目录结构对齐文档中的 Alpha 开发计划：

| 阶段 | 周期 | 对应目录 |
|------|------|----------|
| 基础设施搭建 | 1-3周 | `deploy/docker/`, `server/src/Immortality.Infrastructure/` |
| 认证服务 | 4-5周 | `server/src/Immortality.AuthService/` |
| 玩家管理 | 6周 | `server/src/Immortality.GameService/Services/PlayerService` |
| 修炼核心 | 7-8周 | `server/src/Immortality.GameService/Services/CultivationService` |
| 战斗基础 | 9周 | `server/src/Immortality.GameService/Services/CombatService` |
| 物品装备 | 10周 | `game/Assets/Scripts/Features/Equipment/` |
| 客户端UI | 5-11周 | `game/Assets/Scripts/UI/` |
| 集成测试 | 11-12周 | `server/tests/` |
