---
title: Data Storage
description: How and where Insightis stores the data it works with — what is held in our systems versus queried in place, how it is encrypted, how long it is kept, and how you can delete or export it on demand.
breadcrumb: Docs / Reference / Data Storage
---

## Where your data lives

Insightis runs on managed cloud infrastructure. Your workspace settings, metric definitions, cached schema metadata, and any files you upload or generate are stored there. Your business data itself stays in the systems you connect — Insightis queries it in place rather than copying it.

## What is stored versus queried in place

Insightis is designed to minimise how much of your data physically leaves your source systems (see [Security](/docs/security) for how access is protected). The product distinguishes three categories:

- **Queried in place.** When you ask a question, Insightis composes a query and executes it directly against the connected source (a warehouse, database, or SaaS API). The raw rows are not copied into Insightis storage unless a cache is in use.
- **Cached for performance.** Query results, schema metadata, and Semantic Layer definitions are cached inside Insightis to keep AI Chat responsive. Caches are scoped per workspace and expire on a configurable interval.
- **Stored long-term.** Metric definitions, uploaded and generated files, your account, and workspace settings are stored persistently so you can come back to them.

Each connection has its own **Metadata Cache** setting, which you choose when you create or edit it on the [Data Sources](/docs/data-connectors) page.

## Encryption

All data in Insightis is encrypted in transit using TLS 1.2 or higher and encrypted at rest using AES-256. Connector credentials are stored in a dedicated secrets vault with envelope encryption — they are never logged, never displayed in the UI after entry, and never sent to the AI models that power AI Chat. Backups are encrypted with the same standards as primary storage.

## Retention windows

Default retention policies are:

- **Cached metadata** — controlled by the **Metadata Cache** setting on each connection.
- **Metric definitions and files** — retained until you delete them.
- **Deleted workspaces** — purged from primary storage within 30 days and from backups within 90 days.

## Deletion and export

You retain full control over your data. You can remove a connection at any time from **My Connections**, delete uploaded and generated files from **Files**, and delete your account outright from **My Account** — which also clears your datasets and chat sessions (see [Managing your account](/docs/managing-your-account)). Deletions are honored within 30 days for primary storage and 90 days for system backups, in line with common data-protection standards.

For data-subject access requests under GDPR, CCPA, or comparable laws, contact **privacy@insightis.ai**. Standard requests are completed within the statutory window. See also the [Privacy Policy](/security/privacy) and [Security](/docs/security).
