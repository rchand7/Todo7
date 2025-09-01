import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import todoRoute from "../backend/routes/todo.route.js";
import userRoute from "../backend/routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;
const DB_URI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://todo-1-73bt.onrender.com", // Wrap in quotes
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Use array instead of string
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect to MongoDB
(async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
})();

// Routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
