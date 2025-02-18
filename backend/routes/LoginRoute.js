const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Assuming you have a User model
const LoginRouter = express.Router();

// Middleware to check authentication
function checkAuth(req, res, next) {
    if (req.session && req.session.user) {
        return res.redirect('/home');
    }
    return res.redirect('/login');
}

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        req.session.user = user;
        res.redirect('/home');
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = { LoginRouter, router };
