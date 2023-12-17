const bcrypt = require('bcrypt');
const database = require('../config/database');

const saltRounds = 10;

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth, nationality, userType } = req.body;

  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Prepare the SQL query
    const insertQuery = `
      INSERT INTO users (FirstName, LastName, PasswordHash, Email, DateOfBirth, Nationality, UserType)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the SQL query
    database.query(insertQuery, [firstName, lastName, passwordHash, email, dateOfBirth, nationality, userType], (error, results) => {
      if (error) {
        // Handle SQL error
        console.log("SQL error", error);
        return res.status(500).json({ message: "Error registering user", error: error.sqlMessage || error });
      }
      // Registration successful
      console.log("Registration successful", results);
      res.status(201).json({ message: "User registered successfully", userId: results.insertId });
    });
  } catch (error) {
    // Handle server error
    console.log("Server error", error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};

module.exports = {
  registerUser
};
