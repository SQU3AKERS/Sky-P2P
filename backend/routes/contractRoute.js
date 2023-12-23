const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

router.post('/createContract', (req, res) => {
    console.log('Received data:', req.body);
    contractController.createBorrowerContract(req, res);
});

module.exports = router;
