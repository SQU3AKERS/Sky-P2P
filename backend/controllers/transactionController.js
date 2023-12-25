const LenderPortfolio = require('../models/lenderPortfolioModel');
const Web3 = require('web3');
const getContractAddress = require('../utils/getContractAddress');
const contractABI = require('../build/contracts/TransactionContract.json').abi;

const web3 = new Web3(process.env.BLOCKCHAIN_NODE_URL);
const contractAddress = getContractAddress('TransactionContract');
const contract = new web3.eth.Contract(contractABI, contractAddress);

const transactionController = {};

transactionController.handleSendMoney = async (transactionData, res) => {
    const { lenderId, borrowerId, amount, blockId } = transactionData;
    console.log('Values - Lender ID', transactionData.lenderId)
    console.log(transactionData.borrowerId);
    console.log(transactionData.amount);
    console.log(blockId);
    console.log(transactionData.senderAddress);
    // Convert string values to integers and use new variable names
    const parsedLenderId = parseInt(lenderId);
    const parsedBorrowerId = parseInt(borrowerId);
    const parsedAmount = web3.utils.toBN(amount);
    const parsedBlockId = parseInt(blockId);
    const transactionDate = Math.floor(Date.now() / 1000); // Current timestamp in Unix
    // const parsedTransactionDate = parsedInt(transactionDate);

    console.log(`Parsed Values - Lender ID: ${parsedLenderId}, Borrower ID: ${parsedBorrowerId}, Amount: ${parsedAmount}, Block ID: ${parsedBlockId}, Transaction Date: ${transactionDate}`);
    try {
        // Interact with the blockchain to create the transaction
        const createTransactionMethod = contract.methods.createTransaction(parsedLenderId, parsedBorrowerId, parsedAmount, transactionDate);
        const gas = await createTransactionMethod.estimateGas({ from: transactionData.senderAddress });
        const transactionResult = await createTransactionMethod.send({ from: transactionData.senderAddress, gas: gas * 3 });

        // Update Lender Portfolio in the database
        const portfolioData = {
            LenderID: lenderId,
            BlockID: blockId,
            InvestmentAmount: amount,
            InvestmentDate: new Date().toISOString().split('T')[0],
            Status: 'Earning'
        };
        const newPortfolioEntry = await LenderPortfolio.create(portfolioData);

        res.json({ transactionResult, newPortfolioEntry });
    } catch (error) {
        console.error('Error in handling send money:', error);
        res.status(500).send('Error processing transaction');
    }
};

module.exports = transactionController;
