import express from "express";
//import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user-routes";
import entryRoutes from "./routes/entry-routes";

// import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// Middleware
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
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
