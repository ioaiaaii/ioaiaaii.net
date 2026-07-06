# ioaiaaii.net

A personal website for my composer profile. It is a static Vue single-page app with content managed in JSON.

The site used to be a Go backend on Kubernetes. It moved to a static build on Cloudflare
Pages to cut hosting cost and ops work.

## Stack

- Vue 3 + Vue Router
- Vite for the build
- Tailwind CSS 4
- Vitest for unit tests, Cypress for an end-to-end smoke test

## Layout

```shell
web/                  the app
  src/
    components/       pages, plus Navigation and AppFooter
    data/             content
    lib/              logic
    assets/           css and images
  public/             _redirects, _headers, favicon, og image
deploy/iac/           Terraform
  cloudflare/         the CL Pages project and custom domain
  gcp/                the old GCS bucket setup
docs                  docs/decision records
repo-operator/        submodule: shared Makefiles and changelog templates
Makefile              entrypoint
```

## Content

- `info.json` — profile, artistic approach, selected works, collaborations, contact
- `releases.json` — releases
- `live.json` — performances

## Development

```shell
make website-install    # npm ci
make website-dev        # vite dev server
make website-check      # lint, unit tests, build
make website-test-e2e   # cypress smoke test
make help               # every target
```

## Deployment

Cloudflare Pages, Direct Upload, driven by GitHub Actions. This does not use the CP Pages Git integration, so we managed the Release Engineering.

### Environments

Cloudflare Pages has two environments. A deploy lands in one or the other based on its
branch label versus the project's production branch, which is `production`:

- **Production** — branch label `production`. It is the only label that reaches
  production, and only `release.yaml` ever uses it. Served at the production
  `*.pages.dev` URL, and at `ioaiaaii.net` once that domain's DNS moves to Cloudflare.
- **Preview** — any other label. Served at `<label>.ioaiaaii-net.pages.dev`. Pushes to
  `master` deploy with `--branch=master`, so they are always previews.

Preview deployments are behind a Cloudflare Access policy: viewing one requires signing
in as the account owner. Production is public.

### Workflows

- `web-ci.yaml` — pull requests and pushes to `master`: lint, unit tests, build. A
  master push also deploys a preview.
- `security.yaml` — pull requests, pushes to `master`, and weekly: Trivy scans
  dependencies and secrets.
- `release.yaml` — a `v*` tag: build the tagged tree, deploy to production, and cut a
  GitHub Release with the changelog.

Both deploy jobs upload `web/dist` with `cloudflare/wrangler-action`. After deploying, each job smoke-tests the result: the homepage must
contain the site name and a deep link must return HTTP 200, so a broken build fails the
pipeline instead of going live.

### Releasing

**Preview (development).** Push to `master`; CI builds and publishes
`master.ioaiaaii-net.pages.dev`. To publish an ad-hoc preview without going through CI:

```shell
make website-build
npx wrangler pages deploy web/dist --project-name=ioaiaaii-net --branch=<label>
```

Any `<label>` except `production` is a preview and gets its own
`<label>.ioaiaaii-net.pages.dev` URL, behind the same Access policy.

**Production.** Production is a `v*` git tag — there is no manual production deploy and no
`make release`:

```shell
git tag v1.2.0
git push origin v1.2.0
```

`release.yaml` builds that exact commit, deploys it with `--branch=production`,
smoke-tests it, and cuts a GitHub Release. The release notes are generated from the
conventional commit messages since the last tag, so write commits accordingly. To undo a
bad release, see Rollback below.

`web/public/_redirects` handles SPA routing. `web/public/_headers` sets caching and
security headers.

## Infrastructure

The Pages project and its custom domain are declared in `deploy/iac/cloudflare`
(Terraform, Cloudflare provider). The state and the `apply` live in the separate
`micro-infra` repo.

`deploy/iac/gcp` is the previous GCS bucket module.
