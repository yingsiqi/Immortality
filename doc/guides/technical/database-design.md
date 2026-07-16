# 数据库设计

## 概述

Immortality修仙游戏采用混合数据库架构，结合EventStoreDB事件溯源和PostgreSQL关系型数据库的优势，实现高性能的读写分离、完整的数据审计追踪和灵活的查询能力。这种设计确保了游戏数据的一致性、可追溯性和高可用性。

## 🏗️ **架构总览**

### 数据存储策略

```mermaid
flowchart TB
    subgraph "应用层"
        A[游戏服务]
        B[查询服务]
        C[事件处理器]
    end
    
    subgraph "写入路径 (Command Side)"
        D[EventStoreDB<br/>事件存储]
        E[事件流<br/>Event Streams]
    end
    
    subgraph "读取路径 (Query Side)"
        F[PostgreSQL<br/>读取模型]
        G[Redis<br/>缓存层]
        H[投影视图<br/>Projections]
    end
    
    subgraph "文件存储"
        I[MinIO<br/>对象存储]
        J[静态资源<br/>图片/音频]
    end
    
    A --> D
    A --> F
    B --> F
    B --> G
    C --> D
    C --> F
    
    D --> E
    E --> H
    H --> F
    F --> G
    
    A --> I
    I --> J
```

### 数据流向

```mermaid
sequenceDiagram
    participant Client as 客户端
    participant API as API服务
    participant EventStore as EventStoreDB
    participant Handler as 事件处理器
    participant PostgreSQL as PostgreSQL
    participant Redis as Redis缓存
    
    Client->>API: 发起游戏操作
    API->>EventStore: 保存领域事件
    EventStore->>Handler: 触发事件处理
    Handler->>PostgreSQL: 更新读取模型
    Handler->>Redis: 更新缓存
    
    Client->>API: 查询游戏数据
    API->>Redis: 检查缓存
    alt 缓存命中
        Redis->>API: 返回缓存数据
    else 缓存未命中
        API->>PostgreSQL: 查询数据库
        PostgreSQL->>API: 返回数据
        API->>Redis: 更新缓存
    end
    API->>Client: 返回结果
```

## 📊 **EventStoreDB 事件存储设计**

### 事件流结构

```csharp
// 事件流命名规范
public static class StreamNaming
{
    // 玩家聚合流
    public static string Player(Guid playerId) => $"player-{playerId}";

    // 修炼会话流
    public static string Cultivation(Guid sessionId) => $"cultivation-{sessionId}";

    // 战斗会话流
    public static string Combat(Guid combatId) => $"combat-{combatId}";

    // 物品交易流
    public static string Trade(Guid tradeId) => $"trade-{tradeId}";

    // 公会活动流
    public static string Guild(Guid guildId) => $"guild-{guildId}";

    // 系统事件流
    public static string System() => "system-events";

    // 分类事件流
    public static string Category(string category) => $"$ce-{category}";
}
```

### 核心事件定义

```csharp
// Events/DomainEvent.cs
public abstract class DomainEvent
{
    public Guid EventId { get; init; }
    public string EventType { get; init; } = string.Empty;
    public string AggregateId { get; init; } = string.Empty;
    public string AggregateType { get; init; } = string.Empty;
    public int EventVersion { get; init; }
    public DateTime Timestamp { get; init; }
    public string? CausationId { get; init; }
    public string? CorrelationId { get; init; }
    public Dictionary<string, object>? Metadata { get; init; }
}

// 玩家相关事件
public class PlayerCreatedEvent : DomainEvent
{
    public PlayerCreatedData Data { get; init; } = new();
}

public record PlayerCreatedData(
    Guid PlayerId,
    Guid UserId,
    string PlayerName,
    string InitialRealm,
    int InitialLevel,
    DateTime CreatedAt);

public class PlayerLevelUpEvent : DomainEvent
{
    public PlayerLevelUpData Data { get; init; } = new();
}

public record PlayerLevelUpData(
    Guid PlayerId,
    int OldLevel,
    int NewLevel,
    string OldRealm,
    string NewRealm,
    int ExperienceGained,
    DateTime Timestamp);

public class PlayerEnergyChangedEvent : DomainEvent
{
    public PlayerEnergyChangedData Data { get; init; } = new();
}

public record PlayerEnergyChangedData(
    Guid PlayerId,
    int OldEnergy,
    int NewEnergy,
    string ChangeReason, // cultivation | combat | rest | item_use
    DateTime Timestamp);

// 修炼相关事件
public class CultivationStartedEvent : DomainEvent
{
    public CultivationStartedData Data { get; init; } = new();
}

public record CultivationStartedData(
    Guid SessionId,
    Guid PlayerId,
    string TechniqueId,
    DateTime StartTime,
    long ExpectedDuration,
    int EnergyCost,
    string? Location);

public class CultivationProgressEvent : DomainEvent
{
    public CultivationProgressData Data { get; init; } = new();
}

public record CultivationProgressData(
    Guid SessionId,
    Guid PlayerId,
    double Progress, // 0-1
    int ExperienceGained,
    string CurrentStage,
    DateTime Timestamp);

public class CultivationCompletedEvent : DomainEvent
{
    public CultivationCompletedData Data { get; init; } = new();
}

public record CultivationCompletedData(
    Guid SessionId,
    Guid PlayerId,
    DateTime CompletedAt,
    long TotalDuration,
    int TotalExperienceGained,
    bool BreakthroughAchieved,
    List<string>? NewInsights);

// 战斗相关事件
public class CombatInitiatedEvent : DomainEvent
{
    public CombatInitiatedData Data { get; init; } = new();
}

public record CombatInitiatedData(
    Guid CombatId,
    Guid ChallengerId,
    Guid DefenderId,
    string CombatType, // duel | arena | tournament | monster
    string Location,
    DateTime InitiatedAt);

public class CombatActionEvent : DomainEvent
{
    public CombatActionData Data { get; init; } = new();
}

public record CombatActionData(
    Guid CombatId,
    Guid ActorId,
    string ActionType, // attack | defend | skill | item
    Guid TargetId,
    string? SkillId,
    string? ItemId,
    int? Damage,
    int? Healing,
    List<string>? Effects,
    DateTime Timestamp);

public class CombatEndedEvent : DomainEvent
{
    public CombatEndedData Data { get; init; } = new();
}

public record CombatEndedData(
    Guid CombatId,
    Guid WinnerId,
    Guid LoserId,
    string EndReason, // victory | surrender | timeout | draw
    long Duration,
    CombatRewards Rewards,
    DateTime EndedAt);

public record CombatRewards(
    int Experience,
    List<string> Items,
    int Reputation);

// 物品相关事件
public class ItemObtainedEvent : DomainEvent
{
    public ItemObtainedData Data { get; init; } = new();
}

public record ItemObtainedData(
    Guid PlayerId,
    string ItemId,
    string ItemType,
    int Quantity,
    string Source, // combat | cultivation | trade | quest | system
    string? SourceId,
    DateTime ObtainedAt);

public class ItemUsedEvent : DomainEvent
{
    public ItemUsedData Data { get; init; } = new();
}

public record ItemUsedData(
    Guid PlayerId,
    string ItemId,
    int Quantity,
    ItemEffects Effects,
    DateTime UsedAt);

public record ItemEffects(
    int? EnergyRestore,
    int? ExperienceBoost,
    List<string>? TemporaryBuffs);

public class ItemTradedEvent : DomainEvent
{
    public ItemTradedData Data { get; init; } = new();
}

public record ItemTradedData(
    Guid TradeId,
    Guid SellerId,
    Guid BuyerId,
    string ItemId,
    int Quantity,
    int Price,
    string Currency, // gold | spirit_stones
    DateTime TradedAt);
```

### 事件存储配置

```csharp
// Options/EventStoreOptions.cs
public class EventStoreOptions
{
    public EventStoreConnectionOptions Connection { get; set; } = new();
    public EventStoreStreamOptions Streams { get; set; } = new();
    public EventStoreProjectionOptions Projections { get; set; } = new();
}

public class EventStoreConnectionOptions
{
    public string ConnectionString { get; set; } = string.Empty;
    public string DefaultUsername { get; set; } = "admin";
    public string DefaultPassword { get; set; } = string.Empty;
    public int GossipTimeout { get; set; } = 3000;
    public int DiscoverAttempts { get; set; } = 3;
    public int MaxDiscoverAttempts { get; set; } = 10;
    public bool RequireMaster { get; set; } = false;
    public int ReconnectionDelay { get; set; } = 100;
    public int OperationTimeout { get; set; } = 7000;
    public int OperationTimeoutCheckPeriod { get; set; } = 1000;
}

public class EventStoreStreamOptions
{
    // 最大事件数限制
    public int MaxCount { get; set; } = 10000;

    // 快照配置
    public int SnapshotFrequency { get; set; } = 100; // 每100个事件创建快照

    // 分片配置
    public PartitioningOptions Partitioning { get; set; } = new();
}

public class PartitioningOptions
{
    public bool Enabled { get; set; } = true;
    public string Strategy { get; set; } = "hash"; // hash | range | time
    public int PartitionCount { get; set; } = 16;
}

public class EventStoreProjectionOptions
{
    // 系统投影
    public bool ByCategory { get; set; } = true;
    public bool ByEventType { get; set; } = true;
    public bool StreamByCategory { get; set; } = true;

    // 自定义投影
    public List<string> Custom { get; set; } = new()
    {
        "player-statistics",
        "cultivation-leaderboard",
        "combat-rankings",
        "item-market-data",
        "guild-activities"
    };
}

// appsettings.json 中的配置
// "EventStore": {
//   "Connection": {
//     "ConnectionString": "esdb://admin:changeit@localhost:2113?tls=false",
//     ...
//   },
//   "Streams": { "MaxCount": 10000, "SnapshotFrequency": 100, ... },
//   "Projections": { "ByCategory": true, ... }
// }
```

### 投影定义

```javascript
// 玩家统计投影
const playerStatisticsProjection = `
fromCategory('player')
.when({
  'PlayerCreated': function(state, event) {
    linkTo('player-statistics', event);
  },
  'PlayerLevelUp': function(state, event) {
    linkTo('player-statistics', event);
  },
  'CultivationCompleted': function(state, event) {
    linkTo('player-statistics', event);
  },
  'CombatEnded': function(state, event) {
    linkTo('player-statistics', event);
  }
});
`;

// 修炼排行榜投影
const cultivationLeaderboardProjection = `
fromStreams(['$ce-cultivation'])
.when({
  'CultivationCompleted': function(state, event) {
    const data = event.data;
    
    if (!state.leaderboard) {
      state.leaderboard = {};
    }
    
    if (!state.leaderboard[data.playerId]) {
      state.leaderboard[data.playerId] = {
        totalExperience: 0,
        totalSessions: 0,
        totalDuration: 0,
        breakthroughs: 0
      };
    }
    
    const player = state.leaderboard[data.playerId];
    player.totalExperience += data.totalExperienceGained;
    player.totalSessions += 1;
    player.totalDuration += data.totalDuration;
    
    if (data.breakthroughAchieved) {
      player.breakthroughs += 1;
    }
    
    // 发出更新事件
    emit('cultivation-leaderboard-updated', {
      playerId: data.playerId,
      stats: player,
      timestamp: new Date()
    });
  }
});
`;

// 战斗排名投影
const combatRankingsProjection = `
fromStreams(['$ce-combat'])
.when({
  'CombatEnded': function(state, event) {
    const data = event.data;
    
    if (!state.rankings) {
      state.rankings = {};
    }
    
    // 更新胜利者统计
    if (!state.rankings[data.winnerId]) {
      state.rankings[data.winnerId] = {
        wins: 0,
        losses: 0,
        totalCombats: 0,
        winRate: 0,
        totalRewards: 0
      };
    }
    
    // 更新失败者统计
    if (!state.rankings[data.loserId]) {
      state.rankings[data.loserId] = {
        wins: 0,
        losses: 0,
        totalCombats: 0,
        winRate: 0,
        totalRewards: 0
      };
    }
    
    const winner = state.rankings[data.winnerId];
    const loser = state.rankings[data.loserId];
    
    winner.wins += 1;
    winner.totalCombats += 1;
    winner.totalRewards += data.rewards.experience;
    winner.winRate = winner.wins / winner.totalCombats;
    
    loser.losses += 1;
    loser.totalCombats += 1;
    loser.winRate = loser.wins / loser.totalCombats;
    
    // 发出排名更新事件
    emit('combat-rankings-updated', {
      winnerId: data.winnerId,
      loserId: data.loserId,
      winnerStats: winner,
      loserStats: loser,
      timestamp: new Date()
    });
  }
});
`;
```

## 🗄️ **PostgreSQL 读取模型设计**

### 核心表结构

```sql
-- 用户表
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE,
    
    -- 索引
    CONSTRAINT users_username_check CHECK (length(username) >= 3),
    CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = true;

-- 玩家表
CREATE TABLE players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    level INTEGER DEFAULT 1 CHECK (level > 0),
    realm VARCHAR(50) DEFAULT '练气期',
    experience BIGINT DEFAULT 0 CHECK (experience >= 0),
    energy INTEGER DEFAULT 100 CHECK (energy >= 0),
    max_energy INTEGER DEFAULT 100 CHECK (max_energy > 0),
    status VARCHAR(20) DEFAULT 'idle' CHECK (status IN ('idle', 'cultivating', 'combat', 'trading', 'offline')),
    
    -- 属性点
    strength INTEGER DEFAULT 10 CHECK (strength > 0),
    agility INTEGER DEFAULT 10 CHECK (agility > 0),
    intelligence INTEGER DEFAULT 10 CHECK (intelligence > 0),
    constitution INTEGER DEFAULT 10 CHECK (constitution > 0),
    
    -- 资源
    gold BIGINT DEFAULT 1000 CHECK (gold >= 0),
    spirit_stones INTEGER DEFAULT 0 CHECK (spirit_stones >= 0),
    
    -- 位置信息
    current_location VARCHAR(100) DEFAULT 'newbie_village',
    coordinates POINT,
    
    -- 时间戳
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT players_name_unique UNIQUE (name),
    CONSTRAINT players_energy_check CHECK (energy <= max_energy)
);

CREATE INDEX idx_players_user_id ON players(user_id);
CREATE INDEX idx_players_name ON players(name);
CREATE INDEX idx_players_level ON players(level);
CREATE INDEX idx_players_realm ON players(realm);
CREATE INDEX idx_players_status ON players(status);
CREATE INDEX idx_players_location ON players(current_location);
CREATE INDEX idx_players_coordinates ON players USING GIST(coordinates);

-- 修炼记录表
CREATE TABLE cultivation_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(100) UNIQUE NOT NULL,
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    technique_id VARCHAR(100) NOT NULL,
    technique_name VARCHAR(100) NOT NULL,
    
    -- 修炼信息
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    progress DECIMAL(5,4) DEFAULT 0 CHECK (progress >= 0 AND progress <= 1),
    
    -- 收益
    experience_gained INTEGER DEFAULT 0 CHECK (experience_gained >= 0),
    energy_consumed INTEGER DEFAULT 0 CHECK (energy_consumed >= 0),
    breakthrough_achieved BOOLEAN DEFAULT false,
    insights_gained TEXT[],
    
    -- 状态
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'interrupted', 'failed')),
    end_reason VARCHAR(50),
    
    -- 环境因素
    location VARCHAR(100),
    weather_bonus DECIMAL(3,2) DEFAULT 1.0,
    time_bonus DECIMAL(3,2) DEFAULT 1.0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cultivation_records_player_id ON cultivation_records(player_id);
CREATE INDEX idx_cultivation_records_session_id ON cultivation_records(session_id);
CREATE INDEX idx_cultivation_records_technique_id ON cultivation_records(technique_id);
CREATE INDEX idx_cultivation_records_start_time ON cultivation_records(start_time);
CREATE INDEX idx_cultivation_records_status ON cultivation_records(status);

-- 战斗记录表
CREATE TABLE combat_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    combat_id VARCHAR(100) UNIQUE NOT NULL,
    combat_type VARCHAR(20) NOT NULL CHECK (combat_type IN ('duel', 'arena', 'tournament', 'monster', 'boss')),
    
    -- 参与者
    challenger_id UUID NOT NULL REFERENCES players(id),
    defender_id UUID REFERENCES players(id), -- 可为空，怪物战斗时
    monster_id VARCHAR(100), -- 怪物ID
    
    -- 战斗信息
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    
    -- 结果
    winner_id UUID REFERENCES players(id),
    end_reason VARCHAR(20) CHECK (end_reason IN ('victory', 'surrender', 'timeout', 'draw', 'disconnect')),
    
    -- 奖励
    experience_reward INTEGER DEFAULT 0,
    gold_reward INTEGER DEFAULT 0,
    items_reward JSONB DEFAULT '[]',
    reputation_change INTEGER DEFAULT 0,
    
    -- 位置
    location VARCHAR(100),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_combat_records_combat_id ON combat_records(combat_id);
CREATE INDEX idx_combat_records_challenger_id ON combat_records(challenger_id);
CREATE INDEX idx_combat_records_defender_id ON combat_records(defender_id);
CREATE INDEX idx_combat_records_winner_id ON combat_records(winner_id);
CREATE INDEX idx_combat_records_start_time ON combat_records(start_time);
CREATE INDEX idx_combat_records_type ON combat_records(combat_type);

-- 战斗动作表
CREATE TABLE combat_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    combat_id VARCHAR(100) NOT NULL,
    sequence_number INTEGER NOT NULL,
    
    -- 动作信息
    actor_id UUID NOT NULL REFERENCES players(id),
    target_id UUID REFERENCES players(id),
    action_type VARCHAR(20) NOT NULL CHECK (action_type IN ('attack', 'defend', 'skill', 'item', 'flee')),
    
    -- 技能/物品
    skill_id VARCHAR(100),
    skill_name VARCHAR(100),
    item_id VARCHAR(100),
    item_name VARCHAR(100),
    
    -- 效果
    damage_dealt INTEGER DEFAULT 0,
    healing_done INTEGER DEFAULT 0,
    energy_cost INTEGER DEFAULT 0,
    effects_applied JSONB DEFAULT '[]',
    
    -- 结果
    hit_success BOOLEAN DEFAULT true,
    critical_hit BOOLEAN DEFAULT false,
    damage_blocked INTEGER DEFAULT 0,
    
    action_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT combat_actions_combat_sequence UNIQUE (combat_id, sequence_number)
);

CREATE INDEX idx_combat_actions_combat_id ON combat_actions(combat_id);
CREATE INDEX idx_combat_actions_actor_id ON combat_actions(actor_id);
CREATE INDEX idx_combat_actions_sequence ON combat_actions(combat_id, sequence_number);

-- 物品表
CREATE TABLE items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id VARCHAR(100) UNIQUE NOT NULL, -- 物品模板ID
    name VARCHAR(100) NOT NULL,
    description TEXT,
    item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('weapon', 'armor', 'accessory', 'consumable', 'material', 'technique', 'treasure')),
    rarity VARCHAR(20) DEFAULT 'common' CHECK (rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary', 'mythical')),
    
    -- 属性
    level_requirement INTEGER DEFAULT 1,
    realm_requirement VARCHAR(50),
    
    -- 效果
    effects JSONB DEFAULT '{}',
    stats_bonus JSONB DEFAULT '{}',
    
    -- 经济
    base_price INTEGER DEFAULT 0,
    max_stack_size INTEGER DEFAULT 1,
    
    -- 获取方式
    obtainable_from JSONB DEFAULT '[]', -- ['combat', 'cultivation', 'shop', 'quest']
    
    -- 元数据
    icon_url VARCHAR(255),
    is_tradeable BOOLEAN DEFAULT true,
    is_consumable BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_items_item_id ON items(item_id);
CREATE INDEX idx_items_type ON items(item_type);
CREATE INDEX idx_items_rarity ON items(rarity);
CREATE INDEX idx_items_level_req ON items(level_requirement);

-- 玩家物品库存表
CREATE TABLE player_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    item_id VARCHAR(100) NOT NULL REFERENCES items(item_id),
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    
    -- 物品状态
    is_equipped BOOLEAN DEFAULT false,
    equipment_slot VARCHAR(20), -- 'weapon', 'armor_head', 'armor_body', 'accessory_ring1', etc.
    
    -- 强化信息
    enhancement_level INTEGER DEFAULT 0 CHECK (enhancement_level >= 0),
    enhancement_bonus JSONB DEFAULT '{}',
    
    -- 获取信息
    obtained_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    obtained_from VARCHAR(50),
    obtained_source_id VARCHAR(100),
    
    CONSTRAINT player_inventory_unique UNIQUE (player_id, item_id),
    CONSTRAINT player_inventory_equipment_unique UNIQUE (player_id, equipment_slot) DEFERRABLE INITIALLY DEFERRED
);

CREATE INDEX idx_player_inventory_player_id ON player_inventory(player_id);
CREATE INDEX idx_player_inventory_item_id ON player_inventory(item_id);
CREATE INDEX idx_player_inventory_equipped ON player_inventory(player_id, is_equipped) WHERE is_equipped = true;

-- 技能表
CREATE TABLE techniques (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    technique_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    technique_type VARCHAR(50) NOT NULL CHECK (technique_type IN ('cultivation', 'combat', 'movement', 'utility', 'passive')),
    
    -- 等级要求
    level_requirement INTEGER DEFAULT 1,
    realm_requirement VARCHAR(50),
    prerequisite_techniques JSONB DEFAULT '[]',
    
    -- 修炼信息
    cultivation_time_hours INTEGER DEFAULT 1,
    energy_cost INTEGER DEFAULT 10,
    experience_gain INTEGER DEFAULT 100,
    
    -- 战斗信息
    damage_multiplier DECIMAL(3,2) DEFAULT 1.0,
    energy_cost_combat INTEGER DEFAULT 5,
    cooldown_seconds INTEGER DEFAULT 0,
    
    -- 效果
    effects JSONB DEFAULT '{}',
    passive_bonuses JSONB DEFAULT '{}',
    
    -- 获取方式
    obtainable_from JSONB DEFAULT '[]',
    rarity VARCHAR(20) DEFAULT 'common',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_techniques_technique_id ON techniques(technique_id);
CREATE INDEX idx_techniques_type ON techniques(technique_type);
CREATE INDEX idx_techniques_level_req ON techniques(level_requirement);
CREATE INDEX idx_techniques_rarity ON techniques(rarity);

-- 玩家技能表
CREATE TABLE player_techniques (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
    technique_id VARCHAR(100) NOT NULL REFERENCES techniques(technique_id),
    
    -- 熟练度
    proficiency_level INTEGER DEFAULT 1 CHECK (proficiency_level > 0),
    proficiency_experience INTEGER DEFAULT 0 CHECK (proficiency_experience >= 0),
    max_proficiency_level INTEGER DEFAULT 10,
    
    -- 学习信息
    learned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    learned_from VARCHAR(50), -- 'master', 'book', 'enlightenment', 'system'
    
    -- 使用统计
    times_used INTEGER DEFAULT 0,
    last_used_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT player_techniques_unique UNIQUE (player_id, technique_id)
);

CREATE INDEX idx_player_techniques_player_id ON player_techniques(player_id);
CREATE INDEX idx_player_techniques_technique_id ON player_techniques(technique_id);
CREATE INDEX idx_player_techniques_proficiency ON player_techniques(proficiency_level);
```

### 视图和聚合查询

```sql
-- 玩家统计视图
CREATE VIEW player_statistics AS
SELECT 
    p.id,
    p.name,
    p.level,
    p.realm,
    p.experience,
    p.gold,
    p.spirit_stones,
    
    -- 修炼统计
    COALESCE(cs.total_cultivation_sessions, 0) as total_cultivation_sessions,
    COALESCE(cs.total_cultivation_time, 0) as total_cultivation_time_hours,
    COALESCE(cs.total_experience_from_cultivation, 0) as total_experience_from_cultivation,
    COALESCE(cs.breakthroughs_achieved, 0) as breakthroughs_achieved,
    
    -- 战斗统计
    COALESCE(bs.total_combats, 0) as total_combats,
    COALESCE(bs.wins, 0) as combat_wins,
    COALESCE(bs.losses, 0) as combat_losses,
    COALESCE(bs.win_rate, 0) as combat_win_rate,
    COALESCE(bs.total_experience_from_combat, 0) as total_experience_from_combat,
    
    -- 物品统计
    COALESCE(is.total_items, 0) as total_items,
    COALESCE(is.equipped_items, 0) as equipped_items,
    COALESCE(is.legendary_items, 0) as legendary_items,
    
    -- 技能统计
    COALESCE(ts.total_techniques, 0) as total_techniques,
    COALESCE(ts.master_level_techniques, 0) as master_level_techniques,
    
    p.created_at,
    p.last_active_at
FROM players p
LEFT JOIN (
    SELECT 
        player_id,
        COUNT(*) as total_cultivation_sessions,
        SUM(duration_seconds) / 3600.0 as total_cultivation_time,
        SUM(experience_gained) as total_experience_from_cultivation,
        SUM(CASE WHEN breakthrough_achieved THEN 1 ELSE 0 END) as breakthroughs_achieved
    FROM cultivation_records 
    WHERE status = 'completed'
    GROUP BY player_id
) cs ON p.id = cs.player_id
LEFT JOIN (
    SELECT 
        player_id,
        total_combats,
        wins,
        losses,
        CASE WHEN total_combats > 0 THEN wins::DECIMAL / total_combats ELSE 0 END as win_rate,
        total_experience_from_combat
    FROM (
        SELECT 
            COALESCE(challenger_id, defender_id) as player_id,
            COUNT(*) as total_combats,
            SUM(CASE WHEN winner_id = COALESCE(challenger_id, defender_id) THEN 1 ELSE 0 END) as wins,
            SUM(CASE WHEN winner_id != COALESCE(challenger_id, defender_id) THEN 1 ELSE 0 END) as losses,
            SUM(experience_reward) as total_experience_from_combat
        FROM combat_records
        WHERE end_time IS NOT NULL
        GROUP BY COALESCE(challenger_id, defender_id)
    ) combat_stats
) bs ON p.id = bs.player_id
LEFT JOIN (
    SELECT 
        pi.player_id,
        COUNT(*) as total_items,
        SUM(CASE WHEN pi.is_equipped THEN 1 ELSE 0 END) as equipped_items,
        SUM(CASE WHEN i.rarity IN ('legendary', 'mythical') THEN 1 ELSE 0 END) as legendary_items
    FROM player_inventory pi
    JOIN items i ON pi.item_id = i.item_id
    GROUP BY pi.player_id
) is ON p.id = is.player_id
LEFT JOIN (
    SELECT 
        player_id,
        COUNT(*) as total_techniques,
        SUM(CASE WHEN proficiency_level >= 10 THEN 1 ELSE 0 END) as master_level_techniques
    FROM player_techniques
    GROUP BY player_id
) ts ON p.id = ts.player_id;

-- 修炼排行榜视图
CREATE VIEW cultivation_leaderboard AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY total_experience_from_cultivation DESC) as rank,
    p.id,
    p.name,
    p.level,
    p.realm,
    cs.total_cultivation_sessions,
    cs.total_cultivation_time_hours,
    cs.total_experience_from_cultivation,
    cs.breakthroughs_achieved,
    cs.avg_session_duration,
    cs.cultivation_efficiency
FROM players p
JOIN (
    SELECT 
        player_id,
        COUNT(*) as total_cultivation_sessions,
        SUM(duration_seconds) / 3600.0 as total_cultivation_time_hours,
        SUM(experience_gained) as total_experience_from_cultivation,
        SUM(CASE WHEN breakthrough_achieved THEN 1 ELSE 0 END) as breakthroughs_achieved,
        AVG(duration_seconds) / 3600.0 as avg_session_duration,
        CASE 
            WHEN SUM(duration_seconds) > 0 
            THEN SUM(experience_gained)::DECIMAL / (SUM(duration_seconds) / 3600.0)
            ELSE 0 
        END as cultivation_efficiency
    FROM cultivation_records 
    WHERE status = 'completed'
    GROUP BY player_id
    HAVING SUM(experience_gained) > 0
) cs ON p.id = cs.player_id
ORDER BY cs.total_experience_from_cultivation DESC;

-- 战斗排行榜视图
CREATE VIEW combat_leaderboard AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY win_rate DESC, total_combats DESC) as rank,
    p.id,
    p.name,
    p.level,
    p.realm,
    bs.total_combats,
    bs.wins,
    bs.losses,
    bs.win_rate,
    bs.total_experience_from_combat,
    bs.avg_combat_duration
FROM players p
JOIN (
    SELECT 
        player_id,
        total_combats,
        wins,
        losses,
        win_rate,
        total_experience_from_combat,
        avg_combat_duration
    FROM (
        SELECT 
            COALESCE(challenger_id, defender_id) as player_id,
            COUNT(*) as total_combats,
            SUM(CASE WHEN winner_id = COALESCE(challenger_id, defender_id) THEN 1 ELSE 0 END) as wins,
            SUM(CASE WHEN winner_id != COALESCE(challenger_id, defender_id) THEN 1 ELSE 0 END) as losses,
            CASE 
                WHEN COUNT(*) > 0 
                THEN SUM(CASE WHEN winner_id = COALESCE(challenger_id, defender_id) THEN 1 ELSE 0 END)::DECIMAL / COUNT(*)
                ELSE 0 
            END as win_rate,
            SUM(experience_reward) as total_experience_from_combat,
            AVG(duration_seconds) / 60.0 as avg_combat_duration
        FROM combat_records
        WHERE end_time IS NOT NULL
        GROUP BY COALESCE(challenger_id, defender_id)
        HAVING COUNT(*) >= 5 -- 至少5场战斗才能上榜
    ) combat_stats
) bs ON p.id = bs.player_id
ORDER BY bs.win_rate DESC, bs.total_combats DESC;
```

## 🚀 **Redis 缓存策略**

### 缓存键命名规范

```csharp
// Cache/CacheKeys.cs
public static class CacheKeys
{
    // 玩家相关
    public static string Player(Guid playerId) => $"player:{playerId}";
    public static string PlayerStats(Guid playerId) => $"player:stats:{playerId}";
    public static string PlayerInventory(Guid playerId) => $"player:inventory:{playerId}";
    public static string PlayerTechniques(Guid playerId) => $"player:techniques:{playerId}";

    // 在线状态
    public static string OnlinePlayer(Guid playerId) => $"online:{playerId}";
    public static string OnlinePlayers() => "online:players";

    // 修炼相关
    public static string CultivationSession(Guid playerId) => $"cultivation:{playerId}";
    public static string CultivationQueue() => "cultivation:queue";

    // 战斗相关
    public static string CombatSession(Guid combatId) => $"combat:{combatId}";
    public static string CombatQueue() => "combat:queue";

    // 排行榜
    public static string Leaderboard(string type) => $"leaderboard:{type}";

    // 市场数据
    public static string MarketPrices() => "market:prices";
    public static string ItemMarket(string itemId) => $"market:item:{itemId}";

    // 系统配置
    public static string GameConfig() => "config:game";
    public static string ServerStatus() => "status:server";

    // 会话相关
    public static string UserSession(Guid userId) => $"session:{userId}";
    public static string SocketSession(string socketId) => $"socket:{socketId}";

    // 临时数据
    public static string TempData(string key) => $"temp:{key}";
    public static string LockKey(string resource) => $"lock:{resource}";
}
```

### 缓存配置

```csharp
// Cache/CacheConfig.cs
public static class CacheConfig
{
    // 默认TTL设置（秒）
    public static class Ttl
    {
        // 玩家数据
        public const int PlayerData = 300;       // 5分钟
        public const int PlayerStats = 600;      // 10分钟
        public const int PlayerInventory = 180;  // 3分钟

        // 在线状态
        public const int OnlineStatus = 60;      // 1分钟

        // 游戏会话
        public const int CultivationSession = 3600; // 1小时
        public const int CombatSession = 1800;   // 30分钟

        // 排行榜
        public const int Leaderboard = 300;      // 5分钟

        // 市场数据
        public const int MarketData = 120;        // 2分钟

        // 配置数据
        public const int GameConfig = 3600;      // 1小时

        // 临时数据
        public const int TempData = 60;          // 1分钟

        // 分布式锁
        public const int LockTtl = 30;           // 30秒
    }

    // 缓存策略
    public static class Strategies
    {
        // 写入策略
        public static readonly string[] WriteThrough = { "playerData", "playerStats" };
        public static readonly string[] WriteBack = { "playerInventory", "marketData" };
        public static readonly string[] WriteAround = { "tempData" };

        // 失效策略
        public static readonly string[] LRU = { "playerData", "playerStats" };
        public static readonly string[] LFU = { "gameConfig", "leaderboard" };
        public static readonly string[] TTL = { "onlineStatus", "tempData" };
    }

    // 预热配置
    public class WarmupOptions
    {
        public bool Enabled { get; set; } = true;
        public List<string> Keys { get; set; } = new()
        {
            "config:game",
            "leaderboard:cultivation",
            "leaderboard:combat",
            "market:prices"
        };
    }
}
```

### 缓存服务实现

```csharp
// Services/CacheService.cs
public class CacheService : ICacheService
{
    private readonly IDatabase _redis;
    private readonly ILogger<CacheService> _logger;

    public CacheService(IConnectionMultiplexer redis, ILogger<CacheService> logger)
    {
        _redis = redis.GetDatabase();
        _logger = logger;
    }

    // 获取缓存
    public async Task<T?> GetAsync<T>(string key)
    {
        try
        {
            var value = await _redis.StringGetAsync(key);
            if (!value.HasValue)
                return default;
            return JsonSerializer.Deserialize<T>(value!);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Cache get error for key {Key}", key);
            return default;
        }
    }

    // 设置缓存
    public async Task SetAsync<T>(string key, T value, TimeSpan? ttl = null)
    {
        try
        {
            var defaultTtl = TimeSpan.FromSeconds(GetDefaultTtl(key));
            await _redis.StringSetAsync(
                key,
                JsonSerializer.Serialize(value),
                ttl ?? defaultTtl);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Cache set error for key {Key}", key);
        }
    }

    // 删除缓存
    public async Task DelAsync(string key)
    {
        try
        {
            await _redis.KeyDeleteAsync(key);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Cache delete error for key {Key}", key);
        }
    }

    // 批量删除
    public async Task DelPatternAsync(string pattern)
    {
        try
        {
            var server = _redis.Multiplexer.GetServer(_redis.Multiplexer.GetEndPoints()[0]);
            foreach (var key in server.Keys(pattern: pattern))
            {
                await _redis.KeyDeleteAsync(key);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Cache delete pattern error for {Pattern}", pattern);
        }
    }

    // 获取或设置缓存
    public async Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory, TimeSpan? ttl = null)
    {
        var value = await GetAsync<T>(key);

        if (value is null)
        {
            value = await factory();
            await SetAsync(key, value, ttl);
        }

        return value;
    }

    // 分布式锁
    public async Task<string?> AcquireLockAsync(
        string resource,
        int ttl = 30,
        int retryDelay = 100,
        int maxRetries = 10)
    {
        var lockKey = CacheKeys.LockKey(resource);
        var lockValue = Guid.NewGuid().ToString();

        for (int i = 0; i < maxRetries; i++)
        {
            try
            {
                var result = await _redis.StringSetAsync(
                    lockKey,
                    lockValue,
                    TimeSpan.FromSeconds(ttl),
                    When.NotExists);

                if (result)
                {
                    return lockValue;
                }

                await Task.Delay(retryDelay);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lock acquisition error for {Resource}", resource);
            }
        }

        return null;
    }

    // 释放锁
    public async Task<bool> ReleaseLockAsync(string resource, string lockValue)
    {
        var lockKey = CacheKeys.LockKey(resource);

        try
        {
            // 使用 Lua 脚本确保原子性
            var script = @"
                if redis.call('get', KEYS[1]) == ARGV[1] then
                  return redis.call('del', KEYS[1])
                else
                  return 0
                end";

            var result = (long?)await _redis.ScriptEvaluateAsync(
                script,
                new RedisKey[] { lockKey },
                new RedisValue[] { lockValue });

            return result == 1;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Lock release error for {Resource}", resource);
            return false;
        }
    }

    // 缓存预热
    public async Task WarmupCacheAsync()
    {
        var warmupKeys = new[] { "config:game", "leaderboard:cultivation", "leaderboard:combat", "market:prices" };

        foreach (var key in warmupKeys)
        {
            try
            {
                await WarmupKeyAsync(key);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Cache warmup error for key {Key}", key);
            }
        }
    }

    private async Task WarmupKeyAsync(string key)
    {
        switch (key)
        {
            case "config:game":
                // 预热游戏配置
                break;
            case "leaderboard:cultivation":
                // 预热修炼排行榜
                break;
            case "leaderboard:combat":
                // 预热战斗排行榜
                break;
            case "market:prices":
                // 预热市场价格
                break;
        }
        await Task.CompletedTask;
    }

    private int GetDefaultTtl(string key)
    {
        // 根据键名确定默认TTL
        if (key.StartsWith("player:")) return CacheConfig.Ttl.PlayerData;
        if (key.StartsWith("online:")) return CacheConfig.Ttl.OnlineStatus;
        if (key.StartsWith("cultivation:")) return CacheConfig.Ttl.CultivationSession;
        if (key.StartsWith("combat:")) return CacheConfig.Ttl.CombatSession;
        if (key.StartsWith("leaderboard:")) return CacheConfig.Ttl.Leaderboard;
        if (key.StartsWith("market:")) return CacheConfig.Ttl.MarketData;
        if (key.StartsWith("config:")) return CacheConfig.Ttl.GameConfig;
        if (key.StartsWith("temp:")) return CacheConfig.Ttl.TempData;

        return 300; // 默认5分钟
    }
}
```

## 📊 **数据一致性策略**

### 最终一致性模型

```csharp
// Services/ConsistencyService.cs
public class ConsistencyService : IConsistencyService
{
    private readonly IEventStoreService _eventStore;
    private readonly ICacheService _cacheService;
    private readonly IPlayerRepository _playerRepository;
    private readonly ILogger<ConsistencyService> _logger;

    public ConsistencyService(
        IEventStoreService eventStore,
        ICacheService cacheService,
        IPlayerRepository playerRepository,
        ILogger<ConsistencyService> logger)
    {
        _eventStore = eventStore;
        _cacheService = cacheService;
        _playerRepository = playerRepository;
        _logger = logger;
    }

    // 确保玩家数据一致性
    public async Task EnsurePlayerConsistencyAsync(Guid playerId)
    {
        var lockValue = await _cacheService.AcquireLockAsync(
            $"player-consistency-{playerId}", 30);

        if (lockValue == null)
        {
            throw new InvalidOperationException("无法获取一致性锁");
        }

        try
        {
            // 从事件流重建玩家状态
            var events = await _eventStore.ReadStreamAsync($"player-{playerId}");
            var playerState = RebuildPlayerState(events);

            // 更新数据库（通过 EF Core）
            await _playerRepository.UpdateStateAsync(playerId, playerState);

            // 清除缓存，强制重新加载
            await _cacheService.DelAsync(CacheKeys.Player(playerId));
            await _cacheService.DelAsync(CacheKeys.PlayerStats(playerId));
        }
        finally
        {
            await _cacheService.ReleaseLockAsync(
                $"player-consistency-{playerId}", lockValue);
        }
    }

    // 从事件重建玩家状态
    private PlayerStateUpdate RebuildPlayerState(List<DomainEvent> events)
    {
        var state = new PlayerStateUpdate();

        foreach (var @event in events)
        {
            switch (@event.EventType)
            {
                case "PlayerCreated":
                    // 应用玩家创建事件数据
                    break;
                case "PlayerLevelUp":
                    // state.Level = @event.Data.NewLevel;
                    // state.Realm = @event.Data.NewRealm;
                    break;
                case "PlayerEnergyChanged":
                    // state.Energy = @event.Data.NewEnergy;
                    break;
                // 处理其他事件类型
            }
        }

        return state;
    }

    // 数据修复
    public async Task RepairDataInconsistencyAsync()
    {
        // 检查并修复数据不一致问题
        var inconsistentPlayers = await FindInconsistentPlayersAsync();

        foreach (var playerId in inconsistentPlayers)
        {
            try
            {
                await EnsurePlayerConsistencyAsync(playerId);
                _logger.LogInformation("修复玩家 {PlayerId} 的数据一致性", playerId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "修复玩家 {PlayerId} 数据失败", playerId);
            }
        }
    }

    private async Task<List<Guid>> FindInconsistentPlayersAsync()
    {
        // 实现数据一致性检查逻辑
        // 比较事件流和数据库状态
        return new List<Guid>();
    }
}
```

## 🔧 **数据库优化**

### 性能优化策略

```sql
-- 分区表设计（按时间分区）
CREATE TABLE cultivation_records_partitioned (
    LIKE cultivation_records INCLUDING ALL
) PARTITION BY RANGE (start_time);

-- 创建月度分区
CREATE TABLE cultivation_records_2024_01 PARTITION OF cultivation_records_partitioned
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE cultivation_records_2024_02 PARTITION OF cultivation_records_partitioned
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- 自动分区管理函数
CREATE OR REPLACE FUNCTION create_monthly_partition(table_name TEXT, start_date DATE)
RETURNS VOID AS $$
DECLARE
    partition_name TEXT;
    end_date DATE;
BEGIN
    partition_name := table_name || '_' || to_char(start_date, 'YYYY_MM');
    end_date := start_date + INTERVAL '1 month';
    
    EXECUTE format('CREATE TABLE IF NOT EXISTS %I PARTITION OF %I FOR VALUES FROM (%L) TO (%L)',
                   partition_name, table_name, start_date, end_date);
END;
$$ LANGUAGE plpgsql;

-- 索引优化
-- 复合索引
CREATE INDEX CONCURRENTLY idx_cultivation_records_player_time 
    ON cultivation_records (player_id, start_time DESC);

CREATE INDEX CONCURRENTLY idx_combat_records_participants_time 
    ON combat_records (challenger_id, defender_id, start_time DESC);

-- 部分索引
CREATE INDEX CONCURRENTLY idx_players_active_high_level 
    ON players (level DESC) 
    WHERE status != 'offline' AND level >= 50;

CREATE INDEX CONCURRENTLY idx_cultivation_active_sessions 
    ON cultivation_records (player_id, start_time) 
    WHERE status = 'active';

-- 表达式索引
CREATE INDEX CONCURRENTLY idx_players_experience_rank 
    ON players ((experience::BIGINT)) 
    WHERE experience > 0;

-- 统计信息更新
CREATE OR REPLACE FUNCTION update_table_statistics()
RETURNS VOID AS $$
BEGIN
    ANALYZE players;
    ANALYZE cultivation_records;
    ANALYZE combat_records;
    ANALYZE player_inventory;
    ANALYZE player_techniques;
END;
$$ LANGUAGE plpgsql;

-- 定期执行统计更新
SELECT cron.schedule('update-stats', '0 2 * * *', 'SELECT update_table_statistics();');
```

### 数据归档策略

```sql
-- 历史数据归档表
CREATE TABLE cultivation_records_archive (
    LIKE cultivation_records INCLUDING ALL
);

CREATE TABLE combat_records_archive (
    LIKE combat_records INCLUDING ALL
);

-- 数据归档函数
CREATE OR REPLACE FUNCTION archive_old_records(days_old INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
    archived_count INTEGER := 0;
    cutoff_date TIMESTAMP WITH TIME ZONE;
BEGIN
    cutoff_date := CURRENT_TIMESTAMP - INTERVAL '1 day' * days_old;
    
    -- 归档修炼记录
    WITH archived AS (
        DELETE FROM cultivation_records 
        WHERE start_time < cutoff_date 
        AND status IN ('completed', 'failed')
        RETURNING *
    )
    INSERT INTO cultivation_records_archive 
    SELECT * FROM archived;
    
    GET DIAGNOSTICS archived_count = ROW_COUNT;
    
    -- 归档战斗记录
    WITH archived AS (
        DELETE FROM combat_records 
        WHERE start_time < cutoff_date 
        AND end_time IS NOT NULL
        RETURNING *
    )
    INSERT INTO combat_records_archive 
    SELECT * FROM archived;
    
    GET DIAGNOSTICS archived_count = archived_count + ROW_COUNT;
    
    RETURN archived_count;
END;
$$ LANGUAGE plpgsql;

-- 定期归档任务
SELECT cron.schedule('archive-old-data', '0 3 * * 0', 'SELECT archive_old_records(90);');
```

## 📋 **数据库管理规范**

### 1. 备份策略
- 每日全量备份
- 每小时增量备份
- WAL日志连续归档
- 跨地域备份存储

### 2. 监控指标
- 连接数使用率
- 查询性能指标
- 锁等待时间
- 缓存命中率
- 磁盘空间使用

### 3. 安全规范
- 数据加密存储
- 访问权限控制
- SQL注入防护（EF Core参数化查询）
- 审计日志记录

### 4. 性能要求
- 查询响应时间<100ms
- 事务处理能力>1000 TPS
- 缓存命中率>90%
- 数据一致性延迟<1秒

通过这套混合数据库架构设计，我们能够充分发挥事件溯源和关系型数据库的各自优势，为修仙游戏提供高性能、高可用、可扩展的数据存储解决方案。
