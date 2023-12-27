const express = require('express');
const router = express.Router();
const creditScoreController = require('../controllers/creditScoreController');

// Route to list all contracts from the blockchain
router.get('/blockchain/allContracts', async (req, res) => {
    try {
        console.log("Fetching the 20 most recent credit score contracts from the blockchain...");
        const recentContracts = await creditScoreController.listAllContracts();
        res.json(recentContracts);
    } catch (error) {
        console.error('Error fetching contracts from the blockchain:', error);
        res.status(500).json({ message: 'Internal server error' });
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

        const userDetails = await creditScoreController.getUserDetailsByBorrowerId(borrowerId);

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

module.exports = router;
