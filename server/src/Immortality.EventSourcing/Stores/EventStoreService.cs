using EventStore.Client;
using Immortality.EventSourcing.Events;
using Microsoft.Extensions.Logging;
using System.Text;
using System.Text.Json;

namespace Immortality.EventSourcing.Stores
{
    /// <summary>
    /// 事件存储服务接口 — 封装 EventStoreDB 操作。
    /// 流命名规则: player-{id}, cultivation-{id}
    /// </summary>
    public interface IEventStoreService
    {
        Task AppendEventAsync(string streamName, DomainEvent @event);
        Task AppendEventsAsync(string streamName, IEnumerable<DomainEvent> events);
        IAsyncEnumerable<DomainEvent> ReadStreamAsync(string streamName);
        IAsyncEnumerable<DomainEvent> ReadAllFromPositionAsync(ulong position);
        Task SubscribeToStreamAsync(string streamName, Func<DomainEvent, Task> onEvent);
    }

    /// <summary>
    /// EventStoreDB 事件存储实现。
    /// </summary>
    public class EventStoreService : IEventStoreService
    {
        private readonly EventStoreClient _client;
        private readonly ILogger<EventStoreService> _logger;

        public EventStoreService(EventStoreClient client, ILogger<EventStoreService> logger)
        {
            _client = client;
            _logger = logger;
        }

        public async Task AppendEventAsync(string streamName, DomainEvent @event)
        {
            var eventData = new EventData(
                Uuid.NewUuid(),
                @event.EventType,
                JsonSerializer.SerializeToUtf8Bytes(@event, @event.GetType()));

            await _client.AppendToStreamAsync(
                streamName,
                StreamState.Any,
                new[] { eventData });

            _logger.LogDebug("事件已追加: {StreamName} / {EventType}", streamName, @event.EventType);
        }

        public async Task AppendEventsAsync(string streamName, IEnumerable<DomainEvent> events)
        {
            var eventDatas = events.Select(@event => new EventData(
                Uuid.NewUuid(),
                @event.EventType,
                JsonSerializer.SerializeToUtf8Bytes(@event, @event.GetType())));

            await _client.AppendToStreamAsync(
                streamName,
                StreamState.Any,
                eventDatas);
        }

        public async IAsyncEnumerable<DomainEvent> ReadStreamAsync(string streamName)
        {
            var result = _client.ReadStreamAsync(
                Direction.Forwards,
                streamName,
                StreamPosition.Start);

            await foreach (var resolvedEvent in result)
            {
                var domainEvent = DeserializeEvent(resolvedEvent);
                if (domainEvent != null)
                    yield return domainEvent;
            }
        }

        public async IAsyncEnumerable<DomainEvent> ReadAllFromPositionAsync(ulong position)
        {
            var result = _client.ReadAllAsync(
                Direction.Forwards,
                Position.FromInt64(checked((long)position), checked((long)position)));

            await foreach (var resolvedEvent in result)
            {
                var domainEvent = DeserializeEvent(resolvedEvent);
                if (domainEvent != null)
                    yield return domainEvent;
            }
        }

        public async Task SubscribeToStreamAsync(string streamName, Func<DomainEvent, Task> onEvent)
        {
            await _client.SubscribeToStreamAsync(
                streamName,
                FromStream.Start,
                async (subscription, resolvedEvent, cancellationToken) =>
                {
                    var domainEvent = DeserializeEvent(resolvedEvent);
                    if (domainEvent != null)
                        await onEvent(domainEvent);
                });
        }

        private static DomainEvent? DeserializeEvent(ResolvedEvent resolvedEvent)
        {
            var json = Encoding.UTF8.GetString(resolvedEvent.Event.Data.Span);
            return resolvedEvent.Event.EventType switch
            {
                "player.created" => JsonSerializer.Deserialize<PlayerCreatedEvent>(json),
                "cultivation.started" => JsonSerializer.Deserialize<CultivationStartedEvent>(json),
                "cultivation.progress" => JsonSerializer.Deserialize<CultivationProgressEvent>(json),
                "cultivation.ended" => JsonSerializer.Deserialize<CultivationEndedEvent>(json),
                "cultivation.levelup" => JsonSerializer.Deserialize<LevelUpEvent>(json),
                "combat.started" => JsonSerializer.Deserialize<CombatStartedEvent>(json),
                "combat.ended" => JsonSerializer.Deserialize<CombatEndedEvent>(json),
                "economy.currency-changed" => JsonSerializer.Deserialize<CurrencyChangedEvent>(json),
                "economy.item-acquired" => JsonSerializer.Deserialize<ItemAcquiredEvent>(json),
                _ => null
            };
        }
    }
}
