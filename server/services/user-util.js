const User = require('../models/user');
const {hashPassword, verifyPassword} = require('./util');

const saveUser = async (email, name, password) => {
    // hash the password
    const hashedPassword = await hashPassword(password);
    //save the user
    const newUser = new User({email: email, name: name, password: hashedPassword});
    return await newUser.save();
}

const verifyUser = async (inputEmail, inputPassword) => {
    let isMatch = false;
    let user;
    try{
        user = await getUserByEmail(inputEmail)

        if(user){
            isMatch = verifyPassword(inputPassword, user.password);
        }

    }catch(err){
        console.log("Error logging in\n" + err);
    }
    return {
        isMatch,
        username: user.name,
        _id: user._id,
    };
}

const getUserByEmail = (email) => {
    return User.findOne({email: email});
}

const getUsers = () => {
    return User.find({});
}

module.exports = {
    verifyUser,
    saveUser,
    getUserByEmail,
    getUsers,
};