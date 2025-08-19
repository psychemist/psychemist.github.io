#!/usr/bin/env node

/**
 * Pre-commit hook for code quality checks
 * Runs type checking, linting, and formatting before commits
 */

const { execSync } = require('child_process');
const { existsSync } = require('fs');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n🔍 ${description}...`, colors.blue);
  
  try {
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} passed`, colors.green);
    return true;
  } catch (error) {
    log(`❌ ${description} failed`, colors.red);
    return false;
  }
}

function main() {
  log('🚀 Running pre-commit quality checks...', colors.cyan);
  
  let allChecksPassed = true;

  // Check if package.json exists
  if (!existsSync('package.json')) {
    log('❌ package.json not found', colors.red);
    process.exit(1);
  }

  // Run TypeScript type checking
  allChecksPassed = runCommand('npx tsc --noEmit', 'TypeScript type check') && allChecksPassed;

  // Run ESLint
  allChecksPassed = runCommand('npm run lint', 'ESLint check') && allChecksPassed;

  // Run Prettier check
  allChecksPassed = runCommand('npx prettier --check .', 'Prettier format check') && allChecksPassed;

  // Run tests if they exist
  if (existsSync('vitest.config.ts') || existsSync('jest.config.js')) {
    allChecksPassed = runCommand('npm test -- --run --reporter=basic', 'Test suite') && allChecksPassed;
  }

  if (allChecksPassed) {
    log('\n🎉 All quality checks passed! Ready to commit.', colors.green);
    process.exit(0);
  } else {
    log('\n💥 Some checks failed. Please fix the issues before committing.', colors.red);
    log('\nTip: Run the following commands to fix common issues:', colors.yellow);
    log('  npm run lint:fix    # Fix ESLint issues', colors.yellow);
    log('  npm run format      # Fix Prettier formatting', colors.yellow);
    process.exit(1);
  }
}

main();