---
title: Data Connectors
description: Data connectors are how Insightis reaches into the systems where your business data already lives — warehouses, databases, CRMs, billing platforms, marketing tools, and product analytics. With 200+ native connectors, most teams connect their first source and get an answer in minutes.
breadcrumb: Docs / Data Sources / Data Connectors
---

## What a connector is

A connector is a managed integration that handles authentication, schema discovery, and synchronization between a source system and Insightis. You provide credentials once; the connector pulls the right tables, keeps them fresh, and adapts when the source schema changes. You never write integration code or maintain a custom ETL pipeline.

Once a source is connected, it becomes available to the AI everywhere in the product — its data and its [built-in metrics](/docs/metrics) show up in [AI Chat](/docs/ai-chat) automatically, ready to be queried in plain language.

## The Data Sources page

Everything related to connections lives on the **Data Sources** page, opened from the left sidebar. It has two tabs: **Catalog**, where you browse and connect sources, and **My Connections**, where you view and manage the ones you have already set up.

## Browsing the catalog

The **Catalog** tab lists every available data source. Search for a source by name, or narrow the list with the category filters — Business Intelligence, Commerce, Communication, IT Operations, Marketing, Productivity, Sales & CRM, Storage & Files, Support, and more.

![The Data Sources Catalog tab — search box, category filters, and the grid of available sources](/assets/docs/data-sources-catalog.png)

## Connecting a source

You connect data sources from a dedicated **Data Sources** page — a single place to add, view, and manage every connection in your workspace. You can connect any of the 200+ available sources from there, and the flow is entirely no-code:

1. Open the Data Sources page and choose the source you want from the catalog.
2. Authenticate — sign in with OAuth, or paste a scoped API key or read-only database credential.
3. Select the tables or objects you want Insightis to read.
4. Preview and validate the connection and schema before it goes live.
5. Save — the source, and its built-in metrics, are immediately available in AI Chat.

You can start this flow two ways: click **Connect** on a source's card in the Catalog, or click **Create connection** on the My Connections tab and pick a source. Either opens the guided **New connection** dialog.

Connecting **Jira Software Cloud**, for example, asks for your Jira **Site** and a **Token** — paste an API token, or click the **Sign In** button to authorize Insightis against your Jira account instead. Optional settings such as **Use Custom Objects** and **Metadata Cache** control how much of the source's schema Insightis reads and how long it keeps it cached. Click **Save** to continue.

![The New connection dialog for Jira Software Cloud — enter the site and token, then Save](/assets/docs/data-sources-create-connection.png)

Every source you add appears on the **My Connections** tab, so there is one place to see what is connected.

## Managing your connections

The **My Connections** tab lists every source you have connected, showing each connection's **Connection name**, **Data Source** type, and **Description**. Use the **Actions** on each row to manage a connection — edit its settings, refresh it, or remove it.

![The My Connections tab — existing connections with their name, data source, description, and actions](/assets/docs/data-sources-my-connections.png)

## The 200+ catalog

Connectors are grouped by category to make finding the right one quick:

- **Warehouses & databases** — PostgreSQL, MySQL, BigQuery, Snowflake, Redshift, Databricks, Azure Synapse Analytics.
- **CRMs & customer data** — HubSpot, Salesforce, Pipedrive, Intercom, Zendesk.
- **Billing & finance** — Stripe, Chargebee, QuickBooks Online, Xero, NetSuite.
- **Marketing & ads** — Google Ads, Facebook Ads, TikTok Ads, LinkedIn Ads, Google Analytics, Mailchimp.
- **Product analytics** — Amplitude, FullStory, Segment, Google Analytics 4.
- **Spreadsheets & files** — Google Sheets, Excel Online, Airtable, SharePoint Lists, CSV uploads.

The full catalogue and current connector status is on the [Data Connectors page](/resources/connectors).

## Authentication and permissions

Most connectors use OAuth so you never share raw passwords with Insightis. Where OAuth is not available, connectors use scoped API keys or read-only database credentials. Insightis stores these credentials encrypted at rest and only uses them to read the data you selected (see [Security](/docs/security)). Each connector requests the minimum permission set required to read its data — never write, never delete.

Every connection is scoped to your workspace, and you choose which connections a given chat may use from the **Connections** menu in the message box — see [AI Chat](/docs/ai-chat).

## Freshness and caching

Insightis queries your source when you ask a question, so answers reflect the data that is in the source at that moment rather than a nightly copy. What is cached is the source's *structure* — its tables and fields — so the AI does not have to rediscover the schema on every question.

You control that with the **Metadata Cache** setting on each connection. Shorter values pick up schema changes sooner; longer values keep things fast when your schema rarely changes. See [Data Storage](/docs/data-storage) for what is kept and for how long.

## Adding a source that is not in the catalog

If a system you use is not in the catalog, you have two options. You can write to a warehouse like BigQuery or Snowflake that Insightis already supports, and treat the warehouse as the connector. Or you can request a new connector on the [Roadmap](/resources/roadmap) — community-requested connectors are prioritised publicly and shipped on a rolling cadence.
