# 全局硬约束

> 本文档汇总项目所有不可违反的硬约束，供执行器快速速查。
> 详细规则见 `.trae/rules/01-04` 和各模块 README。

## 仓库结构约束

| 约束 | 说明 |
|------|------|
| `game/` 是唯一客户端目录 | 禁止引入第二个 Web 客户端或替代前端 |
| `doc/` 是唯一设计文档源 | 禁止在代码目录内散落设计文档 |
| `server/` 是唯一服务端目录 | 微服务全部在此目录下 |
| `deploy/` 是唯一部署配置目录 | Docker/K8s/Nginx 配置统一在此 |
| 禁止创建与现有模块重复的架构 | 新功能必须归入已有目录结构 |

## API 与网络约束

| 约束 | 说明 |
|------|------|
| 客户端不得绕过 Gateway | 客户端只连接 Gateway (:3001)，不得直连内部服务 |
| 服务端口固定 | Gateway:3001 / Auth:5001 / Game:5002 / Realtime:5003 |
| API 契约需文档化 | 接口变更前先更新 `doc/reference/` 或 OpenAPI 定义 |
| DTO 在 Shared 库定义 | 跨服务共享的 DTO 放在 `Immortality.Shared` |

## 客户端约束

| 约束 | 说明 |
|------|------|
| 引擎 | 团结引擎 (Tuanjie Engine) 1.7.3+，C# |
| 架构 | ScriptableObject 数据驱动 + Singleton Manager |
| 脚本目录 | `Core/`（管理器）、`Features/`（功能模块）、`Network/`（网络层）、`Data/`（数据层）、`UI/`（界面层） |
| 常量集中 | 游戏常量统一在 `GameConstants.cs` |
| MVP 范围 | 认证、角色、修炼、基础战斗——不扩展到未规划系统 |

## 服务端约束

| 约束 | 说明 |
|------|------|
| 框架 | .NET 8 / ASP.NET Core |
| 架构 | 微服务 + 事件溯源 (Event Sourcing) + CQRS |
| 数据库 | PostgreSQL（读模型）、EventStoreDB（事件流）、Redis（缓存/背板） |
| 认证 | JWT + BCrypt，Gateway 统一校验 |
| 日志 | Serilog 结构化日志 |

## 任务执行约束

| 约束 | 说明 |
|------|------|
| 先文档后代码 | 结构/接口变更先更新文档，再改代码 |
| 单任务单目标 | 一个任务只解决一个清晰目标 |
| 编译门禁 | 服务端 `dotnet build` 0 error 才可标记完成 |
| Git 检查点 | 每个任务一个提交，不混合多个任务 |
| 设计决策暂停 | 美术/战斗/数值/地图/商业方向不确定时，写入设计确认队列 |
| 不伪完成 | TODO 占位不算完成 |

## 技术栈版本

| 组件 | 版本 |
|------|------|
| .NET SDK | 8.0.200 |
| 团结引擎 | 1.7.3+ |
| PostgreSQL | 15 |
| Redis | 7 |
| EventStoreDB | 23 |
| Node.js (admin-panel) | 18+ |

## 文件保护

| 规则 | 说明 |
|------|------|
| `.gitkeep` 文件 | 不得删除，它们保持目录结构 |
| `.gitignore` | 已排除 `Library/`、`Temp/`、`Obj/`、`Bin/`、`node_modules/` 等 |
| `.meta` 文件 | Unity 资产 `.meta` 文件需与资产一起删除或提交 |
