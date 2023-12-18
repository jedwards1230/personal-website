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
}
