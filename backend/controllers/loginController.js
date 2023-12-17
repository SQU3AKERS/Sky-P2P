const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const login = async (email, password) => {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // If successful, return the user (or a token, etc.)
    return { message: 'Login successful', user };
};

module.exports = {
    login,
};
