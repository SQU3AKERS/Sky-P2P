const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Get portfolio details
router.get('/:id/getPortfolio', async (req, res) => {
    try {
        console.log(`Fetching details for portfolio with ID ${req.params.id}`);
        const result = await portfolioController.getPortfolioById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error fetching portfolio details with ID ${req.params.id}:`, error);
        res.status(500).send(error.toString());
    }
});

module.exports = router;
