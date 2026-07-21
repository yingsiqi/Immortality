# 音频设计指南

> 本文档定义《Immortality》的音频规范，包括音效分类、BGM 规划和文件格式标准。

## 1. 音频优先级

```
P1 (MVP)     →  UI 基础音效（按钮点击、成功/失败提示）
P2 (打磨)    →  战斗音效 + 修炼环境音
P3 (Alpha)   →  场景 BGM + BOSS 战音乐
P4 (扩展)    →  完整 BGM 套件 + 配音（如有）
```

## 2. 音效分类

### 2.1 UI 音效（P1 优先）

| 音效 ID | 名称 | 描述 | 触发场景 | 格式 |
|---------|------|------|----------|------|
| `sfx_ui_click` | 按钮点击 | 清脆的"叮"声，玉石质感 | 按钮点击 | OGG, 0.3s |
| `sfx_ui_hover` | 悬停反馈 | 轻柔的"沙"声 | 鼠标悬停 | OGG, 0.2s |
| `sfx_ui_success` | 成功提示 | 上升音调（C→E→G） | 注册成功、创建角色、突破成功 | OGG, 0.5s |
| `sfx_ui_error` | 失败提示 | 低沉的"咚"声 | 登录失败、操作错误 | OGG, 0.4s |
| `sfx_ui_open` | 面板打开 | 卷轴展开声 | 打开背包、修炼面板 | OGG, 0.5s |
| `sfx_ui_close` | 面板关闭 | 卷轴收起声 | 关闭面板 | OGG, 0.4s |
| `sfx_ui_levelup` | 升级提示 | 悠扬的钟声 | 境界提升 | OGG, 1.5s |

### 2.2 战斗音效（P2）

| 音效 ID | 名称 | 描述 | 格式 |
|---------|------|------|------|
| `sfx_attack_sword` | 剑击 | 金属碰撞声，清脆 | OGG, 0.3s |
| `sfx_attack_magic` | 法术释放 | 能量聚集 + 释放 | OGG, 0.8s |
| `sfx_hit_normal` | 普通受击 | 沉闷的撞击 | OGG, 0.3s |
| `sfx_hit_critical` | 暴击受击 | 尖锐的破裂声 | OGG, 0.4s |
| `sfx_dodge` | 闪避 | 快速的风声 | OGG, 0.2s |
| `sfx_block` | 格挡 | 金属盾击声 | OGG, 0.3s |
| `sfx_enemy_die` | 敌人死亡 | 哀嚎 + 消散 | OGG, 0.8s |
| `sfx_player_die` | 玩家死亡 | 沉重的倒地声 | OGG, 1.0s |

### 2.3 修炼音效（P2）

| 音效 ID | 名称 | 描述 | 格式 |
|---------|------|------|------|
| `sfx_cultivate_start` | 开始修炼 | 灵气聚集的"嗡"声 | OGG, 1.0s |
| `sfx_cultivate_loop` | 修炼环境音 | 空灵的呼吸循环 | OGG, 3.0s loop |
| `sfx_breakthrough` | 突破音效 | 雷鸣 + 破裂 + 仙乐 | OGG, 2.0s |
| `sfx_breakthrough_fail` | 突破失败 | 气息逆转的低鸣 | OGG, 1.0s |

### 2.4 环境音效（P3）

| 音效 ID | 名称 | 描述 | 格式 |
|---------|------|------|------|
| `sfx_env_wind` | 风 | 轻柔的风声循环 | OGG, 5.0s loop |
| `sfx_env_water` | 流水 | 溪流声循环 | OGG, 5.0s loop |
| `sfx_env_bird` | 鸟鸣 | 偶尔的鸟叫声 | OGG, 1.0s |
| `sfx_env_market` | 集市 | 嘈杂的人声循环 | OGG, 8.0s loop |

## 3. BGM 规划

### 3.1 BGM 列表

| BGM ID | 名称 | 适用场景 | 风格 | 阶段 | 时长 |
|--------|------|----------|------|------|------|
| `bgm_login` | 登录界面 | 登录/注册 | 古琴 + 笛子，悠扬 | P2 | 2-3min loop |
| `bgm_main` | 主界面/城镇 | 城镇场景 | 古筝 + 琵琶，热闹 | P3 | 3-4min loop |
| `bgm_cultivate` | 修炼 | 修炼界面 | 空灵冥想音乐 | P2 | 3min loop |
| `bgm_battle_normal` | 普通战斗 | 野外战斗 | 节奏明快的民乐 | P2 | 2-3min loop |
| `bgm_battle_boss` | BOSS 战 | BOSS 战斗 | 恢弘交响 + 民乐 | P3 | 3-4min loop |
| `bgm_dungeon` | 副本 | 副本探索 | 紧张的探险音乐 | P3 | 3min loop |
| `bgm_pvp` | PVP | 竞技场 | 激烈鼓点 + 古琴 | P4 | 2-3min loop |

### 3.2 音乐风格关键词

- **乐器**：古琴、古筝、笛子、琵琶、萧、编钟
- **氛围**：仙气、空灵、悠远、神秘
- **节奏**：修炼场景舒缓，战斗场景激昂
- **参考**：仙剑奇侠传 OST、古剑奇谭 OST、原神璃月地区 BGM

## 4. 技术规范

### 4.1 文件格式

| 类型 | 格式 | 采样率 | 比特率 | 说明 |
|------|------|--------|--------|------|
| 音效 | OGG Vorbis | 44.1kHz | 128kbps | 短音效，<5s |
| BGM | OGG Vorbis | 44.1kHz | 192kbps | 长音乐，无缝循环 |
| 环境音 | OGG Vorbis | 44.1kHz | 128kbps | 循环播放 |

### 4.2 音量标准

| 类型 | 基准音量 (dBFS) | 说明 |
|------|-----------------|------|
| BGM | -18 | 背景音乐 |
| UI 音效 | -12 | 界面操作反馈 |
| 战斗音效 | -10 | 战斗动作 |
| 环境音效 | -24 | 环境氛围 |
| 重要提示音 | -8 | 升级、突破等 |

### 4.3 Unity Audio 设置

- **Audio Listener**：挂在 Main Camera 上
- **Audio Source**：每个音效一个 AudioSource，或用 AudioManager 统一管理
- **混音**：使用 Audio Mixer 分组（Master / BGM / SFX / UI / Ambient）
- **3D 音效**：战斗音效启用 3D 空间音（距离衰减）

## 5. 资源目录

```
game/Assets/
├── Art/
│   └── Audio/
│       ├── BGM/           # 背景音乐
│       ├── SFX/           # 音效
│       │   ├── UI/        # 界面音效
│       │   ├── Combat/    # 战斗音效
│       │   ├── Cultivate/ # 修炼音效
│       │   └── Ambient/   # 环境音效
│       └── AudioMixer.mixer  # 混音器配置
```
