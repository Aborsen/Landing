---
title: Metrics
description: Metrics are the canonical business definitions that power every answer in Insightis. Defining a metric once in the Semantic Layer means every team, every chart, and every AI Chat answer uses the same numbers — no more dueling dashboards.
breadcrumb: Docs / Semantic Layer / Metrics
---

## Why metrics live in the Semantic Layer

Most analytics tools recompute the same definitions over and over in dashboards, spreadsheets, and ad-hoc queries. That is how two teams end up with different revenue numbers for the same quarter. The Semantic Layer fixes this by holding a single, governed definition of every important measure your business cares about. Once "Active Users" or "Net Revenue Retention" is defined there, every surface in Insightis — AI Chat, Reports, embeds, alerts — reads from the same source.

## Defining a metric

A metric definition declares four things: the source data, the aggregation, the filters, and the grain. Source data is whichever table or view in a connected database holds the underlying rows. Aggregation describes how to reduce those rows to a number — a sum, a count of distinct values, an average, a ratio. Filters scope the metric to relevant records, such as excluding test accounts or refunds. Grain is the smallest time bucket the metric can be sliced by, typically daily.

Metrics can be created through the visual builder or expressed directly in YAML for teams that prefer version-controlled definitions. Either way, the result is stored centrally and immediately available everywhere.

## Certification and ownership

Each metric carries an owner and a certification status. Certified metrics are reviewed and approved for business-wide use; draft metrics are flagged in the UI so consumers know the definition is still being worked on. AI Chat will prefer certified metrics when answering questions, and will surface a notice when a question requires a draft metric so the asker knows the answer is preliminary.

## Formula metrics versus raw metrics

A raw metric is computed directly from source rows — for example, "sum of order amount". A formula metric is derived from other metrics — for example, "gross margin = revenue - cost_of_goods_sold". Formula metrics let you compose KPIs out of trusted building blocks, so when an underlying definition changes, every derived metric stays consistent automatically.

## How metrics flow into AI Chat

When you ask a question, AI Chat first tries to match your wording to known metric names and their aliases. If a match is found, the answer is computed from the metric's definition instead of being improvised. This is what makes natural-language analytics reliable enough to put in front of executives: the conversational front end is asking the same governed metric your finance team built, not generating ad-hoc SQL each time.
