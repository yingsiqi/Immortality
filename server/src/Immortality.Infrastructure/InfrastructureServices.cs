using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
using StackExchange.Redis;

namespace Immortality.Infrastructure.Database
{
    /// <summary>
    /// 数据库基础设施 — PostgreSQL 连接与 DbContext 注册。
    /// </summary>
    public static class DatabaseSetup
    {
        public static IServiceCollection AddPostgreSQL<TDbContext>(
            this IServiceCollection services,
            IConfiguration configuration,
            string connectionName = "PostgreSQL")
            where TDbContext : DbContext
        {
            var connectionString = configuration.GetConnectionString(connectionName)
                ?? throw new InvalidOperationException($"连接字符串 '{connectionName}' 未配置");

            services.AddDbContext<TDbContext>(options =>
                options.UseNpgsql(connectionString));

            return services;
        }
    }
}

namespace Immortality.Infrastructure.Cache
{
    /// <summary>
    /// Redis 缓存基础设施 — 连接与注册。
    /// </summary>
    public interface IRedisService
    {
        Task<string?> GetAsync(string key);
        Task SetAsync(string key, string value, TimeSpan? expiry = null);
        Task RemoveAsync(string key);
    }

    public class RedisService : IRedisService
    {
        private readonly IConnectionMultiplexer _redis;

        public RedisService(IConnectionMultiplexer redis)
        {
            _redis = redis;
        }

        public async Task<string?> GetAsync(string key)
        {
            var db = _redis.GetDatabase();
            return await db.StringGetAsync(key).ConfigureAwait(false);
        }

        public async Task SetAsync(string key, string value, TimeSpan? expiry = null)
        {
            var db = _redis.GetDatabase();
            await db.StringSetAsync(key, value, expiry).ConfigureAwait(false);
        }

        public async Task RemoveAsync(string key)
        {
            var db = _redis.GetDatabase();
            await db.KeyDeleteAsync(key).ConfigureAwait(false);
        }
    }

    public static class CacheSetup
    {
        public static IServiceCollection AddRedisCache(
            this IServiceCollection services,
            IConfiguration configuration,
            string connectionName = "Redis")
        {
            var connectionString = configuration.GetConnectionString(connectionName)
                ?? throw new InvalidOperationException($"连接字符串 '{connectionName}' 未配置");

            services.AddSingleton<IConnectionMultiplexer>(sp =>
                ConnectionMultiplexer.Connect(connectionString));

            services.AddSingleton<IRedisService, RedisService>();

            return services;
        }
    }
}

namespace Immortality.Infrastructure.Storage
{
    /// <summary>
    /// 对象存储基础设施 — MinIO (S3兼容) 文件存储。
    /// </summary>
    public interface IObjectStorageService
    {
        Task<string> UploadAsync(string bucket, string key, Stream data);
        Task<Stream> DownloadAsync(string bucket, string key);
        Task DeleteAsync(string bucket, string key);
    }

    // TODO: 实现 MinIO 客户端
    // public class MinIOStorageService : IObjectStorageService { ... }
}

namespace Immortality.Infrastructure.Messaging
{
    /// <summary>
    /// 消息队列基础设施 — Redis Pub/Sub。
    /// </summary>
    public interface IMessageBus
    {
        Task PublishAsync(string channel, string message);
        Task SubscribeAsync(string channel, Func<string, Task> handler);
    }

    // TODO: 实现基于 Redis Pub/Sub 或 RabbitMQ 的消息总线
}
