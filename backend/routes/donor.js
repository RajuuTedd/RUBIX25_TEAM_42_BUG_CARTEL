const express = require("express");
const router = express.Router();
const donorController = require("../controllers/donorController");
router.get("/", (req, res) => {
  res.send("Donor route working");
});
// Get all donors
router.get("/", donorController.getAllDonors);

// Add a new donor
router.post("/", donorController.addDonor);

module.exports = router;
