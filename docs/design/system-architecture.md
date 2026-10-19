# System design

ioannissavvaidis.com is a static single-page app. No server code runs at request time:
the content is JSON bundled into the build, and Cloudflare Pages serves the built
files. It replaced a Go backend for frontend on Kubernetes;
[ADR 004](../adr/004-static-vue-cloudflare-pages.md) records why.

## Components

- App: Vue 3 and Vue Router, with the routes `/` (Info), `/works` and `/live`, and a
  not-found view for any other path. The router sets each page's title and meta tags.
- Content: `web/src/data/{info,releases,live}.json`, imported by the views.
- Logic: plain JavaScript modules in `web/src/lib/`, unit-tested with Vitest.
- Styling: Tailwind CSS 4, with fonts self-hosted through Fontsource.
- Players: Bandcamp and SoundCloud iframes on the Works page, sandboxed as set in
  `web/src/lib/players.js`.

## Request flow

1. The browser fetches `index.html` and the hashed assets from Pages. A path that is not
   a file returns `index.html`, because the build has no `404.html`.
2. Vue Router renders the route, and the view reads its content from the bundled JSON.
   Content needs no network request.
3. A player iframe loads from `bandcamp.com` or `w.soundcloud.com` only after the reader
   opens that work's player. The Content-Security-Policy in `web/public/_headers`
   allows frames from those two hosts and no others.

## Delivery

Build, deploy and the Terraform that manages the Pages project, the domain and this
repository's settings are described in the [README](../../README.md#deployment). The
zone's records and settings are described in [DNS](dns.md).
