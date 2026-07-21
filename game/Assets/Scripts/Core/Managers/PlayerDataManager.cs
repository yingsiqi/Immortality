using System.Threading.Tasks;
using Immortality.Core.Utilities;
using Immortality.Data.Models;
using Immortality.Network.Api;
using UnityEngine;

namespace Immortality.Core.Managers
{
    /// <summary>
    /// 玩家数据管理器 — 负责加载、缓存、同步玩家数据。
    /// 数据来源：服务端 API + 本地缓存。
    /// </summary>
    public class PlayerDataManager : MonoBehaviour
    {
        private ApiClient _apiClient;

        public PlayerData CurrentPlayer { get; private set; }

        private void Awake()
        {
            _apiClient = ApiClient.Instance;
        }

        /// <summary>
        /// 从服务端加载当前玩家数据。
        /// </summary>
        public async Task LoadPlayerData()
        {
            CurrentPlayer = await _apiClient.GetPlayerData();

            if (CurrentPlayer != null)
                Debug.Log($"[PlayerDataManager] 玩家数据加载完成: {CurrentPlayer.CharacterName} (境界: {CurrentPlayer.CultivationRealm})");
            else
                Debug.LogWarning("[PlayerDataManager] 玩家数据加载失败。");
        }

        /// <summary>
        /// 更新本地缓存并通知 UI 刷新。
        /// </summary>
        public void UpdatePlayerData(PlayerData newData)
        {
            CurrentPlayer = newData;
            EventHub.Emit(EventKeys.PlayerDataUpdated, CurrentPlayer);
        }
    }
}
