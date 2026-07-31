/* Waitlist endpoint — POST /api/waitlist.
 *
 * Field mapping to the Zoho Waitlist form, as specified:
 *   Email -> SingleLine
 *
 * One field, so the validation is short, but it is all load-bearing: verified
 * against the live form on 2026-07-31, POST {} returns 200 with the same
 * success-shaped payload as a real submission. Zoho accepts a blank waitlist
 * entry happily, so an empty email must be rejected here or the list fills with
 * rows nobody can contact.
 *
 * Stricter than the other forms on purpose. This sits on /auth/sign-in, a page
 * that says sign-in is not live yet — the kind of page bots probe for credential
 * forms. Lowest rate ceiling of the four endpoints, and the address must parse
 * before anything is forwarded.
 */
import { createFormHandler, oneLine, looksLikeEmail } from './zoho-form-endpoint.js';

const MAX_EMAIL = 254;

function build(data) {
  const email = oneLine(data.email);
  if (!email || email.length > MAX_EMAIL || !looksLikeEmail(email)) return { error: 'email' };
  return { fields: { SingleLine: email } };
}

const { handleRequest, nodeHandler } = createFormHandler({
  envVar: 'ZOHO_WAITLIST_FORM_URL',
  label: 'waitlist',
  /* Two per ten minutes: nobody needs to join a waitlist twice, and a second
     attempt after a typo is the only legitimate repeat. */
  rateMax: 2,
  maxBody: 2048,
  build,
});

export { handleRequest, nodeHandler };
export default { fetch: handleRequest };
