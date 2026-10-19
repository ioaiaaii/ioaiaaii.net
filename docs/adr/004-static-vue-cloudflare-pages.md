# ADR 004: Static Vue app on Cloudflare Pages, without the backend

## Status

Accepted on 2026-07-04.

## Context

The site's content is a few JSON files that change a few times a year. It ran as a Go
backend for frontend (Fiber, serving the content under /api/v1) on a GKE cluster. That
cost about €45 a month and needed cluster upkeep, Helm charts and image builds, for
content that never changes at request time.

## Decision

Serve the site as a static Vue 3 and Vite app on Cloudflare Pages, on the free plan.

- The pages import their content from JSON files in the build instead of calling the
  API, so no server runs when a page is requested.
- GitHub Actions uploads the build to Pages: a push to master deploys a preview, and a
  version tag deploys production.
- Remove the Go backend, the Helm and Kubernetes manifests and the Docker image
  pipeline. The repository keeps the web app, the docs and the repo-operator submodule.

## Consequences

- Hosting drops from about €45 a month to nothing. The GKE cluster has since been shut
  down; its Terraform stays in micro-infra so it can be rebuilt.
- Changing content is a commit to a JSON file.
- Serving dynamic content would need a backend again.
- The old API, deploy and image tooling remain only in git history.
- Client-side routing first used a `_redirects` file. It was removed on 2026-10-18:
  when the build has no `404.html`, Pages already serves `index.html` for any path that
  is not a file.
