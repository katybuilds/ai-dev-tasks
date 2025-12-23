# Product Requirements Document（PRD）

文档角色说明：本文件定义「做什么、怎么运作」——功能逻辑、交互流程与业务规则；具体颜色/字体/间距/组件样式等视觉细节统一收敛在 `docs/style.md`。  
在本地查看效果：优先使用 `pnpm dev` 启动开发服务器，如未安装 pnpm，可按照项目 README 使用 npm/yarn。  
语言使用：内部说明文档使用中文，代码与对外界面使用英文；详细规则参见 `rules.md` 的语言使用规范。  
如需本地完工提示，可参考 `rules.md` 中的「本地完工提示」命令。

## 1. Introduction / Overview

Build a fully client-side Minecraft pixel art editor experience directly on the main site (Landing + `/web/` classic editor), with static tutorials/privacy/terms pages. Users should seamlessly upload images/schematics, configure conversion options, edit, and export without iframes or path issues, while tutorials guide usage and related topics.

## 2. Goals

- Ensure classic editor runs on main site with stable resource loading (`./` publicPath, redirect-safe URLs).
- Provide reliable end-to-end flow: Upload → Settings → Editor → Convert → Return/Home.
- Deliver consistent UI text in English and theme tokens per `docs/style.md`.
- Publish tutorials/privacy/terms with clean URLs and working navigation.
- Keep deployment predictable on Vercel (Node 22, static/Other framework mode).

## 3. User Stories

- As a creator, I can upload an image or schematic and immediately enter the editor to start converting.
- As a user, I can adjust block sets, dimensions, crop/aspect options, and proceed to editing with correct previews.
- As an editor user, I can use tools/shortcuts (brush/undo/redo/zoom/original view) without UI breakage.
- As a user, I can export in multiple formats (CommBlock/mcfunction/Raw/Manual), copy, or download results.
- As a visitor, I can read tutorials and legal pages from the navigation without 404s and with mobile-friendly layout.

## 4. Glossary

| Term | 中文解释 | UI 文案（外显） |
| --- | --- | --- |
| Landing | 站点根首页（含导航、Upload 按钮、教程入口） | Landing |
| Classic Editor | 经典像素画编辑器（/web/ 页面） | Editor |
| Start Screen | 编辑器上传入口界面 | Start |
| Settings Screen | 编辑器设置界面（模式、尺寸、裁剪等） | Settings |
| Editor Screen | 编辑器主界面（工具栏、画布、调色板） | Editor |
| Convert Screen | 导出界面（格式选择、计数、复制/下载） | Convert |
| Tutorials | 教程目录与文章集合 | Tutorials |
| Clean URL | 去除 `.html` 后缀的访问路径 | （不显示文案） |

## 5. Interaction Flows

- Landing upload → redirect to `/web/`: user clicks “Upload Image”, selects file, sessionStorage passes blob URL/name/type, page redirects to `/web/`, Start Screen auto-loads file, then user can proceed to Settings.
- Settings flow: user selects mode (All/Survival/Custom with tooltips), adjusts width/height with link toggle, crop/ignore aspect ratio, sees preview constrained to square container, clicks “Next” to enter Editor.
- Editor flow: user switches tools (P/B/U/E/Z/G), adjusts brush size (`[`/`]`), moves canvas with arrows, toggles Original view (`O`), uses undo/redo (Ctrl+Z/Ctrl+Y), edits without overflow/wrap issues, then proceeds to Convert.
- Convert flow: user switches export modes (CommBlock/mcfunction/Raw/Manual), sees reconvert prompt after edits, can copy or download with editable filename for mcfunction, then return back to Editor/Settings preserving state.
- Tutorials/Legal navigation: from top nav go to `/tutorials/`, individual articles, `/privacy`, `/terms`; clean URLs resolve without `.html`; mobile layout remains readable.

## 6. Functional Requirements

- FR1 Landing upload: provide hidden file input + “Upload Image” button; on selection, store `{url,name,type}` in sessionStorage and redirect to `/web/`; editor Home button returns to Landing and clears temporary state.
- FR2 Start Screen auto-load: on init, if sessionStorage entry exists, load image/schematic via existing upload handlers, then clear the entry; maintain width/height/state initialization.
- FR3 Settings behavior: modes limited to All/Survival/Custom with hover tooltips; “Image size” block in right column above convert CTA; width/height labels below inputs via pseudo-elements; crop/ignore aspect ratio checkboxes aligned; preview container square (max 600px) with image constrained.
- FR4 Height limit modal: when height >256 and Ignore height limit unchecked, show modal with Yes/Ignore/Cancel; Yes clamps height to 256 (relink width if locked), Ignore checks flag and continues, Cancel aborts conversion.
- FR5 Editor layout: `.editor-screen .columns` flex nowrap; right palette column fixed basis/max-width with responsive steps; workarea min-height 700px; no wrap/overflow causing palette to fall to next line; chessboard background preserved.
- FR6 Shortcuts & tools: tools P/B/U/E/Z/G match sidebar selection; brush size reflects shortcuts; arrow keys move canvas; O toggles Original; Ctrl+Z/Ctrl+Y undo/redo; no blocking errors.
- FR7 Convert functions: all four export modes functional; copy shows confirmation; mcfunction download filename editable; reconvert prompt appears after edits and regenerates output.
- FR8 Tutorials/legal pages: static HTML pages available at clean URLs; nav links from Landing and tutorials index resolve; pages include title/meta/OG/canonical, mobile-friendly typography.
- FR9 Sitemap & SEO: sitemap includes tutorials and legal routes (clean URLs); pages use OG/Twitter basics and descriptions ≤160 chars.
- FR10 Deployment constraints: build uses `rimraf web && webpack --config=./build/webpack.prod.conf.js && node scripts/compose-dist.js`; Webpack `publicPath: './'`; compose-dist outputs `dist/` with landing, `web/`, and static assets; Vercel uses redirects `/editor`→`/web/`, `/web`→`/web/`, framework null, Node 22.

## 7. Non-Goals

- No server-side rendering or Next.js migration in this scope.
- No dynamic auth, accounts, or payments.
- No redesign of visual tokens beyond what `docs/style.md` defines.
- No dependency major upgrades (e.g., Webpack 5) in this PRD scope.

## 8. Design Considerations (UI/UX)

- Follow `docs/style.md` for tokens, typography, spacing; avoid inline styles except necessary overrides.
- Keep all surface copy in English; tooltips match Glossary UI labels.
- Ensure focus states, hover, and error states remain visible; no sticky header on Landing.

## 9. Technical Considerations

- Vercel: set framework `null` (Other/Static), Node 22 (per `package.json.engines`); `.next/` ignored to avoid Next.js detection; `build/` must not be ignored.
- Paths: always access `/web/` with trailing slash; rely on redirects instead of rewrites to keep relative paths correct.
- Output: `dist/index.html` (Landing), `dist/web/` (editor bundle), `dist/static/` (assets); tutorials/privacy/terms copied to `dist/` via `scripts/compose-dist.js`.
- Local preview: `npx http-server dist -p 7787 --cors -c-1` for static verification; local rewrites differ from Vercel redirects.

## 10. Success Metrics

- End-to-end flow success rate (upload → convert) ≥ 99% across modern browsers in QA.
- Zero 404s on `/`, `/web/`, `/editor`, tutorials, privacy, terms, and bundled assets.
- No layout wrap/overflow issues in Editor at target breakpoints; mobile tutorials readable without horizontal scroll.
- Build and deploy pipelines pass without manual intervention on Vercel.

## 11. Open Questions

- Do we need additional tutorials beyond current roadmap (e.g., command blocks, skin creator) prioritized in this release?
- Should we add automated 404 scanning in CI to enforce resource path integrity?
- Any minimum browser support matrix to formalize (e.g., last 2 versions vs. specific ESR)?***
