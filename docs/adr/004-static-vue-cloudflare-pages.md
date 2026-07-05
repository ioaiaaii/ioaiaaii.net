# ADR 004: Static Vue SPA on Cloudflare Pages (drop the BFF)

## Status

Accepted, 2026-07-04.

## Context

The site content is a few JSON files that change a few times a year. It ran as a Go
BFF (Fiber serving `/api/v1/*`) on a GKE cluster. That cost about €45/month and needed
cluster upkeep, Helm charts, and image builds for content that never changes at request
time.

## Decision

Serve the frontend as a static Vue 3 + Vite SPA on Cloudflare Pages (free tier).

- Components import content from `src/data/*.json` instead of fetching `/api/v1/*`. No
  server runs at render time.
- Cloudflare Pages (Direct Upload) driven by GitHub Actions: pushes to `master` deploy a
  preview (development), and `v*` tags deploy production. SPA routing comes from
  `public/_redirects`, headers from `public/_headers`.
- Remove the Go backend, Helm/k8s manifests, and Docker image pipeline. The repo becomes
  the `web/` app plus docs and the `repo-operator` submodule.

## Consequences

- Hosting drops from about €45/month to €0. The GKE setup can be shut down.
- CI/CD runs through GitHub Actions and the Makefile: master pushes deploy development,
  `v*` tags deploy production. Editing content is a JSON commit.
- The site can no longer serve dynamic content without adding a backend again.
- The old API, deploy, and image tooling are gone; some history now lives only in git.
