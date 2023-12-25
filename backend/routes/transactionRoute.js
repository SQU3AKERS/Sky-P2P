const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Upload to Blockchain and Database
router.post('/uploadToBCDB', async (req, res) => {
    try {
        console.log('Creating a new contract:', req.body);
        const result = await transactionController.handleSendMoney(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating contract:', error);
        res.status(500).send(error.toString());
    }
});

module.exports = router;
