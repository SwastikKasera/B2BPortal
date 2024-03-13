const bcrypt = require('bcrypt');
const User = require('../models/Company.model'); // Adjust the path based on your project structure

const Register = async (req, res) => {
  const { companyName, companySize, email, password } = req.body;
  try {

    if(!companyName || !companySize || !email || !password){
      return res.send(404).json({
        message:"Some Field are empty",
      })
    }

    const existingEmail = await User.findOne({email})
    if(existingEmail){
      return res.send(402).json({
        message:"Email already exist"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ companyName, companySize, email, password: hashedPassword });
    console.log(newUser);
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = Register;
