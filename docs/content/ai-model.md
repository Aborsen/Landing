---
title: AI Models
description: Insightis offers two AI models — Insightis Light and Insightis Ultra. Both combine the strengths of OpenAI and Anthropic models and match the reasoning effort to the complexity of your question, so everyday asks stay fast and token-efficient while your resources are kept for the analyses that need real depth.
breadcrumb: Docs / Reference / AI Models
---

## Two models, one job

Insightis ships with two AI models, and every chat runs on one of them:

- **Insightis Light** — the fast, efficient model for everyday questions.
- **Insightis Ultra** — the deep-reasoning model for complex, multi-step analyses.

Neither one is a single third-party model with a new name. Both are Insightis model configurations that combine **OpenAI** and **Anthropic** models under the hood, routing each step of your question to whichever model handles that step best. What separates Light from Ultra is not the provider — it is how much reasoning effort is applied to your case.

## Effort that matches the case

If you have used other AI systems, you may know the idea of "reasoning effort" — letting the system think briefly on easy tasks and think hard on difficult ones. Insightis models work on the same principle, applied to analytics.

Not every question deserves the same amount of model work. "What was MRR last month?" resolves against one metric in your Semantic Layer and needs almost no deliberation. "Why did enterprise churn spike, and which segments drove it?" requires planning, several queries, comparison across sources, and a careful written explanation. Treating both questions the same wastes resources on the first and shortchanges the second.

By matching the effort to the complexity of the case, Insightis keeps your token usage accurate: simple questions consume a small number of tokens, and the heavier spending is reserved for the cases where the extra reasoning genuinely changes the quality of the answer.

## Insightis Light

Light is tuned for speed and efficiency. It is the right choice for the questions that make up most of a working day:

- Asking about metrics already defined in your Semantic Layer.
- Quick lookups, filters, and breakdowns — "revenue by region, last 30 days."
- Follow-ups that refine an existing answer — "now split it by plan tier."

Because Light spends less reasoning per question, it answers faster and consumes fewer tokens. For routine work, that difference compounds — a team asking dozens of everyday questions on Light stretches its monthly allowance much further than it would running everything at full depth.

## Insightis Ultra

Ultra applies the full reasoning depth of the combined OpenAI and Anthropic stack. Reach for it when the question is genuinely hard:

- Multi-step analyses that chain several queries together.
- Questions that join data across multiple connected sources.
- Open-ended or ambiguous asks — "what's driving the drop in activation?"
- Root-cause exploration where the model needs to test several hypotheses before answering.

Ultra takes longer per answer and consumes more tokens per question — that is the cost of deeper planning, broader context, and more careful verification. In exchange, it produces the kind of thorough, well-grounded analysis that would otherwise take an analyst a working session to assemble.

## Why we combine providers

Different model families are good at different things. OpenAI's frontier models excel at structured reasoning and code-shaped tasks like translating a question into a query plan. Anthropic's frontier models excel at long-context reasoning and producing the clear, well-grounded written explanations that sit alongside each answer in AI Chat. Both Insightis models use each provider where it is strongest — instead of forcing one model to do everything — which is how they achieve more consistent accuracy than any single-provider setup we benchmarked against.

## Models and your tokens

Tokens are the unit of AI usage in Insightis, and the model you run on is the biggest factor in how fast they are consumed. The practical guidance is simple:

- Default to **Light** for day-to-day questions — it keeps token usage lean and predictable.
- Switch to **Ultra** when the case is complex enough to justify the spend — deep dives, cross-source investigations, analyses you will put in front of leadership.

This split is what keeps usage fair to the work being done: you are never paying deep-reasoning prices for shallow questions, and you always have resources left for the cases that matter. See **Plans and tokens** for how subscription tokens and one-time packs work.

## Grounded either way

Whichever model you choose, the answer is grounded the same way. Both Light and Ultra resolve your question against the Semantic Layer, answer from your certified metric definitions rather than improvising, and attach the underlying query to every answer so the work stays auditable. Model choice changes the depth of reasoning — never the governance around it.

## Privacy and your data

The models powering Insightis never see raw rows from your connected sources unless you explicitly ask for them. Question text and metric definitions may be sent to model providers under enterprise data-processing agreements that prohibit training on customer content. No data is retained by the providers beyond the minimum required to return a response. Read the **Data Storage** page for the full data-handling details.

## What is coming next

The model lineup is evolving:

- **More models** — additional providers, including open-source models for customers who require self-hosted inference, are being added to the routing layer.
- **Bring-your-own keys** — Enterprise workspaces will be able to plug in their own OpenAI, Anthropic, or other provider credentials so inference costs roll up to their existing AI billing.

If a specific model or capability matters to your team, request it on the public Roadmap page.
