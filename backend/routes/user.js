const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign-up API  
router.post("/sign-in", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || username.length < 4) {
            return res.status(400).json({ message: "Username must be at least 4 characters long" });
        }
        if (!email || email.length < 5) {
            return res.status(400).json({ message: "Valid email is required" });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashPass,
        });

        await newUser.save();
        return res.status(200).json({ message: "User created successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login API (Fix: Changed from GET to POST, and ensured token includes user ID)
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate token with `userId`
        const token = jwt.sign(
            { userId: existingUser._id, username: existingUser.username }, 
            "tcmTM",
            { expiresIn: '2d' }
        );

        res.status(200).json({ userId: existingUser._id, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router; 
