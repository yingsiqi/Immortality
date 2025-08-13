# 流程图与架构图使用指南

## 概述

本文档系统支持使用Mermaid语法创建各种类型的图表，包括流程图、架构图、时序图等。这些图表可以帮助更好地展示系统设计、业务流程和技术架构。

## Mermaid支持状态

✅ **当前支持的图表类型**：
- 流程图 (Flowchart)
- 时序图 (Sequence Diagram)
- 甘特图 (Gantt Chart)
- 类图 (Class Diagram)
- 状态图 (State Diagram)
- 用户旅程图 (User Journey)
- Git图 (Git Graph)
- 饼图 (Pie Chart)

## 基础语法示例

### 1. 流程图 (Flowchart)

#### 基础流程图
```mermaid
flowchart TD
    A[开始] --> B{条件判断}
    B -->|是| C[执行操作A]
    B -->|否| D[执行操作B]
    C --> E[结束]
    D --> E
```

#### 复杂业务流程（修仙系统示例）
```mermaid
flowchart LR
    A[客户端请求] --> B{元神投影缓存}
    B -->|命中| C[返回状态]
    B -->|未命中| D{元婴分身快照}
    D -->|命中| E[增量重放]
    D -->|未命中| F{金丹印记}
    F -->|命中| G[基础状态+部分重放]
    F -->|未命中| H[全量重放]
    
    E --> I[构建完整状态]
    G --> I
    H --> I
    I --> C
    
    style A fill:#e1f5fe
    style C fill:#c8e6c9
    style H fill:#ffcdd2
```

### 2. 系统架构图

#### 微服务架构
```mermaid
flowchart TB
    subgraph "客户端层"
        Web[Web客户端]
        Mobile[移动端]
    end
    
    subgraph "网关层"
        Gateway[API网关]
    end
    
    subgraph "服务层"
        UserSvc[用户服务]
        GameSvc[游戏逻辑服务]
        CultSvc[修炼服务]
        EconSvc[经济服务]
    end
    
    subgraph "数据层"
        Redis[(Redis缓存)]
        MongoDB[(MongoDB)]
        MySQL[(MySQL)]
    end
    
    Web --> Gateway
    Mobile --> Gateway
    Gateway --> UserSvc
    Gateway --> GameSvc
    Gateway --> CultSvc
    Gateway --> EconSvc
    
    UserSvc --> MySQL
    GameSvc --> MongoDB
    CultSvc --> Redis
    EconSvc --> MySQL
```

### 3. 时序图 (Sequence Diagram)

#### 用户登录时序
```mermaid
sequenceDiagram
    participant C as 客户端
    participant G as API网关
    participant U as 用户服务
    participant R as Redis
    participant D as 数据库
    
    C->>G: 登录请求
    G->>U: 验证用户
    U->>D: 查询用户信息
    D-->>U: 返回用户数据
    U->>R: 生成会话token
    R-->>U: 返回token
    U-->>G: 登录成功+token
    G-->>C: 返回登录结果
    
    Note over C,D: 用户登录完整流程
```

#### 修炼系统交互时序
```mermaid
sequenceDiagram
    participant P as 玩家
    participant C as 客户端
    participant S as 修炼服务
    participant T as 时间服务
    participant D as 数据库
    
    P->>C: 开始修炼
    C->>S: 修炼请求
    S->>T: 获取当前时间
    T-->>S: 返回时间戳
    S->>D: 记录修炼开始
    D-->>S: 确认记录
    S-->>C: 修炼开始确认
    C-->>P: 显示修炼界面
    
    loop 修炼进度更新
        S->>T: 检查时间进度
        T-->>S: 返回进度
        S->>C: 推送进度更新
        C->>P: 更新界面
    end
    
    S->>D: 修炼完成记录
    D-->>S: 确认完成
    S->>C: 修炼完成通知
    C->>P: 显示修炼结果
```

### 4. 状态图 (State Diagram)

#### 角色状态转换
```mermaid
stateDiagram-v2
    [*] --> 离线
    离线 --> 在线 : 登录
    在线 --> 修炼中 : 开始修炼
    在线 --> 战斗中 : 进入战斗
    在线 --> 交易中 : 打开交易
    
    修炼中 --> 在线 : 修炼完成
    修炼中 --> 突破中 : 触发突破
    突破中 --> 在线 : 突破完成
    
    战斗中 --> 在线 : 战斗结束
    交易中 --> 在线 : 交易完成
    
    在线 --> 离线 : 登出
    修炼中 --> 离线 : 强制下线
    战斗中 --> 离线 : 断线
    交易中 --> 离线 : 断线
```

### 5. 类图 (Class Diagram)

#### 角色系统类设计
```mermaid
classDiagram
    class Character {
        +String id
        +String name
        +Int level
        +Int cultivation_stage
        +Float spiritual_power
        +Float health
        +Float mana
        +cultivate()
        +levelUp()
        +takeDamage(amount)
    }
    
    class Equipment {
        +String id
        +String name
        +Int quality
        +Int enhancement_level
        +Map attributes
        +enhance()
        +repair()
    }
    
    class Skill {
        +String id
        +String name
        +Int level
        +Float cooldown
        +Float mana_cost
        +cast(target)
        +upgrade()
    }
    
    class Inventory {
        +Int capacity
        +List items
        +addItem(item)
        +removeItem(item)
        +findItem(id)
    }
    
    Character ||--o{ Equipment : 装备
    Character ||--o{ Skill : 拥有技能
    Character ||--|| Inventory : 拥有背包
```

### 6. 甘特图 (Gantt Chart)

#### 项目开发计划
```mermaid
gantt
    title 修仙游戏开发计划
    dateFormat  YYYY-MM-DD
    section 基础系统
    用户系统开发    :done, user-sys, 2024-01-01, 2024-01-15
    角色系统开发    :done, char-sys, 2024-01-10, 2024-01-25
    修炼系统开发    :active, cult-sys, 2024-01-20, 2024-02-10
    
    section 核心玩法
    战斗系统开发    :combat-sys, 2024-02-01, 2024-02-20
    装备系统开发    :equip-sys, 2024-02-15, 2024-03-05
    副本系统开发    :dungeon-sys, 2024-03-01, 2024-03-20
    
    section 社交功能
    好友系统开发    :friend-sys, 2024-03-10, 2024-03-25
    门派系统开发    :sect-sys, 2024-03-20, 2024-04-10
    交易系统开发    :trade-sys, 2024-04-01, 2024-04-15
    
    section 测试发布
    内测准备       :test-prep, 2024-04-10, 2024-04-20
    内测阶段       :internal-test, 2024-04-20, 2024-05-10
    公测发布       :public-release, 2024-05-10, 2024-05-15
```

### 7. 用户旅程图 (User Journey)

#### 新手玩家体验旅程
```mermaid
journey
    title 新手玩家体验旅程
    section 注册登录
      访问游戏网站: 5: 玩家
      注册账号: 4: 玩家
      首次登录: 5: 玩家
    section 角色创建
      选择门派: 5: 玩家
      自定义角色: 4: 玩家
      进入游戏世界: 5: 玩家
    section 新手引导
      学习基础操作: 3: 玩家
      完成新手任务: 4: 玩家
      获得第一件装备: 5: 玩家
    section 核心体验
      开始修炼: 5: 玩家
      学习技能: 4: 玩家
      参与战斗: 5: 玩家
      加入门派: 4: 玩家
```

### 8. 饼图 (Pie Chart)

#### 玩家活跃度分布
```mermaid
pie title 玩家日常活动分布
    "修炼" : 35
    "战斗" : 25
    "社交" : 15
    "交易" : 10
    "探索" : 10
    "其他" : 5
```

## 高级技巧

### 1. 样式自定义

```mermaid
flowchart LR
    A[开始] --> B[处理]
    B --> C[结束]
    
    %% 自定义样式
    classDef startEnd fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef process fill:#fff3e0,stroke:#e65100,stroke-width:2px
    
    class A,C startEnd
    class B process
```

### 2. 子图分组

```mermaid
flowchart TB
    subgraph "前端层"
        A[React应用]
        B[Vue组件]
    end
    
    subgraph "后端层"
        C[Node.js服务]
        D[数据库]
    end
    
    A --> C
    B --> C
    C --> D
```

### 3. 链接样式

```mermaid
flowchart LR
    A --> B
    B -.-> C
    C ==> D
    D --> E
    
    %% 链接样式
    linkStyle 0 stroke:#ff3,stroke-width:4px
    linkStyle 1 stroke:#ff3,stroke-width:2px,stroke-dasharray: 5 5
    linkStyle 2 stroke:#ff3,stroke-width:4px
```

## 最佳实践

### 1. 图表设计原则
- **简洁明了**：避免过于复杂的图表
- **逻辑清晰**：流程方向要明确
- **标注完整**：重要节点要有说明
- **样式统一**：保持视觉风格一致

### 2. 性能考虑
- 大型图表考虑分页或分层展示
- 避免在单个图表中包含过多节点
- 合理使用子图进行分组

### 3. 维护建议
- 定期更新图表内容
- 保持图表与实际系统同步
- 添加版本说明和更新日期

## 常见问题

### Q: 图表不显示怎么办？
A: 检查Mermaid语法是否正确，确保代码块使用```mermaid标记。

### Q: 如何自定义图表样式？
A: 使用classDef定义样式类，然后用class应用到节点上。

### Q: 支持哪些图表类型？
A: 支持flowchart、sequence、gantt、class、state、journey、pie等多种类型。

### Q: 图表太大如何处理？
A: 可以使用子图分组，或者将大图拆分为多个小图。

## 参考资源

- [Mermaid官方文档](https://mermaid.js.org/)
- [VitePress Mermaid支持](https://vitepress.dev/guide/markdown#mermaid)
- [图表设计最佳实践](https://mermaid.js.org/config/theming.html)

---

通过以上示例和指南，你可以在文档中创建各种类型的图表来更好地展示系统设计和业务流程。记住保持图表简洁明了，并定期更新以保持与实际系统的同步。