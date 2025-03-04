import express from "express";

const LogoutRouter = express.Router();

LogoutRouter.post("/", (req, res) => {
    res.clearCookie("token", { 
        httpOnly: true, 
        secure: false, // Set true in production
        sameSite: "Lax",
        path: "/" // Important to match cookie path
    });

    res.status(200).json({ message: "Logout successful" });
});

export default LogoutRouter;
