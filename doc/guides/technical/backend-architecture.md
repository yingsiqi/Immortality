# 后端架构设计

## 概述

Immortality修仙游戏后端采用现代微服务架构，基于ASP.NET Core框架构建类型安全的API服务，使用EventStoreDB实现事件溯源架构，结合PostgreSQL提供传统关系型数据存储，通过Mirror Networking / Unity Transport支持实时通信，确保系统的高性能、高可用性和可扩展性。

## 🏗️ **架构总览**

### 技术栈

```csharp
public static class BackendStack
{
    // 核心框架
    public const string Framework = "ASP.NET Core 8.0";
    public const string Language = "C# 12.0";
    public const string Runtime = ".NET 8";

    // 数据存储
    public const string EventStore = "EventStoreDB 23.0+";
    public const string Database = "PostgreSQL 15+ (Npgsql)";
    public const string Cache = "Redis 7.0+ (StackExchange.Redis)";
    public const string FileStorage = "MinIO (S3兼容, C# MinIO SDK)";

    // 实时通信
    public const string NetworkTransport = "Unity Transport / Mirror Networking";

    // 消息队列
    public const string MessageQueue = "Hangfire / Channel<T> / Redis Pub/Sub";

    // 认证授权
    public const string Auth = "ASP.NET Core JWT Authentication";

    // API文档
    public const string Documentation = "Swashbuckle (ASP.NET Core Swagger)";

    // 监控日志
    public const string Logging = "Serilog / Microsoft.Extensions.Logging";
    public const string Monitoring = "Prometheus + Grafana";

    // 容器化
    public const string Containerization = "Docker + Docker Compose";

    // 测试框架
    public const string Testing = "xUnit / NUnit / Unity Test Framework";

    // 代码质量
    public const string Analyzers = "Roslyn Analyzers / EditorConfig";
    public const string Validation = "FluentValidation / Data Annotations";
}
```

### 系统架构图

```mermaid
flowchart TB
    subgraph "客户端层"
        A[Tuanjie客户端]
        B[移动端客户端]
        C[管理后台]
    end
    
    subgraph "网关层"
        D[Nginx反向代理]
        E[负载均衡器]
    end
    
    subgraph "应用层"
        F[认证服务<br/>Auth Service]
        G[游戏核心服务<br/>Game Core Service]
        H[实时通信服务<br/>Mirror Networking Service]
        I[文件服务<br/>File Service]
        J[通知服务<br/>Notification Service]
    end
    
    subgraph "数据层"
        K[EventStoreDB<br/>事件存储]
        L[PostgreSQL<br/>关系数据库]
        M[Redis<br/>缓存/会话]
        N[MinIO<br/>对象存储]
    end
    
    subgraph "基础设施层"
        O[Docker容器]
        P[监控系统]
        Q[日志系统]
        R[备份系统]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    E --> G
    E --> H
    E --> I
    E --> J
    
    F --> L
    F --> M
    G --> K
    G --> L
    G --> M
    H --> M
    I --> N
    J --> M
    
    F --> O
    G --> O
    H --> O
    I --> O
    J --> O
    
    O --> P
    O --> Q
    O --> R
```

## 🎯 **微服务架构设计**

### 1. 认证服务 (Auth Service)

```csharp
// Program.cs (认证服务注册)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!))
        };
    });

builder.Services.AddAuthorization();

// Services/AuthService.cs
public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public async Task<User?> ValidateUserAsync(string username, string password)
    {
        var user = await _userRepository.GetByUsernameAsync(username);

        if (user != null && BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
        {
            return user;
        }
        return null;
    }

    public async Task<AuthResult> LoginAsync(User user)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.UniqueName, user.Username)
        };
        claims.AddRange(user.Roles.Select(r => new Claim(ClaimTypes.Role, r.Name)));

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var accessToken = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: credentials);

        var refreshToken = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: credentials);

        return new AuthResult
        {
            AccessToken = new JwtSecurityTokenHandler().WriteToken(accessToken),
            RefreshToken = new JwtSecurityTokenHandler().WriteToken(refreshToken),
            User = new UserInfo
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Roles = user.Roles
            }
        };
    }

    public async Task<User> RegisterAsync(CreateUserDto dto)
    {
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            PasswordHash = hashedPassword,
            IsActive = true
        };

        await _userRepository.AddAsync(user);
        return user;
    }

    public async Task<AuthResult> RefreshTokenAsync(string refreshToken)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]!);

            var principal = tokenHandler.ValidateToken(refreshToken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidateAudience = true,
                ValidAudience = _configuration["Jwt:Audience"],
                ValidateLifetime = true
            }, out var validatedToken);

            var userIdClaim = principal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("刷新令牌无效");
            }

            var user = await _userRepository.GetByIdAsync(Guid.Parse(userIdClaim));
            if (user == null)
            {
                throw new UnauthorizedAccessException("用户不存在");
            }

            return await LoginAsync(user);
        }
        catch
        {
            throw new UnauthorizedAccessException("刷新令牌无效");
        }
    }
}

// Controllers/AuthController.cs
[ApiController]
[Route("api/[controller]")]
[Tags("认证")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// 用户登录
    /// </summary>
    /// <response code="200">登录成功</response>
    /// <response code="401">认证失败</response>
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<AuthResult>> Login([FromBody] LoginDto loginDto)
    {
        var user = await _authService.ValidateUserAsync(
            loginDto.Username,
            loginDto.Password);

        if (user == null)
        {
            return Unauthorized(new { message = "用户名或密码错误" });
        }

        return await _authService.LoginAsync(user);
    }

    /// <summary>
    /// 用户注册
    /// </summary>
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register([FromBody] CreateUserDto createUserDto)
    {
        var user = await _authService.RegisterAsync(createUserDto);
        return CreatedAtAction(nameof(GetProfile), new { id = user.Id }, user);
    }

    /// <summary>
    /// 刷新令牌
    /// </summary>
    [HttpPost("refresh")]
    public async Task<ActionResult<AuthResult>> Refresh([FromBody] RefreshTokenDto refreshDto)
    {
        return await _authService.RefreshTokenAsync(refreshDto.RefreshToken);
    }

    /// <summary>
    /// 获取用户信息
    /// </summary>
    [HttpGet("profile")]
    [Authorize]
    public ActionResult<UserInfo> GetProfile()
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        return Ok(new { userId });
    }
}
```

### 2. 游戏核心服务 (Game Core Service)

```csharp
// Program.cs (游戏核心服务注册)
builder.Services.AddScoped<IPlayerRepository, PlayerRepository>();
builder.Services.AddScoped<ICultivationRepository, CultivationRepository>();
builder.Services.AddScoped<IPlayerService, PlayerService>();
builder.Services.AddScoped<ICultivationService, CultivationService>();
builder.Services.AddScoped<ICombatService, CombatService>();
builder.Services.AddScoped<IItemService, ItemService>();
builder.Services.AddScoped<IGameEventHandler, GameEventHandler>();
builder.Services.AddScoped<IGameEngine, GameEngine>();
builder.Services.AddScoped<IEventStoreService, EventStoreService>();

builder.Services.AddSingleton<IConnectionMultiplexer>(
    ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("Redis")!));

// Services/CultivationService.cs
public class CultivationService : ICultivationService
{
    private readonly IPlayerRepository _playerRepository;
    private readonly IEventStoreService _eventStore;
    private readonly IDatabase _redis;
    private readonly IGameEngine _gameEngine;

    public CultivationService(
        IPlayerRepository playerRepository,
        IEventStoreService eventStore,
        IConnectionMultiplexer redis,
        IGameEngine gameEngine)
    {
        _playerRepository = playerRepository;
        _eventStore = eventStore;
        _redis = redis.GetDatabase();
        _gameEngine = gameEngine;
    }

    public async Task<CultivationResult> StartCultivationAsync(Guid playerId, string techniqueId)
    {
        var player = await _playerRepository.GetWithRelationsAsync(playerId);

        if (player == null)
        {
            throw new NotFoundException("玩家不存在");
        }

        if (player.Character.Energy < 10)
        {
            throw new BadRequestException("灵力不足，无法开始修炼");
        }

        // 创建修炼事件
        var cultivationEvent = new CultivationStartedEvent
        {
            PlayerId = playerId,
            TechniqueId = techniqueId,
            StartTime = DateTime.UtcNow,
            EnergyCost = 10,
            ExpectedDuration = 3600000 // 1小时
        };

        // 保存事件到EventStore
        await _eventStore.AppendToStreamAsync(
            $"player-{playerId}",
            new[] { cultivationEvent });

        // 更新玩家状态
        player.Character.Energy -= 10;
        player.Character.Status = CharacterStatus.Cultivating;
        await _playerRepository.UpdateAsync(player);

        // 缓存修炼状态
        var cultivationState = new CultivationState
        {
            IsActive = true,
            StartTime = DateTime.UtcNow,
            TechniqueId = techniqueId,
            Progress = 0
        };
        await _redis.StringSetAsync(
            $"cultivation:{playerId}",
            JsonSerializer.Serialize(cultivationState),
            TimeSpan.FromHours(1));

        // 启动修炼进程
        _gameEngine.StartCultivationProcess(playerId, techniqueId);

        return new CultivationResult
        {
            Success = true,
            Message = "开始修炼",
            CultivationId = cultivationEvent.AggregateId
        };
    }

    public async Task<CultivationResult> StopCultivationAsync(Guid playerId)
    {
        var stateJson = await _redis.StringGetAsync($"cultivation:{playerId}");

        if (!stateJson.HasValue)
        {
            throw new BadRequestException("当前未在修炼中");
        }

        var cultivationState = JsonSerializer.Deserialize<CultivationState>(stateJson!);
        if (cultivationState == null || !cultivationState.IsActive)
        {
            throw new BadRequestException("当前未在修炼中");
        }

        var duration = (long)(DateTime.UtcNow - cultivationState.StartTime).TotalMilliseconds;
        var experienceGained = CalculateExperience(duration, cultivationState.TechniqueId);

        // 创建修炼结束事件
        var cultivationEndedEvent = new CultivationEndedEvent
        {
            PlayerId = playerId,
            EndTime = DateTime.UtcNow,
            Duration = duration,
            ExperienceGained = experienceGained,
            Reason = "manual_stop"
        };

        await _eventStore.AppendToStreamAsync(
            $"player-{playerId}",
            new[] { cultivationEndedEvent });

        // 更新玩家经验和等级
        var player = await _playerRepository.GetWithRelationsAsync(playerId);

        player.Character.Experience += experienceGained;
        player.Character.Status = CharacterStatus.Idle;

        // 检查是否升级
        var levelUpResult = CheckLevelUp(player.Character);
        if (levelUpResult.LeveledUp)
        {
            player.Character.Level = levelUpResult.NewLevel;
            player.Character.Realm = levelUpResult.NewRealm;

            // 创建升级事件
            var levelUpEvent = new LevelUpEvent
            {
                PlayerId = playerId,
                OldLevel = levelUpResult.OldLevel,
                NewLevel = levelUpResult.NewLevel,
                OldRealm = levelUpResult.OldRealm,
                NewRealm = levelUpResult.NewRealm
            };

            await _eventStore.AppendToStreamAsync(
                $"player-{playerId}",
                new[] { levelUpEvent });
        }

        await _playerRepository.UpdateAsync(player);

        // 清除缓存
        await _redis.KeyDeleteAsync($"cultivation:{playerId}");

        return new CultivationResult
        {
            Success = true,
            Message = "修炼结束",
            ExperienceGained = experienceGained,
            LevelUp = levelUpResult.LeveledUp ? new LevelUpInfo
            {
                NewLevel = levelUpResult.NewLevel,
                NewRealm = levelUpResult.NewRealm
            } : null
        };
    }

    private int CalculateExperience(long durationMs, string techniqueId)
    {
        // 基础经验计算：每分钟10点经验
        var baseExp = (int)(durationMs / 60000) * 10;
        var techniqueMultiplier = GetTechniqueMultiplier(techniqueId);
        return (int)(baseExp * techniqueMultiplier);
    }

    private LevelUpResult CheckLevelUp(Character character)
    {
        var currentLevel = character.Level;
        var currentRealm = character.Realm;
        var experience = character.Experience;

        var newLevel = CalculateLevel(experience);
        var newRealm = CalculateRealm(newLevel);

        return new LevelUpResult
        {
            LeveledUp = newLevel > currentLevel,
            OldLevel = currentLevel,
            NewLevel = newLevel,
            OldRealm = currentRealm,
            NewRealm = newRealm
        };
    }
}

// Services/GameEngine.cs
public class GameEngine : IGameEngine, IHostedService
{
    private readonly ICultivationService _cultivationService;
    private readonly IGameNetworkServer _networkServer;
    private readonly IDatabase _redis;
    private readonly ILogger<GameEngine> _logger;
    private readonly ConcurrentDictionary<Guid, Timer> _cultivationTimers = new();

    public GameEngine(
        ICultivationService cultivationService,
        IGameNetworkServer networkServer,
        IConnectionMultiplexer redis,
        ILogger<GameEngine> logger)
    {
        _cultivationService = cultivationService;
        _networkServer = networkServer;
        _redis = redis.GetDatabase();
        _logger = logger;
    }

    public void StartCultivationProcess(Guid playerId, string techniqueId)
    {
        // 清除已存在的进程
        StopCultivationProcess(playerId);

        // 每30秒更新一次修炼进度
        var timer = new Timer(async _ =>
        {
            try
            {
                await UpdateCultivationProgressAsync(playerId, techniqueId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "修炼进程错误 ({PlayerId})", playerId);
                StopCultivationProcess(playerId);
            }
        }, null, TimeSpan.Zero, TimeSpan.FromSeconds(30));

        _cultivationTimers[playerId] = timer;
    }

    public void StopCultivationProcess(Guid playerId)
    {
        if (_cultivationTimers.TryRemove(playerId, out var timer))
        {
            timer.Dispose();
        }
    }

    private async Task UpdateCultivationProgressAsync(Guid playerId, string techniqueId)
    {
        var stateJson = await _redis.StringGetAsync($"cultivation:{playerId}");

        if (!stateJson.HasValue)
        {
            StopCultivationProcess(playerId);
            return;
        }

        var cultivationState = JsonSerializer.Deserialize<CultivationState>(stateJson!);
        if (cultivationState == null || !cultivationState.IsActive)
        {
            StopCultivationProcess(playerId);
            return;
        }

        // 计算当前进度
        var elapsed = (long)(DateTime.UtcNow - cultivationState.StartTime).TotalMilliseconds;
        var progress = Math.Min(elapsed / 3600000.0, 1); // 1小时完成

        // 更新缓存
        cultivationState.Progress = progress;
        await _redis.StringSetAsync(
            $"cultivation:{playerId}",
            JsonSerializer.Serialize(cultivationState),
            TimeSpan.FromHours(1));

        // 发送进度更新到客户端
        _networkServer.SendToPlayer(playerId, "cultivation:progress", new
        {
            progress,
            elapsed,
            experienceGained = CalculatePartialExperience(elapsed, techniqueId)
        });

        // 检查是否完成
        if (progress >= 1)
        {
            await _cultivationService.StopCultivationAsync(playerId);
            StopCultivationProcess(playerId);

            _networkServer.SendToPlayer(playerId, "cultivation:completed", new
            {
                message = "修炼完成！"
            });
        }
    }

    private int CalculatePartialExperience(long elapsedMs, string techniqueId)
    {
        var baseExp = (int)(elapsedMs / 60000) * 10;
        var techniqueMultiplier = GetTechniqueMultiplier(techniqueId);
        return (int)(baseExp * techniqueMultiplier);
    }

    public Task StartAsync(CancellationToken cancellationToken) => Task.CompletedTask;

    public Task StopAsync(CancellationToken cancellationToken)
    {
        foreach (var timer in _cultivationTimers.Values)
        {
            timer.Dispose();
        }
        _cultivationTimers.Clear();
        return Task.CompletedTask;
    }
}
```

### 3. 实时通信服务 (Mirror Networking Service)

```csharp
// Services/GameNetworkServer.cs
// 基于 Mirror Networking / Unity Transport 的实时通信服务
public class GameNetworkServer : IGameNetworkServer
{
    private readonly ConcurrentDictionary<string, Guid> _connectionToPlayer = new();
    private readonly ConcurrentDictionary<Guid, string> _playerToConnection = new();
    private readonly IPlayerService _playerService;
    private readonly IDatabase _redis;
    private readonly ILogger<GameNetworkServer> _logger;
    private readonly JwtSecurityTokenHandler _tokenHandler;
    private readonly TokenValidationParameters _validationParameters;

    public GameNetworkServer(
        IPlayerService playerService,
        IConnectionMultiplexer redis,
        IConfiguration configuration,
        ILogger<GameNetworkServer> logger)
    {
        _playerService = playerService;
        _redis = redis.GetDatabase();
        _logger = logger;
        _tokenHandler = new JwtSecurityTokenHandler();
        _validationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]!)),
            ValidateIssuer = true,
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = configuration["Jwt:Audience"],
            ValidateLifetime = true
        };
    }

    public async Task OnPlayerConnectedAsync(string connectionId, string authToken)
    {
        try
        {
            var principal = _tokenHandler.ValidateToken(authToken, _validationParameters, out _);
            var playerIdClaim = principal.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

            if (playerIdClaim == null || !Guid.TryParse(playerIdClaim, out var playerId))
            {
                DisconnectConnection(connectionId);
                return;
            }

            // 验证玩家是否存在
            var player = await _playerService.GetByIdAsync(playerId);
            if (player == null)
            {
                DisconnectConnection(connectionId);
                return;
            }

            // 记录连接
            _connectionToPlayer[connectionId] = playerId;
            _playerToConnection[playerId] = connectionId;

            // 更新在线状态
            await _redis.StringSetAsync($"online:{playerId}", "true");

            // 发送连接成功消息
            SendToPlayer(playerId, "connected", new
            {
                message = "连接成功",
                playerId,
                timestamp = DateTime.UtcNow
            });

            // 发送当前游戏状态
            var gameState = await GetPlayerGameStateAsync(playerId);
            SendToPlayer(playerId, "game:state", gameState);

            _logger.LogInformation("玩家 {PlayerId} 已连接 ({ConnectionId})", playerId, connectionId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "连接认证失败");
            DisconnectConnection(connectionId);
        }
    }

    public async Task OnPlayerDisconnectedAsync(string connectionId)
    {
        if (_connectionToPlayer.TryRemove(connectionId, out var playerId))
        {
            _playerToConnection.TryRemove(playerId, out _);

            // 更新离线状态
            await _redis.KeyDeleteAsync($"online:{playerId}");

            _logger.LogInformation("玩家 {PlayerId} 已断开连接 ({ConnectionId})", playerId, connectionId);
        }
    }

    public async Task HandleMessageAsync(string connectionId, string messageType, JsonElement data)
    {
        if (!_connectionToPlayer.TryGetValue(connectionId, out var playerId))
            return;

        switch (messageType)
        {
            case "cultivation:start":
                await HandleCultivationStartAsync(playerId, data);
                break;
            case "cultivation:stop":
                await HandleCultivationStopAsync(playerId);
                break;
            case "combat:challenge":
                await HandleCombatChallengeAsync(playerId, data);
                break;
        }
    }

    private async Task HandleCultivationStartAsync(Guid playerId, JsonElement data)
    {
        var techniqueId = data.GetProperty("techniqueId").GetString()!;
        try
        {
            var result = await _cultivationService.StartCultivationAsync(playerId, techniqueId);
            SendToPlayer(playerId, "cultivation:started", result);
        }
        catch (Exception ex)
        {
            SendToPlayer(playerId, "error", new
            {
                message = ex.Message,
                code = "CULTIVATION_START_FAILED"
            });
        }
    }

    private async Task HandleCultivationStopAsync(Guid playerId)
    {
        try
        {
            var result = await _cultivationService.StopCultivationAsync(playerId);
            SendToPlayer(playerId, "cultivation:stopped", result);
        }
        catch (Exception ex)
        {
            SendToPlayer(playerId, "error", new
            {
                message = ex.Message,
                code = "CULTIVATION_STOP_FAILED"
            });
        }
    }

    private async Task HandleCombatChallengeAsync(Guid challengerId, JsonElement data)
    {
        var targetPlayerId = data.GetProperty("targetPlayerId").GetString()!;

        if (!_playerToConnection.TryGetValue(Guid.Parse(targetPlayerId), out var targetConnectionId))
        {
            SendToPlayer(challengerId, "error", new
            {
                message = "目标玩家不在线",
                code = "TARGET_OFFLINE"
            });
            return;
        }

        // 发送挑战请求给目标玩家
        var challengerName = await GetPlayerNameAsync(challengerId);
        SendToPlayer(Guid.Parse(targetPlayerId), "combat:challenge_received", new
        {
            challengerId,
            challengerName,
            timestamp = DateTime.UtcNow
        });

        SendToPlayer(challengerId, "combat:challenge_sent", new
        {
            targetPlayerId,
            message = "挑战请求已发送"
        });
    }

    // 向特定玩家发送消息
    public void SendToPlayer(Guid playerId, string eventType, object data)
    {
        if (_playerToConnection.TryGetValue(playerId, out var connectionId))
        {
            SendMessage(connectionId, eventType, data);
        }
    }

    // 向所有在线玩家广播消息
    public void Broadcast(string eventType, object data)
    {
        foreach (var connectionId in _connectionToPlayer.Keys)
        {
            SendMessage(connectionId, eventType, data);
        }
    }

    // 向特定房间发送消息
    public void SendToRoom(string room, string eventType, object data)
    {
        // 房间消息广播逻辑（基于 Mirror Networking 的 NetworkRoom）
        BroadcastToRoom(room, eventType, data);
    }

    private async Task<object> GetPlayerGameStateAsync(Guid playerId)
    {
        var player = await _playerService.GetByIdAsync(playerId);
        var stateJson = await _redis.StringGetAsync($"cultivation:{playerId}");

        return new
        {
            player = new
            {
                id = player.Id,
                name = player.Name,
                level = player.Character.Level,
                realm = player.Character.Realm,
                experience = player.Character.Experience,
                energy = player.Character.Energy,
                status = player.Character.Status
            },
            cultivation = stateJson.HasValue ? JsonSerializer.Deserialize<CultivationState>(stateJson!) : null,
            timestamp = DateTime.UtcNow
        };
    }

    private async Task<string> GetPlayerNameAsync(Guid playerId)
    {
        var player = await _playerService.GetByIdAsync(playerId);
        return player?.Name ?? "未知玩家";
    }

    private void SendMessage(string connectionId, string eventType, object data)
    {
        // 通过 Mirror Networking / Unity Transport 发送消息
    }

    private void DisconnectConnection(string connectionId)
    {
        // 断开连接
    }

    private void BroadcastToRoom(string room, string eventType, object data)
    {
        // 房间广播逻辑
    }
}
```

## 📊 **事件溯源架构**

### 事件定义

```csharp
// Events/DomainEvent.cs
public abstract class DomainEvent
{
    public string AggregateId { get; init; } = string.Empty;
    public Guid EventId { get; init; }
    public string EventType { get; init; } = string.Empty;
    public DateTime Timestamp { get; init; }
    public int Version { get; init; }

    protected DomainEvent(string aggregateId, int version = 1)
    {
        AggregateId = aggregateId;
        EventId = Guid.NewGuid();
        EventType = GetType().Name;
        Timestamp = DateTime.UtcNow;
        Version = version;
    }
}

// Events/CultivationEvents.cs
public class CultivationStartedEvent : DomainEvent
{
    public Guid PlayerId { get; init; }
    public string TechniqueId { get; init; } = string.Empty;
    public DateTime StartTime { get; init; }
    public int EnergyCost { get; init; }
    public long ExpectedDuration { get; init; }

    public CultivationStartedEvent() : base($"cultivation-{Guid.NewGuid()}-{DateTime.UtcNow.Ticks}")
    {
    }
}

public class CultivationProgressEvent : DomainEvent
{
    public Guid PlayerId { get; init; }
    public double Progress { get; init; }
    public int ExperienceGained { get; init; }
    public DateTime Timestamp { get; init; }

    public CultivationProgressEvent() : base($"cultivation-{Guid.NewGuid()}-{DateTime.UtcNow.Ticks}")
    {
    }
}

public class CultivationEndedEvent : DomainEvent
{
    public Guid PlayerId { get; init; }
    public DateTime EndTime { get; init; }
    public long Duration { get; init; }
    public int ExperienceGained { get; init; }
    public string Reason { get; init; } = string.Empty; // completed | manual_stop | interrupted

    public CultivationEndedEvent() : base($"cultivation-{Guid.NewGuid()}-{DateTime.UtcNow.Ticks}")
    {
    }
}

public class LevelUpEvent : DomainEvent
{
    public Guid PlayerId { get; init; }
    public int OldLevel { get; init; }
    public int NewLevel { get; init; }
    public string OldRealm { get; init; } = string.Empty;
    public string NewRealm { get; init; } = string.Empty;

    public LevelUpEvent() : base($"player-{Guid.NewGuid()}")
    {
    }
}
```

### EventStore服务

```csharp
// Services/EventStoreService.cs
public class EventStoreService : IEventStoreService
{
    private readonly EventStoreClient _client;
    private readonly ILogger<EventStoreService> _logger;

    public EventStoreService(IConfiguration configuration, ILogger<EventStoreService> logger)
    {
        var settings = EventStoreClientSettings.Create(
            configuration.GetConnectionString("EventStore")!);
        _client = new EventStoreClient(settings);
        _logger = logger;
    }

    public async Task AppendToStreamAsync(
        string streamName,
        IEnumerable<DomainEvent> events,
        StreamRevision? expectedRevision = null)
    {
        var eventData = events.Select(e => new EventData(
            Uuid.NewUuid(),
            e.EventType,
            JsonSerializer.SerializeToUtf8Bytes(e),
            "application/json",
            JsonSerializer.SerializeToUtf8Bytes(new
            {
                timestamp = e.Timestamp,
                version = e.Version
            })));

        try
        {
            if (expectedRevision.HasValue)
            {
                await _client.AppendToStreamAsync(
                    streamName,
                    expectedRevision.Value,
                    eventData);
            }
            else
            {
                await _client.AppendToStreamAsync(
                    streamName,
                    StreamState.StreamExists,
                    eventData);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to append events to stream {StreamName}", streamName);
            throw;
        }
    }

    public async Task<List<DomainEvent>> ReadStreamAsync(
        string streamName,
        StreamPosition? fromRevision = null,
        int maxCount = 1000)
    {
        try
        {
            var result = new List<DomainEvent>();

            var readResult = _client.ReadStreamAsync(
                Direction.Forwards,
                streamName,
                fromRevision ?? StreamPosition.Start,
                maxCount);

            await foreach (var resolvedEvent in readResult)
            {
                var eventData = JsonSerializer.Deserialize<DomainEvent>(
                    resolvedEvent.Event.Data.Span);
                if (eventData != null)
                {
                    result.Add(eventData);
                }
            }

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to read stream {StreamName}", streamName);
            throw;
        }
    }

    public async Task SubscribeToStreamAsync(
        string streamName,
        Func<DomainEvent, Task> handler)
    {
        try
        {
            await foreach (var resolvedEvent in _client.SubscribeToStreamAsync(
                streamName,
                StreamPosition.Start))
            {
                var eventData = JsonSerializer.Deserialize<DomainEvent>(
                    resolvedEvent.Event.Data.Span);
                if (eventData != null)
                {
                    await handler(eventData);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to subscribe to stream {StreamName}", streamName);
            throw;
        }
    }

    public async Task CreateProjectionAsync(
        string projectionName,
        string query)
    {
        try
        {
            // EventStoreDB 投影通过 HTTP API 创建
            // 投影查询语言为 JavaScript（EventStoreDB 原生支持）
            var httpClient = new HttpClient();
            var content = new StringContent(query);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/javascript");

            await httpClient.PostAsync(
                $"http://localhost:2113/projections/continuous?name={projectionName}&emit=1&trackemittedstreams=1",
                content);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create projection {ProjectionName}", projectionName);
            throw;
        }
    }
}
```

### 事件处理器

```csharp
// Handlers/GameEventHandler.cs
public class GameEventHandler : IGameEventHandler
{
    private readonly IPlayerRepository _playerRepository;
    private readonly IGameNetworkServer _networkServer;
    private readonly INotificationService _notificationService;

    public GameEventHandler(
        IPlayerRepository playerRepository,
        IGameNetworkServer networkServer,
        INotificationService notificationService)
    {
        _playerRepository = playerRepository;
        _networkServer = networkServer;
        _notificationService = notificationService;
    }

    public async Task HandleLevelUpAsync(LevelUpEvent @event)
    {
        // 更新玩家统计
        await UpdatePlayerStatsAsync(@event.PlayerId, new PlayerStatsUpdate
        {
            Level = @event.NewLevel,
            Realm = @event.NewRealm
        });

        // 发送实时通知
        _networkServer.SendToPlayer(@event.PlayerId, "level:up", new
        {
            oldLevel = @event.OldLevel,
            newLevel = @event.NewLevel,
            oldRealm = @event.OldRealm,
            newRealm = @event.NewRealm,
            message = $"恭喜突破到{@event.NewRealm}境界！"
        });

        // 发送系统通知
        await _notificationService.SendNotificationAsync(@event.PlayerId, new NotificationDto
        {
            Type = "level_up",
            Title = "境界突破",
            Message = $"恭喜您突破到{@event.NewRealm}境界，等级提升至{@event.NewLevel}级！",
            Data = new
            {
                oldLevel = @event.OldLevel,
                newLevel = @event.NewLevel,
                oldRealm = @event.OldRealm,
                newRealm = @event.NewRealm
            }
        });

        // 记录成就
        await CheckAndUnlockAchievementsAsync(@event.PlayerId, @event.NewLevel, @event.NewRealm);
    }

    public async Task HandleCultivationEndedAsync(CultivationEndedEvent @event)
    {
        // 更新修炼统计
        await UpdateCultivationStatsAsync(@event.PlayerId, new CultivationStatsUpdate
        {
            TotalCultivationTime = @event.Duration,
            ExperienceGained = @event.ExperienceGained
        });

        // 发送修炼结果通知
        _networkServer.SendToPlayer(@event.PlayerId, "cultivation:result", new
        {
            duration = @event.Duration,
            experienceGained = @event.ExperienceGained,
            reason = @event.Reason,
            message = GetCultivationEndMessage(@event.Reason, @event.ExperienceGained)
        });
    }

    private async Task UpdatePlayerStatsAsync(Guid playerId, PlayerStatsUpdate stats)
    {
        await _playerRepository.UpdateStatsAsync(playerId, stats);
    }

    private async Task UpdateCultivationStatsAsync(Guid playerId, CultivationStatsUpdate stats)
    {
        // 更新修炼统计数据
        // 实现具体的统计更新逻辑
    }

    private static string GetCultivationEndMessage(string reason, int experience)
    {
        return reason switch
        {
            "completed" => $"修炼完成，获得{experience}点修为！",
            "manual_stop" => $"手动停止修炼，获得{experience}点修为。",
            "interrupted" => $"修炼被中断，获得{experience}点修为。",
            _ => $"修炼结束，获得{experience}点修为。"
        };
    }

    private async Task CheckAndUnlockAchievementsAsync(Guid playerId, int level, string realm)
    {
        // 检查并解锁成就
        // 实现成就系统逻辑
    }
}
```

## 🗄️ **数据库设计**

### Entity Framework Core 实体定义

```csharp
// Entities/User.cs
[Table("users")]
public class User
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("username")]
    [MaxLength(50)]
    public string Username { get; set; } = string.Empty;

    [Column("email")]
    [MaxLength(255)]
    public string Email { get; set; } = string.Empty;

    [Column("password_hash")]
    public string PasswordHash { get; set; } = string.Empty;

    [Column("is_active")]
    public bool IsActive { get; set; } = true;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // 多对多关系：用户与角色
    public List<Role> Roles { get; set; } = new();

    // 一对一关系：用户与玩家
    public Player? Player { get; set; }
}

// Entities/Player.cs
[Table("players")]
public class Player
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("name")]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;

    [Column("level")]
    public int Level { get; set; } = 1;

    [Column("realm")]
    public string Realm { get; set; } = "练气期";

    [Column("experience")]
    public long Experience { get; set; } = 0;

    [Column("energy")]
    public int Energy { get; set; } = 100;

    [Column("max_energy")]
    public int MaxEnergy { get; set; } = 100;

    [Column("status")]
    public CharacterStatus Status { get; set; } = CharacterStatus.Idle;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Column("updated_at")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // 一对一关系：玩家与用户
    public User User { get; set; } = null!;

    [Column("user_id")]
    public Guid UserId { get; set; }

    // 一对多关系：玩家与物品
    public List<Item> Inventory { get; set; } = new();

    // 一对多关系：玩家与修炼记录
    public List<CultivationRecord> CultivationRecords { get; set; } = new();

    // 关联角色数据
    public Character Character { get; set; } = new();
}

// Entities/CultivationRecord.cs
[Table("cultivation_records")]
public class CultivationRecord
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("technique_id")]
    public string TechniqueId { get; set; } = string.Empty;

    [Column("start_time")]
    public DateTime StartTime { get; set; }

    [Column("end_time")]
    public DateTime? EndTime { get; set; }

    [Column("duration")]
    public int Duration { get; set; } = 0;

    [Column("experience_gained")]
    public int ExperienceGained { get; set; } = 0;

    [Column("end_reason")]
    [MaxLength(50)]
    public string? EndReason { get; set; } // completed | manual_stop | interrupted

    // 多对一关系：修炼记录与玩家
    public Player Player { get; set; } = null!;

    [Column("player_id")]
    public Guid PlayerId { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
```

## 🔧 **配置管理**

### 环境配置

```json
// appsettings.json
{
  "Urls": "http://0.0.0.0:3001",

  "ConnectionStrings": {
    "Default": "Host=localhost;Port=5432;Username=postgres;Password=password;Database=immortality",
    "Redis": "localhost:6379",
    "EventStore": "esdb://admin:changeit@localhost:2113?tls=false"
  },

  "Jwt": {
    "Secret": "your-secret-key",
    "Issuer": "immortality",
    "Audience": "immortality-client",
    "ExpiresIn": "24h"
  },

  "MinIO": {
    "Endpoint": "localhost",
    "Port": 9000,
    "UseSSL": false,
    "AccessKey": "minioadmin",
    "SecretKey": "minioadmin"
  },

  "GameServer": {
    "MaxConnections": 1000,
    "TickRate": 30
  },

  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "Microsoft.Hosting.Lifetime": "Information"
      }
    }
  }
}
```

### Docker配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  # 后端应用
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - DOTNET_ENVIRONMENT=Development
      - ConnectionStrings__Default=Host=postgres;Port=5432;Username=postgres;Password=password;Database=immortality
      - ConnectionStrings__Redis=redis:6379
      - ConnectionStrings__EventStore=esdb://admin:changeit@eventstore:2113?tls=false
      - MinIO__Endpoint=minio
      - MinIO__Port=9000
      - Jwt__Secret=your-super-secret-jwt-key
    depends_on:
      - postgres
      - redis
      - eventstore
      - minio
  
  # PostgreSQL数据库
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=immortality
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  # Redis缓存
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
  
  # EventStoreDB
  eventstore:
    image: eventstore/eventstore:23.6.0-buster-slim
    environment:
      - EVENTSTORE_CLUSTER_SIZE=1
      - EVENTSTORE_RUN_PROJECTIONS=All
      - EVENTSTORE_START_STANDARD_PROJECTIONS=true
      - EVENTSTORE_EXT_TCP_PORT=1113
      - EVENTSTORE_HTTP_PORT=2113
      - EVENTSTORE_INSECURE=true
      - EVENTSTORE_ENABLE_EXTERNAL_TCP=true
      - EVENTSTORE_ENABLE_ATOM_PUB_OVER_HTTP=true
    ports:
      - "1113:1113"
      - "2113:2113"
    volumes:
      - eventstore_data:/var/lib/eventstore
  
  # MinIO对象存储
  minio:
    image: minio/minio:latest
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data
    command: server /data --console-address ":9001"

volumes:
  postgres_data:
  redis_data:
  eventstore_data:
  minio_data:
```

## 📊 **监控和日志**

### 日志配置

```csharp
// Program.cs (Serilog配置)
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console(outputTemplate:
        "{Timestamp:yyyy-MM-dd HH:mm:ss} [{SourceContext}] [{Level:u3}] {Message:lj}{NewLine}{Exception}")
    .WriteTo.File("logs/error.log",
        restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Error,
        rollingInterval: RollingInterval.Day,
        outputTemplate:
        "{Timestamp:yyyy-MM-dd HH:mm:ss} [{SourceContext}] [{Level:u3}] {Message:lj}{NewLine}{Exception}")
    .WriteTo.File("logs/combined.log",
        rollingInterval: RollingInterval.Day,
        outputTemplate:
        "{Timestamp:yyyy-MM-dd HH:mm:ss} [{SourceContext}] [{Level:u3}] {Message:lj}{NewLine}{Exception}")
    .CreateLogger();

builder.Host.UseSerilog();
```

### 健康检查

```csharp
// Controllers/HealthController.cs
[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    private readonly AppDbContext _dbContext;
    private readonly IConnectionMultiplexer _redis;
    private readonly EventStoreClient _eventStoreClient;
    private readonly ILogger<HealthController> _logger;

    public HealthController(
        AppDbContext dbContext,
        IConnectionMultiplexer redis,
        EventStoreClient eventStoreClient,
        ILogger<HealthController> logger)
    {
        _dbContext = dbContext;
        _redis = redis;
        _eventStoreClient = eventStoreClient;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<object>> Check()
    {
        var results = new Dictionary<string, string>();

        // 数据库检查
        try
        {
            await _dbContext.Database.CanConnectAsync();
            results["database"] = "up";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "数据库健康检查失败");
            results["database"] = "down";
        }

        // Redis检查
        try
        {
            await _redis.GetDatabase().PingAsync();
            results["redis"] = "up";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Redis健康检查失败");
            results["redis"] = "down";
        }

        // EventStore检查
        results["eventstore"] = "up"; // 简化示例

        // MinIO检查
        results["minio"] = "up"; // 简化示例

        return Ok(results);
    }
}
```

## 🧪 **测试策略**

### 单元测试

```csharp
// Tests/CultivationServiceTests.cs
public class CultivationServiceTests
{
    private readonly Mock<IPlayerRepository> _playerRepositoryMock = new();
    private readonly Mock<IEventStoreService> _eventStoreMock = new();
    private readonly Mock<IConnectionMultiplexer> _redisMock = new();
    private readonly Mock<IDatabase> _redisDbMock = new();
    private readonly Mock<IGameEngine> _gameEngineMock = new();
    private readonly CultivationService _service;

    public CultivationServiceTests()
    {
        _redisMock.Setup(x => x.GetDatabase(It.IsAny<int>(), It.IsAny<object>()))
            .Returns(_redisDbMock.Object);

        _service = new CultivationService(
            _playerRepositoryMock.Object,
            _eventStoreMock.Object,
            _redisMock.Object,
            _gameEngineMock.Object);
    }

    [Fact]
    public async Task StartCultivation_ShouldStartSuccessfully()
    {
        // Arrange
        var playerId = Guid.NewGuid();
        var mockPlayer = new Player
        {
            Id = playerId,
            Character = new Character
            {
                Energy = 50,
                Status = CharacterStatus.Idle
            }
        };

        _playerRepositoryMock
            .Setup(x => x.GetWithRelationsAsync(playerId))
            .ReturnsAsync(mockPlayer);

        _eventStoreMock
            .Setup(x => x.AppendToStreamAsync(
                It.IsAny<string>(),
                It.IsAny<IEnumerable<DomainEvent>>(),
                It.IsAny<StreamRevision?>()))
            .Returns(Task.CompletedTask);

        // Act
        var result = await _service.StartCultivationAsync(playerId, "technique-1");

        // Assert
        Assert.True(result.Success);
        _eventStoreMock.Verify(
            x => x.AppendToStreamAsync(
                It.IsAny<string>(),
                It.IsAny<IEnumerable<DomainEvent>>(),
                It.IsAny<StreamRevision?>()),
            Times.Once);
    }

    [Fact]
    public async Task StartCultivation_ShouldThrowWhenInsufficientEnergy()
    {
        // Arrange
        var playerId = Guid.NewGuid();
        var mockPlayer = new Player
        {
            Id = playerId,
            Character = new Character
            {
                Energy = 5,
                Status = CharacterStatus.Idle
            }
        };

        _playerRepositoryMock
            .Setup(x => x.GetWithRelationsAsync(playerId))
            .ReturnsAsync(mockPlayer);

        // Act & Assert
        var ex = await Assert.ThrowsAsync<BadRequestException>(
            () => _service.StartCultivationAsync(playerId, "technique-1"));
        Assert.Equal("灵力不足，无法开始修炼", ex.Message);
    }
}
```

### 集成测试

```csharp
// Tests/AppIntegrationTests.cs
public class AppIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public AppIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task CultivationStart_ShouldReturnSuccess()
    {
        // Arrange - 获取认证令牌
        var loginContent = new StringContent(
            JsonSerializer.Serialize(new { username = "testuser", password = "testpass" }),
            Encoding.UTF8,
            "application/json");

        var loginResponse = await _client.PostAsync("/api/auth/login", loginContent);
        loginResponse.EnsureSuccessStatusCode();

        var loginResult = JsonSerializer.Deserialize<AuthResult>(
            await loginResponse.Content.ReadAsStringAsync())!;
        var authToken = loginResult.AccessToken;

        // Act - 发起修炼请求
        _client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", authToken);

        var cultivationContent = new StringContent(
            JsonSerializer.Serialize(new { techniqueId = "basic-cultivation" }),
            Encoding.UTF8,
            "application/json");

        var response = await _client.PostAsync("/api/cultivation/start", cultivationContent);

        // Assert
        response.EnsureSuccessStatusCode();
        var result = JsonSerializer.Deserialize<CultivationResult>(
            await response.Content.ReadAsStringAsync())!;
        Assert.True(result.Success);
    }
}
```

## 🚀 **部署策略**

### 生产环境配置

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
WORKDIR /src

# 复制项目文件并还原依赖
COPY *.csproj ./
RUN dotnet restore

# 复制源代码并发布
COPY . .
RUN dotnet publish -c Release -o /app/publish

# 运行时镜像
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=builder /app/publish .

EXPOSE 3001

ENTRYPOINT ["dotnet", "Immortality.Server.dll"]
```

### Kubernetes部署

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: immortality-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: immortality-backend
  template:
    metadata:
      labels:
        app: immortality-backend
    spec:
      containers:
      - name: backend
        image: immortality/backend:latest
        ports:
        - containerPort: 3001
        env:
        - name: DOTNET_ENVIRONMENT
          value: "Production"
        - name: ConnectionStrings__Default
          value: "Host=postgres-service;Port=5432;Username=postgres;Password=password;Database=immortality"
        - name: ConnectionStrings__Redis
          value: "redis-service:6379"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3001
          initialDelaySeconds: 5
          periodSeconds: 5
```

## 📋 **开发规范**

### 1. 代码规范
- 启用C# nullable reference types
- 遵循ASP.NET Core最佳实践
- 使用async/await异步编程模式
- 单元测试覆盖率>80%

### 2. API设计规范
- RESTful API设计
- 统一错误处理中间件
- 请求验证（FluentValidation / Data Annotations）
- API版本控制

### 3. 数据库规范
- 事件溯源优先
- 读写分离
- 数据一致性保证
- 性能优化

### 4. 安全规范
- ASP.NET Core JWT认证
- 角色权限控制
- 输入验证
- SQL注入防护（EF Core参数化查询）

通过这套后端架构设计，我们能够构建一个高性能、高可用、可扩展的修仙游戏后端系统，支持实时交互和复杂的游戏逻辑处理。
