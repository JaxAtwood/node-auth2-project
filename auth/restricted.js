// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require('../config/secrets.js');


function restrict() {
    const authError = {
        message: "Invalid credentials in restricted.js",
    }

    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json(authError)
            }
            jwt.verify(token, secret.jwtSecret, (err, decoded) => {
                if (err) {
                    return res.status(401).json(authError)
                }
                req.token = decoded
                console.log("decoded", decoded)
                next()
            })
        } catch(err) {
            next(err)
        }
    }
}

module.exports = restrict;


// module.exports = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (token) {
//         jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
//             if (err) {
//                 console.log("failed", err);
//                 res.status(401).json({ errorMessage: "Nope x401" });
//             } else {
//                 req.decodedJwt = decodedToken;
//                 console.log(req.decodedJwt);
//                 next();
//             }
//         })
//     } else {
//         res.status(400).json({ errorMessage: "Nope x400" });
//     }
// }