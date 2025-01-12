const jwt = require('jsonwebtoken');
require('dotenv').config();
const {HTTP_CODE} = require('../models/enums');

// verifies JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Getss token from Authorization header

    if (!token) {
        return res.status(HTTP_CODE.UNAUTHORIZED).json({ message: 'Access denied. No token provided. Log in first' });
    }

    try {
        req.user = jwt.verify(token, process.env.TOKEN_SECRET);  // Attach user data to the request object
        next();  // Proceed to the original func
    } catch (err) {
        res.status(HTTP_CODE.UNAUTHORIZED).json({ message: 'Invalid or expired token', error: err });
    }
};

module.exports = authenticateToken;
