import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const Auth_Middleware = express.Router();
Auth_Middleware.use(cookieParser());
Auth_Middleware.use(express.json());

Auth_Middleware.use((req, res, next) => {
  try {
    console.log("Headers: ", req.headers); // Log the headers for debugging
    console.log("Cookies: ", req.cookies); // Log the cookies object for debugging
    const token = req.cookies?.token; // Change 'authToken' to your actual cookie name
    console.log("Token: ", token);
    
    if (!token) {
      return res.status(401).json({ message: "Authentication cookie missing." });
    }

    if (token.length === 0) {
      return res.status(400).json({ message: "Authentication error: Invalid cookie length." });
    }

    // Verify the token
    jwt.verify(token, config.secretCode, (err, decoded) => { // Fix typo: 'screteCode' to 'secretCode'
      if (err) {
        return res.status(401).json({ message: "Invalid token." });
      }
      req.user = decoded; // Attach decoded token to request object
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default Auth_Middleware;