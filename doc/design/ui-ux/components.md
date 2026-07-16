# 组件库

## 设计系统概述

### 组件化原则
- **可复用性**: 组件可在多个场景中重复使用
- **一致性**: 保持视觉和交互的一致性
- **可维护性**: 易于更新和维护
- **可扩展性**: 支持功能扩展和定制

### 组件分类
- **基础组件**: 按钮、输入框、文本等
- **布局组件**: 容器、网格、间距等
- **导航组件**: 菜单、面包屑、分页等
- **数据展示**: 表格、列表、卡片等
- **反馈组件**: 提示、加载、对话框等
- **业务组件**: 角色卡片、装备面板等

## 基础组件

### 按钮 (Button)

#### 组件实现
```csharp
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;
using DG.Tweening;

public enum ButtonVariant { Primary, Secondary, Success, Warning, Error }
public enum ButtonSize { Small, Medium, Large }

public class GameButton : MonoBehaviour
{
    [Header("变体设置")]
    [SerializeField] private ButtonVariant variant = ButtonVariant.Primary;
    [SerializeField] private ButtonSize size = ButtonSize.Medium;

    [Header("图标设置")]
    [SerializeField] private Image iconImage;
    [SerializeField] private Sprite iconSprite;

    [Header("状态")]
    [SerializeField] private bool isLoading;
    [SerializeField] private bool isDisabled;
    [SerializeField] private bool isFullWidth;

    [Header("事件")]
    public UnityEvent onClick = new UnityEvent();

    private Button button;
    private Image backgroundImage;
    private Text labelText;
    private GameObject loadingSpinner;
    private RectTransform rectTransform;

    // 各变体颜色配置
    private static readonly Color PrimaryColor = new Color(0.29f, 0.56f, 0.89f);
    private static readonly Color SecondaryColor = Color.clear;
    private static readonly Color SuccessColor = new Color(0.15f, 0.68f, 0.38f);
    private static readonly Color WarningColor = new Color(0.95f, 0.61f, 0.07f);
    private static readonly Color ErrorColor = new Color(0.90f, 0.30f, 0.24f);

    // 各尺寸配置
    private static readonly Vector2 PaddingSmall = new Vector2(8, 16);
    private static readonly Vector2 PaddingMedium = new Vector2(12, 20);
    private static readonly Vector2 PaddingLarge = new Vector2(16, 24);

    private void Awake()
    {
        button = GetComponent<Button>();
        backgroundImage = GetComponent<Image>();
        labelText = GetComponentInChildren<Text>();
        rectTransform = GetComponent<RectTransform>();
    }

    private void Start()
    {
        ApplyVariant();
        ApplySize();
        ApplyState();

        button.onClick.AddListener(HandleClick);
    }

    private void ApplyVariant()
    {
        Color color;
        switch (variant)
        {
            case ButtonVariant.Primary:
                color = PrimaryColor;
                break;
            case ButtonVariant.Secondary:
                color = SecondaryColor;
                break;
            case ButtonVariant.Success:
                color = SuccessColor;
                break;
            case ButtonVariant.Warning:
                color = WarningColor;
                break;
            case ButtonVariant.Error:
                color = ErrorColor;
                break;
            default:
                color = PrimaryColor;
                break;
        }
        backgroundImage.color = color;
    }

    private void ApplySize()
    {
        Vector2 padding;
        int fontSize;
        float minHeight;

        switch (size)
        {
            case ButtonSize.Small:
                padding = PaddingSmall;
                fontSize = 14;
                minHeight = 36f;
                break;
            case ButtonSize.Large:
                padding = PaddingLarge;
                fontSize = 18;
                minHeight = 52f;
                break;
            default:
                padding = PaddingMedium;
                fontSize = 16;
                minHeight = 44f;
                break;
        }

        if (labelText != null) labelText.fontSize = fontSize;
        rectTransform.sizeDelta = new Vector2(rectTransform.sizeDelta.x, minHeight);

        if (isFullWidth)
        {
            rectTransform.anchorMin = new Vector2(0, 0.5f);
            rectTransform.anchorMax = new Vector2(1, 0.5f);
            rectTransform.offsetMin = new Vector2(padding.y, -minHeight / 2);
            rectTransform.offsetMax = new Vector2(-padding.y, minHeight / 2);
        }
    }

    private void ApplyState()
    {
        // 图标显示
        if (iconImage != null)
        {
            iconImage.sprite = iconSprite;
            iconImage.gameObject.SetActive(iconSprite != null);
        }

        // 加载状态
        if (loadingSpinner != null)
        {
            loadingSpinner.SetActive(isLoading);
        }

        // 禁用状态
        button.interactable = !isDisabled && !isLoading;
        if (isDisabled)
        {
            var colors = button.colors;
            colors.disabledColor = new Color(1, 1, 1, 0.6f);
            button.colors = colors;
        }
    }

    private void HandleClick()
    {
        if (!isDisabled && !isLoading)
        {
            // 按压动画
            rectTransform.DOScale(0.95f, 0.1f).SetEase(Ease.OutQuad)
                .OnComplete(() => rectTransform.DOScale(1f, 0.1f).SetEase(Ease.OutQuad));

            onClick?.Invoke();
        }
    }

    // 设置变体
    public void SetVariant(ButtonVariant newVariant)
    {
        variant = newVariant;
        ApplyVariant();
    }

    // 设置加载状态
    public void SetLoading(bool loading)
    {
        isLoading = loading;
        ApplyState();
    }

    // 设置禁用状态
    public void SetDisabled(bool disabled)
    {
        isDisabled = disabled;
        ApplyState();
    }
}
```

#### USS样式定义
```css
.btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 500;
  min-height: 44px;
}

.btn--primary {
  background-color: var(--primary-color);
  color: var(--text-inverse);
}

.btn--secondary {
  background-color: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
  border-width: 1px;
}

.btn--small {
  padding: 8px 16px;
  font-size: 14px;
  min-height: 36px;
}

.btn--large {
  padding: 16px 24px;
  font-size: 18px;
  min-height: 52px;
}
```

### 输入框 (Input)

#### 组件实现
```csharp
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;
using UnityEngine.EventSystems;

public class CustomInputField : MonoBehaviour, ISelectHandler, IDeselectHandler
{
    [Header("基础设置")]
    [SerializeField] private string label;
    [SerializeField] private string placeholder = "请输入...";
    [SerializeField] private bool isRequired;
    [SerializeField] private bool isClearable;
    [SerializeField] private bool isDisabled;
    [SerializeField] private bool isReadonly;

    [Header("图标")]
    [SerializeField] private Image prefixIcon;
    [SerializeField] private Image suffixIcon;

    [Header("验证")]
    [SerializeField] private string errorMessage;
    [SerializeField] private string hintMessage;

    [Header("事件")]
    public UnityEvent<string> onValueChanged = new UnityEvent<string>();
    public UnityEvent onInputFocused = new UnityEvent();
    public UnityEvent onInputBlurred = new UnityEvent();

    private InputField inputField;
    private Text labelText;
    private Text placeholderText;
    private Image borderImage;
    private Text errorText;
    private Button clearButton;
    private bool isFocused;

    private void Awake()
    {
        inputField = GetComponentInChildren<InputField>();
        labelText = transform.Find("Label")?.GetComponent<Text>();
        placeholderText = transform.Find("Placeholder")?.GetComponent<Text>();
        borderImage = GetComponent<Image>();
        errorText = transform.Find("ErrorText")?.GetComponent<Text>();
        clearButton = transform.Find("ClearButton")?.GetComponent<Button>();
    }

    private void Start()
    {
        // 设置标签
        if (labelText != null)
        {
            labelText.text = label + (isRequired ? " *" : "");
        }

        // 设置占位文本
        if (placeholderText != null)
        {
            placeholderText.text = placeholder;
        }

        // 注册事件
        inputField.onValueChanged.AddListener(HandleValueChanged);
        if (clearButton != null)
        {
            clearButton.onClick.AddListener(ClearInput);
        }

        // 禁用状态
        if (isDisabled)
        {
            inputField.interactable = false;
        }

        // 只读状态
        if (isReadonly)
        {
            inputField.readOnly = true;
        }

        ApplyState();
    }

    private void HandleValueChanged(string value)
    {
        onValueChanged?.Invoke(value);

        // 清除按钮显示/隐藏
        if (clearButton != null)
        {
            clearButton.gameObject.SetActive(isClearable && !string.IsNullOrEmpty(value));
        }

        // 清除错误状态
        if (!string.IsNullOrEmpty(errorMessage))
        {
            errorMessage = null;
            ApplyState();
        }
    }

    public void OnSelect(BaseEventData eventData)
    {
        isFocused = true;
        // 焦点高亮边框
        borderImage.color = ThemeManager.Instance.PrimaryColor;
        onInputFocused?.Invoke();
    }

    public void OnDeselect(BaseEventData eventData)
    {
        isFocused = false;
        // 恢复默认边框
        borderImage.color = string.IsNullOrEmpty(errorMessage)
            ? ThemeManager.Instance.BorderMedium
            : ThemeManager.Instance.ErrorColor;
        onInputBlurred?.Invoke();

        // 失焦时验证
        ValidateInput();
    }

    private void ValidateInput()
    {
        if (isRequired && string.IsNullOrEmpty(inputField.text))
        {
            SetError("此项为必填项");
        }
    }

    public void SetError(string message)
    {
        errorMessage = message;
        ApplyState();
    }

    public void ClearInput()
    {
        inputField.text = "";
    }

    private void ApplyState()
    {
        // 错误提示
        if (errorText != null)
        {
            errorText.text = errorMessage ?? hintMessage ?? "";
            errorText.color = string.IsNullOrEmpty(errorMessage)
                ? ThemeManager.Instance.TextSecondary
                : ThemeManager.Instance.ErrorColor;
        }

        // 边框颜色
        if (!isFocused)
        {
            borderImage.color = string.IsNullOrEmpty(errorMessage)
                ? (isDisabled ? ThemeManager.Instance.BorderLight : ThemeManager.Instance.BorderMedium)
                : ThemeManager.Instance.ErrorColor;
        }
    }

    public string Value
    {
        get => inputField.text;
        set => inputField.text = value;
    }
}
```

### 图标 (Icon)

#### Sprite图标组件
```csharp
using UnityEngine;
using UnityEngine.UI;

public class SpriteIcon : MonoBehaviour
{
    [Header("图标设置")]
    [SerializeField] private string iconName;
    [SerializeField] private Sprite sprite;
    [SerializeField] private int size = 20;
    [SerializeField] private Color color = Color.white;
    [SerializeField] private bool isSpinning;

    private Image image;
    private RectTransform rectTransform;

    private void Awake()
    {
        image = GetComponent<Image>();
        rectTransform = GetComponent<RectTransform>();
    }

    private void Start()
    {
        ApplySettings();
    }

    private void ApplySettings()
    {
        // 设置Sprite
        if (sprite == null && !string.IsNullOrEmpty(iconName))
        {
            sprite = SpriteAtlasManager.Instance?.GetSprite(iconName);
        }

        image.sprite = sprite;
        image.color = color;

        // 设置尺寸
        rectTransform.sizeDelta = new Vector2(size, size);

        // 旋转动画
        if (isSpinning)
        {
            // 通过DOTween实现无限旋转
            rectTransform.DORotate(new Vector3(0, 0, -360f), 1f, RotateMode.FastBeyond360)
                .SetEase(DG.Tweening.Ease.Linear)
                .SetLoops(-1, DG.Tweening.LoopType.Restart);
        }
    }

    public void SetIcon(string name)
    {
        iconName = name;
        sprite = SpriteAtlasManager.Instance?.GetSprite(name);
        ApplySettings();
    }

    public void SetSize(int newSize)
    {
        size = newSize;
        rectTransform.sizeDelta = new Vector2(size, size);
    }

    public void SetColor(Color newColor)
    {
        color = newColor;
        image.color = color;
    }
}
```

## 布局组件

### 容器 (Container)

```csharp
using UnityEngine;
using UnityEngine.UI;

public enum ContainerSize { Small, Default, Large, Full, Fluid }

public class UIContainer : MonoBehaviour
{
    [SerializeField] private ContainerSize size = ContainerSize.Default;
    [SerializeField] private bool isFluid;

    [Header("尺寸配置")]
    private readonly float maxWidthSmall = 768f;
    private readonly float maxWidthDefault = 1200f;
    private readonly float maxWidthLarge = 1400f;

    private RectTransform rectTransform;

    private void Start()
    {
        rectTransform = GetComponent<RectTransform>();
        ApplyContainerSize();
    }

    private void ApplyContainerSize()
    {
        float maxWidth;

        switch (size)
        {
            case ContainerSize.Small:
                maxWidth = maxWidthSmall;
                break;
            case ContainerSize.Large:
                maxWidth = maxWidthLarge;
                break;
            case ContainerSize.Full:
            case ContainerSize.Fluid:
                maxWidth = Screen.width;
                break;
            default:
                maxWidth = maxWidthDefault;
                break;
        }

        if (isFluid)
        {
            maxWidth = Screen.width;
        }

        // 设置容器宽度并居中
        rectTransform.anchorMin = new Vector2(0.5f, 0.5f);
        rectTransform.anchorMax = new Vector2(0.5f, 0.5f);
        rectTransform.pivot = new Vector2(0.5f, 0.5f);
        rectTransform.sizeDelta = new Vector2(maxWidth, rectTransform.sizeDelta.y);
    }
}
```

### 网格 (Grid)

```csharp
using UnityEngine;
using UnityEngine.UI;

public enum GridAlignment { Start, Center, End, Stretch }
public enum GridJustify { Start, Center, End, SpaceBetween, SpaceAround, SpaceEvenly }

[RequireComponent(typeof(GridLayoutGroup))]
public class UIGrid : MonoBehaviour
{
    [Header("列数配置")]
    [SerializeField] private int columnsXS = 1;
    [SerializeField] private int columnsSM = 1;
    [SerializeField] private int columnsMD = 2;
    [SerializeField] private int columnsLG = 3;
    [SerializeField] private int columnsXL = 4;

    [Header("间距")]
    [SerializeField] private Vector2 spacing = new Vector2(16, 16);

    [Header("对齐")]
    [SerializeField] private GridAlignment childAlignment = GridAlignment.Stretch;

    private GridLayoutGroup gridLayout;

    private void Awake()
    {
        gridLayout = GetComponent<GridLayoutGroup>();
    }

    private void Start()
    {
        AdaptGrid();
    }

    private void AdaptGrid()
    {
        // 设置间距
        gridLayout.spacing = spacing;

        // 设置对齐
        gridLayout.childAlignment = ConvertAlignment(childAlignment);

        // 根据屏幕尺寸设置列数
        var breakpoint = ScreenDetector.GetCurrentBreakpoint();
        int columns;

        switch (breakpoint)
        {
            case ScreenBreakpoint.XS:
                columns = columnsXS;
                break;
            case ScreenBreakpoint.SM:
                columns = columnsSM;
                break;
            case ScreenBreakpoint.MD:
                columns = columnsMD;
                break;
            case ScreenBreakpoint.LG:
                columns = columnsLG;
                break;
            default:
                columns = columnsXL;
                break;
        }

        gridLayout.constraint = GridLayoutGroup.Constraint.FixedColumnCount;
        gridLayout.constraintCount = columns;
    }

    private TextAnchor ConvertAlignment(GridAlignment alignment)
    {
        switch (alignment)
        {
            case GridAlignment.Start: return TextAnchor.UpperLeft;
            case GridAlignment.Center: return TextAnchor.UpperCenter;
            case GridAlignment.End: return TextAnchor.UpperRight;
            case GridAlignment.Stretch: return TextAnchor.UpperLeft;
            default: return TextAnchor.UpperLeft;
        }
    }

    private void OnRectTransformDimensionsChange()
    {
        AdaptGrid();
    }
}
```

## 数据展示组件

### 卡片 (Card)

```csharp
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using DG.Tweening;

public class UICard : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler, IPointerClickHandler
{
    [Header("内容")]
    [SerializeField] private string title;
    [SerializeField] private string subtitle;

    [Header("行为")]
    [SerializeField] private bool isHoverable;
    [SerializeField] private bool isClickable;
    [SerializeField] private bool hasBorder = true;

    [Header("阴影")]
    [SerializeField] private ShadowType shadowType = ShadowType.Medium;

    [Header("事件")]
    public UnityEvent onClick = new UnityEvent();

    [Header("UI引用")]
    [SerializeField] private Text titleText;
    [SerializeField] private Text subtitleText;
    [SerializeField] private Image backgroundImage;
    [SerializeField] private Image borderImage;

    private RectTransform rectTransform;
    private Vector3 originalPosition;

    public enum ShadowType { None, Small, Medium, Large }

    private void Awake()
    {
        rectTransform = GetComponent<RectTransform>();
        originalPosition = rectTransform.position;
    }

    private void Start()
    {
        ApplyContent();
        ApplyStyle();
    }

    private void ApplyContent()
    {
        if (titleText != null) titleText.text = title;
        if (subtitleText != null) subtitleText.text = subtitle;
    }

    private void ApplyStyle()
    {
        // 边框
        if (borderImage != null)
        {
            borderImage.enabled = hasBorder;
        }

        // 阴影效果 - 通过偏移的Shadow组件实现
        var shadow = GetComponent<Shadow>();
        if (shadow != null)
        {
            switch (shadowType)
            {
                case ShadowType.None:
                    shadow.effectDistance = Vector2.zero;
                    break;
                case ShadowType.Small:
                    shadow.effectDistance = new Vector2(1, -1);
                    shadow.effectColor = new Color(0, 0, 0, 0.1f);
                    break;
                case ShadowType.Medium:
                    shadow.effectDistance = new Vector2(2, -2);
                    shadow.effectColor = new Color(0, 0, 0, 0.1f);
                    break;
                case ShadowType.Large:
                    shadow.effectDistance = new Vector2(4, -4);
                    shadow.effectColor = new Color(0, 0, 0, 0.15f);
                    break;
            }
        }
    }

    public void OnPointerEnter(PointerEventData eventData)
    {
        if (!isHoverable) return;

        // 悬停上浮效果
        rectTransform.DOMoveY(originalPosition.y + 2f, 0.2f).SetEase(Ease.OutQuad);
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        if (!isHoverable) return;

        // 恢复原位
        rectTransform.DOMoveY(originalPosition.y, 0.2f).SetEase(Ease.OutQuad);
    }

    public void OnPointerClick(PointerEventData eventData)
    {
        if (!isClickable) return;

        // 点击效果
        rectTransform.DOScale(0.98f, 0.1f).OnComplete(() =>
        {
            rectTransform.DOScale(1f, 0.1f);
        });

        onClick?.Invoke();
    }

    // 设置标题
    public void SetTitle(string newTitle)
    {
        title = newTitle;
        if (titleText != null) titleText.text = title;
    }

    // 设置子标题
    public void SetSubtitle(string newSubtitle)
    {
        subtitle = newSubtitle;
        if (subtitleText != null) subtitleText.text = subtitle;
    }
}
```

### 列表 (List)

```csharp
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;
using System.Collections.Generic;

public class UIList : MonoBehaviour
{
    [Header("数据")]
    [SerializeField] private List<ListItemData> items = new List<ListItemData>();

    [Header("选择")]
    [SerializeField] private bool isSelectable;
    [SerializeField] private List<int> selectedIndices = new List<int>();

    [Header("UI引用")]
    [SerializeField] private Transform contentParent;
    [SerializeField] private GameObject itemPrefab;
    [SerializeField] private ScrollRect scrollRect;

    [Header("事件")]
    public UnityEvent<int, ListItemData> onItemSelected = new UnityEvent<int, ListItemData>();
    public UnityEvent<List<int>> onSelectionChanged = new UnityEvent<List<int>>();

    // 对象池
    private Queue<GameObject> itemPool = new Queue<GameObject>();

    private void Start()
    {
        RefreshList();
    }

    public void SetItems(List<ListItemData> newItems)
    {
        items = newItems;
        RefreshList();
    }

    private void RefreshList()
    {
        // 回收所有现有项到对象池
        foreach (Transform child in contentParent)
        {
            child.gameObject.SetActive(false);
            itemPool.Enqueue(child.gameObject);
        }

        // 重新创建列表项
        for (int i = 0; i < items.Count; i++)
        {
            GameObject itemObj = GetItemFromPool();
            itemObj.transform.SetParent(contentParent, false);
            itemObj.transform.SetSiblingIndex(i);
            itemObj.SetActive(true);

            var listItem = itemObj.GetComponent<UIListItem>();
            if (listItem != null)
            {
                listItem.Setup(items[i], i, isSelectable, selectedIndices.Contains(i));
                listItem.onClicked += HandleItemClick;
            }
        }
    }

    private GameObject GetItemFromPool()
    {
        if (itemPool.Count > 0)
        {
            return itemPool.Dequeue();
        }
        return Instantiate(itemPrefab);
    }

    private void HandleItemClick(int index)
    {
        if (!isSelectable)
        {
            onItemSelected?.Invoke(index, items[index]);
            return;
        }

        // 多选切换
        if (selectedIndices.Contains(index))
        {
            selectedIndices.Remove(index);
        }
        else
        {
            selectedIndices.Add(index);
        }

        onSelectionChanged?.Invoke(selectedIndices);
        onItemSelected?.Invoke(index, items[index]);
        RefreshList();
    }
}

// 列表项数据
[System.Serializable]
public class ListItemData
{
    public string id;
    public string title;
    public string subtitle;
    public string action;
    public Sprite avatar;
}

// 列表项UI组件
public class UIListItem : MonoBehaviour, IPointerClickHandler
{
    [SerializeField] private Text titleText;
    [SerializeField] private Text subtitleText;
    [SerializeField] private Image avatarImage;
    [SerializeField] private Image selectionHighlight;

    private ListItemData data;
    private int index;
    private bool isSelected;

    public System.Action<int> onClicked;

    public void Setup(ListItemData itemData, int itemIndex, bool selectable, bool selected)
    {
        data = itemData;
        index = itemIndex;
        isSelected = selected;

        if (titleText != null) titleText.text = itemData.title;
        if (subtitleText != null) subtitleText.text = itemData.subtitle;
        if (avatarImage != null) avatarImage.sprite = itemData.avatar;
        if (selectionHighlight != null) selectionHighlight.gameObject.SetActive(selected);
    }

    public void OnPointerClick(PointerEventData eventData)
    {
        onClicked?.Invoke(index);
    }
}
```

## 反馈组件

### 消息提示 (Message)

```csharp
using UnityEngine;
using UnityEngine.UI;
using DG.Tweening;

public enum MessageType { Success, Warning, Error, Info }

public class MessageToast : MonoBehaviour
{
    [Header("配置")]
    [SerializeField] private MessageType type = MessageType.Info;
    [SerializeField] private string content;
    [SerializeField] private float duration = 3f;
    [SerializeField] private bool closable = true;

    [Header("UI引用")]
    [SerializeField] private Text contentText;
    [SerializeField] private Image iconImage;
    [SerializeField] private Image backgroundImage;
    [SerializeField] private Image borderImage;
    [SerializeField] private Button closeButton;
    [SerializeField] private CanvasGroup canvasGroup;
    [SerializeField] private RectTransform rectTransform;

    // 各类型颜色配置
    private static readonly Color SuccessColor = new Color(0.15f, 0.68f, 0.38f);
    private static readonly Color WarningColor = new Color(0.95f, 0.61f, 0.07f);
    private static readonly Color ErrorColor = new Color(0.90f, 0.30f, 0.24f);
    private static readonly Color InfoColor = new Color(0.20f, 0.60f, 0.86f);

    private void Start()
    {
        ApplyType();
        ApplyContent();

        if (closable && closeButton != null)
        {
            closeButton.onClick.AddListener(Close);
        }

        // 播放入场动画
        PlayEnterAnimation();

        // 自动关闭
        if (duration > 0)
        {
            Invoke(nameof(Close), duration);
        }
    }

    private void ApplyType()
    {
        Color color;
        Sprite icon = null;

        switch (type)
        {
            case MessageType.Success:
                color = SuccessColor;
                icon = SpriteAtlasManager.Instance?.GetSprite("check-circle");
                break;
            case MessageType.Warning:
                color = WarningColor;
                icon = SpriteAtlasManager.Instance?.GetSprite("warning");
                break;
            case MessageType.Error:
                color = ErrorColor;
                icon = SpriteAtlasManager.Instance?.GetSprite("x-circle");
                break;
            default:
                color = InfoColor;
                icon = SpriteAtlasManager.Instance?.GetSprite("info-circle");
                break;
        }

        if (borderImage != null) borderImage.color = color;
        if (contentText != null) contentText.color = color;
        if (iconImage != null)
        {
            iconImage.sprite = icon;
            iconImage.color = color;
        }

        if (closeButton != null)
        {
            closeButton.gameObject.SetActive(closable);
        }
    }

    private void ApplyContent()
    {
        if (contentText != null) contentText.text = content;
    }

    private void PlayEnterAnimation()
    {
        // 淡入 + 上滑入场
        canvasGroup.alpha = 0f;
        Vector3 startPos = rectTransform.position;
        startPos.y -= 20f;
        rectTransform.position = startPos;

        canvasGroup.DOFade(1f, 0.3f).SetEase(Ease.OutQuad);
        rectTransform.DOMoveY(startPos.y + 20f, 0.3f).SetEase(Ease.OutQuad);
    }

    private void Close()
    {
        // 淡出 + 下滑出场
        canvasGroup.DOFade(0f, 0.3f).SetEase(Ease.InQuad);
        rectTransform.DOMoveY(rectTransform.position.y - 20f, 0.3f).SetEase(Ease.InQuad)
            .OnComplete(() => Destroy(gameObject));
    }

    // 静态方法 - 快速显示消息
    public static MessageToast Show(MessageType type, string content, float duration = 3f)
    {
        var toastPrefab = UIManager.Instance.MessageToastPrefab;
        var toast = Instantiate(toastPrefab, UIManager.Instance.ToastContainer);
        var message = toast.GetComponent<MessageToast>();
        message.type = type;
        message.content = content;
        message.duration = duration;
        return message;
    }
}
```

## 业务组件

### 角色卡片 (CharacterCard)

```csharp
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;
using DG.Tweening;

[System.Serializable]
public class CharacterData
{
    public string id;
    public string name;
    public string realm;
    public int level;
    public int attack;
    public int defense;
    public int speed;
    public int progress;
    public Sprite avatar;
}

public class CharacterCard : MonoBehaviour
{
    [Header("角色数据")]
    [SerializeField] private CharacterData character;

    [Header("UI引用 - 头像区域")]
    [SerializeField] private Image avatarImage;
    [SerializeField] private Text levelText;

    [Header("UI引用 - 信息区域")]
    [SerializeField] private Text nameText;
    [SerializeField] private Text realmText;

    [Header("UI引用 - 属性区域")]
    [SerializeField] private Text attackText;
    [SerializeField] private Text defenseText;
    [SerializeField] private Text speedText;

    [Header("UI引用 - 进度区域")]
    [SerializeField] private Image progressFill;
    [SerializeField] private Text progressText;

    [Header("UI引用 - 按钮")]
    [SerializeField] private Button selectButton;
    [SerializeField] private Button viewButton;

    [Header("事件")]
    public UnityEvent<CharacterData> onCharacterSelected = new UnityEvent<CharacterData>();
    public UnityEvent<CharacterData> onCharacterViewed = new UnityEvent<CharacterData>();

    private RectTransform rectTransform;
    private Vector3 originalPosition;

    private void Awake()
    {
        rectTransform = GetComponent<RectTransform>();
        originalPosition = rectTransform.position;
    }

    private void Start()
    {
        SetupCard();
        SetupButtons();
    }

    private void SetupCard()
    {
        if (character == null) return;

        // 头像和等级
        if (avatarImage != null) avatarImage.sprite = character.avatar;
        if (levelText != null) levelText.text = $"Lv.{character.level}";

        // 名称和境界
        if (nameText != null) nameText.text = character.name;
        if (realmText != null) realmText.text = character.realm;

        // 属性
        if (attackText != null) attackText.text = character.attack.ToString();
        if (defenseText != null) defenseText.text = character.defense.ToString();
        if (speedText != null) speedText.text = character.speed.ToString();

        // 修炼进度
        UpdateProgress(character.progress);
    }

    private void UpdateProgress(int progress)
    {
        if (progressFill != null)
        {
            // 动画更新进度条
            progressFill.fillAmount = 0f;
            progressFill.DOFillAmount(progress / 100f, 0.5f).SetEase(Ease.OutQuad);
        }

        if (progressText != null)
        {
            // 数值滚动动画
            int currentValue = 0;
            DOTween.To(() => currentValue, x =>
            {
                currentValue = x;
                progressText.text = $"{x}%";
            }, progress, 0.5f).SetEase(Ease.OutQuad);
        }
    }

    private void SetupButtons()
    {
        if (selectButton != null)
        {
            selectButton.onClick.AddListener(() =>
            {
                onCharacterSelected?.Invoke(character);
            });
        }

        if (viewButton != null)
        {
            viewButton.onClick.AddListener(() =>
            {
                onCharacterViewed?.Invoke(character);
            });
        }
    }

    // 设置角色数据
    public void SetCharacter(CharacterData data)
    {
        character = data;
        SetupCard();
    }
}
```

## 组件使用指南

### 预制体加载和实例化

```csharp
// 组件管理器 - 通过预制体加载和实例化UI组件
using UnityEngine;
using System.Collections.Generic;

public class UIManager : MonoBehaviour
{
    public static UIManager Instance { get; private set; }

    [Header("预制体引用")]
    [SerializeField] private GameObject buttonPrefab;
    [SerializeField] private GameObject inputPrefab;
    [SerializeField] private GameObject cardPrefab;
    [SerializeField] private GameObject characterCardPrefab;

    [Header("UI容器")]
    [SerializeField] private Transform uiRoot;
    [SerializeField] private Transform toastContainer;
    [SerializeField] private Transform messageToastPrefab;

    private Dictionary<string, GameObject> loadedPrefabs = new Dictionary<string, GameObject>();

    private void Awake()
    {
        if (Instance == null) Instance = this;
    }

    // 创建按钮
    public GameButton CreateButton(Transform parent, ButtonVariant variant, string label)
    {
        var buttonObj = Instantiate(buttonPrefab, parent);
        var button = buttonObj.GetComponent<GameButton>();
        button.SetVariant(variant);

        var labelText = buttonObj.GetComponentInChildren<Text>();
        if (labelText != null) labelText.text = label;

        return button;
    }

    // 创建输入框
    public CustomInputField CreateInput(Transform parent, string label, string placeholder)
    {
        var inputObj = Instantiate(inputPrefab, parent);
        var input = inputObj.GetComponent<CustomInputField>();
        // 配置输入框...
        return input;
    }

    // 创建卡片
    public UICard CreateCard(Transform parent, string title, string subtitle)
    {
        var cardObj = Instantiate(cardPrefab, parent);
        var card = cardObj.GetComponent<UICard>();
        card.SetTitle(title);
        card.SetSubtitle(subtitle);
        return card;
    }

    // 创建角色卡片
    public CharacterCard CreateCharacterCard(Transform parent, CharacterData data)
    {
        var cardObj = Instantiate(characterCardPrefab, parent);
        var card = cardObj.GetComponent<CharacterCard>();
        card.SetCharacter(data);
        return card;
    }

    public Transform ToastContainer => toastContainer;
    public GameObject MessageToastPrefab => messageToastPrefab?.gameObject;
    public Transform UIRoot => uiRoot;
}
```

### 使用示例

```csharp
// 角色选择界面示例
using UnityEngine;
using UnityEngine.UI;
using System.Collections.Generic;

public class CharacterSelectView : MonoBehaviour
{
    [SerializeField] private Transform gridContent;
    [SerializeField] private CustomInputField searchInput;
    [SerializeField] private GameButton searchButton;

    private List<CharacterData> allCharacters = new List<CharacterData>();
    private List<CharacterData> filteredCharacters = new List<CharacterData>();
    private bool isLoading = false;

    private void Start()
    {
        // 设置搜索输入框
        searchInput.onValueChanged.AddListener(OnSearchChanged);

        // 设置搜索按钮
        searchButton.onClick.AddListener(SearchCharacters);

        // 加载角色列表
        LoadCharacters();
    }

    private void LoadCharacters()
    {
        // 从服务器加载角色数据
        allCharacters = CharacterManager.Instance.GetAllCharacters();
        filteredCharacters = allCharacters;
        RefreshGrid();
    }

    private void RefreshGrid()
    {
        // 清除现有卡片
        foreach (Transform child in gridContent)
        {
            Destroy(child.gameObject);
        }

        // 创建角色卡片
        foreach (var character in filteredCharacters)
        {
            var card = UIManager.Instance.CreateCharacterCard(gridContent, character);
            card.onCharacterSelected.AddListener(SelectCharacter);
            card.onCharacterViewed.AddListener(ViewDetails);
        }
    }

    private void OnSearchChanged(string query)
    {
        // 实时筛选
        if (string.IsNullOrEmpty(query))
        {
            filteredCharacters = allCharacters;
        }
        else
        {
            filteredCharacters = allCharacters.FindAll(c =>
                c.name.Contains(query) || c.realm.Contains(query));
        }
        RefreshGrid();
    }

    private void SearchCharacters()
    {
        if (isLoading) return;

        isLoading = true;
        searchButton.SetLoading(true);

        // 执行搜索
        OnSearchChanged(searchInput.Value);

        isLoading = false;
        searchButton.SetLoading(false);
    }

    private void SelectCharacter(CharacterData character)
    {
        Debug.Log($"选择角色: {character.name}");
        CharacterManager.Instance.SelectCharacter(character);
    }

    private void ViewDetails(CharacterData character)
    {
        Debug.Log($"查看详情: {character.name}");
        UIManager.Instance.OpenPanel(PanelType.CharacterDetail, character);
    }
}
```

### 主题定制

```csharp
// ScriptableObject主题配置
using UnityEngine;

[CreateAssetMenu(fileName = "CustomTheme", menuName = "Immortality/Custom Theme")]
public class CustomThemeConfig : ScriptableObject
{
    [Header("自定义颜色")]
    public Color primaryColor = new Color(0.29f, 0.56f, 0.89f);
    public Color secondaryColor = new Color(0.56f, 0.27f, 0.68f);

    [Header("自定义字体")]
    public Font customFont;

    [Header("自定义间距")]
    public float spacingMD = 16f;

    [Header("自定义按钮样式")]
    public Color customButtonColor1 = new Color(1f, 0.42f, 0.42f);
    public Color customButtonColor2 = new Color(0.31f, 0.80f, 0.77f);
}
```

```css
/* 自定义主题USS变量 */
:root {
  /* 重写默认颜色 */
  --primary-color: #your-primary-color;
  --secondary-color: #your-secondary-color;

  /* 重写字体 */
  --font-family-zh: 'Your-Font', sans-serif;

  /* 重写间距 */
  --spacing-md: 20px;
}

/* 自定义组件样式 */
.btn--custom {
  background-image: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: #ffffff;
  border-width: 0px;
}
```

## 开发规范

### 组件命名
- **PascalCase**: C#类名使用大驼峰命名（如 `CharacterCard`）
- **清晰语义**: 名称要能清楚表达组件功能
- **统一前缀**: UI组件统一使用 `UI` 前缀（如 `UICard`, `UIList`）

### 字段设计
- **SerializeField**: 所有需要配置的字段使用 `[SerializeField] private`
- **默认值**: 提供合理的默认值
- **枚举约束**: 对枚举类型使用枚举定义
- **注释文档**: 为复杂字段添加注释说明

### 事件设计
- **语义化命名**: 事件名要清楚表达触发时机（如 `onCharacterSelected`）
- **参数传递**: 传递必要的上下文信息
- **UnityEvent**: 使用UnityEvent支持编辑器中配置

### 样式规范
- **USS类名**: 使用BEM方法论命名USS类（如 `btn--primary`, `card--hoverable`）
- **ScriptableObject主题**: 使用ScriptableObject实现主题化管理
- **响应式适配**: 考虑不同屏幕尺寸的适配（Canvas Scaler）
- **性能优化**: 避免深层嵌套的UGUI层级和频繁的布局重建