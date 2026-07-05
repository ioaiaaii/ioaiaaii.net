# System Design

## Project: ioaiaaii.net

## Overview

`ioaiaaii.net` is a static single-page app. There is no server: content is a set of
JSON files bundled into the build, and the whole site is served as static files from a
CDN (Cloudflare Pages).

This replaced an earlier Go BFF (Clean Architecture, Fiber, file-based persistence)
that ran on Kubernetes. The move and its reasons are recorded in
[ADR 004](../adr/004-static-vue-cloudflare-pages.md).

## Components

- **App** — Vue 3 + Vue Router SPA. Three routes: `/` (info), `/works`, `/live`, plus a
  404. Styling is Tailwind CSS 4 with self-hosted fonts.
- **Content** — `web/src/data/{info,live,releases}.json`, imported directly by the
  components. Editing content is a JSON change plus a rebuild.
- **Logic** — small pure modules in `web/src/lib/` (date formatting, term highlighting,
  works section building), unit-tested with Vitest.

## Data flow

1. At build time, Vite bundles the JSON content into the app.
2. The browser loads the static assets from the CDN.
3. Vue Router renders the requested route; components read their content from the
   imported JSON. No network calls are made for content.

## Build and delivery

- Build: `npm run build` (Vite) → `web/dist`.
- Host: Cloudflare Pages, built from this repo on push.
- Routing: `web/public/_redirects` maps unknown paths to `index.html` for the SPA.
- Headers: `web/public/_headers` sets asset caching and security headers.
