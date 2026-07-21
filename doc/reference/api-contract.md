# API 契约

> 本文档是所有 HTTP API 接口的单一事实源。
> 变更接口时必须先更新本文档，再修改代码。

## 认证接口

### POST /api/auth/register

注册新用户。

**请求体：**
```json
{
  "username": "string (3-50字符)",
  "password": "string (6-100字符)"
}
```

**成功响应 (200)：**
```json
{
  "success": true,
  "data": true
}
```

**失败响应：**
| HTTP 状态码 | errorCode | 说明 |
|-------------|-----------|------|
| 409 | USERNAME_EXISTS | 用户名已存在 |

---

### POST /api/auth/login

用户登录，获取 JWT。

**请求体：**
```json
{
  "username": "string",
  "password": "string"
}
```

**成功响应 (200)：**
```json
{
  "success": true,
  "data": {
    "accessToken": "string (JWT, 24h)",
    "refreshToken": "string (JWT, 7d)",
    "expiresIn": 86400
  }
}
```

**失败响应：**
| HTTP 状态码 | errorCode | 说明 |
|-------------|-----------|------|
| 401 | AUTH_FAILED | 用户名或密码错误 |

---

### GET /api/auth/health

健康检查，无需认证。

**响应 (200)：**
```json
{ "status": "healthy", "service": "AuthService" }
```

## 玩家接口

> 以下接口均需要 `Authorization: Bearer {accessToken}` 头。

### GET /api/player/me

获取当前登录用户的角色信息。

**成功响应 (200)：**
```json
{
  "success": true,
  "data": {
    "playerId": "guid",
    "characterName": "string",
    "cultivationRealmIndex": 0,
    "cultivationLayer": 0,
    "cultivationSubLayer": 0,
    "spiritualRootType": "Mixed",
    "spiritualPower": 0,
    "maxSpiritualPower": 100,
    "stamina": 100,
    "maxStamina": 100,
    "meritPoints": 0
  }
}
```

**失败响应：**
| HTTP 状态码 | errorCode | 说明 |
|-------------|-----------|------|
| 401 | UNAUTHORIZED | 未认证或 token 无效 |
| 404 | PLAYER_NOT_FOUND | 未创建角色 |

---

### POST /api/player

创建角色。

**请求体：**
```json
{
  "characterName": "string (1-20字符)",
  "spiritualRootType": "Heavenly | Mutant | True | Pseudo | Mixed"
}
```

**成功响应 (200)：**
```json
{
  "success": true,
  "data": { /* PlayerDto, 同 /api/player/me */ }
}
```

---

### GET /api/player/{playerId}

获取指定玩家信息。

**路径参数：**
- `playerId`: GUID

**成功响应 (200)：** 同 /api/player/me

**失败响应：**
| HTTP 状态码 | errorCode | 说明 |
|-------------|-----------|------|
| 404 | PLAYER_NOT_FOUND | 玩家不存在 |

## 修炼接口

> 以下接口均需要认证。

### GET /api/cultivation/{playerId}/progress

获取修炼进度。

**路径参数：**
- `playerId`: GUID

**成功响应 (200)：**
```json
{
  "success": true,
  "data": {
    "playerId": "guid",
    "accumulatedGameDays": 0,
    "currentRealmIndex": 0,
    "currentLayer": 0,
    "canBreakthrough": false,
    "breakthroughChance": 0.95
  }
}
```

---

### POST /api/cultivation/{playerId}/breakthrough

尝试突破。

**成功响应 (200)：**
```json
{
  "success": true,
  "data": {
    "success": false,
    "newRealmIndex": 0,
    "failureReason": "境界层数不足"
  }
}
```

## 修炼境界枚举

| 索引 | 名称 |
|------|------|
| 0 | 凡人 |
| 1 | 炼气 |
| 2 | 筑基 |
| 3 | 金丹 |
| 4 | 元婴 |
| 5 | 化神 |
| 6 | 炼虚 |
| 7 | 合体 |
| 8 | 大乘 |
| 9 | 真仙 |
| 10 | 金仙 |
| 11 | 太乙 |
| 12 | 大罗 |
| 13 | 道祖 |
| 14 | 超脱 |

## 灵根类型枚举

| 值 | 名称 | 突破系数 |
|----|------|----------|
| Heavenly | 天灵根 | 1.5 |
| Mutant | 异灵根 | 1.3 |
| True | 真灵根 | 1.0 |
| Pseudo | 伪灵根 | 0.7 |
| Mixed | 杂灵根 | 0.5 |

## 统一响应格式

所有 API 响应使用统一封装：

```json
{
  "success": true | false,
  "data": T | null,
  "error": "string | null",
  "errorCode": "string | null"
}
```

## 实时通信 (SignalR)

### 连接地址

```
ws://localhost:3001/realtime
```

### Hub 方法

| 方法 | 方向 | 说明 |
|------|------|------|
| `JoinCultivation(playerId)` | 客户端→服务端 | 加入修炼进度推送频道 |
| `LeaveCultivation(playerId)` | 客户端→服务端 | 离开修炼频道 |
| `JoinCombat(combatId)` | 客户端→服务端 | 加入战斗频道 |
| `SendCombatAction(combatId, action, payload)` | 客户端→服务端 | 发送战斗指令 |

### 服务端推送事件

| 事件名 | 方向 | 说明 |
|--------|------|------|
| `CombatAction` | 服务端→客户端 | 战斗动作广播 |
