import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables

import https from "https";
import fs from "fs";

// express app
import app from "./app";
// ssl localhost
const sslOptions = {
  key: fs.readFileSync("localhost.key"),
  cert: fs.readFileSync("localhost.crt"),
};

import Config from "./config/config";
const PORT = Config.PORT;

import { connectDB } from "./config/db-connection";
connectDB();

// Create HTTP Server
const server = https.createServer(sslOptions, app);

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle uncaught exceptions & rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
