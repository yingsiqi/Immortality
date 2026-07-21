# 数据库初始化与迁移指南

> 本文档约定本地开发环境的数据库初始化、迁移执行和回滚步骤。

## 前置条件

- PostgreSQL 15+ 运行中（可通过 Docker 或本地安装）
- `dotnet-ef` 工具已安装（`dotnet tool install -g dotnet-ef --version 8.0.2`）
- 连接字符串在 `appsettings.json` 中配置正确

## 首次初始化

### 1. 启动 PostgreSQL

```bash
# 使用 Docker
docker run -d --name immortality-postgres \
  -e POSTGRES_DB=immortality \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:15-alpine
```

### 2. 执行迁移

```bash
cd server

# AuthService — 创建 Users 表
dotnet ef database update \
  --project src/Immortality.AuthService \
  --startup-project src/Immortality.AuthService

# GameService — 创建 Players, GameEvents, PlayerSnapshots 表
dotnet ef database update \
  --project src/Immortality.GameService \
  --startup-project src/Immortality.GameService
```

> 注意：EF 工具运行时会启动 Program.cs，`HostAbortedException` 是正常行为，不是错误。

### 3. 验证表生成

```sql
-- 连接到 immortality 数据库
\c immortality

-- 查看所有表
\dt

-- 预期结果：
-- __EFMigrationsHistory (EF Core 内部表)
-- Users (AuthService)
-- Players, GameEvents, PlayerSnapshots (GameService)
```

## 日常迁移工作流

### 新增迁移

当修改了 DbContext 实体后：

```bash
cd server

# AuthService 新增迁移
dotnet ef migrations add <MigrationName> \
  --project src/Immortality.AuthService \
  --startup-project src/Immortality.AuthService \
  --output-dir Migrations

# GameService 新增迁移
dotnet ef migrations add <MigrationName> \
  --project src/Immortality.GameService \
  --startup-project src/Immortality.GameService \
  --output-dir Migrations
```

### 应用迁移

```bash
dotnet ef database update \
  --project src/Immortality.AuthService \
  --startup-project src/Immortality.AuthService

dotnet ef database update \
  --project src/Immortality.GameService \
  --startup-project src/Immortality.GameService
```

### 回滚迁移

```bash
# 回滚到指定迁移
dotnet ef database update <PreviousMigrationName> \
  --project src/Immortality.AuthService \
  --startup-project src/Immortality.AuthService

# 删除最后一次迁移（未应用前）
dotnet ef migrations remove \
  --project src/Immortality.AuthService \
  --startup-project src/Immortality.AuthService
```

### 生成 SQL 脚本（不直接执行）

```bash
dotnet ef migrations script \
  --project src/Immortality.AuthService \
  --startup-project src/Immortality.AuthService \
  -o ../deploy/sql/auth-migration.sql
```

## 表结构概览

### AuthService — AuthDbContext

| 表名 | 用途 |
|------|------|
| Users | 用户账号（Id, Username, PasswordHash, Email, IsActive, CreatedAt, LastLoginAt） |

### GameService — GameDbContext

| 表名 | 用途 |
|------|------|
| Players | 玩家角色（Id, UserId, CharacterName, CultivationRealm, SpiritualRoot, SpiritualPower, Stamina, MeritPoints, Karma*） |
| GameEvents | 游戏事件记录（Id, PlayerId, EventType, EventData, CreatedAt） |
| PlayerSnapshots | 玩家快照（Id, PlayerId, SnapshotVersion, SnapshotData, CreatedAt） |

## 注意事项

1. **两个 DbContext 共享同一数据库**，但表不重叠。AuthService 管理 Users 表，GameService 管理 Players 等表。
2. **迁移文件必须提交到 Git**，位于各项目的 `Migrations/` 目录下。
3. **不要手动修改迁移文件**，需要变更时新建迁移。
4. **生产环境**使用 `dotnet ef migrations script` 生成 SQL 脚本，由 DBA 审核后执行。
5. **EventStoreDB** 不使用 EF Core 迁移，它是独立的事件存储系统。
