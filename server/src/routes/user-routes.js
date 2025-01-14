/* Express */
const express = require('express');
const router = express.Router();
/* Auth */
const authenticateToken = require('../middlewares/auth');
/* Express Validator */
const {body, validationResult} = require('express-validator');
/* Util Functions */
const {saveUser, verifyUser, getUsers, getUserByEmail} = require("../services/user-util");
const {generateAccessToken, generateRefreshToken} = require("../services/util");
const {HTTP_CODE} = require("../models/enums");
const jwt = require("jsonwebtoken");
/* Middleware */
// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

router.post("/register", [
    // Validate input fields
    body('email').trim().notEmpty().isEmail().withMessage('Email is invalid'),
    body('name')
        .notEmpty().withMessage('Name is required')
        .matches(/^[A-Za-z]+$/).withMessage('Name must only contain letters'),
    body('password').trim().isEmpty().isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_CODE.BAD_REQUEST)
            .json({errors: errors.array()});
    }

    // try to register
    try {
        const {email, name, password} = req.body;
        const user = await saveUser(email, name, password);
        res.status(HTTP_CODE.OK)
            .json({message: 'User created successfully', user});
    } catch (err) {
        res.status(HTTP_CODE.INTERNAL_SERVER_ERROR)
            .json({message: 'Error creating a user', error: err.message});
    }
})

router.post("/login", [
    // Validate input fields
    body('email').trim().notEmpty().withMessage('Email is invalid'),
    body('password').trim().notEmpty().withMessage("Password is empty")
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_CODE.BAD_REQUEST)
            .json({errors: errors.array()});
    }

    //try to verify login
    const {email, password} = req.body;
    const {isMatch, username, _id} = await verifyUser(email, password);
    if (!isMatch) {
        res.status(HTTP_CODE.BAD_REQUEST)
            .json({message: 'User login failed'});
    }

    // Set a flag to check if token was generated by user credentials or refresh token
    const credentials = "user_credentials";
    // Create payload for JWT token
    const payload = {
        _id: _id,
        email: email,
        name: username,
        credentials_flag: credentials
    };
    const jwtAccessToken = generateAccessToken(payload);
    const jwtRefreshToken = generateRefreshToken(payload);

    // Sets refresh token in HTTP-only cookie
    res.cookie('refreshToken', jwtRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD', // https only in prod
        sameSite: 'strict',
    });

    res.status(HTTP_CODE.OK)
        .json({message: 'User login success', token: jwtAccessToken});

})

router.post("/logout", (req, res) => {
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict' });
    res.status(HTTP_CODE.OK).json({ message: 'Logged out successfully' });
});

router.post('/refresh_token', (req, res) => {
    //check if refresh token exists
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(HTTP_CODE.UNAUTHORIZED).json({message: "No Refresh Token was provided"})
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const credentials_flag = "refresh_credentials";
        const jwtAccessToken = generateAccessToken(
            {
                _id: payload._id,
                email: payload.email,
                name: payload.name,
                credentials_flag: credentials_flag
            });

        res.status(HTTP_CODE.OK).json({token: jwtAccessToken});
    } catch (err) {
        res.status(HTTP_CODE.FORBIDDEN).json({message: "Invalid credentials", error: err.message});
    }


})

/* GET user by email or all if no email is provided. DEV */
router.get('/getUsers', authenticateToken, async function (req, res) {
    const email = req.query.email;

    let user;
    try {
        if (!email) {
            user = await getUsers();
        } else {
            user = await getUserByEmail(email);
        }
        if (!user) {
            return res.status(404).json({message: 'No users found'});
        }
        res.status(HTTP_CODE.OK)
            .json(user);
    } catch (e) {
        res.status(HTTP_CODE.INTERNAL_SERVER_ERROR)
            .json({message: 'Error fetching users', error: error.message});
    }
});

module.exports = router;
