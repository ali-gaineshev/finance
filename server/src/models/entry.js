const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({

    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    occurrence: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, // Reference to User model
}, {
    timestamps: true,
});
const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
