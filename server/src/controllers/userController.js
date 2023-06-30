import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendemail.js";
import crypto from "crypto";


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "please provide email and password" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user === null) {
    throw new Error("Invalid  email or password");
  } else {
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (validate) {
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1hr",
      });
      res.cookie("token", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 36000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({ success: true, message: user, token: token });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }
});
const logout = asyncHandler(
  asyncHandler(async (req, res) => {
    res.clearCookie("token");
    req.cookies.token = "";
    res.status(200).json({ success: true, message: "logout successfully" });
  })
);
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    throw new Error("provide all details during registeration ...");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  const code = crypto.randomBytes(32).toString("hex");

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedpassword,
    institution: req.body.institution,
    age: req.body.age,
    mood:[{"mood":"time"}]
  });
  const user = await newUser.save();
  sendEmail(req.body.email);
  res.status(200).json({ success: true, message: user });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.json({ success: true, message: users });
});

// @desc    Put user by ID
// @route   Put /api/user/:id

const getUserById = asyncHandler(async (req, res) => {
  const { id, newValue } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $push: { mood: newValue } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating field" });
  }
});

export { authUser, registerUser,logout, getUsers, getUserById };
