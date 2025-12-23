# Tech Stack & Infrastructure

文档角色说明：本文件定义「用什么技术、如何部署」——前端技术栈、基础设施与运行环境；产品行为逻辑见 `docs/spec.md`，视觉与组件样式见 `docs/style.md`，站点内容与页面蓝图见 `docs/content.md`。

## 1. Project Overview & Constraints

- 类型：静态网站 + 经典像素编辑器（Landing + `/web/`），含 Tutorials / Privacy / Terms。
- 目标与范围：本地上传图片/`.schematic` → 配置 → 编辑 → 导出；无账户/支付；教程为静态内容。
- 关键约束：使用现有 Webpack 3 构建；`publicPath: './'`；编辑器需通过 `/web/` 路径访问并使用重定向保证尾斜杠；部署在 Vercel（Node 22，framework null）。
- 兼容性：需覆盖桌面和移动端（具体浏览器矩阵待确认，见开放问题）。
- 内容管理：页面/教程为静态文件由代码维护（`pages/`、`docs/`），无 CMS。

## 2. Frontend Stack

- 架构：原生 HTML/CSS/JavaScript + Webpack 3 构建经典编辑器产物。
- 样式：自定义 CSS（`app/style.css` + `app/styles/overrides.css`），按 `docs/style.md` 的 Design Tokens 与组件规格执行；无 UI 组件库。
- 资源组织：`app/index.js` 入口引入样式与脚本，生成 `web/index.<hash>.js` 与 `web/index.html`，再经组合脚本复制到 `dist/`。
- 理由：已有成熟的编辑器代码和打包流程；静态站部署简单且与 Vercel 适配，避免大规模迁移成本。

## 3. Backend & API Strategy

- 当前无独立后端或数据库需求；全部为静态资源与前端逻辑。
- 未来如需表单/反馈/上传持久化，优先评估无服务端写入或使用托管 API（例如轻量表单服务）；在未确认前保持 `TODO`。
- 外部调用：如需第三方 API（示例：图像处理、追踪脚本），必须通过受控入口并避免在浏览器暴露密钥。

## 4. Data & Storage

- 运行时数据：`sessionStorage`（Landing 上传跨页传递）；浏览器内存状态（设置/编辑/导出流程）。
- 持久化：无服务器端持久化；教程/页面存放于仓库。
- 分析数据：由 GA/Clarity 托管；如后续接入 AdSense，使用平台托管。
- TODO：如未来需要用户数据或内容 CMS，需选择托管存储（PostgreSQL/S3/KV）并更新本节。

## 5. Deployment & Environments

- 平台：Vercel（Framework: `null`/Other，Node 22）。
- 环境：`development`（本地 `npm install && npm run build` 或 `pnpm dev` 预览）；`production`（Vercel）。
- 构建命令：`npm run build` → `rimraf web && webpack --config=./build/webpack.prod.conf.js && node scripts/compose-dist.js`。
- 产物：`dist/index.html`（Landing）、`dist/web/`（编辑器）、`dist/static/`、`dist/tutorials/`、`dist/privacy.html`、`dist/terms.html`。
- 路由：`vercel.json` 使用 redirects `/editor` → `/web/`、`/web` → `/web/`，`cleanUrls: true`。
- 环境变量（示例占位，部署前补全）：
  - `GA_MEASUREMENT_ID`（可选，GA4，用于全局统计）
  - `CLARITY_PROJECT_ID`（可选，Microsoft Clarity）
  - `ADSENSE_CLIENT_ID`（可选，若决定接入 AdSense）
- 部署流程：连接仓库 → 设置 Node 22 与环境变量 → Vercel 触发构建 → 验证 `/`、`/editor`、`/web/`、教程/法务页面无 404 与资源错误。

## 6. Security & Secrets

- 所有密钥仅放置于环境变量，不写入仓库或前端代码；浏览器端不直接持有任何敏感 Key。
- 最小权限：如后续接入数据库/对象存储，使用最小权限凭证。
- 公开资源检查：确保 `build/` 未被忽略；确认 `.next/` 已在 `.vercelignore` 和 `.gitignore` 中，避免误识别框架。
- 基础防刷：若未来新增表单/外部 API 调用，需添加速率限制或人机验证（待需求出现时补充）。
- 部署前检查清单：密钥是否配置于 Vercel；构建日志无敏感输出；生产构建无开发调试接口暴露。

## 7. Analytics & Monitoring

- GA4：上线后接入，全局布局注入测量 ID；用途限于基础访问/转化统计；在隐私政策披露。
- Microsoft Clarity：上线后接入，用于热图/会话回放；在隐私政策披露。
- AdSense：待评估是否需要广告；若接入，控制展示位置/密度，避免破坏编辑体验。（TODO）
- 监控建议：可选接入 Vercel Analytics 或 Sentry 监控错误/性能，作为后续增强项。

## 8. SEO & Meta Infrastructure

- `sitemap.xml`：维护于 `public/sitemap.xml`，包含 Tutorials/Privacy/Terms 等 clean URLs。
- `robots.txt`：允许公开页面抓取；若有管理端/API，需显式限制（当前无）。
- Open Graph/Meta：各页面应设置 `<title>` 与 description（≤160 字符）；教程/法务页面在静态 HTML 中维护；社交分享图放置于 `public/`。
- Structured Data：文章类页面可使用 `Article`/`BreadcrumbList` schema（待确认是否添加）。
- 404：需自定义 404（简述与返回首页/编辑器入口）；若已存在请保留，否则后续补充。

## 9. Project Structure

- `app/` — 编辑器源代码与样式入口（`style.css`、`styles/overrides.css`、`index.js`）。
- `web/` — Webpack 构建输出（不提交仓库，发布时由 build 生成）。
- `pages/` — 静态页面（tutorials、privacy、terms）。
- `scripts/compose-dist.js` — 将 Landing、编辑器与静态页面复制到 `dist/`。
- `build/` — Webpack 配置（保留在仓库，勿忽略）。
- `public/` — 公共资源（含 `sitemap.xml` 等）。
- `dist/` — 发布产物目录（Vercel Output Directory）。
- `docs/` — 规格文档（`spec.md`、`style.md`、`tasks.md`、`tech.md` 等）。

## 10. Open Questions & Risks

- 浏览器支持矩阵未锁定（建议定义桌面/移动的最低版本范围）。
- 是否添加 CI 资源 404 扫描（自动校验打包产物与引用一致）。
- AdSense 是否需要接入；如需，需规划位置与隐私披露。
- 是否需要 staging 环境或预览域以做教程/法务校验。
- 是否需要未来接入 CMS（目前为代码维护）；若内容规模扩大需评估。
- Tutorials 扩展优先级：待确认哪些新教程（如 command blocks、skin creator）属于近期上线范围。
