const express = require('express');
const router = express.Router();
const sessionController = require('../utils/sessionManager');

router.post('/session', (req, res) => {
    console.log('Session request received with data:', req.body);
    sessionController.getSession(req, res);
});

module.exports = router;
