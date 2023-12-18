variable "project-name" { description = "Project name" }
variable "stage" { description = "Stage (dev, prod)" }
variable "region" { description = "AWS region" }
variable "domain_name" { description = "Domain name" }

/* Secrets */
variable "nextauth_url" { description = "NEXTAUTH_URL" }
variable "nextauth_secret" { description = "NEXTAUTH_SECRET" }
variable "next_public_url" { description = "NEXT_PUBLIC_URL" }
variable "plausible_api_key" { description = "PLAUSIBLE_API_KEY" }
variable "database_url" { description = "DATABASE_URL" }
variable "direct_url" { description = "DIRECT_URL" }
variable "edge_config" { description = "EDGE_CONFIG" }
variable "admin_email" { description = "ADMIN_EMAIL" }
variable "github_client_id" { description = "GITHUB_CLIENT_ID" }
variable "github_client_secret" { description = "GITHUB_CLIENT_SECRET" }
variable "openai_api_key" { description = "OPENAI_API_KEY" }
