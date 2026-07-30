/* Sales-enquiry endpoint — POST /api/contact-sales.
 *
 * Field mapping to the Zoho ContactSales form, as specified:
 *   Full Name           -> SingleLine
 *   Name of the company -> SingleLine1
 *   Email               -> SingleLine2
 *   Team Size           -> SingleLine3
 *   Additional Details  -> SingleLine4
 *
 * Same shape as the other two form endpoints; the shared rules (secret handling,
 * origin check, honeypot, fill-time, rate limit, upstream call, Node bridge) live
 * in ./zoho-form-endpoint.js. Only the validation is here, because it differs:
 * email is REQUIRED on this form. A sales enquiry with no way to reply is not a
 * lead, it is a lost one — and unlike a support ticket, there is no fallback
 * channel where the sender can be recognised.
 *
 * Verified against the live form on 2026-07-30: all five keys are accepted, and
 * POST {} also returns 200. As with the others, Zoho validates nothing, so every
 * check below is load-bearing.
 */
import {
  createFormHandler, oneLine, multiLine, hasAlnum, looksLikeEmail,
} from './zoho-form-endpoint.js';

/* Allowlisted, and sent to Zoho as the label the visitor actually saw — a fixed
   choice means an unrecognised value is a forged payload, not a typo. Kept in
   step with TEAM_SIZES in src/components/SalesEnquiryModal.jsx. */
const TEAM_SIZES = ['1-10', '11-100', '101-500', '501-1000', '1000+'];

const MAX_NAME = 80;
const MAX_COMPANY = 100;
const MAX_EMAIL = 254;
const MAX_DETAILS = 2000;

/* A person's name and a company name have no business containing a URL or markup;
   the details box may, since a prospect might reasonably link to their site. */
const SPAMMY = /(https?:|ftp:|www\.|<[a-z/!]|\[url|\{\{)/i;

function build(data) {
  const name = oneLine(data.name);
  if (name.length < 2 || name.length > MAX_NAME) return { error: 'name' };
  if (!hasAlnum(name) || SPAMMY.test(name)) return { error: 'name' };

  const company = oneLine(data.company);
  if (company.length < 2 || company.length > MAX_COMPANY) return { error: 'company' };
  if (!hasAlnum(company) || SPAMMY.test(company)) return { error: 'company' };

  /* Required, unlike the support form. */
  const email = oneLine(data.email);
  if (!email || email.length > MAX_EMAIL || !looksLikeEmail(email)) return { error: 'email' };

  const teamSize = oneLine(data.teamSize);
  if (!TEAM_SIZES.includes(teamSize)) return { error: 'teamSize' };

  /* No control-character check here: multiLine() has already stripped them apart
     from the newlines it deliberately keeps, and \n is itself a control character
     — testing for one after the fact rejected every multi-line message. */
  const details = multiLine(data.details);
  if (details.length > MAX_DETAILS) return { error: 'length' };

  return {
    fields: {
      SingleLine: name,
      SingleLine1: company,
      SingleLine2: email,
      SingleLine3: teamSize,
      SingleLine4: details,
    },
  };
}

const { handleRequest, nodeHandler } = createFormHandler({
  envVar: 'ZOHO_SALES_FORM_URL',
  label: 'contact-sales',
  /* Three per ten minutes: nobody books demos in bulk, and a lead form is the
     most attractive of the three to a spammer. */
  rateMax: 3,
  maxBody: 16 * 1024,
  build,
});

export { handleRequest, nodeHandler };
export default { fetch: handleRequest };
