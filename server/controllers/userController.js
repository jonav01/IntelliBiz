const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");


dotenv.config();

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error("Body is missing!");
  }

  const checkUserExists = await userModel.findOne({ email });
  if (checkUserExists) {
    res.status(400);
    throw new Error("This email is already in use !");
  } else {
    const encryptPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      phone,
      password: encryptPassword,
    });
    if (user) {
      res.status(200);
      res.json({ id: user._id, name: user.name, phone: user.phone });
    } else {
      res.status(400);
      throw new Error("Cannot create user!");
    }
  }
});

// Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Body is missing!");
  }

  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    const options = { expiresIn: "12h" };
    const accessToken = await jwt.sign(
      payload,
      process.env.JWT_SECRET,
      options
    );
    res.status(200);
    res.json({ accessToken });
  } else {
    res.status(404);
    throw new Error("User not found.Email or password entered wrong");
  }
});

module.exports = { loginUser, registerUser };
