const database = require('../config/database');
const bcrypt = require('bcrypt');
const { createSession } = require('../utils/sessionManager');

const loginController = {
  login: (req, res) => {
    const { email, password } = req.body;
    console.log('Attempting database connection...');
    // Use the existing database connection or pool
    const query = 'SELECT * FROM Users WHERE Email = ?';
    database.query(query, [email], async (err, results) => {
      // Error report
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).send('Error querying the database');
      }
      console.log('Connected to database. Yay!');
      // Login process
      if (results.length > 0) {
        try {
          const match = await bcrypt.compare(password, results[0].PasswordHash);
          if (match) {
          const sessionId = createSession(results[0].UserID, results[0].UserType);
          res.json({ success: true, sessionId, userType: results[0].UserType });
          } else {
            console.log('Invalid credentials. Unable to create session.');
            res.status(401).send('Invalid credentials. Unable to create session.');
          }
        } catch (bcryptError) {
          console.error('Bcrypt error:', bcryptError);
          res.status(500).send('Server error');
        }
      } else {
        console.log('Invalid credentials. It does not exist.');
        res.status(401).send('Invalid credentials. It does not exist.');
      }
    });
  }
};

module.exports = loginController;
