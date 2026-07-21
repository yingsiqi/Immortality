# 美术与音频

> 本目录是《Immortality》项目美术与音频资源的策划、规范和任务管理中心。

## 总体方向

### 视觉表现：2.5D 混合模式

本项目采用类似《仙境传说 RO》的 2.5D 混合视觉模式，但进一步提高 2D 质量：

| 元素 | 表现方式 | 说明 |
|------|----------|------|
| 角色 / 普通怪物 | 2D Sprite + Billboard | 8 方向行走图，贴在永远朝向摄像机的 Plane 上 |
| 场景 / 地图 | 3D 模型 | 可旋转摄像机，低多边形场景 + 程序化地形 |
| 特殊 BOSS | 真正的 3D 模型 | 关键剧情 BOSS 用 3D 建模，增强压迫感 |
| 技能特效 | 3D 粒子系统 | Unity Particle System，不依赖 2D 帧动画 |
| UI 界面 | UGUI 2D | uGUI Canvas + Sprite 切图 |

### 技术栈

| 组件 | 技术 | 说明 |
|------|------|------|
| Sprite 渲染 | Billboard + SpriteRenderer | 角色/怪物贴在 3D 场景中的 2D 平面上 |
| 摄像机 | 斜 45° 俯视，可轻微旋转 | 类似 RO 的经典视角 |
| UI 框架 | UGUI (Canvas + Image + Text) | 不使用 UI Toolkit |
| 特效引擎 | Unity Particle System | 3D 粒子，不依赖 2D 帧动画 |
| 动画 | Sprite Sheet 帧动画 | 角色/怪物的行走、待机、攻击等 |
| 资源管理 | Addressable Assets | 按需加载，减少内存 |

### 资产生产策略

```
MVP 阶段 (P1)     →  Unity 原语占位，不阻塞功能开发
风格确认后 (P2)   →  AI 生成 + 人工微调
正式内容 (P3-P4)  →  AI 生成 + 专业工具精修 + 外部资产补充
```

### AI 工具组合

| 用途 | 推荐工具 | 说明 |
|------|----------|------|
| 2D 角色/怪物 Sprite | TJGenerators (Sprite) / Midjourney / Stable Diffusion | 生成角色立绘 → 切 Sprite Sheet |
| 3D 场景模型 | TJGenerators (3D Model) / 手工搭建 | 低多边形场景用 TJGenerators 或手工 |
| 3D BOSS 模型 | TJGenerators (3D Model) | 特殊 BOSS 用 AI 生成 3D 模型 |
| UI 设计 | Figma + AI 辅助 | 布局用 Figma，图标和插画用 AI 生成 |
| 音效 | TJGenerators (Audio) / 免费音效库 | UI 音效优先，BGM 后期补 |
| 材质/纹理 | TJGenerators (Material) | 生成 PBR 材质 |

## 文档导航

- [美术风格指南](./art-style-guide) — 2.5D 混合规范、色彩体系、比例标准、Sprite 规格
- [音频设计指南](./audio-guide) — 音效分类、BGM 规划、文件格式规范
- [美术音频任务清单](./asset-tasks) — 按 P1-P4 阶段关联编程任务号的完整资源任务列表
- [AI 工具操作指南](./ai-tool-guide) — 每类资源的 AI 生成操作步骤和提示词模板

## 关联文档

- [P1 资产需求清单](../guides/technical/asset-requirements-p1.md) — MVP 阶段的占位方案和生成时机
- [设计确认队列](../guides/project-management/design-review-queue.md) — 美术风格方向待确认项
- [任务总板](../guides/project-management/task-board.md) — 编程主线任务进度
