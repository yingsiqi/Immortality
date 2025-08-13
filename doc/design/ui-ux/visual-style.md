# 视觉风格指南

## 设计理念

### 修仙主题
- **古典韵味**: 融入中国传统文化元素
- **现代简约**: 保持界面简洁清晰
- **神秘氛围**: 营造修仙世界的神秘感

### 轻量化原则
- **SVG优先**: 使用矢量图形确保清晰度
- **Emoji表达**: 利用系统表情减少资源加载
- **极简设计**: 去除不必要的装饰元素

## 配色方案

### 主色调

#### 仙境蓝 (Celestial Blue)
```css
--primary-color: #4A90E2;        /* 主要蓝色 */
--primary-light: #7BB3F0;        /* 浅蓝色 */
--primary-dark: #2E5A87;         /* 深蓝色 */
```

#### 灵气紫 (Spiritual Purple)
```css
--secondary-color: #8E44AD;      /* 主要紫色 */
--secondary-light: #B19CD9;      /* 浅紫色 */
--secondary-dark: #5B2C6F;       /* 深紫色 */
```

### 辅助色彩

#### 功能色彩
```css
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
```

#### 中性色彩
```css
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
```

### 渐变色彩

#### 修炼进度渐变
```css
--gradient-cultivation: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

#### 装备品质渐变
```css
--gradient-common: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);     /* 普通 */
--gradient-uncommon: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);   /* 优秀 */
--gradient-rare: linear-gradient(135deg, #3498db 0%, #2980b9 100%);       /* 稀有 */
--gradient-epic: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);       /* 史诗 */
--gradient-legendary: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);  /* 传说 */
--gradient-mythic: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);     /* 神话 */
```

## 字体规范

### 字体族

#### 中文字体
```css
--font-family-zh: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'SimSun', '宋体', sans-serif;
```

#### 英文字体
```css
--font-family-en: 'Inter', 'Helvetica Neue', 'Arial', sans-serif;
```

#### 等宽字体
```css
--font-family-mono: 'Fira Code', 'Monaco', 'Consolas', 'Courier New', monospace;
```

### 字体大小

#### 标题字体
```css
--font-size-h1: 2.5rem;    /* 40px - 页面主标题 */
--font-size-h2: 2rem;      /* 32px - 区块标题 */
--font-size-h3: 1.5rem;    /* 24px - 小节标题 */
--font-size-h4: 1.25rem;   /* 20px - 子标题 */
--font-size-h5: 1.125rem;  /* 18px - 小标题 */
--font-size-h6: 1rem;      /* 16px - 最小标题 */
```

#### 正文字体
```css
--font-size-large: 1.125rem;   /* 18px - 大号正文 */
--font-size-base: 1rem;        /* 16px - 基础正文 */
--font-size-small: 0.875rem;   /* 14px - 小号正文 */
--font-size-xs: 0.75rem;       /* 12px - 极小正文 */
```

### 字体权重

```css
--font-weight-light: 300;      /* 细体 */
--font-weight-normal: 400;     /* 正常 */
--font-weight-medium: 500;     /* 中等 */
--font-weight-semibold: 600;   /* 半粗 */
--font-weight-bold: 700;       /* 粗体 */
--font-weight-black: 900;      /* 特粗 */
```

### 行高规范

```css
--line-height-tight: 1.2;     /* 紧密行高 - 标题 */
--line-height-normal: 1.5;     /* 正常行高 - 正文 */
--line-height-loose: 1.8;      /* 宽松行高 - 阅读 */
```

## 图标系统

### SVG图标

#### 系统图标
- **导航图标**: 简洁的线性图标
- **功能图标**: 填充式图标
- **状态图标**: 圆形背景图标

#### 图标尺寸
```css
--icon-xs: 12px;    /* 极小图标 */
--icon-sm: 16px;    /* 小图标 */
--icon-md: 20px;    /* 中等图标 */
--icon-lg: 24px;    /* 大图标 */
--icon-xl: 32px;    /* 特大图标 */
```

### Emoji表情

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
  background: var(--primary-color);
  color: var(--text-inverse);
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}
```

#### 次要按钮
```css
.btn-secondary {
  background: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: var(--text-inverse);
}
```

### 卡片设计

```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
```

### 输入框设计

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-medium);
  border-radius: 6px;
  font-size: var(--font-size-base);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}
```

## 布局规范

### 间距系统

```css
--spacing-xs: 4px;     /* 极小间距 */
--spacing-sm: 8px;     /* 小间距 */
--spacing-md: 16px;    /* 中等间距 */
--spacing-lg: 24px;    /* 大间距 */
--spacing-xl: 32px;    /* 特大间距 */
--spacing-2xl: 48px;   /* 超大间距 */
--spacing-3xl: 64px;   /* 巨大间距 */
```

### 圆角规范

```css
--radius-sm: 4px;      /* 小圆角 */
--radius-md: 6px;      /* 中等圆角 */
--radius-lg: 8px;      /* 大圆角 */
--radius-xl: 12px;     /* 特大圆角 */
--radius-full: 50%;    /* 圆形 */
```

### 阴影规范

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);                    /* 小阴影 */
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);                    /* 中等阴影 */
--shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.15);                  /* 大阴影 */
--shadow-xl: 0 8px 32px rgba(0, 0, 0, 0.2);                   /* 特大阴影 */
--shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.1);          /* 内阴影 */
```

## 动画效果

### 过渡动画

```css
--transition-fast: 0.1s ease;        /* 快速过渡 */
--transition-normal: 0.2s ease;      /* 正常过渡 */
--transition-slow: 0.3s ease;        /* 慢速过渡 */
```

### 缓动函数

```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);        /* 标准缓动 */
--ease-out: cubic-bezier(0, 0, 0.2, 1);             /* 出场缓动 */
--ease-in: cubic-bezier(0.4, 0, 1, 1);              /* 入场缓动 */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 弹跳缓动 */
```

### 关键帧动画

#### 淡入动画
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### 脉冲动画
```css
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
```

#### 旋转动画
```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## 响应式设计

### 断点规范

```css
--breakpoint-xs: 480px;    /* 超小屏幕 */
--breakpoint-sm: 768px;    /* 小屏幕 */
--breakpoint-md: 1024px;   /* 中等屏幕 */
--breakpoint-lg: 1280px;   /* 大屏幕 */
--breakpoint-xl: 1536px;   /* 超大屏幕 */
```

### 媒体查询

```css
/* 移动端优先 */
@media (min-width: 768px) {
  /* 平板及以上 */
}

@media (min-width: 1024px) {
  /* 桌面及以上 */
}

@media (min-width: 1280px) {
  /* 大屏桌面 */
}
```

## 主题切换

### 深色主题

```css
[data-theme="dark"] {
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

### 高对比度主题

```css
[data-theme="high-contrast"] {
  --primary-color: #0066cc;
  --text-primary: #000000;
  --bg-primary: #ffffff;
  --border-medium: #000000;
}
```

## 品牌元素

### Logo设计
- **简洁性**: 保持Logo简洁易识别
- **可缩放**: 确保在不同尺寸下清晰可见
- **单色版本**: 提供单色版本用于特殊场景

### 品牌色彩
- **主品牌色**: 仙境蓝 (#4A90E2)
- **辅助色**: 灵气紫 (#8E44AD)
- **强调色**: 金丹黄 (#F39C12)

### 视觉语言
- **现代简约**: 去除多余装饰
- **东方韵味**: 融入传统文化元素
- **科技感**: 体现现代Web技术