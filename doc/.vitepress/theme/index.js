import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import BackToTop from '../components/BackToTop.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 在布局的底部插槽中添加回到顶部按钮
      'layout-bottom': () => h(BackToTop)
    })
  },
  enhanceApp({ app }) {
    // 全局注册回到顶部组件
    app.component('BackToTop', BackToTop)
  }
}