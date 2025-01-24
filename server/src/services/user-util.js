const User = require('../models/user');
const {hashPassword, verifyPassword} = require('./util');

/**
 * Save a new user to the database after hashing the password.
 *
 * @async
 * @param {string} email - The user's email address.
 * @param {string} name - The user's name.
 * @param {string} password - The user's password.
 * @returns {Promise} - A promise that resolves to the saved user document.
 */
const saveUser = async (email, name, password) => {
    // hash the password
    const hashedPassword = await hashPassword(password);
    //save the user
    const newUser = new User({email: email, name: name, password: hashedPassword});
    return await newUser.save();
}

/**
 * Verify the user's email and password against the database.
 *
 * @param {string} inputEmail - The email entered by the user.
 * @param {string} inputPassword - The password entered by the user.
 * @returns {Promise<Object>} - An object containing the result of the verification,
 *                              boolean that indicates if password match; user's name; user's id in Mongodb
 */
const verifyUser = async (inputEmail, inputPassword) => {
    let isMatch = false;
    let user;
    try{
        user = await getUserByEmail(inputEmail)

        if(user){
            isMatch = await verifyPassword(inputPassword, user.password);
        }

    }catch(err){
        console.log("Error logging in\n" + err);
    }
    return {
        isMatch,
        username: user ? user.name: null,
        _id: user ? user._id : null,
    };
}

/**
 * Retrieve a user from the database by their email.
 *
 * @param {string} email - The user's email.
 * @returns {Promise} - A promise that resolves to the user document or null if not found.
 */
const getUserByEmail = (email) => {
    return User.findOne({email: email});
}

/**
 * Get all users from the database.
 *
 * @returns {Promise} - A promise that resolves to an array of all user documents.
 */
const getUsers = () => {
    return User.find({});
}

module.exports = {
    verifyUser,
    saveUser,
    getUserByEmail,
    getUsers,
};