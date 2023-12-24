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

contractController.getContractDetails = async (contractId) => {
    try {
      // Call the smart contract's getContractDetails method with the contractId
      const contractDetails = await contract.methods.getContractDetails(contractId).call();
      console.log('Contract Details:', contractDetails);
      return contractDetails;
    } catch (error) {
      console.error('Error retrieving contract details:', error);
      throw error;
    }
  };  

// List contracts based on the borrowerId within the contract
contractController.listUserContracts = async (borrowerId) => {
    try {
      const allContracts = await contract.methods.listContracts().call();
      const userContracts = allContracts.filter(contract => contract.borrowerId === borrowerId);
      console.log('User Contracts:', userContracts);
      return userContracts;
    } catch (error) {
      console.error('Error listing user contracts:', error);
      throw error;
    }
  };

// List the 20 most recently uploaded contracts regardless of the user
contractController.listAllContracts = async () => {
    try {
      const allContracts = await contract.methods.listContracts().call();
      const recentContracts = allContracts.slice(-20); // Get the last 20 contracts
      console.log('Recent Contracts:', recentContracts);
      return recentContracts;
    } catch (error) {
      console.error('Error listing all contracts:', error);
      throw error;
    }
  };

  
contractController.updateContract = async (contractId, updateData, senderAddress) => {
    try {
      const { loanAmount, interestRate } = updateData;
      const updateContractMethod = contract.methods.updateContract(contractId, loanAmount, interestRate);
      const gas = await updateContractMethod.estimateGas({ from: senderAddress });
      const result = await updateContractMethod.send({ from: senderAddress, gas });
      console.log('Contract updated:', result);
      return result;
    } catch (error) {
      console.error('Error updating contract:', error);
      throw error;
    }
  };

  contractController.invalidateContract = async (contractId, senderAddress) => {
    try {
      const invalidateContractMethod = contract.methods.invalidateContract(contractId);
      const gas = await invalidateContractMethod.estimateGas({ from: senderAddress });
      const result = await invalidateContractMethod.send({ from: senderAddress, gas });
      console.log('Contract invalidated:', result);
      return result;
    } catch (error) {
      console.error('Error invalidating contract:', error);
      throw error;
    }
  };

module.exports = contractController;
