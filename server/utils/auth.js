require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Function to generate JWT token
function generateToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

// Register a new user
async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Username or email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser);

    res.status(201).json({ message: 'User registered successfully.', token });
  } catch (error) {
    console.error('Error registering user:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while registering user.' });
  }
}

// Login user
async function login(req, res) {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'An error occurred while logging in.' });
  }
}

module.exports = {
  register,
  login
};
