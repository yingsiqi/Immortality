using Immortality.EventSourcing.Events;

namespace Immortality.EventSourcing.Projections
{
    /// <summary>
    /// 事件投影接口 — 从事件流构建读模型。
    /// CQRS 模式：写侧为事件流，读侧为物化视图。
    /// </summary>
    public interface IProjection
    {
        Task HandleAsync(DomainEvent @event);
    }

    /// <summary>
    /// 玩家数据投影 — 从事件流重建玩家当前状态。
    /// </summary>
    public class PlayerProjection : IProjection
    {
        private readonly IReadModelStore _readModelStore;

        public PlayerProjection(IReadModelStore readModelStore)
        {
            _readModelStore = readModelStore;
        }

        public async Task HandleAsync(DomainEvent @event)
        {
            switch (@event)
            {
                case PlayerCreatedEvent e:
                    await _readModelStore.UpsertPlayerAsync(new PlayerReadModel
                    {
                        PlayerId = e.PlayerId,
                        UserId = e.UserId,
                        CharacterName = e.CharacterName,
                        SpiritualRootType = e.SpiritualRootType,
                        CultivationRealmIndex = 0,
                        CultivationLayer = 0,
                        CreatedAt = DateTime.UtcNow
                    });
                    break;

                case LevelUpEvent e when e.Success:
                    await _readModelStore.UpdateCultivationRealmAsync(
                        e.PlayerId, e.NewRealmIndex, e.NewLayer);
                    break;

                case CultivationProgressEvent e:
                    await _readModelStore.UpdateSpiritualPowerAsync(
                        e.PlayerId, e.SpiritualPowerGained);
                    break;
            }
        }
    }

    /// <summary>
    /// 读模型存储接口。
    /// </summary>
    public interface IReadModelStore
    {
        Task UpsertPlayerAsync(PlayerReadModel player);
        Task UpdateCultivationRealmAsync(string playerId, int realmIndex, int layer);
        Task UpdateSpiritualPowerAsync(string playerId, long powerGain);
        Task<PlayerReadModel?> GetPlayerAsync(string playerId);
    }

    /// <summary>
    /// 玩家读模型。
    /// </summary>
    public class PlayerReadModel
    {
        public string PlayerId { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string CharacterName { get; set; } = string.Empty;
        public string SpiritualRootType { get; set; } = string.Empty;
        public int CultivationRealmIndex { get; set; }
        public int CultivationLayer { get; set; }
        public long SpiritualPower { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
