# Insightis site — build and serve.
#
# Replaces the previous nginx-only image, which copied two hand-written HTML files
# and needed no build. This site is 44 prerendered pages produced by
# `vite build && node scripts/prerender.mjs`, so the image needs a build stage.
#
# It serves from Node rather than nginx because the site also has three form
# endpoints (/api/*) that submit to Zoho server-side. nginx cannot run those, so
# the alternative was a second image, a second registry tag, an nginx.conf and a
# change to the deploy pipeline. One Node process needs none of that, and
# insightis.ai sits behind Cloudflare, which caches static assets at the edge —
# so nginx's advantage at the origin barely applies here.
#
# Clean URLs and the 18 legacy redirects are handled in server/serve.js, read
# from vercel.json so there is one source of truth. Verified: 116 assertions
# covering all 45 built HTML files at their extension-less URLs and every
# redirect target.

FROM node:24-alpine AS build
WORKDIR /app

# Dependencies first, so a source-only change does not re-resolve the tree.
# `npm ci` not `npm install`: the lockfile is the contract, and a build that
# silently resolves different versions is not the build that was tested.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Registration parity, before anything expensive. Both waitlist outages were a
# route or a variable registered in some of its required places but not all:
# /api/waitlist was in vite.config.js and not in server/serve.js (404 in the
# container), then ZOHO_WAITLIST_FORM_URL was read by the endpoint and not passed
# by docker-compose (503 in production). Unit tests passed and the build was clean
# both times, because nothing compared one file's list against another's.
RUN node scripts/check-wiring.mjs

RUN npm run build

# The endpoint suite: 227 assertions across the four form handlers and the
# container's own server, upstream mocked so no rows reach the live Zoho forms.
# Runs after the build because two suites read dist/.
RUN npm test

# Fail the build rather than ship a broken site. The prerenderer reports per-page
# results and still exits 0, so a page that stopped rendering would otherwise
# reach production as an empty shell.
RUN test -f dist/index.html \
 && test -f dist/resources/connectors.html \
 && test "$(find dist -name '*.html' | wc -l)" -ge 44 \
 && echo "build check: $(find dist -name '*.html' | wc -l) html files"

# The form endpoints' Zoho URLs are runtime configuration, never baked in. Assert
# it: a leaked URL in the client bundle would hand anyone an unauthenticated
# write endpoint.
RUN if grep -rq "zohopublic\|formperma" dist/; then \
      echo "FAIL: a Zoho form endpoint leaked into the build output"; exit 1; \
    fi

# ── Google Tag Manager ──
# Applied here, in the container build, and nowhere else. The same commit is
# pushed to GitHub, which Vercel builds, and to GitLab, which builds this image;
# the tag is wanted on the GitLab deployment only. Putting the snippet in the 31
# source HTML shells would ship it to both, so instead it is injected into dist/
# by a step that exists on this path alone. `npm run build` above does not run it,
# so there is nothing to remember to unset on the Vercel side.
#
# The container ID is not a secret — Tag Manager publishes it in the page source
# of every site that uses it — so it lives here rather than in a CI variable,
# where it would be one more thing to configure and one more way for the tag to
# stop shipping without anyone noticing. Change it here; override a single build
# with --build-arg GTM_ID=…, or pass an empty string for an untagged image.
ARG GTM_ID=GTM-TSTTC7TZ
RUN node scripts/inject-gtm.mjs "$GTM_ID"

# The injector already fails if fewer than 44 pages end up tagged. This is the
# cheaper outer check: proof that what is in this layer, not just what the script
# reported, carries the loader.
RUN if [ -n "$GTM_ID" ] && ! grep -q "googletagmanager.com/gtm.js" dist/index.html; then \
      echo "FAIL: Google Tag Manager did not reach dist/index.html"; exit 1; \
    fi

# ── runtime ──
# server/serve.js and the three endpoint modules import only Node built-ins, so
# no node_modules is copied. Smaller image, and nothing installed at runtime.
FROM node:24-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/vercel.json ./vercel.json
# "type": "module" lives here — without it Node treats server/*.js as CommonJS.
COPY --from=build /app/package.json ./package.json

# Unprivileged, which is also why the port is 8080 and not 80: a non-root process
# cannot bind below 1024.
USER node

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||8080)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server/serve.js"]
