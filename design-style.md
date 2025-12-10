# Style Guide

本指南定义产品的视觉呈现和设计系统，回答「长什么样」「如何保持视觉一致」的问题，是前端样式实现手册，不涉及功能逻辑。

> 快捷导航：需求与交互详见 `docs/spec.md`。若有冲突：行为以 `spec.md` 为准，视觉细节以本文件为准。

## 1. 基础设计令牌（Design Tokens）

- 字体
  - Sans: Plus Jakarta Sans（全站默认）
  - Serif: Lora（备用）
  - Mono: Roboto Mono（代码/等宽）
- 颜色（与 Tailwind 配置保持一致）
  - background: #e7e5e4
  - foreground: #1e293b
  - primary / primary-foreground: #6366f1 / #ffffff
  - secondary / secondary-foreground: #d6d3d1 / #4b5563
  - accent / accent-foreground: #f3e5f5 / #374151
  - card / card-foreground: #f5f5f4 / #1e293b
  - popover / popover-foreground: #f5f5f4 / #1e293b
  - muted / muted-foreground: #e7e5e4 / #6b7280
  - border / input / ring: #d6d3d1 / #d6d3d1 / #6366f1
  - destructive / destructive-foreground: #ef4444 / #ffffff
- 圆角（tailwind）
  - default: 4px，lg: 8px，xl: 12px，full: 9999px
- 阴影（常用）
  - 基础卡片：shadow-sm（或 0 6px 16px rgba(15,23,42,0.12)）
  - 轻量按钮：0 10px 22px rgba(15,23,42,0.08)
  - 主按钮 Hover：0 16–36px rgba(99,102,241,0.32~0.38)

### Branding & Icons 视觉规范

- Logo：使用圆环分段 + 指针的 SVG（`src/components/LogoIcon.tsx`），导航栏尺寸参考 `h-9 w-9`，渐变色使用 primary/indigo 族色，渐变 ID 通过 `useId()` 动态生成避免冲突。
- Favicon：`public/favicon.svg` 与 Logo 保持一致，作为浏览器图标和 Apple Touch Icon 使用。
- 拖拽手柄：三条 0.5 高水平线竖向堆叠，按钮尺寸在桌面/移动分别映射为 `h-12 w-10` / `h-9 w-9` 的圆角胶囊，颜色使用对应 interval 色。
- 颜色拾取/状态点：桌面使用 8–10px 方形按钮（2px 边框、`rounded-md`、`p-0.5`），移动端在拖拽手柄下方使用 4×4 容器、3×3 实心圆点，无额外外框。

## 2. 版心与间距

- 页面容器：`mx-auto max-w-5xl px-4`（与导航 Logo 左右对齐）
- 垂直节奏：页面一级区块 `py-8`；区块内元素 `space-y-3~5`
- 列表间距：`gap-3~4`；移动端可收紧为 `gap-2`

### 2.1 法律页面（Privacy / Terms）排版模板

- 页面主体容器：`mx-auto max-w-3xl px-4 py-10`；
- 标题区：
  - 主标题：`text-2xl font-semibold`；
  - 说明文字使用 `text-sm md:text-base text-muted-foreground`（如有需要）。
- 小节与正文：
  - 小节容器：`space-y-2`；
  - 小节标题：`text-lg font-semibold`；
  - 正文段落：`text-sm md:text-base leading-relaxed text-foreground`；
  - 列表：`ul` 使用 `list-disc list-outside space-y-1 pl-5`，`li` 内容控制在一行或短句内，避免大段长句。
- 建议统一使用 `<section class="mt-4 space-y-6 ...">` 包裹整篇正文，保证段落和列表之间的垂直节奏。

## 3. 排版体系（Tailwind 文本级别）

- H1/H2/H3：
  - H1 `text-2xl font-semibold`（文章标题/区块大标题）
  - H2 `text-xl font-semibold mt-6 mb-2`
  - H3 `text-lg font-semibold mt-5 mb-2`
- 正文：`leading-7 my-3 text-foreground`
- 次要文本：`text-sm text-muted-foreground`
- 标签/说明：`text-xs text-slate-600`

> 全站字体通过 app/layout.tsx 引入；确保表单控件 `font-family: inherit`。

## 4. 组件样式约定（可直接复用）

以下类名已在 app/globals.css 定义（@layer components）。

### 4.1 表单输入

- 标签：`.field-label`
- 基础输入（胶囊）：`.field-input`
- 紧凑输入：`.field-input--dense`
- 数值芯片（分钟/秒）：`.field-input field-input--chip text-center tabular-nums`
  - 数值芯片（Reps/Rest 窄版）：`.field-input field-input--chip-narrow text-center tabular-nums`
- 数字输入统一移除上下微调按钮，移动端/窄屏宽度使用 clamp() 自适应（已内置于 globals.css）。

示例：

```html
<label class="field-label">Minutes</label>
<input
  class="field-input field-input--chip text-center tabular-nums"
  inputmode="numeric"
  pattern="\\d*"
/>
```

### 4.2 图标圆钮（Icon Button）

```html
<button
  class="h-11 w-11 rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
  <span class="material-symbols-outlined text-xl">delete</span>
</button>
```

### 4.3 轻量胶囊按钮（Reset/Manage/Cancel 等）

基础：

```html
<button
  class="h-10 px-5 rounded-full border border-border bg-white text-sm font-medium shadow-[0_10px_22px_rgba(15,23,42,0.08)] hover:-translate-y-px transition"
>
  Label
</button>
```

变体：

- Primary：`bg-gradient-to-b from-primary to-indigo-600 text-white border-transparent hover:shadow-[0_18px_36px_rgba(99,102,241,0.30)]`
- Success：`bg-gradient-to-b from-emerald-500 to-emerald-600 text-white border-transparent hover:shadow-[0_18px_36px_rgba(16,185,129,0.30)]`
- Neutral：`bg-white border-border text-foreground/80 hover:bg-muted`

### 4.4 GO 主按钮（仅用于开始）

```html
<button
  class="h-12 px-7 py-3.5 rounded-full text-base font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-br from-primary to-indigo-700 shadow-[0_16px_36px_rgba(99,102,241,0.32)] hover:shadow-[0_24px_52px_rgba(99,102,241,0.38)] focus-visible:ring-2 focus-visible:ring-ring"
>
  GO
</button>
```

### 4.5 卡片（Card）

```html
<article
  class="rounded-2xl border border-border bg-card p-5 shadow-sm"
></article>
```

### 4.6 标签（Tag/Chip，如博客标签）

```html
<a
  class="rounded-full border border-border bg-white px-3 py-1 text-xs text-foreground"
  >rehab</a
>
```

### 4.7 Interval 名称输入（“Set 1 / Set 2”）

- 视觉风格：
  - 使用与其他表单一致的圆角胶囊输入，但略微紧凑：`field-input field-input--dense`。
  - 默认有轻边框和浅背景，看起来是「可编辑的字段」，与时间和 Reps 芯片保持同一家族风格。
- 推荐类组合（已在 IntervalListEditor 内部封装）：
  ```html
  <input class="field-input field-input--dense w-full" value="Set 1" />
  ```
- 交互：
  - 点击即聚焦并选中全部文本，方便一键覆盖默认文案；
  - 默认自动命名为 `Set 1` / `Set 2` 等时，拖动排序或复制后会自动重新编号；
  - 一旦用户输入自定义标题（不再是单纯的 `Set N`），系统不再自动重命名，仅保留自动全选行为。

## 5. 页面模式与容器

- 列表/文章页容器：`<section class="mx-auto max-w-5xl px-4 py-8">...</section>`
- 文章正文样式容器：`.blog-content`（已在 globals.css 中提供：标题/段落/列表/链接/分隔线）

## 6. 交互动效（统一）

- Hover：轻微上浮 `hover:-translate-y-px`，不强化阴影（除主按钮）。
- Focus：`focus-visible:ring-2 focus-visible:ring-ring`，避免 ring-offset 在移动端闪烁。
- Disabled：`opacity-50 pointer-events-none`。
- 拖动（Interval 卡片）：当前被拖动的 Interval 卡片整体略缩小并「抬起」（`scale-[0.97] -translate-y-1`），边框与背景更明显地带上 Primary 高亮（`border-primary bg-primary/10`），并叠加强阴影（如 `shadow-[0_18px_40px_rgba(99,102,241,0.45)]`）；目标插入位置在卡片上下缘绘制一条清晰的紫色横线（`ring-primary/50`），同时在目标位置插入一块与卡片同高的虚线占位卡片（`border-dashed bg-primary/5`），让被挤开的空位一目了然。

## 7. 响应式与栅格

- 桌面优先，移动适配：
  - 容器仍用 `max-w-5xl`，手机端主要靠 `px-4` 与元素栈叠。
  - 数值芯片在 `<768px` 下使用 clamp() 收紧宽度；在 `<460px` 时，分钟/秒与 Reps 分两列网格；`<414px` 再降为单列。
- Interval 编辑器（移动端）专用栅格：
  - 使用 `grid grid-cols-[auto,minmax(0,1fr)]`，左列为拖拽手柄 + 颜色点，右列为名称行 + 时间+Reps 行。
  - 左右列间距 `gap-x-2`，上下间距 `gap-y-1.5~2`（`mobileGridGapClass`），避免顶部一行和底部一行之间留出过多空白。
  - 名称行与右侧操作按钮行的水平间距略收紧（`gap-1.5~2`），使拖拽手柄、名称、复制/删除按钮在视觉上更聚合，而不显得松散。

## 8. 无障碍与可访问性

- 所有交互元素需可聚焦，提供键盘访问（label/aria-label）。
- 表单：label 关联控件；错误/提醒信息使用 `text-amber-600`/`text-red-600`。

## 9. 代码片段清单（常用组合）

- 页面标题与说明：

```html
<header class="mb-4">
  <h1 class="text-2xl font-semibold">Page Title</h1>
  <p class="text-sm text-muted-foreground">Optional subtitle</p>
</header>
```

- 表单一行（Label + 输入 + 单位）：

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

- 列表卡片：

```html
<article class="rounded-2xl border border-border bg-card p-5 shadow-sm">
  <h3 class="text-lg font-semibold">Title</h3>
  <p class="mt-2 text-sm text-foreground/90">Description text</p>
</article>
```

---

说明：

- 颜色/字体令牌来源于 tailwind.config.ts；若在新项目使用，请复制该配置与 app/globals.css 的组件层定义。
- 以上类名/片段已在现站点大量使用，保持一致可避免样式回归与二次设计成本。
