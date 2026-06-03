import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* ── PRIVACY CONTENT ── */
function PrivacyContent() {
  const [activeSection, setActiveSection] = useState('introduction');
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'information-we-collect', title: 'Information We Collect' },
    { id: 'how-we-use', title: 'How We Use Your Information' },
    { id: 'data-sharing', title: 'Data Sharing and Disclosure' },
    { id: 'integrations', title: 'Data Connected Through Integrations' },
    { id: 'cookies', title: 'Cookies and Tracking Technologies' },
    { id: 'data-retention', title: 'Data Retention' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'your-rights', title: 'Your Rights and Choices' },
    { id: 'childrens-privacy', title: "Children's Privacy" },
    { id: 'international-transfers', title: 'International Data Transfers' },
    { id: 'changes', title: 'Changes to This Policy' },
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
  const sectionStyle = { marginTop: 'var(--ins-size-12)', scrollMarginTop: '100px' };
  const pStyle = { marginBottom: 'var(--ins-size-4)' };
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
            Effective Date: April 6, 2026
          </p>
          <p className="ins-text-body-lg" style={{marginTop: 'var(--ins-size-8)'}}>
            At Insightis, a product by Devart, we are committed to protecting your privacy and ensuring the security of the personal information you share with us. This Privacy Policy describes how we collect, use, disclose, and safeguard your data when you use the Insightis AI analytics workspace, our website, and related services.
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

        {/* 1. Introduction */}
        <div id="introduction" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>1. Introduction</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            Insightis is an AI-powered analytics workspace developed by Devart that enables teams to connect their data sources, ask questions in natural language, and receive instant, accurate insights. We understand that by using our platform, you entrust us with sensitive business data, and we take that responsibility seriously.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            This Privacy Policy applies to all users of the Insightis platform, including our website at insightis.ai, the Insightis web application, APIs, and any related services. By accessing or using Insightis, you agree to the practices described in this policy.
          </p>
        </div>

        {/* 2. Information We Collect */}
        <div id="information-we-collect" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>2. Information We Collect</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            We collect information in several ways depending on how you interact with Insightis:
          </p>
          <p className="ins-text-body-lg ins-text--medium" style={{ marginBottom: 'var(--ins-size-2)' }}>Account Information</p>
          <ul style={ulStyle}>
            <li>Name, email address, and company name when you create an account</li>
            <li>Billing information and payment details for paid plans</li>
            <li>Profile preferences and notification settings</li>
          </ul>
          <p className="ins-text-body-lg ins-text--medium" style={{ marginBottom: 'var(--ins-size-2)' }}>Usage Data</p>
          <ul style={ulStyle}>
            <li>Analytics queries and natural language questions you submit</li>
            <li>Reports you create, save, and share within the platform</li>
            <li>Feature usage patterns and interaction logs</li>
            <li>Session duration, pages visited, and navigation paths</li>
          </ul>
          <p className="ins-text-body-lg ins-text--medium" style={{ marginBottom: 'var(--ins-size-2)' }}>Data Source Connections</p>
          <ul style={ulStyle}>
            <li>Connection credentials and authentication tokens for your integrated data sources (databases, CRMs, spreadsheets, etc.)</li>
            <li>Metadata about your connected data sources, including schema information, table names, and column definitions</li>
            <li>Query results and aggregated data retrieved through your integrations</li>
          </ul>
          <p className="ins-text-body-lg ins-text--medium" style={{ marginBottom: 'var(--ins-size-2)' }}>Device and Technical Information</p>
          <ul style={ulStyle}>
            <li>IP address, browser type and version, operating system</li>
            <li>Device identifiers and screen resolution</li>
            <li>Referring URLs and search terms used to find our service</li>
          </ul>
        </div>

        {/* 3. How We Use Your Information */}
        <div id="how-we-use" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>3. How We Use Your Information</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            We use the information we collect for the following purposes:
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Provide and operate the service:</strong> To process your analytics queries, generate insights, run reports, and deliver the core Insightis experience.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>AI-powered analytics:</strong> To power our Insights Engine and AI Chat features, translating your natural language questions into accurate data queries through our Semantic Layer.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Improve and optimize:</strong> To understand how users interact with our platform, identify areas for improvement, and develop new features.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Security and fraud prevention:</strong> To detect, prevent, and address technical issues, unauthorized access, and fraudulent activity.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Communications:</strong> To send you service-related notices, product updates, security alerts, and, with your consent, marketing communications.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Legal compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
          </ul>
        </div>

        {/* 4. Data Sharing and Disclosure */}
        <div id="data-sharing" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>4. Data Sharing and Disclosure</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            We do not sell your personal data. We may share information in the following limited circumstances:
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Service providers:</strong> We work with trusted third-party vendors who assist us in operating our platform, processing payments, hosting infrastructure, and providing customer support. These providers are contractually obligated to protect your data and may only use it for the purposes we specify.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Legal requirements:</strong> We may disclose information if required by law, regulation, legal process, or governmental request, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Business transfers:</strong> In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change and any choices you may have regarding your data.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>With your consent:</strong> We may share information with third parties when you have given us explicit permission to do so.</li>
          </ul>
        </div>

        {/* 5. Data Connected Through Integrations */}
        <div id="integrations" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>5. Data Connected Through Integrations</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            Insightis connects to over 200 data sources, including databases (PostgreSQL, MySQL, SQL Server, BigQuery, Snowflake, and others), CRMs (Salesforce, HubSpot), spreadsheets (Google Sheets, Excel), marketing platforms, and more. We want to be transparent about how we handle this data:
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Processed for analytics only:</strong> Data retrieved from your connected sources is used solely to answer your queries and generate insights within the Insightis platform. We do not use your connected data for any other purpose.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Not used for AI model training:</strong> Your business data from connected integrations is never used to train, fine-tune, or improve our AI models or any third-party AI models. Your data remains yours.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Minimal data retention:</strong> Query results are cached temporarily to improve performance. We do not permanently store raw data from your connected sources unless you explicitly save a report or insight.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Credential security:</strong> Connection credentials and authentication tokens are encrypted at rest and in transit. They are stored separately from other account data with additional access controls.</li>
          </ul>
        </div>

        {/* 6. Cookies and Tracking Technologies */}
        <div id="cookies" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>6. Cookies and Tracking Technologies</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            We use cookies and similar tracking technologies to operate and improve our service, remember your preferences, understand usage patterns, and deliver relevant content. These include:
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Essential cookies:</strong> Required for the platform to function properly, including authentication, session management, and security features.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Analytics cookies:</strong> Help us understand how visitors interact with our website and application so we can improve the user experience.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Preference cookies:</strong> Remember your settings, language preferences, and other customization choices.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            You can manage your cookie preferences at any time through our <a href="Cookie Settings" style={{ color: 'var(--ins-text-highlight)', textDecoration: 'underline' }}>Cookie Settings</a> page. Most browsers also allow you to control cookies through their settings.
          </p>
        </div>

        {/* 7. Data Retention */}
        <div id="data-retention" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>7. Data Retention</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            We retain your personal information for as long as your account is active or as needed to provide you with our services. Specific retention periods include:
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Account data:</strong> Retained for the duration of your account and for up to 30 days after account closure to allow for reactivation.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Usage logs:</strong> Retained for up to 12 months for analytics and security purposes, then anonymized or deleted.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Saved reports and insights:</strong> Retained until you delete them or close your account.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Cached query results:</strong> Automatically purged within 24 hours unless saved as a report.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            Upon account closure, we will delete or anonymize your personal data within 30 days, except where we are required to retain it for legal or regulatory reasons. You may request immediate deletion by contacting our support team.
          </p>
        </div>

        {/* 8. Data Security */}
        <div id="data-security" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>8. Data Security</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            We implement industry-standard technical and organizational measures to protect your data, including:
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Encryption:</strong> All data is encrypted in transit using TLS 1.2+ and at rest using AES-256 encryption.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Access controls:</strong> Role-based access control (RBAC), multi-factor authentication (MFA), and the principle of least privilege govern access to systems and data.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Infrastructure security:</strong> Our platform is hosted on enterprise-grade cloud infrastructure with SOC 2 Type II certified providers.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Regular audits:</strong> We conduct regular security assessments, penetration testing, and vulnerability scanning.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Incident response:</strong> We maintain a documented incident response plan and will notify affected users within 72 hours of a confirmed data breach.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            For more details about our security practices, please visit our <a href="Security" style={{ color: 'var(--ins-text-highlight)', textDecoration: 'underline' }}>Security</a> page.
          </p>
        </div>

        {/* 9. Your Rights and Choices */}
        <div id="your-rights" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>9. Your Rights and Choices</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul style={ulStyle}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Correction:</strong> Request that we correct inaccurate or incomplete personal data.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Deletion:</strong> Request that we delete your personal data, subject to certain legal exceptions.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Data portability:</strong> Request a machine-readable copy of your data to transfer to another service.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Opt-out:</strong> Unsubscribe from marketing communications at any time using the link in our emails or through your account settings.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Restrict processing:</strong> Request that we limit how we use your data in certain circumstances.</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Withdraw consent:</strong> Where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            To exercise any of these rights, please contact us at <a href="mailto:privacy@insightis.ai" style={{ color: 'var(--ins-text-highlight)', textDecoration: 'underline' }}>privacy@insightis.ai</a>. We will respond to your request within 30 days.
          </p>
        </div>

        {/* 10. Children's Privacy */}
        <div id="childrens-privacy" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>10. Children's Privacy</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            Insightis is not intended for use by individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have inadvertently collected personal data from a child under 16, we will take steps to delete that information as promptly as possible. If you believe a child under 16 has provided us with personal data, please contact us at <a href="mailto:privacy@insightis.ai" style={{ color: 'var(--ins-text-highlight)', textDecoration: 'underline' }}>privacy@insightis.ai</a>.
          </p>
        </div>

        {/* 11. International Data Transfers */}
        <div id="international-transfers" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>11. International Data Transfers</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            Insightis is operated by Devart, and your data may be processed in countries outside your country of residence, including in the European Union and the United States. When we transfer personal data across borders, we implement appropriate safeguards to ensure your data remains protected, including:
          </p>
          <ul style={ulStyle}>
            <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
            <li>Data Processing Agreements with all sub-processors</li>
            <li>Compliance with applicable data protection frameworks, including GDPR</li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            We ensure that any international transfer of personal data is subject to appropriate safeguards and that your rights under applicable data protection laws are maintained regardless of where your data is processed.
          </p>
        </div>

        {/* 12. Changes to This Policy */}
        <div id="changes" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>12. Changes to This Policy</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will notify you by posting the updated policy on our website with a revised effective date and, where required, by sending you an email notification.
          </p>
          <p className="ins-text-body-lg" style={pStyle}>
            We encourage you to review this page periodically to stay informed about how we protect your data. Your continued use of Insightis after changes are posted constitutes your acceptance of the updated policy.
          </p>
        </div>

        {/* 13. Contact Us */}
        <div id="contact" style={sectionStyle}>
          <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>13. Contact Us</h2>
          <p className="ins-text-body-lg" style={pStyle}>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <ul style={{ ...ulStyle, listStyleType: 'none', paddingLeft: 0 }}>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Email:</strong> <a href="mailto:privacy@insightis.ai" style={{ color: 'var(--ins-text-highlight)', textDecoration: 'underline' }}>privacy@insightis.ai</a></li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Company:</strong> Devart, the developer of Insightis</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Address:</strong> 3422 Old Capitol Trl, Wilmington, Delaware, USA 19808</li>
            <li><strong style={{ color: 'var(--ins-color-gray-100)' }}>Support:</strong> <a href="../Resources/Contact Support" style={{ color: 'var(--ins-text-highlight)', textDecoration: 'underline' }}>Contact Support</a></li>
          </ul>
          <p className="ins-text-body-lg" style={pStyle}>
            For EU residents, you also have the right to lodge a complaint with your local data protection authority if you believe your data has been processed in violation of applicable law.
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
