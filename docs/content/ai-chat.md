---
title: AI Chat
description: AI Chat is the natural-language interface to your business data. Ask a question in plain English, attach a file if you need to, and get a chart, a number, and a written explanation in seconds — no SQL, no dashboards, no waiting on a data analyst.
breadcrumb: Docs / AI Chat / AI Chat Overview
---

## What AI Chat is

AI Chat is a conversational layer that sits on top of every data source you have connected to Insightis. You type a question the way you would ask a colleague — "what was our MRR last quarter by region?" or "show me the top ten customers by ARR" — and Insightis answers with a visualization, the underlying numbers, and a short explanation of what the result means.

Because AI Chat is grounded in your Semantic Layer, the answers reflect the metrics your team has already defined. The model is not guessing at column names or improvising joins — it composes queries from the same governed definitions that every other chat uses, so the numbers stay consistent across the team.

## How a question becomes an answer

Every question runs through the same pipeline before a number comes back. Insightis parses what you typed, resolves the entities and metrics against your Metrics Catalog, picks the right data sources, generates the query, executes it, and formats the result. Each answer ships with the underlying query attached, so an analyst can review, copy, or rerun exactly what produced the number — the AI's work is fully auditable.

If your question is ambiguous — for example, a metric name that maps to two different definitions — AI Chat asks a clarifying follow-up rather than silently guessing.

## Asking follow-up questions

A chat is a conversation, not a one-shot search. AI Chat keeps the context of the thread, so once you have an answer you can keep refining it in plain language:

- "Now break that down by channel."
- "Compare it to the same period last year."
- "Only show enterprise accounts."

Each follow-up builds on the previous result instead of starting over, which is how a single question turns into a full analysis in a minute or two.

## Attaching files to a question

Sometimes the data you want to ask about is not in a connected source yet — a spreadsheet a colleague sent you, an export from another tool, a one-off CSV. You can attach that file directly to a chat and ask questions about it alongside your connected data. Use the attach control in the message box to add a file, then ask your question as usual — for example, "join this list of accounts to our billing data and show me their MRR."

Supported file types include spreadsheets and delimited files such as `.csv`, `.xlsx`, and `.xls`. Attached files are read into the same query engine as your connected sources, so the AI can filter, aggregate, and join them the same way it works with any other data.

## Your files are saved to the workspace

Every file connected to a chat is kept in your workspace so you never lose it or have to regenerate it:

- **Files you attach** are stored after the conversation, so you can reuse the same upload in a later chat without uploading it again.
- **Files the AI generates** — exported charts, result tables, generated spreadsheets — are stored the same way, so you can come back and download or reuse them whenever you need them.

Because both sides of the conversation are retained, a chat becomes a working record you can return to: the question you asked, the answer you got, and every file involved on either side.

## Writing effective questions

Good questions are specific about three things: the metric, the time window, and the breakdown.

- **Metric** — name the thing you want measured ("revenue", "active users", "deal conversion rate").
- **Time window** — say when ("last 30 days", "Q1 2026", "year over year").
- **Breakdown** — say how to slice it ("by region", "by plan tier", "by acquisition channel").

You do not need to phrase questions as SQL. Casual phrasing works well, and naming a metric that already exists in your Semantic Layer gives you the most reliable, consistent answer.

## What you get back

Every answer includes three things side by side:

1. **A visualization** chosen automatically based on the shape of the result — a line chart for trends, a bar chart for breakdowns, a table for granular detail.
2. **The headline number or set of numbers** the visualization summarizes, so you can quote a single figure without opening the chart.
3. **A natural-language explanation** describing what changed, where the movement came from, and any notable outliers in the data.

Every answer also carries the query that produced it, and any files it generates are saved to your workspace for reuse.

## Grounded in your metrics

AI Chat is at its best when a question maps to a metric defined in the Semantic Layer, because the answer is computed from a definition your team reviewed and approved rather than improvised. For data that has not been modeled yet, the recommended pattern is to define the metric once — with the AI's help or directly in the editor — and then ask about it freely.

Access is governed throughout. AI Chat respects the same role- and source-level permissions that apply everywhere else in Insightis, so it can never return rows a user would not otherwise be allowed to see.
