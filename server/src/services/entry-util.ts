import Entry, {IEntry} from '../models/entry';


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
const saveEntry = (category: string, occurrence: string, type: string,
                   date: Date, userId: string): Promise<IEntry> => {
    return new Entry({
        category: category,
        occurrence: occurrence,
        type: type,
        date: date,
        userId: userId
    }).save();
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
const getEntries = async (userId: string, page: number, limit: number): Promise<object> => {
    const totalEntries: number = await Entry.countDocuments({ userId });
    const entries: Array<IEntry> = await Entry.find({ userId: userId })
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
const deleteEntry =  (id: string): Promise<any> => {
    return Entry.deleteOne({_id: id}).exec();
}

module.exports = {saveEntry, deleteEntry, getEntries};