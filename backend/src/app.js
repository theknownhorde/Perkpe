const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan'); // For logging HTTP requests

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('dev')); // Log HTTP requests in development mode

// Debug logger for incoming requests
app.use((req, res, next) => {
    console.log(`[DEBUG] ${req.method} request to ${req.url}`);
    next();
});

// API Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/points', require('./routes/pointsRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/transfer', require('./routes/transferRoutes'));
app.use('/api/redeem', require('./routes/redeemRoutes'));

// Serve React build (if applicable)
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});