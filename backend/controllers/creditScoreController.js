const Web3 = require('web3');
const getContractAddress = require('../utils/getContractAddress');
const Users = require('../models/userModel');
const creditScoreContractABI = require('../build/contracts/CreditScoreContract.json').abi;

const web3 = new Web3(process.env.BLOCKCHAIN_NODE_URL);
const creditScoreContractAddress = getContractAddress('CreditScoreContract');
const creditScoreContract = new web3.eth.Contract(creditScoreContractABI, creditScoreContractAddress);

const creditScoreController = {};

  creditScoreController.getUserDetailsByBorrowerId = async (borrowerId) => {
    try {
        console.log(`Fetching user details for borrowerId: ${borrowerId}`);

        const user = await Users.findOne({ where: { UserID: borrowerId } });
        if (!user) {
            console.log(`No user found for borrowerId: ${borrowerId}`);
            return null;
        }

        console.log(`User found: ${user.FirstName} ${user.LastName}`);
        return { FirstName: user.FirstName, LastName: user.LastName };
    } catch (error) {
        console.error(`Error fetching user details for borrowerId: ${borrowerId}:`, error);
        throw error;
    }
};

    // List the 20 most recently uploaded contracts regardless of the user
    creditScoreController.listAllContracts = async () => {
    try {
        const allContracts = await creditScoreContract.methods.getAllCreditScores().call();
  
        // Check if allContracts is not an array or is empty
        if (!Array.isArray(allContracts) || allContracts.length === 0) {
          console.log('No contracts found.');
          return []; // Return an empty array if no contracts
        }
  
        const processedContracts = allContracts.map(creditScoreContract => ({
          ...creditScoreContract,
          scoreDate: new Date(creditScoreContract.scoreDate * 1000).toLocaleDateString(),
          // Additional formatting as needed
        }));
  
        // Check if there are fewer than 20 contracts
        const recentContracts = processedContracts.length <= 20 ? processedContracts : processedContracts.slice(-20);
        console.log('Recent Contracts:', recentContracts);
        return recentContracts;
    } catch (error) {
        console.error('Error listing all contracts:', error);
        throw error;
    }
  };

module.exports = creditScoreController;
