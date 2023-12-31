const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

// Create a new contract
router.post('/createContract', async (req, res) => {
    try {
        console.log('Creating a new contract:', req.body);
        const result = await contractController.createContract(req.body);
        if (result.error) {
            res.status(400).json({ message: result.error });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error('Error creating contract:', error);
        res.status(500).send(error.toString());
    }
});

// Get contract details
router.get('/contractDetails/:id', async (req, res) => {
    try {
        console.log(`Fetching details for contract with ID ${req.params.id}`);
        const result = await contractController.getContractDetails(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error fetching contract details with ID ${req.params.id}:`, error);
        res.status(500).send(error.toString());
    }
});

// List contracts for the current session user based on userId
router.get('/user/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        console.log(`Listing contracts for user with ID ${userId}`);
        const result = await contractController.listUserContracts(userId);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error listing contracts for user with ID ${req.params.userId}:`, error);
        res.status(500).send(error.toString());
    }
});

router.get('/user-detail/:borrowerId', async (req, res) => {
    try {
        const borrowerId = req.params.borrowerId;
        console.log(`Fetching user details for borrowerId: ${borrowerId}`);

        if (isNaN(borrowerId)) {
            console.log(`Invalid borrowerId: ${borrowerId}`);
            return res.status(400).json({ message: 'Invalid borrower ID' });
        }

        const userDetails = await contractController.getUserDetailsByBorrowerId(borrowerId);

        if (!userDetails) {
            console.log(`No user found for borrowerId: ${borrowerId}`);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(`User found: ${userDetails.FirstName} ${userDetails.LastName}`);
        res.json(userDetails);
    } catch (error) {
        console.error(`Error fetching user for borrowerId ${req.params.borrowerId}:`, error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to list all contracts from the blockchain
router.get('/blockchain/allContracts', async (req, res) => {
    try {
        console.log("Fetching the 20 most recent contracts from the blockchain...");
        const recentContracts = await contractController.listAllContracts();
        res.json(recentContracts);
    } catch (error) {
        console.error('Error fetching contracts from the blockchain:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
