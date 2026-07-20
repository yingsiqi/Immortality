---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: acf5f01197289133e867ecab2f78b94b_5da61b7c81e011f180b3525400bff409
    ReservedCode1: llxgKXPF6ZwLK5RitVZ+EnYQf3bClY9Ss/cY3fJTN5vM9uGCmfrLD6kZdfCUVSRmPwr6/8kinmD0wy4Tu+IgQv7+OCzM9msXEPqn1sRUyFveI8syidBvgv5ldi26JcwreJgyjBnwTks+aZuHu/4T+rR5LdTnEBjTAI7U0YRwWIk+Wn7NnesYYz0g88Q=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: acf5f01197289133e867ecab2f78b94b_5da61b7c81e011f180b3525400bff409
    ReservedCode2: llxgKXPF6ZwLK5RitVZ+EnYQf3bClY9Ss/cY3fJTN5vM9uGCmfrLD6kZdfCUVSRmPwr6/8kinmD0wy4Tu+IgQv7+OCzM9msXEPqn1sRUyFveI8syidBvgv5ldi26JcwreJgyjBnwTks+aZuHu/4T+rR5LdTnEBjTAI7U0YRwWIk+Wn7NnesYYz0g88Q=
---

# 丹药数据表

> 基于原著《凡人修仙传》世界观，共 65 种丹药，按六大功能类分组，每类按品阶 1~5 排列。

---

## 字段说明

| 字段 | 说明 |
|------|------|
| id | 英文唯一 ID，格式 `pill_xxx` |
| 名称 | 中文丹药名 |
| 品阶 | 1(凡品) ~ 5(极品) |
| 功能分类 | 回复 / Buff / 突破 / 永久 / 功能 / 魔道 |
| CD组 | Buff 类必填（攻击CD/防御CD/速度CD/回复速率CD/神识CD/修为CD/生产CD/掉率CD/抗性CD）；回复类填（气血CD/真元CD/双回CD/神识回复CD/复活CD）；其余填「无」 |
| 使用境界下限 | 最低使用境界 |
| 效果描述 | 游戏内展示文本（含数值） |
| 数值公式 | 如 `hp_restore: 200` 或 `hp_restore_pct: 0.3` |
| 持续时间 | Buff 类填秒数；永久类填「永久」；突破类/功能类填「即时」；回复类填「即时」或持续回复秒数 |
| CD时间 | 服后冷却秒数；突破类/永久类填「—」 |
| 最大堆叠 | 背包单格堆叠上限 |
| 炼制难度 | 1-5（学徒/初级/中级/高级/宗师） |
| 主要材料 | 1-3 种主料 ID |
| 丹方获取 | NPC/任务/副本/掉落/交易/入门赠送 |
| 丹方可交易 | 是/否/拾取绑定 |
| 丹方感悟上限 | 可重复学习次数上限 |
| 备注 | 原著来源/原著扩展/游戏原创 |

---

## 一、回复类（12 种）

> 战斗续航的核心消耗品，按回复对象 + 品阶梯度排列。

### 气血恢复

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_hemostatic_powder` | 止血散 | 1 | 回复 | 气血CD | 炼气 | 外敷或内服，快速止住外伤出血，恢复少量气血。 | `hp_restore: 80` | 即时 | 30s | 99 | 1 | `hemostasis_herb`, `spirit_spring_water` | 入门赠送 | 是 | — | 游戏原创 |
| `pill_xiao_huan_dan` | 小还丹 | 2 | 回复 | 气血CD | 炼气 | 中级疗伤丹药，服用后恢复一定气血，常用于战斗间隙。 | `hp_restore: 350` | 即时 | 45s | 50 | 2 | `dew_grass`, `beast_blood_mortal`, `demon_drop_mortal` | NPC 药铺 | 是 | — | 原著来源 |
| `pill_huanglong_dan` | 黄龙丹 | 3 | 回复 | 气血CD | 筑基 | 基础疗伤丹药，以黄精芝为主材炼制，可快速恢复伤势。 | `hp_restore_pct: 0.30` | 即时 | 60s | 30 | 3 | `yellow_essence_ganoderma`, `beast_blood_low`, `demon_drop_low` | 任务「炼丹入门」 | 是 | — | 原著来源 |
| `pill_da_huan_dan` | 大还丹 | 4 | 回复 | 气血CD | 结丹 | 顶级疗伤丹药，可治疗重伤，大幅恢复气血。 | `hp_restore_pct: 0.55` | 即时 | 90s | 20 | 4 | `seven_glow_lotus`, `demon_drop_high`, `beast_essence_blood_mid` | 副本「血色禁地」掉落 | 否（拾取绑定） | 3 | 原著来源 |

### 真元恢复

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_huiqi_powder` | 回气散 | 1 | 回复 | 真元CD | 炼气 | 基础回气丹药，以凝露草为主材，缓缓补益真元。 | `mp_restore: 60` | 即时 | 30s | 99 | 1 | `dew_grass`, `spirit_spring_water` | 入门赠送 | 是 | — | 游戏原创 |
| `pill_juqi_dan` | 聚气丹 | 2 | 回复 | 真元CD | 炼气 | 聚拢散逸灵气为自身真元，回复较多法力。 | `mp_restore: 300` | 即时 | 45s | 50 | 2 | `qi_gathering_mushroom`, `beast_blood_mortal`, `spirit_stone_shard` | NPC 药铺 | 是 | — | 游戏原创 |
| `pill_yiqi_dan` | 益气丹 | 3 | 回复 | 真元CD | 筑基 | 补充真元、恢复法力的经典丹药，修仙界最常见的补给品。 | `mp_restore_pct: 0.30` | 即时 | 60s | 30 | 3 | `dew_grass`, `demon_drop_mid`, `snow_jade_ginseng_liquid` | 任务「药园差事」 | 是 | — | 原著来源 |
| `pill_buyuan_dan` | 补元丹 | 4 | 回复 | 真元CD | 结丹 | 大补真元的珍品丹药，可恢复大量法力。 | `mp_restore_pct: 0.50` | 即时 | 90s | 20 | 4 | `nine_turn_spirit_ginseng`, `demon_drop_high`, `ten_thousand_year_milk` | 副本「天南灵脉」掉落 | 否（拾取绑定） | 3 | 游戏原创 |

### 双回复苏

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_huichun_dan` | 回春丹 | 4 | 回复 | 双回CD | 结丹 | 恢复青春活力、同时补益气血与真元的神奇丹药。 | `hp_restore_pct: 0.25`, `mp_restore_pct: 0.25` | 即时 | 120s | 15 | 4 | `yang_revival_herb`, `beast_marrow_high`, `demon_drop_high` | 宗门兑换（贡献 5000） | 否（拾取绑定） | 5 | 原著来源 |
| `pill_tianyuan_huichun_dan` | 天元回春丹 | 5 | 回复 | 双回CD | 元婴 | 极品的双回复圣药，瞬间恢复大量气血与真元。 | `hp_restore_pct: 0.50`, `mp_restore_pct: 0.50` | 即时 | 180s | 10 | 5 | `celestial_element_fruit`, `demon_drop_perfect`, `spirit_tree_sap` | 全服事件「天降奇物」 | 否（拾取绑定） | 1 | 游戏原创 |
| `pill_huanhun_dan` | 还魂丹 | 4 | 回复 | 复活CD | 筑基 | 非战斗复活丹药，可在脱离战斗后令一名队友起死回生。 | `revive_out_of_combat: true` | 即时 | 600s | 5 | 4 | `seven_glow_lotus`, `nine_turn_spirit_ginseng`, `bodhi_flower` | 任务「起死回生」 | 否（拾取绑定） | 3 | 原著扩展 |
| `pill_jiuzhuan_huanhun_dan` | 九转还魂丹 | 5 | 回复 | 复活CD | 结丹 | 传说中的逆天丹药，可令刚陨落之人满状态原地复活。 | `revive_full: true`, `hp_restore_pct: 1.0`, `mp_restore_pct: 1.0` | 即时 | 600s | 3 | 5 | `bodhi_flower`, `seven_glow_lotus`, `beast_true_blood_perfect` | 秘境「天渊城」最终宝箱 | 否（拾取绑定） | 1 | 原著扩展 |

---

## 二、Buff 类（20 种）

> 战斗中的各类增益丹药，同名互斥，不可叠加服用。

### 攻击CD组 —— 五系攻击加成（同名互斥）

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_huojing_dan` | 火精丹 | 2 | Buff | 攻击CD | 炼气 | 激发火灵根潜力，提升火系术法伤害。 | `fire_dmg_bonus_pct: 0.12` | 300s | 180s | 20 | 2 | `crimson_essence_ganoderma`, `fire_essence_jujube`, `demon_drop_low` | NPC 药铺 | 是 | — | 原著来源 |
| `pill_jinfeng_dan` | 金锋丹 | 2 | Buff | 攻击CD | 炼气 | 将庚金之气凝聚于兵刃之上，提升金系术法与物理穿透。 | `metal_dmg_bonus_pct: 0.12` | 300s | 180s | 20 | 2 | `golden_sun_ganoderma`, `gold_gang_sand`, `demon_drop_low` | 任务「剑意初悟」 | 是 | — | 游戏原创 |
| `pill_shuiling_dan` | 水灵丹 | 2 | Buff | 攻击CD | 炼气 | 凝聚水灵之气，提升水系术法伤害与冰冻效果。 | `water_dmg_bonus_pct: 0.12` | 300s | 180s | 20 | 2 | `ice_spirit_fruit`, `yin_condense_herb`, `demon_drop_low` | NPC 药铺 | 是 | — | 游戏原创 |
| `pill_muhun_dan` | 木魂丹 | 2 | Buff | 攻击CD | 炼气 | 汲取草木菁华，提升木系术法伤害与持续治疗效果。 | `wood_dmg_bonus_pct: 0.12` | 300s | 180s | 20 | 2 | `companion_grass`, `wood_spirit_crystal`, `demon_drop_low` | 任务「草木有灵」 | 是 | — | 游戏原创 |
| `pill_tugang_dan` | 土罡丹 | 2 | Buff | 攻击CD | 炼气 | 引地罡之气护体，提升土系术法伤害与防御转化。 | `earth_dmg_bonus_pct: 0.12` | 300s | 180s | 20 | 2 | `bone_tempering_vine`, `earth_marrow_crystal`, `demon_drop_low` | NPC 药铺 | 是 | — | 游戏原创 |

### 防御CD组

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_zhuanggu_dan` | 壮骨丹 | 1 | Buff | 防御CD | 炼气 | 强化骨骼硬度，提升少量物理防御。 | `phys_def_bonus_pct: 0.08` | 300s | 180s | 30 | 1 | `bone_tempering_vine`, `beast_bone_mortal`, `spirit_spring_water` | 入门赠送 | 是 | — | 游戏原创 |
| `pill_jinsui_wan` | 金髓丸 | 2 | Buff | 防御CD | 炼气 | 以金行之力强化骨髓，提升物理与术法防御。 | `phys_def_bonus_pct: 0.15`, `magic_def_bonus_pct: 0.10` | 300s | 180s | 20 | 2 | `bone_tempering_vine`, `beast_bone_low`, `demon_drop_low` | NPC 药铺 | 是 | — | 原著来源 |
| `pill_tiegu_dan` | 铁骨丹 | 3 | Buff | 防御CD | 筑基 | 将铁精之气炼入骨骼，大幅提升物理防御。 | `phys_def_bonus_pct: 0.25` | 300s | 180s | 15 | 3 | `millennium_stalactite_milk`, `beast_bone_mid`, `iron_essence` | 任务「铜皮铁骨」 | 是 | 10 | 游戏原创 |
| `pill_guben_dan` | 固本丹 | 4 | Buff | 防御CD | 结丹 | 稳固根基、加固经脉，全面提升防御属性。 | `phys_def_bonus_pct: 0.30`, `magic_def_bonus_pct: 0.25` | 300s | 180s | 10 | 4 | `purple_vein_ginseng`, `beast_leather_high`, `demon_drop_high` | 宗门兑换（贡献 8000） | 否（拾取绑定） | 5 | 原著来源 |
| `pill_jingang_dan` | 金刚丹 | 5 | Buff | 防御CD | 元婴 | 肉身短暂化为金刚不坏，获得极高伤害减免。 | `all_dmg_reduction_pct: 0.40` | 300s | 300s | 5 | 5 | `millennium_stalactite_milk`, `beast_true_blood_perfect`, `dragon_scale_fruit` | 秘境「金刚法相」 | 否（拾取绑定） | 2 | 游戏原创 |

### 速度CD组

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_jifeng_dan` | 疾风丹 | 2 | Buff | 速度CD | 炼气 | 引风灵力入体，小幅提升移动速度。 | `move_speed_bonus_pct: 0.15` | 300s | 180s | 20 | 2 | `companion_grass`, `beast_tendon_low`, `spirit_stone_low` | NPC 药铺 | 是 | — | 游戏原创 |
| `pill_zhuifeng_dan` | 追云丹 | 3 | Buff | 速度CD | 筑基 | 身如追云逐电，中幅提升移动速度。 | `move_speed_bonus_pct: 0.25` | 300s | 180s | 15 | 3 | `wind_spirit_pearl`, `beast_tendon_mid`, `golden_wing_peng_feather` | 任务「追风逐电」 | 是 | 10 | 游戏原创 |
| `pill_liuguang_dan` | 流光丹 | 4 | Buff | 速度CD | 结丹 | 身化流光，大幅提升移动速度与闪避率。 | `move_speed_bonus_pct: 0.35`, `dodge_bonus_pct: 0.10` | 300s | 240s | 10 | 4 | `wind_spirit_pearl`, `golden_wing_peng_feather`, `beast_essence_blood_mid` | 副本「九天风谷」掉落 | 否（拾取绑定） | 5 | 游戏原创 |

### 回复速率CD组

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_juling_dan` | 聚灵丹 | 2 | Buff | 回复速率CD | 炼气 | 加速体表灵气吸收速率，提升气血自然恢复速度。 | `hp_regen_bonus_pct: 0.20` | 600s | 300s | 20 | 2 | `qi_gathering_mushroom`, `dew_grass`, `beast_blood_mortal` | NPC 药铺 | 是 | — | 原著来源 |
| `pill_naling_dan` | 纳灵丹 | 3 | Buff | 回复速率CD | 筑基 | 大幅提升真元自然恢复速度。 | `mp_regen_bonus_pct: 0.25` | 600s | 300s | 15 | 3 | `yellow_essence_ganoderma`, `wood_spirit_crystal`, `demon_drop_mid` | 任务「灵气纳体」 | 是 | 10 | 游戏原创 |
| `pill_shengling_dan` | 生灵丹 | 4 | Buff | 回复速率CD | 结丹 | 全面提升气血与真元的自然恢复速率。 | `hp_regen_bonus_pct: 0.30`, `mp_regen_bonus_pct: 0.30` | 600s | 300s | 10 | 4 | `nine_turn_spirit_ginseng`, `beast_marrow_high`, `purple_vein_ginseng` | 宗门兑换（贡献 6000） | 否（拾取绑定） | 5 | 游戏原创 |

### 神识CD组

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_xingshen_dan` | 醒神丹 | 2 | Buff | 神识CD | 炼气 | 清醒头脑、提振精神，提升神识上限与侦测范围。 | `spirit_bonus_pct: 0.10` | 300s | 180s | 20 | 2 | `pure_heart_flower`, `silver_horn_tree`, `spirit_spring_water` | NPC 药铺 | 是 | — | 原著来源 |
| `pill_dingshen_dan` | 定神丹 | 3 | Buff | 神识CD | 筑基 | 稳固神识、防止神识散乱，提升神识上限与抗性。 | `spirit_bonus_pct: 0.20`, `spirit_resist_pct: 0.15` | 300s | 180s | 15 | 3 | `pure_heart_flower`, `dew_grass`, `demon_drop_mid` | 任务「固守心神」 | 是 | 10 | 原著来源 |
| `pill_yanghun_dan` | 养魂丹 | 4 | Buff | 神识CD | 结丹 | 滋养魂魄、壮大元神，大幅提升神识上限。 | `spirit_bonus_pct: 0.30` | 300s | 240s | 10 | 4 | `soul_nurturing_wood`, `wan_meng_fruit`, `demon_drop_high` | 副本「古战场遗迹」掉落 | 否（拾取绑定） | 3 | 原著来源 |

### 修为CD组

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_ningqi_wan` | 凝气丸 | 2 | Buff | 修为CD | 炼气 | 凝聚空气中游离灵气入体，提升修为获取速率。 | `cult_speed_bonus_pct: 0.15` | 600s | 300s | 30 | 2 | `qi_gathering_mushroom`, `dew_grass`, `sweet_dew` | 入门赠送 | 是 | — | 原著来源 |
| `pill_juyuan_dan` | 聚元丹 | 3 | Buff | 修为CD | 筑基 | 将天地灵气汇聚于丹田，大幅提升修为获取速率。 | `cult_speed_bonus_pct: 0.30` | 600s | 300s | 20 | 3 | `yellow_essence_ganoderma`, `wood_spirit_crystal`, `demon_drop_mid` | NPC 药铺 | 是 | 10 | 游戏原创 |
| `pill_huiling_dan` | 汇灵丹 | 4 | Buff | 修为CD | 结丹 | 以自身为中心吸引天地灵气倒灌入体，极大提升修为获取。 | `cult_speed_bonus_pct: 0.50` | 600s | 360s | 10 | 4 | `sky_repair_ganoderma`, `demon_drop_high`, `spirit_tree_sap` | 宗门兑换（贡献 10000） | 否（拾取绑定） | 3 | 游戏原创 |

### 生产CD组

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_qiaoshou_dan` | 巧手丹 | 2 | Buff | 生产CD | 炼气 | 双手灵巧度大增，提升炼器成功率与品质概率。 | `forge_success_pct: 0.08`, `forge_quality_pct: 0.05` | 600s | 600s | 20 | 2 | `neon_grass`, `beast_tendon_low`, `earth_fire_vapor` | 任务「炼器学徒」 | 是 | — | 游戏原创 |
| `pill_danxin_dan` | 丹心丹 | 2 | Buff | 生产CD | 炼气 | 心无旁骛专注炼丹，提升炼丹成功率与品质概率。 | `alchemy_success_pct: 0.08`, `alchemy_quality_pct: 0.05` | 600s | 600s | 20 | 2 | `pure_heart_flower`, `dew_grass`, `earth_fire_vapor` | 任务「炼丹学徒」 | 是 | — | 游戏原创 |
| `pill_lingcai_dan` | 灵采丹 | 3 | Buff | 生产CD | 筑基 | 感知力提升，采集灵草时有更高概率获得额外材料。 | `gather_double_pct: 0.15`, `gather_speed_pct: 0.20` | 600s | 600s | 15 | 3 | `neon_grass`, `wood_spirit_crystal`, `sweet_dew` | NPC 药铺 | 是 | 10 | 游戏原创 |

### 掉率CD组

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_xunbao_dan` | 寻宝丹 | 3 | Buff | 掉率CD | 筑基 | 临时提升气运，增加击杀妖兽时稀有材料的掉落概率。 | `rare_drop_pct: 0.10` | 600s | 600s | 10 | 3 | `neon_grass`, `demon_drop_mid`, `gold_spirit_seed` | 副本「藏宝洞」掉落 | 是 | 5 | 游戏原创 |
| `pill_xianggui_dan` | 祥瑞丹 | 4 | Buff | 掉率CD | 结丹 | 祥瑞加身，大幅提升所有掉落物的品质与数量。 | `all_drop_quality_pct: 0.15`, `all_drop_quantity_pct: 0.10` | 600s | 600s | 5 | 4 | `sky_repair_ganoderma`, `demon_drop_high`, `beast_true_blood_perfect` | 任务「气运加身」 | 否（拾取绑定） | 3 | 游戏原创 |

### 抗性CD组

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_qingxin_dan` | 清心丹 | 2 | Buff | 抗性CD | 炼气 | 清除心魔杂念，提升心魔抗性与神识防御。 | `demon_resist_pct: 0.20` | 600s | 300s | 20 | 2 | `pure_heart_flower`, `silver_horn_tree`, `sweet_dew` | NPC 药铺 | 是 | — | 原著来源 |
| `pill_xuanbing_dan` | 玄冰丹 | 3 | Buff | 抗性CD | 筑基 | 抵御寒毒，提升冰属性抗性。 | `ice_resist_pct: 0.30` | 600s | 300s | 15 | 3 | `dark_ice_flower`, `ice_spirit_fruit`, `ice_po_crystal` | 任务「雪山试炼」 | 是 | 10 | 原著来源 |
| `pill_huohuan_dan` | 火浣丹 | 3 | Buff | 抗性CD | 筑基 | 火浣护体，提升火属性抗性。 | `fire_resist_pct: 0.30` | 600s | 300s | 15 | 3 | `crimson_essence_ganoderma`, `fire_essence_jujube`, `fire_spirit_crystal` | 任务「地火探险」 | 是 | 10 | 游戏原创 |
| `pill_leigang_dan` | 雷罡丹 | 4 | Buff | 抗性CD | 结丹 | 引雷罡锻体，提升雷属性抗性与天劫抵抗。 | `lightning_resist_pct: 0.30` | 600s | 300s | 10 | 4 | `heaven_thunder_pea`, `lightning_wood_heart`, `demon_drop_high` | 副本「雷劫之地」掉落 | 否（拾取绑定） | 5 | 游戏原创 |
| `pill_wanwu_qing` | 万毒清 | 4 | Buff | 抗性CD | 结丹 | 万毒不侵，提升毒素抗性与持续伤害减免。 | `poison_resist_pct: 0.40`, `poison_dmg_reduction_pct: 0.30` | 600s | 300s | 10 | 4 | `green_owl_venom`, `ghost_spider_silk`, `demon_drop_high` | 宗门兑换（贡献 7000） | 否（拾取绑定） | 5 | 游戏原创 |

---

## 三、突破类（8 种）

> 境界突破的核心消耗品，不可交易、一次消耗，每境界仅可服用一枚。

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_zhuji_dan` | 筑基丹 | 2 | 突破 | 无 | 炼气 | 突破炼气期至筑基期的关键丹药，凝聚真元冲击瓶颈。 | `breakthrough_pct: 0.25` | 即时 | — | 1 | 2 | `companion_grass`, `demon_drop_low`, `spirit_stone_low` (×50) | 任务「筑基之始」 | 否（拾取绑定） | — | 原著来源 |
| `pill_jiejin_dan` | 结金丹 | 3 | 突破 | 无 | 筑基 | 辅助碎丹凝形的关键丹药，提高筑基突破结丹的成功率。 | `breakthrough_pct: 0.20` | 即时 | — | 1 | 3 | `yellow_essence_ganoderma`, `demon_drop_mid`, `spirit_stone_mid` (×20) | 副本「丹道试炼」 | 否（拾取绑定） | — | 原著来源 |
| `pill_peiying_dan` | 培婴丹 | 4 | 突破 | 无 | 结丹 | 培育元婴的高阶丹药，大幅提升结丹突破元婴的成功率。 | `breakthrough_pct: 0.18` | 即时 | — | 1 | 4 | `jade_marrow_ganoderma`, `demon_drop_high`, `spirit_stone_high` (×10) | 宗门兑换（贡献 50000） | 否（拾取绑定） | — | 原著来源 |
| `pill_huashen_dan` | 化神丹 | 5 | 突破 | 无 | 元婴 | 碎婴化神的绝世丹药，以龙鳞果为主材，突破化神期的至宝。 | `breakthrough_pct: 0.15` | 即时 | — | 1 | 5 | `dragon_scale_fruit`, `demon_drop_perfect`, `spirit_stone_perfect` (×3) | 秘境「昆吾山」最终宝箱 | 否（拾取绑定） | — | 原著来源 |
| `pill_poxu_dan` | 破虚丹 | 5 | 突破 | 无 | 化神 | 勘破虚实、感知天地法则，突破化神至炼虚的辅助丹药。 | `breakthrough_pct: 0.12` | 即时 | — | 1 | 5 | `seven_glow_lotus`, `beast_soul_crystal_perfect`, `void_crystal` | 全服事件「空间裂隙」 | 否（拾取绑定） | — | 游戏原创 |
| `pill_heti_dan` | 合体丹 | 5 | 突破 | 无 | 炼虚 | 融合肉身与元神的至宝丹药，突破炼虚至合体的关键。 | `breakthrough_pct: 0.10` | 即时 | — | 1 | 5 | `nine_turn_spirit_ginseng`, `beast_true_blood_perfect`, `xi_rang` | 全服事件「天地异象」 | 否（拾取绑定） | — | 游戏原创 |
| `pill_dujie_dan` | 渡劫丹 | 5 | 突破 | 无 | 合体 | 对抗天劫的终极丹药，大幅提升合体突破大乘的渡劫成功率与天劫抗性。 | `breakthrough_pct: 0.08`, `tribulation_resist_pct: 0.25` | 即时 | — | 1 | 5 | `bodhi_flower`, `beast_soul_crystal_perfect`, `five_elements_crystal` | 传奇任务「渡劫飞升」 | 否（拾取绑定） | — | 游戏原创 |
| `pill_pohang_dan` | 破障丹 | 4 | 突破 | 无 | 筑基 | 突破修炼瓶颈的通用丹药，可在任意小境界瓶颈时使用。 | `breakthrough_bottleneck_pct: 0.30` | 即时 | — | 3 | 4 | `sky_repair_ganoderma`, `demon_drop_high`, `mingqing_spirit_water` | 副本「心魔幻境」掉落 | 否（拾取绑定） | 3 | 原著来源 |

---

## 四、永久提升类（10 种）

> 服用后永久提升角色基础属性，每种丹药有终生服用上限。

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_yanshou_dan` | 延寿丹 | 4 | 永久 | 无 | 筑基 | 延年益寿的珍品丹药，服用后可增寿五十年。终生限服 10 枚。 | `lifespan_bonus: 50` | 永久 | — | 3 | 4 | `longevity_fruit`, `jade_marrow_ganoderma`, `seven_glow_lotus` | 任务「寿元将尽」 | 否（拾取绑定） | 3 | 原著来源 |
| `pill_tianyuan_dan` | 天元丹 | 5 | 永久 | 无 | 元婴 | 仙界流传的延寿至宝，一枚可增寿百年。终生限服 10 枚。 | `lifespan_bonus: 100` | 永久 | — | 1 | 5 | `celestial_element_fruit`, `longevity_fruit`, `beast_true_blood_perfect` | 全服事件「天降奇物」 | 否（拾取绑定） | 1 | 原著来源 |
| `pill_jinsui_wan_zhen` | 金髓丸·真 | 3 | 永久 | 无 | 筑基 | 金髓丸的永久强化版本，彻底改造骨髓，永久提升体质与气血上限。终生限服 20 枚。 | `max_hp_bonus: 150`, `phys_def_bonus: 10` | 永久 | — | 10 | 3 | `millennium_stalactite_milk`, `beast_bone_mid`, `golden_sun_ganoderma` | 任务「脱胎换骨」 | 否（拾取绑定） | 5 | 游戏原创 |
| `pill_yugu_dan` | 玉骨丹 | 4 | 永久 | 无 | 筑基 | 以玉髓芝精华淬炼全身骨骼，骨骼如玉坚不可摧，永久提升物理防御。终生限服 20 枚。 | `phys_def_bonus: 25` | 永久 | — | 10 | 4 | `jade_marrow_ganoderma`, `millennium_stalactite_milk`, `beast_marrow_high` | 宗门兑换（贡献 15000） | 否（拾取绑定） | 3 | 游戏原创 |
| `pill_xuanyuan_dan` | 玄元丹 | 4 | 永久 | 无 | 结丹 | 以玄元之力扩充经脉气血，永久提升气血上限。终生限服 20 枚。 | `max_hp_bonus: 300` | 永久 | — | 10 | 4 | `purple_vein_ginseng`, `beast_heart_high`, `demon_drop_high` | 任务「气血如海」 | 否（拾取绑定） | 5 | 游戏原创 |
| `pill_shihai_dan` | 识海丹 | 4 | 永久 | 无 | 筑基 | 拓展识海范围，永久提升神识上限。终生限服 15 枚。 | `max_spirit_bonus: 20` | 永久 | — | 10 | 4 | `wan_meng_fruit`, `soul_nurturing_wood`, `demon_drop_high` | 副本「识海秘境」掉落 | 否（拾取绑定） | 3 | 游戏原创 |
| `pill_butian_dan` | 补天丹 | 5 | 永久 | 无 | 结丹 | 修补先天不足的神丹，可微幅提升灵根纯度。终生限服 5 枚。 | `spirit_root_purity_bonus: 3` | 永久 | — | 1 | 5 | `sky_repair_ganoderma`, `mingqing_spirit_water`, `chaos_stone` | 传奇任务「补天之路」 | 否（拾取绑定） | 1 | 原著来源 |
| `pill_yufeng_dan` | 御风丹 | 3 | 永久 | 无 | 筑基 | 将风灵之力炼入双腿经脉，永久提升移动速度。终生限服 10 枚。 | `move_speed_bonus: 3` | 永久 | — | 10 | 3 | `wind_spirit_pearl`, `beast_tendon_mid`, `companion_grass` | 任务「御风而行」 | 否（拾取绑定） | 5 | 游戏原创 |
| `pill_xuanbing_dan_zhen` | 玄冰丹·真 | 3 | 永久 | 无 | 筑基 | 玄冰丹的永久强化版，将寒冰之力融入血脉，永久提升冰属性抗性。终生限服 15 枚。 | `ice_resist_bonus: 5` | 永久 | — | 10 | 3 | `dark_ice_flower`, `ice_po_crystal`, `beast_blood_low` | 任务「冰髓炼体」 | 否（拾取绑定） | 5 | 游戏原创 |
| `pill_huojing_dan_zhen` | 火精丹·真 | 3 | 永久 | 无 | 筑基 | 火精丹的永久强化版，将火焰之力融入经脉，永久提升火属性抗性。终生限服 15 枚。 | `fire_resist_bonus: 5` | 永久 | — | 10 | 3 | `crimson_essence_ganoderma`, `fire_spirit_crystal`, `beast_blood_low` | 任务「火灵锻体」 | 否（拾取绑定） | 5 | 游戏原创 |

---

## 五、功能类（10 种）

> 非战斗场景下的特殊功能丹药，各有独特效果。

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_jiedu_dan` | 解毒丹 | 2 | 功能 | 无 | 炼气 | 解除中低级毒素的通用解毒丹药，对大部分妖兽毒、植物毒有效。 | `cure_poison_lvl: 3` | 即时 | 30s | 30 | 2 | `silver_horn_tree`, `pure_heart_flower`, `spirit_spring_water` | NPC 药铺 | 是 | — | 原著扩展 |
| `pill_huaxi_dan` | 化息丹 | 3 | 功能 | 无 | 筑基 | 隐匿全身气息，瞒过高一个境界修士的神识探查。 | `stealth_lvl: 2` | 600s | 300s | 10 | 3 | `gold_spirit_seed`, `neon_grass`, `demon_drop_mid` | 任务「潜行匿踪」 | 否（拾取绑定） | 5 | 原著来源 |
| `pill_huicheng_fu_dan` | 回城符丹 | 1 | 功能 | 无 | 炼气 | 捏碎后瞬间传送回绑定城镇的传送阵。 | `teleport_to_bind_city: true` | 即时 | 600s | 20 | 1 | `silver_horn_tree`, `spirit_stone_shard` (×5) | 入门赠送 | 是 | — | 游戏原创 |
| `pill_xisui_dan` | 洗髓丹 | 4 | 功能 | 无 | 筑基 | 洗筋伐髓，重置全部术法加点，返还所有已消耗的术法点数。 | `reset_skill_points: true` | 即时 | 3600s | 3 | 4 | `purple_vein_ginseng`, `mingqing_spirit_water`, `beast_marrow_high` | 宗门兑换（贡献 20000） | 否（拾取绑定） | 3 | 游戏原创 |
| `pill_jingzui_dan` | 净罪丹 | 3 | 功能 | 无 | 筑基 | 洗去自身业力罪恶，降低罪恶值。 | `sin_reduce: 200` | 即时 | 3600s | 10 | 3 | `pure_heart_flower`, `sweet_dew`, `spirit_stone_low` (×10) | NPC 功德堂 | 是 | — | 游戏原创 |
| `pill_jianbao_dan` | 鉴宝丹 | 2 | 功能 | 无 | 炼气 | 短时提升灵目能力，可查看未鉴定装备的基础属性范围。 | `identify_item: true` | 60s | 60s | 20 | 2 | `neon_grass`, `silver_horn_tree`, `spirit_spring_water` | NPC 杂货铺 | 是 | — | 游戏原创 |
| `pill_qingxin_zhou_dan` | 清心咒丹 | 4 | 功能 | 无 | 结丹 | 以清心咒力洗涤经脉，立即清除所有术法冷却时间（不含法宝CD）。 | `clear_skill_cd: true` | 即时 | 1800s | 3 | 4 | `soul_nurturing_wood`, `bodhi_flower`, `pure_heart_flower` | 副本「大衍幻境」掉落 | 否（拾取绑定） | 3 | 游戏原创 |
| `pill_jingang_fu_dan` | 金刚符丹 | 5 | 功能 | 无 | 结丹 | 化丹为符，在身上形成一层金刚护罩，短暂免疫所有伤害。 | `invincible_duration: 3s` | 3s | 600s | 3 | 5 | `dragon_scale_fruit`, `purple_vein_ginseng`, `beast_true_blood_perfect` | 秘境「金刚寺」宝箱 | 否（拾取绑定） | 2 | 游戏原创 |
| `pill_qiyu_fu_dan` | 祈雨符丹 | 2 | 功能 | 无 | 炼气 | 化丹为符，召唤一场灵雨，浇灌灵田或熄灭火焰。 | `summon_rain: 30s` | 30s | 600s | 10 | 2 | `dew_grass`, `spirit_spring_water`, `spirit_stone_low` | 任务「风调雨顺」 | 是 | — | 游戏原创 |
| `pill_quwu_fu_dan` | 驱雾符丹 | 2 | 功能 | 无 | 炼气 | 化丹为符，驱散周身迷雾瘴气，看清隐藏路径。 | `clear_fog: 30s` | 30s | 600s | 10 | 2 | `companion_grass`, `silver_horn_tree`, `spirit_stone_low` | 任务「雾散天明」 | 是 | — | 游戏原创 |

---

## 六、魔道类（5 种）

> 以特殊（多为禁忌）手法炼制的丹药，效果强大但伴随严重副作用。

| id | 名称 | 品阶 | 功能分类 | CD组 | 使用境界下限 | 效果描述 | 数值公式 | 持续时间 | CD时间 | 最大堆叠 | 炼制难度 | 主要材料 | 丹方获取 | 丹方可交易 | 丹方感悟上限 | 备注 |
|----|------|------|---------|------|------------|---------|---------|---------|-------|---------|---------|---------|---------|-----------|------|------|
| `pill_xuening_wuxing_dan` | 血凝五行丹 | 5 | 魔道 | 无 | 结丹 | 汇聚五行生灵之血炼制的魔道至宝，服用后五行灵根属性全面提升，但会沾染血煞之气、引来正道追杀。 | `all_element_bonus: 5`, `sin_bonus: 500` | 永久 | — | 1 | 5 | `blood_spirit_herb`, `demon_drop_high`, `beast_true_blood_perfect` | 魔道任务「血祭五行」 | 否（拾取绑定） | 1 | 原著来源 |
| `pill_baoling_dan` | 爆灵丹 | 4 | 魔道 | 无 | 筑基 | 引爆丹田中储存的全部灵力，短时间内爆发极大战斗力，但服用后经脉受损、修为倒退。 | `atk_bonus_pct: 0.80`, `after_effect_hp_pct: -0.30`, `after_effect_cult_loss: 0.10` | 120s | 3600s | 3 | 4 | `crimson_essence_ganoderma`, `demon_drop_high`, `beast_essence_blood_mid` | 魔道 NPC 黑市 | 是 | 5 | 游戏原创 |
| `pill_tianmo_jieti_dan` | 天魔解体丹 | 5 | 魔道 | 无 | 结丹 | 以天魔解体大法为原理，压榨肉身全部潜力，全属性暴涨。药效过后肉身濒临崩溃，需长时间休养。 | `all_stat_bonus_pct: 0.50`, `after_effect_all_stat_pct: -0.40` | 180s | 7200s | 1 | 5 | `blood_spirit_herb`, `beast_true_blood_perfect`, `chaos_stone` | 魔道任务「天魔降临」 | 否（拾取绑定） | 1 | 游戏原创 |
| `pill_fengxue_dan` | 疯血丹 | 4 | 魔道 | 无 | 筑基 | 激发体内妖兽血脉中的狂性，攻速与暴击大幅提升，但会失去部分理智（混乱状态概率）。 | `atk_speed_bonus_pct: 0.40`, `crit_rate_bonus_pct: 0.20`, `confuse_chance: 0.15` | 120s | 3600s | 5 | 4 | `beast_essence_blood_mid`, `blood_spirit_herb`, `demon_drop_mid` | 魔道 NPC 黑市 | 是 | 3 | 游戏原创 |
| `pill_ranhun_dan` | 燃魂丹 | 4 | 魔道 | 无 | 筑基 | 燃烧部分神魂换取惊人的术法伤害，药效过后神识大幅降低且无法自然恢复（需养魂木/丹药修复）。 | `magic_dmg_bonus_pct: 0.60`, `after_effect_spirit_pct: -0.30` | 120s | 7200s | 3 | 4 | `soul_nurturing_wood`, `blood_spirit_herb`, `demon_drop_high` | 魔道 NPC 黑市 | 是 | 3 | 游戏原创 |

---

## 统计

| 分类 | 数量 | 占总量 |
|------|------|--------|
| 一、回复类 | 12 | 18.5% |
| 二、Buff类 | 20 | 30.8% |
| 三、突破类 | 8 | 12.3% |
| 四、永久提升类 | 10 | 15.4% |
| 五、功能类 | 10 | 15.4% |
| 六、魔道类 | 5 | 7.7% |
| **合计** | **65** | **100%** |

### 品阶分布

| 品阶 | 数量 |
|------|------|
| 凡品（1） | 5 |
| 下品（2） | 20 |
| 中品（3） | 16 |
| 上品（4） | 16 |
| 极品（5） | 12 |

### 原著标注统计

| 标注 | 数量 |
|------|------|
| 原著来源 | 14 |
| 原著扩展 | 3 |
| 游戏原创 | 48 |

*（内容由AI生成，仅供参考）*
*（内容由AI生成，仅供参考）*
