---
title: Data Storage
description: How and where Insightis stores the data it works with — what is held in our systems versus queried in place, how it is encrypted, how long it is kept, and how you can delete or export it on demand.
breadcrumb: Docs / Reference / Data Storage
---

## Where your data lives

Insightis runs on managed cloud infrastructure with regional data residency. By default, customer workspaces are provisioned in the region you select at signup — typically United States or European Union — and metadata, configuration, and cached query results remain in that region for the life of the workspace. Enterprise customers can request additional regions and dedicated infrastructure as part of their contract.

## What is stored versus queried in place

Insightis is designed to minimize how much of your data physically leaves your source systems. The product distinguishes three categories:

- **Queried in place.** When you ask a question, Insightis composes a query and executes it directly against the connected source (a warehouse, database, or SaaS API). The raw rows are not copied into Insightis storage unless a cache is in use.
- **Cached for performance.** Query results, schema metadata, and Semantic Layer definitions are cached inside Insightis to keep AI Chat responsive. Caches are scoped per workspace and expire on a configurable interval.
- **Stored long-term.** Saved reports, metric definitions, user accounts, audit logs, and workspace settings are stored persistently so you can revisit and share them.

You can see which sources have caching enabled and tune cache lifetimes from the Integrations settings page.

## Encryption

All data in Insightis is encrypted in transit using TLS 1.2 or higher and encrypted at rest using AES-256. Connector credentials are stored in a dedicated secrets vault with envelope encryption — they are never logged, never displayed in the UI after entry, and never sent to the AI models that power AI Chat. Backups are encrypted with the same standards as primary storage.

## Retention windows

Default retention policies are:

- **Cached query results** — 24 hours, configurable per source down to off or up to 7 days.
- **Audit logs** — 13 months on standard plans, longer on Enterprise.
- **Saved reports and metrics** — retained until you delete them.
- **Deleted workspaces** — purged from primary storage within 30 days and from backups within 90 days.

Custom retention windows are available for regulated industries through Enterprise contracts.

## Deletion and export

You retain full control over your data. From the Workspace settings page you can export every report and metric you have created as a portable file, and you can request deletion of any individual record or the entire workspace. Deletion requests are honored within 30 days for primary storage and 90 days for system backups, in line with common data-protection standards.

For data-subject access requests under GDPR, CCPA, or comparable laws, contact privacy@insightis.ai. Standard requests are completed within the statutory window.
