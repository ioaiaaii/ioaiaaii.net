output "project_name" {
  description = "Cloudflare Pages project name."
  value       = cloudflare_pages_project.site.name
}

output "pages_subdomain" {
  description = "Default *.pages.dev host for the project."
  value       = "${cloudflare_pages_project.site.name}.pages.dev"
}

output "custom_domain" {
  description = "Custom domain attached to the project (null until manage_domain = true)."
  value       = var.manage_domain ? cloudflare_pages_domain.site[0].name : null
}
