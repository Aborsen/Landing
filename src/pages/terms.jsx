import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* ── TERMS CONTENT ── */
function TermsContent() {
  const [activeSection, setActiveSection] = useState('acceptance');
  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'description', title: 'Description of Service' },
    { id: 'account', title: 'Account Registration' },
    { id: 'acceptable-use', title: 'Acceptable Use' },
    { id: 'data-integrations', title: 'Data & Integrations' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'billing', title: 'Subscription & Billing' },
    { id: 'availability', title: 'Service Availability' },
    { id: 'liability', title: 'Limitation of Liability' },
    { id: 'indemnification', title: 'Indemnification' },
    { id: 'termination', title: 'Termination' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'changes', title: 'Changes to Terms' },
    { id: 'contact', title: 'Contact Us' },
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 }
    );
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  const sectionStyle = { marginBottom: '48px', scrollMarginTop: '100px' };
  const h2Style = { fontSize: '20px', fontWeight: 600, color: 'var(--ins-text-heading-soft)', marginBottom: '16px', letterSpacing: '-.01em' };
  const pStyle = { marginBottom: '14px' };
  const ulStyle = { fontSize: '15px', color: 'var(--ins-text-body)', lineHeight: 1.8, paddingLeft: '24px', marginBottom: '14px', listStyleType: 'disc' };

  return (
    <section style={{position:'relative'}}>
      {/* Hero */}
      <div style={{padding:'120px 0 60px'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', padding:'0 24px', textAlign:'center'}}>
          <h1 className="fu1" style={{fontSize:'clamp(32px,5vw,48px)', fontWeight:500, letterSpacing:'-.03em', lineHeight:1.15, marginBottom:'16px', color:'var(--ins-text-heading-soft)'}}>Terms of Service</h1>
          <p className="fu2 ins-text-body ins-text--muted ins-text--mono" style={{marginBottom:'20px'}}>Effective Date: April 6, 2026</p>
          <p className="fu3 ins-text-body-lg ins-text--muted" style={pStyle}>These Terms of Service govern your access to and use of the Insightis platform, an AI-powered analytics workspace developed and operated by Devart. By accessing or using Insightis, you agree to be bound by these Terms. Please read them carefully before using the Service.</p>
        </div>
      </div>

      {/* Two-column: TOC + Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px', display: 'flex', gap: '56px', alignItems: 'flex-start' }}>

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

        {/* 1. Acceptance of Terms */}
        <div id="acceptance" style={sectionStyle}>
          <h2 style={h2Style}>1. Acceptance of Terms</h2>
          <p className="ins-text-body-lg" style={pStyle}>By creating an account, accessing, or using Insightis (the "Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.</p>
          <p className="ins-text-body-lg" style={pStyle}>You must be at least 16 years of age to use the Service. If you are under 16, you may not create an account or use Insightis in any capacity. By using the Service, you represent that you meet this age requirement.</p>
        </div>

        {/* 2. Description of Service */}
        <div id="description" style={sectionStyle}>
          <h2 style={h2Style}>2. Description of Service</h2>
          <p className="ins-text-body-lg" style={pStyle}>Insightis is an AI analytics workspace that enables users to connect their business data sources, ask questions in natural language, and receive accurate, data-driven answers. The Service includes, but is not limited to:</p>
          <ul style={ulStyle}>
            <li>AI Chat for natural language data queries</li>
            <li>Integration with 200+ data sources including databases, SaaS platforms, spreadsheets, and cloud warehouses</li>
            <li>Semantic Layer for certified, consistent metric definitions across your organization</li>
            <li>Insights Engine for automated root-cause analysis and trend detection</li>
            <li>Reports for saving, scheduling, and sharing analytical outputs</li>
            <li>Memory and contextual learning capabilities that adapt to your business over time</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>The specific features available to you may vary depending on your subscription plan. Feature availability and limits are described on our <a href="../Pricing" style={{color:'var(--ins-text-highlight)', textDecoration:'none', borderBottom:'1px solid var(--ins-color-teal-a-30)'}}>Pricing</a> page.</p>
        </div>

        {/* 3. Account Registration and Security */}
        <div id="account" style={sectionStyle}>
          <h2 style={h2Style}>3. Account Registration and Security</h2>
          <p className="ins-text-body-lg" style={pStyle}>To access the Service, you must create an account and provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          <p className="ins-text-body-lg" style={pStyle}>You agree to:</p>
          <ul style={ulStyle}>
            <li>Provide truthful and accurate registration information</li>
            <li>Keep your login credentials secure and confidential</li>
            <li>Notify Insightis immediately at <a href="mailto:legal@insightis.ai" style={{color:'var(--ins-text-highlight)', textDecoration:'none', borderBottom:'1px solid var(--ins-color-teal-a-30)'}}>legal@insightis.ai</a> if you suspect any unauthorized access to or use of your account</li>
            <li>Not share your account credentials with third parties</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>Insightis will not be liable for any loss or damage arising from your failure to protect your account credentials.</p>
        </div>

        {/* 4. Acceptable Use */}
        <div id="acceptable-use" style={sectionStyle}>
          <h2 style={h2Style}>4. Acceptable Use</h2>
          <p className="ins-text-body-lg" style={pStyle}>You agree to use the Service only for lawful purposes and in accordance with these Terms. You shall not:</p>
          <ul style={ulStyle}>
            <li>Use the Service in any way that violates applicable local, national, or international law or regulation</li>
            <li>Attempt to reverse engineer, decompile, disassemble, or otherwise attempt to discover the source code or underlying algorithms of the Service</li>
            <li>Access or attempt to access the Service through any unauthorized means, including automated bots, scraping tools, or hacking techniques</li>
            <li>Interfere with or disrupt the integrity or performance of the Service or its underlying infrastructure</li>
            <li>Use the Service to transmit any malware, viruses, or other harmful code</li>
            <li>Resell, sublicense, or redistribute access to the Service without prior written consent from Insightis</li>
            <li>Use the Service to store or process data that you do not have the legal right to use</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>Insightis reserves the right to investigate and take appropriate action against anyone who violates these provisions, including suspending or terminating access to the Service.</p>
        </div>

        {/* 5. Data and Integrations */}
        <div id="data-integrations" style={sectionStyle}>
          <h2 style={h2Style}>5. Data and Integrations</h2>
          <p className="ins-text-body-lg" style={pStyle}>You retain full ownership of all data that you connect to, upload to, or generate through the Service ("Your Data"). Insightis does not claim ownership over Your Data.</p>
          <p className="ins-text-body-lg" style={pStyle}>By using the Service, you grant Insightis a limited, non-exclusive, worldwide license to access, process, analyze, and display Your Data solely for the purpose of providing and improving the Service. This license is strictly limited to what is necessary to deliver the analytics functionality you have requested.</p>
          <p className="ins-text-body-lg" style={pStyle}>You represent and warrant that:</p>
          <ul style={ulStyle}>
            <li>You have all necessary rights, permissions, and consents to connect your data sources to Insightis</li>
            <li>Your use of the Service in connection with Your Data does not violate any applicable data protection laws, third-party agreements, or privacy regulations</li>
            <li>You are solely responsible for the accuracy, quality, and legality of Your Data</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>For details on how we handle, store, and protect Your Data, please refer to our <a href="Privacy" style={{color:'var(--ins-text-highlight)', textDecoration:'none', borderBottom:'1px solid var(--ins-color-teal-a-30)'}}>Privacy Policy</a> and <a href="Security" style={{color:'var(--ins-text-highlight)', textDecoration:'none', borderBottom:'1px solid var(--ins-color-teal-a-30)'}}>Security</a> page.</p>
        </div>

        {/* 6. Intellectual Property */}
        <div id="intellectual-property" style={sectionStyle}>
          <h2 style={h2Style}>6. Intellectual Property</h2>
          <p className="ins-text-body-lg" style={pStyle}>The Service, including its software, design, architecture, algorithms, documentation, trademarks, and all related intellectual property, is and remains the exclusive property of Devart and its licensors. Nothing in these Terms grants you any right, title, or interest in the Service beyond the limited right to use it in accordance with these Terms.</p>
          <p className="ins-text-body-lg" style={pStyle}>You retain ownership of Your Data and any analytical outputs (such as reports and saved answers) generated through the Service using Your Data.</p>
          <p className="ins-text-body-lg" style={pStyle}>If you provide feedback, suggestions, or ideas regarding the Service, you grant Insightis a perpetual, irrevocable, royalty-free, worldwide license to use, modify, and incorporate such feedback into the Service without any obligation or compensation to you.</p>
        </div>

        {/* 7. Subscription and Billing */}
        <div id="billing" style={sectionStyle}>
          <h2 style={h2Style}>7. Subscription and Billing</h2>
          <p className="ins-text-body-lg" style={pStyle}>Insightis offers various subscription plans as described on our <a href="../Pricing" style={{color:'var(--ins-text-highlight)', textDecoration:'none', borderBottom:'1px solid var(--ins-color-teal-a-30)'}}>Pricing</a> page. By subscribing to a paid plan, you agree to pay all applicable fees in accordance with the billing terms presented at the time of purchase.</p>
          <ul style={ulStyle}>
            <li><strong style={{color:'var(--ins-text-body)'}}>Auto-Renewal:</strong> Paid subscriptions automatically renew at the end of each billing cycle (monthly or annually) unless you cancel before the renewal date.</li>
            <li><strong style={{color:'var(--ins-text-body)'}}>Cancellation:</strong> You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period. You will continue to have access to paid features until the end of that period.</li>
            <li><strong style={{color:'var(--ins-text-body)'}}>Refunds:</strong> Fees are generally non-refundable except where required by applicable law. If you believe you are entitled to a refund, please contact us at <a href="mailto:legal@insightis.ai" style={{color:'var(--ins-text-highlight)', textDecoration:'none', borderBottom:'1px solid var(--ins-color-teal-a-30)'}}>legal@insightis.ai</a>.</li>
            <li><strong style={{color:'var(--ins-text-body)'}}>Price Changes:</strong> Insightis reserves the right to modify pricing. We will provide at least 30 days' notice before any price increase takes effect on your account.</li>
          </ul>
        </div>

        {/* 8. Service Availability and Modifications */}
        <div id="availability" style={sectionStyle}>
          <h2 style={h2Style}>8. Service Availability and Modifications</h2>
          <p className="ins-text-body-lg" style={pStyle}>Insightis uses commercially reasonable efforts to maintain high availability and uptime for the Service. However, we do not guarantee uninterrupted or error-free access. The Service may be temporarily unavailable due to scheduled maintenance, updates, or circumstances beyond our reasonable control.</p>
          <p className="ins-text-body-lg" style={pStyle}>We reserve the right to modify, update, or discontinue features of the Service at any time. For material changes that significantly affect your use of the Service, we will provide reasonable advance notice (typically at least 30 days) via email or in-app notification.</p>
        </div>

        {/* 9. Limitation of Liability */}
        <div id="liability" style={sectionStyle}>
          <h2 style={h2Style}>9. Limitation of Liability</h2>
          <p className="ins-text-body-lg" style={pStyle}>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
          <p className="ins-text-body-lg" style={pStyle}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, INSIGHTIS AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF THE SERVICE.</p>
          <p className="ins-text-body-lg" style={pStyle}>IN NO EVENT SHALL THE TOTAL LIABILITY OF INSIGHTIS EXCEED THE AGGREGATE AMOUNT OF FEES PAID BY YOU TO INSIGHTIS DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.</p>
        </div>

        {/* 10. Indemnification */}
        <div id="indemnification" style={sectionStyle}>
          <h2 style={h2Style}>10. Indemnification</h2>
          <p className="ins-text-body-lg" style={pStyle}>You agree to indemnify, defend, and hold harmless Insightis, Devart, and their respective officers, directors, employees, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to:</p>
          <ul style={ulStyle}>
            <li>Your use or misuse of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any applicable law or regulation</li>
            <li>Your Data or the connection of your data sources to the Service</li>
            <li>Any third-party claims related to your use of analytical outputs generated by the Service</li>
          </ul>
        </div>

        {/* 11. Termination */}
        <div id="termination" style={sectionStyle}>
          <h2 style={h2Style}>11. Termination</h2>
          <p className="ins-text-body-lg" style={pStyle}>Either party may terminate these Terms at any time. You may terminate by closing your account through your account settings or by contacting us at <a href="mailto:legal@insightis.ai" style={{color:'var(--ins-text-highlight)', textDecoration:'none', borderBottom:'1px solid var(--ins-color-teal-a-30)'}}>legal@insightis.ai</a>.</p>
          <p className="ins-text-body-lg" style={pStyle}>Insightis may suspend or terminate your access to the Service immediately, without prior notice, if:</p>
          <ul style={ulStyle}>
            <li>You breach any provision of these Terms</li>
            <li>Your use of the Service poses a security risk to the Service or other users</li>
            <li>We are required to do so by law</li>
            <li>Your account has been inactive for an extended period</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>Upon termination, you will have a 30-day window to export Your Data from the Service. After this period, we may delete Your Data in accordance with our data retention policies. Sections of these Terms that by their nature should survive termination will remain in effect.</p>
        </div>

        {/* 12. Governing Law and Dispute Resolution */}
        <div id="governing-law" style={sectionStyle}>
          <h2 style={h2Style}>12. Governing Law and Dispute Resolution</h2>
          <p className="ins-text-body-lg" style={pStyle}>These Terms shall be governed by and construed in accordance with the laws of the Czech Republic, without regard to its conflict of law provisions. Devart, the company behind Insightis, is incorporated and headquartered in the Czech Republic.</p>
          <p className="ins-text-body-lg" style={pStyle}>Any disputes arising out of or in connection with these Terms shall first be attempted to be resolved through good-faith negotiation between the parties. If a resolution cannot be reached within 30 days, the dispute shall be submitted to the competent courts of the Czech Republic.</p>
        </div>

        {/* 13. Changes to Terms */}
        <div id="changes" style={sectionStyle}>
          <h2 style={h2Style}>13. Changes to Terms</h2>
          <p className="ins-text-body-lg" style={pStyle}>Insightis reserves the right to update or modify these Terms at any time. When we make material changes, we will provide at least 30 days' advance notice by posting the updated Terms on our website and notifying you via email or in-app notification.</p>
          <p className="ins-text-body-lg" style={pStyle}>Your continued use of the Service after the effective date of the revised Terms constitutes your acceptance of the changes. If you do not agree with the updated Terms, you must discontinue your use of the Service and close your account before the changes take effect.</p>
        </div>

        {/* 14. Contact Us */}
        <div id="contact" style={sectionStyle}>
          <h2 style={h2Style}>14. Contact Us</h2>
          <p className="ins-text-body-lg" style={pStyle}>If you have any questions, concerns, or requests regarding these Terms of Service, please contact us at:</p>
          <div style={{background:'rgba(13,17,23,.6)', border:'1px solid var(--ins-border-default)', borderRadius:'12px', padding:'20px 24px', marginTop:'8px'}}>
            <p className="ins-text-body-lg" style={{margin:0}}>
              <strong style={{color:'var(--ins-text-body)'}}>Insightis Legal Team</strong><br/>
              Email: <a href="mailto:legal@insightis.ai" style={{color:'var(--ins-text-highlight)', textDecoration:'none', borderBottom:'1px solid var(--ins-color-teal-a-30)'}}>legal@insightis.ai</a><br/>
              Operated by Devart, Czech Republic
            </p>
          </div>
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
      <TermsContent />
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
