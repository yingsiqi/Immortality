# 当前可领取任务包

> 本文档提供当前最适合立即执行的任务包。  
> 每个任务包都已经补齐目标、上下文、范围、验收标准和验证方式，适合直接分发给 `TRAE IDE`、`Codex` 或 `Claude Code`。

## TASK: P0-ENV-001 安装并验证 .NET SDK

### 目标

让 `server/` 在当前开发机上具备真实编译能力，为后续所有服务端任务解锁基础验证。

### 输入上下文

- `server/global.json`
- `server/Immortality.sln`
- `doc/guides/project-management/task-board.md`
- `doc/guides/project-management/agent-execution-protocol.md`

### 本任务要做

- 检查当前机器是否安装 `.NET SDK 8.0.200`
- 若未安装，给出或执行安装步骤
- 在 `server/` 下执行 `dotnet build`
- 记录编译结果与阻塞项

### 本任务不做

- 不修改业务逻辑
- 不改服务端架构

### 验收标准

- [ ] 当前机器可识别 `.NET SDK 8.0.200`
- [ ] `server/` 可执行 `dotnet build`
- [ ] 若仍失败，失败信息已记录到任务回写

### 验证方式

- `dotnet --list-sdks`
- `cd server && dotnet build`

## TASK: P0-ENV-002 初始化团结引擎真实工程

### 目标

把 `game/` 从“规则化骨架”升级为“真实可打开的团结引擎工程”。

### 输入上下文

- `game/README.md`
- `game/Packages/manifest.json`
- `game/ProjectSettings/README.md`
- `.trae/rules/03-game-client.md`

### 本任务要做

- 使用团结引擎打开 `game/`
- 生成正式 `ProjectVersion.txt`
- 校正 `Packages/manifest.json`
- 确保 `Assets/` 与 `ProjectSettings/` 可被编辑器识别

### 本任务不做

- 不做正式玩法开发
- 不引入大量第三方插件

### 验收标准

- [ ] `game/` 可被团结引擎正常打开
- [ ] `ProjectSettings/ProjectVersion.txt` 已生成
- [ ] 包依赖与编辑器版本兼容

### 验证方式

- 团结引擎打开工程无致命报错
- 重新导入后 `Assets/Scripts` 可见

## TASK: P1-CHAR-001 登录后检查是否已有角色

### 目标

在登录成功后，客户端能够判定当前账号是否已有角色，并据此进入“主界面”或“创角流程”。

### 输入上下文

- `game/Assets/Scripts/Network/Api/ApiClient.cs`
- `game/Assets/Scripts/Core/Managers/AuthManager.cs`
- `server/src/Immortality.GameService/Controllers/GameControllers.cs`
- `server/src/Immortality.GameService/Services/GameServices.cs`
- `doc/guides/project-management/task-board.md`

### 本任务要做

- 登录后调用 `/api/player/me`
- 当返回“未创建角色”时，客户端进入创角分支
- 当返回角色数据时，客户端进入主界面分支
- 统一处理未认证、未创建角色和服务异常三类状态

### 本任务不做

- 不做完整创角 UI 美术
- 不做角色创建提交

### 验收标准

- [ ] 登录后会主动检查当前角色状态
- [ ] 无角色账号不会错误进入主界面
- [ ] 有角色账号可以进入主界面
- [ ] 错误提示可区分未认证与未创建角色

### 验证方式

- 新账号登录
- 已有角色账号登录
- 失效 token 登录

## TASK: P1-CHAR-002 角色创建接口联调

### 目标

完成客户端与服务端的角色创建闭环。

### 输入上下文

- `server/src/Immortality.GameService/Controllers/GameControllers.cs`
- `server/src/Immortality.GameService/Services/GameServices.cs`
- `server/src/Immortality.Shared/DTOs/Dtos.cs`
- `game/Assets/Scripts/Network/Api/ApiClient.cs`
- `doc/core-systems/character/`

### 本任务要做

- 确认首版创角 DTO 字段
- 客户端提交角色创建请求
- 服务端创建角色并返回 `PlayerDto`
- 创建成功后客户端更新本地玩家状态

### 本任务不做

- 不扩展复杂创角参数
- 不做完整捏脸或复杂外观系统

### 验收标准

- [ ] 创建角色接口请求与返回闭环可用
- [ ] 创建成功后再次请求 `/api/player/me` 能拿到该角色
- [ ] 重复创建、非法字段、未认证都有明确反馈

### 依赖

- `P1-CHAR-001`
- 角色创建字段若未定稿，需先参考 `设计确认队列`

## TASK: P1-CHAR-004 PlayerDataManager 角色加载与缓存

### 目标

把客户端玩家状态统一收敛到 `PlayerDataManager`，避免页面各自直接取接口。

### 输入上下文

- `game/Assets/Scripts/Core/Managers/PlayerDataManager.cs`
- `game/Assets/Scripts/Data/Models/PlayerData.cs`
- `game/Assets/Scripts/Network/Api/ApiClient.cs`
- `.trae/rules/03-game-client.md`

### 本任务要做

- 为 `PlayerDataManager` 增加加载、缓存、刷新接口
- 把角色读取集中到该管理器
- 暴露给主界面、修炼页、背包页的统一读接口

### 本任务不做

- 不在此任务中接完整背包和战斗系统
- 不做离线存档体系

### 验收标准

- [ ] `PlayerDataManager` 可统一加载当前玩家数据
- [ ] UI 层不再自行拼接 API 调用
- [ ] 角色创建成功后本地状态可立即刷新

## TASK: P1-CULT-001 修炼进度查询闭环

### 目标

让客户端能正确读取并展示玩家当前修炼进度。

### 输入上下文

- `server/src/Immortality.GameService/Controllers/GameControllers.cs`
- `server/src/Immortality.GameService/Services/GameServices.cs`
- `game/Assets/Scripts/Core/Managers/CultivationManager.cs`
- `game/Assets/Scripts/Network/Api/ApiClient.cs`
- `doc/core-systems/cultivation/`

### 本任务要做

- 客户端调用修炼进度接口
- 把数据映射到客户端模型
- 在修炼界面或调试面板上展示关键字段
- 验证无角色状态下的行为

### 本任务不做

- 不做完整突破 UI
- 不做复杂离线结算

### 验收标准

- [ ] 玩家进入修炼界面时可看到当前进度
- [ ] 关键字段至少包含境界、层数、突破机会或灵力量
- [ ] 无角色状态不会导致异常

## 分发建议

- `TRAE IDE`：`P1-CHAR-001`、`P1-CHAR-004`
- `Codex`：`P1-CHAR-002`
- `Claude Code`：独立审查 `P1-CHAR-001 ~ P1-CULT-001` 的接口与状态流
