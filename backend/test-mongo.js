require("dotenv").config();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI||"mongodb://localhost:27017/feed")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
