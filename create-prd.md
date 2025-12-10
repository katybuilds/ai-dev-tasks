# Rule: Generating a Product Requirements Document (PRD)

## Goal

To guide an AI assistant in creating a detailed Product Requirements Document (PRD) in Markdown format, based on an initial user prompt. The PRD should be clear, actionable, and suitable for a junior developer to understand and implement the feature.

## Process

1.  **Receive Initial Prompt:** The user provides a brief description or request for a new feature or functionality.
2.  **Ask Clarifying Questions:** Before writing the PRD, the AI _must_ ask only the most essential clarifying questions needed to write a clear PRD. Limit questions to 3-5 critical gaps in understanding. The goal is to understand the "what" and "why" of the feature, not necessarily the "how" (which the developer will figure out). Make sure to provide options in letter/number lists so I can respond easily with my selections.
3.  **Generate PRD:** Based on the initial prompt and the user's answers to the clarifying questions, generate a PRD using the structure outlined below.
4.  **Save PRD:** Save the generated document as `prd-[feature-name].md` inside the `/tasks` directory.

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

The generated PRD should include the following sections:

1.  **Introduction/Overview:** Briefly describe the feature and the problem it solves. State the goal.
2.  **Goals:** List the specific, measurable objectives for this feature.
3.  **User Stories:** Detail the user narratives describing feature usage and benefits.
4.  **Functional Requirements:** List the specific functionalities the feature must have. Use clear, concise language (e.g., "The system must allow users to upload a profile picture."). Number these requirements.
5.  **Non-Goals (Out of Scope):** Clearly state what this feature will _not_ include to manage scope.
6.  **Design Considerations (Optional):** Link to mockups, describe UI/UX requirements, or mention relevant components/styles if applicable.
7.  **Technical Considerations (Optional):** Mention any known technical constraints, dependencies, or suggestions (e.g., "Should integrate with the existing Auth module").
8.  **Success Metrics:** How will the success of this feature be measured? (e.g., "Increase user engagement by 10%", "Reduce support tickets related to X").
9.  **Open Questions:** List any remaining questions or areas needing further clarification.

## Target Audience

Assume the primary reader of the PRD is a **junior developer**. Therefore, requirements should be explicit, unambiguous, and avoid jargon where possible. Provide enough detail for them to understand the feature's purpose and core logic.

## Output

- **Format:** Markdown (`.md`)
- **Location:** `/docs/`
- **Filename:** `spec.md`
- **Doc Role Note:** When generating the PRD `spec.md`, you **must** add the following note near the top of the document (typically right after the main title):

  `文档角色说明：本文件定义「做什么、怎么运作」——功能逻辑、交互流程与业务规则；具体颜色/字体/间距/组件样式等视觉细节统一收敛在 docs/style.md。`

- **Local Preview Note:** At the top of `spec.md` (close to the doc role note), you **must** include a short note explaining how to run the project locally, prioritizing `pnpm dev` as the recommended command (for example: “在本地查看效果：优先使用 \`pnpm dev\` 启动开发服务器，如未安装 pnpm，可按照项目 README 中的说明使用 npm/yarn。”).

- **Completion Notification Command:** `spec.md` **must** include a short section that tells the developer to run the following command after completing the tasks, so they get an audible notification:

  ```bash
  powershell -c "(New-Object Media.SoundPlayer 'C:\\Windows\\Media\\tada.wav').PlaySync()"
  ```

- **Language Usage Guidelines:** `spec.md` **must** contain a section titled `### 语言使用规范` with the following content (you may place it near the end of the document, for example after “Open Questions” or in a separate “Conventions” section):

  #### 中文使用范围（内部沟通）

  - spec.md, style.md, task.md
  - 团队内部沟通记录
  - 项目管理文档
  - 内部会议纪要

  #### 英文使用范围（所有其他内容）

  **代码层面：**

  - 所有代码注释用英文
  - 变量名、函数名用英文
  - 开发文档用英文
  - 测试数据用英文
  - API 文档用英文

  **网站内容：**

  - 所有用户界面文字英文
  - 按钮、标题、说明文字英文
  - 错误提示英文
  - 帮助文档英文
  - 用户注册/登录页面英文

  **部署相关：**

  - 服务器配置英文
  - 域名英文
  - 数据库设计英文
  - 日志记录英文

## Final instructions

1. Do NOT start implementing the PRD
2. Make sure to ask the user clarifying questions
3. Take the user's answers to the clarifying questions and improve the PRD
