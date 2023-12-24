const fs = require('fs');
const path = require('path');

const getContractAddress = (contractName) => {
    const jsonPath = path.resolve(__dirname, '../build/contracts', `${contractName}.json`);
    const contractJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const networkId = '5777';
    const address = contractJson.networks[networkId] && contractJson.networks[networkId].address;
    if (!address) {
        throw new Error(`Address not found for contract ${contractName} on network ${networkId}`);
    }
    return address;
};

module.exports = getContractAddress;
