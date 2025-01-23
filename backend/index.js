const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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
app.use("/api/auth", require("./routes/auth"));
app.use("/api/donors", require("./routes/donor"));
app.use("/api/recipients", require("./routes/recipient"));
app.use("/api/locations", require("./routes/locations"));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
