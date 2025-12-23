# 项目任务清单

> 文档角色说明：本文件用于跟踪当前项目的开发任务与进度，是执行层的操作清单。行为逻辑与需求细节以 `docs/spec.md` 为准，视觉样式与交互细节以 `docs/style.md` 为准，页面结构与内容蓝图以 `docs/content.md` 为准，技术栈与基础设施选型以 `docs/tech.md` 为准；如有冲突须先更新规格文档，再调整任务列表，不得通过直接修改任务规避规格要求。

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch for this feature（e.g., `git checkout -b feature/ui-vercel-updates`）

### 1.0 Classic editor integration on main site

- [x] 1.1 Inline classic editor DOM into main page while preserving critical ids/classes.
- [x] 1.2 Bring in Bulma/app styles and latest `web/index.<hash>.js` bundle on the main page.
- [x] 1.3 Remove iframe and validate upload → edit → export works via local build + static server.

### 2.0 UI redesign across screens

- [x] 2.1 Establish new theme tokens/resets in `app/style.css` per design guidelines.
- [x] 2.2 Restyle Start screen and retest drag-and-drop/select flows.
- [x] 2.3 Restyle Settings screen; verify All/Survival/Custom toggles and “Next” flow.
- [x] 2.4 Restyle Editor screen; align toolbar/sidebar/palette/icons and shortcut parity.
- [x] 2.5 Restyle Convert screen; verify four export modes plus copy/download behavior.

### 3.0 Experience polish and compliance

- [x] 3.1 Add hover/focus/error cues and keep all surface copy in English.
- [x] 3.2 Add footer branding and MIT notice per spec.
- [ ] 3.3 Final regression: run upload → settings → edit → export → return across major browsers and mobile, log findings, and update `docs/style.md` tokens if new variants are added.

### 4.0 Bulma deprecation and overrides

- [x] 4.1 Inventory legacy styles and record baselines in `docs/style.md`.
- [x] 4.2 Centralize overrides into `app/styles/overrides.css` and load after main styles.
- [x] 4.3 Remove Bulma imports and replace classnames with new theme equivalents.
- [ ] 4.4 Post-cleanup self-check: full UI smoke (Start/Settings/Editor/Convert), confirm no Bulma assets remain, and capture outcomes here.

### 5.0 Vercel deployment（方案 A：Landing + /web）

- [x] 5.1 Make build cross-platform (use `rimraf` in package scripts).
- [x] 5.2 Fix webpack `publicPath` to `./` and verify static load of `/web/index.html`.
- [x] 5.3 Add `vercel.json` with rewrites/redirects for `/editor` and clean URLs.
- [ ] 5.4 Validate Vercel build logs and live `/` + `/editor` end-to-end flow.

### 6.0 Vercel deployment（方案 B：编辑器作为主站，可选）

- [ ] 6.1 Migrate editor markup into root `index.html` (no iframe) with correct asset order.
- [ ] 6.2 Adjust `vercel.json` outputDirectory/routing for editor-as-homepage and rerun regression.

### 7.0 Content and tutorials

- [x] 7.1 Consolidate blog content plan in `docs/blog-content-plan.md`.
- [x] 7.2 Create static pages (`pages/tutorials/*`, `pages/privacy.html`, `pages/terms.html`) and wire navigation.
- [x] 7.3 Ensure build copies pages via `scripts/compose-dist.js`; verify nav links locally.
- [x] 7.4 Publish tutorials: getting-started, pixel-art complete guide, minecraft schematics guide, paintings/custom art, roof designs.
- [x] 7.5 Tutorials QA for mobile/performance; update sitemap with new routes.
- [ ] 7.6 Local `dist/` preview of new pages with 404/console check.
- [ ] 7.7 Write “Command Block Projects” tutorial (`/tutorials/minecraft-command-block-projects`, ≥2000 words, 4–6 projects, commands, FAQ, internal links).
- [ ] 7.8 Write “Skin Creator Basics” tutorial (`/tutorials/skin-creator-basics`, Alex/Steve differences, workflow, pixel grid usage, export, FAQ).
- [ ] 7.9 Improve tutorials index with “Recently Updated”/“New” labels, card placeholders, and canonical/internal link audit.

### 8.0 Maintenance and dependency health

- [ ] 8.1 Dependency/config health check (pin Node version, plan Webpack/Babel upgrades, clean production logging).
- [ ] 8.2 Repo hygiene and entrypoint clarity (`framework: null`, README explaining Landing vs `/web/`, `.next` handling).

## Relevant Files

- `docs/spec.md` — Canonical behavior requirements.
- `docs/style.md` — Design tokens and visual baseline.
- `docs/content.md` — Page structure and content blueprint.
- `docs/tech.md` — Tech stack and infra decisions.
- `app/style.css` — Core theme styles.
- `app/styles/overrides.css` — Centralized post-Bulma overrides.
- `app/index.js` — App entry imports (styles/assets).
- `app/index.html` — Editor shell structure.
- `web/index.html` — Bundled editor output consumed by main site.
- `build/webpack.base.conf.js` — Webpack `publicPath` and shared config.
- `package.json` — Scripts and dependency versions (`rimraf` build).
- `vercel.json` — Deployment routing/rewrites configuration.
- `scripts/compose-dist.js` — Copies landing, editor, and static pages into `dist/`.
- `pages/tutorials/*`, `pages/privacy.html`, `pages/terms.html` — Static content pages.
- `docs/blog-content-plan.md` — Consolidated tutorials plan.
- `docs/tasks.md` — This task list.

### Notes

- 按完成协议及时将已完成的子任务 `- [ ]` 改为 `- [x]` 并记录发现；父任务可在子任务全绿后追加标记。
- 如需本地完工提示，参见 `rules.md` 中的通知命令。***
