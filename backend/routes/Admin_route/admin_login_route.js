import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminRegisterModel, config } from '../../index.js';
import cookieParser from "cookie-parser";
const AdminLoginRoute = express.Router();
AdminLoginRoute.use(cookieParser())
// Admin Login Route
AdminLoginRoute.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log('cookies',req.cookies);
  
  try {
    // Check if the admin exists
    const admin = await AdminRegisterModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, email: admin.email ,username:admin.username}, config.screteCode, { expiresIn: '1h' });

    // Send success response with redirect URL
    res.json({ 
      message: "Login successful", 
      token, 
      user: { username: admin.username, email: admin.email },
      redirect: "/admin" // Redirect URL for frontend
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default AdminLoginRoute;
