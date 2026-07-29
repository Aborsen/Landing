import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* ── PRIVACY CONTENT ── */
function PrivacyContent() {
  const [activeSection, setActiveSection] = useState('data-collected');
  const sections = [
    { id: 'data-collected', title: 'Data Collected' },
    { id: 'use-of-data', title: 'Use of the Data' },
    { id: 'who-has-access', title: 'Who Has Access to the Data' },
    { id: 'connected-data', title: 'Your Connected Data' },
    { id: 'ai-processing', title: 'AI Processing' },
    { id: 'where-stored', title: 'Where the Data is Stored' },
    { id: 'gdpr', title: 'GDPR Compliance' },
    { id: 'sharing', title: 'Sharing of Data' },
    { id: 'do-not-submit', title: 'Data You Should Not Submit' },
    { id: 'revisions', title: 'Revisions to this Policy' },
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  const sectionStyle = { marginTop: 'var(--ins-size-12)', scrollMarginTop: '100px' };
  const pStyle = { marginBottom: 'var(--ins-size-4)' };
  const h3Style = { marginTop: 'var(--ins-size-6)', marginBottom: 'var(--ins-size-2)' };
  const ulStyle = { paddingLeft: 'var(--ins-size-6)', listStyleType: 'disc', color: 'var(--ins-text-body)', display: 'flex', flexDirection: 'column', gap: 'var(--ins-size-2)', marginBottom: 'var(--ins-size-4)', fontSize: 'var(--ins-font-size-15)', lineHeight: 1.8 };

  return (
    <section style={{ position: 'relative' }}>
      {/* Hero */}
      <div style={{ padding: '120px 0 60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h1 className="ins-text-display">
            Privacy Policy
          </h1>
          <p className="fu2 ins-text-body ins-text--muted" style={{marginTop: 'var(--ins-size-3)'}}>
            Effective as of July 29, 2026
          </p>
          <p className="ins-text-body-lg" style={{marginTop: 'var(--ins-size-8)'}}>
            Your privacy is important to us at Devart. This Privacy Policy describes what data Insightis collects and how we manage it.
          </p>
        </div>
      </div>

      {/* Two-column: TOC + Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px', display: 'flex', gap: 'var(--ins-size-14)', alignItems: 'flex-start' }}>

        {/* Sticky TOC */}
        <div role="navigation" aria-label="On this page" className="hidden md:block" style={{ width: '200px', flexShrink: 0, position: 'sticky', top: '90px' }}>
          <p className="ins-toc__title">On this page</p>
          <div className="ins-toc__list">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} className={'ins-toc__link' + (activeSection === s.id ? ' is-active' : '')}>
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>

        {/* Preamble */}
        <div style={{ scrollMarginTop: '100px' }}>
          <p className="ins-text-body-lg" style={pStyle}>
            By using insightis.ai (the “Site”) and/or registering an Insightis account (using the “Service”), you agree to the terms of this Privacy Policy and the Terms of Service. Insightis is designed and operated by Devart Ltd. (“Devart”, or “We”, “Our”, or “Us”), 3422 Old Capitol Trl, Wilmington, Delaware, USA 19808. Please read the Terms of Service in their entirety, and refer to those for definitions and contacts.
          </p>
          <ul style={ulStyle}>
            <li>We never sell your personal data to anyone.</li>
            <li>Your data is never used to train, fine-tune, or improve any AI model — ours or a model provider's.</li>
            <li>Your business data stays in the systems you connect. Insightis composes a query, runs it against your source, and returns the result rather than copying your source wholesale.</li>
            <li>Connectors are read-only, and your connection credentials are never sent to the AI models.</li>
            <li>We never share the contents of a workspace with anyone, or between workspaces, without your explicit permission.</li>
            <li>Your data is yours and you can change or delete it at any time.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            To exercise any of the rights mentioned in this Privacy Policy, or in the event of questions or comments relating to the use of personal data, please write to <a href="mailto:privacy@insightis.ai" className="ins-link--inline">privacy@insightis.ai</a>.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            One thing to know about timing: the Insightis application is not open yet. Sign-up and sign-in are placeholders that collect nothing, and no form on the Site submits anything to us. Where this policy describes accounts, billing, connections, and in-product processing, it describes how that data will be handled once the application is available.
          </p>
        </div>

        {/* 1. Data Collected */}
        <div id="data-collected" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>1. Data Collected</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            We collect the following categories of data.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>Site Usage Data</h3>
          <p className="ins-text-body-lg" style={pStyle}>
            Devart and its partners use cookies or similar technologies to administer the Site, analyze trends, and track users’ movements around the Site, as set out in our Cookies Policy. This information is stored in a pseudonymized user profile and is not processed to identify individual users or matched with further data on an individual user. Standard technical information — your IP address, your user agent, and the page requested — reaches our hosting provider in the ordinary course of serving pages. Two areas of the Site also ask your browser to fetch images from third-party hosts: flagcdn.com, for country flags on the About and Contacts pages, and images.unsplash.com, for photographs on the blog and customer-story pages. Those hosts set no cookies, but the request tells them your IP address and user agent.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>Cookies</h3>
          <p className="ins-text-body-lg" style={pStyle}>
            We use cookies and similar technologies on the Site, as listed in our Cookies Policy — first-party cookies that run sign-in and your session, and third-party cookies set by our analytics and advertising partners. A notice at the foot of the page links to the Cookies Policy; dismissing it stores one browser localStorage entry, ins_cookie_notice, so it stays dismissed. Your browser lets you block or delete cookies for any site, including ours, and the Cookies Policy carries opt-out links for the advertising partners.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>User Profile Data</h3>
          <p className="ins-text-body-lg" style={pStyle}>
            When you sign up we collect the email address the account is created under and the password you set. If you choose Continue with Google, access is controlled by your Google account and there is no Insightis password. We also store your theme preference and the plan your workspace is on.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>Workspace Data</h3>
          <p className="ins-text-body-lg" style={pStyle}>
            Devart stores the connections you create, your Semantic Layer metric definitions, the schema metadata we cache so the AI does not have to rediscover your tables on every question, the query results we cache to keep AI Chat responsive, and the files you attach or the Service generates. We also meter token consumption, derived from the length of your questions and answers, to show your balance and charge your plan.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>Prompts, Chats, and Generated Queries</h3>
          <p className="ins-text-body-lg" style={pStyle}>
            A chat in Insightis is a working record, not a transient session. Both sides of it persist in your workspace:
          </p>
          <ul style={ulStyle}>
            <li>the question you asked, and any clarifications you gave;</li>
            <li>how Insightis interpreted the question, and the query it generated;</li>
            <li>the answer returned, and the steps that produced it;</li>
            <li>files you attached, kept so you can reuse the same upload later;</li>
            <li>files the Service generated — charts, result tables, exported spreadsheets.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            Prompts are free text. Nothing stops you from typing a customer's name or an employee's name into a question, and the generated query may carry the same identifiers, so chat history is a store of personal data whose contents you control. Keep out of prompts anything you would not want stored.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>Payment Information</h3>
          <p className="ins-text-body-lg" style={pStyle}>
            Card payments are processed by 2Checkout, the authorised payment provider for Devart products. Your card details go to 2Checkout directly and are not stored on Insightis servers — we keep only the card brand and the last four digits, so you can recognise the card on file, along with your plan, your invoices, and any one-time token purchases.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>Support and Feedback</h3>
          <p className="ins-text-body-lg" style={pStyle}>
            When you contact support we collect what you send us: the category, subject, and description of your request, an email address if you provide one, and any attachments. Feedback you send about the Service, including corrections you make to an answer, belongs to you. We use it to fix and improve the product, never as training data.
          </p>
        </div>

        {/* 2. Use of the Data */}
        <div id="use-of-data" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>2. Use of the Data</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            We use your personal data to provide the Service, to bill for it, and to communicate with you about it. This includes both automated and manual processing of data. Under the GDPR every purpose needs a lawful basis, and the bases below are ours as controller.
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Providing and operating the Service:</strong> running your questions against your connected sources, storing your metric definitions and files, and returning answers. Basis: performance of our contract, Art. 6(1)(b).</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Token metering and billing:</strong> measuring consumption, showing your balance, charging your plan, and issuing invoices. Basis: performance of our contract, Art. 6(1)(b), and legal obligation for tax and accounting records, Art. 6(1)(c).</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Security and abuse prevention:</strong> detecting unauthorised access, investigating abuse, and keeping the Service available. Basis: legitimate interests, Art. 6(1)(f).</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Communications:</strong> account notices, security alerts, and material changes to this policy or the Terms. Basis: performance of our contract, Art. 6(1)(b). If you opt in, we may also send product news; basis: consent, Art. 6(1)(a), and you can opt out at the bottom of any Insightis email.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Maintaining and improving the Service:</strong> aggregate usage telemetry — which features are used, error rates, performance. Basis: legitimate interests, Art. 6(1)(f). This covers aggregate telemetry only. It is not a basis for using the contents of your connected sources, your prompts, your chat history, or your files, and it is never a basis for training AI models.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            Where we rely on legitimate interests you can object, and where we rely on consent you can withdraw it at any time. If you decline to provide the account data the Service needs, we cannot create or maintain your account. Connecting a data source and uploading a file are always your choice.
          </p>
        </div>

        {/* 3. Who Has Access to the Data */}
        <div id="who-has-access" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>3. Who Has Access to the Data</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            Two roles, worth keeping apart. We are the controller for your account and profile data, billing records, workspace and usage telemetry, Site technical data, correspondence, and security logs. We are a processor for what your team puts into the workspace: the content read from your connected sources and the results of our queries, your prompts and the queries generated from them, your files, your metric definitions, and cached schema metadata. For that second category the customer — normally the organisation whose workspace it is — is the controller, decides what gets connected, and needs a lawful basis for it.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            If your personal data sits in a source one of our customers connected — a contact in their CRM, an employee in their HR data — we are that customer's processor, not your controller, so your request belongs with the organisation you have a relationship with. If you write to us and we can identify the customer, we will tell you so and forward it.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            Devart employees or contractors may access your account and the information you have provided for support, maintenance, and servicing purposes, or for security-related, technical, or billing reasons. Data in a workspace is specifically not shared between accounts or with the public.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            Data is encrypted in transit with TLS 1.2 or higher and at rest with AES-256. We hold no security certification today and will not claim one before it is issued. If we confirm a personal-data breach we will notify affected customers within 24 hours, matching the commitment on our Security page. Where we are the controller and the breach is notifiable, we will notify the supervisory authority within 72 hours, as GDPR Art. 33 requires. For more, see our <a href="/security/security" className="ins-link--inline">Security</a> page.
          </p>
        </div>

        {/* 4. Your Connected Data */}
        <div id="connected-data" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>4. Your Connected Data</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            Insightis is built to read your systems rather than copy them. Three different things happen to data from a connected source, and they should not be blurred together:
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Queried in place.</strong> When you ask a question, Insightis composes a query and runs it against the connected source. Raw rows are not copied into Insightis storage except through the cache below.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Cached for performance.</strong> Query results and schema metadata are cached, scoped to your workspace, and expire on the Metadata Cache interval you set for each connection.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Stored long-term.</strong> Metric definitions, uploaded and generated files, and your account and workspace settings are stored until you delete them.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            So your source system stays the system of record, and what Insightis holds is metadata, cached results, definitions, and files. An upload is the exception: a .csv, .xlsx, or .xls file you attach to a chat is a copy held inside Insightis, and you alone decide what is in it.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            Connectors request the minimum permission needed to read the data you selected — never to write, never to delete. Most use OAuth, so you never share a raw password with us; otherwise they use scoped API keys or read-only database credentials. Credentials are held in a dedicated secrets vault with envelope encryption, never logged, never displayed again after you enter them, and never sent to the AI models. Each chat can read only the connections you enable for it.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            One clarification worth making: the systems in our connector catalogue are your systems, not recipients of your data. Connecting a warehouse, a CRM, or a spreadsheet does not mean we send your data to that company — it means we read from an account you control there. The third parties that do receive data on our behalf are named in section 8.
          </p>
        </div>

        {/* 5. AI Processing */}
        <div id="ai-processing" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>5. AI Processing</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            AI Chat and the Insights Engine run on AI models from third-party providers, so some of what you type does leave our systems. This section says precisely what.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>What Is Sent to Model Providers</h3>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>May be sent:</strong> your question text and the relevant metric definitions, so a query plan and the written explanation that comes with an answer can be produced.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Not sent:</strong> raw rows from your connected sources, unless you explicitly ask for them — for example when you ask to see the underlying records.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Never sent:</strong> your connection credentials. They stay in the secrets vault.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Provider retention:</strong> each provider holds the request for a limited period under its standard API terms, for abuse monitoring only, and then deletes it. Neither uses it to train a model.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            Insightis Light, Medium, and Pro combine OpenAI and Anthropic models, routing each step of a question to whichever provider handles it best; both are named as sub-processors in section 8. Choosing a configuration changes how much reasoning is applied and how many tokens you spend, never what is sent or where it goes. Model calls are served by OpenAI&rsquo;s and Anthropic&rsquo;s own API infrastructure, which may process a request outside the EEA even though the application itself runs in Europe. Both are used through their business APIs, under the standard API terms: request content is not used to train their models, and is retained only briefly for abuse monitoring. We do not use either company&rsquo;s consumer products, where different terms apply.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>We Do Not Train AI Models on Your Data</h3>
          <p className="ins-text-body-lg" style={pStyle}>
            Insightis is not a training pipeline. Your data is never used to train, fine-tune, or improve any AI or machine-learning model, ours or a third party's — not the data read from your connected sources or the results of your queries, not your questions or chat transcripts, not the files you upload or the files the Service generates, not your metric definitions or cached schema metadata, and not the answers you receive.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            This is not something you have to opt out of; there is no checkbox and no plan on which it works differently. Question text and metric definitions go to model providers under API terms that prohibit training on the content of a request. That prohibition is what the commitment rests on: the providers do hold a request briefly for abuse monitoring, so the guarantee is contractual rather than a claim that nothing is ever stored anywhere. Product improvement relies on the aggregate telemetry in section 2.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>Accuracy and Verification</h3>
          <p className="ins-text-body-lg" style={pStyle}>
            AI output can be wrong, and a wrong figure reads as confidently as a right one. Grounding each answer in the metric definitions your team approved, and showing the steps behind it, reduces that risk without removing it: a wrong definition, a stale source, or a misread question each produce a plausible answer that does not hold. We make no warranty that an answer is accurate, complete, or suitable for a decision, and nothing Insightis returns is legal, tax, accounting, medical, or investment advice.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            Before a figure is acted on, published, or shown to a customer, an investor, or a regulator, the person relying on it has to check those steps against their own source systems. Insightis does not decide anything about a person; it answers a question a person asked. We do not profile individuals, and decisions about employment, credit, insurance, housing, education, or access to essential services must not rest on AI output — they need your own human review and your own lawful basis.
          </p>
        </div>

        {/* 6. Where the Data is Stored */}
        <div id="where-stored" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>6. Where the Data is Stored</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            Insightis runs on managed cloud infrastructure in Europe. The application, its caches and its backups are hosted in the European Union. The exception is the model providers: as section 5 explains, a question sent to a model is processed on their own infrastructure, which may sit outside the EEA.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            Because we rely on third-party model providers and on connector infrastructure, personal data may be processed outside the country you are in. Sending question text to a model endpoint in another country is itself a transfer, not an incidental technical step. Where data leaves the EEA, the UK, or Switzerland we rely on the European Commission's Standard Contractual Clauses. We do not currently offer a choice of data region, so if in-region processing is a requirement for you, talk to us before you connect a source.
          </p>
        </div>

        {/* 7. GDPR Compliance */}
        <div id="gdpr" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>7. GDPR Compliance</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            This section covers your rights, how long we keep data, and the agreement that governs our processing for you.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>Your Data Protection Rights Under GDPR</h3>
          <p className="ins-text-body-lg" style={pStyle}>
            Where we hold personal data about you as controller, you have the right to:
          </p>
          <ul style={ulStyle}>
            <li>access a copy of it, and receive it in a machine-readable form you can take elsewhere;</li>
            <li>have inaccurate or incomplete data corrected;</li>
            <li>have it deleted, or have our use of it restricted, subject to the exceptions the law allows;</li>
            <li>object to processing based on our legitimate interests, and to direct marketing at any time;</li>
            <li>withdraw consent where we rely on it, without affecting the lawfulness of earlier processing;</li>
            <li>complain to the data protection authority for the country where you live or work.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            You can exercise these rights by emailing <a href="mailto:privacy@insightis.ai" className="ins-link--inline">privacy@insightis.ai</a>, writing from the address your account uses where you can. If we cannot identify you from the request we may ask for the minimum information needed to verify who you are, and we use it only for that. We will respond within 30 days and will tell you if a complex request needs longer. An authorised agent may act for you with written permission.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            You can also do much of this yourself: delete a file from Files, remove a connection from My Connections, or delete your account from My Account, which also clears the datasets you connected or uploaded and your chat sessions. If you live in a US state with a comprehensive privacy law the same rights apply, and since we do not sell personal information or share it for cross-context behavioural advertising, there is nothing to opt out of.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>Data Retention Schedule</h3>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Account data:</strong> kept while your account exists, and for up to 30 days after closure so it can be reactivated.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Metric definitions and files:</strong> kept until you delete them.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Prompts and chat transcripts:</strong> kept as the working record of a chat until you delete the chat. Prompt content is never written to our application or infrastructure logs &mdash; it is transmitted to the model provider to answer the question, and nowhere else.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Cached query results:</strong> purged within 24 hours unless you save the result.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Cached schema metadata:</strong> purged on the Metadata Cache interval set for the connection.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Usage logs:</strong> kept for up to 12 months for analytics and security, then anonymised or deleted.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Billing records:</strong> kept for as long as tax and accounting law requires.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            Deleting your account is permanent and cannot be undone. Data is removed from primary storage within 30 days and ages out of encrypted backups within 90 days, so export anything you want to keep first — the Terms of Service give you a 30-day window after termination to do it.
          </p>

          <h3 className="ins-text-h3" style={h3Style}>Data Processing Agreement</h3>
          <p className="ins-text-body-lg" style={pStyle}>
            Where we process personal data on your behalf as processor — the workspace content described in section 3 — GDPR Art. 28 requires a written agreement between us. Our external sub-processors are engaged under data-processing terms. Skyvia is part of the same corporate group as Insightis rather than an unrelated third party, and is covered in section 8. A data processing agreement is available on request: write to <a href="mailto:privacy@insightis.ai" className="ins-link--inline">privacy@insightis.ai</a> and we will send one for signature. Where an agreement is in place and its terms differ from this policy for the content it covers, that agreement prevails.
          </p>
        </div>

        {/* 8. Sharing of Data */}
        <div id="sharing" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>8. Sharing of Data</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            We do not sell your personal data and we do not share it for advertising. We do use a small number of providers to run Insightis, each processing personal data only on our instructions and under a written agreement. Feel free to check out their own privacy policies to find out more.
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Skyvia</strong> — our data connectors provider, reached through Skyvia's embedded MCP integration. It sits in the path between a connected source and Insightis when a query runs. Skyvia is also a Devart product, so this is a provider inside our own group rather than an unrelated third party. Connector traffic is processed on Skyvia&rsquo;s platform, and what it retains is governed by Skyvia&rsquo;s own terms.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>OpenAI</strong> — AI model provider, used for structured reasoning and for turning a question into a query plan. Receives question text and metric definitions.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Anthropic</strong> — AI model provider, used for long-context reasoning and for the written explanation attached to an answer. Receives question text and metric definitions.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>2Checkout</strong> — payment processing, as the authorised payment provider for Devart products. Receives your card and billing details directly; we receive the card brand and the last four digits.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Google</strong> — identity provider, where you choose Continue with Google. Receives an authentication request.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Cloud hosting</strong> — runs the application, its caches, and its backups. See section 6.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            Beyond these providers we disclose data only where the law requires it — and we will tell the affected customer first where we are permitted to — as part of a merger, acquisition, or sale of assets, in which case we will notify you, or when you ask us to.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            Before we engage a new sub-processor that will process customer content, we will publish notice here at least 30 days in advance, naming the provider and its role. Customers may object in writing to <a href="mailto:privacy@insightis.ai" className="ins-link--inline">privacy@insightis.ai</a> during that period.
          </p>
        </div>

        {/* 9. Data You Should Not Submit */}
        <div id="do-not-submit" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>9. Data You Should Not Submit</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            Insightis reads whatever source you connect and whatever file you attach, and it has no way to tell that a table holds health records, biometric data, government identifiers, or data about children. Once that content is in the pipeline it can appear in query results, and if you type it into a question it can appear in the text sent to a model provider.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            So the decision is yours, and so is the responsibility. Check that you may lawfully put the data into a third-party analytics service, apply your own minimisation — connect the tables you need rather than the whole database — and keep special-category data out where you can. Never put credentials, secrets, or payment card numbers into a prompt, an upload, or a support ticket; connection credentials belong in the connection form, which routes them straight to the secrets vault.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            Insightis is a business product for organisations. It is not directed at anyone under 16, we do not knowingly collect personal data from children under 16, and if we learn that we have, we will delete it as promptly as we can.
          </p>
        </div>

        {/* 10. Revisions to this Privacy Policy */}
        <div id="revisions" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>10. Revisions to this Privacy Policy</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            We may revise this Privacy Policy from time to time, and the current version always carries its effective date at the top of this page. For material changes — a new category of data, a new purpose, a new sub-processor handling customer content, or any new flow that sends customer content to a third party — we will post the revision with a new effective date and notify you before it takes effect.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            Some capabilities on our roadmap would create new outbound flows, such as sending workspace data to external AI clients. None is live, none is authorised by this policy, and we will update this policy and give notice before any of them processes your data.
          </p>
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
      <PrivacyContent />
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
