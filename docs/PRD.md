# PRD — S&P 500 Investment Calculator（含历史回报参考）

文档角色说明：本文件定义「做什么、怎么运作」——功能逻辑、交互流程与业务规则；视觉细节统一收敛在设计规范 src\\styles。

语言规范：本文档使用中文（简体）描述需求；代码与内部术语（Term）使用英文；对外 UI 文案使用英文（美式，en-US）。

---

## 1. Introduction / Overview（简介）

**产品名称（Product Name）**  
S&P 500 Index Investment Return Calculator

**网站标题（Title）**  
S&P 500 Investment Calculator - Index Growth with Contributions

**网站描述（Meta Description）**  
Calculate S&P 500 index investment growth using starting amount, additional contributions, investment length, and assumed return rate. View results with charts, tables, and historical S&P 500 reference data.

**产品类型**  
假设性投资增长计算器（用户输入假设参数），附带 S&P 500 历史回报区间参考展示。

**要解决的问题**  
用户常需要在“起始金额 + 定期追加 + 投资期限 + 假设回报率”的场景下，快速估算未来可能的资金增长，并希望看到清晰的图表与年度明细表以验证理解。

**产品原则（必须遵守）**
- 不预测未来市场
- 不提供投资建议
- 所有结果只基于用户输入的假设参数
- S&P 500 历史数据仅用于参考说明，不参与计算且不代表未来表现

**V1 信息架构（已确认）**
- `/`：单页主计算器（包含历史参考模块/折叠区）

---

## 2. Domain & Primary Keywords（域名与关键词）

**主要域名（Domain）**：`sp500investcalc.com`

**Primary Keywords（初稿，可调整）**
- S&P 500 investment calculator
- S&P 500 return calculator
- index investment calculator
- investment growth calculator
- compound interest calculator with contributions
- future value calculator with contributions
- historical S&P 500 returns
- 10-year S&P 500 returns
- 30-year S&P 500 returns
- inflation-adjusted returns

---

## 3. Goals（目标）

G1. 用户能在 1 分钟内完成一次有效计算，并理解结果组成（本金/追加/增长）。

G2. 用户能明确理解历史参考仅用于“校准假设”，不将其误解为预测或建议。

G3. 移动端与桌面端均可顺畅操作（无需横向滚动即可完成输入与查看核心结果）。

G4. 支持 SEO 获客：页面结构与文案具备可扩展的关键词承载能力（见 Success Metrics）。

---

## 4. User Stories（用户故事）

- 作为普通投资者，我想输入起始金额、每月追加与投资年数，看到最终金额与增长构成。
- 作为目标导向的用户，我想以目标金额为输入，反推出所需起始金额。
- 作为规划者，我想知道达到目标金额所需的回报率或所需的投资年数。
- 作为谨慎用户，我想查看年度明细表，确认每年投入与增长的变化。
- 作为不熟悉市场的用户，我想用 S&P 500 历史回报区间参考来判断假设回报率是否离谱。

---

## 5. Glossary（术语表）

| Term | 中文解释 | UI 文案（外显） |
| --- | --- | --- |
| Mode | 计算目标模式（切换后输入与输出不同） | Mode |
| StartingAmount | 起始投资金额 | Starting Amount |
| TargetAmount | 目标金额 | Target Amount |
| RegularContribution | 定期追加投入金额 | Regular Contribution |
| ContributionFrequency | 追加频率（按月/按年） | Contribution Frequency |
| ContributionTiming | 追加时点（期初/期末） | Contribution Timing |
| ExpectedAnnualReturn | 用户假设年化回报率 | Expected Annual Return |
| CompoundingFrequency | 复利频率（按年/按月） | Compounding Frequency |
| InvestmentLengthYears | 投资期限（年） | Investment Length (Years) |
| EndBalance | 期末余额/最终金额 | End Balance |
| TotalContributions | 累计追加投入合计 | Total Contributions |
| TotalInterest | 总增长（不含本金与追加） | Total Interest |
| AccumulationSchedule | 年度积累明细表 | Accumulation Schedule |
| BenchmarkRange | 历史参考区间（min/avg/max） | Historical Range |
| CalculateAction | 显式触发一次计算 | Calculate |

Glossary 使用规则：
- 规格/代码/任务统一使用 Term
- UI 一律使用「UI 文案」
- 新概念先补 Glossary 再进入需求条款

---

## 6. Interaction Flows（交互路径）

### 6.1 主流程（V1 单页）

1. 用户进入 `/` 页面。
2. 用户选择 `Mode`（四选一）。
3. 左侧输入面板根据 Mode 动态展示必填字段与可选字段，并显示默认值。
4. 用户修改输入；系统进行即时校验与格式化（金额千分位、百分比格式、范围提示等）。
5. 用户点击 `Calculate`。
6. 结果区更新并展示：
   - Summary cards（关键数字）
   - Growth chart（按年堆叠柱状）
   - S&P 500 historical reference（参考区间 + 回报率指示器）
   - Accumulation schedule（年度明细表）
7. 用户可切换 Mode 并重复计算；切换后结果区显示新 Mode 的输出。

### 6.2 错误与边界提示（用户视角）

- 若输入不合法（为空、超范围、互相矛盾），在点击 `Calculate` 后：
  - 对应字段显示错误状态与简短说明
  - 结果区不应显示误导性的旧结果（可保持上次结果但需提示“输入有误，结果未更新”，或直接清空）
- 若求解型 Mode 无解（例如在最大年限内无法达到目标），展示明确提示与建议调整的输入项。

---

## 7. Functional Requirements（功能需求）

### 7.1 Mode 与输入面板

FR-001：系统必须提供 4 个 Mode，分别为：
- M1: How much will my investment grow?
- M2: How much do I need to start with?
- M3: What return rate do I need?
- M4: How long will it take?

FR-002：切换 Mode 时，输入面板必须仅展示该 Mode 所需字段；隐藏字段不参与校验与计算。

FR-003：每个 Mode 必须定义“目标输出项”（Target Output）并在结果区显著展示。

### 7.2 输入字段、默认值与校验

FR-004：金额输入（Starting/Target/Regular）必须支持千分位展示与编辑；失焦后自动格式化；必须拒绝或提示非法字符。

FR-005：百分比输入（Expected/Required return）必须支持 0.1% 步进；允许负值；默认范围 `-10%` 到 `100%`（实现中可配置）。

FR-006：Investment Length (Years) 必须限制在 `1` 到 `50`；超出范围必须阻止计算并提示错误。

FR-007：Contribution Frequency 必须支持 `Monthly (12/yr)` 与 `Yearly (1/yr)`。

FR-008：Contribution Timing 必须支持 `Beginning` 与 `End of period`；V1 默认 `Beginning`（已确认）。

FR-009：Compounding Frequency 必须支持 `Annually` 与 `Monthly`；V1 默认 `Annually`（已确认）。

FR-010：所有输入项必须提供默认值，且默认组合应能产生有效结果（不报错、不无解）。

### 7.3 计算引擎（业务规则）

FR-011：计算结果必须严格基于用户输入的假设参数；不得引入任何“预测”或“推荐”回报率。

FR-012：计算触发策略必须为“显式计算”：仅当用户点击 `Calculate` 时更新结果（已确认）。

FR-013：系统必须生成年度明细（Year 1..N），并保证：
- `EndingBalance = StartingBalance + Contribution + Interest`
- `Interest = EndingBalance - StartingBalance - Contribution`

FR-014：M1（计算最终金额）输入与输出：
- 输入：Starting Amount, Regular Contribution, Investment Length, Expected Annual Return（及频率/时点/复利频率）
- 输出：End Balance, Total Contributions, Total Interest

FR-015：M2（反推起始金额）输入与输出：
- 输入：Target Amount, Regular Contribution, Investment Length, Expected Annual Return
- 输出：Starting Amount
- 若无解或解为负值，必须提示用户调整输入。

FR-016：M3（反推回报率）输入与输出：
- 输入：Starting Amount, Target Amount, Regular Contribution, Investment Length
- 输出：Required Return Rate
- 若无解或数值求解不收敛，必须提示用户调整输入。

FR-017：M4（反推年限）输入与输出：
- 输入：Starting Amount, Target Amount, Regular Contribution, Expected Annual Return
- 输出：Investment Length (Years)
- 若超过 50 年仍无法达到目标，必须提示并建议调整参数。

FR-018：计算必须不包含税费、交易成本、管理费等；且 UI 文案不得暗示“税后/净收益”。

### 7.4 结果展示（Summary / Charts / Table）

FR-019：Summary cards 必须展示关键指标（至少包含 End Balance、Total Contributions、Total Interest），并与明细表汇总一致。

FR-020：Growth Chart 必须按年份展示堆叠柱状（至少包含：Initial principal / Total contributions / Total growth），并支持 hover tooltip 展示当年明细。

FR-021：S&P 500 Historical Reference 必须展示历史参考区间（min/avg/max 或区间带），并以“垂直虚线/指针”标记用户的回报率假设。
> V1 默认展示值（占位，待确认数据口径后替换）：Min 4% / Avg 10% / Max 15%

FR-022：Accumulation Schedule 必须展示以下列：
- Year（1..N）
- Starting Balance
- Contribution
- Interest
- Ending Balance

FR-023：当 Investment Length > 20 年时，明细表必须支持内部滚动或分页，避免整页过长影响可用性。

### 7.5 合规与免责声明

FR-024：页面必须显示免责声明（移动端可见，且不被折叠到不可发现的位置），包含以下要点：
- 这是基于用户假设参数的情景计算（hypothetical）
- S&P 500 历史数据仅供参考，不代表未来
- 教育用途，不构成投资建议

### 7.6 非功能性要求（作为可验证条款）

FR-025：页面必须响应式适配移动端与桌面端；移动端完成核心流程不需要横向滚动。

FR-026：在常见输入规模（最长 50 年、按月复利与按月追加）下，点击 `Calculate` 后 1 秒内完成更新（不包含首次加载网络资源）。

FR-027：对无解/不收敛/极端参数必须给出清晰错误提示，并保证页面不崩溃。

FR-028：输入控件必须具备可访问性基础：label/aria、键盘可操作、错误提示可被读屏理解。

---

## 8. Non-Goals (Out of Scope)（暂不做）

- 投资产品推荐或组合建议
- 实时行情/实时市场数据接入
- 税务、费用、再平衡等复杂金融模型
- 自动预测未来回报或“最佳回报率”提示
- 用户账户系统（登录、保存方案、同步等）

---

## 9. Design Considerations (Optional)（设计注意事项）

- 桌面端左右分栏：输入在左、结果在右；移动端上下堆叠。
- 结果区信息优先级：Summary → Growth chart → Benchmark reference → Table（表格可折叠/滚动）。
- 防误解：Benchmark 模块必须包含醒目的 “historical reference only / not predictive” 文案。

---

## 10. UI Reference Code（UI 参考代码）

> 后续实现应优先参考这份代码的结构与交互，而不是自行假设。

```<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>S&amp;P 500 Investment Calculator - Mode 1 Growth</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#13ec80",
                        "background-light": "#f6f8f7",
                        "background-dark": "#102219",
                    },
                    fontFamily: {
                        "display": ["Inter"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; }
        .chart-gradient-1 { background: linear-gradient(180deg, #13ec80 0%, #0a8a4b 100%); }
        .chart-gradient-2 { background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%); }
        .chart-gradient-3 { background: linear-gradient(180deg, #94a3b8 0%, #475569 100%); }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
<!-- Top Navigation Bar -->
<header class="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50">
<div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
<div class="flex items-center gap-2">
<div class="p-1.5 bg-primary rounded-lg">
<span class="material-symbols-outlined text-background-dark block">account_balance_wallet</span>
</div>
<h1 class="text-xl font-bold tracking-tight">S&P 500 Investment Calculator</h1>
</div>
<nav class="hidden md:flex items-center gap-8">
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#">Calculators</a>
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#">Historical Data</a>
<a class="text-sm font-semibold hover:text-primary transition-colors" href="#">Pricing</a>
<button class="bg-primary text-background-dark px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                    Sign Up
                </button>
</nav>
</div>
</header>
<main class="max-w-7xl mx-auto px-6 py-10">
<!-- Page Heading -->
<div class="mb-8">
<h2 class="text-4xl font-black leading-tight tracking-tight mb-3">S&amp;P 500 Index Investment Return Calculator</h2>
<p class="text-slate-500 dark:text-slate-400 text-lg max-w-3xl">
                Calculate how an investment in the S&P 500 could have grown over time. Enter your starting amount, additional contributions, investment length, and return rate to see the estimated total value, growth chart, and year-by year breakdown - based on historical S&P 500 performance assumptions, not future predictions.
            </p>
</div>
<!-- Mode Selector -->
<div class="bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl mb-10 flex flex-wrap lg:flex-nowrap">
<label class="flex-1 cursor-pointer">
<input checked="" class="sr-only peer" name="calc_mode" type="radio"/>
<div class="py-3 px-4 text-center rounded-lg text-sm font-semibold peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:shadow-sm peer-checked:text-primary transition-all text-slate-500">
                    How much will my investment grow?
                </div>
</label>
<label class="flex-1 cursor-pointer">
<input class="sr-only peer" name="calc_mode" type="radio"/>
<div class="py-3 px-4 text-center rounded-lg text-sm font-semibold peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:shadow-sm peer-checked:text-primary transition-all text-slate-500">
                    How much do I need to start with?
                </div>
</label>
<label class="flex-1 cursor-pointer">
<input class="sr-only peer" name="calc_mode" type="radio"/>
<div class="py-3 px-4 text-center rounded-lg text-sm font-semibold peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:shadow-sm peer-checked:text-primary transition-all text-slate-500">
                    What return rate do I need?
                </div>
</label>
<label class="flex-1 cursor-pointer">
<input class="sr-only peer" name="calc_mode" type="radio"/>
<div class="py-3 px-4 text-center rounded-lg text-sm font-semibold peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:shadow-sm peer-checked:text-primary transition-all text-slate-500">
                    How long will it take?
                </div>
</label>
</div>
<!-- Main Content Grid -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
<!-- Left Column: Inputs -->
<div class="lg:col-span-4 flex flex-col gap-6">
<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
<h3 class="text-xl font-bold mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">tune</span>
                        Investment Assumptions
                    </h3>
<div class="space-y-5">
<label class="block">
<span class="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Starting Amount</span>
<div class="relative">
<span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
<input class="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary" type="number" value="10000"/>
</div>
</label>
<label class="block">
<span class="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Monthly Contribution</span>
<div class="relative">
<span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
<input class="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary" type="number" value="500"/>
</div>
</label>
<label class="block">
<span class="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Contribution Frequency</span>
<select class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary">
<option>Monthly</option>
<option>Quarterly</option>
<option>Annually</option>
</select>
</label>
<label class="block">
<span class="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Investment Length (Years)</span>
<input class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary mb-2" max="50" min="1" type="range" value="20"/>
<div class="flex justify-between text-xs text-slate-400">
<span>1 Year</span>
<span class="text-primary font-bold">20 Years</span>
<span>50 Years</span>
</div>
</label>
<label class="block">
<span class="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Expected Annual Return (%)</span>
<div class="relative">
<input class="w-full pr-10 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary" type="number" value="10.0"/>
<span class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
</div>
</label>
<button class="w-full bg-primary text-background-dark py-4 rounded-xl font-black text-lg shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all mt-4">
                            Calculate Growth
                        </button>
</div>
</div>
</div>
<!-- Right Column: Visual Results -->
<div class="lg:col-span-8 flex flex-col gap-8">
<!-- Top Summary Cards -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
<div class="bg-primary p-6 rounded-xl text-background-dark md:col-span-3">
<p class="text-sm font-bold uppercase tracking-widest opacity-80">Estimated End Balance</p>
<h3 class="text-5xl font-black mt-1">$412,845.24</h3>
</div>
<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
<p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Contributions</p>
<h4 class="text-2xl font-bold mt-1">$130,000</h4>
</div>
<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
<p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Interest</p>
<h4 class="text-2xl font-bold mt-1 text-primary">$272,845</h4>
</div>
<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl">
<p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Return Rate (CAGR)</p>
<h4 class="text-2xl font-bold mt-1">10.00%</h4>
</div>
</div>
<!-- Growth Chart Placeholder -->
<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
<div class="flex items-center justify-between mb-10">
<h3 class="text-xl font-bold">Growth Projections</h3>
<div class="flex gap-4 text-xs font-bold">
<div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-primary"></span> Interest</div>
<div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-blue-500"></span> Contributions</div>
<div class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-slate-400"></span> Starting</div>
</div>
</div>
<!-- Simplified Visual Chart Component -->
<div class="h-64 flex items-end justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
<div class="flex-1 flex flex-col gap-0.5 h-full justify-end">
<div class="w-full bg-primary/20 h-[5%] rounded-t-sm"></div>
<div class="w-full bg-blue-500/20 h-[10%]"></div>
<div class="w-full bg-slate-400/20 h-[15%]"></div>
<span class="text-[10px] text-slate-400 text-center mt-2">Yr 1</span>
</div>
<div class="flex-1 flex flex-col gap-0.5 h-full justify-end">
<div class="w-full bg-primary/40 h-[10%] rounded-t-sm"></div>
<div class="w-full bg-blue-500/40 h-[15%]"></div>
<div class="w-full bg-slate-400/40 h-[15%]"></div>
<span class="text-[10px] text-slate-400 text-center mt-2">Yr 5</span>
</div>
<div class="flex-1 flex flex-col gap-0.5 h-full justify-end">
<div class="w-full bg-primary/60 h-[25%] rounded-t-sm"></div>
<div class="w-full bg-blue-500/60 h-[25%]"></div>
<div class="w-full bg-slate-400/60 h-[15%]"></div>
<span class="text-[10px] text-slate-400 text-center mt-2">Yr 10</span>
</div>
<div class="flex-1 flex flex-col gap-0.5 h-full justify-end">
<div class="w-full bg-primary/80 h-[45%] rounded-t-sm"></div>
<div class="w-full bg-blue-500/80 h-[35%]"></div>
<div class="w-full bg-slate-400/80 h-[15%]"></div>
<span class="text-[10px] text-slate-400 text-center mt-2">Yr 15</span>
</div>
<div class="flex-1 flex flex-col gap-0.5 h-full justify-end">
<div class="w-full bg-primary h-[65%] rounded-t-sm"></div>
<div class="w-full bg-blue-500 h-[40%]"></div>
<div class="w-full bg-slate-400 h-[15%]"></div>
<span class="text-[10px] text-slate-400 text-center mt-2">Yr 20</span>
</div>
</div>
</div>
</div>
</div>
<!-- Historical Reference Section -->
<section class="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm">
<h3 class="text-xl font-bold mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-primary">history</span>
                S&amp;P 500 Historical Performance Reference
            </h3>
<p class="text-sm text-slate-500 mb-10 max-w-2xl">
                The S&amp;P 500 has historically returned an average of about 10% annually. Use this to benchmark your "Expected Annual Return" assumption.
            </p>
<div class="relative pt-10 pb-8 px-4">
<!-- Spectrum Line -->
<div class="h-4 w-full rounded-full bg-gradient-to-r from-red-500 via-primary to-emerald-600"></div>
<!-- Markers -->
<div class="absolute top-8 left-0 flex flex-col items-center">
<span class="text-[10px] font-bold text-slate-400 mb-1">-37%</span>
<div class="w-0.5 h-4 bg-slate-300"></div>
<span class="text-xs mt-1 text-slate-500">Min Year</span>
</div>
<div class="absolute top-8 left-[65%] flex flex-col items-center">
<span class="text-[10px] font-black text-slate-900 dark:text-white mb-1">10%</span>
<div class="w-1 h-4 bg-primary"></div>
<span class="text-xs mt-1 font-bold text-slate-700 dark:text-slate-200">Historical Avg</span>
</div>
<div class="absolute top-8 right-0 flex flex-col items-center">
<span class="text-[10px] font-bold text-slate-400 mb-1">+54%</span>
<div class="w-0.5 h-4 bg-slate-300"></div>
<span class="text-xs mt-1 text-slate-500">Max Year</span>
</div>
<!-- Your Input Needle -->
<div class="absolute top-4 left-[65%] -translate-x-1/2 flex flex-col items-center z-10">
<div class="bg-background-dark text-primary px-3 py-1 rounded-full text-[10px] font-black mb-1 border border-primary">
                        YOUR INPUT: 10%
                    </div>
<div class="w-0.5 h-10 bg-background-dark dark:bg-white relative">
<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-background-dark dark:bg-white"></div>
</div>
</div>
</div>
</section>
<!-- Data Table -->
<section class="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
<div class="p-6 border-b border-slate-100 dark:border-slate-800">
<h3 class="text-xl font-bold">Accumulation Schedule</h3>
</div>
<div class="overflow-x-auto">
<table class="w-full text-left">
<thead>
<tr class="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
<th class="px-6 py-4">Year</th>
<th class="px-6 py-4">Starting Balance</th>
<th class="px-6 py-4">Contributions</th>
<th class="px-6 py-4">Interest Earned</th>
<th class="px-6 py-4 text-right">Ending Balance</th>
</tr>
</thead>
<tbody class="divide-y divide-slate-100 dark:divide-slate-800">
<tr class="text-sm">
<td class="px-6 py-4 font-semibold">1</td>
<td class="px-6 py-4">$10,000.00</td>
<td class="px-6 py-4">$6,000.00</td>
<td class="px-6 py-4 text-emerald-500">+$1,300.00</td>
<td class="px-6 py-4 text-right font-bold">$17,300.00</td>
</tr>
<tr class="text-sm bg-slate-50/30 dark:bg-slate-800/20">
<td class="px-6 py-4 font-semibold">2</td>
<td class="px-6 py-4">$17,300.00</td>
<td class="px-6 py-4">$6,000.00</td>
<td class="px-6 py-4 text-emerald-500">+$2,030.00</td>
<td class="px-6 py-4 text-right font-bold">$25,330.00</td>
</tr>
<tr class="text-sm">
<td class="px-6 py-4 font-semibold">3</td>
<td class="px-6 py-4">$25,330.00</td>
<td class="px-6 py-4">$6,000.00</td>
<td class="px-6 py-4 text-emerald-500">+$2,833.00</td>
<td class="px-6 py-4 text-right font-bold">$34,163.00</td>
</tr>
<tr class="text-sm bg-slate-50/30 dark:bg-slate-800/20">
<td class="px-6 py-4 font-semibold">...</td>
<td class="px-6 py-4">...</td>
<td class="px-6 py-4">...</td>
<td class="px-6 py-4">...</td>
<td class="px-6 py-4 text-right">...</td>
</tr>
<tr class="text-sm font-bold bg-primary/10">
<td class="px-6 py-4">20</td>
<td class="px-6 py-4">$368,950.21</td>
<td class="px-6 py-4">$6,000.00</td>
<td class="px-6 py-4 text-emerald-600">+$37,895.03</td>
<td class="px-6 py-4 text-right text-lg">$412,845.24</td>
</tr>
</tbody>
</table>
</div>
</section>
</main>
<!-- Footer Disclaimer -->
<footer class="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200 dark:border-slate-800 mt-10">
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
<div class="flex items-center gap-2 mb-4 md:mb-0">
<div class="p-1 bg-slate-200 dark:bg-slate-700 rounded-md">
<span class="material-symbols-outlined text-sm block">info</span>
</div>
<span class="text-xs font-bold uppercase tracking-widest text-slate-500">Financial Disclaimer</span>
</div>
<p class="text-[10px] leading-relaxed text-slate-400 dark:text-slate-500">
                Disclaimer: The calculations and data provided by this tool are for informational and educational purposes only and do not constitute financial, investment, or legal advice. Historical performance of the S&amp;P 500 index is not indicative of future results. Investment involves risk, including the possible loss of principal. We recommend consulting with a qualified financial advisor before making any investment decisions. The "Expected Annual Return" is an assumption and actual market performance will vary significantly.
            </p>
</div>
<div class="mt-8 flex justify-between items-center text-[10px] text-slate-400 font-medium">
<span>© {year} All rights reserved.</span>
<div class="flex gap-4">
<a class="hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="hover:text-primary transition-colors" href="#">Terms of Service</a>
</div>
</div>
</footer>
</body></html>
```

---

## 11. Technical Considerations (Optional)（技术注意事项）

- 计算默认在前端本地完成；历史参考数据可作为静态配置或由接口拉取（实现方式由开发选择）。
- 求解型 Mode（M2/M3/M4）需要稳定的数值求解策略与边界处理（无解、发散、极端输入）。
- 建议将输入参数同步到 URL query（便于分享与复现），但 V1 不强制。
- 历史参考区间的数据来源与口径必须在 UI 文案中透明披露（见 Open Questions）。

---

## 12. Success Metrics（成功指标）

- SM-001：自然搜索会话（Organic sessions）月度增长
- SM-002：核心关键词 CTR
- SM-003：计算完成率（点击 `Calculate` 且输入有效的会话占比）
- SM-004：结果区曝光/互动（图表 hover、表格滚动/分页被触发的会话占比）
- SM-005：移动端输入错误率与退出率

---

## 13. Open Questions（未决问题）

1. SEO 关键词最终清单与优先级如何定？是否需要扩展内容页（如 10-year/30-year returns）来承载更多搜索意图？
2. S&P 500 历史参考区间的数据口径：
   - 时间跨度（近 30 年？自 1957？）
   - 指标（年化复合回报？是否含分红？是否通胀调整？）
   - min/avg/max 的计算方式（滚动窗口 vs 固定区间）
3. 默认货币显示：是否只做 USD？是否需要国际化货币切换？
4. 是否需要导出/分享（CSV、图片、可分享链接参数化）作为后续增长点？
