import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    title: "Immortality - 游戏开发文档",
    description: "游戏开发文档",
    lang: 'zh-Hans',
    base: '/Immortality/',
    
    markdown: {
      theme: {
        light: 'github-light',
        dark: 'github-dark'
      },
      languages: [
        'javascript',
        'typescript',
        'json',
        'html',
        'css',
        'bash',
        'shell',
        'yaml',
        'xml',
        'markdown',
        'txt'
      ]
    },
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
      { text: '详细规则', link: '/specs/' },
      { text: '游戏数据库', link: '/data/' },
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
                { text: 'Tuanjie界面设计', link: '/design/ui-ux/web-interface' },
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
      
      '/specs/': [
        {
          text: '详细规则书',
          collapsed: false,
          items: [
            { text: '总览', link: '/specs/' },
            { text: '第1层 - 角色属性体系', link: '/specs/layer-01-character-attributes' },
            { text: '第2层 - 行动原子', link: '/specs/layer-02-action-atoms' },
            { text: '第3层 - 战斗系统', link: '/specs/layer-03-combat-system' },
            { text: '第4层 - 成长系统', link: '/specs/layer-04-growth-system' },
            { text: '第5层 - 经济系统', link: '/specs/layer-05-economy-system' },
            { text: '第6层 - 社交系统', link: '/specs/layer-06-social-system' },
            { text: '第7层 - 世界系统', link: '/specs/layer-07-world-system' },
            { text: '→ 游戏数据库', link: '/data/' }
          ]
        }
      ],

      '/data/': [
        {
          text: '游戏数据库',
          collapsed: false,
          items: [
            { text: '总览', link: '/data/' },
            { text: '技能表', link: '/data/skills/' },
            { text: '├ 功法', link: '/data/skills/gongfa' },
            { text: '├ 术法', link: '/data/skills/shufa' },
            { text: '采集物/材料表', link: '/data/materials/' },
            { text: '├ 灵草植物', link: '/data/materials/herbs' },
            { text: '├ 矿石金属', link: '/data/materials/ores' },
            { text: '├ 灵兽材料', link: '/data/materials/beast_materials' },
            { text: '├ 天地灵物', link: '/data/materials/spirit_treasures' },
            { text: '丹药/配方', link: '/data/alchemy/' },
            { text: '├ 丹药数据表', link: '/data/alchemy/pills' },
            { text: '├ 配方数据表', link: '/data/alchemy/recipes' },
            { text: '装备/法宝表', link: '/data/equipment/' },
            { text: '├ 装备数据表', link: '/data/equipment/equipment' },
            { text: '灵宠表', link: '/data/pets/' },
            { text: '├ 灵宠数据表', link: '/data/pets/pets' },
            { text: '怪物/NPC表', link: '/data/creatures/' },
            { text: '├ 怪物数据表', link: '/data/creatures/monsters' },
            { text: '├ NPC数据表', link: '/data/creatures/npcs' },
            { text: '地图/副本表', link: '/data/world/' },
            { text: '├ 大陆表', link: '/data/world/continents' },
            { text: '├ 区域表', link: '/data/world/regions' },
            { text: '├ 副本表', link: '/data/world/dungeons' },
            { text: '奇遇/事件表', link: '/data/events/' },
            { text: '├ 事件数据表', link: '/data/events/events' },
            { text: '→ 详细规则书', link: '/specs/' }
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
            { text: '客户端架构设计', link: '/guides/technical/frontend-architecture' },
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
