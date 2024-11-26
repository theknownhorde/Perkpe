const express = require('express');
const { updatePassword } = require('../controllers/settingsController');
const { protect } = require('../middlewares/authMiddleware'); // Ensure this path is correct
const router = express.Router();

router.put('/', protect, updatePassword);

module.exports = router;