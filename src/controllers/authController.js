const jwt = require('jsonwebtoken');  
const User = require('../models/User');  
  
// Register a new user  
exports.register = async (req, res) => {  
  try {  
    const { name, email, password } = req.body;  
  
    // Check if user already exists  
    let user = await User.findOne({ email });  
    if (user) {  
      return res.status(400).json({ message: 'User already exists' });  
    }  
  
    // Create new user  
    user = new User({  
      name,  
      email,  
      password  
    });  
  
    await user.save();  
  
    // Create and return JWT  
    const payload = {  
      user: {  
        id: user.id  
      }  
    };  
  
    jwt.sign(  
      payload,  
      process.env.JWT_SECRET,  
      { expiresIn: '24h' },  
      (err, token) => {  
        if (err) throw err;  
        res.json({ token });  
      }  
    );  
  } catch (err) {  
    console.error(err.message);  
    res.status(500).send('Server error');  
  }  
};  
  
// Login user  
exports.login = async (req, res) => {  
  try {  
    const { email, password } = req.body;  
  
    // Check if user exists  
    const user = await User.findOne({ email });  
    if (!user) {  
      return res.status(400).json({ message: 'Invalid credentials' });  
    }  
  
    // Validate password  
    const isMatch = await user.comparePassword(password);  
    if (!isMatch) {  
      return res.status(400).json({ message: 'Invalid credentials' });  
    }  
  
    // Create and return JWT  
    const payload = {  
      user: {  
        id: user.id  
      }  
    };  
  
    jwt.sign(  
      payload,  
      process.env.JWT_SECRET,  
      { expiresIn: '24h' },  
      (err, token) => {  
        if (err) throw err;  
        res.json({ token });  
      }  
    );  
  } catch (err) {  
    console.error(err.message);  
    res.status(500).send('Server error');  
  }  
};