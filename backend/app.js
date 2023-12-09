const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://rajbpatel285:raj%40123@cluster0.kfguwza.mongodb.net/user",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
