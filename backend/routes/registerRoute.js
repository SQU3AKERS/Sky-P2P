const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// router.post('/register', registerController.registerUser);
router.post('/register', (req, res) => {
    console.log('Register request received with data:', req.body);
    registerController.registerUser(req, res);
});

module.exports = router;
