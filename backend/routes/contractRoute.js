const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

router.post('/borrowerContract', (req, res) => {
    console.log('Received data:', req.body);
    loginController.login(req, res);
});

module.exports = router;
