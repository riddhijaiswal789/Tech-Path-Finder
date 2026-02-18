const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const domainRoutes = require("./routes/domainRoutes"); // 👈 ADD THIS


dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/domains", domainRoutes); 


// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);



