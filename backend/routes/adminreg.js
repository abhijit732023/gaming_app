import express from "express";
import bcrypt from "bcrypt";
import AdminLoginModel from "../models/adminloginmodel"; // Correct the import path

const RegisterAdmin = express.Router();

RegisterAdmin.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email already exists
    const emailExist = await AdminLoginModel.findOne({ email: email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check if username already exists
    

    // Create new user with hashed password
    const user = await AdminLoginModel.create({
  
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default RegisterAdmin;
