import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import FAQAccordion from '../components/FAQAccordion';

/* ── SECURITY CONTENT ── */
function SecurityContent() {
  const securityCards = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><rect x="10" y="11" width="4" height="5" rx="1"/><path d="M12 11V9a2 2 0 1 1 4 0"/></svg>,
      title: 'Data Encryption',
      desc: 'AES-256 encryption at rest, TLS 1.3 in transit, and fully encrypted backups. Your data is protected at every stage of the pipeline.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
      title: 'Infrastructure Security',
      desc: 'Cloud-hosted on enterprise infrastructure with network isolation, web application firewalls, and DDoS protection built in.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
      title: 'Access Controls',
      desc: 'Role-based access control, SSO/SAML integration, multi-factor authentication, and least-privilege access policies across the platform.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>,
      title: 'Application Security',
      desc: 'Regular security audits, automated dependency scanning, secure SDLC practices, and code reviews on every release.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
      title: 'Continuous Monitoring',
      desc: '24/7 infrastructure and application monitoring, anomaly detection, and real-time alerting for security events.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><path d="M12 14v4"/><path d="M12 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M20 6H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"/></svg>,
      title: 'Vulnerability Management',
      desc: 'Regular penetration testing, automated vulnerability scanning, and a responsible disclosure program for external researchers.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12l8.58 3.91a2 2 0 0 0 1.66 0L21 12"/><path d="M2 17l8.58 3.91a2 2 0 0 0 1.66 0L21 17"/></svg>,
      title: 'Data Isolation',
      desc: 'Tenant data is logically and physically isolated. Environment separation ensures no cross-contamination between accounts.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
      title: 'Incident Response',
      desc: 'Documented incident response plan with 24-hour customer notification, thorough post-incident reviews, and continuous improvement.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      title: 'Employee Security',
      desc: 'Background checks for all team members, mandatory security training, and least-privilege internal access controls.',
    },
  ];

  const complianceCards = [
    {
      icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M24 44s16-8 16-20V10l-16-6-16 6v14c0 12 16 20 16 20z"/><path d="M18 24l4 4 8-8"/></svg>,
      title: 'Read-only & encrypted',
      desc: 'Connectors are read-only and never write back; data is encrypted at rest (AES-256) and in transit (TLS 1.3).',
    },
    {
      icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="24" cy="24" r="16"/><path d="M16 18h16v12H16z"/><circle cx="24" cy="24" r="3"/><path d="M15 24h-3"/><path d="M36 24h-3"/><path d="M24 15v-3"/><path d="M24 36v-3"/></svg>,
      title: 'GDPR-aligned',
      desc: 'Data processed in-region with a transparent subprocessor list, full export and deletion at any time.',
    },
    {
      icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="10" y="6" width="28" height="36" rx="2"/><path d="M18 14h12"/><path d="M18 20h12"/><path d="M18 26h8"/><circle cx="24" cy="34" r="3"/><path d="M21 34l3 3 3-3"/></svg>,
      title: 'No AI training',
      desc: 'Your connected data is never used to train, fine-tune, or improve AI models.',
    },
  ];

  const promises = [
    'Your connected data is never used to train AI models',
    'You retain full ownership of all data and generated insights',
    'Data is processed in-region with a transparent subprocessor list',
    'Full data export and deletion available at any time',
    'Customer data isolated at the application and infrastructure level',
  ];

  const faqs = [
    {
      q: 'Where is my data stored?',
      a: 'Your data is stored in secure, encrypted cloud infrastructure. We use regionally distributed data centers to ensure low latency and compliance with data residency requirements. All data is encrypted at rest using AES-256 and in transit using TLS 1.3.',
    },
    {
      q: 'Is my data used to train AI models?',
      a: 'No. Your connected data is never used to train, fine-tune, or improve any AI models. Your data is only used to generate insights for your workspace. We maintain strict data boundaries between customers and AI model providers.',
    },
    {
      q: 'How is tenant data isolated?',
      a: 'Each customer workspace is logically isolated at the application and database level. We enforce strict access controls, separate encryption keys per tenant, and ensure no data can leak between accounts. Infrastructure is segmented to prevent cross-tenant access.',
    },
    {
      q: 'What happens when I connect a data source?',
      a: 'When you connect a data source, Insightis establishes a secure, encrypted connection using OAuth or API keys. We only read the data necessary to generate insights and never modify your source data. Credentials are encrypted and stored separately from application data.',
    },
    {
      q: 'Can I export or delete my data?',
      a: 'Yes. You can export all your data and generated insights at any time from your workspace settings. You can also request full data deletion, which removes all your data from our systems within 30 days, including backups.',
    },
    {
      q: 'Do you support SSO and SAML?',
      a: 'Yes. Insightis supports Single Sign-On (SSO) via SAML 2.0 and OIDC for enterprise customers. We also support multi-factor authentication (MFA) and integrate with major identity providers including Okta, Azure AD, and Google Workspace.',
    },
    {
      q: 'How do you handle security incidents?',
      a: 'We have a documented incident response plan that includes detection, containment, eradication, and recovery procedures. Affected customers are notified within 24 hours of a confirmed incident. We conduct thorough post-incident reviews and publish transparency reports.',
    },
    {
      q: 'What compliance certifications do you hold?',
      a: 'Insightis is GDPR-aligned and runs on cloud infrastructure from certified providers. All connections are read-only, data is encrypted in transit and at rest, and your data is never used to train AI models. Formal certifications are on our security roadmap.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section style={{padding:'120px 0 60px', position:'relative'}}>
        <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'100%', height:'100%', background:'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(9,160,157,.06) 0%, transparent 70%)', pointerEvents:'none'}}/>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px', textAlign:'center', position:'relative'}}>
          <div className="fu0 ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'var(--ins-size-5)'}}>
            <span style={{fontSize:'var(--ins-font-size-12)'}}>&#x2726;</span>
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', fontFamily:'var(--ins-font-family-mono)'}}>Security</span>
          </div>
          <h1 className="ins-text-display" style={{marginBottom:'var(--ins-size-5)'}}>
            Secure by design
          </h1>
          <p className="fu2 ins-text-body-xl" style={{maxWidth:'640px', margin:'0 auto'}}>
            Your data stays yours. Insightis is built with enterprise-grade security at every layer — from encryption and access controls to compliance certifications and continuous monitoring.
          </p>
          <div className="fu3" style={{display:'flex', justifyContent:'center', gap:'var(--ins-size-3)', marginTop:'var(--ins-size-8)', flexWrap:'wrap'}}>
            <Button as="a" href="mailto:security@insightis.ai" variant="primary" size="md">
              Contact security team
            </Button>
            <Button as="a" href="Privacy" variant="secondary" size="md">
              View privacy policy
            </Button>
          </div>
        </div>
      </section>

      {/* Security Controls Grid */}
      <section style={{padding:'80px 0'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
          <div style={{marginBottom:'var(--ins-size-14)'}}>
            <SectionHeader
              eyebrow="Enterprise Security"
              title="Built-in security at every layer"
              sparkle
            />
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'var(--ins-size-4)'}}>
            {securityCards.map((v, i) => (
              <div key={i} className="ins-feature-card">
                <div style={{width:'40px', height:'40px', borderRadius:'10px', background:'var(--ins-surface-brand-tint)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'var(--ins-size-4)'}}>
                  {v.icon}
                </div>
                <h3 style={{fontSize:'var(--ins-font-size-17)', fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:'var(--ins-size-2)'}}>{v.title}</h3>
                <p className="ins-text-body">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section style={{padding:'80px 0'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
          <div style={{marginBottom:'var(--ins-size-14)'}}>
            <SectionHeader
              eyebrow="Compliance"
              title="Industry-standard certifications"
              sparkle
            />
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'var(--ins-size-4)', maxWidth:'960px', margin:'0 auto'}}>
            {complianceCards.map((c, i) => (
              <div key={i} className="ins-feature-card ins-feature-card--interactive" style={{padding:'36px 28px', textAlign:'center'}}>
                <div style={{display:'flex', justifyContent:'center', marginBottom:'var(--ins-size-5)'}}>
                  {c.icon}
                </div>
                <h3 style={{fontSize:'var(--ins-font-size-17)', fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:'var(--ins-size-2)'}}>{c.title}</h3>
                <p className="ins-text-body">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Data Promise */}
      <section style={{padding:'80px 0'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
          <div style={{marginBottom:'var(--ins-size-14)'}}>
            <SectionHeader
              eyebrow="Data Protection"
              title="Your data, your rules"
              sparkle
            />
          </div>
          <div style={{maxWidth:'720px', margin:'0 auto'}}>
            <div className="ins-feature-card" style={{padding:'36px'}}>
              <div style={{display:'flex', flexDirection:'column', gap:'var(--ins-size-5)'}}>
                {promises.map((p, i) => (
                  <div key={i} style={{display:'flex', alignItems:'flex-start', gap:'14px'}}>
                    <div style={{flexShrink:0, marginTop:'var(--ins-size-half)'}}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                    <p className="ins-text-body-lg">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{padding:'80px 0'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
          <div style={{textAlign:'center', marginBottom:'var(--ins-size-14)'}}>
            <h2 className="ins-text-display">Frequently asked questions</h2>
          </div>
          <div style={{maxWidth:'760px', margin:'0 auto'}}>
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{padding:'80px 0 100px'}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
          <div style={{background:'rgba(9,160,157,.04)', border:'1px solid rgba(9,160,157,.2)', borderRadius:'24px', padding:'64px 32px', textAlign:'center', position:'relative', overflow:'hidden'}}>
            <div style={{position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(9,160,157,.4),transparent)'}}/>
            <div style={{position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 60% at 50% 0%, var(--ins-surface-brand-tint) 0%, transparent 70%)', pointerEvents:'none'}}/>
            <div style={{position:'relative'}}>
              <h3 style={{fontSize:'clamp(24px,3.5vw,36px)', fontWeight:500, color:'var(--ins-text-heading)', letterSpacing:'-.02em', marginBottom:'var(--ins-size-4)'}}>
                Have security questions?
              </h3>
              <p className="ins-text-body-lg ins-text--muted" style={{maxWidth:'520px', margin:'0 auto 32px'}}>
                Our security team is here to help with assessments, compliance documentation, and custom security requirements.
              </p>
              <Button as="a" href="mailto:security@insightis.ai" variant="primary" size="lg"
                iconEnd={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>}>
                Contact security team
              </Button>
              <p className="ins-text-body ins-text--muted" style={{marginTop:'var(--ins-size-4)'}}>security@insightis.ai</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── APP ── */
function App() {
  return (
    <div>
      <Header />
      <SecurityContent />
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
