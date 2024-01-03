const Users = require('../models/userModel');
const LenderPortfolio = require('../models/lenderPortfolioModel');
const Web3 = require('web3');
const web3 = new Web3(process.env.BLOCKCHAIN_NODE_URL);
const getContractAddress = require('../utils/getContractAddress');

const mainMenuController = {};

// Initialize Web3 and the BorrowerContract
const borrowerContractABI = require('../build/contracts/BorrowerContract.json').abi;
const borrowerContractAddress = getContractAddress('BorrowerContract');
const borrowerContract = new web3.eth.Contract(borrowerContractABI, borrowerContractAddress);

// Initialize Web3 and the TransactionContract
const transactionContractABI = require('../build/contracts/TransactionContract.json').abi;
const transactionContractAddress = getContractAddress('TransactionContract');
const transactionContract = new web3.eth.Contract(transactionContractABI, transactionContractAddress);

// Initialize Web3 and the CreditScoreContract
const creditScoreContractABI = require('../build/contracts/CreditScoreContract.json').abi;
const creditScoreContractAddress = getContractAddress('CreditScoreContract');
const creditScoreContract = new web3.eth.Contract(creditScoreContractABI, creditScoreContractAddress);

// Initialize Web3 and the PaymentContract
const paymentContractABI = require('../build/contracts/PaymentContract.json').abi;
const paymentContractAddress = getContractAddress('PaymentContract');
const paymentContract = new web3.eth.Contract(paymentContractABI, paymentContractAddress);

mainMenuController.getUserFirstNameById = async (userId) => {
  try {
    const user = await Users.findByPk(userId);
    console.log('First name found: ', user);
    return user ? user.FirstName : null;
  } catch (error) {
    console.error(`Error in getUserFirstNameById: ${error}`);
    throw error;
  }
};

mainMenuController.getTotalContractsCreated = async (userId) => {
    try {  
      // Fetch the contracts for the given user
      const contracts = await borrowerContract.methods.listAllContractsForBorrowerId(userId).call();
  
      // Return the count of contracts
      return contracts.length;
    } catch (error) {
      console.error(`Error in getTotalContractsCreated: ${error}`);
      throw error;
    }
  };

  mainMenuController.getTotalContractsFunded = async (userId) => {
    try {
      // Fetch transactions for the given user
      const transactions = await transactionContract.methods.getTransactionsForUser(userId).call();
  
      // Calculate the total funded amount
      const totalFunded = transactions.reduce((total, transaction) => {
        if (transaction.borrowerId === userId) {
          total += transaction.amount;
        }
        return total;
      }, 0);
  
      return totalFunded;
    } catch (error) {
      console.error(`Error in getTotalContractsFunded: ${error}`);
      throw error;
    }
  };

  mainMenuController.getCreditScore = async (userId) => {
    try {  
      // Fetch credit scores for the given user
      const creditScores = await creditScoreContract.methods.getCreditScoresForBorrowerId(userId).call();
  
      // Calculate the average score
      const averageScore = creditScores.reduce((total, scoreRecord) => total + scoreRecord.score, 0) / creditScores.length;
  
      return averageScore || 0; // Return 0 if no scores found
    } catch (error) {
      console.error(`Error in getCreditScore: ${error}`);
      throw error;
    }
  };

  mainMenuController.getTotalOutstanding = async (userId) => {
    try {  
      // Fetch contracts for the given user
      const borrowerContracts = await borrowerContract.methods.listAllContractsForBorrowerId(userId).call();
  
      // Extract contract IDs from the borrower contracts
      const contractIds = borrowerContracts.map(contract => contract.id);
  
      // Fetch and sum the investment amounts from LenderPortfolio for these contract IDs
      let totalOutstanding = 0;
      for (let contractId of contractIds) {
        const contract = await LenderPortfolio.findOne({
          where: {
            BlockID: contractId,
            Status: 'Earning'
          }
        });
        if (contract) {
          totalOutstanding += contract.InvestmentAmount;
        }
      }
  
      return totalOutstanding;
    } catch (error) {
      console.error(`Error in getTotalOutstanding: ${error}`);
      throw error;
    }
  };

  mainMenuController.getTotalPaid = async (userId) => {
    try {
      // Fetch payment records for the given user
      const payments = await paymentContract.methods.getPaymentsForBorrowerId(userId).call();
  
      // Calculate the total paid amount
      const totalPaid = payments.reduce((total, payment) => total + payment.paymentAmount, 0);
  
      return totalPaid;
    } catch (error) {
      console.error(`Error in getTotalPaid: ${error}`);
      throw error;
    }
  };

module.exports = mainMenuController;