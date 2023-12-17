variable "project-name" {
  description = "Project name"
  default     = "personal-website"
}

variable "stage" {
  description = "Stage (dev, prod)"
  default     = "dev"
}

variable "region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "s3_bucket_name" {
  description = "S3 bucket name"
  default     = "terraform-state"
}

variable "dynamodb_table_name" {
  description = "DynamoDB table name"
  default     = "terraform-locks"
}

variable "repo-name" {
  description = "ECR Repo name"
  default     = "personal-website"
}

variable "cluster-name" {
  description = "ECS Cluster name"
  default     = "personal-website"
}

locals {
  name               = "${var.project-name}-${var.stage}"
  executor_role_name = "${var.project-name}-${var.stage}-ecsTaskExecutionRole"
  target_group_name  = "${var.project-name}-${var.stage}-https"

  common_tags = {
    awsApplication = "${var.project-name}-${var.stage}"
  }
}
