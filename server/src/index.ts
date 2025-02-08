/* Config */
import * as dotenv from "dotenv";
dotenv.config();
/* Express */
import express, { Express, Request, Response } from "express";
const app: Express = express();
import Config from './config/config' ;
/* DB */
import { connectDB } from './services/db-connection.js';
connectDB();
/* Middleware to parse JSON and URL-encoded data */
import cors from 'cors';
import cookieParser from 'cookie-parser';

app.use(cookieParser());
// if (process.env.NODE_ENV !== 'PROD') {
//     // Disable CORS in dev (proxy handles it)
//     app.use((req, res, next) => {
//         res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
//         res.header('Access-Control-Allow-Credentials', 'true');
//         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//         res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//         if (req.method === 'OPTIONS') {
//             return res.sendStatus(204);
//         }
//         next();
//     });
// } else {
//     // Use CORS in prrod
//     app.use(
//         cors({
//             origin: process.env.CLIENT_URL, // Allow requests from frontend
//             credentials: true, // Allow cookies and other credentials
//         })
//     );
// }
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
import userRoutes from './routes/user-routes';
import entryRoutes from './routes/entry-routes';

app.use("/user_api", userRoutes);
app.use("/entry_api", entryRoutes);

app.listen(Config.PORT, () => {
    console.log(`App listening at http://localhost:${Config.PORT}`);
});
