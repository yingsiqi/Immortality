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
- **.NET SDK**: 8.0+ (推荐使用.NET SDK版本管理)
- **Git**: 2.30+
- **IDE**: VS Code (推荐) 或 Rider / Visual Studio 2022
- **Tuanjie Engine**: 团结引擎最新稳定版

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
├── client/
│   ├── Dockerfile
│   └── nginx.conf
├── server/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── Immortality.Server.sln
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

  # 服务端 (开发模式 - ASP.NET Core)
  server:
    build:
      context: ../../server
      dockerfile: Dockerfile.dev
    container_name: immortality-server
    environment:
      ASPNETCORE_ENVIRONMENT: Development
      ConnectionStrings__DefaultConnection: Host=postgres;Database=immortality_dev;Username=immortality;Password=dev_password_123
      EventStore__ConnectionString: esdb://eventstore:2113?tls=false
      Redis__ConnectionString: redis:6379,password=dev_redis_password
      MinIO__Endpoint: minio:9000
      MinIO__AccessKey: immortality
      MinIO__SecretKey: dev_minio_password_123
      Jwt__Secret: dev_jwt_secret_key_for_development_only
      ASPNETCORE_URLS: http://+:5000
    ports:
      - "5000:5000"
    volumes:
      - ../../server:/app
      - server_logs:/app/logs
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
        dotnet restore &&
        dotnet ef database update &&
        dotnet run --project Immortality.Server
      "
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:5000/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 5

  # 客户端静态资源服务 (开发模式 - Tuanjie构建输出)
  client:
    build:
      context: ../../client
      dockerfile: Dockerfile
    container_name: immortality-client
    ports:
      - "3000:80"
    volumes:
      - ../../client/dist:/usr/share/nginx/html
    depends_on:
      - server
    networks:
      - immortality-network
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:80 || exit 1"]
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
      - client
      - server
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
  server_logs:
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
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:5000
JWT_SECRET=dev_jwt_secret_key_for_development_only
JWT_EXPIRES_IN=7d

# 日志配置
LOG_LEVEL=debug
LOG_FORMAT=combined

# 开发工具
ENABLE_SWAGGER=true
ENABLE_PLAYGROUND=true
ENABLE_DEBUG=true

# 客户端配置
GAME_API_BASE_URL=http://localhost:5000
GAME_WS_URL=ws://localhost:5000
GAME_MINIO_ENDPOINT=http://localhost:9000
GAME_APP_NAME=Immortality Dev
GAME_APP_VERSION=0.1.0-alpha
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

### .NET SDK 版本管理

```bash
# 安装 .NET SDK (Windows)
winget install Microsoft.DotNet.SDK.8

# macOS/Linux
# 使用官方安装脚本
curl -sSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin --channel 8.0

# 验证安装
dotnet --version   # 8.0.x
dotnet --list-sdks

# 查看已安装的运行时
dotnet --list-runtimes
```

### 包管理器配置

```bash
# NuGet 配置 (项目根目录 nuget.config)
dotnet nuget config set registry https://api.nuget.org/v3/index.json

# 项目根目录创建 nuget.config
cat > nuget.config << EOF
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
  </packageSources>
  <packageRestore>
    <add key="enabled" value="True" />
    <add key="automatic" value="True" />
  </packageRestore>
</configuration>
EOF
```

### VS Code 配置

#### 推荐扩展

```json
// .vscode/extensions.json
{
  "recommendations": [
    // C# 开发
    "ms-dotnettools.csdevkit",
    "ms-dotnettools.csharp",
    "ms-dotnettools.vscodeintellicode-csharp",
    
    // Tuanjie/Unity 开发
    "Unity.unity-debug",
    "kleber-swf.unity-code-snippets",
    "tobiah.unity-tools",
    
    // 代码质量
    "editorconfig.editorconfig",
    "ms-dotnettools.vscode-dotnet-runtime",
    
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
  // C# 配置
  "csharp.preferences.importModuleSpecifier": "relative",
  "csharp.suggest.autoImports": true,
  "omnisharp.enableImportCompletion": true,
  "omnisharp.organizeImportsOnFormat": true,
  
  // 格式化配置
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "ms-dotnettools.csharp",
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeUsings": true
  },
  
  // 文件配置
  "files.autoSave": "onFocusChange",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  
  // 搜索配置
  "search.exclude": {
    "**/bin": true,
    "**/obj": true,
    "**/dist": true,
    "**/build": true,
    "**/.git": true,
    "**/coverage": true
  },
  
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
      "name": "Debug Server (Docker - ASP.NET Core)",
      "type": "coreclr",
      "request": "attach",
      "processId": "${command:pickRemoteProcess}",
      "pipeTransport": {
        "pipeCwd": "${workspaceRoot}",
        "pipeProgram": "docker",
        "pipeArgs": ["exec", "-i", "immortality-server"],
        "debuggerPath": "/vsdbg/vsdbg",
        "quoteArgs": false
      },
      "sourceFileMap": {
        "/app": "${workspaceFolder}/server"
      }
    },
    {
      "name": "Debug Server (Local - ASP.NET Core)",
      "type": "coreclr",
      "request": "launch",
      "program": "${workspaceFolder}/server/Immortality.Server/bin/Debug/net8.0/Immortality.Server.dll",
      "args": [],
      "cwd": "${workspaceFolder}/server",
      "stopAtEntry": false,
      "sourceFileMap": {
        "/Views": "${workspaceFolder}/server/Views"
      },
      "envFile": "${workspaceFolder}/server/.env.development",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Debug Tests",
      "type": "coreclr",
      "request": "launch",
      "program": "dotnet",
      "args": ["test", "--filter", "FullyQualifiedName~Immortality.Tests"],
      "cwd": "${workspaceFolder}/server",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "envFile": "${workspaceFolder}/server/.env.test"
    },
    {
      "name": "Attach to Tuanjie Editor",
      "type": "unity",
      "request": "attach",
      "port": 56000
    }
  ]
}
```

### 代码质量工具

#### .editorconfig 配置

```ini
# .editorconfig
root = true

# 通用设置
[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 4

# C# 文件
[*.cs]
indent_size = 4
dotnet_sort_system_directives_first = true
csharp_style_var_when_type_is_apparent = true:suggestion
csharp_style_var_elsewhere = false:suggestion
csharp_style_prefer_extended_property_pattern = true:suggestion
csharp_style_pattern_matching_over_as_with_null_check = true:suggestion
csharp_style_pattern_matching_over_is_with_cast_check = true:suggestion
csharp_style_throw_expression = true:suggestion
csharp_style_conditional_delegate_call = true:suggestion
csharp_prefer_simple_default_expression = true:suggestion
csharp_style_expression_bodied_methods = when_on_single_line:suggestion
csharp_style_expression_bodied_constructors = when_on_single_line:suggestion
csharp_style_expression_bodied_operators = when_on_single_line:suggestion
csharp_style_expression_bodied_properties = when_on_single_line:suggestion
csharp_style_expression_bodied_indexers = when_on_single_line:suggestion
csharp_style_expression_bodied_accessors = when_on_single_line:suggestion
csharp_style_expression_bodied_lambdas = when_on_single_line:suggestion
csharp_style_expression_bodied_local_functions = when_on_single_line:suggestion

# JSON 文件
[*.json]
indent_size = 2

# YAML 文件
[*.{yml,yaml}]
indent_size = 2

# Markdown 文件
[*.md]
trim_trailing_whitespace = false

# .NET 构建输出
[bin/**]
[obj/**]
generated_code = true
```

#### C# Analyzers 配置

```xml
<!-- .editorconfig 中内联分析器规则 -->
[*.cs]
# 代码风格
dotnet_diagnostic.IDE0005.severity = warning    # 移除不必要的using
dotnet_diagnostic.IDE0007.severity = suggestion  # 使用var
dotnet_diagnostic.IDE0017.severity = suggestion  # 对象初始化器
dotnet_diagnostic.IDE0028.severity = suggestion  # 集合初始化器
dotnet_diagnostic.IDE0044.severity = warning     # 添加readonly
dotnet_diagnostic.IDE0058.severity = warning     # 移除不必要的表达式
dotnet_diagnostic.IDE0060.severity = warning     # 移除未使用的参数

# 命名规则
dotnet_naming_rule.private_members_with_underscore.seriousness = warning
dotnet_naming_rule.private_members_with_underscore.symbols = private_fields
dotnet_naming_rule.private_members_with_underscore.style = prefix_underscore

dotnet_naming_style.prefix_underscore.capitalization = camel_case
dotnet_naming_style.prefix_underscore.required_prefix = _

# 空值检查
dotnet_diagnostic.CS8600.severity = warning      # 可能为null的引用
dotnet_diagnostic.CS8602.severity = warning      # 解引用null
dotnet_diagnostic.CS8618.severity = warning      # 非空属性未初始化

[*.{cs,vb}]
dotnet_style_qualification_for_field = false:suggestion
dotnet_style_qualification_for_property = false:suggestion
dotnet_style_qualification_for_method = false:suggestion
dotnet_style_qualification_for_event = false:suggestion
dotnet_style_predefined_type_for_locals_parameters_members = true:suggestion
dotnet_style_predefined_type_for_member_access = true:suggestion
dotnet_style_require_accessibility_modifiers = always:suggestion
dotnet_style_readonly_field = true:suggestion
```

```
# .editorconfig 忽略文件夹
bin/
obj/
dist/
build/
coverage/
*.min.js
*.min.css
*.log
.env*
```

#### Git Hooks

```json
// .husky/pre-commit 配置
{
  "hooks": {
    "pre-commit": "dotnet format --verify-no-changes && dotnet build --no-restore"
  }
}
```

```bash
#!/bin/sh
# .husky/pre-commit
. "$(dirname "$0")/_/husky.sh"

dotnet format --verify-no-changes
dotnet build --no-restore
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
command -v dotnet >/dev/null 2>&1 || { echo "❌ .NET SDK 未安装"; exit 1; }

# 检查 .NET 版本
DOTNET_VERSION=$(dotnet --version | cut -d'.' -f1)
if [ "$DOTNET_VERSION" -lt 8 ]; then
    echo "❌ .NET SDK 版本需要 8.0 或更高，当前版本: $(dotnet --version)"
    exit 1
fi

echo "✅ 依赖检查通过"

# 恢复 NuGet 包
echo "📦 恢复服务端依赖..."
cd server && dotnet restore && cd ..

echo "✅ 依赖恢复完成"

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
echo "  - 客户端: http://localhost:3000"
echo "  - 服务端 API: http://localhost:5000"
echo "  - Swagger 文档: http://localhost:5000/swagger"
echo "  - EventStore UI: http://localhost:2113"
echo "  - MinIO Console: http://localhost:9001"
echo ""
echo "🚀 启动开发服务器:"
echo "  dotnet run --project server/Immortality.Server"
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

# 启动服务端
echo "🔧 启动服务端 (ASP.NET Core)..."
cd server
dotnet run --project Immortality.Server &
SERVER_PID=$!
cd ..

# 等待服务端启动
echo "⏳ 等待服务端启动..."
sleep 10

echo "✅ 开发服务器启动完成！"
echo ""
echo "🌐 访问地址:"
echo "  - 客户端 (Tuanjie构建输出): http://localhost:3000"
echo "  - 服务端 API: http://localhost:5000"
echo "  - API 文档: http://localhost:5000/swagger"
echo ""
echo "⏹️  停止服务: Ctrl+C"

# 等待用户中断
trap "echo '\n🛑 停止服务...'; kill $SERVER_PID 2>/dev/null; exit" INT
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

# 清理构建文件
echo "🗑️  清理构建文件..."
rm -rf server/bin
rm -rf server/obj
rm -rf client/dist
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

# 2. 恢复依赖
dotnet restore

# 3. 启动开发环境
bash scripts/setup-dev.sh   # 首次运行
bash scripts/start-dev.sh   # 日常启动

# 4. 开发代码
# ...

# 5. 运行测试
dotnet test
dotnet test --collect:"XPlat Code Coverage"

# 6. 代码检查
dotnet format --verify-no-changes
dotnet build --no-restore

# 7. 提交代码
git add .
git commit -m "feat: 添加新功能"
git push origin feature/new-feature
```

### 2. 测试策略

```bash
# 单元测试
dotnet test --filter "Category=Unit"

# 集成测试
dotnet test --filter "Category=Integration"

# E2E 测试
dotnet test --filter "Category=E2E"

# 测试覆盖率
dotnet test --collect:"XPlat Code Coverage"

# 监听模式
dotnet watch test
```

### 3. 调试指南

- **服务端调试**: 使用 VS Code C# 调试配置，或 Rider / Visual Studio 内置调试器
- **客户端调试**: Tuanjie Engine Profiler + Unity Debugger
- **数据库调试**: VS Code PostgreSQL 扩展
- **API 调试**: Thunder Client 或 Postman

### 4. 性能监控

- **应用性能**: 内置性能监控中间件 (ASP.NET Core)
- **数据库性能**: pg_stat_statements 扩展
- **缓存性能**: Redis 慢查询日志
- **容器监控**: Docker stats 命令
- **客户端性能**: Tuanjie Engine Profiler

## 🔧 **故障排除**

### 常见问题

1. **端口冲突**
   ```bash
   # 查看端口占用
   netstat -tulpn | grep :5000
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
   dotnet ef database drop --force
   dotnet ef database update
   ```

4. **依赖恢复失败**
   ```bash
   # 清理 NuGet 缓存
   dotnet nuget locals all --clear
   # 删除 bin/obj 重新恢复
   rm -rf server/bin server/obj
   dotnet restore
   ```

通过这套完整的开发环境配置，团队成员可以快速搭建一致的开发环境，提高开发效率和代码质量。