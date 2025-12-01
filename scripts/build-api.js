#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Build the API using Nx from workspace root
try {
  console.log('Building API...');

  // Run webpack from apps/api with proper context
  process.chdir(path.join(__dirname, '..', 'apps', 'api'));

  execSync('npx webpack-cli build --node-env=production', {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
    },
  });

  console.log('✅ Build completed successfully!');
  console.log('Built files are in apps/api/dist/');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
