#!/bin/bash

# Render Build Script
# This script is executed during the build phase on Render
# It's an alternative to using Dockerfile if you prefer build commands

set -e  # Exit on error

echo "🚀 Starting Render build process..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps --prefer-offline

# 2. Build the API
echo "🔨 Building API application..."
cd apps/api
npx webpack-cli build --node-env=production

# 3. Verify build
echo "✅ Verifying build..."
if [ ! -f "dist/main.js" ]; then
  echo "❌ Build failed: dist/main.js not found"
  exit 1
fi

echo "✅ Build completed successfully!"
