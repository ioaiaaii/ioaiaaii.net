variable "account_id" {
  type        = string
  description = "Cloudflare account ID that owns the Pages project. Supplied by the consuming iac/live config."
}

variable "project_name" {
  type        = string
  description = "Cloudflare Pages project name. Must match --project-name in the deploy workflows."
  default     = "ioaiaaii-net"

  validation {
    condition     = can(regex("^[a-z0-9][a-z0-9-]{0,57}$", var.project_name))
    error_message = "A Pages project name is lowercase letters, digits and dashes, at most 58 characters, starting with a letter or digit."
  }
}

variable "production_branch" {
  type        = string
  description = "The --branch label Cloudflare Pages treats as production, matched exactly (no wildcards). The tag release workflow deploys with --branch=production, so tags serve production; master and every other branch fall through to preview. This is a Pages label, not a real git branch."
  default     = "production"

  validation {
    # master deploys previews; Pages matches this label exactly.
    condition     = var.production_branch != "master" && !strcontains(var.production_branch, "*")
    error_message = "production_branch must be the exact label release.yaml deploys with (production), not master and not a wildcard."
  }
}

variable "domain" {
  type        = string
  description = "Custom domain attached to the Pages project, its apex. www redirects to it."
  default     = "ioannissavvaidis.com"

  validation {
    condition     = can(regex("^([a-z0-9]([a-z0-9-]*[a-z0-9])?\\.)+[a-z]{2,}$", var.domain)) && !startswith(var.domain, "www.")
    error_message = "domain must be a lowercase apex domain such as ioannissavvaidis.com, without a scheme, www or trailing dot."
  }
}

variable "manage_domain" {
  type        = bool
  description = "Attach the custom domain and create its apex and www DNS records. Keep false until the domain's zone is on this Cloudflare account (registering it at Cloudflare Registrar does that). Flip to true at cutover. The zone-wide settings (DNSSEC, TLS, the redirect from www) come from micro-infra's iac/live/cloudflare/zones/<domain> units."
  default     = false
}
