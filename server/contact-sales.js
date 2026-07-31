/* Sales-enquiry endpoint — POST /api/contact-sales.
 *
 * Field mapping to the Zoho ContactSales form:
 *   Your Name           -> SingleLine
 *   Email               -> SingleLine2
 *   Additional Details  -> SingleLine4
 *
 * THE GAPS ARE DELIBERATE. The Zoho form still has five fields; the company and
 * team-size questions were dropped from the dialog on 2026-07-31, so SingleLine1
 * and SingleLine3 are simply not sent. Do NOT renumber to close the gaps — the
 * keys are positional in Zoho, so shifting email to SingleLine1 would file every
 * address under "Name of the company" and quietly corrupt the sheet.
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

const MAX_NAME = 80;
const MAX_EMAIL = 254;
const MAX_DETAILS = 2000;

/* A person's name has no business containing a URL or markup; the details box may,
   since a prospect might reasonably link to their site. */
const SPAMMY = /(https?:|ftp:|www\.|<[a-z/!]|\[url|\{\{)/i;

function build(data) {
  const name = oneLine(data.name);
  if (name.length < 2 || name.length > MAX_NAME) return { error: 'name' };
  if (!hasAlnum(name) || SPAMMY.test(name)) return { error: 'name' };

  /* Required, unlike the support form: a sales enquiry with no reply path is not
     a lead, and this form no longer asks anything else identifying. */
  const email = oneLine(data.email);
  if (!email || email.length > MAX_EMAIL || !looksLikeEmail(email)) return { error: 'email' };

  /* No control-character check here: multiLine() has already stripped them apart
     from the newlines it deliberately keeps, and \n is itself a control character
     — testing for one after the fact rejected every multi-line message. */
  const details = multiLine(data.details);
  if (details.length > MAX_DETAILS) return { error: 'length' };

  /* SingleLine1 (company) and SingleLine3 (team size) are intentionally absent —
     see the header. Zoho leaves them blank; renumbering would misfile the data. */
  return {
    fields: {
      SingleLine: name,
      SingleLine2: email,
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
