import mongoose from "mongoose";
import Config from "./config";
/**
 * Establishes a connection to the MongoDB database.
 *
 * This function connects to MongoDB using the URI specified in the environment variables.
 * If the connection fails, it logs the error and terminates the process.
 *
 * @async.
 * @throws {Error} Throws an error and exits the process if the connection fails.
 */
export const connectDB = async () => {
  try {
    await mongoose.connect(Config.DB_URL, {});
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
