/* Vercel (and any Node host) entry point for POST /api/contact-sales.
 * One line by design — see api/request-connector.js for why.
 */
export { nodeHandler as default } from '../server/contact-sales.js';
