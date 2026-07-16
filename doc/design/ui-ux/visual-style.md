# 视觉风格指南

## 设计理念

### 修仙主题
- **古典韵味**: 融入中国传统文化元素
- **现代简约**: 保持界面简洁清晰
- **神秘氛围**: 营造修仙世界的神秘感

### 轻量化原则
- **Unity Sprite优先**: 使用矢量精灵图确保清晰度
- **Particle System特效**: 利用粒子系统减少资源加载
- **极简设计**: 去除不必要的装饰元素

## 配色方案

### 主色调

#### 仙境蓝 (Celestial Blue)
```css
:root {
  --primary-color: #4A90E2;        /* 主要蓝色 */
  --primary-light: #7BB3F0;        /* 浅蓝色 */
  --primary-dark: #2E5A87;         /* 深蓝色 */
}
```

#### 灵气紫 (Spiritual Purple)
```css
:root {
  --secondary-color: #8E44AD;      /* 主要紫色 */
  --secondary-light: #B19CD9;      /* 浅紫色 */
  --secondary-dark: #5B2C6F;       /* 深紫色 */
}
```

### 辅助色彩

#### 功能色彩
```css
:root {
  /* 成功 - 生机绿 */
  --success-color: #27AE60;
  --success-light: #58D68D;
  --success-dark: #1E8449;

  /* 警告 - 金丹黄 */
  --warning-color: #F39C12;
  --warning-light: #F8C471;
  --warning-dark: #B7950B;

  /* 错误 - 心魔红 */
  --error-color: #E74C3C;
  --error-light: #F1948A;
  --error-dark: #A93226;

  /* 信息 - 天青蓝 */
  --info-color: #3498DB;
  --info-light: #85C1E9;
  --info-dark: #2471A3;
}
```

#### 中性色彩
```css
:root {
  /* 文字颜色 */
  --text-primary: #2C3E50;         /* 主要文字 */
  --text-secondary: #7F8C8D;       /* 次要文字 */
  --text-disabled: #BDC3C7;        /* 禁用文字 */
  --text-inverse: #FFFFFF;         /* 反色文字 */

  /* 背景颜色 */
  --bg-primary: #FFFFFF;           /* 主背景 */
  --bg-secondary: #F8F9FA;         /* 次背景 */
  --bg-tertiary: #E9ECEF;          /* 三级背景 */
  --bg-dark: #2C3E50;              /* 深色背景 */

  /* 边框颜色 */
  --border-light: #E9ECEF;         /* 浅色边框 */
  --border-medium: #DEE2E6;        /* 中等边框 */
  --border-dark: #ADB5BD;          /* 深色边框 */
}
```

### 渐变色彩

#### 修炼进度渐变
```css
:root {
  --gradient-cultivation: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

#### 装备品质渐变
```css
:root {
  --gradient-common: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);     /* 普通 */
  --gradient-uncommon: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);   /* 优秀 */
  --gradient-rare: linear-gradient(135deg, #3498db 0%, #2980b9 100%);       /* 稀有 */
  --gradient-epic: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);       /* 史诗 */
  --gradient-legendary: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);  /* 传说 */
  --gradient-mythic: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);     /* 神话 */
}
```

## 字体规范

### 字体族

#### 中文字体
```css
:root {
  --font-family-zh: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'SimSun', '宋体', sans-serif;
}
```

#### 英文字体
```css
:root {
  --font-family-en: 'Inter', 'Helvetica Neue', 'Arial', sans-serif;
}
```

#### 等宽字体
```css
:root {
  --font-family-mono: 'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace;
}
```

### 字体大小

#### 标题字体
```css
:root {
  --font-size-h1: 40px;    /* 页面主标题 */
  --font-size-h2: 32px;    /* 区块标题 */
  --font-size-h3: 24px;    /* 小节标题 */
  --font-size-h4: 20px;    /* 子标题 */
  --font-size-h5: 18px;    /* 小标题 */
  --font-size-h6: 16px;    /* 最小标题 */
}
```

#### 正文字体
```css
:root {
  --font-size-large: 18px;   /* 大号正文 */
  --font-size-base: 16px;    /* 基础正文 */
  --font-size-small: 14px;    /* 小号正文 */
  --font-size-xs: 12px;      /* 极小正文 */
}
```

### 字体权重

```css
:root {
  --font-weight-light: 300;      /* 细体 */
  --font-weight-normal: 400;     /* 正常 */
  --font-weight-medium: 500;     /* 中等 */
  --font-weight-semibold: 600;   /* 半粗 */
  --font-weight-bold: 700;       /* 粗体 */
  --font-weight-black: 900;      /* 特粗 */
}
```

### 行高规范

```css
:root {
  --line-height-tight: 1.2;     /* 紧密行高 - 标题 */
  --line-height-normal: 1.5;    /* 正常行高 - 正文 */
  --line-height-loose: 1.8;     /* 宽松行高 - 阅读 */
}
```

## 图标系统

### Unity Sprite图标

#### 系统图标
- **导航图标**: 简洁的线性Sprite图标
- **功能图标**: 填充式Sprite图标
- **状态图标**: 圆形背景Sprite图标

#### 图标尺寸
```css
:root {
  --icon-xs: 12px;    /* 极小图标 */
  --icon-sm: 16px;    /* 小图标 */
  --icon-md: 20px;    /* 中等图标 */
  --icon-lg: 24px;    /* 大图标 */
  --icon-xl: 32px;    /* 特大图标 */
}
```

### Sprite表情

#### 功能分类
```
🧙‍♂️ 角色相关: 🧙‍♂️👤🎭🏃‍♂️💪
⚔️ 战斗相关: ⚔️🛡️🏹🔥❄️
📚 修炼相关: 📚🧘‍♂️💊⚡🌟
💎 装备相关: 💎⚒️🔧💍👑
🏰 场景相关: 🏰🏔️🌸🌙☀️
👥 社交相关: 👥💬❤️🤝🎉
📋 任务相关: 📋✅❌⏰🎯
💰 经济相关: 💰💎🛒📈📊
```

#### 状态表示
```
✅ 成功/完成
❌ 失败/错误
⚠️ 警告/注意
ℹ️ 信息/提示
🔄 加载/处理中
⏸️ 暂停
▶️ 开始/播放
⏹️ 停止
```

## 组件样式

### 按钮设计

#### 主要按钮
```css
.btn-primary {
  background-color: var(--primary-color);
  color: var(--text-inverse);
  border-color: transparent;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: var(--font-weight-medium);
}
```

```csharp
// 主要按钮交互逻辑（C# MonoBehaviour + DOTween）
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;

public class PrimaryButton : MonoBehaviour
{
    [SerializeField] private Button button;
    [SerializeField] private Image background;

    private void Start()
    {
        button.onClick.AddListener(OnClick);
    }

    // 悬停效果 - 通过 Unity Event Trigger 或 IPointerEnterHandler 实现
    public void OnPointerEnter()
    {
        background.color = ThemeManager.Instance.PrimaryDark;
        transform.DOMoveY(transform.position.y + 1f, 0.2f);
    }

    // 点击效果
    private void OnClick()
    {
        transform.DOScale(0.95f, 0.1f).OnComplete(() =>
        {
            transform.DOScale(1f, 0.1f);
        });
    }
}
```

#### 次要按钮
```css
.btn-secondary {
  background-color: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
  border-width: 1px;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: var(--font-weight-medium);
}
```

```csharp
// 次要按钮交互逻辑
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;

public class SecondaryButton : MonoBehaviour
{
    [SerializeField] private Button button;
    [SerializeField] private Image background;
    [SerializeField] private Text label;

    public void OnPointerEnter()
    {
        background.color = ThemeManager.Instance.PrimaryColor;
        label.color = ThemeManager.Instance.TextInverse;
    }

    public void OnPointerExit()
    {
        background.color = Color.clear;
        label.color = ThemeManager.Instance.PrimaryColor;
    }
}
```

### 卡片设计

```css
.card {
  background-color: var(--bg-primary);
  border-color: var(--border-light);
  border-width: 1px;
  border-radius: 8px;
  padding: 20px;
}
```

```csharp
// 卡片交互逻辑（UGUI + DOTween）
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;

public class CardComponent : MonoBehaviour
{
    [SerializeField] private RectTransform rectTransform;
    [SerializeField] private CanvasGroup canvasGroup;

    private Vector3 originalPosition;

    private void Start()
    {
        originalPosition = rectTransform.position;
    }

    public void OnPointerEnter()
    {
        rectTransform.DOMoveY(originalPosition.y + 2f, 0.2f);
    }

    public void OnPointerExit()
    {
        rectTransform.DOMoveY(originalPosition.y, 0.2f);
    }

    // 卡片淡入动画
    public void PlayFadeIn()
    {
        canvasGroup.alpha = 0f;
        canvasGroup.DOFade(1f, 0.3f);
    }
}
```

### 输入框设计

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border-color: var(--border-medium);
  border-width: 1px;
  border-radius: 6px;
  font-size: var(--font-size-base);
}
```

```csharp
// 输入框交互逻辑（UGUI InputField + Event System）
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class CustomInput : MonoBehaviour, ISelectHandler, IDeselectHandler
{
    [SerializeField] private InputField inputField;
    [SerializeField] private Image borderImage;
    [SerializeField] private string placeholder = "请输入...";

    public void OnSelect(BaseEventData eventData)
    {
        // 焦点高亮边框
        borderImage.color = ThemeManager.Instance.PrimaryColor;
    }

    public void OnDeselect(BaseEventData eventData)
    {
        // 恢复默认边框
        borderImage.color = ThemeManager.Instance.BorderMedium;
    }
}
```

## 布局规范

### 间距系统

```css
:root {
  --spacing-xs: 4px;     /* 极小间距 */
  --spacing-sm: 8px;     /* 小间距 */
  --spacing-md: 16px;    /* 中等间距 */
  --spacing-lg: 24px;    /* 大间距 */
  --spacing-xl: 32px;    /* 特大间距 */
  --spacing-2xl: 48px;   /* 超大间距 */
  --spacing-3xl: 64px;   /* 巨大间距 */
}
```

### 圆角规范

```css
:root {
  --radius-sm: 4px;      /* 小圆角 */
  --radius-md: 6px;      /* 中等圆角 */
  --radius-lg: 8px;      /* 大圆角 */
  --radius-xl: 12px;     /* 特大圆角 */
  --radius-full: 50%;    /* 圆形 */
}
```

### 阴影规范

```css
:root {
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);     /* 小阴影 */
  --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);     /* 中等阴影 */
  --shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.15);   /* 大阴影 */
  --shadow-xl: 0 8px 32px rgba(0, 0, 0, 0.2);   /* 特大阴影 */
}
```

## 动画效果

### 过渡动画

```css
:root {
  --transition-fast: 0.1s;        /* 快速过渡 */
  --transition-normal: 0.2s;      /* 正常过渡 */
  --transition-slow: 0.3s;        /* 慢速过渡 */
}
```

### 缓动函数

```csharp
// DOTween 缓动函数映射
using DG.Tweening;

public static class EasingFunctions
{
    // 标准缓动 - 对应 CSS cubic-bezier(0.4, 0, 0.2, 1)
    public static readonly Ease EaseInOut = Ease.InOutQuad;

    // 出场缓动 - 对应 CSS cubic-bezier(0, 0, 0.2, 1)
    public static readonly Ease EaseOut = Ease.OutQuad;

    // 入场缓动 - 对应 CSS cubic-bezier(0.4, 0, 1, 1)
    public static readonly Ease EaseIn = Ease.InQuad;

    // 弹跳缓动 - 对应 CSS cubic-bezier(0.68, -0.55, 0.265, 1.55)
    public static readonly Ease EaseBounce = Ease.OutBack;
}
```

### 关键帧动画

#### 淡入动画
```csharp
// Unity Animation / DOTween 实现淡入动画
using UnityEngine;
using DG.Tweening;

public class FadeInAnimation : MonoBehaviour
{
    [SerializeField] private CanvasGroup canvasGroup;
    [SerializeField] private RectTransform rectTransform;

    public void PlayFadeIn()
    {
        // 初始状态
        canvasGroup.alpha = 0f;
        rectTransform.anchoredPosition = new Vector2(
            rectTransform.anchoredPosition.x,
            rectTransform.anchoredPosition.y - 10f
        );

        // 动画播放
        canvasGroup.DOFade(1f, 0.3f).SetEase(Ease.OutQuad);
        rectTransform.DOAnchorPosY(
            rectTransform.anchoredPosition.y + 10f, 0.3f
        ).SetEase(Ease.OutQuad);
    }
}
```

#### 脉冲动画
```csharp
// Unity Animation / DOTween 实现脉冲动画
using UnityEngine;
using DG.Tweening;

public class PulseAnimation : MonoBehaviour
{
    [SerializeField] private Transform target;
    [SerializeField] private float scaleAmount = 1.05f;
    [SerializeField] private float duration = 0.5f;

    private void Start()
    {
        // 循环脉冲缩放
        target.DOScale(scaleAmount, duration / 2f)
            .SetEase(Ease.InOutQuad)
            .SetLoops(-1, LoopType.Yoyo);
    }
}
```

#### 旋转动画
```csharp
// Unity Animation / DOTween 实现旋转动画
using UnityEngine;
using DG.Tweening;

public class SpinAnimation : MonoBehaviour
{
    [SerializeField] private Transform target;
    [SerializeField] private float duration = 1f;

    private void Start()
    {
        // 无限旋转
        target.DORotate(new Vector3(0, 0, -360f), duration, RotateMode.FastBeyond360)
            .SetEase(Ease.Linear)
            .SetLoops(-1, LoopType.Restart);
    }
}
```

## 屏幕适配设计

### 分辨率断点

```css
:root {
  --breakpoint-xs: 480px;    /* 超小屏幕 */
  --breakpoint-sm: 768px;    /* 小屏幕 */
  --breakpoint-md: 1024px;   /* 中等屏幕 */
  --breakpoint-lg: 1280px;   /* 大屏幕 */
  --breakpoint-xl: 1536px;   /* 超大屏幕 */
}
```

### Canvas Scaler配置

```csharp
// Unity Canvas Scaler 屏幕适配配置
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(CanvasScaler))]
public class ResponsiveCanvasScaler : MonoBehaviour
{
    [SerializeField] private CanvasScaler canvasScaler;

    // 分辨率断点
    private readonly Vector2 breakpointSM = new Vector2(768, 1024);
    private readonly Vector2 breakpointMD = new Vector2(1024, 768);
    private readonly Vector2 breakpointLG = new Vector2(1280, 720);

    private void Start()
    {
        ConfigureCanvasScaler();
    }

    private void ConfigureCanvasScaler()
    {
        Vector2 screenSize = new Vector2(Screen.width, Screen.height);

        if (screenSize.x >= 1280)
        {
            // 大屏桌面 - 按宽度缩放
            canvasScaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            canvasScaler.referenceResolution = new Vector2(1920, 1080);
            canvasScaler.matchWidthOrHeight = 0.5f;
        }
        else if (screenSize.x >= 768)
        {
            // 平板 - 按宽度缩放
            canvasScaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            canvasScaler.referenceResolution = new Vector2(1024, 768);
            canvasScaler.matchWidthOrHeight = 0.5f;
        }
        else
        {
            // 手机 - 按高度缩放
            canvasScaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            canvasScaler.referenceResolution = new Vector2(750, 1334);
            canvasScaler.matchWidthOrHeight = 0f;
        }
    }
}
```

## 主题切换

### 深色主题

```css
/* 深色主题 USS 变量覆盖 */
.theme-dark {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #404040;
  
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --text-disabled: #666666;
  
  --border-light: #404040;
  --border-medium: #525252;
  --border-dark: #666666;
}
```

```csharp
// ScriptableObject 主题管理器
using UnityEngine;

[CreateAssetMenu(fileName = "ThemeConfig", menuName = "Immortality/Theme Config")]
public class ThemeConfig : ScriptableObject
{
    public ThemeType themeType;

    [Header("深色主题")]
    public Color darkBgPrimary = new Color(0.1f, 0.1f, 0.1f);
    public Color darkBgSecondary = new Color(0.176f, 0.176f, 0.176f);
    public Color darkTextPrimary = Color.white;
    public Color darkTextSecondary = new Color(0.7f, 0.7f, 0.7f);

    [Header("浅色主题")]
    public Color lightBgPrimary = Color.white;
    public Color lightBgSecondary = new Color(0.973f, 0.973f, 0.976f);
    public Color lightTextPrimary = new Color(0.173f, 0.243f, 0.314f);
    public Color lightTextSecondary = new Color(0.498f, 0.549f, 0.553f);

    public Color GetBgPrimary() => themeType == ThemeType.Dark ? darkBgPrimary : lightBgPrimary;
    public Color GetTextPrimary() => themeType == ThemeType.Dark ? darkTextPrimary : lightTextPrimary;
}

public enum ThemeType { Light, Dark, HighContrast }
```

### 高对比度主题

```css
/* 高对比度主题 USS 变量覆盖 */
.theme-high-contrast {
  --primary-color: #0066cc;
  --text-primary: #000000;
  --bg-primary: #ffffff;
  --border-medium: #000000;
}
```

## 品牌元素

### Logo设计
- **简洁性**: 保持Logo简洁易识别
- **可缩放**: 确保在不同尺寸下清晰可见（Unity Sprite多分辨率适配）
- **单色版本**: 提供单色版本用于特殊场景

### 品牌色彩
- **主品牌色**: 仙境蓝 (#4A90E2)
- **辅助色**: 灵气紫 (#8E44AD)
- **强调色**: 金丹黄 (#F39C12)

### 视觉语言
- **现代简约**: 去除多余装饰
- **东方韵味**: 融入传统文化元素
- **引擎特性**: 体现Tuanjie引擎渲染能力