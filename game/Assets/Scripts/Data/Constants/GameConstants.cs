namespace Immortality.Data.Constants
{
    /// <summary>
    /// 游戏全局常量定义 — 境界、时间、灵根等核心常量。
    /// 参考文档: 修炼系统设计、世界系统设计。
    /// </summary>
    public static class GameConstants
    {
        /// <summary>
        /// 时间换算：1现实秒 = 1游戏日。
        /// </summary>
        public const float GameDaysPerRealSecond = 1f;

        /// <summary>
        /// 修炼境界定义（15个大境界）。
        /// 凡人 → 炼气 → 筑基 → 金丹 → 元婴 → 化神 → 炼虚 → 合体 → 大乘 → 真仙 → 金仙 → 太乙 → 大罗 → 道祖 → 超脱
        /// </summary>
        public static readonly string[] CultivationRealms = new[]
        {
            "凡人", "炼气", "筑基", "金丹", "元婴",
            "化神", "炼虚", "合体", "大乘", "真仙",
            "金仙", "太乙", "大罗", "道祖", "超脱"
        };

        /// <summary>
        /// 灵根类型。
        /// </summary>
        public static readonly string[] SpiritualRootTypes = new[]
        {
            "天灵根", "异灵根", "真灵根", "伪灵根", "杂灵根"
        };

        /// <summary>
        /// 装备品质等级。
        /// </summary>
        public static readonly string[] EquipmentQualities = new[]
        {
            "凡品", "灵品", "宝品", "仙品", "道品"
        };

        /// <summary>
        /// 货币类型（4级货币体系）。
        /// </summary>
        public static readonly string[] CurrencyTypes = new[]
        {
            "灵石", "贡献点", "功德值", "天道币"
        };

        /// <summary>
        /// 6大核心属性。
        /// </summary>
        public static readonly string[] CoreAttributes = new[]
        {
            "体魄", "灵力", "神识", "敏捷", "悟性", "气运"
        };

        /// <summary>
        /// 业力维度（5维）。
        /// </summary>
        public static readonly string[] KarmaDimensions = new[]
        {
            "善", "恶", "因果", "执念", "功德"
        };
    }
}
