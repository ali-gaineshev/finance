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
app.use(cors());
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
