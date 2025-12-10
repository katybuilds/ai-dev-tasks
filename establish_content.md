# Rule: Generating the Website Content Architecture & Strategy Document

## Goal

To guide an AI assistant in creating a clear, actionable **website content architecture & strategy document** (`content.md`) in Markdown format, based on an initial user prompt.  
The document should：

- 让团队一眼看清：网站包含哪些页面、各页面的内容模块与信息层级；
- 覆盖「公开网站」（Homepage / Blog / Pricing / Changelog / Terms / FAQ 等）以及「登录后产品内页面」的内容结构（如 Dashboard / Settings / Onboarding），后者在暂未定义时可以留出占位与 TODO；
- 为后续文案撰写、设计与开发提供统一 blueprint。

生成的 `content.md` 是内容与信息架构层面的 PRD，不涉及视觉样式（由 `style.md` 负责）或技术实现细节（由技术文档负责）。

---

## Process

1. **Receive Initial Prompt**：用户提供项目基本信息（产品类型、核心功能、目标用户、是否已有网站等）。
2. **Ask Clarifying Questions**：在撰写 `content.md` 之前，AI 必须先提出少量关键问题，澄清网站类型、受众、内容目标与页面范围（详见下文「Clarifying Questions」）。
   - 问题数量控制在 3–6 个，围绕信息架构与内容策略，不问与当前任务无关的技术实现。
3. **Generate Content Document**：基于用户回答，按本文件的「Content Document Structure」生成 `content.md`，包含站点结构、页面蓝图、SEO 策略与内容规范等。
4. **Save Document**：将生成的内容架构文档保存为 `/docs/content.md`。

---

## Clarifying Questions (Guidelines)

在生成 `content.md` 之前，AI 应根据初始描述补充问清以下核心信息。只问真正影响信息架构与内容范围的问题。

常见需要澄清的维度：

- **网站类型与业务模式**

  - 这是哪一类网站？（如 SaaS 工具站、内容型博客 / 知识库、营销 Landing Page、混合型）
  - 产品是 B2B / B2C / 内部工具？
  - 是否有登录后的应用（Dashboard / Settings / Onboarding 等）？
  - 收费模式：免费 / 订阅 / 一次性付费 / Freemium / 其它？

- **目标用户与场景**

  - 主要目标用户是谁？（职业 / 经验水平 / 使用场景）
  - 用户访问网站的主要目的是什么？（试用、购买、查文档、查价格、阅读教程等）

- **价值主张与差异化**

  - 产品的一句话价值主张是什么？
  - 与主要竞争对手相比，站点内容需要突出哪些差异点？（易用性 / 速度 / 价格 / 集成生态等）

- **内容模块范围**

  - 是否需要 Blog？如果需要，主要目标是 SEO / 教育 / 品牌权威？
  - 是否需要 Pricing 页面？是否有多个 plan？
  - 是否需要 Changelog？更新频率如何？
  - 哪些法律 / 信任相关页面是必须的？（Terms / Privacy / About / Contact / DPA 等）

- **写作与品牌风格**
  - 品牌语气更偏：专业理性 / 亲和温暖 / 轻松有趣 / 极简冷静 ？
  - 是否已有内部《Writing Style Guide》（如 `@writing_style`），若有应在 `content.md` 中引用而不是复制全文。

### Formatting Requirements for Questions

- **Number all questions**（1, 2, 3, …）。
- **List options as A, B, C, D…** 方便用户回答（例如：“1A, 2C, 3B”）。
- 确保问题聚焦「内容/信息架构」，避免跑题到技术实现或低价值细节。

---

## Content Document Structure（content.md 模板）

生成的 `content.md` 建议使用以下结构（可根据实际项目略微调整标题命名，但整体层级建议保留）。

### 1. Site Overview（网站概览）

简明描述网站的定位与目标：

- 网站类型（SaaS 工具站 / 内容站 / Landing Page / 混合等）；
- 目标用户画像（角色、经验层级、典型场景）；
- 核心功能与使用场景概览；
- 收费模式（免费 / 付费 / Freemium / 试用策略等）；
- 一句话核心价值主张（Value Proposition）。

### 2. Global Information Architecture（全站信息架构）

定义网站的整体页面结构与导航：

- **主导航（Main Navigation）**

  - 顶部主导航项列表（例如：Home / Features / Pricing / Blog / Docs / Changelog / Login / Sign up 等）；
  - PC 与移动端导航可能的差异（例如某些项在移动端折叠到菜单中）。

- **统一 Header / Footer 规则**

  - 默认所有公开页面（如 Home / Features / Pricing / Blog / Docs / Changelog / FAQ / Legal 等）复用同一套 Header 与 Footer 模板；
  - 若某些页面不展示标准导航或使用精简版 Header/Footer（例如某些 Landing Page 或嵌入式页面），必须在对应的页面 Blueprint 中显式标注例外情况。

- **次导航 / 底部导航（Secondary / Footer）**

  - Footer 中的常见链接：Terms, Privacy, About, Contact, FAQ, Sitemap 等；
  - 如有二级导航（例如 Docs 或设置页内的侧边栏），可在此列出其结构概览。

- **固定页面清单**
  - Home
  - Blog（含分类概览与统一分类列表模块）
  - Pricing（如适用）
  - Changelog（如持续迭代）
  - Terms / Privacy / About / Contact
  - FAQ
  - Sitemap 页面（非 sitemap.xml，而是人类可读的站点地图页）

> 如存在登录后的产品内页面（Dashboard / Settings / Onboarding / Integrations 等），在此可以先列出页面名称与一级导航结构，详细蓝图可在第 3 节做占位或 TODO。

### 3. Page Blueprints（页面蓝图）

本节对每一类页面给出「内容模块级」蓝图。不是写具体文案，而是说明每一块需要什么信息。

#### 3.1 Homepage（首页）

- **目标**：快速传达「这是做什么的、解决什么问题、对谁有用」，并引导用户进行下一步操作（试用 / 注册 / 了解更多）。
- **模块建议（可参考 `docs/homepage-template.tsx` 结构）：**
  - Hero 区（首屏）
    - H1 主标题：一句话讲清产品核心价值；
    - 副标题：1–2 句补充场景与收益；
    - 主 CTA 按钮（如「Get started」「Try it free」）；
    - 次 CTA（可选，如「View documentation」「Watch demo」）。
  - 问题 / 痛点描述（Why）
  - 核心功能 / Features 列表（每项包括名称 + 1–2 行卖点说明）
  - 使用场景 / Use Cases（可选）
  - 社会证明（Testimonials / Logos / Metrics）
  - FAQ 精选（链接到完整 FAQ 页）
  - 底部转换区（再次 CTA）

#### 3.2 Blog（博客模块）

- **目标**：教育用户、提升 SEO 与品牌权威，而不是制造空洞内容。
- **内容范围：**
  - Topics / 分类（例如：Use Cases、Best Practices、Tutorials、Product Updates）；
    - 是否需要固定的分类体系（或标签体系），由项目方提供首批分类列表（例如 4–8 个核心分类）；
    - 若使用分类：应在 `content.md` 中单独维护「Blog 分类列表」模块，后续文章优先复用既有分类，新增分类前需经过确认，避免「每篇文章一个新分类」；
  - 建议每篇文章针对明确主题和关键词。
- **文章模版结构（单篇蓝图）：**
  - 标题：H1（明确、可读，不钓鱼）；
  - Summary：50–160 字的摘要，用于列表卡片与 Meta Description；
  - 正文结构：按 H2/H3 分节，每节聚焦一个子观点或步骤；
  - 示例与落地建议：每篇文中至少包含 1–2 个可执行建议；
  - 内部链接：指向相关功能页 / Docs / FAQ / 相关 Blog 文章等；
  - 结尾 CTA（可选）：引导注册、试用或阅读相关文档。
- **URL 规范：**
  - 推荐优先使用简洁的一层路径（`/slug`），除非网站内容量特别大需要分区管理；
  - 如需单独的 Blog 前缀，可统一指定为 `/blog/slug`；无论采用哪种方案，都需在 `content.md` 的 URL 规范小节中写明方案，并在全站保持一致；
  - slug 采用英文小写短语，以 `-` 分隔单词。

#### 3.3 Pricing（定价页，若适用）

- **目标**：帮助用户在最短时间内判断是否合适，并降低决策成本。
- **内容要素：**
  - 定价模型说明（免费 / 订阅 / 分级 Plan / 按量计费等）；
  - 各 Plan 的名称、价格、适用人群与核心特性列表；
  - Plans 之间的差异点表格（Feature Matrix）；
  - 退款 / 试用策略（Trial / Refund Policy）；
  - 常见计费问题 FAQ；
  - 主 CTA（指向注册或付费流程）。

#### 3.4 Changelog（更新日志，若适用）

Changelog 内容规范（面向用户的更新说明）

- **受众与目的**
  - 面向最终用户和潜在新用户，帮助理解「这次更新对我的体验有什么变化」。
  - 不作为内部开发日志，内部细节记录在 `docs/dev-log.md` 或 PR 说明中。
- **适合出现在 Changelog 的条目（对用户有感知）**
  - 新功能：用户能直接看到/使用的新能力，例如「新增 Bulk Start，可一次启动多个列表」。
  - 体验改进：明显影响使用感受的变更，例如「倒计时加入 3 秒预备阶段」「Interval 编辑器在手机上更易点按」。
  - 重要修复：会影响正常使用或数据安全的问题，例如「修复分享链接在部分浏览器中无法打开」「修复计时在后台标签页暂停的问题」。
  - 支持范围变化：平台支持变更，例如「新增 Mobile 优化」「不再支持某浏览器版本」。
- **不适合放在对外 Changelog 的内容（仅供团队内部）**
  - 纯内部同步/维护：如「Kept docs/blog in sync: pnpm usage, Reps wording, and the new sound/countdown behavior」。
  - 实现细节：重构、依赖升级、打包策略、CI/CD 等（TypeScript/ESLint/pnpm 配置等）。
  - 过度细节化的布局/像素说明：例如逐条描述 Work/Rest UI 的内部组成，可用一句用户视角总结替代。
  - 命名/文案微调：用户难以感知的小改动，除非影响理解（此类可以在大版本中合并为一句「文案更清晰」）。
- **用户视角描述原则**
  - 用「对你有什么用」的语言，避免内部术语和文件路径。
  - 复杂改动合并为 1–2 条：例如上文 Timer UI 文案可简化为「Timer 布局更新，使 Work/Rest 和下一阶段提示更清晰」。
  - 每条长度建议控制在 1 行内（英文约 1 句），避免长段落。
- **平台标记规则（Desktop / Mobile）**

  - 不显示 `public` / `web` 等内部发布通道标签。
  - 每个条目可以在版本号后补充平台信息：`1.10.6 Desktop`、`1.10.6 Mobile` 或 `1.10.6 Desktop & Mobile`。
  - 若改动对所有平台完全一致，写 `Desktop & Mobile`。

- **写作风格（参考 Slack Changelog，但更口语化）**
  - 顶部保持统一标题与副标题：
    - 主标题：固定为 “Change log”。
    - 副标题：`See what's new and what changed in Go Exercise Timer.`，语气平实、直接。
  - 每个版本条目结构：
    - 左侧小卡片显示版本号和日期，例如：`Go Exercise Timer 1.10.8` / `3 December 2025`。
    - 右侧分为两组项目：
      - `What’s new`：1–3 条用户能直接感知的功能/体验变化。
      - `Bug fixes & polish`：可选，1–3 条修复或小改进；若当次没有可省略本组。
  - 文案原则：
    - 使用简短、完整的英文句子，不写长段落，每条控制在一行左右；示例：`You can now unlock Pro on the new Premium page with a simple one‑time payment.`
    - 多用「You can now… / When you… / In My Lists…」这一类人称开头，描述「你现在可以做什么」，而不是「实现了什么技术特性」。
    - 避免内部术语与实现细节（如 drag-and-drop hints、placeholder behavior、localStorage），改写为用户视角（例如 “reorder intervals feels smoother”）。
    - 对同一功能保持名称一致，与 UI 按钮文字一致（例如 My Lists / Add to My Lists / GO / Premium）。
    - 对修复类条目，推荐以 `Fix:` 开头，例如：`Fix: intervals are easier to reorder with smoother drag behaviour.`
  - 时间顺序：按时间倒序列出版本（最新在上），无需按月份分组，后续如版本增多再考虑按月折叠。
  - 统一使用英文对用户展示（按钮名、功能名与实际 UI 一致），中文仅用于本规范说明。

> 实现说明：Changelog 页面布局与视觉样式详见 `docs/style.md`「变更日志页面（Changelog）样式规范」，本节仅规定内容收录范围与文案风格。

### 3.5 法律页面（Privacy / Terms）内容与排版规范

- **适用范围**
  - Privacy Policy（隐私政策）；
  - Terms of Service（服务条款）。
- **布局与样式**
  - 页面容器：`max-w-3xl mx-auto px-4 py-10`，文本偏正文阅读风格；
  - 标题：主标题 `Privacy Policy` / `Terms of Service` 使用 `text-2xl font-semibold`；
  - 小节标题：每一节使用 `text-lg font-semibold` 的 `<h2>`，上方留出间距；
  - 正文：`text-sm md:text-base leading-relaxed text-foreground`；
  - 列表：所有要点使用圆点列表，类名建议 `list-disc list-outside space-y-1 pl-5`，避免将要点写成一整段文字。
- **内容结构（Privacy）**
  - 开篇段落：简要说明本产品是小型、浏览器端工具，不提供账号体系，大部分数据保存在本地设备。
  - 必须覆盖以下小节，每节建议以 `<h2>` + 圆点列表形式呈现：
    1. `What personal information I collect`
       - 明确列出收集范围（例如：反馈表内容、可选邮箱、基础分析数据等）。
    2. `Where this information comes from`
       - 标明来源（反馈表 / 浏览器端分析脚本）。
    3. `Why I collect this information`
       - 用用户视角解释用途（回复反馈、改进产品、防滥用等）。
    4. `How this information is collected`
       - 说明是通过表单提交、脚本记录等方式获得。
    5. `Who I share information with`
       - 指出仅与用于运行站点的服务提供商共享，并明确「不出售个人信息」。
    6. `Your choices and rights`
       - 写明：可以不提交反馈或不留邮箱；可通过清理浏览器存储删除本地数据；如需查询/更新/删除反馈，可通过 Feedback 页联系。
       - 在文案中加入到反馈页的链接（`/feedback` 或静态版本 `/feedback.html`），链接文案为 `feedback form`。
- **内容结构（Terms）**
  - 整体排版与 Privacy 保持一致（`max-w-3xl` + 标题 + 小节 + 圆点列表）；
  - 建议包含以下小节，并在对应小节中覆盖下述要点：
    1. `Use of the service`（使用方式与责任）
       - 说明这是一个「按现状提供」的工具，用户对自己的使用和训练/治疗结果负责；
       - 明确本服务不适合作为紧急医疗工具使用。
    2. `Accounts and content`（账号与内容）
       - 重申无账号体系，例程和音频主要保存在本地；
       - 如有分享链接，说明由用户自行决定是否分享。
    3. `Intellectual property`（知识产权）
       - 说明站点名称、Logo、UI 文案等的所有权；
       - 禁止未经授权复制、二次打包或商业再分发核心代码和品牌资产。
    4. `Acceptable use`（可接受使用范围）
       - 列出允许用途（个人训练、专业教学等）；
       - 明确禁止行为（攻击服务、试图绕过安全措施、违法用途等）以及可能的后果（例如终止访问）。
    5. `Payments, shipping and refunds`（付款与退款，仅在未来引入付费时启用）
       - 若有付费订阅或一次性购买，说明收费项目、计费周期、取消和退款规则；
       - 若涉及实体或数字商品交付，说明交付方式与时间；
       - 当前无付费时，可以用一条简单说明「Go Exercise Timer is free to use」并保留该小节以备扩展。
    6. `Governing law and dispute resolution`（适用法律与争议解决）
       - 指定适用法律辖区（例如某一国家/地区的法律）；
       - 简要说明争议优先通过协商解决，如需进一步行动则按照适用法律处理。
    7. `Privacy`（隐私引用）
       - 明确 Terms 与 Privacy Policy 的关系：使用服务即表示同意隐私政策中关于数据处理的说明；
       - 提供到 Privacy 页的链接。
    8. `Contact`（联系渠道）
       - 指向 Feedback 页作为唯一官方联系途径，链接文案可为 `feedback form` 或 `Contact me via the feedback form`。
- **索引与收录**
  - 所有法律页面默认设置 `robots: { index: false, follow: false }`（或静态页 `<meta name="robots" content="noindex, nofollow" />`），避免被搜索引擎收录；
  - 如需调整索引策略，必须在更新前确认合规性。

#### 3.6 In-App Pages（登录后产品页面 Blueprint 占位）

针对 Dashboard、Settings、Onboarding 等登录后页面，目前可以先定义占位和基本模块，后续按需补充细节。

- **Dashboard（占位，可后续细化）**

  - 用户登录后第一屏需要看到的信息（指标、最近活动、快速入口等）；
  - 主要模块列表（如：概览卡片、最近任务、快捷操作）。

- **Settings（设置中心，占位）**

  - 分为哪些子页？（如 Account、Billing、Notifications、Integrations 等）；
  - 每个子页下有哪些关键设置组？

- **Onboarding / Setup Flow（引导与首轮配置，占位）**
  - 首次登录是否有欢迎页 / 向导？
  - Onboarding 步骤的高层结构（Step 1 / Step 2 …），每步大致解决什么问题。

> 如当前阶段不打算立即设计产品内页面，可在 `content.md` 中为上述小节保留 TODO 或简短说明，待未来扩展。

### 4. SEO & Information Architecture（SEO 与信息架构）

这一节将站点结构与搜索策略结合起来：

- **URL 结构规则：**

  - 顶级路径：`/`, `/blog`, `/pricing`, `/changelog`, `/about`, `/contact`, `/faq`, `/terms`, `/privacy` 等；
  - 内容页路径：如 `/blog/slug`, `/changelog/yyyymmdd-release-name` 等。

- **Keywords Mapping：**

  - 为主要页面分配核心关键词与辅助关键词；
  - 确保每个关键词主要对应一个页面，避免大量重复竞争。

- **Heading 规范（H1/H2）：**

  - 每页仅一个 H1，对应页面标题，与 SEO 目标关键词对齐；
  - H2/H3 用于分节，避免过长无结构的正文。

- **内链策略：**

  - 首页、Blog、Docs、FAQ、Pricing 之间如何互相引流；
  - 明确「从哪里可以进入哪些核心页面」。

- **robots.txt & sitemap：**
  - 说明 robots.txt 与 sitemap.xml 的位置和内容策略（哪些路径允许抓取，哪些需要屏蔽）。

### 5. Content Rules（内容规范）

在 `content.md` 中，应包含一节内容规范，至少包括：

- 所有对外内容使用英文撰写（除非有明确多语言策略）；
- 内容必须对用户有实际帮助，不为了 SEO 机械堆砌关键词；
- 优先通过说明 + 示例的方式呈现，让用户知道如何应用；
- 标题不钓鱼、不夸张（避免「终极」「完美」「唯一」之类过度营销用语）；
- CTA 清晰直接（例如「Start free trial」「Read the guide」「View pricing」），避免模糊按钮文案；
- 面向真实使用场景写作，而不是仅给出抽象概念。

### 6. Writing Style Guide（写作风格）

`content.md` 应明确写作风格的来源与约束：

- 引用内部写作规范文档（例如：`@writing_style`），作为详细风格指南；
- 摘要性的 2–4 条原则，如：
  - 语气：专业但不生硬，避免行话堆砌；
  - 句式偏短，优先主动语态；
  - 同一概念在全站使用统一术语。

不建议在 `content.md` 中复制整份 style guide，而是用链接 / 引用的方式保持单一来源。

### 7. AI Checklist（写作 / 生成检查清单）

在 `content.md` 末尾保留一个给 AI 和文案使用的检查清单，类似：

- 这是怎样类型的网站？（SaaS 工具 / 内容站 / 混合）；
- 目标用户是否明确？是否在内容中体现出来；
- 核心功能和价值主张是否在首页与关键页面清楚呈现；
- 是否有定价策略？Pricing 页是否已经规划；
- 页面列表是否完整（包括 Blog / Pricing / Changelog / Legal / Contact / FAQ 等）；
- 首页结构是否完整（Hero / Features / Social proof / FAQ / CTA 等）；
- 是否有 Blog，以及每类文章是否有清晰模板；
- 如果是工具站，是否规划了 Pricing 和 Changelog；
- 所有对外内容是否为英文，且对用户有帮助而非空洞；
- Tone 是否统一、CTA 是否清晰且可执行。

---

## Output

- **Format:** Markdown (`.md`)
- **Location:** `/docs/`
- **Filename:** `content.md`

生成 `content.md` 时，AI 应严格遵循本规则文件中的结构与规范，必要时引用 `rules.md` 和 `style.md` 中的相关约定，而不在 `content.md` 中重复全局协作或视觉样式规则。\*\*\*
