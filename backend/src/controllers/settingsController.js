const User = require('../models/User');

exports.updatePassword = async (req, res) => {
    const { password } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.password = password; // Ensure you hash the password before saving
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error updating password:', err.message);
        res.status(500).json({ error: 'Failed to update password' });
    }
};