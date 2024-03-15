const express = require("express");
const router = express.Router();
const {
  LoginUser,
  SignUpUser,
  getUsers,
  FindUserById,
} = require("../controllers/UserController");
const requireAuth = require("../middleware/requireAuth");

// Login Route
router.post("/login", LoginUser);

// Sign Up Route
router.post("/signup", SignUpUser);

// Get all users
router.get("/findall", getUsers);

// Get user by ID
router.get("/find/:id", FindUserById);

// Check token validity
router.post("/verifytoken", requireAuth);

module.exports = router;
