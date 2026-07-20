using System;
using System.Threading;
using Immortality.Data.Constants;
using UnityEngine;

namespace Immortality.Core.Managers
{
    /// <summary>
    /// 修炼管理器 — 核心系统，管理修炼计时、灵力积累、突破判定。
    /// 1现实秒 = 1游戏日，修炼进度随时间自动积累。
    /// </summary>
    public class CultivationManager : MonoBehaviour
    {
        [Header("修炼参数")]
        [SerializeField] private float _gameDaysPerRealSecond = 1f;

        private Timer _cultivationTimer;
        private float _accumulatedGameDays;
        private bool _isCultivating;

        public bool IsCultivating => _isCultivating;
        public float AccumulatedGameDays => _accumulatedGameDays;
        public event Action<float> OnCultivationProgress;

        /// <summary>
        /// 启动修炼计时器。
        /// </summary>
        public void StartCultivationTimer()
        {
            if (_isCultivating)
                return;

            _isCultivating = true;
            _cultivationTimer = new Timer(OnCultivationTick, null, 0, 1000);
            Debug.Log("[CultivationManager] 修炼计时器已启动 (1秒=1游戏日)。");
        }

        /// <summary>
        /// 停止修炼计时器。
        /// </summary>
        public void StopCultivationTimer()
        {
            if (!_isCultivating)
                return;

            _isCultivating = false;
            _cultivationTimer?.Dispose();
            _cultivationTimer = null;
            Debug.Log("[CultivationManager] 修炼计时器已停止。");
        }

        private void OnCultivationTick(object state)
        {
            _accumulatedGameDays += _gameDaysPerRealSecond;
            OnCultivationProgress?.Invoke(_accumulatedGameDays);
        }

        /// <summary>
        /// 尝试突破到下一个境界。
        /// 突破成功率 = 基础率 × 灵根系数 × 心境系数 × 准备度
        /// </summary>
        public bool AttemptBreakthrough()
        {
            // TODO: 调用服务端进行突破判定
            // 参考文档: 修炼系统设计 — 动态突破成功率公式
            Debug.Log("[CultivationManager] 尝试突破...");
            return false;
        }

        private void OnDestroy()
        {
            StopCultivationTimer();
        }
    }
}
