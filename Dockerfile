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
RUN npm run build

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
