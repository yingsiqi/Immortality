using System.Threading.Tasks;

namespace Immortality.Core.Systems
{
    /// <summary>
    /// 游戏系统基类 — 所有功能系统（战斗、修炼、装备等）的抽象基础。
    /// 提供统一的初始化、更新、销毁生命周期。
    /// </summary>
    public abstract class GameSystem
    {
        public abstract string SystemName { get; }

        public bool IsInitialized { get; protected set; }

        /// <summary>
        /// 系统初始化。
        /// </summary>
        public virtual async Task Initialize()
        {
            IsInitialized = true;
        }

        /// <summary>
        /// 每帧更新逻辑（由 GameManager 驱动）。
        /// </summary>
        public virtual void Update(float deltaTime) { }

        /// <summary>
        /// 系统销毁清理。
        /// </summary>
        public virtual void Shutdown()
        {
            IsInitialized = false;
        }
    }
}
