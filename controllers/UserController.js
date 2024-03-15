const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

import { firebase } from "../firebase";

// Sign Tokens
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "5h" });
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const FindUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const { password, ...userWithoutPassword } = user.toObject(); // Assuming user is a Mongoose document
    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const isAdmin = user.isAdmin;
    res.status(200).json({ email, token, isAdmin });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sign Up User
const SignUpUser = async (req, res) => {
  const { name, email, phone, password, profilePhoto } = req.body;
  try {
    firebase.auth().createUser({
      email: email,
      emailVerified: false,
      phoneNumber: phone,
      password: password,
      displayName: name,
      photoURL: profilePhoto,
      disabled: false,
    });
    const user = await User.signup(name, email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  LoginUser,
  SignUpUser,
  getUsers,
  FindUserById,
};
