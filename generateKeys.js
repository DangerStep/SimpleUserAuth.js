const fs = require('fs');
const crypto = require('crypto');

function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });

  fs.writeFileSync('publicKey.pem', publicKey);
  fs.writeFileSync('privateKey.pem', privateKey);

  console.log('RSA key pair generated successfully.');
}

//generateKeyPair();

module.exports = generateKeyPair;
