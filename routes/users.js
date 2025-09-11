const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validUser, UserModel, validLogin, createToken } = require("../models/userModel")
const { auth } = require("../middlewares/auth")
const router = express.Router()

// Show that users.js works
router.get("/", async (req, res) => {
    res.json({ msg: "Users works" })
})

// Get user info by token
router.get("/myInfo", auth, async (req, res) => {
    try {
        const data = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There is a problem, come back later" })
    }
})

// Get user info by token
router.get("/userInfo", async (req, res) => {
    const token = req.header("x-api-key")
    if (!token) {
        return res.status(401).json({ err: "You must send token to this endpoint" })
    }
    try {
        const decodeToken = jwt.verify(token, process.env.TOKEN_KEY)
        const data = await UserModel.findOne({ _id: decodeToken._id }, { password: 0 })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(401).json({ err, msg: "Token is not valid or expired" })

    }
})

// Register a new user
router.post("/", async (req, res) => {
    const validBody = validUser(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        const user = new UserModel(req.body)
        user.password = await bcrypt.hash(user.password, 10)
        await user.save()
        user.password = "******"
        res.status(201).json(user)
    }
    catch (err) {
        if (err.code == 11000) {
            return res.status(400).json({ code: 11000, err: "Email already in system" })
        }
        console.log(err)
        res.status(502).json({ err, msg: "There is an error, try again later" })
    }
})

// Login user
router.post("/login", async (req, res) => {
    const validBody = validLogin(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ err: "email not found..." })
        }

        const passValid = await bcrypt.compare(req.body.password, user.password)
        if (!passValid) {
            return res.status(401).json({ err: "password does not match..." })
        }
        const token = createToken(user._id)
        res.json({ token })
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There is an error, try again later" })

    }
})
module.exports = router