# Network — 网络层

负责客户端与服务端的所有网络通信。

## 目录

| 目录 | 用途 |
|------|------|
| `Api/` | HTTP RESTful API 客户端 — 基于 UnityWebRequest |
| `Transport/` | 实时通信层 — 基于 Unity Transport / Mirror Networking |

## 通信协议

### HTTP API
- 基础URL: `http://localhost:3001/api`（开发环境）
- 认证: JWT Bearer Token
- 格式: JSON
- 主要端点: `/auth/login`, `/auth/register`, `/player/me`

### 实时通信
- WebSocket: `ws://localhost:3001/realtime`
- 消息格式: `{ "type": "...", "payload": "..." }`
- 用途: 修炼进度同步、战斗指令、世界事件推送

## 相关文档

- [后端架构设计](../../../doc/guides/technical/backend-architecture.md)
- [API参考](../../../doc/guides/technical/index.md)
