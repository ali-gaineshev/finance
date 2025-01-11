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


app.use("/userApi", userRoutes);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
