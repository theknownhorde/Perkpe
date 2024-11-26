const express = require('express');
const { transferPoints } = require('../controllers/transferController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, transferPoints);

module.exports = router;