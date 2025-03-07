const Auth_Middleware = (req, res, next) => {
    const authCookie = req.cookies?.token; // Change 'authToken' to your actual cookie name
    
    if (!token) {
        return res.status(401).json({ message: "Authentication cookie missing." });
    }

    if (token.length < 0) {
        return res.status(400).json({ message: "Authentication error: Invalid cookie length." });
    }
    
    next();
};

export default Auth_Middleware