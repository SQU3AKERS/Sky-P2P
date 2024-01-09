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
      let totalFunded = 0;
      transactions.forEach(transaction => {
        if (transaction.borrowerId === userId) {
          totalFunded += Number(transaction.amount);
        }
      });
    
      // Return the total funded amount as a fixed decimal string
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
      const averageScore = creditScores.reduce((total, scoreRecord) => total + parseInt(scoreRecord.score), 0) / creditScores.length;
  
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
      let totalOutstanding = 0;  // Use a regular number since we're not converting units
  
      for (let contract of borrowerContracts) {
        // Find the related 'Earning' status contract in the LenderPortfolio
        const portfolioEntry = await LenderPortfolio.findOne({
          where: {
            BlockID: contract.id.toString(),
            Status: 'Earning'
          }
        });
  
        if (portfolioEntry) {
          // Use the loanAmount and interestRate directly to calculate the total amount due for the contract
          const loanAmount = Number(contract.loanAmount);  // Convert to number if necessary
          const interestRate = Number(contract.interestRate) / 100;  // Convert interest rate to decimal
          const interestAmount = loanAmount * interestRate;
          const totalAmount = loanAmount + interestAmount;
  
          // Accumulate the total outstanding amount
          totalOutstanding += totalAmount;
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
      let totalPaid = 0;
      payments.forEach(payment => {
        totalPaid += Number(payment.paymentAmount);
      });
    
      // Return the total paid amount as a fixed decimal string
      return totalPaid;
    } catch (error) {
      console.error(`Error in getTotalPaid: ${error}`);
      throw error;
    }
  };  

  mainMenuController.getTotalInvestment = async (lenderId) => {
    try {
      const investments = await LenderPortfolio.findAll({
        where: { LenderID: lenderId }
      });
      const totalInvestment = investments.reduce((total, investment) => {
        return total + Number(investment.InvestmentAmount);
      }, 0);
      return totalInvestment;
    } catch (error) {
      console.error(`Error in getTotalInvestment: ${error}`);
      throw error;
    }
  };

  mainMenuController.getTotalUnrealizedReturns = async (lenderId) => {
    try {
      // Fetch all active investments for the lender
      const investments = await LenderPortfolio.findAll({
        where: { LenderID: lenderId, Status: 'Earning' }
      });
  
      // Fetch all contracts
      const allContracts = await borrowerContract.methods.getAllContracts().call();
  
      let totalUnrealizedReturns = 0;
  
      for (let investment of investments) {
        // Find the corresponding contract based on BlockID
        const contract = allContracts.find(c => c.id.toString() === investment.BlockID.toString());
  
        if (contract) {
          // Calculate the expected return (loan amount + interest)
          const loanAmount = Number(contract.loanAmount);
          const interestRate = Number(contract.interestRate) / 100; // Convert to decimal
          const interestAmount = loanAmount * interestRate;
          const expectedReturn = loanAmount + interestAmount;
  
          // Fetch all payments and filter by contractBlockId
          const allPayments = await paymentContract.methods.getAllPayments().call();
          const contractPayments = allPayments.filter(p => p.contractBlockId.toString() === contract.id.toString());
          const totalPayments = contractPayments.reduce((total, payment) => {
            return total + Number(payment.paymentAmount);
          }, 0);
  
          // Calculate unrealized return for this contract and add to total
          totalUnrealizedReturns += expectedReturn - totalPayments;
        }
      }
  
      return totalUnrealizedReturns;
    } catch (error) {
      console.error(`Error in getTotalUnrealizedReturns: ${error}`);
      throw error;
    }
  };  

  mainMenuController.getTotalRealizedReturns = async (lenderId) => {
    try {
      // Fetch all investments made by the lender
      const investments = await LenderPortfolio.findAll({
        where: { LenderID: lenderId }
      });
  
      // Fetch all payments from the PaymentContract
      const allPayments = await paymentContract.methods.getAllPayments().call();
  
      let totalRealizedReturns = 0;
  
      // Loop through each investment to calculate realized returns
      for (let investment of investments) {
        // Filter payments related to each investment's BlockID
        const investmentPayments = allPayments.filter(p => p.contractBlockId.toString() === investment.BlockID.toString());
        const investmentRealizedReturns = investmentPayments.reduce((total, payment) => {
          return total + Number(payment.paymentAmount);
        }, 0);
  
        // Add the realized returns from this investment to the total
        totalRealizedReturns += investmentRealizedReturns;
      }
  
      return totalRealizedReturns;
    } catch (error) {
      console.error(`Error in getTotalRealizedReturns: ${error}`);
      throw error;
    }
  };  

  mainMenuController.getTotalAcceptedContracts = async (lenderId) => {
    try {
      const count = await LenderPortfolio.count({
        where: { LenderID: lenderId }
      });
      return count;
    } catch (error) {
      console.error(`Error in getTotalAcceptedContracts: ${error}`);
      throw error;
    }
  };  

module.exports = mainMenuController;