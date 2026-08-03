# Skyvia — Art. 28 processor terms and EEA transfer mechanism

**Status: prepared, not settled.** This document assembles what the codebase can
establish and states exactly what remains to be obtained and by whom. It is not a
contract and does not create one. Executing the agreement and choosing the
transfer mechanism are decisions for whoever owns Devart's data-protection
posture; nothing in a repository can substitute for that.

Raised because `/security/privacy` already names Skyvia to visitors as a
sub-processor in the live data path, which makes the absence of executed terms a
published gap rather than an internal one.

---

## What the site already tells visitors

From `src/pages/privacy.jsx:300`, currently live:

> Skyvia — our data connectors provider, reached through Skyvia's embedded MCP
> integration. It sits in the path between a connected source and Insightis when a
> query runs. Skyvia is also a Devart product, so this is a provider inside our own
> group rather than an unrelated third party. Connector traffic is processed on
> Skyvia's platform, and what it retains is governed by Skyvia's own terms.

Three commitments follow from that paragraph, and each one needs paper behind it:

1. Skyvia **processes personal data** on our behalf — customer data flows through
   it when a query runs. That makes Insightis the controller and Skyvia a
   processor, so Art. 28(3) terms are mandatory, not optional.
2. It is **intra-group**. Common ownership reduces commercial friction; it changes
   nothing about the legal requirement. The EDPB has been consistent that
   intra-group transfers need the same instrument as any other.
3. Retention is **governed by Skyvia's own terms** — which is precisely the clause
   Art. 28(3)(g) requires us to control rather than defer.

## Art. 28(3) — what the agreement must contain

Each row needs a yes/no and a clause reference. None can be answered from this
repository.

| Art. 28(3) | Requirement | Status |
| --- | --- | --- |
| (a) | Process only on documented instructions from the controller, including for transfers | **unknown** |
| (b) | Confidentiality obligations on all personnel with access | **unknown** |
| (c) | Art. 32 security measures, specified rather than asserted | **unknown** |
| (d) | Sub-processors only with authorisation, and flowed-down terms | **unknown** — Skyvia's own sub-processor list is not recorded anywhere on our side |
| (e) | Assistance with data-subject rights | **unknown** |
| (f) | Assistance with Art. 32–36 (security, breach notification, DPIA) | **unknown** — no breach-notification window is recorded |
| (g) | Delete or return data at end of provision | **unknown** — and directly contradicted by "governed by Skyvia's own terms" |
| (h) | Audit and information rights | **unknown** |

## The transfer question

Two facts are needed and neither is in this repository:

1. **Where Skyvia processes.** If processing happens outside the EEA, Chapter V
   applies and an instrument is required — most likely the 2021 SCCs, module
   controller-to-processor, plus a transfer impact assessment. Note that the Zoho
   forms this site posts to are on `forms.zohopublic.eu`, i.e. deliberately EU —
   somebody made that choice for form data, and the same question has not been
   answered for connector traffic.
2. **Whether onward transfers occur** via Skyvia's own sub-processors.

## What to obtain

1. The executed DPA or intra-group processing agreement covering Skyvia →
   Insightis, mapped clause-by-clause to the table above.
2. Skyvia's current sub-processor list and its hosting regions.
3. If any processing or onward transfer leaves the EEA: SCCs plus a TIA.
4. A retention and deletion commitment that satisfies (g) — replacing the current
   deferral to Skyvia's terms.
5. A breach-notification window we can state to customers.

## What changes in this repo once it is settled

- `src/pages/privacy.jsx:300` — replace "governed by Skyvia's own terms" with the
  actual retention commitment, and name the processing region.
- Same page's sub-processor list — add Skyvia's own sub-processors if the answer to
  (d) is that they exist.
- `tools/insight/backlog.json` — close the item, citing the executed agreement.

## Why this is filed rather than fixed

The remaining work is obtaining and executing an agreement between two legal
entities. Writing a plausible-looking DPA into a repository would produce a
document that looks like an answer and is not one — worse than the honest gap,
because the gap is at least visible. What is actionable here is the list above, and
the fact that a published privacy policy is already making commitments on Skyvia's
behalf that nothing has been signed to support.

---

*Prepared 2026-08-03 from the live privacy policy and the connector data path. No
legal advice is offered or implied.*
