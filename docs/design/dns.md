# DNS

The domain `ioannissavvaidis.com` is a Cloudflare full-setup zone, registered at Cloudflare
Registrar and served by `miki.ns.cloudflare.com` and `weston.ns.cloudflare.com`.
Terraform manages every record. The two site records come from `deploy/iac/cloudflare`
in this repository; the zone and the remaining records come from the `dns` unit in
micro-infra (`iac/live/cloudflare/zones/ioannissavvaidis.com/dns`).

## Records

| Name           | Type  | Content                                            | Proxied | Terraform               |
| -------------- | ----- | -------------------------------------------------- | ------- | ----------------------- |
| `@`            | CNAME | `ioaiaaii-net.pages.dev`                           | yes     | `deploy/iac/cloudflare` |
| `www`          | CNAME | `ioannissavvaidis.com`                             | yes     | `deploy/iac/cloudflare` |
| `@`            | CAA   | `0 issue` `letsencrypt.org`, `pki.goog`, `ssl.com` | no      | micro-infra `dns`       |
| `@`            | MX    | `0 .`                                              | no      | micro-infra `dns`       |
| `@`            | TXT   | `v=spf1 -all`                                      | no      | micro-infra `dns`       |
| `*._domainkey` | TXT   | `v=DKIM1; p=`                                      | no      | micro-infra `dns`       |
| `_dmarc`       | TXT   | `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s`   | no      | micro-infra `dns`       |

## Site hostnames

The apex and `www` records are _proxied_: Cloudflare answers queries for them with the
addresses of its own edge instead of the record content, and every request to the site
passes through Cloudflare before Pages serves it. On 2026-10-19 both names resolved to
`104.21.34.136` and `172.67.161.134`, plus two IPv6 addresses, with a TTL of 300 s.
See [Proxy status](https://developers.cloudflare.com/dns/proxy-status/).

A CNAME at the apex conflicts with RFC 1034 §3.6.2, which allows no other data at a name
that has a CNAME, and the apex carries the SOA and NS records. Cloudflare stores the
record and answers with addresses, a behaviour it calls
[CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/). The
dashboard therefore shows a CNAME, and resolvers receive A and AAAA records.

The zone settings that apply to proxied requests are in micro-infra:

- The `ssl-tls` unit turns on Always Use HTTPS, which answers `http://` requests with a 301 to
  `https://`, and sets TLS 1.2 as the minimum version with TLS 1.3 on.
- The `rules` unit contains the redirect rule that answers requests to `www` with a 301 to the
  apex, keeping the path and query.

## Certificate authorities

The CAA records ([RFC 8659](https://www.rfc-editor.org/rfc/rfc8659)) list the
certificate authorities that may issue for the domain: Let's Encrypt (`letsencrypt.org`),
Google Trust Services (`pki.goog`) and SSL.com (`ssl.com`), the authorities Cloudflare
uses for its certificates. When a zone on Cloudflare DNS has CAA records, Cloudflare
adds records for its own authorities to the answer
([SSL FAQ](https://developers.cloudflare.com/ssl/faq/#caa-records)). Resolvers
therefore also receive `comodoca.com` and `digicert.com`, and an `issuewild` record for
each authority. The added records appear in neither Terraform nor the dashboard.

## Email

The domain sends and receives no email, and its records state that to receiving mail
servers:

- The MX record `0 .` is a _null MX_: the domain accepts no mail
  ([RFC 7505](https://www.rfc-editor.org/rfc/rfc7505)).
- The SPF record `v=spf1 -all` authorizes no host to send mail as the domain
  ([RFC 7208](https://www.rfc-editor.org/rfc/rfc7208)).
- The wildcard `*._domainkey` answers every DKIM selector with an empty `p=`, which
  RFC 6376 §3.6.1 defines as a revoked key, so no DKIM signature for the domain
  verifies.
- The DMARC record publishes a `reject` policy for mail that fails DMARC, with strict
  SPF and DKIM alignment. `sp=reject` extends the policy to subdomains; with no `np`
  tag, it also applies to subdomains that do not exist
  ([RFC 9989](https://www.rfc-editor.org/rfc/rfc9989)).

## DNSSEC

The `dns` unit turns on DNSSEC (`cloudflare_zone_dnssec`). Cloudflare signs the zone
with algorithm 13, ECDSA P-256 with SHA-256. For a domain on Cloudflare Registrar,
Cloudflare publishes the DS record at the `.com` registry through CDS/CDNSKEY scanning,
which it documents as taking one to two days
([DNSSEC](https://developers.cloudflare.com/dns/dnssec/)). Until the DS record is
published, resolvers do not validate the zone, Cloudflare reports the DNSSEC status as
`pending`, and `terragrunt plan` in the `dns` unit shows `status = "pending" -> "active"`.
That diff clears without an apply once the DS record is published.

## Verify

The DS record at the registry; the output is empty until Cloudflare publishes it:

```shell
dig +short DS ioannissavvaidis.com @a.gtld-servers.net
```

DNSSEC validation; once the DS record is published, the header flags include `ad`:

```shell
dig +dnssec ioannissavvaidis.com @1.1.1.1
```

The `www` redirect:

```shell
curl -sI https://www.ioannissavvaidis.com/live
```

```text
HTTP/2 301
location: https://ioannissavvaidis.com/live
```
