const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Adjust the path as needed
const { validateEmail, validatePassword } = require('../utils/validation'); // Adjust the path as needed

const saltRounds = 10;

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth, nationality, userType } = req.body;

  try {
    // Validate Email and Password
    if (!validateEmail(email) || !validatePassword(password)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      passwordHash,
      email,
      dateOfBirth,
      nationality,
      userType
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
