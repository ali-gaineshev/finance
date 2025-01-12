/* Config */
require('dotenv').config();
/* Express */
const express = require('express');
const app = express();
const port = process.env.PORT;
/* DB */
const connectDb = require('./server/services/db-connection.js')
connectDb();
/* Middleware to parse JSON and URL-encoded data */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* Routes */
const userRoutes = require('./server/routes/user-routes');
const entryRoutes = require('./server/routes/entry-routes');

app.use("/user_api", userRoutes);
app.use("/entry_api", entryRoutes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
