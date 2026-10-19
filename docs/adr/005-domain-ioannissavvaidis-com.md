# ADR 005: Move the site to ioannissavvaidis.com, registered at Cloudflare

## Status

Accepted on 2026-10-19. Replaces [ADR 001](001-domain-registration.md).

## Context

The site was at ioaiaaii.net, registered at Squarespace (ADR 001). A renewal went unpaid,
and in October 2026 the registry suspended the domain (status client hold), so it
stopped resolving. The registration itself runs until 2027-10-07.

ioaiaaii is also the name of the engineering work, on GitHub and the SRE blog, while the
site presents the composer.

The site already ran on Cloudflare Pages (ADR 004), with its DNS on Cloudflare.

## Options considered

- Pay the renewal at Squarespace and keep ioaiaaii.net. Old links keep working, but the
  registrar stays outside the account that serves the site, and the name stays tied to
  the engineering work.
- Register ioannissavvaidis.com at Cloudflare. The name matches the composer, and the
  registration, DNS, certificates and hosting are in one account. Old links to
  ioaiaaii.net stop working.

## Decision

Register ioannissavvaidis.com at Cloudflare Registrar and serve the site there. It was
registered and went live on 2026-10-19, with release v3.1.0.

## Consequences

- The domain, DNS, certificates and hosting are in one Cloudflare account, so its
  two-factor authentication and API token scopes protect all of them.
- Auto-renew is set in the Cloudflare dashboard; the Terraform provider has no resource
  for registrations.
- The zone is managed in [micro-infra](https://github.com/ioaiaaii/micro-infra), and
  `deploy/iac/cloudflare` attaches the domain to Pages. See [DNS](../design/dns.md).
- The site address appears in `web/src/router/index.js`, `web/index.html`,
  `web/public/robots.txt` and `web/public/sitemap.xml`, and a unit test fails if they
  disagree.
- The ioaiaaii-net.pages.dev address is marked noindex, so search engines list only the
  new domain.
- Nothing redirects from ioaiaaii.net while the registry has it suspended.

## References

- [Cloudflare Registrar](https://developers.cloudflare.com/registrar/)
- [RDAP record for ioaiaaii.net](https://rdap.verisign.com/com/v1/domain/ioaiaaii.net)
