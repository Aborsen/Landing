---
title: Data Connectors
description: Data connectors are how Insightis reaches into the systems where your business data already lives — warehouses, databases, CRMs, billing platforms, marketing tools, and product analytics. With over 200 connectors available, most teams are up and running in minutes.
breadcrumb: Docs / Integrations / Data Connectors
---

## What a connector is

A connector is a managed integration that handles authentication, schema discovery, and synchronization between a source system and Insightis. You provide credentials once; the connector takes care of pulling the right tables, keeping them fresh, and adapting when the source schema changes. The connector never asks you to write integration code or maintain a custom ETL pipeline.

## The 200+ catalog

Connectors are grouped by category to make finding the right one quick:

- **Warehouses & databases** — PostgreSQL, MySQL, BigQuery, Snowflake, Redshift, Databricks, ClickHouse.
- **CRMs & customer data** — HubSpot, Salesforce, Pipedrive, Intercom, Zendesk.
- **Billing & finance** — Stripe, Chargebee, QuickBooks, Xero, NetSuite.
- **Marketing** — Google Ads, Meta Ads, LinkedIn Ads, Mailchimp, HubSpot Marketing.
- **Product analytics** — Amplitude, Mixpanel, Segment, PostHog.
- **Spreadsheets & files** — Google Sheets, Excel, CSV uploads, S3.

The full catalog and current connector status is maintained on the Data Connectors page in Resources.

## Authentication and permissions

Most connectors use OAuth so you never share raw passwords with Insightis. Where OAuth is not available, connectors use scoped API keys or read-only database credentials. Insightis stores these credentials encrypted at rest and only uses them to pull the tables you have selected. Each connector requests the minimum permission set required to read its data — never write, never delete.

Inside Insightis, every connection is scoped to a workspace and respects your role-based access control. Users only see data from sources they have been granted access to.

## Sync cadence and freshness

Each connector synchronizes on a schedule you control. Defaults are tuned per source — high-volume operational data like Stripe events syncs every 15 minutes, while slower-moving data like account-level CRM fields syncs hourly. You can override cadence per connection, and freshness is shown next to every result so analysts and AI Chat alike know how recent the underlying data is.

Where supported, connectors use incremental syncs that pull only changed rows. This keeps the load on your source systems low and the data in Insightis close to real-time.

## Adding a custom source

If a system you use is not in the catalog, you have two options. You can write to a warehouse like BigQuery or Snowflake that Insightis already supports, and treat the warehouse as the connector. Or you can request a new connector from the Roadmap page — community-requested connectors are prioritized publicly and shipped on a rolling cadence.
