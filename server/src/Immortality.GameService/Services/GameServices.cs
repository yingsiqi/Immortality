using Immortality.EventSourcing.Events;
using Immortality.EventSourcing.Stores;
using Immortality.GameService.Entities;
using Immortality.Shared.Constants;
using Immortality.Shared.DTOs;
using Immortality.Shared.Models;

namespace Immortality.GameService.Services
{
    /// <summary>
    /// 修炼服务接口 — 核心游戏系统。
    /// </summary>
    public interface ICultivationService
    {
        Task<CultivationProgressDto> GetProgressAsync(string playerId);
        Task<BreakthroughResultDto> AttemptBreakthroughAsync(string playerId);
        Task RecordProgressAsync(string playerId, long gameDays);
    }

    /// <summary>
    /// 修炼服务实现 — 修炼进度、突破判定、事件记录。
    /// 突破成功率 = 基础率 × 灵根系数 × 心境系数 × 准备度
    /// </summary>
    public class CultivationService : ICultivationService
    {
        private readonly GameDbContext _dbContext;
        private readonly IEventStoreService _eventStore;
        private readonly ILogger<CultivationService> _logger;

        public CultivationService(
            GameDbContext dbContext,
            IEventStoreService eventStore,
            ILogger<CultivationService> logger)
        {
            _dbContext = dbContext;
            _eventStore = eventStore;
            _logger = logger;
        }

        public async Task<CultivationProgressDto> GetProgressAsync(string playerId)
        {
            var player = await GetPlayerAsync(playerId);
            if (player == null)
                throw new KeyNotFoundException($"玩家不存在: {playerId}");

            var canBreakthrough = player.CultivationLayer >= GameConstants.LayersPerRealm;
            var chance = CalculateBreakthroughChance(player);

            return new CultivationProgressDto(
                playerId,
                player.SpiritualPower,
                (int)player.CultivationRealm,
                player.CultivationLayer,
                canBreakthrough,
                chance
            );
        }

        public async Task<BreakthroughResultDto> AttemptBreakthroughAsync(string playerId)
        {
            var player = await GetPlayerAsync(playerId);
            if (player == null)
                throw new KeyNotFoundException($"玩家不存在: {playerId}");

            if (player.CultivationLayer < GameConstants.LayersPerRealm)
                return new BreakthroughResultDto(false, (int)player.CultivationRealm, "境界层数不足");

            var chance = CalculateBreakthroughChance(player);
            var roll = Random.Shared.NextDouble();

            var success = roll < chance;
            var oldRealm = (int)player.CultivationRealm;
            var newRealm = oldRealm;

            if (success)
            {
                newRealm = oldRealm + 1;
                player.CultivationRealm = (CultivationRealm)newRealm;
                player.CultivationLayer = 0;
                player.MaxSpiritualPower = (long)(player.MaxSpiritualPower * 1.5);
            }
            else
            {
                // 突破失败，境界回退一层
                player.CultivationLayer = Math.Max(0, player.CultivationLayer - 1);
            }

            await _dbContext.SaveChangesAsync();

            // 记录事件
            await _eventStore.AppendEventAsync(
                $"cultivation-{playerId}",
                new LevelUpEvent(playerId, oldRealm, newRealm, player.CultivationLayer, chance, success));

            _logger.LogInformation("突破判定: Player={PlayerId}, Chance={Chance}, Success={Success}",
                playerId, chance, success);

            return new BreakthroughResultDto(success, newRealm, success ? null : "突破失败，天道不允");
        }

        public async Task RecordProgressAsync(string playerId, long gameDays)
        {
            var player = await GetPlayerAsync(playerId);
            if (player == null) return;

            var powerGain = (long)(gameDays * GetRootMultiplier(player.SpiritualRoot));
            player.SpiritualPower = Math.Min(player.MaxSpiritualPower, player.SpiritualPower + powerGain);
            player.LastActiveAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();

            await _eventStore.AppendEventAsync(
                $"cultivation-{playerId}",
                new CultivationProgressEvent(playerId, gameDays, powerGain));
        }

        private double CalculateBreakthroughChance(Player player)
        {
            var realmIndex = (int)player.CultivationRealm;
            if (realmIndex >= GameConstants.BaseBreakthroughChances.Length)
                return 0;

            var baseChance = GameConstants.BaseBreakthroughChances[realmIndex];
            var rootMultiplier = GetRootMultiplier(player.SpiritualRoot);
            var karmaMultiplier = GetKarmaMultiplier(player);

            return baseChance * rootMultiplier * karmaMultiplier;
        }

        private static double GetRootMultiplier(SpiritualRootType root) => root switch
        {
            SpiritualRootType.Heavenly => 1.5,
            SpiritualRootType.Mutant => 1.3,
            SpiritualRootType.True => 1.0,
            SpiritualRootType.Pseudo => 0.7,
            SpiritualRootType.Mixed => 0.5,
            _ => 0.5
        };

        private static double GetKarmaMultiplier(Player player)
        {
            // 功德增加突破率，恶业降低突破率
            var karmaBalance = player.KarmaMerit - player.KarmaEvil;
            return Math.Clamp(1.0 + karmaBalance * 0.0001, 0.5, 1.5);
        }

        private async Task<Player?> GetPlayerAsync(string playerId)
        {
            if (!Guid.TryParse(playerId, out var id))
                return null;

            return await _dbContext.Players.FindAsync(id);
        }
    }

    /// <summary>
    /// 玩家服务接口 — 玩家数据管理。
    /// </summary>
    public interface IPlayerService
    {
        Task<PlayerDto?> GetPlayerAsync(string playerId);
        Task<PlayerDto?> GetPlayerByUserAsync(string userId);
        Task<PlayerDto> CreatePlayerAsync(CreatePlayerRequest request, string userId);
    }

    public class PlayerService : IPlayerService
    {
        private readonly GameDbContext _dbContext;
        private readonly IEventStoreService _eventStore;

        public PlayerService(GameDbContext dbContext, IEventStoreService eventStore)
        {
            _dbContext = dbContext;
            _eventStore = eventStore;
        }

        public async Task<PlayerDto?> GetPlayerAsync(string playerId)
        {
            if (!Guid.TryParse(playerId, out var id))
                return null;

            var player = await _dbContext.Players.FindAsync(id);
            return player == null ? null : MapToDto(player);
        }

        public async Task<PlayerDto?> GetPlayerByUserAsync(string userId)
        {
            if (!Guid.TryParse(userId, out var id))
                return null;

            var player = await _dbContext.Players.FirstOrDefaultAsync(p => p.UserId == id);
            return player == null ? null : MapToDto(player);
        }

        public async Task<PlayerDto> CreatePlayerAsync(CreatePlayerRequest request, string userId)
        {
            if (!Guid.TryParse(userId, out var userIdGuid))
                throw new ArgumentException("无效的用户ID");

            var player = new Player
            {
                Id = Guid.NewGuid(),
                UserId = userIdGuid,
                CharacterName = request.CharacterName,
                SpiritualRoot = Enum.Parse<SpiritualRootType>(request.SpiritualRootType, true),
                CreatedAt = DateTime.UtcNow,
                LastActiveAt = DateTime.UtcNow
            };

            _dbContext.Players.Add(player);
            await _dbContext.SaveChangesAsync();

            await _eventStore.AppendEventAsync(
                $"player-{player.Id}",
                new PlayerCreatedEvent(player.Id.ToString(), userId, request.CharacterName, request.SpiritualRootType));

            return MapToDto(player);
        }

        private static PlayerDto MapToDto(Player p) => new(
            p.Id.ToString(),
            p.CharacterName,
            (int)p.CultivationRealm,
            p.CultivationLayer,
            p.CultivationSubLayer,
            p.SpiritualRoot.ToString(),
            p.SpiritualPower,
            p.MaxSpiritualPower,
            p.Stamina,
            p.MaxStamina,
            p.MeritPoints
        );
    }

    /// <summary>
    /// 战斗服务接口。
    /// </summary>
    public interface ICombatService
    {
        Task StartCombatAsync(string playerId, string enemyId, string combatType);
        Task EndCombatAsync(string playerId, bool victory, long expGained);
    }

    public class CombatService : ICombatService
    {
        private readonly IEventStoreService _eventStore;

        public CombatService(IEventStoreService eventStore)
        {
            _eventStore = eventStore;
        }

        public async Task StartCombatAsync(string playerId, string enemyId, string combatType)
        {
            await _eventStore.AppendEventAsync(
                $"combat-{playerId}",
                new CombatStartedEvent(playerId, enemyId, combatType));
        }

        public async Task EndCombatAsync(string playerId, bool victory, long expGained)
        {
            await _eventStore.AppendEventAsync(
                $"combat-{playerId}",
                new CombatEndedEvent(playerId, victory, expGained, DateTime.UtcNow));
        }
    }

    /// <summary>
    /// 事件重放服务 — 从事件流重建玩家状态。
    /// </summary>
    public interface IEventReplayService
    {
        Task RebuildPlayerStateAsync(string playerId);
    }

    public class EventReplayService : IEventReplayService
    {
        private readonly IEventStoreService _eventStore;
        private readonly GameDbContext _dbContext;

        public EventReplayService(IEventStoreService eventStore, GameDbContext dbContext)
        {
            _eventStore = eventStore;
            _dbContext = dbContext;
        }

        public async Task RebuildPlayerStateAsync(string playerId)
        {
            // 从快照加载基础状态
            // 然后重放快照之后的所有事件
            await foreach (var @event in _eventStore.ReadStreamAsync($"player-{playerId}"))
            {
                // TODO: 应用事件到读模型
            }
        }
    }
}
