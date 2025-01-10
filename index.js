const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/add_entry', (req, res) => {
  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
