const express = require('express');
const { redeemPoints, verifyPayment } = require('../controllers/redeemController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, redeemPoints);
router.post('/verify-payment', protect, verifyPayment);

module.exports = router;
