const express = require('express');
const router = express.Router();
const sessionManager = require('../utils/sessionManager');

router.get('/getSession', (req, res) => {
    const sessionData = sessionManager.getSession(req);
    if (sessionData) {
        res.json({ success: true, sessionData });
    } else {
        res.json({ success: false, message: 'No active session' });
    }
});

router.get('/logout', (req, res) => {
    const sessionData = sessionManager.destroySession(req);
    if (sessionData) {
        res.json({ success: true, sessionData });
        res.json({ success: true, message: 'User logged out successfully' });
    } else {
        res.json({ success: false, message: 'No active session' });
    }
});

module.exports = router;
