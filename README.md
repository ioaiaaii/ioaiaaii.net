# ioaiaaii.net

The website of composer Ioannis Savvaidis, at
[ioannissavvaidis.com](https://ioannissavvaidis.com). It is a static Vue app on Cloudflare
Pages, with its content in JSON files. It was served at ioaiaaii.net until October 2026
([ADR 005](docs/adr/005-domain-ioannissavvaidis-com.md)); the repository kept that name.

```text
web/          the app: Vue 3, Vite, Tailwind CSS 4
deploy/iac/   Terraform modules, applied from micro-infra
docs/         design notes and decision records
```

## Content

The content is in `web/src/data/`: the profile, works, collaborations and contact in
`info.json`, the records in `releases.json`, and the performances in `live.json`. A
change goes live with the next release.

## Development

The Node version is in `web/.nvmrc`.

```shell
make website-install    # install dependencies
make website-dev        # dev server
make website-check      # lint, unit tests, build
make website-test-e2e   # end-to-end tests
```

`make help` lists every target.

## Deployment

GitHub Actions builds the site and uploads it to Cloudflare Pages.

| Trigger                | Deploys to | Address                                         |
| ---------------------- | ---------- | ----------------------------------------------- |
| Push to master         | Preview    | master.ioaiaaii-net.pages.dev, behind a sign-in |
| Version tag, as v3.1.1 | Production | ioannissavvaidis.com                            |

To release, tag a commit on master with a version higher than the last one:

```shell
git tag -s v3.1.1 -m v3.1.1
git push origin v3.1.1
```

Pages decides what is production by a label sent with each upload, not by a git branch.
The release workflow uploads with the label production; the preview workflow uses
master, so a push to master can never reach the live site.

The Cloudflare token is kept in two GitHub environments, preview and production. GitHub
gives it only to runs from master and from version tags, and the jobs that use it run no
npm, so no dependency code runs next to the token.

To roll back, run the Release workflow by hand from an earlier tag, or pick an earlier
deployment in the Pages dashboard.

The workflows are in `.github/workflows/`: `web-ci.yaml` checks pull requests that change
the app and deploys the preview, `release.yaml` deploys production, and `security.yaml` runs Trivy.
The release-notes step in `release.yaml` has failed since `build/changelog/` was removed;
deploys are not affected.

The build has no `404.html`, so Pages answers any unknown path with `index.html` and the
app's router handles it. `web/public/_headers` sets the security and cache headers.

## Infrastructure

The Terraform modules live in this repository;
[micro-infra](https://github.com/ioaiaaii/micro-infra) applies them and keeps the state.

- `deploy/iac/cloudflare`: the Pages project and, with `manage_domain = true`, the custom
  domain with its apex and www records.
- `deploy/iac/github`: the preview and production environments, and the rulesets for the
  default branch and for tags.

The zone itself, with DNSSEC, TLS, the www redirect and the records for a domain without
email, is managed in micro-infra; see [DNS](docs/design/dns.md).

micro-infra pins each module to a release tag of this repository, so a module change
takes effect once it is tagged and the pin is moved. To plan a change before tagging, point
Terragrunt at your checkout:

```shell
terragrunt plan --source /path/to/ioaiaaii.net/deploy/iac/github
```

Two settings stay outside Terraform: domain auto-renew, because the Cloudflare provider
has no registrar resource, and the token on the GitHub environments, so it never enters
Terraform state.
