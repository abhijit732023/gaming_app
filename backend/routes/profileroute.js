const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Assuming you have a User model
const ProfileRouter = express.Router();
// Profile route
router.get('/profile', async (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
        const user = await User.findById(req.session.user._id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const profileDetails = {
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            bio: user.bio || 'No bio available',
            avatar: user.avatar || 'default-avatar.png'
        };
        
        res.json(profileDetails);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = { checkAuth, router };
