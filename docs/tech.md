# FocusSearch Tech Stack & Infrastructure (tech.md)

文档角色说明：本文件定义「用什么技术、如何打包发布」——Chrome 扩展的技术栈、项目结构与基础设施。产品行为逻辑见 `docs/spec.md`，视觉与组件样式见 `docs/style.md`，站点内容与页面蓝图见 `docs/content.md`（目前仅作为未来官网蓝图，首发阶段不搭建独立网站）。

---

## 1. Project Overview & Constraints（项目概览与约束）

- **项目类型**
  - 纯前端 Chrome / Chromium 浏览器扩展（Manifest V3），包含：
    - content scripts：注入到网页中，负责 Link Guard 与搜索气泡；
    - background service worker：负责全局状态、消息分发与新标签创建；
    - popup：用于当前站点 Link Guard & Search Mode 快速开关；
    - options page：用于搜索引擎列表与白名单配置。
- **目标用户与场景（摘要自 `spec.md`）**
  - 高频搜索与深度阅读用户，在阅读长内容时希望：
    - 减少误点链接导致的页面跳转；
    - 将「选中文本 → 搜索」压缩到最短路径；
    - 使用统一、可定制的搜索入口。
- **关键非功能性要求**
  - 性能：
    - content script 必须足够轻量，不能显著拖慢任意站点的滚动与交互；
    - 选区、链接监听逻辑尽量减少对 DOM 的频繁扫描与重绘。
  - 隐私：
    - 不上传具体选中文本或搜索关键词到自建服务器；
    - 优先使用浏览器本地存储（`chrome.storage`），不引入后端。
  - 兼容性：
    - 支持 Chrome 及其他 Chromium 内核浏览器（Edge / Brave 等）；
    - 不支持 Firefox / Safari（可在未来版本单独规划）。
- **已知约束**
  - 必须使用 Manifest V3；
  - 不部署独立 Web 后端或 SaaS 服务；
  - 首发阶段不搭建独立官网，对外说明主要依赖 Chrome Web Store 扩展详情页。

---

## 2. Frontend Stack（前端技术栈）

> 这里的「前端」指扩展内部的 UI 与脚本，而不是传统意义上的独立网站。

- **核心语言**
  - TypeScript（编译为浏览器可执行的 ES 输出）。
  - 理由：提供静态类型，有利于在 content / background / popup / options 之间保持消息结构与存储键统一，降低后期维护成本。

- **UI 层（Popup + Options 页面）**
  - 方案：**原生 HTML + TypeScript + Tailwind CSS（无框架）**
    - Popup / Options 均为简单表单与列表 UI（开关、输入框、列表、拖拽排序），不需要 React/Vue 这类框架的复杂状态管理；
    - 使用 Tailwind 将 `docs/style.md` 中定义的 Design Tokens 与组件风格直接映射到类名；
    - 通过少量 TypeScript 代码管理表单状态、同步 `chrome.storage`。
  - 理由（人话）：
    - 对 UI 较简单的扩展来说，原生 TS + Tailwind 足够清晰，打包体积更小、启动更快；
    - 不引入 React 可以减少配置复杂度（尤其是在扩展环境下），也更容易让后续接手的初级前端理解；
    - 仍然可以完全复用 `docs/style.md` 里的布局和组件风格，保持视觉一致。

- **内容脚本（Content Scripts）**
  - 方案：**纯 TypeScript + 原生 DOM 操作，不使用任何框架**。
  - 理由：
    - content script 注入到用户访问的每一个页面，对性能要求最高；
    - 使用框架会增加 bundle 体积，也可能与页面自身的 React/Vue 冲突；
    - 需求只涉及事件监听（选区变化、链接点击）、创建/定位一个气泡 `<div>`、简单的样式切换，原生 DOM 足够。

- **后台脚本（Background Service Worker）**
  - 方案：TypeScript 编写 service worker，在构建时产出符合 MV3 要求的背景脚本。
  - 职责：
    - 维护全局状态（Search Mode 开关、站点 Link Guard 状态等）；
    - 处理 content script 与 popup/options 之间的消息；
    - 调用 `chrome.tabs.create` 等 API 在后台打开新标签。

- **样式体系**
  - Tailwind CSS：
    - 所有颜色、圆角、阴影等 Design Tokens 以 `docs/style.md` 为唯一来源；
    - 项目中的 Tailwind 配置只负责将这些 token 映射为 `bg-*` / `text-*` / `shadow-*` 等类名，不在代码中重复具体色值。

- **对非工程师的意义**
  - 不引入大型前端框架，减少「隐形魔法」；
  - 所有 UI 都是 HTML + 类名 + 少量 TS，配合 `docs/style.md` 就能理解结构和样式；
  - content/background 脚本都是「逻辑脚本」，更容易从 `spec.md` 的功能描述映射到代码模块。

---

## 3. Backend & API Strategy（后端与 API 策略）

- **后端需求**
  - 当前版本：**不使用任何自建后端或托管后端**；
  - 不调用需要私密 API Key 的第三方服务（如自建 API、付费 AI 等）。
- **Chrome 扩展 API 作为唯一「后端」能力**
  - 使用的主要扩展 API：
    - `chrome.storage`（`sync` 与 `local`）——存储配置与状态；
    - `chrome.tabs`——创建后台搜索标签页；
    - `chrome.scripting`——注入 content scripts；
    - `chrome.runtime`（包括 `runtime.onMessage` / `runtime.sendMessage` 等）——脚本间消息通信；
    - `chrome.commands`——处理快捷键（如 `Alt+S`）。
- **未来扩展（TODO）**
  - 如未来需要云同步（例如跨设备同步配置）、账号体系或远程日志收集：
    - 需在 `spec.md` 与 `docs/content.md` 中增补需求；
    - 在本节新增后端方案对比（如 Supabase / Firebase / 自建 API），当前阶段仅标记为 `TODO`，不提前拍板。

---

## 4. Data & Storage（数据与存储）

- **数据类型**
  - 配置数据：
    - 搜索引擎列表及默认引擎；
    - 白名单域名列表；
    - 每个域名的 Link Guard 开关状态；
    - 全局 Search Mode 状态；
    - 功能行为设置（是否启用气泡菜单、是否显示禁用反馈等）。
  - 运行时状态：
    - 当前页面是否注入了气泡 DOM；
    - 当前选区内容（仅在本地内存中短暂存在，不持久化）。

- **存储方式**
  - 首选：`chrome.storage.sync`
    - 优点：同一 Google 账号登录的多台设备之间可以同步配置（与 `spec.md` 中「多设备一致体验」目标一致）；
    - 注意：受同步配额限制，配置结构应尽量紧凑（例如只存 JSON 配置，不存大量日志）。
  - 备选：`chrome.storage.local`
    - 如果后续发现 `sync` 配额不足或同步导致问题，可按键（例如「禁用同步」开关）切换到本地存储；
    - 具体切换策略留作实现阶段决策，视实际情况补充到 `tech.md` 与 `spec.md` 中。

- **隐私与合规**
  - 不存储用户选中文本内容或搜索关键词（仅在当次操作中构造搜索 URL 后丢弃）；
  - 不上传任何配置或行为数据到远端服务器；
  - 如未来需要远程错误日志或使用统计，必须：
    - 在 `spec.md` 与隐私说明中明确写出；
    - 在此节更新数据种类与存储位置。

---

## 5. Deployment & Environments（构建与环境）

> 本项目无传统意义上的「部署到服务器」，而是通过构建扩展包并提交到 Chrome Web Store。

- **构建工具**
  - Vite + `@crxjs/vite-plugin`：
    - Vite 提供快速开发与构建；
    - CRXJS 负责把多入口（background / content / popup / options）以及 Manifest V3 配置打包成可安装的扩展。
  - 包管理工具：`pnpm`（与项目 README / `spec.md` 中的本地开发说明保持一致）。

- **环境划分**
  - `development`：
    - 使用 `pnpm dev` 启动 Vite 开发模式；
    - 在 Chrome 中加载「未打包扩展」（从 `dist` 或 Vite 插件支持的 dev 目录加载），支持热重载或快速刷新。
  - `production`：
    - 使用 `pnpm build` 生成最终构建产物；
    - 输出为一个可提交到 Chrome Web Store 的压缩包或构建目录。

- **环境变量管理**
  - 当前版本无需任何敏感环境变量（无后端、无第三方密钥）；
  - 如未来引入可选分析或第三方服务，可通过 `.env` 配置非敏感 ID，并在本节维护一张变量表。

- **发布流程概述**
  - 本地确认功能与视觉符合 `spec.md` / `style.md`；
  - 运行 `pnpm build`，生成扩展构建；
  - 在 Chrome Web Store 开发者后台上传新版本（包含 Manifest、图标、截图等），等待审核；
  - 审核通过后自动向用户推送更新。

---

## 6. Security & Secrets（安全与权限）

- **密钥与敏感信息**
  - 当前版本不调用带密钥的外部 API，不在任何脚本中硬编码第三方密钥；
  - 如未来需要接入外部服务，其密钥不得写入扩展源码，应通过后端中转。

- **最小权限原则（Chrome 权限）**
  - 仅申请实现功能所需的最小权限，预期包括：
    - `"storage"`：存储配置与状态；
    - `"tabs"`：创建新标签页用于搜索；
    - `"scripting"` / `"activeTab"`：向页面注入 content script；
    - `"commands"`：定义快捷键（如 Search Mode 切换）；
    - 必要的 host 权限（优先考虑 `<all_urls>` + 可选权限机制，或在上线前按真实需要进一步收紧）。
  - 在 Manifest 中尽量使用「可选 host 权限」（optional permissions），让用户在需要时授权。

- **安全检查清单（开发/发布前）**
  - Manifest 中的权限列表与 `spec.md` 中的功能一一对应，无多余权限；
  - 不在控制台或存储中记录敏感信息（例如选中文本内容、完整 URL 历史）；
  - content script 不注入第三方远程脚本，只使用本地打包资源；
  - 对潜在错误（例如脚本注入失败、tabs 创建失败）有基本的错误处理与降级行为。

---

## 7. Analytics & Monitoring（分析与监测）

- **当前版本策略**
  - 不接入 Google Analytics、Microsoft Clarity 或其它第三方埋点服务；
  - 仅依赖 Chrome Web Store 后台提供的安装量与用户反馈统计。

- **未来可选扩展（TODO）**
  - 如后续需要匿名使用统计或错误上报，可考虑：
    - 轻量匿名统计服务或自建后端（需重新评估隐私与用户许可）；
    - 错误日志上报（例如仅收集错误类型和版本号，不收集内容数据）。
  - 一旦决定引入，应：
    - 在 `spec.md` 中更新非功能性需求与隐私说明；
    - 在本节详细说明使用的服务、数据类型与集成方式；
    - 在 `docs/tasks.md` 中新增对应集成任务。

---

## 8. SEO & Meta Infrastructure（SEO 与元信息基础设施）

- **当前状态**
  - 本项目首发阶段不搭建独立网站，对外主要载体为 Chrome Web Store 扩展详情页；
  - `docs/content.md` 中的站点结构与 SEO 规划仅作为未来官网的蓝图。

- **对当前阶段的影响**
  - 不需要 `sitemap.xml`、`robots.txt`、独立 404 页面等传统网站基础设施；
  - 需要确保 Chrome Web Store 详情页的标题、短描述和长描述：
    - 与 `docs/spec.md` 的价值主张和核心功能一致；
    - 覆盖「prevent misclicks / disable links / highlight to search」等关键短语；
    - 由后续内容撰写阶段参考 `docs/content.md` 的 Homepage 模块要点进行编写。

- **未来官网（TODO）**
  - 当决定搭建独立官网时：
    - 需基于 `docs/content.md` 规划 URL 结构、Meta/OG、sitemap 和 robots 策略；
    - 在本节补充具体实现方案（使用何种框架、部署平台等），可能成为一个新的 Web 子项目。

---

## 9. Project Structure（项目结构约定）

> 结构以 Chrome 扩展为中心，与 Claude 建议的目录组织基本一致，便于后续扩展与他人接手。

推荐目录结构示例：

```text
focussearch/
├── src/
│   ├── background/
│   │   └── service-worker.ts        # Manifest V3 service worker，处理全局状态与消息
│   ├── content/
│   │   ├── link-guard.ts           # 处理链接禁用逻辑
│   │   ├── search-bubble.ts        # 处理选区气泡显示与定位
│   │   └── index.ts                # content scripts 入口，初始化监听与注入
│   ├── popup/
│   │   ├── popup.html
│   │   ├── popup.ts                # 弹出层 UI 逻辑
│   │   └── popup.css               # 由 Tailwind 构建生成
│   ├── options/
│   │   ├── options.html
│   │   ├── options.ts              # Options 页面逻辑（搜索引擎列表、白名单等）
│   │   └── options.css
│   ├── shared/
│   │   ├── storage.ts              # 封装 chrome.storage 访问
│   │   ├── types.ts                # 共享 TypeScript 类型定义
│   │   └── constants.ts            # 常量（如 storage key、默认配置）
│   └── manifest.json               # 扩展 Manifest V3 配置
├── public/
│   └── icons/                      # 扩展图标资源
├── docs/
│   ├── spec.md
│   ├── style.md
│   ├── content.md
│   └── rules.md
├── vite.config.ts                  # Vite + CRXJS 配置
├── tailwind.config.ts              # Tailwind 配置（映射 docs/style.md 的 Design Tokens）
├── postcss.config.cjs              # PostCSS + Tailwind 集成（如需要）
├── tsconfig.json
├── package.json
└── pnpm-lock.yaml
```

> 说明：实际实现时可根据需要微调目录名称，但应保持「background / content / popup / options / shared」的职能划分，并在修改后同步更新本节说明。

---

## 10. Open Questions & Risks（开放问题与风险）

结合 `docs/spec.md` 中的开放问题，本节列出可能影响技术实现的点：

1. **选区变化触发频率**
   - 问题：当用户拖动鼠标持续改变选区时，content script 应该如何节流事件？
   - 当前假设：使用 `selectionchange` 或 `mouseup` + 简单防抖（例如 200–300ms），避免频繁创建/更新气泡；
   - 风险：过于频繁可能影响性能，过于保守可能让气泡显得「反应慢」，需在实现与实际测试中调优。

2. **超长选区处理**
   - 问题：如何处理超过一定长度的选中内容（例如 2000 字符以上）？
   - 当前假设：在本地先截断搜索查询字符串长度，超过部分丢弃，同时在 Help/FAQ 中注明行为；
   - 风险：部分搜索引擎对长查询有自身限制，如处理不当可能导致体验不一致。

3. **伪链接与复杂页面结构**
   - 问题：对于使用自定义组件或 `onclick` 实现的「伪链接」元素（非 `<a>`），是否也应纳入 Link Guard 管控？
   - 当前假设：首版仅保证标准 `<a>` 元素的行为，伪链接在后续版本评估兼容性与实现成本；
   - 风险：在某些站点上 Link Guard 效果可能不完全，需在文档中明确「主要针对标准超链接」。

4. **跨浏览器行为差异**
   - 问题：不同 Chromium 浏览器对快捷键、权限提示等的细节行为可能不同；
   - 当前假设：以 Chrome 为主进行开发与测试，其他 Chromium 浏览器按「尽力支持」；
   - 风险：个别浏览器可能出现快捷键冲突或权限提示不一致，需要在用户反馈后迭代。

5. **未来官网与扩展生态**
   - 问题：是否以及何时需要独立官网、文档站或多语言支持；
   - 当前假设：以 Chrome Web Store 详情页为唯一对外说明载体，`docs/content.md` 仅作为未来官网蓝图；
   - 风险：如扩展获得较多用户，后续引入官网时需要新建 Web 子项目并维护额外的技术栈。

> 以上开放问题应在实现与真实使用反馈中逐步收敛，并在需要时同步更新 `docs/spec.md` / `docs/content.md` / `docs/tech.md`，确保三者保持一致。***

