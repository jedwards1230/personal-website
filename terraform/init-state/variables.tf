variable "project-name" { description = "Project name" }
variable "region" { description = "AWS region" }
variable "domain_name" { description = "Domain name" }

locals {
  bucket_name         = "${var.project-name}-${data.aws_caller_identity.current.account_id}-terraform-state"
  dynamodb_table_name = "${var.project-name}-terraform-locks"

  common_tags = {
    awsApplication = var.project-name
  }
}
