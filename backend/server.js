require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
// cors: Allows our React app (running on a different port) to talk to this server
// express.json: Allows the server to understand JSON data sent from the frontend
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- API Routes ---
// Any request to /api/todos will be handled by our todos.js router
const todoRoutes = require("./routes/todos");
app.use("/api/todos", todoRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.send("Todo App Backend is Running!");
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
