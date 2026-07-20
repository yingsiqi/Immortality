# Core — 核心框架

游戏客户端的核心基础设施，提供全局管理器、系统基类和工具函数。

## 目录

| 目录 | 用途 |
|------|------|
| `Managers/` | Singleton 全局管理器 — GameManager 为根，协调所有子系统 |
| `Systems/` | 系统抽象基类 — GameSystem，所有功能系统继承此类 |
| `Utilities/` | 工具函数 — EventHub 事件总线、GameUtility 通用工具 |

## Manager 职责

| Manager | 职责 |
|---------|------|
| `GameManager` | 游戏生命周期管理，协调所有子管理器 |
| `AuthManager` | 用户注册/登录/Token管理/自动登录 |
| `UIManager` | 界面切换、弹窗管理、界面栈 |
| `NetworkManager` | HTTP API 与实时通信连接管理 |
| `PlayerDataManager` | 玩家数据加载、缓存、同步 |
| `CultivationManager` | 修炼计时、灵力积累、突破判定（核心系统） |
