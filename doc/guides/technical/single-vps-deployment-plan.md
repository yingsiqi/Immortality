# Immortality游戏单台VPS部署方案

## 部署概述

基于Alpha阶段目标（1000人封闭测试）和当前技术架构设计，本文档详细说明了在单台VPS上部署完整游戏系统的具体方案。

### 部署目标
- **用户规模**: 1000并发用户
- **响应时间**: <100ms
- **系统稳定性**: >99%
- **内存使用率**: <80%
- **部署模式**: Docker容器化部署

## 硬件配置要求

### 推荐配置（生产环境）
```yaml
服务器规格:
  CPU: 8核心 (Intel Xeon或AMD EPYC)
  内存: 32GB DDR4
  存储: 500GB NVMe SSD + 1TB HDD
  网络: 1Gbps带宽，不限流量
  操作系统: Ubuntu 22.04 LTS

成本估算:
  阿里云: ¥800-1200/月
  腾讯云: ¥750-1100/月
  AWS: $120-180/月
  Vultr: $80-120/月
```

### 最小可用配置（测试环境）
```yaml
服务器规格:
  CPU: 4核心
  内存: 16GB DDR4
  存储: 200GB NVMe SSD
  网络: 100Mbps带宽
  操作系统: Ubuntu 22.04 LTS

成本估算:
  阿里云: ¥400-600/月
  腾讯云: ¥350-550/月
  Vultr: $40-60/月
```

## 架构元素实现映射

### 1. 客户端层实现

**Web客户端**:
```yaml
技术栈:
  - 框架: React 18 + TypeScript
  - 状态管理: Redux Toolkit
  - UI组件: Ant Design
  - 实时通信: Socket.io-client
  - 构建工具: Vite

部署方式:
  - 静态文件托管在Nginx
  - CDN加速（可选）
  - PWA支持离线访问

资源占用:
  - 磁盘: ~50MB（构建后）
  - 带宽: ~2MB首次加载
```

**移动端客户端**:
```yaml
实现方案:
  - PWA应用（优先）
  - 响应式设计适配移动端
  - 原生App（后期考虑）

特性:
  - 离线缓存支持
  - 推送通知
  - 触摸优化交互
```

### 2. 网关层实现

**API网关 + 负载均衡器**:
```yaml
技术选型:
  - Nginx: 反向代理 + 负载均衡
  - 配置: upstream + location规则
  - SSL终端: Let's Encrypt证书
  - 限流: rate limiting模块

容器配置:
  - 镜像: nginx:alpine
  - 内存限制: 512MB
  - CPU限制: 0.5核
  - 端口映射: 80:80, 443:443

功能特性:
  - HTTP/2支持
  - Gzip压缩
  - 静态文件缓存
  - 健康检查
  - 访问日志
```

### 3. 服务层实现

#### 用户服务 (User Service)
```yaml
功能职责:
  - 用户注册/登录
  - JWT令牌管理
  - 权限验证
  - 用户资料管理

技术实现:
  - 运行时: Node.js 18
  - 框架: Express.js
  - 认证: JWT + bcrypt
  - 验证: joi数据验证

容器配置:
  - 镜像: node:18-alpine
  - 内存限制: 1GB
  - CPU限制: 1核
  - 端口: 3001
  - 环境变量: JWT_SECRET, DB_URL

性能指标:
  - 并发处理: 500 req/s
  - 响应时间: <50ms
  - 内存使用: ~200MB
```

#### 游戏逻辑服务 (Game Logic Service)
```yaml
功能职责:
  - 游戏核心逻辑处理
  - 玩家操作验证
  - 游戏状态计算
  - 实时事件处理

技术实现:
  - 运行时: Node.js 18
  - 框架: Fastify（高性能）
  - 实时通信: Socket.io
  - 状态管理: 内存缓存 + Redis

容器配置:
  - 镜像: node:18-alpine
  - 内存限制: 4GB
  - CPU限制: 2核
  - 端口: 3002
  - 环境变量: REDIS_URL, GAME_CONFIG

性能指标:
  - 并发处理: 1000 connections
  - 响应时间: <30ms
  - 内存使用: ~1.5GB
```

#### 事件溯源服务 (Event Sourcing Service)
```yaml
功能职责:
  - 事件存储和检索
  - 状态快照管理
  - 事件回放功能
  - 数据一致性保证

技术实现:
  - 运行时: Node.js 18
  - 事件存储: PostgreSQL + 自定义表结构
  - 快照策略: 每1000个事件生成快照
  - 压缩算法: LZ4压缩事件数据

容器配置:
  - 镜像: node:18-alpine
  - 内存限制: 2GB
  - CPU限制: 1核
  - 端口: 3003
  - 挂载卷: 事件数据持久化

性能指标:
  - 事件写入: 5000 events/s
  - 查询响应: <20ms
  - 内存使用: ~800MB
```

#### 规则引擎服务 (Rule Engine Service)
```yaml
功能职责:
  - 天道法则执行
  - 因果关系计算
  - 规则冲突处理
  - 动态规则加载

技术实现:
  - 运行时: Node.js 18
  - 规则引擎: 自研轻量级引擎
  - 配置格式: YAML规则文件
  - 执行策略: 优先级队列

容器配置:
  - 镜像: node:18-alpine
  - 内存限制: 1.5GB
  - CPU限制: 1核
  - 端口: 3004
  - 配置挂载: 规则配置文件

性能指标:
  - 规则执行: 2000 rules/s
  - 响应时间: <10ms
  - 内存使用: ~500MB
```

#### 数据服务 (Data Service)
```yaml
功能职责:
  - 数据库访问抽象
  - 缓存管理
  - 数据验证
  - 连接池管理

技术实现:
  - 运行时: Node.js 18
  - ORM: Prisma
  - 缓存: Redis客户端
  - 连接池: pg-pool

容器配置:
  - 镜像: node:18-alpine
  - 内存限制: 1GB
  - CPU限制: 0.5核
  - 端口: 3005
  - 环境变量: DATABASE_URL, REDIS_URL

性能指标:
  - 查询处理: 3000 queries/s
  - 缓存命中率: >90%
  - 内存使用: ~300MB
```

### 4. 存储层实现

#### Redis缓存 (热数据层)
```yaml
功能用途:
  - 玩家在线状态
  - 游戏会话数据
  - 频繁查询结果缓存
  - 实时排行榜

配置优化:
  - 内存策略: allkeys-lru
  - 持久化: RDB + AOF
  - 最大内存: 8GB
  - 过期策略: 自动清理

容器配置:
  - 镜像: redis:7-alpine
  - 内存限制: 10GB
  - CPU限制: 1核
  - 端口: 6379
  - 数据卷: redis-data

性能调优:
  - tcp-keepalive: 300
  - timeout: 0
  - maxclients: 10000
  - 禁用危险命令: FLUSHDB, FLUSHALL
```

#### PostgreSQL数据库 (温数据层)
```yaml
功能用途:
  - 用户账户数据
  - 游戏历史记录
  - 事件存储
  - 统计分析数据

配置优化:
  - shared_buffers: 8GB
  - effective_cache_size: 24GB
  - work_mem: 256MB
  - maintenance_work_mem: 2GB
  - max_connections: 200

容器配置:
  - 镜像: postgres:15-alpine
  - 内存限制: 12GB
  - CPU限制: 2核
  - 端口: 5432
  - 数据卷: postgres-data

表结构设计:
  - 用户表: 分区按注册时间
  - 事件表: 分区按时间范围
  - 索引策略: 复合索引优化查询
  - 备份策略: 每日全量 + 实时WAL
```

#### 文件存储 (冷数据层)
```yaml
存储策略:
  - 本地文件系统: /data/archive
  - 压缩格式: tar.gz
  - 归档周期: 每月归档
  - 清理策略: 保留2年

目录结构:
  /data/archive/
  ├── events/          # 历史事件归档
  ├── logs/           # 系统日志归档
  ├── backups/        # 数据库备份
  └── assets/         # 静态资源

自动化脚本:
  - 定时归档: cron任务
  - 压缩清理: 自动化脚本
  - 完整性检查: 校验和验证
```

## Docker Compose部署配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  # 网关层
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
      - ./web/dist:/usr/share/nginx/html
    depends_on:
      - user-service
      - game-service
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'

  # 服务层
  user-service:
    build: ./services/user
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '1'

  game-service:
    build: ./services/game
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=production
      - REDIS_URL=${REDIS_URL}
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: '2'

  event-service:
    build: ./services/event
    ports:
      - "3003:3003"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    volumes:
      - event-data:/app/data
    depends_on:
      - postgres
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1'

  rule-service:
    build: ./services/rule
    ports:
      - "3004:3004"
    volumes:
      - ./config/rules:/app/rules:ro
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 1.5G
          cpus: '1'

  data-service:
    build: ./services/data
    ports:
      - "3005:3005"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'

  # 存储层
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=immortality
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./postgres/postgresql.conf:/etc/postgresql/postgresql.conf
      - ./postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 12G
          cpus: '2'

  redis:
    image: redis:7-alpine
    command: redis-server /etc/redis/redis.conf
    volumes:
      - redis-data:/data
      - ./redis/redis.conf:/etc/redis/redis.conf
    ports:
      - "6379:6379"
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 10G
          cpus: '1'

  # 监控服务
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
    volumes:
      - grafana-data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards
    depends_on:
      - prometheus
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'

volumes:
  postgres-data:
  redis-data:
  event-data:
  prometheus-data:
  grafana-data:

networks:
  default:
    driver: bridge
```

## 资源分配策略

### CPU分配 (8核心总计)
```yaml
CPU分配:
  - Nginx: 0.5核 (6.25%)
  - 游戏逻辑服务: 2核 (25%)
  - PostgreSQL: 2核 (25%)
  - 事件溯源服务: 1核 (12.5%)
  - 用户服务: 1核 (12.5%)
  - 规则引擎服务: 1核 (12.5%)
  - Redis: 1核 (12.5%)
  - 数据服务: 0.5核 (6.25%)
  - 监控服务: 1核 (12.5%)
  - 系统预留: 0.5核 (6.25%)

总计: 10.5核 (需要超配，实际使用约8核)
```

### 内存分配 (32GB总计)
```yaml
内存分配:
  - PostgreSQL: 12GB (37.5%)
  - Redis: 10GB (31.25%)
  - 游戏逻辑服务: 4GB (12.5%)
  - 事件溯源服务: 2GB (6.25%)
  - 规则引擎服务: 1.5GB (4.7%)
  - 用户服务: 1GB (3.1%)
  - 数据服务: 1GB (3.1%)
  - Nginx: 512MB (1.6%)
  - 监控服务: 1.5GB (4.7%)
  - 系统预留: 2GB (6.25%)

总计: 35.5GB (需要超配，实际使用约30GB)
```

### 存储分配
```yaml
NVMe SSD (500GB):
  - 操作系统: 50GB
  - Docker镜像: 20GB
  - PostgreSQL数据: 200GB
  - Redis持久化: 50GB
  - 应用日志: 30GB
  - 监控数据: 20GB
  - 系统缓存: 30GB
  - 预留空间: 100GB

HDD (1TB):
  - 数据备份: 400GB
  - 日志归档: 300GB
  - 事件归档: 200GB
  - 预留空间: 100GB
```

## 性能优化配置

### PostgreSQL优化
```sql
-- postgresql.conf关键配置
shared_buffers = 8GB                    # 25%内存
effective_cache_size = 24GB              # 75%内存
work_mem = 256MB                         # 排序内存
maintenance_work_mem = 2GB               # 维护内存
max_connections = 200                    # 最大连接数
checkpoint_completion_target = 0.9       # 检查点优化
wal_buffers = 64MB                       # WAL缓冲
default_statistics_target = 100          # 统计信息
random_page_cost = 1.1                   # SSD优化
effective_io_concurrency = 200           # 并发IO

-- 索引优化
CREATE INDEX CONCURRENTLY idx_events_player_time 
ON events(player_id, created_at) 
WHERE created_at > NOW() - INTERVAL '30 days';

CREATE INDEX CONCURRENTLY idx_users_active 
ON users(last_login_at) 
WHERE last_login_at > NOW() - INTERVAL '7 days';
```

### Redis优化
```conf
# redis.conf关键配置
maxmemory 8gb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
appendonly yes
appendfsync everysec
tcp-keepalive 300
timeout 0
maxclients 10000

# 禁用危险命令
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command CONFIG ""
```

### Node.js应用优化
```javascript
// 性能优化配置
process.env.NODE_ENV = 'production';
process.env.UV_THREADPOOL_SIZE = 128;

// PM2配置
module.exports = {
  apps: [{
    name: 'game-service',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    max_memory_restart: '3G',
    node_args: '--max-old-space-size=3072',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

## 监控和告警配置

### 关键监控指标
```yaml
系统监控:
  - CPU使用率: >80%告警
  - 内存使用率: >85%告警
  - 磁盘使用率: >90%告警
  - 网络延迟: >100ms告警

应用监控:
  - 响应时间: >100ms告警
  - 错误率: >1%告警
  - 并发连接数: >800告警
  - 数据库连接池: >80%告警

业务监控:
  - 在线用户数: 实时统计
  - 游戏操作频率: TPS监控
  - 事件处理延迟: <10ms目标
  - 缓存命中率: >90%目标
```

### Prometheus配置
```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']
  
  - job_name: 'postgres-exporter'
    static_configs:
      - targets: ['localhost:9187']
  
  - job_name: 'redis-exporter'
    static_configs:
      - targets: ['localhost:9121']
  
  - job_name: 'game-services'
    static_configs:
      - targets: 
        - 'user-service:3001'
        - 'game-service:3002'
        - 'event-service:3003'
        - 'rule-service:3004'
        - 'data-service:3005'
```

## 部署顺序和步骤

### 第一阶段：基础环境准备 (1-2天)

#### 1. 服务器初始化
```bash
# 系统更新
sudo apt update && sudo apt upgrade -y

# 安装必要软件
sudo apt install -y docker.io docker-compose git htop iotop nethogs

# 配置Docker
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER

# 配置防火墙
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# 系统优化
echo 'vm.max_map_count=262144' | sudo tee -a /etc/sysctl.conf
echo 'fs.file-max=65536' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

#### 2. 目录结构创建
```bash
# 创建项目目录
mkdir -p /opt/immortality/{config,data,logs,backups}
cd /opt/immortality

# 创建配置目录
mkdir -p config/{nginx,postgres,redis,rules,monitoring}
mkdir -p data/{postgres,redis,events,archive}
mkdir -p logs/{nginx,app,system}
```

#### 3. 环境变量配置
```bash
# 创建.env文件
cat > .env << EOF
# 数据库配置
DB_USER=immortality
DB_PASSWORD=$(openssl rand -base64 32)
DATABASE_URL=postgresql://\${DB_USER}:\${DB_PASSWORD}@postgres:5432/immortality

# Redis配置
REDIS_URL=redis://redis:6379

# JWT密钥
JWT_SECRET=$(openssl rand -base64 64)

# 监控配置
GRAFANA_PASSWORD=$(openssl rand -base64 16)

# 应用配置
NODE_ENV=production
LOG_LEVEL=info
EOF
```

### 第二阶段：存储层部署 (1天)

#### 1. PostgreSQL部署
```bash
# 创建PostgreSQL配置
cat > config/postgres/postgresql.conf << EOF
shared_buffers = 8GB
effective_cache_size = 24GB
work_mem = 256MB
maintenance_work_mem = 2GB
max_connections = 200
checkpoint_completion_target = 0.9
wal_buffers = 64MB
default_statistics_target = 100
random_page_cost = 1.1
effective_io_concurrency = 200
log_statement = 'mod'
log_min_duration_statement = 1000
EOF

# 创建初始化脚本
cat > config/postgres/init.sql << EOF
-- 创建数据库和用户
CREATE DATABASE immortality;
CREATE USER immortality WITH PASSWORD '${DB_PASSWORD}';
GRANT ALL PRIVILEGES ON DATABASE immortality TO immortality;

-- 创建基础表结构
\c immortality;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_login_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    schema_version VARCHAR(10) DEFAULT '1.0'
);

CREATE INDEX idx_events_player_time ON events(player_id, created_at);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_users_active ON users(last_login_at) WHERE last_login_at > NOW() - INTERVAL '7 days';
EOF

# 启动PostgreSQL
docker-compose up -d postgres

# 等待启动完成
sleep 30

# 验证连接
docker-compose exec postgres psql -U immortality -d immortality -c "SELECT version();"
```

#### 2. Redis部署
```bash
# 创建Redis配置
cat > config/redis/redis.conf << EOF
maxmemory 8gb
maxmemory-policy allkeys-lru
save 900 1
save 300 10
save 60 10000
appendonly yes
appendfsync everysec
tcp-keepalive 300
timeout 0
maxclients 10000
bind 0.0.0.0
protected-mode no
rename-command FLUSHDB ""
rename-command FLUSHALL ""
rename-command CONFIG ""
EOF

# 启动Redis
docker-compose up -d redis

# 验证连接
docker-compose exec redis redis-cli ping
```

### 第三阶段：服务层部署 (2-3天)

#### 1. 构建应用镜像
```bash
# 克隆代码仓库
git clone https://github.com/your-org/immortality.git src
cd src

# 构建各个服务
docker build -t immortality/user-service ./services/user
docker build -t immortality/game-service ./services/game
docker build -t immortality/event-service ./services/event
docker build -t immortality/rule-service ./services/rule
docker build -t immortality/data-service ./services/data
```

#### 2. 部署微服务
```bash
# 启动数据服务（最先启动）
docker-compose up -d data-service
sleep 10

# 启动核心服务
docker-compose up -d user-service event-service rule-service
sleep 15

# 启动游戏逻辑服务
docker-compose up -d game-service
sleep 10

# 验证服务状态
docker-compose ps
curl http://localhost:3001/health
curl http://localhost:3002/health
```

### 第四阶段：网关层部署 (半天)

#### 1. Nginx配置
```bash
# 创建Nginx配置
cat > config/nginx/nginx.conf << EOF
events {
    worker_connections 1024;
}

http {
    upstream user_service {
        server user-service:3001;
    }
    
    upstream game_service {
        server game-service:3002;
    }
    
    server {
        listen 80;
        server_name _;
        
        # 静态文件
        location / {
            root /usr/share/nginx/html;
            try_files \$uri \$uri/ /index.html;
        }
        
        # API路由
        location /api/auth/ {
            proxy_pass http://user_service/;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
        }
        
        location /api/game/ {
            proxy_pass http://game_service/;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
        }
        
        # WebSocket支持
        location /socket.io/ {
            proxy_pass http://game_service;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }
}
EOF

# 启动Nginx
docker-compose up -d nginx
```

### 第五阶段：监控系统部署 (半天)

```bash
# 创建监控配置
cat > config/monitoring/prometheus.yml << EOF
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'immortality-services'
    static_configs:
      - targets:
        - 'user-service:3001'
        - 'game-service:3002'
        - 'event-service:3003'
        - 'rule-service:3004'
        - 'data-service:3005'
EOF

# 启动监控服务
docker-compose up -d prometheus grafana

# 访问监控面板
echo "Grafana: http://your-server-ip:3000"
echo "Prometheus: http://your-server-ip:9090"
```

### 第六阶段：系统验证和优化 (1-2天)

#### 1. 功能测试
```bash
# 健康检查脚本
cat > scripts/health_check.sh << EOF
#!/bin/bash
echo "=== 系统健康检查 ==="

# 检查容器状态
echo "容器状态:"
docker-compose ps

# 检查服务响应
echo "\n服务响应检查:"
for service in user-service:3001 game-service:3002 event-service:3003; do
    if curl -s http://localhost:\${service#*:}/health > /dev/null; then
        echo "✓ \$service 正常"
    else
        echo "✗ \$service 异常"
    fi
done

# 检查数据库连接
echo "\n数据库连接:"
if docker-compose exec -T postgres pg_isready -U immortality > /dev/null; then
    echo "✓ PostgreSQL 连接正常"
else
    echo "✗ PostgreSQL 连接异常"
fi

if docker-compose exec -T redis redis-cli ping > /dev/null; then
    echo "✓ Redis 连接正常"
else
    echo "✗ Redis 连接异常"
fi

# 检查资源使用
echo "\n资源使用情况:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"
EOF

chmod +x scripts/health_check.sh
./scripts/health_check.sh
```

#### 2. 性能测试
```bash
# 安装压力测试工具
pip install locust

# 创建压力测试脚本
cat > scripts/load_test.py << EOF
from locust import HttpUser, task, between

class GameUser(HttpUser):
    wait_time = between(1, 3)
    
    def on_start(self):
        # 用户登录
        response = self.client.post("/api/auth/login", json={
            "username": "test_user",
            "password": "test_password"
        })
        if response.status_code == 200:
            self.token = response.json().get("token")
    
    @task(3)
    def get_player_status(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.client.get("/api/game/player/status", headers=headers)
    
    @task(1)
    def perform_action(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        self.client.post("/api/game/action/cultivate", 
                        json={"duration": 60}, headers=headers)
EOF

# 运行压力测试
locust -f scripts/load_test.py --host=http://localhost
```

## 运维和维护

### 日常维护脚本
```bash
# 创建维护脚本目录
mkdir -p scripts/maintenance

# 数据备份脚本
cat > scripts/maintenance/backup.sh << EOF
#!/bin/bash
DATE=\$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/immortality/backups/\$DATE"

mkdir -p \$BACKUP_DIR

# 数据库备份
docker-compose exec -T postgres pg_dump -U immortality immortality | gzip > \$BACKUP_DIR/postgres_\$DATE.sql.gz

# Redis备份
docker-compose exec -T redis redis-cli BGSAVE
sleep 10
docker cp \$(docker-compose ps -q redis):/data/dump.rdb \$BACKUP_DIR/redis_\$DATE.rdb

# 配置文件备份
tar -czf \$BACKUP_DIR/config_\$DATE.tar.gz config/

echo "备份完成: \$BACKUP_DIR"
EOF

# 日志清理脚本
cat > scripts/maintenance/cleanup.sh << EOF
#!/bin/bash
# 清理30天前的日志
find /opt/immortality/logs -name "*.log" -mtime +30 -delete

# 清理Docker日志
docker system prune -f

# 清理旧备份（保留7天）
find /opt/immortality/backups -type d -mtime +7 -exec rm -rf {} +

echo "清理完成"
EOF

# 设置定时任务
crontab -e
# 添加以下行：
# 0 2 * * * /opt/immortality/scripts/maintenance/backup.sh
# 0 3 * * * /opt/immortality/scripts/maintenance/cleanup.sh
```

### 故障恢复流程
```bash
# 创建故障恢复脚本
cat > scripts/disaster_recovery.sh << EOF
#!/bin/bash
echo "=== 灾难恢复流程 ==="

# 1. 停止所有服务
echo "停止服务..."
docker-compose down

# 2. 恢复数据
echo "恢复数据..."
read -p "请输入备份日期 (YYYYMMDD_HHMMSS): " BACKUP_DATE
BACKUP_DIR="/opt/immortality/backups/\$BACKUP_DATE"

if [ -d "\$BACKUP_DIR" ]; then
    # 恢复PostgreSQL
    docker-compose up -d postgres
    sleep 30
    zcat \$BACKUP_DIR/postgres_\$BACKUP_DATE.sql.gz | docker-compose exec -T postgres psql -U immortality immortality
    
    # 恢复Redis
    docker cp \$BACKUP_DIR/redis_\$BACKUP_DATE.rdb \$(docker-compose ps -q redis):/data/dump.rdb
    
    # 恢复配置
    tar -xzf \$BACKUP_DIR/config_\$BACKUP_DATE.tar.gz
    
    echo "数据恢复完成"
else
    echo "备份目录不存在: \$BACKUP_DIR"
    exit 1
fi

# 3. 重启服务
echo "重启服务..."
docker-compose up -d

# 4. 验证服务
echo "验证服务..."
sleep 60
./scripts/health_check.sh

echo "灾难恢复完成"
EOF

chmod +x scripts/disaster_recovery.sh
```

## 成本分析

### 月度运营成本
```yaml
硬件成本:
  VPS租用: ¥800-1200/月
  域名费用: ¥100/年
  SSL证书: 免费 (Let's Encrypt)
  
运维成本:
  监控服务: ¥0 (自建)
  备份存储: ¥50/月
  CDN加速: ¥200/月 (可选)
  
总计: ¥1050-1450/月
```

### 扩容策略
```yaml
垂直扩容 (单机优化):
  - 升级到16核64GB: +¥500/月
  - 增加SSD存储: +¥200/月
  - 优化数据库配置
  
水平扩容 (多机部署):
  - 数据库分离: +¥600/月
  - 应用服务器集群: +¥800/月
  - 负载均衡器: +¥300/月
  
云服务迁移:
  - 托管数据库: +¥400/月
  - 容器服务: +¥600/月
  - 对象存储: +¥100/月
```

## 总结

本部署方案基于Alpha阶段的具体需求，在单台VPS上实现了完整的微服务架构，具备以下特点：

1. **架构完整性**: 涵盖了所有架构元素的具体实现
2. **资源优化**: 合理分配CPU、内存和存储资源
3. **性能保证**: 满足1000并发用户的性能要求
4. **运维友好**: 提供完整的部署、监控和维护方案
5. **成本可控**: 月度成本在¥1000-1500范围内
6. **扩展性**: 支持垂直和水平扩容策略

通过这个部署方案，可以在控制成本的同时，验证核心架构设计的可行性，为后续的规模化部署奠定基础。