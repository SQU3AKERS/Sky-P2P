const mysql = require('mysql');
const databaseConfig = require('../config/database');
const { createSession } = require('../utils/sessionManager'); // Import the session manager

const loginController = {
  login: (req, res) => {
    const { email, password } = req.body;
    const connection = mysql.createConnection(databaseConfig);

    connection.connect(err => {
      if (err) {
        console.error('Database connection failed: ' + err.stack);
        return res.status(500).send('Error connecting to database');
      }

      console.log('Connected to database.');
    });

    const query = 'SELECT * FROM Users WHERE Email = ?';
    connection.query(query, [email], (err, results) => {
      connection.end();

      if (err) {
        console.error(err);
        return res.status(500).send('Error querying the database');
      }

      if (results.length > 0 && results[0].PasswordHash === password) {
        const sessionId = createSession(results[0].UserID, results[0].UserType);
        return res.json({ success: true, sessionId, userType: results[0].UserType });
      } else {
        return res.status(401).send('Invalid credentials');
      }
    });
  }
};

module.exports = loginController;
