const Donor = require("../models/Donor");
const bcrypt = require("bcryptjs");

// Get all donors
exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a donor by ID
exports.getDonorById = async (req, res) => {
  const { id } = req.params;
  try {
    const donor = await Donor.findById(id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json(donor);
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
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    const donor = new Donor({
      organizationName,
      ownerName,
      email,
      phone,
      location,
      latitude,
      longitude,
      password: hashedPassword, // Store the hashed password
    });
    await donor.save();
    res.status(201).json({ message: "Donor added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a donor
exports.updateDonor = async (req, res) => {
  const { id } = req.params;
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
    // Hash the password if it's being updated
    const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined;

    const updatedDonor = await Donor.findByIdAndUpdate(
      id,
      {
        organizationName,
        ownerName,
        email,
        phone,
        location,
        latitude,
        longitude,
        password: hashedPassword, // Update the password if provided
      },
      { new: true } // Return the updated document
    );

    if (!updatedDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json({ message: "Donor updated successfully", donor: updatedDonor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a donor
exports.deleteDonor = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDonor = await Donor.findByIdAndDelete(id);
    if (!deletedDonor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};