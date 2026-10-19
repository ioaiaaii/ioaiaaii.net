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

A change goes to preview when it reaches `master`, and to production when it is tagged:

| Trigger          | GitHub environment | Pages label (`--branch`) | Pages environment | Served at                                                          |
| ---------------- | ------------------ | ------------------------ | ----------------- | ------------------------------------------------------------------ |
| push to `master` | `preview`          | `master`                 | Preview           | `master.ioaiaaii-net.pages.dev`, behind Cloudflare Access          |
| `v[0-9]*` tag    | `production`       | `production`             | Production        | `ioaiaaii-net.pages.dev`, and `ioannissavvaidis.com` once attached |

- **GitHub environment**: holds the Cloudflare token and gives it only to runs from
  that trigger (`deploy/iac/github`).
- **Pages label**: a name, not a git branch. The project's production branch is the
  label `production`, so that label is production and every other label is a preview
  (`deploy/iac/cloudflare`).

Previews need a sign-in as the account owner. Production is public.

### Workflows

- `web-ci.yaml` — pull requests and pushes to `master`: lint, unit tests, build. A
  master push also deploys a preview.
- `security.yaml` — pull requests, pushes to `master`, and weekly: Trivy scans
  dependencies and secrets.
- `release.yaml` — a `v*` tag: build the tagged tree, deploy to production, and cut a
  GitHub Release with the changelog.

Both deploy jobs take the build from the job before them and upload it with
`cloudflare/wrangler-action`; they run no npm. There is no post-deploy smoke test yet.

### Releasing

**Preview (development).** Push to `master`; CI builds and publishes
`master.ioaiaaii-net.pages.dev`. To publish an ad-hoc preview without going through CI:

```shell
make website-build
npx wrangler pages deploy web/dist --project-name=ioaiaaii-net --branch=<label>
```

Any `<label>` except `production` is a preview and gets its own
`<label>.ioaiaaii-net.pages.dev` URL, behind the same Access policy.

**Production.** Production is a `v*` git tag, newer than the last one. There is no
`make release`:

```shell
git tag v1.2.0
git push origin v1.2.0
```

`release.yaml` builds that exact commit, deploys it with `--branch=production`, and cuts
a GitHub Release. The release notes are generated from the conventional commit messages
since the last tag, so write commits accordingly.

To undo a bad release, run Release by hand from the previous tag (Actions → Release →
Run workflow, pick the tag), or roll back to an earlier deployment in the Pages
dashboard. A manual run from a branch stops at the deploy job.

Routes need no `_redirects`: with no `404.html` in the build, Pages serves
`index.html` for any path that isn't a file. `web/public/_headers` sets caching and
security headers.

## Infrastructure

`deploy/iac/cloudflare` (Terraform, Cloudflare provider) declares what the site needs
to be served: the Pages project and, once `manage_domain` is true, its custom domain
and the apex and `www` DNS records. Zone-wide settings (DNSSEC, HTTPS and TLS, CAA, the
records that say the domain sends no email, and the `www` to apex redirect) belong to
the platform: `micro-infra`, under `iac/live/cloudflare/zones/<domain>/` in three
units, `dns`, `ssl-tls` and `rules`. The state and the `apply` for both live in
`micro-infra`. Domain auto-renew is set in the Cloudflare dashboard; the provider has no
resource for it.

`deploy/iac/github` (Terraform, GitHub provider) declares the repo's `preview` and
`production` environments and its rulesets. Only `master` may deploy through `preview`
and only `v[0-9]*` tags through `production`, and the Cloudflare token and account ID
are secrets on those two environments, added by hand. It is applied from `micro-infra`,
`iac/live/github/ioaiaaii.net`.
