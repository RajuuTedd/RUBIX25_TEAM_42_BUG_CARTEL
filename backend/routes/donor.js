const express = require("express");
const router = express.Router();
const donorController = require("../controllers/donorController");
router.get("/", (req, res) => {
  res.send("Donor route working");
});
// Get all donors
router.get("/", donorController.getAllDonors);
router.get("/:id", donorController.getDonorById);
// Add a new donor
router.post("/", donorController.addDonor);

module.exports = router;
