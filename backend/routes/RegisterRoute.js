import express from "express";
import bcrypt from "bcrypt";
import createuser from "../models/createuser.js"; // Correct the import path

const RegisterRouter = express.Router();

RegisterRouter.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if email already exists
    const emailExist = await createuser.findOne({ email: email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check if username already exists
    const usernameExist = await createuser.findOne({ username: username });
    if (usernameExist) {
      return res.status(401).json({ message: "Username already in use" });
    }

    // Create new user with hashed password
    const user = await createuser.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default RegisterRouter;
