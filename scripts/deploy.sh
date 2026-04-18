#!/bin/sh
set -e

echo "🚀 Starting deployment..."

cd /root/savar-science-society

echo "📦 Pulling latest code from GitHub..."
git pull origin main

echo "🔨 Building Docker containers..."
docker compose build --no-cache

echo "🔄 Restarting containers..."
docker compose down
docker compose up -d

echo "⏳ Waiting for containers to start..."
sleep 10

echo "🗄️ Running database migrations..."
docker compose exec app node /app/node_modules/prisma/build/index.js db push

echo "✅ Deployment complete!"
echo "🌐 Site is live at https://www.savar-science-society.com"
