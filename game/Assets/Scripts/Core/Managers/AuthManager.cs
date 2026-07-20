using System.Threading.Tasks;
using Immortality.Network.Api;
using UnityEngine;

namespace Immortality.Core.Managers
{
    /// <summary>
    /// 认证管理器 — 负责用户注册、登录、Token 管理与自动登录。
    /// </summary>
    public class AuthManager : MonoBehaviour
    {
        private ApiClient _apiClient;

        public string AccessToken { get; private set; }
        public string RefreshToken { get; private set; }
        public bool IsAuthenticated => !string.IsNullOrEmpty(AccessToken);

        private const string AccessTokenKey = "access_token";
        private const string RefreshTokenKey = "refresh_token";

        private void Awake()
        {
            _apiClient = ApiClient.Instance;
        }

        /// <summary>
        /// 尝试使用缓存的 Token 自动登录。
        /// </summary>
        public async Task<bool> TryAutoLogin()
        {
            AccessToken = PlayerPrefs.GetString(AccessTokenKey, null);
            RefreshToken = PlayerPrefs.GetString(RefreshTokenKey, null);

            if (string.IsNullOrEmpty(AccessToken))
                return false;

            _apiClient.SetAuthToken(AccessToken);
            return await Task.FromResult(true);
        }

        /// <summary>
        /// 用户名密码登录。
        /// </summary>
        public async Task<bool> Login(string username, string password)
        {
            var (success, access, refresh, error) = await _apiClient.Login(username, password);

            if (success)
            {
                AccessToken = access;
                RefreshToken = refresh;
                _apiClient.SetAuthToken(AccessToken);
                PlayerPrefs.SetString(AccessTokenKey, AccessToken);
                PlayerPrefs.SetString(RefreshTokenKey, RefreshToken);
                return true;
            }

            Debug.LogWarning($"[AuthManager] 登录失败: {error}");
            return false;
        }

        /// <summary>
        /// 注册新账号。
        /// </summary>
        public async Task<bool> Register(string username, string password)
        {
            var (success, error) = await _apiClient.Register(username, password);
            if (!success)
                Debug.LogWarning($"[AuthManager] 注册失败: {error}");
            return success;
        }

        /// <summary>
        /// 登出，清除本地 Token。
        /// </summary>
        public void Logout()
        {
            AccessToken = null;
            RefreshToken = null;
            _apiClient.SetAuthToken(null);
            PlayerPrefs.DeleteKey(AccessTokenKey);
            PlayerPrefs.DeleteKey(RefreshTokenKey);
        }
    }
}
