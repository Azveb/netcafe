#!/bin/bash
set -e

echo "🚀 Starting deployment..."

if [ ! -f .env ]; then
    echo "❌ .env file not found"
    exit 1
fi

source .env

echo "📦 Creating database backup..."
docker-compose exec -T postgres pg_dump -U $DB_USERNAME $DB_DATABASE > backup_$(date +%Y%m%d_%H%M%S).sql

echo "📥 Pulling latest images..."
docker-compose pull

echo "🚀 Deploying services..."
docker-compose up -d --remove-orphans

sleep 10

echo "🔄 Running database migrations..."
docker-compose exec -T backend npm run migrate:deploy

echo "🗑️ Clearing cache..."
docker-compose exec -T backend npm run cache:clear

echo "🔍 Checking services..."
if curl -f http://localhost:3001/api/health; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend health check failed"
    exit 1
fi

if curl -f http://localhost:3000; then
    echo "✅ Frontend is healthy"
else
    echo "❌ Frontend health check failed"
    exit 1
fi

echo "✅ Deployment completed successfully!"