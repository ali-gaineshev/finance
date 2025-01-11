/* Express */
var express = require('express');
var router = express.Router();

/* Util Functions */
const getUserByEmail = require("../services/util");

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

/* GET user by email. DEV */
router.get('/getUserByEmail', async function (req, res) {
  const email = req.query.email;
  if(email === null){
    // throw error
  }
  let user = null;
  try {
    user = await getUserByEmail().exec();
  } catch (e) {
    console.error(e);
  }
  res.send(user);
});

module.exports = router;
