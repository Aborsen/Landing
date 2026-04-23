# Deprecated tokens

These tokens are aliased in `tokens.css` for backward compatibility with pages consuming the original `colors_and_type.css`. **Do not use them in new code.** All have canonical replacements.

| Deprecated | Use instead | Replace by |
|---|---|---|
| `--ins-font-ui` | `--ins-font-family-sans` | v2.0 |
| `--ins-font-display` | `--ins-font-family-sans` | v2.0 |
| `--ins-font-marketing` | `--ins-font-family-sans` | v2.0 |
| `--ins-font-mono` | `--ins-font-family-mono` | v2.0 |
| `--ins-text-primary` | `--ins-text-heading` | v2.0 |
| `--ins-text-secondary` | `--ins-text-body` | v2.0 |
| `--ins-primary-*` (100–800, vivid, dark) | `--ins-color-teal-*` | v2.0 |
| `--ins-gray-0`…`--ins-gray-950` | `--ins-color-white`, `--ins-color-gray-*` | v2.0 |
| `--ins-gray-350` | `--ins-color-gray-300` | v2.0 |
| `--ins-state-live` and siblings | `--ins-status-success-fg` and semantic equivalents | v2.0 |
| `--ins-state-*-bg` / `--ins-state-*-fg` | `--ins-color-green-*` / `--ins-status-*-bg` | v2.0 |
| `--ins-surface-hover` | `--ins-color-white-a-06` (or `--ins-button-ghost-bg-hover`) | v2.0 |
| `--ins-surface-brand-weak` | `--ins-surface-brand-tint` | v2.0 |
| `--ins-card-border-hover` | `--ins-border-hover` | v2.0 |
| `--ins-chat-user-bg` | `--ins-color-teal-a-12` | v2.0 |
| `--ins-chat-user-border` | `--ins-color-teal-a-25` | v2.0 |
| `--ins-radius-3xl` | `--ins-radius-20` | v2.0 |
| `--ins-shadow-nav` | `--ins-shadow-sm` | v2.0 |
| `--ins-shadow-menu` | `--ins-shadow-lg` | v2.0 |
| `--ins-shadow-glow` / `--ins-shadow-glow-lg` | **Removed** — no glow variants | removed |
| `--ins-mint-glow` | **Removed** | removed |
| `--ins-bp-sm/md/lg/xl` | `--ins-bp-480/768/1024/1280` | v2.0 |
| `--ins-content-max` | `--ins-container-max` | v2.0 |
| `--ins-space-0…96` (numeric aliases) | `--ins-space-xs/sm/md/lg/xl/2xl/...` | v2.0 |
| `--ins-space-inline-gap`, `--ins-space-card-gap`, etc. | Replace with explicit `--ins-space-*` at call site | v2.0 |
| `--ins-ease`, `--ins-dur-*` | `--ins-easing-standard`, `--ins-duration-*` | v2.0 |
| `--ins-border-width` | `--ins-border-width-1` | v2.0 |
| `--ins-border-width-focus` | `--ins-border-width-1-5` | v2.0 |
| Legacy breakpoints `600` / `900` | Standard 480/768/1024/1280 | per-page as pages are touched |

## Migration policy

- v1.x keeps all aliases; new code uses canonical tokens
- v2.0 will require migrating existing pages or bundling the alias block separately as `tokens-legacy.css`
- No aliases removed mid-release — plan migrations page-by-page
