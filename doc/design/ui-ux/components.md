# 组件库

## 设计系统概述

### 组件化原则
- **可复用性**: 组件可在多个场景中重复使用
- **一致性**: 保持视觉和交互的一致性
- **可维护性**: 易于更新和维护
- **可扩展性**: 支持功能扩展和定制

### 组件分类
- **基础组件**: 按钮、输入框、文本等
- **布局组件**: 容器、网格、间距等
- **导航组件**: 菜单、面包屑、分页等
- **数据展示**: 表格、列表、卡片等
- **反馈组件**: 提示、加载、对话框等
- **业务组件**: 角色卡片、装备面板等

## 基础组件

### 按钮 (Button)

#### 组件变体
```vue
<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled"
    @click="handleClick"
  >
    <Icon v-if="icon" :name="icon" />
    <span v-if="$slots.default"><slot /></span>
    <LoadingSpinner v-if="loading" />
  </button>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  icon: String,
  loading: Boolean,
  disabled: Boolean,
  fullWidth: Boolean
});

const emit = defineEmits(['click']);

const buttonClasses = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  {
    'btn--loading': props.loading,
    'btn--disabled': props.disabled,
    'btn--full-width': props.fullWidth
  }
]);

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>
```

#### 样式定义
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
}

/* 变体样式 */
.btn--primary {
  background: var(--primary-color);
  color: var(--text-inverse);
}

.btn--primary:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.btn--secondary {
  background: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
}

.btn--secondary:hover {
  background: var(--primary-color);
  color: var(--text-inverse);
}

/* 尺寸样式 */
.btn--small {
  padding: 8px 16px;
  font-size: 14px;
  min-height: 36px;
}

.btn--large {
  padding: 16px 24px;
  font-size: 18px;
  min-height: 52px;
}

/* 状态样式 */
.btn--loading {
  pointer-events: none;
}

.btn--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.btn--full-width {
  width: 100%;
}
```

### 输入框 (Input)

#### 组件实现
```vue
<template>
  <div class="input-group">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>
    
    <div class="input-wrapper">
      <Icon v-if="prefixIcon" :name="prefixIcon" class="input-prefix-icon" />
      
      <input
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClasses"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      
      <Icon v-if="suffixIcon" :name="suffixIcon" class="input-suffix-icon" />
      
      <button 
        v-if="clearable && inputValue"
        type="button"
        class="input-clear"
        @click="clearInput"
      >
        <Icon name="close" />
      </button>
    </div>
    
    <div v-if="error || hint" class="input-message">
      <span v-if="error" class="input-error">{{ error }}</span>
      <span v-else-if="hint" class="input-hint">{{ hint }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,
  clearable: Boolean,
  prefixIcon: String,
  suffixIcon: String,
  error: String,
  hint: String,
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'input']);

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
const isFocused = ref(false);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const inputClasses = computed(() => [
  'input',
  `input--${props.size}`,
  {
    'input--focused': isFocused.value,
    'input--error': props.error,
    'input--disabled': props.disabled,
    'input--readonly': props.readonly,
    'input--with-prefix': props.prefixIcon,
    'input--with-suffix': props.suffixIcon || props.clearable
  }
]);

const handleFocus = (event) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleBlur = (event) => {
  isFocused.value = false;
  emit('blur', event);
};

const handleInput = (event) => {
  emit('input', event);
};

const clearInput = () => {
  inputValue.value = '';
};
</script>
```

### 图标 (Icon)

#### SVG图标组件
```vue
<template>
  <svg 
    :class="iconClasses"
    :width="size"
    :height="size"
    :viewBox="viewBox"
    fill="currentColor"
  >
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [String, Number],
    default: 20
  },
  color: String,
  spin: Boolean
});

const iconClasses = computed(() => [
  'icon',
  {
    'icon--spin': props.spin
  }
]);

const viewBox = '0 0 24 24';
</script>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
}

.icon--spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
```

## 布局组件

### 容器 (Container)

```vue
<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  fluid: Boolean,
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['small', 'default', 'large', 'full'].includes(value)
  }
});

const containerClasses = computed(() => [
  'container',
  {
    'container--fluid': props.fluid,
    [`container--${props.size}`]: props.size !== 'default'
  }
]);
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
}

.container--small {
  max-width: 768px;
}

.container--default {
  max-width: 1200px;
}

.container--large {
  max-width: 1400px;
}

.container--full {
  max-width: none;
}

.container--fluid {
  max-width: none;
  padding: 0;
}

@media (min-width: 768px) {
  .container {
    padding: 0 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 32px;
  }
}
</style>
```

### 网格 (Grid)

```vue
<template>
  <div :class="gridClasses" :style="gridStyles">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  cols: {
    type: [Number, Object],
    default: 1
  },
  gap: {
    type: [String, Number],
    default: '16px'
  },
  align: {
    type: String,
    default: 'stretch',
    validator: (value) => ['start', 'center', 'end', 'stretch'].includes(value)
  },
  justify: {
    type: String,
    default: 'start',
    validator: (value) => ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'].includes(value)
  }
});

const gridClasses = computed(() => [
  'grid',
  `grid--align-${props.align}`,
  `grid--justify-${props.justify}`
]);

const gridStyles = computed(() => {
  const styles = {
    gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap
  };
  
  if (typeof props.cols === 'number') {
    styles.gridTemplateColumns = `repeat(${props.cols}, 1fr)`;
  } else if (typeof props.cols === 'object') {
    // 响应式列数
    const breakpoints = {
      xs: props.cols.xs || 1,
      sm: props.cols.sm || props.cols.xs || 1,
      md: props.cols.md || props.cols.sm || props.cols.xs || 1,
      lg: props.cols.lg || props.cols.md || props.cols.sm || props.cols.xs || 1,
      xl: props.cols.xl || props.cols.lg || props.cols.md || props.cols.sm || props.cols.xs || 1
    };
    
    styles.gridTemplateColumns = `repeat(${breakpoints.xs}, 1fr)`;
  }
  
  return styles;
});
</script>

<style scoped>
.grid {
  display: grid;
}

.grid--align-start {
  align-items: start;
}

.grid--align-center {
  align-items: center;
}

.grid--align-end {
  align-items: end;
}

.grid--align-stretch {
  align-items: stretch;
}

.grid--justify-start {
  justify-content: start;
}

.grid--justify-center {
  justify-content: center;
}

.grid--justify-end {
  justify-content: end;
}

.grid--justify-space-between {
  justify-content: space-between;
}

.grid--justify-space-around {
  justify-content: space-around;
}

.grid--justify-space-evenly {
  justify-content: space-evenly;
}
</style>
```

## 数据展示组件

### 卡片 (Card)

```vue
<template>
  <div :class="cardClasses" @click="handleClick">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    
    <div v-if="$slots.media" class="card-media">
      <slot name="media" />
    </div>
    
    <div class="card-body">
      <h3 v-if="title" class="card-title">{{ title }}</h3>
      <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
      <div class="card-content">
        <slot />
      </div>
    </div>
    
    <div v-if="$slots.actions" class="card-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  subtitle: String,
  hoverable: Boolean,
  clickable: Boolean,
  bordered: {
    type: Boolean,
    default: true
  },
  shadow: {
    type: String,
    default: 'medium',
    validator: (value) => ['none', 'small', 'medium', 'large'].includes(value)
  }
});

const emit = defineEmits(['click']);

const cardClasses = computed(() => [
  'card',
  {
    'card--hoverable': props.hoverable,
    'card--clickable': props.clickable,
    'card--bordered': props.bordered,
    [`card--shadow-${props.shadow}`]: props.shadow !== 'none'
  }
]);

const handleClick = (event) => {
  if (props.clickable) {
    emit('click', event);
  }
};
</script>
```

### 列表 (List)

```vue
<template>
  <div class="list">
    <div 
      v-for="(item, index) in items" 
      :key="getItemKey(item, index)"
      :class="getItemClasses(item, index)"
      @click="handleItemClick(item, index)"
    >
      <slot name="item" :item="item" :index="index">
        <div class="list-item-content">
          <div v-if="item.avatar" class="list-item-avatar">
            <img :src="item.avatar" :alt="item.title" />
          </div>
          
          <div class="list-item-body">
            <div class="list-item-title">{{ item.title }}</div>
            <div v-if="item.subtitle" class="list-item-subtitle">{{ item.subtitle }}</div>
          </div>
          
          <div v-if="item.action" class="list-item-action">
            <slot name="action" :item="item" :index="index">
              {{ item.action }}
            </slot>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  itemKey: {
    type: [String, Function],
    default: 'id'
  },
  selectable: Boolean,
  selectedItems: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['item-click', 'selection-change']);

const getItemKey = (item, index) => {
  if (typeof props.itemKey === 'function') {
    return props.itemKey(item, index);
  }
  return item[props.itemKey] || index;
};

const getItemClasses = (item, index) => [
  'list-item',
  {
    'list-item--selected': props.selectable && props.selectedItems.includes(getItemKey(item, index)),
    'list-item--clickable': true
  }
];

const handleItemClick = (item, index) => {
  emit('item-click', { item, index });
  
  if (props.selectable) {
    const key = getItemKey(item, index);
    const newSelection = props.selectedItems.includes(key)
      ? props.selectedItems.filter(k => k !== key)
      : [...props.selectedItems, key];
    
    emit('selection-change', newSelection);
  }
};
</script>
```

## 反馈组件

### 消息提示 (Message)

```vue
<template>
  <Teleport to="body">
    <Transition name="message" appear>
      <div v-if="visible" :class="messageClasses">
        <Icon :name="iconName" class="message-icon" />
        <span class="message-content">{{ content }}</span>
        <button v-if="closable" class="message-close" @click="close">
          <Icon name="close" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'warning', 'error', 'info'].includes(value)
  },
  content: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 3000
  },
  closable: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close']);

const visible = ref(true);

const messageClasses = computed(() => [
  'message',
  `message--${props.type}`
]);

const iconName = computed(() => {
  const iconMap = {
    success: 'check-circle',
    warning: 'warning',
    error: 'x-circle',
    info: 'info-circle'
  };
  return iconMap[props.type];
});

const close = () => {
  visible.value = false;
  emit('close');
};

// 自动关闭
if (props.duration > 0) {
  setTimeout(close, props.duration);
}
</script>

<style scoped>
.message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--bg-primary);
  border: 1px solid var(--border-medium);
  border-radius: 6px;
  box-shadow: var(--shadow-lg);
  z-index: 2000;
  max-width: 400px;
}

.message--success {
  border-color: var(--success-color);
  color: var(--success-color);
}

.message--warning {
  border-color: var(--warning-color);
  color: var(--warning-color);
}

.message--error {
  border-color: var(--error-color);
  color: var(--error-color);
}

.message--info {
  border-color: var(--info-color);
  color: var(--info-color);
}

.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

.message-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
</style>
```

## 业务组件

### 角色卡片 (CharacterCard)

```vue
<template>
  <Card class="character-card" hoverable>
    <template #media>
      <div class="character-avatar">
        <img :src="character.avatar" :alt="character.name" />
        <div class="character-level">{{ character.level }}</div>
      </div>
    </template>
    
    <template #default>
      <div class="character-info">
        <h3 class="character-name">{{ character.name }}</h3>
        <p class="character-realm">{{ character.realm }}</p>
        
        <div class="character-stats">
          <div class="stat-item">
            <Icon name="sword" />
            <span>{{ character.attack }}</span>
          </div>
          <div class="stat-item">
            <Icon name="shield" />
            <span>{{ character.defense }}</span>
          </div>
          <div class="stat-item">
            <Icon name="zap" />
            <span>{{ character.speed }}</span>
          </div>
        </div>
        
        <div class="character-progress">
          <div class="progress-label">修炼进度</div>
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: `${character.progress}%` }"
            ></div>
          </div>
          <div class="progress-text">{{ character.progress }}%</div>
        </div>
      </div>
    </template>
    
    <template #actions>
      <Button variant="primary" size="small" @click="$emit('select', character)">
        选择角色
      </Button>
      <Button variant="secondary" size="small" @click="$emit('view', character)">
        查看详情
      </Button>
    </template>
  </Card>
</template>

<script setup>
const props = defineProps({
  character: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['select', 'view']);
</script>

<style scoped>
.character-card {
  max-width: 300px;
}

.character-avatar {
  position: relative;
  text-align: center;
  padding: 20px;
}

.character-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.character-level {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.character-name {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
}

.character-realm {
  margin: 0 0 16px 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.character-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.character-progress {
  margin-bottom: 16px;
}

.progress-label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.progress-bar {
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: var(--text-secondary);
  text-align: right;
}
</style>
```

## 组件使用指南

### 导入和注册

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';

// 导入组件
import Button from './components/Button.vue';
import Input from './components/Input.vue';
import Card from './components/Card.vue';
// ... 其他组件

const app = createApp(App);

// 全局注册组件
app.component('Button', Button);
app.component('Input', Input);
app.component('Card', Card);
// ... 其他组件

app.mount('#app');
```

### 使用示例

```vue
<template>
  <Container>
    <Grid :cols="{ xs: 1, md: 2, lg: 3 }" gap="20px">
      <Card 
        v-for="character in characters" 
        :key="character.id"
        hoverable
        clickable
        @click="selectCharacter(character)"
      >
        <template #header>
          <h3>{{ character.name }}</h3>
        </template>
        
        <p>等级: {{ character.level }}</p>
        <p>境界: {{ character.realm }}</p>
        
        <template #actions>
          <Button variant="primary" @click="viewDetails(character)">
            查看详情
          </Button>
        </template>
      </Card>
    </Grid>
    
    <div class="form-section">
      <Input 
        v-model="searchQuery"
        label="搜索角色"
        placeholder="输入角色名称"
        prefix-icon="search"
        clearable
      />
      
      <Button 
        variant="primary"
        :loading="isLoading"
        @click="searchCharacters"
      >
        搜索
      </Button>
    </div>
  </Container>
</template>

<script setup>
const characters = ref([]);
const searchQuery = ref('');
const isLoading = ref(false);

const selectCharacter = (character) => {
  console.log('选择角色:', character);
};

const viewDetails = (character) => {
  console.log('查看详情:', character);
};

const searchCharacters = async () => {
  isLoading.value = true;
  try {
    // 搜索逻辑
    await new Promise(resolve => setTimeout(resolve, 1000));
  } finally {
    isLoading.value = false;
  }
};
</script>
```

### 主题定制

```css
/* 自定义主题变量 */
:root {
  /* 重写默认颜色 */
  --primary-color: #your-primary-color;
  --secondary-color: #your-secondary-color;
  
  /* 重写字体 */
  --font-family-zh: 'Your-Font', sans-serif;
  
  /* 重写间距 */
  --spacing-md: 20px;
}

/* 自定义组件样式 */
.btn--custom {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  border: none;
}

.btn--custom:hover {
  background: linear-gradient(45deg, #ff5252, #26a69a);
}
```

## 开发规范

### 组件命名
- **PascalCase**: 组件文件和组件名使用大驼峰
- **kebab-case**: HTML中使用短横线连接
- **语义化**: 名称要能清楚表达组件功能

### Props设计
- **类型检查**: 所有props都要定义类型
- **默认值**: 提供合理的默认值
- **验证器**: 对枚举类型使用验证器
- **文档注释**: 为复杂props添加注释

### 事件设计
- **语义化命名**: 事件名要清楚表达触发时机
- **参数传递**: 传递必要的上下文信息
- **防止冒泡**: 必要时阻止事件冒泡

### 样式规范
- **BEM命名**: 使用BEM方法论命名CSS类
- **CSS变量**: 使用CSS变量实现主题化
- **响应式**: 考虑不同屏幕尺寸的适配
- **性能优化**: 避免深层嵌套和复杂选择器