const express = require('express');
const router = express.Router();
const mainMenuController = require('../controllers/mainMenuController');

router.get('/:userId/firstname', async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log(`Fetching first name for user ID: ${userId}`);
  
      const firstName = await mainMenuController.getUserFirstNameById(userId);
  
      if (firstName) {
        console.log(`Found first name for user ID ${userId}: ${firstName}`);
        res.json({ firstName });
      } else {
        console.log(`First name for user ID ${userId} not found.`);
        res.status(404).json({ message: 'User first name not found.' });
      }
    } catch (error) {
      console.error(`Error fetching first name for user ID ${userId}:`, error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/:userId/totalContractsCreated', async (req, res) => {
    try {
      const userId = req.params.userId;
      // Implement logic to fetch total contracts created
      const totalContractsCreated = await mainMenuController.getTotalContractsCreated(userId);
      res.json({ totalContractsCreated });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  router.get('/:userId/totalContractsFunded', async (req, res) => {
    try {
      const userId = req.params.userId;
      // Implement logic to fetch total contracts funded
      const totalContractsFunded = await mainMenuController.getTotalContractsFunded(userId);
      res.json({ totalContractsFunded });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  router.get('/:userId/creditScore', async (req, res) => {
    try {
      const userId = req.params.userId;
      // Implement logic to fetch credit score
      const creditScore = await mainMenuController.getCreditScore(userId);
      res.json({ creditScore });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  router.get('/:userId/totalOutstanding', async (req, res) => {
    try {
      const userId = req.params.userId;
      // Implement logic to fetch total outstanding amount
      const totalOutstanding = await mainMenuController.getTotalOutstanding(userId);
      res.json({ totalOutstanding });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  router.get('/:userId/totalPaid', async (req, res) => {
    try {
      const userId = req.params.userId;
      // Implement logic to fetch total paid amount
      const totalPaid = await mainMenuController.getTotalPaid(userId);
      res.json({ totalPaid });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

module.exports = router;