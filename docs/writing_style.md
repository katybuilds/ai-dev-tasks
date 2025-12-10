# ✍️ Writing Guidelines – MelMomLife

This document defines the **writing style, tone, and perspective** for all content in the **MelMomLife** project.

---

## 🧭 1. Perspective & Voice

Write in **first-person**. Use “I/my” for individual experiences, and “we/our” when referring to shared family experiences.

| Perspective | When to Use                    | Example                                                   |
| ----------- | ------------------------------ | --------------------------------------------------------- |
| I / my      | Personal thoughts or opinions  | I found Melbourne’s weather unpredictable.                |
| We / our    | Shared family experience       | We love spending weekends at local parks.                 |
| You / your  | Addressing the reader directly | If you’re new to Melbourne, you’ll love the coffee scene. |

> Keep it conversational — like talking to a friend. Avoid corporate or “team” voice.

---

## 💬 2. Tone

- Natural, friendly, honest.
- Short sentences (under 20 words).
- Prefer **active voice** over passive.
- Give conclusions first, then details.
- Add emotional realism — use small, real moments.
- Do not use em dashes (—) or single hyphens (-) to join clauses. Use commas, colons, or parentheses when applicable.
- Use quotation marks for "Direct Speech", "Quoting text","Scare Quotes".

**Examples**

✅ “We moved from China to Melbourne last year — it felt exciting and confusing at the same time.”  
❌ “The relocation process was conducted by our family in 2024.”

---

## 🧠 3. Responsibility & Boundaries

Use verbs that show **action and ownership**.

| Do                                                      | Don’t                                            |
| ------------------------------------------------------- | ------------------------------------------------ |
| I recommend checking school zones before renting.       | We suggest users might consider...               |
| We tried several suburbs before choosing Glen Waverley. | It was discovered that some suburbs were better. |
| I don’t cover visa topics — only family life.           | Visa topics will not be covered by the team.     |

---

## 📣 4. CTAs (Calls to Action)

Use clear, human, action-oriented phrasing.

Examples:

- “If you’re planning to move soon, start by checking school zones.”
- “You can follow my posts for more family-friendly suburbs.”
- “Want to know more about daily life costs? Read the next article.”

---

## ⚖️ 5. Authenticity & Transparency

- Never exaggerate — share what you actually experienced.
- When uncertain, add qualifiers:
  - “For our family…”
  - “In most cases…”
  - “From what I’ve seen…”
- Be transparent about limits:
  - “I haven’t tried every area yet.”
  - “Prices may have changed since we moved.”

---

## 🔧 6. Quick Replacement Rules (for editing)

When editing drafts or AI outputs, apply these replacements:

| From                                         | To  |
| -------------------------------------------- | --- |
| We → I (unless family context)               |
| Our → My (unless family context)             |
| Let’s → I’ll / You can                       |
| We use → I use / We use (if family activity) |
| We recommend → I recommend / We recommend    |
| 我们 → 我 / 我们家                           |
| 我们的 → 我的 / 我们家的                     |
| — (em dash) or - (hyphen) → , / : / ()       |

---

## 📄 7. Template Sentences

- We moved to Melbourne because **X**, and it changed how we **Y**.
- I use **Z** to make daily life easier.
- If you’re facing **A**, try doing **B** first.
- For our family, **C** is the best part of living here.
- I don’t do **D** for now — here’s what I use instead.

---

## 🗂 8. File Naming Convention

| Type          | Folder           | Example Filename            |
| ------------- | ---------------- | --------------------------- |
| Blog Post     | `content/posts/` | `life-in-melbourne.md`      |
| Writing Guide | `docs/`          | `writing-guidelines.md`     |
| Draft Notes   | `docs/drafts/`   | `moving-checklist-draft.md` |

---

## 🪶 9. Example Metadata (Front Matter)

```yaml
---
title: "Moving to Melbourne: What Surprised Our Family"
date: 2025-10-15
description: "We moved from China to Melbourne. Here’s what family life really feels like."
categories: ["Life in Melbourne", "Moving to Australia"]
tags: ["Melbourne", "Family Life", "Relocation", "Newcomers"]
draft: false
---
```

## 💡 10. AI Writing Prompt (for reuse)

Prompt for AI tools:

```

Write in first-person perspective. Use “I/my” for individual experiences and “we/our” for shared family experiences.
Address the reader as “you.” Keep tone conversational, concise, and honest. Use active voice and short sentences.
Include real feelings or small family details when possible.
Avoid corporate tone. Use qualifiers (“for us”, “in my experience”) to stay authentic.
```

## 🏷 11. Canonical Tags (Use These First)

Use existing tags to keep taxonomy clean. Add new ones only when needed and then add them to this list.

- 482 Visa
- Documents
- Family Life
- Melbourne
- Moving to Australia
- Newcomers
- Parenting
- Translation
- Safety
- Crime
- Suburbs
- Driving in Melbourne
- Learning to Drive

Conventions

- Use Title Case (e.g., “Family Life”, not “family life”).
- Keep tags concise (1–3 words) and reusable across posts.
- When adding a new tag, update this section and reuse it exactly in future posts.

### Categories (Standard)

Use these categories to keep sections consistent across the site:

- "Life in Melbourne" — daily life, family routines, costs, reflections.
- "Moving to Australia" — planning, settling in, renting basics, documents.
- "Melbourne Suburbs" — suburb profiles/guides (e.g., Blackburn, South Morang). Use this for suburb‑focused articles.

Conventions

- Use one primary category. Add a second only when it clearly improves navigation.
- Use Title Case for category names.

## 🔗 12. Internal Links (Linking to Other Articles)

Use internal links to help readers discover relevant posts and to keep navigation simple.

- Link format: use site‑root absolute paths with the canonical slug, not full domain.
  - Example: `[Top 10 Safest Councils](/top-10-safest-councils-in-melbourne-but-don-t-forget-to-check-the-suburbs/)`
  - Include a trailing slash.
- Where to place:
  - Contextual links inside paragraphs where it naturally helps.
  - Optional “Related” block at the end with 1–3 links.
- Anchor text: descriptive and specific. Avoid “click here” / “read more”.
- Quantity: 2–4 internal links per post is enough; avoid keyword stuffing.
- Cross‑linking: when two posts strongly relate, link both ways where useful.
- Tags pages: it’s OK to link to tag hubs when relevant, e.g. `[Parenting](/tags/parenting/)`.

Optional (advanced): Hugo shortcodes `ref`/`relref` can generate links from file paths and will fail the build if the target is missing. If you prefer this, use:

```markdown
[How we chose safe suburbs]({{< relref "posts/Top 10 Councils in Melbourne with the Highest Crime Rates.md" >}})
```

Given we standardized permalinks to `/:slug/`, using the slug path (first option) is usually the simplest and most readable.

### Related Block Template (Paste at End of Post)

Add an optional related links block at the bottom of the article. Use 1–3 highly relevant links.

```markdown
---

**Related Articles**

- [How We Use the RedSuburbs Crime Map to Find a Safe Place for Our Family](/how-we-use-the-redsuburbs-crime-map-to-find-a-safe-place-for-our-family/)
- [Top 10 Safest Councils in Melbourne: But Don’t Forget to Check the Suburbs in 2024](/top-10-safest-councils-in-melbourne-but-don-t-forget-to-check-the-suburbs/)
- [Top 10 Councils in Melbourne with the Highest Crime Rates in 2024](/top-10-councils-in-melbourne-with-the-highest-crime-rates/)
```

Notes

- Use the canonical slug path with trailing slash.
- Keep it short (max 3 links) and truly relevant to the post.

## 🔎 13. SEO & Images

- Always add descriptive alt text to images. Replace generic text like “Section image” with meaningful descriptions (e.g., “Chart: safest Melbourne councils in 2024”).
- Keep alt text concise (6–12 words), reflect what’s visible and relevant to the article.
- Use canonical slugs for internal links and include a trailing slash.
- Include a short `description` in front matter for each post; summarise the article in one sentence.
