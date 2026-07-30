/* Support-ticket endpoint — POST /api/contact-support.
 *
 * Field mapping to the Zoho ContactSupport form, as specified:
 *   Category    -> SingleLine
 *   Subject     -> SingleLine1
 *   Details     -> SingleLine2
 *   Email       -> SingleLine3
 *   Attachment  -> FileUpload   (NOT IMPLEMENTED — see below)
 *
 * ── why attachments are not wired ──
 * The /records endpoint will not take a file. Probed against the live form:
 *
 *   multipart/form-data with a file part  -> 302 to /showerror
 *   JSON with "FileUpload":"<base64>"     -> 400
 *        {"errors":[{"FileUpload":"The path of the uploaded file is not valid."}]}
 *
 * That error is the tell: FileUpload expects a *path* to a file already uploaded
 * through a separate channel. Zoho's own form JS uses one —
 * POST https://eu1-files.zohopublic.eu/forms/v2/stream/publicupload with the raw
 * bytes as the body and x-portalname / x-formlinkname / x-fieldlinkname /
 * x-filename / upload-id headers — but every header combination we tried returns
 * {"ERROR_MESSAGE":"EXTRA_PARAM_FOUND","ERROR_CODE":401}, so it also wants a
 * token minted in a real browser session. Undocumented and unstable ground.
 *
 * Even solved, two ceilings would remain: a Vercel function caps a request body
 * at 4.5MB while this form offers 5 files at 10MB each, and GitLab Pages runs no
 * server code at all. So attachments need a decision about where uploads go, not
 * just more code.
 *
 * Until then the file NAMES ride along in the Details field. The visitor's
 * choice is not silently dropped, and whoever reads the ticket knows to ask for
 * the files. The UI copy must not claim the files were sent.
 */
import {
  createFormHandler, oneLine, multiLine, hasControlChars, hasAlnum, looksLikeEmail,
} from './zoho-form-endpoint.js';

/* Mirrors CATEGORIES in src/pages/contact-support.jsx. An allowlist, not a
   passthrough: the category is a fixed choice, so an unrecognised value means a
   forged payload rather than a visitor's typing. Zoho receives the human label —
   whoever reads the ticket should not have to decode 'connection'. */
const CATEGORIES = {
  general: 'General Question',
  bug: 'Report a Bug',
  billing: 'Billing & Account',
  connection: 'Data Connections',
  feature: 'Feature Request',
  other: 'Other',
};

const MAX_SUBJECT = 200;
const MAX_DETAILS = 5000;
const MAX_EMAIL = 254;
const MAX_FILENAMES = 5;

/* Unlike a connector name, a support ticket may legitimately contain a URL — a
   bug report often is a URL. So no link filter here; the controls are the
   allowlisted category, length caps, the honeypot, fill-time and the rate limit. */
function build(data) {
  const category = CATEGORIES[oneLine(data.category)];
  if (!category) return { error: 'invalid' };

  const subject = oneLine(data.subject);
  if (subject.length < 2 || subject.length > MAX_SUBJECT) return { error: 'length' };
  if (!hasAlnum(subject)) return { error: 'invalid' };

  const details = multiLine(data.details);
  if (details.length > MAX_DETAILS) return { error: 'length' };

  const email = oneLine(data.email);
  if (email) {
    if (email.length > MAX_EMAIL || !looksLikeEmail(email)) return { error: 'email' };
  }

  /* Names only — the bytes never reach us. Sanitised like any other input: a
     filename is attacker-controlled text. */
  const names = Array.isArray(data.fileNames)
    ? data.fileNames
      .slice(0, MAX_FILENAMES)
      .map((n) => oneLine(n).slice(0, 120))
      .filter((n) => n && !hasControlChars(n))
    : [];

  const detailParts = [];
  if (details) detailParts.push(details);
  if (names.length) {
    detailParts.push(
      `[Attachments the visitor selected but which were not transmitted: ${names.join(', ')}]`
    );
  }

  return {
    fields: {
      SingleLine: category,
      SingleLine1: subject,
      SingleLine2: detailParts.join('\n\n'),
      SingleLine3: email,
    },
  };
}

const { handleRequest, nodeHandler } = createFormHandler({
  envVar: 'ZOHO_SUPPORT_FORM_URL',
  label: 'contact-support',
  /* Lower than the connector form's five: a person filing genuine tickets in one
     sitting is rarer than someone naming several missing tools. */
  rateMax: 3,
  /* Details alone can be 5000 characters, and multi-byte text costs more than one
     byte per character, so the ceiling is well above the sum of the caps. */
  maxBody: 32 * 1024,
  build,
});

export { handleRequest, nodeHandler };
export default { fetch: handleRequest };
