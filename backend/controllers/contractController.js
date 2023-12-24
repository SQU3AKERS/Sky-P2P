const Web3 = require('web3');
const getContractAddress = require('../utils/getContractAddress');
const contractABI = require('../build/contracts/BorrowerContract.json').abi;

console.log(process.env.BLOCKCHAIN_NODE_URL);

const web3 = new Web3(process.env.BLOCKCHAIN_NODE_URL);
const contractAddress = getContractAddress('BorrowerContract');
const contract = new web3.eth.Contract(contractABI, contractAddress);

const contractController = {};

contractController.createContract = async (contractData, senderAddress) => {
const { loanAmount, interestRate, startDate, borrowerId } = contractData;
console.log('Received contract data:', contractData);
console.log('Loan Amount:', loanAmount);
console.log('Interest Rate:', interestRate);
console.log('Start Date:', startDate);
console.log('Borrower ID:', borrowerId);
console.log('ContractAddress:', contractAddress);
console.log('SenderAddress:', contractData.senderAddress);

// Convert startDate from 'YYYY-MM-DD' to Unix timestamp
const startDateTimestamp = new Date(startDate).getTime() / 1000;

    try {
        const createContractMethod = contract.methods.createContract(borrowerId, loanAmount, interestRate, startDateTimestamp);
        const gas = await createContractMethod.estimateGas({ from: senderAddress });
        const result = await createContractMethod.send({ from: contractData.senderAddress, gas: gas * 2 });
        console.log('Contract created:', result);
        return result;
    } catch (error) {
        console.error('Error creating contract:', error);
        throw error;
    }
};

contractController.updateContract = async (contractId, updateData, senderAddress) => {
    // Your implementation here. Use contract.methods.updateContract(...) and send transaction
};

contractController.getContractDetails = async (contractId) => {
    // Your implementation here. Use contract.methods.getContractDetails(...)
};

contractController.listUserContracts = async (userAddress) => {
    // Your implementation here. Use contract.methods.listUserContracts(...)
};

contractController.invalidateContract = async (contractId, senderAddress) => {
    // Your implementation here. Use contract.methods.invalidateContract(...) and send transaction
};

module.exports = contractController;
