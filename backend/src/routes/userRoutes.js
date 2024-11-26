const express = require('express');
const { registerUser, loginUser, googleLogin, logoutUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);
router.post('/logout', logoutUser);

module.exports = router;