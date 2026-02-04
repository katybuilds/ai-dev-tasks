# Tasks — S&P 500 Investment Calculator（含历史回报参考）

文档角色说明：本文件用于跟踪当前项目的开发任务与进度，是执行层的操作清单；行为逻辑与需求细节以 `docs/PRD.md` 为准，视觉样式与交互细节以 `src\\styles` 为准；当任务与上述规格文档发生冲突时，需要先确认并更新规格文档，再调整任务列表，不得通过直接修改任务规避规格要求。

> 说明：你选择了“暂时不落地到具体代码仓库（1C）”。因此本清单中的文件路径以 `TODO:` 占位；当确定实际仓库/目录结构后，应先统一更新《相关文件》再开始实现。

## 相关文件

- `TODO: <app-root>/docs/PRD.md` - 需求源文档（本仓库为 `docs/PRD.md`）。
- `TODO: <app-root>/src\\styles/*` - 全局样式与视觉规范来源（以实际项目路径为准）。
- `TODO: <app-root>/src/app/layout.tsx` - Next.js App Router 根布局（Title/Meta、全局结构）。
- `TODO: <app-root>/src/app/[locale]/page.tsx` - 单页主计算器入口（`/`，locale 路由）。
- `TODO: <app-root>/src/components/calculator/ModeSelector.tsx` - Mode 切换控件。
- `TODO: <app-root>/src/components/calculator/InputPanel.tsx` - 输入面板（按 Mode 动态字段 + 校验）。
- `TODO: <app-root>/src/components/calculator/CalculateButton.tsx` - 显式计算触发（Calculate）。
- `TODO: <app-root>/src/components/results/SummaryCards.tsx` - 汇总指标卡片（End Balance / Total Contributions / Total Interest）。
- `TODO: <app-root>/src/components/results/GrowthChart.tsx` - Recharts 堆叠柱状图（含 tooltip）。
- `TODO: <app-root>/src/components/results/BenchmarkReference.tsx` - S&P 500 历史参考区间（占位 min/avg/max + 指示器）。
- `TODO: <app-root>/src/components/results/AccumulationTable.tsx` - 年度明细表（滚动/分页策略）。
- `TODO: <app-root>/src/lib/calculator/engine.ts` - 计算引擎（M1 年度明细生成）。
- `TODO: <app-root>/src/lib/calculator/solvers.ts` - 求解型模式（M2/M3/M4）数值求解与无解处理。
- `TODO: <app-root>/src/lib/format/money.ts` - 金额格式化与解析（千分位、USD）。
- `TODO: <app-root>/src/lib/format/percent.ts` - 百分比格式化与解析（步进、范围）。
- `TODO: <app-root>/src/lib/validation/inputs.ts` - 输入校验规则（范围、必填、互相约束）。
- `TODO: <app-root>/src/components/Disclaimer.tsx` - 合规免责声明组件（移动端可见）。
- `TODO: <app-root>/src/lib/calculator/engine.test.ts` - 引擎单元测试（年度明细一致性；与实现同目录）。
- `TODO: <app-root>/src/lib/calculator/solvers.test.ts` - 求解器单元测试（收敛/无解/边界；与实现同目录）。
- `TODO: <app-root>/src/app/[locale]/calculator.spec.tsx` - 端到端测试（Mode 切换、显式 Calculate、错误提示；与页面相邻放置）。

## 任务

### 1.0 项目骨架与路由结构（Next.js App Router）

- [ ] 1.1 建立 Next.js + TypeScript（App Router）项目骨架与基础目录（按实际仓库路径落地）
- [ ] 1.2 实现 `/` 单页入口与页面信息架构：输入区 + 结果区（桌面左右分栏、移动上下堆叠）
- [ ] 1.3 在 `app/layout.tsx` 配置 Title/Meta（使用 PRD 中的 Title/Meta Description）并确保可被爬虫读取
- [ ] 1.4 预留 `src\\styles` 的样式入口与约束说明（不在任务中“替代”样式规范）

### 2.0 计算引擎与求解模式（M1–M4）

- [ ] 2.1 定义核心数据结构：输入模型、年度明细行结构、结果汇总结构（对齐 `docs/PRD.md` Glossary/FR）
- [ ] 2.2 实现 M1 计算引擎：生成 Year 1..N 的年度明细，并满足一致性公式（Ending = Starting + Contribution + Interest）
- [ ] 2.3 实现 Total Contributions / Total Interest 的汇总计算，并确保与年度明细汇总一致
- [ ] 2.4 实现 M2 求解：给定 Target/追加/期限/回报率，反推 Starting Amount（含无解/负值处理与提示码）
- [ ] 2.5 实现 M3 求解：反推 Required Return Rate（含不收敛/无解处理与提示码）
- [ ] 2.6 实现 M4 求解：反推 Investment Length（Years）；超过 50 年仍达不到目标需返回“不可达”结果
- [ ] 2.7 为求解型模式定义统一的错误/状态枚举（如 Valid/Invalid/NoSolution/NotConverged/OutOfRange），供 UI 展示

### 3.0 输入面板与校验（含显式 Calculate）

- [ ] 3.1 实现 4 个 Mode 的切换控件与映射表（每个 Mode 的必填字段、目标输出项）
- [ ] 3.2 实现输入控件：金额（千分位）、百分比（0.1% 步进，-10%~100%）、年限（1~50）、频率选择、时点选择、复利频率选择
- [ ] 3.3 实现输入校验：必填、范围、互相约束（如目标金额小于起始金额时的提示策略）
- [ ] 3.4 实现“显式 Calculate”触发：输入变更只更新校验状态，不触发重算；点击 Calculate 才更新结果（对齐 FR-012）
- [ ] 3.5 实现错误呈现策略：字段级错误提示 + 结果区“未更新/输入有误”的一致行为
- [ ] 3.6 补齐可访问性：label/aria、键盘操作、错误提示可被读屏理解（对齐 FR-028）

### 4.0 结果区 UI：汇总卡片 + 增长图表（Recharts）+ 历史参考区间

- [ ] 4.1 实现 Summary cards：End Balance / Total Contributions / Total Interest（对齐 FR-019）
- [ ] 4.2 实现 Recharts 堆叠柱状图（按年）：Initial principal / Total contributions / Total growth，并支持 hover tooltip（对齐 FR-020）
- [ ] 4.3 实现 S&P 500 Historical Reference 模块：展示 min/avg/max 区间带，并用指针标记 Expected Annual Return（对齐 FR-021）
- [ ] 4.4 默认使用占位区间值（Min 4% / Avg 10% / Max 15%），并在 UI 中明确标注“historical reference only / not predictive”（对齐 PRD 原则）
- [ ] 4.5 确保结果区在移动端可用：图表不溢出、tooltip 可触达、关键信息不被隐藏

### 5.0 年度明细表（Accumulation Schedule）与大年限处理

- [ ] 5.1 实现 Accumulation Schedule 表格列：Year / Starting Balance / Contribution / Interest / Ending Balance（对齐 FR-022）
- [ ] 5.2 实现年限 > 20 的策略：表格内部滚动或分页（二选一并实现一致行为）（对齐 FR-023）
- [ ] 5.3 表格数据格式化（默认 USD，是否支持多币种需等 PRD Q3 结论）与排序/对齐规则（仅执行层，样式细节回收至 `src\\styles`）
- [ ] 5.4 为表格与图表共享同一份年度明细数据源，避免“双算”导致不一致

### 6.0 合规免责声明、基础 SEO 元信息与可访问性

- [ ] 6.1 实现免责声明组件并放置在移动端可见位置，包含 PRD 要点（hypothetical / historical only / not advice）（对齐 FR-024）
- [ ] 6.2 为关键交互补齐可访问性检查：焦点顺序、错误提示、对比度/可读性（对齐 FR-028）
- [ ] 6.3 可选：基于 Success Metrics 增加最小可用的埋点规划（事件名/触发点清单，不落地具体平台）
- [ ] 6.4 添加最小测试覆盖：引擎一致性、求解器边界、E2E 的显式 Calculate 与 Mode 切换

## 开发规范与任务清单管理

**文档规范**

- 需求文档：实现功能时必须严格按照 `docs/PRD.md` 中的具体要求执行。
- 设计规范：界面样式与交互必须严格遵循 `src\\styles` 中的设计规范。

**沟通与执行**

- 遇到文档歧义或需求冲突时，必须暂停并确认，不得自行臆断。
- 界面实现若与原型或设计规范不一致，必须先确认后再实现。

**完成协议**

1. 一次只做一个子任务：在得到用户 “yes / y” 确认前，不要开始下一个子任务。
2. 当完成某个子任务时，立即将该条目标记为完成：把 `- [ ]` 改为 `- [x]`。
3. 当某个父任务下的所有子任务均为 `[x]` 时，可以在父任务标题前追加简单标记（例如在标题行最前面加上「✅ 」），无需再为父任务单独使用复选框。

**清单维护**

- 在实施过程中，如发现新的必要任务，应在 `docs/tasks.md` 中补充相应条目。
- 维护 `相关文件`：列出每一个被创建或修改的文件，并为每个文件提供一句用途说明。

