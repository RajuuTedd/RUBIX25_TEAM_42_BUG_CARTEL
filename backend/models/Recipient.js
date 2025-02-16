const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["recipient"], default: "recipient" },
});

module.exports = mongoose.model("Recipient", RecipientSchema);
