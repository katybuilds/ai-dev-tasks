# Pixel Art Generator – UI Style Guide

文档角色说明：本文件定义产品在 Web 端的视觉系统，回答「长什么样」「如何保持视觉一致」。它是前端样式实现手册，不涉及功能逻辑或业务规则。行为与交互详见产品规格文档（如 `spec.md` / `docs/spec.md`）。若有冲突：**交互行为以规格文档为准，视觉细节以本文件为准**。

项目摘要：工具型像素艺术编辑器（Landing + `/web/`），调性简洁、高对比、工具型高效；主色 #0f172a；布局密度中等偏紧凑；字体为 Plus Jakarta Sans（sans）、Lora（serif）、Roboto Mono（mono）。

## 1. 基础 Design Tokens

### 1.1 字体（Typography Fonts）

- Sans（全站默认）：`"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif`
- Serif（文章/长文可选）：`"Lora", "Times New Roman", serif`
- Mono（代码/数字对齐）：`"Roboto Mono", ui-monospace, SFMono-Regular, monospace`
- 表单控件继承字体：`input, select, textarea, button { font-family: inherit; }`

### 1.2 颜色系统（Color System）

- `background`: `#fdfdfd`
- `foreground`: `#0f172a`
- `primary` / `primary-foreground`: `#0f172a` / `#ffffff`
- `secondary` / `secondary-foreground`: `#f0f0f0` / `#0f172a`
- `accent` / `accent-foreground`: `#e2e8f0` / `#0f172a`
- `card` / `card-foreground`: `#ffffff` / `#0f172a`
- `popover` / `popover-foreground`: `#fdfdfd` / `#0f172a`
- `muted` / `muted-foreground`: `#f7f7f7` / `#6f6f6f`
- `border` / `input` / `ring`: `#ebebeb` / `#f0f0f0` / `#0f172a`
- `destructive` / `destructive-foreground`: `#d33b2f` / `#ffffff`
- Chart palette（按需使用）：`#4cc9f0`, `#6d28d9`, `#b8b8b8`, `#ebebeb`, `#8f8f8f`
- Sidebar tokens：沿用 `--color-sidebar-*` 命名，数值同上色板。

Tailwind 对应：将上述 token 映射到 `theme.extend.colors`，保留语义命名；`ring` 与 `primary` 颜色保持一致。

### 1.3 圆角（Border Radius）

- `radius.sm`: 4px（小型控件）
- `radius.md`: 8px（输入、次级按钮）
- `radius.xl`: 12px（常用卡片/输入）
- `radius.2xl`: 24px（卡片、大型容器）
- `radius.full`: 9999px（Tag、胶囊按钮、图标圆钮）

### 1.4 阴影（Shadow）

- 卡片：`0 6px 16px rgba(15,23,42,0.12)`
- 轻量按钮：`0 10px 22px rgba(15,23,42,0.08)`
- 主按钮 hover：`0 18px 36px rgba(99,102,241,0.33)`
- 在 Tailwind `boxShadow` 中命名为 `card`、`elevated`、`primary-cta` 以便复用。

### 1.5 品牌元素与图标（Branding & Iconography）

- Logo：使用与主色契合的 SVG，导航建议尺寸 `h-8 w-8`；渐变可用 `primary` 不同明度。
- Favicon：提供 32x32 SVG/PNG；与 Logo 保持一致。
- 图标库：优先使用一致的矢量库（如 Material Symbols 或 Lucide）；图标大小约 `24px`。

## 2. Layout 与间距（Layout & Spacing）

- 页面容器：`max-width: 1080px; padding: 0 24px; margin: 0 auto;`
- Landing 内嵌编辑器容器：`max-width: 1340px`，用于容纳工具面板。
- 垂直节奏：section `padding: 48px 0`（移动端 `32px`）；区块内部 `gap/space-y: 20–24px`，移动端收紧至 `16px`。
- 列表/栅格：桌面 `gap: 24px`，移动端 `gap: 16px`。
- 经典编辑器高度（iframe 已移除，但保持约束用于对齐）：Start 220px、Settings 580px、Editor 100vh，不在编辑器内部产生滚动条。
- 法务/教程页容器：`mx-auto max-w-3xl px-4 py-10`，段落使用 `space-y-2~6`。

## 3. Typography 体系

- H1：`clamp(2.5rem, 6vw, 3.5rem)`，`font-weight: 700`
- H2：`clamp(2rem, 5vw, 2.5rem)`，`font-weight: 600`
- H3：`20–22px`，`font-weight: 600`
- Eyebrow：`0.75rem`，`letter-spacing: 0.30em`，全大写
- 正文：`16px`，`line-height: 1.6`，颜色 `foreground`
- 次要文本：`text-sm`，颜色 `muted-foreground`
- 语言：所有 UI 文案保持英文；内部说明可用中文。
- 文案大小写（Capitalization）：标题/按钮/导航等使用 Title Case；说明/正文使用 Sentence case；缩写保持原样（如 CTA / API / SEO / FAQ），代码与参数用反引号包裹并保持原样。

## 4. 组件样式

### 4.1 按钮（Buttons）

- 主 CTA `.button-primary`（如 “Launch Editor” / “Start Converting”）：
  - `display: inline-flex; align-items: center; justify-content: center;`
  - `padding: 12px 22px; border-radius: 999px; font-weight: 600;`
  - 背景 `primary`，文字 `#fff`，阴影 `0 12px 22px -16px rgba(15,23,42,0.7)`；hover `translateY(-2px)` 且阴影加深；focus-visible 使用 `2px solid var(--accent)` + `outline-offset: 4px`。
- 次级/轻量按钮：同尺寸，背景 `#fff`，边框 `border`，文字 `foreground/80`，hover `bg-muted`。
- 图标圆钮：`44px` 正圆，边框 `border`，背景 `card`，hover `bg-muted`。

### 4.2 表单与输入（Form Fields）

- 标签 `.field-label`：`text-sm font-medium text-foreground`
- 输入 `.field-input`：`height: 42px; border: 1px solid var(--color-border); border-radius: 12px; padding: 0 12px; background: #fff;`
- 密集版 `.field-input--dense`：高度 36px，`padding: 0 10px`
- 数值芯片 `.field-input--chip`：`text-align: center; font-variant-numeric: tabular-nums; border-radius: 12px`
- 数值芯片窄版 `.field-input--chip-narrow`：控件收窄以适应窄屏 `clamp(120px, 40vw, 200px)`
- 去除 number input 原生箭头；focus 使用 `box-shadow: 0 0 0 2px var(--color-ring)`.

### 4.3 卡片与容器（Cards & Surfaces）

- 卡片：`border: 1px solid var(--color-border); border-radius: 24px; padding: 20px; background: card; box-shadow: card shadow`
- Popover/Modal：同卡片圆角，阴影使用 `elevated`；遮罩 `rgba(0,0,0,0.5)`，面板最大宽度 640px。

### 4.4 标签 / Chips

- 圆角 `999px`，`border: 1px solid var(--color-border); background: #fff; padding: 4px 12px; font-size: 12px; color: foreground`；hover 可加 `bg-muted`。

### 4.5 上传区（Start Screen）

- 结构：`section.start-screen > div.start-simple`，内部含上传按钮与提示。
- 布局：`display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; width: 90%; margin: 0 auto;`
- 按钮：复用 `.button-primary`；外层 `<label>` 包裹透明 `input[type=file]`。
- 文案：`Drop an image or .schematic file here (up to 15 MB)`，保持单行。

### 4.6 编辑器布局要点

- `.editor-screen .columns`：`display: flex; flex-wrap: nowrap !important;`
- 右侧调色板列：`flex-basis 300px; max-width 340px`，断点收缩：≤1500px → `280/320px`，≤1380px → `260/300px`。
- 工作区 `min-height: 700px`；棋盘背景保持 25px 网格；避免 Palette 换行或溢出。

## 5. 交互动效与状态（Interactions & States）

- Hover：轻微上浮 `translateY(-1px)`；主按钮额外加深阴影。
- Focus：`focus-visible:ring-2 focus-visible:ring-ring`，不使用复杂 `ring-offset`。
- Disabled：`opacity: 0.5; pointer-events: none;`，不响应 hover。
- 拖拽（排序/拖入）：被拖拽项可用 `scale-97` + `-translate-y-1`，`border-primary bg-primary/10 shadow-[0_18px_40px_rgba(99,102,241,0.45)]`；插入占位使用虚线边框。

## 6. 响应式与栅格（Responsive & Grid）

- 桌面优先，移动端通过 `md:`/`lg:` 增强；保持容器 `px-4` 以适配窄屏。
- 表单行/数值芯片在 `<768px` 使用 `clamp()` 收紧；`<460px` 可拆为两列网格；`<414px` 堆叠为单列。
- 复杂编辑器布局：桌面使用 `grid grid-cols-[auto,minmax(0,1fr)]` 或 flex 两列；移动端堆叠，工具栏保持可见。
- 导航在移动端尽量简化，避免过多一级入口；减少装饰性阴影，优先可读性。

## 7. 无障碍与可访问性（A11y）

- 所有可交互元素可聚焦并有可见焦点；使用原生 `<button>` / `<a>`。
- 表单：`label` 与控件 `for/id` 关联；错误/提示通过 `aria-describedby`；错误色使用 `destructive` 语义。
- 对比度：主文案与背景对比度 ≥ 4.5:1；禁用状态仍保持可辨识，不作为唯一传达方式。

## 8. 常用代码片段示例（Snippets）

### 8.1 页面标题与说明

```html
<header class="mb-4">
  <h1 class="text-2xl font-semibold">Page Title</h1>
  <p class="text-sm text-muted-foreground">Optional subtitle</p>
</header>
```

### 8.2 表单一行（Label + 输入 + 单位）

```html
<label class="field-label inline-flex items-center gap-2">
  Width
  <input
    class="field-input field-input--chip-narrow text-center tabular-nums"
    inputmode="numeric"
    pattern="\\d*"
  />
  <span class="text-sm text-muted-foreground">px</span>
</label>
```

### 8.3 列表卡片

```html
<article class="rounded-2xl border border-border bg-card p-5 shadow-sm">
  <h3 class="text-lg font-semibold">Title</h3>
  <p class="mt-2 text-sm text-foreground/90">Description text</p>
</article>
```
