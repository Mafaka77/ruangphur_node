require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/admin_routes");
const apiRoutes=require("./routes/api_routes");
const app = express();
const path = require("path");

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes
// app.use("/api/admin", adminRoutes);
app.use("/api/auth", require("./routes/auth_routes"));
app.use("/api", apiRoutes);
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
