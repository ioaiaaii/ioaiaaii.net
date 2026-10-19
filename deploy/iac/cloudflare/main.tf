locals {
  pages_host = "${cloudflare_pages_project.site.name}.pages.dev"
  zone_id    = var.manage_domain ? data.cloudflare_zone.site[0].id : null
}

# The site: Pages project, custom domain, apex and www records.
# Zone settings live in micro-infra, iac/live/cloudflare/zones/<domain>.

# Deploys come from CI (wrangler pages deploy), not Git integration.
resource "cloudflare_pages_project" "site" {
  account_id        = var.account_id
  name              = var.project_name
  production_branch = var.production_branch
}

# Below needs the zone on this account, so it's behind manage_domain.

# The zone is managed by micro-infra's dns unit.
data "cloudflare_zone" "site" {
  count = var.manage_domain ? 1 : 0
  filter = {
    name    = var.domain
    account = { id = var.account_id }
  }
}

# Custom domain for the project.
resource "cloudflare_pages_domain" "site" {
  count        = var.manage_domain ? 1 : 0
  account_id   = var.account_id
  project_name = cloudflare_pages_project.site.name
  name         = var.domain
}

# Apex to the Pages project (CNAME, flattened by Cloudflare).
resource "cloudflare_dns_record" "apex" {
  count   = var.manage_domain ? 1 : 0
  zone_id = local.zone_id
  name    = "@"
  type    = "CNAME"
  content = local.pages_host
  proxied = true
  ttl     = 1 # automatic
}

# Proxied, so the zone's redirect rule sends www to the apex.
resource "cloudflare_dns_record" "www" {
  count   = var.manage_domain ? 1 : 0
  zone_id = local.zone_id
  name    = "www"
  type    = "CNAME"
  content = var.domain
  proxied = true
  ttl     = 1 # automatic
}
