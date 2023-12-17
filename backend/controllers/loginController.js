const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as needed.

// Function to handle user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Login failed, user not found.' });
    }

    const match = await bcrypt.compare(password, user.PasswordHash);
    if (!match) {
      return res.status(401).json({ message: 'Login failed, incorrect password.' });
    }

    // Replace 'your_jwt_secret' with your actual JWT secret key
    const token = jwt.sign({ id: user.UserID }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ 
      message: 'Login successful', 
      userType: user.UserType, 
      token 
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};

module.exports = { loginUser };
