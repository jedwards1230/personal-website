# Build ECR Repository
# Creates an Amazon Elastic Container Registry (ECR) repository.
# This repository will store Docker container images, allowing for version control and integration 
# with AWS container services like ECS.
resource "aws_ecr_repository" "main" {
  name = "personal-website"
  tags = var.common_tags
}

# Build ECS Cluster
# This cluster serves as a logical grouping of ECS tasks or services. It defines the infrastructure 
# where the tasks or services are executed. The cluster itself does not handle scaling of individual 
# tasks or services but provides the underlying compute and networking resources necessary for them.
resource "aws_ecs_cluster" "main" {
  name = "personal-website"
  tags = var.common_tags
}

# Build ECS Task Definition
# Defines a task template for running containers in the ECS Cluster. This includes container image to use, 
# CPU and memory allocations, network mode, and IAM role for execution. The task definition specifies 
# the details of how the containers should operate, including their resource requirements and networking settings.
resource "aws_ecs_task_definition" "main" {
  family                   = "personal-website"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "2048"
  execution_role_arn       = aws_iam_role.task_execution.arn
  tags                     = var.common_tags

  container_definitions = jsonencode([
    {
      name      = "personal-website",
      image     = "placeholder/image:tag",
      essential = true,
      portMappings = [
        {
          name          = "personal-website-8889-tcp",
          containerPort = 3000,
          hostPort      = 3000,
          protocol      = "tcp"
          appProtocol   = "http"
        }
      ],
      secrets = [
        {
          name      = "NEXTAUTH_URL",
          valueFrom = aws_secretsmanager_secret.nextauth_url.arn
        },
        {
          name      = "NEXTAUTH_SECRET",
          valueFrom = aws_secretsmanager_secret.nextauth_secret.arn
        },
        {
          name      = "NEXT_PUBLIC_URL",
          valueFrom = aws_secretsmanager_secret.next_public_url.arn
        },
        {
          name      = "PLAUSIBLE_API_KEY",
          valueFrom = aws_secretsmanager_secret.plausible_api_key.arn
        },
        {
          name      = "DATABASE_URL",
          valueFrom = aws_secretsmanager_secret.database_url.arn
        },
        {
          name      = "DIRECT_URL",
          valueFrom = aws_secretsmanager_secret.direct_url.arn
        },
        {
          name      = "EDGE_CONFIG",
          valueFrom = aws_secretsmanager_secret.edge_config.arn
        },
        {
          name      = "ADMIN_EMAIL",
          valueFrom = aws_secretsmanager_secret.admin_email.arn
        },
        {
          name      = "GITHUB_CLIENT_ID",
          valueFrom = aws_secretsmanager_secret.github_client_id.arn
        },
        {
          name      = "GITHUB_CLIENT_SECRET",
          valueFrom = aws_secretsmanager_secret.github_client_secret.arn
        },
        {
          name      = "OPENAI_API_KEY",
          valueFrom = aws_secretsmanager_secret.openai_api_key.arn
        },
      ],
      logConfiguration = {
        logDriver = "awslogs",
        tags      = var.common_tags
        options = {
          "awslogs-create-group"  = "true",
          "awslogs-group"         = "/ecs/personal-website",
          "awslogs-region"        = "us-east-1",
          "awslogs-stream-prefix" = "ecs",
        }
      }
    }
  ])
}

# Build ECS Service
# This service manages the deployment, scaling, and networking of the container tasks within the cluster.
# It ensures that the specified number of instances of the task definition are running and reschedules tasks 
# when a task fails (e.g., if the underlying infrastructure fails for some reason). The service also handles 
# the scaling of tasks based on the desired count and can integrate with load balancers for traffic distribution.
resource "aws_ecs_service" "main" {
  name            = "personal-website"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.main.family
  launch_type     = "FARGATE"
  desired_count   = 2
  tags            = var.common_tags

  network_configuration {
    subnets          = [aws_subnet.subnet1.id, aws_subnet.subnet2.id]
    security_groups  = [aws_security_group.main.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.main.arn
    container_name   = "personal-website"
    container_port   = 3000
  }
}