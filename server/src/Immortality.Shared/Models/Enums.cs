namespace Immortality.Shared.Models
{
    /// <summary>
    /// 修炼境界枚举（15个大境界）。
    /// 凡人 → 炼气 → 筑基 → 金丹 → 元婴 → 化神 → 炼虚 → 合体 → 大乘 → 真仙 → 金仙 → 太乙 → 大罗 → 道祖 → 超脱
    /// </summary>
    public enum CultivationRealm
    {
        Mortal = 0,       // 凡人
        QiRefining = 1,   // 炼气
        Foundation = 2,   // 筑基
        GoldenCore = 3,   // 金丹
        NascentSoul = 4,  // 元婴
        SpiritSevering = 5, // 化神
        VoidRefining = 6, // 炼虚
        BodyIntegration = 7, // 合体
        Mahayana = 8,     // 大乘
        TrueImmortal = 9, // 真仙
        GoldenImmortal = 10, // 金仙
        Taiyi = 11,       // 太乙
        Daluo = 12,       // 大罗
        DaoAncestor = 13, // 道祖
        Transcendence = 14 // 超脱
    }

    /// <summary>
    /// 灵根类型。
    /// </summary>
    public enum SpiritualRootType
    {
        Heavenly = 0,   // 天灵根
        Mutant = 1,     // 异灵根
        True = 2,       // 真灵根
        Pseudo = 3,     // 伪灵根
        Mixed = 4       // 杂灵根
    }

    /// <summary>
    /// 装备品质。
    /// </summary>
    public enum EquipmentQuality
    {
        Common = 0,    // 凡品
        Spirit = 1,    // 灵品
        Treasure = 2,  // 宝品
        Immortal = 3,  // 仙品
        Dao = 4        // 道品
    }

    /// <summary>
    /// 货币类型（4级货币体系）。
    /// </summary>
    public enum CurrencyType
    {
        SpiritStone = 0,   // 灵石
        Contribution = 1,  // 贡献点
        Merit = 2,         // 功德值
        HeavenlyDao = 3    // 天道币
    }

    /// <summary>
    /// 业力维度（5维）。
    /// </summary>
    public enum KarmaDimension
    {
        Good = 0,       // 善
        Evil = 1,       // 恶
        Karma = 2,      // 因果
        Attachment = 3, // 执念
        Merit = 4       // 功德
    }
}
