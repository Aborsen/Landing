// Maps our connectors (src/data/connectors.js) to a class in the Skyvia logo
// sprite (design-system/components/connector-sprite.css). spriteClassFor() tries
// the slug, derived name, underscored name, and hbr_/rst_ prefixed variants
// (Skyvia namespaces many logos that way) before giving up — so the explicit
// ALIAS_MAP only needs the genuinely-different short names.
import { SPRITE_CLASSES } from './sprite-classes.js';

// our identifier (slug or derived name) -> exact sprite class
const ALIAS_MAP = {
  googlebigquery: 'bigquery',
  bigquery: 'bigquery',
  amazonredshift: 'redshift',
  microsoftsqlserver: 'sqlserver',
  sqlserver: 'sqlserver',
  googleworkspace: 'googleapps',
  gsuite: 'googleapps',
  dynamics365: 'dynamics',
  microsoftexcel: 'excelonline',
  confluence: 'rst_confluence_cloud',
  confluencecloud: 'rst_confluence_cloud',
  mondaydotcom: 'mondaycom',
  xads: 'twitterads',
  brevo: 'hbr_sendinblue',
  kit: 'hbr_convertkit',
  convertkit: 'hbr_convertkit',
  sugarai: 'sugar',
  // cut favicon fallbacks -> existing sprite logos (same brand family)
  googlecloudsqlformysql: 'googlecloudsqlmysql',
  gcsqlforpostgresql: 'googlecloudsqlpostgresql',
  googlecloudsqlforsqlserver: 'googlecloudsqlserver',
  azureapplicationinsights: 'hbr_azure_app_insights',
  azuresynapse: 'azuredwh',
  amazonaurora: 'amazonrds',
  herokupostgres: 'postgresql',
  cin7coreinventory: 'dearinventory',
  maxiobilling: 'rst_chargify',
  pipelinercrm: 'hbr_pipeliner',
  productiveio: 'hbr_productive',
  freshsalesclassic: 'freshsales',
};

// sprite classes whose mark is dark/low-contrast on our dark theme -> render as a
// DS-token-colored silhouette (.is-dark). AUTO-DETECTED by luminance-sampling each
// sprite cell (low luminance, or dark + near-greyscale). Regenerate, don't hand-edit.
export const DARK_SPRITE_LOGOS = new Set([
  'acuityscheduling', 'bigcommerce', 'box', 'dbt-streamline', 'drip', 'dropbox',
  'emailoctopus', 'graphql', 'grok', 'hbr_azure_devops', 'hbr_booqable', 'hbr_front', 'hbr_fullstory',
  'hbr_intercom', 'hbr_motion', 'hbr_paymo', 'hbr_pipeliner', 'hbr_smartsheet',
  'hbr_square', 'hbr_teamwork', 'hbr_teamwork_crm', 'hbr_teamwork_desk', 'hbr_tempo',
  'hbr_thinkific', 'hbr_unbounce', 'mailchimp', 'openai', 'rst_chargify',
  'rst_formstack_documents', 'rst_okta', 'rst_paymo', 'rst_recharge', 'rst_survicate',
  'sageaccounting', 'scoro', 'shipstation', 'sugar', 'tiktokads', 'twitterads',
  'wordpress', 'zendesk', 'zohoanalytics',
]);

// Sprite classes to skip (art has a baked dark backing box, etc.) -> fall back to the favicon.
const EXCLUDE_SPRITE = new Set(['dynamics']);

const derive = (s) => (s ? s.toLowerCase().replace(/[^a-z0-9]/g, '') : '');
const underscore = (s) => (s ? s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') : '');

export function spriteClassFor({ name, slug } = {}) {
  const dSlug = derive(slug);
  const dName = derive(name);
  const uName = underscore(name);
  const candidates = [
    ALIAS_MAP[dSlug], ALIAS_MAP[dName],
    dSlug, dName, uName,
    `hbr_${dName}`, `rst_${dName}`, `hbr_${uName}`, `rst_${uName}`,
    `hbr_${dSlug}`, `rst_${dSlug}`,
  ];
  for (const c of candidates) {
    if (c && SPRITE_CLASSES.has(c)) return EXCLUDE_SPRITE.has(c) ? null : c;
  }
  return null;
}

export const isDarkLogo = (cls) => DARK_SPRITE_LOGOS.has(cls);
