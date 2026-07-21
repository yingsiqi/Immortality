# AI 工具操作指南

> 本文档为每类美术/音频资源提供 AI 生成工具的操作步骤和提示词模板。

## 工具说明

| 工具 | 是什么 | 能力 | 如何调用 |
|------|--------|------|----------|
| **TJGenerators** | 团结引擎内置的 AI 资产生成器 | 生成 2D 图片、3D 模型、材质、天空盒、音乐、音效 | 团结引擎菜单 `Window → AI Generators`，或通过 Codely Bridge 用 `unity_asset` 工具触发 |
| **Codely Bridge** | 团结引擎内的 AI 编程助手（GLM5.2MAX） | 代码编写、场景操作、调用 TJGenerators API | 团结引擎内的 Codely 对话框 |
| **Midjourney** | 外部 AI 图片生成 | 高质量 2D 图片生成 | Discord / 官网，生成后手动导入 Unity |
| **Stable Diffusion** | 本地 AI 图片生成 | 可定制模型和 LoRA | 本地部署 |
| **Figma** | UI 设计工具 | 界面布局、切图、图标设计 | 在线使用，导出 PNG 导入 Unity |

> **注意**：Codely Bridge 使用的 GLM5.2MAX 是文本模型，本身不生成图片。但 Codely Bridge 可以调用 TJGenerators 的 API 来触发生成，就像它调用 `unity_scene` 创建场景一样。

## 1. 2D 角色/怪物 Sprite

### 1.1 使用 TJGenerators Sprite（推荐）

**方式 A — 通过 Codely Bridge 调用：**

在团结引擎 Codely Bridge 对话中请求生成，Codely 会调用 TJGenerators API 完成生成。

**方式 B — 手动在 TJGenerators 面板操作：**

打开 `Window → AI Generators → Sprite Generator`，输入提示词，生成后保存到 `Assets/Art/Sprites/`。

**提示词模板（中文）：**
```
生成一个修仙题材的 2D 游戏角色立绘。
角色名：{角色名}
风格：国风写意，Q版 2.5-3 头身比例
要求：
- 透明背景
- 8 方向站立姿势（上/下/左/右/左上/右上/左下/右下）
- 每个方向需要：待机、行走4帧
- 像素尺寸：512×512 每帧
- 色调：墨青为主，仙金点缀
- 参考风格：仙境传说 RO 的角色质量，但更精致
```

### 1.2 使用 Midjourney / Stable Diffusion（备选）

**步骤：**
1. 用 Midjourney 生成角色立绘单图
2. 在 Figma 或 Photoshop 中排版为 Sprite Sheet
3. 导入 Unity 并配置 Sprite 切割

**Midjourney 提示词模板（英文）：**
```
Chinese xianxia cultivator character, 2D game sprite sheet,
8-directional walking animation, idle and walk poses,
chibi proportion (2.5 head ratio), ink-blue and gold color scheme,
traditional Chinese robe, transparent background,
Ragnarok Online style but higher quality,
game asset, sprite sheet layout --ar 2:1 --v 6
```

### 1.3 Sprite Sheet 切割

在 Unity 中导入后：
1. 选中 Sprite 图片
2. Inspector → Sprite Mode → Multiple
3. 打开 Sprite Editor
4. 按 8 行（方向）× N 列（帧）网格切割
5. 命名：`{charactername}_{animation}_{direction}_{frame}`

---

## 2. 3D 场景/建筑模型

### 2.1 使用 TJGenerators 3D Model

**提示词模板：**
```
生成一个修仙题材的低多边形（Low Poly）3D 场景。
场景类型：{城镇/野外/秘境}
风格：国风低多边形，面数控制在 5000 以下
要求：
- 包含：地面、建筑、植被
- 色调：墨青为底，点缀仙金和灵气蓝
- 摄像机视角：45度俯视
- 可旋转查看
```

### 2.2 手工搭建（简单场景）

对于简单场景（如战斗测试场），可直接在 Unity 中：
1. 创建 Plane（地面）
2. 添加 Cube/Cylinder（简单建筑）
3. 赋予纯色材质
4. 添加 Directional Light + 天空盒

---

## 3. 3D BOSS 模型

### 3.1 使用 TJGenerators 3D Model

**提示词模板：**
```
生成一个修仙题材的 3D BOSS 模型。
BOSS 名称：{名称}
类型：{妖兽/魔修/远古凶兽}
风格：写实偏夸张，压迫感强
要求：
- 面数：5000-10000 tris
- 贴图：1024×1024，PBR 材质
- 骨骼：支持 Humanoid 或 Generic Rig
- 姿态：站立咆哮
- 色调：暗红色为主，黑色角/鳞片，发光眼睛
```

### 3.2 动画绑定

模型生成后：
1. 用 Mixamo（免费）自动绑定人形骨骼
2. 下载待机/行走/攻击/死亡动画
3. 导入 Unity 并配置 Animator Controller

---

## 4. UI 界面设计

### 4.1 使用 Figma

**步骤：**
1. 在 Figma 中创建 3840×2160 画板
2. 参考美术风格指南的色彩体系和字体规范
3. 设计界面布局
4. 切图导出为 PNG
5. 导入 Unity `Assets/Art/Sprites/UI/`

**Figma 设计要点：**
- 面板背景：墨青 `#2C4A6E` + 90% 透明度 + 8px 圆角
- 按钮底色：墨青，边框：仙金 `#D4A847`
- 文字：思源宋体/黑体
- 图标尺寸：128×128

### 4.2 UI 图标使用 TJGenerators

**提示词模板：**
```
生成修仙题材的游戏图标。
图标类型：{物品名/技能名/境界名}
风格：国风写意，精致小图标
要求：
- 尺寸：128×128 像素
- 透明背景
- 色调：参考品质颜色（{灰/蓝/紫/金/虹}）
```

---

## 5. 特效制作

### 5.1 Unity Particle System（手工）

特效不需要 AI 生成，在 Unity 中直接创建：

**突破特效：**
1. 创建 Particle System
2. 配置：Start Color = 仙金 `#D4A847`
3. 形状：球形爆发
4. 生命周期：1.5s
5. 附加：点光源（从暗到亮再到暗）

**攻击特效：**
1. 创建 Particle System
2. 配置：Start Color = 灵气蓝 `#4A90E2`
3. 形状：锥形向前
4. 速度：快
5. 拖尾：启用 Trail

### 5.2 使用 TJGenerators Effect Video（复杂特效）

对于复杂的技能特效，可生成 Effect Video 后转为 Sprite 动画：
1. 用 TJGenerators 生成特效视频
2. 在 Unity 中用 VideoPlayer 播放，或逐帧导出为 Sprite

---

## 6. 音效生成

### 6.1 使用 TJGenerators Audio

**提示词模板：**
```
生成一个游戏 UI 音效。
音效类型：{按钮点击/成功提示/失败提示/面板开关}
风格：修仙题材，玉石/金属质感
要求：
- 时长：{0.3-1.5}s
- 格式：OGG
- 音量基准：-12 dBFS
```

### 6.2 免费音效库（备选）

| 来源 | 网址 | 说明 |
|------|------|------|
| Freesound | freesound.org | CC 协议免费音效 |
| OpenGameArt | opengameart.org | 游戏专用免费资源 |
| Kenney.nl | kenney.nl | 免费游戏资产包 |

---

## 7. BGM 生成

### 7.1 使用 TJGenerators Music

**提示词模板：**
```
生成修仙题材的背景音乐。
场景：{登录界面/修炼/战斗/城镇}
风格：中国传统乐器（古琴、古筝、笛子、琵琶）
情绪：{悠扬/空灵/激昂/紧张}
要求：
- 时长：2-3 分钟
- 无缝循环
- 格式：OGG 192kbps
- 参考风格：仙剑奇侠传 OST
```

---

## 8. 材质/纹理生成

### 8.1 使用 TJGenerators Material

**提示词模板：**
```
生成修仙题材的 PBR 材质。
材质类型：{石头/木头/金属/布料/玉石}
风格：国风，有灵气流动感
要求：
- 尺寸：1024×1024
- PBR 通道：Albedo + Normal + Roughness
- 色调：{墨青/土黄/暗红}
```

---

## 9. 天空盒生成

### 9.1 使用 TJGenerators Skybox

**提示词模板：**
```
生成修仙题材的天空盒。
场景：{日间/黄昏/夜间/秘境}
风格：国风写意天空，有仙气云雾
要求：
- 全景 360°
- 包含：云海、远山轮廓、灵气光晕
- 色调：日间偏蓝青，黄昏偏橙金，夜间偏深紫
```

---

## 工具速查表

| 资源类型 | 首选工具 | 备选工具 | 产出格式 |
|----------|----------|----------|----------|
| 角色/怪物 Sprite | TJGenerators Sprite | Midjourney + 手工切图 | PNG Sprite Sheet |
| 3D 场景 | TJGenerators 3D Model | 手工搭建 | FBX / Unity Scene |
| 3D BOSS | TJGenerators 3D Model | — | FBX + PBR 材质 |
| UI 界面 | Figma | — | PNG 切图 |
| UI 图标 | TJGenerators Sprite | Figma 手工 | PNG 128×128 |
| 特效 | Unity Particle System | TJGenerators Effect Video | .prefab |
| 音效 | TJGenerators Audio | Freesound / OpenGameArt | OGG |
| BGM | TJGenerators Music | — | OGG loop |
| 材质 | TJGenerators Material | — | .mat + 贴图 |
| 天空盒 | TJGenerators Skybox | Unity 内置 | .mat (Skybox) |
