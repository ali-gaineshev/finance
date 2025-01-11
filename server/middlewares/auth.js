const jwt = require('jsonwebtoken');
require('dotenv').config();

// verifies JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Getss token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided. Log in first' });
    }

    try {
        req.user = jwt.verify(token, process.env.TOKEN_SECRET);  // Attach user data to the request object
        next();  // Proceed to the original func
    } catch (err) {
        res.status(400).json({ message: 'Invalid or expired token', error: err });
    }
};

module.exports = authenticateToken;
