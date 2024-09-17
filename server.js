const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const recordingRoutes = require("./Routes/recordingRoutes");
const path = require("path");
const connectDB = require("./Connection");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", recordingRoutes);
app.use("/", express.static(path.join(__dirname, "/uploads")));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
