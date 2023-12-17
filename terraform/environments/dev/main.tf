module "shared_resources" {
  source = "../shared-resources"
  stage  = "dev"
}

terraform {
  backend "s3" {
    bucket         = "personal-website-507690594547-terraform-state"
    key            = "environments/dev/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "personal-website-terraform-locks"
  }
}
