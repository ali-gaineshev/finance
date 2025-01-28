/* Config */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
/* Express */
const express = require('express');
const app = express();
const port = process.env.PORT;
/* DB */
const connectDb = require('./src/services/db-connection.js')
connectDb();
/* Middleware to parse JSON and URL-encoded data */
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
if (process.env.NODE_ENV !== 'PROD') {
    // Disable CORS in dev (proxy handles it)
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(204);
        }
        next();
    });
} else {
    // Use CORS in prrod
    app.use(
        cors({
            origin: process.env.CLIENT_URL, // Allow requests from frontend
            credentials: true, // Allow cookies and other credentials
        })
    );
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* Routes */
const userRoutes = require('./src/routes/user-routes');
const entryRoutes = require('./src/routes/entry-routes');

app.use("/user_api", userRoutes);
app.use("/entry_api", entryRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
