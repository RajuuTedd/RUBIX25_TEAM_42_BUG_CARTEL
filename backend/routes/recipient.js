const express = require("express");
const router = express.Router();
const recipientController = require("../controllers/recipientController");

// Get all recipients
router.get("/", recipientController.getAllRecipients);

// Add a new recipient
router.post("/", recipientController.addRecipient);

module.exports = router;
