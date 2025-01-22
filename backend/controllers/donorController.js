const Donor = require("../models/Donor");

// Get all donors
exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new donor
exports.addDonor = async (req, res) => {
  const {
    organizationName,
    ownerName,
    email,
    phone,
    location,
    latitude,
    longitude,
    password,
  } = req.body;

  try {
    const donor = new Donor({
      organizationName,
      ownerName,
      email,
      phone,
      location,
      latitude,
      longitude,
      password,
    });
    await donor.save();
    res.status(201).json({ message: "Donor added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
