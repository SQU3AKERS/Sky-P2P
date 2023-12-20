const bcrypt = require('bcrypt');
const Users = require('../models/userModel');
const { validateEmail, validatePassword } = require('../utils/validation');

const saltRounds = 10;

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth, nationality, userType } = req.body;

  try {
    // Validate Email and Password
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format. Please enter a valid email address." });
    }

    // Check if email already exists in the database
    const existingUser = await Users.findOne({ where: { Email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered. Please use a different email." });
    }

    // Validate Password
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        message: "Invalid password. Password must be 8 to 32 characters long, include at least one lowercase letter, one number, and one special character (!@#$%^&*)." 
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, saltRounds);

    console.log('PasswordHash creation attempt:', passwordHash);

    // Create new user
    const newUser = await Users.create({
      FirstName: firstName,
      LastName: lastName,
      PasswordHash: passwordHash,
      Email: email,
      DateOfBirth: dateOfBirth,
      Nationality: nationality,
      UserType: userType
    });

    console.log("Registration successful", newUser);
    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message || error });
  }
};

module.exports = {
  registerUser
};
