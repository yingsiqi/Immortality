namespace Immortality.Shared.Constants
{
    /// <summary>
    /// 游戏全局常量 — 时间换算、境界参数等。
    /// 参考文档: 修炼系统设计、世界系统设计。
    /// </summary>
    public static class GameConstants
    {
        /// <summary>
        /// 时间换算：1现实秒 = 1游戏日。
        /// </summary>
        public const double GameDaysPerRealSecond = 1.0;

        /// <summary>
        /// 每个境界的层数。
        /// </summary>
        public const int LayersPerRealm = 9;

        /// <summary>
        /// 每层的子层数。
        /// </summary>
        public const int SubLayersPerLayer = 9;

        /// <summary>
        /// 境界名称数组（索引对应 CultivationRealm 枚举）。
        /// </summary>
        public static readonly string[] RealmNames = new[]
        {
            "凡人", "炼气", "筑基", "金丹", "元婴",
            "化神", "炼虚", "合体", "大乘", "真仙",
            "金仙", "太乙", "大罗", "道祖", "超脱"
        };

        /// <summary>
        /// 各境界基础寿命（游戏年）。
        /// </summary>
        public static readonly long[] RealmLifespans = new long[]
        {
            80,        // 凡人
            200,       // 炼气
            500,       // 筑基
            1000,      // 金丹
            2000,      // 元婴
            5000,      // 化神
            10000,     // 炼虚
            20000,     // 合体
            50000,     // 大乘
            100000,    // 真仙
            long.MaxValue, // 金仙及以上寿命无限
            long.MaxValue,
            long.MaxValue,
            long.MaxValue,
            long.MaxValue
        };

        /// <summary>
        /// 各境界基础突破成功率。
        /// </summary>
        public static readonly double[] BaseBreakthroughChances = new double[]
        {
            0.95,  // 凡人→炼气
            0.90,  // 炼气→筑基
            0.70,  // 筑基→金丹
            0.50,  // 金丹→元婴
            0.30,  // 元婴→化神
            0.20,  // 化神→炼虚
            0.15,  // 炼虚→合体
            0.10,  // 合体→大乘
            0.05,  // 大乘→真仙
            0.03,  // 真仙→金仙
            0.02,  // 金仙→太乙
            0.01,  // 太乙→大罗
            0.005, // 大罗→道祖
            0.001, // 道祖→超脱
            0.0    // 超脱无突破
        };

        /// <summary>
        /// 6大核心属性名称。
        /// </summary>
        public static readonly string[] CoreAttributes = new[]
        {
            "体魄", "灵力", "神识", "敏捷", "悟性", "气运"
        };

        /// <summary>
        /// 业力维度名称。
        /// </summary>
        public static readonly string[] KarmaDimensions = new[]
        {
            "善", "恶", "因果", "执念", "功德"
        };
    }
}
