const express = require("express");

const router = express.Router();

const Users = require("./users-model.js");
// const restricted = require("../auth/auth-router.js");

// router.get("/", restricted, (req, res) => {
router.get("/", (req, res) => {

  Users.findUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => 
        res.status(500).json({ errorMessage: "You shant pass", err }));
});
 module.exports = router;