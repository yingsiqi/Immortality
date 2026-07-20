using System.ComponentModel.DataAnnotations;

namespace Immortality.AuthService.Entities
{
    /// <summary>
    /// 用户实体 — 对应 users 表。
    /// </summary>
    public class User
    {
        public Guid Id { get; set; }
        
        [MaxLength(50)]
        public string Username { get; set; } = string.Empty;
        
        [MaxLength(255)]
        public string PasswordHash { get; set; } = string.Empty;
        
        [MaxLength(100)]
        public string? Email { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastLoginAt { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
