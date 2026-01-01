const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  signupValidation,
  loginValidation
} = require("../controllers/auth.controller"); // make sure the path is correct

// Apply express-validator middleware before the route handler
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

module.exports = router; // ✅ export router
