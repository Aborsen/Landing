---
title: AI Chat
description: AI Chat is the natural-language interface to your business data. Ask a question in plain English and get a chart, a number, and a written explanation in seconds — no SQL, no dashboards, no waiting on a data analyst.
breadcrumb: Docs / AI Chat / AI Chat Overview
---

## What AI Chat is

AI Chat is a conversational layer that sits on top of every data source you have connected to Insightis. You type a question the way you would ask a colleague — "what was our MRR last quarter by region?" or "show me the top ten customers by ARR" — and Insightis answers with a visualization, the underlying numbers, and a short narrative that explains what the result means.

Because AI Chat is grounded in your Semantic Layer, the answers reflect the metrics your team has already defined. The model is not guessing at column names or improvising joins; it is composing queries from the same trusted definitions that power your reports.

## How a question becomes an answer

Every question goes through the Insights Engine before a number ever comes back. Insightis parses what you typed, resolves the entities and metrics against your semantic definitions, picks the right data sources, generates an optimized query, executes it, and then formats the result. Each step is logged, so any answer can be inspected end-to-end.

If your question is ambiguous — for example, a metric name that exists in two different definitions — AI Chat will ask a clarifying follow-up rather than silently guessing.

## Writing effective questions

Good questions are specific about three things: the metric, the time window, and the breakdown.

- **Metric** — name the thing you want measured ("revenue", "active users", "deal conversion rate").
- **Time window** — say when ("last 30 days", "Q1 2026", "year over year").
- **Breakdown** — say how to slice it ("by region", "by plan tier", "by acquisition channel").

You do not need to phrase questions as SQL. Casual phrasing works well, and AI Chat keeps conversational context so follow-ups like "now break that down by month" continue the previous answer instead of starting over.

## What you get back

Every answer includes three things side by side:

1. **A visualization** chosen automatically based on the shape of the result — line chart for trends, bar chart for breakdowns, table for granular detail.
2. **The headline number or set of numbers** the visualization summarizes, so you can quote a single figure without opening the chart.
3. **A natural-language explanation** describing what changed, where the movement came from, and any notable outliers in the data.

Answers can be saved into the Reports library, shared with teammates by link, scheduled on a recurring cadence, or embedded back into the tools your team already uses.

## Limits and best practices

AI Chat is best at questions that map to metrics defined in the Semantic Layer. For exploratory analysis against raw tables that have not yet been modeled, results may be less accurate — the recommended pattern is to define the metric once in the Semantic Layer and then ask about it freely from AI Chat. Sensitive data is filtered using the same row-level and column-level permissions that govern direct queries; AI Chat cannot return rows a user would not otherwise be allowed to see.
