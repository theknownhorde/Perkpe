const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Fetch points for the logged-in user
exports.getPoints = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ points: user.points });
    } catch (err) {
        console.error('[ERROR] Fetch Points Failed:', err.message);
        res.status(500).json({ error: 'Failed to fetch points' });
    }
};

// Fetch transaction history for the logged-in user
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [{ fromUser: req.user.id }, { toUser: req.user.id }],
        })
            .populate('fromUser', 'name email')
            .populate('toUser', 'name email')
            .sort({ createdAt: -1 });

        res.json({ transactions });
    } catch (err) {
        console.error('[ERROR] Fetch Transactions Failed:', err.message);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};
