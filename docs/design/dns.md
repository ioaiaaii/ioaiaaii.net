# DNS

ioannissavvaidis.com is registered at Cloudflare, and its DNS is hosted there too. Every
record is in Terraform: the two site records in `deploy/iac/cloudflare`, and the rest in
the dns unit of [micro-infra](https://github.com/ioaiaaii/micro-infra).

## Records

| Name           | Type  | Content                                        | Proxied |
| -------------- | ----- | ---------------------------------------------- | ------- |
| @              | CNAME | ioaiaaii-net.pages.dev                         | yes     |
| www            | CNAME | ioannissavvaidis.com                           | yes     |
| @              | CAA   | issue letsencrypt.org, pki.goog, ssl.com       | no      |
| @              | MX    | 0 .                                            | no      |
| @              | TXT   | v=spf1 -all                                    | no      |
| \*.\_domainkey | TXT   | v=DKIM1; p=                                    | no      |
| \_dmarc        | TXT   | v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s | no      |

## Proxied records

The two site records are proxied. For a proxied record, Cloudflare does not give out
the target; it answers with the addresses of its own servers, so every visitor goes
through Cloudflare, where HTTPS, the headers and the redirects apply
([proxy status](https://developers.cloudflare.com/dns/proxy-status/)).

The apex record is also a CNAME, which DNS does not allow next to the zone's SOA and NS
records (RFC 1034, section 3.6.2). Cloudflare follows it itself and answers with
addresses, which it calls
[CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/). So the
dashboard shows a CNAME, and dig shows A and AAAA records.

## Redirects and TLS

Requests over http get a 301 to https, and requests to www get a 301 to the bare domain,
keeping the path and query. TLS 1.0 and 1.1 are refused. These settings are in the
ssl-tls and rules units of micro-infra.

## Certificates

The CAA records allow Let's Encrypt, Google Trust Services and SSL.com to issue
certificates for the domain. Because the zone has CAA records, Cloudflare adds its own
certificate authorities when it answers
([SSL FAQ](https://developers.cloudflare.com/ssl/faq/#caa-records)), so dig also shows
comodoca.com and digicert.com. Those added records appear in neither Terraform nor the
dashboard.

## Email

The domain sends and receives no email, and its records say so to other mail servers:

- The MX record "0 ." is a null MX: the domain accepts no mail
  ([RFC 7505](https://www.rfc-editor.org/rfc/rfc7505)).
- The SPF record allows no server to send as the domain
  ([RFC 7208](https://www.rfc-editor.org/rfc/rfc7208)).
- Every DKIM selector returns an empty key, which counts as revoked, so no signature
  verifies (RFC 6376, section 3.6.1).
- The DMARC policy is reject, with strict alignment, for the domain and its subdomains
  ([RFC 9989](https://www.rfc-editor.org/rfc/rfc9989)).

## DNSSEC

DNSSEC is on. Cloudflare signs the zone and, because the domain is registered with
Cloudflare, publishes the DS record at the .com registry itself, which Cloudflare
documents as taking one to two days ([DNSSEC](https://developers.cloudflare.com/dns/dnssec/)).
Until then, resolvers do not check the signatures, and a plan of the dns unit shows the
status changing from pending to active. That change clears without an apply.

## Checks

The DS record at the registry, empty until it is published:

```shell
dig +short DS ioannissavvaidis.com @a.gtld-servers.net
```

The www redirect:

```shell
curl -sI https://www.ioannissavvaidis.com/live
```

```text
HTTP/2 301
location: https://ioannissavvaidis.com/live
```
