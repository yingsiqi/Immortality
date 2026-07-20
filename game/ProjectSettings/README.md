# ProjectSettings 初始化说明

- `game/` 已作为团结引擎客户端工程根目录保留
- 首次在团结引擎中打开该目录时，请固定实际编辑器版本并生成正式的 `ProjectVersion.txt`
- 生成后的 `ProjectSettings` 变更应提交到 Git，作为客户端工程设置的单一事实源
- 包依赖以 `Packages/manifest.json` 为起点，再根据团结引擎版本校正
