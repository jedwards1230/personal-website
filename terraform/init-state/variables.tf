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

variable "region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Domain name"
  default     = "example.com"
}

locals {
  bucket_name         = "${var.project-name}-${data.aws_caller_identity.current.account_id}-terraform-state"
  dynamodb_table_name = "${var.project-name}-terraform-locks"
}
