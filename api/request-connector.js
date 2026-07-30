/* Vercel (and any Node host) entry point for POST /api/request-connector.
 *
 * Intentionally three lines: every decision, check and secret lookup lives in
 * ../server/request-connector.js, which is plain Web-standard JavaScript with no
 * host SDK. This file is the only Vercel-shaped thing in the feature, so moving
 * off Vercel means deleting it and adding the equivalent one-liner for the new
 * host — the logic, the validation and the spam controls travel unchanged. The
 * porting table is in the header comment of the core module.
 */
export { nodeHandler as default } from '../server/request-connector.js';
