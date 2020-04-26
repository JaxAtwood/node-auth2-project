const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/secrets.js");

const Users = require("../users/users-model.js");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
            if (err) {
                console.log("failed", err);
                res.status(401).json({ errorMessage: "Nope x401" });
            } else {
                req.decodedJwt = decodedToken;
                console.log(req.decodedJwt);
                next();
            }
        })
    } else {
        res.status(400).json({ errorMessage: "Nope x400" });
    }
}