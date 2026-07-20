using UnityEngine;

namespace Immortality.Core.Managers
{
    /// <summary>
    /// 游戏全局管理器 — 负责游戏生命周期、各子系统管理器协调。
    /// 采用 Singleton 模式，确保全局唯一实例。
    /// </summary>
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        [Header("子系统管理器")]
        [SerializeField] private AuthManager _authManager;
        [SerializeField] private UIManager _uiManager;
        [SerializeField] private NetworkManager _networkManager;
        [SerializeField] private PlayerDataManager _playerDataManager;
        [SerializeField] private CultivationManager _cultivationManager;

        public AuthManager Auth => _authManager;
        public UIManager UI => _uiManager;
        public NetworkManager Network => _networkManager;
        public PlayerDataManager PlayerData => _playerDataManager;
        public CultivationManager Cultivation => _cultivationManager;

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

        private void Start()
        {
            InitializeGame();
        }

        private async void InitializeGame()
        {
            Debug.Log("[GameManager] 开始初始化游戏系统...");

            await _networkManager.Initialize();
            await _uiManager.Initialize();

            // 尝试自动登录（若有缓存 Token）
            bool loggedIn = await _authManager.TryAutoLogin();

            if (loggedIn)
            {
                await _playerDataManager.LoadPlayerData();
                _cultivationManager.StartCultivationTimer();
                _uiManager.SwitchToMainView();
            }
            else
            {
                _uiManager.SwitchToLoginView();
            }

            Debug.Log("[GameManager] 游戏系统初始化完成。");
        }

        private void OnApplicationQuit()
        {
            _cultivationManager?.StopCultivationTimer();
            _networkManager?.Disconnect();
        }
    }
}
