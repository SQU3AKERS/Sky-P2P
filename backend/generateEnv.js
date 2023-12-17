const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envFilePath = path.join(__dirname, '.env');
const generateSecretKey = () => crypto.randomBytes(64).toString('hex');

if (!fs.existsSync(envFilePath)) {
    const jwtSecretKey = generateSecretKey();
    const sessionSecretKey = generateSecretKey();
    const content = `JWT_SECRET=${jwtSecretKey}\nSESSION_SECRET=${sessionSecretKey}`;
    fs.writeFileSync(envFilePath, content, { encoding: 'utf8' });
    console.log('.env file created with JWT_SECRET and SESSION_SECRET.');
} else {
    console.log('.env file already exists.');
}
