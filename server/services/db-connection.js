const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database.
 *
 * This function connects to MongoDB using the URI specified in the environment variables.
 * If the connection fails, it logs the error and terminates the process.
 *
 * @async.
 * @throws {Error} Throws an error and exits the process if the connection fails.
 */
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        await mongoose.connect(uri, {});
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
