const express = require("express");
const User = require("../models/users");
const bcryptjs = require("bcryptjs");
const UserError = require("../utils/UserError");
const jwt = require("jsonwebtoken");

const signUp = async (req, res,next) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    const response = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created Successfully" });
  } catch (error) {
    // res.status(500).send(error);
    next(error);
  }
};

const singin = async (req, res,next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email});
    if(!user) return res.status(404).json({ message: "user not found"});
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: "Invalid Credentials" });
    } 
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const expired = new Date(Date.now() + 3600000);
      const { password:hashedPassword, ...rest } = user._doc;
      res
        .cookie("accessToken", token, { httpOnly: true, expires: expired })
        .status(200)
        .json(rest)
  } catch (error) {
    // res.status(404).json({ message: error.message});
    next(error);
  }
};
module.exports = { signUp, singin };
