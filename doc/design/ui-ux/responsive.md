# 响应式设计

## 设计原则

### 多平台适配优先
- **Mobile First**: 从最小屏幕开始设计
- **渐进增强**: 逐步增加大屏幕功能
- **内容优先**: 确保核心内容在所有设备上可访问

### 弹性布局
- **弹性布局组**: 使用Unity Horizontal/Vertical/GridLayoutGroup实现弹性布局
- **灵活Sprite**: Sprite通过Canvas Scaler自适应容器大小
- **可伸缩文字**: 文字大小随Canvas Scaler缩放

### 触摸友好
- **合适的触摸目标**: 最小44px的可点击区域（UGUI Button最小尺寸）
- **手势支持**: 支持滑动、缩放等手势（Unity Input touch）
- **避免悬停依赖**: 不依赖鼠标悬停效果（移动端使用长按替代）

## 分辨率适配系统

### 分辨率断点定义

```css
:root {
  --breakpoint-xs: 320px;   /* 超小屏幕 - 小型手机 */
  --breakpoint-sm: 480px;   /* 小屏幕 - 大型手机 */
  --breakpoint-md: 768px;   /* 中等屏幕 - 平板竖屏 */
  --breakpoint-lg: 1024px;  /* 大屏幕 - 平板横屏/小型桌面 */
  --breakpoint-xl: 1280px;  /* 超大屏幕 - 桌面 */
  --breakpoint-2xl: 1536px; /* 巨大屏幕 - 大型桌面 */
}
```

### Canvas Scaler配置

```csharp
// Unity Canvas Scaler 分辨率适配配置
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(CanvasScaler))]
public class ResponsiveCanvas : MonoBehaviour
{
    [SerializeField] private CanvasScaler canvasScaler;

    // 参考分辨率断点
    private readonly Vector2 mobileResolution = new Vector2(750, 1334);    // 手机
    private readonly Vector2 tabletPortraitResolution = new Vector2(768, 1024);  // 平板竖屏
    private readonly Vector2 tabletLandscapeResolution = new Vector2(1024, 768); // 平板横屏
    private readonly Vector2 desktopResolution = new Vector2(1920, 1080);   // 桌面

    private void Start()
    {
        AdaptToScreenSize();
    }

    private void AdaptToScreenSize()
    {
        int screenWidth = Screen.width;
        int screenHeight = Screen.height;

        canvasScaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;

        if (screenWidth < 480)
        {
            // 超小屏幕 - 手机
            canvasScaler.referenceResolution = mobileResolution;
            canvasScaler.matchWidthOrHeight = 0f; // 按宽度匹配
        }
        else if (screenWidth < 768)
        {
            // 小屏幕 - 大型手机
            canvasScaler.referenceResolution = mobileResolution;
            canvasScaler.matchWidthOrHeight = 0.5f;
        }
        else if (screenWidth < 1024)
        {
            // 中等屏幕 - 平板竖屏
            canvasScaler.referenceResolution = tabletPortraitResolution;
            canvasScaler.matchWidthOrHeight = 0.5f;
        }
        else if (screenWidth < 1280)
        {
            // 大屏幕 - 平板横屏
            canvasScaler.referenceResolution = tabletLandscapeResolution;
            canvasScaler.matchWidthOrHeight = 0.5f;
        }
        else
        {
            // 超大屏幕 - 桌面
            canvasScaler.referenceResolution = desktopResolution;
            canvasScaler.matchWidthOrHeight = 0.5f;
        }
    }

    private void OnRectTransformDimensionsChange()
    {
        // 屏幕尺寸变化时重新适配
        AdaptToScreenSize();
    }
}
```

### 分辨率检测

```csharp
// 分辨率检测与断点判断
using UnityEngine;

public enum ScreenBreakpoint { XS, SM, MD, LG, XL, XXL }

public static class ScreenDetector
{
    private static readonly int[] breakpoints = { 320, 480, 768, 1024, 1280, 1536 };

    public static ScreenBreakpoint GetCurrentBreakpoint()
    {
        int width = Screen.width;

        if (width >= 1536) return ScreenBreakpoint.XXL;
        if (width >= 1280) return ScreenBreakpoint.XL;
        if (width >= 1024) return ScreenBreakpoint.LG;
        if (width >= 768) return ScreenBreakpoint.MD;
        if (width >= 480) return ScreenBreakpoint.SM;
        return ScreenBreakpoint.XS;
    }

    public static bool IsMobile => Screen.width < 768;
    public static bool IsTablet => Screen.width >= 768 && Screen.width < 1024;
    public static bool IsDesktop => Screen.width >= 1024;

    public static bool IsLandscape => Screen.width > Screen.height;
    public static bool IsPortrait => Screen.height > Screen.width;
}
```

## 布局适配

### 布局组系统

#### GridLayoutGroup - 弹性网格
```csharp
// 根据屏幕尺寸动态调整GridLayoutGroup列数
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(GridLayoutGroup))]
public class ResponsiveGridLayout : MonoBehaviour
{
    [SerializeField] private GridLayoutGroup gridLayout;

    [Header("各断点列数")]
    [SerializeField] private int columnsXS = 1;
    [SerializeField] private int columnsSM = 2;
    [SerializeField] private int columnsMD = 2;
    [SerializeField] private int columnsLG = 3;
    [SerializeField] private int columnsXL = 4;

    [Header("间距")]
    [SerializeField] private Vector2 spacingMobile = new Vector2(16, 16);
    [SerializeField] private Vector2 spacingTablet = new Vector2(20, 20);
    [SerializeField] private Vector2 spacingDesktop = new Vector2(24, 24);

    private void Start()
    {
        AdaptLayout();
    }

    private void AdaptLayout()
    {
        var breakpoint = ScreenDetector.GetCurrentBreakpoint();

        switch (breakpoint)
        {
            case ScreenBreakpoint.XS:
                gridLayout.constraint = GridLayoutGroup.Constraint.FixedColumnCount;
                gridLayout.constraintCount = columnsXS;
                gridLayout.spacing = spacingMobile;
                break;
            case ScreenBreakpoint.SM:
                gridLayout.constraint = GridLayoutGroup.Constraint.FixedColumnCount;
                gridLayout.constraintCount = columnsSM;
                gridLayout.spacing = spacingMobile;
                break;
            case ScreenBreakpoint.MD:
                gridLayout.constraint = GridLayoutGroup.Constraint.FixedColumnCount;
                gridLayout.constraintCount = columnsMD;
                gridLayout.spacing = spacingTablet;
                break;
            case ScreenBreakpoint.LG:
                gridLayout.constraint = GridLayoutGroup.Constraint.FixedColumnCount;
                gridLayout.constraintCount = columnsLG;
                gridLayout.spacing = spacingTablet;
                break;
            case ScreenBreakpoint.XL:
            case ScreenBreakpoint.XXL:
                gridLayout.constraint = GridLayoutGroup.Constraint.FixedColumnCount;
                gridLayout.constraintCount = columnsXL;
                gridLayout.spacing = spacingDesktop;
                break;
        }
    }

    private void OnRectTransformDimensionsChange()
    {
        AdaptLayout();
    }
}
```

#### 侧边栏布局
```csharp
// 侧边栏布局适配（移动端/桌面端切换）
using UnityEngine;
using UnityEngine.UI;

public class ResponsiveSidebarLayout : MonoBehaviour
{
    [SerializeField] private RectTransform sidebar;
    [SerializeField] private RectTransform mainContent;
    [SerializeField] private float sidebarWidthDesktop = 250f;
    [SerializeField] private float sidebarWidthCollapsed = 0f;

    [Header("移动端布局")]
    [SerializeField] private Vector2 sidebarAnchoredPosMobile = new Vector2(0, 0);
    [SerializeField] private Vector2 mainContentOffsetMinMobile = new Vector2(0, 0);

    [Header("桌面端布局")]
    [SerializeField] private Vector2 mainContentOffsetMinDesktop = new Vector2(250f, 0);

    private bool isSidebarVisible = true;

    private void Start()
    {
        AdaptLayout();
    }

    private void AdaptLayout()
    {
        if (ScreenDetector.IsMobile)
        {
            // 移动端 - 侧边栏可收起，覆盖式显示
            sidebar.anchorMin = new Vector2(0, 0);
            sidebar.anchorMax = new Vector2(0, 1);
            sidebar.offsetMin = new Vector2(0, 0);
            sidebar.offsetMax = new Vector2(sidebarWidthDesktop, 0);

            // 主内容区占满全屏
            mainContent.offsetMin = mainContentOffsetMinMobile;
            mainContent.offsetMax = new Vector2(0, 0);

            // 默认收起侧边栏
            SetSidebarVisible(false);
        }
        else
        {
            // 桌面端 - 侧边栏固定显示
            sidebar.anchorMin = new Vector2(0, 0);
            sidebar.anchorMax = new Vector2(0, 1);
            sidebar.offsetMin = new Vector2(0, 0);
            sidebar.offsetMax = new Vector2(sidebarWidthDesktop, 0);

            // 主内容区留出侧边栏空间
            mainContent.offsetMin = mainContentOffsetMinDesktop;
            mainContent.offsetMax = new Vector2(0, 0);

            SetSidebarVisible(true);
        }
    }

    public void ToggleSidebar()
    {
        SetSidebarVisible(!isSidebarVisible);
    }

    private void SetSidebarVisible(bool visible)
    {
        isSidebarVisible = visible;
        sidebar.gameObject.SetActive(visible);
    }

    private void OnRectTransformDimensionsChange()
    {
        AdaptLayout();
    }
}
```

### 导航适配

#### 移动端导航
```csharp
// 移动端汉堡菜单导航
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;

public class MobileNavigation : MonoBehaviour
{
    [SerializeField] private Button navToggleButton;
    [SerializeField] private RectTransform navMenu;
    [SerializeField] private float slideDuration = 0.3f;

    private bool isMenuOpen = false;
    private Vector3 hiddenPosition;
    private Vector3 visiblePosition;

    private void Start()
    {
        visiblePosition = navMenu.position;
        hiddenPosition = visiblePosition + new Vector3(-navMenu.rect.width, 0, 0);

        navToggleButton.onClick.AddListener(ToggleMenu);

        // 移动端默认隐藏菜单
        if (ScreenDetector.IsMobile)
        {
            navMenu.position = hiddenPosition;
            isMenuOpen = false;
        }
        else
        {
            // 桌面端始终显示
            navToggleButton.gameObject.SetActive(false);
        }
    }

    private void ToggleMenu()
    {
        if (isMenuOpen)
        {
            // 收起菜单
            navMenu.DOMove(hiddenPosition, slideDuration).SetEase(Ease.OutQuad);
            isMenuOpen = false;
        }
        else
        {
            // 展开菜单
            navMenu.DOMove(visiblePosition, slideDuration).SetEase(Ease.OutQuad);
            isMenuOpen = true;
        }
    }
}
```

#### 底部导航（移动端）
```csharp
// 移动端底部导航栏
using UnityEngine;
using UnityEngine.UI;

public class BottomNavigation : MonoBehaviour
{
    [SerializeField] private GameObject bottomNavContainer;
    [SerializeField] private Button[] navButtons;

    private void Start()
    {
        AdaptNavigation();
    }

    private void AdaptNavigation()
    {
        if (ScreenDetector.IsMobile)
        {
            // 移动端显示底部导航栏
            bottomNavContainer.SetActive(true);

            // 设置底部导航栏锚点
            var rectTransform = bottomNavContainer.GetComponent<RectTransform>();
            rectTransform.anchorMin = new Vector2(0, 0);
            rectTransform.anchorMax = new Vector2(1, 0);
            rectTransform.pivot = new Vector2(0.5f, 0);
            rectTransform.offsetMin = new Vector2(0, 0);
            rectTransform.offsetMax = new Vector2(0, 60f);
        }
        else
        {
            // 桌面端隐藏底部导航栏
            bottomNavContainer.SetActive(false);
        }
    }

    private void OnRectTransformDimensionsChange()
    {
        AdaptNavigation();
    }
}
```

## 组件适配

### 按钮适配

```csharp
// 按钮尺寸适配
using UnityEngine;
using UnityEngine.UI;

public class ResponsiveButton : MonoBehaviour
{
    [SerializeField] private RectTransform buttonRect;

    [Header("移动端按钮")]
    [SerializeField] private Vector2 buttonSizeMobile = new Vector2(160, 48);
    [SerializeField] private int fontSizeMobile = 18;

    [Header("桌面端按钮")]
    [SerializeField] private Vector2 buttonSizeDesktop = new Vector2(128, 36);
    [SerializeField] private int fontSizeDesktop = 14;

    [Header("平板按钮")]
    [SerializeField] private Vector2 buttonSizeTablet = new Vector2(140, 44);
    [SerializeField] private int fontSizeTablet = 16;

    private void Start()
    {
        AdaptButton();
    }

    private void AdaptButton()
    {
        var buttonText = GetComponentInChildren<Text>();

        if (ScreenDetector.IsMobile)
        {
            buttonRect.sizeDelta = buttonSizeMobile;
            if (buttonText != null) buttonText.fontSize = fontSizeMobile;
        }
        else if (ScreenDetector.IsTablet)
        {
            buttonRect.sizeDelta = buttonSizeTablet;
            if (buttonText != null) buttonText.fontSize = fontSizeTablet;
        }
        else
        {
            buttonRect.sizeDelta = buttonSizeDesktop;
            if (buttonText != null) buttonText.fontSize = fontSizeDesktop;
        }
    }

    private void OnRectTransformDimensionsChange()
    {
        AdaptButton();
    }
}
```

### 表单适配

```csharp
// 表单布局适配
using UnityEngine;
using UnityEngine.UI;

public class ResponsiveForm : MonoBehaviour
{
    [SerializeField] private VerticalLayoutGroup formLayout;
    [SerializeField] private HorizontalLayoutGroup rowLayout;

    [Header("间距")]
    [SerializeField] private int spacingMobile = 20;
    [SerializeField] private int spacingDesktop = 16;

    private void Start()
    {
        AdaptForm();
    }

    private void AdaptForm()
    {
        if (ScreenDetector.IsMobile)
        {
            // 移动端 - 垂直布局
            formLayout.spacing = spacingMobile;
            formLayout.padding = new RectOffset(16, 16, 16, 16);

            if (rowLayout != null)
            {
                // 移动端表单行变为垂直
                rowLayout.childAlignment = TextAnchor.UpperLeft;
            }
        }
        else
        {
            // 桌面端 - 可以水平布局
            formLayout.spacing = spacingDesktop;
            formLayout.padding = new RectOffset(32, 32, 24, 24);

            if (rowLayout != null)
            {
                rowLayout.childAlignment = TextAnchor.MiddleLeft;
            }
        }
    }

    private void OnRectTransformDimensionsChange()
    {
        AdaptForm();
    }
}
```

### 卡片适配

```csharp
// 卡片布局适配
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(RectTransform))]
public class ResponsiveCard : MonoBehaviour
{
    [SerializeField] private RectTransform cardRect;

    [Header("卡片尺寸")]
    [SerializeField] private Vector2 paddingMobile = new Vector2(16, 16);
    [SerializeField] private Vector2 paddingTablet = new Vector2(20, 20);
    [SerializeField] private Vector2 paddingDesktop = new Vector2(24, 24);

    [Header("卡片间距")]
    [SerializeField] private float marginMobile = 16f;
    [SerializeField] private float marginTablet = 20f;
    [SerializeField] private float marginDesktop = 24f;

    private void Start()
    {
        AdaptCard();
    }

    private void AdaptCard()
    {
        if (ScreenDetector.IsMobile)
        {
            cardRect.offsetMin = -paddingMobile;
            cardRect.offsetMax = paddingMobile;
        }
        else if (ScreenDetector.IsTablet)
        {
            cardRect.offsetMin = -paddingTablet;
            cardRect.offsetMax = paddingTablet;
        }
        else
        {
            cardRect.offsetMin = -paddingDesktop;
            cardRect.offsetMax = paddingDesktop;
        }
    }

    private void OnRectTransformDimensionsChange()
    {
        AdaptCard();
    }
}
```

## 文字适配

### 响应式字体

```csharp
// 响应式字体大小适配
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Text))]
public class ResponsiveText : MonoBehaviour
{
    [SerializeField] private Text textComponent;

    [Header("标题字体大小")]
    [SerializeField] private int h1SizeMobile = 28;
    [SerializeField] private int h1SizeDesktop = 40;

    [SerializeField] private int h2SizeMobile = 24;
    [SerializeField] private int h2SizeDesktop = 32;

    [SerializeField] private int h3SizeMobile = 20;
    [SerializeField] private int h3SizeDesktop = 24;

    [Header("正文字体大小")]
    [SerializeField] private int bodySizeMobile = 16;
    [SerializeField] private int bodySizeDesktop = 16;

    [Header("行高")]
    [SerializeField] private int lineSpacingMobile = 8;
    [SerializeField] private int lineSpacingDesktop = 6;

    public enum TextType { H1, H2, H3, Body }

    [SerializeField] private TextType textType = TextType.Body;

    private void Start()
    {
        AdaptText();
    }

    private void AdaptText()
    {
        bool isMobile = ScreenDetector.IsMobile;

        switch (textType)
        {
            case TextType.H1:
                textComponent.fontSize = isMobile ? h1SizeMobile : h1SizeDesktop;
                textComponent.lineSpacing = isMobile ? lineSpacingMobile : lineSpacingDesktop;
                break;
            case TextType.H2:
                textComponent.fontSize = isMobile ? h2SizeMobile : h2SizeDesktop;
                textComponent.lineSpacing = isMobile ? lineSpacingMobile : lineSpacingDesktop;
                break;
            case TextType.H3:
                textComponent.fontSize = isMobile ? h3SizeMobile : h3SizeDesktop;
                textComponent.lineSpacing = isMobile ? lineSpacingMobile : lineSpacingDesktop;
                break;
            case TextType.Body:
                textComponent.fontSize = isMobile ? bodySizeMobile : bodySizeDesktop;
                textComponent.lineSpacing = isMobile ? lineSpacingMobile : lineSpacingDesktop;
                break;
        }
    }

    private void OnRectTransformDimensionsChange()
    {
        AdaptText();
    }
}
```

### 文字截断

```csharp
// 文字截断处理
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Text))]
public class TextTruncation : MonoBehaviour
{
    [SerializeField] private Text textComponent;
    [SerializeField] private int maxLines = 2;
    [SerializeField] private string ellipsis = "...";

    private string fullText;

    private void Start()
    {
        fullText = textComponent.text;
        AdaptText();
    }

    private void AdaptText()
    {
        // 移动端限制行数
        if (ScreenDetector.IsMobile)
        {
            textComponent.horizontalOverflow = HorizontalWrapMode.Wrap;
            textComponent.verticalOverflow = VerticalWrapMode.Truncate;
        }
        else
        {
            // 桌面端可以显示更多内容
            textComponent.horizontalOverflow = HorizontalWrapMode.Wrap;
            textComponent.verticalOverflow = VerticalWrapMode.Overflow;
        }
    }

    private void OnRectTransformDimensionsChange()
    {
        AdaptText();
    }
}
```

## 图片适配

### 响应式Sprite

```csharp
// Sprite多分辨率适配
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Image))]
public class ResponsiveSprite : MonoBehaviour
{
    [SerializeField] private Image image;

    [Header("多分辨率Sprite资源")]
    [SerializeField] private Sprite spriteSmall;   // 小屏使用
    [SerializeField] private Sprite spriteMedium;  // 中屏使用
    [SerializeField] private Sprite spriteLarge;   // 大屏使用

    private void Start()
    {
        AdaptSprite();
    }

    private void AdaptSprite()
    {
        var breakpoint = ScreenDetector.GetCurrentBreakpoint();

        switch (breakpoint)
        {
            case ScreenBreakpoint.XS:
            case ScreenBreakpoint.SM:
                image.sprite = spriteSmall ?? spriteMedium ?? spriteLarge;
                break;
            case ScreenBreakpoint.MD:
            case ScreenBreakpoint.LG:
                image.sprite = spriteMedium ?? spriteLarge;
                break;
            default:
                image.sprite = spriteLarge;
                break;
        }

        image.SetNativeSize();
    }

    private void OnRectTransformDimensionsChange()
    {
        AdaptSprite();
    }
}
```

### Sprite Atlas 优化

```csharp
// 使用Unity Sprite Atlas进行多分辨率图片管理
using UnityEngine;
using UnityEngine.U2D;

public class SpriteAtlasManager : MonoBehaviour
{
    [SerializeField] private SpriteAtlas uiAtlasMobile;
    [SerializeField] private SpriteAtlas uiAtlasTablet;
    [SerializeField] private SpriteAtlas uiAtlasDesktop;

    private SpriteAtlas currentAtlas;

    public static SpriteAtlasManager Instance { get; private set; }

    private void Awake()
    {
        Instance = this;
        SelectAtlas();
    }

    private void SelectAtlas()
    {
        if (ScreenDetector.IsMobile)
            currentAtlas = uiAtlasMobile;
        else if (ScreenDetector.IsTablet)
            currentAtlas = uiAtlasTablet;
        else
            currentAtlas = uiAtlasDesktop;
    }

    public Sprite GetSprite(string name)
    {
        if (currentAtlas == null) SelectAtlas();
        return currentAtlas.GetSprite(name);
    }
}
```

## 交互适配

### 触摸优化

```csharp
// 触摸目标最小尺寸优化
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(RectTransform))]
public class TouchTargetOptimizer : MonoBehaviour
{
    [SerializeField] private RectTransform targetRect;
    [SerializeField] private float minTouchSize = 44f; // 最小触摸目标尺寸

    private void Start()
    {
        OptimizeTouchTarget();
    }

    private void OptimizeTouchTarget()
    {
        // 移动端确保触摸目标足够大
        if (ScreenDetector.IsMobile)
        {
            Vector2 size = targetRect.sizeDelta;
            if (size.x < minTouchSize) size.x = minTouchSize;
            if (size.y < minTouchSize) size.y = minTouchSize;
            targetRect.sizeDelta = size;
        }
    }
}
```

### 手势支持

```csharp
// 手势检测处理
using UnityEngine;
using UnityEngine.EventSystems;

public class GestureHandler : MonoBehaviour,
    IBeginDragHandler, IDragHandler, IEndDragHandler, IScrollHandler
{
    [SerializeField] private float swipeThreshold = 50f;
    [SerializeField] private float pinchSensitivity = 0.01f;

    public void OnBeginDrag(PointerEventData eventData)
    {
        // 开始拖拽
    }

    public void OnDrag(PointerEventData eventData)
    {
        // 拖拽处理 - 滑动切换页面或滚动
        float deltaX = eventData.delta.x;
        float deltaY = eventData.delta.y;

        if (Mathf.Abs(deltaX) > Mathf.Abs(deltaY))
        {
            // 水平滑动 - 切换页面
            if (deltaX > swipeThreshold) SwipeRight();
            else if (deltaX < -swipeThreshold) SwipeLeft();
        }
    }

    public void OnEndDrag(PointerEventData eventData)
    {
        // 结束拖拽
    }

    public void OnScroll(PointerEventData eventData)
    {
        // 滚动处理 - 桌面端鼠标滚轮 / 移动端双指缩放
        if (ScreenDetector.IsMobile)
        {
            // 双指缩放
            if (Input.touchCount == 2)
            {
                HandlePinchZoom();
            }
        }
        else
        {
            // 桌面端鼠标滚轮缩放
            HandleMouseScroll(eventData.scrollDelta);
        }
    }

    private void SwipeRight() { /* ... */ }
    private void SwipeLeft() { /* ... */ }
    private void HandlePinchZoom() { /* ... */ }
    private void HandleMouseScroll(Vector2 delta) { /* ... */ }
}
```

## 性能优化

### Sprite优化

```csharp
// 使用Sprite Atlas和Addressables进行多分辨率资源管理
using UnityEngine;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;
using UnityEngine.U2D;

public class ResponsiveAssetLoader : MonoBehaviour
{
    [SerializeField] private AssetReferenceSpriteAtlas mobileAtlasRef;
    [SerializeField] private AssetReferenceSpriteAtlas tabletAtlasRef;
    [SerializeField] private AssetReferenceSpriteAtlas desktopAtlasRef;

    private SpriteAtlas loadedAtlas;

    private async void Start()
    {
        await LoadResponsiveAtlas();
    }

    private async System.Threading.Tasks.Task LoadResponsiveAtlas()
    {
        AssetReferenceSpriteAtlas atlasRef;

        if (ScreenDetector.IsMobile)
            atlasRef = mobileAtlasRef;
        else if (ScreenDetector.IsTablet)
            atlasRef = tabletAtlasRef;
        else
            atlasRef = desktopAtlasRef;

        var handle = atlasRef.LoadAssetAsync<SpriteAtlas>();
        await handle.Task;

        if (handle.Status == AsyncOperationStatus.Succeeded)
        {
            loadedAtlas = handle.Result;
        }
    }

    private void OnDestroy()
    {
        // 释放资源
        if (loadedAtlas != null)
        {
            Addressables.Release(loadedAtlas);
        }
    }
}
```

### USS优化

```css
/* 使用USS变量减少重复定义 */
:root {
  --container-padding: 16px;
}

.container {
  padding: var(--container-padding);
}
```

```csharp
// 通过C#动态调整USS变量值（替代CSS @media查询）
using UnityEngine;
using UnityEngine.UIElements;

public class USSVariableAdapter : MonoBehaviour
{
    [SerializeField] private UIDocument uiDocument;
    [SerializeField] private float paddingMobile = 16f;
    [SerializeField] private float paddingTablet = 24f;
    [SerializeField] private float paddingDesktop = 32f;

    private void Start()
    {
        AdaptPadding();
    }

    private void AdaptPadding()
    {
        var root = uiDocument.rootVisualElement;
        float padding;

        if (ScreenDetector.IsMobile)
            padding = paddingMobile;
        else if (ScreenDetector.IsTablet)
            padding = paddingTablet;
        else
            padding = paddingDesktop;

        // 动态设置USS变量值
        root.styleSheets.Add(Resources.Load<StyleSheet>("ThemeUSS"));
        root.Q(className: "container").style.paddingLeft = padding;
        root.Q(className: "container").style.paddingRight = padding;
    }

    private void OnRectTransformDimensionsChange()
    {
        AdaptPadding();
    }
}
```

### C#优化

```csharp
// 响应式断点检测与界面适配
using UnityEngine;

public class ResponsiveManager : MonoBehaviour
{
    public static ResponsiveManager Instance { get; private set; }

    private ScreenBreakpoint currentBreakpoint;
    private ScreenBreakpoint lastBreakpoint;

    private void Awake()
    {
        if (Instance == null) Instance = this;
        currentBreakpoint = ScreenDetector.GetCurrentBreakpoint();
        lastBreakpoint = currentBreakpoint;
    }

    private void Update()
    {
        // 检测分辨率变化
        currentBreakpoint = ScreenDetector.GetCurrentBreakpoint();

        if (currentBreakpoint != lastBreakpoint)
        {
            // 断点变化时通知所有适配组件
            OnBreakpointChanged?.Invoke(currentBreakpoint);
            lastBreakpoint = currentBreakpoint;
        }
    }

    // 断点变化事件
    public static event System.Action<ScreenBreakpoint> OnBreakpointChanged;
}
```

## 测试策略

### 设备测试

#### 移动设备
- **iPhone SE**: 375×667
- **iPhone 12**: 390×844
- **iPhone 12 Pro Max**: 428×926
- **Samsung Galaxy S21**: 384×854
- **iPad**: 768×1024
- **iPad Pro**: 1024×1366

#### 桌面设备
- **小型笔记本**: 1366×768
- **标准桌面**: 1920×1080
- **大屏显示器**: 2560×1440
- **4K显示器**: 3840×2160

### 测试工具

#### Unity编辑器工具
- **Unity Device Simulator**: 设备模拟器
- **Game视图分辨率切换**: 多分辨率预览
- **Unity编辑器Free Aspect**: 自由比例测试

#### 在线工具
- **Unity Cloud Build**: 多平台构建测试
- **Unity Remote**: 真机实时调试

### 测试清单

#### 布局测试
- [ ] 所有断点下布局正常
- [ ] 文字可读性良好
- [ ] Sprite正确缩放
- [ ] 导航功能正常
- [ ] 表单可用性良好

#### 交互测试
- [ ] 触摸目标足够大
- [ ] 手势操作正常
- [ ] 键盘导航可用
- [ ] 加载性能良好
- [ ] 滚动体验流畅

#### 兼容性测试
- [ ] iOS设备兼容
- [ ] Android设备兼容
- [ ] 桌面平台兼容
- [ ] 低分辨率设备降级适配