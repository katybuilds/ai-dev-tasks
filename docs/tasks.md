## Relevant Files

- `extension/manifest.json` - 定义 Chrome 扩展的 Manifest V3 配置。
- `src/background/index.ts` - 背景 service worker，负责全局状态与搜索标签创建。
- `src/content/linkGuard.ts` - 内容脚本，处理链接禁用、选区监听与气泡菜单触发。
- `src/popup/App.tsx` - 扩展图标弹出层（Popup）UI 根组件。
- `src/options/App.tsx` - 设置页（Options Page）根组件，用于搜索引擎与白名单管理。
- `src/shared/storage.ts` - 封装 `chrome.storage` 相关的读写与同步逻辑。

### Notes

- 单元测试文件通常与被测文件放在同一目录，例如 `MyComponent.tsx` 与 `MyComponent.test.tsx`。
- 建议使用 `npx jest [可选测试文件路径]` 运行测试；不带路径时会运行所有由 Jest 配置发现的测试文件。

## Instructions for Completing Tasks

**重要：** 完成每个任务后，请在本 Markdown 文件中把对应条目的 `- [ ]` 改为 `- [x]`，以便跟踪进度并避免遗漏步骤。

示例：

- `- [ ] 1.1 阅读 Spec` → 完成后改为 `- [x] 1.1 阅读 Spec`

请在完成每一个子任务之后立即更新，而不是等整个父任务全部完成后再一次性勾选。

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 创建并切换到新的功能分支（例如：`git checkout -b feature/focussearch-chrome-extension`）
- [ ] 1.0 搭建 Chrome 扩展基础结构与构建配置
- [ ] 2.0 实现链接禁用（Link Guard）及白名单逻辑
- [ ] 3.0 实现普通模式下的文本选中气泡搜索菜单
- [ ] 4.0 实现搜索模式（自动搜索）及快捷键切换
- [ ] 5.0 实现搜索引擎配置存储与管理 UI
- [ ] 6.0 实现白名单域名管理与域名级链接禁用开关
- [ ] 7.0 实现弹出层（Popup）与设置页（Options Page）交互逻辑
- [ ] 8.0 实现数据存储与状态同步（包括搜索引擎列表、白名单、模式状态等）
- [ ] 9.0 测试、性能与可用性验证以及打包发布准备
