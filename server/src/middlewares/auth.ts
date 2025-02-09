const jwt = require('jsonwebtoken');
const {HTTP_CODE} = require('../models/interfaces');

/**
 * Middleware function to authenticate JWT token.
 *
 * This middleware verifies the JWT token provided in the `Authorization` header.
 * If the token is valid, the user data is attached to the `req.user` object, and
 * the request proceeds to the next middleware or route handler.
 * If the token is invalid or expired, it returns an error response with an
 * appropriate status code and message.
 *
 * @param {Object} req - The request object that contains the headers and other data.
 * @param {Object} res - The response object used to send a response back to the client.
 * @param {Function} next - The function to call to pass control to the next middleware or route handler.
 */
const authenticateToken = (req, res, next) => {
    // Getss token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(HTTP_CODE.UNAUTHORIZED).json({ message: 'Access denied. No token provided. Log in first' });
    }

    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);  // Attach user data to the request object
        next();  // Proceed to the original func
    } catch (err) {
        return res.status(HTTP_CODE.FORBIDDEN).json({ message: 'Invalid or expired token', error: err });
    }
};

module.exports = authenticateToken;
