using UnityEngine;

namespace Immortality.Core.Utilities
{
    /// <summary>
    /// 通用游戏工具函数集合。
    /// </summary>
    public static class GameUtility
    {
        /// <summary>
        /// 将游戏日转换为现实秒（1现实秒 = 1游戏日）。
        /// </summary>
        public static float GameDaysToRealSeconds(float gameDays)
        {
            return gameDays;
        }

        /// <summary>
        /// 将现实秒转换为游戏日。
        /// </summary>
        public static float RealSecondsToGameDays(float realSeconds)
        {
            return realSeconds;
        }

        /// <summary>
        /// 计算境界编码（6位: 状态/境界/层次/子层）。
        /// 参考: 修炼系统设计 — 6位境界编码体系。
        /// </summary>
        public static string FormatRealmCode(int state, int realm, int layer, int sublayer)
        {
            return $"{state:D1}{realm:D1}{layer:D2}{sublayer:D2}";
        }

        /// <summary>
        /// 安全解析 JSON 字符串。
        /// </summary>
        public static T ParseJson<T>(string json) where T : class
        {
            if (string.IsNullOrEmpty(json))
                return null;

            try
            {
                return JsonUtility.FromJson<T>(json);
            }
            catch
            {
                Debug.LogError($"[GameUtility] JSON 解析失败: {typeof(T).Name}");
                return null;
            }
        }
    }
}
