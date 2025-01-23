const User = require("../models/User");
const Donor = require("../models/Donor");
const Recipient = require("../models/Recipient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user (volunteer, donor, or recipient)
exports.register = async (req, res) => {
  const { name, email, password, phone, location, role } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    if (role === "volunteer") {
      user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        location,
      });
    } else if (role === "donor") {
      user = new Donor({
        organizationName: name,
        ownerName: name,
        email,
        password: hashedPassword,
        phone,
        location,
      });
    } else if (role === "recipient") {
      user = new Recipient({
        organizationName: name,
        contactPerson: name,
        email,
        password: hashedPassword,
        phone,
        location,
      });
    } else {
      return res.status(400).json({ error: "Invalid role" });
    }

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user =
      (await User.findOne({ email })) ||
      (await Donor.findOne({ email })) ||
      (await Recipient.findOne({ email }));

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET||"secretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
