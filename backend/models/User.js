const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String,  },
  latitude: { type: Number,  },
  longitude: { type: Number,  },
  role: { type: String, enum: ["volunteer"], default: "volunteer" },
});

module.exports = mongoose.model("User", UserSchema);
