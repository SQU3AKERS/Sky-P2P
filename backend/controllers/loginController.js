const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const database = require('../config/database');

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received for email:', email);

  database.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.log('Database error:', err);
      return res.status(500).send('Internal server error');
    }

    if (results.length === 0) {
      return res.status(401).send('User does not exist');
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);
    if (!isPasswordValid) {
      return res.status(401).send('Password is incorrect');
    }

    const token = jwt.sign({ id: user.UserID }, process.env.JWT_SECRET, { expiresIn: 86400 });
    res.send({ user: { id: user.UserID, email: user.Email, userType: user.UserType }, token });
  });
};

module.exports = { handleLogin };
