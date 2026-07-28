---
title: AI Chat
description: AI Chat is the natural-language interface to your business data. Ask a question in plain English, attach a file if you need to, and get a chart, a number, and a written explanation in seconds — no SQL, no dashboards, no waiting on a data analyst.
breadcrumb: Docs / AI Chat / AI Chat Overview
---

## What AI Chat is

AI Chat is a conversational layer that sits on top of every data source you have connected to Insightis. You type a question the way you would ask a colleague — "what was our MRR last quarter by region?" or "show me the top ten customers by ARR" — and Insightis answers with a visualization, the underlying numbers, and a short explanation of what the result means.

Because AI Chat is grounded in your Semantic Layer, the answers reflect the metrics your team has already defined. The model is not guessing at column names or improvising joins — it composes queries from the same governed definitions that every other chat uses, so the numbers stay consistent across the team.

## How a question becomes an answer

Every question runs through the same pipeline before a number comes back. Insightis parses what you typed, resolves the entities and metrics against your [metric definitions](/docs/metrics), picks the right data sources, generates the query, executes it, and formats the result. Each answer shows the steps it ran, so you can expand them and see what produced the number.

If your question is ambiguous — for example, a metric name that maps to two different definitions — AI Chat asks a clarifying follow-up rather than silently guessing.

## Sending a message

Type your question into the message box at the bottom of the chat and press **Send** (or hit Enter). Insightis interprets the request, works through it against your data, and replies in the thread with the result — a chart, the underlying numbers, and a short written summary. For a multi-step analysis it briefly outlines its plan first, so you can confirm the approach before it runs.

![An answered question in AI Chat — how Insightis read the question, a Key numbers table, what stands out, and the chart it generated](/assets/docs/chat-basic-message.png)

1. Type a question in plain English — for example, *"show me a trend for @avg_lost_deal_size by month"*. Typing `@` brings up your [metrics](/docs/metrics), so an answer is grounded in the definition you already agreed on.
2. Press **Send**. Insightis states how it interpreted the question, then works through it — you can stop it at any point while it runs.
3. Read the answer — a **Key numbers** table, a short *What stands out* summary, and any chart it generated. Generated charts and files are saved to your workspace so you can reuse them later.

## Asking follow-up questions

A chat is a conversation, not a one-shot search. AI Chat keeps the context of the thread, so once you have an answer you can keep refining it in plain language:

- "Now break that down by channel."
- "Compare it to the same period last year."
- "Only show enterprise accounts."

Each follow-up builds on the previous result instead of starting over, which is how a single question turns into a full analysis in a minute or two.

## Attaching files to a question

Sometimes the data you want to ask about is not in a connected source yet — a spreadsheet a colleague sent you, an export from another tool, a one-off CSV. You can attach that file directly to a chat and ask questions about it alongside your connected data. Use the paperclip in the message box to add a file, then ask your question as usual — for example, "join this list of accounts to our billing data and show me their MRR."

![A CSV file attached in the message box, ready to send with your question](/assets/docs/chat-attach-file.png)

Supported file types include spreadsheets and delimited files such as `.csv`, `.xlsx`, and `.xls`. Attached files are read into the same query engine as your [connected sources](/docs/data-connectors), so the AI can filter, aggregate, and join them the same way it works with any other data.

## Your files are saved to the workspace

Every file connected to a chat is kept in your workspace so you never lose it or have to regenerate it:

- **Files you attach** are stored after the conversation, so you can reuse the same upload in a later chat without uploading it again.
- **Files the AI generates** — exported charts, result tables, generated spreadsheets — are stored the same way, so you can come back and download or reuse them whenever you need them.

Because both sides of the conversation are retained, a chat becomes a working record you can return to: the question you asked, the answer you got, and every file involved on either side.

## Choosing which sources to query

Use the **Connections** menu in the message box to control which connected data sources Insightis draws on for the current chat. Toggle a source on to include it in your next question, or open **Manage Connections** to add and configure sources.

> [!NOTE]
> The connectors you can toggle here are the connections your workspace has already set up on the **Data Sources** page — see [Data Connectors](/docs/data-connectors) for how to browse the catalogue, add a source, and manage existing connections.

![The Connections menu open in the message box, listing the sources this chat can use](/assets/docs/chat-connector.png)

1. Click **Connections** in the message box.
2. Toggle on the sources you want this chat to use.
3. Ask your question — Insightis answers using only the sources you enabled.

## Choosing a model

Insightis offers three models, switchable from the message box at any point in a conversation:

- **Insightis Light** — fast, everyday answers; best for quick lookups and follow-ups.
- **Insightis Medium** — the balanced choice for most analytical work.
- **Insightis Pro** — the deepest reasoning, for complex multi-step analyses.

Open the model menu in the message box — it shows the model currently in use — and pick the one that fits your question. The choice applies to your next message, so you can start on Light and switch to a deeper model mid-conversation if an answer needs more analysis. See [AI Models](/docs/ai-models) for what each one is tuned for.

![The model menu open in the message box, listing Insightis Light, Medium, and Pro](/assets/docs/chat-model-select.png)

## Writing effective questions

Good questions are specific about three things: the metric, the time window, and the breakdown.

- **Metric** — name the thing you want measured ("revenue", "active users", "deal conversion rate").
- **Time window** — say when ("last 30 days", "Q1 2026", "year over year").
- **Breakdown** — say how to slice it ("by region", "by plan tier", "by acquisition channel").

You do not need to phrase questions as SQL. Casual phrasing works well, and naming a metric that already exists in your Semantic Layer gives you the most reliable, consistent answer.

## What you get back

A typical answer gives you:

1. **The figures** — the numbers themselves, so you can quote one without opening anything.
2. **A written explanation** of what the result shows and anything notable in it.
3. **A chart**, when the question calls for one — generated as a file and saved to **Files**, so you can download or reuse it.

The steps Insightis ran sit above the answer; expand them to see how the number was produced.

## Grounded in your metrics

AI Chat is at its best when a question maps to a metric defined in the Semantic Layer, because the answer is computed from a definition your team reviewed and approved rather than improvised. For data that has not been modeled yet, the recommended pattern is to define the metric once — with the AI's help, or yourself on the [Metrics](/docs/metrics) page — and then ask about it freely.

Access is governed throughout. AI Chat can only read the sources connected to your workspace, and only the ones you enable for the chat — see [Data Connectors](/docs/data-connectors) and [Security](/docs/security).
