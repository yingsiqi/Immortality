# 任务执行规则

## 文档入口

执行任务前，优先读取：

- `doc/guides/technical/global-constraints.md` — 全局硬约束速查
- `doc/guides/project-management/task-board.md`
- `doc/guides/project-management/agent-execution-protocol.md`
- `doc/guides/project-management/design-review-queue.md`
- `doc/guides/project-management/task-template.md`

## 任务原则

- 只执行已明确的单个任务
- 先保证闭环，再扩展功能
- 先改文档，再改接口，再改代码
- 完成后必须回写任务状态

## 遇到以下情况必须暂停

- 需要决定视觉风格
- 需要决定战斗模式
- 需要决定数值节奏
- 需要决定地图范围
- 需要决定商业或合规边界

这些情况必须进入 `design-review-queue.md`，不得自行拍板。
