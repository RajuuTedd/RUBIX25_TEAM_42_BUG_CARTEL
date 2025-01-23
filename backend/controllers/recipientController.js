const Recipient = require("../models/Recipient");
const bcrypt = require("bcryptjs");

// Get all recipients
exports.getAllRecipients = async (req, res) => {
  try {
    const recipients = await Recipient.find();
    res.status(200).json(recipients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a recipient by ID
exports.getRecipientById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipient = await Recipient.findById(id);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }
    res.status(200).json(recipient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new recipient
exports.addRecipient = async (req, res) => {
  const {
    organizationName,
    contactPerson,
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

    const recipient = new Recipient({
      organizationName,
      contactPerson,
      email,
      phone,
      location,
      latitude,
      longitude,
      password: hashedPassword, // Store the hashed password
    });
    await recipient.save();
    res.status(201).json({ message: "Recipient added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a recipient
exports.updateRecipient = async (req, res) => {
  const { id } = req.params;
  const {
    organizationName,
    contactPerson,
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

    const updatedRecipient = await Recipient.findByIdAndUpdate(
      id,
      {
        organizationName,
        contactPerson,
        email,
        phone,
        location,
        latitude,
        longitude,
        password: hashedPassword, // Update the password if provided
      },
      { new: true } // Return the updated document
    );

    if (!updatedRecipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    res.status(200).json({ message: "Recipient updated successfully", recipient: updatedRecipient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a recipient
exports.deleteRecipient = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipient = await Recipient.findByIdAndDelete(id);
    if (!deletedRecipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }
    res.status(200).json({ message: "Recipient deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};