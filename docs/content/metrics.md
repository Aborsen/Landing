---
title: Metrics
description: Metrics are the governed business definitions that power every answer in Insightis — the Semantic Layer the AI runs on. Define a metric once and every chart and every AI Chat answer uses the same number. Insightis gives you built-in metrics out of the box and lets you add your own custom metrics on top.
breadcrumb: Docs / Semantic Layer / Metrics
---

## What metrics are

A metric is a single, governed definition of a business measure — Revenue, MRR, churn, CAC, conversion rate. Together, your metrics form the Semantic Layer: the trust layer between your raw data and the AI. Without it, an AI answer is a guess. With it, every answer is grounded in a definition your team can see and rely on, so the same question always returns the same number — whether it is asked in Sales, Marketing, or Finance.

Insightis metrics come in two kinds: **built-in metrics** that appear automatically when you connect a data source, and **custom metrics** that you create for the measures unique to your business. Once a metric exists, it behaves the same way everywhere — there is no difference in how built-in and custom metrics are used.

## Built-in metrics

Every data source ships with a set of predefined metrics for that source. The moment you connect the source, those metrics become available automatically — you do not have to define or configure anything to start asking about them.

- Connect Stripe and you immediately get standard billing metrics like MRR, active subscriptions, and churn.
- Connect Google Ads and you get spend, clicks, CPC, and ROAS.
- Connect your CRM and you get pipeline, win rate, and deal count.

Because these definitions are fixed, **every request that touches a built-in metric is calculated the same way in every chat**, for every person on the team. Nobody has to agree on how "MRR" is computed — the source's built-in definition already does, and it is applied consistently everywhere.

## Custom metrics

Built-in metrics cover the common measures; custom metrics cover the ones that are specific to how *your* company works. When you have a KPI that does not exist out of the box — "gross margin minus refunds", "qualified leads by channel", "activation within seven days" — you create it once as a custom metric, without engineering help.

You can build a custom metric for any use case or scenario your team needs to track. **Once a custom metric is added, it works exactly like a built-in one**: it is available in every chat, calculated the same way each time, and grounded so the AI answers from your definition instead of improvising. Custom and built-in metrics sit side by side in the same catalog and are indistinguishable in use.

## How the AI proposes a metric

You do not have to open an editor to create a metric. While you chat, if you ask about something that is not defined yet, the AI can propose a definition based on your data. It shows you the source, the formula, and the filters in a **Confirmation Card**, and you approve it with one click. From that moment on, the metric is part of your catalog and every future question across the team uses that same governed definition.

If you prefer to define metrics up front, you can also create them directly in the editor. Either path produces the same result: a certified definition stored centrally and available everywhere.

## Why every chat returns the same number

The whole point of the Semantic Layer is consistency. Because each metric — built-in or custom — has one reviewed definition behind it, the AI cannot invent its own version of "revenue" or "active user". The result is answers that are consistent across teams and auditable back to source: no more reconciliation meetings, and no more two dashboards disagreeing about the same quarter.

This is also what keeps AI answers reliable. Raw text-to-SQL on real business data is only as good as the model's guess about what your columns mean. With certified metric definitions in context, the AI stops guessing and starts answering from the definitions your team already trusts.
