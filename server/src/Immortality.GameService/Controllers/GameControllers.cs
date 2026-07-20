using Immortality.GameService.Services;
using Immortality.Shared.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Immortality.GameService.Controllers
{
    /// <summary>
    /// 玩家控制器 — 玩家数据查询与创建。
    /// </summary>
    [ApiController]
    [Route("api/player")]
    [Authorize]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;

        public PlayerController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        /// <summary>
        /// 获取当前用户玩家信息。
        /// </summary>
        [HttpGet("me")]
        public async Task<ActionResult<ApiResponse<PlayerDto>>> GetMyPlayer()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized(ApiResponse<PlayerDto>.Fail("未认证", "UNAUTHORIZED"));

            var player = await _playerService.GetPlayerByUserAsync(userId);
            if (player == null)
                return NotFound(ApiResponse<PlayerDto>.Fail("未创建角色", "PLAYER_NOT_FOUND"));

            return Ok(ApiResponse<PlayerDto>.Ok(player));
        }

        /// <summary>
        /// 创建角色。
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<PlayerDto>>> CreatePlayer([FromBody] CreatePlayerRequest request)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized(ApiResponse<PlayerDto>.Fail("未认证", "UNAUTHORIZED"));

            var player = await _playerService.CreatePlayerAsync(request, userId);
            return Ok(ApiResponse<PlayerDto>.Ok(player));
        }

        /// <summary>
        /// 获取指定玩家信息。
        /// </summary>
        [HttpGet("{playerId}")]
        public async Task<ActionResult<ApiResponse<PlayerDto>>> GetPlayer(string playerId)
        {
            var player = await _playerService.GetPlayerAsync(playerId);
            if (player == null)
                return NotFound(ApiResponse<PlayerDto>.Fail("玩家不存在", "PLAYER_NOT_FOUND"));

            return Ok(ApiResponse<PlayerDto>.Ok(player));
        }
    }

    /// <summary>
    /// 修炼控制器 — 修炼进度与突破。
    /// </summary>
    [ApiController]
    [Route("api/cultivation")]
    [Authorize]
    public class CultivationController : ControllerBase
    {
        private readonly ICultivationService _cultivationService;

        public CultivationController(ICultivationService cultivationService)
        {
            _cultivationService = cultivationService;
        }

        /// <summary>
        /// 获取修炼进度。
        /// </summary>
        [HttpGet("{playerId}/progress")]
        public async Task<ActionResult<ApiResponse<CultivationProgressDto>>> GetProgress(string playerId)
        {
            try
            {
                var progress = await _cultivationService.GetProgressAsync(playerId);
                return Ok(ApiResponse<CultivationProgressDto>.Ok(progress));
            }
            catch (KeyNotFoundException)
            {
                return NotFound(ApiResponse<CultivationProgressDto>.Fail("玩家不存在", "PLAYER_NOT_FOUND"));
            }
        }

        /// <summary>
        /// 尝试突破。
        /// </summary>
        [HttpPost("{playerId}/breakthrough")]
        public async Task<ActionResult<ApiResponse<BreakthroughResultDto>>> Breakthrough(string playerId)
        {
            try
            {
                var result = await _cultivationService.AttemptBreakthroughAsync(playerId);
                return Ok(ApiResponse<BreakthroughResultDto>.Ok(result));
            }
            catch (KeyNotFoundException)
            {
                return NotFound(ApiResponse<BreakthroughResultDto>.Fail("玩家不存在", "PLAYER_NOT_FOUND"));
            }
        }
    }

    /// <summary>
    /// 健康检查。
    /// </summary>
    [ApiController]
    [Route("api/health")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Health() => Ok(new { status = "healthy", service = "GameService" });
    }
}
