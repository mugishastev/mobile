#!/usr/bin/env node

// Simple script to help regenerate Expo Router typed routes
// This can be useful when new routes are added and TypeScript types need to be updated

const { execSync } = require('child_process');
const path = require('path');

console.log('🔄 Regenerating Expo Router types...');

try {
  // Stop the current metro bundler (if running)
  console.log('⏹️  Stopping Metro bundler...');
  
  // Clear the Expo cache
  console.log('🧹 Clearing Expo cache...');
  execSync('npx expo export:embed --clear-cache', { 
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit' 
  });
  
  // Start the development server to regenerate types
  console.log('🚀 Starting development server to regenerate types...');
  console.log('📝 Types will be regenerated automatically when the server starts.');
  console.log('💡 You can now stop this process after types are generated.');
  
  execSync('npx expo start --dev-client', { 
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit' 
  });
  
} catch (error) {
  console.error('❌ Error regenerating types:', error.message);
  console.log('\n💡 Alternative solutions:');
  console.log('1. Restart your development server: npx expo start');
  console.log('2. Clear cache: npx expo export:embed --clear-cache');
  console.log('3. Delete .expo folder and restart');
}