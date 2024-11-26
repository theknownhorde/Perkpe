const express = require('express');
const { getUserProfile } = require('../controllers/profileController');
const { protect } = require('../middlewares/authMiddleware'); // Ensure this path is correct
const router = express.Router();

router.get('/', protect, getUserProfile);

module.exports = router;