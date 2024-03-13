const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Company.model'); // Adjust the path based on your project structure

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ companyId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '4h', // You can adjust the expiration time as needed
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = Login;
