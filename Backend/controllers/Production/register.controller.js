const User = require("../../models/user.model"); 
const bcrypt = require("bcryptjs");


const registerProductionWorker = async (req, res) => {
  try {
    const { name, email, password, profilePhoto } = req.body;

 
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email is already registered" });
    }

    
    const newUser = new User({
      name,
      email,
      password,
      role: "productionworker", 
      profilePhoto: profilePhoto || ""
    });

   
    await newUser.save();

   
    res.status(201).json({
      success: true,
      message: "Production worker registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profilePhoto: newUser.profilePhoto
      }
    });
  } catch (error) {
    console.error("Error registering production worker:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { registerProductionWorker };
