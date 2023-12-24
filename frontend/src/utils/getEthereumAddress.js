import Web3 from 'web3';

const getEthereumAddress = async () => {
    const web3 = new Web3('http://127.0.0.1:7545'); // Ganache URL
    const accounts = await web3.eth.getAccounts();
    return accounts[0]; // Returning the first account
};

export default getEthereumAddress;
