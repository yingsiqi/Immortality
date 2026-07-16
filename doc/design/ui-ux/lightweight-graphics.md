# 轻量化图形实现指南

## 概述

针对《凡人修仙传》MMORPG的客户端渲染需求，本文档提供了一套基于 Tuanjie Engine（团结引擎）的完整图形解决方案，旨在实现高性能、低内存占用的视觉效果，同时保持修仙主题的美术风格。

## 设计原则

### 核心理念
- **性能优先**：使用 TuanjieGI 全局动态实时光照，无需预烘焙即可呈现端游级光影
- **动态生成**：基于特征码实时生成 Sprite 和 Material，避免大量静态资源
- **风格统一**：去卡通化设计，融入水墨、古典元素
- **性能保障**：60fps 流畅体验，支持万人同服
- **跨端部署**：一次开发，多端发布（PC、移动端、WebGL）

## 技术方案

### 1. 动态图标生成系统

#### 特征码映射机制
```csharp
// 物品特征码格式：[五行属性]_[品阶]_[状态]
// 示例："fire_003_damaged" = 火系三阶破损法宝

using UnityEngine;
using UnityEditor;

public class IconGenerator : MonoBehaviour
{
    // 基础形状 Prefab 库
    [SerializeField] private GameObject[] weaponPrefabs;
    [SerializeField] private GameObject[] pillPrefabs;
    [SerializeField] private GameObject[] artifactPrefabs;

    /// <summary>
    /// 根据特征码动态生成图标 Sprite
    /// </summary>
    public Sprite GenerateIcon(string featureCode)
    {
        var parts = featureCode.Split('_');
        string element = parts[0];   // 五行属性
        int tier = int.Parse(parts[1]); // 品阶
        string status = parts[2];    // 状态

        // 获取基础形状
        GameObject baseShape = GetBaseShape(tier);

        // 应用五行属性材质
        Material elementMaterial = GetElementMaterial(element);
        baseShape.GetComponent<MeshRenderer>().material = elementMaterial;

        // 应用状态修饰（破损裂纹、强化光效等）
        ApplyStatusModifier(baseShape, status);

        // 截取 RenderTexture 生成 Sprite
        return CaptureToSprite(baseShape);
    }

    private Material GetElementMaterial(string element)
    {
        // 五行属性对应的 Shader 材质
        return element switch
        {
            "fire" => new Material(Shader.Find("Custom/ElementFire")),
            "water" => new Material(Shader.Find("Custom/ElementWater")),
            "wood" => new Material(Shader.Find("Custom/ElementWood")),
            "metal" => new Material(Shader.Find("Custom/ElementMetal")),
            "earth" => new Material(Shader.Find("Custom/ElementEarth")),
            _ => new Material(Shader.Find("Standard"))
        };
    }

    private void ApplyStatusModifier(GameObject obj, string status)
    {
        switch (status)
        {
            case "damaged":
                // 添加破损裂纹纹理叠加
                obj.AddComponent<CrackOverlay>();
                break;
            case "enhanced":
                // 添加强化金光环 Particle System
                var glow = obj.AddComponent<ParticleSystem>();
                ConfigureEnhancementGlow(glow);
                break;
            case "blessed":
                // 添加祝福动画效果
                obj.AddComponent<BlessedEffect>();
                break;
        }
    }

    private Sprite CaptureToSprite(GameObject obj)
    {
        // 使用 RenderTexture 截取 3D 模型生成 2D Sprite
        var rt = RenderTexture.GetTemporary(128, 128, 24);
        var cam = SetupCaptureCamera(obj, rt);
        cam.Render();

        // 读取 RenderTexture 到 Texture2D
        var tex = new Texture2D(128, 128, TextureFormat.RGBA32, false);
        RenderTexture.active = rt;
        tex.ReadPixels(new Rect(0, 0, 128, 128), 0, 0);
        tex.Apply();

        RenderTexture.ReleaseTemporary(rt);
        return Sprite.Create(tex, new Rect(0, 0, 128, 128), Vector2.one * 0.5f);
    }
}
```

#### 分层复合图标系统
```csharp
// 图标层级结构（使用 Unity 的 Layered Sprite 系统）
[CreateAssetMenu(fileName = "IconConfig", menuName = "Immortality/Icon Configuration")]
public class IconConfig : ScriptableObject
{
    public Sprite baseLayer;       // 基础形状层（武器轮廓、丹药形状）
    public Sprite elementLayer;     // 五行属性层（火焰纹理、水波效果）
    public Sprite tierLayer;        // 品阶标识层（光环数量、材质质感）
    public Sprite statusLayer;      // 状态修饰层（破损裂纹、强化光效）
    public Sprite animationLayer;   // 动画效果层（灵力波动、境界威压）

    public Color elementTint = Color.white;
    public float elementOpacity = 0.8f;
}

// 动态组合图标组件
public class CompositeIcon : MonoBehaviour
{
    [SerializeField] private IconConfig config;
    [SerializeField] private SpriteRenderer[] layers = new SpriteRenderer[5];

    public void Render(IconConfig newConfig)
    {
        config = newConfig;

        // 基础形状层
        layers[0].sprite = config.baseLayer;

        // 五行属性层
        layers[1].sprite = config.elementLayer;
        layers[1].color = new Color(config.elementTint.r, config.elementTint.g,
            config.elementTint.b, config.elementOpacity);

        // 品阶标识层
        layers[2].sprite = config.tierLayer;

        // 状态修饰层
        layers[3].sprite = config.statusLayer;

        // 动画效果层
        layers[4].sprite = config.animationLayer;
    }
}
```

### 2. 渲染管线配置

#### UGUI 配置化渲染（UI 界面）
```csharp
using UnityEngine;
using UnityEngine.UI;

// 声明式图标定义组件
[RequireComponent(typeof(Image))]
public class ArtifactIcon : MonoBehaviour
{
    [Header("基础配置")]
    public string artifactId;
    public ElementType elementType;
    public int tier;
    public ArtifactStatus status;

    [Header("引用")]
    [SerializeField] private Image baseImage;
    [SerializeField] private Image elementOverlay;
    [SerializeField] private Image tierIndicator;
    [SerializeField] private ParticleSystem statusEffect;

    private void Awake()
    {
        RenderIcon();
    }

    public void RenderIcon()
    {
        // 基础形状
        baseImage.sprite = IconDatabase.GetBaseSprite(artifactId);

        // 五行属性效果
        elementOverlay.sprite = IconDatabase.GetElementSprite(elementType);
        elementOverlay.color = GetElementColor(elementType);

        // 品阶光环
        tierIndicator.sprite = IconDatabase.GetTierSprite(tier);

        // 状态修饰
        if (status == ArtifactStatus.Enhanced)
        {
            statusEffect.Play();
        }
    }

    private Color GetElementColor(ElementType element)
    {
        return element switch
        {
            ElementType.Fire => new Color(1f, 0.34f, 0.13f),    // 朱砂红
            ElementType.Water => new Color(0.13f, 0.59f, 0.95f), // 青蓝色
            ElementType.Wood => new Color(0.30f, 0.69f, 0.31f),  // 翠绿色
            ElementType.Metal => new Color(1f, 0.84f, 0f),        // 赤金色
            ElementType.Earth => new Color(0.47f, 0.33f, 0.28f),  // 赭石色
            _ => Color.white
        };
    }
}

public enum ElementType { Fire, Water, Wood, Metal, Earth }
public enum ArtifactStatus { Normal, Damaged, Enhanced, Blessed }
```

#### TuanjieGI 高性能渲染（3D 场景）
```csharp
using UnityEngine;
using UnityEngine.Rendering;

// 场景渲染管理器
public class SceneRenderManager : MonoBehaviour
{
    [Header("TuanjieGI 配置")]
    [SerializeField] private bool enableTuanjieGI = true;
    [SerializeField] private float giIntensity = 1.0f;

    [Header("虚拟几何体")]
    [SerializeField] private bool enableVirtualGeometry = true;
    [SerializeField] private int maxTriangleBudget = 50_000_000;

    [Header("TJSR 超分辨率")]
    [SerializeField] private bool enableTJSR = true;

    private void Start()
    {
        ConfigureRendering();
    }

    private void ConfigureRendering()
    {
        var rp = UnityEngine.Rendering.GraphicsSettings.currentRenderPipeline;

        // 开启 TuanjieGI 全局动态实时光照
        if (enableTuanjieGI)
        {
            // TuanjieGI 一键开启，无需预烘焙
            Shader.SetGlobalFloat("_GI_Intensity", giIntensity);
        }

        // 配置虚拟几何体（移动端也能渲染上亿三角面）
        if (enableVirtualGeometry)
        {
            QualitySettings.maximumLODLevel = 0;
        }

        // TJSR 超分辨率（自动调用平台原生超分能力）
        if (enableTJSR)
        {
            // TJSR 自适应不同硬件平台
        }
    }

    /// <summary>
    /// LOD（细节层次）管理
    /// </summary>
    public void ConfigureLOD(GameObject obj, float distance)
    {
        var lodGroup = obj.GetComponent<LODGroup>();
        if (lodGroup == null) return;

        if (distance > 100f)
        {
            // 远距离：简化为 Billboard
            lodGroup.ForceLOD(3);
        }
        else if (distance > 50f)
        {
            // 中距离：低精度模型
            lodGroup.ForceLOD(1);
        }
        else
        {
            // 近距离：完整模型 + 特效
            lodGroup.ForceLOD(0);
        }
    }
}
```

### 3. 美术风格控制

#### 五行配色体系（USS 变量 / ScriptableObject 主题）
```csharp
[CreateAssetMenu(fileName = "ThemeConfig", menuName = "Immortality/Theme Config")]
public class ThemeConfig : ScriptableObject
{
    [Header("五行主色调")]
    public Color elementFire = new Color(1f, 0.34f, 0.13f);    // 火：朱砂红
    public Color elementWater = new Color(0.13f, 0.59f, 0.95f); // 水：青蓝色
    public Color elementWood = new Color(0.30f, 0.69f, 0.31f);  // 木：翠绿色
    public Color elementMetal = new Color(1f, 0.84f, 0f);        // 金：赤金色
    public Color elementEarth = new Color(0.47f, 0.33f, 0.28f);  // 土：赭石色

    [Header("境界阶级色彩")]
    public Color tierMortal = new Color(0.62f, 0.62f, 0.62f);     // 凡人：灰色
    public Color tierQi = new Color(0.80f, 0.86f, 0.24f);         // 炼气：青色
    public Color tierFoundation = new Color(1f, 0.59f, 0f);      // 筑基：橙色
    public Color tierCore = new Color(0.61f, 0.15f, 0.69f);      // 结丹：紫色
    public Color tierNascent = new Color(1f, 0.84f, 0f);          // 元婴：金色
    public Color tierSpirit = new Color(0f, 0.74f, 0.83f);       // 化神：青蓝
    public Color tierVoid = new Color(0.91f, 0.12f, 0.39f);      // 炼虚：玫红
    public Color tierUnity = new Color(0.25f, 0.31f, 0.71f);     // 合体：靛蓝

    [Header("UI 主题色")]
    public Color primaryColor = new Color(0.29f, 0.56f, 0.89f);   // 仙境蓝
    public Color secondaryColor = new Color(0.56f, 0.27f, 0.68f); // 灵气紫
    public Color backgroundColor = new Color(0.10f, 0.10f, 0.12f); // 深色背景
    public Color textColor = Color.white;
}
```

#### 水墨风格 Shader
```csharp
using UnityEngine;

// 水墨晕染自定义 Shader（需创建对应 Shader 文件）
// Shader 文件路径：Assets/Shaders/InkWash.shader
/*
Shader "Custom/InkWash"
{
    Properties
    {
        _MainTex ("Main Texture", 2D) = "white" {}
        _InkIntensity ("Ink Intensity", Range(0, 1)) = 0.8
        _NoiseScale ("Noise Scale", Float) = 0.3
        _BlurRadius ("Blur Radius", Float) = 1.0
        _PaperTint ("Paper Tint", Color) = (0.95, 0.90, 0.80, 1)
    }

    SubShader
    {
        Tags { "RenderType" = "Opaque" }
        LOD 200

        Pass
        {
            // 噪声扰动模拟墨迹扩散
            // 高斯模糊模拟晕染
            // 饱和度降低模拟水墨单色
            // 纸张纹理叠加
        }
    }
}
*/

// 水墨风格材质管理器
public class InkWashMaterialManager : MonoBehaviour
{
    [SerializeField] private Material inkWashMaterial;
    [SerializeField] private Material paperTextureMaterial;
    [SerializeField] private Material spiritualGlowMaterial;

    public Material GetInkWashMaterial(Texture mainTex, float intensity = 0.8f)
    {
        var mat = new Material(inkWashMaterial);
        mat.SetTexture("_MainTex", mainTex);
        mat.SetFloat("_InkIntensity", intensity);
        return mat;
    }

    public Material GetSpiritualGlowMaterial(Color glowColor, float intensity = 1.0f)
    {
        var mat = new Material(spiritualGlowMaterial);
        mat.SetColor("_GlowColor", glowColor);
        mat.SetFloat("_GlowIntensity", intensity);
        return mat;
    }
}
```

### 4. 性能优化策略

#### 缓存与预加载
```csharp
using UnityEngine;
using UnityEngine.AddressableAssets;

public class IconCacheManager : MonoBehaviour
{
    private static IconCacheManager _instance;
    public static IconCacheManager Instance => _instance;

    // LRU 缓存
    private readonly LRUCache<string, Sprite> _cache = new(500);

    [Header("预加载配置")]
    [SerializeField] private AssetLabelReference[] preloadLabels;

    private void Awake()
    {
        _instance = this;
    }

    private async void Start()
    {
        await PreloadCommonIcons();
    }

    /// <summary>
    /// 预生成常用图标
    /// </summary>
    private async Task PreloadCommonIcons()
    {
        foreach (var label in preloadLabels)
        {
            var handle = Addressables.LoadAssetsAsync<Sprite>(label, null);
            await handle.Task;

            foreach (var sprite in handle.Result)
            {
                _cache.Put(sprite.name, sprite);
            }
        }
    }

    /// <summary>
    /// LOD（细节层次）管理
    /// </summary>
    public Sprite GetIconByDistance(string featureCode, float distance)
    {
        if (distance > 100f)
        {
            // 远距离：简化为纯色圆点
            return GetSimpleIcon(featureCode);
        }
        else if (distance > 50f)
        {
            // 中距离：基础 Sprite
            return GetBasicIcon(featureCode);
        }
        else
        {
            // 近距离：完整特效
            return GetFullIcon(featureCode);
        }
    }

    public Sprite GetCached(string key)
    {
        if (_cache.TryGetValue(key, out var sprite))
            return sprite;
        return null;
    }

    public void Cache(string key, Sprite sprite)
    {
        _cache.Put(key, sprite);
    }
}

/// <summary>
/// 简易 LRU 缓存
/// </summary>
public class LRUCache<TKey, TValue> where TValue : class
{
    private readonly int _capacity;
    private readonly LinkedList<KeyValuePair<TKey, TValue>> _list = new();
    private readonly Dictionary<TKey, LinkedListNode<KeyValuePair<TKey, TValue>>> _dict = new();

    public LRUCache(int capacity)
    {
        _capacity = capacity;
    }

    public void Put(TKey key, TValue value)
    {
        if (_dict.TryGetValue(key, out var node))
        {
            _list.Remove(node);
            node.Value = new KeyValuePair<TKey, TValue>(key, value);
            _list.AddFirst(node);
        }
        else
        {
            if (_dict.Count >= _capacity)
            {
                var last = _list.Last;
                _list.RemoveLast();
                _dict.Remove(last.Value.Key);
            }
            var newNode = new LinkedListNode<KeyValuePair<TKey, TValue>>(
                new KeyValuePair<TKey, TValue>(key, value));
            _list.AddFirst(newNode);
            _dict[key] = newNode;
        }
    }

    public bool TryGetValue(TKey key, out TValue value)
    {
        if (_dict.TryGetValue(key, out var node))
        {
            _list.Remove(node);
            _list.AddFirst(node);
            value = node.Value.Value;
            return true;
        }
        value = default;
        return false;
    }
}
```

#### 异步并行生成（UniTask）
```csharp
using Cysharp.Threading.Tasks;
using UnityEngine;

public class AsyncIconGenerator : MonoBehaviour
{
    /// <summary>
    /// 批量异步生成图标
    /// </summary>
    public async UniTask<Dictionary<string, Sprite>> BatchGenerate(string[] featureCodes)
    {
        var results = new Dictionary<string, Sprite>();

        // 分帧生成，避免卡顿
        await UniTask.WhenAll(
            featureCodes.Select(code => GenerateOnNextFrame(code, results))
        );

        return results;
    }

    private async UniTask GenerateOnNextFrame(string code, Dictionary<string, Sprite> results)
    {
        await UniTask.Yield(); // 等待下一帧
        var sprite = IconGenerator.Instance.GenerateIcon(code);
        results[code] = sprite;
    }
}
```

## 资源管理推荐

### Sprite 图标库
| 资源类型 | 说明 | 使用方式 |
|----------|------|----------|
| Addressable Assets | 按需加载图标 Sprite | `Addressables.LoadAssetAsync<Sprite>(key)` |
| Sprite Atlas | 打包图集减少 DrawCall | 通过 Sprite Atlas 配置自动合批 |
| AI Graph | 使用 AI 生成 2D/3D 美术资产 | `Window → AI Graph` 输入描述生成 |

### 工具链
```bash
# NuGet 包管理（服务端）
dotnet add package Npgsql
dotnet add package StackExchange.Redis

# Unity Package Manager（客户端）
# 通过 Window → Package Manager 安装：
# - Addressables
# - AI Graph
# - Unity UI (UGUI)
# - Cinemachine (镜头系统)
# - DOTween (动画插件)

# Tuanjie 引擎构建
# File → Build Settings → 选择目标平台 → Build
```

## 实施建议

### 开发阶段
1. **原型验证**：先实现基础的五行图标生成器（ScriptableObject + SpriteRenderer）
2. **性能测试**：在 1000+ 图标场景下使用 Profiler 测试帧率
3. **美术迭代**：使用 AI Graph 快速生成美术资产原型，与美术团队协作调整
4. **缓存优化**：实现 Addressable Assets 智能预加载和 LRU 缓存

### 部署策略
1. **渐进式加载**：Addressable Assets 按需加载核心 UI 图标
2. **跨端部署**：Tuanjie 引擎一次开发，发布到 PC、移动端、WebGL
3. **版本控制**：Addressable Assets 支持远程更新，无需重新发版
4. **降级方案**：低端设备自动降低 LOD、关闭 TuanjieGI、启用 TJSR 超分辨率

## 性能指标

### 目标性能
- **内存占用**：<150MB（20,000+ 图标场景，含 Addressable 缓存）
- **生成速度**：<5ms/图标（异步分帧生成）
- **渲染帧率**：55-60fps（万级物品列表，使用 Sprite Atlas 合批）
- **首包大小**：<50MB（核心资源，其余通过 Addressable 远程加载）

### 监控指标
```csharp
using UnityEngine;
using UnityEngine.Profiling;

public class GraphicsPerformanceMonitor : MonoBehaviour
{
    private float _updateInterval = 1f;
    private float _timer = 0f;

    private void Update()
    {
        _timer += Time.deltaTime;
        if (_timer >= _updateInterval)
        {
            float fps = 1f / Time.smoothDeltaTime;
            long usedMemory = Profiler.GetTotalAllocatedMemoryLong() / (1024 * 1024);

            Debug.Log($"[Performance] FPS: {fps:F1} | Memory: {usedMemory}MB | DrawCalls: {Profiler.drawCallCount}");

            _timer = 0f;
        }
    }
}
```

通过这套基于 Tuanjie Engine 的图形方案，可以在保持修仙主题美术风格的同时，实现高性能的客户端渲染，满足万人同服的技术需求，并支持跨端部署。
