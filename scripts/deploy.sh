#!/usr/bin/env bash

# Exit on error, undefined variables, and pipe failures
set -Eeuo pipefail

# Configuration
PROJECT_DIR="/root/savar-science-society"
APP_NAME="sss_app"

# Log message function
log() {
    echo -e "\033[1;32m[DEPLOY] $1\033[0m"
}

# 1. CD to project directory
log "Navigating to project directory..."
cd "$PROJECT_DIR"

# 2. Update code from GitHub
log "Fetching latest changes from Git..."
git fetch --all --prune
log "Resetting local branch to origin/main..."
git reset --hard origin/main

# 3. Stop current containers
log "Shutting down existing containers..."
docker compose down --remove-orphans

# 4. Build new containers
log "Building Docker images (pulling latest base and no cache)..."
docker compose build --pull --no-cache

# 5. Start containers
log "Starting containers in detached mode..."
docker compose up -d --remove-orphans

# 6. Wait for DB and App to be ready
log "Waiting 15 seconds for services to initialize..."
sleep 15

# 7. Run database migrations
log "Running Prisma database migrations..."
docker compose exec app npx prisma migrate deploy

# 8. Show status
log "Deployment complete! Current status:"
docker compose ps
