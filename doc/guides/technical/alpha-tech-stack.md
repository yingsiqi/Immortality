# Alpha版本技术栈总览

## 概述

基于Immortality修仙游戏的轻量化图形定位，Alpha版本采用Tuanjie引擎（团结引擎）技术栈，重点关注快速开发、成本控制和用户体验。

## 🎯 **技术栈定位**

- **游戏类型**: 轻量化图形修仙游戏
- **美术风格**: Tuanjie 引擎渲染（Sprite + Particle System + TuanjieGI 全局光照）
- **架构原则**: 事件驱动 + 微服务 + 实时通信
- **开发目标**: 快速迭代 + 低成本部署

## 🚀 **核心技术栈**

### 客户端技术栈

#### **基础框架**
- **Tuanjie Engine (UGUI / UI Toolkit)** + **C#** - 现代化游戏客户端开发
- **Tuanjie Engine Editor** - 引擎编辑器与构建工具
- **Unity UI styling (USS / UGUI)** - UI样式系统

#### **图形渲染技术**
```
核心图形库：
├── Unity UI / SpriteRenderer / Vector Graphics - 轻量化矢量图形与精灵渲染
├── Unity Canvas / Particle System - 复杂交互场景与粒子特效
├── Unity Animation System / DOTween - 流畅动画效果
└── Lottie for Unity (com.unity.uiextensions) - JSON动画资源
```

**图形应用场景**:
- **修炼系统**: Sprite进度条 + 境界图标 + 灵力流动效果
- **战斗系统**: 技能图标 + 伤害数字 + 粒子特效
- **角色面板**: 属性雷达图 + 装备展示 + 状态图标
- **地图系统**: 区域地图 + 位置标记 + 探索进度

#### **状态管理**
- **ScriptableObject / Singleton Manager pattern** - 轻量级状态管理
- **UnityWebRequest / Addressable Assets** - 服务端数据同步与资源加载
- **Unity Transport / Mirror Networking / Netcode for GameObjects** - 实时数据通信

#### **UI组件库**
- **Unity UI Toolkit / UGUI components** - 管理后台与游戏界面组件
- **Unity UI Toolkit** - 游戏界面无样式组件
- **Unity UI Toolkit 表单处理** - 表单交互处理

### 服务端技术栈

#### **核心框架**
- **Tuanjie Dedicated Server / ASP.NET Core** - 企业级C#服务端框架
- **C# / .NET** - 类型安全开发
- **Unity Transport / Mirror Networking / Netcode for GameObjects** - 实时双向通信

#### **微服务架构**
```
服务模块：
├── 用户服务 (User Service)
├── 游戏逻辑服务 (Game Logic Service)
├── 事件溯源服务 (Event Sourcing Service)
├── 实时通信服务 (Network Transport Service)
└── 文件服务 (Asset Service)
```

#### **数据存储**
- **PostgreSQL** - 主数据库（通过 Npgsql 访问）
- **EventStoreDB** - 事件存储（通过 C# EventStore.Client 访问）
- **Redis** - 缓存和会话（通过 StackExchange.Redis 访问）
- **MinIO** - 文件存储（通过 C# MinIO SDK 访问）

### 开发工具链

#### **容器化**
- **Docker** - 应用容器化
- **Docker Compose** - 本地开发环境

#### **代码质量**
- **C# Analyzers / .editorconfig** - 代码规范
- **Git hooks** - Git钩子
- **Unity Test Framework / NUnit** - 单元测试

#### **部署工具**
- **GitHub Actions** - CI/CD流水线
- **Nginx** - 反向代理

## 🏗️ **架构设计**

### 客户端架构

```mermaid
flowchart TB
    subgraph "用户界面层"
        A[游戏主界面]
        B[角色面板]
        C[修炼界面]
        D[战斗界面]
        E[地图界面]
    end
    
    subgraph "组件层"
        F[Sprite图形组件]
        G[动画组件]
        H[交互组件]
        I[数据展示组件]
    end
    
    subgraph "状态管理层"
        J[游戏状态]
        K[用户状态]
        L[UI状态]
    end
    
    subgraph "通信层"
        M[UnityWebRequest]
        N[网络客户端]
        O[事件总线]
    end
    
    A --> F
    B --> G
    C --> H
    D --> I
    E --> F
    
    F --> J
    G --> K
    H --> L
    I --> J
    
    J --> M
    K --> N
    L --> O
```

### 服务端架构

```mermaid
flowchart TB
    subgraph "API网关层"
        A[Nginx反向代理]
        B[负载均衡]
    end
    
    subgraph "应用服务层"
        C[用户服务]
        D[游戏逻辑服务]
        E[事件溯源服务]
        F[网络通信服务]
    end
    
    subgraph "数据存储层"
        G[PostgreSQL]
        H[EventStoreDB]
        I[Redis缓存]
        J[MinIO文件存储]
    end
    
    A --> B
    B --> C
    B --> D
    B --> E
    B --> F
    
    C --> G
    C --> I
    D --> G
    D --> H
    E --> H
    F --> I
    
    D --> J
```

## 🎮 **修仙游戏特色功能**

### 轻量化图形实现

#### **修炼系统可视化**
```csharp
// 修炼进度 MonoBehaviour 示例
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;
using TMPro;

public class CultivationProgress : MonoBehaviour
{
    [Header("境界配置")]
    public string realm;
    public int level;
    public int experience;
    public int maxExperience;

    [Header("UI引用")]
    [SerializeField] private Image progressRing;
    [SerializeField] private TMP_Text realmText;
    [SerializeField] private GameObject spiritualEnergyEffect;

    private float _targetProgress;

    private void Start()
    {
        _targetProgress = (float)experience / maxExperience;
        UpdateProgressRing();
        UpdateRealmDisplay();
        PlaySpiritualEnergyAnimation();
    }

    private void UpdateProgressRing()
    {
        // 使用 DOTween 实现进度环动画
        progressRing.fillAmount = 0f;
        progressRing.DOFillAmount(_targetProgress, 0.5f)
            .SetEase(Ease.OutCubic);
    }

    private void UpdateRealmDisplay()
    {
        realmText.text = $"{realm}\n{level}级\n{experience}/{maxExperience}";
    }

    private void PlaySpiritualEnergyAnimation()
    {
        // 灵力流动动画 - 循环缩放与透明度变化
        spiritualEnergyEffect.transform
            .DOScale(1.1f, 2f)
            .SetLoops(-1, LoopType.Yoyo)
            .SetEase(Ease.InOutSine);

        var canvasGroup = spiritualEnergyEffect.GetComponent<CanvasGroup>();
        if (canvasGroup != null)
        {
            canvasGroup.DOFade(1f, 2f)
                .From(0.3f)
                .SetLoops(-1, LoopType.Yoyo)
                .SetEase(Ease.InOutSine);
        }
    }

    /// <summary>
    /// 更新修炼进度
    /// </summary>
    public void UpdateProgress(int newExperience, int newMaxExperience)
    {
        experience = newExperience;
        maxExperience = newMaxExperience;
        _targetProgress = (float)experience / maxExperience;
        progressRing.DOFillAmount(_targetProgress, 0.5f).SetEase(Ease.OutCubic);
        UpdateRealmDisplay();
    }
}
```

#### **战斗特效系统**
```csharp
// 技能释放特效 - Particle System 实现
using UnityEngine;
using DG.Tweening;
using TMPro;

public class SkillEffect : MonoBehaviour
{
    [Header("技能配置")]
    [SerializeField] private string skillType;
    [SerializeField] private int damage;

    [Header("特效引用")]
    [SerializeField] private ParticleSystem skillGlowEffect;
    [SerializeField] private ParticleSystem particleBurstEffect;
    [SerializeField] private TMP_Text damageText;

    /// <summary>
    /// 播放技能特效
    /// </summary>
    public void PlaySkillEffect(Vector3 position, string type, int dmg)
    {
        transform.position = position;
        skillType = type;
        damage = dmg;

        // 设置技能颜色
        var mainModule = skillGlowEffect.main;
        mainModule.startColor = GetSkillColor(skillType);

        var burstModule = particleBurstEffect.main;
        burstModule.startColor = GetSkillColor(skillType);

        // 播放粒子特效
        skillGlowEffect.Play();
        particleBurstEffect.Play();

        // 显示伤害数字
        ShowDamageText();

        // 延迟销毁
        Destroy(gameObject, 1f);
    }

    private void ShowDamageText()
    {
        damageText.text = $"-{damage}";
        damageText.gameObject.SetActive(true);

        // 伤害数字上浮动画
        damageText.transform.DOMoveY(
            damageText.transform.position.y + 1f, 0.8f);
        damageText.DOFade(0f, 0.8f).SetDelay(0.2f);
    }

    private Color GetSkillColor(string type)
    {
        return type switch
        {
            "fire" => new Color(1f, 0.27f, 0f),       // #FF4500
            "water" => new Color(0.12f, 0.56f, 1f),   // #1E90FF
            "earth" => new Color(0.55f, 0.27f, 0.07f),// #8B4513
            "air" => new Color(0.53f, 0.81f, 0.92f),  // #87CEEB
            "lightning" => new Color(1f, 0.84f, 0f),  // #FFD700
            _ => Color.white
        };
    }
}
```

### 事件溯源架构

#### **修仙事件定义**
```csharp
// 修仙相关事件类型
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public enum CultivationEventType
{
    CultivationProgress,
    RealmBreakthrough,
    SkillLearned
}

public class CultivationEvent
{
    public CultivationEventType Type { get; set; }
    public string PlayerId { get; set; }
    public DateTime Timestamp { get; set; }
    public CultivationEventData Data { get; set; }
}

public class CultivationEventData
{
    public int? Experience { get; set; }
    public string NewRealm { get; set; }
    public string SkillId { get; set; }
    public Dictionary<string, int> Resources { get; set; }
}

// 事件处理器
public class CultivationEventHandler
{
    public async Task HandleAsync(CultivationEvent evt)
    {
        switch (evt.Type)
        {
            case CultivationEventType.CultivationProgress:
                await UpdatePlayerExperienceAsync(evt);
                break;
            case CultivationEventType.RealmBreakthrough:
                await ProcessRealmBreakthroughAsync(evt);
                break;
            case CultivationEventType.SkillLearned:
                await AddPlayerSkillAsync(evt);
                break;
        }
    }

    private async Task UpdatePlayerExperienceAsync(CultivationEvent evt)
    {
        // 更新玩家经验值
        await Task.CompletedTask;
    }

    private async Task ProcessRealmBreakthroughAsync(CultivationEvent evt)
    {
        // 处理境界突破
        await Task.CompletedTask;
    }

    private async Task AddPlayerSkillAsync(CultivationEvent evt)
    {
        // 添加玩家技能
        await Task.CompletedTask;
    }
}
```

## 📊 **性能优化策略**

### 客户端优化
- **Addressable Assets / Asset Bundles**: 场景级别的资源按需加载
- **Sprite Atlas**: 精灵图集合并，减少 Draw Call
- **缓存策略**: Addressable Assets 缓存 + 内存对象池
- **对象池**: 频繁创建销毁的对象复用

### 服务端优化
- **数据库索引**: 针对查询模式优化
- **Redis缓存**: 热点数据缓存
- **连接池**: 数据库连接复用
- **事件批处理**: 批量处理事件提升性能

## 🔧 **开发环境配置**

### 本地开发
```bash
# 启动完整开发环境
docker-compose up -d

# 客户端开发 - 在 Tuanjie Engine Editor 中打开客户端项目

# 服务端开发服务器
cd backend && dotnet run
```

### 环境变量
```bash
# 数据库配置
DATABASE_URL=postgresql://user:pass@localhost:5432/immortality
REDIS_URL=redis://localhost:6379
EVENTSTORE_URL=esdb://localhost:2113

# 应用配置
JWT_SECRET=your-secret-key
FILE_STORAGE_PATH=./uploads
WEBSOCKET_PORT=3001
```

## 🚀 **部署策略**

### Alpha版本部署
- **单服务器部署**: Docker Compose
- **域名**: immortality-alpha.example.com
- **SSL证书**: Let's Encrypt自动续期
- **监控**: 基础日志和性能监控

### 扩展计划
- **Beta版本**: Kubernetes集群
- **生产环境**: 多区域部署
- **CDN**: 静态资源加速
- **数据库**: 读写分离

## 📈 **技术栈优势**

### 开发效率
- **C#**: 类型安全，减少运行时错误
- **热重载**: Tuanjie Engine Editor 快速开发反馈
- **组件化**: 可复用的 MonoBehaviour / ScriptableObject
- **事件驱动**: 清晰的业务逻辑

### 成本控制
- **轻量化**: Sprite + Particle System，减少资源消耗
- **容器化**: 高效的资源利用
- **缓存策略**: 减少数据库压力
- **CDN**: 降低带宽成本

### 扩展性
- **微服务**: 独立扩展各个服务
- **事件溯源**: 完整的状态历史
- **无状态设计**: 水平扩展友好
- **API优先**: 支持多端接入

## 🎯 **下一步计划**

1. **环境搭建** (1周)
   - Docker开发环境
   - 基础项目结构
   - CI/CD流水线

2. **核心功能开发** (4周)
   - 用户认证系统
   - 基础修仙系统
   - 轻量化图形界面

3. **Alpha测试** (2周)
   - 内部测试
   - 性能优化
   - 用户反馈收集

4. **Beta准备** (2周)
   - 功能完善
   - 扩展性优化
   - 生产环境准备
