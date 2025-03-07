import express from "express"; 
import bcrypt from "bcrypt"; 
import createuser from '../../models/Users/createuser.js'; 
import cookieParser from "cookie-parser"; 
import jwt from "jsonwebtoken"; 
import config from "../../config/config.js"; 

const LoginRouter = express.Router(); 
LoginRouter.use(cookieParser()); 

LoginRouter.post("/", async (req, res) => { 
  try {
    const { email, password } = req.body; 
    console.log("Received data:", req.body); 

    // Find a user by email
    const user = await createuser.findOne({ email: email }); 
    console.log(user); 
    
    if (!user) { 
      return res.status(401).json({ message: "Invalid email or password" }); 
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password); 
    console.log("Password match:", isPasswordValid); 
    
    if (!isPasswordValid) { 
      return res.status(401).json({ message: "Invalid email or password" }); 
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email, username: user.username }, config.screteCode, { expiresIn: '7d' }); 
    // Set a cookie with the token
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: 'Lax' // Adjust as needed
    }); 

    res.status(200).json({ message: "Login successful", user }); 
  } catch (error) { 
    console.error("Login error:", error.message); 
    res.status(500).json({ error: error.message || "Internal Server Error" }); 
  }
});

export default LoginRouter;