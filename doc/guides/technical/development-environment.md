# 开发环境配置指南

## 概述

本指南详细说明了Immortality修仙游戏项目的开发环境配置，包括Docker容器化部署、开发工具链设置、代码质量工具配置和调试环境搭建。通过标准化的开发环境，确保团队成员能够快速上手并保持一致的开发体验。

## 🛠️ **系统要求**

### 硬件要求
- **CPU**: 4核心以上（推荐8核心）
- **内存**: 16GB以上（推荐32GB）
- **存储**: 100GB可用空间（SSD推荐）
- **网络**: 稳定的互联网连接

### 软件要求
- **操作系统**: Windows 10/11, macOS 12+, Ubuntu 20.04+
- **Docker**: 20.10+
- **Docker Compose**: 2.0+
- **Node.js**: 18.17+ (推荐使用nvm管理版本)
- **Git**: 2.30+
- **IDE**: VS Code (推荐) 或 WebStorm

## 🐳 **Docker 容器化环境**

### 项目结构

```
Immortality/
├── docker/
│   ├── development/
│   │   ├── docker-compose.yml
│   │   ├── docker-compose.override.yml
│   │   └── .env.development
│   ├── production/
│   │   ├── docker-compose.prod.yml
│   │   └── .env.production
│   └── services/
│       ├── postgres/
│       │   ├── Dockerfile
│       │   └── init.sql
│       ├── eventstore/
│       │   ├── Dockerfile
│       │   └── eventstore.conf
│       ├── redis/
│       │   ├── Dockerfile
│       │   └── redis.conf
│       └── minio/
│           ├── Dockerfile
│           └── minio.conf
├── frontend/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── nginx.conf
├── backend/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── nest-cli.json
└── scripts/
    ├── setup-dev.sh
    ├── start-dev.sh
    └── cleanup.sh
```

### 开发环境 Docker Compose

```yaml
# docker/development/docker-compose.yml
version: '3.8'

services:
  # PostgreSQL 主数据库
  postgres:
    image: postgres:15-alpine
    container_name: immortality-postgres
    environment:
      POSTGRES_DB: immortality_dev
      POSTGRES_USER: immortality
      POSTGRES_PASSWORD: dev_password_123
      POSTGRES_INITDB_ARGS: "--encoding=UTF-8 --lc-collate=C --lc-ctype=C"
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./services/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
      - ./services/postgres/postgresql.conf:/etc/postgresql/postgresql.conf
    command: |
      postgres 
        -c config_file=/etc/postgresql/postgresql.conf
        -c log_statement=all
        -c log_destination=stderr
        -c logging_collector=on
        -c log_directory=/var/log/postgresql
    networks:
      - immortality-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U immortality -d immortality_dev"]
      interval: 10s
      timeout: 5s
      retries: 5

  # EventStoreDB 事件存储
  eventstore:
    image: eventstore/eventstore:23.10.0-bookworm-slim
    container_name: immortality-eventstore
    environment:
      EVENTSTORE_CLUSTER_SIZE: 1
      EVENTSTORE_RUN_PROJECTIONS: All
      EVENTSTORE_START_STANDARD_PROJECTIONS: true
      EVENTSTORE_EXT_TCP_PORT: 1113
      EVENTSTORE_HTTP_PORT: 2113
      EVENTSTORE_INSECURE: true
      EVENTSTORE_ENABLE_EXTERNAL_TCP: true
      EVENTSTORE_ENABLE_ATOM_PUB_OVER_HTTP: true
      EVENTSTORE_MEM_DB: false
      EVENTSTORE_LOG_LEVEL: Information
    ports:
      - "1113:1113"
      - "2113:2113"
    volumes:
      - eventstore_data:/var/lib/eventstore
      - eventstore_logs:/var/log/eventstore
    networks:
      - immortality-network
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:2113/health/live || exit 1"]
      interval: 15s
      timeout: 10s
      retries: 5

  # Redis 缓存
  redis:
    image: redis:7-alpine
    container_name: immortality-redis
    command: |
      redis-server 
        --appendonly yes 
        --appendfsync everysec 
        --maxmemory 512mb 
        --maxmemory-policy allkeys-lru
        --requirepass dev_redis_password
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
      - ./services/redis/redis.conf:/usr/local/etc/redis/redis.conf
    networks:
      - immortality-network
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "dev_redis_password", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3

  # MinIO 对象存储
  minio:
    image: minio/minio:latest
    container_name: immortality-minio
    environment:
      MINIO_ROOT_USER: immortality
      MINIO_ROOT_PASSWORD: dev_minio_password_123
      MINIO_BROWSER_REDIRECT_URL: http://localhost:9001
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data
    networks:
      - immortality-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3

  # 后端服务 (开发模式)
  backend:
    build:
      context: ../../backend
      dockerfile: Dockerfile.dev
    container_name: immortality-backend
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://immortality:dev_password_123@postgres:5432/immortality_dev
      EVENTSTORE_CONNECTION_STRING: esdb://eventstore:2113?tls=false
      REDIS_URL: redis://:dev_redis_password@redis:6379
      MINIO_ENDPOINT: minio
      MINIO_PORT: 9000
      MINIO_ACCESS_KEY: immortality
      MINIO_SECRET_KEY: dev_minio_password_123
      JWT_SECRET: dev_jwt_secret_key_for_development_only
      PORT: 3001
    ports:
      - "3001:3001"
      - "9229:9229" # Node.js 调试端口
    volumes:
      - ../../backend:/app
      - /app/node_modules
      - backend_logs:/app/logs
    depends_on:
      postgres:
        condition: service_healthy
      eventstore:
        condition: service_healthy
      redis:
        condition: service_healthy
      minio:
        condition: service_healthy
    networks:
      - immortality-network
    command: |
      sh -c "
        npm install &&
        npm run migration:run &&
        npm run seed:dev &&
        npm run start:debug
      "
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:3001/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5

  # 前端服务 (开发模式)
  frontend:
    build:
      context: ../../frontend
      dockerfile: Dockerfile.dev
    container_name: immortality-frontend
    environment:
      NODE_ENV: development
      VITE_API_BASE_URL: http://localhost:3001
      VITE_WS_URL: ws://localhost:3001
      VITE_MINIO_ENDPOINT: http://localhost:9000
      CHOKIDAR_USEPOLLING: true
    ports:
      - "3000:3000"
    volumes:
      - ../../frontend:/app
      - /app/node_modules
    depends_on:
      - backend
    networks:
      - immortality-network
    command: |
      sh -c "
        npm install &&
        npm run dev -- --host 0.0.0.0
      "
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:3000 || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Nginx 反向代理 (可选)
  nginx:
    image: nginx:alpine
    container_name: immortality-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ../../nginx/nginx.dev.conf:/etc/nginx/nginx.conf
      - ../../nginx/ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    networks:
      - immortality-network
    profiles:
      - nginx

volumes:
  postgres_data:
    driver: local
  eventstore_data:
    driver: local
  eventstore_logs:
    driver: local
  redis_data:
    driver: local
  minio_data:
    driver: local
  backend_logs:
    driver: local

networks:
  immortality-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

### 环境变量配置

```bash
# docker/development/.env.development

# 数据库配置
POSTGRES_DB=immortality_dev
POSTGRES_USER=immortality
POSTGRES_PASSWORD=dev_password_123
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

# EventStore 配置
EVENTSTORE_CONNECTION_STRING=esdb://eventstore:2113?tls=false
EVENTSTORE_USERNAME=admin
EVENTSTORE_PASSWORD=changeit

# Redis 配置
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=dev_redis_password
REDIS_DB=0

# MinIO 配置
MINIO_ENDPOINT=minio
MINIO_PORT=9000
MINIO_ACCESS_KEY=immortality
MINIO_SECRET_KEY=dev_minio_password_123
MINIO_USE_SSL=false

# 应用配置
NODE_ENV=development
PORT=3001
JWT_SECRET=dev_jwt_secret_key_for_development_only
JWT_EXPIRES_IN=7d

# 日志配置
LOG_LEVEL=debug
LOG_FORMAT=combined

# 开发工具
ENABLE_SWAGGER=true
ENABLE_PLAYGROUND=true
ENABLE_DEBUG=true

# 前端配置
VITE_API_BASE_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
VITE_MINIO_ENDPOINT=http://localhost:9000
VITE_APP_NAME=Immortality Dev
VITE_APP_VERSION=0.1.0-alpha
```

### Docker 服务配置

#### PostgreSQL 初始化脚本

```sql
-- docker/services/postgres/init.sql

-- 创建扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- 创建开发用户
CREATE USER immortality_dev WITH PASSWORD 'dev_password_123';
GRANT ALL PRIVILEGES ON DATABASE immortality_dev TO immortality_dev;

-- 创建测试数据库
CREATE DATABASE immortality_test OWNER immortality;
GRANT ALL PRIVILEGES ON DATABASE immortality_test TO immortality_dev;

-- 设置默认权限
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO immortality_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO immortality_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO immortality_dev;

-- 创建开发用的示例数据
INSERT INTO users (id, username, email, password_hash) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'dev_user', 'dev@immortality.game', '$2b$10$example_hash'),
('550e8400-e29b-41d4-a716-446655440001', 'test_user', 'test@immortality.game', '$2b$10$example_hash');

INSERT INTO players (id, user_id, name, level, realm, experience) VALUES 
('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', '开发测试者', 10, '筑基期', 5000),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '测试修仙者', 5, '练气期', 1200);
```

#### Redis 配置

```conf
# docker/services/redis/redis.conf

# 基础配置
bind 0.0.0.0
port 6379
protected-mode yes
requirepass dev_redis_password

# 内存配置
maxmemory 512mb
maxmemory-policy allkeys-lru

# 持久化配置
save 900 1
save 300 10
save 60 10000
appendonly yes
appendfsync everysec

# 日志配置
loglevel notice
logfile "/var/log/redis/redis.log"

# 性能配置
tcp-keepalive 300
timeout 0
tcp-backlog 511

# 开发环境特定配置
stop-writes-on-bgsave-error no
rdbcompression yes
rdbchecksum yes

# 慢查询日志
slowlog-log-slower-than 10000
slowlog-max-len 128
```

## 🔧 **开发工具链配置**

### Node.js 版本管理

```bash
# 安装 nvm (Node Version Manager)
# Windows (使用 nvm-windows)
choco install nvm

# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 安装并使用 Node.js 18
nvm install 18.17.0
nvm use 18.17.0
nvm alias default 18.17.0

# 验证安装
node --version  # v18.17.0
npm --version   # 9.6.7
```

### 包管理器配置

```bash
# 安装 pnpm (推荐)
npm install -g pnpm@latest

# 配置 pnpm
pnpm config set registry https://registry.npmmirror.com/
pnpm config set store-dir ~/.pnpm-store
pnpm config set cache-dir ~/.pnpm-cache

# 项目根目录创建 .npmrc
echo "registry=https://registry.npmmirror.com/" > .npmrc
echo "shamefully-hoist=true" >> .npmrc
echo "strict-peer-dependencies=false" >> .npmrc
```

### VS Code 配置

#### 推荐扩展

```json
// .vscode/extensions.json
{
  "recommendations": [
    // TypeScript 支持
    "ms-vscode.vscode-typescript-next",
    
    // React 开发
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    
    // 代码质量
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-json",
    
    // Git 工具
    "eamodio.gitlens",
    "github.vscode-pull-request-github",
    
    // Docker 支持
    "ms-azuretools.vscode-docker",
    
    // 数据库工具
    "ms-mssql.mssql",
    "cweijan.vscode-postgresql-client2",
    
    // 开发工具
    "humao.rest-client",
    "rangav.vscode-thunder-client",
    "ms-vscode.vscode-json",
    
    // 主题和图标
    "pkief.material-icon-theme",
    "github.github-vscode-theme"
  ]
}
```

#### 工作区配置

```json
// .vscode/settings.json
{
  // TypeScript 配置
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  
  // 格式化配置
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  
  // 文件配置
  "files.autoSave": "onFocusChange",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  
  // 搜索配置
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true,
    "**/.git": true,
    "**/coverage": true
  },
  
  // Tailwind CSS
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "tailwindCSS.experimental.classRegex": [
    "tw`([^`]*)",
    "tw\\.[^`]+`([^`]*)`",
    "tw\\(.*?\\).*?`([^`]*)"
  ],
  
  // 终端配置
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "icon": "terminal-powershell"
    }
  },
  
  // Docker 配置
  "docker.showStartPage": false,
  
  // 调试配置
  "debug.allowBreakpointsEverywhere": true
}
```

#### 调试配置

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Backend (Docker)",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "address": "localhost",
      "localRoot": "${workspaceFolder}/backend",
      "remoteRoot": "/app",
      "protocol": "inspector",
      "restart": true,
      "sourceMaps": true,
      "outFiles": ["${workspaceFolder}/backend/dist/**/*.js"]
    },
    {
      "name": "Debug Backend (Local)",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/backend/src/main.ts",
      "args": [],
      "runtimeArgs": ["-r", "ts-node/register"],
      "sourceMaps": true,
      "envFile": "${workspaceFolder}/backend/.env.development",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Debug Frontend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/frontend/node_modules/.bin/vite",
      "args": ["--mode", "development"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "envFile": "${workspaceFolder}/frontend/.env.development"
    },
    {
      "name": "Debug Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/backend/node_modules/.bin/jest",
      "args": ["--runInBand", "--detectOpenHandles"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "envFile": "${workspaceFolder}/backend/.env.test"
    }
  ]
}
```

### 代码质量工具

#### ESLint 配置

```json
// .eslintrc.json
{
  "root": true,
  "env": {
    "node": true,
    "es2022": true,
    "browser": true
  },
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["./tsconfig.json"]
  },
  "plugins": ["@typescript-eslint", "import"],
  "rules": {
    // TypeScript 规则
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/prefer-const": "error",
    
    // 导入规则
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    
    // 通用规则
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error"
  },
  "overrides": [
    {
      "files": ["*.test.ts", "*.spec.ts"],
      "env": {
        "jest": true
      },
      "rules": {
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ]
}
```

#### Prettier 配置

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "proseWrap": "preserve"
}
```

```
# .prettierignore
node_modules/
dist/
build/
coverage/
*.min.js
*.min.css
package-lock.json
pnpm-lock.yaml
yarn.lock
.env*
*.log
```

#### Husky Git Hooks

```json
// package.json (部分)
{
  "scripts": {
    "prepare": "husky install",
    "lint": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:coverage": "jest --coverage"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ]
  }
}
```

```bash
#!/bin/sh
# .husky/pre-commit
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
npm run type-check
```

```bash
#!/bin/sh
# .husky/commit-msg
. "$(dirname "$0")/_/husky.sh"

npx commitlint --edit $1
```

## 🚀 **快速启动脚本**

### 开发环境启动脚本

```bash
#!/bin/bash
# scripts/setup-dev.sh

set -e

echo "🚀 设置 Immortality 开发环境..."

# 检查依赖
command -v docker >/dev/null 2>&1 || { echo "❌ Docker 未安装"; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "❌ Docker Compose 未安装"; exit 1; }
command -v node >/dev/null 2>&1 || { echo "❌ Node.js 未安装"; exit 1; }

# 检查 Node.js 版本
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 版本需要 18 或更高，当前版本: $(node -v)"
    exit 1
fi

echo "✅ 依赖检查通过"

# 创建必要的目录
mkdir -p logs
mkdir -p data/postgres
mkdir -p data/eventstore
mkdir -p data/redis
mkdir -p data/minio

echo "✅ 目录结构创建完成"

# 复制环境变量文件
if [ ! -f "docker/development/.env.development" ]; then
    cp docker/development/.env.development.example docker/development/.env.development
    echo "✅ 环境变量文件已创建，请根据需要修改"
fi

# 安装依赖
echo "📦 安装前端依赖..."
cd frontend && npm install && cd ..

echo "📦 安装后端依赖..."
cd backend && npm install && cd ..

echo "✅ 依赖安装完成"

# 启动 Docker 服务
echo "🐳 启动 Docker 服务..."
cd docker/development
docker-compose up -d postgres eventstore redis minio

echo "⏳ 等待服务启动..."
sleep 30

# 检查服务状态
echo "🔍 检查服务状态..."
docker-compose ps

echo "✅ 开发环境设置完成！"
echo ""
echo "🌐 服务访问地址:"
echo "  - 前端: http://localhost:3000"
echo "  - 后端 API: http://localhost:3001"
echo "  - Swagger 文档: http://localhost:3001/api"
echo "  - EventStore UI: http://localhost:2113"
echo "  - MinIO Console: http://localhost:9001"
echo ""
echo "🚀 启动开发服务器:"
echo "  npm run dev:start"
```

```bash
#!/bin/bash
# scripts/start-dev.sh

set -e

echo "🚀 启动 Immortality 开发服务器..."

# 检查 Docker 服务
cd docker/development
if ! docker-compose ps | grep -q "Up"; then
    echo "🐳 启动 Docker 服务..."
    docker-compose up -d
    echo "⏳ 等待服务启动..."
    sleep 20
fi

cd ../..

# 启动后端服务
echo "🔧 启动后端服务..."
cd backend
npm run start:dev &
BACKEND_PID=$!
cd ..

# 等待后端启动
echo "⏳ 等待后端服务启动..."
sleep 10

# 启动前端服务
echo "🎨 启动前端服务..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ 开发服务器启动完成！"
echo ""
echo "🌐 访问地址:"
echo "  - 前端: http://localhost:3000"
echo "  - 后端: http://localhost:3001"
echo "  - API 文档: http://localhost:3001/api"
echo ""
echo "⏹️  停止服务: Ctrl+C"

# 等待用户中断
trap "echo '\n🛑 停止服务...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
```

```bash
#!/bin/bash
# scripts/cleanup.sh

echo "🧹 清理开发环境..."

# 停止并删除容器
cd docker/development
docker-compose down -v

# 清理 Docker 资源
docker system prune -f
docker volume prune -f

# 清理 node_modules
echo "🗑️  清理 node_modules..."
rm -rf frontend/node_modules
rm -rf backend/node_modules

# 清理构建文件
echo "🗑️  清理构建文件..."
rm -rf frontend/dist
rm -rf backend/dist
rm -rf coverage

# 清理日志
echo "🗑️  清理日志文件..."
rm -rf logs/*

echo "✅ 清理完成！"
```

## 📋 **开发工作流**

### 1. 日常开发流程

```bash
# 1. 获取最新代码
git pull origin main

# 2. 安装/更新依赖
npm install

# 3. 启动开发环境
npm run dev:setup  # 首次运行
npm run dev:start  # 日常启动

# 4. 开发代码
# ...

# 5. 运行测试
npm run test
npm run test:coverage

# 6. 代码检查
npm run lint
npm run type-check

# 7. 提交代码
git add .
git commit -m "feat: 添加新功能"
git push origin feature/new-feature
```

### 2. 测试策略

```bash
# 单元测试
npm run test:unit

# 集成测试
npm run test:integration

# E2E 测试
npm run test:e2e

# 测试覆盖率
npm run test:coverage

# 监听模式
npm run test:watch
```

### 3. 调试指南

- **后端调试**: 使用 VS Code 调试配置，端口 9229
- **前端调试**: 浏览器开发者工具 + React DevTools
- **数据库调试**: VS Code PostgreSQL 扩展
- **API 调试**: Thunder Client 或 Postman

### 4. 性能监控

- **应用性能**: 内置性能监控中间件
- **数据库性能**: pg_stat_statements 扩展
- **缓存性能**: Redis 慢查询日志
- **容器监控**: Docker stats 命令

## 🔧 **故障排除**

### 常见问题

1. **端口冲突**
   ```bash
   # 查看端口占用
   netstat -tulpn | grep :3000
   # 杀死进程
   kill -9 <PID>
   ```

2. **Docker 服务启动失败**
   ```bash
   # 查看日志
   docker-compose logs <service_name>
   # 重启服务
   docker-compose restart <service_name>
   ```

3. **数据库连接失败**
   ```bash
   # 检查数据库状态
   docker-compose exec postgres pg_isready
   # 重置数据库
   npm run db:reset
   ```

4. **依赖安装失败**
   ```bash
   # 清理缓存
   npm cache clean --force
   # 删除 node_modules 重新安装
   rm -rf node_modules package-lock.json
   npm install
   ```

通过这套完整的开发环境配置，团队成员可以快速搭建一致的开发环境，提高开发效率和代码质量。