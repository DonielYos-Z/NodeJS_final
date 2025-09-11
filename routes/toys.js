const express = require("express")
const { ToyModel, validToy } = require("../models/toyModel")
const { auth } = require("../middlewares/auth")
const router = express.Router()

// Get all toys (with paginag + sort by price)
router.get("/", async (req, res) => {
    try {
        const perPage = req.query.perPage || 5
        const page = req.query.page || 1
        const data = await ToyModel
            .find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ price: 1 })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There error, try again later" })
    }
})

// Search toys by name/info
router.get("/search", async (req, res) => {
    try {
        const query = req.query.s
        const perPage = req.query.perPage || 5
        const page = req.query.page || 1
        const searchExp = new RegExp(query, "i")
        const data = await ToyModel
            .find({ $or: [{ name: searchExp }, { info: searchExp }] })
            .limit(perPage)
            .skip((page - 1) * perPage)
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There error, try again later" })
    }
})

// Filter toys by category
router.get("/category", async (req, res) => {
    try {
        const cat = req.query.cat
        const perPage = req.query.perPage || 5
        const page = req.query.page || 1
        const data = await ToyModel
            .find({ category: cat })
            .limit(perPage)
            .skip((page - 1) * perPage)
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There error, try again later" })
    }
})

// Filter toys by price range
router.get("/prices", async (req, res) => {
    try {
        const min = req.query.min || 1
        const max = req.query.max || 999
        const perPage = req.query.perPage || 5
        const page = req.query.page || 1
        const data = await ToyModel
            .find({ price: { $gte: min, $lte: max } })
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ price: 1 })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There error, try again later" })
    }
})

// Count total toys
router.get("/count", async (req, res) => {
    try {
        const count = await ToyModel.countDocuments({})
        res.json({ count })
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There error, try again later" })
    }
})

// Add new toy
router.post("/", auth, async (req, res) => {
    const validBody = validToy(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        const toy = new ToyModel(req.body)
        toy.user_id = req.tokenData._id
        await toy.save()
        res.json(toy)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There error, try again later" })
    }
})

// Update toy
router.put("/:id", auth, async (req, res) => {
    const validBody = validToy(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        const id = req.params.id
        const data = await ToyModel.updateOne({ _id: id, user_id: req.tokenData._id }, req.body)
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There error, try again later" })
    }
})

// Delete toy
router.delete("/:id", auth, async (req, res) => {
    try {
        const id = req.params.id
        const data = await ToyModel.deleteOne({ _id: id, user_id: req.tokenData._id })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There error, try again later" })
    }
})

module.exports = router
