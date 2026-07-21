# 美术音频任务清单

> 本清单按 P1-P4 阶段组织，每个任务关联编程主线任务编号。
> 任务 ID 格式：`ART-{阶段}-{类型}-{序号}`，如 `ART-P1-SPRITE-001`。

## 任务状态说明

- `[ ]` 待做
- `[~]` 进行中
- `[x]` 已完成
- `阻塞` 等待设计确认或前置任务

---

## A0：风格确认（前置）

> 所有美术资源生成的前置条件。确认后才能进入 AI 生成阶段。

| 任务 ID | 名称 | 关联 | 状态 | 说明 |
|---------|------|------|------|------|
| `ART-A0-001` | 确认整体美术风格 | DRV-ART-001 | `[x]` | ✅ 2.5D 混合模式，Paper Doll 装备分层，4K 分辨率，墨青+仙金色彩 |
| `ART-A0-002` | 制作风格参考板 | — | `[x]` | ✅ 风格关键词和参考游戏已定义在 art-style-guide.md §6 |
| `ART-A0-003` | 确认 UI 视觉风格 | DRV-ART-002 | `[x]` | ✅ 半透明灵气面板 + 现代布局，墨青底+仙金边框，4K |
| `ART-A0-004` | 确认角色 2D 风格 | DRV-ART-001 | `[x]` | ✅ Q版 2.5-3 头身，512×512 单帧，8方向，Billboard 渲染 |

---

## P1：MVP 核心纵切

> P1 阶段默认使用 Unity 原语占位。以下任务在风格确认后执行，不阻塞编程开发。

### P1-AUTH：认证模块（无美术需求）

### P1-CHAR：角色创建

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 规格 | 状态 |
|---------|----------|------|-------------|------|------|------|
| `ART-P1-SPRITE-001` | 玩家角色待机/行走 Sprite Sheet | 2D Sprite | P1-CHAR-003, P1-COMB-003 | TJGenerators Sprite / Midjourney | 512×512, 8方向×4帧 | `[ ]` |
| `ART-P1-SPRITE-002` | 创角界面背景 | UI 背景 | P1-CHAR-003 | Midjourney / Figma | 3840×2160 | `[ ]` |
| `ART-P1-SPRITE-003` | 灵根选择图标 ×5 | 2D Sprite | P1-CHAR-003 | Figma 手工 / TJGenerators | 128×128 each | `[ ]` |
| `ART-P1-SPRITE-004` | 角色头像占位 | 2D Sprite | P1-CHAR-004 | TJGenerators | 256×256 | `[ ]` |
| `ART-P1-UI-001` | 创角界面 UI 组件 | UI 设计 | P1-CHAR-003 | Figma | — | `[ ]` |

### P1-CULT：修炼系统

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 规格 | 状态 |
|---------|----------|------|-------------|------|------|------|
| `ART-P1-SPRITE-005` | 修炼界面背景 | UI 背景 | P1-CULT-004 | Midjourney | 3840×2160 | `[ ]` |
| `ART-P1-SPRITE-006` | 境界图标 ×15 | 2D Sprite | P1-CULT-004 | Figma 手工 | 96×96 each | `[ ]` |
| `ART-P1-EFFECT-001` | 突破特效 | 粒子 | P1-CULT-003 | Unity Particle System | — | `[ ]` |
| `ART-P1-EFFECT-002` | 灵气粒子背景 | 粒子 | P1-CULT-004 | Unity Particle System | — | `[ ]` |
| `ART-P1-ANIM-001` | 打坐呼吸动画 | Sprite 动画 | P1-CULT-004 | Sprite Sheet 帧动画 | 4帧 | `[ ]` |

### P1-COMB：基础战斗

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 规格 | 状态 |
|---------|----------|------|-------------|------|------|------|
| `ART-P1-SPRITE-007` | 基础敌人待机/行走 Sprite Sheet | 2D Sprite | P1-COMB-003 | TJGenerators Sprite / Midjourney | 256×256, 8方向×4帧 | `[ ]` |
| `ART-P1-EFFECT-003` | 攻击特效 ×3 | 粒子 | P1-COMB-003 | Unity Particle System | — | `[ ]` |
| `ART-P1-EFFECT-004` | 受击特效 ×2 | 粒子 | P1-COMB-003 | Unity Particle System | — | `[ ]` |
| `ART-P1-SPRITE-008` | 技能图标 ×4 | 2D Sprite | P1-COMB-003 | Figma / TJGenerators | 128×128 each | `[ ]` |
| `ART-P1-SCENE-001` | 战斗场景（3D 低多边形） | 3D 场景 | P1-COMB-003 | TJGenerators 3D / 手工 | Plane + 简单地形 | `[ ]` |
| `ART-P1-SPRITE-009` | 玩家攻击 Sprite Sheet | 2D Sprite | P1-COMB-003 | TJGenerators Sprite | 512×512, 8方向×4帧 | `[ ]` |
| `ART-P1-SPRITE-010` | 敌人攻击 Sprite Sheet | 2D Sprite | P1-COMB-003 | TJGenerators Sprite | 256×256, 8方向×4帧 | `[ ]` |

### P1-INV：背包与掉落

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 规格 | 状态 |
|---------|----------|------|-------------|------|------|------|
| `ART-P1-SPRITE-011` | 物品图标 ×10 | 2D Sprite | P1-INV-003 | Figma / TJGenerators | 128×128 each | `[ ]` |
| `ART-P1-SPRITE-012` | 装备品质边框 ×5 | 2D Sprite | P1-INV-003 | Figma 手工 | 132×132 each | `[ ]` |
| `ART-P1-UI-002` | 背包界面 UI 组件 | UI 设计 | P1-INV-003 | Figma | — | `[ ]` |

### P1-UI：客户端主流程

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 规格 | 状态 |
|---------|----------|------|-------------|------|------|------|
| `ART-P1-UI-003` | 登录界面 UI 设计 | UI 设计 | P1-UI-002 | Figma | 3840×2160 | `[ ]` |
| `ART-P1-SPRITE-013` | 登录界面背景 | UI 背景 | P1-UI-002 | Midjourney | 3840×2160 | `[ ]` |
| `ART-P1-UI-004` | 主界面 HUD 设计 | UI 设计 | P1-UI-002 | Figma | — | `[ ]` |
| `ART-P1-SPRITE-014` | 导航按钮图标 ×4 | 2D Sprite | P1-UI-002 | Figma / TJGenerators | 96×96 each | `[ ]` |
| `ART-P1-UI-005` | 加载页设计 | UI 设计 | P1-UI-004 | Figma | 3840×2160 | `[ ]` |
| `ART-P1-UI-006` | 错误提示弹窗设计 | UI 设计 | P1-UI-003 | Figma | — | `[ ]` |

### P1-AUDIO：音频

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 规格 | 状态 |
|---------|----------|------|-------------|------|------|------|
| `ART-P1-AUDIO-001` | UI 按钮点击音效 | 音效 | P1-UI-003 | TJGenerators Audio / 免费音效库 | OGG 0.3s | `[ ]` |
| `ART-P1-AUDIO-002` | 成功提示音效 | 音效 | P1-CHAR-002 | TJGenerators Audio | OGG 0.5s | `[ ]` |
| `ART-P1-AUDIO-003` | 失败提示音效 | 音效 | P1-UI-003 | TJGenerators Audio | OGG 0.4s | `[ ]` |
| `ART-P1-AUDIO-004` | 面板开关音效 | 音效 | P1-UI-002 | TJGenerators Audio | OGG 0.5s | `[ ]` |
| `ART-P1-AUDIO-005` | 升级/突破提示音效 | 音效 | P1-CULT-003 | TJGenerators Audio | OGG 1.5s | `[ ]` |

---

## P2：MVP 打磨与内容补足

### P2-CHAR：角色内容扩展

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 状态 |
|---------|----------|------|-------------|------|------|
| `ART-P2-SPRITE-001` | 玩家角色全套动画（待机/行走/攻击/受击/死亡） | Sprite Sheet | P2-CONT-003 | TJGenerators + 手工切图 | `[ ]` |
| `ART-P2-SPRITE-002` | NPC 角色 Sprite ×5 | Sprite Sheet | P2-CONT-004 | TJGenerators Sprite | `[ ]` |
| `ART-P2-SPRITE-003` | 角色头像 ×5 | 2D Sprite | P2-CONT-003 | TJGenerators | `[ ]` |

### P2-COMB：战斗内容扩展

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 状态 |
|---------|----------|------|-------------|------|------|
| `ART-P2-SPRITE-004` | 普通怪物 Sprite ×8 | Sprite Sheet | P2-CONT-002 | TJGenerators Sprite | `[ ]` |
| `ART-P2-SPRITE-005` | 精英怪物 Sprite ×3 | Sprite Sheet | P2-CONT-002 | TJGenerators Sprite | `[ ]` |
| `ART-P2-SPRITE-006` | 玩家技能图标扩展 ×8 | 2D Sprite | P2-CONT-003 | Figma / TJGenerators | `[ ]` |
| `ART-P2-EFFECT-001` | 技能特效扩展 ×8 | 粒子 | P2-CONT-003 | Unity Particle System | `[ ]` |

### P2-SCENE：场景

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 状态 |
|---------|----------|------|-------------|------|------|
| `ART-P2-SCENE-001` | 城镇场景（3D 低多边形） | 3D 场景 | P2-CONT-001 | TJGenerators 3D / 手工 | `[ ]` |
| `ART-P2-SCENE-002` | 野外场景（3D 低多边形） | 3D 场景 | P2-CONT-001 | TJGenerators 3D / 手工 | `[ ]` |
| `ART-P2-SCENE-003` | 秘境/副本场景 | 3D 场景 | P2-CONT-001 | TJGenerators 3D | `[ ]` |
| `ART-P2-SCENE-004` | 天空盒 ×3 | 天空盒 | P2-CONT-001 | TJGenerators Skybox | `[ ]` |

### P2-INV：物品内容

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 状态 |
|---------|----------|------|-------------|------|------|
| `ART-P2-SPRITE-007` | 装备图标扩展 ×20 | 2D Sprite | P2-DATA-003 | Figma / TJGenerators | `[ ]` |
| `ART-P2-SPRITE-008` | 消耗品图标 ×10 | 2D Sprite | P2-DATA-003 | Figma / TJGenerators | `[ ]` |
| `ART-P2-SPRITE-009` | 材料图标 ×15 | 2D Sprite | P2-DATA-003 | Figma / TJGenerators | `[ ]` |

### P2-AUDIO：音频扩展

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 状态 |
|---------|----------|------|-------------|------|------|
| `ART-P2-AUDIO-001` | 战斗音效套件 ×8 | 音效 | P2-CONT-002 | TJGenerators Audio | `[ ]` |
| `ART-P2-AUDIO-002` | 修炼环境音 ×3 | 音效 | P2-CONT-003 | TJGenerators Audio / 免费音效库 | `[ ]` |
| `ART-P2-AUDIO-003` | 登录界面 BGM | BGM | P2-CONT-005 | TJGenerators Music | `[ ]` |
| `ART-P2-AUDIO-004` | 修炼界面 BGM | BGM | P2-CONT-003 | TJGenerators Music | `[ ]` |

---

## P3：Alpha 前验证

### P3-BOSS：3D BOSS

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 规格 | 状态 |
|---------|----------|------|-------------|------|------|------|
| `ART-P3-MODEL-001` | 首个 3D BOSS 模型 | 3D 模型 | P3-OPS-002 | TJGenerators 3D Model | 5K-10K tris | `[ ]` |
| `ART-P3-MODEL-002` | BOSS 动画套件 | 3D 动画 | P3-OPS-002 | TJGenerators / Mixamo | 7 个状态 | `[ ]` |

### P3-AUDIO：完整音频

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 状态 |
|---------|----------|------|-------------|------|------|
| `ART-P3-AUDIO-001` | 城镇 BGM | BGM | — | TJGenerators Music | `[ ]` |
| `ART-P3-AUDIO-002` | 普通战斗 BGM | BGM | — | TJGenerators Music | `[ ]` |
| `ART-P3-AUDIO-003` | BOSS 战 BGM | BGM | — | TJGenerators Music | `[ ]` |
| `ART-P3-AUDIO-004` | 副本 BGM | BGM | — | TJGenerators Music | `[ ]` |
| `ART-P3-AUDIO-005` | 环境音效套件 ×4 | 音效 | — | 免费音效库 | `[ ]` |

---

## P4：Alpha 扩展与 Beta 准备

| 任务 ID | 资源名称 | 类型 | 关联编程任务 | 工具 | 状态 |
|---------|----------|------|-------------|------|------|
| `ART-P4-SPRITE-001` | 宗门 NPC Sprite ×10 | Sprite Sheet | P4-SOC-001 | TJGenerators Sprite | `[ ]` |
| `ART-P4-SCENE-001` | 扩展地图场景 ×3 | 3D 场景 | P4-CONT-001 | TJGenerators 3D | `[ ]` |
| `ART-P4-MODEL-001` | 扩展 3D BOSS ×2 | 3D 模型 | P4-DGN-001 | TJGenerators 3D Model | `[ ]` |
| `ART-P4-SPRITE-002` | 扩展装备/物品图标 ×30 | 2D Sprite | P4-ECO-001 | Figma / TJGenerators | `[ ]` |
| `ART-P4-AUDIO-001` | PVP 场景 BGM | BGM | P4-SOC-001 | TJGenerators Music | `[ ]` |
| `ART-P4-SPRITE-003` | 扩展怪物 Sprite ×15 | Sprite Sheet | P4-CONT-001 | TJGenerators Sprite | `[ ]` |

---

## 任务依赖关系图

```
ART-A0-001 (风格确认)
  ├──→ ART-P1-SPRITE-001 (玩家角色)
  ├──→ ART-P1-SPRITE-007 (基础敌人)
  ├──→ ART-P1-SPRITE-013 (登录背景)
  ├──→ ART-P1-UI-003 (登录UI)
  └──→ 所有 P1 美术任务

ART-A0-003 (UI风格确认)
  ├──→ ART-P1-UI-001 (创角UI)
  ├──→ ART-P1-UI-002 (背包UI)
  └──→ ART-P1-UI-004 (主界面HUD)

编程任务关联：
P1-CHAR-003 (创角界面) ← ART-P1-SPRITE-002, ART-P1-SPRITE-003, ART-P1-UI-001
P1-COMB-003 (战斗原型) ← ART-P1-SPRITE-007, ART-P1-SPRITE-009, ART-P1-SPRITE-010, ART-P1-EFFECT-003
P1-CULT-004 (修炼界面) ← ART-P1-SPRITE-005, ART-P1-SPRITE-006, ART-P1-EFFECT-001
```

## 执行建议

1. **先确认风格**（ART-A0-001~004）— 这是所有美术工作的前置条件
2. **P1 美术不阻塞编程** — 编程用 Unity 原语占位，美术在风格确认后并行推进
3. **批量生成** — Sprite 类资源建议一次性生成一个角色的全套 8 方向动画
4. **音效先行** — UI 音效生成快、需求明确，可在 P1 阶段优先完成
