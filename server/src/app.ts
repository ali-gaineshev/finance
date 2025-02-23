import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user-routes";
import entryRoutes from "./routes/entry-routes";
import Config from "./config/config";

// import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middleware
app.use(
  cors({
    origin: Config.CLIENT_URL,
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
); // Cors
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// Routes
app.use("/user_api", userRoutes);
app.use("/entry_api", entryRoutes);

// Error Handling Middleware
//app.use(errorHandler);

export default app;
