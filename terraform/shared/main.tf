provider "aws" {
  region = var.region
}

# Build Resource Group
# Creates an AWS Resource Group to organize and manage AWS resources based on specific criteria, such as tags.
resource "aws_resourcegroups_group" "resource_group" {
  name = "${var.project-name}-${var.stage}"

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
    awsApplication = "${var.project-name}"
  }
}

resource "aws_iam_policy" "secrets_access" {
  name        = "secrets_access"
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
  name        = "${var.project-name}-${var.stage}-nextauth_url"
  description = "NEXTAUTH_URL for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "nextauth_url_version" {
  secret_id     = aws_secretsmanager_secret.nextauth_url.id
  secret_string = "http://localhost:3000"
}

# NEXTAUTH_SECRET
resource "aws_secretsmanager_secret" "nextauth_secret" {
  name        = "${var.project-name}-${var.stage}-nextauth_secret"
  description = "NEXTAUTH_SECRET for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "nextauth_secret_version" {
  secret_id     = aws_secretsmanager_secret.nextauth_secret.id
  secret_string = "abc"
}

# NEXT_PUBLIC_URL
resource "aws_secretsmanager_secret" "next_public_url" {
  name        = "${var.project-name}-${var.stage}-next_public_url"
  description = "NEXT_PUBLIC_URL for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "next_public_url_version" {
  secret_id     = aws_secretsmanager_secret.next_public_url.id
  secret_string = "http://localhost:3000"
}

# PLAUSIBLE_API_KEY
resource "aws_secretsmanager_secret" "plausible_api_key" {
  name        = "${var.project-name}-${var.stage}-plausible_api_key"
  description = "PLAUSIBLE_API_KEY for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "plausible_api_key_version" {
  secret_id     = aws_secretsmanager_secret.plausible_api_key.id
  secret_string = "abc"
}

# DATABASE_URL
resource "aws_secretsmanager_secret" "database_url" {
  name        = "${var.project-name}-${var.stage}-database_url"
  description = "DATABASE_URL for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "database_url_version" {
  secret_id     = aws_secretsmanager_secret.database_url.id
  secret_string = "abc"
}

# DIRECT_URL
resource "aws_secretsmanager_secret" "direct_url" {
  name        = "${var.project-name}-${var.stage}-direct_url"
  description = "DIRECT_URL for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "direct_url_version" {
  secret_id     = aws_secretsmanager_secret.direct_url.id
  secret_string = "abc"
}

# EDGE_CONFIG
resource "aws_secretsmanager_secret" "edge_config" {
  name        = "${var.project-name}-${var.stage}-edge_config"
  description = "EDGE_CONFIG for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "edge_config_version" {
  secret_id     = aws_secretsmanager_secret.edge_config.id
  secret_string = "abc"
}

# ADMIN_EMAIL
resource "aws_secretsmanager_secret" "admin_email" {
  name        = "${var.project-name}-${var.stage}-admin_email"
  description = "ADMIN_EMAIL for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "admin_email_version" {
  secret_id     = aws_secretsmanager_secret.admin_email.id
  secret_string = "abc"
}

# GITHUB_CLIENT_ID
resource "aws_secretsmanager_secret" "github_client_id" {
  name        = "${var.project-name}-${var.stage}-github_client_id"
  description = "GITHUB_CLIENT_ID for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "github_client_id_version" {
  secret_id     = aws_secretsmanager_secret.github_client_id.id
  secret_string = "abc"
}

# GITHUB_CLIENT_SECRET
resource "aws_secretsmanager_secret" "github_client_secret" {
  name        = "${var.project-name}-${var.stage}-github_client_secret"
  description = "GITHUB_CLIENT_SECRET for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "github_client_secret_version" {
  secret_id     = aws_secretsmanager_secret.github_client_secret.id
  secret_string = "abc"
}

# OPENAI_API_KEY
resource "aws_secretsmanager_secret" "openai_api_key" {
  name        = "${var.project-name}-${var.stage}-openai_api_key"
  description = "OPENAI_API_KEY for your application"
  tags        = local.common_tags
}

resource "aws_secretsmanager_secret_version" "openai_api_key_version" {
  secret_id     = aws_secretsmanager_secret.openai_api_key.id
  secret_string = "abc"
}
