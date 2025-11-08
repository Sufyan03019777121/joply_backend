import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/authModel.js"; 

// ========================
// 🧩 SIGNUP
// ========================
export const signup = async (req, res) => {
  try {
    const { username, email, password, address, bio } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      username, // <-- name کی بجائے username
      email,
      password: hashedPassword,
      address,
      bio,
    });

    res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ========================
// 🧩 LOGIN
// ========================
export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Check if user exists by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user)
      return res.status(400).json({ message: "Invalid email/username or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email/username or password" });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "mysecretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ========================
// 🧩 PROFILE (Protected)
// ========================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
