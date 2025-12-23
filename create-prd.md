# Rule: Generating a Product Requirements Document (PRD)

## Goal

To guide an AI assistant in creating a detailed Product Requirements Document (PRD) in Markdown format, based on an initial user prompt. The PRD should be clear, actionable, and suitable for a junior developer to understand and implement the feature.

## Process

1.  **Receive Initial Prompt:** The user provides a brief description or request for a new feature or functionality.
2.  **Ask Clarifying Questions:** Before writing the PRD, the AI _must_ ask only the most essential clarifying questions needed to write a clear PRD. Limit questions to 3-5 critical gaps in understanding. The goal is to understand the "what" and "why" of the feature, not necessarily the "how" (which the developer will figure out). Make sure to provide options in letter/number lists so I can respond easily with my selections.
3.  **Generate PRD:** Based on the initial prompt and the user's answers to the clarifying questions, generate a PRD using the structure outlined below.
4.  **Save PRD:** Save the generated document as `spec.md` inside the `/docs` directory.

## Clarifying Questions (Guidelines)

Ask only the most critical questions needed to write a clear PRD. Focus on areas where the initial prompt is ambiguous or missing essential context. Common areas that may need clarification:

- **Problem/Goal:** If unclear - "What problem does this feature solve for the user?"
- **Core Functionality:** If vague - "What are the key actions a user should be able to perform?"
- **Scope/Boundaries:** If broad - "Are there any specific things this feature _should not_ do?"
- **Success Criteria:** If unstated - "How will we know when this feature is successfully implemented?"

**Important:** Only ask questions when the answer isn't reasonably inferable from the initial prompt. Prioritize questions that would significantly impact the PRD's clarity.

### Formatting Requirements

- **Number all questions** (1, 2, 3, etc.)
- **List options for each question as A, B, C, D, etc.** for easy reference
- Make it simple for the user to respond with selections like "1A, 2C, 3B"

### Example Format

```
1. What is the primary goal of this feature?
   A. Improve user onboarding experience
   B. Increase user retention
   C. Reduce support burden
   D. Generate additional revenue

2. Who is the target user for this feature?
   A. New users only
   B. Existing users only
   C. All users
   D. Admin users only

3. What is the expected timeline for this feature?
   A. Urgent (1-2 weeks)
   B. High priority (3-4 weeks)
   C. Standard (1-2 months)
   D. Future consideration (3+ months)
```

## PRD Structure

The generated PRD should include the following sections（顺序可视情况微调，但推荐保持整体结构）：

1.  **Introduction/Overview：** Briefly describe the feature and the problem it solves. State the goal.
2.  **Goals：** List the specific, measurable objectives for this feature.
3.  **User Stories：** Detail the user narratives describing feature usage and benefits.
4.  **Glossary（术语表）：** 用于统一内部技术术语、规格文案、界面展示文案的对应关系，避免开发、文档和 UI 中出现命名混乱，便于在规格、技术实现和讨论时对齐概念。  
    Glossary 至少应包含以下三列：

    - **Term（英文内部术语）**：代码、规格文档、任务列表中使用的英文名；
    - **中文解释**：简要说明该术语的含义与使用场景，帮助理解规格意图；
    - **UI 文案（外部呈现）**：用户界面中实际显示的文字（按钮/标题/标签等）。

      以表格形式维护。示例：

    | Term        | 中文解释     | UI 文案（外显）            |
    | ----------- | ------------ | -------------------------- |
    | Search Mode | 搜索模式     | Search Mode                |
    | Copy Mode   | 复制模式     | Copy Mode                  |
    | Link Guard  | 链接禁用功能 | Disable links on this site |

    Glossary 使用规则：

    - **内部统一使用 Term 列中的英文术语**：包括代码、注释、技术文档（`spec.md` / `tech.md`）、任务列表（`tasks.md`）等；
    - **UI 一律使用「UI 文案」列**：不得直接把内部术语原样展示给终端用户，除非 Term 与 UI 文案刻意保持一致；
    - **新增功能时必须更新 Glossary**：一旦出现新概念（例如新模式、新开关、新页面），在扩展规格之前必须先在 Glossary 中新增对应条目；
    - **AI 在生成 spec/style/tasks 时必须读取并遵循 Glossary**：生成 PRD、样式文档、任务列表时，应优先复用 Glossary 中已有术语与 UI 文案，确保前后一致；
    - **术语不清晰或冲突时必须先确认**：如 AI 发现现有术语含义不清、互相重叠或与 UI 文案冲突，必须先向用户提问澄清，再在 Glossary 中新增或调整条目，避免自行造词。

5.  **Interaction Flows（交互路径）：** 用用户视角按步骤描述关键使用路径，只描述「用户做什么 → 系统在界面层面的可见响应」，不写实现细节和底层技术，例如：
    - 从打开页面 / 扩展入口 → 触发功能（如打开 Popup、切换模式、选中文本出现气泡）→ 完成目标操作；
    - 常见设置流程（如进入 Options → 管理搜索引擎 / 白名单 → 保存并生效）。  
      若与功能描述有重叠，应在本节保留高层路径，在 Functional Requirements 中写清具体规则与边界。
6.  **Functional Requirements：** 列出系统必须具备的具体功能与行为规则，包括：状态定义、输入输出、边界条件、错误处理等。使用清晰、可实现的语句（例如："The system must allow users to upload a profile picture."），并对重要需求进行编号。所有实现相关细节和业务规则应归入本节，而不是放在交互路径中。
7.  **Non-Goals (Out of Scope)：** Clearly state what this feature will _not_ include to manage scope.
8.  **Design Considerations (Optional)：** Link to mockups, describe UI/UX requirements, or mention relevant components/styles if applicable.
9.  **Technical Considerations (Optional)：** Mention any known technical constraints, dependencies, or suggestions (e.g., "Should integrate with the existing Auth module").
10. **Success Metrics：** How will the success of this feature be measured? (e.g., "Increase user engagement by 10%", "Reduce support tickets related to X").
11. **Open Questions：** List any remaining questions or areas needing further clarification.

## Target Audience

Assume the primary reader of the PRD is a **junior developer**. Therefore, requirements should be explicit, unambiguous, and avoid jargon where possible. Provide enough detail for them to understand the feature's purpose and core logic.

## Output

- **Format:** Markdown (`.md`)
- **Location:** `/docs/`
- **Filename:** `spec.md`
- **Doc Role Note:** When generating the PRD `spec.md`, you **must** add the following note near the top of the document (typically right after the main title):

  `文档角色说明：本文件定义「做什么、怎么运作」——功能逻辑、交互流程与业务规则；具体颜色/字体/间距/组件样式等视觉细节统一收敛在 docs/style.md。`

- **Local Preview Note:** At the top of `spec.md` (close to the doc role note), you **must** include a short note explaining how to run the project locally, prioritizing `pnpm dev` as the recommended command (for example: “在本地查看效果：优先使用 \`pnpm dev\` 启动开发服务器，如未安装 pnpm，可按照项目 README 中的说明使用 npm/yarn。”).

- **Completion Notification Note (optional):** `spec.md` 可以包含一句简短提示，指引开发者在全部任务完成后，如需本地声音提醒，可以参见 `rules.md` 中的「本地完工提示」命令，而不必在 `spec.md` 中重复完整命令。

- **Language Usage Note:** `spec.md` 顶部应简要说明本项目的语言使用规范（例如：内部说明文档使用中文，代码与对外界面使用英文），并可以引用 `rules.md` 中的《语言使用规范》作为详细规则来源，而不需要在 `spec.md` 中完整复制所有条目。

## Final instructions

1. Do NOT start implementing the PRD
2. Make sure to ask the user clarifying questions
3. Take the user's answers to the clarifying questions and improve the PRD
