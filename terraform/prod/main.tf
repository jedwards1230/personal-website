terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {}
}

module "infra" {
  source       = "../shared"
  stage        = var.stage
  project-name = var.project-name
  region       = var.region
  domain_name  = var.domain_name

  nextauth_url         = var.nextauth_url
  nextauth_secret      = var.nextauth_secret
  next_public_url      = var.next_public_url
  plausible_api_key    = var.plausible_api_key
  database_url         = var.database_url
  direct_url           = var.direct_url
  edge_config          = var.edge_config
  admin_email          = var.admin_email
  github_client_id     = var.github_client_id
  github_client_secret = var.github_client_secret
  openai_api_key       = var.openai_api_key
}
