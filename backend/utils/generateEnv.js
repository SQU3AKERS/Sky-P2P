const fs = require('fs');
const crypto = require('crypto');

const envFile = '.env';

if (!fs.existsSync(envFile)) {
    // Generate a random secret for the session
    const sessionSecret = crypto.randomBytes(64).toString('hex');

    // Define your blockchain node URL (e.g., Ganache or Infura URL)
    const blockchainNodeUrl = 'http://localhost:7545';

    // Create the .env file with the SESSION_SECRET and BLOCKCHAIN_NODE_URL
    const content = `SESSION_SECRET=${sessionSecret}\nBLOCKCHAIN_NODE_URL=${blockchainNodeUrl}\n`;
    fs.writeFileSync(envFile, content, { flag: 'a' });
    console.log('.env file created with SESSION_SECRET and BLOCKCHAIN_NODE_URL');
} else {
    console.log('.env file already exists');
}
