const Entry = require('../models/entry');
const {Category, Occurrence, Type} = require('../models/enums');

/**
 * Save a new entry to the database.
 *
 * @param {string} category - The category of the entry.
 * @param {string} occurrence - The occurrence type of the entry
 * @param {string} type - The type of the entry
 * @param {Date} date - The date of the entry.
 * @param {string} userId - The ID of the user associated with the entry.
 * @returns {Promise} - A promise that resolves to the saved entry document.
 */
const saveEntry = (category, occurrence, type, date, userId) => {
    return new Entry({category: category,
        occurrence: occurrence,
        type: type,
        date: date,
        userId: userId}
    ).save();
}

/**
 * Retrieve all entries for a specific user from the database.
 *
 * @param {string} userId - The ID of the user whose entries need to be fetched.
 * @returns {Promise} - A promise that resolves to an array of entry documents for the given user.
 */
const getEntries = (userId) => {
    return Entry.find({userId: userId});
}

/**
 * Delete an entry by its ID.
 *
 * @param {string} id - The ID of the entry to delete.
 * @returns {Promise} - A promise that resolves to the result of the delete operation.
 */
const deleteEntry =  (id) => {
    return Entry.deleteOne({_id: id}).exec();
}

module.exports = {saveEntry, deleteEntry, getEntries};