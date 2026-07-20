using System;
using System.Threading.Tasks;
using Immortality.Core.Utilities;
using Immortality.Data.Models;
using UnityEngine;
using UnityEngine.Networking;

namespace Immortality.Network.Api
{
    /// <summary>
    /// HTTP API 客户端 — 封装与服务端 RESTful API 的所有通信。
    /// 单例模式，全局共享一个实例。
    /// </summary>
    public class ApiClient : MonoBehaviour
    {
        [Serializable]
        private class TokenPayload
        {
            public string accessToken;
            public string refreshToken;
            public int expiresIn;
        }

        [Serializable]
        private class LoginApiResponse
        {
            public bool success;
            public TokenPayload data;
            public string error;
            public string errorCode;
        }

        [Serializable]
        private class PlayerPayload
        {
            public string playerId;
            public string characterName;
            public int cultivationRealmIndex;
            public int cultivationLayer;
            public int cultivationSubLayer;
            public string spiritualRootType;
            public long spiritualPower;
            public long maxSpiritualPower;
            public int stamina;
            public int maxStamina;
            public int meritPoints;
        }

        [Serializable]
        private class PlayerApiResponse
        {
            public bool success;
            public PlayerPayload data;
            public string error;
            public string errorCode;
        }

        public static ApiClient Instance { get; private set; }

        [Header("API 配置")]
        [SerializeField] private string _baseUrl = "http://localhost:3001/api";

        private string _authToken;

        private void Awake()
        {
            if (Instance != null && Instance != this)
            {
                Destroy(gameObject);
                return;
            }
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }

        public void SetAuthToken(string token)
        {
            _authToken = token;
        }

        /// <summary>
        /// 用户登录。
        /// </summary>
        public async Task<(bool success, string accessToken, string refreshToken, string error)> Login(string username, string password)
        {
            var payload = $"{{\"username\":\"{username}\",\"password\":\"{password}\"}}";
            var (success, json, error) = await Post("/auth/login", payload);

            if (!success)
                return (false, null, null, error);

            var response = GameUtility.ParseJson<LoginApiResponse>(json);
            if (response == null)
                return (false, null, null, "登录响应解析失败");

            if (!response.success || response.data == null)
                return (false, null, null, response.error ?? "登录失败");

            return (true, response.data.accessToken, response.data.refreshToken, null);
        }

        /// <summary>
        /// 用户注册。
        /// </summary>
        public async Task<(bool success, string error)> Register(string username, string password)
        {
            var payload = $"{{\"username\":\"{username}\",\"password\":\"{password}\"}}";
            var (success, _, error) = await Post("/auth/register", payload);
            return (success, error);
        }

        /// <summary>
        /// 获取当前玩家数据。
        /// </summary>
        public async Task<PlayerData> GetPlayerData()
        {
            var (success, json, error) = await Get("/player/me");
            if (!success)
            {
                Debug.LogWarning($"[ApiClient] 获取玩家数据失败: {error}");
                return null;
            }

            var response = GameUtility.ParseJson<PlayerApiResponse>(json);
            if (response?.data == null)
                return null;

            return new PlayerData
            {
                PlayerId = response.data.playerId,
                CharacterName = response.data.characterName,
                CultivationRealmIndex = response.data.cultivationRealmIndex,
                CultivationLayer = response.data.cultivationLayer,
                CultivationSubLayer = response.data.cultivationSubLayer,
                SpiritualRootType = response.data.spiritualRootType,
                SpiritualPower = response.data.spiritualPower,
                MaxSpiritualPower = response.data.maxSpiritualPower,
                Stamina = response.data.stamina,
                MaxStamina = response.data.maxStamina,
                MeritPoints = response.data.meritPoints
            };
        }

        #region HTTP Methods

        public async Task<(bool success, string json, string error)> Get(string path)
        {
            return await SendRequest(UnityWebRequest.Method.Get, path, null);
        }

        public async Task<(bool success, string json, string error)> Post(string path, string body)
        {
            return await SendRequest(UnityWebRequest.Method.Post, path, body);
        }

        public async Task<(bool success, string json, string error)> Put(string path, string body)
        {
            return await SendRequest(UnityWebRequest.Method.Put, path, body);
        }

        public async Task<(bool success, string json, string error)> Delete(string path)
        {
            return await SendRequest(UnityWebRequest.Method.Delete, path, null);
        }

        private async Task<(bool success, string json, string error)> SendRequest(string method, string path, string body)
        {
            string url = $"{_baseUrl}{path}";
            using var request = new UnityWebRequest(url, method);

            request.downloadHandler = new DownloadHandlerBuffer();

            if (body != null)
                request.uploadHandler = new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(body));

            request.SetRequestHeader("Content-Type", "application/json");

            if (!string.IsNullOrEmpty(_authToken))
                request.SetRequestHeader("Authorization", $"Bearer {_authToken}");

            var operation = request.SendWebRequest();

            while (!operation.isDone)
                await Task.Yield();

            if (request.result == UnityWebRequest.Result.Success)
                return (true, request.downloadHandler.text, null);

            var errorMessage = !string.IsNullOrEmpty(request.downloadHandler?.text)
                ? request.downloadHandler.text
                : request.error;

            return (false, null, errorMessage);
        }

        #endregion
    }
}
