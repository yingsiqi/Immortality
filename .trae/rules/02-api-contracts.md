# API 与端口规则

## 单一事实源

- HTTP API 契约优先维护在 `doc/reference/` 或后续的 `docs/api/openapi.yaml`
- 服务端口、路由和网关映射以仓库内文档和 `deploy/` 配置为准
- 客户端不得硬编码绕过网关直接访问内部服务

## 当前端口约定

- `Gateway`：`3001`
- `AuthService`：`5001`
- `GameService`：`5002`
- `RealtimeService`：`5003`

## 开发要求

- 改接口时必须同时更新 DTO、控制器、客户端调用点
- 新增受保护接口时必须明确认证方式和 token 来源
- 发现占位实现时，优先补齐真实闭环，不继续叠加业务逻辑
