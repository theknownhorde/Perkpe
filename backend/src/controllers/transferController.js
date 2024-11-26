const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.transferPoints = async (req, res) => {
    const { email, platform, points } = req.body;

    try {
        const sender = await User.findById(req.user.id);
        const receiver = await User.findOne({ email });

        if (!receiver) return res.status(404).json({ error: 'Receiver not found' });
        if (!sender.points[platform] || sender.points[platform] < points) {
            return res.status(400).json({ error: 'Insufficient points' });
        }

        sender.points[platform] -= points;
        receiver.points[platform] = (receiver.points[platform] || 0) + points;

        await sender.save({ validateBeforeSave: false });
        await receiver.save({ validateBeforeSave: false });

        await Transaction.create({
            fromUser: sender.id,
            toUser: receiver.id,
            platform,
            points,
            type: 'transfer',
        });

        res.status(200).json({ message: 'Points transferred successfully' });
    } catch (err) {
        console.error('[ERROR] Transfer Failed:', err.message);
        res.status(500).json({ error: 'Failed to transfer points' });
    }
};
