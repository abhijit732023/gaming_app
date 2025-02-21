import express from "express";
import bcrypt from "bcrypt";
import createuser from "../models/createuser.js"; // Ensure the correct model path

const LoginRouter = express.Router();

LoginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists by email
    const user = await createuser.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

export default LoginRouter;
