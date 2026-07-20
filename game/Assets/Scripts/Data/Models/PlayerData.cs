using System;

namespace Immortality.Data.Models
{
    /// <summary>
    /// 玩家数据模型 — 对应服务端 Player 实体的客户端镜像。
    /// </summary>
    [Serializable]
    public class PlayerData
    {
        public string PlayerId;
        public string UserId;
        public string CharacterName;
        public int CultivationRealmIndex;
        public int CultivationLayer;
        public int CultivationSubLayer;
        public string SpiritualRootType;
        public long SpiritualPower;
        public long MaxSpiritualPower;
        public int Stamina;
        public int MaxStamina;
        public int MeritPoints;
        public long CreatedAt;
        public long LastActiveAt;

        /// <summary>
        /// 当前境界名称。
        /// </summary>
        public string CultivationRealm =>
            CultivationRealmIndex >= 0 && CultivationRealmIndex < Data.Constants.GameConstants.CultivationRealms.Length
                ? Data.Constants.GameConstants.CultivationRealms[CultivationRealmIndex]
                : "未知";

        /// <summary>
        /// 6位境界编码。
        /// </summary>
        public string RealmCode =>
            Core.Utilities.GameUtility.FormatRealmCode(1, CultivationRealmIndex, CultivationLayer, CultivationSubLayer);
    }
}
