# Route 53 Hosted Zone
# Creates a Route 53 hosted zone for the domain name 'lanecontrols.net'. This hosted zone is used to
# manage DNS records for the domain.
resource "aws_route53_zone" "main" {
  name = "jedwards.cc"
  tags = local.common_tags
}

# Request a new ACM certificate
resource "aws_acm_certificate" "cert" {
  domain_name       = "test.jedwards.cc"
  validation_method = "DNS"
  tags              = local.common_tags
}

# Validate the ACM certificate
resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_acm_certificate.cert.domain_validation_options : record.resource_record_name]
}

# Build VPC
# Creates a new Virtual Private Cloud (VPC) to provide a logically isolated section of the AWS cloud 
# where you can launch AWS resources in a defined virtual network.
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags                 = local.common_tags
}

# Build Subnets
# Creates subnets within the VPC. Each subnet is a range of IP addresses in the VPC 
# where you can launch AWS resources, such as EC2 instances.
resource "aws_subnet" "subnet1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.region}a"
  tags              = local.common_tags
}

resource "aws_subnet" "subnet2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${var.region}b"
  tags              = local.common_tags
}

# Build Internet Gateway
# Attaches an Internet Gateway to your VPC, enabling communication between resources in your VPC and the internet.
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags   = local.common_tags
}

# Build Route Table
# Creates a route table for your VPC. This route table contains a set of rules, called routes, 
# that determine where network traffic from your VPC is directed.
resource "aws_route_table" "main" {
  vpc_id = aws_vpc.main.id
  tags   = local.common_tags

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  route {
    cidr_block = "10.0.0.0/16"
    gateway_id = "local"
  }
}

# Associate Subnet with Route Table
# Associates your subnets with the route table. This association ensures that the routing rules 
# in the route table apply to the network traffic from these subnets.
resource "aws_route_table_association" "subnet1_association" {
  subnet_id      = aws_subnet.subnet1.id
  route_table_id = aws_route_table.main.id
}

resource "aws_route_table_association" "subnet2_association" {
  subnet_id      = aws_subnet.subnet2.id
  route_table_id = aws_route_table.main.id
}

# Build Security Group
# Defines a security group for your VPC, which acts as a virtual firewall to control inbound and outbound traffic.
resource "aws_security_group" "main" {
  vpc_id = aws_vpc.main.id
  tags   = local.common_tags

  # Allow inbound HTTP traffic on port 80
  ingress {
    description = "Allow inbound HTTP traffic"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  # Allow inbound HTTP traffic on port 443
  ingress {
    description = "Allow inbound HTTPS traffic"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow inbound traffic on port 3000 within the security group
  ingress {
    description = "Allow inbound traffic on port 3000 within the security group"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    self        = true
  }

  # Default outbound rule to allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Build Application Load Balancer
# Creates an ALB that distributes incoming application traffic across multiple targets, 
# such as ECS tasks, in multiple Availability Zones. 
resource "aws_lb" "main" {
  name                       = local.name
  internal                   = false
  load_balancer_type         = "application"
  security_groups            = [aws_security_group.main.id]
  subnets                    = [aws_subnet.subnet1.id, aws_subnet.subnet2.id]
  enable_deletion_protection = false
  tags                       = local.common_tags
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = "80"
  protocol          = "HTTP"
  tags              = local.common_tags

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_target_group" "https" {
  name        = local.target_group_name
  port        = 443
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"
  tags        = local.common_tags
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate_validation.cert.certificate_arn
  tags              = local.common_tags

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.https.arn
  }
}
