/* Connector-request endpoint — POST /api/request-connector.
 *
 * One field: the name of a data source we do not support yet, mapped to the
 * Zoho RequestConnector form's SingleLine.
 *
 * The shared rules (secret handling, origin check, honeypot, fill-time, rate
 * limit, upstream call, Node bridge) live in ./zoho-form-endpoint.js. Only what
 * is specific to this form is here — which is the validation, because a connector
 * name and a support ticket need genuinely different rules: a bug report may
 * contain a URL, a product name may not.
 */
import { createFormHandler, oneLine, hasControlChars, hasAlnum } from './zoho-form-endpoint.js';

const MIN_LEN = 2;
const MAX_LEN = 80;

/* Anything that reads as a payload rather than a product name. Kept permissive
   on characters — connector names are global, so letters and digits are matched
   by Unicode property rather than an ASCII range. */
const SPAMMY = /(https?:|ftp:|www\.|<[a-z/!]|\[url|\{\{|@)/i;

function build(data) {
  if (typeof data.name !== 'string' || hasControlChars(data.name)) return { error: 'invalid' };
  const name = oneLine(data.name);
  if (name.length < MIN_LEN || name.length > MAX_LEN) return { error: 'length' };
  if (!hasAlnum(name)) return { error: 'invalid' };
  if (SPAMMY.test(name)) return { error: 'invalid' };
  return { fields: { SingleLine: name } };
}

const { handleRequest, nodeHandler } = createFormHandler({
  envVar: 'ZOHO_CONNECTOR_FORM_URL',
  label: 'request-connector',
  /* Generous on purpose: someone naming three or four missing tools in one
     sitting is a good outcome, not abuse. */
  rateMax: 5,
  maxBody: 2048,
  build,
});

export { handleRequest, nodeHandler };
export default { fetch: handleRequest };
