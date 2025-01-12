/* Express */
const express = require('express');
const router = express.Router();
/* Auth */
const authenticateToken = require('../middlewares/auth');
/* Express Validator */
const {query, body, validationResult} = require('express-validator');
/* Util Functions */
const {saveEntry, deleteEntry, getEntries} = require('../services/entry-util');
const {HTTP_CODE} = require("../models/enums");
/* Middleware */
// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));


router.get('/add_entry', authenticateToken, [
    query('category').isString().notEmpty().withMessage('Category is required'),
    query('occurrence').isString().notEmpty().withMessage('_ is required'),
    query('type').isString().notEmpty().withMessage('Type is required')
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_CODE.BAD_REQUEST)
            .json({errors: errors.array()});
    }
    // Add a new entry
    try{
        const {category, occurrence, type, date} = req.query;
        const user = req.user;
        const entry = await saveEntry(category, occurrence, type, date, user._id);
        res.status(HTTP_CODE.OK).send(entry._id);
    }catch(err){
        res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({error: err.message});
    }
})

router.get("/get_all_entries", authenticateToken, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_CODE.BAD_REQUEST)
            .json({errors: errors.array()});
    }
    try{
        const user_id = req.user._id // from token
        const entries = await getEntries(user_id);
        res.status(HTTP_CODE.OK).send(entries);
    }catch(err){
        res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).send({error: err.message})
    }
})

router.post("/delete_entry", authenticateToken, [
    body("entry_id").isString().notEmpty().withMessage('Invalid entry.'),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_CODE.BAD_REQUEST)
            .json({errors: errors.array()});
    }
    const result = await deleteEntry(req.body.entry_id);

    if (result.deletedCount === 0) {
        return res.status(HTTP_CODE.NOT_FOUND).send({message: "Entry not found"});
    }

    return res.status(HTTP_CODE.OK).send({"result": result});
})

module.exports = router;