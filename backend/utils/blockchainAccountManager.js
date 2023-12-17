const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const path = require('path');
const fs = require('fs');

const mnemonic = 'taste six hunt long year undo destroy effort aspect miracle caution obey';
const provider = new HDWalletProvider(mnemonic, 'http://127.0.0.1:7545');
const web3 = new Web3(provider);

const createAccountAndStorePrivateKey = async () => {
  const account = await web3.eth.accounts.create();

  // Log the account details
  console.log("Account created:", account.address);
  console.log("Private key:", account.privateKey);

  const privateKeyPath = path.resolve(__dirname, '../storage/privatekey-users', `privatekey-${account.address}.txt`);

  fs.writeFileSync(privateKeyPath, account.privateKey);

  return account.address;
};

module.exports = {
  createAccountAndStorePrivateKey
};
