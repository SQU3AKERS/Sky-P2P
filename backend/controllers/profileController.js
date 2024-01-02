const bcrypt = require('bcrypt');
const Users = require('../models/userModel');

const saltRounds = 10;

const profileController = {};

profileController.fetchUserProfile = async (userId) => {
    try {
      const userProfile = await Users.findOne({
        where: { UserID: userId },
        attributes: ['UserID', 'FirstName', 'LastName', 'Email', 'DateOfBirth', 'Nationality', 'UserType'] // Exclude PasswordHash for security
      });
  
      if (!userProfile) {
        console.log(`User profile not found for userId: ${userId}`);
        return null; // User not found
      }
  
      console.log(`User profile data retrieved for userId: ${userId}`);
      return userProfile; // Return the user profile data
    } catch (error) {
      console.error(`Error fetching user profile for userId: ${userId}:`, error);
      throw error; // Rethrow the error to handle it in the route
    }
  };

// Method to update user profile data
profileController.updateProfile = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { email } = req.body; // Only email is being updated

        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update only the email field
        await user.update({ Email: email });

        console.log(`User profile updated for userId: ${userId}`);
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error(`Error updating profile for userId ${userId}:`, error);
        res.status(500).send('Internal Server Error');
    }
};

// Method to update user password
profileController.updatePassword = async (req) => {
    return new Promise(async (resolve, reject) => {
        const { userId, currentPassword, newPassword } = req.body;

        try {
            const user = await Users.findByPk(userId);
            if (!user) {
                return reject({ status: 404, message: 'User not found' });
            }

            // Verify current password using bcrypt
            const isMatch = await bcrypt.compare(currentPassword, user.PasswordHash);
            if (!isMatch) {
                return reject({ status: 403, message: 'Current password is incorrect' });
            }

            // Hash the new password
            const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

            // Update to the new password hash
            await user.update({ PasswordHash: newPasswordHash });

            console.log(`Password updated for userId: ${userId}`);
            resolve({ message: 'Password updated successfully' });
        } catch (error) {
            console.error(`Error updating password for userId ${userId}:`, error);
            reject({ status: 500, message: 'Internal Server Error', error });
        }
    });
};

module.exports = profileController;
