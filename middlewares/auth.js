const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req, res, next) => {
    const token = req.header("x-api-key")
    if (!token) {
        return res.status(401).json({ err: "You must send token to this endpoint 1111" })
    }
    try {
        const decodeToken = jwt.verify(token, process.env.TOKEN_KEY)
        req.tokenData = decodeToken
        next()
    }
    catch (err) {
        res.status(401).json({ err: "Token is invalid or expired 2222" })
    }
}