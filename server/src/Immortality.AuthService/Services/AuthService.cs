using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Immortality.AuthService.Entities;
using Immortality.Shared.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Immortality.AuthService.Services
{
    /// <summary>
    /// 认证服务接口。
    /// </summary>
    public interface IAuthService
    {
        Task<TokenResponse?> LoginAsync(LoginRequest request);
        Task<bool> RegisterAsync(RegisterRequest request);
    }

    /// <summary>
    /// 认证服务实现 — 用户注册、登录、密码验证。
    /// </summary>
    public class AuthService : IAuthService
    {
        private readonly AuthDbContext _dbContext;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            AuthDbContext dbContext,
            ITokenService tokenService,
            ILogger<AuthService> logger)
        {
            _dbContext = dbContext;
            _tokenService = tokenService;
            _logger = logger;
        }

        public async Task<TokenResponse?> LoginAsync(LoginRequest request)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                _logger.LogWarning("登录失败: 用户名或密码错误 - {Username}", request.Username);
                return null;
            }

            if (!user.IsActive)
            {
                _logger.LogWarning("登录失败: 账号已停用 - {Username}", request.Username);
                return null;
            }

            user.LastLoginAt = DateTime.UtcNow;
            await _dbContext.SaveChangesAsync();

            var (accessToken, refreshToken) = _tokenService.GenerateTokens(user);
            return new TokenResponse(accessToken, refreshToken, 86400); // 24h
        }

        public async Task<bool> RegisterAsync(RegisterRequest request)
        {
            var existing = await _dbContext.Users
                .AnyAsync(u => u.Username == request.Username);

            if (existing)
                return false;

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = request.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                CreatedAt = DateTime.UtcNow,
                LastLoginAt = DateTime.UtcNow,
                IsActive = true
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            _logger.LogInformation("新用户注册: {Username}", request.Username);
            return true;
        }
    }

    /// <summary>
    /// Token 服务接口。
    /// </summary>
    public interface ITokenService
    {
        (string accessToken, string refreshToken) GenerateTokens(User user);
        bool ValidateToken(string token);
    }

    /// <summary>
    /// JWT Token 服务 — 生成 access token (24h) + refresh token (7d)。
    /// </summary>
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public (string accessToken, string refreshToken) GenerateTokens(User user)
        {
            var jwtConfig = _configuration.GetSection("Jwt");
            var secret = jwtConfig["Secret"] ?? throw new InvalidOperationException("Jwt:Secret 未配置");
            var issuer = jwtConfig["Issuer"] ?? throw new InvalidOperationException("Jwt:Issuer 未配置");
            var audience = jwtConfig["Audience"] ?? throw new InvalidOperationException("Jwt:Audience 未配置");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var accessTokenMinutes = jwtConfig.GetValue<int?>("AccessTokenExpirationMinutes") ?? 1440;
            var refreshTokenDays = jwtConfig.GetValue<int?>("RefreshTokenExpirationDays") ?? 7;
            var now = DateTime.UtcNow;

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var accessToken = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                notBefore: now,
                expires: now.AddMinutes(accessTokenMinutes),
                signingCredentials: credentials);

            var refreshToken = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim("token_type", "refresh"),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                },
                notBefore: now,
                expires: now.AddDays(refreshTokenDays),
                signingCredentials: credentials);

            return (
                new JwtSecurityTokenHandler().WriteToken(accessToken),
                new JwtSecurityTokenHandler().WriteToken(refreshToken));
        }

        public bool ValidateToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
                return false;

            var jwtConfig = _configuration.GetSection("Jwt");
            var secret = jwtConfig["Secret"];
            var issuer = jwtConfig["Issuer"];
            var audience = jwtConfig["Audience"];

            if (string.IsNullOrWhiteSpace(secret) || string.IsNullOrWhiteSpace(issuer) || string.IsNullOrWhiteSpace(audience))
                return false;

            var handler = new JwtSecurityTokenHandler();

            try
            {
                handler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
                    ClockSkew = TimeSpan.Zero
                }, out _);

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
