# 服务注册表

> 本文档统一说明所有微服务的端口、职责、依赖和健康检查端点。
> 变更服务端口或新增服务时，必须先更新本文档。

## 服务总览

| 服务 | 端口 | 职责 | 项目路径 |
|------|------|------|----------|
| Gateway | 3001 | API 网关，反向代理 + JWT 校验 | `server/src/Immortality.Gateway/` |
| AuthService | 5001 | 用户注册、登录、JWT 生成 | `server/src/Immortality.AuthService/` |
| GameService | 5002 | 游戏逻辑：角色、修炼、战斗 | `server/src/Immortality.GameService/` |
| RealtimeService | 5003 | SignalR 实时通信 | `server/src/Immortality.RealtimeService/` |

## 基础设施

| 组件 | 端口 | 用途 | Docker 镜像 |
|------|------|------|-------------|
| PostgreSQL | 5432 | 读模型数据库 | `postgres:15-alpine` |
| Redis | 6379 | 缓存、SignalR 背板、Hangfire 队列 | `redis:7-alpine` |
| EventStoreDB | 2113 (HTTP) / 1113 (TCP) | 事件存储 | `eventstore/eventstore:23.3.0-bookworm-slim` |
| MinIO | 9000 (API) / 9001 (控制台) | 对象存储 | `minio/minio:latest` |

## 服务依赖关系

```
客户端
  ↓ (HTTP + WebSocket)
Gateway (:3001)
  ├──→ AuthService (:5001)     → PostgreSQL, Redis
  ├──→ GameService (:5002)     → PostgreSQL, Redis, EventStoreDB
  └──→ RealtimeService (:5003) → Redis (背板)
```

## 路由规则 (Gateway)

| 路径前缀 | 转发目标 | 认证 |
|----------|----------|------|
| `/api/auth/**` | AuthService | 否 |
| `/api/player/**` | GameService | 是 |
| `/api/cultivation/**` | GameService | 是 |
| `/api/health` | GameService | 否 |
| `/realtime/**` | RealtimeService (WebSocket) | 是 |

## 健康检查

| 服务 | 端点 |
|------|------|
| AuthService | `GET /api/auth/health` |
| GameService | `GET /api/health` |
| Gateway | 通过转发到上游服务 |

## 数据库连接

| 服务 | DbContext | 连接字符串名 |
|------|-----------|-------------|
| AuthService | `AuthDbContext` | `ConnectionStrings:PostgreSQL` |
| GameService | `GameDbContext` | `ConnectionStrings:PostgreSQL` |

两个 DbContext 共享同一个 PostgreSQL 实例，但使用不同的表。

## 事件流命名

| 流前缀 | 用途 | 示例 |
|--------|------|------|
| `player-{id}` | 玩家生命周期事件 | `player-a1b2c3d4-...` |
| `cultivation-{id}` | 修炼进度与突破事件 | `cultivation-a1b2c3d4-...` |
| `combat-{id}` | 战斗事件 | `combat-a1b2c3d4-...` |
