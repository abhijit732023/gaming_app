import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import {AdminEmailSend,Slot_regi_router, Admin_fullcontrol_route,PaymentRouter,Auth_Middleware,Main_tournament, LogoutRouter, RegisterRouter, AdminLoginRoute, Admincreate, LoginRouter, config, CreateRoom } from './index.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'http://192.168.0.106:5173','https://gaming-app-six.vercel.app/' ];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  credentials: true // Allow cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/register', RegisterRouter);
app.use('/login', LoginRouter);
app.use('/admin/register', Admincreate);
app.use('/admin/login',AdminLoginRoute);
app.use('/admin/create',CreateRoom);
app.use('/logout',LogoutRouter);
app.use('/mainpage', Main_tournament); // Ensure this is exported correctly
app.use('/payment', PaymentRouter); // Ensure this is exported correctly
app.use('/admin', Admin_fullcontrol_route); // Ensure this is exported correctly
app.use('/team',Slot_regi_router ); // Ensure this is exported correctly
app.use('/email',AdminEmailSend ); // Ensure this is exported correctly

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
app.listen(PORT, () => console.log(`🚀 Server running on http://192.168.0.106:${PORT}`));
// railway link -p e8473d40-0a8a-4cdd-a73a-fb0b05924c77