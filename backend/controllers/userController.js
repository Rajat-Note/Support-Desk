const asyncHandler = require("express-async-handler");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please give all fields");
  }

  // Check if user exists
  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(400);
    throw new Error("User already exits!!");
  }

  // Hash the password
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data!!");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check if user exits && password is correct
  if (user && (await bycrypt.compare(password, user.password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials!!");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
