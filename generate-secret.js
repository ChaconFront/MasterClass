// generate-secret.js
const crypto = require('crypto');
const fs = require('fs');

const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex'); // Genera una cadena de 64 caracteres hexadecimales
};

const secret = generateSecret();
//console.log(`Generated Secret: ${secret}`);


fs.appendFileSync('.env', `JWT_SECRET=${secret}\n`, { flag: 'a' });
//console.log('.env file updated with JWT_SECRET');
