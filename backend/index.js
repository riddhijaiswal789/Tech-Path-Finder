const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const adminRoute = require("./Routes/admin");
const studentRoute = require("./Routes/student");
const quizRoute = require("./Routes/quizRoutes");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/tech", adminRoute);
app.use("/api/tech", studentRoute);
app.use("/api/quiz", quizRoute); // ✅ New quiz route

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/techPath", {})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
