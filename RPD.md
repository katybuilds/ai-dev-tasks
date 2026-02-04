# RPD — S&P 500 投资增长计算器（含历史回报参考）

文档角色说明：本文件定义「做什么、怎么运作」——功能逻辑、交互流程与业务规则；视觉细节统一收敛在设计规范 src\styles。

语言规范：本文档正文使用中文（简体）；产品面向美国用户，UI 文案使用英文（美式）；术语表中的 Term 使用英文（用于代码/规格/任务统一命名），界面外显文字以 UI 文案为准。

---

状态：本文件为草案（Draft）。我会先在对话中向你提出澄清问题；你确认后，再生成最终 `docs/PRD.md`。

---

## 1. Introduction / Overview（简介）

本产品是一个**假设性投资增长计算器**：用户输入起始金额、追加投资、投资期限、假设回报率等参数，得到未来资金增长的结果（图表 + 年度明细表）。

为帮助用户理解“假设回报率”是否偏激进/保守，产品提供 **S&P 500 历史回报区间的参考展示**（仅参考，不参与计算）。

核心原则：
- 不预测未来市场
- 不提供投资建议
- 所有计算基于用户输入的假设参数
- 历史数据仅用于背景参考，不影响计算结果

---

## 2. Domain & Primary Keywords（域名与关键词）

### 2.1 主要域名（Domain）
- TODO：填写主域名（例如 `example.com`）

### 2.2 关键词（Primary Keywords）
（默认建议，后续可按你的 SEO 策略替换）
- S&P 500 investment calculator
- S&P 500 return calculator
- index investment calculator
- investment growth calculator
- compound interest calculator with contributions
- future value calculator with contributions
- average stock market return calculator
- historical S&P 500 returns
- 10-year S&P 500 returns
- 30-year S&P 500 returns
- inflation-adjusted returns

---

## 3. Goals（目标）

G1. 用户能在 1 分钟内完成一次有效计算并理解结果（图表 + 年度明细）。

G2. 用户能理解“假设回报率”与 S&P 500 历史参考区间的关系（不将其误解为预测）。

G3. 页面在移动端与桌面端均可顺畅使用（核心交互无需横向滚动）。

G4（默认）：SEO 获客可衡量（见 Success Metrics）。

---

## 4. User Stories（用户故事）

- 作为普通投资者，我想输入起始金额、每月追加和投资年数，快速看到未来可能的账户余额。
- 作为预算规划者，我想以“目标金额”为目标，反推我需要的起始金额或需要的回报率。
- 作为长期规划者，我想知道在固定起始金额与追加金额下，达到目标金额需要多久。
- 作为谨慎用户，我想看到年度明细表，了解每年投入与增长分别是多少。
- 作为不熟悉市场的用户，我想用历史 S&P 500 回报区间来校准我的回报率假设是否离谱。

---

## 5. Glossary（术语表）

| Term | 中文解释 | UI 文案（外显） |
| --- | --- | --- |
| Mode | 计算目标模式（切换后输入项与输出不同） | Mode |
| StartingAmount | 起始投资金额 | Starting Amount |
| TargetAmount | 目标金额 | Target Amount |
| RegularContribution | 定期追加投入金额 | Regular Contribution |
| ContributionFrequency | 追加频率（按月/按年） | Contribution Frequency |
| ContributionTiming | 追加时点（期初/期末） | Contribution Timing |
| ExpectedAnnualReturn | 用户假设年化回报率 | Expected Annual Return |
| CompoundingFrequency | 复利频率（按年/按月） | Compounding Frequency |
| InvestmentLengthYears | 投资期限（年） | Investment Length (Years) |
| EndBalance | 期末余额/最终金额 | End Balance |
| TotalContributions | 累计投入（起始+追加）中的“追加部分合计” | Total Contributions |
| TotalInterest | 总增长/利息（不含本金与追加） | Total Interest |
| AccumulationSchedule | 年度积累明细表 | Accumulation Schedule |
| BenchmarkRange | 历史参考区间（min/avg/max） | Historical Range |

Glossary 使用规则：
- 规格/代码/任务统一使用 Term
- UI 一律使用「UI 文案」
- 新概念先补 Glossary 再进入需求条款

---

## 6. Interaction Flows（交互路径）

### 6.1 主流程（默认单页）

1. 用户进入主页面（桌面端左右分栏；移动端上下堆叠）。
2. 用户选择 Mode（四选一）。
3. 左侧输入面板根据 Mode 动态展示必填字段与可选字段，并给出默认值。
4. 用户调整输入，系统进行即时校验与格式化。
5. 用户点击 `Calculate`（或在输入变更后自动刷新，见 FR-012）。
6. 右侧结果区更新：
   - Summary cards（数字滚动更新）
   - Growth chart（柱状堆叠）
   - S&P 500 benchmark reference（参考条 + 假设回报率指示）
   - Accumulation schedule（表格）
7. 用户可复制/下载结果（若做，列入后续迭代；见 Non-Goals）。

### 6.2 四种 Mode 的交互差异

- M1: How much will my investment grow?
  - 输入：Starting Amount, Regular Contribution, Length, Return Rate（及频率/时点/复利频率）
  - 输出：End Balance

- M2: How much do I need to start with?
  - 输入：Target Amount, Regular Contribution, Length, Return Rate
  - 输出：Starting Amount

- M3: What return rate do I need?
  - 输入：Starting Amount, Target Amount, Regular Contribution, Length
  - 输出：Required Return Rate

- M4: How long will it take?
  - 输入：Starting Amount, Target Amount, Regular Contribution, Return Rate
  - 输出：Investment Length

---

## 7. Functional Requirements（功能需求）

### 7.1 Mode 与输入面板

FR-001：系统必须提供 4 个 Mode，并以清晰可见的方式切换（Radio/Segmented control 均可）。

FR-002：切换 Mode 时，输入面板必须仅展示该 Mode 所需字段；被隐藏字段不参与校验与计算。

FR-003：每个输入字段必须有默认值，且默认值需能产生有效结果（不报错）。

### 7.2 输入字段与校验

FR-004：金额输入（Starting/Target/Regular）必须支持千分位格式；失焦时自动格式化；非法字符必须被阻止或提示错误。

FR-005：百分比输入（Expected/Required return）必须支持 0.1% 步进；允许负值；范围默认 `-10%` 到 `100%`（可配置）。

FR-006：Investment Length（Years）必须限制在 `1` 到 `50` 年（可配置）；超出范围需给出错误提示并阻止计算。

FR-007：Contribution Frequency 必须支持 `Monthly (12/年)` 与 `Yearly (1/年)`。

FR-008：Contribution Timing 必须支持 `Beginning` 与 `End of period`；默认 `Beginning`。

FR-009：Compounding Frequency 必须支持 `Annually` 与 `Monthly`；默认 `Annually`。

### 7.3 计算引擎（业务规则）

FR-010：计算结果必须严格基于用户输入的假设参数；不得引入任何“预测”或默认市场回报。

FR-011：在默认假设（期初追加）下，系统必须按复利模型计算每期增长，并生成年度（Year 1..N）明细。

FR-012：计算触发策略必须二选一并在实现中保持一致：
- A. 显式计算：用户点击 `Calculate` 才更新结果
- B. 自动计算：输入变更后立即更新结果（需做节流/防抖）
> 默认建议：A（减少频繁重算与 UI 抖动）

FR-013：Mode M1 必须输出 End Balance、Total Contributions、Total Interest，并与明细表汇总一致。

FR-014：Mode M2 必须在给定 Target Amount、追加、期限、回报率时，计算 Starting Amount（允许为 0；若无解需提示）。

FR-015：Mode M3 必须在给定 Starting Amount、Target Amount、追加、期限时，计算 Required Return Rate；若无解或不收敛，必须提示用户调整输入。

FR-016：Mode M4 必须在给定 Starting Amount、Target Amount、追加、回报率时，计算 Investment Length（年）；若超出最大年限仍达不到目标，必须提示并建议调整参数。

FR-017：计算必须不包含税费、交易成本、管理费等；若未来加入开关，必须默认关闭（见 Open Questions）。

### 7.4 结果展示（Summary / Charts / Table）

FR-018：Summary cards 必须展示关键指标并在结果变化时使用数字滚动动画（Number ticker）。

FR-019：Growth Chart 必须按年份展示堆叠柱状：Initial principal、Total contributions、Total growth（利息/增长）；悬停 Tooltip 显示当年明细。

FR-020：S&P 500 Benchmark Reference 必须展示历史参考区间（min/avg/max 或区间带），并以“垂直虚线/指针”实时标记用户的回报率假设。
> 默认展示值（待确认数据口径）：Min 4% / Avg 10% / Max 15%

FR-021：Accumulation Schedule 必须展示以下列：
- Year（1..N）
- Starting Balance
- Contribution
- Interest（Ending - Starting - Contribution）
- Ending Balance

FR-022：当 Investment Length > 20 年时，明细表必须支持内部滚动或分页，避免整页过长影响可用性。

### 7.5 合规与免责声明

FR-023：页面必须显示免责声明（可在页底或结果区附近，且移动端可见）：
- 本工具提供基于用户假设的情景计算
- S&P 500 历史数据仅供参考，不代表未来
- 教育用途，不构成投资建议

### 7.6 非功能性要求（Non-functional Requirements）

NFR-001：页面必须响应式适配移动端与桌面端；移动端核心输入与结果无需横向滚动。

NFR-002：在常见输入规模（最长 50 年、按月复利与按月追加）下，单次计算的可感知响应应 < 1 秒。

NFR-003：前端需对无解/不收敛/极端参数给出清晰错误提示，并保证页面不崩溃。

NFR-004：所有输入控件必须具备可访问性基础要求（label/aria、键盘可操作、错误提示可被读屏理解）。

---

## 8. Non-Goals / Out of Scope（暂不做）

- 投资产品推荐或组合建议
- 实时行情/实时市场数据接入
- 税务、费用、再平衡等复杂金融模型
- 自动预测未来回报或“最佳回报率”提示
- 用户账户系统（登录、保存方案、同步等）

---

## 9. Design Considerations（设计注意事项，可选）

- 布局：桌面端左右分栏（输入在左、结果在右）；移动端上下堆叠（输入在上、结果在下）。
- 可读性：结果区优先展示 Summary + Growth；表格次之（可折叠/滚动）。
- 误解防护：Benchmark 旁必须强调 “historical reference only / not predictive”。

---

## 10. UI Reference Code（UI 参考代码）

> TODO：把现有 UI 参考实现贴在这里（例如：已有页面/组件/布局代码）。
> 后续实现应优先参考这份代码的结构与交互，而不是自行假设。

```tsx
// TODO: paste UI reference code here
```

---

## 11. Technical Considerations（技术注意事项，可选）

- 计算需可在前端本地完成；避免请求服务端才出结果（除非用于获取历史参考数据）。
- 需要支持“求解型”模式（M2/M3/M4）时，需采用稳定的数值求解策略与边界处理（无解、发散、极端输入）。
- 历史参考数据的来源、区间口径（年化/区间/通胀调整）必须在 UI 文案中透明披露（见 Open Questions）。

---

## 12. Success Metrics（成功指标）

（默认按 SEO 获客）
- SM-001：自然搜索会话（Organic sessions）月度增长
- SM-002：搜索结果 CTR（按核心关键词）
- SM-003：计算完成率（触发 Calculate 并产生有效结果的会话占比）
- SM-004：平均停留时长 / 滚动深度（表格/图表被浏览）
- SM-005：移动端可用性指标（输入错误率、退出率）

---

## 13. Open Questions（未决问题）

1. 主要域名是什么？最终 SEO 关键词清单与优先级如何定？
2. S&P 500 历史参考区间的口径：
   - 时间跨度（近 30 年？自 1957？）
   - 指标（年化复合回报？含分红？通胀调整与否？）
   - min/avg/max 的计算方式（滚动窗口 vs 固定区间）
3. 计算触发策略选择：显式 Calculate 还是输入即算？
4. 默认货币显示：仅 USD 还是支持切换？
5. 是否需要导出/分享（CSV、图片、链接参数化）作为后续增长点？
