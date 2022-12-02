#!/bin/bash
# Path: docker-utils/portainer-linux.sh
# Description: Portainer Linux Installer



# After installing Portainer, you can access it at http://localhost:9000
# Case you want to access using wsl check this link: https://docs.portainer.io/start/install/server/docker/wsl

# Create volume for Portainer
docker volume create portainer_data

# Run Portainer
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest

