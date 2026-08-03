import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Cookies Policy — /security/cookie-settings
 *
 * This page used to ship a four-category consent UI (Necessary / Analytics / Functional /
 * Marketing, with Analytics defaulted ON) above an eleven-row cookie table listing _ga,
 * _ga_*, _gid, mp_*, _fbp, _gcl_au, li_sugr, _insightis_session, _insightis_csrf,
 * _insightis_prefs and _insightis_lang. Not one of those cookies exists. The site sets no
 * cookies at all: no analytics, no tag manager, no advertising pixel, no session recorder,
 * and the fonts are self-hosted. Because the page is prerendered, the invented list was
 * served to crawlers and to visitors without JavaScript.
 *
 * The consent control was worse than the table. "Save preferences" flipped a label to
 * "Preferences saved!" for 2.5 seconds and wrote nothing anywhere — a visitor who switched
 * Analytics off was told their choice had been recorded when nothing was recorded.
 *
 * Both are gone. What replaces them is a plain disclosure on the structure Devart uses for
 * TMetric's cookies policy, listing only what this site really stores: one localStorage
 * entry, written when you dismiss the cookie notice.
 *
 * UPDATE 2026-07-29, at the product owner's direction: the page now mirrors
 * tmetric.com/cookies-policy verbatim, cookie lists included. Insightis will run the same
 * Devart stack — ASP.NET/OpenID Connect sign-in plus the Google Analytics, LinkedIn Insight,
 * Microsoft UET and ActiveCampaign tags — so sections 3 and 4 describe that planned
 * deployment rather than what the static site sets today. If the tag plan changes before
 * launch, cut the lists back to match.
 *
 * UPDATE 2026-07-31: the "no tag manager" note above is now history on insightis.ai.
 * Google Tag Manager (GTM-TSTTC7TZ) is injected into the container build — see
 * scripts/inject-gtm.mjs — so the GitLab deployment loads it and whatever tags the
 * container publishes. The Vercel build still sets nothing but ins_cookie_notice. Sections
 * 3 and 4 are the disclosure that has to stay true as tags are added to that container.
 *
 * UPDATE 2026-08-03: section 4 now names Tag Manager itself, because that is the part
 * this repository can state as fact — the loader ships, it sets no cookies of its own, and
 * it can introduce a tag without any code change here. What it does NOT do is claim the
 * container currently publishes exactly the four listed partners: that list came from the
 * product owner's 2026-07-29 decision, not from the container, and nothing in this codebase
 * can read GTM-TSTTC7TZ to confirm it. Whoever has access should compare this section
 * against the container's live tags and cut or extend the lists to match; until then the
 * wording claims only an approved set, not an observed one.
 */

const SECTIONS = [
  { id: 'use-of-cookies', title: '1. Use of Cookies' },
  { id: 'if-you-dont-accept', title: '2. If You Don’t Accept Cookies' },
  { id: 'site-cookies', title: '3. Site Cookies' },
  { id: 'third-party', title: '4. Third Party Cookies' },
  { id: 'changing-settings', title: '5. Changing Cookie Settings' },
  { id: 'personal-information', title: '6. Cookies and Personal Information' },
  { id: 'contact-us', title: '7. Contact Us' },
];

function CookieContent() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 },
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const sectionStyle = { marginTop: 'var(--ins-size-12)', scrollMarginTop: '100px' };
  const pStyle = { marginBottom: 'var(--ins-size-4)' };
  const ulStyle = {
    paddingLeft: 'var(--ins-size-6)', listStyleType: 'disc', color: 'var(--ins-text-body)',
    display: 'flex', flexDirection: 'column', gap: 'var(--ins-size-2)',
    marginBottom: 'var(--ins-size-4)', fontSize: 'var(--ins-font-size-15)', lineHeight: 1.8,
  };
  const nestedUl = { ...ulStyle, marginTop: 'var(--ins-size-2)', marginBottom: 0 };
  const strong = { color: 'var(--ins-color-gray-100)' };

  return (
    <section style={{ position: 'relative' }}>
      <div style={{ padding: '120px 0 60px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h1 className="ins-text-display">Cookies Policy</h1>
          <p className="ins-text-body ins-text--muted" style={{ marginTop: 'var(--ins-size-3)' }}>
            Effective as of July 29, 2026
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 100px', display: 'flex', gap: 'var(--ins-size-14)', alignItems: 'flex-start' }}>
        <div role="navigation" aria-label="On this page" className="hidden md:block" style={{ width: '200px', flexShrink: 0, position: 'sticky', top: '90px' }}>
          <p className="ins-toc__title">On this page</p>
          <div className="ins-toc__list">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={'ins-toc__link' + (active === s.id ? ' is-active' : '')}>
                {s.title}
              </a>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>

          <div id="use-of-cookies" style={{ ...sectionStyle, marginTop: 0 }}>
            <h2 className="ins-text-h2" style={{ marginBottom: 'var(--ins-size-4)' }}>1. Use of Cookies</h2>
            <p className="ins-text-body-lg" style={pStyle}>
              Cookies are small text files that are placed on your individual device by websites that you
              visit. They are used in order to make websites work, or work more efficiently, as well as to
              provide web services and functionalities for the users.
            </p>
            <p className="ins-text-body-lg" style={pStyle}>
              Devart and its partners use cookies or similar technologies to administer the website, analyze
              trends, and track users&rsquo; movements around the website. Devart stores this information in a
              pseudonymized user profile. Devart does not process this information to identify individual users
              or to match it with further data on an individual user.
            </p>
            <p className="ins-text-body-lg" style={pStyle}>
              Most web browsers allow some control of most cookies through the browser settings. To find out
              more about cookies, including how to see what cookies have been set and how to manage and delete
              them, visit{' '}
              <a href="https://www.allaboutcookies.org" className="ins-link--inline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
            </p>
          </div>

          <div id="if-you-dont-accept" style={sectionStyle}>
            <h2 className="ins-text-h2" style={{ marginBottom: 'var(--ins-size-4)' }}>2. If You Don&rsquo;t Accept Cookies</h2>
            <p className="ins-text-body-lg" style={pStyle}>
              If you do not want to accept cookies you should end your browsing on this site.
            </p>
            <p className="ins-text-body-lg" style={pStyle}>
              Please note that dismissing the cookie notice does not block third-party cookies. Third-party
              cookies can be deleted by changing the cookie settings in your browser as further described
              below.
            </p>
          </div>

          <div id="site-cookies" style={sectionStyle}>
            <h2 className="ins-text-h2" style={{ marginBottom: 'var(--ins-size-4)' }}>3. Site Cookies</h2>
            <p className="ins-text-body-lg" style={pStyle}>
              Below is the list of cookies Devart uses at <strong style={strong}>insightis.ai</strong>{' '}
              (including sub-domains). The list of cookies we use may change from time to time, and we will
              update it accordingly.
            </p>
            <ul style={ulStyle}>
              <li>
                <strong style={strong}>.AspNetCore.Antiforgery.*</strong>
                <ul style={nestedUl}>
                  <li>
                    Used to prevent cross-site request forgery attacks. The lifetime is bound to the session length.
                  </li>
                </ul>
              </li>
              <li>
                <strong style={strong}>.AspNetCore.Cookies</strong>
                <ul style={nestedUl}>
                  <li>
                    This is a cookie that keeps your Insightis service session alive (expires when a user logs off).
                  </li>
                </ul>
              </li>
              <li>
                <strong style={strong}>__RequestVerificationToken</strong>
                <ul style={nestedUl}>
                  <li>
                    This is an anti-forgery cookie set to stop unauthorized posting of content to a website.
                  </li>
                </ul>
              </li>
              <li>
                <strong style={strong}>OpenIdConnect.nonce.*</strong>
                <ul style={nestedUl}>
                  <li>
                    These are anti-forgery cookies required for login to the Insightis service (a session cookie).
                  </li>
                </ul>
              </li>
              <li>
                <strong style={strong}>SignInMessage*</strong>
                <ul style={nestedUl}>
                  <li>
                    This cookie is used to store parameters in the login process (a session cookie).
                  </li>
                </ul>
              </li>
              <li><strong style={strong}>UMB_UCONTEXT_C</strong></li>
              <li>
                <strong style={strong}>UMB-XSRF-V</strong>
                <ul style={nestedUl}>
                  <li>
                    These cookies are used for maintaining the session state of the logged-in user.
                  </li>
                </ul>
              </li>
              <li><strong style={strong}>accountId</strong></li>
              <li><strong style={strong}>AccountType</strong></li>
              <li><strong style={strong}>UserId</strong></li>
              <li><strong style={strong}>userRole</strong></li>
              <li><strong style={strong}>Culture</strong></li>
              <li>
                <strong style={strong}>SkipExtensionCheckV</strong>
                <ul style={nestedUl}>
                  <li>
                    These are our website's cookies needed for your user pages.
                  </li>
                </ul>
              </li>
              <li>
                <strong style={strong}>ins_cookie_notice</strong>
                <ul style={nestedUl}>
                  <li>
                    Records that you have dismissed the cookie notice, so that it stays dismissed. Stored as a browser localStorage entry rather than a cookie, and never sent to a server.
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div id="third-party" style={sectionStyle}>
            <h2 className="ins-text-h2" style={{ marginBottom: 'var(--ins-size-4)' }}>4. Third Party Cookies</h2>
            <p className="ins-text-body-lg" style={pStyle}>
              Below is the list of third-party cookies we use. These cookies are set by a third party and not
              by this site. Our Cookies Policy and Privacy Policy do not apply to these cookies. They are
              governed by the policies of the companies providing them. The list of cookies used by our
              partners may change from time to time.
            </p>
            <h3 className="ins-text-h3" style={{ marginTop: 'var(--ins-size-6)', marginBottom: 'var(--ins-size-2)' }}>Google Tag Manager</h3>
            <p className="ins-text-body-lg" style={pStyle}>
              insightis.ai loads Google Tag Manager (container <strong style={strong}>GTM-TSTTC7TZ</strong>). Tag Manager
              is the delivery mechanism rather than a tracker in its own right: it sets no cookies and collects no
              analytics itself, but it loads the tags listed in this section, and those tags do. Because the container
              is configured outside this website, a tag can start setting cookies without any change to the site&rsquo;s
              code — so treat the lists below as the set of partners we have approved for this container, and expect
              this page to be updated when that set changes.
            </p>
            <h3 className="ins-text-h3" style={{ marginTop: 'var(--ins-size-6)', marginBottom: 'var(--ins-size-2)' }}>ActiveCampaign</h3>
            <ul style={ulStyle}>
              <li>
                <strong style={strong}>ac_enable_tracking</strong>
                <ul style={nestedUl}>
                  <li>
                    This cookie is placed to store cookie consent preferences (a session cookie).
                  </li>
                </ul>
              </li>
            </ul>
            <h3 className="ins-text-h3" style={{ marginTop: 'var(--ins-size-6)', marginBottom: 'var(--ins-size-2)' }}>Google</h3>
            <ul style={ulStyle}>
              <li><strong style={strong}>IDE9</strong></li>
              <li>
                <strong style={strong}>RUL</strong>
                <ul style={nestedUl}>
                  <li>
                    DoubleClick cookies are used to improve advertising. Lifetime is decided by Google.{' '}
                    <a href="https://support.google.com/dfp_premium/answer/2839090?hl=en" className="ins-link--inline" target="_blank" rel="noopener noreferrer">Read More</a>
                  </li>
                </ul>
              </li>
              <li><strong style={strong}>APISID</strong></li>
              <li><strong style={strong}>DV</strong></li>
              <li><strong style={strong}>SSID</strong></li>
              <li><strong style={strong}>HSID</strong></li>
              <li><strong style={strong}>1P_JAR</strong></li>
              <li><strong style={strong}>SIDCC</strong></li>
              <li><strong style={strong}>SAPISID</strong></li>
              <li><strong style={strong}>OGPC</strong></li>
              <li><strong style={strong}>NID</strong></li>
              <li>
                <strong style={strong}>SID</strong>
                <ul style={nestedUl}>
                  <li>
                    Preferences cookies, used to customize ads on Google properties, like Google Search. Lifetime is decided by Google.{' '}
                    <a href="https://policies.google.com/technologies/types" className="ins-link--inline" target="_blank" rel="noopener noreferrer">Read More</a>
                  </li>
                </ul>
              </li>
              <li><strong style={strong}>_ga</strong></li>
              <li><strong style={strong}>_gid</strong></li>
              <li><strong style={strong}>_gaexp</strong></li>
              <li>
                <strong style={strong}>_gat</strong>
                <ul style={nestedUl}>
                  <li>
                    Google Analytics cookies, used to distinguish users. Lifetime is decided by Google.{' '}
                    <a href="https://developers.google.com/analytics/devguides/collection/gajs/cookie-usage" className="ins-link--inline" target="_blank" rel="noopener noreferrer">Read more</a>
                  </li>
                </ul>
              </li>
              <li><strong style={strong}>__Secure-PAPISID</strong></li>
              <li><strong style={strong}>__Secure-PSID</strong></li>
              <li>
                <strong style={strong}>__Secure-PSIDCC</strong>
                <ul style={nestedUl}>
                  <li>
                    Used to build a profile of website visitor interests to deliver more relevant and personalized ads for them. Lifetime is maximum 2 years.{' '}
                    <a href="https://policies.google.com/technologies/partner-sites" className="ins-link--inline" target="_blank" rel="noopener noreferrer">Read More</a>
                  </li>
                </ul>
              </li>
              <li>
                <strong style={strong}>SEARCH_SAMESITE</strong>
                <ul style={nestedUl}>
                  <li>
                    Used to prevent the browser from sending this cookie along with cross-site requests.
                  </li>
                </ul>
              </li>
              <li>
                <strong style={strong}>_gcl_au</strong>
                <ul style={nestedUl}>
                  <li>
                    a Google AdSense cookie, used for experimenting with advertisement efficiency.
                  </li>
                </ul>
              </li>
            </ul>
            <h3 className="ins-text-h3" style={{ marginTop: 'var(--ins-size-6)', marginBottom: 'var(--ins-size-2)' }}>LinkedIn Insight</h3>
            <ul style={ulStyle}>
              <li><strong style={strong}>AnalyticsSyncHistory</strong></li>
              <li><strong style={strong}>UserMatchHistory</strong></li>
              <li><strong style={strong}>AMCVS</strong></li>
              <li><strong style={strong}>lang</strong></li>
              <li><strong style={strong}>lidc</strong></li>
              <li><strong style={strong}>li_sugr</strong></li>
              <li><strong style={strong}>aam_uuid</strong></li>
              <li><strong style={strong}>bcookie</strong></li>
              <li><strong style={strong}>s_ppv</strong></li>
              <li><strong style={strong}>s_ips</strong></li>
              <li><strong style={strong}>s_plt</strong></li>
              <li><strong style={strong}>s_tslv</strong></li>
              <li>
                <strong style={strong}>gpv_pn</strong>
                <ul style={nestedUl}>
                  <li>
                    LinkedIn cookies, placed to collect and use data as part of LinkedIn Services. Cookie lifetime is decided by LinkedIn.{' '}
                    <a href="https://www.linkedin.com/legal/l/cookie-table" className="ins-link--inline" target="_blank" rel="noopener noreferrer">Read More</a>
                  </li>
                </ul>
              </li>
            </ul>
            <h3 className="ins-text-h3" style={{ marginTop: 'var(--ins-size-6)', marginBottom: 'var(--ins-size-2)' }}>Microsoft Advertising Universal Event Tracking</h3>
            <ul style={ulStyle}>
              <li><strong style={strong}>ABDEF</strong></li>
              <li><strong style={strong}>ANON</strong></li>
              <li><strong style={strong}>BCP</strong></li>
              <li><strong style={strong}>BFB</strong></li>
              <li><strong style={strong}>BFBUSR</strong></li>
              <li><strong style={strong}>MUID</strong></li>
              <li><strong style={strong}>MUIDB</strong></li>
              <li><strong style={strong}>NAP</strong></li>
              <li><strong style={strong}>OIDI</strong></li>
              <li><strong style={strong}>SRCHD</strong></li>
              <li><strong style={strong}>SRCHHPGUSR</strong></li>
              <li><strong style={strong}>SRCHUID</strong></li>
              <li><strong style={strong}>SRCHUSR</strong></li>
              <li><strong style={strong}>SUID</strong></li>
              <li><strong style={strong}>USRLOC</strong></li>
              <li><strong style={strong}>WLS</strong></li>
              <li><strong style={strong}>_EDGE_S</strong></li>
              <li><strong style={strong}>_HPVN</strong></li>
              <li><strong style={strong}>_RwBf</strong></li>
              <li><strong style={strong}>_SS</strong></li>
              <li><strong style={strong}>_clck</strong></li>
              <li><strong style={strong}>_clsk</strong></li>
              <li><strong style={strong}>_uetmsclkid</strong></li>
              <li><strong style={strong}>_uetsid</strong></li>
              <li><strong style={strong}>_uetvid</strong></li>
              <li>
                <strong style={strong}>ipv6MUID</strong>
                <ul style={nestedUl}>
                  <li>
                    Microsoft Advertising cookies, used to collect information about how you use our site and show you relevant ads on other sites. Cookie lifetime is decided by Microsoft.{' '}
                    <a href="https://privacy.microsoft.com/en-us/privacystatement#maincookiessimilartechnologiesmodule" className="ins-link--inline" target="_blank" rel="noopener noreferrer">Read More</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div id="changing-settings" style={sectionStyle}>
            <h2 className="ins-text-h2" style={{ marginBottom: 'var(--ins-size-4)' }}>5. Changing Cookie Settings</h2>
            <p className="ins-text-body-lg" style={pStyle}>
              Most web browsers allow control of the above-listed cookies through the browser settings.
            </p>
            <p className="ins-text-body-lg" style={pStyle}>
              To opt out of being tracked by Google Analytics, visit{' '}
              <a href="http://tools.google.com/dlpage/gaoptout" className="ins-link--inline" target="_blank" rel="noopener noreferrer">http://tools.google.com/dlpage/gaoptout</a>.
            </p>
            <p className="ins-text-body-lg" style={pStyle}>
              To opt out of personalized ads by Google, visit{' '}
              <a href="https://www.google.com/settings/ads" className="ins-link--inline" target="_blank" rel="noopener noreferrer">https://www.google.com/settings/ads</a>.
            </p>
            <p className="ins-text-body-lg" style={pStyle}>
              To opt out of personalized ads by Microsoft, visit{' '}
              <a href="https://account.microsoft.com/privacy/ad-settings" className="ins-link--inline" target="_blank" rel="noopener noreferrer">https://account.microsoft.com/privacy/ad-settings</a>.
            </p>
            <p className="ins-text-body-lg" style={pStyle}>
              Please note that if cookie settings in your browser are changed, the above functions specified
              under section 4 may not be available.
            </p>
          </div>

          <div id="personal-information" style={sectionStyle}>
            <h2 className="ins-text-h2" style={{ marginBottom: 'var(--ins-size-4)' }}>6. Cookies and Personal Information</h2>
            <p className="ins-text-body-lg" style={pStyle}>
              Cookies do not contain any information that personally identifies you, but personal information
              that we store about you may be linked to the information obtained from you when you sign up for
              the Insightis service.
            </p>
            <p className="ins-text-body-lg" style={pStyle}>
              This Cookies policy constitutes an inseparable part of the{' '}
              <a href="/security/terms" className="ins-link--inline">Terms of Service</a> and{' '}
              <a href="/security/privacy" className="ins-link--inline">Privacy Policy</a> of this site.
            </p>
          </div>

          <div id="contact-us" style={sectionStyle}>
            <h2 className="ins-text-h2" style={{ marginBottom: 'var(--ins-size-4)' }}>7. Contact Us</h2>
            <p className="ins-text-body-lg" style={pStyle}>
              This website is owned and operated by Devart Ltd. If you have any questions regarding the use of
              cookies, please write to{' '}
              <a href="mailto:privacy@insightis.ai" className="ins-link--inline">privacy@insightis.ai</a>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

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
