using System.ComponentModel.DataAnnotations;
using Immortality.Shared.Models;

namespace Immortality.GameService.Entities
{
    /// <summary>
    /// 玩家实体 — 对应 players 表。
    /// </summary>
    public class Player
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

        [MaxLength(20)]
        public string CharacterName { get; set; } = string.Empty;

        public CultivationRealm CultivationRealm { get; set; } = CultivationRealm.Mortal;
        public int CultivationLayer { get; set; }
        public int CultivationSubLayer { get; set; }

        public SpiritualRootType SpiritualRoot { get; set; } = SpiritualRootType.Mixed;

        public long SpiritualPower { get; set; }
        public long MaxSpiritualPower { get; set; } = 100;

        public int Stamina { get; set; } = 100;
        public int MaxStamina { get; set; } = 100;

        public int MeritPoints { get; set; }

        // 业力（5维）
        public long KarmaGood { get; set; }
        public long KarmaEvil { get; set; }
        public long KarmaCausal { get; set; }
        public long KarmaAttachment { get; set; }
        public long KarmaMerit { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastActiveAt { get; set; } = DateTime.UtcNow;
    }

    /// <summary>
    /// 游戏事件记录实体 — 对应 game_events 表。
    /// </summary>
    public class GameEvent
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid PlayerId { get; set; }
        [MaxLength(50)]
        public string EventType { get; set; } = string.Empty;
        public string EventData { get; set; } = "{}";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    /// <summary>
    /// 玩家快照 — 对应 player_snapshots 表，用于快速恢复状态。
    /// </summary>
    public class PlayerSnapshot
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid PlayerId { get; set; }
        public int SnapshotVersion { get; set; }
        public string SnapshotData { get; set; } = "{}";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
