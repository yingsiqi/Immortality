using System.Threading.Tasks;
using UnityEngine;

namespace Immortality.Core.Managers
{
    /// <summary>
    /// UI 管理器 — 负责界面切换、弹窗管理、界面栈维护。
    /// 支持 UGUI 与 UI Toolkit 双轨制。
    /// </summary>
    public class UIManager : MonoBehaviour
    {
        [Header("根 Canvas")]
        [SerializeField] private Canvas _rootCanvas;

        [Header("界面预制体引用")]
        [SerializeField] private GameObject _loginViewPrefab;
        [SerializeField] private GameObject _mainViewPrefab;
        [SerializeField] private GameObject _cultivationViewPrefab;
        [SerializeField] private GameObject _combatViewPrefab;

        private GameObject _currentView;

        public Task Initialize()
        {
            Debug.Log("[UIManager] UI 系统初始化完成。");
            return Task.CompletedTask;
        }

        public void SwitchToLoginView()
        {
            SwitchView(_loginViewPrefab);
        }

        public void SwitchToMainView()
        {
            SwitchView(_mainViewPrefab);
        }

        public void SwitchToCultivationView()
        {
            SwitchView(_cultivationViewPrefab);
        }

        public void SwitchToCombatView()
        {
            SwitchView(_combatViewPrefab);
        }

        private void SwitchView(GameObject viewPrefab)
        {
            if (_currentView != null)
                Destroy(_currentView);

            if (viewPrefab != null)
                _currentView = Instantiate(viewPrefab, _rootCanvas.transform);
            else
                Debug.LogWarning($"[UIManager] 界面预制体未分配: {viewPrefab?.name}");
        }

        /// <summary>
        /// 显示弹窗（不替换当前界面）。
        /// </summary>
        public void ShowPopup(GameObject popupPrefab)
        {
            if (popupPrefab != null)
                Instantiate(popupPrefab, _rootCanvas.transform);
        }
    }
}
