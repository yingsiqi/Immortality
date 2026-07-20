using System;
using System.Collections.Generic;

namespace Immortality.Core.Utilities
{
    /// <summary>
    /// 简易事件总线 — 基于字符串键的发布/订阅模式。
    /// 用于跨模块解耦通信（如玩家数据更新通知 UI 刷新）。
    /// </summary>
    public static class EventHub
    {
        private static readonly Dictionary<string, List<Action<object>>> _subscribers = new();

        public static void On(string key, Action<object> callback)
        {
            if (!_subscribers.ContainsKey(key))
                _subscribers[key] = new List<Action<object>>();

            _subscribers[key].Add(callback);
        }

        public static void Off(string key, Action<object> callback)
        {
            if (_subscribers.TryGetValue(key, out var list))
                list.Remove(callback);
        }

        public static void Emit(string key, object data = null)
        {
            if (_subscribers.TryGetValue(key, out var list))
            {
                foreach (var callback in list.ToArray())
                    callback?.Invoke(data);
            }
        }

        public static void Clear(string key)
        {
            if (_subscribers.ContainsKey(key))
                _subscribers[key].Clear();
        }

        public static void ClearAll()
        {
            _subscribers.Clear();
        }
    }

    /// <summary>
    /// 事件键常量。
    /// </summary>
    public static class EventKeys
    {
        public const string PlayerDataUpdated = "player_data_updated";
        public const string CultivationProgress = "cultivation_progress";
        public const string CultivationBreakthrough = "cultivation_breakthrough";
        public const string CombatStart = "combat_start";
        public const string CombatEnd = "combat_end";
        public const string NetworkConnected = "network_connected";
        public const string NetworkDisconnected = "network_disconnected";
    }
}
