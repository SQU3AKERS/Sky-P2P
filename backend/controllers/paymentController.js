const Web3 = require('web3');
const getContractAddress = require('../utils/getContractAddress');
const LenderPortfolio = require('../models/lenderPortfolioModel');
// Temporarily removed due to not being required, can be future enhancement.
// const RewardsPoints = require('../models/rewardsPointsModel');
const Users = require('../models/userModel');
const paymentContractABI = require('../build/contracts/PaymentContract.json').abi;
const creditScoreContractABI = require('../build/contracts/CreditScoreContract.json').abi;

const web3 = new Web3(process.env.BLOCKCHAIN_NODE_URL);
const paymentContractAddress = getContractAddress('PaymentContract');
const paymentContract = new web3.eth.Contract(paymentContractABI, paymentContractAddress);
const creditScoreContractAddress = getContractAddress('CreditScoreContract');
const creditScoreContract = new web3.eth.Contract(creditScoreContractABI, creditScoreContractAddress);

const paymentController = {};

    const calculateCreditScoreAndPoints = (daysDiff) => {
        switch (true) {
            case (daysDiff > 1):
                return { score: 10, points: 200 }; // Repaid more than 1 day before end date
            case (daysDiff === 1):
                return { score: 10, points: 150 }; // Repaid 1 day before end date
            case (daysDiff === 0):
                return { score: 10, points: 100 }; // Repaid on end date
            case (daysDiff === -1):
                return { score: 8, points: 80 };   // 1 day late
            case (daysDiff <= -5):
                return { score: 5, points: 50 };   // 2-5 days late
            case (daysDiff <= -10):
                return { score: 3, points: 20 };   // 6-10 days late
            case (daysDiff <= -15):
                return { score: 1, points: 0 };    // 11-15 days late
            default:
                return { score: 0, points: 0 };    // More than 15 days late
        }
    };

    paymentController.payContract = async (data) => {
        try {
            console.log('Starting payContract with data:', data);
            const { contractId, borrowerId, paymentAmount, endDate, senderAddress } = data;
            console.log('Data Received in payContract:', data);
            const transactionDate = Math.floor(Date.now() / 1000); // Current timestamp in Unix
            console.log('Transaction date:', transactionDate);

            // Round up payment amount
            const paymentAmountInteger = Math.round(paymentAmount);
            console.log('Payment amount rounded:', paymentAmountInteger);
    
            // Store the payment details in the blockchain
            console.log('Creating payment on blockchain...');
            const createPaymentMethod = paymentContract.methods.createPayment(contractId, borrowerId, paymentAmountInteger, transactionDate);
            let gas = await createPaymentMethod.estimateGas({ from: senderAddress });
            await createPaymentMethod.send({ from: senderAddress, gas: gas * 3 });
    
            // Calculate the credit score and rewards points
            console.log('Payment created on blockchain. Processing credit score and rewards points...');
            const endDateComponents = endDate.split('/');
            const endDateFormatted = new Date(`${endDateComponents[2]}-${endDateComponents[1]}-${endDateComponents[0]}`);
            const endDateTimestamp = Math.floor(endDateFormatted.getTime() / 1000);

            // Calculate difference in days
            const daysDiff = Math.ceil((endDateTimestamp - transactionDate) / 86400);
            console.log('Days Difference', daysDiff);

            // Calculate the credit score and rewards points
            console.log('Calculating credit score and rewards points...');
            const { score } = calculateCreditScoreAndPoints(daysDiff);
            console.log('Credit score and rewards points processed. Function completed successfully.');
    
            // Store the credit score in the blockchain
            const createCreditScoreMethod = creditScoreContract.methods.createCreditScore(borrowerId, score, transactionDate);
            gas = await createCreditScoreMethod.estimateGas({ from: senderAddress });
            await createCreditScoreMethod.send({ from: senderAddress, gas: gas * 3 });

            // Convert Unix timestamp to Date object
            const transactionDateObject = new Date(transactionDate * 1000);
            
            // Format the Date to YYYY-MM-DD
            const formattedTransactionDate = transactionDateObject.toISOString().split('T')[0];

            // Store the rewards points in the database, TEMPORARILY DEPRECATED
            // await RewardsPoints.create({
            //    UserID: borrowerId,
            //    Points: points,
            //    AcquiredDate: formattedTransactionDate,
            // });

            await LenderPortfolio.update({
                 Status: 'Completed' },
                { where: { BlockID: contractId } 
            });
    
            console.log(`Payment processed and blockchain updated for Borrower ID: ${borrowerId}`);
        } catch (error) {
            console.error(`Error in processing payment for Borrower`, error);
            throw error;
        }
    };

    paymentController.fetchLenderPortfolio = async () => {
        try {
            console.log(`Fetching Lender Portfolio`);
            const portfolioData = await LenderPortfolio.findAll({
                include: [{
                    model: Users,
                    attributes: { exclude: ['PasswordHash'] }
                }]
            });

            console.log(`Fetched ${portfolioData.length} portfolio entries`);
            return portfolioData;
        } catch (error) {
            console.error(`Error in fetching Lender Portfolio:`, error);
            throw error;
        }
    };

    // List the 20 most recently uploaded contracts regardless of the user
    paymentController.listAllContracts = async () => {
    try {
        const allContracts = await paymentContract.methods.getAllPayments().call();
  
        // Check if allContracts is not an array or is empty
        if (!Array.isArray(allContracts) || allContracts.length === 0) {
          console.log('No contracts found.');
          return []; // Return an empty array if no contracts
        }
  
        const processedContracts = allContracts.map(paymentContract => ({
          ...paymentContract,
          paymentDate: new Date(paymentContract.paymentDate * 1000).toLocaleDateString(),
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

  paymentController.getUserDetailsByBorrowerId = async (borrowerId) => {
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

module.exports = paymentController;
