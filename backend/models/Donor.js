const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["donor"], default: "donor" },
});

module.exports = mongoose.model("Donor", DonorSchema);
