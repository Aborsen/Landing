// Metrics catalog — GENERATED from built-in-metrics.xlsx (the shipped metric
// library: 498 metrics across 20 sources). Do not hand-edit; regenerate.
//
// Every name, alias and description here is the library's own text, verbatim.
// `desc` is the definition with its trailing SELECT lifted into `sql`, so the
// page can show the implementation separately — nothing is paraphrased and no
// formula is invented. Where a definition carries its formula inline instead of
// as a trailing SELECT, `sql` is empty and the formula stays in `desc`.
//
// `short` is the one-line card label: the definition cut where it stops being a
// phrase and starts being implementation. Derived, never rewritten — capped at 54
// characters so every card is exactly one line of name and one of description.
//
// Every `desc` renders as exactly THREE lines in the detail panel — the box is a
// fixed three lines high, so anything shorter leaves a visible gap and anything
// longer is clipped. Definitions that arrived too short ("Total tasks.") were
// extended with their own gotcha tail — the text the library carries after the
// SELECT — so the addition is still the library's, not ours.
//
// 145 characters is the hard ceiling. There is NO reliable character floor: the
// wrap point moves with the words, so 104 characters can fill three lines while
// 119 stops at two (quoted column names like "AmountRefunded" break early).
// Roughly, 123+ is safe and below 120 needs checking — but the only way to know
// is to measure the rendered line count at the panel's 350px content width.
// Abbreviations are spelled out on first mention (Monthly Recurring Revenue,
// not MRR) with the acronym in parentheses where later sentences reuse it.
// BOTH of those are hand-tuned: a regeneration from the xlsx must re-apply them.
//
// `sql` is never truncated — a clipped SELECT would be wrong, so the panel scrolls
// that block instead. It is line-broken on clause boundaries so it fills the box
// rather than sitting on one line in a three-line frame: one clause per line, or,
// for a two-clause query, SELECT alone with the select list indented under it. Where
// the library wrote a bare aggregate ("COUNT(*) FROM \"TeamTasks\"") the implied
// SELECT is written out — most rows in the library already do. Trailing guidance that
// is prose rather than SQL is marked as a `--` comment, so a code block never renders
// an English sentence as though it were part of the query.
//
// TWELVE of these were rebuilt from the xlsx by hand. The generator split each
// definition at its LAST "SELECT", and in those rows the last SELECT belongs to the
// boilerplate warning — "do NOT run an extra SQL query just to divide (a query like
// 'SELECT a/b FROM SomeTable' ...)" — so nine shipped that fragment, unmatched quote
// and all, with no formula anywhere. Three facebookads rows split inside "do NOT
// select Breakdowns/segment columns" and shipped a sentence starting mid-word. Their
// real formulas came from the definition's own "Canonical: SELECT ..." and
// "Numerator: ... Denominator: ..." text. A regeneration must split on the FIRST
// formula and drop the boilerplate tail, or it will reintroduce all twelve.
//
// The three Aha! rate metrics are the exception: the library states only the
// arithmetic and its rules, no query, so that is all their block shows.
//
// 60 of the 498 are surfaced. The rest are either near-duplicates across sources
// or artifacts of the demo datasets the library was built against — date-pinned
// (bookings_q3_2024), geo-specific (jerusalem_tz_share_pct), or the Notion set,
// which measures a personal budget. Real metrics, wrong for a public catalog.

export const CATALOG_TOTAL = 498;
export const CATALOG_SOURCES = 20;

// provider key -> display name + connector-sprite class
export const METRIC_SOURCES = {
  salesforce: { label: "Salesforce", sprite: "salesforce" },
  hubspot: { label: "HubSpot", sprite: "hubspot" },
  zoho: { label: "Zoho CRM", sprite: "zoho" },
  stripe: { label: "Stripe", sprite: "stripe" },
  chargebee: { label: "Chargebee", sprite: "hbr_chargebee" },
  quickbooks: { label: "QuickBooks Online", sprite: "quickbooks" },
  xero: { label: "Xero", sprite: "xero" },
  googleads: { label: "Google Ads", sprite: "gaw" },
  facebookads: { label: "Facebook Ads", sprite: "fbk" },
  linkedinads: { label: "LinkedIn Ads", sprite: "lnkd" },
  mailchimp: { label: "Mailchimp", sprite: "mailchimp" },
  amplitude: { label: "Amplitude", sprite: "amplitude" },
  googleanalytics: { label: "Google Analytics", sprite: "googleanalytics" },
  snowflake: { label: "Snowflake", sprite: "snowflake" },
  jira_new: { label: "Jira", sprite: "jira" },
  github: { label: "GitHub", sprite: "github" },
  aha: { label: "Aha!", sprite: "rst_aha" },
  clickup: { label: "ClickUp", sprite: "hbr_clickup" },
  notion: { label: "Notion", sprite: "notion" },
  slack: { label: "Slack", sprite: "slack" },
};

export const METRIC_FAMILIES = [
  {
    label: "CRM",
    sources: ["salesforce", "hubspot", "zoho"],
    total: 74,
    metrics: [
      { p: "salesforce", alias: "mrr_won", name: "Monthly Recurring Revenue (won)",
        short: "Monthly Recurring Revenue",
        desc: "Monthly Recurring Revenue (MRR). Salesforce has NO native recurring field, so by CONVENTION each won \"Amount\" is annual; MRR = that total/12.",
        sql: "SELECT SUM(\"Amount\")/12.0\nFROM \"Opportunity\"\nWHERE \"IsWon\" = true" },
      { p: "salesforce", alias: "total_arr_won", name: "Total Annual Recurring Revenue (won)",
        short: "Annual Recurring Revenue",
        desc: "Annual Recurring Revenue (ARR). CONVENTION: treat each WON opportunity's \"Amount\" as its annual contract value; ARR = SUM of won \"Amount\".",
        sql: "SELECT SUM(\"Amount\")\nFROM \"Opportunity\"\nWHERE \"IsWon\" = true" },
      { p: "salesforce", alias: "avg_acv_won", name: "Average Annual Contract Value per won deal",
        short: "Average Annual Contract Value of won deals",
        desc: "Average Annual Contract Value (ACV) of won deals. CONVENTION: each won opportunity's \"Amount\" IS its ACV, averaged over won deals only.",
        sql: "SELECT SUM(\"Amount\")/NULLIF(COUNT(*),0)\nFROM \"Opportunity\"\nWHERE \"IsWon\" = true" },
      { p: "salesforce", alias: "win_rate_by_value", name: "Win rate by value (%)",
        short: "Share of CLOSED-opportunity VALUE that was won",
        desc: "Share of CLOSED-opportunity VALUE that was won. Value-weighted: it sums \"Amount\", so the denominator is closed value, not open pipeline.",
        sql: "SELECT 100.0 * SUM(CASE WHEN \"IsWon\" = true THEN \"Amount\" ELSE 0 END) / NULLIF(SUM(CASE WHEN \"IsClosed\" = true THEN \"Amount\" ELSE 0 END),0) FROM \"Opportunity\". Value-weighted (uses Amount), and the denominator is closed value, not all-opportunity value" },
      { p: "hubspot", alias: "saas_mrr", name: "Monthly Recurring Revenue (derived)",
        short: "Monthly Recurring Revenue",
        desc: "Monthly Recurring Revenue (MRR). HubSpot's native \"Monthly recurring revenue\" field is 0 on every deal, so MRR is DERIVED by SaaS convention.",
        sql: "SELECT\n  SUM(\"Annual contract value\")/12.0\nFROM \"Deals\"" },
      { p: "hubspot", alias: "saas_arr", name: "Annual Recurring Revenue (derived)",
        short: "Annual Recurring Revenue",
        desc: "Annual Recurring Revenue (ARR). The native \"Annual recurring revenue\" field is 0 on every deal, so ARR is DERIVED from \"Annual contract value\".",
        sql: "SELECT\n  SUM(\"Annual contract value\")\nFROM \"Deals\"" },
      { p: "hubspot", alias: "lead_to_customer_conversion_rate", name: "Lead-to-customer conversion rate (%)",
        short: "End-to-end funnel yield over Contacts",
        desc: "End-to-end funnel yield over Contacts: numerator = contacts whose \"Lifecycle Stage\" = 'Customer' (the terminal stage only); denominator = ALL…",
        sql: "SELECT 100.0 * SUM(CASE WHEN \"Lifecycle Stage\" = 'Customer' THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) FROM \"Contacts\". Denominator is every contact (9), NOT just 'Lead'-stage ones. Equals 11.11%" },
      { p: "zoho", alias: "sales_velocity", name: "Sales velocity ($/day)",
        short: "Sales velocity ($ per day)",
        desc: "Sales velocity ($ per day) = (open deals x win rate x average won-deal size) / average sales-cycle days, with the win-side inputs measured over…",
        sql: "SELECT SUM(CASE WHEN \"Stage\" NOT IN ('CLOSED WON','CLOSED LOST','Closed-Missed') THEN 1 ELSE 0 END) AS open_count, 100.0*SUM(CASE WHEN \"Stage\"='CLOSED WON' AND \"Closing Date\">='2025-01-01' AND \"Closing Date\"<='2025-12-31' THEN 1 ELSE 0 END)/NULLIF(SUM(CASE WHEN \"Stage\" IN ('CLOSED WON','CLOSED LOST','Closed-Missed') AND \"Closing Date\">='2025-01-01' AND \"Closing Date\"<='2025-12-31' THEN 1 ELSE 0 END),0) AS win_rate, SUM(CASE WHEN \"Stage\"='CLOSED WON' AND \"Closing Date\">='2025-01-01' AND \"Closing Date\"<='2025-12-31' THEN \"Amount\" ELSE 0 END)/NULLIF(SUM(CASE WHEN \"Stage\"='CLOSED WON' AND \"Closing Date\">='2025-01-01' AND \"Closing Date\"<='2025-12-31' THEN 1 ELSE 0 END),0) AS avg_won_size, SUM(CASE WHEN \"Stage\"='CLOSED WON' AND \"Closing Date\">='2025-01-01' AND \"Closing Date\"<='2025-12-31' THEN \"Sales Cycle Duration\" ELSE 0 END)/NULLIF(SUM(CASE WHEN \"Stage\"='CLOSED WON' AND \"Closing Date\">='2025-01-01' AND \"Closing Date\"<='2025-12-31' THEN 1 ELSE 0 END),0) AS avg_cycle FROM \"Deals\") t Report the dollars-per-day scalar the query returns" },
      { p: "zoho", alias: "average_sales_cycle_days", name: "Average sales cycle (days)",
        short: "Average days to win a deal",
        desc: "Average days to win a deal, over won deals only. \"Sales Cycle Duration\" is Zoho-computed (creation to won); no manual date math needed.",
        sql: "AVG(\"Sales Cycle Duration\") FROM \"Deals\" WHERE \"Stage\"='CLOSED WON' AND \"Closing Date\" BETWEEN :start AND :end" },
      { p: "zoho", alias: "win_rate_value", name: "Win rate (by value)",
        short: "Share of closed-deal value that was won",
        desc: "Share of closed-deal value that was won. Value-weighted, so it differs from the count-based win rate whenever deal sizes vary.",
        sql: "SELECT 100.0 * SUM(CASE WHEN \"Stage\"='CLOSED WON' THEN \"Amount\" ELSE 0 END) / NULLIF(SUM(CASE WHEN \"Stage\" IN ('CLOSED WON','CLOSED LOST','Closed-Missed') THEN \"Amount\" ELSE 0 END),0) FROM \"Deals\" WHERE \"Closing Date\" >= :start AND \"Closing Date\" <= :end. Value-weighted; differs from count-based when deal sizes vary" },
    ],
  },
  {
    label: "Billing & Finance",
    sources: ["stripe", "chargebee", "quickbooks"],
    total: 75,
    metrics: [
      { p: "stripe", alias: "mrr", name: "Monthly Recurring Revenue",
        short: "Monthly Recurring Revenue, in DOLLARS",
        desc: "Monthly Recurring Revenue, in DOLLARS. Compute from \"SubscriptionItems\" (NOT the embedded \"Subscriptions\".\"Plan_Amount\", which is NULL for…",
        sql: "SELECT SUM(CASE WHEN si.\"Price_Recurring_Interval\"='year' THEN si.\"Price_UnitAmount\"*si.\"Quantity\"/12.0 WHEN si.\"Price_Recurring_Interval\"='month' THEN si.\"Price_UnitAmount\"*si.\"Quantity\" WHEN si.\"Price_Recurring_Interval\"='week' THEN si.\"Price_UnitAmount\"*si.\"Quantity\"*52.0/12.0 WHEN si.\"Price_Recurring_Interval\"='day' THEN si.\"Price_UnitAmount\"*si.\"Quantity\"*365.0/12.0 ELSE 0 END)/100.0 FROM \"SubscriptionItems\" si JOIN \"Subscriptions\" s ON si.\"SubscriptionId\" = s.\"Id\" WHERE s.\"Status\" = 'Active'. Equals $276.27" },
      { p: "stripe", alias: "arr", name: "Annual Recurring Revenue",
        short: "Annual Recurring Revenue, in DOLLARS",
        desc: "Annual Recurring Revenue, in DOLLARS = monthly recurring revenue x 12, computed from \"SubscriptionItems\" of ACTIVE subscriptions.",
        sql: "SELECT SUM(CASE WHEN si.\"Price_Recurring_Interval\"='year' THEN si.\"Price_UnitAmount\"*si.\"Quantity\" WHEN si.\"Price_Recurring_Interval\"='month' THEN si.\"Price_UnitAmount\"*si.\"Quantity\"*12 WHEN si.\"Price_Recurring_Interval\"='week' THEN si.\"Price_UnitAmount\"*si.\"Quantity\"*52 WHEN si.\"Price_Recurring_Interval\"='day' THEN si.\"Price_UnitAmount\"*si.\"Quantity\"*365 ELSE 0 END)/100.0 FROM \"SubscriptionItems\" si JOIN \"Subscriptions\" s ON si.\"SubscriptionId\" = s.\"Id\" WHERE s.\"Status\" = 'Active'. Equals $3,315.18" },
      { p: "stripe", alias: "net_revenue", name: "Net revenue (succeeded - refunds)",
        short: "Net revenue in DOLLARS",
        desc: "Net revenue in DOLLARS = succeeded charge \"Amount\" minus \"AmountRefunded\", filtered to \"Status\" = 'Succeeded'.",
        sql: "SELECT SUM(\"Amount\")/100.0 - SUM(\"AmountRefunded\")/100.0 FROM \"Charges\" WHERE \"Status\" = 'Succeeded'. Equals $691.79 (vs $1,072.76 gross)" },
      { p: "stripe", alias: "payment_success_rate", name: "Payment success rate (%)",
        short: "Percentage of charges that succeeded",
        desc: "Percentage of charges that succeeded, over every charge on the account. Gotcha: the \"Status\" value is Title-case 'Succeeded'.",
        sql: "SELECT 100.0 * SUM(CASE WHEN \"Status\" = 'Succeeded' THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) FROM \"Charges\". 'Succeeded' is Title-case. Equals 94.44% (17 of 18)" },
      { p: "chargebee", alias: "churn_rate", name: "Subscription churn rate (%)",
        short: "Percentage of subscriptions that are Cancelled",
        desc: "Percentage of subscriptions that are Cancelled, over every subscription on the account. Gotcha: 'Cancelled' is Title-case here.",
        sql: "SELECT 100.0 * SUM(CASE WHEN \"Status\" = 'Cancelled' THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) FROM \"Subscriptions\". 'Cancelled' is Title-case (not 'cancelled')" },
      { p: "chargebee", alias: "active_subscription_rate", name: "Active subscription rate (%)",
        short: "Percentage of subscriptions that are Active",
        desc: "Percentage of subscriptions that are Active. The denominator is every subscription on the account, cancelled ones included.",
        sql: "SELECT 100.0 * SUM(CASE WHEN \"Status\" = 'Active' THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) FROM \"Subscriptions\"" },
      { p: "chargebee", alias: "arpu_cb", name: "Average Revenue Per User",
        short: "Active monthly recurring revenue per customer",
        desc: "Average Revenue Per User (ARPU) = active monthly recurring revenue divided by the number of DISTINCT customers with an ACTIVE subscription.",
        sql: "SELECT COUNT(DISTINCT \"CustomerId\") FROM \"Subscriptions\" WHERE \"Status\" = 'Active'. Do NOT divide by all customers" },
      { p: "quickbooks", alias: "total_ar_outstanding", name: "Total accounts receivable outstanding",
        short: "Open accounts receivable",
        desc: "Open accounts receivable = SUM(\"Balance\") over invoices with \"Balance\" > 0 — the unpaid portion, not the original invoiced value. Canonical.",
        sql: "SELECT SUM(\"Balance\") FROM \"Invoice\" WHERE \"Balance\" > 0. Gotcha: use \"Balance\" (open amount), NOT \"TotalAmt\" (original invoiced) - they differ once payments are applied. Decimal dollars" },
      { p: "quickbooks", alias: "collection_rate_pct", name: "Collection rate (%)",
        short: "Cash collected relative to invoiced value",
        desc: "Cash collected relative to invoiced value: 100 * payments received / gross invoiced. Run the two totals separately, then divide them.",
        sql: "-- numerator\nSELECT SUM(\"TotalAmt\") FROM \"Payment\"\n-- denominator\nSELECT SUM(\"TotalAmt\") FROM \"Invoice\"" },
      { p: "quickbooks", alias: "total_invoiced_qb", name: "Total invoiced (gross)",
        short: "Gross invoiced value",
        desc: "Gross invoiced value = SUM(\"TotalAmt\") over ALL invoices, paid and unpaid alike and with no date filter. Original billed value, not the balance.",
        sql: "SELECT SUM(\"TotalAmt\") FROM \"Invoice\". Gotcha: this is original billed value (\"TotalAmt\"), not the open \"Balance\"; includes paid and unpaid invoices. No date filter - sum ALL invoices; if a query returns empty you likely added a spurious filter" },
    ],
  },
  {
    label: "Marketing",
    sources: ["googleads", "facebookads", "mailchimp"],
    total: 75,
    metrics: [
      { p: "googleads", alias: "total_cost", name: "Total ad spend",
        short: "Total advertising cost in currency",
        desc: "Total advertising cost across every campaign in the account. Gotcha: cost is stored in MICROS (millionths); divide by 1,000,000 for currency.",
        sql: "SELECT\n  SUM(\"Metrics_CostMicros\") / 1000000.0\nFROM \"CampaignsReport\"" },
      { p: "googleads", alias: "total_conversions_value", name: "Total conversions value",
        short: "Revenue Google Ads credits to conversions",
        desc: "Total conversion value your ads generated - the revenue Google Ads credits to conversions. Gotcha: it is in currency units, NOT micros.",
        sql: "SELECT\n  SUM(\"Metrics_ConversionsValue\")\nFROM \"CampaignsReport\"" },
      { p: "googleads", alias: "cost_per_conversion", name: "Cost per conversion (CPA)",
        short: "Cost per conversion (CPA), ACCOUNT-LEVEL",
        desc: "Cost per conversion (CPA), ACCOUNT-LEVEL = total cost / total conversions, in ONE query. A single pooled figure, never an average of campaigns.",
        sql: "SELECT (SUM(\"Metrics_CostMicros\")/1000000.0) / SUM(\"Metrics_Conversions\") FROM \"CampaignsReport\". Rules: (1) do NOT add any WHERE clause or date filter - \"CampaignsReport\" already holds account-level totals and has no usable Segments_Date, so any date filter returns EMPTY; query all rows. (2) Use \"Metrics_Conversions\", not \"Metrics_AllConversions\". (3) It is a single pooled figure - do NOT compute per-campaign CPA and average. (4) Convert micros to currency (/1e6). Result ~377" },
      { p: "googleads", alias: "ctr_pct", name: "Click-through rate (CTR %)",
        short: "Click-through rate",
        desc: "Click-through rate = 100 * total clicks / total impressions. Compute in one query; account-level (sum then divide, not an average of per-row…",
        sql: "SELECT 100.0 * SUM(\"Metrics_Clicks\")\n       / SUM(\"Metrics_Impressions\")\nFROM \"CampaignsReport\"" },
      { p: "facebookads", alias: "total_spend", name: "Total ad spend",
        short: "Total advertising spend",
        desc: "Total advertising spend = SUM(\"Spend\") FROM \"CampaignInsights\". \"Spend\" is decimal currency (NOT cents).",
        sql: "SELECT SUM(\"Spend\")\nFROM \"CampaignInsights\"\n-- \"Spend\" is decimal currency, NOT cents" },
      { p: "facebookads", alias: "cost_per_conversion_fb", name: "Cost per conversion (CPA)",
        short: "Pooled cost per conversion",
        desc: "Pooled cost per conversion = SUM(\"Spend\") / SUM(\"Conversions\") FROM \"CampaignInsights\", in ONE query, not a per-campaign average.",
        sql: "SELECT 1.0 * SUM(\"Spend\")\n       / NULLIF(SUM(\"Conversions\"),0)\nFROM \"CampaignInsights\"\n-- one pooled figure, never a per-campaign average" },
      { p: "facebookads", alias: "ctr_pct_fb", name: "Click-through rate (CTR %)",
        short: "Pooled click-through rate",
        desc: "Pooled click-through rate = 100 * SUM(\"Clicks\") / SUM(\"Impressions\") FROM \"CampaignInsights\", in ONE query.",
        sql: "SELECT 100.0 * SUM(\"Clicks\")\n       / NULLIF(SUM(\"Impressions\"),0)\nFROM \"CampaignInsights\"\n-- float 100.0 first: integer-division trap" },
      { p: "mailchimp", alias: "open_rate", name: "Open rate (unique) (%)",
        short: "Unique opens divided by delivered emails, as a…",
        desc: "Unique open rate = unique opens divided by delivered emails, as a percentage. Unique, so a recipient who opens twice counts once.",
        sql: "SELECT 100.0 * SUM(\"Summary_UniqueOpens\")\n       / NULLIF(SUM(\"EmailsSent\"),0)\nFROM \"Campaigns\"" },
      { p: "mailchimp", alias: "click_rate", name: "Click rate (%)",
        short: "Unique subscriber clicks divided by delivered emails,…",
        desc: "Click rate = unique subscriber clicks divided by delivered emails, as a percentage. Pooled across campaigns, never averaged per campaign.",
        sql: "SELECT 100.0 * SUM(\"Summary_SubscriberClicks\")\n       / NULLIF(SUM(\"EmailsSent\"),0)\nFROM \"Campaigns\"" },
      { p: "mailchimp", alias: "click_to_open_rate", name: "Click-to-open rate (CTOR) (%)",
        short: "Click-to-open rate (CTOR)",
        desc: "Click-to-open rate (CTOR) = unique subscriber clicks divided by UNIQUE OPENS, as a percentage — engagement among those who opened, NOT among…",
        sql: "SELECT 100.0 * SUM(\"Summary_SubscriberClicks\") / NULLIF(SUM(\"Summary_UniqueOpens\"),0) FROM \"Campaigns\". Denominator is unique opens, not EmailsSent" },
    ],
  },
  {
    label: "Web & Product",
    sources: ["amplitude", "googleanalytics", "linkedinads"],
    total: 75,
    metrics: [
      { p: "amplitude", alias: "active_users", name: "Active users (unique)",
        short: "Number of unique active users",
        desc: "Number of unique active users. Use \"AmplitudeId\" — Amplitude's canonical cross-device user identity — via COUNT(DISTINCT \"AmplitudeId\") over…",
        sql: "SELECT\n  COUNT(DISTINCT \"AmplitudeId\")\nFROM \"Events\"" },
      { p: "amplitude", alias: "events_per_active_user", name: "Events per active user",
        short: "Average number of events per unique active user",
        desc: "Average number of events per unique active user = COUNT(*) / COUNT(DISTINCT \"AmplitudeId\") over \"Events\" — Amplitude's cross-device identity.",
        sql: "SELECT CAST(COUNT(*) AS FLOAT) / NULLIF(COUNT(DISTINCT \"AmplitudeId\"),0) FROM \"Events\"" },
      { p: "amplitude", alias: "purchase_conversion_rate", name: "Purchase conversion rate (users) (%)",
        short: "Percentage of active users who fired at least one…",
        desc: "Percentage of active users who fired at least one 'purchase' event. User-level, not event-level: a user who bought twice counts once.",
        sql: "SELECT\n  COUNT(DISTINCT \"AmplitudeId\")\nFROM \"Events\"\n-- report as a percentage, user-level NOT event-level" },
      { p: "amplitude", alias: "error_rate", name: "Error event rate (%)",
        short: "Percentage of events that are application errors",
        desc: "Percentage of events that are application errors, measured over every event in the stream. Governed: error events carry Type = 'app_error'.",
        sql: "SELECT 100.0 * SUM(CASE WHEN \"Type\" = 'app_error' THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0) FROM \"Events\"" },
      { p: "googleanalytics", alias: "engagement_rate_pct", name: "Engagement rate (%)",
        short: "Pooled engagement rate",
        desc: "Pooled engagement rate = 100 * SUM(\"EngagedSessions\") / SUM(\"Sessions\") over the period, in ONE query — never a mean of daily rates.",
        sql: "SELECT 100.0 * SUM(\"EngagedSessions\") / NULLIF(SUM(\"Sessions\"),0) FROM \"CompleteAnalytics\" WHERE \"Date\" >= '2026-01-01' AND \"Date\" <= '2026-07-10'. Use EXACTLY the date window 2026-01-01..2026-07-10 and filter ONLY on \"Date\" - do NOT filter on \"Year\"/\"Month\"/other date dimensions (they change GA4's user deduplication and return different totals)" },
      { p: "googleanalytics", alias: "bounce_rate_pct", name: "Bounce rate (%)",
        short: "Pooled bounce rate",
        desc: "Pooled bounce rate = 100 * (1 - SUM(\"EngagedSessions\") / SUM(\"Sessions\")) over the period, in ONE query. The inverse of the engagement rate.",
        sql: "SELECT 100.0 - 100.0 * SUM(\"EngagedSessions\") / NULLIF(SUM(\"Sessions\"),0) FROM \"CompleteAnalytics\" WHERE \"Date\" >= '2026-01-01' AND \"Date\" <= '2026-07-10'. Use EXACTLY the date window 2026-01-01..2026-07-10 and filter ONLY on \"Date\" - do NOT filter on \"Year\"/\"Month\"/other date dimensions (they change GA4's user deduplication and return different totals)" },
      { p: "googleanalytics", alias: "session_key_event_rate_pct", name: "Session key-event rate (%)",
        short: "Share of sessions with a key event",
        desc: "Share of sessions with a key event. Use EXACTLY the date window 2026-01-01..2026-07-10 and filter ONLY on \"Date\" - do NOT filter on…",
        sql: "100 * SUM(\"KeyEvents\") / SUM(\"Sessions\") over the period, in ONE query (approximation: key events per 100 sessions; do not average the per-row \"SessionKeyEventRate\")" },
      { p: "linkedinads", alias: "organic_engagement_rate_pct", name: "Organic engagement rate (%)",
        short: "Pooled organic engagement rate",
        desc: "Pooled organic engagement rate = 100 * (clicks + likes + comments + shares) / impressions over the window 2025-07-01..2026-06-30 (filter ONLY on…",
        sql: "SELECT SUM(\"ImpressionCount\") ...; then compute 100*step1/step2 YOURSELF. Gotcha: do NOT sum or average the per-row \"Engagement\" column (a precomputed per-row rate) - use the four count columns. CRITICAL connector quirk: this connector DROPS parentheses that follow a multiplier - '100.0 * (SUM(a)+SUM(b)) / SUM(c)' is silently evaluated as '100.0*SUM(a) + SUM(b) + ...' and returns garbage. NEVER multiply a parenthesized sum in SQL here: run the queries below and do the arithmetic YOURSELF" },
      { p: "linkedinads", alias: "organic_ctr_pct", name: "Organic click-through rate (%)",
        short: "Organic click-through rate",
        desc: "Organic click-through rate: pooled clicks divided by pooled impressions over the window. Float 100.0 FIRST (integer-division trap).",
        sql: "100.0 * SUM(\"ClickCount\")\n       / SUM(\"ImpressionCount\")\n-- over the window, in ONE query" },
      { p: "linkedinads", alias: "net_follower_gains", name: "Net follower gains",
        short: "Total follower gains",
        desc: "Total follower gains, paid plus organic. In this account paid gains are 0 - the answer equals organic gains; still sum BOTH columns.",
        sql: "SUM(\"PaidFollowerGains\") + SUM(\"OrganicFollowerGains\") FROM \"FollowerDailyStatistics\" over the window, in ONE query (the connector supports adding two SUMs)" },
    ],
  },
  {
    label: "Data & Engineering",
    sources: ["snowflake", "github", "jira_new"],
    total: 74,
    metrics: [
      { p: "snowflake", alias: "net_revenue_snow", name: "Net revenue (recognized)",
        short: "Recognized revenue",
        desc: "Recognized revenue = SUM(\"TOTAL_AMOUNT\") over orders whose fulfilment has begun: STATUS IN ('Completed','Shipped').",
        sql: "SELECT SUM(\"TOTAL_AMOUNT\") FROM \"PUBLIC\".\"ORDERS\" WHERE \"STATUS\" IN ('Completed','Shipped'). Gotcha: do NOT sum every order (that is gross bookings, 793.01) - Pending+Cancelled (60.89) must be dropped. Money is decimal dollars, not cents" },
      { p: "snowflake", alias: "aov_net", name: "Average order value (recognized)",
        short: "Average order value on recognized orders",
        desc: "Average order value on recognized orders = recognized revenue divided by the number of orders that are 'Completed' or 'Shipped'.",
        sql: "-- numerator\nSELECT SUM(\"TOTAL_AMOUNT\") FROM \"PUBLIC\".\"ORDERS\"\nWHERE \"STATUS\" IN ('Completed','Shipped')\n-- denominator\nSELECT COUNT(*) FROM \"PUBLIC\".\"ORDERS\"\nWHERE \"STATUS\" IN ('Completed','Shipped')" },
      { p: "snowflake", alias: "repeat_purchase_rate", name: "Repeat purchase rate",
        short: "Share of ordering customers who placed 2+ orders",
        desc: "Share of ordering customers who placed 2+ orders = 100 * repeat customers / customers who ever ordered. Run as two counts, then divide.",
        sql: "-- numerator\nSELECT COUNT(*) FROM (\n  SELECT \"CUSTOMER_ID\" FROM \"PUBLIC\".\"ORDERS\"\n  GROUP BY \"CUSTOMER_ID\" HAVING COUNT(*)>=2\n) t\n-- denominator\nSELECT COUNT(DISTINCT \"CUSTOMER_ID\")\nFROM \"PUBLIC\".\"ORDERS\"" },
      { p: "snowflake", alias: "fulfillment_rate", name: "Fulfillment rate",
        short: "Share of orders that are recognized",
        desc: "Share of orders that are recognized = 100 * orders that are 'Completed' or 'Shipped' / all orders, Pending and Cancelled included.",
        sql: "-- numerator\nSELECT COUNT(*) FROM \"PUBLIC\".\"ORDERS\"\nWHERE \"STATUS\" IN ('Completed','Shipped')\n-- denominator\nSELECT COUNT(*) FROM \"PUBLIC\".\"ORDERS\"" },
      { p: "github", alias: "commits_per_author", name: "Commits per author (pooled)",
        short: "Pooled commits per distinct author",
        desc: "Pooled commits per distinct author = total commits / distinct authors, window 2025-01-01..2026-06-30. Two queries, divided afterwards.",
        sql: "SELECT COUNT(DISTINCT \"CommitAuthorName\") ...; divide step1/step2 YOURSELF. CamelCase column names (CommitAuthorName). After running the queries, compute the final result YOURSELF from the returned numbers - do NOT run an extra SQL query just to divide. (Combining COUNT(*) and COUNT(DISTINCT ...) with arithmetic in ONE query returns a silent empty result on this connector - always use two separate queries here.)" },
      { p: "github", alias: "repo_open_issue_backlog", name: "Repo-level open issue backlog",
        short: "Total open issues as reported on the repository…",
        desc: "Total open issues as reported on the repository records. Gotcha: GitHub's per-repo OpenIssuesCount INCLUDES open pull requests (GitHub counts…",
        sql: "SELECT\n  SUM(\"OpenIssuesCount\")\nFROM \"Repositories\"" },
      { p: "github", alias: "distinct_commit_authors", name: "Distinct commit authors",
        short: "Distinct commit author names in the window",
        desc: "Distinct commit author names in the window. Column names here are CamelCase WITHOUT underscores (CommitAuthorDate, CommitAuthorName,…",
        sql: "SELECT\n  COUNT(DISTINCT \"CommitAuthorName\")\nFROM \"RepositoryCommits\"\n-- over the pinned window" },
      { p: "jira_new", alias: "issues_created", name: "Issues created",
        short: "Count of issues created in the period",
        desc: "Count of issues created in the period. Anchored on \"CreatedDate\", so an issue lands in the period it was opened, not when it moved.",
        sql: "SELECT COUNT(*) FROM \"Issues\" WHERE \"CreatedDate\" >= :start AND \"CreatedDate\" < :end_exclusive. Anchor on \"CreatedDate\"" },
      { p: "jira_new", alias: "issues_resolved", name: "Issues resolved",
        short: "Count of issues resolved in the period",
        desc: "Count of issues resolved in the period. Anchored on \"ResolutionDate\": an issue counts as resolved only once that field is set.",
        sql: "SELECT COUNT(*) FROM \"Issues\" WHERE \"ResolutionDate\" >= :start AND \"ResolutionDate\" < :end_exclusive. An issue is resolved when \"ResolutionDate\" is set" },
      { p: "jira_new", alias: "resolution_rate", name: "Resolution rate (%)",
        short: "Throughput ratio for THIS period as a percentage",
        desc: "Throughput ratio for THIS period as a percentage. Run EXACTLY two fresh queries for the SAME period and divide: resolved = SELECT COUNT(*) FROM…",
        sql: "SELECT COUNT(*) FROM \"Issues\" WHERE \"CreatedDate\" >= :start AND \"CreatedDate\" < :end_exclusive. ANSWER = 100.0 * resolved / created. Use both counts from THIS period only; never hardcode or reuse numbers from another question. Above 100% means more closed than opened" },
    ],
  },
  {
    label: "Planning & Work",
    sources: ["clickup", "aha", "slack"],
    total: 75,
    metrics: [
      { p: "clickup", alias: "total_tasks", name: "Total tasks",
        short: "Every task in the workspace, whatever its status",
        desc: "Total tasks. A straight COUNT(*) over \"TeamTasks\", so every task counts whatever its status - open, in progress or already closed.",
        sql: "SELECT\n  COUNT(*)\nFROM \"TeamTasks\"" },
      { p: "clickup", alias: "open_task_count", name: "Open (not-done) task count",
        short: "Not-done tasks",
        desc: "Not-done tasks. ClickUp status TYPES are open/custom/closed; 'closed' = done, so not-done includes 'open' and in-progress 'custom'.",
        sql: "SELECT COUNT(*)\nFROM \"TeamTasks\"\nWHERE \"Status_Type\" <> \'closed\'" },
      { p: "clickup", alias: "completion_rate_pct", name: "Task completion rate (%)",
        short: "Share of tasks done",
        desc: "Share of tasks done = 100 * closed / all. Numerator SELECT COUNT(*) FROM \"TeamTasks\" WHERE \"Status_Type\"='closed'; denominator SELECT COUNT(*)…",
        sql: "-- numerator\nSELECT COUNT(*) FROM \"TeamTasks\"\nWHERE \"Status_Type\"='closed'\n-- denominator\nSELECT COUNT(*) FROM \"TeamTasks\"" },
      { p: "clickup", alias: "overdue_rate_pct", name: "Overdue rate among open tasks (%)",
        short: "Of not-done tasks, share overdue",
        desc: "Of not-done tasks, share overdue = 100 * overdue / not-done. Numerator SELECT COUNT(*) FROM \"TeamTasks\" WHERE \"Status_Type\" <> 'closed' AND…",
        sql: "-- numerator\nSELECT COUNT(*) FROM \"TeamTasks\"\nWHERE \"Status_Type\" <> 'closed'\n  AND \"DueDate\" < '2026-07-10'\n-- denominator\nSELECT COUNT(*) FROM \"TeamTasks\"\nWHERE \"Status_Type\" <> 'closed'" },
      { p: "aha", alias: "on_track_initiative_rate_pct", name: "On-track initiative rate (%)",
        short: "Share of initiatives on track",
        desc: "Share of initiatives on track = 100 * COUNT(Status='on_track') / COUNT(all). Run TWO queries. Gotcha: exact lowercase status 'on_track'.",
        sql: "100 * COUNT(Status='on_track') / COUNT(all)\n-- run as TWO queries, then divide yourself\n-- exact lowercase status: 'on_track'\n-- statuses: on_track, at_risk,\n--           not_started, some_progress" },
      { p: "aha", alias: "at_risk_initiative_rate_pct", name: "At-risk initiative rate (%)",
        short: "Share of initiatives at risk",
        desc: "Share of initiatives at risk = 100 * COUNT(Status='at_risk') / COUNT(all) over all initiatives. Run TWO queries. Exact status 'at_risk'.",
        sql: "100 * COUNT(Status='at_risk') / COUNT(all)\n-- run as TWO queries, then divide yourself\n-- exact lowercase status: 'at_risk'" },
      { p: "aha", alias: "shipped_idea_rate_pct", name: "Shipped idea rate (%)",
        short: "Share of ideas that shipped",
        desc: "Share of ideas that shipped = 100 * COUNT(WorkflowStatus_Name='Shipped') / COUNT(all ideas). Run TWO queries.",
        sql: "100 * COUNT(WorkflowStatus_Name='Shipped')\n     / COUNT(all ideas)\n-- run as TWO queries, then divide yourself" },
      { p: "slack", alias: "thread_coverage_pct", name: "Thread Coverage %",
        short: "Share of visible public-history rows that anchor a…",
        desc: "Share of visible public-history rows that anchor a thread. Use ThreadId in the history table, NOT the Replies table (it times out).",
        sql: "100 * threaded / all rows, TWO queries on \"PublicChannelsHistory\": COUNT(*) WHERE \"ThreadId\" IS NOT NULL; and COUNT(*)" },
      { p: "slack", alias: "resolved_share_of_ticket_mentions_pct", name: "Resolved Share of Ticket Mentions %",
        short: "Share of ticket-referencing messages that report a…",
        desc: "Share of ticket-referencing messages that report a RESOLVED ticket. Both queries run across ALL public channels.",
        sql: "100 * resolved / ticket mentions, TWO queries on \"PublicChannelsHistory\": COUNT(*) WHERE \"Text\" LIKE '%resolved%'; and COUNT(*) WHERE \"Text\" LIKE '%ticket #%'" },
      { p: "slack", alias: "escalation_note_count", name: "Escalation Note Count",
        short: "Messages across all public channels containing an…",
        desc: "Messages across all public channels containing an escalation (the word stem 'escalat' covers 'escalating' and 'escalation').",
        sql: "SELECT COUNT(*)\nFROM \"PublicChannelsHistory\"\nWHERE \"Text\" LIKE '%escalat%'" },
    ],
  },
];
