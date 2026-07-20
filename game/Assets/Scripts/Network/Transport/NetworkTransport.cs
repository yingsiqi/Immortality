using System;
using System.Threading.Tasks;
using UnityEngine;

namespace Immortality.Network.Transport
{
    /// <summary>
    /// 实时网络通信层 — 基于 Unity Transport / Mirror Networking。
    /// 负责与服务端 RealtimeService 的 WebSocket 长连接。
    /// </summary>
    public class NetworkTransport
    {
        public bool IsConnected { get; private set; }

        private readonly string _serverUrl;

        public event Action<string, string> OnMessageReceived;
        public event Action OnConnected;
        public event Action OnDisconnected;

        public NetworkTransport(string serverUrl)
        {
            _serverUrl = serverUrl;
        }

        /// <summary>
        /// 连接实时通信服务器。
        /// TODO: 接入 Unity Transport 或 Mirror Networking 实现。
        /// </summary>
        public async Task Connect()
        {
            // TODO: 实现 WebSocket / Unity Transport 连接逻辑
            Debug.Log($"[NetworkTransport] 正在连接 {_serverUrl}...");
            await Task.Delay(100); // 模拟连接延迟
            IsConnected = true;
            OnConnected?.Invoke();
        }

        /// <summary>
        /// 发送消息到服务端。
        /// </summary>
        public void Send(string type, string payload)
        {
            if (!IsConnected)
            {
                Debug.LogWarning("[NetworkTransport] 未连接，无法发送消息。");
                return;
            }

            // TODO: 实现实际的消息发送逻辑
            // 消息格式: { "type": "...", "payload": "..." }
        }

        /// <summary>
        /// 断开连接。
        /// </summary>
        public void Disconnect()
        {
            if (!IsConnected)
                return;

            IsConnected = false;
            OnDisconnected?.Invoke();
            Debug.Log("[NetworkTransport] 连接已断开。");
        }

        /// <summary>
        /// 模拟收到服务端消息（供测试/调试使用）。
        /// </summary>
        public void SimulateMessageReceived(string type, string payload)
        {
            OnMessageReceived?.Invoke(type, payload);
        }
    }
}
