const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Fetch Lender Portfolio
router.get('/fetchLenderPortfolio', async (req, res) => {
    try {
        console.log('Fetching Lender Portfolio Request:', req.body);
        const result = await paymentController.fetchLenderPortfolio(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error Fetching Lender Portfolio Request:', error);
        res.status(500).send(error.toString());
    }
});

// Pay Contract
router.post('/payContract', async (req, res) => {
    try {
        console.log('Pay Contract Request:', req.body);
        const result = await paymentController.payContract(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in Pay Contract Request:', error);
        res.status(500).send(error.toString());
    }
});

module.exports = router;
