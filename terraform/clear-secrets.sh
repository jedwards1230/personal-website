#!/bin/bash

delete_all_secrets() {
    aws secretsmanager list-secrets --include-planned-deletion --query 'SecretList[].Name' --output text | tr '\t' '\n' | while IFS=' ' read -r secret_name; do
        aws secretsmanager delete-secret --secret-id "$secret_name" --force-delete-without-recovery
    done
}

delete_secrets_by_tag() {
    tag_name="$1"
    aws secretsmanager list-secrets --include-planned-deletion --query 'SecretList[?Tags[?Key==`'"$tag_name"'`]].Name' --output text | tr '\t' '\n' | while IFS=' ' read -r secret_name; do
        aws secretsmanager delete-secret --secret-id "$secret_name" --force-delete-without-recovery
    done
}

echo "Select an option:"
echo "1. Delete all secrets"
echo "2. Delete secrets by tag key"

read -p "Enter your choice: " choice

case $choice in
    1)
        delete_all_secrets
        ;;
    2)
        read -p "Enter the tag name: " tag_name
        delete_secrets_by_tag "$tag_name"
        ;;
    *)
        echo "Invalid choice"
        ;;
esac