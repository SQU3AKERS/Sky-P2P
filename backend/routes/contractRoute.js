const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

// Create a new contract
router.post('/createContract', async (req, res) => {
    try {
        console.log('Creating a new contract:', req.body);
        const result = await contractController.createContract(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating contract:', error);
        res.status(500).send(error.toString());
    }
});

// Update an existing contract
router.put('/updateContract/:id', async (req, res) => {
    try {
        console.log(`Updating contract with ID ${req.params.id}:`, req.body);
        const result = await contractController.updateContract(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error updating contract with ID ${req.params.id}:`, error);
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
        const userId = parseInt(req.params.userId); // Assuming userId is an integer
        console.log(`Listing contracts for user with ID ${userId}`);
        const result = await contractController.listUserContracts(userId);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error listing contracts for user with ID ${req.params.userId}:`, error);
        res.status(500).send(error.toString());
    }
});

// Invalidate a contract
router.put('/invalidateContract/:id', async (req, res) => {
    try {
        console.log(`Invalidating contract with ID ${req.params.id}`);
        const result = await contractController.invalidateContract(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error invalidating contract with ID ${req.params.id}:`, error);
        res.status(500).send(error.toString());
    }
});

module.exports = router;
