import express from "express";
import bcrypt from "bcrypt"; // Ensure bcrypt is imported
import AdminLoginModel from "../models/adminloginmodel.js"; // Correct the import path

const AdminLogin = express.Router();

AdminLogin.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await AdminLoginModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default AdminLogin;
