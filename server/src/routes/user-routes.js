/* Express */
const express = require('express');
const router = express.Router();
/* Auth */
const authenticateToken = require('../middlewares/auth');
/* Express Validator */
const {body, validationResult} = require('express-validator');
/* Util Functions */
const {saveUser, verifyUser, getUsers, getUserByEmail} = require("../services/user-util");
const {generateValidationErrorResponse, generateAccessToken, generateRefreshToken} = require("../services/util");
const {HTTP_CODE, JWT_TOKEN_CREDENTIALS_TYPE} = require("../models/enums");
const jwt = require("jsonwebtoken");
/* Middleware */
// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

router.post("/register", [
    // Validate input fields
    body('email').trim().isEmail().withMessage('Email is invalid'),
    body('name')
        .notEmpty().withMessage('Name is required')
        .matches(/^[A-Za-z]+$/).withMessage('Name must only contain letters'),
    body('password').trim()
        .isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err_response = generateValidationErrorResponse(errors);
        return res.status(HTTP_CODE.BAD_REQUEST).json(err_response);
    }

    // try to register
    try {
        const {email, name, password} = req.body;
        await saveUser(email, name, password);
        res.status(HTTP_CODE.OK)
            .json({message: 'User created successfully'});
    } catch (err) {
        // this error value means duplicate user
        const duplication_message = err.errmsg?.includes("E11000");
        res.status(HTTP_CODE.INTERNAL_SERVER_ERROR)
            .json({
                message: duplication_message ? 'User already exists' : 'Error creating a user'
            });
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
        const err_response = generateValidationErrorResponse(errors);
        return res.status(HTTP_CODE.BAD_REQUEST)
                .json(err_response);
    }

    //try to verify login
    const {email, password} = req.body;
    const {isMatch, username, _id} = await verifyUser(email, password);
    if (!isMatch) {
        return res.status(HTTP_CODE.BAD_REQUEST)
            .json({message: 'User login failed. Please verify your email or password'});
    }



    // Create payload for JWT token
    const payload = {
        _id: _id,
        email: email,
        name: username,
        credentials_flag: JWT_TOKEN_CREDENTIALS_TYPE.LOGIN, // Set a flag to check if token was generated by user credentials or refresh token
    };
    const jwtAccessToken = generateAccessToken(payload);
    const jwtRefreshToken = generateRefreshToken(payload);
    console.log("Access Token: ", jwtAccessToken.slice(80));
    console.log("Refresh Token: ", jwtRefreshToken.slice(80));
    // Set the refresh token in HTTP-only, Secure cookie
    res.cookie('refresh_token', jwtRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        sameSite: process.env.NODE_ENV === 'PROD' ? 'none' : 'lax', // 'none' requires secure:\
        maxAge: process.env.REFRESH_TOKEN_EXPIRY_SECONDS,
    });

    // Send the access token in the response body
    return res.status(HTTP_CODE.OK)
        .json({
            message: 'User login success',
            token: jwtAccessToken,  // Access token is sent in the body for use in subsequent requests
            userState: { name: username, uuid: _id }
        });
})


router.post('/refresh_token', (req, res) => {
    // Check if refresh token exists
    console.log("Refreshing token");
    console.log(req.cookies);
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
        console.log("Returning invalid refresh")
        return res.status(HTTP_CODE.UNAUTHORIZED).json({ message: "No Refresh Token was provided" });
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const credentials_flag = "refresh_credentials";

        const jwtAccessToken = generateAccessToken({
            _id: payload._id,
            email: payload.email,
            name: payload.name,
            credentials_flag: credentials_flag
        });

        // Send the new access token in the response
        console.log("Returning new token")
        return res.status(HTTP_CODE.OK).json({ token: jwtAccessToken });
    } catch (err) {
        console.log("Returning invalid credentials")
        return res.status(HTTP_CODE.FORBIDDEN).json({ message: "Invalid credentials", error: err.message });
    }
});


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
