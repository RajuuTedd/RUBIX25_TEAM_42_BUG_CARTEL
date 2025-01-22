const Recipient = require("../models/Recipient");

// Get all recipients
exports.getAllRecipients = async (req, res) => {
  try {
    const recipients = await Recipient.find();
    res.status(200).json(recipients);
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
    const recipient = new Recipient({
      organizationName,
      contactPerson,
      email,
      phone,
      location,
      latitude,
      longitude,
      password,
    });
    await recipient.save();
    res.status(201).json({ message: "Recipient added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
