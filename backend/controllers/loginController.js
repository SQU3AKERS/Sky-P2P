const bcrypt = require('bcrypt');
const Users = require('../models/userModel'); // Adjust the path as needed
const { createSession } = require('../utils/sessionManager'); // Adjust the path as needed
const { validateEmail } = require('../utils/validation'); // Adjust the path as needed

const loginController = {};

  loginController.login = async (req, res) => {
    const { email, password } = req.body;

    try {
      // Validate Email
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Check if user exists
      const user = await Users.findOne({ where: { Email: email } });
      if (!user) {
        console.log('Login attempt with non-existent email:', email);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Compare password
      const match = await bcrypt.compare(password, user.PasswordHash);
      if (!match) {
        console.log('Password mismatch for user:', email);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create session
      const sessionId = createSession(req, { userID: user.UserID, userType: user.UserType });
      console.log('Login successful, session created:', sessionId);
      res.json({ success: true, sessionId: req.sessionID, userType: user.UserType, userID: user.UserID });

    } catch (err) {
      console.error('Login error for user:', email, 'Error:', err);
      res.status(500).json({ message: "Server error", error: err.message || err });
    }
  };

module.exports = loginController;


