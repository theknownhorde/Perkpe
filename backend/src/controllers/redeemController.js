const Razorpay = require('razorpay');
const crypto = require('crypto');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Initialize Razorpay instance with environment variables
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_4E5ZrpYhNWR2ti',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'ZEYk93BapnoQurNePuU3ltYN',
});

/**
 * Redeem Points Controller
 */
exports.redeemPoints = async (req, res) => {
    const { platform, points, amount } = req.body;

    try {
        console.log('[DEBUG] Redeem request received:', req.body);

        // Fetch user
        const user = await User.findById(req.user.id);
        if (!user) {
            console.error('[ERROR] User not found for ID:', req.user.id);
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('[DEBUG] User data fetched successfully:', user);

        // Check points balance
        if (!user.points[platform] || user.points[platform] < points) {
            console.error('[ERROR] Insufficient points for platform:', platform);
            return res.status(400).json({ error: 'Insufficient points' });
        }

        // Deduct points from user's account
        user.points[platform] -= points;
        await user.save();

        console.log('[DEBUG] Points deducted from user account:', user.points);

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert to paise
            currency: 'INR',
        });

        console.log('[DEBUG] Razorpay order created:', order);

        // Create transaction record
        const transaction = new Transaction({
            fromUser: user._id, // Provide fromUser field
            platform,
            points,
            type: 'redeem', // Provide type field
            createdAt: new Date(),
        });
        await transaction.save();

        console.log('[DEBUG] Transaction record created:', transaction);

        res.json({ success: true, message: `${points} points redeemed for ₹${amount} on ${platform}`, order, transaction });
    } catch (err) {
        console.error('[ERROR] Redeem points failed:', err.message);
        res.status(500).json({ error: 'Failed to redeem points' });
    }
};

/**
 * Verify Razorpay Payment
 */
exports.verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'ZEYk93BapnoQurNePuU3ltYN')
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    if (generated_signature === razorpay_signature) {
        res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
};