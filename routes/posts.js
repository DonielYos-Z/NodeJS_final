const express = require("express")
const { PostModel, validPost } = require("../models/postModel")
// מייצר משתנה ראוטר
const router = express.Router()

// הגדרת הכתובת ביחס להגדרת הראוט של הראוטר
router.get("/", async (req, res) => {
    try {
        const data = await PostModel.find({})
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There is an error, try again later" })

    }
})

router.get("/single/:id", async (req, res) => {
    try {
        const id = req.params.id
        const data = await PostModel.findOne({ _id: id })
        res.json(data)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There is an error, try again later" })

    }
})

router.post("/", async (req, res) => {
    const validBody = validPost(req.body)
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        const postItem = new PostModel(req.body)
        await postItem.save()
        // 201 - הצלחה והוספת רשומה חדשה
        res.status(201).json(postItem)
    }
    catch (err) {
        console.log(err)
        res.status(502).json({ err, msg: "There is an error, try again later" })

    }
})


// export default
module.exports = router