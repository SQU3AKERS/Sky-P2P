const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Upload to Blockchain and Database
router.post('/uploadToBCDB', async (req, res) => {
    try {
        console.log('Creating a new contract:', req.body);
        const result = await transactionController.handleSendMoney(req, res);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating contract:', error);
        res.status(500).send(error.toString());
    }
});

// Fetch all DB Results
router.get('/allDBResults', transactionController.getAllDBBlockIds);

// Route to list all Transactions from the blockchain
router.get('/blockchain/allTransactions', async (req, res) => {
    try {
        console.log("Fetching the 20 most recent transactionss from the blockchain...");
        const recentTransactions = await transactionController.listAllTransactions();
        res.json(recentTransactions);
    } catch (error) {
        console.error('Error fetching transactions from the blockchain:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Fetch all user details
router.get('/fetchAllUsers', async (req, res) => {
    try {
        console.log('Fetching all user details...');
        const users = await transactionController.fetchAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
