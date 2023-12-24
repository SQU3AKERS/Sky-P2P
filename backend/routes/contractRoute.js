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

// List contracts for a user
router.get('/userContracts/:userAddress', async (req, res) => {
    try {
        console.log(`Listing contracts for user ${req.params.userAddress}`);
        const result = await contractController.listUserContracts(req.params.userAddress);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error listing contracts for user ${req.params.userAddress}:`, error);
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
