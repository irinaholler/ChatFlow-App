import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullname, username, email, password, confirmPassword } = req.body;
        if (!fullname || !username || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
        const exists = await User.findOne({
            $or: [{ username }, { email: email.toLowerCase().trim() }]
        });
        if (exists) {
            return res.status(400).json({ error: "Username or email already in use" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const profilePic = `https://avatar.iran.liara.run/username?username=${username}`;
        const newUser = new User({
            fullname,
            username,
            email: email.toLowerCase().trim(),
            password: hashed,
            profilePic
        });
        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            profilePic: newUser.profilePic
        });
    } catch (err) {
        console.error("Error in signup:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
        }
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (err) {
        console.error("Error in login:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0, httpOnly: true, sameSite: "Strict" });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Error in logout:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
