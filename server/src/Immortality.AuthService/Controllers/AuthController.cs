using Immortality.AuthService.Services;
using Immortality.Shared.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Immortality.AuthService.Controllers
{
    /// <summary>
    /// 认证控制器 — 用户注册与登录。
    /// </summary>
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        /// <summary>
        /// 用户登录。
        /// </summary>
        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse<TokenResponse>>> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.LoginAsync(request);

            if (token == null)
                return Unauthorized(ApiResponse<TokenResponse>.Fail("用户名或密码错误", "AUTH_FAILED"));

            return Ok(ApiResponse<TokenResponse>.Ok(token));
        }

        /// <summary>
        /// 用户注册。
        /// </summary>
        [HttpPost("register")]
        public async Task<ActionResult<ApiResponse<bool>>> Register([FromBody] RegisterRequest request)
        {
            var success = await _authService.RegisterAsync(request);

            if (!success)
                return Conflict(ApiResponse<bool>.Fail("用户名已存在", "USERNAME_EXISTS"));

            return Ok(ApiResponse<bool>.Ok(true));
        }

        /// <summary>
        /// 健康检查。
        /// </summary>
        [HttpGet("health")]
        public IActionResult Health() => Ok(new { status = "healthy", service = "AuthService" });
    }
}
