using System.Text.Json.Serialization;

namespace Immortality.Shared.DTOs
{
    /// <summary>
    /// 统一 API 响应封装。
    /// </summary>
    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public T? Data { get; set; }
        public string? Error { get; set; }
        public string? ErrorCode { get; set; }

        public static ApiResponse<T> Ok(T data) => new() { Success = true, Data = data };
        public static ApiResponse<T> Fail(string error, string? code = null) => new() { Success = false, Error = error, ErrorCode = code };
    }

    /// <summary>
    /// 分页响应。
    /// </summary>
    public class PagedResult<T>
    {
        public List<T> Items { get; set; } = new();
        public int Total { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }

    // ── Auth DTOs ──

    public record LoginRequest(string Username, string Password);
    public record RegisterRequest(string Username, string Password);
    public record TokenResponse(string AccessToken, string RefreshToken, int ExpiresIn);

    // ── Player DTOs ──

    public record PlayerDto(
        string PlayerId,
        string CharacterName,
        int CultivationRealmIndex,
        int CultivationLayer,
        int CultivationSubLayer,
        string SpiritualRootType,
        long SpiritualPower,
        long MaxSpiritualPower,
        int Stamina,
        int MaxStamina,
        int MeritPoints
    );

    public record CreatePlayerRequest(string CharacterName, string SpiritualRootType);

    // ── Cultivation DTOs ──

    public record CultivationProgressDto(
        string PlayerId,
        long AccumulatedGameDays,
        int CurrentRealmIndex,
        int CurrentLayer,
        bool CanBreakthrough,
        double BreakthroughChance
    );

    public record BreakthroughRequest(string PlayerId);
    public record BreakthroughResultDto(bool Success, int NewRealmIndex, string? FailureReason);
}
