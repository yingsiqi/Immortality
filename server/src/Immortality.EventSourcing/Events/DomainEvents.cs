using System.Text.Json;

namespace Immortality.EventSourcing.Events
{
    /// <summary>
    /// 领域事件基类 — 所有游戏事件的抽象基础。
    /// 事件溯源架构的核心：所有状态变更以不可变事件记录。
    /// </summary>
    public abstract record DomainEvent
    {
        public Guid EventId { get; init; } = Guid.NewGuid();
        public DateTime Timestamp { get; init; } = DateTime.UtcNow;
        public abstract string EventType { get; }
    }

    // ── 玩家相关事件 ──

    public record PlayerCreatedEvent(
        string PlayerId,
        string UserId,
        string CharacterName,
        string SpiritualRootType
    ) : DomainEvent
    {
        public override string EventType => "player.created";
    }

    public record PlayerDataLoadedEvent(
        string PlayerId,
        int CultivationRealmIndex,
        long SpiritualPower
    ) : DomainEvent
    {
        public override string EventType => "player.data-loaded";
    }

    // ── 修炼相关事件 ──

    public record CultivationStartedEvent(
        string PlayerId,
        DateTime StartedAt
    ) : DomainEvent
    {
        public override string EventType => "cultivation.started";
    }

    public record CultivationProgressEvent(
        string PlayerId,
        long GameDaysAccumulated,
        long SpiritualPowerGained
    ) : DomainEvent
    {
        public override string EventType => "cultivation.progress";
    }

    public record CultivationEndedEvent(
        string PlayerId,
        DateTime EndedAt,
        long TotalGameDays
    ) : DomainEvent
    {
        public override string EventType => "cultivation.ended";
    }

    public record LevelUpEvent(
        string PlayerId,
        int OldRealmIndex,
        int NewRealmIndex,
        int NewLayer,
        double BreakthroughChance,
        bool Success
    ) : DomainEvent
    {
        public override string EventType => "cultivation.levelup";
    }

    // ── 战斗相关事件 ──

    public record CombatStartedEvent(
        string PlayerId,
        string EnemyId,
        string CombatType
    ) : DomainEvent
    {
        public override string EventType => "combat.started";
    }

    public record CombatEndedEvent(
        string PlayerId,
        bool Victory,
        long ExpGained,
        DateTime EndedAt
    ) : DomainEvent
    {
        public override string EventType => "combat.ended";
    }

    // ── 经济相关事件 ──

    public record CurrencyChangedEvent(
        string PlayerId,
        int CurrencyType,
        long Amount,
        string Reason
    ) : DomainEvent
    {
        public override string EventType => "economy.currency-changed";
    }

    public record ItemAcquiredEvent(
        string PlayerId,
        string ItemId,
        int Quantity,
        string Source
    ) : DomainEvent
    {
        public override string EventType => "economy.item-acquired";
    }
}
