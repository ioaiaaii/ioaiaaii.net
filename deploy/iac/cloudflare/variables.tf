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
  description = "The --branch label Cloudflare Pages treats as production, matched exactly (no wildcards). The tag release workflow deploys with --branch=production, so tags serve production; master and every other branch fall through to preview. This is a Pages label, not a real git branch."
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
