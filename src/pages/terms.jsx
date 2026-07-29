import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* ── SECTION LIST (drives the TOC and the scroll-spy) ── */
const SECTIONS = [
  { id: 'definitions', title: 'Definitions' },
  { id: 'accounts', title: 'User Accounts and Workspaces' },
  { id: 'subscription', title: 'Subscription' },
  { id: 'fees', title: 'Service Fees' },
  { id: 'term-renewal', title: 'Subscription Term and Renewal' },
  { id: 'termination', title: 'Termination' },
  { id: 'refunds', title: 'Refunds' },
  { id: 'availability', title: 'Service Availability' },
  { id: 'restrictions', title: 'Restrictions' },
  { id: 'your-data', title: 'Your Data and Connected Sources' },
  { id: 'proprietary-rights', title: 'Proprietary Rights' },
  { id: 'ai-model-providers', title: 'AI Processing and Model Providers' },
  { id: 'no-training', title: 'No Training on Your Data' },
  { id: 'ai-outputs', title: 'AI Outputs and Verification' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'relationship', title: 'Relationship of the Parties' },
  { id: 'minimum-age', title: 'Minimum age of users' },
  { id: 'disclaimer', title: 'Disclaimer' },
];

/* ── TERMS CONTENT ── */
function TermsContent() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  const sectionStyle = { marginBottom: 'var(--ins-size-12)', scrollMarginTop: '100px' };
  const pStyle = { marginBottom: '14px' };
  const ulStyle = { fontSize: 'var(--ins-font-size-15)', color: 'var(--ins-text-body)', lineHeight: 1.8, paddingLeft: 'var(--ins-size-6)', marginBottom: '14px', listStyleType: 'disc' };
  const labelStyle = { color: 'var(--ins-text-body)' };

  return (
    <section style={{position:'relative'}}>
      {/* Hero */}
      <div style={{padding:'120px 0 60px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', padding:'0 24px', textAlign:'center'}}>
          <h1 className="ins-text-display" style={{marginBottom:'var(--ins-size-4)'}}>Terms of Service</h1>
          <p className="fu2 ins-text-body ins-text--muted ins-text--mono" style={{marginBottom:'var(--ins-size-5)'}}>
            Effective as of July 29, 2026
          </p>
          <p className="ins-text-body-lg" style={pStyle}>These Terms of Service (the &ldquo;Agreement&rdquo;) are a legal agreement between You as the user and Devart Ltd. (&ldquo;Devart&rdquo;, or &ldquo;We&rdquo;, &ldquo;Our&rdquo;, or &ldquo;Us&rdquo;), that governs Your limited, non-exclusive and terminable right to the use of the Insightis Site and Services as defined herein. Insightis is an AI analytics workspace developed and operated by Devart.</p>
          <p className="ins-text-body-lg" style={pStyle}>By registering a User Account or using the Services, You confirm that You have read, understood and agree to be bound by this Agreement. If You do not accept it, do not use the Site or the Services.</p>
        </div>
      </div>

      {/* Two-column: TOC + Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px', display: 'flex', gap: 'var(--ins-size-14)', alignItems: 'flex-start' }}>

        {/* Sticky TOC */}
        <div role="navigation" aria-label="On this page" className="hidden md:block" style={{ width: '200px', flexShrink: 0, position: 'sticky', top: '90px', maxHeight: 'calc(100vh - 130px)', overflowY: 'auto' }}>
          <p className="ins-toc__title">On this page</p>
          <div className="ins-toc__list">
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} className={'ins-toc__link' + (activeSection === s.id ? ' is-active' : '')}>
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>

        {/* Preamble, continued — unnumbered, no heading */}
        <div style={sectionStyle}>
          <p className="ins-text-body-lg" style={pStyle}>Our <a href="/security/privacy" className="ins-link--inline">Privacy Policy</a> is incorporated into this Agreement and forms part of it. Where documents conflict, the following order applies, highest first: a signed order form between us; this Agreement; the Privacy Policy; and Our documentation, <a href="/pricing" className="ins-link--inline">Pricing</a> page and other Site content. Documentation and marketing pages describe how the product works today; they do not create commitments of their own.</p>
          <p className="ins-text-body-lg" style={pStyle}>We reserve the right to amend this Agreement at any time at Our sole discretion. Where an amendment materially and adversely affects You, We will give at least thirty (30) calendar days' notice by email to Your registered address or by notice in the application. All other amended terms take effect on the day they are posted on the Site. Your continued use of the Site and/or Services after an amendment takes effect constitutes acceptance of it; if You do not accept an amendment, You may close Your User Account before it applies.</p>
        </div>

        {/* 1. Definitions */}
        <div id="definitions" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>1. Definitions</h2>
          <ul style={ulStyle}>
            <li><strong style={labelStyle}>&ldquo;Agreement&rdquo;</strong> shall mean these Terms of Service, together with the documents incorporated by reference herein;</li>
            <li><strong style={labelStyle}>&ldquo;Site&rdquo;</strong> shall mean the website insightis.ai, in addition to any pages in all sub-domains of the insightis.ai website;</li>
            <li><strong style={labelStyle}>&ldquo;Service/s&rdquo;</strong> shall mean the software as a service (SaaS) offered by Devart under the Insightis name, including all software, applications and websites developed and provided to You by Devart as further described on the Site;</li>
            <li><strong style={labelStyle}>&ldquo;User Account&rdquo;</strong> shall mean the registered account through which You access the Services;</li>
            <li><strong style={labelStyle}>&ldquo;Workspace&rdquo;</strong> shall mean the tenant created for Your User Account, holding Your connections, Metric Definitions, chats, files and settings;</li>
            <li><strong style={labelStyle}>&ldquo;Subscription Plan&rdquo;</strong> shall mean the plan You select, as described on the Site, together with its entitlements, limits and Token allowance;</li>
            <li><strong style={labelStyle}>&ldquo;Free Plan&rdquo;</strong> shall mean the Subscription Plan offered at no charge, with the entitlements and limits stated on the Site;</li>
            <li><strong style={labelStyle}>&ldquo;Connected Source&rdquo;</strong> shall mean a system You connect to Your Workspace through a connector — a database, warehouse, spreadsheet or SaaS application — so that the Services may read the data You select from it;</li>
            <li><strong style={labelStyle}>&ldquo;Your Data&rdquo;</strong> shall mean the data held in Your Connected Sources, the files You upload, and the Metric Definitions, configurations and settings You create, and includes Your Inputs and Your Outputs;</li>
            <li><strong style={labelStyle}>&ldquo;Input&rdquo;</strong> shall mean anything You submit to be processed, including question text, follow-up questions, files You attach and Metric Definitions;</li>
            <li><strong style={labelStyle}>&ldquo;Output&rdquo;</strong> shall mean anything the Services return in response to an Input, including figures, result tables, written explanations, generated charts and spreadsheets, and the execution steps shown alongside them;</li>
            <li><strong style={labelStyle}>&ldquo;Semantic Layer&rdquo;</strong> shall mean the set of Metric Definitions in Your Workspace against which the Services resolve Your questions;</li>
            <li><strong style={labelStyle}>&ldquo;Metric Definition&rdquo;</strong> shall mean a governed definition of a business measure in Your Semantic Layer, whether provided for a Connected Source or created by You;</li>
            <li><strong style={labelStyle}>&ldquo;Model Provider&rdquo;</strong> shall mean a third party whose artificial-intelligence models are used to deliver the Services, as named in clause 12;</li>
            <li><strong style={labelStyle}>&ldquo;Token&rdquo;</strong> shall mean the unit in which AI usage is metered, as described in clause 3;</li>
            <li><strong style={labelStyle}>&ldquo;Applicable Law&rdquo;</strong> shall mean the laws to which Devart is subject, particularly the Commonwealth of Dominica, where Devart is incorporated, and any other laws as may be applicable from time to time.</li>
          </ul>
        </div>

        {/* 2. User Accounts and Workspaces, Access and Disclosure */}
        <div id="accounts" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>2. User Accounts and Workspaces, Access and Disclosure</h2>
          <p className="ins-text-body-lg" style={pStyle}>2.1 To use the Services You must register a User Account. There are two ways to register, and both constitute acceptance of this Agreement:</p>
          <ul style={ulStyle}>
            <li>(a) email and password, where You enter Your email, choose a password and confirm acceptance of these Terms of Service before continuing;</li>
            <li>(b) Continue with Google, where Google acts as Your identity provider, no separate Insightis password exists, and Google controls access to Your User Account.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>2.2 A Workspace is created for You automatically during Your User Account registration. Every connection, Metric Definition, chat and file belongs to one Workspace, and a chat may read only the Connected Sources enabled for it.</p>
          <p className="ins-text-body-lg" style={pStyle}>2.3 You shall keep Your registration details accurate, complete and current, keep Your credentials confidential, and not share or resell a seat: each licensed seat is for one named user. You are responsible for all activity under Your User Account.</p>
          <p className="ins-text-body-lg" style={pStyle}>2.4 Where You invite other users into Your Workspace You act as its administrator, and You are responsible for the access You grant, for their compliance with this Agreement, and for withdrawing access when it is no longer needed.</p>
          <p className="ins-text-body-lg" style={pStyle}>2.5 You shall notify Us without delay at <a href="mailto:legal@insightis.ai" className="ins-link--inline">legal@insightis.ai</a> if You suspect any unauthorised access to Your User Account or Your Workspace. Devart shall not be liable for loss arising from Your failure to keep Your credentials secure.</p>
          <p className="ins-text-body-lg" style={pStyle}>2.6 We reserve the right for Us, Our contractors or Our employees to access Your User Account and Workspace, and the information You have provided, for support, maintenance and servicing purposes or for any security-related, technical or billing reasons. We may also disclose Your Data where compelled by law or by a competent authority, and will give You notice where We are lawfully able to do so.</p>
        </div>

        {/* 3. Subscription */}
        <div id="subscription" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>3. Subscription</h2>
          <p className="ins-text-body-lg" style={pStyle}>3.1 We offer several different Subscription Plans, described on Our <a href="/pricing" className="ins-link--inline">Pricing</a> page. Paid plans are priced per user per month and may be billed monthly or annually.</p>
          <p className="ins-text-body-lg" style={pStyle}>3.2 Tokens are the unit in which AI usage is metered. Every AI chat query, and every metric the Services propose, consumes Tokens. Each Subscription Plan includes a monthly allowance of subscription Tokens, available in full at the start of each billing month.</p>
          <p className="ins-text-body-lg" style={pStyle}>3.3 Unused subscription Tokens are burned at the end of the billing month and do not roll over; the allowance refills at the start of the next month. One-time Token packs may be purchased at any time, do not expire, and are drawn on only after the monthly allowance is spent.</p>
          <p className="ins-text-body-lg" style={pStyle}>3.4 When Your Token balance is exhausted the AI features stop until the allowance refills or You purchase more Tokens. The remainder of Your Workspace stays available.</p>
          <p className="ins-text-body-lg" style={pStyle}>3.5 Which features, limits and Connected Sources are available to You depends on Your Subscription Plan. We will provide You with thirty (30) calendar days' written notice in advance of any increase in the fees for Your Subscription Plan, during which You will have the right to unsubscribe from, or change, Your current Subscription Plan.</p>
        </div>

        {/* 4. Service Fees */}
        <div id="fees" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>4. Service Fees</h2>
          <p className="ins-text-body-lg" style={pStyle}>4.1 By subscribing to a paid Subscription Plan You agree to pay the fees quoted at the time of purchase, in advance, for the whole of the subscription term You select.</p>
          <p className="ins-text-body-lg" style={pStyle}>4.2 2Checkout is the authorised reseller and <strong>merchant of record</strong> for Devart products. Your order is placed with 2Checkout, which sells the Subscription to You, issues the invoice, collects payment and handles refunds. We do not process Your payment details: 2Checkout collects and stores Your card details and billing information for processing purposes, and We retain only the last four digits and the card brand. Your purchase is also subject to 2Checkout&rsquo;s own terms and privacy policy.</p>
          <p className="ins-text-body-lg" style={pStyle}>4.3 Prices shown on the Site are exclusive of VAT, sales tax and any other applicable taxes. As merchant of record, 2Checkout determines, collects and remits the tax due for Your jurisdiction, and the amount is shown before You confirm the order.</p>
        </div>

        {/* 5. Subscription Term and Renewal */}
        <div id="term-renewal" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>5. Subscription Term and Renewal</h2>
          <p className="ins-text-body-lg" style={pStyle}>5.1 Your subscription term runs from the date of purchase for the period You selected, monthly or annually.</p>
          <p className="ins-text-body-lg" style={pStyle}>5.2 Paid subscriptions renew automatically at the end of each billing cycle unless You cancel before the renewal date. You can cancel at any time yourself, from Manage Plan in the account menu. Cancellation takes effect at the end of the current billing period, and You keep the paid features until then.</p>
          <p className="ins-text-body-lg" style={pStyle}>5.3 Cancelling a paid Subscription Plan does not delete anything. Upon expiration of the subscription term Your Workspace shall be switched to the Free Plan, and Your Metric Definitions, connections and files remain as they are, subject to the limits of that plan.</p>
        </div>

        {/* 6. Termination */}
        <div id="termination" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>6. Termination</h2>
          <p className="ins-text-body-lg" style={pStyle}>6.1 We may immediately terminate this Agreement if You do not pay the fees when due in accordance with Your Subscription Plan.</p>
          <p className="ins-text-body-lg" style={pStyle}>6.2 You may terminate this Agreement by deleting Your User Account and Workspace while logged into the Services, or by writing to <a href="mailto:legal@insightis.ai" className="ins-link--inline">legal@insightis.ai</a>. Deletion of a User Account is permanent and cannot be undone: it removes the datasets You connected or uploaded, and Your chat sessions, along with the account.</p>
          <p className="ins-text-body-lg" style={pStyle}>6.3 Devart may also suspend or terminate Your right to use the Site and/or Services — with notice where practicable, immediately where it is not — if You breach this Agreement, if Your use poses a security risk to the Services or to other customers, or if We are required to do so by law. We shall notify You via email to Your registered email account if We terminate Your User Account.</p>
        </div>

        {/* 7. Refunds */}
        <div id="refunds" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>7. Refunds</h2>
          <p className="ins-text-body-lg" style={pStyle}>Our refund policy is set out below and does not affect any right to a refund that You have under Applicable Law.</p>
          <p className="ins-text-body-lg" style={pStyle}>7.1 Fees are non-refundable except where a refund is required by Applicable Law. Requests for a refund, and queries about an invoice, should be sent to <a href="mailto:legal@insightis.ai" className="ins-link--inline">legal@insightis.ai</a> with the invoice number.</p>
          <p className="ins-text-body-lg" style={pStyle}>7.2 Downgrading a subscription — decreasing the number of users, or switching to a cheaper plan — does not give the right to a refund, and neither does the non-use of Tokens included in Your allowance.</p>
          <p className="ins-text-body-lg" style={pStyle}>7.3 Where We terminate a paid subscription for a reason other than Your breach, We will refund the unused prepaid portion of Your term on a pro-rata basis.</p>
        </div>

        {/* 8. Service Availability */}
        <div id="availability" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>8. Service Availability</h2>
          <p className="ins-text-body-lg" style={pStyle}>You acknowledge that 100% availability of the Site and the Services is not technically feasible. Devart commits to <strong>99.5% monthly uptime</strong> for the Services on the Pro plan, measured per calendar month across the whole month. Excluded from that measurement are scheduled maintenance announced in advance, unavailability of a Connected Source or any other third-party service, and events outside Our reasonable control. Outside those exclusions Devart will make its best efforts to keep the Site and the Services available in the most constant possible way.</p>
        </div>

        {/* 9. Restrictions */}
        <div id="restrictions" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>9. Restrictions</h2>
          <p className="ins-text-body-lg" style={pStyle}>9.1 You shall use the Services only for lawful purposes. You shall not reverse engineer, decompile or attempt to discover the source code or underlying models of the Services; access them by unauthorised means, including scraping and automated tools; interfere with their integrity or performance; transmit malicious code; resell, sublicense or redistribute access without Our prior written consent; or process data that You have no legal right to use.</p>
          <p className="ins-text-body-lg" style={pStyle}>9.2 You shall not circumvent Token metering, rate limits, seat counts or any other entitlement of Your Subscription Plan, nor use the Services, or knowledge of how they work internally, to build or market a competing product. This does not stop You from evaluating the Services, publishing benchmarks, or describing Your experience of using them.</p>
          <p className="ins-text-body-lg" style={pStyle}>9.3 The AI features carry further restrictions. You shall not attempt prompt injection, jailbreaking or any other technique intended to bypass the safeguards or system instructions of the Services, or to reach data outside the Connected Sources enabled for a chat; distil or reconstruct the models, prompts or reasoning behind the Services, or use Outputs to train or evaluate a competing model; harvest Outputs by automated means, or at a volume inconsistent with interactive use; or submit into an Input, including an attached file, special-category personal data, payment card numbers or government identity numbers.</p>
          <p className="ins-text-body-lg" style={pStyle}>9.4 You shall not use an Output to make a fully automated decision about an individual, without meaningful human review, in a regulated or high-impact domain, including credit, employment, insurance, housing, education, healthcare and access to essential services. We may investigate suspected breaches of this clause and take proportionate action, including suspension or termination.</p>
        </div>

        {/* 10. Your Data and Connected Sources */}
        <div id="your-data" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>10. Your Data and Connected Sources</h2>
          <p className="ins-text-body-lg" style={pStyle}>10.1 All rights, title and interest in Your Data are Your exclusive property. Connecting a source or uploading a file does not change who owns what is in it.</p>
          <p className="ins-text-body-lg" style={pStyle}>10.2 You represent and warrant that You are authorised to connect each Connected Source and to upload each file, that You hold the rights and consents needed for Us to process what is in them — including by means of an artificial-intelligence system and by the Model Providers named in clause 12 — that where Your Data contains personal data You have a lawful basis for the processing, and that You are solely responsible for the accuracy, quality and legality of Your Data.</p>
          <p className="ins-text-body-lg" style={pStyle}>10.3 You grant Devart a limited, non-exclusive, worldwide licence to host, access, process, transmit and display Your Data for the following purposes only: to compose and execute queries against Your Connected Sources and attached files and return the results to You; to cache query results, schema metadata and Metric Definitions, scoped to Your Workspace; to store the Metric Definitions, files and settings You return to; to operate, secure and support the Services; and to comply with Applicable Law. That list is exhaustive. In particular, this licence does not extend to training, fine-tuning or improving any artificial-intelligence or machine-learning model.</p>
          <p className="ins-text-body-lg" style={pStyle}>10.4 Connectors authenticate by OAuth, or by a scoped API key or read-only database credential, and request the minimum permission needed to read the data You selected — never to write, and never to delete. Connector credentials are held in a dedicated secrets vault, are not written to logs, and are never sent to a Model Provider. The connector layer is provided through Skyvia, a cloud data integration platform and a fellow Devart product, by means of Skyvia's embedded MCP integration. Skyvia belongs to the same corporate group as Insightis, and what it retains is governed by Skyvia&rsquo;s own terms.</p>
        </div>

        {/* 11. Proprietary Rights */}
        <div id="proprietary-rights" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>11. Proprietary Rights</h2>
          <p className="ins-text-body-lg" style={pStyle}>11.1 The Services, including all software, design, architecture, documentation and trademarks and all related intellectual property, are and remain the exclusive property of Devart and its licensors. The Services are licensed, not sold, and nothing herein grants You any right in them beyond the limited right to use them in accordance with this Agreement. Third-party names appearing in the Services are used for identification purposes only.</p>
          <p className="ins-text-body-lg" style={pStyle}>11.2 As between You and Us, You own Your Inputs and Your Outputs, including generated charts, result tables and spreadsheets, and to the extent Devart holds any right in an Output it is hereby assigned to You. Devart gives no warranty that an Output is original, unique or non-infringing: similar questions can produce similar answers for different customers, and Outputs are computed from Your own data by generally available analytical methods.</p>
          <p className="ins-text-body-lg" style={pStyle}>11.3 Devart will keep Your Data in the strictest of confidence. Devart will not disclose or permit disclosure of Your Data to any unauthorised person, and will make only such limited use of it as is strictly necessary for Devart to perform the Services, as set out in clause 10.3.</p>
          <p className="ins-text-body-lg" style={pStyle}>11.4 If You send Us suggestions or ideas about the product, You grant Devart a perpetual, irrevocable, royalty-free, worldwide licence to use and incorporate them without obligation to You. This licence covers product suggestions only, and expressly excludes Your Data, Your Inputs, Your Outputs, and the ratings, corrections and edits You make to an Output.</p>
        </div>

        {/* 12. AI Processing and Model Providers */}
        <div id="ai-model-providers" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>12. AI Processing and Model Providers</h2>
          <p className="ins-text-body-lg" style={pStyle}>The Services use third-party artificial-intelligence models. The Insightis Light, Medium and Pro tiers are Our own configurations, combining OpenAI and Anthropic models and routing each step of a question to whichever model handles it best. Choosing a tier changes how much reasoning is applied and how many Tokens are spent; it never changes what is sent or how it is governed. OpenAI and Anthropic are Our Model Providers. What crosses the boundary to them, and what does not:</p>
          <ul style={ulStyle}>
            <li><strong style={labelStyle}>May be sent:</strong> Your question text and the relevant Metric Definitions, so that a query plan and a written explanation can be produced.</li>
            <li><strong style={labelStyle}>Not sent as a matter of course:</strong> raw rows from Your Connected Sources, which are sent only where You expressly ask for them.</li>
            <li><strong style={labelStyle}>Never sent:</strong> connector credentials.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>Our Model Providers are used through their business APIs, under terms that prohibit training on the content of a request. They may hold a request for a limited period for abuse monitoring before deleting it; the no-training commitment in clause 13 is contractual and does not depend on that period. Which provider and which model handles a given step is internal routing that We may change at any time without notice; the commitments in this clause and in clause 13 do not change when the routing does. Before a new Model Provider is added We will give You advance notice, and You may object on reasonable data-protection grounds; if the objection cannot be accommodated You may terminate the affected subscription and We will refund the unused prepaid portion of Your term. The sub-processors used to deliver the Services are named in Our <a href="/security/privacy" className="ins-link--inline">Privacy Policy</a>.</p>
        </div>

        {/* 13. No Training on Your Data */}
        <div id="no-training" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>13. No Training on Your Data</h2>
          <p className="ins-text-body-lg" style={pStyle}>Your Data is not used to train, fine-tune or improve any artificial-intelligence or machine-learning model, neither Ours nor any third party's. That covers the data in Your Connected Sources, Your question text, Your Metric Definitions, the files You attach, the files the Services generate, and the Outputs You receive. This is not something You have to opt out of: there is no checkbox, no consent gate, and no Subscription Plan on which it works differently. The ratings, corrections and edits You make to an Output are Your Data for the purposes of this clause and are not used as training data.</p>
        </div>

        {/* 14. AI Outputs and Verification */}
        <div id="ai-outputs" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>14. AI Outputs, Accuracy and Verification</h2>
          <p className="ins-text-body-lg" style={pStyle}>Outputs are generated by probabilistic models. They can be incomplete, mis-scoped or simply wrong, and a wrong figure can read as confidently as a right one. Resolving questions against Your Semantic Layer, and showing the steps that produced a number, reduce that risk but do not remove it: a Metric Definition that is wrong, a source that is stale or partial, or a question read differently than You meant it will each produce a plausible answer that does not hold. Devart therefore gives no warranty that an Output is accurate, complete, current or suitable for any decision.</p>
          <p className="ins-text-body-lg" style={pStyle}>You are responsible for verifying an Output before You rely on it. Use the execution steps shown with the answer, and check the figure against Your own source systems, before You act on it, publish it, report it, or put it in front of a customer, an investor or a regulator.</p>
          <p className="ins-text-body-lg" style={pStyle}>Outputs are not legal, tax, accounting, medical, investment or other professional advice, and We are not licensed to give such advice. Nothing an Output says is a recommendation to take any commercial or financial action, and You shall not present an Output as independently verified or audited.</p>
        </div>

        {/* 15. Limitation of Liability */}
        <div id="liability" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>15. Limitation of Liability</h2>
          <p className="ins-text-body-lg" style={pStyle}>Devart shall not, under any circumstances, be liable to you for any indirect, incidental, consequential, special or exemplary damages, or for loss of profits, revenue, data or goodwill, arising out of or in connection with the site or the services, whether such damages are based on breach of contract, breach of warranty or any other pecuniary loss, and whether or not it has been advised of the possibility of such damages. Devart's liability is further excluded for any decision taken in reliance on an Output, for the accuracy of any result the services return, and for any fault or unavailability of a Connected Source. Devart's total aggregate liability shall not exceed the fees you paid in the twelve (12) months preceding the event giving rise to the claim. Nothing in this clause limits Devart's liability for death or personal injury caused by negligence, for fraud, for its breach of clause 11.3 or clause 13, or for any liability that cannot lawfully be limited. Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for incidental or consequential damages; accordingly, some of the above limitations may not apply to you.</p>
        </div>

        {/* 16. Data Retention */}
        <div id="data-retention" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>16. Data Retention</h2>
          <p className="ins-text-body-lg" style={pStyle}>Devart commits to securely storing data on behalf of Our customers in accordance with their Subscription Plan and the time frames corresponding to it. All data exceeding the stated time frame will be routinely and automatically deleted from Our systems. Where this Agreement ends You have thirty (30) days from the termination date to export Your Data, after which We delete or anonymise it within thirty (30) days. Our <a href="/security/privacy" className="ins-link--inline">Privacy Policy</a> sets out the period for each category.</p>
        </div>

        {/* 17. Relationship of the Parties */}
        <div id="relationship" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>17. Relationship of the Parties</h2>
          <p className="ins-text-body-lg" style={pStyle}>Nothing in this Agreement creates a partnership, joint venture, agency or employment relationship between You and Devart; each party acts as an independent contractor. You may not assign this Agreement without Our prior written consent, and Devart may assign it in full to a successor in a merger, acquisition or sale of substantially all of its business. Neither party is liable for a failure caused by events beyond its reasonable control, save for the obligation to pay fees that are due. This Agreement is made in the English language, and where We supply a translation the English version prevails.</p>
        </div>

        {/* 18. Minimum age of users */}
        <div id="minimum-age" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>18. Minimum age of users</h2>
          <p className="ins-text-body-lg" style={pStyle}>All Users of Devart's Services must be at least 16 years of age and older than the age of legal majority in Your jurisdiction (if it is over 16). If You are under 16 You may not register a User Account or use the Services in any capacity.</p>
        </div>

        {/* 19. Disclaimer */}
        <div id="disclaimer" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>19. Disclaimer</h2>
          <p className="ins-text-body-lg" style={pStyle}>ALL INFORMATION CONTAINED ON THE INSIGHTIS SITE, AND ALL OUTPUT RETURNED BY THE INSIGHTIS SERVICES, IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTY OF ANY KIND, AND DEVART SPECIFICALLY DISCLAIMS ALL WARRANTIES, CONDITIONS OR OTHER TERMS, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES, CONDITIONS OR OTHER TERMS OF MERCHANTABILITY, SATISFACTORY QUALITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT, AND ANY WARRANTY THAT AN OUTPUT IS ACCURATE, COMPLETE, CURRENT OR FIT TO BE RELIED UPON. NO FIGURE RETURNED BY THE SERVICES SHOULD BE ACTED UPON BEFORE YOU HAVE VERIFIED IT. IN NO EVENT WILL DEVART BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOSS OF PROFITS, REVENUE, DATA OR USE, ARISING OUT OF THE USE OF, OR THE INABILITY TO USE, THE SITE OR THE SERVICES. THESE LIMITATIONS WILL APPLY NOTWITHSTANDING THE FAILURE OF THE ESSENTIAL PURPOSE OF ANY REMEDY. DEVART RESERVES THE RIGHT TO MAKE CHANGES OR UPDATES TO THIS SITE OR THE SERVICES DESCRIBED IN THIS SITE AT ANY TIME WITHOUT NOTICE.</p>
        </div>

        </div>
      </div>
    </section>
  );
}

/* ── APP ── */
function App() {
  return (
    <div>
      <Header />
      <main>
        <TermsContent />
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
