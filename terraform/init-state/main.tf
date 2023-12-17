terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

data "aws_caller_identity" "current" {}

variable "common_tags" {
  description = "Common tags to be applied to all resources"
  type        = map(string)
  default = {
    awsApplication = "personal-website"
  }
}

variable "project-name" {
  description = "Project name"
  default     = "personal-website"
}

locals {
  bucket_name         = "${var.project-name}-${data.aws_caller_identity.current.account_id}-terraform-state"
  dynamodb_table_name = "${var.project-name}-terraform-locks"
}

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
