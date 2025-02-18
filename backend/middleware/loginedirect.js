import jwt from "jsonwebtoken";
import { User } from "../models/User";
import config from './config/config.js';

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.authToken; // Assuming the token is stored in a cookie named 'authToken'

    if (!token) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    try {
        const decoded = jwt.verify(token,config.screteCode ); // Verify the token
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token. Please log in again." });
    }
};

module.exports = authMiddleware;
