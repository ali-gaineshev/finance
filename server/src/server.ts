import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables

import http from "http";
import app from "./app";

import Config from "./config/config";
const PORT = Config.PORT;

import { connectDB } from "./config/db-connection";
connectDB();

// Create HTTP Server
const server = http.createServer(app);

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Handle uncaught exceptions & rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
