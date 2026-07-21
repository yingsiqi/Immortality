using System.Text;
using EventStore.Client;
using FluentValidation.AspNetCore;
using Hangfire;
using Hangfire.Redis.StackExchange;
using Immortality.EventSourcing.Stores;
using Immortality.GameService;
using Immortality.GameService.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    Log.Information("启动 Immortality GameService...");

    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog((context, services, configuration) => configuration
        .ReadFrom.Configuration(context.Configuration)
        .ReadFrom.Services(services)
        .WriteTo.Console());

    // 数据库 (读模型)
    builder.Services.AddDbContext<GameDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));

    // Redis 缓存
    builder.Services.AddStackExchangeRedisCache(options =>
        options.Configuration = builder.Configuration.GetConnectionString("Redis"));

    // 事件溯源
    var eventStoreUrl = builder.Configuration.GetConnectionString("EventStore") ?? "esdb://localhost:2113?tls=false";
    builder.Services.AddSingleton(new EventStoreClient(EventStoreClientSettings.Create(eventStoreUrl)));
    builder.Services.AddSingleton<IEventStoreService, EventStoreService>();

    // 游戏服务注册
    builder.Services.AddScoped<ICultivationService, CultivationService>();
    builder.Services.AddScoped<ICombatService, CombatService>();
    builder.Services.AddScoped<IPlayerService, PlayerService>();
    builder.Services.AddScoped<IEventReplayService, EventReplayService>();

    // Hangfire 后台任务
    builder.Services.AddHangfire(config => config
        .UseRedisStorage(builder.Configuration.GetConnectionString("Redis")));
    builder.Services.AddHangfireServer();

    // JWT 认证
    var jwtConfig = builder.Configuration.GetSection("Jwt");
    builder.Services.AddAuthentication("Bearer")
        .AddJwtBearer("Bearer", options =>
        {
            options.TokenValidationParameters = new()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtConfig["Issuer"],
                ValidAudience = jwtConfig["Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtConfig["Secret"]!)),
                ClockSkew = TimeSpan.Zero
            };
        });

    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddFluentValidationAutoValidation();

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();
    app.UseHangfireDashboard();

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "GameService 启动失败");
}
finally
{
    Log.CloseAndFlush();
}
