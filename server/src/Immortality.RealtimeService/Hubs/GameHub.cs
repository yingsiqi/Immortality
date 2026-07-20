using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Immortality.RealtimeService.Hubs
{
    /// <summary>
    /// 游戏实时通信 Hub — 基于 SignalR。
    /// 处理修炼进度同步、战斗指令、世界事件推送。
    /// </summary>
    [Authorize]
    public class GameHub : Hub
    {
        private readonly ILogger<GameHub> _logger;

        public GameHub(ILogger<GameHub> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// 客户端连接时。
        /// </summary>
        public override async Task OnConnectedAsync()
        {
            var userId = Context.User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            _logger.LogInformation("客户端连接: ConnectionId={ConnectionId}, UserId={UserId}",
                Context.ConnectionId, userId);

            // 将连接加入用户专属组
            if (userId != null)
                await Groups.AddToGroupAsync(Context.ConnectionId, $"user-{userId}");

            await base.OnConnectedAsync();
        }

        /// <summary>
        /// 客户端断开时。
        /// </summary>
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userId = Context.User?.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            _logger.LogInformation("客户端断开: ConnectionId={ConnectionId}, UserId={UserId}",
                Context.ConnectionId, userId);

            if (userId != null)
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"user-{userId}");

            await base.OnDisconnectedAsync(exception);
        }

        /// <summary>
        /// 加入修炼频道 — 接收修炼进度推送。
        /// </summary>
        [HubMethodName("JoinCultivation")]
        public async Task JoinCultivation(string playerId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"cultivation-{playerId}");
            _logger.LogDebug("加入修炼频道: {PlayerId}", playerId);
        }

        /// <summary>
        /// 离开修炼频道。
        /// </summary>
        [HubMethodName("LeaveCultivation")]
        public async Task LeaveCultivation(string playerId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"cultivation-{playerId}");
        }

        /// <summary>
        /// 发送战斗指令。
        /// </summary>
        [HubMethodName("SendCombatAction")]
        public async Task SendCombatAction(string combatId, string action, string payload)
        {
            // 广播战斗指令给同战斗的所有玩家
            await Clients.Group($"combat-{combatId}").SendAsync("CombatAction", combatId, action, payload);
        }

        /// <summary>
        /// 加入战斗频道。
        /// </summary>
        [HubMethodName("JoinCombat")]
        public async Task JoinCombat(string combatId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, $"combat-{combatId}");
        }
    }
}
