# ioaiaaii.net

Personal site for Ioannis Savvaidis (composer): profile, works, releases, and live
dates. It is a static Vue single-page app. Content lives as JSON in the repo and is
bundled at build time, so there is no backend.

The site was previously a Go BFF served from Kubernetes. It was moved to a static build
on Cloudflare Pages to cut hosting cost and ops overhead. See
[ADR 004](./docs/adr/004-static-vue-cloudflare-pages.md).

## Stack

- Vue 3 + Vue Router
- Vite (build)
- Tailwind CSS 4
- Vitest (unit) + Cypress (e2e smoke)
- Self-hosted fonts via `@fontsource`

## Layout

```
web/                     # the app
  src/
    components/          # pages + Navigation, AppFooter
    data/               # info.json, releases.json, live.json  (content)
    lib/                # pure logic (date, terms, works) + unit tests
    assets/             # css, images
  public/               # _redirects, _headers, favicon, og image
docs/adr/                # architecture decision records
Makefile                 # website-* targets (make help)
```

## Content

To edit content, change the JSON in `web/src/data/` and rebuild:

- `info.json` — profile, artistic approach, selected works, collaborations, contact
- `releases.json` — releases
- `live.json` — performances

## Development

```shell
make website-install     # npm ci
make website-dev         # vite dev server
make website-check       # lint + unit tests + build
make website-test-e2e    # cypress smoke test
make help                # all targets
```

Or run the npm scripts directly under `web/`.

## Deployment

Cloudflare Pages (Direct Upload), driven by GitHub Actions — not the dashboard Git
integration.

- **CI** (`.github/workflows/web-ci.yaml`): on pull requests and pushes to `master`,
  runs lint, unit tests, and the build.
- **Development**: each green push to `master` publishes a Pages preview
  (`master.ioaiaaii-net.pages.dev`).
- **Production** (`.github/workflows/release.yaml`): tagging `vX.Y.Z` cuts a GitHub
  Release with the changelog and deploys to the production branch (the custom domain).

Both deploys ship `web/dist` via `cloudflare/wrangler-action` and need the repo secrets
`CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. The Pages project's production branch
is `production`, so only tags reach production. Node is pinned by `web/.nvmrc`.

`web/public/_redirects` handles SPA routing; `web/public/_headers` sets caching and
security headers.

Both deploy jobs smoke-test the result (HTTP 200 on `/` and on a deep link) so a broken
deploy fails the pipeline instead of going live silently.

## Operations

### Rollback

Pages deploys are atomic and content-addressed, so rollback is instant and needs no
rebuild: Cloudflare dashboard → the Pages project → Deployments → pick the last good
deployment → "Rollback to this deploy".

### Security headers

`web/public/_headers` sets a strict Content-Security-Policy (the app is self-contained,
so `script-src` is `'self'`), HSTS, and the usual hardening headers. Adding any
third-party resource means updating the CSP there.

### Observability

Enable Cloudflare Web Analytics (free, cookieless RUM — page views and Core Web Vitals)
in the dashboard. If the domain is not proxied through Cloudflare, add the Web Analytics
beacon to `web/index.html`; the CSP already allows `static.cloudflareinsights.com`.
