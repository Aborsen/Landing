import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckIcon from '../components/CheckIcon';
import BottomCTABlock from '../components/BottomCTA';
import Button from '../components/Button';
import SearchInput from '../components/SearchInput';

/* ── INSIGHTIS LOGO MARK SVG ── */
function InsightisLogoMark({ size = 60, opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity}}>
      <path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="var(--ins-text-highlight)"/>
    </svg>
  );
}

/* ── PROMPT LIBRARY HERO ── */
function PromptLibraryHero() {
  return (
    <section style={{padding:'80px 0 40px', textAlign:'center', position:'relative'}}>
      <div style={{maxWidth:'720px', margin:'0 auto', padding:'0 24px'}}>
        <div className="fu0" style={{display:'inline-flex', alignItems:'center', gap:'6px', padding:'6px 14px', borderRadius:'999px', border:'1px solid var(--ins-color-white-a-07)', background:'var(--ins-color-white-a-03)', fontSize:'var(--ins-font-size-12)', color:'var(--ins-text-body)', fontWeight:500, letterSpacing:'0.04em', marginBottom:'var(--ins-size-6)'}}>
          ✦ PROMPT LIBRARY
        </div>
        <h1 className="ins-text-display" style={{marginBottom:'var(--ins-size-5)'}}>
          Prompts for every team
        </h1>
        <p className="fu2 ins-text-body-xl" style={{maxWidth:'560px', margin:'0 auto'}}>
          Curated prompt templates for analytics, ops, and go-to-market teams — connected to the tools you already use.
        </p>
      </div>
    </section>
  );
}

/* ── DATA SOURCE ICONS (inline SVG marks) ── */
const DS_ICON = {
  'salesforce':        (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#00A1E0"><path d="M10.5 5.5A4.5 4.5 0 0 0 7 8a3 3 0 0 0-1 5.83A4 4 0 0 0 10 19a4 4 0 0 0 3.87-3 3.5 3.5 0 0 0 5-4A4.5 4.5 0 0 0 14.5 6.5 4.48 4.48 0 0 0 10.5 5.5z"/></svg>,
  'hubspot':           (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#FF7A59"><circle cx="17" cy="12" r="4"/><path d="M16 6V3h2v3z"/><circle cx="7" cy="7" r="2"/><path d="M7 9v10h2V9z"/></svg>,
  'snowflake':         (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#29B5E8"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/><circle cx="12" cy="12" r="2.5"/></svg>,
  'bigquery':          (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#4285F4"><circle cx="12" cy="12" r="8" fill="none" stroke="#4285F4" strokeWidth="2"/><path d="M16 16l4 4" stroke="#4285F4" strokeWidth="2" strokeLinecap="round"/></svg>,
  'google-analytics':  (s=12)=><svg width={s} height={s} viewBox="0 0 24 24"><rect x="16" y="4" width="4" height="16" rx="2" fill="#F9AB00"/><rect x="10" y="10" width="4" height="10" rx="2" fill="#E37400"/><circle cx="6" cy="18" r="2" fill="#E37400"/></svg>,
  'google-ads':        (s=12)=><svg width={s} height={s} viewBox="0 0 24 24"><path d="M10 4L4 14l6 4 6-10z" fill="#4285F4"/><circle cx="16" cy="17" r="3" fill="#34A853"/><path d="M14 4l-4 10 4 4 6-10z" fill="#FBBC04"/></svg>,
  'google-sheets':     (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#0F9D58"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4" fill="#0B8043"/><path d="M8 11h8v1H8zm0 3h8v1H8zm0 3h8v1H8z" fill="#fff"/></svg>,
  'google-drive':      (s=12)=><svg width={s} height={s} viewBox="0 0 24 24"><path d="M7 4l-5 9 3 5 5-9z" fill="#0F9D58"/><path d="M17 4H7l5 9h10z" fill="#FFCA28"/><path d="M22 13H12l-3 5h10z" fill="#4285F4"/></svg>,
  'slack':             (s=12)=><svg width={s} height={s} viewBox="0 0 24 24"><rect x="10" y="2" width="3" height="12" rx="1.5" fill="#E01E5A"/><rect x="2" y="10" width="12" height="3" rx="1.5" fill="#36C5F0"/><rect x="14" y="10" width="8" height="3" rx="1.5" fill="#2EB67D"/><rect x="10" y="14" width="3" height="8" rx="1.5" fill="#ECB22E"/></svg>,
  'jira':              (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#0052CC"><path d="M11 2L2 11l9 9 9-9zM11 8l6 6-6 6-6-6z" fillOpacity=".8"/></svg>,
  'pipedrive':         (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#000"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h4a3 3 0 0 1 0 6H10v4H8z" fill="#fff"/></svg>,
  'zoho':              (s=12)=><svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#2098D1" strokeWidth="2"/><path d="M7 10h10M7 14h7" stroke="#E8BE2E" strokeWidth="2" strokeLinecap="round"/></svg>,
  'netsuite':          (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#1A1A1A"><rect x="3" y="3" width="18" height="18" rx="2"/><text x="12" y="15" textAnchor="middle" fontSize="8" fontWeight="700" fill="#F58220" fontFamily="Arial">N</text></svg>,
  'dynamics':          (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#002050"><path d="M3 4l9 2v12l-9 2zM13 7l8-2v14l-8-2z"/></svg>,
  'redshift':          (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#8C4FFF"><path d="M4 6l8-3 8 3v12l-8 3-8-3z" fillOpacity=".9"/><path d="M12 3v18" stroke="#fff" strokeWidth="1"/></svg>,
  'databricks':        (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#FF3621"><path d="M4 7l8 4 8-4v3l-8 4-8-4zm0 6l8 4 8-4v3l-8 4-8-4z"/></svg>,
  'azure':             (s=12)=><svg width={s} height={s} viewBox="0 0 24 24"><path d="M13 4l8 16H8l5-8-3-2z" fill="#0078D4"/><path d="M3 20l6-12h4l-5 8 3 4z" fill="#5EA0EF"/></svg>,
  'asana':             (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#F06A6A"><circle cx="12" cy="7" r="3"/><circle cx="7" cy="16" r="3"/><circle cx="17" cy="16" r="3"/></svg>,
  'freshdesk':         (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#25C16F"><circle cx="12" cy="12" r="9"/><path d="M8 12a4 4 0 0 1 8 0v4H8z" fill="#fff"/></svg>,
  'zendesk':           (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#03363D"><path d="M3 5h8v14zm10 14c0-4 4-7 8-7V5H13z"/></svg>,
  'linkedin':          (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#0A66C2"><path d="M4 4h4v16H4zM10 9h4v2a4 4 0 0 1 7 3v6h-4v-5a2 2 0 0 0-4 0v5h-3z"/><circle cx="6" cy="5" r="2"/></svg>,
  'workday':           (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#0875E1"><path d="M3 8h2l2 8 2-6h2l2 6 2-8h2l-3 10h-3l-1-4-1 4H7z"/></svg>,
};

/* ── TAXONOMIES ── */

const TEAMS = [
  'Account Management','Accounting','Business Analytics',
  'Business Development','Business Intelligence','Customer Success',
  'Data Analytics','Developer Marketing','Marketing','Product Management',
  'Product Marketing','Revenue Operations','Sales Directors','Sales Leadership',
];

const PROMPTS = [
  { title:'Renewal Risk Forecasting',
    teams:['Account Management','Customer Success'],
    prompt:'For every account with a renewal due in the next 120 days, pull product usage trend (last 90 days vs prior 90), executive-sponsor activity, open support ticket severity, ARR, and contract terms. Score renewal risk 0-100 using a weighted model (40% usage, 25% support, 20% sponsor, 15% contract). Output the top 30 at-risk accounts with the two strongest negative signals, suggested save play, and the AM who owns the relationship.' },
  { title:'Expansion Opportunity Heatmap',
    teams:['Account Management'],
    prompt:'Across the AM book of business, identify accounts where product usage has grown >40% QoQ but no expansion conversation has been logged. For each, compute available headroom (licensed seats vs active users, feature-tier ceiling, adjacent products with zero usage). Output a ranked expansion target list with estimated upsell ARR and the trigger event to reference in outreach.' },
  { title:'Account Health Dashboard',
    teams:['Account Management','Customer Success'],
    prompt:'Build a quarterly account-health dashboard for every Enterprise account. Inputs: weekly active users, daily active users, feature breadth, NPS, support ticket volume, exec-sponsor engagement, payment history, expansion vs contraction ARR. Output a 4-quadrant grid (Healthy/Growing, At-Risk/Recoverable, Champion, Detractor) with each account placed once, plus a sentence explaining the placement.' },
  { title:'QBR Data Pack Generator',
    teams:['Account Management'],
    prompt:'For the next QBR, pull a 12-page data pack for the account: ARR history, seat utilization, feature adoption vs cohort, top 5 product wins, top 3 friction points (cross-referenced support tickets), executive-stakeholder activity, peer benchmark (anonymized), open opportunities, and recommended next 90-day milestones. Format as slide-ready bullets, not paragraphs.' },
  { title:'Stakeholder Engagement Map',
    teams:['Account Management'],
    prompt:'For the top 25 accounts by ARR, map every known stakeholder: role, persona (champion / decision maker / blocker / unknown), last touch date, last touch type (email / meeting / event), and current engagement level. Highlight accounts with single-thread risk (only one engaged contact) and propose the next stakeholder to multi-thread into.' },
  { title:'Adoption Plateau Detection',
    teams:['Account Management','Customer Success','Product Management'],
    prompt:'Find every account whose product usage has flatlined or declined for 6+ weeks. For each, segment by current adoption depth (Activated / Habituated / Champion). Output the accounts where a one-feature reveal or workflow nudge has historically restored growth in similar cohorts, with the specific play to run and the AM to brief.' },
  { title:'Monthly Close Progress Tracker',
    teams:['Accounting'],
    prompt:'For the current close, list every task in the close checklist with: owner, planned completion day (1-10), actual completion day, blockers, and any related journal-entry status. Flag tasks more than one day late and tasks with the same owner overloading the same day. Output a Gantt-style table and a top-3 list of items to expedite to hit a 5-day close.' },
  { title:'AR Aging Risk Analysis',
    teams:['Accounting','Revenue Operations'],
    prompt:'Pull AR aged 30/60/90/120+ days. For each invoice >90 days, attach: customer name, balance, last touch date, last response, days since last payment of any size, customer credit history, and any ongoing renewal discussion. Output a collections priority list with predicted recovery probability (High/Med/Low) and the recommended next action per account.' },
  { title:'ASC 606 Revenue Recognition Audit',
    teams:['Accounting'],
    prompt:'For every contract booked this quarter, validate the revenue recognition schedule: identify performance obligations, allocate transaction price, confirm timing (point-in-time vs over time), and reconcile against billing schedule. Flag contracts where the recognized amount diverges from expected by more than $500 or one period. Output a remediation list grouped by root cause.' },
  { title:'Expense Category Drift Alert',
    teams:['Accounting','Business Analytics'],
    prompt:'Compare each expense category this month vs the trailing 6-month average, segmented by department. Flag categories with >20% drift in either direction. For upward drift, attach the top 5 contributing transactions; for downward drift, check whether expected expenses simply have not yet been booked. Output a one-line variance note per category for the close packet.' },
  { title:'Cash Flow 13-Week Forecast',
    teams:['Accounting','Business Analytics'],
    prompt:'Build a 13-week cash flow forecast: expected receipts from open AR with collection-probability weighting, expected billings from booked contracts, planned outflows from AP and payroll, and one-time items. Output the weekly cash position with a low/expected/high band and a list of weeks where the bottom of the band falls below the minimum operating threshold.' },
  { title:'Bank Reconciliation Anomaly Sweep',
    teams:['Accounting'],
    prompt:'Reconcile every bank account against the ledger for the last 60 days. List unmatched transactions, duplicate postings, unusual round-number transfers, and any payment that breaks a typical vendor cadence. For each anomaly, propose an explanation (timing diff, missed entry, possible error) and the journal entry needed to clear it.' },
  { title:'Outbound Sequence Performance',
    teams:['Marketing'],
    prompt:'For every active outbound sequence, compute reply rate, positive reply rate, meeting-booked rate, and unsubscribe rate by step. Segment by persona and account tier. Highlight sequences with low step-1 open rates (subject line problem) vs high open but low reply (body problem) vs strong reply but low meeting-set (qualifier problem). Recommend 3 changes to test next.' },
  { title:'Meeting-Set Quality Scoring',
    teams:['Sales Directors'],
    prompt:'For meetings set by BDRs in the last 60 days, compute: AE acceptance rate, AE meeting-held rate, opportunity-creation rate, and average opportunity ARR. Score each BDR\'s meeting-set quality. Identify BDRs whose volume is healthy but quality lags, and the most common reason their meetings get rejected (wrong persona, wrong fit, wrong stage).' },
  { title:'Outbound vs Inbound Pipeline Contribution',
    teams:['Marketing'],
    prompt:'Quarter-to-date, split pipeline created by source: BDR outbound, inbound marketing, partner-sourced, AE-self-sourced. For each source, show count, total ARR, win rate, sales cycle length, and ACV. Compare to the prior two quarters. Identify whether the BDR team\'s contribution is rising or falling and propose two adjustments to the territory plan.' },
  { title:'Weekly KPI Executive Snapshot',
    teams:['Business Analytics','Sales Leadership'],
    prompt:'Every Monday 7am, generate a 1-page exec snapshot: bookings WoW and QTD vs plan, pipeline coverage, churned ARR, new logos, NPS, weekly active users, monthly active users, and gross margin. For each metric, show value, vs-plan delta, and trend arrow. Add three sentences of context explaining the biggest movers since last week. Cap at 250 words total.' },
  { title:'Department Spend vs Budget',
    teams:['Business Analytics','Accounting'],
    prompt:'Pull actual spend by department vs budget for the current quarter. Identify the three departments most over/under, decompose the variance by spend category (headcount, software, marketing programs, services, T&E), and flag any department on pace to exceed the full-year budget. Output a one-line action note per department for the CFO review.' },
  { title:'Signup Cohort Behavior Analysis',
    teams:['Business Analytics','Product Management'],
    prompt:'For users who signed up in each of the last 6 months, plot day-1, day-7, day-30, and day-90 retention. Identify the cohort with the best 90-day retention and the cohort with the worst. Compare their acquisition channels, persona mix, and feature-first-touch. Output the three actions most likely to make later cohorts look like the best one.' },
  { title:'North Star Metric Breakdown',
    teams:['Business Analytics'],
    prompt:'Decompose the company north-star metric (Weekly Active Teams) into its 4 input drivers: new teams activated, dormant teams revived, teams retained, teams expanded. For each driver, show contribution to last quarter\'s movement, current run-rate vs target, and the leading indicator that moves it. Output a single chart and 3 bullet takeaways.' },
  { title:'Funnel Conversion by Segment',
    teams:['Business Analytics','Marketing'],
    prompt:'Build the full marketing-to-revenue funnel (Visitor → MQL → SQL → Opportunity → Closed Won) for the last 90 days, segmented by company size, industry, and acquisition channel. Show absolute counts, stage-to-stage conversion rates, and median time-in-stage. Highlight the segment+channel combinations where conversion is significantly above or below average, with an explanation hypothesis.' },
  { title:'YoY Growth Attribution',
    teams:['Business Analytics','Sales Leadership'],
    prompt:'Compare this quarter\'s ARR vs the same quarter last year. Attribute the delta across: net-new logos, expansion, contraction, churn, and pricing changes. Within net-new, attribute further to channel (inbound, outbound, partner, paid). Output a waterfall chart, a one-line takeaway, and the channel/motion you would double down on next quarter.' },
  { title:'Partner-Sourced Pipeline Tracker',
    teams:['Business Development'],
    prompt:'For every partner-sourced opportunity in the last two quarters, pull partner name, source channel (referral, marketplace, co-marketing), opportunity stage, ARR, win rate, and sales-cycle length. Compare partner-sourced metrics to direct-sourced. Rank partners by sourced ARR and by win-rate improvement. Output the top 5 partners to invest more in and the bottom 5 to deprioritize.' },
  { title:'Co-Sell Opportunity Identification',
    teams:['Business Development'],
    prompt:'Cross-reference our active opportunities with the partner ecosystem: which open deals have a strategic partner already engaged at the same account, and which target accounts on our open pipeline have a partner with an existing footprint? Output a co-sell action list ranked by deal value × partner-fit score, with the recommended partner contact and play to run.' },
  { title:'Strategic Account Whitespace Map',
    teams:['Business Development'],
    prompt:'For each of the top 50 strategic accounts, list: our footprint (products owned, ARR, users), product whitespace (modules unsold), the org-chart whitespace (departments not engaged), and the partner whitespace (partners already in the account we have not engaged). Output a one-page whitespace summary per account with the single biggest unlock opportunity highlighted.' },
  { title:'Competitive Partner Activity Monitor',
    teams:['Business Development','Product Marketing'],
    prompt:'Monitor public signals from competitor-partner relationships in the last 90 days: joint announcements, integrations launched, marketplace listings added, co-marketing assets. For each, assess threat level (Low / Medium / High) to our partner motion and recommend a defensive or offensive countermove. Output a competitive briefing pack for the BD team.' },
  { title:'Channel Partner Enablement Scorecard',
    teams:['Business Development'],
    prompt:'For every active channel partner, score enablement health: trained reps, certifications, demo environments active, last training touch, pipeline registered in last 90 days, and average deal-cycle when they are involved. Identify partners who are well-enabled but underproducing, and partners who are producing despite low enablement (urgent training opportunity).' },
  { title:'Partnership ROI by Program',
    teams:['Business Development','Business Analytics'],
    prompt:'For each named partnership program (referral, technology, reseller, OEM), compute total investment (people, marketing dollars, integration eng-time), total sourced ARR, and ROI multiple. Compare against trailing 4-quarter average. Output a ranked program scorecard and recommend one program to expand and one to consolidate or close.' },
  { title:'Report Usage and Adoption Audit',
    teams:['Business Intelligence','Data Analytics'],
    prompt:'For every Looker/Tableau dashboard in production, pull: weekly viewers, monthly viewers, last view date, average view duration, and bounce rate. Identify dashboards with zero viewers in the last 90 days (deprecation candidates), dashboards with high traffic but short dwell time (potential redesign), and the top 10 most-used dashboards (protect from changes).' },
  { title:'Data Quality Scorecard by Source',
    teams:['Business Intelligence','Data Analytics'],
    prompt:'For each connected data source, compute: row freshness (median lag between source event and warehouse), null rate on critical fields, schema drift events in last 30 days, duplicate-record rate, and downstream-report breakage incidents. Output a quality scorecard with red/yellow/green per source and a top-3 list of sources that need attention this sprint.' },
  { title:'Self-Service Dashboard Inventory',
    teams:['Business Intelligence'],
    prompt:'Inventory every self-service dashboard across the company. For each, capture: owner, business unit, primary audience, last edit, certification status (Certified / Draft / Legacy), and number of distinct queries it triggers. Surface dashboards owned by departed employees, dashboards labeled "Draft" but with >50 weekly views, and duplicates measuring the same metric.' },
  { title:'Slow-Running Query Identification',
    teams:['Business Intelligence','Data Analytics'],
    prompt:'In the warehouse, find the top 25 slowest queries from the last 7 days by total compute time × frequency. For each, identify the dashboard/report that runs it, the table scan pattern, and whether a missing index, missing partition, or unused JOIN is the likely cause. Output a remediation backlog ordered by estimated compute savings.' },
  { title:'Cross-System Metric Reconciliation',
    teams:['Business Intelligence','Revenue Operations'],
    prompt:'Reconcile ARR/MRR as reported by Salesforce, NetSuite/Stripe, and the warehouse. For every account where the three numbers differ by more than $500/month, output: account name, each source\'s number, the delta, and the suspected cause (failed charge, unbilled upsell, stage timing, contract not yet activated). Sort by delta and cap at 50 rows.' },
  { title:'Stakeholder Report Request Triage',
    teams:['Business Intelligence'],
    prompt:'Across all BI tickets in the queue, classify by request type (new dashboard, dashboard fix, ad-hoc analysis, data access, training). Score each ticket by business value (requester level × downstream decision impact) and effort. Output a 2x2 triage grid (Quick Wins / Strategic / Slog / Backlog) with the top 5 to start this sprint.' },
  { title:'NPS Theme Cluster Analysis',
    teams:['Customer Success','Product Management'],
    prompt:'Pull all NPS responses from the last quarter (detractors, passives, promoters separately). Cluster open-text comments into themes. For each theme, show: count, average score, customer segment most affected, and a representative verbatim quote. Output the top 5 detractor themes with a CS-led action plan and the top 3 promoter themes to lean into for case studies.' },
  { title:'Onboarding Milestone Tracking',
    teams:['Customer Success'],
    prompt:'For every account in onboarding, track progress against the 7 standard onboarding milestones (kickoff complete, data connected, first metric defined, first dashboard shared, team invited, first AI Chat answer, first scheduled report). Flag accounts stuck on any milestone >7 days and accounts that hit "fully onboarded" but show no usage week 2.' },
  { title:'CSM Book-of-Business Workload',
    teams:['Customer Success'],
    prompt:'For each CSM, compute: number of accounts owned, total ARR managed, number of accounts in onboarding, number flagged at-risk, number due to renew in next 60 days, and weighted-workload score (account count × tier weight). Identify CSMs who are over-allocated and accounts that should be rebalanced. Recommend a new allocation plan.' },
  { title:'Adoption Gap Analysis',
    teams:['Customer Success','Product Management'],
    prompt:'For each customer segment, compare actual feature adoption against the segment\'s success profile (features that correlate with renewal). Identify the 3 features with the largest adoption gap. For each, list the accounts that have not adopted, their ARR, and an estimated revenue-at-risk if non-adoption continues. Recommend a campaign and the play per gap.' },
  { title:'Save Play Eligibility List',
    teams:['Customer Success','Account Management'],
    prompt:'For every account flagged at-risk this quarter, evaluate eligibility for each save play (training boost, exec sponsor intro, custom integration, discount-and-extend, executive air cover). Score each play by fit (history with this segment), capacity (effort needed), and ROI (ARR saved per hour). Recommend the single best play per account with the talking points.' },
  { title:'Health Score Model Tuning',
    teams:['Customer Success','Data Analytics'],
    prompt:'Back-test the current health score model against the last 12 months of renewals: at score X, what fraction actually renewed? Compute lift, precision, and recall by score band. Identify the most over- and under-weighted input signals. Recommend a new weighting and show the projected improvement in early at-risk detection (lead time before churn).' },
  { title:'Customer Segmentation Model',
    teams:['Data Analytics','Marketing'],
    prompt:'Build an unsupervised customer segmentation using: ARR tier, industry, company size, product mix, usage depth, and tenure. Aim for 5-7 clusters that maximize within-cluster similarity. For each cluster, output: persona summary, top 3 features used, top 3 features unused, average expansion rate, churn rate, and the marketing/CS play that best fits.' },
  { title:'Metric Anomaly Detection Sweep',
    teams:['Data Analytics','Business Intelligence'],
    prompt:'For every metric on the executive dashboard, run an anomaly check against its trailing 90-day baseline (z-score >2.5 or moving-average breach). Output a daily anomaly report: metric name, current value, expected band, deviation magnitude, and a hypothesis (data pipeline issue / true business change / seasonal effect). Rank by business impact.' },
  { title:'Causal Impact of Marketing Campaigns',
    teams:['Data Analytics','Marketing'],
    prompt:'For each major paid campaign in the last 90 days, build a causal impact model using a synthetic control group (matched non-targeted accounts). Compute the lift in pipeline-created and conversion-rate attributable to the campaign vs the control. Output a per-campaign causal scorecard and recommend which two to scale, which to cut, and which need a longer measurement window.' },
  { title:'Predictive Churn Risk Model',
    teams:['Data Analytics','Customer Success'],
    prompt:'Build a churn-prediction model using: product usage trends, support ticket volume and sentiment, executive engagement frequency, payment history, NPS, and account-tenure. Output: 30/60/90-day churn probability per account, the top three features driving each prediction (SHAP-style), and the segments where the model performs best vs worst.' },
  { title:'Cohort Retention Curve Generator',
    teams:['Data Analytics','Product Management'],
    prompt:'For each signup cohort in the last 12 months, plot a retention curve out to week 26. Compare cohorts on the same chart and identify cohorts that broke the trend (better or worse than expected). Cross-reference with product releases, marketing campaigns, and pricing changes to propose a causal story for the inflection.' },
  { title:'A/B Test Statistical Significance',
    teams:['Data Analytics','Product Management'],
    prompt:'For every currently-running A/B test, compute: sample size per arm, observed lift on the primary metric, current p-value, minimum-detectable-effect, and estimated days remaining to reach significance. Flag tests that have already crossed significance (recommend ship/kill), tests likely to be underpowered (recommend extend or abandon), and tests with concerning guardrail-metric movement.' },
  { title:'Developer Community Engagement Scorecard',
    teams:['Developer Marketing'],
    prompt:'Across GitHub, Slack, Discord, and forum, compute weekly: new community members, returning members, questions asked, questions answered (by us vs by community), average response time, and sentiment. Identify the top 10 most-active community members of the quarter and recommend each for an MVP/advocate program with a personalized outreach hook.' },
  { title:'Docs Search Analytics',
    teams:['Developer Marketing','Product Marketing'],
    prompt:'Pull docs-site search queries from the last 30 days. Identify: top 20 successful searches (high click-through to articles), top 20 zero-result searches (content gap), and top 20 searches followed by a support ticket within 24 hours (docs not solving the problem). Output a docs roadmap with the article to write or improve for each high-impact gap.' },
  { title:'SDK Adoption Metrics',
    teams:['Developer Marketing'],
    prompt:'For each SDK (JS, Python, Go, Ruby), compute: weekly active integrations, npm/pip/etc download trend, GitHub stars trend, version distribution across active integrations, and percentage of integrations stuck on outdated versions. Identify SDKs where the version skew indicates a breaking-change problem and recommend the next migration nudge.' },
  { title:'GitHub Activity to ARR Correlation',
    teams:['Developer Marketing','Sales Leadership'],
    prompt:'Cross-reference GitHub org activity (commits, PRs, issues filed against our SDKs) with CRM ARR. Identify accounts whose engineers are highly active on our repos but whose ARR has flatlined (expansion opportunity), and accounts where engineering activity dropped sharply (early churn signal). Output a joint list for the AE/AM team with the suggested play per account.' },
  { title:'Developer Event ROI Analysis',
    teams:['Developer Marketing'],
    prompt:'For each developer event sponsored in the last 12 months (conference booth, hackathon, meetup, talk), compute attributed signups, attributed activations, attributed accounts created, attributed pipeline ARR, and total cost (sponsorship, travel, swag, content production). Output a ranked event scorecard and recommend the 3 events to sponsor again and the 2 to drop.' },
  { title:'Community Bug to PR Conversion',
    teams:['Developer Marketing'],
    prompt:'For every bug or feature request opened by a community member on GitHub in the last 6 months, track whether it was: ignored, acknowledged by us, fixed by us, fixed by the community (PR merged), or still open. Compute the community-PR conversion rate, average time-to-merge, and identify community members whose PRs are accepted at >80% rate (advocate candidates).' },
  { title:'Multi-Touch Attribution Deep-Dive',
    teams:['Marketing','Revenue Operations'],
    prompt:'For every Closed-Won opportunity this quarter, trace every recorded marketing touchpoint from first-click to close (paid, organic, content, events, webinars, email). Apply a linear, time-decay, and W-shape attribution model in parallel and show the credit distribution by channel under each. Highlight the model where the channel mix changes most and discuss why.' },
  { title:'Content Engagement by Persona',
    teams:['Marketing','Product Marketing'],
    prompt:'For every long-form content asset published in the last 90 days, segment readers by inferred persona (job title + industry). Compute by-persona time-on-page, scroll depth, asset shares, and downstream conversion. Identify the top 3 underperforming assets for the biggest persona (revenue ops) and the top 3 high-performing assets to replicate.' },
  { title:'SEO Performance by Intent Cluster',
    teams:['Marketing'],
    prompt:'Cluster every keyword we rank on by search intent (informational, transactional, navigational, comparison). For each cluster, show: number of keywords ranking, average position, total clicks, total impressions, and click-through rate. Identify the cluster with the best CTR but worst average position (highest-ROI improvement opportunity) and propose 5 page-level optimizations.' },
  { title:'Webinar to MQL Conversion',
    teams:['Marketing'],
    prompt:'For every webinar in the last 12 months, compute: registrants, attendees, attendance rate, MQL conversion rate (within 7/30/90 days), SQL conversion, and downstream pipeline ARR. Compare to the benchmark for the topic category. Identify the topic/format combination that consistently outperforms and recommend the next three webinars to schedule.' },
  { title:'ABM Target Account Engagement Score',
    teams:['Marketing','Sales Directors'],
    prompt:'For every target account in the ABM program, compute an engagement score from: known-account web sessions, content downloads, event interactions, LinkedIn ad engagement, and meeting requests. Bucket into Cold / Warming / Engaged / Active. Output the accounts that moved up at least one bucket this month and the recommended sales play per bucket transition.' },
  { title:'Email Campaign Performance Benchmark',
    teams:['Marketing'],
    prompt:'Across the last 50 marketing emails sent, compute open rate, click rate, click-to-open ratio, unsubscribe rate, and downstream MQL conversion. Segment by campaign type (nurture, product update, event invite, content promotion). Identify the subject-line patterns and send-time windows that consistently outperform and recommend the next test to run.' },
  { title:'Feature Adoption by Segment',
    teams:['Product Management'],
    prompt:'For each major feature shipped in the last 12 months, compute: percentage of accounts that have ever used it, percentage that use it weekly, time-to-first-use from feature availability, and adoption rate by segment (size, industry, persona). Identify features with low adoption in a target segment that should adopt them, and recommend a PMM/CS play to drive adoption.' },
  { title:'Friction Point Identification',
    teams:['Product Management'],
    prompt:'For each step in the core product workflow, compute completion rate, time-to-complete, and rage-click/back-button signals. Identify the three steps where users drop off most. Cross-reference with support tickets and session-replay clusters to attach a probable cause. Output a friction-removal backlog ranked by user impact × estimated effort.' },
  { title:'Backlog Prioritization by Customer Impact',
    teams:['Product Management'],
    prompt:'Across the open Jira backlog, score each item by: number of customer requests linked, total ARR of requesting accounts, severity of related support tickets, and strategic-fit (label-based). Output a re-ranked top 50 backlog with the new score, the previous rank, and a one-line justification for each item that moved up or down by 10+ places.' },
  { title:'Beta Cohort Behavior Analysis',
    teams:['Product Management'],
    prompt:'For the current beta feature, compare beta cohort behavior to a matched control cohort: feature usage, broader product engagement, support ticket rate, NPS shift, and renewal intent (from CSM notes). Determine whether the beta is having a positive, neutral, or negative effect on adjacent metrics and recommend ship/iterate/kill with the supporting evidence.' },
  { title:'Feature Request Consolidation',
    teams:['Product Management','Customer Success'],
    prompt:'Across Zendesk, Intercom, sales calls (Gong), and the product feedback portal, cluster every feature request from the last 90 days. For each cluster, show: total request count, unique-account count, total ARR of requesting accounts, and a 1-line synthesized request. Output the top 20 clusters with a recommended PM-disposition (plan / explore / decline) and rationale.' },
  { title:'Core Loop Engagement Drill',
    teams:['Product Management','Data Analytics'],
    prompt:'For the core product loop (ask question → see answer → save / share / iterate), compute the loop-completion rate per user per week. Segment by tenure, plan, and team-size. Identify the user segment whose loop-completion is highest (model behavior) and the segment whose drop-off is steepest. Recommend the product change most likely to lift the weak segment.' },
  { title:'Launch Performance Scorecard',
    teams:['Product Marketing','Marketing'],
    prompt:'For the most recent launch, compile a 30-60-90 day scorecard: press pickups, social engagement, traffic to the launch page, demo requests, sales-team-flagged opportunities, feature activation rate, and qualitative customer feedback. Compare against the launch goals defined pre-launch. Output what worked, what missed, and three changes to bake into the next launch playbook.' },
  { title:'Win/Loss Themes by Quarter',
    teams:['Product Marketing','Sales Leadership'],
    prompt:'For every Closed-Won and Closed-Lost opportunity this quarter, extract: primary win or loss reason from the CRM, competitor (if any), and customer quote (if available from notes or Gong). Cluster into themes. Output the top 5 win themes and top 5 loss themes with the count, average deal size, and the action item for product, sales, or messaging.' },
  { title:'Positioning Effectiveness by Segment',
    teams:['Product Marketing'],
    prompt:'For each customer segment (startup, mid-market, enterprise), compare what we say (positioning page, sales decks, ad copy) to what customers actually buy us for (Closed-Won win-reason notes, NPS promoter quotes). Score positioning-to-reality fit per segment. Identify the segment with the biggest mismatch and propose three messaging changes to test.' },
  { title:'Competitive Feature Gap Analysis',
    teams:['Product Marketing'],
    prompt:'For each of the top 3 competitors, build a feature parity matrix against our product across 30 capability areas. Score each cell: better / parity / worse / not-applicable. Cross-reference with deal-loss reasons to identify the gaps that actually cost us deals (vs gaps customers do not care about). Output the 5 gaps PM should close first.' },
  { title:'Customer Story Candidate Identification',
    teams:['Product Marketing','Customer Success'],
    prompt:'Identify customers who would make great case studies. Filter by: NPS score 9 or 10, expansion ARR in last year, recognizable brand or compelling persona, public-PR willingness flag in CRM, and at least one quantifiable outcome (cost savings, time savings, revenue lift). Output a ranked list of 15 candidates with the story angle for each and the CSM to recruit them.' },
  { title:'Sales Enablement Asset Usage',
    teams:['Product Marketing','Sales Leadership'],
    prompt:'For every sales asset (deck, one-pager, ROI calculator, demo video, battle card), compute: total downloads in last 90 days, downloads per active rep, attachment to opportunities (where used), and Closed-Won rate on deals where the asset was used vs not used. Identify the top 5 assets to promote and 5 to retire.' },
  { title:'Pipeline Coverage Forecast',
    teams:['Revenue Operations','Sales Leadership'],
    prompt:'For the current quarter, compute pipeline coverage by segment (mid-market vs enterprise): open pipeline ÷ remaining quota. Compare against the segment\'s historical win rate to project a confidence-weighted forecast. Highlight segments where coverage is below 3x and propose the top 3 pipeline-generation moves to close the gap by end-of-month.' },
  { title:'Deal Stage Conversion Benchmarks',
    teams:['Revenue Operations'],
    prompt:'For every deal closed in the last 4 quarters, compute the conversion rate stage-by-stage and the median time spent in each stage. Segment by deal size band and segment. Identify the stage where conversion has the highest variance across reps (biggest coaching opportunity) and the stage where deals decay if they sit too long (biggest process opportunity).' },
  { title:'Territory Rebalancing Recommendations',
    teams:['Revenue Operations'],
    prompt:'For each territory, compute: account count, total addressable ARR, current pipeline coverage, rep capacity (activities completed vs target), and YTD attainment. Identify territories that are over-served (rep coasting) and under-served (no rep capacity). Propose a rebalancing plan with the specific accounts to move and the projected attainment improvement.' },
  { title:'Quota Attainment Forecasting',
    teams:['Revenue Operations','Sales Leadership'],
    prompt:'For every rep on quota, forecast end-of-quarter attainment using: current commit, current best-case, average historical commit-to-close conversion, days remaining, and weighted pipeline. Output a rep-level forecast (Likely / Stretch / At-Risk), the team-level roll-up, and the gap to plan. Flag reps trending under 60% as the highest-leverage coaching priority.' },
  { title:'CRM Data Hygiene Audit',
    teams:['Revenue Operations'],
    prompt:'Across Salesforce/HubSpot/Zoho, audit data hygiene: opportunities with missing close date, opportunities >$100k with no next-step, contacts without an account, accounts with no owner, duplicate accounts (by domain), and stale activity (>30 days, deal stage past Discovery). Output a hygiene scorecard by team with the top 5 fixes ranked by impact.' },
  { title:'Forecast Accuracy by Segment',
    teams:['Revenue Operations','Sales Leadership'],
    prompt:'For each segment and each rep, compare the forecast committed at week 1 of the quarter vs actual closed at end-of-quarter, for the last 4 quarters. Compute average over/under-call by rep and segment. Identify segments where commit accuracy is systemically off (under-calling vs over-calling) and recommend the forecast process fix per pattern.' },
  { title:'Rep Performance Quarterly Ranking',
    teams:['Sales Directors'],
    prompt:'Rank every rep on the team this quarter by: total bookings, win rate, average deal size, sales-cycle length, activities per week, and pipeline created. Normalize by territory difficulty. Output a single composite score, the top 3 performers, the bottom 3 (with the gating issue per rep), and one specific coaching focus for the middle quartile.' },
  { title:'Deal Review Preparation Pack',
    teams:['Sales Directors'],
    prompt:'For tomorrow\'s deal review, prepare a 1-page brief on the top 10 deals: account, stage, ARR, days in stage, last activity, last-recorded customer sentiment from Gong, competitive context, two open questions for the rep, and one action the director should approve or block. Surface the deals where the call summary contradicts the CRM stage.' },
  { title:'Coaching Opportunity Identification',
    teams:['Sales Directors'],
    prompt:'Across the team\'s call recordings (Gong) and email threads (Outreach) from the last 30 days, identify the three most-frequent missed-skills patterns: weak discovery questions, premature pricing reveal, no multi-thread ask, weak close. For each, name the reps who exhibit it most and propose a specific micro-coaching exercise per rep.' },
  { title:'Team-Level Forecast Roll-Up',
    teams:['Sales Directors'],
    prompt:'Roll up every rep\'s forecast (Commit / Best Case / Pipeline) into a team-level view. Compute the team commit, team best-case, and the gap-to-plan. Highlight the three deals whose stage change would most move the team forecast and the two reps whose forecast confidence is historically lowest (so weight their commits accordingly).' },
  { title:'Win Rate by Stage by Rep',
    teams:['Sales Directors'],
    prompt:'For each rep on the team, compute win rate at each pipeline stage over the last 4 quarters. Compare to the team median. Identify the rep+stage combinations where the rep is materially below median (highest-leverage coaching) and the rep+stage combinations where the rep is materially above (skills to extract and teach the rest of the team).' },
  { title:'Activity-to-Pipeline Ratio per Rep',
    teams:['Sales Directors'],
    prompt:'For each rep, compute the ratio of activities (calls, emails, meetings) per dollar of pipeline created in the last 90 days. Compare against team baseline. Identify reps with high activity but low pipeline yield (effectiveness gap) vs low activity but reasonable yield (capacity for more) and propose the coaching or quota assignment that matches.' },
  { title:'Quarterly Business Review Data Pack',
    teams:['Sales Leadership'],
    prompt:'Prepare the QBR data pack for the leadership team: total bookings vs plan, pipeline coverage, segment-level performance, rep ranking, win-rate trends, sales-cycle trends, win/loss themes, top 10 deals to watch, and the three biggest risks to next quarter. Format as a slide-ready 12-page deck with one chart and one takeaway per slide.' },
  { title:'Plan-to-Actual Variance Analysis',
    teams:['Sales Leadership'],
    prompt:'For the current quarter, compute plan-to-actual variance by: segment, geography, product line, rep, and channel. For every variance >10%, attribute to the dominant cause (pipeline gap, win-rate gap, deal-size gap, cycle-length gap). Output the top three variance drivers, the dollar magnitude, and the recovery move to make in the next 30 days.' },
  { title:'Productivity per Rep Trend',
    teams:['Sales Leadership'],
    prompt:'Plot productivity per rep (bookings ÷ headcount) over the last 8 quarters, segmented by tenure band. Identify the inflection where productivity tends to plateau and the tenure where productivity starts to decline (flight risk). Propose the headcount, enablement, or compensation change that addresses the dominant trend.' },
  { title:'Segment-Level Pipeline Strategy',
    teams:['Sales Leadership'],
    prompt:'For each segment (SMB, mid-market, enterprise), assess: pipeline-to-plan ratio, average deal size trend, win-rate trend, and channel mix. Identify the segment with the strongest momentum (where to invest more pipeline-gen) and the segment that is decaying (where to investigate the cause). Recommend an investment-rebalancing move.' },
  { title:'Compensation Plan Effectiveness',
    teams:['Sales Leadership'],
    prompt:'For each comp plan component (base, commission rate, accelerators, SPIFFs), compute: cost as a percentage of bookings, behavior change attributable to it, and rep satisfaction signal. Identify the components driving the most desired behavior per dollar and the components with high cost but no measurable behavior change. Recommend two changes for next year\'s plan.' },
  { title:'Headcount Investment ROI',
    teams:['Sales Leadership'],
    prompt:'For every new sales hire in the last 18 months, compute time-to-ramp, time-to-first-deal, time-to-quota, cumulative bookings, and ROI vs fully-loaded cost. Segment by source (referral, recruiter, internal transfer). Identify the source that produces the best-yielding hires and recommend the next 6 hires to prioritize by role.' },
  { title:'Territory Load Balance Audit',
    teams:['Revenue Operations'],
    prompt:'For every territory, compute: total addressable ARR, account count, named-account count, open pipeline, and current rep capacity vs target activity volume. Identify the top 3 territories that are under-resourced and the bottom 3 that are over-resourced. Propose a specific account-move plan with the dollar-yield projection per move.' },
  { title:'Lead Routing Audit',
    teams:['Marketing'],
    prompt:'Audit the lead-routing rules: median time-to-claim by source, percentage of leads with no first-touch in 24h, mis-routes (lead handed to a rep whose territory does not own the account), and unowned/queue leads. Identify the three rule changes that would have improved time-to-claim by >50% in the last 30 days.' },
  { title:'Forecast Call Accuracy Trend',
    teams:['Revenue Operations'],
    prompt:'For every forecast call in the last 6 quarters, compare week-1 commit, week-8 commit, and actual final. Compute per-rep over-call and under-call rates. Identify reps whose commits are systematically optimistic (need pressure-testing) vs sandbaggers (need to be unblocked). Output a forecast-confidence scorecard for the leadership team.' },
  { title:'Pipeline Waterfall Report',
    teams:['Revenue Operations'],
    prompt:'Build the quarterly pipeline waterfall: starting pipeline, new pipeline created, pipeline progressed in, pipeline progressed out, pipeline pushed to next quarter, pipeline lost, pipeline won. Segment by source and rep. Output the waterfall chart, the largest contributor to net pipeline change, and the three opportunities most likely to slip if no action is taken.' },
];

/* ── PROMPT LIBRARY SIDEBAR ── */
function PromptLibrarySidebar({ selectedTeams, toggleTeam, clearAll, mobileOpen = false }) {
  const [openTeams, setOpenTeams] = useState(true);
  const total = selectedTeams.size;

  const groupHeader = (label, open, setOpen) => (
    <button
      onClick={() => setOpen(!open)}
      style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        width:'100%', padding:'6px 16px',
        background:'transparent', border:'none', cursor:'pointer',
        color:'var(--ins-text-disabled)', fontSize:'var(--ins-font-size-11)', fontWeight:600,
        textTransform:'uppercase', letterSpacing:'0.08em',
        fontFamily:'var(--ins-font-family-sans)',
      }}
    >
      {label}
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ transition:'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink:0 }}>
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
  );

  const checkboxItem = (label, checked, onToggle, leading = null) => (
    <label
      key={label}
      className={`filter-item ${checked ? 'checked' : ''}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        style={{ position:'absolute', opacity:0, width:0, height:0 }}
      />
      <span className="filter-checkbox">
        {checked && (
          <CheckIcon size={9} color="var(--ins-surface-page)" strokeWidth={3.5} />
        )}
      </span>
      {leading}
      <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{label}</span>
    </label>
  );

  return (
    <aside className={'prompt-sidebar-col' + (mobileOpen ? ' is-open' : '')}>
      {/* Reserve fixed-height slot so the Teams list does not shift when a filter is selected */}
      <div style={{ padding:'0 16px 14px', minHeight:'42px' }}>
        <button
          onClick={clearAll}
          aria-hidden={total === 0}
          tabIndex={total === 0 ? -1 : 0}
          style={{
            fontSize:'var(--ins-font-size-12)', fontFamily:'var(--ins-font-family-sans)',
            background:'var(--ins-surface-brand-tint)', color:'var(--ins-text-highlight)',
            border:'1px solid rgba(9,160,157,.25)',
            borderRadius:'var(--ins-radius-6)', padding:'5px 10px', cursor:'pointer',
            display:'inline-flex', alignItems:'center', gap:'6px',
            visibility: total > 0 ? 'visible' : 'hidden',
            pointerEvents: total > 0 ? 'auto' : 'none',
          }}
        >
          Clear filters ({total})
        </button>
      </div>

      {/* Teams first */}
      <div style={{ marginBottom:'10px' }}>
        {groupHeader('Teams', openTeams, setOpenTeams)}
        {openTeams && (
          <div style={{ padding:'2px 0 8px' }}>
            {TEAMS.map(team =>
              checkboxItem(team, selectedTeams.has(team), () => toggleTeam(team))
            )}
          </div>
        )}
      </div>

    </aside>
  );
}

/* ── PROMPT CARD ── */
function PromptCard({ entry, index, isExpanded, onToggle }) {
  const expanded = isExpanded;
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(entry.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <article className="ins-prompt-card prompt-card" style={{ animationDelay:`${Math.min(index,8) * 0.04}s` }}>
      <div onClick={onToggle} role="button" tabIndex={0} aria-expanded={expanded}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
        style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'var(--ins-size-5)', flexWrap:'wrap', cursor:'pointer' }}>
        <div style={{ flex:'1 1 320px', minWidth:0 }}>
          <h3 style={{ fontSize:'var(--ins-font-size-16)', fontWeight:500, color:'var(--ins-text-heading-soft)', lineHeight:1.4, marginBottom:'10px', letterSpacing:'-.01em' }}>
            {entry.title}
          </h3>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'10px' }}>
            {entry.teams.map(t => <span key={t} className="team-pill">{t}</span>)}
          </div>
        </div>
        <button
          className="view-btn"
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          tabIndex={-1}
        >
          {expanded ? 'Hide prompt' : 'View prompts'}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition:'transform .2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </div>

      {expanded && (
        <div style={{
          marginTop:'var(--ins-size-4)', padding:'14px 16px',
          background:'rgba(10,14,19,0.55)',
          border:'1px solid rgba(9,160,157,.18)',
          borderRadius:'10px',
          animation:'cardFadeIn .2s ease',
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
            <span style={{ fontSize:'var(--ins-font-size-11)', fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--ins-text-disabled)' }}>
              Prompt
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              iconStart={copied
                ? <CheckIcon size={14} color="currentColor" />
                : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <p style={{
            fontSize:'var(--ins-font-size-14)', color:'#B5CCD2', lineHeight:1.65,
            whiteSpace:'pre-wrap', margin:0,
          }}>
            {entry.prompt}
          </p>
        </div>
      )}
    </article>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTA() {
  return (
    <section style={{paddingTop:'var(--ins-size-8)',paddingBottom:'var(--ins-size-16)',position:'relative'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <BottomCTABlock
          variant="buttons"
          title={<>Stop reading about <BottomCTABlock.Highlight>analytics.</BottomCTABlock.Highlight> Start doing it</>}
          description={<>Copy a prompt, connect your data, and get real answers in plain language — no SQL, no waiting on a report. Free to start, no credit card required.</>}
          ctaLabel="Start for free"
          secondaryCtaLabel="Explore Pricing"
          secondaryCtaHref="/pricing"
        />
      </div>
    </section>
  );
}

/* ── FLOATING CHAT ── */
function FloatingChat({ onSubmit }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <div style={{
      position:'fixed', bottom:0, left:0, right:0,
      zIndex:'var(--ins-z-dropdown)',
      opacity: visible ? 1 : 0,
      pointerEvents: 'none',
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity .25s, transform .25s',
    }}>
      <div className="floating-chat-wrap" style={{ pointerEvents:'all' }}>
        <div style={{
          display:'flex', alignItems:'center', gap:'var(--ins-size-2)',
          background:'rgba(16,22,30,0.96)',
          border: focused ? '1px solid var(--ins-color-teal-a-50)' : '1px solid var(--ins-color-white-a-10)',
          borderRadius:'var(--ins-radius-12)',
          padding:'6px 6px 6px 12px',
          transition:'border-color .2s',
          boxShadow:'0 8px 32px rgba(0,0,0,0.45)',
          backdropFilter:'blur(10px)',
          WebkitBackdropFilter:'blur(10px)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-body)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
            placeholder="Ask for a prompt or a custom workflow..."
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              fontSize:'var(--ins-font-size-14)', color:'var(--ins-color-gray-100)',
              fontFamily:'inherit',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              flexShrink:0,
              padding:'6px 14px', borderRadius:'7px',
              background: value.trim() ? 'var(--ins-button-primary-bg)' : 'rgba(9,160,157,.15)',
              color: value.trim() ? 'var(--ins-text-heading)' : 'var(--ins-text-disabled)',
              border:'none', cursor: value.trim() ? 'pointer' : 'default',
              fontSize:'var(--ins-font-size-12)', fontWeight:600,
              fontFamily:'inherit',
              transition:'background .2s, color .2s',
            }}
            onMouseEnter={(e) => { if (value.trim()) e.currentTarget.style.background = 'var(--ins-button-primary-bg-hover)'; }}
            onMouseLeave={(e) => { if (value.trim()) e.currentTarget.style.background = 'var(--ins-button-primary-bg)'; }}
          >
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── AI ASSISTANT PANEL ── */
function AssistantResponseText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={i} style={{ color:'#C8E6EA', fontWeight:600 }}>{p.slice(2,-2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
}

function AIAssistantPanel({ query, onClose }) {
  const [phase, setPhase] = useState('searching');
  const [input, setInput] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [messages, setMessages] = useState([{ role:'user', text: query }]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);

  const SAMPLE_RESPONSE = {
    searchTerms: query.toLowerCase().split(' ').filter(w => w.length > 2).slice(0, 3).join(', ') || 'prompts',
    intro: 'I found a few **prompt templates** that match what you\'re looking for. Each one is pre-wired to the right data sources so you can run it with a single click.',
    bullets: [
      { bold: 'Pipeline Velocity by Source', text: ' — measure velocity per channel across Salesforce + HubSpot + ads' },
      { bold: 'Churn Risk Scoring', text: ' — score every renewal using usage, tickets, and ARR trend' },
      { bold: 'Campaign Attribution Deep-Dive', text: ' — multi-touch attribution all the way to Closed-Won' },
      { bold: 'Exec Weekly Revenue Narrative', text: ' — a 250-word Monday-morning summary for leadership' },
    ],
    outro: 'Want me to customize one for your team\'s stack, or generate a brand-new prompt from scratch?',
    links: ['Browse all 15 prompts', 'Connect a new data source', 'Build a custom prompt'],
  };

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reading'), 800);
    const t2 = setTimeout(() => {
      setPhase('done');
      setMessages(m => [...m, { role:'assistant', response: SAMPLE_RESPONSE }]);
    }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [messages, phase]);

  const handleFollowUp = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setInput('');
    setMessages(m => [...m, { role:'user', text: q }]);
    setPhase('searching');
    setTimeout(() => setPhase('reading'), 800);
    setTimeout(() => {
      setPhase('done');
      setMessages(m => [...m, { role:'assistant', response: SAMPLE_RESPONSE }]);
    }, 1800);
  };

  const iconBtn = (title, path) => (
    <button title={title} onClick={() => {
      if (title === 'Copy') { navigator.clipboard?.writeText(''); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    }} style={{
      background:'none', border:'none', cursor:'pointer', padding:'var(--ins-size-1)', borderRadius:'var(--ins-radius-4)',
      color:'var(--ins-text-disabled)', transition:'color .15s',
    }}
    onMouseEnter={e => e.currentTarget.style.color = 'var(--ins-text-body)'}
    onMouseLeave={e => e.currentTarget.style.color = 'var(--ins-text-disabled)'}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={path}/>
      </svg>
    </button>
  );

  return (
    <div style={{
      position:'fixed', right:0, top:0, bottom:0, width:'320px',
      background:'#0B0F16',
      borderLeft:'1px solid var(--ins-color-white-a-07)',
      display:'flex', flexDirection:'column',
      zIndex:'var(--ins-z-sticky)',
      animation:'slideInRight .25s ease',
    }}>
      {/* Header */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'12px 14px', borderBottom:'1px solid var(--ins-color-white-a-07)',
        flexShrink:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span style={{ fontSize:'var(--ins-font-size-14)', fontWeight:600, color:'var(--ins-color-gray-100)' }}>Assistant</span>
        </div>
        <div style={{ display:'flex', gap:'var(--ins-size-half)' }}>
          <button onClick={onClose} style={{
            background:'none', border:'none', cursor:'pointer', padding:'var(--ins-size-1)', borderRadius:'var(--ins-radius-4)',
            color:'var(--ins-text-disabled)', transition:'color .15s', display:'flex',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--ins-color-gray-100)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--ins-text-disabled)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'16px 14px', display:'flex', flexDirection:'column', gap:'var(--ins-size-4)' }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            {msg.role === 'user' ? (
              <div style={{ display:'flex', justifyContent:'flex-end' }}>
                <div style={{
                  background:'rgba(9,160,157,0.15)',
                  border:'1px solid rgba(9,160,157,0.25)',
                  borderRadius:'10px 10px 2px 10px',
                  padding:'8px 12px',
                  fontSize:'var(--ins-font-size-14)', color:'#C8E6EA', maxWidth:'90%',
                  lineHeight:1.5,
                }}>
                  {msg.text}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize:'var(--ins-font-size-12)', color:'#3A6070', marginBottom:'10px', display:'flex', flexDirection:'column', gap:'var(--ins-size-1)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    Found prompts for <em style={{ color:'#4A8090', fontStyle:'normal' }}>{msg.response.searchTerms}</em>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    Scanned 15 templates
                  </div>
                </div>
                <p style={{ fontSize:'var(--ins-font-size-14)', color:'#8AAAB8', lineHeight:1.7, marginBottom:'10px' }}>
                  <AssistantResponseText text={msg.response.intro} />
                </p>
                <ul style={{ margin:'0 0 10px 0', padding:'0', listStyle:'none', display:'flex', flexDirection:'column', gap:'5px' }}>
                  {msg.response.bullets.map((b, i) => (
                    <li key={i} style={{ fontSize:'var(--ins-font-size-14)', color:'#8AAAB8', lineHeight:1.6, paddingLeft:'14px', position:'relative' }}>
                      <span style={{ position:'absolute', left:0, color:'var(--ins-text-highlight)', fontWeight:700 }}>·</span>
                      <strong style={{ color:'#C8E6EA' }}>{b.bold}</strong>{b.text}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize:'var(--ins-font-size-14)', color:'#8AAAB8', lineHeight:1.7, marginBottom:'var(--ins-size-3)' }}>
                  {msg.response.outro}
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:'var(--ins-size-1)', marginBottom:'var(--ins-size-3)' }}>
                  {msg.response.links.map((l, i) => (
                    <a key={i} href="#" style={{ fontSize:'var(--ins-font-size-12)', color:'var(--ins-button-primary-bg-hover)', textDecoration:'none' }}
                      onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                    >{l}</a>
                  ))}
                </div>
                <div style={{ display:'flex', gap:'var(--ins-size-1)', alignItems:'center' }}>
                  {iconBtn('Helpful', 'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z')}
                  {iconBtn('Not helpful', 'M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z')}
                  {iconBtn('Copy', copied ? 'M20 6L9 17l-5-5' : 'M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.912 4.895 3 6 3h8c1.105 0 2 .912 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.088 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z')}
                  {iconBtn('Regenerate', 'M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15')}
                </div>
              </div>
            )}
          </div>
        ))}

        {phase !== 'done' && (
          <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'var(--ins-font-size-12)', color:'#3A6070' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation:'pulse 1.2s ease infinite' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              {phase === 'searching' ? 'Searching prompt library…' : 'Reading templates…'}
            </div>
            <div style={{ display:'flex', gap:'5px', paddingTop:'var(--ins-size-1)' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width:'6px', height:'6px', borderRadius:'50%',
                  background:'var(--ins-text-highlight)',
                  animation:`pulse 1.2s ease ${i * 0.2}s infinite`,
                }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Follow-up input */}
      <div style={{
        padding:'10px 14px 18px', borderTop:'1px solid var(--ins-color-white-a-07)', flexShrink:0,
      }}>
        <div style={{
          display:'flex', alignItems:'center', gap:'var(--ins-size-2)',
          background:'var(--ins-color-white-a-04)',
          border: inputFocused ? '1px solid rgba(9,160,157,.4)' : '1px solid var(--ins-color-white-a-07)',
          borderRadius:'10px',
          padding:'8px 8px 8px 12px',
          transition:'border-color .2s',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onKeyDown={e => { if (e.key === 'Enter') handleFollowUp(); }}
            placeholder="Ask a follow-up..."
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              fontSize:'var(--ins-font-size-14)', color:'var(--ins-color-gray-100)', fontFamily:'var(--ins-font-family-sans)',
            }}
          />
          <button onClick={handleFollowUp} style={{
            width:'28px', height:'28px', borderRadius:'7px', flexShrink:0,
            background: input.trim() ? 'var(--ins-button-primary-bg)' : 'rgba(9,160,157,.12)',
            border:'none', cursor: input.trim() ? 'pointer' : 'default',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'background .2s',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? 'var(--ins-color-white)' : '#3A7080'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── APP ── */
function App() {
  const [selectedTeams, setSelectedTeams] = useState(() => new Set());
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  // Only one prompt can be expanded at a time — clicking a second prompt
  // collapses the first.
  const [expandedTitle, setExpandedTitle] = useState(null);
  // Mobile-only (≤900px): whether the filters panel is expanded.
  const [filtersOpen, setFiltersOpen] = useState(false);
  const toggleExpand = (title) =>
    setExpandedTitle(prev => (prev === title ? null : title));

  const toggleTeam = (team) => setSelectedTeams(prev => {
    const next = new Set(prev);
    if (next.has(team)) next.delete(team); else next.add(team);
    return next;
  });
  const clearAll = () => { setSelectedTeams(new Set()); setQuery(''); };

  const q = query.trim().toLowerCase();
  const filtered = PROMPTS.filter(p => {
    if (selectedTeams.size && !p.teams.some(t => selectedTeams.has(t))) return false;
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.prompt.toLowerCase().includes(q) ||
      p.teams.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <Header />
      <main>
      <PromptLibraryHero />
      <div className="prompt-layout">
        {/* Mobile-only toggle for the team filters (QA #3) */}
        <button
          type="button"
          className="prompt-filters-toggle"
          onClick={() => setFiltersOpen(o => !o)}
          aria-expanded={filtersOpen}
        >
          Filters{selectedTeams.size > 0 ? ` (${selectedTeams.size})` : ''}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: 'transform .15s', transform: filtersOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <PromptLibrarySidebar
          selectedTeams={selectedTeams}
          toggleTeam={toggleTeam}
          clearAll={clearAll}
          mobileOpen={filtersOpen}
        />
        <div className="prompt-content">
          <SearchInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts by title, team, or data source..."
            style={{marginBottom:'var(--ins-size-5)'}}
          />

          {filtered.length > 0 ? (
            filtered.map((entry, i) => (
              <PromptCard
                key={entry.title}
                entry={entry}
                index={i}
                isExpanded={expandedTitle === entry.title}
                onToggle={() => toggleExpand(entry.title)}
              />
            ))
          ) : (
            <div style={{
              padding:'40px 24px', textAlign:'center',
              border:'1px dashed var(--ins-color-white-a-08)', borderRadius:'var(--ins-radius-12)',
              color:'var(--ins-text-body)', fontSize:'var(--ins-font-size-14)',
            }}>
              No prompts match your search — try different keywords or clear a filter.
            </div>
          )}
        </div>
      </div>
      <BottomCTA />
            </main>
      <Footer />
    </div>
  );
}

export default App;
if (typeof window !== 'undefined') {
  const el = document.getElementById('root');
  if (el && el.hasChildNodes()) {
    ReactDOM.hydrateRoot(el, <App />);
  } else if (el) {
    ReactDOM.createRoot(el).render(<App />);
  }
}
