---
title: Metrics
description: Metrics are the governed business definitions that power every answer in Insightis — the Semantic Layer the AI runs on. Define a metric once and every chart and every AI Chat answer uses the same number. Insightis gives you built-in metrics out of the box and lets you add your own custom metrics on top.
breadcrumb: Docs / Semantic Layer / Metrics
---

## What metrics are

A metric is a single, governed definition of a business measure — Revenue, MRR, churn, CAC, conversion rate. Metrics are what make [AI Chat](/docs/ai-chat) answers repeatable. Together, your metrics form the Semantic Layer: the trust layer between your raw data and the AI. Without it, an AI answer is a guess. With it, every answer is grounded in a definition your team can see and rely on, so the same question always returns the same number — whether it is asked in Sales, Marketing, or Finance.

Insightis metrics come in two kinds: **built-in metrics** that appear automatically when you connect a data source, and **custom metrics** that you create for the measures unique to your business. Once a metric exists, it behaves the same way everywhere — there is no difference in how built-in and custom metrics are used.

## Browsing your metrics

Open **Metrics** from the left sidebar to see every metric available in your workspace, grouped by the data source it comes from. Each row shows the metric's name, its **@alias** — the short handle you can reference in a question — a summary of its definition, and whether it is **Built-in** or custom.

![The Metrics page — search, the All / Built-in / Custom filters, and metrics grouped by data source](/assets/docs/metrics-catalog.png)

1. Type in **Search metrics…** to find a metric by name, alias, or wording in its definition.
2. Filter the list with **All**, **Built-in**, or **Custom**.
3. Switch on **Active only** to hide anything currently turned off.
4. Use the toggle at the start of a row to turn a metric on or off for your workspace — a metric that is off stays defined but is not used to answer questions.

## Built-in metrics

Every data source ships with a set of predefined metrics for that source. The moment you connect the source, those metrics become available automatically — you do not have to define or configure anything to start asking about them.

- Connect [Stripe](/resources/connectors) and you immediately get standard billing metrics like MRR, active subscriptions, and churn.
- Connect Google Ads and you get spend, clicks, CPC, and ROAS.
- Connect your CRM and you get pipeline, win rate, and deal count.

Because these definitions are fixed, **every request that touches a built-in metric is calculated the same way in every chat**, for every person on the team. Nobody has to agree on how "MRR" is computed — the source's built-in definition already does, and it is applied consistently everywhere.

## Inspecting a metric's definition

Nothing about a metric is hidden. Click a metric to open its details and see exactly how the number is produced — the data source it reads, its alias, whether it is built-in, and the full definition including the formula.

![Metric details — name, data source, alias, type, and the full definition with its formula](/assets/docs/metrics-detail.png)

This is what makes an answer auditable: if a figure looks wrong, you can read the definition behind it rather than guessing at the AI's reasoning.

> [!TIP]
> If a built-in definition is close but not quite how your team measures it, use **Duplicate** at the bottom of the details panel. You get an editable copy with a custom formula, and the original built-in metric stays untouched.

## Custom metrics

Built-in metrics cover the common measures; custom metrics cover the ones that are specific to how *your* company works. When you have a KPI that does not exist out of the box — "gross margin minus refunds", "qualified leads by channel", "activation within seven days" — you create it once as a custom metric, without engineering help.

You can build a custom metric for any use case or scenario your team needs to track. **Once a custom metric is added, it works exactly like a built-in one**: it is available in every chat, calculated the same way each time, and grounded so the AI answers from your definition instead of improvising. Custom and built-in metrics sit side by side in the same catalog and are indistinguishable in use.

## Creating a custom metric

Click **Create metric** on the Metrics page and fill in four fields.

![The Create metric dialog — name, alias, definition, and the data source to link it to](/assets/docs/metrics-create.png)

1. **Name** — what the metric is called in the catalog and in answers, for example *Net revenue*.
2. **Alias** — the short handle used to reference it, for example `@net_revenue`.
3. **Definition** — describe how the metric should be computed. This is the governed definition every future answer will use, so be explicit about which records count and which are excluded.
4. **Link to** — choose whether the metric belongs to a **Data Source** or a specific **Connection**, then pick it from the list.

Click **Save**. The metric joins the catalog immediately and can be used in the next question you ask.

## How the AI proposes a metric

You do not have to open an editor to create a metric. While you chat, if you ask about something that is not defined yet, the AI can propose a definition based on your data. It shows you the source and the proposed definition for you to approve before anything is saved. From that moment on, the metric is part of your catalogue and every future question uses that same governed definition.

If you prefer to define metrics up front, you can also create them yourself from the Metrics page — see **Creating a custom metric** above. Either path produces the same result: one governed definition stored centrally and available everywhere.

## Why every chat returns the same number

The whole point of the Semantic Layer is consistency. Because each metric — built-in or custom — has one reviewed definition behind it, the AI cannot invent its own version of "revenue" or "active user". The result is answers that are consistent across teams and auditable back to source: no more reconciliation meetings, and no more two dashboards disagreeing about the same quarter.

This is also what keeps AI answers reliable. Raw text-to-SQL on real business data is only as good as the model's guess about what your columns mean. With governed metric definitions in context, the AI stops guessing and starts answering from definitions you can check. See [AI Chat](/docs/ai-chat) for how those answers are produced.
