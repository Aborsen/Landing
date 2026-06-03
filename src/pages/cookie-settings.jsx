import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* ── TOGGLE SWITCH ── */
function ToggleSwitch({ enabled, onChange, disabled = false }) {
  return (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      style={{
        width: '44px', height: '24px', borderRadius: 'var(--ins-radius-12)',
        background: enabled ? 'var(--ins-button-primary-bg)' : 'var(--ins-color-white-a-12)',
        border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative', transition: 'background 0.2s',
        opacity: disabled ? 0.6 : 1,
        flexShrink: 0,
      }}
    >
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%',
        background: 'var(--ins-color-white)', position: 'absolute', top: '3px',
        left: enabled ? '23px' : '3px', transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,.3)',
      }} />
    </button>
  );
}

/* ── COOKIE CONTENT ── */
function CookieContent() {
  const [cookies, setCookies] = useState({
    analytics: true,
    functional: true,
    marketing: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const categories = [
    {
      key: 'essential',
      title: 'Essential Cookies',
      description: 'Required for the website to function properly. These cookies enable core functionality such as security, session management, and accessibility. They cannot be disabled.',
      alwaysActive: true,
    },
    {
      key: 'analytics',
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.',
      examples: 'Google Analytics, Mixpanel',
    },
    {
      key: 'functional',
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization, such as remembering your preferences, language settings, and customized content. Disabling these may limit some features.',
    },
    {
      key: 'marketing',
      title: 'Marketing Cookies',
      description: 'Used to track visitors across websites to display relevant advertisements. These cookies help measure the effectiveness of advertising campaigns.',
      examples: 'Meta Pixel, Google Ads, LinkedIn Insight',
    },
  ];

  const cookieTable = [
    { name: '_ga', provider: 'Google Analytics', purpose: 'Analytics', duration: '2 years' },
    { name: '_ga_*', provider: 'Google Analytics', purpose: 'Analytics', duration: '2 years' },
    { name: '_gid', provider: 'Google Analytics', purpose: 'Analytics', duration: '24 hours' },
    { name: 'mp_*', provider: 'Mixpanel', purpose: 'Analytics', duration: '1 year' },
    { name: '_insightis_session', provider: 'Insightis', purpose: 'Essential', duration: 'Session' },
    { name: '_insightis_csrf', provider: 'Insightis', purpose: 'Essential', duration: 'Session' },
    { name: '_insightis_prefs', provider: 'Insightis', purpose: 'Functional', duration: '1 year' },
    { name: '_insightis_lang', provider: 'Insightis', purpose: 'Functional', duration: '1 year' },
    { name: '_fbp', provider: 'Meta', purpose: 'Marketing', duration: '3 months' },
    { name: '_gcl_au', provider: 'Google Ads', purpose: 'Marketing', duration: '3 months' },
    { name: 'li_sugr', provider: 'LinkedIn', purpose: 'Marketing', duration: '3 months' },
  ];

  const sectionStyle = {
    marginBottom: 'var(--ins-size-10)',
  };
  const paraStyle = {
    fontSize: 'var(--ins-font-size-15)', color: 'var(--ins-text-body)', lineHeight: 1.8,
  };

  return (
    <>
      {/* Hero */}
      <section style={{padding:'120px 0 60px', position:'relative'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', padding:'0 24px', textAlign:'center', position:'relative'}}>
          <h1 className="ins-text-display">
            Cookie Settings
          </h1>
          <p className="ins-text-body-xl" style={{marginTop:'var(--ins-size-4)', maxWidth:'640px', margin:'16px auto 0'}}>
            We use cookies to enhance your experience, analyze site traffic, and personalize content. You can manage your cookie preferences below.
          </p>
        </div>
      </section>

      {/* Cookie Categories */}
      <section style={{paddingBottom:'var(--ins-size-10)', position:'relative'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', padding:'0 24px'}}>
          {categories.map((cat, i) => (
            <div key={cat.key} className={`fu${Math.min(i+1, 3)}`} style={{
              background:'rgba(13,17,23,.6)', border:'1px solid var(--ins-border-default)',
              borderRadius:'var(--ins-radius-16)', padding:'var(--ins-size-6)', marginBottom:'var(--ins-size-4)',
            }}>
              <div style={{display:'flex', alignItems:'flex-start', gap:'var(--ins-size-5)'}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:'var(--ins-font-size-16)', fontWeight:600, color:'var(--ins-color-gray-100)'}}>{cat.title}</div>
                  <div style={{fontSize:'var(--ins-font-size-14)', color:'var(--ins-text-body)', lineHeight:1.6, marginTop:'var(--ins-size-1)'}}>{cat.description}</div>
                  {cat.examples && (
                    <div style={{fontSize:'var(--ins-font-size-12)', color:'var(--ins-text-inactive)', marginTop:'var(--ins-size-2)'}}>Examples: {cat.examples}</div>
                  )}
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'10px', paddingTop:'var(--ins-size-half)'}}>
                  {cat.alwaysActive ? (
                    <>
                      <span style={{fontSize:'var(--ins-font-size-12)', fontWeight:500, color:'var(--ins-text-highlight)', whiteSpace:'nowrap'}}>Always Active</span>
                      <ToggleSwitch enabled={true} onChange={() => {}} disabled={true} />
                    </>
                  ) : (
                    <ToggleSwitch
                      enabled={cookies[cat.key]}
                      onChange={(val) => setCookies(prev => ({...prev, [cat.key]: val}))}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Save Button */}
          <div style={{textAlign:'center', marginTop:'var(--ins-size-8)', marginBottom:'60px'}}>
            <button
              onClick={handleSave}
              style={{
                display:'inline-flex', alignItems:'center', gap:'var(--ins-size-2)',
                padding:'12px 32px', fontSize:'var(--ins-font-size-15)', fontWeight:600,
                color:'var(--ins-text-body)', background:'var(--ins-button-primary-bg)', borderRadius:'50px',
                border:'none', cursor:'pointer', transition:'background 0.2s',
                fontFamily:'var(--ins-font-family-sans)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--ins-button-primary-bg-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--ins-button-primary-bg)'}
            >
              {saved ? 'Preferences Saved!' : 'Save Preferences'}
            </button>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section style={{paddingBottom:'100px', position:'relative'}}>
        <div style={{maxWidth:'800px', margin:'0 auto', padding:'0 24px'}}>

          {/* What Are Cookies? */}
          <div style={sectionStyle}>
            <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-3)'}}>What Are Cookies?</h2>
            <p style={paraStyle}>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and supply information to the site owners. Cookies can be "session" cookies, which are deleted when you close your browser, or "persistent" cookies, which remain on your device for a set period or until you manually delete them. Similar technologies such as web beacons, pixels, and local storage may also be used for comparable purposes.
            </p>
          </div>

          {/* Third-Party Cookies */}
          <div style={sectionStyle}>
            <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-3)'}}>Third-Party Cookies</h2>
            <p style={paraStyle}>
              In addition to our own cookies, we may use cookies set by third-party services to help us understand how our website is used, measure the effectiveness of our marketing, and deliver relevant advertising. These third parties include Google Analytics for traffic analysis, Mixpanel for product analytics, and advertising platforms such as Meta and LinkedIn. Each third-party provider has its own privacy policy governing the data collected through its cookies.
            </p>
          </div>

          {/* Managing Cookies in Your Browser */}
          <div style={sectionStyle}>
            <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-3)'}}>Managing Cookies in Your Browser</h2>
            <p style={paraStyle}>
              Most web browsers allow you to control cookies through their settings. Below are links and instructions for the most common browsers:
            </p>
            <ul style={{...paraStyle, paddingLeft:'var(--ins-size-6)', marginTop:'var(--ins-size-3)'}}>
              <li style={{marginBottom:'var(--ins-size-2)'}}><strong style={{color:'var(--ins-color-gray-100)'}}>Google Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
              <li style={{marginBottom:'var(--ins-size-2)'}}><strong style={{color:'var(--ins-color-gray-100)'}}>Mozilla Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
              <li style={{marginBottom:'var(--ins-size-2)'}}><strong style={{color:'var(--ins-color-gray-100)'}}>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
              <li style={{marginBottom:'var(--ins-size-2)'}}><strong style={{color:'var(--ins-color-gray-100)'}}>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions &gt; Manage and delete cookies and site data</li>
            </ul>
            <p style={{...paraStyle, marginTop:'var(--ins-size-3)'}}>
              Please note that blocking all cookies may affect the functionality of this and other websites. Some features may not work as intended if cookies are disabled.
            </p>
          </div>

          {/* Cookie List Table */}
          <div style={sectionStyle}>
            <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-3)'}}>Cookie List</h2>
            <p style={{...paraStyle, marginBottom:'var(--ins-size-4)'}}>
              The following table lists the cookies used on our website, their provider, purpose, and duration.
            </p>
            <div style={{overflowX:'auto', borderRadius:'var(--ins-radius-12)', border:'1px solid var(--ins-border-default)'}}>
              <table className="ins-table">
                <thead>
                  <tr style={{background:'var(--ins-color-white-a-04)'}}>
                    <th className="ins-text-h4" style={{padding:'12px 16px', textAlign:'left', whiteSpace:'nowrap'}}>Cookie Name</th>
                    <th className="ins-text-h4" style={{padding:'12px 16px', textAlign:'left', whiteSpace:'nowrap'}}>Provider</th>
                    <th className="ins-text-h4" style={{padding:'12px 16px', textAlign:'left', whiteSpace:'nowrap'}}>Purpose</th>
                    <th className="ins-text-h4" style={{padding:'12px 16px', textAlign:'left', whiteSpace:'nowrap'}}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieTable.map((row, i) => (
                    <tr key={i} style={{background: i % 2 === 1 ? 'var(--ins-color-white-a-02)' : 'transparent'}}>
                      <td style={{padding:'10px 16px', color:'var(--ins-text-highlight)', fontFamily:'var(--ins-font-family-mono)', fontSize:'var(--ins-font-size-12)', borderBottom:'1px solid var(--ins-color-white-a-04)'}}>{row.name}</td>
                      <td style={{padding:'10px 16px', color:'var(--ins-text-body)', borderBottom:'1px solid var(--ins-color-white-a-04)'}}>{row.provider}</td>
                      <td style={{padding:'10px 16px', color:'var(--ins-text-body)', borderBottom:'1px solid var(--ins-color-white-a-04)'}}>{row.purpose}</td>
                      <td style={{padding:'10px 16px', color:'var(--ins-text-body)', borderBottom:'1px solid var(--ins-color-white-a-04)', whiteSpace:'nowrap'}}>{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Changes to Cookie Policy */}
          <div style={sectionStyle}>
            <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-3)'}}>Changes to Cookie Policy</h2>
            <p style={paraStyle}>
              We may update this Cookie Settings page from time to time to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. We encourage you to revisit this page periodically to stay informed about our use of cookies and related technologies. The date at the bottom of this page indicates when it was last updated.
            </p>
          </div>

          {/* Contact Us */}
          <div style={sectionStyle}>
            <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-3)'}}>Contact Us</h2>
            <p style={paraStyle}>
              If you have any questions about our use of cookies or this Cookie Settings page, please contact us at{' '}
              <a href="mailto:privacy@insightis.ai" style={{color:'var(--ins-text-highlight)', textDecoration:'none'}}>privacy@insightis.ai</a>.
              You can also review our full <a href="Privacy" style={{color:'var(--ins-text-highlight)', textDecoration:'none'}}>Privacy Policy</a> for more information about how we handle your data.
            </p>
          </div>

          <p className="ins-text-body ins-text--muted" style={{marginTop:'var(--ins-size-5)'}}>Last updated: April 2026</p>

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
      <CookieContent />
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
