# Rule: Generating a Task List from User Requirements

## Goal

To guide an AI assistant in creating a detailed, step-by-step task list in Markdown format based on user requirements, feature requests, or existing documentation. The task list should guide a developer through implementation.

## Output

- **Format:** Markdown (`.md`)
- **Location:** `/docs/`
- **Filename:** `tasks.md`
- **Doc Role Note:** When generating `tasks.md`, you **must** add a short “文档角色说明” near the top of the document（通常放在主标题之后），用 1–3 句话说明：
  - 本文件用于跟踪当前项目的开发任务与进度，是执行层的操作清单；
  - 行为逻辑与需求细节以 `docs/spec.md` 为准，视觉样式与交互细节以 `docs/style.md` 为准；
  - 当任务与规格文档发生冲突时，需要先确认并更新规格文档，再调整任务列表。

## Process

1.  **Receive Requirements:** The user provides a feature request, task description, or points to existing documentation
2.  **Analyze Requirements:** The AI analyzes the functional requirements, user needs, and implementation scope from the provided information
3.  **Phase 1: Generate Parent Tasks:** Based on the requirements analysis, create the file and generate the main, high-level tasks required to implement the feature. **IMPORTANT: Always include task 0.0 "Create feature branch" as the first task, unless the user specifically requests not to create a branch.** Use your judgement on how many additional high-level tasks to use. It's likely to be about 5. Present these tasks to the user in the specified format (without sub-tasks yet). Inform the user: "I have generated the high-level tasks based on your requirements. Ready to generate the sub-tasks? Respond with 'Go' to proceed."
4.  **Wait for Confirmation:** Pause and wait for the user to respond with "Go".
5.  **Phase 2: Generate Sub-Tasks:** Once the user confirms, break down each parent task into smaller, actionable sub-tasks necessary to complete the parent task. Ensure sub-tasks logically follow from the parent task and cover the implementation details implied by the requirements.
6.  **Identify Relevant Files:** Based on the tasks and requirements, identify potential files that will need to be created or modified. List these under the `Relevant Files` section, including corresponding test files if applicable.
7.  **Generate Final Output:** Combine the parent tasks, sub-tasks, relevant files, and notes into the final Markdown structure.
8.  **Save Task List:** Save the generated document in the `/docs/` directory with the filename `tasks.md`.

## Output Format

The generated task list _must_ follow this structure:

```markdown
## Relevant Files

- `path/to/potential/file1.ts` - Brief description of why this file is relevant (e.g., Contains the main component for this feature).
- `path/to/file1.test.ts` - Unit tests for `file1.ts`.
- `path/to/another/file.tsx` - Brief description (e.g., API route handler for data submission).
- `path/to/another/file.test.tsx` - Unit tests for `another/file.tsx`.
- `lib/utils/helpers.ts` - Brief description (e.g., Utility functions needed for calculations).
- `lib/utils/helpers.test.ts` - Unit tests for `helpers.ts`.

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- 如需在本地完成全部任务后收到声音提示，可以在合适的位置（例如 `Notes` 或执行说明中）加上一句「如需本地完工提示，参见 `rules.md` 中的通知命令」，引用 `rules.md` 中约定的本地完工提示命令，而不必在 `tasks.md` 中重复完整命令。

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:

- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch for this feature (e.g., `git checkout -b feature/[feature-name]`)
- [ ] 1.0 Parent Task Title
  - [ ] 1.1 [Sub-task description 1.1]
  - [ ] 1.2 [Sub-task description 1.2]
- [ ] 2.0 Parent Task Title
  - [ ] 2.1 [Sub-task description 2.1]
- [ ] 3.0 Parent Task Title (may not require sub-tasks if purely structural or configuration)
```

## Interaction Model

The process explicitly requires a pause after generating parent tasks to get user confirmation ("Go") before proceeding to generate the detailed sub-tasks. This ensures the high-level plan aligns with user expectations before diving into details.

## Target Audience

Assume the primary reader of the task list is a **junior developer** who will implement the feature.

---

## 开发规范遵循

**文档规范**

- 需求文档：实现功能时必须严格按照 `docs/spec.md` 中的具体要求执行。
- 设计规范：界面样式与交互必须严格遵循 `docs/style.md` 中的设计规范。

**任务管理**

- 每完成一个功能或子任务，必须立即更新 `tasks.md` 中对应条目的状态：
  - 完成标记为 `- [x]`（可选附加 ✅ 表示已完成且验证通过）。
  - 如出现阻塞或暂时无法继续，可使用备注或 ⚠️ 标记说明原因。
- 功能删减或范围变更必须提前告知并获得确认，不得擅自裁剪需求。
- 每个阶段（或主要父任务）完成后应暂停，等待确认通过再继续下一阶段。

**沟通机制**

- 遇到文档歧义或不明确之处，必须即时确认，不得自行臆断。
- UI 实现若与原型设计或设计规范有任何不一致（包括文字、布局、颜色、间距等），必须先确认后再实现。
- 一旦发现需求之间存在冲突，应立即暂停相关实现并提出疑问，等待决策后再继续。

---

## Task List Management

### Task Implementation

- **One sub-task at a time:** Do **NOT** start the next sub-task until you ask the user for permission and they say “yes” or “y”。

**Completion protocol:**

1. 当完成某个 **sub-task** 时，立即将该条目标记为完成：把 `- [ ]` 改为 `- [x]`。
2. 当某个父任务下的所有子任务均为 `[x]` 时，同时将该父任务也标记为 `- [x]`。
3. 完成每一个子任务后，应暂停并等待用户确认，再开始下一个子任务。

### Task List Maintenance

**Update the task list as you work:**

- 按上述协议及时更新任务和子任务的完成状态（`[ ]` → `[x]`）。
- 在实施过程中，如发现新的必要任务，应在 `tasks.md` 中补充相应条目。

**Maintain the `Relevant Files` section:**

- 列出每一个被创建或修改的文件。
- 为每个文件提供一句简要说明其用途或与本任务的关系。

---

## AI Instructions

When working with task lists, the AI must:

1. 在完成任何重要工作后，及时更新对应的任务列表文件（`tasks.md`）。
2. 严格遵守完成协议（Completion protocol）：
   - 标记每一个已完成的 **sub-task** 为 `[x]`。
   - 当某父任务下所有子任务均为 `[x]` 时，将该父任务也标记为 `[x]`。
3. 在执行过程中，发现新的合理任务时，应将其添加到任务列表中，并保持 `Relevant Files` 部分准确、最新。
4. 在开始工作前，先检查当前「下一个要做的子任务」是哪一条，并与用户确认是否继续。
5. 每完成一个子任务后：
   - 先更新 `tasks.md` 中的状态；
   - 然后暂停，等待用户的确认或下一步指示，避免连续执行多个子任务而未同步状态。
