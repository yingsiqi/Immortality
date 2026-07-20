# 部署配置 — Docker / Kubernetes / Nginx / Monitoring

生产环境部署所需的全部配置文件。

## 目录结构

```
deploy/
├── docker/
│   ├── docker-compose.yml        # 开发环境一键启动 (基础设施 + 微服务 + 监控)
│   ├── Dockerfile.gateway        # 网关镜像
│   ├── Dockerfile.auth           # 认证服务镜像
│   ├── Dockerfile.game           # 游戏服务镜像
│   └── Dockerfile.realtime       # 实时服务镜像
├── k8s/
│   └── immortality-deployment.yaml  # Kubernetes 部署清单
├── nginx/
│   └── nginx.conf                # Nginx 反向代理配置
└── monitoring/
    ├── prometheus.yml             # Prometheus 采集配置
    └── grafana/
        ├── dashboards/            # Grafana 仪表盘
        └── provisioning/          # Grafana 数据源配置
```

## 快速启动

### Docker Compose (开发环境)

```bash
cd deploy/docker
docker-compose up -d
```

启动后的服务：
| 服务 | 端口 | 说明 |
|------|------|------|
| Gateway | http://localhost:3001 | API 统一入口 |
| AuthService | http://localhost:5001 | 认证服务 |
| GameService | http://localhost:5002 | 游戏逻辑服务 |
| RealtimeService | http://localhost:5003 | 实时通信 |
| PostgreSQL | localhost:5432 | 数据库 |
| Redis | localhost:6379 | 缓存 |
| EventStoreDB | http://localhost:2113 | 事件存储 UI |
| MinIO | http://localhost:9001 | 对象存储控制台 |
| Prometheus | http://localhost:9090 | 监控 |
| Grafana | http://localhost:3000 | 仪表盘 (admin/admin) |

### Kubernetes (生产环境)

```bash
kubectl create namespace immortality
kubectl apply -f deploy/k8s/immortality-deployment.yaml
```

## 环境变量

通过 `.env` 文件配置：

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `POSTGRES_PASSWORD` | postgres | PostgreSQL 密码 |
| `JWT_SECRET` | CHANGE_ME... | JWT 签名密钥 |
| `MINIO_USER` | minioadmin | MinIO 用户名 |
| `MINIO_PASSWORD` | minioadmin | MinIO 密码 |
| `GRAFANA_PASSWORD` | admin | Grafana 管理密码 |

## 部署架构

```
客户端 ──→ Nginx(:80) ──→ Gateway(:3001)
                              ├──→ AuthService(:5001)
                              ├──→ GameService(:5002)
                              └──→ RealtimeService(:5003) [WebSocket]
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                PostgreSQL      Redis         EventStoreDB
                (读模型)       (缓存/背板)      (事件流)
```

## 相关文档

- [单台VPS部署方案](../doc/guides/technical/single-vps-deployment-plan.md)
- [架构设计](../doc/guides/technical/architecture-design.md)
