# 项目管理总览

本目录是《Immortality》项目的总控中心，用来管理完整开发计划、任务切分、设计确认事项，以及多 agent 协作执行规则。

## 当前目标

- 以 `doc/` 作为策划、规则、架构与任务的单一事实源
- 以 `game/` 作为唯一客户端工程目录
- 以 `server/` 作为唯一服务端工程目录
- 先完成 `认证 -> 角色 -> 修炼 -> 基础战斗` 的 MVP 纵切
- 后续由 `TRAE IDE / Codex / Claude Code` 等执行器按任务领取、开发与校验

## 文档导航

- [AI驱动开发总计划](./ai-driven-development-plan.md)
- [任务总板](./task-board.md)
- [当前可领取任务包](./current-task-packs.md)
- [设计确认队列](./design-review-queue.md)
- [Agent执行协议](./agent-execution-protocol.md)
- [任务模板](./task-template.md)
- [阶段审查清单](./review-checklist.md)
- [Alpha开发计划（历史方案）](./alpha-development-plan.md)

### 关联技术文档

- [全局硬约束](../technical/global-constraints.md) — 仓库/API/客户端/服务端/任务的不可违反约束
- [P1 资产需求清单](../technical/asset-requirements-p1.md) — MVP 阶段所需资产及占位策略
- [技术栈总览](../technical/alpha-tech-stack.md) — 客户端+服务端完整技术栈
- [开发环境搭建](../technical/development-environment.md) — Docker/VS Code/SDK 配置指南

## 使用方式

### 1. 看全貌

先读 [AI驱动开发总计划](./ai-driven-development-plan.md)，明确项目阶段、工作流和里程碑。

### 2. 看当前任务

再读 [任务总板](./task-board.md)，确认当前阶段已完成、待做和阻塞项。

### 3. 看需要你确认的方向

涉及美术风格、UI风格、战斗手感、数值节奏、音频方向、商业约束等内容时，统一进入 [设计确认队列](./design-review-queue.md)。

### 4. 分发给执行器

当你把某个任务交给 `TRAE IDE`、`Codex` 或 `Claude Code` 时，要求它先按 [Agent执行协议](./agent-execution-protocol.md) 读取上下文，再执行任务。

### 5. 维护进度

每次任务完成后：

- 更新 `任务总板`
- 如有设计结论，更新 `设计确认队列`
- 如有接口或结构变更，先更新文档，再修改代码

## 协作角色

- **你**：项目负责人，负责方向确认、设计决策和最终验收
- **TRAE Work / 当前助手**：总体规划、任务拆分、文档治理、阶段调度
- **TRAE IDE / Codex / Claude Code**：按任务执行开发、重构、测试和校验
- **VitePress 文档**：对全项目公开当前真实状态

## 当前管理原则

- 不再引入第二套客户端实现
- 不让聊天记录取代仓库文档
- 不让任务只存在于临时对话中
- 不让执行器自由发明接口、端口和目录结构
