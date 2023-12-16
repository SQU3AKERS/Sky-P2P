const bcrypt = require('bcrypt');
const database = require('../config/database');
const { createAccountAndStorePrivateKey } = require('../utils/blockchainAccountManager');

const saltRounds = 10;

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth, nationality, userType } = req.body;

  try {
    // Generate a new blockchain account and store the private key
    const blockchainAddress = await createAccountAndStorePrivateKey();

    // Hash the password
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Prepare the SQL query
    const insertQuery = `
      INSERT INTO Users (FirstName, LastName, PasswordHash, Email, DateOfBirth, Nationality, UserType, BlockchainAddress)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the SQL query
    database.query(insertQuery, [firstName, lastName, passwordHash, email, dateOfBirth, nationality, userType, blockchainAddress], (error, results) => {
      if (error) {
        // Handle SQL error
        return res.status(500).json({ message: "Error registering user", error: error.sqlMessage || error });
      }
      // Registration successful
      res.status(201).json({ message: "User registered successfully", userId: results.insertId });
    });
  } catch (error) {
    // Handle server error
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};

module.exports = {
  registerUser
};