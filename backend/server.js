import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Auth_Middleware,Main_tournament, LogoutRouter, RegisterRouter, AdminLoginRoute, Admincreate, LoginRouter, config, CreateRoom } from './index.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true // Allow cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/register', RegisterRouter);
app.use('/login', LoginRouter);
app.use('/admin/register',Auth_Middleware, Admincreate);
app.use('/admin/login',Auth_Middleware,AdminLoginRoute);
app.use('/admin/create', Auth_Middleware,CreateRoom);
app.use('/logout',LogoutRouter);
app.use('/mainpage',Auth_Middleware ,Main_tournament); // Ensure this is exported correctly

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Connect to MongoDB
mongoose.connect(config.mongoURL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Start server
const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));