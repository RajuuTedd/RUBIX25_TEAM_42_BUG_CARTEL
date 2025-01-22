const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register a new user
router.post("/register", authController.register);

// Login a user
router.post("/login", authController.login);
router.get("/", (req, res) => {
  res.send("Auth route working");
});
module.exports = router;
