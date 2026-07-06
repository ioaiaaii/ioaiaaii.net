resource "cloudflare_pages_project" "site" {
  account_id        = var.account_id
  name              = var.project_name
  production_branch = var.production_branch
}

resource "cloudflare_pages_domain" "site" {
  count        = var.manage_domain ? 1 : 0
  account_id   = var.account_id
  project_name = cloudflare_pages_project.site.name
  name         = var.domain
}
