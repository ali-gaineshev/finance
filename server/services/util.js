const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Hashes the provided password using bcrypt.
 *
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
const hashPassword = (password) => {
    const saltRounds = 10; // Salt rounds determine the complexity of the hash
    return bcrypt.hash(password, saltRounds);
};


/**
 * Verifies if the provided input password matches the hashed password.
 *
 * @param {string} inputPassword - The plain text password entered by the user.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the passwords match.
 */
const verifyPassword = (inputPassword, hashedPassword) => {
    return bcrypt.compare(inputPassword, hashedPassword); // Compare the input password with the hashed password and return true/false
};


/**
 * Generates a JWT access token.
 *
 * @param {Object} payload - The data to encode in the token
 * @returns {string} The signed JWT token that expires in 1 hour
 */
function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports = {
    generateAccessToken,
    hashPassword,
    verifyPassword,
};
