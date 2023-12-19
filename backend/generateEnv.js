const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const envFilePath = path.join(__dirname, '.env');
const generateSecretKey = () => crypto.randomBytes(64).toString('hex');

if (!fs.existsSync(envFilePath)) {
    const secretKey = generateSecretKey();
    const content = `JWT_SECRET=${secretKey}`;
    fs.writeFileSync(envFilePath, content, { encoding: 'utf8' });
    console.log('.env file created with JWT_SECRET.');
} else {
    console.log('.env file already exists.');
}
