++ docs/style.md
# Pixel Art Generator – UI Style Guide

本指南同步 `backup/docs/STYLE-GUIDE.md` 的核心设计令牌，作为 landing page 与经典编辑器的统一参考。

## 1. 基础设计令牌（Design Tokens）

- **字体**
  - Sans：Plus Jakarta Sans（全站默认）
  - Serif：Lora（备用）
  - Mono：Roboto Mono（代码/等宽）
- **颜色**（与 `backup/docs/STYLE-GUIDE.md` 一致）
  - Background: `#fdfdfd`
  - Foreground: `#000000`
  - Primary / Secondary / Accent：`#000000` / `#f0f0f0` / `#f0f0f0`
  - Card / Popover：`#ffffff` / `#fdfdfd`
  - Muted：`#f7f7f7`，Muted Foreground：`#6f6f6f`
  - Border：`#ebebeb`
  - Input：`#f0f0f0`
  - Ring：`#000000`
  - Destructive：`#d33b2f`
  - Chart 配色：`#4cc9f0`、`#6d28d9`、`#b8b8b8`、`#ebebeb`、`#8f8f8f`
  - Sidebar tokens：参考 STYLE-GUIDE，命名保持 `--color-sidebar-*`
- **圆角**
  - base: 4px；lg: 8px；xl: 12px；full: 9999px
- **阴影**
  - 卡片：`0 6px 16px rgba(15,23,42,0.12)`
  - 按钮：`0 10px 22px rgba(15,23,42,0.08)`；主按钮 hover：`0 18px 36px rgba(99,102,241,0.33)`

## 2. 版心与间距

- 页面容器：`max-width: 1080px`，居中并使用 `padding: 0 24px`
- 垂直节奏：区块 `padding: 48px 0`（桌面），移动端可收紧为 `32px`
- 列表/栅格间距：`gap: 24px`（移动端 16px）
- Landing 页面内嵌经典编辑器（Playground）：
  - 外层容器 `max-width: 1340px`，与主版心拉开以容纳工具面板。
  - 高度规则按“上传 → 设置 → 编辑”三步流分级：
    - Start（上传）：高度 220px（精简占位）
    - Settings（设置）：高度 580px（足够显示预览与控件）
    - Editor（编辑）：高度 100vh（等于 `window.innerHeight`），不出现内部滚动条。
  - iframe 内部 `scrolling='no'`；页面允许滚动（不锁 `body` 的 `overflow`）。

## 3. 排版体系

- H1：`clamp(2.5rem, 6vw, 3.5rem)`，bold
- H2：`clamp(2rem, 5vw, 2.5rem)`
- H3：`20–22px`
- Eyebrow：`0.75rem`、`letter-spacing: 0.30em`、全部大写
- 正文：`16px`，`line-height: 1.6`
- 次要文本：使用 `var(--color-muted-foreground)`

## 4. 组件约定

- **按钮**：默认圆角 `999px`（胶囊）；文本 `0.05em` letter-spacing；hover 有轻微上浮
  - 主 CTA (`.primary-btn`，例如 “Launch Editor” / “Start Converting”)：`padding: 12px 22px`，`display: inline-flex`，背景 `var(--primary)`，文字 `#fff`、`font-weight: 600`、全部大写；阴影 `0 12px 22px -16px rgba(15,23,42,0.7)`，hover `box-shadow: 0 16px 30px -18px rgba(15,23,42,0.55)` 并 `translateY(-2px)`；focus-visible 轮廓 `2px solid var(--accent)`、`outline-offset: 4px`
  - Start 屏幕中的文件上传触发器与主 CTA 共用上述规格（无图标，仅文本 “Upload File”）
- **图标按钮**：44px 正圆，边框 `--color-border`，hover 背景 `--color-muted`
- **输入框**：高度 42px，圆角 12px，边框 `1px solid --color-border`，focus `box-shadow: 0 0 0 2px var(--color-ring)`
- **卡片**：圆角 24px，边框 `--color-border`，阴影使用卡片 shadow
- **标签/Chips**：圆角 999px，边框 `--color-border`，背景 `#fff`
- **Modal**：遮罩 `rgba(0,0,0,0.5)`，面板使用卡片样式，最大宽度 640px

- **上传区（Start Screen）**
  - DOM 结构：`section.start-screen > div.start-simple`；内部只包含上传按钮与提示语
  - 按钮：使用 `.button-primary`，上层 `<label>` 包裹透明 `input[type=file]`，无额外图标
  - 提示文本：单行 `Drop an image or .schematic file here (up to 15 MB)`
  - 布局：`start-simple` 采用 `flex` 居中，垂直间距 `gap: 18px`，整体宽度 90%

## 5. 动效与交互

- Hover：轻微上浮 `translateY(-1px)`，阴影增强（仅主按钮）
- Focus：`outline: none` + `box-shadow: 0 0 0 2px var(--color-ring)`
- Disabled：`opacity: 0.5`，`pointer-events: none`

## 6. 响应式指引

- 桌面优先，移动端将两列布局改为上下栈叠
- 数字输入、按钮等在 `<768px` 下使用 `width: clamp(120px, 40vw, 200px)` 保持可用宽度

## 7. 无障碍

- 所有交互元素需提供可见 focus 样式与 ARIA 标签
- 表单控件关联 `<label>`，错误提示使用 `var(--color-destructive)`

## 8. 实施说明

- `app/style.css` 已引入上述 token，请在新样式中直接使用相应变量。
- 重写旧 Bulma 样式时，优先使用这里的颜色/字体令牌，避免硬编码。
- 编辑器的新增/调整按钮、卡片、输入等，请参考本指南中的尺寸与交互规则。

## 9. 组件样式基线（2025 Q4）

| 组件 | 当前类名 | 关键属性 |
| --- | --- | --- |
| 主按钮 | `.button-primary` | `display: inline-flex`、`padding: 12px 22px`、圆角 `999px`、背景 `#0f172a`、hover 提升 |
| 次级按钮 | `.button-primary.light` / `.button-primary.small` | 明亮外观、细边框，或缩小尺寸 |
| Upload 触发器 | `.button-primary` | 与主按钮同步，无图标 |
| Block Group 卡片 | `.settings-screen .block-groups .box` | 栅格布局、`border-radius: 18px`、浅阴影，高亮态（含 `.box-selected` / `.box.is-selected`）使用深灰描边与阴影 |
| Dropzone | `#start-dropzone` | 中心对齐、圆角 24px、无边框，紧凑模式宽度 `90%` |
| 导出计数器 | `.convert-screen .counter` | 内边距 `0.5rem`、圆角 20px、深灰背景 |

如需新增组件，请在此表记录名称、类名与设计说明。

## 10. 样式组织约定

- **样式来源优先级**：`app/style.css`（核心） → `web/index.html` 内联 → 打包 JS/Bulma（即将移除）。新样式一律放入 `app/style.css`，并尽量避免内联声明。
- **命名空间**：所有新类名使用语义化、无 Bulma 前缀的命名（如 `.button-primary`、`.surface-card`）。
- **覆盖策略**：仅在必须压制旧 Bulma 规则时使用 `!important`，并在移除 Bulma 后回收这些声明。

