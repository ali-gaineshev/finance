import Entry, { IEntry } from "../models/entry";
import { AddEntryRequestType } from "@shared/types/common-request";
import { DeleteEntryResponse } from "@shared/types/common-response";

/**
 * Save a new entry to the database.
 *
 * @param newEntry
 * @param {string} userId - The ID of the user associated with the entry.
 * @returns {Promise} - A promise that resolves to the saved entry document.
 */
const saveEntry = (newEntry: AddEntryRequestType, userId: string): Promise<IEntry> => {
  return new Entry({
    ...newEntry,
    userId: userId,
  }).save();
};

const updateEntry = async (id: string, updateData: Partial<IEntry>) => {
  const updatedEntry = await Entry.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedEntry) {
    throw new Error("Entry not found");
  }

  return updatedEntry;
};

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
const getEntries = async (
  userId: string,
  page: number,
  limit: number,
): Promise<{ entries: Array<IEntry>; totalEntries: number }> => {
  const totalEntries: number = await Entry.countDocuments({ userId });
  const entries: Array<IEntry> = await Entry.find({ userId: userId })
    .skip((page - 1) * limit) // Skip entries for previous pages
    .limit(limit); // Fixed limit for entries per page

  return { entries, totalEntries };
};

/**
 * Retrieve all entries for a specific user from the database.
 *
 * @param {string} userId - The ID of the user whose entries need to be fetched.
 * @returns {Promise<Object>} - A promise that resolves to an object containing:
 *    - entries: An array of entry documents for the given user.
 *    - totalEntries: The total number of entries for the user.
 */
const getAllEntries = async (userId: string): Promise<{ entries: Array<IEntry>; totalEntries: number }> => {
  const entries: Array<IEntry> = await Entry.find({ userId: userId });
  const totalEntries: number = entries.length;
  return { entries, totalEntries };
};

/**
 * Delete an entry by its ID.
 *
 * @param {string} id - The ID of the entry to delete.
 * @returns {Promise} - A promise that resolves to the result of the delete operation.
 */
const deleteEntry = (id: string): Promise<DeleteEntryResponse> => {
  return Entry.deleteOne({ _id: id }).exec();
};

export { saveEntry, deleteEntry, getEntries, getAllEntries };
