# ADR 005: Serve the site at ioannissavvaidis.com, registered at Cloudflare

## Status

Accepted, 2026-10-19. Supersedes [ADR 001](001-domain-registration.md).

## Context

The site was served at `ioaiaaii.net`, registered at Squarespace (ADR 001). A renewal
went unpaid, and by October 2026 the registry listed the domain as `client hold`, so it
no longer resolved. RDAP on 2026-10-18 showed the registration itself running until
2027-10-07.

The handle `ioaiaaii` also identifies the engineering work (GitHub and the SRE blog). The
site presents the composer, Ioannis Savvaidis.

The site has run on Cloudflare Pages since ADR 004, and its DNS was already on
Cloudflare.

## Options considered

- Restore `ioaiaaii.net` by settling the renewal with Squarespace. Existing links keep
  working. The registrar stays outside the account that serves the site, and the name
  stays tied to the engineering handle.
- Register `ioannissavvaidis.com` at Cloudflare Registrar. The name matches the
  composer, and the registration, DNS, TLS and hosting sit in one Cloudflare account.
  Links to `ioaiaaii.net` stop reaching the site.

## Decision

Register `ioannissavvaidis.com` at Cloudflare Registrar and serve the site there. The
domain was registered on 2026-10-19 and went live the same day with release `v3.1.0`.

## Consequences

- The registration, DNS, certificates and hosting share one Cloudflare account, so the
  security of that account (two-factor authentication, token scope) protects the domain
  too.
- Auto-renew is a dashboard setting. The Cloudflare Terraform provider has no resource
  for the registration.
- The zone settings (DNSSEC, CAA, the records for a domain that sends no email, HTTPS
  and TLS, the `www` redirect) are Terraform units in micro-infra. `deploy/iac/cloudflare`
  attaches the domain to the Pages project.
- The address is written in `web/src/router/index.js`, `web/index.html`,
  `web/public/robots.txt` and `web/public/sitemap.xml`. `web/src/router/index.test.js`
  fails if they disagree.
- The Pages address `ioaiaaii-net.pages.dev` sends `X-Robots-Tag: noindex`, so search engines index only
  the new domain.
- Nothing redirects from `ioaiaaii.net` while the registry lists it as `client hold`.

## References

- Cloudflare Registrar: <https://developers.cloudflare.com/registrar/>
- RDAP for `ioaiaaii.net`: <https://rdap.verisign.com/com/v1/domain/ioaiaaii.net>
- DNS: [dns.md](../design/dns.md)
