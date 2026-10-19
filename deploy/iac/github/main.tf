# The repo's deploy environments and rulesets.
# The Cloudflare secrets are added to each environment by hand, so none sit in state.

locals {
  # Rulesets created in the dashboard in 2024.
  main_ruleset_id            = 2385377
  tag_restriction_ruleset_id = 2358499
}

# Pushes to master deploy Pages previews (web-ci.yaml).
resource "github_repository_environment" "preview" {
  repository  = var.repository
  environment = "preview"

  deployment_branch_policy {
    protected_branches     = false
    custom_branch_policies = true
  }
}

resource "github_repository_environment_deployment_policy" "preview" {
  repository     = var.repository
  environment    = github_repository_environment.preview.environment
  branch_pattern = "master"
}

# Version tags deploy Pages production (release.yaml).
resource "github_repository_environment" "production" {
  repository  = var.repository
  environment = "production"

  deployment_branch_policy {
    protected_branches     = false
    custom_branch_policies = true
  }
}

resource "github_repository_environment_deployment_policy" "production" {
  repository  = var.repository
  environment = github_repository_environment.production.environment
  tag_pattern = "v[0-9]*"
}

# Default branch: changes through PRs, signed commits, no force push or deletion.
resource "github_repository_ruleset" "main" {
  repository  = var.repository
  name        = "main"
  target      = "branch"
  enforcement = "active"

  conditions {
    ref_name {
      include = ["~DEFAULT_BRANCH"]
      exclude = []
    }
  }

  rules {
    deletion            = true
    non_fast_forward    = true
    required_signatures = true

    pull_request {
      required_approving_review_count   = 0
      dismiss_stale_reviews_on_push     = false
      require_code_owner_review         = false
      require_last_push_approval        = false
      required_review_thread_resolution = false
      allowed_merge_methods             = ["merge", "squash", "rebase"]
    }
  }
}

import {
  to = github_repository_ruleset.main
  id = "${var.repository}:${local.main_ruleset_id}"
}

# All tags: only repo admins may create, move or delete them, and they must be signed.
resource "github_repository_ruleset" "tag_restriction" {
  repository  = var.repository
  name        = "tag-restriction"
  target      = "tag"
  enforcement = "active"

  conditions {
    ref_name {
      include = ["~ALL"]
      exclude = []
    }
  }

  bypass_actors {
    actor_id    = 5 # repository admin role
    actor_type  = "RepositoryRole"
    bypass_mode = "always"
  }

  rules {
    creation            = true
    update              = true
    deletion            = true
    non_fast_forward    = true
    required_signatures = true
  }
}

import {
  to = github_repository_ruleset.tag_restriction
  id = "${var.repository}:${local.tag_restriction_ruleset_id}"
}
