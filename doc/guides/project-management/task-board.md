# 任务总板

> 本文档用于追踪全项目任务状态。  
> 勾选表示“已完成且已验收”，未勾选表示待做或进行中。  
> 如需详细执行方法，请结合 [Agent执行协议](./agent-execution-protocol.md) 与 [任务模板](./task-template.md) 使用。

## 状态说明

- `[x]` 已完成并验收
- `[~]` 已实现，待验证（代码已写但未通过编译门禁或运行验证）
- `[ ]` 待做 / 进行中
- `需要你确认` 表示必须进入 [设计确认队列](./design-review-queue.md)

## 当前阶段判定

- 当前主阶段：`P0 收尾 + P1 启动`
- 当前主目标：`注册/登录 -> 创建角色 -> 获取角色 -> 修炼进度 -> 基础战斗`

## P0：项目治理与工程定型

### 仓库与规则

- [x] `P0-ARCH-001` 收敛仓库结构为 `doc/ + game/ + server/ + deploy/ + admin-panel`
- [x] `P0-ARCH-002` 移除旧 Web 客户端冲突，确认 `game/` 为唯一客户端目录
- [x] `P0-ARCH-003` 建立 `.trae/rules` 基础规则文件
- [x] `P0-ARCH-004` 修正 README、结构文档、部署文档中的客户端路径
- [x] `P0-ARCH-005` 建立 API 单一契约源（`doc/reference/api-contract.md`，含全部接口请求/响应/错误码/枚举）
- [x] `P0-ARCH-006` 建立服务注册表文档（`doc/reference/service-registry.md`，含端口/路由/依赖/健康检查）

### 环境与工程初始化

- [x] `P0-ENV-001` 在开发机安装 `.NET SDK` 并验证 `dotnet build`（实际安装 8.0.423，`global.json` rollForward 改为 `latestFeature`；`dotnet build` 0 error 0 warning，9 项目全部通过）
- [x] `P0-ENV-002` 用团结引擎打开 `game/` 并生成正式 `ProjectVersion.txt`（团结引擎 1.9.3，基底 2022.3.62t11）
- [x] `P0-ENV-003` 校正 `Packages/manifest.json` 与实际团结版本兼容性（引擎已自动解析并生成 packages-lock.json）
- [x] `P0-ENV-004` 为 `game/` 增加最小场景、启动入口与基础 GameObject 装配（Main.scene + GameManager 已通过 Codely Bridge 创建）
- [~] `P0-ENV-005` 验证 Docker 基础设施可本地启动（`deploy/docker/docker-compose.yml` 已就绪，需人工执行 `docker-compose up -d` 验证）

### 数据库初始化

- [x] `P0-DB-001` 创建 EF Core 初始迁移并验证 `Users`、`Players`、`GameEvents`、`PlayerSnapshots` 等基础表生成（AuthDbContext 生成 Users 表，GameDbContext 生成 Players/GameEvents/PlayerSnapshots 三张表）
- [x] `P0-DB-002` 约定本地数据库初始化、迁移执行与回滚步骤（`doc/guides/technical/database-migration-guide.md`）

### 协作与文档治理

- [x] `P0-PM-001` 建立总计划文档
- [x] `P0-PM-002` 建立任务总板
- [x] `P0-PM-003` 建立设计确认队列
- [x] `P0-PM-004` 建立 Agent 执行协议
- [x] `P0-PM-005` 建立任务模板
- [x] `P0-PM-006` 约定任务认领流程、更新频率与完成回写方式（协议已增强，本轮已实际执行验证）

## P1：MVP 核心纵切

### 认证与账号

- [x] `P1-AUTH-001` 真实 JWT 生成与服务端校验（编译通过，TokenService 使用 SymmetricSecurityKey + HmacSha256）
- [x] `P1-AUTH-002` Gateway JWT 校验配置（编译通过，Gateway 使用本地 JWT 校验参数）
- [~] `P1-AUTH-003` 客户端登录后注入 Bearer Token（代码已实现，待团结引擎编译验证）
- [ ] `P1-AUTH-004` 增加 token 有效性检查与自动登录验证
- [ ] `P1-AUTH-005` 增加刷新 token 或重新登录策略
- [ ] `P1-AUTH-006` 增加认证错误码与客户端提示映射

### 角色创建与玩家状态

- [ ] `P1-CHAR-001` 实现“登录后检查是否已有角色”的服务端与客户端流程
- [ ] `P1-CHAR-002` 实现角色创建接口联调
- [ ] `P1-CHAR-003` 实现客户端创角界面与最小输入校验
- [ ] `P1-CHAR-004` 实现 `PlayerDataManager` 角色加载与缓存
- [ ] `P1-CHAR-005` 完成 `PlayerDto -> PlayerData` 的完整映射
- [ ] `P1-CHAR-006` 明确首版角色字段与创角必填项 `需要你确认`

### 修炼系统

- [ ] `P1-CULT-001` 实现修炼进度查询闭环
- [ ] `P1-CULT-002` 实现基础修炼推进与服务端记录
- [ ] `P1-CULT-003` 实现突破判定接口与客户端调用
- [ ] `P1-CULT-004` 实现修炼界面最小可视化
- [ ] `P1-CULT-005` 固定时间倍率、调试倍率与离线结算策略 `需要你确认`
- [ ] `P1-CULT-006` 固定首版突破失败惩罚与保护机制 `需要你确认`

### 基础战斗

- [ ] `P1-COMB-001` 定义首版战斗模式：自动 / 半自动 / 手动 `需要你确认`
- [ ] `P1-COMB-002` 实现基础敌人数据结构与服务端战斗结果接口
- [ ] `P1-COMB-003` 实现团结引擎单场景战斗最小原型
- [ ] `P1-COMB-004` 实现战斗结果回写角色状态
- [ ] `P1-COMB-005` 完成首版伤害公式与资源消耗公式 `需要你确认`

### 背包、掉落与最小成长

- [ ] `P1-INV-001` 定义首版物品分类与背包字段
- [ ] `P1-INV-002` 实现战斗掉落结算
- [ ] `P1-INV-003` 实现背包读取接口与客户端展示
- [ ] `P1-INV-004` 实现首版装备或道具使用逻辑
- [ ] `P1-INV-005` 明确首批物品池与稀有度规则 `需要你确认`

### 客户端主流程

- [ ] `P1-UI-001` 明确首版主界面信息架构 `需要你确认`
- [ ] `P1-UI-002` 实现登录 -> 创角 -> 主界面 -> 修炼/战斗导航
- [ ] `P1-UI-003` 实现基础 HUD、消息提示、错误提示
- [ ] `P1-UI-004` 实现首版场景切换与加载页
- [ ] `P1-UI-005` 固定 UI 风格方向与参考图 `需要你确认`

### 服务端稳定性

- [ ] `P1-SRV-001` 为核心 API 增加最小单元测试
- [ ] `P1-SRV-002` 为认证、角色、修炼增加集成测试
- [ ] `P1-SRV-003` 完善日志结构与错误响应
- [ ] `P1-SRV-004` 完善增量数据库迁移流程与版本管理约定
- [ ] `P1-SRV-005` 评估 EventSourcing 在 MVP 阶段的裁剪范围

## P2：MVP 打磨与内容补足

### 数据与配置管线

- [ ] `P2-DATA-001` 建立文档/表格到游戏配置的转换脚本
- [ ] `P2-DATA-002` 建立配置校验器，检查枚举、ID、引用关系
- [ ] `P2-DATA-003` 建立首版怪物、地图、物品、任务配置表
- [ ] `P2-DATA-004` 设计首版 ScriptableObject 资产生成流程

### 内容制作

- [ ] `P2-CONT-001` 确定首版区域规模：城镇 / 野外 / 秘境 `需要你确认`
- [ ] `P2-CONT-002` 制作首批怪物与掉落
- [ ] `P2-CONT-003` 制作首批角色成长内容
- [ ] `P2-CONT-004` 制作首条新手任务链
- [ ] `P2-CONT-005` 制作首批 UI 素材与临时美术

### 体验与平衡

- [ ] `P2-BAL-001` 定义新手前 30 分钟目标体验 `需要你确认`
- [ ] `P2-BAL-002` 建立首版修炼 / 战斗 / 掉落平衡表
- [ ] `P2-BAL-003` 建立调试面板或 GM 命令
- [ ] `P2-BAL-004` 进行第一轮可玩性测试并回收结论

### 观测与问题定位

- [ ] `P2-OBS-001` 建立关键日志与追踪字段
- [ ] `P2-OBS-002` 建立修炼、登录、战斗、掉落基础埋点
- [ ] `P2-OBS-003` 建立服务健康检查与最小告警

## P3：Alpha 前验证

### 压力与运行

- [ ] `P3-OPS-001` 建立本地与测试环境部署脚本
- [ ] `P3-OPS-002` 验证 PostgreSQL / Redis / EventStore / MinIO 组合运行
- [ ] `P3-OPS-003` 建立首版压测脚本
- [ ] `P3-OPS-004` 建立故障排查 SOP

### 质量与验收

- [ ] `P3-QA-001` 建立冒烟测试清单
- [ ] `P3-QA-002` 建立回归测试清单
- [ ] `P3-QA-003` 建立已知问题与修复节奏管理
- [ ] `P3-QA-004` 建立玩家反馈接入流程

## P4：Alpha 扩展与 Beta 准备

- [ ] `P4-SOC-001` 设计宗门 / 好友 / 组队最小模型
- [ ] `P4-ECO-001` 设计更完整经济系统边界
- [ ] `P4-DGN-001` 扩展副本矩阵与成长节奏
- [ ] `P4-CONT-001` 扩展世界区域与中期玩法
- [ ] `P4-RISK-001` 复核 IP、合规、商业边界 `需要你确认`

## 当前优先认领顺序

> 已完成：P0-ENV-001 ✅、P0-DB-001 ✅

建议下一批执行器按下面顺序认领：

1. ~~`P0-ENV-001` 安装并验证 `.NET SDK`~~ ✅ 已完成
2. ~~`P0-DB-001` 创建初始数据库迁移并验证基础表生成~~ ✅ 已完成
3. `P0-ENV-002` 初始化团结引擎真实工程（人工主导，AI 辅助）
4. `P0-DB-002` 约定本地数据库初始化、迁移执行与回滚步骤
5. `P1-CHAR-001` 登录后角色检查流程
6. `P1-CHAR-002` 角色创建联调
7. `P1-CHAR-004` 玩家数据管理器落地
8. `P1-CULT-001` 修炼进度查询闭环

## 后续开发注意事项

> 以下提示来自 P0 阶段实际执行中发现的问题，后续执行器必须注意：

1. **EventStore.Client 包名变更**：v23+ 的 NuGet 包名是 `EventStore.Client.Grpc.Streams`（不是 `EventStore.Client`），`Position.FromInt64` 已移除，使用 `Position.Start` 替代。
2. **AddStackExchangeRedisCache 需要额外包**：`Microsoft.Extensions.Caching.StackExchangeRedis` 8.0.2 必须显式引用，`StackExchange.Redis` 不包含此扩展方法。
3. **EventStoreClient 必须手动注册 DI**：`builder.Services.AddSingleton(new EventStoreClient(EventStoreClientSettings.Create(connectionString)))`，不会自动注册。
4. **CA2007 与 TreatWarningsAsErrors 冲突**：已在 `.editorconfig` 中将 CA2007 设为 `none`，后续不要在代码中手动添加 `.ConfigureAwait(false)`（除非有特殊需求）。
5. **global.json rollForward 为 latestFeature**：允许 SDK 8.0.4xx 匹配 8.0.200 的请求，不要改回 latestMinor。
6. **EF Core 迁移位置**：AuthService 迁移在 `src/Immortality.AuthService/Migrations/`，GameService 迁移在 `src/Immortality.GameService/Migrations/`，新增迁移时指定 `--project` 和 `--startup-project` 为同一项目。
7. **P0-DB-002 尚未完成**：首次运行时需要 PostgreSQL 实例，执行 `dotnet ef database update` 来创建表。或在 Program.cs 中添加 `dbContext.Database.Migrate()` 实现自动迁移。

## 当前你需要优先确认的事项

建议你优先完成下面 6 项确认：

1. UI 视觉风格
2. 首版战斗操作方式
3. 首版角色创建字段
4. 时间倍率与离线结算策略
5. 首版突破惩罚
6. 首版地图与内容范围
