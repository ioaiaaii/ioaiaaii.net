# ADR 001: Squarespace for domain registration

## Status

Superseded on 2026-10-19 by [ADR 005](005-domain-ioannissavvaidis-com.md): the site moved
to `ioannissavvaidis.com`, registered at Cloudflare Registrar.

## Context

The site needed a registrar for `ioaiaaii.net`.

## Options considered

- Squarespace: domain registration and DNS management, with free WHOIS privacy. Google
  Domains registrations were moving to Squarespace at the time.
- Google Domains: integration with GCP and transparent pricing. Its registrations were
  being transferred to Squarespace, which made its long-term support uncertain.
- Namecheap and GoDaddy: comparable registration services, with more features than the
  site needed and upselling of additional services.

## Decision

Register `ioaiaaii.net` at Squarespace and manage its DNS there for one year, then
re-evaluate.

## Consequences

- Setup is fast, the pricing is clear, and WHOIS privacy is free.
- Squarespace offers fewer DNS features than other registrars; they covered the site's
  needs at the time.
