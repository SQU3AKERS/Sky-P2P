const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/loginUser', (req, res) => {
    console.log('Login request received with data:', req.body);
    loginController.login(req, res);
});

module.exports = router;
