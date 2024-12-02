const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Initialize Google OAuth2 client
const client = new OAuth2Client('1021986147883-l5m87q49h95fmh2ir9kd1kcgaj2dq9gd.apps.googleusercontent.com');

// JWT Secret Key
const JWT_SECRET = '81ff521e0899ba370ac3c1ae63555de14f25a409bce524d1679699857fad2d13c5553266678d618a1cfb8091f8f98086fd5697b20efaa466d8f99081746c9313';

// Generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Register User
 */
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            console.error('[ERROR] User already exists:', email);
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword });

        const token = generateToken(user._id);
        console.log('[DEBUG] User registered successfully:', user);

        res.status(201).json({ 
            token, 
            user: { id: user._id, name: user.name, email: user.email } 
        });
    } catch (err) {
        console.error('[ERROR] Error in registerUser:', err.message);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
};

/**
 * Login User
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Server: ");
    console.log(email, password);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error('[ERROR] User not found:', email);
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        console.log(user);
        console.log("bycrypt:");
        const hashed = await bcrypt.hash(password, 10)
        console.log(hashed);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log()
        if (!isMatch) {
            console.error('[ERROR] Incorrect password for:', email);
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        console.log('[DEBUG] User logged in successfully:', user);

        res.json({ 
            token, 
            user: { id: user._id, email: user.email, name: user.name } 
        });
    } catch (err) {
        console.error('[ERROR] Error in loginUser:', err.message);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
};

/**
 * Google Login
 */
exports.googleLogin = async (req, res) => {
    const { tokenId } = req.body;

    try {
        // Verify the token using Google OAuth client
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: '1021986147883-l5m87q49h95fmh2ir9kd1kcgaj2dq9gd.apps.googleusercontent.com',
        });

        const { email, name } = ticket.getPayload();
        console.log('[DEBUG] Google token verified. Email:', email);

        // Check if the user already exists, or create a new user
        let user = await User.findOne({ email });
        if (!user) {
            console.log('[DEBUG] New Google user. Creating account for:', email);
            const hashedPassword = await bcrypt.hash('defaultpassword', 10); // Default password for Google users
            user = await User.create({ name, email, password: hashedPassword });
        }

        // Generate JWT token
        const token = generateToken(user._id);
        console.log('[DEBUG] Google user logged in successfully:', user);

        res.status(200).json({ 
            token, 
            name: user.name 
        });
    } catch (err) {
        console.error('[ERROR] Error in googleLogin:', err.message);
        res.status(500).json({ error: 'Google login failed. Please try again.' });
    }
};

/**
 * Logout User
 */
exports.logoutUser = (req, res) => {
    try {
        console.log('[DEBUG] User logged out');
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (err) {
        console.error('[ERROR] Error in logoutUser:', err.message);
        res.status(500).json({ error: 'Logout failed. Please try again.' });
    }
};
