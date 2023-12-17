const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation logic can be added here or in the loginController

        // Invoke the login controller function
        const result = await loginController.login(email, password);

        res.json(result); // Send back the response from the controller
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' }); // General error message
    }
});

module.exports = router;
