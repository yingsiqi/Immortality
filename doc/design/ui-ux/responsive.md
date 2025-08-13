# 响应式设计

## 设计原则

### 移动优先
- **Mobile First**: 从最小屏幕开始设计
- **渐进增强**: 逐步增加大屏幕功能
- **内容优先**: 确保核心内容在所有设备上可访问

### 流式布局
- **弹性网格**: 使用百分比和弹性单位
- **灵活图片**: 图片自适应容器大小
- **可伸缩文字**: 文字大小随屏幕调整

### 触摸友好
- **合适的触摸目标**: 最小44px的可点击区域
- **手势支持**: 支持滑动、缩放等手势
- **避免悬停**: 不依赖鼠标悬停效果

## 断点系统

### 断点定义

```css
/* 断点变量 */
:root {
  --breakpoint-xs: 320px;   /* 超小屏幕 - 小型手机 */
  --breakpoint-sm: 480px;   /* 小屏幕 - 大型手机 */
  --breakpoint-md: 768px;   /* 中等屏幕 - 平板竖屏 */
  --breakpoint-lg: 1024px;  /* 大屏幕 - 平板横屏/小型桌面 */
  --breakpoint-xl: 1280px;  /* 超大屏幕 - 桌面 */
  --breakpoint-2xl: 1536px; /* 巨大屏幕 - 大型桌面 */
}
```

### 媒体查询

```css
/* 移动端优先的媒体查询 */

/* 基础样式 - 320px+ */
.container {
  width: 100%;
  padding: 0 16px;
}

/* 小屏幕 - 480px+ */
@media (min-width: 480px) {
  .container {
    padding: 0 20px;
  }
}

/* 中等屏幕 - 768px+ */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 24px;
  }
}

/* 大屏幕 - 1024px+ */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
    padding: 0 32px;
  }
}

/* 超大屏幕 - 1280px+ */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}

/* 巨大屏幕 - 1536px+ */
@media (min-width: 1536px) {
  .container {
    max-width: 1400px;
  }
}
```

## 布局适配

### 网格系统

#### 弹性网格
```css
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr; /* 移动端单列 */
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* 平板双列 */
    gap: 20px;
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr); /* 桌面三列 */
    gap: 24px;
  }
}

@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(4, 1fr); /* 大屏四列 */
    gap: 32px;
  }
}
```

#### 侧边栏布局
```css
.layout {
  display: flex;
  flex-direction: column; /* 移动端垂直布局 */
}

.sidebar {
  order: 2; /* 移动端侧边栏在下方 */
}

.main {
  order: 1;
  flex: 1;
}

@media (min-width: 768px) {
  .layout {
    flex-direction: row; /* 平板及以上水平布局 */
  }
  
  .sidebar {
    order: 1;
    width: 250px;
    flex-shrink: 0;
  }
  
  .main {
    order: 2;
  }
}
```

### 导航适配

#### 移动端导航
```css
/* 汉堡菜单 */
.nav-toggle {
  display: block;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.nav-menu {
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  box-shadow: var(--shadow-lg);
  z-index: 1000;
}

.nav-menu.active {
  display: block;
}

.nav-item {
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-light);
}

@media (min-width: 768px) {
  .nav-toggle {
    display: none;
  }
  
  .nav-menu {
    display: flex;
    position: static;
    background: none;
    box-shadow: none;
  }
  
  .nav-item {
    display: inline-block;
    padding: 8px 16px;
    border-bottom: none;
  }
}
```

#### 底部导航（移动端）
```css
.bottom-nav {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-light);
  z-index: 1000;
}

.bottom-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 12px;
}

.bottom-nav-item.active {
  color: var(--primary-color);
}

.bottom-nav-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

@media (min-width: 768px) {
  .bottom-nav {
    display: none;
  }
}
```

## 组件适配

### 按钮适配

```css
.btn {
  padding: 12px 20px;
  font-size: 16px;
  min-height: 44px; /* 触摸友好的最小高度 */
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 移动端按钮更大 */
@media (max-width: 767px) {
  .btn {
    padding: 16px 24px;
    font-size: 18px;
    min-height: 48px;
  }
  
  .btn-full {
    width: 100%;
  }
}

/* 桌面端按钮可以更紧凑 */
@media (min-width: 1024px) {
  .btn {
    padding: 10px 16px;
    font-size: 14px;
    min-height: 36px;
  }
}
```

### 表单适配

```css
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px; /* 防止iOS缩放 */
  border: 1px solid var(--border-medium);
  border-radius: 6px;
  min-height: 44px;
}

@media (min-width: 768px) {
  .form-row {
    display: flex;
    gap: 16px;
  }
  
  .form-col {
    flex: 1;
  }
}

@media (min-width: 1024px) {
  .form-input {
    font-size: 14px;
    padding: 10px 14px;
    min-height: 40px;
  }
}
```

### 卡片适配

```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  .card {
    padding: 20px;
    margin-bottom: 20px;
  }
}

@media (min-width: 1024px) {
  .card {
    padding: 24px;
    margin-bottom: 24px;
  }
}

/* 卡片网格 */
.card-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
}
```

## 文字适配

### 响应式字体

```css
/* 流式字体大小 */
.text-responsive {
  font-size: clamp(14px, 4vw, 18px);
}

/* 标题响应式 */
h1 {
  font-size: clamp(24px, 6vw, 40px);
  line-height: 1.2;
}

h2 {
  font-size: clamp(20px, 5vw, 32px);
  line-height: 1.3;
}

h3 {
  font-size: clamp(18px, 4vw, 24px);
  line-height: 1.4;
}

/* 正文字体 */
.text-body {
  font-size: 16px;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .text-body {
    font-size: 18px;
    line-height: 1.7;
  }
}

@media (min-width: 1024px) {
  .text-body {
    font-size: 16px;
    line-height: 1.6;
  }
}
```

### 文字截断

```css
/* 单行截断 */
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 多行截断 */
.text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 768px) {
  .text-clamp {
    -webkit-line-clamp: 3;
  }
}
```

## 图片适配

### 响应式图片

```css
.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}

/* 图片容器 */
.img-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.img-container:hover img {
  transform: scale(1.05);
}
```

### 图片网格

```css
.img-grid {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .img-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
}

@media (min-width: 1024px) {
  .img-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}
```

## 交互适配

### 触摸优化

```css
/* 触摸目标最小尺寸 */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 触摸反馈 */
.touch-feedback {
  position: relative;
  overflow: hidden;
}

.touch-feedback::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.touch-feedback:active::after {
  width: 200px;
  height: 200px;
}
```

### 手势支持

```css
/* 滑动容器 */
.swipe-container {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.swipe-item {
  scroll-snap-align: start;
  flex-shrink: 0;
}

/* 缩放容器 */
.zoom-container {
  touch-action: pan-x pan-y pinch-zoom;
}
```

## 性能优化

### 图片优化

```html
<!-- 响应式图片 -->
<picture>
  <source media="(min-width: 1024px)" srcset="image-large.webp">
  <source media="(min-width: 768px)" srcset="image-medium.webp">
  <img src="image-small.webp" alt="描述" loading="lazy">
</picture>

<!-- 自适应图片 -->
<img 
  src="image-small.webp" 
  srcset="image-small.webp 480w, image-medium.webp 768w, image-large.webp 1024w"
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
  alt="描述"
  loading="lazy"
>
```

### CSS优化

```css
/* 使用CSS变量减少重复 */
:root {
  --container-padding: 16px;
}

@media (min-width: 768px) {
  :root {
    --container-padding: 24px;
  }
}

@media (min-width: 1024px) {
  :root {
    --container-padding: 32px;
  }
}

.container {
  padding: 0 var(--container-padding);
}
```

### JavaScript优化

```javascript
// 响应式断点检测
const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280
};

function getCurrentBreakpoint() {
  const width = window.innerWidth;
  
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
}

// 防抖的resize监听
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const currentBreakpoint = getCurrentBreakpoint();
    document.body.setAttribute('data-breakpoint', currentBreakpoint);
  }, 100);
});
```

## 测试策略

### 设备测试

#### 移动设备
- **iPhone SE**: 375×667
- **iPhone 12**: 390×844
- **iPhone 12 Pro Max**: 428×926
- **Samsung Galaxy S21**: 384×854
- **iPad**: 768×1024
- **iPad Pro**: 1024×1366

#### 桌面设备
- **小型笔记本**: 1366×768
- **标准桌面**: 1920×1080
- **大屏显示器**: 2560×1440
- **4K显示器**: 3840×2160

### 测试工具

#### 浏览器工具
- **Chrome DevTools**: 设备模拟
- **Firefox Responsive Design**: 响应式测试
- **Safari Web Inspector**: iOS设备测试

#### 在线工具
- **BrowserStack**: 真实设备测试
- **Responsinator**: 快速响应式预览
- **Am I Responsive**: 多设备预览

### 测试清单

#### 布局测试
- [ ] 所有断点下布局正常
- [ ] 文字可读性良好
- [ ] 图片正确缩放
- [ ] 导航功能正常
- [ ] 表单可用性良好

#### 交互测试
- [ ] 触摸目标足够大
- [ ] 手势操作正常
- [ ] 键盘导航可用
- [ ] 加载性能良好
- [ ] 滚动体验流畅

#### 兼容性测试
- [ ] iOS Safari兼容
- [ ] Android Chrome兼容
- [ ] 桌面浏览器兼容
- [ ] 旧版本浏览器降级