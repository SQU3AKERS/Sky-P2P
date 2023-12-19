const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { createSession } = require('../utils/sessionManager');

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { Email: email } });
      if (!user) {
        console.log('No such user:', user);
        return res.status(401).send('Invalid credentials');
      }
      const match = await bcrypt.compare(password, user.PasswordHash);
      if (!match) {
        console.log('Password mismatch:', match);
        return res.status(401).send('Invalid credentials');
      }
      const sessionId = createSession(user.UserID, user.UserType);
      console.log('Session created:', sessionId);
      res.json({ success: true, sessionId, userType: user.UserType });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).send('Server error');
    }
  }
};

module.exports = loginController;
