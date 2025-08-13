# 技术文档

## 项目开发计划

本项目采用分阶段开发模式，详细的技术实施计划请参考：[Alpha版本开发计划](/guides/project-management/alpha-development-plan.md)

特别关注以下技术重点：
- **单服务器承载验证**：目标支持1000并发用户
- **时间敏感型事务设计**：现实时间与游戏时间的精确映射
- **轻量化架构原则**：SVG+Emoji美术方案，事件溯源模式
- **性能监控体系**：实时监控、告警机制、数据安全

## 技术架构

### 核心架构设计

基于DeepSeek修仙MMO技术方案的深度分析，结合Immortality项目的实际需求，我们采用以下核心架构特性：

- **事件驱动架构**: 基于事件溯源的完整状态管理，支持时间回溯和状态重建
- **分层存储系统**: 热温冷三层数据存储策略，优化成本和性能
  - 热数据层：Redis缓存，支持活跃玩家状态和实时事件（30天）
  - 温数据层：PostgreSQL，存储历史事件和玩家档案（5年）
  - 冷数据层：文件存储，永久归档和审计日志
- **轻量级规则引擎**: 声明式游戏规则配置，支持优先级和冲突处理
- **微服务架构**: 模块化设计，便于扩展和维护
- **渐进式实施**: 分阶段开发，降低技术风险

### 架构文档

- [技术架构设计](./architecture-design.md) - 完整的架构设计方案
- [实施计划](./implementation-plan.md) - 分阶段实施路线图
- [单台VPS部署方案](./single-vps-deployment-plan.md) - Alpha阶段单服务器部署详细方案
- [GitHub Pages部署](./github-pages-deployment.md) - 文档网站在线部署指南

### 服务器架构

采用分层微服务架构，确保系统的可扩展性和可维护性：

**网关层**:
- **API网关**: 统一入口，路由分发和负载均衡
- **负载均衡器**: 流量分发和故障转移

**服务层**:
- **用户服务**: 用户认证、权限管理、会话维护
- **游戏逻辑服务**: 核心游戏逻辑处理、业务规则执行
- **事件溯源服务**: 完整的游戏状态历史记录、时间回溯、状态重建
- **规则引擎服务**: 声明式游戏规则配置和执行、优先级处理
- **数据服务**: 数据库操作、缓存管理、数据迁移调度

**存储层**:
- **热数据缓存**: Redis集群，实时状态和高频访问数据
- **主数据库**: PostgreSQL，事务数据和关系型数据
- **事件存储**: 分层存储系统，支持数据生命周期管理
- **文件存储**: 冷数据归档和长期备份

### 技术栈

#### 后端技术
- **语言**: Node.js / TypeScript
- **框架**: Express.js
- **数据库**: PostgreSQL + Redis
- **事件存储**: 自研事件溯源引擎 + 分层存储
- **规则引擎**: 基于JSON配置的声明式规则系统
- **消息队列**: RabbitMQ
- **容器化**: Docker + Kubernetes
- **监控**: Prometheus + Grafana
- **日志**: ELK Stack (Elasticsearch + Logstash + Kibana)

#### 前端技术
- **引擎**: Unity 2022.3 LTS
- **语言**: C#
- **网络**: Mirror Networking
- **UI框架**: UGUI + DOTween
- **美术方案**: SVG + Emoji 轻量化设计

#### 核心特性
- **事件溯源**: 完整状态历史记录和时间回溯
- **分层存储**: 热温冷数据自动迁移
- **规则引擎**: 支持优先级和冲突处理的游戏规则
- **性能优化**: 缓存策略和数据预加载
- **成本控制**: 基于访问频率的存储优化

### 数据库设计

#### 核心表结构

**用户表 (users)**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**角色表 (characters)**
```sql
CREATE TABLE characters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(50) NOT NULL,
    level INTEGER DEFAULT 1,
    experience INTEGER DEFAULT 0,
    class_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 事件溯源表结构

**事件流表 (event_stream)**
```sql
CREATE TABLE event_stream (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB NOT NULL,
    schema_version VARCHAR(10) NOT NULL,
    event_hash VARCHAR(64) NOT NULL,
    sequence_number BIGSERIAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_player_sequence (player_id, sequence_number),
    INDEX idx_event_type (event_type),
    INDEX idx_created_at (created_at)
);
```

**快照表 (player_snapshots)**
```sql
CREATE TABLE player_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL,
    snapshot_data JSONB NOT NULL,
    sequence_number BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_player_sequence (player_id, sequence_number)
);
```

### API 设计

#### RESTful API 规范

**用户管理**
- **GET /api/users** - 获取用户列表
- **POST /api/users** - 创建新用户
- **GET /api/users/:id** - 获取特定用户信息
- **PUT /api/users/:id** - 更新用户信息
- **DELETE /api/users/:id** - 删除用户

**游戏逻辑**
- **POST /api/game/action** - 执行游戏操作
- **GET /api/game/state/:playerId** - 获取玩家当前状态
- **GET /api/game/history/:playerId** - 获取玩家历史记录

**事件溯源**
- **GET /api/events/:playerId** - 获取玩家事件流
- **POST /api/events/replay** - 重放事件到指定时间点
- **GET /api/snapshots/:playerId** - 获取玩家快照

**规则引擎**
- **GET /api/rules** - 获取游戏规则列表
- **POST /api/rules** - 创建新规则
- **PUT /api/rules/:id** - 更新规则配置
- **POST /api/rules/validate** - 验证规则配置

#### WebSocket 协议

游戏实时通信采用 WebSocket 协议，支持事件驱动的消息传递：

```json
{
    "type": "GAME_EVENT",
    "eventId": "uuid",
    "playerId": "uuid",
    "eventType": "CULTIVATION_PROGRESS",
    "data": {
        "experience": 1000,
        "level": 5
    },
    "timestamp": 1234567890,
    "sequenceNumber": 12345
}
```

### 部署架构

#### 生产环境

**网关层**
- **负载均衡器**: Nginx (支持WebSocket代理)
- **API网关**: Kong/Zuul (路由、限流、认证)

**应用层**
- **用户服务**: Node.js (多实例，无状态)
- **游戏逻辑服务**: Node.js (多实例，事件驱动)
- **事件溯源服务**: Node.js (专用实例，高可用)
- **规则引擎服务**: Node.js (独立部署，可扩展)
- **数据服务**: Node.js (数据访问层)

**存储层**
- **主数据库**: PostgreSQL 主从复制 (事务数据)
- **事件存储**: PostgreSQL + 文件存储 (分层架构)
- **热数据缓存**: Redis 集群 (高可用模式)
- **冷数据存储**: MinIO/S3 (成本优化)

**监控与运维**
- **监控**: Prometheus + Grafana + AlertManager
- **日志**: ELK Stack (集中式日志管理)
- **链路追踪**: Jaeger (分布式追踪)
- **健康检查**: 自定义健康检查端点

#### 开发环境
- **本地开发**: Docker Compose (完整技术栈)
- **测试环境**: Kubernetes 集群 (生产环境镜像)
- **CI/CD**: GitHub Actions (自动化测试和部署)
- **环境管理**: Helm Charts (配置管理)

#### 扩展策略
- **水平扩展**: 基于CPU/内存使用率自动扩缩容
- **数据分片**: 按玩家ID进行数据分片
- **缓存策略**: 多级缓存，支持缓存预热
- **故障恢复**: 自动故障转移和数据备份