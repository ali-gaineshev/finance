/* Express */
var express = require('express');
var router = express.Router();
/* Express Validator */
const {body, validationResult} = require('express-validator');
/* Util Functions */
const {saveUser, verifyUser, getUsers, getUserByEmail} = require("../services/user-util");
const {generateAccessToken} = require("../services/util");
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
        return res.status(400).json({ errors: errors.array() });
    }
    // try to register
    try {
        const {email, name, password} = req.body;
        const user = await saveUser(email, name, password);
        res.status(200).json({message: 'User created successfully', user});
    } catch (err) {
        res.status(500).json({message: 'Error creating user', error: err.message});
    }
})

router.post("/login",[
    // Validate input fields
    body('email').trim().notEmpty().withMessage('Email is invalid'),
    body('password').trim().notEmpty().withMessage("Password is empty")
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //try to verify login
    const {email, password} = req.body;
    const {isMatch, username} = await verifyUser(email, password);
    if (!isMatch) {
        res.status(200).json({message: 'User login failed'});
    }
    // Create payload for JWT token
    const payload = {
        email: email,
        name: username
    };
    const jwtToken = generateAccessToken(payload);

    res.status(200).json({message: 'User login successfully', token: jwtToken});

})

/* GET user by email or all if no email is provided. DEV */
router.get('/getUsers', async function (req, res) {
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
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({message: 'Error fetching users', error: error.message});
    }
});

module.exports = router;
