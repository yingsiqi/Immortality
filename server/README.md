# 服务端 — ASP.NET Core 微服务

基于 .NET 8 + ASP.NET Core 的微服务架构，采用事件溯源 + CQRS 模式。

## 技术栈

| 组件 | 技术 | 版本 |
|------|------|------|
| 运行时 | .NET 8 / C# 12 | 8.0 |
| Web框架 | ASP.NET Core Web API | 8.0 |
| ORM | EF Core + Npgsql | 8.0 |
| 事件存储 | EventStoreDB | 23+ |
| 缓存 | Redis (StackExchange.Redis) | 7+ |
| 对象存储 | MinIO | — |
| 后台任务 | Hangfire | 1.8+ |
| 日志 | Serilog | 3.1+ |
| API文档 | Swashbuckle / Swagger | 6.5+ |
| 验证 | FluentValidation | 11.3+ |
| 测试 | xUnit + Moq + FluentAssertions | — |
| 容器 | Testcontainers | 3.8+ |

## 项目结构

```
server/
├── Immortality.sln                    # 解决方案文件
├── global.json                        # .NET SDK 版本
├── .editorconfig                      # 编码规范
├── .gitignore
├── src/
│   ├── Immortality.Gateway/           # API 网关 (反向代理/路由/认证)
│   │   ├── Program.cs                 # 入口 — YARP 反向代理
│   │   ├── appsettings.json           # 路由配置
│   │   ├── Controllers/
│   │   └── Middleware/
│   ├── Immortality.AuthService/       # 认证服务
│   │   ├── Program.cs                 # 入口 — JWT + BCrypt
│   │   ├── AuthDbContext.cs           # 数据库上下文
│   │   ├── Controllers/AuthController.cs
│   │   ├── Services/AuthService.cs    # 注册/登录/Token
│   │   ├── Entities/User.cs
│   │   └── DTOs/
│   ├── Immortality.GameService/       # 游戏逻辑服务 (核心)
│   │   ├── Program.cs                 # 入口 — 事件溯源 + Hangfire
│   │   ├── GameDbContext.cs           # 数据库上下文
│   │   ├── Controllers/               # PlayerController, CultivationController
│   │   ├── Services/                  # CultivationService, CombatService, PlayerService
│   │   ├── Entities/                  # Player, GameEvent, PlayerSnapshot
│   │   ├── Events/
│   │   ├── Repositories/
│   │   └── DTOs/
│   ├── Immortality.RealtimeService/   # 实时通信服务
│   │   ├── Program.cs                 # 入口 — SignalR + Redis 背板
│   │   └── Hubs/GameHub.cs            # 修炼/战斗实时通信
│   ├── Immortality.EventSourcing/     # 事件溯源库
│   │   ├── Events/DomainEvents.cs     # 领域事件定义
│   │   ├── Stores/EventStoreService.cs # EventStoreDB 操作
│   │   └── Projections/               # 事件投影/读模型
│   ├── Immortality.Shared/            # 共享库
│   │   ├── DTOs/                      # 统一 DTO + ApiResponse
│   │   ├── Models/                    # 枚举 (境界/灵根/品质/货币/业力)
│   │   └── Constants/                 # 游戏常量
│   └── Immortality.Infrastructure/    # 基础设施库
│       ├── Database/                  # PostgreSQL 设置
│       ├── Cache/                     # Redis 服务
│       ├── Storage/                   # MinIO 对象存储
│       └── Messaging/                 # 消息队列
└── tests/
    ├── Immortality.UnitTests/         # 单元测试
    └── Immortality.IntegrationTests/  # 集成测试 (Testcontainers)
```

## 服务端口

| 服务 | 端口 | 说明 |
|------|------|------|
| Gateway | 3001 | API 网关 (客户端统一入口) |
| AuthService | 5001 | 认证服务 |
| GameService | 5002 | 游戏逻辑服务 |
| RealtimeService | 5003 | 实时通信服务 |

## 快速开始

```bash
# 构建
cd server
dotnet build

# 运行认证服务
dotnet run --project src/Immortality.AuthService

# 运行游戏服务
dotnet run --project src/Immortality.GameService

# 运行实时服务
dotnet run --project src/Immortality.RealtimeService

# 运行网关
dotnet run --project src/Immortality.Gateway

# 运行测试
dotnet test
```

## 架构说明

### 事件溯源 (Event Sourcing)
- 所有状态变更以不可变事件记录到 EventStoreDB
- 流命名: `player-{id}`, `cultivation-{id}`, `combat-{id}`
- 通过重放事件重建任意时刻的状态

### CQRS 模式
- **写侧**: 命令处理 → 事件追加 → EventStoreDB
- **读侧**: 事件投影 → 物化视图 → PostgreSQL

### 分层存储
| 层级 | 存储 | 保留期 |
|------|------|--------|
| 热数据 | Redis | 30天 |
| 温数据 | PostgreSQL | 5年 |
| 冷数据 | 文件系统 | 永久 |

## 相关文档

- [后端架构设计](../doc/guides/technical/backend-architecture.md)
- [数据库设计](../doc/guides/technical/database-design.md)
- [Alpha技术栈](../doc/guides/technical/alpha-tech-stack.md)
- [部署方案](../doc/guides/technical/single-vps-deployment-plan.md)
