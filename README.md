# Immortality - 凡人修仙传 Web RPG

一个基于《凡人修仙传》IP的开源Web修仙RPG游戏项目，采用"用规则替代数值，用时间沉淀替代付费捷径"的核心理念。

## 项目概述

本项目旨在创建一个革命性的修仙RPG游戏，通过时间维度创新、天道法则系统等机制，打造真正意义上的修仙体验。项目目前处于Alpha开发阶段，计划进行1000人封闭测试。

### 核心创新特点

- **时间维度革命**：真实时间流逝影响游戏世界，1现实秒=1游戏日
- **天道法则系统**：业力因果、灵气守恒、天罚机制
- **真实修炼体系**：从炼气到化神的完整路径，无付费捷径
- **事件溯源架构**：完整记录所有游戏事件，支持时间回溯
- **微服务架构**：高并发、高可用的分布式系统设计
- **智能运营**：基于数据驱动的游戏平衡和内容生成

## 快速开始

### 环境要求

- Node.js 18.x 或更高版本
- npm 8.x 或更高版本
- Docker 20.x 或更高版本（推荐）
- PostgreSQL 14+ （生产环境）
- Redis 6+ （缓存和会话）

### 安装与设置

1. 克隆仓库
   ```
   git clone https://github.com/yingsiqi/Immortality.git
   cd Immortality
   ```

2. 安装依赖
   ```
   npm install
   ```

3. 启动项目管理面板
   ```
   node start.js
   ```
   这将启动项目管理面板，用于管理各种服务包括文档系统。

4. 使用管理面板
   - 打开浏览器，访问 http://localhost:3000
   - 在管理面板中找到VitePress文档服务并启动
   - 文档启动后，可以访问相应端口查看项目文档和设计文档

### VitePress文档系统使用指南

**通过管理面板启动文档服务**：
1. 确保项目管理面板已启动（`node start.js`）
2. 访问管理面板 http://localhost:3000
3. 在管理面板中找到VitePress文档服务选项并启动
4. 文档服务启动后，访问相应端口查看文档

**直接启动文档服务**（开发模式）：
```
cd doc
npm run dev
```

**构建生产版本**：
```
cd doc
npm run build
npm run preview
```

**文档内容管理**：

文档系统包含以下主要内容：

1. **核心系统设计** (`/core-systems/`)
   - 角色系统、战斗系统、修炼系统
   - 装备系统、副本系统、经济系统
   - 任务系统、PVP系统、社交系统

2. **世界设定** (`/design/world/`)
   - 人物志、地理设定、门派设定
   - 世界观架构和背景故事

3. **游戏设计** (`/design/gameplay/`)
   - 玩法机制设计
   - 用户体验设计

4. **开发指南** (`/guides/`)
   - 技术开发指南
   - 项目管理流程
   - 运营指南

5. **API参考** (`/reference/`)
   - 接口文档
   - 技术规范

## 技术架构

### 核心技术栈
- **前端**: React 18 + TypeScript + Vite
- **状态管理**: Zustand + React Query
- **UI组件**: Ant Design + Tailwind CSS
- **后端**: Node.js + Express + TypeScript
- **数据库**: PostgreSQL 14+ (主库) + Redis 6+ (缓存)
- **消息队列**: Redis Pub/Sub + Bull Queue
- **实时通信**: Socket.IO
- **文档系统**: VitePress + Vue 3 + Mermaid
- **容器化**: Docker + Docker Compose

### 架构设计
- **微服务架构**: 用户服务、游戏逻辑服务、数据服务等
- **事件溯源**: 完整的事件存储和重放机制
- **CQRS模式**: 命令查询职责分离
- **API网关**: 统一的请求路由和认证
- **监控告警**: Prometheus + Grafana

### 部署方案
- **推荐配置**: 8核32GB内存，500GB NVMe SSD
- **最小配置**: 4核16GB内存，200GB SSD
- **容器化部署**: Docker Compose 一键部署
- **详细部署文档**: [单台VPS部署方案](https://yingsiqi.github.io/Immortality/guides/technical/single-vps-deployment-plan.html)

## 开发路线

### Alpha阶段 (当前阶段，12-15周)
- **核心机制验证**: 时间系统、天道法则、因果业力
- **技术架构搭建**: 微服务、事件溯源、CQRS
- **基础系统**: 用户认证、角色创建、基础修炼
- **封闭测试**: 1000人规模测试
- **目标**: 验证核心创新机制的可行性

### Beta阶段 (计划中)
- **完整游戏循环**: 修炼、炼丹、法宝、副本
- **社交系统**: 门派、交易、组队、好友
- **内容扩展**: 更多地图、剧情、玩法
- **性能优化**: 支持更大规模用户

### 正式版 (远期规划)
- **高级系统**: 阵法、炼器、符箓制作
- **世界事件**: 大型剧情、跨服活动
- **移动端**: 跨平台支持
- **国际化**: 多语言支持

## 项目结构

```
Immortality/
├── admin-panel/          # 项目管理面板
│   ├── public/          # 静态资源
│   ├── src/             # 源代码
│   └── server.js        # 服务器入口
├── doc/                 # VitePress文档系统
│   ├── .vitepress/      # VitePress配置
│   ├── core-systems/    # 核心系统设计文档
│   ├── design/          # 游戏设计文档
│   ├── guides/          # 开发和运营指南
│   └── reference/       # API参考文档
├── package.json         # 项目依赖配置
├── setup.js            # 项目初始化脚本
├── start.js            # 项目启动脚本
└── README.md           # 项目说明文档
```

## 文档系统

本项目使用VitePress构建了完整的文档系统，包含：

- **[核心系统设计](https://yingsiqi.github.io/Immortality/core-systems/)**: 角色、战斗、修炼、装备等系统设计
- **[游戏设计](https://yingsiqi.github.io/Immortality/design/)**: 世界观、玩法机制、数值设计
- **[技术指南](https://yingsiqi.github.io/Immortality/guides/technical/)**: 架构设计、部署方案、开发规范
- **[项目管理](https://yingsiqi.github.io/Immortality/guides/project-management/)**: Alpha开发计划、里程碑管理
- **[运营指南](https://yingsiqi.github.io/Immortality/guides/operations/)**: 运营策略、数据分析

## 快速体验

1. **启动项目管理面板**:
   ```bash
   node start.js
   # 访问 http://localhost:3000
   ```

2. **查看项目文档**:
   ```bash
   cd doc
   npm run docs:dev
   # 本地访问 http://localhost:5174/
   # 在线访问 https://yingsiqi.github.io/Immortality/
   ```

3. **Docker部署** (推荐):
   ```bash
   # 详见 https://yingsiqi.github.io/Immortality/guides/technical/single-vps-deployment-plan.html
   docker-compose up -d
   ```

## 开发状态

- ✅ 项目架构设计完成
- ✅ 文档系统搭建完成
- ✅ 单台VPS部署方案制定
- 🚧 Alpha版本开发中 (12-15周计划)
- ⏳ 核心机制原型开发
- ⏳ 微服务架构实现

## 参与贡献

欢迎对《凡人修仙传》有热情的开发者参与项目贡献！

### 贡献方式
- 🐛 提交Bug报告
- 💡 提出功能建议
- 📝 完善文档内容
- 💻 参与代码开发
- 🎮 参与Alpha测试

### 开发规范
- 遵循TypeScript编码规范
- 提交前运行测试用例
- 遵循Git提交信息规范
- 详见[开发指南](https://yingsiqi.github.io/Immortality/guides/technical/)

## 联系方式

- 项目仓库: [GitHub](https://github.com/yingsiqi/Immortality)
- 问题反馈: [Issues](https://github.com/yingsiqi/Immortality/issues)
- 讨论交流: [Discussions](https://github.com/yingsiqi/Immortality/discussions)

## 许可证

[MIT License](LICENSE) - 详见LICENSE文件
