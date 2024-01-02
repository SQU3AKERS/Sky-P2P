const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Fetch user profile route
router.get('/fetchUserProfile/:userId', async (req, res) => {
    try {
        console.log(`Fetching user profile for userId: ${req.params.userId}`);
        const userProfile = await profileController.fetchUserProfile(req.params.userId);

        if (!userProfile) {
            console.log(`User profile not found for userId: ${req.params.userId}`);
            return res.status(404).send('User profile not found');
        }

        console.log(`Profile fetched successfully: ${userProfile}`);
        res.json(userProfile);
    } catch (error) {
        console.error(`Error fetching user profile:`, error);
        res.status(500).send('Error fetching user profile');
    }
});

// Route to update user profile data
router.post('/updateProfile', (req, res) => {
    console.log('Updating user profile:', req.body);
    profileController.updateProfile(req, res)
        .then(data => {
            console.log('Profile updated successfully:', data);
            res.json(data);
        })
        .catch(err => {
            console.error('Error updating profile:', err);
            res.status(500).send('Error updating profile');
        });
});

// Route to update user password
router.post('/updatePassword', async (req, res) => {
    try {
        console.log(`Updating password for userId: ${req.body.userId}`);
        await profileController.updatePassword(req); // Assume this returns a promise but does not send a response
        console.log('Password updated successfully');
        res.json({ success: true }); // Send the response here
    } catch (err) {
        console.error('Error updating password:', err);
        if (!res.headersSent) {
            res.status(500).send('Error updating password'); // Check if the response hasn't been sent yet
        }
    }
});

module.exports = router;
