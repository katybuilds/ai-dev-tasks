# FocusSearch Style Guide

文档角色说明：本文件定义本项目在 Web 端（扩展 Popup 与 Options 设置页）的视觉系统，回答「长什么样」「如何保持视觉一致」。它是前端样式实现手册，不涉及功能逻辑，行为与交互细节请以 `docs/spec.md` 为准；当两者冲突时，以 `spec.md` 为裁决源。

---

## 1. Design Tokens

本节定义与 Tailwind 配置相对应的基础 Design Tokens，所有页面与组件应基于这些 token 设计和实现。

### 1.1 字体（Fonts）

- Sans（主字体，用于绝大多数 UI）  
  - `Inter`，回退：`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Serif（内容型场景可选，比如帮助文案的标题）  
  - `Source Serif 4`，回退：`Georgia, "Times New Roman", serif`
- Mono（代码片段 / 等宽数字）  
  - `JetBrains Mono`，回退：`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`

Tailwind 建议配置：

- `fontFamily.sans = ['Inter', ...fallback]`
- `fontFamily.serif = ['"Source Serif 4"', ...fallback]`
- `fontFamily.mono = ['"JetBrains Mono"', ...fallback]`

表单控件需继承全局字体：

```css
input,
select,
textarea,
button {
  font-family: inherit;
}
```

### 1.2 颜色系统（Color System）

#### 基础色与前景色

- `background`: `#ffffff`
- `foreground`: `#262626`

#### 品牌主色

- `primary`: `#f59e0b`
- `primary-foreground`: `#000000`

#### 辅助与点缀色

- `secondary`: `#f3f4f6`
- `secondary-foreground`: `#4b5563`
- `accent`: `#fffbeb`
- `accent-foreground`: `#92400e`

#### UI 容器色

- `card`: `#ffffff`
- `card-foreground`: `#262626`
- `popover`: `#ffffff`
- `popover-foreground`: `#262626`

#### 中性色与弱化文字

- `muted`: `#f9fafb`
- `muted-foreground`: `#6b7280`

#### 表单与边框

- `border`: `#e5e7eb`
- `input`: `#e5e7eb`
- `ring`: `#f59e0b`

#### 状态与反馈

- `destructive`: `#ef4444`
- `destructive-foreground`: `#ffffff`

> 当前版本仅设计浅色主题，无 Dark Mode；如未来需要深色主题，可在现有 token 之上扩展一套 `*-dark` 变体。

### 1.3 图表与可视化（Chart Colors）

用于未来可能的统计图、简易可视化：

- Chart 1: `#f59e0b`
- Chart 2: `#d97706`
- Chart 3: `#b45309`
- Chart 4: `#92400e`
- Chart 5: `#78350f`

图表中尽量保持 3–5 条数据，对比度要足够，但整体仍维持橙色系的统一感。

### 1.4 侧边栏与导航（Sidebar & Navigation）

Options 设置页如有侧边导航或分栏结构，推荐：

- `sidebar-background`: `#f9fafb`
- `sidebar-foreground`: `#262626`
- `sidebar-primary`: `#f59e0b`
- `sidebar-primary-foreground`: `#ffffff`
- `sidebar-accent`: `#fffbeb`
- `sidebar-accent-foreground`: `#92400e`
- `sidebar-border`: `#e5e7eb`
- `sidebar-ring`: `#f59e0b`

选中态导航项可以使用 `sidebar-primary` 作为背景、`sidebar-primary-foreground` 作为文字颜色。

### 1.5 圆角（Radius）

统一采用少量固定 Round 值：

- 输入与基础卡片：`rounded-xl`（约 12px）
- 小控件（Tag、Chip、Icon Button）：`rounded-full`
- 弹出层与主卡片（Popup）外框：`rounded-2xl`

同一页面内尽量不要超过 3 种不同圆角，保持整体统一。

### 1.6 阴影（Shadows）

本项目整体视觉偏「极简 / 中性」，动效与阴影应克制使用：

- 卡片 / Popup：`shadow-sm` 或 `0 6px 16px rgba(15,23,42,0.12)`
- 轻量按钮（如 Secondary）：`shadow-[0_10px_22px_rgba(15,23,42,0.08)]`
- 主按钮 Hover：`0 16–36px rgba(245,158,11,0.30~0.35)`

不要在大面积元素上叠加多个阴影层级，以免显得花哨。

---

## 2. Layout 与间距

### 2.1 Popup 布局

Popup 目标：简洁、易扫读、操作区明确。

- 宽度：约 `320–360px`，高度随内容自适应（避免过高导致超出屏幕）。
- 外容器：  
  `class="w-[340px] px-4 py-3 bg-background text-foreground"`
- 区块划分（自上而下）：
  1. 顶部栏：Logo/标题 + 简短说明（如扩展名称 + 一行描述）。
  2. 功能开关区：  
     - 「Disable links on this site」开关  
     - 「Search Mode: On/Off」开关/状态展示  
  3. 快速入口区：进入 Options 设置页的按钮/链接。

- 垂直间距建议：
  - 区块之间：`space-y-3~4`
  - 同一块内元素：`space-y-2`

Popup 不追求高信息密度，优先保证阅读轻松、点击区域充足。

### 2.2 Options 设置页布局

Options 页是主要配置界面，应接近常规 Web 设置页的布局：

- 页面容器：  
  `class="mx-auto max-w-3xl px-4 py-8 bg-background text-foreground"`
- 标题区：
  - 主标题：`text-2xl font-semibold`
  - 说明文字：`text-sm text-muted-foreground`
- 内容区：
  - 按功能分区块：搜索引擎列表、白名单域名、行为配置（气泡、反馈）、说明文档等；
  - 每个区块使用带边框的卡片容器（见 Card 样式）。
- 间距建议：
  - 区块之间：`space-y-6`
  - 区块内表单元素：`space-y-3`

整体节奏偏宽松，保证初学者也能快速理解每项设置的作用。

---

## 3. Typography 体系

### 3.1 标题层级

- H1（页面主标题）：`text-2xl font-semibold`
- H2（区块标题）：`text-xl font-semibold mt-6 mb-2`
- H3（子区块 / 小标题）：`text-lg font-semibold mt-4 mb-2`

Options 页应按语义使用 `<h1>~<h3>` 标签，并保持层级连续。

### 3.2 正文与说明

- 常规正文：`text-sm md:text-base leading-7 text-foreground`
- 次要说明：`text-sm text-muted-foreground`
- 标签/辅助文字：`text-xs text-muted-foreground`

UI 文案统一使用英文（按钮、开关标签、说明文字等），与 `spec.md` 中设计考虑保持一致。

---

## 4. 通用组件样式

### 4.1 表单输入（Form Fields）

- 标签：`.field-label`（建议定义为 `block text-sm font-medium text-foreground mb-1`）
- 基础输入（胶囊）：`.field-input`
  - Tailwind 示例：  
    `class="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0"`
- 紧凑输入：`.field-input--dense`  
  - 比普通输入略窄的垂直内边距，适用于列表行内编辑。

数字 / 时间类输入建议移除原生上下微调按钮，通过步进按钮或键盘输入控制。

### 4.2 按钮（Buttons）

#### 4.2.1 主行动按钮（Primary CTA）

用于最重要操作（如「Save changes」）：

```html
<button
  class="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_16px_36px_rgba(245,158,11,0.32)] hover:shadow-[0_24px_52px_rgba(245,158,11,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
  Save changes
</button>
```

- 文案短、动词开头，如 `Save`, `Apply`, `Update`.
- 一次视图内不超过一个主行动按钮。

#### 4.2.2 次级按钮（Secondary / Ghost）

```html
<button
  class="inline-flex items-center justify-center rounded-full border border-border bg-white px-5 py-2 text-sm font-medium text-foreground shadow-[0_10px_22px_rgba(15,23,42,0.08)] hover:-translate-y-px hover:bg-muted transition"
>
  Cancel
</button>
```

用于次要操作、重置、跳转等。

#### 4.2.3 图标圆钮（Icon Button）

```html
<button
  class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
  <!-- 推荐使用线性图标，例如 Heroicons / Lucide -->
  <span class="lucide lucide-trash text-[18px]"></span>
</button>
```

用于删除、编辑、更多等操作。  
在 Options 页的列表行尾可使用一到两个图标按钮，保持紧凑。

### 4.3 卡片（Card）

```html
<section
  class="rounded-2xl border border-border bg-card p-5 shadow-sm"
>
  <h2 class="text-lg font-semibold">Section title</h2>
  <p class="mt-1 text-sm text-muted-foreground">
    Short description of this configuration group.
  </p>
</section>
```

用于 Options 页的配置区块、说明模块等。  
不同卡片之间保持统一的内边距与圆角。

### 4.4 Tag / Chip

```html
<span
  class="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs text-foreground"
>
  default
</span>
```

可用于表示默认搜索引擎、状态标签等。  
在 Options 页的搜索引擎列表中，可用 Chip 标出 `Default`。

---

## 5. 交互动效与状态

整体风格偏克制，动效仅用于增强可理解性。

- Hover：
  - 按钮轻微上浮 `hover:-translate-y-px` 或阴影略增强；
  - 背景颜色从 `bg-card` -> `bg-muted` 的轻微变化即可。
- Focus：
  - 统一使用 `focus-visible:ring-2 focus-visible:ring-ring`；
  - 避免在移动端使用复杂的 `ring-offset`，减少闪烁风险。
- Disabled：
  - 使用 `opacity-50 pointer-events-none`；
  - 不改变布局，仅降低显著度。

Popup 中的开关（如 Search Mode、Disable links on this site）需有清晰的 On/Off 视觉差异，例如文字颜色与背景色双重变化。

---

## 6. 响应式与移动端原则

虽然扩展界面主要在桌面浏览器中使用，但仍需兼顾小窗口与高缩放比例下的可用性。

- 整体策略：
  - 采用桌面优先，但在样式上确保在窄宽度下仍然不出现水平滚动；
  - 尽量使用相对单位与 `flex` / `grid` 做自适应。
- 控件大小：
  - 按钮和图标按钮的可点击区域不少于约 `40x40px`；
  - 表单控件垂直内边距保证指针易点击。
- 布局调整：
  - 在小宽度下（如 `<360px`），将横向排列的按钮改为纵向堆叠（通过 `flex-col` 或 `space-y-*`）。
  - Options 页如存在双列布局，在窄屏下降级为单列。
- 交互反馈：
  - 避免只通过 hover 提供反馈，在触摸设备上也能通过 focus/active 或明显颜色变化感知状态。

---

## 7. Snippets（常用片段）

### 7.1 Popup 结构示例

```html
<div class="w-[340px] px-4 py-3 bg-background text-foreground">
  <header class="mb-3 flex items-center justify-between">
    <div>
      <h1 class="text-sm font-semibold">FocusSearch</h1>
      <p class="text-xs text-muted-foreground">
        Control link guard & search mode
      </p>
    </div>
  </header>

  <section class="space-y-3">
    <!-- Link Guard toggle -->
    <label class="flex items-center justify-between gap-3 text-sm">
      <span class="text-foreground">Disable links on this site</span>
      <!-- Switch 组件实现可参考 UI 库或自定义 -->
      <button
        class="inline-flex h-6 w-10 items-center rounded-full bg-secondary px-1 text-xs text-secondary-foreground"
      >
        <span
          class="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
        ></span>
      </button>
    </label>

    <!-- Search Mode toggle -->
    <label class="flex items-center justify-between gap-3 text-sm">
      <span class="text-foreground">Search Mode</span>
      <span class="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
        Off
      </span>
    </label>
  </section>

  <footer class="mt-4 flex justify-end">
    <button
      class="inline-flex items-center justify-center rounded-full border border-border bg-white px-4 py-1.5 text-xs font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      Open settings
    </button>
  </footer>
</div>
```

### 7.2 Options 页标题与区块示例

```html
<main class="mx-auto max-w-3xl px-4 py-8 bg-background text-foreground">
  <header class="mb-6">
    <h1 class="text-2xl font-semibold">FocusSearch Settings</h1>
    <p class="mt-1 text-sm text-muted-foreground">
      Configure link guard behavior, search engines, and site whitelist.
    </p>
  </header>

  <section class="space-y-6">
    <!-- Search engines card -->
    <section class="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 class="text-lg font-semibold">Search engines</h2>
      <p class="mt-1 text-sm text-muted-foreground">
        Manage the engines used in the popup bubble and search mode.
      </p>
      <!-- search engine list... -->
    </section>

    <!-- Whitelist card -->
    <section class="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 class="text-lg font-semibold">Domain whitelist</h2>
      <p class="mt-1 text-sm text-muted-foreground">
        Links remain clickable on these domains even when link guard is on.
      </p>
      <!-- whitelist form... -->
    </section>
  </section>
</main>
```

---

本 `style.md` 作为 FocusSearch 项目的视觉单一来源。新增组件或页面时，应优先复用上述 tokens 与模式；如需引入新的视觉模式（例如 Dark Mode、新的组件家族），建议先在此文档中补充规范，再落地到代码实现。***
