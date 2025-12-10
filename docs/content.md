# FocusSearch Website Content Architecture (content.md)

文档角色说明：本文件定义 FocusSearch 对外网站的页面结构、内容蓝图与 SEO 策略，是「写什么内容、放在哪一页、如何串起来」的单一来源。它不描述功能实现细节或视觉样式；功能逻辑以 `docs/spec.md` 为准，视觉与组件样式以 `docs/style.md` 为准。

当前阶段说明：首发版本不会单独搭建独立网站，主要对外说明载体是 Chrome Web Store 扩展详情页（名称、短描述、长描述、功能要点、截图等）。本 `content.md` 描述的是「理想状态下的完整站点/文档结构」与信息架构，用于未来需要官网或在线帮助页面时直接复用；在实际功能落地并验证之后，可以根据最终功能集对本文件进行增删和调整。

语言使用规范：所有对外页面（网站、Chrome Web Store 描述、对用户可见的文案）统一使用英文；本文件中的中文仅用于团队内部说明。更详细的语言范围说明见 `docs/rules.md` 的「语言使用规范」。

---

## 1. Site Overview（网站概览）

- **Product & Site Type**
  - FocusSearch 是一款 Chrome / Chromium 浏览器扩展，用于减少误点链接、加速「选中即搜」的研究流程。
  - 官网定位为标准产品站（Homepage + Help/Docs/FAQ），以产品说明和使用指南为主，而不是内容型博客。
- **Target Users**
  - 高频阅读和深度研究用户：开发者、知识工作者、学生、需要大量查阅英文资料的人。
  - 使用场景：阅读长文档/博客、做学习笔记、查阅技术文档或论文时，希望减少误点跳转，同时快速查背景知识。
- **Core Capabilities（简要概览）**
  - Link Guard：在指定站点上临时禁用链接点击，减少误点跳转。
  - Bubble Search（Normal Mode）：选中文本后弹出可配置的搜索气泡菜单。
  - Search Mode：在专注搜索模式下，选中文本即自动用默认搜索引擎在后台搜索。
  - Search Engines & Whitelist：自定义搜索引擎列表及站点白名单。
  - Keyboard Shortcuts：通过快捷键快速切换 Search Mode 等。
- **Business Model**
  - 当前版本：免费 Chrome 扩展，无登录账号体系、无付费墙。
  - 收费模式：尚未规划付费 / Pro 版本；如未来引入订阅或一次性付费，需在本文件中补充 Pricing 与相关页面结构。（TODO）
- **One-line Value Proposition（草案，可迭代）**
  - “Keep your reading flow while searching in one click.”
  - 未来最终文案由市场/产品确认，本行仅为方向性建议，可在 Homepage 文案阶段微调。

---

## 2. Global Information Architecture（全站信息架构）

### 2.1 Main Navigation（主导航）

当前站点仅包含少量关键页面，导航应简洁、任务导向：

- **Primary nav (desktop header)**
  - `Home` → `/`
  - `Help` → `/help/`
  - 可选右侧 CTA 按钮：`Install on Chrome`（链接到 Chrome Web Store 扩展详情页，具体 URL 部署时确定）
- **Mobile nav**
  - 使用汉堡菜单折叠 `Home` 与 `Help`。
  - 安装 CTA 在移动端可保留为导航中的显著按钮或首屏 Hero 区按钮。

> 说明：暂不在主导航中加入 Blog / Pricing / Changelog / About 等入口，避免空页面；如未来启用，应在本节补充结构。

### 2.2 Header / Footer 规则

- **Header**
  - 统一包含：Logo（FocusSearch 标识）、主导航（Home / Help）、安装 CTA。
  - 所有公开页面（`/`, `/help/…`）默认复用同一 Header。
- **Footer**
  - 基本链接：
    - `Home` → `/`
    - `Help` → `/help/`
  - 预留但暂不实现的链接（仅在代码实现和内容准备就绪后启用）：
    - `Privacy` → `/privacy/`（TODO：确认是否需要独立隐私政策页）
    - `Terms` → `/terms/`（TODO：确认是否需要独立服务条款页）
  - Footer 内不放学习型内容或营销模块，仅承担导航与版权信息。

### 2.3 Fixed Pages List（固定页面清单）

根据当前阶段的站点范围，计划页面如下：

- `Home` → `/`
- `Help`（帮助文档与 FAQ 聚合入口）→ `/help/`
  - Quick Start / Getting Started
  - Feature Guides（Link Guard / Bubble Search / Search Mode / Search Engines & Whitelist / Shortcuts）
  - Troubleshooting
  - FAQ
- `Privacy` → `/privacy/`（TODO：待确认是否需要；内容可沿用模板中的基本结构）
- `Terms` → `/terms/`（TODO：待确认是否需要；内容可沿用模板中的基本结构）

> 登录后产品页面：FocusSearch 无独立 Web 应用或账户体系，只有浏览器扩展的 Popup 与 Options 页面，这些界面内容与交互文案在 `docs/spec.md` 中定义，本文件不单独作为其蓝图来源。

---

## 3. Page Blueprints（页面蓝图）

本节仅描述各页面的内容模块与信息层级，不写具体营销文案。所有标题/文案示例仅为结构说明，可在实际写作时替换为最终 copy。

### 3.1 Homepage（/）

**页面目标**

- 用一屏+少量模块让访客快速理解：
  - FocusSearch 是什么类型的工具（Chrome 扩展）；
  - 解决的核心问题：减少误点、保持阅读专注，同时加速选中搜索；
  - 适合谁：重度阅读/研究用户；
  - 下一步怎样做：去 Chrome Web Store 安装，或先快速了解用法。

**推荐模块结构（结合 `docs/homepage-template.tsx`）**

1. **Hero 区（首屏）**
   - H1：一句话核心价值主张，包含「keep focus / stay in flow」+ 「Chrome extension」+ 「search quickly」等关键词。
   - 副标题：补充说明典型场景（例如阅读长文档、查资料）和主要收益（更少误点、更快搜索）。
   - 主 CTA 按钮：
     - 文案：`Install on Chrome` 或 `Add to Chrome`；
     - 行为：跳转至 Chrome Web Store 扩展详情页。
   - 次 CTA（可选）：
     - 文案：`See how it works`；
     - 行为：滚动到页面内的「How it works」/ Steps 区域或跳转 `/help/`.

2. **Why / Problem Section（为什么需要 FocusSearch）**
   - 标题示例：`Why reading and searching often collide`
   - 列出 2–3 个常见痛点：
     - 误点链接打断阅读；
     - 复制 → 切 tab → 粘贴 → 搜索的步骤过长；
     - 搜索新结果标签占满浏览器，难以回到原文。
   - 每个痛点用一行标题 + 一段简短解释。

3. **Core Features Section（核心功能模块）**
   - 标题示例：`What FocusSearch adds to your browser`
   - 推荐 3–4 个 Feature 卡片，对应 `docs/spec.md` 中的关键功能：
     - `Link Guard`：禁用当前站点链接、保持阅读不被误点打断；
     - `Bubble Search`：在普通模式下选中文本出现搜索气泡菜单；
     - `Search Mode`：选中即搜、自动用默认引擎后台搜索；
     - `Custom engines & whitelist`：管理搜索引擎与白名单域名。
   - 每个卡片包含：
     - Feature 名称（与扩展 UI 中英文案保持一致）；
     - 1–2 句描述，强调对用户的直接好处，而非技术实现。

4. **How it Works / Steps Section（使用步骤）**
   - 标题示例：`How to get started`
   - 3 步 Timeline，结构与 `HomepageTemplate` 的 steps 区对应：
     1. `Install the extension`：从 Chrome Web Store 安装，固定在工具栏。
     2. `Set up your defaults`：配置默认搜索引擎、白名单、是否启用快捷键等。
     3. `Read, select, search`：在真实阅读场景中使用 Link Guard、Bubble Search 与 Search Mode。
   - 每步 1 行标题 + 1 段简短说明，避免过多技术细节（具体操作留给 /help/）。

5. **Use Cases Section（适用场景）**

   - 标题示例：`Built for deep reading and research`
   - 简要说明：用 1–2 句话描述适用人群和使用场景。
   - 列表形式列出 4–6 个 Use Case 标签，如：
     - `Long-form articles`
     - `Technical docs & RFCs`
     - `Academic papers`
     - `Language learning`
   - 用于帮助访客在脑中快速对号入座。

6. **FAQ Preview Section（FAQ 精选）**

   - 标题示例：`Quick answers`
   - 选择 3–4 个最常见问题，从 `/help/faq/` 中抽取：
     - 是否会修改网页内容？
     - 如何启用或关闭 Link Guard？
     - 搜索结果会发送到哪里？是否会收集数据？
   - 每个问题包含简短答案，并在底部放一个链接按钮 `View all questions` → `/help/faq/`。

7. **Bottom CTA Section（底部转化区域）**

   - 标题示例：`Ready to keep your reading flow?`
   - 一句总结性价值说明；
   - 主按钮：`Install on Chrome`（同 Hero CTA），保证页面开头/结尾 CTA 一致。

> SEO 提示：Homepage 的 `<title>` 与 H1 建议包含「Chrome extension」「disable links」「highlight search」等核心短语，但避免过度堆砌。

---

### 3.2 Help / Docs / FAQ（/help/）

> 目标：作为 FocusSearch 的「对外说明书」，帮助新老用户理解各功能的行为、边界与常见问题。

站点不单独开 Blog / Changelog，Help 页需要承担较多「解释型」内容。推荐结构为一个 Help Hub（`/help/`）+ 若干子页：

#### 3.2.1 Help Home（/help/）

- **目标**
  - 汇总所有帮助资源的入口；
  - 引导新用户从 Quick Start 开始；
  - 提供搜索入口（可选，视实现而定，TODO）。
- **模块建议**
  - Page title：`FocusSearch Help`
  - Intro：1–2 句说明帮助中心能帮你解决哪些问题。
  - 主卡片区：
    - `Quick start` → `/help/quick-start/`
    - `Link Guard` → `/help/link-guard/`
    - `Search modes`（Bubble Search & Search Mode）→ `/help/search-modes/`
    - `Search engines & whitelist` → `/help/search-engines/`
    - `Shortcuts & settings` → `/help/shortcuts/`
    - `FAQ` → `/help/faq/`
  - 如未来有搜索框，可放在页面顶部或卡片区上方（TODO：是否需要站内搜索）。

#### 3.2.2 Quick Start（/help/quick-start/）

- **目标**
  - 帮助第一次安装扩展的用户在几分钟内完成基础配置，并体验到一两个核心场景。
- **内容结构**
  - H1：`Quick start`
  - 简短 Intro：解释本页将带你完成基础设置。
  - Section 1：`Install FocusSearch`
    - 步骤：打开 Chrome Web Store → 找到 FocusSearch → 点击「Add to Chrome」→ 固定到工具栏。
    - 注意事项：支持的浏览器（Chrome / 其他 Chromium）、最低版本等（如暂未确定，可标记 TODO）。
  - Section 2：`Set up your defaults`
    - 设置默认搜索引擎；
    - 配置常用搜索引擎列表；
    - 决定是否启用全局快捷键。
  - Section 3：`Try it on a real page`
    - 教用户在一个示例场景中开启 Link Guard 或 Search Mode；
    - 提醒用户如何关闭/恢复默认行为。
  - 结尾 CTA：链接到更详细的 Feature 页，如 Link Guard / Search Modes。

#### 3.2.3 Feature Guides（功能说明页）

每个功能单独一页，解释行为、边界条件与常见问题。

1. `/help/link-guard/`
   - H1：`Link Guard`
   - 内容模块：
     - What it does：解释「在当前站点禁用链接点击」的逻辑，强调不会修改页面内容，只是拦截点击。
     - When to use it：举例适合场景（长文阅读、做笔记等）。
     - How it works：
       - 如何在 Popup 中开启/关闭；
       - 站点白名单如何与 Link Guard 交互（参考 `spec.md`）。
     - Known limitations：哪些类型的伪链接可能不被覆盖、在某些站点上可能存在兼容性问题。

2. `/help/search-modes/`
   - H1：`Bubble search & Search Mode`
   - 内容模块：
     - Overview：解释普通模式（Bubble Search）与 Search Mode 的区别。
     - Bubble Search：
       - 何时显示气泡；
       - 气泡中显示哪些搜索引擎；
       - 如何点击后在后台打开搜索结果。
     - Search Mode：
       - 如何通过 Popup / 快捷键开启；
       - 选中即搜的行为（何时触发、不触发）；
       - 如何退出 Search Mode。
     - Tips：在高强度研究场景中如何组合使用两种模式。

3. `/help/search-engines/`
   - H1：`Search engines & whitelist`
   - 内容模块：
     - Managing search engines：添加/删除/排序搜索引擎，URL 模板的基本格式说明。
     - Default engine：如何设置与更改默认搜索引擎。
     - Whitelist domains：如何添加、移除白名单站点；与 Link Guard 的关系。
     - Example configurations：给出 1–2 个典型组合（如「英文资料查找」「视频搜索优先」），但不包含具体品牌推荐。

4. `/help/shortcuts/`
   - H1：`Shortcuts & settings`
   - 内容模块：
     - Default shortcuts：列出默认快捷键（如 `Alt+S`）及其作用。
     - Changing shortcuts：说明是否以及如何在浏览器扩展管理界面修改快捷键（视实现情况，如不支持，标记 TODO）。
     - Other settings：Options 页面中其他重要开关的说明（例如是否在新标签后台打开等）。

> 说明：上述路径结构为推荐方案，可在实际路由实现时调整，但应在本文件中同步更新。

#### 3.2.4 Troubleshooting（/help/troubleshooting/）

- **目标**
  - 汇总常见故障与解决方案，减轻重复支持工作。
- **内容模块**
  - H1：`Troubleshooting`
  - Sections 示例：
    - `The extension icon does not appear`
    - `Link Guard does not seem to work on a site`
    - `No search happens when I select text`
    - `Shortcuts do not respond`
  - 每个问题用简短步骤指导用户检查：
    - 检查扩展是否被禁用；
    - 检查站点是否在白名单；
    - 检查浏览器权限等。

#### 3.2.5 FAQ（/help/faq/）

- H1：`FAQ`
- 内容模块：
  - 常见问题列表：
    - 安装与兼容性；
    - 链接禁用逻辑与例外；
    - 数据隐私：是否上传选中文本或搜索词（如当前不上传，应明确写出）；
    - 性能影响：是否会显著拖慢页面；
    - 如何卸载/关闭扩展。
  - 结尾 CTA：引导用户回到 `/help/` 或通过 Chrome Web Store Feedback 通道反馈问题（视实际渠道情况，TODO）。

---

### 3.3 Other Public Pages（占位）

当前不计划上线以下页面，但为未来扩展预留位：

- **Blog / Articles**
  - 状态：暂不启用，避免出现空栏目。
  - 若未来启动 SEO 内容策略，可在此基础上新增 `/blog/` 路径与文章模板，并在本文件补充分类与 URL 规范。（TODO）
- **Pricing**
  - 状态：当前产品免费，无 Pricing 页面。
  - 如未来有 Pro 版本或订阅计划，再引入 `/pricing/` 页面，并在本节定义 Plans 结构与表格。（TODO）
- **Changelog**
  - 状态：对外不单独维护 `/changelog/` 页面，更新日志可先在 Chrome Web Store 或 dev-log 中维护；
  - 如未来需要公开 Changelog，则参考 `establish_content.md` 中的 Changelog 模板定义内容结构。（TODO）
- **Legal（Privacy / Terms）**
  - 状态：是否需要独立 Legal 页需结合发布渠道与法律要求确认；
  - 一旦决定创建，应：
    - `Privacy Policy`：说明数据收集范围（如仅使用浏览器存储、不过网等）、第三方服务、用户权利；
    - `Terms of Service`：说明使用范围、责任边界、知识产权等；
    - 默认使用英文，且在 Footer 中提供链接。

---

## 4. SEO & Information Architecture（SEO 与信息架构）

### 4.1 URL Structure（URL 结构）

- 顶级路径：
  - `/` – Homepage
  - `/help/` – Help Home
  - `/help/quick-start/`
  - `/help/link-guard/`
  - `/help/search-modes/`
  - `/help/search-engines/`
  - `/help/shortcuts/`
  - `/help/troubleshooting/`
  - `/help/faq/`
  - `/privacy/`（TODO）
  - `/terms/`（TODO）
- 规范：
  - 所有路径使用英文小写、连字符 `-` 分隔；
  - 对目录型页面（如 `/help/`）保留末尾斜杠；
  - 内部链接使用站点根路径（`/help/quick-start/`），不写完整域名。

### 4.2 Keyword Mapping（核心关键词分配）

> 目标：Homepage 聚焦「阅读专注 + 选中即搜」，Help 页聚焦品牌 + 功能说明；确保主要关键词各有明确承载页面，避免内部竞争。

- **Homepage `/`**
  - Primary keywords：
    - `Chrome extension to prevent misclicks`
    - `disable links while reading`
    - `highlight to search`
  - Secondary keywords：
    - `keep reading flow`
    - `quick research from selected text`
  - Meta description：简要说明这是一个 Chrome 扩展，帮助你在阅读时减少误点并快速搜索选中文本。（具体文案在实现阶段撰写）

- **Help Home `/help/`**
  - Primary: `FocusSearch help`, `FocusSearch documentation`
  - Secondary: `how to use FocusSearch`, `FocusSearch setup`

- **Quick Start `/help/quick-start/`**
  - Primary: `install FocusSearch extension`
  - Secondary: `set up FocusSearch`

- **Link Guard `/help/link-guard/`**
  - Primary: `disable links on this site`, `prevent accidental clicks`

- **Search Modes `/help/search-modes/`**
  - Primary: `highlight to search`, `FocusSearch search mode`

- **Search Engines `/help/search-engines/`**
  - Primary: `custom search engines extension`, `manage search engines`

- **Shortcuts `/help/shortcuts/`**
  - Primary: `FocusSearch shortcuts`, `toggle search mode shortcut`

- **Troubleshooting / FAQ**
  - Primary: `FocusSearch not working`, `FocusSearch FAQ`

> 所有页面的 `<title>` 和 H1 应与 Primary keyword 同向，而不是机械地逐字重复；若未来英文品牌定位有调整，本映射需同步更新。

### 4.3 Headings & Content Structure（标题与层级）

- 每个页面仅一个 H1，对应页面主标题，与 Primary keyword 对齐；
- H2 用于主要区块（如 Features, How it works, FAQ sections），H3 用于子点；
- 避免出现长篇无标题段落——最长不超过 3–4 段连续正文，中间应有小标题分隔；
- 所有标题保持实事求是，不使用「ultimate」「perfect」「best ever」等过度营销用语。

### 4.4 Internal Linking（内链策略）

- Homepage：
  - Hero 或 Steps 区提供 `See how it works` → `/help/quick-start/`；
  - FAQ preview 区链接 `View all questions` → `/help/faq/`。
- Help Home：
  - 卡片链接到各 Feature 页（link-guard / search-modes / search-engines / shortcuts / troubleshooting / faq）；
  - 页底增加返回首页的简短 CTA（如 `Back to homepage`）。
- Feature Guides：
  - 在适当位置链接到 `/help/quick-start/`（「如果你还没安装，可以先从 Quick start 开始」）；
  - 相互交叉引用：例如在 Link Guard 页中提到 Search Mode 的差异时，链接 `/help/search-modes/`。
- Troubleshooting / FAQ：
  - 相关问题处链接到对应 Feature 页；
  - FAQ 结尾可链接回 `/help/` 或 Homepage。

### 4.5 Robots & Sitemaps

- 规划：
  - `robots.txt`：允许抓取 `/` 与 `/help/…`，如未来启用 `/privacy/` `/terms/`，默认允许抓取但可按需要设置 `noindex`；
  - `sitemap.xml`：至少包含当前公开页面（`/` 与所有 `/help/…` 路径）。
- 实现状态：
  - TODO：在实际部署时生成或手写 `robots.txt` 与 `sitemap.xml`，并将最终 URL 列表与策略同步回本节。

---

## 5. Content Rules（内容规范）

本节规定「写什么样的内容」——即站点文案在信息密度、结构与承诺尺度上的约束。

- **语言与读者**
  - 所有对外内容使用英文；站点面向国际用户，不假定用户懂中文。
  - 面向有一定自驱力的知识工作者与学生，默认具备基础浏览器与扩展使用经验。
- **信息优先级**
  - 优先回答用户的实际问题：「这是什么？解决什么痛？怎么用？有什么风险或限制？」；
  - 避免长篇品牌故事或抽象愿景；所有段落都要指向具体的使用场景或收益。
- **真实性与边界**
  - 不承诺尚未实现的功能（如云同步、多端配合、AI 推荐等）；
  - 对存在边界或限制的行为要明确说明，例如：Link Guard 的适用范围、伪链接的兼容性等；
  - 如需展示未来计划（roadmap），应明确标注为「planned / not yet available」。
- **结构与可读性**
  - 默认使用短段落（1–4 行），每段表达一个重点；
  - 列表优先，少用长句堆叠多个概念；
  - 在 Help 文档中，尽量使用步骤式说明（Step 1 / 2 / 3）和任务导向的小标题。
- **CTA（Call to Action）规则**
  - 按钮文案用动作+对象（如 `Install on Chrome`, `Open Quick start`, `Read the guide`），避免模糊如 `Learn more` / `Click here`；
  - 每个页面的主要 CTA 不超过 1–2 个，避免用户不知道该点哪里。
- **SEO 相关**
  - 关键词自然出现于标题、首段与一两个小节中，不刻意重复；
  - 避免为了 SEO 强行扩字或写「空话」，优先保证对真实用户有帮助；
  - 所有 `<meta description>` 尝试在 120–160 字（英文字符）内，清楚概括页面内容。

---

## 6. Writing Style Guide（写作风格）

本节规定「用什么语气、句式和人称去写」，适用于 Homepage、Help、FAQ 以及后续新增的任何公开页面。

### 6.1 Perspective & Voice（视角与人称）

- 默认使用品牌视角的第一人称复数与第二人称：
  - `we` / `our` 指代产品团队或 FocusSearch；
  - `you` / `your` 指代用户。
- 避免使用单数第一人称 `I`，除非明确是个人笔记或作者专栏（目前不计划）。
- 语气自然、不官僚，类似在和同事解释一个工具，而不是营销文案。

### 6.2 Tone & Sentence Style（语气与句式）

- 简洁直接，优先短句，单句不宜过长；
- 使用主动语态（`We build`, `You can`）而非被动语态；
- 先结论后解释：段落第一句先说明结论或用途，然后再补充细节；
- 避免强硬的营销词（ultimate, perfect, best ever），改用具体场景或结果说明价值。

### 6.3 Responsibility & Boundaries（责任与范围）

- 对功能效果使用适度表达：
  - ✅ `We help you reduce accidental clicks while reading long pages.`
  - ❌ `We completely eliminate all misclicks on every website.`
- 对未覆盖的场景要明确说明，例如：
  - 某些复杂 Web 应用中的自定义链接可能无法完全拦截；
  - 扩展不会对搜索结果页面或第三方服务负责。

### 6.4 CTAs & Microcopy（按钮与小文案）

- 按钮文案使用动词开头，如 `Install`, `Open`, `View`, `Read`, `Try`;
- Tooltip / helper text 简短、具体，描述操作与结果，例如：
  - `Turn on Link Guard for this site`
  - `Use Search Mode to search automatically when you select text`
- 避免模糊或带情绪的语句（如 `Trust us`, `Magic`, `Supercharge your life`），改为清晰描述。

### 6.5 Links, Titles & Metadata（链接、标题与元信息）

- 链接文本应描述目标内容，例如：
  - ✅ `Read how Search Mode works`
  - ❌ `Click here`
- 页面标题（H1）与 `<title>` 接近但不必完全相同，二者都应包含主要关键词。
- 如果未来引入 Blog 或长文内容，文章开头建议包含 1–2 句 Summary 帮助用户快速判断是否适合自己。

---

## 7. AI Checklist（写作 / 生成检查清单）

在为 FocusSearch 生成或修改网站内容前后，AI 或文案应使用以下清单自检：

1. **站点结构**
   - 当前输出是否只使用了本文件中已定义的页面与路径？若新增了页面或路由，是否先在本文件中补充说明？
2. **目标与受众**
   - Homepage 是否明确说明了「这是什么」「为谁解决什么问题」？
   - Help 页面是否以任务/问题为导向，而不是堆砌功能列表？
3. **内容完整性**
   - Homepage 是否包含 Hero、痛点说明、核心功能、使用步骤、场景、FAQ 预览和清晰 CTA？
   - `/help/` 是否有清晰的入口卡片指向各子页？
   - 各 Feature 页是否明确说明行为规则与边界条件？
4. **语言与风格**
   - 所有对外内容是否为英文（本文件中的中文除外）？
   - 句子是否简洁、主动、直白？是否避免了夸张宣传？
5. **SEO 与 IA**
   - 是否遵守本文件定义的 URL 结构和 Heading 层级？
   - 每个页面是否有明确的 Primary keyword，并在标题和首段中体现？
   - 内链是否合理串联 Homepage 与 Help 子页，避免孤立页面？
6. **一致性**
   - 功能命名（Link Guard / Search Mode 等）是否与 `docs/spec.md` 和扩展 UI 中保持一致？
   - CTA 文案是否前后一致（尤其是安装与 Quick Start 相关的按钮）？
7. **TODO 标记**
   - 对于尚未确定的信息（如是否需要 Legal 页面、具体快捷键配置方式），是否使用了 `TODO` 或简短说明，而不是凭空假设？

通过以上检查后，再将内容提供给用户或写入代码，以确保网站信息架构与文案质量与本项目其他文档保持一致。***
