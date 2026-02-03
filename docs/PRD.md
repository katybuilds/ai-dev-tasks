PRD - Investment Growth Calculator *(with S&P 500 Historical Reference)*

------

## 1. 产品概述

**产品名称**
S&P 500 Index Investment Return Calculator

页面标题/H1

**S&P 500 Investment Calculator**

副标题

“Estimate how your money could grow with assumed returns. Includes historical S&P 500 reference ranges.”

**产品类型**
 未来投资增长计算器（基于用户假设参数），附带 S&P 500 历史回报参考

**产品目标**
 帮助用户根据不同目标场景，计算未来投资增长结果，并通过 S&P 500 历史数据为假设参数提供参考背景。

**产品原则**

- 不预测未来市场
- 不提供投资建议
- 所有计算基于用户输入假设
- 历史数据仅用于参考说明

------

## 2. 目标用户

- 希望规划长期投资的普通用户
- 希望快速估算不同投资假设结果的用户
- 需要清晰图表与年度明细的用户

------

## 3. 功能范围（Scope）

### 3.1 计算模式（Goal-based Modes）

用户需先选择**计算目标**，系统根据目标动态显示相关输入项。

#### 计算目标模式（单选）

| 模式名称（用户可见）              | 计算目标               |
| --------------------------------- | ---------------------- |
| How much will my investment grow? | 计算 End Amount        |
| How much do I need to start with? | 计算 Starting Amount   |
| What return rate do I need?       | 计算 Return Rate       |
| How long will it take?            | 计算 Investment Length |

------

## 4. 输入项设计（Inputs）

### 4.1 通用输入字段（按模式显示）

| 字段名（用户可见）        | 类型       | 说明                      |
| ------------------------- | ---------- | ------------------------- |
| Starting Amount           | Number     | 初始投资金额              |
| Target Amount             | Number     | 目标金额                  |
| Regular Contribution      | Number     | 定期追加金额              |
| Contribution Frequency    | Select     | Monthly / Yearly          |
| Contribution Timing       | Radio      | Beginning / End of period |
| Expected Annual Return    | Percentage | 用户假设年化回报率        |
| Investment Length (Years) | Number     | 投资年数                  |
| Compounding Frequency     | Select     | Annually / Monthly        |

------

### 4.2 各模式对应输入显示规则

#### 模式 1：How much will my investment grow?

- 显示：Starting Amount, Regular Contribution, Frequency, Investment Length, Expected Return
- 结果：End Amount

#### 模式 2：How much do I need to start with?

- 显示：Target Amount, Regular Contribution, Frequency, Investment Length, Expected Return
- 结果：Required Starting Amount

#### 模式 3：What return rate do I need?

- 显示：Starting Amount, Regular Contribution, Frequency, Investment Length, Target Amount
- 结果：Required Return Rate

#### 模式 4：How long will it take?

- 显示：Starting Amount, Regular Contribution, Frequency, Expected Return, Target Amount
- 结果：Required Investment Length

------

## 5. 输出结果（Results）

### 5.1 数值结果（Summary）

- End Balance / Required Value（根据模式）
- Total Contributions
- Total Interest Earned
- Annualized Return (CAGR)

------

## 6. 图表（Charts）

### 6.1 投资增长图（核心图表）

**类型**

- Line Chart 或 Stacked Bar Chart

**内容**

- X 轴：Year
- Y 轴：Portfolio Value
- 数据分层：
  - Starting Amount
  - Total Contributions
  - Investment Growth (Interest)

------

### 6.2 历史回报参考图（Reference Chart）

**类型**

- Bar / Range Chart

**内容**

- S&P 500 长期历史回报区间（参考）：
  - 最低长期回报
  - 平均长期回报
  - 最高长期回报
- 用户当前假设回报率（标记线）

------

## 7. 表格（Tables）

### 7.1 Accumulation Schedule（年度明细）

**默认展示 Annual Schedule**

| Year | Starting Balance | Contributions | Interest | Ending Balance |
| ---- | ---------------- | ------------- | -------- | -------------- |
|      |                  |               |          |                |

（Monthly Schedule 不作为 V1 必须功能）

------

### 7.2 Summary Breakdown

| Item                  | Amount |
| --------------------- | ------ |
| Starting Amount       |        |
| Total Contributions   |        |
| Total Interest Earned |        |
| End Balance           |        |

------

## 8. 历史数据参考模块

**用途**

- 为用户输入的假设回报率提供历史背景
- 不参与用户未来金额计算

**展示内容**

- S&P 500 长期平均年化回报
- 通胀调整后长期平均回报
- 历史最佳 / 最差长期区间（10 年 / 30 年）

------

## 9. 数据与计算规则

### 9.1 计算逻辑

- 使用标准复利模型
- 所有增长计算基于用户输入参数
- 不包含税费、交易成本、费用

### 9.2 历史数据角色

- 仅用于参考展示
- 不影响用户计算结果

------

## 10. 页面结构（V1）

```
/                          ← 主计算器
/historical-average-return
/10-year-historical-returns
/30-year-historical-returns
/inflation-adjusted-returns
/returns-by-year
```

------

## 11. 非功能性要求

- 页面计算响应时间 < 1 秒
- 所有输入字段需校验合法范围
- 金额统一货币格式显示
- 支持桌面与移动端

------

## 12. 合规与免责声明（必须显示）

> This calculator provides hypothetical investment growth scenarios based on user-defined assumptions.
>  Historical S&P 500 data is shown for reference only and does not predict future performance.
>  This tool is for educational purposes only and does not constitute investment advice.

------

## 13. 明确不在范围内（Out of Scope）

- 投资产品推荐
- 实时行情 / 实时市场数据
- 税务或费用计算
- 自动预测未来回报
- 用户账户系统