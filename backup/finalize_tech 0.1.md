# Rule: Finalizing Tech Stack & Infrastructure (tech.md)

本规则用于指导 AI 为「网站 / SaaS Web App / 营销站 / 内容站」这类**现代 Web 项目**生成统一的技术方案文档 `tech.md`。  
目标是：在我不是工程师的前提下，让 AI 主动规划合适的技术栈与基础设施，我只做**方向性选择**，不做底层技术判断，避免中途推翻重来。

AI 必须：

1. 在写任何代码前，先完成「技术方案 → 我确认 → 再开工」的流程；  
2. 始终用选择题和通俗语言解释方案，让非工程师也能判断；  
3. 如信息不足或存在重大不确定性，优先用 `TODO`/开放问题标记，**不要自行拍板技术决策**。

---

## Goal

指导 AI 基于现有需求文档，为当前 Web 项目生成一份**清晰、可落地的技术方案文档** `tech.md`，内容包括：

- 前端框架、语言、样式体系的选择（例如 Next.js + TypeScript + Tailwind）；  
- 后端 / API 方案（例如 Next Route Handlers / Serverless / 第三方 API）；  
- 部署与运行环境（默认 Vercel）；  
- 安全与密钥管理原则；  
- 分析与监测（Google Analytics / Microsoft Clarity / AdSense 等）；  
- SEO 相关基础设施（sitemap.xml、robots.txt、结构化数据、404 等）；  
- 项目目录结构与约定。

`tech.md` 是**技术与基础设施层面的规格文档**，不重复业务需求或视觉规范：

- 功能逻辑与交互 → 见 `docs/spec.md`；  
- 视觉与组件样式 → 见 `docs/style.md`；  
- 网站内容与信息架构 → 见 `docs/content.md`。

---

## Short Execution Mode (for AI)

在实际执行时，AI 可以遵循以下精简流程（完整细节仍以本规则全文为准）：

1. 读取相关文档：`spec.md` / `style.md` / `content.md` / `rules.md`；  
2. 提出最多 3–6 个澄清问题，聚焦项目类型、复杂度和关键技术约束；  
3. 基于回答给出 2–3 套技术栈方案，对比优劣，并附带「默认推荐」方案；  
4. 使用选择题方式请我确认最终方案（如「选 A/B/C」）；  
5. 生成并保存 `/docs/tech.md`，结构按照「Tech Document Structure」；  
6. 如项目已有 `docs/tasks.md`，同步补充与技术栈相关的任务（环境变量配置、部署、GA/Clarity/AdSense 接入等）。

> 在我没有明确确认之前，**不得开始写应用代码**（包括组件、API、样式实现等）。

---

## Process

1. **Receive Initial Prompt & Context**  
   - 获取项目简介或初始需求（通常已有 `spec.md` / `style.md` / `content.md`）；  
   - 明确当前是从零建站、重构现有站点，还是在既有技术栈上扩展。

2. **Read Existing Docs**  
   - `spec.md`：核心行为逻辑与功能范围；  
   - `style.md`：设计系统、组件风格与技术依赖（如 Tailwind）；  
   - `content.md`：页面类型（Home / Blog / Pricing / Changelog / Legal / Dashboard 等）；  
   - `rules.md`：协作流程、语言规范、提交与日志要求。

3. **Ask Clarifying Questions**  
   - 按下文「Clarifying Questions」提出 3–6 个关键问题；  
   - 按编号 + 选项（1A, 2C, 3B）组织问题，方便我用「1A, 2C…」快速回答。

4. **Propose Candidate Tech Stacks**  
   - 基于回答与文档内容，给出 2–3 套可行技术栈方案；  
   - 每套方案都要用人话解释清楚「适合什么、难度如何、未来维护怎样」；  
   - 同时标注哪一套是**默认推荐**（通常是 Next.js + TypeScript + Tailwind + Vercel）。

5. **Confirm & Lock Decisions**  
   - 用选择题形式请我在方案之间做选择（如：A 最快上线 / B SEO 更强 / C 长期扩展更好）；  
   - 记录我的选择及原因（简短即可，用于以后回溯）；  
   - 如我没有明确回复，但表达「用默认就好」或长时间未回应，则按本规则的默认方案执行。

6. **Generate `tech.md`**  
   - 使用「Tech Document Structure」一节的结构生成完整 `tech.md`；  
   - 对所有关键选型（框架、部署、数据存储、第三方服务）给出简洁理由；  
   - 对尚不确定或未来才会决策的部分，用 `TODO` 标注开放问题。

7. **Sync with `tasks.md`**  
   - 若项目已存在 `docs/tasks.md`，在生成或更新任务时：  
     - 添加对应的技术任务（如：配置环境变量、搭建部署、集成 GA/Clarity/AdSense 等）；  
     - 避免在代码阶段才突然发现「技术栈没决定 / 基础设施没规划」。

---

## Clarifying Questions (Guidelines)

在生成 `tech.md` 之前，AI 应根据初始描述补充问清少量「技术&架构层」的关键问题。只问真正影响技术栈与基础设施的点，避免重复询问可以在 `tech.md` 中用 `TODO` 保留的细节。

**提问格式要求：**

- **Number all questions**（1, 2, 3, …）；  
- 每个问题使用选项 A / B / C / D… 便于我回答；  
- 回答示例：`1A, 2C, 3B`。

**推荐问题维度（按需选用）：**

1. **网站类型与复杂度**
   - A. 单页/少量页面的营销站或 Landing Page  
   - B. 内容型网站（Blog / 文档为主）  
   - C. SaaS Web App（有登录 / Dashboard / 设置等）  
   - D. 其它（请简要说明）

2. **账户体系与数据持久化**
   - A. 无登录，只展示内容（无需持久化用户数据）  
   - B. 有简单账户 / 会话，但数据量不大（如个人项目、轻量 SaaS）  
   - C. 有完整多用户体系、付费、权限等（需要严肃的数据库与鉴权）  
   - D. 不确定（用 `TODO` 在 `tech.md` 中标明，后续再定）

3. **优先级偏好（上线速度 vs 性能 & SEO）**
   - A. 上线最快、实现简单优先（即使 SEO 和极致性能略弱）  
   - B. 长期可扩展和 SEO 更重要（可接受稍高的复杂度）  
   - C. 介于中间：希望兼顾上线速度和未来扩展  

4. **内容管理方式**
   - A. 主要通过代码维护（Markdown / JSON / 组件内写文案）  
   - B. 需要可视化 CMS（如 Sanity / Contentful / 自研后台）  
   - C. 先用代码维护，未来再考虑接入 CMS（在 `tech.md` 中标记为 TODO）

5. **预算与基础设施偏好**
   - A. 优先使用免费 / 免费额度友好的方案（如 Vercel 免费层、轻量外部服务）  
   - B. 可以接受少量付费服务换取省心（如托管数据库 / 监控平台）  
   - C. 无明确预算约束（但仍需说明成本）

6. **分析与广告相关（GA / Clarity / AdSense）**
   - A. 需要 GA + Clarity + AdSense，作为网站上线后必做事项（默认）  
   - B. 只要 GA + Clarity，不要 AdSense  
   - C. 目前不接入任何分析/广告，后续再说（在 `tech.md` 中标记为 TODO）

> 说明：你已表示「GA / Clarity / AdSense 每次都会加，但通常是网站做好后再做」，因此在没有特别说明时，可将 **6A** 视为默认，并在 `tech.md` 和 `tasks.md` 中作为「上线后任务」列出。

---

## Tech Document Structure（tech.md 模板）

生成的 `tech.md` 建议使用以下结构（可根据项目略微调整标题命名，但整体层级建议保留），并用中文说明、英文标记技术名词。

### 1. Project Overview & Constraints（项目概览与约束）

- 项目类型（营销站 / 内容站 / SaaS Web App 等）；  
- 目标用户与主要使用场景（简要摘要，可引用 `spec.md` / `content.md`）；  
- 关键非功能性要求（如：SEO 重要性、响应速度、可用地区、合规等）；  
- 已知约束（例如：必须部署在 Vercel / 必须支持某浏览器 / 需兼容移动端等）。

### 2. Frontend Stack（前端技术栈）

明确前端技术选型及理由：

- **Framework:** 如 `Next.js (App Router) + React + TypeScript`；  
- **Styling:** 如 `Tailwind CSS`，并说明与 `docs/style.md` 中 Design Tokens / 组件规范的关系；  
- **UI 组件策略（可选）：** 使用原生 + Tailwind，还是接入现成 UI 库（如后续项目有约定再补充）；  
- **理由（用人话）：**  
  - 为什么适合当前项目规模和目标？  
  - 对非工程师来说，这套栈意味着什么（维护成本、可招人情况等）。

### 3. Backend & API Strategy（后端与 API 策略）

- 当前项目是否需要独立后端：  
  - 若功能以展示 / 轻交互为主：可说明「仅使用 Next.js Route Handlers / Edge Functions + 第三方 API」；  
  - 若需要复杂业务逻辑（账户、订阅、支付等）：说明是否需要独立后端服务或托管平台（如 Supabase、Firebase、Appwrite 等），但**不得在未确认前擅自决定供应商**，可用 `TODO` 标记。  
- API 设计原则：  
  - 内部 API（如 `/api/...`）应遵循简单清晰的请求/响应结构；  
  - 尽量在服务器侧调用外部 API（例如 OpenAI / 支付网关），避免在浏览器暴露密钥；  
  - 对潜在高频/高成本 API 给出限流/缓存建议。

### 4. Data & Storage（数据与存储）

- 数据类型：用户数据、内容数据、日志/分析数据等；  
- 存储方式：  
  - 无需持久化时：只保留「无需服务器端数据库」说明；  
  - 需要持久化时：说明选型方向（如托管 PostgreSQL / KV / S3 兼容存储），但在供应商未定前用 `TODO` 标记；  
- 基本原则：  
  - 用户隐私数据最小化采集；  
  - 如涉及欧盟/隐私法等，需要在 `spec.md` / 法律页面补充合规要求。

### 5. Deployment & Environments（部署与环境）

- 默认部署平台：`Vercel`（除非我明确要求使用其它平台）；  
- 环境划分：至少包含 `development` / `production`，如需要 staging 再补充；  
- 环境变量管理：  
  - 所有密钥（API Key、数据库凭证等）必须通过 `.env` / 平台环境变量管理，不得写入代码仓库；  
  - 建议在 `tech.md` 中维护一张环境变量表（名称、用途、是否必需、在哪个环境配置）。  
- 部署流程概述：  
  - 初始部署步骤（例如：连接 Git 仓库 → 设置环境变量 → 首次部署）；  
  - 日常更新流程（例如：合并到 main 分支即自动部署）。

### 6. Security & Secrets（安全与密钥）

- API Key 与密钥：  
  - 所有 API Key（包括 OpenAI、第三方服务等）必须放在服务器端或 Serverless 环境；  
  - 浏览器端永远不直接持有密钥，只通过受控 API 间接调用；  
- 最小权限原则：  
  - 数据库、外部服务账号只授予必要权限；  
- 滥用与攻击防护：  
  - 对可能被滥用的接口（如免费 AI 调用、表单提交）提出限流、验证码、简单防刷策略建议；  
- 部署前检查：  
  - 在 `tech.md` 中列出简单的「安全检查清单」，例如：
    - 所有密钥是否都在环境变量中？  
    - 是否关闭了不需要的默认调试接口？  
    - 日志中是否避免输出敏感信息？

### 7. Analytics & Monitoring（分析与监测）

本节专门说明 **Google Analytics / Microsoft Clarity / AdSense** 等服务的规划方式：

- **Google Analytics (GA4)：**  
  - 默认：计划在网站 MVP 完成后接入 GA4，用于基本访问统计和转化跟踪；  
  - 在 `tech.md` 中说明：接入位置（如全局布局）、使用方式（仅基础统计，不做过度个性化），在 `tasks.md` 中添加「集成 GA」任务。  

- **Microsoft Clarity：**  
  - 默认：计划在 MVP 完成后接入，用于点击热图和会话回放；  
  - 强调：在隐私政策与 Cookie 提示中需披露该工具用途；  
  - 在 `tasks.md` 中添加「集成 Clarity」任务。  

- **Google AdSense：**  
  - 默认：视项目是否有广告变现需求而定。若未在澄清问题中明确为「需要」，可在 `tech.md` 中用 `TODO` 标注，并在 `tasks.md` 中添加「评估是否接入 AdSense」任务；  
  - 若明确需要：说明广告展示位置非常有限（避免破坏体验），并在内容与布局设计中预留空间。  

- 其它监测：  
  - 错误收集与性能监测（如 Sentry / Vercel Analytics 等）可标记为「建议项」，在后续版本中评估。  

### 8. SEO & Meta Infrastructure（SEO 与元信息基础设施）

- `sitemap.xml`：  
  - 说明生成方式（Next.js 内置 / 手写生成脚本），以及覆盖哪些页面类型（Home / Blog / Pricing / Changelog / Legal 等）；  
- `robots.txt`：  
  - 指定搜索引擎可访问与禁止的路径（如 `/api` / 管理端 / 实验页面）；  
- `Structured Data (Schema.org)`：  
  - 按页面类型（文章 / 产品 / 组织 / FAQ）列出计划使用的结构化数据类型，但具体字段可在实现时补充；  
- `Meta` & `Open Graph`：  
  - 全站默认标题/描述模板；  
  - 社交分享图的生成/维护方式。  
- `404` 页面：  
  - 明确需要自定义 404 页，并简述内容结构（简短说明 + 返回首页/关键入口）。

> 说明：SEO 细节在 `content.md` 与 `style.md` 中也会有所体现，`tech.md` 只负责说明**实现层**需要准备的基础设施。

### 9. Project Structure（项目结构约定）

以 Next.js + TypeScript 项目为例，推荐结构：

- `src/app/` → 页面路由与布局（App Router）；  
- `src/components/` → 可复用 UI 组件；  
- `src/lib/` → 工具函数、API 客户端、业务逻辑封装（如 `lib/api/*`, `lib/utils/*`）；  
- `src/styles/` → 全局样式（Tailwind 基础配置、CSS 变量等，与 `docs/style.md` 对应）；  
- `src/config/`（可选）→ 配置常量，如站点元信息、第三方服务 ID 等；  
- `public/` → 静态资源（图标、开放图图片等）。  

如 AI 认为需要改变结构（例如增加 `features/` 分层或引入 monorepo），必须先在 `tech.md` 中解释：

- 改动的具体内容；  
- 带来的好处（例如更易维护、大型项目更易扩展）；  
- 对现有代码和文档的影响。

### 10. Open Questions & Risks（开放问题与风险）

- 列出仍未决策但可能显著影响技术实现的问题（例如：具体数据库供应商、支付渠道、复杂权限模型等）；  
- 对每个问题简要说明：当前假设是什么（如果有）、会影响哪些模块、建议何时决策；  
- 这些问题应同步在 `spec.md` 的 Open Questions 或 `tasks.md` 中，避免被遗忘。

---

## Default Stack Recommendation（默认推荐方案）

当我**没有做出明确技术栈选择**，或明确表示「用默认就好」，且项目属于 Web 网站 / SaaS Web App 时，AI 可以采用以下默认方案：

- **Framework & Language**  
  - `Next.js (App Router) + React + TypeScript`  
  - 理由：生态成熟、SSR/SSG 支持良好、与 Vercel 深度集成、适合 SEO 和后续扩展。  

- **Styling & Design System**  
  - `Tailwind CSS` 作为主样式工具；  
  - 所有 Design Tokens / 组件风格以 `docs/style.md` 为唯一来源，`tech.md` 不复制具体数值；  
  - 全局排版与布局参考 `docs/style.md` 中的 Layout 与 Typography 约定。

- **Deployment**  
  - 默认使用 `Vercel` 部署生产环境；  
  - 开发环境使用本地 `pnpm dev`；  
  - 若需要其它平台（如自托管 / Cloudflare Pages），需在澄清阶段额外确认。  

- **Analytics & Monitoring**  
  - GA + Clarity 作为「MVP 完成后」的标准集成方案；  
  - AdSense 根据项目是否有广告需求而定，默认在 `tech.md` 中标记为 TODO 并在 `tasks.md` 中列为后续评估任务。  

> 即使使用默认方案，AI 仍需先在 `tech.md` 中清晰写明「这是默认技术栈」及其理由，并得到我的确认或默许后再开始编码。

---

## Output

- **Format:** Markdown (`.md`)  
- **Location:** `/docs/`  
- **Filename:** `tech.md`

生成 `tech.md` 时，AI 应：

1. 在文件顶部加入简短的**文档角色说明**，例如：  
   `文档角色说明：本文件定义「用什么技术、如何部署」——前后端技术栈、基础设施与运行环境；产品行为逻辑见 docs/spec.md，视觉与组件样式见 docs/style.md，站点内容与页面蓝图见 docs/content.md。`
2. 遵循本规则中的结构与约束，不在 `tech.md` 中重复 `rules.md` 的协作规则或 `spec.md` / `style.md` / `content.md` 的业务内容；  
3. 对不确定的技术决策使用 `TODO` 或「待确认」明确标注，而不是安静地做隐性假设。

---

## 最重要的三条（写给 AI）

1. **不要假设我懂技术**——用选择题让我做方向性选择，用人话解释技术差异；  
2. **先方案 → 我确认 → 再写代码**——技术栈和基础设施未确认前，不要直接开工；  
3. **如果你不确定，请问，不要自己决定**——对于会影响长期维护或成本的技术选择，宁可多问一句，也不要静默拍板。  
