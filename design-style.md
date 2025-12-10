# Design Style Guide

## 如何用于新项目

1. 在启动新项目时，先根据 **1. 基础 Design Tokens** 补齐项目变量：
   - 品牌关键词与语气（例如：理性 / 温暖 / 运动感 / 科技感 等）。
   - 字体家族及使用场景。
   - 颜色系统：primary / secondary / accent / gray scale / 成功 & 错误状态色等。
2. 在 `tailwind.config.{js,ts}` 中配置与本文件一致的 design tokens（颜色、字体、圆角、阴影等），并在全局样式（如 `app/globals.css`）中定义这里提到的组件类名。
3.

## Output

- **Format:** Markdown (`.md`)
- **Location:** `/docs/`
- **Filename:** `style.md`
- **Doc Role Note:** When generating the PRD `style.md`, you **must** add the following note near the top of the document (typically right after the main title):

  `文档角色说明：本文件定义产品在 Web 端的视觉系统，回答「长什么样」「如何保持视觉一致」。它是前端样式实现手册，不涉及功能逻辑或业务规则。

> 行为与交互详见产品规格文档（如 `spec.md` / `docs/spec.md`）。若有冲突：**交互行为以规格文档为准，视觉细节以本文件为准**。

4. 之后可让 AI 或开发者在实现组件 / 页面时，**始终优先遵循本文件的规则**；当需要新增模式时，应先在此文件中扩展规范，再去写代码。

---

## 1. 基础 Design Tokens（Design Tokens）

Design Tokens 用于在设计与代码间建立统一语言，主要包含字体、颜色、圆角、阴影等，并与 Tailwind 配置对应。

### 1.1 字体（Typography Fonts）

- 推荐结构：
  - **Sans 主字体**（正文 / 表单 / 大部分 UI）
    - 示例：`Plus Jakarta Sans` 或任一干净、现代的无衬线字体。
  - **Serif 拓展字体**（可选，用于品牌标题或内容型站点）
    - 示例：`Lora`。
  - **Mono 等宽字体**（代码 / 数字对齐）
    - 示例：`Roboto Mono`。
- Tailwind 配置建议：
  - 在 `theme.extend.fontFamily` 中定义：`sans` / `serif` / `mono`；
  - 保证表单控件继承字体：`input, select, textarea, button { font-family: inherit; }`。
- **新项目需要提供：**
  - 品牌首选 Sans 字体（含回退字体栈）；
  - 是否需要 Serif / Mono，以及对应使用场景。

### 1.2 颜色系统（Color System）

- 推荐 token 结构（与 Tailwind `theme.colors` 对齐）：
  - `background` / `foreground`
  - `primary` / `primary-foreground`
  - `secondary` / `secondary-foreground`
  - `accent` / `accent-foreground`
  - `muted` / `muted-foreground`
  - `card` / `card-foreground`
  - `popover` / `popover-foreground`
  - `border` / `input` / `ring`
  - `destructive` / `destructive-foreground`
  - 成功 / 警告色（如 `success`, `warning`）可在项目中自行扩展。
- 示例调色板（可直接使用，也可替换）：
  - `background`: `#e7e5e4`
  - `foreground`: `#1e293b`
  - `primary` / `primary-foreground`: `#6366f1` / `#ffffff`
  - `secondary` / `secondary-foreground`: `#d6d3d1` / `#4b5563`
  - `accent` / `accent-foreground`: `#f3e5f5` / `#374151`
  - `card` / `card-foreground`: `#f5f5f4` / `#1e293b`
  - `popover` / `popover-foreground`: `#f5f5f4` / `#1e293b`
  - `muted` / `muted-foreground`: `#e7e5e4` / `#6b7280`
  - `border` / `input` / `ring`: `#d6d3d1` / `#d6d3d1` / `#6366f1`
  - `destructive` / `destructive-foreground`: `#ef4444` / `#ffffff`
- **新项目需要提供：**
  - 至少一套 primary / secondary / accent / neutral（灰阶）；
  - 成功 / 错误 / 警告的状态色；
  - 深色模式是否需要单独的 token（本文件默认以浅色模式为例）。

### 1.3 圆角（Border Radius）

- 建议统一使用一小撮固定半径，在 Tailwind 中扩展：
  - `radius.sm`: 4px（如 `rounded` / `rounded-md`）
  - `radius.lg`: 8px（较常用）
  - `radius.xl`: 12px（卡片 / 弹窗）
  - `radius.full`: `9999px`（Tag、胶囊按钮、图标圆钮）
- **经验规则：**
  - 表单输入、卡片：`8px–12px`；
  - Button / Tag：通常 `full`；
  - 保持同一页面内圆角种类不超过 3 种。

### 1.4 阴影（Shadow）

- 推荐使用少量可复用的阴影层级：
  - **基础卡片**：`shadow-sm` 或 `0 6px 16px rgba(15,23,42,0.12)`；
  - **轻量按钮**：`0 10px 22px rgba(15,23,42,0.08)`；
  - **主按钮 Hover**：`0 16–36px rgba(99,102,241,0.32~0.38)`；
- 建议在 Tailwind 的 `boxShadow` 中以语义命名（如 `card`, `elevated`, `primary-cta`）。
- **新项目需要提供：**
  - 最少 2–3 个语义阴影层级（低 / 中 / 高）。

### 1.5 品牌元素与图标（Branding & Iconography）

- Logo：
  - 使用与品牌调性匹配的矢量图标（SVG 为佳）；
  - 导航栏中的推荐尺寸：`h-8~10 w-8~10`；
  - 若使用渐变，建议使用 `primary` 色板的不同明度，并避免与背景对比不足。
- Favicon：
  - 与 Logo 保持视觉关联；
  - 提供至少 32x32 SVG/PNG 以及必要的 Apple Touch Icon。
- 功能性图标：
  - 图标按钮通常使用 `24px` 左右的图标（例如 `text-xl`）；
  - 使用一致的图标库（如 Material Symbols / Heroicons），避免混搭。
- **新项目需要提供：**
  - 品牌 Logo（SVG）与 favicon；
  - 是否使用统一图标库及其来源。

---

## 2. Layout 与间距（Layout & Spacing）

### 2.1 页面容器（Page Shell）

- 通用页面容器推荐：
  - 主内容：`mx-auto max-w-5xl px-4`；
  - 文章 / 文档类页面可收窄为：`max-w-3xl`。
- 若有固定导航栏，建议保证容器左右与导航中的 Logo 对齐。

### 2.2 垂直节奏（Vertical Rhythm）

- 页面一级区块（section）：`py-8`（移动端可视情况减小到 `py-6`）。
- 区块内元素间距：`space-y-3~5`；
- 列表项间距：`gap-3~4`，Mobile 可收紧为 `gap-2`。
- 保持「标题 / 文本 / 操作区」之间明确层级，可以使用：
  - 标题上方小距离，下方较大距离（例如：标题下 `mt-2~3`）。

### 2.3 专用模板示例：法律页面（Privacy / Terms）

- 页面主体容器：`mx-auto max-w-3xl px-4 py-10`。
- 标题区：
  - 主标题：`text-2xl font-semibold`；
  - 说明文字：`text-sm md:text-base text-muted-foreground`（如需要简介）。
- 小节与正文：
  - 小节容器：`space-y-2`；
  - 小节标题：`text-lg font-semibold`；
  - 正文段落：`text-sm md:text-base leading-relaxed text-foreground`；
  - 列表：`ul` 使用 `list-disc list-outside space-y-1 pl-5`。
- 全文使用 `<section class="mt-4 space-y-6">` 包裹正文，保证段落与列表之间节奏统一。

---

## 3. Typography 体系

### 3.1 标题层级（Headings）

- H1：`text-2xl font-semibold`（页面标题 / 区块大标题）
- H2：`text-xl font-semibold mt-6 mb-2`
- H3：`text-lg font-semibold mt-5 mb-2`
- 对应 HTML 语义标签 `<h1>~<h3>`，在内容页中保持层级连续，不跳级。

### 3.2 正文与辅助文本

- 正文（Body）：
  - 类名：`leading-7 my-3 text-foreground`；
  - 每段控制在 3–5 行以内，便于阅读。
- 次要文本（Secondary Text）：
  - 类名：`text-sm text-muted-foreground`；
  - 用于说明、帮助文本等。
- 辅助标签 / 小说明：
  - 类名：`text-xs text-slate-600` 或项目内对应的灰阶 text。

### 3.3 Typography 使用原则

- 保持页面中最多 2–3 个字号层级；
- 同级标题样式必须一致（不要在相邻模块中混用不同粗细或大小）；
- 按语义选标签（例如按钮文案用 `<button>`，非视觉目的不要强行用 `<hX>`）。

---

## 4. 通用组件样式

以下为推荐的基础组件外观与类名，建议在全局 CSS 的 `@layer components` 中定义。

### 4.1 表单输入（Form Fields）

- 语义类名：
  - 标签：`.field-label`
  - 基础输入（胶囊）：`.field-input`
  - 紧凑输入：`.field-input--dense`
  - 数值芯片（宽版）：`.field-input field-input--chip text-center tabular-nums`
  - 数值芯片（窄版）：`.field-input field-input--chip-narrow text-center tabular-nums`
- 行为建议：
  - 数字输入统一移除原生上下微调按钮；
  - 移动端 / 窄屏使用 `clamp()` 收紧宽度。
- 示例：

```html
<label class="field-label">Minutes</label>
<input
  class="field-input field-input--chip text-center tabular-nums"
  inputmode="numeric"
  pattern="\\d*"
/>
```

### 4.2 按钮（Buttons）

#### 4.2.1 图标圆钮（Icon Button）

```html
<button
  class="h-11 w-11 rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
  <span class="material-symbols-outlined text-xl">delete</span>
</button>
```

用于单一图标操作（删除、关闭、更多等），保持紧凑、圆形。

#### 4.2.2 轻量胶囊按钮（Secondary / Ghost）

基础样式：

```html
<button
  class="h-10 px-5 rounded-full border border-border bg-white text-sm font-medium shadow-[0_10px_22px_rgba(15,23,42,0.08)] hover:-translate-y-px transition"
>
  Label
</button>
```

变体建议：

- Primary：`bg-gradient-to-b from-primary to-indigo-600 text-white border-transparent hover:shadow-[0_18px_36px_rgba(99,102,241,0.30)]`
- Success：`bg-gradient-to-b from-emerald-500 to-emerald-600 text-white border-transparent hover:shadow-[0_18px_36px_rgba(16,185,129,0.30)]`
- Neutral：`bg-white border-border text-foreground/80 hover:bg-muted`

#### 4.2.3 主行动按钮（Primary Call-to-Action）

用于最重要的页面动作（如「开始」「保存」「Go」等）：

```html
<button
  class="h-12 px-7 py-3.5 rounded-full text-base font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-br from-primary to-indigo-700 shadow-[0_16px_36px_rgba(99,102,241,0.32)] hover:shadow-[0_24px_52px_rgba(99,102,241,0.38)] focus-visible:ring-2 focus-visible:ring-ring"
>
  GO
</button>
```

- 单页面中通常只出现 1 个主行动按钮；
- 文案应简短有力（1–2 个词）。

### 4.3 卡片（Card）

```html
<article
  class="rounded-2xl border border-border bg-card p-5 shadow-sm"
></article>
```

- 用于承载一块独立信息（列表项、设置卡片等）；
- 内部标题和正文遵守 Typography 体系。

### 4.4 标签 / Chip（Tag / Chip）

```html
<a
  class="rounded-full border border-border bg-white px-3 py-1 text-xs text-foreground"
>
  tag
</a>
```

- 用于展示标签、过滤项、状态等；
- 若可点击，建议在 hover 时加轻微背景增强（如 `hover:bg-muted`）。

### 4.5 复杂业务组件模式：可排序列表编辑器（示例）

参考「Interval 编辑器」类场景，可抽象为：

- 左侧为拖拽手柄 + 状态点；
- 右侧为名称输入 + 参数输入区域。

布局建议：

- 主容器使用 `grid grid-cols-[auto,minmax(0,1fr)]`；
- 左右列间距：`gap-x-2`；
- 上下间距：`gap-y-1.5~2`；
- 名称行与操作按钮行使用较小间距 `gap-1.5~2`，保证整体紧凑；
- 名称输入使用 `field-input field-input--dense w-full`。

交互建议：

- 点击名称输入时默认全选，方便一键覆盖；
- 如自动按 `Item 1 / Item 2` 命名，拖拽或复制后自动重排编号；
- 一旦用户手动输入名称，停止自动重命名，只保留自动全选行为。

---

## 5. 交互动效与状态（Interactions & States）

- **Hover：**
  - 默认轻微上浮 `hover:-translate-y-px`，不额外强化阴影（主按钮除外）；
  - 背景或边框颜色略变即可传达可交互性。
- **Focus：**
  - 使用 `focus-visible:ring-2 focus-visible:ring-ring`；
  - 避免在移动端使用复杂的 `ring-offset`，以减少闪烁问题。
- **Disabled：**
  - 使用统一样式：`opacity-50 pointer-events-none`；
  - 同一组件在禁用状态下不应再响应 hover 动画。
- **拖拽反馈（例如排序卡片）：**
  - 当前拖拽中的卡片：
    - 略缩小并抬起：`scale-[0.97] -translate-y-1`；
    - 边框 / 背景带上 `primary` 高亮：`border-primary bg-primary/10`；
    - 叠加强阴影：如 `shadow-[0_18px_40px_rgba(99,102,241,0.45)]`。
  - 目标插入位置：
    - 在卡片上下缘绘制清晰的高亮横线（`ring-primary/50`）；
    - 插入一块与卡片同高的虚线占位卡片：`border-dashed bg-primary/5`。

---

## 6. 响应式与栅格（Responsive & Grid）

- **整体策略：**
  - 桌面优先，移动端适配；
  - 容器使用固定最大宽度（如 `max-w-5xl`），通过 `px-4` 等内边距保证小屏体验。
- **数值芯片 / 表单行：**
  - `<768px` 使用 `clamp()` 收紧宽度；
  - `<460px` 时可将一行中的多字段拆为两列网格；
  - `<414px` 下必要时降为单列堆叠，保证点击区域足够大。
- **复杂编辑器布局（示例）**
  - 使用二维网格：`grid grid-cols-[auto,minmax(0,1fr)]`；
  - 移动端可改为纵向堆叠，拖拽手柄与主要内容保持在视区内。

---

## 7. 无障碍与可访问性（A11y）

- 所有交互元素需可聚焦，支持键盘访问：
  - 按钮、链接等使用原生 `<button>` / `<a>`；
  - 自定义可点击区域（如卡片）应添加 `role` 与 `tabindex`。
- 表单：
  - 每个输入控件都有对应的 `label` 并通过 `for` / `id` 关联；
  - 错误 / 提示信息使用 `aria-describedby` 关联控件；
  - 错误色 / 警告色示例：`text-red-600` / `text-amber-600`。
- 对比度：
  - 主文案与背景的对比度建议 ≥ 4.5:1；
  - 禁用状态也应保持可辨认，但不建议作为唯一信息传递方式。

---

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
  Rest
  <input
    class="field-input field-input--chip-narrow text-center tabular-nums"
    inputmode="numeric"
    pattern="\\d*"
  />
  <span class="text-sm text-muted-foreground">sec</span>
</label>
```

### 8.3 列表卡片

```html
<article class="rounded-2xl border border-border bg-card p-5 shadow-sm">
  <h3 class="text-lg font-semibold">Title</h3>
  <p class="mt-2 text-sm text-foreground/90">Description text</p>
</article>
```

---

**说明：**

- 颜色 / 字体等 Design Tokens 推荐来源于项目的 `tailwind.config.ts`；创建新项目时应复制或继承该配置；
- 本文件中的类名与片段代表一种「默认设计习惯」，新项目可以在不破坏整体风格的前提下做渐进式扩展；
- 当需要新增组件类型或视觉模式时，建议先在本文件补充规范，再落地到具体代码。
