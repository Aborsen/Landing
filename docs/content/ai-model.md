---
title: AI Model
description: Insightis is powered by Insightis AI, our own combined model layer that blends the strengths of OpenAI and Anthropic. Built for analytics first, with more models — and the option to pick your own — coming soon.
breadcrumb: Docs / Reference / AI Model
---

## What Insightis AI is

Insightis AI is the model layer that turns your natural-language questions into trustworthy analytics answers. Rather than depending on a single provider, Insightis AI combines models from **OpenAI** and **Anthropic**, routes each step of a query to whichever model is best suited for it, and stitches the results back together inside a single answer. The result is faster responses, fewer hallucinated metrics, and more consistent reasoning across question types.

## Why we combine providers

Different model families are good at different things. OpenAI's frontier models excel at structured reasoning and code-shaped tasks like translating a question into a query plan. Anthropic's frontier models excel at long-context reasoning and producing the clear, well-grounded written explanations that sit alongside each answer in AI Chat. By using each where it is strongest — instead of forcing one model to do everything — Insightis AI achieves higher accuracy than any single-provider stack we benchmarked against.

## How a question is routed

When you ask a question, Insightis AI splits the work into stages: understanding the intent, resolving entities against the Semantic Layer, planning the query, executing it, and explaining the result. Each stage runs on the model that performs best for that stage. You see one continuous answer in AI Chat; under the hood, multiple models cooperated to produce it. The Explainability panel on every answer shows which steps were taken, so the work is fully auditable.

## Privacy and your data

The models powering Insightis AI never see raw rows from your connected sources unless you explicitly ask for them. Question text and metric definitions may be sent to model providers under enterprise data-processing agreements that prohibit training on customer content. No data is retained by the providers beyond the minimum required to return a response. Read the **Data Storage** page for the full data-handling details.

## What is coming next

Insightis AI is evolving quickly:

- **More models** — additional providers, including open-source models for customers who require self-hosted inference, are being added to the routing layer.
- **Model selection** — you will be able to choose which model powers your conversations directly from AI Chat. Pick the speed-optimized model for quick exploration, or the deep-reasoning model for hard analytical questions.
- **Bring-your-own keys** — Enterprise workspaces will be able to plug in their own OpenAI, Anthropic, or other provider credentials so inference costs roll up to their existing AI billing.

If a specific model or capability matters to your team, request it on the public Roadmap page.
