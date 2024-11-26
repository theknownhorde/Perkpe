const express = require('express');
const { getPoints, getTransactions } = require('../controllers/pointsController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', protect, getPoints);
router.get('/transactions', protect, getTransactions);

module.exports = router;
