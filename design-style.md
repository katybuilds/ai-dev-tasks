# Rule: 生成项目级设计样式文档（style.md）

## 目标（Goal）

- 本文是一份「模板 + 规则」文档，用于指导生成任意 Web 项目的视觉样式说明文件 `style.md`。
- **Part A** 定义规则和流程，主要面向 AI 助手，说明在生成 `style.md` 之前需要询问什么、如何基于回答调整模板。
- **Part B** 提供可直接套用的通用样式模板（Design Tokens、排版体系、组件样式、交互与响应式等）。
- **Part C** 给出 2–3 个完整项目配置示例，帮助理解同一模板在不同品牌调性下的落地方式。
- 适用范围：使用 **Tailwind CSS** 的现代 Web 项目（尤其是 SaaS 产品、工具类网站、后台控制台、设置面板等），默认技术栈为 React / Next.js + Tailwind。

---

## Part A · 使用说明（给 AI 看）

### A.1 快速启动清单（问题 & 决策规则）

#### A.1.1 必问问题清单

在为一个新项目生成 `style.md` 之前，AI 必须至少向用户确认以下内容（可用选项列表提问，方便用户回答）：

1. **项目基本信息**
   - 项目类型？（如：SaaS 后台 / 工具站 / 内容博客 / 落地页 / 文档站）
   - 目标用户？（如：专业用户 / 普通大众 / 内部团队 / 开发者）
2. **品牌调性与语气**
   - 品牌关键词 3–5 个？（例如：理性、专业、稳重；或温暖、亲和、生活感；或科技感、未来感、高对比）
   - 偏向「工具型高效」还是「内容型易读」？
3. **品牌色与状态色**
   - 主品牌色（Primary）HEX？是否已有辅助色（Secondary / Accent）？
   - 是否已有成功 / 错误 / 警告色（Success / Error / Warning）？
4. **字体偏好**
   - Sans 字体偏好？（如：系统字体 / Inter / Plus Jakarta Sans 等）
   - 是否需要 Serif 字体？用于哪些场景？（如文章标题、品牌标题）
   - 是否需要 Mono 字体？用于哪些场景？（如代码、数字）
5. **品牌图形与图标**
   - 是否已有 Logo（SVG 或矢量）？是否有 favicon？
   - 是否有统一图标库偏好？（如 Material Symbols / Heroicons / Lucide）
6. **布局密度与节奏**
   - 页面整体风格更偏「紧凑高效」还是「宽松舒适」？
   - 表单、列表是希望「信息密度高」还是「大一点、易点触」？
7. **主题模式**
   - 当前版本是否需要 Dark Mode？
   - 如需要：是优先浅色、深色，还是随系统切换？

> 提示：如果用户只给出简单描述（如「偏专业、蓝色、工具站」），AI 应在必要时追问关键缺失项（如是否有 Logo / 图标库），但避免一次性问太多无关问题。

#### A.1.2 项目变量清单（需要用户提供的输入）

在生成项目级 `style.md` 时，AI 应基于上面的回答，明确并固化以下「项目变量」：

- **字体（Fonts）**
  - 品牌主 Sans 字体（含回退字体栈），作为 `font-sans`。
  - 是否配置 Serif 字体（`font-serif`），以及使用场景（如内容标题）。
  - 是否配置 Mono 字体（`font-mono`），以及使用场景（如代码、数字）。
- **颜色系统（Color System）**
  - `background` / `foreground` 基础前景与背景。
  - `primary` / `primary-foreground` 品牌主色及其前景色。
  - `secondary` / `secondary-foreground` 辅助色及其前景色。
  - `accent` / `accent-foreground` 点缀色及其前景色。
  - 灰阶 / 中性色（可通过 `foreground`、`muted`、`border` 等 token 体现）。
  - 状态色：成功 / 错误 / 警告，对应 `success` / `destructive` / `warning`（可在 Tailwind 里扩展）。
  - 是否需要针对 Dark Mode 定义额外一套 token（如 `background-dark` 等）。
  - 建议在初次配置时，在浏览器中打开 <https://tweakcn.com/editor/theme>，先从中选择一个最接近项目品牌调性的主题，然后以该主题的主色 / 灰阶 / 状态色为基础整理出项目的 Color Palette，并将最终确定的颜色值同步到 `style.md` 与 `tailwind.config.ts` 中。
- **圆角与阴影（Radius & Shadow）**
  - 约定项目统一使用的圆角半径（小 / 中 / 大 / full）对应 Token。
  - 2–3 个语义化阴影层级（如：`card` / `elevated` / `primary-cta`）。
- **品牌图形与图标（Branding & Icons）**
  - Logo（SVG）与 favicon 的来源路径和尺寸建议。
  - 统一图标库选择及使用方式（如 icon 组件 / 字体图标）。
- **布局与密度（Layout & Density）**
  - 页面最大宽度（如 `max-w-5xl` / `max-w-3xl`）。
  - 主要垂直间距（section 间距 / 组件内 `space-y` 与 `gap`）。
  - 表单 / 列表的密度（标准 / 紧凑 / 宽松）。

这些项目变量应在生成 `style.md` 时写入「Design Tokens」与相关说明中，避免散落在文档其他位置零碎出现。

#### A.1.3 决策规则示例（如何根据回答调整模板）

下面是 AI 在使用本模板时可以遵循的一些决策规则，用于将用户回答映射到具体样式选择：

- **按项目类型：**

  - 如果项目类型为「SaaS 后台 / 专业工具站」：
    - 使用较为紧凑的垂直间距（如 section `py-8`，组件内 `space-y-3`）。
    - 列表与表单 `gap` 偏小（`gap-2~3`），信息密度略高。
    - 配色偏中性、冷色系（蓝 / 灰）为主，强调对比与可读性。
  - 如果项目类型为「内容站 / 博客 / 知识库」：
    - 使用更宽松的段落间距（`space-y-4~6`），正文 `leading-7` 或更大。
    - 文章容器收窄（如 `max-w-3xl`），侧重阅读体验。
    - 可以使用略暖的 accent 色（如橙 / 暖紫）突出标签与链接。

- **按品牌调性：**

  - 如果品牌关键词包含「理性 / 专业 / 科技感」：
    - 首选冷色系 primary（如蓝 / 靛青），搭配高对比中性灰。
    - 字体选择较现代、几何感强的 Sans（如 Inter / Plus Jakarta Sans）。
    - 阴影使用少量、克制的层级，避免夸张发光效果。
  - 如果品牌关键词包含「温暖 / 亲和 / 生活感」：
    - primary 选择偏暖（如暖橙、珊瑚红、暖紫），accent 与背景色整体偏柔和。
    - 行高稍大、段落间距略宽，标签 / 按钮边角可以更圆润。
    - 使用更多浅色卡片 / muted 背景营造轻松氛围。

- **按布局密度偏好：**
  - 如果用户强调「高效操作」：
    - 表单组件使用紧凑版样式（如 `.field-input--dense`），按钮高度略低（h-10 左右）。
    - 列表项高度控制在 56px 以内，减少多余留白。
  - 如果用户强调「轻松浏览」：
    - 使用更大的按钮（如主行动按钮 `h-12`），列表与卡片内部 `space-y-3~4`。

AI 在生成 `style.md` 时，应在文档开头简要说明决策结果，例如：

> 本项目类型：B2B SaaS 后台；品牌调性：理性 / 专业 / 科技感；布局密度：中等偏紧凑；主色：#6366f1。

这样方便后续开发者快速获取整体设计方向。

---

### A.2 适用项目范围

- 优先适配以下场景：
  - 使用 Tailwind CSS 的 React / Next.js Web 项目；
  - SaaS 后台、数据工具、配置面板、仪表盘等以操作和信息展示为主的站点；
  - 需要较稳定、克制、可长期维护的 UI 体系。
- 也可用于：
  - 内容型站点（博客、知识库、Docs），通过调整 Typography 与间距即可；
  - 单页应用 / Landing Page，在 Card / Button / Tag 等基础组件上扩展视觉表现。

---

### A.3 AI 使用步骤（生成 style.md 的流程）

1. **收集关键信息：**
   - 按 A.1.1 的问题清单向用户提问；
   - 整理出项目变量列表（A.1.2）。
2. **确认 Design Tokens：**
   - 根据用户回答，确定字体、颜色、圆角、阴影等 Design Tokens；
   - 如用户未指定，可使用本文件 Part B 中的示例值，并在文档中标记为「可按品牌后续微调」。
3. **生成项目级 `style.md`：**
   - 使用 Part B 的章节结构（1–8）作为骨架；
   - 在每一节中用项目特定数据替换示例文本（例如具体颜色、字体名称），保留组件类名和代码片段结构；
   - 在文档顶部加入「文档角色说明」以及简短的项目摘要（项目类型 / 品牌调性 / 主色等）。
4. **与用户确认并迭代：**
   - 生成初稿后，向用户展示关键 Design Tokens 与组件示例；
   - 根据反馈对颜色、间距、排版做有限次迭代；
   - 最终版本应作为设计与前端实现的单一可信来源。

**强制规则：**

- 在生成最终的项目级 `style.md` 时，Part B 中所有与「项目变量」对应的示例值（例如字体名称、颜色值、圆角/阴影大小等），**必须优先被项目实际值覆盖**；
- 仅在用户没有提供对应信息、且继续追问会明显打断流程的前提下，才保留 Part B 中的默认示例值，并在文档中注明「当前使用默认示例，可在后续按品牌调整」。

---

### A.4 输出要求（Output）

生成的项目样式文档应满足：

- **文件格式：** Markdown (`.md`)
- **建议位置：** `/docs/style.md`
- **文件名：** 默认使用 `style.md`，如项目内有多主题，可加前缀（如 `style-admin.md`）
- **文档角色说明：** 在 `style.md` 顶部主标题之后，必须加入以下说明（可直接复制）：

  文档角色说明：本文件定义产品在 Web 端的视觉系统，回答「长什么样」「如何保持视觉一致」。它是前端样式实现手册，不涉及功能逻辑或业务规则。行为与交互详见产品规格文档（如 `spec.md` / `docs/spec.md`）。若有冲突：**交互行为以规格文档为准，视觉细节以本文件为准**。

---

### A.5 读者对象（Target Audience）

- 前端开发者（含初级开发）：作为实现和复用 UI 的参考规范。
- 设计师：作为视觉系统和组件库的约束与扩展依据。
- AI 助手：作为生成组件代码、页面布局时的样式规则来源。

---

## Part B · 核心模板（通用部分）

> 本部分是可直接套用的样式模板。为新项目生成 `style.md` 时，可沿用以下章节结构与类名，将其中的示例 Design Tokens 替换为项目实际值。

### 1. 基础 Design Tokens（Design Tokens）

Design Tokens 用于在设计与代码间建立统一语言，主要包含字体、颜色、圆角、阴影等，并与 Tailwind 配置对应。

#### 1.1 字体（Typography Fonts）

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

#### 1.2 颜色系统（Color System）

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

#### 1.3 圆角（Border Radius）

- 建议统一使用一小撮固定半径，在 Tailwind 中扩展：
  - `radius.sm`: 4px（如 `rounded` / `rounded-md`）
  - `radius.lg`: 8px（较常用）
  - `radius.xl`: 12px（卡片 / 弹窗）
  - `radius.full`: `9999px`（Tag、胶囊按钮、图标圆钮）
- 经验规则：
  - 表单输入、卡片：`8px–12px`；
  - Button / Tag：通常 `full`；
  - 保持同一页面内圆角种类不超过 3 种。

#### 1.4 阴影（Shadow）

- 推荐使用少量可复用的阴影层级：
  - **基础卡片**：`shadow-sm` 或 `0 6px 16px rgba(15,23,42,0.12)`；
  - **轻量按钮**：`0 10px 22px rgba(15,23,42,0.08)`；
  - **主按钮 Hover**：`0 16–36px rgba(99,102,241,0.32~0.38)`；
- 建议在 Tailwind 的 `boxShadow` 中以语义命名（如 `card`, `elevated`, `primary-cta`）。

#### 1.5 品牌元素与图标（Branding & Iconography）

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

---

### 2. Layout 与间距（Layout & Spacing）

#### 2.1 页面容器（Page Shell）

- 通用页面容器推荐：
  - 主内容：`mx-auto max-w-5xl px-4`；
  - 文章 / 文档类页面可收窄为：`max-w-3xl`。
- 若有固定导航栏，建议保证容器左右与导航中的 Logo 对齐。

#### 2.2 垂直节奏（Vertical Rhythm）

- 页面一级区块（section）：`py-8`（移动端可视情况减小到 `py-6`）。
- 区块内元素间距：`space-y-3~5`；
- 列表项间距：`gap-3~4`，Mobile 可收紧为 `gap-2`。
- 保持「标题 / 文本 / 操作区」之间明确层级，可以使用：
  - 标题上方小距离，下方较大距离（例如：标题下 `mt-2~3`）。

#### 2.3 专用模板示例：法律页面（Privacy / Terms）

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

### 3. Typography 体系

#### 3.1 标题层级（Headings）

- H1：`text-2xl font-semibold`（页面标题 / 区块大标题）
- H2：`text-xl font-semibold mt-6 mb-2`
- H3：`text-lg font-semibold mt-5 mb-2`
- 对应 HTML 语义标签 `<h1>~<h3>`，在内容页中保持层级连续，不跳级。

#### 3.2 正文与辅助文本

- 正文（Body）：
  - 类名：`leading-7 my-3 text-foreground`；
  - 每段控制在 3–5 行以内，便于阅读。
- 次要文本（Secondary Text）：
  - 类名：`text-sm text-muted-foreground`；
  - 用于说明、帮助文本等。
- 辅助标签 / 小说明：
  - 类名：`text-xs text-slate-600` 或项目内对应的灰阶 text。

#### 3.3 Typography 使用原则

- 保持页面中最多 2–3 个字号层级；
- 同级标题样式必须一致（不要在相邻模块中混用不同粗细或大小）；
- 按语义选标签（例如按钮文案用 `<button>`，非视觉目的不要强行用 `<hX>`）。

---

### 4. 通用组件样式

以下为推荐的基础组件外观与类名，建议在全局 CSS 的 `@layer components` 中定义。

#### 4.1 表单输入（Form Fields）

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

#### 4.2 按钮（Buttons）

##### 4.2.1 图标圆钮（Icon Button）

```html
<button
  class="h-11 w-11 rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
  <span class="material-symbols-outlined text-xl">delete</span>
</button>
```

用于单一图标操作（删除、关闭、更多等），保持紧凑、圆形。

##### 4.2.2 轻量胶囊按钮（Secondary / Ghost）

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

##### 4.2.3 主行动按钮（Primary Call-to-Action）

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

#### 4.3 卡片（Card）

```html
<article
  class="rounded-2xl border border-border bg-card p-5 shadow-sm"
></article>
```

- 用于承载一块独立信息（列表项、设置卡片等）；
- 内部标题和正文遵守 Typography 体系。

#### 4.4 标签 / Chip（Tag / Chip）

```html
<a
  class="rounded-full border border-border bg-white px-3 py-1 text-xs text-foreground"
>
  tag
</a>
```

- 用于展示标签、过滤项、状态等；
- 若可点击，建议在 hover 时加轻微背景增强（如 `hover:bg-muted`）。

#### 4.5 复杂业务组件模式：可排序列表编辑器（示例）

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

### 5. 交互动效与状态（Interactions & States）

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

### 6. 响应式与栅格（Responsive & Grid）

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

- **移动端 UI 原则：**
  - 采用移动优先（mobile-first）思路：基础样式适配窄屏，再使用 `md:` / `lg:` 等前缀增强桌面体验。
  - 交互控件（按钮、图标圆钮、芯片）的可点击区域不小于约 `40x40px`，避免过小导致误触或难以点击。
  - 表单在窄屏下尽量一列排布，避免横向滚动；必要的两列布局需保证每列控件宽度足够输入。
  - 顶部导航在移动端应尽量简化（如使用菜单按钮 / 抽屉），避免放置过多一级入口导致拥挤。
  - 在移动端减少非必要装饰性阴影和渐变，优先保证内容可读性和滚动性能。
  - 避免依赖 hover-only 的反馈方式，在移动端通过 active、focus、明显的状态变化传达交互。

---

### 7. 无障碍与可访问性（A11y）

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

### 8. 常用代码片段示例（Snippets）

> 本节中的代码片段应保持「抽象示例」的角色：保留结构、关键类名和典型布局关系，使用占位文案（如 `Page Title` / `Optional subtitle` / `Label` / `Description text`），而不要写入具体产品/页面名称或业务文案（例如某个项目里的 “SmartSelect Settings” 等）。这样可以在不重复具体实现的前提下，清楚表达布局和样式意图，便于在不同项目中复用结构和类名模式。

#### 8.1 页面标题与说明

```html
<header class="mb-4">
  <h1 class="text-2xl font-semibold">Page Title</h1>
  <p class="text-sm text-muted-foreground">Optional subtitle</p>
</header>
```

#### 8.2 表单一行（Label + 输入 + 单位）

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

#### 8.3 列表卡片

```html
<article class="rounded-2xl border border-border bg-card p-5 shadow-sm">
  <h3 class="text-lg font-semibold">Title</h3>
  <p class="mt-2 text-sm text-foreground/90">Description text</p>
</article>
```

---

## Part C · 项目示例（可选）

> 本部分为示例，不是强制配置。它展示了如何基于 Part B 的模板，为不同类型的项目填充具体 Design Tokens 和组件样式。
>
> **重要限制：** Part C 仅作为「参考示例」，在为真实项目生成 `style.md` 时，AI 不允许直接复制本部分内容作为输出样式；必须基于用户输入和项目变量重新决策与生成，必要时可引用示例中的「结构和思路」，但不可原样照搬颜色、字体等具体值。

### 示例 1：专业型工具站（B2B SaaS Dashboard）

**定位与调性：**

- 项目类型：B2B SaaS 后台 / 数据工具。
- 品牌调性：理性、专业、科技感。
- 目标：高信息密度、操作高效、视觉克制。

**示例 Design Tokens（可按品牌实际值替换）：**

- 字体：
  - Sans：`Plus Jakarta Sans`, system-ui, -apple-system, BlinkMacSystemFont, sans-serif
  - Serif：不常用，仅在部分营销页使用（如 `Lora`）。
  - Mono：`Roboto Mono`, ui-monospace, SFMono-Regular, monospace。
- 颜色（沿用 Part B 默认示例）：
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
- 圆角与阴影：
  - 圆角：输入 / 卡片使用 `rounded-xl`（12px），按钮与 Tag 使用 `rounded-full`。
  - 阴影：
    - 卡片：`shadow-sm`
    - 悬浮卡片 / 弹层：`0 6px 16px rgba(15,23,42,0.12)`
    - 主按钮 Hover：`0 16–36px rgba(99,102,241,0.32~0.38)`

**关键组件示例：**

- 主行动按钮：

```html
<button
  class="h-12 px-7 py-3.5 rounded-full text-base font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-br from-primary to-indigo-700 shadow-[0_16px_36px_rgba(99,102,241,0.32)] hover:shadow-[0_24px_52px_rgba(99,102,241,0.38)] focus-visible:ring-2 focus-visible:ring-ring"
>
  GO
</button>
```

- 图标圆钮：

```html
<button
  class="h-11 w-11 rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
  <span class="material-symbols-outlined text-xl">delete</span>
</button>
```

- 列表卡片：

```html
<article class="rounded-2xl border border-border bg-card p-5 shadow-sm">
  <h3 class="text-lg font-semibold">Project Name</h3>
  <p class="mt-2 text-sm text-foreground/90">
    Short description about this project.
  </p>
</article>
```

布局上可采用：

- 页面容器：`<section class="mx-auto max-w-5xl px-4 py-8">...</section>`
- 列表区域：`grid grid-cols-1 md:grid-cols-2 gap-4`

整体感觉是紧凑、高效、信息密度较高。

---

### 示例 2：温暖型内容站（Blog / 知识库）

**定位与调性：**

- 项目类型：内容型网站（博客、知识库、课程介绍等）。
- 品牌调性：温暖、亲和、重视阅读体验。
- 目标：可长时间阅读、不疲劳，对内容友好。

**示例 Design Tokens：**

- 字体：
  - Sans：`Plus Jakarta Sans` 作为基础界面字体；
  - Serif：`Lora` 作为文章标题和长文正文字体；
  - Mono：`Roboto Mono` 用于代码片段。
- 颜色（示例暖色系，可按品牌调整）：
  - `background`: `#fdf8f4`
  - `foreground`: `#1f2933`
  - `primary` / `primary-foreground`: `#f97316` / `#ffffff` （暖橙）
  - `secondary` / `secondary-foreground`: `#fde6d5` / `#4b5563`
  - `accent` / `accent-foreground`: `#fcd34d` / `#374151` （柔和黄色）
  - `card` / `card-foreground`: `#ffffff` / `#1f2933`
  - `popover` / `popover-foreground`: `#ffffff` / `#1f2933`
  - `muted` / `muted-foreground`: `#f3e8ff` / `#6b7280`
  - `border` / `input` / `ring`: `#f3e2d2` / `#f3e2d2` / `#f97316`
  - `destructive` / `destructive-foreground`: `#ef4444` / `#ffffff`
- 圆角与阴影：
  - 圆角：整体更圆润，卡片 `rounded-2xl`，按钮与 Tag 采用 `rounded-full`。
  - 阴影：多用柔和阴影，如 `shadow-sm` 或稍弱的自定义阴影。

**关键组件示例：**

- 文章标题区：

```html
<header class="mb-6">
  <h1 class="text-2xl font-semibold">文章标题</h1>
  <p class="text-sm text-muted-foreground">
    副标题或文章简要说明，帮助读者快速判断内容是否相关。
  </p>
</header>
```

- Tag / Chip：

```html
<a
  class="rounded-full border border-border bg-white px-3 py-1 text-xs text-foreground"
>
  design
</a>
```

- 文章卡片：

```html
<article class="rounded-2xl border border-border bg-card p-5 shadow-sm">
  <h3 class="text-lg font-semibold">如何设计一个高可读性的设置页面</h3>
  <p class="mt-2 text-sm text-foreground/90">
    从信息层级、行距、对比度三个方面拆解高可读性的界面设计方法。
  </p>
</article>
```

布局上可采用：

- 文章页容器：`<section class="mx-auto max-w-3xl px-4 py-10">...</section>`
- 正文段落：`prose` 或自定义 `.blog-content`，配合 `leading-relaxed` 与适当的 `space-y`。

整体感觉是宽松、温暖、适合长时间阅读。

---

**结束语**

- Part A 提供了 AI 如何收集信息与决策的规则；
- Part B 给出了可直接复用的样式模板与代码片段；
- Part C 展示了在不同项目类型与品牌调性下，如何基于同一套模板配置出风格一致的 UI。

在实际项目中，建议始终以一个明确的 `style.md` 作为视觉单一来源，并在发生需求变更或品牌升级时同步更新该文档。这样可以让后续所有 AI 工具与开发者都站在同一视觉基线之上工作。
