const express = require("express");
const router = express.Router();

const Users = require("./users-model.js");
const restrict = require("../auth/restricted.js");

router.get("/", restrict(), (req, res) => {

  Users.findUsers()
    .then(users => {
      console.log("here")
      res.status(200).json(users);
    })
    .catch(err => 
        res.status(500).json({ errorMessage: "You shant pass", err }));
});


module.exports = router;
