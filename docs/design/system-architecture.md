# System design

The site is a static single-page app. Nothing runs on a server: the content is JSON
compiled into the build, and Cloudflare Pages serves the files. It replaced a Go backend
on Kubernetes; [ADR 004](../adr/004-static-vue-cloudflare-pages.md) records why.

## How a page loads

1. The browser loads `index.html` and the compiled assets from Pages. Pages answers any
   path that is not a file with `index.html`, because the build has no `404.html`.
2. Vue Router picks the page (Info, Works, Live, or not found) and sets its title and
   meta tags. The page reads its text from the bundled JSON, so content needs no
   request.
3. On Works, a Bandcamp or SoundCloud player loads only when the reader opens it. The
   players run in sandboxed iframes, and the Content-Security-Policy allows frames from
   those two sites only.

## Code

- `web/src/views/`: one component per page.
- `web/src/data/`: the content.
- `web/src/lib/`: plain JavaScript logic, with unit tests.
- `web/src/assets/css/tailwind.css`: the styles, on Tailwind CSS 4. The fonts are
  self-hosted.

Deploys and Terraform are described in the [README](../../README.md#deployment), and the
zone in [DNS](dns.md).
