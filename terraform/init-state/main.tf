terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {}
}

provider "aws" {
  region = var.region
}

data "aws_caller_identity" "current" {}

resource "aws_resourcegroups_group" "resource_group" {
  name = var.project-name

  resource_query {
    query = jsonencode({
      ResourceTypeFilters = ["AWS::AllSupported"]
      TagFilters = [
        {
          Key    = "awsApplication"
          Values = [var.common_tags["awsApplication"]]
        }
      ]
    })
  }

  tags = {
    awsApplication = "${var.project-name}-group"
  }
}

# Route 53 Hosted Zone
# Creates a Route 53 hosted zone for the domain name 'jedwards.cc'. This hosted zone is used to
# manage DNS records for the domain.
resource "aws_route53_zone" "main" {
  name = var.domain_name
  tags = var.common_tags
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = local.bucket_name
  tags   = var.common_tags

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = local.dynamodb_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  tags         = var.common_tags

  attribute {
    name = "LockID"
    type = "S"
  }
}
