const LenderPortfolio = require('../models/lenderPortfolioModel');
const Web3 = require('web3');
const getContractAddress = require('../utils/getContractAddress');
const contractABI = require('../build/contracts/TransactionContract.json').abi;

const web3 = new Web3(process.env.BLOCKCHAIN_NODE_URL);
const contractAddress = getContractAddress('TransactionContract');
const contract = new web3.eth.Contract(contractABI, contractAddress);

const transactionController = {};

transactionController.handleSendMoney = async (req, res) => {
    const { lenderId, borrowerId, amount, blockId, senderAddress } = req.body;

    // Convert string values to integers and use new variable names
    const parsedLenderId = parseInt(lenderId);
    const parsedBorrowerId = parseInt(borrowerId);
    const parsedAmount = web3.utils.toBN(amount);
    const parsedBlockId = parseInt(blockId);
    const transactionDate = Math.floor(Date.now() / 1000); // Current timestamp in Unix

    // const parsedTransactionDate = parsedInt(transactionDate);
    console.log(`Parsed Values - Lender ID: ${parsedLenderId}, Borrower ID: ${parsedBorrowerId}, Amount: ${parsedAmount}, Block ID: ${parsedBlockId}, Transaction Date: ${transactionDate}`);
    
    try {
        // Check if BlockId already exists in LenderPortfolio
        const existingPortfolioEntry = await LenderPortfolio.findOne({ where: { BlockID: blockId } });
        if (existingPortfolioEntry) {
            return res.status(400).send('BlockId already exists in LenderPortfolio');
        }
        try {
            // Interact with the blockchain to create the transaction
            const createTransactionMethod = contract.methods.createTransaction(parsedLenderId, parsedBorrowerId, parsedAmount, transactionDate);
            const gas = await createTransactionMethod.estimateGas({ from: senderAddress });
            const transactionResult = await createTransactionMethod.send({ from: senderAddress, gas: gas * 3 });

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
    } catch (error) {
        console.error('Error in handling send money:', error);
        res.status(500).send('Error processing transaction');
    }
};

transactionController.getAllDBBlockIds = async (req, res) => {
    try {
        const portfolios = await LenderPortfolio.findAll({
            attributes: ['BlockID'] 
        });
        const blockIds = portfolios.map(portfolio => portfolio.BlockID);
        console.log('BlockIds found:', blockIds);
        res.json(blockIds);
    } catch (error) {
        console.error('Error fetching BlockIds from LenderPortfolio:', error);
        res.status(500).send(error.toString());
    }
};

module.exports = transactionController;
