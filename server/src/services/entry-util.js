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
 * Retrieve paginated entries for a specific user from the database.
 *
 * @param {string} userId - The ID of the user whose entries need to be fetched.
 * @param {number} page - The page number to retrieve.
 * @param {number} limit - The number of entries per page.
 * @returns {Promise<Object>} - A promise that resolves to an object containing:
 *    - entries: An array of entry documents for the given user.
 *    - totalEntries: The total number of entries for the user.
 */
const getEntries = async (userId, page, limit) => {
    const totalEntries = await Entry.countDocuments({ userId });
    const entries = await Entry.find({ userId: userId })
        .sort({ date: -1 }) // Sort by date descending (newest first)
        .skip((page - 1) * limit) // Skip entries for previous pages
        .limit(limit); // Fixed limit for entries per page

    return { entries, totalEntries };
};

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