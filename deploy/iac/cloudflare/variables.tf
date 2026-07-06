variable "account_id" {
  type        = string
  description = "Cloudflare account ID that owns the Pages project. Supplied by the consuming iac/live config."
}

variable "project_name" {
  type        = string
  description = "Cloudflare Pages project name. Must match --project-name in the deploy workflows."
  default     = "ioaiaaii-net"
}

variable "production_branch" {
  type        = string
  description = "Production branch of the Pages project. Only this branch serves production; CI deploys it from git tags."
  default     = "production"
}

variable "domain" {
  type        = string
  description = "Custom domain attached to the Pages project."
  default     = "ioaiaaii.net"
}

variable "manage_domain" {
  type        = bool
  description = "Attach the custom domain. Keep false until the domain's DNS is on Cloudflare — the Pages domain attach needs it. Flip to true at cutover."
  default     = false
}
