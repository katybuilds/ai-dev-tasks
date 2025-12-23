# 部署决策与规范（Vercel + Webpack 3 静态站）

本文记录与部署相关的技术规范与架构性决策，供后续开发与运维参考。实操与排查步骤请见 `docs/task.md` 的“经验库”。

## 框架与运行时
- 框架识别：使用 Vercel 的 `Other/Static` 模式（不是 Next.js）。
- Node 运行时：遵循 `package.json` 中 `"engines": { "node": "22.x" }`，以满足 Vercel 最新运行时要求。
- 忽略目录：将 `.next/` 加入 `.vercelignore` 与 `.gitignore`，避免被误识别为 Next.js。

## 构建与输出
- 打包工具：沿用现有 Webpack 3 配置。
- publicPath：统一为 `'./'`，以支持在子目录（如 `/web/`）下相对加载资源。
- 产物目录：标准化到 `dist/`。
  - `dist/index.html`：Landing 页（仓库根 `index.html` 的拷贝）。
  - `dist/web/`：经典编辑器（由 Webpack 产出的 `web/` 拷贝）。
  - `dist/static/`：静态图片、数据等资源。
- 组合脚本：`scripts/compose-dist.js` 负责将打包产物组织进 `dist/`。
- 构建命令：`npm run build` → `rimraf web && webpack --config=./build/webpack.prod.conf.js && node scripts/compose-dist.js`。

## 路由策略
- 使用 Vercel `redirects` 保证尾部斜杠：
  - `/editor` → `/web/`
  - `/web` → `/web/`
- 选择“重定向”而非“重写”的原因：
  - 重写不会改变地址栏，可能导致页面中的相对路径按错误的基准解析（出现 `index.<hash>.js` 404）。
  - 重定向会将地址规范化为 `/web/`，确保 `./index.<hash>.js` 解析为 `/web/index.<hash>.js`。

## 站点内容页与路由（Tutorials / Privacy / Terms）

- 路由与路径（同一主域，无子域）
  - Tutorials：`/tutorials/`（目录页），`/tutorials/getting-started`
  - 法务：`/privacy`、`/terms`
  - 依赖 `vercel.json` 的 `cleanUrls: true`，将 `*.html` 清洗为无后缀 URL。
- 导航与信息架构
  - 根页顶部导航新增英文项：Tutorials（`./tutorials/`）、Privacy（`./privacy`）、Terms（`./terms`）。
  - Tutorials 目录页展示文章卡片（标题、摘要、关键词、阅读时长），按主题（Pixel Art / Schematics / Paintings / Roof / Skins / Command Blocks）组织。
- 内容页规范
  - Tutorials/Article（静态 HTML）包含：Title/H1、引言、（长文）目录、分步章节、Pro Tips、FAQ、CTA（返回工具与相关教程）。
  - 法务页（英文）：简洁披露 Google Analytics / Microsoft Clarity / AdSense 的使用，列出联系邮箱与开源仓库链接。
  - 风格：沿用 `app/style.css` 与 `app/styles/overrides.css` 的设计令牌；避免大段内联样式。
- 构建与输出
  - `scripts/compose-dist.js` 复制 `pages/` 到 `dist/`：
    - `pages/tutorials/` → `dist/tutorials/`
    - `pages/privacy.html`、`pages/terms.html` → 拷贝到 `dist/` 根（配合 cleanUrls 访问 `/privacy`、`/terms`）
- SEO 与可访问性
  - 每页提供 `<title>`、meta description（≤160 字符）、基础 OpenGraph/Twitter、canonical 指向主域。
  - 语义化标题层级（H1→H2→H3）、图片 `alt`、可见 focus 样式与键盘可达性。
- QA/回归
  - 新路径 `/tutorials/`、`/tutorials/getting-started`、`/privacy`、`/terms` 无 404；移动端排版可读；控制台无报错；Network 无 404。

### 命名与收录（新增）

- Slug 规范：教程页统一使用小写 kebab-case，挂载于 `/tutorials/`（例如：`/tutorials/pixel-art-complete-guide`）。
- 站点地图：新增或更新教程/法务页面时，同步在 `public/sitemap.xml` 添加对应 URL（遵循 cleanUrls，无 `.html` 后缀）。

## 本地与线上差异
- 本地静态服务器不会读取 Vercel 的 rewrites/redirects。
- 本地验证 `/editor` 行为请以线上结果为准；本地请直接访问 `/web/index.html` 或 `/web/`。
- 推荐本地预览命令：`npx http-server dist -p 7787 --cors -c-1`。

## 代码组织与约定
- 不提交 `web/`（构建产物）到仓库；仅发布 `dist/` 到 Vercel。
- `build/*` 为打包配置，禁止在 `.vercelignore` 中忽略该目录。
- 如需切换为“仅编辑器”站点，可将 Vercel Output Directory 改为 `web`，并将 Landing 并入编辑器或移除根页。

## 后续演进建议
- 依赖升级路线：Webpack 5 + Babel 7，替换废弃 loader 与插件，构建时移除 `console.*`。
- 路由与路径的自动化校验：在 CI 中加入资源 404 扫描（检查 `index.html` 内引用的脚本与实际文件一致）。

## UI/交互规范（设置页与预览）

- 预览区域
  - 预览图始终限制在预览容器内，不得溢出到右侧设置栏。
  - 容器为响应式正方形：宽度占满列，最大宽度 600px，保持 1:1 比例；图像 `max-width/max-height: 100%`，不得突破容器。

- 方块组选择按钮
  - 仅显示短标签：“All”“Survival”“Custom”。
  - 鼠标悬停显示说明（tooltip）：
    - All: All blocks
    - Survival: Blocks from survival mode (excl. The End)
    - Custom: Choose your own blocks
  - 按钮为紧凑尺寸（较小的内边距与阴影），避免占据过多空间或遮挡预览。

- 图片尺寸与裁剪设置的位置
  - 将以下控件从左侧预览列移动到右侧设置列，并放置在“Convert to Pixel Art”按钮之上：
    - “Image size” 标签（不再在标签后显示 WxH 数字，数值以下方宽高输入与“= xxx blocks”显示为准）。
    - 宽/高输入框与连锁图标，以及“= blocks”统计。
    - 勾选项：“Crop image”“Ignore aspect ratio”。
  - 该区域使用横向弹性排版，输入与复选项对齐整齐，窄屏下允许换行。

- 文字与字号
  - 除“方块组按钮”文字与“Image size”标签外，设置页其余文字（复选项、统计文案、表头、说明等）字号统一，继承 `app/style.css` 的正文字号（当前为 `0.95rem`）。
  - 不在 `overrides.css` 中单独放大/缩小这些文字，保持全局一致性。

- 宽/高标签位置
  - “Width”“Height”提示文案显示在对应输入框下方（非输入框内、非输入框上方）。
  - 可用伪元素实现（建议 `::after`），字号小于正文（约 11px），颜色为次要文本色，保证可读不喧宾夺主。

### 高度上限提示（自定义弹窗）

- 触发条件
  - 当高度值 `> 256` 且“Ignore in‑game height limit”未勾选时，点击“Convert to Pixel Art”弹出确认弹窗。

- 弹窗与按钮
  - 使用内置模态（`#modal-height-limit`），提供 3 个操作按钮：
    - Yes：将高度设为 `256` 后继续；若锁定比例，则按比例更新宽度；刷新“= blocks”计数。
    - Ignore：自动勾选“Ignore in‑game height limit”，按原尺寸继续。
    - Cancel：关闭弹窗，不进行转换，停留在设置页。

- 行为与导航
  - 选择 Yes 或 Ignore 后，按当前设置进入编辑器流程；Cancel 不做任何修改。
  - 弹窗为统一样式按钮：主按钮（Yes）为深色强调，Ignore/Cancel 为浅色次级。

## 编辑器尺寸与嵌入规范（彻底规避换行/挤压）

本节统一规定编辑器在独立页与 Landing 嵌入两种场景的尺寸、布局与断点，避免右侧 Block Palette 被“挤到第二行”等问题。

### 独立编辑器页（/web/）

- 容器与列
  - `.editor-screen .columns` 使用 `display:flex` 并强制 `flex-wrap: nowrap !important`，列不可换行。
  - 高度：`height: calc(100vh - 120px)`（预留 Topbar + Footbar），保证底部 Status bar 可见。
  - 左侧画布列：`flex: 1 1 auto`，可自由扩展填满剩余空间。
  - 右侧 Block Palette 列：基础 `flex-basis: 300px`、`max-width: 340px`；随宽度收缩的断点：
    - ≤1500px → `flex-basis: 280px / max-width: 320px`
    - ≤1380px → `flex-basis: 260px / max-width: 300px`
  - 页面最小高度：`.workarea { min-height: 700px }`。

- 画布区
  - `.editor-canvas` 占据左列（去除额外 margin/padding），背景棋盘格维持 25px。

### Landing 嵌入（iframe 预览，仅作为演示）

- Iframe 外尺寸与高度自适应
  - 宽度：两档（COMPACT 1140 / EXPANDED 1600）。
  - 高度按“屏幕状态”取值：
    - Start（上传）：固定 220 px
    - Settings（设置）：固定 580 px
    - Editor（编辑）：100vh（`height = window.innerHeight`）
  - 页面滚动：允许；iframe 内部不滚动（`scrolling='no'`）。不要锁定 `body` 的 `overflow`。
  - 自动定位：当嵌入内从 Start 切换到 Settings 或 Editor 时，宿主页面自动将编辑器卡片滚动到视窗顶部（约 12px 顶部留白），减少用户手动滚动。
  - 不显示滚动条：iframe `scrolling = 'no'`；iframe 内 compact 模式强制 `body.compact-mode { overflow: hidden; }`。
  - 随窗口 resize 重新计算高度，确保不产生页面滚动条。

- Iframe 内紧凑样式（compact-mode）
  - 注入 `body.compact-mode` 限制溢出并收紧外边距，仅用于预览，不影响独立页。

- 重要：生产/预览一律访问 `/web/`（带尾斜杠），否则相对路径会解析为错误位置导致空白页。

### 导航与头部（无粘性）

- Landing 页的页头 header 不使用粘性定位（sticky）。
  - 规则：`header { position: static; top: auto; backdrop-filter: none; background: transparent; }`
  - 原因：避免粘性头部占用垂直可视空间、与 iframe 预览或滚动产生遮挡与高度计算偏差；在不同浏览器上表现一致。

### 统一文本与控件位置（回顾）

- 设置页文字
  - 除方块组按钮与 “Image size” 标签外，其他均继承正文字号（当前 `0.95rem`）。
  - “Width/Height” 标签位于输入框下方，使用 `::after` 实现（约 11px，次要色）。

- 按钮与工具提示（Tooltips）
  - 方块组按钮仅显示：All / Survival / Custom；副文隐藏。
  - 悬停文案：
    - All: All blocks
    - Survival: Blocks from survival mode (excl. The End)
    - Custom: Choose your own blocks

- 图片尺寸区块位置
  - 将 “Image size + 宽高输入 + Crop Image/Ignore Aspect Ratio” 放在右侧设置列、提交按钮上方。

### 预览容器（Settings 左侧）

- 容器：正方形、`max-width: 600px`、`aspect-ratio: 1/1`、`overflow:hidden`。
- 预览图：`max-width:100% / max-height:100%`，禁止拖拽选择。
- 初始化时机：在切换到 Settings 后再初始化/显示裁剪层（SvgCroppy）。若为空图问题复现，使用微任务或 `requestAnimationFrame` 延迟 1 帧后初始化。

### Landing 上传直达编辑器（Plan A 概要）

- Landing：隐藏文件输入 + “Upload Image” 按钮，选择后：
  - `sessionStorage.landingUpload = { url, name, type }`（`url` 为 `URL.createObjectURL(file)`）。
  - 先平滑滚动到 `#playground`（让用户获得“已开始进入编辑器”的空间感），随后在 ~200ms 内跳转到 `./web/`。
- 编辑器启动：`app/screens/start.js` 在 `init()` 读取并加载：
  - `type=image` → `uploadImage(blobUrl)`；`type=schem` → `fetch(blobUrl)` → `uploadSchematic(blob)`。
  - 读取完清除该项，避免二次加载。
- 顶部栏提供 `Home`，可返回 `../index.html`。

以上尺寸/交互规范为对齐标准，任何改动需同步更新本节，避免再出现“编辑器尺寸/换行”问题。
