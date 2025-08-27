import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();

// Required to get __dirname in ES modules
const __dirname = path.resolve();

// Enable CORS for your deployed frontend
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Serve frontend in production (optional if you deploy frontend separately)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
