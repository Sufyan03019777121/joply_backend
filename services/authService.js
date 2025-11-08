import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/authModel.js";



export const registerUser = async (userData) => {
  const { username, email, password, address, bio } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword, address, bio });
  await user.save();
  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return { user, token };
};

export const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};
