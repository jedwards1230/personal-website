#!/bin/bash

# Check if terraform is installed
if ! command -v terraform &> /dev/null
then
    echo "Terraform could not be found. Please install Terraform to proceed."
    exit
fi

# Define the base directory where init-state, dev, and prod directories are located
BASE_DIR="$(dirname $(realpath $0))"

source .env

# Function to check if infrastructure is initialized and get outputs
# Arguments:
#   $1: The name of the directory to check
check_infra() {
    if [ -d "$BASE_DIR/$1" ]; then
        cd "$BASE_DIR/$1"
        local state_list=$(terraform state list)
        if [ $? -eq 0 ] && [ ! -z "$state_list" ]; then
            echo "The infrastructure in the $1 directory is initialized."
            if [ "$1" = "init-state" ]; then
                export S3_BUCKET_NAME=$(terraform output -raw s3_bucket_name)
                export DYNAMODB_TABLE_NAME=$(terraform output -raw dynamodb_table_name)
            fi
            return 0
        else
            echo "The infrastructure in the $1 directory is NOT initialized."
            return 1
        fi
    else
        echo "The directory $1 does not exist. Please create it and try again."
        return 2
    fi
}

# Function to initialize infrastructure
# Arguments:
#   $1: The name of the directory to initialize
#   $2: The path to the Terraform state file
#   $3: The name of the S3 bucket
#   $4: The name of the DynamoDB table
init_infra() {
    cd $1
    echo "Initializing infrastructure in the $1 directory..."
    terraform init \
        -backend-config "key=$2" \
        -backend-config="region=$AWS_REGION" \
        -backend-config="bucket=$3" \
        -backend-config="dynamodb_table=$4"
    echo "Infrastructure initialized successfully."
}

# Function to apply terraform configuration
# Arguments:
#   $1: The name of the directory to apply the configuration to
#   $2: The name of the .tfvars file (without the .tfvars extension)
apply_infra() {
    cd $1
    echo "Applying Terraform configuration in the $1 directory..."
    if [ -f "$2.tfvars" ]; then
        terraform apply -var-file="$2.tfvars"
    else
        terraform apply
    fi
    echo "Terraform configuration applied successfully."
}

# Function to destroy terraform infrastructure
# Arguments:
#   $1: The name of the directory to destroy the infrastructure in
destroy_infra() {
    cd $1
    echo "Destroying infrastructure in the $1 directory..."
    terraform destroy
    echo "Infrastructure destroyed successfully."
}

# Check the initialization status of each environment
echo "Checking initialization status of each environment..."
echo
check_infra init-state
check_infra dev &
check_infra prod &
wait
echo

# Function to manage environment
# Arguments:
#   $1: The name of the environment to manage
#   $2: The path to the Terraform state file
#   $3: The name of the S3 bucket
#   $4: The name of the DynamoDB table
manage_env() {
    echo "Managing $1 environment..."
    echo "Select an action: "
    echo "1. init - Initialize the infrastructure"
    echo "2. apply - Apply the Terraform configuration"
    echo "3. destroy - Destroy the infrastructure"
    read action
    echo
    case $action in
        1)
            init_infra $1 $2 $3 $4
            ;;
        2)
            apply_infra $1 $1
            ;;
        3)
            destroy_infra $1
            ;;
        *)
            echo "Invalid action. Please select either '1', '2', or '3'."
            ;;
    esac
    echo
}

# Manage environments
while true; do
    cd $BASE_DIR
    echo "Select environment to manage: "
    echo "1. init-state - Initialize the state"
    echo "2. dev - Manage the development environment"
    echo "3. prod - Manage the production environment"
    echo "4. exit - Exit the script"
    read env
    echo

    case $env in
        1)
            manage_env init-state $STATE_PATH_INIT $S3_BUCKET_NAME_INIT $DYNAMODB_TABLE_NAME_INIT
            ;;
        2)
            manage_env dev "env/dev/terraform.tfstate" $S3_BUCKET_NAME $DYNAMODB_TABLE_NAME
            ;;
        3)
            manage_env prod "env/prod/terraform.tfstate" $S3_BUCKET_NAME $DYNAMODB_TABLE_NAME
            ;;
        4)
            echo "Exiting the script. Goodbye!"
            break
            ;;
        *)
            echo "Invalid environment. Please select either '1', '2', '3', or '4'."
            ;;
    esac
done