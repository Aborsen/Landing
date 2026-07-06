---
title: Data Connectors
description: Data connectors are how Insightis reaches into the systems where your business data already lives — warehouses, databases, CRMs, billing platforms, marketing tools, and product analytics. With 200+ native connectors, most teams connect their first source and get an answer in minutes.
breadcrumb: Docs / Data Sources / Data Connectors
---

## What a connector is

A connector is a managed integration that handles authentication, schema discovery, and synchronization between a source system and Insightis. You provide credentials once; the connector pulls the right tables, keeps them fresh, and adapts when the source schema changes. You never write integration code or maintain a custom ETL pipeline.

Once a source is connected, it becomes available to the AI everywhere in the product — its data and its built-in metrics show up in AI Chat automatically, ready to be queried in plain language.

## Connecting a source

You connect data sources from a dedicated **Data Sources** page — a single place to add, view, and manage every connection in your workspace. You can connect any of the 200+ available sources from there, and the flow is entirely no-code:

1. Open the Data Sources page and choose the source you want from the catalog.
2. Authenticate — sign in with OAuth, or paste a scoped API key or read-only database credential.
3. Select the tables or objects you want Insightis to read.
4. Preview and validate the connection and schema before it goes live.
5. Save — the source, and its built-in metrics, are immediately available in AI Chat.

Every source you add appears on the same page, so the whole team works from one unified view of what is connected and how fresh it is.

## The 200+ catalog

Connectors are grouped by category to make finding the right one quick:

- **Warehouses & databases** — PostgreSQL, MySQL, BigQuery, Snowflake, Redshift, Databricks, ClickHouse.
- **CRMs & customer data** — HubSpot, Salesforce, Pipedrive, Intercom, Zendesk.
- **Billing & finance** — Stripe, Chargebee, QuickBooks, Xero, NetSuite.
- **Marketing & ads** — Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, Google Analytics, Mailchimp.
- **Product analytics** — Amplitude, Mixpanel, Segment, PostHog.
- **Spreadsheets & files** — Google Sheets, Excel Online, Airtable, CSV uploads, S3.

The full catalog and current connector status is maintained on the Data Connectors page in Resources.

## Authentication and permissions

Most connectors use OAuth so you never share raw passwords with Insightis. Where OAuth is not available, connectors use scoped API keys or read-only database credentials. Insightis stores these credentials encrypted at rest and only uses them to pull the tables you selected. Each connector requests the minimum permission set required to read its data — never write, never delete.

Inside Insightis, every connection is scoped to a workspace and respects your role-based access control. Users only see data from sources they have been granted access to, at the user and team level.

## Sync cadence and freshness

Each connector synchronizes on a schedule you control. Defaults are tuned per source — high-volume operational data like Stripe events syncs frequently, while slower-moving data like account-level CRM fields syncs less often. You can override the cadence per connection or refresh on demand, and freshness is shown next to every result so analysts and AI Chat alike know how recent the underlying data is.

Where supported, connectors use incremental syncs that pull only changed rows. This keeps the load on your source systems low and the data in Insightis close to real-time.

## Adding a source that is not in the catalog

If a system you use is not in the catalog, you have two options. You can write to a warehouse like BigQuery or Snowflake that Insightis already supports, and treat the warehouse as the connector. Or you can request a new connector from the Roadmap page — community-requested connectors are prioritized publicly and shipped on a rolling cadence.
