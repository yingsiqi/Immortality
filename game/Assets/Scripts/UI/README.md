# UI — 界面层

客户端 UI 组件与界面视图。

## 目录

| 目录 | 用途 |
|------|------|
| `Components/` | 通用 UI 组件 — 可复用的按钮、面板、弹窗等 |
| `Views/` | 功能界面 — 各游戏系统的完整界面 |

## 界面规划（Alpha 阶段）

| 界面 | 场景 | 说明 |
|------|------|------|
| LoginView | 登录 | 登录/注册 |
| MainView | 主界面 | 功能入口导航 |
| CultivationView | 修炼 | 修炼计时、境界显示、突破操作 |
| CombatView | 战斗 | 战斗场景 HUD |
| CharacterView | 角色 | 属性面板、状态显示 |
| InventoryView | 背包 | 物品列表与操作 |

## UI 技术栈

- **UGUI**: 主力 UI 框架，用于复杂界面布局
- **UI Toolkit**: 用于工具型界面（编辑器扩展、调试面板）
- **DOTween**: UI 动画与过渡效果
- **Lottie**: 复杂矢量动画播放

## 相关文档

- [UI/UX 设计](../../../doc/design/ui-ux/)
- [轻量级图形实现指南](../../../doc/guides/technical/graphics-implementation-guide.md)
