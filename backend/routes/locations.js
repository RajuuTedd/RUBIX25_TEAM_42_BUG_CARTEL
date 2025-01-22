const express = require("express");
const router = express.Router();
const donorController = require("../controllers/donorController");
const recipientController = require("../controllers/recipientController");

// Get all donors and recipients
router.get("/", async (req, res) => {
  try {
    const donors = await donorController.getAllDonors(req, res);
    const recipients = await recipientController.getAllRecipients(req, res);
    res.status(200).json({ donors, recipients });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
