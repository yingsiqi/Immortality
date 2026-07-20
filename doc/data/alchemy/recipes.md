---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: acf5f01197289133e867ecab2f78b94b_5e17610381e011f18a64525400826444
    ReservedCode1: V97IijSAN0Ra55pPDbu6IcnYQFVI4vKbFh+Z6dd7KSnoGr+UthTqds6Lss0wqtlPIwfAIxzWQSqyiXN/ojnL3gklpPr6qmeyYXy010MXKTQ2Ey352h68jXujYH42AFXjGu4Bb9wsAsh10oUH9pcGn1V4XOWKRd1kSjO/dDXKNoB7r+t7lN8WRmefeUk=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: acf5f01197289133e867ecab2f78b94b_5e17610381e011f18a64525400826444
    ReservedCode2: V97IijSAN0Ra55pPDbu6IcnYQFVI4vKbFh+Z6dd7KSnoGr+UthTqds6Lss0wqtlPIwfAIxzWQSqyiXN/ojnL3gklpPr6qmeyYXy010MXKTQ2Ey352h68jXujYH42AFXjGu4Bb9wsAsh10oUH9pcGn1V4XOWKRd1kSjO/dDXKNoB7r+t7lN8WRmefeUk=
---

# 配方数据表

> 对应 [pills.md](pills.md) 中 65 种丹药的全部配方详情。所有材料引用基于已有材料表（herbs.md / ores.md / beast_materials.md / spirit_treasures.md）。

---

## 字段说明

| 字段 | 说明 |
|------|------|
| 产物ID | 对应 pills.md 中的 id |
| 产物名称 | 丹药名 |
| 主料 | 材料名（引用材料表）+ 数量 |
| 辅料 | 材料名 + 数量（可多个） |
| 丹炉最低品阶 | 1-5 |
| 炼制时长 | 游戏内时间（秒） |
| 基础成功率 | 0.0 ~ 1.0 |
| 感悟加成 | 每级感悟提升的成功率/品质概率 |
| 特殊条件 | 特殊炼制要求 |
| 配方来源 | 同丹方获取字段 |
| 备注 | 原著/原创标注 |

---

## 一、回复类配方（12 条）

### 气血恢复

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_hemostatic_powder` | 止血散 | 止血草(`hemostasis_herb`) ×3 | 灵泉水(`spirit_spring_water`) ×1 | 1 | 30s | 0.85 | 成功率 +0.03/级 | — | 入门赠送 | 游戏原创 |
| `pill_xiao_huan_dan` | 小还丹 | 凝露草(`dew_grass`) ×3 | 妖兽血·凡品(`beast_blood_mortal`) ×2、妖丹·凡品(`demon_drop_mortal`) ×1 | 2 | 60s | 0.75 | 成功率 +0.03/级 | — | NPC 药铺 | 原著来源 |
| `pill_huanglong_dan` | 黄龙丹 | 黄精芝(`yellow_essence_ganoderma`) ×2 | 妖兽血·下品(`beast_blood_low`) ×2、妖丹·下品(`demon_drop_low`) ×1 | 3 | 90s | 0.65 | 成功率 +0.03/级、品质 +0.02/级 | — | 任务「炼丹入门」 | 原著来源 |
| `pill_da_huan_dan` | 大还丹 | 七霞莲(`seven_glow_lotus`) ×1 | 妖丹·上品(`demon_drop_high`) ×1、妖兽精血·中品(`beast_essence_blood_mid`) ×2 | 4 | 180s | 0.45 | 成功率 +0.02/级、品质 +0.02/级 | 需木火双灵根 ≥30 | 副本「血色禁地」掉落 | 原著来源 |

### 真元恢复

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_huiqi_powder` | 回气散 | 凝露草(`dew_grass`) ×2 | 灵泉水(`spirit_spring_water`) ×1 | 1 | 30s | 0.85 | 成功率 +0.03/级 | — | 入门赠送 | 游戏原创 |
| `pill_juqi_dan` | 聚气丹 | 聚灵菇(`qi_gathering_mushroom`) ×2 | 妖兽血·凡品(`beast_blood_mortal`) ×2、灵石碎片(`spirit_stone_shard`) ×3 | 2 | 60s | 0.72 | 成功率 +0.03/级 | — | NPC 药铺 | 游戏原创 |
| `pill_yiqi_dan` | 益气丹 | 凝露草(`dew_grass`) ×3 | 妖丹·中品(`demon_drop_mid`) ×1、雪玉参液(`snow_jade_ginseng_liquid`) ×1 | 3 | 90s | 0.62 | 成功率 +0.03/级、品质 +0.02/级 | — | 任务「药园差事」 | 原著来源 |
| `pill_buyuan_dan` | 补元丹 | 九曲灵参(`nine_turn_spirit_ginseng`) ×1 | 妖丹·上品(`demon_drop_high`) ×1、万年灵乳(`ten_thousand_year_milk`) ×1 | 4 | 180s | 0.40 | 成功率 +0.02/级、品质 +0.02/级 | 需炼丹等级 ≥ 高级 | 副本「天南灵脉」掉落 | 游戏原创 |

### 双回复苏

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_huichun_dan` | 回春丹 | 回阳草(`yang_revival_herb`) ×2 | 妖兽髓·上品(`beast_marrow_high`) ×1、妖丹·上品(`demon_drop_high`) ×1 | 4 | 150s | 0.50 | 成功率 +0.02/级、品质 +0.02/级 | 需巳时（9-11点）开炉 | 宗门兑换（贡献 5000） | 原著来源 |
| `pill_tianyuan_huichun_dan` | 天元回春丹 | 天元果(`celestial_element_fruit`) ×1 | 妖丹·极品(`demon_drop_perfect`) ×1、醇液(`spirit_tree_sap`) ×1 | 5 | 300s | 0.20 | 成功率 +0.02/级、品质 +0.03/级 | 需火属性天灵根、灵力充裕秘境中炼制 | 全服事件「天降奇物」 | 游戏原创 |
| `pill_huanhun_dan` | 还魂丹 | 七霞莲(`seven_glow_lotus`) ×2 | 九曲灵参(`nine_turn_spirit_ginseng`) ×1、菩提花(`bodhi_flower`) ×1 | 4 | 300s | 0.25 | 成功率 +0.02/级 | 需午时（11-13点）、月华之下开炉 | 任务「起死回生」 | 原著扩展 |
| `pill_jiuzhuan_huanhun_dan` | 九转还魂丹 | 菩提花(`bodhi_flower`) ×1 | 七霞莲(`seven_glow_lotus`) ×1、妖兽真血·极品(`beast_true_blood_perfect`) ×2 | 5 | 600s | 0.10 | 成功率 +0.01/级、品质 +0.02/级 | 需宗师级炼丹师、九转开炉法 | 秘境「天渊城」最终宝箱 | 原著扩展 |

---

## 二、Buff 类配方（20 条）

### 攻击CD组

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_huojing_dan` | 火精丹 | 赤精芝(`crimson_essence_ganoderma`) ×2 | 火精枣(`fire_essence_jujube`) ×2、妖丹·下品(`demon_drop_low`) ×1 | 2 | 60s | 0.70 | 成功率 +0.03/级 | — | NPC 药铺 | 原著来源 |
| `pill_jinfeng_dan` | 金锋丹 | 金阳芝(`golden_sun_ganoderma`) ×2 | 金罡砂(`gold_gang_sand`) ×1、妖丹·下品(`demon_drop_low`) ×1 | 2 | 60s | 0.70 | 成功率 +0.03/级 | — | 任务「剑意初悟」 | 游戏原创 |
| `pill_shuiling_dan` | 水灵丹 | 冰灵果(`ice_spirit_fruit`) ×2 | 阴凝草(`yin_condense_herb`) ×2、妖丹·下品(`demon_drop_low`) ×1 | 2 | 60s | 0.70 | 成功率 +0.03/级 | — | NPC 药铺 | 游戏原创 |
| `pill_muhun_dan` | 木魂丹 | 伴妖草(`companion_grass`) ×2 | 木灵晶(`wood_spirit_crystal`) ×1、妖丹·下品(`demon_drop_low`) ×1 | 2 | 60s | 0.70 | 成功率 +0.03/级 | — | 任务「草木有灵」 | 游戏原创 |
| `pill_tugang_dan` | 土罡丹 | 淬骨藤(`bone_tempering_vine`) ×2 | 地髓晶(`earth_marrow_crystal`) ×1、妖丹·下品(`demon_drop_low`) ×1 | 2 | 60s | 0.70 | 成功率 +0.03/级 | — | NPC 药铺 | 游戏原创 |

### 防御CD组

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_zhuanggu_dan` | 壮骨丹 | 淬骨藤(`bone_tempering_vine`) ×3 | 妖兽骨·凡品(`beast_bone_mortal`) ×2、灵泉水(`spirit_spring_water`) ×1 | 1 | 45s | 0.80 | 成功率 +0.03/级 | — | 入门赠送 | 游戏原创 |
| `pill_jinsui_wan` | 金髓丸 | 淬骨藤(`bone_tempering_vine`) ×3 | 妖兽骨·下品(`beast_bone_low`) ×2、妖丹·下品(`demon_drop_low`) ×1 | 2 | 75s | 0.68 | 成功率 +0.03/级 | — | NPC 药铺 | 原著来源 |
| `pill_tiegu_dan` | 铁骨丹 | 千年石钟乳(`millennium_stalactite_milk`) ×1 | 妖兽骨·中品(`beast_bone_mid`) ×2、铁精(`iron_essence`) ×1 | 3 | 120s | 0.55 | 成功率 +0.03/级、品质 +0.02/级 | 需金灵根 ≥ 30 | 任务「铜皮铁骨」 | 游戏原创 |
| `pill_guben_dan` | 固本丹 | 紫纹参(`purple_vein_ginseng`) ×1 | 妖兽皮革·上品(`beast_leather_high`) ×1、妖丹·上品(`demon_drop_high`) ×1 | 4 | 150s | 0.45 | 成功率 +0.02/级、品质 +0.02/级 | — | 宗门兑换（贡献 8000） | 原著来源 |
| `pill_jingang_dan` | 金刚丹 | 龙鳞果(`dragon_scale_fruit`) ×1 | 千年石钟乳(`millennium_stalactite_milk`) ×2、妖兽真血·极品(`beast_true_blood_perfect`) ×1 | 5 | 300s | 0.25 | 成功率 +0.02/级、品质 +0.02/级 | 需土灵根 ≥ 60 | 秘境「金刚法相」 | 游戏原创 |

### 速度CD组

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_jifeng_dan` | 疾风丹 | 伴妖草(`companion_grass`) ×2 | 妖兽筋·下品(`beast_tendon_low`) ×2、下品灵石(`spirit_stone_low`) ×3 | 2 | 60s | 0.72 | 成功率 +0.03/级 | — | NPC 药铺 | 游戏原创 |
| `pill_zhuifeng_dan` | 追云丹 | 风灵珠(`wind_spirit_pearl`) ×1 | 妖兽筋·中品(`beast_tendon_mid`) ×1、金翅鹏翎(`golden_wing_peng_feather`) ×1 | 3 | 90s | 0.55 | 成功率 +0.03/级、品质 +0.02/级 | 需风灵充足之地（高海拔） | 任务「追风逐电」 | 游戏原创 |
| `pill_liuguang_dan` | 流光丹 | 风灵珠(`wind_spirit_pearl`) ×2 | 金翅鹏翎(`golden_wing_peng_feather`) ×1、妖兽精血·中品(`beast_essence_blood_mid`) ×2 | 4 | 150s | 0.40 | 成功率 +0.02/级、品质 +0.02/级 | 需在金翅大鹏栖息地炼制 | 副本「九天风谷」掉落 | 游戏原创 |

### 回复速率CD组

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_juling_dan` | 聚灵丹 | 聚灵菇(`qi_gathering_mushroom`) ×3 | 凝露草(`dew_grass`) ×2、妖兽血·凡品(`beast_blood_mortal`) ×1 | 2 | 60s | 0.75 | 成功率 +0.03/级 | — | NPC 药铺 | 原著来源 |
| `pill_naling_dan` | 纳灵丹 | 黄精芝(`yellow_essence_ganoderma`) ×2 | 木灵晶(`wood_spirit_crystal`) ×1、妖丹·中品(`demon_drop_mid`) ×1 | 3 | 90s | 0.60 | 成功率 +0.03/级、品质 +0.02/级 | — | 任务「灵气纳体」 | 游戏原创 |
| `pill_shengling_dan` | 生灵丹 | 九曲灵参(`nine_turn_spirit_ginseng`) ×1 | 紫纹参(`purple_vein_ginseng`) ×1、妖兽髓·上品(`beast_marrow_high`) ×1 | 4 | 150s | 0.45 | 成功率 +0.02/级、品质 +0.02/级 | 需灵气浓郁（≥2.0x）地图 | 宗门兑换（贡献 6000） | 游戏原创 |

### 神识CD组

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_xingshen_dan` | 醒神丹 | 清心花(`pure_heart_flower`) ×2 | 银角树(`silver_horn_tree`) ×2、灵泉水(`spirit_spring_water`) ×1 | 2 | 60s | 0.75 | 成功率 +0.03/级 | — | NPC 药铺 | 原著来源 |
| `pill_dingshen_dan` | 定神丹 | 清心花(`pure_heart_flower`) ×3 | 凝露草(`dew_grass`) ×2、妖丹·中品(`demon_drop_mid`) ×1 | 3 | 90s | 0.62 | 成功率 +0.03/级、品质 +0.02/级 | — | 任务「固守心神」 | 原著来源 |
| `pill_yanghun_dan` | 养魂丹 | 养魂木(`soul_nurturing_wood`) ×1（须取枝干切片） | 菀梦果(`wan_meng_fruit`) ×1、妖丹·上品(`demon_drop_high`) ×1 | 4 | 240s | 0.30 | 成功率 +0.02/级、品质 +0.03/级 | 需子时（23-1点）开炉，月光照射 | 副本「古战场遗迹」掉落 | 原著来源 |

### 修为CD组

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_ningqi_wan` | 凝气丸 | 聚灵菇(`qi_gathering_mushroom`) ×2 | 凝露草(`dew_grass`) ×2、甘露(`sweet_dew`) ×1 | 2 | 60s | 0.78 | 成功率 +0.03/级 | — | 入门赠送 | 原著来源 |
| `pill_juyuan_dan` | 聚元丹 | 黄精芝(`yellow_essence_ganoderma`) ×2 | 木灵晶(`wood_spirit_crystal`) ×1、妖丹·中品(`demon_drop_mid`) ×1 | 3 | 105s | 0.58 | 成功率 +0.03/级、品质 +0.02/级 | — | NPC 药铺 | 游戏原创 |
| `pill_huiling_dan` | 汇灵丹 | 补天芝(`sky_repair_ganoderma`) ×1 | 妖丹·上品(`demon_drop_high`) ×1、醇液(`spirit_tree_sap`) ×1 | 4 | 180s | 0.40 | 成功率 +0.02/级、品质 +0.02/级 | 需在灵脉（灵气 ≥2.0x）之上炼制 | 宗门兑换（贡献 10000） | 游戏原创 |

### 生产CD组

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_qiaoshou_dan` | 巧手丹 | 霓裳草(`neon_grass`) ×2 | 妖兽筋·下品(`beast_tendon_low`) ×2、地火之气(`earth_fire_vapor`) ×1 | 2 | 75s | 0.65 | 成功率 +0.03/级 | 需炼器技能 ≥ 初级 | 任务「炼器学徒」 | 游戏原创 |
| `pill_danxin_dan` | 丹心丹 | 清心花(`pure_heart_flower`) ×2 | 凝露草(`dew_grass`) ×2、地火之气(`earth_fire_vapor`) ×1 | 2 | 75s | 0.65 | 成功率 +0.03/级 | 需炼丹技能 ≥ 初级 | 任务「炼丹学徒」 | 游戏原创 |
| `pill_lingcai_dan` | 灵采丹 | 霓裳草(`neon_grass`) ×2 | 木灵晶(`wood_spirit_crystal`) ×1、甘露(`sweet_dew`) ×2 | 3 | 90s | 0.55 | 成功率 +0.03/级、品质 +0.02/级 | — | NPC 药铺 | 游戏原创 |

### 掉率CD组

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_xunbao_dan` | 寻宝丹 | 霓裳草(`neon_grass`) ×2 | 妖丹·中品(`demon_drop_mid`) ×1、金灵子(`gold_spirit_seed`) ×1 | 3 | 120s | 0.45 | 成功率 +0.02/级、品质 +0.02/级 | 需辰时（7-9点）开炉时加入金灵子 | 副本「藏宝洞」掉落 | 游戏原创 |
| `pill_xianggui_dan` | 祥瑞丹 | 补天芝(`sky_repair_ganoderma`) ×1 | 妖丹·上品(`demon_drop_high`) ×1、妖兽真血·极品(`beast_true_blood_perfect`) ×1 | 4 | 180s | 0.30 | 成功率 +0.02/级、品质 +0.02/级 | 需在气运值 ≥ 500 时炼制 | 任务「气运加身」 | 游戏原创 |

### 抗性CD组

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_qingxin_dan` | 清心丹 | 清心花(`pure_heart_flower`) ×3 | 银角树(`silver_horn_tree`) ×2、甘露(`sweet_dew`) ×1 | 2 | 60s | 0.75 | 成功率 +0.03/级 | — | NPC 药铺 | 原著来源 |
| `pill_xuanbing_dan` | 玄冰丹 | 玄冰花(`dark_ice_flower`) ×2 | 冰灵果(`ice_spirit_fruit`) ×1、冰魄晶(`ice_po_crystal`) ×1 | 3 | 120s | 0.55 | 成功率 +0.03/级、品质 +0.02/级 | 需在极寒环境（温度 ≤ -10°C）中炼制 | 任务「雪山试炼」 | 原著来源 |
| `pill_huohuan_dan` | 火浣丹 | 赤精芝(`crimson_essence_ganoderma`) ×2 | 火精枣(`fire_essence_jujube`) ×1、火灵晶(`fire_spirit_crystal`) ×1 | 3 | 120s | 0.55 | 成功率 +0.03/级、品质 +0.02/级 | 需在地火灵脉或熔岩地带炼制 | 任务「地火探险」 | 游戏原创 |
| `pill_leigang_dan` | 雷罡丹 | 天雷子(`heaven_thunder_pea`) ×1 | 雷劫木心(`lightning_wood_heart`) ×1、妖丹·上品(`demon_drop_high`) ×1 | 4 | 180s | 0.30 | 成功率 +0.02/级、品质 +0.02/级 | 需在雷雨天或天劫遗迹中炼制 | 副本「雷劫之地」掉落 | 游戏原创 |
| `pill_wanwu_qing` | 万毒清 | 碧鸠毒液(`green_owl_venom`) ×1（以毒攻毒） | 鬼面蛛丝(`ghost_spider_silk`) ×1、妖丹·上品(`demon_drop_high`) ×1 | 4 | 240s | 0.35 | 成功率 +0.02/级、品质 +0.02/级 | 需毒抗 ≥ 100 方可开炉 | 宗门兑换（贡献 7000） | 游戏原创 |

---

## 三、突破类配方（8 条）

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_zhuji_dan` | 筑基丹 | 伴妖草(`companion_grass`) ×3 | 妖丹·下品(`demon_drop_low`) ×2、下品灵石(`spirit_stone_low`) ×50 | 2 | 180s | 0.40 | 成功率 +0.02/级 | 需筑基期以上修士炼制 | 任务「筑基之始」 | 原著来源 |
| `pill_jiejin_dan` | 结金丹 | 黄精芝(`yellow_essence_ganoderma`) ×3 | 妖丹·中品(`demon_drop_mid`) ×2、中品灵石(`spirit_stone_mid`) ×20 | 3 | 240s | 0.30 | 成功率 +0.02/级、品质 +0.02/级 | 需结丹期以上修为、火灵根 ≥ 40 | 副本「丹道试炼」 | 原著来源 |
| `pill_peiying_dan` | 培婴丹 | 玉髓芝(`jade_marrow_ganoderma`) ×2 | 妖丹·上品(`demon_drop_high`) ×3、上品灵石(`spirit_stone_high`) ×10 | 4 | 360s | 0.20 | 成功率 +0.02/级、品质 +0.02/级 | 需元婴期以上、灵气浓郁（≥3.0x） | 宗门兑换（贡献 50000） | 原著来源 |
| `pill_huashen_dan` | 化神丹 | 龙鳞果(`dragon_scale_fruit`) ×1 | 妖丹·极品(`demon_drop_perfect`) ×2、极品灵石(`spirit_stone_perfect`) ×3 | 5 | 600s | 0.10 | 成功率 +0.01/级、品质 +0.02/级 | 需化神期以上、宗师级炼丹师、天地灵气极佳处 | 秘境「昆吾山」最终宝箱 | 原著来源 |
| `pill_poxu_dan` | 破虚丹 | 七霞莲(`seven_glow_lotus`) ×1 | 妖兽魂晶·极品(`beast_soul_crystal_perfect`) ×1、虚空晶(`void_crystal`) ×1 | 5 | 600s | 0.08 | 成功率 +0.01/级、品质 +0.02/级 | 需空间法则感知 ≥ 10 | 全服事件「空间裂隙」 | 游戏原创 |
| `pill_heti_dan` | 合体丹 | 九曲灵参(`nine_turn_spirit_ginseng`) ×1 | 妖兽真血·极品(`beast_true_blood_perfect`) ×2、息壤(`xi_rang`) ×1 | 5 | 900s | 0.06 | 成功率 +0.01/级、品质 +0.02/级 | 需合体期以上、肉身强度 ≥ 5000 | 全服事件「天地异象」 | 游戏原创 |
| `pill_dujie_dan` | 渡劫丹 | 菩提花(`bodhi_flower`) ×1 | 妖兽魂晶·极品(`beast_soul_crystal_perfect`) ×1、五行结晶(`five_elements_crystal`) ×1 | 5 | 900s | 0.05 | 成功率 +0.01/级、品质 +0.02/级 | 需大乘期引动天劫前炼制、真元消耗极巨 | 传奇任务「渡劫飞升」 | 游戏原创 |
| `pill_pohang_dan` | 破障丹 | 补天芝(`sky_repair_ganoderma`) ×2 | 妖丹·上品(`demon_drop_high`) ×1、明清灵水(`mingqing_spirit_water`) ×1 | 4 | 240s | 0.35 | 成功率 +0.02/级、品质 +0.02/级 | 需在月圆之夜开炉 | 副本「心魔幻境」掉落 | 原著来源 |

---

## 四、永久提升类配方（10 条）

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_yanshou_dan` | 延寿丹 | 寿元果(`longevity_fruit`) ×2 | 玉髓芝(`jade_marrow_ganoderma`) ×1、七霞莲(`seven_glow_lotus`) ×1 | 4 | 300s | 0.30 | 成功率 +0.02/级、品质 +0.02/级 | 需木灵根 ≥ 50、寿元消耗≥10年方可炼制 | 任务「寿元将尽」 | 原著来源 |
| `pill_tianyuan_dan` | 天元丹 | 天元果(`celestial_element_fruit`) ×1 | 寿元果(`longevity_fruit`) ×1、妖兽真血·极品(`beast_true_blood_perfect`) ×1 | 5 | 600s | 0.15 | 成功率 +0.01/级、品质 +0.03/级 | 需宗师级炼丹师、寿元消耗≥50年方可炼制 | 全服事件「天降奇物」 | 原著来源 |
| `pill_jinsui_wan_zhen` | 金髓丸·真 | 千年石钟乳(`millennium_stalactite_milk`) ×2 | 妖兽骨·中品(`beast_bone_mid`) ×3、金阳芝(`golden_sun_ganoderma`) ×2 | 3 | 180s | 0.45 | 成功率 +0.02/级、品质 +0.02/级 | 需金灵根 ≥ 30、肉身强度 ≥ 500 | 任务「脱胎换骨」 | 游戏原创 |
| `pill_yugu_dan` | 玉骨丹 | 玉髓芝(`jade_marrow_ganoderma`) ×2 | 千年石钟乳(`millennium_stalactite_milk`) ×1、妖兽髓·上品(`beast_marrow_high`) ×1 | 4 | 240s | 0.35 | 成功率 +0.02/级、品质 +0.02/级 | 需骨骼强度 ≥ 1000 | 宗门兑换（贡献 15000） | 游戏原创 |
| `pill_xuanyuan_dan` | 玄元丹 | 紫纹参(`purple_vein_ginseng`) ×2 | 妖兽心·上品(`beast_heart_high`) ×1、妖丹·上品(`demon_drop_high`) ×1 | 4 | 240s | 0.38 | 成功率 +0.02/级、品质 +0.02/级 | 需气血上限 ≥ 5000 | 任务「气血如海」 | 游戏原创 |
| `pill_shihai_dan` | 识海丹 | 菀梦果(`wan_meng_fruit`) ×1 | 养魂木(`soul_nurturing_wood`) ×1（枝干切片）、妖丹·上品(`demon_drop_high`) ×1 | 4 | 300s | 0.28 | 成功率 +0.02/级、品质 +0.02/级 | 需神识 ≥ 200 | 副本「识海秘境」掉落 | 游戏原创 |
| `pill_butian_dan` | 补天丹 | 补天芝(`sky_repair_ganoderma`) ×1 | 明清灵水(`mingqing_spirit_water`) ×1、混元石(`chaos_stone`) ×1 | 5 | 600s | 0.12 | 成功率 +0.01/级、品质 +0.03/级 | 需天灵根或异灵根方可服用的逆天之药 | 传奇任务「补天之路」 | 原著来源 |
| `pill_yufeng_dan` | 御风丹 | 风灵珠(`wind_spirit_pearl`) ×1 | 妖兽筋·中品(`beast_tendon_mid`) ×1、伴妖草(`companion_grass`) ×2 | 3 | 150s | 0.50 | 成功率 +0.02/级、品质 +0.02/级 | 需在风灵充裕之地炼制 | 任务「御风而行」 | 游戏原创 |
| `pill_xuanbing_dan_zhen` | 玄冰丹·真 | 玄冰花(`dark_ice_flower`) ×2 | 冰魄晶(`ice_po_crystal`) ×1、妖兽血·下品(`beast_blood_low`) ×2 | 3 | 180s | 0.45 | 成功率 +0.02/级、品质 +0.02/级 | 需在极寒之地（温度 ≤ -20°C）连续炼制三日 | 任务「冰髓炼体」 | 游戏原创 |
| `pill_huojing_dan_zhen` | 火精丹·真 | 赤精芝(`crimson_essence_ganoderma`) ×2 | 火灵晶(`fire_spirit_crystal`) ×1、妖兽血·下品(`beast_blood_low`) ×2 | 3 | 180s | 0.45 | 成功率 +0.02/级、品质 +0.02/级 | 需在地火熔岩中炼制 | 任务「火灵锻体」 | 游戏原创 |

---

## 五、功能类配方（10 条）

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_jiedu_dan` | 解毒丹 | 银角树(`silver_horn_tree`) ×3 | 清心花(`pure_heart_flower`) ×2、灵泉水(`spirit_spring_water`) ×1 | 2 | 60s | 0.75 | 成功率 +0.03/级 | — | NPC 药铺 | 原著扩展 |
| `pill_huaxi_dan` | 化息丹 | 金灵子(`gold_spirit_seed`) ×2 | 霓裳草(`neon_grass`) ×2、妖丹·中品(`demon_drop_mid`) ×1 | 3 | 120s | 0.50 | 成功率 +0.02/级、品质 +0.02/级 | 需在隐秘处炼制，不可被他人窥见 | 任务「潜行匿踪」 | 原著来源 |
| `pill_huicheng_fu_dan` | 回城符丹 | 银角树(`silver_horn_tree`) ×2 | 灵石碎片(`spirit_stone_shard`) ×5、灵泉水(`spirit_spring_water`) ×1 | 1 | 30s | 0.85 | 成功率 +0.03/级 | — | 入门赠送 | 游戏原创 |
| `pill_xisui_dan` | 洗髓丹 | 紫纹参(`purple_vein_ginseng`) ×2 | 明清灵水(`mingqing_spirit_water`) ×1、妖兽髓·上品(`beast_marrow_high`) ×1 | 4 | 300s | 0.30 | 成功率 +0.02/级、品质 +0.02/级 | 需在灵气浓郁（≥3.0x）洞府炼制 | 宗门兑换（贡献 20000） | 游戏原创 |
| `pill_jingzui_dan` | 净罪丹 | 清心花(`pure_heart_flower`) ×3 | 甘露(`sweet_dew`) ×2、下品灵石(`spirit_stone_low`) ×10 | 3 | 90s | 0.60 | 成功率 +0.03/级 | 需心中无杀念方可成功开炉 | NPC 功德堂 | 游戏原创 |
| `pill_jianbao_dan` | 鉴宝丹 | 霓裳草(`neon_grass`) ×2 | 银角树(`silver_horn_tree`) ×2、灵泉水(`spirit_spring_water`) ×1 | 2 | 45s | 0.72 | 成功率 +0.03/级 | — | NPC 杂货铺 | 游戏原创 |
| `pill_qingxin_zhou_dan` | 清心咒丹 | 养魂木(`soul_nurturing_wood`) ×1（切片） | 菩提花(`bodhi_flower`) ×1、清心花(`pure_heart_flower`) ×3 | 4 | 300s | 0.25 | 成功率 +0.02/级、品质 +0.02/级 | 需神识 ≥ 500、念诵清心咒九遍方可成丹 | 副本「大衍幻境」掉落 | 游戏原创 |
| `pill_jingang_fu_dan` | 金刚符丹 | 龙鳞果(`dragon_scale_fruit`) ×1 | 紫纹参(`purple_vein_ginseng`) ×2、妖兽真血·极品(`beast_true_blood_perfect`) ×1 | 5 | 360s | 0.15 | 成功率 +0.01/级、品质 +0.02/级 | 需土灵根 ≥ 70、大圆满心境 | 秘境「金刚寺」宝箱 | 游戏原创 |
| `pill_qiyu_fu_dan` | 祈雨符丹 | 凝露草(`dew_grass`) ×3 | 灵泉水(`spirit_spring_water`) ×2、下品灵石(`spirit_stone_low`) ×5 | 2 | 60s | 0.70 | 成功率 +0.03/级 | 需在干旱之地炼制 | 任务「风调雨顺」 | 游戏原创 |
| `pill_quwu_fu_dan` | 驱雾符丹 | 伴妖草(`companion_grass`) ×2 | 银角树(`silver_horn_tree`) ×2、下品灵石(`spirit_stone_low`) ×5 | 2 | 60s | 0.70 | 成功率 +0.03/级 | 需在迷雾中炼制 | 任务「雾散天明」 | 游戏原创 |

---

## 六、魔道类配方（5 条）

| 产物ID | 产物名称 | 主料 | 辅料 | 丹炉最低品阶 | 炼制时长 | 基础成功率 | 感悟加成 | 特殊条件 | 配方来源 | 备注 |
|--------|---------|------|------|------------|---------|-----------|---------|---------|---------|------|
| `pill_xuening_wuxing_dan` | 血凝五行丹 | 血灵草(`blood_spirit_herb`) ×3 | 妖丹·上品(`demon_drop_high`) ×2、妖兽真血·极品(`beast_true_blood_perfect`) ×1 | 5 | 600s | 0.12 | 成功率 +0.01/级、品质 +0.02/级 | 需集齐五行生灵精血各一份，月上中天时开炉 | 魔道任务「血祭五行」 | 原著来源 |
| `pill_baoling_dan` | 爆灵丹 | 赤精芝(`crimson_essence_ganoderma`) ×3 | 妖丹·上品(`demon_drop_high`) ×2、妖兽精血·中品(`beast_essence_blood_mid`) ×2 | 4 | 240s | 0.35 | 成功率 +0.02/级、品质 +0.02/级 | 需在煞气充足之地（击杀≥100只妖兽的区域）炼制 | 魔道 NPC 黑市 | 游戏原创 |
| `pill_tianmo_jieti_dan` | 天魔解体丹 | 血灵草(`blood_spirit_herb`) ×2 | 妖兽真血·极品(`beast_true_blood_perfect`) ×2、混元石(`chaos_stone`) ×1 | 5 | 600s | 0.10 | 成功率 +0.01/级、品质 +0.02/级 | 需在天魔封印薄弱处（古战场、大凶之地）炼制 | 魔道任务「天魔降临」 | 游戏原创 |
| `pill_fengxue_dan` | 疯血丹 | 妖兽精血·中品(`beast_essence_blood_mid`) ×3 | 血灵草(`blood_spirit_herb`) ×2、妖丹·中品(`demon_drop_mid`) ×2 | 4 | 180s | 0.48 | 成功率 +0.02/级、品质 +0.02/级 | 需在妖兽巢穴或兽潮区域炼制 | 魔道 NPC 黑市 | 游戏原创 |
| `pill_ranhun_dan` | 燃魂丹 | 养魂木(`soul_nurturing_wood`) ×1（根须） | 血灵草(`blood_spirit_herb`) ×2、妖丹·上品(`demon_drop_high`) ×2 | 4 | 300s | 0.30 | 成功率 +0.02/级、品质 +0.02/级 | 需自身神魂受损状态下开炉（神魂值<50%） | 魔道 NPC 黑市 | 游戏原创 |

---

## 配方分布统计

| 分类 | 配方数 | 占总量 |
|------|--------|--------|
| 一、回复类 | 12 | 18.5% |
| 二、Buff类 | 20 | 30.8% |
| 三、突破类 | 8 | 12.3% |
| 四、永久提升类 | 10 | 15.4% |
| 五、功能类 | 10 | 15.4% |
| 六、魔道类 | 5 | 7.7% |
| **合计** | **65** | **100%** |

### 丹炉品阶分布

| 丹炉品阶 | 配方数 |
|---------|--------|
| 1（凡品炉） | 4 |
| 2（下品炉） | 20 |
| 3（中品炉） | 15 |
| 4（上品炉） | 18 |
| 5（极品炉） | 8 |

### 材料引用统计

| 材料表 | 引用次数 |
|--------|---------|
| 灵草植物（herbs.md） | 高频 |
| 灵兽材料·通用（beast_materials.md） | 高频 |
| 天地灵物（spirit_treasures.md） | 中频 |
| 矿石金属（ores.md） | 低频（丹炉相关） |

> 所有材料 ID 均与 `doc/data/materials/` 下各数据表保持一致。核心引用材料明细：
> - **凡品**：止血草(`hemostasis_herb`)、凝露草(`dew_grass`)、清心花(`pure_heart_flower`)、银角树(`silver_horn_tree`)、灵泉水(`spirit_spring_water`)、妖兽血凡品(`beast_blood_mortal`)、妖兽骨凡品(`beast_bone_mortal`)、妖丹凡品(`demon_drop_mortal`)
> - **下品**：霓裳草(`neon_grass`)、伴妖草(`companion_grass`)、聚灵菇(`qi_gathering_mushroom`)、赤精芝(`crimson_essence_ganoderma`)、金阳芝(`golden_sun_ganoderma`)、淬骨藤(`bone_tempering_vine`)、火精枣(`fire_essence_jujube`)、冰灵果(`ice_spirit_fruit`)、妖丹下品(`demon_drop_low`)、妖兽血下品(`beast_blood_low`)、妖兽骨下品(`beast_bone_low`)、妖兽筋下品(`beast_tendon_low`)
> - **中品**：黄精芝(`yellow_essence_ganoderma`)、玄冰花(`dark_ice_flower`)、火灵晶(`fire_spirit_crystal`)、冰魄晶(`ice_po_crystal`)、木灵晶(`wood_spirit_crystal`)、地髓晶(`earth_marrow_crystal`)、风灵珠(`wind_spirit_pearl`)、金精砂(`gold_gang_sand`)、千年石钟乳(`millennium_stalactite_milk`)、妖丹中品(`demon_drop_mid`)、妖兽骨中品(`beast_bone_mid`)、妖兽筋中品(`beast_tendon_mid`)、妖兽精血中品(`beast_essence_blood_mid`)
> - **上品**：七霞莲(`seven_glow_lotus`)、九曲灵参(`nine_turn_spirit_ginseng`)、补天芝(`sky_repair_ganoderma`)、紫纹参(`purple_vein_ginseng`)、菀梦果(`wan_meng_fruit`)、寿元果(`longevity_fruit`)、天元果(`celestial_element_fruit`)、血灵草(`blood_spirit_herb`)、玉髓芝(`jade_marrow_ganoderma`)、龙鳞果(`dragon_scale_fruit`)、金灵子(`gold_spirit_seed`)、妖丹上品(`demon_drop_high`)、妖兽髓上品(`beast_marrow_high`)、妖兽心上品(`beast_heart_high`)、妖兽皮革上品(`beast_leather_high`)、明清灵水(`mingqing_spirit_water`)、醇液(`spirit_tree_sap`)、万年灵乳(`ten_thousand_year_milk`)、养魂木(`soul_nurturing_wood`)
> - **极品**：菩提花(`bodhi_flower`)、天雷竹（天雷子`heaven_thunder_pea`）、虚空晶(`void_crystal`)、混元石(`chaos_stone`)、五行结晶(`five_elements_crystal`)、妖丹极品(`demon_drop_perfect`)、妖兽真血极品(`beast_true_blood_perfect`)、妖兽魂晶极品(`beast_soul_crystal_perfect`)、金翅鹏翎(`golden_wing_peng_feather`)、碧鸠毒液(`green_owl_venom`)
> - **灵石**：下品灵石(`spirit_stone_low`)、中品灵石(`spirit_stone_mid`)、上品灵石(`spirit_stone_high`)、极品灵石(`spirit_stone_perfect`)、灵石碎片(`spirit_stone_shard`)

*（内容由AI生成，仅供参考）*
*（内容由AI生成，仅供参考）*
