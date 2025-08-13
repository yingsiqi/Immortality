import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    title: "Immortality - 游戏开发文档",
    description: "Web RPG游戏开发文档",
    lang: 'zh-Hans',
    base: '/Immortality/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        text: '指南文档',
        items: [
          { text: '项目管理', link: '/guides/project-management/' },
          { text: '技术文档', link: '/guides/technical/' },
          { text: 'Alpha技术栈', link: '/guides/technical/alpha-tech-stack' },
          { text: '架构设计', link: '/guides/technical/architecture-design' },
          { text: '开发环境', link: '/guides/technical/development-environment' },
          { text: '运营指南', link: '/guides/operations/' }
        ]
      },
      {
        text: '游戏设计',
        items: [
          { text: '世界观设定', link: '/design/world/' },
          { text: '游戏玩法', link: '/design/gameplay/' },
          { text: '数值设计', link: '/design/numerical/' },
          { text: 'UI/UX设计', link: '/design/ui-ux/' }
        ]
      },
      {
        text: '核心系统',
        items: [
          { text: '系统总览', link: '/core-systems/' },
          { text: '角色系统', link: '/core-systems/character/' },
          { text: '战斗系统', link: '/core-systems/combat/' },
          { text: '修炼系统', link: '/core-systems/cultivation/' },
          { text: '装备系统', link: '/core-systems/equipment/' },
          { text: '经济系统', link: '/core-systems/economy/' },
          { text: '任务系统', link: '/core-systems/quest/' },
          { text: '副本系统', link: '/core-systems/dungeon/' },
          { text: 'PVP系统', link: '/core-systems/pvp/' },
          { text: '社交系统', link: '/core-systems/social/' },
          { text: '事件系统', link: '/core-systems/event/' }
        ]
      },
      { text: '美术音频', link: '/art-audio/' },
      { text: 'API参考', link: '/reference/api' }
    ],

    sidebar: {
      '/design/': [
        {
          text: '世界观设定',
          collapsed: false,
          items: [
            { text: '总览', link: '/design/world/' },
            { text: '修仙体系', link: '/design/world/cultivation/' },
            { text: '功法术法', link: '/design/world/cultivation/techniques' },
            { text: '丹药灵草', link: '/design/world/alchemy/' },
            { text: '妖兽奇虫', link: '/design/world/bestiary/' },
            { text: '地理志', link: '/design/world/geography/' },
            { text: '宗门势力', link: '/design/world/organizations/' },
            { text: '修仙人物志', link: '/design/world/characters/' },
            { text: '次要角色', link: '/design/world/characters/minor' },
            { text: '韩立全纪年', link: '/design/world/hanli-chronicle' },
            { text: '器物宝藏', link: '/design/world/treasures/' },
            { text: '典籍符箓', link: '/design/world/treasures/knowledge' }
          ]
        },
        {
          text: '数值设计',
          collapsed: false,
          items: [
            { text: '数值设计', link: '/design/numerical/' }
          ]
        },
        {
          text: '游戏玩法',
          collapsed: false,
          items: [
            { text: '游戏玩法', link: '/design/gameplay/' }
          ]
        },
        {
              text: 'UI/UX设计',
              collapsed: false,
              items: [
                { text: 'UI/UX设计概述', link: '/design/ui-ux/' },
                { text: 'Web界面设计', link: '/design/ui-ux/web-interface' },
                { text: '交互设计', link: '/design/ui-ux/interaction' },
                { text: '视觉风格指南', link: '/design/ui-ux/visual-style' },
                { text: '响应式设计', link: '/design/ui-ux/responsive' },
                { text: '组件库', link: '/design/ui-ux/components' },
                { text: '轻量化图形实现', link: '/design/ui-ux/lightweight-graphics' },
                { text: '流程图与架构图指南', link: '/design/ui-ux/diagrams-guide' }
              ]
            }
      ],
      
      '/core-systems/': [
        {
          text: '核心系统',
          items: [
            { text: '系统总览', link: '/core-systems/' }
          ]
        },
        {
          text: '角色系统',
          collapsed: true,
          items: [
            { text: '角色系统概述', link: '/core-systems/character/' }
          ]
        },
        {
          text: '战斗系统',
          collapsed: true,
          items: [
            { text: '战斗系统概述', link: '/core-systems/combat/' },
            { text: 'AI系统', link: '/core-systems/combat/ai-system' },
            { text: '连招系统', link: '/core-systems/combat/combo-system' },
            { text: '技能系统', link: '/core-systems/combat/skill-system' }
          ]
        },
        {
          text: '修炼系统',
          collapsed: true,
          items: [
            { text: '修炼系统概述', link: '/core-systems/cultivation/' }
          ]
        },
        {
          text: '装备系统',
          collapsed: true,
          items: [
            { text: '装备系统概述', link: '/core-systems/equipment/' }
          ]
        },
        {
          text: '经济系统',
          collapsed: true,
          items: [
            { text: '经济系统概述', link: '/core-systems/economy/' }
          ]
        },
        {
          text: '任务系统',
          collapsed: true,
          items: [
            { text: '任务系统概述', link: '/core-systems/quest/' }
          ]
        },
        {
          text: '副本系统',
          collapsed: true,
          items: [
            { text: '副本系统概述', link: '/core-systems/dungeon/' }
          ]
        },
        {
          text: 'PVP系统',
          collapsed: true,
          items: [
            { text: 'PVP系统概述', link: '/core-systems/pvp/' }
          ]
        },
        {
          text: '社交系统',
          collapsed: true,
          items: [
            { text: '社交系统概述', link: '/core-systems/social/' }
          ]
        },
        {
          text: '事件系统',
          collapsed: true,
          items: [
            { text: '事件系统概述', link: '/core-systems/event/' }
          ]
        }
      ],
      
      '/guides/': [
        {
          text: '指南文档',
          items: [
            { text: '项目管理', link: '/guides/project-management/' },
            { text: '技术文档', link: '/guides/technical/' },
            { text: '运营指南', link: '/guides/operations/' }
          ]
        },
        {
          text: '项目管理',
          collapsed: false,
          items: [
            { text: '项目管理概述', link: '/guides/project-management/' },
            { text: 'Alpha开发计划', link: '/guides/project-management/alpha-development-plan' },
            { text: '项目路线图', link: '/guides/technical/project-roadmap' }
          ]
        },
        {
          text: '技术文档',
          collapsed: false,
          items: [
            { text: '技术概述', link: '/guides/technical/' },
            { text: 'Alpha技术栈总览', link: '/guides/technical/alpha-tech-stack' },
            { text: '架构设计', link: '/guides/technical/architecture-design' },
            { text: '前端架构设计', link: '/guides/technical/frontend-architecture' },
            { text: '后端架构设计', link: '/guides/technical/backend-architecture' },
            { text: '数据库设计', link: '/guides/technical/database-design' },
            { text: '开发环境配置', link: '/guides/technical/development-environment' },
            { text: '实施计划', link: '/guides/technical/implementation-plan' },
            { text: '单台VPS部署方案', link: '/guides/technical/single-vps-deployment-plan' },
            { text: 'GitHub Pages部署', link: '/guides/technical/github-pages-deployment' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo/immortality' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Immortality Game Development Team'
    }
  }
})
)
