const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err.message);
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
};