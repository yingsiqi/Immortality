using System.Threading.Tasks;
using Immortality.Network.Transport;
using UnityEngine;

namespace Immortality.Core.Managers
{
    /// <summary>
    /// 网络管理器 — 管理 HTTP API 连接与实时通信连接的生命周期。
    /// </summary>
    public class NetworkManager : MonoBehaviour
    {
        [Header("服务器配置")]
        [SerializeField] private string _apiBaseUrl = "http://localhost:3001";
        [SerializeField] private string _realtimeUrl = "ws://localhost:3001/realtime";

        public string ApiBaseUrl => _apiBaseUrl;
        public bool IsConnected => _transport?.IsConnected ?? false;

        private NetworkTransport _transport;

        public Task Initialize()
        {
            _transport = new NetworkTransport(_realtimeUrl);
            Debug.Log($"[NetworkManager] 初始化完成，API: {_apiBaseUrl}");
            return Task.CompletedTask;
        }

        /// <summary>
        /// 连接实时通信服务器。
        /// </summary>
        public async Task ConnectRealtime()
        {
            if (_transport == null)
                _transport = new NetworkTransport(_realtimeUrl);

            await _transport.Connect();
            Debug.Log("[NetworkManager] 实时通信已连接。");
        }

        /// <summary>
        /// 断开所有网络连接。
        /// </summary>
        public void Disconnect()
        {
            _transport?.Disconnect();
            Debug.Log("[NetworkManager] 网络已断开。");
        }

        /// <summary>
        /// 发送实时消息。
        /// </summary>
        public void SendRealtimeMessage(string type, string payload)
        {
            _transport?.Send(type, payload);
        }
    }
}
