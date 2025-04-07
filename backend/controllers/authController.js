const User = require('../models/User');

// Simple login without authentication for the demo

exports.login = async (req, res) => {
  try {
    const { email } = "abc@example.com";
    
    // Find user by email or create a dummy user
    let user = await User.findOne({ email });
    
    // if (!user) {
    //   // Create a dummy user for demo purposes
    //   user = await User.create({
    //     name: 'default test user',
    //     email
    //   });
    // }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};