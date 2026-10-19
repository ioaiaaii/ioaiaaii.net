# ioaiaaii.net

Source for [ioannissavvaidis.com](https://ioannissavvaidis.com), the website of composer
Ioannis Savvaidis. The site is a static Vue single-page app on Cloudflare Pages, with its
content in JSON files. It was served at `ioaiaaii.net` until October 2026; the move is
recorded in [ADR 005](docs/adr/005-domain-ioannissavvaidis-com.md). The repository keeps
its original name.

## Stack

- Vue 3 and Vue Router
- Vite
- Tailwind CSS 4
- Vitest for unit tests, Cypress for end-to-end tests

## Layout

```text
web/                  the app
  src/
    views/            one component per route: Info, Works, Live, not found
    components/       shared components
    router/           routes, titles and meta tags
    data/             content
    lib/              plain JavaScript logic, with unit tests
    assets/           CSS and images
  public/             _headers, robots.txt, sitemap.xml, favicon, og image
  cypress/            end-to-end tests
deploy/iac/           Terraform modules, applied from micro-infra
  cloudflare/         Pages project, custom domain, apex and www records
  github/             this repository's environments and rulesets
docs/                 system design and decision records
repo-operator/        submodule: shared Makefiles
Makefile              entrypoint
```

## Content

The content is in `web/src/data/`:

- `info.json`: profile, artistic approach, selected works, collaborations, contact
- `releases.json`: releases
- `live.json`: performances

Vite bundles these files into the build, so a content change reaches the site with the
next deploy.

## Development

The Node version is in `web/.nvmrc`.

```shell
make website-install    # npm ci
make website-dev        # Vite dev server
make website-check      # lint, unit tests, build
make website-test-e2e   # Cypress against the production build
make help               # every target
```

## Deployment

GitHub Actions builds `web/dist` and uploads it to Cloudflare Pages with Wrangler
(_Direct Upload_). The Pages Git integration is not used.

| Trigger          | Workflow       | GitHub environment | Pages label  | Pages environment | Served at                                                           |
| ---------------- | -------------- | ------------------ | ------------ | ----------------- | ------------------------------------------------------------------- |
| push to `master` | `web-ci.yaml`  | `preview`          | `master`     | Preview           | `master.ioaiaaii-net.pages.dev`, behind a Cloudflare Access sign-in |
| `v[0-9]*` tag    | `release.yaml` | `production`       | `production` | Production        | `ioannissavvaidis.com`                                              |

A _GitHub environment_ stores the Cloudflare API token and account ID as secrets and
gives them only to runs from its trigger. A run from any other ref does not receive the
token. The deploy jobs download the build from the job before them and run no npm, so
dependency install scripts never run where the token is.

A _Pages label_ is the value passed to `wrangler pages deploy --branch`. It is a name,
not a git branch. The Pages project's production branch is the label `production`;
every other label is a preview.

Production also answers at `ioaiaaii-net.pages.dev`, which sends `X-Robots-Tag: noindex`.
Requests to `www.ioannissavvaidis.com` and to `http://` get a 301 to
`https://ioannissavvaidis.com`, with the path and query kept.

### Workflows

- `web-ci.yaml`: on pull requests and pushes to `master`, lint, unit tests, Cypress
  tests and build. A push to `master` also deploys the preview.
- `release.yaml`: on a `v[0-9]*` tag, lint, unit tests and build, then the production
  deploy, then the GitHub Release.
- `security.yaml`: on pull requests, pushes to `master`, and Mondays at 06:00 UTC,
  Trivy scans the dependencies, the repository for secrets, and `deploy/iac`.

### Release a change

Merge a pull request into `master` to deploy the preview. To deploy production, tag a
commit on `master` with a version newer than the last tag:

```shell
git tag -s v3.1.1 -m v3.1.1
git push origin v3.1.1
```

The release notes come from the conventional commit messages since the previous tag.
The release-notes job currently fails: it reads `build/changelog/`, which was removed in
`689bfef`. The deploy is not affected, and the GitHub Release is created by hand.

### Deploy a preview by hand

With Wrangler logged in (`npx wrangler login`):

```shell
make website-build
npx wrangler pages deploy web/dist --project-name=ioaiaaii-net --branch=<label>
```

Replace `<label>` with any name except `production`. The preview is served at
`<label>.ioaiaaii-net.pages.dev`, behind the same Access sign-in.

### Roll back

Run the Release workflow by hand from the previous tag (Actions → Release → Run
workflow, then select the tag), or roll back to an earlier production deployment in the
Pages dashboard. The `production` environment rejects a manual run from a branch.

### Routing and headers

With no `404.html` in the build, Pages serves `index.html` for any path that is not a
file, so the client-side routes need no `_redirects`. `web/public/_headers` sets the
security headers and caching.

## Infrastructure

The Terraform for the site is split between this repository and
[micro-infra](https://github.com/ioaiaaii/micro-infra). This repository contains the
modules; micro-infra has the state, runs `apply`, and pins each module to a release tag
of this repository.

| Terraform                                                | Repository  | Manages                                                                                             |
| -------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `deploy/iac/cloudflare`                                  | this        | Pages project; with `manage_domain = true`, the custom domain and the apex and `www` records        |
| `deploy/iac/github`                                      | this        | environments `preview` and `production` with their ref rules; rulesets `main` and `tag-restriction` |
| `iac/live/cloudflare/zones/ioannissavvaidis.com/dns`     | micro-infra | the zone, DNSSEC, CAA, and the records for a domain that sends no email                             |
| `iac/live/cloudflare/zones/ioannissavvaidis.com/ssl-tls` | micro-infra | Always Use HTTPS, TLS 1.2 minimum, TLS 1.3                                                          |
| `iac/live/cloudflare/zones/ioannissavvaidis.com/rules`   | micro-infra | the `www` to apex redirect                                                                          |

The records and zone settings are described in [DNS](docs/design/dns.md).

micro-infra applies the two modules from `iac/live/cloudflare/pages` and
`iac/live/github/ioaiaaii.net`. A module change takes effect once it is in a tag and the
unit's `ref` points at that tag. Before the tag exists, plan against a local checkout:

```shell
terragrunt plan --source <checkout>/deploy/iac/github
```

Two settings stay outside Terraform: domain auto-renew, set in the Cloudflare dashboard
because the provider has no registrar resource, and the environment secrets, set by
hand so that the token never enters Terraform state.
