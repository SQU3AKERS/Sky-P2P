const fs = require('fs');
const crypto = require('crypto');

const envFile = '.env';

if (!fs.existsSync(envFile)) {
  // Generate a random secret for the session
  const sessionSecret = crypto.randomBytes(64).toString('hex');

  // Create the .env file with the SESSION_SECRET
  fs.writeFileSync(envFile, `SESSION_SECRET=${sessionSecret}\n`, { flag: 'a' });
  console.log('.env file created with SESSION_SECRET');
} else {
  console.log('.env file already exists');
}
