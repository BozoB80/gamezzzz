// vercel-build.js
const { execSync } = require('child_process');

try {
  // Generate Prisma Client
  execSync('npx prisma generate');
  console.log('Prisma Client generation complete.');
  
  // Other build steps
  // ...
} catch (error) {
  console.error('Error during build:', error);
  process.exit(1);
}
