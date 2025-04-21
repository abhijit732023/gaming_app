import express from "express";
import bcrypt from "bcrypt";
import createuser from "../../models/Users/createuser.js"; // Correct the import path

const RegisterRouter = express.Router();

RegisterRouter.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Received registration data:", req.body); // Log the received data

    // Check if username already exists
    const usernameExist = await createuser.findOne({ username: username });
    if (usernameExist) {
      return res.status(401).json({ message: "Username already in use" });
    }

    // Check if email already exists
    const emailExist = await createuser.findOne({ email: email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password before storing it
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user with hashed password
    const user = await createuser.create({
      username, // Ensure username is included
      email,
      password: hashedPassword, // Store the hashed password
    });

    console.log("User registered successfully:", user); // Log the successful registration
    res.status(201).json({ message: "User registered successfully", user: user });
  } catch (error) {
    console.error("Error registering user:", error.message); // Log any errors
    res.status(500).json({ error: error.message });
  }
});

export default RegisterRouter;