const express = require("express");
const router = express.Router();
const { loginUser } = require("../../controllers/auth/auth.controller");
const User = require('../../models/user.model');

router.post("/login", loginUser);
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, role, profilePhoto } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Create and save new user
    const newUser = new User({
      name,
      email,
      password,
      role,
      profilePhoto
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
