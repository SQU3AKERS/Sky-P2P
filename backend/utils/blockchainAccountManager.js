const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const web3 = new Web3('http://127.0.0.1:7545');

const createAccountAndStorePrivateKey = async () => {
  const account = await web3.eth.accounts.create();

  const privateKeyPath = path.resolve(__dirname, '../storage/privatekey-users', `privatekey-${account.address}.txt`);

  fs.writeFileSync(privateKeyPath, account.privateKey);

  return account.address;
};

module.exports = {
  createAccountAndStorePrivateKey
};
