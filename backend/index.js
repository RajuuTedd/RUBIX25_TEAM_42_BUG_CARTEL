const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/auth.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI||"mongodb://localhost:27017/feed", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  foodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  date: { type: Date, required: true },
  isAvailable:{type:Boolean}
});

// Donation Model
const Donation = mongoose.model('Donation', donationSchema);

// Routes
app.post('/donate', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).send({ message: 'Donation successfully saved!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to save donation' });
  }
});

app.get('/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).send(donations);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch donations' });
  }
});
app.use("/api/auth", router);
app.use("/api/donors", require("./routes/donor"));
app.use("/api/recipients", require("./routes/recipient"));
app.use("/api/locations", require("./routes/locations"));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
