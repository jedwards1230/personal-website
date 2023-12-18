# Build ECS Task Execution Role
# Creates an IAM role that grants the ECS tasks permissions to make AWS API calls on your behalf.
# This role is used by ECS tasks to interact with other AWS services such as ECR for image pulling 
# and CloudWatch for logging.
resource "aws_iam_role" "task_execution" {
  name = local.executor_role_name
  tags = local.common_tags

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  # Attach additional policy for logs:CreateLogGroup permission
  inline_policy {
    name = "ecsTaskExecutionRole-InlinePolicy"
    policy = jsonencode({
      Version = "2012-10-17",
      Statement = [
        {
          Action   = "logs:CreateLogGroup",
          Effect   = "Allow",
          Resource = "*"
        }
      ]
    })
  }
}

# Attach AmazonECSTaskExecutionRolePolicy to ECS Task Execution Role
# Associates a predefined AWS policy (AmazonECSTaskExecutionRolePolicy) with the ECS Task Execution Role. 
# This policy provides the necessary permissions for the ECS tasks to interact with AWS services needed 
# during task execution, such as pulling images from ECR and sending logs to CloudWatch.
resource "aws_iam_role_policy_attachment" "attach_policy" {
  role       = aws_iam_role.task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "secrets_access_attachment" {
  role       = aws_iam_role.task_execution.name
  policy_arn = aws_iam_policy.secrets_access.arn
}
