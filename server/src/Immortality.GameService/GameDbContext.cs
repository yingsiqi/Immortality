using Immortality.GameService.Entities;
using Microsoft.EntityFrameworkCore;

namespace Immortality.GameService
{
    /// <summary>
    /// 游戏服务数据库上下文 — 管理玩家、事件、快照表。
    /// </summary>
    public class GameDbContext : DbContext
    {
        public GameDbContext(DbContextOptions<GameDbContext> options) : base(options) { }

        public DbSet<Player> Players => Set<Player>();
        public DbSet<GameEvent> GameEvents => Set<GameEvent>();
        public DbSet<PlayerSnapshot> PlayerSnapshots => Set<PlayerSnapshot>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Player>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.UserId);
                entity.HasIndex(e => e.CharacterName).IsUnique();
                entity.Property(e => e.CharacterName).HasMaxLength(20).IsRequired();
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("NOW()");
            });

            modelBuilder.Entity<GameEvent>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.PlayerId, e.CreatedAt });
                entity.Property(e => e.EventType).HasMaxLength(50).IsRequired();
            });

            modelBuilder.Entity<PlayerSnapshot>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => new { e.PlayerId, e.SnapshotVersion });
            });
        }
    }
}
