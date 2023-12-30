#!/bin/bash

# Function to get status message
getStatusMessage() {
    if [[ -z "$1" ]]; then
        echo "\033[31mNo image\033[0m"  # Red color for no image
    elif [[ -z "$2" ]]; then
        echo "\033[33mStopped\033[0m"  # Yellow color for stopped
    else
        echo "\033[32mRunning\033[0m"  # Green color for running
    fi
}

# Check if the Docker images exist
image_exists_personal_website=$(docker images -q personal-website)

# Check if the Docker images are running
image_running_personal_website=$(docker ps -q --filter ancestor=personal-website)

# Set a status message based on whether the images exist and are running
status_message_personal_website="Personal Website: $(getStatusMessage "$image_exists_personal_website" "$image_running_personal_website")"

echo "$status_message_personal_website"

echo "Please select an option:"
echo "1. Build: personal-website"

if [[ -z "$image_running_personal_website" ]]; then
    echo "2. Run: personal-website"
    echo "3. Run: personal-website (background)"
else
    echo "4. Stop: personal-website"
fi

read -p "Enter your choice: " choice

case $choice in
    1)
        docker build -t personal-website .
        echo "Personal Website Docker image built successfully."
        ;;
    2)
        [[ -z "$image_running_personal_website" ]] && docker run -p 3000:3000 personal-website
        ;;
    3)
        [[ -z "$image_running_personal_website" ]] && docker run -p 3000:3000 -d personal-website && echo "Personal Website Docker image running in the background."
        ;;
    4)
        [[ -n "$image_running_personal_website" ]] && docker stop $(docker ps -q --filter ancestor=personal-website) && echo "Personal Website Docker image stopped successfully."
        ;;
    *)
        echo "Invalid option."
        ;;
esac