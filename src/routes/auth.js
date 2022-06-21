const express = require("express");
const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const checkLogin = require("../middlewares/checkLogin");
const user = express.Router();

// SignUp User
user.post('/signup', async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(503).json({
                message: "User already registered"
            })
        }
        const newUser = await new User({
            name,
            email,
            password
        })
        const data = await newUser.save();
        if (data) {
            const loadFindUserData = await User.findOne({ email: data?.email })
            const token = jwt.sign({
                userId: loadFindUserData._id
            }, process.env.SECRET_JWT_KEY, {
                expiresIn: "7d"
            });
            res.status(201).json({
                token,
                message: "User registered successfully!"
            })
        }

    } catch (error) {
        res.status(403).json({
            error: error.message
        })
    }
})
// SignIn User
user.post('/signin', async (req, res) => {
    const { password, email } = req.body;
    try {
        const findUser = await User.findOne({ email });
        if (findUser) {
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (!isMatch) {
                return res.status(403).json({
                    error: "Invalid Credentials!"
                })
            } else {
                const token = jwt.sign({
                    userId: findUser._id
                }, process.env.SECRET_JWT_KEY, {
                    expiresIn: "7d"
                });
                res.status(201).json({
                    token,
                    message: "User login successfully!"
                })
            }
        }
    }
    catch (error) {
        res.status(403).json({
            error: error.message
        })
    }
})
// Login user data load
user.get("/profile", checkLogin, async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.userId }).select("-password")
        if (data) {
            res.status(200).json({
                data
            });
        } else {
            res.status(404).json({
                error: "User not found"
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


user.get("/load_user", async (req, res) => {
    try {
        const data = await User.find({}).select("-password")
        res.status(200).json({
            data,
            message: "User list load"
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = user;