---
title: Prompting best practices
description: How to ask AI Chat questions that consistently get accurate, useful answers — what to include, what to leave out, and how to recover when an answer is not quite right.
breadcrumb: Docs / Getting started / Prompting best practices
---

## Be specific about three things

The most reliable AI Chat answers come from questions that pin down three things: the **metric**, the **time window**, and the **breakdown**. "Revenue last quarter by region" works far better than "how are we doing?". Insightis can interpret vague questions, but the more concrete you are, the closer the first answer will be to what you wanted.

## Use the names your team already uses

If your Semantic Layer defines a metric called "Activated Users", ask for "activated users" rather than "people who finished onboarding". AI Chat will match common synonyms, but using your team's canonical names guarantees the right definition is picked the first time. The Metrics catalog inside the workspace is a quick way to look up exactly what is defined and how it is spelled.

## Iterate, do not start over

After an answer, you can refine the result by sending a follow-up in the same conversation. "Now break that down by month", "exclude internal users", "compare year over year" — these continue the previous query instead of starting from scratch, and the chart updates in place. Starting a fresh conversation only when the topic actually changes saves tokens and keeps your scroll-back coherent.

## Start from a ready-made prompt

You do not have to write every question from scratch. The [Prompt Library](/resources/prompt-library) is a gallery of ready-made prompts for common business questions — campaign performance, revenue trends, funnel analysis, cohort retention, and more. Pick one that matches your case, adjust the metric or time window to fit your data, and paste it into AI Chat. It is also the fastest way to learn what a well-formed question looks like before writing your own.

## When to use AI Chat versus build a report

AI Chat is best for exploratory questions and one-off answers. If you find yourself asking the same question every Monday, save the answer as a scheduled report so it lands in your inbox or Slack automatically. Treat AI Chat as the way you discover an answer, and Reports as the way you keep getting it.

## If the answer is wrong

A wrong answer usually means one of three things: the metric you wanted is not defined in the Semantic Layer, the connector underneath does not have the data, or AI Chat picked a different definition than you expected. Click the **Explain** button on any answer to see exactly which metric, which filters, and which source were used. If the answer is using the wrong metric, the fix is to update the definition (or its aliases) in the Semantic Layer — not to re-prompt around it.
