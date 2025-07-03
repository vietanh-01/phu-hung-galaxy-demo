const { execSync } = require('child_process');

try {
  execSync('ts-node --compiler-options "{\\\"module\\\":\\\"CommonJS\\\"}" prisma/seed.ts', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to seed database:', error);
  process.exit(1);
} 