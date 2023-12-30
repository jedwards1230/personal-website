terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }

    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.2"
    }
  }
}

provider "aws" {
  region = var.region
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# Build Resource Group
# Creates an AWS Resource Group to organize and manage AWS resources based on specific criteria, such as tags.
resource "aws_resourcegroups_group" "resource_group" {
  name = local.name

  resource_query {
    query = jsonencode({
      ResourceTypeFilters = ["AWS::AllSupported"]
      TagFilters = [
        {
          Key    = "awsApplication"
          Values = [local.common_tags["awsApplication"]]
        }
      ]
    })
  }

  tags = {
    awsApplication = var.project-name
  }
}

resource "aws_iam_policy" "secrets_access" {
  name        = "${local.name}-secrets-access"
  description = "Allow ECS tasks to access secrets"
  tags        = local.common_tags

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret"
        ],
        Effect = "Allow",
        Resource = [
          aws_secretsmanager_secret.nextauth_url.arn,
          aws_secretsmanager_secret.nextauth_secret.arn,
          aws_secretsmanager_secret.next_public_url.arn,
          aws_secretsmanager_secret.plausible_api_key.arn,
          aws_secretsmanager_secret.database_url.arn,
          aws_secretsmanager_secret.direct_url.arn,
          aws_secretsmanager_secret.edge_config.arn,
          aws_secretsmanager_secret.admin_email.arn,
          aws_secretsmanager_secret.github_client_id.arn,
          aws_secretsmanager_secret.github_client_secret.arn,
          aws_secretsmanager_secret.openai_api_key.arn
        ]
      }
    ]
  })
}

# Create Secrets Manager
# NEXTAUTH_URL
resource "aws_secretsmanager_secret" "nextauth_url" {
  name        = "${local.name}-nextauth_url"
  description = "NEXTAUTH_URL for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "nextauth_url_version" {
  secret_id     = aws_secretsmanager_secret.nextauth_url.id
  secret_string = var.nextauth_url
}

# NEXTAUTH_SECRET
resource "aws_secretsmanager_secret" "nextauth_secret" {
  name        = "${local.name}-nextauth_secret"
  description = "NEXTAUTH_SECRET for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "nextauth_secret_version" {
  secret_id     = aws_secretsmanager_secret.nextauth_secret.id
  secret_string = var.nextauth_secret
}

# NEXT_PUBLIC_URL
resource "aws_secretsmanager_secret" "next_public_url" {
  name        = "${local.name}-next_public_url"
  description = "NEXT_PUBLIC_URL for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "next_public_url_version" {
  secret_id     = aws_secretsmanager_secret.next_public_url.id
  secret_string = var.next_public_url
}

# PLAUSIBLE_API_KEY
resource "aws_secretsmanager_secret" "plausible_api_key" {
  name        = "${local.name}-plausible_api_key"
  description = "PLAUSIBLE_API_KEY for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "plausible_api_key_version" {
  secret_id     = aws_secretsmanager_secret.plausible_api_key.id
  secret_string = var.plausible_api_key
}

# DATABASE_URL
resource "aws_secretsmanager_secret" "database_url" {
  name        = "${local.name}-database_url"
  description = "DATABASE_URL for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "database_url_version" {
  secret_id     = aws_secretsmanager_secret.database_url.id
  secret_string = var.database_url
}

# DIRECT_URL
resource "aws_secretsmanager_secret" "direct_url" {
  name        = "${local.name}-direct_url"
  description = "DIRECT_URL for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "direct_url_version" {
  secret_id     = aws_secretsmanager_secret.direct_url.id
  secret_string = var.direct_url
}

# EDGE_CONFIG
resource "aws_secretsmanager_secret" "edge_config" {
  name        = "${local.name}-edge_config"
  description = "EDGE_CONFIG for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "edge_config_version" {
  secret_id     = aws_secretsmanager_secret.edge_config.id
  secret_string = var.edge_config
}

# ADMIN_EMAIL
resource "aws_secretsmanager_secret" "admin_email" {
  name        = "${local.name}-admin_email"
  description = "ADMIN_EMAIL for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "admin_email_version" {
  secret_id     = aws_secretsmanager_secret.admin_email.id
  secret_string = var.admin_email
}

# GITHUB_CLIENT_ID
resource "aws_secretsmanager_secret" "github_client_id" {
  name        = "${local.name}-github_client_id"
  description = "GITHUB_CLIENT_ID for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "github_client_id_version" {
  secret_id     = aws_secretsmanager_secret.github_client_id.id
  secret_string = var.github_client_id
}

# GITHUB_CLIENT_SECRET
resource "aws_secretsmanager_secret" "github_client_secret" {
  name        = "${local.name}-github_client_secret"
  description = "GITHUB_CLIENT_SECRET for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "github_client_secret_version" {
  secret_id     = aws_secretsmanager_secret.github_client_secret.id
  secret_string = var.github_client_secret
}

# OPENAI_API_KEY
resource "aws_secretsmanager_secret" "openai_api_key" {
  name        = "${local.name}-openai_api_key"
  description = "OPENAI_API_KEY for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "openai_api_key_version" {
  secret_id     = aws_secretsmanager_secret.openai_api_key.id
  secret_string = var.openai_api_key
}
